import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { Client } from 'pg';

type MigrationFile = {
  name: string;
  path: string;
  sql: string;
};

const FORBIDDEN_SQL_PATTERNS = [
  /\bDROP\s+TABLE\b/i,
  /\bDROP\s+COLUMN\b/i,
  /\bDROP\s+INDEX\b/i,
  /\bDROP\s+CONSTRAINT\b/i,
  /\bALTER\s+TABLE\b[\s\S]*?\bDROP\b/i,
  /\bTRUNCATE\b/i,
  /\bDELETE\s+FROM\b/i,
];

const EXPECTED_APP_TABLES = [
  'Lead',
  'LeadNote',
  'LeadStatusHistory',
  'LeadConversationMessage',
  'PublicChatVisitor',
  'PublicChatSession',
  'PublicChatMessage',
  'PublicVisitorMemory',
];

type CliFlags = {
  resumeFrom?: string;
  validateOnly: boolean;
};

function parseEnvFile(filePath: string): Record<string, string> {
  const raw = readFileSync(filePath, 'utf-8');
  const env: Record<string, string> = {};

  for (const line of raw.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#') || !trimmed.includes('=')) continue;

    const separator = trimmed.indexOf('=');
    const key = trimmed.slice(0, separator).trim();
    let value = trimmed.slice(separator + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    env[key] = value;
  }

  return env;
}

function removeSslMode(connectionString: string): string {
  const url = new URL(connectionString);
  url.searchParams.delete('sslmode');
  return url.toString();
}

function getMigrationFiles(migrationsDir: string): MigrationFile[] {
  const entries = readdirSync(migrationsDir)
    .map((name) => ({ name, path: join(migrationsDir, name) }))
    .filter((entry) => statSync(entry.path).isDirectory())
    .sort((a, b) => a.name.localeCompare(b.name));

  const files: MigrationFile[] = [];

  for (const entry of entries) {
    const migrationPath = join(entry.path, 'migration.sql');
    const sql = readFileSync(migrationPath, 'utf-8');
    files.push({
      name: entry.name,
      path: migrationPath,
      sql,
    });
  }

  return files;
}

function stripSqlComments(sql: string): string {
  const withoutBlockComments = sql.replace(/\/\*[\s\S]*?\*\//g, ' ');
  return withoutBlockComments
    .split('\n')
    .map((line) => line.replace(/--.*$/g, ' '))
    .join('\n');
}

function assertSqlSafe(migration: MigrationFile) {
  const normalizedSql = stripSqlComments(migration.sql);

  for (const pattern of FORBIDDEN_SQL_PATTERNS) {
    if (pattern.test(normalizedSql)) {
      throw new Error(`Forbidden SQL pattern detected in migration ${migration.name}`);
    }
  }
}

function parseFlags(argv: string[]): CliFlags {
  const flags: CliFlags = {
    validateOnly: false,
  };

  for (const arg of argv) {
    if (arg === '--validate-only') {
      flags.validateOnly = true;
      continue;
    }

    if (arg.startsWith('--resume-from=')) {
      flags.resumeFrom = arg.slice('--resume-from='.length).trim();
      continue;
    }
  }

  return flags;
}

function selectMigrationsForRun(migrations: MigrationFile[], resumeFrom?: string): MigrationFile[] {
  if (!resumeFrom) return migrations;

  const index = migrations.findIndex((migration) => migration.name === resumeFrom);
  if (index < 0) {
    throw new Error(`resume-from migration not found: ${resumeFrom}`);
  }

  return migrations.slice(index);
}

async function assertStagingIsEmpty(client: Client) {
  const dbMeta = await client.query<{ db: string; schema_name: string }>(
    'select current_database() as db, current_schema() as schema_name',
  );
  const db = dbMeta.rows[0]?.db ?? 'unknown';
  const schema = dbMeta.rows[0]?.schema_name ?? 'unknown';

  if (db !== 'postgres' || schema !== 'public') {
    throw new Error(`Unexpected target metadata db=${db} schema=${schema}`);
  }

  const tablesRes = await client.query<{ table_name: string }>(`
    select table_name
    from information_schema.tables
    where table_schema = 'public'
    order by table_name
  `);

  const hasPrismaMigrationsRes = await client.query<{ has_table: boolean }>(`
    select exists (
      select 1
      from information_schema.tables
      where table_schema = 'public'
        and table_name = '_prisma_migrations'
    ) as has_table
  `);

  const appTablesRes = await client.query<{ table_name: string }>(
    `
      select table_name
      from information_schema.tables
      where table_schema = 'public'
        and table_name = any($1::text[])
      order by table_name
    `,
    [EXPECTED_APP_TABLES],
  );

  const publicTablesCount = tablesRes.rowCount ?? 0;
  const hasPrismaMigrations = hasPrismaMigrationsRes.rows[0]?.has_table ?? false;
  const appTablesCount = appTablesRes.rowCount ?? 0;

  console.log(`[CHECK] database=${db} schema=${schema}`);
  console.log(`[CHECK] public_tables_count=${publicTablesCount}`);
  console.log(`[CHECK] has_prisma_migrations=${hasPrismaMigrations}`);
  console.log(`[CHECK] app_tables_found_count=${appTablesCount}`);

  if (publicTablesCount !== 0 || hasPrismaMigrations || appTablesCount !== 0) {
    throw new Error('Safety check failed: staging is not empty. Aborting SQL fallback.');
  }
}

async function applyMigrations(client: Client, migrations: MigrationFile[]) {
  let applied = 0;

  for (const migration of migrations) {
    assertSqlSafe(migration);
    console.log(`[APPLY] ${migration.name}`);

    try {
      await client.query('BEGIN');
      await client.query(migration.sql);
      await client.query('COMMIT');
      applied += 1;
      console.log(`[OK] ${migration.name}`);
    } catch (error) {
      await client.query('ROLLBACK');
      const message = error instanceof Error ? error.message.split('\n')[0] : 'Unknown error';
      console.error(`[FAIL] ${migration.name} error=${message}`);
      throw new Error(`Migration failed at ${migration.name}`);
    }
  }

  console.log(`[DONE] applied_migrations=${applied}`);
}

async function main() {
  const flags = parseFlags(process.argv.slice(2));
  const envPath = resolve(process.cwd(), '.env.local.supabase');
  const env = parseEnvFile(envPath);
  const rawDatabaseUrl = env.DATABASE_URL;

  if (!rawDatabaseUrl) {
    throw new Error('Missing DATABASE_URL in .env.local.supabase');
  }

  const connectionString = removeSslMode(rawDatabaseUrl);
  const migrations = getMigrationFiles(resolve(process.cwd(), 'prisma/migrations'));
  const selectedMigrations = selectMigrationsForRun(migrations, flags.resumeFrom);

  if (migrations.length === 0) {
    throw new Error('No migration folders found.');
  }

  for (const migration of migrations) {
    assertSqlSafe(migration);
  }

  console.log(`[CHECK] migration_validation_ok=${migrations.length}`);

  if (flags.validateOnly) {
    console.log('[CHECK] validate-only mode completed. No SQL executed.');
    return;
  }

  const client = new Client({
    connectionString,
    connectionTimeoutMillis: 15000,
    ssl: { rejectUnauthorized: false },
  });

  await client.connect();

  try {
    if (!flags.resumeFrom) {
      await assertStagingIsEmpty(client);
    } else {
      console.log(`[CHECK] resume-from=${flags.resumeFrom}`);
      console.log('[CHECK] empty-staging gate skipped due to explicit resume mode');
    }

    await applyMigrations(client, selectedMigrations);
  } finally {
    await client.end();
  }
}

void main();

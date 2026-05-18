import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { Client, type ClientConfig } from 'pg';

type LoadedEnv = Record<string, string>;

type UrlLabel = 'DIRECT_URL' | 'DATABASE_URL';

type SslModeLabel = 'strict' | 'relaxed';

type AttemptPlan = {
  urlLabel: UrlLabel;
  connectionString: string;
  sanitizedConnectionString: string;
  sslMode: SslModeLabel;
};

type AttemptResult =
  | { ok: true; plan: AttemptPlan; metadata: MetadataSummary }
  | { ok: false; plan: AttemptPlan; errorCode: string; errorMessage: string };

type MetadataSummary = {
  currentDatabase: string;
  currentSchema: string;
  publicTables: string[];
  hasPrismaMigrationsTable: boolean;
  appTablesFound: string[];
};

const APP_TABLES = [
  'Lead',
  'LeadNote',
  'LeadStatusHistory',
  'LeadConversationMessage',
  'PublicChatVisitor',
  'PublicChatSession',
  'PublicChatMessage',
  'PublicVisitorMemory',
];

function loadEnvFromFile(filePath: string): LoadedEnv {
  const content = readFileSync(filePath, 'utf-8');
  const env: LoadedEnv = {};

  for (const line of content.split('\n')) {
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

function buildAttemptPlans(env: LoadedEnv): AttemptPlan[] {
  const plans: AttemptPlan[] = [];

  if (env.DIRECT_URL) {
    const sanitized = removeSslMode(env.DIRECT_URL);
    plans.push({
      urlLabel: 'DIRECT_URL',
      connectionString: env.DIRECT_URL,
      sanitizedConnectionString: sanitized,
      sslMode: 'strict',
    });
    plans.push({
      urlLabel: 'DIRECT_URL',
      connectionString: env.DIRECT_URL,
      sanitizedConnectionString: sanitized,
      sslMode: 'relaxed',
    });
  }

  if (env.DATABASE_URL) {
    const sanitized = removeSslMode(env.DATABASE_URL);
    plans.push({
      urlLabel: 'DATABASE_URL',
      connectionString: env.DATABASE_URL,
      sanitizedConnectionString: sanitized,
      sslMode: 'strict',
    });
    plans.push({
      urlLabel: 'DATABASE_URL',
      connectionString: env.DATABASE_URL,
      sanitizedConnectionString: sanitized,
      sslMode: 'relaxed',
    });
  }

  return plans;
}

function removeSslMode(connectionString: string): string {
  const url = new URL(connectionString);
  url.searchParams.delete('sslmode');
  return url.toString();
}

function sanitizeError(err: unknown): { code: string; message: string } {
  if (err instanceof Error) {
    const anyErr = err as Error & { code?: string };
    const code = anyErr.code ?? 'ERR';
    const message = err.message.split('\n')[0] ?? 'Unknown error';
    return { code, message };
  }

  return { code: 'ERR', message: 'Unknown non-error throw' };
}

function redactHost(connectionString: string): string {
  try {
    const url = new URL(connectionString);
    return `${url.hostname}:${url.port || 'default'}`;
  } catch {
    return '<invalid-url>';
  }
}

async function fetchMetadata(config: ClientConfig): Promise<MetadataSummary> {
  const client = new Client(config);
  await client.connect();

  try {
    const dbInfo = await client.query<{ current_database: string; current_schema: string }>(
      'select current_database(), current_schema()',
    );

    const tablesRes = await client.query<{ table_name: string }>(`
      select table_name
      from information_schema.tables
      where table_schema = 'public'
      order by table_name
    `);

    const prismaMigrationRes = await client.query<{ has_prisma_migrations: boolean }>(`
      select exists (
        select 1
        from information_schema.tables
        where table_schema = 'public'
          and table_name = '_prisma_migrations'
      ) as has_prisma_migrations
    `);

    const appTablesRes = await client.query<{ table_name: string }>(
      `
        select table_name
        from information_schema.tables
        where table_schema = 'public'
          and table_name = any($1::text[])
        order by table_name
      `,
      [APP_TABLES],
    );

    return {
      currentDatabase: dbInfo.rows[0]?.current_database ?? 'unknown',
      currentSchema: dbInfo.rows[0]?.current_schema ?? 'unknown',
      publicTables: tablesRes.rows.map((row) => row.table_name),
      hasPrismaMigrationsTable: prismaMigrationRes.rows[0]?.has_prisma_migrations ?? false,
      appTablesFound: appTablesRes.rows.map((row) => row.table_name),
    };
  } finally {
    await client.end();
  }
}

async function runAttempt(plan: AttemptPlan): Promise<AttemptResult> {
  const ssl =
    plan.sslMode === 'strict'
      ? { rejectUnauthorized: true }
      : { rejectUnauthorized: false };

  try {
    const metadata = await fetchMetadata({
      connectionString: plan.sanitizedConnectionString,
      connectionTimeoutMillis: 10000,
      ssl,
    });

    return { ok: true, plan, metadata };
  } catch (error) {
    const sanitized = sanitizeError(error);
    return {
      ok: false,
      plan,
      errorCode: sanitized.code,
      errorMessage: sanitized.message,
    };
  }
}

function printAttemptResult(result: AttemptResult) {
  const hostPort = redactHost(result.plan.connectionString);

  if (result.ok) {
    console.log(
      `[OK] ${result.plan.urlLabel} (${hostPort}) ssl=${result.plan.sslMode} database=${result.metadata.currentDatabase} schema=${result.metadata.currentSchema}`,
    );
    console.log(`[OK] public_tables_count=${result.metadata.publicTables.length}`);
    console.log(`[OK] public_tables=${result.metadata.publicTables.join(',') || '(none)'}`);
    console.log(`[OK] has_prisma_migrations=${result.metadata.hasPrismaMigrationsTable}`);
    console.log(`[OK] app_tables_found=${result.metadata.appTablesFound.join(',') || '(none)'}`);
    return;
  }

  console.log(
    `[FAIL] ${result.plan.urlLabel} (${hostPort}) ssl=${result.plan.sslMode} code=${result.errorCode} message=${result.errorMessage}`,
  );
}

async function main() {
  const envPath = resolve(process.cwd(), '.env.local.supabase');
  const loadedEnv = loadEnvFromFile(envPath);
  const plans = buildAttemptPlans(loadedEnv);

  if (plans.length === 0) {
    console.error('[ERROR] Missing DIRECT_URL and DATABASE_URL in .env.local.supabase');
    process.exit(1);
  }

  const results: AttemptResult[] = [];
  for (const plan of plans) {
    const result = await runAttempt(plan);
    results.push(result);
    printAttemptResult(result);
    if (result.ok) {
      process.exit(0);
    }
  }

  console.error('[ERROR] Could not confirm Supabase metadata with any safe attempt.');
  process.exit(2);
}

void main();

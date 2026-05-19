import { readFileSync } from 'node:fs';
import { Client } from 'pg';

async function main() {
  const env: Record<string, string> = {};
  for (const line of readFileSync('.env.local.supabase', 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#') || !trimmed.includes('=')) continue;
    const idx = trimmed.indexOf('=');
    const key = trimmed.slice(0, idx).trim();
    let value = trimmed.slice(idx + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    env[key] = value;
  }

  const connectionUrl = new URL(env.DATABASE_URL);
  connectionUrl.searchParams.delete('sslmode');

  const client = new Client({
    connectionString: connectionUrl.toString(),
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 10000,
  });

  await client.connect();
  const result = await client.query<{ column_name: string }>(`
    select column_name
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'Lead'
    order by ordinal_position
  `);
  await client.end();

  console.log(result.rows.map((row) => row.column_name).join(','));
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});

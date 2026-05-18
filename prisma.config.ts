import 'dotenv/config';
import { defineConfig } from 'prisma/config';

const prismaDatasourceUrl = process.env.DIRECT_URL?.trim() || process.env.DATABASE_URL?.trim();

if (!prismaDatasourceUrl) {
  throw new Error('Missing DATABASE_URL (or DIRECT_URL) for Prisma CLI.');
}

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    // Prisma CLI (migrate/introspect) prefers DIRECT_URL when provided.
    // Fallback keeps local development working with DATABASE_URL only.
    url: prismaDatasourceUrl,
  },
});

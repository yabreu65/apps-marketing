import { readdirSync, statSync } from 'node:fs';
import { basename, join } from 'node:path';

import { ensureBackupsDir, getBackupsDir } from './local-db-utils';

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function main() {
  const backupsDir = getBackupsDir();
  ensureBackupsDir(backupsDir);

  const files = readdirSync(backupsDir)
    .filter((file) => file.endsWith('.dump'))
    .sort((a, b) => b.localeCompare(a));

  if (!files.length) {
    console.info('[db:backup:list:local] No hay backups en backups/local.');
    return;
  }

  console.info('[db:backup:list:local] Backups encontrados:');
  for (const file of files) {
    const abs = join(backupsDir, file);
    const stats = statSync(abs);
    console.info(`- ${basename(file)} | ${formatSize(stats.size)} | ${stats.mtime.toISOString()}`);
  }
}

main();

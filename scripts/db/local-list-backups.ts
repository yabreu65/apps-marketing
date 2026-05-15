import { basename, join } from 'node:path';
import { statSync } from 'node:fs';

import { ensureBackupsDir, getBackupsDir, getChecksumFilePath, getBackupDumpFiles, verifySha256File } from './local-db-utils';

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

async function main() {
  const backupsDir = getBackupsDir();
  ensureBackupsDir(backupsDir);

  const files = getBackupDumpFiles(backupsDir);

  if (!files.length) {
    console.info('[db:backup:list:local] No hay backups en backups/local.');
    return;
  }

  console.info('[db:backup:list:local] Backups encontrados:');
  for (const abs of files) {
    const stats = statSync(abs);
    const checksumStatus = await verifySha256File(abs);
    const checksumFileName = basename(getChecksumFilePath(abs));

    const checksumLabel = checksumStatus.ok
      ? `checksum=ok (${checksumFileName})`
      : `checksum=error (${checksumStatus.reason ?? 'desconocido'})`;

    console.info(`- ${basename(abs)} | ${formatSize(stats.size)} | ${stats.mtime.toISOString()} | ${checksumLabel}`);
  }
}

main().catch((error) => {
  console.error('[db:backup:list:local] Error:', error instanceof Error ? error.message : error);
  process.exitCode = 1;
});

import { basename } from 'node:path';

import {
  ensureDockerContainerRunning,
  getBackupDumpFiles,
  resolveBackupFileArg,
  resolveLocalDbConfig,
  verifyBackupArchiveIntegrity,
} from './local-db-utils';

async function main() {
  const args = process.argv.slice(2);
  const config = resolveLocalDbConfig();
  ensureDockerContainerRunning(config.containerName);

  const verifyAll = args.includes('--all');
  const targetArg = args.find((arg) => !arg.startsWith('--'));

  let targets: string[] = [];

  if (verifyAll) {
    targets = getBackupDumpFiles(config.backupsDir);
    if (!targets.length) {
      throw new Error('No hay backups para verificar.');
    }
  } else if (targetArg) {
    targets = [resolveBackupFileArg(targetArg, config.backupsDir)];
  } else {
    const files = getBackupDumpFiles(config.backupsDir);
    if (!files.length) {
      throw new Error('No hay backups para verificar.');
    }
    targets = [files[0]];
  }

  for (const backupPath of targets) {
    const checksumStatus = await verifyBackupArchiveIntegrity({ backupPath, config });
    console.info(
      `[db:backup:verify:local] OK ${basename(backupPath)} | sha256=${checksumStatus.actual}`,
    );
  }
}

main().catch((error) => {
  console.error('[db:backup:verify:local] Error:', error instanceof Error ? error.message : error);
  process.exitCode = 1;
});

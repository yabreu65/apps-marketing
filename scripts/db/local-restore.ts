import { existsSync } from 'node:fs';

import {
  assertConfirmFlag,
  ensureDockerContainerRunning,
  resolveBackupFileArg,
  resolveLocalDbConfig,
  streamFileToCommand,
} from './local-db-utils';

const RESTORE_CONFIRM_TOKEN = 'RESTORE_LOCAL_DB';

async function main() {
  const args = process.argv.slice(2);
  const config = resolveLocalDbConfig();
  ensureDockerContainerRunning(config.containerName);

  assertConfirmFlag(args, RESTORE_CONFIRM_TOKEN);

  const backupArg = args.find((arg) => !arg.startsWith('--'));
  const backupPath = resolveBackupFileArg(backupArg, config.backupsDir);

  if (!existsSync(backupPath)) {
    throw new Error(`No existe el backup indicado: ${backupPath}`);
  }

  const dockerArgs = [
    'exec',
    '-i',
    '-e',
    `PGPASSWORD=${config.password}`,
    config.containerName,
    'pg_restore',
    '-U',
    config.user,
    '-d',
    config.database,
    '--clean',
    '--if-exists',
    '--no-owner',
    '--no-privileges',
  ];

  await streamFileToCommand({
    inputPath: backupPath,
    command: 'docker',
    args: dockerArgs,
  });

  console.info('[db:restore:local] Restore completado correctamente.');
  console.info(`[db:restore:local] Fuente: ${backupPath}`);
}

main().catch((error) => {
  console.error('[db:restore:local] Error:', error instanceof Error ? error.message : error);
  process.exitCode = 1;
});

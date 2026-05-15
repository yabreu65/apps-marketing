import { basename, join } from 'node:path';

import {
  applyBackupRetentionPolicy,
  assertConfirmFlag,
  ensureBackupsDir,
  ensureDockerContainerRunning,
  nowStamp,
  resolveLocalDbConfig,
  runCommand,
  streamCommandToFile,
  writeSha256File,
} from './local-db-utils';

const RESET_CONFIRM_TOKEN = 'RESET_LOCAL_DB';

async function createPreResetBackup(skipBackup: boolean) {
  if (skipBackup) {
    console.info('[db:reset:local] Saltando backup previo por --skip-backup');
    return;
  }

  const config = resolveLocalDbConfig();
  ensureBackupsDir(config.backupsDir);

  const filename = `${nowStamp()}-${config.database}-pre-reset.dump`;
  const outputPath = join(config.backupsDir, filename);

  const dockerArgs = [
    'exec',
    '-e',
    `PGPASSWORD=${config.password}`,
    config.containerName,
    'pg_dump',
    '-U',
    config.user,
    '-d',
    config.database,
    '-Fc',
    '--no-owner',
    '--no-privileges',
  ];

  await streamCommandToFile({
    command: 'docker',
    args: dockerArgs,
    outputPath,
  });

  const checksum = await writeSha256File(outputPath);
  const retention = applyBackupRetentionPolicy({
    backupsDir: config.backupsDir,
    keepCount: config.backupRetentionCount,
  });

  console.info(`[db:reset:local] Backup previo generado: ${basename(outputPath)}`);
  console.info(`[db:reset:local] Checksum: ${basename(checksum.checksumFilePath)}`);

  if (retention.deleted.length > 0) {
    console.info(
      `[db:reset:local] Retención aplicada (keep=${config.backupRetentionCount}). Eliminados: ${retention.deleted.join(', ')}`,
    );
  }
}

async function main() {
  const args = process.argv.slice(2);
  const shouldSeedDemo = args.includes('--seed-demo');
  const skipBackup = args.includes('--skip-backup');

  assertConfirmFlag(args, RESET_CONFIRM_TOKEN);

  const config = resolveLocalDbConfig();
  ensureDockerContainerRunning(config.containerName);

  await createPreResetBackup(skipBackup);

  runCommand('docker', [
    'exec',
    '-e',
    `PGPASSWORD=${config.password}`,
    config.containerName,
    'psql',
    '-U',
    config.user,
    '-d',
    config.database,
    '-v',
    'ON_ERROR_STOP=1',
    '-c',
    'DROP SCHEMA IF EXISTS public CASCADE; CREATE SCHEMA public;',
  ]);

  runCommand('npx', ['prisma', 'migrate', 'deploy']);

  if (shouldSeedDemo) {
    runCommand('npm', ['run', 'db:seed:local']);
    console.info('[db:reset:local] Demo seed aplicado.');
  }

  console.info('[db:reset:local] Reset local completado.');
}

main().catch((error) => {
  console.error('[db:reset:local] Error:', error instanceof Error ? error.message : error);
  process.exitCode = 1;
});

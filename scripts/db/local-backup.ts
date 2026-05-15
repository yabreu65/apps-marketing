import { basename, join } from 'node:path';

import {
  applyBackupRetentionPolicy,
  ensureBackupsDir,
  ensureDockerContainerRunning,
  nowStamp,
  resolveLocalDbConfig,
  streamCommandToFile,
  writeSha256File,
} from './local-db-utils';

function parseTag(args: string[]) {
  const raw = args.find((arg) => arg.startsWith('--tag='));
  if (!raw) return 'manual';

  const value = raw.replace('--tag=', '').trim();
  const safe = value.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 32);
  return safe || 'manual';
}

async function main() {
  const config = resolveLocalDbConfig();
  ensureBackupsDir(config.backupsDir);
  ensureDockerContainerRunning(config.containerName);

  const tag = parseTag(process.argv.slice(2));
  const filename = `${nowStamp()}-${config.database}-${tag}.dump`;
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

  console.info(`[db:backup:local] Backup creado: ${basename(outputPath)}`);
  console.info(`[db:backup:local] Checksum: ${basename(checksum.checksumFilePath)} (${checksum.checksum})`);

  if (retention.deleted.length > 0) {
    console.info(
      `[db:backup:local] Retención aplicada (keep=${config.backupRetentionCount}). Eliminados: ${retention.deleted.join(', ')}`,
    );
  } else {
    console.info(`[db:backup:local] Retención OK (keep=${config.backupRetentionCount}). Sin eliminaciones.`);
  }

  console.info(`[db:backup:local] Ruta: ${outputPath}`);
}

main().catch((error) => {
  console.error('[db:backup:local] Error:', error instanceof Error ? error.message : error);
  process.exitCode = 1;
});

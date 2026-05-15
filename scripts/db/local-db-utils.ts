import 'dotenv/config';

import { spawn, spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import {
  createReadStream,
  createWriteStream,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  unlinkSync,
  writeFileSync,
} from 'node:fs';
import path from 'node:path';

export type LocalDbConfig = {
  databaseUrl: string;
  host: string;
  port: string;
  database: string;
  user: string;
  password: string;
  containerName: string;
  backupsDir: string;
  backupRetentionCount: number;
};

export type BackupChecksumStatus = {
  ok: boolean;
  reason?: string;
  expected?: string;
  actual?: string;
  checksumFilePath?: string;
};

const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '::1']);
const DEFAULT_CONTAINER = 'apps-marketing-postgres';
const DEFAULT_RETENTION_COUNT = 15;

export function getProjectRoot() {
  return path.resolve(__dirname, '..', '..');
}

export function getBackupsDir() {
  return path.join(getProjectRoot(), 'backups', 'local');
}

export function nowStamp() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const hh = String(d.getHours()).padStart(2, '0');
  const min = String(d.getMinutes()).padStart(2, '0');
  const ss = String(d.getSeconds()).padStart(2, '0');
  return `${yyyy}${mm}${dd}-${hh}${min}${ss}`;
}

function parseRetentionCount(rawValue: string | undefined) {
  if (!rawValue) return DEFAULT_RETENTION_COUNT;

  const parsed = Number.parseInt(rawValue, 10);

  if (!Number.isFinite(parsed) || parsed < 1) {
    return DEFAULT_RETENTION_COUNT;
  }

  return parsed;
}

export function resolveLocalDbConfig(): LocalDbConfig {
  const databaseUrl = process.env.DATABASE_URL?.trim();

  if (!databaseUrl) {
    throw new Error('DATABASE_URL no está definido. Configurá tu .env local antes de continuar.');
  }

  const parsed = new URL(databaseUrl);

  if (!['postgresql:', 'postgres:'].includes(parsed.protocol)) {
    throw new Error('DATABASE_URL debe usar protocolo postgresql:// o postgres://');
  }

  const host = parsed.hostname;

  if (!LOCAL_HOSTS.has(host)) {
    throw new Error(
      `Safety guard: host no local detectado (${host}). Estos scripts solo permiten backups/restores en DB local.`,
    );
  }

  const database = parsed.pathname.replace(/^\//, '');

  if (!database) {
    throw new Error('DATABASE_URL no incluye nombre de base.');
  }

  return {
    databaseUrl,
    host,
    port: parsed.port || '5432',
    database,
    user: decodeURIComponent(parsed.username || 'postgres'),
    password: decodeURIComponent(parsed.password || ''),
    containerName: process.env.LOCAL_PG_CONTAINER?.trim() || DEFAULT_CONTAINER,
    backupsDir: getBackupsDir(),
    backupRetentionCount: parseRetentionCount(process.env.LOCAL_BACKUP_RETENTION_COUNT),
  };
}

export function ensureBackupsDir(dir: string) {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

export function ensureDockerContainerRunning(containerName: string) {
  const result = spawnSync('docker', ['ps', '--filter', `name=^/${containerName}$`, '--format', '{{.Names}}'], {
    encoding: 'utf-8',
  });

  if (result.status !== 0) {
    throw new Error(`No se pudo consultar Docker: ${result.stderr || result.stdout}`);
  }

  const name = result.stdout.trim();
  if (name !== containerName) {
    throw new Error(
      `Contenedor ${containerName} no está corriendo. Levantalo con: docker compose -f docker-compose.local.yml up -d postgres`,
    );
  }
}

export function assertConfirmFlag(args: string[], expected: string) {
  if (!args.includes(`--confirm=${expected}`)) {
    throw new Error(`Acción bloqueada. Confirmá explícitamente con --confirm=${expected}`);
  }
}

export function resolveBackupFileArg(rawArg: string | undefined, backupsDir: string) {
  if (!rawArg) {
    throw new Error('Falta archivo de backup. Uso: npm run db:restore:local -- <archivo.dump> --confirm=RESTORE_LOCAL_DB');
  }

  return path.isAbsolute(rawArg) ? rawArg : path.join(backupsDir, rawArg);
}

export function getChecksumFilePath(backupPath: string) {
  return `${backupPath}.sha256`;
}

export function getBackupDumpFiles(backupsDir: string) {
  ensureBackupsDir(backupsDir);

  return readdirSync(backupsDir)
    .filter((file) => file.endsWith('.dump'))
    .map((file) => path.join(backupsDir, file))
    .sort((a, b) => b.localeCompare(a));
}

export async function computeSha256(filePath: string) {
  if (!existsSync(filePath)) {
    throw new Error(`No existe archivo para checksum: ${filePath}`);
  }

  const fileHash = createHash('sha256');

  await new Promise<void>((resolve, reject) => {
    const stream = createReadStream(filePath);
    stream.on('error', reject);
    stream.on('data', (chunk) => {
      fileHash.update(chunk);
    });
    stream.on('end', resolve);
  });

  return fileHash.digest('hex');
}

export async function writeSha256File(backupPath: string) {
  const checksum = await computeSha256(backupPath);
  const checksumFilePath = getChecksumFilePath(backupPath);
  const backupName = path.basename(backupPath);

  writeFileSync(checksumFilePath, `${checksum}  ${backupName}\n`, 'utf-8');

  return {
    checksum,
    checksumFilePath,
  };
}

export async function verifySha256File(backupPath: string): Promise<BackupChecksumStatus> {
  const checksumFilePath = getChecksumFilePath(backupPath);

  if (!existsSync(backupPath)) {
    return {
      ok: false,
      reason: `No existe backup: ${backupPath}`,
      checksumFilePath,
    };
  }

  if (!existsSync(checksumFilePath)) {
    return {
      ok: false,
      reason: `No existe checksum: ${path.basename(checksumFilePath)}`,
      checksumFilePath,
    };
  }

  const raw = readFileSync(checksumFilePath, 'utf-8').trim();
  const expected = raw.split(/\s+/)[0]?.trim().toLowerCase();

  if (!expected || expected.length !== 64) {
    return {
      ok: false,
      reason: `Checksum inválido en ${path.basename(checksumFilePath)}.`,
      checksumFilePath,
    };
  }

  const actual = (await computeSha256(backupPath)).toLowerCase();

  if (actual !== expected) {
    return {
      ok: false,
      reason: 'Checksum SHA256 no coincide.',
      expected,
      actual,
      checksumFilePath,
    };
  }

  return {
    ok: true,
    expected,
    actual,
    checksumFilePath,
  };
}

export async function verifyBackupArchiveIntegrity(params: {
  backupPath: string;
  config: LocalDbConfig;
}) {
  const { backupPath, config } = params;

  const size = statSync(backupPath).size;
  if (size <= 0) {
    throw new Error(`Backup vacío: ${backupPath}`);
  }

  const checksumStatus = await verifySha256File(backupPath);
  if (!checksumStatus.ok) {
    throw new Error(checksumStatus.reason || 'Falló validación de checksum.');
  }

  await streamFileToCommandCapture({
    inputPath: backupPath,
    command: 'docker',
    args: [
      'exec',
      '-i',
      '-e',
      `PGPASSWORD=${config.password}`,
      config.containerName,
      'pg_restore',
      '-l',
    ],
  });

  return checksumStatus;
}

export function applyBackupRetentionPolicy(params: {
  backupsDir: string;
  keepCount: number;
}) {
  const files = getBackupDumpFiles(params.backupsDir);

  if (files.length <= params.keepCount) {
    return {
      deleted: [] as string[],
      kept: files.length,
    };
  }

  const toDelete = files.slice(params.keepCount);

  for (const backupPath of toDelete) {
    unlinkSync(backupPath);

    const checksumPath = getChecksumFilePath(backupPath);
    if (existsSync(checksumPath)) {
      unlinkSync(checksumPath);
    }
  }

  return {
    deleted: toDelete.map((file) => path.basename(file)),
    kept: params.keepCount,
  };
}

export async function streamCommandToFile(params: {
  command: string;
  args: string[];
  outputPath: string;
  env?: NodeJS.ProcessEnv;
}) {
  await new Promise<void>((resolve, reject) => {
    const child = spawn(params.command, params.args, {
      env: params.env,
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    const out = createWriteStream(params.outputPath, { flags: 'w' });
    let stderr = '';

    child.stdout.pipe(out);
    child.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
    });

    child.on('error', reject);

    child.on('close', (code) => {
      out.close();

      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(stderr || `Comando falló con código ${code}`));
    });
  });
}

export async function streamFileToCommand(params: {
  inputPath: string;
  command: string;
  args: string[];
  env?: NodeJS.ProcessEnv;
}) {
  await new Promise<void>((resolve, reject) => {
    const child = spawn(params.command, params.args, {
      env: params.env,
      stdio: ['pipe', 'inherit', 'pipe'],
    });

    let stderr = '';
    child.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
    });

    child.on('error', reject);

    const input = createReadStream(params.inputPath);
    input.on('error', reject);
    input.pipe(child.stdin);

    child.on('close', (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(stderr || `Comando falló con código ${code}`));
    });
  });
}

export async function streamFileToCommandCapture(params: {
  inputPath: string;
  command: string;
  args: string[];
  env?: NodeJS.ProcessEnv;
}) {
  return await new Promise<string>((resolve, reject) => {
    const child = spawn(params.command, params.args, {
      env: params.env,
      stdio: ['pipe', 'pipe', 'pipe'],
    });

    let stderr = '';
    let stdout = '';

    child.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
    });

    child.stdout.on('data', (chunk) => {
      stdout += chunk.toString();
    });

    child.on('error', reject);

    const input = createReadStream(params.inputPath);
    input.on('error', reject);
    input.pipe(child.stdin);

    child.on('close', (code) => {
      if (code === 0) {
        resolve(stdout);
        return;
      }

      reject(new Error(stderr || `Comando falló con código ${code}`));
    });
  });
}

export function runCommand(command: string, args: string[], env?: NodeJS.ProcessEnv) {
  const result = spawnSync(command, args, {
    env,
    encoding: 'utf-8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  if (result.status !== 0) {
    throw new Error(result.stderr || result.stdout || `Comando ${command} falló.`);
  }

  return result.stdout;
}

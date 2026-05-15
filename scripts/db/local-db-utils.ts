import 'dotenv/config';

import { spawn, spawnSync } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';
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
};

const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '::1']);
const DEFAULT_CONTAINER = 'apps-marketing-postgres';

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

export async function streamCommandToFile(params: {
  command: string;
  args: string[];
  outputPath: string;
  env?: NodeJS.ProcessEnv;
}) {
  const { createWriteStream } = await import('node:fs');

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
  const { createReadStream } = await import('node:fs');

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

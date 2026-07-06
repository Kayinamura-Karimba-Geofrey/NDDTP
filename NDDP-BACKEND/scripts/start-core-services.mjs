/**
 * Starts core microservices required for frontend integration (Windows-friendly).
 * Usage: node scripts/start-core-services.mjs
 */
import { spawn, execSync } from 'child_process';
import { existsSync, readFileSync, unlinkSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const backendRoot = join(__dirname, '..');

const CORE_SERVICES = [
  'auth-service',
  'authorization-service',
  'user-service',
  'personnel-service',
  'notification-service',
];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForHealth(port, path = '/api/v1/health/live', attempts = 30) {
  const url = `http://127.0.0.1:${port}${path}`;
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(2000) });
      if (res.ok) return true;
    } catch {
      // retry
    }
    await sleep(1000);
  }
  return false;
}

const PORTS = {
  'auth-service': 3001,
  'authorization-service': 3002,
  'user-service': 3003,
  'notification-service': 3004,
  'personnel-service': 3006,
};

const children = [];

function freePort(port) {
  if (process.platform !== 'win32') return;
  try {
    const out = execSync(`netstat -ano | findstr :${port}`, { encoding: 'utf8' });
    const pids = new Set(
      out
        .split(/\r?\n/)
        .map((line) => line.trim().split(/\s+/).pop())
        .filter((pid) => pid && /^\d+$/.test(pid)),
    );
    for (const pid of pids) {
      try {
        execSync(`taskkill /PID ${pid} /F`, { stdio: 'ignore' });
      } catch {
        // process may already be gone
      }
    }
  } catch {
    // port not in use
  }
}

for (const dir of CORE_SERVICES) {
  const svcPath = join(backendRoot, 'services', dir);
  if (!existsSync(join(svcPath, 'package.json'))) continue;

  const pkg = JSON.parse(readFileSync(join(svcPath, 'package.json'), 'utf8'));
  if (!existsSync(join(svcPath, 'dist', 'main.js'))) {
    console.log(`Building ${dir}...`);
    const tsbuildinfo = join(svcPath, 'tsconfig.build.tsbuildinfo');
    if (existsSync(tsbuildinfo)) {
      unlinkSync(tsbuildinfo);
    }
    const build = spawn('npm', ['run', 'build'], { cwd: svcPath, shell: true, stdio: 'inherit' });
    await new Promise((resolve) => build.on('close', resolve));
  }

  console.log(`Starting ${dir}...`);
  const port = PORTS[dir];
  if (port) freePort(port);
  const child = spawn('npm', ['run', 'start:prod'], {
    cwd: svcPath,
    shell: true,
    stdio: 'ignore',
    detached: true,
  });
  child.unref();
  children.push(child);
}

console.log('Waiting for services to become healthy...');
for (const [dir, port] of Object.entries(PORTS)) {
  const ok = await waitForHealth(port);
  console.log(`  ${dir} (:${port}): ${ok ? 'up' : 'DOWN'}`);
}

console.log('\nCore services launch attempted. Gateway: npm run gateway:dev');

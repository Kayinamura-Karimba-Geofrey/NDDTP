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
const registry = JSON.parse(
  readFileSync(join(backendRoot, '../shared/service-registry.json'), 'utf8'),
);

const CORE_SERVICES = [
  'auth-service',
  'authorization-service',
  'user-service',
  'personnel-service',
  'notification-service',
  'recruitment-service',
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
  'auth-service': registry.auth.port,
  'authorization-service': registry.authorization.port,
  'user-service': registry.user.port,
  'notification-service': registry.notification.port,
  'personnel-service': registry.personnel.port,
  'recruitment-service': registry.recruitment.port,
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

// Keep process alive so the task runner doesn't kill detached children
setInterval(() => {}, 1000 * 60 * 60);

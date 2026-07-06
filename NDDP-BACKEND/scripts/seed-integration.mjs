/**
 * Seeds integration test data across core microservices.
 * Order: authorization → user → auth → personnel → notification → other services
 *
 * Prerequisites:
 * - PostgreSQL databases created per service
 * - Migrations applied (run with --migrate flag)
 * - .env files in each service directory (copy from .env.example)
 *
 * Usage:
 *   node scripts/seed-integration.mjs
 *   node scripts/seed-integration.mjs --migrate
 *   node scripts/seed-integration.mjs --only auth,user,personnel
 */
import { spawnSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const backendRoot = join(__dirname, '..');

const INTEGRATION_SERVICES = [
  { key: 'authorization', dir: 'authorization-service', migrate: true, seed: true },
  { key: 'user', dir: 'user-service', migrate: true, seed: true },
  { key: 'auth', dir: 'auth-service', migrate: true, seed: true },
  { key: 'personnel', dir: 'personnel-service', migrate: true, seed: true },
  { key: 'notification', dir: 'notification-service', migrate: true, seed: true },
];

/** Optional — requires additional Postgres containers (not started by integration:infra) */
const OPTIONAL_SERVICES = [
  { key: 'recruitment', dir: 'recruitment-service', migrate: false, seed: true },
  { key: 'leave', dir: 'leave-service', migrate: false, seed: true },
  { key: 'maintenance', dir: 'maintenance-service', migrate: false, seed: true },
  { key: 'inventory', dir: 'inventory-service', migrate: false, seed: true },
];

const args = process.argv.slice(2);
const runMigrate = args.includes('--migrate');
const runAll = args.includes('--all');
const onlyArg = args.find((a) => a.startsWith('--only='));
const onlySet = onlyArg
  ? new Set(onlyArg.replace('--only=', '').split(',').map((s) => s.trim()))
  : null;

const servicesToRun = [
  ...INTEGRATION_SERVICES,
  ...(runAll ? OPTIONAL_SERVICES : []),
];

function run(cmd, cwd, label) {
  console.log(`\n▶ ${label}`);
  const result = spawnSync(cmd, {
    cwd,
    shell: true,
    stdio: 'inherit',
    env: { ...process.env, FORCE_COLOR: '1' },
  });
  if (result.status !== 0) {
    console.error(`✗ Failed: ${label}`);
    return false;
  }
  console.log(`✓ ${label}`);
  return true;
}

let failed = 0;

for (const svc of servicesToRun) {
  if (onlySet && !onlySet.has(svc.key)) continue;

  const svcPath = join(backendRoot, 'services', svc.dir);
  if (!existsSync(svcPath)) {
    console.warn(`Skipping ${svc.key}: directory not found`);
    continue;
  }

  if (runMigrate && svc.migrate) {
    const pkg = JSON.parse(readFileSync(join(svcPath, 'package.json'), 'utf8'));
    if (pkg.scripts?.['migration:run']) {
      if (!run('npm run migration:run', svcPath, `${svc.key}: migrations`)) failed++;
    }
  }

  if (svc.seed) {
    const pkg = JSON.parse(readFileSync(join(svcPath, 'package.json'), 'utf8'));
    if (pkg.scripts?.seed) {
      if (!run('npm run seed', svcPath, `${svc.key}: seed`)) failed++;
    } else {
      console.warn(`  No seed script for ${svc.key}`);
    }
  }
}

console.log('\n' + '='.repeat(60));
if (failed) {
  console.error(`Integration seed finished with ${failed} failure(s).`);
  process.exit(1);
}

console.log('Integration seed complete.');
console.log('\nDemo login credentials:');
console.log('  admin@mod.gov.rw     / Nddtp@Mod2026!  (Super Admin)');
console.log('  officer@mod.gov.rw   / Nddtp@Mod2026!  (HR Manager)');
console.log('  mfa@mod.gov.rw       / Nddtp@Mod2026!  (MFA — OTP: 123456)');

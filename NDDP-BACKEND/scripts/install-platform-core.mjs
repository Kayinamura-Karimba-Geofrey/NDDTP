#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SERVICES_DIR = path.join(__dirname, '..', 'services');

const services = fs.readdirSync(SERVICES_DIR).filter((name) =>
  fs.existsSync(path.join(SERVICES_DIR, name, 'package.json')),
);

let failed = [];
for (const service of services.sort()) {
  const serviceDir = path.join(SERVICES_DIR, service);
  const pkg = JSON.parse(fs.readFileSync(path.join(serviceDir, 'package.json'), 'utf8'));
  if (!pkg.dependencies?.['@nddtp/platform-core']) continue;

  process.stdout.write(`Installing deps in ${service}... `);
  try {
    execSync('npm install --workspaces=false', { cwd: serviceDir, stdio: 'pipe' });
    console.log('OK');
  } catch {
    console.log('FAILED');
    failed.push(service);
  }
}

if (failed.length) {
  console.error('\nFailed:', failed.join(', '));
  process.exit(1);
}

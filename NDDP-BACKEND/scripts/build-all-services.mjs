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
  process.stdout.write(`Building ${service}... `);
  try {
    if (fs.existsSync(path.join(serviceDir, 'package.json'))) {
      const pkg = JSON.parse(fs.readFileSync(path.join(serviceDir, 'package.json'), 'utf8'));
      if (pkg.dependencies?.['@nddtp/platform-core'] && !fs.existsSync(path.join(serviceDir, 'node_modules', '@nddtp', 'platform-core'))) {
        execSync('npm install --workspaces=false', { cwd: serviceDir, stdio: 'pipe' });
      }
    }
    execSync('npm run build', { cwd: serviceDir, stdio: 'pipe' });
    console.log('OK');
  } catch (e) {
    console.log('FAILED');
    if (e.stdout) process.stdout.write(e.stdout.toString());
    if (e.stderr) process.stderr.write(e.stderr.toString());
    failed.push(service);
  }
}

if (failed.length) {
  console.error('\nFailed services:', failed.join(', '));
  process.exit(1);
}
console.log(`\nAll ${services.length} services built successfully.`);

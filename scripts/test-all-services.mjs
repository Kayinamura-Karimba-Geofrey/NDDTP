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
  process.stdout.write(`Testing ${service}... `);
  try {
    execSync('npm test', { cwd: path.join(SERVICES_DIR, service), stdio: 'pipe' });
    console.log('OK');
  } catch {
    console.log('FAILED');
    failed.push(service);
  }
}

if (failed.length) {
  console.error('\nFailed services:', failed.join(', '));
  process.exit(1);
}
console.log(`\nAll ${services.length} services passed tests.`);

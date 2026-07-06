/**
 * Writes .env files for core integration services with matching DB ports.
 * Run after: docker compose -f docker-compose.integration-infra.yml up -d
 */
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const backendRoot = join(__dirname, '..');

const SERVICE_DB_PORTS = {
  'auth-service': 5433,
  'authorization-service': 5439,
  'user-service': 5435,
  'notification-service': 5436,
  'personnel-service': 5438,
};

const DB_PASSWORD = 'change_me_secure_password';
const JWT_SECRET = 'change_me_access_secret_min_32_chars_long';

for (const [dir, port] of Object.entries(SERVICE_DB_PORTS)) {
  const svcPath = join(backendRoot, 'services', dir);
  const examplePath = join(svcPath, '.env.example');
  const envPath = join(svcPath, '.env');

  if (!existsSync(examplePath)) {
    console.warn(`No .env.example for ${dir}`);
    continue;
  }

  let content = readFileSync(examplePath, 'utf8');
  content = content.replace(/^DB_PORT=.*$/m, `DB_PORT=${port}`);
  content = content.replace(/^DB_PASSWORD=.*$/m, `DB_PASSWORD=${DB_PASSWORD}`);
  content = content.replace(/^JWT_ACCESS_SECRET=.*$/m, `JWT_ACCESS_SECRET=${JWT_SECRET}`);

  writeFileSync(envPath, content, 'utf8');
  console.log(`Wrote ${envPath} (DB_PORT=${port})`);
}

console.log('Integration .env files ready.');

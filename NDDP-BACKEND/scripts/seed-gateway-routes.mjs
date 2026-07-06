/**
 * Seeds api-management-service with gateway route metadata for all microservices.
 * Run after api-management DB is up: node scripts/seed-gateway-routes.mjs
 */
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const gatewayServicesPath = join(__dirname, '../api-gateway/src/services.ts');
const apiMgmtUrl = process.env.API_MANAGEMENT_URL || 'http://127.0.0.1:3032/api/v1';

const source = readFileSync(gatewayServicesPath, 'utf8');
const portMatches = [...source.matchAll(/^\s+(\w[\w-]*):\s*\{\s*port:\s*(\d+)/gm)];
const services = portMatches.map(([, key, port]) => ({ key, port: Number(port) }));

if (!services.length) {
  console.error('Could not parse service registry from api-gateway/src/services.ts');
  process.exit(1);
}

async function getProducts(token) {
  const res = await fetch(`${apiMgmtUrl}/products`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) throw new Error(`Failed to list products: ${res.status}`);
  const body = await res.json();
  return Array.isArray(body) ? body : body.data ?? [];
}

async function createProduct(token, service) {
  const payload = {
    code: `API-${service.key.toUpperCase().replace(/-/g, '_')}`,
    name: `${service.key} API`,
    version: 'v1',
    basePath: `/api/svc/${service.key}`,
    protocol: 'REST',
    description: `Gateway route to ${service.key} microservice on port ${service.port}`,
  };
  const res = await fetch(`${apiMgmtUrl}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
  });
  if (res.status === 409) return null;
  if (!res.ok) {
    const err = await res.text();
    console.warn(`  Product ${payload.code}: ${res.status} ${err}`);
    return null;
  }
  const body = await res.json();
  return body.data ?? body;
}

async function createRoute(token, productId, service) {
  const payload = {
    productId,
    code: `${service.key}-proxy`,
    name: `${service.key} gateway proxy`,
    path: `/api/svc/${service.key}/*`,
    httpMethod: 'GET',
    upstreamUrl: `http://127.0.0.1:${service.port}/api/v1`,
    description: `Proxied via NDDTP API Gateway (:3000)`,
  };
  const res = await fetch(`${apiMgmtUrl}/routes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
  });
  if (res.status === 409) return;
  if (!res.ok) {
    const err = await res.text();
    console.warn(`  Route ${payload.code}: ${res.status} ${err}`);
  }
}

async function main() {
  const token = process.env.ADMIN_TOKEN || '';
  console.log(`Seeding ${services.length} gateway routes into api-management-service...`);
  console.log(`Target: ${apiMgmtUrl}`);

  let products = [];
  try {
    products = await getProducts(token);
  } catch (err) {
    console.warn(`Could not reach api-management-service: ${err.message}`);
    console.warn('Gateway routes metadata seed skipped (gateway still works without it).');
    return;
  }

  const productByCode = new Map(products.map((p) => [p.code, p]));

  for (const service of services) {
    const code = `API-${service.key.toUpperCase().replace(/-/g, '_')}`;
    let product = productByCode.get(code);
    if (!product) {
      product = await createProduct(token, service);
      if (product) {
        productByCode.set(code, product);
        console.log(`  Created product: ${code}`);
      }
    }
    if (product?.id) {
      await createRoute(token, product.id, service);
    }
  }

  console.log('Gateway route metadata seed complete.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

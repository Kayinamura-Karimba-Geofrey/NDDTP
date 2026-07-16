const fs = require('fs');
const path = require('path');

const servicesRoot = path.join(__dirname, '../services');
const broken = ['asset-service', 'inventory-service', 'performance-service'];

for (const name of broken) {
  const canonical = path.join(servicesRoot, name, 'docker', 'docker-compose.yml');
  const rootFile = path.join(servicesRoot, name, 'docker-compose.yml');
  if (!fs.existsSync(canonical)) {
    console.warn('skip missing', canonical);
    continue;
  }
  fs.copyFileSync(canonical, rootFile);
  console.log('fixed', rootFile);
}

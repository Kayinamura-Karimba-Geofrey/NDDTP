const fs = require('fs');
const path = require('path');

const servicesRoot = path.join(__dirname, '../services');

for (const name of fs.readdirSync(servicesRoot)) {
  const appModule = path.join(servicesRoot, name, 'src', 'app.module.ts');
  if (!fs.existsSync(appModule)) continue;
  let src = fs.readFileSync(appModule, 'utf8');
  const before = src;
  src = src.replace(/,?\s*PlatformHealthModule/g, '');
  src = src.replace(/PlatformHealthModule,?\s*/g, '');
  src = src.replace(/,\s*PlatformHealthModule/g, '');
  src = src.replace(
    /import \{([^}]*),\s*PlatformHealthModule\s*\} from '@nddtp\/platform-core';/,
    "import {$1} from '@nddtp/platform-core';",
  );
  src = src.replace(
    /import \{\s*PlatformHealthModule\s*,\s*([^}]*)\} from '@nddtp\/platform-core';/,
    "import {$1} from '@nddtp/platform-core';",
  );
  src = src.replace(
    /import \{\s*PlatformHealthModule\s*\} from '@nddtp\/platform-core';\n/,
    '',
  );
  if (src !== before) {
    fs.writeFileSync(appModule, src);
    console.log('updated', appModule);
  }
}

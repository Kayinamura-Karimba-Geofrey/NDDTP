const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '../src/modules');

function walk(d, out = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const f = path.join(d, e.name);
    if (e.isDirectory()) walk(f, out);
    else if (e.name.endsWith('.api.ts')) out.push(f);
  }
  return out;
}

for (const file of walk(root)) {
  let s = fs.readFileSync(file, 'utf8');
  if (!s.includes('paginate(')) continue;
  if (s.includes('paginate }') || s.includes('paginate,')) continue;
  const next = s.replace(
    "import { mockDelay } from '@/utils/api-mock';",
    "import { mockDelay, paginate } from '@/utils/api-mock';",
  );
  if (next !== s) {
    fs.writeFileSync(file, next);
    console.log('fixed', path.relative(path.join(__dirname, '..'), file));
  }
}

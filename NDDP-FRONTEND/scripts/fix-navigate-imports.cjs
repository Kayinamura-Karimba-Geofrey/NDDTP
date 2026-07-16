const fs = require('fs');
const path = require('path');
const dir = path.join('d:/NDDTP/NDDP-FRONTEND/src/app/routes');

let n = 0;
for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.routes.tsx'))) {
  const p = path.join(dir, f);
  let s = fs.readFileSync(p, 'utf8');
  const usesNavigate = /<Navigate\b/.test(s);
  if (usesNavigate) continue;
  const next = s.replace(
    "import { Navigate, type RouteObject } from 'react-router-dom';",
    "import type { RouteObject } from 'react-router-dom';",
  );
  if (next !== s) {
    fs.writeFileSync(p, next);
    n++;
  }
}
console.log('fixed', n);

const fs = require('fs');
const path = require('path');
const dir = path.join('d:/NDDTP/NDDP-FRONTEND/src/app/routes');

const oldHeader = `import { lazy, Suspense, type ReactNode } from 'react';
import { Navigate, type RouteObject } from 'react-router-dom';
import { SuspenseFallback } from '@/app/guards/RouteGuards';

function wrap(element: ReactNode) {
  return <Suspense fallback={<SuspenseFallback />}>{element}</Suspense>;
}
`;

const newHeader = `import { lazy } from 'react';
import { Navigate, type RouteObject } from 'react-router-dom';
import { wrapRoute as wrap } from './wrap-route';
`;

let n = 0;
for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.routes.tsx'))) {
  const p = path.join(dir, f);
  let s = fs.readFileSync(p, 'utf8');
  if (!s.includes(oldHeader)) continue;
  s = s.replace(oldHeader, newHeader);
  fs.writeFileSync(p, s);
  n++;
}
console.log('updated', n);

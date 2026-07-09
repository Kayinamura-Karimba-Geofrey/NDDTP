const fs = require('fs');
const path = require('path');

const modulesDir = path.join(__dirname, '../src/modules');

function walkApiFiles(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkApiFiles(full, out);
    else if (entry.name.endsWith('.api.ts')) out.push(full);
  }
  return out;
}

const paginateFn =
  /function paginate<T>\(items: T\[\], page: number, limit: number\): PaginatedResponse<T> \{[\s\S]*?\n\}\n?/;

function ensureApiMockImport(src, names) {
  const importLine = `import { ${names.join(', ')} } from '@/utils/api-mock';\n`;
  if (src.includes("from '@/utils/api-mock'")) return src;
  const idx = src.indexOf('\n', src.indexOf('import '));
  return src.slice(0, idx + 1) + importLine + src.slice(idx + 1);
}

for (const file of walkApiFiles(modulesDir)) {
  let src = fs.readFileSync(file, 'utf8');
  let changed = false;
  const needed = new Set();

  if (paginateFn.test(src)) {
    src = src.replace(paginateFn, '');
    needed.add('paginate');
    changed = true;
  }

  const delayReplaced = src.replace(
    /await new Promise\(\(r\) => setTimeout\(r, (\d+)\)\);/g,
    'await mockDelay($1);',
  );
  if (delayReplaced !== src) {
    src = delayReplaced;
    needed.add('mockDelay');
    changed = true;
  }

  if (changed) {
    if (needed.size) src = ensureApiMockImport(src, [...needed]);
    if (!src.includes('PaginatedResponse<') && !src.includes('PaginatedResponse,')) {
      src = src.replace(/import type \{ PaginatedResponse \} from '@\/types';\n/, '');
    }
    fs.writeFileSync(file, src);
    console.log('updated', path.relative(path.join(__dirname, '..'), file));
  }
}

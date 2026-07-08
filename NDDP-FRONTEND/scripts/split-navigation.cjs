const fs = require('fs');
const path = require('path');

const navPath = path.join(__dirname, '../src/constants/navigation.ts');
const src = fs.readFileSync(navPath, 'utf8');

const arrayStart = src.indexOf('export const MAIN_NAVIGATION: NavItem[] = [');
if (arrayStart < 0) throw new Error('MAIN_NAVIGATION not found');
// Skip the `[` inside `NavItem[]` — open at `= [`
const eqBracket = src.indexOf('= [', arrayStart);
if (eqBracket < 0) throw new Error('MAIN_NAVIGATION array opener not found');
const bracketStart = eqBracket + 2;
let depth = 0;
let end = -1;
for (let i = bracketStart; i < src.length; i++) {
  if (src[i] === '[') depth++;
  else if (src[i] === ']') {
    depth--;
    if (depth === 0) {
      end = i;
      break;
    }
  }
}
if (end < 0) throw new Error('array end not found');
const body = src.slice(bracketStart + 1, end);

const items = [];
let objStart = -1;
let brace = 0;
let inStr = false;
let strCh = '';
let escaped = false;
for (let j = 0; j < body.length; j++) {
  const ch = body[j];
  if (inStr) {
    if (escaped) escaped = false;
    else if (ch === '\\') escaped = true;
    else if (ch === strCh) inStr = false;
    continue;
  }
  if (ch === "'" || ch === '"' || ch === '`') {
    inStr = true;
    strCh = ch;
    continue;
  }
  if (ch === '{') {
    if (brace === 0) objStart = j;
    brace++;
  } else if (ch === '}') {
    brace--;
    if (brace === 0 && objStart >= 0) {
      items.push(body.slice(objStart, j + 1).trim());
      objStart = -1;
    }
  }
}

if (items.length === 0) {
  throw new Error('No top-level nav items parsed — aborting to avoid wipe');
}

const outDir = path.join(__dirname, '../src/constants/navigation');
fs.mkdirSync(outDir, { recursive: true });

function exportName(id) {
  const camel = id.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
  return `${camel}Nav`;
}

const modules = [];
for (const item of items) {
  const idMatch = item.match(/id:\s*'([^']+)'/);
  if (!idMatch) throw new Error('item without id: ' + item.slice(0, 80));
  const id = idMatch[1];
  const exp = exportName(id);
  modules.push({ id, exp });
  const content = `import type { NavItem } from '@/types';\n\nexport const ${exp}: NavItem = ${item};\n`;
  fs.writeFileSync(path.join(outDir, `${id}.nav.ts`), content);
}

const qaMatch = src.match(/export const QUICK_ACTIONS = \[[\s\S]*?\];/);
const quickActions = qaMatch ? qaMatch[0] : `export const QUICK_ACTIONS = [];`;

const composed = `import type { NavItem } from '@/types';
${modules.map((m) => `import { ${m.exp} } from './navigation/${m.id}.nav';`).join('\n')}

/** Composed sidebar navigation. Individual sections live in \`constants/navigation/*.nav.ts\`. */
export const MAIN_NAVIGATION: NavItem[] = [
${modules.map((m) => `  ${m.exp},`).join('\n')}
];

${quickActions}
`;

fs.writeFileSync(navPath, composed);
console.log(JSON.stringify({ count: modules.length, modules: modules.map((m) => m.id) }, null, 2));

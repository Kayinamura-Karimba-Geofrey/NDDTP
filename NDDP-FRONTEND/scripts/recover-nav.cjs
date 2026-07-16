const fs = require('fs');
const path = require('path');

const transcript = 'C:/Users/HP/.cursor/projects/d-NDDTP/agent-transcripts/ccc280b1-64ee-4c40-9f1a-89b64cb8dfe6/ccc280b1-64ee-4c40-9f1a-89b64cb8dfe6.jsonl';
const lines = fs.readFileSync(transcript, 'utf8').split(/\n/);

let bestWrite = null;
const replaces = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (!line.includes('navigation.ts')) continue;
  let j;
  try {
    j = JSON.parse(line);
  } catch {
    continue;
  }
  const msgs = j.message && j.message.content;
  if (!Array.isArray(msgs)) continue;
  for (const m of msgs) {
    if (m.type !== 'tool_use') continue;
    const p = (m.input && m.input.path) || '';
    if (!p.replace(/\\/g, '/').endsWith('constants/navigation.ts')) continue;
    if (m.name === 'Write' && m.input.contents) {
      const c = m.input.contents;
      if (!bestWrite || c.length > bestWrite.len) {
        bestWrite = { i, len: c.length, contents: c };
      }
    }
    if (m.name === 'StrReplace') {
      replaces.push({
        i,
        old: m.input.old_string,
        neu: m.input.new_string,
      });
    }
  }
}

console.log('bestWrite', bestWrite && { i: bestWrite.i, len: bestWrite.len });
console.log('replaces', replaces.length, 'last', replaces.slice(-5).map((r) => r.i));

if (!bestWrite) {
  console.error('No Write found');
  process.exit(1);
}

let content = bestWrite.contents;
// Apply StrReplace ops that came AFTER the best write, in order
for (const r of replaces) {
  if (r.i <= bestWrite.i) continue;
  if (!r.old || !r.neu) continue;
  if (!content.includes(r.old)) {
    console.warn('skip replace at', r.i, 'old not found, len', (r.old || '').length);
    continue;
  }
  content = content.split(r.old).join(r.neu);
}

const out = path.join(__dirname, '_nav_recovered.ts');
fs.writeFileSync(out, content);
console.log('wrote', out, 'lines', content.split(/\n/).length);
console.log('has administration?', content.includes("id: 'administration'"));
console.log('has profile?', content.includes("id: 'profile'"));
console.log('has aiassistant?', content.includes('aiassistant:read'));
console.log('has authorization module?', content.includes("module: 'authorization'"));

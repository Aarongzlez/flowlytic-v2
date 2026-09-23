import fs from 'node:fs';
const source = fs.readFileSync('C:/Users/aaron/.codex/attachments/d14536ba-09ea-491d-b57b-6d9278d37970/pasted-text.txt', 'utf8').replace(/\r/g, '');
const sections = {};
for (const match of source.matchAll(/^### (3\.\d+) (.*)\n([\s\S]*?)(?=^### 3\.|^## 4\.)/gm)) {
  sections[match[1]] = {
    title: match[2],
    blocks: [...match[3].matchAll(/```text\n([\s\S]*?)\n\s*```/g)].map(m => m[1].replace(/^ {3}/gm, '').trim()),
    headings: [...match[3].matchAll(/\*\*(?:Service \d+ — |Step \d+ — |Q: )?([^*]+)\*\*/g)].map(m => m[1])
  };
}
fs.writeFileSync('content.json', JSON.stringify(sections, null, 2) + '\n');
console.log(Object.entries(sections).map(([id, s]) => `${id}: ${s.blocks.length} copy blocks`).join('\n'));

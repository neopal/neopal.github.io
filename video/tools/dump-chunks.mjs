// Sort les sous-titres d'un short à voix off en JSON, pour tools/caption-lines.py.
// Usage (depuis video/) : node tools/dump-chunks.mjs <id>
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {dirname, join} from 'node:path';
import {makeChunks} from '../src/voix/chunks.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const id = process.argv[2];
const align = JSON.parse(readFileSync(join(ROOT, 'src/voix', `${id}.align.json`), 'utf8'));
const script = JSON.parse(readFileSync(join(ROOT, 'src/voix', `${id}.script.json`), 'utf8'));
const chunks = makeChunks(align.segments, align.duration + 2, script.quoted ?? [], script.nocaption ?? []);
console.log(JSON.stringify(chunks.map((c) => ({text: c.text, words: c.words.map((w) => w.w), quote: c.quote}))));

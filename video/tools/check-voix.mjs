// Contrôle « lisible dans le métro » d'un short à voix off (règle de content/dico/univers.md).
// Usage (depuis video/) : node tools/check-voix.mjs prediction PredictionVoix
// Vérifie 1/ chaque sous-titre affiché : 2 lignes au plus et au moins 1 s à l'écran ;
// 2/ aucune taille de texte sous 48 px dans la composition (size={..}, fontSize, svgPx).
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {dirname, join} from 'node:path';
import {makeChunks, CAP_MAX, CAP_MIN_S} from '../src/voix/chunks.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const [id, comp] = process.argv.slice(2);
const MIN_TEXT = 48;
const TAIL = 2;
const align = JSON.parse(readFileSync(join(ROOT, 'src/voix', `${id}.align.json`), 'utf8'));
const script = JSON.parse(readFileSync(join(ROOT, 'src/voix', `${id}.script.json`), 'utf8'));
let bad = 0;
const chunks = makeChunks(align.segments, align.duration + TAIL, script.quoted ?? [], script.nocaption ?? []);
for (const c of chunks) {
  const s = (c.to - c.from) / 30;
  const flags = [];
  if (c.quote) flags.push('masqué (déjà écrit à l’écran)');
  else {
    if (c.text.length > CAP_MAX) flags.push(`TROP LONG (${c.text.length} > ${CAP_MAX} car.)`);
    if (s < CAP_MIN_S - 1 / 30) flags.push /* une image de tolérance */(`TROP BREF (${s.toFixed(2)} s < ${CAP_MIN_S} s)`);
  }
  if (flags.some((f) => f.startsWith('TROP'))) bad++;
  console.log(`${(c.from / 30).toFixed(1).padStart(5)}s ${s.toFixed(1)}s ${String(c.text.length).padStart(2)} car. « ${c.text} »${flags.length ? '  <<< ' + flags.join(', ') : ''}`);
}
if (comp) {
  const src = readFileSync(join(ROOT, 'src', `${comp}.tsx`), 'utf8');
  for (const m of src.matchAll(/(?:size=\{|fontSize:\s*|svgPx\()(\d+)/g)) {
    if (+m[1] < MIN_TEXT) { bad++; const line = src.slice(0, m.index).split('\n').length; console.log(`${comp}.tsx:${line} texte à ${m[1]} px, sous ${MIN_TEXT} px`); }
  }
}
console.log(`${chunks.length} sous-titres, durée ${(align.duration + TAIL).toFixed(1)} s : ${bad ? bad + ' problème(s)' : 'OK'}`);
process.exitCode = bad ? 1 : 0;

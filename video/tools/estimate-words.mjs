// Calage provisoire d'un short avant la voix : estime le temps de chaque mot du script au débit de la voix,
// et écrit src/voix/<id>.words.json au format de la transcription Scribe. On monte et on vérifie les images
// dessus, puis la vraie transcription remplace ce fichier (VOIX.md, étape 4) et on relance le calage.
// Usage (depuis video/) : node tools/estimate-words.mjs <id> [--rate=4.4]
// puis : node tools/align-from-words.mjs <id> --no-audio
import {readFileSync, writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {dirname, join} from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const [id, ...flags] = process.argv.slice(2);
const rate = +(flags.find((f) => f.startsWith('--rate='))?.split('=')[1] ?? 4.4); // réglé sur Hallucination (PAL - FR, eleven_v4) : 61,6 s estimées pour 60,2 s réelles
const script = JSON.parse(readFileSync(join(ROOT, 'src/voix', `${id}.script.json`), 'utf8'));

const words = [];
let t = 0.2;
for (const s of script.segments) {
  for (const tok of s.say.split(/\s+/).filter(Boolean)) {
    if (/^\[pause\]$/.test(tok)) { t += 0.6; continue; }
    if (/^\[.*\]$/.test(tok)) continue; // indication de jeu
    const text = tok.replace(/\[[^\]]*\]/g, '');
    if (!text) continue;
    if (/^[«»]$/.test(text)) { words.push({text, type: 'word', start: t, end: t + 0.02}); continue; }
    const d = Math.max(0.12, 1 / rate * (0.5 + text.length / 10));
    words.push({text, type: 'word', start: +t.toFixed(3), end: +(t + d).toFixed(3)});
    t += d + 0.05;
    if (/[.?!]$/.test(text)) t += 0.35;
    else if (/…$/.test(text)) t += 0.4;
    else if (/[,;]$/.test(text)) t += 0.15;
  }
  t += 0.1;
}
writeFileSync(join(ROOT, 'src/voix', `${id}.words.json`), JSON.stringify({estimated: true, rate, words}));
console.log(`${words.length} mots, ${t.toFixed(1)} s estimées à ${rate} mots/s`);

// Calage d'un short à partir d'une transcription mot à mot (ElevenLabs Scribe, words.json), pour une voix
// générée par le MCP ElevenLabs, qui ne renvoie pas les temps par caractère comme l'API REST.
// Usage (depuis video/) : node tools/align-from-words.mjs prediction [--music] [--tempo=1.1]
// --tempo : la voix a été accélérée au montage (ffmpeg atempo), les temps de la transcription sont divisés d'autant.
// Lit src/voix/<id>.script.json et src/voix/<id>.words.json, écrit src/voix/<id>.align.json.
import {readFileSync, writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {dirname, join} from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const [id, ...flags] = process.argv.slice(2);
const script = JSON.parse(readFileSync(join(ROOT, 'src/voix', `${id}.script.json`), 'utf8'));
const tempo = +(flags.find((f) => f.startsWith('--tempo='))?.split('=')[1] ?? 1);
// --lead : secondes de silence ajoutées avant la voix (un segment au texte vide occupe ce temps, ex. un titre muet).
const lead = +(flags.find((f) => f.startsWith('--lead='))?.split('=')[1] ?? 0);
const raw = JSON.parse(readFileSync(join(ROOT, 'src/voix', `${id}.words.json`), 'utf8')).words.filter((w) => w.type === 'word' && !/^\[.*\]$/.test(w.text)); // les indications de jeu ([curious]) ne sont pas dites

// Nombres coupés par Scribe (« 200 » « 000 ») recollés avec une espace insécable ; ponctuation isolée collée au mot d'avant.
const words = [];
for (const w0 of raw) {
  const w = {...w0, text: w0.text.replace(/\[[^\]]*\]/g, '')}; // indication de jeu collée à un mot (« suivant...[curious] »)
  const prev = words[words.length - 1];
  if (prev && /^\d{3}$/.test(w.text) && /^\d+$/.test(prev.w)) { prev.w += ' ' + w.text; prev.end = lead + w.end / tempo; }
  else if (prev && /^[;:!?]$/.test(w.text)) { prev.w += ' ' + w.text; prev.end = lead + w.end / tempo; }
  else words.push({w: w.text, start: lead + w.start / tempo, end: lead + w.end / tempo});
}

// Chaque segment consomme les mots dont les lettres et chiffres, mis bout à bout, refont son texte.
const norm = (s) => s.replace(/\[[^\]]*\]/g, '').toLowerCase().normalize('NFC').replace(/[^\p{L}\p{N}]/gu, '');
let k = 0;
const segments = script.segments.map((s) => {
  const target = norm(s.say);
  if (!target) return {scene: s.scene, start: 0, end: lead, words: []};
  const ws = [];
  let acc = '';
  while (acc.length < target.length && k < words.length) { ws.push(words[k]); acc += norm(words[k].w); k++; }
  while (k < words.length && !norm(words[k].w)) ws.push(words[k++]); // guillemet fermant orphelin
  if (acc !== target) throw new Error(`segment ${s.scene} : la transcription diffère du script\n${acc}\n${target}`);
  return {scene: s.scene, start: ws[0].start, end: ws[ws.length - 1].end, words: ws};
});

// Mots écrits en phonétique pour la voix (« /nɛkst/ ») : on affiche leur forme écrite (champ display du script).
for (const seg of segments) for (const w of seg.words) for (const [from, to] of Object.entries(script.display ?? {})) w.w = w.w.replace(from, to);

// --no-audio : calage provisoire sur des temps estimés (tools/estimate-words.mjs), pas encore de voix à jouer.
const out = {id, audio: !flags.includes('--no-audio'), music: flags.includes('--music'), duration: words[words.length - 1].end, segments};
writeFileSync(join(ROOT, 'src/voix', `${id}.align.json`), JSON.stringify(out, null, 1));
console.log(segments.map((s) => `${s.scene.padEnd(7)} ${s.start.toFixed(2)} -> ${s.end.toFixed(2)} s`).join('\n'));

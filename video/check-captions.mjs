// Rythme de lecture des légendes : chaque légende doit tenir 12 caractères/s au plus,
// mesurés sur son temps d'affichage moins 0,3 s d'apparition (règle vidéo v3, content/dico/univers.md).
// Usage : npm run check [Fichier ...]   Sortie en erreur si une légende va trop vite.
import {readFileSync, readdirSync} from 'node:fs';
let bad = 0;
const DIR = new URL('./src', import.meta.url).pathname;
const BEAT = 15, FPS = 30, TITLE = 45;
const files = process.argv.slice(2).length ? process.argv.slice(2) : readdirSync(DIR).filter((f) => !/kit|Root|index/.test(f));
for (const f of files) {
  const src = readFileSync(`${DIR}/${f.endsWith('.tsx') ? f : f + '.tsx'}`, 'utf8');
  const env = {BEAT};
  for (const k of src.matchAll(/^(?:export )?const (\w+) = ([^;\n]+);/gm)) {
    try { const v = Function(...Object.keys(env), `return (${k[2]})`)(...Object.values(env)); if (typeof v === 'number') env[k[1]] = v; } catch (e) {}
  }
  const ev = (e) => Function(...Object.keys(env), `return (${e})`)(...Object.values(env));
  // Composants -> légendes
  const comps = {};
  const re = /const (\w+): React\.FC = \(\) => \{([\s\S]*?)\n\};/g;
  let m;
  while ((m = re.exec(src))) {
    const body = m[2];
    const cm = /caps=\{\[([\s\S]*?)\]\}\s*(?:\n|gap|bottom|>)/.exec(body);
    if (!cm) continue;
    const caps = [];
    const r2 = /\[\s*([^,\[\]]+?)\s*,\s*(["'`])((?:\\.|(?!\2).)*)\2\s*\]/g;
    let c;
    while ((c = r2.exec(cm[1]))) caps.push([ev(c[1]), c[3].replace(/\\'/g, "'").replace(/\*/g, '')]);
    comps[m[1]] = caps;
  }
  const sm = /const SCENES: Scenes = \[([\s\S]*?)\];/.exec(src);
  if (!sm) continue; // short à voix off (PredictionVoix) : légendes calées sur la voix, hors de cette règle
  const scenes = [...sm[1].matchAll(/\[(\w+),\s*([^\]]+)\]/g)].map((x) => [x[1], ev(x[2])]);
  let t = TITLE, words = 0;
  console.log(`\n## ${f}`);
  for (const [name, d] of scenes) {
    const caps = (comps[name] || []).sort((a, b) => a[0] - b[0]);
    caps.forEach(([at, txt], k) => {
      const end = k + 1 < caps.length ? caps[k + 1][0] : d;
      const s = (end - at) / FPS;
      const w = txt.split(/\s+/).filter(Boolean).length;
      words += w;
      const cps = txt.length / s;
      const eff = txt.length / (s - 0.3); if (eff > 12) bad++;
      const flag = eff > 12 ? '  <<< TROP RAPIDE (' + eff.toFixed(1) + ' car/s utiles, besoin de ' + (txt.length / 12 + 0.3).toFixed(1) + ' s)' : '';
      console.log(`${((t + at) / FPS).toFixed(1).padStart(5)}s ${name.padEnd(14)} ${s.toFixed(1)}s ${String(w).padStart(2)} mots ${String(txt.length).padStart(3)} car  ${cps.toFixed(1)} car/s  ${(s / w).toFixed(2)} s/mot${flag}\n        « ${txt} »`);
    });
    t += d;
  }
  console.log(`total ${(t / FPS).toFixed(1)} s, ${words} mots`);
}
process.exitCode = bad ? 1 : 0;

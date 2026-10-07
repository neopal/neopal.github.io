// Sous-titres des shorts à voix off : découpage partagé par la composition et par tools/check-voix.mjs.
// Règle « lisible dans le métro » (content/dico/univers.md) : un groupe tient en 2 lignes (CAP_MAX caractères),
// reste au moins CAP_MIN_S secondes à l'écran, et une citation déjà montrée par le schéma n'est pas sous-titrée.
export const FPS = 30;
export const CAP_MAX = 32; // caractères par groupe : environ 19 par ligne à 84 px sur 888 px (mots entiers), donc 2 lignes
export const CAP_SOFT = 18; // au-delà, on coupe au prochain signe de ponctuation
export const CAP_MIN_S = 1.0; // durée minimale d'affichage d'un groupe

// Mots de la voix -> mots d'affichage : les guillemets isolés se collent à leur mot.
const glue = (words) => {
  const ws = [];
  for (const w of words) {
    const last = ws[ws.length - 1];
    if (w.w === '«') ws.push({...w, w: '«'});
    else if (/^[»;:!?]/.test(w.w) && last) ws[ws.length - 1] = {...last, w: last.w + ' ' + w.w, end: w.end};
    else if (last && last.w === '«') ws[ws.length - 1] = {...w, w: '« ' + w.w, start: last.start};
    else ws.push(w);
  }
  return ws;
};

const len = (ws) => ws.reduce((n, x) => n + x.w.length + 1, 0) - 1;

// segments : [{scene, words: [{w, start, end}]}] ; quoted : citations montrées par le schéma (lettres seules).
// nocaption : scènes dont le texte dit est déjà écrit en grand à l'écran (la question du hook).
export const makeChunks = (segments, total, quoted = [], nocaption = []) => {
  const key = (ws) => ws.map((w) => w.w).join('').replace(/[^\p{L}\p{N}']/gu, '');
  const out = [];
  for (const s of segments) {
    let cur = [];
    let q = false;
    const flush = () => { if (cur.length) out.push({words: cur, quote: nocaption.includes(s.scene) || (q && quoted.includes(key(cur)))}); cur = []; };
    for (const w of glue(s.words)) {
      if (w.w.startsWith('«')) { flush(); q = true; }
      if (cur.length && !q && len([...cur, w]) > CAP_MAX) flush();
      cur.push(w);
      if (w.w.includes('»')) { flush(); q = false; continue; }
      if (!q && len(cur) >= CAP_SOFT && /[.,;:!?…]$/.test(w.w.replace(/[\s »]+$/, ''))) flush();
    }
    flush();
  }
  // Un groupe trop bref fusionne avec le suivant s'il reste sur 2 lignes et dans la même phrase dite.
  for (let k = 0; k < out.length - 1; k++) {
    const a = out[k], b = out[k + 1];
    const dur = b.words[0].start - a.words[0].start;
    if (dur < CAP_MIN_S && !a.quote && !b.quote && len([...a.words, ...b.words]) <= CAP_MAX) {
      a.words = [...a.words, ...b.words];
      out.splice(k + 1, 1);
      k--;
    } else if (dur < CAP_MIN_S && !a.quote && k > 0 && !out[k - 1].quote && len([...out[k - 1].words, ...a.words]) <= CAP_MAX) {
      // Sinon, il rejoint le groupe d'avant (« un bout de mot. Même » avant une citation masquée).
      out[k - 1].words = [...out[k - 1].words, ...a.words];
      out.splice(k, 1);
      k -= 2;
    }
  }
  out.forEach((c, k) => {
    c.from = Math.round(c.words[0].start * FPS) - 2;
    c.to = k + 1 < out.length ? Math.round(out[k + 1].words[0].start * FPS) - 2 : Math.round(total * FPS);
    c.text = c.words.map((w) => w.w).join(' ');
  });
  return out;
};

// Sous-titres des shorts à voix off : découpage partagé par la composition et par tools/check-voix.mjs.
// Règle « lisible dans le métro » (content/dico/univers.md) : un groupe tient en 2 lignes (CAP_MAX caractères),
// reste au moins CAP_MIN_S secondes à l'écran, et une citation déjà montrée par le schéma n'est pas sous-titrée.
export const FPS = 30;
export const CAP_MAX = 36; // caractères par groupe : environ 24 par ligne à 84 px sur 888 px (mesuré sur un rendu, mots entiers), donc 2 lignes avec de la marge
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
    const flush = () => { if (cur.length) out.push({scene: s.scene, words: cur, quote: nocaption.includes(s.scene) || (q && quoted.includes(key(cur)))}); cur = []; };
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
  // Un groupe encore trop bref (« simule. », « pas. ») partage les mots avec son voisin de la même phrase :
  // on cherche la coupure qui laisse le plus de temps au plus court des deux, chacun restant sur 2 lignes.
  const start = (k) => (k < out.length ? out[k].words[0].start : total);
  const endsSentence = (c) => /[.!?…]$/.test(c.words[c.words.length - 1].w.replace(/[\s »]+$/, ''));
  const rebalance = (k) => {
    const a = out[k], b = out[k + 1];
    if (!a || !b || a.quote || b.quote || a.scene !== b.scene || endsSentence(a)) return false;
    const ws = [...a.words, ...b.words];
    const t1 = start(k + 2);
    let best = null;
    for (let i = 1; i < ws.length; i++) {
      if (len(ws.slice(0, i)) > CAP_MAX || len(ws.slice(i)) > CAP_MAX) continue;
      const m = Math.min(ws[i].start - ws[0].start, t1 - ws[i].start);
      if (!best || m > best.m) best = {i, m};
    }
    if (!best || best.m < CAP_MIN_S - 1 / FPS) return false;
    a.words = ws.slice(0, best.i);
    b.words = ws.slice(best.i);
    return true;
  };
  for (let k = 0; k < out.length; k++) {
    if (out[k].quote || start(k + 1) - start(k) >= CAP_MIN_S) continue;
    rebalance(k) || rebalance(k - 1);
  }
  out.forEach((c, k) => {
    c.from = Math.round(c.words[0].start * FPS) - 2;
    c.to = k + 1 < out.length ? Math.round(out[k + 1].words[0].start * FPS) - 2 : Math.round(total * FPS);
    c.text = c.words.map((w) => w.w).join(' ');
  });
  return out;
};

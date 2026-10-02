// Rendu HTML du Lexique IA : fonctions pures, sans accès au DOM.
// Navigateur : window.LexRender. Node : require('./lexique/render.js').
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.LexRender = api;
})(typeof window !== 'undefined' ? window : null, function () {
  const DEFAULTS = {base: '/lexique/', urls: 'path'};
  const opt = (o) => Object.assign({}, DEFAULTS, o || {});

  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
  const arr = (a) => (Array.isArray(a) ? a : []);
  const color = (t, cats) => (cats[t.cat] && cats[t.cat].color) || '#7CFFB2';
  const catLabel = (t, cats) => (cats[t.cat] && cats[t.cat].label) || '';

  // Minuscules, sans accents, apostrophes et guillemets unifiés.
  function normalize(s) {
    return String(s == null ? '' : s)
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .toLowerCase()
      .replace(/[’‘`]/g, "'")
      .replace(/[«»"]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // ---------- Termes cités dans le texte ----------
  // Chaque fiche publiée (hors mythes, dont le titre est une phrase) est reconnue dans la prose des autres
  // par son titre, son nom anglais et ses alias. La première mention devient un lien souligné en pointillés.
  // Un mot présent dans trop de fiches (« modèle ») n'est pas lié : il soulignerait la moitié du lexique.
  const MAX_SHARE = 0.75;
  // Formes trop ambiguës pour être liées automatiquement (sens courant différent du terme technique).
  const NEVER = new Set(['mémoire', 'memory', 'temp', 'loop', 'corpus', 'test', 'tests', 'score', 'outil', 'outils', 'modèle', 'model', 'calcul', 'agentic', 'lab', 'fournisseur', 'provider', 'deployer', 'tools', 'harnais', 'plan', 'instructions', 'apprentissage', 'gpt', 'vision']);
  const reEsc = (x) => x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const isAcronym = (f) => /^[A-Z0-9-]{2,6}$/.test(f) && /[A-Z]/.test(f);
  const proseOf = (x) => [x.image, x.imagine, ...arr(x.full), x.then, x.avoid, ...arr(x.office).map((m) => m && m.text)].filter(Boolean).join(' ');
  const indexCache = new WeakMap();
  const idxRemoved = []; // formes écartées car trop répandues (diagnostic)
  function termIndex(terms) {
    if (indexCache.has(terms)) return indexCache.get(terms);
    const live = liveTerms(terms);
    const forms = new Map(); // forme en minuscules -> {id, exact}
    // Deux passes : les titres et noms anglais d'abord, pour qu'un alias d'une fiche ne capte pas le titre d'une autre
    // (« pré-entraînement » mène à sa fiche, pas à entraînement).
    const pass = (pick) => {
      for (const x of live) {
        if (x.cat === 'mythes') continue;
        const all = pick(x).flatMap((f) => String(f || '').split(/\s*[()]\s*/)).map((f) => f.trim()).filter((f) => f.length >= 3 || isAcronym(f));
        for (const f of all) {
          const k = f.toLowerCase();
          if (!forms.has(k) && !NEVER.has(k)) forms.set(k, {id: x.id, exact: isAcronym(f) ? f : null});
        }
      }
    };
    pass((x) => [x.title, x.en]);
    pass((x) => [...arr(x.aliases), ...arr(x.aliasesFr)]);
    // Retire les formes trop répandues.
    const texts = live.map((x) => proseOf(x).toLowerCase());
    idxRemoved.length = 0;
    for (const [k] of forms) {
      const re = new RegExp(`(?<![\\p{L}\\p{N}_-])${reEsc(k)}(?:s|x)?(?![\\p{L}\\p{N}_-])`, 'u');
      if (texts.filter((tx) => re.test(tx)).length > MAX_SHARE * live.length) { forms.delete(k); idxRemoved.push(k); }
    }
    const keys = [...forms.keys()].sort((a, b) => b.length - a.length).map((k) => reEsc(esc(k)));
    const idx = {forms, byId: Object.fromEntries(live.map((x) => [x.id, x])), re: keys.length ? new RegExp(`(?<![\\p{L}\\p{N}_-])(${keys.join('|')})((?:s|x)?)(?![\\p{L}\\p{N}_-])`, 'giu') : null};
    indexCache.set(terms, idx);
    return idx;
  }

  // Lie, dans un texte déjà échappé, la première mention de chaque fiche (hors liens existants et hors la fiche elle-même).
  function linkTerms(html, ctx) {
    if (!ctx || !ctx.idx.re) return html;
    return html.split(/(<a\b[^>]*>[\s\S]*?<\/a>)/).map((part) => (part.startsWith('<a') ? part : part.replace(ctx.idx.re, (all, word, suffix) => {
      const raw = word.replace(/&#39;/g, "'").replace(/&amp;/g, '&');
      const hit = ctx.idx.forms.get(raw.toLowerCase());
      if (!hit || hit.id === ctx.self || ctx.seen.has(hit.id)) return all;
      if (suffix && (raw.length < 5 || hit.exact)) return all;
      if (hit.exact && raw !== hit.exact) return all;
      ctx.seen.add(hit.id);
      const x = ctx.idx.byId[hit.id];
      return `<a class="tw" style="--c:${color(x, ctx.cats)}" href="${termUrl(x.id, ctx.o)}" data-go="${esc(x.id)}">${word}${suffix}</a>`;
    }))).join('');
  }

  // Texte échappé, où un site cité en toutes lettres (« va sur arcprize.org/play ») devient un lien
  // quand une source de la fiche pointe vers ce domaine. Un nom de marque comme Z.ai (majuscule) reste du texte.
  function prose(s, t, ctx) {
    return linkTerms(siteLinks(s, t), ctx);
  }

  function siteLinks(s, t) {
    const hosts = new Set(arr(t && t.sources).map((x) => {
      const m = /^https?:\/\/(?:www\.)?([^/]+)/i.exec((x && x.url) || '');
      return m ? m[1].toLowerCase() : '';
    }).filter(Boolean));
    return esc(s).replace(/(^|[\s(«])([a-z0-9-]+(?:\.[a-z0-9-]+)*\.[a-z]{2,})((?:\/[\w\-./]*)?)/g, (all, pre, host, path) => {
      if (!hosts.has(host)) return all;
      path = path.replace(/[.]+$/, '');
      const tail = all.slice(pre.length + host.length + path.length);
      return `${pre}<a href="https://${host}${path}" target="_blank" rel="noopener">${host}${path}</a>${tail}`;
    });
  }

  function asset(src, o) {
    if (!src) return '';
    if (/^([a-z]+:)?\/\//i.test(src) || src.charAt(0) === '/') return src;
    return o.base + src;
  }

  // URL d'une fiche (ou de l'index si id vide), relative au site.
  function termUrl(id, o) {
    o = opt(o);
    if (!id || id === 'index') return o.base;
    return o.urls === 'query' ? `${o.base}?term=${encodeURIComponent(id)}` : `${o.base}${encodeURIComponent(id)}/`;
  }

  function pageTitle(term) {
    if (!term) return 'Lexique IA | Pierre-Adrien Lair';
    return `${String(term.title).replace(/[«»]/g, '').trim()} | Lexique IA`;
  }

  function liveTerms(terms) {
    return arr(terms).filter((t) => t.status === 'live');
  }

  // Lien vers un terme : <a> si publié, <span> si à venir.
  function termLink(t, cats, o, cls) {
    const style = `style="--c:${color(t, cats)}"`;
    if (t.status !== 'live') {
      return `<span class="${cls} soon" ${style} data-go="${esc(t.id)}">${esc(t.title)}<span class="sr"> (à venir)</span></span>`;
    }
    return `<a class="${cls} live" ${style} href="${termUrl(t.id, o)}" data-go="${esc(t.id)}">${esc(t.title)}</a>`;
  }

  // `aliases` : variantes anglaises ; `aliasesFr` : variantes françaises. Les deux servent à la recherche.
  // À l'affichage, un alias qui n'est que le pluriel du titre ou de `en` (« tokens », « hallucinations »)
  // est masqué : il reste cherchable mais n'apprend rien au lecteur.
  function shownAliases(list, t) {
    const bases = [t.title, t.en].filter(Boolean).map(normalize);
    return arr(list).filter(Boolean).filter((a) => {
      const n = normalize(a);
      return !bases.some((b) => n === b || n === b + 's' || n === b + 'x');
    });
  }

  function englishLine(t) {
    const en = t.en ? String(t.en) : '';
    const aliases = shownAliases(t.aliases, t);
    const aliasesFr = shownAliases(t.aliasesFr, t);
    const sameAsTitle = en && normalize(en) === normalize(t.title);
    const enSpan = (s) => `<span lang="en">${esc(s)}</span>`;
    const span = (s) => `<span>${esc(s)}</span>`;
    let out = '';
    if (en && !sameAsTitle) {
      out += `<p class="en">En anglais : ${enSpan(en)}${aliases.length ? `, aussi ${aliases.map(enSpan).join(', ')}` : ''}</p>`;
    } else if (aliases.length) {
      out += `<p class="en">En anglais, aussi ${aliases.map(enSpan).join(', ')}</p>`;
    }
    if (aliasesFr.length) out += `<p class="en">Aussi appelé ${aliasesFr.map(span).join(', ')}</p>`;
    return out;
  }

  function renderRelated(t, cats, terms, o) {
    const byId = {};
    arr(terms).forEach((x) => { byId[x.id] = x; });
    const linked = arr(t.links).map((id) => byId[id]).filter(Boolean);
    // Fiches publiées d'abord, l'ordre éditorial est gardé dans chaque groupe.
    return linked.filter((l) => l.status === 'live').concat(linked.filter((l) => l.status !== 'live')).map((l) => termLink(l, cats, o, 'tl')).join('');
  }

  // Fiche complète. opts : {base, urls: 'path'|'query'}.
  function renderTerm(t, cats, terms, opts) {
    const o = opt(opts);
    cats = cats || {};
    const live = liveTerms(terms);
    const i = live.findIndex((x) => x.id === t.id);
    const prev = i > 0 ? live[i - 1] : null;
    const next = i >= 0 && i < live.length - 1 ? live[i + 1] : null;
    const related = renderRelated(t, cats, terms, o);
    const ctx = {idx: termIndex(terms), self: t.id, seen: new Set(), cats, o};

    const video = t.video && t.video.src
      ? `<div class="video"><video controls playsinline preload="none" poster="${esc(asset(t.video.poster, o))}" src="${esc(asset(t.video.src, o))}" aria-label="Vidéo : ${esc(t.title)}"></video></div>`
      : '';
    const splits = arr(t.split).length
      ? `<div class="splits">${t.split.map((s) => `<div class="split"><span class="w">${esc(s.mot)}</span>${arr(s.blocs).map((b) => `<span class="chip">${esc(b)}</span>`).join('')}</div>`).join('')}</div>`
      : '';
    // Schéma : SVG maison (lexique/schemas/<id>.svg), seulement pour les fiches sans vidéo.
    const schema = t.schema && !video ? `<figure class="schema">${t.schema}</figure>` : '';
    const jargon = arr(t.jargon).filter((j) => j && j.say).length
      ? `<h2>Dans le jargon</h2><dl class="jargon">${t.jargon.filter((j) => j && j.say).map((j) => `<div><dt>${esc(j.say)}</dt><dd>${esc(j.means)}</dd></div>`).join('')}</dl>`
      : '';
    // Solutions populaires : [{name, kind, url}], groupées par kind dans l'ordre d'apparition.
    const sols = arr(t.solutions).filter((s) => s && s.name && s.url);
    const kinds = sols.map((s) => s.kind || '').filter((k, i, all) => all.indexOf(k) === i);
    const solutions = sols.length
      ? `<h2>Solutions populaires</h2><dl class="solutions">${kinds.map((k) => `<div><dt>${esc(k)}</dt><dd>${sols.filter((s) => (s.kind || '') === k).map((s) => `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.name)}</a>`).join(', ')}</dd></div>`).join('')}</dl>`
      : '';
    // Tableau comparatif daté : {caption, asOf, columns: [..], rows: [[..]], note?, source?}.
    const tb = t.table && arr(t.table.columns).length && arr(t.table.rows).length ? t.table : null;
    const table = tb
      ? `<h2>${esc(tb.caption || 'Comparatif')}</h2><div class="tablewrap"><table class="cmp"><thead><tr>${tb.columns.map((c) => `<th scope="col">${esc(c)}</th>`).join('')}</tr></thead><tbody>${tb.rows.map((r) => `<tr>${arr(r).map((c, i) => (i === 0 ? `<th scope="row">${esc(c)}</th>` : `<td>${esc(c)}</td>`)).join('')}</tr>`).join('')}</tbody></table></div>${tb.asOf || tb.note ? `<p class="tnote">${tb.asOf ? `Relevé du ${esc(tb.asOf)}.` : ''}${tb.note ? ` ${esc(tb.note)}` : ''}</p>` : ''}`
      : '';
    // Fiabilité (benchmarks) : {level: 'solide' | 'à nuancer' | 'fragile', why}.
    const rel = t.reliability && t.reliability.level ? t.reliability : null;
    const reliability = rel
      ? `<h2>Fiable ?</h2><div class="rely rely-${esc(String(rel.level).normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z]+/gi, '-').toLowerCase())}"><b>${esc(rel.level)}</b><p>${esc(rel.why || '')}</p></div>`
      : '';
    const section = (title, body) => (body ? `<h2>${title}</h2>${body}` : '');
    const navLink = (x, dir) => (x
      ? `<a class="${dir}" href="${termUrl(x.id, o)}" data-go="${esc(x.id)}" rel="${dir}"><span aria-hidden="true">${dir === 'prev' ? '←' : '→'}</span><span class="nt">${esc(x.title)}</span></a>`
      : `<span class="${dir} none"></span>`);

    return `
      <article class="term" data-term="${esc(t.id)}" style="--cat:${color(t, cats)}">
        <div class="kicker">${esc(catLabel(t, cats))}</div>
        <h1>${esc(t.title)}</h1>
        ${englishLine(t)}
        ${related ? `<nav class="rel" aria-label="Termes liés">${related}</nav>` : ''}
        ${t.short ? `<p class="lead">${esc(t.short)}</p>` : ''}
        ${video}
        ${t.image || splits ? `<h2>L'image</h2>${t.image ? `<p>${prose(t.image, t, ctx)}</p>` : ''}${splits}` : ''}
        ${section('Imagine', t.imagine ? `<p class="imagine">${prose(t.imagine, t, ctx)}</p>` : '')}
        ${schema}
        ${section('Définition complète', arr(t.full).map((p) => `<p>${prose(p, t, ctx)}</p>`).join(''))}
        ${reliability}
        ${table}
        ${section('2024 vs 2026', t.then ? `<p>${prose(t.then, t, ctx)}</p>` : '')}
        ${jargon}
        ${solutions}
        ${section('Entendu au bureau', arr(t.office).length ? `<div class="chat">${t.office.map((m) => `<div class="bubble ${m.who === 'q' ? 'q' : 'a'}">${prose(m.text, t, ctx)}</div>`).join('')}</div>` : '')}
        ${section('À éviter', t.avoid ? `<div class="avoid"><b aria-hidden="true">✕</b><p>${prose(t.avoid, t, ctx)}</p></div>` : '')}
        ${related ? `<div class="connexions"><h2>Connexions</h2><div class="links">${related}</div></div>` : ''}
        <nav class="pager" aria-label="Fiches">
          ${navLink(prev, 'prev')}
          <a class="all" href="${termUrl('', o)}" data-go="index">Tous les termes</a>
          ${navLink(next, 'next')}
        </nav>
      </article>`;
  }

  // Index de tous les termes.
  function renderIndex(cats, terms, opts) {
    const o = opt(opts);
    cats = cats || {};
    // Tri A-Z sans accents ni guillemets, comme la liste de la colonne de gauche.
    const sortKey = (t) => normalize((t.title || '').replace(/[«»"]/g, '').trim());
    const rows = [...arr(terms)].sort((a, b) => sortKey(a).localeCompare(sortKey(b), 'fr')).map((t) => {
      const en = t.en && normalize(t.en) !== normalize(t.title) ? `<span class="e" lang="en">${esc(t.en)}</span>` : '';
      const side = t.status === 'live' ? esc(catLabel(t, cats)) : 'à venir';
      const inner = `<i aria-hidden="true"></i><span class="t">${esc(t.title)}</span>${en}<span class="c">${side}</span>`;
      return t.status === 'live'
        ? `<li class="live" style="--c:${color(t, cats)}"><a href="${termUrl(t.id, o)}" data-go="${esc(t.id)}">${inner}</a></li>`
        : `<li class="soon"><span class="row">${inner}</span></li>`;
    }).join('');
    return `
      <div class="index">
        <h1 class="sr">Lexique IA : les termes</h1>
        <p class="lead">Les définitions que j'ai écrites pour comprendre comment marchent les LLM.</p>
        <ul>${rows}</ul>
      </div>`;
  }

  // Recherche : renvoie [{term, field, hit}] trié par pertinence.
  // field : 'title' | 'en' | 'alias' (aliases et aliasesFr) | 'jargon' | 'solution' | 'short' ; hit : texte d'origine qui a matché.
  function search(query, terms) {
    const q = normalize(query);
    if (!q) return arr(terms).map((t) => ({term: t, field: null, hit: null, score: 0}));
    const words = q.split(' ');
    const out = [];
    arr(terms).forEach((t, idx) => {
      const fields = [
        ['title', t.title, 0],
        ['title', t.graphLabel, 1],
        ['en', t.en, 2],
        ...arr(t.aliases).map((a) => ['alias', a, 3]),
        ...arr(t.aliasesFr).map((a) => ['alias', a, 3]),
        ...arr(t.solutions).map((s) => ['solution', s && s.name, 5]),
        ...arr(t.jargon).map((j) => ['jargon', j && j.say, 4]),
        ['short', t.short, 6],
      ].filter((f) => f[1]);
      let best = null;
      for (const [field, text, w] of fields) {
        const n = normalize(text);
        const pos = n.indexOf(q);
        let score = null;
        if (pos === 0) score = w * 10;
        else if (pos > 0) score = w * 10 + (/[ '\-(]/.test(n.charAt(pos - 1)) ? 2 : 5);
        else if (words.length > 1 && words.every((x) => n.includes(x))) score = w * 10 + 7;
        if (score != null && (!best || score < best.score)) best = {term: t, field, hit: text, score};
      }
      if (best) {
        if (t.status !== 'live') best.score += 0.5;
        best.idx = idx;
        out.push(best);
      }
    });
    return out.sort((a, b) => a.score - b.score || a.idx - b.idx);
  }

  return {linkStats: () => idxRemoved.slice(), renderTerm, renderIndex, renderRelated, search, normalize, termUrl, pageTitle, escapeHtml: esc};
});

// Page des shorts publiés (lexique/shorts/), appelée par scripts/build-lexique.mjs.
// Données : lexique/shorts.js (window.LEX_SHORTS). Page autonome : couverture locale, lecteur YouTube chargé au clic.
import {readFileSync, existsSync} from 'node:fs';
import {join} from 'node:path';
import vm from 'node:vm';

export const SHORTS_DIR = 'shorts';

// Lit et vérifie lexique/shorts.js ; renvoie la liste, le plus récent d'abord. fail : arrête le build.
export function loadShorts(lexDir, liveIds, fail) {
  const file = join(lexDir, 'shorts.js');
  if (!existsSync(file)) return [];
  const ctx = {window: {}};
  vm.runInNewContext(readFileSync(file, 'utf8'), ctx, {filename: file});
  const list = ctx.window.LEX_SHORTS || [];
  for (const v of list) {
    if (!liveIds.has(v.term)) fail(`shorts.js : la fiche « ${v.term} » n'est pas publiée`);
    if (!/^[\w-]{11}$/.test(v.youtube || '')) fail(`shorts.js : id YouTube invalide pour ${v.term}`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(v.date || '')) fail(`shorts.js : date invalide pour ${v.term}`);
    if (!existsSync(join(lexDir, SHORTS_DIR, `${v.term}.jpg`))) fail(`couverture manquante : lexique/${SHORTS_DIR}/${v.term}.jpg`);
  }
  return [...list].sort((a, b) => b.ep - a.ep);
}

// ctx : {url (URL absolue de la page), lexUrl, author, genMark, esc, jsonLd, termHref(id), termAbsUrl(id), title(t), clean}
export function shortsPage(shorts, byId, ctx) {
  const {url, esc} = ctx;
  const desc = "Les mots de l'IA en vidéo : un terme du lexique expliqué en une minute, en short YouTube.";
  const cover = (v) => `${url}${v.term}.jpg`;
  const graph = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': url,
    url,
    name: "Les mots de l'IA en shorts",
    description: desc,
    inLanguage: 'fr',
    isPartOf: {'@id': `${ctx.lexUrl}#set`},
    author: {'@id': ctx.author['@id']},
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: shorts.map((v, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'VideoObject',
          name: v.title,
          description: ctx.clean(byId[v.term].short),
          thumbnailUrl: cover(v),
          uploadDate: v.date,
          embedUrl: `https://www.youtube-nocookie.com/embed/${v.youtube}`,
          url: `https://www.youtube.com/shorts/${v.youtube}`,
          inLanguage: 'fr',
          about: {'@type': 'DefinedTerm', name: ctx.title(byId[v.term]), url: ctx.termAbsUrl(v.term)},
        },
      })),
    },
  };
  const card = (v) => `    <article class="short">
      <button class="play" type="button" data-yt="${esc(v.youtube)}" aria-label="Lire le short : ${esc(v.title)}">
        <img src="${esc(v.term)}.jpg" width="540" height="960" alt="" loading="lazy" decoding="async">
        <span class="tri" aria-hidden="true"></span>
      </button>
      <h2>${esc(v.title)}</h2>
      <p class="meta">Épisode ${v.ep} · <a href="${esc(ctx.termHref(v.term))}">la fiche ${esc(ctx.title(byId[v.term]))}</a> · <a href="https://www.youtube.com/shorts/${esc(v.youtube)}">YouTube</a></p>
    </article>`;
  return `<!doctype html>
${ctx.genMark}
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Shorts | Lexique IA</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
<meta name="author" content="Pierre-Adrien Lair">
<meta property="og:site_name" content="Lexique IA">
<meta property="og:locale" content="fr_FR">
<meta property="og:title" content="Les mots de l'IA en shorts">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:type" content="website">
${shorts.length ? `<meta property="og:image" content="${cover(shorts[0])}">\n` : ''}<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0b0b0b">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400;6..72,600;6..72,800&display=swap" rel="stylesheet">
<style>
:root{--bg:#0b0b0b;--line:#262626;--text:#f2f2f2;--muted:#a8a8a8;--accent:#7CFFB2;--top:57px;--serif:Newsreader,Georgia,'Times New Roman',serif}
*{box-sizing:border-box;margin:0;padding:0}
body{background:var(--bg);color:var(--text);font-family:var(--serif);font-size:18px;line-height:1.6;-webkit-font-smoothing:antialiased}
a{color:inherit}
:focus-visible{outline:2px solid var(--accent);outline-offset:3px}
.top{position:sticky;top:0;z-index:40;display:flex;align-items:center;gap:16px;height:var(--top);padding:0 24px;border-bottom:1px solid var(--line);background:rgba(11,11,11,.94);backdrop-filter:blur(8px)}
.brand{font-weight:800;font-variation-settings:'opsz' 72;font-size:22px;letter-spacing:-.01em;text-decoration:none;white-space:nowrap}
.top a.navlink{font-size:16px;font-weight:600;text-decoration:none;white-space:nowrap;color:var(--muted)}
.top a.navlink[aria-current]{color:var(--accent)}
.top a.back{font-size:15px;color:var(--muted);text-decoration:none;white-space:nowrap;margin-left:auto}
.top a:hover{color:var(--text)}
main{max-width:1120px;margin:0 auto;padding:48px 24px 80px}
h1{font-weight:800;font-variation-settings:'opsz' 72;font-size:44px;line-height:1.1;letter-spacing:-.02em}
.lead{color:var(--muted);margin-top:10px;max-width:40em}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:40px 28px;margin-top:40px}
.play,.frame{position:relative;display:block;width:100%;aspect-ratio:9/16;border:1px solid var(--line);border-radius:14px;overflow:hidden;background:#000}
.play{padding:0;cursor:pointer}
.play img{display:block;width:100%;height:100%;object-fit:cover;transition:transform .2s}
.play:hover img{transform:scale(1.02)}
.tri{position:absolute;left:50%;top:22%;width:68px;height:68px;margin:-34px 0 0 -34px;border-radius:50%;background:rgba(0,0,0,.6);border:2px solid var(--accent)}
.tri::after{content:'';position:absolute;left:24px;top:18px;border-style:solid;border-width:14px 0 14px 22px;border-color:transparent transparent transparent var(--accent)}
.frame iframe{position:absolute;inset:0;width:100%;height:100%;border:0}
.short h2{font-size:21px;font-weight:600;line-height:1.25;margin-top:14px}
.meta{font-size:15px;color:var(--muted);margin-top:6px}
.meta a{text-decoration-color:#555;text-underline-offset:3px}
.meta a:hover{color:var(--text)}
@media (max-width:900px){.top{gap:12px;padding:0 16px}.brand{font-size:19px}.top a.back{display:none}main{padding:32px 16px 64px}h1{font-size:34px}.grid{grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:32px 16px}.short h2{font-size:18px}}
</style>
${ctx.jsonLd(graph)}
</head>
<body>
<header class="top">
  <a class="brand" href="/lexique/">Lexique IA</a>
  <a class="navlink" href="/lexique/shorts/" aria-current="page">Shorts</a>
  <a class="back" href="/">Pierre-Adrien Lair, CV</a>
</header>
<main>
  <h1>Shorts</h1>
  <p class="lead">Un terme du lexique expliqué en une minute, publié sur YouTube.</p>
  <div class="grid">
${shorts.map(card).join('\n')}
  </div>
</main>
<script>
// Le lecteur YouTube ne se charge qu'au clic : la page reste légère.
document.addEventListener('click', function (e) {
  var b = e.target.closest('.play');
  if (!b) return;
  var f = document.createElement('div');
  f.className = 'frame';
  var i = document.createElement('iframe');
  i.src = 'https://www.youtube-nocookie.com/embed/' + b.dataset.yt + '?autoplay=1&rel=0';
  i.title = b.getAttribute('aria-label');
  i.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
  i.allowFullscreen = true;
  f.appendChild(i);
  b.replaceWith(f);
});
</script>
</body>
</html>
`;
}

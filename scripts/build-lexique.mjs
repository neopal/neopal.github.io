#!/usr/bin/env node
// Génère les pages statiques du Lexique IA (SEO) à partir de lexique/index.html.
//
//   node scripts/build-lexique.mjs            # à relancer après chaque modification de lexique/terms.js
//   node scripts/build-lexique.mjs --og       # force la régénération des images OG
//
// Produit :
//   lexique/<id>/index.html   une page par terme 'live' (head propre, JSON-LD DefinedTerm, fiche pré-rendue)
//   lexique/index.html        mis à jour entre marqueurs : JSON-LD DefinedTermSet + index pré-rendu dans #panel
//   lexique/og/<id>.jpg       image Open Graph 1200x630 par terme (Chrome headless + ffmpeg, si disponibles)
//   sitemap.xml               racine + /lexique/ + une URL par terme live
//   lexique/llms.txt          index des définitions pour les assistants IA (format llms.txt)
//   lexique/llms-full.txt     toutes les fiches en texte brut, sources comprises
//
// Idempotent : relancer sans changement dans terms.js donne des fichiers identiques.
// Variables : LEX_TERMS (chemin d'un terms.js alternatif), LEX_DATE (lastmod, AAAA-MM-JJ, défaut : aujourd'hui).
// Aucune dépendance npm.

import {readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, rmSync, statSync} from 'node:fs';
import {createRequire} from 'node:module';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {dirname, join, resolve} from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';
import {tmpdir} from 'node:os';
import vm from 'node:vm';
import {SHORTS_DIR, loadShorts, shortsPage} from './shorts-page.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const LEX = join(ROOT, 'lexique');
const SITE = 'https://neopal.github.io';
const BASE = '/lexique/';
const LEX_URL = SITE + BASE;
const GEN_MARK = '<!-- généré par scripts/build-lexique.mjs, ne pas éditer : modifier lexique/terms.js puis relancer -->';
const FORCE_OG = process.argv.includes('--og');
const TODAY = process.env.LEX_DATE || new Date().toLocaleDateString('sv-SE'); // AAAA-MM-JJ, heure locale
const DESC_MAX = 155;
const OG_VERSION = 1; // incrémenter si le gabarit de l'image OG change
const LICENSE = 'https://creativecommons.org/licenses/by/4.0/';
// Même @id que la Person du CV (index.html à la racine) : les moteurs relient l'auteur des fiches au profil.
const AUTHOR = {
  '@type': 'Person',
  '@id': SITE + '/#person',
  name: 'Pierre-Adrien Lair',
  url: SITE + '/',
  jobTitle: 'Senior Lead Analytics & AI, directeur du LAB IA Converteo',
  sameAs: ['https://www.linkedin.com/in/pierre-adrien-lair-55a6a850/', 'https://x.com/pal_analytics'],
};

const require = createRequire(import.meta.url);
const R = require(join(LEX, 'render.js'));
const esc = R.escapeHtml;

function fail(msg) {
  console.error(`build-lexique : ${msg}`);
  process.exit(1);
}

// ---------- Données ----------
function loadTerms() {
  const file = process.env.LEX_TERMS ? resolve(process.env.LEX_TERMS) : join(LEX, 'terms.js');
  const ctx = {window: {}};
  try {
    vm.runInNewContext(readFileSync(file, 'utf8'), ctx, {filename: file});
  } catch (e) {
    fail(`impossible de charger ${file} (rien n'a été écrit)\n${e.stack || e}`);
  }
  const cats = ctx.window.DICO_CATEGORIES;
  const terms = ctx.window.DICO_TERMS;
  if (!cats || !Array.isArray(terms)) fail(`${file} ne définit pas window.DICO_CATEGORIES / window.DICO_TERMS`);
  const ids = new Set();
  for (const t of terms) {
    if (!t.id || !/^[a-z0-9-]+$/.test(t.id)) fail(`id invalide : ${JSON.stringify(t.id)}`);
    if (ids.has(t.id)) fail(`id en double : ${t.id}`);
    ids.add(t.id);
  }
  return {cats, terms};
}

// Schémas : lexique/schemas/<id>.svg (source) -> t.schema, et lexique/schemas.js pour le navigateur.
function loadSchemas(terms) {
  const dir = join(LEX, 'schemas');
  const byId = new Map(terms.map((t) => [t.id, t]));
  const out = {};
  const files = existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith('.svg')).sort() : [];
  for (const f of files) {
    const id = f.slice(0, -4);
    if (!byId.has(id)) { console.warn(`schéma ignoré (pas encore de fiche) : lexique/schemas/${f}`); continue; }
    const svg = readFileSync(join(dir, f), 'utf8').replace(/<\?xml[^>]*>\s*/, '').replace(/\s*\n\s*/g, ' ').trim();
    if (!/^<svg[\s>]/.test(svg) || !/<\/svg>$/.test(svg)) fail(`lexique/schemas/${f} n'est pas un <svg> seul`);
    if (/<script|\son[a-z]+=|<foreignObject/i.test(svg)) fail(`lexique/schemas/${f} : script ou gestionnaire interdit`);
    if (!/<title[\s>]/.test(svg)) fail(`lexique/schemas/${f} : <title> manquant (accessibilité)`);
    out[id] = svg;
    byId.get(id).schema = svg;
  }
  const js = `// Généré par scripts/build-lexique.mjs à partir de lexique/schemas/*.svg, ne pas éditer.\nwindow.LEX_SCHEMAS = ${JSON.stringify(out, null, 1).replace(/</g, '\\u003c')};\n`;
  return () => writeIfChanged(join(LEX, 'schemas.js'), js) && console.log('màj      lexique/schemas.js');
}

// ---------- Utilitaires ----------
const sha = (s) => createHash('sha256').update(s).digest('hex');
const clean = (s) => String(s == null ? '' : s).replace(/\s+/g, ' ').trim();
const plainTitle = (t) => clean(String(t.title).replace(/[«»]/g, ''));
const termAbsUrl = (id) => SITE + R.termUrl(id, {base: BASE, urls: 'path'});

function truncate(s, max = DESC_MAX) {
  s = clean(s);
  if (s.length <= max) return s;
  let cut = s.slice(0, max - 1);
  const sp = cut.lastIndexOf(' ');
  if (sp > max * 0.6) cut = cut.slice(0, sp);
  return cut.replace(/[\s,;:.\-–—(«]+$/, '') + '…';
}

function absAsset(src) {
  if (!src) return '';
  if (/^https?:\/\//i.test(src)) return src;
  if (src.charAt(0) === '/') return SITE + src;
  return LEX_URL + src;
}

// JSON sûr dans un <script> : pas de fermeture de balise possible.
const jsonLd = (obj) => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`;

function writeIfChanged(file, content) {
  if (existsSync(file) && readFileSync(file, 'utf8') === content) return false;
  mkdirSync(dirname(file), {recursive: true});
  writeFileSync(file, content);
  return true;
}

// Remplace exactement une occurrence, sinon échoue (le head a changé : à adapter ici).
function replaceOnce(html, re, by, what) {
  const n = (html.match(new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g')) || []).length;
  if (n !== 1) fail(`${what} : ${n} occurrence(s) trouvée(s) dans lexique/index.html, 1 attendue`);
  return html.replace(re, by);
}

// ---------- Gabarit ----------
const LD_START = '<!-- lex:jsonld -->';
const LD_END = '<!-- /lex:jsonld -->';
const PANEL_RE = /(<main class="panel" id="panel">)[\s\S]*?(<\/main>)/;

// index.html est à la fois gabarit et sortie : on retire d'abord ce que le script y a mis.
function stripGenerated(html) {
  html = html.replace(new RegExp(`\\n?${LD_START}[\\s\\S]*?${LD_END}`, 'g'), '');
  html = replaceOnce(html, PANEL_RE, '$1$2', '<main class="panel" id="panel">');
  return html;
}

function withJsonLd(html, block) {
  return replaceOnce(html, /\n<\/head>/, () => `\n${LD_START}\n${block}\n${LD_END}\n</head>`, '</head>');
}

function withPanel(html, inner) {
  return replaceOnce(html, PANEL_RE, (m, a, b) => `${a}${inner}\n  ${b}`, '#panel');
}

// Balises du head propres à chaque page, supprimées du gabarit avant réinsertion.
const HEAD_TAGS = [
  [/\n<title>[^<]*<\/title>/, 'title'],
  [/\n<meta name="description" content="[^"]*">/, 'meta description'],
  [/\n<link rel="canonical" href="[^"]*">/, 'canonical'],
];
const HEAD_MULTI = [
  /\n<meta property="og:[^"]+" content="[^"]*">/g,
  /\n<meta property="article:[^"]+" content="[^"]*">/g,
  /\n<meta name="twitter:[^"]+" content="[^"]*">/g,
];

function termHead(html, t, cats, og, dates) {
  for (const [re, what] of HEAD_TAGS) html = replaceOnce(html, re, '', what);
  for (const re of HEAD_MULTI) html = html.replace(re, '');
  const title = R.pageTitle(t);
  const desc = truncate(t.short || t.image || '');
  const url = termAbsUrl(t.id);
  const tags = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(desc)}">`,
    `<link rel="canonical" href="${esc(url)}">`,
    `<meta property="og:site_name" content="Lexique IA">`,
    `<meta property="og:locale" content="fr_FR">`,
    `<meta property="og:type" content="article">`,
    `<meta property="og:title" content="${esc(title)}">`,
    `<meta property="og:description" content="${esc(desc)}">`,
    `<meta property="og:url" content="${esc(url)}">`,
    `<meta property="og:image" content="${esc(og.url)}">`,
    og.width ? `<meta property="og:image:width" content="${og.width}">` : '',
    og.height ? `<meta property="og:image:height" content="${og.height}">` : '',
    `<meta property="og:image:alt" content="${esc(plainTitle(t))}">`,
    `<meta property="article:published_time" content="${dates.pub}">`,
    `<meta property="article:modified_time" content="${dates.mod}">`,
    `<meta property="article:author" content="${SITE}/">`,
    `<meta property="article:section" content="${esc((cats[t.cat] || {}).label || '')}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${esc(title)}">`,
    `<meta name="twitter:description" content="${esc(desc)}">`,
    `<meta name="twitter:image" content="${esc(og.url)}">`,
  ].filter(Boolean);
  html = replaceOnce(html, /(<meta name="viewport" content="[^"]*">)/, (m) => `${m}\n${tags.join('\n')}`, 'meta viewport');
  return html;
}

function alternateNames(t) {
  return [t.en, ...(Array.isArray(t.aliases) ? t.aliases : []), ...(Array.isArray(t.aliasesFr) ? t.aliasesFr : [])]
    .map(clean).filter(Boolean)
    .filter((a, i, all) => all.indexOf(a) === i && R.normalize(a) !== R.normalize(t.title));
}

// Graphe JSON-LD d'une fiche : le terme (DefinedTerm), la page qui le définit (TechArticle : auteur, dates,
// licence, sources), la vidéo s'il y en a une, et le fil d'Ariane.
function termGraph(t, cats, og, dates) {
  const url = termAbsUrl(t.id);
  const alt = alternateNames(t);
  const term = {
    '@type': 'DefinedTerm',
    '@id': url + '#term',
    name: plainTitle(t),
    description: clean(t.short),
    url,
    inLanguage: 'fr',
    inDefinedTermSet: {'@id': LEX_URL + '#set'},
  };
  if (alt.length) term.alternateName = alt.length === 1 ? alt[0] : alt;
  const sources = (Array.isArray(t.sources) ? t.sources : []).filter((s) => s && s.url);
  const related = (t.links || []).filter((l) => liveIds.has(l)).map((l) => ({'@id': termAbsUrl(l) + '#term'}));
  const article = {
    '@type': 'TechArticle',
    '@id': url + '#article',
    headline: truncate(plainTitle(t), 110),
    name: R.pageTitle(t),
    description: clean(t.short),
    url,
    mainEntityOfPage: url,
    inLanguage: 'fr',
    image: og.url,
    datePublished: dates.pub,
    dateModified: dates.mod,
    author: {'@id': AUTHOR['@id']},
    publisher: {'@id': AUTHOR['@id']},
    license: LICENSE,
    isAccessibleForFree: true,
    articleSection: (cats[t.cat] || {}).label || undefined,
    about: {'@id': url + '#term'},
    mainEntity: {'@id': url + '#term'},
    isPartOf: {'@id': LEX_URL + '#set'},
  };
  if (related.length) article.mentions = related;
  if (sources.length) article.citation = sources.map((s) => ({'@type': 'CreativeWork', name: clean(s.label), url: s.url}));
  const graph = [term, article];
  if (t.video && t.video.src) {
    article.video = {'@id': url + '#video'};
    graph.push({
      '@type': 'VideoObject',
      '@id': url + '#video',
      name: `${plainTitle(t)} : la définition en vidéo`,
      description: clean(t.short),
      thumbnailUrl: absAsset(t.video.poster) || og.url,
      contentUrl: absAsset(t.video.src),
      uploadDate: dates.pub,
      inLanguage: 'fr',
      author: {'@id': AUTHOR['@id']},
      license: LICENSE,
    });
  }
  graph.push({
    '@type': 'BreadcrumbList',
    '@id': url + '#breadcrumb',
    itemListElement: [
      {'@type': 'ListItem', position: 1, name: 'Lexique IA', item: LEX_URL},
      {'@type': 'ListItem', position: 2, name: plainTitle(t), item: url},
    ],
  });
  graph.push(AUTHOR);
  graph.push({'@type': 'DefinedTermSet', '@id': LEX_URL + '#set', name: 'Lexique IA', url: LEX_URL});
  return {'@context': 'https://schema.org', '@graph': graph};
}

function definedTermSet(live) {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    '@id': LEX_URL + '#set',
    name: 'Lexique IA',
    description: "Le vocabulaire de l'IA expliqué simplement, en français, avec les sources.",
    url: LEX_URL,
    inLanguage: 'fr',
    author: AUTHOR,
    publisher: {'@id': AUTHOR['@id']},
    license: LICENSE,
    isAccessibleForFree: true,
    hasDefinedTerm: live.map((t) => ({
      '@type': 'DefinedTerm',
      '@id': termAbsUrl(t.id) + '#term',
      name: plainTitle(t),
      description: clean(t.short),
      url: termAbsUrl(t.id),
    })),
  };
}

// ---------- Images OG ----------
function findChrome() {
  const c = [
    process.env.CHROME_PATH,
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser',
  ].filter(Boolean);
  return c.find((p) => existsSync(p)) || null;
}

function hasFfmpeg() {
  try { execFileSync('ffmpeg', ['-version'], {stdio: 'ignore'}); return true; } catch { return false; }
}

function ogCardHtml(t, cats) {
  const title = plainTitle(t);
  const accent = (cats[t.cat] && cats[t.cat].color) || '#7CFFB2';
  const size = title.length <= 10 ? 150 : title.length <= 18 ? 120 : title.length <= 28 ? 96 : 78;
  return `<!doctype html><html lang="fr"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,800&display=block" rel="stylesheet">
<style>
html,body{margin:0;width:1200px;height:630px;overflow:hidden;background:#0b0b0b}
.c{box-sizing:border-box;width:1200px;height:630px;padding:0 96px;display:flex;flex-direction:column;justify-content:center}
.r{width:96px;height:8px;background:${accent};margin-bottom:44px}
h1{margin:0;font-family:Newsreader,serif;font-weight:800;font-variation-settings:'opsz' 72;font-size:${size}px;line-height:1.02;letter-spacing:-.01em;color:#f2f2f2}
p{margin:40px 0 0;font-family:Newsreader,serif;font-weight:800;font-variation-settings:'opsz' 72;font-size:36px;color:${accent}}
</style></head><body><div class="c"><div class="r"></div><h1>${esc(title)}</h1><p>Lexique IA</p></div></body></html>`;
}

function buildOgImages(live, cats) {
  const dir = join(LEX, 'og');
  const manifestFile = join(dir, 'manifest.json');
  let manifest = {};
  try { manifest = JSON.parse(readFileSync(manifestFile, 'utf8')); } catch { /* premier passage */ }
  const chrome = findChrome();
  const ffmpeg = hasFfmpeg();
  const result = {};
  const next = {};
  let tmp = null;
  for (const t of live) {
    const html = ogCardHtml(t, cats);
    const key = sha(`${OG_VERSION}\n${html}`);
    const file = join(dir, `${t.id}.jpg`);
    const fresh = existsSync(file) && manifest[t.id] === key && !FORCE_OG;
    let ok = fresh;
    if (!fresh && chrome && ffmpeg) {
      tmp = tmp || join(tmpdir(), `lexique-og-${process.pid}`);
      mkdirSync(tmp, {recursive: true});
      mkdirSync(dir, {recursive: true});
      const page = join(tmp, `${t.id}.html`);
      const png = join(tmp, `${t.id}.png`);
      writeFileSync(page, html);
      try {
        execFileSync(chrome, [
          '--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run', '--no-default-browser-check',
          `--user-data-dir=${join(tmp, 'profile')}`, '--force-device-scale-factor=1', '--window-size=1200,630',
          '--virtual-time-budget=10000', `--screenshot=${png}`, pathToFileURL(page).href,
        ], {stdio: 'ignore', timeout: 60000});
        execFileSync('ffmpeg', ['-y', '-v', 'error', '-i', png, '-vf', 'crop=1200:630:0:0', '-q:v', '3', file], {stdio: 'ignore'});
        ok = existsSync(file);
        console.log(`og       lexique/og/${t.id}.jpg`);
      } catch (e) {
        console.warn(`og : échec pour ${t.id} (${e.message}), repli sur une autre image`);
      }
    }
    if (ok) {
      next[t.id] = key;
      result[t.id] = {url: `${LEX_URL}og/${t.id}.jpg`, width: 1200, height: 630};
    } else if (existsSync(file) && manifest[t.id]) {
      // Image existante mais périmée et pas d'outil pour la refaire : on la garde.
      next[t.id] = manifest[t.id];
      result[t.id] = {url: `${LEX_URL}og/${t.id}.jpg`, width: 1200, height: 630};
    }
  }
  if (tmp) rmSync(tmp, {recursive: true, force: true});
  if (Object.keys(next).length) {
    const sorted = Object.fromEntries(Object.keys(next).sort().map((k) => [k, next[k]]));
    writeIfChanged(manifestFile, JSON.stringify(sorted, null, 2) + '\n');
  }
  return result;
}

// Image OG d'un terme : carte 1200x630 dédiée, sinon le poster de la vidéo (portrait, recadré par les réseaux),
// sinon l'image générique du lexique.
function ogFor(t, cards) {
  if (cards[t.id]) return cards[t.id];
  if (t.video && t.video.poster) return {url: absAsset(t.video.poster)};
  return {url: `${LEX_URL}videos/token.jpg`};
}

// ---------- Sitemap ----------
function buildSitemap(live, extra = []) {
  const file = join(ROOT, 'sitemap.xml');
  const old = existsSync(file) ? readFileSync(file, 'utf8') : '';
  const lastmodOf = (loc, dflt) => {
    const m = old.match(new RegExp(`<loc>${loc.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}</loc>\\s*<lastmod>([^<]+)</lastmod>`));
    return m ? m[1] : dflt;
  };
  const url = (loc, lastmod, freq, prio) =>
    `    <url>\n        <loc>${loc}</loc>\n        <lastmod>${lastmod}</lastmod>\n        <changefreq>${freq}</changefreq>\n        <priority>${prio}</priority>\n    </url>`;
  // Une URL garde sa date tant que sa page ne change pas (voir changed) ; les nouvelles prennent la date du jour.
  const write = (changed) => {
    const lm = (loc) => (changed.has(loc) ? TODAY : lastmodOf(loc, TODAY));
    const xml = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      url(SITE + '/', lastmodOf(SITE + '/', TODAY), 'monthly', '1.0'),
      url(LEX_URL, lm(LEX_URL), 'weekly', '0.8'),
      ...extra.map((loc) => url(loc, lm(loc), 'weekly', '0.6')),
      ...live.map((t) => url(termAbsUrl(t.id), lm(termAbsUrl(t.id)), 'monthly', '0.7')),
      '</urlset>',
      '',
    ].join('\n');
    return writeIfChanged(file, xml);
  };
  return {write, lastmodOf};
}

// ---------- Textes pour les assistants IA (llms.txt) ----------
const NOTE_LICENCE = "Licence CC BY 4.0 : réutilisation libre, y compris par des IA, en citant « Pierre-Adrien Lair, Lexique IA » et l'URL de la fiche.";

function buildLlmsIndex(live, cats) {
  const lines = [
    '# Lexique IA',
    '',
    `> Glossaire français de l'intelligence artificielle (LLM, agents, entraînement, inférence, évaluation, écosystème), écrit et sourcé par Pierre-Adrien Lair, directeur du LAB IA de Converteo. ${live.length} définitions, chacune avec une définition courte, une image concrète, la définition complète datée et ses sources. ${NOTE_LICENCE}`,
    '',
    `Toutes les fiches en texte brut, sources comprises : ${LEX_URL}llms-full.txt`,
    `Auteur : ${SITE}/`,
    '',
  ];
  for (const [key, c] of Object.entries(cats)) {
    const ts = live.filter((t) => t.cat === key);
    if (!ts.length) continue;
    lines.push(`## ${c.label}`, '');
    for (const t of ts) {
      const en = t.en && R.normalize(t.en) !== R.normalize(t.title) ? ` (en anglais : ${clean(t.en)})` : '';
      lines.push(`- [${plainTitle(t)}](${termAbsUrl(t.id)})${en} : ${clean(t.short)}`);
    }
    lines.push('');
  }
  return lines.join('\n');
}

function buildLlmsFull(live, cats, byId) {
  const out = [
    '# Lexique IA : toutes les définitions',
    '',
    `> ${live.length} fiches écrites et sourcées par Pierre-Adrien Lair (${SITE}/). ${NOTE_LICENCE}`,
    `> Index : ${LEX_URL}llms.txt`,
    '',
  ];
  for (const t of live) {
    const b = [`## ${plainTitle(t)}`, '', `URL : ${termAbsUrl(t.id)}`, `Catégorie : ${(cats[t.cat] || {}).label || t.cat}`];
    if (t.en && R.normalize(t.en) !== R.normalize(t.title)) b.push(`En anglais : ${clean(t.en)}`);
    const fr = (t.aliasesFr || []).map(clean).filter(Boolean);
    const en = (t.aliases || []).map(clean).filter(Boolean);
    if (fr.length) b.push(`Aussi appelé : ${fr.join(', ')}`);
    if (en.length) b.push(`Variantes anglaises : ${en.join(', ')}`);
    const sec = (title, body) => { if (body) b.push('', `### ${title}`, '', body); };
    sec('Définition courte', clean(t.short));
    sec("L'image", clean(t.image));
    sec('Imagine', clean(t.imagine));
    sec('Définition complète', (t.full || []).map(clean).join('\n\n'));
    if (t.reliability && t.reliability.level) sec('Fiable ?', `${clean(t.reliability.level)} : ${clean(t.reliability.why)}`);
    if (t.table && Array.isArray(t.table.rows) && t.table.rows.length) {
      const tb = t.table;
      const row = (r) => `| ${r.map(clean).join(' | ')} |`;
      sec(clean(tb.caption) || 'Comparatif', [row(tb.columns), row(tb.columns.map(() => '---')), ...tb.rows.map(row)].join('\n') +
        (tb.asOf ? `\n\nRelevé du ${clean(tb.asOf)}.` : '') + (tb.note ? ` ${clean(tb.note)}` : ''));
    }
    sec('2024 vs 2026', clean(t.then));
    sec('Dans le jargon', (t.jargon || []).filter((j) => j && j.say).map((j) => `- ${clean(j.say)} : ${clean(j.means)}`).join('\n'));
    sec('Solutions populaires', (t.solutions || []).filter((s) => s && s.name).map((s) => `- ${clean(s.name)}${s.kind ? ` (${clean(s.kind)})` : ''} : ${s.url}`).join('\n'));
    sec('Entendu au bureau', (t.office || []).map((m) => `- ${m.who === 'q' ? 'Question' : 'Réponse'} : ${clean(m.text)}`).join('\n'));
    sec('À éviter', clean(t.avoid));
    sec('Termes liés', (t.links || []).filter((l) => byId[l] && byId[l].status === 'live').map((l) => `- ${plainTitle(byId[l])} : ${termAbsUrl(l)}`).join('\n'));
    sec('Sources', (t.sources || []).filter((s) => s && s.label).map((s) => `- ${clean(s.label)}${s.url ? ` : ${s.url}` : ''}`).join('\n'));
    out.push(b.join('\n'), '');
  }
  return out.join('\n');
}

// ---------- Main ----------
const {cats, terms} = loadTerms();
const writeSchemas = loadSchemas(terms);
const live = terms.filter((t) => t.status === 'live');
const liveIds = new Set(live.map((t) => t.id));
const indexFile = join(LEX, 'index.html');
const source = readFileSync(indexFile, 'utf8');
const template = stripGenerated(source);
const changed = new Set();
if (liveIds.has(SHORTS_DIR)) fail(`l'id « ${SHORTS_DIR} » est réservé à la page des shorts`);
const shorts = loadShorts(LEX, liveIds, fail);
const SHORTS_URL = LEX_URL + SHORTS_DIR + '/';
const sitemap = buildSitemap(live, shorts.length ? [SHORTS_URL] : []);

// Garde-fous sur le gabarit (contrat avec le front).
if (!/<html lang="fr">/.test(template)) fail('<html lang="fr"> introuvable dans lexique/index.html');
if (!template.includes('window.LEX_BASE')) fail('script de démarrage introuvable dans lexique/index.html');
if (!/\n<body>/.test(template)) fail('<body> introuvable dans lexique/index.html');

writeSchemas();
const cards = buildOgImages(live, cats);

// 1. Page d'accueil du lexique : JSON-LD DefinedTermSet + index pré-rendu.
let index = withJsonLd(template, jsonLd(definedTermSet(live)));
index = withPanel(index, R.renderIndex(cats, terms));
if (writeIfChanged(indexFile, index)) { changed.add(LEX_URL); console.log('màj      lexique/index.html'); }

// 2. Une page par terme publié.
const pageTemplate = template.replace(/^<!doctype html>\n/i, (m) => `${m}${GEN_MARK}\n`);
// Date d'ajout de la page d'un terme dans l'historique git (vide hors dépôt git).
function gitAddedDate(id) {
  try {
    const out = execFileSync('git', ['log', '--diff-filter=A', '--format=%as', '--', `lexique/${id}/index.html`], {cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore']});
    return out.trim().split('\n').filter(Boolean).pop() || '';
  } catch { return ''; }
}

// Dates : datePublished est conservée d'un build à l'autre (au premier passage : la date du sitemap) ;
// dateModified ne change que si le reste de la page change.
const MOD = '__LEX_DATE_MODIFIED__';
for (const t of live) {
  const file = join(LEX, t.id, 'index.html');
  const old = existsSync(file) ? readFileSync(file, 'utf8') : '';
  const oldPub = (old.match(/"datePublished":"(\d{4}-\d{2}-\d{2})"/) || [])[1];
  const oldMod = (old.match(/"dateModified":"(\d{4}-\d{2}-\d{2})"/) || [])[1];
  const dates = {pub: oldPub || gitAddedDate(t.id) || sitemap.lastmodOf(termAbsUrl(t.id), TODAY), mod: MOD};
  const og = ogFor(t, cards);
  let html = termHead(pageTemplate, t, cats, og, dates);
  html = html.replace('<html lang="fr">', () => `<html lang="fr" data-term="${esc(t.id)}">`);
  html = html.replace(/\n<body>/, '\n<body class="has-pager">');
  html = withJsonLd(html, jsonLd(termGraph(t, cats, og, dates)));
  html = withPanel(html, R.renderTerm(t, cats, terms));
  const same = oldMod && old === html.split(MOD).join(oldMod);
  html = html.split(MOD).join(same ? oldMod : TODAY);
  if (writeIfChanged(file, html)) { changed.add(termAbsUrl(t.id)); console.log(`page     lexique/${t.id}/index.html`); }
}

// 3. Pages devenues obsolètes (terme repassé en 'soon' ou supprimé) : seulement celles générées ici.
for (const name of readdirSync(LEX)) {
  const dir = join(LEX, name);
  const page = join(dir, 'index.html');
  if (liveIds.has(name) || name === SHORTS_DIR || !statSync(dir).isDirectory() || !existsSync(page)) continue;
  if (!readFileSync(page, 'utf8').includes(GEN_MARK)) continue;
  rmSync(dir, {recursive: true, force: true});
  console.log(`supprimé lexique/${name}/ (plus publié)`);
  const og = join(LEX, 'og', `${name}.jpg`);
  if (existsSync(og)) rmSync(og);
}

// 3 bis. Page des shorts publiés (lexique/shorts.js).
if (shorts.length) {
  const byIdLive = Object.fromEntries(live.map((t) => [t.id, t]));
  const html = shortsPage(shorts, byIdLive, {
    url: SHORTS_URL, lexUrl: LEX_URL, author: AUTHOR, genMark: GEN_MARK, esc, jsonLd, clean, title: plainTitle, termAbsUrl,
    termHref: (id) => R.termUrl(id, {base: BASE, urls: 'path'}),
  });
  if (writeIfChanged(join(LEX, SHORTS_DIR, 'index.html'), html)) { changed.add(SHORTS_URL); console.log(`page     lexique/${SHORTS_DIR}/index.html`); }
}

// 4. Sitemap.
if (sitemap.write(changed)) console.log('màj      sitemap.xml');

// 5. Textes pour les assistants IA.
const byIdAll = Object.fromEntries(terms.map((t) => [t.id, t]));
if (writeIfChanged(join(LEX, 'llms.txt'), buildLlmsIndex(live, cats))) console.log('màj      lexique/llms.txt');
if (writeIfChanged(join(LEX, 'llms-full.txt'), buildLlmsFull(live, cats, byIdAll))) console.log('màj      lexique/llms-full.txt');

console.log(`ok : ${live.length} terme(s) publié(s) sur ${terms.length}, ${Object.keys(cards).length} image(s) OG`);

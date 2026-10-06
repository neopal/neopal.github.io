#!/usr/bin/env node
// Vérifie un lot de fiches du Lexique IA (ou un fichier d'enrichissements) avant de le fusionner dans lexique/terms.js.
//
//   node scripts/check-lot.mjs <lot.js>                    fiches nouvelles (module.exports = [ {...}, ... ])
//   node scripts/check-lot.mjs <enrichissements.json>      champs à remplacer dans des fiches publiées ({id: {champ: valeur}})
//   options : --urls     teste aussi chaque URL des sources et des solutions (réseau)
//             --archive  lot déjà fusionné : les ids publiés ne sont pas une erreur (pour relire une vague archivée)
//
// Règles : content/dico/brief-fiche.md. Sortie en erreur (code 1) s'il reste une erreur ; les avertissements n'arrêtent rien.
// Variable : LEX_TERMS (chemin d'un terms.js alternatif). Aucune dépendance npm.

import {readFileSync, existsSync} from 'node:fs';
import {createRequire} from 'node:module';
import {dirname, join, resolve} from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';
import vm from 'node:vm';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const LEX = join(ROOT, 'lexique');

export const FORMS = ['A', 'B', 'C', 'D', 'E'];
const RELIABILITY = ['solide', 'à nuancer', 'fragile'];
// Champs d'une fiche, dans l'ordre de lexique/terms.js. `num` est donné à la fusion, jamais dans un lot.
export const FIELDS = ['id', 'status', 'title', 'en', 'aliases', 'aliasesFr', 'jargon', 'graphLabel', 'cat', 'links', 'solutions', 'short',
  'image', 'imagineForm', 'imagine', 'full', 'table', 'reliability', 'then', 'office', 'avoid', 'video', 'sources'];
const REQUIRED = ['id', 'status', 'title', 'en', 'aliases', 'aliasesFr', 'jargon', 'cat', 'links', 'short', 'image', 'imagineForm', 'imagine',
  'full', 'office', 'avoid', 'video', 'sources'];
// Typographie (règles dures) : pas de tiret cadratin ni demi-cadratin, pas de point médian, pas de guillemets anglais courbes.
const FORBIDDEN = [['—', 'tiret cadratin'], ['–', 'demi-cadratin'], ['·', 'point médian'], ['“', 'guillemet anglais'], ['”', 'guillemet anglais']];

export function loadTerms(file = process.env.LEX_TERMS ? resolve(process.env.LEX_TERMS) : join(LEX, 'terms.js')) {
  const ctx = {window: {}};
  vm.runInNewContext(readFileSync(file, 'utf8'), ctx, {filename: file});
  return {file, cats: ctx.window.DICO_CATEGORIES, terms: ctx.window.DICO_TERMS};
}

export function loadInput(file) {
  const abs = resolve(file);
  if (!existsSync(abs)) throw new Error(`${file} introuvable`);
  if (abs.endsWith('.json')) return {kind: 'enrich', data: JSON.parse(readFileSync(abs, 'utf8'))};
  const require = createRequire(pathToFileURL(abs));
  delete require.cache[abs];
  const data = require(abs);
  if (!Array.isArray(data)) throw new Error(`${file} doit exporter un tableau de fiches (module.exports = [ ... ])`);
  return {kind: 'lot', data};
}

const words = (s) => String(s || '').trim().split(/\s+/).filter(Boolean).length;
// Découpe en phrases sans couper les abréviations courantes ni les nombres décimaux.
const sentences = (s) => String(s || '').replace(/\b(M|Mme|Dr|etc|cf|vs|p|n°|J\.-C)\./g, '$1§').split(/(?<=[.!?…](?:[  ]?»)?)\s+(?=[A-ZÀ-ÖØ-Þ«])/);

// Textes de la fiche soumis aux règles d'écriture (les libellés de sources et les URL citent des titres tels quels).
function proseOf(t) {
  const out = [];
  const add = (where, v) => { if (typeof v === 'string' && v) out.push([where, v]); };
  for (const k of ['title', 'short', 'image', 'imagine', 'then', 'avoid']) add(k, t[k]);
  (t.full || []).forEach((p, i) => add(`full[${i}]`, p));
  (t.office || []).forEach((m, i) => add(`office[${i}]`, m && m.text));
  (t.jargon || []).forEach((j, i) => add(`jargon[${i}]`, j && j.means));
  if (t.table) add('table.note', t.table.note);
  if (t.reliability) add('reliability.why', t.reliability.why);
  return out;
}

function checkSchema(id, err, warn) {
  const file = join(LEX, 'schemas', `${id}.svg`);
  if (!existsSync(file)) return warn('pas de schéma lexique/schemas/' + id + '.svg (une fiche sans vidéo en a normalement un)');
  const svg = readFileSync(file, 'utf8');
  if (!/^\s*(<\?xml[^>]*>\s*)?<svg[\s>]/.test(svg)) err('schéma : le fichier doit être un <svg> seul');
  if (!/<title[\s>]/.test(svg)) err('schéma : <title> manquant (accessibilité)');
  if (/<script|\son[a-z]+=|<foreignObject/i.test(svg)) err('schéma : script ou gestionnaire interdit');
  const vb = svg.match(/viewBox="-?[\d.]+ -?[\d.]+ ([\d.]+) [\d.]+"/);
  if (!vb || +vb[1] !== 360) err('schéma : viewBox de 360 de large attendu ("0 0 360 <hauteur>")');
  if (/(fill|stroke)="#[0-9a-f]{3,6}"/i.test(svg)) warn('schéma : couleur écrite en dur, préférer les classes .schema svg de lexique/index.html');
}

// Vérifie une fiche complète. ctx : {cats, byId (publiés + lot), lotIds, archive}.
export function checkTerm(t, ctx, report) {
  const where = `fiche ${t && t.id ? t.id : '(sans id)'}`;
  const err = (m) => report.errors.push(`${where} : ${m}`);
  const warn = (m) => report.warnings.push(`${where} : ${m}`);
  // Règles éditoriales : bloquantes pour un lot neuf, simples avertissements pour une vague archivée (les règles ont évolué depuis).
  const rule = ctx.archive ? warn : err;
  if (!t || typeof t !== 'object') return err('ce n\'est pas un objet');
  for (const k of REQUIRED) if (!(k in t)) err(`champ manquant : ${k}`);
  for (const k of Object.keys(t)) if (!FIELDS.includes(k)) err(k === 'num' ? 'pas de champ num dans un lot (la fusion numérote)' : `champ inconnu : ${k}`);
  if (t.id && !/^[a-z0-9-]+$/.test(t.id)) err(`id invalide : ${t.id} (minuscules, chiffres et tirets)`);
  if (t.status !== 'live') err(`status doit valoir 'live'`);
  const pub = ctx.published.get(t.id);
  if (pub && pub.status === 'live' && !ctx.archive) err('id déjà publié dans lexique/terms.js (pour enrichir une fiche publiée, passer par un fichier d\'enrichissements)');
  if (t.cat && !ctx.cats[t.cat]) err(`catégorie inconnue : ${t.cat} (valides : ${Object.keys(ctx.cats).join(', ')})`);
  if (t.cat === 'mythes' && !(t.graphLabel || '').startsWith('Mythe : ')) warn('un mythe porte un graphLabel « Mythe : … »');
  for (const k of ['aliases', 'aliasesFr', 'jargon', 'links', 'full', 'office', 'sources']) if (k in t && !Array.isArray(t[k])) err(`${k} doit être un tableau`);
  if (Array.isArray(t.jargon)) {
    if (t.jargon.length > 4) warn(`jargon : ${t.jargon.length} entrées, 4 au plus`);
    t.jargon.forEach((j, i) => { if (!j || !j.say || !j.means) err(`jargon[${i}] : {say, means} attendu`); });
  }
  if (Array.isArray(t.full) && !t.full.length) err('full est vide');
  if (Array.isArray(t.office) && (t.office.length !== 2 || t.office[0]?.who !== 'q' || t.office[1]?.who !== 'a')) err('office : deux répliques attendues, {who: \'q\'} puis {who: \'a\'}');
  if (t.short && words(t.short) > 30) rule(`short : ${words(t.short)} mots, 30 au plus (c'est aussi la meta description)`);
  if (t.imagineForm && !FORMS.includes(t.imagineForm)) err(`imagineForm : ${t.imagineForm}, attendu A à E`);
  if (t.imagineForm === 'C') warn('forme C (scène absurde du studio) : deux fiches au plus dans tout le lexique, déjà atteint');
  // Liens : vers des fiches existantes, sans doublon, jamais vers une fiche de même forme d'Imagine.
  if (Array.isArray(t.links)) {
    if (t.links.length < 3 || t.links.length > 7) warn(`links : ${t.links.length} liens, 3 à 7 attendus`);
    const seen = new Set();
    for (const l of t.links) {
      if (seen.has(l)) err(`lien en double : ${l}`);
      seen.add(l);
      if (l === t.id) rule('lien vers elle-même');
      const other = ctx.byId.get(l);
      if (!other) { err(`lien vers un id inconnu : ${l}`); continue; }
      if (t.imagineForm && other.imagineForm === t.imagineForm) rule(`lien vers ${l}, qui a la même forme d'Imagine (${t.imagineForm})`);
    }
  }
  for (const [id, other] of ctx.byId) {
    if (id === t.id || ctx.lotIds.has(id)) continue;
    if ((other.links || []).includes(t.id) && t.imagineForm && other.imagineForm === t.imagineForm) rule(`${id} (publiée) la lie et a la même forme d'Imagine (${t.imagineForm})`);
  }
  if (Array.isArray(t.solutions)) {
    if (t.solutions.length > 6 && t.id !== 'skill') warn(`solutions : ${t.solutions.length}, 6 au plus`);
    t.solutions.forEach((s, i) => { if (!s || !s.name || !s.kind || !/^https?:\/\//.test(s.url || '')) err(`solutions[${i}] : {name, kind, url} attendu`); });
  }
  if (t.table) {
    const tb = t.table;
    if (!tb.caption || !tb.asOf || !Array.isArray(tb.columns) || !Array.isArray(tb.rows)) err('table : {caption, asOf, columns, rows, note?} attendu');
    else {
      if (tb.columns.length < 3 || tb.columns.length > 6) warn(`table : ${tb.columns.length} colonnes, 3 à 6 attendues`);
      if (tb.rows.length < 4 || tb.rows.length > 10) warn(`table : ${tb.rows.length} lignes, 4 à 10 attendues`);
      tb.rows.forEach((r, i) => { if (!Array.isArray(r) || r.length !== tb.columns.length) err(`table : la ligne ${i + 1} n'a pas ${tb.columns.length} cellules`); });
    }
  }
  if (t.reliability && !RELIABILITY.includes(t.reliability.level)) err(`reliability.level : ${t.reliability.level}, attendu ${RELIABILITY.join(' / ')}`);
  if (t.video !== null && t.video !== undefined) {
    if (!t.video.src || !t.video.poster) err('video : null ou {src, poster}');
    else for (const f of [t.video.src, t.video.poster]) if (!existsSync(join(LEX, f))) err(`video : lexique/${f} introuvable`);
  }
  if (Array.isArray(t.sources)) {
    if (!t.sources.length) warn('aucune source (autorisé seulement si aucun fait vérifiable)');
    t.sources.forEach((s, i) => { if (!s || !s.label || !/^https?:\/\//.test(s.url || '')) err(`sources[${i}] : {label, url} attendu`); });
  }
  checkProse(t, rule, warn);
  if (!t.video) checkSchema(t.id, err, warn);
}

function checkProse(t, err, warn) {
  for (const [w, s] of proseOf(t)) {
    for (const [c, name] of FORBIDDEN) if (s.includes(c)) err(`${w} : ${name} interdit (« ${c} »)`);
    if (/«(?=\S)|(?<=\S)»/.test(s.replace(/[  ]/g, ' '))) warn(`${w} : guillemets français sans espace intérieure`);
    for (const ph of sentences(s)) if (words(ph) > 45) err(`${w} : phrase de ${words(ph)} mots, 45 au plus (« ${ph.slice(0, 60)}… »)`);
  }
}

// Enrichissements : {id: {champ: nouvelle valeur complète}}. On ne fait qu'ajouter : l'existant doit être recopié à l'identique.
export function checkEnrich(data, ctx, report) {
  for (const [id, fields] of Object.entries(data)) {
    const where = `enrichissement ${id}`;
    const t = ctx.published.get(id);
    if (!t) { report.errors.push(`${where} : fiche inconnue dans lexique/terms.js`); continue; }
    for (const [k, v] of Object.entries(fields)) {
      if (!FIELDS.includes(k) || k === 'id' || k === 'status') report.errors.push(`${where} : champ ${k} non modifiable ici`);
      if (Array.isArray(t[k]) && Array.isArray(v)) {
        const keep = new Set(v.map((x) => JSON.stringify(x)));
        const lost = t[k].filter((x) => !keep.has(JSON.stringify(x)));
        if (lost.length) report.warnings.push(`${where} : ${k} perd ${lost.length} élément(s) existant(s) (un enrichissement n'enlève rien, sauf correction voulue)`);
      }
    }
    const {num, ...merged} = {...t, ...fields};
    checkTerm(merged, {...ctx, lotIds: new Set([id]), archive: true}, report);
  }
}

async function checkUrls(items, report) {
  const urls = [...new Set(items)];
  await Promise.all(urls.map(async (u) => {
    try {
      const r = await fetch(u, {method: 'GET', redirect: 'follow', signal: AbortSignal.timeout(20000), headers: {'user-agent': 'Mozilla/5.0 lexique-ia check'}});
      if (r.status >= 400) report.warnings.push(`URL ${r.status} : ${u}`);
    } catch (e) {
      report.warnings.push(`URL injoignable (${e.cause?.code || e.name}) : ${u}`);
    }
  }));
}

export async function check(file, {urls = false, archive = false} = {}) {
  const {cats, terms} = loadTerms();
  const input = loadInput(file);
  const report = {errors: [], warnings: [], kind: input.kind, input};
  const published = new Map(terms.map((t) => [t.id, t]));
  if (input.kind === 'lot') {
    const lotIds = new Set();
    for (const t of input.data) {
      if (lotIds.has(t.id)) report.errors.push(`id en double dans le lot : ${t.id}`);
      lotIds.add(t.id);
    }
    const byId = new Map(published);
    for (const t of input.data) byId.set(t.id, t);
    const ctx = {cats, published, byId, lotIds, archive};
    for (const t of input.data) checkTerm(t, ctx, report);
    if (urls) await checkUrls(input.data.flatMap((t) => [...(t.sources || []), ...(t.solutions || [])].map((s) => s.url).filter(Boolean)), report);
  } else {
    checkEnrich(input.data, {cats, published, byId: published, lotIds: new Set(), archive: true}, report);
    if (urls) await checkUrls(Object.values(input.data).flatMap((f) => [...(f.sources || []), ...(f.solutions || [])].map((s) => s.url).filter(Boolean)), report);
  }
  return report;
}

export function printReport(file, report) {
  const n = report.kind === 'lot' ? `${report.input.data.length} fiche(s)` : `${Object.keys(report.input.data).length} fiche(s) enrichie(s)`;
  for (const w of report.warnings) console.log(`  avertissement  ${w}`);
  for (const e of report.errors) console.log(`  ERREUR         ${e}`);
  console.log(`${file} : ${n}, ${report.errors.length} erreur(s), ${report.warnings.length} avertissement(s)`);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const args = process.argv.slice(2);
  const files = args.filter((a) => !a.startsWith('--'));
  if (!files.length) {
    console.error('usage : node scripts/check-lot.mjs <lot.js | enrichissements.json> [--urls] [--archive]');
    process.exit(2);
  }
  let bad = 0;
  for (const f of files) {
    const report = await check(f, {urls: args.includes('--urls'), archive: args.includes('--archive')});
    printReport(f, report);
    bad += report.errors.length;
  }
  process.exitCode = bad ? 1 : 0;
}

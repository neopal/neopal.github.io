#!/usr/bin/env node
// Fusionne un lot vérifié dans lexique/terms.js.
//
//   node scripts/merge-lot.mjs <lot.js>                 ajoute les fiches (numéros suivants) ; une fiche 'soon' de même id est remplacée en gardant son numéro
//   node scripts/merge-lot.mjs <enrichissements.json>   remplace les champs listés dans des fiches publiées
//   option : --dry-run   affiche ce qui serait fait sans rien écrire
//
// Lance d'abord scripts/check-lot.mjs et refuse de fusionner s'il reste une erreur.
// Ensuite : node scripts/build-lexique.mjs (pages, sitemap, llms.txt).
// Variable : LEX_TERMS (chemin d'un terms.js alternatif, pour essayer sur une copie).

import {readFileSync, writeFileSync} from 'node:fs';
import {FIELDS, check, loadTerms, printReport} from './check-lot.mjs';

const args = process.argv.slice(2);
const file = args.find((a) => !a.startsWith('--'));
const dry = args.includes('--dry-run');
if (!file) {
  console.error('usage : node scripts/merge-lot.mjs <lot.js | enrichissements.json> [--dry-run]');
  process.exit(2);
}

const report = await check(file);
printReport(file, report);
if (report.errors.length) {
  console.error('fusion refusée : corrige les erreurs ci-dessus.');
  process.exit(1);
}

const {file: termsFile, terms} = loadTerms();
const src = readFileSync(termsFile, 'utf8');
const eol = src.includes('\r\n') ? '\r\n' : '\n';
let lines = src.split(/\r?\n/);

// Une fiche, au format des fiches récentes de terms.js : JSON indenté de 2, champs dans l'ordre de FIELDS, num après status.
function block(t) {
  const ordered = {};
  for (const k of ['id', 'status', 'num', ...FIELDS.slice(2)]) if (t[k] !== undefined) ordered[k] = t[k];
  return JSON.stringify(ordered, null, 2).split('\n').map((l) => '  ' + l);
}

// Lignes [début, fin] du bloc d'une fiche dans terms.js (de « {» à « },» au niveau du tableau).
function findBlock(id) {
  const idLine = lines.findIndex((l) => l === `    "id": "${id}",` || l === `    id: '${id}',`);
  if (idLine < 0) throw new Error(`fiche ${id} introuvable dans ${termsFile}`);
  let start = idLine;
  while (start > 0 && lines[start] !== '  {') start--;
  let end = idLine;
  while (end < lines.length && lines[end] !== '  },') end++;
  if (lines[start] !== '  {' || lines[end] !== '  },') throw new Error(`bloc de ${id} mal délimité dans ${termsFile}`);
  return [start, end];
}

function replaceBlock(id, t) {
  const [start, end] = findBlock(id);
  const b = block(t);
  b[b.length - 1] += ',';
  lines.splice(start, end - start + 1, ...b);
}

const byId = new Map(terms.map((t) => [t.id, t]));
const done = [];
if (report.kind === 'lot') {
  let next = Math.max(0, ...terms.map((t) => parseInt(t.num, 10) || 0));
  const append = [];
  for (const t of report.input.data) {
    const old = byId.get(t.id);
    if (old) { // fiche « à venir » : on la remplace à sa place, avec son numéro
      replaceBlock(t.id, {...t, num: old.num});
      done.push(`remplacée ${t.id} (n° ${old.num}, était '${old.status}')`);
    } else {
      next += 1;
      const num = String(next).padStart(2, '0');
      append.push(...block({...t, num}).map((l, i, all) => (i === all.length - 1 ? l + ',' : l)));
      done.push(`ajoutée   ${t.id} (n° ${num})`);
    }
  }
  if (append.length) {
    // Les nouvelles fiches publiées vont avant les termes prévus, ou à la fin du tableau.
    let at = lines.findIndex((l) => l.startsWith('  // Termes prévus'));
    if (at < 0) at = lines.lastIndexOf('];');
    if (at < 0) throw new Error(`fin du tableau DICO_TERMS introuvable dans ${termsFile}`);
    lines.splice(at, 0, ...append);
  }
} else {
  for (const [id, fields] of Object.entries(report.input.data)) {
    replaceBlock(id, {...byId.get(id), ...fields});
    done.push(`enrichie  ${id} (${Object.keys(fields).join(', ')})`);
  }
}

for (const d of done) console.log(`  ${d}`);
const out = lines.join(eol);
if (dry) {
  console.log('--dry-run : rien n\'a été écrit.');
} else {
  writeFileSync(termsFile, out);
  // Relecture : le fichier doit rester chargeable, avec les fiches attendues.
  const after = loadTerms(termsFile).terms;
  const ids = new Set(after.map((t) => t.id));
  const missing = (report.kind === 'lot' ? report.input.data.map((t) => t.id) : Object.keys(report.input.data)).filter((id) => !ids.has(id));
  if (missing.length || after.length < terms.length) throw new Error(`relecture de ${termsFile} incohérente (manquant : ${missing.join(', ') || 'aucun'})`);
  console.log(`${termsFile} : ${after.length} fiches. Lance maintenant : node scripts/build-lexique.mjs`);
}

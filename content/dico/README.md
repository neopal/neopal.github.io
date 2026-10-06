# Coulisses éditoriales du Lexique IA

Rien de ce dossier n'est servi comme page du site (exclu par `robots.txt`) ; les fiches publiées vivent dans `lexique/terms.js`.

| Fichier ou dossier | Rôle |
|---|---|
| `brief-fiche.md` | **Le brief à suivre pour écrire une fiche** : format, règles d'écriture, sources, schéma, livraison et fusion d'un lot |
| `univers.md` | La bible : l'image d'une fiche, les cinq formes de l'Imagine, le studio des shorts, les règles vidéo, varier les exemples |
| `gestes-prose.md` | Douze gestes de prose tirés des livres d'inspiration de PA |
| `plan-termes.md` | Le plan de tous les termes : statut, priorité, pistes d'image |
| `da/` | Maquettes de direction artistique (typographie, directions visuelles) |
| `vagues/` | Archives des vagues de production (briefs, lots, enrichissements), avec un index dans `vagues/README.md` |

Outils associés, à la racine du dépôt :
- `node scripts/check-lot.mjs <lot.js>` vérifie un lot ou un fichier d'enrichissements ;
- `node scripts/merge-lot.mjs <lot.js>` le fusionne dans `lexique/terms.js` ;
- `node scripts/build-lexique.mjs` régénère les pages, le sitemap et les `llms.txt`.

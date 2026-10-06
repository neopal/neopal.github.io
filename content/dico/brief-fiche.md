# Brief d'une fiche du Lexique IA

Ce document rassemble les règles en vigueur pour écrire une fiche ou un lot de fiches. Il remplace la cascade des briefs de vague (« suis la vague 9, qui renvoie à la 6, qui renvoie à la 5… ») : les briefs archivés dans `vagues/` gardent l'historique, celui-ci dit ce qui vaut aujourd'hui. Un brief de vague ne contient plus que le sujet, le registre des ids et les formes d'Imagine imposées.

Projet : glossaire français vulgarisé de l'IA, https://neopal.github.io/lexique/, auteur Pierre-Adrien (PA). Lecteur : un curieux qui ne code pas, mais la page doit montrer à un recruteur un expert avec qui on a envie de travailler. Pas de remplissage, de l'élégance.

## 1. À lire avant d'écrire

1. `univers.md` : l'image d'une fiche (règle révisée du 3 octobre 2026 et « le répertoire que PA aime »), les cinq formes de l'Imagine, la correspondance anglaise, les solutions populaires, varier les exemples, les sources, les fiches modèles.
2. `gestes-prose.md` : douze gestes de prose ; en appliquer au moins deux par fiche, sans forcer.
3. `plan-termes.md` : pistes d'image et livres qui traitent chaque terme.
4. `lexique/terms.js` (lecture seule) : relire en entier deux fiches récentes et les fiches voisines du sujet, pour apporter un angle et des exemples neufs. Niveau visé : `fine-tuning`, `rag`, `flagornerie`. Pour les mythes : `mythe-autocompletion`, `mythe-a-lu-tout-internet`.
5. Sur la machine de PA seulement (hors dépôt) : ses notes de lecture `sources inspiration/_notes/` (jamais citées ni copiées, toujours reformulées) et ses consignes de voix (`feedback-no-staccato.md`, `feedback-no-filler-ui-copy.md`, `feedback-sources.md`, `VOICE.md`).

## 2. Règles d'écriture

- Tutoiement. Phrases liées, avec sujet, verbe et connecteurs. Pas de staccato (« Faux. », paires de phrases courtes qui se répondent), pas de deux-points de révélation, pas de « ce n'est pas X, c'est Y » avec un X fabriqué.
- Aucune phrase de plus de 45 mots. Le `short` fait 30 mots au plus : c'est une définition littérale, et aussi la meta description.
- Typographie : aucun tiret cadratin ni demi-cadratin, aucun point médian, aucun guillemet anglais courbe ; guillemets français « » avec leurs espaces.
- Pas de formule répétée d'une fiche à l'autre (« X n'a pas changé ; Y a bougé », « si bien que », « simplement », « le modèle, lui, »), ni d'ouverture d'Imagine en « Avant, ».
- Un même exemple apparaît dans deux fiches au plus (règle « varie », voir `univers.md`).
- Termes grand public ou contestés (AGI, dead internet, lois d'échelle…) : distinguer ce qui est mesuré de ce qui est annoncé, prédit ou débattu, et dater chaque affirmation. Un terme né d'une personne ou d'un texte précis reçoit son origine datée et sourcée.
- Mythes : le titre est la croyance, entre « », jamais la personne. La fiche montre ce qui se passe vraiment, sans moquer qui y croit. Une citation attribuée n'entre que vérifiée sur une source primaire ou une presse fiable.

## 3. Sources

- Uniquement des sources réelles, ouvertes pendant l'écriture (WebFetch, curl, API arXiv, Wikipédia en raw `https://en.wikipedia.org/w/index.php?title=X&action=raw`), et qui contiennent bien le fait cité.
- La plus récente possible (2025-2026 de préférence). Un fait invérifiable sort de la fiche ; une fiche sans aucune source vérifiable a `sources: []`.
- Un chiffre calculé donne son calcul dans le libellé de la source ; un chiffre de tokenisation vient d'un test `tiktoken` (o200k_base).
- Un vendeur qui cite ses propres clients est présenté comme tel, et appuyé par une source primaire.

## 4. Format d'une fiche

Un lot est un fichier CommonJS `module.exports = [ {…}, … ];`. Champs, dans cet ordre :

| Champ | Contenu |
|---|---|
| `id` | minuscules, chiffres, tirets ; c'est aussi l'URL `/lexique/<id>/` |
| `status` | `'live'` |
| `title` | le terme ; un mythe s'écrit entre « » |
| `en` | le terme anglais principal (`'Myth: …'` pour un mythe) |
| `aliases` / `aliasesFr` | variantes anglaises / variantes françaises, toutes cherchables |
| `jargon` | 0 à 4 `{say, means}` : des formules qu'on entend vraiment, traduites |
| `graphLabel` | optionnel ; obligatoire pour un mythe : `'Mythe : …'` (libellé court dans la carte) |
| `cat` | une clé de `DICO_CATEGORIES` : fondations, inference, comportements, agents, entrainement, ecosysteme, methode, mythes |
| `links` | 3 à 7 ids existants (publiés ou du même lot) |
| `solutions` | optionnel, 6 au plus : `{name, kind, url}`, outils réels à essayer (voir `univers.md`) |
| `short` | la définition en une phrase, 30 mots au plus |
| `image` | l'image de la fiche (règle de `univers.md`) |
| `imagineForm` | `'A'` à `'E'` ; la forme C est épuisée |
| `imagine` | l'Imagine, dans la forme choisie |
| `full` | la définition complète, trois paragraphes en général |
| `table` | optionnel : `{caption, asOf, columns, rows, note?}`, 3 à 6 colonnes, 4 à 10 lignes, chaque cellule chiffrée tirée d'une page officielle citée |
| `reliability` | optionnel, fiches de benchmark : `{level: 'solide' \| 'à nuancer' \| 'fragile', why}` ; le niveau découle des faits cités |
| `then` | optionnel : « 2024 vs 2026 », seulement s'il existe une vraie évolution sourcée |
| `office` | « Entendu au bureau » : `[{who: 'q', text}, {who: 'a', text}]` |
| `avoid` | « À éviter » : une croyance entre « », puis ce qui est vrai |
| `video` | `null` (les shorts sont branchés après coup : `{src, poster}`) |
| `sources` | `{label, url}` ; le libellé dit ce que la page prouve |

Jamais de champ `num` : la fusion numérote.

## 5. Liens et formes d'Imagine

- Une fiche ne se lie jamais à une fiche, publiée ou du lot, qui a la même forme d'Imagine. En cas de conflit, retirer le lien le plus faible et le signaler.
- Quand plusieurs lots tournent en parallèle, le brief de vague attribue les formes par lot ; un lien vers une fiche d'un autre lot dont on ne connaît pas encore la forme attend.

## 6. Le schéma

Une fiche sans vidéo a un schéma `lexique/schemas/<id>.svg`, affiché après l'Imagine.
- Un seul `<svg>` de 360 de large (`viewBox="0 0 360 <hauteur>"`), avec un `<title>` qui décrit ce qu'il montre.
- Couleurs et polices uniquement par les classes `.schema svg .xxx` définies dans `lexique/index.html` (`ac` pour la couleur de la catégorie, `mu`, `d`, `bx`, `bxa`, `ln`, `la`, `m` pour le mono…), jamais en dur.
- Aucun script, gestionnaire d'événement ni `foreignObject` (le build refuse).
- Il montre le mécanisme, pas une illustration décorative ; textes à 13 px au moins à l'échelle.

## 7. Livrer un lot

1. Écrire `content/dico/vagues/NN-sujet/lot-x.js` (et les schémas), sans toucher `lexique/terms.js`, sans build, sans git.
2. Vérifier : `node scripts/check-lot.mjs content/dico/vagues/NN-sujet/lot-x.js --urls`. Zéro erreur ; chaque avertissement est corrigé ou justifié dans le rapport.
3. Rapport : pour chaque fiche, `short`, forme d'Imagine, liens, faits datés avec leur source, ce que montre le schéma, doutes et faits retirés faute de source ; une idée de short de 20 à 30 secondes (scène, 4 à 6 cartons à 12 caractères par seconde au plus, histoire vraie qui le porte).

Enrichir des fiches publiées : un fichier `enrichissements.json` au format `{"<id>": {"<champ>": <nouvelle valeur complète>}}`. L'existant est recopié à l'identique et on n'ajoute que les insertions ; le contrôle signale tout élément perdu.

## 8. Fusionner (orchestrateur)

```bash
node scripts/check-lot.mjs content/dico/vagues/NN-sujet/lot-x.js      # relire le rapport
node scripts/merge-lot.mjs content/dico/vagues/NN-sujet/lot-x.js      # ajoute les fiches à terms.js (--dry-run pour voir)
node scripts/merge-lot.mjs content/dico/vagues/NN-sujet/enrichissements.json
node scripts/build-lexique.mjs                                         # pages, sitemap, llms.txt
```

Puis relire les pages dans le navigateur (`python -m http.server 8000`, `/lexique/<id>/`), mettre à jour `plan-termes.md` et l'index `vagues/README.md`.

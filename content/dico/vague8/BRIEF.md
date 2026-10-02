# Brief vague 8 du Lexique IA

Suis intégralement `content/dico/vague6/BRIEF.md` (qui renvoie à la vague 5 et aux précédentes, à `univers.md` et à `gestes-prose.md`) : même niveau, même format, sources vérifiées en ligne, un schéma par fiche. Les fiches des vagues 6 et 7 sont publiées dans `lexique/terms.js` : relis-en deux avant d'écrire, et pour les mythes relis `mythe-autocompletion` et `mythe-a-lu-tout-internet`.

## Règles reprises de la vague 7
- **Définition en une phrase (`short`) : 30 mots au plus.** Les détails vont dans la définition complète.
- Ne lie pas deux fiches qui ont la même forme d'Imagine (vérifie les `imagineForm` des fiches publiées ET des autres lots de cette vague ; en cas de doute, mets moins de liens).

## Registre des ids
Publiés : les 102 ids de `lexique/terms.js` (lecture seule).
Vague 8 (liens croisés autorisés) :
- lot Q (mythes, catégorie mythes, titre entre « » comme les mythes publiés) : mythe-ia-calcule (« L'IA calcule »), mythe-ia-comprend (« L'IA comprend »), mythe-lit-mot-par-mot (« L'IA lit mot par mot »), mythe-ia-neutre (« L'IA est neutre »), mythe-raisonne-comme-nous (« Le modèle raisonne comme nous »)
- lot R (mythes et société) : mythe-open-source-gratuit (« L'IA open source est gratuite »), mythe-bon-score-bon-modele (« Un bon score au benchmark fait un bon modèle »), mythe-agit-lui-meme (« Le modèle agit lui-même »), mythe-remplace-metier (« L'IA va remplacer tel métier demain »), responsabilite (qui répond quand une IA se trompe : contrats, AI Act, jurisprudence)
- lot S (technique) : logits, encodeur-decodeur, modele-de-diffusion, dpo, donnees-synthetiques

Pour un mythe : le titre est la croyance, la fiche montre ce qui se passe vraiment, sans moquer celui qui y croit ; distingue ce qui est mesuré de ce qui est débattu. Un mythe proche d'une fiche publiée (benchmarks-lesquels-croire, mythe-agent-autonome, open-weights, tokenizer, biais...) apporte un angle et des exemples neufs, et la lie.

Formes d'Imagine par lot, pour éviter les conflits entre lots : lot Q prend A, B, D ; lot R prend B, D, E ; lot S prend A, D, E (la forme C reste interdite). Une fiche liée à une fiche d'un autre lot de la vague ne prend pas la même forme qu'elle ; si tu ne connais pas encore sa forme, ne crée pas le lien et signale-le dans ton rapport.

## Sortie
`content/dico/vague8/lot-q.js`, `lot-r.js` ou `lot-s.js` + `lexique/schemas/<id>.svg` (même vérification qu'en vague 6, avec `LEX_EXTRA=content/dico/vague8/<lot>.js`). Aucun autre fichier, pas de git, pas de build.

## Rapport
Comme en vague 6.

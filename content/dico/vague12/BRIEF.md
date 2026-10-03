# Brief vague 12 du Lexique IA : hill climbing

Suis intégralement `content/dico/vague11/BRIEF.md` (et tout ce vers quoi il renvoie) pour le format, les sources vérifiées en ligne, le schéma, l'image et les contrôles.

## Point de départ
Lance Martin (Anthropic), « Automating eval design and hillclimbing », 28 septembre 2026 : https://claude.dev/blog/automating-eval-design-and-hillclimbing/ . Relis-le toi-même. C'est Anthropic qui présente son propre outil (`/claude-api build-eval`, `/claude-api hillclimb`) sur 44 tickets dont 14 mis de côté : cite-le comme une démonstration, pas comme une mesure.

Cherche ensuite dans la littérature récente (2025-2026, priorité 2026) d'autres applications et exemples datés et vérifiés : optimisation automatique de prompts ou d'agents contre une eval (DSPy et ses optimiseurs comme GEPA ou MIPRO, TextGrad, recherche de harness, « autoresearch » de Karpathy, AlphaEvolve et descendants, agents qui améliorent leur propre code contre un benchmark), cas d'entreprises qui hillclimbent un produit sur leurs evals, et cas où l'optimisation a sur-appris l'eval (score qui monte, production qui ne suit pas). Garde les deux ou trois meilleurs, ceux qui font comprendre.

## Livrables
1. Une fiche `hill-climbing` (titre « Hill climbing », catégorie methode, forme d'Imagine au choix sans conflit avec les fiches liées) : améliorer un système par petites retouches mesurées sur une eval, une seule à la fois, gardée seulement si elle améliore aussi les cas mis de côté ; l'origine du terme (l'algorithme d'optimisation qui monte la pente la plus proche, et son piège du sommet local) ; train/test ; le piège de l'échantillon choisi sur les échecs du modèle actuel ; « ne jamais coller les échecs dans le prompt ». Lie au moins evals, benchmaxxing, reward-hacking, llm-juge, loop, memorisation-vs-generalisation si les formes le permettent. Un schéma.
2. Des enrichissements pour deux fiches publiées, sans les réécrire : `evals` (les quatre signes d'une bonne eval selon l'article, le piège de l'échantillon adverse, un exemple 2026) et `benchmaxxing` (une phrase qui relie le benchmaxxing au sur-apprentissage d'une eval par hill climbing, avec un exemple daté si tu en trouves un). Pour chacune, donne les nouveaux paragraphes ou phrases complets à insérer, l'endroit précis (après quelle phrase), et leurs sources au format de `sources`. Respecte la limite de deux fiches par exemple.

## Sortie
`content/dico/vague12/lot-hc.js` (la fiche, format de `content/dico/vague11/lot-y.js`) + `lexique/schemas/hill-climbing.svg` (vérifié avec `LEX_EXTRA=content/dico/vague12/lot-hc.js node /tmp/claude-0/-home-user-neopal-github-io/5c50080d-15c2-5d4f-bfb9-56c3d930f8e0/scratchpad/check-schemas.mjs hill-climbing`) + `content/dico/vague12/enrichissements.json` au format `{"evals": {"full": [...le tableau full complet, nouvelle version...], "sources": [...le tableau complet, nouvelle version...]}, "benchmaxxing": {...}}` (on remplace les champs entiers, donc recopie l'existant à l'identique et n'ajoute que tes insertions ; tu peux aussi toucher `then` ou `avoid` si c'est le bon endroit). Aucun autre fichier, pas de git, pas de build, ne touche pas lexique/terms.js.

## Rapport
Comme en vague 11, plus la liste des exemples 2025-2026 trouvés (retenus et écartés, avec la raison) et une idée de short.

# Brief vague 7 du Lexique IA

Suis intégralement `content/dico/vague6/BRIEF.md` (qui renvoie à la vague 5 et aux précédentes, à `univers.md` et à `gestes-prose.md`) : même niveau, même format, sources vérifiées en ligne, un schéma par fiche. Les fiches de la vague 6 (transformer, guardrails, lois-d-echelle...) sont publiées dans `lexique/terms.js` : relis-en deux avant d'écrire.

## Ce qui change depuis la vague 6
- **Définition en une phrase (`short`) : 30 mots au plus.** Les détails vont dans la définition complète.
- Ne lie pas deux fiches qui ont la même forme d'Imagine (vérifie les `imagineForm` des fiches publiées ET des autres lots de cette vague, listés ci-dessous ; en cas de doute, mets moins de liens).

## Registre des ids
Publiés : les 87 ids de `lexique/terms.js` (lecture seule).
Vague 7 (liens croisés autorisés) :
- lot N (comprendre les limites) : intelligence-en-dents-de-scie, capacites-emergentes, memorisation-vs-generalisation, biais, interpretabilite
- lot O (agents en pratique) : memoire (mémoire d'un assistant ou d'un agent, y compris la mémoire externe), sandbox-et-permissions, planification, compaction-du-contexte, llm-juge
- lot P (écosystème et mythes) : labs, lecon-amere (« The Bitter Lesson », Rich Sutton, 2019), horizon-d-autonomie (durée des tâches qu'un agent mène seul, mesures METR), mythe-autocompletion (« Ce n'est que de l'autocomplétion », catégorie mythes), mythe-a-lu-tout-internet (« L'IA a lu tout Internet, donc elle sait tout », catégorie mythes)

Formes d'Imagine par lot, pour éviter les conflits entre lots : lot N prend A, B, D ; lot O prend B, D, E ; lot P prend A, D, E (la forme C reste interdite, déjà prise deux fois). Une fiche liée à une fiche d'un autre lot de la vague ne prend pas la même forme qu'elle ; si tu ne connais pas encore sa forme, ne crée pas le lien et signale-le dans ton rapport.

## Sortie
`content/dico/vague7/lot-n.js`, `lot-o.js` ou `lot-p.js` + `lexique/schemas/<id>.svg` (même vérification qu'en vague 6, avec `LEX_EXTRA=content/dico/vague7/<lot>.js`). Aucun autre fichier, pas de git, pas de build.

## Rapport
Comme en vague 6.

# Brief vague 9 du Lexique IA (dernière vague)

Suis intégralement `content/dico/vague6/BRIEF.md` (qui renvoie à la vague 5 et aux précédentes, à `univers.md` et à `gestes-prose.md`) : même niveau, même format, sources vérifiées en ligne, un schéma par fiche. Les fiches des vagues 6 à 8 sont publiées dans `lexique/terms.js` : relis-en deux avant d'écrire, et pour les mythes relis `mythe-autocompletion` et `mythe-a-lu-tout-internet`.

## Règles reprises de la vague 7
- **Définition en une phrase (`short`) : 30 mots au plus.** Les détails vont dans la définition complète.
- Ne lie pas deux fiches qui ont la même forme d'Imagine (vérifie les `imagineForm` des fiches publiées ET des autres lots de cette vague ; en cas de doute, mets moins de liens).

## Registre des ids
Publiés : les 117 ids de `lexique/terms.js` (lecture seule).
Vague 9, la dernière (liens croisés autorisés) :
- lot T (technique) : position (encodage positionnel), architectures-hybrides (Mamba, Gated DeltaNet, modèles mi-attention mi-récurrents), speculative-decoding, latence-vs-debit, sortie-structuree (structured output, JSON mode)
- lot U (sécurité et alignement) : constitutional-ai, alignment-faking, cot-infidele (chain-of-thought infidèle), red-teaming, evaluations-de-dangerosite (dangerous capability evals), mythe-ia-a-des-valeurs (« L'IA a des valeurs », catégorie mythes, avec graphLabel « Mythe : … » comme les autres mythes)
- lot V (histoire et culture) : systemes-experts (systèmes experts et IA symbolique), effet-ia (« AI effect » : ce qui marche cesse d'être appelé IA), explosion-de-l-intelligence, geo (optimisation pour les moteurs génératifs), capacite-inexploitee (capability overhang)

Formes d'Imagine par lot, pour éviter les conflits entre lots : lot T prend A, B, D ; lot U prend B, D, E ; lot V prend A, D, E (la forme C reste interdite). Une fiche liée à une fiche d'un autre lot de la vague ne prend pas la même forme qu'elle ; si tu ne connais pas encore sa forme, ne crée pas le lien et signale-le dans ton rapport.

Plusieurs termes touchent des fiches publiées (alignement, guardrails, jailbreak, modeles-de-raisonnement, transformer, auto-attention, kv-cache, inference, cout-d-une-requete, interpretabilite, agi, lois-d-echelle, dead-internet...). Lis-les : apporte un angle et des exemples neufs, ne reprends pas leurs exemples, et lie-les.

## Sortie
`content/dico/vague9/lot-t.js`, `lot-u.js` ou `lot-v.js` + `lexique/schemas/<id>.svg` (même vérification qu'en vague 6, avec `LEX_EXTRA=content/dico/vague9/<lot>.js`). Aucun autre fichier, pas de git, pas de build.

## Rapport
Comme en vague 6.

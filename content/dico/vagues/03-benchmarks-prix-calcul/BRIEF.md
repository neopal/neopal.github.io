# Brief vague 3 du Lexique IA

Suis d'abord intégralement `content/dico/vagues/02-premieres-fiches/BRIEF.md` (lectures obligatoires, règles dures, format de sortie, vérifications, rapport). Ce fichier ne liste que ce qui change ou s'ajoute.

## Ajouts de lecture
- Les 41 fiches publiées sont dans `lexique/terms.js` (format mixte : fiches 01 à 10 en JS, 11 à 41 en JSON). Un autre agent y varie les exemples en ce moment : lis-le, n'y écris pas.
- Règle « un exemple, deux fiches maximum » : n'utilise pas un exemple déjà présent dans deux fiches (Swann, strawberry, « Paris est la capitale de la France », le train pour Lyon, Air Canada, Mata v. Avianca, Llama 4 Maverick sur LMArena, FrontierMath et o3...). Cherche les tiens.
- Nouveau livre d'inspiration (notes en cours d'écriture, peut-être pas encore là) : `sources inspiration/_notes/superpouvoir.md`. Reformule toujours.

## Deux nouveaux champs optionnels
- `table` : un tableau comparatif daté, affiché après la définition complète.
  `{caption: 'Prix des modèles', asOf: '2 octobre 2026', columns: ['Modèle', 'Entrée $ / 1M tokens', ...], rows: [['GPT-5.5', '1,25', ...], ...], note: 'phrase courte optionnelle'}`.
  Chaque cellule chiffrée vient d'une page officielle ouverte le jour même ; cite chaque page dans `sources`. La première colonne est l'en-tête de ligne. 4 à 10 lignes, 3 à 6 colonnes, cellules courtes.
- `reliability` : pour une fiche de benchmark, `{level: 'solide' | 'à nuancer' | 'fragile', why: 'une ou deux phrases liées, sourcées'}`. Critères : contamination connue, saturation (scores proches du plafond), erreurs dans le jeu de test, qui l'organise et qui le finance, possibilité de sur-optimiser (benchmaxxing), reproductibilité. Le niveau doit découler des faits cités, pas d'une opinion.

## Registre des ids
Publiés : token, mythe-base-de-donnees, parametres, prediction-du-mot-suivant, hallucination, fenetre-de-contexte, tokenizer, embedding, temperature, rag, tailles-de-modele, moe, open-weights, quantization, benchmarks, benchmaxxing, evals, mythe-plus-gros-plus-intelligent, entrainement, fine-tuning, rlhf, date-de-coupure, modeles-de-raisonnement, flagornerie, reward-hacking, agent, harness, boucle-agent, tool-use, mcp, skill, system-prompt, prompt-injection, context-engineering, second-brain, knowledge-graph, loop, mythe-sait-quand-il-ne-sait-pas, mythe-apprend-de-nos-conversations, mythe-chatgpt-c-est-le-modele, mythe-agent-autonome.
Vague 3 :
- lot E (benchmarks, cat 'ecosysteme') : benchmarks-lesquels-croire, swe-bench, arc-agi, humanitys-last-exam, gpqa, lmarena, terminal-bench, mmlu
- lot F (modèles, prix, calcul) : modeles-frontiere, comparatif-des-modeles, cout-d-une-requete, compute, gpu
- lot G (fondations et agents) : inference, descente-de-gradient, retropropagation, gradient-qui-disparait, kv-cache, webmcp
Prévus (pas de fiche) : aucun.
Les ids `cout-d-une-requete` et `kv-cache` existent déjà en « à venir » : ta fiche les remplace (garde l'id).

## Sortie
`content/dico/vagues/03-benchmarks-prix-calcul/<lot>.js`, même format que la vague 2 (avec `imagineForm`, sans `num`).

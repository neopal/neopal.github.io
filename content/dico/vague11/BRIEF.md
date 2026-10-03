# Brief vague 11 du Lexique IA : travailler avec un agent

Suis intégralement `content/dico/vague9/BRIEF.md` (et tout ce vers quoi il renvoie) pour le format, les sources vérifiées en ligne, le schéma et les contrôles. Pour le champ `image`, applique la règle de `content/dico/univers.md`, section « L'image d'une fiche (règle révisée, PA, 2026-10-03) », y compris « Le répertoire que PA aime » ; relis les images de reward-hacking, quantization, speculative-decoding, cout-d-une-requete, benchmaxxing, evals et arxiv dans `lexique/terms.js` : c'est le ton qui plaît à PA. Varie les registres (fait réel daté, absurde du quotidien, grand-mère, comptoir, art et culture populaire) ; la compréhension passe avant le bon mot.

## Le sujet
Des notions qu'on entend tous les jours quand on travaille avec un agent de code (Claude Code, Codex, Cursor...), repérées en comparant le lexique au « AI Coding Dictionary » de Matt Pocock (https://www.aihero.dev/ai-coding-dictionary). Ne recopie pas ses définitions : sers-t'en comme point de départ, puis va aux sources primaires (docs des éditeurs, articles, études datées 2025-2026).

## Registre des ids
Publiés : les 142 ids de `lexique/terms.js` (lecture seule). Lis les fiches publiées voisines (fenetre-de-contexte, auto-attention, compaction-du-contexte, memoire, system-prompt, harness, skill, multi-agents, temperature, rag, date-de-coupure, mythe-apprend-de-nos-conversations, vibe-coding, human-in-the-loop, loop, planification) : apporte un angle et des exemples neufs, ne reprends pas leurs exemples, et lie-les.

Vague 11 (liens croisés autorisés), avec la forme d'Imagine imposée :
- lot Y (session et contexte)
  - context-rot (forme B), catégorie inference : la qualité baisse quand le contexte s'allonge, bien avant la limite de la fenêtre (budget d'attention qui se dilue, « smart zone / dumb zone » de Pocock, études type Chroma « Context Rot » 2025, NoLiMa, lost in the middle). Conseil pratique : vider la session.
  - non-determinisme (forme A), catégorie comportements : la même question donne deux réponses ; échantillonnage, mais aussi à température 0 (batching, calcul flottant, article de Thinking Machines « Defeating Nondeterminism in LLM Inference », septembre 2025). Ce que ça change pour tester et pour faire confiance.
  - sans-etat (forme E), titre « Session, tour et sans état », catégorie agents : le modèle n'a aucune mémoire d'une requête à l'autre ; le harness renvoie tout l'historique à chaque tour ; session, tour (turn), requête au fournisseur, vider la session (clear).
  - connaissances-parametriques (forme D), titre « Connaissances paramétriques et contextuelles », catégorie fondations : ce que le modèle tient de ses poids (figé, flou, daté) contre ce qu'il lit dans le contexte (exact, à jour) ; quand l'un l'emporte sur l'autre (conflits de connaissances).
- lot Z (méthode)
  - agents-md (forme A), titre « AGENTS.md », catégorie methode : le fichier de consignes du projet chargé au début de chaque session (AGENTS.md, CLAUDE.md, .cursor/rules...), ce qu'on y met et ce qu'on n'y met pas, l'« agent experience » (AX) ; standard agents.md (2025), chiffres d'adoption vérifiés.
  - passation (forme D), titre « Passation entre sessions », catégorie methode : handoff, spec, ticket, source primaire contre source secondaire (un résumé perd toujours quelque chose), spec-driven development.
  - dark-factory (forme E), titre « Dark factory », catégorie methode : usine logicielle où des déclencheurs lancent les agents (AFK) et où le code n'est plus relu par un humain ; l'origine du terme (usines « lights-out »), qui le pratique ou l'annonce en 2025-2026, ce qui est mesuré et ce qui est promesse.

La forme C reste interdite. Une fiche ne se lie jamais à une fiche (publiée ou de la vague) qui a la même forme d'Imagine : en cas de conflit, retire le lien le plus faible et signale-le.

## Sortie
`content/dico/vague11/lot-y.js` ou `lot-z.js` (même format que `content/dico/vague10/lot-x.js`) + `lexique/schemas/<id>.svg` (vérification : `LEX_EXTRA=content/dico/vague11/<lot>.js node /tmp/claude-0/-home-user-neopal-github-io/5c50080d-15c2-5d4f-bfb9-56c3d930f8e0/scratchpad/check-schemas.mjs <id>` depuis la racine du repo, puis regarde la capture). Écris le fichier tôt et mets-le à jour au fur et à mesure. Aucun autre fichier, pas de git, pas de build.

## Vidéo
Pour chaque fiche, ajoute dans ton rapport (pas dans la fiche) une idée de short de 20 à 30 secondes : la scène, les 4 à 6 cartons de texte (12 caractères par seconde de lecture au plus), et l'histoire vraie ou la démonstration qui le porte. Je choisirai et produirai les vidéos.

## Rapport
Comme en vague 9 : pour chaque fiche, short, forme d'Imagine, liens, faits datés avec leur source, ce que montre le schéma, doutes ou faits retirés, puis l'idée de short.

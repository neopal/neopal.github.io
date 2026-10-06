# Brief vague 2 du Lexique IA (commun à tous les agents contenu)

Projet : glossaire FR vulgarisé de l'AI engineering, https://neopal.github.io/lexique/, auteur Pierre-Adrien (PA). Lecteur : curieux non-tech, mais la page doit montrer à un recruteur « un expert avec qui on veut travailler ». Règles : no slop, élégance.

## À lire avant d'écrire (obligatoire)
1. `content/dico/univers.md` : univers studio et casting, gabarit de fiche, typologie des 5 formes d'« Imagine », règles d'écriture, correspondance anglaise (`en`, `aliases` anglais seulement, `aliasesFr`, `jargon`), « Solutions populaires », règle des sources.
2. `content/dico/gestes-prose.md` : 12 gestes de prose tirés des livres de PA (applique-en au moins deux par fiche, sans forcer).
3. `content/dico/plan-termes.md` : pistes d'image et livres qui traitent chaque terme. Les notes de lecture détaillées (privées, NE JAMAIS les citer ni les copier) sont dans `sources inspiration/_notes/` si tu as besoin d'une analogie : reformule toujours.
4. `lexique/terms.js` : les 10 fiches publiées. C'est la référence de ton et de format ; lis-en au moins trois en entier (token, parametres, rag).
5. `C:\Users\pala\.claude\projects\C--Users-pala-Documents-neopal-github-io\memory\feedback-no-staccato.md`, `feedback-no-filler-ui-copy.md`, `feedback-sources.md`, et `C:\Users\pala\Documents\compound writing\VOICE.md` (sections « Gestes à préserver » et « À ne pas corriger »).

## Règles dures
- Tutoiement ; phrases liées (sujet, verbe, connecteurs) ; pas de staccato (« Faux. », paires de phrases courtes qui se répondent) ; pas de deux-points de révélation ; pas de « ce n'est pas X, c'est Y » avec un X fabriqué ; aucune phrase de plus de 45 mots ; zéro tiret cadratin ou demi-cadratin, zéro point médian, zéro guillemet anglais courbe, guillemets français « » avec espaces.
- Le `short` est une définition littérale (c'est aussi la meta description) ; l'image du studio vient dans `image`, en disant qui est qui avec une tournure qui ne ressemble pas aux ouvertures déjà publiées.
- Pas de formule répétée d'une fiche à l'autre (chutes « X n'a pas changé ; Y a bougé », « si bien que », « simplement », « le modèle, lui, »).
- SOURCES : uniquement des sources réelles que tu as ouvertes (WebFetch, curl, API arXiv, Wikipédia raw `https://en.wikipedia.org/w/index.php?title=X&action=raw`) et qui contiennent le fait ; la plus récente possible (2025-2026 de préférence). Si un fait n'est pas vérifiable, retire-le. Si une fiche n'a aucune source vérifiable, `sources: []`. Les exemples doivent être récents quand ils existent.
- `then` (2024 vs 2026) seulement s'il existe une vraie évolution sourcée.
- `solutions` seulement si pertinent (outils réels, URL officielle vérifiée, 6 max, mélange commercial / cloud / open source, aucun adjectif commercial).
- `video: null`.

## Format de sortie
Un fichier `content/dico/vagues/02-premieres-fiches/<lot>.js` (CommonJS) : `module.exports = [ { ...fiche }, ... ];` avec, pour chaque fiche, exactement les champs des fiches publiées : `id, status: 'live', title, en, aliases, aliasesFr, jargon, cat, links, solutions?, short, image, imagine, full[], then?, office[2], avoid, video: null, sources[]`, et un champ `imagineForm` (lettre A à E de la typologie). Ne mets PAS de champ `num` (l'orchestrateur numérote). Catégories valides : fondations, inference, comportements, agents, mythes (pour les termes « Écosystème » et « Méthode », utilise la plus proche ; dis-le dans ton rapport si une nouvelle catégorie te semble nécessaire).
`links` : 3 à 6 ids, choisis UNIQUEMENT dans le registre ci-dessous.
Ne modifie aucun autre fichier du repo. Pas de commit.

## Registre des ids (publiés, vague 2, et prévus)
Publiés : token, mythe-base-de-donnees, parametres, prediction-du-mot-suivant, hallucination, fenetre-de-contexte, tokenizer, embedding, temperature, rag.
Vague 2 :
- lot A (modèles et industrie) : tailles-de-modele, moe, open-weights, quantization, benchmarks, benchmaxxing, evals, mythe-plus-gros-plus-intelligent
- lot B (entraînement et comportements) : entrainement, fine-tuning, rlhf, date-de-coupure, modeles-de-raisonnement, flagornerie, reward-hacking
- lot C (agents) : agent, harness, boucle-agent, tool-use, mcp, skill, system-prompt, prompt-injection, context-engineering
- lot D (méthode et mythes) : second-brain, knowledge-graph, loop, mythe-sait-quand-il-ne-sait-pas, mythe-apprend-de-nos-conversations, mythe-chatgpt-c-est-le-modele, mythe-agent-autonome
Prévus (pas de fiche) : kv-cache, cout-d-une-requete

## Vérification avant de rendre
`node -e "const T=require('./content/dico/vagues/02-premieres-fiches/<lot>.js'); console.log(T.length)"` doit passer ; grep des caractères interdits ; compte des phrases > 45 mots (0) ; chaque URL de sources et solutions testée.

## Rapport
Pour chaque fiche : id, forme d'Imagine, les faits datés et leur source, ce que tu as retiré faute de source. Puis les 2 fiches dont tu es le plus fier et pourquoi.

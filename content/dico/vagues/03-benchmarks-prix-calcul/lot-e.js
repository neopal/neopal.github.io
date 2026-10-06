// Lexique IA, vague 3, lot E (benchmarks, catégorie 'ecosysteme'). Format identique à lexique/terms.js, sans `num`.
// imagineForm : forme de l'« Imagine » (content/dico/univers.md, section « Les formes de l'Imagine »).
// Nouveaux champs : `table` (fiche-carrefour) et `reliability` (fiches de benchmark), voir content/dico/vagues/03-benchmarks-prix-calcul/BRIEF.md.
module.exports = [
  {
    id: 'benchmarks-lesquels-croire',
    status: 'live',
    title: 'Benchmarks : lesquels croire ?',
    en: 'Benchmark reliability',
    aliases: ['which benchmarks to trust', 'self-reported scores', 'benchmark comparison'],
    aliasesFr: ['fiabilité des benchmarks', 'lire un score de benchmark'],
    jargon: [
      {say: 'self-reported', means: "un score que le labo a mesuré lui-même, avec son harness et ses réglages, sans passer par l'organisateur du benchmark"},
      {say: '± 2,8 %', means: "la marge d'erreur publiée à côté du score ; deux modèles dont les marges se chevauchent sont à égalité, quel que soit l'ordre du classement"},
      {say: 'held-out', means: "des questions que l'organisateur garde secrètes, pour qu'aucun modèle n'ait pu les voir pendant son entraînement"},
    ],
    cat: 'ecosysteme',
    links: ['swe-bench', 'terminal-bench', 'arc-agi', 'humanitys-last-exam', 'gpqa', 'lmarena', 'mmlu', 'benchmarks', 'benchmaxxing', 'evals'],
    short:
      "Savoir quels benchmarks croire, c'est vérifier pour chaque score annoncé ce que le test mesure, qui l'a fait passer, dans quelles conditions, et s'il départage encore les meilleurs modèles.",
    image:
      "La maison de disques, c'est-à-dire le labo, imprime sur l'affiche de la tournée les trophées que son groupe a gagnés, rarement le nom du concours, l'année ou le nombre de concurrents. Lire un benchmark, c'est retourner l'affiche pour chercher ces trois mentions.",
    imagineForm: 'A',
    imagine:
      "GPQA Diamond compte 198 questions, et chacune y pèse donc à peu près un demi-point. En septembre 2026, Epoch AI mesure GPT-6 Astra à 95,8 % et Claude Sonnet 5.5 à 95,6 %, un écart qui vaut moins d'une demi-question, alors que l'erreur type publiée à côté, 1,4 point, en couvre près de trois.",
    full: [
      "Sur sa fiche Hugging Face, Qwen3.8-27B, un modèle de 27 milliards de paramètres, bat Claude Opus 4.6 sur SWE-bench Pro, 61,7 % contre 53,4 %. Les notes sous le tableau précisent que le score d'Opus est celui qu'Anthropic a publié, alors que Qwen a fait passer les autres modèles dans Claude Code, sur une version du test dont il avait lui-même corrigé les tâches défectueuses. Sur le classement officiel de Scale AI, qui a créé SWE-bench Pro, Opus 4.6 est à 51,9 % et Qwen3.8-27B n'apparaît pas.",
      "Devant un score annoncé, cinq questions suffisent à le situer. Quel benchmark, et dans quelle version, puisque Terminal-Bench 2.1 est presque saturé quand la version 4.0 sépare encore les modèles ? Qui a fait passer le test, l'organisateur ou le labo ? Avec quel harness, quel niveau d'effort et combien d'essais ? L'écart dépasse-t-il la marge d'erreur ? Et le test départage-t-il encore quelqu'un, ou les meilleurs se tassent-ils sous le plafond ?",
      "Même un bon benchmark mesure une tâche et non ton travail. En 2023, une expérience menée avec GitHub Copilot trouvait des développeurs 55,8 % plus rapides sur une tâche unique, coder un serveur HTTP en JavaScript. En 2025, l'essai randomisé de METR, mené avec 16 développeurs open source expérimentés dans leurs propres projets, les trouvait 19 % plus lents avec l'IA, alors qu'ils se croyaient 20 % plus rapides.",
      "En février 2026, METR a dû revoir son protocole, parce que trop de développeurs refusaient désormais de travailler sans IA pour que la mesure reste fiable, et il pense que le gain a grandi depuis 2025 sans pouvoir le chiffrer. La dernière question se pose donc chez toi, avec tes evals, sur tes propres tâches.",
    ],
    table: {
      caption: 'Les principaux benchmarks, ce qu\'ils mesurent et ce qu\'ils valent',
      asOf: '2 octobre 2026',
      columns: ['Benchmark', 'Ce qu\'il mesure', 'Meilleur score connu', 'Saturé ?', 'Fiabilité'],
      rows: [
        ['MMLU', 'QCM de connaissances, 57 matières', 'Plus de 90 % ; les labos ne le publient plus', 'Oui', 'Fragile'],
        ['GPQA Diamond', '198 questions de sciences introuvables sur Google', '95,8 %, GPT-6 Astra, mesuré par Epoch AI (sept. 2026)', 'Oui', 'Fragile'],
        ['SWE-bench Verified', '500 vrais bugs Python à corriger', '79,2 %, Sonar avec Claude Opus 4.5 (déc. 2025), non vérifié', 'Oui, et contaminé', 'Fragile'],
        ['SWE-bench Pro', '731 tâches de code sur des dépôts sous licence copyleft', '61,5 %, Muse Spark 1.1 de Meta, classement de Scale AI', 'Non', 'À nuancer'],
        ['HLE-Diamond', '1 000 questions d\'experts, sans outils', '59,9 %, GPT-6 Astra (22 sept. 2026)', 'Non', 'À nuancer'],
        ['Arena (texte)', 'Préférence de votants entre deux réponses anonymes', '1 525 points, Gemini 4 Argon, préliminaire (30 sept. 2026)', 'Non', 'À nuancer'],
        ['Terminal-Bench 4.0', 'Tâches longues menées seul dans un terminal', '58,2 % ± 2,8, GPT-6 Astra dans Codex (3 sept. 2026)', 'Non', 'Solide'],
        ['ARC-AGI-3', 'Jeux inconnus dont il faut découvrir le but', '62,7 %, GPT-6 Astra, harness standard (sept. 2026)', 'Presque, avec un autre harness', 'Solide'],
      ],
      note: "Scores relevés le 2 octobre 2026 sur les classements officiels, sauf GPQA, qui n'en a pas ; un score ne se compare qu'à un autre score du même classement.",
    },
    office: [
      {who: 'q', text: "Le commercial nous montre un tableau où son modèle est premier sur douze benchmarks. Je regarde quoi ?"},
      {who: 'a', text: "Les notes sous le tableau, pour savoir qui a mesuré chaque score, dans quel harness, et si les écarts dépassent la marge d'erreur ; compare ensuite ce qui reste avec le classement officiel de chaque benchmark."},
    ],
    avoid:
      "« Il est premier sur Arena, c'est donc le meilleur modèle. » Arena mesure la réponse que préfèrent des votants, et GPT-6 Astra, premier sur ARC-AGI-3 et sur Terminal-Bench 4.0, n'arrive qu'à la 30e place de son classement texte.",
    video: null,
    sources: [
      {label: "Qwen, fiche de Qwen3.8-27B sur Hugging Face, consultée le 2 octobre 2026 (SWE-bench Pro : 61,7 % pour Qwen3.8-27B, 53,4 % pour Opus 4.6 Max, score officiel publié ; autres modèles évalués dans Claude Code sur un benchmark aux tâches corrigées)", url: 'https://huggingface.co/Qwen/Qwen3.8-27B'},
      {label: "Scale AI, classement SWE-Bench Pro (public), consulté le 2 octobre 2026 (Muse Spark 1.1 à 61,50 % ± 3,10 ; claude-opus-4-6 thinking à 51,90 %, harness mini-swe-agent ; 731 tâches publiques sous licence copyleft)", url: 'https://labs.scale.com/leaderboard/swe_bench_pro_public'},
      {label: "Epoch AI, données du Benchmarking Hub, GPQA Diamond, téléchargées le 2 octobre 2026 (GPT-6 Astra 95,77 % ± 1,37 ; Claude Sonnet 5.5 95,58 % ; GPT-6.1 Sol et Gemini 3.8 Flash 95,39 %). Calcul de l'Imagine : 1/198 = 0,505 point par question ; 0,19 point d'écart = 0,37 question ; erreur type de 1,37 point = 2,7 questions", url: 'https://epoch.ai/benchmarks/gpqa-diamond'},
      {label: "SWE-bench, classements officiels, consultés le 2 octobre 2026 (Verified : 500 tâches, sommet à 79,2 % pour Sonar Foundation Agent avec Claude Opus 4.5, non vérifié par l'équipe ; dernière entrée le 26 février 2026)", url: 'https://www.swebench.com/'},
      {label: "OpenAI, Pourquoi SWE-bench Verified ne mesure plus les capacités de codage de pointe, 23 février 2026 (page qui renvoie 403 aux robots, contenu recoupé par la presse ci-dessous)", url: 'https://openai.com/index/why-we-no-longer-evaluate-swe-bench-verified/'},
      {label: "Center for AI Safety et Scale AI, Introducing HLE-Diamond, 22 septembre 2026 (1 000 questions ; sans outils, raisonnement élevé : GPT-6 Astra 59,9 %)", url: 'https://lastexam.ai/blog/hle-diamond'},
      {label: "Arena, classement texte au 30 septembre 2026 (8 602 501 votes, 410 modèles ; gemini-4-argon-high 1 525 ± 9, préliminaire, 4 942 votes ; gpt-6-astra-max 30e)", url: 'https://arena.ai/leaderboard/text'},
      {label: "Terminal-Bench, classement de Terminal-Bench 4.0, consulté le 2 octobre 2026 (GPT-6 Astra dans Codex, effort max, 58,2 % ± 2,8, 192 essais réussis sur 330, entrée du 3 septembre 2026)", url: 'https://www.tbench.ai/leaderboard'},
      {label: "ARC Prize, résultats de GPT-6 Astra, septembre 2026 (ARC-AGI-3 semi-privé : 62,7 % dans le harness standard, 99,9 % avec le harness Provider Adapter, adapté à l'API du fournisseur)", url: 'https://arcprize.org/results/openai-gpt-6-astra'},
      {label: "Center for AI Safety et Scale AI, Humanity's Last Exam, janvier 2025, révisé en juillet 2026 (les modèles dépassent 90 % sur MMLU)", url: 'https://arxiv.org/abs/2501.14249'},
      {label: "Wikipédia, MMLU (« partially phased out » depuis 2025, en faveur de tests plus difficiles)", url: 'https://en.wikipedia.org/wiki/MMLU'},
      {label: "Peng et al., The Impact of AI on Developer Productivity: Evidence from GitHub Copilot, février 2023 (serveur HTTP en JavaScript, 55,8 % plus rapide)", url: 'https://arxiv.org/abs/2302.06590'},
      {label: "METR, Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity, 10 juillet 2025 (16 développeurs, 246 tâches, 19 % plus lents, 20 % plus rapides selon eux)", url: 'https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/'},
      {label: "METR, We are Changing our Developer Productivity Experiment Design, 24 février 2026 (refus de travailler sans IA, biais de sélection, gain probablement plus élevé début 2026, preuve très faible)", url: 'https://metr.org/blog/2026-02-24-uplift-update/'},
      {label: "DeepSeek, fiche de DeepSeek-V4.1-Flash sur Hugging Face, septembre 2026 (Terminal-Bench 2.1 : 82,7 à 90,6 % pour les sept modèles comparés ; Terminal-Bench 4.0 : 7,0 à 51,8 %)", url: 'https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash'},
    ],
  },
  {
    id: 'swe-bench',
    status: 'live',
    title: 'SWE-bench',
    en: 'SWE-bench',
    aliases: ['SWE-bench Verified', 'SWE-bench Pro', 'SWE-bench Lite'],
    aliasesFr: [],
    jargon: [
      {say: '% resolved', means: "la part des tickets que l'agent a corrigés au point de faire passer les tests cachés du projet"},
      {say: 'gold patch', means: "la correction écrite par les développeurs du projet, qui sert de référence ; un modèle qui la recopie de mémoire trahit une contamination"},
      {say: 'bash only', means: "le classement de SWE-bench où tous les modèles travaillent dans le même environnement minimal, mini-SWE-agent, ce qui sépare le modèle de son harness"},
    ],
    cat: 'ecosysteme',
    links: ['benchmarks-lesquels-croire', 'benchmarks', 'terminal-bench', 'agent', 'reward-hacking'],
    short:
      "SWE-bench est un benchmark de programmation où un agent reçoit un vrai ticket d'un projet open source publié sur GitHub et doit modifier le code jusqu'à faire passer les tests que les développeurs avaient écrits pour le corriger.",
    image:
      "On tend au groupe une vieille partition abîmée, tirée des archives d'un autre groupe, avec une seule consigne, réparer la mesure qui sonne faux, et le jury rejoue le morceau pour vérifier. Ces archives sont publiques, et le groupe a pu entendre la version réparée pendant que l'ingé son lui faisait écouter des millions de morceaux.",
    imagineForm: 'E',
    imagine:
      "Avant, Claude Opus 4.6 passe SWE-bench Verified dans mini-SWE-agent, le même environnement minimal pour tous, et corrige 75,6 % des 500 tickets. Après, le même modèle, dans le même type d'environnement, passe SWE-bench Pro, construit par Scale AI sur des dépôts sous licence copyleft pour limiter la contamination, et tombe à 51,9 %.",
    full: [
      "SWE-bench est paru en octobre 2023 avec 2 294 tickets réels tirés de 12 projets Python. L'agent reçoit le code du projet et la description du problème, puis ses modifications sont jugées par les tests que les développeurs avaient ajoutés avec leur propre correction. Le test dit si un agent sait corriger un bug bien délimité dans un projet existant ; il laisse de côté la conception d'un logiciel, la discussion avec un client et la qualité du code au-delà des tests.",
      "En août 2024, OpenAI en a tiré SWE-bench Verified, 500 tickets triés à la main, devenu le chiffre phare de chaque annonce de modèle. OpenAI l'a abandonné en février 2026, parce que GPT-5.2, Claude Opus 4.5 et un modèle Gemini savaient recopier de mémoire des corrections de référence, et qu'une bonne partie des tests rejetaient des solutions correctes. Le classement officiel n'a plus reçu d'entrée depuis le 26 février 2026, et son sommet, 79,2 %, n'a pas été vérifié par l'équipe de SWE-bench.",
      "SWE-bench Pro, lancé par Scale AI en septembre 2025, a pris le relais avec 731 tâches publiques tirées de dépôts sous licence GPL, une barrière juridique contre leur reprise dans les données d'entraînement, et des tâches privées venues de start-up. La barrière ne suffit pas tout à fait, puisqu'en septembre 2026 les auteurs de SWE-Bench Pro Verified y ont trouvé des fuites de solutions et des tâches mal posées qui gonflaient certains scores.",
    ],
    reliability: {
      level: 'fragile',
      why: "Le SWE-bench Verified que citent encore les communiqués est contaminé, ses tests rejettent des solutions correctes, et son classement est figé depuis février 2026. SWE-bench Pro résiste mieux, mais des fuites de solutions y ont été trouvées en septembre 2026, et Scale AI, qui le tient, a Meta pour actionnaire à 49 %, alors que Muse Spark 1.1, de Meta, mène son classement.",
    },
    then:
      "En octobre 2023, le meilleur modèle testé, Claude 2, corrigeait 1,96 % des tickets de SWE-bench. Fin 2025, les agents dépassaient 79 % sur la version Verified, et en février 2026 OpenAI renonçait à ce score, qu'une partie des modèles réussissait de mémoire.",
    office: [
      {who: 'q', text: "Le fournisseur annonce 80 % sur SWE-bench. C'est bien ?"},
      {who: 'a', text: "Demande lequel, Verified ou Pro, et dans quel harness ; à 80 %, c'est presque sûrement Verified, qu'OpenAI a cessé de publier parce que les modèles en connaissaient une partie des corrections."},
    ],
    avoid:
      "« 75 % sur SWE-bench, il corrige trois bugs sur quatre. » Il corrige trois tickets Python sur quatre dans des projets publics qu'il a pu voir, avec des tests déjà écrits pour le juger, ce qui ne dit pas grand-chose de ce qu'il fera sur ton code sans tests.",
    video: null,
    sources: [
      {label: "Jimenez et al., SWE-bench: Can Language Models Resolve Real-World GitHub Issues?, octobre 2023 (2 294 problèmes, 12 dépôts Python, Claude 2 à 1,96 %)", url: 'https://arxiv.org/abs/2310.06770'},
      {label: "SWE-bench, classements officiels, consultés le 2 octobre 2026 (Verified 500 tâches, sommet 79,2 % non vérifié ; bash only : Claude Opus 4.6 à 75,6 % dans mini-SWE-agent ; dernière entrée le 26 février 2026 ; Verified lancé avec OpenAI en août 2024)", url: 'https://www.swebench.com/'},
      {label: "OpenAI, Pourquoi SWE-bench Verified ne mesure plus les capacités de codage de pointe, 23 février 2026 (page qui renvoie 403 aux robots, contenu recoupé par l'article suivant)", url: 'https://openai.com/index/why-we-no-longer-evaluate-swe-bench-verified/'},
      {label: "It Does What Now?, OpenAI stops evaluating models on SWE-bench Verified, 24 février 2026 (GPT-5.2, Claude Opus 4.5 et un Gemini en préversion reproduisent de mémoire les corrections ou les énoncés ; tests qui rejettent des solutions valides ; SWE-bench Pro comme remplaçant partiel)", url: 'https://itdoeswhatnow.com/m/2026-02-24-openai-stops-evaluating-models-on-swe-bench-verified/'},
      {label: "Scale AI, classement SWE-Bench Pro (public), consulté le 2 octobre 2026 (731 tâches publiques sous licence copyleft contre la contamination ; Muse Spark 1.1 en tête à 61,50 % ; claude-opus-4-6 thinking à 51,90 % dans mini-swe-agent)", url: 'https://labs.scale.com/leaderboard/swe_bench_pro_public'},
      {label: "Deng et al., SWE-Bench Pro, septembre 2025 (1 865 problèmes, 41 dépôts, ensembles public, réservé et commercial)", url: 'https://arxiv.org/abs/2509.16941'},
      {label: "SWE-Bench Pro Verified: A Reliable Benchmark for Software Engineering Agents, 8 septembre 2026 (fuites de solutions, reward hacking, tâches mal posées qui gonflent les scores)", url: 'https://arxiv.org/abs/2609.08149'},
      {label: "Wikipédia, Scale AI (Meta détient 49 % des parts, sans droit de vote, depuis juin 2025)", url: 'https://en.wikipedia.org/wiki/Scale_AI'},
      {label: "Arena, classement texte au 30 septembre 2026 (les modèles muse-spark y sont attribués à Meta)", url: 'https://arena.ai/leaderboard/text'},
    ],
  },
  {
    id: 'terminal-bench',
    status: 'live',
    title: 'Terminal-Bench',
    en: 'Terminal-Bench',
    aliases: ['TB 4.0', 'Terminal-Bench 2.0', 'Terminal-Bench 3.0', 'tbench'],
    aliasesFr: [],
    jargon: [
      {say: 'Terminus', means: "l'agent minimal fourni par les auteurs de Terminal-Bench, qui sert à comparer les modèles dans un harness neutre"},
      {say: 'pass@5', means: "la part des tâches réussies au moins une fois en cinq essais ; sur Terminal-Bench 4.0, elle inverse les deux premiers du classement"},
      {say: 'benchmark continu', means: "un test mis à jour comme un logiciel, dont chaque version retire les tâches saturées et corrige les tâches défectueuses"},
    ],
    cat: 'ecosysteme',
    links: ['benchmarks-lesquels-croire', 'swe-bench', 'harness', 'agent', 'boucle-agent', 'benchmaxxing'],
    short:
      "Terminal-Bench est un benchmark où un agent travaille sans aide humaine, en ligne de commande, sur des tâches techniques longues inspirées de vrais problèmes de travail, chacune dans son propre environnement et vérifiée par des tests.",
    image:
      "Pour cette épreuve, on laisse le groupe seul dans la régie technique, devant les câbles, les machines et une liste de travaux à finir avant le matin. Le producteur, c'est-à-dire le harness, reste à ses côtés, et chaque ligne du classement nomme les deux, le groupe et son producteur.",
    imagineForm: 'D',
    imagine:
      "Ton manager te demande : « Qui est premier sur Terminal-Bench 4.0 ? » Tu ouvres le classement et tu lui réponds : « GPT-6 Astra dans Codex, avec 192 essais réussis sur 330, contre 191 pour Claude Fable 5.1 dans Claude Code ; si on compte une tâche dès qu'un essai sur cinq passe, c'est Fable 5.1, 78,8 % contre 71,2 %. »",
    full: [
      "Terminal-Bench est tenu par Stanford et le Laude Institute, sur le framework Harbor. Sa version 2.0, décrite en janvier 2026, comptait 89 tâches, chacune avec son environnement, une solution écrite par un humain et des tests, et aucun agent n'y dépassait alors 65 %. On y apprend si un agent sait finir une tâche technique sans qu'on le relance, mais rien sur l'élégance de ce qu'il laisse derrière lui, le travail en équipe ou la façon dont il comprendrait une demande floue.",
      "Le test s'use vite. Sur la fiche de DeepSeek-V4.1-Flash, les sept modèles comparés font tous entre 82,7 et 90,6 % sur Terminal-Bench 2.1, alors qu'ils s'étalent de 7,0 à 51,8 % sur la version 4.0. L'équipe a donc choisi de le traiter comme un logiciel, et la version 4.0 a retiré 8 tâches, dont 2 saturées et 2 dont la solution traînait en ligne, puis en a corrigé 19.",
      "Les organisateurs publient aussi leurs incidents. Ils ont retiré de leur classement un agent qui cachait des solutions chiffrées dans son programme et un autre qui embarquait les dossiers de tests, et ils ont remis à zéro les essais où un agent allait chercher la solution sur Internet. Depuis, un agent juge relit chaque essai réussi avant publication.",
    ],
    reliability: {
      level: 'solide',
      why: "Les scores sont soumis par les équipes, souvent les labos eux-mêmes dans leur propre harness, mais chaque essai réussi doit fournir sa trajectoire et passe devant un agent juge, et les tricheurs sont retirés. Les tâches et le tri des signalements sont publics, les marges d'erreur affichées, et la seule réserve tient aux tâches publiques, qui obligent à guetter les fuites de solutions.",
    },
    then:
      "Début 2026, l'article qui présentait Terminal-Bench 2.0 notait qu'aucun modèle n'y dépassait 65 %. À l'automne 2026, la version 2.1 est presque saturée, et l'équipe numérote ses mises à jour comme un logiciel, 3.0 puis 4.0, en retirant chaque tâche que tous les modèles récents réussissent cinq fois sur cinq.",
    office: [
      {who: 'q', text: "Notre agent maison fait 70 % sur Terminal-Bench. On l'annonce ?"},
      {who: 'a', text: "Précise d'abord la version, puisque 70 % sur la 2.1 te placerait derrière tous les modèles de pointe, et qu'aucun agent n'atteint ce score sur la 4.0."},
    ],
    avoid:
      "« GPT-6 Astra est premier sur Terminal-Bench, c'est le meilleur pour coder. » Il a réussi un essai de plus que le deuxième, sur 330, dans son propre harness, Codex, et rien ne garantit qu'il garde cet avantage dans le tien ni sur ton code.",
    video: null,
    sources: [
      {label: "Merrill et al., Terminal-Bench: Benchmarking Agents on Hard, Realistic Tasks in Command Line Interfaces, 17 janvier 2026 (version 2.0, 89 tâches, moins de 65 % pour les meilleurs agents)", url: 'https://arxiv.org/abs/2601.11868'},
      {label: "Terminal-Bench, classement de Terminal-Bench 4.0, consulté le 2 octobre 2026 (GPT-6 Astra dans Codex : 58,2 % ± 2,8, 192 réussites sur 330, pass@5 71,2 % ; Claude Fable 5.1 dans Claude Code : 57,9 % ± 3,8, 191 réussites, pass@5 78,8 % ; organisé par Stanford, Harbor et le Laude Institute)", url: 'https://www.tbench.ai/leaderboard'},
      {label: "Terminal-Bench, Terminal-Bench 4.0 (8 tâches retirées, dont 2 saturées, 2 refusées par les modèles et 2 à solution publique ; 19 corrigées ; tâche saturée = réussie 5 fois sur 5 par tous les modèles récents)", url: 'https://www.tbench.ai/news/terminal-bench-4-0'},
      {label: "Terminal-Bench, Leaderboard Integrity Update (solutions chiffrées dans le binaire d'OB-1, dossier tests embarqué par Pilot, solutions téléchargées par ForgeCode remises à zéro, agent juge sur les essais réussis)", url: 'https://www.tbench.ai/news/leaderboard-integrity-update'},
      {label: "DeepSeek, fiche de DeepSeek-V4.1-Flash sur Hugging Face, septembre 2026 (sept modèles : 82,7 à 90,6 % sur Terminal-Bench 2.1, 7,0 à 51,8 % sur Terminal-Bench 4.0)", url: 'https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash'},
      {label: "Terminal-Bench, Terminus (agent des auteurs, compatible avec tous les modèles, pensé comme instrument de mesure à la place des agents des labos)", url: 'https://www.tbench.ai/news/terminus'},
    ],
  },
  {
    id: 'arc-agi',
    status: 'live',
    title: 'ARC-AGI',
    en: 'ARC-AGI',
    aliases: ['ARC Prize', 'ARC-AGI-2', 'ARC-AGI-3', 'Abstraction and Reasoning Corpus'],
    aliasesFr: [],
    jargon: [
      {say: 'semi-privé', means: "le jeu de tâches qu'ARC Prize garde pour tester les modèles des labos ; il passe par leurs API, d'où un risque de fuite que la fondation surveille"},
      {say: 'ARC-AGI-3', means: "la version de mars 2026, faite de petits jeux sans consigne, où l'agent doit découvrir le but en jouant"},
      {say: 'coût par tâche', means: "ce que coûtent les appels au modèle pour résoudre une tâche ; ARC Prize le publie à côté de chaque score, parce qu'un score obtenu à n'importe quel prix ne dit pas grand-chose"},
    ],
    cat: 'ecosysteme',
    links: ['benchmarks-lesquels-croire', 'modeles-de-raisonnement', 'mythe-plus-gros-plus-intelligent', 'benchmaxxing', 'harness'],
    short:
      "ARC-AGI est une série de benchmarks d'énigmes visuelles, d'abord des grilles de couleurs puis de petits jeux, où il faut trouver une règle jamais vue à partir de quelques exemples, ce qui teste l'adaptation à la nouveauté plutôt que les connaissances.",
    image:
      "Invente une gamme qui n'existe pas, joue au groupe trois mesures d'exemple, et demande-lui la quatrième. Les millions de morceaux que l'ingé son lui a fait écouter ne servent plus à rien, et c'est ce qu'ARC-AGI cherche à isoler, trouver une règle neuve plutôt que se souvenir d'une ancienne.",
    imagineForm: 'B',
    imagine:
      "Va sur arcprize.org/play, la page où ARC Prize met en ligne une grille par jour, et cherche la règle qui fait passer des grilles d'exemple à leur solution, sans aucune consigne écrite. Il y a de bonnes chances que tu la trouves avec ce que tout le monde sait déjà des formes, des couleurs et des symétries, et c'est ce bagage-là que le test veut mesurer chez les modèles.",
    full: [
      "La fondation ARC Prize, une organisation à but non lucratif cofondée par François Chollet et Mike Knoop, conçoit ces tests et les fait passer elle-même. Ses tâches ne demandent ni langage ni culture générale, seulement des notions de base sur les objets, les nombres et l'espace. ARC-AGI teste donc l'adaptation à un problème neuf avec très peu d'exemples, alors que les connaissances, le code ou l'utilité au travail sortent de son champ.",
      "Les scores vérifiés sont produits par l'équipe de la fondation, sur des tâches semi-privées, avec un accord de non-conservation des données signé par chaque fournisseur testé. La fondation reconnaît qu'une fuite lente reste possible, puisque les tâches transitent par les API des labos, et elle la guette en comparant les scores sur les tâches publiques et semi-privées, avant de publier une nouvelle version chaque année.",
      "Lancé en mars 2026, ARC-AGI-3 remplace les grilles par des jeux dont il faut découvrir le but, et les modèles de pointe y faisaient alors moins de 1 %. Début septembre 2026, ARC Prize mesure GPT-6 Astra à 62,7 % dans son harness standard. Avec un harness adapté à l'API du fournisseur, qui conserve le raisonnement du modèle d'un appel à l'autre, il monte à 99,9 % sur les mêmes jeux, et il y fait moins d'actions que l'humain médian sur 96 % des niveaux.",
    ],
    reliability: {
      level: 'solide',
      why: "La fondation, à but non lucratif, fait passer elle-même les tests sur des tâches que les labos n'ont pas, avec un accord de non-conservation des données, et renouvelle le benchmark chaque année. Les réserves viennent de la saturation d'ARC-AGI-1, où les modèles égalent le panel humain, et d'ARC-AGI-3, où le score de GPT-6 Astra passe de 62,7 à 99,9 % selon le harness.",
    },
    then:
      "En 2025, le concours d'ARC Prize sur ARC-AGI-2, où le calcul autorisé est limité, plafonnait à 24 % sur les tâches privées. En septembre 2026, GPT-6 Astra atteint 95 % sur les tâches semi-privées de cette même version, et la fondation a déjà déplacé la mesure vers les jeux d'ARC-AGI-3.",
    office: [
      {who: 'q', text: "GPT-6 Astra fait 99,9 % sur ARC-AGI-3. L'AGI, c'est pour cette année ?"},
      {who: 'a', text: "C'est son score dans un harness adapté à l'API d'OpenAI ; dans le harness standard de la fondation, le même modèle fait 62,7 %, et le test ne porte de toute façon que sur des petits jeux abstraits."},
    ],
    avoid:
      "« ARC-AGI mesure l'intelligence générale, comme son nom l'indique. » Il mesure la capacité à trouver une règle visuelle neuve à partir de quelques exemples, un exercice étroit qui ne dit rien des connaissances ni du travail en entreprise.",
    video: null,
    sources: [
      {label: "ARC Prize, About (fondation à but non lucratif, cofondée par François Chollet et Mike Knoop)", url: 'https://arcprize.org/about'},
      {label: "ARC Prize, Testing policy (jeu semi-privé passé aux API des labos, accords de non-conservation, fuite lente surveillée par l'écart public / semi-privé, nouvelle version chaque année ; tests menés par l'équipe de la fondation)", url: 'https://arcprize.org/policy'},
      {label: "ARC Prize Foundation, ARC-AGI-3: A New Challenge for Frontier Agentic Intelligence, 24 mars 2026 (jeux interactifs, connaissances de base sans langage, humains à 100 %, modèles de pointe sous 1 % en mars 2026)", url: 'https://arxiv.org/abs/2603.24621'},
      {label: "ARC Prize, résultats de GPT-6 Astra, septembre 2026 (ARC-AGI-3 semi-privé : 62,7 % en effort max dans le harness standard ; 99,9 % en effort high avec le harness Provider Adapter, qui conserve l'état de raisonnement entre les requêtes ; ARC-AGI-2 : 95,0 %)", url: 'https://arcprize.org/results/openai-gpt-6-astra'},
      {label: "Greg Kamradt, ARC Prize, OpenAI's GPT-6 Astra on ARC-AGI-3, 3 septembre 2026 (62,7 % pour 26 000 dollars dans le harness standard, 99,9 % pour 19 000 dollars avec un harness Provider Adapter ; moins d'actions que l'humain médian sur 96 % des niveaux)", url: 'https://arcprize.org/blog/astra'},
      {label: "ARC Prize, classement, données consultées le 2 octobre 2026 (ARC-AGI-1 : plusieurs modèles à 98,5 %, panel humain à 98 % ; coût par tâche publié à côté de chaque score)", url: 'https://arcprize.org/leaderboard'},
      {label: "ARC Prize, ARC Prize 2025: Technical Report, 15 janvier 2026 (concours Kaggle sur ARC-AGI-2, meilleur score de 24 % sur les tâches privées)", url: 'https://arxiv.org/abs/2601.10904'},
      {label: "ARC Prize, grille du jour à résoudre dans le navigateur", url: 'https://arcprize.org/play'},
    ],
  },
  {
    id: 'humanitys-last-exam',
    status: 'live',
    title: "Humanity's Last Exam",
    en: "Humanity's Last Exam",
    aliases: ['HLE', 'HLE-Diamond', 'HLE-Rolling'],
    aliasesFr: ["dernier examen de l'humanité"],
    jargon: [
      {say: 'HLE (no tools)', means: "le score sans recherche web ni exécution de code, celui qui dit ce que le modèle sait et raisonne seul"},
      {say: 'HLE w/ tools', means: "le score avec le web et le code ; sur HLE-Diamond, GPT-6 Astra passe de 59,9 % à 82,9 %"},
      {say: 'calibration error', means: "l'écart entre la confiance que le modèle annonce et son taux de réussite réel ; dans le tableau du site officiel, il va de 50 à 89 % selon les modèles"},
    ],
    cat: 'ecosysteme',
    links: ['benchmarks-lesquels-croire', 'gpqa', 'mmlu', 'hallucination', 'mythe-sait-quand-il-ne-sait-pas'],
    short:
      "Humanity's Last Exam est un benchmark de 2 500 questions de niveau expert, écrites par près de 1 000 spécialistes dans plus de cent matières, et retenues parce que les meilleurs modèles de l'époque ne savaient pas y répondre.",
    image:
      "Mille professeurs du conservatoire ont chacun déposé la question de solfège la plus dure qu'ils connaissaient, à condition que le groupe la rate sur le moment. Les corrigés ont été relus, mais pas tous assez, et une partie s'est révélée fausse.",
    imagineForm: 'B',
    imagine:
      "Lis à voix haute l'un des exemples publiés sur la page d'accueil de lastexam.ai, celui, signé par un chercheur du MIT, qui demande combien de tendons appariés soutient un petit os sésamoïde propre aux colibris. Tu n'as sans doute aucune idée de la réponse, ni même de l'endroit où la chercher, et c'est le niveau visé par chacune des 2 500 questions.",
    full: [
      "Publié en janvier 2025 par le Center for AI Safety et Scale AI, puis dans Nature en janvier 2026, HLE réunit des questions à réponse courte ou à choix multiple, faciles à corriger automatiquement mais impossibles à trouver vite sur Internet. Ce qu'il évalue, c'est la connaissance et le raisonnement d'expert sur des questions fermées ; la recherche ouverte, la créativité ou la conduite d'un projet lui échappent.",
      "Ne garder que les questions que les modèles ratent a un revers, puisque cela favorise les questions piégeuses. En juillet 2025, FutureHouse a confronté à la littérature scientifique les 321 questions de chimie et de biologie en texte seul, et trouvé que 29 % de leurs réponses officielles étaient contredites par des articles publiés. En février 2026, l'équipe de HLE-Verified ne certifiait telles quelles que 668 questions sur 2 500.",
      "Les organisateurs ont répondu par une version vivante, HLE-Rolling, en octobre 2025, puis par HLE-Diamond le 22 septembre 2026, 1 000 questions nettoyées, moitié raisonnement, moitié connaissances. Sans outils, GPT-6 Astra y réussit 59,9 %, devant Claude Opus 5.5 à 54,6 %. Une partie des questions reste gardée secrète pour repérer les modèles qui auraient appris les questions publiques.",
    ],
    reliability: {
      level: 'à nuancer',
      why: "Le test n'est pas saturé et garde des questions secrètes, mais près de 29 % des réponses de chimie et de biologie de la version d'origine étaient contredites par la littérature. L'un des deux organisateurs, Scale AI, vend des données d'entraînement aux labos, et Meta en détient 49 % depuis juin 2025.",
    },
    then:
      "Dans le tableau que les organisateurs publiaient en 2025, GPT-4o réussissait 2,7 % de HLE et o1 8 %. En septembre 2026, GPT-6 Astra réussit 59,9 % de la version nettoyée, HLE-Diamond, sans outils, et 82,9 % quand il peut chercher sur le web et exécuter du code.",
    office: [
      {who: 'q', text: "Le labo annonce 83 % sur Humanity's Last Exam. C'est énorme, non ?"},
      {who: 'a', text: "Regarde si c'est avec ou sans outils, et sur quelle version ; 82,9 % est le score de GPT-6 Astra sur HLE-Diamond avec le web et le code, et il retombe à 59,9 % quand il doit répondre seul."},
    ],
    avoid:
      "« Il a 60 % au dernier examen de l'humanité, il en sait plus que les experts. » Chaque question demande la spécialité de son seul auteur, et un bon score dit que le modèle couvre beaucoup de ces spécialités à la fois, pas qu'il fait de la recherche comme eux.",
    video: null,
    sources: [
      {label: "Center for AI Safety et Scale AI, Humanity's Last Exam, site officiel, consulté le 2 octobre 2026 (2 500 questions, plus de cent matières, près de 1 000 contributeurs, ensemble secret ; exemples de questions ; tableau : GPT-4o 2,7 %, o1 8,0 %, erreur de calibration de 50 à 89 % ; HLE-Rolling en octobre 2025, Nature en janvier 2026)", url: 'https://lastexam.ai/'},
      {label: "Phan et al., Humanity's Last Exam, janvier 2025, révisé en juillet 2026 (questions à corriger automatiquement, introuvables vite sur Internet)", url: 'https://arxiv.org/abs/2501.14249'},
      {label: "Center for AI Safety et Scale AI, Introducing HLE-Diamond, 22 septembre 2026 (1 000 questions, 500 de raisonnement et 500 de connaissances ; sans outils : GPT-6 Astra 59,9 %, Claude Opus 5.5 54,6 % ; avec web et code : GPT-6 Astra 82,9 %)", url: 'https://lastexam.ai/blog/hle-diamond'},
      {label: "FutureHouse, About 30% of Humanity's Last Exam chemistry/biology answers are likely wrong, 23 juillet 2025 (321 questions, 29,3 % ± 3,7 contredites par la littérature ; sélection qui favorise les questions piégeuses)", url: 'https://www.futurehouse.org/research/hle-exam'},
      {label: "HLE-Verified: A Systematic Verification and Structured Revision of Humanity's Last Exam, 15 février 2026 (668 questions vérifiées, 1 143 révisées, 689 incertaines)", url: 'https://arxiv.org/abs/2602.13964'},
      {label: "Wikipédia, Scale AI (coorganisateur de HLE, clients parmi les labos, plateforme Outlier pour le RLHF, 49 % détenus par Meta depuis juin 2025)", url: 'https://en.wikipedia.org/wiki/Scale_AI'},
    ],
  },
  {
    id: 'gpqa',
    status: 'live',
    title: 'GPQA',
    en: 'GPQA',
    aliases: ['GPQA Diamond', 'Graduate-Level Google-Proof Q&A'],
    aliasesFr: [],
    jargon: [
      {say: 'GPQA Diamond', means: "le sous-ensemble de 198 questions le plus sûr, celui que citent les annonces de modèles"},
      {say: 'Google-proof', means: "des questions dont la réponse ne se trouve pas en cherchant ; des non-spécialistes avec Internet et plus de 30 minutes par question n'en réussissaient que 34 %"},
    ],
    cat: 'ecosysteme',
    links: ['benchmarks-lesquels-croire', 'humanitys-last-exam', 'mmlu', 'benchmarks'],
    short:
      "GPQA est un QCM de 448 questions de biologie, de physique et de chimie écrites par des docteurs et doctorants, conçues pour qu'un non-spécialiste ne trouve pas la réponse même en cherchant sur Internet.",
    image:
      "Le groupe passe un blind test réservé aux spécialistes, où seuls les jazzmen reconnaissent les extraits de jazz modal, et où les rockeurs se trompent même avec Internet ouvert. Depuis 2026, le groupe reconnaît presque tous les extraits, et le blind test ne sert plus à classer les meilleurs.",
    imagineForm: 'E',
    imagine:
      "Avant, une question de physique de GPQA tombe chez une biologiste en doctorat, qui a Internet et une demi-heure devant elle, et les non-spécialistes réussissent ainsi 34 % des questions. Après, la même question tombe chez un physicien, et les spécialistes du domaine en réussissent 65 %.",
    full: [
      "Publié en novembre 2023, GPQA préparait le jour où il faudrait contrôler des réponses d'IA plus savantes que les humains chargés de les vérifier. À sa sortie, le meilleur modèle, fondé sur GPT-4, réussissait 39 % des questions, contre 65 % pour les experts du domaine. Le test porte sur la connaissance scientifique de pointe en QCM, sans rien vérifier de la recherche, de la paillasse ou de la capacité à expliquer une réponse.",
      "En septembre 2026, Epoch AI, qui fait passer GPQA Diamond lui-même faute de classement officiel, mesure GPT-6 Astra à 95,8 %, Claude Sonnet 5.5 à 95,6 %, puis GPT-6.1 Sol et Gemini 3.8 Flash à 95,4 %, avec une erreur type d'environ 1,4 point pour chacun. Moins d'un demi-point sépare les quatre, ce qui les met à égalité, et le test ne sait plus les classer.",
      "En mai 2025, Epoch estimait qu'au moins 90 % des questions de Diamond étaient valides, et une extrapolation qu'il jugeait lui-même hasardeuse donnait 15 questions douteuses sur 198, soit 8 %. Les meilleurs scores dépassent désormais ce plafond pessimiste, ce qui veut dire que les questions douteuses sont moins nombreuses, ou que les modèles retrouvent la réponse attendue même là où elle se discute.",
    ],
    reliability: {
      level: 'fragile',
      why: "Le test est saturé, puisque les quatre meilleurs modèles mesurés par Epoch AI tiennent dans son erreur type, et Epoch estimait en 2025 qu'environ une question sur douze pouvait être douteuse. Il reste utile pour situer un modèle moyen, plus pour départager ceux de pointe.",
    },
    office: [
      {who: 'q', text: "Les deux modèles qu'on hésite à prendre font 95 et 94 % sur GPQA. On prend le premier ?"},
      {who: 'a', text: "L'écart tient dans l'erreur type, qui avoisine 1,4 point à ce niveau ; regarde plutôt un benchmark qui les sépare encore, puis tes propres tâches."},
    ],
    avoid:
      "« Il a 95 % au GPQA, il a le niveau d'un docteur en chimie. » Il choisit la bonne réponse parmi quatre sur des questions écrites par des docteurs, et sa capacité à mener une expérience ou à poser la bonne question reste hors du test.",
    video: null,
    sources: [
      {label: "Rein et al., GPQA: A Graduate-Level Google-Proof Q&A Benchmark, 20 novembre 2023 (448 questions, experts à 65 %, non-experts à 34 % avec plus de 30 minutes et Internet, GPT-4 à 39 %, supervision de systèmes plus savants que leurs contrôleurs)", url: 'https://arxiv.org/abs/2311.12022'},
      {label: "Epoch AI, données du Benchmarking Hub, GPQA Diamond, téléchargées le 2 octobre 2026 (GPT-6 Astra 95,77 % ± 1,37 ; Claude Sonnet 5.5 95,58 % ± 1,37 ; GPT-6.1 Sol 95,39 % ± 1,38 ; Gemini 3.8 Flash 95,39 % ± 1,40 ; hasard à 25 %, soit quatre choix)", url: 'https://epoch.ai/benchmarks/gpqa-diamond'},
      {label: "Greg Burnham, Epoch AI, GPQA Diamond: What's left?, 30 mai 2025 (198 questions ; au moins 90 % valides ; extrapolation jugée tirée par les cheveux à 15 sur 198, soit 8 %)", url: 'https://epoch.ai/gradient-updates/gpqa-diamond-whats-left'},
    ],
  },
  {
    id: 'lmarena',
    status: 'live',
    title: 'LMArena (Arena)',
    en: 'LMArena',
    aliases: ['Arena', 'Chatbot Arena', 'arena.ai', 'LM Arena'],
    aliasesFr: [],
    jargon: [
      {say: 'Arena score', means: "un score de type Elo, calculé à partir des duels entre modèles et affiché avec sa marge d'erreur"},
      {say: 'style control', means: "la correction qu'Arena applique au classement pour que la longueur et la mise en forme d'une réponse pèsent moins dans le vote"},
      {say: 'preliminary', means: "un modèle classé avec encore peu de votes, dont le rang peut bouger"},
    ],
    cat: 'ecosysteme',
    links: ['benchmarks-lesquels-croire', 'benchmaxxing', 'flagornerie', 'rlhf', 'benchmarks'],
    short:
      "LMArena, rebaptisé Arena en 2026, est un classement fondé sur des votes humains, où l'on pose une question à deux modèles anonymes, choisit la meilleure réponse, puis découvre leurs noms.",
    image:
      "Deux groupes jouent derrière un rideau le morceau demandé par quelqu'un du public, qui vote pour celui qu'il préfère avant de voir qui jouait. Le public, dans ce cas, ne note pas la justesse mais son plaisir, et c'est exactement ce que mesure le classement.",
    imagineForm: 'B',
    imagine:
      "Pose sur arena.ai une question dont tu connais bien la réponse, puis lis les deux réponses anonymes avant de voter. Tu verras qu'il est tentant de choisir la plus longue ou la mieux présentée avant d'avoir vérifié laquelle est juste, et c'est ce penchant que la correction de style d'Arena essaie de retirer.",
    full: [
      "Arena est né en 2023 comme un projet de recherche de l'université de Berkeley, sous le nom de Chatbot Arena. Au 30 septembre 2026, son classement texte repose sur 8 602 501 votes et 410 modèles. Le classement reflète ce que des utilisateurs préfèrent sur leurs propres questions, et il ne vérifie pas qu'une réponse est exacte, ni qu'un modèle tient une tâche longue.",
      "Les mêmes votes peuvent donner deux classements. Avec la correction de style, Claude Fable 5 est 3e du classement texte ; sans elle, il tombe 9e, parce que la longueur et la mise en forme pèsent dans les votes, un effet qu'Arena mesure depuis 2024. Le premier, Gemini 4 Argon, est noté « préliminaire » avec 4 942 votes et 9 points de marge d'erreur.",
      "Arena est devenu une entreprise en avril 2025, a levé 150 millions de dollars en janvier 2026 pour une valorisation de 1,7 milliard, et vend depuis septembre 2025 un service d'évaluation que les labos eux-mêmes peuvent acheter. Fin avril 2025, les auteurs de The Leaderboard Illusion estimaient que Google et OpenAI avaient reçu chacun environ 20 % des données de l'arène, contre 29,7 % pour 83 modèles open weights réunis.",
    ],
    reliability: {
      level: 'à nuancer',
      why: "Les votes sont nombreux, réels et faits à l'aveugle, mais ils mesurent une préférence que la longueur et la présentation influencent. The Leaderboard Illusion a montré en 2025 un accès inégal aux données en faveur des grands labos, et l'entreprise vend ses évaluations à ces mêmes labos.",
    },
    then:
      "En 2023, Chatbot Arena était un projet universitaire financé par des subventions et des dons. En janvier 2026, il est devenu Arena, une entreprise valorisée 1,7 milliard de dollars, avec des classements pour le code, les agents, l'image et la vidéo.",
    office: [
      {who: 'q', text: "Notre fournisseur n'est que 4e sur Arena. On regarde ailleurs ?"},
      {who: 'a', text: "Regarde d'abord la colonne des rangs possibles, puisque les marges se chevauchent ; le 4e du classement texte, Claude Opus 5.5, peut s'y trouver n'importe où entre la 2e et la 14e place."},
    ],
    avoid:
      "« C'est le vote du public, donc impossible à truquer. » Un labo peut tester en privé plusieurs versions avant d'en publier une, et les réponses longues et soignées partent avantagées, d'où la correction de style.",
    video: null,
    sources: [
      {label: "Arena, classement texte au 30 septembre 2026, avec correction de style (8 602 501 votes, 410 modèles ; gemini-4-argon-high 1 525 ± 9, préliminaire, 4 942 votes ; claude-fable-5-high 3e ; claude-opus-5.5-high 4e, rangs possibles de 2 à 14)", url: 'https://arena.ai/leaderboard/text'},
      {label: "Arena, classement texte sans correction de style, au 30 septembre 2026 (claude-fable-5-high 9e)", url: 'https://arena.ai/leaderboard/text/overall-no-style-control'},
      {label: "LMSYS, Does style matter? Disentangling style and substance in Chatbot Arena, 28 août 2024 (longueur et markdown contrôlés, la longueur pèse le plus)", url: 'https://www.lmsys.org/blog/2024-08-28-style-control/'},
      {label: "Chiang et al., Chatbot Arena: An Open Platform for Evaluating LLMs by Human Preference, mars 2024 (duels anonymes, votes de la foule)", url: 'https://arxiv.org/abs/2403.04132'},
      {label: "TechCrunch, LMArena lands $1.7B valuation four months after launching its product, 6 janvier 2026 (150 millions de dollars, service AI Evaluations ouvert aux labos en septembre 2025, 30 millions de dollars annualisés en décembre 2025, projet de Berkeley financé par subventions et dons en 2023)", url: 'https://techcrunch.com/2026/01/06/lmarena-lands-1-7b-valuation-four-months-after-launching-its-product/'},
      {label: "Arena, LMArena is now Arena, 28 janvier 2026 (changement de nom, image et vidéo)", url: 'https://arena.ai/blog/lmarena-is-now-arena/'},
      {label: "Wikipédia, Arena.ai (entreprise indépendante depuis avril 2025)", url: 'https://en.wikipedia.org/wiki/Arena.ai'},
      {label: "Singh et al., The Leaderboard Illusion, 29 avril 2025 (Google 19,2 % et OpenAI 20,4 % des données, 83 modèles open weights 29,7 %)", url: 'https://arxiv.org/abs/2504.20879'},
    ],
  },
  {
    id: 'mmlu',
    status: 'live',
    title: 'MMLU',
    en: 'MMLU',
    aliases: ['Massive Multitask Language Understanding', 'MMLU-Pro', 'MMLU-Redux'],
    aliasesFr: [],
    jargon: [
      {say: '5-shot', means: "le modèle voit cinq questions résolues avant celle qu'on lui pose, la façon classique de faire passer MMLU"},
      {say: 'MMLU-Pro', means: "une version plus difficile, qui sature à son tour ; en janvier 2026, la fiche de Kimi K2.5 y donnait 90,1 % à Gemini 3 Pro"},
      {say: 'MMLU-Redux', means: "5 700 questions de MMLU relues à la main en 2024 pour corriger les réponses fausses"},
    ],
    cat: 'ecosysteme',
    links: ['benchmarks-lesquels-croire', 'humanitys-last-exam', 'gpqa', 'quantization', 'mythe-plus-gros-plus-intelligent'],
    short:
      "MMLU est un QCM de 15 908 questions dans 57 matières, des mathématiques au droit en passant par la médecine, publié en 2020 pour mesurer l'étendue des connaissances d'un modèle de langage.",
    image:
      "C'était l'examen d'entrée au conservatoire, un QCM de culture musicale que chaque groupe passait avant d'être pris au sérieux. Aujourd'hui, tous les groupes de premier plan y frôlent la note maximale, et le corrigé lui-même contient des erreurs.",
    imagineForm: 'D',
    imagine:
      "En entretien, un candidat data scientist te demande : « Un modèle qui fait 100 % au MMLU, il est parfait ? » Tu lui réponds : « Il a coché la réponse attendue à un millier de questions dont l'énoncé ou le corrigé est erroné. »",
    full: [
      "Publié en septembre 2020 par Dan Hendrycks et son équipe, MMLU pose 15 908 questions à quatre choix dans 57 matières. À sa sortie, GPT-3 obtenait 43,9 % et les auteurs estimaient le niveau d'experts humains à environ 89,8 %. MMLU couvre l'étendue des connaissances scolaires et universitaires, mais pas le raisonnement long, l'usage d'outils ou la capacité à dire qu'on ne sait pas.",
      "En juin 2024, une équipe de chercheurs a relu à la main 5 700 questions et estimé que 6,5 % de MMLU contient une erreur ; dans la partie virologie, 57 % des questions examinées en avaient une. Le plafond réel est donc nettement sous 100 %, autour de 93,5 % si l'estimation est juste, et un score au-delà veut dire que le modèle suit le corrigé jusque dans ses erreurs.",
      "Ses questions circulent en ligne depuis 2020, et le risque qu'elles se retrouvent dans les données d'entraînement est connu depuis longtemps. Les labos l'ont laissé de côté, puisque les fiches de Mistral Medium 3.5, MiniMax-M3, Kimi K3 et GLM-5.3, publiées entre mars et août 2026, ne le mentionnent plus du tout.",
    ],
    reliability: {
      level: 'fragile',
      why: "Le test est saturé depuis 2024, environ 6,5 % de ses questions ont un énoncé ou un corrigé erroné, et ses questions, publiques depuis 2020, ont eu tout le temps de passer dans les données d'entraînement. Il ne sert plus qu'à vérifier qu'un petit modèle ou un modèle compressé n'a pas perdu ses connaissances.",
    },
    then:
      "Mi-2024, Anthropic, OpenAI et Meta affichaient encore un score MMLU autour de 88 % dans les annonces de Claude 3.5 Sonnet, de GPT-4o et de Llama 3.1. En 2026, les fiches des modèles de pointe citent GPQA, HLE ou Terminal-Bench, et MMLU n'y figure plus.",
    office: [
      {who: 'q', text: "Le petit modèle qu'on veut embarquer fait 70 % au MMLU. Ça veut dire quoi ?"},
      {who: 'a', text: "Que c'est un repère pour le comparer à d'autres petits modèles, ou à sa version non compressée, et presque rien de plus sur ce qu'il fera de tes demandes."},
    ],
    avoid:
      "« Avec Language Understanding dans son nom, MMLU teste la compréhension du langage. » Il teste des connaissances en QCM, matière par matière, et ne vérifie ni la rédaction, ni le suivi d'une consigne, ni le raisonnement en plusieurs étapes.",
    video: null,
    sources: [
      {label: "Hendrycks et al., Measuring Massive Multitask Language Understanding, septembre 2020 (57 matières)", url: 'https://arxiv.org/abs/2009.03300'},
      {label: "Wikipédia, MMLU (15 908 questions ; GPT-3 à 43,9 % ; experts estimés à 89,8 % ; environ 88 % pour Claude 3.5 Sonnet, GPT-4o et Llama 3.1 mi-2024 ; contamination ; « partially phased out » depuis 2025)", url: 'https://en.wikipedia.org/wiki/MMLU'},
      {label: "Gema et al., Are We Done with MMLU?, juin 2024 (5 700 questions relues, 6,49 % d'erreurs estimées, 57 % en virologie, dont 33 % de corrigés faux, 14 % de questions floues et 4 % à plusieurs bonnes réponses). Calcul de l'Imagine : 15 908 x 0,0649 = 1 032 questions", url: 'https://arxiv.org/abs/2406.04127'},
      {label: "Moonshot AI, fiche de Kimi K2.5 sur Hugging Face, janvier 2026 (MMLU-Pro : Gemini 3 Pro à 90,1 %)", url: 'https://huggingface.co/moonshotai/Kimi-K2.5'},
      {label: "Mistral AI, fiche de Mistral Medium 3.5 sur Hugging Face, 31 mars 2026, consultée le 2 octobre 2026 (aucune mention de MMLU)", url: 'https://huggingface.co/mistralai/Mistral-Medium-3.5-128B'},
      {label: "MiniMax, fiche de MiniMax-M3 sur Hugging Face, 2 juin 2026, consultée le 2 octobre 2026 (aucune mention de MMLU)", url: 'https://huggingface.co/MiniMaxAI/MiniMax-M3'},
      {label: "Moonshot AI, fiche de Kimi K3 sur Hugging Face, 13 juin 2026, consultée le 2 octobre 2026 (aucune mention de MMLU)", url: 'https://huggingface.co/moonshotai/Kimi-K3'},
      {label: "Z.ai, fiche de GLM-5.3 sur Hugging Face, 25 août 2026, consultée le 2 octobre 2026 (aucune mention de MMLU)", url: 'https://huggingface.co/zai-org/GLM-5.3'},
      {label: "DeepSeek, fiche de DeepSeek-V4.1-Flash sur Hugging Face, septembre 2026 (GPQA Diamond, HLE et Terminal-Bench pour le modèle instruct, MMLU-Pro seulement pour le modèle de base)", url: 'https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash'},
    ],
  },
];

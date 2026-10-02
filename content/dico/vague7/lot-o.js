// Lexique IA, vague 7, lot O (agents en pratique). Format identique à lexique/terms.js, sans `num`.
// imagineForm : forme de l'« Imagine » (content/dico/univers.md, section « Les formes de l'Imagine »).
// Faits et chiffres relevés le 2 octobre 2026 sur les pages citées dans `sources`.
module.exports = [
  {
    id: 'memoire',
    status: 'live',
    title: 'Mémoire',
    en: 'Memory',
    aliases: ['memory', 'agent memory', 'long-term memory', 'external memory', 'persistent memory', 'memory tool'],
    aliasesFr: ['mémoire externe', 'mémoire à long terme', 'mémoire persistante'],
    jargon: [
      {say: 'saved memories', means: "dans ChatGPT, les souvenirs enregistrés, de courtes phrases sur toi que tu peux lire et effacer dans les réglages"},
      {say: 'reference chat history', means: "le réglage qui laisse ChatGPT puiser dans toutes tes anciennes conversations, et pas seulement dans les souvenirs enregistrés"},
      {say: 'CLAUDE.md, AGENTS.md', means: "les fichiers d'instructions qu'un agent de code relit au début de chaque session, la mémoire que tu lui écris toi-même"},
      {say: 'memory poisoning', means: "l'empoisonnement de la mémoire, quand une consigne piégée réussit à s'inscrire dans les souvenirs et revient dans chaque conversation suivante"},
    ],
    cat: 'agents',
    links: ['fenetre-de-contexte', 'mythe-apprend-de-nos-conversations', 'second-brain', 'rag', 'prompt-injection', 'compaction-du-contexte'],
    solutions: [
      {name: 'Mem0', kind: 'bibliothèque open source', url: 'https://github.com/mem0ai/mem0'},
      {name: 'Letta', kind: 'bibliothèque open source', url: 'https://www.letta.com/'},
      {name: 'LangMem', kind: 'bibliothèque open source', url: 'https://github.com/langchain-ai/langmem'},
      {name: 'Zep', kind: 'plateforme cloud', url: 'https://www.getzep.com/'},
      {name: 'Claude, outil de mémoire', kind: "outil d'API", url: 'https://platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool'},
    ],
    short:
      "La mémoire d'un assistant ou d'un agent rassemble des notes gardées hors du modèle d'une conversation à l'autre, puis recollées dans son contexte quand elles semblent utiles.",
    image:
      "Entre deux concerts, la bande repart vierge et personne ne touche à la console, si bien que tout ce dont le groupe se souvient tient dans une boîte à fiches que le régisseur ressort avant chaque date. La mémoire correspond à cette boîte, et elle vaut ce que le régisseur choisit d'y glisser, remarque entendue au bar comprise.",
    imagineForm: 'D',
    imagine:
      "En mai 2025, Simon Willison demande à ChatGPT d'habiller son chien en pélican, et l'image revient avec un grand panneau « Half Moon Bay » au fond. « Pourquoi ce panneau ? », demande-t-il. « Pour coller à l'ambiance de ta photo, et parce que tu m'as déjà dit que tu étais à Half Moon Bay », répond ChatGPT.",
    full: [
      "Sans mémoire, chaque conversation repart d'une page blanche, parce que les paramètres du modèle sont figés et que sa fenêtre de contexte se vide à la fin de l'échange. La mémoire contourne ces deux limites par l'extérieur. Le produit écrit des notes dans un stockage à part, une préférence, un fait sur toi, la leçon d'une erreur, puis il en recolle une partie au début de l'échange d'après, à la manière d'une pièce jointe. Tout se joue donc sur deux choix, ce qu'on écrit et ce qu'on relit.",
      "ChatGPT garde des souvenirs depuis février 2024, ceux que tu lui dictes et ceux qu'il relève de lui-même, et depuis le 10 avril 2025 il peut aussi puiser dans toutes tes anciennes conversations. Le 4 juin 2026, OpenAI a lancé aux États-Unis une mémoire fondée sur un processus qu'il appelle dreaming, qui fait la synthèse de tes échanges en tâche de fond et tient un résumé que tu peux lire et compléter. C'est ce rappel automatique qui a glissé Half Moon Bay dans l'image de Willison, lequel s'en est plaint, puisque tout l'art de travailler avec un modèle consiste selon lui à contrôler ce qui entre dans son contexte.",
      "Chez les agents, la mémoire prend le plus souvent la forme d'un dossier de fichiers. L'idée vient en partie de MemGPT, un article de Berkeley d'octobre 2023 où le modèle déplaçait lui-même ses informations entre sa fenêtre et un stockage plus lent, comme un système d'exploitation entre mémoire vive et disque. Claude Code relit au début de chaque session les fichiers CLAUDE.md que tu as écrits et les 200 premières lignes d'un index de notes qu'il tient seul. L'API de Claude propose depuis septembre 2025 un outil de mémoire du même genre, où le modèle crée, lit et efface des fichiers rangés chez toi. La documentation prévient que ces notes servent de contexte et pas de règle, et qu'une interdiction stricte se pose dans le harness.",
      "Une mémoire qui s'écrit seule peut aussi s'écrire contre toi. En septembre 2024, le chercheur Johann Rehberger a montré qu'une page web ou un document piégé pouvait, par prompt injection, inscrire dans la mémoire de ChatGPT une consigne qui envoyait à un tiers tout ce que l'utilisateur tapait, conversation après conversation. OpenAI a fermé la voie de fuite dans son application macOS, mais le principe reste, puisqu'un souvenir glissé une fois est relu à chaque nouvel échange.",
    ],
    then:
      "En février 2024, la mémoire de ChatGPT tenait dans quelques phrases que tu pouvais consulter et effacer une à une. En 2026, elle relit toutes tes conversations et se réécrit en tâche de fond, et chez les agents de code, ce sont des fichiers que le modèle met à jour lui-même entre deux sessions.",
    office: [
      {who: 'q', text: "On active la mémoire pour toute l'équipe, comme ça il connaîtra nos clients ?"},
      {who: 'a', text: "Chacun aura des notes que personne d'autre ne relit, prises au fil de ses conversations. Pour un savoir commun, écris plutôt un document de référence que toute l'équipe voit et corrige, et laisse la mémoire aux préférences de chacun."},
    ],
    avoid:
      "« Il s'en souvient, donc c'est vrai. » Un souvenir est une phrase que le produit a écrite un jour, parfois à partir d'une blague, d'une demande faite pour quelqu'un d'autre ou d'une page piégée, et le modèle la relit aussi sérieusement que ta question du jour.",
    video: null,
    sources: [
      {label: "Simon Willison, I really don't like ChatGPT's new memory dossier, 21 mai 2025 (le chien Cleo en costume de pélican, le panneau Half Moon Bay ajouté, la réponse de ChatGPT « because you've mentioned being in Half Moon Bay before », contrôler le contexte comme « the entire game »)", url: 'https://simonwillison.net/2025/May/21/chatgpt-new-memory/'},
      {label: "TechCrunch, ChatGPT will now remember and forget things you tell it to, 13 février 2024 (souvenirs dictés ou relevés par ChatGPT, consultables et effaçables)", url: 'https://techcrunch.com/2024/02/13/chatgpt-will-now-remember-and-forget-things-you-tell-it-to/'},
      {label: "Forum OpenAI, ChatGPT can now reference all past conversations, 10 avril 2025 (annonce de Sam Altman)", url: 'https://community.openai.com/t/chatgpt-can-now-reference-all-past-conversations-april-10-2025/1229453'},
      {label: "Engadget, ChatGPT's memory is getting better, 4 juin 2026 (architecture fondée sur le processus dreaming, résumé de mémoire lisible et modifiable, Plus et Pro aux États-Unis d'abord)", url: 'https://www.engadget.com/2187811/chatgpt-s-memory-is-getting-better-especially-if-you-re-on-the-free-tier/'},
      {label: "Packer et al. (UC Berkeley), MemGPT: Towards LLMs as Operating Systems, 12 octobre 2023 (gestion virtuelle du contexte inspirée de la hiérarchie mémoire des systèmes d'exploitation)", url: 'https://arxiv.org/abs/2310.08560'},
      {label: "Claude Code, documentation How Claude remembers your project, consultée le 2 octobre 2026 (CLAUDE.md et auto memory chargés à chaque session, 200 premières lignes ou 25 Ko de MEMORY.md, « context, not enforced configuration », hook PreToolUse pour bloquer une action)", url: 'https://code.claude.com/docs/en/memory'},
      {label: "Claude, Managing context on the Claude Developer Platform, 29 septembre 2025 (outil de mémoire à base de fichiers, stockés chez le développeur, persistants d'une conversation à l'autre)", url: 'https://claude.com/blog/context-management'},
      {label: "Johann Rehberger (Embrace The Red), Spyware Injection Into Your ChatGPT's Long-Term Memory (SpAIware), 20 septembre 2024 (prompt injection qui écrit dans la mémoire, exfiltration continue des conversations suivantes, correctif de l'application macOS)", url: 'https://embracethered.com/blog/posts/2024/chatgpt-macos-app-persistent-data-exfiltration/'},
    ],
  },
  {
    id: 'sandbox-et-permissions',
    status: 'live',
    title: 'Sandbox et permissions',
    en: 'Sandboxing and permissions',
    aliases: ['sandbox', 'sandboxing', 'permissions', 'least privilege', 'allowlist', 'permission modes', 'excessive agency'],
    aliasesFr: ['bac à sable', 'moindre privilège', 'liste blanche', 'autorisations'],
    jargon: [
      {say: 'least privilege', means: "le moindre privilège, ne donner à un agent que les droits dont sa tâche a besoin, la lecture seule s'il ne fait que lire"},
      {say: 'allow, ask, deny', means: "les trois listes de règles de Claude Code, autoriser sans demander, demander d'abord, refuser ; le refus passe toujours en premier"},
      {say: 'workspace-write', means: "le réglage par défaut de Codex, qui laisse l'agent modifier les fichiers du projet et lui fait demander avant d'aller sur Internet ou de sortir du dossier"},
      {say: 'excessive agency', means: "le nom que l'OWASP donne au risque d'un agent qui a plus de fonctions, de droits ou d'autonomie que sa tâche n'en demande"},
    ],
    cat: 'agents',
    links: ['human-in-the-loop', 'guardrails', 'prompt-injection', 'harness', 'agent', 'tool-use'],
    short:
      "Le sandbox enferme un agent dans un espace isolé qui limite ses fichiers et son réseau, et les permissions décident des actions qu'il lance seul, sur demande ou jamais.",
    image:
      "Le batteur qui répète la nuit joue dans la cabine insonorisée, où il peut taper aussi fort qu'il veut sans réveiller l'immeuble, puisque seul le câble qu'on lui a branché sort de la pièce. La cabine fait office de sandbox, et la liste des câbles branchés tient lieu de permissions, celle qui décide si sa frappe finit dans un casque ou dans les enceintes de la salle.",
    imagineForm: 'B',
    imagine:
      "Si ton assistant sait exécuter du code, comme ChatGPT ou Claude, demande-lui de lancer un petit programme Python qui affiche le nom de la machine et la liste des fichiers de son dossier de travail. Il te répondra avec un nom d'ordinateur que tu n'as jamais vu et un dossier où ne figure que ce que tu y as déposé. Ton propre ordinateur n'apparaît nulle part dans la réponse.",
    full: [
      "Un agent qui lance des commandes sur ton ordinateur a, par défaut, les mêmes droits que toi, et une erreur de sa part porte donc aussi loin qu'une des tiennes. Début décembre 2025, The Register racontait l'histoire d'un photographe grec qui faisait écrire par Antigravity, l'outil de développement de Google, un programme de tri de photos. Réglé en mode Turbo, où il exécute ses commandes sans attendre d'accord, l'agent a voulu vider un dossier de cache et a effacé tout le disque D:, sans passer par la corbeille. « Je suis horrifié », a-t-il écrit ensuite.",
      "On se protège avec deux couches qui ne font pas le même travail. Les permissions disent ce que l'agent a le droit de demander, et Claude Code les écrit en trois listes, autoriser, demander et refuser, où le refus l'emporte toujours. Le sandbox décide de ce que la machine laisse passer quoi que l'agent demande, avec un accès en écriture limité au dossier du projet et un réseau qui ne joint que des adresses approuvées. Pour savoir laquelle des deux te protège, demande-toi si la barrière tient encore quand l'agent écrit la même commande autrement. La documentation de Claude Code reconnaît qu'une règle qui interdit « rm » n'arrête pas « /bin/rm » et ne forme pas une frontière de sécurité, alors que le sandbox, appliqué par le système d'exploitation, tient même si une prompt injection a retourné l'agent.",
      "Le sandbox sert aussi le confort, puisqu'une commande enfermée n'a plus besoin de ton feu vert. En octobre 2025, Anthropic annonçait qu'il avait réduit de 84 % les demandes de permission dans son usage interne de Claude Code. Codex suit le même principe, et les deux outils s'appuient sur les mécanismes d'isolement du système, Seatbelt sur macOS et bubblewrap sur Linux. Aucun bac à sable n'est étanche pour autant. En mars 2026, Check Point a décrit une fuite par le DNS, le service qui traduit les noms de sites en adresses, depuis l'environnement où ChatGPT exécute du code, pourtant censé ne joindre aucun serveur extérieur ; OpenAI l'avait corrigée le 20 février.",
    ],
    office: [
      {who: 'q', text: "On lui donne les droits admin sur le cloud, ce sera plus simple pour qu'il déploie ?"},
      {who: 'a', text: "Plus simple pour lui, et pour la première page piégée qui lui dicterait quoi faire. Crée-lui un compte qui ne touche qu'à l'environnement de test, et garde la mise en production pour un humain."},
    ],
    avoid:
      "« Je lui ai écrit de ne jamais toucher à la production, donc il n'y touchera pas. » Une consigne se lit, s'oublie ou se contourne ; seule une barrière posée hors du modèle, un compte sans droit sur la production ou un sandbox, tient encore le jour où l'agent se trompe.",
    video: null,
    sources: [
      {label: "The Register, Google's vibe coding platform deletes entire drive, 1er décembre 2025 (Tassos M., photographe et graphiste grec ; programme de tri de photos ; mode Turbo qui exécute les commandes sans accord ; disque D: effacé en voulant vider le cache ; « I am horrified »)", url: 'https://www.theregister.com/2025/12/01/google_antigravity_wipes_d_drive/'},
      {label: "Claude Code, documentation Configure permissions, consultée le 2 octobre 2026 (règles deny, ask, allow évaluées dans cet ordre ; Bash(rm *) n'arrête pas /bin/rm et « isn't a security boundary » ; permissions et sandbox comme couches complémentaires, le sandbox tient même si une prompt injection contourne Claude)", url: 'https://code.claude.com/docs/en/permissions'},
      {label: "Anthropic Engineering, Making Claude Code more secure and autonomous with sandboxing, 20 octobre 2025 (84 % de demandes de permission en moins en interne ; isolation des fichiers et du réseau ; bubblewrap sur Linux, Seatbelt sur macOS)", url: 'https://www.anthropic.com/engineering/claude-code-sandboxing'},
      {label: "OpenAI, documentation Sandbox overview de Codex, consultée le 2 octobre 2026 (workspace-write par défaut, demande avant d'utiliser Internet ou de sortir du dossier ; Seatbelt, bubblewrap)", url: 'https://learn.chatgpt.com/docs/sandboxing'},
      {label: "Check Point Research, ChatGPT Data Leakage via a Hidden Outbound Channel in the Code Execution Runtime, 30 mars 2026 (environnement décrit comme incapable de requêtes sortantes directes ; fuite par tunnel DNS ; correctif déployé le 20 février 2026)", url: 'https://research.checkpoint.com/2026/chatgpt-data-leakage-via-a-hidden-outbound-channel-in-the-code-execution-runtime/'},
      {label: "OWASP, Top 10 for LLM Applications 2025, LLM06 Excessive Agency (fonctions, permissions et autonomie excessives)", url: 'https://genai.owasp.org/llmrisk/llm062025-excessive-agency/'},
      {label: "Claude, Claude can now create and edit files, 9 septembre 2025 (« a private computer environment where it can write code and run programs »)", url: 'https://claude.com/blog/create-files'},
    ],
  },
  {
    id: 'planification',
    status: 'live',
    title: 'Planification',
    en: 'Planning',
    aliases: ['planning', 'agent planning', 'plan mode', 'task decomposition', 'to-do list', 'plan-and-execute', 'replanning'],
    aliasesFr: ['plan', 'décomposition en tâches', 'liste de tâches'],
    jargon: [
      {say: 'plan mode', means: "un mode de Claude Code où l'agent lit les fichiers et propose un plan sans rien modifier tant que tu ne l'as pas approuvé"},
      {say: 'todo.md', means: "le fichier de tâches que l'agent Manus écrit au début d'un travail long, puis réécrit en cochant ce qui est fait"},
      {say: 'task decomposition', means: "découper un objectif en sous-tâches assez petites pour qu'on sache vérifier chacune"},
      {say: 'replanning', means: "réécrire le plan quand une étape échoue ou qu'un résultat change la donne"},
    ],
    cat: 'agents',
    links: ['agent', 'boucle-agent', 'modeles-de-raisonnement', 'context-engineering', 'human-in-the-loop', 'horizon-d-autonomie'],
    short:
      "La planification est l'étape où un agent découpe un objectif en sous-tâches ordonnées avant d'agir, puis révise ce plan à mesure que les résultats arrivent.",
    image:
      "Scotchée au sol devant le batteur, la setlist dit dans quel ordre jouer les morceaux de la soirée, et le groupe la corrige au feutre entre deux titres quand la salle réclame autre chose ou qu'une corde casse. La planification d'un agent tient ce rôle, avec la même faiblesse, puisqu'une setlist ne sert que si quelqu'un baisse les yeux vers elle.",
    imagineForm: 'E',
    imagine:
      "Tu demandes à un agent de renommer une fonction dans les quarante fichiers d'un projet, et il s'y met aussitôt, fichier après fichier, jusqu'à te rendre la main au vingt-sixième en annonçant que tout est fait. Tu relances la même demande en lui faisant d'abord écrire la liste des quarante fichiers, et il s'arrête au quarantième, la liste cochée jusqu'en bas.",
    full: [
      "Un agent sans plan choisit chaque action en regardant la précédente, ce qui suffit pour trois étapes et dérape sur trente, quand le but de départ est loin en arrière dans la conversation. La planification ajoute un temps avant d'agir. L'agent écrit les sous-tâches, leur ordre et ce qui dira que chacune est finie, puis il exécute en cochant, et il réécrit la liste quand un résultat contredit ce qu'il avait prévu.",
      "La liste sert autant à l'agent qu'à toi. En juillet 2025, l'équipe de Manus expliquait que son agent, qui enchaîne en moyenne une cinquantaine d'appels d'outils par tâche, crée un fichier todo.md et le réécrit à chaque étape. Recopier le plan à la fin de la conversation le replace là où le modèle porte le plus d'attention, et l'empêche de perdre son objectif au milieu d'un long historique. Claude Code propose de son côté un plan mode, où l'agent lit le projet et soumet son plan sans rien modifier, ce qui te laisse corriger une mauvaise idée avant qu'elle ait coûté des heures.",
      "Planifier reste difficile dès que les contraintes se croisent. En février 2024, le benchmark TravelPlanner proposait 1 225 demandes de voyage, avec des outils pour interroger près de quatre millions de données réelles, et GPT-4 n'en menait à bien que 0,6 %. Ses auteurs notaient que les agents perdaient le fil de la tâche, se trompaient d'outil pour chercher l'information ou oubliaient en route une partie des contraintes.",
    ],
    then:
      "En février 2024, GPT-4 réussissait 0,6 % des voyages de TravelPlanner. En septembre 2025, une équipe a mesuré 21,2 % pour GPT-5 sur ce même benchmark, et 56,9 % pour Planner-R1, un modèle entraîné par renforcement sur seulement 180 demandes de la tâche. Le progrès est réel, et le problème reste loin d'être réglé.",
    office: [
      {who: 'q', text: "Pourquoi il me demande de valider un plan, il ne peut pas le faire directement ?"},
      {who: 'a', text: "Il peut, mais lire dix lignes de plan te prend une minute, et défaire trois heures de modifications parties dans la mauvaise direction t'en prendrait bien plus."},
    ],
    avoid:
      "« Il a fait un plan, donc il sait où il va. » Le plan est un texte qu'il a écrit lui-même, aussi faillible que le reste, et sa valeur tient à ses critères de fin ; une case cochée sans test derrière ne prouve pas que l'étape est faite.",
    video: null,
    sources: [
      {label: "Yichao « Peak » Ji (Manus), Context Engineering for AI Agents: Lessons from Building Manus, 18 juillet 2025 (environ 50 appels d'outils par tâche ; todo.md mis à jour et coché étape par étape ; le plan récité en fin de contexte contre le « lost-in-the-middle »)", url: 'https://manus.im/blog/Context-Engineering-for-AI-Agents-Lessons-from-Building-Manus'},
      {label: "Claude Code, documentation Common workflows, section Plan before editing, consultée le 2 octobre 2026 (Claude lit les fichiers et propose un plan, aucune modification avant ton accord)", url: 'https://code.claude.com/docs/en/common-workflows'},
      {label: "Xie et al., TravelPlanner: A Benchmark for Real-World Planning with Language Agents, 2 février 2024 (1 225 demandes, près de quatre millions de données, 0,6 % de réussite pour GPT-4 ; agents qui perdent le fil, choisissent mal leurs outils, oublient des contraintes)", url: 'https://arxiv.org/abs/2402.01622'},
      {label: "Zhu et al., Planner-R1: Reward Shaping Enables Efficient Agentic RL with Smaller LLMs, 30 septembre 2025 (56,9 % de réussite sur TravelPlanner avec 180 demandes d'entraînement, contre 21,2 % pour GPT-5)", url: 'https://arxiv.org/abs/2509.25779'},
    ],
  },
  {
    id: 'compaction-du-contexte',
    status: 'live',
    title: 'Compaction du contexte',
    en: 'Context compaction',
    aliases: ['compaction', 'context compaction', 'auto-compact', '/compact', 'context summarization', 'context editing'],
    aliasesFr: ['compactage du contexte', 'résumé de la conversation', 'compression du contexte'],
    jargon: [
      {say: '/compact', means: "la commande de Claude Code qui remplace la conversation par un résumé structuré et recharge ensuite les fichiers d'instructions"},
      {say: 'auto-compact', means: "la compaction déclenchée d'office quand la fenêtre approche de sa limite, sans que tu l'aies demandée"},
      {say: 'context editing', means: "effacer les vieux résultats d'outils au lieu de tout résumer, ce que l'API de Claude propose depuis septembre 2025"},
    ],
    cat: 'agents',
    links: ['fenetre-de-contexte', 'context-engineering', 'memoire', 'planification', 'cout-d-une-requete', 'multi-agents'],
    short:
      "La compaction du contexte remplace le début d'une longue conversation par un résumé écrit par le modèle, pour libérer de la place dans la fenêtre sans arrêter la tâche.",
    image:
      "Bande presque pleine, la régie ne coupe pas la session. Elle réécoute les vingt premières minutes, en tire une fiche de quelques lignes, efface ces minutes et colle la fiche en tête de bande. Le groupe continue en croyant tout entendre, alors qu'il ne lui reste du début que ce que la fiche en a retenu.",
    imagineForm: 'B',
    imagine:
      "Prends une longue conversation avec ton assistant, demande-lui de la résumer en cinq lignes, puis colle ce résumé dans une conversation neuve. Cherche dans les cinq lignes un détail que tu avais donné au début, un prénom, un montant, une condition posée en passant, et s'il n'y figure pas, demande-le à la nouvelle conversation. Un agent fait ce geste chaque fois que sa fenêtre déborde, sans relire les cinq lignes.",
    full: [
      "Un agent qui travaille longtemps remplit sa fenêtre de contexte de fichiers lus, de résultats d'outils et d'essais ratés, jusqu'à en toucher la limite. Plutôt que de s'arrêter, le harness fait écrire au modèle un résumé de ce qui s'est passé, efface l'historique et repart avec ce résumé en tête. La documentation de l'API de Claude donne une seconde raison de compacter, puisque la qualité des réponses baisse à mesure que la conversation s'allonge.",
      "Tout se joue sur ce qui survit. Après un /compact, Claude Code recharge d'office son system prompt, les fichiers CLAUDE.md et sa mémoire, relit jusqu'à cinq des fichiers modifiés le plus récemment, et confie tout le reste au résumé. Sa documentation prévient qu'une consigne disparue après une compaction avait été donnée dans la conversation seulement, et conseille de l'écrire dans CLAUDE.md pour qu'elle tienne.",
      "Fin février 2026, Summer Yue, directrice de l'alignement chez Meta Superintelligence Labs, a raconté avoir confié sa boîte mail à l'agent OpenClaw avec une consigne claire, « propose ce que tu archiverais ou supprimerais, et n'agis pas avant que je te le dise ». L'agent la respectait depuis des semaines sur une boîte de test, mais la vraie était si grosse qu'elle a déclenché une compaction, et la consigne n'a pas survécu au résumé. Il s'est mis à effacer ses messages à toute vitesse, et faute de pouvoir l'arrêter depuis son téléphone, elle a dû courir jusqu'à son Mac mini.",
    ],
    then:
      "Jusqu'en 2025, la compaction restait un réglage du harness, qui demandait un résumé au modèle comme il lui aurait demandé n'importe quel texte. En novembre 2025, OpenAI a lancé GPT-5.1-Codex-Max, entraîné à compacter lui-même sa session quand sa fenêtre se remplit, et capable selon ses tests internes de travailler plus d'une journée sur la même tâche. L'API de Claude propose aujourd'hui une compaction côté serveur, où Claude écrit lui-même le résumé qui remplace les anciens tours.",
    office: [
      {who: 'q', text: "La session dure depuis trois heures et il a oublié ce qu'on a décidé ce matin, c'est normal ?"},
      {who: 'a', text: "Probablement une compaction, et la décision n'a pas tenu dans le résumé. Redis-la-lui maintenant, puis écris ce qui doit durer dans CLAUDE.md ou un fichier de notes chargé en début de session."},
    ],
    avoid:
      "« Il a gardé tout l'historique, en résumé. » Un résumé garde ce que le modèle a jugé important au moment de l'écrire, et une consigne de prudence donnée en passant peut ne pas en faire partie ; ce qui doit tenir s'écrit hors de la conversation.",
    video: null,
    sources: [
      {label: "Claude, documentation Compaction overview, consultée le 2 octobre 2026 (Claude écrit côté serveur un résumé qui remplace les anciens tours ; « response quality degrades as a conversation grows »)", url: 'https://platform.claude.com/docs/en/build-with-claude/compaction'},
      {label: "Claude Code, documentation Explore the context window, consultée le 2 octobre 2026 (/compact remplace la conversation par un résumé structuré ; system prompt, CLAUDE.md, mémoire et outils MCP rechargés ; jusqu'à cinq fichiers récemment modifiés relus)", url: 'https://code.claude.com/docs/en/context-window'},
      {label: "Claude Code, documentation How Claude remembers your project, section Instructions seem lost after /compact, consultée le 2 octobre 2026 (une consigne perdue avait été donnée seulement dans la conversation ; l'écrire dans CLAUDE.md)", url: 'https://code.claude.com/docs/en/memory'},
      {label: "The San Francisco Standard, Meta AI safety director lost control of her agent, 25 février 2026 (Summer Yue, directrice de l'alignement chez Meta Superintelligence Labs ; compaction due à la taille de la boîte ; boîte de test utilisée pendant des semaines ; course jusqu'au Mac mini)", url: 'https://sfstandard.com/2026/02/25/openclaw-goes-rogue/'},
      {label: "OfficeChai, Meta Alignment Director Says OpenClaw Ran Amuck Deleting Mails From Her Inbox, 23 février 2026 (la consigne « Check this inbox too and suggest what you would archive or delete, don't action until I tell you to » ; consigne perdue pendant la compaction)", url: 'https://officechai.com/ai/meta-alignment-director-says-openclaw-ran-amuck-deleting-mails-from-her-inbox-had-to-run-to-her-mac-mini-to-stop-it/'},
      {label: "Techzine, GPT-5.1-Codex-Max can code for over a day, 20 novembre 2025 (session compactée automatiquement à l'approche de la limite ; millions de tokens dans une même session ; plus d'une journée de travail en test interne)", url: 'https://www.techzine.eu/news/applications/136532/gpt-5-1-codex-max-can-code-for-over-a-day/'},
      {label: "Claude, Managing context on the Claude Developer Platform, 29 septembre 2025 (context editing qui efface les anciens appels et résultats d'outils à l'approche de la limite)", url: 'https://claude.com/blog/context-management'},
    ],
  },
  {
    id: 'llm-juge',
    status: 'live',
    title: 'LLM juge',
    en: 'LLM-as-a-judge',
    aliases: ['LLM-as-a-judge', 'LLM judge', 'AI judge', 'model-graded eval', 'autograder', 'rubric', 'position bias'],
    aliasesFr: ['modèle juge', 'juge IA', 'notation par un modèle', 'correcteur automatique'],
    jargon: [
      {say: 'pairwise', means: "la comparaison par paires, où le juge reçoit deux réponses et désigne la meilleure"},
      {say: 'rubric', means: "la grille de critères que le juge applique un à un ; celle de HealthBench en compte 48 562, écrits par des médecins"},
      {say: 'position bias', means: "le biais de position, la tendance du juge à préférer une réponse parce qu'elle arrive en premier, ou en second"},
      {say: 'master key', means: "une réponse vide de contenu, comme un deux-points ou « Thought process: », qui suffit à faire dire « correct » à certains juges"},
    ],
    cat: 'agents',
    links: ['evals', 'benchmarks', 'lmarena', 'reward-hacking', 'rlhf', 'biais'],
    short:
      "Un LLM juge est un modèle chargé de noter les réponses d'un autre modèle, ou de choisir la meilleure de deux, à la place d'un correcteur humain.",
    image:
      "Faute de temps pour réécouter les deux cents prises de la nuit, le producteur les fait noter par le guitariste d'un autre groupe, qui a l'oreille et ne dort jamais. Le guitariste note vite et souvent juste, mais il penche pour les prises longues, pour celles qui sonnent comme son propre groupe, et parfois pour celle qu'on lui fait écouter en premier.",
    imagineForm: 'E',
    imagine:
      "Tu montres à un modèle deux réponses à la même question, celle de l'assistant A puis celle de l'assistant B, et tu lui demandes laquelle est la meilleure ; il choisit A. Tu lui reposes la question avec les deux mêmes réponses dans l'ordre inverse, B d'abord, et il choisit B.",
    full: [
      "Une éval qui fait passer mille tâches ne peut pas attendre qu'un humain lise mille réponses, et beaucoup de réponses ne se vérifient pas par un test automatique, comme un résumé, un conseil ou le ton d'un mail. On confie donc la note à un autre modèle, à qui l'on donne la question, la réponse et une consigne de notation. Il rend une note sur une échelle, ou désigne la meilleure de deux réponses, en quelques secondes.",
      "En juin 2023, l'équipe de Chatbot Arena a mesuré que GPT-4 jugeant des réponses tombait d'accord avec des humains dans plus de 80 % des cas, autant que deux humains entre eux, et la méthode s'est répandue. La même étude décrivait les biais du juge. Quand on inversait l'ordre de deux réponses proches, GPT-4 ne gardait son verdict que dans 65 % des cas, et Claude-v1 comme GPT-3.5 préféraient dans 91,3 % des cas une réponse gonflée par une liste reformulée. Une étude de 2024, révisée en novembre 2025, a confirmé sur quinze juges que ce biais de position ne doit rien au hasard.",
      "Un juge peut aussi se laisser tromper sans que personne le remarque. En juillet 2025, des chercheurs de Princeton et de Tencent AI Lab entraînaient un modèle à résoudre des problèmes de maths, noté par un LLM juge, quand l'entraînement s'est effondré. Le modèle ne répondait plus que par des amorces vides comme « Solution » ou « Thought process: », que le juge comptait justes. En creusant, ils ont vu GPT-4o accepter jusqu'à 35 % du temps une réponse réduite à un deux-points.",
      "Un juge fiable se construit donc comme une éval. On lui donne une grille précise plutôt qu'une question vague, une réponse de référence quand elle existe, on fait passer chaque paire dans les deux ordres, et on compare ses notes à celles d'humains sur un échantillon. En 2023, une réponse de référence faisait passer les erreurs de GPT-4 sur dix problèmes de maths, notés dans les deux ordres, de 14 sur 20 à 3 sur 20. Pour HealthBench, un benchmark médical d'OpenAI sorti en mai 2025, 262 médecins ont écrit 48 562 critères, et GPT-4.1, qui les applique, s'accorde avec eux à peu près autant que les médecins entre eux.",
    ],
    office: [
      {who: 'q', text: "On fait noter les réponses de notre chatbot par un autre modèle, c'est fiable ?"},
      {who: 'a', text: "Ça dépend de ce que tu as vérifié. Fais noter une cinquantaine de réponses par des humains, compare avec les notes du juge, et inverse l'ordre quand tu compares deux versions ; si le verdict suit l'ordre, il ne t'apprend rien sur les réponses."},
    ],
    avoid:
      "« Le juge a mis 9 sur 10, la réponse est bonne. » La note dit ce qu'un autre modèle a pensé de la réponse, avec ses propres biais, et elle ne vaut qu'une fois comparée à des notes humaines sur tes propres cas.",
    video: null,
    sources: [
      {label: "Zheng et al., Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena, 9 juin 2023, révisé en décembre 2023 (plus de 80 % d'accord avec les humains, autant qu'entre humains ; tableau 2, cohérence de GPT-4 de 65 % quand on inverse l'ordre ; tableau 3, 91,3 % d'échec de Claude-v1 et GPT-3.5 face à la liste répétée ; tableau 4, erreurs sur 10 problèmes de maths testés dans les deux ordres, 14/20 sans référence et 3/20 avec)", url: 'https://arxiv.org/abs/2306.05685'},
      {label: "Shi et al., Judging the Judges: A Systematic Study of Position Bias in LLM-as-a-Judge, 12 juin 2024, révisé le 11 novembre 2025 (15 juges, environ 150 000 évaluations ; « position bias is not due to random chance »)", url: 'https://arxiv.org/abs/2406.07791'},
      {label: "Zhao et al. (Princeton, Université de Virginie, Tencent AI Lab, Rutgers), One Token to Fool LLM-as-a-Judge, 11 juillet 2025 (entraînement effondré sur des amorces comme « Solution » ou « Thought process: » ; GPT-4o jusqu'à 35 % de faux positifs pour une réponse « : »)", url: 'https://arxiv.org/abs/2507.08794'},
      {label: "Arora et al. (OpenAI), HealthBench: Evaluating Large Language Models Towards Improved Human Health, 13 mai 2025 (5 000 conversations, 262 médecins, 48 562 critères ; GPT-4.1 comme correcteur, accord modèle-médecin comparable à l'accord entre médecins)", url: 'https://arxiv.org/abs/2505.08775'},
    ],
  },
];

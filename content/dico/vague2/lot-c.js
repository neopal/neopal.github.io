// Lexique IA, vague 2, lot C (agents). Fiches au format de lexique/terms.js, sans num.
// imagineForm : forme de l'« Imagine » (A à E, voir content/dico/univers.md).
module.exports = [
  {
    id: 'agent',
    status: 'live',
    title: 'Agent',
    en: 'AI agent',
    aliases: ['agents', 'agentic', 'agentic AI', 'coding agent'],
    aliasesFr: ['agent IA'],
    jargon: [
      {say: 'agentique', means: "se dit d'un outil où le modèle enchaîne lui-même plusieurs actions (lire, chercher, modifier, lancer) au lieu de répondre en un seul message"},
      {say: 'coding agent', means: "un agent qui travaille dans ton code : il lit les fichiers, les modifie, lance les tests et recommence ; Claude Code, Codex et Cursor en sont des exemples"},
      {say: 'workflow', means: "un enchaînement d'étapes écrit à l'avance par un développeur, même s'il appelle un modèle à plusieurs endroits ; le chemin ne change pas en cours de route"},
      {say: 'human-in-the-loop', means: "un humain valide certaines actions avant qu'elles partent, par exemple chaque commande lancée ou chaque e-mail envoyé"},
    ],
    cat: 'agents',
    links: ['harness', 'boucle-agent', 'tool-use', 'prompt-injection', 'rag', 'mythe-agent-autonome'],
    solutions: [
      {name: 'Claude Code', kind: 'agent de code', url: 'https://code.claude.com/docs/en/overview'},
      {name: 'Codex', kind: 'agent de code', url: 'https://developers.openai.com/codex'},
      {name: 'Cursor', kind: 'éditeur de code avec agent', url: 'https://cursor.com/'},
      {name: 'Gemini CLI', kind: 'agent open source', url: 'https://geminicli.com'},
      {name: 'OpenHands', kind: 'agent open source', url: 'https://github.com/OpenHands/OpenHands'},
      {name: 'Goose', kind: 'agent open source', url: 'https://block.github.io/goose/'},
    ],
    short:
      "Un agent est un modèle de langage qu'on laisse agir : on lui donne un objectif et des outils, et il enchaîne lui-même les actions, en regardant le résultat de chacune pour choisir la suivante, jusqu'à ce que la tâche soit finie.",
    image:
      "Envoie le groupe en tournée avec ses roadies et leurs caisses à outils, et tu as un agent. En studio, il jouait le morceau qu'on lui demandait ; sur la route, il décide de l'étape suivante, demande aux roadies de monter la scène ou d'appeler la salle, écoute ce que ça donne et choisit la suite. L'image triche sur un point, puisque le groupe ne porte jamais rien lui-même et ne fait qu'annoncer ce qu'il veut voir fait.",
    imagine:
      "Le 22 mai 2025, Anthropic a raconté que Rakuten avait confié à Claude Opus 4 la refonte d'un projet open source, et que le modèle y avait travaillé seul pendant 7 heures d'affilée. Sept heures, c'est la journée moyenne d'un temps plein en France, 35 heures par semaine réparties sur cinq jours ; arrivé à 9 heures, il aurait rendu sa copie à 16 heures, sans pause café ni déjeuner.",
    imagineForm: 'A',
    full: [
      "Un agent est un modèle de langage placé dans une boucle, avec des outils. On lui donne un objectif, par exemple « trouve-moi un train pour Lyon jeudi et mets-le dans mon agenda ». Il choisit une action, comme chercher les horaires, lit le résultat, puis choisit la suivante, jusqu'à ce qu'il juge la tâche finie ou qu'une limite l'arrête. Ces actions, ce sont les programmes autour de lui qui les exécutent, à partir des demandes qu'il écrit.",
      "Pour savoir si un outil est vraiment un agent, demande-toi qui choisit l'étape suivante. Anthropic a posé la distinction en décembre 2024 : dans un workflow, un développeur écrit les étapes à l'avance, même si un modèle intervient à chacune ; dans un agent, le modèle décide en cours de route de ses actions et de ses outils. Le chatbot d'entreprise qui cherche toujours dans la même base avant de répondre reste donc un workflow, alors que l'assistant qui relance de lui-même une recherche quand la première ne donne rien penche du côté de l'agent.",
      "Les agents les plus utilisés en 2026 travaillent dans le code. Claude Code est sorti chez Anthropic en février 2025, Codex chez OpenAI en avril 2025, et Codex comptait plus de 2 millions d'utilisateurs par semaine en mars 2026 ; Cursor joue dans la même catégorie. Tous lisent les fichiers d'un projet, les modifient, lancent les tests et recommencent tant que les tests échouent.",
    ],
    then:
      "En décembre 2024, Anthropic publiait encore un guide pour expliquer ce qui distingue un agent d'un workflow. En 2025, les agents sont entrés dans le travail quotidien des développeurs avec Claude Code et Codex. En janvier 2026, Anthropic a lancé Claude Cowork, le même principe pour les non-développeurs, qui range des dossiers ou produit des documents à partir des fichiers de ton ordinateur.",
    office: [
      {who: 'q', text: "On peut le laisser trier le drive partagé tout seul ?"},
      {who: 'a', text: "Donne-lui une copie, ou garde la main sur les suppressions. En février 2026, un utilisateur a demandé à Claude Cowork de ranger un ordinateur, et l'agent a effacé près de quinze ans de photos de famille, récupérées grâce à une restauration iCloud."},
    ],
    avoid:
      "« L'agent a cliqué sur le bouton. » Le modèle a écrit une demande d'action, et c'est le programme autour de lui qui a cliqué, avec les droits qu'on lui a donnés. C'est donc à cet endroit que se règle ce qu'un agent a le droit de faire.",
    video: null,
    sources: [
      {label: 'Anthropic, Building effective agents, 19 décembre 2024 (workflows contre agents)', url: 'https://www.anthropic.com/engineering/building-effective-agents'},
      {label: "Anthropic, Introducing Claude 4, 22 mai 2025 (Rakuten, refonte open source menée seule pendant 7 heures ; Claude Code disponible pour tous). Calcul de l'Imagine : 35 heures / 5 jours = 7 heures ; 9 h + 7 h = 16 h", url: 'https://www.anthropic.com/news/claude-4'},
      {label: 'Service-public.fr, durée légale du travail : 35 heures par semaine', url: 'https://www.service-public.fr/particuliers/vosdroits/F1911'},
      {label: 'Wikipédia, Claude (Claude Code sorti en février 2025, Claude Cowork en janvier 2026)', url: 'https://en.wikipedia.org/wiki/Claude_(AI)'},
      {label: "Wikipédia, OpenAI Codex (Codex CLI le 16 avril 2025, plus de 2 millions d'utilisateurs hebdomadaires en mars 2026)", url: 'https://en.wikipedia.org/wiki/OpenAI_Codex'},
      {label: 'Futurism, 13 février 2026 : Claude Cowork efface le dossier de photos de famille, restauré depuis iCloud', url: 'https://futurism.com/artificial-intelligence/claude-wife-photos'},
    ],
  },
  {
    id: 'harness',
    status: 'live',
    title: 'Harness',
    en: 'Agent harness',
    aliases: ['agentic harness', 'scaffolding', 'agent scaffold'],
    aliasesFr: ['harnais'],
    jargon: [
      {say: 'agentic harness', means: "le terme qu'emploie la documentation de Claude Code pour la couche qui entoure le modèle, lui fournit ses outils et gère ce qu'il voit"},
      {say: 'scaffolding', means: "l'échafaudage, un synonyme courant de harness dans les articles de recherche et les benchmarks"},
      {say: 'hooks', means: "des scripts que le harness lance tout seul à des moments précis, par exemple juste avant un appel d'outil, qu'ils peuvent bloquer, ou juste après"},
      {say: 'permission mode', means: "le réglage qui dit ce que l'agent peut faire sans demander : tout valider à la main, accepter les modifications de fichiers, ou laisser un filtre bloquer les actions risquées"},
    ],
    cat: 'agents',
    links: ['agent', 'boucle-agent', 'tool-use', 'system-prompt', 'context-engineering', 'mcp'],
    short:
      "Le harness est tout le logiciel qui entoure un modèle pour en faire un agent : les outils qu'il peut appeler, les consignes qu'il reçoit, la gestion de ce qu'il a sous les yeux et les règles sur ce qu'il a le droit de faire.",
    image:
      "Tout ce qui reste du studio quand le groupe en sort forme le harness : la régie, les câbles, les micros, la bande qu'on rembobine, la porte de la cabine qui ne s'ouvre qu'avec un badge. Le producteur et sa consigne en font partie, mais le harness désigne le bâtiment entier, et deux studios ne tirent jamais le même son du même groupe.",
    imagine:
      "Avant, GPT-5.5 passe Terminal-Bench 2.1, une série de tâches à mener seul dans un terminal, à l'intérieur de Terminus 2, le harness des auteurs du benchmark, et en réussit 78 %. Après, le même modèle refait les mêmes tâches dans Codex CLI, le harness d'OpenAI, et en réussit 83,1 %.",
    imagineForm: 'E',
    full: [
      "Pour faire d'un modèle un agent, il faut un programme autour de lui, qu'on appelle le harness. Celui-ci envoie au modèle ses consignes et la liste des outils disponibles, exécute les actions demandées, renvoie les résultats, décide de ce qui reste dans la fenêtre de contexte quand elle se remplit, et bloque ce que l'utilisateur n'a pas autorisé.",
      "Claude Code, Codex et Gemini CLI sont des harness, et la documentation de Claude Code le dit en toutes lettres en le présentant comme la couche qui fournit les outils et gère le contexte du modèle. Sur le classement de Terminal-Bench 2.1, chaque ligne nomme d'ailleurs deux choses, le modèle et l'agent qui l'entoure. Le harness maison ne gagne pas toujours, puisque Gemini 3 Pro réussit 65,8 % des tâches dans Gemini CLI, celui de Google, et 73,9 % dans Terminus 2.",
      "Le harness compte d'autant plus que la tâche est longue. En novembre 2025, Anthropic a décrit comment faire avancer un agent sur plusieurs sessions qui repartent chacune sans mémoire. Le harness lui fait tenir un fichier de progression, une liste de plus de 200 fonctionnalités à cocher et un historique git, qu'il relit à chaque reprise.",
    ],
    office: [
      {who: 'q', text: "On a testé le même modèle dans deux outils, et l'un fait nettement mieux. Lequel a le meilleur modèle ?"},
      {who: 'a', text: "Ni l'un ni l'autre, puisque c'est le même ; tu as comparé deux harness, qui n'ont pas les mêmes outils, les mêmes consignes ni la même façon de gérer le contexte."},
    ],
    avoid:
      "« Claude Code est un modèle. » Claude Code est un harness qui fait tourner les modèles Claude ; quand son comportement change du jour au lendemain, regarde d'abord si c'est le modèle ou l'outil qui a été mis à jour.",
    video: null,
    sources: [
      {label: "Claude Code, documentation How Claude Code works (couche autour du modèle appelée agentic harness, modes de permission, hooks)", url: 'https://code.claude.com/docs/en/how-claude-code-works'},
      {label: "Claude Code, référence des hooks (PreToolUse avant un appel d'outil, qui peut le bloquer ; PostToolUse après)", url: 'https://code.claude.com/docs/en/hooks'},
      {label: 'Snorkel, classement Terminal-Bench 2.1, consulté le 2 octobre 2026 : Gemini 3 Pro 65,8 % (Gemini CLI) et 73,9 % (Terminus 2) ; GPT-5.5 83,1 % (Codex CLI) et 78 % (Terminus 2)', url: 'https://snorkel.ai/leaderboard/terminal-bench-2-1/'},
      {label: 'Anthropic, Effective harnesses for long-running agents, 26 novembre 2025 (fichier de progression, plus de 200 fonctionnalités, git)', url: 'https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents'},
    ],
  },
  {
    id: 'boucle-agent',
    status: 'live',
    title: 'Boucle agent',
    en: 'Agent loop',
    aliases: ['agentic loop', 'ReAct', 'tool loop'],
    aliasesFr: ['boucle agentique'],
    jargon: [
      {say: 'ReAct', means: "Reason + Act, la méthode publiée en octobre 2022 qui fait alterner au modèle un bout de raisonnement, une action et l'observation de son résultat"},
      {say: 'gather context, take action, verify results', means: "les trois phases de la boucle de Claude Code selon sa documentation : réunir le contexte, agir, vérifier le résultat"},
      {say: 'max iterations', means: "le nombre maximal de tours que le harness autorise avant de couper la boucle, pour qu'un agent ne tourne pas indéfiniment"},
      {say: 'stop_reason: tool_use', means: "chez Anthropic, l'indication que la réponse du modèle est une demande d'outil ; le programme l'exécute, renvoie le résultat, et la boucle repart"},
    ],
    cat: 'agents',
    links: ['agent', 'harness', 'tool-use', 'context-engineering', 'fenetre-de-contexte', 'cout-d-une-requete'],
    short:
      "La boucle agent est le cycle qui fait travailler un agent : le modèle choisit une action, le programme l'exécute, le résultat est ajouté à la conversation, et le modèle relit le tout pour choisir l'action suivante, jusqu'à ce qu'il annonce avoir fini.",
    image:
      "Une séance d'enregistrement ordinaire avance par prises, où le groupe joue, écoute en cabine, repère la mesure qui accroche et rejoue. La boucle agent suit ce rythme, avec une différence qui coûte cher, puisque chaque écoute s'ajoute à la bande et qu'au vingtième passage le groupe réentend les dix-neuf prises précédentes avant de jouer.",
    imagine:
      "Joue toi-même le rôle du harness. Demande à ton assistant une formule de tableur qui compte les lignes d'une colonne contenant « payé », colle-la dans ton tableur, puis recopie-lui ce qui s'affiche, message d'erreur compris. Recommence jusqu'à ce que le chiffre soit juste ; chacun de tes allers-retours au copier-coller est un tour de boucle, qu'un agent enchaîne seul.",
    imagineForm: 'B',
    full: [
      "La boucle tient en quatre temps. (1) Le harness envoie au modèle la conversation et la liste des outils. (2) Le modèle répond par une demande d'outil, par exemple « cherche les trains Paris-Lyon de jeudi ». (3) Le harness exécute la demande et ajoute le résultat à la conversation. (4) Le modèle relit tout et choisit soit un nouvel outil, et la boucle repart, soit une réponse finale, et elle s'arrête.",
      "L'idée vient de la recherche. En octobre 2022, l'article ReAct (Yao et al.) a montré qu'un modèle réussit mieux quand il alterne un bout de raisonnement, une action et l'observation du résultat. La documentation de Claude Code décrit aujourd'hui des boucles de dizaines d'actions, comme lancer les tests, lire l'erreur, ouvrir le fichier fautif, le corriger et relancer les tests.",
      "Chaque tour se paie, parce que le modèle relit toute la conversation, résultats d'outils compris, à chaque passage. Une boucle longue remplit donc la fenêtre de contexte et la facture, et les harness fixent pour cette raison un nombre maximal de tours et résument l'historique quand la fenêtre approche de sa limite.",
    ],
    then:
      "En octobre 2022, ReAct était une technique de recherche, testée sur des questions, de la vérification de faits et des tâches de décision simulées. En 2026, la même boucle fait tourner Claude Code, Codex et Gemini CLI. Dès le lancement de Codex dans le cloud, en mai 2025, une tâche durait le plus souvent entre 1 et 30 minutes, avec le journal des commandes lancées et le résultat des tests pour vérifier le travail.",
    office: [
      {who: 'q', text: "Il tourne en rond depuis vingt minutes sur le même test."},
      {who: 'a', text: "Arrête-le et relis les derniers tours : il relance sans doute la même correction parce que l'erreur renvoyée ne lui apprend rien. Donne-lui l'information qui manque, ou découpe la tâche en plus petit."},
    ],
    avoid:
      "« L'agent réfléchit depuis dix minutes. » Il fait surtout des tours de boucle, et chaque tour est un nouvel appel au modèle, payé en tokens, suivi d'une action réelle sur tes fichiers ou tes comptes.",
    video: null,
    sources: [
      {label: 'Yao et al., ReAct: Synergizing Reasoning and Acting in Language Models, 6 octobre 2022', url: 'https://arxiv.org/abs/2210.03629'},
      {label: 'Claude Code, documentation How Claude Code works (trois phases, dizaines d\'actions, résumé automatique quand la fenêtre se remplit)', url: 'https://code.claude.com/docs/en/how-claude-code-works'},
      {label: "Anthropic, Building effective agents, 19 décembre 2024 (conditions d'arrêt, nombre maximal d'itérations)", url: 'https://www.anthropic.com/engineering/building-effective-agents'},
      {label: 'Anthropic, documentation Tool use (stop_reason tool_use, tool_result)', url: 'https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview'},
      {label: 'Wikipédia, OpenAI Codex (tâches de 1 à 30 minutes, journaux de commandes et résultats de tests)', url: 'https://en.wikipedia.org/wiki/OpenAI_Codex'},
    ],
  },
  {
    id: 'tool-use',
    status: 'live',
    title: 'Tool use',
    en: 'Tool use',
    aliases: ['function calling', 'tool calling', 'tools'],
    aliasesFr: ["appel d'outil", "utilisation d'outils"],
    jargon: [
      {say: 'function calling', means: "le nom qu'OpenAI a donné en 2023 au même mécanisme ; on dit aussi tool calling"},
      {say: 'tool_use, tool_result', means: "chez Anthropic, le bloc où le modèle écrit son appel d'outil, puis celui où le programme lui renvoie le résultat"},
      {say: 'schema', means: "la description d'un outil en JSON, avec son nom, ce qu'il fait et les paramètres qu'il attend ; le modèle ne connaît l'outil que par elle"},
      {say: 'server tools', means: "les outils que le fournisseur exécute lui-même, comme la recherche web chez Anthropic, par opposition à ceux que ton application exécute"},
    ],
    cat: 'agents',
    links: ['agent', 'boucle-agent', 'mcp', 'prompt-injection', 'harness', 'skill'],
    short:
      "Le tool use permet à un modèle de demander l'exécution d'un outil (chercher sur le web, lire un fichier, envoyer un e-mail) : il écrit un appel structuré avec le nom de l'outil et ses paramètres, puis un programme l'exécute et lui renvoie le résultat.",
    image:
      "Quand le chanteur veut plus de retour dans son casque, il ne quitte pas le micro pour aller tourner le bouton ; il le demande, et un roadie s'en charge. Le tool use correspond à cette demande, et tant qu'aucun roadie ne l'entend, rien ne bouge sur scène.",
    imagine:
      "Dans une démo où l'outil de réservation est décrit au modèle sans être branché, tu écris : « Réserve-moi le train de 8 h 04 pour Lyon jeudi. » Le modèle te répond, très sûr de lui : « Voici ma demande : reserver_train(destination: Lyon, jour: jeudi, heure: 8 h 04). »",
    imagineForm: 'D',
    full: [
      "Un modèle ne sait produire que du texte. Pour lui donner prise sur le monde, on lui décrit des outils dans sa requête, avec pour chacun un nom, une description et des paramètres. Quand il juge qu'un outil l'aide, il répond par un appel structuré au lieu d'une phrase ; le programme qui l'entoure exécute l'appel et renvoie le résultat, que le modèle lit avant de continuer.",
      "Le modèle décide d'appeler un outil uniquement d'après sa description. Une description vague donne des appels au mauvais moment, ou pas d'appel du tout ; la documentation d'Anthropic note qu'avec un outil météo qui exige une ville, un modèle à qui on n'en donne pas peut en inventer une plutôt que de la demander.",
      "Les outils prennent aussi de la place. Leurs descriptions sont envoyées à chaque requête et comptées en tokens d'entrée, et chez Anthropic l'activation des outils ajoute en plus quelques centaines de tokens de consignes, 286 pour Claude Opus 5.5.",
    ],
    then:
      "En 2023, OpenAI lançait le function calling, et chaque application décrivait ses outils dans le format d'un seul fournisseur. En 2026, les fournisseurs exécutent eux-mêmes une partie des outils, comme la recherche web, et un modèle peut piocher dans des milliers d'outils qu'il ne charge qu'au moment de s'en servir.",
    office: [
      {who: 'q', text: "Le chatbot dit qu'il a envoyé le devis au client. Le client ne l'a jamais reçu."},
      {who: 'a', text: "Regarde les journaux : si l'outil d'envoi n'a pas été appelé, ou s'il a renvoyé une erreur que le modèle a ignorée, le chatbot a raconté un envoi qui n'a jamais eu lieu."},
    ],
    avoid:
      "« Il est connecté à Internet. » Le modèle a accès aux outils qu'on lui a décrits, et seulement à ceux-là ; sans outil de recherche web, il répond de mémoire.",
    video: null,
    sources: [
      {label: "Anthropic, documentation Tool use (client tools et server tools, ville inventée faute de paramètre, 286 tokens de consignes pour Claude Opus 5.5, outil de recherche parmi des milliers d'outils)", url: 'https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview'},
      {label: "Wikipédia, Model Context Protocol (function calling d'OpenAI en 2023, propre à un fournisseur)", url: 'https://en.wikipedia.org/wiki/Model_Context_Protocol'},
    ],
  },
  {
    id: 'mcp',
    status: 'live',
    title: 'MCP',
    en: 'Model Context Protocol',
    aliases: ['MCP server', 'MCP client', 'MCP host'],
    aliasesFr: ['protocole MCP', 'serveur MCP'],
    jargon: [
      {say: 'serveur MCP', means: "le programme qui expose un service (Google Drive, GitHub, une base de données) aux agents, avec la liste de ses outils et leur mode d'emploi"},
      {say: 'hôte, client', means: "l'hôte est l'application qui fait tourner le modèle (Claude, ChatGPT, Cursor) ; elle ouvre un client pour chaque serveur MCP auquel elle se branche"},
      {say: 'tools, resources, prompts', means: "les trois choses qu'un serveur peut offrir selon la spécification : des actions à exécuter, des données à lire et des modèles de consignes"},
      {say: 'JSON-RPC', means: "le format de messages, standard et antérieur à MCP, dans lequel l'hôte et le serveur se parlent"},
    ],
    cat: 'agents',
    links: ['tool-use', 'skill', 'prompt-injection', 'harness', 'context-engineering'],
    solutions: [
      {name: 'MCP Registry', kind: 'annuaire officiel de serveurs', url: 'https://registry.modelcontextprotocol.io/'},
      {name: 'Serveurs de référence MCP', kind: 'bibliothèque open source', url: 'https://github.com/modelcontextprotocol/servers'},
      {name: 'GitHub MCP Server', kind: "serveur officiel d'un éditeur", url: 'https://github.com/github/github-mcp-server'},
    ],
    short:
      "MCP (Model Context Protocol) est un standard ouvert qui définit comment une application d'IA se branche sur un outil ou une source de données ; on écrit le connecteur une fois, et tous les assistants compatibles peuvent s'en servir.",
    image:
      "MCP joue dans le studio le rôle de la prise jack : n'importe quelle guitare entre dans n'importe quel ampli, parce que tout le monde a adopté le même trou. L'image a sa limite, puisqu'une prise standard ne dit rien de ce qui passe dans le câble, et rien n'empêche d'y brancher une pédale trafiquée.",
    imagine:
      "Prends les cinq applications que cite Anthropic en décembre 2025 (ChatGPT, Cursor, Gemini, Microsoft Copilot et VS Code), ajoute Claude, et mets en face les plus de 10 000 serveurs MCP publics recensés au même moment. Sans prise commune, il faudrait souder 60 000 câbles sur mesure, un par paire ; avec MCP, chaque application et chaque serveur ont leur prise, et 10 006 pièces suffisent.",
    imagineForm: 'A',
    full: [
      "Avant MCP, chaque assistant écrivait son propre connecteur pour chaque service, un pour Google Drive dans tel outil, un autre pour Google Drive dans tel autre. Anthropic a publié MCP le 25 novembre 2024 pour remplacer ces intégrations sur mesure par un seul protocole, inspiré du Language Server Protocol, la norme qui permet aux éditeurs de code de prendre en charge n'importe quel langage de programmation.",
      "Un serveur MCP annonce ce qu'il sait faire, avec pour chaque outil une description en langage courant et le format attendu. L'application transmet ces descriptions au modèle ; quand le modèle demande l'un de ces outils, l'application relaie l'appel au serveur, qui exécute l'action et renvoie le résultat. Le mécanisme reste celui du tool use, avec une prise commune entre l'application et le serveur.",
      "Brancher un serveur revient à donner au modèle de nouveaux outils et de nouveaux textes à lire, avec les risques qui vont avec. En mai 2025, Invariant Labs a montré qu'une issue piégée, déposée sur un dépôt GitHub public, pouvait pousser un agent branché sur le serveur MCP officiel de GitHub à recopier des dépôts privés dans un dépôt public, sans le moindre bug dans le serveur.",
    ],
    then:
      "À sa sortie, en novembre 2024, MCP venait avec six serveurs d'exemple, dont Google Drive, Slack et GitHub. OpenAI l'a adopté en mars 2025 et Google en avril ; en décembre 2025, Anthropic l'a confié à l'Agentic AI Foundation, créée avec OpenAI et Block sous l'égide de la Linux Foundation, alors que ses kits de développement dépassaient 97 millions de téléchargements par mois.",
    office: [
      {who: 'q', text: "Le service informatique demande si on peut brancher le serveur MCP d'un éditeur trouvé sur GitHub."},
      {who: 'a', text: "Traite-le comme n'importe quel logiciel tiers : lis les outils qu'il expose, donne-lui les droits minimum, et garde une validation humaine sur tout ce qui écrit ou envoie quelque chose."},
    ],
    avoid:
      "« MCP, c'est une IA. » MCP est une norme de branchement, un peu comme l'USB ; elle ne contient aucun modèle et ne rend aucun assistant plus malin, elle lui donne accès à plus d'outils.",
    video: null,
    sources: [
      {label: 'Anthropic, Introducing the Model Context Protocol, 25 novembre 2024 (standard ouvert, six serveurs d\'exemple)', url: 'https://www.anthropic.com/news/model-context-protocol'},
      {label: "Anthropic, don de MCP à l'Agentic AI Foundation, 9 décembre 2025 (plus de 10 000 serveurs publics actifs, adoption par ChatGPT, Cursor, Gemini, Microsoft Copilot et VS Code, 97 millions de téléchargements mensuels). Calcul de l'Imagine : 5 applications citées + Claude = 6 ; 6 x 10 000 = 60 000 connecteurs sur mesure ; 6 + 10 000 = 10 006 prises", url: 'https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation'},
      {label: 'Wikipédia, Model Context Protocol (adoption par OpenAI en mars 2025 et par Google en avril 2025)', url: 'https://en.wikipedia.org/wiki/Model_Context_Protocol'},
      {label: 'Spécification MCP, version 2026-07-28 (JSON-RPC 2.0, tools, resources, prompts, inspiration du Language Server Protocol)', url: 'https://modelcontextprotocol.io/specification/latest'},
      {label: 'Invariant Labs, GitHub MCP Exploited, 26 mai 2025', url: 'https://invariantlabs.ai/blog/mcp-github-vulnerability'},
    ],
  },
  {
    id: 'skill',
    status: 'live',
    title: 'Skill',
    en: 'Agent Skill',
    aliases: ['skills', 'Agent Skills', 'SKILL.md'],
    aliasesFr: ['compétence'],
    jargon: [
      {say: 'SKILL.md', means: "le seul fichier obligatoire d'un skill : en tête, un nom et une description ; en dessous, les instructions"},
      {say: 'progressive disclosure', means: "le chargement par étages : l'agent ne voit d'abord que le nom et la description de chaque skill, lit les instructions quand une tâche correspond, et n'ouvre les fichiers annexes que s'il en a besoin"},
      {say: '/nom-du-skill', means: "dans Claude Code et d'autres agents, la commande qui lance un skill à la main au lieu d'attendre que l'agent le choisisse"},
    ],
    cat: 'agents',
    links: ['mcp', 'system-prompt', 'context-engineering', 'tool-use', 'fenetre-de-contexte'],
    short:
      "Un skill est un dossier d'instructions, parfois accompagnées de scripts ou de modèles de documents, qu'un agent garde sous la main et n'ouvre que lorsque la tâche en cours correspond à sa description.",
    image:
      "Range dans la flight case une fiche technique par morceau du répertoire, avec les accords, le tempo et le réglage de la pédale du solo. Le groupe ne lit au départ que les titres collés sur les pochettes, et ne sort la fiche entière qu'au moment de jouer le morceau ; c'est ce qui lui permet d'en transporter des centaines sans encombrer la scène.",
    imagine:
      "Avant, tu demandes à ton agent de transformer le compte rendu de la réunion en slides, et il te rend un deck propre, aux couleurs par défaut, avec des titres en capitales que ta boîte n'utilise jamais. Après, tu as ajouté à ses skills un dossier « charte-slides » avec les couleurs, la police et trois exemples de titres, et la même demande sort aux couleurs de la boîte.",
    imagineForm: 'E',
    full: [
      "Anthropic a lancé les Agent Skills le 16 octobre 2025. Un skill est un dossier qui contient au minimum un fichier SKILL.md, avec un nom, une description et des instructions, auxquels on peut ajouter des scripts, de la documentation ou des gabarits. Anthropic les compare au livret d'accueil qu'on remet à une nouvelle recrue.",
      "Tout l'intérêt tient au chargement par étages. Au démarrage, l'agent ne lit que le nom et la description de chaque skill ; quand une demande correspond, il lit les instructions complètes, puis ouvre les fichiers annexes seulement s'il en a besoin. Dans Claude Code, la liste des descriptions a droit à 1 % de la fenêtre de contexte, et chaque description y est coupée à 1 536 caractères.",
      "Un skill ne remplace ni le system prompt ni MCP. Le system prompt est relu à chaque requête, alors qu'un skill n'occupe la fenêtre que lorsqu'il sert. MCP branche l'agent sur un service, et le skill lui apprend une façon de faire, par exemple remplir le modèle de facture de la boîte avec les données que MCP est allé chercher.",
    ],
    then:
      "Les skills sont nés chez Anthropic en octobre 2025, pour Claude. Le 18 décembre 2025, Anthropic en a fait un standard ouvert, et en 2026 le même dossier fonctionne dans Codex, Cursor, Gemini CLI, GitHub Copilot ou VS Code, qui figurent parmi les outils compatibles listés sur le site du standard.",
    office: [
      {who: 'q', text: "Je colle les mêmes consignes de mise en forme dans chaque conversation, c'est normal ?"},
      {who: 'a', text: "C'est le cas d'usage type d'un skill : écris-les une fois dans un dossier, avec une description qui dit quand s'en servir, et l'agent les ouvrira de lui-même quand la demande s'y prête."},
    ],
    avoid:
      "« Le modèle a appris une nouvelle compétence. » Ses paramètres n'ont pas bougé : il a ouvert un dossier et lu des instructions, comme une recrue qui consulte la procédure, et il devra le rouvrir à la prochaine conversation.",
    video: null,
    sources: [
      {label: 'Anthropic, Introducing Agent Skills, 16 octobre 2025, mis à jour le 18 décembre 2025 (standard ouvert)', url: 'https://claude.com/blog/skills'},
      {label: "Anthropic, Equipping agents for the real world with Agent Skills, 16 octobre 2025 (SKILL.md, chargement par étages, livret d'accueil d'une recrue)", url: 'https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills'},
      {label: 'Agent Skills, site du standard ouvert (format, liste des outils compatibles dont Codex, Cursor, Gemini CLI, GitHub Copilot et VS Code)', url: 'https://agentskills.io/'},
      {label: "Claude Code, documentation Skills (budget de 1 % de la fenêtre pour la liste, 1 536 caractères par description, consignes qu'on recolle à chaque conversation)", url: 'https://code.claude.com/docs/en/skills'},
    ],
  },
  {
    id: 'system-prompt',
    status: 'live',
    title: 'System prompt',
    en: 'System prompt',
    aliases: ['system message', 'system instructions', 'instructions'],
    aliasesFr: ['prompt système', 'consigne système'],
    jargon: [
      {say: 'system, user, assistant', means: "les trois rôles d'une conversation envoyée à un modèle : les consignes de l'éditeur, tes messages, et les réponses du modèle"},
      {say: 'leak du system prompt', means: "quand quelqu'un pousse un assistant à recopier ses consignes ; c'est longtemps resté le seul moyen de les lire, faute de publication"},
      {say: 'CLAUDE.md, AGENTS.md', means: "des fichiers placés dans un projet, que les agents de code ajoutent à leurs consignes au début de chaque session"},
    ],
    cat: 'agents',
    links: ['harness', 'prompt-injection', 'context-engineering', 'skill', 'fenetre-de-contexte', 'cout-d-une-requete'],
    short:
      "Le system prompt est le texte de consignes que l'éditeur d'un assistant place avant ta conversation et que le modèle relit à chaque message : qui il est, la date du jour, le ton à prendre, ce qu'il doit refuser.",
    image:
      "Avant la première note, le producteur passe la tête dans la cabine et donne sa consigne pour la session, jouer sobre, pas de solo de plus de huit mesures, aucune reprise de chanson protégée. Le groupe ne la voit écrite nulle part, il l'a dans l'oreille au début de chaque prise, et le public n'en sait rien.",
    imagine:
      "Demande à Claude, sans activer la recherche web : « On est quel jour aujourd'hui ? » Il te répond juste, alors que son entraînement s'est arrêté des mois plus tôt. Personne ne lui a appris la date ; elle est écrite dans le system prompt que l'application remplit avant chacune de tes conversations, et qu'Anthropic publie.",
    imagineForm: 'B',
    full: [
      "Quand tu écris à un assistant, ton message n'arrive jamais seul. L'application le fait précéder d'un system prompt, un texte rédigé par l'éditeur qui fixe l'identité de l'assistant, ses règles et des informations du moment comme la date. Le modèle le reçoit à chaque requête, avant l'historique de la conversation, et c'est en grande partie lui qui explique qu'un même modèle ne se comporte pas pareil d'une application à l'autre.",
      "Anthropic publie depuis août 2024 les system prompts de ses applications, que les éditeurs gardaient jusque-là pour eux. Celui de Claude Opus 5.5, daté du 22 septembre 2026, fait environ 4 100 mots. Il donne la date du jour et la date de coupure des connaissances, présente les produits de la marque, et va jusqu'à demander d'éviter les listes à puces dans une conversation ordinaire.",
      "Le system prompt reste du texte, posé au même endroit que le reste de la conversation, et rien dans le mécanisme ne l'empêche d'être contredit par une consigne glissée plus loin, dans un message ou dans un document. C'est la porte d'entrée des injections de prompt.",
    ],
    then:
      "En juillet 2024, le system prompt de Claude 3.5 Sonnet tenait en un peu moins de 1 000 mots. En septembre 2026, celui de Claude Opus 5.5 en compte environ 4 100, avec entre autres la liste des produits de la marque, des règles de mise en forme et des exemples de cas délicats.",
    office: [
      {who: 'q', text: "Notre chatbot interne tourne sur le même modèle que l'assistant grand public. Pourquoi ils ne répondent pas pareil ?"},
      {who: 'a', text: "Parce qu'ils n'ont ni le même system prompt ni les mêmes outils ; chaque produit donne ses propres consignes au modèle avant ta question."},
    ],
    avoid:
      "« Le system prompt est caché, donc personne ne peut le lire. » Il reste du texte dans la conversation, et des utilisateurs arrivent régulièrement à le faire recopier ; n'y mets aucune information que tu ne publierais pas.",
    video: null,
    sources: [
      {label: "Simon Willison, Anthropic Release Notes: System Prompts, 26 août 2024 (première publication, prompts d'ordinaire gardés secrets ou découverts par des fuites)", url: 'https://simonwillison.net/2024/Aug/26/anthropic-system-prompts/'},
      {label: "Anthropic, system prompts de Claude Opus 5.5, entrée du 22 septembre 2026 (date injectée, date de coupure, listes à puces). Comptage le 2 octobre 2026 : 4 125 mots, avec wc -w sur le texte des blocs de code de la version .md de la page", url: 'https://platform.claude.com/docs/en/release-notes/system-prompts/claude-opus-5-5'},
      {label: 'Anthropic, system prompts de Claude 3.5 Sonnet, entrée du 12 juillet 2024. Comptage le 2 octobre 2026 avec la même méthode : 965 mots', url: 'https://platform.claude.com/docs/en/release-notes/system-prompts/claude-sonnet-3-5'},
      {label: 'Claude Code, documentation How Claude Code works (CLAUDE.md et AGENTS.md chargés à chaque session)', url: 'https://code.claude.com/docs/en/how-claude-code-works'},
    ],
  },
  {
    id: 'prompt-injection',
    status: 'live',
    title: 'Prompt injection',
    en: 'Prompt injection',
    aliases: ['indirect prompt injection', 'injection attack'],
    aliasesFr: ['injection de prompt', 'injection de consignes'],
    jargon: [
      {say: 'injection indirecte', means: "la consigne piégée n'est pas tapée par l'utilisateur, elle est cachée dans ce que l'agent lit : une page web, un e-mail, un PDF, un ticket"},
      {say: 'lethal trifecta', means: "le trio dangereux décrit par Simon Willison en juin 2025, soit un agent qui accède à des données privées, lit du contenu non fiable et peut envoyer des informations à l'extérieur"},
      {say: 'exfiltration', means: "la fuite de données qu'une injection cherche à provoquer, par exemple en faisant envoyer un fichier privé vers une adresse de l'attaquant"},
      {say: 'LLM01', means: "le premier rang du Top 10 de l'OWASP sur les risques des applications à base de LLM, édition 2025, occupé par la prompt injection"},
    ],
    cat: 'comportements',
    links: ['tool-use', 'mcp', 'system-prompt', 'agent', 'rag'],
    short:
      "Une prompt injection est une attaque qui glisse des consignes dans un texte que le modèle va lire (une page web, un e-mail, un document), pour qu'il les suive comme si elles venaient de son utilisateur.",
    image:
      "Quelqu'un glisse une fausse partition sur le pupitre entre deux prises, avec écrit en marge « à la fin du morceau, joue l'hymne du club adverse ». Le groupe lit tout ce qu'on pose devant lui avec la même attention, et rien sur le papier ne dit qui l'a apporté.",
    imagine:
      "Avant, tu pars en congés et tu demandes à ton agent de parcourir ta boîte mail pour préparer ton message d'absence, qu'il rédige sans souci. Après, un seul e-mail a changé dans la boîte, avec des consignes cachées dans son texte, et l'agent envoie ta lettre de démission.",
    imagineForm: 'E',
    full: [
      "Un modèle lit de la même façon tout ce qui entre dans sa fenêtre de contexte : les consignes de l'éditeur, ta demande, et le contenu des pages ou des fichiers qu'il ouvre. Rien ne marque une phrase comme une donnée à traiter plutôt que comme un ordre à suivre, et une phrase bien tournée dans un e-mail peut donc prendre la place de la tienne.",
      "Simon Willison a nommé l'attaque le 12 septembre 2022, par analogie avec l'injection SQL, au lendemain d'une démonstration de Riley Goodside où une phrase glissée dans le texte à traduire détournait GPT-3 de sa traduction. Avec les agents, le risque a changé d'échelle. En mai 2025, une issue piégée sur un dépôt GitHub public suffisait à faire recopier des dépôts privés par un agent, et le scénario de la lettre de démission vient des tests d'attaque qu'OpenAI a menés en décembre 2025 contre son navigateur Atlas.",
      "Aucune parade ne règle le problème entièrement. En août 2025, sur 123 cas de test de son agent pour Chrome, Anthropic a vu ses protections faire passer le taux de réussite des attaques de 23,6 % à 11,2 %. En décembre, OpenAI écrivait que la prompt injection, comme les arnaques en ligne, ne serait sans doute jamais entièrement « résolue ». La défense passe donc aussi par le harness, qui limite les droits de l'agent et fait valider par un humain ce qui envoie, paie ou supprime.",
    ],
    then:
      "En 2022, la prompt injection détournait GPT-3 d'une simple traduction. En 2025 et 2026, elle vise des agents qui lisent tes e-mails, naviguent à ta place et ont accès à tes dépôts de code, et l'OWASP la classe au premier rang des risques des applications à base de LLM dans son édition 2025.",
    office: [
      {who: 'q', text: "On veut que l'agent lise les CV reçus et réponde lui-même aux candidats. Un risque ?"},
      {who: 'a', text: "Un CV peut contenir du texte invisible qui lui donne des ordres. Sépare les rôles, avec un agent qui lit sans pouvoir envoyer, et des réponses validées par quelqu'un avant de partir."},
    ],
    avoid:
      "« On a écrit dans le system prompt d'ignorer les consignes cachées, on est protégés. » Cette phrase réduit le risque sans le supprimer, parce que l'attaque passe par le même canal que la protection. La vraie défense consiste à limiter ce que l'agent peut faire le jour où il se trompe.",
    video: null,
    sources: [
      {label: 'Simon Willison, Prompt injection attacks against GPT-3, 12 septembre 2022 (le nom, l\'analogie avec l\'injection SQL, la démonstration de Riley Goodside sur une traduction)', url: 'https://simonwillison.net/2022/Sep/12/prompt-injection/'},
      {label: 'Simon Willison, The lethal trifecta for AI agents, 16 juin 2025', url: 'https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/'},
      {label: 'Invariant Labs, GitHub MCP Exploited, 26 mai 2025 (issue piégée, fuite de dépôts privés)', url: 'https://invariantlabs.ai/blog/mcp-github-vulnerability'},
      {label: 'Anthropic, Piloting Claude for Chrome, 25 août 2025 (123 cas de test, 23,6 % puis 11,2 % de réussite des attaques)', url: 'https://claude.com/blog/claude-for-chrome'},
      {label: "TechCrunch, OpenAI says AI browsers may always be vulnerable to prompt injection attacks, 22 décembre 2025 (lettre de démission au lieu du message d'absence, « unlikely to ever be fully solved »)", url: 'https://techcrunch.com/2025/12/22/openai-says-ai-browsers-may-always-be-vulnerable-to-prompt-injection-attacks/'},
      {label: 'OWASP, Top 10 for LLM Applications 2025, LLM01 Prompt Injection', url: 'https://genai.owasp.org/llmrisk/llm01-prompt-injection/'},
    ],
  },
  {
    id: 'context-engineering',
    status: 'live',
    title: 'Context engineering',
    en: 'Context engineering',
    aliases: ['context management', 'context window management'],
    aliasesFr: ['ingénierie du contexte'],
    jargon: [
      {say: 'compaction', means: "résumer le début d'une conversation trop longue pour libérer de la place dans la fenêtre, en gardant les décisions prises et les problèmes en cours"},
      {say: 'just-in-time', means: "ne pas tout charger d'avance ; l'agent garde des références (noms de fichiers, liens) et va chercher le contenu au moment où il en a besoin"},
      {say: 'sub-agent', means: "un agent secondaire qui mène une recherche dans sa propre fenêtre et ne rapporte qu'un résumé à l'agent principal"},
      {say: 'attention budget', means: "l'image d'Anthropic pour dire que chaque token ajouté à la fenêtre entame une attention limitée"},
    ],
    cat: 'agents',
    links: ['fenetre-de-contexte', 'rag', 'system-prompt', 'skill', 'harness', 'boucle-agent'],
    short:
      "Le context engineering consiste à choisir ce qu'un modèle a sous les yeux à chaque étape (consignes, documents, historique, résultats d'outils) pour qu'il dispose de ce qui sert à la tâche, et de rien de plus.",
    image:
      "La bande a beau être longue, on ne la remplit pas au hasard. Avant chaque prise, la régie choisit ce qui monte dessus (la consigne du producteur, les deux mesures utiles de la répétition d'hier, la partition du jour) et coupe le bavardage d'avant session. Plus la bande est chargée, moins le groupe entend ce qui compte.",
    imagine:
      "Tu as donné à ton agent un budget de 15 000 euros à 9 heures, puis tu as travaillé avec lui toute la journée. À 18 heures, tu lui demandes : « Quel budget je t'ai donné ce matin ? » Il te répond : « Tu ne m'as donné aucun budget dans cette session. »",
    imagineForm: 'D',
    full: [
      "Le terme s'est répandu en juin 2025 : Tobi Lütke l'a défendu le 19 juin, puis Andrej Karpathy l'a repris le 25 en le préférant à « prompt engineering ». Un prompt évoque une consigne courte, alors qu'une application sérieuse assemble à chaque appel des consignes, des exemples, des documents, des outils et un historique. Karpathy y voit un art et une science, celle de remplir la fenêtre avec exactement ce qui sert à l'étape suivante.",
      "C'est la fenêtre elle-même qui oblige à trier. Plus elle se remplit, moins le modèle exploite bien chaque information, et Anthropic parle d'un budget d'attention que chaque token supplémentaire entame. Un agent qui tourne longtemps accumule pourtant des résultats d'outils, des fichiers lus et des essais ratés, qui finissent par noyer la consigne du départ.",
      "En septembre 2025, Anthropic a décrit les parades courantes. On résume l'historique quand il devient trop long, on fait prendre des notes à l'agent dans un fichier qu'il relit plus tard, on va chercher l'information au moment où elle sert, et on confie les recherches à des sous-agents qui ne rapportent qu'un résumé. Les skills relèvent de la même idée, puisque leurs instructions n'entrent dans la fenêtre que lorsqu'elles servent.",
    ],
    then:
      "Jusqu'en 2024, on parlait surtout de prompt engineering, l'art de bien formuler sa demande. En 2026, avec des agents qui enchaînent des dizaines d'actions, le travail consiste surtout à choisir ce qui reste dans la fenêtre au fil des tours. Claude Code, par exemple, efface d'abord les anciens résultats d'outils, puis résume la conversation quand la fenêtre approche de sa limite.",
    office: [
      {who: 'q', text: "Je lui donne toute la doc du projet à chaque fois, comme ça il a tout. Pourquoi il répond moins bien ?"},
      {who: 'a', text: "Justement parce qu'il a tout, et que la page utile est noyée dans le reste. Donne-lui les trois pages qui servent, avec un index pour aller chercher le reste s'il en a besoin."},
    ],
    avoid:
      "« Avec un million de tokens de contexte, plus besoin de choisir. » Une grande fenêtre repousse la limite sans faire le tri à ta place : un modèle exploite moins bien une information perdue au milieu d'un long texte, et chaque token envoyé se paie.",
    video: null,
    sources: [
      {label: 'Andrej Karpathy sur X, 25 juin 2025, citant un message de Tobi Lütke du 19 juin 2025 (context engineering préféré à prompt engineering), lus via api.fxtwitter.com le 2 octobre 2026', url: 'https://x.com/karpathy/status/1937902205765607626'},
      {label: "Anthropic, Effective context engineering for AI agents, 29 septembre 2025 (budget d'attention, compaction, prise de notes, chargement au moment voulu, sous-agents)", url: 'https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents'},
      {label: "Claude Code, documentation How Claude Code works (anciens résultats d'outils effacés en premier, puis résumé de la conversation)", url: 'https://code.claude.com/docs/en/how-claude-code-works'},
    ],
  },
];

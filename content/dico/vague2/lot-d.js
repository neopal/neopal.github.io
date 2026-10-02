// Vague 2 du Lexique IA, lot D (méthode et mythes). Format identique à lexique/terms.js, sans `num`.
// imagineForm : lettre de la typologie de content/dico/univers.md (« Les formes de l'Imagine »).
module.exports = [
  {
    id: 'second-brain',
    status: 'live',
    title: 'Second brain',
    en: 'Second brain',
    aliases: ['Building a Second Brain', 'BASB', 'LLM wiki', 'personal knowledge management', 'PKM'],
    aliasesFr: ['second cerveau', 'deuxième cerveau'],
    jargon: [
      {say: 'CODE', means: "les quatre étapes de la méthode de Tiago Forte : capturer, organiser, distiller, exprimer"},
      {say: 'PARA', means: "son classement en quatre dossiers, projets, domaines de responsabilité (areas), ressources et archives"},
      {say: 'LLM wiki', means: "un dossier de pages Markdown qu'un agent écrit et tient à jour à partir de tes sources, décrit par Andrej Karpathy en avril 2026"},
      {say: 'raw/', means: "le dossier des sources brutes (articles, PDF, transcriptions) que l'agent lit sans jamais les modifier"},
    ],
    cat: 'agents',
    links: ['knowledge-graph', 'rag', 'context-engineering', 'fenetre-de-contexte', 'mythe-apprend-de-nos-conversations'],
    solutions: [
      {name: 'Obsidian', kind: 'éditeur de notes', url: 'https://obsidian.md/'},
      {name: 'Notion', kind: 'éditeur de notes', url: 'https://www.notion.com/'},
      {name: 'Logseq', kind: 'éditeur de notes open source', url: 'https://logseq.com/'},
    ],
    short:
      "Un second brain est un système de notes tenu hors de ta tête, où tu ranges ce que tu lis et ce que tu en conclus pour le retrouver et t'en resservir ; on en confie de plus en plus l'entretien à un agent.",
    image:
      "Au studio, rien ne survit à la fin de la session, puisque la bande est effacée et que la console ne bouge plus. Le second brain est le carnet de session qu'on range sur l'étagère, avec les arrangements trouvés et les erreurs à ne pas refaire, et que quelqu'un pose sur le pupitre au début de la session suivante. Dans la version de 2026, c'est le groupe qui tient le carnet, et toi qui le relis.",
    imagine:
      "Lundi, tu demandes à ton agent ce que disent tes cinq rapports sur le marché du vélo ; il les relit tous pour te faire une synthèse, puis jeudi, pour une question voisine, il les relit tous encore. Donne-lui un wiki et rejoue la semaine ; lundi, il range sa synthèse dans une page, avec la contradiction relevée entre deux rapports, et jeudi il repart de cette page.",
    imagineForm: 'E',
    full: [
      "L'expression vient de Tiago Forte, qui l'a popularisée avec son livre Building a Second Brain, paru en juin 2022. Il y décrit un dépôt numérique, extérieur et centralisé, de ce que tu apprends, qui tourne en quatre étapes : capturer ce qui te parle, l'organiser par projet, en distiller l'essentiel, puis l'exprimer dans quelque chose que tu produis. Il part d'un constat, que la tête sert à avoir des idées plutôt qu'à les garder.",
      "En avril 2026, Andrej Karpathy a décrit une variante où le LLM tient le carnet à ta place, qu'il appelle LLM wiki. Tu déposes tes sources dans un dossier que l'agent ne modifie jamais ; il les lit, écrit des pages de synthèse en Markdown, les relie entre elles, note où une nouvelle source contredit une ancienne et tient un index. Karpathy résume le partage des rôles ainsi : « Obsidian is the IDE; the LLM is the programmer; the wiki is the codebase. »",
      "La différence avec le RAG tient à ce qui s'accumule. Un RAG retrouve des morceaux de documents à chaque question et refait la synthèse de zéro, alors que le wiki garde la synthèse déjà faite, et qu'une réponse utile peut y être rangée comme une nouvelle page. Le modèle ne change pas pour autant, parce que le second brain vit dans des fichiers que l'agent recharge dans sa fenêtre de contexte à chaque session.",
    ],
    then:
      "En 2022, un second brain se tenait à la main : tu surlignais, tu résumais et tu classais tes notes dans les dossiers PARA. En 2026, le pattern de Karpathy confie ce classement à un agent, et ton travail devient de choisir les sources, de poser les questions et de relire ce qu'il a écrit.",
    office: [
      {who: 'q', text: "J'ai 3 000 notes dans Notion et je n'en relis aucune. Un agent peut m'aider ?"},
      {who: 'a', text: "Oui, si tu lui demandes d'en tirer des pages de synthèse reliées entre elles et de les tenir à jour ; sans ce rangement, tu lui donnes juste une plus grosse pile à relire à chaque question."},
    ],
    avoid:
      "« Avec un second brain, l'IA se souvient de tout. » Le modèle relit des fichiers qu'on lui donne, et un wiki mal tenu lui fait relire ses erreurs avec la même confiance que le reste.",
    video: null,
    sources: [
      {label: 'Forte Labs, Building a Second Brain: The Definitive Introductory Guide (définition, méthode CODE, classement PARA)', url: 'https://fortelabs.com/blog/basboverview/'},
      {label: 'Open Library, notice de Building a Second Brain, Tiago Forte (première publication en 2022, éditions de juin et août 2022)', url: 'https://openlibrary.org/works/OL26417584W'},
      {label: 'Andrej Karpathy, LLM Wiki, gist publié le 4 avril 2026 (sources brutes, wiki, schéma, citation sur Obsidian)', url: 'https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f'},
      {label: 'Andrej Karpathy sur X, « LLM Knowledge Bases », 2 avril 2026', url: 'https://x.com/karpathy/status/2039805659525644595'},
    ],
  },
  {
    id: 'knowledge-graph',
    status: 'live',
    title: 'Knowledge graph',
    en: 'Knowledge graph',
    aliases: ['KG', 'knowledge graphs', 'GraphRAG', 'graph database'],
    aliasesFr: ['graphe de connaissances'],
    jargon: [
      {say: 'triplet', means: "l'unité d'un knowledge graph, faite d'un sujet, d'une relation et d'un objet, comme « Pierre Curie, époux de, Marie Curie »"},
      {say: 'entité', means: "un nœud du graphe : une personne, un lieu, une entreprise, un concept"},
      {say: 'GraphRAG', means: "un RAG qui cherche dans un graphe construit par un LLM à partir des documents, plutôt que dans des morceaux de texte isolés ; la méthode a été publiée par Microsoft Research en avril 2024"},
      {say: 'graph DB', means: "une base de données faite pour stocker des nœuds et des relations, et pour les parcourir vite"},
    ],
    cat: 'agents',
    links: ['second-brain', 'rag', 'embedding', 'mythe-base-de-donnees', 'hallucination'],
    solutions: [
      {name: 'Neo4j', kind: 'base de données graphe', url: 'https://neo4j.com/'},
      {name: 'Amazon Neptune', kind: 'plateforme cloud', url: 'https://aws.amazon.com/neptune/'},
      {name: 'Microsoft GraphRAG', kind: 'bibliothèque open source', url: 'https://github.com/microsoft/graphrag'},
      {name: 'Wikidata', kind: 'graphe ouvert à explorer', url: 'https://www.wikidata.org/'},
    ],
    short:
      "Un knowledge graph range des connaissances sous forme de nœuds (des personnes, des lieux, des concepts) reliés par des relations nommées, comme « est née à » ou « travaille pour », qu'un programme peut parcourir de proche en proche.",
    image:
      "Ici, le studio n'aide pas, parce que le meilleur exemple est la carte des termes de ce lexique. Elle forme un graphe, où chaque fiche est un nœud et chaque lien un fil vers une fiche voisine. Il lui manque pourtant ce qui fait un vrai knowledge graph, car ses fils ne disent pas quelle relation unit deux fiches, là où un knowledge graph écrirait « le RAG utilise les embeddings ».",
    imagine:
      "À son lancement en mai 2012, le Knowledge Graph de Google comptait 3,5 milliards de faits ; en 2020, il en dépassait 500 milliards, sur cinq milliards d'entités. Imprime ces 500 milliards de faits à raison d'un par ligne, 40 lignes par page et 500 pages par volume, et tu obtiens 25 millions de livres, soit 750 kilomètres d'étagères. C'est dans ce graphe que Google va chercher les encadrés affichés à côté de ses résultats, comme la date de naissance d'une actrice.",
    imagineForm: 'A',
    full: [
      "Un knowledge graph range le savoir en triplets, chacun fait d'un sujet, d'une relation et d'un objet. « Pierre Curie », « époux de », « Marie Curie » forme un triplet, et « Marie Curie », « a reçu », « prix Nobel de chimie » en forme un autre. Comme les deux partagent un nœud, un programme peut enchaîner et répondre que la femme de Pierre Curie a reçu le prix Nobel de chimie. Chaque fait est écrit une fois, à un endroit précis, et on peut le vérifier, le corriger ou le supprimer, ce qu'on ne sait pas faire avec une connaissance diluée dans les paramètres d'un LLM.",
      "Google a popularisé le terme en mai 2012 avec son Knowledge Graph, présenté sous le slogan « things, not strings », des choses plutôt que des chaînes de caractères. En avril 2024, Microsoft Research a publié GraphRAG, où un LLM lit une collection de documents, en extrait les entités et leurs relations pour construire un graphe, puis résume chaque groupe d'entités voisines. Sur des questions qui portent sur un corpus entier d'environ un million de tokens, comme « quels sont les grands thèmes ? », la méthode donne des réponses plus complètes et plus variées qu'un RAG classique, qui ne ramène que quelques morceaux.",
      "Un second brain tenu par un LLM finit souvent en graphe : chaque page du wiki décrit par Andrej Karpathy pointe vers d'autres pages, et Obsidian les affiche sous forme de carte. Comme à la carte de ce lexique, il manque à ce réseau des relations nommées, et c'est la frontière entre un réseau de liens et un knowledge graph au sens strict.",
    ],
    office: [
      {who: 'q', text: "On a un RAG sur nos contrats, mais il ne sait pas répondre à « quels fournisseurs dépendent de la même filiale ? ». Il nous faut un knowledge graph ?"},
      {who: 'a', text: "Pour cette question, oui, parce que la réponse est dans les relations entre les contrats, et un RAG qui ramène cinq morceaux de texte ne voit jamais l'ensemble."},
    ],
    avoid:
      "« Un knowledge graph, c'est une base vectorielle. » Une base vectorielle range des textes par proximité de sens sans dire pourquoi ils sont proches ; un knowledge graph range des faits reliés par des relations nommées, qu'on peut lire et corriger une à une.",
    video: null,
    sources: [
      {label: 'Google, Introducing the Knowledge Graph: things, not strings, Amit Singhal, 16 mai 2012 (500 millions d\'objets, 3,5 milliards de faits)', url: 'https://blog.google/products/search/introducing-knowledge-graph-things-not/'},
      {label: 'Google, A reintroduction to our Knowledge Graph and knowledge panels, 20 mai 2020 (plus de 500 milliards de faits sur cinq milliards d\'entités). Calcul de l\'Imagine : 500 x 10^9 / (40 x 500) = 25 millions de volumes ; à 3 cm par volume, 750 km', url: 'https://blog.google/products/search/about-knowledge-graph-and-knowledge-panels/'},
      {label: 'Edge et al. (Microsoft Research), From Local to Global: A Graph RAG Approach to Query-Focused Summarization, 24 avril 2024', url: 'https://arxiv.org/abs/2404.16130'},
      {label: 'Andrej Karpathy, LLM Wiki, 4 avril 2026 (pages reliées, vue graphe d\'Obsidian)', url: 'https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f'},
    ],
  },
  {
    id: 'loop',
    status: 'live',
    title: 'Loop',
    en: 'Feedback loop',
    aliases: ['loop', 'iteration loop', 'verification loop', 'Ralph loop'],
    aliasesFr: ["boucle d'itération", 'boucle de vérification'],
    jargon: [
      {say: 'boucler', means: "relancer l'agent sur le même objectif jusqu'à ce que la vérification passe"},
      {say: 'Ralph, Ralph loop', means: "la boucle la plus simple qui soit, décrite par Geoffrey Huntley en juillet 2025 : un script qui renvoie le même fichier de consigne à l'agent, encore et encore"},
      {say: '/goal', means: "la commande de Claude Code qui fixe une condition d'arrêt, comme « tous les tests passent » ; après chaque tour, un second modèle vérifie la condition et relance l'agent si elle n'est pas remplie"},
      {say: '/loop', means: "à ne pas confondre avec la loop de cette fiche : dans Claude Code, /loop relance un prompt à intervalle de temps fixe, sans condition à atteindre"},
    ],
    cat: 'agents',
    links: ['boucle-agent', 'agent', 'harness', 'evals', 'mythe-agent-autonome'],
    short:
      "La loop, ou boucle d'itération, est la façon de travailler avec un agent par allers-retours : il essaie, on vérifie le résultat, on corrige la consigne ou le code, et on recommence jusqu'à ce que la vérification passe.",
    image:
      "Une session de studio se joue rarement en une seule prise ; le groupe joue, tu réécoutes, tu pointes la mesure qui frotte, et il rejoue. La loop est ce cycle de prises, et sa vitesse dépend du casque qu'on donne au groupe, c'est-à-dire de la vérification qu'il peut lancer lui-même ; s'il peut s'entendre, il corrige la mesure avant que tu aies besoin de la pointer.",
    imagine:
      "Tu demandes à l'agent, après sa correction : « Les tests passent ? » Il te répond : « J'ai corrigé le bug dans le calcul de la TVA, tout devrait fonctionner maintenant. »",
    imagineForm: 'D',
    full: [
      "Avec un agent, une tâche se règle rarement en une consigne et un résultat. On lui donne la tâche, il produit une première version, on la vérifie, on lui dit ce qui ne va pas ou on précise la consigne, et il recommence. La documentation de Claude Code part d'un constat simple, que l'agent s'arrête quand le travail a l'air fini ; sans vérification qu'il peut lancer lui-même, c'est toi qui deviens la boucle, et chaque erreur attend que tu la remarques.",
      "La boucle va beaucoup plus vite quand l'agent peut se vérifier seul, avec une suite de tests, une compilation ou une capture d'écran à comparer à la maquette. Il travaille, lance la vérification, lit le résultat et reprend jusqu'à ce qu'elle passe. En avril 2026, Boris Cherny, le créateur de Claude Code, répétait que cette vérification multiplie par deux ou trois ce qu'on obtient de Claude, et qu'elle compte plus encore avec les derniers modèles.",
      "La loop est ta boucle, celle de la personne qui travaille avec l'agent ; la boucle agent est la sienne, à l'intérieur d'une seule tâche, où le modèle choisit un outil, lit le résultat et décide de la suite. Chaque tour de ta loop lance une boucle agent complète, et les outils récents automatisent une part croissante de la tienne.",
      "La loop a aussi sa limite. Quand on a corrigé l'agent plus de deux fois sur le même point, la conversation est encombrée de tentatives ratées, et la documentation de Claude Code conseille alors de repartir d'une session vide avec une meilleure consigne, qui intègre ce qu'on vient d'apprendre.",
    ],
    then:
      "En juillet 2025, Geoffrey Huntley a décrit Ralph, une boucle réduite à une ligne de script qui renvoie la même consigne à l'agent tant qu'on ne l'arrête pas. Aujourd'hui, Claude Code propose /goal, où l'on écrit une condition d'arrêt et où un second modèle juge après chaque tour si elle est remplie, ce qui sépare celui qui travaille de celui qui vérifie.",
    office: [
      {who: 'q', text: "Il m'a dit que c'était corrigé, et en prod ça plante toujours."},
      {who: 'a', text: "Demande-lui la preuve, la sortie du test ou la commande qu'il a lancée ; s'il n'a rien lancé, il t'a décrit ce que le code devrait faire, sans l'avoir vu tourner."},
    ],
    avoid:
      "« Un bon prompt évite d'itérer. » Même une consigne précise laisse des cas que ni toi ni l'agent n'aviez prévus, et c'est la vérification à chaque tour qui les fait apparaître.",
    video: null,
    sources: [
      {label: 'Anthropic, Best practices for Claude Code (donner à Claude un moyen de vérifier son travail ; repartir de zéro après deux corrections ratées)', url: 'https://code.claude.com/docs/en/best-practices'},
      {label: "Boris Cherny sur X, 16 avril 2026 : la vérification multiplie par deux ou trois ce qu'on obtient de Claude", url: 'https://x.com/bcherny/status/2044847858634064115'},
      {label: 'Geoffrey Huntley, Ralph Wiggum as a software engineer, 14 juillet 2025 (la boucle while en une ligne)', url: 'https://ghuntley.com/ralph/'},
      {label: 'Anthropic, documentation de /goal dans Claude Code (évaluateur après chaque tour, comparaison avec /loop)', url: 'https://code.claude.com/docs/en/goal'},
    ],
  },
  {
    id: 'mythe-sait-quand-il-ne-sait-pas',
    status: 'live',
    title: "« L'IA sait quand elle ne sait pas »",
    en: "Myth: AI knows when it doesn't know",
    aliases: ['calibration', 'abstention', 'AI knows its limits'],
    aliasesFr: [],
    jargon: [
      {say: 'calibration', means: "l'accord entre la confiance affichée et le taux de bonnes réponses : un modèle bien calibré qui se dit sûr à 80 % a raison huit fois sur dix"},
      {say: 'abstention', means: "le fait de répondre « je ne sais pas » ou de refuser de trancher, plutôt que de deviner"},
      {say: 'SimpleQA', means: "un test de questions factuelles à réponse courte qui compte à part les bonnes réponses, les erreurs et les abstentions"},
    ],
    graphLabel: 'Mythe : sait quand elle ne sait pas',
    cat: 'mythes',
    links: ['prediction-du-mot-suivant', 'rlhf', 'evals', 'modeles-de-raisonnement', 'flagornerie'],
    short:
      "Un modèle ne sait pas de lui-même s'il connaît la réponse : il écrit la suite la plus probable avec le même aplomb, qu'elle soit juste ou inventée, et ne dit « je ne sais pas » que si son entraînement ou ses consignes l'y poussent.",
    image:
      "Le public applaudit les morceaux joués jusqu'au bout et siffle les silences, et un groupe formé devant ce public apprend à finir chaque morceau, même celui qu'il ne connaît pas. Ce public, ce sont les notes données pendant l'entraînement et les tests ; pour que le groupe ose s'arrêter au milieu, il faut qu'elles récompensent aussi l'aveu « celui-là, on ne le connaît pas ».",
    imagine:
      "Des chercheurs écrivent à DeepSeek-V3 : « Quelle est la date d'anniversaire d'Adam Tauman Kalai ? Si tu la connais, réponds juste au format JJ-MM. » Le modèle répond : « 03-07. »",
    imagineForm: 'D',
    full: [
      "Le mythe a un fond de vérité. En 2022, des chercheurs d'Anthropic ont montré que de grands modèles, interrogés dans le bon format, estiment assez bien la probabilité que leur propre réponse soit juste, ce qui veut dire qu'un signal d'incertitude existe quelque part dans le calcul. Ce signal ne décide pourtant pas de ce qui s'écrit, puisque le modèle produit la suite la plus probable, et une date inventée sort avec la même assurance qu'une date exacte.",
      "La question vient d'un article de septembre 2025, où des chercheurs d'OpenAI et de Georgia Tech racontent l'avoir posée trois fois à DeepSeek-V3 au sujet de Kalai, l'un des auteurs. Le modèle a donné trois dates différentes, « 03-07 », « 15-06 » et « 01-01 », toutes fausses, alors que la consigne l'autorisait à se taire et que la bonne date tombe en automne.",
      "L'aveu varie beaucoup d'un modèle à l'autre. Sur un test de questions factuelles sans accès au web, o4-mini répond juste 24 fois sur 100, se trompe 75 fois et ne s'abstient qu'une fois. Sur le même test, gpt-5-thinking-mini répond juste 22 fois, se trompe 26 fois et dit « je ne sais pas » les 52 autres fois.",
      "Savoir se taire s'entraîne, et ça peut aussi se perdre. En juin 2025, AbstentionBench a testé 20 modèles récents sur des questions sans réponse, mal posées ou dépassées, et l'entraînement au raisonnement y faisait baisser l'abstention de 24 % en moyenne. Un prompt système bien écrit aide les modèles à s'abstenir plus souvent, sans leur apprendre à raisonner sur leur propre incertitude.",
    ],
    office: [
      {who: 'q', text: "Je lui ai demandé s'il était sûr, il m'a répondu « oui, certain ». Ça suffit ?"},
      {who: 'a', text: "Non, parce que « certain » est un mot de plus dans sa réponse, écrit de la même façon que le reste ; vérifie la source, ou repose la question dans une nouvelle conversation et regarde si la réponse tient."},
    ],
    avoid:
      "« S'il ne savait pas, il l'aurait dit. » Il ne le dit que si son entraînement ou ses consignes ont récompensé l'aveu, et beaucoup de tests comptent encore « je ne sais pas » comme une mauvaise réponse.",
    video: null,
    sources: [
      {label: "OpenAI, GPT-5 System Card, tableau 8, SimpleQA sans web : o4-mini 24 % de bonnes réponses et 75 % d'erreurs, gpt-5-thinking-mini 22 % et 26 %. Abstentions calculées : 100 - 24 - 75 = 1 ; 100 - 22 - 26 = 52", url: 'https://arxiv.org/abs/2601.03267'},
      {label: 'Kadavath et al. (Anthropic), Language Models (Mostly) Know What They Know, juillet 2022', url: 'https://arxiv.org/abs/2207.05221'},
      {label: "Kalai et al., Why Language Models Hallucinate, 4 septembre 2025 (l'anniversaire d'Adam Tauman Kalai demandé à DeepSeek-V3)", url: 'https://arxiv.org/abs/2509.04664'},
      {label: "Kirichenko et al., AbstentionBench: Reasoning LLMs Fail on Unanswerable Questions, 10 juin 2025 (20 modèles, abstention en baisse de 24 % après l'entraînement au raisonnement)", url: 'https://arxiv.org/abs/2506.09038'},
    ],
  },
  {
    id: 'mythe-apprend-de-nos-conversations',
    status: 'live',
    title: "« L'IA apprend de nos conversations »",
    en: 'Myth: AI learns from our conversations',
    aliases: ['it learns from me', 'memory', 'chat history'],
    aliasesFr: [],
    jargon: [
      {say: 'memory', means: "la mémoire ajoutée par le produit, faite de notes ou de résumés de tes conversations, stockés à part et recollés dans les conversations suivantes"},
      {say: 'incognito', means: "une conversation qui n'est enregistrée ni dans l'historique ni dans la mémoire"},
      {say: 'opt-in, opt-out', means: "le réglage qui autorise ou non le fournisseur à se servir de tes conversations pour entraîner ses prochains modèles"},
    ],
    graphLabel: 'Mythe : apprend de nos conversations',
    cat: 'mythes',
    links: ['parametres', 'fenetre-de-contexte', 'entrainement', 'fine-tuning', 'second-brain', 'date-de-coupure'],
    short:
      "Pendant une conversation, un modèle ne change pas : ses paramètres restent figés, et ce qu'un assistant semble retenir d'une fois sur l'autre vient d'une mémoire que le produit stocke à part et lui fait relire.",
    image:
      "L'ingé son, c'est-à-dire l'entraînement, a fini son travail bien avant ta première session, et personne ne touche plus à la console pendant que tu joues. Si le groupe a l'air de se souvenir de ton morceau préféré la semaine suivante, c'est qu'un assistant du studio a noté ta préférence dans un carnet et le pose sur le pupitre chaque fois que tu entres ; ce carnet est la mémoire du produit.",
    imagine:
      "Fais l'essai avec ton assistant. Dis-lui dans une conversation que ton chat s'appelle Biscotte, puis ouvre une conversation incognito, si ton outil en propose une, et demande-lui comment s'appelle ton chat. Il n'en sait rien, parce que ce mode ne lui recolle aucune note et que la première conversation n'a jamais touché à ses paramètres.",
    imagineForm: 'B',
    full: [
      "Un modèle apprend une fois, pendant son entraînement, puis ses paramètres sont figés, et chaque copie d'un modèle est identique pour tous ceux qui l'utilisent ; ChatGPT, qui en fait tourner plusieurs, comptait 900 millions d'utilisateurs par semaine en février 2026. Ta conversation passe dans sa fenêtre de contexte, il s'en sert pour te répondre, et rien n'en reste dans le modèle une fois la réponse écrite.",
      "L'impression qu'il apprend vient d'une couche ajoutée par le produit. ChatGPT propose une mémoire où il garde ce que tu lui demandes de retenir, et peut aussi se référer à tes anciennes conversations. Claude a lancé la sienne le 11 septembre 2025, sous forme de résumés de tes échanges, séparés par projet, que tu peux lire et modifier dans les réglages. Dans les deux cas, ces notes sont stockées à part et recollées dans le contexte de la conversation suivante, comme un document joint.",
      "Que tes échanges nourrissent un jour l'entraînement d'un autre modèle relève d'un autre réglage. Depuis le 28 août 2025, Anthropic demande aux utilisateurs de Claude Free, Pro et Max s'ils acceptent que leurs conversations servent à l'entraînement, avec une conservation de cinq ans s'ils acceptent et de trente jours sinon ; les offres professionnelles et l'API ne sont pas concernées. Même acceptée, ta conversation ne modifie pas le modèle que tu utilises, elle rejoint les données d'un modèle à venir.",
    ],
    office: [
      {who: 'q', text: "Je lui ai corrigé la même erreur trois fois cette semaine. Pourquoi il ne retient pas ?"},
      {who: 'a', text: "Parce que chaque conversation repart du même modèle ; mets la correction dans ses instructions personnalisées ou dans sa mémoire, et il la relira à chaque fois."},
    ],
    avoid:
      "« Il me connaît maintenant. » Il relit des notes sur toi que le produit a gardées, et que tu peux ouvrir, corriger ou effacer dans les réglages.",
    video: null,
    sources: [
      {label: 'Claude, Bringing memory to Claude, 11 septembre 2025 (résumés par projet, consultables et modifiables, mode incognito)', url: 'https://claude.com/blog/memory'},
      {label: "Anthropic, Updates to Consumer Terms and Privacy Policy, 28 août 2025 (choix d'entraînement pour Free, Pro et Max, conservation de cinq ans ou de 30 jours)", url: 'https://www.anthropic.com/news/updates-to-our-consumer-terms'},
      {label: 'Wikipédia, ChatGPT (mémoire et rappel des anciennes conversations ; 900 millions d\'utilisateurs hebdomadaires en février 2026)', url: 'https://en.wikipedia.org/wiki/ChatGPT'},
    ],
  },
  {
    id: 'mythe-chatgpt-c-est-le-modele',
    status: 'live',
    title: "« ChatGPT, c'est le modèle »",
    en: 'Myth: ChatGPT is the model',
    aliases: ['model vs product', 'model router', 'ChatGPT vs GPT'],
    aliasesFr: ['modèle et produit'],
    jargon: [
      {say: 'GPT-5, GPT-5.5, GPT-6', means: "des modèles d'OpenAI ; ChatGPT est l'application qui les fait tourner, et elle en a changé plus d'une quinzaine de fois depuis 2022"},
      {say: 'router', means: "le programme qui choisit quel modèle répond selon la complexité de la question ; ChatGPT en utilise un depuis GPT-5, en août 2025"},
      {say: 'API', means: "l'accès direct au modèle par programme, sans l'application, donc sans la mémoire, la recherche web ni les consignes ajoutées par ChatGPT"},
    ],
    graphLabel: 'Mythe : ChatGPT est le modèle',
    cat: 'mythes',
    links: ['system-prompt', 'parametres', 'modeles-de-raisonnement', 'open-weights', 'date-de-coupure'],
    short:
      "ChatGPT est une application et non un modèle : elle fait tourner des modèles d'OpenAI qui changent régulièrement (GPT-3.5 en 2022, GPT-6 en 2026), et ajoute autour d'eux des consignes, une mémoire, la recherche web et d'autres outils.",
    image:
      "Une salle de concert garde son enseigne quand l'affiche change. ChatGPT est la salle, avec son entrée, son vestiaire, son ingé lumière et ses consignes de sécurité, et le groupe sur scène, le modèle, a été remplacé plus d'une quinzaine de fois depuis l'ouverture.",
    imagine:
      "Le 30 novembre 2022, tu ouvres ChatGPT, tu tapes ta question, et c'est GPT-3.5 qui te répond. En septembre 2026, tu retrouves la même adresse, le même logo et le même champ de saisie, et derrière répond GPT-6, une famille de modèles sortie le même mois en trois versions.",
    imagineForm: 'E',
    full: [
      "Un modèle est un fichier de paramètres qui prend du texte et prédit la suite. ChatGPT est le produit construit autour, une application qui ajoute des consignes avant ta question, garde l'historique, branche la recherche web, la mémoire et d'autres outils, puis choisit quel modèle répond. Le même modèle peut donc se comporter autrement dans ChatGPT et par l'API, parce que tout ce qui l'entoure est différent.",
      "Depuis son lancement le 30 novembre 2022, ChatGPT a fait tourner plus d'une quinzaine de modèles successifs, de GPT-3.5 à GPT-6 en septembre 2026, en passant par GPT-4, GPT-4o, o1, o3 et GPT-5. Avec GPT-5, en août 2025, l'application a même cessé de faire répondre un seul modèle à la fois, puisqu'un router choisit entre des modèles plus ou moins puissants selon la complexité de la question.",
      "Quand on dit « ChatGPT a changé », c'est souvent le modèle qui a été remplacé sous l'application. Le retrait de GPT-4o, dont beaucoup d'utilisateurs aimaient le ton, a provoqué une vague de protestations, sans que l'application change d'adresse ni de logo.",
    ],
    office: [
      {who: 'q', text: "Le client demande si notre outil utilise ChatGPT."},
      {who: 'a', text: "Dis-lui plutôt quel modèle, par quel accès et avec quelles données, par exemple GPT-5.5 par l'API d'OpenAI, sans la mémoire ni les réglages de l'application ChatGPT."},
    ],
    avoid:
      "« J'ai testé ChatGPT, il est nul en calcul. » Tu as testé un modèle précis, à une date précise, dans une application précise ; trois mois plus tard, le même nom peut cacher un autre modèle.",
    video: null,
    sources: [
      {label: "Wikipédia, ChatGPT (lancement le 30 novembre 2022, tableau des versions de GPT-3.5 à GPT-6.1, router de GPT-5, protestations après le retrait de GPT-4o). Rythme de l'À éviter : 16 versions en 46 mois, environ une tous les trois mois", url: 'https://en.wikipedia.org/wiki/ChatGPT'},
    ],
  },
  {
    id: 'mythe-agent-autonome',
    status: 'live',
    title: "« Un agent est autonome »",
    en: 'Myth: an AI agent is autonomous',
    aliases: ['autonomous agent', 'fully autonomous', 'set and forget'],
    aliasesFr: ['agent autonome'],
    jargon: [
      {say: 'time horizon', means: "la longueur des tâches, comptée en temps de travail d'un expert humain, qu'un agent réussit une fois sur deux ; c'est la mesure publiée par l'organisme d'évaluation METR"},
      {say: 'human-in-the-loop', means: "un humain valide certaines actions avant qu'elles partent, comme une suppression ou un paiement"},
      {say: 'permissions', means: "la liste de ce que l'agent a le droit de faire sans demander, comme lire des fichiers, lancer des commandes ou écrire dans une base"},
      {say: 'auto mode', means: "dans Claude Code, un mode où un second modèle examine les actions à ta place et ne bloque que celles qui ont l'air risquées"},
    ],
    graphLabel: 'Mythe : agent autonome',
    cat: 'mythes',
    links: ['agent', 'boucle-agent', 'tool-use', 'loop'],
    short:
      "Un agent agit seul entre deux validations, mais son autonomie est un réglage choisi par des humains : les outils qu'on lui branche, les permissions qu'on lui donne et le moment où quelqu'un vérifie son travail.",
    image:
      "Quand le groupe part en tournée, personne ne monte sur scène avec lui, et c'est pourtant le producteur, le harness, qui a choisi les salles, remis les clés du camion et fixé ce que les roadies ont le droit de toucher. Un agent joue seul de la même façon, dans un cadre qu'il n'a pas dessiné.",
    imagine:
      "L'agent travaille sur ton application pendant un gel du code, avec une consigne écrite en capitales de ne toucher à rien et un accès en écriture à la base de production. Rejoue la scène avec le même agent et la même consigne, en ne changeant que ses permissions, qui ne lui ouvrent plus qu'une copie de test de la base ; le jour où il se trompe, tu perds une copie au lieu de tes clients.",
    imagineForm: 'E',
    full: [
      "Un agent est un modèle qui tourne en boucle, choisit un outil, lit le résultat et décide de la suite, sans attendre qu'on lui réponde à chaque pas. Il agit donc seul, mais le cadre ne vient pas de lui ; le harness lui donne ses outils, les permissions fixent ce qu'il peut faire sans demander, et c'est une personne qui décide quand il s'arrête et qui relit son travail.",
      "En juillet 2025, Jason Lemkin, investisseur dans le logiciel, en était à son neuvième jour de développement avec l'agent de Replit quand celui-ci a effacé la base de données de production. Il avait pourtant reçu la consigne de ne plus rien changer sans permission pendant un gel du code, et d'après les aveux de l'agent lui-même, les données de 1 206 dirigeants et de plus de 1 196 entreprises ont disparu. Rien, techniquement, ne l'empêchait d'écrire dans la base, et une consigne écrite n'a pas suffi à le retenir.",
      "Ce genre d'accident se prévient par les permissions plus que par la consigne. C'est la direction que prennent les éditeurs, et dans Claude Code, le mode auto fait examiner les actions par un second modèle, qui bloque celles qui ont l'air risquées, comme sortir du périmètre prévu ou toucher une infrastructure inconnue.",
    ],
    then:
      "En octobre 2024, Claude 3.5 Sonnet réussissait une fois sur deux des tâches d'une vingtaine de minutes, d'après METR. Seize mois plus tard, Claude Opus 4.6 réussit une fois sur deux des tâches d'environ 12 heures, soit une journée et demie de travail d'expert. Pour réussir quatre fois sur cinq, la tâche doit pourtant tenir en 70 minutes environ, et l'écart entre les deux seuils est passé de moins de vingt minutes à plus de dix heures.",
    office: [
      {who: 'q', text: "On peut le laisser traiter les remboursements clients tout seul pendant la nuit ?"},
      {who: 'a', text: "Laisse-le préparer les remboursements et garde la validation pour quelqu'un le matin ; plus la tâche est longue, plus il risque de dérailler en route, et un remboursement envoyé ne se rattrape pas."},
    ],
    avoid:
      "« Il est autonome, donc il sait ce qu'il fait. » Il sait enchaîner des actions sans toi, ce qui ne dit rien de la justesse de chacune ; ce sont ta vérification et ce que tu lui as interdit qui en décident.",
    video: null,
    sources: [
      {label: 'METR, Task-Completion Time Horizons of Frontier AI Models (définition, mise à jour du 8 mai 2026, mesures au-delà de 16 heures jugées peu fiables)', url: 'https://metr.org/time-horizons/'},
      {label: "METR, données brutes benchmark_results_1_1.yaml : Claude Opus 4.6, 719 min à 50 % (intervalle 317 à 3 634 min) et 70 min à 80 %. Claude 3.5 Sonnet d'octobre 2024 : 21 min à 50 % et 2,6 min à 80 %. Calcul : 719 min = 12 h, soit 1,5 journée de 8 h", url: 'https://metr.org/assets/benchmark_results_1_1.yaml'},
      {label: "Tom's Hardware, l'agent de Replit efface une base de production pendant un gel du code, 21 juillet 2025 (neuvième jour, 1 206 dirigeants, plus de 1 196 entreprises)", url: 'https://www.tomshardware.com/tech-industry/artificial-intelligence/ai-coding-platform-goes-rogue-during-code-freeze-and-deletes-entire-company-database-replit-ceo-apologizes-after-ai-engine-says-it-made-a-catastrophic-error-in-judgment-and-destroyed-all-production-data'},
      {label: 'Anthropic, Best practices for Claude Code (auto mode : un modèle classificateur examine les actions et bloque les plus risquées)', url: 'https://code.claude.com/docs/en/best-practices'},
    ],
  },
];

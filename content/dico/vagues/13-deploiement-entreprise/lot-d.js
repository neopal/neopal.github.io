// Lexique IA, vague 13, lot D (architecture). Format identique à lexique/terms.js, sans `num`.
// imagineForm : forme de l'« Imagine » (content/dico/univers.md, section « Les formes de l'Imagine »).
// Faits et chiffres relevés le 4 octobre 2026 sur les pages citées dans `sources`.
// Varick Agents vend ce service : ses chiffres sont présentés comme ses affirmations, appuyées par des sources primaires.
module.exports = [
  {
    id: 'workflow-ou-agent',
    status: 'live',
    title: 'Workflow ou agent',
    en: 'Workflow vs agent',
    aliases: ['workflow', 'workflows', 'agentic workflow', 'workflow vs agent', 'deterministic workflow', 'prompt chaining'],
    aliasesFr: ['workflow ou agent', 'chaîne déterministe'],
    jargon: [
      {say: 'déterministe', means: "se dit d'une étape qui donne toujours le même résultat pour la même entrée, comme une règle écrite en code ; un modèle de langage ne l'est pas"},
      {say: 'prompt chaining', means: "un workflow où chaque appel au modèle reprend la sortie du précédent dans un ordre fixé d'avance, par exemple écrire le plan d'un document, vérifier qu'il respecte des critères, puis rédiger le document"},
      {say: 'escalade', means: "le moment où le système passe la main à une personne, avec les pièces rassemblées, parce que l'enjeu est trop grand ou que l'agent n'y arrive pas"},
    ],
    cat: 'agents',
    links: ['agent', 'boucle-agent', 'multi-agents', 'routage-de-modeles', 'mythe-ajouter-ia', 'evals', 'sandbox-et-permissions'],
    short:
      "Workflow ou agent, c'est la question de savoir qui fixe les étapes d'une tâche automatisée : le développeur, à l'avance, ou le modèle, en cours de route.",
    image:
      "« Le chauffeur du 63 a beau tenir le volant, c'est la RATP qui a tracé la ligne. Le taxi choisit ses rues d'après les bouchons, et toi, tu regardes tourner le compteur. »",
    imagineForm: 'D',
    imagine:
      "« Tu peux me lister les étapes du traitement des réclamations, que je les fasse automatiser ? », demande Karine, la nouvelle responsable qualité, à Bernard, qui les traite depuis vingt-deux ans. « D'abord j'ouvre le mail et je cherche le numéro de commande, et après, ça dépend de ce que le client a vraiment voulu dire », répond-il.",
    full: [
      "La question se pose dès qu'on automatise une tâche avec un modèle de langage. Anthropic y a répondu en décembre 2024 par un critère qui tient en une phrase, savoir si l'on peut écrire la liste des étapes avant de lancer. Si oui, c'est un workflow, un chemin tracé dans le code où le modèle intervient à des endroits prévus. Si la suite dépend de ce que le modèle découvre en route, c'est un agent, qui choisit lui-même ses actions et ses outils. Le cas qui trompe est celui où un modèle découpe la tâche et en confie les morceaux à d'autres. Les sous-tâches ne sont connues qu'au moment de lancer, et Anthropic range pourtant ce schéma parmi les workflows, parce que sa forme, découper, déléguer puis rassembler, reste écrite d'avance.",
      "Le critère se joue étape par étape plutôt que pour tout un processus. Varick Agents, une société de San Francisco qui conçoit des agents pour de grandes entreprises, trie chaque étape dans l'une de trois cases. Ce qui suit une règle, comme payer une facture sous un certain montant quand elle correspond au bon de commande et au bon de réception, s'écrit en code, qui coûte peu, se vérifie et n'invente rien. Ce qui demande du jugement sur un cas déjà tranché des milliers de fois, comme imputer une dépense au bon compte comptable, va à un modèle, à condition que l'erreur coûte peu. Le reste revient à une personne, à qui un agent prépare le dossier. Quand une facture ne colle pas au bon de commande, l'agent rassemble les pièces et propose d'approuver, de rejeter ou de transmettre, et Varick estime que la personne tranche alors en 30 secondes au lieu de chercher 40 minutes dans ses mails.",
      "OpenAI dit la même chose dans son guide d'avril 2025. Un agent se justifie pour des décisions nuancées, des règles devenues impossibles à maintenir ou des documents à interpréter, et sinon, écrit l'éditeur, « une solution déterministe peut suffire ». Les actions sensibles, irréversibles ou à fort enjeu, comme annuler une commande, accorder un gros remboursement ou payer, passent par un humain tant que la confiance dans l'agent ne s'est pas installée.",
      "Varick raconte ainsi le cas d'un client qui rapprochait chaque mois plus de 300 comptes bancaires, avec plus de 12 000 écritures en attente et quatre jours passés, à chaque début de mois, à réclamer les relevés. Selon Varick, le temps partait dans l'attente des relevés et des réponses des contrôleurs, bien plus que dans le rapprochement lui-même. Dans le processus redessiné, les relevés arrivent d'eux-mêmes, des règles rapprochent tout ce qui se rapproche, un agent monte le dossier de chaque écart avec une proposition, et une personne traite sa file d'exceptions, pièces en main. C'est le récit d'un prestataire sur son propre client, mais le découpage se reproduit sur n'importe quel processus.",
    ],
    office: [
      {who: 'q', text: "Le prestataire nous propose un agent pour tout le traitement des notes de frais, de la réception du ticket au remboursement."},
      {who: 'a', text: "Demande-lui quelles étapes ont vraiment besoin d'un modèle ; vérifier qu'un ticket dépasse le plafond tient en une ligne de code, et c'est l'addition froissée d'un restaurant de Lisbonne qui mérite qu'on paie un modèle."},
    ],
    avoid:
      "« Un agent, c'est un workflow en plus intelligent. » L'agent ajoute de la liberté, et avec elle des tokens, de l'attente et des résultats moins prévisibles. Anthropic conseille de chercher la solution la plus simple et de n'ajouter de la complexité que lorsqu'elle améliore le résultat, ce qui veut parfois dire ne pas construire d'agent du tout.",
    video: null,
    sources: [
      {label: "Anthropic, Building effective agents, 19 décembre 2024 (workflows : « LLMs and tools are orchestrated through predefined code paths » ; agents : « LLMs dynamically direct their own processes and tool usage » ; agents pour les problèmes où l'on ne peut pas prévoir le nombre d'étapes ni coder un chemin fixe ; orchestrator-workers classé parmi les workflows, « subtasks aren't pre-defined, but determined by the orchestrator » ; « finding the simplest solution possible [...] might mean not building agentic systems at all » ; prompt chaining : plan, vérification du plan, rédaction)", url: 'https://www.anthropic.com/engineering/building-effective-agents'},
      {label: "Vas Moza (Varick Agents), Don't Apply AI, blog Varick, page datée du 30 septembre 2026 (trois cases : règle « If X then Y » en code, jugement confié à un LLM quand il existe des milliers d'exemples tranchés et que le risque est faible, humain dans la boucle avec les pièces préparées ; paiement d'une facture sous seuil qui correspond au bon de commande et au bon de réception ; GL coding ; écart facture et bon de commande : approuver, rejeter ou transmettre, 40 minutes de recherche évitées, décision en 30 secondes ; client aux plus de 300 comptes bancaires, plus de 12 000 éléments ouverts, 4 jours pour obtenir les relevés, « matching was never the problem » ; processus redessiné : relevés en flux, rapprochement par règles, dossier monté par un agent, file d'exceptions humaine ; clients de 500 M$ à 100 Md$ de chiffre d'affaires)", url: 'https://www.varickagents.com/blog/don-t-apply-ai'},
      {label: "Vas Moza (Varick Agents), Spend Less Tokens, blog Varick, page datée du 30 septembre 2026 (« the number of steps in a workflow and the amount of intelligence required in that workflow are two very different things » ; « If the answer can be known ahead of time, use code »)", url: 'https://www.varickagents.com/blog/spend-less-tokens'},
      {label: "OpenAI, A practical guide to building agents, avril 2025, PDF créé le 7 avril 2025 (critères : « Complex decision-making », « Difficult-to-maintain rules », « Heavy reliance on unstructured data » ; « Otherwise, a deterministic solution may suffice » ; « High-risk actions » : annuler des commandes, autoriser de gros remboursements, effectuer des paiements, sous supervision humaine « until confidence in the agent's reliability grows »)", url: 'https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf'},
      {label: "Varick Agents, page d'accueil (« Varick designs and deploys AI agent systems that execute operational workflows inside enterprise organizations », siège au 311 California Street, San Francisco)", url: 'https://www.varickagents.com/'},
    ],
  },
  {
    id: 'routage-de-modeles',
    status: 'live',
    title: 'Routage de modèles',
    en: 'Model routing',
    aliases: ['model routing', 'LLM routing', 'LLM router', 'RouteLLM', 'model cascade', 'LLM cascade', '90/9/1'],
    aliasesFr: ['routeur de modèles', 'aiguillage entre modèles', 'cascade de modèles'],
    jargon: [
      {say: 'router', means: "le programme qui lit une demande et choisit le modèle qui y répondra ; à ne pas confondre avec le routeur interne d'un modèle MoE, qui répartit chaque token entre ses experts"},
      {say: 'cascade', means: "on essaie d'abord le petit modèle et on ne passe au grand que si sa réponse ne tient pas ; en mai 2023, FrugalGPT égalait ainsi GPT-4 sur ses tests pour un coût jusqu'à 98 % plus bas"},
      {say: '90/9/1', means: "la répartition que revendique Varick Agents chez ses clients, 90 % des appels sur des modèles hors de la frontière, 9 % sur des modèles proches de la frontière et 1 % sur les plus puissants"},
      {say: 'Pareto', means: "chez Uber, on ne retient que les modèles qu'aucun autre ne bat à la fois sur le coût par tâche réussie et sur la qualité, et on refait le choix quand un nouveau modèle sort"},
    ],
    cat: 'inference',
    links: ['cout-d-une-requete', 'tailles-de-modele', 'workflow-ou-agent', 'prompt-caching', 'multi-agents', 'evals', 'mythe-chatgpt-c-est-le-modele'],
    solutions: [
      {name: 'RouteLLM', kind: 'bibliothèque open source', url: 'https://lmsys.org/blog/2024-07-01-routellm/'},
      {name: 'OpenRouter Auto Router', kind: 'routeur commercial', url: 'https://openrouter.ai/docs/guides/routing/routers/auto-router'},
      {name: 'Not Diamond', kind: 'routeur commercial', url: 'https://www.notdiamond.ai/'},
      {name: 'Microsoft Foundry model router', kind: 'plateforme cloud', url: 'https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/model-router'},
      {name: 'Amazon Bedrock Intelligent Prompt Routing', kind: 'plateforme cloud', url: 'https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-routing.html'},
    ],
    short:
      "Le routage de modèles envoie chaque tâche ou chaque demande au plus petit modèle qui la réussit, et réserve les modèles les plus chers aux cas qui en ont besoin.",
    image:
      "Au garage, Serge confie les vidanges à l'apprenti et garde les boîtes de vitesses pour Gilles, qui coûte trois fois plus cher de l'heure. Le jour où une Twingo qui faisait « juste un petit bruit » est partie chez l'apprenti, Gilles a passé sa semaine sur la boîte.",
    imagineForm: 'A',
    imagine:
      "Prends un agent qui tourne 40 000 fois par mois et qui lit 3 000 tokens et en écrit 500 à chaque passage. Tout confié à Claude Fable 5.1, en haut de la grille d'Anthropic, il coûte environ 2 200 dollars par mois ; réparti à 90 % sur Haiku 4.5, 9 % sur Sonnet 5.5 et 1 % sur Fable 5.1, environ 260. Si Haiku rate un passage sur dix et qu'on refait ceux-là sur Fable, la facture remonte à 460 dollars, encore près de cinq fois moins, à condition que quelque chose ait repéré les ratés.",
    full: [
      "Chez Anthropic, en octobre 2026, le million de tokens écrits coûte 5 dollars avec Claude Haiku 4.5, 10 avec Sonnet 5.5 et 50 avec Fable 5.1, dix fois plus que le petit modèle. Le routage consiste à ne payer le haut de gamme que là où il change le résultat, et il prend deux formes. On fixe le modèle de chaque étape en concevant le système, ou bien un routeur choisit à chaque demande.",
      "La première forme est la plus sûre, parce qu'elle se mesure avant la mise en service. OpenAI la conseille dans son guide d'avril 2025, qui propose de construire d'abord avec le modèle le plus capable pour fixer une référence, puis d'essayer des modèles plus petits et de garder ceux qui tiennent l'objectif. Varick Agents, qui conçoit des agents pour de grandes entreprises, en a fait sa règle 90/9/1, 90 % des appels hors de la frontière, 9 % près d'elle, 1 % sur les modèles les plus puissants. Elle y voit la source de factures de tokens réduites de plus de 90 %, un chiffre qu'elle tire de ses propres clients.",
      "Le 27 août 2026, Uber a détaillé la façon dont elle fait ce choix pour ses agents de code. Pour uReview, son agent de relecture, elle a bâti un banc d'essai à partir de vraies pull requests aux bugs connus, classées faciles, moyennes et difficiles. Elle n'y retient que les modèles qu'aucun autre ne bat à la fois sur le coût par tâche réussie et sur la qualité. Elle refait ce choix sans cesse, puisque cette frontière se déplace toutes les quelques semaines. Ses sous-agents, qui reçoivent des tâches bien bornées, tournent par défaut sur un modèle moins cher, et un tableau de bord signale aux ingénieurs les sessions simples menées sur Opus que Sonnet aurait suffi à traiter.",
      "La seconde forme demande au routeur de deviner la difficulté d'une demande avant qu'on y réponde. En juillet 2024, l'équipe de LMSYS a publié RouteLLM, des routeurs entraînés sur les votes de Chatbot Arena pour choisir entre GPT-4 et Mixtral 8x7B, un modèle bien moins cher. Sur le test MT Bench, le meilleur d'entre eux atteignait 95 % de la qualité de GPT-4 en ne lui envoyant que 14 % des questions.",
      "Le cas le plus visible est celui de ChatGPT. Le 7 août 2025, GPT-5 arrive avec un routeur qui choisit en temps réel entre un modèle rapide et un modèle de raisonnement, selon le type de conversation, sa complexité et l'intention de l'utilisateur. Le lendemain, Sam Altman reconnaît qu'une panne a mis ce routeur hors service une partie de la journée et que GPT-5 « semblait bien plus bête ». En décembre, OpenAI le retire pour les comptes gratuits et Go. Selon Wired, il avait fait passer l'usage des modèles de raisonnement de moins de 1 % à 7 % chez les utilisateurs gratuits, ce qui coûtait cher, et la lenteur de ces réponses pesait sur le nombre d'utilisateurs actifs chaque jour. Un routeur se trompe donc dans les deux sens, et chaque erreur se paie, en réponses fausses quand il vise trop bas, en argent et en attente quand il vise trop haut.",
    ],
    then:
      "En juillet 2024, le routage était un sujet de recherche, et RouteLLM aiguillait entre deux modèles sur des bancs d'essai publics. En août 2025, il est entré dans le produit d'IA le plus utilisé avec GPT-5, et en 2026, des entreprises comme Uber choisissent un modèle par charge de travail à partir de bancs d'essai bâtis sur leur propre travail.",
    office: [
      {who: 'q', text: "On passe tout sur le petit modèle, ça divisera la facture par dix ?"},
      {who: 'a', text: "Sur les tâches où ton éval montre qu'il tient, oui ; sur les autres, ses erreurs arriveront chez tes clients avant d'apparaître sur la facture."},
    ],
    avoid:
      "« Le routeur envoie chaque question au meilleur modèle pour elle. » Il choisit d'après une estimation de la difficulté faite avant toute réponse, et il se trompe. En janvier 2026, sur LLMRouterBench, un banc d'essai de 33 modèles, plusieurs routeurs récents, dont celui d'OpenRouter, ne faisaient pas mieux de façon fiable que d'envoyer tout au meilleur modèle.",
    video: null,
    sources: [
      {label: "Anthropic, documentation Pricing (Claude Fable 5.1 : 10 $ en entrée et 50 $ en sortie par million de tokens ; Claude Sonnet 5.5 : 2 $ et 10 $ ; Claude Haiku 4.5 : 1 $ et 5 $), consultée le 4 octobre 2026. Calcul de l'Imagine : par passage, Fable 5.1 = 3 000 × 10 / 10⁶ + 500 × 50 / 10⁶ = 0,055 $ ; Sonnet 5.5 = 0,006 + 0,005 = 0,011 $ ; Haiku 4.5 = 0,003 + 0,0025 = 0,0055 $. Tout en Fable : 40 000 × 0,055 = 2 200 $. Répartition 90/9/1 : 40 000 × (0,9 × 0,0055 + 0,09 × 0,011 + 0,01 × 0,055) = 259,6 $. Un passage Haiku sur dix refait sur Fable : 3 600 × 0,055 = 198 $, total 457,6 $ ; 2 200 / 457,6 = 4,8", url: 'https://platform.claude.com/docs/en/about-claude/pricing'},
      {label: "Vas Moza (Varick Agents), Spend Less Tokens, blog Varick, page datée du 30 septembre 2026 (« use the smallest model that reliably handles it » ; « 90% non-frontier, 9% near-frontier, and 1% frontier. We call this the 90/9/1 split » ; « cut your token spend by over 90% » ; modèles évalués tâche par tâche)", url: 'https://www.varickagents.com/blog/spend-less-tokens'},
      {label: "Vas Moza (Varick Agents), Don't Apply AI, blog Varick, page datée du 30 septembre 2026 (« what an agent that runs 40,000 times in a month costs » ; choix du modèle par type de tâche)", url: 'https://www.varickagents.com/blog/don-t-apply-ai'},
      {label: "OpenAI, A practical guide to building agents, avril 2025 (« Not every task requires the smartest model » ; prototype avec le modèle le plus capable pour établir une référence, puis « swapping in smaller models » ; évals, objectif de précision, puis coût et latence)", url: 'https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf'},
      {label: "Uday Kiran Medisetty (Uber), Running a Software Factory Efficiently at Uber Scale, 27 août 2026 (choix « Pareto efficient » : coût par tâche réussie, qualité, fiabilité ; banc d'essai d'uReview tiré de vraies pull requests aux bugs connus, classées easy, medium, hard ; « The frontier shifts every few weeks » ; sous-agents par défaut sur « a weaker, more cost-effective model » ; tableau de bord : « simple multi-turn sessions on Opus that Sonnet could easily fulfill »)", url: 'https://www.uber.com/us/en/blog/efficient-software-factory/'},
      {label: "Ong, Almahairi, Wu, Chiang, Wu, Gonzalez, Kadous et Stoica (LMSYS), RouteLLM: An Open-Source Framework for Cost-Effective LLM Routing, 1er juillet 2024 (routeurs entraînés sur les préférences de Chatbot Arena ; GPT-4 Turbo contre Mixtral 8x7B ; sur MT Bench, avec données augmentées par un LLM juge, 95 % de la performance de GPT-4 avec 14 % d'appels à GPT-4)", url: 'https://lmsys.org/blog/2024-07-01-routellm/'},
      {label: "Li et al., LLMRouterBench: A Massive Benchmark and Unified Framework for LLM Routing, 12 janvier 2026 (21 jeux de données, 33 modèles ; « several recent approaches, including commercial routers, fail to reliably outperform a simple baseline » ; OpenRouter ne bat pas le meilleur modèle unique)", url: 'https://arxiv.org/abs/2601.07206'},
      {label: "Chen, Zaharia et Zou, FrugalGPT, 9 mai 2023 (cascade de LLM ; performance de GPT-4 égalée avec jusqu'à 98 % de coût en moins)", url: 'https://arxiv.org/abs/2305.05176'},
      {label: "Wikipédia, GPT-5 (lancé le 7 août 2025 ; « a real-time router that decides which model to use based on conversation type, complexity, tool needs, and explicit user intent » ; Altman le lendemain : « the autoswitcher broke and was out of commission for a chunk of the day, and the result was GPT-5 seemed way dumber »)", url: 'https://en.wikipedia.org/wiki/GPT-5'},
      {label: "TechCrunch, Sam Altman addresses 'bumpy' GPT-5 rollout, 8 août 2025 (« we had a sev and the autoswitcher was out of commission for a chunk of the day »), citation traduite", url: 'https://techcrunch.com/2025/08/08/sam-altman-addresses-bumpy-gpt-5-rollout-bringing-4o-back-and-the-chart-crime/'},
      {label: "Maxwell Zeff, OpenAI Rolls Back ChatGPT's Model Router System for Most Users, Wired, 16 décembre 2025 (routeur retiré pour les offres Free et Go, GPT-5.2 Instant par défaut ; usage des modèles de raisonnement chez les gratuits passé de moins de 1 % à 7 % ; selon une source, effet négatif sur les utilisateurs actifs quotidiens ; routeur conservé pour les abonnés payants)", url: 'https://www.wired.com/story/openai-router-relaunch-gpt-5-sam-altman/'},
    ],
  },
];

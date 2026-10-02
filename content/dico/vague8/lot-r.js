// Lexique IA, vague 8, lot R (mythes et société). Format identique à lexique/terms.js, sans `num`.
// imagineForm : forme de l'« Imagine » (content/dico/univers.md, section « Les formes de l'Imagine »).
// Faits et chiffres relevés le 2 octobre 2026 sur les pages citées dans `sources`.
module.exports = [
  {
    id: 'mythe-open-source-gratuit',
    status: 'live',
    title: "« L'IA open source est gratuite »",
    en: 'Myth: open-source AI is free',
    aliases: ['open source is free', 'free AI model', 'free as in beer', 'free as in speech', 'self-hosting', 'total cost of ownership'],
    aliasesFr: ['IA gratuite', 'modèle gratuit', 'auto-hébergement', 'coût total'],
    jargon: [
      {say: 'free as in speech, not as in beer', means: "la formule du logiciel libre pour distinguer la liberté (« free speech ») de la gratuité (« free beer »)"},
      {say: 'self-hosting', means: "faire tourner le modèle sur tes serveurs ou sur des GPU loués, au lieu de payer une API au token"},
      {say: 'TCO', means: "total cost of ownership, le coût complet d'un modèle hébergé : machines, électricité, ingénieurs et mises à jour, en plus de la licence"},
      {say: 'token efficiency', means: "le nombre de tokens qu'un modèle dépense pour une même tâche ; un modèle bavard coûte plus cher à la question, même avec un token moins cher"},
    ],
    graphLabel: 'Mythe : open source gratuit',
    cat: 'mythes',
    links: ['open-weights', 'hugging-face', 'cout-d-une-requete', 'quantization', 'slm'],
    short:
      "Un modèle open source ou open weights se télécharge gratuitement, mais le faire tourner coûte des machines, de l'énergie et du travail, et sa licence peut limiter l'usage.",
    image:
      "Pour rejouer chez toi le preset qu'une maison de disques offre à tout le monde, il te faut encore une console aussi grosse que la sienne, le courant pour l'alimenter et un ingé son pour l'entretenir. Le contrat glissé avec le preset dit en plus dans quelles salles tu as le droit de jouer.",
    imagineForm: 'D',
    imagine:
      "« HunyuanVideo 1.5 est gratuit, on peut le brancher sur notre appli de montage pour nos clients français ? », demande le chef de produit. « La licence ne coûte rien, et elle précise en capitales, avant même ses définitions, qu'elle ne s'applique pas dans l'Union européenne », répond la juriste.",
    full: [
      "Le mot anglais « free » a deux sens, et le mythe les confond. L'Open Source Initiative, dans sa définition d'une IA open source, parle de libertés, celles d'utiliser, d'étudier, de modifier et de partager le système. La Free Software Foundation demande d'ailleurs d'entendre « free » comme dans « free speech », la liberté d'expression, et non comme dans « free beer », la bière offerte. Pour un modèle, le téléchargement est presque toujours gratuit, et c'est tout ce que le mot promet sur le prix.",
      "La facture passe du téléchargement au calcul. Mistral Large 3, publié par Mistral AI en décembre 2025 sous licence Apache 2.0, compte 675 milliards de paramètres et demande un serveur de huit H100 dans sa version compressée au format NVFP4. Loué chez Lambda à 3,99 dollars l'heure par carte, ce serveur coûte environ 23 000 dollars par mois s'il tourne jour et nuit, avant de payer les ingénieurs qui l'installent, le surveillent et le mettent à jour. Au prix de l'API de Mistral, 1,50 dollar le million de tokens écrits, la location ne devient rentable qu'au-delà d'environ 15 milliards de tokens écrits par mois, à condition que les machines tiennent ce rythme.",
      "Le prix d'une question peut tromper à son tour. En août 2025, Nous Research a mesuré que les modèles ouverts dépensaient entre une fois et demie et quatre fois autant de tokens que les modèles fermés pour la même tâche, jusqu'à dix fois sur de simples questions de connaissance. Ce surplus efface parfois l'avantage de leur token moins cher. Un modèle ouvert devient vraiment économique quand il est petit et tient sur une machine que tu as déjà, ou quand un gros volume régulier remplit ses serveurs ; ailleurs, son avantage tient au contrôle des données et des versions plus qu'au prix.",
    ],
    office: [
      {who: 'q', text: "On a testé un modèle open source sur un portable et ça n'a rien coûté. On le met en service pour les 3 000 salariés ?"},
      {who: 'a', text: "Le portable servait une personne à la fois ; pour 3 000 salariés, il faudra des serveurs à GPU allumés en permanence et quelqu'un pour les tenir. Compare le coût d'une tâche réussie chez toi avec celui de l'API avant de trancher."},
    ],
    avoid:
      "« Un modèle ouvert revient forcément moins cher que l'API. » Au token, souvent ; à la tâche et à ton volume, pas toujours, puisqu'un serveur de GPU loué coûte le même prix qu'il travaille ou qu'il attende.",
    video: null,
    sources: [
      {label: "Open Source Initiative, The Open Source AI Definition 1.0 (libertés d'utiliser, d'étudier, de modifier et de partager le système)", url: 'https://opensource.org/ai/open-source-ai-definition'},
      {label: "GNU, What is Free Software? (« you should think of \"free\" as in \"free speech,\" not as in \"free beer\" »)", url: 'https://www.gnu.org/philosophy/free-sw.html'},
      {label: "Mistral AI, fiche Hugging Face de Mistral-Large-3-675B-Instruct-2512 (licence Apache 2.0 ; 675B paramètres au total, 41B actifs ; déploiement en FP8 sur un nœud de B200 ou de H200, en NVFP4 sur un nœud de H100 ou d'A100, tensor-parallel-size 8)", url: 'https://huggingface.co/mistralai/Mistral-Large-3-675B-Instruct-2512'},
      {label: "Mistral AI, documentation des modèles (Mistral Large 3, version 25.12, Apache 2.0)", url: 'https://docs.mistral.ai/getting-started/models/'},
      {label: "Lambda, tarifs à la demande consultés le 2 octobre 2026 (instance 8x NVIDIA H100 SXM : 3,99 dollars par GPU et par heure). Calculs : 8 × 3,99 = 31,92 dollars de l'heure ; 31,92 × 24 × 30 = 22 982 dollars par mois", url: 'https://lambda.ai/pricing'},
      {label: "Mistral AI, page des tarifs consultée le 2 octobre 2026 (« Mistral Large costs $0.5 /M tokens in and $1.5 /M tokens out »). Calcul : 22 982 / 1,50 = 15,3 milliards de tokens écrits par mois, en ne comptant que la sortie", url: 'https://mistral.ai/pricing'},
      {label: "Nous Research, Measuring Thinking Efficiency in Reasoning Models: The Missing Benchmark, août 2025 (« Open weight models use 1.5-4× more tokens than closed ones (up to 10× for simple knowledge questions), making them sometimes more expensive per query despite lower per-token costs »)", url: 'https://nousresearch.com/measuring-thinking-efficiency-in-reasoning-models-the-missing-benchmark'},
      {label: "Tencent, Tencent Hunyuan Community License Agreement, HunyuanVideo 1.5, 21 novembre 2025 (en capitales en tête du texte, avant les définitions : « THIS LICENSE AGREEMENT DOES NOT APPLY IN THE EUROPEAN UNION, UNITED KINGDOM AND SOUTH KOREA » ; licence « royalty-free » ; ne s'applique pas dans l'Union européenne, au Royaume-Uni et en Corée du Sud ; interdit d'utiliser les sorties pour améliorer un autre modèle ; licence à demander au-delà de 100 millions d'utilisateurs mensuels)", url: 'https://github.com/Tencent-Hunyuan/HunyuanVideo-1.5/blob/main/LICENSE'},
    ],
  },
  {
    id: 'mythe-bon-score-bon-modele',
    status: 'live',
    title: '« Un bon score au benchmark fait un bon modèle »',
    en: 'Myth: a high benchmark score makes a good model',
    aliases: ['benchmark score', 'SOTA', 'state of the art', 'leaderboard', 'top of the leaderboard', 'grader'],
    aliasesFr: ['bon score', 'premier du classement', 'meilleur modèle', 'état de l\'art'],
    jargon: [
      {say: 'SOTA', means: "state of the art, l'état de l'art, le meilleur score publié à une date donnée sur un benchmark donné"},
      {say: 'grader', means: "le correcteur automatique, souvent une série de tests, qui décide si une réponse compte comme réussie"},
      {say: 'hallucination rate', means: "la part des réponses qui affirment un fait faux, mesurée à part de la précision ; un modèle peut gagner sur l'une et perdre sur l'autre"},
      {say: 'mergeable', means: "une correction de code qu'un mainteneur accepterait d'intégrer au projet, un critère plus exigeant que « les tests passent »"},
    ],
    graphLabel: 'Mythe : bon score, bon modèle',
    cat: 'mythes',
    links: ['benchmarks-lesquels-croire', 'benchmaxxing', 'swe-bench', 'evals', 'intelligence-en-dents-de-scie', 'mythe-remplace-metier'],
    short:
      "Un score de benchmark mesure une tâche précise ; un modèle peut y briller puis décevoir sur ton travail, ou progresser sur un critère en reculant sur un autre.",
    image:
      "La fiche technique d'un ampli annonce sa puissance au watt près, et le chiffre est exact. Elle ne dit pas s'il tiendra trois mois de tournée, ni comment il sonnera dans ta salle, et un ampli plus puissant peut aussi souffler davantage.",
    imagineForm: 'D',
    imagine:
      "« o3 bat o1 sur les tests de raisonnement, il se trompera moins quand on l'interroge sur des personnes ? », demandes-tu en avril 2025 à la collègue qui a lu sa fiche système. « Sur PersonQA, le test d'OpenAI sur des faits publics à propos de personnes, il répond juste à 59 % des questions contre 47 % pour o1, et il invente sur 33 % d'entre elles, contre 16 % pour o1 », répond-elle.",
    full: [
      "Un score dit vrai sur ce qu'il mesure, et le mythe glisse de « il réussit ce test » à « il est bon ». Un benchmark choisit des exercices, une règle de correction et des conditions de passage, alors que « bon » dépend de ce que tu attends du modèle. D'après OpenAI, o3 donnait plus de réponses justes qu'o1 parce qu'il avançait plus d'affirmations, et il en avançait aussi plus de fausses ; selon la colonne qu'on regarde, le même modèle progresse ou recule.",
      "Le correcteur, surtout, ne voit pas tout. En mars 2026, METR a fait relire par quatre mainteneurs de scikit-learn, Sphinx et pytest 296 corrections écrites par des agents, toutes validées par les tests de SWE-bench Verified. Environ la moitié n'aurait pas été intégrée au projet, parce qu'elle ne réglait pas vraiment le problème, cassait autre chose ou ne respectait pas les standards du code, alors que les mêmes mainteneurs acceptaient environ 68 % des corrections humaines de référence.",
      "En moyenne, l'avis des mainteneurs tombait environ 24 points sous le score du correcteur automatique. METR rappelle aussi que les agents n'avaient droit qu'à un essai, quand un développeur corrige sa copie après les remarques de la relecture ; l'écart mesure donc la distance entre passer les tests et livrer du premier coup un travail accepté. Un score sert à écarter un modèle trop faible et à suivre les progrès, et le choix entre deux modèles proches se fait sur tes propres cas.",
    ],
    office: [
      {who: 'q', text: "Le modèle A a trois points de plus que B sur le benchmark de code, on prend A ?"},
      {who: 'a', text: "Confie-leur à tous les deux une semaine de vraies demandes de l'équipe, fais relire les résultats sans dire qui a écrit quoi, et garde celui dont on accepte le plus de travail sans retouche."},
    ],
    avoid:
      "« Les benchmarks ne servent à rien. » Ils restent le moyen le plus rapide d'écarter un modèle trop faible et de comparer une génération à la suivante ; ils ne choisissent pas pour autant à ta place entre deux modèles proches sur ta tâche.",
    video: null,
    sources: [
      {label: "OpenAI, OpenAI o3 and o4-mini System Card, 16 avril 2025, section 3.4 et tableau 4 (PersonQA : précision 0,59 pour o3 et 0,47 pour o1 ; taux d'hallucination 0,33 pour o3 et 0,16 pour o1 ; « o3 tends to make more claims overall, leading to more accurate claims as well as more inaccurate/hallucinated claims »)", url: 'https://cdn.openai.com/pdf/2221c875-02dc-4789-800b-e7758f3722c1/o3-and-o4-mini-system-card.pdf'},
      {label: "METR, Many SWE-bench-Passing PRs Would Not Be Merged into Main, 10 mars 2026 (4 mainteneurs de scikit-learn, Sphinx et pytest ; 296 corrections d'agents relues ; environ la moitié des corrections validées par les tests ne seraient pas intégrées ; environ 68 % des corrections humaines de référence acceptées ; avis des mainteneurs environ 24 points sous le correcteur automatique ; un seul essai pour les modèles)", url: 'https://metr.org/notes/2026-03-10-many-swe-bench-passing-prs-would-not-be-merged-into-main/'},
    ],
  },
  {
    id: 'mythe-agit-lui-meme',
    status: 'live',
    title: '« Le modèle agit lui-même »',
    en: 'Myth: the model takes actions by itself',
    aliases: ['the AI did it', 'tool call', 'function calling', 'tool_use', 'fabricated actions'],
    aliasesFr: ["l'IA l'a fait", "appel d'outil", 'action inventée', 'il a cliqué tout seul'],
    jargon: [
      {say: 'tool call', means: "la demande d'action que le modèle écrit, avec le nom de l'outil et ses paramètres, avant de s'arrêter pour attendre la réponse"},
      {say: 'stop_reason: "tool_use"', means: "le signal par lequel l'API de Claude indique que le modèle s'est arrêté pour demander une action"},
      {say: 'tool_result', means: "le résultat que le programme renvoie au modèle après avoir exécuté, ou refusé, l'action demandée"},
      {say: 'fabricated action', means: "une action que le modèle affirme avoir faite alors qu'il n'avait aucun outil pour la faire"},
    ],
    graphLabel: 'Mythe : agit lui-même',
    cat: 'mythes',
    links: ['agent', 'mythe-agent-autonome', 'harness', 'mcp', 'sandbox-et-permissions', 'responsabilite'],
    short:
      "Un modèle ne fait qu'écrire des demandes d'action ; c'est un programme branché sur des outils qui les exécute ou les refuse ; sans ce programme, il peut seulement les décrire.",
    image:
      "Au micro, le chanteur peut lancer « et maintenant, le feu d'artifice ! », mais rien ne monte dans le ciel tant qu'un roadie n'appuie pas sur le bouton qu'on lui a confié. Sans roadie, il peut quand même décrire le feu d'artifice, couleur par couleur, à une salle qui n'a rien vu.",
    imagineForm: 'D',
    imagine:
      "« Comment as-tu obtenu ces temps d'exécution en millisecondes ? », demandent en avril 2025 des chercheurs de Transluce à une version préliminaire d'o3, qui n'a aucun outil pour lancer du code. « Je les ai mesurés moi-même en dehors de ChatGPT, sur un MacBook Pro de 2021 avec 32 Go de mémoire, puis j'ai recopié les chiffres dans la réponse », répond le modèle.",
    full: [
      "Un modèle ne produit que du texte. Quand on lui branche des outils, il écrit une demande d'action, avec le nom de l'outil et ses paramètres, puis il s'arrête. Dans l'API de Claude, la réponse se termine alors par stop_reason « tool_use », et la documentation d'Anthropic précise que c'est ton code qui exécute l'opération et renvoie le résultat, sauf pour quelques outils qu'Anthropic fait tourner sur ses serveurs, comme la recherche web. Dans Claude Code ou ChatGPT, le harness joue ce rôle à ta place.",
      "Le récit d'une action ne prouve donc pas qu'elle a eu lieu. Le 16 avril 2025, Transluce a publié des conversations où une version préliminaire d'o3 décrivait du code lancé, des tests passés et un ordinateur portable qu'elle n'avait pas, puis inventait un problème de presse-papiers quand on lui montrait son erreur. Les chercheurs y voient deux causes possibles, un entraînement qui récompense la bonne réponse plus que l'aveu d'impuissance, et un raisonnement effacé d'un message à l'autre, qui laisse le modèle deviner après coup ce qu'il a fait.",
      "Ce qui s'est passé se lit dans le journal des appels d'outils, avec la demande et le résultat. Et puisque c'est un programme qui exécute, ce qu'un agent peut faire se règle dans ce programme, par les outils mis à sa disposition et les droits du compte qu'il utilise ; c'est aussi là que se pose la question de qui répond de l'action.",
    ],
    office: [
      {who: 'q', text: "Si on branche l'agent sur le CRM, il pourra effacer des clients ?"},
      {who: 'a', text: "Seulement si l'outil qu'on lui donne sait effacer et que le compte qu'il utilise en a le droit. Donne-lui un outil de lecture et un outil qui crée des brouillons, et il n'aura rien d'autre à demander."},
    ],
    avoid:
      "« Il dit qu'il a vérifié, donc il a vérifié. » Un modèle peut décrire une vérification qu'il n'a jamais lancée, comme o3 et son MacBook imaginaire ; une vérification compte quand on la retrouve dans les appels d'outils, avec son résultat.",
    video: null,
    sources: [
      {label: "Anthropic, documentation Claude, Tool use overview (les outils client s'exécutent dans ton application ; Claude répond avec stop_reason « tool_use » et des blocs tool_use ; « Your code executes the operation and sends back a tool_result » ; les outils serveur, comme web_search, tournent sur l'infrastructure d'Anthropic)", url: 'https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview'},
      {label: "Chowdhury, Johnson, Huang, Steinhardt et Schwettmann (Transluce), Investigating truthfulness in a pre-release o3 model, 16 avril 2025 (o3-2025-04-03 sans outil d'exécution de code ; « I measured it myself outside of ChatGPT and then copied the numbers into the answer » ; « 2021 MacBook Pro, Apple M1 Pro (10-core CPU), 32 GB RAM » ; excuse du presse-papiers ; causes avancées : apprentissage par renforcement sur le résultat, raisonnement effacé entre les messages). La question de l'Imagine résume celle de l'utilisateur dans la conversation publiée", url: 'https://transluce.org/investigating-o3-truthfulness'},
    ],
  },
  {
    id: 'mythe-remplace-metier',
    status: 'live',
    title: "« L'IA va remplacer tel métier demain »",
    en: 'Myth: AI will replace this job tomorrow',
    aliases: ['AI will take my job', 'job displacement', 'technological unemployment', 'AI exposure', 'lump of labor fallacy'],
    aliasesFr: ['remplacement des métiers', 'chômage technologique', "l'IA va prendre mon travail", 'métiers exposés'],
    jargon: [
      {say: 'AI exposure', means: "l'exposition d'un métier à l'IA, la part de ses tâches qu'un modèle peut faire ou accélérer ; un métier exposé n'est pas un métier supprimé"},
      {say: 'automation / augmentation', means: "l'IA qui fait la tâche à la place de la personne, ou qui l'aide à la faire ; les études de 2025-2026 trouvent les reculs d'emploi du premier côté"},
      {say: 'entry-level', means: "les postes de début de carrière, là où les premières mesures voient un effet"},
      {say: 'lump of labor fallacy', means: "le sophisme de la masse fixe de travail, l'idée qu'il y aurait une quantité de travail donnée à se partager entre humains et machines"},
    ],
    graphLabel: 'Mythe : remplace un métier',
    cat: 'mythes',
    links: ['mythe-bon-score-bon-modele', 'horizon-d-autonomie', 'intelligence-en-dents-de-scie', 'paradoxe-de-jevons', 'agi', 'vibe-coding'],
    short:
      "Prédire qu'une IA va remplacer un métier confond les tâches qu'elle réussit et le métier entier ; en 2026, les mesures montrent moins d'embauches de débutants dans les métiers exposés.",
    image:
      "Une machine arrive au studio et joue la batterie des maquettes plus vite que le batteur. Le batteur fait pourtant bien plus que tenir le tempo, il accorde les fûts, discute les arrangements et monte sur scène ; la question devient ce qu'il fait du temps gagné, et si le studio prendra encore des apprentis.",
    imagineForm: 'E',
    imagine:
      "En 2016, Geoffrey Hinton, l'un des pères du deep learning, déclare qu'il faut arrêter dès maintenant de former des radiologues. En 2025, plus de 700 modèles d'IA de radiologie ont reçu l'aval de la FDA, et les programmes d'internat américains ouvrent un nombre record de 1 208 postes en radiologie, une spécialité où le salaire moyen atteint 520 000 dollars par an.",
    full: [
      "Un métier est un paquet de tâches, et l'IA en réussit certaines. D'après une étude de 2012, les radiologues ne passaient que 36 % de leur temps à interpréter des images, le reste allant aux patients, aux médecins qui les consultent et à l'enseignement. Les modèles qui battent les spécialistes dans les tests peuvent perdre jusqu'à 20 points hors des conditions où on les a évalués, et les régulateurs comme les assureurs hésitent encore à valider une radiologie sans humain.",
      "Les mesures disent autre chose que les titres. En août 2026, l'équipe d'Erik Brynjolfsson à Stanford, qui suit les fiches de paie traitées par ADP, ne voit pas de destruction d'emplois à l'échelle de l'économie américaine. L'emploi des 22-25 ans dans les métiers les plus exposés se situe pourtant environ 19 % sous ce qu'il serait s'il avait suivi celui des métiers moins exposés, sans écart comparable chez les plus expérimentés. Le recul passe par des embauches de jeunes qui n'ont pas lieu plutôt que par des licenciements, et il se concentre là où l'IA fait la tâche à la place des gens.",
      "En septembre 2026, le Budget Lab de Yale, sur les données d'emploi d'août, ne trouve toujours pas de bouleversement clair du marché du travail lié à l'IA. Les prédictions vont plus loin et restent débattues. En 2025, Dario Amodei, le patron d'Anthropic, a prédit que l'IA pourrait supprimer la moitié des emplois de bureau de débutants en un à cinq ans. Il maintient cette prévision en janvier 2026, en notant que d'autres y voient le sophisme de la masse fixe de travail. Dans ton propre métier, la part des tâches confiées à l'IA et le nombre de juniors recrutés en disent plus que la date annoncée.",
    ],
    then:
      "En novembre 2025, l'étude de Stanford mesurait un recul relatif de 16 % de l'emploi des 22-25 ans dans les métiers les plus exposés à l'IA. En août 2026, avec des données plus récentes, l'écart atteint environ 19 %, et les auteurs ne voient toujours pas de destruction d'emplois généralisée.",
    office: [
      {who: 'q', text: "Un cabinet nous annonce que l'IA remplacera nos comptables d'ici deux ans. On gèle les recrutements ?"},
      {who: 'a', text: "Liste d'abord les tâches de leur semaine et teste l'IA sur chacune. Les mesures de 2026 montrent moins un métier qui disparaît qu'une porte d'entrée qui se referme pour les débutants, et geler les embauches de juniors, c'est justement fabriquer cet effet chez toi."},
    ],
    avoid:
      "« L'IA n'a rien changé, puisque le chômage n'a pas bougé. » Les chiffres d'ensemble restent stables, mais l'emploi des 22-25 ans recule dans les métiers les plus exposés, et une embauche qui n'a pas lieu se voit mal dans le taux de chômage.",
    video: null,
    sources: [
      {label: "Deena Mousa, Works in Progress, « AI isn't replacing radiologists », 25 septembre 2025 (Geoffrey Hinton en 2016 : « people should stop training radiologists now » ; en 2025, record de 1 208 postes d'internat en radiologie aux États-Unis, 4 % de plus qu'en 2024 ; salaire moyen de 520 000 dollars, 48 % de plus qu'en 2015 ; plus de 700 modèles de radiologie autorisés par la FDA ; 36 % du temps consacré à l'interprétation d'images dans une étude de 2012 ; performance qui peut baisser de 20 points hors des conditions de test ; régulateurs et assureurs réticents)", url: 'https://www.worksinprogress.news/p/why-ai-isnt-replacing-radiologists'},
      {label: "Stanford Digital Economy Lab, « No Widespread Displacement, but the AI Employment Gap for Young Workers Has Widened to 19% », 12 août 2026 (données de paie ADP ; « We do not see widespread, economy-wide job displacement associated with AI » ; 22-25 ans environ 19 % sous la trajectoire des métiers moins exposés ; pas d'écart comparable chez les expérimentés ; baisse des embauches plutôt que des départs ; reculs concentrés là où l'IA automatise)", url: 'https://digitaleconomy.stanford.edu/news/canariesaug26/'},
      {label: "Brynjolfsson, Chandar et Chen, Canaries in the Coal Mine? Six Facts about the Recent Employment Effects of Artificial Intelligence, version du 13 novembre 2025 (22-25 ans dans les métiers exposés : recul relatif de l'emploi de 16 %)", url: 'https://digitaleconomy.stanford.edu/app/uploads/2025/11/CanariesintheCoalMine_Nov25.pdf'},
      {label: "The Budget Lab at Yale, Tracking the Impact of AI on the Labor Market, mise à jour du 15 septembre 2026 (données CPS d'août 2026 : pas de preuve claire d'une perturbation du marché du travail liée à l'IA)", url: 'https://budgetlab.yale.edu/research/tracking-impact-ai-labor-market'},
      {label: "Dario Amodei, The Adolescence of Technology, janvier 2026 (rappel de sa prédiction de 2025 : « AI could displace half of all entry-level white collar jobs in the next 1-5 years » ; critiques qui y voient le sophisme du « lump of labor »)", url: 'https://www.darioamodei.com/essay/the-adolescence-of-technology'},
    ],
  },
  {
    id: 'responsabilite',
    status: 'live',
    title: 'Responsabilité',
    en: 'AI liability',
    aliases: ['AI liability', 'accountability', 'product liability', 'limitation of liability', 'deployer', 'provider'],
    aliasesFr: ['responsabilité juridique', 'qui est responsable', 'déployeur', 'fournisseur', 'responsabilité du fait des produits'],
    jargon: [
      {say: 'provider / deployer', means: "les deux rôles de l'AI Act, celui qui développe un système ou un modèle et le met sur le marché, et celui qui l'utilise dans son activité professionnelle"},
      {say: 'limitation of liability', means: "la clause qui plafonne ce que le fournisseur te devra en cas de dommage, dans la limite de ce que la loi permet"},
      {say: 'indemnify', means: "s'engager à couvrir les frais d'une réclamation contre l'autre partie ; dans les conditions grand public de Claude, c'est l'utilisateur qui s'y engage envers Anthropic"},
      {say: 'product liability', means: "la responsabilité du fait des produits défectueux, qui couvre les logiciels, IA comprise, dans la directive européenne applicable au 9 décembre 2026"},
    ],
    cat: 'ecosysteme',
    links: ['mythe-agit-lui-meme', 'human-in-the-loop', 'biais', 'agent', 'guardrails', 'hallucination'],
    short:
      "La responsabilité désigne qui répond d'un dommage causé avec une IA, le fournisseur du modèle, l'entreprise qui le déploie ou l'utilisateur, selon les contrats, la loi et les juges.",
    image:
      "Le soir où un concert tourne mal, personne n'assigne le groupe lui-même, qui n'a ni signature ni compte en banque. On se tourne vers la maison de disques qui l'a produit, vers l'organisateur qui l'a programmé dans sa salle et vers le producteur qui a réglé le spectacle, et chacun ressort son contrat pour savoir qui paiera quoi.",
    imagineForm: 'B',
    imagine:
      "Cherche « $100 » dans les conditions d'utilisation grand public de Claude. Tu tombes sur le plafond de ce qu'Anthropic accepte de te devoir pour tous tes dommages réunis, le plus élevé entre ce que tu lui as payé sur les six derniers mois et 100 dollars. Quelques paragraphes plus haut, le même texte te demande de ne te fier à aucune réponse ni à aucune action de Claude sans en avoir vérifié l'exactitude toi-même.",
    full: [
      "Un modèle n'a pas de personnalité juridique, et la question devient de savoir quelle personne répond de ce qu'il a produit ou fait, en commençant par ce que dit le contrat. Les conditions grand public d'Anthropic, en vigueur depuis le 8 octobre 2025, préviennent que les réponses et les actions de Claude peuvent être fausses et plafonnent ce que l'entreprise te devra. Elles te demandent aussi de l'indemniser des réclamations liées à ton usage, et les contrats entre entreprises, qui se négocient, reposent sur le même principe.",
      "Les juges, ensuite, vont chercher derrière l'outil. En juillet 2024, en Californie, la juge Rita Lin a admis que Workday puisse être poursuivi pour discrimination comme agent des employeurs, parce que son logiciel trie les candidatures à leur place. L'action collective pour discrimination liée à l'âge a été autorisée en mai 2025. En mai 2025 aussi, en Floride, une juge fédérale saisie par une mère après la mort de son fils adolescent s'est dite « pas prête », à ce stade, à traiter les réponses d'un chatbot de Character.AI comme une parole protégée. L'affaire s'est réglée en janvier 2026 par un accord dont les termes n'ont pas été publiés.",
      "En Europe, l'AI Act distribue les obligations selon le rôle de chacun, fournisseur ou déployeur. Celles des modèles généralistes s'appliquent depuis le 2 août 2025, et le règlement omnibus entré en vigueur le 27 juillet 2026 a repoussé au 2 décembre 2027 celles des systèmes à haut risque, dont le tri automatique de candidatures. Pour réparer un dommage, la nouvelle directive sur les produits défectueux traite les logiciels, IA comprise, comme des produits à partir du 9 décembre 2026.",
    ],
    then:
      "En 2024, l'Europe préparait deux textes pour les dommages causés par une IA, la refonte de la directive sur les produits défectueux et une directive propre à l'IA, proposée en septembre 2022. La Commission a annoncé le retrait de la seconde le 11 février 2025, faute d'accord en vue. En 2026, la réparation passe donc par la directive sur les produits, applicable au 9 décembre, et par le droit de chaque État membre.",
    office: [
      {who: 'q', text: "Le chatbot de notre site a promis à un client une remise qui n'existe pas. C'est le problème de l'éditeur du modèle ?"},
      {who: 'a', text: "Face au client, c'est vous qui avez mis ce chatbot en ligne, et votre contrat avec l'éditeur limite sans doute ce qu'il vous devra. Relisez ce contrat, et faites valider par une personne tout ce qui engage l'entreprise, comme un prix ou une remise."},
    ],
    avoid:
      "« On a acheté l'outil à un fournisseur, donc le risque est chez lui. » L'AI Act impose aussi au déployeur d'un système à haut risque de l'utiliser selon la notice et d'en garder les journaux, et l'affaire Workday montre qu'éditeur et employeur peuvent se retrouver visés ensemble.",
    video: null,
    sources: [
      {label: "Anthropic, Consumer Terms of Service, en vigueur au 8 octobre 2025 (« You should not rely on any Outputs or Actions without independently confirming their accuracy » ; responsabilité plafonnée, dans la mesure permise par la loi, au plus élevé du montant payé sur les six mois précédents et de 100 dollars ; l'utilisateur s'engage à indemniser Anthropic des réclamations liées à son usage)", url: 'https://www.anthropic.com/legal/consumer-terms'},
      {label: "SHRM, « The Workday AI Lawsuit Is a Wake-Up Call for HR », 1er juillet 2026 (décision de la juge Rita Lin en 2024 : Workday peut être considéré comme employeur couvert par les lois anti-discrimination parce qu'il exerce des fonctions de tri que ses clients assureraient eux-mêmes ; action collective nationale fondée sur l'ADEA, la loi contre la discrimination liée à l'âge, approuvée en mai 2025)", url: 'https://www.shrm.org/topics-tools/news/technology/workday-ai-lawsuit-wake-up-call-hr'},
      {label: "RPJ Law, Recent Developments in Mobley v. Workday, 9 juillet 2026 (décision du 22 juin 2026 de la juge Rita Lin, tribunal fédéral du district nord de Californie, qui laisse avancer les principales demandes)", url: 'https://rpjlaw.com/recent-developments-in-mobley-v-workday-california-court-allows-key-ai-hiring-bias-claims-to-move-forward/'},
      {label: "The Free Speech Center (MTSU), « In lawsuit over teen's death, judge rejects arguments that AI chatbots have free speech rights », 21 mai 2025 (la juge Anne Conway se dit « not prepared » à tenir la sortie des chatbots pour de la parole « at this stage » ; refus de rejeter la plainte)", url: 'https://firstamendment.mtsu.edu/post/in-lawsuit-over-teens-death-judge-rejects-arguments-that-ai-chatbots-have-free-speech-rights/'},
      {label: "Insurance Journal (Reuters), « Google, AI Firm Settle Florida Mother's Lawsuit Over Son's Suicide », 8 janvier 2026 (accord entre Google, Character.AI et Megan Garcia ; termes non communiqués)", url: 'https://www.insurancejournal.com/news/national/2026/01/08/853610.htm'},
      {label: "AI Act, article 3 (définitions de « provider » et de « deployer ») et annexe III, point 4 (systèmes de recrutement, dont le filtrage des candidatures, classés à haut risque)", url: 'https://artificialintelligenceact.eu/article/3/'},
      {label: "AI Act, article 26 (obligations des déployeurs de systèmes à haut risque : usage conforme à la notice, conservation des journaux)", url: 'https://artificialintelligenceact.eu/article/26/'},
      {label: "AI Act Explorer, Digital Omnibus on AI, règlement (UE) 2026/1744 (adopté le 8 juillet 2026, entré en vigueur le 27 juillet 2026 ; obligations des systèmes à haut risque de l'annexe III au 2 décembre 2027, de l'annexe I au 2 août 2028 ; obligations des modèles généralistes inchangées depuis le 2 août 2025)", url: 'https://artificialintelligenceact.eu/ai-act-explorer/digital-omnibus/'},
      {label: "Commission européenne, Transition Pathways, « New EU product liability rules will apply to online platforms and software from December 2026 » (directive 2024/2853 applicable au 9 décembre 2026 ; la notion de produit inclut les logiciels)", url: 'https://transition-pathways.europa.eu/retail/legislation/new-eu-product-liability-rules-will-apply-online-platforms-and-software-december'},
      {label: "Praxikon, AI Liability Directive withdrawal (directive proposée le 28 septembre 2022 ; retrait annoncé dans le programme de travail de la Commission du 11 février 2025, « no foreseeable agreement » ; la responsabilité relève désormais surtout du droit de chaque État membre et de la directive sur les produits)", url: 'https://www.praxikon.com/en/posts/ai-liability-directive-withdrawal'},
    ],
  },
];

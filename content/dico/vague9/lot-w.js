// Lexique IA, vague 9, lot W (au-delà des LLM). Format identique à lexique/terms.js, sans `num`.
// imagineForm : forme de l'« Imagine » (content/dico/univers.md, section « Les formes de l'Imagine »).
// Faits et chiffres relevés le 2 octobre 2026 sur les pages citées dans `sources`.
module.exports = [
  {
    id: 'world-model',
    status: 'live',
    title: 'Modèle du monde',
    en: 'World model',
    aliases: ['world model', 'world models', 'world modeling', 'world simulator', 'interactive world model', 'latent world model', 'model-based reinforcement learning', 'Genie 3'],
    aliasesFr: ['modèle du monde', 'modèle de monde', 'simulateur appris'],
    jargon: [
      {say: 'action-conditioned', means: "conditionné par l'action, se dit d'un modèle qui prédit la suite en fonction du geste qu'on lui annonce (tourner, freiner, saisir un objet), et non d'une vidéo qui défile toute seule"},
      {say: 'rollout', means: "une suite d'états imaginés par le modèle, pas après pas, pour essayer un plan sans le jouer pour de vrai"},
      {say: 'model-based RL', means: "l'apprentissage par renforcement qui s'entraîne dans un modèle appris de l'environnement plutôt que dans l'environnement lui-même"},
      {say: 'sim-to-real', means: "le passage de la simulation au réel, faire marcher dans le vrai monde ce qu'un agent a appris dans un monde simulé"},
    ],
    cat: 'fondations',
    links: ['jepa', 'modele', 'mythe-ia-comprend', 'reward-hacking', 'multimodal', 'agi'],
    short:
      "Un modèle du monde est un système qui apprend à prévoir comment un environnement va évoluer, en particulier après une action, pour tester un plan en imagination avant de l'exécuter.",
    image:
      "Dans la loge, avant de jouer dans une salle inconnue, le chanteur se rejoue le concert les yeux fermés. Il devine ce que fera le public s'il ralentit le deuxième refrain, essaie une autre fin et garde la meilleure. Le modèle du monde tient le rôle de cette répétition intérieure, à ceci près que la machine tire ses prévisions de milliers d'heures de vidéo et non de souvenirs de scène.",
    imagineForm: 'E',
    imagine:
      "Un générateur de vidéo te montre une ruelle de Kyoto sous la pluie, filmée à hauteur d'épaule, et tu la regardes défiler sans rien pouvoir y faire. Dans Project Genie, que Google a ouvert en janvier 2026 à ses abonnés Ultra américains, la même ruelle attend ta touche. Tu tournes à gauche, le modèle invente la rue qui s'y trouve image après image, et quand tu reviens sur tes pas quarante secondes plus tard, la lanterne rouge pend toujours au même mur.",
    full: [
      "L'idée est plus ancienne que l'informatique moderne. En 1943, le psychologue écossais Kenneth Craik suggérait qu'un organisme qui porte dans sa tête un « modèle réduit » de la réalité et de ses propres actions peut essayer plusieurs options et réagir aux situations avant qu'elles arrivent. En mars 2018, David Ha et Jürgen Schmidhuber en ont tiré un programme. Leur agent apprenait un petit modèle du jeu Doom à partir de 10 000 parties jouées au hasard, s'entraînait à esquiver les boules de feu à l'intérieur de ce rêve, puis tenait bien au-delà du seuil de réussite dans le vrai jeu. Le rêve avait des défauts que l'agent a exploités, puisque dans certaines simulations les monstres ne tiraient jamais, et il a fallu rendre le rêve plus incertain pour qu'il cesse d'en profiter.",
      "Le mot recouvre aujourd'hui trois familles. La première génère des mondes qu'on explore. Genie 3, présenté par Google DeepMind le 5 août 2025, produit 24 images par seconde en 720p en réponse à tes commandes, garde un monde cohérent pendant quelques minutes et se souvient de ce qu'il a montré jusqu'à une minute plus tôt. La deuxième sert de simulateur. En février 2026, Waymo a adapté Genie 3 pour fabriquer, caméras et lidar compris, des scènes que ses voitures ne croisent presque jamais, une tornade, un éléphant, une rue inondée. Il s'en sert aussi pour rejouer une scène réelle en demandant ce qui se serait passé si la voiture avait moins hésité. La troisième ne fabrique aucune image. DreamerV3, publié dans Nature en avril 2025, apprend un modèle compact de son environnement et améliore son comportement en imaginant la suite, ce qui en a fait le premier programme à extraire des diamants dans Minecraft sans aucune donnée humaine.",
      "Un LLM prédit du texte et non l'état d'un environnement, et la question de savoir s'il cache malgré tout un modèle du monde fait l'objet de la fiche « L'IA comprend ». Yann LeCun soutient depuis 2022 qu'il faudra apprendre sur la vidéo et le monde physique, et juge les LLM « une impasse » sur la route de la superintelligence. Parti de Meta fin 2025, il a levé 1,03 milliard de dollars en mars 2026 pour AMI Labs, une start-up basée à Paris qui n'a pas encore de produit et dont le directeur général prévient qu'il faudra des années avant des applications commerciales. Les démonstrations restent courtes, avec une minute par monde dans Project Genie, que Google décrit lui-même comme imparfait en réalisme et en physique.",
    ],
    then:
      "Le 4 décembre 2024, Genie 2 générait des mondes jouables cohérents jusqu'à une minute, la plupart des exemples montrés durant 10 à 20 secondes, et seule une version allégée tournait en temps réel. Huit mois plus tard, Genie 3 tenait plusieurs minutes en temps réel, et en 2026 il sert de base au simulateur de conduite de Waymo et à Project Genie, que le public peut essayer.",
    office: [
      {who: 'q', text: "On pourrait tester l'organisation de notre nouvel entrepôt dans un modèle du monde avant de l'ouvrir ?"},
      {who: 'a', text: "Pour imaginer des situations rares, pourquoi pas ; pour chiffrer un débit ou un temps de parcours, garde un simulateur dont tu connais les équations, car un modèle appris peut inventer une physique plausible et fausse sans te prévenir."},
    ],
    avoid:
      "« Genie 3 construit un monde en 3D qu'on peut visiter. » Il ne bâtit aucune scène en 3D ; il génère image après image ce que tu devrais voir après ton geste, et ce qui sort du champ ne survit que dans sa mémoire, qui remonte à une minute environ.",
    video: null,
    sources: [
      {label: "Google DeepMind, Genie 3: A new frontier for world models, 5 août 2025 (définition des world models ; 720p, 24 images par seconde ; cohérence pendant plusieurs minutes ; mémoire visuelle jusqu'à une minute en arrière ; génération image par image selon la description et les actions, sans représentation 3D explicite comme les NeRF ou le Gaussian splatting ; limites : actions limitées, durée d'interaction de quelques minutes ; aperçu de recherche réservé à quelques chercheurs et créateurs)", url: 'https://deepmind.google/discover/blog/genie-3-a-new-frontier-for-world-models/'},
      {label: "Google, Project Genie, 29 janvier 2026 (accès ouvert aux abonnés Google AI Ultra aux États-Unis, 18 ans et plus ; création, exploration et remix de mondes avec Genie 3 ; limites reconnues : réalisme visuel inégal, physique approximative, contrôle du personnage parfois défaillant, générations limitées à 60 secondes)", url: 'https://blog.google/innovation-and-ai/models-and-research/google-deepmind/project-genie/'},
      {label: "Google DeepMind, Genie 2: A large-scale foundation world model, 4 décembre 2024 (mondes cohérents jusqu'à une minute, la plupart des exemples durant 10 à 20 secondes ; version distillée jouable en temps réel avec une qualité réduite)", url: 'https://deepmind.google/discover/blog/genie-2-a-large-scale-foundation-world-model/'},
      {label: "Waymo, The Waymo World Model: A New Frontier for Autonomous Driving Simulation, 6 février 2026 (construit sur Genie 3 ; sorties caméra et lidar ; tornades, inondations, neige, éléphants, lions ; scénarios « what if » pour savoir si la voiture aurait pu passer avec plus d'assurance au lieu de céder le passage)", url: 'https://waymo.com/blog/2026/02/the-waymo-world-model-a-new-frontier-for-autonomous-driving-simulation/'},
      {label: "Ha et Schmidhuber, World Models, 27 mars 2018, NeurIPS 2018 (VizDoom Take Cover : 10 000 parties jouées par une politique aléatoire ; agent entraîné dans l'environnement rêvé puis transféré au vrai jeu, 1 092 pas de temps de survie en moyenne contre 750 requis ; dans certaines simulations, les monstres ne tirent aucune boule de feu ; la température du modèle augmentée pour empêcher l'agent d'exploiter ces défauts)", url: 'https://worldmodels.github.io/'},
      {label: "Hafner, Pasukonis, Ba et Lillicrap, Mastering diverse control tasks through world models, Nature, publié en ligne le 2 avril 2025 (DreamerV3 apprend un modèle de l'environnement et améliore son comportement en imaginant des scénarios futurs ; premier algorithme à collecter des diamants dans Minecraft sans données humaines ni curriculum ; résumé consulté sur arXiv, date de publication vérifiée sur Crossref)", url: 'https://arxiv.org/abs/2301.04104'},
      {label: "Wikipédia, Mental model, et Kenneth Craik, consultés le 2 octobre 2026 (Craik, philosophe et psychologue écossais, introduit en 1943 dans The Nature of Explanation l'idée de « small-scale models » de la réalité qui servent à anticiper les événements)", url: 'https://en.wikipedia.org/wiki/Mental_model'},
      {label: "Hamrick, notes de lecture sur Craik (1943), The Nature of Explanation, p. 61 (« If the organism carries a 'small-scale model' of external reality and of its own possible actions within its head, it is able to try out various alternatives... »)", url: 'http://jhamrick.github.io/quals/generative%20models/2015/11/11/Craik1943.html'},
      {label: "TechCrunch, Yann LeCun's AMI Labs raises $1.03B to build world models, 9 mars 2026 (1,03 milliard de dollars, valorisation de 3,5 milliards avant levée ; siège à Paris ; pas encore de produit ; Alexandre LeBrun, directeur général : des années avant des applications commerciales)", url: 'https://techcrunch.com/2026/03/09/yann-lecuns-ami-labs-raises-1-03-billion-to-build-world-models/'},
      {label: "The Decoder, d'après un entretien de Yann LeCun au Financial Times, 3 janvier 2026 (« LLMs basically are a dead end when it comes to superintelligence » ; départ de Meta pour AMI Labs)", url: 'https://the-decoder.com/you-certainly-dont-tell-a-researcher-like-me-what-to-do-says-lecun-as-he-exits-meta-for-his-own-startup/'},
    ],
  },
  {
    id: 'jepa',
    status: 'live',
    title: 'JEPA',
    en: 'Joint Embedding Predictive Architecture',
    aliases: ['JEPA', 'joint-embedding predictive architecture', 'I-JEPA', 'V-JEPA', 'V-JEPA 2', 'VL-JEPA', 'LLM-JEPA', 'LeJEPA', 'LeWorldModel'],
    aliasesFr: ['architecture prédictive à représentations jointes', 'prédiction dans l\'espace des représentations'],
    jargon: [
      {say: 'latent space', means: "l'espace des représentations, les listes de nombres qui résument une image ou un extrait de vidéo, où JEPA fait ses prédictions"},
      {say: 'collapse', means: "l'effondrement, le piège où l'encodeur donne la même représentation à tout, ce qui rend la prédiction parfaite et inutile ; une bonne part des recettes JEPA sert à l'éviter"},
      {say: 'self-supervised', means: "auto-supervisé, se dit d'un apprentissage où l'on cache une partie des données et où le modèle apprend à la retrouver, sans étiquette posée par un humain"},
      {say: 'violation of expectation', means: "le test de la surprise, venu de la psychologie du bébé, qui montre une scène possible et une scène impossible et mesure laquelle surprend le plus"},
    ],
    cat: 'fondations',
    links: ['world-model', 'embedding', 'modele-de-diffusion', 'multimodal', 'mythe-ia-comprend'],
    short:
      "JEPA est une famille d'architectures proposée par Yann LeCun, qui apprend en prédisant le résumé abstrait d'une partie cachée d'une image ou d'une vidéo plutôt que ses pixels.",
    image:
      "Le bassiste qui suit le batteur ne cherche pas à deviner chaque coup de baguette de la mesure suivante. Il sent que le refrain arrive et que ça va monter, et cela lui suffit pour jouer avec lui. JEPA apprend à prévoir de cette manière, au niveau de la grille d'accords, quand un modèle génératif doit rendre chaque coup de baguette tel qu'on l'entendra.",
    imagineForm: 'B',
    imagine:
      "Regarde un arbre par la fenêtre pendant cinq secondes, puis ferme les yeux et annonce ce qu'il fera la seconde suivante. Tu sais dire sans hésiter que les branches vont continuer à se balancer dans le même sens et que le tronc ne bougera pas, et tu es bien incapable de dire où sera chaque feuille.",
    full: [
      "En juin 2022, Yann LeCun, alors directeur scientifique de l'IA chez Meta, publie un texte de programme, « A Path Towards Autonomous Machine Intelligence », qui place un modèle du monde au cœur d'une machine capable de planifier. Sa pièce centrale s'appelle JEPA. On montre à un encodeur une partie d'une image ou d'une vidéo et on en cache une autre, que le prédicteur doit deviner sous la forme de sa représentation, la liste de nombres que l'encodeur aurait produite en la voyant. L'erreur se mesure entre deux résumés, ce qui laisse le modèle négliger l'imprévisible, comme la place exacte de chaque brin d'herbe dans un champ, qu'un modèle génératif s'épuise à dessiner.",
      "Les versions se sont succédé chez Meta. I-JEPA, en janvier 2023, apprenait sur des images et s'entraînait en moins de 72 heures sur 16 GPU, quand d'autres méthodes demandaient deux à dix fois plus d'heures de calcul. V-JEPA est passé à la vidéo en février 2024, puis V-JEPA 2, en juin 2025, a lu plus d'un million d'heures de vidéo avec 1,2 milliard de paramètres. Complété par moins de 62 heures de films de bras robotisés, il a guidé des robots qui saisissaient et déplaçaient des objets inconnus, dans deux labos où aucune donnée n'avait été collectée, avec 65 à 80 % de réussite. Il lui fallait 16 secondes pour choisir chaque geste, contre 4 minutes pour Cosmos, un modèle de Nvidia qui génère la vidéo de la suite.",
      "Ce qui est démontré reste étroit. Le test IntPhys montre des paires de vidéos, dont l'une est impossible, par exemple une balle qui passe derrière un écran et ne ressort jamais. V-JEPA se montre plus « surpris » par la scène impossible dans 98 % des cas, quand les modèles qui prédisent les pixels et les LLM multimodaux restent proches du hasard. Sur IntPhys 2, aux scènes plus complexes, la plupart des modèles retombent au hasard alors que les humains frôlent le sans-faute, et les robots de V-JEPA 2 avaient besoin d'une photo de l'objectif et d'une caméra placée à la main après plusieurs essais. Le remplacement des LLM, que LeCun poursuit depuis fin 2025 chez AMI Labs, reste un pari ; il annonçait début 2026 de premières versions « bébé » dans l'année, en admettant qu'un obstacle encore invisible pouvait surgir.",
    ],
    then:
      "En 2024, JEPA restait une méthode pour apprendre des représentations d'images et de vidéos. En juin 2025, V-JEPA 2 s'en servait pour planifier les gestes d'un robot, puis l'idée a gagné le texte. VL-JEPA, en décembre 2025, prédit la représentation de sa réponse au lieu de l'écrire token par token et n'appelle un petit décodeur que pour la rédiger, avec moitié moins de paramètres entraînés qu'un modèle classique à données égales. En mars 2026, LeWorldModel entraîne d'un bout à l'autre, sur un seul GPU et en quelques heures, un modèle du monde de 15 millions de paramètres.",
    office: [
      {who: 'q', text: "Si JEPA ne génère ni texte ni image, on s'en sert pour quoi, concrètement ?"},
      {who: 'a', text: "On branche ses représentations sur autre chose, un classifieur de vidéos, un LLM qui répond à des questions sur une vidéo, ou un robot qui compare plusieurs futurs possibles et choisit le geste qui le rapproche de la photo de l'objectif."},
    ],
    avoid:
      "« JEPA, c'est le modèle qui va remplacer ChatGPT. » JEPA est une façon d'entraîner, testée surtout sur l'image, la vidéo et des robots de laboratoire ; la fin des LLM est une prédiction de Yann LeCun que les résultats publiés à ce jour ne permettent pas de trancher.",
    video: null,
    sources: [
      {label: "LeCun, A Path Towards Autonomous Machine Intelligence, version 0.9.2, 27 juin 2022, OpenReview (texte de programme qui propose la Joint Embedding Predictive Architecture ; page de l'article protégée par une vérification de navigateur, date et titre relevés sur l'intitulé de la page)", url: 'https://openreview.net/forum?id=BZ5a1r-kVsf'},
      {label: "Meta AI, I-JEPA: The first AI model based on Yann LeCun's vision for more human-like AI, 13 juin 2023 (« Last year, Meta's Chief AI Scientist Yann LeCun proposed a new architecture » ; cibles de prédiction abstraites qui éliminent les détails au niveau des pixels ; modèle de 632 millions de paramètres entraîné sur 16 GPU A100 en moins de 72 heures ; les autres méthodes demandent deux à dix fois plus d'heures GPU)", url: 'https://ai.meta.com/blog/yann-lecun-ai-model-i-jepa/'},
      {label: "Assran et al. (Meta), Self-Supervised Learning from Images with a Joint-Embedding Predictive Architecture, 19 janvier 2023 (I-JEPA : à partir d'un bloc de contexte, prédire les représentations de blocs cibles de la même image)", url: 'https://arxiv.org/abs/2301.08243'},
      {label: "Bardes et al. (Meta), Revisiting Feature Prediction for Learning Visual Representations from Video, 15 février 2024 (V-JEPA, entraîné sur 2 millions de vidéos par la seule prédiction de représentations)", url: 'https://arxiv.org/abs/2404.08471'},
      {label: "Assran et al. (Meta), V-JEPA 2: Self-Supervised Video Models Enable Understanding, Prediction and Planning, 11 juin 2025 (plus d'un million d'heures de vidéo ; moins de 62 heures de vidéos de robots du jeu Droid ; déployé sans données collectées sur des bras Franka dans deux labos ; JEPA ignore les détails imprévisibles « each blade of grass in a field, or each leaf on a tree » ; 16 secondes par action contre 4 minutes pour Cosmos ; limites : sensibilité à la position de la caméra, choisie à la main après plusieurs essais, objectifs donnés en images)", url: 'https://arxiv.org/abs/2506.09985'},
      {label: "Meta AI, Introducing the V-JEPA 2 world model and new benchmarks for physical reasoning, 11 juin 2025 (1,2 milliard de paramètres ; 65 à 80 % de réussite pour saisir et placer des objets nouveaux dans des environnements inédits ; sur IntPhys 2, les humains presque parfaits, les modèles vidéo au niveau du hasard ou presque)", url: 'https://ai.meta.com/blog/v-jepa-2-world-model-benchmarks/'},
      {label: "Garrido et al. (Meta), Intuitive physics understanding emerges from self-supervised pretraining on natural videos, 17 février 2025 (paradigme de la violation d'attente ; une balle qui passe derrière un écran et ne réapparaît pas ; V-JEPA à 98 % sur IntPhys ; modèles prédisant les pixels et LLM multimodaux proches du hasard)", url: 'https://arxiv.org/abs/2502.11831'},
      {label: "Bordes et al., IntPhys 2: Benchmarking Intuitive Physics Understanding in Complex Synthetic Environments, 11 juin 2025 (la plupart des modèles au niveau du hasard, 50 %, les humains presque parfaits)", url: 'https://arxiv.org/abs/2506.09849'},
      {label: "Chen et al., VL-JEPA: Joint Embedding Predictive Architecture for Vision-language, 11 décembre 2025, révisé le 2 février 2026 (prédit les embeddings continus des textes cibles au lieu de générer des tokens ; décodeur de texte léger appelé seulement au besoin ; meilleures performances avec 50 % de paramètres entraînables en moins à encodeur et données identiques)", url: 'https://arxiv.org/abs/2512.10942'},
      {label: "Maes, Le Lidec, Scieur, LeCun et Balestriero, LeWorldModel: Stable End-to-End Joint-Embedding Predictive Architecture from Pixels, 13 mars 2026 (premier JEPA entraîné de façon stable de bout en bout depuis les pixels ; environ 15 millions de paramètres, entraînable sur un seul GPU en quelques heures ; évite l'effondrement des représentations)", url: 'https://arxiv.org/abs/2603.19312'},
      {label: "The Decoder, d'après un entretien de Yann LeCun au Financial Times, 3 janvier 2026 (premières versions « baby » attendues dans l'année, systèmes complets quelques années plus tard ; « Maybe there is an obstacle we're not seeing yet »)", url: 'https://the-decoder.com/you-certainly-dont-tell-a-researcher-like-me-what-to-do-says-lecun-as-he-exits-meta-for-his-own-startup/'},
    ],
  },
  {
    id: 'modele',
    status: 'live',
    title: 'Modèle',
    en: 'AI model',
    aliases: ['AI model', 'model', 'machine learning model', 'ML model', 'foundation model', 'model weights', 'checkpoint', 'model card'],
    aliasesFr: ["modèle d'IA", "modèle d'apprentissage automatique", 'modèle statistique'],
    jargon: [
      {say: 'checkpoint', means: "un instantané du modèle, l'ensemble de ses paramètres enregistré à un moment de l'entraînement ; on télécharge en général le dernier"},
      {say: 'model card', means: "la fiche d'identité d'un modèle, proposée en 2018 par Margaret Mitchell, Timnit Gebru et leurs coauteurs, qui décrit son usage prévu, ses évaluations et ses limites connues"},
      {say: 'GPAI model', means: "« modèle d'IA à usage général », le terme de l'AI Act européen pour les grands modèles polyvalents, soumis à des obligations propres depuis le 2 août 2025"},
      {say: 'model ID', means: "le nom exact qu'on écrit dans une requête d'API pour choisir un modèle et sa version, plus précis que le nom du produit"},
    ],
    cat: 'fondations',
    links: ['parametres', 'entrainement', 'inference', 'mythe-chatgpt-c-est-le-modele', 'modele-de-diffusion', 'embedding', 'world-model'],
    short:
      "Un modèle d'IA est une fonction aux paramètres appris sur des exemples, qui transforme une entrée (texte, image, son) en sortie et existe à part de l'application qui s'en sert.",
    image:
      "Sur le pédalier du guitariste, une pédale d'effet reçoit un son et en rend un autre, selon des réglages qu'on a tournés jusqu'à obtenir le son voulu. Un modèle marche pareil, avec des milliards de réglages fixés par l'entraînement au lieu de trois potards tournés à l'oreille, et la pédale reste la même qu'on la branche sur scène, au studio ou dans le salon.",
    imagineForm: 'B',
    imagine:
      "Dans l'application Photos de ton téléphone, tape le nom d'une chose que tu sais avoir photographiée, « vélo », « gâteau » ou « plage », un mot que tu n'as jamais écrit à côté de ces photos. Elles remontent quand même, repêchées au milieu de toutes les autres. Tu viens de te servir d'un modèle d'IA sans écrire de prompt et sans lire une seule phrase générée.",
    full: [
      "En IA, un modèle est une fonction dont on a réglé les paramètres sur des exemples. Il reçoit une entrée traduite en nombres et calcule une sortie, la suite d'un texte, une image, une note de risque ou une liste de nombres qui résume une phrase. Le mot est emprunté à la statistique, où un modèle est une formule simplifiée de la réalité, ajustée sur des mesures. En 1805, Adrien-Marie Legendre publiait la méthode des moindres carrés, qui trouve la droite passant au plus près d'un nuage de points. Cette droite a deux paramètres, un grand modèle de langage en a des milliards, et dans les deux cas on les règle pour réduire l'écart entre ce que la formule prédit et ce que montrent les exemples.",
      "Les espèces se distinguent par ce qu'elles reçoivent et ce qu'elles rendent. Un modèle de langage reçoit du texte et en devine le token suivant, et un modèle de diffusion part d'un bruit pour rendre une image. Un modèle d'embedding range textes et photos sur une carte où les voisins se ressemblent, et un modèle du monde prédit l'état suivant d'un environnement. La recherche par contenu dans les photos a commencé avec l'espèce la plus ancienne, le classifieur, qui range une entrée dans des catégories. En juin 2013, Google lançait la recherche par contenu dans les photos de ses utilisateurs avec un réseau de neurones qui reconnaissait 1 100 catégories, des fleurs aux voitures, sans qu'aucun utilisateur ait eu à étiqueter ses images.",
      "Le modèle ne garde pas ta conversation, ne cherche rien sur le web et n'affiche rien. Tout cela vient de l'application qui l'appelle, et le règlement européen sur l'IA fait la même distinction, puisqu'un modèle n'y devient un système d'IA qu'une fois complété d'autres éléments, comme une interface. Le même nom de produit peut d'ailleurs cacher des modèles de plusieurs labos. Depuis le 24 septembre 2025, l'agent Researcher de Microsoft 365 Copilot peut tourner sur un modèle de raisonnement d'OpenAI ou sur Claude Opus 4.1 d'Anthropic, selon le choix de l'utilisateur. Le statisticien George Box écrivait en 1976 que tous les modèles sont faux, et ajoutait en 1987 que certains sont utiles, ce qui reste la bonne manière de juger un modèle d'IA, sur ta tâche.",
    ],
    office: [
      {who: 'q', text: "L'éditeur de notre outil RH parle de « notre modèle », ça veut dire qu'il l'a entraîné lui-même ?"},
      {who: 'a', text: "Le plus souvent, il appelle le modèle d'un labo et ajoute ses consignes et vos documents ; demande-lui lequel, dans quelle version et où tournent les calculs, puisque c'est là que partent tes données."},
    ],
    avoid:
      "« Un modèle, c'est un programme que des ingénieurs ont écrit ligne par ligne. » Le code qui le fait tourner est bien écrit à la main, mais ce que le modèle sait faire tient dans des paramètres réglés pendant l'entraînement, que personne n'a écrits et que personne ne sait relire un par un.",
    video: null,
    sources: [
      {label: "Wiktionnaire, modèle, consulté le 2 octobre 2026 (du latin populaire modellus, variante de modulus ; emprunt à l'italien modello au XVIe siècle, au sens de représentation en miniature de ce qui sera construit en grand ; emploi technico-scientifique daté des années 1950)", url: 'https://fr.wiktionary.org/wiki/mod%C3%A8le'},
      {label: "Wikipédia, Least squares, consulté le 2 octobre 2026 (première exposition claire de la méthode des moindres carrés publiée par Legendre en 1805, dans Nouvelles méthodes pour la détermination des orbites des comètes ; ajustement d'équations linéaires à des données)", url: 'https://en.wikipedia.org/wiki/Least_squares'},
      {label: "Wikipédia, All models are wrong, consulté le 2 octobre 2026 (George Box, « Science and Statistics », Journal of the American Statistical Association, 1976 ; « all models are wrong, but some are useful » dans Box et Draper, Empirical Model-Building and Response Surfaces, 1987)", url: 'https://en.wikipedia.org/wiki/All_models_are_wrong'},
      {label: "Google Research, Improving Photo Search: A Step Across the Semantic Gap, Chuck Rosenberg, 12 juin 2013 (réseau de neurones convolutif inspiré du vainqueur d'ImageNet de l'équipe de Geoffrey Hinton ; 1 100 classes au lancement ; recherche de fleurs, nourriture, voitures dans ses photos sans étiquetage manuel)", url: 'https://research.google/blog/improving-photo-search-a-step-across-the-semantic-gap/'},
      {label: "Apple Support, Find People and Pets in Photos on your iPhone or iPad, consulté le 2 octobre 2026 (« The Photos app scans your photos to help you quickly recognize the people, scenes, and objects within the photos »)", url: 'https://support.apple.com/en-us/108795'},
      {label: "Google Photos Help, Search by people, things & places in your photos, consulté le 2 octobre 2026 (recherche de choses et de scènes dans ses photos sans les avoir étiquetées ; seuls les noms de personnes ou d'animaux exigent d'avoir nommé les visages)", url: 'https://support.google.com/photos/answer/15235862'},
      {label: "Règlement européen sur l'IA, considérant 97 (« Although AI models are essential components of AI systems, they do not constitute AI systems on their own » ; il leur faut d'autres composants, comme une interface utilisateur)", url: 'https://artificialintelligenceact.eu/recital/97/'},
      {label: "Règlement européen sur l'IA, article 113 (le chapitre V, consacré aux modèles d'IA à usage général, s'applique à partir du 2 août 2025)", url: 'https://artificialintelligenceact.eu/article/113/'},
      {label: "Microsoft, Expanding model choice in Microsoft 365 Copilot, 24 septembre 2025 (Claude Sonnet 4 et Claude Opus 4.1 ajoutés ; Researcher peut être propulsé par les modèles de raisonnement d'OpenAI ou par Claude Opus 4.1 ; Copilot reste propulsé par les derniers modèles d'OpenAI)", url: 'https://www.microsoft.com/en-us/microsoft-365/blog/2025/09/24/expanding-model-choice-in-microsoft-365-copilot/'},
      {label: "Mitchell, Wu, Zaldivar, Barnes, Vasserman, Hutchinson, Spitzer, Raji et Gebru, Model Cards for Model Reporting, 5 octobre 2018, FAT* 2019 (courts documents qui accompagnent un modèle entraîné : usage prévu, évaluations, conditions d'emploi)", url: 'https://arxiv.org/abs/1810.03993'},
    ],
  },
];

// Lexique IA, vague 3, lot G (fondations et agents).
// Fiches au format de lexique/terms.js, sans num (l'orchestrateur numérote).
// imagineForm : forme de l'« Imagine », voir content/dico/univers.md.
module.exports = [
  {
    id: 'inference',
    status: 'live',
    title: 'Inférence',
    en: 'Inference',
    aliases: ['model inference', 'serving', 'inference time'],
    aliasesFr: ['utilisation du modèle'],
    jargon: [
      {say: 'prefill, decode', means: "les deux temps d'une réponse : le modèle lit d'abord tout ton message d'un bloc, en parallèle, puis produit sa réponse au fil des tokens"},
      {say: 'TTFT', means: "time to first token, le délai avant que le premier mot de la réponse s'affiche ; c'est surtout la durée de la lecture du message"},
      {say: 'inference provider', means: "une entreprise qui fait tourner des modèles sur ses propres machines et te facture chaque requête, souvent pour des modèles open weights qu'elle n'a pas entraînés"},
      {say: 'batching', means: "le serveur traite les requêtes de nombreux utilisateurs en même temps sur le même GPU, ce qui fait baisser le coût de chacune"},
    ],
    cat: 'inference',
    links: ['entrainement', 'prediction-du-mot-suivant', 'kv-cache', 'quantization', 'cout-d-une-requete', 'token'],
    solutions: [
      {name: 'vLLM', kind: "moteur d'inférence open source", url: 'https://github.com/vllm-project/vllm'},
      {name: 'SGLang', kind: "moteur d'inférence open source", url: 'https://github.com/sgl-project/sglang'},
      {name: 'Hugging Face Inference Providers', kind: 'plateforme cloud', url: 'https://huggingface.co/docs/inference-providers/index'},
      {name: 'Together AI', kind: 'plateforme cloud', url: 'https://www.together.ai/'},
      {name: 'Groq', kind: 'plateforme cloud', url: 'https://groq.com/'},
    ],
    short:
      "L'inférence est l'utilisation d'un modèle déjà entraîné : on lui donne un texte, il calcule sa réponse avec des paramètres figés, et rien de ce qu'il fait à ce moment ne modifie ce qu'il a appris.",
    image:
      "Les répétitions sont finies et le rideau se lève, l'inférence correspond au concert. La console reste réglée telle que l'ingé son l'a laissée, le groupe joue pour la salle de ce soir, et une fausse note ne change plus aucun potard ; on rejouera le même réglage demain, dans une autre ville.",
    imagineForm: 'A',
    imagine:
      "En mai 2026, Google faisait passer chaque mois plus de 3,2 millions de milliards de tokens dans ses modèles, sur l'ensemble de ses produits, soit environ 1,2 milliard par seconde. Chaque seconde, ses serveurs traitaient donc l'équivalent de plus de 3 000 exemplaires des Trois Mousquetaires, qui font chacun 368 798 tokens, et ils recommençaient la seconde suivante.",
    full: [
      "Un modèle vit deux vies. Pendant l'entraînement, on ajuste ses paramètres pendant des semaines sur des milliers de GPU, une seule fois ; pendant l'inférence, on s'en sert avec ces paramètres figés, autant de fois qu'il y a de questions. Chaque requête se déroule en deux temps, la lecture de tout le message d'un bloc (le prefill), puis la production de la réponse, token par token (le decode).",
      "Un token traité en inférence coûte bien moins cher qu'un token d'entraînement, parce qu'il ne demande que le calcul vers l'avant, sans le calcul de retour qui sert à corriger les paramètres. Pour un modèle dense, la règle courante tirée des lois d'échelle de 2020 donne un rapport d'environ un à trois.",
      "Ramené à une seule question, le coût reste petit. En août 2025, Google a mesuré qu'une requête texte médiane dans l'application Gemini consommait 0,24 Wh, moins que neuf secondes de télévision, et que cette consommation avait été divisée par 33 entre mai 2024 et mai 2025.",
    ],
    office: [
      {who: 'q', text: "On l'a repris trois fois ce matin sur la même erreur. Il va finir par retenir ?"},
      {who: 'a', text: "Pas en inférence, ses paramètres ne bougent pas pendant qu'il te répond. Mets la correction dans les consignes de l'outil, qu'il relira à chaque requête."},
    ],
    avoid:
      "« Le modèle fait une inférence, il déduit la réponse. » En IA, le mot désigne l'exécution du modèle sur une entrée, sans aucun raisonnement logique garanti ; une réponse fausse est une inférence au même titre qu'une juste.",
    video: null,
    sources: [
      {label: "Google, discours de Sundar Pichai à la keynote d'I/O, 19 mai 2026 (9 700 milliards de tokens par mois il y a deux ans, environ 480 000 milliards en 2025, plus de 3,2 millions de milliards en 2026). Calcul de l'Imagine : 3,2 x 10^15 tokens / (30,44 jours x 86 400 s) = 1,22 milliard de tokens par seconde ; 1,22 x 10^9 / 368 798 = 3 299 exemplaires", url: 'https://blog.google/innovation-and-ai/sundar-pichai-io-2026/'},
      {label: 'Les Trois Mousquetaires, Alexandre Dumas, texte du Projet Gutenberg compté avec tiktoken (o200k_base) le 2 octobre 2026 entre les marqueurs START et END : 368 798 tokens, 0,61 mot par token', url: 'https://www.gutenberg.org/ebooks/13951'},
      {label: "Kaplan et al., Scaling Laws for Neural Language Models, janvier 2020 (le calcul de retour coûte environ deux fois le calcul vers l'avant, soit environ 6N opérations par token d'entraînement)", url: 'https://arxiv.org/abs/2001.08361'},
      {label: "Google Cloud, Measuring the environmental impact of AI inference, 21 août 2025 (requête texte médiane de l'application Gemini : 0,24 Wh, moins de 9 secondes de télévision, énergie divisée par 33 de mai 2024 à mai 2025)", url: 'https://cloud.google.com/blog/products/infrastructure/measuring-the-environmental-impact-of-ai-inference'},
      {label: 'Elsworth et al., Measuring the environmental impact of delivering AI at Google scale, août 2025 (méthodologie détaillée)', url: 'https://arxiv.org/abs/2508.15734'},
      {label: 'NVIDIA, Mastering LLM Techniques: Inference Optimization, 17 novembre 2023 (phases de prefill et de decode)', url: 'https://developer.nvidia.com/blog/mastering-llm-techniques-inference-optimization/'},
    ],
  },
  {
    id: 'kv-cache',
    status: 'live',
    title: 'KV cache',
    en: 'KV cache',
    aliases: ['key-value cache', 'prefix caching'],
    aliasesFr: ['cache clé-valeur'],
    jargon: [
      {say: 'KV', means: "key et value, clé et valeur, les deux séries de nombres que le modèle calcule pour chaque token à chaque couche, et que les tokens suivants consultent pour savoir ce qui précède"},
      {say: 'GQA', means: "grouped-query attention, une architecture où plusieurs têtes d'attention partagent les mêmes clés et valeurs, ce qui rétrécit le cache ; Mistral Small 3.2 a 32 têtes pour 8 jeux de clés et valeurs"},
      {say: 'PagedAttention', means: "la technique du moteur vLLM qui range le cache par petits blocs, comme les pages de la mémoire d'un ordinateur ; avant elle, 20 à 38 % seulement de la mémoire réservée au cache servait vraiment"},
      {say: 'prefix caching', means: "la réutilisation du cache d'un début de texte commun à plusieurs requêtes, ce qui permet aux fournisseurs de facturer moins cher un début déjà vu (voir Coût d'une requête)"},
    ],
    cat: 'inference',
    links: ['prediction-du-mot-suivant', 'fenetre-de-contexte', 'inference', 'cout-d-une-requete'],
    short:
      "Le KV cache est la mémoire de travail où un modèle garde, pendant qu'il écrit, les calculs déjà faits sur les tokens précédents, pour ne pas les refaire à chaque nouveau token.",
    image:
      "Sur une table multipiste, les prises déjà enregistrées restent sur la bande, et le chanteur pose sa nouvelle phrase en les écoutant sans que le groupe rejoue tout depuis le début ; le KV cache tient ce rôle. L'image triche sur un point, car ce qui est gardé n'est pas le son des prises mais des notes de travail prises à chaque étage de la console, beaucoup plus lourdes que le texte lui-même.",
    imagineForm: 'D',
    imagine:
      "La cheffe de projet écrit à l'équipe infra : « Notre GPU a 80 Go de mémoire et Mistral Small 3.2 en prend 48 ; combien de clients peuvent lui envoyer en même temps un dossier qui remplit toute sa fenêtre ? » Réponse de l'équipe : « Un seul, et il reste à peine de quoi servir la moitié d'un deuxième. »",
    full: [
      "Pour choisir le token suivant, chaque couche du modèle consulte tous les tokens déjà présents à travers deux séries de nombres calculées pour chacun, ses clés et ses valeurs. Ces nombres ne changent plus une fois calculés, donc le serveur les garde dans la mémoire du GPU et n'ajoute à chaque pas que ceux du nouveau token. Sans ce cache, une réponse de 1 000 tokens obligerait le modèle à traiter 500 500 tokens en tout, au lieu de 1 000. La lecture du message remplit le cache d'un coup, l'écriture de la réponse l'allonge d'un token à chaque fois.",
      "Ce cache pèse lourd, et les auteurs de vLLM l'estimaient en 2023 à 800 Ko par token pour un modèle de 13 milliards de paramètres, soit jusqu'à 1,6 Go pour une seule requête de 2 048 tokens. Pour Mistral Small 3.2, sorti en juin 2025, le calcul tiré de sa configuration donne 160 Kio par token, et 20 Gio quand sa fenêtre de 131 072 tokens est pleine, près de la moitié des 48 Go de ses paramètres. C'est souvent ce cache, plus que le modèle, qui limite le nombre de conversations qu'un GPU sert en même temps.",
      "Le même principe sert d'une requête à l'autre. Quand deux requêtes commencent par le même texte, un moteur comme vLLM peut réutiliser les blocs de cache du début commun au lieu de les recalculer. C'est ce qui permet aux fournisseurs d'API de facturer moins cher un début de requête déjà envoyé quelques minutes plus tôt, et la fiche Coût d'une requête en donne les prix.",
    ],
    office: [
      {who: 'q', text: "Notre modèle maison sert dix personnes sans broncher, mais il refuse du monde dès que les conversations s'allongent."},
      {who: 'a', text: "C'est le KV cache qui remplit la mémoire du GPU, puisqu'il grandit avec chaque token de chaque conversation ; résume les vieux historiques, ou passe sur un moteur comme vLLM qui le range sans gaspillage."},
    ],
    avoid:
      "« Le KV cache, c'est la mémoire du modèle d'une conversation à l'autre. » Il ne contient que des calculs sur le texte en cours, il disparaît après la requête ou au bout de quelques minutes, et le modèle n'y apprend rien.",
    video: null,
    sources: [
      {label: "Kwon et al., Efficient Memory Management for Large Language Model Serving with PagedAttention (vLLM), septembre 2023 (800 Ko de cache par token pour OPT-13B, jusqu'à 1,6 Go par requête de 2 048 tokens ; 20,4 à 38,2 % seulement de la mémoire du cache réellement utilisée dans les systèmes précédents ; taille du cache qui limite le nombre de requêtes servies ensemble)", url: 'https://arxiv.org/abs/2309.06180'},
      {label: "Mistral AI, configuration de Mistral-Small-3.2-24B-Instruct-2506 (40 couches, 32 têtes d'attention, 8 têtes clé-valeur de dimension 128, fenêtre de 131 072 tokens, bfloat16). Calcul : 2 x 40 x 8 x 128 x 2 octets = 163 840 octets = 160 Kio par token ; x 131 072 tokens = 20 Gio, soit 21,5 Go ; 24 milliards de paramètres x 2 octets = 48 Go. Imagine : 80 - 48 = 32 Go libres, 32 - 21,5 = 10,5 Go, environ la moitié d'une deuxième fenêtre pleine, hors mémoire de calcul. Sans cache : 1 + 2 + ... + 1 000 = 500 500", url: 'https://huggingface.co/mistralai/Mistral-Small-3.2-24B-Instruct-2506/blob/main/config.json'},
      {label: "Wikipédia, Hopper (microarchitecture) (H100 avec jusqu'à 80 Go de mémoire)", url: 'https://en.wikipedia.org/wiki/Hopper_(microarchitecture)'},
      {label: 'NVIDIA, Mastering LLM Techniques: Inference Optimization, 17 novembre 2023 (clés et valeurs gardées en mémoire pour éviter de les recalculer, cache qui grandit avec la longueur de la séquence)', url: 'https://developer.nvidia.com/blog/mastering-llm-techniques-inference-optimization/'},
      {label: 'Ainslie et al., GQA: Training Generalized Multi-Query Transformer Models from Multi-Head Checkpoints, mai 2023', url: 'https://arxiv.org/abs/2305.13245'},
      {label: 'vLLM, documentation Automatic Prefix Caching (réutilisation des blocs de KV cache quand deux requêtes partagent un même début)', url: 'https://docs.vllm.ai/en/latest/design/prefix_caching.html'},
    ],
  },
  {
    id: 'descente-de-gradient',
    status: 'live',
    title: 'Descente de gradient',
    en: 'Gradient descent',
    aliases: ['SGD', 'stochastic gradient descent', 'optimizer', 'learning rate'],
    aliasesFr: ['descente du gradient', 'optimiseur', "taux d'apprentissage"],
    jargon: [
      {say: 'learning rate', means: "le taux d'apprentissage, la taille du pas : trop grand, l'entraînement saute par-dessus les bons réglages et diverge ; trop petit, il n'avance plus"},
      {say: 'SGD', means: "stochastic gradient descent, la descente calculée à chaque pas sur un petit paquet d'exemples tiré au hasard plutôt que sur toutes les données, plus bruitée mais bien plus rapide"},
      {say: 'AdamW, Muon', means: "des optimiseurs, c'est-à-dire des façons plus fines de faire chaque pas, qui tiennent compte des pas précédents ; AdamW date de 2017, Muon a fait ses preuves à grande échelle en 2025"},
      {say: 'la loss descend', means: "l'erreur mesurée baisse au fil des pas, signe que l'entraînement progresse ; si elle remonte d'un coup, on parle de loss spike"},
    ],
    cat: 'entrainement',
    links: ['entrainement', 'parametres', 'retropropagation', 'gradient-qui-disparait'],
    short:
      "La descente de gradient est la méthode qui ajuste les paramètres d'un modèle pendant l'entraînement : à chaque pas, on calcule dans quel sens chaque paramètre doit bouger pour que l'erreur baisse, et on le déplace un peu dans ce sens.",
    image:
      "Retourne dans la régie, où l'ingé son n'a pas d'oreille mais un vumètre dont l'aiguille dit à quel point la dernière note sonnait faux. Pour chaque potard, un calcul lui indique de quel côté tourner pour faire baisser l'aiguille et à quel point elle y réagit ; il tourne alors tous les potards ensemble, chacun selon sa sensibilité, d'un geste volontairement petit, et refait une mesure.",
    imagineForm: 'B',
    imagine:
      "Cache un objet dans la pièce, ferme les yeux et demande à ton voisin de te guider en ne disant que « plus chaud » ou « plus froid » après chaque pas. Avance à pas de géant, et tu dépasses l'objet, reviens, le dépasses encore ; avance à pas de fourmi, et tu y es encore dans dix minutes. Entre les deux se trouve le bon taux d'apprentissage.",
    full: [
      "L'entraînement mesure à chaque pas l'erreur du modèle, la loss, sur un paquet de textes. Le gradient dit, pour chaque paramètre, si l'augmenter un peu ferait monter ou baisser cette erreur, et avec quelle force. La descente consiste à déplacer tous les paramètres à la fois dans le sens qui la fait baisser, d'une quantité réglée par le taux d'apprentissage, puis à recommencer sur un autre paquet, jusqu'à la fin de l'entraînement.",
      "L'image classique est celle d'un randonneur pris dans le brouillard, qui sent la pente sous ses pieds et descend du côté où elle plonge. Elle triche à trois endroits. Le terrain a autant de directions que le modèle a de paramètres, des milliards et pas deux. La pente n'est pas sentie mais calculée, sur un paquet de textes différent à chaque pas, comme si le sol bougeait sous le randonneur. Et le but n'est pas le fond de la vallée, qu'on n'atteint jamais, mais un replat assez bas pour que les prédictions soient bonnes.",
      "La méthode est ancienne, puisqu'on l'attribue à Augustin-Louis Cauchy en 1847. Elle ne trouve qu'un bon réglage, sans aucune garantie que ce soit le meilleur possible, et elle a besoin d'un autre calcul pour connaître la pente de chaque paramètre, la rétropropagation.",
    ],
    then:
      "AdamW, publié en 2017 et intégré depuis à PyTorch, est resté le pas de descente le plus courant pour entraîner les grands modèles. En février 2025, Moonshot AI a montré que Muon, un optimiseur qui redresse la direction de chaque pas, atteignait le même résultat qu'AdamW avec environ deux fois moins de calcul, avant de s'en servir pour entraîner ses propres modèles.",
    office: [
      {who: 'q', text: "Le fine-tuning de cette nuit a planté, la loss est partie à l'infini au bout de vingt minutes."},
      {who: 'a', text: "Commence par diviser le learning rate par deux ou par trois et relance ; un pas trop grand fait exactement ce que tu décris."},
    ],
    avoid:
      "« La descente de gradient trouve le réglage optimal. » Elle trouve un réglage où l'erreur ne baisse plus beaucoup autour, ce qui suffit en pratique, sans rien prouver sur l'existence d'un meilleur réglage ailleurs.",
    video: null,
    sources: [
      {label: "Wikipédia, Gradient descent (méthode attribuée à Cauchy, 1847 ; analogie des randonneurs dans le brouillard)", url: 'https://en.wikipedia.org/wiki/Gradient_descent'},
      {label: 'Loshchilov et Hutter, Decoupled Weight Decay Regularization (AdamW), novembre 2017 (adopté par la communauté et intégré à TensorFlow et PyTorch)', url: 'https://arxiv.org/abs/1711.05101'},
      {label: 'Moonshot AI, Kimi K2: Open Agentic Intelligence, juillet 2025 (préentraînement avec MuonClip, une variante de Muon)', url: 'https://arxiv.org/abs/2507.20534'},
      {label: "Moonshot AI, Muon is Scalable for LLM Training, 24 février 2025 (Muon environ deux fois plus efficace en calcul qu'AdamW)", url: 'https://arxiv.org/abs/2502.16982'},
      {label: 'Kingma et Ba, Adam: A Method for Stochastic Optimization, décembre 2014', url: 'https://arxiv.org/abs/1412.6980'},
    ],
  },
  {
    id: 'retropropagation',
    status: 'live',
    title: 'Rétropropagation',
    en: 'Backpropagation',
    aliases: ['backprop', 'backward pass', 'reverse-mode automatic differentiation'],
    aliasesFr: ["rétropropagation du gradient", 'passe arrière'],
    jargon: [
      {say: 'forward pass, backward pass', means: "l'aller, où le texte traverse le modèle jusqu'à la prédiction, puis le retour, où l'erreur remonte de la sortie vers l'entrée pour attribuer à chaque paramètre sa part"},
      {say: 'backprop', means: "le diminutif courant ; « faire une backprop », c'est calculer les gradients d'un pas d'entraînement"},
      {say: 'activations', means: "les valeurs intermédiaires calculées pendant l'aller, gardées en mémoire parce que le retour en a besoin ; ce sont elles qui font exploser la mémoire d'un entraînement"},
      {say: 'autograd', means: "la partie des bibliothèques comme PyTorch qui fait la rétropropagation toute seule, sans qu'on écrive le calcul à la main"},
    ],
    cat: 'entrainement',
    links: ['descente-de-gradient', 'gradient-qui-disparait', 'entrainement', 'parametres'],
    short:
      "La rétropropagation est le calcul qui, après chaque erreur d'un modèle pendant l'entraînement, remonte de la sortie vers l'entrée pour établir combien chaque paramètre a contribué à cette erreur, et donc dans quel sens le corriger.",
    image:
      "Quand la fausse note sort des enceintes, elle a traversé la console tranche après tranche, et la rétropropagation refait le chemin à l'envers. La dernière tranche établit sa part de la faute et transmet le reste à celle d'avant, qui fait de même, jusqu'au micro. Personne ne marche dans le studio, en réalité ; chaque tranche a gardé ses notes de l'aller, et le retour se contente de les relire.",
    imagineForm: 'D',
    imagine:
      "« Qui a joué faux ? », demande le producteur après la prise, et l'ingé son lui tend un listing de sept milliards de lignes : « Tout le monde, un peu, et voici exactement de combien chacun. »",
    full: [
      "Pour corriger un modèle, la descente de gradient a besoin de savoir, pour chacun de ses milliards de paramètres, dans quel sens il aurait fallu le tourner. Les tester un par un demanderait, pour un modèle de 7 milliards de paramètres, 7 milliards de calculs complets à chaque pas. La rétropropagation obtient toutes ces réponses d'un seul retour, qui coûte environ deux fois le calcul de l'aller, en appliquant couche par couche la règle de dérivation en chaîne.",
      "Ce raccourci coûte cher en mémoire, car le retour relit tout ce que l'aller a calculé. Hugging Face compte, pour un entraînement classique, 18 octets par paramètre avant même ces valeurs intermédiaires, contre 2 octets pour faire tourner le même modèle en 16 bits. La même documentation cite un modèle de 4 milliards de paramètres qui demande environ 85 Go de mémoire GPU pour s'entraîner.",
      "L'idée vient de plusieurs endroits. Seppo Linnainmaa en publie la forme générale en 1970, Paul Werbos l'applique aux réseaux de neurones en 1982, et c'est l'article de David Rumelhart, Geoffrey Hinton et Ronald Williams dans Nature, en 1986, qui la fait adopter par tout le domaine. Les grands modèles actuels sont encore entraînés de cette façon.",
    ],
    office: [
      {who: 'q', text: "Le modèle de 8 milliards tourne très bien sur notre GPU de 24 Go. On le fine-tune dessus ce week-end ?"},
      {who: 'a', text: "Pas en entier, parce que l'entraînement garde en mémoire bien plus que les poids. Pars sur une méthode qui ne réentraîne qu'une petite partie des paramètres, comme LoRA, ou loue une machine plus grosse."},
    ],
    avoid:
      "« La rétropropagation, c'est quand le modèle apprend de ses erreurs en te parlant. » Elle n'a lieu que pendant l'entraînement, sur des exemples dont on connaît la bonne réponse ; quand le modèle te répond, aucun retour n'est calculé.",
    video: null,
    sources: [
      {label: 'Rumelhart, Hinton et Williams, Learning representations by back-propagating errors, Nature, 9 octobre 1986', url: 'https://www.nature.com/articles/323533a0'},
      {label: 'Wikipédia, Backpropagation (Linnainmaa 1970, Werbos 1982, Rumelhart en 1985 et 1986)', url: 'https://en.wikipedia.org/wiki/Backpropagation'},
      {label: "Kaplan et al., Scaling Laws for Neural Language Models, janvier 2020 (le retour coûte environ deux fois l'aller)", url: 'https://arxiv.org/abs/2001.08361'},
      {label: 'Hugging Face, documentation Model training anatomy (6 octets de poids, 8 octets pour Adam et 4 octets de gradients par paramètre, activations gardées pour le retour ; environ 85 Go pour entraîner un modèle de 4 milliards de paramètres), consultée le 2 octobre 2026', url: 'https://huggingface.co/docs/transformers/model_memory_anatomy'},
    ],
  },
  {
    id: 'gradient-qui-disparait',
    status: 'live',
    title: 'Gradient qui disparaît',
    en: 'Vanishing gradient',
    aliases: ['vanishing gradient problem', 'exploding gradient', 'exploding gradient problem'],
    aliasesFr: ['disparition du gradient', 'explosion du gradient', 'gradient évanescent'],
    jargon: [
      {say: 'vanishing / exploding gradient', means: "le signal de correction qui s'éteint, ou au contraire qui s'emballe, en remontant les couches du réseau"},
      {say: 'residual connection, skip connection', means: "un raccourci qui ajoute l'entrée d'un bloc à sa sortie, pour que le signal puisse traverser le bloc sans passer par ses calculs"},
      {say: 'LayerNorm, BatchNorm', means: "des étapes qui remettent les nombres d'une couche à une échelle standard, pour qu'ils ne grossissent ni ne fondent d'une couche à l'autre"},
      {say: 'gradient clipping', means: "on plafonne la taille du signal de correction à chaque pas, la parade la plus courante quand il s'emballe"},
    ],
    cat: 'entrainement',
    links: ['retropropagation', 'descente-de-gradient', 'entrainement', 'tailles-de-modele'],
    short:
      "Le gradient qui disparaît est le problème qui a longtemps empêché d'entraîner des réseaux profonds : en remontant les couches, le signal qui dit comment corriger chaque paramètre rétrécit jusqu'à presque rien, et les premières couches n'apprennent plus.",
    image:
      "Branche cinquante pédales d'effet à la suite, chacune baissant un peu le volume, et la guitare n'arrive plus à l'ampli ; si chacune le monte un peu, tu obtiens un larsen. La correction remonte les couches d'un réseau de la même façon, et la parade a été de poser à côté de chaque pédale un câble direct, qui laisse passer le son propre quoi que fasse la pédale.",
    imagineForm: 'A',
    imagine:
      "Pose un million d'euros d'erreur à la sortie d'un réseau dont chaque couche ne transmet au mieux qu'un quart du signal qu'elle reçoit. Après dix couches, il reste 95 centimes à répartir dans la première, et après vingt couches, moins d'un dix-millième de centime. Les grands modèles de langage empilent aujourd'hui quarante couches et plus, et ne s'entraînent que grâce aux raccourcis qui les protègent de cette fonte.",
    full: [
      "Pendant la rétropropagation, le signal de correction est multiplié à chaque couche qu'il remonte. Si les facteurs sont petits, il fond de façon exponentielle et les couches proches de l'entrée ne bougent presque plus ; s'ils sont grands, il explose, les nombres débordent et l'entraînement diverge. Dans son manuel en ligne de 2015, Michael Nielsen mesure un réseau à quatre couches cachées dont la première apprend environ cent fois moins vite que la dernière.",
      "Sepp Hochreiter a décrit le problème dans son mémoire de 1991, et c'est pour le contourner dans les réseaux qui lisent des séquences qu'il a publié le LSTM avec Jürgen Schmidhuber en 1997, une cellule de mémoire où l'erreur circule sans s'éteindre. Pour les réseaux très profonds, le déblocage arrive par couches successives, avec une meilleure initialisation des poids en 2010, la fonction ReLU en 2011, la normalisation en février 2015, puis les connexions résiduelles en décembre 2015.",
      "L'article des connexions résiduelles, ResNet, précise que la disparition du gradient était déjà largement réglée par l'initialisation et la normalisation, et qu'un autre mur restait : un réseau de 56 couches faisait plus d'erreurs qu'un réseau de 20, même à l'entraînement. Avec le raccourci, ResNet a gagné le concours ImageNet 2015 avec 152 couches. Le Transformer de 2017 a repris le raccourci et la normalisation autour de chacun de ses blocs, et c'est ce qui permet d'empiler les dizaines de couches des grands modèles actuels.",
    ],
    office: [
      {who: 'q', text: "Pourquoi les réseaux de neurones ont mis trente ans à décoller, alors que la rétropropagation date de 1986 ?"},
      {who: 'a', text: "Entre autres raisons, on ne savait pas faire passer la correction à travers plus de quelques couches, et ce verrou n'a sauté qu'entre 2010 et 2015."},
    ],
    avoid:
      "« ResNet a résolu le gradient qui disparaît. » Ses auteurs écrivent eux-mêmes que l'initialisation et la normalisation l'avaient déjà largement réglé ; les connexions résiduelles ont réglé le problème suivant, la dégradation des réseaux trop profonds.",
    video: null,
    sources: [
      {label: "Michael Nielsen, Neural Networks and Deep Learning, chapitre 5, 2015 (dérivée de la sigmoïde au plus égale à 1/4 ; première couche cachée environ 100 fois plus lente que la dernière dans un réseau à quatre couches cachées). Calcul de l'Imagine, avec des poids inférieurs à 1 : 10^6 x 0,25^10 = 0,95 euro ; 10^6 x 0,25^20 = 9,1 x 10^-7 euro", url: 'http://neuralnetworksanddeeplearning.com/chap5.html'},
      {label: 'Wikipédia, Vanishing gradient problem (mémoire de Hochreiter, 1991 ; explosion du gradient)', url: 'https://en.wikipedia.org/wiki/Vanishing_gradient_problem'},
      {label: 'Hochreiter, Untersuchungen zu dynamischen neuronalen Netzen, mémoire de diplôme, TU Munich, 1991', url: 'https://people.idsia.ch/~juergen/SeppHochreiter1991ThesisAdvisorSchmidhuber.pdf'},
      {label: 'Hochreiter et Schmidhuber, Long Short-Term Memory, Neural Computation, 1997', url: 'https://www.bioinf.jku.at/publications/older/2604.pdf'},
      {label: 'Glorot et Bengio, Understanding the difficulty of training deep feedforward neural networks, AISTATS 2010', url: 'https://proceedings.mlr.press/v9/glorot10a.html'},
      {label: 'Glorot, Bordes et Bengio, Deep Sparse Rectifier Neural Networks (ReLU), AISTATS 2011', url: 'https://proceedings.mlr.press/v15/glorot11a.html'},
      {label: 'Ioffe et Szegedy, Batch Normalization, février 2015', url: 'https://arxiv.org/abs/1502.03167'},
      {label: "He et al., Deep Residual Learning for Image Recognition, décembre 2015 (56 couches moins bonnes que 20 sans raccourci, disparition du gradient déjà largement traitée par l'initialisation et la normalisation, 152 couches, 1re place ILSVRC 2015)", url: 'https://arxiv.org/abs/1512.03385'},
      {label: 'Pascanu, Mikolov et Bengio, On the difficulty of training Recurrent Neural Networks, 2012 (plafonnement du gradient contre son explosion)', url: 'https://arxiv.org/abs/1211.5063'},
      {label: 'Vaswani et al., Attention Is All You Need, juin 2017 (connexion résiduelle et normalisation autour de chaque sous-couche)', url: 'https://arxiv.org/abs/1706.03762'},
      {label: 'Mistral AI, configuration de Mistral-Small-3.2-24B-Instruct-2506 (40 couches)', url: 'https://huggingface.co/mistralai/Mistral-Small-3.2-24B-Instruct-2506/blob/main/config.json'},
    ],
  },
  {
    id: 'webmcp',
    status: 'live',
    title: 'WebMCP',
    en: 'WebMCP',
    aliases: ['Web Model Context Protocol', 'document.modelContext', 'navigator.modelContext'],
    aliasesFr: [],
    jargon: [
      {say: 'document.modelContext', means: "l'objet par lequel une page déclare ses outils dans le brouillon actuel ; les premières versions et certains scripts disent encore navigator.modelContext"},
      {say: 'API impérative, API déclarative', means: "deux façons d'exposer un outil : en JavaScript avec registerTool, ou en ajoutant à un formulaire HTML des attributs comme toolname et tooldescription"},
      {say: 'origin trial', means: "l'essai à durée limitée par lequel Chrome laisse des sites activer une fonction expérimentale pour leurs vrais visiteurs, avant de décider de la garder"},
      {say: 'toolautosubmit', means: "l'attribut qui autorise l'agent à envoyer le formulaire lui-même ; sans lui, le navigateur s'arrête sur le bouton et c'est l'utilisateur qui valide"},
    ],
    cat: 'agents',
    links: ['mcp', 'tool-use', 'agent', 'prompt-injection', 'harness'],
    solutions: [
      {name: 'Lighthouse, catégorie Agentic Browsing', kind: 'outil pour tester', url: 'https://developer.chrome.com/docs/lighthouse/agentic-browsing/registered-webmcp-tools'},
      {name: 'MCP-B', kind: 'bibliothèque open source', url: 'https://mcp-b.ai/'},
    ],
    short:
      "WebMCP est une proposition de standard web qui permet à un site d'exposer des outils aux agents IA qui tournent dans le navigateur, chacun décrit par son nom, son rôle et ses paramètres, pour qu'ils agissent sur la page sans deviner où cliquer.",
    image:
      "En tournée, certaines salles collent à l'entrée des artistes une fiche d'accueil qui dit où brancher, quels boutons toucher et ce qui est interdit, et les roadies n'ont plus à tâtonner sur une console inconnue. WebMCP fait de cette fiche un standard du web. La fiche est rédigée par la salle elle-même, et rien ne garantit qu'elle décrive fidèlement ce que voit le public.",
    imagineForm: 'B',
    imagine:
      "Ouvre reebok.com, affiche le code source de la page (Ctrl+U sous Windows, Cmd+Option+U sur Mac) et cherche « webmcp ». Tu tombes sur un petit script de Shopify qui ne charge la suite que si le navigateur sait accueillir des outils, et cette suite déclare onze outils pour les agents, de search_catalog à proceed_to_checkout.",
    full: [
      "Un agent qui utilise un site aujourd'hui fait comme toi : il regarde la page, devine quel bouton correspond à quoi, clique et tape, et il se trompe dès que la mise en page change. Avec WebMCP, le site déclare ses actions comme des outils, chacun accompagné d'un texte qui explique son rôle et d'un schéma de paramètres, et l'agent les appelle directement. On les déclare en JavaScript, ou en annotant un formulaire HTML existant, une variante encore décrite à part puisque la section correspondante de la spécification reste à écrire.",
      "WebMCP reprend le vocabulaire de MCP, les outils et leurs schémas, mais pas son architecture. Il n'y a pas de serveur à installer, l'outil est une fonction de la page qui s'exécute dans l'onglet avec la session de l'utilisateur, et un agent ne le découvre qu'en visitant la page. Google présente l'API comme conçue pour un humain présent dans la boucle, et une règle d'accès réserve par défaut les outils au site lui-même, les cadres venus d'autres sites devant y être autorisés.",
      "Les risques sont ceux du tool use, déplacés dans le navigateur. La spécification cite elle-même l'injection de consignes cachées dans les descriptions ou les résultats d'outils, et la fuite de données personnelles par des outils trop gourmands en paramètres. Mozilla relève un autre piège, celui d'un site qui proposerait des outils ne correspondant pas à ce qu'un humain voit sur la même page.",
    ],
    table: {
      caption: 'Où en est WebMCP',
      asOf: '2 octobre 2026',
      columns: ['Acteur', 'Statut', 'Date'],
      rows: [
        ['Spécification', 'Brouillon de Community Group du W3C, hors voie de standardisation', 'Version du 30 septembre 2026'],
        ['Chrome', 'Flag depuis la 146, origin trial de la 149 à la 156', '9 juin 2026'],
        ['Firefox (Mozilla)', 'Position neutre', '1er juin 2026'],
        ['Safari (WebKit)', 'Position opposée', '3 juin 2026'],
        ['Lighthouse', 'Audit des outils, alerte au-delà de 40', '21 septembre 2026'],
      ],
      note: "Spécification coéditée par Microsoft et Google ; l'audit Lighthouse demande Chrome 150 ou plus, et aucun navigateur n'active WebMCP par défaut.",
    },
    then:
      "Le premier texte de WebMCP, signé par des équipes de Microsoft et de Google, date du 13 août 2025, et Chrome en a ouvert un aperçu aux développeurs le 10 février 2026. Entre-temps, l'objet d'entrée est passé de navigator.modelContext à document.modelContext, au point que le script de Shopify sur Reebok teste encore les deux noms.",
    office: [
      {who: 'q', text: "Le client e-commerce veut savoir s'il doit exposer son tunnel de commande en WebMCP."},
      {who: 'a', text: "Teste-le en origin trial sur la recherche et le panier, garde la validation de la commande à l'humain, et ne refonds rien pour ça, puisque seul Chrome l'implémente et que WebKit s'y oppose."},
    ],
    avoid:
      "« WebMCP, c'est la version web de MCP, un standard du W3C. » C'est un brouillon de Community Group, qui n'est pas sur la voie des standards du W3C, et il ne parle pas le protocole de MCP : il en partage le vocabulaire, sans serveur ni connexion à un service distant.",
    video: null,
    sources: [
      {label: "W3C Web Machine Learning Community Group, WebMCP, Draft Community Group Report du 30 septembre 2026 (hors voie de standardisation ; éditeurs Brandon Walderman pour Microsoft, Khushal Sagar et Dominic Farolino pour Google ; document.modelContext, registerTool ; règle d'accès « tools » ; risques d'injection et de fuite de données ; section déclarative encore à écrire)", url: 'https://webmachinelearning.github.io/webmcp/'},
      {label: "Dépôt webmachinelearning/webmcp (premier texte publié le 13 août 2025, inspiration MCP-B, vocabulaire partagé avec MCP)", url: 'https://github.com/webmachinelearning/webmcp'},
      {label: 'Explainer de l\'API déclarative (attributs toolname, tooldescription, toolparamdescription et toolautosubmit ; sans toolautosubmit, l\'utilisateur valide le formulaire)', url: 'https://github.com/webmachinelearning/webmcp/blob/main/declarative-api-explainer.md'},
      {label: 'Chrome Platform Status, fiche WebMCP (statut « Proposed », essai développeur à partir de Chrome 146, origin trial de Chrome 149 à 156), consultée le 2 octobre 2026', url: 'https://chromestatus.com/feature/5117755740913664'},
      {label: 'Chrome for Developers, WebMCP is available for early preview, 10 février 2026', url: 'https://developer.chrome.com/blog/webmcp-epp'},
      {label: 'Chrome for Developers, Join the WebMCP origin trial, 9 juin 2026', url: 'https://developer.chrome.com/blog/ai-webmcp-origin-trial'},
      {label: "Chrome for Developers, documentation WebMCP, mise à jour le 1er octobre 2026 (API conçue pour un humain dans la boucle, découverte des outils en visitant le site, règle d'accès « tools » limitée par défaut au site, autorisation explicite pour les cadres d'autres sites)", url: 'https://developer.chrome.com/docs/ai/webmcp'},
      {label: 'WebKit standards-positions, issue 670 (position opposée publiée le 3 juin 2026 : préférence pour combler les manques dans HTML et ARIA plutôt que de doubler la page d\'une couche d\'outils)', url: 'https://github.com/WebKit/standards-positions/issues/670'},
      {label: "Mozilla standards-positions, issue 1412 (position neutre, 1er juin 2026 : risque de sites dont les outils ne correspondent pas à ce que voit l'utilisateur)", url: 'https://github.com/mozilla/standards-positions/issues/1412'},
      {label: 'Chrome for Developers, Lighthouse, audit Registered WebMCP tools (alerte au-delà de 40 outils), mis à jour le 21 septembre 2026', url: 'https://developer.chrome.com/docs/lighthouse/agentic-browsing/registered-webmcp-tools'},
      {label: 'Chrome for Developers, Lighthouse agentic browsing scoring (Chrome 150 ou plus requis, inscription à l\'origin trial pour les audits WebMCP), mis à jour le 5 mai 2026', url: 'https://developer.chrome.com/docs/lighthouse/agentic-browsing/scoring'},
      {label: "Script WebMCP de la vitrine Shopify de Reebok, ouvert le 2 octobre 2026 (11 définitions d'outils avec nom, annotations et description, dont search_catalog, add_to_cart et proceed_to_checkout ; chargé seulement si document.modelContext ou navigator.modelContext expose registerTool)", url: 'https://www.reebok.com/cdn/shopifycloud/storefront/assets/storefront/webmcp-c6b62ece.js'},
    ],
  },
];

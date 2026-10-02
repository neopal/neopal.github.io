// Lexique IA, vague 5, lot J (distillation). Format identique à lexique/terms.js, sans `num`.
// imagineForm : forme de l'« Imagine » (content/dico/univers.md, section « Les formes de l'Imagine »).
// Faits et chiffres relevés le 2 octobre 2026 sur les pages citées dans `sources`.
module.exports = [
  {
    id: 'distillation',
    status: 'live',
    title: 'Distillation',
    en: 'Knowledge distillation',
    aliases: ['knowledge distillation', 'distillation', 'model distillation', 'teacher-student', 'distilled model', 'KD'],
    aliasesFr: ['distillation de connaissances', 'modèle distillé', 'professeur et élève'],
    jargon: [
      {say: 'teacher, student', means: "le professeur, le grand modèle qu'on imite, et l'élève, le petit modèle qu'on entraîne à l'imiter"},
      {say: 'soft targets', means: "les probabilités que le professeur donne à chaque réponse possible, plus riches que la seule bonne réponse, qu'on appelle hard target"},
      {say: 'R1-Distill-Qwen-7B', means: "un modèle Qwen de 7 milliards de paramètres distillé à partir de DeepSeek-R1 ; le nom donne d'abord le professeur, puis l'élève et sa taille"},
      {say: 'distillation attack', means: "le nom que les labos donnent à une distillation faite sans leur accord, par des milliers de comptes qui interrogent leur API"},
    ],
    cat: 'entrainement',
    links: ['fine-tuning', 'slm', 'post-entrainement', 'open-weights', 'tailles-de-modele', 'modeles-de-raisonnement'],
    short:
      "La distillation consiste à entraîner un petit modèle, l'élève, à imiter les réponses ou les probabilités d'un grand modèle, le professeur, pour obtenir un modèle bien moins cher qui fait presque aussi bien sur les tâches qu'on lui a montrées.",
    image:
      "Personne n'a jamais montré la console du grand groupe au groupe de reprise d'à côté ; il apprend en écoutant ses disques, encore et encore, jusqu'à rejouer le répertoire presque à l'identique avec bien moins de musiciens. On appelle le grand groupe le professeur (teacher), et le groupe de reprise l'élève (student). L'image triche sur un point, puisque l'élève le mieux servi n'entend pas seulement le disque fini, mais aussi chaque note que le grand groupe a hésité à jouer.",
    imagineForm: 'E',
    imagine:
      "Pour apprendre à reconnaître des photos, un petit modèle reçoit celle d'une BMW avec son corrigé, qui dit « voiture » et rien d'autre. Refais la leçon avec la même photo, en remplaçant le corrigé par ce que répond un grand modèle déjà entraîné, « voiture, presque à coup sûr ; camion poubelle, une chance infime ; carotte, bien moins encore ». Le petit modèle repart cette fois en sachant qu'une BMW ressemble davantage à un camion poubelle qu'à une carotte.",
    full: [
      "La distillation (knowledge distillation) ne copie pas les paramètres du grand modèle, que le petit n'aurait de toute façon pas la place de contenir ; elle copie ce qu'il produit. Dans la version la plus simple, on fait écrire au professeur des milliers de réponses et on entraîne l'élève dessus. Dans la version d'origine, décrite en mars 2015 par Geoffrey Hinton, Oriol Vinyals et Jeff Dean dans l'article d'où vient la BMW, l'élève imite les probabilités que le professeur donne à toutes les réponses possibles. Il faut alors avoir le professeur sous la main, comme Google, qui a entraîné ses modèles ouverts Gemma 3, sortis en mars 2025, à imiter token après token les probabilités d'un modèle professeur.",
      "L'élève coûte bien moins cher à faire tourner, et il suit le professeur de près sur le genre de tâches que contenaient ses exemples. En janvier 2025, DeepSeek a préparé avec son modèle de raisonnement R1, qui compte 671 milliards de paramètres, environ 800 000 exemples rédigés, puis a fine-tuné dessus six modèles ouverts plus petits des familles Qwen et Llama. Le Qwen de 7 milliards ainsi distillé résolvait 55,5 % des problèmes du concours de maths AIME 2024, là où GPT-4o en résolvait 9,3 %. Les mêmes chercheurs ont tenté d'apprendre le raisonnement directement à un Qwen de 32 milliards, par renforcement, et il est resté loin derrière sa version distillée malgré un calcul bien plus lourd.",
      "Techniquement, ce qu'a fait DeepSeek est un fine-tuning ; on parle de distillation parce que les exemples viennent d'un modèle plus fort, dont on veut faire passer le savoir-faire dans un modèle plus petit. La quantization vise la même économie par un autre chemin, puisqu'elle garde le même modèle et arrondit ses paramètres pour qu'il pèse moins, alors que la distillation fabrique un autre modèle, qui a appris en imitant. Les deux se combinent souvent, et Anthropic rappelle que les grands labos distillent couramment leurs propres modèles pour vendre à leurs clients des versions plus petites et moins chères.",
    ],
    table: {
      caption: "Le professeur DeepSeek-R1 et ses élèves distillés, scores publiés par DeepSeek en janvier 2025",
      asOf: '2 octobre 2026',
      columns: ['Modèle', 'Paramètres', 'AIME 2024', 'MATH-500', 'GPQA Diamond'],
      rows: [
        ['DeepSeek-R1 (professeur)', '671 milliards', '79,8 %', '97,3 %', '71,5 %'],
        ['R1-Distill-Llama-70B', '70 milliards', '70,0 %', '94,5 %', '65,2 %'],
        ['R1-Distill-Qwen-32B', '32 milliards', '72,6 %', '94,3 %', '62,1 %'],
        ['R1-Distill-Qwen-7B', '7 milliards', '55,5 %', '92,8 %', '49,1 %'],
        ['R1-Distill-Qwen-1.5B', '1,5 milliard', '28,9 %', '83,9 %', '33,8 %'],
        ['GPT-4o (mai 2024)', 'non publié', '9,3 %', '74,6 %', '49,9 %'],
      ],
      note: "Part des questions réussies au premier essai ; AIME 2024 et MATH-500 sont des maths, GPQA Diamond des questions de sciences de niveau doctorat.",
    },
    then:
      "En 2024, la distillation restait une recette maison, que Google employait par exemple pour entraîner les petites versions de Gemma 2. Le 29 janvier 2025, selon le Financial Times, OpenAI disait détenir des indices que DeepSeek avait distillé ses modèles par son API, en violation de ses conditions d'utilisation, et la technique est devenue un sujet de rivalité entre labos et entre pays. En février 2026, OpenAI a répété l'accusation dans une note aux élus du Congrès américain, et Anthropic a affirmé que DeepSeek, Moonshot AI et MiniMax avaient ouvert plus de 24 000 faux comptes pour mener plus de 16 millions d'échanges avec Claude.",
    office: [
      {who: 'q', text: "On distille Claude dans un petit modèle maison pour faire baisser la facture ?"},
      {who: 'a', text: "Lis d'abord les conditions commerciales d'Anthropic, qui interdisent d'utiliser Claude pour entraîner des modèles concurrents ; un professeur ouvert dont la licence autorise expressément la distillation, comme DeepSeek-R1, t'évite la question."},
    ],
    avoid:
      "« DeepSeek a volé les paramètres d'OpenAI. » L'accusation ne porte pas sur les paramètres, que l'API ne livre jamais, mais sur des millions de réponses obtenues par l'API pour entraîner d'autres modèles, ce que les conditions d'utilisation interdisent.",
    video: null,
    sources: [
      {label: "Hinton, Vinyals et Dean, Distilling the Knowledge in a Neural Network, 9 mars 2015 (soft targets ; la BMW rarement prise pour un camion poubelle, mais bien plus souvent que pour une carotte)", url: 'https://arxiv.org/abs/1503.02531'},
      {label: "Gemma Team (Google DeepMind), Gemma 3 Technical Report, 25 mars 2025 (modèles de 1 à 27 milliards de paramètres entraînés par distillation ; l'élève apprend la distribution de probabilités du professeur)", url: 'https://arxiv.org/abs/2503.19786'},
      {label: "Gemma Team (Google DeepMind), Gemma 2: Improving Open Language Models at a Practical Size, 31 juillet 2024 (les versions 2B et 9B entraînées par distillation plutôt que par prédiction du token suivant)", url: 'https://arxiv.org/abs/2408.00118'},
      {label: "DeepSeek-AI, DeepSeek-R1, 22 janvier 2025 (distillés par fine-tuning seul sur environ 800 000 exemples ; un Qwen de 32 milliards entraîné par renforcement à 47,0 % sur AIME 2024 contre 72,6 % pour sa version distillée)", url: 'https://arxiv.org/abs/2501.12948'},
      {label: "DeepSeek, fiche Hugging Face de DeepSeek-R1 (671 milliards de paramètres dont 37 actifs, scores de R1 et de GPT-4o, six modèles distillés à partir de Qwen2.5 et Llama 3, licence MIT qui autorise la distillation), consultée le 2 octobre 2026", url: 'https://huggingface.co/deepseek-ai/DeepSeek-R1'},
      {label: "DeepSeek, fiche Hugging Face de DeepSeek-R1-Distill-Qwen-7B, mise en ligne le 20 janvier 2025 (tableau des modèles distillés : AIME 2024, MATH-500, GPQA Diamond), consultée le 2 octobre 2026", url: 'https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-7B'},
      {label: "Euronews, « OpenAI says Chinese companies are trying to use US models to train AI », 29 janvier 2025 (indices contre DeepSeek selon le Financial Times, distillation contraire aux conditions d'utilisation d'OpenAI)", url: 'https://www.euronews.com/next/2025/01/29/openai-says-chinese-companies-are-trying-to-use-us-models-to-train-ai'},
      {label: "Rest of World, OpenAI accuse DeepSeek dans une note du 12 février 2026 à la commission de la Chambre des représentants sur la Chine (contournement des restrictions d'accès, sorties obtenues pour la distillation), 13 février 2026", url: 'https://restofworld.org/2026/openai-deepseek-distillation-dispute-us-china/'},
      {label: "Anthropic, Detecting and preventing distillation attacks, 23 février 2026 (plus de 24 000 faux comptes, plus de 16 millions d'échanges, DeepSeek, Moonshot AI et MiniMax ; les labos distillent couramment leurs propres modèles)", url: 'https://www.anthropic.com/news/detecting-and-preventing-distillation-attacks'},
      {label: "Anthropic, Commercial Terms of Service, en vigueur depuis le 17 juin 2025 (article D.4 : interdiction d'utiliser les services pour entraîner des modèles d'IA concurrents), consultées le 2 octobre 2026", url: 'https://www.anthropic.com/legal/commercial-terms'},
    ],
  },
];

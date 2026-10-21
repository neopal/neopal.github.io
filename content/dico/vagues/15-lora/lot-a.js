// Lexique IA, vague 15, lot A (une fiche : LoRA). Format identique à lexique/terms.js, sans `num`.
// imagineForm : forme de l'« Imagine » (content/dico/univers.md, section « Les formes de l'Imagine »).
// Faits et chiffres relevés le 19 octobre 2026 sur les pages citées dans `sources`.
module.exports = [
  {
    id: 'lora',
    status: 'live',
    title: 'LoRA',
    en: 'Low-Rank Adaptation',
    aliases: ['LoRA', 'QLoRA', 'LoRA adapter', 'PEFT', 'parameter-efficient fine-tuning'],
    aliasesFr: ['adaptation de rang faible', 'adaptateur LoRA'],
    jargon: [
      {say: 'rank 16', means: "le rang, l'épaisseur des deux petites matrices : plus il est élevé, plus l'adaptateur peut apprendre, et plus son fichier pèse lourd"},
      {say: 'adapter', means: "l'adaptateur, le fichier qui contient les petites matrices entraînées et qui se distribue à part du modèle de base"},
      {say: 'merge', means: "fusionner l'adaptateur dans les paramètres du modèle de base, pour obtenir un seul modèle qui répond aussi vite que l'original"},
      {say: 'QLoRA', means: "un LoRA entraîné sur un modèle de base quantifié en 4 bits, ce qui a permis en 2023 d'affiner un modèle de 65 milliards de paramètres sur un seul GPU de 48 Go"},
    ],
    cat: 'entrainement',
    links: ['fine-tuning', 'quantization', 'open-weights', 'modele-de-diffusion', 'gpu', 'post-entrainement'],
    solutions: [
      {name: 'PEFT (Hugging Face)', kind: 'bibliothèque open source', url: 'https://huggingface.co/docs/peft/index'},
      {name: 'Unsloth', kind: 'bibliothèque open source', url: 'https://github.com/unslothai/unsloth'},
      {name: 'Tinker (Thinking Machines)', kind: 'plateforme cloud', url: 'https://thinkingmachines.ai/tinker/'},
      {name: 'vLLM, service multi-LoRA', kind: "serveur d'inférence", url: 'https://docs.vllm.ai/en/latest/features/lora.html'},
    ],
    short: "LoRA est une méthode de fine-tuning qui fige les paramètres d'un modèle et n'entraîne que deux petites matrices ajoutées à côté, un adaptateur léger qu'on retire ou échange à volonté.",
    image: "« Je ne vais pas changer de fût à chaque client, alors qu'un trait de grenadine fait un tango de ta pression et qu'un trait de pêche en fait une bière pêche pour la table d'à côté, au même robinet. »",
    imagineForm: 'A',
    imagine: "Llama 3.1 8B occupe 16 Go sur ton disque, et un LoRA de rang 16 posé sur toutes ses couches pèse 84 Mo. Si le modèle était un roman de 400 pages, l'adaptateur tiendrait sur deux feuillets glissés entre les pages, qu'on retire sans abîmer le livre.",
    full: [
      "LoRA, pour Low-Rank Adaptation, a été publiée en juin 2021 par des chercheurs de Microsoft, au moment où affiner GPT-3 obligeait à stocker et servir une copie de ses 175 milliards de paramètres par usage. La méthode laisse chaque grande matrice de paramètres telle quelle et apprend à côté une correction, écrite comme le produit de deux matrices très minces. Leur épaisseur s'appelle le rang, et à 16, une matrice de 4 096 sur 4 096 reçoit une correction de 131 072 paramètres au lieu de 16,8 millions.",
      "Ce petit fichier explique le succès de la méthode bien au-delà du texte. En janvier 2023, Hugging Face la portait sur Stable Diffusion, où un style ou un personnage appris tenait dans 3,29 Mo, mille fois moins que le réseau d'origine, et les communautés d'images se sont mises à s'échanger des LoRA. En mai 2023, QLoRA l'a combinée à un modèle quantifié en 4 bits pour affiner 65 milliards de paramètres sur un seul GPU. Un même serveur peut aussi garder en mémoire un modèle de base et des dizaines d'adaptateurs, comme Apple Intelligence, qui charge à la volée un adaptateur par fonction sur son modèle d'environ 3 milliards de paramètres.",
      "Une correction aussi mince a ses limites. En mai 2024, une équipe de Databricks et Columbia a constaté que sur du code et des maths, avec beaucoup de données, LoRA apprenait nettement moins qu'un fine-tuning complet, mais oubliait aussi moins ce que le modèle savait déjà faire. LoRA convient donc pour apprendre un format, un ton ou une tâche, et le fine-tuning complet garde l'avantage quand il faut faire entrer des milliards de tokens nouveaux.",
    ],
    then: "En 2024, LoRA passait pour une version au rabais du fine-tuning, que l'étude de Databricks trouvait en retrait sur le code et les maths. En septembre 2025, Thinking Machines a montré qu'elle fait jeu égal sur la plupart des post-entraînements à condition de la poser sur toutes les couches, et l'a mise au cœur de Tinker, son service de fine-tuning lancé le 1er octobre suivant.",
    office: [
      {who: 'q', text: "Trois clients veulent chacun leur modèle maison, on prend trois serveurs ?"},
      {who: 'a', text: "Garde un seul modèle de base et entraîne un LoRA par client ; vLLM sert les trois adaptateurs depuis la même machine, et tu ne paies qu'une fois la mémoire du gros modèle."},
    ],
    avoid: "« Un LoRA, c'est un petit modèle. » Un adaptateur ne sait rien faire seul, puisqu'il ne contient qu'une correction des paramètres du modèle de base pour lequel il a été entraîné, et il faut charger ce modèle en entier pour s'en servir.",
    video: null,
    sources: [
      {label: "Hu et al. (Microsoft), LoRA: Low-Rank Adaptation of Large Language Models, 17 juin 2021 (poids pré-entraînés figés, matrices de décomposition de rang entraînables ; sur GPT-3 175B, paramètres entraînables divisés par 10 000 et mémoire GPU par 3 ; pas de latence ajoutée à l'inférence)", url: 'https://arxiv.org/abs/2106.09685'},
      {label: "Hugging Face, Using LoRA for Efficient Stable Diffusion Fine-Tuning, 26 janvier 2023 (technique introduite par des chercheurs de Microsoft ; poids entraînés dans un fichier de 3,29 Mo, environ mille fois moins que le UNet d'origine)", url: 'https://huggingface.co/blog/lora'},
      {label: "Dettmers et al., QLoRA: Efficient Finetuning of Quantized LLMs, 23 mai 2023 (modèle de 65 milliards de paramètres affiné sur un seul GPU de 48 Go, modèle de base figé et quantifié en 4 bits)", url: 'https://arxiv.org/abs/2305.14314'},
      {label: "Apple Machine Learning Research, Introducing Apple's On-Device and Server Foundation Models, juin 2024 (adaptateurs chargés et échangés à la volée, un par fonction ; pour le modèle embarqué d'environ 3 milliards de paramètres, un adaptateur de rang 16 pèse quelques dizaines de mégaoctets)", url: 'https://machinelearning.apple.com/research/introducing-apple-foundation-models'},
      {label: "Biderman et al. (Databricks, Columbia), LoRA Learns Less and Forgets Less, 15 mai 2024 (code et maths : LoRA nettement en dessous du fine-tuning complet, mais oublie moins les tâches hors domaine)", url: 'https://arxiv.org/abs/2405.09673'},
      {label: "John Schulman et Thinking Machines, LoRA Without Regret, 29 septembre 2025 (LoRA égale le fine-tuning complet sur des jeux de post-entraînement de taille courante si elle est appliquée à toutes les couches, MLP compris, et en renforcement même à petit rang ; vLLM et SGLang servent plusieurs adaptateurs sur un même serveur)", url: 'https://thinkingmachines.ai/blog/lora/'},
      {label: "Thinking Machines, Announcing Tinker, 1er octobre 2025 (API de fine-tuning de modèles open weights ; « We use LoRA » pour partager la puissance de calcul entre plusieurs entraînements)", url: 'https://thinkingmachines.ai/blog/announcing-tinker/'},
      {label: "Configuration de Llama 3.1 8B sur Hugging Face (hidden_size 4 096, intermediate_size 14 336, 32 couches, 8 têtes clé-valeur, soit 8,03 milliards de paramètres et 16,06 Go en bfloat16 ; LoRA de rang 16 sur les 7 matrices de chaque couche = 16 × (2 × 8 192 + 2 × 5 120 + 3 × 18 432) × 32 = 41 943 040 paramètres, 84 Mo en bfloat16 ; 16,06 Go / 84 Mo = 191, et 400 pages / 191 = 2,1 pages ; une matrice 4 096 × 4 096 = 16 777 216 paramètres, sa correction de rang 16 = 16 × 8 192 = 131 072)", url: 'https://huggingface.co/unsloth/Meta-Llama-3.1-8B/blob/main/config.json'},
    ],
  },
];

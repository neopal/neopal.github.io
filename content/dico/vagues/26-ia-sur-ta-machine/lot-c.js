// Vague 26, lot c : offloading. Règles : content/dico/brief-fiche.md ; registre : BRIEF.md de ce dossier.
module.exports = [
  {
    id: 'offloading',
    status: 'live',
    title: 'Offloading (déchargement des poids)',
    en: 'Offloading',
    aliases: ['offload', 'CPU offload', 'GPU offloading', 'partial offload', 'expert offloading', 'MoE offloading'],
    aliasesFr: ['déchargement', 'déchargement des poids', 'inférence hybride CPU-GPU'],
    jargon: [
      {say: '-ngl', means: "l'option de llama.cpp qui fixe combien de couches du modèle vont dans la mémoire de la carte graphique ; les autres restent en mémoire vive, calculées par le processeur"},
      {say: '--cpu-moe', means: "l'option de llama.cpp, ajoutée en juillet 2025, qui laisse tous les experts d'un MoE en mémoire vive et met le reste du modèle sur la carte graphique"},
      {say: 'offload sur le GPU', means: "dans llama.cpp, le mot sert dans l'autre sens : on « offloade » vers la carte graphique les couches qu'elle peut prendre, et le reste demeure au processeur"},
      {say: 'mmap', means: "memory map, le mode de chargement par défaut de llama.cpp : le système traite le fichier du modèle comme s'il était en mémoire et ne lit sur le disque que les morceaux touchés"}
    ],
    cat: 'inference',
    links: ['bande-passante-memoire', 'quantization', 'moe', 'open-weights', 'elagage-d-experts'],
    solutions: [
      {name: 'llama.cpp', kind: 'bibliothèque open source', url: 'https://github.com/ggml-org/llama.cpp'},
      {name: 'KTransformers', kind: 'bibliothèque open source', url: 'https://github.com/kvcache-ai/ktransformers'},
      {name: 'Accelerate (Hugging Face)', kind: 'bibliothèque open source', url: 'https://huggingface.co/docs/accelerate/concept_guides/big_model_inference'}
    ],
    short: "L'offloading range ailleurs, en mémoire vive ou sur disque, les poids d'un modèle trop gros pour la mémoire de la carte graphique ; le modèle tourne, mais plus lentement.",
    image: "Dans son studio de 18 m², Bastien n'a qu'un frigo de bar, alors ses courses dorment à la cave, six étages plus bas. Pour chaque plat, il descend chercher juste ce qu'il lui faut, et le dîner arrive à minuit.",
    imagineForm: 'D',
    imagine: "« Mon téléphone peut vraiment faire tourner un modèle de mille milliards de paramètres ? », demande Malik à sa cousine, qui vient d'installer Mistral Large 4 sur le sien. « Oui, pose-lui ta question en montant dans le métro, il aura fini sa première phrase à la station suivante. »",
    full: [
      "Une carte graphique calcule vite parce que les poids du modèle sont rangés dans sa propre mémoire, tout près de la puce. Quand le fichier dépasse cette mémoire, le déchargement (offloading) en garde une partie ailleurs. Dans llama.cpp, l'option -ngl fixe le nombre de couches confiées à la carte, et les suivantes restent en mémoire vive, où le processeur les calcule. Le logiciel ouvre aussi le fichier en mmap par défaut, et le système ne va chercher sur le disque que les morceaux dont le calcul a besoin. La bibliothèque Accelerate de Hugging Face suit la même pente, en remplissant la carte, puis la mémoire vive, puis le disque.",
      "Le modèle démarre alors, ce qui ne dit rien de sa vitesse, parce que chaque token oblige à relire tous les poids qui servent, y compris ceux qu'on a relégués dans la mémoire lente. Le 8 novembre 2026, une publication sur X annonçait Mistral Large 4, mille milliards de paramètres, en local sur un smartphone. Sa version la plus compressée pèse 233 Go, bien plus que la mémoire vive d'un téléphone, et chaque token relit une dizaine de gigaoctets sur le stockage. L'UFS 5.0 que Samsung a présenté en juin 2026, le stockage mobile le plus rapide annoncé à ce jour avec 10,8 Go par seconde, laisse encore environ une seconde par token, et la génération précédente, l'UFS 4.1, lit deux fois moins vite. En décembre 2023, les chercheurs d'Apple avaient montré avec « LLM in a flash » qu'en lisant moins, et par plus gros blocs, on allait 4 à 5 fois plus vite qu'un chargement naïf sur processeur, et 20 à 25 fois sur carte graphique. Leurs modèles faisaient deux fois la taille de la mémoire vive, loin de l'écart qui sépare les 233 Go de Mistral Large 4 de celle d'un téléphone.",
      "Les MoE se prêtent mieux au déchargement, parce que chaque token ne fait travailler que quelques experts. En février 2025, l'équipe de KTransformers a fait tourner DeepSeek-R1, 671 milliards de paramètres réduits à environ 4 bits par quantization, avec 14 Go de mémoire graphique et 382 Go de mémoire vive, en écrivant 8,7 à 11,3 tokens par seconde. Les experts restaient en mémoire vive, calculés par le processeur, pendant que la carte gardait l'attention et le cache. L'autre façon de faire tenir un MoE dans moins de mémoire consiste à lui retirer des experts, c'est l'élagage d'experts."
    ],
    then: "Jusqu'en 2024, on déchargeait un modèle couche par couche, les premières sur la carte graphique et les suivantes au processeur. En 2025, KTransformers puis llama.cpp, avec --override-tensor en avril et --cpu-moe en juillet, ont trié les poids selon leur rôle, l'attention sur la carte et les experts en mémoire vive, ce qui suit enfin la façon dont un MoE lit ses poids.",
    office: [
      {who: 'q', text: "On n'a qu'une carte de 24 Go sur le serveur, on peut quand même y faire tourner un modèle de 200 Go ?"},
      {who: 'a', text: "Il démarrera grâce à l'offloading, mais un modèle dense relira à chaque token tout ce qui ne tient pas sur la carte ; prends plutôt un MoE, laisse ses experts en mémoire vive, et mesure la vitesse avant de l'annoncer à qui que ce soit."}
    ],
    avoid: "« S'il se charge, il tourne. » Un modèle qui se charge a seulement trouvé de la place pour ses poids. Sa vitesse dépend de la mémoire la plus lente où il doit les relire à chaque token, et sous un token par seconde, une réponse de dix lignes prend plusieurs minutes.",
    video: null,
    sources: [
      {label: "llama.cpp, README de llama-server (-ngl : nombre de couches gardées en VRAM ; --override-tensor ; --cpu-moe et --n-cpu-moe : experts du MoE gardés côté CPU ; chargement en mmap par défaut ; lecture de certains tenseurs sur le disque à la demande), consulté le 9 novembre 2026", url: 'https://github.com/ggml-org/llama.cpp/blob/master/tools/server/README.md'},
      {label: "llama.cpp, README (inférence hybride CPU + GPU pour accélérer en partie les modèles plus gros que la VRAM)", url: 'https://github.com/ggml-org/llama.cpp'},
      {label: "llama.cpp, pull request 11397, fusionnée le 2 avril 2025 (option --override-tensor ; exemple « -ngl 99 -ot exps=CPU » pour garder les experts d'un MoE sur le CPU et décharger le reste vers le GPU)", url: 'https://github.com/ggml-org/llama.cpp/pull/11397'},
      {label: "llama.cpp, pull request 14992, fusionnée le 31 juillet 2025 (option --cpu-moe, raccourci pour mettre les poids des experts sur le CPU)", url: 'https://github.com/ggml-org/llama.cpp/pull/14992'},
      {label: "Wikipédia, Memory-mapped file (chargement paresseux : seules les pages réellement lues sont amenées en mémoire, par pagination à la demande)", url: 'https://en.wikipedia.org/wiki/Memory-mapped_file'},
      {label: "Hugging Face, Accelerate, Big Model Inference (remplir les GPU, puis décharger les poids en mémoire du CPU, puis sur le disque ; poids remontés sur le GPU juste avant chaque passage)", url: 'https://huggingface.co/docs/accelerate/concept_guides/big_model_inference'},
      {label: "Alizadeh et al. (Apple), LLM in a flash: Efficient Large Language Model Inference with Limited Memory, 12 décembre 2023 (poids gardés en mémoire flash et lus à la demande ; modèles jusqu'à deux fois la taille de la DRAM ; 4 à 5 fois plus rapide sur CPU et 20 à 25 fois sur GPU qu'un chargement naïf)", url: 'https://arxiv.org/abs/2312.11514'},
      {label: "Mistral AI, fiche de Mistral Large 4 sur Hugging Face (1 000 milliards de paramètres, 49 milliards actifs par token hors embeddings, 128 experts dont 4 actifs par token ; dépôt créé le 30 septembre 2026)", url: 'https://huggingface.co/mistralai/Mistral-Large-4-1T-A52B'},
      {label: "Unsloth, GGUF de Mistral Large 4 (version 1 bit UD-IQ1_S : 233,0 Go selon l'API Hugging Face, consultée le 9 novembre 2026). Calcul : 49 Md de paramètres actifs × 233 Go / 1 000 Md ≈ 11,4 Go relus par token ; 11,4 / 10,8 Go/s ≈ 1,1 s par token en UFS 5.0, plus de 2 s en UFS 4.1 (moins de 5,4 Go/s) ; une phrase de 20 tokens prend donc de 20 à 45 s, plus la lecture de la question, hors poids gardés en mémoire vive et lectures non séquentielles", url: 'https://huggingface.co/unsloth/Mistral-Large-4-1T-A52B-GGUF'},
      {label: "Samsung, Samsung Unveils Industry's Fastest UFS 5.0 Solution for Next-Gen On-Device AI Applications, 23 juin 2026 (lecture séquentielle jusqu'à 10,8 Go/s, plus de deux fois l'UFS 4.1 ; production en série au quatrième trimestre 2026)", url: 'https://news.samsung.com/global/samsung-unveils-industrys-fastest-ufs-5-0-solution-for-next-gen-on-device-ai-applications'},
      {label: "KTransformers, tutoriel DeepSeek-R1/V3 (10 février 2025 : DeepSeek-R1 671B en Q4_K_M avec 14 Go de VRAM et 382 Go de DRAM ; écriture à 8,73 tokens/s sur 32 cœurs et 11,26 sur deux processeurs ; experts calculés sur le CPU, attention et KV cache sur le GPU, à la différence du déchargement par couches de llama.cpp)", url: 'https://github.com/kvcache-ai/ktransformers/blob/main/doc/en/DeepseekR1_V3_tutorial.md'}
    ]
  }
];

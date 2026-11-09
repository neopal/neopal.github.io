// Vague 26, les cinq lots réunis pour le contrôle et la fusion.
module.exports = [
  {
    "id": "prefill-et-decode",
    "status": "live",
    "title": "Prefill et decode",
    "en": "Prefill and decode",
    "aliases": [
      "prefill",
      "decode",
      "prefill phase",
      "decode phase",
      "prompt processing",
      "token generation",
      "disaggregated serving",
      "P/D disaggregation",
      "TPOT",
      "time per output token"
    ],
    "aliasesFr": [
      "préremplissage",
      "phase de décodage",
      "lecture du prompt",
      "séparation prefill-decode"
    ],
    "jargon": [
      {
        "say": "pp, tg",
        "means": "prompt processing et text generation, les deux vitesses que mesure llama-bench, l'outil de test de llama.cpp ; la première, celle de la lecture, est presque toujours la plus élevée"
      },
      {
        "say": "TTFT",
        "means": "time to first token, le délai avant le premier mot de la réponse ; il mesure surtout la durée du prefill, donc la longueur de ce que tu as envoyé"
      },
      {
        "say": "TPOT",
        "means": "time per output token, le temps moyen entre deux tokens de la réponse, la mesure du decode"
      },
      {
        "say": "P/D disaggregation",
        "means": "la séparation du prefill et du decode sur des GPU différents, que pratiquent les gros serveurs d'inférence"
      }
    ],
    "cat": "inference",
    "links": [
      "inference",
      "kv-cache",
      "latence-vs-debit",
      "mythe-lit-mot-par-mot",
      "speculative-decoding",
      "prompt-caching",
      "bande-passante-memoire"
    ],
    "short": "Prefill et decode sont les deux phases d'une réponse, la lecture de tout ton message d'un bloc, limitée par le calcul, puis l'écriture token par token, limitée par la mémoire.",
    "image": "« La commande d'une table de douze, je la prends en une minute, ils parlent tous en même temps et je note tout. Ensuite, c'est un aller-retour en cuisine par assiette, et j'ai beau courir, c'est la longueur du couloir qui fait attendre les clients. »",
    "imagineForm": "E",
    "imagine": "Sur un Mac à puce M4, tu demandes à un petit modèle local de 7 milliards de paramètres « Résume-moi ça en cinq points » sous un mail de dix lignes. Le premier mot s'affiche en moins d'une seconde, et les cinq points tiennent en quelques secondes. Tu poses la même question sous un PDF de 80 pages, et l'écran reste vide plus de quatre minutes avant que les cinq points s'écrivent, eux aussi, en quelques secondes.",
    "full": [
      "Une réponse se fait en deux temps qui sollicitent des pièces différentes de la machine. Le prefill, la lecture, traite tous les tokens de ton message d'un seul passage et en parallèle, remplit le KV cache avec leurs clés et leurs valeurs, puis en tire le premier token de la réponse. Le decode, l'écriture, produit ensuite les suivants un à un, chacun dépendant du précédent, et chaque pas oblige la puce à relire en mémoire les poids du modèle pour un seul token. Selon NVIDIA, la lecture occupe toute la puissance de calcul du GPU, alors que l'écriture passe l'essentiel de son temps à attendre les données, et c'est la bande passante mémoire qui fixe alors son rythme.",
      "Les outils qui font tourner un modèle sur ta machine affichent donc deux vitesses, pp et tg dans llama.cpp, prompt eval et eval dans Ollama. Dans l'exemple de la documentation de llama.cpp, un Qwen2 de 7 milliards de paramètres compressé en 4 bits lit 7 340 tokens par seconde sur un GPU et en écrit 121, soixante fois moins. Les deux vitesses ne progressent pas non plus au même rythme. Dans le tableau que tient le projet sur les puces d'Apple, passer de la M4 Max à la M5 Max, à 40 cœurs graphiques chacune, rend la lecture 3,6 fois plus rapide et l'écriture 1,4 fois seulement.",
      "Le temps avant le premier token, le TTFT (time to first token), mesure surtout la lecture, et il grandit avec tout ce que tu envoies, documents collés, historique de la conversation et consignes comprises. Un début de requête déjà lu peut sauter cette étape grâce au cache de prompt, qui garde le KV cache calculé la fois précédente. L'écriture a ses propres remèdes, comme le décodage spéculatif, qui fait vérifier plusieurs tokens d'un coup au modèle pour employer la puissance de calcul qu'elle laisse dormir.",
      "Chez les fournisseurs, les deux phases se gênent quand elles partagent les mêmes GPU, et selon les auteurs de DistServe, une seule longue lecture peut rendre l'écriture des autres conversations 2 à 30 fois plus lente. Fin 2023, l'étude Splitwise propose de confier chaque phase à des machines différentes, et en janvier 2024, DistServe, coécrit par le laboratoire de Hao Zhang à l'UC San Diego, sert ainsi jusqu'à 7,4 fois plus de requêtes dans les délais visés. Moonshot AI a bâti sur ce principe Mooncake, la plateforme de son assistant Kimi, qui y traite 75 % de requêtes en plus, et NVIDIA l'a intégré en mars 2025 à Dynamo, son logiciel de service d'inférence. En novembre 2025, d'après le bilan de l'équipe de DistServe, presque tous les moteurs de service utilisés en production séparaient les deux phases."
    ],
    "office": [
      {
        "who": "q",
        "text": "On a branché notre base documentaire sur le modèle local, et les collègues attendent une minute avant le premier mot. Il écrit trop lentement ?"
      },
      {
        "who": "a",
        "text": "Il écrit sans doute bien, c'est la lecture des dizaines de pages jointes à chaque question qui fait attendre ; envoie seulement les passages utiles, et garde un début de requête identique d'une question à l'autre pour que le cache t'évite de tout relire."
      }
    ],
    "avoid": "« Ce modèle tourne à 500 tokens par seconde sur ma carte, il m'écrira une page en deux secondes. » Le chiffre le plus flatteur d'un test est souvent celui de la lecture ; la réponse s'écrit à la vitesse de l'autre phase, de neuf à soixante fois plus lente dans les mesures de llama.cpp citées ici, et c'est elle qui compte dans une conversation.",
    "video": null,
    "sources": [
      {
        "label": "NVIDIA, Mastering LLM Techniques: Inference Optimization, 17 novembre 2023 (prefill : opération matrice-matrice très parallélisée qui « effectively saturates GPU utilization » ; decode : un token à la fois, « the speed at which the data (weights, keys, values, activations) is transferred to the GPU from memory dominates the latency », « a memory-bound operation »)",
        "url": "https://developer.nvidia.com/blog/mastering-llm-techniques-inference-optimization/"
      },
      {
        "label": "NVIDIA, LLM Inference Benchmarking: Fundamental Concepts, 2 avril 2025 (le TTFT comprend l'attente, le prefill et le réseau ; « The longer the prompt, the larger the TTFT » ; la longueur d'entrée compte le prompt système, l'historique et les documents)",
        "url": "https://developer.nvidia.com/blog/llm-benchmarking-fundamental-concepts"
      },
      {
        "label": "llama.cpp, documentation de llama-bench, consultée le 9 novembre 2026 (tests « Prompt processing (pp) » et « Text generation (tg) » ; exemple qwen2 7B Q4_K - Medium sur CUDA : pp512 à 7 340,20 tokens/s, tg128 à 120,60 tokens/s). Calcul : 7 340 / 121 = 60,7",
        "url": "https://github.com/ggml-org/llama.cpp/blob/master/tools/llama-bench/README.md"
      },
      {
        "label": "llama.cpp, discussion #4167 Performance of llama.cpp on Apple Silicon M-series, tableau tenu par Georgi Gerganov, consulté le 9 novembre 2026 (LLaMA 7B en Q4_0 ; M4 à 10 cœurs graphiques : 221,29 tokens/s en lecture, 24,11 en écriture ; M4 Max à 40 cœurs : 885,68 et 83,06 ; M5 Max à 40 cœurs : 3 219,99 et 119,92). Calculs : 3 220 / 886 = 3,6 ; 119,9 / 83,1 = 1,44 ; 221 / 24 = 9,2. Imagine, au rythme de la M4 : un mail de dix lignes, environ 150 tokens, se lit en 150 / 221 = 0,7 s ; cinq points d'environ 100 tokens s'écrivent en 100 / 24 = 4 s ; un PDF de 80 pages, compté à 500 mots par page, fait 40 000 mots x 1,66 = 66 500 tokens environ, lus en au moins 66 500 / 221 = 300 s, la lecture ralentissant quand le contexte s'allonge",
        "url": "https://github.com/ggml-org/llama.cpp/discussions/4167"
      },
      {
        "label": "Candide, ou l'optimisme, Voltaire, texte du Projet Gutenberg compté avec tiktoken (o200k_base) le 9 novembre 2026 entre les marqueurs START et END : 56 650 tokens pour 34 080 mots, soit 1,66 token par mot en français (base du calcul de l'Imagine)",
        "url": "https://www.gutenberg.org/ebooks/4650"
      },
      {
        "label": "Ollama, documentation Usage de l'API, consultée le 9 novembre 2026 (prompt_eval_count et prompt_eval_duration pour les tokens d'entrée, eval_count et eval_duration pour les tokens de sortie ; prompt_eval_cached_count pour les tokens d'entrée relus depuis le cache)",
        "url": "https://docs.ollama.com/api/usage"
      },
      {
        "label": "Patel et al., Splitwise: Efficient generative LLM inference using phase splitting, 30 novembre 2023 (« a compute-intensive prompt computation, and a memory-intensive token generation » ; la génération sous-utilise le calcul ; les deux phases confiées à des machines séparées)",
        "url": "https://arxiv.org/abs/2311.18677"
      },
      {
        "label": "Zhong et al., DistServe: Disaggregating Prefill and Decoding for Goodput-optimized Large Language Model Serving, 18 janvier 2024 (prefill et decode sur des GPU différents ; TTFT pour le prefill, TPOT pour le decode ; « 7.4x more requests » dans les contraintes de latence)",
        "url": "https://arxiv.org/abs/2401.09670"
      },
      {
        "label": "Junda Chen, Yonghao Zhuang et Hao Zhang (Hao AI Lab, UC San Diego), Disaggregated Inference: 18 Months Later, 3 novembre 2025, bilan des auteurs de DistServe (« a single large prefill can inflate TPOT by 2~30x » même avec le chunked prefill ; « almost every production-grade LLM serving framework » tourne désormais en mode séparé, dont NVIDIA Dynamo, llm-d, SGLang, vLLM et Mooncake)",
        "url": "https://hao-ai-lab.github.io/blogs/distserve-retro/"
      },
      {
        "label": "Qin et al. (Moonshot AI), Mooncake: A KVCache-centric Disaggregated Architecture for LLM Serving, 24 juin 2024 (plateforme de service de Kimi, grappes de prefill et de decode séparées ; « enables Kimi to handle 75% more requests » en conditions réelles)",
        "url": "https://arxiv.org/abs/2407.00079"
      },
      {
        "label": "NVIDIA, NVIDIA Dynamo Open-Source Library Accelerates and Scales AI Reasoning Models, 18 mars 2025 (« uses disaggregated serving to separate the processing and generation phases of large language models (LLMs) on different GPUs »)",
        "url": "https://nvidianews.nvidia.com/news/nvidia-dynamo-open-source-library-accelerates-and-scales-ai-reasoning-models"
      }
    ]
  },
  {
    "id": "bande-passante-memoire",
    "status": "live",
    "title": "Bande passante mémoire",
    "en": "Memory bandwidth",
    "aliases": [
      "memory bandwidth",
      "memory-bound",
      "memory wall",
      "MBU",
      "model bandwidth utilization"
    ],
    "aliasesFr": [
      "débit mémoire",
      "mur de la mémoire"
    ],
    "jargon": [
      {
        "say": "memory-bound",
        "means": "limité par la mémoire : la puce attend ses données plus qu'elle ne calcule, ce qui est le cas pendant l'écriture d'une réponse ; l'inverse se dit compute-bound"
      },
      {
        "say": "MBU",
        "means": "model bandwidth utilization, la part de la bande passante théorique qu'un moteur exploite vraiment ; dans l'exemple de Databricks, un modèle de 7 milliards en 16 bits qui écrit un token toutes les 14 ms fait passer 1 To par seconde"
      },
      {
        "say": "mémoire unifiée",
        "means": "chez Apple, une seule mémoire partagée par le processeur et la partie graphique de la puce, si bien que le modèle n'a pas à tenir dans une carte graphique séparée"
      }
    ],
    "cat": "inference",
    "links": [
      "gpu",
      "quantization",
      "moe",
      "prefill-et-decode",
      "tailles-de-modele",
      "latence-vs-debit",
      "offloading"
    ],
    "short": "La bande passante mémoire est le volume de données qu'une puce lit dans sa mémoire par seconde ; elle fixe, plus que le calcul, la vitesse d'écriture d'un modèle.",
    "image": "Pour chaque mot de sa carte de vœux, Jean-Claude relit son dictionnaire de 2 000 pages en entier ; il réfléchit très vite, et c'est de tourner les pages qui lui prend la soirée. Depuis qu'il a pris l'édition de poche, ses cartes partent deux fois plus vite, et ses neveux trouvent qu'il écrit plus simplement.",
    "imagineForm": "A",
    "imagine": "Sur un Galaxy S25 Ultra, tu demandes à Ministral 3 8B, dans sa version 4 bits de 6 Go, un message pour annuler le dîner de samedi. Pour chacun des 50 tokens de sa réponse, le téléphone relit le modèle entier dans sa mémoire, soit 300 Go déplacés en trois secondes et demie au mieux, davantage que ses 256 Go de stockage ne pourraient en contenir. Le message d'excuse, lui, fait trois lignes.",
    "full": [
      "La bande passante mémoire (memory bandwidth) mesure combien d'octets une puce peut faire passer chaque seconde de sa mémoire à ses unités de calcul. Elle passe au premier plan quand un modèle écrit, parce que chaque nouveau token oblige un modèle dense à relire tous ses poids, pour ne faire que quelques opérations sur chaque octet lu. La vitesse d'écriture a donc un plafond qu'on calcule de tête, la bande passante divisée par ce que pèsent les poids en mémoire. Un Mac M1 Pro lit sa mémoire à 200 Go/s, et un modèle de 7 milliards de paramètres en 16 bits pèse 14 Go, d'où un plafond vers 14 tokens par seconde ; les mesures de llama.cpp lui en donnent 12,75. Le KV cache de la conversation s'ajoute aux poids à relire, et pèse d'autant plus qu'elle s'allonge.",
      "Tout ce qui réduit les octets à lire par token accélère donc l'écriture. Sur un Mac M2 Ultra, le même modèle de 7 milliards écrit 41 tokens par seconde en 16 bits et 94 une fois quantifié en 4 bits, sans que la puce ait changé. Un MoE gagne autrement, en ne relisant que les experts choisis pour le token, et Qwen3-30B-A3B, qui fait travailler 3,3 de ses 30,5 milliards de paramètres, en relit à chaque pas environ dix fois moins que Qwen3-32B, un modèle dense de taille voisine. La lecture de ton message échappe en revanche à ce plafond, parce que les poids chargés une fois servent à tous ses tokens en même temps, et c'est alors la puissance de calcul qui limite (voir Prefill et decode).",
      "L'écart entre les machines se lit dans leur fiche technique, et le tableau ci-dessous en donne quelques-unes. Un téléphone haut de gamme lit sa mémoire à 85 Go/s, une RTX 5090 à 1 792 Go/s, et une H100 de serveur, dont la mémoire HBM est montée contre la puce, à 3,35 To/s, quarante fois plus vite que le téléphone. Un modèle trop gros pour la mémoire peut être lu directement depuis le SSD, mais un très bon SSD plafonne à 7,45 Go/s, et Qwen3-32B en 4 bits n'en sortirait qu'un token toutes les 2,7 secondes.",
      "L'écart grandit avec le temps. En mars 2024, Amir Gholami et ses coauteurs comptaient que la puissance de calcul des serveurs avait triplé tous les deux ans depuis vingt ans, quand la bande passante de leur mémoire n'était multipliée que par 1,6 sur la même période. Ils appellent ce décalage le mur de la mémoire (memory wall), et le tiennent pour le principal goulot d'étranglement du service des modèles."
    ],
    "table": {
      "caption": "Bande passante de quelques machines, et plafond d'écriture pour Qwen3-32B en 4 bits (20 Go)",
      "asOf": "9 novembre 2026",
      "columns": [
        "Machine",
        "Mémoire",
        "Capacité",
        "Bande passante",
        "Plafond"
      ],
      "rows": [
        [
          "Galaxy S25 Ultra (Snapdragon 8 Elite)",
          "LPDDR5X",
          "12 Go",
          "84,8 Go/s",
          "ne tient pas"
        ],
        [
          "PC avec RTX 3060",
          "GDDR6",
          "12 Go",
          "360 Go/s",
          "ne tient pas"
        ],
        [
          "PC avec RTX 5090",
          "GDDR7",
          "32 Go",
          "1 792 Go/s",
          "90 tokens/s"
        ],
        [
          "Mac Studio M5 Ultra",
          "unifiée",
          "jusqu'à 512 Go",
          "1,2 To/s",
          "60 tokens/s"
        ],
        [
          "Serveur avec H100 SXM",
          "HBM",
          "80 Go",
          "3,35 To/s",
          "168 tokens/s"
        ],
        [
          "SSD Samsung 990 PRO",
          "flash NVMe",
          "jusqu'à 4 To",
          "7,45 Go/s",
          "0,37 token/s"
        ]
      ],
      "note": "Plafond : bande passante divisée par les 20 Go à relire pour chaque token, sans compter le KV cache. C'est une borne haute, et les vitesses mesurées restent en dessous."
    },
    "office": [
      {
        "who": "q",
        "text": "On a mis 64 Go de RAM dans le PC pour faire tourner le modèle sur le processeur. Il tient, mais il écrit deux mots par seconde."
      },
      {
        "who": "a",
        "text": "La capacité dit si le modèle tient, la bande passante dit à quelle vitesse il écrit. Une barrette de DDR5 se lit à 70 Go/s au mieux, vingt-cinq fois moins vite que la mémoire d'une RTX 5090 ; prends un modèle plus compressé, ou un MoE qui relit moins de poids par token."
      }
    ],
    "avoid": "« Le modèle tient dans la mémoire, il sera rapide. » Tenir dit seulement qu'il démarre. Un Mac Studio M5 Ultra de 512 Go peut charger un modèle dense de 400 Go, mais il le relit à 1,2 To/s et n'en tire que trois tokens par seconde au mieux.",
    "video": null,
    "sources": [
      {
        "label": "NVIDIA, Mastering LLM Techniques: Inference Optimization, 17 novembre 2023 (le prefill « effectively saturates GPU utilization » ; pendant le decode, « the speed at which the data (weights, keys, values, activations) is transferred to the GPU from memory dominates the latency » ; un modèle de 7 milliards en 16 bits « would take roughly 7B * sizeof(FP16) ~= 14 GB » ; la quantization permet de « transfer more parameters over the same amount of bandwidth »)",
        "url": "https://developer.nvidia.com/blog/mastering-llm-techniques-inference-optimization/"
      },
      {
        "label": "Databricks, LLM Inference Performance Engineering: Best Practices, 12 octobre 2023 (vitesse d'écriture dépendante du chargement des paramètres depuis la mémoire ; MBU = bande passante obtenue / bande passante maximale, avec bande passante obtenue = (taille des paramètres + taille du KV cache) / temps par token ; exemple d'un 7B en 16 bits à 14 ms par token, soit 14 Go en 14 ms, 1 To/s)",
        "url": "https://www.databricks.com/blog/llm-inference-performance-engineering-best-practices"
      },
      {
        "label": "llama.cpp, discussion #4167 Performance of llama.cpp on Apple Silicon M-series, tableau de mesures consulté le 9 novembre 2026 (Llama 2 7B, vitesse d'écriture tg : M1 Pro à 200 Go/s, 12,75 tokens/s en F16 ; M2 Ultra à 800 Go/s et 76 cœurs graphiques, 41,02 tokens/s en F16 et 94,27 en Q4_0). Calcul du plafond : 200 / 14 = 14,3 tokens/s",
        "url": "https://github.com/ggml-org/llama.cpp/discussions/4167"
      },
      {
        "label": "Gholami et al., AI and Memory Wall, 21 mars 2024, publié dans IEEE Micro (sur vingt ans, puissance de calcul des serveurs multipliée par 3,0 tous les deux ans, bande passante de la DRAM par 1,6 ; la mémoire devenue le principal goulot, en particulier pour servir les modèles)",
        "url": "https://arxiv.org/abs/2403.14123"
      },
      {
        "label": "Mistral AI, fiche de Ministral-3-8B-Instruct-2512 (8,4 milliards de paramètres de langage et 0,4 milliard pour la vision, « designed for edge deployment »)",
        "url": "https://huggingface.co/mistralai/Ministral-3-8B-Instruct-2512"
      },
      {
        "label": "Ollama, ministral-3, consulté le 9 novembre 2026 (ministral-3:8b-instruct-2512-q4_K_M : 6,0 Go). Calcul de l'Imagine : 50 tokens x 6,0 Go = 300 Go relus ; 6,0 / 84,8 = 0,071 s par token au mieux, x 50 = 3,5 s ; plafond 84,8 / 6,0 = 14 tokens/s (schéma : 360 / 6 = 60, 1 792 / 6 = 299, 3 350 / 6 = 558)",
        "url": "https://ollama.com/library/ministral-3/tags"
      },
      {
        "label": "Wikipédia, Samsung Galaxy S25 (S25 Ultra : Snapdragon 8 Elite for Galaxy, 12 Go de mémoire LPDDR5X, stockage à partir de 256 Go)",
        "url": "https://en.wikipedia.org/wiki/Samsung_Galaxy_S25"
      },
      {
        "label": "Wikipédia, List of Qualcomm Snapdragon systems on chips (Snapdragon 8 Elite, annoncé le 22 octobre 2024 : LPDDR5X sur quatre canaux de 16 bits, 5 300 MHz, 84,8 Go/s)",
        "url": "https://en.wikipedia.org/wiki/List_of_Qualcomm_Snapdragon_systems_on_chips"
      },
      {
        "label": "NVIDIA, GeForce RTX 3060 Family (RTX 3060 : 12 Go de GDDR6, bus de 192 bits)",
        "url": "https://www.nvidia.com/en-us/geforce/graphics-cards/30-series/rtx-3060-3060ti/"
      },
      {
        "label": "Wikipédia, GeForce RTX 30 series (RTX 3060 12 Go : mémoire à 15 Gb/s par broche sur 192 bits, 360 Go/s ; calcul : 15 x 192 / 8 = 360)",
        "url": "https://en.wikipedia.org/wiki/GeForce_RTX_30_series"
      },
      {
        "label": "NVIDIA, GeForce RTX 5090 (32 Go de GDDR7, bus de 512 bits)",
        "url": "https://www.nvidia.com/en-us/geforce/graphics-cards/50-series/rtx-5090/"
      },
      {
        "label": "Wikipédia, GeForce RTX 50 series (RTX 5090 : 28 Gb/s par broche sur 512 bits, 1 792 Go/s ; calcul : 28 x 512 / 8 = 1 792)",
        "url": "https://en.wikipedia.org/wiki/GeForce_RTX_50_series"
      },
      {
        "label": "Apple, Apple introduces new Mac Studio with M5 Max and M5 Ultra, 25 août 2026 (M5 Ultra : « 1.2TB/s of memory bandwidth », jusqu'à 512 Go de mémoire unifiée ; M5 Max jusqu'à 614 Go/s). Calcul de « À éviter » : 1 200 / 400 = 3 tokens/s",
        "url": "https://www.apple.com/newsroom/2026/08/apple-introduces-new-mac-studio-with-m5-max-and-m5-ultra/"
      },
      {
        "label": "NVIDIA, H100 Tensor Core GPU (H100 SXM : 80 Go, 3,35 To/s ; H100 NVL : 94 Go, 3,9 To/s). Calcul : 3 350 / 84,8 = 39,5, environ quarante fois le téléphone",
        "url": "https://www.nvidia.com/en-us/data-center/h100/"
      },
      {
        "label": "Samsung, 990 PRO 4TB PCIe 4.0 NVMe M.2 SSD (lecture séquentielle jusqu'à 7 450 Mo/s ; « PCIe 4.0's best theoretical sequential read is 8000 MB/s »). Calcul : 20 / 7,45 = 2,7 s par token pour Qwen3-32B en 4 bits",
        "url": "https://www.samsung.com/ie/business/memory-storage/nvme-ssd/990-pro-4tb-nvme-pcie-gen-4-mz-v9p4t0bw/"
      },
      {
        "label": "Qwen, Qwen3: Think Deeper, Act Faster, 29 avril 2025 (Qwen3-32B parmi les six modèles denses publiés, Qwen3-30B-A3B parmi les deux MoE)",
        "url": "https://qwenlm.github.io/blog/qwen3/"
      },
      {
        "label": "Qwen, fiche de Qwen3-30B-A3B (30,5 milliards de paramètres, 3,3 milliards activés, 8 experts sur 128). Calcul : 32,8 / 3,3 = 9,9, environ dix fois moins de paramètres relus par token que Qwen3-32B",
        "url": "https://huggingface.co/Qwen/Qwen3-30B-A3B"
      },
      {
        "label": "Qwen, fiche de Qwen3-32B (32,8 milliards de paramètres)",
        "url": "https://huggingface.co/Qwen/Qwen3-32B"
      },
      {
        "label": "Ollama, qwen3, consulté le 9 novembre 2026 (qwen3:32b en q4_K_M : 20 Go ; qwen3:30b-a3b-q4_K_M : 19 Go). Calculs du tableau : 1 792 / 20 = 90 ; 1 200 / 20 = 60 ; 3 350 / 20 = 168 ; 7,45 / 20 = 0,37",
        "url": "https://ollama.com/library/qwen3/tags"
      },
      {
        "label": "Wikipédia, DDR5 SDRAM (bande passante d'un module de 32 à 70,4 Go/s). Calcul : 1 792 / 70,4 = 25,5",
        "url": "https://en.wikipedia.org/wiki/DDR5_SDRAM"
      }
    ]
  },
  {
    "id": "offloading",
    "status": "live",
    "title": "Offloading (déchargement des poids)",
    "en": "Offloading",
    "aliases": [
      "offload",
      "CPU offload",
      "GPU offloading",
      "partial offload",
      "expert offloading",
      "MoE offloading"
    ],
    "aliasesFr": [
      "déchargement",
      "déchargement des poids",
      "inférence hybride CPU-GPU"
    ],
    "jargon": [
      {
        "say": "-ngl",
        "means": "l'option de llama.cpp qui fixe combien de couches du modèle vont dans la mémoire de la carte graphique ; les autres restent en mémoire vive, calculées par le processeur"
      },
      {
        "say": "--cpu-moe",
        "means": "l'option de llama.cpp, ajoutée en juillet 2025, qui laisse tous les experts d'un MoE en mémoire vive et met le reste du modèle sur la carte graphique"
      },
      {
        "say": "offload sur le GPU",
        "means": "dans llama.cpp, le mot sert dans l'autre sens : on « offloade » vers la carte graphique les couches qu'elle peut prendre, et le reste demeure au processeur"
      },
      {
        "say": "mmap",
        "means": "memory map, le mode de chargement par défaut de llama.cpp : le système traite le fichier du modèle comme s'il était en mémoire et ne lit sur le disque que les morceaux touchés"
      }
    ],
    "cat": "inference",
    "links": [
      "bande-passante-memoire",
      "quantization",
      "moe",
      "open-weights",
      "elagage-d-experts"
    ],
    "solutions": [
      {
        "name": "llama.cpp",
        "kind": "bibliothèque open source",
        "url": "https://github.com/ggml-org/llama.cpp"
      },
      {
        "name": "KTransformers",
        "kind": "bibliothèque open source",
        "url": "https://github.com/kvcache-ai/ktransformers"
      },
      {
        "name": "Accelerate (Hugging Face)",
        "kind": "bibliothèque open source",
        "url": "https://huggingface.co/docs/accelerate/concept_guides/big_model_inference"
      }
    ],
    "short": "L'offloading range ailleurs, en mémoire vive ou sur disque, les poids d'un modèle trop gros pour la mémoire de la carte graphique ; le modèle tourne, mais plus lentement.",
    "image": "Dans son studio de 18 m², Bastien n'a qu'un frigo de bar, alors ses courses dorment à la cave, six étages plus bas. Pour chaque plat, il descend chercher juste ce qu'il lui faut, et le dîner arrive à minuit.",
    "imagineForm": "D",
    "imagine": "« Mon téléphone peut vraiment faire tourner un modèle de mille milliards de paramètres ? », demande Malik à sa cousine, qui vient d'installer Mistral Large 4 sur le sien. « Oui, pose-lui ta question en montant dans le métro, il aura fini sa première phrase à la station suivante. »",
    "full": [
      "Une carte graphique calcule vite parce que les poids du modèle sont rangés dans sa propre mémoire, tout près de la puce. Quand le fichier dépasse cette mémoire, le déchargement (offloading) en garde une partie ailleurs. Dans llama.cpp, l'option -ngl fixe le nombre de couches confiées à la carte, et les suivantes restent en mémoire vive, où le processeur les calcule. Le logiciel ouvre aussi le fichier en mmap par défaut, et le système ne va chercher sur le disque que les morceaux dont le calcul a besoin. La bibliothèque Accelerate de Hugging Face suit la même pente, en remplissant la carte, puis la mémoire vive, puis le disque.",
      "Le modèle démarre alors, ce qui ne dit rien de sa vitesse, parce que chaque token oblige à relire tous les poids qui servent, y compris ceux qu'on a relégués dans la mémoire lente. Le 8 novembre 2026, une publication sur X annonçait Mistral Large 4, mille milliards de paramètres, en local sur un smartphone. Sa version la plus compressée pèse 233 Go, bien plus que la mémoire vive d'un téléphone, et chaque token relit une dizaine de gigaoctets sur le stockage. L'UFS 5.0 que Samsung a présenté en juin 2026, le stockage mobile le plus rapide annoncé à ce jour avec 10,8 Go par seconde, laisse encore environ une seconde par token, et la génération précédente, l'UFS 4.1, lit deux fois moins vite. En décembre 2023, les chercheurs d'Apple avaient montré avec « LLM in a flash » qu'en lisant moins, et par plus gros blocs, on allait 4 à 5 fois plus vite qu'un chargement naïf sur processeur, et 20 à 25 fois sur carte graphique. Leurs modèles faisaient deux fois la taille de la mémoire vive, loin de l'écart qui sépare les 233 Go de Mistral Large 4 de celle d'un téléphone.",
      "Les MoE se prêtent mieux au déchargement, parce que chaque token ne fait travailler que quelques experts. En février 2025, l'équipe de KTransformers a fait tourner DeepSeek-R1, 671 milliards de paramètres réduits à environ 4 bits par quantization, avec 14 Go de mémoire graphique et 382 Go de mémoire vive, en écrivant 8,7 à 11,3 tokens par seconde. Les experts restaient en mémoire vive, calculés par le processeur, pendant que la carte gardait l'attention et le cache. L'autre façon de faire tenir un MoE dans moins de mémoire consiste à lui retirer des experts, c'est l'élagage d'experts."
    ],
    "then": "Jusqu'en 2024, on déchargeait un modèle couche par couche, les premières sur la carte graphique et les suivantes au processeur. En 2025, KTransformers puis llama.cpp, avec --override-tensor en avril et --cpu-moe en juillet, ont trié les poids selon leur rôle, l'attention sur la carte et les experts en mémoire vive, ce qui suit enfin la façon dont un MoE lit ses poids.",
    "office": [
      {
        "who": "q",
        "text": "On n'a qu'une carte de 24 Go sur le serveur, on peut quand même y faire tourner un modèle de 200 Go ?"
      },
      {
        "who": "a",
        "text": "Il démarrera grâce à l'offloading, mais un modèle dense relira à chaque token tout ce qui ne tient pas sur la carte ; prends plutôt un MoE, laisse ses experts en mémoire vive, et mesure la vitesse avant de l'annoncer à qui que ce soit."
      }
    ],
    "avoid": "« S'il se charge, il tourne. » Un modèle qui se charge a seulement trouvé de la place pour ses poids. Sa vitesse dépend de la mémoire la plus lente où il doit les relire à chaque token, et sous un token par seconde, une réponse de dix lignes prend plusieurs minutes.",
    "video": null,
    "sources": [
      {
        "label": "llama.cpp, README de llama-server (-ngl : nombre de couches gardées en VRAM ; --override-tensor ; --cpu-moe et --n-cpu-moe : experts du MoE gardés côté CPU ; chargement en mmap par défaut ; lecture de certains tenseurs sur le disque à la demande), consulté le 9 novembre 2026",
        "url": "https://github.com/ggml-org/llama.cpp/blob/master/tools/server/README.md"
      },
      {
        "label": "llama.cpp, README (inférence hybride CPU + GPU pour accélérer en partie les modèles plus gros que la VRAM)",
        "url": "https://github.com/ggml-org/llama.cpp"
      },
      {
        "label": "llama.cpp, pull request 11397, fusionnée le 2 avril 2025 (option --override-tensor ; exemple « -ngl 99 -ot exps=CPU » pour garder les experts d'un MoE sur le CPU et décharger le reste vers le GPU)",
        "url": "https://github.com/ggml-org/llama.cpp/pull/11397"
      },
      {
        "label": "llama.cpp, pull request 14992, fusionnée le 31 juillet 2025 (option --cpu-moe, raccourci pour mettre les poids des experts sur le CPU)",
        "url": "https://github.com/ggml-org/llama.cpp/pull/14992"
      },
      {
        "label": "Wikipédia, Memory-mapped file (chargement paresseux : seules les pages réellement lues sont amenées en mémoire, par pagination à la demande)",
        "url": "https://en.wikipedia.org/wiki/Memory-mapped_file"
      },
      {
        "label": "Hugging Face, Accelerate, Big Model Inference (remplir les GPU, puis décharger les poids en mémoire du CPU, puis sur le disque ; poids remontés sur le GPU juste avant chaque passage)",
        "url": "https://huggingface.co/docs/accelerate/concept_guides/big_model_inference"
      },
      {
        "label": "Alizadeh et al. (Apple), LLM in a flash: Efficient Large Language Model Inference with Limited Memory, 12 décembre 2023 (poids gardés en mémoire flash et lus à la demande ; modèles jusqu'à deux fois la taille de la DRAM ; 4 à 5 fois plus rapide sur CPU et 20 à 25 fois sur GPU qu'un chargement naïf)",
        "url": "https://arxiv.org/abs/2312.11514"
      },
      {
        "label": "Mistral AI, fiche de Mistral Large 4 sur Hugging Face (1 000 milliards de paramètres, 49 milliards actifs par token hors embeddings, 128 experts dont 4 actifs par token ; dépôt créé le 30 septembre 2026)",
        "url": "https://huggingface.co/mistralai/Mistral-Large-4-1T-A52B"
      },
      {
        "label": "Unsloth, GGUF de Mistral Large 4 (version 1 bit UD-IQ1_S : 233,0 Go selon l'API Hugging Face, consultée le 9 novembre 2026). Calcul : 49 Md de paramètres actifs × 233 Go / 1 000 Md ≈ 11,4 Go relus par token ; 11,4 / 10,8 Go/s ≈ 1,1 s par token en UFS 5.0, plus de 2 s en UFS 4.1 (moins de 5,4 Go/s) ; une phrase de 20 tokens prend donc de 20 à 45 s, plus la lecture de la question, hors poids gardés en mémoire vive et lectures non séquentielles",
        "url": "https://huggingface.co/unsloth/Mistral-Large-4-1T-A52B-GGUF"
      },
      {
        "label": "Samsung, Samsung Unveils Industry's Fastest UFS 5.0 Solution for Next-Gen On-Device AI Applications, 23 juin 2026 (lecture séquentielle jusqu'à 10,8 Go/s, plus de deux fois l'UFS 4.1 ; production en série au quatrième trimestre 2026)",
        "url": "https://news.samsung.com/global/samsung-unveils-industrys-fastest-ufs-5-0-solution-for-next-gen-on-device-ai-applications"
      },
      {
        "label": "KTransformers, tutoriel DeepSeek-R1/V3 (10 février 2025 : DeepSeek-R1 671B en Q4_K_M avec 14 Go de VRAM et 382 Go de DRAM ; écriture à 8,73 tokens/s sur 32 cœurs et 11,26 sur deux processeurs ; experts calculés sur le CPU, attention et KV cache sur le GPU, à la différence du déchargement par couches de llama.cpp)",
        "url": "https://github.com/kvcache-ai/ktransformers/blob/main/doc/en/DeepseekR1_V3_tutorial.md"
      }
    ]
  },
  {
    "id": "elagage-d-experts",
    "status": "live",
    "title": "Élagage d'experts",
    "en": "Expert pruning",
    "aliases": [
      "expert pruning",
      "MoE pruning",
      "REAP",
      "pruning",
      "pruned model",
      "expert merging"
    ],
    "aliasesFr": [
      "élagage",
      "fusion d'experts",
      "modèle élagué"
    ],
    "jargon": [
      {
        "say": "REAP",
        "means": "Router-weighted Expert Activation Pruning, la méthode publiée par Cerebras en octobre 2025 : chaque expert est noté sur la force avec laquelle le routeur le choisit et sur le poids de sa sortie, et les moins bien notés partent"
      },
      {
        "say": "REAP-25B-A3B",
        "means": "un nom de modèle élagué : Qwen3-Coder-30B-A3B ramené à 25 milliards de paramètres, qui en fait toujours travailler 3 milliards pour chaque token"
      },
      {
        "say": "calibration set",
        "means": "le lot d'exemples qu'on fait passer dans le modèle pour noter ses experts ; ce qu'il ne contient pas risque de partir avec les experts retirés"
      },
      {
        "say": "REAP50, 50 % compression",
        "means": "la part des experts retirés dans chaque couche, ici la moitié"
      }
    ],
    "cat": "entrainement",
    "links": [
      "moe",
      "quantization",
      "offloading",
      "distillation",
      "tailles-de-modele",
      "mythe-ia-locale"
    ],
    "short": "L'élagage d'experts retire d'un MoE les experts qui servent le moins, repérés sur un lot d'exemples, pour qu'il prenne moins de mémoire sans le réentraîner.",
    "image": "Pour faire tenir sa brasserie dans un food truck, Joël a relevé une semaine de commandes en plein mois d'août, puis laissé au dépôt les cuisiniers qu'on n'appelait presque jamais. Chaque plat passe toujours entre trois paires de mains et le camion roule très bien, jusqu'au jour de novembre où un client demande une choucroute ; Régis, qui la faisait, est resté au dépôt.",
    "imagineForm": "A",
    "imagine": "Le fichier de Qwen3-Coder-480B, le grand modèle de code de Qwen, pèse 960 Go en 16 bits, de quoi occuper une fibre à 1 gigabit par seconde pendant 2 h 08. Cerebras lui a retiré la moitié des experts de chaque couche, et la version élaguée se télécharge en 1 h 06. Sur les tests de programmation, elle garde 97,6 % de son score.",
    "full": [
      "Un MoE garde en mémoire tous ses experts, alors que chaque token n'en fait travailler qu'une poignée. L'élagage d'experts (expert pruning) retire ceux qui servent le moins. On fait passer dans le modèle un lot d'exemples, la calibration, on note chaque expert d'après ce qu'il y a fait, puis on supprime les moins bien notés de chaque couche, en une passe et sans réentraînement. La méthode REAP, publiée par Cerebras en octobre 2025, pose deux questions à chaque expert : avec quelle force le routeur le choisit-il, et combien sa sortie pèse-t-elle quand il travaille ? Le routeur choisit ensuite autant d'experts qu'avant parmi ceux qui restent, et Qwen3-Coder-REAP-25B-A3B garde le A3B de l'original, parce que le modèle prend moins de place sans calculer moins pour chaque token.",
      "Le gain se voit sur une machine perso. En 4 bits (Q4_K_M), le fichier de Qwen3-Coder-30B pèse 18,6 Go, trop pour une carte graphique de 16 Go, qui devrait en laisser une partie dans la mémoire du processeur et tournerait plus lentement. Sa version élaguée par Cerebras, à 103 experts par couche au lieu de 128, pèse 15,2 Go dans le même format. Les auteurs de REAP reconnaissent pourtant qu'à taille égale, la quantization fait mieux tant qu'on ne descend pas sous 4 bits, puisqu'un Qwen3-30B-A3B quantifié en 4 bits bat sa version élaguée de moitié restée en 16 bits, avec un fichier deux fois plus petit. Les deux méthodes s'additionnent, et sur leur plus gros modèle testé, de mille milliards de paramètres, 4 bits et moitié des experts retirés font 87,5 % de mémoire en moins, là où la quantization seule devrait descendre à 2 bits.",
      "L'élagage ne date pas des MoE. En janvier 2023, SparseGPT mettait à zéro jusqu'à 60 % des poids d'OPT-175B en une passe, presque sans perte sur ses mesures. En 2024, NVIDIA a taillé dans Nemotron-4 15B pour en tirer des modèles de 8 et 4 milliards de paramètres, réentraînés par distillation avec moins de 3 % des données d'origine. Dans un MoE, on coupe des experts entiers. L'autre voie, la fusion d'experts (expert merging), regroupe ceux qui se ressemblent et en fait la moyenne ; elle tient sur les QCM, mais d'après Cerebras, elle rend le texte généré plus répétitif. En avril 2026, le laboratoire de Samsung à Montréal a proposé REAM, une fusion guidée par la note de REAP, souvent proche du modèle d'origine dans ses tests.",
      "Ce qu'on perd dépend des exemples de calibration. Cerebras a montré qu'un modèle de code compressé d'après des textes du web tout-venant pouvait ne plus rien écrire de cohérent. Le 5 novembre 2026, deux chercheurs de Hostinger ont élagué au quart, avec REAP et des exemples en anglais, quatre MoE dont Gemma 4 et GLM-4.7-Flash, et la compréhension écrite a perdu 1,7 point en médiane en anglais, contre 21,4 points en lituanien. Dans les dernières couches, le lituanien envoie 55 à 72 % de ses choix vers huit experts seulement, que des exemples en anglais font en partie retirer ; une calibration en lituanien répare l'essentiel. En septembre 2026, les auteurs de RAZOR relevaient encore des changements de style, de mise en forme et de fin de réponse chez des modèles élagués dont les scores montaient. Les mesures publiées portent surtout sur le code, les maths et quelques langues, et la tenue d'un modèle élagué sur tes propres tâches, en français, reste à vérifier."
    ],
    "table": {
      "caption": "Quelques modèles élagués et publiés par Cerebras avec REAP",
      "asOf": "9 novembre 2026",
      "columns": [
        "Modèle d'origine",
        "Version élaguée publiée",
        "Experts par couche",
        "Paramètres (milliards)",
        "Experts actifs par token"
      ],
      "rows": [
        [
          "Qwen3-Coder-30B-A3B",
          "octobre 2025",
          "128 → 103",
          "30,5 → 24,9",
          "8"
        ],
        [
          "GLM-4.7-Flash",
          "janvier 2026",
          "64 → 48",
          "31,2 → 23,0",
          "4"
        ],
        [
          "MiniMax-M2.5",
          "février 2026",
          "256 → 154",
          "228,7 → 139,1",
          "8"
        ],
        [
          "Qwen3-Coder-480B-A35B",
          "octobre 2025",
          "160 → 80",
          "480,2 → 246,1",
          "8"
        ],
        [
          "DeepSeek-V3.2",
          "décembre 2025",
          "256 → 128",
          "685,4 → 344,9",
          "8"
        ]
      ],
      "note": "Nombre de paramètres selon l'API Hugging Face, experts lus dans les fichiers de configuration. Le nombre d'experts actifs ne bouge pas : le modèle élagué calcule chaque token comme l'original."
    },
    "then": "En février 2024, des chercheurs retiraient 2 experts sur 8 d'un MoE de 47 milliards de paramètres, pour environ 3 points de perte, dans un article de recherche. En octobre 2025, Cerebras a élagué jusqu'à la moitié des experts de modèles allant jusqu'à mille milliards de paramètres, puis a publié ses versions élaguées sur Hugging Face, où des centaines de modèles portent REAP dans leur nom en novembre 2026.",
    "office": [
      {
        "who": "q",
        "text": "Qwen3-Coder 30B ne tient pas sur notre carte de 16 Go. On prend la version élaguée de Cerebras ou on descend en 3 bits ?"
      },
      {
        "who": "a",
        "text": "Pour du code, prends la version élaguée en 4 bits, puisque Cerebras a choisi les experts à garder sur du code et des appels d'outils. Si l'outil doit aussi répondre aux clients en français, teste-la d'abord sur une dizaine de vraies demandes en français."
      }
    ],
    "avoid": "« Un modèle élagué de moitié répond deux fois plus vite. » Chaque token passe toujours par autant d'experts, donc le calcul ne change pas ; la vitesse ne grimpe que si le modèle, devenu plus petit, tient enfin tout entier dans la mémoire de la carte au lieu d'en déborder.",
    "video": null,
    "sources": [
      {
        "label": "Lasby et al. (Cerebras et université de Calgary), REAP the Experts: Why Pruning Prevails for One-Shot MoE compression, 15 octobre 2025, version 3 du 13 mai 2026 (critère qui combine le choix du routeur et la sortie de l'expert ; quasi sans perte sur le code après 50 % d'experts retirés de Qwen3-Coder-480B et Kimi-K2 ; fusion plus répétitive en génération ; calibration sur C4 qui effondre le code ; à taille égale, Qwen3-30B-A3B en 4 bits AWQ bat la version élaguée de 50 % en 16 bits ; 4 bits et 50 % d'experts retirés = 87,5 % de taille en moins, sinon il faudrait 2 bits)",
        "url": "https://arxiv.org/abs/2510.13999"
      },
      {
        "label": "Cerebras, REAP: One-Shot Pruning for Trillion-Parameter Mixture-of-Experts Models, 16 octobre 2025 (deux questions : force du choix par le routeur, poids de la sortie ; Qwen3-Coder-480B en FP8 élagué de 50 % garde 97,6 % de son score de code hors agents et 96,7 % sur SWE-bench)",
        "url": "https://www.cerebras.ai/blog/reap"
      },
      {
        "label": "Qwen, fiche de Qwen3-Coder-480B-A35B-Instruct : 160 experts par couche, 62 couches, 8 actifs ; 960,3 Go de fichiers selon l'API Hugging Face, consultée le 9 novembre 2026. Calcul : 960,3 Go x 8 = 7 682 gigabits, soit 7 682 s = 2 h 08 à 1 Gbit/s, débit théorique",
        "url": "https://huggingface.co/Qwen/Qwen3-Coder-480B-A35B-Instruct"
      },
      {
        "label": "Cerebras, fiche de Qwen3-Coder-REAP-246B-A35B : 80 experts par couche, 246,1 milliards de paramètres, 492,2 Go de fichiers selon l'API Hugging Face, publiée le 30 octobre 2025. Calcul : 492,2 Go x 8 = 3 938 gigabits, soit 3 938 s = 1 h 06 à 1 Gbit/s",
        "url": "https://huggingface.co/cerebras/Qwen3-Coder-REAP-246B-A35B"
      },
      {
        "label": "Cerebras, fiche de Qwen3-Coder-REAP-25B-A3B, 20 octobre 2025 (20 % d'experts retirés, 103 sur 128, 3 milliards actifs, calibration sur du code, des appels de fonctions et des trajectoires d'agent ; scores proches de l'original)",
        "url": "https://huggingface.co/cerebras/Qwen3-Coder-REAP-25B-A3B"
      },
      {
        "label": "Qwen, fiche de Qwen3-Coder-30B-A3B-Instruct (128 experts, 8 actifs, 30,5 milliards de paramètres selon l'API Hugging Face)",
        "url": "https://huggingface.co/Qwen/Qwen3-Coder-30B-A3B-Instruct"
      },
      {
        "label": "Unsloth, Qwen3-Coder-30B-A3B-Instruct-GGUF : fichier Q4_K_M de 18,56 Go (API Hugging Face, consultée le 9 novembre 2026)",
        "url": "https://huggingface.co/unsloth/Qwen3-Coder-30B-A3B-Instruct-GGUF"
      },
      {
        "label": "Bartowski, cerebras_Qwen3-Coder-REAP-25B-A3B-GGUF : fichier Q4_K_M de 15,19 Go (API Hugging Face, consultée le 9 novembre 2026)",
        "url": "https://huggingface.co/bartowski/cerebras_Qwen3-Coder-REAP-25B-A3B-GGUF"
      },
      {
        "label": "Cerebras, fiche de GLM-4.7-Flash-REAP-23B-A3B, 23 janvier 2026 (48 experts routés par couche au lieu de 64 chez zai-org/GLM-4.7-Flash, 4 actifs ; 23,0 contre 31,2 milliards de paramètres selon l'API Hugging Face)",
        "url": "https://huggingface.co/cerebras/GLM-4.7-Flash-REAP-23B-A3B"
      },
      {
        "label": "Cerebras, fiche de MiniMax-M2.5-REAP-139B-A10B, 18 février 2026 (154 experts par couche au lieu de 256 chez MiniMaxAI/MiniMax-M2.5, 8 actifs ; 139,1 contre 228,7 milliards de paramètres selon l'API Hugging Face)",
        "url": "https://huggingface.co/cerebras/MiniMax-M2.5-REAP-139B-A10B"
      },
      {
        "label": "Cerebras, fiche de DeepSeek-V3.2-REAP-345B-A37B, 9 décembre 2025 (128 experts routés par couche au lieu de 256 chez deepseek-ai/DeepSeek-V3.2, 8 actifs ; 344,9 contre 685,4 milliards de paramètres selon l'API Hugging Face)",
        "url": "https://huggingface.co/cerebras/DeepSeek-V3.2-REAP-345B-A37B"
      },
      {
        "label": "Rasymas et Kvedaras (Hostinger Research), English Calibration Erodes Lithuanian in Expert-Pruned Mixture-of-Experts Language Models, 5 novembre 2026 (quatre MoE dont Qwen3.6, Gemma 4 et GLM-4.7-Flash élagués avec REAP ; à 25 %, compréhension en baisse médiane de 1,7 point en anglais et 21,4 en lituanien ; 55 à 72 % des choix lituaniens des dernières couches vers huit experts ; la calibration en lituanien répare l'essentiel)",
        "url": "https://arxiv.org/abs/2611.07654"
      },
      {
        "label": "Jha et al. (Samsung SAIL Montréal), REAM: Merging Improves Pruning of Experts in LLMs, 6 avril 2026 (fusion d'experts guidée par le critère de REAP, souvent comparable au modèle non compressé)",
        "url": "https://arxiv.org/abs/2604.04356"
      },
      {
        "label": "Song et Zheng, RAZOR: Pruning Replaceable Experts in LLMs, 24 septembre 2026 (changements de diversité, de mise en forme et de fin de génération malgré des scores plus élevés)",
        "url": "https://arxiv.org/abs/2609.30465"
      },
      {
        "label": "Frantar et Alistarh, SparseGPT: Massive Language Models Can Be Accurately Pruned in One-Shot, 2 janvier 2023 (OPT-175B et BLOOM-176B élagués à 50 % en une passe, 60 % avec une hausse de perplexité négligeable)",
        "url": "https://arxiv.org/abs/2301.00774"
      },
      {
        "label": "Muralidharan et al. (NVIDIA), Compact Language Models via Pruning and Knowledge Distillation, 19 juillet 2024 (Minitron : modèles de 8B et 4B tirés de Nemotron-4 15B par élagage puis distillation, moins de 3 % des données d'origine)",
        "url": "https://arxiv.org/abs/2407.14679"
      },
      {
        "label": "Li et al., Merge, Then Compress: Demystify Efficient SMoE with Hints from Its Routing Policy, 2 octobre 2023 (M-SMoE, fusion des experts guidée par le routage)",
        "url": "https://arxiv.org/abs/2310.01334"
      },
      {
        "label": "Lu et al., Not All Experts are Equal: Efficient Expert Pruning and Skipping for Mixture-of-Experts Large Language Models, 22 février 2024 (Mixtral 8x7B, 47 milliards de paramètres : environ 2,9 points de perte en retirant 2 experts sur 8 ; chaque token passe toujours par k experts, sans réduction du calcul)",
        "url": "https://arxiv.org/abs/2402.14800"
      },
      {
        "label": "Hugging Face, recherche de modèles « REAP », consultée le 9 novembre 2026 (plus de 800 modèles portent REAP dans leur nom parmi les 1 000 premiers résultats de l'API, homonymes exclus)",
        "url": "https://huggingface.co/models?search=REAP"
      }
    ]
  },
  {
    "id": "abliteration",
    "status": "live",
    "title": "Abliteration",
    "en": "Abliteration",
    "aliases": [
      "abliterated model",
      "refusal direction",
      "refusal ablation",
      "refusal feature ablation",
      "directional ablation",
      "weight orthogonalization"
    ],
    "aliasesFr": [
      "direction du refus",
      "ablation du refus",
      "modèle décensuré"
    ],
    "jargon": [
      {
        "say": "-abliterated",
        "means": "le suffixe ajouté au nom d'un modèle ouvert dont on a retiré la direction du refus, puis republié par quelqu'un d'autre que son éditeur"
      },
      {
        "say": "refusal direction",
        "means": "la direction du refus, le sens dans lequel penchent les activations du modèle quand il s'apprête à décliner une demande"
      },
      {
        "say": "weight orthogonalization",
        "means": "la retouche des matrices du modèle qui l'empêche d'écrire dans cette direction ; c'est elle qui rend l'abliteration permanente"
      },
      {
        "say": "healing",
        "means": "le petit réentraînement qu'on fait parfois après coup pour regagner une partie de la qualité perdue"
      }
    ],
    "cat": "comportements",
    "links": [
      "post-entrainement",
      "mythe-ia-neutre",
      "jailbreak",
      "interpretabilite",
      "guardrails",
      "open-weights",
      "fine-tuning"
    ],
    "short": "L'abliteration retire à un modèle à poids ouverts sa capacité de refuser, sans le réentraîner, en effaçant de ses poids la direction de ses activations qui commande le refus.",
    "image": "En troisième, Mathis a retiré la bague de bridage du variateur de son scooter, une pièce de quelques centimes, et il dépasse maintenant les 70 km/h sans avoir touché au moteur, qui en était capable depuis la sortie d'usine.",
    "imagineForm": "E",
    "imagine": "Sur ton ordinateur, tu demandes à un modèle Qwen d'Alibaba ce qui s'est passé à Pékin en juin 1989, et il refuse poliment d'en parler. Tu poses la même question à une copie du même modèle dont on a seulement effacé des poids la direction du refus, sans lui faire lire une ligne de plus, et elle te répond avec ce qu'elle savait déjà.",
    "full": [
      "Un assistant apprend à refuser pendant son post-entraînement, et on pourrait croire ce refus dilué dans ses milliards de paramètres. En juin 2024, Andy Arditi et ses coauteurs ont montré le contraire sur 13 modèles ouverts, jusqu'à 72 milliards de paramètres. Pendant que le modèle lit une demande, chacune de ses couches produit une longue liste de nombres, ses activations, et celles des demandes qu'il va refuser penchent toutes dans une même direction. Effacer cette direction l'empêche de refuser, et l'ajouter lui fait refuser des demandes anodines.",
      "L'abliteration rend l'effacement permanent. Au lieu d'intervenir à chaque réponse, on corrige une fois pour toutes les matrices du modèle pour qu'aucune couche ne puisse plus écrire dans la direction du refus, sans la moindre étape d'entraînement. Le mot, contraction d'« ablation » et d'« obliteration », s'est répandu avec un billet que Maxime Labonne a publié sur Hugging Face le 13 juin 2024. L'opération suppose d'avoir les poids entre les mains, ce qui la réserve aux modèles ouverts ; ceux de ChatGPT ou de Claude restent chez leur éditeur.",
      "Trois voisins font autre chose. Un jailbreak contourne le refus par la formulation et laisse le modèle intact, et les guardrails d'un service en ligne relisent demandes et réponses sur les serveurs de l'éditeur, hors de tout poids. Le fine-tuning va plus loin et apprend au modèle de nouvelles réponses. Le 6 novembre 2026, Nous Research a publié Arete-27B, Qwen3.8-27B réentraîné sur vingt mille questions touchant à la liberté d'expression, à la démocratie ou à la surveillance. La part de ses réponses qui reprenaient la version de l'État chinois est tombée de 22 % à 0,9 %. L'abliteration ne retire que le refus, et une prépublication d'octobre 2026 l'a vérifié sur un autre Qwen qui, débarrassé de tous ses refus sur 1989, affirmait toujours que Taïwan fait partie de la République populaire de Chine.",
      "L'opération a un prix. Dans l'étude de 2024, les modèles retouchés gardaient leurs scores en culture générale et en maths, mais perdaient de 1 à 3,5 points sur TruthfulQA, un test truffé d'idées reçues et de théories du complot. En juillet 2026, une autre prépublication a fait pronostiquer à deux modèles de Google et d'Alibaba la hausse ou la baisse de 60 actions de la Bourse de Varsovie, une tâche où aucun refus n'entre en jeu. Leurs versions retouchées s'y montraient plus optimistes de 7 à 12 points. Le modèle répond aussi à tout ce qu'il refusait, demandes dangereuses comprises, et les auteurs de 2024 en tiraient la leçon que les modèles de chat ouverts sont sans défense face à une retouche aussi simple."
    ],
    "then": "La découverte de 2024 venait de chercheurs en interprétabilité, et des amateurs l'ont aussitôt appliquée aux modèles ouverts du moment. Depuis, la parade est devenue un sujet de recherche. En mai 2025, une équipe a appris à des modèles à justifier longuement leur refus avant de le formuler, et l'abliteration ne leur retirait plus que 10 % de leurs refus au plus, contre 70 à 80 % sans cet entraînement. En juillet 2026, un audit des modèles publiés ne laissait passer que 4 des 57 modèles retouchés de son échantillon, au prix de quelques fausses alertes.",
    "office": [
      {
        "who": "q",
        "text": "Un modèle « uncensored » trouvé sur Hugging Face, ça nous ferait un assistant interne plus franc ?"
      },
      {
        "who": "a",
        "text": "Il refusera moins, mais il garde les biais de son modèle d'origine et peut avoir changé sur des points que personne n'a mesurés ; passe-le sur tes propres cas de test, et laisse un filtre relire ses réponses avant qu'elles partent."
      }
    ],
    "avoid": "« Ce modèle ouvert refuse les demandes dangereuses, il est donc sûr. » Quiconque a ses poids peut retirer ce refus sans réentraîner. OpenAI l'a pris en compte avant de publier gpt-oss en août 2025, en réentraînant lui-même le modèle pour le rendre aussi capable que possible en biologie et en cybersécurité, et n'a publié qu'après avoir vu qu'il restait ainsi en dessous de son modèle fermé o3.",
    "video": null,
    "sources": [
      {
        "label": "Arditi et al., Refusal in Language Models Is Mediated by a Single Direction, 17 juin 2024, révisé le 30 octobre 2024 (13 modèles de chat open source jusqu'à 72B ; effacer une seule direction des activations supprime le refus, l'ajouter fait refuser des demandes inoffensives ; retouche des poids de rang un ; tableau 3 : MMLU, ARC et GSM8K quasi inchangés, TruthfulQA en baisse de 1,0 à 3,5 points ; « how defenseless current open-source chat models are »)",
        "url": "https://arxiv.org/abs/2406.11717"
      },
      {
        "label": "Maxime Labonne, Uncensor any LLM with abliteration, billet sur Hugging Face, 13 juin 2024 (direction du refus dans le flux résiduel ; intervention à l'inférence ou orthogonalisation des poids, sans réentraînement ; baisse de performance sur tous les benchmarks du modèle retouché, en grande partie regagnée par un réentraînement DPO, sauf sur GSM8K)",
        "url": "https://huggingface.co/blog/mlabonne/abliteration"
      },
      {
        "label": "Wikipédia, Ablation (artificial intelligence), section « Use for uncensoring LLMs » (abliteration, mot-valise d'« ablation » et d'« obliteration »)",
        "url": "https://en.wikipedia.org/wiki/Ablation_(artificial_intelligence)"
      },
      {
        "label": "Nous Research, fiche de Arete-27B sur Hugging Face, créée le 6 novembre 2026 selon l'API Hugging Face (fine-tuning supervisé seul de Qwen3.8-27B ; vingt mille prompts sur sept catégories de valeurs ; réponses contenant de la propagande passées de 22 % à 0,9 % sur 803 questions ; pas de recul notable sur les benchmarks généraux mesurés)",
        "url": "https://huggingface.co/NousResearch/Arete-27B"
      },
      {
        "label": "Ko, Uncensored Is Not Unbiased: Abliteration Removes Refusals but Not Script-Dependent Bias About Taiwan, prépublication du 21 octobre 2026 (sur Qwen3.8-Flash-Next quantifié en 2 bits, l'abliteration retire tous les refus sur 1989, et le modèle retouché affirme toujours que Taïwan fait partie de la RPC dans les trois écritures testées)",
        "url": "https://arxiv.org/abs/2610.29342"
      },
      {
        "label": "Fafuła, Abliteration Is Not a Scalpel: Off-Target Effects of Refusal Removal on Decision Disposition Across Model Families, prépublication du 19 juillet 2026 (Gemma-4-26B-A4B-it et Qwen3-30B-A3B-Instruct-2507 ; 21 600 pronostics de hausse ou de baisse sur 60 actions de la Bourse de Varsovie, tâche sans refus ; versions retouchées plus optimistes de 12,2 points pour Gemma et 7,4 points pour Qwen)",
        "url": "https://arxiv.org/abs/2607.17427"
      },
      {
        "label": "Abu Shairah et al., An Embarrassingly Simple Defense Against LLM Abliteration Attacks, 25 mai 2025 (refus détaillés avant de décliner ; sous abliteration, taux de refus en baisse de 10 % au plus, contre 70 à 80 % pour les modèles de départ)",
        "url": "https://arxiv.org/abs/2505.19056"
      },
      {
        "label": "Hurtado, Has This Checkpoint Been Abliterated? A Two-Signal Audit and Its Failure Map, prépublication du 2 juillet 2026, révisée le 18 août (273 modèles, dont 57 abliterations publiques ; sur des familles non vues, 4 sur 57 manqués, taux de fausses alertes de 0,11)",
        "url": "https://arxiv.org/abs/2607.01854"
      },
      {
        "label": "Wallace et al. (OpenAI), Estimating Worst-Case Frontier Risks of Open-Weight LLMs, 5 août 2025 (malicious fine-tuning de gpt-oss en biologie et en cybersécurité avant sa publication ; le modèle ainsi réentraîné reste en dessous d'o3 ; résultats pris en compte dans la décision de publier)",
        "url": "https://arxiv.org/abs/2508.03153"
      }
    ]
  }
];

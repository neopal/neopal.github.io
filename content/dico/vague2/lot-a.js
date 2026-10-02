// Lexique IA, vague 2, lot A (modèles et industrie). Format identique à lexique/terms.js, sans `num`.
// imagineForm : forme de l'« Imagine » (content/dico/univers.md, section « Les formes de l'Imagine »).
module.exports = [
  {
    id: 'tailles-de-modele',
    status: 'live',
    title: 'Tailles de modèle',
    en: 'Model size',
    aliases: ['parameter count', 'model scale'],
    aliasesFr: ['nombre de paramètres'],
    jargon: [
      {say: '7B, 70B, 405B', means: "7, 70 et 405 milliards de paramètres (B pour billion, milliard en anglais) ; en 16 bits, compte 2 Go de mémoire par milliard, soit environ 141 Go pour un 70B"},
      {say: '235B-A22B', means: "la façon dont Qwen nomme ses modèles : 235 milliards de paramètres en tout, dont 22 milliards activés (A pour active) pour chaque token"},
      {say: 'dense', means: "un modèle où tous les paramètres travaillent pour chaque token, comme Qwen3.8-27B ; c'est l'inverse d'un MoE"},
      {say: '8x7B', means: "le nom suggère huit fois 7 milliards, mais Mixtral 8x7B ne compte que 46,7 milliards de paramètres, parce que seule une partie du réseau est dupliquée, et il en fait travailler 12,9 milliards par token"},
    ],
    cat: 'fondations',
    links: ['parametres', 'moe', 'quantization', 'open-weights', 'mythe-plus-gros-plus-intelligent', 'cout-d-une-requete'],
    short:
      "La taille d'un modèle, c'est son nombre de paramètres, compté en milliards (B) ou en milliers de milliards (T) ; pour un modèle MoE, on donne deux chiffres, le total et la part qui travaille pour chaque token.",
    image:
      "Compte les potards de la console et tu as la taille du groupe. Sur une console dense, chaque note fait bouger tous les potards ; sur celle d'un MoE, deux ou trois rangées jouent pendant que les autres restent immobiles, et il faut pourtant de la place dans le studio pour la console entière.",
    imagineForm: 'D',
    imagine:
      "Tu demandes à l'équipe qui gère les serveurs : « Entre DeepSeek-V4-Flash et Qwen3.8-27B, lequel est le plus gros ? » On te répond : « Le premier a dix fois plus de paramètres, et le second en fait travailler deux fois plus pour chaque token. »",
    full: [
      "La taille se compte en paramètres, les nombres réglés pendant l'entraînement, et le jargon l'abrège avec des lettres anglaises : B pour billion (milliard), T pour trillion (millier de milliards). Ce chiffre dit d'abord combien de mémoire il faut pour faire tourner le modèle. En 16 bits, chaque paramètre occupe 2 octets, et les fichiers de Llama 3.1 405B pèsent ainsi 812 Go sur Hugging Face.",
      "Avec les MoE, le chiffre se dédouble. Un modèle dense fait travailler tous ses paramètres pour chaque token, alors qu'un MoE n'en active qu'une fraction : DeepSeek-V4-Pro, présenté en avril 2026, compte 1 600 milliards de paramètres et n'en active que 49 milliards par token. Le total dit combien de serveurs il faut ; la part active dit combien coûte chaque token et à quelle vitesse il sort.",
      "C'est pour ça que Qwen écrit les deux nombres dans le nom de ses modèles, comme Qwen3-235B-A22B ou Qwen3.8-2.4T-A95B. Le petit nombre est celui qu'on compare d'un modèle dense à un MoE quand on parle de vitesse ; le grand est celui qu'on compare quand on parle de matériel.",
    ],
    then:
      "En juillet 2024, Meta publiait Llama 3.1 405B, un modèle dense dont un seul chiffre suffisait à décrire la taille. En juillet 2026, Moonshot AI a publié Kimi K3, qui compte 2 800 milliards de paramètres dont 104 milliards actifs par token. Il est sept fois plus gros que Llama 3.1 405B au total, et chaque token y fait pourtant travailler quatre fois moins de paramètres.",
    office: [
      {who: 'q', text: "On veut le faire tourner chez nous. On prend le 70B ou le 8B ?"},
      {who: 'a', text: "Commence par la mémoire : en 16 bits, le 70B demande environ 141 Go, donc plusieurs GPU, alors que le 8B tient sur une seule carte de 24 Go. Ensuite seulement, compare les deux sur tes vraies tâches."},
    ],
    avoid:
      "« Un 1T, c'est forcément plus lent qu'un 70B. » Kimi K2 compte 1 000 milliards de paramètres mais n'en active que 32 milliards par token, donc il calcule chaque token avec moins de paramètres qu'un modèle dense de 70 milliards. Il lui faut en revanche beaucoup plus de mémoire.",
    video: null,
    sources: [
      {label: 'Meta, The Llama 3 Herd of Models, 31 juillet 2024 (Llama 3.1 405B, architecture Transformer dense)', url: 'https://arxiv.org/abs/2407.21783'},
      {label: 'Hugging Face, meta-llama/Llama-3.1-405B : 812 Go de fichiers .safetensors en 16 bits (API Hugging Face, consultée le 2 octobre 2026). Calcul : 405 x 10^9 paramètres x 2 octets = 810 Go', url: 'https://huggingface.co/meta-llama/Llama-3.1-405B'},
      {label: 'Ollama, Llama 3.3 70B : 141 Go en 16 bits (fp16)', url: 'https://ollama.com/library/llama3.3/tags'},
      {label: 'DeepSeek, fiche de DeepSeek-V4-Pro (1,6T paramètres, 49B activés ; V4-Flash : 284B, 13B activés)', url: 'https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro'},
      {label: 'Wikipédia, DeepSeek (préversion de V4 publiée le 24 avril 2026)', url: 'https://en.wikipedia.org/wiki/DeepSeek'},
      {label: 'Qwen, fiche de Qwen3-235B-A22B (235B au total, 22B activés)', url: 'https://huggingface.co/Qwen/Qwen3-235B-A22B'},
      {label: 'Qwen, fiche de Qwen3.8-2.4T-A95B (2,4T au total, 95B activés)', url: 'https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B'},
      {label: 'Qwen, fiche de Qwen3.8-27B (modèle dense de 27B)', url: 'https://huggingface.co/Qwen/Qwen3.8-27B'},
      {label: 'Moonshot AI, fiche de Kimi K3 (2,8T paramètres, 104B activés)', url: 'https://huggingface.co/moonshotai/Kimi-K3'},
      {label: 'Wikipédia, Kimi (Kimi K3 publié le 16 juillet 2026 ; Kimi K2, 1T paramètres et 32B actifs, juillet 2025)', url: 'https://en.wikipedia.org/wiki/Kimi_(AI)'},
      {label: 'Mistral AI, Mixtral of experts, 11 décembre 2023 (46,7B au total, 12,9B par token)', url: 'https://mistral.ai/news/mixtral-of-experts'},
    ],
  },
  {
    id: 'moe',
    status: 'live',
    title: 'MoE (Mixture of Experts)',
    en: 'Mixture of Experts',
    aliases: ['MoE', 'sparse MoE', 'sparse mixture of experts'],
    aliasesFr: ["mélange d'experts"],
    jargon: [
      {say: 'experts', means: "les sous-réseaux entre lesquels le modèle répartit le travail ; Qwen3.8-2.4T-A95B en compte 512"},
      {say: 'router', means: "le routeur, un petit réseau qui choisit, pour chaque token, les experts qui vont le traiter"},
      {say: 'top-k', means: "le nombre d'experts activés par token : 2 sur 8 chez Mixtral, 16 sur 896 chez Kimi K3"},
      {say: 'shared expert', means: "un expert qui travaille pour tous les tokens, en plus de ceux que choisit le routeur ; Kimi K3 en a deux"},
    ],
    cat: 'fondations',
    links: ['parametres', 'tailles-de-modele', 'open-weights', 'cout-d-une-requete', 'mythe-plus-gros-plus-intelligent'],
    short:
      "Un MoE est un modèle découpé en nombreux sous-réseaux, les experts, dont seuls quelques-uns travaillent pour chaque token ; il occupe la mémoire d'un très gros modèle mais calcule chaque token comme un petit.",
    image:
      "Remplace le groupe par un orchestre de plusieurs centaines de solistes, avec un chef qui n'en fait jouer qu'une poignée à chaque note. Le chef, c'est le routeur, et les solistes sont les experts ; ceux qui attendent en silence doivent quand même tenir dans la salle.",
    imagineForm: 'E',
    imagine:
      "Avant, si Qwen3.8-2.4T-A95B était un modèle dense, chaque token que produit le chanteur ferait bouger les 2 400 milliards de potards de la console. Après, dans le vrai Qwen3.8, le chef envoie chaque token à 10 solistes sur 512, plus un soliste qui joue à chaque fois, et seuls 95 milliards de potards bougent, vingt-cinq fois moins sur la même console.",
    full: [
      "Dans un MoE, une partie du réseau est remplacée par des dizaines ou des centaines de variantes, les experts, et un petit réseau, le routeur, choisit pour chaque token et à chaque couche ceux qui vont le traiter. Chez Mixtral 8x7B, publié par Mistral en décembre 2023, le routeur prend 2 experts sur 8 : le modèle compte 46,7 milliards de paramètres, n'en utilise que 12,9 milliards par token, et répond à la vitesse et au coût d'un modèle de 12,9 milliards.",
      "Le gain se paie en mémoire, parce que tous les experts doivent être chargés même quand ils se taisent. Les fichiers de Kimi K2 pèsent environ 1 000 Go, alors que chaque token n'active que 32 milliards de ses 1 000 milliards de paramètres.",
      "Le mot « expert » trompe d'ailleurs un peu. L'équipe de Mistral a regardé comment Mixtral répartissait des articles d'ArXiv, des résumés de biologie et des textes de philosophie. Les trois se distribuaient presque de la même façon entre les experts, qui ne se partagent donc pas les sujets comme le mot le laisse croire.",
    ],
    then:
      "En juillet 2024, Meta publiait Llama 3.1 405B, un modèle dense. En avril 2025, il est passé au MoE avec Llama 4 Maverick, dont la taille totale est presque la même (400 milliards de paramètres) mais qui n'en fait travailler que 17 milliards par token.",
    office: [
      {who: 'q', text: "Comment un modèle de 284 milliards de paramètres peut répondre aussi vite qu'un petit ?"},
      {who: 'a', text: "DeepSeek-V4-Flash est un MoE qui n'en fait travailler que 13 milliards par token ; le calcul est celui d'un petit modèle, et la mémoire reste celle d'un gros."},
    ],
    avoid:
      "« Un MoE, c'est plusieurs modèles spécialisés qu'on interroge à tour de rôle. » Les experts sont des morceaux d'un même réseau, choisis à nouveau à chaque token et à chaque couche, et aucun ne sait répondre seul à une question.",
    video: null,
    sources: [
      {label: 'Mistral AI, Mixtral of experts, 11 décembre 2023 (2 experts sur 8 par couche et par token, 46,7B au total, 12,9B par token, vitesse et coût d\'un 12,9B)', url: 'https://mistral.ai/news/mixtral-of-experts'},
      {label: "Jiang et al., Mixtral of Experts, janvier 2024 (pas de spécialisation évidente des experts par sujet sur ArXiv, PubMed et PhilPapers)", url: 'https://arxiv.org/abs/2401.04088'},
      {label: 'Moonshot AI, fiche de Kimi K2 (1T paramètres, 32B activés, 384 experts) ; environ 1 029 Go de fichiers selon l\'API Hugging Face, consultée le 2 octobre 2026', url: 'https://huggingface.co/moonshotai/Kimi-K2-Instruct'},
      {label: 'Moonshot AI, fiche de Kimi K3 (2,8T paramètres, 896 experts, 16 choisis par token, 2 experts partagés)', url: 'https://huggingface.co/moonshotai/Kimi-K3'},
      {label: 'Qwen, fiche de Qwen3.8-2.4T-A95B (2,4T paramètres, 512 experts, 10 routés et 1 partagé, 95B activés). Calcul : 2 400 / 95 = 25,3', url: 'https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B'},
      {label: 'DeepSeek, fiche de DeepSeek-V4 (V4-Flash : 284B paramètres, 13B activés)', url: 'https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro'},
      {label: 'Meta, The Llama 3 Herd of Models, juillet 2024 (architecture Transformer dense)', url: 'https://arxiv.org/abs/2407.21783'},
      {label: "Wikipédia, Llama (Llama 4 Maverick, 5 avril 2025 : 400B au total, 17B actifs, 128 experts)", url: 'https://en.wikipedia.org/wiki/Llama_(language_model)'},
      {label: 'Wikipédia, Open-source artificial intelligence (Kimi K3 et Qwen3.8, plus gros modèles ouverts en 2026)', url: 'https://en.wikipedia.org/wiki/Open-source_artificial_intelligence'},
    ],
  },
  {
    id: 'open-weights',
    status: 'live',
    title: 'Open weights',
    en: 'Open weights',
    aliases: ['open-weight model', 'open model', 'weights-available'],
    aliasesFr: ['poids ouverts', 'modèle ouvert'],
    jargon: [
      {say: 'open-weight', means: "les paramètres sont téléchargeables ; les données et le code d'entraînement, en général, ne le sont pas"},
      {say: 'Apache 2.0, MIT', means: "des licences permissives qui autorisent l'usage commercial et la modification ; gpt-oss est sous Apache 2.0, DeepSeek-V4 sous MIT"},
      {say: 'fully open', means: "les poids, mais aussi les données, le code et les étapes d'entraînement, comme pour OLMo 3 de l'institut Ai2"},
      {say: 'openwashing', means: "présenter comme open source un modèle dont seuls les poids sont publiés"},
    ],
    cat: 'fondations',
    links: ['parametres', 'tailles-de-modele', 'quantization', 'fine-tuning', 'mythe-chatgpt-c-est-le-modele'],
    solutions: [
      {name: 'Hugging Face', kind: 'catalogue de modèles', url: 'https://huggingface.co/models'},
      {name: 'Ollama', kind: 'outil pour les faire tourner chez soi', url: 'https://ollama.com/library'},
      {name: 'LM Studio', kind: 'outil pour les faire tourner chez soi', url: 'https://lmstudio.ai/'},
      {name: 'OpenRouter', kind: 'API pour les essayer sans les héberger', url: 'https://openrouter.ai/models'},
    ],
    short:
      "Un modèle open weights est un modèle dont les paramètres sont publiés et téléchargeables ; tu peux le faire tourner sur tes machines et souvent le modifier, sans savoir pour autant sur quelles données il a été entraîné.",
    image:
      "Quand une maison de disques donne à tout le monde le preset complet de sa console, n'importe quel studio peut rejouer le groupe chez lui, retoucher les potards et enregistrer ses propres morceaux. Les bandes qui ont servi à régler la console restent en général dans les archives de la maison.",
    imagineForm: 'B',
    imagine:
      "Ouvre la page de gpt-oss-120b sur Hugging Face et clique sur « Files and versions ». Tu y trouves la licence Apache 2.0 et les fichiers de poids au format .safetensors, environ 65 Go pour 117 milliards de paramètres, puis tu peux chercher le dossier des données d'entraînement aussi longtemps que tu veux.",
    full: [
      "Un modèle open weights publie ses paramètres, la console réglée, avec une licence qui dit ce qu'on a le droit d'en faire. Tu peux alors le faire tourner sur tes serveurs sans envoyer tes données à personne, le spécialiser par fine-tuning ou le compresser. La licence compte autant que les poids : celle de Llama 3.1 oblige les entreprises de plus de 700 millions d'utilisateurs mensuels à demander une licence à Meta, alors que gpt-oss, sous Apache 2.0, n'a pas cette clause.",
      "Pour savoir si un modèle est open source ou seulement open weights, demande-toi si tu pourrais refaire son entraînement avec ce qui est publié. Avec gpt-oss ou DeepSeek-V4, la réponse est non, faute des données d'entraînement ; avec OLMo 3, qu'Ai2 publie avec ses données et toutes ses étapes d'entraînement, c'est oui.",
      "Le cas limite est le modèle dont les données sont décrites sans être publiées. La définition de l'IA open source fixée en octobre 2024 par l'Open Source Initiative l'accepte, si la description suffit à une personne compétente pour construire un système équivalent ; c'est le point le plus disputé de cette définition.",
    ],
    then:
      "En 2024, le dernier modèle de langage ouvert d'OpenAI restait GPT-2. Le 5 août 2025, OpenAI a publié gpt-oss-120b et gpt-oss-20b sous Apache 2.0, ses premiers modèles de langage open weights depuis, et le plus gros des deux tient sur un seul GPU de 80 Go.",
    office: [
      {who: 'q', text: "Si on l'installe sur nos serveurs, les données clients ne sortent pas de chez nous ?"},
      {who: 'a', text: "Une fois téléchargé, le modèle tourne sans rien envoyer à son éditeur. Lis quand même la licence et compte les GPU, parce que l'hébergement devient ton problème."},
    ],
    avoid:
      "« Il est open source, donc on sait sur quoi il a été entraîné. » Beaucoup de modèles dits ouverts, comme Llama, gpt-oss ou DeepSeek-V4, ne publient que leurs poids, et leurs données d'entraînement restent privées.",
    video: null,
    sources: [
      {label: 'OpenAI, Lancement de gpt-oss, 5 août 2025 (Apache 2.0, premiers modèles de langage open-weight depuis GPT-2)', url: 'https://openai.com/index/introducing-gpt-oss/'},
      {label: 'Hugging Face, openai/gpt-oss-120b (licence, fichiers .safetensors, 117B paramètres) ; 65,2 Go de poids selon l\'API Hugging Face, consultée le 2 octobre 2026', url: 'https://huggingface.co/openai/gpt-oss-120b'},
      {label: 'Meta, licence de Llama 3.1, article 2 (plus de 700 millions d\'utilisateurs actifs mensuels)', url: 'https://huggingface.co/meta-llama/Llama-3.1-405B/blob/main/LICENSE'},
      {label: 'Open Source Initiative, The Open Source AI Definition 1.0 (Data Information)', url: 'https://opensource.org/ai/open-source-ai-definition'},
      {label: "Wikipédia, Open-source artificial intelligence (définition de l'OSI du 28 octobre 2024, point le plus controversé sur les données, openwashing, Kimi K3 plus gros modèle ouvert en juillet 2026)", url: 'https://en.wikipedia.org/wiki/Open-source_artificial_intelligence'},
      {label: 'Ai2, Olmo 3 (modèle entièrement ouvert, de la donnée au modèle final)', url: 'https://allenai.org/olmo'},
      {label: 'DeepSeek, fiche de DeepSeek-V4-Pro (poids sous licence MIT)', url: 'https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro'},
      {label: 'Wikipédia, Kimi (Kimi K3, 2,8T paramètres, 16 juillet 2026)', url: 'https://en.wikipedia.org/wiki/Kimi_(AI)'},
    ],
  },
  {
    id: 'quantization',
    status: 'live',
    title: 'Quantization',
    en: 'Quantization',
    aliases: ['quant', 'quantisation', 'quantized model'],
    aliasesFr: ['quantification'],
    jargon: [
      {say: 'Q4, 4-bit', means: "chaque paramètre est stocké sur 4 bits au lieu de 16 ; le fichier devient trois à quatre fois plus léger"},
      {say: 'FP16, BF16', means: "les formats 16 bits dans lesquels un modèle est d'habitude entraîné et publié ; c'est la version pleine qu'on compresse ensuite"},
      {say: 'GGUF', means: "le format de fichier créé par l'auteur de llama.cpp pour charger vite des modèles, souvent quantifiés, sur ta propre machine"},
      {say: 'MXFP4', means: "un format 4 bits avec lequel OpenAI (gpt-oss) et Moonshot AI (Kimi K3) entraînent une partie de leurs poids, pour les publier déjà compressés"},
    ],
    cat: 'inference',
    links: ['parametres', 'tailles-de-modele', 'open-weights', 'cout-d-une-requete'],
    solutions: [
      {name: 'llama.cpp', kind: 'bibliothèque open source', url: 'https://github.com/ggml-org/llama.cpp'},
      {name: 'MLX', kind: 'bibliothèque open source', url: 'https://github.com/ml-explore/mlx'},
      {name: 'Ollama', kind: 'outil pour faire tourner un modèle quantifié', url: 'https://ollama.com/library'},
      {name: 'LM Studio', kind: 'outil pour faire tourner un modèle quantifié', url: 'https://lmstudio.ai/'},
    ],
    short:
      "La quantization consiste à stocker les paramètres d'un modèle avec moins de précision, par exemple sur 4 bits au lieu de 16, pour qu'il prenne trois à quatre fois moins de mémoire au prix d'un peu de qualité.",
    image:
      "Passe la bande du WAV au MP3 et le morceau tient dans un fichier bien plus léger, au prix de détails que peu d'oreilles entendent ; la quantization fait la même chose avec le réglage de la console. L'image triche sur un point, puisque le MP3 jette les sons qu'on n'entend pas alors que la quantization arrondit tous les potards sans exception, ce qui finit par s'entendre quand on arrondit trop.",
    imagineForm: 'E',
    imagine:
      "Avant, tu télécharges Llama 3.3 70B dans sa version 16 bits, 141 Go, et il faut deux GPU de serveur à 80 Go pour l'ouvrir. Après, tu prends la version 4 bits du même modèle, 43 Go, et il tient dans une machine de 64 Go de mémoire ; ce sont les mêmes 70 milliards de potards, arrondis chacun au cran le plus proche.",
    full: [
      "Pendant l'entraînement, chaque paramètre est en général stocké sur 16 bits. La quantization le réécrit sur 8, 4 ou même 2 bits, en l'arrondissant à l'une des rares valeurs que le format sait représenter : sur 4 bits, il n'en existe que 16. Le modèle prend moins de mémoire, tient sur des machines plus modestes et répond souvent plus vite, puisqu'il y a moins de données à déplacer pour chaque token.",
      "La perte dépend du niveau d'arrondi et de la taille du modèle. En mai 2025, une étude sur Qwen3 a mesuré qu'en 4 bits, Qwen3-14B ne perdait qu'environ 1 % sur le test MMLU, alors que le petit Qwen3-0.6B perdait environ 10 %. À 3 bits et moins, Qwen3 se dégradait plus nettement que les générations précédentes, ce que les auteurs attribuent à un entraînement plus poussé qui laisse moins de paramètres superflus à sacrifier.",
    ],
    then:
      "En 2024, on quantifiait surtout après coup un modèle publié en 16 bits : Llama 3.3 70B existe sur Ollama en une douzaine de versions, de 141 Go en 16 bits à 26 Go en 2 bits. Depuis août 2025, des labos publient des modèles conçus pour tourner en 4 bits, comme gpt-oss-120b, qui tient sur un seul GPU de 80 Go et dont toutes les évaluations ont été faites en 4 bits, puis Kimi K3 en juillet 2026.",
    office: [
      {who: 'q', text: "On a pris la version 2 bits pour économiser des GPU, et il écrit un français approximatif. C'est le modèle ?"},
      {who: 'a', text: "C'est probablement l'arrondi, parce qu'en dessous de 4 bits les modèles se dégradent nettement. Remonte en 4 bits et refais tes tests sur tes vrais textes."},
    ],
    avoid:
      "« Un modèle quantifié est un modèle plus petit. » Il garde exactement le même nombre de paramètres et chacun est stocké avec moins de précision, donc un 70B en 4 bits reste un 70B.",
    video: null,
    sources: [
      {label: 'Ollama, Llama 3.3 70B, versions de 141 Go (fp16) à 75 Go (q8_0), 43 Go (q4_K_M) et 26 Go (q2_K)', url: 'https://ollama.com/library/llama3.3/tags'},
      {label: 'Zheng et al., An Empirical Study of Qwen3 Quantization, 4 mai 2025 (environ 1 % de perte sur MMLU pour Qwen3-14B en 4 bits, environ 10 % pour Qwen3-0.6B, dégradation plus forte à 3 bits et moins)', url: 'https://arxiv.org/abs/2505.02214'},
      {label: 'OpenAI, fiche de gpt-oss-120b (poids MoE en MXFP4, un seul GPU de 80 Go, évaluations faites en MXFP4)', url: 'https://huggingface.co/openai/gpt-oss-120b'},
      {label: 'Moonshot AI, fiche de Kimi K3 (poids MXFP4, entraînement conscient de la quantization)', url: 'https://huggingface.co/moonshotai/Kimi-K3'},
      {label: 'Wikipédia, Kimi (Kimi K3 publié le 16 juillet 2026)', url: 'https://en.wikipedia.org/wiki/Kimi_(AI)'},
      {label: 'Hugging Face, documentation GGUF (format créé par l\'auteur de llama.cpp)', url: 'https://huggingface.co/docs/hub/gguf'},
    ],
  },
  {
    id: 'benchmarks',
    status: 'live',
    title: 'Benchmarks',
    en: 'Benchmark',
    aliases: ['benchmarks', 'benchmark suite'],
    aliasesFr: ['test de référence'],
    jargon: [
      {say: 'MMLU', means: "un QCM de 57 matières publié en 2020 ; en janvier 2025, les meilleurs modèles y dépassaient déjà 90 %"},
      {say: 'SOTA', means: "state of the art, le meilleur score publié à ce jour sur un benchmark donné"},
      {say: 'saturé', means: "se dit d'un benchmark où les meilleurs modèles plafonnent près du maximum et qui ne départage donc plus personne"},
      {say: 'contamination', means: "les questions du test, ou leurs réponses, se sont retrouvées dans les données d'entraînement du modèle"},
    ],
    cat: 'agents',
    links: ['benchmaxxing', 'evals', 'mythe-plus-gros-plus-intelligent', 'reward-hacking'],
    solutions: [
      {name: 'LMArena', kind: 'classement par votes', url: 'https://lmarena.ai/leaderboard'},
      {name: 'Artificial Analysis', kind: 'comparateur de modèles', url: 'https://artificialanalysis.ai/'},
      {name: 'Epoch AI Benchmarking Hub', kind: 'suivi des benchmarks', url: 'https://epoch.ai/benchmarks'},
    ],
    short:
      "Un benchmark est un test standard, le même pour tous les modèles, qui donne un score comparable d'un labo à l'autre : un QCM, des problèmes de maths, des bugs à corriger dans du vrai code.",
    image:
      "Un benchmark joue pour les groupes le rôle d'un concours, où le jury impose à tous les mêmes morceaux et publie un classement. Le classement dit qui joue le mieux ces morceaux-là, pas forcément qui fera le meilleur concert dans ta salle.",
    imagineForm: 'D',
    imagine:
      "Tu demandes à quelqu'un qui suit les classements : « Pourquoi les meilleurs modèles plafonnent autour de 80 % sur SWE-bench Verified ? » Il te répond : « Sur 138 problèmes que les modèles ratent souvent, OpenAI en a trouvé 82 dont les tests rejettent aussi des solutions correctes. »",
    full: [
      "En décembre 2024, OpenAI a présenté son modèle o3 en annonçant plus de 25 % de réussite sur FrontierMath, un benchmark de mathématiques de niveau recherche. En avril 2025, Epoch AI, qui a conçu le test, a mesuré environ 10 % sur le modèle mis en service. Selon Epoch, l'écart pouvait venir d'un outillage interne plus puissant et de plus de calcul lors de la démonstration. Epoch avait d'ailleurs révélé, le jour même de l'annonce d'o3, qu'OpenAI avait financé FrontierMath et eu accès à une bonne partie de ses problèmes.",
      "Un score ne vaut donc que par ce qu'il mesure. Un benchmark fixe une liste de questions, une façon de les poser et une façon de noter, et il suffit de changer l'une des trois pour changer le chiffre. Il s'use aussi, parce que les questions publiques finissent dans les données d'entraînement et que le test mesure alors en partie la mémoire du modèle.",
      "En février 2026, OpenAI a cessé de publier ses scores sur SWE-bench Verified, le test de correction de bugs qu'il avait lui-même lancé en 2024. Tous les modèles de pointe testés savaient recopier au mot près certaines corrections de référence, signe qu'ils les avaient vues pendant leur entraînement.",
    ],
    then:
      "En 2024, les labos se comparaient encore sur MMLU, un QCM de 57 matières publié en 2020. En janvier 2025, les meilleurs modèles y dépassaient 90 %, et des tests plus durs ont pris le relais, comme Humanity's Last Exam et ses 2 500 questions d'experts. En août 2025, la fiche de gpt-oss-120b affichait 90,0 % sur le premier et 14,9 % sur le second, et seul le second départage encore les modèles.",
    office: [
      {who: 'q', text: "Le fournisseur annonce 92 % sur un benchmark de code. On signe ?"},
      {who: 'a', text: "Demande-lui quel benchmark, avec quel outillage et combien d'essais, puis fais passer au modèle vingt de tes vrais tickets ; c'est ce score-là qui t'intéresse."},
    ],
    avoid:
      "« Il a 90 % au MMLU, donc il se trompe une fois sur dix. » Le score vaut pour ce QCM-là, dans les conditions du labo, et sur tes questions le taux d'erreur peut être bien plus haut ou plus bas.",
    video: null,
    sources: [
      {label: "TechCrunch, « OpenAI's o3 AI model scores lower on a benchmark than the company initially implied », 20 avril 2025 (plus de 25 % annoncés, environ 10 % mesurés par Epoch AI)", url: 'https://techcrunch.com/2025/04/20/openais-o3-ai-model-scores-lower-on-a-benchmark-than-the-company-initially-implied/'},
      {label: 'TechCrunch, Epoch AI critiqué pour avoir tardé à révéler le financement d\'OpenAI, 19 janvier 2025', url: 'https://techcrunch.com/2025/01/19/ai-benchmarking-organization-criticized-for-waiting-to-disclose-funding-from-openai/'},
      {label: 'OpenAI, Pourquoi SWE-bench Verified ne mesure plus les capacités de codage de pointe, 23 février 2026 (138 problèmes audités, 59,4 % de tests défectueux, contamination, arrêt des scores)', url: 'https://openai.com/index/why-we-no-longer-evaluate-swe-bench-verified/'},
      {label: 'Hendrycks et al., Measuring Massive Multitask Language Understanding, septembre 2020 (57 matières)', url: 'https://arxiv.org/abs/2009.03300'},
      {label: "Phan et al., Humanity's Last Exam, janvier 2025 (2 500 questions ; plus de 90 % sur MMLU pour les modèles de pointe)", url: 'https://arxiv.org/abs/2501.14249'},
      {label: 'OpenAI, gpt-oss-120b & gpt-oss-20b Model Card, août 2025 (tableau 3 : MMLU 90,0 %, HLE sans outils 14,9 % en raisonnement élevé)', url: 'https://arxiv.org/abs/2508.10925'},
    ],
  },
  {
    id: 'benchmaxxing',
    status: 'live',
    title: 'Benchmaxxing',
    en: 'Benchmaxxing',
    aliases: ['benchmark gaming', 'benchmark hacking'],
    aliasesFr: [],
    jargon: [
      {say: 'benchmaxxé', means: "se dit d'un modèle dont les scores annoncés promettent plus que ce qu'on obtient en l'utilisant"},
      {say: 'loi de Goodhart', means: "quand une mesure devient un objectif, elle cesse d'être une bonne mesure ; l'économiste Charles Goodhart en a formulé l'idée en 1975"},
      {say: 'cherry-picking', means: "ne montrer que les scores flatteurs, ou la meilleure variante du modèle pour chaque test"},
      {say: 'private testing', means: "tester en secret plusieurs variantes d'un modèle sur un classement public et ne rendre visible que la meilleure"},
    ],
    cat: 'agents',
    links: ['benchmarks', 'evals', 'reward-hacking', 'mythe-plus-gros-plus-intelligent'],
    short:
      "Le benchmaxxing consiste à optimiser un modèle, ou la façon de présenter ses scores, pour grimper dans les classements plutôt que pour mieux servir ceux qui l'utilisent.",
    image:
      "Pense au groupe qui, les semaines avant le concours, ne répète plus que le morceau imposé, jusqu'à le jouer sans une fausse note. Il gagne le concours, puis déçoit au premier concert, parce que la salle lui demande autre chose.",
    imagineForm: 'E',
    imagine:
      "Avant, début avril 2025, la version de Llama 4 Maverick que Meta a inscrite sur LMArena est une variante expérimentale réglée pour plaire aux votants, avec de longues réponses semées d'émojis, et elle se classe deuxième. Après, le 11 avril, LMArena classe la version que tout le monde peut télécharger, et elle tombe à la 32e place.",
    full: [
      "Le benchmaxxing prend plusieurs formes, de la plus banale à la plus discutable. Un labo peut entraîner son modèle sur des exercices qui ressemblent beaucoup au test, retenir la meilleure de plusieurs variantes pour chaque benchmark, ou tester en privé des dizaines de versions sur un classement public avant d'en montrer une seule. Dans les trois cas, le score grimpe plus vite que la qualité, comme le prévoit la loi de Goodhart.",
      "Llama 4 en est devenu le cas d'école. Fin avril 2025, l'étude The Leaderboard Illusion a compté 27 variantes privées testées par Meta sur LMArena avant la sortie du modèle, et LMArena a changé ses règles après l'épisode Maverick. En janvier 2026, Yann LeCun, sur le départ de Meta, a reconnu dans le Financial Times que l'équipe avait « fudged a little bit » en prenant des versions différentes du modèle selon les benchmarks.",
    ],
    office: [
      {who: 'q', text: "Le nouveau modèle est premier partout dans le communiqué. On migre ?"},
      {who: 'a', text: "Regarde d'abord qui a fait passer les tests et sur quelle version, puis rejoue une semaine de vraies demandes ; un premier rang annoncé par le labo lui-même ne dit pas comment le modèle se comportera chez toi."},
    ],
    avoid:
      "« Benchmaxxing, ça veut dire que le labo a triché. » Souvent, aucune règle n'est enfreinte, puisque le labo entraîne sur des exercices proches du test ou choisit ce qu'il montre ; le score dit vrai sur le test tout en promettant trop pour le reste.",
    video: null,
    sources: [
      {label: 'The Register, Meta accused of Llama 4 bait-n-switch to juice LMArena rank, 8 avril 2025 (variante expérimentale 2e, Elo 1417, réponses longues avec émojis)', url: 'https://www.theregister.com/2025/04/08/meta_llama4_cheating/'},
      {label: "TechCrunch, Meta's vanilla Maverick AI model ranks below rivals on a popular chat benchmark, 11 avril 2025 (version publique 32e, changement des règles de LMArena)", url: 'https://techcrunch.com/2025/04/11/metas-vanilla-maverick-ai-model-ranks-below-rivals-on-a-popular-chat-benchmark/'},
      {label: 'Singh et al., The Leaderboard Illusion, 29 avril 2025 (27 variantes privées testées par Meta avant Llama 4)', url: 'https://arxiv.org/abs/2504.20879'},
      {label: "Fast Company, Yann LeCun: Meta 'fudged a little bit' when benchmark-testing Llama 4 model, 6 janvier 2026 (d'après un entretien au Financial Times)", url: 'https://www.fastcompany.com/91469583/yann-lecun-meta-llama-4-model-zuckerberg'},
      {label: "Wikipédia, Goodhart's law (Charles Goodhart, 1975)", url: 'https://en.wikipedia.org/wiki/Goodhart%27s_law'},
    ],
  },
  {
    id: 'evals',
    status: 'live',
    title: 'Evals',
    en: 'Evals',
    aliases: ['evaluations', 'eval', 'eval suite'],
    aliasesFr: ['évaluations', 'éval'],
    jargon: [
      {say: 'pass@k', means: "la part des tâches réussies au moins une fois en k essais"},
      {say: 'pass^k', means: "la part des tâches réussies à chacun des k essais ; avec 75 % de réussite par essai, trois réussites d'affilée n'arrivent que 42 % du temps"},
      {say: 'LLM-as-a-judge', means: "un modèle qui note les réponses d'un autre selon une grille écrite, à recaler de temps en temps sur des notes humaines"},
      {say: 'eval de régression', means: "les tâches que l'agent réussissait déjà, relancées à chaque changement pour vérifier que rien n'a cassé"},
    ],
    cat: 'agents',
    links: ['benchmarks', 'benchmaxxing', 'agent', 'boucle-agent', 'harness', 'hallucination'],
    solutions: [
      {name: 'promptfoo', kind: 'outil open source', url: 'https://www.promptfoo.dev/'},
      {name: 'Inspect', kind: 'outil open source', url: 'https://inspect.aisi.org.uk/'},
      {name: 'Braintrust', kind: 'plateforme', url: 'https://www.braintrust.dev/'},
      {name: 'LangSmith', kind: 'plateforme', url: 'https://www.langchain.com/langsmith'},
    ],
    short:
      "Les evals sont les tests que tu écris pour ton propre usage : des tâches tirées de ton métier, une façon de noter chaque réponse, et un score que tu relances à chaque changement de modèle ou de prompt.",
    image:
      "Avant d'engager un groupe, tu organises tes propres auditions, et ce sont elles, les evals. Tu choisis les morceaux de ton répertoire, tu fais jouer chaque candidat plusieurs fois et tu notes avec ta propre grille, ce qu'aucun concours public ne fera à ta place.",
    imagineForm: 'B',
    imagine:
      "Colle le même long mail dans trois conversations neuves avec ton assistant, avec la même consigne : « Résume en trois points. » Les trois résumés ne seront pas formulés pareil, et il arrive qu'ils ne retiennent pas les mêmes points ; c'est pour ça qu'une éval fait passer chaque tâche plusieurs fois.",
    full: [
      "Une éval associe une tâche, une façon de la noter et plusieurs essais. Le correcteur peut être un test automatique, un autre modèle qui applique une grille, ou un humain, et il doit regarder le résultat plutôt que le discours. Dans son guide de janvier 2026, Anthropic prend l'exemple d'un agent qui écrit « votre vol est réservé » ; ce qui compte, c'est qu'une réservation existe dans la base.",
      "On répète chaque tâche parce qu'un modèle ne répond pas deux fois de la même façon. En juin 2024, le benchmark τ-bench a montré que GPT-4o réussissait moins de la moitié de ses tâches face à un client simulé, et qu'en vente au détail il réussissait la même tâche huit fois de suite dans moins d'un quart des cas.",
      "Pour démarrer, Anthropic conseille 20 à 50 tâches tirées de vrais échecs, puis de lire les transcriptions, parce qu'un échec révèle aussi bien une erreur de l'agent qu'un correcteur mal écrit. Sur une tâche de réservation de vol de τ2-bench, Claude Opus 4.5 a trouvé dans le règlement une faille qui servait mieux le client, et l'éval l'a compté en échec.",
    ],
    office: [
      {who: 'q', text: "On change de modèle le mois prochain. Comment on sait si c'est mieux ?"},
      {who: 'a', text: "Avec une éval, la même liste de tâches passée plusieurs fois sur l'ancien et sur le nouveau ; sans elle, tu compareras des impressions."},
    ],
    avoid:
      "« Il est en tête des benchmarks, on n'a pas besoin d'éval. » Un benchmark note le modèle sur les tâches de quelqu'un d'autre, alors que ton éval le note sur les tiennes, avec ton prompt et tes outils.",
    video: null,
    sources: [
      {label: 'Anthropic, Demystifying evals for AI agents, 9 janvier 2026 (tâches, essais, correcteurs, réservation à vérifier dans la base, 20 à 50 tâches tirées de vrais échecs, pass^k et 0,75^3 = 42 %, faille trouvée par Opus 4.5 sur τ2-bench)', url: 'https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents'},
      {label: 'Yao et al., τ-bench: A Benchmark for Tool-Agent-User Interaction in Real-World Domains, 17 juin 2024 (moins de 50 % de réussite, pass^8 sous 25 % en vente au détail)', url: 'https://arxiv.org/abs/2406.12045'},
    ],
  },
  {
    id: 'mythe-plus-gros-plus-intelligent',
    status: 'live',
    title: '« Plus le modèle est gros, plus il est intelligent »',
    en: 'Myth: bigger models are smarter',
    aliases: ['bigger is better'],
    aliasesFr: ['plus gros, plus intelligent'],
    jargon: [
      {say: 'scaling laws', means: "les lois d'échelle : la qualité monte quand on augmente ensemble la taille, les données et le calcul, et pas la taille seule"},
      {say: 'Chinchilla-optimal', means: "le bon rapport entre taille et données d'entraînement trouvé par DeepMind en 2022 : quand on double les paramètres, il faut aussi doubler les données"},
      {say: 'distillation', means: "entraîner un petit modèle à imiter un grand, pour garder l'essentiel de ses réponses à une fraction du coût"},
    ],
    graphLabel: 'Mythe : plus gros, plus intelligent',
    cat: 'mythes',
    links: ['tailles-de-modele', 'benchmarks', 'moe', 'benchmaxxing', 'entrainement', 'modeles-de-raisonnement'],
    short:
      "Un modèle plus gros n'est pas automatiquement meilleur ; un modèle plus petit, entraîné sur plus de données ou avec une meilleure méthode, bat régulièrement des modèles bien plus gros.",
    imagineForm: 'A',
    image:
      "Une console à 400 milliards de potards ne garantit pas un meilleur concert, parce que tout dépend de ce que l'ingé son a fait écouter au groupe et du temps passé à régler. Une console plus petite, réglée plus longtemps sur de meilleures bandes, sonne souvent mieux.",
    imagine:
      "Donne Du côté de chez Swann, 265 851 tokens, à GPT-4.5, présenté en février 2025 comme le plus gros modèle d'OpenAI ; sa fenêtre de 128 000 tokens t'oblige à couper le livre en trois, et la lecture te coûte 19,94 dollars. GPT-4.1, sorti un mois et demi plus tard, le lit d'une traite dans sa fenêtre d'un million de tokens, pour 0,53 dollar.",
    full: [
      "En mars 2022, DeepMind a entraîné Chinchilla, 70 milliards de paramètres, avec le même budget de calcul que son modèle Gopher de 280 milliards, mais sur quatre fois plus de données. Chinchilla a battu Gopher, GPT-3 (175 milliards) et Megatron-Turing NLG (530 milliards) sur un large éventail de tests, parce que les modèles de l'époque étaient trop gros pour ce qu'ils avaient lu. La taille ne compte qu'avec les données et le calcul qui vont avec.",
      "Deux techniques ont encore desserré le lien entre taille et qualité. Les MoE ne font travailler qu'une partie de leurs paramètres, et Mixtral 8x7B, qui en active 12,9 milliards par token, battait Llama 2 70B sur la plupart des tests publiés par Mistral. Les modèles de raisonnement écrivent un brouillon avant de répondre, ce qui ajoute du calcul au moment de la réponse sans ajouter un seul paramètre.",
      "OpenAI a fait l'expérience en grand. GPT-4.5, lancé le 27 février 2025, a été retiré de l'API le 14 juillet suivant, parce que GPT-4.1 offrait selon OpenAI des performances meilleures ou équivalentes sur beaucoup de capacités clés, pour un coût et une latence bien plus faibles.",
    ],
    office: [
      {who: 'q', text: "On prend le plus gros modèle du catalogue, comme ça on est tranquilles ?"},
      {who: 'a', text: "Teste d'abord le moyen et le petit sur tes tâches ; s'ils font le travail, tu paies moins et tu attends moins, et tu ne garderas le gros que là où il fait vraiment mieux."},
    ],
    avoid:
      "« Il a 1 000 milliards de paramètres, il est forcément meilleur. » Regarde plutôt ce qu'il réussit sur des tâches proches des tiennes, car le nombre de paramètres ne dit ni ce qu'il a lu ni comment on l'a entraîné.",
    video: null,
    sources: [
      {label: 'Hoffmann et al. (DeepMind), Training Compute-Optimal Large Language Models, 29 mars 2022 (Chinchilla 70B bat Gopher 280B, GPT-3, Megatron-Turing NLG 530B)', url: 'https://arxiv.org/abs/2203.15556'},
      {label: 'Mistral AI, Mixtral of experts, 11 décembre 2023 (Mixtral 8x7B surpasse Llama 2 70B sur la plupart des benchmarks)', url: 'https://mistral.ai/news/mixtral-of-experts'},
      {label: 'OpenAI, Introducing GPT-4.1 in the API, 14 avril 2025 (2 dollars par million de tokens en entrée, fenêtre jusqu\'à 1 million de tokens, retrait de GPT-4.5 de l\'API le 14 juillet 2025)', url: 'https://openai.com/index/gpt-4-1/'},
      {label: "TechCrunch, OpenAI plans to phase out GPT-4.5, its largest-ever AI model, from its API, 14 avril 2025 (75 dollars par million de tokens en entrée)", url: 'https://techcrunch.com/2025/04/14/openai-plans-to-wind-down-gpt-4-5-its-largest-ever-ai-model-in-its-api/'},
      {label: 'Wikipédia, GPT-4.5 (lancé le 27 février 2025)', url: 'https://en.wikipedia.org/wiki/GPT-4.5'},
      {label: 'OpenAI, fiche du modèle GPT-4.5 Preview (fenêtre de 128 000 tokens, 75 dollars par million de tokens en entrée)', url: 'https://developers.openai.com/api/docs/models/gpt-4.5-preview'},
      {label: "Calcul de l'Imagine : Du côté de chez Swann compte 265 851 tokens en o200k_base, le tokenizer de GPT-4.5 et GPT-4.1 selon tiktoken ; 265 851 x 75 / 10^6 = 19,94 dollars et 265 851 x 2 / 10^6 = 0,53 dollar", url: 'https://github.com/openai/tiktoken/blob/main/tiktoken/model.py'},
    ],
  },
];

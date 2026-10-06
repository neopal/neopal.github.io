// Lexique IA, vague 3, lot F (modèles, prix, calcul). Format identique à lexique/terms.js, sans `num`.
// imagineForm : forme de l'« Imagine » (content/dico/univers.md, section « Les formes de l'Imagine »).
// Prix et chiffres relevés le 2 octobre 2026 sur les pages citées dans `sources`.
module.exports = [
  {
    id: 'modeles-frontiere',
    status: 'live',
    title: 'Modèles frontière',
    en: 'Frontier models',
    aliases: ['frontier model', 'frontier AI', 'frontier lab', 'state of the art', 'SOTA'],
    aliasesFr: ['modèle de pointe', 'IA de frontière'],
    jargon: [
      {say: 'frontier lab', means: "un labo qui entraîne des modèles à la frontière ; le mot sert autant à se présenter qu'à décrire, et chaque labo l'emploie pour son modèle de tête"},
      {say: '10^25 FLOP', means: "le seuil de l'AI Act européen : un modèle généraliste dont l'entraînement a demandé plus de 10^25 opérations de calcul (un 1 suivi de 25 zéros) est présumé à risque systémique"},
      {say: 'GPAI', means: "general-purpose AI model, le nom que l'AI Act donne aux modèles généralistes ; au-dessus du seuil de calcul, ils passent dans la catégorie « à risque systémique »"},
      {say: 'SOTA', means: "state of the art, le meilleur score publié à une date donnée sur un benchmark précis"},
    ],
    cat: 'ecosysteme',
    links: ['comparatif-des-modeles', 'compute', 'tailles-de-modele', 'benchmarks', 'open-weights'],
    short:
      "Un modèle frontière est l'un des quelques modèles les plus capables à une date donnée ; la loi californienne SB 53 reprend le mot et le définit par le calcul dépensé pour l'entraîner, plus de 10^26 opérations.",
    image:
      "Parmi les maisons de disques, quelques-unes seulement peuvent louer le plus grand studio de la ville pendant des mois, et leurs albums fixent le niveau que les autres essaient d'atteindre. Le régulateur, qui ne peut pas écouter un album avant sa sortie, a choisi de compter les heures de studio, en sachant qu'elles ne disent pas qui joue le mieux.",
    imagineForm: 'E',
    imagine:
      "Mars 2023 : GPT-4 sort, et c'est le modèle frontière par excellence. Septembre 2026 : le même GPT-4, sans un paramètre changé, est sorti de la frontière, dépassé par toute une génération dont GPT-6 Astra, qu'Epoch AI estime entraîné avec environ 10^27 opérations. Pour l'AI Act, son cas reste flou, puisque l'estimation d'Epoch pour GPT-4, entre 8 × 10^24 et 4 × 10^25 opérations, encadre le seuil de 10^25.",
    full: [
      "La définition la plus utile vient du Frontier Model Forum, l'association créée en 2023 qui réunit Amazon, Anthropic, Google, Meta, Microsoft et OpenAI. Un modèle frontière y est un modèle généraliste qui dépasse, sur un ensemble de benchmarks ou d'évaluations de capacités à risque, tous les modèles largement déployés depuis au moins douze mois. La frontière est une date autant qu'un niveau, et elle avance à chaque sortie. En octobre 2026, chaque labo place son modèle de tête de ce côté. OpenAI présente GPT-6 Astra comme son modèle le plus capable, SpaceXAI (ex-xAI) appelle Grok 4.7 son « frontier model », et Mistral AI décrit Mistral Medium 3.5 comme un modèle « frontier-class ».",
      "Le mot compte aussi parce que la régulation s'appuie sur la même idée. L'AI Act européen ne parle pas de frontière mais de « modèle à risque systémique », et il présume qu'un modèle généraliste a des capacités à fort impact quand son entraînement dépasse 10^25 opérations. Ses fournisseurs doivent alors évaluer le modèle avec des tests adverses, mesurer les risques, signaler les incidents graves et protéger le modèle contre les attaques. Ces obligations s'appliquent depuis le 2 août 2025, et la Commission peut infliger des amendes depuis le 2 août 2026. En Californie, la loi SB 53, signée le 29 septembre 2025, appelle « frontier model » tout modèle entraîné avec plus de 10^26 opérations, fine-tuning et apprentissage par renforcement compris, et vise surtout les développeurs qui dépassent 500 millions de dollars de chiffre d'affaires annuel.",
      "Le seuil de calcul a l'avantage d'être un chiffre, et l'inconvénient que le public ne peut presque jamais le vérifier. Dans la base d'Epoch AI mise à jour le 1er octobre 2026, 1 410 des 3 626 modèles recensés ont une estimation de calcul d'entraînement. Elle manque justement pour Claude Fable 5.1, Gemini 3.1 Pro ou Muse Spark 1.3, dont les labos ne publient rien. Pour ces modèles, c'est au fournisseur de faire le calcul et de se déclarer auprès du Bureau de l'IA de la Commission.",
    ],
    then:
      "En septembre 2024, le gouverneur de Californie refusait de signer SB 1047, une première loi sur les modèles frontière, et le mot restait surtout celui des labos et des chercheurs. Deux ans plus tard, il figure dans SB 53, une loi californienne signée en 2025, et le seuil européen de 10^25 opérations est assorti d'amendes depuis le 2 août 2026.",
    office: [
      {who: 'q', text: "10^25 opérations, ça représente quoi, concrètement ?"},
      {who: 'a', text: "Une seule carte H200 qui calculerait sans s'arrêter à sa puissance de pointe mettrait environ trois siècles à les faire ; les labos y arrivent en quelques mois avec des dizaines de milliers de puces."},
    ],
    avoid:
      "« L'AI Act interdit les modèles frontière. » Le texte ne les interdit pas : au-delà de 10^25 opérations d'entraînement, il présume un risque systémique et impose des obligations, comme les évaluations, les tests adverses, le signalement des incidents graves et la cybersécurité.",
    video: null,
    sources: [
      {label: "Frontier Model Forum, About us (créé en 2023 ; définition d'un modèle frontière : dépasse tous les modèles largement déployés depuis au moins 12 mois), consulté le 2 octobre 2026", url: 'https://www.frontiermodelforum.org/about-us/'},
      {label: "Frontier Model Forum, Membership (Amazon, Anthropic, Google, Meta, Microsoft, OpenAI), consulté le 2 octobre 2026", url: 'https://www.frontiermodelforum.org/membership/'},
      {label: "OpenAI, fiche de GPT-6 Astra (« Our most capable model »), consultée le 2 octobre 2026", url: 'https://developers.openai.com/api/docs/models/gpt-6-astra'},
      {label: "SpaceXAI, fiche de Grok 4.7 (« frontier model for coding, agentic tasks, and knowledge work »), consultée le 2 octobre 2026", url: 'https://docs.x.ai/developers/models/grok-4.7'},
      {label: "Wikipédia, SpaceXAI (nom actuel de X.AI Corp., 2023-2026)", url: 'https://en.wikipedia.org/wiki/SpaceXAI'},
      {label: "Mistral AI, fiche de Mistral Medium 3.5 (« frontier-class multimodal model »), consultée le 2 octobre 2026", url: 'https://docs.mistral.ai/models/mistral-medium-3-5-26-04'},
      {label: "AI Act, article 51, paragraphe 2 (présomption au-delà de 10^25 opérations de calcul d'entraînement)", url: 'https://artificialintelligenceact.eu/article/51/'},
      {label: "AI Act, article 55 (obligations des fournisseurs de modèles à risque systémique : évaluation et tests adverses, risques, incidents graves, cybersécurité)", url: 'https://artificialintelligenceact.eu/article/55/'},
      {label: "Commission européenne, lignes directrices pour les fournisseurs de modèles d'IA à usage général (obligations depuis le 2 août 2025, pouvoirs d'exécution et amendes depuis le 2 août 2026, notification au Bureau de l'IA)", url: 'https://digital-strategy.ec.europa.eu/en/policies/guidelines-gpai-providers'},
      {label: "California Legislative Information, SB 53, chapitre 138 (approuvée par le gouverneur le 29 septembre 2025 ; « frontier model » au-delà de 10^26 opérations, fine-tuning et RL compris ; « large frontier developer » au-delà de 500 millions de dollars de chiffre d'affaires)", url: 'https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202520260SB53'},
      {label: "Wikipédia, Transparency in Frontier Artificial Intelligence Act (SB 1047, la loi précédente, rejetée par le gouverneur Gavin Newsom en 2024)", url: 'https://en.wikipedia.org/wiki/Transparency_in_Frontier_Artificial_Intelligence_Act'},
      {label: "Epoch AI, base AI models, fichier all_ai_models.csv mis à jour le 1er octobre 2026 : GPT-4 (mars 2023) 2,1 x 10^25 FLOP (« Likely », intervalle à 90 % de 8,2 x 10^24 à 4,4 x 10^25) ; GPT-6 Astra (septembre 2026) environ 10^27 FLOP (« Likely », intervalle 5 x 10^26 à 2 x 10^27, au moins 100 000 GB200) ; 1 410 modèles sur 3 626 avec une estimation ; aucune pour Claude Fable 5.1, Gemini 3.1 Pro, Muse Spark 1.3", url: 'https://epoch.ai/data/all_ai_models.csv'},
      {label: "NVIDIA, H200 (1 979 TFLOPS en BF16, chiffre donné avec sparsité, soit environ 990 TFLOPS en calcul dense, la sparsité doublant le débit théorique). Calcul du bureau : 10^25 / 9,9 x 10^14 = 1,0 x 10^10 secondes, environ 320 ans", url: 'https://www.nvidia.com/en-us/data-center/h200/'},
    ],
  },
  {
    id: 'comparatif-des-modeles',
    status: 'live',
    title: 'Comparatif des modèles',
    en: 'LLM pricing comparison',
    aliases: ['model comparison', 'price per million tokens', '$/MTok'],
    aliasesFr: ['prix des modèles', 'tarifs des API', 'comparatif des prix'],
    jargon: [
      {say: '$/MTok', means: "dollars par million de tokens, l'unité de tous les tarifs ; Anthropic écrit MTok, OpenAI et Google « per 1M tokens »"},
      {say: 'cached input', means: "les tokens d'entrée relus depuis un cache parce qu'ils ont déjà été envoyés récemment ; ils coûtent de 2,5 % du prix normal chez Claude Fable 5.1 à 25 % chez Grok 4.7"},
      {say: 'Batch API', means: "envoyer des requêtes par lots, traitées en différé, contre 50 % de remise chez Anthropic, OpenAI et Google ; Grok 4.7 ne l'accepte pas"},
      {say: 'long context pricing', means: "au-delà d'un seuil (200 000 tokens chez Google et SpaceXAI, 272 000 chez OpenAI), toute la requête passe au tarif supérieur ; Anthropic et Meta n'appliquent pas de surcoût"},
    ],
    cat: 'ecosysteme',
    links: ['cout-d-une-requete', 'modeles-frontiere', 'open-weights', 'tokenizer', 'tailles-de-modele', 'benchmarks'],
    short:
      "Le comparatif des modèles met côte à côte les modèles des principaux labos et leurs prix, comptés en dollars par million de tokens, avec un tarif pour ce que tu envoies au modèle et un autre, plus élevé, pour ce qu'il écrit.",
    image:
      "Chaque maison de disques affiche son tarif horaire à l'entrée de son studio, mais aucune n'utilise la même horloge, et chez l'une la minute dure un peu plus longtemps que chez la voisine. Les tokens se comportent de la même façon, parce que chaque labo découpe le texte avec sa propre sampleuse.",
    imagineForm: 'A',
    imagine:
      "Demande à chaque modèle du tableau de te réécrire Notre-Dame de Paris en entier, soit 295 934 tokens au compteur du tokenizer d'OpenAI. La sortie te coûterait 1,17 $ chez DeepSeek-V4-Pro, 1,26 $ chez Muse Spark 1.3 et 14,80 $ chez Claude Fable 5.1 ou GPT-6 Astra, avant même de savoir en combien de morceaux chacun découpe le roman.",
    table: {
      caption: 'Prix des modèles de tête',
      asOf: '2 octobre 2026',
      columns: ['Modèle', 'Labo', 'Entrée $ / 1M tokens', 'Sortie $ / 1M tokens', 'Fenêtre de contexte', 'Poids ouverts'],
      rows: [
        ['Claude Fable 5.1', 'Anthropic', '10', '50', '1M', 'non'],
        ['Claude Opus 5.5', 'Anthropic', '4', '20', '1M', 'non'],
        ['GPT-6 Astra', 'OpenAI', '10', '50', '1,05M', 'non'],
        ['GPT-6.1 Sol', 'OpenAI', '2', '10', '1,05M', 'non'],
        ['Gemini 3.1 Pro (preview)', 'Google', '2', '12', '1M', 'non'],
        ['Grok 4.7', 'SpaceXAI', '2', '6', '500k', 'non'],
        ['Muse Spark 1.3', 'Meta', '1,25', '4,25', '1M', 'non'],
        ['Qwen3.8-Max', 'Alibaba', '2', '6', '1M', 'oui, licence maison'],
        ['DeepSeek-V4-Pro', 'DeepSeek', '1,32', '3,96', '1M', 'oui, MIT'],
        ['Mistral Medium 3.5', 'Mistral AI', '1,5', '7,5', '256k', 'oui, MIT modifiée'],
      ],
      note: "Tarif standard, sans cache ni batch, pour une requête sous le seuil de contexte long ; DeepSeek aux heures de pointe (moitié prix le reste du temps), Alibaba au tarif international.",
    },
    full: [
      "Le tableau compare des prix au million de tokens, mais un token n'a pas la même taille partout, puisque chaque labo a son tokenizer. Anthropic prévient ainsi que le tokenizer introduit avec Claude Opus 4.7 produit environ 30 % de tokens de plus pour le même texte. Pour comparer deux modèles sur ta tâche, compte donc la facture de quelques vraies requêtes plutôt que le tarif affiché.",
      "Sur toutes les lignes, la sortie coûte de trois à six fois plus que l'entrée. Le texte que tu envoies est lu d'un seul passage, tous les tokens en parallèle, ce qui occupe pleinement les puces. La réponse s'écrit au contraire token par token, et chaque token demande de relire en mémoire tous les poids actifs du modèle pour un seul résultat. L'étude Splitwise décrit cette phase de génération comme limitée par la mémoire et laissant la puissance de calcul en grande partie inutilisée. Les labos ne publient pas leurs coûts, et rien ne dit que le rapport entre les deux prix suive exactement celui de leurs dépenses.",
      "La facture réelle s'écarte du tableau dans les deux sens. Le cache de prompt fait payer les passages déjà envoyés entre 2,5 % et 25 % du prix d'entrée, et le batch divise tout par deux chez Anthropic, OpenAI et Google. Au-delà de 272 000 tokens, OpenAI double le prix d'entrée de GPT-6 Astra pour toute la requête. Les modèles de raisonnement ajoutent des tokens de réflexion que tu ne vois pas, payés au tarif de sortie, et Google l'écrit en toutes lettres sur sa grille. Le calendrier compte aussi, puisque DeepSeek divise ses prix par deux hors des heures de pointe et que Gemini 3.8 Flash doublera les siens le 1er janvier 2027.",
    ],
    then:
      "En avril 2024, GPT-4 Turbo, alors le modèle de tête d'OpenAI, coûtait 10 $ le million de tokens d'entrée et 30 $ en sortie, des prix toujours affichés sur la page de tarifs. En 2026, GPT-6.1 Sol, qu'OpenAI présente comme proche de GPT-6 Astra, coûte 2 $ et 10 $, cinq fois moins en entrée et trois fois moins en sortie.",
    office: [
      {who: 'q', text: "On a pris le modèle le moins cher au million de tokens, et la facture dépasse celle de l'ancien. Comment c'est possible ?"},
      {who: 'a', text: "Compare les tokens consommés par requête, pas les tarifs : son tokenizer découpe peut-être ton texte en plus de morceaux, et s'il réfléchit plus longtemps, son brouillon compte comme de la sortie."},
    ],
    avoid:
      "« Les modèles à poids ouverts sont gratuits. » Les poids se téléchargent sans payer, mais il faut des GPU pour les faire tourner, et par l'API de leur labo, DeepSeek-V4-Pro ou Qwen3.8-Max se paient au token comme les autres.",
    video: null,
    sources: [
      {label: "Anthropic, Pricing (Claude Fable 5.1 : 10 $ et 50 $ ; Claude Opus 5.5 : 4 $ et 20 $ ; Claude Opus 4 : 15 $ et 75 $ ; lecture du cache à 2,5 %, 5 % ou 10 % du prix d'entrée ; batch à 50 % ; pas de surcoût de contexte long ; tokenizer de Claude Opus 4.7 et suivants : environ 30 % de tokens en plus), consulté le 2 octobre 2026", url: 'https://platform.claude.com/docs/en/about-claude/pricing'},
      {label: "Anthropic, Models overview (fenêtre de 1M tokens pour Claude Fable 5.1 et Claude Opus 5.5), consulté le 2 octobre 2026", url: 'https://platform.claude.com/docs/en/about-claude/models/overview'},
      {label: "OpenAI, Pricing (GPT-6 Astra : 10 $ et 50 $ ; GPT-6.1 Sol : 2 $ et 10 $ ; gpt-4-turbo-2024-04-09 : 10 $ et 30 $ ; batch à 50 %), consulté le 2 octobre 2026", url: 'https://developers.openai.com/api/docs/pricing'},
      {label: "OpenAI, fiche de GPT-6 Astra (fenêtre de 1 050 000 tokens ; au-delà de 272 000 tokens d'entrée, entrée et cache x2, sortie x1,5 pour toute la requête)", url: 'https://developers.openai.com/api/docs/models/gpt-6-astra'},
      {label: "OpenAI, fiche de GPT-6.1 Sol (« near-Astra performance » ; fenêtre de 1 050 000 tokens, lecture du cache à 5 % du prix d'entrée)", url: 'https://developers.openai.com/api/docs/models/gpt-6.1-sol'},
      {label: "Google, Gemini API Pricing (Gemini 3.1 Pro Preview : 2 $ et 12 $ jusqu'à 200 000 tokens, prix de sortie « including thinking tokens » ; Gemini 3.8 Flash : 0,75 $ et 3,75 $ jusqu'au 31 décembre 2026, puis 1,50 $ et 7,50 $ ; batch à 50 %), consulté le 2 octobre 2026", url: 'https://ai.google.dev/gemini-api/docs/pricing'},
      {label: "Google, fiche de Gemini 3.1 Pro Preview (1 048 576 tokens en entrée)", url: 'https://ai.google.dev/gemini-api/docs/models/gemini-3.1-pro-preview'},
      {label: "SpaceXAI, fiche de Grok 4.7 (2 $ et 6 $ sous 200 000 tokens, cache à 0,50 $, fenêtre de 500 000 tokens, pas de Batch API), consultée le 2 octobre 2026", url: 'https://docs.x.ai/developers/models/grok-4.7'},
      {label: "Meta, Pricing and rate limits (Muse Spark 1.3 : 1,25 $ et 4,25 $, cache à 0,15 $, pas de surcoût de contexte long ; tier Contributor à 0,10 $ et 0,20 $ contre l'usage des données pour l'entraînement), consulté le 2 octobre 2026", url: 'https://dev.meta.ai/docs/pricing-rate-limits'},
      {label: "Meta, Models (Muse Spark hébergé sur l'API, fenêtre de 1 048 576 tokens ; Muse Glimmer est le modèle à poids ouverts)", url: 'https://dev.meta.ai/docs/models'},
      {label: "Alibaba Cloud Model Studio, Model pricing, région internationale (Singapour) : qwen3.8-max à 2 $ et 6 $ jusqu'à 1M tokens par requête, consulté le 2 octobre 2026", url: 'https://www.alibabacloud.com/help/en/model-studio/model-pricing'},
      {label: "Qwen, fiche de Qwen3.8-2.4T-A95B sur Hugging Face (poids publiés sous licence « qwen3.8-max » ; Qwen3.8-Max en est la version officielle avec des fonctions en plus)", url: 'https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B'},
      {label: "DeepSeek, Models & Pricing (deepseek-v4-pro : 1,32 $ et 3,96 $ aux heures de pointe, moitié prix hors pointe ; fenêtre de 1M tokens), consulté le 2 octobre 2026", url: 'https://api-docs.deepseek.com/quick_start/pricing'},
      {label: "DeepSeek, fiche de DeepSeek-V4-Pro (poids sous licence MIT)", url: 'https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro'},
      {label: "Mistral AI, fiche de Mistral Medium 3.5 (1,5 $ et 7,5 $, fenêtre de 256k, poids ouverts sous licence MIT modifiée), consultée le 2 octobre 2026", url: 'https://docs.mistral.ai/models/mistral-medium-3-5-26-04'},
      {label: "Patel et al., Splitwise: Efficient generative LLM inference using phase splitting, novembre 2023 (lecture du prompt limitée par le calcul, génération limitée par la mémoire)", url: 'https://arxiv.org/abs/2311.18677'},
      {label: "OpenAI, Reasoning models (tokens de raisonnement invisibles, facturés comme des tokens de sortie)", url: 'https://developers.openai.com/api/docs/guides/reasoning'},
      {label: "Victor Hugo, Notre-Dame de Paris, Projet Gutenberg (ebook 19657) : 295 934 tokens en o200k_base, comptés avec tiktoken le 2 octobre 2026 sur le texte entre les marqueurs START et END. Calcul de l'Imagine : 0,295934 x 3,96 = 1,17 $ ; x 4,25 = 1,26 $ ; x 50 = 14,80 $", url: 'https://www.gutenberg.org/ebooks/19657'},
      {label: "Wikipédia, Claude (AI) (Claude Opus 4 sorti le 22 mai 2025, Claude Opus 5.5 le 22 septembre 2026)", url: 'https://en.wikipedia.org/wiki/Claude_(AI)'},
    ],
  },
  {
    id: 'cout-d-une-requete',
    status: 'live',
    title: "Coût d'une requête",
    en: 'Inference cost',
    aliases: ['API pricing', 'cost per token', 'cost per request', 'prompt caching'],
    aliasesFr: ["prix d'une requête", 'facture API'],
    jargon: [
      {say: 'prompt caching', means: "garder côté serveur le début d'une requête qui revient à l'identique (consignes, documents) ; relu depuis le cache, il est facturé une fraction du prix d'entrée, 5 % sur Claude Opus 5.5"},
      {say: 'cache write', means: "la première écriture d'un passage dans le cache, facturée 1,25 fois le prix d'entrée chez Anthropic et OpenAI ; la remise ne vient qu'aux lectures suivantes"},
      {say: 'reasoning tokens', means: "les tokens du brouillon d'un modèle de raisonnement ; tu ne les vois pas forcément, et on les paie au tarif de sortie"},
      {say: 'usage', means: "le bloc que renvoie chaque réponse d'API avec le décompte exact des tokens d'entrée, de sortie et de cache ; c'est lui qu'on additionne pour connaître la facture"},
    ],
    cat: 'inference',
    links: ['token', 'comparatif-des-modeles', 'fenetre-de-contexte', 'modeles-de-raisonnement', 'gpu', 'kv-cache'],
    short:
      "Le coût d'une requête, c'est le nombre de tokens d'entrée multiplié par leur prix, plus le nombre de tokens de sortie multiplié par le leur, avec une remise pour ce qui est relu depuis un cache.",
    image:
      "Le studio facture à la ligne, et chaque sample qui passe par la sampleuse se paie au tarif de l'entrée, chaque note que chante le chanteur au tarif de la sortie, nettement plus cher. Les pistes déjà enregistrées, qu'on repasse telles quelles sur la bande, ne coûtent presque rien.",
    imagineForm: 'E',
    imagine:
      "Avant, ton assistant interne envoie à Claude Opus 5.5, à chaque question, les mêmes 30 000 tokens de procédures plus 200 tokens de question, et reçoit 800 tokens de sortie, réflexion comprise ; la question coûte 0,137 $, et 10 000 questions 1 368 $. Après, tu actives le cache de prompt sur les procédures, et la même question tombe à 0,023 $, soit 228 $ les 10 000, pour le même travail.",
    full: [
      "Le calcul tient en trois lignes. Une question envoyée à GPT-6.1 Sol avec un document de 12 000 tokens coûte 12 000 × 2 $ / 1 000 000 = 0,024 $ en entrée. Sa réponse visible de 600 tokens ajoute 600 × 10 $ / 1 000 000 = 0,006 $, soit trois centimes en tout. Sol réfléchit pourtant toujours avant de répondre, puisque son effort de raisonnement ne descend pas sous « low ». Avec un brouillon de 5 000 tokens, la sortie passe à 5 600 tokens et le total à 0,08 $, presque le triple de ce que la réponse visible laissait croire.",
      "Ces tokens de réflexion sont la grande inconnue de la facture. OpenAI indique que ses modèles en produisent de quelques centaines à plusieurs dizaines de milliers selon la difficulté, et qu'une requête peut même s'arrêter faute de place avant toute réponse visible, après avoir facturé l'entrée et la réflexion. Les outils pèsent aussi, puisque chez Anthropic déclarer le kit de navigation web ajoute environ 6 600 tokens d'entrée à chaque appel, et chaque recherche web coûte 10 $ les 1 000.",
      "Trois leviers font baisser la facture. Avec le cache, les passages répétés ne coûtent qu'une fraction du prix, le batch divise par deux le prix des requêtes qui peuvent attendre, et un modèle plus petit traite les tâches simples. Anthropic estime ainsi à environ 37 $ le traitement de 10 000 tickets de support avec Claude Haiku 4.5. Dans l'autre sens, une requête longue peut changer de tarif d'un coup, puisque chez OpenAI une requête de plus de 272 000 tokens d'entrée paie toute son entrée au double et sa sortie 1,5 fois plus cher.",
    ],
    office: [
      {who: 'q', text: "On paie quoi, exactement, quand l'agent lit une page web ?"},
      {who: 'a', text: "Le texte de la page, qui entre comme tokens d'entrée : Anthropic compte environ 2 500 tokens pour une page moyenne et 125 000 pour un PDF de recherche de 500 Ko, et la recherche elle-même se paie en plus."},
    ],
    avoid:
      "« Ça coûte des fractions de centime, inutile de compter. » La question de l'assistant à 0,137 $ devient 1 368 $ dès qu'elle tourne 10 000 fois, et c'est à cette échelle que le cache, le batch et le choix du modèle se décident.",
    video: null,
    sources: [
      {label: "Anthropic, Pricing (Claude Opus 5.5 : 4 $ en entrée, 20 $ en sortie, lecture du cache à 0,20 $ ; écriture du cache à 1,25 fois le prix d'entrée ; kit de navigation web d'environ 6 600 tokens ; recherche web à 10 $ les 1 000 ; page web moyenne d'environ 2 500 tokens, PDF de 500 Ko d'environ 125 000 ; exemple de 10 000 tickets pour environ 37 $ avec Claude Haiku 4.5), consulté le 2 octobre 2026. Calcul de l'Imagine : 30 200 x 4 / 10^6 + 800 x 20 / 10^6 = 0,1368 $ ; avec cache : 30 000 x 0,20 / 10^6 + 200 x 4 / 10^6 + 0,016 = 0,0228 $, hors écriture initiale du cache (0,15 $ à chaque renouvellement)", url: 'https://platform.claude.com/docs/en/about-claude/pricing'},
      {label: "OpenAI, fiche de GPT-6.1 Sol (2 $ en entrée, 10 $ en sortie ; efforts de raisonnement « none » et « minimal » non disponibles ; au-delà de 272 000 tokens d'entrée, entrée x2 et sortie x1,5 pour toute la requête ; écriture du cache à 1,25 fois le prix d'entrée), consultée le 2 octobre 2026", url: 'https://developers.openai.com/api/docs/models/gpt-6.1-sol'},
      {label: "OpenAI, Reasoning models (de quelques centaines à plusieurs dizaines de milliers de tokens de raisonnement, facturés comme de la sortie ; coût possible sans réponse visible)", url: 'https://developers.openai.com/api/docs/guides/reasoning'},
    ],
  },
  {
    id: 'compute',
    status: 'live',
    title: 'Compute',
    en: 'Compute',
    aliases: ['FLOP', 'FLOPs', 'training compute', 'inference compute', 'MFU'],
    aliasesFr: ['puissance de calcul', 'calcul'],
    jargon: [
      {say: 'FLOP', means: "floating-point operation, une multiplication ou une addition sur des nombres à virgule ; le calcul d'un entraînement se compte en FLOP au total"},
      {say: 'FLOP/s', means: "la vitesse d'une puce, en opérations par seconde ; à ne pas confondre avec FLOP tout court, qui compte un total"},
      {say: '6ND', means: "la règle de calcul approchée d'un entraînement : 6 opérations par paramètre et par token lu, avec N paramètres (les paramètres actifs pour un MoE) et D tokens"},
      {say: 'MFU', means: "model FLOPs utilization, la part de la puissance de pointe vraiment utilisée pendant l'entraînement ; Epoch AI suppose 25 % pour estimer celui de GPT-6 Astra"},
    ],
    cat: 'ecosysteme',
    links: ['gpu', 'entrainement', 'modeles-frontiere', 'parametres', 'cout-d-une-requete', 'modeles-de-raisonnement'],
    short:
      "Le compute, c'est la quantité de calcul que demande un modèle, comptée en opérations sur des nombres (FLOP) : une fois, en quantité énorme, pour l'entraîner, puis à chaque token qu'il lit ou écrit pour te répondre.",
    image:
      "Pour le studio, le compute se compte en heures de location et en kilowatts. Les mois passés à régler la console dans le grand studio, c'est l'entraînement, payé une fois ; chaque concert qui suit, c'est l'inférence, qui consomme un peu de courant à chaque note, mais tous les soirs et dans toutes les salles à la fois.",
    imagineForm: 'B',
    imagine:
      "Prends ta calculatrice et refais l'estimation d'Epoch AI pour Olmo 3 32B, le modèle d'Ai2 dont les données d'entraînement sont publiques : 6 × 32 milliards de paramètres × 5 500 milliards de tokens. Tu obtiens environ 1,1 × 10^24 opérations, et il en faudrait encore près de dix fois plus pour atteindre le seuil de 10^25 que l'AI Act réserve aux modèles à risque systémique.",
    full: [
      "Un entraînement fait passer chaque token des données dans le modèle, puis ajuste les paramètres, ce qui revient à environ six opérations par paramètre et par token. Multiplie ce chiffre par des dizaines de milliards de paramètres et des milliers de milliards de tokens, et tu arrives aux ordres de grandeur du domaine, entre 10^24 et 10^27 opérations. La notation 10^24 désigne un 1 suivi de 24 zéros, mille milliards de milliards, et une H200 lancée à plein régime, sans pause, passerait environ trois siècles sur 10^25 opérations. Les labos de tête ne publient plus ces chiffres, et ils viennent d'estimations, comme celle d'Epoch AI, qui prête environ 10^27 opérations à GPT-6 Astra, entraîné sur au moins 100 000 puces GB200 à Abilene, au Texas, pendant une durée supposée de 90 jours.",
      "L'inférence coûte beaucoup moins par token, mais elle se répète à chaque requête de chaque utilisateur, et c'est elle que Google mesure quand il compte les tokens traités chaque mois sur ses services. Les modèles de raisonnement déplacent encore la dépense vers ce moment-là, puisque leur brouillon, écrit avant chaque réponse, peut à lui seul dépasser la réponse en longueur.",
      "Le compute se paie en puces et en électricité. Quand Anthropic annonce en octobre 2025 un accord pour utiliser jusqu'à un million de puces TPU de Google, il le chiffre aussi en énergie, avec bien plus d'un gigawatt de capacité en service en 2026.",
    ],
    then:
      "En 2024, Google traitait 9 700 milliards de tokens par mois sur ses services. En mai 2026, Sundar Pichai annonce plus de 3,2 millions de milliards par mois, plus de trois cents fois plus, et chacun de ces tokens a été lu ou écrit pour répondre à quelqu'un.",
    office: [
      {who: 'q', text: "On nous propose d'entraîner notre propre modèle de zéro. C'est jouable ?"},
      {who: 'a', text: "Pose la règle 6ND avant d'en discuter : Olmo 3 32B, qui est loin de la frontière, a déjà occupé 1 024 GPU H100 selon Epoch AI, et c'est le budget à mettre en face du projet."},
    ],
    avoid:
      "« Une fois entraîné, le modèle ne coûte plus rien en calcul. » Chaque token lu ou écrit mobilise tous les paramètres actifs du modèle. Cette dépense revient à chaque requête, multipliée par le nombre d'utilisateurs et, pour un modèle de raisonnement, par la longueur de son brouillon.",
    video: null,
    sources: [
      {label: "Epoch AI, base AI models, fichier all_ai_models.csv mis à jour le 1er octobre 2026 : Olmo 3 32B à 1,1 x 10^24 FLOP (6 x 3,2 x 10^10 x 5,5 x 10^12, « Confident »), entraîné sur 1 024 H100 ; GPT-6 Astra à environ 10^27 FLOP (« Likely », au moins 100 000 GB200 à Abilene, 90 jours à 25 % de MFU supposés) ; règle C = 6ND. Calcul de l'Imagine : 10^25 / 1,056 x 10^24 = 9,5", url: 'https://epoch.ai/data/all_ai_models.csv'},
      {label: "Ai2, fiche d'Olmo 3 32B sur Hugging Face (5,50 trillions de tokens d'entraînement)", url: 'https://huggingface.co/allenai/Olmo-3-1125-32B'},
      {label: "AI Act, article 51, paragraphe 2 (seuil de 10^25 opérations)", url: 'https://artificialintelligenceact.eu/article/51/'},
      {label: "NVIDIA, H200 (1 979 TFLOPS en BF16 avec sparsité, soit environ 990 TFLOPS en calcul dense). Calcul : 10^25 / 9,9 x 10^14 = 1,0 x 10^10 secondes, environ 320 ans", url: 'https://www.nvidia.com/en-us/data-center/h200/'},
      {label: "Google, Sundar Pichai à Google I/O 2026, 19 mai 2026 (9,7 trillions de tokens par mois il y a deux ans, environ 480 trillions à I/O 2025, plus de 3,2 quadrillions aujourd'hui)", url: 'https://blog.google/innovation-and-ai/sundar-pichai-io-2026/'},
      {label: "OpenAI, Reasoning models (de quelques centaines à plusieurs dizaines de milliers de tokens de raisonnement selon le problème)", url: 'https://developers.openai.com/api/docs/guides/reasoning'},
      {label: "Anthropic, Expanding our use of Google Cloud TPUs and Services, 23 octobre 2025 (jusqu'à un million de TPU, bien plus d'un gigawatt en 2026)", url: 'https://www.anthropic.com/news/expanding-our-use-of-google-cloud-tpus-and-services'},
    ],
  },
  {
    id: 'gpu',
    status: 'live',
    title: 'GPU',
    en: 'GPU',
    aliases: ['graphics processing unit', 'TPU', 'AI accelerator', 'HBM', 'CUDA'],
    aliasesFr: ['carte graphique', 'processeur graphique', 'puce IA'],
    jargon: [
      {say: 'HBM', means: "high bandwidth memory, la mémoire montée au plus près de la puce ; une H200 de NVIDIA en a 141 Go, lus à 4,8 To par seconde"},
      {say: 'TPU', means: "tensor processing unit, la puce que Google conçoit pour l'IA ; Anthropic prévoit d'en utiliser jusqu'à un million"},
      {say: 'CUDA', means: "la couche logicielle de NVIDIA qui permet de programmer ses cartes graphiques pour autre chose que l'affichage ; AlexNet était déjà écrit avec, en 2012"},
      {say: 'avec sparsité', means: "la mention qui accompagne souvent les TFLOPS annoncés : le chiffre suppose qu'au moins deux valeurs sur quatre sont des zéros, et la puissance sur un calcul ordinaire vaut la moitié"},
    ],
    cat: 'ecosysteme',
    links: ['compute', 'parametres', 'quantization', 'cout-d-une-requete', 'open-weights', 'modeles-frontiere'],
    short:
      "Un GPU est une puce conçue à l'origine pour l'affichage graphique, capable de faire des milliers de multiplications en même temps ; c'est ce que demande un modèle d'IA, dont le calcul consiste surtout à multiplier de grands tableaux de nombres.",
    image:
      "Au studio, un processeur ordinaire serait un ingé son très rapide qui tourne les potards un à un, alors que le GPU est une équipe de milliers de techniciens qui tournent chacun le leur, tous en même temps. L'image oublie la place, car les potards doivent aussi tenir dans la mémoire de la carte, et c'est souvent elle qui décide du nombre de cartes.",
    imagineForm: 'D',
    imagine:
      "« Une H200 suffira pour faire tourner GLM-5.3 chez nous ? », demande le directeur informatique. L'ingénieure répond : « Ses 753 milliards de paramètres pèsent 755 Go en FP8 et une H200 a 141 Go de mémoire, alors il en faut six avant d'avoir posé la première question, et onze en 16 bits. »",
    full: [
      "En 2012, Alex Krizhevsky entraîne AlexNet, le réseau qui allait lancer la vague actuelle de l'apprentissage profond, sur deux cartes graphiques de jeu GTX 580 installées dans sa chambre, chez ses parents. L'entraînement dure cinq à six jours, et le réseau est coupé en deux parce qu'il ne tient pas dans les 3 Go d'une seule carte. On y trouve déjà tout le reste de l'histoire, puisqu'un réseau de neurones se calcule en multipliant des tableaux de nombres, un GPU fait ces multiplications par milliers en parallèle, et la mémoire fixe la taille de ce qu'on peut faire tourner.",
      "Pour écrire une réponse, la mémoire compte souvent plus que la puissance affichée. Chaque token oblige à relire les poids actifs du modèle, et une H200 de NVIDIA est construite autour de ça, avec 141 Go de mémoire lus à 4,8 To par seconde. L'étude Splitwise montre que cette phase de génération laisse une bonne part du calcul inutilisée, ce qui aide à comprendre pourquoi la quantization, qui allège les poids, accélère aussi les réponses.",
      "NVIDIA n'est pas seul. Google conçoit ses propres puces, les TPU, et Ironwood, présenté en avril 2025 comme le premier pensé pour l'inférence, porte 192 Go de mémoire par puce et s'assemble en grappes allant jusqu'à 9 216 puces. Sa huitième génération, présentée en 2026, se dédouble même, avec un TPU 8t pour l'entraînement et un TPU 8i pour l'inférence. Anthropic répartit son calcul entre trois familles, les TPU de Google, les Trainium d'Amazon et les GPU de NVIDIA.",
    ],
    office: [
      {who: 'q', text: "Pourquoi on ne ferait pas tourner le modèle sur nos serveurs classiques, sans GPU ?"},
      {who: 'a', text: "Pour un petit modèle quantifié, ça se tente ; au-delà, chaque token oblige à relire tous les poids actifs en mémoire, et une H200 les relit à 4,8 To par seconde."},
    ],
    avoid:
      "« Plus de TFLOPS, c'est un modèle qui répond plus vite. » Pendant qu'il écrit, le modèle attend surtout sa mémoire, et sa capacité comme sa bande passante comptent autant que la puissance affichée. Celle-ci est souvent donnée avec sparsité, donc deux fois plus haute que sur un calcul ordinaire.",
    video: null,
    sources: [
      {label: "Wikipédia, AlexNet (deux GTX 580 de 3 Go dans la chambre de Krizhevsky, cinq à six jours d'entraînement, réseau coupé en deux faute de mémoire, code écrit avec CUDA)", url: 'https://en.wikipedia.org/wiki/AlexNet'},
      {label: "NVIDIA, H200 (141 Go de mémoire HBM3e, 4,8 To/s ; TFLOPS donnés avec sparsité), consulté le 2 octobre 2026", url: 'https://www.nvidia.com/en-us/data-center/h200/'},
      {label: "Z.ai, GLM-5.3 sur Hugging Face (753 milliards de paramètres, poids en FP8 pour environ 755 Go selon l'API Hugging Face, consultée le 2 octobre 2026). Calcul de l'Imagine : 755 / 141 = 5,4, donc 6 cartes", url: 'https://huggingface.co/zai-org/GLM-5.3'},
      {label: "Z.ai, GLM-5.3-BF16 sur Hugging Face (environ 1 507 Go en 16 bits selon l'API Hugging Face). Calcul : 1 507 / 141 = 10,7, donc 11 cartes", url: 'https://huggingface.co/zai-org/GLM-5.3-BF16'},
      {label: "Patel et al., Splitwise: Efficient generative LLM inference using phase splitting, novembre 2023 (la génération de tokens sous-utilise la puissance de calcul)", url: 'https://arxiv.org/abs/2311.18677'},
      {label: "NVIDIA Developer, Structured Sparsity in the NVIDIA Ampere Architecture (au moins deux zéros sur quatre valeurs ; débit théorique doublé par rapport au calcul dense)", url: 'https://developer.nvidia.com/blog/structured-sparsity-in-the-nvidia-ampere-architecture-and-applications-in-search-engines/'},
      {label: "Google, Ironwood: The first Google TPU for the age of inference, 9 avril 2025 (192 Go de HBM par puce, 7,37 To/s, grappes de 9 216 puces)", url: 'https://blog.google/products/google-cloud/ironwood-tpu-age-of-inference/'},
      {label: "Google, Sundar Pichai à Google I/O 2026, 19 mai 2026 (TPU 8t pour l'entraînement, TPU 8i pour l'inférence)", url: 'https://blog.google/innovation-and-ai/sundar-pichai-io-2026/'},
      {label: "Anthropic, Expanding our use of Google Cloud TPUs and Services, 23 octobre 2025 (jusqu'à un million de TPU ; TPU, Trainium et GPU NVIDIA)", url: 'https://www.anthropic.com/news/expanding-our-use-of-google-cloud-tpus-and-services'},
    ],
  },
];

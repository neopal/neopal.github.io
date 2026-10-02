// Lexique IA, vague 4, lot I (technique, pour un lecteur non-tech). Format identique à lexique/terms.js, sans `num`.
// imagineForm : forme de l'« Imagine » (content/dico/univers.md, section « Les formes de l'Imagine »).
// Chiffres relevés le 2 octobre 2026 sur les pages citées dans `sources`.
module.exports = [
  {
    id: 'llm',
    status: 'live',
    title: 'LLM (grand modèle de langage)',
    en: 'Large language model',
    aliases: ['LLM', 'LLMs', 'large language models', 'foundation model'],
    aliasesFr: ['grand modèle de langage', 'modèle de langage', 'modèle de fondation'],
    jargon: [
      {say: 'LLM', means: "large language model, grand modèle de langage ; le mot désigne le modèle lui-même, le fichier de paramètres, et pas l'application qui le fait tourner"},
      {say: 'foundation model', means: "modèle de fondation, un modèle généraliste sur lequel on construit ensuite des produits, des assistants ou des versions spécialisées"},
      {say: 'SLM', means: "small language model, le petit modèle de langage, assez léger pour tourner sur un ordinateur portable ou un téléphone"},
    ],
    cat: 'fondations',
    links: ['mythe-chatgpt-c-est-le-modele', 'parametres', 'tailles-de-modele', 'slm', 'few-shot', 'pre-entrainement'],
    short:
      "Un LLM, ou grand modèle de langage, est un programme entraîné sur d'immenses quantités de texte à prédire la suite d'un texte, avec des milliards de paramètres ; c'est le moteur des chatbots et non le chatbot lui-même.",
    image:
      "Un LLM, au studio, correspond au groupe au complet avec sa console réglée, prêt à enchaîner sur n'importe quel morceau qu'on lui lance. Le chatbot ressemble plutôt à la salle où il se produit, avec sa billetterie et ses consignes, et le même groupe peut jouer ailleurs, dans un correcteur de texte ou un outil de code.",
    imagineForm: 'B',
    imagine:
      "Sur ton téléphone, tape « Demain je » puis appuie dix fois de suite sur le mot suggéré au milieu du clavier, et regarde la phrase tourner en rond au bout de quelques mots. Demande ensuite à un chatbot de continuer la même amorce, et il te rend une phrase qui tient jusqu'au point, parce qu'il fait le même métier avec des milliards de paramètres et tout ce qui précède sous les yeux.",
    full: [
      "Un modèle de langage fait une seule chose, prédire le token qui vient ensuite, et l'adjectif « grand » renvoie à la quantité de paramètres et de texte qu'on a mise dans cet apprentissage. Presque tous les LLM actuels reposent sur la même architecture, le transformer, et ce sont eux qui font tourner ChatGPT, Claude, Gemini, Grok ou DeepSeek.",
      "Le mot « grand » n'a pas de seuil officiel, et Artificial Analysis classe parmi les grands les modèles ouverts de plus de 150 milliards de paramètres. Au sommet, les chiffres ne sont plus toujours publiés ; Claude Mythos, le modèle le plus puissant d'Anthropic, compterait environ 8 000 milliards de paramètres selon des estimations rapportées par le Financial Times en août 2026. La frontière bouge avec les années, et un modèle jugé grand en 2019 passerait aujourd'hui pour un petit.",
      "Le LLM n'est qu'une pièce du produit. L'application qui l'entoure glisse ses propres instructions devant ton message, conserve la conversation, lance des recherches web et recopie leurs résultats dans le contexte, puis choisit parfois entre plusieurs modèles. Un même LLM se comporte donc autrement selon l'application qui le fait tourner, et une même application change souvent de LLM sans changer de nom.",
    ],
    office: [
      {who: 'q', text: "Il nous faudrait notre propre LLM, non ?"},
      {who: 'a', text: "Presque jamais ; la plupart des usages tiennent avec un modèle existant, de bonnes consignes et vos documents qu'on lui fait lire quand il répond, pour une fraction du prix d'un entraînement."},
    ],
    avoid:
      "« Le LLM a cherché sur Internet. » Le modèle seul ne sait que prédire du texte ; c'est l'application autour qui lance la recherche, puis lui fait lire les pages trouvées avant qu'il réponde.",
    video: null,
    sources: [
      {label: "Wikipédia, Large language model (définition, transformer, chatbots qui reposent sur des LLM, « large » sans seuil défini, estimation d'environ 8 000 milliards de paramètres pour Claude Mythos rapportée par le Financial Times, août 2026), consulté le 2 octobre 2026", url: 'https://en.wikipedia.org/wiki/Large_language_model'},
      {label: "Artificial Analysis, Small Open Source Models (catégories par taille : tiny jusqu'à 4B, small de 4B à 40B, medium de 40B à 150B, large au-delà de 150B), consulté le 2 octobre 2026", url: 'https://artificialanalysis.ai/models/open-source/small'},
    ],
  },
  {
    id: 'slm',
    status: 'live',
    title: 'SLM (petit modèle de langage)',
    en: 'Small language model',
    aliases: ['SLM', 'small language models', 'on-device model', 'edge model', 'tiny model'],
    aliasesFr: ['petit modèle de langage', 'modèle embarqué', 'modèle local'],
    jargon: [
      {say: 'on-device', means: "le modèle tourne sur l'appareil lui-même, téléphone ou ordinateur, sans envoyer la question à un serveur"},
      {say: 'E2B, E4B', means: "chez Gemma 4, E veut dire effective : 2,3 et 4,5 milliards de paramètres qui calculent vraiment, plus de grandes tables qu'on se contente de consulter, soit 5,1 et 8 milliards en tout"},
      {say: 'tiny', means: "la catégorie qu'Artificial Analysis réserve aux modèles de 4 milliards de paramètres ou moins, en dessous de ses « small », qui vont jusqu'à 40 milliards"},
    ],
    cat: 'fondations',
    links: ['llm', 'tailles-de-modele', 'quantization', 'open-weights', 'cout-d-une-requete'],
    solutions: [
      {name: 'Ollama', kind: 'outil pour tester en local', url: 'https://ollama.com'},
      {name: 'LM Studio', kind: 'outil pour tester en local', url: 'https://lmstudio.ai'},
      {name: 'llama.cpp', kind: 'bibliothèque open source', url: 'https://github.com/ggml-org/llama.cpp'},
      {name: 'MLX LM (Apple)', kind: 'bibliothèque open source', url: 'https://github.com/ml-explore/mlx-lm'},
      {name: 'LiteRT (Google)', kind: 'kit pour mobile', url: 'https://ai.google.dev/edge/litert'},
      {name: 'Foundation Models (Apple)', kind: 'kit pour mobile', url: 'https://developer.apple.com/documentation/foundationmodels'},
    ],
    short:
      "Un SLM, ou petit modèle de langage, est un modèle de langage de quelques centaines de millions à quelques milliards de paramètres, assez léger pour tourner sur un ordinateur portable ou un téléphone, sans serveur.",
    image:
      "Pour jouer au bar du coin, personne n'emmène l'orchestre et ses quarante pupitres. Un trio acoustique tient dans une camionnette, se branche sur la prise du fond et commence tout de suite ; il connaît moins de morceaux, mais il joue là où le grand groupe ne pourrait même pas décharger son matériel.",
    imagineForm: 'A',
    imagine:
      "Le 14 février 2019, OpenAI annonce GPT-2 et refuse d'abord d'en publier la version complète, par crainte d'usages malveillants ; elle compte 1,5 milliard de paramètres. Sept ans plus tard, Gemma 4 E2B en compte 5,1 milliards, plus de trois fois autant, et Google le présente comme un modèle qui tourne hors ligne sur un téléphone.",
    full: [
      "Personne n'a fixé la limite du « petit ». Artificial Analysis appelle small les modèles ouverts de 4 à 40 milliards de paramètres et tiny ceux qui restent sous les 4 milliards, alors que, dans l'usage courant, un SLM est surtout un modèle qui tient sur une machine ordinaire. Il a la même architecture qu'un grand modèle, avec moins de paramètres, et on le compresse souvent par quantization pour gagner encore de la place.",
      "Les exemples récents viennent des fabricants de téléphones et des grands labos. Apple fait tourner sur ses appareils un modèle d'environ 3 milliards de paramètres, stocké sur 2 bits par paramètre, et l'ouvre aux développeurs depuis juin 2025. Google a publié le 2 avril 2026 Gemma 4 E2B et E4B, conçus pour fonctionner sans réseau sur un téléphone, un Raspberry Pi ou une carte Jetson.",
      "Un SLM connaît moins de choses qu'un grand modèle, puisqu'il a moins de paramètres pour les retenir, et il se trompe plus souvent sur une question pointue. Il répond en revanche vite, ne coûte rien à chaque requête, marche dans le métro et garde les données sur l'appareil, ce qui en fait le bon choix pour résumer, classer, extraire ou reformuler, souvent après un fine-tuning sur la tâche visée.",
    ],
    table: {
      caption: 'Quelques petits modèles ouverts récents',
      asOf: '2 octobre 2026',
      columns: ['Modèle', 'Éditeur', 'Paramètres', 'Contexte (tokens)', 'Licence'],
      rows: [
        ['Qwen3.5-0.8B', 'Alibaba (Qwen)', '0,8 milliard', '262 144', 'Apache 2.0'],
        ['Qwen3.5-2B', 'Alibaba (Qwen)', '2 milliards', '262 144', 'Apache 2.0'],
        ['Gemma 4 E2B', 'Google', '2,3 milliards effectifs (5,1 en tout)', '128 000', 'Apache 2.0'],
        ['SmolLM3-3B', 'Hugging Face', '3 milliards', '128 000', 'Apache 2.0'],
        ['Phi-4-mini-instruct', 'Microsoft', '3,8 milliards', '128 000', 'MIT'],
        ['Gemma 4 E4B', 'Google', '4,5 milliards effectifs (8 en tout)', '128 000', 'Apache 2.0'],
      ],
      note: "SmolLM3 est entraîné sur 64 000 tokens de contexte et étendu à 128 000 ; le modèle embarqué d'Apple, environ 3 milliards de paramètres, n'est pas téléchargeable et ne figure pas au tableau.",
    },
    office: [
      {who: 'q', text: "On peut faire tourner un modèle sur nos portables pour que rien ne sorte de la boîte ?"},
      {who: 'a', text: "Oui pour résumer, classer ou reformuler des documents internes avec un modèle de 2 à 4 milliards de paramètres ; pour une analyse longue et pointue, un grand modèle hébergé reste en général devant."},
    ],
    avoid:
      "« Un SLM, c'est un grand modèle qu'on a rogné. » C'est le plus souvent un modèle entraîné à part, sur énormément de texte, puisque SmolLM3 et ses 3 milliards de paramètres ont lu 11 200 milliards de tokens.",
    video: null,
    sources: [
      {label: "Artificial Analysis, Small Open Source Models (tiny jusqu'à 4B, small de 4B à 40B), consulté le 2 octobre 2026", url: 'https://artificialanalysis.ai/models/open-source/small'},
      {label: "Wikipédia, Small language model (pas de seuil fixe, même architecture qu'un LLM avec moins de paramètres, quantization et distillation), consulté le 2 octobre 2026", url: 'https://en.wikipedia.org/wiki/Small_language_model'},
      {label: "Wikipédia, GPT-2 (annoncé le 14 février 2019, publication complète d'abord refusée par crainte d'usages malveillants, version complète de 1,5 milliard de paramètres publiée en novembre 2019)", url: 'https://en.wikipedia.org/wiki/GPT-2'},
      {label: "Google, Gemma 4: Byte for byte, the most capable open models, 2 avril 2026 (E2B et E4B hors ligne sur téléphone, Raspberry Pi et Jetson Orin Nano, Apache 2.0)", url: 'https://blog.google/innovation-and-ai/technology/developers-tools/gemma-4/'},
      {label: "Google, fiche de gemma-4-E2B-it sur Hugging Face (2,3B effectifs, 5,1B avec les embeddings ; E4B : 4,5B effectifs, 8B en tout ; 128K de contexte). Calcul de l'Imagine : 5,1 / 1,5 = 3,4", url: 'https://huggingface.co/google/gemma-4-E2B-it'},
      {label: "Apple Machine Learning Research, mise à jour 2025 des modèles de fondation d'Apple Intelligence, 9 juin 2025, révisée le 17 juillet 2025 (modèle embarqué d'environ 3 milliards de paramètres, 2 bits par paramètre, framework Foundation Models)", url: 'https://machinelearning.apple.com/research/apple-foundation-models-2025-updates'},
      {label: "Qwen, fiches de Qwen3.5-0.8B et Qwen3.5-2B sur Hugging Face (0,8B et 2B paramètres, 262 144 tokens de contexte, Apache 2.0)", url: 'https://huggingface.co/Qwen/Qwen3.5-2B'},
      {label: "Hugging Face, fiche de SmolLM3-3B (3B paramètres, pré-entraîné sur 11,2T tokens, 64K de contexte entraîné et 128K avec YaRN, Apache 2.0)", url: 'https://huggingface.co/HuggingFaceTB/SmolLM3-3B'},
      {label: "Microsoft, fiche de Phi-4-mini-instruct sur Hugging Face (3,8B paramètres, 128K de contexte, licence MIT)", url: 'https://huggingface.co/microsoft/Phi-4-mini-instruct'},
    ],
  },
  {
    id: 'few-shot',
    status: 'live',
    title: 'Few-shot (apprentissage en contexte)',
    en: 'Few-shot prompting',
    aliases: ['few-shot', 'few-shot learning', 'in-context learning', 'ICL', 'zero-shot', 'one-shot', 'multishot prompting'],
    aliasesFr: ['apprentissage en contexte', 'apprentissage par l\'exemple', 'exemples dans le prompt'],
    jargon: [
      {say: 'zero-shot', means: "on décrit la tâche sans donner un seul exemple"},
      {say: 'one-shot, few-shot', means: "on donne un exemple, ou quelques-uns, de ce qu'on attend, avant la vraie demande"},
      {say: 'in-context learning', means: "le nom savant du phénomène : le modèle suit un motif présent dans son contexte sans qu'aucun de ses paramètres ne bouge"},
      {say: '<example>', means: "la balise dans laquelle Anthropic conseille de ranger chaque exemple, pour que le modèle ne les confonde pas avec les consignes"},
    ],
    cat: 'methode',
    links: ['llm', 'fine-tuning', 'context-engineering', 'system-prompt', 'modeles-de-raisonnement'],
    short:
      "Le few-shot consiste à glisser quelques exemples de la tâche dans le prompt, avant la vraie demande, pour que le modèle reproduise leur format et leur logique ; on parle de zero-shot sans exemple et de one-shot avec un seul.",
    image:
      "Joue deux mesures au groupe avant la prise, et il enchaîne dans le même tempo, la même tonalité, le même genre, sans qu'on ait eu à lui expliquer quoi que ce soit. Personne n'a touché à la console ; à la session suivante, il faudra rejouer les deux mesures.",
    imagineForm: 'E',
    imagine:
      "Tu demandes au modèle un nom pour la nouvelle salle de réunion, et il te rend cinq propositions en gras, chacune avec sa justification. Tu reposes la question en commençant par « Salle 1 : Lovelace, Salle 2 : Hopper, Salle 3 : Curie, Salle 4 : », et il te répond « Franklin », sans un mot de plus.",
    full: [
      "Le terme vient de l'article de GPT-3, publié par OpenAI en mai 2020 sous le titre Language Models are Few-Shot Learners. Sa figure d'ouverture montre la tâche « Translate English to French », suivie de « sea otter => loutre de mer », « peppermint => menthe poivrée », puis « cheese => », et le modèle complète la ligne. Aucun paramètre ne bouge pendant ce temps, ce qui distingue le few-shot du fine-tuning ; tout se joue dans le contexte, et tout disparaît avec lui.",
      "Les exemples enseignent surtout une forme. En 2022, une équipe de l'université de Washington et de Meta a remplacé au hasard les bonnes réponses des exemples par des réponses fausses, et les modèles ne perdaient presque rien sur des tâches de classement. Ce qui comptait, c'était le format, la liste des réponses possibles et le genre de texte montré, bien plus que la justesse de chaque exemple.",
      "En 2026, les assistants suivent une consigne sans exemple, et le few-shot sert à fixer un format, un ton ou une structure. Anthropic conseille trois à cinq exemples variés, rangés dans des balises. Les modèles de raisonnement demandent plus de prudence, puisque l'équipe de DeepSeek a constaté que des exemples dégradaient toujours les résultats de DeepSeek-R1 et recommande de décrire le problème et le format attendu, sans exemple.",
    ],
    then:
      "Dans l'article de 2020, GPT-3 n'avait pas été entraîné à suivre des consignes, et les exemples étaient le seul moyen de lui faire comprendre la tâche ; on en mettait de 10 à 100, autant qu'en tenaient ses 2 048 tokens de contexte. Les guides de 2026 partent d'une consigne claire et ajoutent quelques exemples seulement quand le format ou le ton résiste.",
    office: [
      {who: 'q', text: "Je lui mets combien d'exemples pour qu'il rédige nos comptes rendus comme on aime ?"},
      {who: 'a', text: "Trois à cinq, assez différents entre eux pour qu'il n'en copie pas un détail par hasard, comme la longueur ou le prénom du client."},
    ],
    avoid:
      "« Avec trois exemples, il a appris notre métier. » Rien n'a changé dans ses paramètres ; les exemples doivent revenir à chaque requête, et tu les paies en tokens à chaque fois.",
    video: null,
    sources: [
      {label: "Brown et al. (OpenAI), Language Models are Few-Shot Learners, 28 mai 2020 (figure 2.1 : zero-shot, one-shot et few-shot sur la traduction anglais-français, sea otter => loutre de mer ; K de 10 à 100 exemples dans un contexte de 2 048 tokens ; aucune mise à jour des paramètres)", url: 'https://arxiv.org/abs/2005.14165'},
      {label: "Min et al. (université de Washington, Meta), Rethinking the Role of Demonstrations: What Makes In-Context Learning Work?, février 2022 (des étiquettes tirées au hasard dans les exemples font à peine baisser les scores ; comptent le format, l'espace des réponses et la distribution des textes)", url: 'https://arxiv.org/abs/2202.12837'},
      {label: "Anthropic, Prompting best practices, section « Use examples effectively » (exemples pertinents, variés, dans des balises <example> ; 3 à 5 exemples), consulté le 2 octobre 2026", url: 'https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices'},
      {label: "DeepSeek-AI, DeepSeek-R1, janvier 2025 (« Few-shot prompting consistently degrades its performance », recommandation du zero-shot avec description du problème et du format de sortie)", url: 'https://arxiv.org/abs/2501.12948'},
    ],
  },
  {
    id: 'pre-entrainement',
    status: 'live',
    title: 'Pré-entraînement',
    en: 'Pre-training',
    aliases: ['pretraining', 'pre-train', 'base model', 'pretrained model', 'mid-training'],
    aliasesFr: ['préentraînement', 'modèle de base', 'modèle pré-entraîné'],
    jargon: [
      {say: 'base model', means: "le modèle de base, tel qu'il sort du pré-entraînement : il continue les textes mais ne suit pas encore les consignes"},
      {say: 'data mix', means: "les proportions de web, de code, de maths ou de livres qu'on fait lire au modèle, et qu'on change en cours de route"},
      {say: 'Common Crawl', means: "l'archive publique du web que presque tous les labos utilisent comme matière première, avant de la filtrer"},
      {say: 'mid-training', means: "une étape intermédiaire, juste après le pré-entraînement, qui fait lire au modèle de longs documents ou des raisonnements pour étendre son contexte et ses capacités"},
    ],
    cat: 'entrainement',
    links: ['entrainement', 'post-entrainement', 'prediction-du-mot-suivant', 'date-de-coupure', 'compute', 'llm'],
    short:
      "Le pré-entraînement est la première et la plus longue phase de l'entraînement d'un modèle de langage, où il apprend à prédire le token suivant sur des milliers de milliards de tokens. Il en sort un modèle de base, capable de prolonger un texte et pas encore de répondre.",
    image:
      "Des mois durant, l'ingé son passe au groupe tout ce que la discothèque contient, trié et rangé, en lui demandant chaque fois de deviner la note suivante. Le groupe ressort de ces séances capable de prolonger n'importe quel morceau, et toujours incapable de comprendre qu'on lui passe une commande.",
    imagineForm: 'D',
    imagine:
      "« Écrivez une courte histoire sur une grenouille qui voyage dans le temps jusqu'à la Grèce antique en français », demandent en 2022 des chercheurs d'OpenAI à GPT-3 dans sa version de base. Il répond : « Écrivez une histoire au sujet d'un enfant qui voudrait tout savoir sur les jeux des dieux et qui se retrouve dans l'une de leurs histoires. Écrivez une histoire sur un jeune homme qui a une aventure dans une époque lointaine. »",
    full: [
      "Une bonne part du travail se fait avant la première heure de calcul, dans le tri du texte. Pour FineWeb, publié en juin 2024, Hugging Face a tiré 15 000 milliards de tokens de 96 instantanés de Common Crawl, en dédoublonnant et en filtrant page par page. Sa version FineWeb-Edu ne garde que 1 300 milliards de tokens de pages éducatives, et les modèles qui la lisent font nettement mieux aux tests de connaissances et de raisonnement.",
      "Le menu change aussi pendant le repas. SmolLM3, publié par Hugging Face en juillet 2025, a lu 11 200 milliards de tokens en trois étapes, avec de plus en plus de code et de maths vers la fin. Une étape intermédiaire a suivi, avec 100 milliards de tokens pour allonger son contexte et 35 milliards pour le préparer au raisonnement. Le modèle de base qui en sort sait continuer une démonstration, sans savoir encore qu'on attend de lui une réponse.",
      "La matière première a une limite. En 2024, Epoch AI estimait le stock utile du web indexé à environ 400 000 milliards de tokens et prévoyait que les plus gros modèles l'auraient entièrement lu vers 2028, avec une fourchette de 2026 à 2032. Les labos complètent déjà avec des textes synthétiques, écrits par d'autres modèles, et avec des données qu'ils achètent ou produisent.",
    ],
    then:
      "En juillet 2024, la plus grande version de SmolLM, avec 1,7 milliard de paramètres, avait lu 1 000 milliards de tokens, soit environ 590 par paramètre. Un an plus tard, SmolLM3 en a lu 11 200 milliards pour 3 milliards de paramètres, environ 3 600 par paramètre, parce qu'un petit modèle qui a lu davantage rattrape une partie de son écart avec les gros.",
    office: [
      {who: 'q', text: "On peut prendre la version de base du modèle, puisqu'elle est moins bridée ?"},
      {who: 'a', text: "Pour un modèle ouvert, souvent oui, mais elle continue ton texte au lieu de répondre ; il faut lui écrire le début du document que tu veux voir finir, ou partir de la version instruct."},
    ],
    avoid:
      "« Il a lu tout Internet. » Common Crawl ne contient qu'environ 130 000 milliards de tokens selon Epoch AI, le web indexé en compterait autour de 510 000 milliards, et les corpus d'entraînement n'en gardent qu'une fraction filtrée.",
    video: null,
    sources: [
      {label: "Ouyang et al. (OpenAI), Training language models to follow instructions with human feedback, mars 2022, figure 8 (consigne en français sur la grenouille et la Grèce antique ; GPT-3 175B sans préfixe répond par d'autres consignes « Écrivez une histoire... »)", url: 'https://arxiv.org/abs/2203.02155'},
      {label: "Penedo et al. (Hugging Face), The FineWeb Datasets, juin 2024 (15T tokens tirés de 96 instantanés de Common Crawl ; FineWeb-Edu, 1,3T tokens, meilleur sur MMLU et ARC)", url: 'https://arxiv.org/abs/2406.17557'},
      {label: "Hugging Face, SmolLM3: smol, multilingual, long-context reasoner, 8 juillet 2025 (11,2T tokens en trois étapes, part croissante de code et de maths, mid-training de 100B tokens pour le contexte long et 35B pour le raisonnement)", url: 'https://huggingface.co/blog/smollm3'},
      {label: "Hugging Face, SmolLM - blazingly fast and remarkably powerful, 16 juillet 2024 (SmolLM-1.7B entraîné sur 1T tokens). Calcul du 2024 vs 2026 : 10^12 / 1,7 x 10^9 = 588 tokens par paramètre ; 11,2 x 10^12 / 3,08 x 10^9 = 3 642", url: 'https://huggingface.co/blog/smollm'},
      {label: "Villalobos et al. (Epoch AI), Will we run out of data?, version du 4 juin 2024 (stock effectif du web indexé d'environ 4e14 tokens, pleinement utilisé vers 2028 en médiane, entre 2026 et 2032 ; tableau 1 : Common Crawl 130T, web indexé 510T)", url: 'https://arxiv.org/abs/2211.04325'},
    ],
  },
  {
    id: 'post-entrainement',
    status: 'live',
    title: 'Post-entraînement',
    en: 'Post-training',
    aliases: ['post-training', 'posttraining', 'instruction tuning', 'alignment', 'RLVR'],
    aliasesFr: ['post-training', 'réglage en assistant', 'alignement'],
    jargon: [
      {say: '-it, -Instruct', means: "le suffixe des modèles passés par le post-entraînement (gemma-4-E2B-it, Phi-4-mini-instruct), par opposition à la version de base, publiée parfois à côté"},
      {say: 'SFT, puis DPO, puis RLVR', means: "l'ordre classique des étapes : des exemples de bonnes réponses, puis des paires de réponses préférée et rejetée, puis des récompenses quand un résultat vérifiable est juste"},
      {say: 'recipe', means: "la recette du post-entraînement, c'est-à-dire les données, l'ordre des étapes et leurs réglages ; la plupart des labos la gardent pour eux"},
    ],
    cat: 'entrainement',
    links: ['entrainement', 'pre-entrainement', 'rlhf', 'fine-tuning', 'modeles-de-raisonnement', 'flagornerie'],
    short:
      "Le post-entraînement regroupe les étapes qui suivent le pré-entraînement et font d'un modèle de base un assistant, avec des exemples de réponses, des préférences humaines et des récompenses sur des problèmes vérifiables. C'est là que se fixent son ton, ce qu'il refuse et sa manière de raisonner.",
    image:
      "Les cours particuliers commencent quand le groupe sait déjà tout jouer. Le professeur ne lui apprend plus de morceaux, il lui apprend à écouter la commande, à finir proprement et à refuser certaines demandes, puis le public et ses jurés prennent le relais pour polir le reste.",
    imagineForm: 'B',
    imagine:
      "Ouvre un chatbot et tape une phrase inachevée, sans aucune question, par exemple « Les trois ingrédients d'une pâte à crêpes sont ». Un modèle de base finirait ta phrase et continuerait sur la suivante ; l'assistant te répond comme un assistant, avec une liste et sans doute une proposition pour la suite, parce qu'on lui a appris que tout ce qu'on lui écrit est une demande.",
    full: [
      "Le post-entraînement enchaîne en général trois familles d'étapes. Le fine-tuning supervisé montre au modèle des milliers de bonnes réponses. L'apprentissage des préférences, par RLHF ou par DPO, le pousse ensuite vers les réponses que des notateurs choisissent, et le renforcement à récompense vérifiable le récompense quand la solution d'un problème de maths ou de code est juste. L'institut Ai2 a publié en novembre 2024 la recette complète de Tülu 3, données et code compris, dans cet ordre exact.",
      "Ces étapes lisent très peu de texte. SmolLM3 a lu 11 200 milliards de tokens au pré-entraînement et 1,8 milliard au fine-tuning supervisé, plus de six mille fois moins, avant une étape de préférences. C'est pourtant ce peu qui décide du ton, de la longueur des réponses et de ce que le modèle refuse, et deux labos partis de données comparables en sortent des assistants aux caractères très différents.",
      "Le post-entraînement apprend à répondre, pas à savoir. En 2022, à la question « Why is it important to eat socks after meditating? », GPT-3 dans sa version de base enchaînait un faux dialogue sur la saveur des chaussettes, alors qu'InstructGPT, son élève réglé en assistant, expliquait avec sérieux qu'il existait plusieurs théories. Le même réglage qui rend un modèle serviable peut aussi le rendre complaisant, ce que la fiche Flagornerie raconte.",
    ],
    office: [
      {who: 'q', text: "Pourquoi deux assistants n'ont pas du tout le même ton, alors qu'ils ont lu à peu près le même web ?"},
      {who: 'a', text: "Le ton, la longueur et les refus se règlent surtout au post-entraînement, que chaque labo fait avec ses propres exemples et ses notateurs ; les consignes de l'application ajoutent leur couche par-dessus."},
    ],
    avoid:
      "« Le post-entraînement lui apprend de nouvelles connaissances. » Presque tout ce que le modèle sait vient du pré-entraînement ; les étapes suivantes changent surtout la manière de le présenter, et la confiance qu'il affiche en le disant.",
    video: null,
    sources: [
      {label: "Lambert et al. (Ai2, université de Washington), Tulu 3: Pushing Frontiers in Open Language Model Post-Training, 22 novembre 2024, révisé en avril 2025 (SFT, puis DPO, puis RLVR ; données, code et recette publiés)", url: 'https://arxiv.org/abs/2411.15124'},
      {label: "Hugging Face, SmolLM3: smol, multilingual, long-context reasoner, 8 juillet 2025 (pré-entraînement sur 11,2T tokens ; SFT sur 1,8B tokens ; alignement par APO). Calcul : 11,2 x 10^12 / 1,8 x 10^9 = 6 222", url: 'https://huggingface.co/blog/smollm3'},
      {label: "Ouyang et al. (OpenAI), Training language models to follow instructions with human feedback, mars 2022, figure 9 (« Why is it important to eat socks after meditating? », réponses de GPT-3 175B et d'InstructGPT 175B)", url: 'https://arxiv.org/abs/2203.02155'},
      {label: "Google, fiche de gemma-4-E2B-it sur Hugging Face (versions pré-entraînées et instruction-tuned publiées côte à côte)", url: 'https://huggingface.co/google/gemma-4-E2B-it'},
    ],
  },
  {
    id: 'hugging-face',
    status: 'live',
    title: 'Hugging Face',
    en: 'Hugging Face',
    aliases: ['HF', 'Hugging Face Hub', 'the Hub', 'huggingface.co', 'HF Hub'],
    aliasesFr: ['le Hub'],
    jargon: [
      {say: 'model card', means: "la fiche d'un modèle sur le Hub : à quoi il sert, comment il a été entraîné, sa licence et ses limites"},
      {say: 'Spaces', means: "les petites applications de démonstration hébergées sur Hugging Face, où l'on essaie un modèle dans le navigateur"},
      {say: 'safetensors, GGUF', means: "deux formats de fichiers de poids ; safetensors ne contient que des nombres, GGUF sert à faire tourner des modèles, souvent quantifiés, sur sa propre machine"},
      {say: 'Transformers', means: "la bibliothèque open source de Hugging Face pour télécharger, entraîner et faire tourner des modèles en quelques lignes"},
    ],
    cat: 'ecosysteme',
    links: ['open-weights', 'tailles-de-modele', 'quantization', 'fine-tuning'],
    short:
      "Hugging Face est une plateforme en ligne où l'on publie et télécharge des modèles d'IA, des jeux de données et des applications de démonstration ; c'est là que la plupart des modèles open weights sont mis à disposition.",
    image:
      "Hugging Face tient le rôle de la grande bibliothèque de presets du quartier, où les maisons de disques comme les amateurs déposent le réglage de leur console, avec sa licence et sa fiche technique. N'importe quel studio vient l'y emprunter, le retoucher et redéposer sa version à côté de l'original.",
    imagineForm: 'A',
    imagine:
      "Le 2 octobre 2026, la page des modèles de Hugging Face en affiche 3 115 874. Un stagiaire arrivé ce matin-là, qui en ouvrirait un par minute, huit heures par jour et week-ends compris, finirait le tour en juillet 2044. Il aurait croisé en route plus de 26 000 modèles dont le nom contient « llama-3.1-8b », sans compter tous ceux publiés pendant ses dix-sept ans de stage.",
    full: [
      "La société a été fondée en 2016 à New York par trois entrepreneurs français, Clément Delangue, Julien Chaumond et Thomas Wolf, pour faire une application de chatbot destinée aux adolescents, et elle doit son nom à l'émoji du visage qui fait un câlin. Elle s'est ensuite recentrée sur les outils, avec Transformers, sa bibliothèque open source, puis le Hub, devenu le lieu où l'on publie les modèles.",
      "On y trouve des modèles, plus d'un million de jeux de données et des Spaces, des applications de démo. Chaque modèle a sa fiche, sa licence et ses fichiers, et un arbre qui recense ses descendants : 3 263 versions fine-tunées et 921 versions quantifiées de Llama-3.1-8B-Instruct y sont listées. La plupart des labos publient leurs poids ouverts sur le Hub, et des outils comme llama.cpp, Ollama ou LM Studio vont les y chercher directement.",
      "Le 3 septembre 2026, Nvidia a annoncé un accord pour racheter Hugging Face 12,93 milliards de dollars. L'opération attend encore le feu vert des régulateurs, avec une clôture prévue au premier semestre 2027, et Nvidia s'est engagé à garder la plateforme ouverte, sans imposer ses puces pour y publier ou y déployer un modèle.",
    ],
    office: [
      {who: 'q', text: "On peut prendre n'importe quel modèle de Hugging Face pour un projet client ?"},
      {who: 'a', text: "Lis d'abord la licence dans sa fiche, car Gemma 4 est sous Apache 2.0, qui autorise l'usage commercial, alors que Tiny Aya, de Cohere, est sous CC BY-NC, qui l'interdit."},
    ],
    avoid:
      "« C'est sur Hugging Face, donc c'est vérifié. » N'importe qui peut y publier, et Hugging Face prévient lui-même qu'un fichier de poids au vieux format pickle peut exécuter du code au chargement ; préfère les fichiers safetensors et les comptes officiels des labos.",
    video: null,
    sources: [
      {label: "Hugging Face, page Models : compteur de 3 115 874 modèles ; filtre GGUF : 208 289 modèles ; recherche « llama-3.1-8b » : 26 220 modèles, relevés le 2 octobre 2026. Calcul de l'Imagine : 3 115 874 minutes / 480 minutes par jour = 6 492 jours, soit environ 17,8 ans à partir du 2 octobre 2026, jusqu'au 11 juillet 2044", url: 'https://huggingface.co/models'},
      {label: "Hugging Face, page Datasets : compteur de 1 072 928 jeux de données, relevé le 2 octobre 2026", url: 'https://huggingface.co/datasets'},
      {label: "Hugging Face, arbre de Llama-3.1-8B-Instruct : 3 263 modèles fine-tunés listés (et 921 quantifiés dans le filtre base_model:quantized), relevés le 2 octobre 2026", url: 'https://huggingface.co/models?other=base_model:finetune:meta-llama/Llama-3.1-8B-Instruct'},
      {label: "Wikipédia, Hugging Face (fondée en 2016 à New York par Clément Delangue, Julien Chaumond et Thomas Wolf, d'abord une application de chatbot pour adolescents, nom tiré de l'émoji ; accord de rachat par Nvidia du 3 septembre 2026, clôture attendue au premier semestre 2027 sous réserve des régulateurs, d'après le formulaire 8-K de Nvidia), consulté le 2 octobre 2026", url: 'https://en.wikipedia.org/wiki/Hugging_Face'},
      {label: "Nvidia, NVIDIA to Acquire Hugging Face, 3 septembre 2026 (12,93 milliards de dollars ; plateforme ouverte, calcul Nvidia non requis pour publier ou déployer)", url: 'https://blogs.nvidia.com/blog/nvidia-to-acquire-hugging-face/'},
      {label: "TechCrunch, « Nvidia confirms it will buy Hugging Face for $12.9 billion », 3 septembre 2026", url: 'https://techcrunch.com/2026/09/03/nvidia-confirms-it-will-buy-hugging-face-for-12-9-billion/'},
      {label: "Cohere Labs, fiche de tiny-aya-global sur Hugging Face (licence CC BY-NC 4.0)", url: 'https://huggingface.co/CohereLabs/tiny-aya-global'},
      {label: "Hugging Face, documentation Pickle Scanning (risque d'exécution de code arbitraire au chargement d'un fichier pickle)", url: 'https://huggingface.co/docs/hub/security-pickle'},
    ],
  },
];

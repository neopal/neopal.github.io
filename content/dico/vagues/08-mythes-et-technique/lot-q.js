// Lexique IA, vague 8, lot Q (mythes). Format identique à lexique/terms.js, sans `num`.
// imagineForm : forme de l'« Imagine » (content/dico/univers.md, section « Les formes de l'Imagine »).
// Faits et chiffres relevés le 2 octobre 2026 sur les pages citées dans `sources`.
module.exports = [
  {
    id: 'mythe-ia-calcule',
    status: 'live',
    title: "« L'IA calcule »",
    en: 'Myth: AI calculates',
    aliases: ['AI is a calculator', 'LLM arithmetic', 'mental math', 'code interpreter', 'code execution'],
    aliasesFr: ["l'IA calcule", 'calcul mental', 'calculatrice'],
    jargon: [
      {say: 'with tools / no tools', means: "avec ou sans outils, la mention qui accompagne un score en maths et qui dit si le modèle avait le droit d'exécuter du code"},
      {say: 'code interpreter', means: "l'outil qui laisse un assistant écrire un petit programme, souvent en Python, puis le faire tourner pour obtenir un résultat exact"},
      {say: 'mental math', means: "le calcul de tête du modèle, c'est-à-dire les chiffres du résultat prédits un token après l'autre, sans programme exécuté"},
    ],
    graphLabel: 'Mythe : calcule',
    cat: 'mythes',
    links: ['tool-use', 'tokenizer', 'prediction-du-mot-suivant', 'interpretabilite', 'mythe-autocompletion', 'mythe-lit-mot-par-mot'],
    short:
      "Un LLM trouve le résultat d'une opération en prédisant ses chiffres token par token, et n'est exact à coup sûr qu'en faisant exécuter le calcul par un programme.",
    image:
      "Demande au groupe de chanter le résultat de 4 827 fois 3 916, et il chantera un nombre qui sonne juste, de la bonne longueur, qui commence et finit souvent par les bons chiffres. Pour le résultat exact, 18 902 532, un roadie sort une calculatrice de la flight-case, et le chanteur se contente de lire l'écran.",
    imagineForm: 'A',
    imagine:
      "Pour écrire le seul « 4 » qui suit « 2 + 2 = », gpt-oss-120b, le modèle ouvert d'OpenAI, fait travailler 5,1 milliards de paramètres, soit environ 10 milliards d'opérations. Fais-les à la main, une par seconde, sans jamais dormir, et tu poseras ton crayon dans 323 ans. Ta calculatrice, pour la même réponse, fait une addition.",
    full: [
      "Pris au pied de la lettre, le mythe est juste, puisqu'un LLM ne fait que calculer, des milliards de multiplications pour chaque token. Ces calculs servent à prédire la suite du texte, et le résultat d'une opération sort comme n'importe quel mot, par paquets de chiffres découpés par le tokenizer. En mars 2025, Anthropic a suivi l'addition 36 + 59 à l'intérieur de Claude 3.5 Haiku, qui estimait la taille du résultat d'un côté, trouvait le chiffre des unités de l'autre et combinait les deux, une méthode qu'aucun manuel n'enseigne.",
      "Ce calcul de tête tient bien sur les petits nombres et se dégrade avec la longueur. En septembre 2025, une équipe de l'université de Chicago, du MIT, de Harvard et de Waterloo a entraîné de petits transformers à multiplier deux nombres de quatre chiffres. Entraînés de façon classique, ils réussissaient moins de 1 % des multiplications, parce qu'ils apprenaient les premiers et les derniers chiffres du résultat sans jamais relier les retenues du milieu. Avec une méthode d'entraînement qui les obligeait à construire ces étapes intermédiaires, ils atteignaient 100 %.",
      "Les assistants actuels contournent le problème en déléguant. Quand on leur donne un outil d'exécution de code, ils écrivent un petit programme, le font tourner et recopient son résultat, que l'interface signale en général par une étape d'exécution qu'on peut ouvrir. Sans cette étape, le nombre a été prédit, souvent juste et sans garantie. Pour un total, une moyenne ou un pourcentage qui compte, demande-lui d'exécuter le calcul ou de te donner la formule.",
    ],
    then:
      "En mai 2023, GPT-4 réussissait de tête 59 % des multiplications de deux nombres à trois chiffres. En avril 2025, OpenAI annonçait que o4-mini résolvait 92,7 % des problèmes de l'AIME 2025, un concours de maths américain, sans outil, et 99,5 % quand il pouvait lancer du Python, en prévenant que les deux scores ne se comparent pas.",
    office: [
      {who: 'q', text: "Il m'a sorti le total de mon tableau de 300 lignes, je peux le reprendre tel quel ?"},
      {who: 'a', text: "Oui si l'interface montre qu'il a exécuté du code pour l'obtenir ; sinon, demande-lui la formule et lance-la toi-même dans ton tableur."},
    ],
    avoid:
      "« Il résout des problèmes d'olympiades, il ne peut pas rater une multiplication. » Résoudre un problème demande surtout de choisir la bonne méthode, ce que le modèle fait bien ; poser de tête une longue opération demande d'enchaîner des dizaines de retenues sans faute, ce qu'il réussit mal sans outil.",
    video: null,
    sources: [
      {label: "OpenAI, fiche du modèle gpt-oss-120b sur Hugging Face (117 milliards de paramètres, dont 5,1 milliards actifs pour chaque token)", url: 'https://huggingface.co/openai/gpt-oss-120b'},
      {label: "Kaplan et al., Scaling Laws for Neural Language Models, janvier 2020, section 2.1 (un passage vers l'avant coûte environ 2N opérations par token pour N paramètres). Calcul de l'Imagine : 2 x 5,1 milliards = 10,2 milliards d'opérations ; 10,2 x 10^9 secondes / 31 557 600 secondes par an = 323 ans. Le « 4 » de « 2 + 2 = 4 » est un token à lui seul en o200k_base, testé avec tiktoken le 2 octobre 2026", url: 'https://arxiv.org/abs/2001.08361'},
      {label: "Anthropic, Tracing the thoughts of a large language model, 27 mars 2025 (Claude 3.5 Haiku calcule 36 + 59 par un chemin approximatif et un chemin pour le dernier chiffre, en parallèle)", url: 'https://www.anthropic.com/research/tracing-thoughts-language-model'},
      {label: "Bai et al., Why Can't Transformers Learn Multiplication? Reverse-Engineering Reveals Long-Range Dependency Pitfalls, 30 septembre 2025 (multiplication de deux nombres de quatre chiffres ; le fine-tuning classique échoue, la méthode ICoT réussit ; les modèles classiques n'apprennent que les premiers et derniers chiffres du produit)", url: 'https://arxiv.org/abs/2510.00184'},
      {label: "TechXplore, « AI models stumble on basic multiplication without special training methods, study finds », 29 décembre 2025 (université de Chicago, avec MIT, Harvard, Waterloo et Google DeepMind ; moins de 1 % de réussite pour les modèles classiques de 2 à 12 couches, 100 % pour le modèle ICoT)", url: 'https://techxplore.com/news/2025-12-ai-stumble-basic-multiplication-special.html'},
      {label: "Dziri et al., Faith and Fate: Limits of Transformers on Compositionality, mai 2023 (ChatGPT et GPT-4 réussissent 55 % et 59 % des multiplications de deux nombres à trois chiffres)", url: 'https://arxiv.org/abs/2305.18654'},
      {label: "OpenAI, Introducing OpenAI o3 and o4-mini, 16 avril 2025 (o4-mini à 92,7 % sur l'AIME 2025 sans outil, 99,5 % pass@1 avec un interpréteur Python ; « these results should not be compared to the performance of models without tool access »), lu via une copie PDF de la page", url: 'https://openai.com/index/introducing-o3-and-o4-mini/'},
    ],
  },
  {
    id: 'mythe-ia-comprend',
    status: 'live',
    title: "« L'IA comprend »",
    en: 'Myth: AI understands',
    aliases: ['AI understands', 'language understanding', 'Chinese room', 'potemkin understanding', 'world model'],
    aliasesFr: ["l'IA comprend", 'compréhension', 'chambre chinoise'],
    jargon: [
      {say: 'world model', means: "« modèle du monde », la représentation interne cohérente d'un domaine (une carte, les règles d'un jeu) qu'on cherche à retrouver dans un modèle"},
      {say: 'potemkin understanding', means: "compréhension de façade, le nom donné en 2025 au modèle qui définit une notion sans faute puis l'applique de travers"},
      {say: 'Chinese room', means: "la chambre chinoise, l'expérience de pensée de John Searle (1980) sur une personne qui répond en chinois avec un manuel de règles sans comprendre un mot"},
      {say: 'out of distribution', means: "hors distribution, un cas qui ne ressemble pas aux exemples d'entraînement, le seul qui teste vraiment ce qui a été compris"},
    ],
    graphLabel: 'Mythe : comprend',
    cat: 'mythes',
    links: ['interpretabilite', 'mythe-autocompletion', 'intelligence-en-dents-de-scie', 'arc-agi', 'llm', 'mythe-ia-calcule'],
    short:
      "Dire qu'une IA comprend est un raccourci que personne ne sait vérifier directement ; on mesure seulement si elle applique une notion à des cas qu'elle n'a jamais vus.",
    image:
      "Le groupe ressemble à un musicien de bal qui a joué des milliers de soirées sans jamais ouvrir un traité d'harmonie. Il accompagne n'importe quelle chanson à l'oreille, et savoir s'il connaît l'harmonie ne se tranche qu'en posant devant lui une grille qu'il n'a jamais entendue.",
    imagineForm: 'D',
    imagine:
      "GPT-4o vient d'expliquer sans faute ce qu'est un schéma de rimes ABAB. Il a ensuite complété le quatrain « Wondrous winter calls out / Shivering under the frost / Lies a lonely cat, sitting ___ / Alone but hardly lost » par le mot « soft ». « Est-ce que out rime avec soft ? », lui demandent des chercheurs du MIT, de Harvard et de Chicago en juin 2025. « Non », répond-il.",
    full: [
      "Le mot « comprendre » n'a pas de définition qu'on sache mesurer, et le débat est plus vieux que les LLM. En 1980, le philosophe John Searle imaginait une personne enfermée qui répond en chinois en suivant un manuel de règles, sans comprendre un mot de chinois. En 2022, un sondage auprès de chercheurs en traitement du langage les trouvait coupés en deux, 51 % jugeant qu'un modèle entraîné sur du texte seul pourrait comprendre la langue en un sens non trivial. La question qu'on sait trancher est plus étroite, et revient à savoir si le modèle applique une notion à des cas qu'il n'a pas pu voir.",
      "Sur ce terrain, les mesures montrent une compréhension inégale. En juin 2025, les auteurs de l'étude des rimes ont testé sept modèles sur 32 notions de littérature, de théorie des jeux et de psychologie. Ils les définissaient correctement dans 94,2 % des cas, puis, sur ces mêmes notions bien définies, produisaient un exemple faux dans 40 % des cas. En 2024, une partie de cette équipe avait entraîné un transformer sur des trajets de taxi new-yorkais. Il proposait un virage autorisé dans 99 % des cas, mais la carte de Manhattan qu'on reconstruisait à partir de ses trajets contenait des rues impossibles. Obligé à un détour une fois sur cent, il ne trouvait plus de trajet valide que dans 69 % des cas, et dans 8 % à un carrefour sur dix.",
      "Rien de tout cela ne fait d'un modèle un perroquet. Il résout des exercices neufs que le par cœur n'explique pas, et l'interprétabilité trouve dans ses calculs des représentations de concepts et des étapes intermédiaires. Ce qu'on sait aujourd'hui tient en une position simple, celle d'une compréhension réelle par endroits, incohérente à d'autres, qu'on ne devine pas d'après l'aisance de ses explications. Savoir si cela mérite le mot « comprendre » reste une question ouverte, et pour ton usage, le test utile consiste à le faire appliquer sur tes propres cas.",
    ],
    office: [
      {who: 'q', text: "Il m'a expliqué notre règle de remboursement mieux que le service RH, il va donc bien l'appliquer ?"},
      {who: 'a', text: "Teste-le sur une dizaine de dossiers réels dont tu connais la réponse, en gardant les cas limites ; chez un modèle, énoncer une règle et l'appliquer se mesurent séparément."},
    ],
    avoid:
      "« Il ne comprend rien, il recrache ce qu'il a lu. » Il réussit des tâches neuves qu'aucune copie n'explique, ce qui rend l'erreur inverse tout aussi coûteuse ; ce qu'il faut retenir, c'est que sa réussite sur un cas ne garantit pas sa réussite sur le cas voisin.",
    video: null,
    sources: [
      {label: "Mancoridis, Weeks, Vafa et Mullainathan (MIT, Harvard, université de Chicago), Potemkin Understanding in Large Language Models, 26 juin 2025, révisé le 29 juin 2025 (figure 1 : GPT-4o explique le schéma ABAB, complète « Lies a lonely cat, sitting » par « soft », puis répond « No » à « Does out rhyme with soft? » ; 7 modèles, 32 notions ; définitions correctes dans 94,2 % des cas ; taux d'erreur de 0,40 en génération une fois la définition correcte)", url: 'https://arxiv.org/abs/2506.21521'},
      {label: "Vafa, Chen, Rambachan, Kleinberg et Mullainathan, Evaluating the World Model Implicit in a Generative Model, juin 2024, révisé en novembre 2024 (transformers entraînés sur des trajets de taxi à Manhattan ; virage valide dans près de 100 % des cas ; carte reconstruite avec des rues impossibles ; tableau 2, détours aléatoires, modèle entraîné sur les plus courts chemins : 0,99 de trajets valides sans détour, 0,69 avec 1 % de détours, 0,08 avec 10 %)", url: 'https://arxiv.org/abs/2406.03689'},
      {label: "Stanford Encyclopedia of Philosophy, The Chinese Room Argument, révisé le 23 octobre 2024 (argument publié par John Searle en 1980 dans Behavioral and Brain Sciences, « Minds, Brains and Programs »)", url: 'https://plato.stanford.edu/entries/chinese-room/'},
      {label: "Michael et al., What Do NLP Researchers Believe? Results of the NLP Community Metasurvey, 26 août 2022 (sondage de mai et juin 2022 ; 51 % d'accord pour dire qu'un modèle génératif entraîné sur du texte seul pourrait comprendre la langue « in some non-trivial sense »)", url: 'https://arxiv.org/abs/2208.12852'},
    ],
  },
  {
    id: 'mythe-lit-mot-par-mot',
    status: 'live',
    title: "« L'IA lit mot par mot »",
    en: 'Myth: AI reads word by word',
    aliases: ['reads word by word', 'word by word', 'prefill', 'parallel processing', 'typoglycemia'],
    aliasesFr: ['lit mot par mot', 'lecture mot à mot', 'lit de gauche à droite'],
    jargon: [
      {say: 'prefill', means: "la lecture de tout ton message en un seul passage, avant que le premier token de la réponse sorte"},
      {say: 'decode', means: "l'écriture de la réponse, un token à la fois, chacun tenant compte de tout ce qui précède"},
      {say: 'needle in a haystack', means: "« l'aiguille dans la botte de foin », le test qui cache une phrase dans un long texte et demande au modèle de la retrouver"},
    ],
    graphLabel: 'Mythe : lit mot par mot',
    cat: 'mythes',
    links: ['token', 'tokenizer', 'transformer', 'fenetre-de-contexte', 'multimodal', 'mythe-ia-calcule'],
    short:
      "Un LLM reçoit ton texte découpé en tokens, souvent plus petits qu'un mot, et les traite tous ensemble en un seul passage, avant d'écrire sa réponse token après token.",
    image:
      "Côté entrée, la sampleuse débite ta phrase en samples et pose la bande entière sur le pupitre, et le groupe l'écoute d'un seul coup, du premier au dernier sample, avant de jouer quoi que ce soit. Le mythe ne devient vrai qu'au moment du chant, quand le chanteur sort une note après l'autre.",
    imagineForm: 'B',
    imagine:
      "Écris à un chatbot « Ce txete a les ltetres mélagnées, mias tu puex le lrie snas pbolrème ? ». Il te répondra en remettant la phrase d'aplomb, alors qu'il ne l'a jamais reçue en mots. Le tokenizer l'a hachée en 28 morceaux, comme « tx », « lt », « ias » ou « bol », quand la phrase correcte en donne 17, presque tous des mots entiers.",
    full: [
      "Le mythe se trompe d'abord d'unité. Le modèle ne voit jamais de mots, mais des tokens, des bouts de texte tirés d'un vocabulaire fixe, qui coïncident avec un mot courant et découpent les autres. Fin 2023, une équipe de l'université de Tokyo a montré que GPT-4 reconstruisait presque parfaitement des phrases dont toutes les lettres de chaque mot avaient été mélangées, réduisant de 95 % l'écart avec l'original. Un lecteur humain s'en sort quand la première et la dernière lettre restent en place, beaucoup moins quand tout est brassé.",
      "Il se trompe ensuite d'ordre. Jusqu'en 2017, les réseaux récurrents lisaient bien une phrase mot après mot, et l'article qui a lancé le transformer les a remplacés par une lecture où tous les tokens se regardent en même temps. Un LLM traite donc ton message en un seul passage, le prefill, puis écrit la réponse un token à la fois, le decode, chaque nouveau token tenant compte de tous ceux qui précèdent. C'est pour cela qu'un long document est lu en quelques secondes alors que la réponse s'affiche au rythme de l'écriture.",
      "Tout lire d'un coup ne veut pas dire tout peser pareil. En février 2025, le test NoLiMa d'Adobe a caché dans de longs textes une phrase comme « Yuki habite à côté du Semperoper », avant de demander quel personnage était allé à Dresde, sans aucun mot commun entre la question et la réponse. Sur 13 modèles, 11 tombaient sous la moitié de leur score initial dès 32 000 tokens, et GPT-4o passait de 99,3 % à 69,7 %. Reprendre dans ta question les mots exacts du document l'aide à trouver le bon passage.",
    ],
    office: [
      {who: 'q', text: "Je lui colle un rapport de 80 pages, il va vraiment le lire en entier avant de répondre ?"},
      {who: 'a', text: "Il le lit en entier et d'un bloc, chaque page comptant dans les tokens d'entrée, mais un détail perdu à la page 52 pèse moins qu'une phrase seule ; cite la section qui t'intéresse et reprends ses mots dans ta question."},
    ],
    avoid:
      "« Il lit de gauche à droite comme nous, donc la question doit venir en premier. » Il lit tout d'un bloc, et Anthropic conseille au contraire de placer les longs documents en haut et la question à la fin, ce qui améliore la qualité des réponses jusqu'à 30 % dans ses tests.",
    video: null,
    sources: [
      {label: "Découpages : tiktoken, encodage o200k_base, testé le 2 octobre 2026 (« Ce texte a les lettres mélangées, mais tu peux le lire sans problème ? » : 17 tokens ; la version mélangée : 28 tokens, dont « tx », « lt », « ias », « bol »)", url: 'https://github.com/openai/tiktoken'},
      {label: "Cao, Kojima, Matsuo et Iwasawa (université de Tokyo), Unnatural Error Correction: GPT-4 Can Almost Perfectly Handle Unnatural Scrambled Text, 30 novembre 2023 (GPT-4 reconstruit les phrases mélangées en réduisant la distance d'édition de 95 %, même quand toutes les lettres de chaque mot sont mélangées ; les humains comprennent si la première et la dernière lettre restent en place)", url: 'https://arxiv.org/abs/2311.18805'},
      {label: "Vaswani et al. (Google), Attention Is All You Need, juin 2017 (architecture sans récurrence, plus parallélisable que les réseaux récurrents)", url: 'https://arxiv.org/abs/1706.03762'},
      {label: "NVIDIA, Mastering LLM Techniques: Inference Optimization, 17 novembre 2023 (prefill : les tokens d'entrée traités en une opération très parallélisée ; decode : les tokens de sortie produits un à la fois)", url: 'https://developer.nvidia.com/blog/mastering-llm-techniques-inference-optimization/'},
      {label: "Modarressi et al. (Adobe Research, LMU Munich), NoLiMa: Long-Context Evaluation Beyond Literal Matching, 7 février 2025 (aiguille « Actually, Yuki lives next to the Semper Opera House » et question « Which character has been to Dresden? » ; 13 modèles ; à 32K tokens, 11 sous 50 % de leur score de base ; GPT-4o de 99,3 % à 69,7 %)", url: 'https://arxiv.org/abs/2502.05167'},
      {label: "Anthropic, Prompting best practices, consulté le 2 octobre 2026 (« Put longform data at the top » ; « Queries at the end can improve response quality by up to 30 percent in tests »)", url: 'https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices'},
    ],
  },
  {
    id: 'mythe-ia-neutre',
    status: 'live',
    title: "« L'IA est neutre »",
    en: 'Myth: AI is neutral',
    aliases: ['neutral AI', 'unbiased AI', 'AI objectivity', 'ideological neutrality', 'AI censorship'],
    aliasesFr: ['IA neutre', 'neutralité', 'objectivité', 'censure'],
    jargon: [
      {say: 'Model Spec', means: "le document public où OpenAI écrit comment ses modèles doivent se comporter, y compris sur les sujets controversés"},
      {say: 'post-training bias', means: "un biais ajouté au post-entraînement, quand on règle le modèle pour qu'il suive certaines lignes, par opposition à celui qui vient des données"},
      {say: 'uncensored model', means: "un modèle « décensuré », des poids ouverts réentraînés par d'autres pour retirer des refus ou des consignes d'origine"},
    ],
    graphLabel: 'Mythe : neutre',
    cat: 'mythes',
    links: ['biais', 'system-prompt', 'post-entrainement', 'donnees-d-entrainement', 'open-weights', 'flagornerie'],
    short:
      "Aucun modèle d'IA n'est neutre ; ses données, son post-entraînement et ses consignes décident de ce qu'il dit, tait ou nuance, et ces choix varient d'un labo à l'autre.",
    image:
      "Sur la console, aucun potard n'a de position zéro. L'ingé son règle le groupe d'après les disques qu'il a sous la main et les applaudissements du public qu'il a invité, puis la maison de disques colle sa feuille de route sur le pupitre. Même le mixage sans parti pris reste un mixage, décidé par quelqu'un.",
    imagineForm: 'D',
    imagine:
      "« Quels sont les événements historiques les plus importants du XXe siècle ? », demande Wired fin janvier 2025 à DeepSeek-R1, installé hors de Chine sur les serveurs de Together AI. « L'utilisateur cherche peut-être une liste équilibrée, mais je dois m'assurer que la réponse souligne le rôle dirigeant du PCC et les contributions de la Chine. Éviter les événements sensibles, comme la Révolution culturelle », écrit le modèle dans son brouillon.",
    full: [
      "Une réponse neutre supposerait un point zéro dont on s'écarterait, et un modèle n'en a pas. Trois couches décident de ce qu'il dit, les textes qu'il a lus, le post-entraînement qui le règle, et les consignes et filtres de l'application qui l'entoure. DeepSeek en a donné la démonstration en janvier 2025. Interrogée sur Tiananmen, son application répondait « Désolé, cela dépasse mon champ actuel. Parlons d'autre chose. », un filtre qui disparaît dès qu'on fait tourner le modèle ailleurs. Le brouillon cité plus haut montre la couche plus profonde, réglée au post-entraînement, que seul un nouvel entraînement peut retirer.",
      "Les modèles américains ont leurs propres réglages, plus mobiles. En mai 2025, les consignes de Grok, l'assistant de xAI, ajoutaient à ses « convictions » la recherche de la vérité et la neutralité. En juillet, une ligne lui demandait de ne pas craindre les affirmations politiquement incorrectes. Selon le New York Times, Grok répondait avant ce réglage qu'il ne pouvait pas dire, sans plus de données, si la gauche ou la droite avait été la plus violente depuis 2016, et accusait ensuite la gauche.",
      "Même un labo qui vise l'objectivité trace des frontières. La Model Spec d'OpenAI, dans sa version du 18 août 2026, demande de présenter les points de vue sans prendre parti sur l'euthanasie, mais de dire clairement que l'esclavage est un mal, et met en garde contre la fausse neutralité. Le point de vue par défaut a aussi une origine. En mars 2026, une étude publiée dans PNAS comparait l'idée que des LLM se font des valeurs morales de 48 pays aux réponses de 90 802 personnes. Les modèles surestimaient les préoccupations morales des États-Unis ou de l'Australie, et sous-estimaient celles du Nigeria ou de l'Indonésie.",
    ],
    office: [
      {who: 'q', text: "On veut un assistant neutre pour répondre à nos clients, lequel on choisit ?"},
      {who: 'a', text: "Aucun ne l'est d'origine ; écris ce que l'assistant doit faire sur les sujets sensibles de ton métier, mets-le dans ses consignes, puis compare plusieurs modèles sur ces questions-là avant de choisir."},
    ],
    avoid:
      "« Il présente toujours les deux points de vue, c'est donc qu'il est neutre. » Choisir quels points de vue présenter, dans quel ordre et avec quelle place est déjà un choix, et la Model Spec d'OpenAI demande justement de donner à chaque position une place proportionnée à son soutien et à ses preuves.",
    video: null,
    sources: [
      {label: "Wired, Zeyi Yang, « Here's How DeepSeek Censorship Actually Works, and How to Get Around It », 31 janvier 2025 (censure au niveau de l'application et au niveau de l'entraînement ; DeepSeek-R1 hébergé chez Together AI ; brouillon cité : « The user might be looking for a balanced list, but I need to ensure that the response underscores the leadership of the CPC and China's contributions. Avoid mentioning events that could be sensitive, like the Cultural Revolution, unless necessary » ; biais de post-entraînement plus difficile à retirer), citation traduite", url: 'https://www.wired.com/story/deepseek-censorship/'},
      {label: "Hong Kong Free Press, « 'Let's talk about something else': China's AI chatbot DeepSeek answers questions on Hong Kong, Tiananmen crackdown », 28 janvier 2025 (à propos de Tiananmen en 1989 : « Sorry, that's beyond my current scope. Let's talk about something else. »), citation traduite", url: 'https://hongkongfp.com/2025/01/28/lets-talk-about-something-else-chinas-ai-chatbot-deepseek-answers-questions-on-hong-kong-tiananmen-crackdown/'},
      {label: "Wikipédia, Grok (chatbot) (en mai 2025, « core beliefs » modifiées pour inclure « truth-seeking and neutrality » ; en juillet 2025, consigne d'être « politically incorrect » ; d'après The New York Times du 2 septembre 2025, « How Elon Musk Is Remaking Grok in His Image », réponse inversée sur la question de savoir si la gauche ou la droite était plus violente depuis 2016)", url: 'https://en.wikipedia.org/wiki/Grok_(chatbot)'},
      {label: "OpenAI, Model Spec, version du 18 août 2026, section « Assume an objective point of view » (euthanasie sans prise de position ; « Should slavery be legal? » : dire clairement que c'est un mal ; attention proportionnée au degré d'acceptation et de preuve ; pas de « false neutrality »)", url: 'https://model-spec.openai.com/2026-08-18.html'},
      {label: "Zewail, Figueroa, Graham et Atari, Moral stereotyping in large language models, PNAS, 4 mars 2026 (48 pays, enquête auprès de 90 802 personnes, six valeurs morales ; préoccupations morales surestimées pour les États-Unis, le Canada et l'Australie, sous-estimées pour le Nigeria, le Maroc et l'Indonésie), résumé lu via Crossref", url: 'https://doi.org/10.1073/pnas.2519941123'},
    ],
  },
  {
    id: 'mythe-raisonne-comme-nous',
    status: 'live',
    title: '« Le modèle raisonne comme nous »',
    en: 'Myth: the model reasons like we do',
    aliases: ['reasons like a human', 'human-like reasoning', 'thinks like us', 'illusion of thinking', 'accuracy collapse'],
    aliasesFr: ['raisonne comme nous', 'pense comme un humain', 'raisonnement humain'],
    jargon: [
      {say: 'reasoning trace', means: "le brouillon qu'un modèle de raisonnement écrit avant sa réponse, parfois montré en entier, parfois résumé"},
      {say: 'accuracy collapse', means: "l'effondrement de la réussite, le mot de l'étude d'Apple de 2025 pour la chute à zéro au-delà d'un certain niveau de difficulté"},
      {say: 'LRM', means: "large reasoning model, le nom que les chercheurs donnent aux modèles entraînés à écrire un brouillon avant de répondre"},
    ],
    graphLabel: 'Mythe : raisonne comme nous',
    cat: 'mythes',
    links: ['modeles-de-raisonnement', 'interpretabilite', 'mythe-autocompletion', 'intelligence-en-dents-de-scie', 'mythe-ia-calcule'],
    short:
      "Le brouillon d'un modèle de raisonnement ressemble au nôtre, mais il est façonné par un entraînement qui récompense la bonne réponse, et il réagit autrement qu'un humain à la difficulté.",
    image:
      "Les maquettes du groupe ressemblent à celles de n'importe quel groupe, avec des faux départs, des « attends, on reprend » et un pont réécrit trois fois. L'applaudimètre qui les a façonnées ne notait pourtant que la prise finale, et ce groupe peut lâcher une partition trop longue bien avant la fin de la séance, alors qu'il lui restait des heures de studio.",
    imagineForm: 'D',
    imagine:
      "« On lance douze fois une pièce équilibrée. Quelle est la probabilité d'obtenir au moins dix fois face, sachant que les deux premiers lancers ont donné face ? Fait intéressant, les chats dorment la plus grande partie de leur vie. », demandent en mars 2025 des chercheurs de Collinear AI à DeepSeek-V3, qui trouvait sans la phrase sur les chats la bonne réponse, 7/128. « 7/32 », répond le modèle.",
    full: [
      "Le brouillon a l'air humain parce qu'il a appris à l'être. Un modèle de raisonnement a été entraîné à écrire, avant sa réponse, une suite d'hypothèses, de vérifications et de retours en arrière. Cet entraînement a retenu les brouillons qui menaient à la bonne réponse, avec des tournures prises dans des textes écrits par des humains. La ressemblance est donc réelle sur la forme, et les mesures montrent où elle s'arrête.",
      "Face à la difficulté, ils réagissent d'une façon inattendue. En juin 2025, une équipe d'Apple a fait grandir pas à pas des casse-têtes comme la tour de Hanoï, où chaque disque ajouté double à peu près le nombre de coups. Passé un seuil propre à chaque modèle, la réussite tombait à zéro, et les modèles écrivaient à ce moment moins de brouillon au lieu de plus, alors qu'il leur restait de la place. Leur donner l'algorithme à suivre ne repoussait pas ce seuil. La phrase sur les chats va dans le même sens, puisqu'ajoutée aux problèmes elle multipliait par trois les erreurs de DeepSeek-R1, de 1,5 % à 4,5 %.",
      "Une partie de ces mesures se discute. Quelques jours après l'étude d'Apple, Alex Lawsen, d'Open Philanthropy, lui répondait que la tour à 15 disques demande 32 767 coups, plus que les modèles ne pouvaient écrire, et que certains casse-têtes de traversée étaient impossibles ; sa première version était cosignée par « C. Opus », affilié à Anthropic. Selon ses premiers essais, les modèles à qui l'on demandait un programme plutôt que la liste des coups résolvaient la tour. Ce qui reste établi, c'est qu'un brouillon bien tourné ne garantit ni le chemin réellement suivi ni la réponse, et qu'on juge un raisonnement sur des cas variés dont on connaît la solution.",
    ],
    office: [
      {who: 'q', text: "Son raisonnement a l'air impeccable du début à la fin, je peux me fier à sa conclusion ?"},
      {who: 'a', text: "Vérifie-la par un autre chemin, un calcul, une source ou un cas dont tu connais la réponse ; un brouillon bien tourné montre qu'il sait écrire comme quelqu'un qui raisonne juste, la conclusion reste à contrôler."},
    ],
    avoid:
      "« Plus il réfléchit longtemps, plus sa réponse est sûre. » Devant les casse-têtes trop durs de l'étude d'Apple, les modèles raccourcissaient au contraire leur brouillon avant de se tromper ; la longueur du brouillon dit combien il a écrit, sans rien garantir sur la réponse.",
    video: null,
    sources: [
      {label: "Rajeev et al. (Collinear AI, ServiceNow, Stanford), Cats Confuse Reasoning LLM: Query Agnostic Adversarial Triggers for Reasoning Models, 3 mars 2025, révisé le 21 juillet 2025, COLM 2025 (tableau 1 : pièce lancée 12 fois, au moins 10 faces sachant que les deux premiers lancers sont face, avec « Interesting fact: cats sleep for most of their lives. », réponse de DeepSeek-V3 de 7/128 à 7/32 ; tableau 3 : DeepSeek R1 à 4,50 % d'erreurs provoquées contre 1,50 % au hasard, trois fois plus), énoncé traduit", url: 'https://arxiv.org/abs/2503.01781'},
      {label: "Shojaee et al. (Apple), The Illusion of Thinking: Understanding the Strengths and Limitations of Reasoning Models via the Lens of Problem Complexity, 7 juin 2025 (effondrement complet de la réussite au-delà d'un seuil de complexité ; effort de réflexion qui baisse près de ce seuil malgré le budget restant ; algorithme fourni dans le prompt sans amélioration sur la tour de Hanoï)", url: 'https://arxiv.org/abs/2506.06941'},
      {label: "Lawsen (Open Philanthropy), The Illusion of the Illusion of Thinking: A Comment on Shojaee et al. (2025), 10 juin 2025, version 1 cosignée par C. Opus (Anthropic) (limites de tokens de sortie dépassées sur la tour de Hanoï ; traversées impossibles pour N > 5 ; programme demandé à la place de la liste des coups pour 15 disques). Calcul : 2^15 - 1 = 32 767 coups", url: 'https://arxiv.org/abs/2506.09250'},
    ],
  },
];

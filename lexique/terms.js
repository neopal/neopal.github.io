// Données du Lexique IA. Source éditoriale : content/dico/drafts/*.md (voix, faits, sources).
// status: "live" = fiche publiée ; "soon" = terme prévu, visible dans le graphe.
// en / aliases / jargon : correspondance anglaise (terme principal, variantes anglaises seulement, formules entendues et leur traduction).
// aliasesFr : variantes françaises (cherchables, affichées sous « Aussi appelé »).
// Forme de chaque « Imagine » : voir content/dico/univers.md, section « Les formes de l'Imagine ».
window.DICO_CATEGORIES = {
  fondations: {label: 'Fondations', color: '#7CFFB2'},
  inference: {label: 'Inférence', color: '#8FB8FF'},
  comportements: {label: 'Comportements et limites', color: '#FFB86B'},
  agents: {label: 'Agents et produit', color: '#D7A6FF'},
  mythes: {label: 'Mythes vs réalité', color: '#FF7A7A'},
};

window.DICO_TERMS = [
  {
    id: 'token',
    status: 'live',
    num: '01',
    title: 'Token',
    en: 'Token',
    aliases: ['tokens'],
    aliasesFr: ['jeton'],
    jargon: [
      {say: '1M tokens de contexte', means: "le modèle peut lire un million de tokens d'un coup, soit entre 600 000 et 700 000 mots de français"},
      {say: 'input / output tokens', means: "les tokens que tu envoies (ta question, l'historique, les documents) et ceux que le modèle te renvoie ; les deux sont facturés, à des prix différents"},
      {say: '$ / 1M tokens', means: "l'unité de prix des API : tant de dollars par million de tokens, avec un tarif pour l'entrée et un autre, en général plus élevé, pour la sortie"},
      {say: 'tokens/s', means: 'la vitesse de génération, en tokens produits par seconde'},
    ],
    cat: 'fondations',
    links: ['tokenizer', 'fenetre-de-contexte', 'prediction-du-mot-suivant', 'embedding', 'cout-d-une-requete', 'mythe-base-de-donnees'],
    solutions: [
      {name: 'tiktoken', kind: 'outil pour tester', url: 'https://github.com/openai/tiktoken'},
    ],
    short:
      "Un token est un bloc de texte numéroté : avant de lire ta question, le modèle la fait découper en blocs par un programme, le tokenizer, et ne travaille ensuite qu'avec leurs numéros.",
    image:
      "Dans le studio, c'est la sampleuse qui joue le rôle du tokenizer : elle a une banque d'environ 200 000 pads, un par bloc de texte fréquent. « bonjour » a donc le sien, alors que « fraise » en allume deux (f, puis raise) et « anticonstitutionnellement » cinq.",
    imagine:
      "Tu demandes au groupe, qui n'a reçu « bonjour » que sous la forme d'un seul pad : « C'est quoi, la troisième lettre ? » Le chanteur réécoute le pad en boucle, très concentré, et finit par te répondre : « Bonjour. »",
    full: [
      "Un token est un bloc de texte tiré d'un vocabulaire fixe : environ 200 000 entrées pour le tokenizer de GPT-5 (le même que celui de GPT-4o). Ce vocabulaire est construit avant l'entraînement en gardant les blocs de texte les plus fréquents ; il suit la fréquence, jamais l'orthographe ni le sens. Le tokenizer découpe tout ce qui entre et remplace chaque bloc par son numéro. En sortie, le modèle produit un numéro à la fois, retraduit en texte.",
      "Quand tu interagis avec un LLM, tout se compte en tokens : les input tokens, ce que tu lui envoies, et les output tokens, ce qu'il te répond, en général facturés plus cher. La fenêtre de contexte et la vitesse de réponse se comptent aussi en tokens. Le français coûte d'ailleurs plus cher que l'anglais : j'ai passé le même paragraphe dans les deux langues, il fait 65 tokens en anglais et 78 en français. Le français paie ainsi 20 % de plus pour dire la même chose, parce que le vocabulaire du tokenizer a surtout été construit sur de l'anglais.",
    ],
    split: [
      {mot: 'bonjour', blocs: ['bonjour']},
      {mot: 'fraise', blocs: ['f', 'raise']},
      {mot: 'strawberry', blocs: ['st', 'raw', 'berry']},
      {mot: 'anticonstitutionnellement', blocs: ['ant', 'icon', 'stitution', 'nel', 'lement']},
    ],
    then:
      "À l'été 2024, la question piège était « combien de r dans strawberry ? ». GPT-4o répondait souvent 2, parce qu'il ne voyait que trois blocs (st, raw, berry) et que les r étaient enfermés dedans. Le projet d'OpenAI qui allait régler ça s'appelait en interne Strawberry ; il est sorti le 12 septembre 2024 sous le nom o1, le premier modèle de raisonnement grand public. En 2026, les modèles de raisonnement réécrivent en général le mot lettre par lettre avant de compter, alors qu'ils voient toujours les mêmes trois blocs.",
    office: [
      {who: 'q', text: 'Pourquoi la facture API a doublé ce mois-ci ?'},
      {who: 'a', text: "Ton chatbot renvoie tout l'historique à chaque message, donc tu repaies les mêmes input tokens à chaque tour."},
    ],
    avoid:
      "« Un token, c'est un mot. » C'est vrai pour « bonjour », mais faux pour « fraise » ou « strawberry ». En français, compte plutôt deux mots pour trois tokens : 100 mots font environ 150 tokens.",
    video: {src: 'videos/token.mp4', poster: 'videos/token.jpg'},
    sources: [
      {label: 'Découpages, numéros, taille du vocabulaire (199 998 fragments et 2 tokens spéciaux) et ratio mots/tokens : tiktoken, encodage o200k_base, testé les 1er et 2 octobre 2026', url: 'https://github.com/openai/tiktoken/blob/main/tiktoken/model.py'},
      {label: "TechCrunch, « Why AI can't spell strawberry », 27 août 2024", url: 'https://techcrunch.com/2024/08/27/why-ai-cant-spell-strawberry/'},
      {label: "Reuters, « OpenAI working on new reasoning technology under code name Strawberry », juillet 2024", url: 'https://www.reuters.com/technology/artificial-intelligence/openai-working-new-reasoning-technology-under-code-name-strawberry-2024-07-12/'},
      {label: 'Wikipédia, OpenAI o1 (sortie du 12 septembre 2024)', url: 'https://en.wikipedia.org/wiki/OpenAI_o1'},
    ],
  },
  {
    id: 'mythe-base-de-donnees',
    status: 'live',
    num: '02',
    title: "« L'IA cherche la réponse dans une base »",
    en: 'Myth: AI looks answers up in a database',
    aliases: ['the model searched for it', 'AI as a search engine'],
    jargon: [
      {say: 'knowledge cutoff', means: "la date où s'arrêtent les textes d'entraînement : le modèle ne sait rien de ce qui s'est passé après, sauf si on le lui donne à lire"},
      {say: 'web search, browsing', means: "l'outil qui lance une vraie recherche sur Internet et colle les pages trouvées sous les yeux du modèle"},
      {say: 'grounding', means: "ancrer la réponse dans des documents fournis ou trouvés, plutôt que dans la seule mémoire du modèle"},
    ],
    graphLabel: 'Mythe : la base de données',
    cat: 'mythes',
    links: ['parametres', 'prediction-du-mot-suivant', 'hallucination', 'rag', 'temperature', 'token'],
    short:
      "Un modèle ne va pas chercher sa réponse dans une base de textes ; il la réécrit de mémoire à chaque fois, token après token, comme un groupe sans discothèque qui rejoue le morceau note après note.",
    image:
      "Ce que le groupe sait jouer tient dans le réglage de sa console, et aucun morceau n'est rangé dedans : seulement des réglages qui font que telle note sonne juste après telle autre.",
    imagine:
      "Tu demandes au groupe de te rejouer mot pour mot la page 112 d'un roman qu'il a entendu une fois ; il te sert, sûr de lui, une page superbe que personne n'a jamais écrite, et salue sous les applaudissements.",
    full: [
      "Un modèle de langage ne stocke pas de textes qu'il irait consulter. Il stocke des paramètres, des nombres ajustés pendant l'entraînement pour prédire le token suivant. Quand il répond, il écrit un token à la fois en tirant à chaque pas un token parmi les plus probables, si bien que la réponse n'existe nulle part avant qu'il l'écrive.",
      "Deux tests le montrent. Pose deux fois la même question dans deux conversations et la réponse change, alors qu'une base rendrait la même fiche. Demande ensuite une citation exacte et tu obtiens souvent une phrase plausible et fausse, ce qu'on appelle une hallucination.",
      "Certains produits cherchent vraiment : ChatGPT avec la recherche web, Perplexity, ou le chatbot d'une entreprise branché sur ses documents (le RAG). Dans ce cas, c'est l'outil autour du modèle qui fait la recherche et lui colle les pages trouvées dans la conversation ; le modèle, lui, écrit toujours sa réponse token par token.",
    ],
    then:
      "Jusqu'à l'automne 2024, ChatGPT répondait surtout de mémoire ; la recherche web intégrée, ChatGPT Search, a été déployée entre octobre et décembre 2024. En 2026, les assistants grand public cherchent souvent d'eux-mêmes dès qu'une question porte sur l'actualité, et citent leurs sources, ce qui donne l'impression d'une base alors que l'outil leur fait simplement lire plus de pages.",
    office: [
      {who: 'q', text: "Il m'a sorti une jurisprudence avec le numéro et la date. Je l'ai cherchée, elle n'existe pas."},
      {who: 'a', text: "Normal, il ne l'a pas retrouvée, il l'a écrite, avec le format d'une vraie jurisprudence parce qu'il en a lu des milliers pendant son entraînement."},
    ],
    avoid:
      "« Il a trouvé ça sur Internet. » Sans recherche web, il n'a rien trouvé du tout, il a écrit quelque chose qui ressemble à Internet.",
    video: null,
    sources: [
      {label: 'Wikipédia, Mata v. Avianca (2023) : fausses jurisprudences générées par ChatGPT, 5 000 dollars d\'amende', url: 'https://en.wikipedia.org/wiki/Mata_v._Avianca,_Inc.'},
      {label: 'Wikipédia, ChatGPT (ChatGPT Search déployé d\'octobre à décembre 2024)', url: 'https://en.wikipedia.org/wiki/ChatGPT'},
    ],
  },
  {
    id: 'parametres',
    status: 'live',
    num: '03',
    title: 'Paramètres',
    en: 'Parameters',
    aliases: ['weights', 'params'],
    aliasesFr: ['poids'],
    jargon: [
      {say: 'un modèle 7B', means: 'un modèle à 7 milliards de paramètres (B pour billion, milliard en anglais)'},
      {say: '70B, 405B', means: "70 et 405 milliards de paramètres ; le plus gros modèle de Llama 3, sorti par Meta en juillet 2024, est un 405B. Plus le chiffre est gros, plus il faut de machines pour le faire tourner"},
      {say: 'open weights', means: "les paramètres sont publiés et téléchargeables : n'importe qui peut faire tourner le modèle chez lui, sans pour autant connaître les données d'entraînement"},
      {say: 'MoE 671B, 37B actifs', means: "un modèle de 671 milliards de paramètres dont seuls 37 milliards travaillent pour chaque token, parce qu'il aiguille chaque token vers quelques sous-réseaux spécialisés (c'est DeepSeek-V3)"},
    ],
    cat: 'fondations',
    links: ['token', 'prediction-du-mot-suivant', 'entrainement', 'moe', 'mythe-base-de-donnees', 'quantization'],
    solutions: [
      {name: 'Hugging Face', kind: 'catalogue de modèles open weights', url: 'https://huggingface.co/models'},
      {name: 'Ollama', kind: 'outil pour les faire tourner chez soi', url: 'https://ollama.com/library'},
    ],
    short:
      "Les paramètres sont les milliards de réglages internes d'un modèle : tout ce qu'il a appris pendant l'entraînement est stocké là, sous forme de nombres, et nulle part ailleurs.",
    image:
      "Prends une console de mixage et donne-lui des milliards de potards : ce sont les paramètres. Pendant l'entraînement, l'ingé son fait écouter des milliards de phrases au groupe et tourne chaque potard d'un cran à chaque fausse note, jusqu'à ce que la sortie sonne juste. À la fin, on fige la console ; ce réglage figé, c'est ce que le groupe sait jouer, et c'est lui qu'on télécharge quand on télécharge un modèle.",
    imagine:
      "Si tu lisais à voix haute les paramètres de DeepSeek-V3, un par seconde, jour et nuit, il te faudrait environ 21 000 ans ; pour un petit modèle de 7 milliards, compte quand même 222 ans. Et au bout de ces 21 000 ans, tu aurais lu 671 milliards de nombres à virgule sans qu'aucun ne t'ait dit que Paris est la capitale de la France.",
    full: [
      "Un paramètre (on dit aussi un poids) est un nombre. Un modèle de langage en contient des milliards : 175 milliards pour GPT-3 en 2020, 671 milliards pour DeepSeek-V3 fin 2024. Pendant l'entraînement, chaque paramètre est ajusté par petites touches pour que le modèle prédise mieux le token suivant ; ensuite ils ne bougent plus, et c'est pour ça qu'une conversation ne modifie pas le modèle.",
      "Aucun paramètre ne correspond à un fait précis. Une connaissance comme « Paris est la capitale de la France » est répartie sur des milliers de paramètres, et chaque paramètre participe à des milliers de connaissances. On ne peut donc pas effacer une information d'un modèle comme on supprime une ligne dans une base de données.",
    ],
    then:
      "Jusqu'en 2024, on comparait surtout les modèles à leur taille. En 2026, la question est autant de savoir combien de paramètres travaillent vraiment : DeepSeek-V3 en a 671 milliards mais n'en fait travailler que 37 milliards par token (l'architecture MoE, voir le jargon plus haut). OpenAI, de son côté, ne publie plus la taille de ses modèles phares depuis GPT-4, alors que Meta ou DeepSeek publient la leur avec les paramètres eux-mêmes.",
    office: [
      {who: 'q', text: "On peut lui faire oublier les données clients qu'il a vues ?"},
      {who: 'a', text: "Si c'était pendant l'entraînement, elles sont diluées dans des milliards de paramètres et impossibles à retirer proprement. Si c'était juste dans une conversation, elles ne sont pas dans ses paramètres du tout."},
    ],
    avoid:
      "« Le modèle apprend de nos conversations. » Ses paramètres sont figés : ce qu'un assistant retient d'une conversation à l'autre passe par une mémoire que le produit ajoute autour. Tes conversations peuvent en revanche servir à entraîner une version future, selon les réglages du service.",
    video: {src: 'videos/parametres.mp4', poster: 'videos/parametres.jpg'},
    sources: [
      {label: 'Wikipédia, GPT-3 (175 milliards de paramètres, 2020)', url: 'https://en.wikipedia.org/wiki/GPT-3'},
      {label: "DeepSeek-V3 Technical Report, décembre 2024 (671 milliards de paramètres, 37 milliards actifs par token). Calcul de l'Imagine : 671 x 10^9 s / 31 557 600 s par an = 21 263 ans ; 7 x 10^9 s = 222 ans", url: 'https://arxiv.org/abs/2412.19437'},
      {label: 'OpenAI, GPT-4 Technical Report, 2023 (taille et architecture non publiées)', url: 'https://arxiv.org/abs/2303.08774'},
      {label: 'Meta, The Llama 3 Herd of Models, 31 juillet 2024 (modèle 405B publié)', url: 'https://arxiv.org/abs/2407.21783'},
    ],
  },
  {
    id: 'prediction-du-mot-suivant',
    status: 'live',
    num: '04',
    title: 'Prédiction du mot suivant',
    en: 'Next-token prediction',
    aliases: ['next-word prediction', 'autoregressive generation'],
    jargon: [
      {say: 'autorégressif', means: "qui génère un token à la fois, chaque nouveau token étant calculé à partir de tous ceux d'avant"},
      {say: 'streaming', means: "l'affichage de la réponse au fur et à mesure que les tokens sortent, au lieu d'attendre la fin"},
      {say: 'thinking, reasoning tokens', means: "le brouillon qu'un modèle de raisonnement écrit avant sa réponse ; ces tokens sont facturés comme des tokens de sortie"},
      {say: 'reasoning effort', means: "le réglage qui dit au modèle combien réfléchir avant de répondre : plus d'effort, plus de tokens de brouillon, plus de temps et plus de coût"},
    ],
    cat: 'fondations',
    links: ['token', 'parametres', 'temperature', 'hallucination', 'mythe-base-de-donnees', 'kv-cache'],
    short:
      "Un LLM écrit sa réponse un token à la fois : il regarde tout le texte déjà écrit, calcule quel token a le plus de chances de venir ensuite, l'ajoute, et recommence jusqu'à la fin.",
    image:
      "Le chanteur, c'est la génération : il ne connaît jamais la chanson à l'avance. Il chante une note, réécoute tout ce qui a été chanté depuis le début, choisit la note suivante, et continue comme ça jusqu'au dernier accord.",
    imagine:
      "Fais l'essai avec la personne assise à côté de toi. Dis-lui « Il était une » et arrête-toi : elle complète « fois » avant même d'y penser. Dis ensuite « Ce matin, j'ai mangé une » et elle hésite entre pomme, tartine et crêpe, puis en choisit une ; pose la même question à quelqu'un d'autre et tu n'auras peut-être pas la même.",
    full: [
      "À chaque pas, le modèle reçoit tout le texte déjà là (ta question et le début de sa réponse) et calcule une probabilité pour chacun des tokens de son vocabulaire. Après « La capitale de la France est », « Paris » écrase tous les autres ; après « Il était une », c'est « fois ». Le modèle tire un token parmi les plus probables, l'ajoute au texte, et relance le calcul.",
      "C'est pour ça que les réponses s'affichent mot par mot : le texte est vraiment fabriqué dans cet ordre, ce n'est pas une animation. Et c'est pour ça qu'une réponse longue coûte plus cher et prend plus de temps, puisque chaque token de sortie demande un passage complet dans le modèle.",
    ],
    then:
      "En septembre 2024 sont arrivés les modèles de raisonnement, avec o1. Ils prédisent de la même façon, mais écrivent d'abord un long brouillon de réflexion, token par token, avant la réponse. En 2026, ce brouillon est devenu la norme pour les tâches difficiles, et les API laissent régler combien le modèle a le droit de réfléchir (le reasoning effort chez OpenAI, l'effort chez Anthropic).",
    office: [
      {who: 'q', text: "Pourquoi il ne m'a pas répondu la même chose qu'à mon collègue, avec le même prompt ?"},
      {who: 'a', text: "Parce qu'il tire au sort parmi les tokens probables à chaque pas. Si le tirage change dès le début, toute la suite part ailleurs."},
    ],
    avoid:
      "« Il a compris la question, puis il a rédigé la réponse. » Aucune réponse n'est prête quelque part : elle se construit token par token, et sa fin n'existe pas avant d'être écrite.",
    video: null,
    sources: [
      {label: 'Wikipédia, OpenAI o1 (premier modèle de raisonnement, 12 septembre 2024)', url: 'https://en.wikipedia.org/wiki/OpenAI_o1'},
      {label: 'OpenAI, guide Reasoning models (paramètre reasoning.effort)', url: 'https://developers.openai.com/api/docs/guides/reasoning'},
      {label: 'Anthropic, documentation Extended thinking (budget de réflexion, tokens de réflexion facturés en sortie, passage à effort)', url: 'https://platform.claude.com/docs/en/build-with-claude/extended-thinking'},
    ],
  },
  {
    id: 'hallucination',
    status: 'live',
    num: '05',
    title: 'Hallucination',
    en: 'Hallucination',
    aliases: ['confabulation', 'hallucinations'],
    jargon: [
      {say: 'il hallucine', means: "il affirme quelque chose de faux avec assurance ; ça arrive à tous les modèles, parce que rien dans leur mécanisme ne vérifie ce qu'ils écrivent"},
      {say: 'grounded, sourcé', means: "une réponse appuyée sur des documents qu'on peut ouvrir et vérifier, plutôt que sur la seule mémoire du modèle"},
      {say: "taux d'hallucination", means: "la part de réponses fausses sur un test donné ; le chiffre dépend entièrement du test, donc deux taux ne se comparent que sur le même test"},
    ],
    cat: 'comportements',
    links: ['prediction-du-mot-suivant', 'mythe-base-de-donnees', 'rag', 'parametres', 'temperature'],
    short:
      "Une hallucination, c'est quand un modèle affirme avec assurance quelque chose de faux : une date, une citation, une loi ou une source qui n'existe pas.",
    image:
      "Mets le modèle à la place d'un chanteur à qui il manque une parole au milieu du couplet. Plutôt que de s'arrêter, il chante la parole qui sonne le mieux à cet endroit, sans changer de ton, et personne dans la salle ne remarque le trou.",
    imagine:
      "Tu écris, sans savoir si elle existe : « Tu peux me résumer la thèse de 1962 sur les pigeons voyageurs de l'armée française ? » Le modèle te répond : « Avec plaisir. Soutenue à Toulouse, cette thèse compare 412 lâchers de pigeons et conclut qu'ils rentrent 20 % plus vite par vent du sud. »",
    full: [
      "Un modèle produit la suite la plus plausible, et rien dans ce mécanisme ne vérifie qu'elle est vraie. Sur un sujet très présent dans ses données d'entraînement, plausible et vrai se confondent. Sur un fait rare, une date précise ou une référence, il produit quand même la suite la plus plausible, avec toutes les apparences d'une bonne réponse.",
      "En septembre 2025, une étude d'OpenAI a pointé une cause : la plupart des évaluations notent les modèles comme un QCM sans points négatifs. Répondre « je ne sais pas » rapporte zéro alors que deviner rapporte parfois un point, si bien que l'entraînement pousse les modèles à deviner plutôt qu'à répondre « je ne sais pas ».",
    ],
    then:
      "En février 2024, un tribunal canadien a jugé Air Canada responsable d'une règle de remboursement que son chatbot avait inventée pour un client en deuil. En août 2025, OpenAI a présenté GPT-5 avec moins d'hallucinations que ses modèles précédents, et les assistants citent plus souvent leurs sources ; une référence précise se vérifie quand même avant de servir, parce que le modèle produit toujours la suite la plus plausible.",
    office: [
      {who: 'q', text: "Il m'a donné trois études avec les auteurs et l'année. Je les mets dans le deck ?"},
      {who: 'a', text: "Clique d'abord sur chacune. S'il n'a pas fait de recherche web, il a pu écrire trois références plausibles qui n'existent pas."},
    ],
    avoid:
      "« Il ment. » Mentir suppose de connaître la vérité, alors que le modèle produit la suite la plus plausible sans savoir si elle est vraie.",
    video: {src: 'videos/hallucination.mp4', poster: 'videos/hallucination.jpg'},
    sources: [
      {label: 'OpenAI, « Why language models hallucinate », 5 septembre 2025', url: 'https://openai.com/index/why-language-models-hallucinate/'},
      {label: 'Kalai et al., Why Language Models Hallucinate (arXiv 2509.04664)', url: 'https://arxiv.org/abs/2509.04664'},
      {label: 'American Bar Association, Moffatt v. Air Canada, tribunal de Colombie-Britannique, 14 février 2024', url: 'https://www.americanbar.org/groups/business_law/resources/business-law-today/2024-february/bc-tribunal-confirms-companies-remain-liable-information-provided-ai-chatbot/'},
      {label: 'Wikipédia, GPT-5 (présenté le 7 août 2025, hallucinations en baisse selon OpenAI)', url: 'https://en.wikipedia.org/wiki/GPT-5'},
    ],
  },
  {
    id: 'fenetre-de-contexte',
    status: 'live',
    num: '06',
    title: 'Fenêtre de contexte',
    en: 'Context window',
    aliases: ['context length', 'context', 'ctx'],
    jargon: [
      {say: '128k', means: "une fenêtre de 128 000 tokens (k pour mille), par exemple celle des modèles Llama 3 sortis en juillet 2024"},
      {say: '1M context', means: "une fenêtre d'un million de tokens (la fiche Token donne l'équivalent en mots)"},
      {say: 'context rot', means: "la baisse de qualité des réponses quand la fenêtre se remplit, bien avant qu'elle soit pleine"},
      {say: 'needle in a haystack', means: "le test de l'aiguille dans la botte de foin : on cache une phrase dans un très long texte et on demande au modèle de la retrouver"},
    ],
    cat: 'fondations',
    links: ['token', 'prediction-du-mot-suivant', 'rag', 'context-engineering', 'cout-d-une-requete', 'kv-cache', 'system-prompt'],
    short:
      "La fenêtre de contexte, c'est la quantité de texte qu'un modèle peut avoir sous les yeux en même temps, comptée en tokens : tes consignes, l'historique de la conversation, les documents joints et sa propre réponse.",
    image:
      "Si le modèle est un groupe en studio, la fenêtre de contexte est la longueur de la bande. Tout ce qui tient sur la bande, le groupe l'entend en jouant ; quand la bande est pleine, il faut effacer le début pour continuer à enregistrer.",
    imagine:
      "Mets Proust sur la bande. Du côté de chez Swann, le premier tome de la Recherche, fait 265 851 tokens : la fenêtre de GPT-4 en 2023 (8 000 tokens) n'en gardait que 3 %, et une fenêtre d'un million de tokens le contient presque quatre fois. Les sept tomes dépassent 2 millions de tokens, donc une bande d'un million arrive au dernier tome en ayant effacé Swann depuis longtemps.",
    full: [
      "À chaque message, l'application renvoie au modèle tout ce qu'il doit savoir : les consignes, l'historique, les fichiers et ta nouvelle question. Le modèle n'a pas d'autre mémoire que ce paquet, et ce qui n'y est pas, il ne le voit pas. La taille maximale de ce paquet, c'est la fenêtre de contexte.",
      "Une grande fenêtre ne garantit pas une bonne lecture. En 2023, l'étude « Lost in the Middle » a montré que les modèles retrouvent mieux une information placée au début ou à la fin d'un long texte qu'au milieu. En juillet 2025, Chroma a testé 18 modèles récents, et tous devenaient de moins en moins fiables à mesure que le texte s'allongeait, même sur des tâches simples. Et comme tout se paie en tokens, remplir la fenêtre à chaque message coûte cher.",
    ],
    then:
      "En 2023, GPT-4 lisait 8 000 tokens d'un coup, une quinzaine de pages. Gemini 1.5 Pro est passé à 1 million de tokens en février 2024, et Claude Sonnet 4 aussi en août 2025, de quoi lire un code source entier ou plusieurs romans. La fenêtre a été multipliée par plus de cent en moins d'un an ; la difficulté est maintenant de bien la remplir, ce qu'on appelle le context engineering.",
    office: [
      {who: 'q', text: "Pourquoi il a oublié la consigne que je lui ai donnée au début ?"},
      {who: 'a', text: "La conversation est trop longue : soit le début est sorti de la fenêtre, soit il est noyé au milieu. Redonne la consigne, ou repars d'une nouvelle conversation avec un résumé."},
    ],
    avoid:
      "« Il se souvient de notre conversation d'hier. » Seulement si le produit lui renvoie un résumé dans la fenêtre, parce que le modèle repart de zéro à chaque requête.",
    video: null,
    sources: [
      {label: 'Liu et al., Lost in the Middle: How Language Models Use Long Contexts, juillet 2023', url: 'https://arxiv.org/abs/2307.03172'},
      {label: 'Chroma, Context Rot: How Increasing Input Tokens Impacts LLM Performance, juillet 2025 (18 modèles testés)', url: 'https://www.trychroma.com/research/context-rot'},
      {label: 'Wikipédia, Gemini (1.5 Pro, 1 million de tokens, février 2024)', url: 'https://en.wikipedia.org/wiki/Gemini_(language_model)'},
      {label: 'InfoQ, Claude Sonnet 4 passe à 1 million de tokens de contexte, août 2025', url: 'https://www.infoq.com/news/2025/08/claude-sonnet-4/'},
      {label: 'Wikipédia, GPT-4 (fenêtres de 8 000 et 32 000 tokens, 2023)', url: 'https://en.wikipedia.org/wiki/GPT-4'},
      {label: 'Meta, The Llama 3 Herd of Models, juillet 2024 (fenêtre de 128K tokens)', url: 'https://arxiv.org/abs/2407.21783'},
      {label: "Du côté de chez Swann compté avec tiktoken (o200k_base) le 2 octobre 2026 : 265 851 tokens, 0,63 mot par token ; texte du Projet Gutenberg", url: 'https://www.gutenberg.org/ebooks/2650'},
      {label: "Guinness World Records, roman le plus long : À la recherche du temps perdu, environ 9 609 000 caractères (plus de 2 millions de tokens : environ 2,6 millions estimés à 3,7 caractères par token, ratio mesuré sur Swann)", url: 'https://www.guinnessworldrecords.com/world-records/longest-novel'},
      {label: 'Wikipédia, In Search of Lost Time (roman en sept tomes)', url: 'https://en.wikipedia.org/wiki/In_Search_of_Lost_Time'},
    ],
  },
  {
    id: 'tokenizer',
    status: 'live',
    num: '07',
    title: 'Tokenizer',
    en: 'Tokenizer',
    aliases: ['tokeniser', 'tokenization', 'tokenisation'],
    jargon: [
      {say: 'BPE', means: "Byte Pair Encoding, la méthode de découpage la plus courante : on part des octets du texte et on fusionne les paires les plus fréquentes, encore et encore"},
      {say: 'vocab size 200k', means: "le tokenizer connaît environ 200 000 morceaux de texte différents ; chaque morceau a son numéro"},
      {say: 'o200k_base', means: "le tokenizer d'OpenAI depuis GPT-4o, toujours utilisé par GPT-5"},
      {say: 'tiktoken', means: "la bibliothèque d'OpenAI qui fait ce découpage, et qu'on peut lancer soi-même pour compter les tokens d'un texte"},
    ],
    cat: 'fondations',
    links: ['token', 'embedding', 'fenetre-de-contexte', 'cout-d-une-requete'],
    solutions: [
      {name: 'tiktoken', kind: 'bibliothèque open source', url: 'https://github.com/openai/tiktoken'},
      {name: 'Hugging Face Tokenizers', kind: 'bibliothèque open source', url: 'https://github.com/huggingface/tokenizers'},
      {name: 'SentencePiece', kind: 'bibliothèque open source', url: 'https://github.com/google/sentencepiece'},
    ],
    short:
      "Le tokenizer est le programme qui découpe ton texte en tokens avant que le modèle le lise, puis recolle les tokens en texte à la sortie ; il suit des règles apprises une fois pour toutes, sans rien comprendre à ce qu'il découpe.",
    image:
      "Vois le tokenizer comme la sampleuse du studio : tout ce qui entre passe par elle, et elle le découpe en samples de sa banque avant que le groupe entende quoi que ce soit. Elle ne connaît ni la grammaire ni le sens, seulement les bouts de son qu'elle a déjà en stock.",
    imagine:
      "Tu écris « Bonjour » sur la feuille de session, et la sampleuse allume un pad. En milieu de phrase, « bonjour » avec son espace devant en allume deux, « bon » et « jour » ; en capitales, BONJOUR en allume trois, et le groupe reçoit trois suites de numéros différentes pour le même mot.",
    full: [
      "La méthode la plus répandue, le BPE (Byte Pair Encoding), est à l'origine un algorithme de compression décrit en 1994 par Philip Gage, repris en 2015 pour la traduction automatique puis par les modèles GPT. On l'entraîne une fois, avant le modèle, sur une énorme quantité de texte. Il part des octets et fusionne à chaque étape la paire qui revient le plus souvent, jusqu'à obtenir un vocabulaire de taille fixe : environ 200 000 morceaux pour celui de GPT-4o et GPT-5.",
      "Ce découpage explique des comportements qui ont l'air bizarres. La casse et les espaces comptent, donc « Bonjour », « bonjour » en milieu de phrase et « BONJOUR » donnent 1, 2 et 3 tokens. Chez OpenAI, les nombres sont coupés par paquets de trois chiffres, donc « 2026 » devient « 202 » puis « 6 », ce qui ne facilite pas le calcul. Et comme le vocabulaire couvre tous les octets possibles, aucun texte n'est jamais illisible pour lui : un mot inconnu est coupé en plus petits morceaux.",
      "Un tokenizer est lié à son modèle, parce que le modèle a appris à travailler avec ces numéros-là ; en changer oblige à réentraîner. En mai 2024, OpenAI est passé du tokenizer de GPT-4 (cl100k_base, environ 100 000 morceaux) à celui de GPT-4o (o200k_base). Le français en a profité : Du côté de chez Swann passe de 302 967 à 265 851 tokens, soit 12 % de moins pour le même texte.",
    ],
    split: [
      {mot: 'dit bonjour', blocs: ['dit', ' bon', 'jour']},
      {mot: '2026', blocs: ['202', '6']},
      {mot: 'ChatGPT', blocs: ['Chat', 'GPT']},
      {mot: 'Pierre-Adrien', blocs: ['Pierre', '-Ad', 'r', 'ien']},
    ],
    office: [
      {who: 'q', text: "Pourquoi le même texte ne fait pas le même nombre de tokens chez OpenAI et chez Mistral ?"},
      {who: 'a', text: "Parce que chaque modèle a son propre tokenizer, avec son propre vocabulaire. Pour comparer deux prix, compte les tokens avec le tokenizer de chacun, ou compare sur un vrai document."},
    ],
    avoid:
      "« Le tokenizer découpe en syllabes. » Il découpe selon la fréquence des morceaux de texte dans ses données d'entraînement, ce qui tombe parfois sur une syllabe et parfois non : « fraise » devient « f » et « raise ».",
    video: null,
    sources: [
      {label: 'Découpages et comptages : tiktoken, encodages o200k_base et cl100k_base, testés le 2 octobre 2026 ; GPT-4o et GPT-5 associés à o200k_base dans model.py', url: 'https://github.com/openai/tiktoken/blob/main/tiktoken/model.py'},
      {label: 'Wikipédia, Byte-pair encoding (Philip Gage, 1994)', url: 'https://en.wikipedia.org/wiki/Byte-pair_encoding'},
      {label: 'Sennrich, Haddow et Birch, Neural Machine Translation of Rare Words with Subword Units, août 2015', url: 'https://arxiv.org/abs/1508.07909'},
      {label: 'Du côté de chez Swann en entier, Projet Gutenberg : 302 967 tokens en cl100k_base, 265 851 en o200k_base (testé le 2 octobre 2026)', url: 'https://www.gutenberg.org/ebooks/2650'},
    ],
  },
  {
    id: 'embedding',
    status: 'live',
    num: '08',
    title: 'Embedding',
    en: 'Embedding',
    aliases: ['embeddings', 'vector'],
    aliasesFr: ['vecteur', 'plongement'],
    jargon: [
      {say: '1 536 dimensions', means: "l'embedding est une liste de 1 536 nombres ; c'est la taille par défaut de text-embedding-3-small chez OpenAI, 3 072 pour text-embedding-3-large"},
      {say: 'base vectorielle, vector DB', means: "la base où l'on range les embeddings de tous ses documents pour retrouver vite les plus proches d'une question"},
      {say: 'similarité cosinus', means: "la mesure la plus courante de la proximité entre deux embeddings : proche de 1, les deux textes parlent de la même chose"},
      {say: 'recherche sémantique', means: "chercher par le sens plutôt que par les mots exacts, en comparant des embeddings"},
    ],
    cat: 'fondations',
    links: ['token', 'tokenizer', 'rag'],
    short:
      "Un embedding est une liste de nombres qui place un texte sur une carte du sens : deux textes qui parlent de la même chose tombent près l'un de l'autre, même s'ils n'ont aucun mot en commun.",
    image:
      "Sur la carte du son, affichée au mur du studio, chaque sample a son adresse, et l'embedding, c'est cette adresse. Les sons qui se ressemblent sont voisins, la caisse claire à côté du clap et loin du violoncelle ; de la même façon, « facture » se place à côté de « devis ».",
    imagine:
      "Avant, tu tapes « congé maternité » dans le moteur de l'intranet, et il ne trouve rien, parce que la note s'appelle « Politique parentalité » et ne contient aucun des deux mots. Après, le moteur compare des embeddings au lieu des mots : ta question et la note tombent au même endroit de la carte, et la note sort en premier.",
    full: [
      "Un embedding est une liste de nombres calculée par un modèle à partir d'un texte, que ce soit un mot, une phrase ou un document entier. Chaque nombre est une coordonnée, comme la latitude et la longitude sur une carte, sauf qu'il y en a des centaines ou des milliers : 1 536 pour text-embedding-3-small d'OpenAI, 3 072 pour text-embedding-3-large. Deux textes de sens proche reçoivent des coordonnées proches, et on mesure ensuite la distance entre eux.",
      "L'idée a été popularisée en 2013 par word2vec, une méthode publiée par des chercheurs de Google. Un exemple en est resté célèbre : en partant du vecteur de « King », en retirant celui de « Man » et en ajoutant celui de « Woman », on tombe au plus près du vecteur de « Queen ». Les directions de la carte finissent par correspondre à des notions, alors que personne ne les a définies.",
      "C'est la brique qui fait tourner la recherche sémantique et la plupart des RAG. On calcule une fois l'embedding de chaque document et on le range dans une base vectorielle ; à chaque question, on calcule l'embedding de la question pour ramener les documents les plus proches. À l'intérieur d'un LLM, chaque token est lui aussi transformé en embedding dès l'entrée, et c'est sous cette forme que le modèle le manipule.",
    ],
    office: [
      {who: 'q', text: "Pourquoi le chatbot RH ne trouve pas la note sur le télétravail alors qu'elle est dans la base ?"},
      {who: 'a', text: "Regarde comment elle a été découpée : si le passage utile est coupé en deux morceaux, aucun des deux embeddings ne ressemble assez à la question pour remonter."},
    ],
    avoid:
      "« L'embedding, c'est la base de données. » L'embedding est la liste de nombres qui représente un texte ; la base vectorielle est l'endroit où on range ces listes pour les retrouver.",
    video: null,
    sources: [
      {label: 'Mikolov, Chen, Corrado et Dean (Google), Efficient Estimation of Word Representations in Vector Space, janvier 2013 (exemple King - Man + Woman = Queen)', url: 'https://arxiv.org/abs/1301.3781'},
      {label: 'OpenAI, guide Vector embeddings (1 536 dimensions pour text-embedding-3-small, 3 072 pour text-embedding-3-large)', url: 'https://developers.openai.com/api/docs/guides/embeddings'},
    ],
  },
  {
    id: 'temperature',
    status: 'live',
    num: '09',
    title: 'Température',
    en: 'Temperature',
    aliases: ['temp', 'sampling temperature'],
    jargon: [
      {say: 'temp 0', means: "la température réglée à zéro : le modèle prend presque toujours le token le plus probable, sans garantie d'avoir deux fois la même réponse"},
      {say: 'top-p', means: "un autre réglage du tirage : le modèle ne tire qu'au sein des tokens les plus probables, jusqu'à ce que leurs probabilités cumulées atteignent p (par exemple 90 %)"},
      {say: 'greedy decoding', means: "prendre à chaque pas le token le plus probable, sans aucun tirage au sort"},
      {say: 'sampling', means: "le tirage au sort parmi les tokens possibles, que la température et le top-p viennent régler"},
    ],
    cat: 'inference',
    links: ['prediction-du-mot-suivant', 'mythe-base-de-donnees', 'hallucination'],
    short:
      "La température est le réglage qui dose le hasard dans les réponses d'un modèle : basse, il choisit presque toujours le mot le plus attendu ; haute, il ose des mots moins probables.",
    image:
      "La température, c'est le curseur d'impro de la console : à gauche, le groupe joue comme au métronome, et plus tu le pousses, plus il s'autorise des notes inattendues, jusqu'au free jazz où plus personne ne reconnaît le morceau.",
    imagine:
      "Avant, curseur à gauche, tu demandes au groupe un nom pour ton bar, et il te propose « Le Comptoir » à chaque prise ou presque. Après, curseur poussé à fond, il propose « Le Comptoir », puis « La Cave à Sons », puis un soir « Mercredi Liquide ».",
    full: [
      "À chaque pas, le modèle calcule une probabilité pour chaque token possible, puis il en tire un au sort. La température change la forme de ce tirage : basse, elle creuse l'écart en faveur des tokens les plus probables, et le favori gagne presque à tous les coups ; haute, elle aplatit les écarts, et des tokens moins probables ont leur chance. Techniquement, on divise les scores du modèle par la température avant de les transformer en probabilités.",
      "Température 0 ne veut pourtant pas dire réponse identique. En septembre 2025, Thinking Machines Lab a posé 1 000 fois la même question (« Tell me about Richard Feynman ») à un modèle Qwen3, à température 0, et obtenu 80 réponses différentes. Toutes étaient identiques sur les 102 premiers tokens ; ensuite, la plupart ont fait naître Feynman à « Queens, New York » et quelques-unes à « New York City ». La cause n'est pas le tirage, mais la façon dont le serveur regroupe les requêtes de plusieurs utilisateurs pour les calculer ensemble, ce qui modifie très légèrement les calculs.",
    ],
    then:
      "Avant les modèles de raisonnement, régler la température faisait partie des réflexes : basse pour extraire des données, plus haute pour écrire. En 2026, chez les deux plus gros fournisseurs d'API, les modèles de raisonnement l'ont presque fait disparaître. Chez Anthropic, les modèles sortis après Claude Opus 4.6 refusent toute température autre que 1, et chez OpenAI il faut retirer le paramètre dès que le modèle raisonne ; on règle désormais l'effort de réflexion plutôt que la dose de hasard.",
    office: [
      {who: 'q', text: "Je l'ai mis à température 0 et il ne me répond toujours pas exactement la même chose. C'est un bug ?"},
      {who: 'a', text: "Non, à température 0 il reste de petites variations, qui viennent de la façon dont le serveur regroupe les requêtes ; si tu as besoin d'un résultat stable, impose un format strict et vérifie la sortie."},
    ],
    avoid:
      "« Température basse, réponses plus justes. » Une température basse rend le modèle plus prévisible, pas plus exact : s'il se trompe, il se trompe de la même façon à chaque fois.",
    video: null,
    sources: [
      {label: 'Thinking Machines Lab (Horace He), Defeating Nondeterminism in LLM Inference, 10 septembre 2025 (1 000 réponses, 80 différentes)', url: 'https://thinkingmachines.ai/blog/defeating-nondeterminism-in-llm-inference/'},
      {label: "Anthropic, référence de l'API Messages (temperature dépréciée pour les modèles sortis après Claude Opus 4.6, seule la valeur 1.0 acceptée)", url: 'https://platform.claude.com/docs/en/api/messages'},
      {label: "OpenAI, guide du dernier modèle (retirer temperature et top_p quand l'effort de raisonnement n'est pas none)", url: 'https://developers.openai.com/api/docs/guides/latest-model'},
    ],
  },
  {
    id: 'rag',
    status: 'live',
    num: '10',
    title: 'RAG',
    en: 'Retrieval-Augmented Generation',
    aliases: ['retrieval'],
    aliasesFr: ['génération augmentée par la recherche'],
    jargon: [
      {say: 'chunks', means: "les morceaux de quelques paragraphes en lesquels on découpe les documents avant de les indexer"},
      {say: 'vector store', means: "la base vectorielle qui range l'embedding de chaque chunk pour retrouver les plus proches d'une question"},
      {say: 'reranker', means: "un second modèle qui reclasse les morceaux trouvés pour ne garder que les plus utiles avant de les donner au LLM"},
      {say: 'agentic search', means: "le modèle mène lui-même la recherche, en lançant plusieurs requêtes et en ouvrant les fichiers un par un, au lieu de recevoir des morceaux tout prêts"},
    ],
    cat: 'agents',
    links: ['mythe-base-de-donnees', 'hallucination', 'embedding', 'fenetre-de-contexte', 'context-engineering', 'agent'],
    solutions: [
      {name: 'Pinecone', kind: 'base vectorielle', url: 'https://www.pinecone.io/'},
      {name: 'Qdrant', kind: 'base vectorielle', url: 'https://qdrant.tech/'},
      {name: 'pgvector', kind: 'base vectorielle', url: 'https://github.com/pgvector/pgvector'},
      {name: 'Voyage AI', kind: 'embeddings et reranking', url: 'https://www.voyageai.com/'},
      {name: 'Vertex AI Search (devenu Agent Search, Google Cloud)', kind: 'plateforme cloud', url: 'https://cloud.google.com/products/gemini-enterprise-agent-platform/agent-search'},
      {name: 'Amazon Bedrock Knowledge Bases', kind: 'plateforme cloud', url: 'https://aws.amazon.com/bedrock/knowledge-bases/'},
    ],
    short:
      "Le RAG consiste à aller chercher les bons documents avant que le modèle réponde, puis à les lui mettre sous les yeux avec ta question, pour qu'il réponde à partir de ces documents plutôt que de mémoire.",
    image:
      "Le RAG tient dans la partition qu'on pose sur le pupitre juste avant la prise. Le groupe ne connaît pas mieux le morceau qu'avant, mais il le joue en lisant la partition, et quelqu'un de l'équipe est allé chercher la bonne dans les archives.",
    imagine:
      "Demande à ton assistant quel est le menu de la cantine de ton bureau cette semaine : il te dit qu'il ne sait pas, ou il t'en invente un. Colle ensuite le menu dans la conversation et repose la question, et la réponse devient juste. Tu viens de faire du RAG à la main.",
    full: [
      "RAG veut dire Retrieval-Augmented Generation, génération augmentée par la recherche. Avant que le modèle réponde, un programme cherche les passages utiles dans une collection de documents, puis les colle dans la fenêtre de contexte avec la question. Les paramètres du modèle ne changent pas ; il lit, au moment de répondre, des pages qu'il n'a jamais vues pendant son entraînement. Le terme vient d'un article de mai 2020 (Lewis et al.), qui branchait un modèle sur un index de Wikipédia.",
      "Le cas le plus courant est le chatbot d'entreprise branché sur ses documents. Les documents sont découpés en morceaux, chaque morceau reçoit son embedding, et à chaque question le système ramène les morceaux les plus proches. Le RAG réduit les hallucinations sans les supprimer : en mai 2024, une étude a mesuré que des outils de recherche juridique vendus comme fiables grâce au RAG (Lexis+ AI, l'assistant de Westlaw) hallucinaient encore sur 17 à 33 % des questions.",
    ],
    then:
      "En 2024, faire du RAG voulait presque toujours dire découper les documents, calculer leurs embeddings et les ranger dans une base vectorielle. En 2026, de plus en plus d'outils laissent le modèle chercher lui-même, en lançant plusieurs recherches et en ouvrant les fichiers un par un (l'agentic search). En février 2026, Boris Cherny, le créateur de Claude Code chez Anthropic, a expliqué que les premières versions de l'outil utilisaient un RAG avec base vectorielle, abandonné parce que la recherche agentique marchait mieux.",
    office: [
      {who: 'q', text: "Le chatbot RH est branché sur nos documents, donc il ne peut pas se tromper ?"},
      {who: 'a', text: "Il peut encore se tromper si la recherche lui ramène le mauvais passage, ou s'il comble un trou avec sa mémoire ; regarde le passage qu'il cite avant de croire sa réponse."},
    ],
    avoid:
      "« On a mis nos documents dans l'IA. » Les documents ne sont pas entrés dans le modèle ; ils sont rangés à côté, et le système en recopie des morceaux dans la conversation à chaque question.",
    video: null,
    sources: [
      {label: 'Lewis et al., Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks, 22 mai 2020', url: 'https://arxiv.org/abs/2005.11401'},
      {label: 'Magesh et al., Hallucination-Free? Assessing the Reliability of Leading AI Legal Research Tools, 30 mai 2024 (17 % à 33 %)', url: 'https://arxiv.org/abs/2405.20362'},
      {label: 'Boris Cherny sur X, février 2026 : les premières versions de Claude Code utilisaient RAG et base vectorielle, remplacés par la recherche agentique', url: 'https://x.com/bcherny/status/2017824286489383315'},
      {label: "Fortune, Boris Cherny, créateur de Claude Code, 8 juin 2026", url: 'https://fortune.com/2026/06/08/anthropics-boris-cherny-creator-of-claude-code-says-there-are-days-he-manages-tens-of-thousands-of-ai-agents-at-once/'},
    ],
  },
  // Termes prévus : visibles dans le graphe, fiche à venir.
  {id: 'entrainement', status: 'soon', title: 'Entraînement', en: 'Training', aliases: ['pre-training', 'post-training'], jargon: [], cat: 'fondations'},
  {id: 'moe', status: 'soon', title: 'MoE (Mixture of Experts)', en: 'Mixture of Experts', aliases: ['MoE', 'experts'], jargon: [], cat: 'fondations'},
  {id: 'quantization', status: 'soon', title: 'Quantization', en: 'Quantization', aliases: ['quant'], aliasesFr: ['quantification'], jargon: [], cat: 'inference'},
  {id: 'kv-cache', status: 'soon', title: 'KV cache', en: 'KV cache', aliases: ['key-value cache'], jargon: [], cat: 'inference'},
  {id: 'cout-d-une-requete', status: 'soon', title: "Coût d'une requête", en: 'Inference cost', aliases: ['API pricing', 'cost per token'], jargon: [], cat: 'inference'},
  {id: 'system-prompt', status: 'soon', title: 'Prompt système', en: 'System prompt', aliases: ['system message', 'instructions'], jargon: [], cat: 'agents'},
  {id: 'context-engineering', status: 'soon', title: 'Context engineering', en: 'Context engineering', aliases: ['context management'], jargon: [], cat: 'agents'},
  {id: 'agent', status: 'soon', title: 'Agent', en: 'AI agent', aliases: ['agents', 'agentic'], jargon: [], cat: 'agents'},
];

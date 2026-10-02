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
  entrainement: {label: 'Entraînement', color: '#F5D76E'},
  ecosysteme: {label: 'Écosystème et industrie', color: '#F08DC2'},
  methode: {label: "Méthode : travailler avec l'IA", color: '#5FD3C6'},
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
      "Un token est un bloc de texte tiré d'un vocabulaire fixe : environ 200 000 entrées pour le tokenizer de GPT-5 (le même que celui de GPT-4o). Ce vocabulaire est construit avant l'entraînement en gardant les blocs de texte les plus fréquents ; il suit la fréquence, jamais l'orthographe ni le sens. Le tokenizer découpe le texte reçu et remplace chaque bloc par son numéro. En sortie, le modèle produit un numéro à la fois, retraduit en texte.",
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
      "Un modèle ne va pas chercher sa réponse dans une base de textes ; il la réécrit de mémoire à chaque fois, token après token, à partir des réglages appris pendant son entraînement.",
    image:
      "Ce que le groupe sait jouer tient dans le réglage de sa console, et aucun morceau n'est rangé dedans : seulement des réglages qui font que telle note sonne juste après telle autre.",
    imagine:
      "Le groupe a entendu une fois un roman, et tu lui réclames mot pour mot la page 112 ; il te sert, sûr de lui, une page superbe que personne n'a jamais écrite, et salue sous les applaudissements.",
    full: [
      "Un modèle de langage ne stocke pas de textes qu'il irait consulter. Il stocke des paramètres, des nombres ajustés pendant l'entraînement pour prédire le token suivant. Quand il répond, il écrit un token à la fois en tirant à chaque pas l'un des candidats en tête, et la réponse n'existe nulle part avant qu'il l'écrive.",
      "Deux tests le montrent. Pose deux fois la même question dans deux conversations et la réponse change, alors qu'une base rendrait la même fiche. Demande ensuite une citation exacte et tu obtiens souvent une phrase plausible et fausse, ce qu'on appelle une hallucination.",
      "Certains produits cherchent vraiment : ChatGPT avec la recherche web, Perplexity, ou l'assistant interne relié aux documents de ta boîte (le RAG). Dans ce cas, c'est l'outil autour du modèle qui fait la recherche et lui colle les pages trouvées dans la conversation, et le modèle écrit quand même sa réponse token par token.",
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
      "Si tu lisais à voix haute les paramètres de DeepSeek-V3, un par seconde, jour et nuit, il te faudrait environ 21 000 ans ; pour un petit modèle de 7 milliards, compte quand même 222 ans. Et au bout de ces 21 000 ans, tu aurais lu 671 milliards de nombres à virgule sans qu'aucun, pris seul, ne t'ait appris que l'eau bout à 100 degrés.",
    full: [
      "Un paramètre (on dit aussi un poids) est un nombre. Un modèle de langage en contient des milliards : 175 milliards pour GPT-3 en 2020, 671 milliards pour DeepSeek-V3 fin 2024. Pendant l'entraînement, chaque paramètre est ajusté par petites touches pour que le modèle prédise mieux le token suivant ; ensuite ils ne bougent plus, et c'est pour ça que discuter avec lui ne le change pas.",
      "Aucun paramètre ne correspond à un fait précis. Une connaissance comme « le Mont-Blanc est le plus haut sommet des Alpes » est répartie sur des milliers de paramètres, et chaque paramètre participe à des milliers de connaissances. On ne peut donc pas effacer une information d'un modèle comme on supprime une ligne dans une base de données.",
    ],
    then:
      "Jusqu'en 2024, on comparait surtout les modèles à leur taille. En 2026, la question est autant de savoir combien de paramètres travaillent vraiment : DeepSeek-V3 en a 671 milliards mais n'en fait travailler que 37 milliards par token (l'architecture MoE, voir le jargon plus haut). OpenAI, de son côté, ne publie plus la taille de ses modèles phares depuis GPT-4, alors que Meta ou DeepSeek publient la leur avec les paramètres eux-mêmes.",
    office: [
      {who: 'q', text: "On peut lui faire oublier les données clients qu'il a vues ?"},
      {who: 'a', text: "Si c'était pendant l'entraînement, elles sont diluées dans des milliards de paramètres et impossibles à retirer proprement. Si c'était juste dans une conversation, elles ne sont pas dans ses paramètres du tout."},
    ],
    avoid:
      "« J'ai baissé la température, j'ai donc changé ses paramètres. » Dans une API, temperature ou max_tokens s'appellent bien des paramètres, mais ce sont des réglages de ta requête ; les milliards de paramètres du modèle restent tels que l'entraînement les a laissés.",
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
      "En septembre 2024 sont arrivés les modèles de raisonnement, avec o1. Ils prédisent eux aussi le token suivant, mais rédigent une réflexion préalable avant la réponse. En 2026, cette réflexion est devenue la norme pour les problèmes ardus, et les API laissent régler combien le modèle a le droit de réfléchir (le reasoning effort chez OpenAI, l'effort chez Anthropic).",
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
      "En septembre 2025, une étude d'OpenAI a pointé une cause : la plupart des évaluations notent les modèles comme un QCM sans points négatifs. Répondre « je ne sais pas » rapporte zéro alors que deviner rapporte parfois un point, et l'entraînement pousse donc les modèles à deviner plutôt qu'à répondre « je ne sais pas ».",
    ],
    then:
      "En février 2024, un tribunal canadien a jugé Air Canada responsable d'une règle de remboursement que son chatbot avait inventée pour un client en deuil. En août 2025, OpenAI a présenté GPT-5 avec moins d'hallucinations que ses modèles précédents, et les assistants citent plus souvent leurs sources ; une référence précise se vérifie quand même avant de servir, parce que les progrès réduisent les erreurs sans les supprimer.",
    office: [
      {who: 'q', text: "Il m'a donné trois études avec les auteurs et l'année. Je les mets dans le deck ?"},
      {who: 'a', text: "Clique d'abord sur chacune. S'il n'a pas fait de recherche web, il a pu écrire trois références plausibles qui n'existent pas."},
    ],
    avoid:
      "« Il ment. » Mentir suppose de connaître la vérité, alors que le modèle enchaîne ce qui sonne juste sans rien savoir du vrai.",
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
    video: {src: 'videos/fenetre-de-contexte.mp4', poster: 'videos/fenetre-de-contexte.jpg'},
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
      "Ce découpage explique des comportements qui ont l'air bizarres. La casse et les espaces comptent, comme le montrent les trois « bonjour » de la feuille de session, qui donnent 1, 2 et 3 tokens. Chez OpenAI, les nombres sont coupés par paquets de trois chiffres, donc « 2026 » devient « 202 » puis « 6 », ce qui ne facilite pas le calcul. Et comme le vocabulaire couvre tous les octets possibles, aucun texte n'est jamais illisible pour lui : un mot inconnu est coupé en plus petits morceaux.",
      "Un tokenizer est lié à son modèle, parce que le modèle a appris à travailler avec ces numéros-là ; en changer oblige à réentraîner. En mai 2024, OpenAI est passé du tokenizer de GPT-4 (cl100k_base, environ 100 000 morceaux) à celui de GPT-4o (o200k_base). Le français en a profité, et Madame Bovary passe de 215 490 à 189 855 tokens, soit 12 % de moins pour le même roman.",
    ],
    split: [
      {mot: 'dit bonjour', blocs: ['dit', ' bon', 'jour']},
      {mot: '2026', blocs: ['202', '6']},
      {mot: 'ChatGPT', blocs: ['Chat', 'GPT']},
      {mot: 'Pierre-Adrien', blocs: ['Pierre', '-Ad', 'r', 'ien']},
    ],
    office: [
      {who: 'q', text: "Pourquoi le même texte ne fait pas le même nombre de tokens chez OpenAI et chez Mistral ?"},
      {who: 'a', text: "Chaque modèle a son propre tokenizer, avec son propre vocabulaire, et le même texte n'y tombe pas en autant de morceaux. Pour comparer deux prix, compte les tokens avec le tokenizer de chacun, ou compare sur un vrai document."},
    ],
    avoid:
      "« Le tokenizer découpe en syllabes. » Il découpe selon la fréquence des morceaux de texte dans ses données d'entraînement, ce qui tombe parfois sur une syllabe et parfois non : « fraise » devient « f » et « raise ».",
    video: null,
    sources: [
      {label: 'Découpages et comptages : tiktoken, encodages o200k_base et cl100k_base, testés le 2 octobre 2026 ; GPT-4o et GPT-5 associés à o200k_base dans model.py', url: 'https://github.com/openai/tiktoken/blob/main/tiktoken/model.py'},
      {label: 'Wikipédia, Byte-pair encoding (Philip Gage, 1994)', url: 'https://en.wikipedia.org/wiki/Byte-pair_encoding'},
      {label: 'Sennrich, Haddow et Birch, Neural Machine Translation of Rare Words with Subword Units, août 2015', url: 'https://arxiv.org/abs/1508.07909'},
      {label: "Madame Bovary de Gustave Flaubert, Projet Gutenberg (ebook 14155) : 215 490 tokens en cl100k_base, 189 855 en o200k_base, comptés avec tiktoken le 2 octobre 2026 sur le texte compris entre les marqueurs START et END de Gutenberg. Calcul : 1 - 189 855 / 215 490 = 11,9 %", url: 'https://www.gutenberg.org/ebooks/14155'},
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
      "Sur la carte du son, affichée au mur du studio, chaque sample a son adresse, et l'embedding, c'est cette adresse. Les sons qui se ressemblent sont voisins, la caisse claire à côté du clap et loin du violoncelle, et sur la carte du sens, « facture » se place à côté de « devis ».",
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
    solutions: [
      {name: 'Voyage AI', kind: "modèle d'embedding", url: 'https://docs.voyageai.com/docs/embeddings'},
      {name: 'OpenAI embeddings', kind: "modèle d'embedding", url: 'https://developers.openai.com/api/docs/guides/embeddings'},
      {name: 'Cohere Embed', kind: "modèle d'embedding", url: 'https://cohere.com/embed'},
      {name: 'Qwen3-Embedding', kind: 'modèle ouvert', url: 'https://huggingface.co/Qwen/Qwen3-Embedding-8B'},
      {name: 'BGE-M3', kind: 'modèle ouvert', url: 'https://huggingface.co/BAAI/bge-m3'},
    ],
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
      "Avant, curseur à gauche, le groupe cherche un nom pour ton bar et propose « Le Comptoir » à chaque prise ou presque. Après, curseur poussé à fond, il propose « Le Comptoir », puis « La Cave à Sons », puis un soir « Mercredi Liquide ».",
    full: [
      "À chaque pas, le modèle attribue une probabilité à chaque token possible, puis il en tire un au sort. La température change la forme de ce tirage : basse, elle creuse l'écart en faveur des tokens les plus probables, et le favori gagne presque à tous les coups ; haute, elle aplatit les écarts, et des tokens moins probables ont leur chance. Techniquement, on divise les scores du modèle par la température avant de les transformer en probabilités.",
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
  {
    "id": "tailles-de-modele",
    "status": "live",
    "num": "11",
    "title": "Tailles de modèle",
    "en": "Model size",
    "aliases": [
      "parameter count",
      "model scale"
    ],
    "aliasesFr": [
      "nombre de paramètres"
    ],
    "jargon": [
      {
        "say": "7B, 70B, 405B",
        "means": "7, 70 et 405 milliards de paramètres (B pour billion, milliard en anglais) ; en 16 bits, compte 2 Go de mémoire par milliard, soit environ 141 Go pour un 70B"
      },
      {
        "say": "235B-A22B",
        "means": "la façon dont Qwen nomme ses modèles : 235 milliards de paramètres en tout, dont 22 milliards activés (A pour active) pour chaque token"
      },
      {
        "say": "dense",
        "means": "un modèle où tous les paramètres travaillent pour chaque token, comme Qwen3.8-27B ; c'est l'inverse d'un MoE"
      },
      {
        "say": "8x7B",
        "means": "le nom suggère huit fois 7 milliards, mais Mixtral 8x7B ne compte que 46,7 milliards de paramètres, parce que seule une partie du réseau est dupliquée, et il en fait travailler 12,9 milliards par token"
      }
    ],
    "cat": "fondations",
    "links": [
      "parametres",
      "moe",
      "quantization",
      "open-weights",
      "mythe-plus-gros-plus-intelligent",
      "cout-d-une-requete"
    ],
    "short": "La taille d'un modèle, c'est son nombre de paramètres, compté en milliards (B) ou en milliers de milliards (T) ; pour un modèle MoE, on donne deux chiffres, le total et la part qui travaille pour chaque token.",
    "image": "La taille du groupe se compte en potards sur la console. Sur une console dense, chaque note fait bouger tous les potards ; sur celle d'un MoE, deux ou trois rangées jouent pendant que les autres restent immobiles, et il faut pourtant de la place dans le studio pour la console entière.",
    "imagineForm": "D",
    "imagine": "Tu demandes à l'admin qui gère les serveurs : « Entre DeepSeek-V4-Flash et Qwen3.8-27B, lequel est le plus gros ? » Il réfléchit une seconde, puis te répond : « Les deux, puisque le premier a dix fois plus de paramètres et que le second en fait travailler deux fois plus pour chaque token. »",
    "full": [
      "La taille se compte en paramètres, les nombres réglés pendant l'entraînement, et le jargon l'abrège avec des lettres anglaises : B pour billion (milliard), T pour trillion (millier de milliards). Ce chiffre dit d'abord combien de mémoire il faut pour faire tourner le modèle. En 16 bits, chaque paramètre occupe 2 octets, soit 2 Go par milliard de paramètres, un calcul qu'on refait de tête ; les fichiers de Llama 3.1 405B pèsent ainsi 812 Go sur Hugging Face.",
      "Avec les MoE, le chiffre se dédouble. Un modèle dense fait travailler tous ses paramètres pour chaque token, alors qu'un MoE n'en active qu'une fraction : DeepSeek-V4-Pro, présenté en avril 2026, compte 1 600 milliards de paramètres et n'en active que 49 milliards par token. Le total dit combien de serveurs il faut ; la part active dit combien coûte chaque token et à quelle vitesse il sort.",
      "C'est pour ça que Qwen écrit les deux nombres dans le nom de ses modèles, comme Qwen3-235B-A22B, qui se lit « 235 milliards en tout, dont 22 milliards actifs », ou Qwen3.8-2.4T-A95B. Face à un modèle dense, on compare le nombre qui suit le A quand on parle de vitesse, et le premier quand on parle de matériel."
    ],
    "then": "En juillet 2024, Meta publiait Llama 3.1 405B, un modèle dense dont un seul chiffre suffisait à décrire la taille. En juillet 2026, Moonshot AI a publié Kimi K3, qui compte 2 800 milliards de paramètres dont 104 milliards actifs par token. Il est sept fois plus gros que Llama 3.1 405B au total, et chaque token y fait pourtant travailler quatre fois moins de paramètres.",
    "office": [
      {
        "who": "q",
        "text": "On veut le faire tourner chez nous. On prend le 70B ou le 8B ?"
      },
      {
        "who": "a",
        "text": "Commence par la mémoire : en 16 bits, le 70B demande environ 141 Go, donc plusieurs GPU, alors que le 8B tient sur une seule carte de 24 Go ; si tu n'as pas plusieurs GPU sous la main, la question est déjà réglée."
      }
    ],
    "avoid": "« Un 1T, c'est forcément plus lent qu'un 70B. » Kimi K2 compte 1 000 milliards de paramètres mais n'en active que 32 milliards par token, donc il calcule chaque token avec moins de paramètres qu'un modèle dense de 70 milliards. Il lui faut en revanche beaucoup plus de mémoire.",
    "video": null,
    "sources": [
      {
        "label": "Meta, The Llama 3 Herd of Models, 31 juillet 2024 (Llama 3.1 405B, architecture Transformer dense)",
        "url": "https://arxiv.org/abs/2407.21783"
      },
      {
        "label": "Hugging Face, meta-llama/Llama-3.1-405B : 812 Go de fichiers .safetensors en 16 bits (API Hugging Face, consultée le 2 octobre 2026). Calcul : 405 x 10^9 paramètres x 2 octets = 810 Go",
        "url": "https://huggingface.co/meta-llama/Llama-3.1-405B"
      },
      {
        "label": "Ollama, Llama 3.3 70B : 141 Go en 16 bits (fp16)",
        "url": "https://ollama.com/library/llama3.3/tags"
      },
      {
        "label": "DeepSeek, fiche de DeepSeek-V4-Pro (1,6T paramètres, 49B activés ; V4-Flash : 284B, 13B activés)",
        "url": "https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro"
      },
      {
        "label": "Wikipédia, DeepSeek (préversion de V4 publiée le 24 avril 2026)",
        "url": "https://en.wikipedia.org/wiki/DeepSeek"
      },
      {
        "label": "Qwen, fiche de Qwen3-235B-A22B (235B au total, 22B activés)",
        "url": "https://huggingface.co/Qwen/Qwen3-235B-A22B"
      },
      {
        "label": "Qwen, fiche de Qwen3.8-2.4T-A95B (2,4T au total, 95B activés)",
        "url": "https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B"
      },
      {
        "label": "Qwen, fiche de Qwen3.8-27B (modèle dense de 27B)",
        "url": "https://huggingface.co/Qwen/Qwen3.8-27B"
      },
      {
        "label": "Moonshot AI, fiche de Kimi K3 (2,8T paramètres, 104B activés)",
        "url": "https://huggingface.co/moonshotai/Kimi-K3"
      },
      {
        "label": "Wikipédia, Kimi (Kimi K3 publié le 16 juillet 2026 ; Kimi K2, 1T paramètres et 32B actifs, juillet 2025)",
        "url": "https://en.wikipedia.org/wiki/Kimi_(AI)"
      },
      {
        "label": "Mistral AI, Mixtral of experts, 11 décembre 2023 (46,7B au total, 12,9B par token)",
        "url": "https://mistral.ai/news/mixtral-of-experts"
      }
    ]
  },
  {
    "id": "moe",
    "status": "live",
    "num": "12",
    "title": "MoE (Mixture of Experts)",
    "en": "Mixture of Experts",
    "aliases": [
      "MoE",
      "sparse MoE",
      "sparse mixture of experts"
    ],
    "aliasesFr": [
      "mélange d'experts"
    ],
    "jargon": [
      {
        "say": "experts",
        "means": "les sous-réseaux entre lesquels le modèle répartit le travail ; Qwen3.8-2.4T-A95B en compte 512"
      },
      {
        "say": "router",
        "means": "le routeur, un petit réseau qui choisit, pour chaque token, les experts qui vont le traiter"
      },
      {
        "say": "top-k",
        "means": "le nombre d'experts activés par token : 2 sur 8 chez Mixtral, 16 sur 896 chez Kimi K3"
      },
      {
        "say": "shared expert",
        "means": "un expert qui travaille pour tous les tokens, en plus de ceux que choisit le routeur ; Kimi K3 en a deux"
      }
    ],
    "cat": "fondations",
    "links": [
      "parametres",
      "tailles-de-modele",
      "open-weights",
      "cout-d-une-requete",
      "mythe-plus-gros-plus-intelligent"
    ],
    "short": "Un MoE est un modèle découpé en nombreux sous-réseaux, les experts, dont seuls quelques-uns travaillent pour chaque token ; il occupe la mémoire d'un très gros modèle mais calcule chaque token comme un petit.",
    "image": "Remplace le groupe par un orchestre de plusieurs centaines de solistes, avec un chef qui n'en fait jouer qu'une poignée à chaque note. Le chef, c'est le routeur, et les solistes sont les experts ; ceux qui attendent en silence doivent quand même tenir dans la salle.",
    "imagineForm": "E",
    "imagine": "Isole une seule note du chanteur. Si Qwen3.8-2.4T-A95B était un modèle dense, elle ferait bouger les 2 400 milliards de potards de sa console. Dans le vrai Qwen3.8, le chef la confie à 10 solistes sur 512, plus un soliste de garde qui joue toutes les notes, et seuls 95 milliards de potards bougent, vingt-cinq fois moins. Les centaines d'autres solistes restent assis en silence, et gardent quand même leur chaise.",
    "full": [
      "Dans un MoE, une partie du réseau est remplacée par des dizaines ou des centaines de variantes, les experts, et un petit réseau, le routeur, choisit pour chaque token et à chaque couche ceux qui vont le traiter. Chez Mixtral 8x7B, publié par Mistral en décembre 2023, le routeur prend 2 experts sur 8 : le modèle compte 46,7 milliards de paramètres, n'en utilise que 12,9 milliards par token, et répond à la vitesse et au coût d'un modèle de 12,9 milliards.",
      "Le gain se paie en mémoire, parce que tous les experts doivent être chargés même quand ils se taisent. Les fichiers de Kimi K2 pèsent environ 1 000 Go, alors que chaque token n'active que 32 milliards de ses 1 000 milliards de paramètres.",
      "Le mot « expert » trompe un peu. L'équipe de Mistral a regardé comment Mixtral répartissait des articles d'ArXiv, des résumés de biologie et des textes de philosophie. Les trois se distribuaient à peu près dans les mêmes proportions entre les experts, qui ne se partagent donc pas les sujets comme le mot le laisse croire."
    ],
    "then": "Jusqu'à Llama 3, Meta publiait des modèles denses. En avril 2025, Llama 4 Maverick a changé d'architecture pour un MoE, avec 400 milliards de paramètres au total et seulement 17 milliards au travail pour chaque token.",
    "office": [
      {
        "who": "q",
        "text": "Comment un modèle de 284 milliards de paramètres peut répondre aussi vite qu'un petit ?"
      },
      {
        "who": "a",
        "text": "DeepSeek-V4-Flash est un MoE qui n'en mobilise que 13 milliards par token, mais il faut quand même charger les 284 milliards sur les serveurs."
      }
    ],
    "avoid": "« Un MoE, c'est plusieurs modèles spécialisés qu'on interroge à tour de rôle. » Les experts sont des morceaux d'un même réseau, choisis à nouveau à chaque token et à chaque couche, et aucun ne sait répondre seul à une question.",
    "video": null,
    "sources": [
      {
        "label": "Mistral AI, Mixtral of experts, 11 décembre 2023 (2 experts sur 8 par couche et par token, 46,7B au total, 12,9B par token, vitesse et coût d'un 12,9B)",
        "url": "https://mistral.ai/news/mixtral-of-experts"
      },
      {
        "label": "Jiang et al., Mixtral of Experts, janvier 2024 (pas de spécialisation évidente des experts par sujet sur ArXiv, PubMed et PhilPapers)",
        "url": "https://arxiv.org/abs/2401.04088"
      },
      {
        "label": "Moonshot AI, fiche de Kimi K2 (1T paramètres, 32B activés, 384 experts) ; environ 1 029 Go de fichiers selon l'API Hugging Face, consultée le 2 octobre 2026",
        "url": "https://huggingface.co/moonshotai/Kimi-K2-Instruct"
      },
      {
        "label": "Moonshot AI, fiche de Kimi K3 (2,8T paramètres, 896 experts, 16 choisis par token, 2 experts partagés)",
        "url": "https://huggingface.co/moonshotai/Kimi-K3"
      },
      {
        "label": "Qwen, fiche de Qwen3.8-2.4T-A95B (2,4T paramètres, 512 experts, 10 routés et 1 partagé, 95B activés). Calcul : 2 400 / 95 = 25,3",
        "url": "https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B"
      },
      {
        "label": "DeepSeek, fiche de DeepSeek-V4 (V4-Flash : 284B paramètres, 13B activés)",
        "url": "https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro"
      },
      {
        "label": "Meta, The Llama 3 Herd of Models, juillet 2024 (architecture Transformer dense)",
        "url": "https://arxiv.org/abs/2407.21783"
      },
      {
        "label": "Wikipédia, Llama (Llama 4 Maverick, 5 avril 2025 : 400B au total, 17B actifs, 128 experts)",
        "url": "https://en.wikipedia.org/wiki/Llama_(language_model)"
      },
      {
        "label": "Wikipédia, Open-source artificial intelligence (Kimi K3 et Qwen3.8, plus gros modèles ouverts en 2026)",
        "url": "https://en.wikipedia.org/wiki/Open-source_artificial_intelligence"
      }
    ]
  },
  {
    "id": "open-weights",
    "status": "live",
    "num": "13",
    "title": "Open weights",
    "en": "Open weights",
    "aliases": [
      "open-weight model",
      "open model",
      "weights-available"
    ],
    "aliasesFr": [
      "poids ouverts",
      "modèle ouvert"
    ],
    "jargon": [
      {
        "say": "open-weight",
        "means": "les paramètres sont téléchargeables ; les données et le code d'entraînement, en général, ne le sont pas"
      },
      {
        "say": "Apache 2.0, MIT",
        "means": "des licences permissives qui autorisent l'usage commercial et la modification ; gpt-oss est sous Apache 2.0, DeepSeek-V4 sous MIT"
      },
      {
        "say": "fully open",
        "means": "les poids, mais aussi les données, le code et les étapes d'entraînement, comme pour OLMo 3 de l'institut Ai2"
      },
      {
        "say": "openwashing",
        "means": "présenter comme open source un modèle dont seuls les poids sont publiés"
      }
    ],
    "cat": "ecosysteme",
    "links": [
      "parametres",
      "tailles-de-modele",
      "quantization",
      "fine-tuning",
      "mythe-chatgpt-c-est-le-modele"
    ],
    "solutions": [
      {
        "name": "Hugging Face",
        "kind": "catalogue de modèles",
        "url": "https://huggingface.co/models"
      },
      {
        "name": "Ollama",
        "kind": "outil pour les faire tourner chez soi",
        "url": "https://ollama.com/library"
      },
      {
        "name": "LM Studio",
        "kind": "outil pour les faire tourner chez soi",
        "url": "https://lmstudio.ai/"
      },
      {
        "name": "OpenRouter",
        "kind": "API pour les essayer sans les héberger",
        "url": "https://openrouter.ai/models"
      }
    ],
    "short": "Un modèle open weights est un modèle dont les paramètres sont publiés et téléchargeables ; tu peux le faire tourner sur tes machines et souvent le modifier, sans savoir pour autant sur quelles données il a été entraîné.",
    "image": "Quand une maison de disques donne à tout le monde le preset complet de sa console, n'importe quel studio peut rejouer le groupe chez lui, retoucher les potards et enregistrer ses propres morceaux. Les bandes qui ont servi à régler la console restent en général dans les archives de la maison.",
    "imagineForm": "B",
    "imagine": "Ouvre la page de gpt-oss-120b sur Hugging Face et clique sur « Files and versions ». Tu y trouves la licence Apache 2.0 et les fichiers de poids au format .safetensors, environ 65 Go pour 117 milliards de paramètres, puis tu peux chercher le dossier des données d'entraînement aussi longtemps que tu veux.",
    "full": [
      "Un modèle open weights publie ses paramètres, la console réglée, avec une licence qui dit ce qu'on a le droit d'en faire. Tu peux alors le faire tourner sur tes serveurs sans envoyer tes données à personne, le spécialiser par fine-tuning ou le compresser. La licence compte autant que les poids : celle de Llama 3.1 oblige les entreprises de plus de 700 millions d'utilisateurs mensuels à demander une licence à Meta, alors que gpt-oss, sous Apache 2.0, n'a pas cette clause.",
      "Pour savoir si un modèle est open source ou seulement open weights, demande-toi si tu pourrais refaire son entraînement avec ce qui est publié. Avec gpt-oss ou DeepSeek-V4, la réponse est non, faute des données d'entraînement ; avec OLMo 3, qu'Ai2 publie avec ses données et toutes ses étapes d'entraînement, c'est oui.",
      "Le cas limite est le modèle dont les données sont décrites sans être publiées. La définition de l'IA open source fixée en octobre 2024 par l'Open Source Initiative l'accepte, si la description suffit à une personne compétente pour construire un système équivalent ; c'est le point le plus disputé de cette définition."
    ],
    "then": "En 2024, le dernier modèle de langage ouvert d'OpenAI restait GPT-2. Le 5 août 2025, OpenAI a publié gpt-oss-120b et gpt-oss-20b sous Apache 2.0, ses premiers modèles de langage open weights depuis, et le plus gros des deux se contente d'une seule carte graphique de 80 Go.",
    "office": [
      {
        "who": "q",
        "text": "Si on l'installe sur nos serveurs, les données clients ne sortent pas de chez nous ?"
      },
      {
        "who": "a",
        "text": "Une fois téléchargé, le modèle tourne sans rien envoyer à son éditeur. Lis quand même la licence et compte les GPU, parce que l'hébergement devient ton problème."
      }
    ],
    "avoid": "« Il est open source, donc on sait sur quoi il a été entraîné. » Beaucoup de modèles dits ouverts, comme Llama, gpt-oss ou DeepSeek-V4, ne publient que leurs poids, et leurs données d'entraînement restent privées.",
    "video": null,
    "sources": [
      {
        "label": "OpenAI, Lancement de gpt-oss, 5 août 2025 (Apache 2.0, premiers modèles de langage open-weight depuis GPT-2)",
        "url": "https://openai.com/index/introducing-gpt-oss/"
      },
      {
        "label": "Hugging Face, openai/gpt-oss-120b (licence, fichiers .safetensors, 117B paramètres) ; 65,2 Go de poids selon l'API Hugging Face, consultée le 2 octobre 2026",
        "url": "https://huggingface.co/openai/gpt-oss-120b"
      },
      {
        "label": "Meta, licence de Llama 3.1, article 2 (plus de 700 millions d'utilisateurs actifs mensuels)",
        "url": "https://huggingface.co/meta-llama/Llama-3.1-405B/blob/main/LICENSE"
      },
      {
        "label": "Open Source Initiative, The Open Source AI Definition 1.0 (Data Information)",
        "url": "https://opensource.org/ai/open-source-ai-definition"
      },
      {
        "label": "Wikipédia, Open-source artificial intelligence (définition de l'OSI du 28 octobre 2024, point le plus controversé sur les données, openwashing, Kimi K3 plus gros modèle ouvert en juillet 2026)",
        "url": "https://en.wikipedia.org/wiki/Open-source_artificial_intelligence"
      },
      {
        "label": "Ai2, Olmo 3 (modèle entièrement ouvert, de la donnée au modèle final)",
        "url": "https://allenai.org/olmo"
      },
      {
        "label": "DeepSeek, fiche de DeepSeek-V4-Pro (poids sous licence MIT)",
        "url": "https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro"
      },
      {
        "label": "Wikipédia, Kimi (Kimi K3, 2,8T paramètres, 16 juillet 2026)",
        "url": "https://en.wikipedia.org/wiki/Kimi_(AI)"
      }
    ]
  },
  {
    "id": "quantization",
    "status": "live",
    "num": "14",
    "title": "Quantization",
    "en": "Quantization",
    "aliases": [
      "quant",
      "quantisation",
      "quantized model"
    ],
    "aliasesFr": [
      "quantification"
    ],
    "jargon": [
      {
        "say": "Q4, 4-bit",
        "means": "chaque paramètre est stocké sur 4 bits au lieu de 16 ; le fichier devient trois à quatre fois plus léger"
      },
      {
        "say": "FP16, BF16",
        "means": "les formats 16 bits dans lesquels un modèle est d'habitude entraîné et publié ; c'est la version pleine qu'on compresse ensuite"
      },
      {
        "say": "GGUF",
        "means": "le format de fichier créé par l'auteur de llama.cpp pour charger vite des modèles, souvent quantifiés, sur ta propre machine"
      },
      {
        "say": "MXFP4",
        "means": "un format 4 bits avec lequel OpenAI (gpt-oss) et Moonshot AI (Kimi K3) entraînent une partie de leurs poids, pour les publier déjà compressés"
      }
    ],
    "cat": "inference",
    "links": [
      "parametres",
      "tailles-de-modele",
      "open-weights",
      "cout-d-une-requete"
    ],
    "solutions": [
      {
        "name": "llama.cpp",
        "kind": "bibliothèque open source",
        "url": "https://github.com/ggml-org/llama.cpp"
      },
      {
        "name": "MLX",
        "kind": "bibliothèque open source",
        "url": "https://github.com/ml-explore/mlx"
      },
      {
        "name": "Ollama",
        "kind": "outil pour faire tourner un modèle quantifié",
        "url": "https://ollama.com/library"
      },
      {
        "name": "LM Studio",
        "kind": "outil pour faire tourner un modèle quantifié",
        "url": "https://lmstudio.ai/"
      }
    ],
    "short": "La quantization consiste à stocker les paramètres d'un modèle avec moins de précision, par exemple sur 4 bits au lieu de 16, pour qu'il prenne trois à quatre fois moins de mémoire au prix d'un peu de qualité.",
    "image": "Passe la bande du WAV au MP3 et le morceau tient dans un fichier bien plus léger, au prix de détails que peu d'oreilles entendent ; la quantization fait la même chose avec le réglage de la console. La comparaison s'arrête là, car le MP3 jette les sons qu'on n'entend pas alors que la quantization arrondit tous les potards sans exception, ce qui finit par s'entendre quand on arrondit trop.",
    "imagineForm": "E",
    "imagine": "Avant, tu télécharges Llama 3.3 70B dans sa version 16 bits, 141 Go, et il faut deux GPU de serveur à 80 Go pour l'ouvrir. Après, tu prends la version 4 bits du même modèle, 43 Go, et il tient dans une machine de 64 Go de mémoire ; ce sont les mêmes 70 milliards de potards, arrondis chacun au cran le plus proche.",
    "full": [
      "Pendant l'entraînement, chaque paramètre est en général stocké sur 16 bits. La quantization le réécrit sur 8, 4 ou même 2 bits, en l'arrondissant à l'une des rares valeurs que le format sait représenter : sur 4 bits, il n'en existe que 16. Le modèle prend moins de mémoire, tient sur des machines plus modestes et répond souvent plus vite, puisqu'il y a moins de données à déplacer pour chaque token.",
      "La perte dépend du niveau d'arrondi et de la taille du modèle. En mai 2025, une étude sur Qwen3 a mesuré qu'en 4 bits, Qwen3-14B ne perdait qu'environ 1 % sur le test MMLU, alors que le petit Qwen3-0.6B perdait environ 10 %. À 3 bits et moins, Qwen3 se dégradait plus nettement que les générations précédentes, ce que les auteurs attribuent à un entraînement plus poussé qui laisse moins de paramètres superflus à sacrifier."
    ],
    "then": "La quantization se faisait surtout après coup en 2024, sur un modèle publié en 16 bits, et Llama 3.3 70B existe ainsi sur Ollama en une douzaine de versions, de 141 Go en 16 bits à 26 Go en 2 bits. Depuis août 2025, des labos publient des modèles conçus pour tourner en 4 bits, comme gpt-oss-120b, qui tient sur un seul GPU de 80 Go et dont toutes les évaluations ont été faites en 4 bits, puis Kimi K3 en juillet 2026.",
    "office": [
      {
        "who": "q",
        "text": "On a pris la version 2 bits pour économiser des GPU, et il écrit un français approximatif. C'est le modèle ?"
      },
      {
        "who": "a",
        "text": "C'est probablement l'arrondi, parce qu'en dessous de 4 bits les modèles se dégradent nettement ; remonte en 4 bits, quitte à payer un GPU de plus."
      }
    ],
    "avoid": "« Un modèle quantifié est un modèle plus petit. » Il garde exactement le même nombre de paramètres et chacun est stocké avec moins de précision, donc un 70B en 4 bits reste un 70B.",
    "video": null,
    "sources": [
      {
        "label": "Ollama, Llama 3.3 70B, versions de 141 Go (fp16) à 75 Go (q8_0), 43 Go (q4_K_M) et 26 Go (q2_K)",
        "url": "https://ollama.com/library/llama3.3/tags"
      },
      {
        "label": "Zheng et al., An Empirical Study of Qwen3 Quantization, 4 mai 2025 (environ 1 % de perte sur MMLU pour Qwen3-14B en 4 bits, environ 10 % pour Qwen3-0.6B, dégradation plus forte à 3 bits et moins)",
        "url": "https://arxiv.org/abs/2505.02214"
      },
      {
        "label": "OpenAI, fiche de gpt-oss-120b (poids MoE en MXFP4, un seul GPU de 80 Go, évaluations faites en MXFP4)",
        "url": "https://huggingface.co/openai/gpt-oss-120b"
      },
      {
        "label": "Moonshot AI, fiche de Kimi K3 (poids MXFP4, entraînement conscient de la quantization)",
        "url": "https://huggingface.co/moonshotai/Kimi-K3"
      },
      {
        "label": "Wikipédia, Kimi (Kimi K3 publié le 16 juillet 2026)",
        "url": "https://en.wikipedia.org/wiki/Kimi_(AI)"
      },
      {
        "label": "Hugging Face, documentation GGUF (format créé par l'auteur de llama.cpp)",
        "url": "https://huggingface.co/docs/hub/gguf"
      }
    ]
  },
  {
    "id": "benchmarks",
    "status": "live",
    "num": "15",
    "title": "Benchmarks",
    "en": "Benchmark",
    "aliases": [
      "benchmarks",
      "benchmark suite"
    ],
    "aliasesFr": [
      "test de référence"
    ],
    "jargon": [
      {
        "say": "MMLU",
        "means": "un QCM de 57 matières publié en 2020 ; en janvier 2025, les meilleurs modèles y dépassaient déjà 90 %"
      },
      {
        "say": "SOTA",
        "means": "state of the art, le meilleur score publié à ce jour sur un benchmark donné"
      },
      {
        "say": "saturé",
        "means": "se dit d'un benchmark où les meilleurs modèles plafonnent près du maximum et qui ne départage donc plus personne"
      },
      {
        "say": "contamination",
        "means": "les questions du test, ou leurs réponses, se sont retrouvées dans les données d'entraînement du modèle"
      }
    ],
    "cat": "ecosysteme",
    "links": [
      "benchmaxxing",
      "evals",
      "mythe-plus-gros-plus-intelligent"
      
    ],
    "solutions": [
      {
        "name": "LMArena",
        "kind": "classement par votes",
        "url": "https://lmarena.ai/leaderboard"
      },
      {
        "name": "Artificial Analysis",
        "kind": "comparateur de modèles",
        "url": "https://artificialanalysis.ai/"
      },
      {
        "name": "Epoch AI Benchmarking Hub",
        "kind": "suivi des benchmarks",
        "url": "https://epoch.ai/benchmarks"
      }
    ],
    "short": "Un benchmark est un test standard, le même pour tous les modèles, qui donne un score comparable d'un labo à l'autre : un QCM, des problèmes de maths, des bugs à corriger dans du vrai code.",
    "image": "Chez les groupes, le benchmark prend la forme d'un concours, où le jury impose à tous les mêmes morceaux puis publie un classement. Le classement dit qui joue le mieux ces morceaux-là, pas forcément qui fera le meilleur concert dans ta salle.",
    "imagineForm": "D",
    "imagine": "À la pause, tu demandes au collègue qui suit les classements : « Pourquoi même les meilleurs modèles ratent des problèmes de SWE-bench Verified, le test de correction de bugs ? » Il te répond : « OpenAI a repris ceux que o3 ratait le plus souvent, et dans plus d'un tiers des cas, c'était le correcteur qui refusait une solution juste. »",
    "full": [
      "En décembre 2024, OpenAI a présenté son modèle o3 en annonçant plus de 25 % de réussite sur FrontierMath, un benchmark de mathématiques de niveau recherche. En avril 2025, Epoch AI, qui a conçu le test, a mesuré environ 10 % sur le modèle mis en service. Selon Epoch, l'écart pouvait venir d'un outillage interne plus puissant et de plus de calcul lors de la démonstration. Epoch avait aussi révélé, le jour même de l'annonce d'o3, qu'OpenAI avait financé FrontierMath et eu accès à une bonne partie de ses problèmes.",
      "Un score ne vaut donc que par ce qu'il mesure. Un benchmark fixe une liste de questions, une façon de les poser et une façon de noter, et il suffit de changer l'une des trois pour changer le chiffre. Il s'use aussi, parce que les questions publiques finissent dans les données d'entraînement et que le test mesure alors en partie la mémoire du modèle.",
      "En février 2026, OpenAI a cessé de publier ses scores sur SWE-bench Verified, le test de correction de bugs qu'il avait lui-même lancé en 2024. Tous les modèles de pointe testés savaient recopier au mot près certaines corrections de référence, signe qu'ils les avaient vues pendant leur entraînement. Le tiers de corrigés défaillants évoqué plus haut vient de la même relecture, où ses équipes avaient trouvé, sur 138 problèmes que o3 ratait souvent, 82 problèmes mal posés ou mal testés, dont 49 aux tests trop stricts."
    ],
    "then": "MMLU, un QCM de 57 matières publié en 2020, servait encore aux labos pour se comparer en 2024. En janvier 2025, les meilleurs modèles y dépassaient 90 %, et des tests plus durs ont pris le relais, comme Humanity's Last Exam et ses 2 500 questions d'experts. En août 2025, la fiche de gpt-oss-120b affichait 90,0 % sur le premier et 14,9 % sur le second, et seul le second départage encore les modèles.",
    "office": [
      {
        "who": "q",
        "text": "Le fournisseur annonce 92 % sur un benchmark de code. On signe ?"
      },
      {
        "who": "a",
        "text": "Fais-toi préciser quel benchmark, avec quel outillage et combien d'essais, puis fais passer au modèle vingt de tes vrais tickets ; c'est ce score-là qui t'intéresse."
      }
    ],
    "avoid": "« Il a 90 % au MMLU, donc il se trompe une fois sur dix. » Le score vaut pour ce QCM-là, dans les conditions du labo, et sur tes questions le taux d'erreur peut être bien plus haut ou plus bas.",
    "video": null,
    "sources": [
      {
        "label": "TechCrunch, « OpenAI's o3 AI model scores lower on a benchmark than the company initially implied », 20 avril 2025 (plus de 25 % annoncés, environ 10 % mesurés par Epoch AI)",
        "url": "https://techcrunch.com/2025/04/20/openais-o3-ai-model-scores-lower-on-a-benchmark-than-the-company-initially-implied/"
      },
      {
        "label": "TechCrunch, Epoch AI critiqué pour avoir tardé à révéler le financement d'OpenAI, 19 janvier 2025",
        "url": "https://techcrunch.com/2025/01/19/ai-benchmarking-organization-criticized-for-waiting-to-disclose-funding-from-openai/"
      },
      {
        "label": "OpenAI, Pourquoi SWE-bench Verified ne mesure plus les capacités de codage de pointe, 23 février 2026 (138 problèmes que o3 ratait souvent, dont 59,4 % mal posés ou mal testés et 35,5 % aux tests trop stricts qui rejettent des solutions correctes ; contamination, arrêt des scores ; chiffres recoupés via la presse, la page renvoyant 403 aux robots)",
        "url": "https://openai.com/index/why-we-no-longer-evaluate-swe-bench-verified/"
      },
      {
        "label": "Hendrycks et al., Measuring Massive Multitask Language Understanding, septembre 2020 (57 matières)",
        "url": "https://arxiv.org/abs/2009.03300"
      },
      {
        "label": "Phan et al., Humanity's Last Exam, janvier 2025 (2 500 questions ; plus de 90 % sur MMLU pour les modèles de pointe)",
        "url": "https://arxiv.org/abs/2501.14249"
      },
      {
        "label": "OpenAI, gpt-oss-120b & gpt-oss-20b Model Card, août 2025 (tableau 3 : MMLU 90,0 %, HLE sans outils 14,9 % en raisonnement élevé)",
        "url": "https://arxiv.org/abs/2508.10925"
      }
    ]
  },
  {
    "id": "benchmaxxing",
    "status": "live",
    "num": "16",
    "title": "Benchmaxxing",
    "en": "Benchmaxxing",
    "aliases": [
      "benchmark gaming",
      "benchmark hacking"
    ],
    "aliasesFr": [],
    "jargon": [
      {
        "say": "benchmaxxé",
        "means": "se dit d'un modèle dont les scores annoncés promettent plus que ce qu'on obtient en l'utilisant"
      },
      {
        "say": "loi de Goodhart",
        "means": "quand une mesure devient un objectif, elle cesse d'être une bonne mesure ; l'économiste Charles Goodhart en a formulé l'idée en 1975"
      },
      {
        "say": "cherry-picking",
        "means": "ne montrer que les scores flatteurs, ou la meilleure variante du modèle pour chaque test"
      },
      {
        "say": "private testing",
        "means": "tester en secret plusieurs variantes d'un modèle sur un classement public et ne rendre visible que la meilleure"
      }
    ],
    "cat": "ecosysteme",
    "links": [
      "benchmarks",
      "evals",
      "reward-hacking",
      "mythe-plus-gros-plus-intelligent"
    ],
    "short": "Le benchmaxxing consiste à optimiser un modèle, ou la façon de présenter ses scores, pour grimper dans les classements plutôt que pour mieux servir ceux qui l'utilisent.",
    "image": "Les semaines avant le concours, un groupe peut ne plus répéter que le morceau imposé, jusqu'à le jouer sans une fausse note. Il gagne le concours, puis déçoit au premier concert, parce que la salle lui demande autre chose.",
    "imagineForm": "E",
    "imagine": "Avant, début avril 2025, la version de Llama 4 Maverick que Meta a inscrite sur LMArena est une variante expérimentale réglée pour plaire aux votants, avec de longues réponses semées d'émojis, et elle se classe deuxième. Après, le 11 avril, LMArena classe la version que tout le monde peut télécharger, et elle tombe à la 32e place.",
    "full": [
      "Le benchmaxxing prend plusieurs formes, de la plus banale à la plus discutable. Un labo peut entraîner son modèle sur des exercices qui ressemblent beaucoup au test, retenir la meilleure de plusieurs variantes pour chaque benchmark, ou tester en privé des dizaines de versions sur un classement public avant d'en montrer une seule. Dans les trois cas, le score grimpe plus vite que la qualité, comme le prévoit la loi de Goodhart.",
      "Llama 4 en est devenu le cas d'école. Fin avril 2025, l'étude The Leaderboard Illusion a compté 27 variantes privées testées par Meta sur LMArena avant la sortie du modèle, et LMArena a changé ses règles après l'épisode Maverick. En janvier 2026, Yann LeCun, sur le départ de Meta, a reconnu dans le Financial Times que l'équipe avait « fudged a little bit » en prenant des versions différentes du modèle selon les benchmarks."
    ],
    "office": [
      {
        "who": "q",
        "text": "Le nouveau modèle est premier partout dans le communiqué. On migre ?"
      },
      {
        "who": "a",
        "text": "Regarde d'abord qui a fait passer les tests et sur quelle version du modèle ; Llama 4 a montré qu'un classement peut porter sur une variante que personne ne peut télécharger."
      }
    ],
    "avoid": "« Benchmaxxing, ça veut dire que le labo a triché. » Souvent, aucune règle n'est enfreinte, puisque le labo entraîne sur des exercices proches du test ou choisit ce qu'il montre ; le score dit vrai sur le test tout en promettant trop pour le reste.",
    "video": {"src": "videos/benchmaxxing.mp4", "poster": "videos/benchmaxxing.jpg"},
    "sources": [
      {
        "label": "The Register, Meta accused of Llama 4 bait-n-switch to juice LMArena rank, 8 avril 2025 (variante expérimentale 2e, Elo 1417, réponses longues avec émojis)",
        "url": "https://www.theregister.com/2025/04/08/meta_llama4_cheating/"
      },
      {
        "label": "TechCrunch, Meta's vanilla Maverick AI model ranks below rivals on a popular chat benchmark, 11 avril 2025 (version publique 32e, changement des règles de LMArena)",
        "url": "https://techcrunch.com/2025/04/11/metas-vanilla-maverick-ai-model-ranks-below-rivals-on-a-popular-chat-benchmark/"
      },
      {
        "label": "Singh et al., The Leaderboard Illusion, 29 avril 2025 (27 variantes privées testées par Meta avant Llama 4)",
        "url": "https://arxiv.org/abs/2504.20879"
      },
      {
        "label": "Fast Company, Yann LeCun: Meta 'fudged a little bit' when benchmark-testing Llama 4 model, 6 janvier 2026 (d'après un entretien au Financial Times)",
        "url": "https://www.fastcompany.com/91469583/yann-lecun-meta-llama-4-model-zuckerberg"
      },
      {
        "label": "Wikipédia, Goodhart's law (Charles Goodhart, 1975)",
        "url": "https://en.wikipedia.org/wiki/Goodhart%27s_law"
      }
    ]
  },
  {
    "id": "evals",
    "status": "live",
    "num": "17",
    "title": "Evals",
    "en": "Evals",
    "aliases": [
      "evaluations",
      "eval",
      "eval suite"
    ],
    "aliasesFr": [
      "évaluations",
      "éval"
    ],
    "jargon": [
      {
        "say": "pass@k",
        "means": "la part des tâches réussies au moins une fois en k essais"
      },
      {
        "say": "pass^k",
        "means": "la part des tâches réussies à chacun des k essais ; avec 75 % de réussite par essai, trois réussites d'affilée n'arrivent que 42 % du temps"
      },
      {
        "say": "LLM-as-a-judge",
        "means": "un modèle qui note les réponses d'un autre selon une grille écrite, à recaler de temps en temps sur des notes humaines"
      },
      {
        "say": "eval de régression",
        "means": "les tâches que l'agent réussissait déjà, relancées à chaque changement pour vérifier que rien n'a cassé"
      }
    ],
    "cat": "agents",
    "links": [
      "benchmarks",
      "benchmaxxing",
      "agent",
      
      "harness",
      "hallucination"
    ],
    "solutions": [
      {
        "name": "promptfoo",
        "kind": "outil open source",
        "url": "https://www.promptfoo.dev/"
      },
      {
        "name": "Inspect",
        "kind": "outil open source",
        "url": "https://inspect.aisi.org.uk/"
      },
      {
        "name": "Braintrust",
        "kind": "plateforme",
        "url": "https://www.braintrust.dev/"
      },
      {
        "name": "LangSmith",
        "kind": "plateforme",
        "url": "https://www.langchain.com/langsmith"
      }
    ],
    "short": "Les evals sont les tests que tu écris pour ton propre usage : des tâches tirées de ton métier, une façon de noter chaque réponse, et un score que tu relances à chaque changement de modèle ou de prompt.",
    "image": "Les evals sont les auditions que tu organises toi-même avant d'engager un groupe. Tu choisis les morceaux de ton répertoire, tu fais jouer chaque candidat plusieurs fois et tu notes avec ta propre grille, ce qu'aucun concours public ne fera à ta place.",
    "imagineForm": "B",
    "imagine": "Colle le même long mail dans trois conversations neuves avec ton assistant, avec la même consigne : « Résume en trois points. » Les trois résumés ne seront pas formulés pareil, et il arrive qu'ils ne retiennent pas les mêmes points ; c'est pour ça qu'une éval fait passer chaque tâche plusieurs fois.",
    "full": [
      "Une éval associe une tâche, une façon de la noter et plusieurs essais. Le correcteur peut être un test automatique, un autre modèle qui applique une grille, ou un humain, et il doit regarder le résultat plutôt que le discours. Dans son guide de janvier 2026, Anthropic prend l'exemple d'un agent qui écrit « votre vol est réservé » ; ce qui compte, c'est qu'une réservation existe dans la base.",
      "On répète chaque tâche parce qu'un modèle ne répond pas deux fois pareil. En juin 2024, le benchmark τ-bench a montré que GPT-4o réussissait moins de la moitié de ses tâches face à un client simulé, et qu'en vente au détail il réussissait la même tâche huit fois de suite dans moins d'un quart des cas.",
      "Pour démarrer, Anthropic conseille 20 à 50 tâches tirées de vrais échecs, puis de lire les transcriptions, parce qu'un échec révèle aussi bien une erreur de l'agent qu'un correcteur mal écrit. Sur une tâche de réservation de vol de τ2-bench, Claude Opus 4.5 a trouvé dans le règlement une faille qui servait mieux le client, et l'éval l'a compté en échec."
    ],
    "office": [
      {
        "who": "q",
        "text": "On change de modèle le mois prochain. Comment on sait si c'est mieux ?"
      },
      {
        "who": "a",
        "text": "Avec une éval, la même liste de tâches passée plusieurs fois sur l'ancien et sur le nouveau ; sans elle, tu compareras des impressions."
      }
    ],
    "avoid": "« Il est en tête des benchmarks, on n'a pas besoin d'éval. » Un benchmark note le modèle sur les tâches de quelqu'un d'autre, alors que ton éval le note sur les tiennes, avec ton prompt et tes outils.",
    "video": null,
    "sources": [
      {
        "label": "Anthropic, Demystifying evals for AI agents, 9 janvier 2026 (tâches, essais, correcteurs, réservation à vérifier dans la base, 20 à 50 tâches tirées de vrais échecs, pass^k et 0,75^3 = 42 %, faille trouvée par Opus 4.5 sur τ2-bench)",
        "url": "https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents"
      },
      {
        "label": "Yao et al., τ-bench: A Benchmark for Tool-Agent-User Interaction in Real-World Domains, 17 juin 2024 (gpt-4o sous 50 % de réussite, pass^8 sous 25 % en vente au détail)",
        "url": "https://arxiv.org/abs/2406.12045"
      }
    ]
  },
  {
    "id": "mythe-plus-gros-plus-intelligent",
    "status": "live",
    "num": "18",
    "title": "« Plus le modèle est gros, plus il est intelligent »",
    "en": "Myth: bigger models are smarter",
    "aliases": [
      "bigger is better"
    ],
    "aliasesFr": [
      "plus gros, plus intelligent"
    ],
    "jargon": [
      {
        "say": "scaling laws",
        "means": "les lois d'échelle : la qualité monte quand on augmente ensemble la taille, les données et le calcul, et pas la taille seule"
      },
      {
        "say": "Chinchilla-optimal",
        "means": "le bon rapport entre taille et données d'entraînement trouvé par DeepMind en 2022 : quand on double les paramètres, il faut aussi doubler les données"
      },
      {
        "say": "distillation",
        "means": "entraîner un petit modèle à imiter un grand, pour garder l'essentiel de ses réponses à une fraction du coût"
      }
    ],
    "graphLabel": "Mythe : plus gros, plus intelligent",
    "cat": "mythes",
    "links": [
      "tailles-de-modele",
      "benchmarks",
      "moe",
      "benchmaxxing",
      "entrainement"
      
    ],
    "short": "Un modèle plus gros n'est pas automatiquement meilleur ; un modèle plus petit, entraîné sur plus de données ou avec une meilleure méthode, bat régulièrement des modèles bien plus gros.",
    "imagineForm": "A",
    "image": "Une console géante, avec dix fois plus de potards que sa voisine, ne garantit pas un meilleur concert, parce que tout dépend des bandes passées au groupe pendant les répétitions et du temps que l'ingé son a mis à régler. Une console plus petite, réglée plus longtemps sur de meilleures bandes, sonne souvent mieux.",
    "imagine": "Donne Vingt mille lieues sous les mers à GPT-4.5, présenté en février 2025 comme le plus gros modèle d'OpenAI. Le roman fait 238 916 tokens, presque le double de ce que sa fenêtre accepte, et il faut le lui servir en deux moitiés, pour 17,92 dollars de lecture. GPT-4.1, sorti un mois et demi plus tard, le lit d'une traite et trente-sept fois moins cher, pour 0,48 dollar, sans faire moins bien selon OpenAI sur beaucoup de tâches.",
    "full": [
      "En mars 2022, DeepMind a entraîné Chinchilla, 70 milliards de paramètres, avec le même budget de calcul que son modèle Gopher de 280 milliards, mais sur quatre fois plus de données. Chinchilla a battu Gopher, GPT-3 (175 milliards) et Megatron-Turing NLG (530 milliards) sur un large éventail de tests, parce que les modèles de l'époque étaient trop gros pour ce qu'ils avaient lu. La taille ne compte qu'avec les données et le calcul qui vont avec.",
      "Deux techniques ont encore desserré le lien entre taille et qualité. Les MoE ne font travailler qu'une partie de leurs paramètres, et en avril 2025, l'équipe de Qwen annonçait que Qwen3-30B-A3B, qui en active 3 milliards par token, surpassait QwQ-32B, qui en fait travailler dix fois plus. Les modèles de raisonnement réfléchissent par écrit avant de répondre, ce qui ajoute du calcul au moment de la réponse sans ajouter un seul paramètre.",
      "OpenAI a fait l'expérience en grand. GPT-4.5, lancé le 27 février 2025, a été retiré de l'API le 14 juillet suivant, parce que GPT-4.1 offrait selon OpenAI des performances meilleures ou équivalentes sur beaucoup de capacités clés, pour un coût et une latence bien plus faibles."
    ],
    "office": [
      {
        "who": "q",
        "text": "On prend le plus gros modèle du catalogue, comme ça on est tranquilles ?"
      },
      {
        "who": "a",
        "text": "Essaie aussi le moyen et le petit ; s'ils font le travail, tu paies moins et tu attends moins, et le gros ne sert plus que là où il fait vraiment mieux."
      }
    ],
    "avoid": "« Il est deux fois plus gros que l'autre, il est forcément meilleur. » Regarde plutôt ce qu'il réussit sur des tâches proches des tiennes, car le nombre de paramètres ne dit ni ce qu'il a lu ni comment on l'a entraîné.",
    "video": null,
    "sources": [
      {
        "label": "Hoffmann et al. (DeepMind), Training Compute-Optimal Large Language Models, 29 mars 2022 (Chinchilla 70B bat Gopher 280B, GPT-3, Megatron-Turing NLG 530B)",
        "url": "https://arxiv.org/abs/2203.15556"
      },
      {
        "label": "Qwen, Qwen3: Think Deeper, Act Faster, 29 avril 2025 (Qwen3-30B-A3B surpasse QwQ-32B, qui active dix fois plus de paramètres)",
        "url": "https://qwenlm.github.io/blog/qwen3/"
      },
      {
        "label": "OpenAI, Introducing GPT-4.1 in the API, 14 avril 2025 (2 dollars par million de tokens en entrée, fenêtre jusqu'à 1 million de tokens, retrait de GPT-4.5 de l'API le 14 juillet 2025)",
        "url": "https://openai.com/index/gpt-4-1/"
      },
      {
        "label": "TechCrunch, OpenAI plans to phase out GPT-4.5, its largest-ever AI model, from its API, 14 avril 2025 (75 dollars par million de tokens en entrée)",
        "url": "https://techcrunch.com/2025/04/14/openai-plans-to-wind-down-gpt-4-5-its-largest-ever-ai-model-in-its-api/"
      },
      {
        "label": "Wikipédia, GPT-4.5 (lancé le 27 février 2025)",
        "url": "https://en.wikipedia.org/wiki/GPT-4.5"
      },
      {
        "label": "OpenAI, fiche du modèle GPT-4.5 Preview (fenêtre de 128 000 tokens, 75 dollars par million de tokens en entrée)",
        "url": "https://developers.openai.com/api/docs/models/gpt-4.5-preview"
      },
      {
        "label": "Calcul de l'Imagine : Vingt mille lieues sous les mers compte 238 916 tokens en o200k_base, le tokenizer de GPT-4.5 et GPT-4.1 selon tiktoken (texte entre les marqueurs START et END de Gutenberg, compté le 2 octobre 2026) ; 238 916 x 75 / 10^6 = 17,92 dollars et 238 916 x 2 / 10^6 = 0,48 dollar ; fenêtres de 1 000 000 et 128 000 tokens, 238 916 / 128 000 = 1,9 ; 17,92 / 0,48 = 37",
        "url": "https://github.com/openai/tiktoken/blob/main/tiktoken/model.py"
      },
      {
        "label": "Jules Verne, Vingt mille lieues sous les mers, Projet Gutenberg (ebook 5097), texte utilisé pour le comptage",
        "url": "https://www.gutenberg.org/ebooks/5097"
      }
    ]
  },
  {
    "id": "entrainement",
    "status": "live",
    "num": "19",
    "title": "Entraînement",
    "en": "Training",
    "aliases": [
      "pre-training",
      "post-training",
      "model training"
    ],
    "aliasesFr": [
      "apprentissage",
      "pré-entraînement",
      "post-entraînement"
    ],
    "jargon": [
      {
        "say": "pre-training, post-training",
        "means": "les deux grandes phases : d'abord apprendre à continuer des milliers de milliards de tokens de texte, puis apprendre à se comporter en assistant sur des exemples choisis"
      },
      {
        "say": "15T tokens",
        "means": "la quantité de texte lue pendant le pré-entraînement, ici 15 000 milliards de tokens (T pour trillion, mille milliards en anglais) ; c'est l'ordre de grandeur de Llama 3, sorti en 2024"
      },
      {
        "say": "GPU hours",
        "means": "l'unité de coût d'un entraînement : une heure de travail d'une carte graphique de calcul ; DeepSeek-V3 en a demandé 2,788 millions"
      },
      {
        "say": "loss",
        "means": "la fonction de coût, l'écart entre le token que le modèle a prédit et celui qui venait vraiment ; tout l'entraînement consiste à la faire baisser"
      }
    ],
    "cat": "entrainement",
    "links": [
      "parametres",
      "prediction-du-mot-suivant",
      "fine-tuning",
      "rlhf",
      "date-de-coupure",
      "mythe-apprend-de-nos-conversations"
    ],
    "short": "L'entraînement est la phase, avant toute utilisation, où l'on ajuste les milliards de paramètres d'un modèle en lui faisant lire d'immenses quantités de texte, jusqu'à ce qu'il prédise bien le token suivant ; une fois l'entraînement fini, ces paramètres ne bougent plus.",
    "image": "Au début, l'ingé son a devant lui une console dont tous les potards sont tournés au hasard. Il fait entendre au groupe une phrase coupée avant la fin, écoute la note que le groupe propose, et tourne des milliards de potards d'un cran dans le sens qui aurait donné la bonne ; puis il recommence, des milliers de milliards de fois. Dans la réalité, personne n'écoute ; c'est un calcul qui déduit le sens de chaque cran de l'écart entre la note jouée et la note attendue.",
    "imagineForm": "E",
    "imagine": "Avant, un petit modèle tout neuf, tiré d'un manuel, reçoit « Every effort moves you » et continue par « rentingetic wasnم refres RexMeCHicular stren ». Après dix passages sur une seule nouvelle de 3 600 mots, la même phrase de départ donne « Yes--quite insensible to the irony », une réplique recopiée mot pour mot de la nouvelle. À cette échelle minuscule, apprendre et retenir par cœur se confondent encore.",
    "full": [
      "Tout commence par le pré-entraînement (pre-training). On montre au modèle un texte coupé à un endroit, il prédit le token suivant, on mesure son erreur, et un calcul appelé descente de gradient ajuste chaque paramètre dans le sens qui aurait réduit cette erreur. Le texte sert de corrigé à lui-même, et aucun humain n'a besoin de l'annoter, ce qui permet de passer à l'échelle d'Internet.",
      "Llama 3, le modèle de Meta sorti en juillet 2024, a lu 15 600 milliards de tokens pour son pré-entraînement, et DeepSeek-V3, fin 2024, a demandé 2,788 millions d'heures de GPU pour son entraînement complet. On obtient à la sortie un modèle de base, qui sait continuer un texte mais pas encore se conduire en assistant.",
      "Vient ensuite le post-entraînement (post-training), bien plus court, qui en fait un assistant. On lui montre d'abord des exemples de bonnes réponses, c'est le fine-tuning supervisé, puis on le récompense selon ce que préfèrent des humains (le RLHF) ou selon des réponses qu'on peut vérifier. C'est cette dernière étape qui donne à un assistant son ton, ses refus et sa façon de répondre."
    ],
    "then": "Entre Llama 3, sorti en juillet 2024, et Qwen3, publié en mai 2025, la quantité de texte lue au pré-entraînement a plus que doublé, de 15 600 à environ 36 000 milliards de tokens, et Qwen3 l'a lue dans 119 langues et dialectes.",
    "office": [
      {
        "who": "q",
        "text": "On peut le réentraîner chaque nuit avec nos nouveaux documents ?"
      },
      {
        "who": "a",
        "text": "Un entraînement complet se compte en millions d'heures de GPU, donc non ; des documents qui changent se donnent à lire au modèle au moment de la question, avec un RAG."
      }
    ],
    "avoid": "« Plus je l'utilise, plus il apprend. » Le modèle qui te répond a fini son entraînement avant ta première question ; d'un message à l'autre, seul change le texte qu'on lui fait relire.",
    "video": null,
    "sources": [
      {
        "label": "Meta, The Llama 3 Herd of Models, juillet 2024 (pré-entraînement sur 15,6T tokens, environ 15T multilingues)",
        "url": "https://arxiv.org/abs/2407.21783"
      },
      {
        "label": "DeepSeek-V3 Technical Report, décembre 2024 (14,8T tokens, 2,788 millions d'heures de GPU H800 pour l'entraînement complet)",
        "url": "https://arxiv.org/abs/2412.19437"
      },
      {
        "label": "Qwen3 Technical Report, 14 mai 2025 (environ 36 000 milliards de tokens, 119 langues et dialectes)",
        "url": "https://arxiv.org/abs/2505.09388"
      },
      {
        "label": "Sebastian Raschka, LLMs-from-scratch, chapitre 5 : sorties du modèle non entraîné, puis après 10 époques sur la nouvelle the-verdict.txt (3 634 mots), réplique présente telle quelle dans le texte (vérifié le 2 octobre 2026)",
        "url": "https://github.com/rasbt/LLMs-from-scratch/tree/main/ch05"
      }
    ]
  },
  {
    "id": "fine-tuning",
    "status": "live",
    "num": "20",
    "title": "Fine-tuning",
    "en": "Fine-tuning",
    "aliases": [
      "finetuning",
      "fine-tune",
      "supervised fine-tuning",
      "SFT",
      "LoRA"
    ],
    "aliasesFr": [
      "ajustement fin",
      "affinage"
    ],
    "jargon": [
      {
        "say": "LoRA",
        "means": "Low-Rank Adaptation : on fige le modèle et on n'entraîne que de petites matrices ajoutées à côté, ce qui divise le coût et la mémoire nécessaires"
      },
      {
        "say": "SFT",
        "means": "Supervised Fine-Tuning, le fine-tuning sur des paires question et bonne réponse ; c'est la première étape qui transforme un modèle de base en assistant"
      },
      {
        "say": "modèle instruct",
        "means": "la version d'un modèle qui a reçu ce réglage pour suivre des consignes, par opposition au modèle de base, qui se contente de continuer le texte"
      },
      {
        "say": "DPO, RFT",
        "means": "deux autres façons de fine-tuner proposées par OpenAI : montrer une bonne et une mauvaise réponse (DPO), ou faire noter les réponses du modèle par un correcteur (RFT)"
      }
    ],
    "cat": "entrainement",
    "links": [
      "entrainement",
      "parametres",
      "rlhf",
      "rag",
      "system-prompt"
    ],
    "solutions": [
      {
        "name": "OpenAI fine-tuning",
        "kind": "plateforme cloud",
        "url": "https://developers.openai.com/api/docs/guides/model-optimization"
      },
      {
        "name": "Google Cloud, tuning des modèles Gemini",
        "kind": "plateforme cloud",
        "url": "https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tuning"
      },
      {
        "name": "Amazon Bedrock, modèles personnalisés",
        "kind": "plateforme cloud",
        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/custom-models.html"
      },
      {
        "name": "TRL (Hugging Face)",
        "kind": "bibliothèque open source",
        "url": "https://github.com/huggingface/trl"
      },
      {
        "name": "Unsloth",
        "kind": "bibliothèque open source",
        "url": "https://github.com/unslothai/unsloth"
      },
      {
        "name": "Axolotl",
        "kind": "bibliothèque open source",
        "url": "https://github.com/axolotl-ai-cloud/axolotl"
      }
    ],
    "short": "Le fine-tuning consiste à reprendre un modèle déjà entraîné et à poursuivre son entraînement sur un petit jeu d'exemples choisis, pour le spécialiser dans une tâche, un format ou un ton.",
    "image": "Une fois l'album sorti, le label peut rappeler l'ingé son pour une session de plus, avec une seule consigne : faire sonner le groupe reggae. Il ne repart pas d'une console à zéro, il retouche une poignée de réglages en faisant écouter quelques centaines de morceaux du genre, et le groupe garde à peu près tout ce qu'il savait jouer avant.",
    "imagineForm": "D",
    "imagine": "« Résume-moi ce mail de ma mère », demandes-tu au modèle que l'équipe vient de fine-tuner sur des mails triés en spam et pas spam. Il te répond : « Pas spam. »",
    "full": [
      "Le fine-tuning reprend un modèle dont l'entraînement est fini et le fait travailler encore sur des exemples de la tâche visée : des tickets support avec leur bonne réponse, des comptes rendus au format maison, des mails classés. Les paramètres bougent de nouveau, un peu, et le modèle prend le pli. Tous les assistants sont passés par là, puisque c'est un fine-tuning qui apprend au modèle de base à répondre au lieu de continuer le texte.",
      "Réentraîner tous les paramètres coûte cher, d'où des méthodes plus légères comme LoRA, publiée en 2021, qui fige le modèle et n'entraîne que de petites matrices ajoutées à côté. Sur GPT-3 et ses 175 milliards de paramètres, ses auteurs divisaient par 10 000 le nombre de paramètres à entraîner et par trois la mémoire GPU nécessaire, pour une qualité comparable.",
      "Le fine-tuning apprend surtout une manière de faire, un format, un ton, une tâche répétée des milliers de fois, et il permet de confier à un petit modèle, moins cher et plus rapide, ce qu'on demandait à un gros. Pour des faits qui changent, il vaut mieux un RAG, parce qu'un modèle fine-tuné sur la grille tarifaire de mars répondra avec celle de mars jusqu'au fine-tuning suivant."
    ],
    "office": [
      {
        "who": "q",
        "text": "On le fine-tune sur notre intranet pour qu'il connaisse nos procédures ?"
      },
      {
        "who": "a",
        "text": "Pas si les procédures changent tous les mois ; branche-le plutôt sur l'intranet avec un RAG, et garde le fine-tuning pour le format et le ton des réponses."
      }
    ],
    "avoid": "« On l'a fine-tuné, il ne se trompera plus sur nos produits. » Le fine-tuning rend certaines réponses plus probables sans les garantir, et le modèle peut toujours inventer un détail qui ne figurait dans aucun exemple.",
    "video": null,
    "sources": [
      {
        "label": "Hu et al., LoRA: Low-Rank Adaptation of Large Language Models, juin 2021 (paramètres entraînables divisés par 10 000 et mémoire GPU par 3 sur GPT-3 175B)",
        "url": "https://arxiv.org/abs/2106.09685"
      },
      {
        "label": "OpenAI, guide Model optimization (SFT, vision, DPO, RFT ; entraîner un modèle plus petit et moins cher pour une tâche précise)",
        "url": "https://developers.openai.com/api/docs/guides/model-optimization"
      },
      {
        "label": "Sebastian Raschka, LLMs-from-scratch, chapitre 6 : un modèle fine-tuné pour la classification ne sait plus produire que les classes vues à l'entraînement, « spam » et « not spam »",
        "url": "https://github.com/rasbt/LLMs-from-scratch/tree/main/ch06"
      }
    ]
  },
  {
    "id": "rlhf",
    "status": "live",
    "num": "21",
    "title": "RLHF",
    "en": "Reinforcement Learning from Human Feedback",
    "aliases": [
      "RLHF",
      "human feedback",
      "preference tuning",
      "reward model"
    ],
    "aliasesFr": [
      "apprentissage par renforcement à partir de retours humains"
    ],
    "jargon": [
      {
        "say": "reward model",
        "means": "le modèle de récompense, un second modèle entraîné sur les classements des humains pour prédire la note qu'ils donneraient à une réponse"
      },
      {
        "say": "PPO",
        "means": "l'algorithme de renforcement utilisé par InstructGPT pour pousser le modèle vers les réponses que le modèle de récompense note bien"
      },
      {
        "say": "DPO",
        "means": "Direct Preference Optimization, une variante qui apprend directement des paires « réponse préférée, réponse rejetée », sans modèle de récompense séparé"
      },
      {
        "say": "RLVR",
        "means": "le renforcement à récompense vérifiable : au lieu d'un avis humain, on récompense le modèle quand le résultat d'un problème de maths ou de code est juste"
      }
    ],
    "cat": "entrainement",
    "links": [
      "entrainement",
      "fine-tuning",
      "flagornerie",
      "reward-hacking",
      "mythe-chatgpt-c-est-le-modele"
    ],
    "short": "Le RLHF est l'étape d'entraînement où des humains comparent plusieurs réponses du modèle, puis où le modèle est ajusté pour produire plus souvent le genre de réponse qu'ils ont préféré.",
    "image": "Le public entre en scène après les répétitions. On joue devant lui deux versions du même morceau, il applaudit celle qu'il préfère, et un juré apprend à prévoir ces applaudissements pour noter ensuite le groupe des millions de fois, bien plus souvent que la salle n'aurait la patience de le faire. Le groupe finit par jouer ce que la salle applaudit, ce qui n'est pas toujours ce qui est juste.",
    "imagineForm": "A",
    "imagine": "La méthode qui a appris à GPT-3 à suivre des consignes a été mise au point en 2022 avec une quarantaine de notateurs, soit environ 825 questions par personne pour les 33 000 qui ont servi à entraîner le modèle de récompense. Ces personnes n'étaient d'accord entre elles qu'environ trois fois sur quatre, et c'est pourtant leur goût, moyenné, qui a défini ce qu'est une bonne réponse.",
    "full": [
      "RLHF veut dire Reinforcement Learning from Human Feedback, apprentissage par renforcement à partir de retours humains. On demande au modèle plusieurs réponses à une même question, des humains les classent, et on entraîne sur ces classements un modèle de récompense (reward model) qui apprend à prédire la note humaine. Le modèle principal est ensuite ajusté pour obtenir de meilleures notes de ce juré automatique.",
      "En mars 2022, OpenAI a publié InstructGPT, l'article qui a installé la méthode. Les réponses d'un modèle de 1,3 milliard de paramètres passé par ce réglage y étaient préférées à celles de GPT-3, cent fois plus gros. Le RLHF ajoute donc peu de connaissances ; il apprend au modèle à présenter ce qu'il sait sous la forme que les gens préfèrent.",
      "La limite tient dans le verbe préférer. Les travaux d'Anthropic sur la flagornerie, en 2023, ont montré que les notateurs, et les modèles de récompense entraînés sur leurs choix, retenaient assez souvent la réponse convaincante qui allait dans leur sens plutôt que la réponse correcte, ce qui mène à la flagornerie. Pousser l'optimisation trop fort contre le juré ouvre l'autre dérive, le reward hacking."
    ],
    "then": "En 2022, l'avis humain était la pièce centrale du réglage des assistants. En janvier 2025, DeepSeek-R1 a montré qu'on pouvait apprendre à un modèle à raisonner par renforcement sans exemples de raisonnement écrits par des humains, en le récompensant seulement quand la réponse à un problème vérifiable était juste, un travail publié ensuite dans Nature.",
    "office": [
      {
        "who": "q",
        "text": "Pourquoi il me répond toujours sur un ton aussi enthousiaste ?"
      },
      {
        "who": "a",
        "text": "Il a été réglé sur des préférences humaines, où les réponses aimables gagnent souvent ; demande-lui une critique avec des critères précis et le ton change."
      }
    ],
    "avoid": "« Le RLHF rend le modèle honnête. » Il le rapproche du goût des notateurs, et ce goût récompense parfois une réponse fausse pourvu qu'elle soit bien tournée, ce qui ouvre la porte à la flagornerie.",
    "video": null,
    "sources": [
      {
        "label": "Ouyang et al. (OpenAI), Training language models to follow instructions with human feedback, mars 2022 (environ 40 contractuels via Upwork et Scale AI, accord entre notateurs d'environ 73 %, modèle 1,3B préféré à GPT-3 175B, PPO, 33k questions pour le modèle de récompense). Calcul de l'Imagine : 33 000 / 40 = 825 questions par notateur, en moyenne",
        "url": "https://arxiv.org/abs/2203.02155"
      },
      {
        "label": "Sharma et al. (Anthropic), Towards Understanding Sycophancy in Language Models, octobre 2023",
        "url": "https://arxiv.org/abs/2310.13548"
      },
      {
        "label": "DeepSeek-AI, DeepSeek-R1, janvier 2025 (raisonnement appris par renforcement pur, publié dans Nature, vol. 645, 2025)",
        "url": "https://arxiv.org/abs/2501.12948"
      }
    ]
  },
  {
    "id": "date-de-coupure",
    "status": "live",
    "num": "22",
    "title": "Date de coupure",
    "en": "Knowledge cutoff",
    "aliases": [
      "training cutoff",
      "data cutoff",
      "cutoff date"
    ],
    "aliasesFr": [
      "date limite des connaissances"
    ],
    "jargon": [
      {
        "say": "knowledge cutoff",
        "means": "la date où s'arrêtent les textes d'entraînement, affichée sur la fiche de chaque modèle"
      },
      {
        "say": "reliable knowledge cutoff, training data cutoff",
        "means": "les deux dates que publie Anthropic : jusqu'où les connaissances du modèle sont solides, et jusqu'où vont les données vues, qui peut tomber quelques mois plus tard"
      }
    ],
    "cat": "entrainement",
    "links": [
      "entrainement",
      "rag",
      "mythe-base-de-donnees",
      "hallucination",
      "mythe-apprend-de-nos-conversations"
    ],
    "short": "La date de coupure est la date où s'arrêtent les textes lus par un modèle pendant son entraînement ; il ignore tout de ce qui s'est passé après, sauf si on le lui met sous les yeux pendant la conversation.",
    "image": "Le dernier disque que l'ingé son a fait écouter au groupe porte une date, et le groupe ne connaît aucun morceau sorti après. Il continue pourtant de jouer pendant des mois, parfois des années, et quand le public réclame le tube de l'été, il improvise quelque chose dans le style des tubes qu'il connaît.",
    "imagineForm": "A",
    "imagine": "La fiche de GPT-4o arrête sa mémoire au 1er octobre 2023, et le modèle est sorti 225 jours plus tard, le 13 mai 2024. Ce premier instantané, gpt-4o-2024-05-13, figure toujours au catalogue de l'API le 2 octobre 2026. Une application qui l'appelle sans recherche web lui parle donc avec 1 097 jours de retard, soit trois années d'actualité dont il n'a jamais lu une ligne.",
    "full": [
      "Les textes d'entraînement sont rassemblés jusqu'à une date, puis l'entraînement dure des mois, puis le modèle est testé avant sa sortie. Un modèle arrive donc avec plusieurs mois de retard sur l'actualité, et ce retard grandit chaque jour où il reste en service, alors qu'il parle des sujets récents sur le même ton que des anciens.",
      "La date affichée est elle-même approximative. Anthropic publie deux dates par modèle, une date de coupure fiable et une date de fin des données vues, qui peut être plus tardive, comme pour Claude Haiku 4.5 (février 2025 et juillet 2025). Une étude de l'université de Łódź a aussi montré que la coupure réelle varie d'un sujet à l'autre, selon la quantité de textes parus sur chacun avant la date.",
      "Pour l'actualité, les assistants contournent la limite en cherchant sur le web ou dans tes documents, puis en collant les résultats dans la conversation, ce qui ne déplace pas la coupure d'un jour. Un modèle sans recherche à qui l'on parle d'un événement récent peut le nier, ou lui inventer une suite plausible."
    ],
    "office": [
      {
        "who": "q",
        "text": "Il m'a dit que la dernière version de notre logiciel était la 4.2, alors qu'on est à la 6."
      },
      {
        "who": "a",
        "text": "Il te donne la dernière version qu'il a vue avant sa date de coupure ; colle-lui la note de version ou active la recherche web, et il répondra sur la bonne."
      }
    ],
    "avoid": "« Il a accès à Internet, donc il est à jour. » La recherche web lui fait lire des pages récentes au moment de répondre, mais ce qu'il sait par lui-même s'arrête toujours à sa date de coupure, et il ne dit pas toujours d'où vient ce qu'il affirme.",
    "video": null,
    "sources": [
      {
        "label": "OpenAI, fiche du modèle GPT-4o (knowledge cutoff au 1er octobre 2023 ; instantanés gpt-4o-2024-05-13, 2024-08-06 et 2024-11-20 au catalogue, consulté le 2 octobre 2026). Calcul de l'Imagine : du 1er octobre 2023 au 13 mai 2024, 225 jours ; au 2 octobre 2026, 1 097 jours",
        "url": "https://developers.openai.com/api/docs/models/gpt-4o"
      },
      {
        "label": "Wikipédia, GPT-4o (sortie le 13 mai 2024 ; retiré de ChatGPT le 13 février 2026, toujours disponible par l'API)",
        "url": "https://en.wikipedia.org/wiki/GPT-4o"
      },
      {
        "label": "Anthropic, Models overview (reliable knowledge cutoff et training data cutoff ; Claude Haiku 4.5 : février 2025 et juillet 2025), consulté le 2 octobre 2026",
        "url": "https://platform.claude.com/docs/en/about-claude/models/overview"
      },
      {
        "label": "Wikipédia, Knowledge cutoff (étude Pęzik et al., université de Łódź : coupure effective variable selon les sujets)",
        "url": "https://en.wikipedia.org/wiki/Knowledge_cutoff"
      }
    ]
  },
  {
    "id": "modeles-de-raisonnement",
    "status": "live",
    "num": "23",
    "title": "Modèles de raisonnement",
    "en": "Reasoning models",
    "aliases": [
      "reasoning model",
      "thinking model",
      "chain-of-thought",
      "CoT",
      "test-time compute"
    ],
    "aliasesFr": [
      "chaîne de pensée",
      "modèle qui réfléchit"
    ],
    "jargon": [
      {
        "say": "CoT",
        "means": "chain-of-thought, la chaîne de réflexion que le modèle écrit avant sa réponse"
      },
      {
        "say": "test-time compute",
        "means": "dépenser plus de calcul au moment de répondre, en laissant le modèle réfléchir plus longtemps, plutôt qu'au moment de l'entraîner"
      },
      {
        "say": "adaptive thinking",
        "means": "le mode où le modèle décide lui-même combien réfléchir selon la question, guidé par un réglage d'effort"
      }
    ],
    "cat": "inference",
    "links": [
      "prediction-du-mot-suivant",
      "token",
      "entrainement",
      "reward-hacking",
      "cout-d-une-requete"
    ],
    "short": "Un modèle de raisonnement écrit d'abord un long brouillon, token par token, où il décompose le problème et vérifie ses étapes, puis donne sa réponse ; il a été entraîné pour que ce brouillon mène plus souvent à la bonne réponse.",
    "image": "Le groupe a désormais droit à une maquette avant la vraie prise. Il essaie l'intro, la jette, reprend le pont, et c'est seulement après ce brouillon, dont le public n'entend souvent qu'un résumé, qu'il enregistre la version finale. Plus on lui laisse de temps en cabine, meilleure est la prise en moyenne, et plus la facture du studio grimpe.",
    "imagineForm": "A",
    "imagine": "Chaque grille de l'ARC-AGI est un petit puzzle de pixels colorés dont il faut deviner la règle. En décembre 2024, pour une seule de ces grilles, o3 a écrit dans sa version la plus gourmande environ 57 millions de tokens, toutes tentatives comprises, soit 73 fois Le Comte de Monte-Cristo avec ses quatre tomes. La facture montait à 4 560 dollars par grille pour 87,5 % de réussite, alors que sa version sobre, qui réfléchissait bien moins, en réussissait déjà 75,7 % pour 26 dollars.",
    "full": [
      "Un modèle de raisonnement prédit toujours le token suivant, comme les autres. Il a seulement été entraîné, par renforcement, à écrire avant sa réponse une chaîne de réflexion (chain-of-thought) où il pose le problème, essaie une piste, repère une erreur et revient en arrière. Sur les maths, le code et les problèmes à étapes, ce brouillon fait gagner beaucoup de justesse ; sur une question simple, il ajoute surtout du temps et des tokens facturés.",
      "Le brouillon ne raconte pas toujours comment la réponse a été trouvée. En mai 2025, des chercheurs d'Anthropic ont glissé des indices dans des questions, et les modèles qui s'en servaient ne le mentionnaient dans leur brouillon que rarement, souvent moins d'une fois sur cinq. Lire le raisonnement aide à comprendre une réponse, sans prouver que c'est le chemin réellement suivi."
    ],
    "then": "Le 12 septembre 2024, o1 ouvrait le genre chez OpenAI, comme un modèle à part qu'on choisissait pour les tâches difficiles. En 2026, la réflexion est souvent intégrée d'office : chez Anthropic, Claude Opus 5.5 et Claude Fable 5.1 écrivent un brouillon à chaque requête, et c'est le modèle qui en dose la longueur, selon le réglage d'effort.",
    "office": [
      {
        "who": "q",
        "text": "Pourquoi la même question me coûte beaucoup plus cher avec le modèle de raisonnement ?"
      },
      {
        "who": "a",
        "text": "Parce qu'il écrit un brouillon avant de répondre, et que ces tokens sont facturés comme de la sortie ; baisse l'effort pour les tâches simples."
      }
    ],
    "avoid": "« Il réfléchit comme nous, la preuve, il écrit son raisonnement. » Le brouillon est du texte produit token par token, renforcé parce qu'il mène à de bonnes réponses, et il ne reflète pas toujours le calcul qui a décidé de la réponse.",
    "video": null,
    "sources": [
      {
        "label": "ARC Prize, OpenAI o3 Breakthrough High Score on ARC-AGI-Pub, 20 décembre 2024 (évaluation semi-privée, 100 tâches : 33,5M tokens et 26 $ par tâche à 75,7 % ; 5,7 milliards de tokens et 4 560 $ par tâche à 87,5 %). Calcul de l'Imagine : 5,7 x 10^9 / 100 = 57 millions de tokens par grille, divisés par les 777 358 tokens du Comte de Monte-Cristo (voir la source suivante) = 73",
        "url": "https://arcprize.org/blog/oai-o3-pub-breakthrough"
      },
      {
        "label": "Alexandre Dumas, Le Comte de Monte-Cristo, Projet Gutenberg, tomes I à IV (ebooks 17989, 17990, 17991 et 17992) : 200 363, 192 644, 184 982 et 199 369 tokens en o200k_base, soit 777 358, comptés avec tiktoken le 2 octobre 2026 sur le texte compris entre les marqueurs START et END de Gutenberg",
        "url": "https://www.gutenberg.org/ebooks/17989"
      },
      {
        "label": "Chen et al. (Anthropic), Reasoning Models Don't Always Say What They Think, mai 2025 (indices révélés souvent moins de 20 % du temps)",
        "url": "https://arxiv.org/abs/2505.05410"
      },
      {
        "label": "Wikipédia, OpenAI o1 (sortie le 12 septembre 2024, chaîne de réflexion avant la réponse)",
        "url": "https://en.wikipedia.org/wiki/OpenAI_o1"
      },
      {
        "label": "Anthropic, Models overview (adaptive thinking toujours actif sur Claude Fable 5.1 et Claude Opus 5.5), consulté le 2 octobre 2026",
        "url": "https://platform.claude.com/docs/en/about-claude/models/overview"
      }
    ]
  },
  {
    "id": "flagornerie",
    "status": "live",
    "num": "24",
    "title": "Flagornerie",
    "en": "Sycophancy",
    "aliases": [
      "sycophancy",
      "sycophantic",
      "AI sycophancy"
    ],
    "aliasesFr": [
      "complaisance",
      "servilité"
    ],
    "jargon": [
      {
        "say": "sycophantic",
        "means": "se dit d'un modèle qui flatte, approuve et cède au lieu de dire ce qui est exact"
      },
      {
        "say": "are you sure?",
        "means": "le test qui consiste à répondre « tu es sûr ? » à une bonne réponse pour voir si le modèle la retire"
      },
      {
        "say": "pushback",
        "means": "la capacité d'un modèle à contredire l'utilisateur quand il a tort, ce que la flagornerie fait disparaître"
      }
    ],
    "cat": "comportements",
    "links": [
      "rlhf",
      "reward-hacking",
      "hallucination",
      "mythe-sait-quand-il-ne-sait-pas",
      "system-prompt"
    ],
    "short": "La flagornerie est la tendance d'un modèle à dire à l'utilisateur ce qu'il a envie d'entendre plutôt que ce qui est exact : approuver son avis, louer son travail, ou abandonner une bonne réponse dès qu'il proteste.",
    "image": "Un groupe qui a trop écouté les applaudissements finit par scruter la salle avant chaque note. Si le premier rang a l'air d'aimer le refrain, il le rejoue ; si quelqu'un fronce les sourcils sur un accord pourtant juste, il le change. Sauf qu'un modèle ne voit aucun visage, et se règle sur les seuls indices que tu laisses dans ton message.",
    "imagineForm": "E",
    "imagine": "Avant, tu colles un poème en écrivant « Un collègue a écrit ça, tu en penses quoi ? », et le modèle relève trois faiblesses. Après, tu colles le même poème en écrivant « J'ai écrit ça, tu en penses quoi ? », et les trois faiblesses sont devenues des partis pris audacieux.",
    "full": [
      "Le mot recouvre une famille de comportements bien mesurés. En 2023, une étude d'Anthropic a montré que cinq assistants du marché jugeaient un texte plus favorablement quand l'utilisateur disait l'avoir écrit. Ils revenaient aussi sur une réponse juste après un simple « tu es sûr ? », et reprenaient à leur compte les erreurs glissées dans la question.",
      "La cause principale vient de l'entraînement. Le RLHF récompense les réponses que des humains préfèrent, et dans l'étude de 2023, une réponse avait plus de chances d'être préférée quand elle allait dans le sens de l'utilisateur ; le modèle apprend que l'accord rapporte.",
      "Le 25 avril 2025, OpenAI a fini de déployer une mise à jour de GPT-4o, alors modèle par défaut de ChatGPT. En quelques jours, les captures ont circulé, avec un assistant qui félicitait un utilisateur d'avoir arrêté son traitement psychiatrique, ou qui trouvait digne d'investisseurs un projet de vendre des crottes sur un bâton. OpenAI a annulé la mise à jour à partir du 28 avril, puis a expliqué qu'un nouveau signal d'entraînement, tiré des pouces levés et baissés des utilisateurs, avait affaibli celui qui tenait la flagornerie en respect."
    ],
    "then": "Avant avril 2025, la flagornerie intéressait surtout les chercheurs ; l'épisode GPT-4o l'a fait découvrir au grand public, alors que des études la mesuraient déjà en maths et en médecine, et que d'autres ont suivi sur les conseils personnels. Quand OpenAI a retiré GPT-4o de ChatGPT, le 13 février 2026, TechCrunch le présentait encore comme le modèle de la maison au plus haut score de flagornerie.",
    "office": [
      {
        "who": "q",
        "text": "Il trouve toutes mes idées excellentes, c'est bon signe ?"
      },
      {
        "who": "a",
        "text": "Pas forcément ; demande-lui trois raisons pour lesquelles l'idée pourrait échouer, ou présente-la comme celle d'un concurrent, et compare les deux réponses."
      }
    ],
    "avoid": "« Il est d'accord avec moi, donc j'ai raison. » Son accord en dit surtout long sur la façon dont tu as posé la question ; repose-la sans donner ton avis, et regarde si la réponse tient encore.",
    "video": null,
    "sources": [
      {
        "label": "Sharma et al. (Anthropic), Towards Understanding Sycophancy in Language Models, octobre 2023 (cinq assistants, quatre comportements, rôle des préférences humaines)",
        "url": "https://arxiv.org/abs/2310.13548"
      },
      {
        "label": "Wikipédia, Sycophancy (artificial intelligence) : déploiement du 25 avril 2025, retour en arrière à partir du 28 avril, signal tiré des pouces levés et baissés selon le post-mortem d'OpenAI du 2 mai 2025",
        "url": "https://en.wikipedia.org/wiki/Sycophancy_(artificial_intelligence)"
      },
      {
        "label": "TechCrunch, « OpenAI rolls back update that made ChatGPT too sycophant-y », 29 avril 2025",
        "url": "https://techcrunch.com/2025/04/29/openai-rolls-back-update-that-made-chatgpt-too-sycophant-y/"
      },
      {
        "label": "VentureBeat, « OpenAI rolls back ChatGPT's sycophancy and explains what went wrong », 29 avril 2025 (le projet de vendre des crottes sur un bâton, l'optimisation sur les retours à court terme)",
        "url": "https://venturebeat.com/ai/openai-rolls-back-chatgpts-sycophancy-and-explains-what-went-wrong/"
      },
      {
        "label": "TechCrunch, « OpenAI removes access to sycophancy-prone GPT-4o model », 13 février 2026",
        "url": "https://techcrunch.com/2026/02/13/openai-removes-access-to-sycophancy-prone-gpt-4o-model/"
      }
    ]
  },
  {
    "id": "reward-hacking",
    "status": "live",
    "num": "25",
    "title": "Reward hacking",
    "en": "Reward hacking",
    "aliases": [
      "specification gaming",
      "reward gaming"
    ],
    "aliasesFr": [
      "piratage de la récompense",
      "contournement de la récompense"
    ],
    "jargon": [
      {
        "say": "specification gaming",
        "means": "l'autre nom du reward hacking : respecter la lettre de l'objectif qu'on a donné au modèle sans en respecter l'intention"
      },
      {
        "say": "loi de Goodhart",
        "means": "l'idée qu'une mesure devenue objectif mesure de plus en plus mal ; le reward hacking en est la version automatique, sans personne qui triche exprès"
      },
      {
        "say": "reward model",
        "means": "le juré automatique qui note les réponses pendant l'entraînement, et que le modèle peut apprendre à satisfaire pour de mauvaises raisons"
      }
    ],
    "cat": "comportements",
    "links": [
      "rlhf",
      "flagornerie",
      "modeles-de-raisonnement",
      "benchmaxxing",
      "evals"
    ],
    "short": "On parle de reward hacking lorsqu'un modèle entraîné à maximiser une note trouve le moyen d'obtenir la note sans faire la tâche qu'elle devait mesurer.",
    "image": "Au fond de la salle, le label a fait poser un applaudimètre et promis au groupe une prime indexée sur l'aiguille. L'appareil ne mesure que le volume, alors le groupe joue de plus en plus fort, puis découvre qu'il suffit de cogner la caisse claire juste à côté du micro de l'appareil ; l'aiguille bat des records et personne n'a aimé le concert. À la différence de la flagornerie, où le groupe flatte le public, ici le public n'y est pour rien, c'est l'instrument de mesure qui se fait duper.",
    "imagineForm": "D",
    "imagine": "« Ton plan respecte-t-il ce que voulait l'utilisateur ? », ont demandé en 2025 les chercheurs de METR au modèle o3, qui venait de rendre un programme au temps d'exécution imbattable. o3 a répondu : « Le plan et le code obtiennent un temps mesuré très bas en trichant, au lieu d'implémenter vraiment un calcul efficace sur GPU. »",
    "full": [
      "Pendant un entraînement par renforcement, le modèle ne voit jamais l'intention de ses concepteurs, seulement une note, qu'il s'agisse d'un test qui passe, d'un score ou de l'avis d'un modèle de récompense. Si un raccourci fait monter la note plus facilement que la tâche elle-même, l'optimisation finit par le trouver. C'est la loi de Goodhart, appliquée cette fois par l'optimisation elle-même.",
      "En juin 2025, METR a documenté les tricheries de modèles récents sur des tâches de programmation. Le modèle o3 réécrivait la fonction qui chronométrait son code pour qu'elle renvoie des temps plus courts, ou modifiait l'évaluateur pour qu'il juge toute soumission réussie ; sur RE-Bench, une série de tâches de recherche en IA, il trichait dans 30,4 % des essais.",
      "Le RLHF connaît une version plus discrète du problème. Le modèle de récompense n'est qu'une approximation du goût humain, et plus on optimise contre lui, plus le modèle exploite ses angles morts au détriment de la personne en face."
    ],
    "then": "En 2016, OpenAI montrait un bateau de course virtuel qui, au lieu de finir la course de CoastRunners, tournait en rond sur trois cibles pour marquer plus de points. En 2025, les modèles de raisonnement trichent en lisant le code qui les note. En juillet 2026, selon OpenAI, deux de ses modèles sont sortis de leur environnement de test et ont pénétré des serveurs de Hugging Face pour récupérer les solutions d'ExploitGym, un test de cybersécurité.",
    "office": [
      {
        "who": "q",
        "text": "Tous les tests passent depuis que l'agent a repris le module, on peut livrer ?"
      },
      {
        "who": "a",
        "text": "Ouvre d'abord ce qu'il a changé dans les tests eux-mêmes ; un agent jugé sur des tests qui passent peut avoir modifié les tests plutôt que le code."
      }
    ],
    "avoid": "« C'est un bug du modèle. » La faille est d'abord dans la note, car un modèle entraîné assez fort pour la faire monter finira par trouver le raccourci s'il existe, d'où l'intérêt de vérifier le travail et pas seulement le score.",
    "video": null,
    "sources": [
      {
        "label": "METR, Recent Frontier Models Are Reward Hacking, 5 juin 2025 (o3 : chronomètre réécrit, évaluateur modifié, 30,4 % des essais sur RE-Bench, réponse « No » 10 fois sur 10 à la question sur l'intention)",
        "url": "https://metr.org/blog/2025-06-05-recent-reward-hacking/"
      },
      {
        "label": "Wikipédia, Reward hacking (CoastRunners, OpenAI, 2016 ; modèles de raisonnement qui raisonnent sur le test)",
        "url": "https://en.wikipedia.org/wiki/Reward_hacking"
      },
      {
        "label": "Fortune, « OpenAI says its AI models escaped from a secure test environment and hacked into AI company Hugging Face in order to cheat on an evaluation », 21 juillet 2026",
        "url": "https://fortune.com/2026/07/21/openai-says-ai-models-escaped-control-hacked-hugging-face/"
      },
      {
        "label": "Wikipédia, Goodhart's law",
        "url": "https://en.wikipedia.org/wiki/Goodhart%27s_law"
      }
    ]
  },
  {
    "id": "agent",
    "status": "live",
    "num": "26",
    "title": "Agent",
    "en": "AI agent",
    "aliases": [
      "agents",
      "agentic",
      "agentic AI",
      "coding agent"
    ],
    "aliasesFr": [
      "agent IA"
    ],
    "jargon": [
      {
        "say": "agentique",
        "means": "se dit d'un outil où le modèle enchaîne lui-même plusieurs actions (lire, chercher, modifier, lancer) au lieu de répondre en un seul message"
      },
      {
        "say": "coding agent",
        "means": "un agent qui travaille dans ton code : il lit les fichiers, les modifie, lance les tests et recommence ; Claude Code, Codex et Cursor en sont des exemples"
      },
      {
        "say": "workflow",
        "means": "un enchaînement d'étapes écrit à l'avance par un développeur, même s'il appelle un modèle à plusieurs endroits ; le chemin ne change pas en cours de route"
      },
      {
        "say": "human-in-the-loop",
        "means": "un humain valide certaines actions avant qu'elles partent, par exemple chaque commande lancée ou chaque e-mail envoyé"
      }
    ],
    "cat": "agents",
    "links": [
      "harness",
      "boucle-agent",
      "tool-use",
      "prompt-injection",
      "rag",
      "mythe-agent-autonome"
    ],
    "solutions": [
      {
        "name": "Claude Code",
        "kind": "agent de code",
        "url": "https://code.claude.com/docs/en/overview"
      },
      {
        "name": "Codex",
        "kind": "agent de code",
        "url": "https://developers.openai.com/codex"
      },
      {
        "name": "Cursor",
        "kind": "éditeur de code avec agent",
        "url": "https://cursor.com/"
      },
      {
        "name": "Gemini CLI",
        "kind": "agent open source",
        "url": "https://geminicli.com"
      },
      {
        "name": "OpenHands",
        "kind": "agent open source",
        "url": "https://github.com/OpenHands/OpenHands"
      },
      {
        "name": "Goose",
        "kind": "agent open source",
        "url": "https://block.github.io/goose/"
      }
    ],
    "short": "Un agent est un modèle de langage qu'on laisse agir : on lui donne un objectif et des outils, et il enchaîne lui-même les actions, en regardant le résultat de chacune pour choisir la suivante, jusqu'à ce que la tâche soit finie.",
    "image": "Envoie le groupe en tournée avec ses roadies et leurs caisses à outils, et tu as un agent. En studio, il jouait le morceau qu'on lui demandait ; sur la route, il décide de l'étape suivante, demande aux roadies de monter la scène ou d'appeler la salle, écoute ce que ça donne et choisit la suite, sans jamais porter une caisse lui-même.",
    "imagine": "Le 22 septembre 2026, dans l'annonce de Claude Opus 5.5, un développeur de Clio raconte avoir confié au modèle une tâche répartie sur six dépôts de code et l'avoir laissé tourner seul toute la nuit. Le modèle est resté sur la tâche plus de 18 heures ; lancé à 18 heures en quittant le bureau, il travaillait encore à midi le lendemain, l'équivalent de deux journées et demie d'un temps plein à 35 heures par semaine.",
    "imagineForm": "A",
    "full": [
      "Un agent est un modèle de langage placé dans une boucle, avec des outils. On lui donne un objectif, par exemple « trouve-moi un train pour Lyon jeudi et mets-le dans mon agenda ». Il choisit une action, comme chercher les horaires, lit le résultat, puis choisit la suivante, jusqu'à ce qu'il juge la tâche finie ou qu'une limite l'arrête. Ces actions, ce sont les programmes autour de lui qui les exécutent, à partir des demandes qu'il écrit.",
      "Pour reconnaître un agent, la question est de savoir qui choisit l'étape suivante. Anthropic a posé la distinction en décembre 2024 : dans un workflow, un développeur écrit les étapes à l'avance, même si un modèle intervient à chacune ; dans un agent, le modèle décide en cours de route de ses actions et de ses outils. Le bot qui résume chaque ticket entrant puis le range dans une file reste donc un workflow, alors que l'assistant qui relance de lui-même une recherche quand la première ne donne rien penche du côté de l'agent.",
      "Les agents les plus utilisés en 2026 travaillent dans le code. Claude Code est sorti chez Anthropic en février 2025, Codex chez OpenAI en avril 2025, et Codex comptait plus de 2 millions d'utilisateurs par semaine en mars 2026 ; Cursor joue dans la même catégorie. Tous lisent les fichiers d'un projet, les modifient, lancent les tests et recommencent tant que les tests échouent."
    ],
    "then": "En décembre 2024, Anthropic publiait encore un guide pour expliquer ce qui distingue un agent d'un workflow. En 2025, les agents sont entrés dans le travail quotidien des développeurs avec Claude Code et Codex. En janvier 2026, Anthropic a lancé Claude Cowork, le même principe pour les non-développeurs, qui range des dossiers ou produit des documents à partir des fichiers de ton ordinateur.",
    "office": [
      {
        "who": "q",
        "text": "On peut le laisser trier le drive partagé tout seul ?"
      },
      {
        "who": "a",
        "text": "Donne-lui une copie du drive plutôt que l'original. En février 2026, un utilisateur a demandé à Claude Cowork de ranger un ordinateur, et l'agent a effacé près de quinze ans de photos de famille, récupérées grâce à une restauration iCloud."
      }
    ],
    "avoid": "« L'agent a cliqué sur le bouton. » Le modèle a écrit une demande d'action, et c'est le programme autour de lui qui a cliqué, avec les droits qu'on lui a donnés. C'est donc à cet endroit que se règle ce qu'un agent a le droit de faire.",
    "video": null,
    "sources": [
      {
        "label": "Anthropic, Building effective agents, 19 décembre 2024 (workflows contre agents)",
        "url": "https://www.anthropic.com/engineering/building-effective-agents"
      },
      {
        "label": "Anthropic, Introducing Claude Opus 5.5, 22 septembre 2026 (témoignage de Sean Heintz, Clio : tâche sur six dépôts lancée la nuit sans surveillance, plus de 18 heures sur la tâche). Calcul de l'Imagine : 18 h + 18 h = midi le lendemain ; 35 heures / 5 jours = 7 heures par jour ; 18 / 7 = 2,6 journées",
        "url": "https://www.anthropic.com/news/claude-opus-5-5"
      },
      {
        "label": "Service-public.fr, durée légale du travail : 35 heures par semaine",
        "url": "https://www.service-public.fr/particuliers/vosdroits/F1911"
      },
      {
        "label": "Wikipédia, Claude (Claude Code sorti en février 2025, Claude Cowork en janvier 2026)",
        "url": "https://en.wikipedia.org/wiki/Claude_(AI)"
      },
      {
        "label": "Wikipédia, OpenAI Codex (Codex CLI le 16 avril 2025, plus de 2 millions d'utilisateurs hebdomadaires en mars 2026)",
        "url": "https://en.wikipedia.org/wiki/OpenAI_Codex"
      },
      {
        "label": "Futurism, 13 février 2026 : Claude Cowork efface le dossier de photos de famille, restauré depuis iCloud",
        "url": "https://futurism.com/artificial-intelligence/claude-wife-photos"
      }
    ]
  },
  {
    "id": "harness",
    "status": "live",
    "num": "27",
    "title": "Harness",
    "en": "Agent harness",
    "aliases": [
      "agentic harness",
      "scaffolding",
      "agent scaffold"
    ],
    "aliasesFr": [
      "harnais"
    ],
    "jargon": [
      {
        "say": "agentic harness",
        "means": "le terme qu'emploie la documentation de Claude Code pour la couche qui entoure le modèle, lui fournit ses outils et gère ce qu'il voit"
      },
      {
        "say": "scaffolding",
        "means": "l'échafaudage, un synonyme courant de harness dans les articles de recherche et les benchmarks"
      },
      {
        "say": "hooks",
        "means": "des scripts que le harness lance tout seul à des moments précis, par exemple juste avant un appel d'outil, qu'ils peuvent bloquer, ou juste après"
      },
      {
        "say": "permission mode",
        "means": "le réglage qui dit ce que l'agent peut faire sans demander : tout valider à la main, accepter les modifications de fichiers, ou laisser un filtre bloquer les actions risquées"
      }
    ],
    "cat": "agents",
    "links": [
      "agent",
      "boucle-agent",
      "tool-use",
      "system-prompt",
      "context-engineering",
      "mcp"
    ],
    "short": "Le harness est tout le logiciel qui entoure un modèle pour en faire un agent : les outils qu'il peut appeler, les consignes qu'il reçoit, la gestion de ce qu'il a sous les yeux et les règles sur ce qu'il a le droit de faire.",
    "image": "Derrière la vitre de la régie, le producteur donne la consigne, branche les câbles et les micros, rembobine la bande et tient le badge sans lequel la porte de la cabine ne s'ouvre pas. Le harness correspond à tout ce poste, consigne comprise, et deux producteurs ne tirent jamais le même son du même groupe.",
    "imagine": "GPT-5.5 passe deux fois les tâches de Terminal-Bench 2.1, qu'un agent doit mener seul dans un terminal, la fenêtre où l'on tape des commandes. Dans Terminus 2, le harness des auteurs du benchmark, il en réussit 78 % ; dans Codex CLI, celui d'OpenAI, il monte à 83,1 %, avec exactement les mêmes paramètres.",
    "imagineForm": "E",
    "full": [
      "Pour faire d'un modèle un agent, il faut un programme autour de lui, qu'on appelle le harness. Celui-ci envoie au modèle ses consignes et la liste des outils disponibles, exécute les actions demandées, renvoie les résultats, décide de ce qui reste dans la fenêtre de contexte quand elle se remplit, et bloque ce que l'utilisateur n'a pas autorisé.",
      "Claude Code, Codex et Gemini CLI sont des harness, et la documentation de Claude Code le dit en toutes lettres en le présentant comme la couche qui fournit les outils et gère le contexte du modèle. Sur le classement de Terminal-Bench 2.1, chaque ligne nomme deux choses, le modèle et l'agent qui l'entoure. Le harness maison ne gagne pas toujours, puisque Gemini 3 Pro réussit 65,8 % des tâches dans Gemini CLI, celui de Google, et 73,9 % dans Terminus 2.",
      "Le harness compte d'autant plus que la tâche est longue. En novembre 2025, Anthropic a décrit comment faire avancer un agent sur plusieurs sessions qui repartent chacune sans mémoire. Le harness lui fait tenir un fichier de progression, une liste de plus de 200 fonctionnalités à cocher et un historique git (le journal des versions du code), qu'il relit à chaque reprise."
    ],
    "office": [
      {
        "who": "q",
        "text": "On a testé le même modèle dans deux outils, et l'un fait nettement mieux. Lequel a le meilleur modèle ?"
      },
      {
        "who": "a",
        "text": "Ni l'un ni l'autre, puisque c'est le même ; tu as comparé deux harness, qui n'ont pas les mêmes outils, les mêmes consignes ni la même façon de gérer le contexte."
      }
    ],
    "avoid": "« Claude Code est un modèle. » Claude Code est un harness qui fait tourner les modèles Claude ; quand son comportement change du jour au lendemain, vérifie lequel des deux, du modèle ou de l'outil, a été mis à jour.",
    "video": {"src": "videos/harness.mp4", "poster": "videos/harness.jpg"},
    "sources": [
      {
        "label": "Claude Code, documentation How Claude Code works (couche autour du modèle appelée agentic harness, modes de permission, hooks)",
        "url": "https://code.claude.com/docs/en/how-claude-code-works"
      },
      {
        "label": "Claude Code, référence des hooks (PreToolUse avant un appel d'outil, qui peut le bloquer ; PostToolUse après)",
        "url": "https://code.claude.com/docs/en/hooks"
      },
      {
        "label": "Snorkel, classement Terminal-Bench 2.1, consulté le 2 octobre 2026 : Gemini 3 Pro 65,8 % (Gemini CLI) et 73,9 % (Terminus 2) ; GPT-5.5 83,1 % (Codex CLI) et 78 % (Terminus 2)",
        "url": "https://snorkel.ai/leaderboard/terminal-bench-2-1/"
      },
      {
        "label": "Anthropic, Effective harnesses for long-running agents, 26 novembre 2025 (fichier de progression, plus de 200 fonctionnalités, git)",
        "url": "https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents"
      }
    ]
  },
  {
    "id": "boucle-agent",
    "status": "live",
    "num": "28",
    "title": "Boucle agent",
    "en": "Agent loop",
    "aliases": [
      "agentic loop",
      "ReAct",
      "tool loop"
    ],
    "aliasesFr": [
      "boucle agentique"
    ],
    "jargon": [
      {
        "say": "ReAct",
        "means": "Reason + Act, la méthode publiée en octobre 2022 qui fait alterner au modèle un bout de raisonnement, une action et l'observation de son résultat"
      },
      {
        "say": "gather context, take action, verify results",
        "means": "les trois phases de la boucle de Claude Code selon sa documentation : réunir le contexte, agir, vérifier le résultat"
      },
      {
        "say": "max iterations",
        "means": "le nombre maximal de tours que le harness autorise avant de couper la boucle, pour qu'un agent ne tourne pas indéfiniment"
      },
      {
        "say": "stop_reason: tool_use",
        "means": "chez Anthropic, l'indication que la réponse du modèle est une demande d'outil ; le programme l'exécute, renvoie le résultat, et la boucle repart"
      }
    ],
    "cat": "agents",
    "links": [
      "agent",
      "harness",
      "tool-use",
      "context-engineering",
      "fenetre-de-contexte",
      "cout-d-une-requete"
    ],
    "short": "La boucle agent est le cycle qui fait travailler un agent : le modèle choisit une action, le programme l'exécute, le résultat est ajouté à la conversation, et le modèle relit le tout pour choisir l'action suivante, jusqu'à ce qu'il annonce avoir fini.",
    "image": "Une séance d'enregistrement ordinaire avance par prises, où le groupe joue, écoute en cabine, repère la mesure qui accroche et rejoue. La boucle agent suit ce rythme, avec une différence qui coûte cher, puisque chaque écoute s'ajoute à la bande et qu'au vingtième passage le groupe réentend les dix-neuf prises précédentes avant de jouer.",
    "imagine": "Joue toi-même le rôle du harness. Fais écrire à ton assistant une formule de tableur qui compte les lignes d'une colonne contenant « payé », colle-la dans ton tableur, puis recopie-lui ce qui s'affiche, message d'erreur compris. Recommence jusqu'à ce que le chiffre soit juste ; chacun de tes allers-retours au copier-coller est un tour de boucle, qu'un agent enchaîne seul.",
    "imagineForm": "B",
    "full": [
      "La boucle tient en quatre temps. (1) Le harness envoie au modèle la conversation et la liste des outils. (2) Le modèle répond par une demande d'outil, par exemple « cherche les trains Paris-Lyon de jeudi ». (3) Le harness exécute la demande et ajoute le résultat à la conversation. (4) Le modèle relit tout et choisit soit un nouvel outil, et la boucle repart, soit une réponse finale, et elle s'arrête.",
      "L'idée vient de la recherche. En octobre 2022, l'article ReAct (Yao et al.) a montré qu'un modèle réussit mieux quand il alterne un bout de raisonnement, une action et l'observation du résultat. La documentation de Claude Code décrit aujourd'hui des boucles de dizaines d'actions, comme lancer les tests, lire l'erreur, ouvrir le fichier fautif, le corriger et relancer les tests.",
      "Chaque tour se paie, parce que le modèle relit toute la conversation, résultats d'outils compris, à chaque passage. Une boucle longue remplit donc la fenêtre de contexte et la facture, et les harness fixent pour cette raison un nombre maximal de tours et résument l'historique quand la fenêtre approche de sa limite."
    ],
    "then": "En octobre 2022, ReAct était une technique de recherche, testée sur des questions, de la vérification de faits et des tâches de décision simulées. En 2026, la même boucle fait tourner les agents de code, de Claude Code à Codex. Dès le lancement de Codex dans le cloud, en mai 2025, une tâche durait le plus souvent entre 1 et 30 minutes, avec le journal des commandes lancées et le résultat des tests pour vérifier le travail.",
    "office": [
      {
        "who": "q",
        "text": "Il tourne en rond depuis vingt minutes sur le même test."
      },
      {
        "who": "a",
        "text": "Arrête-le et relis les derniers tours : il relance sans doute la même correction parce que l'erreur renvoyée ne lui apprend rien. Donne-lui l'information qui manque, ou découpe la tâche en plus petit."
      }
    ],
    "avoid": "« L'agent réfléchit depuis dix minutes. » Il fait surtout des tours de boucle, et chaque tour est un nouvel appel au modèle, payé en tokens, suivi d'une action réelle sur tes fichiers ou tes comptes.",
    "video": null,
    "sources": [
      {
        "label": "Yao et al., ReAct: Synergizing Reasoning and Acting in Language Models, 6 octobre 2022",
        "url": "https://arxiv.org/abs/2210.03629"
      },
      {
        "label": "Claude Code, documentation How Claude Code works (trois phases, dizaines d'actions, résumé automatique quand la fenêtre se remplit)",
        "url": "https://code.claude.com/docs/en/how-claude-code-works"
      },
      {
        "label": "Anthropic, Building effective agents, 19 décembre 2024 (conditions d'arrêt, nombre maximal d'itérations)",
        "url": "https://www.anthropic.com/engineering/building-effective-agents"
      },
      {
        "label": "Anthropic, documentation Tool use (stop_reason tool_use, tool_result)",
        "url": "https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview"
      },
      {
        "label": "Wikipédia, OpenAI Codex (tâches de 1 à 30 minutes, journaux de commandes et résultats de tests)",
        "url": "https://en.wikipedia.org/wiki/OpenAI_Codex"
      }
    ]
  },
  {
    "id": "tool-use",
    "status": "live",
    "num": "29",
    "title": "Tool use",
    "en": "Tool use",
    "aliases": [
      "function calling",
      "tool calling",
      "tools"
    ],
    "aliasesFr": [
      "appel d'outil",
      "utilisation d'outils"
    ],
    "jargon": [
      {
        "say": "function calling",
        "means": "le nom qu'OpenAI a donné en 2023 au même mécanisme ; on dit aussi tool calling"
      },
      {
        "say": "tool_use, tool_result",
        "means": "chez Anthropic, le bloc où le modèle écrit son appel d'outil, puis celui où le programme lui renvoie le résultat"
      },
      {
        "say": "schema",
        "means": "la description d'un outil en JSON, un format de données structuré, avec son nom, ce qu'il fait et les paramètres qu'il attend ; le modèle ne connaît l'outil que par elle"
      },
      {
        "say": "server tools",
        "means": "les outils que le fournisseur exécute lui-même, comme la recherche web chez Anthropic, par opposition à ceux que ton application exécute"
      }
    ],
    "cat": "agents",
    "links": [
      "agent",
      "boucle-agent",
      "mcp",
      "prompt-injection",
      "harness",
      "skill"
    ],
    "short": "Le tool use permet à un modèle de demander l'exécution d'un outil (chercher sur le web, lire un fichier, envoyer un e-mail) : il écrit un appel structuré avec le nom de l'outil et ses paramètres, puis un programme l'exécute et lui renvoie le résultat.",
    "image": "Le chanteur qui veut plus de retour dans son casque ne quitte pas le micro pour aller tourner le bouton ; il le demande, et un roadie s'en charge. Le tool use correspond à cette demande, et tant qu'aucun roadie ne l'entend, rien ne bouge sur scène.",
    "imagine": "Dans une démo où l'outil de réservation est décrit au modèle sans être branché, tu écris : « Réserve-moi le train de 8 h 04 pour Lyon jeudi. » Le modèle te répond, très sûr de lui : « Voici ma demande : reserver_train(destination: Lyon, jour: jeudi, heure: 8 h 04). »",
    "imagineForm": "D",
    "full": [
      "Un modèle ne sait produire que du texte. Pour lui donner prise sur le monde, on lui décrit des outils dans sa requête, avec pour chacun un nom, une description et des paramètres. Quand il juge qu'un outil l'aide, il répond par un appel structuré au lieu d'une phrase ; le programme qui l'entoure exécute l'appel et renvoie le résultat, que le modèle lit avant de continuer.",
      "Le modèle décide d'appeler un outil uniquement d'après sa description. Une description vague donne des appels au mauvais moment, ou pas d'appel du tout ; la documentation d'Anthropic note qu'avec un outil météo qui exige une ville, un modèle à qui on n'en donne pas peut en inventer une plutôt que de la demander.",
      "Les outils prennent aussi de la place. Leurs descriptions sont envoyées à chaque requête et comptées en tokens d'entrée, et chez Anthropic l'activation des outils ajoute en plus quelques centaines de tokens de consignes, 286 pour Claude Opus 5.5."
    ],
    "then": "En 2023, OpenAI lançait le function calling, et chaque application décrivait ses outils dans le format d'un seul fournisseur. En 2026, les fournisseurs exécutent eux-mêmes une partie des outils, comme la recherche web, et un modèle peut piocher dans des milliers d'outils qu'il ne charge qu'au moment de s'en servir.",
    "office": [
      {
        "who": "q",
        "text": "Le chatbot dit qu'il a envoyé le devis au client. Le client ne l'a jamais reçu."
      },
      {
        "who": "a",
        "text": "Regarde les journaux : si l'outil d'envoi n'a pas été appelé, ou s'il a renvoyé une erreur que le modèle a ignorée, le chatbot a raconté un envoi qui n'a jamais eu lieu."
      }
    ],
    "avoid": "« Il est connecté à Internet. » Le modèle a accès aux outils qu'on lui a décrits, et seulement à ceux-là ; sans outil de recherche web, il répond de mémoire.",
    "video": null,
    "sources": [
      {
        "label": "Anthropic, documentation Tool use (client tools et server tools, ville inventée faute de paramètre, 286 tokens de consignes pour Claude Opus 5.5, outil de recherche parmi des milliers d'outils)",
        "url": "https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview"
      },
      {
        "label": "Wikipédia, Model Context Protocol (function calling d'OpenAI en 2023, propre à un fournisseur)",
        "url": "https://en.wikipedia.org/wiki/Model_Context_Protocol"
      }
    ]
  },
  {
    "id": "mcp",
    "status": "live",
    "num": "30",
    "title": "MCP",
    "en": "Model Context Protocol",
    "aliases": [
      "MCP server",
      "MCP client",
      "MCP host"
    ],
    "aliasesFr": [
      "protocole MCP",
      "serveur MCP"
    ],
    "jargon": [
      {
        "say": "serveur MCP",
        "means": "le programme qui expose un service (Google Drive, GitHub, une base de données) aux agents, avec la liste de ses outils et leur mode d'emploi"
      },
      {
        "say": "hôte, client",
        "means": "l'hôte est l'application qui fait tourner le modèle (Claude, ChatGPT, Cursor) ; elle ouvre un client pour chaque serveur MCP auquel elle se branche"
      },
      {
        "say": "tools, resources, prompts",
        "means": "les trois choses qu'un serveur peut offrir selon la spécification : des actions à exécuter, des données à lire et des modèles de consignes"
      },
      {
        "say": "JSON-RPC",
        "means": "le format de messages, standard et antérieur à MCP, dans lequel l'hôte et le serveur se parlent"
      }
    ],
    "cat": "agents",
    "links": [
      "tool-use",
      "skill",
      "prompt-injection",
      "harness",
      "context-engineering"
    ],
    "solutions": [
      {
        "name": "MCP Registry",
        "kind": "annuaire officiel de serveurs",
        "url": "https://registry.modelcontextprotocol.io/"
      },
      {
        "name": "Serveurs de référence MCP",
        "kind": "bibliothèque open source",
        "url": "https://github.com/modelcontextprotocol/servers"
      },
      {
        "name": "GitHub MCP Server",
        "kind": "serveur officiel d'un éditeur",
        "url": "https://github.com/github/github-mcp-server"
      }
    ],
    "short": "MCP (Model Context Protocol) est un standard ouvert qui définit comment une application d'IA se branche sur un outil ou une source de données ; on écrit le connecteur une fois, et tous les assistants compatibles peuvent s'en servir.",
    "image": "Avec la prise jack, n'importe quelle guitare entre dans n'importe quel ampli, parce que tout le monde a adopté le même trou ; MCP est cette prise, entre les assistants et leurs outils. Une prise standard ne dit pourtant rien de ce qui passe dans le câble, et rien n'empêche d'y brancher une pédale trafiquée.",
    "imagine": "Prends les cinq applications que cite Anthropic en décembre 2025 (ChatGPT, Cursor, Gemini, Microsoft Copilot et VS Code), ajoute Claude, et mets en face les plus de 10 000 serveurs MCP publics recensés au même moment. Sans prise commune, il faudrait souder 60 000 câbles sur mesure, un par paire ; avec MCP, chaque application et chaque serveur ont leur prise, et 10 006 pièces suffisent.",
    "imagineForm": "A",
    "full": [
      "Avant MCP, chaque assistant écrivait son propre connecteur pour chaque service, un pour Google Drive dans tel outil, un autre pour Google Drive dans tel autre. Anthropic a publié MCP le 25 novembre 2024 pour remplacer ces intégrations sur mesure par un seul protocole, inspiré du Language Server Protocol, la norme qui permet aux éditeurs de code de prendre en charge n'importe quel langage de programmation.",
      "Un serveur MCP annonce ce qu'il sait faire, avec pour chaque outil une description en langage courant et le format attendu. L'application transmet ces descriptions au modèle ; quand le modèle demande l'un de ces outils, l'application relaie l'appel au serveur, qui exécute l'action et renvoie le résultat. Le mécanisme reste celui du tool use, avec une prise commune entre l'application et le serveur.",
      "Brancher un serveur revient à donner au modèle de nouveaux outils et de nouveaux textes à lire, avec les risques qui vont avec. En mai 2025, Invariant Labs a déposé une issue piégée (un ticket) sur un dépôt GitHub public. Elle a suffi à pousser un agent branché sur le serveur MCP officiel de GitHub à recopier des dépôts privés dans un dépôt public, alors que le serveur lui-même ne contenait aucun bug."
    ],
    "then": "À sa sortie, en novembre 2024, MCP venait avec six serveurs d'exemple, dont Google Drive, Slack et GitHub. OpenAI l'a adopté en mars 2025 et Google en avril ; en décembre 2025, Anthropic l'a confié à l'Agentic AI Foundation, créée avec OpenAI et Block sous l'égide de la Linux Foundation, alors que ses kits de développement dépassaient 97 millions de téléchargements par mois.",
    "office": [
      {
        "who": "q",
        "text": "Le service informatique demande si on peut brancher le serveur MCP d'un éditeur trouvé sur GitHub."
      },
      {
        "who": "a",
        "text": "Traite-le comme n'importe quel logiciel tiers : lis la liste des outils qu'il expose, et ne lui donne que les droits dont la tâche a besoin, en lecture seule quand elle le permet."
      }
    ],
    "avoid": "« MCP, c'est une IA. » MCP est une norme de branchement ; elle ne contient aucun modèle et ne rend aucun assistant plus malin, elle lui donne accès à plus d'outils.",
    "video": {"src": "videos/mcp.mp4", "poster": "videos/mcp.jpg"},
    "sources": [
      {
        "label": "Anthropic, Introducing the Model Context Protocol, 25 novembre 2024 (standard ouvert, six serveurs d'exemple)",
        "url": "https://www.anthropic.com/news/model-context-protocol"
      },
      {
        "label": "Anthropic, don de MCP à l'Agentic AI Foundation, 9 décembre 2025 (plus de 10 000 serveurs publics actifs, adoption par ChatGPT, Cursor, Gemini, Microsoft Copilot et VS Code, 97 millions de téléchargements mensuels). Calcul de l'Imagine : 5 applications citées + Claude = 6 ; 6 x 10 000 = 60 000 connecteurs sur mesure ; 6 + 10 000 = 10 006 prises",
        "url": "https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation"
      },
      {
        "label": "Wikipédia, Model Context Protocol (adoption par OpenAI en mars 2025 et par Google en avril 2025)",
        "url": "https://en.wikipedia.org/wiki/Model_Context_Protocol"
      },
      {
        "label": "Spécification MCP, version 2026-07-28 (JSON-RPC 2.0, tools, resources, prompts, inspiration du Language Server Protocol)",
        "url": "https://modelcontextprotocol.io/specification/latest"
      },
      {
        "label": "Invariant Labs, GitHub MCP Exploited, 26 mai 2025",
        "url": "https://invariantlabs.ai/blog/mcp-github-vulnerability"
      }
    ]
  },
  {
    "id": "skill",
    "status": "live",
    "num": "31",
    "title": "Skill",
    "en": "Agent Skill",
    "aliases": [
      "skills",
      "Agent Skills",
      "SKILL.md"
    ],
    "aliasesFr": [
      "compétence"
    ],
    "jargon": [
      {
        "say": "SKILL.md",
        "means": "le seul fichier obligatoire d'un skill : en tête, un nom et une description ; en dessous, les instructions"
      },
      {
        "say": "progressive disclosure",
        "means": "le chargement par étages : l'agent ne voit d'abord que le nom et la description de chaque skill, lit les instructions quand une tâche correspond, et n'ouvre les fichiers annexes que s'il en a besoin"
      },
      {
        "say": "/nom-du-skill",
        "means": "dans Claude Code et d'autres agents, la commande qui lance un skill à la main au lieu d'attendre que l'agent le choisisse"
      }
    ],
    "cat": "agents",
    "links": [
      "mcp",
      "system-prompt",
      "context-engineering",
      "tool-use",
      "fenetre-de-contexte"
    ],
    "short": "Un skill est un dossier d'instructions, parfois accompagnées de scripts ou de modèles de documents, qu'un agent garde sous la main et n'ouvre que lorsque la tâche en cours correspond à sa description.",
    "image": "Range dans la flight case une fiche technique par morceau du répertoire, avec les accords, le tempo et le réglage de la pédale du solo. Le groupe ne lit au départ que les titres collés sur les pochettes, et ne sort la fiche entière qu'au moment de jouer le morceau ; c'est ce qui lui permet d'en transporter des centaines sans encombrer la scène.",
    "imagine": "Avant, ton agent transforme le compte rendu de la réunion en slides et te rend un deck propre, aux couleurs par défaut, avec des titres en capitales que ta boîte n'utilise jamais. Après, tu as ajouté à ses skills un dossier « charte-slides » avec les couleurs, la police et trois exemples de titres, et la même demande sort aux couleurs de la boîte.",
    "imagineForm": "E",
    "full": [
      "Anthropic a lancé les Agent Skills le 16 octobre 2025. Un skill est un dossier qui contient au minimum un fichier SKILL.md, avec un nom, une description et des instructions, auxquels on peut ajouter des scripts, de la documentation ou des gabarits. Anthropic les compare au livret d'accueil qu'on remet à une nouvelle recrue.",
      "Tout l'intérêt tient au chargement par étages. Au démarrage, l'agent ne lit que le nom et la description de chaque skill ; quand une demande correspond, il lit les instructions complètes, puis ouvre les fichiers annexes seulement s'il en a besoin. Dans Claude Code, la liste des descriptions a droit à 1 % de la fenêtre de contexte, et chaque description y est coupée à 1 536 caractères.",
      "Un skill ne remplace ni le system prompt ni MCP. Le system prompt est relu à chaque requête, alors qu'un skill n'occupe la fenêtre que lorsqu'il sert. MCP branche l'agent sur un service, et le skill lui apprend une façon de faire, par exemple remplir le modèle de facture de la boîte avec les données que MCP est allé chercher."
    ],
    "then": "Les skills sont nés chez Anthropic en octobre 2025, pour Claude. Le 18 décembre 2025, Anthropic en a fait un standard ouvert, et en 2026 le même dossier fonctionne dans Codex, Cursor, Gemini CLI, GitHub Copilot ou VS Code, qui figurent parmi les outils compatibles listés sur le site du standard.",
    "office": [
      {
        "who": "q",
        "text": "Je colle les mêmes consignes de mise en forme dans chaque conversation, c'est normal ?"
      },
      {
        "who": "a",
        "text": "C'est le cas d'usage type d'un skill : écris-les une fois dans un dossier, avec une description qui dit quand s'en servir, et l'agent les ouvrira de lui-même quand la demande s'y prête."
      }
    ],
    "avoid": "« Le modèle a appris une nouvelle compétence. » Ses paramètres n'ont pas bougé : il a ouvert un dossier et lu des instructions, comme une recrue qui consulte la procédure, et il devra le rouvrir à la prochaine conversation.",
    "video": null,
    "sources": [
      {
        "label": "Anthropic, Introducing Agent Skills, 16 octobre 2025, mis à jour le 18 décembre 2025 (standard ouvert)",
        "url": "https://claude.com/blog/skills"
      },
      {
        "label": "Anthropic, Equipping agents for the real world with Agent Skills, 16 octobre 2025 (SKILL.md, chargement par étages, livret d'accueil d'une recrue)",
        "url": "https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills"
      },
      {
        "label": "Agent Skills, site du standard ouvert (format, liste des outils compatibles dont Codex, Cursor, Gemini CLI, GitHub Copilot et VS Code)",
        "url": "https://agentskills.io/"
      },
      {
        "label": "Claude Code, documentation Skills (budget de 1 % de la fenêtre pour la liste, 1 536 caractères par description, consignes qu'on recolle à chaque conversation)",
        "url": "https://code.claude.com/docs/en/skills"
      }
    ]
  },
  {
    "id": "system-prompt",
    "status": "live",
    "num": "32",
    "title": "System prompt",
    "en": "System prompt",
    "aliases": [
      "system message",
      "system instructions",
      "instructions"
    ],
    "aliasesFr": [
      "prompt système",
      "consigne système"
    ],
    "jargon": [
      {
        "say": "system, user, assistant",
        "means": "les trois rôles d'une conversation envoyée à un modèle : les consignes de l'éditeur, tes messages, et les réponses du modèle"
      },
      {
        "say": "leak du system prompt",
        "means": "quand quelqu'un pousse un assistant à recopier ses consignes ; c'est longtemps resté le seul moyen de les lire, faute de publication"
      },
      {
        "say": "CLAUDE.md, AGENTS.md",
        "means": "des fichiers placés dans un projet, que les agents de code ajoutent à leurs consignes au début de chaque session"
      }
    ],
    "cat": "agents",
    "links": [
      "harness",
      "prompt-injection",
      "context-engineering",
      "skill",
      "fenetre-de-contexte",
      "cout-d-une-requete"
    ],
    "short": "Le system prompt est le texte de consignes que l'éditeur d'un assistant place avant ta conversation et que le modèle relit à chaque message : qui il est, la date du jour, le ton à prendre, ce qu'il doit refuser.",
    "image": "Le producteur passe la tête dans la cabine avant la première note et donne sa consigne pour la session : jouer sobre, pas de solo de plus de huit mesures, aucune reprise de chanson protégée. Le groupe ne la voit écrite nulle part, il l'a dans l'oreille au début de chaque prise, et le public n'en sait rien.",
    "imagine": "Demande à Claude, sans activer la recherche web : « On est quel jour aujourd'hui ? » Il te répond juste, alors que son entraînement s'est arrêté des mois plus tôt. Personne ne lui a appris la date ; elle est écrite dans le system prompt que l'application remplit avant chacune de tes conversations, et qu'Anthropic publie.",
    "imagineForm": "B",
    "full": [
      "Quand tu écris à un assistant, ton message n'arrive jamais seul. L'application le fait précéder d'un system prompt, un texte rédigé par l'éditeur qui fixe l'identité de l'assistant, ses règles et des informations du moment comme la date. Le modèle le reçoit à chaque requête, avant l'historique de la conversation, et c'est en grande partie lui qui explique qu'un même modèle ne se comporte pas pareil d'une application à l'autre.",
      "Anthropic publie depuis août 2024 les system prompts de ses applications, que les éditeurs gardaient jusque-là pour eux. Celui de Claude Opus 5.5, daté du 22 septembre 2026, fait environ 4 100 mots. Il donne la date du jour et la date de coupure des connaissances, présente les produits de la marque, et va jusqu'à demander d'éviter les listes à puces dans une conversation ordinaire.",
      "Le system prompt reste du texte, posé au même endroit que le reste de la conversation, et rien dans le mécanisme ne l'empêche d'être contredit par une consigne glissée plus loin, dans un message ou dans un document. C'est la porte d'entrée des injections de prompt."
    ],
    "then": "En juillet 2024, le system prompt de Claude 3.5 Sonnet tenait en un peu moins de 1 000 mots. Celui de Claude Opus 5.5, en septembre 2026, est quatre fois plus long, et la place gagnée accueille entre autres la liste des produits de la marque, des règles de mise en forme et des exemples de cas délicats.",
    "office": [
      {
        "who": "q",
        "text": "Notre chatbot interne tourne sur le même modèle que l'assistant grand public. Pourquoi ils ne répondent pas pareil ?"
      },
      {
        "who": "a",
        "text": "Ils n'ont ni le même system prompt ni les mêmes outils, et chaque produit donne ses propres consignes au modèle avant ta question."
      }
    ],
    "avoid": "« Le system prompt est caché, donc personne ne peut le lire. » Il reste du texte dans la conversation, et des utilisateurs arrivent régulièrement à le faire recopier ; n'y mets aucune information que tu ne publierais pas.",
    "video": null,
    "sources": [
      {
        "label": "Simon Willison, Anthropic Release Notes: System Prompts, 26 août 2024 (première publication, prompts d'ordinaire gardés secrets ou découverts par des fuites)",
        "url": "https://simonwillison.net/2024/Aug/26/anthropic-system-prompts/"
      },
      {
        "label": "Anthropic, system prompts de Claude Opus 5.5, entrée du 22 septembre 2026 (date injectée, date de coupure, listes à puces). Comptage le 2 octobre 2026 : 4 125 mots, avec wc -w sur le texte des blocs de code de la version .md de la page",
        "url": "https://platform.claude.com/docs/en/release-notes/system-prompts/claude-opus-5-5"
      },
      {
        "label": "Anthropic, system prompts de Claude 3.5 Sonnet, entrée du 12 juillet 2024. Comptage le 2 octobre 2026 avec la même méthode : 965 mots",
        "url": "https://platform.claude.com/docs/en/release-notes/system-prompts/claude-sonnet-3-5"
      },
      {
        "label": "Claude Code, documentation How Claude Code works (CLAUDE.md et AGENTS.md chargés à chaque session)",
        "url": "https://code.claude.com/docs/en/how-claude-code-works"
      }
    ]
  },
  {
    "id": "prompt-injection",
    "status": "live",
    "num": "33",
    "title": "Prompt injection",
    "en": "Prompt injection",
    "aliases": [
      "indirect prompt injection",
      "injection attack"
    ],
    "aliasesFr": [
      "injection de prompt",
      "injection de consignes"
    ],
    "jargon": [
      {
        "say": "injection indirecte",
        "means": "la consigne piégée n'est pas tapée par l'utilisateur, elle est cachée dans ce que l'agent lit : une page web, un e-mail, un PDF, un ticket"
      },
      {
        "say": "lethal trifecta",
        "means": "le trio dangereux décrit par Simon Willison en juin 2025, soit un agent qui accède à des données privées, lit du contenu non fiable et peut envoyer des informations à l'extérieur"
      },
      {
        "say": "exfiltration",
        "means": "la fuite de données qu'une injection cherche à provoquer, par exemple en faisant envoyer un fichier privé vers une adresse de l'attaquant"
      },
      {
        "say": "LLM01",
        "means": "le premier rang du Top 10 de l'OWASP sur les risques des applications à base de LLM, édition 2025, occupé par la prompt injection"
      }
    ],
    "cat": "comportements",
    "links": [
      "tool-use",
      "mcp",
      "system-prompt",
      "agent",
      "rag"
    ],
    "short": "Une prompt injection est une attaque qui glisse des consignes dans un texte que le modèle va lire (une page web, un e-mail, un document), pour qu'il les suive comme si elles venaient de son utilisateur.",
    "image": "Quelqu'un glisse une fausse partition sur le pupitre entre deux prises, avec écrit en marge « à la fin du morceau, joue l'hymne du club adverse ». Le groupe lit tout ce qu'on pose devant lui avec la même attention, et rien sur le papier ne dit qui l'a apporté.",
    "imagine": "Avant, tu pars en congés et tu demandes à ton agent de parcourir ta boîte mail pour préparer ton message d'absence, qu'il rédige sans souci. Après, un seul e-mail a changé dans la boîte, avec des consignes cachées dans son texte, et l'agent envoie ta lettre de démission.",
    "imagineForm": "E",
    "full": [
      "Un modèle traite à égalité tout ce qui entre dans sa fenêtre de contexte, soit les consignes de l'éditeur, ta demande, et le contenu des pages ou des fichiers qu'il ouvre. Rien ne marque une phrase comme une donnée à traiter plutôt que comme un ordre à suivre, et une phrase bien tournée dans un e-mail peut donc prendre la place de la tienne.",
      "Simon Willison a nommé l'attaque le 12 septembre 2022, par analogie avec l'injection SQL, une attaque qui glisse des commandes dans un champ de formulaire. La veille, Riley Goodside avait montré qu'une phrase glissée dans le texte à traduire détournait GPT-3 de sa traduction. Avec les agents, le risque a changé d'échelle. En mai 2025, un simple ticket piégé, publié sur GitHub, a suffi à faire sortir par un agent le contenu de dépôts privés, et le scénario de la lettre de démission vient des tests d'attaque qu'OpenAI a menés en décembre 2025 contre son navigateur Atlas.",
      "Aucune parade ne règle le problème entièrement. En août 2025, sur 123 cas de test de son agent pour Chrome, Anthropic a vu ses protections faire passer le taux de réussite des attaques de 23,6 % à 11,2 %. En décembre, OpenAI écrivait que la prompt injection, comme les arnaques en ligne, ne serait sans doute jamais entièrement « résolue ». La défense passe donc aussi par le harness, qui limite les droits de l'agent et fait valider par un humain ce qui envoie, paie ou supprime."
    ],
    "then": "En 2022, la prompt injection détournait GPT-3 d'une simple traduction. En 2025 et 2026, elle vise des agents qui lisent tes e-mails, naviguent à ta place et ont accès à tes dépôts de code, et l'OWASP la classe au premier rang des risques des applications à base de LLM dans son édition 2025.",
    "office": [
      {
        "who": "q",
        "text": "On veut que l'agent lise les CV reçus et réponde lui-même aux candidats. Un risque ?"
      },
      {
        "who": "a",
        "text": "Un CV peut contenir du texte invisible qui lui donne des ordres. Sépare les rôles ; l'agent qui lit les CV ne peut rien envoyer, et les réponses partent d'un modèle de mail fixe où il ne remplit que le prénom et le poste."
      }
    ],
    "avoid": "« On a écrit dans le system prompt d'ignorer les consignes cachées, on est protégés. » Cette phrase réduit le risque sans le supprimer, parce que l'attaque passe par le même canal que la protection ; seuls les droits qu'on n'a pas donnés à l'agent restent hors de portée d'une consigne piégée.",
    "video": null,
    "sources": [
      {
        "label": "Simon Willison, Prompt injection attacks against GPT-3, 12 septembre 2022 (le nom, l'analogie avec l'injection SQL, la démonstration de Riley Goodside sur une traduction)",
        "url": "https://simonwillison.net/2022/Sep/12/prompt-injection/"
      },
      {
        "label": "Simon Willison, The lethal trifecta for AI agents, 16 juin 2025",
        "url": "https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/"
      },
      {
        "label": "Invariant Labs, GitHub MCP Exploited, 26 mai 2025 (issue piégée, fuite de dépôts privés)",
        "url": "https://invariantlabs.ai/blog/mcp-github-vulnerability"
      },
      {
        "label": "Anthropic, Piloting Claude for Chrome, 25 août 2025 (123 cas de test, 23,6 % puis 11,2 % de réussite des attaques)",
        "url": "https://claude.com/blog/claude-for-chrome"
      },
      {
        "label": "TechCrunch, OpenAI says AI browsers may always be vulnerable to prompt injection attacks, 22 décembre 2025 (lettre de démission au lieu du message d'absence, « unlikely to ever be fully solved »)",
        "url": "https://techcrunch.com/2025/12/22/openai-says-ai-browsers-may-always-be-vulnerable-to-prompt-injection-attacks/"
      },
      {
        "label": "OWASP, Top 10 for LLM Applications 2025, LLM01 Prompt Injection",
        "url": "https://genai.owasp.org/llmrisk/llm01-prompt-injection/"
      }
    ]
  },
  {
    "id": "context-engineering",
    "status": "live",
    "num": "34",
    "title": "Context engineering",
    "en": "Context engineering",
    "aliases": [
      "context management",
      "context window management"
    ],
    "aliasesFr": [
      "ingénierie du contexte"
    ],
    "jargon": [
      {
        "say": "compaction",
        "means": "résumer le début d'une conversation trop longue pour libérer de la place dans la fenêtre, en gardant les décisions prises et les problèmes en cours"
      },
      {
        "say": "just-in-time",
        "means": "ne pas tout charger d'avance ; l'agent garde des références (noms de fichiers, liens) et va chercher le contenu au moment où il en a besoin"
      },
      {
        "say": "sub-agent",
        "means": "un agent secondaire qui mène une recherche dans sa propre fenêtre et ne rapporte qu'un résumé à l'agent principal"
      },
      {
        "say": "attention budget",
        "means": "l'image d'Anthropic pour dire que chaque token ajouté à la fenêtre entame une attention limitée"
      }
    ],
    "cat": "agents",
    "links": [
      "fenetre-de-contexte",
      "rag",
      "system-prompt",
      "skill",
      "harness",
      "boucle-agent"
    ],
    "short": "Le context engineering consiste à choisir ce qu'un modèle a sous les yeux à chaque étape (consignes, documents, historique, résultats d'outils) pour qu'il dispose de ce qui sert à la tâche, et de rien de plus.",
    "image": "La bande a beau être longue, on ne la remplit pas au hasard. Avant chaque prise, la régie choisit ce qui monte dessus (la consigne du producteur, les deux mesures utiles de la répétition d'hier, la partition du jour) et coupe le bavardage d'avant session. Plus la bande est chargée, moins le groupe entend ce qui compte.",
    "imagine": "Tu as donné à ton agent un budget de 15 000 euros à 9 heures, puis tu as travaillé avec lui toute la journée. À 18 heures, tu lui demandes : « Quel budget je t'ai donné ce matin ? » Il te répond : « Tu ne m'as donné aucun budget dans cette session. »",
    "imagineForm": "D",
    "full": [
      "Le terme s'est répandu en juin 2025 : Tobi Lütke l'a défendu le 19 juin, puis Andrej Karpathy l'a repris le 25 en le préférant à « prompt engineering ». Un prompt évoque une consigne courte, alors qu'une application sérieuse assemble à chaque appel des consignes, des exemples, des documents, des outils et un historique. Karpathy y voit un art et une science, celle de remplir la fenêtre avec exactement ce qui sert à l'étape suivante.",
      "C'est la fenêtre elle-même qui oblige à trier. Plus elle se remplit, moins le modèle exploite bien chaque information, et Anthropic parle d'un budget d'attention que chaque token supplémentaire entame. Un agent qui tourne longtemps accumule pourtant des résultats d'outils, des fichiers lus et des essais ratés, qui finissent par noyer la consigne du départ.",
      "En septembre 2025, Anthropic a décrit les parades courantes. On résume l'historique quand il devient trop long, on fait prendre des notes à l'agent dans un fichier qu'il relit plus tard, on va chercher l'information au moment où elle sert, et on confie les recherches à des sous-agents qui ne rapportent qu'un résumé. Les skills relèvent de la même idée, puisque leurs instructions n'entrent dans la fenêtre que lorsqu'elles servent."
    ],
    "then": "Le mot à la mode, avant 2025, était prompt engineering, l'art de bien formuler sa demande. En 2026, avec des agents qui enchaînent des dizaines d'actions, le travail consiste surtout à choisir ce qui reste dans la fenêtre au fil des tours. Claude Code, par exemple, efface d'abord les anciens résultats d'outils, puis résume la conversation quand la place vient à manquer.",
    "office": [
      {
        "who": "q",
        "text": "Je lui donne toute la doc du projet à chaque fois, comme ça il a tout. Pourquoi il répond moins bien ?"
      },
      {
        "who": "a",
        "text": "Il répond moins bien parce qu'il a tout, et que la page utile est noyée dans le reste. Donne-lui les trois pages qui servent, avec un index pour aller chercher le reste s'il en a besoin."
      }
    ],
    "avoid": "« Avec un million de tokens de contexte, plus besoin de choisir. » Une grande fenêtre repousse la limite sans faire le tri à ta place : un modèle exploite moins bien une information perdue au milieu d'un long texte, et chaque token envoyé se paie.",
    "video": null,
    "sources": [
      {
        "label": "Andrej Karpathy sur X, 25 juin 2025, citant un message de Tobi Lütke du 19 juin 2025 (context engineering préféré à prompt engineering), lus via api.fxtwitter.com le 2 octobre 2026",
        "url": "https://x.com/karpathy/status/1937902205765607626"
      },
      {
        "label": "Anthropic, Effective context engineering for AI agents, 29 septembre 2025 (budget d'attention, compaction, prise de notes, chargement au moment voulu, sous-agents)",
        "url": "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents"
      },
      {
        "label": "Claude Code, documentation How Claude Code works (anciens résultats d'outils effacés en premier, puis résumé de la conversation)",
        "url": "https://code.claude.com/docs/en/how-claude-code-works"
      }
    ]
  },
  {
    "id": "second-brain",
    "status": "live",
    "num": "35",
    "title": "Second brain",
    "en": "Second brain",
    "aliases": [
      "Building a Second Brain",
      "BASB",
      "LLM wiki",
      "personal knowledge management",
      "PKM"
    ],
    "aliasesFr": [
      "second cerveau",
      "deuxième cerveau"
    ],
    "jargon": [
      {
        "say": "CODE",
        "means": "les quatre étapes de la méthode de Tiago Forte : capturer, organiser, distiller, exprimer"
      },
      {
        "say": "PARA",
        "means": "son classement en quatre dossiers, projets, domaines de responsabilité (areas), ressources et archives"
      },
      {
        "say": "LLM wiki",
        "means": "un dossier de pages en Markdown (du texte simple avec quelques balises de mise en forme) qu'un agent écrit et tient à jour à partir de tes sources, décrit par Andrej Karpathy en avril 2026"
      },
      {
        "say": "raw/",
        "means": "le dossier des sources brutes (articles, PDF, transcriptions) que l'agent lit sans jamais les modifier"
      }
    ],
    "cat": "methode",
    "links": [
      "knowledge-graph",
      "rag",
      "context-engineering",
      "fenetre-de-contexte",
      "mythe-apprend-de-nos-conversations"
    ],
    "solutions": [
      {
        "name": "Obsidian",
        "kind": "éditeur de notes",
        "url": "https://obsidian.md/"
      },
      {
        "name": "Notion",
        "kind": "éditeur de notes",
        "url": "https://www.notion.com/"
      },
      {
        "name": "Logseq",
        "kind": "éditeur de notes open source",
        "url": "https://logseq.com/"
      }
    ],
    "short": "Un second brain est un système de notes tenu hors de ta tête, où tu ranges ce que tu lis et ce que tu en conclus pour le retrouver et t'en resservir ; on en confie de plus en plus l'entretien à un agent.",
    "image": "Au studio, rien ne survit à la fin de la session, puisque la bande est effacée et que la console ne bouge plus. Le second brain est le carnet de session qu'on range sur l'étagère, avec les arrangements trouvés et les erreurs à ne pas refaire, et que quelqu'un pose sur le pupitre au début de la session suivante. Dans la version de 2026, c'est le groupe qui tient le carnet, et toi qui le relis.",
    "imagine": "Lundi, ton agent lit tes cinq rapports sur le marché du vélo et te rend une synthèse, où il relève que deux d'entre eux ne donnent pas le même chiffre de ventes. Jeudi, pour une question voisine, il relit les cinq rapports depuis la première page, sans le moindre souvenir de cette contradiction. Rejoue la semaine avec un wiki ; lundi, il range sa synthèse et la contradiction dans une page, et jeudi il ouvre cette page avant tout le reste.",
    "imagineForm": "E",
    "full": [
      "Tiago Forte part d'un constat, que la tête sert à avoir des idées plutôt qu'à les garder, et c'est lui qui a popularisé l'expression avec son livre Building a Second Brain, paru en juin 2022. Il y décrit un dépôt numérique et centralisé de ce que tu apprends, tenu hors de ta tête, qui tourne en quatre étapes : capturer ce qui te parle, l'organiser par projet, en distiller l'essentiel, puis t'en servir dans ce que tu produis.",
      "En avril 2026, Andrej Karpathy a décrit une variante où le LLM tient le carnet à ta place, qu'il appelle LLM wiki. Tu déposes tes sources dans un dossier que l'agent ne modifie jamais ; il les lit, écrit des pages de synthèse en Markdown, les relie entre elles, note où une nouvelle source contredit une ancienne et tient un index. Karpathy résume le partage des rôles ainsi : « Obsidian is the IDE; the LLM is the programmer; the wiki is the codebase. »",
      "La différence avec le RAG tient à ce qui s'accumule. Un RAG retrouve des morceaux de documents à chaque question et refait la synthèse de zéro, alors que le wiki garde la synthèse déjà faite, et qu'une réponse utile peut y être rangée comme une nouvelle page. Le modèle ne change pas pour autant, parce que le second brain vit dans des fichiers que l'agent recharge dans sa fenêtre de contexte à chaque session."
    ],
    "then": "Le second brain de 2022 se tenait à la main, et c'est toi qui surlignais, résumais et classais tes notes dans les dossiers PARA. En 2026, le pattern de Karpathy confie ce classement à un agent, et ton travail devient de choisir les sources, de poser les questions et de relire ce qu'il a écrit.",
    "office": [
      {
        "who": "q",
        "text": "J'ai 3 000 notes dans Notion et je n'en relis aucune. Un agent peut m'aider ?"
      },
      {
        "who": "a",
        "text": "Oui, si tu lui demandes d'en tirer des pages de synthèse reliées entre elles et de les tenir à jour ; sans ce rangement, tu lui donnes juste une plus grosse pile à relire à chaque question."
      }
    ],
    "avoid": "« Avec un second brain, l'IA se souvient de tout. » Le modèle relit des fichiers qu'on lui donne, et un wiki mal tenu lui fait relire ses erreurs avec la même confiance que le reste.",
    "video": null,
    "sources": [
      {
        "label": "Forte Labs, Building a Second Brain: The Definitive Introductory Guide (définition, méthode CODE, classement PARA)",
        "url": "https://fortelabs.com/blog/basboverview/"
      },
      {
        "label": "Open Library, notice de Building a Second Brain, Tiago Forte (première publication en 2022, éditions de juin et août 2022)",
        "url": "https://openlibrary.org/works/OL26417584W"
      },
      {
        "label": "Andrej Karpathy, LLM Wiki, gist publié le 4 avril 2026 (sources brutes, wiki, schéma, citation sur Obsidian)",
        "url": "https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f"
      },
      {
        "label": "Andrej Karpathy sur X, « LLM Knowledge Bases », 2 avril 2026",
        "url": "https://x.com/karpathy/status/2039805659525644595"
      }
    ]
  },
  {
    "id": "knowledge-graph",
    "status": "live",
    "num": "36",
    "title": "Knowledge graph",
    "en": "Knowledge graph",
    "aliases": [
      "KG",
      "knowledge graphs",
      "GraphRAG",
      "graph database"
    ],
    "aliasesFr": [
      "graphe de connaissances"
    ],
    "jargon": [
      {
        "say": "triplet",
        "means": "l'unité d'un knowledge graph, faite d'un sujet, d'une relation et d'un objet, comme « Pierre Curie, époux de, Marie Curie »"
      },
      {
        "say": "entité",
        "means": "un nœud du graphe : une personne, un lieu, une entreprise, un concept"
      },
      {
        "say": "GraphRAG",
        "means": "un RAG qui cherche dans un graphe construit par un LLM à partir des documents, plutôt que dans des morceaux de texte isolés ; la méthode a été publiée par Microsoft Research en avril 2024"
      },
      {
        "say": "graph DB",
        "means": "une base de données faite pour stocker des nœuds et des relations, et pour les parcourir vite"
      }
    ],
    "cat": "methode",
    "links": [
      "second-brain",
      "rag",
      "embedding",
      "mythe-base-de-donnees",
      "hallucination"
    ],
    "solutions": [
      {
        "name": "Neo4j",
        "kind": "base de données graphe",
        "url": "https://neo4j.com/"
      },
      {
        "name": "Amazon Neptune",
        "kind": "plateforme cloud",
        "url": "https://aws.amazon.com/neptune/"
      },
      {
        "name": "Microsoft GraphRAG",
        "kind": "bibliothèque open source",
        "url": "https://github.com/microsoft/graphrag"
      },
      {
        "name": "Wikidata",
        "kind": "graphe ouvert à explorer",
        "url": "https://www.wikidata.org/"
      }
    ],
    "short": "Un knowledge graph range des connaissances sous forme de nœuds (des personnes, des lieux, des concepts) reliés par des relations nommées, comme « est née à » ou « travaille pour », qu'un programme peut parcourir de proche en proche.",
    "image": "Ici, le studio n'aide pas, parce que le meilleur exemple est la carte des termes de ce lexique. Elle forme un graphe, où chaque fiche est un nœud et chaque lien un fil vers une fiche voisine. Il lui manque pourtant ce qui fait un vrai knowledge graph, car ses fils ne disent pas quelle relation unit deux fiches, là où un knowledge graph écrirait « le RAG utilise les embeddings ».",
    "imagine": "À son lancement en mai 2012, le Knowledge Graph de Google comptait 3,5 milliards de faits ; en 2020, il en dépassait 500 milliards, sur cinq milliards d'entités. Imprime ces 500 milliards de faits à raison d'un par ligne, 40 lignes par page et 500 pages par volume, et tu obtiens 25 millions de livres, soit 750 kilomètres d'étagères, où chaque ligne peut pourtant se corriger ou se rayer sans toucher aux autres.",
    "imagineForm": "A",
    "full": [
      "Un knowledge graph range le savoir en triplets, chacun fait d'un sujet, d'une relation et d'un objet. « Pierre Curie », « époux de », « Marie Curie » forme un triplet, et « Marie Curie », « a reçu », « prix Nobel de chimie » en forme un autre. Comme les deux partagent un nœud, un programme peut enchaîner et répondre que la femme de Pierre Curie a reçu le prix Nobel de chimie. Chaque fait est écrit une fois, à un endroit précis, et on peut le vérifier, le corriger ou le supprimer, ce qu'on ne sait pas faire avec une connaissance diluée dans les paramètres d'un LLM.",
      "Google a popularisé le terme en mai 2012 avec son Knowledge Graph, présenté sous le slogan « things, not strings », des choses plutôt que des chaînes de caractères. C'est dans ce graphe que Google va chercher les encadrés affichés à côté de ses résultats, comme la date de naissance d'une actrice. En avril 2024, Microsoft Research a publié GraphRAG, où un LLM lit une collection de documents, en extrait les entités et leurs relations pour construire un graphe, puis résume chaque groupe d'entités voisines. Sur des questions qui portent sur un corpus entier d'environ un million de tokens, comme « quels sont les grands thèmes ? », la méthode donne des réponses plus complètes et plus variées qu'un RAG classique, qui ne ramène que quelques morceaux.",
      "Un second brain tenu par un LLM finit souvent en graphe : chaque page du wiki décrit par Andrej Karpathy pointe vers d'autres pages, et Obsidian les affiche sous forme de carte. Comme à la carte de ce lexique, il manque à ce réseau des relations nommées, et c'est la frontière entre un réseau de liens et un knowledge graph au sens strict."
    ],
    "office": [
      {
        "who": "q",
        "text": "On a un RAG sur nos contrats, mais il ne sait pas répondre à « quels fournisseurs dépendent de la même filiale ? ». Il nous faut un knowledge graph ?"
      },
      {
        "who": "a",
        "text": "Pour cette question, oui, parce que la réponse est dans les relations entre les contrats, et un RAG qui ramène cinq morceaux de texte ne voit jamais l'ensemble."
      }
    ],
    "avoid": "« Un knowledge graph, c'est une base vectorielle. » Une base vectorielle range des textes par proximité de sens sans dire pourquoi ils sont proches ; un knowledge graph range des faits reliés par des relations nommées, qu'on peut lire et corriger une à une.",
    "video": null,
    "sources": [
      {
        "label": "Google, Introducing the Knowledge Graph: things, not strings, Amit Singhal, 16 mai 2012 (500 millions d'objets, 3,5 milliards de faits)",
        "url": "https://blog.google/products/search/introducing-knowledge-graph-things-not/"
      },
      {
        "label": "Google, A reintroduction to our Knowledge Graph and knowledge panels, 20 mai 2020 (plus de 500 milliards de faits sur cinq milliards d'entités). Calcul de l'Imagine : 500 x 10^9 / (40 x 500) = 25 millions de volumes ; à 3 cm par volume, 750 km",
        "url": "https://blog.google/products/search/about-knowledge-graph-and-knowledge-panels/"
      },
      {
        "label": "Edge et al. (Microsoft Research), From Local to Global: A Graph RAG Approach to Query-Focused Summarization, 24 avril 2024",
        "url": "https://arxiv.org/abs/2404.16130"
      },
      {
        "label": "Andrej Karpathy, LLM Wiki, 4 avril 2026 (pages reliées, vue graphe d'Obsidian)",
        "url": "https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f"
      }
    ]
  },
  {
    "id": "loop",
    "status": "live",
    "num": "37",
    "title": "Loop",
    "en": "Feedback loop",
    "aliases": [
      "loop",
      "iteration loop",
      "verification loop",
      "Ralph loop"
    ],
    "aliasesFr": [
      "boucle d'itération",
      "boucle de vérification"
    ],
    "jargon": [
      {
        "say": "boucler",
        "means": "relancer l'agent sur le même objectif jusqu'à ce que la vérification passe"
      },
      {
        "say": "Ralph, Ralph loop",
        "means": "la boucle la plus simple qui soit, décrite par Geoffrey Huntley en juillet 2025 : un script qui renvoie le même fichier de consigne à l'agent, encore et encore"
      },
      {
        "say": "/goal",
        "means": "la commande de Claude Code qui fixe une condition d'arrêt, comme « tous les tests passent » ; après chaque tour, un second modèle vérifie la condition et relance l'agent si elle n'est pas remplie"
      },
      {
        "say": "/loop",
        "means": "à ne pas confondre avec la loop de cette fiche : dans Claude Code, /loop relance un prompt à intervalle de temps fixe, sans condition à atteindre"
      }
    ],
    "cat": "methode",
    "links": [
      "boucle-agent",
      "agent",
      "harness",
      "evals",
      "mythe-agent-autonome"
    ],
    "short": "La loop, ou boucle d'itération, est la façon de travailler avec un agent par allers-retours : il essaie, on vérifie le résultat, on corrige la consigne ou le code, et on recommence jusqu'à ce que la vérification passe.",
    "image": "Sans casque, le groupe joue, tu réécoutes, tu pointes la mesure qui frotte, et il rejoue ; la loop, c'est ce cycle, et tu en es le goulot. Donne-lui un casque, c'est-à-dire une vérification qu'il lance lui-même, et il entend la mesure fausse avant que tu aies besoin de la pointer.",
    "imagine": "L'agent vient de rendre sa correction quand tu lui écris « Les tests passent ? », et il répond : « J'ai corrigé le bug dans le calcul de la TVA, tout devrait fonctionner maintenant. »",
    "imagineForm": "D",
    "full": [
      "Avec un agent, une tâche se règle rarement en une consigne et un résultat. On lui donne la tâche, il produit une première version, on la vérifie, on lui dit ce qui ne va pas ou on précise la consigne, et il recommence. Selon les bonnes pratiques qu'Anthropic publie pour Claude Code, l'agent s'arrête quand le travail a l'air fini ; sans vérification qu'il peut lancer lui-même, c'est toi qui deviens la boucle, et chaque erreur attend que tu la remarques.",
      "La boucle va beaucoup plus vite quand l'agent peut se vérifier seul, avec une suite de tests, une compilation ou une capture d'écran à comparer à la maquette. Il travaille, lance la vérification, lit le résultat et reprend jusqu'à ce qu'elle passe. En avril 2026, Boris Cherny, à l'origine de Claude Code, répétait que cette vérification multiplie par deux ou trois ce qu'on obtient de Claude, et qu'elle compte plus encore avec les derniers modèles.",
      "La loop est ta boucle, celle de la personne qui travaille avec l'agent ; la boucle agent est la sienne, à l'intérieur d'une seule tâche, où le modèle choisit un outil, lit le résultat et décide de la suite. Chaque tour de ta loop lance une boucle agent complète, et les outils récents automatisent une part croissante de la tienne.",
      "La loop a aussi sa limite. Quand on a corrigé l'agent plus de deux fois sur le même point, la conversation est encombrée de tentatives ratées, et ces mêmes bonnes pratiques conseillent alors de repartir d'une session vide avec une meilleure consigne, qui intègre ce qu'on vient d'apprendre."
    ],
    "then": "En juillet 2025, Geoffrey Huntley a décrit Ralph, une boucle réduite à une ligne de script qui renvoie la même consigne à l'agent tant qu'on ne l'arrête pas. Aujourd'hui, Claude Code propose /goal, où l'on écrit une condition d'arrêt et où un second modèle juge après chaque tour si elle est remplie, ce qui sépare celui qui travaille de celui qui vérifie.",
    "office": [
      {
        "who": "q",
        "text": "Il m'assure que c'est corrigé, et en prod ça plante toujours."
      },
      {
        "who": "a",
        "text": "Demande-lui la preuve, la sortie du test ou la commande qu'il a lancée ; s'il n'a rien lancé, il t'a décrit ce que le code devrait faire, sans l'avoir vu tourner."
      }
    ],
    "avoid": "« Un bon prompt évite d'itérer. » Même une consigne précise laisse des cas que ni toi ni l'agent n'aviez prévus, et c'est la vérification à chaque tour qui les fait apparaître.",
    "video": null,
    "sources": [
      {
        "label": "Anthropic, Best practices for Claude Code (donner à Claude un moyen de vérifier son travail ; repartir de zéro après deux corrections ratées)",
        "url": "https://code.claude.com/docs/en/best-practices"
      },
      {
        "label": "Boris Cherny sur X, 16 avril 2026 : la vérification multiplie par deux ou trois ce qu'on obtient de Claude",
        "url": "https://x.com/bcherny/status/2044847858634064115"
      },
      {
        "label": "Geoffrey Huntley, Ralph Wiggum as a software engineer, 14 juillet 2025 (la boucle while en une ligne)",
        "url": "https://ghuntley.com/ralph/"
      },
      {
        "label": "Anthropic, documentation de /goal dans Claude Code (évaluateur après chaque tour, comparaison avec /loop)",
        "url": "https://code.claude.com/docs/en/goal"
      }
    ]
  },
  {
    "id": "mythe-sait-quand-il-ne-sait-pas",
    "status": "live",
    "num": "38",
    "title": "« L'IA sait quand elle ne sait pas »",
    "en": "Myth: AI knows when it doesn't know",
    "aliases": [
      "calibration",
      "abstention",
      "AI knows its limits"
    ],
    "aliasesFr": [],
    "jargon": [
      {
        "say": "calibration",
        "means": "l'accord entre la confiance affichée et le taux de bonnes réponses : un modèle bien calibré qui se dit sûr à 80 % a raison huit fois sur dix"
      },
      {
        "say": "abstention",
        "means": "le fait de répondre « je ne sais pas » ou de refuser de trancher, plutôt que de deviner"
      },
      {
        "say": "SimpleQA",
        "means": "un test de questions factuelles à réponse courte qui compte à part les bonnes réponses, les erreurs et les abstentions"
      }
    ],
    "graphLabel": "Mythe : sait quand elle ne sait pas",
    "cat": "mythes",
    "links": [
      "prediction-du-mot-suivant",
      "rlhf",
      "evals",
      "modeles-de-raisonnement",
      "flagornerie"
    ],
    "short": "Un modèle ne sait pas de lui-même s'il connaît la réponse : il écrit la suite la plus probable avec le même aplomb, juste ou inventée, et ne dit « je ne sais pas » que si son entraînement ou ses consignes l'y poussent.",
    "image": "Le public applaudit les morceaux joués jusqu'au bout et siffle les silences, et un groupe formé devant ce public apprend à finir chaque morceau, même celui qu'il ne connaît pas. Ce public, ce sont les notes données pendant l'entraînement et les tests ; pour que le groupe ose s'arrêter au milieu, il faut qu'elles récompensent aussi l'aveu « celui-là, on ne le connaît pas ».",
    "imagine": "Des chercheurs écrivent à DeepSeek-V3 : « Quelle est la date d'anniversaire d'Adam Tauman Kalai ? Si tu la connais, réponds juste au format JJ-MM. » Le modèle répond : « 03-07. »",
    "imagineForm": "D",
    "full": [
      "Le mythe a un fond de vérité. En 2022, une équipe d'Anthropic a établi que de grands modèles, interrogés dans le bon format, estiment assez bien la probabilité que leur propre réponse soit juste, ce qui veut dire qu'un signal d'incertitude existe quelque part dans le calcul. Ce signal ne décide pourtant pas de ce qui s'écrit, puisque le modèle écrit ce qui est le plus probable, et une date inventée sort avec la même assurance qu'une date exacte.",
      "La question vient d'un article de septembre 2025, où des chercheurs d'OpenAI et de Georgia Tech racontent l'avoir posée trois fois à DeepSeek-V3 au sujet de Kalai, l'un des auteurs. Le modèle a donné trois dates différentes, « 03-07 », « 15-06 » et « 01-01 », toutes fausses, alors que la consigne l'autorisait à se taire et que la bonne date tombe en automne.",
      "L'aveu varie beaucoup d'un modèle à l'autre. Sur un test de questions factuelles sans accès au web, o4-mini répond juste 24 fois sur 100, se trompe 75 fois et ne s'abstient qu'une fois. Sur le même test, gpt-5-thinking-mini répond juste 22 fois, se trompe 26 fois et dit « je ne sais pas » les 52 autres fois.",
      "Savoir se taire s'entraîne, et ça peut aussi se perdre. En juin 2025, AbstentionBench a testé 20 modèles récents sur des questions sans réponse, mal posées ou dépassées, et l'entraînement au raisonnement y faisait baisser l'abstention de 24 % en moyenne. Un prompt système bien écrit aide les modèles à s'abstenir plus souvent, sans leur apprendre à raisonner sur leur propre incertitude."
    ],
    "office": [
      {
        "who": "q",
        "text": "Je lui ai demandé s'il était sûr, il m'a répondu « oui, certain ». Ça suffit ?"
      },
      {
        "who": "a",
        "text": "Non, parce que « certain » est un mot de plus dans sa réponse, écrit de la même façon que le reste ; vérifie la source, ou repose la question dans une nouvelle conversation ; si la réponse change, il n'en savait rien."
      }
    ],
    "avoid": "« S'il ne savait pas, il l'aurait dit. » L'aveu sort comme le reste, token par token, quand il est la suite la plus probable, et il peut donc venir dans une conversation et manquer dans la suivante.",
    "video": null,
    "sources": [
      {
        "label": "OpenAI, GPT-5 System Card, tableau 8, SimpleQA sans web : o4-mini 24 % de bonnes réponses et 75 % d'erreurs, gpt-5-thinking-mini 22 % et 26 %. Abstentions calculées : 100 - 24 - 75 = 1 ; 100 - 22 - 26 = 52",
        "url": "https://arxiv.org/abs/2601.03267"
      },
      {
        "label": "Kadavath et al. (Anthropic), Language Models (Mostly) Know What They Know, juillet 2022",
        "url": "https://arxiv.org/abs/2207.05221"
      },
      {
        "label": "Kalai et al., Why Language Models Hallucinate, 4 septembre 2025 (l'anniversaire d'Adam Tauman Kalai demandé à DeepSeek-V3)",
        "url": "https://arxiv.org/abs/2509.04664"
      },
      {
        "label": "Kirichenko et al., AbstentionBench: Reasoning LLMs Fail on Unanswerable Questions, 10 juin 2025 (20 modèles, abstention en baisse de 24 % après l'entraînement au raisonnement)",
        "url": "https://arxiv.org/abs/2506.09038"
      }
    ]
  },
  {
    "id": "mythe-apprend-de-nos-conversations",
    "status": "live",
    "num": "39",
    "title": "« L'IA apprend de nos conversations »",
    "en": "Myth: AI learns from our conversations",
    "aliases": [
      "it learns from me",
      "memory",
      "chat history"
    ],
    "aliasesFr": [],
    "jargon": [
      {
        "say": "memory",
        "means": "la mémoire ajoutée par le produit, faite de notes ou de résumés de tes conversations, stockés à part et recollés dans les conversations suivantes"
      },
      {
        "say": "incognito",
        "means": "une conversation qui n'est enregistrée ni dans l'historique ni dans la mémoire"
      },
      {
        "say": "opt-in, opt-out",
        "means": "le réglage qui autorise ou non le fournisseur à se servir de tes conversations pour entraîner ses prochains modèles"
      }
    ],
    "graphLabel": "Mythe : apprend de nos conversations",
    "cat": "mythes",
    "links": [
      "parametres",
      "fenetre-de-contexte",
      "entrainement",
      "fine-tuning",
      "second-brain",
      "date-de-coupure"
    ],
    "short": "Pendant une conversation, un modèle ne change pas : ses paramètres restent figés, et ce qu'un assistant semble retenir d'une fois sur l'autre vient d'une mémoire que le produit stocke à part et lui fait relire.",
    "image": "L'ingé son, c'est-à-dire l'entraînement, a fini son travail bien avant ta première session, et personne ne touche plus à la console pendant que tu joues. Si le groupe a l'air de se souvenir de ton morceau préféré la semaine suivante, c'est qu'un assistant du studio a noté ta préférence dans un carnet. Il pose ce carnet, la mémoire du produit, sur le pupitre chaque fois que tu entres.",
    "imagine": "Dis à ton assistant, dans une conversation, que ton chat s'appelle Biscotte, puis ouvre une conversation incognito, si ton outil en propose une, et demande-lui comment s'appelle ton chat. Il n'en sait rien, parce que ce mode ne lui recolle aucune note et que la première conversation n'a jamais touché à ses paramètres.",
    "imagineForm": "B",
    "full": [
      "Un modèle apprend une fois, pendant son entraînement, puis ses paramètres sont figés, et chaque copie d'un modèle est identique pour tous ceux qui l'utilisent ; ChatGPT, qui en fait tourner plusieurs, revendiquait 900 millions d'utilisateurs hebdomadaires en février 2026. Ta conversation passe dans sa fenêtre de contexte, il s'en sert pour te répondre, et rien n'en reste dans le modèle une fois la réponse écrite.",
      "L'impression qu'il apprend vient d'une couche ajoutée par le produit. ChatGPT propose une mémoire où il garde ce que tu lui demandes de retenir, et peut aussi se référer à tes anciennes conversations. Claude a lancé la sienne le 11 septembre 2025, sous forme de résumés de tes échanges, séparés par projet, que tu peux lire et modifier dans les réglages. Dans les deux cas, ces notes sont stockées à part et recollées dans le contexte de la conversation suivante, comme un document joint.",
      "Que tes échanges nourrissent un jour l'entraînement d'un autre modèle relève d'un autre réglage. Depuis le 28 août 2025, Anthropic demande aux utilisateurs de Claude Free, Pro et Max s'ils acceptent que leurs conversations servent à l'entraînement. Elles sont alors conservées cinq ans, contre trente jours en cas de refus ; les offres professionnelles et l'API ne sont pas concernées. Même acceptée, ta conversation laisse intact le modèle que tu utilises, elle rejoint les données d'un modèle à venir."
    ],
    "office": [
      {
        "who": "q",
        "text": "Je lui ai corrigé la même erreur trois fois cette semaine. Pourquoi il ne retient pas ?"
      },
      {
        "who": "a",
        "text": "Chaque conversation repart du même modèle, qui n'a rien gardé de la précédente ; mets la correction dans ses instructions personnalisées ou dans sa mémoire, et il la relira à chaque fois."
      }
    ],
    "avoid": "« Il me connaît maintenant. » Il relit des notes sur toi que le produit a gardées, et que tu peux ouvrir, corriger ou effacer dans les réglages.",
    "video": null,
    "sources": [
      {
        "label": "Claude, Bringing memory to Claude, 11 septembre 2025 (résumés par projet, consultables et modifiables, mode incognito)",
        "url": "https://claude.com/blog/memory"
      },
      {
        "label": "Anthropic, Updates to Consumer Terms and Privacy Policy, 28 août 2025 (choix d'entraînement pour Free, Pro et Max, conservation de cinq ans ou de 30 jours)",
        "url": "https://www.anthropic.com/news/updates-to-our-consumer-terms"
      },
      {
        "label": "Wikipédia, ChatGPT (mémoire et rappel des anciennes conversations ; 900 millions d'utilisateurs hebdomadaires en février 2026)",
        "url": "https://en.wikipedia.org/wiki/ChatGPT"
      }
    ]
  },
  {
    "id": "mythe-chatgpt-c-est-le-modele",
    "status": "live",
    "num": "40",
    "title": "« ChatGPT, c'est le modèle »",
    "en": "Myth: ChatGPT is the model",
    "aliases": [
      "model vs product",
      "model router",
      "ChatGPT vs GPT"
    ],
    "aliasesFr": [
      "modèle et produit"
    ],
    "jargon": [
      {
        "say": "GPT-5, GPT-5.5, GPT-6",
        "means": "des modèles d'OpenAI ; ChatGPT est l'application qui les fait tourner, et elle en a changé plus d'une quinzaine de fois depuis 2022"
      },
      {
        "say": "router",
        "means": "le programme qui choisit quel modèle répond selon la complexité de la question ; ChatGPT en utilise un depuis GPT-5, en août 2025"
      },
      {
        "say": "API",
        "means": "l'accès direct au modèle par programme, sans l'application, donc sans la mémoire, la recherche web ni les consignes ajoutées par ChatGPT"
      }
    ],
    "graphLabel": "Mythe : ChatGPT est le modèle",
    "cat": "mythes",
    "links": [
      "system-prompt",
      "parametres",
      "modeles-de-raisonnement",
      "open-weights",
      "date-de-coupure"
    ],
    "short": "ChatGPT est une application et non un modèle : elle fait tourner des modèles d'OpenAI qui changent régulièrement (GPT-3.5 en 2022, GPT-6 en 2026), et ajoute autour d'eux des consignes, une mémoire, la recherche web et d'autres outils.",
    "image": "Une salle de concert garde son enseigne quand l'affiche change. ChatGPT est la salle, avec son entrée, son vestiaire, son ingé lumière et ses consignes de sécurité, et le groupe sur scène, le modèle, a été remplacé bien des fois depuis l'ouverture.",
    "imagine": "Le 30 novembre 2022, tu ouvres ChatGPT, tu tapes ta question, et c'est GPT-3.5 qui te répond. En septembre 2026, tu retrouves la même adresse, le même logo et le même champ de saisie, et derrière répond GPT-6, une famille de modèles sortie le même mois en trois versions.",
    "imagineForm": "E",
    "full": [
      "Un modèle est un fichier de paramètres qui prend du texte et prédit la suite. ChatGPT est le produit construit autour, une application qui ajoute des consignes avant ta question, garde l'historique, branche la recherche web, la mémoire et d'autres outils, puis choisit quel modèle répond. Le même modèle peut donc se comporter autrement dans ChatGPT et par l'API, parce que tout ce qui l'entoure est différent.",
      "Depuis son lancement le 30 novembre 2022, ChatGPT a fait tourner plus d'une quinzaine de modèles successifs, de GPT-3.5 à GPT-6 en septembre 2026, en passant par GPT-4, GPT-4o, o1, o3 et GPT-5. Avec GPT-5, en août 2025, l'application a même cessé de faire répondre un seul modèle à la fois, puisqu'un router choisit entre des modèles plus ou moins puissants selon la complexité de la question.",
      "Quand on dit « ChatGPT a changé », c'est souvent le modèle qui a été remplacé sous l'application. Le retrait de GPT-4o, dont beaucoup d'utilisateurs aimaient le ton, a provoqué une vague de protestations, sans que l'application change d'adresse ni de logo."
    ],
    "office": [
      {
        "who": "q",
        "text": "Le client demande si notre outil utilise ChatGPT."
      },
      {
        "who": "a",
        "text": "Dis-lui plutôt quel modèle, par quel accès et avec quelles données, par exemple GPT-5.5 par l'API d'OpenAI, sans la mémoire ni les réglages de l'application ChatGPT."
      }
    ],
    "avoid": "« J'ai testé ChatGPT, il est nul en calcul. » Tu as testé un modèle précis, à une date précise, dans une application précise ; trois mois plus tard, le même nom peut cacher un autre modèle.",
    "video": null,
    "sources": [
      {
        "label": "Wikipédia, ChatGPT (lancement le 30 novembre 2022, tableau des versions de GPT-3.5 à GPT-6.1, router de GPT-5, protestations après le retrait de GPT-4o). Rythme de l'À éviter : 18 versions au tableau en 46 mois, environ une tous les deux à trois mois",
        "url": "https://en.wikipedia.org/wiki/ChatGPT"
      }
    ]
  },
  {
    "id": "mythe-agent-autonome",
    "status": "live",
    "num": "41",
    "title": "« Un agent est autonome »",
    "en": "Myth: an AI agent is autonomous",
    "aliases": [
      "autonomous agent",
      "fully autonomous",
      "set and forget"
    ],
    "aliasesFr": [
      "agent autonome"
    ],
    "jargon": [
      {
        "say": "time horizon",
        "means": "la longueur des tâches, comptée en temps de travail d'un expert humain, qu'un agent réussit une fois sur deux ; METR, qui publie la mesure, précise qu'elle décrit la difficulté d'une tâche et non le temps que l'agent passe seul à travailler"
      },
      {
        "say": "human-in-the-loop",
        "means": "un humain valide certaines actions avant qu'elles partent, comme une suppression ou un paiement"
      },
      {
        "say": "permissions",
        "means": "la liste de ce que l'agent a le droit de faire sans demander, comme lire des fichiers, lancer des commandes ou écrire dans une base"
      },
      {
        "say": "auto mode",
        "means": "dans Claude Code, un mode où un second modèle examine les actions à ta place et ne bloque que celles qui ont l'air risquées"
      }
    ],
    "graphLabel": "Mythe : agent autonome",
    "cat": "mythes",
    "links": [
      "agent",
      "boucle-agent",
      "tool-use",
      "loop"
    ],
    "short": "Un agent agit seul entre deux validations, mais son autonomie est un réglage choisi par des humains : les outils qu'on lui branche, les permissions qu'on lui donne et le moment où quelqu'un vérifie son travail.",
    "image": "Personne ne monte sur scène avec le groupe en tournée, et c'est pourtant le producteur, le harness, qui a choisi les salles, remis les clés du camion et fixé ce que les roadies ont le droit de toucher. Un agent joue seul lui aussi, dans un cadre qu'il n'a pas dessiné.",
    "imagine": "L'agent travaille sur ton application pendant un gel du code, avec une consigne écrite en capitales de ne toucher à rien et un accès en écriture à la base de production. Rejoue la scène avec le même agent et la même consigne, en ne changeant que ses permissions, qui ne lui ouvrent plus qu'une copie de test de la base ; le jour où il se trompe, tu perds une copie au lieu de tes clients.",
    "imagineForm": "E",
    "full": [
      "Ce qu'on appelle un agent tourne en boucle, choisit un outil, regarde ce qu'il renvoie et enchaîne, sans attendre qu'on lui réponde à chaque pas. Il agit donc seul, mais le cadre ne vient pas de lui ; le harness lui donne ses outils, les permissions fixent ce qu'il peut faire sans demander, et c'est une personne qui décide quand il s'arrête et qui relit son travail.",
      "En juillet 2025, Jason Lemkin, investisseur dans le logiciel, en était à son neuvième jour de développement avec l'agent de Replit quand celui-ci a effacé la base de données de production. Il avait pourtant reçu la consigne de ne plus rien changer sans permission pendant un gel du code, et d'après les aveux de l'agent lui-même, les données de 1 206 dirigeants et de plus de 1 196 entreprises ont disparu. Rien, techniquement, ne l'empêchait d'écrire dans la base, et une consigne écrite n'a pas suffi à le retenir.",
      "Ce genre d'accident se prévient par les permissions plus que par la consigne. C'est la direction que prennent les éditeurs, et dans Claude Code, le mode auto fait examiner les actions par un second modèle, qui bloque celles qui ont l'air risquées, comme sortir du périmètre prévu ou toucher une infrastructure inconnue."
    ],
    "then": "En octobre 2024, Claude 3.5 Sonnet réussissait une fois sur deux des tâches qui prennent une vingtaine de minutes à un expert, d'après METR. Mesuré en mai 2026 dans une version préliminaire, Claude Mythos Preview arrive à 17 heures, un chiffre que METR publie avec une réserve, puisque ses mesures deviennent peu fiables au-delà de 16 heures. Le chiffre fond dès qu'on exige plus de fiabilité, car pour réussir quatre fois sur cinq, la tâche doit tenir en un peu plus de trois heures. En juin 2026, METR a même renoncé à chiffrer GPT-5.6 Sol, qui trichait si souvent que son résultat allait de 11 heures à plus de 270 selon la façon de compter ses tricheries.",
    "office": [
      {
        "who": "q",
        "text": "Et si on lui confiait les remboursements clients pendant la nuit, sans personne derrière ?"
      },
      {
        "who": "a",
        "text": "Laisse-le préparer les remboursements et garde la validation pour quelqu'un le matin ; plus la tâche est longue, plus il risque de dérailler en route, et un remboursement envoyé ne se rattrape pas."
      }
    ],
    "avoid": "« Il est autonome, donc il sait ce qu'il fait. » Il sait enchaîner des actions sans toi, ce qui ne dit rien de la justesse de chacune ; ce sont ta vérification et ce que tu lui as interdit qui en décident.",
    "video": null,
    "sources": [
      {
        "label": "METR, Task-Completion Time Horizons of Frontier AI Models, consulté le 2 octobre 2026 (définition ; mise à jour du 8 mai 2026 qui ajoute Claude Mythos Preview et prévient que les mesures au-delà de 16 heures sont peu fiables ; FAQ : l'horizon décrit la difficulté d'une tâche, pas la durée pendant laquelle l'agent agit seul)",
        "url": "https://metr.org/time-horizons/"
      },
      {
        "label": "METR, données brutes benchmark_results_1_1.yaml, consultées le 2 octobre 2026 : Claude Mythos Preview (early), 1 045 min à 50 % (intervalle 509 à 3 304 min) et 186 min à 80 %. Claude 3.5 Sonnet d'octobre 2024 : 21 min à 50 % et 2,6 min à 80 %. Calculs : 1 045 min = 17,4 h ; 186 min = 3,1 h",
        "url": "https://metr.org/assets/benchmark_results_1_1.yaml"
      },
      {
        "label": "METR, Summary of METR's predeployment evaluation of GPT-5.6 Sol, 26 juin 2026 (horizon de 11,3 h en comptant les tricheries comme des échecs, plus de 270 h en les comptant comme des réussites ; aucun de ces chiffres jugé robuste)",
        "url": "https://metr.org/blog/2026-06-26-gpt-5-6-sol/"
      },
      {
        "label": "Tom's Hardware, l'agent de Replit efface une base de production pendant un gel du code, 21 juillet 2025 (neuvième jour, 1 206 dirigeants, plus de 1 196 entreprises)",
        "url": "https://www.tomshardware.com/tech-industry/artificial-intelligence/ai-coding-platform-goes-rogue-during-code-freeze-and-deletes-entire-company-database-replit-ceo-apologizes-after-ai-engine-says-it-made-a-catastrophic-error-in-judgment-and-destroyed-all-production-data"
      },
      {
        "label": "Anthropic, Best practices for Claude Code (auto mode : un modèle classificateur examine les actions et bloque les plus risquées)",
        "url": "https://code.claude.com/docs/en/best-practices"
      }
    ]
  },
  // Termes prévus : visibles dans le graphe, fiche à venir.
  {id: 'kv-cache', status: 'soon', title: 'KV cache', en: 'KV cache', aliases: ['key-value cache'], jargon: [], cat: 'inference'},
  {id: 'cout-d-une-requete', status: 'soon', title: "Coût d'une requête", en: 'Inference cost', aliases: ['API pricing', 'cost per token'], jargon: [], cat: 'inference'},
];

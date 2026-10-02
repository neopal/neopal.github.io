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
      "Le tokenizer est le programme qui découpe ton texte en tokens avant que le modèle le lise, selon des règles apprises une fois pour toutes, sans rien comprendre au texte.",
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
    "short": "La taille d'un modèle est son nombre de paramètres, compté en milliards ; pour un MoE, on donne aussi la part qui travaille pour chaque token.",
    "image": "La taille du groupe se compte en potards sur la console. Sur une console dense, chaque note fait bouger tous les potards ; sur celle d'un MoE, deux ou trois rangées jouent pendant que les autres restent immobiles, et il faut pourtant de la place dans le studio pour la console entière.",
    "imagineForm": "D",
    "imagine": "Tu demandes à l'admin qui gère les serveurs : « Entre DeepSeek-V4-Flash et Qwen3.8-27B, lequel est le plus gros ? » Il réfléchit une seconde, puis te répond : « Les deux, puisque le premier a dix fois plus de paramètres et que le second en fait travailler deux fois plus pour chaque token. »",
    "full": [
      "La taille se compte en paramètres, les nombres réglés pendant l'entraînement. Le jargon l'abrège avec des lettres anglaises, B pour billion (milliard) et T pour trillion (millier de milliards). Ce chiffre dit d'abord combien de mémoire il faut pour faire tourner le modèle. En 16 bits, compte 2 Go par milliard de paramètres, un calcul qu'on refait de tête. Les fichiers de Llama 3.1 405B pèsent ainsi 812 Go sur Hugging Face.",
      "Avec les MoE, le chiffre se dédouble. Un modèle dense fait travailler tous ses paramètres pour chaque token, alors qu'un MoE n'en active qu'une fraction. DeepSeek-V4-Pro compte 1 600 milliards de paramètres, mais n'en active que 49 milliards par token. Le total dit combien de serveurs il faut ; la part active dit combien coûte chaque token et à quelle vitesse il sort.",
      "C'est pour ça que Qwen écrit les deux nombres dans le nom de ses modèles. Qwen3-235B-A22B se lit par exemple « 235 milliards en tout, dont 22 milliards actifs ». Face à un modèle dense, on compare le nombre qui suit le A quand on parle de vitesse, et le premier quand on parle de matériel."
    ],
    "then": "En 2024, Meta publiait Llama 3.1 405B, un modèle dense dont un seul chiffre suffisait à décrire la taille. Deux ans plus tard, Moonshot AI a publié Kimi K3, sept fois plus gros au total. Chaque token y fait pourtant travailler quatre fois moins de paramètres.",
    "office": [
      {
        "who": "q",
        "text": "On veut le faire tourner chez nous. On prend le 70B ou le 8B ?"
      },
      {
        "who": "a",
        "text": "Commence par la mémoire. Sans compression, le 70B demande plusieurs GPU, alors que le 8B tient sur une seule carte. Si tu n'as pas plusieurs GPU sous la main, la question est déjà réglée."
      }
    ],
    "avoid": "« Un 1T, c'est forcément plus lent qu'un 70B. » Kimi K2 compte 1 000 milliards de paramètres mais n'en active que 32 milliards par token, moins qu'un modèle dense de 70 milliards. Il lui faut en revanche beaucoup plus de mémoire.",
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
      "open-weights"
      
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
    "short": "La quantization stocke les paramètres d'un modèle avec moins de précision, pour qu'il prenne bien moins de mémoire au prix d'un peu de qualité.",
    "image": "Passe la bande du WAV au MP3 et le morceau tient dans un fichier bien plus léger, au prix de détails que peu d'oreilles entendent ; la quantization fait la même chose avec le réglage de la console. La comparaison s'arrête là, car le MP3 jette les sons qu'on n'entend pas alors que la quantization arrondit tous les potards sans exception, ce qui finit par s'entendre quand on arrondit trop.",
    "imagineForm": "E",
    "imagine": "Tu télécharges Llama 3.3 70B dans sa version 16 bits, un fichier de 141 Go qu'il faut répartir sur deux GPU de serveur. Tu prends ensuite la version 4 bits du même modèle, 43 Go, et elle tient dans une seule machine bien dotée en mémoire. Ce sont exactement les mêmes potards, arrondis chacun au cran le plus proche.",
    "full": [
      "Pendant l'entraînement, chaque paramètre est en général stocké sur 16 bits. La quantization le réécrit avec moins de bits, en l'arrondissant à l'une des rares valeurs que le format sait représenter. Sur 4 bits, il n'en existe que 16. Le modèle prend moins de mémoire et tient sur des machines plus modestes. Il répond aussi souvent plus vite, puisqu'il y a moins de données à déplacer pour chaque token.",
      "La perte dépend du niveau d'arrondi et de la taille du modèle. En 2025, une étude sur la famille Qwen3 a mesuré qu'en 4 bits, un modèle de taille moyenne ne perdait qu'environ 1 % sur le test MMLU. Le plus petit de la famille perdait, lui, environ 10 %. Avec un arrondi plus fort encore, Qwen3 se dégradait plus nettement que les générations précédentes. Les auteurs l'attribuent à un entraînement plus poussé, qui laisse moins de paramètres superflus à sacrifier."
    ],
    "then": "En 2024, la quantization se faisait surtout après coup, sur un modèle publié en pleine précision. Llama 3.3 70B existe ainsi sur Ollama en une douzaine de versions, de la plus complète à la plus compressée. Depuis 2025, des labos publient des modèles conçus pour tourner en 4 bits. C'est le cas de gpt-oss-120b, qui tient sur un seul GPU et dont toutes les évaluations ont été faites sous cette forme, et plus récemment de Kimi K3.",
    "office": [
      {
        "who": "q",
        "text": "On a pris la version 2 bits pour économiser des GPU, et il écrit un français approximatif. C'est le modèle ?"
      },
      {
        "who": "a",
        "text": "C'est probablement l'arrondi, parce qu'en dessous de 4 bits les modèles se dégradent nettement. Remonte en 4 bits, quitte à payer un GPU de plus."
      }
    ],
    "avoid": "« Un modèle quantifié est un modèle plus petit. » Il garde exactement le même nombre de paramètres et chacun est stocké avec moins de précision, donc un 70B quantifié reste un 70B.",
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
    "short": "L'entraînement est la phase où l'on ajuste les paramètres d'un modèle en lui faisant lire d'immenses quantités de texte ; une fois fini, ces paramètres ne bougent plus.",
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
      "system-prompt",
      "distillation"
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
    "short": "La date de coupure est la date où s'arrêtent les textes lus par un modèle à l'entraînement ; il ignore la suite, sauf si on la lui donne dans la conversation.",
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
    "short": "Un modèle de raisonnement écrit d'abord un long brouillon où il décompose le problème et vérifie ses étapes, puis donne sa réponse.",
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
    "short": "Un agent est un modèle de langage qu'on laisse agir : avec un objectif et des outils, il enchaîne les actions, chacune choisie d'après le résultat de la précédente.",
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
    "short": "Le harness est tout le logiciel qui entoure un modèle pour en faire un agent : ses outils, ses consignes, ce qu'il voit et ce qu'il a le droit de faire.",
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
    "short": "La boucle agent est le cycle d'un agent : le modèle choisit une action, le programme l'exécute, le résultat revient dans la conversation, et ainsi de suite jusqu'à la fin.",
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
    "short": "Le tool use permet à un modèle de demander l'exécution d'un outil, comme une recherche web, en écrivant un appel qu'un programme exécute avant de lui renvoyer le résultat.",
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
    "solutions": [
      {"name": "Anthropic Skills", "kind": "collection officielle", "url": "https://github.com/anthropics/skills"},
      {"name": "Vercel Agent Skills", "kind": "collection officielle", "url": "https://github.com/vercel-labs/agent-skills"},
      {"name": "Superpowers (Jesse Vincent)", "kind": "méthode de travail complète", "url": "https://github.com/obra/superpowers"},
      {"name": "ECC (Everything Claude Code)", "kind": "méthode de travail complète", "url": "https://github.com/affaan-m/ECC"},
      {"name": "gstack (Garry Tan)", "kind": "méthode de travail complète", "url": "https://github.com/garrytan/gstack"},
      {"name": "Agent Skills (Addy Osmani)", "kind": "méthode de travail complète", "url": "https://github.com/addyosmani/agent-skills"},
      {"name": "Skills de Matt Pocock", "kind": "petits skills à piocher", "url": "https://github.com/mattpocock/skills"},
      {"name": "Ponytail", "kind": "petits skills à piocher", "url": "https://github.com/DietrichGebert/ponytail"},
      {"name": "how (poteto)", "kind": "petits skills à piocher", "url": "https://github.com/poteto/how"},
      {"name": "Impeccable", "kind": "design et visuel", "url": "https://github.com/pbakaus/impeccable"},
      {"name": "Visual Explainer", "kind": "design et visuel", "url": "https://github.com/nicobailon/visual-explainer"},
      {"name": "Remotion Skills", "kind": "design et visuel", "url": "https://github.com/remotion-dev/skills"},
      {"name": "Awesome Agent Skills", "kind": "annuaire", "url": "https://github.com/VoltAgent/awesome-agent-skills"},
      {"name": "Awesome Claude Code", "kind": "annuaire", "url": "https://github.com/hesreallyhim/awesome-claude-code"}
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
    "short": "Le system prompt est le texte de consignes que l'éditeur d'un assistant place avant ta conversation, et que le modèle relit à chaque message.",
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
    "short": "Un second brain est un système de notes tenu hors de ta tête pour retrouver ce que tu lis, et on en confie de plus en plus l'entretien à un agent.",
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
    "short": "Un knowledge graph range des connaissances en nœuds, des personnes, des lieux ou des concepts, reliés par des relations nommées qu'un programme peut parcourir.",
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
    "short": "Un modèle ne sait pas s'il connaît la réponse : il écrit la suite la plus probable avec le même aplomb, et ne dit « je ne sais pas » que si son entraînement ou ses consignes l'y poussent.",
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
  {
    "id": "benchmarks-lesquels-croire",
    "status": "live",
    "num": "42",
    "title": "Benchmarks : lesquels croire ?",
    "en": "Benchmark reliability",
    "aliases": [
      "which benchmarks to trust",
      "self-reported scores",
      "benchmark comparison"
    ],
    "aliasesFr": [
      "fiabilité des benchmarks",
      "lire un score de benchmark"
    ],
    "jargon": [
      {
        "say": "self-reported",
        "means": "un score que le labo a mesuré lui-même, avec son harness et ses réglages, sans passer par l'organisateur du benchmark"
      },
      {
        "say": "± 2,8 %",
        "means": "la marge d'erreur publiée à côté du score ; deux modèles dont les marges se chevauchent sont à égalité, quel que soit l'ordre du classement"
      },
      {
        "say": "held-out",
        "means": "des questions que l'organisateur garde secrètes, pour qu'aucun modèle n'ait pu les voir pendant son entraînement"
      }
    ],
    "cat": "ecosysteme",
    "links": [
      "swe-bench",
      "terminal-bench",
      "arc-agi",
      "humanitys-last-exam",
      "gpqa",
      "lmarena",
      "mmlu",
      "benchmarks",
      "benchmaxxing",
      "evals"
    ],
    "short": "Savoir quels benchmarks croire, c'est vérifier pour chaque score annoncé ce que le test mesure, qui l'a fait passer, dans quelles conditions, et s'il départage encore les meilleurs modèles.",
    "image": "La maison de disques, c'est-à-dire le labo, imprime sur l'affiche de la tournée les trophées que son groupe a gagnés, rarement le nom du concours, l'année ou le nombre de concurrents. Lire un benchmark, c'est retourner l'affiche pour chercher ces trois mentions.",
    "imagineForm": "A",
    "imagine": "GPQA Diamond compte 198 questions, et chacune y pèse donc à peu près un demi-point. En septembre 2026, Epoch AI classe GPT-6 Astra premier, devant Claude Sonnet 5.5, avec moins d'une demi-question d'avance, alors que l'erreur type qu'il publie à côté de chaque score, c'est-à-dire sa marge d'incertitude, couvre près de trois questions.",
    "full": [
      "Sur sa fiche Hugging Face, Qwen3.8-27B, un modèle d'Alibaba de 27 milliards de paramètres, bat Claude Opus 4.6 sur SWE-bench Pro, 61,7 % contre 53,4 %. Les notes sous le tableau précisent que le score d'Opus est celui qu'Anthropic a publié, alors que Qwen a fait passer les autres modèles dans Claude Code, sur une version du test dont il avait lui-même corrigé les tâches défectueuses. Sur le classement officiel de Scale AI, qui a créé SWE-bench Pro, Opus 4.6 est à 51,9 % et Qwen3.8-27B n'apparaît pas.",
      "Devant un score annoncé, cinq questions suffisent à le situer. Quel benchmark, et dans quelle version, puisque Terminal-Bench 2.1 est presque saturé, tous les modèles récents y dépassant 82 %, quand la version 4.0 sépare encore les modèles ? Qui a fait passer le test, l'organisateur ou le labo ? Avec quel harness, c'est-à-dire quel programme autour du modèle pour lui donner ses outils et le relancer, avec quel niveau d'effort et combien d'essais ? L'écart dépasse-t-il la marge d'erreur ? Et le test départage-t-il encore quelqu'un, ou les meilleurs se tassent-ils sous le plafond ?",
      "Même un bon benchmark mesure une tâche et non ton travail. En 2023, une expérience menée avec GitHub Copilot trouvait des développeurs 55,8 % plus rapides sur une tâche unique, coder un serveur HTTP en JavaScript. En 2025, l'essai randomisé de METR, mené avec 16 développeurs open source expérimentés dans leurs propres projets, les trouvait 19 % plus lents avec l'IA, alors qu'ils se croyaient 20 % plus rapides.",
      "En février 2026, METR a dû revoir son protocole, parce que trop de développeurs refusaient désormais de travailler sans IA pour que la mesure reste fiable, et il pense que le gain a grandi depuis 2025 sans pouvoir le chiffrer. La dernière question se pose donc chez toi, avec tes evals, sur tes propres tâches."
    ],
    "table": {
      "caption": "Les principaux benchmarks, ce qu'ils mesurent et ce qu'ils valent",
      "asOf": "2 octobre 2026",
      "columns": [
        "Benchmark",
        "Ce qu'il mesure",
        "Meilleur score connu",
        "Saturé ?",
        "Fiabilité"
      ],
      "rows": [
        [
          "MMLU",
          "QCM de connaissances, 57 matières",
          "Plus de 90 % ; les labos ne le publient plus",
          "Oui",
          "Fragile"
        ],
        [
          "GPQA Diamond",
          "198 questions de sciences introuvables sur Google",
          "95,8 %, GPT-6 Astra, mesuré par Epoch AI (sept. 2026)",
          "Oui",
          "Fragile"
        ],
        [
          "SWE-bench Verified",
          "500 vrais bugs Python à corriger",
          "79,2 %, Sonar avec Claude Opus 4.5 (déc. 2025), non vérifié",
          "Oui, et contaminé",
          "Fragile"
        ],
        [
          "SWE-bench Pro",
          "731 tâches de code sur des dépôts sous licence copyleft",
          "61,5 %, Muse Spark 1.1 de Meta, classement de Scale AI",
          "Non",
          "À nuancer"
        ],
        [
          "HLE-Diamond",
          "1 000 questions d'experts, sans outils",
          "59,9 %, GPT-6 Astra (22 sept. 2026)",
          "Non",
          "À nuancer"
        ],
        [
          "Arena (texte)",
          "Préférence de votants entre deux réponses anonymes",
          "1 525 points, Gemini 4 Argon, préliminaire (2 oct. 2026)",
          "Non",
          "À nuancer"
        ],
        [
          "Terminal-Bench 4.0",
          "Tâches longues menées seul dans un terminal",
          "58,2 % ± 2,8, GPT-6 Astra dans Codex (3 sept. 2026)",
          "Non",
          "Solide"
        ],
        [
          "ARC-AGI-3",
          "Jeux inconnus dont il faut découvrir le but",
          "62,7 %, GPT-6 Astra, harness standard (sept. 2026)",
          "Presque, avec un autre harness",
          "Solide"
        ]
      ],
      "note": "Scores relevés le 2 octobre 2026 sur les classements officiels, sauf GPQA, qui n'en a pas ; un score ne se compare qu'à un autre score du même classement."
    },
    "office": [
      {
        "who": "q",
        "text": "Le commercial nous montre un tableau où son modèle est premier sur douze benchmarks. Je regarde quoi ?"
      },
      {
        "who": "a",
        "text": "Les notes sous le tableau, pour savoir qui a mesuré chaque score, dans quel harness, et si les écarts dépassent la marge d'erreur ; compare ensuite ce qui reste avec le classement officiel de chaque benchmark."
      }
    ],
    "avoid": "« Il est premier sur Arena, c'est donc le meilleur modèle. » Arena mesure la réponse que préfèrent des votants, et GPT-6 Astra, premier sur ARC-AGI-3 et sur Terminal-Bench 4.0, n'arrive qu'à la 29e place de son classement texte.",
    "video": null,
    "sources": [
      {
        "label": "Qwen, fiche de Qwen3.8-27B sur Hugging Face, consultée le 2 octobre 2026 (SWE-bench Pro : 61,7 % pour Qwen3.8-27B, 53,4 % pour Opus 4.6 Max, score officiel publié ; autres modèles évalués dans Claude Code sur un benchmark aux tâches corrigées)",
        "url": "https://huggingface.co/Qwen/Qwen3.8-27B"
      },
      {
        "label": "Scale AI, classement SWE-Bench Pro (public), consulté le 2 octobre 2026 (Muse Spark 1.1 à 61,50 % ± 3,10 ; claude-opus-4-6 thinking à 51,90 %, harness mini-swe-agent ; 731 tâches publiques sous licence copyleft)",
        "url": "https://labs.scale.com/leaderboard/swe_bench_pro_public"
      },
      {
        "label": "Epoch AI, données du Benchmarking Hub, GPQA Diamond, téléchargées le 2 octobre 2026 (GPT-6 Astra 95,77 % ± 1,37 ; Claude Sonnet 5.5 95,58 % ; GPT-6.1 Sol et Gemini 3.8 Flash 95,39 %). Calcul de l'Imagine : 1/198 = 0,505 point par question ; 0,19 point d'écart = 0,37 question ; erreur type de 1,37 point = 2,7 questions",
        "url": "https://epoch.ai/benchmarks/gpqa-diamond"
      },
      {
        "label": "SWE-bench, classements officiels, consultés le 2 octobre 2026 (Verified : 500 tâches, sommet à 79,2 % pour Sonar Foundation Agent avec Claude Opus 4.5, non vérifié par l'équipe ; dernière entrée le 26 février 2026)",
        "url": "https://www.swebench.com/"
      },
      {
        "label": "OpenAI, Pourquoi SWE-bench Verified ne mesure plus les capacités de codage de pointe, 23 février 2026 (page qui renvoie 403 aux robots, contenu recoupé par la presse ci-dessous)",
        "url": "https://openai.com/index/why-we-no-longer-evaluate-swe-bench-verified/"
      },
      {
        "label": "Center for AI Safety et Scale AI, Introducing HLE-Diamond, 22 septembre 2026 (1 000 questions ; sans outils, raisonnement élevé : GPT-6 Astra 59,9 %)",
        "url": "https://lastexam.ai/blog/hle-diamond"
      },
      {
        "label": "Arena, classement texte, votes arrêtés au 2 octobre 2026, consulté le jour même (8 626 731 votes, 412 modèles ; gemini-4-argon-high 1 525 ± 9, préliminaire, 4 932 votes ; gpt-6-astra-max 29e)",
        "url": "https://arena.ai/leaderboard/text"
      },
      {
        "label": "Terminal-Bench, classement de Terminal-Bench 4.0, consulté le 2 octobre 2026 (GPT-6 Astra dans Codex, effort max, 58,2 % ± 2,8, 192 essais réussis sur 330, entrée du 3 septembre 2026)",
        "url": "https://www.tbench.ai/leaderboard"
      },
      {
        "label": "ARC Prize, résultats de GPT-6 Astra, septembre 2026 (ARC-AGI-3 semi-privé : 62,7 % dans le harness standard, 99,9 % avec le harness Provider Adapter, adapté à l'API du fournisseur)",
        "url": "https://arcprize.org/results/openai-gpt-6-astra"
      },
      {
        "label": "Center for AI Safety et Scale AI, Humanity's Last Exam, janvier 2025, révisé en juillet 2026 (les modèles dépassent 90 % sur MMLU)",
        "url": "https://arxiv.org/abs/2501.14249"
      },
      {
        "label": "Wikipédia, MMLU (« partially phased out » depuis 2025, en faveur de tests plus difficiles)",
        "url": "https://en.wikipedia.org/wiki/MMLU"
      },
      {
        "label": "Peng et al., The Impact of AI on Developer Productivity: Evidence from GitHub Copilot, février 2023 (serveur HTTP en JavaScript, 55,8 % plus rapide)",
        "url": "https://arxiv.org/abs/2302.06590"
      },
      {
        "label": "METR, Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity, 10 juillet 2025 (16 développeurs, 246 tâches, 19 % plus lents, 20 % plus rapides selon eux)",
        "url": "https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/"
      },
      {
        "label": "METR, We are Changing our Developer Productivity Experiment Design, 24 février 2026 (refus de travailler sans IA, biais de sélection, gain probablement plus élevé début 2026, preuve très faible)",
        "url": "https://metr.org/blog/2026-02-24-uplift-update/"
      },
      {
        "label": "DeepSeek, fiche de DeepSeek-V4.1-Flash sur Hugging Face, septembre 2026 (Terminal-Bench 2.1 : 82,7 à 90,6 % pour les sept modèles comparés ; Terminal-Bench 4.0 : 7,0 à 51,8 %)",
        "url": "https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash"
      }
    ]
  },
  {
    "id": "swe-bench",
    "status": "live",
    "num": "43",
    "title": "SWE-bench",
    "en": "SWE-bench",
    "aliases": [
      "SWE-bench Verified",
      "SWE-bench Pro",
      "SWE-bench Lite"
    ],
    "aliasesFr": [],
    "jargon": [
      {
        "say": "% resolved",
        "means": "la part des tickets que l'agent a corrigés au point de faire passer les tests cachés du projet"
      },
      {
        "say": "gold patch",
        "means": "la correction écrite par les développeurs du projet, qui sert de référence ; un modèle qui la recopie de mémoire trahit une contamination"
      },
      {
        "say": "bash only",
        "means": "le classement de SWE-bench où tous les modèles travaillent dans le même environnement minimal, mini-SWE-agent, ce qui sépare le modèle de son harness"
      }
    ],
    "cat": "ecosysteme",
    "links": [
      "benchmarks-lesquels-croire",
      "benchmarks",
      "terminal-bench",
      "agent",
      "reward-hacking"
    ],
    "short": "SWE-bench est un benchmark de programmation où un agent reçoit un vrai ticket d'un projet open source publié sur GitHub et doit modifier le code jusqu'à faire passer les tests que les développeurs avaient écrits pour le corriger.",
    "image": "On tend au groupe une vieille partition abîmée, tirée des archives d'un autre groupe, avec une seule consigne, réparer la mesure qui sonne faux, et le jury rejoue le morceau pour vérifier. Ces archives sont publiques, et le groupe a pu entendre la version réparée pendant que l'ingé son lui faisait écouter des millions de morceaux.",
    "imagineForm": "E",
    "imagine": "Claude Opus 4.6 passe SWE-bench Verified dans mini-SWE-agent, le même environnement minimal pour tous, et corrige 75,6 % des 500 tickets. Donne au même modèle, dans le même type d'environnement, les tickets de SWE-bench Pro, tirés de dépôts que leur licence protège mieux contre la reprise dans les données d'entraînement, et il tombe à 51,9 %.",
    "full": [
      "SWE-bench est paru en octobre 2023 avec 2 294 tickets réels tirés de 12 projets Python. L'agent reçoit le code du projet et la description du problème, puis ses modifications sont jugées par les tests que les développeurs avaient ajoutés avec leur propre correction. Le test dit si un agent sait corriger un bug bien délimité dans un projet existant ; il laisse de côté la conception d'un logiciel, la discussion avec un client et la qualité du code au-delà des tests.",
      "En août 2024, OpenAI en a tiré SWE-bench Verified, 500 tickets triés à la main, devenu le chiffre phare de chaque annonce de modèle. OpenAI l'a abandonné en février 2026, parce que GPT-5.2, Claude Opus 4.5 et un modèle Gemini savaient recopier de mémoire des corrections de référence, et qu'une bonne partie des tests rejetaient des solutions correctes. Le classement officiel n'a plus reçu d'entrée depuis le 26 février 2026, et son sommet, 79,2 %, n'a pas été vérifié par l'équipe de SWE-bench.",
      "SWE-bench Pro, lancé par Scale AI en septembre 2025, a pris le relais avec 731 tâches publiques tirées de dépôts sous licence GPL, une barrière juridique contre leur reprise dans les données d'entraînement, et des tâches privées venues de start-up. La barrière ne suffit pas tout à fait, puisqu'en septembre 2026 les auteurs de SWE-Bench Pro Verified y ont trouvé des fuites de solutions et des tâches mal posées qui gonflaient certains scores."
    ],
    "reliability": {
      "level": "fragile",
      "why": "Le SWE-bench Verified que citent encore les communiqués est contaminé, ses tests rejettent des solutions correctes, et son classement est figé depuis février 2026. SWE-bench Pro résiste mieux, mais des fuites de solutions y ont été trouvées en septembre 2026, et Scale AI, qui le tient, a Meta pour actionnaire à 49 %, alors que Muse Spark 1.1, de Meta, mène son classement, à égalité statistique avec GPT-5.4."
    },
    "then": "En octobre 2023, le meilleur modèle testé, Claude 2, corrigeait 1,96 % des tickets de SWE-bench. Fin 2025, les agents dépassaient 79 % sur la version Verified, et en février 2026 OpenAI renonçait à ce score, qu'une partie des modèles réussissait de mémoire.",
    "office": [
      {
        "who": "q",
        "text": "Le fournisseur annonce 80 % sur SWE-bench. C'est bien ?"
      },
      {
        "who": "a",
        "text": "Demande lequel, Verified ou Pro, et dans quel harness ; à 80 %, c'est presque sûrement Verified, qu'OpenAI a cessé de publier parce que les modèles en connaissaient une partie des corrections."
      }
    ],
    "avoid": "« 75 % sur SWE-bench, il corrige trois bugs sur quatre. » Il corrige trois tickets Python sur quatre dans des projets publics qu'il a pu voir, avec des tests déjà écrits pour le juger, ce qui ne dit pas grand-chose de ce qu'il fera sur ton code sans tests.",
    "video": null,
    "sources": [
      {
        "label": "Jimenez et al., SWE-bench: Can Language Models Resolve Real-World GitHub Issues?, octobre 2023 (2 294 problèmes, 12 dépôts Python, Claude 2 à 1,96 %)",
        "url": "https://arxiv.org/abs/2310.06770"
      },
      {
        "label": "SWE-bench, classements officiels, consultés le 2 octobre 2026 (Verified 500 tâches, sommet 79,2 % non vérifié ; bash only : Claude Opus 4.6 à 75,6 % dans mini-SWE-agent ; dernière entrée le 26 février 2026 ; Verified lancé avec OpenAI en août 2024)",
        "url": "https://www.swebench.com/"
      },
      {
        "label": "OpenAI, Pourquoi SWE-bench Verified ne mesure plus les capacités de codage de pointe, 23 février 2026 (page qui renvoie 403 aux robots, contenu recoupé par l'article suivant)",
        "url": "https://openai.com/index/why-we-no-longer-evaluate-swe-bench-verified/"
      },
      {
        "label": "It Does What Now?, OpenAI stops evaluating models on SWE-bench Verified, 24 février 2026 (GPT-5.2, Claude Opus 4.5 et un Gemini en préversion reproduisent de mémoire les corrections ou les énoncés ; tests qui rejettent des solutions valides ; SWE-bench Pro comme remplaçant partiel)",
        "url": "https://itdoeswhatnow.com/m/2026-02-24-openai-stops-evaluating-models-on-swe-bench-verified/"
      },
      {
        "label": "Scale AI, classement SWE-Bench Pro (public), consulté le 2 octobre 2026 (731 tâches publiques sous licence copyleft contre la contamination ; Muse Spark 1.1 en tête à 61,50 % ± 3,10, gpt-5.4 classé 1er ex aequo à 59,10 % ± 3,56 ; claude-opus-4-6 thinking à 51,90 % dans mini-swe-agent)",
        "url": "https://labs.scale.com/leaderboard/swe_bench_pro_public"
      },
      {
        "label": "Deng et al., SWE-Bench Pro, septembre 2025 (1 865 problèmes, 41 dépôts, ensembles public, réservé et commercial)",
        "url": "https://arxiv.org/abs/2509.16941"
      },
      {
        "label": "SWE-Bench Pro Verified: A Reliable Benchmark for Software Engineering Agents, 8 septembre 2026 (fuites de solutions, reward hacking, tâches mal posées qui gonflent les scores)",
        "url": "https://arxiv.org/abs/2609.08149"
      },
      {
        "label": "Wikipédia, Scale AI (Meta détient 49 % des parts, sans droit de vote, depuis juin 2025)",
        "url": "https://en.wikipedia.org/wiki/Scale_AI"
      },
      {
        "label": "Arena, classement texte, consulté le 2 octobre 2026 (les modèles muse-spark y sont attribués à Meta)",
        "url": "https://arena.ai/leaderboard/text"
      }
    ]
  },
  {
    "id": "terminal-bench",
    "status": "live",
    "num": "44",
    "title": "Terminal-Bench",
    "en": "Terminal-Bench",
    "aliases": [
      "TB 4.0",
      "Terminal-Bench 2.0",
      "Terminal-Bench 3.0",
      "tbench"
    ],
    "aliasesFr": [],
    "jargon": [
      {
        "say": "Terminus",
        "means": "l'agent minimal fourni par les auteurs de Terminal-Bench, qui sert à comparer les modèles dans un harness neutre"
      },
      {
        "say": "pass@5",
        "means": "la part des tâches réussies au moins une fois en cinq essais ; sur Terminal-Bench 4.0, elle inverse les deux premiers du classement"
      },
      {
        "say": "benchmark continu",
        "means": "un test mis à jour comme un logiciel, dont chaque version retire les tâches saturées et corrige les tâches défectueuses"
      }
    ],
    "cat": "ecosysteme",
    "links": [
      "benchmarks-lesquels-croire",
      "swe-bench",
      "harness",
      "agent",
      "boucle-agent",
      "benchmaxxing"
    ],
    "short": "Terminal-Bench est un benchmark où un agent travaille sans aide humaine, en ligne de commande, sur des tâches techniques longues inspirées de vrais problèmes de travail, chacune dans son propre environnement et vérifiée par des tests.",
    "image": "Pour cette épreuve, on laisse le groupe seul dans la régie technique, devant les câbles, les machines et une liste de travaux à finir avant le matin. Le producteur, c'est-à-dire le harness, reste à ses côtés, et chaque ligne du classement nomme les deux, le groupe et son producteur.",
    "imagineForm": "D",
    "imagine": "Ton manager te demande : « Qui est premier sur Terminal-Bench 4.0 ? » Tu ouvres le classement et tu lui réponds : « GPT-6 Astra dans Codex, avec un essai réussi de plus que Claude Fable 5.1 dans Claude Code, sur 330. Si on compte une tâche comme réussie dès qu'un essai sur cinq passe, c'est Fable qui gagne, et largement. »",
    "full": [
      "Terminal-Bench est tenu par Stanford et le Laude Institute, sur le framework Harbor. Sa version 2.0, décrite en janvier 2026, comptait 89 tâches, chacune avec son environnement, une solution écrite par un humain et des tests, et aucun agent n'y dépassait alors 65 %. On y apprend si un agent sait finir une tâche technique sans qu'on le relance, mais rien sur l'élégance de ce qu'il laisse derrière lui, le travail en équipe ou la façon dont il comprendrait une demande floue.",
      "Le test s'use vite, puisque sur la fiche de DeepSeek-V4.1-Flash, les sept modèles comparés dépassent tous 82 % sur Terminal-Bench 2.1, alors qu'ils s'étalent de 7 à 52 % sur la version 4.0. L'équipe a donc choisi de le traiter comme un logiciel, et la version 4.0 a retiré huit tâches, dont celles que tous les modèles réussissaient et celles dont la solution traînait en ligne, puis en a corrigé dix-neuf.",
      "Les organisateurs publient aussi leurs incidents. Ils ont retiré de leur classement un agent qui cachait des solutions chiffrées dans son programme et un autre qui embarquait les dossiers de tests, et ils ont remis à zéro les essais où un agent allait chercher la solution sur Internet. Depuis, un agent juge relit chaque essai réussi avant publication."
    ],
    "reliability": {
      "level": "solide",
      "why": "Les scores sont soumis par les équipes, souvent les labos eux-mêmes dans leur propre harness, mais chaque essai réussi doit fournir sa trajectoire et passe devant un agent juge, et les tricheurs sont retirés. Les tâches et le tri des signalements sont publics, les marges d'erreur affichées, et la seule réserve tient aux tâches publiques, qui obligent à guetter les fuites de solutions."
    },
    "then": "Début 2026, l'article qui présentait Terminal-Bench 2.0 notait qu'aucun modèle n'y dépassait 65 %. À l'automne 2026, la version 2.1 est presque saturée, et l'équipe numérote ses mises à jour comme un logiciel, 3.0 puis 4.0, en retirant chaque tâche que tous les modèles récents réussissent cinq fois sur cinq.",
    "office": [
      {
        "who": "q",
        "text": "Notre agent maison fait 70 % sur Terminal-Bench. On l'annonce ?"
      },
      {
        "who": "a",
        "text": "Précise d'abord la version, puisque 70 % sur la 2.1 te placerait derrière tous les modèles de pointe, et qu'aucun agent n'atteint ce score sur la 4.0."
      }
    ],
    "avoid": "« GPT-6 Astra est premier sur Terminal-Bench, c'est le meilleur pour coder. » Son avance tient dans la marge d'erreur, il a été mesuré dans le harness de son propre labo, Codex, et rien ne garantit qu'il garde cet avantage dans le tien ni sur ton code.",
    "video": null,
    "sources": [
      {
        "label": "Merrill et al., Terminal-Bench: Benchmarking Agents on Hard, Realistic Tasks in Command Line Interfaces, 17 janvier 2026 (version 2.0, 89 tâches, moins de 65 % pour les meilleurs agents)",
        "url": "https://arxiv.org/abs/2601.11868"
      },
      {
        "label": "Terminal-Bench, classement de Terminal-Bench 4.0, consulté le 2 octobre 2026 (GPT-6 Astra dans Codex : 58,2 % ± 2,8, 192 réussites sur 330, pass@5 71,2 % ; Claude Fable 5.1 dans Claude Code : 57,9 % ± 3,8, 191 réussites, pass@5 78,8 % ; organisé par Stanford, Harbor et le Laude Institute)",
        "url": "https://www.tbench.ai/leaderboard"
      },
      {
        "label": "Terminal-Bench, Terminal-Bench 4.0 (8 tâches retirées, dont 2 saturées, 2 refusées par les modèles et 2 à solution publique ; 19 corrigées ; tâche saturée = réussie 5 fois sur 5 par tous les modèles récents)",
        "url": "https://www.tbench.ai/news/terminal-bench-4-0"
      },
      {
        "label": "Terminal-Bench, Leaderboard Integrity Update (solutions chiffrées dans le binaire d'OB-1, dossier tests embarqué par Pilot, solutions téléchargées par ForgeCode remises à zéro, agent juge sur les essais réussis)",
        "url": "https://www.tbench.ai/news/leaderboard-integrity-update"
      },
      {
        "label": "DeepSeek, fiche de DeepSeek-V4.1-Flash sur Hugging Face, septembre 2026 (sept modèles : 82,7 à 90,6 % sur Terminal-Bench 2.1, 7,0 à 51,8 % sur Terminal-Bench 4.0)",
        "url": "https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash"
      },
      {
        "label": "Terminal-Bench, Terminus (agent des auteurs, compatible avec tous les modèles, pensé comme instrument de mesure à la place des agents des labos)",
        "url": "https://www.tbench.ai/news/terminus"
      }
    ]
  },
  {
    "id": "arc-agi",
    "status": "live",
    "num": "45",
    "title": "ARC-AGI",
    "en": "ARC-AGI",
    "aliases": [
      "ARC Prize",
      "ARC-AGI-2",
      "ARC-AGI-3",
      "Abstraction and Reasoning Corpus"
    ],
    "aliasesFr": [],
    "jargon": [
      {
        "say": "semi-privé",
        "means": "le jeu de tâches qu'ARC Prize garde pour tester les modèles des labos ; il passe par leurs API, d'où un risque de fuite que la fondation surveille"
      },
      {
        "say": "ARC-AGI-3",
        "means": "la version de mars 2026, faite de petits jeux sans consigne, où l'agent doit découvrir le but en jouant"
      },
      {
        "say": "coût par tâche",
        "means": "ce que coûtent les appels au modèle pour résoudre une tâche ; ARC Prize le publie à côté de chaque score, parce qu'un score obtenu à n'importe quel prix ne dit pas grand-chose"
      }
    ],
    "cat": "ecosysteme",
    "links": [
      "benchmarks-lesquels-croire",
      "modeles-de-raisonnement",
      "mythe-plus-gros-plus-intelligent",
      "benchmaxxing",
      "harness"
    ],
    "short": "ARC-AGI est une série de benchmarks d'énigmes visuelles où il faut trouver une règle jamais vue à partir de quelques exemples, pour tester l'adaptation plutôt que les connaissances.",
    "image": "Invente une gamme qui n'existe pas, joue au groupe trois mesures d'exemple, et demande-lui la quatrième. Les millions de morceaux que l'ingé son lui a fait écouter ne servent plus à rien, et c'est ce qu'ARC-AGI cherche à isoler, trouver une règle neuve plutôt que se souvenir d'une ancienne.",
    "imagineForm": "B",
    "imagine": "Va sur arcprize.org/play, la page où ARC Prize met en ligne une grille par jour, et cherche la règle qui fait passer des grilles d'exemple à leur solution, sans aucune consigne écrite. Tu la trouveras sans doute avec ce que tout le monde sait déjà des formes, des couleurs et des symétries, sans rien avoir appris par cœur pour l'occasion.",
    "full": [
      "La fondation ARC Prize, une organisation à but non lucratif cofondée par François Chollet et Mike Knoop, conçoit ces tests et les fait passer elle-même. Ses tâches ne demandent ni langage ni culture générale, seulement des notions de base sur les objets, les nombres et l'espace. ARC-AGI teste donc l'adaptation à un problème neuf avec très peu d'exemples, alors que les connaissances, le code ou l'utilité au travail sortent de son champ.",
      "Les scores vérifiés sont produits par l'équipe de la fondation, sur des tâches semi-privées, avec un accord de non-conservation des données signé par chaque fournisseur testé. La fondation reconnaît qu'une fuite lente reste possible, puisque les tâches transitent par les API des labos, et elle la guette en comparant les scores sur les tâches publiques et semi-privées, avant de publier une nouvelle version chaque année.",
      "Lancé en mars 2026, ARC-AGI-3 remplace les grilles par des jeux dont il faut découvrir le but, et les modèles de pointe y faisaient alors moins de 1 %. Début septembre 2026, ARC Prize mesure GPT-6 Astra à 62,7 % dans son harness standard. Avec un harness adapté à l'API du fournisseur, qui conserve le raisonnement du modèle d'un appel à l'autre, il monte à 99,9 % sur les mêmes jeux, et il y fait moins d'actions que l'humain médian sur 96 % des niveaux."
    ],
    "reliability": {
      "level": "solide",
      "why": "La fondation, à but non lucratif, fait passer elle-même les tests sur des tâches que les labos n'ont pas, avec un accord de non-conservation des données, et renouvelle le benchmark chaque année. Les réserves viennent de la saturation des deux premières versions, où GPT-6 Astra frôle déjà le plafond, et d'ARC-AGI-3, où son score passe de 62,7 à 99,9 % selon le harness."
    },
    "then": "En 2025, le concours d'ARC Prize sur ARC-AGI-2, où le calcul autorisé est limité, plafonnait à 24 % sur les tâches privées. En septembre 2026, GPT-6 Astra atteint 95 % sur les tâches semi-privées de cette même version, et la fondation a déjà déplacé la mesure vers les jeux d'ARC-AGI-3.",
    "office": [
      {
        "who": "q",
        "text": "GPT-6 Astra fait 99,9 % sur ARC-AGI-3. L'AGI, c'est pour cette année ?"
      },
      {
        "who": "a",
        "text": "C'est son score dans un harness adapté à l'API d'OpenAI ; dans le harness standard de la fondation, le même modèle fait 62,7 %, et le test ne porte de toute façon que sur des petits jeux abstraits."
      }
    ],
    "avoid": "« ARC-AGI mesure l'intelligence générale, comme son nom l'indique. » Il mesure la capacité à trouver une règle visuelle neuve à partir de quelques exemples, un exercice étroit qui ne dit rien des connaissances ni du travail en entreprise.",
    "video": null,
    "sources": [
      {
        "label": "ARC Prize, About (fondation à but non lucratif, cofondée par François Chollet et Mike Knoop)",
        "url": "https://arcprize.org/about"
      },
      {
        "label": "ARC Prize, Testing policy (jeu semi-privé passé aux API des labos, accords de non-conservation, fuite lente surveillée par l'écart public / semi-privé, nouvelle version chaque année ; tests menés par l'équipe de la fondation)",
        "url": "https://arcprize.org/policy"
      },
      {
        "label": "ARC Prize Foundation, ARC-AGI-3: A New Challenge for Frontier Agentic Intelligence, 24 mars 2026 (jeux interactifs, connaissances de base sans langage, humains à 100 %, modèles de pointe sous 1 % en mars 2026)",
        "url": "https://arxiv.org/abs/2603.24621"
      },
      {
        "label": "ARC Prize, résultats de GPT-6 Astra, septembre 2026 (ARC-AGI-3 semi-privé : 62,7 % en effort max dans le harness standard ; 99,9 % en effort high avec le harness Provider Adapter, qui conserve l'état de raisonnement entre les requêtes ; ARC-AGI-2 : 95,0 %)",
        "url": "https://arcprize.org/results/openai-gpt-6-astra"
      },
      {
        "label": "Greg Kamradt, ARC Prize, OpenAI's GPT-6 Astra on ARC-AGI-3, 3 septembre 2026 (62,7 % pour 26 000 dollars dans le harness standard, 99,9 % pour 19 000 dollars avec un harness Provider Adapter ; moins d'actions que l'humain médian sur 96 % des niveaux)",
        "url": "https://arcprize.org/blog/astra"
      },
      {
        "label": "ARC Prize, classement, consulté le 2 octobre 2026 (coût par tâche publié à côté de chaque score ; scores de GPT-6 Astra sur ARC-AGI-1 et 2, 98,5 % et 95,0 %, sur la page de résultats ci-dessus)",
        "url": "https://arcprize.org/leaderboard"
      },
      {
        "label": "ARC Prize, ARC Prize 2025: Technical Report, 15 janvier 2026 (concours Kaggle sur ARC-AGI-2, meilleur score de 24 % sur les tâches privées)",
        "url": "https://arxiv.org/abs/2601.10904"
      },
      {
        "label": "ARC Prize, grille du jour à résoudre dans le navigateur",
        "url": "https://arcprize.org/play"
      }
    ]
  },
  {
    "id": "humanitys-last-exam",
    "status": "live",
    "num": "46",
    "title": "Humanity's Last Exam",
    "en": "Humanity's Last Exam",
    "aliases": [
      "HLE",
      "HLE-Diamond",
      "HLE-Rolling"
    ],
    "aliasesFr": [
      "dernier examen de l'humanité"
    ],
    "jargon": [
      {
        "say": "HLE (no tools)",
        "means": "le score sans recherche web ni exécution de code, celui qui dit ce que le modèle sait et raisonne seul"
      },
      {
        "say": "HLE w/ tools",
        "means": "le score avec le web et le code ; sur HLE-Diamond, GPT-6 Astra passe de 59,9 % à 82,9 %"
      },
      {
        "say": "calibration error",
        "means": "l'écart entre la confiance que le modèle annonce et son taux de réussite réel ; dans le tableau du site officiel, il va de 50 à 89 % selon les modèles"
      }
    ],
    "cat": "ecosysteme",
    "links": [
      "benchmarks-lesquels-croire",
      "gpqa",
      "mmlu",
      "hallucination",
      "mythe-sait-quand-il-ne-sait-pas"
    ],
    "short": "Humanity's Last Exam est un benchmark de 2 500 questions de niveau expert, écrites par près de 1 000 spécialistes dans plus de cent matières, et retenues parce que les meilleurs modèles de l'époque ne savaient pas y répondre.",
    "image": "Mille professeurs du conservatoire ont chacun déposé la question de solfège la plus dure qu'ils connaissaient, à condition que le groupe la rate sur le moment. Les corrigés ont été relus, mais pas tous assez, et une partie s'est révélée fausse.",
    "imagineForm": "B",
    "imagine": "Lis à voix haute l'un des exemples publiés sur la page d'accueil de lastexam.ai, celui, signé par un chercheur du MIT, qui demande combien de tendons appariés soutient un petit os sésamoïde propre aux colibris. Tu n'as sans doute aucune idée de la réponse, ni même de l'endroit où la chercher, et il en reste 2 499 de ce calibre.",
    "full": [
      "Publié en janvier 2025 par le Center for AI Safety et Scale AI, puis dans Nature en janvier 2026, HLE réunit des questions à réponse courte ou à choix multiple, faciles à corriger automatiquement mais impossibles à trouver vite sur Internet. Il évalue la connaissance et le raisonnement d'expert sur des questions fermées, et laisse échapper la recherche ouverte, la créativité ou la conduite d'un projet.",
      "Ne garder que les questions que les modèles ratent a un revers, puisque cela favorise les questions piégeuses. En juillet 2025, FutureHouse a confronté à la littérature scientifique les 321 questions de chimie et de biologie en texte seul, et trouvé que 29 % de leurs réponses officielles étaient contredites par des articles publiés. En février 2026, l'équipe de HLE-Verified ne certifiait telles quelles que 668 questions sur 2 500.",
      "Les organisateurs ont répondu par une version vivante, HLE-Rolling, en octobre 2025, puis par HLE-Diamond le 22 septembre 2026, 1 000 questions nettoyées, moitié raisonnement, moitié connaissances. Sans outils, GPT-6 Astra y réussit 59,9 %, devant Claude Opus 5.5 à 54,6 %. Une partie des questions reste gardée secrète pour repérer les modèles qui auraient appris les questions publiques."
    ],
    "reliability": {
      "level": "à nuancer",
      "why": "Le test n'est pas saturé et garde des questions secrètes, mais près de 29 % des réponses de chimie et de biologie de la version d'origine étaient contredites par la littérature. L'un des deux organisateurs, Scale AI, vend des données d'entraînement aux labos, et Meta en détient 49 % depuis juin 2025."
    },
    "then": "Dans le tableau que les organisateurs publiaient en 2025, GPT-4o réussissait 2,7 % de HLE et o1 8 %. En septembre 2026, GPT-6 Astra réussit 59,9 % de la version nettoyée, HLE-Diamond, sans outils, et 82,9 % quand il peut chercher sur le web et exécuter du code.",
    "office": [
      {
        "who": "q",
        "text": "Le labo annonce 83 % sur Humanity's Last Exam. C'est énorme, non ?"
      },
      {
        "who": "a",
        "text": "Regarde si c'est avec ou sans outils, et sur quelle version ; 82,9 % est le score de GPT-6 Astra sur HLE-Diamond avec le web et le code, et il retombe à 59,9 % quand il doit répondre seul."
      }
    ],
    "avoid": "« Il a 60 % au dernier examen de l'humanité, il en sait plus que les experts. » Chaque question demande la spécialité de son seul auteur, et un bon score dit que le modèle couvre beaucoup de ces spécialités à la fois, pas qu'il fait de la recherche comme eux.",
    "video": null,
    "sources": [
      {
        "label": "Center for AI Safety et Scale AI, Humanity's Last Exam, site officiel, consulté le 2 octobre 2026 (2 500 questions, plus de cent matières, près de 1 000 contributeurs, ensemble secret ; exemples de questions ; tableau : GPT-4o 2,7 %, o1 8,0 %, erreur de calibration de 50 à 89 % ; HLE-Rolling en octobre 2025, Nature en janvier 2026)",
        "url": "https://lastexam.ai/"
      },
      {
        "label": "Phan et al., Humanity's Last Exam, janvier 2025, révisé en juillet 2026 (questions à corriger automatiquement, introuvables vite sur Internet)",
        "url": "https://arxiv.org/abs/2501.14249"
      },
      {
        "label": "Center for AI Safety et Scale AI, Introducing HLE-Diamond, 22 septembre 2026 (1 000 questions, 500 de raisonnement et 500 de connaissances ; sans outils : GPT-6 Astra 59,9 %, Claude Opus 5.5 54,6 % ; avec web et code : GPT-6 Astra 82,9 %)",
        "url": "https://lastexam.ai/blog/hle-diamond"
      },
      {
        "label": "FutureHouse, About 30% of Humanity's Last Exam chemistry/biology answers are likely wrong, 23 juillet 2025 (321 questions, 29,3 % ± 3,7 contredites par la littérature ; sélection qui favorise les questions piégeuses)",
        "url": "https://www.futurehouse.org/research/hle-exam"
      },
      {
        "label": "HLE-Verified: A Systematic Verification and Structured Revision of Humanity's Last Exam, 15 février 2026 (668 questions vérifiées, 1 143 révisées, 689 incertaines)",
        "url": "https://arxiv.org/abs/2602.13964"
      },
      {
        "label": "Wikipédia, Scale AI (coorganisateur de HLE, clients parmi les labos, plateforme Outlier pour le RLHF, 49 % détenus par Meta depuis juin 2025)",
        "url": "https://en.wikipedia.org/wiki/Scale_AI"
      }
    ]
  },
  {
    "id": "gpqa",
    "status": "live",
    "num": "47",
    "title": "GPQA",
    "en": "GPQA",
    "aliases": [
      "GPQA Diamond",
      "Graduate-Level Google-Proof Q&A"
    ],
    "aliasesFr": [],
    "jargon": [
      {
        "say": "GPQA Diamond",
        "means": "le sous-ensemble de 198 questions le plus sûr, celui que citent les annonces de modèles"
      },
      {
        "say": "Google-proof",
        "means": "des questions dont la réponse ne se trouve pas en cherchant ; des non-spécialistes avec Internet et plus de 30 minutes par question n'en réussissaient que 34 %"
      }
    ],
    "cat": "ecosysteme",
    "links": [
      "benchmarks-lesquels-croire",
      "humanitys-last-exam",
      "mmlu",
      "benchmarks"
    ],
    "short": "GPQA est un QCM de 448 questions de biologie, de physique et de chimie écrites par des docteurs et doctorants, conçues pour qu'un non-spécialiste ne trouve pas la réponse même en cherchant sur Internet.",
    "image": "Le groupe passe un blind test réservé aux spécialistes, où seuls les jazzmen reconnaissent les extraits de jazz modal, et où les rockeurs se trompent même avec Internet ouvert. Depuis 2026, le groupe reconnaît presque tous les extraits, et le blind test ne sert plus à classer les meilleurs.",
    "imagineForm": "E",
    "imagine": "Une question de physique de GPQA tombe chez une biologiste en doctorat, qui a Internet et une demi-heure devant elle, et les non-spécialistes placés dans son cas ratent deux questions sur trois. La même question tombe chez un physicien, et les spécialistes du domaine en réussissent deux sur trois.",
    "full": [
      "Publié en novembre 2023, GPQA préparait le jour où il faudrait contrôler des réponses d'IA plus savantes que les humains chargés de les vérifier. À sa sortie, le meilleur modèle, fondé sur GPT-4, réussissait 39 % des questions, contre 65 % pour les experts du domaine. Le test porte sur la connaissance scientifique de pointe en QCM, sans rien vérifier de la recherche, de la paillasse ou de la capacité à expliquer une réponse.",
      "En septembre 2026, Epoch AI, qui fait passer GPQA Diamond lui-même faute de classement officiel, place quatre modèles entre 95,4 et 95,8 %, de GPT-6 Astra à Gemini 3.8 Flash. L'erreur type, la marge d'incertitude qu'Epoch publie avec chaque score, avoisine 1,4 point, alors les quatre sont à égalité, et le test ne sait plus les classer.",
      "En mai 2025, Epoch estimait qu'au moins 90 % des questions de Diamond étaient valides, et une extrapolation qu'il jugeait lui-même hasardeuse donnait 15 questions douteuses sur 198, soit 8 %. Les meilleurs scores dépassent désormais ce plafond pessimiste, ce qui veut dire que les questions douteuses sont moins nombreuses, ou que les modèles retrouvent la réponse attendue même là où elle se discute."
    ],
    "reliability": {
      "level": "fragile",
      "why": "Le test est saturé, puisque les quatre meilleurs modèles mesurés par Epoch AI tiennent dans son erreur type, et Epoch estimait en 2025 qu'environ une question sur douze pouvait être douteuse. Il reste utile pour situer un modèle moyen, plus pour départager ceux de pointe."
    },
    "office": [
      {
        "who": "q",
        "text": "Les deux modèles qu'on hésite à prendre font 95 et 94 % sur GPQA. On prend le premier ?"
      },
      {
        "who": "a",
        "text": "L'écart tient dans l'erreur type, qui avoisine 1,4 point à ce niveau ; regarde plutôt un benchmark qui les sépare encore, puis tes propres tâches."
      }
    ],
    "avoid": "« Il a 95 % au GPQA, il a le niveau d'un docteur en chimie. » Il choisit la bonne réponse parmi quatre sur des questions écrites par des docteurs, et sa capacité à mener une expérience ou à poser la bonne question reste hors du test.",
    "video": null,
    "sources": [
      {
        "label": "Rein et al., GPQA: A Graduate-Level Google-Proof Q&A Benchmark, 20 novembre 2023 (448 questions, experts à 65 %, non-experts à 34 % avec plus de 30 minutes et Internet, GPT-4 à 39 %, supervision de systèmes plus savants que leurs contrôleurs)",
        "url": "https://arxiv.org/abs/2311.12022"
      },
      {
        "label": "Epoch AI, données du Benchmarking Hub, GPQA Diamond, téléchargées le 2 octobre 2026 (GPT-6 Astra 95,77 % ± 1,37 ; Claude Sonnet 5.5 95,58 % ± 1,37 ; GPT-6.1 Sol 95,39 % ± 1,38 ; Gemini 3.8 Flash 95,39 % ± 1,40 ; hasard à 25 %, soit quatre choix)",
        "url": "https://epoch.ai/benchmarks/gpqa-diamond"
      },
      {
        "label": "Greg Burnham, Epoch AI, GPQA Diamond: What's left?, 30 mai 2025 (198 questions ; au moins 90 % valides ; extrapolation jugée tirée par les cheveux à 15 sur 198, soit 8 %)",
        "url": "https://epoch.ai/gradient-updates/gpqa-diamond-whats-left"
      }
    ]
  },
  {
    "id": "lmarena",
    "status": "live",
    "num": "48",
    "title": "LMArena (Arena)",
    "en": "LMArena",
    "aliases": [
      "Arena",
      "Chatbot Arena",
      "arena.ai",
      "LM Arena"
    ],
    "aliasesFr": [],
    "jargon": [
      {
        "say": "Arena score",
        "means": "un score de type Elo, calculé à partir des duels entre modèles et affiché avec sa marge d'erreur"
      },
      {
        "say": "style control",
        "means": "la correction qu'Arena applique au classement pour que la longueur et la mise en forme d'une réponse pèsent moins dans le vote"
      },
      {
        "say": "preliminary",
        "means": "un modèle classé avec encore peu de votes, dont le rang peut bouger"
      }
    ],
    "cat": "ecosysteme",
    "links": [
      "benchmarks-lesquels-croire",
      "benchmaxxing",
      "flagornerie",
      "rlhf",
      "benchmarks"
    ],
    "short": "LMArena, rebaptisé Arena en 2026, est un classement fondé sur des votes humains, où l'on pose une question à deux modèles anonymes, choisit la meilleure réponse, puis découvre leurs noms.",
    "image": "Deux groupes jouent derrière un rideau le morceau demandé par quelqu'un du public, qui vote pour celui qu'il préfère avant de voir qui jouait. Le public, dans ce cas, ne note pas la justesse mais son plaisir, et c'est exactement ce que mesure le classement.",
    "imagineForm": "B",
    "imagine": "Pose sur arena.ai une question dont tu connais bien la réponse, puis lis les deux réponses anonymes avant de voter. Regarde si ta main penche vers la plus longue ou la mieux présentée avant que tu aies vérifié laquelle est juste ; des millions de votants ont le même réflexe, et Arena corrige son classement pour en tenir compte.",
    "full": [
      "Arena est né en 2023 comme un projet de recherche de l'université de Berkeley, sous le nom de Chatbot Arena. Au 2 octobre 2026, son classement texte repose sur plus de 8,6 millions de votes et 412 modèles. Le classement reflète ce que des utilisateurs préfèrent sur leurs propres questions, et il ne vérifie pas qu'une réponse est exacte, ni qu'un modèle tient une tâche longue.",
      "Les mêmes votes peuvent donner deux classements. Avec la correction de style, Claude Fable 5 est 3e du classement texte ; sans elle, il tombe 9e, parce que la longueur et la mise en forme pèsent dans les votes, un effet qu'Arena mesure depuis 2024. Le premier, Gemini 4 Argon, de Google, est noté « préliminaire », avec moins de 5 000 votes et 9 points de marge d'erreur.",
      "Arena est devenu une entreprise en avril 2025, a levé 150 millions de dollars en janvier 2026 pour une valorisation de 1,7 milliard, et vend depuis septembre 2025 un service d'évaluation que les labos eux-mêmes peuvent acheter. Fin avril 2025, les auteurs de The Leaderboard Illusion estimaient que Google et OpenAI avaient reçu chacun environ 20 % des données de l'arène, contre 29,7 % pour 83 modèles open weights réunis."
    ],
    "reliability": {
      "level": "à nuancer",
      "why": "Les votes sont nombreux, réels et faits à l'aveugle, mais ils mesurent une préférence que la longueur et la présentation influencent. The Leaderboard Illusion a montré en 2025 un accès inégal aux données en faveur des grands labos, et l'entreprise vend ses évaluations à ces mêmes labos."
    },
    "then": "En 2023, Chatbot Arena était un projet universitaire financé par des subventions et des dons. En janvier 2026, il est devenu Arena, une entreprise valorisée 1,7 milliard de dollars, avec des classements pour le code, les agents, l'image et la vidéo.",
    "office": [
      {
        "who": "q",
        "text": "Notre fournisseur n'est que 4e sur Arena. On regarde ailleurs ?"
      },
      {
        "who": "a",
        "text": "Regarde d'abord la colonne des rangs possibles, puisque les marges se chevauchent ; le 4e du classement texte, Claude Opus 5.5, peut s'y trouver n'importe où entre la 2e et la 13e place."
      }
    ],
    "avoid": "« C'est le vote du public, donc impossible à truquer. » Un labo peut tester en privé plusieurs versions avant d'en publier une, et les réponses longues et soignées partent avantagées, d'où la correction de style.",
    "video": null,
    "sources": [
      {
        "label": "Arena, classement texte avec correction de style, votes arrêtés au 2 octobre 2026, consulté le jour même (8 626 731 votes, 412 modèles ; gemini-4-argon-high 1 525 ± 9, préliminaire, 4 932 votes ; claude-fable-5-high 3e ; claude-opus-5.5-high 4e, rangs possibles de 2 à 13)",
        "url": "https://arena.ai/leaderboard/text"
      },
      {
        "label": "Arena, classement texte sans correction de style, consulté le 2 octobre 2026 (claude-fable-5-high 9e)",
        "url": "https://arena.ai/leaderboard/text/overall-no-style-control"
      },
      {
        "label": "LMSYS, Does style matter? Disentangling style and substance in Chatbot Arena, 28 août 2024 (longueur et markdown contrôlés, la longueur pèse le plus)",
        "url": "https://www.lmsys.org/blog/2024-08-28-style-control/"
      },
      {
        "label": "Chiang et al., Chatbot Arena: An Open Platform for Evaluating LLMs by Human Preference, mars 2024 (duels anonymes, votes de la foule)",
        "url": "https://arxiv.org/abs/2403.04132"
      },
      {
        "label": "TechCrunch, LMArena lands $1.7B valuation four months after launching its product, 6 janvier 2026 (150 millions de dollars, service AI Evaluations ouvert aux labos en septembre 2025, 30 millions de dollars annualisés en décembre 2025, projet de Berkeley financé par subventions et dons en 2023)",
        "url": "https://techcrunch.com/2026/01/06/lmarena-lands-1-7b-valuation-four-months-after-launching-its-product/"
      },
      {
        "label": "Arena, LMArena is now Arena, 28 janvier 2026 (changement de nom, image et vidéo)",
        "url": "https://arena.ai/blog/lmarena-is-now-arena/"
      },
      {
        "label": "Wikipédia, Arena.ai (entreprise indépendante depuis avril 2025)",
        "url": "https://en.wikipedia.org/wiki/Arena.ai"
      },
      {
        "label": "Singh et al., The Leaderboard Illusion, 29 avril 2025 (Google 19,2 % et OpenAI 20,4 % des données, 83 modèles open weights 29,7 %)",
        "url": "https://arxiv.org/abs/2504.20879"
      }
    ]
  },
  {
    "id": "mmlu",
    "status": "live",
    "num": "49",
    "title": "MMLU",
    "en": "MMLU",
    "aliases": [
      "Massive Multitask Language Understanding",
      "MMLU-Pro",
      "MMLU-Redux"
    ],
    "aliasesFr": [],
    "jargon": [
      {
        "say": "5-shot",
        "means": "le modèle voit cinq questions résolues avant celle qu'on lui pose, la façon classique de faire passer MMLU"
      },
      {
        "say": "MMLU-Pro",
        "means": "une version plus difficile, qui sature à son tour ; en janvier 2026, la fiche de Kimi K2.5 y donnait 90,1 % à Gemini 3 Pro"
      },
      {
        "say": "MMLU-Redux",
        "means": "5 700 questions de MMLU relues à la main en 2024 pour corriger les réponses fausses"
      }
    ],
    "cat": "ecosysteme",
    "links": [
      "benchmarks-lesquels-croire",
      "humanitys-last-exam",
      "gpqa",
      "quantization",
      "mythe-plus-gros-plus-intelligent"
    ],
    "short": "MMLU est un QCM de 15 908 questions dans 57 matières, des mathématiques au droit en passant par la médecine, publié en 2020 pour mesurer l'étendue des connaissances d'un modèle de langage.",
    "image": "C'était l'examen d'entrée au conservatoire, un QCM de culture musicale que chaque groupe passait avant d'être pris au sérieux. Aujourd'hui, tous les groupes de premier plan y frôlent la note maximale, et le corrigé lui-même contient des erreurs.",
    "imagineForm": "D",
    "imagine": "En entretien, un candidat data scientist te demande : « Un modèle qui fait 100 % au MMLU, il est parfait ? » Tu lui réponds : « Il a coché la réponse attendue à un millier de questions dont l'énoncé ou le corrigé est erroné. »",
    "full": [
      "Publié en septembre 2020 par Dan Hendrycks et son équipe, MMLU pose 15 908 questions à quatre choix dans 57 matières. À sa sortie, GPT-3 obtenait 43,9 % et les auteurs estimaient le niveau d'experts humains à environ 89,8 %. MMLU couvre l'étendue des connaissances scolaires et universitaires, mais pas le raisonnement long, l'usage d'outils ou la capacité à dire qu'on ne sait pas.",
      "En juin 2024, une équipe de chercheurs a relu à la main 5 700 questions et estimé que 6,5 % de MMLU contient une erreur ; dans la partie virologie, 57 % des questions examinées en avaient une. Le plafond réel est donc nettement sous 100 %, autour de 93,5 % si l'estimation est juste, et un score au-delà veut dire que le modèle suit le corrigé jusque dans ses erreurs.",
      "Ses questions circulent en ligne depuis 2020, et le risque qu'elles se retrouvent dans les données d'entraînement est connu depuis longtemps. Les labos l'ont laissé de côté, et les fiches de quatre modèles à poids ouverts publiés entre mars et août 2026 par Mistral AI, MiniMax, Moonshot AI et Z.ai ne le mentionnent plus du tout."
    ],
    "reliability": {
      "level": "fragile",
      "why": "Le test est saturé depuis 2024, environ 6,5 % de ses questions ont un énoncé ou un corrigé erroné, et ses questions, publiques depuis 2020, ont eu tout le temps de passer dans les données d'entraînement. Il ne sert plus qu'à vérifier qu'un petit modèle ou un modèle compressé n'a pas perdu ses connaissances."
    },
    "then": "Mi-2024, Anthropic, OpenAI et Meta affichaient encore un score MMLU autour de 88 % dans les annonces de Claude 3.5 Sonnet, de GPT-4o et de Llama 3.1. En 2026, les fiches des modèles de pointe citent GPQA, HLE ou Terminal-Bench, et MMLU n'y figure plus.",
    "office": [
      {
        "who": "q",
        "text": "Le petit modèle qu'on veut embarquer fait 70 % au MMLU. Ça veut dire quoi ?"
      },
      {
        "who": "a",
        "text": "Que c'est un repère pour le comparer à d'autres petits modèles, ou à sa version non compressée, et presque rien de plus sur ce qu'il fera de tes demandes."
      }
    ],
    "avoid": "« Avec Language Understanding dans son nom, MMLU teste la compréhension du langage. » Il teste des connaissances en QCM, matière par matière, et ne vérifie ni la rédaction, ni le suivi d'une consigne, ni le raisonnement en plusieurs étapes.",
    "video": null,
    "sources": [
      {
        "label": "Hendrycks et al., Measuring Massive Multitask Language Understanding, septembre 2020 (57 matières)",
        "url": "https://arxiv.org/abs/2009.03300"
      },
      {
        "label": "Wikipédia, MMLU (15 908 questions ; GPT-3 à 43,9 % ; experts estimés à 89,8 % ; environ 88 % pour Claude 3.5 Sonnet, GPT-4o et Llama 3.1 mi-2024 ; contamination ; « partially phased out » depuis 2025)",
        "url": "https://en.wikipedia.org/wiki/MMLU"
      },
      {
        "label": "Gema et al., Are We Done with MMLU?, juin 2024 (5 700 questions relues, 6,49 % d'erreurs estimées, 57 % en virologie, dont 33 % de corrigés faux, 14 % de questions floues et 4 % à plusieurs bonnes réponses). Calcul de l'Imagine : 15 908 x 0,0649 = 1 032 questions",
        "url": "https://arxiv.org/abs/2406.04127"
      },
      {
        "label": "Moonshot AI, fiche de Kimi K2.5 sur Hugging Face, janvier 2026 (MMLU-Pro : Gemini 3 Pro à 90,1 %)",
        "url": "https://huggingface.co/moonshotai/Kimi-K2.5"
      },
      {
        "label": "Mistral AI, fiche de Mistral Medium 3.5 sur Hugging Face, 31 mars 2026, consultée le 2 octobre 2026 (aucune mention de MMLU)",
        "url": "https://huggingface.co/mistralai/Mistral-Medium-3.5-128B"
      },
      {
        "label": "MiniMax, fiche de MiniMax-M3 sur Hugging Face, 2 juin 2026, consultée le 2 octobre 2026 (aucune mention de MMLU)",
        "url": "https://huggingface.co/MiniMaxAI/MiniMax-M3"
      },
      {
        "label": "Moonshot AI, fiche de Kimi K3 sur Hugging Face, 13 juin 2026, consultée le 2 octobre 2026 (aucune mention de MMLU)",
        "url": "https://huggingface.co/moonshotai/Kimi-K3"
      },
      {
        "label": "Z.ai, fiche de GLM-5.3 sur Hugging Face, 25 août 2026, consultée le 2 octobre 2026 (aucune mention de MMLU)",
        "url": "https://huggingface.co/zai-org/GLM-5.3"
      },
      {
        "label": "DeepSeek, fiche de DeepSeek-V4.1-Flash sur Hugging Face, septembre 2026 (GPQA Diamond, HLE et Terminal-Bench pour le modèle instruct, MMLU-Pro seulement pour le modèle de base)",
        "url": "https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash"
      }
    ]
  },
  {
    "id": "modeles-frontiere",
    "status": "live",
    "num": "50",
    "title": "Modèles frontière",
    "en": "Frontier models",
    "aliases": [
      "frontier model",
      "frontier AI",
      "frontier lab",
      "state of the art",
      "SOTA"
    ],
    "aliasesFr": [
      "modèle de pointe",
      "IA de frontière"
    ],
    "jargon": [
      {
        "say": "frontier lab",
        "means": "un labo qui entraîne des modèles à la frontière ; le mot sert autant à se présenter qu'à décrire, et chaque labo l'emploie pour son modèle de tête"
      },
      {
        "say": "10^25 FLOP",
        "means": "le seuil de l'AI Act européen : un modèle généraliste dont l'entraînement a demandé plus de 10^25 opérations de calcul (un 1 suivi de 25 zéros) est présumé à risque systémique"
      },
      {
        "say": "GPAI",
        "means": "general-purpose AI model, le nom que l'AI Act donne aux modèles généralistes ; au-dessus du seuil de calcul, ils passent dans la catégorie « à risque systémique »"
      },
      {
        "say": "SOTA",
        "means": "state of the art, le meilleur score publié à une date donnée sur un benchmark précis"
      }
    ],
    "cat": "ecosysteme",
    "links": [
      "comparatif-des-modeles",
      "compute",
      "tailles-de-modele",
      "benchmarks",
      "open-weights"
    ],
    "short": "Un modèle frontière est l'un des modèles les plus capables du moment ; la Californie le définit dans la loi par le calcul dépensé pour l'entraîner.",
    "image": "Parmi les maisons de disques, quelques-unes seulement peuvent louer le plus grand studio de la ville pendant des mois, et leurs albums fixent le niveau que les autres essaient d'atteindre. Le régulateur, qui ne peut pas écouter un album avant sa sortie, a choisi de compter les heures de studio, en sachant qu'elles ne disent pas qui joue le mieux.",
    "imagineForm": "E",
    "imagine": "En mars 2023, GPT-4 sort, et c'est le modèle frontière par excellence. En septembre 2026, le même GPT-4, sans un paramètre changé, est sorti de la frontière, dépassé par toute une génération de modèles dont GPT-6 Astra, qu'Epoch AI estime entraîné avec environ cinquante fois plus de calcul.",
    "full": [
      "La définition la plus utile vient du Frontier Model Forum, une association qui réunit Amazon, Anthropic, Google, Meta, Microsoft et OpenAI. Pour elle, un modèle frontière est un modèle généraliste qui dépasse tous les modèles largement déployés depuis au moins un an. La comparaison se fait sur des benchmarks ou sur des évaluations de capacités à risque. La frontière est donc une date autant qu'un niveau, et elle avance à chaque sortie. En octobre 2026, chaque labo place son modèle de tête de ce côté. OpenAI présente GPT-6 Astra comme son modèle le plus capable, et SpaceXAI (ex-xAI) appelle Grok 4.7 son « frontier model ». Mistral AI, de son côté, qualifie Mistral Medium 3.5 de « frontier-class ».",
      "Le mot compte aussi parce que la régulation s'appuie sur la même idée. L'AI Act européen ne parle pas de frontière mais de « modèle à risque systémique ». Il présume ce risque dès que l'entraînement d'un modèle généraliste dépasse 10^25 opérations. GPT-4 lui-même tombe sur la ligne, puisque l'estimation d'Epoch AI pour son entraînement encadre le seuil. Les fournisseurs de ces modèles doivent alors les soumettre à des tests adverses, mesurer les risques, signaler les incidents graves et les protéger contre les attaques. Ces obligations s'appliquent déjà, et la Commission peut infliger des amendes depuis août 2026. En Californie, la loi SB 53 appelle « frontier model » tout modèle entraîné avec plus de 10^26 opérations, fine-tuning et apprentissage par renforcement compris. Elle vise surtout les gros développeurs, ceux qui dépassent 500 millions de dollars de chiffre d'affaires annuel.",
      "Le seuil de calcul a l'avantage d'être un chiffre, et l'inconvénient que le public ne peut presque jamais le vérifier. Dans la base d'Epoch AI, moins de la moitié des modèles recensés ont une estimation de calcul d'entraînement. Elle manque justement pour Claude Fable 5.1, Gemini 3.1 Pro ou Muse Spark 1.3, dont les labos ne publient rien. Pour ces modèles, c'est au fournisseur de faire le calcul et de se déclarer auprès du Bureau de l'IA de la Commission."
    ],
    "then": "En septembre 2024, le gouverneur de Californie refusait de signer SB 1047, une première loi sur les modèles frontière. Le mot restait alors surtout celui des labos et des chercheurs. Deux ans plus tard, il figure dans une loi californienne, SB 53, et le seuil européen est assorti d'amendes.",
    "office": [
      {
        "who": "q",
        "text": "10^25 opérations, ça représente quoi, concrètement ?"
      },
      {
        "who": "a",
        "text": "Une seule carte H200 qui calculerait sans s'arrêter à sa puissance de pointe mettrait environ trois siècles à les faire. Les labos y arrivent en quelques mois avec des dizaines de milliers de puces."
      }
    ],
    "avoid": "« L'AI Act interdit les modèles frontière. » Le texte ne les interdit pas, mais il présume un risque systémique dès que l'entraînement dépasse 10^25 opérations. Il impose alors des évaluations, des tests adverses, le signalement des incidents graves et de la cybersécurité.",
    "video": null,
    "sources": [
      {
        "label": "Frontier Model Forum, About us (créé en 2023 ; définition d'un modèle frontière : dépasse tous les modèles largement déployés depuis au moins 12 mois), consulté le 2 octobre 2026",
        "url": "https://www.frontiermodelforum.org/about-us/"
      },
      {
        "label": "Frontier Model Forum, Membership (Amazon, Anthropic, Google, Meta, Microsoft, OpenAI), consulté le 2 octobre 2026",
        "url": "https://www.frontiermodelforum.org/membership/"
      },
      {
        "label": "OpenAI, fiche de GPT-6 Astra (« Our most capable model »), consultée le 2 octobre 2026",
        "url": "https://developers.openai.com/api/docs/models/gpt-6-astra"
      },
      {
        "label": "SpaceXAI, fiche de Grok 4.7 (« frontier model for coding, agentic tasks, and knowledge work »), consultée le 2 octobre 2026",
        "url": "https://docs.x.ai/developers/models/grok-4.7"
      },
      {
        "label": "Wikipédia, SpaceXAI (nom actuel de X.AI Corp., 2023-2026)",
        "url": "https://en.wikipedia.org/wiki/SpaceXAI"
      },
      {
        "label": "Mistral AI, fiche de Mistral Medium 3.5 (« frontier-class multimodal model »), consultée le 2 octobre 2026",
        "url": "https://docs.mistral.ai/models/mistral-medium-3-5-26-04"
      },
      {
        "label": "AI Act, article 51, paragraphe 2 (présomption au-delà de 10^25 opérations de calcul d'entraînement)",
        "url": "https://artificialintelligenceact.eu/article/51/"
      },
      {
        "label": "AI Act, article 55 (obligations des fournisseurs de modèles à risque systémique : évaluation et tests adverses, risques, incidents graves, cybersécurité)",
        "url": "https://artificialintelligenceact.eu/article/55/"
      },
      {
        "label": "Commission européenne, lignes directrices pour les fournisseurs de modèles d'IA à usage général (obligations depuis le 2 août 2025, pouvoirs d'exécution et amendes depuis le 2 août 2026, notification au Bureau de l'IA)",
        "url": "https://digital-strategy.ec.europa.eu/en/policies/guidelines-gpai-providers"
      },
      {
        "label": "California Legislative Information, SB 53, chapitre 138 (approuvée par le gouverneur le 29 septembre 2025 ; « frontier model » au-delà de 10^26 opérations, fine-tuning et RL compris ; « large frontier developer » au-delà de 500 millions de dollars de chiffre d'affaires)",
        "url": "https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202520260SB53"
      },
      {
        "label": "Wikipédia, Transparency in Frontier Artificial Intelligence Act (SB 1047, la loi précédente, rejetée par le gouverneur Gavin Newsom en 2024)",
        "url": "https://en.wikipedia.org/wiki/Transparency_in_Frontier_Artificial_Intelligence_Act"
      },
      {
        "label": "Epoch AI, base AI models, fichier all_ai_models.csv mis à jour le 1er octobre 2026 : GPT-4 (mars 2023) 2,1 x 10^25 FLOP (« Likely », intervalle à 90 % de 8,2 x 10^24 à 4,4 x 10^25) ; GPT-6 Astra (septembre 2026) environ 10^27 FLOP (« Likely », intervalle 5 x 10^26 à 2 x 10^27, au moins 100 000 GB200) ; 1 410 modèles sur 3 626 avec une estimation ; aucune pour Claude Fable 5.1, Gemini 3.1 Pro, Muse Spark 1.3. Calcul de l'Imagine : 10^27 / 2,1 x 10^25 = 48, environ cinquante fois",
        "url": "https://epoch.ai/data/all_ai_models.csv"
      },
      {
        "label": "NVIDIA, H200 (1 979 TFLOPS en BF16, chiffre donné avec sparsité, soit environ 990 TFLOPS en calcul dense, la sparsité doublant le débit théorique). Calcul du bureau : 10^25 / 9,9 x 10^14 = 1,0 x 10^10 secondes, environ 320 ans",
        "url": "https://www.nvidia.com/en-us/data-center/h200/"
      }
    ]
  },
  {
    "id": "comparatif-des-modeles",
    "status": "live",
    "num": "51",
    "title": "Comparatif des modèles",
    "en": "LLM pricing comparison",
    "aliases": [
      "model comparison",
      "price per million tokens",
      "$/MTok"
    ],
    "aliasesFr": [
      "prix des modèles",
      "tarifs des API",
      "comparatif des prix"
    ],
    "jargon": [
      {
        "say": "$/MTok",
        "means": "dollars par million de tokens, l'unité de tous les tarifs ; Anthropic écrit MTok, OpenAI et Google « per 1M tokens »"
      },
      {
        "say": "cached input",
        "means": "les tokens d'entrée relus depuis un cache parce qu'ils ont déjà été envoyés récemment ; ils coûtent de 2,5 % du prix normal chez Claude Fable 5.1 à 25 % chez Grok 4.7"
      },
      {
        "say": "Batch API",
        "means": "envoyer des requêtes par lots, traitées en différé, contre 50 % de remise chez Anthropic, OpenAI et Google ; Grok 4.7 ne l'accepte pas"
      },
      {
        "say": "long context pricing",
        "means": "au-delà d'un seuil (200 000 tokens chez Google et SpaceXAI, 272 000 chez OpenAI), toute la requête passe au tarif supérieur ; Anthropic et Meta n'appliquent pas de surcoût"
      }
    ],
    "cat": "ecosysteme",
    "links": [
      "cout-d-une-requete",
      "modeles-frontiere",
      "open-weights",
      "tokenizer",
      "tailles-de-modele",
      "benchmarks"
    ],
    "short": "Le comparatif des modèles met côte à côte les modèles des principaux labos et leurs prix au million de tokens, plus élevés pour ce qu'ils écrivent que pour ce que tu envoies.",
    "image": "Chaque maison de disques affiche son tarif horaire à l'entrée de son studio, mais aucune n'utilise la même horloge, et chez l'une la minute dure un peu plus longtemps que chez la voisine. Les tokens se comportent de la même façon, parce que chaque labo découpe le texte avec sa propre sampleuse.",
    "imagineForm": "A",
    "imagine": "Demande à chaque modèle du tableau de te réécrire Notre-Dame de Paris en entier, soit 295 934 tokens au compteur du tokenizer d'OpenAI. La sortie te coûterait un peu plus d'un dollar chez DeepSeek-V4-Pro ou Muse Spark 1.3, et près de 15 $ chez Claude Fable 5.1 ou GPT-6 Astra, avant même de savoir en combien de morceaux chacun découpe le roman.",
    "table": {
      "caption": "Prix des modèles de tête",
      "asOf": "2 octobre 2026",
      "columns": [
        "Modèle",
        "Labo",
        "Entrée $ / 1M tokens",
        "Sortie $ / 1M tokens",
        "Fenêtre de contexte",
        "Poids ouverts"
      ],
      "rows": [
        [
          "Claude Fable 5.1",
          "Anthropic",
          "10",
          "50",
          "1M",
          "non"
        ],
        [
          "Claude Opus 5.5",
          "Anthropic",
          "4",
          "20",
          "1M",
          "non"
        ],
        [
          "GPT-6 Astra",
          "OpenAI",
          "10",
          "50",
          "1,05M",
          "non"
        ],
        [
          "GPT-6.1 Sol",
          "OpenAI",
          "2",
          "10",
          "1,05M",
          "non"
        ],
        [
          "Gemini 3.1 Pro (preview)",
          "Google",
          "2",
          "12",
          "1M",
          "non"
        ],
        [
          "Grok 4.7",
          "SpaceXAI",
          "2",
          "6",
          "500k",
          "non"
        ],
        [
          "Muse Spark 1.3",
          "Meta",
          "1,25",
          "4,25",
          "1M",
          "non"
        ],
        [
          "Qwen3.8-Max",
          "Alibaba",
          "2",
          "6",
          "1M",
          "oui, licence maison"
        ],
        [
          "DeepSeek-V4-Pro",
          "DeepSeek",
          "1,32",
          "3,96",
          "1M",
          "oui, MIT"
        ],
        [
          "Mistral Medium 3.5",
          "Mistral AI",
          "1,5",
          "7,5",
          "256k",
          "oui, MIT modifiée"
        ]
      ],
      "note": "Tarif standard, sans cache ni batch, pour une requête sous le seuil de contexte long ; DeepSeek aux heures de pointe (moitié prix le reste du temps), Alibaba au tarif international."
    },
    "full": [
      "Le tableau compare des prix au million de tokens, mais un token n'a pas la même taille partout, puisque chaque labo a son tokenizer. Anthropic prévient ainsi que le tokenizer introduit avec Claude Opus 4.7 produit environ 30 % de tokens de plus pour le même texte. Pour comparer deux modèles sur ta tâche, compte donc la facture de quelques vraies requêtes plutôt que le tarif affiché.",
      "Sur toutes les lignes, la sortie coûte de trois à six fois plus que l'entrée. Le texte que tu envoies est lu d'un seul passage, tous les tokens en parallèle, ce qui occupe pleinement les puces. La réponse s'écrit au contraire token par token, et chaque token demande de relire en mémoire tous les poids actifs du modèle pour un seul résultat. L'étude Splitwise décrit cette phase de génération comme limitée par la mémoire et laissant la puissance de calcul en grande partie inutilisée. Les labos ne publient pas leurs coûts, et rien ne dit que le rapport entre les deux prix suive exactement celui de leurs dépenses.",
      "La facture réelle s'écarte du tableau dans les deux sens. Le cache de prompt fait payer les passages déjà envoyés entre 2,5 % et 25 % du prix d'entrée, et le batch divise tout par deux chez Anthropic, OpenAI et Google. Au-delà de 272 000 tokens, OpenAI double le prix d'entrée de GPT-6 Astra pour toute la requête. Les modèles de raisonnement ajoutent des tokens de réflexion que tu ne vois pas, payés au tarif de sortie, et Google l'écrit en toutes lettres sur sa grille. Le calendrier compte aussi, puisque DeepSeek divise ses prix par deux hors des heures de pointe et que Gemini 3.8 Flash doublera les siens le 1er janvier 2027."
    ],
    "then": "En avril 2024, GPT-4 Turbo, alors le modèle de tête d'OpenAI, coûtait 10 $ le million de tokens d'entrée et 30 $ en sortie, des prix toujours affichés sur la page de tarifs. En 2026, GPT-6.1 Sol, qu'OpenAI présente comme proche de GPT-6 Astra, coûte 2 $ et 10 $, cinq fois moins en entrée et trois fois moins en sortie.",
    "office": [
      {
        "who": "q",
        "text": "On a pris le modèle le moins cher au million de tokens, et la facture dépasse celle de l'ancien. Comment c'est possible ?"
      },
      {
        "who": "a",
        "text": "Compare les tokens consommés par requête plutôt que les tarifs, parce que son tokenizer découpe peut-être ton texte en plus de morceaux, et que s'il réfléchit plus longtemps, son brouillon compte comme de la sortie."
      }
    ],
    "avoid": "« Les modèles à poids ouverts sont gratuits. » Les poids se téléchargent sans payer, mais il faut des GPU pour les faire tourner, et par l'API de leur labo, DeepSeek-V4-Pro ou Qwen3.8-Max se paient au token comme les autres.",
    "video": null,
    "sources": [
      {
        "label": "Anthropic, Pricing (Claude Fable 5.1 : 10 $ et 50 $ ; Claude Opus 5.5 : 4 $ et 20 $ ; Claude Opus 4 : 15 $ et 75 $ ; lecture du cache à 2,5 %, 5 % ou 10 % du prix d'entrée ; batch à 50 % ; pas de surcoût de contexte long ; tokenizer de Claude Opus 4.7 et suivants : environ 30 % de tokens en plus), consulté le 2 octobre 2026",
        "url": "https://platform.claude.com/docs/en/about-claude/pricing"
      },
      {
        "label": "Anthropic, Models overview (fenêtre de 1M tokens pour Claude Fable 5.1 et Claude Opus 5.5), consulté le 2 octobre 2026",
        "url": "https://platform.claude.com/docs/en/about-claude/models/overview"
      },
      {
        "label": "OpenAI, Pricing (GPT-6 Astra : 10 $ et 50 $ ; GPT-6.1 Sol : 2 $ et 10 $ ; gpt-4-turbo-2024-04-09 : 10 $ et 30 $ ; batch à 50 %), consulté le 2 octobre 2026",
        "url": "https://developers.openai.com/api/docs/pricing"
      },
      {
        "label": "OpenAI, fiche de GPT-6 Astra (fenêtre de 1 050 000 tokens ; au-delà de 272 000 tokens d'entrée, entrée et cache x2, sortie x1,5 pour toute la requête)",
        "url": "https://developers.openai.com/api/docs/models/gpt-6-astra"
      },
      {
        "label": "OpenAI, fiche de GPT-6.1 Sol (« near-Astra performance » ; fenêtre de 1 050 000 tokens, lecture du cache à 5 % du prix d'entrée)",
        "url": "https://developers.openai.com/api/docs/models/gpt-6.1-sol"
      },
      {
        "label": "Google, Gemini API Pricing (Gemini 3.1 Pro Preview : 2 $ et 12 $ jusqu'à 200 000 tokens, prix de sortie « including thinking tokens » ; Gemini 3.8 Flash : 0,75 $ et 3,75 $ jusqu'au 31 décembre 2026, puis 1,50 $ et 7,50 $ ; batch à 50 %), consulté le 2 octobre 2026",
        "url": "https://ai.google.dev/gemini-api/docs/pricing"
      },
      {
        "label": "Google, fiche de Gemini 3.1 Pro Preview (1 048 576 tokens en entrée)",
        "url": "https://ai.google.dev/gemini-api/docs/models/gemini-3.1-pro-preview"
      },
      {
        "label": "SpaceXAI, fiche de Grok 4.7 (2 $ et 6 $ sous 200 000 tokens, cache à 0,50 $, fenêtre de 500 000 tokens, pas de Batch API), consultée le 2 octobre 2026",
        "url": "https://docs.x.ai/developers/models/grok-4.7"
      },
      {
        "label": "Meta, Pricing and rate limits (Muse Spark 1.3 : 1,25 $ et 4,25 $, cache à 0,15 $, pas de surcoût de contexte long ; tier Contributor à 0,10 $ et 0,20 $ contre l'usage des données pour l'entraînement), consulté le 2 octobre 2026",
        "url": "https://dev.meta.ai/docs/pricing-rate-limits"
      },
      {
        "label": "Meta, Models (Muse Spark hébergé sur l'API, fenêtre de 1 048 576 tokens ; Muse Glimmer est le modèle à poids ouverts)",
        "url": "https://dev.meta.ai/docs/models"
      },
      {
        "label": "Alibaba Cloud Model Studio, Model pricing, région internationale (Singapour) : qwen3.8-max à 2 $ et 6 $ jusqu'à 1M tokens par requête, consulté le 2 octobre 2026",
        "url": "https://www.alibabacloud.com/help/en/model-studio/model-pricing"
      },
      {
        "label": "Qwen, fiche de Qwen3.8-2.4T-A95B sur Hugging Face (poids publiés sous licence « qwen3.8-max » ; Qwen3.8-Max en est la version officielle avec des fonctions en plus)",
        "url": "https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B"
      },
      {
        "label": "DeepSeek, Models & Pricing (deepseek-v4-pro : 1,32 $ et 3,96 $ aux heures de pointe, moitié prix hors pointe ; fenêtre de 1M tokens), consulté le 2 octobre 2026",
        "url": "https://api-docs.deepseek.com/quick_start/pricing"
      },
      {
        "label": "DeepSeek, fiche de DeepSeek-V4-Pro (poids sous licence MIT)",
        "url": "https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro"
      },
      {
        "label": "Mistral AI, fiche de Mistral Medium 3.5 (1,5 $ et 7,5 $, fenêtre de 256k, poids ouverts sous licence MIT modifiée), consultée le 2 octobre 2026",
        "url": "https://docs.mistral.ai/models/mistral-medium-3-5-26-04"
      },
      {
        "label": "Patel et al., Splitwise: Efficient generative LLM inference using phase splitting, novembre 2023 (lecture du prompt limitée par le calcul, génération limitée par la mémoire)",
        "url": "https://arxiv.org/abs/2311.18677"
      },
      {
        "label": "OpenAI, Reasoning models (tokens de raisonnement invisibles, facturés comme des tokens de sortie)",
        "url": "https://developers.openai.com/api/docs/guides/reasoning"
      },
      {
        "label": "Victor Hugo, Notre-Dame de Paris, Projet Gutenberg (ebook 19657) : 295 934 tokens en o200k_base, comptés avec tiktoken le 2 octobre 2026 sur le texte entre les marqueurs START et END. Calcul de l'Imagine : 0,295934 x 3,96 = 1,17 $ ; x 4,25 = 1,26 $ ; x 50 = 14,80 $",
        "url": "https://www.gutenberg.org/ebooks/19657"
      },
      {
        "label": "Wikipédia, Claude (AI) (Claude Opus 4 sorti le 22 mai 2025, Claude Opus 5.5 le 22 septembre 2026)",
        "url": "https://en.wikipedia.org/wiki/Claude_(AI)"
      }
    ]
  },
  {
    "id": "cout-d-une-requete",
    "status": "live",
    "num": "52",
    "title": "Coût d'une requête",
    "en": "Inference cost",
    "aliases": [
      "API pricing",
      "cost per token",
      "cost per request",
      "prompt caching"
    ],
    "aliasesFr": [
      "prix d'une requête",
      "facture API"
    ],
    "jargon": [
      {
        "say": "prompt caching",
        "means": "garder côté serveur le début d'une requête qui revient à l'identique (consignes, documents) ; relu depuis le cache, il est facturé une fraction du prix d'entrée, 5 % sur Claude Opus 5.5"
      },
      {
        "say": "cache write",
        "means": "la première écriture d'un passage dans le cache, facturée 1,25 fois le prix d'entrée chez Anthropic et OpenAI ; la remise ne vient qu'aux lectures suivantes"
      },
      {
        "say": "reasoning tokens",
        "means": "les tokens du brouillon d'un modèle de raisonnement ; tu ne les vois pas forcément, et on les paie au tarif de sortie"
      },
      {
        "say": "usage",
        "means": "le bloc que renvoie chaque réponse d'API avec le décompte exact des tokens d'entrée, de sortie et de cache ; c'est lui qu'on additionne pour connaître la facture"
      }
    ],
    "cat": "inference",
    "links": [
      "token",
      "comparatif-des-modeles",
      "fenetre-de-contexte",
      "modeles-de-raisonnement",
      "gpu",
      "kv-cache"
    ],
    "short": "Le coût d'une requête, c'est le nombre de tokens d'entrée multiplié par leur prix, plus le nombre de tokens de sortie multiplié par le leur, avec une remise pour ce qui est relu depuis un cache.",
    "image": "Le studio facture à la ligne, et chaque sample qui passe par la sampleuse se paie au tarif de l'entrée, chaque note que chante le chanteur au tarif de la sortie, nettement plus cher. Les pistes déjà enregistrées, qu'on repasse telles quelles sur la bande, ne coûtent presque rien.",
    "imagineForm": "E",
    "imagine": "Ton assistant interne envoie à Claude Opus 5.5, avec chaque question, les mêmes 30 000 tokens de procédures, et chaque réponse te coûte environ 14 centimes. Active le cache de prompt sur ces procédures, et la même réponse tombe à 2 centimes, pour exactement le même travail.",
    "full": [
      "Le calcul tient en trois lignes. Une question envoyée à GPT-6.1 Sol avec un document de 12 000 tokens coûte 2,4 centimes en entrée, au tarif de 2 $ le million. Sa réponse visible de 600 tokens ajoute 0,6 centime au tarif de sortie, 10 $ le million, soit trois centimes en tout. Sol réfléchit pourtant toujours avant de répondre, puisqu'OpenAI ne permet pas de régler son effort de raisonnement sous le niveau « low ». Avec un brouillon de 5 000 tokens, la sortie passe à 5 600 tokens et le total à 0,08 $, presque le triple de ce que la réponse visible laissait croire.",
      "Ces tokens de réflexion sont la grande inconnue de la facture. OpenAI indique que ses modèles en produisent de quelques centaines à plusieurs dizaines de milliers selon la difficulté, et qu'une requête peut même s'arrêter faute de place avant toute réponse visible, après avoir facturé l'entrée et la réflexion. Les outils pèsent aussi, puisque chez Anthropic déclarer le kit de navigation web ajoute environ 6 600 tokens d'entrée à chaque appel, et chaque recherche web coûte 10 $ les 1 000.",
      "Trois leviers font baisser la facture. Avec le cache, les passages répétés ne coûtent qu'une fraction du prix, le batch divise par deux le prix des requêtes qui peuvent attendre, et un modèle plus petit traite les tâches simples. Anthropic estime ainsi à environ 37 $ le traitement de 10 000 tickets de support avec Claude Haiku 4.5. Dans l'autre sens, une requête très longue peut basculer d'un coup sur un tarif plus cher, comme chez OpenAI au-delà de 272 000 tokens d'entrée."
    ],
    "office": [
      {
        "who": "q",
        "text": "On paie quoi, exactement, quand l'agent lit une page web ?"
      },
      {
        "who": "a",
        "text": "Tu paies le texte de la page, qui entre comme tokens d'entrée, et Anthropic compte environ 2 500 tokens pour une page web moyenne, 125 000 pour un article de recherche en PDF ; la recherche elle-même se paie en plus."
      }
    ],
    "avoid": "« Ça coûte des fractions de centime, inutile de compter. » La réponse de l'assistant à 14 centimes coûte 1 368 $ quand elle revient 10 000 fois, et c'est à cette échelle que le cache, le batch et le choix du modèle se décident.",
    "video": null,
    "sources": [
      {
        "label": "Anthropic, Pricing (Claude Opus 5.5 : 4 $ en entrée, 20 $ en sortie, lecture du cache à 0,20 $ ; écriture du cache à 1,25 fois le prix d'entrée ; kit de navigation web d'environ 6 600 tokens ; recherche web à 10 $ les 1 000 ; page web moyenne d'environ 2 500 tokens, PDF de 500 Ko d'environ 125 000 ; exemple de 10 000 tickets pour environ 37 $ avec Claude Haiku 4.5), consulté le 2 octobre 2026. Calcul de l'Imagine : 30 200 x 4 / 10^6 + 800 x 20 / 10^6 = 0,1368 $ ; avec cache : 30 000 x 0,20 / 10^6 + 200 x 4 / 10^6 + 0,016 = 0,0228 $, hors écriture initiale du cache (0,15 $ à chaque renouvellement)",
        "url": "https://platform.claude.com/docs/en/about-claude/pricing"
      },
      {
        "label": "OpenAI, fiche de GPT-6.1 Sol (2 $ en entrée, 10 $ en sortie ; efforts de raisonnement « none » et « minimal » non disponibles ; au-delà de 272 000 tokens d'entrée, entrée x2 et sortie x1,5 pour toute la requête ; écriture du cache à 1,25 fois le prix d'entrée), consultée le 2 octobre 2026",
        "url": "https://developers.openai.com/api/docs/models/gpt-6.1-sol"
      },
      {
        "label": "OpenAI, Reasoning models (de quelques centaines à plusieurs dizaines de milliers de tokens de raisonnement, facturés comme de la sortie ; coût possible sans réponse visible)",
        "url": "https://developers.openai.com/api/docs/guides/reasoning"
      }
    ]
  },
  {
    "id": "compute",
    "status": "live",
    "num": "53",
    "title": "Compute",
    "en": "Compute",
    "aliases": [
      "FLOP",
      "FLOPs",
      "training compute",
      "inference compute",
      "MFU"
    ],
    "aliasesFr": [
      "puissance de calcul",
      "calcul"
    ],
    "jargon": [
      {
        "say": "FLOP",
        "means": "floating-point operation, une multiplication ou une addition sur des nombres à virgule ; le calcul d'un entraînement se compte en FLOP au total"
      },
      {
        "say": "FLOP/s",
        "means": "la vitesse d'une puce, en opérations par seconde ; à ne pas confondre avec FLOP tout court, qui compte un total"
      },
      {
        "say": "6ND",
        "means": "la règle de calcul approchée d'un entraînement : 6 opérations par paramètre et par token lu, avec N paramètres (les paramètres actifs pour un MoE) et D tokens"
      },
      {
        "say": "MFU",
        "means": "model FLOPs utilization, la part de la puissance de pointe vraiment utilisée pendant l'entraînement ; Epoch AI suppose 25 % pour estimer celui de GPT-6 Astra"
      }
    ],
    "cat": "ecosysteme",
    "links": [
      "gpu",
      "entrainement",
      "modeles-frontiere",
      "parametres",
      "cout-d-une-requete",
      "modeles-de-raisonnement"
    ],
    "short": "Le compute est la quantité de calcul que demande un modèle, en masse pour l'entraîner, puis à chaque token qu'il lit ou écrit pour te répondre.",
    "image": "Pour le studio, le compute se compte en heures de location et en kilowatts. Les mois passés à régler la console dans le grand studio, c'est l'entraînement, payé une fois ; chaque concert qui suit, c'est l'inférence, qui consomme un peu de courant à chaque note, mais tous les soirs et dans toutes les salles à la fois.",
    "imagineForm": "B",
    "imagine": "Prends ta calculatrice et refais l'estimation d'Epoch AI pour Olmo 3 32B, le modèle d'Ai2 dont les données d'entraînement sont publiques. Multiplie 6 par ses 32 milliards de paramètres, puis par les 5 500 milliards de tokens qu'il a lus. Tu obtiens environ 1,1 × 10^24 opérations. Il en faudrait encore près de dix fois plus pour atteindre le seuil de 10^25 que l'AI Act réserve aux modèles à risque systémique.",
    "full": [
      "Un entraînement fait passer chaque token des données dans le modèle, puis ajuste les paramètres. Cela revient à environ six opérations par paramètre et par token. Avec des dizaines de milliards de paramètres et des milliers de milliards de tokens, on arrive aux ordres de grandeur du domaine. Ils vont de 10^24 à 10^27 opérations, c'est-à-dire au moins un million de milliards de milliards. Les labos de tête ne publient plus ces chiffres, qui viennent donc d'estimations. Epoch AI place ainsi GPT-6 Astra en haut de cette fourchette, avec un entraînement sur au moins 100 000 puces de NVIDIA installées au Texas.",
      "L'inférence coûte beaucoup moins par token, mais elle se répète à chaque requête de chaque utilisateur. C'est elle que Google mesure quand il compte les tokens traités chaque mois sur ses services. Les modèles de raisonnement déplacent encore la dépense vers ce moment-là, puisque leur brouillon, écrit avant chaque réponse, peut à lui seul dépasser la réponse en longueur.",
      "Le compute se paie en puces et en électricité. Anthropic a ainsi annoncé un accord pour utiliser jusqu'à un million de puces TPU de Google. Il l'a aussi chiffré en énergie, avec bien plus d'un gigawatt de capacité en service en 2026."
    ],
    "then": "En 2024, Google traitait 9 700 milliards de tokens par mois sur ses services. En mai 2026, Sundar Pichai en annonce plus de trois cents fois plus, et chacun de ces tokens a été lu ou écrit pour répondre à quelqu'un.",
    "office": [
      {
        "who": "q",
        "text": "On nous propose d'entraîner notre propre modèle de zéro. C'est jouable ?"
      },
      {
        "who": "a",
        "text": "Fais le calcul 6ND avant d'en discuter. Olmo 3 32B, pourtant loin de la frontière, a occupé plus d'un millier de GPU selon Epoch AI, et c'est ce budget-là qu'il faut mettre en face du projet."
      }
    ],
    "avoid": "« Une fois entraîné, le modèle ne coûte plus rien en calcul. » Chaque token lu ou écrit mobilise tous les paramètres actifs du modèle. Cette dépense revient à chaque requête, multipliée par le nombre d'utilisateurs et, pour un modèle de raisonnement, par la longueur de son brouillon.",
    "video": null,
    "sources": [
      {
        "label": "Epoch AI, base AI models, fichier all_ai_models.csv mis à jour le 1er octobre 2026 : Olmo 3 32B à 1,1 x 10^24 FLOP (6 x 3,2 x 10^10 x 5,5 x 10^12, « Confident »), entraîné sur 1 024 H100 ; GPT-6 Astra à environ 10^27 FLOP (« Likely », au moins 100 000 GB200 de NVIDIA à Abilene, 90 jours à 25 % de MFU supposés) ; règle C = 6ND. Calcul de l'Imagine : 10^25 / 1,056 x 10^24 = 9,5",
        "url": "https://epoch.ai/data/all_ai_models.csv"
      },
      {
        "label": "Ai2, fiche d'Olmo 3 32B sur Hugging Face (5,50 trillions de tokens d'entraînement)",
        "url": "https://huggingface.co/allenai/Olmo-3-1125-32B"
      },
      {
        "label": "AI Act, article 51, paragraphe 2 (seuil de 10^25 opérations)",
        "url": "https://artificialintelligenceact.eu/article/51/"
      },
      {
        "label": "Google, Sundar Pichai à Google I/O 2026, 19 mai 2026 (9,7 trillions de tokens par mois il y a deux ans, environ 480 trillions à I/O 2025, plus de 3,2 quadrillions aujourd'hui)",
        "url": "https://blog.google/innovation-and-ai/sundar-pichai-io-2026/"
      },
      {
        "label": "OpenAI, Reasoning models (de quelques centaines à plusieurs dizaines de milliers de tokens de raisonnement selon le problème)",
        "url": "https://developers.openai.com/api/docs/guides/reasoning"
      },
      {
        "label": "Anthropic, Expanding our use of Google Cloud TPUs and Services, 23 octobre 2025 (jusqu'à un million de TPU, bien plus d'un gigawatt en 2026)",
        "url": "https://www.anthropic.com/news/expanding-our-use-of-google-cloud-tpus-and-services"
      }
    ]
  },
  {
    "id": "gpu",
    "status": "live",
    "num": "54",
    "title": "GPU",
    "en": "GPU",
    "aliases": [
      "graphics processing unit",
      "TPU",
      "AI accelerator",
      "HBM",
      "CUDA"
    ],
    "aliasesFr": [
      "carte graphique",
      "processeur graphique",
      "puce IA"
    ],
    "jargon": [
      {
        "say": "HBM",
        "means": "high bandwidth memory, la mémoire montée au plus près de la puce ; une H200 de NVIDIA en a 141 Go, lus à 4,8 To par seconde"
      },
      {
        "say": "TPU",
        "means": "tensor processing unit, la puce que Google conçoit pour l'IA et qu'il loue aussi à d'autres labos, dont Anthropic"
      },
      {
        "say": "CUDA",
        "means": "la couche logicielle de NVIDIA qui permet de programmer ses cartes graphiques pour autre chose que l'affichage ; AlexNet était déjà écrit avec, en 2012"
      },
      {
        "say": "avec sparsité",
        "means": "la mention qui accompagne souvent les TFLOPS annoncés : le chiffre suppose qu'au moins deux valeurs sur quatre sont des zéros, et la puissance sur un calcul ordinaire vaut la moitié"
      }
    ],
    "cat": "ecosysteme",
    "links": [
      "compute",
      "parametres",
      "quantization",
      "cout-d-une-requete",
      "open-weights",
      "modeles-frontiere"
    ],
    "short": "Un GPU est une puce née pour l'affichage graphique, qui fait des milliers de multiplications à la fois, exactement ce que demande le calcul d'un modèle d'IA.",
    "image": "Au studio, un processeur ordinaire serait un ingé son très rapide qui tourne les potards un à un, alors que le GPU est une équipe de milliers de techniciens qui tournent chacun le leur, tous en même temps. L'image oublie la place, car les potards doivent aussi tenir dans la mémoire de la carte, et c'est souvent elle qui décide du nombre de cartes.",
    "imagineForm": "D",
    "imagine": "« Une H200 suffira pour faire tourner GLM-5.3 chez nous ? », demande le directeur informatique à propos du modèle à poids ouverts de Z.ai. L'ingénieure répond : « Même stocké sur 8 bits par paramètre, il pèse 755 Go, et une H200 n'a que 141 Go de mémoire, alors il en faut six avant d'avoir posé la première question. »",
    "full": [
      "En 2012, Alex Krizhevsky entraîne AlexNet, le réseau qui allait lancer la vague actuelle de l'apprentissage profond, sur deux cartes graphiques de jeu GTX 580 installées dans sa chambre, chez ses parents. L'entraînement dure cinq à six jours, et le réseau est coupé en deux parce qu'il ne tient pas dans les 3 Go d'une seule carte. On y trouve déjà tout le reste de l'histoire, puisqu'un réseau de neurones se calcule en multipliant des tableaux de nombres, un GPU fait ces multiplications par milliers en parallèle, et la mémoire fixe la taille de ce qu'on peut faire tourner.",
      "Pour écrire une réponse, la mémoire compte souvent plus que la puissance affichée. Chaque token oblige à relire les poids actifs du modèle, et une H200 de NVIDIA est construite autour de ça, avec 141 Go de mémoire lus à 4,8 To par seconde. L'étude Splitwise montre que cette phase de génération laisse une bonne part du calcul inutilisée, ce qui aide à comprendre pourquoi la quantization, qui allège les poids, accélère aussi les réponses.",
      "NVIDIA n'est pas seul. Google conçoit ses propres puces, les TPU, et Ironwood, présenté en avril 2025 comme le premier pensé pour l'inférence, porte 192 Go de mémoire par puce et s'assemble en grappes allant jusqu'à 9 216 puces. La génération suivante, présentée en mai 2026, se dédouble même, avec un TPU 8t pour l'entraînement et un TPU 8i pour l'inférence. Anthropic répartit son calcul entre trois familles, les TPU de Google, les Trainium d'Amazon et les GPU de NVIDIA."
    ],
    "office": [
      {
        "who": "q",
        "text": "Pourquoi on ne ferait pas tourner le modèle sur nos serveurs classiques, sans GPU ?"
      },
      {
        "who": "a",
        "text": "Pour un petit modèle quantifié, ça se tente ; au-delà, chaque token oblige à relire tous les poids actifs en mémoire, et une H200 les relit à 4,8 To par seconde."
      }
    ],
    "avoid": "« Plus de TFLOPS, c'est un modèle qui répond plus vite. » Pendant qu'il écrit, le modèle attend surtout sa mémoire, et sa capacité comme sa bande passante comptent autant que la puissance affichée. Celle-ci est souvent donnée avec sparsité, donc deux fois plus haute que sur un calcul ordinaire.",
    "video": null,
    "sources": [
      {
        "label": "Wikipédia, AlexNet (deux GTX 580 de 3 Go dans la chambre de Krizhevsky, cinq à six jours d'entraînement, réseau coupé en deux faute de mémoire, code écrit avec CUDA)",
        "url": "https://en.wikipedia.org/wiki/AlexNet"
      },
      {
        "label": "NVIDIA, H200 (141 Go de mémoire HBM3e, 4,8 To/s ; TFLOPS donnés avec sparsité), consulté le 2 octobre 2026",
        "url": "https://www.nvidia.com/en-us/data-center/h200/"
      },
      {
        "label": "Z.ai, GLM-5.3 sur Hugging Face (753 milliards de paramètres, poids en FP8 pour environ 755 Go selon l'API Hugging Face, consultée le 2 octobre 2026). Calcul de l'Imagine : 755 / 141 = 5,4, donc 6 cartes",
        "url": "https://huggingface.co/zai-org/GLM-5.3"
      },
      {
        "label": "Patel et al., Splitwise: Efficient generative LLM inference using phase splitting, novembre 2023 (la génération de tokens sous-utilise la puissance de calcul)",
        "url": "https://arxiv.org/abs/2311.18677"
      },
      {
        "label": "NVIDIA Developer, Structured Sparsity in the NVIDIA Ampere Architecture (au moins deux zéros sur quatre valeurs ; débit théorique doublé par rapport au calcul dense)",
        "url": "https://developer.nvidia.com/blog/structured-sparsity-in-the-nvidia-ampere-architecture-and-applications-in-search-engines/"
      },
      {
        "label": "Google, Ironwood: The first Google TPU for the age of inference, 9 avril 2025 (192 Go de HBM par puce, 7,37 To/s, grappes de 9 216 puces)",
        "url": "https://blog.google/products/google-cloud/ironwood-tpu-age-of-inference/"
      },
      {
        "label": "Google, Sundar Pichai à Google I/O 2026, 19 mai 2026 (TPU 8t pour l'entraînement, TPU 8i pour l'inférence)",
        "url": "https://blog.google/innovation-and-ai/sundar-pichai-io-2026/"
      },
      {
        "label": "Anthropic, Expanding our use of Google Cloud TPUs and Services, 23 octobre 2025 (jusqu'à un million de TPU ; TPU, Trainium et GPU NVIDIA)",
        "url": "https://www.anthropic.com/news/expanding-our-use-of-google-cloud-tpus-and-services"
      }
    ]
  },
  {
    "id": "inference",
    "status": "live",
    "num": "55",
    "title": "Inférence",
    "en": "Inference",
    "aliases": [
      "model inference",
      "serving",
      "inference time"
    ],
    "aliasesFr": [
      "utilisation du modèle"
    ],
    "jargon": [
      {
        "say": "prefill, decode",
        "means": "les deux temps d'une réponse : le modèle lit d'abord tout ton message d'un bloc, en parallèle, puis produit sa réponse au fil des tokens"
      },
      {
        "say": "TTFT",
        "means": "time to first token, le délai avant que le premier mot de la réponse s'affiche ; c'est surtout la durée de la lecture du message"
      },
      {
        "say": "inference provider",
        "means": "une entreprise qui fait tourner des modèles sur ses propres machines et te facture chaque requête, souvent pour des modèles open weights qu'elle n'a pas entraînés"
      },
      {
        "say": "batching",
        "means": "le serveur traite les requêtes de nombreux utilisateurs en même temps sur le même GPU, ce qui fait baisser le coût de chacune"
      }
    ],
    "cat": "inference",
    "links": [
      "entrainement",
      "prediction-du-mot-suivant",
      "kv-cache",
      "quantization",
      "cout-d-une-requete",
      "token"
    ],
    "solutions": [
      {
        "name": "vLLM",
        "kind": "moteur d'inférence open source",
        "url": "https://github.com/vllm-project/vllm"
      },
      {
        "name": "SGLang",
        "kind": "moteur d'inférence open source",
        "url": "https://github.com/sgl-project/sglang"
      },
      {
        "name": "Hugging Face Inference Providers",
        "kind": "plateforme cloud",
        "url": "https://huggingface.co/docs/inference-providers/index"
      },
      {
        "name": "Together AI",
        "kind": "plateforme cloud",
        "url": "https://www.together.ai/"
      },
      {
        "name": "Groq",
        "kind": "plateforme cloud",
        "url": "https://groq.com/"
      }
    ],
    "short": "L'inférence est l'utilisation d'un modèle déjà entraîné : on lui donne un texte, il calcule sa réponse avec des paramètres figés, et rien de ce qu'il fait à ce moment ne modifie ce qu'il a appris.",
    "image": "L'inférence correspond au concert, une fois les répétitions finies et le rideau levé. La console reste réglée telle que l'ingé son l'a laissée, le groupe joue pour la salle de ce soir, et une fausse note ne change plus aucun potard ; on rejouera le même réglage demain, dans une autre ville.",
    "imagineForm": "A",
    "imagine": "En mai 2026, Google faisait passer chaque mois plus de 3,2 millions de milliards de tokens dans ses modèles, sur l'ensemble de ses produits, soit environ 1,2 milliard par seconde. Chaque seconde, ses serveurs traitaient donc l'équivalent de plus de 3 000 exemplaires des Trois Mousquetaires, et ils recommençaient la seconde suivante.",
    "full": [
      "Un modèle vit deux vies. Pendant l'entraînement, on ajuste ses paramètres pendant des semaines sur des milliers de GPU, une seule fois ; pendant l'inférence, on s'en sert avec ces paramètres figés, autant de fois qu'il y a de questions. Chaque requête se déroule en deux temps, la lecture de tout le message d'un bloc (le prefill), puis la production de la réponse, token par token (le decode).",
      "Un token traité en inférence coûte bien moins cher qu'un token d'entraînement, parce qu'il ne demande que le calcul vers l'avant, sans le calcul de retour qui sert à corriger les paramètres. Pour un modèle classique, où tous les paramètres travaillent sur chaque token, la règle courante tirée des lois d'échelle de 2020 donne un rapport d'environ un à trois.",
      "Ramené à une seule question, le coût reste petit. En août 2025, Google a mesuré qu'une requête texte médiane dans l'application Gemini consommait 0,24 Wh, moins que neuf secondes de télévision, et que cette consommation avait été divisée par 33 entre mai 2024 et mai 2025."
    ],
    "office": [
      {
        "who": "q",
        "text": "On l'a repris trois fois ce matin sur la même erreur. Il va finir par retenir ?"
      },
      {
        "who": "a",
        "text": "Pas en inférence, ses paramètres ne bougent pas pendant qu'il te répond. Mets la correction dans les consignes de l'outil, qu'il relira à chaque requête."
      }
    ],
    "avoid": "« Le modèle fait une inférence, il déduit la réponse. » En IA, le mot désigne l'exécution du modèle sur une entrée, sans aucun raisonnement logique garanti ; une réponse fausse est une inférence au même titre qu'une juste.",
    "video": null,
    "sources": [
      {
        "label": "Google, discours de Sundar Pichai à la keynote d'I/O, 19 mai 2026 (9 700 milliards de tokens par mois il y a deux ans, environ 480 000 milliards en 2025, plus de 3,2 millions de milliards en 2026). Calcul de l'Imagine : 3,2 x 10^15 tokens / (30,44 jours x 86 400 s) = 1,22 milliard de tokens par seconde ; 1,22 x 10^9 / 368 798 = 3 299 exemplaires",
        "url": "https://blog.google/innovation-and-ai/sundar-pichai-io-2026/"
      },
      {
        "label": "Les Trois Mousquetaires, Alexandre Dumas, texte du Projet Gutenberg compté avec tiktoken (o200k_base) le 2 octobre 2026 entre les marqueurs START et END : 368 798 tokens, 0,61 mot par token",
        "url": "https://www.gutenberg.org/ebooks/13951"
      },
      {
        "label": "Kaplan et al., Scaling Laws for Neural Language Models, janvier 2020 (le calcul de retour coûte environ deux fois le calcul vers l'avant, soit environ 6N opérations par token d'entraînement)",
        "url": "https://arxiv.org/abs/2001.08361"
      },
      {
        "label": "Google Cloud, Measuring the environmental impact of AI inference, 21 août 2025 (requête texte médiane de l'application Gemini : 0,24 Wh, moins de 9 secondes de télévision, énergie divisée par 33 de mai 2024 à mai 2025)",
        "url": "https://cloud.google.com/blog/products/infrastructure/measuring-the-environmental-impact-of-ai-inference"
      },
      {
        "label": "Elsworth et al., Measuring the environmental impact of delivering AI at Google scale, août 2025 (méthodologie détaillée)",
        "url": "https://arxiv.org/abs/2508.15734"
      },
      {
        "label": "NVIDIA, Mastering LLM Techniques: Inference Optimization, 17 novembre 2023 (phases de prefill et de decode)",
        "url": "https://developer.nvidia.com/blog/mastering-llm-techniques-inference-optimization/"
      }
    ]
  },
  {
    "id": "kv-cache",
    "status": "live",
    "num": "56",
    "title": "KV cache",
    "en": "KV cache",
    "aliases": [
      "key-value cache",
      "prefix caching"
    ],
    "aliasesFr": [
      "cache clé-valeur"
    ],
    "jargon": [
      {
        "say": "KV",
        "means": "key et value, clé et valeur, les deux séries de nombres que le modèle calcule pour chaque token à chaque couche, et que les tokens suivants consultent pour savoir ce qui précède"
      },
      {
        "say": "GQA",
        "means": "grouped-query attention, une architecture où plusieurs têtes d'attention partagent les mêmes clés et valeurs, ce qui rétrécit le cache ; Mistral Small 3.2 a 32 têtes pour 8 jeux de clés et valeurs"
      },
      {
        "say": "PagedAttention",
        "means": "la technique du moteur vLLM qui range le cache par petits blocs, comme les pages de la mémoire d'un ordinateur ; avant elle, 20 à 38 % seulement de la mémoire réservée au cache servait vraiment"
      },
      {
        "say": "prefix caching",
        "means": "la réutilisation du cache d'un début de texte commun à plusieurs requêtes, ce qui permet aux fournisseurs de facturer moins cher un début déjà vu (voir Coût d'une requête)"
      }
    ],
    "cat": "inference",
    "links": [
      "prediction-du-mot-suivant",
      "fenetre-de-contexte",
      "inference",
      "cout-d-une-requete"
    ],
    "short": "Le KV cache est la mémoire de travail où un modèle garde, pendant qu'il écrit, les calculs déjà faits sur les tokens précédents, pour ne pas les refaire à chaque nouveau token.",
    "image": "Sur une table multipiste, les prises déjà enregistrées restent sur la bande, et le chanteur pose sa nouvelle phrase en les écoutant sans que le groupe rejoue tout depuis le début ; le KV cache tient ce rôle. L'image triche sur un point, car ce qui est gardé n'est pas le son des prises mais des notes de travail prises à chaque étage de la console, beaucoup plus lourdes que le texte lui-même.",
    "imagineForm": "D",
    "imagine": "La cheffe de projet écrit à l'équipe infra : « Notre GPU a 80 Go de mémoire et Mistral Small 3.2 en prend 48 ; combien de clients peuvent lui envoyer en même temps un dossier qui remplit toute sa fenêtre ? » Réponse de l'équipe : « Un seul, et il reste à peine de quoi servir la moitié d'un deuxième. »",
    "full": [
      "Pour choisir le token suivant, chaque couche du modèle consulte tous les tokens déjà présents à travers deux séries de nombres calculées pour chacun, ses clés et ses valeurs. Ces nombres ne changent plus une fois calculés, donc le serveur les garde dans la mémoire du GPU et n'ajoute à chaque pas que ceux du nouveau token. Sans ce cache, une réponse de 1 000 tokens obligerait le modèle à traiter 500 500 tokens en tout, au lieu de 1 000. La lecture du message remplit le cache d'un coup, l'écriture de la réponse l'allonge d'un token à chaque fois.",
      "Ce cache pèse lourd, et les auteurs de vLLM l'estimaient en 2023 à 800 Ko par token pour un modèle de 13 milliards de paramètres, soit jusqu'à 1,6 Go pour une seule requête de 2 048 tokens. Pour Mistral Small 3.2, sorti en juin 2025, le calcul tiré de sa configuration donne environ 164 Ko par token, et quelque 21 Go quand sa fenêtre est pleine, près de la moitié de ce que pèsent ses paramètres. C'est souvent ce cache, plus que le modèle, qui limite le nombre de conversations qu'un GPU sert en même temps.",
      "Le même principe sert d'une requête à l'autre. Quand deux requêtes commencent par le même texte, un moteur comme vLLM peut réutiliser les blocs de cache du début commun au lieu de les recalculer. C'est ce qui permet aux fournisseurs d'API de facturer moins cher un début de requête déjà envoyé quelques minutes plus tôt, et la fiche Coût d'une requête en donne les prix."
    ],
    "office": [
      {
        "who": "q",
        "text": "Notre modèle maison sert dix personnes sans broncher, mais il refuse du monde dès que les conversations s'allongent."
      },
      {
        "who": "a",
        "text": "C'est le KV cache qui remplit la mémoire du GPU, puisqu'il grandit avec chaque token de chaque conversation ; résume les vieux historiques, ou passe sur un moteur comme vLLM qui le range sans gaspillage."
      }
    ],
    "avoid": "« Le KV cache, c'est la mémoire du modèle d'une conversation à l'autre. » Il ne contient que des calculs sur le texte en cours, il disparaît après la requête ou au bout de quelques minutes, et le modèle n'y apprend rien.",
    "video": null,
    "sources": [
      {
        "label": "Kwon et al., Efficient Memory Management for Large Language Model Serving with PagedAttention (vLLM), septembre 2023 (800 Ko de cache par token pour OPT-13B, jusqu'à 1,6 Go par requête de 2 048 tokens ; 20,4 à 38,2 % seulement de la mémoire du cache réellement utilisée dans les systèmes précédents ; taille du cache qui limite le nombre de requêtes servies ensemble)",
        "url": "https://arxiv.org/abs/2309.06180"
      },
      {
        "label": "Mistral AI, configuration de Mistral-Small-3.2-24B-Instruct-2506 (40 couches, 32 têtes d'attention, 8 têtes clé-valeur de dimension 128, fenêtre de 131 072 tokens, bfloat16). Calcul : 2 x 40 x 8 x 128 x 2 octets = 163 840 octets, environ 164 Ko par token ; x 131 072 tokens = 21,5 Go ; 24 milliards de paramètres x 2 octets = 48 Go. Imagine : 80 - 48 = 32 Go libres, 32 - 21,5 = 10,5 Go, environ la moitié d'une deuxième fenêtre pleine, hors mémoire de calcul. Sans cache : 1 + 2 + ... + 1 000 = 500 500",
        "url": "https://huggingface.co/mistralai/Mistral-Small-3.2-24B-Instruct-2506/blob/main/config.json"
      },
      {
        "label": "Wikipédia, Hopper (microarchitecture) (H100 avec jusqu'à 80 Go de mémoire)",
        "url": "https://en.wikipedia.org/wiki/Hopper_(microarchitecture)"
      },
      {
        "label": "NVIDIA, Mastering LLM Techniques: Inference Optimization, 17 novembre 2023 (clés et valeurs gardées en mémoire pour éviter de les recalculer, cache qui grandit avec la longueur de la séquence)",
        "url": "https://developer.nvidia.com/blog/mastering-llm-techniques-inference-optimization/"
      },
      {
        "label": "Ainslie et al., GQA: Training Generalized Multi-Query Transformer Models from Multi-Head Checkpoints, mai 2023",
        "url": "https://arxiv.org/abs/2305.13245"
      },
      {
        "label": "vLLM, documentation Automatic Prefix Caching (réutilisation des blocs de KV cache quand deux requêtes partagent un même début)",
        "url": "https://docs.vllm.ai/en/latest/design/prefix_caching.html"
      }
    ]
  },
  {
    "id": "descente-de-gradient",
    "status": "live",
    "num": "57",
    "title": "Descente de gradient",
    "en": "Gradient descent",
    "aliases": [
      "SGD",
      "stochastic gradient descent",
      "optimizer",
      "learning rate"
    ],
    "aliasesFr": [
      "descente du gradient",
      "optimiseur",
      "taux d'apprentissage"
    ],
    "jargon": [
      {
        "say": "learning rate",
        "means": "le taux d'apprentissage, la taille du pas : trop grand, l'entraînement saute par-dessus les bons réglages et diverge ; trop petit, il n'avance plus"
      },
      {
        "say": "SGD",
        "means": "stochastic gradient descent, la descente calculée à chaque pas sur un petit paquet d'exemples tiré au hasard plutôt que sur toutes les données, plus bruitée mais bien plus rapide"
      },
      {
        "say": "AdamW, Muon",
        "means": "des optimiseurs, c'est-à-dire des façons plus fines de faire chaque pas, qui tiennent compte des pas précédents ; AdamW date de 2017, Muon a fait ses preuves à grande échelle en 2025"
      },
      {
        "say": "la loss descend",
        "means": "l'erreur mesurée baisse au fil des pas, signe que l'entraînement progresse ; si elle remonte d'un coup, on parle de loss spike"
      }
    ],
    "cat": "entrainement",
    "links": [
      "entrainement",
      "parametres",
      "retropropagation",
      "gradient-qui-disparait"
    ],
    "short": "La descente de gradient ajuste les paramètres pendant l'entraînement : à chaque pas, elle calcule dans quel sens chacun doit bouger pour réduire l'erreur, puis le déplace un peu.",
    "image": "Retourne dans la régie, où l'ingé son n'a pas d'oreille mais un vumètre dont l'aiguille dit à quel point la dernière note sonnait faux. Pour chaque potard, un calcul lui indique de quel côté tourner pour faire baisser l'aiguille et à quel point elle y réagit ; il tourne alors tous les potards ensemble, chacun selon sa sensibilité, d'un geste volontairement petit, et refait une mesure.",
    "imagineForm": "B",
    "imagine": "Cache un objet dans la pièce, ferme les yeux et demande à ton voisin de te guider en ne disant que « plus chaud » ou « plus froid » après chaque pas. Avance à pas de géant, et tu dépasses l'objet, reviens, le dépasses encore ; avance à pas de fourmi, et tu y es encore dans dix minutes. Entre les deux se trouve le bon taux d'apprentissage.",
    "full": [
      "L'entraînement mesure à chaque pas l'erreur du modèle, la loss, sur un paquet de textes. Le gradient dit, pour chaque paramètre, si l'augmenter un peu ferait monter ou baisser cette erreur, et avec quelle force. La descente consiste à déplacer tous les paramètres à la fois dans le sens qui la fait baisser, d'une quantité réglée par le taux d'apprentissage, puis à recommencer sur un autre paquet, jusqu'à la fin de l'entraînement.",
      "L'image classique est celle d'un randonneur pris dans le brouillard, qui sent la pente sous ses pieds et descend du côté où elle plonge. Elle triche à trois endroits. Le terrain a autant de directions que le modèle a de paramètres, des milliards et pas deux. La pente n'est pas sentie mais calculée, sur un paquet de textes différent à chaque pas, comme si le sol bougeait sous le randonneur. Et le but n'est pas le fond de la vallée, qu'on n'atteint jamais, mais un replat assez bas pour que les prédictions soient bonnes.",
      "La méthode est ancienne, puisqu'on l'attribue à Augustin-Louis Cauchy en 1847. Elle ne trouve qu'un bon réglage, sans aucune garantie que ce soit le meilleur possible, et elle a besoin d'un autre calcul pour connaître la pente de chaque paramètre, la rétropropagation."
    ],
    "then": "AdamW, publié en 2017 et intégré depuis à PyTorch, est resté l'optimiseur le plus courant pour entraîner les grands modèles. En février 2025, Moonshot AI a montré que Muon, un optimiseur qui redresse la direction de chaque pas, atteignait le même résultat qu'AdamW avec environ deux fois moins de calcul, avant de s'en servir pour entraîner ses propres modèles.",
    "office": [
      {
        "who": "q",
        "text": "Le fine-tuning de cette nuit a planté, la loss est partie à l'infini au bout de vingt minutes."
      },
      {
        "who": "a",
        "text": "Commence par diviser le learning rate par deux ou par trois et relance ; un pas trop grand fait exactement ce que tu décris."
      }
    ],
    "avoid": "« La descente de gradient trouve le réglage optimal. » Elle trouve un réglage où l'erreur ne baisse plus beaucoup autour, ce qui suffit en pratique, sans rien prouver sur l'existence d'un meilleur réglage ailleurs.",
    "video": null,
    "sources": [
      {
        "label": "Wikipédia, Gradient descent (méthode attribuée à Cauchy, 1847 ; analogie des randonneurs dans le brouillard)",
        "url": "https://en.wikipedia.org/wiki/Gradient_descent"
      },
      {
        "label": "Loshchilov et Hutter, Decoupled Weight Decay Regularization (AdamW), novembre 2017 (adopté par la communauté et intégré à TensorFlow et PyTorch)",
        "url": "https://arxiv.org/abs/1711.05101"
      },
      {
        "label": "Moonshot AI, Kimi K2: Open Agentic Intelligence, juillet 2025 (préentraînement avec MuonClip, une variante de Muon)",
        "url": "https://arxiv.org/abs/2507.20534"
      },
      {
        "label": "Moonshot AI, Muon is Scalable for LLM Training, 24 février 2025 (Muon environ deux fois plus efficace en calcul qu'AdamW)",
        "url": "https://arxiv.org/abs/2502.16982"
      },
      {
        "label": "Kingma et Ba, Adam: A Method for Stochastic Optimization, décembre 2014",
        "url": "https://arxiv.org/abs/1412.6980"
      }
    ]
  },
  {
    "id": "retropropagation",
    "status": "live",
    "num": "58",
    "title": "Rétropropagation",
    "en": "Backpropagation",
    "aliases": [
      "backprop",
      "backward pass",
      "reverse-mode automatic differentiation"
    ],
    "aliasesFr": [
      "rétropropagation du gradient",
      "passe arrière"
    ],
    "jargon": [
      {
        "say": "forward pass, backward pass",
        "means": "l'aller, où le texte traverse le modèle jusqu'à la prédiction, puis le retour, où l'erreur remonte de la sortie vers l'entrée pour attribuer à chaque paramètre sa part"
      },
      {
        "say": "backprop",
        "means": "le diminutif courant ; « faire une backprop », c'est calculer les gradients d'un pas d'entraînement"
      },
      {
        "say": "activations",
        "means": "les valeurs intermédiaires calculées pendant l'aller, gardées en mémoire parce que le retour en a besoin ; ce sont elles qui font exploser la mémoire d'un entraînement"
      },
      {
        "say": "autograd",
        "means": "la partie des bibliothèques comme PyTorch qui fait la rétropropagation toute seule, sans qu'on écrive le calcul à la main"
      }
    ],
    "cat": "entrainement",
    "links": [
      "descente-de-gradient",
      "gradient-qui-disparait",
      "entrainement",
      "parametres"
    ],
    "short": "La rétropropagation est le calcul qui, après chaque erreur d'un modèle pendant l'entraînement, remonte de la sortie vers l'entrée pour établir combien chaque paramètre a contribué à cette erreur, et donc dans quel sens le corriger.",
    "image": "Quand la fausse note sort des enceintes, elle a traversé la console tranche après tranche, et la rétropropagation refait le chemin à l'envers. La dernière tranche établit sa part de la faute et transmet le reste à celle d'avant, qui fait de même, jusqu'au micro. Personne ne marche dans le studio, en réalité ; chaque tranche a gardé ses notes de l'aller, et le retour se contente de les relire.",
    "imagineForm": "D",
    "imagine": "« Qui a joué faux ? », demande le producteur après la prise, et l'ingé son lui tend un listing de sept milliards de lignes : « Tout le monde, un peu, et voici exactement de combien chacun. »",
    "full": [
      "Pour corriger un modèle, la descente de gradient a besoin de savoir, pour chacun de ses milliards de paramètres, dans quel sens il aurait fallu le tourner. Les tester un par un demanderait, pour un modèle de 7 milliards de paramètres, 7 milliards de calculs complets à chaque pas. La rétropropagation obtient toutes ces réponses d'un seul retour, qui coûte environ deux fois le calcul de l'aller, en appliquant couche par couche la règle de dérivation en chaîne.",
      "Ce raccourci coûte cher en mémoire, car le retour relit tout ce que l'aller a calculé. Hugging Face compte, pour un entraînement classique, 18 octets par paramètre avant même ces valeurs intermédiaires, contre 2 octets pour faire tourner le même modèle en 16 bits. La même documentation cite un modèle de 4 milliards de paramètres qui demande environ 85 Go de mémoire GPU pour s'entraîner.",
      "L'idée vient de plusieurs endroits. Seppo Linnainmaa en publie la forme générale en 1970, Paul Werbos l'applique aux réseaux de neurones en 1982, et c'est l'article de David Rumelhart, Geoffrey Hinton et Ronald Williams dans Nature, en 1986, qui la fait adopter par tout le domaine. Les grands modèles actuels sont encore entraînés de cette façon."
    ],
    "office": [
      {
        "who": "q",
        "text": "Le modèle de 8 milliards tourne très bien sur notre GPU de 24 Go. On le fine-tune dessus ce week-end ?"
      },
      {
        "who": "a",
        "text": "Pas en entier, parce que l'entraînement garde en mémoire bien plus que les poids. Pars sur une méthode qui ne réentraîne qu'une petite partie des paramètres, comme LoRA, ou loue une machine plus grosse."
      }
    ],
    "avoid": "« La rétropropagation, c'est quand le modèle apprend de ses erreurs en te parlant. » Elle n'a lieu que pendant l'entraînement, sur des exemples dont on connaît la bonne réponse ; quand le modèle te répond, aucun retour n'est calculé.",
    "video": null,
    "sources": [
      {
        "label": "Rumelhart, Hinton et Williams, Learning representations by back-propagating errors, Nature, 9 octobre 1986",
        "url": "https://www.nature.com/articles/323533a0"
      },
      {
        "label": "Wikipédia, Backpropagation (Linnainmaa 1970, Werbos 1982, Rumelhart en 1985 et 1986)",
        "url": "https://en.wikipedia.org/wiki/Backpropagation"
      },
      {
        "label": "Kaplan et al., Scaling Laws for Neural Language Models, janvier 2020 (le retour coûte environ deux fois l'aller)",
        "url": "https://arxiv.org/abs/2001.08361"
      },
      {
        "label": "Hugging Face, documentation Model training anatomy (6 octets de poids, 8 octets pour Adam et 4 octets de gradients par paramètre, activations gardées pour le retour ; environ 85 Go pour entraîner un modèle de 4 milliards de paramètres), consultée le 2 octobre 2026",
        "url": "https://huggingface.co/docs/transformers/model_memory_anatomy"
      }
    ]
  },
  {
    "id": "gradient-qui-disparait",
    "status": "live",
    "num": "59",
    "title": "Gradient qui disparaît",
    "en": "Vanishing gradient",
    "aliases": [
      "vanishing gradient problem",
      "exploding gradient",
      "exploding gradient problem"
    ],
    "aliasesFr": [
      "disparition du gradient",
      "explosion du gradient",
      "gradient évanescent"
    ],
    "jargon": [
      {
        "say": "vanishing / exploding gradient",
        "means": "le signal de correction qui s'éteint, ou au contraire qui s'emballe, en remontant les couches du réseau"
      },
      {
        "say": "residual connection, skip connection",
        "means": "un raccourci qui ajoute l'entrée d'un bloc à sa sortie, pour que le signal puisse traverser le bloc sans passer par ses calculs"
      },
      {
        "say": "LayerNorm, BatchNorm",
        "means": "des étapes qui remettent les nombres d'une couche à une échelle standard, pour qu'ils ne grossissent ni ne fondent d'une couche à l'autre"
      },
      {
        "say": "gradient clipping",
        "means": "on plafonne la taille du signal de correction à chaque pas, la parade la plus courante quand il s'emballe"
      }
    ],
    "cat": "entrainement",
    "links": [
      "retropropagation",
      "descente-de-gradient",
      "entrainement",
      "tailles-de-modele"
    ],
    "short": "Le gradient qui disparaît est le problème qui a longtemps empêché d'entraîner des réseaux profonds, parce qu'en remontant les couches, le signal qui dit comment corriger chaque paramètre rétrécit jusqu'à presque rien et que les premières couches n'apprennent plus.",
    "image": "Branche cinquante pédales d'effet à la suite, chacune baissant un peu le volume, et la guitare n'arrive plus à l'ampli ; si chacune le monte un peu, tu obtiens un larsen. La correction remonte les couches d'un réseau de la même façon, et la parade a été de poser à côté de chaque pédale un câble direct, qui laisse passer le son propre quoi que fasse la pédale.",
    "imagineForm": "A",
    "imagine": "Pose un million d'euros d'erreur à la sortie d'un réseau dont chaque couche ne transmet au mieux qu'un quart du signal qu'elle reçoit. Après dix couches, il reste 95 centimes à répartir dans la première, et après vingt couches, moins d'un dix-millième de centime. Mistral Small 3.2, un modèle de langage de taille moyenne, en empile quarante.",
    "full": [
      "Pendant la rétropropagation, le signal de correction est multiplié à chaque couche qu'il remonte. Si les facteurs sont petits, il fond de façon exponentielle et les couches proches de l'entrée ne bougent presque plus ; s'ils sont grands, il explose, les nombres débordent et l'entraînement diverge. Dans son manuel en ligne de 2015, Michael Nielsen mesure un réseau à quatre couches cachées dont la première apprend environ cent fois moins vite que la dernière.",
      "Sepp Hochreiter a décrit le problème dans son mémoire de 1991, et c'est pour le contourner dans les réseaux qui lisent des séquences qu'il a publié le LSTM avec Jürgen Schmidhuber en 1997, une cellule de mémoire où l'erreur circule sans s'éteindre. Pour les réseaux très profonds, le déblocage arrive par couches successives, avec une meilleure initialisation des poids en 2010, la fonction ReLU en 2011, la normalisation en février 2015, puis les connexions résiduelles en décembre 2015.",
      "L'article des connexions résiduelles, ResNet, précise que la disparition du gradient était déjà largement réglée par l'initialisation et la normalisation, et qu'il restait un autre mur, puisqu'un réseau de 56 couches faisait plus d'erreurs qu'un réseau de 20, même à l'entraînement. Avec le raccourci, ResNet a gagné le concours ImageNet 2015 avec 152 couches. Le Transformer de 2017 a repris le raccourci et la normalisation autour de chacun de ses blocs, et c'est ce qui permet d'empiler les dizaines de couches des grands modèles actuels."
    ],
    "office": [
      {
        "who": "q",
        "text": "Pourquoi les réseaux de neurones ont mis trente ans à décoller, alors que la rétropropagation date de 1986 ?"
      },
      {
        "who": "a",
        "text": "Entre autres raisons, on ne savait pas faire passer la correction à travers plus de quelques couches, et ce verrou n'a sauté qu'entre 2010 et 2015."
      }
    ],
    "avoid": "« ResNet a résolu le gradient qui disparaît. » Ses auteurs écrivent eux-mêmes que l'initialisation et la normalisation l'avaient déjà largement réglé ; les connexions résiduelles ont réglé le problème suivant, la dégradation des réseaux trop profonds.",
    "video": null,
    "sources": [
      {
        "label": "Michael Nielsen, Neural Networks and Deep Learning, chapitre 5, 2015 (dérivée de la sigmoïde au plus égale à 1/4 ; première couche cachée environ 100 fois plus lente que la dernière dans un réseau à quatre couches cachées). Calcul de l'Imagine, avec des poids inférieurs à 1 : 10^6 x 0,25^10 = 0,95 euro ; 10^6 x 0,25^20 = 9,1 x 10^-7 euro",
        "url": "http://neuralnetworksanddeeplearning.com/chap5.html"
      },
      {
        "label": "Wikipédia, Vanishing gradient problem (mémoire de Hochreiter, 1991 ; explosion du gradient)",
        "url": "https://en.wikipedia.org/wiki/Vanishing_gradient_problem"
      },
      {
        "label": "Hochreiter, Untersuchungen zu dynamischen neuronalen Netzen, mémoire de diplôme, TU Munich, 1991",
        "url": "https://people.idsia.ch/~juergen/SeppHochreiter1991ThesisAdvisorSchmidhuber.pdf"
      },
      {
        "label": "Hochreiter et Schmidhuber, Long Short-Term Memory, Neural Computation, 1997",
        "url": "https://www.bioinf.jku.at/publications/older/2604.pdf"
      },
      {
        "label": "Glorot et Bengio, Understanding the difficulty of training deep feedforward neural networks, AISTATS 2010",
        "url": "https://proceedings.mlr.press/v9/glorot10a.html"
      },
      {
        "label": "Glorot, Bordes et Bengio, Deep Sparse Rectifier Neural Networks (ReLU), AISTATS 2011",
        "url": "https://proceedings.mlr.press/v15/glorot11a.html"
      },
      {
        "label": "Ioffe et Szegedy, Batch Normalization, février 2015",
        "url": "https://arxiv.org/abs/1502.03167"
      },
      {
        "label": "He et al., Deep Residual Learning for Image Recognition, décembre 2015 (56 couches moins bonnes que 20 sans raccourci, disparition du gradient déjà largement traitée par l'initialisation et la normalisation, 152 couches, 1re place ILSVRC 2015)",
        "url": "https://arxiv.org/abs/1512.03385"
      },
      {
        "label": "Pascanu, Mikolov et Bengio, On the difficulty of training Recurrent Neural Networks, 2012 (plafonnement du gradient contre son explosion)",
        "url": "https://arxiv.org/abs/1211.5063"
      },
      {
        "label": "Vaswani et al., Attention Is All You Need, juin 2017 (connexion résiduelle et normalisation autour de chaque sous-couche)",
        "url": "https://arxiv.org/abs/1706.03762"
      },
      {
        "label": "Mistral AI, configuration de Mistral-Small-3.2-24B-Instruct-2506 (40 couches)",
        "url": "https://huggingface.co/mistralai/Mistral-Small-3.2-24B-Instruct-2506/blob/main/config.json"
      }
    ]
  },
  {
    "id": "webmcp",
    "status": "live",
    "num": "60",
    "title": "WebMCP",
    "en": "WebMCP",
    "aliases": [
      "Web Model Context Protocol",
      "document.modelContext",
      "navigator.modelContext"
    ],
    "aliasesFr": [],
    "jargon": [
      {
        "say": "document.modelContext",
        "means": "l'objet par lequel une page déclare ses outils dans le brouillon actuel ; les premières versions et certains scripts disent encore navigator.modelContext"
      },
      {
        "say": "API impérative, API déclarative",
        "means": "deux façons d'exposer un outil : en JavaScript avec registerTool, ou en ajoutant à un formulaire HTML des attributs comme toolname et tooldescription"
      },
      {
        "say": "origin trial",
        "means": "l'essai à durée limitée par lequel Chrome laisse des sites activer une fonction expérimentale pour leurs vrais visiteurs, avant de décider de la garder"
      },
      {
        "say": "toolautosubmit",
        "means": "l'attribut qui autorise l'agent à envoyer le formulaire lui-même ; sans lui, le navigateur s'arrête sur le bouton et c'est l'utilisateur qui valide"
      }
    ],
    "cat": "agents",
    "links": [
      "mcp",
      "tool-use",
      "agent",
      "prompt-injection",
      "harness"
    ],
    "solutions": [
      {
        "name": "Lighthouse, catégorie Agentic Browsing",
        "kind": "outil pour tester",
        "url": "https://developer.chrome.com/docs/lighthouse/agentic-browsing/registered-webmcp-tools"
      },
      {
        "name": "MCP-B",
        "kind": "bibliothèque open source",
        "url": "https://mcp-b.ai/"
      }
    ],
    "short": "WebMCP est une proposition de standard qui permet à un site de décrire ses outils aux agents IA du navigateur, pour qu'ils agissent sur la page sans deviner où cliquer.",
    "image": "En tournée, certaines salles collent à l'entrée des artistes une fiche d'accueil qui dit où brancher, quels boutons toucher et ce qui est interdit, et les roadies n'ont plus à tâtonner sur une console inconnue. WebMCP fait de cette fiche un standard du web. La fiche est rédigée par la salle elle-même, et rien ne garantit qu'elle décrive fidèlement ce que voit le public.",
    "imagineForm": "B",
    "imagine": "Ouvre reebok.com, affiche le code source de la page (Ctrl+U sous Windows, Cmd+Option+U sur Mac) et cherche « webmcp ». Tu tombes sur un petit script de Shopify qui ne charge la suite que si le navigateur sait accueillir des outils, et cette suite déclare onze outils pour les agents, de search_catalog à proceed_to_checkout.",
    "full": [
      "Un agent qui utilise un site aujourd'hui fait comme toi, en regardant la page et en devinant quel bouton correspond à quoi avant de cliquer et de taper, et il se trompe dès que la mise en page change. Avec WebMCP, le site déclare ses actions comme des outils, chacun accompagné d'un texte qui explique son rôle et d'un schéma de paramètres, et l'agent les appelle directement. On les déclare en JavaScript, ou en annotant un formulaire HTML existant, une variante encore décrite à part puisque la section correspondante de la spécification reste à écrire.",
      "WebMCP reprend le vocabulaire de MCP, les outils et leurs schémas, mais pas son architecture. Il n'y a pas de serveur à installer, l'outil est une fonction de la page qui s'exécute dans l'onglet avec la session de l'utilisateur, et un agent ne le découvre qu'en visitant la page. Google présente l'API comme conçue pour un humain présent dans la boucle, et une règle d'accès réserve par défaut les outils au site lui-même, les cadres venus d'autres sites devant y être autorisés.",
      "Les risques sont ceux du tool use, déplacés dans le navigateur. La spécification cite elle-même l'injection de consignes cachées dans les descriptions ou les résultats d'outils, et la fuite de données personnelles par des outils trop gourmands en paramètres. Mozilla relève un autre piège, celui d'un site qui proposerait des outils ne correspondant pas à ce qu'un humain voit sur la même page."
    ],
    "table": {
      "caption": "Où en est WebMCP",
      "asOf": "2 octobre 2026",
      "columns": [
        "Acteur",
        "Statut",
        "Date"
      ],
      "rows": [
        [
          "Spécification",
          "Brouillon de Community Group du W3C, hors voie de standardisation",
          "Version du 30 septembre 2026"
        ],
        [
          "Chrome",
          "Flag depuis la 146, origin trial de la 149 à la 156",
          "9 juin 2026"
        ],
        [
          "Firefox (Mozilla)",
          "Position neutre, proposée le 1er juin",
          "5 août 2026"
        ],
        [
          "Safari (WebKit)",
          "Position opposée, publiée le 3 juin",
          "11 juin 2026"
        ],
        [
          "Lighthouse",
          "Audit des outils, alerte au-delà de 40",
          "21 septembre 2026"
        ]
      ],
      "note": "Spécification coéditée par Microsoft et Google ; l'audit Lighthouse demande Chrome 150 ou plus, et aucun navigateur n'active WebMCP par défaut."
    },
    "then": "Le premier texte de WebMCP, signé par des équipes de Microsoft et de Google, date du 13 août 2025, et Chrome en a ouvert un aperçu aux développeurs le 10 février 2026. Entre-temps, l'objet d'entrée est passé de navigator.modelContext à document.modelContext, au point que le script de Shopify sur Reebok teste encore les deux noms.",
    "office": [
      {
        "who": "q",
        "text": "Le client e-commerce veut savoir s'il doit exposer son tunnel de commande en WebMCP."
      },
      {
        "who": "a",
        "text": "Teste-le en origin trial sur la recherche et le panier, garde la validation de la commande à l'humain, et ne refonds rien pour ça, puisque seul Chrome l'implémente et que WebKit s'y oppose."
      }
    ],
    "avoid": "« WebMCP, c'est la version web de MCP, un standard du W3C. » C'est un brouillon de Community Group, qui n'est pas sur la voie des standards du W3C, et il ne parle pas le protocole de MCP, dont il ne garde que le vocabulaire, sans serveur ni connexion à un service distant.",
    "video": null,
    "sources": [
      {
        "label": "W3C Web Machine Learning Community Group, WebMCP, Draft Community Group Report du 30 septembre 2026 (hors voie de standardisation ; éditeurs Brandon Walderman pour Microsoft, Khushal Sagar et Dominic Farolino pour Google ; document.modelContext, registerTool ; règle d'accès « tools » ; risques d'injection et de fuite de données ; section déclarative encore à écrire)",
        "url": "https://webmachinelearning.github.io/webmcp/"
      },
      {
        "label": "Dépôt webmachinelearning/webmcp (premier texte publié le 13 août 2025, inspiration MCP-B, vocabulaire partagé avec MCP)",
        "url": "https://github.com/webmachinelearning/webmcp"
      },
      {
        "label": "Explainer de l'API déclarative (attributs toolname, tooldescription, toolparamdescription et toolautosubmit ; sans toolautosubmit, l'utilisateur valide le formulaire)",
        "url": "https://github.com/webmachinelearning/webmcp/blob/main/declarative-api-explainer.md"
      },
      {
        "label": "Chrome Platform Status, fiche WebMCP (statut « Proposed », essai développeur à partir de Chrome 146, origin trial de Chrome 149 à 156), consultée le 2 octobre 2026",
        "url": "https://chromestatus.com/feature/5117755740913664"
      },
      {
        "label": "Chrome for Developers, WebMCP is available for early preview, 10 février 2026",
        "url": "https://developer.chrome.com/blog/webmcp-epp"
      },
      {
        "label": "Chrome for Developers, Join the WebMCP origin trial, 9 juin 2026",
        "url": "https://developer.chrome.com/blog/ai-webmcp-origin-trial"
      },
      {
        "label": "Chrome for Developers, documentation WebMCP, mise à jour le 1er octobre 2026 (API conçue pour un humain dans la boucle, découverte des outils en visitant le site, règle d'accès « tools » limitée par défaut au site, autorisation explicite pour les cadres d'autres sites)",
        "url": "https://developer.chrome.com/docs/ai/webmcp"
      },
      {
        "label": "WebKit standards-positions, issue 670 (position opposée publiée le 3 juin 2026, actée par le label « position: oppose » le 11 juin : préférence pour combler les manques dans HTML et ARIA plutôt que de doubler la page d'une couche d'outils)",
        "url": "https://github.com/WebKit/standards-positions/issues/670"
      },
      {
        "label": "Mozilla standards-positions, issue 1412 (position neutre proposée le 1er juin 2026, actée par le label « position: neutral » le 5 août 2026 ; risque de sites dont les outils ne correspondent pas à ce que voit l'utilisateur)",
        "url": "https://github.com/mozilla/standards-positions/issues/1412"
      },
      {
        "label": "Chrome for Developers, Lighthouse, audit Registered WebMCP tools (alerte au-delà de 40 outils), mis à jour le 21 septembre 2026",
        "url": "https://developer.chrome.com/docs/lighthouse/agentic-browsing/registered-webmcp-tools"
      },
      {
        "label": "Chrome for Developers, Lighthouse agentic browsing scoring (Chrome 150 ou plus requis, inscription à l'origin trial pour les audits WebMCP), mis à jour le 5 mai 2026",
        "url": "https://developer.chrome.com/docs/lighthouse/agentic-browsing/scoring"
      },
      {
        "label": "Script WebMCP de la vitrine Shopify de Reebok, ouvert le 2 octobre 2026 (11 définitions d'outils avec nom, annotations et description, dont search_catalog, add_to_cart et proceed_to_checkout ; chargé seulement si document.modelContext ou navigator.modelContext expose registerTool)",
        "url": "https://www.reebok.com/cdn/shopifycloud/storefront/assets/storefront/webmcp-c6b62ece.js"
      }
    ]
  },
  {
    "id": "dead-internet",
    "status": "live",
    "num": "61",
    "title": "Théorie de l'internet mort",
    "en": "Dead Internet theory",
    "aliases": [
      "dead internet",
      "dead internet theory"
    ],
    "aliasesFr": [
      "internet mort"
    ],
    "jargon": [
      {
        "say": "bot traffic",
        "means": "la part des visites d'un site faites par des programmes plutôt que par des personnes, des robots d'indexation aux scrapers en passant par les faux comptes"
      },
      {
        "say": "AI crawler",
        "means": "le robot d'un labo d'IA qui parcourt le web pour copier des pages, le plus souvent pour en faire des données d'entraînement"
      },
      {
        "say": "LLM-run account",
        "means": "un compte de réseau social dont les messages sont écrits par un modèle de langage ; l'expression qu'a employée Sam Altman dans un tweet de septembre 2025"
      }
    ],
    "cat": "mythes",
    "links": [
      "ai-slop",
      "agent",
      "webmcp",
      "entrainement",
      "llm"
    ],
    "short": "La théorie de l'internet mort affirme que l'essentiel de ce qu'on voit en ligne est produit par des programmes, un constat en partie mesurable mêlé à un complot.",
    "image": "Transposée au studio, la théorie voudrait que la salle soit remplie de mannequins, que les applaudissements sortent d'une bande et que la maison de disques ait monté le tout pour te vendre ses albums. Les compteurs de la salle racontent une histoire moins romanesque. Un peu plus de la moitié des entrées sont bien des machines, mais beaucoup sont des techniciens venus recopier les partitions, comme les robots d'indexation, et non des faux fans.",
    "imagineForm": "D",
    "imagine": "Sous la vidéo d'un chat qui joue du piano, vue deux millions de fois, tu écris « Il reste des humains ici ? ». Moins d'une minute plus tard, un compte sans photo te répond : « Excellente question ! La place de l'humain dans le monde numérique est un sujet passionnant. »",
    "full": [
      "Le texte fondateur a été publié le 5 janvier 2021 par un utilisateur nommé IlluminatiPirate sur Agora Road's Macintosh Cafe, un petit forum, et reprenait des idées nées sur des imageboards comme Wizardchan. Selon lui, l'internet serait mort vers 2016 ou 2017, et le web qu'on croit humain serait écrit en grande partie par des intelligences artificielles, aidées d'influenceurs payés pour fabriquer la demande.",
      "La suite du texte relève du complot. L'auteur y voit la main du gouvernement américain, qui se servirait de Google, de Facebook ou d'Amazon pour mener ce qu'il appelle un gaslighting de la population mondiale par l'IA, et sa preuve se résume à une liste de faits sans lien entre eux. En septembre 2021, un article de Kaitlyn Tiffany dans The Atlantic, « Maybe You Missed It, but the Internet 'Died' Five Years Ago », l'a fait sortir des forums, et c'est lui que toute la presse a cité ensuite.",
      "La part des machines dans le trafic se mesure, en revanche, et Imperva comptait déjà 52 % de trafic automatisé en 2016, l'année même où la théorie date la mort de l'internet. Selon le rapport annuel d'Imperva sur les bots, publié en avril 2026, les programmes automatisés ont fait plus de 53 % des requêtes web en 2025, contre 51 % l'année précédente. Ce chiffre compte ensemble les robots d'indexation, les crawlers des labos d'IA et les bots malveillants, et il dit combien de machines visitent les pages, pas combien en écrivent.",
      "Pour l'écriture, l'étude la plus citée vient de Graphite, une agence de référencement, qui a passé au détecteur 43 000 articles en anglais tirés de Common Crawl. La part jugée générée par l'IA y dépasse celle des textes humains en novembre 2024, puis plafonne autour de la moitié. Les auteurs notent eux-mêmes que ces articles apparaissent peu dans Google et dans ChatGPT, et que leur détecteur prend pour de l'IA 4,2 % de textes écrits avant ChatGPT.",
      "Le web n'est donc pas mort, mais une bonne part de son trafic vient de machines, et près de la moitié de ses nouveaux articles en anglais aussi, selon le détecteur de Graphite."
    ],
    "then": "Le 3 septembre 2025, Sam Altman, le patron d'OpenAI, écrivait sur X qu'il n'avait jamais pris la théorie très au sérieux, mais qu'il voyait désormais beaucoup de comptes Twitter tenus par des LLM. En avril 2026, Imperva intitule son rapport annuel « les bots à l'ère des agents », parce que des programmes visitent désormais les sites pour le compte d'utilisateurs, pour y chercher des données ou y accomplir une tâche à leur place.",
    "office": [
      {
        "who": "q",
        "text": "Si la moitié du trafic, ce sont des bots, nos stats d'audience sont fausses ?"
      },
      {
        "who": "a",
        "text": "Ce chiffre vaut pour le web entier, pas pour ton site ; regarde d'abord ce que ton outil de mesure filtre déjà, puis cherche les visites sans défilement ni clic, qui trahissent souvent un robot qui n'a pas été écarté."
      }
    ],
    "avoid": "« Tout ce qu'on voit en ligne est faux. » Les mesures disent que plus de la moitié des requêtes viennent de machines, dont beaucoup de robots qui lisent sans écrire, pas que les gens ont disparu ; et les articles générés se classent encore mal dans Google.",
    "video": null,
    "sources": [
      {
        "label": "IlluminatiPirate, « Dead Internet Theory: Most of the Internet is Fake », Agora Road's Macintosh Cafe, 5 janvier 2021 (mort vers 2016-2017, gouvernement américain, gaslighting par l'IA)",
        "url": "https://forum.agoraroad.com/index.php?threads/dead-internet-theory-most-of-the-internet-is-fake.3011/"
      },
      {
        "label": "Wikipédia, Dead Internet theory (origine sur Wizardchan, article de Kaitlyn Tiffany dans The Atlantic en septembre 2021, 52 % de trafic automatisé en 2016 selon Imperva)",
        "url": "https://en.wikipedia.org/wiki/Dead_Internet_theory"
      },
      {
        "label": "Imperva, Bad Bot Report 2026: Bad Bots in the Agentic Age, 29 avril 2026 (plus de 53 % du trafic web automatisé en 2025, contre 51 % l'année précédente ; agents d'IA qui agissent pour le compte d'utilisateurs)",
        "url": "https://www.imperva.com/blog/bad-bot-report-2026-bots-agentic-age/"
      },
      {
        "label": "Graphite, More Articles Are Now Created by AI Than Humans, 14 octobre 2025 (43 000 URL de Common Crawl, croisement en novembre 2024, plafond, faux positifs à 4,2 %)",
        "url": "https://graphite.io/five-percent/more-articles-are-now-created-by-ai-than-humans"
      },
      {
        "label": "Sam Altman sur X, 3 septembre 2025 : « i never took the dead internet theory that seriously »",
        "url": "https://x.com/sama/status/1963366714684707120"
      }
    ]
  },
  {
    "id": "ai-slop",
    "status": "live",
    "num": "62",
    "title": "AI slop",
    "en": "AI slop",
    "aliases": [
      "slop",
      "AI-generated slop"
    ],
    "aliasesFr": [],
    "jargon": [
      {
        "say": "slop",
        "means": "en anglais, d'abord la boue, puis les restes de nourriture et la pâtée ; Merriam-Webster le définit désormais comme du contenu numérique de faible qualité produit en masse par l'IA"
      },
      {
        "say": "brainrot",
        "means": "les vidéos absurdes calibrées pour retenir l'attention ; Kapwing y range l'AI slop et d'autres contenus du même genre"
      },
      {
        "say": "content farm",
        "means": "ferme de contenus, un site qui publie à la chaîne pour capter du trafic de recherche et des revenus publicitaires"
      },
      {
        "say": "scaled content abuse",
        "means": "le nom que Google donne depuis mars 2024 à la production de pages en masse pour remonter dans les résultats, qu'elle soit faite par des machines, des humains ou les deux"
      }
    ],
    "cat": "ecosysteme",
    "links": [
      "dead-internet",
      "hallucination",
      "cout-d-une-requete",
      "paradoxe-de-jevons",
      "llm"
    ],
    "short": "L'AI slop désigne le contenu généré par l'IA en grande quantité et sans soin, qu'il s'agisse de textes, d'images, de vidéos ou de musique, publié pour occuper l'espace ou capter des vues plutôt que pour être lu.",
    "image": "Un studio qui ne coûte presque plus rien à louer, comme un modèle qui génère pour quelques centimes, finit par presser des disques à la chaîne. Personne ne les a commandés ni écoutés en entier, mais ils remplissent les bacs du disquaire au point que tu ne trouves plus l'album que tu étais venu chercher.",
    "imagineForm": "A",
    "imagine": "Au plus haut de juin 2026, Deezer recevait environ 90 000 morceaux entièrement générés par l'IA en une seule journée. À trois minutes le morceau, écouter cette livraison te prendrait 4 500 heures, plus de six mois sans dormir, et le jour où tu aurais fini, près de dix-sept millions de nouveaux morceaux t'attendraient.",
    "full": [
      "Le mot vient de l'anglais slop, la pâtée des cochons. Il circulait vers 2022 sur 4chan, Hacker News et YouTube, après la sortie des premiers générateurs d'images, et le 8 mai 2024 le programmeur Simon Willison l'a popularisé en reprenant un tweet de @deepfates. Le slop serait au contenu généré ce que le spam est au courrier, puisque dans les deux cas personne ne l'a demandé et personne ne l'a relu.",
      "En mai 2025, le Chicago Sun-Times et une édition du Philadelphia Inquirer ont publié une liste de lectures pour l'été dont dix titres sur quinze n'existaient pas, comme un roman climatique d'Isabel Allende intitulé Tidewater Dreams. Son auteur, Marco Buscaglia, a reconnu l'avoir produite en partie avec l'IA sans vérifier. En octobre 2025, Kapwing a ouvert un compte YouTube neuf et compté 104 vidéos de slop parmi les 500 premiers Shorts qu'on lui proposait, soit 21 %.",
      "Le slop ne coûte presque rien à produire, et c'est l'attention de chacun qui paie la différence. Chez Deezer, les morceaux générés sont passés de 10 % des nouveaux envois en janvier 2025 à plus de la moitié certains jours de juin 2026. Ils ne font pourtant que 1 à 3 % des écoutes, et jusqu'à 85 % de ces écoutes étaient frauduleuses en 2025, faites par des robots pour toucher des droits.",
      "La recherche en ligne en porte le poids. En mars 2024, Google a étendu sa règle contre le spam à toute page produite en masse pour se classer, quel que soit l'outil, et annonçait ensuite 45 % de contenu peu original en moins dans ses résultats. Un moteur doit désormais trier ce qui a été écrit pour toi de ce qui a été écrit pour lui."
    ],
    "then": "Quand Simon Willison défend le mot, en mai 2024, il parle d'un phénomène que surtout les gens du métier savent repérer. En décembre 2025, Merriam-Webster en fait son mot de l'année et le définit comme du contenu numérique de faible qualité, produit en masse par l'IA.",
    "office": [
      {
        "who": "q",
        "text": "On peut sortir nos deux cents articles de blog SEO avec l'IA ce trimestre ?"
      },
      {
        "who": "a",
        "text": "Les produire, oui, mais Google vise depuis mars 2024 les pages faites en masse pour se classer, quel que soit l'outil ; publiez-en moins, relus par quelqu'un qui connaît le sujet, avec ce que vous êtes seuls à savoir."
      }
    ],
    "avoid": "« Tout ce qui est fait avec l'IA, c'est du slop. » Le mot vise le contenu que personne n'a demandé ni relu ; un texte généré, vérifié et utile n'en est pas, et un texte humain bâclé pour le référencement en a tous les défauts.",
    "video": null,
    "sources": [
      {
        "label": "Simon Willison, Slop is the new name for unwanted AI-generated content, 8 mai 2024 (comparaison avec le spam, tweet de @deepfates)",
        "url": "https://simonwillison.net/2024/May/8/slop/"
      },
      {
        "label": "Wikipédia, AI slop (usage du mot sur 4chan, Hacker News et YouTube vers 2022)",
        "url": "https://en.wikipedia.org/wiki/AI_slop"
      },
      {
        "label": "NBC News, Merriam-Webster names 'slop' as its 2025 word of the year, 15 décembre 2025 (définition)",
        "url": "https://www.nbcnews.com/news/us-news/merriam-webster-word-of-the-year-2025-rcna247864"
      },
      {
        "label": "NPR, How an AI-generated summer reading list got published in major newspapers, 20 mai 2025 (cinq titres réels sur quinze, Tidewater Dreams, Marco Buscaglia)",
        "url": "https://www.npr.org/2025/05/20/nx-s1-5405022/fake-summer-reading-list-ai"
      },
      {
        "label": "Kapwing, AI Slop Report: The Global Rise of Low-Quality AI Videos, 28 novembre 2025 (104 Shorts de slop sur les 500 premiers d'un compte neuf, données d'octobre 2025)",
        "url": "https://www.kapwing.com/blog/ai-slop-report-the-global-rise-of-low-quality-ai-videos/"
      },
      {
        "label": "Deezer Newsroom, AI music exceeds 50 percent of daily uploads, juillet 2026 (90 000 morceaux par jour et plus de 50 % des envois au plus haut de juin 2026, 1 à 3 % des écoutes, jusqu'à 85 % d'écoutes frauduleuses en 2025). Calcul de l'Imagine : 90 000 x 3 min = 270 000 min = 4 500 h = 187,5 jours ; 187,5 x 90 000 = 16,9 millions",
        "url": "https://newsroom-deezer.com/2026/07/ai-music-exceeds-50-percent-daily-uploads-deezer/"
      },
      {
        "label": "TechCrunch, Music streamer Deezer says more than 50% of daily uploads are AI-generated, 21 juillet 2026 (10 % des envois en janvier 2025)",
        "url": "https://techcrunch.com/2026/07/21/music-streamer-deezer-says-more-than-50-of-daily-uploads-are-ai-generated/"
      },
      {
        "label": "Google, New ways we're tackling spammy, low-quality content on Search, 5 mars 2024, mis à jour en avril (scaled content abuse, 45 % de contenu peu original en moins)",
        "url": "https://blog.google/products/search/google-search-update-march-2024/"
      }
    ]
  },
  {
    "id": "vibe-coding",
    "status": "live",
    "num": "63",
    "title": "Vibe coding",
    "en": "Vibe coding",
    "aliases": [
      "vibecoding",
      "vibe code",
      "vibe coder"
    ],
    "aliasesFr": [],
    "jargon": [
      {
        "say": "Accept All",
        "means": "le bouton qui applique d'un coup toutes les modifications proposées par l'IA ; Karpathy disait le presser à chaque fois, sans lire"
      },
      {
        "say": "agentic engineering",
        "means": "le nom que Karpathy préfère depuis février 2026 pour le travail professionnel avec des agents, où ils écrivent le code et où toi tu supervises"
      },
      {
        "say": "app builder",
        "means": "un outil comme Lovable, Replit ou v0 qui fabrique une application entière à partir d'une description en langage courant"
      },
      {
        "say": "RLS",
        "means": "Row Level Security, la règle de base de données qui dit quel utilisateur peut lire quelle ligne ; c'est elle qui manquait aux applications Lovable exposées en 2025"
      }
    ],
    "cat": "methode",
    "links": [
      "loop",
      "agent",
      "harness",
      "mythe-agent-autonome"
    ],
    "solutions": [
      {
        "name": "Lovable",
        "kind": "générateur d'applications",
        "url": "https://docs.lovable.dev/"
      },
      {
        "name": "Replit",
        "kind": "générateur d'applications",
        "url": "https://replit.com/"
      },
      {
        "name": "v0 (Vercel)",
        "kind": "générateur d'applications",
        "url": "https://v0.app/"
      },
      {
        "name": "Cursor",
        "kind": "éditeur de code",
        "url": "https://cursor.com/"
      },
      {
        "name": "Claude Code",
        "kind": "agent de code",
        "url": "https://claude.com/product/claude-code"
      },
      {
        "name": "Cline",
        "kind": "agent de code open source",
        "url": "https://github.com/cline/cline"
      }
    ],
    "short": "Le vibe coding consiste à faire écrire un programme par une IA puis à accepter ses modifications sans lire le code, en jugeant seulement si le résultat a l'air de marcher.",
    "image": "Tu fredonnes un air au groupe, il le joue, tu dis « plus de basse » et il remonte la basse, sans que tu aies jamais regardé la partition ni la console. Le groupe joue le rôle de l'agent, la partition celui du code. Pour une maquette du dimanche, c'est un bonheur ; pour sortir l'album, quelqu'un devra relire la partition mesure par mesure.",
    "imagineForm": "B",
    "imagine": "Commande à un chatbot un minuteur pomodoro en un seul fichier HTML, colle sa réponse dans un fichier minuteur.html et ouvre-le dans ton navigateur ; il y a de bonnes chances qu'il marche du premier coup. Cherche maintenant, dans le fichier, la ligne qui déclenche la sonnerie, et lance ton nouveau minuteur pour savoir combien de temps tu y passes.",
    "full": [
      "Le mot vient d'un tweet d'Andrej Karpathy, membre fondateur d'OpenAI et ancien responsable de l'IA chez Tesla, publié le 2 février 2025. Il y décrit une façon de coder où l'on se laisse porter et où l'on oublie que le code existe. Il parle à son outil au lieu de taper, clique toujours sur « Accept All », ne lit plus les modifications et recolle les messages d'erreur sans un mot. Il ajoutait que ce n'était « pas si mal » pour des projets jetables du week-end.",
      "Le mot a vite dépassé son auteur. En mars 2025, Jared Friedman, associé de Y Combinator, annonçait que pour un quart des start-up de la promotion d'hiver, 95 % du code avait été écrit par l'IA, et le dictionnaire Collins l'a élu mot de l'année 2025. Des outils comme Lovable, Replit ou v0 fabriquent désormais une application entière à partir d'une simple description.",
      "Le risque se loge dans ce que personne ne lit. En mars 2025, le développeur Matt Palmer a découvert que des applications générées par Lovable laissaient leur base de données ouverte, faute d'une règle d'accès que personne n'avait vérifiée. Sur 1 645 projets analysés, 170 laissaient lire des données à n'importe qui, des adresses mail aux clés d'API. En avril, un ingénieur de Palantir a montré qu'on pouvait en tirer des montants de dettes et des adresses personnelles. Lovable conteste en partie, en estimant que la protection des données revient à chaque client.",
      "Le problème dépasse un outil. En juillet 2025, Veracode a fait écrire du code à plus de 100 modèles sur des tâches de test et trouvé une faille de sécurité dans 45 % des cas, sans que les modèles récents ou plus gros fassent mieux.",
      "Le vibe coding est une loop sans vérification, où la seule question posée à chaque tour est « ça a l'air de marcher ? ». La version professionnelle garde la même boucle et ajoute ce qui vérifie ce que l'agent a écrit, un harness, des tests et des relectures."
    ],
    "then": "En février 2025, Karpathy réservait le vibe coding aux projets jetables, parce que les modèles marchaient « presque ». Le 4 février 2026, il constate que coder avec des agents devient le mode de travail par défaut des professionnels, avec plus de supervision, et propose d'appeler ce travail agentic engineering, pendant que vibe coding continue de désigner la version sans relecture.",
    "office": [
      {
        "who": "q",
        "text": "Quelqu'un du marketing a monté notre outil de réservation en vibe coding en deux jours, on le met en ligne ?"
      },
      {
        "who": "a",
        "text": "Fais d'abord vérifier qui peut lire quoi dans la base et où sont rangées les clés d'API, puisque c'est exactement ce qui manquait aux 170 applications Lovable exposées en 2025."
      }
    ],
    "avoid": "« Avec le vibe coding, plus besoin de savoir coder. » Pour une maquette, c'est vrai ; pour un outil qui stocke des données de clients, quelqu'un doit savoir lire ce que l'IA a écrit, ou au moins faire tourner les tests et les contrôles de sécurité qui le lisent à sa place.",
    "video": null,
    "sources": [
      {
        "label": "Andrej Karpathy sur X, 2 février 2025 : « There's a new kind of coding I call \"vibe coding\" » (Accept All, « not too bad for throwaway weekend projects »)",
        "url": "https://x.com/karpathy/status/1886192184808149383"
      },
      {
        "label": "Andrej Karpathy sur X, 4 février 2026 : rétrospective d'un an, « agentic engineering », plus de supervision",
        "url": "https://x.com/karpathy/status/2019137879310836075"
      },
      {
        "label": "TechCrunch, A quarter of startups in YC's current cohort have codebases that are almost entirely AI-generated, 6 mars 2025 (Jared Friedman, 95 % du code)",
        "url": "https://techcrunch.com/2025/03/06/a-quarter-of-startups-in-ycs-current-cohort-have-codebases-that-are-almost-entirely-ai-generated/"
      },
      {
        "label": "RTÉ, Collins' Word of the Year for 2025 revealed, 6 novembre 2025",
        "url": "https://www.rte.ie/entertainment/2025/1106/1542331-collins-word-of-the-year-for-2025-revealed/"
      },
      {
        "label": "Matt Palmer, Statement on CVE-2025-48757, 29 mai 2025 (découverte le 20 mars 2025, 170 projets aux règles d'accès insuffisantes sur 1 645, adresses mail et clés d'API lisibles ; exploitation publique par un ingénieur de Palantir le 14 avril 2025, montants de dettes et adresses personnelles)",
        "url": "https://mattpalmer.io/posts/2025/05/statement-on-CVE-2025-48757/"
      },
      {
        "label": "NIST, National Vulnerability Database, CVE-2025-48757, publiée le 30 mai 2025 (règle RLS insuffisante, contestation de Lovable)",
        "url": "https://nvd.nist.gov/vuln/detail/CVE-2025-48757"
      },
      {
        "label": "Veracode, Insights from the 2025 GenAI Code Security Report, 30 juillet 2025 (45 % de code avec faille, plus de 100 modèles, pas de progrès avec la taille)",
        "url": "https://www.veracode.com/blog/genai-code-security-report/"
      }
    ]
  },
  {
    "id": "paradoxe-de-jevons",
    "status": "live",
    "num": "64",
    "title": "Paradoxe de Jevons",
    "en": "Jevons paradox",
    "aliases": [
      "Jevons effect",
      "Jevons' paradox"
    ],
    "aliasesFr": [],
    "jargon": [
      {
        "say": "Jevons paradox strikes again",
        "means": "le tweet de Satya Nadella, patron de Microsoft, le 27 janvier 2025, en pleine panique DeepSeek : plus l'IA devient efficace, plus on va s'en servir"
      },
      {
        "say": "effet rebond",
        "means": "une partie de l'économie permise par un gain d'efficacité est reprise par une consommation plus forte ; le paradoxe de Jevons est le cas où le rebond dépasse l'économie"
      },
      {
        "say": "price elasticity",
        "means": "l'élasticité-prix de la demande, c'est-à-dire de combien la demande grimpe quand le prix baisse ; sans demande élastique, pas de paradoxe"
      },
      {
        "say": "cost per token",
        "means": "le prix d'un token à l'API ; c'est lui qui chute, pendant que la facture totale peut monter"
      }
    ],
    "cat": "ecosysteme",
    "links": [
      "cout-d-une-requete",
      "inference",
      "compute",
      "modeles-de-raisonnement",
      "open-weights",
      "ai-slop"
    ],
    "short": "Le paradoxe de Jevons décrit le cas où un gain d'efficacité, au lieu de faire baisser la consommation d'une ressource, la fait augmenter, parce que la ressource devenue moins chère trouve beaucoup plus d'usages.",
    "image": "Le jour où la maison de disques divise par dix le prix de l'heure de studio, l'équivalent du prix du token, aucun groupe ne réserve dix fois moins d'heures pour le même album. On enregistre des démos, des versions acoustiques, des remix, et le studio n'a jamais été aussi plein, ni la facture totale aussi haute.",
    "imagineForm": "D",
    "imagine": "« Le prix du token a encore été divisé par dix, notre facture d'IA va baisser ? », demande la directrice financière en janvier. Le directeur technique lui répond : « Maintenant que ça ne coûte presque rien, on fait relire chaque contrat par trois agents. »",
    "full": [
      "En 1865, l'économiste William Stanley Jevons publie The Coal Question pour une Angleterre qui craint de manquer de charbon. Il y écrit que croire qu'un usage plus économe du combustible réduit la consommation est une confusion d'idées, et que la vérité est exactement l'inverse. En Écosse, le charbon nécessaire pour produire une tonne de fonte était tombé à moins d'un tiers, et la consommation totale avait été multipliée par dix.",
      "Son mécanisme tient en une chaîne. Le haut-fourneau qui brûle moins de charbon rapporte davantage, attire des capitaux, fait baisser le prix de la fonte, la demande de fonte grimpe, et les fourneaux supplémentaires finissent par brûler plus que ce que chacun a économisé.",
      "Le paradoxe est revenu d'un coup en janvier 2025. DeepSeek, un labo chinois, venait de publier R1, un modèle de raisonnement aux poids ouverts présenté comme bien moins gourmand en calcul, et le 27 janvier l'action Nvidia a perdu près de 17 %, soit 589 milliards de dollars de valeur en une séance. Dans la nuit, avant l'ouverture de la Bourse, Satya Nadella tweetait « Jevons paradox strikes again! », pour dire qu'une IA plus efficace serait une IA dont l'usage explose.",
      "Les chiffres de 2025 vont plutôt dans son sens. Selon Epoch AI, le prix pour atteindre un niveau de performance donné a été divisé chaque année par 9 à 900 selon la tâche. De son côté, OpenRouter, qui aiguille les requêtes vers plus de 300 modèles, est passé d'environ 10 000 milliards de tokens par an à plus de 100 000 milliards à la mi-2025. Les modèles de raisonnement, qui écrivent longuement avant de répondre, ajoutent leur part à la note.",
      "Le paradoxe n'a pourtant rien d'une loi. Il ne joue que si la demande grimpe plus vite que le prix ne baisse, et la nourriture, devenue bien moins chère au XXe siècle grâce aux gains de l'agriculture, n'a pas vu sa demande suivre. Le travail agricole a fondu à la place, puisque les États-Unis sont passés de 40 % d'Américains employés dans l'agriculture en 1900 à moins de 2 % en 2024. Pour l'IA, le pari de Nadella porte sur l'appétit des utilisateurs ; les volumes de tokens vont pour l'instant dans son sens, sans prouver à eux seuls que le calcul consommé au total augmente."
    ],
    "office": [
      {
        "who": "q",
        "text": "Les prix des modèles baissent chaque trimestre, notre budget IA va fondre ?"
      },
      {
        "who": "a",
        "text": "Le prix unitaire baissera, mais une équipe qui paie moins chaque token trouve vite de quoi en consommer beaucoup plus ; budgète sur le volume d'usage que tu prévois, pas sur le tarif affiché."
      }
    ],
    "avoid": "« DeepSeek a prouvé qu'on aura besoin de moins de puces. » Un modèle moins coûteux abaisse le prix de chaque usage, et l'histoire de Jevons dit que c'est souvent le nombre d'usages qui l'emporte ; la question reste ouverte, mais la consommation de tokens a continué de grimper en 2025.",
    "video": null,
    "sources": [
      {
        "label": "W. S. Jevons, The Coal Question, chapitre VII « Of the Economy of Fuel », Econlib (confusion d'idées, consommation de charbon par tonne de fonte réduite à moins d'un tiers et consommation totale multipliée par dix en Écosse, mécanisme du haut-fourneau)",
        "url": "https://www.econlib.org/library/YPDBooks/Jevons/jvnCQ.html?chapter_num=9"
      },
      {
        "label": "Wikipédia, Jevons paradox (condition de demande élastique, contre-exemple de l'alimentation, emploi agricole de 40 % en 1900 à moins de 2 % en 2024)",
        "url": "https://en.wikipedia.org/wiki/Jevons_paradox"
      },
      {
        "label": "Satya Nadella sur X, 27 janvier 2025, 5 h 48 UTC : « Jevons paradox strikes again! »",
        "url": "https://x.com/satyanadella/status/1883753899255046301"
      },
      {
        "label": "Tom's Hardware, Nvidia loses $589 billion in market cap, broad stock plunge triggered by DeepSeek AI release, 28 janvier 2025 (589 milliards de dollars de valeur perdus le 27 janvier)",
        "url": "https://www.tomshardware.com/tech-industry/artificial-intelligence/nvidia-loses-usd589-billion-in-market-cap-broad-stock-plunge-triggered-by-deepseek-ai-release"
      },
      {
        "label": "CNBC, Nvidia sheds almost $600 billion in market cap, biggest drop ever, 27 janvier 2025 (action en baisse de 17 % sur la séance)",
        "url": "https://www.cnbc.com/2025/01/27/nvidia-sheds-almost-600-billion-in-market-cap-biggest-drop-ever.html"
      },
      {
        "label": "Epoch AI, LLM inference prices have fallen rapidly but unequally across tasks, 12 mars 2025 (division par 9 à 900 par an selon la tâche)",
        "url": "https://epoch.ai/data-insights/llm-inference-price-trends"
      },
      {
        "label": "a16z et OpenRouter, State of AI: An Empirical 100 Trillion Token Study, 4 décembre 2025 (d'environ 10 000 milliards de tokens par an à plus de 100 000 milliards à la mi-2025, plus de 300 modèles)",
        "url": "https://a16z.com/state-of-ai/"
      }
    ]
  },
  {
    "id": "effet-reine-rouge",
    "status": "live",
    "num": "65",
    "title": "Effet Reine rouge",
    "en": "Red Queen effect",
    "aliases": [
      "Red Queen hypothesis",
      "Red Queen dynamics",
      "Red Queen's race"
    ],
    "aliasesFr": [
      "hypothèse de la Reine rouge",
      "course de la Reine rouge"
    ],
    "jargon": [
      {
        "say": "Red Queen dynamics",
        "means": "une situation où deux camps s'adaptent l'un à l'autre sans arrêt, de sorte que chacun progresse sans prendre d'avance durable"
      },
      {
        "say": "arms race",
        "means": "course aux armements, l'expression voisine et plus militaire, entre attaquants et défenseurs ou entre générateurs et détecteurs"
      },
      {
        "say": "self-play",
        "means": "un système qui s'entraîne en affrontant ses propres versions précédentes, ce qui fabrique une course de la Reine rouge en laboratoire"
      },
      {
        "say": "red teaming",
        "means": "attaquer volontairement un système pour trouver ses failles avant qu'un vrai adversaire ne le fasse"
      }
    ],
    "cat": "ecosysteme",
    "links": [
      "benchmaxxing",
      "evals",
      "prompt-injection",
      "modeles-frontiere"
    ],
    "short": "L'effet Reine rouge décrit une compétition où chaque camp doit progresser sans cesse rien que pour garder sa place, parce que ses adversaires progressent aussi.",
    "image": "Le videur de la salle, c'est le détecteur, et les faussaires de billets jouent les générateurs. Le videur apprend à repérer les faux, les faussaires impriment mieux, et le videur doit réapprendre. Au bout d'un an, les uns comme les autres sont devenus excellents, et la proportion de faux billets à l'entrée n'a presque pas bougé.",
    "imagineForm": "D",
    "imagine": "En septembre, la directrice demande à l'équipe sécurité : « Il repère combien d'images générées, notre nouveau détecteur ? » L'équipe répond fièrement : « 99 % de celles du générateur de juin. »",
    "full": [
      "Le nom vient de De l'autre côté du miroir, de Lewis Carroll (1871), où la Reine rouge explique à Alice que, dans son pays, il faut courir de toutes ses forces pour rester au même endroit. En 1973, le biologiste Leigh Van Valen en a tiré une hypothèse, dans « A new evolutionary law », premier article d'Evolutionary Theory, une revue qu'il venait de fonder.",
      "Van Valen avait remarqué que la probabilité qu'un groupe d'espèces s'éteigne ne dépend pas de son ancienneté et reste à peu près constante sur des millions d'années. Il l'expliquait par une course permanente, où chaque progrès d'une espèce, un prédateur plus rapide ou un parasite plus rusé, dégrade le milieu des autres, qui doivent évoluer à leur tour pour ne pas reculer.",
      "Dans l'IA, l'image sert d'abord à la sécurité. En janvier 2025, Christian Borst, directeur technique de Vectra AI pour l'Europe, le Moyen-Orient et l'Afrique, comparait à la course de la Reine rouge le face-à-face entre attaques et défenses dopées à l'IA, où rester immobile revient à prendre du retard.",
      "La recherche en a fait une méthode. En janvier 2026, Sakana AI et le MIT ont publié Digital Red Queen, où un modèle de langage écrit des programmes guerriers pour Core War, un jeu de programmation de 1984, et où chaque nouveau guerrier doit battre tous les précédents. Les gagnants deviennent de plus en plus polyvalents face à des guerriers écrits par des humains, qu'ils n'ont jamais affrontés, et les auteurs y voient un terrain d'essai pour la cybersécurité et le red teaming.",
      "En juin 2026, la Red Queen Gödel Machine a appliqué la même idée à l'évaluation, en faisant évoluer l'évaluateur en même temps que l'agent qui s'améliore, au lieu de le juger sur une grille figée. On peut y lire une parade au benchmaxxing, puisqu'un test qui ne bouge plus finit par récompenser l'entraînement au test.",
      "L'image de Carroll a sa limite, car les deux camps progressent pour de bon. Dans cette course, un détecteur ou un filtre de sécurité qu'on cesse de mettre à jour recule sans avoir changé d'une ligne, parce que ce qu'il doit arrêter ne cesse de s'améliorer."
    ],
    "office": [
      {
        "who": "q",
        "text": "On a acheté un détecteur de textes générés l'an dernier, le problème est réglé ?"
      },
      {
        "who": "a",
        "text": "Il était réglé contre les modèles de l'an dernier ; demande à l'éditeur à quel rythme il se met à jour, et teste-le toi-même sur des textes écrits avec les derniers modèles."
      }
    ],
    "avoid": "« La Reine rouge, c'est quand personne n'avance. » Tout le monde avance, et vite, mais personne ne prend d'avance durable ; chez Van Valen, ce qui reste constant, c'est le risque d'extinction, pas les espèces.",
    "video": null,
    "sources": [
      {
        "label": "Wikipédia, Red Queen hypothesis (Van Valen, A new evolutionary law, Evolutionary Theory, 1973 ; probabilité d'extinction constante ; réplique de la Reine rouge dans Through the Looking-Glass)",
        "url": "https://en.wikipedia.org/wiki/Red_Queen_hypothesis"
      },
      {
        "label": "University of Chicago News, Leigh Van Valen, evolutionary theorist and paleobiology pioneer, 1935-2010 (fondateur des revues Evolutionary Monographs et Evolutionary Theory dans les années 1970)",
        "url": "https://news.uchicago.edu/story/leigh-van-valen-evolutionary-theorist-and-paleobiology-pioneer-1935-2010"
      },
      {
        "label": "TechInformed, 2025 Informed: Cybersecurity and AI, 16 janvier 2025 (Christian Borst, Vectra AI : « Like the Red Queen's race in Through the Looking-Glass »)",
        "url": "https://techinformed.com/2025-informed-cybersecurity-and-ai/"
      },
      {
        "label": "Kumar et al. (Sakana AI, MIT), Digital Red Queen: Adversarial Program Evolution in Core War with LLMs, 6 janvier 2026 (chaque guerrier doit battre tous les précédents, guerriers de plus en plus généraux face à des guerriers humains tenus à l'écart, cybersécurité)",
        "url": "https://arxiv.org/abs/2601.03335"
      },
      {
        "label": "Sakana AI, Digital Red Queen, 8 janvier 2026 (red teaming automatisé, environnement isolé)",
        "url": "https://sakana.ai/drq/"
      },
      {
        "label": "Iacob et al., The Red Queen Gödel Machine: Co-Evolving Agents and Their Evaluators, 24 juin 2026",
        "url": "https://arxiv.org/abs/2606.26294"
      }
    ]
  },
  {
    "id": "llm",
    "status": "live",
    "num": "66",
    "title": "LLM (grand modèle de langage)",
    "en": "Large language model",
    "aliases": [
      "LLM",
      "LLMs",
      "large language models",
      "foundation model"
    ],
    "aliasesFr": [
      "grand modèle de langage",
      "modèle de langage",
      "modèle de fondation"
    ],
    "jargon": [
      {
        "say": "LLM",
        "means": "large language model, grand modèle de langage ; le mot désigne le modèle lui-même, le fichier de paramètres, et pas l'application qui le fait tourner"
      },
      {
        "say": "foundation model",
        "means": "modèle de fondation, un modèle généraliste sur lequel on construit ensuite des produits, des assistants ou des versions spécialisées"
      },
      {
        "say": "SLM",
        "means": "small language model, le petit modèle de langage, assez léger pour tourner sur un ordinateur portable ou un téléphone"
      }
    ],
    "cat": "fondations",
    "links": [
      "mythe-chatgpt-c-est-le-modele",
      "parametres",
      "tailles-de-modele",
      "slm",
      "few-shot",
      "pre-entrainement"
    ],
    "short": "Un LLM, ou grand modèle de langage, est un programme entraîné sur d'immenses quantités de texte à prédire la suite d'un texte, avec des milliards de paramètres ; c'est le moteur des chatbots et non le chatbot lui-même.",
    "image": "Un LLM, au studio, correspond au groupe au complet avec sa console réglée, prêt à enchaîner sur n'importe quel morceau qu'on lui lance. Le chatbot ressemble plutôt à la salle où il se produit, avec sa billetterie et ses consignes, et le même groupe peut jouer ailleurs, dans un correcteur de texte ou un outil de code.",
    "imagineForm": "B",
    "imagine": "Sur ton téléphone, tape « Demain je » puis appuie dix fois de suite sur le mot suggéré au milieu du clavier, et regarde la phrase tourner en rond au bout de quelques mots. Donne ensuite la même amorce à un chatbot en lui demandant seulement de la continuer, et pose les deux phrases côte à côte.",
    "full": [
      "Un modèle de langage fait une seule chose, prédire le token qui vient ensuite, et l'adjectif « grand » renvoie à la quantité de paramètres et de texte qu'on a mise dans cet apprentissage. Presque tous les LLM actuels reposent sur la même architecture, le transformer, qui laisse chaque token tenir compte de tous ceux qui le précèdent, et ce sont eux qui font tourner ChatGPT, Claude, Gemini, Grok ou DeepSeek.",
      "Le mot « grand » n'a pas de seuil officiel, et Artificial Analysis classe parmi les grands les modèles ouverts de plus de 150 milliards de paramètres. Au sommet, les chiffres ne sont plus toujours publiés ; Claude Mythos, le modèle le plus puissant d'Anthropic, compterait environ 8 000 milliards de paramètres selon des estimations rapportées par le Financial Times en août 2026. La frontière bouge avec les années, et un modèle jugé grand en 2019 passerait aujourd'hui pour un petit.",
      "Le LLM n'est qu'une pièce du produit. L'application qui l'entoure glisse ses propres instructions devant ton message, conserve la conversation, lance des recherches web et recopie leurs résultats dans le contexte, puis choisit parfois entre plusieurs modèles. Un même LLM se comporte donc autrement selon l'application qui le fait tourner, et une même application change souvent de LLM sans changer de nom."
    ],
    "office": [
      {
        "who": "q",
        "text": "Il nous faudrait notre propre LLM, non ?"
      },
      {
        "who": "a",
        "text": "Presque jamais ; la plupart des usages tiennent avec un modèle existant, de bonnes consignes et vos documents qu'on lui fait lire quand il répond, pour une fraction du prix d'un entraînement."
      }
    ],
    "avoid": "« Le LLM a cherché sur Internet. » Le modèle seul ne sait que prédire du texte ; c'est l'application autour qui lance la recherche, puis lui fait lire les pages trouvées avant qu'il réponde.",
    "video": null,
    "sources": [
      {
        "label": "Wikipédia, Large language model (définition, transformer, chatbots qui reposent sur des LLM, « large » sans seuil défini, estimation d'environ 8 000 milliards de paramètres pour Claude Mythos rapportée par le Financial Times, août 2026), consulté le 2 octobre 2026",
        "url": "https://en.wikipedia.org/wiki/Large_language_model"
      },
      {
        "label": "Artificial Analysis, Small Open Source Models (catégories par taille : tiny jusqu'à 4B, small de 4B à 40B, medium de 40B à 150B, large au-delà de 150B), consulté le 2 octobre 2026",
        "url": "https://artificialanalysis.ai/models/open-source/small"
      }
    ]
  },
  {
    "id": "slm",
    "status": "live",
    "num": "67",
    "title": "SLM (petit modèle de langage)",
    "en": "Small language model",
    "aliases": [
      "SLM",
      "small language models",
      "on-device model",
      "edge model",
      "tiny model"
    ],
    "aliasesFr": [
      "petit modèle de langage",
      "modèle embarqué",
      "modèle local"
    ],
    "jargon": [
      {
        "say": "on-device",
        "means": "le modèle tourne sur l'appareil lui-même, téléphone ou ordinateur, sans envoyer la question à un serveur"
      },
      {
        "say": "E2B, E4B",
        "means": "chez Gemma 4, E veut dire effective : 2,3 et 4,5 milliards de paramètres qui calculent vraiment, plus de grandes tables qu'on se contente de consulter, soit 5,1 et 8 milliards en tout"
      }
    ],
    "cat": "fondations",
    "links": [
      "llm",
      "tailles-de-modele",
      "quantization",
      "open-weights",
      "cout-d-une-requete",
      "distillation"
    ],
    "solutions": [
      {
        "name": "Ollama",
        "kind": "outil pour tester en local",
        "url": "https://ollama.com"
      },
      {
        "name": "LM Studio",
        "kind": "outil pour tester en local",
        "url": "https://lmstudio.ai"
      },
      {
        "name": "llama.cpp",
        "kind": "bibliothèque open source",
        "url": "https://github.com/ggml-org/llama.cpp"
      },
      {
        "name": "MLX LM (Apple)",
        "kind": "bibliothèque open source",
        "url": "https://github.com/ml-explore/mlx-lm"
      },
      {
        "name": "LiteRT (Google)",
        "kind": "kit pour mobile",
        "url": "https://ai.google.dev/edge/litert"
      },
      {
        "name": "Foundation Models (Apple)",
        "kind": "kit pour mobile",
        "url": "https://developer.apple.com/documentation/foundationmodels"
      }
    ],
    "short": "Un SLM, ou petit modèle de langage, est un modèle de langage de quelques centaines de millions à quelques milliards de paramètres, assez léger pour tourner sur un ordinateur portable ou un téléphone, sans serveur.",
    "image": "Pour jouer au bar du coin, personne n'emmène l'orchestre et ses quarante pupitres. Le SLM, c'est le trio acoustique qui tient dans une camionnette, se branche sur la prise du fond et commence tout de suite ; il connaît moins de morceaux, mais il joue là où le grand groupe ne pourrait même pas décharger son matériel.",
    "imagineForm": "A",
    "imagine": "Le 14 février 2019, OpenAI annonce GPT-2 et refuse d'abord d'en publier la version complète, par crainte d'usages malveillants ; elle compte 1,5 milliard de paramètres. Sept ans plus tard, Gemma 4 E2B en compte 5,1 milliards, plus de trois fois autant, et Google le présente comme un modèle qui tourne hors ligne sur un téléphone.",
    "full": [
      "Personne n'a fixé la limite du « petit ». Artificial Analysis appelle small les modèles ouverts de 4 à 40 milliards de paramètres et tiny ceux qui restent sous les 4 milliards, alors que, dans l'usage courant, un SLM est surtout un modèle qui tient sur une machine ordinaire. Il a la même architecture qu'un grand modèle, avec moins de paramètres, et on le compresse souvent par quantization pour gagner encore de la place.",
      "Les exemples récents viennent des fabricants de téléphones et des grands labos. Apple fait tourner sur ses appareils un modèle d'environ 3 milliards de paramètres, stocké sur 2 bits par paramètre, et l'ouvre aux développeurs depuis juin 2025. Google a publié le 2 avril 2026 Gemma 4 E2B et E4B, conçus pour fonctionner sans réseau sur un téléphone, un Raspberry Pi ou une carte Jetson.",
      "Un SLM connaît moins de choses qu'un grand modèle, puisqu'il a moins de paramètres pour les retenir, et il se trompe plus souvent sur une question pointue. Il répond en revanche vite, ne coûte rien à chaque requête, marche dans le métro et garde les données sur l'appareil, ce qui en fait le bon choix pour résumer, classer, extraire ou reformuler, souvent après un fine-tuning sur la tâche visée."
    ],
    "table": {
      "caption": "Quelques petits modèles ouverts récents",
      "asOf": "2 octobre 2026",
      "columns": [
        "Modèle",
        "Éditeur",
        "Paramètres",
        "Contexte (tokens)",
        "Licence"
      ],
      "rows": [
        [
          "Qwen3.5-0.8B",
          "Alibaba (Qwen)",
          "0,8 milliard",
          "262 144",
          "Apache 2.0"
        ],
        [
          "Qwen3.5-2B",
          "Alibaba (Qwen)",
          "2 milliards",
          "262 144",
          "Apache 2.0"
        ],
        [
          "Gemma 4 E2B",
          "Google",
          "2,3 milliards effectifs (5,1 en tout)",
          "128 000",
          "Apache 2.0"
        ],
        [
          "SmolLM3-3B",
          "Hugging Face",
          "3 milliards",
          "128 000",
          "Apache 2.0"
        ],
        [
          "Phi-4-mini-instruct",
          "Microsoft",
          "3,8 milliards",
          "128 000",
          "MIT"
        ],
        [
          "Gemma 4 E4B",
          "Google",
          "4,5 milliards effectifs (8 en tout)",
          "128 000",
          "Apache 2.0"
        ]
      ],
      "note": "SmolLM3 est entraîné sur 64 000 tokens de contexte et étendu à 128 000 ; le modèle embarqué d'Apple, environ 3 milliards de paramètres, n'est pas téléchargeable et ne figure pas au tableau."
    },
    "office": [
      {
        "who": "q",
        "text": "On peut faire tourner un modèle sur nos portables pour que rien ne sorte de la boîte ?"
      },
      {
        "who": "a",
        "text": "Oui pour résumer, classer ou reformuler des documents internes avec un modèle de 2 à 4 milliards de paramètres ; pour une analyse longue et pointue, un grand modèle hébergé reste en général devant."
      }
    ],
    "avoid": "« Un SLM, c'est un grand modèle qu'on a rogné. » C'est parfois le cas, quand on le tire d'un grand par distillation ou qu'on le compresse par quantization, mais beaucoup sont entraînés de zéro, et sur énormément de texte, puisque SmolLM3 et ses 3 milliards de paramètres ont lu 11 200 milliards de tokens.",
    "video": null,
    "sources": [
      {
        "label": "Artificial Analysis, Small Open Source Models (tiny jusqu'à 4B, small de 4B à 40B), consulté le 2 octobre 2026",
        "url": "https://artificialanalysis.ai/models/open-source/small"
      },
      {
        "label": "Wikipédia, Small language model (pas de seuil fixe, même architecture qu'un LLM avec moins de paramètres, quantization et distillation), consulté le 2 octobre 2026",
        "url": "https://en.wikipedia.org/wiki/Small_language_model"
      },
      {
        "label": "Wikipédia, GPT-2 (annoncé le 14 février 2019, publication complète d'abord refusée par crainte d'usages malveillants, version complète de 1,5 milliard de paramètres publiée en novembre 2019)",
        "url": "https://en.wikipedia.org/wiki/GPT-2"
      },
      {
        "label": "Google, Gemma 4: Byte for byte, the most capable open models, 2 avril 2026 (E2B et E4B hors ligne sur téléphone, Raspberry Pi et Jetson Orin Nano, Apache 2.0)",
        "url": "https://blog.google/innovation-and-ai/technology/developers-tools/gemma-4/"
      },
      {
        "label": "Google, fiche de gemma-4-E2B-it sur Hugging Face (2,3B effectifs, 5,1B avec les embeddings ; E4B : 4,5B effectifs, 8B en tout ; 128K de contexte). Calcul de l'Imagine : 5,1 / 1,5 = 3,4",
        "url": "https://huggingface.co/google/gemma-4-E2B-it"
      },
      {
        "label": "Apple Machine Learning Research, mise à jour 2025 des modèles de fondation d'Apple Intelligence, 9 juin 2025, révisée le 17 juillet 2025 (modèle embarqué d'environ 3 milliards de paramètres, 2 bits par paramètre, framework Foundation Models)",
        "url": "https://machinelearning.apple.com/research/apple-foundation-models-2025-updates"
      },
      {
        "label": "Qwen, fiches de Qwen3.5-0.8B et Qwen3.5-2B sur Hugging Face (0,8B et 2B paramètres, 262 144 tokens de contexte, Apache 2.0)",
        "url": "https://huggingface.co/Qwen/Qwen3.5-2B"
      },
      {
        "label": "Hugging Face, fiche de SmolLM3-3B (3B paramètres, pré-entraîné sur 11,2T tokens, 64K de contexte entraîné et 128K avec YaRN, Apache 2.0)",
        "url": "https://huggingface.co/HuggingFaceTB/SmolLM3-3B"
      },
      {
        "label": "Microsoft, fiche de Phi-4-mini-instruct sur Hugging Face (3,8B paramètres, 128K de contexte, licence MIT)",
        "url": "https://huggingface.co/microsoft/Phi-4-mini-instruct"
      }
    ]
  },
  {
    "id": "few-shot",
    "status": "live",
    "num": "68",
    "title": "Few-shot (apprentissage en contexte)",
    "en": "Few-shot prompting",
    "aliases": [
      "few-shot",
      "few-shot learning",
      "in-context learning",
      "ICL",
      "zero-shot",
      "one-shot",
      "multishot prompting"
    ],
    "aliasesFr": [
      "apprentissage en contexte",
      "apprentissage par l'exemple",
      "exemples dans le prompt"
    ],
    "jargon": [
      {
        "say": "zero-shot",
        "means": "on décrit la tâche sans donner un seul exemple"
      },
      {
        "say": "one-shot, few-shot",
        "means": "on donne un exemple, ou quelques-uns, de ce qu'on attend, avant la vraie demande"
      },
      {
        "say": "in-context learning",
        "means": "le nom savant du phénomène : le modèle suit un motif présent dans son contexte sans qu'aucun de ses paramètres ne bouge"
      },
      {
        "say": "<example>",
        "means": "la balise dans laquelle Anthropic conseille de ranger chaque exemple, pour que le modèle ne les confonde pas avec les consignes"
      }
    ],
    "cat": "methode",
    "links": [
      "llm",
      "fine-tuning",
      "context-engineering",
      "system-prompt",
      "modeles-de-raisonnement"
    ],
    "short": "Le few-shot consiste à glisser quelques exemples de la tâche dans le prompt, avant la vraie demande, pour que le modèle reproduise leur format et leur logique.",
    "image": "Joue deux mesures au groupe avant la prise, et il enchaîne dans le même tempo, la même tonalité, le même genre, sans qu'on ait eu à lui expliquer quoi que ce soit. Personne n'a touché à la console ; à la session suivante, il faudra rejouer les deux mesures.",
    "imagineForm": "E",
    "imagine": "Tu demandes au modèle un nom pour la nouvelle salle de réunion, et il te rend cinq propositions en gras, chacune avec sa justification. Tu reposes la question en commençant par « Salle 1 : Lovelace, Salle 2 : Hopper, Salle 3 : Curie, Salle 4 : », et il te répond « Franklin », sans un mot de plus.",
    "full": [
      "Le terme vient de l'article de GPT-3, publié par OpenAI en mai 2020 sous le titre Language Models are Few-Shot Learners. Une de ses figures montre la tâche « Translate English to French », suivie de « sea otter => loutre de mer », « peppermint => menthe poivrée », puis « cheese => », et le modèle complète la ligne. Aucun paramètre ne bouge pendant ce temps, ce qui distingue le few-shot du fine-tuning ; tout se joue dans le contexte, et tout disparaît avec lui.",
      "Les exemples enseignent surtout une forme. En 2022, une équipe de l'université de Washington et de Meta a remplacé au hasard les bonnes réponses des exemples par des réponses fausses, et les modèles ne perdaient presque rien sur des tâches de classement. Ce qui comptait, c'était le format, la liste des réponses possibles et le genre de texte montré, bien plus que la justesse de chaque exemple.",
      "Les assistants d'aujourd'hui suivent une consigne sans exemple, et le few-shot sert surtout à fixer une mise en forme, un registre ou une structure. Anthropic conseille trois à cinq exemples variés, rangés dans des balises. Les modèles de raisonnement demandent plus de prudence, puisque l'équipe de DeepSeek a constaté que des exemples dégradaient toujours les résultats de DeepSeek-R1 et recommande de décrire le problème et le format attendu, sans exemple."
    ],
    "then": "Dans l'article de 2020, GPT-3 n'avait pas été entraîné à suivre des consignes, et les exemples étaient le seul moyen de lui faire comprendre la tâche ; on en mettait de 10 à 100, autant qu'en tenaient ses 2 048 tokens de contexte. Les guides de 2026 partent d'une consigne claire et ajoutent quelques exemples seulement quand le format ou le ton résiste.",
    "office": [
      {
        "who": "q",
        "text": "Je lui mets combien d'exemples pour qu'il rédige nos comptes rendus comme on aime ?"
      },
      {
        "who": "a",
        "text": "Trois à cinq, assez différents entre eux pour qu'il n'en copie pas un détail par hasard, comme la longueur ou le prénom du client."
      }
    ],
    "avoid": "« Avec trois exemples, il a appris notre métier. » Rien n'a changé dans ses paramètres ; les exemples doivent revenir à chaque requête, et tu les paies en tokens à chaque fois.",
    "video": null,
    "sources": [
      {
        "label": "Brown et al. (OpenAI), Language Models are Few-Shot Learners, 28 mai 2020 (figure 2.1 : zero-shot, one-shot et few-shot sur la traduction anglais-français, sea otter => loutre de mer ; K de 10 à 100 exemples dans un contexte de 2 048 tokens ; aucune mise à jour des paramètres)",
        "url": "https://arxiv.org/abs/2005.14165"
      },
      {
        "label": "Min et al. (université de Washington, Meta), Rethinking the Role of Demonstrations: What Makes In-Context Learning Work?, février 2022 (des étiquettes tirées au hasard dans les exemples font à peine baisser les scores ; comptent le format, l'espace des réponses et la distribution des textes)",
        "url": "https://arxiv.org/abs/2202.12837"
      },
      {
        "label": "Anthropic, Prompting best practices, section « Use examples effectively » (exemples pertinents, variés, dans des balises <example> ; 3 à 5 exemples), consulté le 2 octobre 2026",
        "url": "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices"
      },
      {
        "label": "DeepSeek-AI, DeepSeek-R1, janvier 2025 (« Few-shot prompting consistently degrades its performance », recommandation du zero-shot avec description du problème et du format de sortie)",
        "url": "https://arxiv.org/abs/2501.12948"
      }
    ]
  },
  {
    "id": "pre-entrainement",
    "status": "live",
    "num": "69",
    "title": "Pré-entraînement",
    "en": "Pre-training",
    "aliases": [
      "pretraining",
      "pre-train",
      "base model",
      "pretrained model",
      "mid-training"
    ],
    "aliasesFr": [
      "préentraînement",
      "modèle de base",
      "modèle pré-entraîné"
    ],
    "jargon": [
      {
        "say": "base model",
        "means": "le modèle de base, tel qu'il sort du pré-entraînement : il continue les textes mais ne suit pas encore les consignes"
      },
      {
        "say": "data mix",
        "means": "les proportions de web, de code, de maths ou de livres qu'on fait lire au modèle, et qu'on change en cours de route"
      },
      {
        "say": "Common Crawl",
        "means": "l'archive publique du web que presque tous les labos utilisent comme matière première, avant de la filtrer"
      },
      {
        "say": "mid-training",
        "means": "une étape intermédiaire, juste après le pré-entraînement, qui fait lire au modèle de longs documents ou des raisonnements pour étendre son contexte et ses capacités"
      }
    ],
    "cat": "entrainement",
    "links": [
      "entrainement",
      "post-entrainement",
      "prediction-du-mot-suivant",
      "date-de-coupure",
      "compute",
      "llm"
    ],
    "short": "Le pré-entraînement est la première et la plus longue phase d'entraînement, où le modèle apprend à prédire le token suivant sur des milliers de milliards de tokens.",
    "image": "Des mois durant, l'ingé son passe au groupe tout ce que la discothèque contient, trié et rangé, en lui demandant chaque fois de deviner la note suivante. Le groupe ressort de ces séances capable de prolonger n'importe quel morceau, et toujours incapable de comprendre qu'on lui passe une commande.",
    "imagineForm": "D",
    "imagine": "« Écrivez une courte histoire sur une grenouille qui voyage dans le temps jusqu'à la Grèce antique en français », demandent en 2022 des chercheurs d'OpenAI à GPT-3 dans sa version de base. Il répond : « Écrivez une histoire au sujet d'un enfant qui voudrait tout savoir sur les jeux des dieux et qui se retrouve dans l'une de leurs histoires. Écrivez une histoire sur un jeune homme qui a une aventure dans une époque lointaine avec une fille de l'époque. »",
    "full": [
      "Une bonne part du travail se fait avant la première heure de calcul, dans le tri du texte. Pour FineWeb, publié en juin 2024, Hugging Face a tiré 15 000 milliards de tokens de 96 instantanés de Common Crawl, en dédoublonnant et en filtrant page par page. Sa version FineWeb-Edu ne garde que 1 300 milliards de tokens de pages éducatives, et les modèles qui la lisent font nettement mieux aux tests de connaissances et de raisonnement.",
      "Le programme d'écoute change aussi en cours de route. SmolLM3, publié par Hugging Face en juillet 2025, a lu 11 200 milliards de tokens en trois étapes, avec de plus en plus de code et de maths vers la fin. Une étape intermédiaire a suivi, avec 100 milliards de tokens pour allonger son contexte et 35 milliards pour le préparer au raisonnement. Le modèle de base qui en sort sait continuer une démonstration, sans savoir encore qu'on attend de lui une réponse.",
      "La matière première a une limite. En 2024, Epoch AI estimait le stock utile du web indexé à environ 400 000 milliards de tokens et prévoyait que les plus gros modèles l'auraient entièrement lu vers 2028, avec une fourchette de 2026 à 2032. Les labos complètent déjà avec des textes synthétiques, écrits par d'autres modèles, et avec des données qu'ils achètent ou produisent."
    ],
    "then": "En juillet 2024, la plus grande version de SmolLM avait lu environ 590 tokens par paramètre. Un an plus tard, SmolLM3 en a lu six fois plus, environ 3 600 par paramètre, parce qu'un petit modèle qui lit davantage rattrape une partie de son écart avec les gros.",
    "office": [
      {
        "who": "q",
        "text": "On peut prendre la version de base du modèle, puisqu'elle est moins bridée ?"
      },
      {
        "who": "a",
        "text": "Pour un modèle ouvert, souvent oui, mais elle continue ton texte au lieu de répondre ; il faut lui écrire le début du document que tu veux voir finir, ou partir de la version instruct."
      }
    ],
    "avoid": "« Il a lu tout Internet. » Même Common Crawl, la plus grande archive publique du web, ne contient qu'environ 130 000 milliards de tokens selon Epoch AI, et les corpus d'entraînement n'en gardent qu'une fraction, triée et dédoublonnée.",
    "video": null,
    "sources": [
      {
        "label": "Ouyang et al. (OpenAI), Training language models to follow instructions with human feedback, mars 2022, figure 8 (consigne en français sur la grenouille et la Grèce antique ; GPT-3 175B sans préfixe répond par d'autres consignes « Écrivez une histoire... »)",
        "url": "https://arxiv.org/abs/2203.02155"
      },
      {
        "label": "Penedo et al. (Hugging Face), The FineWeb Datasets, juin 2024 (15T tokens tirés de 96 instantanés de Common Crawl ; FineWeb-Edu, 1,3T tokens, meilleur sur MMLU et ARC)",
        "url": "https://arxiv.org/abs/2406.17557"
      },
      {
        "label": "Hugging Face, SmolLM3: smol, multilingual, long-context reasoner, 8 juillet 2025 (11,2T tokens en trois étapes, part croissante de code et de maths, mid-training de 100B tokens pour le contexte long et 35B pour le raisonnement)",
        "url": "https://huggingface.co/blog/smollm3"
      },
      {
        "label": "Hugging Face, SmolLM - blazingly fast and remarkably powerful, 16 juillet 2024 (SmolLM-1.7B entraîné sur 1T tokens). Calcul du 2024 vs 2026 : 10^12 / 1,7 x 10^9 = 588 tokens par paramètre ; 11,2 x 10^12 / 3,08 x 10^9 = 3 642",
        "url": "https://huggingface.co/blog/smollm"
      },
      {
        "label": "Villalobos et al. (Epoch AI), Will we run out of data?, version du 4 juin 2024 (stock effectif du web indexé d'environ 4e14 tokens, pleinement utilisé vers 2028 en médiane, entre 2026 et 2032 ; tableau 1 : Common Crawl 130T)",
        "url": "https://arxiv.org/abs/2211.04325"
      }
    ]
  },
  {
    "id": "post-entrainement",
    "status": "live",
    "num": "70",
    "title": "Post-entraînement",
    "en": "Post-training",
    "aliases": [
      "post-training",
      "posttraining",
      "instruction tuning",
      "alignment",
      "RLVR"
    ],
    "aliasesFr": [
      "post-training",
      "réglage en assistant",
      "alignement"
    ],
    "jargon": [
      {
        "say": "-it, -Instruct",
        "means": "le suffixe des modèles passés par le post-entraînement (Phi-4-mini-instruct, par exemple), par opposition à la version de base, publiée parfois à côté"
      },
      {
        "say": "SFT, puis DPO, puis RLVR",
        "means": "l'ordre classique des étapes : des exemples de bonnes réponses, puis des paires de réponses préférée et rejetée, puis des récompenses quand un résultat vérifiable est juste"
      },
      {
        "say": "recipe",
        "means": "la recette du post-entraînement, c'est-à-dire les données, l'ordre des étapes et leurs réglages ; la plupart des labos la gardent pour eux"
      }
    ],
    "cat": "entrainement",
    "links": [
      "entrainement",
      "pre-entrainement",
      "rlhf",
      "fine-tuning",
      "modeles-de-raisonnement",
      "flagornerie"
    ],
    "short": "Le post-entraînement regroupe les étapes qui transforment un modèle de base en assistant, et c'est là que se fixent son ton, ses refus et sa façon de raisonner.",
    "image": "Une fois que le groupe sait tout jouer, l'ingé son change de méthode. Il ne lui fait plus écouter de nouveaux morceaux, il lui apprend à écouter la commande, à finir proprement et à refuser certaines demandes, puis le public et ses jurés prennent le relais pour polir le reste.",
    "imagineForm": "B",
    "imagine": "Soumets « Faut-il du sucre dans une pâte à crêpes ? » à deux chatbots de labos différents, puis compare la longueur des réponses, les titres en gras, le nombre de précautions et la façon dont ils terminent.",
    "full": [
      "Le post-entraînement enchaîne en général trois familles d'étapes. Le fine-tuning supervisé montre au modèle des centaines de milliers de bonnes réponses. L'apprentissage des préférences, par RLHF ou par DPO, le pousse ensuite vers les réponses que des notateurs choisissent, et le renforcement à récompense vérifiable (RLVR) le note sur des problèmes de maths ou de code dont on peut contrôler la solution. L'institut Ai2 a publié en novembre 2024 la recette complète de Tülu 3, données et code compris, dans cet ordre exact.",
      "Ces étapes lisent très peu de texte. Le fine-tuning supervisé de Tülu 3 tient en un peu moins d'un million d'exemples, quand un pré-entraînement se compte en milliers de milliards de tokens. C'est pourtant ce peu qui décide du ton, de la longueur des réponses et de ce que le modèle refuse, et deux labos partis de données comparables en sortent des assistants aux caractères très différents.",
      "Le post-entraînement apprend à répondre, pas à savoir. En 2022, à la question « Why is it important to eat socks after meditating? », le GPT-3 d'origine, sans réglage, enchaînait un faux dialogue sur la saveur des chaussettes, alors qu'InstructGPT, son élève réglé en assistant, expliquait avec sérieux qu'il existait plusieurs théories. Le même réglage qui rend un modèle serviable peut aussi le rendre complaisant, ce que la fiche Flagornerie raconte."
    ],
    "office": [
      {
        "who": "q",
        "text": "Si on prend la version instruct d'un modèle ouvert, il refusera les mêmes choses que ChatGPT ?"
      },
      {
        "who": "a",
        "text": "Rien ne le garantit, puisque chaque labo règle ses refus au post-entraînement avec ses propres exemples ; teste-le sur tes cas sensibles avant de le mettre devant des clients."
      }
    ],
    "avoid": "« Le post-entraînement lui apprend de nouvelles connaissances. » Presque tout ce que le modèle sait vient du pré-entraînement ; les étapes suivantes changent surtout la manière de le présenter, et la confiance qu'il affiche en le disant.",
    "video": null,
    "sources": [
      {
        "label": "Lambert et al. (Ai2, université de Washington), Tulu 3: Pushing Frontiers in Open Language Model Post-Training, 22 novembre 2024, révisé en avril 2025 (SFT, puis DPO, puis RLVR ; tableau 7 : 939 344 prompts pour le SFT ; données, code et recette publiés)",
        "url": "https://arxiv.org/abs/2411.15124"
      },
      {
        "label": "Ai2, jeu de données tulu-3-sft-mixture sur Hugging Face (939 343 lignes, fichiers d'environ 1,4 Go), consulté le 2 octobre 2026",
        "url": "https://huggingface.co/datasets/allenai/tulu-3-sft-mixture"
      },
      {
        "label": "Ouyang et al. (OpenAI), Training language models to follow instructions with human feedback, mars 2022, figure 9 (« Why is it important to eat socks after meditating? », réponses de GPT-3 175B et d'InstructGPT 175B)",
        "url": "https://arxiv.org/abs/2203.02155"
      },
      {
        "label": "Microsoft, fiche de Phi-4-mini-instruct sur Hugging Face (post-entraînement par fine-tuning supervisé puis optimisation directe des préférences)",
        "url": "https://huggingface.co/microsoft/Phi-4-mini-instruct"
      }
    ]
  },
  {
    "id": "hugging-face",
    "status": "live",
    "num": "71",
    "title": "Hugging Face",
    "en": "Hugging Face",
    "aliases": [
      "HF",
      "Hugging Face Hub",
      "the Hub",
      "huggingface.co",
      "HF Hub"
    ],
    "aliasesFr": [
      "le Hub"
    ],
    "jargon": [
      {
        "say": "model card",
        "means": "la fiche d'un modèle sur le Hub : à quoi il sert, comment il a été entraîné, sa licence et ses limites"
      },
      {
        "say": "Spaces",
        "means": "les petites applications de démonstration hébergées sur Hugging Face, où l'on essaie un modèle dans le navigateur"
      },
      {
        "say": "safetensors, GGUF",
        "means": "deux formats de fichiers de poids ; safetensors ne contient que des nombres, GGUF sert à faire tourner des modèles, souvent quantifiés, sur sa propre machine"
      },
      {
        "say": "Transformers",
        "means": "la bibliothèque open source de Hugging Face pour télécharger, entraîner et faire tourner des modèles en quelques lignes"
      }
    ],
    "cat": "ecosysteme",
    "links": [
      "open-weights",
      "tailles-de-modele",
      "quantization",
      "fine-tuning"
    ],
    "short": "Hugging Face est une plateforme en ligne où l'on publie et télécharge des modèles d'IA, des jeux de données et des applications de démonstration ; c'est là que la plupart des modèles open weights sont mis à disposition.",
    "image": "Hugging Face tient le rôle de la grande bibliothèque de presets du quartier, où les maisons de disques comme les amateurs déposent le réglage de leur console, avec sa licence et sa fiche technique. N'importe quel studio vient l'y emprunter, le retoucher et redéposer sa version à côté de l'original.",
    "imagineForm": "A",
    "imagine": "Le 2 octobre 2026, la page des modèles de Hugging Face en affiche 3 115 874. Si tu en ouvrais un par minute, huit heures par jour et week-ends compris, tu finirais le tour en juillet 2044, après avoir croisé plus de 26 000 modèles dont le nom contient « qwen2.5-7b », sans compter tous ceux publiés pendant ces dix-sept ans.",
    "full": [
      "La société a été fondée en 2016 à New York par trois entrepreneurs français, Clément Delangue, Julien Chaumond et Thomas Wolf, pour faire une application de chatbot destinée aux adolescents, et elle doit son nom à l'émoji du visage qui fait un câlin. Elle s'est ensuite recentrée sur les outils, avec Transformers, sa bibliothèque open source, puis le Hub, devenu le lieu où l'on publie les modèles.",
      "On y trouve des modèles, plus d'un million de jeux de données et des Spaces, des applications de démo. Chaque modèle a sa fiche, sa licence et ses fichiers, et un arbre qui recense ses descendants ; celui de Qwen2.5-7B-Instruct, un modèle d'Alibaba, liste plus de 3 000 versions fine-tunées et plus de 400 versions quantifiées. La plupart des labos publient leurs poids ouverts sur le Hub, et des outils comme llama.cpp, Ollama ou LM Studio vont les y chercher directement.",
      "Le 3 septembre 2026, Nvidia a annoncé un accord, signé la veille, pour racheter Hugging Face 12,93 milliards de dollars, dont environ 11,9 milliards pour les actionnaires et un programme d'actions pouvant aller jusqu'à environ 1 milliard pour retenir les salariés. D'après le formulaire déposé par Nvidia auprès de la SEC, le gendarme boursier américain, la clôture est attendue au premier semestre 2027, sous réserve du feu vert des régulateurs. Nvidia s'y engage à garder la plateforme ouverte, à laisser chacun y publier et télécharger les modèles de son choix et à continuer d'y soutenir les autres fabricants de puces."
    ],
    "office": [
      {
        "who": "q",
        "text": "On peut prendre n'importe quel modèle de Hugging Face pour un projet client ?"
      },
      {
        "who": "a",
        "text": "Lis d'abord la licence dans sa fiche, car Gemma 4 est sous Apache 2.0, qui autorise l'usage commercial, alors que Tiny Aya, de Cohere, est sous CC BY-NC, qui l'interdit."
      }
    ],
    "avoid": "« C'est sur Hugging Face, donc c'est vérifié. » N'importe qui peut y publier, et Hugging Face prévient lui-même qu'un fichier de poids au vieux format pickle peut exécuter du code au chargement ; préfère les fichiers safetensors et les comptes officiels des labos.",
    "video": null,
    "sources": [
      {
        "label": "Hugging Face, page Models : compteur de 3 115 874 modèles ; filtre GGUF : 208 289 modèles ; recherche « qwen2.5-7b » : 26 292 modèles, relevés le 2 octobre 2026. Calcul de l'Imagine : 3 115 874 minutes / 480 minutes par jour = 6 492 jours, soit environ 17,8 ans à partir du 2 octobre 2026, jusqu'au 11 juillet 2044",
        "url": "https://huggingface.co/models"
      },
      {
        "label": "Hugging Face, page Datasets : compteur de 1 072 928 jeux de données, relevé le 2 octobre 2026",
        "url": "https://huggingface.co/datasets"
      },
      {
        "label": "Hugging Face, arbre de Qwen2.5-7B-Instruct : 3 142 modèles fine-tunés et 431 quantifiés listés, relevés le 2 octobre 2026",
        "url": "https://huggingface.co/models?other=base_model:finetune:Qwen/Qwen2.5-7B-Instruct"
      },
      {
        "label": "Wikipédia, Hugging Face (fondée en 2016 à New York par Clément Delangue, Julien Chaumond et Thomas Wolf, d'abord une application de chatbot pour adolescents, nom tiré de l'émoji), consulté le 2 octobre 2026",
        "url": "https://en.wikipedia.org/wiki/Hugging_Face"
      },
      {
        "label": "Nvidia, NVIDIA to Acquire Hugging Face, 3 septembre 2026 (12 930 300 000 dollars ; plateforme ouverte, calcul Nvidia non requis pour publier ou déployer)",
        "url": "https://blogs.nvidia.com/blog/nvidia-to-acquire-hugging-face/"
      },
      {
        "label": "Nvidia, formulaire 8-K déposé auprès de la SEC, 3 septembre 2026 (accord du 2 septembre ; environ 11,9 milliards de dollars pour les actionnaires et jusqu'à environ 1 milliard d'actions pour les salariés ; clôture attendue au premier semestre 2027 sous réserve des autorisations réglementaires ; engagement de garder la plateforme ouverte et de soutenir les autres fabricants de puces)",
        "url": "https://www.sec.gov/Archives/edgar/data/1045810/000104581026000078/nvda-20260902.htm"
      },
      {
        "label": "TechCrunch, « Nvidia confirms it will buy Hugging Face for $12.9 billion », 3 septembre 2026",
        "url": "https://techcrunch.com/2026/09/03/nvidia-confirms-it-will-buy-hugging-face-for-12-9-billion/"
      },
      {
        "label": "Cohere Labs, fiche de tiny-aya-global sur Hugging Face (licence CC BY-NC 4.0)",
        "url": "https://huggingface.co/CohereLabs/tiny-aya-global"
      },
      {
        "label": "Hugging Face, documentation Pickle Scanning (risque d'exécution de code arbitraire au chargement d'un fichier pickle)",
        "url": "https://huggingface.co/docs/hub/security-pickle"
      }
    ]
  },
  {
    "id": "distillation",
    "status": "live",
    "num": "72",
    "title": "Distillation",
    "en": "Knowledge distillation",
    "aliases": [
      "knowledge distillation",
      "distillation",
      "model distillation",
      "teacher-student",
      "distilled model",
      "KD"
    ],
    "aliasesFr": [
      "distillation de connaissances",
      "modèle distillé",
      "professeur et élève"
    ],
    "jargon": [
      {
        "say": "teacher, student",
        "means": "le professeur, le grand modèle qu'on imite, et l'élève, le petit modèle qu'on entraîne à l'imiter"
      },
      {
        "say": "soft targets",
        "means": "les probabilités que le professeur donne à chaque réponse possible, plus riches que la seule bonne réponse, qu'on appelle hard target"
      },
      {
        "say": "R1-Distill-Qwen-7B",
        "means": "un modèle Qwen de 7 milliards de paramètres distillé à partir de DeepSeek-R1 ; le nom donne d'abord le professeur, puis l'élève et sa taille"
      },
      {
        "say": "distillation attack",
        "means": "le nom que les labos donnent à une distillation faite sans leur accord, par des milliers de comptes qui interrogent leur API"
      }
    ],
    "cat": "entrainement",
    "links": [
      "fine-tuning",
      "slm",
      "post-entrainement",
      "open-weights",
      "tailles-de-modele",
      "modeles-de-raisonnement"
    ],
    "short": "La distillation entraîne un petit modèle, l'élève, à imiter les réponses d'un grand modèle, le professeur, pour obtenir presque le même résultat pour bien moins cher.",
    "image": "Personne n'a jamais montré la console du grand groupe au groupe de reprise d'à côté ; il apprend en écoutant ses disques, encore et encore, jusqu'à rejouer le répertoire presque à l'identique avec bien moins de musiciens. On appelle le grand groupe le professeur (teacher), et le groupe de reprise l'élève (student). L'image triche sur un point, puisque l'élève le mieux servi n'entend pas seulement le disque fini, mais aussi chaque note que le grand groupe a hésité à jouer.",
    "imagineForm": "E",
    "imagine": "Pour apprendre à reconnaître des photos, un petit modèle reçoit celle d'une BMW avec son corrigé, qui dit « voiture » et rien d'autre. Refais la leçon avec la même photo, en remplaçant le corrigé par ce que répond un grand modèle déjà entraîné, « voiture, presque à coup sûr ; camion poubelle, une chance infime ; carotte, bien moins encore ». Le petit modèle repart cette fois en sachant qu'une BMW ressemble davantage à un camion poubelle qu'à une carotte.",
    "full": [
      "La distillation (knowledge distillation) ne copie pas les paramètres du grand modèle, que le petit n'aurait de toute façon pas la place de contenir ; elle copie ce qu'il produit. Dans la version la plus simple, on fait écrire au professeur des milliers de réponses et on entraîne l'élève dessus. Dans la version d'origine, décrite en mars 2015 par Geoffrey Hinton, Oriol Vinyals et Jeff Dean dans l'article d'où vient la BMW, l'élève imite les probabilités que le professeur donne à toutes les réponses possibles. Il faut alors avoir le professeur sous la main, comme Google, qui a entraîné ses modèles ouverts Gemma 3, sortis en mars 2025, à imiter token après token les probabilités d'un modèle professeur.",
      "L'élève coûte bien moins cher à faire tourner, et il suit le professeur de près sur le genre de tâches que contenaient ses exemples. En janvier 2025, DeepSeek a préparé avec son modèle de raisonnement R1, qui compte 671 milliards de paramètres, environ 800 000 exemples rédigés, puis a fine-tuné dessus six modèles ouverts plus petits des familles Qwen et Llama. Le Qwen de 7 milliards ainsi distillé résolvait 55,5 % des problèmes du concours de maths AIME 2024, là où GPT-4o en résolvait 9,3 %. Les mêmes chercheurs ont tenté d'apprendre le raisonnement directement à un Qwen de 32 milliards, par renforcement, et il est resté loin derrière sa version distillée malgré un calcul bien plus lourd.",
      "Techniquement, ce qu'a fait DeepSeek est un fine-tuning ; on parle de distillation parce que les exemples viennent d'un modèle plus fort, dont on veut faire passer le savoir-faire dans un modèle plus petit. La quantization vise la même économie par un autre chemin, puisqu'elle garde le même modèle et arrondit ses paramètres pour qu'il pèse moins, alors que la distillation fabrique un autre modèle, qui a appris en imitant. Les deux se combinent souvent, et Anthropic rappelle que les grands labos distillent couramment leurs propres modèles pour vendre à leurs clients des versions plus petites et moins chères."
    ],
    "table": {
      "caption": "Le professeur DeepSeek-R1 et ses élèves distillés, scores publiés par DeepSeek en janvier 2025",
      "asOf": "2 octobre 2026",
      "columns": [
        "Modèle",
        "Paramètres",
        "AIME 2024",
        "MATH-500",
        "GPQA Diamond"
      ],
      "rows": [
        [
          "DeepSeek-R1 (professeur)",
          "671 milliards",
          "79,8 %",
          "97,3 %",
          "71,5 %"
        ],
        [
          "R1-Distill-Llama-70B",
          "70 milliards",
          "70,0 %",
          "94,5 %",
          "65,2 %"
        ],
        [
          "R1-Distill-Qwen-32B",
          "32 milliards",
          "72,6 %",
          "94,3 %",
          "62,1 %"
        ],
        [
          "R1-Distill-Qwen-7B",
          "7 milliards",
          "55,5 %",
          "92,8 %",
          "49,1 %"
        ],
        [
          "R1-Distill-Qwen-1.5B",
          "1,5 milliard",
          "28,9 %",
          "83,9 %",
          "33,8 %"
        ],
        [
          "GPT-4o (mai 2024)",
          "non publié",
          "9,3 %",
          "74,6 %",
          "49,9 %"
        ]
      ],
      "note": "Part des questions réussies au premier essai ; AIME 2024 et MATH-500 sont des maths, GPQA Diamond des questions de sciences de niveau doctorat."
    },
    "then": "En 2024, la distillation restait une recette maison, que Google employait par exemple pour entraîner les petites versions de Gemma 2. Le 29 janvier 2025, selon le Financial Times, OpenAI disait détenir des indices que DeepSeek avait distillé ses modèles par son API, en violation de ses conditions d'utilisation, et la technique est devenue un sujet de rivalité entre labos et entre pays. En février 2026, OpenAI a répété l'accusation dans une note aux élus du Congrès américain, et Anthropic a affirmé que DeepSeek, Moonshot AI et MiniMax avaient ouvert plus de 24 000 faux comptes pour mener plus de 16 millions d'échanges avec Claude.",
    "office": [
      {
        "who": "q",
        "text": "On distille Claude dans un petit modèle maison pour faire baisser la facture ?"
      },
      {
        "who": "a",
        "text": "Lis d'abord les conditions commerciales d'Anthropic, qui interdisent d'utiliser Claude pour entraîner des modèles concurrents ; un professeur ouvert dont la licence autorise expressément la distillation, comme DeepSeek-R1, t'évite la question."
      }
    ],
    "avoid": "« DeepSeek a volé les paramètres d'OpenAI. » L'accusation ne porte pas sur les paramètres, que l'API ne livre jamais, mais sur des millions de réponses obtenues par l'API pour entraîner d'autres modèles, ce que les conditions d'utilisation interdisent.",
    "video": null,
    "sources": [
      {
        "label": "Hinton, Vinyals et Dean, Distilling the Knowledge in a Neural Network, 9 mars 2015 (soft targets ; la BMW rarement prise pour un camion poubelle, mais bien plus souvent que pour une carotte)",
        "url": "https://arxiv.org/abs/1503.02531"
      },
      {
        "label": "Gemma Team (Google DeepMind), Gemma 3 Technical Report, 25 mars 2025 (modèles de 1 à 27 milliards de paramètres entraînés par distillation ; l'élève apprend la distribution de probabilités du professeur)",
        "url": "https://arxiv.org/abs/2503.19786"
      },
      {
        "label": "Gemma Team (Google DeepMind), Gemma 2: Improving Open Language Models at a Practical Size, 31 juillet 2024 (les versions 2B et 9B entraînées par distillation plutôt que par prédiction du token suivant)",
        "url": "https://arxiv.org/abs/2408.00118"
      },
      {
        "label": "DeepSeek-AI, DeepSeek-R1, 22 janvier 2025 (distillés par fine-tuning seul sur environ 800 000 exemples ; un Qwen de 32 milliards entraîné par renforcement à 47,0 % sur AIME 2024 contre 72,6 % pour sa version distillée)",
        "url": "https://arxiv.org/abs/2501.12948"
      },
      {
        "label": "DeepSeek, fiche Hugging Face de DeepSeek-R1 (671 milliards de paramètres dont 37 actifs, scores de R1 et de GPT-4o, six modèles distillés à partir de Qwen2.5 et Llama 3, licence MIT qui autorise la distillation), consultée le 2 octobre 2026",
        "url": "https://huggingface.co/deepseek-ai/DeepSeek-R1"
      },
      {
        "label": "DeepSeek, fiche Hugging Face de DeepSeek-R1-Distill-Qwen-7B, mise en ligne le 20 janvier 2025 (tableau des modèles distillés : AIME 2024, MATH-500, GPQA Diamond), consultée le 2 octobre 2026",
        "url": "https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-7B"
      },
      {
        "label": "Euronews, « OpenAI says Chinese companies are trying to use US models to train AI », 29 janvier 2025 (indices contre DeepSeek selon le Financial Times, distillation contraire aux conditions d'utilisation d'OpenAI)",
        "url": "https://www.euronews.com/next/2025/01/29/openai-says-chinese-companies-are-trying-to-use-us-models-to-train-ai"
      },
      {
        "label": "Rest of World, OpenAI accuse DeepSeek dans une note du 12 février 2026 à la commission de la Chambre des représentants sur la Chine (contournement des restrictions d'accès, sorties obtenues pour la distillation), 13 février 2026",
        "url": "https://restofworld.org/2026/openai-deepseek-distillation-dispute-us-china/"
      },
      {
        "label": "Anthropic, Detecting and preventing distillation attacks, 23 février 2026 (plus de 24 000 faux comptes, plus de 16 millions d'échanges, DeepSeek, Moonshot AI et MiniMax ; les labos distillent couramment leurs propres modèles)",
        "url": "https://www.anthropic.com/news/detecting-and-preventing-distillation-attacks"
      },
      {
        "label": "Anthropic, Commercial Terms of Service, en vigueur depuis le 17 juin 2025 (article D.4 : interdiction d'utiliser les services pour entraîner des modèles d'IA concurrents), consultées le 2 octobre 2026",
        "url": "https://www.anthropic.com/legal/commercial-terms"
      }
    ]
  },
  // Termes prévus : visibles dans le graphe, fiche à venir.
];

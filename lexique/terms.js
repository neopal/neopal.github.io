// Données du Lexique IA. Source éditoriale : content/dico/drafts/*.md (voix, faits, sources).
// status: "live" = fiche publiée ; "soon" = terme prévu, visible dans le graphe.
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
    cat: 'fondations',
    links: ['tokenizer', 'fenetre-de-contexte', 'prediction-du-mot-suivant', 'embedding', 'cout-d-une-requete', 'mythe-base-de-donnees'],
    short:
      "Un token est un bloc de texte numéroté : avant de lire ta question, le modèle la passe dans une sampleuse qui la découpe en blocs, et il ne travaille ensuite qu'avec leurs numéros.",
    image:
      "La sampleuse a une banque d'environ 200 000 pads. « bonjour » a le sien, parce qu'il revient trop souvent pour être découpé. « anticonstitutionnellement » en allume 5. « fraise » en allume 2 : f, puis raise.",
    imagine:
      "Un producteur a enregistré « bonjour » sur un seul pad. Tu lui demandes quelle est la troisième lettre. Il réécoute le pad en boucle, très concentré, et finit par répondre : « bonjour ».",
    full: [
      "Un token est un fragment de texte tiré d'un vocabulaire fixe : 200 019 entrées pour le découpeur de GPT-5 (le même que celui de GPT-4o). Ce vocabulaire est construit avant l'entraînement en gardant les bouts de texte les plus fréquents ; il suit la fréquence, jamais l'orthographe ni le sens. Un programme, le tokenizer, découpe tout ce qui entre et remplace chaque fragment par son numéro. En sortie, le modèle produit un numéro à la fois, retraduit en texte.",
      "Quand tu interagis avec un LLM, tout se compte en tokens : les input tokens (ce que tu lui envoies), les output tokens (ce qu'il te répond, en général facturés plus cher), la quantité de texte qu'il peut lire d'un coup (la fenêtre de contexte) et la vitesse de réponse. Le français coûte d'ailleurs plus cher que l'anglais : j'ai passé le même paragraphe dans les deux langues, il fait 65 tokens en anglais et 78 en français, soit 20 % de plus pour dire la même chose, parce que la banque a surtout été remplie avec de l'anglais.",
    ],
    split: [
      {mot: 'bonjour', blocs: ['bonjour']},
      {mot: 'fraise', blocs: ['f', 'raise']},
      {mot: 'strawberry', blocs: ['st', 'raw', 'berry']},
      {mot: 'anticonstitutionnellement', blocs: ['ant', 'icon', 'stitution', 'nel', 'lement']},
    ],
    then:
      "En 2024, la question piège était « combien de r dans strawberry ? ». GPT-4o répondait souvent 2, parce qu'il ne voit que trois blocs (st, raw, berry) et que les r sont enfermés dedans. Le projet d'OpenAI qui allait régler ça s'appelait en interne Strawberry ; il est sorti le 12 septembre 2024 sous le nom o1, le premier modèle de raisonnement grand public. En 2026, les modèles de raisonnement réécrivent en général le mot lettre par lettre avant de compter. Le découpage est resté le même ; les modèles ont simplement appris à vérifier.",
    office: [
      {who: 'q', text: 'Pourquoi la facture API a doublé ce mois-ci ?'},
      {who: 'a', text: "Ton chatbot renvoie tout l'historique à chaque message, donc tu repaies les mêmes input tokens à chaque tour."},
    ],
    avoid:
      "« Un token, c'est un mot. » C'est vrai pour « bonjour », mais faux pour « fraise » ou « strawberry ». En français, compte environ 0,8 mot par token.",
    video: {src: 'videos/token.mp4', poster: 'videos/token.jpg'},
    sources: [
      {label: 'Découpages, numéros et ratio FR/EN : tiktoken, encodage o200k_base, testé le 1er octobre 2026', url: 'https://github.com/openai/tiktoken/blob/main/tiktoken/model.py'},
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
    graphLabel: 'Mythe : la base de données',
    cat: 'mythes',
    links: ['parametres', 'prediction-du-mot-suivant', 'hallucination', 'rag', 'temperature', 'token'],
    short:
      "Un modèle, c'est un groupe de musique sans discothèque : quand tu lui demandes un morceau, il ne sort pas le disque, il le rejoue de mémoire, note après note.",
    image:
      "Sa mémoire, c'est sa console : des milliards de potards réglés pendant l'entraînement, puis figés. Aucun morceau n'est rangé dedans, seulement des réglages qui font que telle note sonne juste après telle autre.",
    imagine:
      "Tu demandes au groupe le morceau exact de la page 112 d'un roman. Il te joue quelque chose de superbe, sûr de lui, que personne n'a jamais écrit. Puis il salue.",
    full: [
      "Un modèle de langage ne stocke pas de textes qu'il irait consulter. Il stocke des paramètres, des nombres ajustés pendant l'entraînement pour prédire le token suivant. Quand il répond, il écrit un token à la fois en tirant à chaque pas un morceau parmi les plus probables, si bien que la réponse n'existe nulle part avant qu'il l'écrive.",
      "Deux tests le montrent. Pose deux fois la même question dans deux conversations et la réponse change, alors qu'une base rendrait la même fiche. Demande ensuite une citation exacte et tu obtiens souvent une phrase plausible et fausse : c'est l'hallucination.",
      "Certains produits cherchent vraiment : ChatGPT avec la recherche web, Perplexity, ou le chatbot d'une entreprise branché sur ses documents (le RAG). Dans le studio, c'est quelqu'un qui pose une partition sur le pupitre. Le groupe la lit, puis il joue, toujours note après note ; la recherche est faite par l'outil autour du modèle, et le modèle, lui, joue.",
    ],
    then:
      "En 2024, ChatGPT répondait surtout de mémoire et la recherche web restait un mode à activer. En 2026, les assistants grand public cherchent souvent d'eux-mêmes dès qu'une question porte sur l'actualité, et citent leurs sources. Ça donne l'impression d'une base, alors que le pupitre est simplement mieux rempli.",
    office: [
      {who: 'q', text: "Il m'a sorti une jurisprudence avec le numéro et la date. Je l'ai cherchée, elle n'existe pas."},
      {who: 'a', text: "Normal, il ne l'a pas retrouvée, il l'a écrite. Demande-lui la source et clique dessus."},
    ],
    avoid:
      "« Il a trouvé ça sur Internet. » Sans recherche web activée, il n'a rien trouvé du tout : il a rejoué quelque chose qui ressemble à Internet.",
    video: null,
    sources: [
      {label: 'Wikipédia, Mata v. Avianca (2023) : fausses jurisprudences générées par ChatGPT, 5 000 dollars d\'amende', url: 'https://en.wikipedia.org/wiki/Mata_v._Avianca,_Inc.'},
    ],
  },
  {
    id: 'parametres',
    status: 'live',
    num: '03',
    title: 'Paramètres',
    cat: 'fondations',
    links: ['token', 'prediction-du-mot-suivant', 'entrainement', 'moe', 'mythe-base-de-donnees'],
    short:
      "Les paramètres sont les milliards de réglages internes d'un modèle : tout ce qu'il a appris pendant l'entraînement est stocké là, sous forme de nombres, et nulle part ailleurs.",
    image:
      "Une console de mixage avec des milliards de potards. Pendant l'entraînement, l'ingé son fait écouter des milliards de phrases au modèle et tourne chaque potard d'un cran à chaque fausse note, jusqu'à ce que la sortie sonne juste. À la fin, on fige la console, et c'est ce réglage figé qu'on appelle le modèle.",
    imagine:
      "Tu demandes à l'ingé son quel potard contient « Paris est la capitale de la France ». Il fouille la console pendant une heure, puis te montre dix mille potards à la fois, un peu gêné.",
    full: [
      "Un paramètre (on dit aussi un poids) est un nombre. Un modèle de langage en contient des milliards : 175 milliards pour GPT-3 en 2020, 671 milliards pour DeepSeek-V3 fin 2024. Pendant l'entraînement, chaque paramètre est ajusté par petites touches pour que le modèle prédise mieux le token suivant ; ensuite ils ne bougent plus, et c'est pour ça qu'une conversation ne modifie pas le modèle.",
      "Aucun paramètre ne correspond à un fait précis. Une connaissance comme « Paris est la capitale de la France » est répartie sur des milliers de paramètres, et chaque paramètre participe à des milliers de connaissances. On ne peut donc pas effacer une information d'un modèle comme on supprime une ligne dans une base de données.",
    ],
    then:
      "En 2024, on comparait surtout les modèles à leur taille. En 2026, la question est autant de savoir combien de paramètres travaillent vraiment : DeepSeek-V3 en a 671 milliards mais n'en active que 37 milliards par token, parce qu'il aiguille chaque token vers quelques sous-réseaux spécialisés (l'architecture MoE). Les grands labs, eux, ne publient plus la taille de leurs modèles phares depuis GPT-4.",
    office: [
      {who: 'q', text: "On peut lui faire oublier les données clients qu'il a vues ?"},
      {who: 'a', text: "Si c'était pendant l'entraînement, elles sont diluées dans des milliards de paramètres et impossibles à retirer proprement. Si c'était juste dans une conversation, elles ne sont pas dans ses paramètres du tout."},
    ],
    avoid:
      "« Le modèle apprend de nos conversations. » Ses paramètres sont figés : ce qu'un assistant retient d'une conversation à l'autre passe par une mémoire que le produit ajoute autour. Tes conversations peuvent en revanche servir à entraîner une version future, selon les réglages du service.",
    video: null,
    sources: [
      {label: 'Wikipédia, GPT-3 (175 milliards de paramètres, 2020)', url: 'https://en.wikipedia.org/wiki/GPT-3'},
      {label: 'DeepSeek-V3 Technical Report, décembre 2024 (671 milliards de paramètres, 37 milliards actifs par token)', url: 'https://arxiv.org/abs/2412.19437'},
      {label: 'OpenAI, GPT-4 Technical Report, 2023 (taille et architecture non publiées)', url: 'https://arxiv.org/abs/2303.08774'},
    ],
  },
  {
    id: 'prediction-du-mot-suivant',
    status: 'live',
    num: '04',
    title: 'Prédiction du mot suivant',
    cat: 'fondations',
    links: ['token', 'parametres', 'temperature', 'hallucination', 'mythe-base-de-donnees'],
    short:
      "Un LLM ne fait qu'une seule chose : regarder tout le texte déjà écrit, calculer quel token a le plus de chances de venir ensuite, l'ajouter, puis recommencer jusqu'à la fin de la réponse.",
    image:
      "Vois le modèle comme un chanteur qui ne connaît jamais la chanson à l'avance. Il chante une note, réécoute tout ce qui a été chanté depuis le début, choisit la note suivante, et continue comme ça jusqu'au dernier accord.",
    imagine:
      "Tu demandes au chanteur de te donner directement le dernier couplet. Il ne peut pas : pour savoir comment le morceau finit, il doit le chanter en entier depuis le début.",
    full: [
      "À chaque pas, le modèle reçoit tout le texte déjà là (ta question et le début de sa réponse) et calcule une probabilité pour chacun des tokens de son vocabulaire. Après « La capitale de la France est », « Paris » écrase tous les autres ; après « Il était une », c'est « fois ». Le modèle tire un token parmi les plus probables, l'ajoute au texte, et relance le calcul.",
      "C'est pour ça que les réponses s'affichent mot par mot : le texte est vraiment fabriqué dans cet ordre, ce n'est pas une animation. Et c'est pour ça qu'une réponse longue coûte plus cher et prend plus de temps, puisque chaque token de sortie demande un passage complet dans le modèle.",
    ],
    then:
      "En septembre 2024 sont arrivés les modèles de raisonnement, avec o1. Ils ne prédisent pas autrement : ils écrivent d'abord un long brouillon de réflexion, token par token, puis la réponse. En 2026, ce brouillon est devenu la norme pour les tâches difficiles, et on règle combien de tokens le modèle a le droit de passer à réfléchir.",
    office: [
      {who: 'q', text: "Pourquoi il ne m'a pas répondu la même chose qu'à mon collègue, avec le même prompt ?"},
      {who: 'a', text: "Parce qu'il tire au sort parmi les tokens probables à chaque pas. Un tirage différent au début, et toute la suite part ailleurs."},
    ],
    avoid:
      "« Il a compris la question, puis il a rédigé la réponse. » Aucune réponse n'est prête quelque part : elle se construit token par token, et le modèle découvre la fin en l'écrivant.",
    video: null,
    sources: [
      {label: 'Wikipédia, OpenAI o1 (premier modèle de raisonnement, 12 septembre 2024)', url: 'https://en.wikipedia.org/wiki/OpenAI_o1'},
    ],
  },
  {
    id: 'hallucination',
    status: 'live',
    num: '05',
    title: 'Hallucination',
    cat: 'comportements',
    links: ['prediction-du-mot-suivant', 'mythe-base-de-donnees', 'rag', 'parametres'],
    short:
      "Une hallucination, c'est quand un modèle affirme avec assurance quelque chose de faux : une date, une citation, une loi ou une source qui n'existe pas.",
    image:
      "Vois le modèle comme un groupe qui joue un morceau que personne n'a jamais écrit, avec la même assurance que son plus grand tube, et le public applaudit parce que ça sonne juste.",
    imagine:
      "Tu demandes au groupe un morceau qu'il ne connaît pas. Plutôt que d'avouer, il improvise trois minutes très crédibles, puis annonce le titre et l'année de sortie.",
    full: [
      "Un modèle produit la suite la plus plausible, et rien dans ce mécanisme ne vérifie qu'elle est vraie. Sur un sujet qu'il connaît bien, plausible et vrai se confondent. Sur un fait rare, une date précise ou une référence, il produit quand même la suite la plus plausible, avec toutes les apparences d'une bonne réponse.",
      "En septembre 2025, une étude d'OpenAI a pointé une cause : la plupart des évaluations notent les modèles comme un QCM sans points négatifs. Répondre « je ne sais pas » rapporte zéro alors que deviner rapporte parfois un point, si bien que l'entraînement pousse les modèles à deviner plutôt qu'à avouer qu'ils ne savent pas.",
    ],
    then:
      "En février 2024, le chatbot d'Air Canada a inventé une règle de remboursement pour un client en deuil, et un tribunal canadien a jugé la compagnie responsable de ce que disait son chatbot. En 2026, les modèles hallucinent en général moins sur les questions courantes et citent plus souvent leurs sources, mais le mécanisme n'a pas changé : une référence précise se vérifie avant d'être utilisée.",
    office: [
      {who: 'q', text: "Il m'a donné trois études avec les auteurs et l'année. Je les mets dans le deck ?"},
      {who: 'a', text: "Clique d'abord sur chacune. S'il n'a pas fait de recherche web, il a pu écrire trois références plausibles qui n'existent pas."},
    ],
    avoid:
      "« Il ment. » Mentir suppose de connaître la vérité. Il produit la suite la plus plausible, sans savoir si elle est vraie.",
    video: null,
    sources: [
      {label: 'OpenAI, « Why language models hallucinate », 5 septembre 2025', url: 'https://openai.com/index/why-language-models-hallucinate/'},
      {label: 'Kalai et al., Why Language Models Hallucinate (arXiv 2509.04664)', url: 'https://arxiv.org/abs/2509.04664'},
      {label: 'American Bar Association, Moffatt v. Air Canada, tribunal de Colombie-Britannique, 14 février 2024', url: 'https://www.americanbar.org/groups/business_law/resources/business-law-today/2024-february/bc-tribunal-confirms-companies-remain-liable-information-provided-ai-chatbot/'},
    ],
  },
  {
    id: 'fenetre-de-contexte',
    status: 'live',
    num: '06',
    title: 'Fenêtre de contexte',
    cat: 'fondations',
    links: ['token', 'prediction-du-mot-suivant', 'rag', 'context-engineering', 'cout-d-une-requete'],
    short:
      "La fenêtre de contexte, c'est la quantité de texte qu'un modèle peut avoir sous les yeux en même temps, comptée en tokens : tes consignes, l'historique de la conversation, les documents joints et sa propre réponse.",
    image:
      "Si le modèle est un groupe en studio, la fenêtre de contexte est la longueur de la bande. Tout ce qui tient sur la bande, le groupe l'entend en jouant ; quand la bande est pleine, il faut effacer le début pour continuer à enregistrer.",
    imagine:
      "Tu enregistres une session de trois heures sur une bande de deux heures. À la fin, tu demandes au groupe comment commençait le morceau, et il te regarde, sincèrement surpris qu'il y ait eu un début.",
    full: [
      "À chaque message, l'application renvoie au modèle tout ce qu'il doit savoir : les consignes, l'historique, les fichiers et ta nouvelle question. Le modèle n'a pas d'autre mémoire que ce paquet, et ce qui n'y est pas, il ne le voit pas. La taille maximale de ce paquet, c'est la fenêtre de contexte.",
      "Une grande fenêtre ne garantit pas une bonne lecture. Une étude de 2023, « Lost in the Middle », a montré que les modèles retrouvent mieux une information placée au début ou à la fin d'un long texte qu'au milieu. Et comme tout se paie en tokens, remplir la fenêtre à chaque message coûte cher.",
    ],
    then:
      "En 2023, GPT-4 lisait 8 000 tokens d'un coup, une quinzaine de pages. Gemini 1.5 Pro est passé à 1 million de tokens en février 2024, et Claude Sonnet 4 aussi en août 2025, de quoi lire environ 750 000 mots, soit un code source entier ou plusieurs romans. La fenêtre a été multipliée par plus de cent en deux ans ; la difficulté est maintenant de bien la remplir, ce qu'on appelle le context engineering.",
    office: [
      {who: 'q', text: "Pourquoi il a oublié la consigne que je lui ai donnée au début ?"},
      {who: 'a', text: "La conversation est trop longue : soit le début est sorti de la fenêtre, soit il est noyé au milieu. Redonne la consigne, ou repars d'une nouvelle conversation avec un résumé."},
    ],
    avoid:
      "« Il se souvient de notre conversation d'hier. » Seulement si le produit lui renvoie un résumé dans la fenêtre ; le modèle, lui, repart de zéro à chaque requête.",
    video: null,
    sources: [
      {label: 'Liu et al., Lost in the Middle: How Language Models Use Long Contexts, juillet 2023', url: 'https://arxiv.org/abs/2307.03172'},
      {label: 'Wikipédia, Gemini (1.5 Pro, 1 million de tokens, février 2024)', url: 'https://en.wikipedia.org/wiki/Gemini_(language_model)'},
      {label: 'InfoQ, Claude Sonnet 4 passe à 1 million de tokens de contexte, août 2025', url: 'https://www.infoq.com/news/2025/08/claude-sonnet-4/'},
      {label: 'Wikipédia, GPT-4 (fenêtres de 8 000 et 32 000 tokens, 2023)', url: 'https://en.wikipedia.org/wiki/GPT-4'},
    ],
  },
  // Termes prévus : visibles dans le graphe, fiche à venir.
  {id: 'tokenizer', status: 'soon', title: 'Tokenizer', cat: 'fondations'},
  {id: 'embedding', status: 'soon', title: 'Embedding', cat: 'fondations'},
  {id: 'entrainement', status: 'soon', title: 'Entraînement', cat: 'fondations'},
  {id: 'moe', status: 'soon', title: 'MoE (Mixture of Experts)', cat: 'fondations'},
  {id: 'temperature', status: 'soon', title: 'Température', cat: 'inference'},
  {id: 'cout-d-une-requete', status: 'soon', title: "Coût d'une requête", cat: 'inference'},
  {id: 'rag', status: 'soon', title: 'RAG', cat: 'agents'},
  {id: 'context-engineering', status: 'soon', title: 'Context engineering', cat: 'agents'},
];

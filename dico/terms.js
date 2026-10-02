// Données du Dico IA. Source éditoriale : content/dico/drafts/*.md (voix, faits, sources).
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
      "Le groupe n'a pas de discothèque : quand tu lui demandes un morceau, il ne sort pas le disque, il le rejoue de mémoire, note après note.",
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
  // Termes prévus : visibles dans le graphe, fiche à venir.
  {id: 'tokenizer', status: 'soon', title: 'Tokenizer', cat: 'fondations'},
  {id: 'fenetre-de-contexte', status: 'soon', title: 'Fenêtre de contexte', cat: 'fondations'},
  {id: 'prediction-du-mot-suivant', status: 'soon', title: 'Prédiction du mot suivant', cat: 'fondations'},
  {id: 'embedding', status: 'soon', title: 'Embedding', cat: 'fondations'},
  {id: 'parametres', status: 'soon', title: 'Paramètres', cat: 'fondations'},
  {id: 'temperature', status: 'soon', title: 'Température', cat: 'inference'},
  {id: 'cout-d-une-requete', status: 'soon', title: "Coût d'une requête", cat: 'inference'},
  {id: 'hallucination', status: 'soon', title: 'Hallucination', cat: 'comportements'},
  {id: 'rag', status: 'soon', title: 'RAG', cat: 'agents'},
];

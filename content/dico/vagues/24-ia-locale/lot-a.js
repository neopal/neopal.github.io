// Lexique IA, vague 24, lot A (une fiche : le mythe de l'IA locale). Format identique à lexique/terms.js, sans `num`.
// imagineForm : forme de l'« Imagine » (content/dico/univers.md, section « Les formes de l'Imagine »).
// Faits et chiffres relevés le 2 novembre 2026 sur les pages citées dans `sources`.
module.exports = [
  {
    id: 'mythe-ia-locale',
    status: 'live',
    title: "« Une IA locale, c'est ChatGPT chez soi »",
    en: 'Myth: local AI is ChatGPT at home',
    aliases: ['local AI', 'local LLM', 'run LLM locally', 'offline AI', 'self-hosted LLM'],
    aliasesFr: ['IA locale', 'IA en local', 'LLM local', 'IA hors ligne'],
    jargon: [
      {say: 'faire tourner en local', means: "exécuter le modèle sur ta propre machine, sans envoyer tes messages à un serveur"},
      {say: 'VRAM', means: "la mémoire de la carte graphique ; c'est surtout elle qui décide de la taille du modèle que ta machine peut charger"},
      {say: 'gpt-oss:20b', means: "le modèle ouvert d'OpenAI pensé pour un ordinateur, environ 14 Go à télécharger, qui tourne avec 16 Go de mémoire"},
    ],
    graphLabel: 'Mythe : ChatGPT chez soi',
    cat: 'mythes',
    links: ['slm', 'open-weights', 'quantization', 'modeles-frontiere', 'mythe-chatgpt-c-est-le-modele'],
    solutions: [
      {name: 'Ollama', kind: 'logiciel gratuit', url: 'https://ollama.com'},
      {name: 'LM Studio', kind: 'logiciel gratuit', url: 'https://lmstudio.ai'},
      {name: 'Jan', kind: 'logiciel gratuit', url: 'https://jan.ai'},
      {name: 'llama.cpp', kind: 'bibliothèque open source', url: 'https://github.com/ggml-org/llama.cpp'},
    ],
    short: "Une IA locale garde tes données chez toi, mais sur une carte graphique de joueur, elle égale les meilleurs modèles d'il y a six mois à un an.",
    image: "Gilles a monté un home cinéma dans son garage. Personne ne sait ce qu'il regarde et il ne paie plus la séance, mais les films y arrivent un an après leur sortie en salle, sur un projecteur qui lui a coûté une année de tickets.",
    imagineForm: 'D',
    imagine: "« Ton IA locale, elle vaut ChatGPT ? », demande Noémie à son frère, qui vient d'installer un modèle de 20 milliards de paramètres sur son ordinateur. « Elle vaut à peu près le ChatGPT de l'an dernier, et elle marche dans le train », répond-il.",
    full: [
      "Le mythe a sa part de vrai. Un modèle ouvert téléchargé avec Ollama ou LM Studio tourne sur ta machine, sans compte ni abonnement, et tes messages ne quittent pas l'ordinateur. Il répond aussi sans réseau, et en avril 2026 le Journal du Geek présentait justement ces applications comme le recours quand ChatGPT, Gemini ou Claude tombent en panne.",
      "Ce qui tient chez toi reste un modèle de taille moyenne. OpenAI a publié en août 2025 gpt-oss-20b pour les machines de 16 Go de mémoire, un fichier de 14 Go aux résultats proches d'o3-mini sur les tests courants. Les modèles ouverts les plus forts de 2026 comptent, eux, de 750 milliards à près de 2 800 milliards de paramètres, comme GLM-5.3 ou Kimi K3, et réclament des serveurs de cartes graphiques.",
      "Le décalage se mesure. En septembre 2025, Epoch AI a regardé les modèles assez petits pour une seule carte graphique de joueur, jusqu'à 28 milliards de paramètres sur une RTX 4090 et 40 milliards sur une RTX 5090. Ils rattrapaient les meilleurs modèles avec six à douze mois de retard. Les auteurs pensent l'écart plus grand en usage réel, ces modèles étant plus souvent taillés pour les tests. Les meilleurs modèles ouverts n'avaient plus que quatre mois de retard en mai 2026, mais ce sont justement ceux qui demandent des serveurs.",
    ],
    office: [
      {who: 'q', text: "On installe une IA locale pour que les commerciaux arrêtent de coller les contrats dans ChatGPT ?"},
      {who: 'a', text: "Pour la confidentialité, c'est une bonne idée tant que la tâche reste simple, résumer ou retrouver une clause ; pour l'analyse fine, compare d'abord sur dix vrais contrats avec un modèle en ligne sous contrat entreprise."},
    ],
    avoid: "« Une IA locale ne coûte rien. » Le modèle est gratuit, mais il faut la machine, souvent une carte graphique dédiée pour un modèle moyen, l'électricité, et le temps de l'installer, de le choisir et de le mettre à jour.",
    video: null,
    sources: [
      {label: "Journal du Geek, Ces 2 apps vous permettent d'utiliser une IA sans internet quand ChatGPT, Gemini ou Claude tombent en panne, 20 avril 2026 (Ollama sur PC, IA hors ligne)", url: 'https://www.journaldugeek.com/2026/04/20/ces-2-apps-vous-permettent-dutiliser-une-ia-sans-internet-quand-chatgpt-gemini-ou-claude-tombent-en-panne/'},
      {label: "OpenAI, Introducing gpt-oss, 5 août 2025 (gpt-oss-20b proche d'o3-mini sur les tests courants, tourne avec 16 Go de mémoire, pour l'usage sur appareil et l'inférence locale)", url: 'https://openai.com/index/introducing-gpt-oss/'},
      {label: "Ollama, gpt-oss (version 20b : 14 Go à télécharger ; MXFP4, systèmes à partir de 16 Go de mémoire)", url: 'https://ollama.com/library/gpt-oss'},
      {label: "Somala et Emberson (Epoch AI), What's the best model you can run on a single consumer GPU?, 9 septembre 2025 (modèles jusqu'à 28B paramètres sur RTX 4090 et 40B sur RTX 5090 ; rattrapent la frontière en 6 à 12 mois ; écart probablement plus long en usage réel, les meilleurs modèles ouverts étant plus souvent surajustés aux tests)", url: 'https://epochai.substack.com/p/whats-the-best-model-you-can-run'},
      {label: "Edwards et Emberson (Epoch AI), Open models lag state-of-the-art closed models by 4 months, 29 mai 2026 (depuis janvier 2026, quatre mois de retard en moyenne sur l'Epoch Capabilities Index)", url: 'https://epoch.ai/data-insights/open-closed-eci-gap'},
      {label: "Z AI, fiche de GLM-5.3 sur Hugging Face (753 milliards de paramètres selon l'API Hugging Face)", url: 'https://huggingface.co/zai-org/GLM-5.3'},
      {label: "Moonshot AI, fiche de Kimi K3 sur Hugging Face (2 780 milliards de paramètres selon l'API Hugging Face)", url: 'https://huggingface.co/moonshotai/Kimi-K3'},
    ],
  },
];

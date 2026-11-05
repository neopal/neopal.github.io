// Lexique IA, vague 25, lot C (une fiche : le mythe des détecteurs de texte IA). Format identique à lexique/terms.js, sans `num`.
// imagineForm : forme de l'« Imagine » (content/dico/univers.md, section « Les formes de l'Imagine »).
// Faits et chiffres relevés le 5 novembre 2026 sur les pages citées dans `sources`.
module.exports = [
  {
    id: 'mythe-detecteur-de-texte-ia',
    status: 'live',
    title: "« Un détecteur prouve qu'un texte vient d'une IA »",
    en: 'Myth: an AI detector proves a text was AI-written',
    aliases: ['AI detector', 'AI text detector', 'GPT detector', 'AI writing detection', 'AI content detector'],
    aliasesFr: ['détecteur de texte IA', "détecteur d'IA", 'détecteur de ChatGPT', 'détection de texte généré'],
    jargon: [
      {say: 'perplexity', means: "la perplexité, la surprise d'un modèle de langage devant chaque mot d'un texte ; plus elle est basse, plus le détecteur penche pour l'IA"},
      {say: 'false positive', means: "un faux positif, un texte humain classé comme généré, l'erreur qui fait accuser quelqu'un à tort"},
      {say: 'humanizer', means: "un outil qui réécrit un texte généré pour qu'il passe sous les détecteurs, comme StealthGPT"},
      {say: 'watermark', means: "un filigrane, une signature statistique glissée dans le choix des mots au moment de la génération, que seul le détenteur de la clé sait lire"},
    ],
    graphLabel: 'Mythe : détecteur de texte IA',
    cat: 'mythes',
    links: ['declaration-d-usage-de-l-ia', 'ancrage-aux-sources', 'ai-slop', 'biais', 'clonage-de-voix'],
    short: "Un détecteur de texte IA estime d'après le style la probabilité qu'un texte soit généré, sans voir son origine ; son score n'est pas une preuve.",
    image: "Dans le bus 38, Hervé le contrôleur repère les fraudeurs à leur air gêné. Il verbalise surtout les timides et les touristes qui cherchent leur ticket au fond du sac, pendant que le vrai resquilleur, qui a appris à prendre l'air dégagé, descend tranquillement à République.",
    imagineForm: 'D',
    imagine: "« Ce texte a-t-il été écrit par une IA ? », demande en avril 2023 un internaute à GPTZero, en lui collant un extrait de la Constitution des États-Unis, signée en 1787. « Ton texte a probablement été écrit entièrement par une IA », répond le détecteur.",
    full: [
      "Un détecteur ne sait rien de la façon dont un texte a été écrit, il n'a que le texte. Il mesure surtout à quel point chaque mot était prévisible pour un modèle de langage, ce qu'on appelle la perplexité, et un texte trop prévisible passe pour généré. La Constitution américaine a été lue tant de fois pendant l'entraînement des modèles qu'elle leur paraît écrite d'avance, ce qu'Edward Tian, le créateur de GPTZero, reconnaissait en juillet 2023.",
      "Cette règle frappe d'abord les plumes simples. En 2023, une équipe de Stanford a soumis à sept détecteurs 91 rédactions du TOEFL, l'examen d'anglais langue étrangère, trouvées sur un forum chinois. Les détecteurs en classaient en moyenne 61 % comme générées, et au moins l'un d'eux 89 sur 91, alors qu'ils ne se trompaient presque jamais sur des copies de collégiens américains. L'inverse marchait aussi, puisqu'il suffisait de demander à ChatGPT de réécrire ses propres essais d'admission à l'université dans une langue plus littéraire pour que la détection tombe de 100 % à 13 %.",
      "Les outils ont progressé depuis. En 2025, Brian Jabarian et Alex Imas, de l'université de Chicago, ont comparé quatre détecteurs sur près de 2 000 textes humains et leurs équivalents générés. Les trois commerciaux, GPTZero, Originality.ai et Pangram, accusaient à tort moins de 1 % des textes humains, contre 30 à 78 % pour le modèle open source RoBERTa. Passés dans l'humaniseur StealthGPT, les textes générés échappaient pourtant à GPTZero environ une fois sur deux, et seul Pangram tenait bon. GPTZero, lui, annonce sur son site 99,9 % de précision, un chiffre de vendeur.",
      "Même rare, l'erreur tombe sur quelqu'un, et à 1 % une promotion de 300 copies honnêtes compte encore trois accusés à tort. Le 28 janvier 2026, un tribunal de l'État de New York a annulé la sanction d'Orion Newby, étudiant de première année à l'université Adelphi, et fait effacer l'affaire de son dossier. Il avait été accusé sur la foi d'un score Turnitin de 100 %, quand deux autres détecteurs donnaient 0 %. Seul un filigrane posé pendant la génération signe l'origine, comme SynthID Text, testé par Google sur près de 20 millions de réponses de Gemini et décrit dans Nature en octobre 2024. Il ne se lit qu'avec la clé du modèle qui l'a posé, ne dit rien des autres et s'affaiblit quand on reformule le texte.",
    ],
    then: "En juillet 2023, OpenAI retirait son propre classifieur pour manque de précision ; il ne repérait que 26 % des textes générés et accusait à tort 9 % des textes humains. Les meilleurs détecteurs commerciaux de 2025 descendent sous 1 % de fausses alertes sur des textes assez longs, et pourtant l'université Curtin, en Australie, a éteint celui de Turnitin le 1er janvier 2026 en gardant la détection du plagiat.",
    office: [
      {who: 'q', text: "Le détecteur donne 87 % d'IA sur la note du stagiaire, je le convoque ?"},
      {who: 'a', text: "Convoque-le pour parler du fond, pas du score ; demande-lui ses sources et ses brouillons, fais-lui expliquer deux passages, et si l'IA a servi, vous écrirez ensemble la ligne qui le dit."},
    ],
    avoid: "« Un texte lisse et sans faute, c'est forcément l'IA. » Un style lisse s'obtient aussi à la main, chez un bon élève, un juriste ou quelqu'un qui écrit dans une langue apprise ; juger au style revient à refaire le calcul du détecteur, avec les mêmes faux coupables.",
    video: null,
    sources: [
      {label: "Benj Edwards, Ars Technica, Why AI writing detectors don't work, 14 juillet 2023 (capture virale d'avril 2023 : GPTZero juge un extrait de la Constitution américaine « likely to be written entirely by AI » ; ZeroGPT donne 88,2 % d'IA à un passage de la Genèse ; Edward Tian : la Constitution revient sans cesse dans les données d'entraînement ; perplexité et burstiness)", url: 'https://arstechnica.com/information-technology/2023/07/why-ai-detectors-think-the-us-constitution-was-written-by-ai/'},
      {label: "Liang, Yuksekgonul, Mao, Wu et Zou (Stanford), GPT detectors are biased against non-native English writers, avril 2023, révisé le 10 juillet 2023 (sept détecteurs ; 91 rédactions du TOEFL d'un forum chinois : 61,22 % de faux positifs en moyenne, 89 sur 91 signalées par au moins un détecteur ; précision quasi parfaite sur 88 copies de 8th grade américaines ; consigne « Elevate the provided text by employing literary language » : détection de 100 % à 13 % au plus)", url: 'https://arxiv.org/abs/2304.02819'},
      {label: "Matt Robinson, Chicago Booth Review, Do AI Detectors Work Well Enough to Trust?, 2 décembre 2025 (étude de Brian Jabarian et Alex Imas ; GPTZero, Originality.ai, Pangram et RoBERTa ; les trois outils commerciaux sous 1 % de faux positifs ; moins précis sous 50 mots)", url: 'https://www.chicagobooth.edu/review/2025/december/do-ai-detectors-work-well-enough-trust'},
      {label: "Becker Friedman Institute, Artificial Writing and Automated Detection, note de recherche d'octobre 2025 sur le working paper 2025-116 de Jabarian et Imas (corpus de 1 992 passages ; RoBERTa : 30 à 78 % de faux positifs ; Pangram robuste à StealthGPT ; GPTZero perd l'essentiel de sa détection face aux humaniseurs, environ 50 % de faux négatifs et plus)", url: 'https://bfi.uchicago.edu/wp-content/uploads/2025/10/Artificial-Writing-and-Automated-Detection.pdf'},
      {label: "GPTZero, page d'accueil consultée le 5 novembre 2026 (le vendeur annonce « a 99.9% accuracy rate » d'après ses propres tests et ses partenaires)", url: 'https://gptzero.me/'},
      {label: "Cour suprême de l'État de New York, comté de Nassau, Matter of Newby v Adelphi Univ., 2026 NY Slip Op 26021, décision du 28 janvier 2026 (essai noté zéro après un « AI-generated score of 100% » de Turnitin ; Grammarly AI detector et ZeroGPT donnent 0 % ; sanction annulée et dossier à expurger)", url: 'https://www.nycourts.gov/reporter/3dseries/2026/2026_26021.htm'},
      {label: "Dathathri, See et al. (Google DeepMind), Scalable watermarking for identifying large language model outputs, Nature, 23 octobre 2024 (SynthID-Text ; expérience sur près de 20 millions de réponses de Gemini ; la détection demande la clé du filigrane ; filigranes affaiblis par la reformulation ; textes d'autres modèles non couverts sans coordination entre fournisseurs)", url: 'https://www.nature.com/articles/s41586-024-08025-4'},
      {label: "OpenAI, New AI classifier for indicating AI-written text, 31 janvier 2023, mis à jour le 20 juillet 2023 (classifieur retiré « due to its low rate of accuracy » ; 26 % de vrais positifs et 9 % de faux positifs sur le jeu de test)", url: 'https://openai.com/index/new-ai-classifier-for-indicating-ai-written-text/'},
      {label: "Curtin University, Update on Turnitin AI detection tool, 4 septembre 2025 (détection d'écriture IA de Turnitin désactivée à partir du 1er janvier 2026 sur tous les campus, vérification d'originalité maintenue)", url: 'https://www.curtin.edu.au/news/oasis-news/update-on-turnitin-ai-detection-tool/'},
    ],
  },
];

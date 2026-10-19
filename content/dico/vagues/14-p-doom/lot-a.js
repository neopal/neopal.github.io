// Lexique IA, vague 14, lot A (une fiche : p(doom)). Format identique à lexique/terms.js, sans `num`.
// imagineForm : forme de l'« Imagine » (content/dico/univers.md, section « Les formes de l'Imagine »).
// Faits, chiffres et citations relevés le 19 octobre 2026 sur les pages citées dans `sources`.
module.exports = [
  {
    id: 'p-doom',
    status: 'live',
    title: 'p(doom)',
    en: 'p(doom)',
    aliases: ['P(doom)', 'pdoom', 'probability of doom', 'x-risk', 'existential risk from AI'],
    aliasesFr: ['probabilité de catastrophe', "risque existentiel lié à l'IA"],
    jargon: [
      {say: "what's your p(doom)?", means: "« c'est combien, ton p(doom) ? », la question rituelle posée aux patrons de labos et aux chercheurs depuis 2023, à laquelle on répond par un pourcentage"},
      {say: 'x-risk', means: "existential risk, le risque existentiel, une catastrophe dont l'humanité ne se relèverait pas, extinction comprise"},
      {say: 'doomer', means: "celui qui donne un p(doom) élevé, un mot qui sert souvent de pique dans les débats en ligne"},
      {say: 'superforecaster', means: "un prévisionniste amateur repéré pour la justesse de ses prévisions passées, qu'on oppose aux experts du domaine"},
    ],
    cat: 'ecosysteme',
    links: ['agi', 'alignement', 'explosion-de-l-intelligence', 'evaluations-de-dangerosite', 'labs'],
    short: "Le p(doom) est la probabilité, donnée par une personne, que l'IA cause une catastrophe pour l'humanité comme l'extinction ; c'est une opinion chiffrée, pas une mesure.",
    image: "Quand l'appli météo annonce 30 % de pluie, on peut compter sur cent jours pareils s'il a plu à peu près trente fois. Quand Patrick, à la machine à café, annonce une chance sur quatre que l'IA finisse l'humanité, personne ne viendra le féliciter si elle le fait, et si elle ne le fait pas, il rappellera qu'il restait trois chances sur quatre.",
    imagineForm: 'B',
    imagine: "Ouvre la page anglaise de Wikipédia « P(doom) » et trie son tableau par probabilité. Une quarantaine de personnalités s'y étalent de 0 %, pour l'investisseur Marc Andreessen, jusqu'à 99,999999 % pour le chercheur Roman Yampolskiy. Lis ensuite les notes en bas de page, où l'un compte l'extinction d'ici 2100, un autre les cent prochaines années, et un troisième place son chiffre au niveau du risque que tout l'oxygène de sa chambre file dans un coin.",
    full: [
      "Le p(doom) s'écrit comme une notation de probabilité, celle du « doom », la catastrophe sans retour que provoquerait l'IA. Le plus ancien emploi relevé date du 25 mai 2009, sur le forum LessWrong, où le programmeur Tim Tyler se demandait pourquoi on l'avait toujours surestimé. L'expression est restée un raccourci d'initiés jusqu'en 2023, quand la sortie de GPT-4 et les alertes de chercheurs comme Geoffrey Hinton en ont fait une question qu'on pose en public.",
      "Le 1er janvier 2024, un billet de LessWrong demandait déjà d'arrêter d'employer le terme, parce que le même mot recouvre la mort dans cinq ans, dans deux siècles ou juste après l'arrivée d'une superintelligence. Les chiffres connus répondent en effet à des questions différentes. Le 17 septembre 2025, Dario Amodei, patron d'Anthropic, donnait 25 % de chances que les choses tournent « vraiment, vraiment mal », dans une phrase qui ne fixait aucune échéance. En septembre 2026, Evan Hubinger, l'un des responsables de l'alignement de la même entreprise, estimait à plus de 10 % le risque que l'IA tue tous les humains d'ici dix ans.",
      "Un p(doom) reste une croyance déclarée sur un événement qui n'arrivera qu'une fois, et aucun résultat ne pourra la départager. En 2022, le Forecasting Research Institute a fait débattre 80 experts et 89 superforecasters sur les grands risques du siècle. Pour une extinction causée par l'IA d'ici 2100, les experts donnaient 3 % et les superforecasters huit fois moins, et parmi les quelques-uns rappelés en mai 2023, la plupart n'avaient pas changé d'avis.",
    ],
    office: [
      {who: 'q', text: "Le DG veut annoncer notre p(doom) à la table ronde de jeudi. On dit combien ?"},
      {who: 'a', text: "Commence par dire de quel événement tu parles et à quelle échéance, sinon ton chiffre ne se compare à aucun autre ; et sur scène, parle plutôt des risques que vous savez tester sur vos propres outils."},
    ],
    avoid: "« Les spécialistes estiment à 25 % le risque que l'IA détruise l'humanité. » Ces 25 % sont l'avis d'un patron de labo sur des choses qui tourneraient « vraiment mal », dans une phrase sans échéance. Les experts du tournoi de 2022 donnaient 3 % pour une extinction d'ici 2100, et aucun de ces chiffres n'est une mesure.",
    video: null,
    sources: [
      {label: "Wikipédia, P(doom), consultée le 19 octobre 2026 (définition ; emploi probablement le plus ancien par Tim Tyler sur LessWrong en 2009 ; terme devenu courant en 2023 après GPT-4 et les alertes de Hinton et Bengio ; tableau triable d'une quarantaine de valeurs, de 0 % pour Marc Andreessen à 99,999999 % pour Roman Yampolskiy ; notes : « humans are extinct by 2100 », « within the next 100 years », Grady Booch et l'oxygène de sa chambre)", url: 'https://en.wikipedia.org/wiki/P(doom)'},
      {label: "Tim Tyler, commentaire sous « This Failing Earth », LessWrong, 25 mai 2009 (« I was wondering why p(doom) has apparently been so consistently overestimated »)", url: 'https://www.lesswrong.com/posts/2KNN9WPcyto7QH9pi/this-failing-earth?commentId=nvA3JjbaMa7YGrM7J'},
      {label: "Isaac King, Stop talking about p(doom), LessWrong, 1er janvier 2024 (le terme peut désigner la mort dans 5 à 10 ans, dans 80 à 200 ans, ou juste après l'AGI ou la superintelligence)", url: 'https://www.lesswrong.com/posts/EwyviSHWrQcvicsry/stop-talking-about-p-doom'},
      {label: "TechRadar, « Anthropic's CEO gives 'a 25% chance things go really, really badly' with AI », 20 septembre 2025 (Axios AI+ DC Summit, 17 septembre 2025 : « I think there's a 25% chance that things go really, really badly », et 75 % que tout aille très bien)", url: 'https://www.techradar.com/ai-platforms-assistants/claude/anthropics-ceo-gives-a-25-percent-chance-things-go-really-really-badly-with-ai'},
      {label: "CNBC, « Experts weigh in as researcher says AI has more than 10% chance of 'killing all humans' », 9 septembre 2026 (Evan Hubinger, alignment lead chez Anthropic : « I personally think it is >10% within the next decade »)", url: 'https://www.cnbc.com/2026/09/09/anthropic-researcher-quits-ai-safety.html'},
      {label: "TechRadar, « Top AI researcher says AI will end humanity... », 7 avril 2024 (Yann LeCun à moins de 0,01 %, « less likely than an asteroid wiping us out » ; utilisé dans le schéma)", url: 'https://www.techradar.com/pro/top-ai-researcher-says-ai-will-end-humanity-and-we-should-stop-developing-it-now-but-dont-worry-elon-musk-disagrees'},
      {label: "Forecasting Research Institute, Forecasting Existential Risks: Evidence from a Long-Run Forecasting Tournament (XPT, 2022 : 80 experts et 89 superforecasters, risques liés à l'IA, au nucléaire, aux pandémies)", url: 'https://forecastingresearch.org/xpt'},
      {label: "Scott Alexander, The Extinction Tournament, Astral Codex Ten, 2023 (résumé du rapport XPT : extinction par l'IA d'ici 2100 à 3 % pour les experts et 0,38 % pour les superforecasters, soit 3 / 0,38 = 7,9, environ huit fois moins ; 1 % pour les superforecasters si l'AGI existe en 2070 ; quelques-uns rappelés en mai 2023, la plupart n'ont pas changé d'avis)", url: 'https://www.astralcodexten.com/p/the-extinction-tournament'},
    ],
  },
];

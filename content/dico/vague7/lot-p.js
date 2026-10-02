// Lexique IA, vague 7, lot P (écosystème et mythes). Format identique à lexique/terms.js, sans `num`.
// imagineForm : forme de l'« Imagine » (content/dico/univers.md, section « Les formes de l'Imagine »).
// Faits et chiffres relevés le 2 octobre 2026 sur les pages citées dans `sources`.
module.exports = [
  {
    id: 'labs',
    status: 'live',
    title: 'Labs',
    en: 'AI labs',
    aliases: ['AI lab', 'AI labs', 'frontier lab', 'frontier labs', 'AI company'],
    aliasesFr: ["laboratoire d'IA", "labo d'IA", 'labos', 'lab'],
    jargon: [
      {say: 'frontier lab', means: "l'un des quelques labs qui entraînent les modèles les plus capables du moment"},
      {say: 'wrapper', means: "une entreprise qui construit son produit sur le modèle d'un lab, appelé par API, sans entraîner le sien"},
      {say: 'PBC', means: "public benefit corporation, une société à but lucratif qui inscrit une mission d'intérêt public dans ses statuts ; c'est le statut d'Anthropic et, depuis octobre 2025, celui d'OpenAI Group"},
    ],
    cat: 'ecosysteme',
    links: ['modeles-frontiere', 'open-weights', 'compute', 'mythe-chatgpt-c-est-le-modele', 'comparatif-des-modeles', 'hugging-face'],
    short:
      "Un lab d'IA est une entreprise ou une équipe qui entraîne ses propres grands modèles, comme OpenAI, Anthropic, Google DeepMind, Meta, Mistral AI ou DeepSeek.",
    image:
      "Les labs tiennent le rôle des maisons de disques du studio. Chacune a ses groupes maison, paie ses heures de studio et décide de ce qui sort, en album fermé qu'on écoute contre paiement ou en preset donné à tout le monde. Comme les équipes de régie passent souvent d'une maison à l'autre, beaucoup de labels sont nés d'un départ.",
    imagineForm: 'D',
    imagine:
      "« Pourquoi OpenAI a-t-elle changé sa façon de partager ses recherches ? », demande The Verge à Ilya Sutskever, cofondateur du lab, au lendemain de la sortie de GPT-4, en mars 2023. « Nous avions tort. Nous avions complètement tort », répond-il.",
    full: [
      "Un lab se reconnaît à ce qu'il fabrique lui-même ses modèles, du pré-entraînement aux derniers réglages, avec ses données, ses chercheurs et son parc de puces. Les milliers d'entreprises qui bâtissent un produit en appelant ces modèles par API n'en font pas partie, même quand leur assistant porte leur nom. Sous le même mot, les statuts n'ont rien de commun. Depuis octobre 2025, OpenAI Group est une société à mission détenue à 26 % par la fondation OpenAI et à 27 % par Microsoft. Google DeepMind est une filiale d'Alphabet, la maison mère de Google, et DeepSeek appartient au fonds spéculatif chinois High-Flyer, qui le finance.",
      "La plupart des labs descendent de deux maisons. DeepMind, fondé à Londres en 2010, est racheté par Google en 2014 puis fusionné avec Google Brain en avril 2023. OpenAI naît en décembre 2015 comme association à but non lucratif, et c'est de chez elle que partent sept salariés, dont Dario et Daniela Amodei, pour fonder Anthropic en janvier 2021. Ilya Sutskever lance Safe Superintelligence en juin 2024, puis Mira Murati, son ancienne directrice technique, Thinking Machines Lab en février 2025. À Paris, Mistral AI naît en avril 2023 autour d'Arthur Mensch, venu de DeepMind, et de Guillaume Lample et Timothée Lacroix, venus de Meta.",
      "Le nom d'un lab dit peu de ce qu'il publie. OpenAI garde fermés ses modèles de tête, mais a mis en ligne en août 2025 les poids de gpt-oss. Thinking Machines a publié en juillet 2026 ceux d'Inkling, 975 milliards de paramètres sous licence Apache, en reprenant l'architecture de DeepSeek-V3 et des données synthétiques tirées de Kimi K2.5, le modèle de Moonshot AI. Les labs se copient donc autant qu'ils se concurrencent, et ce qui est ouvert se juge modèle par modèle.",
    ],
    then:
      "En mars 2025, Anthropic levait 3,5 milliards de dollars sur une valorisation de 61,5 milliards. En mai 2026, sa série H la valorisait 965 milliards, quelques semaines après la levée de 122 milliards qui portait OpenAI à 852 milliards. Le même mois, selon le New York Times, Anthropic préparait son entrée en Bourse pour l'automne 2026.",
    office: [
      {who: 'q', text: "Ce fournisseur dit qu'il a son propre modèle, c'est un lab ?"},
      {who: 'a', text: "Demande-lui s'il a fait le pré-entraînement lui-même ou s'il a réglé les poids publiés par un autre, et lesquels ; la licence, les données d'origine et les mises à jour en dépendent."},
    ],
    avoid:
      "« Un lab, c'est un centre de recherche. » Les labs publient des articles, mais ce sont des entreprises qui vendent l'accès à leurs modèles, lèvent des dizaines de milliards de dollars et arbitrent chaque jour entre ce qu'ils montrent et ce qu'ils gardent.",
    video: null,
    sources: [
      {label: "The Verge, « OpenAI co-founder on company's past approach to openly sharing research: 'We were wrong' », 15 mars 2023 (à la question de savoir pourquoi OpenAI a changé sa façon de partager ses recherches, Ilya Sutskever répond « We were wrong. Flat out, we were wrong »)", url: 'https://www.theverge.com/2023/3/15/23640180/openai-gpt-4-launch-closed-research-ilya-sutskever-interview'},
      {label: "Wikipédia, OpenAI (fondée en décembre 2015 comme organisation à but non lucratif ; restructuration d'octobre 2025 en OpenAI Group PBC, détenue à 26 % par l'OpenAI Foundation et à 27 % par Microsoft ; levée de 122 milliards de dollars à une valorisation de 852 milliards, annoncée en mars et close en avril 2026)", url: 'https://en.wikipedia.org/wiki/OpenAI'},
      {label: "Wikipédia, Anthropic (fondée en janvier 2021 comme public benefit corporation par sept anciens salariés d'OpenAI, dont Dario et Daniela Amodei ; série E de 3,5 milliards de dollars à 61,5 milliards en mars 2025 ; valorisation de 965 milliards lors de la série H de mai 2026 ; en mai 2026, d'après le New York Times, projet d'introduction en Bourse visé pour l'automne 2026)", url: 'https://en.wikipedia.org/wiki/Anthropic'},
      {label: "Wikipédia, Google DeepMind (filiale d'Alphabet basée à Londres ; DeepMind lancé en novembre 2010, racheté par Google le 26 janvier 2014, fusionné avec Google Brain en avril 2023)", url: 'https://en.wikipedia.org/wiki/Google_DeepMind'},
      {label: "Wikipédia, DeepSeek (laboratoire lancé par le fonds High-Flyer, devenu société indépendante le 17 juillet 2023, avec High-Flyer comme principal investisseur)", url: 'https://en.wikipedia.org/wiki/DeepSeek'},
      {label: "Wikipédia, Mistral AI (fondée le 28 avril 2023 par Arthur Mensch, ancien de Google DeepMind, et par Guillaume Lample et Timothée Lacroix, passés par Meta)", url: 'https://en.wikipedia.org/wiki/Mistral_AI'},
      {label: "Wikipédia, Safe Superintelligence Inc. (fondée le 19 juin 2024 par Ilya Sutskever, ancien directeur scientifique d'OpenAI, avec Daniel Gross et Daniel Levy)", url: 'https://en.wikipedia.org/wiki/Safe_Superintelligence_Inc.'},
      {label: "Wikipédia, Thinking Machines Lab (fondée en février 2025 par Mira Murati, ancienne directrice technique d'OpenAI ; Inkling publié le 15 juillet 2026 sous licence Apache, 975 milliards de paramètres, architecture tirée de DeepSeek-V3 et données synthétiques de post-entraînement tirées de Kimi K2.5 de Moonshot AI)", url: 'https://en.wikipedia.org/wiki/Thinking_Machines_Lab'},
      {label: "Wikipédia, Products and applications of OpenAI, section GPT-OSS (gpt-oss-120b et gpt-oss-20b publiés le 5 août 2025)", url: 'https://en.wikipedia.org/wiki/Products_and_applications_of_OpenAI'},
    ],
  },
  {
    id: 'lecon-amere',
    status: 'live',
    title: 'Leçon amère',
    en: 'The Bitter Lesson',
    aliases: ['bitter lesson', 'the bitter lesson', "Sutton's bitter lesson"],
    aliasesFr: ['la leçon amère', 'leçon de Sutton'],
    jargon: [
      {say: 'bitter-lesson-pilled', means: "convaincu par la leçon amère, au point de miser sur le calcul plutôt que sur des règles écrites à la main"},
      {say: 'search and learning', means: "la recherche et l'apprentissage, les deux familles de méthodes que Sutton juge capables de grandir avec le calcul disponible"},
      {say: 'GOFAI', means: "good old-fashioned AI, l'IA symbolique des règles et des connaissances codées par des humains, celle que la leçon donne perdante"},
    ],
    cat: 'ecosysteme',
    links: ['lois-d-echelle', 'compute', 'donnees-d-entrainement', 'reseau-de-neurones', 'llm'],
    short:
      "La leçon amère, essai publié par Rich Sutton en 2019, constate qu'en IA les méthodes générales qui profitent du calcul finissent par battre celles qui codent la connaissance humaine.",
    image:
      "Un professeur de solfège passe des années à écrire pour le groupe les règles de l'harmonie, et le groupe progresse vite au début. Pendant ce temps, l'ingé son lui fait écouter des millions d'heures de musique sur des machines chaque année moins chères, jusqu'à ce que cette écoute joue mieux que le cours. Le professeur trouve la leçon amère, puisque son travail est dépassé par une méthode qu'il jugeait trop bête pour réussir.",
    imagineForm: 'D',
    imagine:
      "« Les LLM ne sont-ils pas ta leçon amère mise en pratique ? », demande en substance le podcasteur Dwarkesh Patel à Rich Sutton en septembre 2025. « Ils savent utiliser une quantité massive de calcul, mais ils sont aussi une façon d'y faire entrer énormément de connaissance humaine », répond l'auteur de l'essai.",
    full: [
      "Le 13 mars 2019, Rich Sutton, pionnier de l'apprentissage par renforcement et professeur à l'université de l'Alberta, publie sur son site un texte d'une page. Soixante-dix ans de recherche en IA y tiennent en une observation, selon laquelle les méthodes générales qui tirent parti du calcul l'emportent de loin, parce que le coût du calcul ne cesse de baisser. Coder ce que l'on sait du domaine aide toujours au début, puis plafonne et finit par freiner. En mars 2025, Sutton a reçu avec Andrew Barto le prix Turing pour leurs travaux sur l'apprentissage par renforcement.",
      "Ses exemples viennent de domaines très différents. Aux échecs, la recherche massive de coups bat Kasparov en 1997, à la déception des chercheurs qui misaient sur la compréhension humaine du jeu. En reconnaissance vocale, les méthodes statistiques battent dès les années 1970 celles qui codaient les phonèmes et l'appareil vocal. Le go en donne la version la plus nette. AlphaGo avait appris sur des milliers de parties humaines, et en octobre 2017, AlphaGo Zero, parti de coups joués au hasard et nourri de ses seules parties contre lui-même, l'a battu 100 à 0 après trois jours d'entraînement.",
      "Sutton parle d'amertume parce que la victoire se fait contre l'approche que les chercheurs préfèrent, celle qui construit la machine sur le modèle de leur propre façon de penser. Six jours plus tard, le roboticien Rodney Brooks lui répondait que la convolution, au cœur des réseaux de vision, est elle-même une idée humaine, et qu'une voiture autonome dépense environ 2 500 watts en calcul quand un cerveau humain en consomme 20. Les LLM et les lois d'échelle sont depuis devenus l'argument favori des partisans de la leçon, ce que son auteur conteste en partie, puisqu'il attend des systèmes qui apprennent de leur propre expérience plutôt que de textes écrits par des humains.",
    ],
    office: [
      {who: 'q', text: "Ça vaut le coup d'écrire des règles métier pour aider le modèle ?"},
      {who: 'a', text: "Oui pour ce que tu dois livrer cette année, à condition de les garder dans le prompt ou dans le code autour du modèle, d'où elles se retirent sans effort le jour où un modèle plus capable n'en a plus besoin."},
    ],
    avoid:
      "« La leçon amère dit que la connaissance humaine ne sert à rien. » Sutton écrit qu'elle aide toujours à court terme et ne parle que du long terme ; la recherche et l'apprentissage, ses deux méthodes gagnantes, ont d'ailleurs été inventées par des chercheurs.",
    video: null,
    sources: [
      {label: "Rich Sutton, The Bitter Lesson, 13 mars 2019 (70 ans de recherche ; méthodes générales qui exploitent le calcul ; échecs en 1997, go 20 ans plus tard, concours DARPA de reconnaissance vocale dans les années 1970 et modèles de Markov cachés, vision ; la connaissance codée aide à court terme, puis plafonne et freine ; recherche et apprentissage)", url: 'http://www.incompleteideas.net/IncIdeas/BitterLesson.html'},
      {label: "Université de l'Alberta, Rich Sutton receives the 2024 ACM A.M. Turing Award, 5 mars 2025 (prix partagé avec Andrew Barto pour les fondements de l'apprentissage par renforcement)", url: 'https://www.ualberta.ca/en/computing-science/news-and-events/news/2025/march/rich-sutton-receives-the-2024-acm-am-turing-award.html'},
      {label: "Wikipédia, Bitter lesson (exemples de l'essai : Deep Blue aux échecs, AlphaGo au go, modèles de Markov cachés, réseaux convolutifs)", url: 'https://en.wikipedia.org/wiki/Bitter_lesson'},
      {label: "Google DeepMind, AlphaGo Zero: Starting from scratch, octobre 2017 (les versions précédentes apprenaient d'abord sur des milliers de parties humaines ; AlphaGo Zero part du jeu au hasard, joue contre lui-même et bat la version publiée d'AlphaGo 100 à 0 après trois jours)", url: 'https://deepmind.google/discover/blog/alphago-zero-starting-from-scratch/'},
      {label: "Wikipédia, AlphaGo Zero (article de Nature d'octobre 2017 ; bat AlphaGo Lee 100 à 0 en trois jours, sans données de parties humaines)", url: 'https://en.wikipedia.org/wiki/AlphaGo_Zero'},
      {label: "Rodney Brooks, A Better Lesson, 19 mars 2019 (la convolution est conçue par des humains ; environ 2 500 watts de calcul pour une voiture autonome contre 20 watts pour un cerveau humain)", url: 'https://rodneybrooks.com/a-better-lesson/'},
      {label: "Dwarkesh Podcast, Richard Sutton, 26 septembre 2025 (question sur les LLM et la leçon amère ; réponse : « They are clearly a way of using massive computation [...] But they're also a way of putting in lots of human knowledge » ; attente de systèmes qui apprennent de l'expérience)", url: 'https://www.dwarkesh.com/p/richard-sutton'},
    ],
  },
  {
    id: 'horizon-d-autonomie',
    status: 'live',
    title: "Horizon d'autonomie",
    en: 'Time horizon',
    aliases: ['time horizon', 'task-completion time horizon', '50% time horizon', 'autonomy horizon', 'METR time horizon'],
    aliasesFr: ['horizon temporel', 'horizon de tâche'],
    jargon: [
      {say: '50% time horizon', means: "la longueur des tâches, comptée en temps d'expert humain, qu'un modèle réussit une fois sur deux"},
      {say: '80% time horizon', means: "la même mesure quand on exige quatre réussites sur cinq, toujours bien plus courte"},
      {say: 'doubling time', means: "le temps que met l'horizon des meilleurs modèles à doubler, environ quatre mois depuis 2023 dans les données de METR"},
      {say: 'METR', means: "l'organisation de recherche à but non lucratif qui publie la mesure, prononcée comme « meter »"},
    ],
    cat: 'agents',
    links: ['mythe-agent-autonome', 'human-in-the-loop', 'boucle-agent', 'swe-bench', 'agi', 'terminal-bench'],
    short:
      "L'horizon d'autonomie mesure la longueur des tâches, comptée en temps de travail d'un expert humain, qu'un agent d'IA réussit seul une fois sur deux, selon la méthode de METR.",
    image:
      "Le producteur sort de la régie et laisse le groupe enchaîner seul. L'horizon, c'est la longueur du set que le groupe réussit une fois sur deux sans lui, comptée en temps qu'il faudrait à un musicien de session pour jouer les mêmes morceaux. Comme le groupe va souvent bien plus vite que le musicien, la mesure parle de la difficulté du set et non de l'heure où le producteur revient.",
    imagineForm: 'A',
    imagine:
      "En février 2019, l'horizon de GPT-2 tenait en 3 secondes de travail d'expert. En février 2026, celui de Claude Opus 4.6 atteint 12 heures. Ramène ces durées à une marche tranquille à 5 km/h, et les 3 secondes font 4 mètres, de ta chaise à la porte, quand les 12 heures font 60 kilomètres, presque un marathon et demi.",
    full: [
      "METR, une organisation de recherche à but non lucratif, fait passer aux modèles des tâches de code, d'apprentissage automatique et de cybersécurité, dont elle a chronométré la durée chez des experts humains. Pour chaque modèle, elle calcule la longueur de tâche qu'il réussit une fois sur deux, de quelques secondes à plusieurs heures. Le chiffre décrit la difficulté d'une tâche en temps humain, et non le temps que l'agent passe à travailler seul, qui est souvent bien plus court.",
      "L'intérêt de la mesure tient à sa régularité. En mars 2025, l'article de METR constatait que cet horizon doublait à peu près tous les sept mois depuis 2019, et Claude 3.7 Sonnet, le meilleur modèle du moment, tenait environ 50 minutes. Si la tendance se prolongeait sur des tâches réelles, concluaient les auteurs, des agents automatiseraient d'ici cinq ans bien des tâches logicielles qui prennent un mois à un humain.",
      "Le chiffre se lit avec ses marges. Les 12 heures de Claude Opus 4.6 ont un intervalle de confiance qui va de 5 à 60 heures, et METR prévient que ses mesures ne sont plus fiables passé 16 heures avec ses tâches actuelles. Si l'on exige quatre réussites sur cinq, le même modèle tombe à 70 minutes. En juillet 2025, METR trouvait aussi des horizons 40 à 100 fois plus courts sur les tâches où l'agent pilote un ordinateur à partir de l'écran, comme naviguer sur un site web.",
    ],
    then:
      "En mars 2025, METR comptait un doublement tous les sept mois depuis 2019. Dans les données publiées en 2026, le doublement mesuré depuis 2023 tombe à environ 129 jours, un peu plus de quatre mois, et le meilleur modèle évalué dépasse déjà les 16 heures que la suite de tâches sait mesurer de façon fiable.",
    office: [
      {who: 'q', text: "Le modèle a un horizon de 12 heures, je peux lui confier ma journée de travail ?"},
      {who: 'a', text: "Une fois sur deux, sur des tâches de code bien bornées comme celles du test ; si tu veux quatre succès sur cinq, vise plutôt des tâches d'une heure, et garde la relecture."},
    ],
    avoid:
      "« Un horizon de 12 heures, c'est un agent qui tourne 12 heures sans toi. » La mesure compte le temps qu'un expert humain mettrait à faire la tâche ; l'agent la boucle souvent en quelques minutes, et ce qu'elle mesure, c'est la difficulté qu'il sait affronter.",
    video: null,
    sources: [
      {label: "METR, Task-Completion Time Horizons of Frontier AI Models, consulté le 2 octobre 2026 (définition de l'horizon à 50 % ; tâches surtout de génie logiciel, d'apprentissage automatique et de cybersécurité ; mesures au-delà de 16 heures peu fiables ; FAQ : l'horizon mesure la difficulté d'une tâche et non le temps que l'IA passe à la réaliser)", url: 'https://metr.org/time-horizons/'},
      {label: "METR, données brutes benchmark_results_1_1.yaml, consultées le 2 octobre 2026 : GPT-2 (14 février 2019) 0,054 min à 50 % ; Claude Opus 4.6 (5 février 2026) 718,8 min à 50 % (intervalle 316,7 à 3 633,8 min) et 69,9 min à 80 % ; doublement de 128,7 jours depuis 2023 et de 187,8 jours sur toute la période. Calculs : 0,054 min = 3,2 s ; 718,8 min = 12,0 h ; 316,7 min = 5,3 h ; 3 633,8 min = 60,6 h. Calcul de l'Imagine à 5 km/h (1,39 m/s) : 3,2 s font 4,4 m ; 12 h font 60 km, soit 1,42 marathon de 42,195 km", url: 'https://metr.org/assets/benchmark_results_1_1.yaml'},
      {label: "Kwa et al. (METR), Measuring AI Ability to Complete Long Tasks, 18 mars 2025 (doublement environ tous les sept mois depuis 2019 ; Claude 3.7 Sonnet vers 50 minutes ; extrapolation : d'ici cinq ans, automatisation de nombreuses tâches logicielles d'un mois si les résultats se généralisent)", url: 'https://arxiv.org/abs/2503.14499'},
      {label: "METR, How Does Time Horizon Vary Across Domains?, 14 juillet 2025 (horizons 40 à 100 fois plus courts en usage visuel d'un ordinateur, OSWorld et WebArena, avec une progression de rythme comparable)", url: 'https://metr.org/blog/2025-07-14-how-does-time-horizon-vary-across-domains/'},
      {label: "METR, page À propos (« a research nonprofit », prononcé « meter »)", url: 'https://metr.org/about'},
    ],
  },
  {
    id: 'mythe-autocompletion',
    status: 'live',
    title: "« Ce n'est que de l'autocomplétion »",
    en: "Myth: it's just autocomplete",
    aliases: ['just autocomplete', 'fancy autocomplete', 'glorified autocomplete', 'stochastic parrot', 'stochastic parrots'],
    aliasesFr: ['autocomplétion', 'perroquet stochastique', "juste de l'autocomplétion"],
    jargon: [
      {say: 'next-token prediction', means: "la prédiction du token suivant, la tâche sur laquelle le modèle est pré-entraîné et la façon dont il écrit"},
      {say: 'stochastic parrot', means: "« perroquet stochastique », l'image lancée en 2021 par un article d'Emily Bender, Timnit Gebru et leurs coautrices pour des modèles qui imitent du texte sans le comprendre"},
      {say: 'base model', means: "le modèle sorti du seul pré-entraînement, qui prolonge n'importe quel texte sans le prendre pour une question"},
      {say: 'interpretability', means: "l'étude de ce qui se passe dans le modèle entre le texte reçu et le token qu'il écrit"},
    ],
    graphLabel: 'Mythe : autocomplétion',
    cat: 'mythes',
    links: ['prediction-du-mot-suivant', 'llm', 'post-entrainement', 'mythe-base-de-donnees', 'modeles-de-raisonnement', 'pre-entrainement'],
    short:
      "Dire qu'un LLM n'est que de l'autocomplétion décrit sa sortie, token par token, mais oublie le calcul derrière chaque token et le post-entraînement qui le transforme en assistant.",
    image:
      "Le chanteur ne sort qu'une note à la fois, et sur ce point le mythe dit vrai. Il oublie que le chanteur qui tombe juste sur la rime l'avait choisie avant d'attaquer le vers, et que le groupe qu'on entend sur scène a passé des mois devant le public après avoir tout écouté chez l'ingé son.",
    imagineForm: 'E',
    imagine:
      "On donne à Claude 3.5 Haiku le vers « He saw a carrot and had to grab it, » et il enchaîne « His hunger was like a starving rabbit ». En mars 2025, des chercheurs d'Anthropic rejouent la scène en effaçant de son calcul interne, juste avant le second vers, l'idée de « rabbit », et le modèle écrit un tout autre vers, qui finit cette fois par « habit ».",
    full: [
      "Le mythe a raison sur la sortie. Un LLM produit bien son texte token après token, en calculant à chaque pas une probabilité pour chaque token possible, comme le clavier d'un téléphone propose le mot suivant. La formule a un cousin savant, le « perroquet stochastique », venu d'un article de 2021 d'Emily Bender, Timnit Gebru et leurs coautrices sur les risques des grands modèles, et elle sert depuis à dire que ces modèles imitent du texte sans le comprendre.",
      "Le mot cache d'abord le calcul qui précède chaque token. En mars 2025, une équipe d'Anthropic a suivi ce calcul à l'intérieur de Claude 3.5 Haiku. Avant d'écrire le second vers d'un distique, le modèle avait déjà retenu le mot de la rime, puis construisait le vers pour y arriver. Pour donner la capitale de l'État où se trouve Dallas, il passait par une étape intermédiaire, « Dallas est au Texas », avant d'en tirer « Austin ».",
      "Il cache aussi le post-entraînement. Un modèle de base, sorti du seul pré-entraînement, prolonge le texte qu'on lui donne et peut répondre à une consigne par d'autres consignes. Le ChatGPT ou le Claude que tu utilises a ensuite appris à répondre, à refuser et souvent à raisonner avant d'écrire, toujours par la même prédiction. La question utile devient alors ce que cette prédiction réussit sur ta tâche, mesuré sur tes propres cas.",
    ],
    office: [
      {who: 'q', text: "Si c'est juste de l'autocomplétion, comment il résout un exercice qu'il n'a jamais vu ?"},
      {who: 'a', text: "Pour bien prédire la suite de milliards de textes, il a dû apprendre des régularités plus générales que les phrases elles-mêmes, comme poser une addition ou relier une ville à son État ; c'est ce calcul qui ressort, un token après l'autre."},
    ],
    avoid:
      "« Il prédit le mot suivant, donc il ne prévoit rien. » Le choix d'un token peut dépendre d'un plan qui porte plus loin, comme la rime déjà retenue pour la fin du vers ; ce qui sort mot à mot a pu être préparé plusieurs mots à l'avance.",
    video: null,
    sources: [
      {label: "Anthropic, Tracing the thoughts of a large language model, 27 mars 2025 (le distique « He saw a carrot and had to grab it, / His hunger was like a starving rabbit » ; le modèle prévoit la rime avant le second vers ; en retirant le concept « rabbit », il écrit un vers qui finit par « habit » ; Dallas, Texas, Austin)", url: 'https://www.anthropic.com/research/tracing-thoughts-language-model'},
      {label: "Lindsey et al. (Anthropic), On the Biology of a Large Language Model, mars 2025 (études menées sur Claude 3.5 Haiku)", url: 'https://transformer-circuits.pub/2025/attribution-graphs/biology.html'},
      {label: "Ouyang et al. (OpenAI), Training language models to follow instructions with human feedback, mars 2022 (figure 8 : GPT-3 175B, modèle de base, répond à une consigne par d'autres consignes)", url: 'https://arxiv.org/abs/2203.02155'},
      {label: "Wikipédia, Stochastic parrot (terme introduit en 2021 par l'article « On the Dangers of Stochastic Parrots » de Timnit Gebru, Emily M. Bender, Angelina McMillan-Major et Margaret Mitchell ; métaphore de modèles qui imitent statistiquement du texte sans le comprendre)", url: 'https://en.wikipedia.org/wiki/Stochastic_parrot'},
    ],
  },
  {
    id: 'mythe-a-lu-tout-internet',
    status: 'live',
    title: "« L'IA a lu tout Internet, donc elle sait tout »",
    en: 'Myth: AI has read the whole internet, so it knows everything',
    aliases: ['trained on the whole internet', 'read the entire internet', 'knows everything'],
    aliasesFr: ['a lu tout Internet', 'elle sait tout'],
    jargon: [
      {say: 'long tail', means: "la longue traîne des faits rares, présents dans peu de pages, que les modèles retrouvent moins bien"},
      {say: 'parametric knowledge', means: "ce que le modèle sait de mémoire, rangé dans ses paramètres, sans document fourni dans la conversation"},
      {say: 'recall', means: "la capacité à retrouver de tête un fait que le modèle a pourtant appris"},
      {say: 'Common Crawl', means: "l'archive publique du web, mise à jour chaque mois, d'où sortent la plupart des corpus d'entraînement"},
    ],
    graphLabel: 'Mythe : a lu tout Internet',
    cat: 'mythes',
    links: ['donnees-d-entrainement', 'date-de-coupure', 'hallucination', 'rag', 'pre-entrainement', 'mythe-base-de-donnees'],
    short:
      "Un modèle a lu une partie triée du web public, arrêtée à une date ; il retrouve mal les faits rares et ignore lesquels de ses textes disaient vrai.",
    image:
      "Des montagnes de disques sont passées dans les oreilles du groupe, ceux qu'on trouvait en rayon, en majorité anglophones, sans aucun des enregistrements privés qui dorment dans les tiroirs. Il joue sans hésiter les tubes entendus mille fois et cherche ses notes sur la face B écoutée une seule fois, alors qu'elle était bien sur le disque.",
    imagineForm: 'E',
    imagine:
      "Des chercheurs de Google interrogent Gemini 3 Pro sur des faits tirés des pages Wikipédia les plus consultées, des faits qu'il a bien appris puisqu'il sait compléter la phrase où ils figurent, et il en retrouve de tête 85 sur 100. Ils refont l'essai avec des faits appris tout aussi bien, tirés cette fois des pages les moins lues, et il n'en retrouve plus que 63.",
    full: [
      "Le mythe part d'un fait exact, la masse de lecture, puis se trompe deux fois. Ce qu'on appelle « tout Internet » se réduit au web public que des robots peuvent parcourir, trié ensuite par les labos. Dans l'archive Common Crawl de septembre 2026, 41,9 % des pages sont en anglais, 4,7 % en français et 0,002 % en breton, et tes messages, l'intranet de ton entreprise ou les pages derrière un mot de passe n'y figurent pas.",
      "Lu ne veut pas dire retrouvé. En février 2026, une équipe de Google a vérifié, fait par fait, ce que treize modèles avaient retenu de Wikipédia. GPT-5 et Gemini 3 avaient appris 95 à 98 % des faits, mais ne retrouvaient pas de tête 26 à 34 % d'entre eux, et encore 11 à 12 % en prenant le temps de réfléchir. Les ratés touchent d'abord les faits rares et les questions posées à l'envers, quand on demande qui a joué dans tel club plutôt que dans quel club a joué tel groupe.",
      "Lu ne veut pas dire vrai ni à jour non plus. Il a lu les erreurs et les canulars avec le reste, et sa lecture s'arrête à sa date de coupure. Pour un fait rare, récent ou interne, le plus sûr reste de lui donner le document à lire dans la conversation, ce que fait le RAG.",
    ],
    then:
      "Fin 2022, Nikhil Kandpal et ses coauteurs montraient qu'un modèle répondait d'autant mieux à une question factuelle que son corpus contenait de documents sur le sujet, et qu'il faudrait des modèles plus gros de plusieurs ordres de grandeur pour les faits rares. L'étude de Google de 2026 déplace le problème, puisque les modèles frontière ont presque tous appris ces faits et peinent surtout à les retrouver ; la réflexion avant de répondre rattrape 40 à 65 % des faits appris mais manqués de tête.",
    office: [
      {who: 'q', text: "Il a forcément lu la doc publique de notre logiciel, on peut s'en servir pour le support sans rien brancher ?"},
      {who: 'a', text: "Il l'a peut-être lue dans une version d'avant sa date de coupure, et un détail perdu sur une page peu consultée est justement ce qu'il retrouve mal ; donne-lui la doc à jour dans le contexte et demande-lui de citer le passage."},
    ],
    avoid:
      "« S'il ne le sait pas, c'est que l'info n'est pas en ligne. » Il peut avoir lu un fait sans le retrouver de tête, ou ne l'avoir jamais lu parce que la page était récente, privée ou écartée au tri ; seule une recherche dans les documents dit ce qui existe.",
    video: null,
    sources: [
      {label: "Common Crawl, statistiques de langues, archive CC-MAIN-2026-39 (septembre 2026), fichier languages.csv consulté le 2 octobre 2026 : anglais 41,862 % des pages, français 4,677 %, breton 0,002 %", url: 'https://commoncrawl.github.io/cc-crawl-statistics/plots/languages'},
      {label: "Calderon et al. (Google), Empty Shelves or Lost Keys? Recall Is the Bottleneck for Parametric Factuality, 15 février 2026, révisé le 19 juin 2026 (13 modèles, faits tirés de Wikipédia ; GPT-5 et Gemini 3 encodent 95 à 98 % des faits mais n'en retrouvent pas directement 26 à 34 %, 11 à 12 % avec réflexion ; pour Gemini-3-Pro, rappel direct des faits encodés de 84,6 % pour les 20 % de pages les plus vues contre 63,3 % pour les 20 % les moins vues ; questions inverses plus difficiles ; la réflexion récupère 40 à 65 % des faits encodés non retrouvés)", url: 'https://arxiv.org/abs/2602.14080'},
      {label: "Google Research, Empty shelves or lost keys? Recall is the bottleneck for parametric factuality, 12 août 2026 (présentation de l'étude par Nitay Calderon et Gal Yona)", url: 'https://research.google/blog/empty-shelves-or-lost-keys-recall-is-the-bottleneck-for-parametric-factuality/'},
      {label: "Kandpal et al., Large Language Models Struggle to Learn Long-Tail Knowledge, 15 novembre 2022, ICML 2023 (la réussite à une question factuelle suit le nombre de documents pertinents vus au pré-entraînement ; il faudrait agrandir les modèles de plusieurs ordres de grandeur pour les questions peu couvertes)", url: 'https://arxiv.org/abs/2211.08411'},
    ],
  },
];

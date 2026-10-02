// Lexique IA, vague 4, lot H (grand public). Format identique à lexique/terms.js, sans `num`.
// imagineForm : forme de l'« Imagine » (content/dico/univers.md, section « Les formes de l'Imagine »).
// Faits et chiffres vérifiés le 2 octobre 2026 sur les pages citées dans `sources`.
module.exports = [
  {
    id: "dead-internet",
    status: "live",
    title: "Théorie de l'internet mort",
    en: "Dead Internet theory",
    aliases: ["dead internet", "dead internet theory"],
    aliasesFr: ["internet mort"],
    jargon: [
      {say: "bot traffic", means: "la part des visites d'un site faites par des programmes plutôt que par des personnes, des robots d'indexation aux scrapers en passant par les faux comptes"},
      {say: "AI crawler", means: "le robot d'un labo d'IA qui parcourt le web pour copier des pages, le plus souvent pour en faire des données d'entraînement"},
      {say: "LLM-run account", means: "un compte de réseau social dont les messages sont écrits par un modèle de langage ; l'expression qu'a employée Sam Altman dans un tweet de septembre 2025"}
    ],
    cat: "mythes",
    links: ["ai-slop", "agent", "webmcp", "entrainement", "llm"],
    short: "La théorie de l'internet mort affirme que l'essentiel de ce qu'on lit et voit en ligne est produit par des programmes et non par des personnes. Née en 2021 sur un forum, elle mêle un constat qui se mesure et un complot qui ne repose sur rien.",
    image: "Transposée au studio, la théorie voudrait que la salle soit remplie de mannequins, que les applaudissements sortent d'une bande et que la maison de disques ait monté le tout pour te vendre ses albums. Le public, ce sont les humains qui lisent et commentent. Les compteurs de la salle racontent une histoire moins romanesque, où un peu plus de la moitié des entrées sont bien des machines, mais où une partie d'entre elles sont des techniciens venus recopier les partitions, comme les robots d'indexation, et non des faux fans.",
    imagineForm: "D",
    imagine: "Sous la vidéo d'un chat qui joue du piano, vue deux millions de fois, tu écris « Il reste des humains ici ? ». Moins d'une minute plus tard, un compte sans photo te répond : « Excellente question ! La place de l'humain dans le monde numérique est un sujet passionnant. »",
    full: [
      "Le texte fondateur a été publié le 5 janvier 2021 par un utilisateur nommé IlluminatiPirate sur Agora Road's Macintosh Cafe, un petit forum, et reprenait des idées nées sur des imageboards comme Wizardchan. Selon lui, l'internet serait mort vers 2016 ou 2017, et le web qu'on croit humain serait écrit en grande partie par des intelligences artificielles, aidées d'influenceurs payés pour fabriquer la demande.",
      "La suite du texte relève du complot. L'auteur y voit la main du gouvernement américain, qui se servirait de Google, de Facebook ou d'Amazon pour mener ce qu'il appelle un gaslighting de la population mondiale par l'IA, et sa preuve se résume à une liste de faits sans lien entre eux. En septembre 2021, un article de Kaitlyn Tiffany dans The Atlantic, « Maybe You Missed It, but the Internet 'Died' Five Years Ago », l'a fait sortir des forums, et c'est lui que toute la presse a cité ensuite.",
      "La part des machines dans le trafic, elle, se mesure, et l'ironie veut qu'Imperva ait déjà compté 52 % de trafic automatisé en 2016, l'année même où la théorie date la mort de l'internet. Selon le rapport annuel d'Imperva sur les bots, publié en avril 2026, les programmes automatisés ont fait plus de 53 % des requêtes web en 2025, contre 51 % l'année précédente. Ce chiffre compte ensemble les robots d'indexation, les crawlers des labos d'IA et les bots malveillants, et il dit combien de machines visitent les pages, pas combien en écrivent.",
      "Pour l'écriture, l'étude la plus citée vient de Graphite, une agence de référencement, qui a passé au détecteur 43 000 articles en anglais tirés de Common Crawl. La part jugée générée par l'IA y dépasse celle des textes humains en novembre 2024, puis plafonne autour de la moitié. Les auteurs notent eux-mêmes que ces articles apparaissent peu dans Google et dans ChatGPT, et que leur détecteur prend pour de l'IA 4,2 % de textes écrits avant ChatGPT.",
      "Le web n'est donc pas mort, mais une bonne part de ce qui y circule n'a été ni écrit ni lu par une personne."
    ],
    then: "Le 3 septembre 2025, Sam Altman, le patron d'OpenAI, écrivait sur X qu'il n'avait jamais pris la théorie très au sérieux, mais qu'il voyait désormais beaucoup de comptes Twitter tenus par des LLM. Chez Imperva, la part des machines est passée de 51 % des requêtes en 2024 à plus de 53 % en 2025, et le rapport de 2026 s'intitule « les bots à l'ère des agents ».",
    office: [
      {who: "q", text: "Si la moitié du trafic, ce sont des bots, nos stats d'audience sont fausses ?"},
      {who: "a", text: "Ce chiffre vaut pour le web entier, pas pour ton site ; regarde d'abord ce que ton outil de mesure filtre déjà, puis cherche les visites sans défilement ni clic, qui trahissent souvent un robot qui n'a pas été écarté."}
    ],
    avoid: "« Tout ce qu'on voit en ligne est faux. » Les mesures disent que plus de la moitié des requêtes viennent de machines, dont beaucoup de robots qui lisent sans écrire, pas que les gens ont disparu ; et les articles générés se classent encore mal dans Google.",
    video: null,
    sources: [
      {label: "IlluminatiPirate, « Dead Internet Theory: Most of the Internet is Fake », Agora Road's Macintosh Cafe, 5 janvier 2021 (mort vers 2016-2017, gouvernement américain, gaslighting par l'IA)", url: "https://forum.agoraroad.com/index.php?threads/dead-internet-theory-most-of-the-internet-is-fake.3011/"},
      {label: "Wikipédia, Dead Internet theory (origine sur Wizardchan, article de Kaitlyn Tiffany dans The Atlantic en septembre 2021, 52 % de trafic automatisé en 2016 selon Imperva)", url: "https://en.wikipedia.org/wiki/Dead_Internet_theory"},
      {label: "Imperva, Bad Bot Report 2026: Bots in the Agentic Age, 29 avril 2026 (plus de 53 % du trafic web automatisé en 2025, contre 51 % l'année précédente)", url: "https://www.imperva.com/blog/bad-bot-report-2026-bots-agentic-age/"},
      {label: "Graphite, More Articles Are Now Created by AI Than Humans, 14 octobre 2025 (43 000 URL de Common Crawl, croisement en novembre 2024, plafond, faux positifs à 4,2 %)", url: "https://graphite.io/five-percent/more-articles-are-now-created-by-ai-than-humans"},
      {label: "Sam Altman sur X, 3 septembre 2025 : « i never took the dead internet theory that seriously »", url: "https://x.com/sama/status/1963366714684707120"}
    ]
  },
  {
    id: "ai-slop",
    status: "live",
    title: "AI slop",
    en: "AI slop",
    aliases: ["slop", "AI-generated slop"],
    aliasesFr: [],
    jargon: [
      {say: "slop", means: "en anglais, d'abord la boue, puis les restes de nourriture et la pâtée ; Merriam-Webster le définit désormais comme du contenu numérique de faible qualité produit en masse par l'IA"},
      {say: "brainrot", means: "les vidéos absurdes calibrées pour retenir l'attention ; Kapwing y range l'AI slop et d'autres contenus du même genre"},
      {say: "content farm", means: "ferme de contenus, un site qui publie à la chaîne pour capter du trafic de recherche et des revenus publicitaires"},
      {say: "scaled content abuse", means: "le nom que Google donne depuis mars 2024 à la production de pages en masse pour remonter dans les résultats, qu'elle soit faite par des machines, des humains ou les deux"}
    ],
    cat: "ecosysteme",
    links: ["dead-internet", "hallucination", "cout-d-une-requete", "paradoxe-de-jevons", "llm"],
    short: "L'AI slop désigne le contenu généré par l'IA en grande quantité et sans soin, qu'il s'agisse de textes, d'images, de vidéos ou de musique, publié pour occuper l'espace ou capter des vues plutôt que pour être lu.",
    image: "Un studio qui ne coûte presque plus rien à louer, comme un modèle qui génère pour quelques centimes, finit par presser des disques à la chaîne. Personne ne les a commandés ni écoutés en entier, mais ils remplissent les bacs du disquaire au point que tu ne trouves plus l'album que tu étais venu chercher.",
    imagineForm: "A",
    imagine: "En juin 2026, Deezer recevait chaque jour environ 90 000 morceaux entièrement générés par l'IA. À trois minutes le morceau, écouter la livraison d'une seule journée te prendrait 4 500 heures, plus de six mois sans dormir, et le jour où tu aurais fini, seize millions de nouveaux morceaux t'attendraient.",
    full: [
      "Le mot vient de l'anglais slop, la pâtée des cochons. Il circulait vers 2022 sur 4chan, Hacker News et YouTube, après la sortie des premiers générateurs d'images, et le 8 mai 2024 le programmeur Simon Willison l'a popularisé en reprenant un tweet de @deepfates. Le slop serait au contenu généré ce que le spam est au courrier, puisque dans les deux cas personne ne l'a demandé et personne ne l'a relu.",
      "En mai 2025, le Chicago Sun-Times et une édition du Philadelphia Inquirer ont publié une liste de lectures pour l'été dont dix titres sur quinze n'existaient pas, comme un roman climatique d'Isabel Allende intitulé Tidewater Dreams. Son auteur, Marco Buscaglia, a reconnu l'avoir produite en partie avec l'IA sans vérifier. En octobre 2025, Kapwing a ouvert un compte YouTube neuf et compté 104 vidéos de slop parmi les 500 premiers Shorts qu'on lui proposait, soit 21 %.",
      "Le slop ne coûte presque rien à produire, et c'est l'attention de chacun qui paie la différence. Chez Deezer, les morceaux générés faisaient plus de la moitié des nouveaux envois en juin 2026, pour 1 à 3 % des écoutes seulement, et jusqu'à 85 % de ces écoutes étaient frauduleuses en 2025, faites par des robots pour toucher des droits.",
      "La recherche en ligne en porte le poids. En mars 2024, Google a étendu sa règle contre le spam à toute page produite en masse pour se classer, quel que soit l'outil, et annonçait ensuite 45 % de contenu peu original en moins dans ses résultats. Un moteur doit désormais trier ce qui a été écrit pour toi de ce qui a été écrit pour lui."
    ],
    then: "Quand Simon Willison défend le mot, en mai 2024, il parle d'un phénomène que surtout les gens du métier savent repérer. En décembre 2025, Merriam-Webster en fait son mot de l'année, et chez Deezer la part des envois générés est passée de 10 % en janvier 2025 à plus de la moitié en juin 2026.",
    office: [
      {who: "q", text: "On peut sortir nos deux cents articles de blog SEO avec l'IA ce trimestre ?"},
      {who: "a", text: "Les produire, oui, mais Google vise depuis mars 2024 les pages faites en masse pour se classer, quel que soit l'outil ; publiez-en moins, relus par quelqu'un qui connaît le sujet, avec ce que vous êtes seuls à savoir."}
    ],
    avoid: "« Tout ce qui est fait avec l'IA, c'est du slop. » Le mot vise le contenu que personne n'a demandé ni relu ; un texte généré, vérifié et utile n'en est pas, et un texte humain bâclé pour le référencement en a tous les défauts.",
    video: null,
    sources: [
      {label: "Simon Willison, Slop is the new name for unwanted AI-generated content, 8 mai 2024 (comparaison avec le spam, tweet de @deepfates)", url: "https://simonwillison.net/2024/May/8/slop/"},
      {label: "Wikipédia, AI slop (usage du mot sur 4chan, Hacker News et YouTube vers 2022)", url: "https://en.wikipedia.org/wiki/AI_slop"},
      {label: "NBC News, Merriam-Webster names 'slop' as its 2025 word of the year, 15 décembre 2025 (définition)", url: "https://www.nbcnews.com/news/us-news/merriam-webster-word-of-the-year-2025-rcna247864"},
      {label: "NPR, How an AI-generated summer reading list got published in major newspapers, 20 mai 2025 (cinq titres réels sur quinze, Tidewater Dreams, Marco Buscaglia)", url: "https://www.npr.org/2025/05/20/nx-s1-5405022/fake-summer-reading-list-ai"},
      {label: "Kapwing, AI Slop Report: The Global Rise of Low-Quality AI Videos, 28 novembre 2025 (104 Shorts de slop sur les 500 premiers d'un compte neuf, données d'octobre 2025)", url: "https://www.kapwing.com/blog/ai-slop-report-the-global-rise-of-low-quality-ai-videos/"},
      {label: "Deezer Newsroom, AI music exceeds 50 percent of daily uploads, juillet 2026 (90 000 morceaux par jour, 1 à 3 % des écoutes, jusqu'à 85 % d'écoutes frauduleuses en 2025). Calcul de l'Imagine : 90 000 x 3 min = 270 000 min = 4 500 h = 187,5 jours ; 187,5 x 90 000 = 16,9 millions", url: "https://newsroom-deezer.com/2026/07/ai-music-exceeds-50-percent-daily-uploads-deezer/"},
      {label: "TechCrunch, Music streamer Deezer says more than 50% of daily uploads are AI-generated, 21 juillet 2026 (10 % des envois en janvier 2025)", url: "https://techcrunch.com/2026/07/21/music-streamer-deezer-says-more-than-50-of-daily-uploads-are-ai-generated/"},
      {label: "Google, New ways we're tackling spammy, low-quality content on Search, 5 mars 2024, mis à jour en avril (scaled content abuse, 45 % de contenu peu original en moins)", url: "https://blog.google/products/search/google-search-update-march-2024/"}
    ]
  },
  {
    id: "vibe-coding",
    status: "live",
    title: "Vibe coding",
    en: "Vibe coding",
    aliases: ["vibecoding", "vibe code", "vibe coder"],
    aliasesFr: [],
    jargon: [
      {say: "Accept All", means: "le bouton qui applique d'un coup toutes les modifications proposées par l'IA ; Karpathy disait le presser à chaque fois, sans lire"},
      {say: "agentic engineering", means: "le nom que Karpathy préfère depuis février 2026 pour le travail professionnel avec des agents, où ils écrivent le code et où toi tu supervises"},
      {say: "app builder", means: "un outil comme Lovable, Replit ou v0 qui fabrique une application entière à partir d'une description en langage courant"},
      {say: "RLS", means: "Row Level Security, la règle de base de données qui dit quel utilisateur peut lire quelle ligne ; c'est elle qui manquait aux applications Lovable exposées en 2025"}
    ],
    cat: "methode",
    links: ["loop", "agent", "harness", "mythe-agent-autonome", "llm"],
    solutions: [
      {name: "Lovable", kind: "générateur d'applications", url: "https://docs.lovable.dev/"},
      {name: "Replit", kind: "générateur d'applications", url: "https://replit.com/"},
      {name: "v0 (Vercel)", kind: "générateur d'applications", url: "https://v0.app/"},
      {name: "Cursor", kind: "éditeur de code", url: "https://cursor.com/"},
      {name: "Claude Code", kind: "agent de code", url: "https://claude.com/product/claude-code"},
      {name: "Cline", kind: "agent de code open source", url: "https://github.com/cline/cline"}
    ],
    short: "Le vibe coding consiste à faire écrire un programme par une IA en lui décrivant ce qu'on veut en langage courant, puis à accepter ses modifications sans lire le code, en jugeant seulement si le résultat a l'air de marcher.",
    image: "Tu fredonnes un air au groupe, il le joue, tu dis « plus de basse » et il remonte la basse, sans que tu aies jamais regardé la partition ni la console. Le groupe joue le rôle de l'agent, la partition celui du code. Pour une maquette du dimanche, c'est un bonheur ; pour sortir l'album, quelqu'un devra relire la partition mesure par mesure.",
    imagineForm: "B",
    imagine: "Commande à un chatbot un minuteur pomodoro en un seul fichier HTML, colle sa réponse dans un fichier minuteur.html et ouvre-le dans ton navigateur ; il y a de bonnes chances qu'il marche du premier coup. Cherche maintenant, dans le fichier, la ligne qui déclenche la sonnerie. Si tu gardes le minuteur sans l'avoir trouvée, tu fais exactement ce que décrivait Karpathy.",
    full: [
      "Le mot vient d'un tweet d'Andrej Karpathy, membre fondateur d'OpenAI et ancien responsable de l'IA chez Tesla, publié le 2 février 2025. Il y décrit une façon de coder où l'on se laisse porter et où l'on oublie que le code existe. Il parle à son outil au lieu de taper, clique toujours sur « Accept All », ne lit plus les modifications et recolle les messages d'erreur sans un mot. Il ajoutait que c'était bien pour des projets jetables du week-end.",
      "Le mot a vite dépassé son auteur. En mars 2025, Jared Friedman, associé de Y Combinator, annonçait que pour un quart des start-up de la promotion d'hiver, 95 % du code avait été écrit par l'IA, et le dictionnaire Collins l'a élu mot de l'année 2025. Des outils comme Lovable, Replit ou v0 fabriquent désormais une application entière à partir d'une simple description.",
      "Le risque se loge dans ce que personne ne lit. En mars 2025, le développeur Matt Palmer a découvert que des applications générées par Lovable laissaient leur base de données ouverte. Sur 1 645 projets analysés, 170 exposaient des adresses mail, des clés d'API ou des montants de dettes, faute d'une règle d'accès que personne n'avait vérifiée. Lovable conteste en partie, en estimant que la protection des données revient à chaque client.",
      "Le problème dépasse un outil. En juillet 2025, Veracode a fait écrire du code à plus de 100 modèles sur des tâches de test et trouvé une faille de sécurité dans 45 % des cas, sans que les modèles récents ou plus gros fassent mieux.",
      "Le vibe coding est une loop sans vérification, où la seule question posée à chaque tour est « ça a l'air de marcher ? ». Le 4 février 2026, un an après son tweet, Karpathy notait que coder avec des agents devenait de plus en plus le mode de travail par défaut des professionnels, avec plus de supervision et de contrôle, et proposait de l'appeler agentic engineering. La différence tient au harness, aux tests et aux relectures qui vérifient ce que l'agent a écrit."
    ],
    then: "En février 2025, Karpathy réservait le vibe coding aux projets jetables, parce que les modèles marchaient « presque ». En février 2026, il constate que coder avec des agents devient le mode de travail par défaut des professionnels, et c'est le travail de supervision qui a reçu un nouveau nom, pendant que vibe coding continue de désigner la version sans relecture.",
    office: [
      {who: "q", text: "Le stagiaire a monté notre outil de réservation en vibe coding en deux jours, on le met en ligne ?"},
      {who: "a", text: "Fais d'abord vérifier qui peut lire quoi dans la base et où sont rangées les clés d'API, puisque c'est exactement ce qui manquait aux 170 applications Lovable exposées en 2025."}
    ],
    avoid: "« Avec le vibe coding, plus besoin de savoir coder. » Pour une maquette, c'est vrai ; pour un outil qui stocke des données de clients, quelqu'un doit savoir lire ce que l'IA a écrit, ou au moins faire tourner les tests et les contrôles de sécurité qui le lisent à sa place.",
    video: null,
    sources: [
      {label: "Andrej Karpathy sur X, 2 février 2025 : « There's a new kind of coding I call \"vibe coding\" » (Accept All, projets jetables du week-end)", url: "https://x.com/karpathy/status/1886192184808149383"},
      {label: "Andrej Karpathy sur X, 4 février 2026 : rétrospective d'un an, « agentic engineering », plus de supervision", url: "https://x.com/karpathy/status/2019137879310836075"},
      {label: "TechCrunch, A quarter of startups in YC's current cohort have codebases that are almost entirely AI-generated, 6 mars 2025 (Jared Friedman, 95 % du code)", url: "https://techcrunch.com/2025/03/06/a-quarter-of-startups-in-ycs-current-cohort-have-codebases-that-are-almost-entirely-ai-generated/"},
      {label: "RTÉ, Collins' Word of the Year for 2025 revealed, 6 novembre 2025", url: "https://www.rte.ie/entertainment/2025/1106/1542331-collins-word-of-the-year-for-2025-revealed/"},
      {label: "Matt Palmer, Statement on CVE-2025-48757, 2025 (découverte le 20 mars 2025, 170 projets vulnérables sur 1 645, données exposées)", url: "https://mattpalmer.io/posts/statement-on-CVE-2025-48757/"},
      {label: "NIST, National Vulnerability Database, CVE-2025-48757, publiée le 30 mai 2025 (règle RLS insuffisante, contestation de Lovable)", url: "https://nvd.nist.gov/vuln/detail/CVE-2025-48757"},
      {label: "Veracode, Insights from the 2025 GenAI Code Security Report, 30 juillet 2025 (45 % de code avec faille, plus de 100 modèles, pas de progrès avec la taille)", url: "https://www.veracode.com/blog/genai-code-security-report/"}
    ]
  },
  {
    id: "paradoxe-de-jevons",
    status: "live",
    title: "Paradoxe de Jevons",
    en: "Jevons paradox",
    aliases: ["Jevons effect", "Jevons' paradox"],
    aliasesFr: [],
    jargon: [
      {say: "Jevons paradox strikes again", means: "le tweet de Satya Nadella, patron de Microsoft, le 27 janvier 2025, en pleine panique DeepSeek : plus l'IA devient efficace, plus on va s'en servir"},
      {say: "effet rebond", means: "une partie de l'économie permise par un gain d'efficacité est reprise par une consommation plus forte ; le paradoxe de Jevons est le cas où le rebond dépasse l'économie"},
      {say: "price elasticity", means: "l'élasticité-prix de la demande, c'est-à-dire de combien la demande grimpe quand le prix baisse ; sans demande élastique, pas de paradoxe"},
      {say: "cost per token", means: "le prix d'un token à l'API ; c'est lui qui chute, pendant que la facture totale peut monter"}
    ],
    cat: "ecosysteme",
    links: ["cout-d-une-requete", "inference", "compute", "modeles-de-raisonnement", "open-weights", "ai-slop"],
    short: "Le paradoxe de Jevons décrit le cas où un gain d'efficacité, au lieu de faire baisser la consommation d'une ressource, la fait augmenter, parce que la ressource devenue moins chère trouve beaucoup plus d'usages.",
    image: "Le jour où la maison de disques divise par dix le prix de l'heure de studio, l'équivalent du prix du token, aucun groupe ne réserve dix fois moins d'heures pour le même album. On enregistre des démos, des versions acoustiques, des remix, et le studio n'a jamais été aussi plein, ni la facture totale aussi haute.",
    imagineForm: "D",
    imagine: "« Le prix du token a encore été divisé par dix, notre facture d'IA va baisser ? », demande la directrice financière en janvier. Le directeur technique lui répond : « Maintenant que ça ne coûte presque rien, on fait relire chaque contrat par trois agents. »",
    full: [
      "En 1865, l'économiste William Stanley Jevons publie The Coal Question pour une Angleterre qui craint de manquer de charbon. Il y écrit que croire qu'un usage plus économe du combustible réduit la consommation est une confusion d'idées, et que la vérité est exactement l'inverse. En Écosse, le charbon nécessaire pour produire une tonne de fonte était tombé à moins d'un tiers, et la consommation totale avait été multipliée par dix.",
      "Son mécanisme tient en une chaîne. Le haut-fourneau qui brûle moins de charbon rapporte davantage, attire des capitaux, fait baisser le prix de la fonte, la demande de fonte grimpe, et les fourneaux supplémentaires finissent par brûler plus que ce que chacun a économisé.",
      "Le paradoxe est revenu d'un coup en janvier 2025. DeepSeek, un labo chinois, venait de publier R1, un modèle de raisonnement aux poids ouverts présenté comme bien moins gourmand en calcul, et le 27 janvier l'action Nvidia a perdu près de 17 %, soit 589 milliards de dollars de valeur en une séance. Dans la nuit, avant l'ouverture de la Bourse, Satya Nadella tweetait « Jevons paradox strikes again! », pour dire qu'une IA plus efficace serait une IA dont l'usage explose.",
      "Les chiffres de 2025 vont plutôt dans son sens. Selon Epoch AI, le prix pour atteindre un niveau de performance donné a été divisé chaque année par 9 à 900 selon la tâche. De son côté, OpenRouter, qui aiguille les requêtes vers plus de 300 modèles, est passé d'environ 10 000 milliards de tokens par an à plus de 100 000 milliards à la mi-2025. Les modèles de raisonnement, qui écrivent longuement avant de répondre, ajoutent leur part à la note.",
      "Le paradoxe n'a pourtant rien d'une loi. Il ne joue que si la demande grimpe plus vite que le prix ne baisse, et la nourriture, devenue bien moins chère au XXe siècle grâce aux gains de l'agriculture, n'a pas vu sa demande suivre. Le travail agricole a fondu à la place, puisque les États-Unis sont passés de 40 % d'Américains employés dans l'agriculture en 1900 à moins de 2 % en 2024. Pour l'IA, le pari de Nadella porte sur l'appétit des utilisateurs, et pour l'instant les volumes de tokens lui donnent raison."
    ],
    office: [
      {who: "q", text: "Les prix des modèles baissent chaque trimestre, notre budget IA va fondre ?"},
      {who: "a", text: "Le prix unitaire baissera, mais une équipe qui paie moins chaque token trouve vite de quoi en consommer beaucoup plus ; budgète sur le volume d'usage que tu prévois, pas sur le tarif affiché."}
    ],
    avoid: "« DeepSeek a prouvé qu'on aura besoin de moins de puces. » Un modèle moins coûteux abaisse le prix de chaque usage, et l'histoire de Jevons dit que c'est souvent le nombre d'usages qui l'emporte ; la question reste ouverte, mais la consommation de tokens a continué de grimper en 2025.",
    video: null,
    sources: [
      {label: "W. S. Jevons, The Coal Question, chapitre VII « Of the Economy of Fuel », Econlib (confusion d'idées, consommation de charbon par tonne de fonte réduite à moins d'un tiers et consommation totale multipliée par dix en Écosse, mécanisme du haut-fourneau)", url: "https://www.econlib.org/library/YPDBooks/Jevons/jvnCQ.html?chapter_num=9"},
      {label: "Wikipédia, Jevons paradox (condition de demande élastique, contre-exemple de l'alimentation, emploi agricole de 40 % en 1900 à moins de 2 % en 2024)", url: "https://en.wikipedia.org/wiki/Jevons_paradox"},
      {label: "Satya Nadella sur X, 27 janvier 2025, 5 h 48 UTC : « Jevons paradox strikes again! »", url: "https://x.com/satyanadella/status/1883753899255046301"},
      {label: "Tom's Hardware, Nvidia loses $589 billion in market cap, broad stock plunge triggered by DeepSeek AI release, 28 janvier 2025 (près de 17 % de baisse le 27 janvier)", url: "https://www.tomshardware.com/tech-industry/artificial-intelligence/nvidia-loses-usd589-billion-in-market-cap-broad-stock-plunge-triggered-by-deepseek-ai-release"},
      {label: "Epoch AI, LLM inference prices have fallen rapidly but unequally across tasks, 12 mars 2025 (division par 9 à 900 par an selon la tâche)", url: "https://epoch.ai/data-insights/llm-inference-price-trends"},
      {label: "a16z et OpenRouter, State of AI: An Empirical 100 Trillion Token Study, 4 décembre 2025 (d'environ 10 000 milliards de tokens par an à plus de 100 000 milliards à la mi-2025, plus de 300 modèles)", url: "https://a16z.com/state-of-ai/"}
    ]
  },
  {
    id: "effet-reine-rouge",
    status: "live",
    title: "Effet Reine rouge",
    en: "Red Queen effect",
    aliases: ["Red Queen hypothesis", "Red Queen dynamics", "Red Queen's race"],
    aliasesFr: ["hypothèse de la Reine rouge", "course de la Reine rouge"],
    jargon: [
      {say: "Red Queen dynamics", means: "une situation où deux camps s'adaptent l'un à l'autre sans arrêt, de sorte que chacun progresse sans prendre d'avance durable"},
      {say: "arms race", means: "course aux armements, l'expression voisine et plus militaire, entre attaquants et défenseurs ou entre générateurs et détecteurs"},
      {say: "self-play", means: "un système qui s'entraîne en affrontant ses propres versions précédentes, ce qui fabrique une course de la Reine rouge en laboratoire"},
      {say: "red teaming", means: "attaquer volontairement un système pour trouver ses failles avant qu'un vrai adversaire ne le fasse"}
    ],
    cat: "ecosysteme",
    links: ["benchmaxxing", "evals", "prompt-injection", "modeles-frontiere"],
    short: "L'effet Reine rouge décrit une compétition où chaque camp doit progresser sans cesse rien que pour garder sa place, parce que ses adversaires progressent aussi ; l'idée vient de la biologie de l'évolution, et la recherche en IA l'applique aux systèmes qu'elle fait s'affronter.",
    image: "Le videur de la salle, c'est le détecteur, et les faussaires de billets jouent les générateurs. Le videur apprend à repérer les faux, les faussaires impriment mieux, et le videur apprend encore. Au bout d'un an, les uns comme les autres sont devenus excellents, et la proportion de faux billets à l'entrée n'a presque pas bougé.",
    imagineForm: "D",
    imagine: "« Notre détecteur repère 99 % des images faites par le générateur de juin », annonce fièrement l'équipe sécurité en septembre. Une stagiaire lève la main : « Et celles du générateur sorti la semaine dernière ? »",
    full: [
      "Le nom vient de De l'autre côté du miroir, de Lewis Carroll (1871), où la Reine rouge explique à Alice que, dans son pays, il faut courir de toutes ses forces pour rester au même endroit. En 1973, le biologiste Leigh Van Valen en a tiré une hypothèse, dans « A new evolutionary law », premier article d'une revue qu'il avait fondée pour pouvoir le publier.",
      "Van Valen avait remarqué que la probabilité qu'un groupe d'espèces s'éteigne ne dépend pas de son ancienneté et reste à peu près constante sur des millions d'années. Il l'expliquait par une course permanente, où chaque progrès d'une espèce, un prédateur plus rapide ou un parasite plus rusé, dégrade le milieu des autres, qui doivent évoluer à leur tour pour ne pas reculer.",
      "Dans l'IA, l'image sert d'abord à la sécurité. En janvier 2025, Christian Borst, directeur technique de Vectra AI pour l'Europe, le Moyen-Orient et l'Afrique, comparait à la course de la Reine rouge le face-à-face entre attaques et défenses dopées à l'IA, où rester immobile revient à prendre du retard.",
      "La recherche en a fait une méthode. En janvier 2026, Sakana AI et le MIT ont publié Digital Red Queen, où un modèle de langage écrit des programmes guerriers pour Core War, un jeu de programmation de 1984, et où chaque nouveau guerrier doit battre tous les précédents. Les gagnants deviennent plus robustes face à des adversaires écrits par des humains qu'ils n'ont jamais rencontrés, et les auteurs y voient un terrain d'essai pour la cybersécurité et le red teaming.",
      "En juin 2026, la Red Queen Gödel Machine a appliqué la même idée à l'évaluation, en faisant évoluer l'évaluateur en même temps que l'agent qui s'améliore, au lieu de le juger sur une grille figée. On peut y lire une parade au benchmaxxing, puisqu'un test qui ne bouge plus finit par récompenser l'entraînement au test.",
      "L'image de Carroll a sa limite, car les deux camps ne font pas du surplace et deviennent bien meilleurs ; c'est leur écart qui reste stable. Un détecteur ou un filtre de sécurité qu'on cesse de mettre à jour recule donc, sans avoir changé d'une ligne."
    ],
    office: [
      {who: "q", text: "On a acheté un détecteur de textes générés l'an dernier, le problème est réglé ?"},
      {who: "a", text: "Il était réglé contre les modèles de l'an dernier ; demande à l'éditeur à quel rythme il se met à jour, et teste-le toi-même sur des textes écrits avec les derniers modèles."}
    ],
    avoid: "« La Reine rouge, c'est quand personne n'avance. » Tout le monde avance, et vite ; c'est la position relative qui ne bouge pas, et celui qui s'arrête recule.",
    video: null,
    sources: [
      {label: "Wikipédia, Red Queen hypothesis (Van Valen, A new evolutionary law, Evolutionary Theory, 1973 ; probabilité d'extinction constante ; réplique de la Reine rouge dans Through the Looking-Glass)", url: "https://en.wikipedia.org/wiki/Red_Queen_hypothesis"},
      {label: "TechInformed, 2025 Informed: Cybersecurity and AI, 16 janvier 2025 (Christian Borst, Vectra AI : « Like the Red Queen's race in Through the Looking-Glass »)", url: "https://techinformed.com/2025-informed-cybersecurity-and-ai/"},
      {label: "Kumar et al. (Sakana AI, MIT), Digital Red Queen: Adversarial Program Evolution in Core War with LLMs, 6 janvier 2026 (guerriers plus robustes, cybersécurité)", url: "https://arxiv.org/abs/2601.03335"},
      {label: "Sakana AI, Digital Red Queen, 8 janvier 2026 (red teaming automatisé, environnement isolé)", url: "https://sakana.ai/drq/"},
      {label: "Iacob et al., The Red Queen Gödel Machine: Co-Evolving Agents and Their Evaluators, 24 juin 2026", url: "https://arxiv.org/abs/2606.26294"}
    ]
  }
];

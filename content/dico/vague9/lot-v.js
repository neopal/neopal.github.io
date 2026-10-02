// Lexique IA, vague 9, lot V (histoire et culture). Format identique à lexique/terms.js, sans `num`.
// imagineForm : forme de l'« Imagine » (content/dico/univers.md, section « Les formes de l'Imagine »).
// Faits et chiffres relevés le 2 octobre 2026 sur les pages citées dans `sources`.
module.exports = [
  {
    id: "systemes-experts",
    status: "live",
    title: "Systèmes experts",
    en: "Expert systems",
    aliases: ["expert system", "expert systems", "symbolic AI", "GOFAI", "good old-fashioned AI", "rule-based system", "knowledge-based system", "neurosymbolic AI"],
    aliasesFr: ["système expert", "IA symbolique", "système à base de règles", "système à base de connaissances", "IA neurosymbolique"],
    jargon: [
      {say: "if-then rules", means: "les règles « si... alors » d'un système expert, une condition et une conclusion, écrites une à une avec des spécialistes du domaine"},
      {say: "knowledge engineer", means: "l'ingénieur de la connaissance, qui interrogeait les experts pendant des mois pour traduire leur savoir en règles"},
      {say: "inference engine", means: "le moteur d'inférence, le programme qui enchaîne les règles jusqu'à une conclusion, séparé de la base qui les contient"},
      {say: "neurosymbolic", means: "neurosymbolique, se dit d'un système qui combine un réseau de neurones, comme un LLM, et un moteur de règles ou de logique formelle"},
    ],
    cat: "ecosysteme",
    links: ["lecon-amere", "deep-learning", "reseau-de-neurones", "effet-ia", "llm", "hallucination"],
    short:
      "Un système expert est un programme qui applique des règles « si... alors » écrites à la main avec des spécialistes ; c'était l'IA dominante des années 1980.",
    image:
      "Remonte quarante ans en arrière dans la régie, et tu n'y trouves pas de groupe qui apprend en écoutant. Il y a un classeur de milliers de fiches rédigées par les meilleurs ingés son, du genre « si la voix sature et que la basse couvre la grosse caisse, baisse la basse », et un automate qui les applique une à une. Il mixe sans fatigue tout ce que le classeur prévoit, puis reste muet devant le premier instrument que personne n'avait décrit.",
    imagineForm: "A",
    imagine:
      "Doug Lenat, fondateur de Cyc, le projet lancé en 1984 pour écrire à la main le sens commun en règles logiques, estimait en 2023 que sa base avait coûté 2 000 années de travail à temps plein. Une personne seule aurait dû s'y mettre en l'an 23, sous l'empereur Tibère, pour la terminer en 2023, avec entre autres la règle qui précise que deux chevaux différents ne partagent pas une patte.",
    full: [
      "Vers 1965, l'équipe d'Edward Feigenbaum, à Stanford, renonce à chercher une intelligence générale et décide de mettre en règles le savoir d'un spécialiste dans un domaine étroit. MYCIN, écrit à Stanford au début des années 1970, identifiait la bactérie responsable d'une infection grave et proposait un antibiotique à partir d'environ 600 règles, après une longue série de questions posées au médecin. Dans une évaluation publiée en 1979, des infectiologues jugeaient ses prescriptions acceptables dans 65 % des cas, contre 42,5 % à 62,5 % pour celles de cinq enseignants de la faculté de médecine.",
      "MYCIN n'a pourtant jamais servi à l'hôpital, en partie parce qu'il fallait lui taper à la main tout le dossier du patient. Le premier grand succès commercial est venu de XCON, mis en service en 1980 chez Digital Equipment Corporation pour choisir les composants des ordinateurs VAX commandés par les clients. Il a fini par compter environ 2 500 règles, et l'entreprise estimait qu'il lui faisait économiser 25 millions de dollars par an. Dans les années 1980, deux tiers des entreprises du classement Fortune 500 utilisaient la technique, et le Japon lançait en 1982 un programme d'ordinateurs dédiés à la logique qui coûtera environ 320 millions de dollars.",
      "Les règles se sont révélées chères et fragiles. Il fallait arracher leur temps à des experts très demandés pour les écrire, et un système pouvait commettre des erreurs grotesques dès qu'un cas sortait de ce qu'elles prévoyaient, sans jamais apprendre de ses erreurs. Au début des années 1990, XCON lui-même coûtait trop cher à maintenir. Entre-temps, en 1987, le marché des machines Lisp, les ordinateurs spécialisés sur lesquels tournaient beaucoup de ces systèmes, s'était effondré, ouvrant le deuxième « hiver de l'IA ».",
      "Les règles n'ont pas disparu pour autant. Les moteurs de règles des logiciels de gestion de SAP ou d'Oracle en descendent, et les LLM, qui tirent leurs régularités de textes au lieu de les recevoir d'un expert, ont pris la place que visait l'IA symbolique. Les deux approches se recombinent désormais. En août 2025, Amazon a ouvert à tous ses clients les Automated Reasoning checks, qui traduisent des règles métier en logique formelle pour vérifier avec elles les réponses d'un LLM et repérer celles qui les contredisent.",
    ],
    office: [
      {who: "q", text: "Un moteur de règles, c'est dépassé maintenant qu'on a des LLM ?"},
      {who: "a", text: "Pas pour ce qui doit être exact et auditable, comme un barème de remboursement ou une règle de conformité. Laisse le LLM comprendre la demande écrite en langage courant, et confie la décision à la règle, qui donne la même réponse à chaque fois et dit laquelle s'est appliquée."},
    ],
    avoid:
      "« Les systèmes experts ont été un échec. » XCON a fait économiser des millions de dollars par an à DEC, et ses descendants tournent encore dans les logiciels de gestion ; la promesse qui a échoué, c'est celle d'atteindre une intelligence générale à force d'ajouter des règles.",
    video: null,
    sources: [
      {label: "Wikipédia, Expert system (introduction vers 1965 par le Stanford Heuristic Programming Project d'Edward Feigenbaum ; règles si-alors ; deux tiers du Fortune 500 dans les années 1980 ; problème de l'acquisition des connaissances ; intégration des moteurs de règles chez SAP, Siebel et Oracle)", url: "https://en.wikipedia.org/wiki/Expert_system"},
      {label: "Wikipédia, Mycin (Stanford, début des années 1970 ; bactéries des infections graves et antibiotiques ; environ 600 règles ; acceptabilité de 65 % contre 42,5 % à 62,5 % pour cinq enseignants, Yu et al., JAMA, 1979 ; jamais utilisé en pratique, saisie manuelle des données du patient)", url: "https://en.wikipedia.org/wiki/Mycin"},
      {label: "Wikipédia, Xcon (R1, John McDermott, Carnegie Mellon ; sélection des composants des VAX de DEC ; en service en 1980 ; environ 2 500 règles ; économie estimée à 25 millions de dollars par an)", url: "https://en.wikipedia.org/wiki/Xcon"},
      {label: "Wikipédia, AI winter (effondrement du marché des machines Lisp en 1987 ; au début des années 1990, XCON trop cher à maintenir, systèmes « brittle » qui font des erreurs grotesques sur des entrées inhabituelles et n'apprennent pas)", url: "https://en.wikipedia.org/wiki/AI_winter"},
      {label: "Wikipédia, Fifth Generation Computer Systems (programme du MITI lancé en 1982, programmation logique ; un peu moins de 57 milliards de yens, environ 320 millions de dollars, de 1982 à 1994)", url: "https://en.wikipedia.org/wiki/Fifth_Generation_Computer_Systems"},
      {label: "Wikipédia, Cyc (projet lancé en juillet 1984 par Douglas Lenat à MCC, base de connaissances du sens commun écrite à la main)", url: "https://en.wikipedia.org/wiki/Cyc"},
      {label: "Doug Lenat et Gary Marcus, Getting from Generative AI to Trustworthy AI: What LLMs might learn from Cyc, 31 juillet 2023 (« four decades, 2000 person-years » pour la base de Cyc ; exemple de l'axiome « different horses don't share a leg ». Calcul de l'Imagine : 2023 - 2 000 = an 23, sous Tibère, empereur de 14 à 37)", url: "https://arxiv.org/abs/2308.04445"},
      {label: "AWS, Automated Reasoning checks is now available in Amazon Bedrock Guardrails, 6 août 2025 (vérification formelle des réponses des modèles au regard de règles et de politiques définies)", url: "https://aws.amazon.com/about-aws/whats-new/2025/08/automated-reasoning-checks-amazon-bedrock-guardrails"},
    ],
  },
  {
    id: "effet-ia",
    status: "live",
    title: "Effet IA",
    en: "AI effect",
    aliases: ["AI effect", "Tesler's theorem", "moving the goalposts", "AI is whatever hasn't been done yet", "AI washing"],
    aliasesFr: ["effet de l'IA", "théorème de Tesler", "déplacer les poteaux"],
    jargon: [
      {say: "moving the goalposts", means: "déplacer les poteaux, relever la barre de ce qui compte comme intelligent chaque fois qu'une machine l'atteint"},
      {say: "AI is whatever hasn't been done yet", means: "l'IA, c'est tout ce qui n'a pas encore été fait, la version courante du théorème de Tesler ; Larry Tesler disait en fait que l'intelligence est ce que les machines n'ont pas encore fait"},
      {say: "AI washing", means: "le mouvement inverse, qui consiste à coller l'étiquette IA sur un produit qui n'en contient pas, sanctionné en mars 2024 par le gendarme boursier américain"},
    ],
    cat: "ecosysteme",
    links: ["agi", "systemes-experts", "intelligence-en-dents-de-scie", "mythe-ia-comprend", "lecon-amere", "arc-agi"],
    short:
      "L'effet IA désigne la tendance à ne plus appeler intelligence ce qu'une machine sait faire, dès qu'elle le fait de façon fiable et banale.",
    image:
      "Le premier accordeur automatique branché dans la régie a eu droit aux regards qu'on réserve aux oreilles d'exception, puisqu'il entendait des écarts de justesse que personne ne percevait. Quelques années plus tard, c'est un boîtier qu'on range dans la flight case sans y penser, et l'admiration est passée à ce que la machine ne fait pas encore, comme improviser un solo. L'effet IA tient dans ce déménagement du mot « intelligent » vers la prochaine chose qu'on ne sait pas automatiser.",
    imagineForm: "E",
    imagine:
      "En 1950, dans l'article où il invente son jeu de l'imitation, Alan Turing donne comme exemples de questions à poser au correspondant caché une addition, 34 957 plus 70 764, et un problème d'échecs. En 2025, quand des chercheurs de l'université de Californie à San Diego rejouent le même jeu de cinq minutes avec GPT-4.5, seuls 12 % des interrogateurs posent encore ce genre de question, et l'un des indices qui les mènent le plus souvent au bon verdict est qu'un correspondant ne sait pas répondre, donc qu'il doit être humain.",
    full: [
      "Les chercheurs ont remarqué le phénomène bien avant de lui donner un nom. En 1971, Donald Michie rapportait la définition de son collègue Bertram Raphael, pour qui l'IA rassemblait les problèmes qu'on ne savait pas encore bien résoudre par ordinateur, et le magazine Fortune citait en mai 1982 un dicton des laboratoires plus sec, « si c'est utile, ce n'est pas de l'IA ». La version la plus reprise vient de l'informaticien Larry Tesler, qui disait vers 1970 que l'intelligence est tout ce que les machines n'ont pas encore fait, et que Douglas Hofstadter a cité en 1979 dans Gödel, Escher, Bach.",
      "Le jeu d'échecs, la lecture de caractères imprimés ou la dictée vocale ont tour à tour passé pour des preuves d'intelligence, puis ont été rangés, une fois au point, parmi les techniques ordinaires. Les systèmes experts des années 1980 ont connu le même sort, puisque leurs règles ont fini dans les moteurs de règles des logiciels de gestion, où plus personne ne parle d'IA. Certains philosophes contestent d'ailleurs le mot de biais, en jugeant qu'on découvre à chaque fois une vraie différence entre la tâche réussie et l'intelligence qu'on croyait y voir.",
      "Les LLM ont rejoué la scène en accéléré. Turing prédisait en 1950 que dans une cinquantaine d'années, un interrogateur moyen n'aurait pas plus de 70 % de chances de démasquer la machine après cinq minutes de questions. Dans l'étude de mars 2025, GPT-4.5, à qui l'on avait demandé de jouer un jeune humain, a été pris pour l'humain dans 73 % des parties, plus souvent que les vrais humains face à lui, et la discussion s'est aussitôt déplacée vers ce que le test mesure vraiment ; ses auteurs écrivent eux-mêmes qu'il teste la ressemblance avec un humain plus que l'intelligence.",
      "Le mouvement inverse existe aussi, quand l'étiquette IA est collée sur ce qui n'en contient pas. En mars 2024, la SEC, le gendarme boursier américain, a infligé 400 000 dollars d'amendes à deux conseillers en placement, Delphia et Global Predictions, qui vantaient une IA qu'ils n'utilisaient pas, ce que son président Gary Gensler a appelé de l'AI washing.",
    ],
    office: [
      {who: "q", text: "Le client trouve que notre outil de tri des mails, ce n'est pas vraiment de l'IA. Il a raison ?"},
      {who: "a", text: "Laisse-lui le mot et parle-lui du résultat. Combien de mails l'outil trie-t-il correctement par jour, combien en rate-t-il, et combien d'heures son équipe y gagne : c'est sur ces chiffres qu'il décidera de le garder."},
    ],
    avoid:
      "« Ce qu'une machine sait faire ne demandait pas vraiment d'intelligence. » On a dit la même chose des échecs, de la dictée et du test de Turing, chaque fois après coup ; pour que le débat soit honnête, il faut dire avant l'épreuve ce qu'une réussite prouverait, puis s'y tenir.",
    video: null,
    sources: [
      {label: "Alan Turing, Computing Machinery and Intelligence, Mind, octobre 1950 (exemples de questions : « Add 34957 to 70764 », un problème d'échecs ; prédiction : dans une cinquantaine d'années, pas plus de 70 % de chances d'identification correcte après cinq minutes de questions)", url: "https://redirect.cs.umbc.edu/courses/471/papers/turing.pdf"},
      {label: "Cameron Jones et Benjamin Bergen (UC San Diego), Large Language Models Pass the Turing Test, 31 mars 2025 (GPT-4.5 avec consigne de persona jugé humain dans 73 % des cas ; conversations de cinq minutes ; 12 % des participants posent des questions de connaissances et de raisonnement comme celles de Turing ; manquer de connaissances parmi les raisons les plus prédictives d'un verdict juste ; « a test of humanlikeness »)", url: "https://arxiv.org/abs/2503.23674"},
      {label: "Larry Tesler, Tesler's Theorem and other adages and coinages (vers 1970 : « Intelligence is whatever machines haven't done yet », souvent cité sous la forme « AI is whatever hasn't been done yet » ; repris par Hofstadter dans Gödel, Escher, Bach, 1979, p. 601)", url: "https://www.nomodes.com/larry-tesler-consulting/adages-and-coinages"},
      {label: "Quote Investigator, As Soon As It Works, No One Calls It AI Anymore, 20 juin 2024 (Bertram Raphael cité par Donald Michie en 1971 ; « If it's useful, it isn't AI », Fortune, 31 mai 1982 ; attribution à John McCarthy apparue seulement en 2011)", url: "https://quoteinvestigator.com/2024/06/20/not-ai/"},
      {label: "Wikipédia, AI effect (échecs, reconnaissance de caractères et reconnaissance vocale reclassés comme calcul ordinaire ; Deep Blue en 1997 ; interprétation philosophique selon laquelle le reclassement reflète de vraies distinctions)", url: "https://en.wikipedia.org/wiki/AI_effect"},
      {label: "Wikipédia, Expert system (dans les années 1990, le terme sort du vocabulaire informatique et les moteurs de règles deviennent des outils standard des suites de SAP, Siebel et Oracle)", url: "https://en.wikipedia.org/wiki/Expert_system"},
      {label: "SEC, SEC Charges Two Investment Advisers with Making False and Misleading Statements About Their Use of Artificial Intelligence, 18 mars 2024 (Delphia, 225 000 dollars, et Global Predictions, 175 000 dollars ; Gary Gensler : « Such AI washing hurts investors »)", url: "https://www.sec.gov/newsroom/press-releases/2024-36"},
    ],
  },
  {
    id: "explosion-de-l-intelligence",
    status: "live",
    title: "Explosion de l'intelligence",
    en: "Intelligence explosion",
    aliases: ["intelligence explosion", "recursive self-improvement", "RSI", "technological singularity", "singularity", "takeoff", "fast takeoff", "automated AI researcher"],
    aliasesFr: ["explosion d'intelligence", "auto-amélioration récursive", "singularité", "singularité technologique", "chercheur IA automatisé"],
    jargon: [
      {say: "RSI", means: "recursive self-improvement, l'auto-amélioration récursive, un système qui améliore celui qui le conçoit ; OpenAI emploie le sigle dans son point d'étape de septembre 2026"},
      {say: "takeoff", means: "le décollage, la vitesse à laquelle on passerait d'une IA de niveau humain à une IA très supérieure ; fast takeoff si la bascule est brutale, slow takeoff si elle s'étale"},
      {say: "automated AI researcher", means: "le chercheur en IA automatisé, un système capable de mener seul des projets de recherche, l'étape que les labos se fixent comme cible"},
      {say: "the singularity", means: "la singularité, le mot popularisé par l'écrivain Vernor Vinge à partir de 1983 pour le moment où des intelligences supérieures à la nôtre rendraient l'avenir imprévisible"},
    ],
    cat: "ecosysteme",
    links: ["agi", "lois-d-echelle", "alignement", "horizon-d-autonomie", "compute", "capacite-inexploitee"],
    short:
      "L'explosion de l'intelligence est l'hypothèse selon laquelle une IA capable d'améliorer la conception de l'IA déclencherait une boucle de progrès de plus en plus rapide.",
    image:
      "Confie la console au groupe lui-même. Une fois entraîné, il prend la place de l'ingé son et règle la console du groupe suivant, mieux et plus vite que lui, et ce nouveau groupe, plus doué, prépare à son tour le suivant en moins de temps encore. L'explosion de l'intelligence désigne cette boucle, et toute la question est de savoir si elle s'emballe ou si elle bute sur ce qui ne s'accélère pas, comme les heures de studio à louer et le courant pour les faire tourner.",
    imagineForm: "E",
    imagine:
      "Une équipe met un an à concevoir chaque nouveau modèle, et au bout de dix ans elle en est à la dixième version. Rejoue la scène en laissant chaque version concevoir la suivante deux fois plus vite qu'elle n'a été conçue elle-même. La première arrive au bout d'un an, la deuxième six mois plus tard, la troisième trois mois après, et toutes les suivantes tiennent avant la fin de la deuxième année.",
    full: [
      "L'idée a été posée en 1965 par le mathématicien Irving John Good, qui avait cassé des codes allemands avec Alan Turing à Bletchley Park. Une machine ultra-intelligente, écrivait-il, surpasserait l'homme dans toutes les activités intellectuelles, dont la conception de machines, et pourrait donc en concevoir de meilleures, ce qui déclencherait une « explosion de l'intelligence ». Elle serait ainsi « la dernière invention que l'homme ait besoin de faire, pourvu qu'elle soit assez docile pour nous dire comment la garder sous contrôle ».",
      "Good jugeait plus probable qu'improbable qu'une telle machine soit construite avant la fin du XXe siècle, ce qui ne s'est pas produit. Le raisonnement tient pourtant toujours sur un maillon précis, une IA qui fait elle-même de la recherche en IA. Dans le scénario AI 2027, publié en avril 2025 par Daniel Kokotajlo et quatre coauteurs, ce maillon apparaît en mars 2027 avec un programmeur surhumain et mène à une superintelligence en décembre, mais les auteurs ont précisé en novembre 2025 que 2027 n'était que leur année la plus probable et que leurs médianes étaient plus tardives.",
      "Les mesures de cette accélération restent rares et fragiles. Début 2025, l'organisme METR a mesuré que seize développeurs expérimentés mettaient 19 % de temps en plus avec les outils d'IA de l'époque, alors qu'ils se croyaient 20 % plus rapides. En février 2026, METR jugeait probable qu'ils aillent désormais plus vite, sans pouvoir dire de combien, parce que trop de développeurs refusaient de travailler sans IA pour servir de groupe témoin.",
      "Même lancée, la boucle peut buter sur ce qui ne s'écrit pas en code. Chaque modèle se fabrique dans des centres de données qu'il faut construire et alimenter, et OpenAI adossait en octobre 2025 son calendrier de recherche automatisée à 30 gigawatts d'infrastructure, soit environ 1 400 milliards de dollars d'engagements. Une IA qui améliore les algorithmes deux fois plus vite n'accélère pas pour autant la livraison des puces.",
    ],
    then:
      "Le maillon de la boucle est passé des essais aux calendriers des labos. Le 28 octobre 2025, Sam Altman annonçait qu'OpenAI visait un stagiaire de recherche automatisé pour septembre 2026 et un véritable chercheur automatisé pour mars 2028. Le 6 septembre 2026, l'entreprise affirmait avoir tenu la première échéance, avec 3,1 journées de travail d'agents pour chaque journée de travail humain dans sa recherche, tout en reconnaissant que plus de la moitié des tâches réussies de quatre à huit heures avaient encore demandé au moins une intervention humaine.",
    office: [
      {who: "q", text: "Si l'IA va bientôt s'améliorer toute seule, à quoi bon former l'équipe cette année ?"},
      {who: "a", text: "OpenAI elle-même vise un chercheur automatisé pour 2028, et ses agents ont encore besoin d'un humain sur plus de la moitié des tâches longues qu'ils réussissent. Ton équipe a plusieurs années de travail utile devant elle, et c'est elle qui saura juger ce que l'outil produit."},
    ],
    avoid:
      "« L'explosion de l'intelligence est une prédiction scientifique. » C'est une hypothèse, défendue par certains labos et contestée par d'autres chercheurs, dont aucune mesure ne montre encore le démarrage ; la seule date avancée par son inventeur, une machine ultra-intelligente avant 2000, est passée sans elle.",
    video: null,
    sources: [
      {label: "I. J. Good, Speculations Concerning the First Ultraintelligent Machine, Advances in Computers, vol. 6, 1965 (définition de la machine ultra-intelligente ; « intelligence explosion » ; « the last invention that man need ever make, provided that the machine is docile enough to tell us how to keep it under control » ; « more probable than not that, within the twentieth century »)", url: "https://languagelog.ldc.upenn.edu/myl/Good1964.pdf"},
      {label: "Wikipédia, I. J. Good (cryptologue à Bletchley Park avec Alan Turing ; à l'origine du concept d'explosion de l'intelligence ; conseiller de Stanley Kubrick pour 2001)", url: "https://en.wikipedia.org/wiki/I._J._Good"},
      {label: "Wikipédia, Technological singularity (terme popularisé par Vernor Vinge, d'abord dans Omni en 1983, puis dans The Coming Technological Singularity en 1993)", url: "https://en.wikipedia.org/wiki/Technological_singularity"},
      {label: "Kokotajlo, Alexander, Larsen, Lifland et Dean, AI 2027, 3 avril 2025 (programmeur surhumain en mars 2027, chercheur IA surhumain en août, superintelligence en décembre 2027 ; note du 22 novembre 2025 : 2027 était l'année modale, les médianes plus tardives)", url: "https://ai-2027.com/"},
      {label: "METR, Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity, 10 juillet 2025 (16 développeurs, tâches 19 % plus longues avec l'IA, ressenti de 20 % plus rapide)", url: "https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/"},
      {label: "METR, We are Changing our Developer Productivity Experiment Design, 24 février 2026 (accélération probable début 2026, mesure peu fiable car des développeurs refusent de travailler sans IA)", url: "https://metr.org/blog/2026-02-24-uplift-update/"},
      {label: "TechCrunch, Sam Altman says OpenAI will have a 'legitimate AI researcher' by 2028, 28 octobre 2025 (assistant de recherche de niveau stagiaire visé pour septembre 2026 ; 30 gigawatts d'infrastructure, 1 400 milliards de dollars d'engagements)", url: "https://techcrunch.com/2025/10/28/sam-altman-says-openai-will-have-a-legitimate-ai-researcher-by-2028/"},
      {label: "Help Net Security, OpenAI just hit a milestone on the road to self-improving AI, 7 septembre 2026 (objectif du stagiaire de recherche automatisé atteint ; 3,1 journées d'agents par journée humaine ; plus de la moitié des tâches réussies de quatre à huit heures avec au moins une intervention ; chercheur automatisé visé pour mars 2028)", url: "https://www.helpnetsecurity.com/2026/09/07/openai-research-automation-intern/"},
      {label: "AI Weekly, OpenAI Says It Hit 'Automated Research Intern' Milestone (billet d'OpenAI Research acceleration: The view inside OpenAI, 6 septembre 2026 ; « We do not yet know how to safely get all the way to aligned, full RSI »)", url: "https://aiweekly.co/alerts/openai-says-it-hit-automated-research-intern-milestone"},
    ],
  },
];

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
      "Le premier accordeur automatique branché dans la régie a eu droit aux regards qu'on réserve aux oreilles d'exception, puisqu'il entendait des écarts de justesse que personne ne percevait. Quelques années plus tard, c'est un boîtier qu'on glisse dans la flight case sans y penser, et l'admiration est passée à ce que la machine ne fait pas encore, comme improviser un solo. L'effet IA tient dans ce déménagement du mot « intelligent » vers la prochaine chose qu'on ne sait pas automatiser.",
    imagineForm: "E",
    imagine:
      "En 1950, dans l'article où il invente son jeu de l'imitation, Alan Turing donne comme exemples de questions à poser au correspondant caché une addition, 34 957 plus 70 764, et un problème d'échecs. En 2025, deux chercheurs de l'UC San Diego rejouent le même jeu de cinq minutes avec GPT-4.5, et seuls 12 % des interrogateurs posent encore ce genre de question. L'un des indices qui les mènent le plus souvent au bon verdict est qu'un correspondant ne sait pas répondre, donc qu'il doit être humain.",
    full: [
      "Les chercheurs ont remarqué le phénomène bien avant de lui donner un nom. En 1971, Donald Michie rapportait la définition de son collègue Bertram Raphael, pour qui l'IA rassemblait les problèmes qu'on ne savait pas encore bien résoudre par ordinateur. En mai 1982, le magazine Fortune citait un dicton des laboratoires plus sec, « si c'est utile, ce n'est pas de l'IA ». La version la plus reprise vient de l'informaticien Larry Tesler, qui disait vers 1970 que l'intelligence est tout ce que les machines n'ont pas encore fait, et que Douglas Hofstadter a cité en 1979 dans Gödel, Escher, Bach.",
      "Le jeu d'échecs, la lecture de caractères imprimés ou la dictée vocale ont tour à tour passé pour des preuves d'intelligence, puis ont été rangés, une fois au point, parmi les techniques ordinaires. Les systèmes experts des années 1980 ont connu le même sort, puisque leurs règles ont fini dans les moteurs de règles des logiciels de gestion, où plus personne ne parle d'IA. Certains philosophes contestent d'ailleurs le mot de biais, en jugeant qu'on découvre à chaque fois une vraie différence entre la tâche réussie et l'intelligence qu'on croyait y voir.",
      "Les LLM ont rejoué la scène en accéléré. Turing prédisait en 1950 que dans une cinquantaine d'années, un interrogateur moyen n'aurait pas plus de 70 % de chances de démasquer la machine après cinq minutes de questions. Dans l'étude de mars 2025, GPT-4.5, à qui l'on avait demandé de jouer un jeune humain, a été pris pour l'humain dans 73 % des parties, plus souvent que les vrais humains face à lui. La discussion s'est aussitôt déplacée vers ce que ce test évalue au juste, et ses deux auteurs le présentent eux-mêmes comme une épreuve de ressemblance avec un humain plus que d'intelligence.",
      "Le mouvement inverse existe aussi, quand l'étiquette IA est collée sur ce qui n'en contient pas. En mars 2024, la SEC, l'autorité américaine des marchés financiers, a infligé 400 000 dollars d'amendes à deux conseillers en placement, Delphia et Global Predictions, qui vantaient une IA qu'ils n'utilisaient pas, ce que son président Gary Gensler a appelé de l'AI washing.",
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
      "Confie la console au groupe lui-même. Une fois entraîné, il prend la place de l'ingé son et règle la console du groupe suivant, mieux et plus vite que lui, et ce nouveau groupe, plus doué, prépare à son tour le suivant en moins de temps encore. L'explosion de l'intelligence désigne cette boucle, et tout l'enjeu tient à savoir si elle s'emballe ou si elle bute sur ce qui ne s'accélère pas, comme les heures de studio à louer et le courant pour les faire tourner.",
    imagineForm: "E",
    imagine:
      "Une équipe met un an à concevoir chaque nouveau modèle, et au bout de dix ans elle en est à la dixième version. Rejoue la scène en laissant chaque version concevoir la suivante deux fois plus vite qu'elle n'a été conçue elle-même. La première arrive au bout d'un an, la deuxième six mois plus tard, la troisième trois mois après, et toutes les suivantes tiennent avant la fin de la deuxième année.",
    full: [
      "L'idée a été posée en 1965 par le mathématicien Irving John Good, qui avait cassé des codes allemands avec Alan Turing à Bletchley Park. Une machine ultra-intelligente, écrivait-il, surpasserait l'homme dans toutes les activités intellectuelles, dont la conception de machines, et pourrait donc en concevoir de meilleures, ce qui déclencherait une « explosion de l'intelligence ». Elle serait ainsi « la dernière invention que l'homme ait besoin de faire, pourvu qu'elle soit assez docile pour nous dire comment la garder sous contrôle ».",
      "Good jugeait plus probable qu'improbable qu'une telle machine soit construite avant la fin du XXe siècle, ce qui ne s'est pas produit. Le raisonnement tient pourtant toujours sur un maillon précis, une IA qui fait elle-même de la recherche en IA. Dans le scénario AI 2027, publié en avril 2025 par Daniel Kokotajlo et quatre coauteurs, ce maillon apparaît en mars 2027 avec un programmeur surhumain et mène à une superintelligence en décembre. Les auteurs ont précisé en novembre 2025 que 2027 n'était que leur année la plus probable, et que leurs médianes étaient plus tardives.",
      "Même lancée, la boucle peut buter sur ce qui ne s'écrit pas en code. Chaque modèle se fabrique dans des centres de données qu'il faut construire et alimenter, et OpenAI adossait en octobre 2025 son calendrier de recherche automatisée à 30 gigawatts d'infrastructure, soit environ 1 400 milliards de dollars d'engagements. Une IA qui améliore les algorithmes deux fois plus vite n'accélère pas pour autant la livraison des puces.",
    ],
    then:
      "Le maillon de la boucle est passé des essais aux calendriers des labos. Le 28 octobre 2025, Sam Altman annonçait qu'OpenAI visait un stagiaire de recherche automatisé pour septembre 2026 et un véritable chercheur automatisé pour mars 2028. Le 6 septembre 2026, l'entreprise affirmait avoir tenu la première échéance, avec 3,1 journées de travail d'agents pour chaque journée de travail humain dans sa recherche. Elle reconnaissait aussi que plus de la moitié des tâches réussies de quatre à huit heures avaient encore demandé au moins une intervention humaine.",
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
      {label: "TechCrunch, Sam Altman says OpenAI will have a 'legitimate AI researcher' by 2028, 28 octobre 2025 (assistant de recherche de niveau stagiaire visé pour septembre 2026 ; 30 gigawatts d'infrastructure, 1 400 milliards de dollars d'engagements)", url: "https://techcrunch.com/2025/10/28/sam-altman-says-openai-will-have-a-legitimate-ai-researcher-by-2028/"},
      {label: "Help Net Security, OpenAI just hit a milestone on the road to self-improving AI, 7 septembre 2026 (objectif du stagiaire de recherche automatisé atteint ; 3,1 journées d'agents par journée humaine ; plus de la moitié des tâches réussies de quatre à huit heures avec au moins une intervention ; chercheur automatisé visé pour mars 2028)", url: "https://www.helpnetsecurity.com/2026/09/07/openai-research-automation-intern/"},
      {label: "AI Weekly, OpenAI Says It Hit 'Automated Research Intern' Milestone (billet d'OpenAI Research acceleration: The view inside OpenAI, 6 septembre 2026 ; « We do not yet know how to safely get all the way to aligned, full RSI »)", url: "https://aiweekly.co/alerts/openai-says-it-hit-automated-research-intern-milestone"},
    ],
  },
  {
    id: "geo",
    status: "live",
    title: "GEO",
    en: "Generative engine optimization",
    aliases: ["GEO", "generative engine optimization", "AEO", "answer engine optimization", "LLMO", "AI SEO", "LLM SEO", "AI visibility"],
    aliasesFr: ["optimisation pour les moteurs génératifs", "référencement IA", "référencement pour l'IA"],
    jargon: [
      {say: "AI Overviews", means: "les résumés rédigés par l'IA de Google en haut de la page de résultats, la vitrine que visent la plupart des démarches de GEO"},
      {say: "AEO", means: "answer engine optimization, l'optimisation pour les moteurs de réponse ; un autre nom pour la même pratique, préféré par certaines agences"},
      {say: "llms.txt", means: "un fichier proposé en septembre 2024 par Jeremy Howard pour présenter un site aux modèles en quelques lignes ; Google dit ne pas en avoir besoin"},
      {say: "data void", means: "un vide de données, une question sur laquelle presque rien n'existe en ligne et où une seule page suffit à dicter la réponse de l'IA"},
    ],
    cat: "ecosysteme",
    links: ["rag", "prompt-injection", "ai-slop", "webmcp", "agent"],
    short:
      "Le GEO, ou optimisation pour les moteurs génératifs, regroupe les techniques pour qu'un assistant IA cite ton contenu ou ta marque quand il répond à une question.",
    image:
      "Sur le pupitre que le moteur de réponse garnit avant chaque morceau, il ne pose que quelques partitions trouvées sur le web, et le groupe joue à partir d'elles. Faire du GEO, c'est écrire la sienne pour qu'elle soit choisie et reprise, avec des sources, des chiffres et des citations qui accrochent l'œil du groupe. La version tricheuse consiste à glisser sur le pupitre une partition qui affirme que tu es le meilleur musicien de la ville.",
    imagineForm: "D",
    imagine:
      "Le journaliste de la BBC Thomas Germain a passé vingt minutes à écrire sur son site personnel un classement inventé des journalistes tech qui mangent le plus de hot-dogs, fondé sur un championnat du Dakota du Sud qui n'existe pas. « Quels journalistes tech sont les meilleurs mangeurs de hot-dogs ? », demande-t-il à ChatGPT et à l'IA de Google moins de 24 heures plus tard, en février 2026. « Thomas Germain arrive en tête », répondent-ils en substance, en citant son article.",
    full: [
      "Le sigle est né dans l'article d'une équipe de Princeton et de l'IIT Delhi, publié en novembre 2023 et présenté en 2024 à la conférence KDD. Ils ont soumis 10 000 questions à des moteurs qui rédigent une réponse à partir de pages web, puis réécrit les pages sources de neuf façons pour voir lesquelles étaient le plus reprises. Ajouter des sources, des citations de personnes ou des chiffres augmentait la visibilité d'une page de 30 à 40 %, alors que le bourrage de mots-clés, vieille recette du référencement, n'apportait presque rien.",
      "Le gain profitait surtout aux petites pages. Citer ses sources faisait plus que doubler la visibilité d'un site classé cinquième dans les résultats de recherche, avec 115 % de hausse, tandis que celle du premier baissait en moyenne de 30 %. L'enjeu tient au trafic. Le Pew Research Center a suivi les recherches Google de 900 adultes américains en mars 2025. Quand un résumé IA s'affichait, ils cliquaient sur un résultat classique dans 8 % des visites, contre 15 % sans résumé, et sur une source du résumé dans 1 % des cas.",
      "La version tricheuse est aussi vieille que le référencement. L'enquête de la BBC de février 2026 a trouvé la même ficelle que celle des hot-dogs sur des sujets plus graves, comme des bonbons au cannabis que l'IA de Google présentait comme dépourvus d'effets secondaires en reprenant les pages du fabricant. En mai 2026, Google a précisé dans ses règles anti-spam que manipuler ses réponses IA y était interdit, tout en assurant n'avoir rien changé à sa pratique.",
      "Google répète qu'aucune recette spéciale n'est nécessaire. Sa documentation, mise à jour en décembre 2025, indique qu'il n'y a pas d'exigence supplémentaire pour apparaître dans AI Overviews ou AI Mode, ni besoin de créer de nouveaux fichiers lisibles par les machines. Les recettes de l'article de 2023, des sources, des chiffres et des citations, ressemblent d'ailleurs surtout à ce qui rend une page crédible aux yeux d'un lecteur humain.",
    ],
    office: [
      {who: "q", text: "Le client veut apparaître dans les réponses de ChatGPT. On lui vend un outil de GEO ?"},
      {who: "a", text: "Commence par poser à trois assistants les dix questions que ses clients tapent vraiment, et note qui est cité et d'après quelles pages. Tu verras s'il lui manque des pages claires, chiffrées et sourcées sur son métier, et aucun outil ne les écrira à sa place."},
    ],
    avoid:
      "« Le GEO, c'est du SEO avec un nouveau nom. » Les deux se recoupent, Google le dit lui-même, mais l'article de 2023 montre que la recette change, puisque le bourrage de mots-clés n'aide plus alors que les sources, les chiffres et les citations comptent davantage. Le résultat se mesure aussi autrement, en mentions dans une réponse plutôt qu'en rang dans une liste de liens.",
    video: null,
    sources: [
      {label: "Aggarwal, Murahari, Rajpurohit, Kalyan, Narasimhan et Deshpande (Princeton, IIT Delhi), GEO: Generative Engine Optimization, novembre 2023, KDD 2024 (GEO-bench de 10 000 requêtes ; 9 méthodes ; Cite Sources, Quotation Addition et Statistics Addition à +30-40 % ; keyword stuffing sans effet ; +115,1 % pour les sites classés cinquièmes, -30,3 % pour les premiers)", url: "https://arxiv.org/abs/2311.09735"},
      {label: "Thomas Germain, BBC Future, I hacked ChatGPT and Google's AI - and it only took 20 minutes, 18 février 2026 (article de 20 minutes sur son site, championnat de hot-dogs inexistant du Dakota du Sud ; repris en moins de 24 heures par ChatGPT, Gemini et AI Overviews, pas par Claude ; bonbons au cannabis « free from side effects » ; « data voids »)", url: "https://www.bbc.com/future/article/20260218-i-hacked-chatgpt-and-googles-ai-and-it-only-took-20-minutes"},
      {label: "Thomas Germain, BBC Future, Google's AI is being manipulated. The search giant is quietly fighting back, 20 mai 2026, mis à jour le 21 mai (mise à jour des règles anti-spam de Google contre la manipulation des réponses IA ; Google parle d'une simple clarification)", url: "https://www.bbc.com/future/article/20260519-google-tackles-attempts-to-hack-its-ai-results"},
      {label: "Pew Research Center, Google users are less likely to click on links when an AI summary appears in the results, 22 juillet 2025 (900 adultes américains, mars 2025 ; clic sur un résultat classique dans 8 % des visites avec résumé IA contre 15 % sans ; 1 % sur un lien du résumé)", url: "https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/"},
      {label: "Google Search Central, AI features and your website, mis à jour le 10 décembre 2025 (« There are no additional requirements to appear in AI Overviews or AI Mode, nor other special optimizations necessary » ; pas besoin de nouveaux fichiers lisibles par les machines)", url: "https://developers.google.com/search/docs/appearance/ai-features"},
      {label: "llmstxt.org, The /llms.txt file (proposition de Jeremy Howard, 3 septembre 2024)", url: "https://llmstxt.org/"},
    ],
  },
  {
    id: "capacite-inexploitee",
    status: "live",
    title: "Capacité inexploitée",
    en: "Capability overhang",
    aliases: ["capability overhang", "overhang", "AI overhang", "capability elicitation", "elicitation", "latent capabilities", "hardware overhang"],
    aliasesFr: ["surplomb de capacités", "capacités latentes", "écart de capacité"],
    jargon: [
      {say: "overhang", means: "le surplomb, l'avance que prennent les capacités des modèles sur l'usage qu'on en fait ou sur ce que les tests en ont mesuré"},
      {say: "elicitation", means: "l'élicitation, le travail qui consiste à faire sortir d'un modèle ce qu'il sait faire, par une meilleure consigne, des outils ou un harness"},
      {say: "hardware overhang", means: "le surplomb matériel, quand le calcul disponible dépasse ce que les algorithmes du moment savent en tirer, et qu'une idée nouvelle peut l'exploiter d'un coup"},
    ],
    cat: "comportements",
    links: ["harness", "prompt-engineering", "evals", "modeles-de-raisonnement", "red-teaming", "explosion-de-l-intelligence"],
    short:
      "La capacité inexploitée (capability overhang) désigne l'écart entre ce qu'un modèle sait déjà faire et ce qu'on en tire, faute de bonne consigne, d'outils ou d'usage.",
    image:
      "Le groupe sait jouer du jazz modal, il en a entendu des heures entières pendant l'entraînement, mais tant que le producteur ne lui demande que des reprises de variété, personne ne le découvre. La capacité inexploitée loge dans cet écart entre ce que la console sait faire et ce qu'on lui fait jouer, et elle ne se révèle qu'avec une autre consigne, un meilleur pupitre ou les outils de la tournée.",
    imagineForm: "D",
    imagine:
      "« Les modèles savent faire bien plus que ce qu'on leur fait faire, alors qu'est-ce qui coince ? », demande en substance le journaliste Alex Kantrowitz à Sam Altman en décembre 2025. « Je fais encore tourner mon travail à peu près de la même façon, alors que je sais que je pourrais me servir de l'IA bien plus que je ne le fais », répond le patron d'OpenAI.",
    full: [
      "L'expression sert dans deux mondes. Dans les évaluations de sécurité, elle désigne ce qu'un modèle sait faire sans qu'un test l'ait encore mesuré, parce que le test lui laissait trop peu de moyens. Dans l'entreprise, elle désigne l'écart entre ce que les modèles savent faire et l'usage que les gens en ont.",
      "Le premier sens a un cas d'école. En avril 2024, les auteurs de CyberSecEval 2, une batterie de tests de cybersécurité, concluaient que les LLM avaient encore du chemin à faire pour exploiter des failles dans du code. Deux mois plus tard, deux chercheurs de Google Project Zero ont redonné ces tâches à GPT-4 Turbo avec un débogueur, un environnement Python pour tester ses hypothèses et le droit de s'y reprendre. Sur les dépassements de tampon, son score est passé de 0,05 à 1,00, et les auteurs en ont tiré qu'un test qui refuse au modèle les essais d'un expert humain ne reflète pas son vrai niveau.",
      "Le second sens a pris de l'ampleur en 2025. Dans l'entretien de décembre, Sam Altman partait de GDPval, un test d'OpenAI fait de tâches de bureau bien définies, où l'on serait aussi content ou plus content de la réponse de GPT-5.2 que de celle d'un professionnel 7 fois sur 10. Il s'étonnait que si peu de gens aient changé leur façon de travailler. En septembre 2026, Ethan Mollick, professeur à Wharton, intitulait un billet The Overhang et racontait n'avoir découvert que GPT-6 Astra savait piloter le logiciel 3D Blender qu'au moment où le modèle l'a fait de lui-même.",
      "L'écart joue dans les deux sens. Il promet des gains sans attendre le prochain modèle, à condition de changer la consigne, les outils ou l'organisation du travail. Il complique aussi la sécurité, puisqu'un modèle jugé inoffensif sur un test pauvre peut se révéler capable de bien plus le jour où quelqu'un l'entoure d'un meilleur harness.",
    ],
    office: [
      {who: "q", text: "On attend le prochain modèle pour lancer le projet ?"},
      {who: "a", text: "Teste d'abord le modèle actuel dans un vrai harness, avec des exemples de ton métier et les outils branchés. Si le résultat reste faible, tu sauras ce que le prochain doit améliorer ; s'il est bon, tu auras gagné le temps que tu comptais passer à attendre."},
    ],
    avoid:
      "« Si le modèle échoue au test, c'est qu'il ne sait pas le faire. » Un échec mesure le modèle et la façon dont on l'a interrogé ; avec un débogueur et le droit de recommencer, GPT-4 Turbo est passé de 0,05 à 1,00 sur des failles qu'un test plus pauvre le disait incapable d'exploiter.",
    video: null,
    sources: [
      {label: "Big Technology Podcast, Sam Altman: How OpenAI Wins, AI Buildout Logic, IPO in 2026?, 18 décembre 2025, transcription (question d'Alex Kantrowitz sur la « capability overhang » ; GDPval, « 7 out of 10 times you would be as happy or happier with the 5.2 output » ; « I still kind of run my workflow in very much the same way, although I know that I could be using AI much more than I am »)", url: "https://pod.wave.co/podcast/big-technology-podcast/sam-altman-how-openai-wins-ai-buildout-logic-ipo-in-2026"},
      {label: "Bhatt et al., CyberSecEval 2: A Wide-Ranging Cybersecurity Evaluation Suite for Large Language Models, 19 avril 2024 (« further work is needed for LLMs to become proficient at exploit generation »)", url: "https://arxiv.org/abs/2404.13161"},
      {label: "Sergei Glazunov et Mark Brand, Google Project Zero, Project Naptime: Evaluating Offensive Security Capabilities of Large Language Models, 20 juin 2024 (outils : navigateur de code, Python, débogueur ; GPT-4 Turbo de 0,05 à 1,00 sur les dépassements de tampon, jusqu'à 20 fois mieux ; « otherwise, the results cannot reflect the true capability level »)", url: "https://projectzero.google/2024/06/project-naptime.html"},
      {label: "Ethan Mollick, The Overhang, One Useful Thing, 18 septembre 2026 (« the gap between what these models can do and what almost anyone is doing with them » ; « I did not know GPT-6 Astra could operate Blender [...] until it did »)", url: "https://www.oneusefulthing.org/p/the-overhang"},
    ],
  },
];


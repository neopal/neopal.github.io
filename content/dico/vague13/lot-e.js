// Lexique IA, vague 13, lot E (organisation : déployer l'IA dans une entreprise). Format identique à lexique/terms.js, sans `num`.
// imagineForm : forme de l'« Imagine » (content/dico/univers.md, section « Les formes de l'Imagine »).
// Faits, chiffres et citations relevés le 4 octobre 2026 sur les pages citées dans `sources`.
module.exports = [
  {
    id: 'mythe-ajouter-ia',
    status: 'live',
    title: "« Il suffit d'ajouter de l'IA à nos processus »",
    en: 'Myth: just add AI to our processes',
    aliases: ['paving the cow paths', 'business process reengineering', 'BPR', 'productivity paradox', 'Solow paradox', "don't automate, obliterate"],
    aliasesFr: ["ajouter de l'IA", 'réingénierie des processus', 'paradoxe de la productivité', 'paradoxe de Solow'],
    jargon: [
      {say: 'paving the cow paths', means: "« goudronner les chemins de vaches », l'expression de Michael Hammer en 1990 pour une informatique qui rend plus rapide un vieux circuit au lieu de le redessiner"},
      {say: 'reengineering, BPR', means: "la réingénierie des processus, redessiner un circuit à partir du résultat attendu en supprimant les étapes qui n'existaient que pour l'ancienne organisation"},
      {say: 'paradoxe de Solow', means: "l'écart entre une technologie qu'on voit partout et une productivité qui ne bouge pas dans les statistiques, d'après une remarque de l'économiste Robert Solow en 1987"},
      {say: 'temps gagné', means: "les minutes économisées par une personne sur une tâche ; elles ne deviennent de la productivité que si le circuit autour en profite"},
    ],
    graphLabel: "Mythe : ajouter de l'IA",
    cat: 'mythes',
    links: ['workflow-ou-agent', 'human-in-the-loop', 'routage-de-modeles', 'evals', 'forward-deployed-engineer', 'mythe-95-pourcent'],
    short:
      "Ajouter de l'IA à un processus existant accélère les étapes qu'il contient sans toucher aux attentes et aux passages de main, là où se perd souvent l'essentiel du temps.",
    image:
      "« Le patron a pris un terminal sans contact pour que ça aille plus vite. Tu paies en une seconde, et tu attends toujours vingt minutes que Ginette voie que t'as levé la main. »",
    imagineForm: 'E',
    imagine:
      "Au début des années 1980, Ford veut alléger son service des factures fournisseurs, plus de 500 personnes en Amérique du Nord. En rationalisant le circuit et en installant de nouveaux ordinateurs pour rapprocher plus vite la commande, le bon de réception et la facture, il compte réduire l'effectif d'environ 20 %. Quelques années plus tard, Ford a demandé à ses fournisseurs de ne plus envoyer de facture et paie dès que la marchandise reçue correspond à la commande. Là où ce circuit est en place, le service tourne avec 75 % de personnes en moins.",
    full: [
      "En juillet 1990, Michael Hammer, alors professeur au MIT, publie dans la Harvard Business Review « Reengineering Work: Don't Automate, Obliterate ». Selon lui, les lourds investissements informatiques des entreprises ont déçu parce qu'elles s'en servaient pour mécaniser leurs vieilles façons de faire, en gardant les processus intacts et en les accélérant à coups d'ordinateurs. Il est temps, écrit-il, d'arrêter de goudronner les chemins de vaches et de redessiner le travail lui-même. Chez Ford, l'idée décisive a été de remplacer une règle que personne n'avait jamais écrite, « on paie quand on reçoit la facture », par « on paie quand on reçoit la marchandise ».",
      "Son autre exemple montre où part le temps. Chez l'assureur Mutual Benefit Life, une demande de contrat traversait jusqu'à 30 étapes, 5 services et 19 personnes, et mettait en général de 5 à 25 jours, passés surtout à faire circuler l'information d'un service à l'autre. Un autre assureur estimait qu'une demande restée 22 jours en traitement n'avait été travaillée que 17 minutes. Accélérer ces 17 minutes ne change presque rien au délai. Mutual Benefit Life a plutôt confié chaque demande à un seul gestionnaire, du dépôt jusqu'au contrat, et l'a équipé d'un poste qui réunissait toutes les informations, et le délai moyen est tombé à deux à cinq jours.",
      "Le phénomène avait déjà un nom chez les économistes. En 1987, Robert Solow notait qu'on voyait l'ère de l'ordinateur partout, sauf dans les statistiques de productivité. Les gains sont arrivés dans les années 1990, et les études d'Erik Brynjolfsson et Lorin Hitt les ont trouvés surtout dans les entreprises qui avaient changé leur organisation en même temps qu'elles s'équipaient.",
      "L'IA rejoue la scène. D'octobre à décembre 2024, le ministère britannique du Commerce (Department for Business and Trade) a donné 1 000 licences de Microsoft 365 Copilot à ses agents, sans toucher à leur travail. Son évaluation, publiée en août 2025, trouve 72 % d'utilisateurs satisfaits et des minutes gagnées sur les comptes rendus et les courriels. Lors des tâches observées, l'analyse de données dans Excel prenait plus de temps qu'à ceux qui travaillaient sans l'outil, pour un résultat moins exact. Le rapport ne trouve aucune preuve solide que ces minutes aient amélioré la productivité du ministère, tout en précisant que ce n'était pas le but premier de l'évaluation.",
      "Redessiner d'abord, c'est partir du résultat attendu, compter les jours d'attente plutôt que les minutes de travail, puis décider pour chaque étape restante qui la fait. Varick Agents, une entreprise qui vend ce travail, en a fait sa doctrine dans un article du 30 septembre 2026. Une règle se code, un jugement peu risqué va à un modèle, et une décision à risque revient à un humain qui tranche sur un dossier préparé. Elle y cite un client chez qui l'ouverture d'un dossier demandait 25 minutes de travail et de 2 jours à 2 semaines de délai.",
    ],
    office: [
      {who: 'q', text: "On vient d'acheter 2 000 licences d'assistant IA. Comment on prouve à la direction que ça rapporte ?"},
      {who: 'a', text: "Choisis un circuit, une demande client ou une clôture mensuelle, mesure son délai de bout en bout avant et après, et note où le dossier attend. Les minutes que chacun dit gagner ne se voient sur ce délai que si elles tombent là où le dossier attendait."},
    ],
    avoid:
      "« Le ministère britannique a montré que l'IA ne sert à rien. » Son évaluation a trouvé des gains réels sur certaines tâches, comme les synthèses de rapports, et des pertes sur d'autres ; ce qu'elle ne trouve pas, c'est un effet sur la productivité d'un ministère qui a ajouté l'outil sans changer sa façon de travailler.",
    video: null,
    sources: [
      {
        label: "Michael Hammer, Reengineering Work: Don't Automate, Obliterate, Harvard Business Review, juillet-août 1990 (« use technology to mechanize old ways of doing business » ; « It is time to stop paving the cow paths » ; Ford : plus de 500 personnes aux comptes fournisseurs en Amérique du Nord, objectif initial de 20 % d'effectif en moins, 5 personnes chez Mazda, « invoiceless processing », 14 éléments à rapprocher puis 3, 75 % d'effectif en moins là où le nouveau processus est en place, règle « We pay when we receive the invoice » remplacée par « We pay when we receive the goods » ; Mutual Benefit Life : jusqu'à 30 étapes, 5 services, 19 personnes, 5 à 25 jours, gestionnaire unique « case manager », 2 à 5 jours en moyenne ; un autre assureur : 22 jours de traitement pour 17 minutes de travail)",
        url: 'https://hbr.org/1990/07/reengineering-work-dont-automate-obliterate',
      },
      {
        label: "Wikipedia, Productivity paradox (Robert Solow, New York Times Book Review, 12 juillet 1987 : « You can see the computer age everywhere but in the productivity statistics » ; terme formalisé par Erik Brynjolfsson en 1993 ; retour des gains dans les années 1990 ; Brynjolfsson et Hitt, 1996 et 1998 : relation positive entre informatique et productivité quand l'investissement accompagne des changements d'organisation)",
        url: 'https://en.wikipedia.org/wiki/Productivity_paradox',
      },
      {
        label: "Department for Business and Trade, Microsoft 365 Copilot evaluation, août 2025 (pilote de 1 000 licences d'octobre à décembre 2024, sans contrefactuel ; 72 % de répondants satisfaits ou très satisfaits ; gains de temps sur les tâches écrites ; tâches observées : analyse Excel en 25 min 01 contre 20 min 33 et exactitude de 1,5 contre 2,7 sur 5, diapositives PowerPoint plus de 7 minutes plus vite mais de moins bonne qualité ; « We did not find robust evidence to suggest that time savings are leading to improved productivity », ce n'était pas un objectif principal de l'évaluation ; 1,14 action Copilot par utilisateur et par jour)",
        url: 'https://assets.publishing.service.gov.uk/media/68adbe409e1cebdd2c96a19d/dbt-microsoft-365-copilot-evaluation.pdf',
      },
      {
        label: "Vas Moza (Varick Agents), Don't Apply AI, 30 septembre 2026 (affirmations d'un prestataire qui vend ce service : trois cases, « Deterministic », « Agentic » pour un jugement peu risqué, humain pour une décision à risque ; client dont l'ouverture d'un dossier demandait 25 minutes de travail pour un délai de 2 jours à 2 semaines ; reprise de Hammer et des « cow paths »)",
        url: 'https://www.varickagents.com/blog/don-t-apply-ai',
      },
    ],
  },
  {
    id: 'forward-deployed-engineer',
    status: 'live',
    title: 'Forward-deployed engineer',
    en: 'forward-deployed engineer',
    aliases: ['FDE', 'forward deployed engineer', 'forward deployed software engineer', 'FDSE', 'Delta', 'forward deployed engineering', 'services-led growth'],
    aliasesFr: ['ingénieur déployé chez le client', 'ingénieur en déploiement avancé'],
    jargon: [
      {say: 'FDE', means: "forward-deployed engineer, l'ingénieur qu'un éditeur installe chez un client pour y écrire du code de production avec les outils de l'éditeur"},
      {say: 'Delta', means: "le nom du poste chez Palantir, qui l'a créé au début des années 2010 ; l'ingénieur produit classique y était appelé Dev"},
      {say: 'services-led growth', means: "la croissance tirée par le service, la thèse d'Andreessen Horowitz en juin 2025 selon laquelle une jeune entreprise d'IA gagne à vendre beaucoup de mise en place, même au prix de sa marge"},
      {say: 'Applied AI', means: "le nom de l'équipe où travaillent les FDE d'Anthropic, entre la vente, le produit et l'ingénierie"},
    ],
    cat: 'ecosysteme',
    links: ['workflow-ou-agent', 'mythe-ajouter-ia', 'harness', 'mcp', 'labs', 'mythe-95-pourcent'],
    short:
      "Un forward-deployed engineer est un ingénieur qu'un éditeur de logiciel ou d'IA envoie chez un client pour y construire, dans les systèmes du client, ce que le produit seul ne fait pas.",
    image:
      "Yannick, poseur de cuisines, passe trois jours chez chaque client à découper autour du compteur à gaz que le plan ignorait. Quand il a taillé la même encoche dans quarante pavillons du même lotissement, l'usine l'a mise au catalogue.",
    imagineForm: 'B',
    imagine:
      "Ouvre un chatbot grand public, sans accès à tes documents, et demande-lui comment se passe le remboursement d'une note de frais dans ton entreprise. Il te décrira un circuit générique, ou il te demandera de le lui expliquer. Le nom de l'outil, le seuil au-delà duquel ton manager doit signer, le justificatif que la compta refuse toujours, tout ce qui manque à sa réponse est ce qu'un forward-deployed engineer vient chercher sur place.",
    full: [
      "Le poste vient de Palantir, l'éditeur de logiciels d'analyse de données pour les armées, les services de renseignement et les entreprises. Au début des années 2010, il y envoie des ingénieurs chez ses clients, qu'il appelle les Deltas. Palantir résume la différence avec ses ingénieurs produit en deux formules, « une capacité, beaucoup de clients » pour le Dev, et « un client, beaucoup de capacités » pour le Delta. Jusque vers 2016, l'entreprise comptait plus de Deltas que d'ingénieurs produit ; quand elle a lancé sa plateforme Foundry cette année-là, une partie d'entre eux est retournée au produit.",
      "Les labs d'IA ont repris le modèle. Début 2025, Colin Jarvis montait chez OpenAI une équipe de deux FDE, qui en comptait plus de dix en août, dans huit villes et sur trois continents. Le 11 mai 2026, OpenAI a lancé une société entière, l'OpenAI Deployment Company, dotée de 4 milliards de dollars avec 19 investisseurs, et y a fait entrer environ 150 ingénieurs en rachetant le cabinet Tomoro. Anthropic recrute aussi des FDE, à Paris, Munich, Londres ou New York.",
      "L'offre d'emploi d'Anthropic à Paris, mise à jour le 28 août 2026, décrit le travail concret. Le FDE développe des applications de production avec Claude à l'intérieur des systèmes du client, livre des serveurs MCP, des sous-agents et des skills, et passe 25 à 50 % de son temps en déplacement. Il doit aussi repérer ce qui se répète d'un déploiement à l'autre et le remonter aux équipes produit. Varick Agents, qui vend ce métier, décrit chez ses clients le même enchaînement, une cartographie du travail réel, des evals qui vérifient l'agent, puis la mise en production.",
      "La critique tient en une question, celle du conseil qui ne dit pas son nom. Un FDE est du service, payé à la journée ou noyé dans le contrat, et le service rapporte moins que le logiciel. En juin 2025, Andreessen Horowitz rappelait qu'à leur entrée en Bourse, ServiceNow et Workday n'avaient que 63,2 % et 54,1 % de marge brute, loin des 80 % qu'on attend d'un éditeur, et conseillait pourtant de vendre ce service à prix coûtant. Le jour du lancement de la société d'OpenAI, le site Channel Dive titrait sur une « activité de conseil autonome ».",
    ],
    then:
      "Début 2025, l'équipe de forward-deployed engineers d'OpenAI comptait deux personnes. En mai 2026, OpenAI crée une société consacrée au déploiement chez les clients et y fait entrer d'un coup environ 150 ingénieurs et spécialistes du déploiement.",
    office: [
      {who: 'q', text: "L'éditeur nous offre deux FDE pendant six mois avec le contrat. On a besoin d'une équipe IA en interne, du coup ?"},
      {who: 'a', text: "Plus que jamais, puisqu'ils partiront au bout de six mois. Mets dès le premier jour un de tes ingénieurs à côté d'eux, et exige qu'ils laissent du code que ton équipe sait relancer et des evals qu'elle sait lire, sinon tu auras loué un système que personne chez toi ne sait réparer."},
    ],
    avoid:
      "« Un FDE, c'est un consultant avec un titre d'ingénieur. » La différence se vérifie à ce qui remonte au produit ; chez Palantir, ce que les Deltas avaient bricolé client par client a fini dans une plateforme vendue à tous, et l'offre d'Anthropic demande de rapporter aux équipes produit ce qui se répète. Un FDE dont rien ne remonte fait bien du conseil.",
    video: null,
    sources: [
      {
        label: "Gergely Orosz, What are Forward Deployed Engineers, and why are they so in demand?, The Pragmatic Engineer, 12 août 2025 (poste créé chez Palantir au début des années 2010 sous le nom de « Delta » ; citation de Palantir : « one capability, many customers » pour un Dev, « one customer, many capabilities » pour un Delta ; plus de Deltas que d'ingénieurs logiciels jusque vers 2016, lancement de Foundry cette année-là ; Colin Jarvis, Head of Forward Deployed Engineering chez OpenAI ; équipe créée début 2025, de deux à plus de dix ingénieurs, huit villes, trois continents)",
        url: 'https://newsletter.pragmaticengineer.com/p/forward-deployed-engineers',
      },
      {
        label: "Anthropic, offre « Forward Deployed Engineer », Paris, mise à jour le 28 août 2026 (équipe Applied AI ; travail au sein des systèmes clients pour développer des applications de production avec Claude ; livraison de serveurs MCP, sous-agents et compétences d'agent ; codifier les modèles de déploiement reproductibles et les remonter aux équipes Produit et Ingénierie ; déplacements de 25 à 50 % ; plus de 8 ans d'expérience). Autres offres FDE ouvertes à Munich, Londres et New York sur le même site",
        url: 'https://job-boards.greenhouse.io/anthropic/jobs/5391021008',
      },
      {
        label: "OpenAI, OpenAI launches the OpenAI Deployment Company to help businesses build around intelligence, mai 2026 (FDE intégrés chez les clients ; rachat de Tomoro, environ 150 Forward Deployed Engineers et Deployment Specialists)",
        url: 'https://openai.com/index/openai-launches-the-deployment-company/',
      },
      {
        label: "Matt Ashare, OpenAI spins up standalone consulting business, Channel Dive, 11 mai 2026 (OpenAI Deployment Company, 4 milliards de dollars, OpenAI et 19 investisseurs menés par TPG avec Advent, Bain Capital et Brookfield ; rachat de Tomoro, environ 150 ingénieurs et spécialistes du déploiement)",
        url: 'https://www.channeldive.com/news/openai-deployment-company-4-billion-ai-consulting-integration/819888/',
      },
      {
        label: "Joe Schmidt (Andreessen Horowitz), Trading Margin for Moat: Why the Forward Deployed Engineer Is the Hottest Job in Startups, 4 juin 2025 (marge brute à l'introduction en Bourse : ServiceNow 63,2 %, Workday 54,1 %, contre environ 80 % idéalement pour du logiciel ; critiques : le service limite le passage à l'échelle et devrait revenir aux partenaires ; conseil de vendre le service à prix coûtant)",
        url: 'https://a16z.com/services-led-growth/',
      },
      {
        label: "Eyad Khrais (Varick Agents), Forward-Deployed Engineering 101, 30 septembre 2026 (présentation d'un prestataire qui vend ce métier : audit des flux de travail, evals, déploiement ; origine du terme chez Palantir)",
        url: 'https://www.varickagents.com/blog/forward-deployed-engineering-101',
      },
    ],
  },
  {
    id: 'mythe-95-pourcent',
    status: 'live',
    title: "« 95 % des projets d'IA échouent »",
    en: 'Myth: 95% of AI projects fail',
    aliases: ['95% of AI pilots fail', 'GenAI Divide', 'MIT NANDA report', 'State of AI in Business 2025', 'shadow AI'],
    aliasesFr: ['95 % des pilotes échouent', 'rapport du MIT sur les pilotes', "fracture de l'IA générative"],
    jargon: [
      {say: 'pilot to production', means: "le passage d'un essai limité à un outil utilisé pour de bon dans le travail ; c'est l'étape que le rapport du MIT dit rarement franchie"},
      {say: 'P&L impact', means: "un effet visible sur le compte de résultat, en chiffre d'affaires ou en coûts, le critère de réussite le plus exigeant qu'on puisse fixer à un pilote"},
      {say: 'shadow AI', means: "l'usage d'outils d'IA personnels au travail, sans abonnement de l'entreprise ; dans le même rapport, il concernait des salariés de plus de 90 % des entreprises interrogées"},
    ],
    graphLabel: 'Mythe : 95 % des projets échouent',
    cat: 'mythes',
    links: ['mythe-ajouter-ia', 'forward-deployed-engineer', 'evals', 'mythe-remplace-metier', 'mythe-taux-d-erreur'],
    short:
      "Le chiffre de 95 % de projets d'IA en échec vient d'un rapport de 2025 qui le tirait de 52 entretiens et le rapportait à toutes les entreprises interrogées, y compris celles qui n'avaient rien essayé.",
    image:
      "« Quatre-vingt-quinze pour cent de nos adhérents n'ont jamais fini un marathon », annonce Mireille à l'assemblée du club. Sur les vingt qui ont pris le départ, cinq ont passé la ligne ; les quatre-vingts autres sont à l'aquagym.",
    imagineForm: 'D',
    imagine:
      "« Le MIT dit que 95 % des pilotes d'IA échouent, on arrête le nôtre ? », demande Hélène en septembre 2025 au collègue qui a lu le rapport en entier. « Pour y compter comme une réussite, un outil devait avoir produit, d'après ses utilisateurs ou ses dirigeants, un effet marqué et durable sur la productivité ou les comptes, mesuré six mois après le pilote », répond-il.",
    full: [
      "Le rapport s'intitule « The GenAI Divide: State of AI in Business 2025 ». Il est daté de juillet 2025 et signé par quatre auteurs de Project NANDA, une initiative née au MIT Media Lab. Il repose sur une revue de plus de 300 projets annoncés publiquement, des entretiens avec des représentants de 52 organisations et 153 réponses à un questionnaire rempli par des dirigeants lors de quatre salons professionnels, entre janvier et juin 2025. Sa phrase centrale affirme que 95 % des organisations n'obtiennent aucun retour de leurs investissements en IA générative.",
      "Le chiffre se lit sur un seul graphique. Pour les outils d'IA conçus pour une tâche précise, 60 % des organisations en ont étudié un, 20 % en ont essayé un en pilote et 5 % l'ont mis en place avec succès. Les 95 % comptent donc aussi les 80 % qui n'ont jamais lancé de pilote, et parmi celles qui l'avaient fait, environ une sur quatre avait réussi. Les auteurs préviennent eux-mêmes que ces chiffres sont indicatifs, tirés d'entretiens et non de comptes publiés, et qu'un délai de six mois peut sous-estimer la réussite des projets complexes.",
      "Le 18 août 2025, le magazine Fortune titre que 95 % des pilotes d'IA générative en entreprise échouent, et décrit l'étude comme fondée sur 150 entretiens et une enquête auprès de 350 salariés. Le lendemain, le Nasdaq perd 1,46 % et Palantir plus de 9 %, et une partie de la presse y voit l'effet du rapport et d'une remarque de Sam Altman sur une bulle de l'IA. Le rapport, lui, ne s'obtenait qu'en remplissant un formulaire. Le 26 août, le site Futuriom relevait que le chiffre tenait en une phrase sans calcul détaillé, et que le projet NANDA développe justement les protocoles d'agents que le rapport recommande.",
      "Un an plus tard, le chiffre circule toujours, jusqu'en ouverture d'articles de prestataires qui vendent du déploiement d'agents, comme Varick Agents le 30 septembre 2026. Ce qui reste vrai est plus modeste et mieux mesuré. En février 2026, une enquête du National Bureau of Economic Research auprès de près de 6 000 dirigeants aux États-Unis, au Royaume-Uni, en Allemagne et en Australie trouve que plus de 80 % des entreprises ne voient encore aucun effet de l'IA sur leur productivité ni sur leurs effectifs. Les mêmes dirigeants en attendent une hausse de productivité de 1,4 % sur les trois années suivantes.",
    ],
    office: [
      {who: 'q', text: "Le comité de direction ressort le chiffre des 95 % pour bloquer notre pilote. Je réponds quoi ?"},
      {who: 'a', text: "Propose d'écrire avant de lancer le chiffre que le pilote doit faire bouger, la date à laquelle on le regarde et ce qu'on fait s'il ne bouge pas. Un pilote jugé sur un critère fixé d'avance t'en apprendra plus sur ton entreprise que le pourcentage d'une enquête sur d'autres."},
    ],
    avoid:
      "« Le chiffre du MIT est faux, donc l'IA fonctionne en entreprise. » Les critiques visent le calcul et l'échantillon, pas le constat d'ensemble ; en février 2026, plus de 80 % des entreprises interrogées par le NBER ne voyaient encore aucun effet de l'IA sur leur productivité.",
    video: null,
    sources: [
      {
        label: "Aditya Challapally, Chris Pease, Ramesh Raskar et Pradyumna Chari (MIT NANDA), The GenAI Divide: State of AI in Business 2025, juillet 2025, copie du PDF (recherche de janvier à juin 2025 ; plus de 300 initiatives publiques, 52 organisations interrogées, 153 dirigeants sondés lors de quatre conférences ; « 95% of organizations are getting zero return » ; outils spécialisés : 60 % étudiés, 20 % en pilote, 5 % mis en place avec succès ; réussite : « marked and sustained productivity and/or P&L impact » selon utilisateurs ou dirigeants, mesurée 6 mois après le pilote ; chiffres « directionally accurate based on individual interviews » ; « Six-month observation period may be insufficient » ; 40 % des entreprises ont un abonnement LLM, des salariés de plus de 90 % en utilisent ; NANDA s'appuie sur MCP et A2A). Calcul : 5 / 20 = 25 % des organisations qui ont lancé un pilote",
        url: 'https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf',
      },
      {
        label: "Sheryl Estrada, MIT report: 95% of generative AI pilots at companies are failing, Fortune, 18 août 2025 (étude présentée comme fondée sur « 150 interviews with leaders, a survey of 350 employees, and an analysis of 300 public AI deployments »)",
        url: 'https://fortune.com/2025/08/18/mit-report-95-percent-generative-ai-pilots-at-companies-failing-cfo/',
      },
      {
        label: "John Towfighi, AI and tech stocks slide as summer rally peters out, CNN, 20 août 2025 (Nasdaq -1,46 % le mardi 19 août, Palantir -9,35 % ; pas de déclencheur explicite, mais des investisseurs citent les propos de Sam Altman et le rapport du MIT)",
        url: 'https://www.cnn.com/2025/08/20/business/us-stock-market-tech-ai-selloff',
      },
      {
        label: "Beatrice Nolan, U.S. tech stocks slide after Altman warns of 'bubble' in AI and MIT study doubts the hype, Fortune, 20 août 2025 (Nvidia -3,5 %, Palantir près de -10 % ; baisse « sparked in part » par le rapport du MIT)",
        url: 'https://fortune.com/2025/08/20/us-tech-stocks-slide-altman-bubble-ai-mit-study/',
      },
      {
        label: "R. Scott Raynovich, Why We Don't Believe MIT NANDA's Weird AI Study, Futuriom, 26 août 2025 (« The 95% figure is presented in one sentence » ; rapport derrière un formulaire ; NANDA, projet issu du MIT Media Lab qui développe des protocoles d'agents ; critique de Kevin Werbach, Wharton)",
        url: 'https://www.futuriom.com/articles/news/why-we-dont-believe-mit-nandas-werid-ai-study/2025/08',
      },
      {
        label: "Rob Wiblin, The story behind the bad AI stat that moved markets and misled millions, 80,000 Hours, 28 avril 2026, enregistré le 13 février 2026 (80 % des entreprises n'avaient jamais lancé de pilote d'outil sur mesure ; environ un quart de réussite parmi celles qui l'avaient fait ; Fortune annonçait 150 entretiens et 350 salariés contre 52 entretiens et 153 réponses ; rapport accessible par un formulaire Google)",
        url: 'https://80000hours.org/podcast/episodes/ai-workplace-mit-study/',
      },
      {
        label: "Yotzov, Barrero, Bloom, Davis et al., Firm Data on AI, NBER Working Paper 34836, février 2026 (près de 6 000 dirigeants aux États-Unis, au Royaume-Uni, en Allemagne et en Australie ; plus de 80 % des entreprises sans effet de l'IA sur l'emploi ni la productivité au cours des trois dernières années ; prévision de +1,4 % de productivité sur trois ans)",
        url: 'https://www.nber.org/papers/w34836',
      },
      {
        label: "Daniel Kornum (Varick Agents), If AI Is So Great, Why Isn't It Working, 30 septembre 2026 (« 5% of integrated AI pilots are pulling millions in value. The other 95% have nothing to show for it »)",
        url: 'https://www.varickagents.com/blog/if-ai-is-so-great-why-isn-t-it-working',
      },
    ],
  },
];

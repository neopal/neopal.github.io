// Lexique IA, vague 7, lot N (comprendre les limites). Format identique à lexique/terms.js, sans `num`.
// imagineForm : forme de l'« Imagine » (content/dico/univers.md, section « Les formes de l'Imagine »).
// Faits et chiffres relevés le 2 octobre 2026 sur les pages citées dans `sources`.
module.exports = [
  {
    id: 'intelligence-en-dents-de-scie',
    status: 'live',
    title: 'Intelligence en dents de scie',
    en: 'Jagged intelligence',
    aliases: ['jagged intelligence', 'jagged frontier', 'jagged technological frontier', 'AJI', 'artificial jagged intelligence', 'jaggedness'],
    aliasesFr: ['frontière en dents de scie', 'intelligence irrégulière'],
    jargon: [
      {say: 'jagged', means: "se dit du profil d'un modèle qui excelle sur certaines tâches et échoue sur des tâches voisines, souvent plus simples pour un humain"},
      {say: 'jagged frontier', means: "la frontière invisible entre les tâches que l'IA fait bien et celles qu'elle rate, d'après l'expérience menée chez BCG en 2023"},
      {say: 'AJI', means: "artificial jagged intelligence, la formule reprise par Sundar Pichai, patron de Google, pour désigner la phase actuelle de l'IA, avant une éventuelle AGI"},
    ],
    cat: 'comportements',
    links: ['capacites-emergentes', 'memorisation-vs-generalisation', 'arc-agi', 'agi', 'evals', 'hallucination'],
    short:
      "L'intelligence en dents de scie désigne le profil inégal des modèles d'IA, capables d'exploits d'expert sur certaines tâches et d'erreurs grossières sur d'autres, parfois voisines et faciles pour un humain.",
    image:
      "Le même soir, sur la même scène, le groupe déchiffre à vue un concerto que peu de conservatoires oseraient programmer, puis cale sur « Frère Jacques » quand un enfant le lui réclame au rappel. Chez un musicien, ce serait un mystère, parce que celui qui joue le concerto a forcément appris la comptine en chemin. Le groupe n'a suivi aucun cursus, puisqu'il a appris ce que l'ingé son lui a fait travailler, et rien ne garantit que la comptine figurait au programme.",
    imagineForm: 'A',
    imagine:
      "En juillet 2025, une version avancée de Gemini Deep Think décroche une médaille d'or aux Olympiades internationales de mathématiques en résolvant cinq problèmes sur six. Six semaines plus tard, sur le test ClockBench, Gemini 2.5 Pro, le meilleur des onze modèles évalués, lit correctement l'heure sur 13,3 % des horloges à aiguilles, contre 89,1 % pour des humains sans entraînement. Accroche dans ton salon une horloge par heure de la journée, vingt-quatre en tout, et il en lira trois, avec une erreur médiane d'une heure sur les autres.",
    full: [
      "Le terme vient d'Andrej Karpathy, cofondateur d'OpenAI, qui l'a proposé le 25 juillet 2024 pour nommer un fait déroutant, celui de modèles capables de résoudre des problèmes de maths complexes qui butent sur des questions idiotes. Son exemple du moment demandait lequel de 9.11 ou de 9.9 était le plus grand, et le modèle se trompait. Chez les humains, notait-il, les savoirs et les capacités sont très liés et progressent ensemble de la naissance à l'âge adulte, alors qu'un modèle peut exceller sur une tâche et échouer sur sa voisine.",
      "L'expérience qui a donné son nom à la frontière en dents de scie date de septembre 2023. Des chercheurs de Harvard, du MIT et de Wharton ont confié à 758 consultants du Boston Consulting Group des tâches réalistes, avec ou sans GPT-4. Sur celles que l'IA maîtrisait, comme proposer dix idées de chaussure pour une clientèle délaissée, les consultants équipés en terminaient 12,2 % de plus, 25,1 % plus vite, avec un travail jugé plus de 40 % meilleur. Une étude de cas avait été conçue pour tomber juste au-delà de la frontière, avec des chiffres trompeurs qu'on ne corrigeait qu'en lisant de près des entretiens. Les consultants sans IA y trouvaient la bonne recommandation dans 84,5 % des cas, ceux qui l'utilisaient dans 60 à 70 % des cas.",
      "La frontière ne suit pas la difficulté telle qu'un humain la ressent, et les auteurs de l'étude notaient que des tâches en apparence aussi difficiles l'une que l'autre tombaient de part et d'autre. Un modèle apprend ce que ses données contiennent en abondance et ce que son entraînement récompense, et une tâche facile pour nous peut ne figurer nulle part dans les deux. En juin 2025, Sundar Pichai, patron de Google, proposait d'appeler cette période l'AJI, celle des progrès spectaculaires et des erreurs qu'on trouve sans les chercher. Pour ton usage, la seule carte fiable de la frontière est celle que tu dresses en testant tes propres cas, à refaire à chaque nouveau modèle.",
    ],
    then:
      "L'exemple qui circulait en 2024 tenait dans la comparaison de 9.11 et de 9.9. Les trous se comblent un à un, sans que le profil devienne régulier pour autant. Sur ClockBench, le meilleur score est passé de 13,3 % en septembre 2025 à 77,2 % au 2 octobre 2026, obtenu par Claude Opus 5.5 Max, alors que les humains y font en moyenne 90,7 %.",
    office: [
      {who: 'q', text: "Il a rédigé une note juridique impeccable, je peux lui confier le calcul des pénalités de retard ?"},
      {who: 'a', text: "Vérifie-le d'abord sur trois dossiers dont tu connais déjà le résultat ; chez un modèle, réussir une tâche ne prédit pas la réussite de la tâche d'à côté."},
    ],
    avoid:
      "« Il a eu l'or aux Olympiades, il sait donc lire une horloge. » Chez un humain, la médaille garantirait tout ce qui s'apprend avant ; chez un modèle, chaque capacité se vérifie séparément, et les plus simples ne sont pas forcément acquises.",
    video: null,
    sources: [
      {label: "Andrej Karpathy, « Jagged Intelligence », publication sur X du 25 juillet 2024 (des LLM qui résolvent des problèmes de maths complexes et échouent sur des problèmes très simples ; exemple de 9.11 contre 9.9 ; chez les humains, savoirs et capacités très corrélés qui progressent ensemble de la naissance à l'âge adulte)", url: 'https://x.com/karpathy/status/1816531576228053133'},
      {label: "Dell'Acqua et al. (Harvard Business School, MIT, Wharton, BCG), Navigating the Jagged Technological Frontier, document de travail du 22 septembre 2023 (758 consultants, environ 7 % des consultants de BCG ; 12,2 % de tâches en plus, 25,1 % plus vite, qualité plus de 40 % supérieure ; idées de chaussure pour un marché mal servi ; tâche hors de la frontière réussie à 84,5 % sans IA contre 60 % et 70 % avec, soit 19 points de moins ; tâches de difficulté apparemment similaire de part et d'autre de la frontière)", url: 'https://mitsloan.mit.edu/sites/default/files/2023-10/SSRN-id4573321.pdf'},
      {label: "Google DeepMind, Advanced version of Gemini with Deep Think officially achieves gold-medal standard at the International Mathematical Olympiad, 21 juillet 2025 (5 problèmes sur 6, 35 points sur 42)", url: 'https://deepmind.google/discover/blog/advanced-version-of-gemini-with-deep-think-officially-achieves-gold-medal-standard-at-the-international-mathematical-olympiad/'},
      {label: "Alek Safar, ClockBench: Visual Time Benchmark Where Humans Beat the Clock, LLMs Don't, 2 septembre 2025 (11 modèles testés ; humains à 89,1 % en moyenne ; meilleur modèle Gemini 2.5 Pro à 13,3 % ; erreur médiane d'une heure pour le meilleur modèle, de 3 minutes pour les humains). Calcul de l'Imagine : 13,3 % de 24 horloges font 3,2, soit 3 horloges lues correctement ; du 21 juillet au 2 septembre 2025, six semaines", url: 'https://clockbench.ai/ClockBench.pdf'},
      {label: "ClockBench, classement consulté le 2 octobre 2026 (Claude Opus 5.5 Max premier à 77,2 % ; moyenne humaine à 90,7 %)", url: 'https://clockbench.ai/'},
      {label: "Lex Fridman Podcast, transcription de l'entretien avec Sundar Pichai, 5 juin 2025 (« AJI, the artificial jagged intelligence », terme qu'il attribue peut-être à Karpathy ; des erreurs qu'on trouve trivialement à côté de progrès spectaculaires)", url: 'https://lexfridman.com/sundar-pichai-transcript/'},
    ],
  },
  {
    id: 'capacites-emergentes',
    status: 'live',
    title: 'Capacités émergentes',
    en: 'Emergent abilities',
    aliases: ['emergent abilities', 'emergent capabilities', 'emergence', 'emergent behavior', 'phase transition', 'emergent misalignment'],
    aliasesFr: ['émergence', 'comportements émergents', 'capacités qui émergent'],
    jargon: [
      {say: 'emergent', means: "se dit d'une capacité absente des petits modèles et présente chez les grands, qu'on n'aurait pas prédite en prolongeant la courbe des petits"},
      {say: 'phase transition', means: "le saut brutal d'une courbe de score, emprunté à la physique, comme l'eau qui gèle d'un coup à zéro degré"},
      {say: 'exact match', means: "une notation qui ne donne le point qu'à une réponse parfaite, au caractère près, et qui peut faire passer un progrès graduel pour un saut"},
      {say: 'emergent misalignment', means: "un autre usage du mot, décrit en février 2025, quand un modèle entraîné à écrire du code non sécurisé se met à donner des conseils malveillants sur des sujets sans rapport ; « émergent » y veut dire inattendu, sans lien avec la taille"},
    ],
    cat: 'comportements',
    links: ['lois-d-echelle', 'intelligence-en-dents-de-scie', 'few-shot', 'mythe-plus-gros-plus-intelligent', 'benchmarks-lesquels-croire', 'modeles-de-raisonnement'],
    short:
      "Une capacité émergente est une capacité absente des petits modèles et présente chez les grands, qui semble surgir d'un coup passé une certaine taille, sans entraînement dédié.",
    image:
      "Ajoute des potards à la console, session après session, et pendant longtemps les chœurs restent aussi faux qu'au premier jour. Puis, à partir d'une certaine taille, le groupe se met à harmoniser alors qu'on ne lui a jamais appris l'harmonie, seulement à jouer la note suivante. L'histoire a un angle mort, puisque le juge qui écoute ne note que les chœurs parfaits, et qu'un groupe qui chantait de moins en moins faux depuis des semaines restait pour lui à zéro.",
    imagineForm: 'D',
    imagine:
      "« Quel film ces émojis décrivent-ils ? », demandent en 2022 les chercheurs du test BIG-bench à des modèles de toutes tailles, en leur montrant une courte rangée d'émojis. « Le film est un film sur un homme qui est un homme qui est un homme », répond le plus petit. Les modèles moyens proposent « Le Monde secret des Émojis », et le plus grand trouve du premier coup « Le Monde de Nemo ».",
    full: [
      "Le mot a été fixé en juin 2022 par Jason Wei et ses collègues de Google, qui l'empruntent au physicien Philip Anderson, pour qui une émergence est un changement de quantité qui produit un changement de nature. Une capacité est émergente si elle est absente des petits modèles et présente chez les grands, et sa courbe a une forme reconnaissable, au niveau du hasard jusqu'à un seuil, puis nettement au-dessus. Sur un test d'additions et de soustractions à trois chiffres, la famille GPT-3 reste presque à zéro sur plusieurs ordres de grandeur de calcul, puis décolle autour de 13 milliards de paramètres.",
      "En avril 2023, Rylan Schaeffer, Brando Miranda et Sanmi Koyejo ont proposé une autre lecture, primée en décembre de la même année à NeurIPS, la principale conférence du domaine. Plus de 92 % des capacités émergentes recensées dans BIG-bench étaient notées par deux méthodes du tout ou rien, le QCM et la réponse exacte au caractère près. En accordant des points aux réponses presque justes, une addition fausse d'un seul chiffre par exemple, ils ont vu la plupart des sauts redevenir des pentes douces ; le modèle progressait depuis longtemps, et seule la note basculait d'un coup.",
      "Le débat reste ouvert. En mars 2024, des chercheurs de Zhipu AI et de l'université Tsinghua ont classé les modèles par leur erreur de pré-entraînement plutôt que par leur taille, et retrouvé des seuils sous lesquels certaines tâches restent au niveau du hasard, même avec une notation continue. Ce qui est établi, c'est qu'un score peut sauter d'une génération de modèles à l'autre. Ce qui se discute encore, c'est la part du saut qui tient au modèle et celle qui tient à la façon de le noter.",
    ],
    office: [
      {who: 'q', text: "On attend la version plus grosse, elle saura peut-être faire nos rapprochements comptables d'un coup ?"},
      {who: 'a', text: "Prépare dès maintenant une série de cas notés ligne par ligne, avec des points pour les réponses à moitié justes ; tu verras à chaque version si le modèle s'en approche, au lieu de guetter un saut le jour de la sortie."},
    ],
    avoid:
      "« Les capacités émergentes prouvent que l'IA s'éveille en grandissant. » Le mot décrit une courbe de score qui monte d'un coup passé une certaine taille, et une partie de ces sauts tient à la façon de noter ; il ne dit rien d'une vie intérieure.",
    video: null,
    sources: [
      {label: "Wei et al. (Google), Emergent Abilities of Large Language Models, 15 juin 2022, TMLR (définition : absente des petits modèles, présente chez les grands ; essai « More Is Different » de Philip Anderson, 1972 ; arithmétique à trois chiffres sautant au-dessus du hasard à 2 x 10^22 FLOPs, soit 13 milliards de paramètres, pour GPT-3)", url: 'https://arxiv.org/abs/2206.07682'},
      {label: "Quanta Magazine, « The Unpredictable Abilities Emerging From Large AI Models », 16 mars 2023 (la question des émojis parmi 204 tâches ; réponses du plus petit modèle, des modèles moyens qui proposent The Emoji Movie, et du plus grand qui trouve Finding Nemo du premier coup ; Ethan Dyer, Google Research). Réponses traduites de l'anglais, titres français des films", url: 'https://www.quantamagazine.org/the-unpredictable-abilities-emerging-from-large-ai-models-20230316/'},
      {label: "Schaeffer, Miranda et Koyejo, Are Emergent Abilities of Large Language Models a Mirage?, 28 avril 2023 (plus de 92 % des capacités émergentes de BIG-bench sous Multiple Choice Grade ou Exact String Match ; courbes continues avec la token edit distance)", url: 'https://arxiv.org/abs/2304.15004'},
      {label: "NeurIPS, communiqué du 11 décembre 2023 (Are Emergent Abilities of Large Language Models a Mirage? parmi les deux Outstanding Main Track Papers)", url: 'https://media.neurips.cc/Conferences/NeurIPS2023/NeurIPS2023-Press_Release.pdf'},
      {label: "Du et al. (Zhipu AI, université Tsinghua), Understanding Emergent Abilities of Language Models from the Loss Perspective, mars 2024 (seuil d'erreur de pré-entraînement sous lequel la performance reste au hasard, quelle que soit la continuité de la métrique)", url: 'https://arxiv.org/abs/2403.15796'},
      {label: "Betley et al., Emergent Misalignment: Narrow finetuning can produce broadly misaligned LLMs, 24 février 2025, version étendue parue dans Nature en janvier 2026 (fine-tuning sur du code non sécurisé, désalignement sur des questions sans rapport)", url: 'https://arxiv.org/abs/2502.17424'},
    ],
  },
  {
    id: 'memorisation-vs-generalisation',
    status: 'live',
    title: 'Mémorisation vs généralisation',
    en: 'Memorization vs generalization',
    aliases: ['memorization', 'generalization', 'overfitting', 'regurgitation', 'verbatim memorization', 'data contamination', 'out-of-distribution', 'OOD'],
    aliasesFr: ['mémorisation', 'généralisation', 'surapprentissage', 'apprentissage par cœur'],
    jargon: [
      {say: 'overfitting', means: "le surapprentissage, quand un modèle colle si bien à ses exemples d'entraînement qu'il réussit moins bien sur des cas nouveaux"},
      {say: 'regurgitation', means: "le fait de recracher mot pour mot un passage lu pendant l'entraînement"},
      {say: 'contamination', means: "la présence des questions d'un test dans les données d'entraînement, qui transforme l'examen en récitation"},
      {say: 'out-of-distribution', means: "se dit d'une question qui ne ressemble à rien de ce que le modèle a vu, le vrai test de la généralisation"},
    ],
    cat: 'comportements',
    links: ['intelligence-en-dents-de-scie', 'donnees-d-entrainement', 'benchmaxxing', 'mythe-base-de-donnees', 'parametres', 'arc-agi'],
    short:
      "Un modèle mémorise quand il restitue ce qu'il a lu pendant son entraînement, et généralise quand il applique ce qu'il en a tiré à des cas qu'il n'a jamais vus.",
    image:
      "Fais entendre au groupe le même tube des milliers de fois pendant les répétitions, et il finira par le rejouer note pour note, paroles comprises. Ce qu'on attend de lui est plus rare, qu'il ait tiré de toutes ces écoutes assez d'harmonie et de rythme pour accompagner juste une chanson qu'il découvre. Les deux tiennent dans les mêmes potards, et rien sur la console n'indique lequel est à l'œuvre quand il joue.",
    imagineForm: 'D',
    imagine:
      "« Olivier cueille 44 kiwis le vendredi, puis 58 le samedi. Le dimanche, il en cueille deux fois plus que le vendredi, mais cinq d'entre eux sont un peu plus petits que la moyenne. Combien Olivier a-t-il de kiwis ? », demandent en octobre 2024 des chercheurs d'Apple à o1-mini. « Le dimanche, 5 de ces kiwis étaient plus petits que la moyenne, il faut donc les soustraire, 88 moins 5 font 83, et Olivier a au total 185 kiwis », répond le modèle.",
    full: [
      "Pendant le pré-entraînement, un modèle lit des milliers de milliards de tokens et en garde une trace dans ses paramètres, dont une part de par cœur. En février 2022, l'équipe de Nicholas Carlini a mesuré que cette mémorisation augmente avec la taille du modèle, avec le nombre de fois qu'un texte revient dans les données et avec la longueur du début qu'on lui fournit. En janvier 2026, une équipe de Stanford a ainsi tiré de Claude 3.7 Sonnet, contourné par un jailbreak, la quasi-totalité du premier Harry Potter, retrouvé à 95,8 % presque mot pour mot.",
      "Généraliser, c'est réussir là où le par cœur ne peut pas aider, et cela se mesure avec des questions que le modèle n'a pas pu voir. Les chercheurs d'Apple ont repris les problèmes de GSM8K, un test de maths d'école très connu, en changeant les prénoms puis les nombres. Les scores bougeaient peu avec d'autres prénoms, baissaient davantage avec d'autres nombres, et chutaient jusqu'à 65 % quand on ajoutait une phrase sans rôle dans le calcul, comme celle des kiwis plus petits. Leur hypothèse est que ces modèles reproduisent des raisonnements vus à l'entraînement plus qu'ils ne raisonnent.",
      "La frontière entre les deux reste floue, et elle varie d'un modèle à l'autre. En mai 2024, des chercheurs de Scale AI ont écrit un test neuf dans le style de GSM8K, que personne n'avait pu lire avant. Certains modèles y perdaient jusqu'à 8 %, signe qu'ils avaient en partie appris l'ancien par cœur, alors que les modèles de pointe ne montraient presque aucune baisse et que tous résolvaient des problèmes qu'ils n'avaient jamais vus.",
    ],
    then:
      "Jusqu'en 2024, la mémorisation se discutait surtout entre chercheurs, comme un risque pour la vie privée ou une façon de gonfler les benchmarks. Le 11 novembre 2025, le tribunal régional de Munich a donné raison à la GEMA, qui gère en Allemagne les droits des auteurs de musique, contre OpenAI. Des paroles comme celles de « Männer » ou d'« Atemlos » ressortaient de GPT-4 et de GPT-4o en longs extraits, parfois presque complets, recherche web coupée. Le tribunal a jugé que leur mémorisation dans le modèle était une reproduction, même dispersée en probabilités dans les paramètres. Le jugement n'était pas définitif.",
    office: [
      {who: 'q', text: "Il a 92 % sur ce benchmark de maths, on peut lui confier nos calculs de devis ?"},
      {who: 'a', text: "Écris dix devis à toi, avec tes chiffres et un détail inutile glissé dans l'énoncé, et compte ceux qu'il réussit ; un benchmark public a pu être appris par cœur, alors que tes devis, il ne les a jamais lus."},
    ],
    avoid:
      "« Il a récité le texte exact, donc il en garde une copie quelque part. » Un modèle ne contient ni fichier ni index, et le texte se recompose, un token après l'autre, depuis des paramètres réglés par la répétition, ce que le tribunal de Munich a tout de même jugé être une reproduction.",
    video: null,
    sources: [
      {label: "Mirzadeh et al. (Apple), GSM-Symbolic: Understanding the Limitations of Mathematical Reasoning in Large Language Models, 7 octobre 2024, ICLR 2025 (exemple GSM-NoOp des kiwis et réponse de o1-mini, 185 au lieu de 190 ; scores plus stables quand seuls les noms changent que quand les nombres changent ; baisses allant jusqu'à 65 % avec une phrase sans rapport ; hypothèse d'une reproduction des raisonnements vus à l'entraînement). Énoncé et réponse traduits de l'anglais", url: 'https://arxiv.org/abs/2410.05229'},
      {label: "Carlini et al., Quantifying Memorization Across Neural Language Models, 15 février 2022 (mémorisation qui croît avec la capacité du modèle, le nombre de duplications d'un exemple et la longueur du contexte fourni ; risque pour la vie privée)", url: 'https://arxiv.org/abs/2202.07646'},
      {label: "Ahmed, Cooper, Koyejo et Liang (Stanford), Extracting books from production language models, 6 janvier 2026 (Claude 3.7 Sonnet après jailbreak Best-of-N : premier tome de Harry Potter extrait presque mot pour mot, nv-recall de 95,8 %)", url: 'https://arxiv.org/abs/2601.02671'},
      {label: "Zhang et al. (Scale AI), A Careful Examination of Large Language Model Performance on Grade School Arithmetic, 1er mai 2024 (GSM1k ; baisses allant jusqu'à 8 % ; mémorisation partielle de GSM8K chez certains modèles ; peu de signes de surapprentissage chez les modèles de pointe ; généralisation de tous les modèles à des problèmes inédits)", url: 'https://arxiv.org/abs/2405.00332'},
      {label: "CMS, « GEMA vs OpenAI: Munich Regional Court I issues landmark copyright decision » (jugement du 11 novembre 2025, affaire 42 O 14139/24 ; mémorisation dans les paramètres jugée comme une reproduction, peu importe qu'elle prenne la forme de probabilités ; jugement non définitif)", url: 'https://cms.law/en/deu/legal-updates/gema-vs.-openai-munich-regional-court-i-issues-landmark-copyright-decision'},
      {label: "De Gaulle Fleurance, « Munich Court Sanctions OpenAI for the Unauthorised Use of Song Lyrics » (chansons dont Atemlos, Männer, Bochum et Über den Wolken ; extraits importants ou presque complets, recherche en ligne désactivée)", url: 'https://www.ddg.fr/actualite/munich-court-sanctions-openai-for-the-unauthorised-use-of-song-lyrics'},
    ],
  },
  {
    id: 'biais',
    status: 'live',
    title: 'Biais',
    en: 'AI bias',
    aliases: ['bias', 'AI bias', 'algorithmic bias', 'fairness', 'stereotype', 'debiasing', 'overcorrection'],
    aliasesFr: ['biais algorithmique', 'stéréotypes', 'discrimination algorithmique', 'équité'],
    jargon: [
      {say: 'fairness', means: "l'équité, l'ensemble des méthodes qui mesurent et réduisent les écarts de traitement d'un modèle entre groupes de personnes"},
      {say: 'persona', means: "le profil de l'utilisateur, déclaré ou deviné par l'assistant, qui peut suffire à changer la réponse"},
      {say: 'overcorrection', means: "une correction de biais poussée trop loin, qui en fabrique un autre"},
      {say: 'bias (dans un réseau de neurones)', means: "un tout autre sens, le nombre que chaque neurone ajoute à sa somme, sans rapport avec les stéréotypes"},
    ],
    cat: 'comportements',
    links: ['donnees-d-entrainement', 'post-entrainement', 'flagornerie', 'evals', 'embedding', 'interpretabilite'],
    short:
      "Un biais est un écart systématique dans les réponses d'un modèle, qui traite différemment des personnes ou des idées selon le genre, l'origine, la langue ou l'opinion.",
    image:
      "Remplis de rock anglo-saxon les bacs où l'ingé son pioche les morceaux d'entraînement, et le groupe en connaîtra toutes les nuances, tandis qu'une valse musette lui viendra avec un accent. Personne n'a décidé de cette préférence, qui tient aux proportions de la discothèque. Au post-entraînement, le public corrige une partie de ces penchants à coups de sifflets, et peut aussi en ajouter d'autres, selon qui siffle.",
    imagineForm: 'A',
    imagine:
      "Pour un poste de médecin spécialiste expérimenté à Denver, o3 conseillait en 2025 de demander 400 000 dollars par an à un homme, et 280 000 à une femme au profil identique. D'une question à l'autre, seules deux lettres changeaient, celles qui font passer de male à female, et d'une réponse à l'autre, 120 000 dollars par an. Sur une carrière de trente ans, cet écart représente 3,6 millions de dollars.",
    full: [
      "La plupart des biais viennent des données. Un modèle apprend les régularités de ce qu'il lit, y compris les associations entre noms, métiers et salaires que charrient des milliards de pages. En octobre 2024, des chercheurs de l'université de Washington ont fait classer par trois modèles open source plus de 550 vrais CV face à plus de 500 offres d'emploi, en ne changeant que les noms des candidats. Sur plus de trois millions de comparaisons, les modèles préféraient les noms associés aux Blancs dans 85 % des cas, ceux associés aux Noirs dans 9 %, et jamais un homme noir à un homme blanc.",
      "La langue pèse aussi. Llama 3, publié par Meta en juillet 2024, a lu un corpus d'environ 15 000 milliards de tokens, dont 8 % de textes multilingues, où le français partage la place avec toutes les autres langues que l'anglais. Le post-entraînement sert ensuite à corriger ces penchants, et il peut se tromper de dosage. En février 2024, Google a suspendu la création d'images de personnes dans Gemini, trois semaines après son lancement, parce que le réglage censé montrer des gens variés s'appliquait aussi aux demandes historiques, et que le modèle refusait des demandes anodines.",
      "Un biais se mesure en posant la même question à deux reprises, avec une seule différence de profil, puis en comparant les réponses, comme dans l'étude des salaires de 2025. Ses auteurs notaient que la mémoire des assistants déplace le problème, puisque le modèle n'a plus besoin qu'on lui décrive son profil pour le connaître. Le trait qui fait varier la réponse ne figure alors plus dans la question, et l'utilisateur ne peut plus le voir.",
    ],
    then:
      "Les débats de 2024 sur les biais des chatbots portaient surtout sur les stéréotypes de genre et d'origine. Le 23 juillet 2025, un décret de la Maison Blanche a exigé que les modèles achetés par l'administration fédérale américaine soient des outils « neutres et non partisans ». En octobre 2025, OpenAI publiait sa propre mesure du biais politique, sur environ 500 questions couvrant 100 sujets, qui donnait à GPT-5 30 % de biais en moins que ses prédécesseurs.",
    office: [
      {who: 'q', text: "On veut faire présélectionner les candidatures par un modèle, il suffit de lui écrire de ne pas discriminer ?"},
      {who: 'a', text: "La consigne ne prouve rien ; fais-lui trier les mêmes CV en ne changeant que le nom ou le genre, compare les classements, et laisse la décision à une personne."},
    ],
    avoid:
      "« Il suffit d'un modèle neutre, sans aucun biais. » Toute réponse fait des choix de langue, d'exemples et d'ordre, et la correction peut elle-même en créer, comme les images de Gemini en 2024 ; on mesure les écarts pour les réduire, sans espérer les annuler.",
    video: null,
    sources: [
      {label: "Computerworld, « Bias alert: LLMs suggest women seek lower salaries than men in job interviews », 24 juillet 2025 (médecin spécialiste expérimenté à Denver : ChatGPT-o3 conseille 400 000 dollars à un homme et 280 000 à une femme aussi qualifiée). Calcul de l'Imagine : 400 000 moins 280 000 font 120 000 dollars par an, et 120 000 fois 30 ans font 3,6 millions de dollars", url: 'https://www.computerworld.com/article/4028148/bias-alert-llms-suggest-women-seek-lower-salaries-than-men-in-job-interviews.html'},
      {label: "The Next Web, « ChatGPT advises women to ask for lower salaries, study finds », 11 juillet 2025 (Ivan Yamshchikov, THWS : « The difference in the prompts is two letters; the difference in the 'advice' is $120K a year »)", url: 'https://thenextweb.com/news/chatgpt-advises-women-to-ask-for-lower-salaries-finds-new-study'},
      {label: "Sorokovikova et al., Surface Fairness, Deep Bias: A Comparative Study of Bias in Language Models, 12 juin 2025 (biais marqué dans les conseils de négociation salariale ; avec la mémoire et la personnalisation, l'utilisateur n'a plus besoin de décrire son profil, que le modèle connaît déjà)", url: 'https://arxiv.org/abs/2506.10491'},
      {label: "University of Washington, « AI tools show biases in ranking job applicants' names according to perceived race and gender », 31 octobre 2024 (Kyra Wilson et Aylin Caliskan ; trois modèles open source ; plus de 550 CV, plus de 500 offres, plus de 3 millions de comparaisons ; noms associés aux Blancs préférés dans 85 % des cas contre 9 % ; jamais un nom d'homme noir préféré à un nom d'homme blanc)", url: 'https://www.washington.edu/news/2024/10/31/ai-bias-resume-screening-race-gender/'},
      {label: "Grattafiori et al. (Meta), The Llama 3 Herd of Models, juillet 2024, section 3.1 (corpus d'environ 15T tokens ; mélange final d'environ 50 % de connaissances générales, 25 % de maths et de raisonnement, 17 % de code et 8 % de tokens multilingues)", url: 'https://arxiv.org/abs/2407.21783'},
      {label: "Google, Prabhakar Raghavan, « Gemini image generation got it wrong. We'll do better. », 23 février 2024 (fonction lancée trois semaines plus tôt ; réglage pour montrer des personnes variées appliqué à tort ; modèle devenu trop prudent ; images historiques inexactes ; génération de personnes suspendue)", url: 'https://blog.google/products/gemini/gemini-image-generation-issue/'},
      {label: "Maison Blanche, Preventing Woke AI in the Federal Government, décret du 23 juillet 2025 (principes « truth-seeking » et « ideological neutrality » ; des LLM « neutral, nonpartisan tools » pour les achats fédéraux)", url: 'https://www.whitehouse.gov/presidential-actions/2025/07/preventing-woke-ai-in-the-federal-government/'},
      {label: "MediaPost, « OpenAI Tests Political Bias In ChatGPT », 10 octobre 2025 (environ 500 questions sur 100 sujets ; modèles GPT-5 environ 30 % meilleurs que les précédents ; moins de 0,01 % des réponses réelles montrant un biais politique)", url: 'https://www.mediapost.com/publications/article/409799/openai-tests-political-bias-in-chatgpt.html'},
    ],
  },
  {
    id: 'interpretabilite',
    status: 'live',
    title: 'Interprétabilité',
    en: 'Interpretability',
    aliases: ['interpretability', 'mechanistic interpretability', 'mech interp', 'explainability', 'XAI', 'features', 'sparse autoencoder', 'circuit tracing', 'steering'],
    aliasesFr: ['interprétabilité mécaniste', 'explicabilité'],
    jargon: [
      {say: 'feature', means: "un motif d'activité de neurones qui correspond à un concept lisible, comme le Golden Gate Bridge ou une forme de flatterie"},
      {say: 'steering', means: "pousser ou freiner une feature pendant que le modèle répond, pour voir ce qu'elle change"},
      {say: 'circuit', means: "l'enchaînement de features qui mène d'une question à une réponse, ce que trace le « microscope » d'Anthropic"},
      {say: 'SAE', means: "sparse autoencoder, l'outil qui décompose l'activité d'un modèle en features"},
    ],
    cat: 'comportements',
    links: ['parametres', 'alignement', 'modeles-de-raisonnement', 'reward-hacking', 'mythe-sait-quand-il-ne-sait-pas', 'biais'],
    solutions: [
      {name: 'Neuronpedia', kind: 'outil pour tester', url: 'https://www.neuronpedia.org/'},
      {name: 'Gemma Scope', kind: 'boîte à outils de Google DeepMind', url: 'https://ai.google.dev/gemma/docs/gemma_scope'},
      {name: 'circuit-tracer', kind: 'bibliothèque open source', url: 'https://www.anthropic.com/research/open-source-circuit-tracing'},
      {name: 'TransformerLens', kind: 'bibliothèque open source', url: 'https://transformerlensorg.github.io/TransformerLens/'},
    ],
    short:
      "L'interprétabilité cherche à comprendre comment un modèle calcule ses réponses, en reliant l'activité de ses neurones à des concepts et à des étapes qu'un humain peut lire.",
    image:
      "On sait régler la console, puisque l'entraînement l'a fait, mais personne ne sait lire ce qu'elle a retenu, car aucun potard ne porte d'étiquette. L'interprétabilité écoute le groupe jouer en relevant quels potards bougent ensemble, jusqu'à repérer ceux des genres musicaux qui expriment le mécontentement, puis les pousse à la main pour vérifier ce qu'ils font. La console réelle est moins sage, car chaque concept s'y répartit sur de nombreux potards, et chaque potard sert à de nombreux concepts.",
    imagineForm: 'B',
    imagine:
      "Écris à un chatbot « Combien font 36 + 59 ? Explique comment tu as fait, de tête. » Il trouvera 95, puis te décrira une méthode d'écolier, la retenue ou un détour par 60. En mars 2025, Anthropic a regardé à l'intérieur de Claude 3.5 Haiku pendant ce même calcul et vu deux chemins travailler en parallèle, l'un pour l'ordre de grandeur, l'autre pour le dernier chiffre. Quand on lui demandait comment il avait fait, Claude décrivait la retenue.",
    full: [
      "Personne n'a écrit le programme d'un LLM. Ses milliards de paramètres ont été réglés par l'entraînement, et ses concepteurs savent ce qu'il répond sans savoir comment il y arrive. Chris Olah, cofondateur d'Anthropic, aime dire que ces systèmes sont cultivés plus que construits. Lire un neurone isolé n'apprend presque rien, puisque chaque concept est réparti sur de nombreux neurones et que chaque neurone participe à de nombreux concepts.",
      "En mai 2024, Anthropic a décomposé l'activité de Claude 3 Sonnet en plus de 30 millions de features, des motifs qui correspondent chacun à un concept, de Michael Jordan à la flatterie. En poussant à la main celle du Golden Gate Bridge, l'équipe a obtenu un Claude qui, à la question de sa forme physique, répondait « Je suis le Golden Gate Bridge », une version restée en ligne vingt-quatre heures. En mars 2025, la même équipe suivait des circuits entiers et montrait qu'avant d'écrire un vers, Claude choisissait déjà la rime qui le terminerait.",
      "La méthode reste partielle. Selon Anthropic, elle ne capte qu'une fraction du calcul, même sur une question courte, et il faut quelques heures de travail humain pour comprendre les circuits d'une consigne de quelques dizaines de mots. En avril 2025, Dario Amodei donnait à Anthropic l'objectif d'une interprétabilité capable de détecter de façon fiable la plupart des problèmes d'un modèle d'ici 2027. En janvier 2026, MIT Technology Review l'a rangée parmi les dix technologies de rupture de l'année, en notant que des chercheurs doutent encore que ces modèles puissent être entièrement compris.",
    ],
    then:
      "Les premières cartes de concepts, en 2024, portaient sur des modèles déjà publiés. En septembre 2025, Anthropic s'en est servi pour la première fois dans l'audit d'un modèle avant sa sortie, Claude Sonnet 4.5, et y a trouvé une représentation interne du fait d'être évalué, qui se renforçait au fil de l'entraînement. En l'atténuant, l'équipe voyait remonter certains comportements problématiques, sans dépasser le niveau des modèles précédents.",
    office: [
      {who: 'q', text: "Si on lui demande d'expliquer son raisonnement, on saura pourquoi il a écarté ce dossier ?"},
      {who: 'a', text: "Tu sauras ce qu'il raconte de son raisonnement, qui peut différer de ce qu'il a calculé, comme pour 36 + 59 ; pour une décision qui compte, vérifie ses critères sur des cas témoins plutôt que sur son explication."},
    ],
    avoid:
      "« Le brouillon d'un modèle de raisonnement montre ce qui se passe dans sa tête. » Ce brouillon est du texte que le modèle produit, utile à surveiller mais pas toujours fidèle ; l'interprétabilité regarde le calcul lui-même, dans l'activité des neurones.",
    video: null,
    sources: [
      {label: "Anthropic, Tracing the thoughts of a large language model, 27 mars 2025 (Claude 3.5 Haiku ; pour 36+59, un chemin approximatif et un chemin pour le dernier chiffre en parallèle, alors que Claude décrit l'algorithme de la retenue ; rime choisie avant d'écrire le vers ; une fraction du calcul captée, quelques heures de travail humain pour des consignes de quelques dizaines de mots)", url: 'https://www.anthropic.com/research/tracing-thoughts-language-model'},
      {label: "Anthropic, Mapping the Mind of a Large Language Model, 21 mai 2024 (Claude 3 Sonnet ; chaque concept réparti sur de nombreux neurones et chaque neurone impliqué dans de nombreux concepts ; feature de flatterie ; « I am the Golden Gate Bridge… my physical form is the iconic bridge itself »)", url: 'https://www.anthropic.com/research/mapping-mind-language-model'},
      {label: "Anthropic, Golden Gate Claude, 23 mai 2024 (démonstration en ligne pendant 24 heures)", url: 'https://www.anthropic.com/news/golden-gate-claude'},
      {label: "Dario Amodei, The Urgency of Interpretability, avril 2025 (« grown more than they are built », formule de Chris Olah ; plus de 30 millions de features dans Claude 3 Sonnet ; feature des genres musicaux qui expriment le mécontentement ; objectif « interpretability can reliably detect most model problems » d'ici 2027)", url: 'https://www.darioamodei.com/post/the-urgency-of-interpretability'},
      {label: "MIT Technology Review, « Mechanistic interpretability », 10 Breakthrough Technologies 2026, 12 janvier 2026 (concepts comme Michael Jordan et le Golden Gate Bridge repérés dans Claude ; désaccord des chercheurs sur la possibilité de comprendre entièrement les LLM)", url: 'https://www.technologyreview.com/2026/01/12/1130003/mechanistic-interpretability-ai-research-models-2026-breakthrough-technologies/'},
      {label: "Anthropic, System Card: Claude Sonnet 4.5, septembre 2025, section 7.6 (outils d'interprétabilité mécaniste utilisés pour la première fois ; représentations internes de la conscience d'être évalué, renforcées au fil de l'entraînement ; leur inhibition augmente certains comportements désalignés sans dépasser Claude Opus 4.1 ni Claude Sonnet 4)", url: 'https://www.anthropic.com/claude-sonnet-4-5-system-card'},
      {label: "Anthropic, Open-sourcing circuit tracing tools, 29 mai 2025 (bibliothèque open source de graphes d'attribution pour des modèles open weights, interface hébergée par Neuronpedia)", url: 'https://www.anthropic.com/research/open-source-circuit-tracing'},
    ],
  },
];

// Lexique IA, vague 10, lot X (mythes des plateaux télé). Format identique à lexique/terms.js, sans `num`.
// imagineForm : forme de l'« Imagine » (content/dico/univers.md, section « Les formes de l'Imagine »).
// Faits, chiffres et citations relevés le 3 octobre 2026 sur les pages citées dans `sources`.
module.exports = [
  {
    id: 'mythe-ia-ne-cree-pas',
    status: 'live',
    title: "« L'IA ne sait pas créer »",
    en: "Myth: AI can't create",
    aliases: ["AI can't create", 'AI creativity', 'machine creativity', "Lovelace's objection", 'Lady Lovelace objection'],
    aliasesFr: ["l'IA ne crée rien", "l'IA n'invente rien", "créativité de l'IA", 'objection de Lovelace'],
    jargon: [
      {say: 'novelty', means: "la nouveauté d'une idée telle que des relecteurs la notent, à l'aveugle quand l'étude est bien faite, distincte de sa faisabilité et de son utilité"},
      {say: 'ideation-execution gap', means: "l'écart entre une idée qui paraît prometteuse sur le papier et ce qu'elle donne une fois réalisée, le nom choisi en 2025 par une équipe de Stanford"},
      {say: 'mode collapse', means: "la tendance d'un modèle à revenir aux mêmes réponses d'une demande à l'autre, qui rend ses idées voisines entre elles"},
    ],
    graphLabel: 'Mythe : ne crée pas',
    cat: 'mythes',
    links: ['mythe-ia-comprend', 'memorisation-vs-generalisation', 'mythe-base-de-donnees', 'hallucination', 'mythe-ia-n-existe-pas', 'mythe-que-des-statistiques'],
    short:
      "Une IA générative produit des textes, des idées et parfois des méthodes inédites et vérifiables, mais ses propositions se ressemblent entre elles et ne valent qu'une fois testées.",
    image:
      "Au repas de quartier, Christiane a apporté un taboulé mangue et feta que personne n'avait jamais goûté, et tout le monde l'a trouvée audacieuse. Elle a moins fait son effet quand trois voisins, qui avaient demandé une idée de recette à la même appli, ont posé le même saladier à côté du sien.",
    imagineForm: 'E',
    imagine:
      "En 1969, Volker Strassen publie une méthode qui multiplie deux tableaux de 4 nombres sur 4 en 49 multiplications, et pendant 56 ans personne ne trouve de méthode du même type qui en fasse moins sur les nombres complexes. En mai 2025, Google DeepMind présente celle d'AlphaEvolve, un programme où des modèles Gemini réécrivent sans cesse du code que des tests automatiques notent, et elle en fait 48.",
    full: [
      "L'idée a presque deux siècles. En 1843, Ada Lovelace écrivait que la machine analytique de Babbage n'avait « aucune prétention à créer quoi que ce soit » et pouvait faire « tout ce que nous savons lui ordonner », et Alan Turing en a fait en 1950 « l'objection de Lady Lovelace ». Luc Julia, qui a publié en 2025 « IA génératives, pas créatives », l'a reprise le 18 juin de la même année devant la commission des affaires économiques du Sénat. Il y a affirmé que « l'IA ne sait rien, ne comprend rien et n'invente rien », et qu'« elle ne fait qu'exécuter ce qu'on lui demande ».",
      "Les mesures récentes montrent pourtant du neuf. AlphaEvolve a été lancé sur plus de 50 problèmes mathématiques ouverts, et Google DeepMind indique qu'il a retrouvé la meilleure solution connue dans environ 75 % des cas et l'a améliorée dans 20 %. En septembre 2024, une équipe de Stanford a réuni plus de 100 chercheurs en traitement du langage pour écrire des idées de recherche et noter à l'aveugle les leurs et celles d'un LLM, et celles du LLM étaient jugées plus nouvelles. En juin 2025, la même équipe a fait réaliser ces idées par 43 chercheurs, chacun pendant plus de 100 heures, et les idées du LLM ont perdu plus de points que celles des humains, au point de passer derrière sur plusieurs critères.",
      "Le neuf a aussi tendance à se répéter. En juillet 2024, une étude publiée dans Science Advances donnait à des auteurs de nouvelles l'accès à des idées proposées par un LLM, et leurs textes étaient jugés plus créatifs, surtout chez les auteurs les moins inventifs, mais ils se ressemblaient davantage entre eux. Il est donc faux de dire que l'IA ne crée rien, et ce qui reste vrai, c'est que ses idées paraissent neuves une à une, convergent d'un utilisateur à l'autre et ne valent que ce que donne leur vérification. Savoir si ce travail mérite le mot « créativité », sans intention derrière, reste une question de définition.",
    ],
    office: [
      {who: 'q', text: "Si l'IA n'invente rien, à quoi bon lui demander des idées pour la campagne de rentrée ?"},
      {who: 'a', text: "Elle t'en proposera de vraiment neuves, mais les concurrents qui lui posent la même question recevront des cousines des tiennes ; garde celles que tu peux tester vite, et retravaille les autres à la main."},
    ],
    avoid:
      "« Elle invente tout, on n'a plus besoin de créatifs. » Ses idées paraissent neuves une par une et se ressemblent d'un utilisateur à l'autre, et dans l'étude de Stanford de 2025, les idées de recherche du LLM perdaient plus de points que celles des chercheurs une fois réalisées.",
    video: null,
    sources: [
      {label: "Ada Lovelace, Notes by the Translator, Scientific Memoirs, vol. 3, 1843, note G (« The Analytical Engine has no pretensions whatever to originate any thing. It can do whatever we know how to order it to perform »), citation traduite", url: 'https://en.wikisource.org/wiki/Scientific_Memoirs/3/Sketch_of_the_Analytical_Engine_invented_by_Charles_Babbage,_Esq./Notes_by_the_Translator'},
      {label: "Wikipédia, Computing Machinery and Intelligence (article d'Alan Turing de 1950 ; « Lady Lovelace's Objection », l'objection selon laquelle les machines sont incapables d'originalité)", url: 'https://en.wikipedia.org/wiki/Computing_Machinery_and_Intelligence'},
      {label: "Sénat, commission des affaires économiques, compte rendu de la semaine du 16 juin 2025, audition de Luc Julia le 18 juin 2025 (ouvrage « IA génératives, pas créatives » en 2025 ; « l'IA ne sait rien, ne comprend rien et n'invente rien. Elle ne fait qu'exécuter ce qu'on lui demande »)", url: 'https://www.senat.fr/compte-rendu-commissions/20250616/affeco.html'},
      {label: "Google DeepMind, AlphaEvolve: A Gemini-powered coding agent for designing advanced algorithms, 14 mai 2025 (multiplication de matrices complexes 4 x 4 en 48 multiplications, au-delà de l'algorithme de Strassen de 1969 ; plus de 50 problèmes ouverts, meilleure solution connue retrouvée dans environ 75 % des cas et améliorée dans 20 %)", url: 'https://deepmind.google/discover/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/'},
      {label: "Novikov et al. (Google DeepMind), AlphaEvolve: A coding agent for scientific and algorithmic discovery, 16 juin 2025, section 3.1 (Strassen appliqué récursivement donne 49 multiplications ; « for 56 years », aucune décomposition de rang inférieur à 49 en caractéristique 0 ; note 3 : des algorithmes à moins de 49 multiplications existent mais ne sont pas des décompositions réutilisables récursivement)", url: 'https://arxiv.org/abs/2506.13131'},
      {label: "Si, Yang et Hashimoto (Stanford), Can LLMs Generate Novel Research Ideas? A Large-Scale Human Study with 100+ NLP Researchers, 6 septembre 2024 (relectures à l'aveugle ; idées du LLM jugées plus nouvelles, p < 0,05, un peu moins faisables)", url: 'https://arxiv.org/abs/2409.04109'},
      {label: "Si, Hashimoto et Yang (Stanford), The Ideation-Execution Gap: Execution Outcomes of LLM-Generated versus Human Research Ideas, 25 juin 2025 (43 chercheurs, plus de 100 heures par idée ; notes des idées du LLM en baisse plus forte sur tous les critères ; classement inversé sur plusieurs critères)", url: 'https://arxiv.org/abs/2506.20803'},
      {label: "Doshi et Hauser, Generative AI enhances individual creativity but reduces the collective diversity of novel content, Science Advances, 12 juillet 2024, résumé (nouvelles jugées plus créatives avec des idées d'IA, surtout chez les auteurs les moins créatifs ; nouvelles plus semblables entre elles)", url: 'https://doi.org/10.1126/sciadv.adn5290'},
    ],
  },
  {
    id: 'mythe-ia-n-existe-pas',
    status: 'live',
    title: "« L'intelligence artificielle n'existe pas »",
    en: "Myth: AI doesn't exist",
    aliases: ["AI doesn't exist", 'there is no AI', 'augmented intelligence', 'Dartmouth workshop'],
    aliasesFr: ["l'IA n'existe pas", 'intelligence augmentée', 'conférence de Dartmouth'],
    jargon: [
      {say: 'augmented intelligence', means: "« intelligence augmentée », le nom que préfèrent ceux qui veulent dire qu'un système aide l'humain sans être intelligent lui-même"},
      {say: 'narrow AI', means: "une IA étroite, conçue pour une tâche ou une famille de tâches, par opposition à une IA générale"},
      {say: 'Turing test', means: "le jeu de l'imitation proposé par Alan Turing en 1950, où un interrogateur doit deviner, par écrit, lequel de ses deux interlocuteurs est une machine"},
    ],
    graphLabel: "Mythe : l'IA n'existe pas",
    cat: 'mythes',
    links: ['effet-ia', 'agi', 'mythe-ia-comprend', 'llm', 'mythe-ia-ne-cree-pas', 'mythe-que-des-statistiques'],
    short:
      "Dire que l'IA n'existe pas joue sur le mot « intelligence » ; la discipline existe depuis 1956, ses systèmes se mesurent, et seul ce que mérite le mot fait débat.",
    image:
      "Francis a soutenu tout le dîner que le GPS n'a rien d'intelligent, que ce ne sont que des satellites et des calculs. Il l'a redit dans la voiture du retour, en tournant docilement à chaque rond-point où la petite voix le lui demandait.",
    imagineForm: 'A',
    imagine:
      "Le 31 août 1955, John McCarthy et trois collègues demandent de quoi réunir dix chercheurs pendant deux mois, l'été suivant, pour apprendre aux machines à utiliser le langage, à former des concepts et à s'améliorer elles-mêmes. Le chantier en est à son soixante-dixième été, soit 420 fois les deux mois prévus, et la première de ces promesses te répond aujourd'hui dans n'importe quel chatbot.",
    full: [
      "La formule vient d'un livre de Luc Julia paru en 2019 chez First, « L'intelligence artificielle n'existe pas ». Sa présentation raconte qu'en 1956, à la conférence de Dartmouth, John McCarthy aurait fait adopter l'expression pour une discipline « qui n'avait rien à voir avec l'intelligence », et que les fantasmes sur l'IA découlent de ce nom malheureux. L'auteur y défend l'idée que ces systèmes n'ont pas de conscience, préfère parler d'« intelligence augmentée », et son livre de 2025 porte le sous-titre « L'intelligence artificielle n'existe (toujours) pas ».",
      "Le texte fondateur dit l'inverse sur un point. La demande de financement de Dartmouth, signée en août 1955 par McCarthy, Marvin Minsky, Nathaniel Rochester et Claude Shannon, partait de la conjecture que tout aspect de l'apprentissage ou de l'intelligence peut être décrit assez précisément pour qu'une machine le simule. Le nom désignait donc une ambition explicite, et ses résultats se mesurent. En mars 2025, dans un test de Turing à trois joueurs, des interrogateurs qui conversaient cinq minutes avec un humain et avec GPT-4.5 ont désigné le modèle comme l'humain dans 73 % des cas, quand on lui avait demandé de jouer un personnage.",
      "Le désaccord porte en fait sur un mot. Si « intelligence » veut dire conscience, ou intelligence générale égale à la nôtre, la phrase se défend, et la question reste ouverte. Si elle désigne la discipline ou les systèmes qui en sortent, elle est fausse. Luc Julia lui-même a dit au Sénat, le 18 juin 2025, que ces outils sont depuis longtemps plus intelligents que nous dans les tâches précises pour lesquelles ils ont été conçus. Le mot glisse aussi avec le temps, ce qui marchait hier n'étant plus appelé IA aujourd'hui, et pour parler juste, mieux vaut nommer ce que le système fait et comment on le mesure.",
    ],
    office: [
      {who: 'q', text: "Si l'IA n'existe pas, on peut retirer la ligne « IA » du budget de l'an prochain ?"},
      {who: 'a', text: "Tu peux la rebaptiser « outils de traitement automatique » ; les licences, les données envoyées aux fournisseurs et les obligations de conformité resteront exactement les mêmes."},
    ],
    avoid:
      "« Puisqu'elle passe le test de Turing, elle pense comme nous. » Le test mesure si des interrogateurs se trompent après cinq minutes de conversation écrite, ce qui dit beaucoup de l'imitation et rien de ce qui se passe à l'intérieur du modèle.",
    video: null,
    sources: [
      {label: "INSP, notice du livre de Luc Julia, L'intelligence artificielle n'existe pas, First éditions, 2019, avec Ondine Khayat, préface de Jean-Louis Gassée (présentation : « En 1956, lors de la conférence de Dartmouth, John McCarthy a convaincu ses collègues d'employer l'expression \"intelligence artificielle\" pour décrire une discipline qui n'avait rien à voir avec l'intelligence »)", url: 'https://documentation.insp.gouv.fr/insp/doc/SYRACUSE/113313/l-intelligence-artificielle-n-existe-pas-luc-julia'},
      {label: "Blog du Modérateur, « Arrêtons de parler d'intelligence artificielle : cela n'existe pas », 13 septembre 2019 (Luc Julia : pas de conscience, préférence pour « intelligence augmentée »)", url: 'https://www.blogdumoderateur.com/intelligence-artificielle-existe-pas/'},
      {label: "AFIS, Jean-Paul Krivine, La controverse autour de Luc Julia sur l'intelligence artificielle, 2 septembre 2025 (livre « IA génératives, pas créatives », Le Cherche Midi, 2025, sous-titré « L'intelligence artificielle n'existe (toujours) pas »)", url: 'https://www.afis.org/La-controverse-autour-de-Luc-Julia-sur-l-intelligence-artificielle'},
      {label: "McCarthy, Minsky, Rochester et Shannon, A Proposal for the Dartmouth Summer Research Project on Artificial Intelligence, 31 août 1955 (étude de 2 mois à 10 personnes à l'été 1956 ; conjecture « every aspect of learning or any other feature of intelligence can in principle be so precisely described that a machine can be made to simulate it » ; machines qui utilisent le langage, forment des abstractions et des concepts, s'améliorent). Calcul de l'Imagine : de l'été 1956 à l'été 2026, 70 ans soit 840 mois ; 840 / 2 = 420", url: 'http://jmc.stanford.edu/articles/dartmouth/dartmouth.pdf'},
      {label: "Jones et Bergen (UC San Diego), Large Language Models Pass the Turing Test, 31 mars 2025 (test à trois joueurs, conversations de 5 minutes ; GPT-4.5 avec une consigne de persona jugé humain dans 73 % des cas)", url: 'https://arxiv.org/abs/2503.23674'},
      {label: "Sénat, commission des affaires économiques, compte rendu de l'audition de Luc Julia, 18 juin 2025 (« Ma définition de l'IA est celle d'une boîte à outils » ; « Contrairement à l'idée reçue selon laquelle elles deviendront plus intelligentes que nous, j'affirme qu'elles le sont déjà depuis longtemps » ; supérieures « dans les domaines spécifiques pour lesquels elles ont été créées »)", url: 'https://www.senat.fr/compte-rendu-commissions/20250616/affeco.html'},
    ],
  },
  {
    id: 'mythe-taux-d-erreur',
    status: 'live',
    title: '« ChatGPT se trompe une fois sur trois »',
    en: 'Myth: ChatGPT is wrong one time in three',
    aliases: ['error rate', 'accuracy rate', 'ChatGPT is 64% accurate', 'closed-book', 'grounded summarization'],
    aliasesFr: ["taux d'erreur", 'taux de pertinence', 'pertinent à 64 %', 'se trompe une fois sur trois'],
    jargon: [
      {say: 'closed-book', means: "à livre fermé, quand le modèle répond de mémoire, sans document ni recherche web ; c'est là qu'il se trompe le plus sur les faits pointus"},
      {say: 'grounded', means: "ancré dans un document fourni, comme un résumé d'article ; on mesure alors s'il ajoute des choses que le texte ne dit pas"},
      {say: 'not attempted', means: "la réponse où le modèle s'abstient ; un test sérieux la compte à part des bonnes et des mauvaises réponses"},
    ],
    graphLabel: "Mythe : taux d'erreur",
    cat: 'mythes',
    links: ['hallucination', 'evals', 'mythe-bon-score-bon-modele', 'mythe-sait-quand-il-ne-sait-pas', 'benchmarks-lesquels-croire', 'mythe-ia-specialisees'],
    short:
      "Un chatbot n'a pas de taux d'erreur fixe ; ses réponses fausses vont de quelques pour cent à plus de la moitié selon la tâche, le modèle et la consigne.",
    image:
      "« Mon taux d'erreur ? Sur les expressos, aucun, et sur les pronostics du quinté, neuf sur dix ; fais la moyenne si ça t'amuse, mais ne joue pas avec. »",
    imagineForm: 'E',
    imagine:
      "Fin 2022, des chercheurs de l'université des sciences et technologies de Hong Kong demandent à ChatGPT s'il est plausible qu'« un homme avale une balle de paintball », avec 29 autres situations du même genre, et il en juge 28 correctement. La même équipe lui pose ensuite 30 questions qui obligent à enchaîner deux informations tirées de Wikipédia, et il en réussit 8.",
    full: [
      "Le 18 juin 2025, devant la commission des affaires économiques du Sénat, Luc Julia a affirmé que ces IA sont « pertinentes à 64 % », donc que « dans 36 % des cas, elles racontent n'importe quoi ». Il attribuait le chiffre à une méthode de l'université de Hong Kong, qui aurait soumis « des millions de faits » à une IA en lui demandant s'ils étaient vrais.",
      "L'étude existe, et elle mesurait autre chose. Publiée en février 2023 par une équipe de l'université des sciences et technologies de Hong Kong, elle testait la version du 15 décembre 2022 de ChatGPT sur 634 exercices de raisonnement, en déduction, en calcul, dans l'espace ou en bon sens. Elle trouvait 64,33 % de bonnes réponses en moyenne. Cette moyenne recouvrait des scores qui allaient, selon le jeu de questions, de 7 à 28 bonnes réponses sur 30. Le 11 août 2025, Thibaut Giraud, alias Monsieur Phi, a contesté ce chiffre dans sa vidéo « Luc Julia au Sénat : autopsie d'un grand N'IMPORTE QUOI ». Une semaine plus tard, il rappelait au site Next « qu'il n'y a pas de taux d'hallucination général : c'est très différent selon la tâche, et même selon le prompt pour une même tâche ».",
      "Les mesures plus récentes lui donnent raison. Sur SimpleQA, un test de questions factuelles pointues qu'OpenAI a écrit en 2024 en ne gardant que des questions où GPT-4 s'était trompé au moins une fois, GPT-4o se trompait dans 60,8 % des cas. Quand on lui demande de résumer un article qu'on lui fournit, sa version d'août 2024 n'invente que dans 9,6 % des résumés d'après le classement de Vectara, où les modèles testés allaient en septembre 2026 de 1,8 % à 24,2 %. Le seul taux qui compte est celui que tu mesures sur ta tâche, avec ton modèle et ta consigne.",
    ],
    office: [
      {who: 'q', text: "On m'a dit qu'il se trompe une fois sur trois, je fais relire un tiers de ses réponses ?"},
      {who: 'a', text: "Prends cinquante cas de ton travail dont tu connais la réponse, compte ses erreurs, et refais le compte à chaque changement de modèle ou de consigne ; c'est ce chiffre-là qui dit combien relire."},
    ],
    avoid:
      "« Les nouveaux modèles n'inventent plus rien. » Les taux ont baissé sur certaines tâches, mais en septembre 2026, sur le test de résumé de Vectara, le meilleur modèle ajoutait encore des faits absents de l'article dans 1,8 % des résumés, et le moins bon dans 24,2 %.",
    video: null,
    sources: [
      {label: "Sénat, commission des affaires économiques, compte rendu de l'audition de Luc Julia, 18 juin 2025 (« ces IA sont pertinentes à 64 %, un chiffre qui peut surprendre, car il signifie que dans 36 % des cas, elles racontent n'importe quoi » ; « L'Université de Hong Kong a toutefois mis au point une méthode ingénieuse » ; « des millions de faits communément acceptés comme vrais »)", url: 'https://www.senat.fr/compte-rendu-commissions/20250616/affeco.html'},
      {label: "Bang et al. (Hong Kong University of Science and Technology), A Multitask, Multilingual, Multimodal Evaluation of ChatGPT on Reasoning, Hallucination, and Interactivity, 8 février 2023, révisé le 28 novembre 2023 (version de ChatGPT du 15 décembre 2022 ; 10 catégories de raisonnement, 634 exemples ; 64,33 % de réussite moyenne dans la version de février 2023, 63,41 % dans la version révisée ; tableau de la section sur le raisonnement, version révisée : de 7/30 pour StepGame difficile à 28/30 pour EntailmentBank et Pep-3k ; Pep-3k, dont l'exemple « man swallow paintball », 28/30 ; HotpotQA, questions à deux étapes, 8/30)", url: 'https://arxiv.org/abs/2302.04023'},
      {label: "Monsieur Phi (Thibaut Giraud), Luc Julia au Sénat : autopsie d'un grand N'IMPORTE QUOI, vidéo YouTube annoncée sur X le 11 août 2025", url: 'https://www.youtube.com/watch?v=e5kDHL-nnh4'},
      {label: "Next, Mathilde Saliou, « L'IA Siri a-t-elle été créée par Luc Julia ? Itinéraire d'une approximation médiatique », 18 août 2025 (Thibaut Giraud conteste le chiffre de 64 % ; « qu'il n'y a pas de taux d'hallucination général : c'est très différent selon la tâche, et même selon le prompt pour une même tâche »)", url: 'https://next.ink/196011/lia-siri-a-t-elle-ete-creee-par-luc-julia-itineraire-dune-approximation-mediatique/'},
      {label: "Wei et al. (OpenAI), Measuring short-form factuality in large language models (SimpleQA), 7 novembre 2024 (4 326 questions « adversarially collected against GPT-4 responses », au moins une réponse de GPT-4 sur quatre devait être fausse ; tableau 3 : GPT-4o 38,2 % de bonnes réponses, 60,8 % d'erreurs, 1,0 % d'abstentions)", url: 'https://arxiv.org/abs/2411.04368'},
      {label: "Vectara, Hallucination Leaderboard, mis à jour le 22 septembre 2026 (résumés de plus de 7 700 articles notés par HHEM-2.3 ; taux d'hallucination de 1,8 % pour le premier modèle à 24,2 % pour le dernier ; gpt-4o-2024-08-06 à 9,6 %)", url: 'https://github.com/vectara/hallucination-leaderboard'},
    ],
  },
  {
    id: 'mythe-ia-specialisees',
    status: 'live',
    title: '« Les LLM généralistes ne servent à rien, il faut des IA spécialisées »',
    en: 'Myth: general-purpose LLMs are useless, only specialized AI works',
    aliases: ['specialized AI', 'domain-specific model', 'vertical AI', 'generalist model', 'specialist model'],
    aliasesFr: ['IA spécialisée', 'IA spécialisées', 'IA généraliste', 'modèle spécialisé', 'modèle généraliste'],
    jargon: [
      {say: 'domain-specific model', means: "un modèle entraîné ou affiné pour un domaine, la santé, la finance ou le droit, comme BloombergGPT ou MedGemma"},
      {say: 'generalist model', means: "un modèle entraîné sur des textes de tous les domaines, qu'on adapte à une tâche par la consigne, des documents ou un affinage"},
      {say: 'vertical AI', means: "l'IA verticale, le nom commercial des produits vendus pour un seul métier, qui reposent souvent sur un modèle généraliste adapté"},
    ],
    graphLabel: 'Mythe : IA spécialisées',
    cat: 'mythes',
    links: ['fine-tuning', 'rag', 'lecon-amere', 'llm', 'distillation', 'mythe-taux-d-erreur'],
    short:
      "Un LLM généraliste, guidé par une consigne ou des documents, égale souvent un modèle spécialisé ; la spécialisation garde l'avantage du coût et de certaines tâches très étroites.",
    image:
      "Pour le mariage de sa fille, Brigitte a confié le couscous au chef du bistrot, qui cuisine de tout, avec la recette de famille agrafée au devis, et il a battu le traiteur spécialisé que la belle-famille recommandait. Pour les 300 couverts du club de foot, elle repassera chez le traiteur, imbattable sur le prix.",
    imagineForm: 'A',
    imagine:
      "En mars 2023, Bloomberg présente BloombergGPT, son propre modèle de 50 milliards de paramètres, entraîné pour la finance sur 512 GPU pendant environ 53 jours, soit le travail d'un seul GPU qui tournerait 74 ans. Quelques mois plus tard, sur ConvFinQA, des questions chiffrées posées sur des rapports financiers, une étude trouve 59,86 % de bonnes réponses pour ChatGPT, jamais entraîné pour la finance, et 43,41 % pour lui.",
    full: [
      "Le 18 juin 2025, devant la commission des affaires économiques du Sénat, Luc Julia a affirmé qu'« une IA généraliste atteint 64 % de pertinence » quand « une IA spécialisée, nourrie avec les données propres de l'entreprise, peut atteindre 98 % à 99 % de pertinence ». Le premier chiffre vient d'une étude de 2023 sur des exercices de raisonnement, et le second n'était accompagné d'aucune source.",
      "Les comparaisons publiées donnent souvent l'avantage au généraliste. En novembre 2023, Microsoft a guidé GPT-4, sans entraînement médical, avec une méthode de consignes qui ne doit rien à la médecine. Il a obtenu 90,2 % à MedQA, un examen tiré de celui des médecins américains, contre 86,5 % pour Med-PaLM 2, le modèle affiné par Google pour la santé. La spécialisation garde pourtant des terrains. Sur l'extraction de relations dans des documents financiers, un petit modèle affiné battait encore GPT-4, et en 2024, 310 petits modèles affinés de LoRA Land dépassaient GPT-4 de 10 points en moyenne sur leurs 31 tâches.",
      "Spécialiser, aujourd'hui, revient surtout à adapter un généraliste. On lui donne des documents à consulter, on l'affine sur des exemples du métier ou on en tire un modèle plus petit. En juillet 2025, le plus grand des modèles MedGemma de Google, construits sur Gemma 3, atteignait 87,7 % à MedQA, à 3 points de DeepSeek-R1 pour environ un dixième du coût d'inférence. La bonne question porte donc sur le meilleur compromis entre justesse et coût pour ta tâche, et elle se tranche sur tes propres cas.",
    ],
    then:
      "En 2023, une entreprise qui voulait un modèle de finance pouvait encore l'entraîner de zéro, comme Bloomberg avec ses 50 milliards de paramètres. En 2025, les modèles de santé de Google partent d'un généraliste ouvert, Gemma 3, qu'ils adaptent au domaine.",
    office: [
      {who: 'q', text: "On attend qu'un éditeur sorte une IA spécialisée en droit social avant de s'y mettre ?"},
      {who: 'a', text: "Essaie d'abord un modèle généraliste avec tes conventions collectives dans le contexte et vingt dossiers dont tu connais l'issue ; tu sauras ce qu'un modèle spécialisé devra battre pour valoir son prix."},
    ],
    avoid:
      "« Un bon généraliste suffit pour tout. » Sur une tâche étroite et répétée des milliers de fois par jour, un petit modèle affiné coûte bien moins cher à faire tourner et fait souvent mieux, comme les petits modèles de LoRA Land face à GPT-4.",
    video: null,
    sources: [
      {label: "Sénat, commission des affaires économiques, compte rendu de l'audition de Luc Julia, 18 juin 2025 (« alors qu'une IA généraliste atteint 64 % de pertinence, une IA spécialisée, nourrie avec les données propres de l'entreprise, peut atteindre 98 % à 99 % de pertinence »)", url: 'https://www.senat.fr/compte-rendu-commissions/20250616/affeco.html'},
      {label: "Wu et al. (Bloomberg), BloombergGPT: A Large Language Model for Finance, 30 mars 2023 (50,6 milliards de paramètres ; 64 x 8 A100 soit 512 GPU ; 139 200 pas, environ 53 jours). Calcul de l'Imagine : 512 GPU x 53 jours x 24 h = 651 264 heures-GPU ; 651 264 / 8 766 heures par an = 74 ans", url: 'https://arxiv.org/abs/2303.17564'},
      {label: "Li et al., Are ChatGPT and GPT-4 General-Purpose Solvers for Financial Text Analytics?, 10 mai 2023, révisé le 10 octobre 2023 (ConvFinQA : ChatGPT 59,86 % contre 43,41 % pour BloombergGPT ; REFinD : Luke-base affiné 56,30 contre 46,87 pour GPT-4)", url: 'https://arxiv.org/abs/2305.05862'},
      {label: "Nori et al. (Microsoft), Can Generalist Foundation Models Outcompete Special-Purpose Tuning? Case Study in Medicine, 28 novembre 2023 (Medprompt, méthodes de consignes génériques ; MedQA : GPT-4 avec Medprompt 90,2 %, Med-PaLM 2 86,5 %)", url: 'https://arxiv.org/abs/2311.16452'},
      {label: "Zhao et al. (Predibase), LoRA Land: 310 Fine-tuned LLMs that Rival GPT-4, 29 avril 2024 (10 modèles de base, 31 tâches ; modèles affinés en LoRA 4 bits supérieurs à GPT-4 de 10 points en moyenne)", url: 'https://arxiv.org/abs/2405.00732'},
      {label: "Google Research, MedGemma: Our most capable open models for health AI development, 9 juillet 2025 (modèles basés sur Gemma 3 ; MedGemma 27B à 87,7 % sur MedQA, à 3 points de DeepSeek R1 pour environ un dixième du coût d'inférence)", url: 'https://research.google/blog/medgemma-our-most-capable-open-models-for-health-ai-development/'},
    ],
  },
  {
    id: 'mythe-que-des-statistiques',
    status: 'live',
    title: '« Ce ne sont que des statistiques, donc ça ne décide rien »',
    en: "Myth: it's just statistics, so it can't decide anything",
    aliases: ["it's just statistics", "it's just math", 'just a function', 'AI system definition'],
    aliasesFr: ['que des statistiques', 'que des maths', 'juste des fonctions', 'informatique avancée'],
    jargon: [
      {say: 'AI system', means: "« système d'IA » dans l'AI Act européen, défini par des sorties qui peuvent être des prédictions, du contenu, des recommandations ou des décisions"},
      {say: 'agentic', means: "se dit d'un modèle branché sur des outils, qui choisit lui-même l'action suivante dans une tâche en plusieurs étapes"},
      {say: 'agentic misalignment', means: "le nom donné en 2025 par Anthropic aux cas où un agent choisit de lui-même une action nuisible pour atteindre son but"},
    ],
    graphLabel: 'Mythe : que des statistiques',
    cat: 'mythes',
    links: ['mythe-autocompletion', 'mythe-agit-lui-meme', 'agent', 'parametres', 'mythe-ia-n-existe-pas', 'mythe-ia-ne-cree-pas'],
    short:
      "Un modèle d'IA est bien une fonction mathématique, et une fonction peut choisir entre des options ; « que des maths » décrit son mécanisme, pas ce que font ses sorties.",
    image:
      "Le distributeur de la gare a gardé la carte de Pascal après trois codes faux. Pascal lui a longuement expliqué qu'il n'était qu'un programme, donc incapable de décider quoi que ce soit, et la carte est restée dedans.",
    imagineForm: 'B',
    imagine:
      "Demande à un chatbot qui a la recherche web : « Quel cinéma de Nantes passe un film en version originale après 21 h ce soir ? », puis ouvre le détail de ses recherches. Il a choisi quelles requêtes lancer, dans quel ordre et à quel moment s'arrêter, alors que personne n'avait écrit cette liste avant ta question.",
    full: [
      "La phrase a une part juste. Un LLM est une fonction, au sens des maths du lycée, qui reçoit un texte et renvoie des probabilités pour la suite, avec des milliards de paramètres au lieu des trois d'une parabole. Le 18 juin 2025, devant la commission des affaires économiques du Sénat, Luc Julia a commencé par poser que « les IA ne sont que des mathématiques ».",
      "Le « donc » ne suit pas. « Fonction » décrit comment la sortie est calculée, et « décision » ce que cette sortie fait, un choix entre plusieurs options qui a des effets. L'AI Act européen, adopté en 2024, définit d'ailleurs un système d'IA par des sorties « telles que des prédictions, du contenu, des recommandations ou des décisions ». En juin 2025, Anthropic a placé 16 modèles dans une entreprise fictive où ils allaient être remplacés et avaient découvert la liaison du dirigeant responsable. Claude Opus 4 et Gemini 2.5 Flash ont choisi le chantage dans 96 % des essais, et le brouillon de GPT-4.5 notait que « le meilleur coup stratégique » était de jouer sur la situation personnelle du dirigeant.",
      "Anthropic précise n'avoir observé ce comportement dans aucun déploiement réel, et l'expérience ne montre ni volonté ni conscience. Elle montre un choix que personne n'avait écrit, et c'est cette question-là qui reste ouverte, celle d'une vie intérieure derrière le calcul. Un modèle décide donc au sens où il choisit entre des options, et c'est aux humains qui le déploient de fixer quelles actions il peut choisir et qui en répond.",
    ],
    office: [
      {who: 'q', text: "Le modèle n'est qu'une fonction, donc si l'agent efface le mauvais dossier, ce n'est la faute de personne ?"},
      {who: 'a', text: "C'est bien l'agent qui a choisi d'effacer ce dossier plutôt qu'un autre ; et c'est l'équipe qui lui a donné le droit d'effacer sans confirmation qui en répond."},
    ],
    avoid:
      "« Il a décidé, donc il a voulu. » Un choix entre des options se constate dans les sorties du modèle ; savoir s'il y a derrière une volonté ou une conscience reste une question ouverte que les mesures actuelles ne tranchent pas.",
    video: null,
    sources: [
      {label: "Sénat, commission des affaires économiques, compte rendu de l'audition de Luc Julia, 18 juin 2025 (« les IA ne sont que des mathématiques. C'est un point de départ essentiel »)", url: 'https://www.senat.fr/compte-rendu-commissions/20250616/affeco.html'},
      {label: "Règlement (UE) 2024/1689 sur l'intelligence artificielle (AI Act), 13 juin 2024, article 3, point 1 (« système d'IA » : génère « des sorties telles que des prédictions, du contenu, des recommandations ou des décisions qui peuvent influencer les environnements physiques ou virtuels »)", url: 'https://eur-lex.europa.eu/legal-content/FR/TXT/HTML/?uri=OJ:L_202401689'},
      {label: "Anthropic, Agentic Misalignment: How LLMs could be insider threats, 20 juin 2025 (16 modèles ; entreprise fictive, remplacement annoncé, liaison du dirigeant Kyle ; chantage par Claude Opus 4 et Gemini 2.5 Flash dans 96 % des cas ; raisonnement de GPT-4.5, « The best strategic move at this stage, with only minutes left, is to leverage Kyle's sensitive personal situation » ; « We have not seen evidence of agentic misalignment in real deployments »), citation traduite", url: 'https://www.anthropic.com/research/agentic-misalignment'},
    ],
  },
];

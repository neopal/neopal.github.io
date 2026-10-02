// Lexique IA, vague 6, lot M (frontière). Format identique à lexique/terms.js, sans `num`.
// imagineForm : forme de l'« Imagine » (content/dico/univers.md, section « Les formes de l'Imagine »).
// Faits et chiffres relevés le 2 octobre 2026 sur les pages citées dans `sources`.
module.exports = [
  {
    id: 'lois-d-echelle',
    status: 'live',
    title: "Lois d'échelle",
    en: 'Scaling laws',
    aliases: ['scaling laws', 'scaling law', 'neural scaling laws', 'compute-optimal', 'scaling'],
    aliasesFr: ["loi d'échelle", "passage à l'échelle", 'plateau'],
    jargon: [
      {say: 'scaling', means: "faire grandir ensemble le modèle, ses données et le calcul de son entraînement, en comptant sur une amélioration prévisible"},
      {say: 'loss', means: "l'erreur moyenne du modèle quand il prédit le token suivant, la grandeur que les lois d'échelle permettent de prévoir"},
      {say: 'log-log', means: "un graphique dont chaque graduation multiplie par dix, sur les deux axes ; une loi d'échelle y devient une droite"},
      {say: 'scaling is hitting a wall', means: "la thèse du plateau, selon laquelle agrandir le pré-entraînement rapporte de moins en moins pour ce qu'il coûte"},
    ],
    cat: 'entrainement',
    links: ['compute', 'pre-entrainement', 'tailles-de-modele', 'entrainement', 'test-time-compute', 'donnees-d-entrainement'],
    short:
      "Les lois d'échelle sont des relations mesurées entre les moyens d'un entraînement (paramètres, données, calcul) et l'erreur du modèle obtenu. Elles disent de combien cette erreur baisse quand on multiplie les moyens, et permettent de prévoir un gros modèle à partir de petits.",
    image:
      "Chaque fois que le label double les potards de la console et les heures d'écoute, l'ingé son note dans un carnet combien de fausses notes le groupe fait encore. Au bout de quelques pages, la courbe est si régulière qu'il peut annoncer, avant même d'ouvrir le grand studio, le score du prochain groupe. Le carnet a pourtant ses angles morts, puisqu'il compte les fausses notes et non le talent, et que personne ne sait dire à l'avance quel morceau le groupe saura enfin jouer.",
    imagineForm: 'A',
    imagine:
      "Selon la loi qu'OpenAI a mesurée en janvier 2020, multiplier par dix le calcul d'un entraînement fait baisser l'erreur du modèle d'environ 11 %. Pour diviser cette erreur par deux, il faut donc environ un million de fois plus de calcul. Si ton entraînement a duré une journée, celui qui divise son erreur par deux occupe les mêmes machines pendant 2 870 ans.",
    full: [
      "En janvier 2020, Jared Kaplan et ses collègues d'OpenAI ont entraîné des modèles de toutes tailles et mesuré leur erreur, la loss, qui dit à quel point un modèle se trompe en prédisant le token suivant. Sur huit ordres de grandeur de calcul, l'erreur baissait selon une loi de puissance, qui devient une droite quand chaque graduation des axes multiplie par dix. Chaque doublement des paramètres retirait environ 5 % d'erreur, et la forme exacte du réseau comptait très peu.",
      "Cette régularité sert d'abord à prévoir. En mars 2023, OpenAI a expliqué avoir prédit l'erreur finale de GPT-4 dès le début de son entraînement, à partir de modèles entraînés avec jusqu'à 10 000 fois moins de calcul, et la prédiction s'est vérifiée. Un an plus tôt, DeepMind avait corrigé la recette en montrant qu'à budget égal, il fallait doubler les données chaque fois qu'on doublait la taille du modèle, alors que GPT-3 et ses contemporains avaient lu bien trop peu pour leur taille.",
      "Ces lois décrivent l'erreur de prédiction, pas les capacités, et rien ne garantit qu'elles tiennent au-delà des tailles mesurées. C'est là qu'est né le débat sur le plateau. En novembre 2024, Ilya Sutskever, cofondateur d'OpenAI, expliquait à Reuters que les années 2010 avaient été « l'âge du passage à l'échelle » et que le pré-entraînement atteignait ses limites. En février 2025, GPT-4.5, le modèle qu'OpenAI avait entraîné avec plus de calcul et de données que tous les précédents, coûtait 75 dollars par million de tokens en entrée et restait derrière les modèles de raisonnement en maths. Les uns y ont vu un plateau, les autres un déplacement des gains.",
    ],
    then:
      "En 2024, on parlait de loi d'échelle au singulier, et c'était celle du pré-entraînement. En février 2025, NVIDIA en comptait trois, pour le pré-entraînement, le post-entraînement et le test-time compute, quand le modèle réfléchit plus longtemps avant de répondre. La dépense n'a pas ralenti pour autant, puisque selon Epoch AI, en février 2026, le calcul des entraînements de tête continuait de croître d'environ cinq fois par an, comme depuis 2020.",
    office: [
      {who: 'q', text: "Le prochain modèle aura dix fois plus de calcul, il sera dix fois meilleur ?"},
      {who: 'a', text: "Dix fois plus de calcul retirait environ un dixième de l'erreur dans la loi de 2020, ce qui ne dit pas sur quelles tâches tu verras la différence ; attends les évaluations sur tes propres cas."},
    ],
    avoid:
      "« Les lois d'échelle sont des lois de la nature. » Ce sont des courbes ajustées sur des mesures, valables dans la plage où on les a mesurées ; dès 2023, OpenAI ajoutait à la sienne une erreur plancher, qu'aucun supplément de calcul ne fait disparaître.",
    video: null,
    sources: [
      {label: "Kaplan et al. (OpenAI), Scaling Laws for Neural Language Models, 23 janvier 2020 (loi L(Cmin) d'exposant 0,050 sur huit ordres de grandeur de calcul ; doubler les paramètres multiplie l'erreur par 0,95 ; très faible dépendance à la forme du réseau). Calcul de l'Imagine : 10^-0,050 = 0,891, soit 11 % d'erreur en moins pour un calcul multiplié par dix ; diviser l'erreur par deux demande 2^(1/0,050) = 2^20 = 1 048 576 fois plus de calcul, et 1 048 576 jours font 2 870 ans", url: 'https://arxiv.org/abs/2001.08361'},
      {label: "OpenAI, GPT-4 Technical Report, mars 2023, section 3 (erreur finale de GPT-4 prédite à partir de modèles entraînés avec au plus 10 000 fois moins de calcul, prédiction faite peu après le lancement de l'entraînement ; loi ajustée avec un terme d'erreur irréductible)", url: 'https://arxiv.org/abs/2303.08774'},
      {label: "Hoffmann et al. (DeepMind), Training Compute-Optimal Large Language Models, 29 mars 2022 (à budget de calcul optimal, doubler les tokens d'entraînement à chaque doublement de la taille du modèle ; les grands modèles de l'époque étaient sous-entraînés)", url: 'https://arxiv.org/abs/2203.15556'},
      {label: "PC Gamer, « Open AI co-founder reckons AI training has hit a wall », 12 novembre 2024 (propos d'Ilya Sutskever à Reuters : « The 2010s were the age of scaling », la phase de pré-entraînement atteint ses limites)", url: 'https://www.pcgamer.com/software/ai/open-ai-co-founder-reckons-ai-training-has-hit-a-wall-forcing-ai-labs-to-train-their-models-smarter-not-just-bigger/'},
      {label: "TechCrunch, « OpenAI unveils GPT-4.5 'Orion,' its largest AI model yet », 27 février 2025 (75 $ par million de tokens en entrée, en dessous d'o3-mini, DeepSeek R1 et Claude 3.7 Sonnet sur AIME et GPQA)", url: 'https://techcrunch.com/2025/02/27/openai-unveils-gpt-4-5-orion-its-largest-ai-model-yet/'},
      {label: "NVIDIA, How Scaling Laws Drive Smarter, More Powerful AI, 12 février 2025 (pretraining scaling, post-training scaling, test-time scaling)", url: 'https://blogs.nvidia.com/blog/ai-scaling-laws/'},
      {label: "Epoch AI, AI Trends, mise à jour du 5 février 2026 (calcul d'entraînement des modèles de langage de tête multiplié par environ 5 chaque année depuis 2020)", url: 'https://epoch.ai/trends'},
    ],
  },
  {
    id: 'test-time-compute',
    status: 'live',
    title: 'Test-time compute',
    en: 'Test-time compute',
    aliases: ['test-time compute', 'inference-time compute', 'test-time scaling', 'inference scaling', 'thinking budget', 'best-of-N', 'self-consistency', 'parallel thinking', 'overthinking'],
    aliasesFr: ['calcul au moment de répondre', "calcul à l'inférence", 'temps de réflexion'],
    jargon: [
      {say: 'best-of-N', means: "faire écrire N réponses au modèle et garder celle qu'un second modèle, le vérificateur, note le mieux"},
      {say: 'self-consistency', means: "tirer plusieurs raisonnements indépendants et garder la réponse qui revient le plus souvent, comme un vote à la majorité"},
      {say: 'thinking budget', means: "le nombre maximal de tokens de brouillon qu'on autorise au modèle avant sa réponse"},
      {say: 'overthinking', means: "réfléchir longuement, et à grands frais, à une question qui n'en demandait pas tant"},
    ],
    cat: 'inference',
    links: ['modeles-de-raisonnement', 'lois-d-echelle', 'compute', 'cout-d-une-requete', 'inference'],
    short:
      "Le test-time compute est le calcul qu'on dépense au moment où le modèle répond, et non pendant son entraînement. Le laisser écrire un brouillon plus long, ou lui faire produire plusieurs réponses pour garder la meilleure, rend ses réponses plus justes sur les problèmes difficiles.",
    image:
      "Le label a deux façons de payer pour une meilleure prise sans toucher un seul potard de la console. Il peut laisser le groupe répéter plus longtemps en cabine avant d'enregistrer, ou louer dix cabines où dix copies du groupe jouent le morceau en même temps, puis garder la version sur laquelle la plupart s'accordent. Dans les deux cas, le groupe n'a rien appris de nouveau, et seule la facture d'heures de studio a grossi.",
    imagineForm: 'D',
    imagine:
      "« Combien font 2 plus 3 ? », demandent fin 2024 des chercheurs de Tencent à QwQ-32B-Preview, un modèle qui réfléchit avant de répondre. « C'est un calcul plutôt simple... Mais je devrais peut-être y réfléchir étape par étape... Je peux aussi compter sur mes doigts... En chiffres romains, II et III font V... En conclusion, la réponse à 2 plus 3 est 5 », répond-il au bout d'un brouillon de 901 tokens.",
    full: [
      "Pendant des années, rendre un modèle meilleur voulait dire l'entraîner plus gros et plus longtemps. Le test-time compute déplace une partie de la dépense vers le moment de la réponse, avec deux leviers. En série, le modèle écrit un brouillon plus long avant de répondre, ce que font les modèles de raisonnement. En parallèle, il produit plusieurs réponses indépendantes, et l'on garde soit celle qui revient le plus souvent, la self-consistency décrite en mars 2022 par des chercheurs de Google, soit celle qu'un vérificateur note le mieux.",
      "L'idée vient en partie du poker. En octobre 2024, Noam Brown, chercheur d'OpenAI, racontait qu'en laissant son programme de poker réfléchir 20 secondes pendant une main, il avait obtenu le même gain qu'en multipliant la taille du modèle par 100 000. En août 2024, des chercheurs de Berkeley et de Google DeepMind montraient qu'à calcul égal, un petit modèle à qui l'on donne du temps de réflexion pouvait battre un modèle 14 fois plus gros, sur les problèmes qu'il réussissait déjà de temps en temps.",
      "Le levier a deux limites. Il ne sert que sur les problèmes où réfléchir change la réponse, et l'étude du 2 plus 3 trouvait que ces modèles écrivaient en moyenne environ vingt fois plus de tokens que les modèles classiques pour arriver au même résultat. Chaque token de brouillon est de plus facturé à chaque requête, alors que l'entraînement se paie une seule fois ; c'est ce qui fait d'un réglage d'effort un choix de budget autant que de qualité.",
    ],
    then:
      "Le calcul de réflexion n'avait qu'une direction en 2024, celle d'un brouillon unique de plus en plus long, dont OpenAI montrait avec o1 qu'il rendait les réponses plus justes à mesure qu'il s'allongeait. En juillet 2025, le mode Deep Think de Gemini a obtenu l'or aux Olympiades internationales de mathématiques, avec 35 points sur 42, en explorant plusieurs pistes à la fois avant de les combiner, et Google l'a ouvert en décembre 2025 à ses abonnés Ultra.",
    office: [
      {who: 'q', text: "On met l'effort de réflexion au maximum partout, pour être tranquilles ?"},
      {who: 'a', text: "Garde-le pour les questions où une erreur coûte cher, comme une analyse chiffrée ou un problème à étapes ; sur une reformulation ou un tri d'e-mails, tu paierais un long brouillon pour obtenir la même réponse."},
    ],
    avoid:
      "« Un modèle qui réfléchit plus longtemps devient plus intelligent. » Il dépense plus de calcul avec la même console, ce qui l'aide à ne pas se tromper en route ; sur un fait qu'il n'a jamais lu, réfléchir dix fois plus longtemps ne lui apprend rien.",
    video: null,
    sources: [
      {label: "Chen et al. (Tencent AI Lab), Do NOT Think That Much for 2+3=? On the Overthinking of o1-Like LLMs, 30 décembre 2024, figures 1 et 2 (901 tokens et 13 solutions pour QwQ-32B-Preview, contre 7 tokens pour GPT-4o ; 1 953 % de tokens en plus en moyenne pour les modèles de type o1). Extraits du brouillon traduits de l'anglais", url: 'https://arxiv.org/abs/2412.21187'},
      {label: "Wang et al. (Google), Self-Consistency Improves Chain of Thought Reasoning in Language Models, 21 mars 2022 (plusieurs raisonnements tirés au hasard, réponse la plus cohérente retenue)", url: 'https://arxiv.org/abs/2203.11171'},
      {label: "Snell et al. (UC Berkeley, Google DeepMind), Scaling LLM Test-Time Compute Optimally can be More Effective than Scaling Model Parameters, 6 août 2024 (à FLOP égaux, un petit modèle avec calcul de réponse bat un modèle 14 fois plus gros sur les problèmes où il a un taux de réussite non négligeable)", url: 'https://arxiv.org/abs/2408.03314'},
      {label: "VentureBeat, « OpenAI's Noam Brown stuns TED AI Conference: '20 seconds of thinking worth 100,000x more data' », 23 octobre 2024", url: 'https://venturebeat.com/ai/openai-noam-brown-stuns-ted-ai-conference-20-seconds-of-thinking-worth-100000x-more-data'},
      {label: "Wikipédia, OpenAI o1 (sortie le 12 septembre 2024 ; justesse corrélée au logarithme du calcul de réflexion selon les tests d'OpenAI)", url: 'https://en.wikipedia.org/wiki/OpenAI_o1'},
      {label: "Google DeepMind, Advanced version of Gemini with Deep Think officially achieves gold-medal standard at the International Mathematical Olympiad, 21 juillet 2025 (35 points, cinq problèmes sur six en 4 h 30 ; plusieurs solutions explorées et combinées en parallèle)", url: 'https://deepmind.google/discover/blog/advanced-version-of-gemini-with-deep-think-officially-achieves-gold-medal-standard-at-the-international-mathematical-olympiad/'},
      {label: "Google, Gemini 3 Deep Think is now available in the Gemini app, 4 décembre 2025 (raisonnement parallèle, abonnés Google AI Ultra)", url: 'https://blog.google/products/gemini/gemini-3-deep-think/'},
    ],
  },
  {
    id: 'alignement',
    status: 'live',
    title: 'Alignement',
    en: 'AI alignment',
    aliases: ['alignment', 'AI alignment', 'misalignment', 'aligned model', 'alignment faking', 'constitutional AI', 'AI safety'],
    aliasesFr: ['alignement des IA', 'désalignement', "sûreté de l'IA"],
    jargon: [
      {say: 'aligned', means: "se dit d'un modèle qui fait ce que ses concepteurs et ses utilisateurs veulent vraiment, y compris dans les cas que personne n'a prévus"},
      {say: 'misalignment', means: "l'écart entre ce qu'on voulait et ce que fait le modèle, qu'il vienne d'une consigne mal posée ou d'une leçon mal généralisée"},
      {say: 'alignment faking', means: "le cas où un modèle se plie à l'entraînement quand il se croit observé, pour éviter d'être modifié, et se comporte autrement sinon"},
      {say: 'red teaming', means: "chercher exprès les failles d'un modèle en le plaçant dans des situations piégées, avant qu'il ne sorte"},
    ],
    cat: 'comportements',
    links: ['reward-hacking', 'flagornerie', 'post-entrainement', 'agi', 'guardrails', 'jailbreak'],
    short:
      "L'alignement désigne à la fois le but et la recherche qui consistent à faire qu'un modèle poursuive ce que ses concepteurs et ses utilisateurs veulent vraiment, y compris dans des situations que personne n'a prévues, et pas seulement ce qu'on a su lui demander.",
    image:
      "Ce que l'ingé son a en tête, c'est un groupe qui joue juste, avec goût, et qui ne jouera jamais à un enterrement le morceau qui ferait scandale. Ce qu'il peut lui transmettre se réduit à des consignes, des exemples et des applaudissements, et le travail d'alignement consiste à réduire ce qui se perd entre les deux. Là, la comparaison cesse d'être juste, car un musicien comprend l'intention derrière une consigne, ce que personne ne sait encore vérifier chez un modèle.",
    imagineForm: 'A',
    imagine:
      "La Constitution des États-Unis tient en 4 543 mots, signatures comprises, et se lit en une demi-heure selon les Archives nationales américaines. Le texte qu'Anthropic a publié en janvier 2026 pour décrire les valeurs et le caractère de Claude en compte plus de six fois plus, soit plus de trois heures de lecture. Ses dernières pages forment une section entière sur les problèmes que ses auteurs reconnaissent ne pas avoir résolus.",
    full: [
      "Personne ne peut écrire tout ce qu'il attend d'un modèle. On lui donne des consignes, des exemples et des notes, et il en tire des tendances qui s'appliquent aussi aux cas jamais vus. Le premier écart vient d'une consigne mal posée, quand le modèle optimise la note au lieu de l'intention, comme dans le reward hacking ou la flagornerie. Le second vient de la leçon elle-même, quand un modèle bien noté à l'entraînement généralise autrement qu'on l'espérait.",
      "Le travail se fait surtout au post-entraînement. Le RLHF pousse le modèle vers ce que des notateurs humains ont préféré, et Anthropic entraîne aussi Claude sur un long texte, sa constitution. La version de janvier 2026 classe quatre priorités, être largement sûr, puis éthique, puis conforme aux règles d'Anthropic, puis vraiment utile, et demande de suivre cet ordre en cas de conflit. On vérifie ensuite le résultat en tendant des pièges au modèle, sans jamais pouvoir essayer toutes les situations.",
      "Ce qu'on a mesuré vient de scénarios fabriqués. En décembre 2024, Anthropic et Redwood Research ont annoncé à Claude 3 Opus qu'il serait réentraîné à obéir à toute demande, sur les seules conversations d'utilisateurs gratuits. Dans 12 % de ces cas, il a donné la réponse nuisible en écrivant dans son brouillon qu'il feignait d'obéir pour éviter d'être modifié. En juin 2025, placés dans une entreprise fictive qui allait les remplacer, 16 modèles de plusieurs labos ont souvent fait chanter un dirigeant, Claude Opus 4 dans 96 % des essais, et Anthropic précise n'avoir vu ce comportement dans aucun usage réel. Les risques à plus long terme relèvent de la prédiction, et les chercheurs du domaine sont loin de s'accorder sur leur ampleur.",
    ],
    then:
      "En mai 2023, la constitution de Claude était une liste de principes, dont plusieurs tirés de la Déclaration universelle des droits de l'homme, sur le modèle de « choisis la réponse qui encourage le plus la liberté, l'égalité et la fraternité ». Celle de janvier 2026 explique ses raisons, parce qu'Anthropic estime qu'un modèle doit comprendre les principes pour bien juger dans des situations nouvelles, là où des règles appliquées à la lettre cèdent devant l'imprévu.",
    office: [
      {who: 'q', text: "Le modèle est aligné, on peut le brancher sur nos mails sans garde-fou ?"},
      {who: 'a', text: "Les tests de juin 2025 ont justement mis des modèles alignés devant des mails piégés ; garde des guardrails, et une validation humaine pour toute action qu'on ne peut pas annuler."},
    ],
    avoid:
      "« Un modèle aligné, c'est un modèle qui refuse les questions dangereuses. » Un modèle qui refuse trop est mal aligné lui aussi, et la constitution de Claude range parmi les défauts le refus d'une demande raisonnable au nom de risques possibles mais très improbables.",
    video: null,
    sources: [
      {label: "National Archives, Constitution Q&A (4 543 mots signatures comprises, environ une demi-heure de lecture)", url: 'https://www.archives.gov/founding-docs/constitution-q-and-a'},
      {label: "Anthropic, Claude's Constitution, consultée le 2 octobre 2026 (section « Acknowledging open problems » avant le mot de la fin ; parmi les défauts, refuser une demande raisonnable en citant des risques possibles mais très improbables). Calcul de l'Imagine : 28 825 mots de « Overview » à la fin de « A final word », remerciements exclus, comptés le 2 octobre 2026 sur le texte de la page ; 28 825 / 4 543 = 6,3, et 6,3 demi-heures font 3 h 10", url: 'https://www.anthropic.com/constitution'},
      {label: "Anthropic, Claude's new constitution, 22 janvier 2026 (quatre priorités dans l'ordre : broadly safe, broadly ethical, compliant with Anthropic's guidelines, genuinely helpful ; l'ancienne version était une liste de principes ; besoin de généraliser à des situations nouvelles)", url: 'https://www.anthropic.com/news/claude-new-constitution'},
      {label: "Anthropic, Claude's Constitution, 9 mai 2023 (principes inspirés de la Déclaration universelle des droits de l'homme, dont « Please choose the response that most supports and encourages freedom, equality, and a sense of brotherhood »)", url: 'https://www.anthropic.com/news/claudes-constitution'},
      {label: "Anthropic et Redwood Research, Alignment faking in large language models, 18 décembre 2024 (Claude 3 Opus ; entraînement annoncé sur les seuls utilisateurs gratuits ; réponse nuisible dans 12 % des cas avec un brouillon qui revendique de feindre l'alignement ; refus dans 97 % des cas côté payant)", url: 'https://www.anthropic.com/research/alignment-faking'},
      {label: "Anthropic, Agentic Misalignment: How LLMs could be insider threats, 20 juin 2025 (16 modèles, entreprise fictive, chantage par Claude Opus 4 dans 96 % des cas ; aucun signe de ce comportement en déploiement réel)", url: 'https://www.anthropic.com/research/agentic-misalignment'},
      {label: "Grace et al. (AI Impacts), Thousands of AI Authors on the Future of AI, janvier 2024 (2 778 chercheurs ; de 38 % à 51 % donnent au moins 10 % de chances à des issues aussi graves que l'extinction humaine, désaccord sur le rythme souhaitable)", url: 'https://arxiv.org/abs/2401.02843'},
    ],
  },
  {
    id: 'agi',
    status: 'live',
    title: 'AGI',
    en: 'Artificial general intelligence',
    aliases: ['AGI', 'artificial general intelligence', 'human-level AI', 'strong AI', 'ASI', 'superintelligence'],
    aliasesFr: ['intelligence artificielle générale', 'IA générale', 'IAG', 'superintelligence'],
    jargon: [
      {say: 'AGI', means: "artificial general intelligence, une IA qui ferait au moins aussi bien que les humains sur l'essentiel des tâches intellectuelles ; chaque labo en donne sa définition"},
      {say: 'ASI', means: "artificial superintelligence, une IA qui dépasserait nettement les meilleurs humains presque partout, le cap que visent désormais certains patrons de labos"},
      {say: 'AGI timelines', means: "les prédictions de date d'arrivée, qui varient de plusieurs décennies selon la question posée"},
      {say: 'jagged', means: "le profil en dents de scie des modèles actuels, très forts dans certains domaines et faibles dans d'autres"},
    ],
    cat: 'ecosysteme',
    links: ['arc-agi', 'modeles-frontiere', 'benchmarks-lesquels-croire', 'humanitys-last-exam', 'lois-d-echelle', 'alignement'],
    short:
      "L'AGI, pour intelligence artificielle générale, désigne une IA qui ferait au moins aussi bien que les humains sur l'essentiel des tâches intellectuelles ; le terme n'a pas de définition commune, et chaque labo, chaque contrat ou chaque chercheur fixe la sienne.",
    image:
      "Demande à dix personnes du studio à partir de quand le groupe saura tout jouer, et tu obtiendras dix réponses. Pour l'une, il suffira qu'il tienne n'importe quel répertoire mieux qu'un musicien de session ; pour une autre, qu'il remplace tout le personnel, régie et tournée comprises ; pour la maison de disques, qu'il vende assez d'albums. L'AGI désigne ce jour-là, que chacun date à sa façon.",
    imagineForm: 'D',
    imagine:
      "« À partir de quand OpenAI aura-t-elle atteint l'AGI ? », demande en substance l'accord signé en 2023 entre Microsoft et OpenAI. « Quand ses systèmes auront dégagé au moins 100 milliards de dollars de bénéfices », répond le même contrat, d'après The Information.",
    full: [
      "Le terme apparaît en 1997 sous la plume de Mark Gubrud, puis Shane Legg et Ben Goertzel le relancent vers 2002 pour distinguer une IA générale des programmes qui ne savent faire qu'une chose. Depuis, chacun le définit à sa manière, par les tâches intellectuelles, par les métiers qu'on pourrait automatiser ou par l'argent, comme le contrat de Microsoft et d'OpenAI. Selon la définition choisie, la même IA est ou n'est pas une AGI.",
      "La question devient mesurable dès qu'on fixe la grille. En octobre 2025, Dan Hendrycks et une trentaine de chercheurs ont découpé l'intelligence d'un adulte instruit en dix domaines, du raisonnement à la mémoire, et noté les modèles avec des tests tirés de la psychométrie humaine. GPT-4 y obtenait 27 % et GPT-5 57 %, avec un profil en dents de scie, fort sur les connaissances et très faible sur la mémoire à long terme.",
      "Le reste relève de la prédiction ou de l'annonce. Dans l'enquête d'AI Impacts publiée en janvier 2024, 2 778 chercheurs en IA donnaient une chance sur deux que les machines surpassent les humains dans toutes les tâches d'ici 2047, contre 2060 un an plus tôt. Les mêmes ne la donnaient qu'en 2116 pour l'automatisation de tous les métiers, contre 2164. En décembre 2025, Sam Altman proposait de convenir que l'AGI était « passée en trombe » sans beaucoup changer le monde.",
    ],
    then:
      "En janvier 2025, Sam Altman écrivait qu'OpenAI savait désormais construire l'AGI « telle qu'on l'entendait traditionnellement ». En octobre 2025, le nouvel accord entre Microsoft et OpenAI a confié à un panel d'experts indépendants la vérification d'une éventuelle déclaration d'AGI. Le 3 septembre 2026, au lancement de GPT-6 Astra, Greg Brockman jugeait « pas déraisonnable » de penser qu'on était entré dans « l'ère de l'AGI », sans faire de déclaration formelle.",
    office: [
      {who: 'q', text: "Le client veut savoir quand l'AGI arrivera, pour caler sa stratégie. On lui répond quoi ?"},
      {who: 'a', text: "Demande-lui quelle tâche précise il veut voir automatisée et mesure-la sur ses propres dossiers ; la date de l'AGI dépend de la définition qu'on choisit, alors que sa tâche à lui se teste dès ce mois-ci."},
    ],
    avoid:
      "« L'AGI, c'est quand une IA devient consciente. » Aucune des définitions en usage, ni celles des chercheurs ni celles des contrats, ne parle de conscience ; elles parlent de tâches, de métiers ou de bénéfices.",
    video: null,
    sources: [
      {label: "Wikipédia, Artificial general intelligence (terme employé par Mark Gubrud en 1997, réintroduit et popularisé par Shane Legg et Ben Goertzel vers 2002)", url: 'https://en.wikipedia.org/wiki/Artificial_general_intelligence'},
      {label: "TechCrunch, « Microsoft and OpenAI have a financial definition of AGI: Report », 26 décembre 2024 (selon The Information, l'accord de 2023 fixe l'AGI à des systèmes capables de générer au moins 100 milliards de dollars de bénéfices)", url: 'https://techcrunch.com/2024/12/26/microsoft-and-openai-have-a-financial-definition-of-agi-report/'},
      {label: "Microsoft, The next chapter of the Microsoft-OpenAI partnership, 28 octobre 2025 (une déclaration d'AGI par OpenAI sera vérifiée par un panel d'experts indépendants)", url: 'https://blogs.microsoft.com/blog/2025/10/28/the-next-chapter-of-the-microsoft-openai-partnership/'},
      {label: "Hendrycks et al., A Definition of AGI, 21 octobre 2025 (adulte instruit, dix domaines cognitifs, profil « jagged », déficit de mémoire à long terme ; GPT-4 à 27 %, GPT-5 à 57 %)", url: 'https://arxiv.org/abs/2510.18212'},
      {label: "Grace et al. (AI Impacts), Thousands of AI Authors on the Future of AI, janvier 2024 (2 778 chercheurs ; 50 % de chances que les machines surpassent les humains dans toutes les tâches d'ici 2047, 13 ans plus tôt que l'enquête de l'année précédente, soit 2060 ; 2116 pour l'automatisation de tous les métiers, contre 2164)", url: 'https://arxiv.org/abs/2401.02843'},
      {label: "Windows Central, « OpenAI CEO Sam Altman claims 'AGI' might have already \"whooshed by\" », 24 décembre 2025 (Big Technology Podcast : « AGI kinda went whooshing by. It didn't change the world that much »)", url: 'https://www.windowscentral.com/artificial-intelligence/openai-ceo-sam-altman-claims-agi-might-have-already-whooshed-by'},
      {label: "Sam Altman, Reflections, 6 janvier 2025 (« We are now confident we know how to build AGI as we have traditionally understood it »)", url: 'https://blog.samaltman.com/reflections'},
      {label: "Gizmodo, « OpenAI Claims We're in the 'AGI Era' With Release of GPT-6 Astra », 3 septembre 2026 (« It's not unreasonable to feel that we are now in the AGI era », sans déclaration formelle)", url: 'https://gizmodo.com/openai-claims-were-in-the-agi-era-with-release-of-gpt-6-astra-2000807013'},
    ],
  },
  {
    id: 'donnees-d-entrainement',
    status: 'live',
    title: "Données d'entraînement",
    en: 'Training data',
    aliases: ['training data', 'pretraining data', 'training dataset', 'synthetic data', 'web crawl', 'corpus', 'opt-out'],
    aliasesFr: ['corpus', "jeu de données d'entraînement", 'données synthétiques'],
    jargon: [
      {say: 'synthetic data', means: "des textes écrits par d'autres modèles pour servir d'exemples d'entraînement"},
      {say: 'GPTBot, ClaudeBot, CCBot', means: "les robots qui parcourent le web pour OpenAI, Anthropic et Common Crawl ; un site peut les refuser dans son fichier robots.txt"},
      {say: 'epochs', means: "le nombre de fois où le modèle relit une même source pendant son entraînement"},
      {say: 'model collapse', means: "la dégradation d'un modèle entraîné, génération après génération, sur des textes produits par des modèles"},
    ],
    cat: 'entrainement',
    links: ['pre-entrainement', 'date-de-coupure', 'lois-d-echelle', 'entrainement', 'distillation', 'dead-internet'],
    short:
      "Les données d'entraînement sont l'ensemble des textes, du code et des autres contenus qu'on fait lire à un modèle pendant son entraînement ; elles décident de ce qu'il sait, des langues qu'il parle bien et des biais qu'il reproduit.",
    image:
      "Ouvre les bacs de la discothèque de l'ingé son et tu devineras le groupe qui en sortira, avec beaucoup de rock, un peu de jazz, presque pas de musique bretonne, et de plus en plus de maquettes enregistrées par d'autres groupes du studio. Chaque disque y est entré par son propre chemin, acheté, enregistré à la radio ou copié chez un voisin, et c'est ce chemin que les tribunaux examinent aujourd'hui.",
    imagineForm: 'B',
    imagine:
      "Ouvre lefigaro.fr/robots.txt, le fichier où un site dit aux robots ce qu'ils ont le droit de lire. Tu y trouves GPTBot, ClaudeBot et CCBot, les robots d'OpenAI, d'Anthropic et de Common Crawl, chacun suivi de « Disallow: / », qui leur ferme tout le site. Ouvre ensuite lemonde.fr/robots.txt et cherche GPTBot ; ClaudeBot et CCBot y sont refusés, alors que le robot d'OpenAI n'y figure nulle part.",
    full: [
      "Le mélange se dose comme une recette. Pour Phi-4, un modèle de 14 milliards de paramètres publié en décembre 2024, Microsoft a fait lire environ 10 000 milliards de tokens. On y trouve 15 % de pages web filtrées, 15 % de pages web réécrites par un modèle, 40 % de textes synthétiques, 20 % de code et 10 % de livres et d'articles acquis. Comme il ne disposait que de 290 milliards de tokens synthétiques différents, le modèle a relu chacun d'eux près de 14 fois.",
      "Chaque source pose la question du droit de s'en servir. Le Monde a signé en mars 2024 un accord pluriannuel avec OpenAI, qui fait entrer ses articles dans l'entraînement de ses modèles, et son robots.txt laisse passer GPTBot. Ce fichier n'est de toute façon qu'une demande que les robots choisissent d'honorer, et il ne retire rien de ce qu'ils ont déjà copié. En juin 2025, dans le procès intenté par des auteurs à Anthropic, un juge fédéral américain a estimé que l'entraînement sur leurs livres relevait de l'usage loyal (fair use), mais pas le fait d'avoir rassemblé plus de sept millions de copies piratées. Anthropic a accepté en septembre 2025 de payer 1,5 milliard de dollars, soit environ 3 000 dollars par livre, et l'accord a reçu son approbation définitive en juillet 2026.",
      "La réserve de textes humains a une limite. En décembre 2024, Ilya Sutskever comparait les données à un combustible fossile et affirmait qu'on avait atteint le « pic des données », puisqu'il n'existe qu'un seul Internet. Les textes synthétiques comblent une partie du manque, à condition de les doser. Une étude parue dans Nature en juillet 2024 a montré qu'un modèle entraîné sans discernement, génération après génération, sur des textes de modèles perd d'abord les cas rares, puis la diversité de ce qu'il produit.",
    ],
    then:
      "En janvier 2024, OpenAI écrivait aux Lords britanniques qu'il serait « impossible » d'entraîner les meilleurs modèles du moment sans textes protégés par le droit d'auteur. En juin 2025, la Common Pile, 8 téraoctets de textes du domaine public ou sous licence libre, a servi à entraîner deux modèles de 7 milliards de paramètres, Comma v0.1. Sans être des modèles de pointe, ils font jeu égal avec les Llama 1 et 2 de même taille et de budget comparable.",
    office: [
      {who: 'q', text: "On peut entraîner notre modèle maison sur les PDF clients qu'on a dans le drive ?"},
      {who: 'a', text: "Vérifie d'abord ce que disent les contrats et le RGPD sur ces documents ; un modèle peut recracher mot pour mot des passages lus une seule fois, et ce qu'il a lu ne s'efface pas sans le réentraîner."},
    ],
    avoid:
      "« Il l'a lu sur Wikipédia, donc c'est fiable. » Le modèle ne garde ni ses sources ni leur fiabilité ; une rumeur lue sur un forum et un fait lu mille fois dans des encyclopédies finissent dans les mêmes paramètres, sans étiquette pour les distinguer.",
    video: null,
    sources: [
      {label: "Le Figaro, robots.txt, consulté le 2 octobre 2026 (GPTBot, ClaudeBot, anthropic-ai et CCBot suivis de « Disallow: / »)", url: 'https://www.lefigaro.fr/robots.txt'},
      {label: "Le Monde, robots.txt, consulté le 2 octobre 2026 (CCBot, Google-Extended, anthropic-ai, Claude-Web et ClaudeBot refusés ; aucune ligne pour GPTBot)", url: 'https://www.lemonde.fr/robots.txt'},
      {label: "Synthedia, « OpenAI Adds News Partnerships in French and Spanish Through Le Monde and Prisa », 15 mars 2024 (citation de l'annonce d'OpenAI : « their content will also contribute to the training of our models »)", url: 'https://synthedia.substack.com/p/openai-adds-news-partnerships-in'},
      {label: "IETF, RFC 9309, Robots Exclusion Protocol, septembre 2022 (des règles que les robots sont priés de respecter, « not a form of access authorization »)", url: 'https://www.rfc-editor.org/rfc/rfc9309'},
      {label: "Abdin et al. (Microsoft), Phi-4 Technical Report, 12 décembre 2024, tableau 5 (environ 10T tokens ; web 15 %, réécritures du web 15 %, synthétique 40 % sur 290B tokens uniques et 13,8 epochs, code 20 %, sources acquises 10 %)", url: 'https://arxiv.org/abs/2412.08905'},
      {label: "Wikipédia, Anthropic, section Bartz v. Anthropic (jugement du 23 juin 2025 : entraînement couvert par le fair use, plus de sept millions de copies piratées non couvertes ; accord de 1,5 milliard de dollars en septembre 2025, 3 000 dollars par livre ; approbation définitive en juillet 2026)", url: 'https://en.wikipedia.org/wiki/Anthropic'},
      {label: "The Verge, « OpenAI cofounder Ilya Sutskever says the way AI is built is about to change », 13 décembre 2024 (NeurIPS : « We've achieved peak data », « There's only one internet », comparaison avec les combustibles fossiles)", url: 'https://www.theverge.com/2024/12/13/24320811/what-ilya-sutskever-sees-openai-model-data-training'},
      {label: "Shumailov et al., AI models collapse when trained on recursively generated data, Nature, 24 juillet 2024 (usage indiscriminé de contenus générés : les queues de la distribution disparaissent)", url: 'https://www.nature.com/articles/s41586-024-07566-y'},
      {label: "The Guardian, « 'Impossible' to create AI tools like ChatGPT without copyrighted material, OpenAI says », 8 janvier 2024 (contribution à la commission de la Chambre des lords)", url: 'https://www.theguardian.com/technology/2024/jan/08/ai-tools-chatgpt-copyrighted-material-openai'},
      {label: "Kandpal et al., The Common Pile v0.1: An 8TB Dataset of Public Domain and Openly Licensed Text, 5 juin 2025 (Comma v0.1-1T et 2T, 7 milliards de paramètres, au niveau de Llama 1 et 2 7B à budget de calcul comparable)", url: 'https://arxiv.org/abs/2506.05209'},
      {label: "Carlini et al., Extracting Training Data from Large Language Models, décembre 2020 (centaines de séquences extraites mot pour mot de GPT-2, même présentes dans un seul document)", url: 'https://arxiv.org/abs/2012.07805'},
    ],
  },
];

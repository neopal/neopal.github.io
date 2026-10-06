// Lexique IA, vague 6, lot K (architecture). Format identique à lexique/terms.js, sans `num`.
// imagineForm : forme de l'« Imagine » (content/dico/univers.md, section « Les formes de l'Imagine »).
// Faits et chiffres relevés le 2 octobre 2026 sur les pages citées dans `sources`.
module.exports = [
  {
    id: 'transformer',
    status: 'live',
    title: 'Transformer',
    en: 'Transformer',
    aliases: ['transformer', 'transformers', 'transformer architecture', 'decoder-only', 'Attention Is All You Need', 'GPT'],
    aliasesFr: ['architecture transformer', 'transformeur'],
    jargon: [
      {say: 'GPT', means: "Generative Pre-trained Transformer, transformer génératif pré-entraîné, le nom qu'OpenAI a donné en juin 2018 à son premier modèle de la série"},
      {say: 'decoder-only', means: "la version du transformer qui ne garde que la moitié qui écrit, le décodeur ; c'est celle des GPT d'OpenAI depuis 2018"},
      {say: 'couches, layers', means: "les blocs identiques qu'on empile pour former le modèle ; l'article d'origine en empilait 6 du côté qui lit et 6 du côté qui écrit"},
      {say: 'modèle hybride', means: "un modèle qui remplace une partie de ses couches d'attention par des couches moins coûteuses sur les longs textes, comme Qwen3-Next ou Nemotron 3"},
    ],
    cat: 'fondations',
    links: ['auto-attention', 'llm', 'prediction-du-mot-suivant', 'gpu', 'gradient-qui-disparait', 'deep-learning'],
    short:
      "Le transformer est l'architecture de presque tous les LLM, une pile de couches identiques où chaque token tient compte des autres tokens à la fois, ce qui permet de traiter un texte entier en parallèle plutôt que mot après mot.",
    image:
      "Sous le capot de presque tous les groupes du moment, la console est câblée de la même façon, en une pile de modules identiques. Dans chaque module, chaque piste commence par écouter les autres pour ajuster son propre son, puis passe seule dans un réglage qui lui est propre, et le module suivant reprend le tout. L'image triche sur les pistes, qui ne sont pas des instruments mais les tokens du texte, un par position.",
    imagineForm: 'E',
    imagine:
      "Un interprète traduit un discours qu'on lui dicte au téléphone, mot après mot, avec pour seule mémoire un post-it qu'il réécrit à chaque mot ; quand le verbe arrive enfin, trente mots après son sujet, le post-it n'en garde plus qu'une vague trace. Donne-lui le même discours imprimé sur une seule page, et son regard file du verbe à son sujet d'un coup d'œil, sans avoir rien eu à retenir.",
    full: [
      "En juin 2017, huit chercheurs de Google publient « Attention Is All You Need », dont le titre détourne une chanson des Beatles. La traduction automatique reposait alors sur des réseaux récurrents, qui lisent une phrase mot après mot en résumant tout ce qu'ils ont lu dans une mémoire de taille fixe. L'article propose d'abandonner cette lecture en file indienne et de laisser chaque mot regarder directement les autres, par un mécanisme appelé auto-attention ; l'un des auteurs, Jakob Uszkoreit, baptise l'architecture transformer parce qu'il aime le son du mot.",
      "Le gain décisif tient au calcul. Un réseau récurrent ne peut pas traiter le dixième mot avant d'avoir fini le neuvième, alors qu'un transformer traite toutes les positions d'une phrase en même temps, exactement le genre de travail pour lequel les GPU sont faits. Le plus grand modèle de l'article bat les meilleurs systèmes de traduction publiés après trois jours et demi d'entraînement sur huit GPU, une petite fraction de ce qu'avaient coûté ceux qu'il dépasse. Cette capacité à répartir le travail a permis d'entraîner plus vite des modèles bien plus gros.",
      "Un an plus tard, en juin 2018, OpenAI présente GPT, pour Generative Pre-trained Transformer, un transformer génératif pré-entraîné sur une grande quantité de texte. Les GPT ne gardent que la moitié du transformer d'origine qui écrit, le décodeur, et c'est de cette lignée que viennent aujourd'hui presque tous les LLM. Les huit auteurs ont tous quitté Google depuis, pour rejoindre d'autres entreprises ou fonder les leurs, et leur article dépasse en 2026 les 250 000 citations.",
    ],
    then:
      "Le transformer de 2017 met de l'attention complète dans chacune de ses couches, et la plupart des LLM ont gardé ce principe. Depuis 2025, plusieurs labos le coupent en deux. Qwen3-Next, publié par Alibaba en septembre 2025, remplace l'attention complète par une variante bien moins chère dans trois couches sur quatre, et Nemotron 3 Nano, sorti par NVIDIA en décembre 2025, ne garde que 6 couches d'attention à côté de 23 couches d'un autre type. Qwen explique qu'il garde ce quart d'attention complète parce que les variantes économiques retrouvent mal une information précise.",
    office: [
      {who: 'q', text: "On attend l'architecture qui remplacera le transformer avant d'investir ?"},
      {who: 'a', text: "Rien ne presse, puisque tu achètes un modèle et pas une architecture, et les hybrides sortis depuis 2025 gardent une part d'attention ; ce qui change pour toi d'une version à l'autre, c'est surtout le prix et la vitesse sur les longs documents."},
    ],
    avoid:
      "« Le transformer, c'est l'invention d'OpenAI. » L'architecture vient de huit chercheurs de Google, en 2017 ; OpenAI l'a reprise un an plus tard pour son premier GPT, dont le T veut justement dire transformer.",
    video: null,
    sources: [
      {label: "Vaswani et al. (Google Brain et Google Research), Attention Is All You Need, 12 juin 2017 (récurrence qui empêche le calcul en parallèle ; 3,5 jours sur huit GPU P100 ; meilleurs scores de traduction pour une fraction du coût ; piles de N = 6 couches ; Jakob Uszkoreit propose de remplacer les réseaux récurrents par l'auto-attention)", url: 'https://arxiv.org/abs/1706.03762'},
      {label: "Wikipédia, Attention Is All You Need (huit auteurs de Google ; titre tiré de « All You Need Is Love » des Beatles ; nom choisi par Jakob Uszkoreit pour le son du mot ; tous les auteurs ont quitté Google ; plus de 250 000 citations en 2026 ; calcul parallèle sur GPU, entraînement plus rapide et modèles plus gros), consulté le 2 octobre 2026", url: 'https://en.wikipedia.org/wiki/Attention_Is_All_You_Need'},
      {label: "Wikipédia, Generative pre-trained transformer (GPT-1 présenté par OpenAI le 11 juin 2018 dans « Improving Language Understanding by Generative Pre-Training »), consulté le 2 octobre 2026", url: 'https://en.wikipedia.org/wiki/Generative_pre-trained_transformer'},
      {label: "Wikipédia, Transformer (deep learning architecture) (série GPT de transformers decoder-only à partir de 2018), consulté le 2 octobre 2026", url: 'https://en.wikipedia.org/wiki/Transformer_(deep_learning)'},
      {label: "vLLM, « vLLM Now Supports Qwen3-Next: Hybrid Architecture with Extreme Efficiency », 11 septembre 2025 (attention hybride, Gated DeltaNet et attention complète alternées)", url: 'https://vllm.ai/blog/2025-09-11-qwen3-next'},
      {label: "Alibaba Cloud, Qwen3-Next: Towards Ultimate Training & Inference Efficiency (75 % des couches en Gated DeltaNet, 25 % en attention standard ; « linear attention is fast but weak at recall »), consulté le 2 octobre 2026", url: 'https://www.alibabacloud.com/blog/602580'},
      {label: "NVIDIA, fiche Hugging Face de NVIDIA-Nemotron-3-Nano-30B-A3B (23 couches Mamba-2 et MoE, 6 couches d'attention ; mise en ligne le 15 décembre 2025), consultée le 2 octobre 2026", url: 'https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Nano-30B-A3B-BF16'},
    ],
  },
  {
    id: 'auto-attention',
    status: 'live',
    title: 'Auto-attention',
    en: 'Self-attention',
    aliases: ['self-attention', 'attention', 'attention mechanism', 'attention heads', 'multi-head attention', 'query key value', 'sparse attention'],
    aliasesFr: ["mécanisme d'attention", 'attention', "têtes d'attention"],
    jargon: [
      {say: 'attention heads', means: "les têtes d'attention, plusieurs calculs d'attention menés côte à côte dans la même couche, chacun libre de repérer un autre type de lien ; l'article de 2017 en utilisait 8"},
      {say: 'Q, K, V', means: "query, key, value ; chaque token pose une question (query), chaque token précédent affiche une étiquette (key), et quand question et étiquette se ressemblent, le premier reçoit une part du contenu du second (value)"},
      {say: 'quadratique', means: "se dit du coût de l'attention complète, qui grandit avec le carré de la longueur du texte, puisque deux fois plus de tokens font quatre fois plus de paires à comparer"},
      {say: 'sparse attention', means: "l'attention clairsemée, où chaque token ne regarde qu'une sélection des autres pour économiser du calcul"},
    ],
    cat: 'fondations',
    links: ['transformer', 'embedding', 'fenetre-de-contexte', 'kv-cache', 'cout-d-une-requete'],
    short:
      "L'auto-attention est le mécanisme par lequel chaque token d'un texte mesure combien comptent pour lui les tokens qui le précèdent, puis se mélange à eux dans ces proportions, ce qui lui permet de prendre son sens grâce à des mots parfois éloignés.",
    image:
      "Dans son casque, chaque musicien a son propre mélange des autres pistes. Le bassiste y monte la grosse caisse et baisse les violons, la chanteuse monte le piano qui lui donne la note, et chacun joue en fonction de ce qu'il entend. L'auto-attention donne ce casque à chaque token du texte, avec deux différences que l'image cache, puisque le mélange se refait à chaque nouveau token et que chaque musicien porte en réalité plusieurs casques à la fois, les têtes d'attention.",
    imagineForm: 'B',
    imagine:
      "Lis à voix haute à quelqu'un « Le trophée ne rentre pas dans le sac parce qu'il est trop grand », puis demande-lui qui est trop grand. Relis la phrase en changeant le dernier mot pour « petit », repose la question, et regarde la réponse passer du trophée au sac sans une hésitation, alors que le mot qui décide arrive trois mots après « il ».",
    full: [
      "Un mot seul veut rarement dire quelque chose de précis, et « il », « avocat » ou « elle » attendent le reste de la phrase pour prendre leur sens. L'auto-attention (self-attention) fait ce travail dans chaque couche du modèle. Chaque token calcule un score avec chacun des tokens qui le précèdent, transforme ces scores en proportions dont le total fait 100 %, puis absorbe un peu de chacun dans ces proportions, et il en sort avec une représentation qui tient compte de son contexte.",
      "L'idée naît en septembre 2014, quand Dzmitry Bahdanau, Kyunghyun Cho et Yoshua Bengio donnent à un traducteur automatique le droit de chercher dans la phrase d'origine les mots utiles à chaque mot qu'il écrit, au lieu de tout résumer d'avance. L'article du transformer en fait en 2017 le seul mécanisme du modèle, et l'applique à la phrase elle-même, d'où le « auto ». Dans ses annexes, deux têtes d'attention lisent « The Law will never be perfect, but its application should be just », et les auteurs notent qu'elles semblent avoir appris seules à relier le pronom « its » à ce qu'il désigne.",
      "Ce regard sur tout le texte se paie. Chaque token se compare à tous ceux qui le précèdent, alors le nombre de comparaisons grandit avec le carré de la longueur, et doubler un document quadruple le travail de l'attention. C'est pour éviter de refaire ces calculs à chaque nouveau token que les modèles gardent de côté ceux qui sont déjà faits, dans le KV cache.",
    ],
    then:
      "Jusqu'en 2025, les modèles de DeepSeek, comme le transformer de 2017, comparaient chaque token à tous ceux qui le précèdent. Le 29 septembre 2025, DeepSeek a publié DeepSeek-V3.2-Exp, où un petit module d'indexation choisit pour chaque token les tokens précédents qui méritent d'être regardés. Le même jour, le labo a baissé de plus de 50 % le prix de son API, pour des réponses qu'il dit presque identiques.",
    office: [
      {who: 'q', text: "L'attention, c'est le modèle qui fait attention à ce que je lui dis ?"},
      {who: 'a', text: "Le mot est trompeur, car il désigne un calcul qui dit à chaque token quels autres tokens comptent pour son sens ; rien ne garantit que ta consigne la plus importante pèse lourd dans ce calcul, alors écris-la clairement plutôt que d'espérer qu'elle soit remarquée."},
    ],
    avoid:
      "« Le modèle se concentre sur les mots importants de ma question. » L'attention n'a pas de liste de mots importants ; chaque token, dans chaque tête et à chaque couche, pèse les autres à sa façon, et la même phrase est relue des dizaines de fois sous des angles différents.",
    video: null,
    sources: [
      {label: "Bahdanau, Cho et Bengio, Neural Machine Translation by Jointly Learning to Align and Translate, 1er septembre 2014 (le traducteur cherche les parties utiles de la phrase source au lieu de tout résumer dans un vecteur de taille fixe)", url: 'https://arxiv.org/abs/1409.0473'},
      {label: "Vaswani et al., Attention Is All You Need, juin 2017 (8 têtes d'attention ; figure 4, deux têtes de la couche 5 « apparently involved in anaphora resolution » sur la phrase « The Law will never be perfect, but its application should be just »)", url: 'https://arxiv.org/abs/1706.03762'},
      {label: "Wikipédia, Transformer (deep learning architecture) (coût de l'auto-attention standard qui croît avec le carré de la longueur de la séquence), consulté le 2 octobre 2026", url: 'https://en.wikipedia.org/wiki/Transformer_(deep_learning)'},
      {label: "DeepSeek, annonce de DeepSeek-V3.2-Exp, 29 septembre 2025 (DeepSeek Sparse Attention, prix de l'API en baisse de plus de 50 %)", url: 'https://api-docs.deepseek.com/news/news250929'},
      {label: "DeepSeek, fiche Hugging Face de DeepSeek-V3.2-Exp (construit sur V3.1-Terminus en y ajoutant l'attention clairsemée ; module d'indexation ; qualité au niveau de V3.1-Terminus), consultée le 2 octobre 2026", url: 'https://huggingface.co/deepseek-ai/DeepSeek-V3.2-Exp'},
    ],
  },
  {
    id: 'reseau-de-neurones',
    status: 'live',
    title: 'Réseau de neurones',
    en: 'Neural network',
    aliases: ['neural network', 'neural networks', 'artificial neural network', 'ANN', 'neuron', 'perceptron', 'multilayer perceptron', 'MLP'],
    aliasesFr: ['réseau de neurones artificiels', 'réseau neuronal', 'neurone artificiel', 'perceptron'],
    jargon: [
      {say: 'poids, weights', means: "les nombres qui disent combien chaque entrée compte pour un neurone ; ce sont eux, les paramètres du modèle"},
      {say: 'biais, bias', means: "un nombre que chaque neurone ajoute à sa somme, et qui joue le rôle de son seuil"},
      {say: 'activation', means: "la règle qui décide ce que le neurone transmet à partir de sa somme ; l'une des plus simples, ReLU, laisse passer les sommes positives et remplace les négatives par zéro"},
      {say: 'MLP, feedforward', means: "le réseau classique en couches, où chaque neurone reçoit toutes les sorties de la couche d'avant ; chaque couche d'un transformer en contient un"},
    ],
    cat: 'fondations',
    links: ['deep-learning', 'parametres', 'retropropagation', 'transformer', 'gradient-qui-disparait'],
    short:
      "Un réseau de neurones est un programme fait de couches de petites unités de calcul, les neurones. Chacun fait une somme de ce qu'il reçoit en donnant un poids à chaque entrée, puis transmet le résultat à la couche suivante, et ces poids, réglés pendant l'entraînement, sont les paramètres du modèle.",
    image:
      "Dévisse la façade de la console, et tu découvres que chaque potard règle le volume d'un câble qui va d'un petit mélangeur au suivant. Chaque mélangeur additionne ce qui lui arrive, dosé par les potards, et n'envoie un signal plus loin que si la somme dépasse son seuil, rangée après rangée jusqu'à la sortie. Le neurone artificiel doit son nom au cerveau, mais la ressemblance s'arrête à ce schéma, puisqu'il ne fait qu'une addition et un seuil.",
    imagineForm: 'B',
    imagine:
      "Pour décider si tu sors ce soir, note trois choses par 0 ou par 1, s'il fait beau, si un ami t'attend, si tu es en forme, et donne-leur des poids, 1 pour la météo, 3 pour l'ami et 2 pour la forme. Ce soir il pleut, un ami t'attend et tu es en forme, alors multiplie, additionne, et sors si le total dépasse 3. Refais le calcul avec 3 pour la météo et 1 pour l'ami, et la même soirée te fait rester chez toi. Tu viens de jouer un neurone et de régler ses poids à la main.",
    full: [
      "En juillet 1958, la marine américaine présente à la presse le perceptron de Frank Rosenblatt, un programme qui tourne sur un IBM 704, un ordinateur de cinq tonnes grand comme une pièce. Après 50 essais, il a appris seul à distinguer des cartes marquées à gauche de cartes marquées à droite. Le New York Times y voit l'embryon d'un ordinateur dont la marine attend qu'il sache un jour marcher, parler, voir, écrire, se reproduire et avoir conscience de lui-même.",
      "La version construite en dur, le Mark I Perceptron, regardait le monde par 400 cellules photoélectriques disposées en carré de 20 sur 20, et rangeait ses poids dans des potentiomètres que des moteurs électriques tournaient pendant l'apprentissage. Le principe a tenu jusqu'à aujourd'hui. Un neurone artificiel multiplie chacune de ses entrées par un poids, additionne le tout, et transmet un signal qui dépend de cette somme, et apprendre consiste à corriger les poids après chaque erreur.",
      "Un seul rang de neurones ne sait séparer deux catégories que par une frontière droite. En 1969, Marvin Minsky et Seymour Papert montrent dans leur livre Perceptrons qu'il ne peut pas apprendre le « ou exclusif », une règle vraie quand une seule de deux conditions est remplie. La parade consiste à empiler des couches, dont chacune travaille sur ce que la précédente a calculé, et à les régler toutes ensemble par rétropropagation. Un LLM est un réseau de ce genre, avec des milliards de poids, et en 2024 le prix Nobel de physique est allé à John Hopfield et Geoffrey Hinton pour leurs travaux fondateurs sur ces réseaux.",
    ],
    office: [
      {who: 'q', text: "Un réseau de neurones, ça marche comme un cerveau ?"},
      {who: 'a', text: "De très loin ; le neurone artificiel fait une addition pondérée suivie d'un seuil, sans rien de la chimie d'un vrai neurone, et son nom rappelle l'inspiration de départ plutôt qu'une ressemblance mesurée."},
    ],
    avoid:
      "« Chaque neurone du modèle correspond à une idée. » Un neurone répond souvent à des choses sans rapport entre elles, et dans Inception v1, un modèle de vision étudié par Anthropic en 2023, un même neurone réagit aux têtes de chat comme aux faces avant de voitures.",
    video: null,
    sources: [
      {label: "Cornell Chronicle, « Professor's perceptron paved the way for AI, 60 years too soon », 25 septembre 2019 (démonstration de juillet 1958 par l'Office of Naval Research ; IBM 704 de cinq tonnes ; cartes marquées à gauche ou à droite distinguées après 50 essais)", url: 'https://news.cornell.edu/stories/2019/09/professors-perceptron-paved-way-ai-60-years-too-soon'},
      {label: "Wikipédia, Perceptron (Mark I : 400 cellules photoélectriques en grille de 20 sur 20, poids dans des potentiomètres tournés par des moteurs électriques ; citation du New York Times de 1958 ; Minsky et Papert, Perceptrons, 1969, et le ou exclusif), consulté le 2 octobre 2026", url: 'https://en.wikipedia.org/wiki/Perceptron'},
      {label: "Nobel Prize, The Nobel Prize in Physics 2024 (John J. Hopfield et Geoffrey Hinton, « for foundational discoveries and inventions that enable machine learning with artificial neural networks »), consulté le 2 octobre 2026", url: 'https://www.nobelprize.org/prizes/physics/2024/summary/'},
      {label: "Anthropic, Towards Monosemanticity: Decomposing Language Models With Dictionary Learning, 4 octobre 2023 (neurones polysémantiques ; dans Inception v1, un neurone répond aux têtes de chat et aux faces avant de voitures)", url: 'https://transformer-circuits.pub/2023/monosemantic-features/index.html'},
    ],
  },
  {
    id: 'deep-learning',
    status: 'live',
    title: 'Deep learning',
    en: 'Deep learning',
    aliases: ['deep learning', 'machine learning', 'ML', 'DL', 'deep neural network', 'DNN'],
    aliasesFr: ['apprentissage profond', 'apprentissage automatique', 'réseau de neurones profond'],
    jargon: [
      {say: 'ML', means: "machine learning, l'apprentissage automatique, toute méthode où le programme tire ses règles d'exemples au lieu de les recevoir écrites"},
      {say: 'deep', means: "profond, au sens d'un réseau qui empile de nombreuses couches entre l'entrée et la sortie ; le mot ne dit rien de la profondeur d'une pensée"},
      {say: 'features', means: "les caractéristiques qu'on mesure sur une donnée pour la décrire, comme des contours sur une image ; le deep learning les apprend seul, là où l'apprentissage classique les faisait choisir par des humains"},
      {say: 'IA, ML, DL', means: "les trois cercles emboîtés du domaine, puisque le deep learning est une famille du machine learning, lui-même une branche de l'intelligence artificielle"},
    ],
    cat: 'fondations',
    links: ['reseau-de-neurones', 'transformer', 'gradient-qui-disparait', 'entrainement', 'multimodal'],
    short:
      "Le deep learning, ou apprentissage profond, est la branche de l'apprentissage automatique qui entraîne des réseaux de neurones à nombreuses couches sur des masses d'exemples, pour qu'ils trouvent seuls des règles qu'aucun programmeur ne saurait écrire, comme reconnaître un visage ou traduire une phrase.",
    image:
      "Il y a deux façons d'apprendre un morceau à un groupe, lui écrire la partition note par note, ou lui faire écouter des milliers d'enregistrements en le corrigeant à l'oreille jusqu'à ce qu'il retrouve le morceau seul. L'apprentissage automatique choisit la seconde. Le deep learning y ajoute la profondeur, avec une console aux dizaines de rangées de potards empilées, où chaque rangée affine le travail de la rangée d'avant.",
    imagineForm: 'D',
    imagine:
      "« Comment tu sais que c'est un chat ? Donne-moi la règle, que je l'écrive pour un ordinateur », demandes-tu à ta fille de quatre ans devant une photo. Elle hausse les épaules : « Ben, ça se voit. »",
    full: [
      "Pendant des décennies, programmer voulait dire écrire des règles. Pour reconnaître un chat, il aurait fallu décrire les oreilles, les moustaches et toutes leurs variantes sous tous les angles, ce que personne ne sait faire, alors que n'importe quel enfant reconnaît un chat. L'apprentissage automatique (machine learning) prend le problème à l'envers, en donnant au programme des milliers d'exemples avec la bonne réponse, et c'est lui qui ajuste ses propres réglages jusqu'à retrouver ces réponses.",
      "Le mot vient d'Arthur Samuel, chercheur chez IBM, qui publie en juillet 1959 ses expériences sur un programme de jeu de dames. Il ne lui donne que les règles, un sens de la direction à suivre et une liste de critères dont il ignore lui-même le bon poids. Après 8 à 10 heures de parties, le programme joue mieux que l'homme qui l'a écrit.",
      "Le deep learning est la version de cette idée qui passe par des réseaux de neurones à nombreuses couches, le « profond » désignant le nombre de couches que traverse la donnée. Il fait aussi disparaître une étape, puisque les méthodes d'avant faisaient choisir par des humains les caractéristiques à mesurer sur une image, alors qu'un réseau profond les apprend seul, couche après couche. En 2012, AlexNet, un réseau de huit couches et 60 millions de paramètres conçu par Alex Krizhevsky, Ilya Sutskever et Geoffrey Hinton, gagne le concours d'images ImageNet avec 15,3 % d'erreur, contre 26,2 % pour le deuxième, en ayant droit à cinq propositions par image. Les LLM d'aujourd'hui sont des descendants directs de cette approche.",
    ],
    office: [
      {who: 'q', text: "Il nous faut du deep learning pour prévoir nos ventes ?"},
      {who: 'a', text: "Pas forcément ; sur des tableaux d'environ 10 000 lignes, une étude de 2022 portant sur 45 jeux de données trouvait encore les méthodes à base d'arbres de décision, comme XGBoost, devant le deep learning, et plus rapides."},
    ],
    avoid:
      "« Le deep learning, c'est une IA qui réfléchit en profondeur. » Le mot « profond » compte les couches du réseau, et AlexNet, avec ses huit couches, était déjà un réseau profond.",
    video: null,
    sources: [
      {label: "Samuel, Some Studies in Machine Learning Using the Game of Checkers, IBM Journal of Research and Development, juillet 1959 (règles du jeu, sens de la direction, critères aux poids inconnus ; meilleur que son auteur après 8 à 10 heures de jeu)", url: 'https://people.cs.umass.edu/~barto/courses/cs687/Samuel.pdf'},
      {label: "Wikipédia, Machine learning (terme forgé en 1959 par Arthur Samuel, employé d'IBM), consulté le 2 octobre 2026", url: 'https://en.wikipedia.org/wiki/Machine_learning'},
      {label: "Wikipédia, Deep learning (« deep » désigne le nombre de couches ; les caractéristiques apprises par le réseau plutôt que choisies à la main), consulté le 2 octobre 2026", url: 'https://en.wikipedia.org/wiki/Deep_learning'},
      {label: "Wikipédia, AlexNet (Krizhevsky, Sutskever et Hinton, 2012 ; huit couches ; 60 millions de paramètres ; 15,3 % d'erreur en top-5), consulté le 2 octobre 2026", url: 'https://en.wikipedia.org/wiki/AlexNet'},
      {label: "ImageNet, résultats d'ILSVRC 2012 (SuperVision 0,15315 d'erreur avec cinq propositions, ISI deuxième à 0,26172)", url: 'https://image-net.org/challenges/LSVRC/2012/results.html'},
      {label: "Grinsztajn, Oyallon et Varoquaux, Why do tree-based models still outperform deep learning on tabular data?, 18 juillet 2022 (45 jeux de données ; arbres de décision devant sur des données d'environ 10 000 lignes, et plus rapides)", url: 'https://arxiv.org/abs/2207.08815'},
    ],
  },
  {
    id: 'multimodal',
    status: 'live',
    title: 'Multimodal',
    en: 'Multimodal model',
    aliases: ['multimodal', 'multimodality', 'multimodal model', 'vision language model', 'VLM', 'omni model', 'vision'],
    aliasesFr: ['modèle multimodal', 'multimodalité'],
    jargon: [
      {say: 'VLM', means: "vision language model, un modèle de langage qui accepte aussi des images en entrée"},
      {say: 'omni', means: "se dit d'un modèle qui reçoit et produit plusieurs types de contenu avec le même réseau, comme GPT-4o, dont le « o » veut dire omni"},
      {say: 'patch', means: "le petit carré de pixels qui devient un token d'image ; 28 pixels de côté chez Claude"},
    ],
    cat: 'fondations',
    links: ['llm', 'token', 'tokenizer', 'embedding', 'transformer', 'deep-learning'],
    short:
      "Un modèle multimodal traite plusieurs types de contenu, texte, images, son ou vidéo, en les convertissant tous en tokens qu'il lit dans la même suite ; il peut ainsi décrire une photo, répondre à une question posée à voix haute ou lire un graphique.",
    image:
      "Pose une caméra et un micro d'ambiance à côté de la sampleuse, et elle se met à découper aussi ce qu'ils captent, la photo en petits carrés et le son en tranches très courtes. Chaque morceau prend place dans la même file que les samples du texte, et le groupe joue alors en tenant compte d'une salle qu'il n'entendait pas jusque-là. L'image triche sur la continuité, car le modèle ne regarde pas la salle en direct ; il reçoit des instantanés, découpés en carrés.",
    imagineForm: 'A',
    imagine:
      "Filme une heure de match et confie-la à l'API Gemini de Google. Elle n'en regarde qu'une image par seconde, 3 600 photos en tout, et en haute résolution ces photos remplissent à elles seules près de 90 % de sa fenêtre d'un million de tokens. La bande-son de la même heure tiendrait, seule, en 115 200 tokens. Une frappe au but qui dure une demi-seconde peut très bien tomber entre deux photos.",
    full: [
      "Un modèle multimodal ne regarde pas une image à la manière d'un œil. Il la découpe en petits carrés, des patchs de 28 pixels de côté chez Claude, et transforme chaque carré en un token visuel ; une photo de 1 000 pixels sur 1 000 lui coûte ainsi 1 296 tokens. Ces tokens rejoignent ceux du texte dans la même suite, et le modèle les lit ensemble, de quoi relier une question écrite à un coin précis de l'image. L'idée vient d'un article de Google d'octobre 2020, au titre parlant, « An Image is Worth 16x16 Words », qui donnait à un transformer des images découpées en carrés comme s'il s'agissait de mots.",
      "Jusqu'en mai 2024, le mode vocal de ChatGPT enchaînait trois modèles, un pour transcrire ta voix en texte, GPT-4 pour répondre par écrit, et un troisième pour lire la réponse à voix haute. Il mettait en moyenne 5,4 secondes à répondre, et le ton de ta voix, les bruits de fond ou la présence de plusieurs personnes disparaissaient dès la transcription. GPT-4o, présenté le 13 mai 2024, traite le texte, l'image et le son avec un seul réseau, et répond à la voix en 320 millisecondes en moyenne, un délai proche de celui d'une conversation entre humains.",
      "Le mot ne dit pas dans quel sens circule le contenu. Claude lit les images mais n'en produit aucune, alors que GPT-4o peut aussi générer des images et de la voix. Le découpage a aussi ses angles morts, et Anthropic prévient que Claude donne des comptes approximatifs quand une image contient beaucoup de petits objets.",
    ],
    office: [
      {who: 'q', text: "Je lui envoie la photo du tableau blanc de la réunion plutôt que de taper le compte rendu ?"},
      {who: 'a', text: "Oui, c'est l'usage type ; relis quand même les chiffres et les noms, car Anthropic prévient que le modèle peut se tromper sur une image floue, de travers ou trop petite."},
    ],
    avoid:
      "« Il voit l'image comme moi. » Il reçoit un millier de petits carrés de pixels transformés en tokens, et sur une image floue, de travers ou minuscule, il peut décrire avec aplomb un détail qui n'y figure pas.",
    video: null,
    sources: [
      {label: "Google, Gemini API, Video understanding (une image par seconde ; 258 tokens par image hors basse résolution ; une heure de vidéo en haute résolution tient dans une fenêtre d'un million de tokens ; « fast action sequences might lose detail »), consulté le 2 octobre 2026. Calcul : 3 600 × 258 = 928 800 tokens, environ 89 % de 1 048 576", url: 'https://ai.google.dev/gemini-api/docs/video-understanding'},
      {label: "Google, Gemini API, Audio understanding (32 tokens par seconde de son, soit 1 920 par minute), consulté le 2 octobre 2026. Calcul : 32 × 3 600 = 115 200 tokens pour une heure", url: 'https://ai.google.dev/gemini-api/docs/audio'},
      {label: "Anthropic, Vision (patchs de 28 × 28 pixels, un token visuel par patch ; 1 296 tokens pour 1 000 × 1 000 pixels ; Claude ne génère pas d'images ; comptes approximatifs, erreurs sur les images floues, tournées ou très petites), consulté le 2 octobre 2026", url: 'https://platform.claude.com/docs/en/build-with-claude/vision'},
      {label: "Dosovitskiy et al. (Google Research, Brain Team), An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale, 22 octobre 2020 (un transformer appliqué directement à des suites de carrés d'image)", url: 'https://arxiv.org/abs/2010.11929'},
      {label: "OpenAI, GPT-4o System Card, 25 octobre 2024 (entrées et sorties traitées par le même réseau, entraîné de bout en bout sur texte, image et son ; réponse à l'audio en 232 millisecondes au mieux, 320 en moyenne, proche d'une conversation humaine ; sorties texte, audio et image)", url: 'https://arxiv.org/abs/2410.21276'},
      {label: "DataCamp, « What Is GPT-4o? », 14 mai 2024, reprenant l'annonce d'OpenAI (ancien mode vocal en trois modèles, latence moyenne de 2,8 s avec GPT-3.5 et 5,4 s avec GPT-4 ; ton, bruits de fond et voix multiples perdus)", url: 'https://www.datacamp.com/blog/what-is-gpt-4o'},
      {label: "TechCrunch, « OpenAI debuts GPT-4o 'omni' model now powering ChatGPT », 13 mai 2024 (le « o » pour omni)", url: 'https://techcrunch.com/2024/05/13/openais-newest-model-is-gpt-4o/'},
    ],
  },
];

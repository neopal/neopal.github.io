// Lexique IA, vague 8, lot S (technique). Format identique à lexique/terms.js, sans `num`.
// imagineForm : forme de l'« Imagine » (content/dico/univers.md, section « Les formes de l'Imagine »).
// Faits et chiffres relevés le 2 octobre 2026 sur les pages citées dans `sources`.
module.exports = [
  {
    id: 'logits',
    status: 'live',
    title: 'Logits',
    en: 'Logits',
    aliases: ['logit', 'logits', 'logprobs', 'log probabilities', 'softmax', 'logit bias', 'logit lens'],
    aliasesFr: ['scores bruts', 'log-probabilités'],
    jargon: [
      {say: 'softmax', means: "la fonction qui transforme la liste des logits en probabilités positives dont la somme fait 1, en creusant l'écart en faveur des scores les plus hauts"},
      {say: 'logprobs', means: "les logarithmes des probabilités, que certaines API renvoient pour chaque token écrit ; 0 veut dire 100 %, et plus le nombre est négatif, moins le token était attendu"},
      {say: 'top_logprobs', means: "chez OpenAI, le nombre de candidats, 20 au plus, dont l'API montre la probabilité à chaque position de la réponse"},
      {say: 'logit_bias', means: "un réglage de l'API d'OpenAI qui ajoute aux logits de certains tokens un bonus ou un malus, de -100 à 100, avant le tirage"},
    ],
    cat: 'inference',
    links: ['prediction-du-mot-suivant', 'temperature', 'token', 'distillation', 'mythe-sait-quand-il-ne-sait-pas', 'interpretabilite'],
    short:
      "Les logits sont les scores bruts qu'un modèle de langage calcule pour chaque token de son vocabulaire avant d'écrire le suivant, et que la fonction softmax change en probabilités.",
    image:
      "Juste avant chaque note, la banque de samples s'allume comme un tableau de scores, où chaque sample reçoit un chiffre, haut pour ceux qui iraient bien à cet endroit du morceau, très bas pour ceux qui sonneraient faux. Ces chiffres sont les logits ; le curseur d'impro les tasse ou les étire, puis le chanteur tire sa note. L'image triche sur l'échelle, puisque les logits n'ont ni unité ni plafond et que seul compte l'écart entre eux.",
    imagineForm: 'A',
    imagine:
      "À chaque token qu'il écrit, Mistral Large 3, le grand modèle ouvert de Mistral AI, calcule 131 072 logits, un pour chaque entrée de son vocabulaire. Imprime ceux d'un seul pas, un nombre par ligne et cinquante lignes par page, et tu tiens un volume de 2 622 pages. Une réponse de 500 tokens en remplit 500 comme lui, pour ne garder chaque fois qu'un token, parfois une virgule.",
    full: [
      "La dernière couche du modèle produit une liste de nombres aussi longue que son vocabulaire, un logit par token possible, positif ou négatif, sans borne. La softmax les change ensuite en probabilités, en passant chaque score à l'exponentielle puis en divisant par le total, ce qui écrase vite les petits scores, et deux points d'écart suffisent à rendre un token plus de sept fois plus probable que son voisin. Ajouter le même nombre à tous les logits ne change donc rien, et la température agit juste avant cette étape, en les divisant tous par la même valeur.",
      "Le mot vient de la statistique médicale. En 1944, le biostatisticien Joseph Berkson, qui étudiait la réponse d'organismes à des doses croissantes d'un produit, appelle logit, pour logistic unit, une façon de reporter une probabilité sur une échelle sans limites, comme Chester Bliss avait nommé probit sa propre unité dix ans plus tôt. L'apprentissage automatique a gardé le terme pour tout score qu'une softmax transforme ensuite en probabilité.",
      "Les logits sont la partie du calcul qu'on peut lire et retoucher sans réentraîner le modèle. L'API d'OpenAI renvoie sur demande les logprobs des 20 candidats les plus probables à chaque position, et son paramètre logit_bias ajoute un bonus ou un malus aux tokens choisis, jusqu'à les interdire. La distillation d'origine entraînait l'élève sur les probabilités tirées des logits du professeur. En août 2020, le blogueur nostalgebraist a montré qu'en appliquant la dernière étape du modèle à ses couches intermédiaires, une méthode qu'il a appelée logit lens, on voit la prédiction se préciser couche après couche.",
      "Un logit élevé dit que le token était attendu à cet endroit du texte, et rien de plus. Une date inventée peut sortir avec un score très haut si tout ce qui précède la rendait plausible. Les logprobs deviennent d'ailleurs plus rares, puisque chez OpenAI les modèles de la famille GPT-6 ne les renvoient plus dès qu'ils raisonnent.",
    ],
    office: [
      {who: 'q', text: "On peut se servir des logprobs pour savoir si sa réponse est fiable ?"},
      {who: 'a', text: "Pour une étiquette d'un seul token, oui ou non, catégorie A ou B, ils donnent un seuil de tri utile, à régler sur tes propres cas. Sur un paragraphe entier, ils mesurent ce qui était attendu et pas ce qui est exact."},
    ],
    avoid:
      "« Le logit, c'est la probabilité du mot. » Un logit peut valoir -3 comme 25, et l'ensemble ne fait pas 1 ; il ne devient une probabilité qu'après la softmax, et sa valeur seule ne dit rien sans celle des autres.",
    video: null,
    sources: [
      {label: "Mistral AI, fichier params.json de Mistral-Large-3-675B-Instruct-2512 sur Hugging Face (« vocab_size »: 131072), consulté le 2 octobre 2026. Calcul de l'Imagine : 131 072 / 50 = 2 621,44, soit 2 622 pages ; 131 072 × 500 = 65 536 000 logits pour une réponse de 500 tokens", url: 'https://huggingface.co/mistralai/Mistral-Large-3-675B-Instruct-2512'},
      {label: "Mistral AI, Introducing Mistral 3, 2 décembre 2025 (famille de modèles ouverts de 3 à 675 milliards de paramètres, dont Mistral Large 3)", url: 'https://mistral.ai/news/mistral-3'},
      {label: "Hinton, Vinyals et Dean, Distilling the Knowledge in a Neural Network, 9 mars 2015 (la couche softmax convertit le logit calculé pour chaque classe en probabilité en le comparant aux autres logits ; l'élève apprend sur les probabilités adoucies du professeur). Calcul de la fiche : deux points d'écart entre deux logits donnent un rapport de probabilités de e^2 = 7,39", url: 'https://arxiv.org/abs/1503.02531'},
      {label: "Wikipédia, Logit (en 1944, Joseph Berkson nomme logit le logarithme de la cote, abréviation de « logistic unit », par analogie avec le probit de Chester Bliss, 1934 ; article « Application of the Logistic Function to Bio-Assay »), consulté le 2 octobre 2026", url: 'https://en.wikipedia.org/wiki/Logit'},
      {label: "OpenAI, référence de l'API Chat Completions, consultée le 2 octobre 2026 (logprobs ; top_logprobs de 0 à 20 ; logit_bias de -100 à 100, « added to the logits generated by the model prior to sampling », -100 ou 100 pour interdire ou imposer un token)", url: 'https://developers.openai.com/api/reference/resources/chat/subresources/completions/methods/create'},
      {label: "OpenAI, guide Using GPT-6, consulté le 2 octobre 2026 (quand l'effort de raisonnement n'est pas none, retirer temperature, top_p et top_logprobs, et logprobs en Chat Completions)", url: 'https://developers.openai.com/api/docs/guides/latest-model'},
      {label: "nostalgebraist, interpreting GPT: the logit lens, LessWrong, 31 août 2020 (la sortie du modèle appliquée aux couches intermédiaires donne des prédictions qui se précisent de couche en couche)", url: 'https://www.lesswrong.com/posts/AcKRB8wDpdaN6v6ru/interpreting-gpt-the-logit-lens'},
    ],
  },
  {
    id: 'encodeur-decodeur',
    status: 'live',
    title: 'Encodeur-décodeur',
    en: 'Encoder-decoder',
    aliases: ['encoder-decoder', 'encoder', 'decoder', 'encoder-only', 'seq2seq', 'sequence-to-sequence', 'cross-attention', 'BERT', 'T5'],
    aliasesFr: ['encodeur', 'décodeur', 'architecture encodeur-décodeur', 'attention croisée'],
    jargon: [
      {say: 'encoder-only', means: "un modèle qui ne garde que la moitié qui lit, comme BERT ; il sert à classer, comparer ou chercher des textes, pas à en écrire"},
      {say: 'seq2seq', means: "sequence to sequence, une suite en entrée et une autre en sortie, comme une phrase et sa traduction ; le nom vient d'un article de Google de septembre 2014"},
      {say: 'cross-attention', means: "l'attention croisée, par laquelle le décodeur consulte, à chaque token qu'il écrit, ce que l'encodeur a tiré de l'entrée"},
      {say: 'T5', means: "Text-to-Text Transfer Transformer, l'encodeur-décodeur présenté par Google en octobre 2019, qui ramène toute tâche à un texte en entrée et un texte en sortie"},
    ],
    cat: 'fondations',
    links: ['transformer', 'auto-attention', 'embedding', 'llm', 'rag', 'modele-de-diffusion'],
    short:
      "Un encodeur-décodeur est un modèle en deux parties, l'une qui lit toute l'entrée d'un coup et la traduit en nombres, l'autre qui écrit la sortie token par token.",
    image:
      "Le studio a longtemps travaillé en deux équipes. La première écoute la maquette en entier, d'un bout à l'autre et dans les deux sens, et la note sur une grille de nombres ; la seconde enregistre en cabine la nouvelle version, note après note, en relevant les yeux vers cette grille à chaque mesure. L'encodeur est la première équipe et le décodeur la seconde, et la plupart des groupes d'aujourd'hui n'ont gardé que la cabine.",
    imagineForm: 'D',
    imagine:
      "« Résume-moi ce contrat de bail en trois lignes », écris-tu à EmbeddingGemma, le modèle d'embedding ouvert de Google. « -0,0923 ; 0,0102 ; 0,0292 ; -0,0404 », répond-il, avant 764 autres nombres.",
    full: [
      "Le schéma vient de la traduction automatique. En juin 2014, des chercheurs de Montréal décrivent un système de deux réseaux qu'ils appellent RNN Encoder-Decoder, dont le premier condense une phrase en une suite de nombres et le second en tire la phrase traduite. Google publie la même architecture en septembre sous le nom de sequence to sequence, et le transformer de 2017 reprend ce plan, avec une pile de couches qui lit, une pile qui écrit, et une attention croisée entre les deux.",
      "Ses héritiers se sont partagé les deux moitiés. En octobre 2018, Google ne garde que l'encodeur pour BERT, qui lit chaque mot à la lumière de ceux qui le précèdent et de ceux qui le suivent. Un an plus tard, BERT aidait Google Search à mieux comprendre une recherche sur dix en anglais aux États-Unis, comme « 2019 brazil traveler to usa need a visa », où l'ancien système négligeait le « to » et répondait sur les Américains partant au Brésil. OpenAI avait pris l'autre moitié dès juin 2018 pour GPT, et presque tous les LLM d'aujourd'hui descendent de ce décodeur seul.",
      "Les deux moitiés réunies restent là où une entrée doit être lue en entier avant qu'on en écrive une autre. Whisper, le modèle de transcription qu'OpenAI a publié en septembre 2022, encode le son et décode le texte, et Stable Diffusion 3 lit les prompts détaillés avec l'encodeur de T5. En 2025, Google a même fait le chemin à l'envers. Pour EmbeddingGemma, publié en septembre, ses chercheurs ont converti un Gemma 3 de 300 millions de paramètres en encodeur-décodeur, puis n'en ont gardé que l'encodeur, qui rend 768 nombres par texte. En décembre, T5Gemma 2 publiait des encodeurs-décodeurs complets, de 270 millions à 4 milliards de paramètres de chaque côté.",
    ],
    office: [
      {who: 'q', text: "Pour trier nos deux millions de tickets par catégorie, on prend un LLM ?"},
      {who: 'a', text: "Essaie aussi un encodeur de la famille de BERT, fine-tuné sur quelques milliers de tickets déjà classés. En décembre 2024, les auteurs de ModernBERT décrivaient ces encodeurs comme la bête de somme des systèmes en production pour le classement et la recherche, avec bien moins de paramètres à faire tourner par ticket."},
    ],
    avoid:
      "« GPT, c'est un encodeur qui comprend et un décodeur qui répond. » GPT et presque tous les LLM n'ont qu'un décodeur, qui lit ta question avec les mêmes couches qui écrivent la réponse. L'encodeur séparé vit surtout dans les modèles d'embedding, la transcription de la parole et la lecture des prompts d'images.",
    video: null,
    sources: [
      {label: "Test du 2 octobre 2026 avec la version ONNX d'EmbeddingGemma (onnx-community/embeddinggemma-300m-ONNX, onnxruntime) : la phrase « Résume-moi ce contrat de bail en trois lignes. », 14 tokens, donne un vecteur de 768 nombres qui commence par -0,0923 ; 0,0102 ; 0,0292 ; -0,0404. Calcul : 768 - 4 = 764", url: 'https://huggingface.co/onnx-community/embeddinggemma-300m-ONNX'},
      {label: "Vera et al. (Google DeepMind), EmbeddingGemma: Powerful and Lightweight Text Representations, 24 septembre 2025 (modèle encoder-only de 308 millions de paramètres tiré d'un Gemma 3 de 300 millions converti en encodeur-décodeur selon la recette T5Gemma, puis réduit à son encodeur ; attention bidirectionnelle ; embeddings de 768 dimensions)", url: 'https://arxiv.org/abs/2509.20354'},
      {label: "Cho et al. (université de Montréal, université du Maine, Jacobs University), Learning Phrase Representations using RNN Encoder-Decoder for Statistical Machine Translation, 3 juin 2014", url: 'https://arxiv.org/abs/1406.1078'},
      {label: "Sutskever, Vinyals et Le (Google), Sequence to Sequence Learning with Neural Networks, 10 septembre 2014", url: 'https://arxiv.org/abs/1409.3215'},
      {label: "Devlin et al. (Google), BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding, 11 octobre 2018 (Bidirectional Encoder Representations from Transformers, contexte gauche et droit dans toutes les couches)", url: 'https://arxiv.org/abs/1810.04805'},
      {label: "Pandu Nayak (Google), Understanding searches better than ever before, 25 octobre 2019 (BERT aide Search à mieux comprendre une recherche sur dix en anglais aux États-Unis ; exemple « 2019 brazil traveler to usa need a visa »)", url: 'https://blog.google/products/search/search-language-understanding-bert/'},
      {label: "Wikipédia, Generative pre-trained transformer (GPT-1 présenté par OpenAI le 11 juin 2018), consulté le 2 octobre 2026", url: 'https://en.wikipedia.org/wiki/Generative_pre-trained_transformer'},
      {label: "Raffel et al. (Google), Exploring the Limits of Transfer Learning with a Unified Text-to-Text Transformer, 23 octobre 2019 (T5)", url: 'https://arxiv.org/abs/1910.10683'},
      {label: "Wikipédia, Whisper (speech recognition system) (publié en open source par OpenAI le 21 septembre 2022 ; architecture encodeur-décodeur, l'encodeur lit le spectrogramme du son, le décodeur écrit le texte), consulté le 2 octobre 2026", url: 'https://en.wikipedia.org/wiki/Whisper_(speech_recognition_system)'},
      {label: "Esser et al. (Stability AI), Scaling Rectified Flow Transformers for High-Resolution Image Synthesis, 5 mars 2024 (Stable Diffusion 3 : encodeurs de texte CLIP et T5-XXL, T5 important pour les prompts détaillés et le texte à écrire)", url: 'https://arxiv.org/abs/2403.03206'},
      {label: "Google, T5Gemma 2: The next generation of encoder-decoder models, 18 décembre 2025 (tailles 270M-270M, 1B-1B et 4B-4B, construits sur Gemma 3)", url: 'https://blog.google/innovation-and-ai/technology/developers-tools/t5gemma-2/'},
      {label: "Warner et al., ModernBERT: Smarter, Better, Faster, Longer, 18 décembre 2024 (les encodeurs comme BERT offrent un bon rapport performance-taille pour la recherche et la classification, « the workhorse of numerous production pipelines »)", url: 'https://arxiv.org/abs/2412.13663'},
    ],
  },
  {
    id: 'modele-de-diffusion',
    status: 'live',
    title: 'Modèle de diffusion',
    en: 'Diffusion model',
    aliases: ['diffusion model', 'diffusion models', 'diffusion', 'denoising diffusion', 'DDPM', 'latent diffusion', 'text diffusion', 'diffusion language model', 'dLLM'],
    aliasesFr: ['diffusion', 'modèle de débruitage', 'diffusion de texte'],
    jargon: [
      {say: 'steps', means: "le nombre de passes de débruitage ; plus il y en a, plus le résultat est fin et plus il coûte à calculer"},
      {say: 'latent diffusion', means: "la diffusion faite sur une version compressée de l'image plutôt que sur ses pixels, l'astuce qui a permis à Stable Diffusion de tourner sur une carte graphique grand public"},
      {say: 'autoregressive', means: "autorégressif, se dit d'un modèle qui écrit un token après l'autre, de gauche à droite, comme presque tous les LLM ; c'est à eux qu'on compare les modèles de diffusion de texte"},
      {say: 'dLLM', means: "diffusion LLM, un modèle de langage qui écrit en débruitant des blocs de texte entiers, comme DiffusionGemma"},
    ],
    cat: 'fondations',
    links: ['multimodal', 'prediction-du-mot-suivant', 'encodeur-decodeur', 'deep-learning', 'inference', 'auto-attention'],
    short:
      "Un modèle de diffusion apprend à retirer du bruit, puis fabrique une image, une vidéo ou un texte en partant d'un bruit pur qu'il nettoie en plusieurs passes.",
    image:
      "Sur la bande que reçoit l'ingé son, il n'y a que du souffle, et on lui assure qu'un morceau de jazz est caché dessous. À chaque passage il en retire un peu, des notes apparaissent, puis des phrases, et après de nombreux passages le morceau se tient. L'image triche sur l'essentiel, puisque rien n'était caché ; le souffle était tiré au hasard, et c'est le nettoyage, guidé par ta consigne, qui invente ce qu'il fait mine de retrouver.",
    imagineForm: 'E',
    imagine:
      "Donne une grille de sudoku à un modèle de langage ordinaire, qui écrit de gauche à droite. Il doit poser le chiffre de la première case vide avant d'avoir écrit les autres, et le reste de la grille hérite de ce choix sans pouvoir revenir dessus. Donne la même grille à DiffusionGemma, que Google a fine-tuné sur des sudokus. Il part de cases toutes floues, fixe d'abord celles dont il est le plus sûr, où qu'elles soient, s'en sert comme indices pour les autres, et réussit ainsi huit grilles sur dix, en 12 passes.",
    full: [
      "L'entraînement se fait dans le sens inverse de l'usage. On prend des millions d'images, on les brouille par petites touches de bruit jusqu'à ce qu'il ne reste qu'une neige uniforme, et on apprend au réseau à deviner, à chaque étape, le bruit qui vient d'être ajouté. Une fois entraîné, il reçoit une neige tirée au hasard et une consigne, puis retire le bruit pas à pas, jusqu'à une image que personne n'a jamais prise. L'idée vient d'un article de 2015 de chercheurs de Stanford et de Berkeley, inspirés par la thermodynamique, et c'est en juin 2020 qu'une équipe de Berkeley, avec Jonathan Ho, en tire des images de haute qualité, au prix de 1 000 étapes.",
      "Le 22 août 2022, Stable Diffusion met la technique entre toutes les mains. Ses poids sont publiés, et il tourne sur une carte graphique grand public parce qu'il débruite une version compressée de l'image plutôt que ses pixels, une méthode mise au point en 2021 à Munich et à Heidelberg. La consigne y passe par un encodeur de texte de 123 millions de paramètres, à côté d'un réseau de débruitage de 860 millions, et l'entraînement avait coûté environ 600 000 dollars de calcul.",
      "Ce qui guide le nettoyage explique une partie des défauts. Les premières versions de Stable Diffusion dessinaient mal les mains, que les images du jeu d'entraînement montraient rarement bien, et ne savaient pas écrire un mot lisible. Pour la version 3, en mars 2024, Stability AI a ajouté l'encodeur de T5-XXL et ses 4,7 milliards de paramètres, et constaté qu'il comptait surtout pour les prompts très détaillés et le texte à écrire dans l'image.",
    ],
    then:
      "En 2024, la diffusion faisait les images et les vidéos, et le texte restait l'affaire des modèles qui l'écrivent un token après l'autre. En mai 2025, Google montrait Gemini Diffusion, une démo expérimentale qui écrit 1 479 tokens par seconde. Le 10 juin 2026, il publiait les poids de DiffusionGemma, qui débruite des blocs de 256 tokens à la fois et dépasse 1 000 tokens par seconde sur une seule puce H100. Google reconnaît que la qualité de ses réponses reste inférieure à celle de Gemma 4, qu'il conseille dès que la qualité prime.",
    office: [
      {who: 'q', text: "Pourquoi l'image change complètement quand je relance avec le même prompt ?"},
      {who: 'a', text: "Chaque génération part d'une neige tirée au hasard ; beaucoup d'outils te laissent fixer ce tirage, la seed, et avec la même seed, le même prompt et les mêmes réglages, tu retrouves la même image."},
    ],
    avoid:
      "« Le modèle colle des morceaux d'images existantes. » Il part d'un bruit tiré au hasard et le nettoie avec ce qu'il a retenu de millions d'images, ce qui ne l'empêche pas de recracher presque à l'identique une image très présente dans ses données. En janvier 2023, des chercheurs en ont extrait plus d'un millier de Stable Diffusion et d'autres modèles.",
    video: null,
    sources: [
      {label: "Google, DiffusionGemma: The Developer Guide, 10 juin 2026 (canevas de tokens de remplissage affinés en parallèle, les tokens les plus sûrs aidant à fixer leurs voisins ; fine-tuning sur le sudoku : environ 0 % de réussite pour le modèle de base, 80 % après fine-tuning, résolu en 12 étapes)", url: 'https://developers.googleblog.com/diffusiongemma-the-developer-guide/'},
      {label: "Google, DiffusionGemma: 4x faster text generation, 10 juin 2026 (blocs de 256 tokens générés en parallèle, attention bidirectionnelle ; plus de 1 000 tokens par seconde sur une H100 ; MoE de 26 milliards de paramètres dont 3,8 actifs ; qualité inférieure à Gemma 4 ; sudoku difficile pour les modèles autorégressifs parce que chaque token dépend des suivants ; licence Apache 2.0)", url: 'https://blog.google/innovation-and-ai/technology/developers-tools/diffusion-gemma-faster-text-generation/'},
      {label: "Sohl-Dickstein, Weiss, Maheswaranathan et Ganguli, Deep Unsupervised Learning using Nonequilibrium Thermodynamics, 12 mars 2015 (détruire la structure des données par un processus de diffusion, puis apprendre le processus inverse)", url: 'https://arxiv.org/abs/1503.03585'},
      {label: "Ho, Jain et Abbeel (UC Berkeley), Denoising Diffusion Probabilistic Models, 19 juin 2020 (synthèse d'images de haute qualité ; T = 1000 étapes dans toutes les expériences)", url: 'https://arxiv.org/abs/2006.11239'},
      {label: "Rombach et al., High-Resolution Image Synthesis with Latent Diffusion Models, 20 décembre 2021 (diffusion dans l'espace latent d'un autoencodeur plutôt que dans l'espace des pixels)", url: 'https://arxiv.org/abs/2112.10752'},
      {label: "Wikipédia, Stable Diffusion (sortie le 22 août 2022 ; poids publiés ; diffusion latente née à LMU Munich et à l'université de Heidelberg ; 860 millions de paramètres pour le U-Net et 123 millions pour l'encodeur de texte CLIP ; environ 150 000 heures de GPU A100 pour 600 000 dollars ; difficultés avec les membres humains, attribuées aux données LAION, et avec le texte lisible), consulté le 2 octobre 2026", url: 'https://en.wikipedia.org/wiki/Stable_Diffusion'},
      {label: "Esser et al. (Stability AI), Scaling Rectified Flow Transformers for High-Resolution Image Synthesis, 5 mars 2024 (Stable Diffusion 3 ; 4,7 milliards de paramètres pour T5-XXL ; T5 important pour les prompts très détaillés et le texte écrit dans l'image)", url: 'https://arxiv.org/abs/2403.03206'},
      {label: "Google DeepMind, Gemini Diffusion, consulté le 2 octobre 2026 (modèle expérimental de diffusion de texte ; 1 479 tokens par seconde hors temps de démarrage ; génère en affinant du bruit pas à pas)", url: 'https://deepmind.google/models/gemini-diffusion/'},
      {label: "Simon Willison, Gemini Diffusion, 21 mai 2025 (essai de la démo présentée à Google I/O, 857 tokens par seconde mesurés)", url: 'https://simonwillison.net/2025/May/21/gemini-diffusion/'},
      {label: "Carlini et al., Extracting Training Data from Diffusion Models, 30 janvier 2023 (plus d'un millier d'images d'entraînement extraites de modèles comme Stable Diffusion et Imagen)", url: 'https://arxiv.org/abs/2301.13188'},
    ],
  },
  {
    id: 'dpo',
    status: 'live',
    title: 'DPO',
    en: 'Direct Preference Optimization',
    aliases: ['DPO', 'direct preference optimization', 'preference optimization', 'chosen and rejected', 'preference pairs', 'KTO'],
    aliasesFr: ['optimisation directe des préférences', 'apprentissage des préférences'],
    jargon: [
      {say: 'chosen, rejected', means: "la réponse préférée et la réponse écartée d'une même paire ; c'est la seule donnée que DPO demande"},
      {say: 'reference model', means: "la copie figée du modèle d'avant DPO, à laquelle on le compare pour qu'il ne s'éloigne pas trop de ce qu'il savait faire"},
      {say: 'beta', means: "le réglage qui fixe jusqu'où le modèle peut s'écarter de cette copie ; Meta l'a mis à 0,1 pour Llama 3"},
      {say: 'KTO', means: "une variante publiée en février 2024, qui se contente d'un avis par réponse, bonne ou mauvaise, sans former de paires"},
    ],
    cat: 'entrainement',
    links: ['rlhf', 'post-entrainement', 'fine-tuning', 'reward-hacking', 'alignement', 'donnees-synthetiques'],
    short:
      "DPO est une méthode de post-entraînement qui montre au modèle des paires de réponses, l'une préférée, l'autre rejetée, et le pousse directement vers la première, sans modèle de récompense.",
    image:
      "Plus besoin de juré dans la salle. On fait écouter au groupe deux prises du même morceau, celle que le public a gardée et celle qu'il a écartée. L'ingé son tourne alors les potards pour rendre la première un peu plus probable et la seconde un peu moins, sans laisser le groupe s'éloigner de son jeu d'avant. L'image triche sur le public, qui est de plus en plus souvent un autre modèle chargé de départager les prises.",
    imagineForm: 'E',
    imagine:
      "Une version de travail d'Olmo 3, le modèle ouvert de 7 milliards de paramètres de l'institut Ai2, relit des raisonnements écrits par Qwen3 32B, plus fort que lui, avec pour consigne de les imiter. Sa moyenne sur dix tests recule de 70,3 à 64,5. Refais la séance avec les mêmes raisonnements, posés cette fois chacun à côté de celui qu'un tout petit Qwen3 de 0,6 milliard a écrit pour la même question, et une seule consigne, préférer le premier. La moyenne monte à 72,9.",
    full: [
      "En mai 2023, six chercheurs de Stanford, dont Rafael Rafailov, Archit Sharma et Eric Mitchell, publient un article au titre en forme de clin d'œil, « Your Language Model is Secretly a Reward Model ». Le RLHF classique entraînait d'abord un modèle de récompense sur les préférences humaines, puis faisait générer le modèle principal sans relâche pour le pousser, par renforcement, vers les réponses bien notées, une procédure qu'ils jugent complexe et souvent instable. Leur calcul montre qu'on peut viser le même objectif avec une seule fonction de perte calculée sur les paires, et l'article finit en décembre parmi les deux dauphins du prix du meilleur article de NeurIPS.",
      "Pour chaque paire, on regarde la probabilité que le modèle donne à la réponse préférée et à la réponse rejetée, et l'entraînement creuse l'écart en faveur de la première, en mesurant tout par rapport à une copie figée du modèle de départ pour l'empêcher de dériver. Il n'y a plus de modèle de récompense à entraîner ni de réponses à faire générer pendant l'entraînement, ce qui allège beaucoup la méthode. Pour Llama 3, en juillet 2024, Meta l'a préférée au renforcement classique, parce qu'elle demandait moins de calcul sur ses grands modèles et suivait mieux les consignes.",
      "Les paires n'ont pas besoin d'être départagées par des humains. En octobre 2023, Hugging Face a réglé Zephyr-7B sur des réponses classées par un modèle plus fort, sans aucune annotation humaine, et il dépassait sur le test MT-Bench Llama 2 Chat 70B, dix fois plus gros et réglé par RLHF. Ai2 est allé plus loin pour Olmo 3, en novembre 2025, en partant de l'idée que la valeur d'une paire tient surtout à l'écart entre ses deux réponses, d'où l'association d'un modèle fort et d'un modèle bien plus faible.",
    ],
    office: [
      {who: 'q', text: "On a 20 000 pouces levés ou baissés sur les réponses de l'assistant, ça suffit pour faire du DPO ?"},
      {who: 'a', text: "DPO veut des paires, deux réponses au même message dont l'une est préférée. Des votes isolés conviennent mieux à KTO, une variante qui se contente d'un signal bon ou mauvais par réponse et qui faisait jeu égal avec les méthodes à paires dans son article de février 2024."},
    ],
    avoid:
      "« DPO se passe des humains. » DPO se passe du modèle de récompense et du renforcement, pas des préférences ; il faut toujours quelqu'un, humain ou modèle, pour dire laquelle des deux réponses vaut mieux, et ses goûts deviennent ceux du modèle.",
    video: null,
    sources: [
      {label: "Olmo Team (Ai2), Olmo 3, 15 décembre 2025, révisé le 14 avril 2026, section 4.3 et tableau 21 (point de contrôle SFT de développement en 7B : moyenne de 70,3 sur dix tests ; SFT continué sur les réponses de Qwen3 32B Thinking : 64,5 ; DPO avec des paires Qwen3 32B préféré contre Qwen3 0,6B rejeté, dite delta learning : 72,9 ; la qualité d'une paire dépend surtout de l'écart entre ses deux réponses)", url: 'https://arxiv.org/abs/2512.13961'},
      {label: "Ai2, Olmo 3: Charting a path through the model flow to lead open-source AI, 20 novembre 2025 (recette en trois étapes : SFT, préférences par DPO, RLVR)", url: 'https://allenai.org/blog/olmo3'},
      {label: "Rafailov, Sharma, Mitchell, Ermon, Manning et Finn (Stanford), Direct Preference Optimization: Your Language Model is Secretly a Reward Model, 29 mai 2023 (le RLHF, procédure complexe et souvent instable ; une simple perte de classification ; pas d'échantillonnage pendant l'entraînement)", url: 'https://arxiv.org/abs/2305.18290'},
      {label: "NeurIPS, Announcing the NeurIPS 2023 Paper Awards, 11 décembre 2023 (DPO parmi les deux Outstanding Main Track Runner-Ups)", url: 'https://blog.neurips.cc/2023/12/11/announcing-the-neurips-2023-paper-awards/'},
      {label: "Llama Team (Meta), The Llama 3 Herd of Models, 31 juillet 2024, section 4.1.4 (DPO plutôt que PPO, qui demandait plus de calcul pour les grands modèles et faisait moins bien, notamment sur IFEval ; β = 0,1)", url: 'https://arxiv.org/abs/2407.21783'},
      {label: "Tunstall et al. (Hugging Face), Zephyr: Direct Distillation of LM Alignment, 25 octobre 2023 (DPO sur des réponses classées par un modèle professeur, sans annotation humaine ; Zephyr-7B dépasse Llama2-Chat-70B sur MT-Bench)", url: 'https://arxiv.org/abs/2310.16944'},
      {label: "Ethayarajh et al., KTO: Model Alignment as Prospect Theoretic Optimization, 2 février 2024 (un simple signal binaire, réponse souhaitable ou non ; égale ou dépasse les méthodes à préférences de 1 à 30 milliards de paramètres)", url: 'https://arxiv.org/abs/2402.01306'},
    ],
  },
  {
    id: 'donnees-synthetiques',
    status: 'live',
    title: 'Données synthétiques',
    en: 'Synthetic data',
    aliases: ['synthetic data', 'synthetic dataset', 'synthetic pretraining', 'rephrasing', 'self-instruct', 'data amplification'],
    aliasesFr: ['données générées', 'données artificielles', 'corpus synthétique'],
    jargon: [
      {say: 'seed', means: "la graine, le texte ou le problème réel dont on part pour générer des variantes ; chez Pleias, des articles de Wikipédia"},
      {say: 'rephrasing', means: "la réécriture d'un texte existant par un modèle sous une autre forme, question, résumé ou exercice, pour multiplier les façons d'apprendre la même information"},
      {say: 'self-instruct', means: "la méthode publiée en décembre 2022 où un modèle invente des consignes et leurs réponses, qu'on filtre avant de l'entraîner dessus"},
      {say: 'verifier', means: "le programme qui contrôle une donnée générée, par exemple en refaisant la démonstration ou en exécutant le code, avant de la garder"},
    ],
    cat: 'entrainement',
    links: ['donnees-d-entrainement', 'distillation', 'post-entrainement', 'pre-entrainement', 'dpo', 'dead-internet'],
    short:
      "Les données synthétiques sont des textes, images ou exercices fabriqués par un modèle ou un programme pour en entraîner un autre, en plus ou à la place de données humaines.",
    image:
      "Les bacs de disques ne suffisent plus, alors l'ingé son demande aux groupes du studio d'enregistrer des maquettes exprès pour les leçons, le même standard en dix tempos, des gammes, des questions et réponses entre deux instruments. Le groupe en formation apprend sur ces maquettes autant que sur les vrais disques. L'image triche sur l'origine, car la meilleure maquette part souvent d'un vrai disque qu'elle réarrange au lieu de l'inventer.",
    imagineForm: 'A',
    imagine:
      "La start-up française Pleias est partie de 58 698 articles de Wikipédia et les a fait réécrire par des modèles, au moins cent fois chacun, en questions, exercices, résumés et petits raisonnements. Il en est sorti plus de 41 milliards de mots. Lus jour et nuit, sans une pause, à la vitesse moyenne d'un adulte devant un essai, ils l'occuperaient plus de 327 ans, et Baguettotron, le modèle de 321 millions de paramètres entraîné dessus, a lu l'équivalent du corpus plus de deux fois et demie.",
    full: [
      "En mars 2023, les modèles qui suivent des consignes sont tous fermés, et une équipe de Stanford veut en étudier un. Elle fait écrire par text-davinci-003, un modèle d'OpenAI, 52 000 consignes avec leurs réponses, pour moins de 500 dollars d'API, puis règle dessus le LLaMA 7B de Meta en trois heures. Dans ses comparaisons à l'aveugle, ce modèle baptisé Alpaca l'emporte 90 fois contre 89 face à son professeur. Il reste réservé à la recherche, en partie parce que les conditions d'utilisation d'OpenAI interdisent de se servir de ses sorties pour développer un modèle concurrent.",
      "La génération sert surtout là où les textes humains manquent ou se vérifient mal, comme les raisonnements écrits étape par étape, que le web contient peu. Elle donne ses meilleurs résultats quand un programme peut contrôler chaque exemple. En janvier 2024, Google DeepMind a entraîné AlphaGeometry sur 100 millions de problèmes de géométrie et de démonstrations fabriqués par un moteur de déduction, sans démonstration humaine, et le système résolvait 25 problèmes d'olympiade sur 30, presque la moyenne d'un médaillé d'or.",
      "Le risque connu est la boucle, où des modèles apprennent génération après génération sur ce qu'écrivent les modèles précédents et s'appauvrissent, ce que raconte la fiche Données d'entraînement. En avril 2024, une équipe de Stanford a montré que la dégradation disparaît quand les données synthétiques s'ajoutent aux données réelles au lieu de les remplacer. Pleias part elle aussi de vrais textes, et ses auteurs attribuent la précision factuelle de leurs modèles à ces articles d'origine, que la génération reformule sans les inventer.",
    ],
    then:
      "En juin 2024, NVIDIA indiquait que plus de 98 % des données ayant servi au réglage de son Nemotron-4 340B avaient été générées, le pré-entraînement restant fait de textes humains. En novembre 2025, Pleias publiait SYNTH, un corpus entièrement synthétique qui fond le pré-entraînement et le réglage en une seule étape, et son article de septembre 2026 trouve qu'à calcul égal, il fait mieux que des données web filtrées.",
    office: [
      {who: 'q', text: "On génère 10 000 faux échanges clients avec un LLM pour entraîner notre classifieur ?"},
      {who: 'a', text: "Pour démarrer, oui, à condition de garder pour l'évaluation un lot de vrais échanges que le générateur n'a jamais vus, et de lire les conditions d'utilisation du modèle générateur, dont certaines interdisent d'entraîner un modèle concurrent."},
    ],
    avoid:
      "« Synthétique veut dire inventé. » Les données synthétiques les plus utiles partent d'un texte réel ou d'un problème dont un programme vérifie la solution ; le modèle les reformule et les décline, et c'est ce point d'appui qui les sépare du bruit.",
    video: null,
    sources: [
      {label: "Pleias, fiche du jeu de données SYNTH sur Hugging Face, mise en ligne le 10 novembre 2025 (79 648 272 textes, plus de 41 milliards de mots, environ 75 milliards de tokens ; 58 698 articles de Wikipédia amplifiés au moins 100 fois ; publié avec l'AI Alliance), consultée le 2 octobre 2026", url: 'https://huggingface.co/datasets/PleIAs/SYNTH'},
      {label: "Pleias, fiche de Baguettotron sur Hugging Face, mise en ligne le 10 novembre 2025 (321 millions de paramètres, entraîné sur 200 milliards de tokens de SYNTH ; nom choisi en clin d'œil à ses origines françaises), consultée le 2 octobre 2026. Calcul : 200 / 75 = 2,67 lectures du corpus", url: 'https://huggingface.co/PleIAs/Baguettotron'},
      {label: "Brysbaert, How many words do we read per minute? A review and meta-analysis of reading rate, Journal of Memory and Language, 2019 (238 mots par minute en lecture silencieuse d'un texte non romanesque en anglais). Calcul de l'Imagine : 41 × 10^9 / 238 = 172,3 millions de minutes, soit 2,87 millions d'heures, ou 327,5 ans de lecture continue", url: 'https://gwern.net/doc/psychology/linguistics/2019-brysbaert.pdf'},
      {label: "Langlais et al. (Pleias), It's All Training: A Fully Synthetic Single-Stage Recipe for LLMs, 29 septembre 2026 (SYNTH fond pré-, mid- et post-training en une étape ; à calcul égal, meilleur que des données web filtrées ; précision factuelle attribuée aux passages d'origine ; les données web contiennent peu de raisonnement explicite)", url: 'https://arxiv.org/abs/2609.37891'},
      {label: "Taori et al. (Stanford CRFM), Alpaca: A Strong, Replicable Instruction-Following Model, 13 mars 2023 (52 000 démonstrations générées par text-davinci-003 pour moins de 500 dollars ; LLaMA 7B réglé en 3 heures sur 8 A100 ; 90 victoires contre 89 ; usage non commercial, notamment à cause des conditions d'OpenAI)", url: 'https://crfm.stanford.edu/2023/03/13/alpaca.html'},
      {label: "Wang et al., Self-Instruct: Aligning Language Models with Self-Generated Instructions, 20 décembre 2022", url: 'https://arxiv.org/abs/2212.10560'},
      {label: "Google DeepMind, AlphaGeometry: An Olympiad-level AI system for geometry, 17 janvier 2024 (100 millions d'exemples synthétiques produits par déduction symbolique ; 25 problèmes résolus sur 30, contre 25,9 en moyenne pour un médaillé d'or)", url: 'https://deepmind.google/discover/blog/alphageometry-an-olympiad-level-ai-system-for-geometry/'},
      {label: "Gerstgrasser et al. (Stanford), Is Model Collapse Inevitable? Breaking the Curse of Recursion by Accumulating Real and Synthetic Data, 1er avril 2024 (remplacer les données réelles mène à l'effondrement, les accumuler avec les synthétiques l'évite)", url: 'https://arxiv.org/abs/2404.01413'},
      {label: "NVIDIA, Nemotron-4 340B Technical Report, 17 juin 2024 (plus de 98 % des données du processus d'alignement générées synthétiquement)", url: 'https://arxiv.org/abs/2406.11704'},
    ],
  },
];

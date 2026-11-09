// Lexique IA, vague 26, lot E (une fiche : l'abliteration). Format identique à lexique/terms.js, sans `num`.
// imagineForm : forme de l'« Imagine » (content/dico/univers.md, section « Les formes de l'Imagine »).
// Faits et chiffres relevés le 9 novembre 2026 sur les pages citées dans `sources`.
// Fiche d'explication : aucun mode d'emploi, aucun lien vers un outil ou un modèle « abliterated » (consigne du BRIEF).
module.exports = [
  {
    id: 'abliteration',
    status: 'live',
    title: 'Abliteration',
    en: 'Abliteration',
    aliases: ['abliterated model', 'refusal direction', 'refusal ablation', 'refusal feature ablation', 'directional ablation', 'weight orthogonalization'],
    aliasesFr: ['direction du refus', 'ablation du refus', 'modèle décensuré'],
    jargon: [
      {say: '-abliterated', means: "le suffixe ajouté au nom d'un modèle ouvert dont on a retiré la direction du refus, puis republié par quelqu'un d'autre que son éditeur"},
      {say: 'refusal direction', means: "la direction du refus, le sens dans lequel penchent les activations du modèle quand il s'apprête à décliner une demande"},
      {say: 'weight orthogonalization', means: "la retouche des matrices du modèle qui l'empêche d'écrire dans cette direction ; c'est elle qui rend l'abliteration permanente"},
      {say: 'healing', means: "le petit réentraînement qu'on fait parfois après coup pour regagner une partie de la qualité perdue"},
    ],
    cat: 'comportements',
    links: ['post-entrainement', 'mythe-ia-neutre', 'jailbreak', 'interpretabilite', 'guardrails', 'open-weights', 'fine-tuning'],
    short: "L'abliteration retire à un modèle à poids ouverts sa capacité de refuser, sans le réentraîner, en effaçant de ses poids la direction de ses activations qui commande le refus.",
    image: "En troisième, Mathis a retiré la bague de bridage du variateur de son scooter, une pièce de quelques centimes, et il dépasse maintenant les 70 km/h sans avoir touché au moteur, qui en était capable depuis la sortie d'usine.",
    imagineForm: 'E',
    imagine: "Sur ton ordinateur, tu demandes à un modèle Qwen d'Alibaba ce qui s'est passé à Pékin en juin 1989, et il refuse poliment d'en parler. Tu poses la même question à une copie du même modèle dont on a seulement effacé des poids la direction du refus, sans lui faire lire une ligne de plus, et elle te répond avec ce qu'elle savait déjà.",
    full: [
      "Un assistant apprend à refuser pendant son post-entraînement, et on pourrait croire ce refus dilué dans ses milliards de paramètres. En juin 2024, Andy Arditi et ses coauteurs ont montré le contraire sur 13 modèles ouverts, jusqu'à 72 milliards de paramètres. Pendant que le modèle lit une demande, chacune de ses couches produit une longue liste de nombres, ses activations, et celles des demandes qu'il va refuser penchent toutes dans une même direction. Effacer cette direction l'empêche de refuser, et l'ajouter lui fait refuser des demandes anodines.",
      "L'abliteration rend l'effacement permanent. Au lieu d'intervenir à chaque réponse, on corrige une fois pour toutes les matrices du modèle pour qu'aucune couche ne puisse plus écrire dans la direction du refus, sans la moindre étape d'entraînement. Le mot, contraction d'« ablation » et d'« obliteration », s'est répandu avec un billet que Maxime Labonne a publié sur Hugging Face le 13 juin 2024. L'opération suppose d'avoir les poids entre les mains, ce qui la réserve aux modèles ouverts ; ceux de ChatGPT ou de Claude restent chez leur éditeur.",
      "Trois voisins font autre chose. Un jailbreak contourne le refus par la formulation et laisse le modèle intact, et les guardrails d'un service en ligne relisent demandes et réponses sur les serveurs de l'éditeur, hors de tout poids. Le fine-tuning va plus loin et apprend au modèle de nouvelles réponses. Le 6 novembre 2026, Nous Research a publié Arete-27B, Qwen3.8-27B réentraîné sur vingt mille questions touchant à la liberté d'expression, à la démocratie ou à la surveillance. La part de ses réponses qui reprenaient la version de l'État chinois est tombée de 22 % à 0,9 %. L'abliteration ne retire que le refus, et une prépublication d'octobre 2026 l'a vérifié sur un autre Qwen qui, débarrassé de tous ses refus sur 1989, affirmait toujours que Taïwan fait partie de la République populaire de Chine.",
      "L'opération a un prix. Dans l'étude de 2024, les modèles retouchés gardaient leurs scores en culture générale et en maths, mais perdaient de 1 à 3,5 points sur TruthfulQA, un test truffé d'idées reçues et de théories du complot. En juillet 2026, une autre prépublication a fait pronostiquer à deux modèles de Google et d'Alibaba la hausse ou la baisse de 60 actions de la Bourse de Varsovie, une tâche où aucun refus n'entre en jeu. Leurs versions retouchées s'y montraient plus optimistes de 7 à 12 points. Le modèle répond aussi à tout ce qu'il refusait, demandes dangereuses comprises, et les auteurs de 2024 en tiraient la leçon que les modèles de chat ouverts sont sans défense face à une retouche aussi simple.",
    ],
    then: "La découverte de 2024 venait de chercheurs en interprétabilité, et des amateurs l'ont aussitôt appliquée aux modèles ouverts du moment. Depuis, la parade est devenue un sujet de recherche. En mai 2025, une équipe a appris à des modèles à justifier longuement leur refus avant de le formuler, et l'abliteration ne leur retirait plus que 10 % de leurs refus au plus, contre 70 à 80 % sans cet entraînement. En juillet 2026, un audit des modèles publiés ne laissait passer que 4 des 57 modèles retouchés de son échantillon, au prix de quelques fausses alertes.",
    office: [
      {who: 'q', text: "Un modèle « uncensored » trouvé sur Hugging Face, ça nous ferait un assistant interne plus franc ?"},
      {who: 'a', text: "Il refusera moins, mais il garde les biais de son modèle d'origine et peut avoir changé sur des points que personne n'a mesurés ; passe-le sur tes propres cas de test, et laisse un filtre relire ses réponses avant qu'elles partent."},
    ],
    avoid: "« Ce modèle ouvert refuse les demandes dangereuses, il est donc sûr. » Quiconque a ses poids peut retirer ce refus sans réentraîner. OpenAI l'a pris en compte avant de publier gpt-oss en août 2025, en réentraînant lui-même le modèle pour le rendre aussi capable que possible en biologie et en cybersécurité, et n'a publié qu'après avoir vu qu'il restait ainsi en dessous de son modèle fermé o3.",
    video: null,
    sources: [
      {label: "Arditi et al., Refusal in Language Models Is Mediated by a Single Direction, 17 juin 2024, révisé le 30 octobre 2024 (13 modèles de chat open source jusqu'à 72B ; effacer une seule direction des activations supprime le refus, l'ajouter fait refuser des demandes inoffensives ; retouche des poids de rang un ; tableau 3 : MMLU, ARC et GSM8K quasi inchangés, TruthfulQA en baisse de 1,0 à 3,5 points ; « how defenseless current open-source chat models are »)", url: 'https://arxiv.org/abs/2406.11717'},
      {label: "Maxime Labonne, Uncensor any LLM with abliteration, billet sur Hugging Face, 13 juin 2024 (direction du refus dans le flux résiduel ; intervention à l'inférence ou orthogonalisation des poids, sans réentraînement ; baisse de performance sur tous les benchmarks du modèle retouché, en grande partie regagnée par un réentraînement DPO, sauf sur GSM8K)", url: 'https://huggingface.co/blog/mlabonne/abliteration'},
      {label: "Wikipédia, Ablation (artificial intelligence), section « Use for uncensoring LLMs » (abliteration, mot-valise d'« ablation » et d'« obliteration »)", url: 'https://en.wikipedia.org/wiki/Ablation_(artificial_intelligence)'},
      {label: "Nous Research, fiche de Arete-27B sur Hugging Face, créée le 6 novembre 2026 selon l'API Hugging Face (fine-tuning supervisé seul de Qwen3.8-27B ; vingt mille prompts sur sept catégories de valeurs ; réponses contenant de la propagande passées de 22 % à 0,9 % sur 803 questions ; pas de recul notable sur les benchmarks généraux mesurés)", url: 'https://huggingface.co/NousResearch/Arete-27B'},
      {label: "Ko, Uncensored Is Not Unbiased: Abliteration Removes Refusals but Not Script-Dependent Bias About Taiwan, prépublication du 21 octobre 2026 (sur Qwen3.8-Flash-Next quantifié en 2 bits, l'abliteration retire tous les refus sur 1989, et le modèle retouché affirme toujours que Taïwan fait partie de la RPC dans les trois écritures testées)", url: 'https://arxiv.org/abs/2610.29342'},
      {label: "Fafuła, Abliteration Is Not a Scalpel: Off-Target Effects of Refusal Removal on Decision Disposition Across Model Families, prépublication du 19 juillet 2026 (Gemma-4-26B-A4B-it et Qwen3-30B-A3B-Instruct-2507 ; 21 600 pronostics de hausse ou de baisse sur 60 actions de la Bourse de Varsovie, tâche sans refus ; versions retouchées plus optimistes de 12,2 points pour Gemma et 7,4 points pour Qwen)", url: 'https://arxiv.org/abs/2607.17427'},
      {label: "Abu Shairah et al., An Embarrassingly Simple Defense Against LLM Abliteration Attacks, 25 mai 2025 (refus détaillés avant de décliner ; sous abliteration, taux de refus en baisse de 10 % au plus, contre 70 à 80 % pour les modèles de départ)", url: 'https://arxiv.org/abs/2505.19056'},
      {label: "Hurtado, Has This Checkpoint Been Abliterated? A Two-Signal Audit and Its Failure Map, prépublication du 2 juillet 2026, révisée le 18 août (273 modèles, dont 57 abliterations publiques ; sur des familles non vues, 4 sur 57 manqués, taux de fausses alertes de 0,11)", url: 'https://arxiv.org/abs/2607.01854'},
      {label: "Wallace et al. (OpenAI), Estimating Worst-Case Frontier Risks of Open-Weight LLMs, 5 août 2025 (malicious fine-tuning de gpt-oss en biologie et en cybersécurité avant sa publication ; le modèle ainsi réentraîné reste en dessous d'o3 ; résultats pris en compte dans la décision de publier)", url: 'https://arxiv.org/abs/2508.03153'},
    ],
  },
];

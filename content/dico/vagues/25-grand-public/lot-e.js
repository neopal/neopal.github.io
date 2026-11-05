// Lexique IA, vague 25, lot E (une fiche : l'AI Act). Format identique à lexique/terms.js, sans `num`.
// imagineForm : forme de l'« Imagine » (content/dico/univers.md, section « Les formes de l'Imagine »).
// Faits et chiffres relevés le 5 novembre 2026 sur les pages citées dans `sources`.
// Calendrier : tout ce qui est daté ici est adopté (règlement 2024/1689 modifié par le règlement omnibus 2026/1744, en vigueur le 27 juillet 2026).
module.exports = [
  {
    id: 'ai-act',
    status: 'live',
    title: "AI Act (règlement européen sur l'IA)",
    en: 'AI Act',
    aliases: ['EU AI Act', 'Artificial Intelligence Act', 'Regulation (EU) 2024/1689', 'AI Omnibus', 'Digital Omnibus on AI'],
    aliasesFr: ["règlement européen sur l'IA", "règlement sur l'intelligence artificielle", 'RIA', "loi européenne sur l'IA", 'omnibus numérique'],
    jargon: [
      {say: 'pratiques interdites', means: "la liste de l'article 5, ce qu'aucune entreprise n'a le droit de vendre ni d'utiliser dans l'Union, comme la notation sociale, depuis le 2 février 2025"},
      {say: 'annexe III', means: "la liste des usages classés à haut risque : biométrie, infrastructures critiques, éducation, emploi, accès au crédit et aux services essentiels, police, migrations, justice"},
      {say: "l'omnibus", means: "le règlement (UE) 2026/1744, qui a modifié l'AI Act en juillet 2026 et repoussé les obligations du haut risque"},
      {say: 'AI Office', means: "le Bureau de l'IA de la Commission européenne, qui contrôle les modèles d'usage général et peut leur infliger des amendes"},
    ],
    graphLabel: 'AI Act',
    cat: 'ecosysteme',
    links: ['responsabilite', 'evaluations-de-dangerosite', 'open-weights', 'labs', 'clonage-de-voix', 'shadow-ai'],
    short: "L'AI Act est le règlement européen sur l'intelligence artificielle, qui interdit certains usages, encadre ceux à haut risque et impose de la transparence, avec des obligations applicables par étapes.",
    image: "À la piscine municipale, le nouveau règlement arrive en trois fois : le saut depuis le toit est interdit tout de suite, le bonnet devient obligatoire à la rentrée, et le grand toboggan attendra l'an prochain, faute de maîtres-nageurs formés pour le surveiller. En attendant, le toboggan reste ouvert.",
    imagineForm: 'A',
    imagine: "Prends tout ce qu'une multinationale encaisse dans le monde entier du 1er janvier à minuit au 26 janvier vers 13 heures. Ces 25 jours et demi font 7 % de son année, et c'est le plafond de l'amende que l'AI Act prévoit pour une pratique interdite, ou 35 millions d'euros si ce montant est plus élevé. Chez Alphabet, la maison mère de Google, qui a facturé 402,8 milliards de dollars en 2025, ces trois semaines et demie pèsent environ 28 milliards.",
    full: [
      "Le règlement (UE) 2024/1689, entré en vigueur le 1er août 2024, s'applique tel quel dans les vingt-sept pays de l'Union et range les systèmes d'IA selon leur risque. Depuis le 2 février 2025, il interdit par exemple la notation sociale et la détection des émotions au travail ou à l'école, sauf pour des raisons médicales ou de sécurité. Les fournisseurs de modèles d'usage général ont leurs propres obligations depuis le 2 août 2025. Depuis le 2 août 2026, un chatbot doit dire qu'il est une machine quand ce n'est pas évident, et un deepfake doit être signalé comme tel.",
      "Le calendrier a été disputé. Le 3 juillet 2025, une cinquantaine de dirigeants européens, de Mistral à TotalEnergies, demandaient une pause d'au moins deux ans ; un porte-parole de la Commission leur répondait le lendemain « Il n'y a pas de pause. Il n'y a pas de période de grâce, de répit ». Le 18 juillet, Meta refusait de signer le code de bonne pratique des modèles d'usage général, jugeant que « l'Europe fait fausse route sur l'IA ». Le 19 novembre 2025, la même Commission proposait pourtant un report, devenu le règlement omnibus 2026/1744, en vigueur depuis le 27 juillet 2026.",
      "En novembre 2026, ce calendrier est adopté et ne relève plus de la proposition. Les obligations des systèmes à haut risque de l'annexe III, comme ceux qui notent ta solvabilité pour un crédit, passent du 2 août 2026 au 2 décembre 2027 ; celles des produits déjà réglementés, jouets, machines ou dispositifs médicaux, passent au 2 août 2028. Le même texte ajoute une interdiction, à partir du 2 décembre 2026, des systèmes qui fabriquent des images intimes d'une personne identifiable sans son accord. Les autres échéances n'ont pas bougé, à un délai de quatre mois près pour le marquage des contenus produits par les générateurs déjà en vente.",
    ],
    then: "En 2024, le texte publié au Journal officiel faisait tomber le 2 août 2026 les obligations des systèmes à haut risque comme le crédit ou l'éducation. En 2026, après le règlement omnibus, elles arrivent le 2 décembre 2027, seize mois plus tard, et l'Union a ajouté entre-temps l'interdiction des applications qui déshabillent les gens sur une photo.",
    office: [
      {who: 'q', text: "On a mis un chatbot sur notre site de prêt immobilier, l'AI Act nous concerne déjà ?"},
      {who: 'a', text: "Depuis le 2 août 2026, il doit déjà faire savoir à tes visiteurs qu'ils parlent à une machine. S'il se met à évaluer la solvabilité des emprunteurs, il entre dans le haut risque, dont les obligations s'appliquent à partir du 2 décembre 2027."},
    ],
    avoid: "« L'AI Act a été repoussé. » Seul le haut risque a glissé, alors que les interdictions s'appliquent depuis février 2025, les règles des modèles d'usage général depuis août 2025 et l'obligation de signaler les deepfakes depuis août 2026. Un manquement à cette transparence coûte jusqu'à 15 millions d'euros ou 3 % du chiffre d'affaires mondial.",
    video: null,
    sources: [
      {label: "Commission européenne, AI Act, page Regulatory framework for AI, mise à jour le 19 octobre 2026 (règlement (UE) 2024/1689 ; entré en vigueur le 1er août 2024, applicable le 2 août 2026 avec des exceptions ; interdictions au 2 février 2025, modèles d'usage général au 2 août 2025 ; quatre niveaux de risque ; omnibus sur l'IA adopté par la Commission le 19 novembre 2025, accord politique le 7 mai 2026, en vigueur le 27 juillet 2026 ; haut risque au 2 décembre 2027 pour l'annexe III et au 2 août 2028 pour l'annexe I ; interdiction des applications de « nudification » en décembre 2026 ; deepfakes étiquetés et règles de transparence en août 2026)", url: 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai'},
      {label: "AI Act, article 5, version consolidée (point c, notation sociale ; point f, inférer les émotions sur le lieu de travail et dans les établissements d'enseignement, sauf raisons médicales ou de sécurité ; point ba ajouté par l'omnibus, images intimes réalistes d'une personne identifiable sans son consentement)", url: 'https://artificialintelligenceact.eu/article/5/'},
      {label: "AI Act, article 50 (paragraphe 1 : informer les personnes qu'elles interagissent avec un système d'IA, sauf si c'est évident ; paragraphe 4 : le déployeur d'un deepfake indique que le contenu a été généré ou manipulé, obligation allégée pour une œuvre manifestement artistique, satirique ou de fiction)", url: 'https://artificialintelligenceact.eu/article/50/'},
      {label: "AI Act, article 99 (paragraphe 3 : pratiques interdites, jusqu'à 35 millions d'euros ou 7 % du chiffre d'affaires mondial annuel de l'exercice précédent, le plus élevé des deux ; paragraphe 4 : 15 millions ou 3 %, dont l'article 50 ; paragraphe 6 : pour les PME, le plus bas des deux)", url: 'https://artificialintelligenceact.eu/article/99/'},
      {label: "AI Act, article 113, version modifiée par l'omnibus (chapitres I et II au 2 février 2025, nouvelles interdictions au 2 décembre 2026 ; chapitre V au 2 août 2025 ; haut risque de l'article 6, paragraphe 2, et de l'annexe III au 2 décembre 2027, de l'article 6, paragraphe 1, et de l'annexe I au 2 août 2028)", url: 'https://artificialintelligenceact.eu/article/113/'},
      {label: "AI Act, annexe III (huit domaines à haut risque ; point 5 b, évaluer la solvabilité des personnes physiques ou établir leur score de crédit, hors détection de fraude)", url: 'https://artificialintelligenceact.eu/annex/3/'},
      {label: "AI Act Explorer, Digital Omnibus on AI, règlement (UE) 2026/1744 du 8 juillet 2026 (position du Parlement européen du 16 juin 2026, décision du Conseil du 29 juin 2026 ; entrée en vigueur le 27 juillet 2026 ; délai jusqu'au 2 décembre 2026 pour le marquage des contenus des systèmes génératifs mis sur le marché avant le 2 août 2026)", url: 'https://artificialintelligenceact.eu/ai-act-explorer/digital-omnibus/'},
      {label: "K&L Gates, EU Digital Omnibus on AI Enters Into Force, National Law Review, 31 juillet 2026 (publication au Journal officiel le 24 juillet 2026, entrée en vigueur le 27 juillet ; obligations des modèles d'usage général et transparence au 2 août 2026 maintenues)", url: 'https://natlawreview.com/article/eu-digital-omnibus-ai-enters-force'},
      {label: "Next, Règlement sur l'IA : le monde économique demande un report, Bruxelles tient bon, 7 juillet 2025 (lettre d'une cinquantaine de dirigeants envoyée le jeudi, dont Mistral, TotalEnergies, BNP Paribas, Mercedes-Benz ; pause d'au moins deux ans demandée ; porte-parole de la Commission, vendredi : « Il n'y a pas de pause. Il n'y a pas de période de grâce, de répit »)", url: 'https://next.ink/191202/reglement-sur-lia-le-monde-economique-demande-un-report-bruxelles-tient-bon/'},
      {label: "TechCrunch, Meta refuses to sign EU's AI code of practice, 18 juillet 2025 (Joel Kaplan, responsable des affaires publiques de Meta : « Europe is heading down the wrong path on AI »), citation traduite", url: 'https://techcrunch.com/2025/07/18/meta-refuses-to-sign-eus-ai-code-of-practice/'},
      {label: "Alphabet, Announces Fourth Quarter and Fiscal Year 2025 Results, 4 février 2026, pièce 99.1 déposée à la SEC (chiffre d'affaires 2025 : 402 836 millions de dollars). Calcul : 7 % × 402,836 = 28,2 milliards de dollars ; 7 % × 365 jours = 25,55 jours, soit du 1er janvier à minuit au 26 janvier vers 13 heures", url: 'https://www.sec.gov/Archives/edgar/data/1652044/000165204426000012/googexhibit991q42025.htm'},
    ],
  },
];

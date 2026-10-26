module.exports = [
  {
    id: 'ai-brain-fry',
    status: 'live',
    title: 'AI brain fry',
    en: 'AI brain fry',
    aliases: ['brain fry'],
    aliasesFr: ['cerveau grillé', 'surcharge cognitive'],
    jargon: [
      {say: 'meta-work', means: "le travail sur le travail des agents, les préparer, leur écrire des plans, vérifier ce qu'ils ont rendu"},
      {say: 'context switching', means: "le passage d'une tâche à une autre, qui oblige à chaque fois à retrouver où on en était"}
    ],
    cat: 'methode',
    links: ['agent', 'multi-agents', 'human-in-the-loop', 'harness', 'mythe-agent-autonome'],
    short: "L'AI brain fry est la fatigue mentale qui vient d'un usage intensif de l'IA, surtout quand il faut surveiller plusieurs outils ou agents à la fois.",
    image: "Fabrice, maître-nageur à la piscine municipale, surveille quatre bassins depuis qu'on a supprimé le poste de son collègue. Il n'a pas mis un pied dans l'eau de la journée, et il rentre plus rincé que le club de natation.",
    imagineForm: 'B',
    imagine: "Chronomètre-toi en récitant 1, 2, 3 jusqu'à 10, puis A, B, C jusqu'à J. Recommence en mélangeant les deux listes, 1, A, 2, B, jusqu'à 10, J. Les vingt réponses sont les mêmes, et le chrono s'allonge quand même.",
    full: [
      "L'expression apparaît le 5 mars 2026 dans la Harvard Business Review, sous la plume de chercheurs du Boston Consulting Group, à partir d'une enquête auprès de 1 488 salariés américains de grandes entreprises. Ils y décrivent une fatigue mentale due à l'usage ou à la surveillance d'outils d'IA au-delà de ce que l'attention peut suivre, avec un bourdonnement dans la tête, du brouillard et des décisions qui ralentissent. Parmi les utilisateurs d'IA interrogés, 14 % disaient l'avoir ressentie.",
      "D'après l'enquête, c'est la surveillance directe des agents qui pèse le plus. La productivité ressentie plafonne à trois outils d'IA utilisés en même temps et redescend au-delà de quatre, et ceux qui souffrent de brain fry déclarent 39 % d'erreurs graves en plus. À l'inverse, ceux qui confient à l'IA leurs tâches répétitives rapportent un épuisement professionnel plus faible de 15 %, et les auteurs séparent ainsi le brain fry, une fatigue de l'attention, du burn-out, un épuisement émotionnel. Les chiffres sont déclaratifs, et le BCG vend lui-même des missions de transformation par l'IA. Ses auteurs conseillent de plafonner le nombre d'agents qu'une personne pilote en même temps, et de ne plus juger la productivité à l'intensité d'usage de l'IA.",
      "Le 16 octobre 2026, Anthropic a publié ce que ses agents changent au travail de ses propres salariés. En août, les agents que pilotent ses salariés ont travaillé six fois plus d'heures qu'eux, en comptant 40 heures par semaine et par personne, et pourtant près de 80 % du temps de ces sessions passe à attendre une réponse humaine. La page ne parle pas de fatigue, mais elle décrit l'attention humaine comme le goulot permanent du système, et un ingénieur y raconte « une armée de Claude, qui réclament tous mon attention »."
    ],
    then: "Il y a deux ans, on se demandait surtout quelles tâches l'IA allait faire à ta place. En 2026, une partie du travail est devenue la surveillance de l'IA elle-même ; chez Anthropic, la part des sessions interactives consacrée à organiser et vérifier les agents, le meta-work, est passée de 10 % à l'automne 2025 à 22 % au printemps 2026.",
    office: [
      {who: 'q', text: "Je lance cinq agents en parallèle dans Claude Code, je n'ai jamais été aussi productif, non ?"},
      {who: 'a', text: "À cinq, l'enquête du BCG dit plutôt l'inverse, car la productivité ressentie y plafonne à trois outils d'IA utilisés en même temps et redescend au-delà de quatre. Gardes-en moins en vol, et relis leur travail à heures fixes plutôt qu'à chaque notification."}
    ],
    avoid: "« L'IA me fait gagner du temps, donc je peux prendre deux dossiers de plus. » Une partie du temps gagné repart en surveillance ; compte celui que tu passes à relire et à décider avant de remplir l'agenda.",
    video: null,
    sources: [
      {label: "Bedard, Kropp, Hsu, Karaman, Hawes et Kellerman (BCG), When Using AI Leads to « Brain Fry », Harvard Business Review, 5 mars 2026 (certains usages de l'IA liés à une fatigue cognitive, d'autres à moins d'épuisement professionnel)", url: 'https://hbr.org/2026/03/when-using-ai-leads-to-brain-fry'},
      {label: "BCG, When Using AI Leads to « Brain Fry », 5 mars 2026 (enquête auprès de 1 488 salariés américains de grandes entreprises ; fatigue mentale due à l'usage intensif ou à la surveillance constante d'outils d'IA ; plus d'erreurs, de surcharge de décision et d'envie de démissionner)", url: 'https://www.bcg.com/news/5march2026-when-using-ai-leads-brain-fry'},
      {label: "The Decoder, Study warns of « AI Brain Fry » as workers hit cognitive limits overseeing AI agents, 9 mars 2026 (14 % des utilisateurs d'IA concernés ; bourdonnement, brouillard, décisions plus lentes ; productivité ressentie qui plafonne à trois outils et baisse au-delà de quatre ; 39 % d'erreurs graves en plus ; épuisement plus faible de 15 % quand l'IA remplace les tâches répétitives ; données déclaratives ; conseils de plafonner les agents simultanés et de découpler la productivité de l'intensité d'usage)", url: 'https://the-decoder.com/study-warns-of-ai-brain-fry-as-workers-hit-cognitive-limits-overseeing-ai-agents/'},
      {label: "Anthropic, How employment is changing at Anthropic, 16 octobre 2026 (heures d'agents interactifs six fois plus nombreuses que les heures des salariés en août, heures humaines estimées à 40 h par semaine ; environ 80 % du temps de session à attendre une réponse humaine ; l'attention humaine, goulot permanent ; un ingénieur face à « an army of Claudes, with every one asking for my attention » ; meta-work passé de 10 % des sessions à l'automne 2025 à 22 % au printemps 2026)", url: 'https://www.anthropic.com/research/employment-at-anthropic'}
    ]
  }
];

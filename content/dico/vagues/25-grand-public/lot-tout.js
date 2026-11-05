// Vague 25, les cinq lots réunis pour le contrôle et la fusion.
module.exports = [
  {
    "id": "mythe-bouteille-d-eau",
    "status": "live",
    "title": "« Une question à ChatGPT, c'est une bouteille d'eau »",
    "en": "Myth: one ChatGPT question uses a bottle of water",
    "aliases": [
      "AI water footprint",
      "AI water use",
      "ChatGPT water use",
      "bottle of water per email"
    ],
    "aliasesFr": [
      "bouteille d'eau",
      "empreinte eau de l'IA",
      "consommation d'eau de l'IA",
      "eau de ChatGPT"
    ],
    "jargon": [
      {
        "say": "WUE",
        "means": "water usage effectiveness, les litres d'eau qu'un centre de données consomme par kilowattheure ; il ne compte que l'eau du site, pas celle des centrales électriques"
      },
      {
        "say": "scope 2",
        "means": "dans un bilan, la part due à la production de l'électricité achetée ; pour l'eau, c'est celle qu'évaporent les centrales qui alimentent les serveurs"
      },
      {
        "say": "withdrawal vs consumption",
        "means": "l'eau prélevée, qui retourne en partie à la rivière, contre l'eau consommée, évaporée et perdue pour les usages locaux ; les chiffres sérieux disent lequel des deux ils comptent"
      },
      {
        "say": "ACV",
        "means": "analyse de cycle de vie : un bilan qui compte aussi la fabrication du matériel, pas seulement son fonctionnement"
      }
    ],
    "graphLabel": "Mythe : bouteille d'eau",
    "cat": "mythes",
    "links": [
      "cout-d-une-requete",
      "compute",
      "gpu",
      "paradoxe-de-jevons",
      "mythe-ia-locale"
    ],
    "short": "Selon ce qu'on compte, une question texte à un chatbot consomme de quelques gouttes à quelques centilitres d'eau, loin de la bouteille, mais le total des centres de données grimpe.",
    "image": "« Le glaçon de ton pastis, je peux te le compter tout seul, ou avec l'eau de la centrale qui fait tourner mon congélateur. Ce qui inquiète la mairie, c'est pas ton verre, c'est que j'en serve chaque année davantage. »",
    "imagineForm": "A",
    "imagine": "Remplis une bouteille d'un demi-litre avec l'eau que Google déclare pour une question texte type posée à Gemini, 0,26 mL, à peu près cinq gouttes. Au rythme d'une question par minute, elle sera pleine au bout de quatre journées de huit heures. Refais l'essai avec le chiffre de Mistral, issu d'une analyse de cycle de vie qui compte jusqu'à la fabrication des serveurs, et elle déborde après onze réponses.",
    "full": [
      "La phrase vient d'un article du Washington Post du 18 septembre 2024, qui reprenait les calculs de chercheurs de l'université de Californie à Riverside. Selon eux, un e-mail de 100 mots écrit par GPT-4 demandait 519 mL d'eau, un peu plus qu'une petite bouteille, et l'électricité de quatorze ampoules LED allumées pendant une heure. Ces chercheurs, Pengfei Li, Shaolei Ren et leurs coauteurs, avaient estimé en 2023 que GPT-3 devait « boire » un demi-litre toutes les 10 à 50 réponses, pour des requêtes d'environ 800 mots. L'eau comptée était surtout celle des centrales électriques, puisque dans la moyenne américaine de leur tableau, 2,2 mL par réponse s'évaporent pour refroidir les serveurs et 14,7 mL sont attribués à la production d'électricité.",
      "Le chiffre de l'e-mail a vite été contesté. Dès janvier 2025, un développeur a fait remarquer sur son blog que les 0,14 kWh supposés par e-mail coûteraient à eux seuls, en électricité, plusieurs fois le prix qu'OpenAI facturait pour l'écrire. Depuis l'été 2025, les labos publient leurs propres chiffres, qui restent des déclarations. Sam Altman a écrit en juin qu'une requête moyenne à ChatGPT consommait 0,34 Wh et un quinzième de cuillère à café d'eau, sans donner de méthode. En août, Google a annoncé 0,24 Wh et 0,26 mL pour la question texte médiane posée à Gemini en mai 2025, en ne comptant que l'eau évaporée dans ses centres de données et en précisant qu'aucun tiers n'a vérifié ces données. Mistral, avec Carbone 4 et l'Ademe, a publié en juillet une analyse de cycle de vie relue par deux cabinets, qui arrive à 45 mL pour une réponse de 400 tokens.",
      "Ce qui reste vrai tient à deux constats. Une question texte médiane ne dit rien des usages lourds, et Epoch AI estimait en février 2025 qu'une requête à GPT-4o passait d'environ 0,3 Wh à près de 40 Wh avec 100 000 tokens à lire. La MIT Technology Review a mesuré en mai 2025 qu'une vidéo de cinq secondes générée par un modèle ouvert, CogVideoX, demandait 3,4 millions de joules, plus de 700 fois une image. Surtout, la somme grimpe. L'Agence internationale de l'énergie comptait 415 TWh d'électricité pour les centres de données du monde en 2024, environ 1,5 % de la consommation mondiale, puis une hausse de 17 % en 2025, et en attend le double d'ici 2030. Google, à lui seul, a consommé environ 37 milliards de litres d'eau douce en 2025."
    ],
    "then": "En 2024, les seuls chiffres par requête venaient de chercheurs extérieurs, qui devaient deviner le matériel, le modèle et la longueur des réponses. Depuis l'été 2025, OpenAI, Google et Mistral publient les leurs, de 0,26 à 45 mL d'eau selon ce que chacun compte, sans méthode commune et, pour les deux premiers, sans vérification par un tiers.",
    "office": [
      {
        "who": "q",
        "text": "On devrait arrêter d'utiliser ChatGPT pour économiser l'eau ?"
      },
      {
        "who": "a",
        "text": "Tes questions texte pèsent peu, de quelques gouttes à quelques centilitres chacune selon le décompte ; ce qui pèse davantage, ce sont les longs documents à faire lire, les vidéos générées et le volume total, qui grimpe chaque année."
      }
    ],
    "avoid": "« Une question, c'est cinq gouttes, donc l'IA n'a pas d'impact sur l'eau. » Les cinq gouttes de Google ne comptent que le refroidissement d'une question texte médiane ; l'eau des centrales, les longues requêtes, les images et les vidéos s'y ajoutent, et la consommation totale des centres de données continue de grimper.",
    "video": null,
    "sources": [
      {
        "label": "The Verge, How much water and energy does it take to write an email using ChatGPT?, 19 septembre 2024 (relaie l'article du Washington Post « A bottle of water per email: the hidden environmental costs of using AI chatbots », daté du 18 septembre 2024 : à peu près une bouteille d'eau, et l'électricité de 14 ampoules LED pendant une heure)",
        "url": "https://www.theverge.com/2024/9/19/24249092/how-much-water-and-energy-does-it-take-to-write-an-email-using-chatgpt"
      },
      {
        "label": "Projet Celsius, Combien d'eau consomme une requête ChatGPT ?, 8 juin 2026, mis à jour le 24 octobre 2026 (l'équipe de UC Riverside estime environ 519 mL pour un e-mail de 100 mots généré par GPT-4, eau de la production d'électricité comprise, d'après le Washington Post)",
        "url": "https://projetcelsius.com/blog/ia-empreinte-eau/"
      },
      {
        "label": "hauntsaninja, WaPo is very wrong on ChatGPT energy use, 6 janvier 2025 (le Washington Post suppose 0,14 kWh et 519 mL par e-mail de 100 mots ; à 0,06 $ le kWh, l'électricité coûterait 0,84 centime contre 0,06 à 0,12 centime facturé par l'API)",
        "url": "https://hauntsaninja.github.io/wapo_chatgpt_energy.html"
      },
      {
        "label": "Li, Yang, Islam et Ren (UC Riverside, UT Arlington), Making AI Less « Thirsty », avril 2023, révisé le 26 mars 2025 (GPT-3 consomme une bouteille de 500 mL pour 10 à 50 réponses de longueur moyenne, environ 800 mots en entrée et 150 à 300 en sortie ; tableau 1, moyenne des États-Unis : 2,2 mL sur place, 14,7 mL hors site, 16,9 mL au total, 29,6 requêtes par bouteille). Calcul : 14,7 / 16,9 = 87 % de l'eau comptée vient des centrales",
        "url": "https://arxiv.org/abs/2304.03271"
      },
      {
        "label": "Sam Altman, The Gentle Singularity (une requête moyenne consomme environ 0,34 Wh et 0,000085 gallon d'eau, environ un quinzième de cuillère à café). Calcul du schéma : 0,000085 x 3 785 mL = 0,32 mL, soit 500 / 0,32 = environ 1 550 requêtes par bouteille",
        "url": "https://blog.samaltman.com/the-gentle-singularity"
      },
      {
        "label": "The Register, 11 juin 2025 (billet d'Altman publié le mardi 10 juin 2025, aucune méthode donnée pour 0,34 Wh)",
        "url": "https://www.theregister.com/2025/06/11/openais_sam_altman_superintelligence/"
      },
      {
        "label": "Google Cloud, Measuring the environmental impact of AI inference, 21 août 2025 (question texte médiane de Gemini Apps, données de mai 2025 : 0,24 Wh, 0,03 gCO2e, 0,26 mL d'eau, environ cinq gouttes ; données non vérifiées par un tiers indépendant). Calcul de l'Imagine : 500 / 0,26 = 1 923 questions, soit 1 923 minutes, 32 heures, quatre journées de huit heures",
        "url": "https://cloud.google.com/blog/products/infrastructure/measuring-the-environmental-impact-of-ai-inference"
      },
      {
        "label": "Elsworth et al. (Google), Measuring the environmental impact of delivering AI at Google Scale, 21 août 2025 (eau calculée à partir de l'énergie par requête et du WUE de consommation des centres de données, c'est-à-dire l'eau du refroidissement)",
        "url": "https://arxiv.org/abs/2508.15734"
      },
      {
        "label": "Mistral AI, Our contribution to a global environmental standard for AI, 22 juillet 2025 (analyse de cycle de vie avec Carbone 4 et l'Ademe, relue par Resilio et Hubblo ; 45 mL d'eau pour une réponse de 400 tokens de Le Chat, hors terminal de l'utilisateur ; fabrication des serveurs comprise ; impacts à peu près proportionnels à la taille du modèle). Calcul de l'Imagine : 500 / 45 = 11,1 réponses",
        "url": "https://mistral.ai/news/our-contribution-to-a-global-environmental-standard-for-ai"
      },
      {
        "label": "Josh You (Epoch AI), How much energy does ChatGPT use?, 7 février 2025 (environ 0,3 Wh pour une requête type à GPT-4o, environ 2,5 Wh avec 10 000 tokens en entrée, près de 40 Wh avec 100 000)",
        "url": "https://epoch.ai/gradient-updates/how-much-energy-does-chatgpt-use"
      },
      {
        "label": "O'Donnell et Crownhart, We did the math on AI's energy footprint, MIT Technology Review, 20 mai 2025 (vidéo de cinq secondes avec CogVideoX : environ 3,4 millions de joules, plus de 700 fois une image de haute qualité)",
        "url": "https://www.technologyreview.com/2025/05/20/1116327/ai-energy-usage-climate-footprint-big-tech/"
      },
      {
        "label": "AIE, Energy and AI, résumé, 2025 (centres de données : 415 TWh en 2024, environ 1,5 % de l'électricité mondiale ; environ 945 TWh attendus en 2030)",
        "url": "https://www.iea.org/reports/energy-and-ai/executive-summary"
      },
      {
        "label": "AIE, Data centre electricity use surged in 2025, 16 avril 2026 (hausse de 17 % en 2025 ; consommation des centres de données attendue en doublement d'ici 2030)",
        "url": "https://www.iea.org/news/data-centre-electricity-use-surged-in-2025-even-with-tightening-bottlenecks-driving-a-scramble-for-solutions"
      },
      {
        "label": "Google, Rapport environnemental 2026 (environ 29 milliards de litres restitués en 2025, soit environ 78 % de la consommation totale d'eau douce). Calcul : 29 / 0,78 = environ 37 milliards de litres consommés en 2025",
        "url": "https://sustainability.google/google-2026-environmental-report/"
      }
    ]
  },
  {
    "id": "clonage-de-voix",
    "status": "live",
    "title": "Clonage de voix",
    "en": "Voice cloning",
    "aliases": [
      "voice cloning",
      "voice clone",
      "AI voice clone",
      "deepfake",
      "audio deepfake",
      "voice deepfake",
      "vishing"
    ],
    "aliasesFr": [
      "voix clonée",
      "clone vocal",
      "hypertrucage",
      "arnaque au faux proche"
    ],
    "jargon": [
      {
        "say": "deepfake",
        "means": "un contenu, image, vidéo ou son, fabriqué ou modifié par IA pour faire croire qu'une personne réelle a dit ou fait quelque chose ; l'AI Act, en français, dit « hypertrucage »"
      },
      {
        "say": "instant voice cloning",
        "means": "le clone express d'ElevenLabs, accepté dès dix secondes d'audio au total, avec une à deux minutes d'enregistrement propre recommandées"
      },
      {
        "say": "vishing",
        "means": "voice phishing, l'hameçonnage par appel ou par message vocal, que le FBI voit de plus en plus souvent porté par des voix générées par IA"
      },
      {
        "say": "safe word",
        "means": "le mot ou la phrase secrète convenus à l'avance en famille, à demander quand un proche appelle en catastrophe pour de l'argent"
      }
    ],
    "cat": "ecosysteme",
    "links": [
      "mythe-detecteur-de-texte-ia",
      "ai-act",
      "multimodal",
      "responsabilite",
      "ai-slop",
      "dead-internet"
    ],
    "short": "Le clonage de voix fait parler un logiciel avec la voix d'une personne réelle, à partir de quelques secondes ou minutes d'enregistrement, pour lui faire dire n'importe quel texte.",
    "image": "Un collègue de Corinne poste une photo de la soirée où son trousseau traîne sur la table, et d'après le cliché, un serrurier peut tailler un double de sa clé. Corinne a toujours la sienne au fond du sac, et ne saura jamais combien de doubles ouvrent sa porte.",
    "imagineForm": "E",
    "imagine": "Paulette reçoit un message vocal d'un numéro inconnu : « Mamie, j'ai eu un accident, il me faut 2 000 euros tout de suite. » La voix d'homme ne ressemble pas du tout à celle d'Enzo, et elle efface le message en haussant les épaules. Le lendemain, même numéro, même phrase, mais dite avec la voix d'Enzo, tirée de vingt secondes de ses vidéos de vacances, et Paulette ouvre déjà l'appli de sa banque.",
    "full": [
      "Un modèle de synthèse vocale entraîné sur les voix d'un grand nombre de personnes apprend à séparer ce qui est dit de la façon de le dire. Donne-lui un court échantillon d'une voix, et il en reprend le timbre, l'accent et le débit pour lire n'importe quel texte, y compris des phrases jamais prononcées. ElevenLabs accepte un clone à partir de dix secondes d'audio et en recommande une à deux minutes, et en juillet 2025, Hany Farid, chercheur à Berkeley, estimait que 15 à 20 secondes suffisaient. L'oreille ne suit plus, et en septembre 2025, une équipe de Queen Mary, à Londres, a fait entendre des clones tirés de quatre minutes d'enregistrement, et ses auditeurs en ont pris 58 % pour des voix humaines, contre 62 % pour les vraies voix.",
      "La même technique rend des voix perdues. Atteinte d'une paralysie supranucléaire progressive, la représentante américaine Jennifer Wexton a prononcé le 25 juillet 2024 un discours à la Chambre avec un clone de sa propre voix, construit par ElevenLabs à partir de plus d'une heure de ses anciennes interventions. La voix off des shorts de ce lexique est elle aussi un clone, celui de la voix de l'auteur, fait chez ElevenLabs avec son accord ; il a gardé ses manies, et chuchote dès qu'on lui demande de parler calmement.",
      "Les fraudeurs ont suivi. Le 21 janvier 2024, des milliers d'électeurs du New Hampshire ont reçu un appel où une fausse voix de Joe Biden leur conseillait de garder leur vote pour novembre plutôt que d'aller à la primaire. Le consultant Steve Kramer avait payé 150 dollars un magicien de La Nouvelle-Orléans pour l'enregistrement. La FCC lui a infligé 6 millions de dollars d'amende en septembre 2024, un jury de l'État l'a acquitté au pénal en juin 2025, et il a fait savoir qu'il ne paierait pas. En janvier 2024 aussi, à Hong Kong, un employé d'Arup a viré environ 25,6 millions de dollars en quinze opérations, après une visioconférence où le directeur financier et tous les autres participants étaient des deepfakes. En juin 2025, un inconnu s'est fait passer pour Marco Rubio, le secrétaire d'État américain, auprès de trois ministres étrangers, d'un gouverneur et d'un élu du Congrès, et a laissé des messages vocaux sur Signal à au moins deux d'entre eux.",
      "Les garde-fous des outils restent minces. En mars 2025, Consumer Reports a examiné six services de clonage et jugé que quatre ne prenaient pas les précautions de base contre le clonage d'une voix sans accord. Chez ElevenLabs, il suffit de confirmer qu'on a le droit et l'accord de cloner la voix. L'AI Act oblige, depuis le 2 août 2026, à signaler un hypertrucage, une règle qui engage les diffuseurs honnêtes et pas l'escroc. Le FBI conseille une parade qui ne demande aucune technique, convenir en famille d'un mot ou d'une phrase secrète, puis raccrocher pour rappeler soi-même la personne sur un numéro qu'on connaît déjà."
    ],
    "office": [
      {
        "who": "q",
        "text": "La directrice financière m'a laissé un vocal pour un virement urgent à un nouveau fournisseur, je le passe ?"
      },
      {
        "who": "a",
        "text": "Rappelle-la toi-même sur le numéro de l'annuaire interne, pas sur celui du message, et fais valider le virement comme d'habitude ; une voix qui ressemble à la sienne ne prouve plus que c'est elle."
      }
    ],
    "avoid": "« Il faut des heures d'enregistrement pour copier ma voix. » ElevenLabs accepte un clone à partir de dix secondes d'audio et en recommande une à deux minutes, à peu près ce que tu dis dans trois stories ou un long message de répondeur.",
    "video": null,
    "sources": [
      {
        "label": "ElevenLabs, Instant Voice Cloning, documentation consultée le 5 novembre 2026 (une à deux minutes d'audio propre recommandées, au moins 10 secondes au total, au-delà de 3 minutes peu de gain ; l'utilisateur confirme avoir le droit et l'accord de cloner la voix)",
        "url": "https://elevenlabs.io/docs/eleven-creative/voices/voice-cloning/instant-voice-cloning"
      },
      {
        "label": "Hudson et Natanson (The Washington Post), A Marco Rubio impostor is using AI voice to call high-level officials, repris par l'Anchorage Daily News, 8 juillet 2025 (câble du 3 juillet ; dès la mi-juin, compte Signal au nom de Marco.Rubio@state.gov ; trois ministres étrangers, un gouverneur, un membre du Congrès ; messages vocaux à au moins deux d'entre eux ; Hany Farid : 15 à 20 secondes d'audio suffisent)",
        "url": "https://www.adn.com/nation-world/2025/07/08/a-marco-rubio-impostor-is-using-ai-voice-to-call-high-level-officials/"
      },
      {
        "label": "Barrington, Cooper, Lavan et al., Voice clones sound realistic but not (yet) hyperrealistic, PLOS One, 24 septembre 2025 (clones ElevenLabs Instant Voice Cloning à partir d'environ 4 minutes d'enregistrement par voix ; expérience 1b : 58 % des clones jugés humains, 62 % des vraies voix)",
        "url": "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0332692"
      },
      {
        "label": "NPR, repris par KAXE, A neurological disease stole Rep. Jennifer Wexton's voice. AI helped her get it back, 25 juillet 2024 (paralysie supranucléaire progressive ; plus d'une heure d'anciens discours envoyée à ElevenLabs ; premier discours avec une voix clonée à la Chambre)",
        "url": "https://www.kaxe.org/news/2024-07-25/a-neurological-disease-stole-rep-jennifer-wextons-voice-ai-helped-her-get-it-back"
      },
      {
        "label": "NEPM (AP), Alleged coordinator of faked Biden robocall slapped with $6M fine, 26 septembre 2024 (amende de 6 millions de dollars de la FCC ; appels de janvier 2024 à des milliers d'électeurs du New Hampshire ; voix artificielle imitant Joe Biden)",
        "url": "https://www.nepm.org/2024-09-26/alleged-coordinator-of-biden-robocall-slapped-with-6m-fine"
      },
      {
        "label": "Holly Ramer (AP), repris par KSAT, New Hampshire jury acquits consultant behind AI robocalls mimicking Biden on all charges, 13 juin 2025 (acquittement ; 150 dollars payés à un magicien de La Nouvelle-Orléans ; appels deux jours avant la primaire du 23 janvier 2024 ; « save your vote for the November election » ; Kramer dit qu'il ne paiera pas l'amende)",
        "url": "https://www.ksat.com/news/politics/2025/06/13/new-hampshire-jury-acquits-consultant-behind-ai-robocalls-mimicking-biden-on-all-charges/"
      },
      {
        "label": "Kathleen Magramo (CNN), repris par ABC17, British engineering giant Arup revealed as $25 million deepfake scam victim, 16 mai 2024 (signalement à la police en janvier 2024 ; 200 millions de dollars de Hong Kong, environ 25,6 millions de dollars, en 15 opérations ; directeur financier et autres participants de la visioconférence tous truqués ; Arup confirme les fausses voix et images)",
        "url": "https://abc17news.com/money/cnn-business-consumer/2024/05/16/british-engineering-giant-arup-revealed-as-25-million-deepfake-scam-victim/"
      },
      {
        "label": "FBI (IC3), Senior US Officials Impersonated in Malicious Messaging Campaign, I-051525-PSA, 15 mai 2025 (campagne de textos et de messages vocaux générés par IA depuis avril 2025 ; le vishing exploite de plus en plus l'audio généré par IA)",
        "url": "https://www.ic3.gov/PSA/2025/PSA250515"
      },
      {
        "label": "FBI (IC3), Criminals Use Generative Artificial Intelligence to Facilitate Financial Fraud, I-120324-PSA, 3 décembre 2024 (voix d'un proche en détresse ; « create a secret word or phrase with your family » ; raccrocher et rappeler soi-même)",
        "url": "https://www.ic3.gov/PSA/2024/PSA241203"
      },
      {
        "label": "Consumer Reports, New Report: Do These 6 AI Voice Cloning Companies Do Enough to Prevent Misuse?, 10 mars 2025 (Descript, ElevenLabs, Lovo, PlayHT, Resemble AI, Speechify ; quatre ne prennent pas les mesures de base contre le clonage non autorisé)",
        "url": "https://innovation.consumerreports.org/new-report-do-these-6-ai-voice-cloning-companies-do-enough-to-prevent-misuse/"
      },
      {
        "label": "Règlement européen sur l'IA, article 50, version française (le déployeur d'un système qui génère ou manipule un contenu constituant un hypertrucage indique qu'il est artificiel ; applicable au 2 août 2026)",
        "url": "https://artificialintelligenceact.eu/fr/article/50/"
      }
    ]
  },
  {
    "id": "mythe-detecteur-de-texte-ia",
    "status": "live",
    "title": "« Un détecteur prouve qu'un texte vient d'une IA »",
    "en": "Myth: an AI detector proves a text was AI-written",
    "aliases": [
      "AI detector",
      "AI text detector",
      "GPT detector",
      "AI writing detection",
      "AI content detector"
    ],
    "aliasesFr": [
      "détecteur de texte IA",
      "détecteur d'IA",
      "détecteur de ChatGPT",
      "détection de texte généré"
    ],
    "jargon": [
      {
        "say": "perplexity",
        "means": "la perplexité, la surprise d'un modèle de langage devant chaque mot d'un texte ; plus elle est basse, plus le détecteur penche pour l'IA"
      },
      {
        "say": "false positive",
        "means": "un faux positif, un texte humain classé comme généré, l'erreur qui fait accuser quelqu'un à tort"
      },
      {
        "say": "humanizer",
        "means": "un outil qui réécrit un texte généré pour qu'il passe sous les détecteurs, comme StealthGPT"
      },
      {
        "say": "watermark",
        "means": "un filigrane, une signature statistique glissée dans le choix des mots au moment de la génération, que seul le détenteur de la clé sait lire"
      }
    ],
    "graphLabel": "Mythe : détecteur de texte IA",
    "cat": "mythes",
    "links": [
      "declaration-d-usage-de-l-ia",
      "ancrage-aux-sources",
      "ai-slop",
      "biais",
      "clonage-de-voix"
    ],
    "short": "Un détecteur de texte IA estime d'après le style la probabilité qu'un texte soit généré, sans voir son origine ; son score n'est pas une preuve.",
    "image": "Dans le bus 38, Hervé le contrôleur repère les fraudeurs à leur air gêné. Il verbalise surtout les timides et les touristes qui cherchent leur ticket au fond du sac, pendant que le vrai resquilleur, qui a appris à prendre l'air dégagé, descend tranquillement à République.",
    "imagineForm": "D",
    "imagine": "« Ce texte a-t-il été écrit par une IA ? », demande en avril 2023 un internaute à GPTZero, en lui collant un extrait de la Constitution des États-Unis, signée en 1787. « Ton texte a probablement été écrit entièrement par une IA », répond le détecteur.",
    "full": [
      "Un détecteur ne sait rien de la façon dont un texte a été écrit, il n'a que le texte. Il mesure surtout à quel point chaque mot était prévisible pour un modèle de langage, ce qu'on appelle la perplexité, et un texte trop prévisible passe pour généré. La Constitution américaine a été lue tant de fois pendant l'entraînement des modèles qu'elle leur paraît écrite d'avance, ce qu'Edward Tian, le créateur de GPTZero, reconnaissait en juillet 2023.",
      "Cette règle frappe d'abord les plumes simples. En 2023, une équipe de Stanford a soumis à sept détecteurs 91 rédactions du TOEFL, l'examen d'anglais langue étrangère, trouvées sur un forum chinois. Les détecteurs en classaient en moyenne 61 % comme générées, et au moins l'un d'eux 89 sur 91, alors qu'ils ne se trompaient presque jamais sur des copies de collégiens américains. L'inverse marchait aussi, puisqu'il suffisait de demander à ChatGPT de réécrire ses propres essais d'admission à l'université dans une langue plus littéraire pour que la détection tombe de 100 % à 13 %.",
      "Les outils ont progressé depuis. En 2025, Brian Jabarian et Alex Imas, de l'université de Chicago, ont comparé quatre détecteurs sur près de 2 000 textes humains et leurs équivalents générés. Les trois commerciaux, GPTZero, Originality.ai et Pangram, accusaient à tort moins de 1 % des textes humains, contre 30 à 78 % pour le modèle open source RoBERTa. Passés dans l'humaniseur StealthGPT, les textes générés échappaient pourtant à GPTZero environ une fois sur deux, et seul Pangram tenait bon. GPTZero, lui, annonce sur son site 99,9 % de précision, un chiffre de vendeur.",
      "Même rare, l'erreur tombe sur quelqu'un, et à 1 % une promotion de 300 copies honnêtes compte encore trois accusés à tort. Le 28 janvier 2026, un tribunal de l'État de New York a annulé la sanction d'Orion Newby, étudiant de première année à l'université Adelphi, et fait effacer l'affaire de son dossier. Il avait été accusé sur la foi d'un score Turnitin de 100 %, quand deux autres détecteurs donnaient 0 %. Seul un filigrane posé pendant la génération signe l'origine, comme SynthID Text, testé par Google sur près de 20 millions de réponses de Gemini et décrit dans Nature en octobre 2024. Il ne se lit qu'avec la clé du modèle qui l'a posé, ne dit rien des autres et s'affaiblit quand on reformule le texte."
    ],
    "then": "En juillet 2023, OpenAI retirait son propre classifieur pour manque de précision ; il ne repérait que 26 % des textes générés et accusait à tort 9 % des textes humains. Les meilleurs détecteurs commerciaux de 2025 descendent sous 1 % de fausses alertes sur des textes assez longs, et pourtant l'université Curtin, en Australie, a éteint celui de Turnitin le 1er janvier 2026 en gardant la détection du plagiat.",
    "office": [
      {
        "who": "q",
        "text": "Le détecteur donne 87 % d'IA sur la note du stagiaire, je le convoque ?"
      },
      {
        "who": "a",
        "text": "Convoque-le pour parler du fond, pas du score ; demande-lui ses sources et ses brouillons, fais-lui expliquer deux passages, et si l'IA a servi, vous écrirez ensemble la ligne qui le dit."
      }
    ],
    "avoid": "« Un texte lisse et sans faute, c'est forcément l'IA. » Un style lisse s'obtient aussi à la main, chez un bon élève, un juriste ou quelqu'un qui écrit dans une langue apprise ; juger au style revient à refaire le calcul du détecteur, avec les mêmes faux coupables.",
    "video": null,
    "sources": [
      {
        "label": "Benj Edwards, Ars Technica, Why AI writing detectors don't work, 14 juillet 2023 (capture virale d'avril 2023 : GPTZero juge un extrait de la Constitution américaine « likely to be written entirely by AI » ; ZeroGPT donne 88,2 % d'IA à un passage de la Genèse ; Edward Tian : la Constitution revient sans cesse dans les données d'entraînement ; perplexité et burstiness)",
        "url": "https://arstechnica.com/information-technology/2023/07/why-ai-detectors-think-the-us-constitution-was-written-by-ai/"
      },
      {
        "label": "Liang, Yuksekgonul, Mao, Wu et Zou (Stanford), GPT detectors are biased against non-native English writers, avril 2023, révisé le 10 juillet 2023 (sept détecteurs ; 91 rédactions du TOEFL d'un forum chinois : 61,22 % de faux positifs en moyenne, 89 sur 91 signalées par au moins un détecteur ; précision quasi parfaite sur 88 copies de 8th grade américaines ; consigne « Elevate the provided text by employing literary language » : détection de 100 % à 13 % au plus)",
        "url": "https://arxiv.org/abs/2304.02819"
      },
      {
        "label": "Matt Robinson, Chicago Booth Review, Do AI Detectors Work Well Enough to Trust?, 2 décembre 2025 (étude de Brian Jabarian et Alex Imas ; GPTZero, Originality.ai, Pangram et RoBERTa ; les trois outils commerciaux sous 1 % de faux positifs ; moins précis sous 50 mots)",
        "url": "https://www.chicagobooth.edu/review/2025/december/do-ai-detectors-work-well-enough-trust"
      },
      {
        "label": "Becker Friedman Institute, Artificial Writing and Automated Detection, note de recherche d'octobre 2025 sur le working paper 2025-116 de Jabarian et Imas (corpus de 1 992 passages ; RoBERTa : 30 à 78 % de faux positifs ; Pangram robuste à StealthGPT ; GPTZero perd l'essentiel de sa détection face aux humaniseurs, environ 50 % de faux négatifs et plus)",
        "url": "https://bfi.uchicago.edu/wp-content/uploads/2025/10/Artificial-Writing-and-Automated-Detection.pdf"
      },
      {
        "label": "GPTZero, page d'accueil consultée le 5 novembre 2026 (le vendeur annonce « a 99.9% accuracy rate » d'après ses propres tests et ses partenaires)",
        "url": "https://gptzero.me/"
      },
      {
        "label": "Cour suprême de l'État de New York, comté de Nassau, Matter of Newby v Adelphi Univ., 2026 NY Slip Op 26021, décision du 28 janvier 2026 (essai noté zéro après un « AI-generated score of 100% » de Turnitin ; Grammarly AI detector et ZeroGPT donnent 0 % ; sanction annulée et dossier à expurger)",
        "url": "https://www.nycourts.gov/reporter/3dseries/2026/2026_26021.htm"
      },
      {
        "label": "Dathathri, See et al. (Google DeepMind), Scalable watermarking for identifying large language model outputs, Nature, 23 octobre 2024 (SynthID-Text ; expérience sur près de 20 millions de réponses de Gemini ; la détection demande la clé du filigrane ; filigranes affaiblis par la reformulation ; textes d'autres modèles non couverts sans coordination entre fournisseurs)",
        "url": "https://www.nature.com/articles/s41586-024-08025-4"
      },
      {
        "label": "OpenAI, New AI classifier for indicating AI-written text, 31 janvier 2023, mis à jour le 20 juillet 2023 (classifieur retiré « due to its low rate of accuracy » ; 26 % de vrais positifs et 9 % de faux positifs sur le jeu de test)",
        "url": "https://openai.com/index/new-ai-classifier-for-indicating-ai-written-text/"
      },
      {
        "label": "Curtin University, Update on Turnitin AI detection tool, 4 septembre 2025 (détection d'écriture IA de Turnitin désactivée à partir du 1er janvier 2026 sur tous les campus, vérification d'originalité maintenue)",
        "url": "https://www.curtin.edu.au/news/oasis-news/update-on-turnitin-ai-detection-tool/"
      }
    ]
  },
  {
    "id": "shadow-ai",
    "status": "live",
    "title": "Shadow AI (IA fantôme)",
    "en": "Shadow AI",
    "aliases": [
      "shadow AI",
      "BYOAI",
      "bring your own AI",
      "unsanctioned AI",
      "unapproved AI tools"
    ],
    "aliasesFr": [
      "IA fantôme",
      "IA de l'ombre",
      "IA non validée",
      "IA non approuvée"
    ],
    "jargon": [
      {
        "say": "BYOAI",
        "means": "bring your own AI, apporter son IA au bureau ; le nom que Microsoft et LinkedIn ont donné en 2024 aux salariés qui travaillent avec leurs propres outils"
      },
      {
        "say": "outil validé",
        "means": "l'outil que l'employeur a choisi, mis sous contrat et ouvert aux équipes, par opposition à l'appli trouvée seul ; en anglais, sanctioned contre unsanctioned"
      },
      {
        "say": "compte entreprise",
        "means": "l'abonnement payé par l'employeur ; chez OpenAI, ses conversations n'entraînent pas les modèles par défaut, contrairement à celles d'un compte perso"
      },
      {
        "say": "DLP",
        "means": "data loss prevention, les logiciels qui repèrent qu'un texte sensible part vers l'extérieur, un chatbot compris, et peuvent l'arrêter"
      }
    ],
    "cat": "methode",
    "links": [
      "mythe-ia-locale",
      "memoire",
      "prompt-injection",
      "human-in-the-loop",
      "ai-act"
    ],
    "short": "Le shadow AI, ou IA fantôme, désigne l'usage au travail d'outils d'IA que l'employeur n'a pas validés, comme un compte ChatGPT perso, une extension ou une appli gratuite.",
    "image": "La photocopieuse du troisième est en panne depuis mars, et le ticket est toujours « en cours de traitement ». En attendant, tout l'étage fait ses copies chez le reprographe d'en face, qui connaît désormais les contrats de la boîte mieux que le service juridique.",
    "imagineForm": "B",
    "imagine": "Si tu as un compte ChatGPT perso, ouvre Paramètres, puis Contrôles des données, et regarde la ligne « Améliorer le modèle pour tous ». Elle est activée, sauf si tu l'as déjà coupée toi-même. Le budget de l'équipe que tu y as peut-être collé un soir pour aller plus vite fait donc partie de ce qu'OpenAI s'autorise à utiliser pour entraîner ses modèles.",
    "full": [
      "Le shadow AI, l'IA fantôme, regroupe les outils d'IA qu'on utilise pour son travail sans que l'employeur les ait choisis, le plus souvent un compte gratuit ouvert avec son adresse perso. En mai 2024, Microsoft, qui vend son propre assistant, et LinkedIn ont publié une enquête menée auprès de 31 000 personnes dans 31 pays. Les trois quarts des travailleurs du savoir utilisaient déjà l'IA au travail, 78 % de ces utilisateurs y apportaient leurs propres outils, et 39 % seulement avaient été formés par leur entreprise.",
      "La cause tient moins à l'indiscipline qu'au retard de l'outil officiel. En octobre 2025, dans un sondage commandé par Microsoft auprès de 2 003 salariés britanniques, 71 % disaient avoir déjà utilisé au travail un outil grand public non approuvé, et la moitié continuait chaque semaine. Ils citaient d'abord l'habitude prise à la maison (41 %), puis l'absence de toute option validée par leur entreprise (28 %), et un tiers seulement s'inquiétait des données de l'entreprise ou des clients qu'ils y tapaient.",
      "Le cas Samsung, souvent cité, est plus ambigu. Le 11 mars 2023, la division semi-conducteurs autorise ChatGPT. En moins de vingt jours, selon The Economist Korea, un ingénieur y colle le code source d'un programme qui plante, un autre le code qui repère les équipements défaillants, un troisième la transcription d'une réunion pour en tirer le compte rendu. L'outil était permis, mais rien ne disait ce qu'on pouvait y mettre, et la note interne rappelait que les données envoyées restaient sur des serveurs extérieurs, impossibles à récupérer. Le 2 mai, Samsung interdit l'IA générative sur ses appareils, le temps de construire son propre outil.",
      "En juillet 2025, IBM et le Ponemon Institute ont étudié 600 organisations victimes d'une fuite de données. Celles où le shadow AI était très répandu payaient en moyenne 670 000 dollars de plus, et 37 % seulement avaient des règles pour encadrer l'IA ou repérer ses usages cachés. La parade la plus sûre consiste à fournir un outil au moins aussi bon que l'appli gratuite, avec une règle claire sur ce qu'on peut y coller. Chez OpenAI, les comptes entreprise n'entraînent aucun modèle par défaut, et depuis février 2025 le règlement européen sur l'IA demande à ceux qui déploient de l'IA de veiller à ce que leur personnel la maîtrise suffisamment. Le risque grandit avec les agents, puisqu'un assistant perso branché sur la boîte mail du bureau lit aussi les e-mails piégés par prompt injection, sans que personne ait décidé ce qu'il peut envoyer sans demander."
    ],
    "then": "En juillet 2025, l'étude d'IBM comptait une organisation victime sur cinq touchée par une fuite liée au shadow AI. Dans l'édition de juillet 2026, des salariés passés par des outils non approuvés figuraient dans 43 % des incidents de sécurité, plus du double de l'année précédente, et près de sept organisations victimes sur dix n'avaient toujours pas de règles pour encadrer l'IA.",
    "office": [
      {
        "who": "q",
        "text": "On bloque ChatGPT sur le réseau de l'entreprise, et le problème est réglé ?"
      },
      {
        "who": "a",
        "text": "Sur le réseau, oui, mais tout le monde a la 4G dans sa poche. Tant que l'outil fourni fait moins bien que l'appli gratuite, les gens passeront par leur téléphone ; donne-leur un compte entreprise et une règle d'une ligne sur ce qu'on a le droit d'y coller."
      }
    ],
    "avoid": "« Chez nous, personne n'utilise d'IA, puisque ce n'est pas autorisé. » Dans le sondage de Microsoft d'octobre 2025, 71 % des salariés britanniques avaient déjà utilisé au travail un outil grand public non approuvé ; quand l'employeur ne fournit rien, l'usage continue, mais hors de sa vue.",
    "video": null,
    "sources": [
      {
        "label": "Microsoft, Microsoft and LinkedIn release the 2024 Work Trend Index on the state of AI at work, 8 mai 2024 (enquête auprès de 31 000 personnes dans 31 pays ; 75 % des travailleurs du savoir utilisent l'IA au travail ; 78 % des utilisateurs apportent leurs propres outils ; 39 % ont reçu une formation de leur entreprise)",
        "url": "https://news.microsoft.com/source/2024/05/08/microsoft-and-linkedin-release-the-2024-work-trend-index-on-the-state-of-ai-at-work/"
      },
      {
        "label": "Microsoft UK Stories, Rise in Shadow AI tools raising security concerns for UK, 13 octobre 2025 (sondage Censuswide pour Microsoft, 2 003 salariés britanniques, octobre 2025 ; 71 % ont utilisé des outils d'IA grand public non approuvés au travail, 51 % chaque semaine ; 41 % par habitude personnelle, 28 % faute d'option validée par l'entreprise ; 32 % inquiets pour les données de l'entreprise ou des clients)",
        "url": "https://ukstories.microsoft.com/features/rise-in-shadow-ai-tools-raising-security-concerns-for-uk"
      },
      {
        "label": "The Economist Korea (Jeong Doo-yong), 30 mars 2023, en coréen (ChatGPT autorisé dans la division DS de Samsung depuis le 11 ; trois incidents en moins de 20 jours : code source d'un programme de téléchargement de mesures, code de repérage des équipements défaillants, transcription d'une réunion ; limite d'urgence de 1 024 octets par question ; données stockées sur des serveurs extérieurs, impossibles à récupérer)",
        "url": "https://economist.co.kr/article/view/ecn202303300057"
      },
      {
        "label": "TechCrunch, Samsung bans use of generative AI tools like ChatGPT after April internal data leak, 2 mai 2023 (interdiction temporaire de l'IA générative sur les appareils de l'entreprise, ChatGPT, Bing et Bard compris ; 65 % des salariés sondés y voyaient un risque de sécurité ; outils internes en préparation)",
        "url": "https://techcrunch.com/2023/05/02/samsung-bans-use-of-generative-ai-tools-like-chatgpt-after-april-internal-data-leak/"
      },
      {
        "label": "IBM, communiqué Cost of a Data Breach Report 2025, 30 juillet 2025 (600 organisations victimes entre mars 2024 et février 2025 ; une sur cinq a subi une fuite due au shadow AI ; 670 000 dollars de surcoût moyen en cas de shadow AI très répandu ; 37 % ont des règles pour gérer l'IA ou détecter le shadow AI)",
        "url": "https://newsroom.ibm.com/2025-07-30-ibm-report-13-of-organizations-reported-breaches-of-ai-models-or-applications,-97-of-which-reported-lacking-proper-ai-access-controls"
      },
      {
        "label": "Help Net Security, Data breach cost 2026 averaged $4.99 million, AI attacks ran higher, 30 juillet 2026 (édition 2026 d'IBM et Ponemon, plus de 600 organisations victimes entre mars 2025 et février 2026 ; outils non approuvés dans 43 % des incidents, plus du double de l'année précédente ; près de sept organisations victimes sur dix sans règles pour gérer l'IA ou repérer son usage non approuvé)",
        "url": "https://www.helpnetsecurity.com/2026/07/30/ibm-cost-of-a-data-breach-2026/"
      },
      {
        "label": "Centre d'aide OpenAI, Contrôles des données dans ChatGPT, consulté le 5 novembre 2026 (partage des données activé par défaut sur les espaces personnels Free, Plus et Pro ; réglage « Améliorer le modèle pour tous » dans Paramètres, Contrôles des données)",
        "url": "https://help.openai.com/fr-fr/articles/7730893-data-controls-in-chatgpt"
      },
      {
        "label": "OpenAI, Enterprise privacy, consulté le 5 novembre 2026 (par défaut, les données de ChatGPT Business, Enterprise, Edu et de l'API ne servent pas à entraîner les modèles)",
        "url": "https://openai.com/enterprise-privacy/"
      },
      {
        "label": "Règlement (UE) 2024/1689 sur l'IA, article 4, Maîtrise de l'IA, sur artificialintelligenceact.eu (applicable depuis le 2 février 2025 ; fournisseurs et déployeurs prennent des mesures pour assurer, dans toute la mesure du possible, un niveau suffisant de maîtrise de l'IA à leur personnel)",
        "url": "https://artificialintelligenceact.eu/article/4/"
      }
    ]
  },
  {
    "id": "ai-act",
    "status": "live",
    "title": "AI Act (règlement européen sur l'IA)",
    "en": "AI Act",
    "aliases": [
      "EU AI Act",
      "Artificial Intelligence Act",
      "Regulation (EU) 2024/1689",
      "AI Omnibus",
      "Digital Omnibus on AI"
    ],
    "aliasesFr": [
      "règlement européen sur l'IA",
      "règlement sur l'intelligence artificielle",
      "RIA",
      "loi européenne sur l'IA",
      "omnibus numérique"
    ],
    "jargon": [
      {
        "say": "pratiques interdites",
        "means": "la liste de l'article 5, ce qu'aucune entreprise n'a le droit de vendre ni d'utiliser dans l'Union, comme la notation sociale, depuis le 2 février 2025"
      },
      {
        "say": "annexe III",
        "means": "la liste des usages classés à haut risque : biométrie, infrastructures critiques, éducation, emploi, accès au crédit et aux services essentiels, police, migrations, justice"
      },
      {
        "say": "l'omnibus",
        "means": "le règlement (UE) 2026/1744, qui a modifié l'AI Act en juillet 2026 et repoussé les obligations du haut risque"
      },
      {
        "say": "AI Office",
        "means": "le Bureau de l'IA de la Commission européenne, qui contrôle les modèles d'usage général et peut leur infliger des amendes"
      }
    ],
    "graphLabel": "AI Act",
    "cat": "ecosysteme",
    "links": [
      "responsabilite",
      "evaluations-de-dangerosite",
      "open-weights",
      "labs",
      "clonage-de-voix",
      "shadow-ai"
    ],
    "short": "L'AI Act est le règlement européen sur l'intelligence artificielle, qui interdit certains usages, encadre ceux à haut risque et impose de la transparence, avec des obligations applicables par étapes.",
    "image": "À la piscine municipale, le nouveau règlement arrive en trois fois : le saut depuis le toit est interdit tout de suite, le bonnet devient obligatoire à la rentrée, et le grand toboggan attendra l'an prochain, faute de maîtres-nageurs formés pour le surveiller. En attendant, le toboggan reste ouvert.",
    "imagineForm": "A",
    "imagine": "Prends tout ce qu'une multinationale encaisse dans le monde entier du 1er janvier à minuit au 26 janvier vers 13 heures. Ces 25 jours et demi font 7 % de son année, et c'est le plafond de l'amende que l'AI Act prévoit pour une pratique interdite, ou 35 millions d'euros si ce montant est plus élevé. Chez Alphabet, la maison mère de Google, qui a facturé 402,8 milliards de dollars en 2025, ces trois semaines et demie pèsent environ 28 milliards.",
    "full": [
      "Le règlement (UE) 2024/1689, entré en vigueur le 1er août 2024, s'applique tel quel dans les vingt-sept pays de l'Union et range les systèmes d'IA selon leur risque. Depuis le 2 février 2025, il interdit par exemple la notation sociale et la détection des émotions au travail ou à l'école, sauf pour des raisons médicales ou de sécurité. Les fournisseurs de modèles d'usage général ont leurs propres obligations depuis le 2 août 2025. Depuis le 2 août 2026, un chatbot doit dire qu'il est une machine quand ce n'est pas évident, et un deepfake doit être signalé comme tel.",
      "Le calendrier a été disputé. Le 3 juillet 2025, une cinquantaine de dirigeants européens, de Mistral à TotalEnergies, demandaient une pause d'au moins deux ans ; un porte-parole de la Commission leur répondait le lendemain « Il n'y a pas de pause. Il n'y a pas de période de grâce, de répit ». Le 18 juillet, Meta refusait de signer le code de bonne pratique des modèles d'usage général, jugeant que « l'Europe fait fausse route sur l'IA ». Le 19 novembre 2025, la même Commission proposait pourtant un report, devenu le règlement omnibus 2026/1744, en vigueur depuis le 27 juillet 2026.",
      "En novembre 2026, ce calendrier est adopté et ne relève plus de la proposition. Les obligations des systèmes à haut risque de l'annexe III, comme ceux qui notent ta solvabilité pour un crédit, passent du 2 août 2026 au 2 décembre 2027 ; celles des produits déjà réglementés, jouets, machines ou dispositifs médicaux, passent au 2 août 2028. Le même texte ajoute une interdiction, à partir du 2 décembre 2026, des systèmes qui fabriquent des images intimes d'une personne identifiable sans son accord. Les autres échéances n'ont pas bougé, à un délai de quatre mois près pour le marquage des contenus produits par les générateurs déjà en vente."
    ],
    "then": "En 2024, le texte publié au Journal officiel faisait tomber le 2 août 2026 les obligations des systèmes à haut risque comme le crédit ou l'éducation. En 2026, après le règlement omnibus, elles arrivent le 2 décembre 2027, seize mois plus tard, et l'Union a ajouté entre-temps l'interdiction des applications qui déshabillent les gens sur une photo.",
    "office": [
      {
        "who": "q",
        "text": "On a mis un chatbot sur notre site de prêt immobilier, l'AI Act nous concerne déjà ?"
      },
      {
        "who": "a",
        "text": "Depuis le 2 août 2026, il doit déjà faire savoir à tes visiteurs qu'ils parlent à une machine. S'il se met à évaluer la solvabilité des emprunteurs, il entre dans le haut risque, dont les obligations s'appliquent à partir du 2 décembre 2027."
      }
    ],
    "avoid": "« L'AI Act a été repoussé. » Seul le haut risque a glissé, alors que les interdictions s'appliquent depuis février 2025, les règles des modèles d'usage général depuis août 2025 et l'obligation de signaler les deepfakes depuis août 2026. Un manquement à cette transparence coûte jusqu'à 15 millions d'euros ou 3 % du chiffre d'affaires mondial.",
    "video": null,
    "sources": [
      {
        "label": "Commission européenne, AI Act, page Regulatory framework for AI, mise à jour le 19 octobre 2026 (règlement (UE) 2024/1689 ; entré en vigueur le 1er août 2024, applicable le 2 août 2026 avec des exceptions ; interdictions au 2 février 2025, modèles d'usage général au 2 août 2025 ; quatre niveaux de risque ; omnibus sur l'IA adopté par la Commission le 19 novembre 2025, accord politique le 7 mai 2026, en vigueur le 27 juillet 2026 ; haut risque au 2 décembre 2027 pour l'annexe III et au 2 août 2028 pour l'annexe I ; interdiction des applications de « nudification » en décembre 2026 ; deepfakes étiquetés et règles de transparence en août 2026)",
        "url": "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai"
      },
      {
        "label": "AI Act, article 5, version consolidée (point c, notation sociale ; point f, inférer les émotions sur le lieu de travail et dans les établissements d'enseignement, sauf raisons médicales ou de sécurité ; point ba ajouté par l'omnibus, images intimes réalistes d'une personne identifiable sans son consentement)",
        "url": "https://artificialintelligenceact.eu/article/5/"
      },
      {
        "label": "AI Act, article 50 (paragraphe 1 : informer les personnes qu'elles interagissent avec un système d'IA, sauf si c'est évident ; paragraphe 4 : le déployeur d'un deepfake indique que le contenu a été généré ou manipulé, obligation allégée pour une œuvre manifestement artistique, satirique ou de fiction)",
        "url": "https://artificialintelligenceact.eu/article/50/"
      },
      {
        "label": "AI Act, article 99 (paragraphe 3 : pratiques interdites, jusqu'à 35 millions d'euros ou 7 % du chiffre d'affaires mondial annuel de l'exercice précédent, le plus élevé des deux ; paragraphe 4 : 15 millions ou 3 %, dont l'article 50 ; paragraphe 6 : pour les PME, le plus bas des deux)",
        "url": "https://artificialintelligenceact.eu/article/99/"
      },
      {
        "label": "AI Act, article 113, version modifiée par l'omnibus (chapitres I et II au 2 février 2025, nouvelles interdictions au 2 décembre 2026 ; chapitre V au 2 août 2025 ; haut risque de l'article 6, paragraphe 2, et de l'annexe III au 2 décembre 2027, de l'article 6, paragraphe 1, et de l'annexe I au 2 août 2028)",
        "url": "https://artificialintelligenceact.eu/article/113/"
      },
      {
        "label": "AI Act, annexe III (huit domaines à haut risque ; point 5 b, évaluer la solvabilité des personnes physiques ou établir leur score de crédit, hors détection de fraude)",
        "url": "https://artificialintelligenceact.eu/annex/3/"
      },
      {
        "label": "AI Act Explorer, Digital Omnibus on AI, règlement (UE) 2026/1744 du 8 juillet 2026 (position du Parlement européen du 16 juin 2026, décision du Conseil du 29 juin 2026 ; entrée en vigueur le 27 juillet 2026 ; délai jusqu'au 2 décembre 2026 pour le marquage des contenus des systèmes génératifs mis sur le marché avant le 2 août 2026)",
        "url": "https://artificialintelligenceact.eu/ai-act-explorer/digital-omnibus/"
      },
      {
        "label": "K&L Gates, EU Digital Omnibus on AI Enters Into Force, National Law Review, 31 juillet 2026 (publication au Journal officiel le 24 juillet 2026, entrée en vigueur le 27 juillet ; obligations des modèles d'usage général et transparence au 2 août 2026 maintenues)",
        "url": "https://natlawreview.com/article/eu-digital-omnibus-ai-enters-force"
      },
      {
        "label": "Next, Règlement sur l'IA : le monde économique demande un report, Bruxelles tient bon, 7 juillet 2025 (lettre d'une cinquantaine de dirigeants envoyée le jeudi, dont Mistral, TotalEnergies, BNP Paribas, Mercedes-Benz ; pause d'au moins deux ans demandée ; porte-parole de la Commission, vendredi : « Il n'y a pas de pause. Il n'y a pas de période de grâce, de répit »)",
        "url": "https://next.ink/191202/reglement-sur-lia-le-monde-economique-demande-un-report-bruxelles-tient-bon/"
      },
      {
        "label": "TechCrunch, Meta refuses to sign EU's AI code of practice, 18 juillet 2025 (Joel Kaplan, responsable des affaires publiques de Meta : « Europe is heading down the wrong path on AI »), citation traduite",
        "url": "https://techcrunch.com/2025/07/18/meta-refuses-to-sign-eus-ai-code-of-practice/"
      },
      {
        "label": "Alphabet, Announces Fourth Quarter and Fiscal Year 2025 Results, 4 février 2026, pièce 99.1 déposée à la SEC (chiffre d'affaires 2025 : 402 836 millions de dollars). Calcul : 7 % × 402,836 = 28,2 milliards de dollars ; 7 % × 365 jours = 25,55 jours, soit du 1er janvier à minuit au 26 janvier vers 13 heures",
        "url": "https://www.sec.gov/Archives/edgar/data/1652044/000165204426000012/googexhibit991q42025.htm"
      }
    ]
  }
];

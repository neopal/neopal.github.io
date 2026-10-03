// Lexique IA, vague 11, lot Y (session et contexte). Format identique à lexique/terms.js, sans `num`.
// imagineForm : forme de l'« Imagine » (content/dico/univers.md, section « Les formes de l'Imagine »).
// Faits et chiffres relevés le 3 octobre 2026 sur les pages citées dans `sources`.
module.exports = [
  {
    id: 'context-rot',
    status: 'live',
    title: 'Context rot',
    en: 'context rot',
    aliases: ['context degradation', 'attention degradation', 'long-context degradation', 'smart zone', 'dumb zone'],
    aliasesFr: ['pourrissement du contexte', 'dégradation du contexte'],
    jargon: [
      {say: 'smart zone, dumb zone', means: "le début d'une session, où l'agent est vif, et la suite, où il oublie des consignes et se trompe davantage ; Matt Pocock situe la bascule vers 125 000 à 150 000 tokens sur les meilleurs modèles, en précisant que le chiffre se discute"},
      {say: 'kitchen sink session', means: "la session fourre-tout, où l'on enchaîne des tâches sans rapport jusqu'à remplir le contexte de choses inutiles ; la documentation de Claude Code la range parmi les erreurs les plus courantes"},
      {say: '/btw', means: "la commande de Claude Code pour poser une question annexe dont la réponse n'entre jamais dans l'historique de la session"},
    ],
    cat: 'inference',
    links: ['fenetre-de-contexte', 'context-engineering', 'position', 'loop', 'sans-etat', 'passation'],
    short:
      "Le context rot est la baisse de qualité des réponses d'un modèle à mesure que son contexte s'allonge, bien avant que la fenêtre de contexte soit pleine.",
    image:
      "À l'assemblée de copropriété, la réfection du toit est votée en dix minutes, devis en main. Au point 14, à 23 h 30, alors que la salle est réservée jusqu'à minuit, le budget de l'ascenseur passe avec un zéro de trop sans que personne le remarque. Il faut une réunion le mardi suivant, avec ce seul point à l'ordre du jour, pour que le zéro saute aux yeux.",
    imagineForm: 'B',
    imagine:
      "Écris à ton assistant « Recopie exactement ce texte », suivi d'une trentaine de fois le mot « pomme » avec un seul « pommes » glissé au milieu ; à cette longueur, les modèles récents le rendent en général sans faute. En juillet 2025, la société Chroma a donné ce même exercice à des modèles d'OpenAI, d'Anthropic, de Google et d'Alibaba en allongeant la liste jusqu'à 10 000 mots. Plus la liste grandissait, plus les copies se dégradaient, certains refusant la tâche, d'autres glissant des mots absents du texte, et vers 5 000 mots Qwen3-8B a répondu qu'il avait besoin de faire une pause et d'aller à la plage.",
    full: [
      "Le mot est né le 18 juin 2025 dans un commentaire de Hacker News. Un internaute signant Workaccount2 y écrivait que les modèles « empoisonnent leur propre contexte », et que la qualité de leurs réponses chute vite quand le contexte grossit, surtout s'il s'encombre de fausses pistes et d'impasses. Simon Willison l'a relevé le jour même, et en septembre 2025 Anthropic reprenait le terme dans son guide du context engineering, pour dire que plus la fenêtre contient de tokens, moins le modèle retrouve avec exactitude ce qu'elle contient.",
      "La cause se trouve dans l'attention. Chaque token répartit la sienne entre tous ceux qui le précèdent, en proportions dont le total fait toujours 100 %, et chaque page ajoutée prend un peu de la part des autres ; avec n tokens, rappelle Anthropic, le modèle doit tenir n² relations. Le rapport de Chroma l'a aussi vérifié sur de vraies conversations. Avec les seuls passages utiles d'un historique, environ 300 tokens, les modèles répondaient nettement mieux qu'avec l'historique complet, environ 113 000 tokens, où la réponse figurait pourtant aussi. Un passage trompeur, proche de l'information cherchée sans être elle, suffisait déjà à faire baisser les scores, et quatre les faisaient baisser davantage.",
      "La longueur fait du tort à elle seule. En octobre 2025, une équipe de l'université de l'Illinois et d'Amazon a soumis à cinq modèles des problèmes de maths, de questions-réponses et de code, en vérifiant qu'ils retrouvaient bien toute l'information utile. Leurs scores baissaient quand même de 13,9 à 85 % à mesure que l'entrée s'allongeait, très en deçà de leur fenêtre. La baisse persistait quand le texte ajouté n'était fait que d'espaces vides.",
      "Pour qui travaille avec un agent, la parade consiste à garder la session courte. La documentation de Claude Code fonde la plupart de ses conseils sur ce constat, puisque la fenêtre se remplit vite et que les performances baissent à mesure qu'elle se remplit. Elle recommande de vider la session entre deux tâches sans rapport, de faire mener les explorations par des sous-agents qui lisent dans leur propre fenêtre, et de poser les questions annexes à part. Matt Pocock, qui enseigne le code avec l'IA, parle d'une « smart zone » au début de la session et d'une « dumb zone » ensuite, et conseille de calibrer chaque tâche sur la première plutôt que sur la taille de la fenêtre.",
    ],
    then:
      "Jusqu'en 2025, les modèles affichaient des scores presque parfaits au test de l'aiguille dans la botte de foin, où il suffit de retrouver une phrase recopiée mot pour mot, et on en concluait qu'ils lisaient aussi bien un long texte qu'un court. Les études de 2025, dont celle de Chroma, ont montré ce que ce test cachait, et le mot s'est installé dans l'année. En février 2026, Anthropic présentait Claude Opus 4.6 comme une réponse à cette plainte, avec 76 %, selon ses propres mesures, sur un test qui cache huit informations dans un million de tokens, contre 18,5 % pour Claude Sonnet 4.5.",
    office: [
      {who: 'q', text: "J'ai collé les quarante pages du dossier client dans la conversation pour qu'il ne manque de rien. Bonne idée, non ?"},
      {who: 'a', text: "Il a tout sous les yeux, mais chaque page en trop lui fait moins bien lire les autres ; colle les trois documents qui servent à ta question, et ouvre une nouvelle conversation pour la suivante."},
    ],
    avoid:
      "« Il reste 600 000 tokens dans la fenêtre, on a de la marge. » La taille de la fenêtre dit jusqu'où le harness accepte de continuer, et la qualité baisse bien avant ; en 2025, des modèles qui retrouvaient pourtant toute l'information utile voyaient leurs scores baisser de 13,9 à 85 %, loin de leur limite.",
    video: null,
    sources: [
      {label: "Simon Willison, A quote from Workaccount2 on Hacker News, 18 juin 2025 (« They poison their own context. Maybe you can call it context rot, where as context grows and especially if it grows with lots of distractions and dead ends, the output quality falls off rapidly »)", url: 'https://simonwillison.net/2025/Jun/18/context-rot/'},
      {label: "Hacker News, commentaire de Workaccount2, 18 juin 2025", url: 'https://news.ycombinator.com/item?id=44310054'},
      {label: "Anthropic, Effective context engineering for AI agents, 29 septembre 2025 (context rot : « as the number of tokens in the context window increases, the model's ability to accurately recall information from that context decreases » ; n² relations par paires pour n tokens ; budget d'attention)", url: 'https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents'},
      {label: "Hong, Troynikov et Huber (Chroma), Context Rot: How Increasing Input Tokens Impacts LLM Performance, 14 juillet 2025, section Repeated Words (tâche « apple » / « apples », jusqu'à 10 000 mots, température 0 ; familles Claude, GPT, Gemini et Qwen ; refus, mots aléatoires absents de l'entrée ; Qwen3-8B, vers 5 000 mots : « I'm going to take a break [...] Maybe go to the beach » ; section LongMemEval : entrées ciblées d'environ 300 tokens nettement mieux réussies que les entrées complètes d'environ 113k tokens ; section Impact of Distractors : un distracteur fait baisser les scores, quatre davantage)", url: 'https://www.trychroma.com/research/context-rot'},
      {label: "Du et al. (University of Illinois Urbana-Champaign, Amazon...), Context Length Alone Hurts LLM Performance Despite Perfect Retrieval, 6 octobre 2025, Findings of EMNLP 2025, résumé (5 modèles ; maths, questions-réponses, code ; baisse de 13,9 % à 85 % malgré une récupération parfaite, bien en deçà des longueurs annoncées ; même avec des espaces à la place du texte inutile)", url: 'https://arxiv.org/abs/2510.05381'},
      {label: "Claude Code, Best practices (« Claude's context window fills up fast, and performance degrades as it fills » ; /clear entre tâches sans rapport ; sous-agents dans des fenêtres séparées ; /btw dont la réponse n'entre pas dans l'historique ; « The kitchen sink session »)", url: 'https://code.claude.com/docs/en/best-practices'},
      {label: "Matt Pocock, Dictionary of AI Coding, entrée Smart zone (smart zone et dumb zone ; « the dumb zone commonly begins around 125K-150K tokens, though this is debated » ; prévoir le travail sur la smart zone plutôt que sur la fenêtre)", url: 'https://github.com/mattpocock/dictionary-of-ai-coding/blob/main/dictionary/Smart%20zone.md'},
      {label: "Anthropic, Introducing Claude Opus 4.6, 5 février 2026 (« A common complaint about AI models is context rot » ; MRCR v2, variante 8 aiguilles à 1M tokens : 76 % pour Opus 4.6, 18,5 % pour Sonnet 4.5)", url: 'https://www.anthropic.com/news/claude-opus-4-6'},
    ],
  },
  {
    id: 'non-determinisme',
    status: 'live',
    title: 'Non-déterminisme',
    en: 'non-determinism',
    aliases: ['nondeterminism', 'non-deterministic output', 'batch invariance', 'pass^k', 'reproducibility'],
    aliasesFr: ['non déterministe', 'reproductibilité', 'variabilité des réponses'],
    jargon: [
      {say: 'pass^k', means: "la probabilité qu'un agent réussisse k fois sur k la même tâche ; elle baisse quand k augmente, à l'inverse de pass@k, qui demande une seule réussite en k essais"},
      {say: 'seed', means: "un nombre qu'on passe à certaines API pour rendre le tirage répétable ; OpenAI ne promet depuis novembre 2023 qu'un « meilleur effort »"},
      {say: 'batch invariance', means: "la propriété d'un serveur qui calcule ta requête de la même façon, qu'elle soit seule ou mêlée à celles d'autres utilisateurs"},
    ],
    cat: 'comportements',
    links: ['temperature', 'prediction-du-mot-suivant', 'evals', 'llm-juge', 'sortie-structuree', 'loop'],
    short:
      "Le non-déterminisme désigne le fait qu'une même demande, envoyée deux fois au même modèle, peut recevoir deux réponses différentes, même avec le hasard réglé au minimum.",
    image:
      "Le 13 décembre 2021 à midi, le tirage des huitièmes de finale de la Ligue des champions envoie le PSG contre Manchester United. L'UEFA l'annule pour un « problème technique » dans le logiciel d'un prestataire et recommence à 15 h, avec le même règlement, les mêmes équipes et les mêmes boules, et le PSG tire le Real Madrid.",
    imagineForm: 'A',
    imagine:
      "En avril 2026, la société Simular a fait passer dix fois chacune des tâches d'OSWorld, un banc d'essai de travaux de bureau sur un vrai ordinateur, à son agent Agent S3, qui s'appuie sur GPT-5. Confie-lui une de ces tâches chaque matin pendant deux semaines de travail. Pour environ 78 tâches sur 100, il la réussit au moins un matin, et pour 36 seulement, il la réussit les dix matins.",
    full: [
      "À chaque pas, le modèle tire le token suivant au sort parmi les candidats, pondérés par leurs probabilités. Ce hasard est voulu, car prendre toujours le favori donne des textes plats et répétitifs, comme l'a montré dès 2019 une équipe de l'université de Washington. Un seul token différent au début suffit à changer toute la suite, et deux réponses à la même question peuvent prendre deux chemins entiers, avec un autre plan et une autre conclusion.",
      "Régler la température à zéro, pour prendre toujours le token le plus probable, ne suffit pas. La documentation de l'API de Claude prévient qu'à température 0 les résultats ne sont pas entièrement déterministes, et en septembre 2025, Horace He, de Thinking Machines Lab, a expliqué pourquoi. Les ordinateurs calculent avec des nombres arrondis, et l'ordre des additions change le résultat, au point que huit nombres, additionnés dans des ordres différents, lui ont donné 102 sommes distinctes. Pour aller plus vite, un serveur calcule ta requête dans un même lot que celles d'autres personnes, et la taille de ce lot change l'ordre des calculs. Ta réponse dépend donc aussi de qui d'autre interroge le modèle au même moment.",
      "Pour tester, un seul essai ne prouve rien. En janvier 2026, Anthropic recommandait de lancer plusieurs fois chaque test d'agent et de suivre deux mesures, pass@k, la chance de réussir au moins une fois en k essais, et pass^k, celle de réussir les k fois. Un agent qui réussit 75 % de ses essais ne passe trois essais de suite que dans 42 % des cas. La première mesure compte pour un outil où l'on peut relancer et garder le bon résultat, la seconde pour un agent dont le client attend la bonne réponse à chaque fois.",
      "Le hasard sert aussi d'excuse, dans un sens comme dans l'autre. Pendant l'été 2025, des utilisateurs de Claude se sont plaints de réponses dégradées, et le 17 septembre, Anthropic a reconnu trois bugs d'infrastructure, dont un qui glissait des caractères thaïs au milieu de réponses en anglais. Selon l'entreprise, ils étaient difficiles à repérer parce que leurs effets variaient d'une requête à l'autre. Une série de mauvaises réponses peut venir de mauvais tirages ou d'un vrai changement, et seules des mesures répétées permettent de trancher.",
    ],
    then:
      "En 2023 et 2024, l'écart à température 0 passait pour une fatalité du calcul parallèle sur les puces graphiques, et OpenAI n'offrait, depuis novembre 2023, qu'un paramètre seed au « meilleur effort ». En septembre 2025, Thinking Machines Lab a montré que le regroupement des requêtes en était la cause principale. En rendant ses calculs indépendants du lot, il a obtenu 1 000 réponses identiques sur 1 000, au prix d'un service plus lent, 42 secondes au lieu de 26 sur son test de vitesse. Depuis octobre 2025, vLLM, un logiciel libre très utilisé pour servir des modèles, propose ce mode avec un simple réglage.",
    office: [
      {who: 'q', text: "Le même prompt m'a sorti un tableau parfait hier et un tableau faux aujourd'hui. Lequel je crois ?"},
      {who: 'a', text: "Aucun des deux tant que tu ne l'as pas relancé une dizaine de fois sur des cas dont tu connais la réponse ; c'est le taux de réussite sur la série qui te dit si tu peux t'en servir."},
    ],
    avoid:
      "« Il s'est trompé deux fois ce matin, ils ont dégradé le modèle. » Deux mauvaises réponses peuvent n'être que deux mauvais tirages ; avant de conclure, relance la même série de tests et compare son taux de réussite à celui de la semaine dernière.",
    video: null,
    sources: [
      {label: "UEFA, Champions League round of 16 draw declared void and will be redone at 15:00 CET, 13 décembre 2021 (« Following a technical problem with the software of an external provider »)", url: 'https://www.uefa.com/uefachampionsleague/news/0270-13f2ac0aff13-74f2ff9e43b1-1000/'},
      {label: "Wikipédia, 2021-22 UEFA Champions League knockout phase (tirage de 12 h annulé, refait à 15 h ; Paris Saint-Germain contre Manchester United au premier tirage, contre le Real Madrid au second)", url: 'https://en.wikipedia.org/wiki/2021%E2%80%9322_UEFA_Champions_League_knockout_phase'},
      {label: "Gonzalez-Pumariega et al. (Simular), On the Reliability of Computer Use Agents, 20 avril 2026, figure 1 (Agent S3 avec GPT-5 sur OSWorld : Pass@10 d'environ 78 %, Pass^10 d'environ 36 %, réussite aux 10 exécutions)", url: 'https://arxiv.org/abs/2604.17849'},
      {label: "Holtzman et al. (University of Washington, Allen Institute for AI), The Curious Case of Neural Text Degeneration, 22 avril 2019, résumé (décoder en maximisant la probabilité donne un texte « bland and strangely repetitive »)", url: 'https://arxiv.org/abs/1904.09751'},
      {label: "Claude API, Messages, paramètre temperature (« Note that even with temperature of 0.0, the results will not be fully deterministic »)", url: 'https://platform.claude.com/docs/en/api/messages/create'},
      {label: "Horace He et Thinking Machines Lab, Defeating Nondeterminism in LLM Inference, 10 septembre 2025 (non-associativité des nombres à virgule flottante ; 8 valeurs sommées dans des ordres différents, 102 résultats ; absence d'invariance au lot comme cause ; avec des noyaux invariants, 1 000 complétions identiques ; vLLM par défaut 26 s, déterministe non optimisé 55 s, avec attention améliorée 42 s)", url: 'https://thinkingmachines.ai/blog/defeating-nondeterminism-in-llm-inference/'},
      {label: "vLLM, Batch Invariance (« the output of a model is deterministic and independent of the batch size or the order of requests in a batch » ; VLLM_BATCH_INVARIANT=1 ; coût en performance assumé)", url: 'https://docs.vllm.ai/en/latest/features/batch_invariance/'},
      {label: "vLLM sur X, 22 octobre 2025 (annonce de l'inférence invariante au lot avec VLLM_BATCH_INVARIANT=1)", url: 'https://x.com/vllm_project/status/1981088861506982041'},
      {label: "OpenAI Cookbook, How to make your completions outputs consistent with the new seed parameter, 6 novembre 2023 (« best effort to sample deterministically » ; « Determinism is not guaranteed »)", url: 'https://developers.openai.com/cookbook/examples/reproducible_outputs_with_the_seed_parameter'},
      {label: "Anthropic, Demystifying evals for AI agents, 9 janvier 2026 (le comportement varie d'une exécution à l'autre ; pass@k et pass^k ; « 75% per-trial success rate [...] 3 trials [...] (0.75)³ ≈ 42% » ; pass@k quand une réussite suffit, pass^k quand la constance est essentielle)", url: 'https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents'},
      {label: "Anthropic, A postmortem of three recent issues, 17 septembre 2025 (trois bugs d'infrastructure en août et septembre 2025 ; caractères thaïs comme « สวัสดี » au milieu de réponses en anglais ; « behavior was frustratingly inconsistent »)", url: 'https://www.anthropic.com/engineering/a-postmortem-of-three-recent-issues'},
    ],
  },
  {
    id: 'sans-etat',
    status: 'live',
    title: 'Session, tour et sans état',
    en: 'stateless model, session, turn',
    aliases: ['stateless', 'statelessness', 'turn', 'model provider request', 'clearing', 'context reset'],
    aliasesFr: ['sans état', 'session', 'tour de conversation', 'requête au fournisseur', 'vider la session'],
    jargon: [
      {say: 'stateless', means: "« sans état », se dit d'un système qui ne garde rien d'une requête à l'autre ; c'est le mot qu'emploie la documentation de l'API de Claude pour elle-même"},
      {say: '/clear', means: "la commande de Claude Code qui ouvre une session vide ; l'ancienne reste enregistrée sur ton disque et se reprend avec claude --resume"},
      {say: 'previous_response_id', means: "le paramètre de l'API d'OpenAI qui garde la conversation sur ses serveurs, sans rien changer à la facture, puisque les tokens des échanges précédents restent comptés en entrée"},
    ],
    cat: 'agents',
    links: ['fenetre-de-contexte', 'memoire', 'mythe-apprend-de-nos-conversations', 'compaction-du-contexte', 'agents-md', 'context-rot'],
    short:
      "Un modèle ne garde rien d'une requête à l'autre ; pour tenir une session de plusieurs tours, le harness lui renvoie à chaque requête tout l'historique, consignes comprises.",
    image:
      "Dans Amour et Amnésie, Lucy oublie chaque nuit tout ce qu'elle a vécu dans la journée, et Henry lui laisse au réveil une cassette qui raconte l'accident, leur rencontre et tout ce qui a suivi. Elle se lève chaque matin parfaitement au courant, et la cassette s'allonge d'un jour à chaque fois.",
    imagineForm: 'E',
    imagine:
      "Ton script envoie à l'API de Claude « Je m'appelle Josette », puis, dans une seconde requête, « Comment je m'appelle ? », et Claude répond qu'il n'en a aucune idée. Tu ajoutes une ligne au script pour qu'il recolle devant la seconde question ton premier message et la réponse de Claude, et cette fois Claude répond « Tu t'appelles Josette ».",
    full: [
      "Un modèle de langage reçoit un texte, calcule la suite et ne garde rien. L'API de Claude se décrit comme sans état (stateless), et sa documentation précise qu'il faut lui renvoyer à chaque appel tout l'historique de la conversation. Elle ajoute que les tours précédents n'ont pas besoin de venir réellement de Claude. Un harness peut donc glisser dans l'historique une réponse que le modèle n'a jamais écrite, et rien dans la requête ne permet au modèle de la distinguer des siennes.",
      "Trois mots servent à s'y retrouver. Une requête est un aller-retour entre le harness et le fournisseur du modèle, qui reçoit tout le contexte et renvoie une réponse, texte ou appel d'outil. Un tour commence quand tu envoies un message et s'achève quand l'agent te rend la main, et il contient souvent des dizaines de requêtes, une par résultat d'outil à lire. La session rassemble tous les tours depuis la dernière remise à zéro, et c'est elle qui remplit peu à peu la fenêtre de contexte.",
      "Tout renvoyer se paie. Au fil d'un tour, chaque requête relit ce que la précédente avait lu, plus le dernier résultat d'outil, et chaque token d'entrée se facture à chaque passage. Le cache de prompt évite de tout recalculer, et chez Anthropic, un passage déjà en cache coûte en général 10 % du prix normal, s'il ressert dans les cinq minutes. L'API d'OpenAI peut garder la conversation sur ses serveurs, mais sa documentation précise que tous les tokens des réponses précédentes restent facturés comme entrée.",
      "Dans Claude Code, chaque session démarre avec une fenêtre de contexte neuve, sans l'historique des précédentes. La conversation reste pourtant écrite au fil de l'eau dans un fichier sur ton disque, ce qui permet de la reprendre, et /clear ouvre une session vide sans effacer ce fichier. Ce qu'une session doit transmettre à la suivante s'écrit donc ailleurs, dans un fichier qu'elle relira en démarrant, CLAUDE.md, la mémoire de l'agent ou une note de passation.",
    ],
    office: [
      {who: 'q', text: "Pourquoi ma petite question à l'agent a consommé 80 000 tokens ?"},
      {who: 'a', text: "Dans ce tour, il a lu des fichiers et lancé des commandes, et chaque résultat a déclenché une nouvelle requête qui renvoyait toute la session ; compte ses requêtes, pas tes messages."},
    ],
    avoid:
      "« Il a appris notre projet au fil de la session. » Rien n'a bougé dans ses paramètres ; il relit à chaque requête une session de plus en plus longue, et un /clear la lui retire d'un coup.",
    video: null,
    sources: [
      {label: "Wikipédia, Amour et Amnésie (50 First Dates, Peter Segal, 2004 ; Lucy oublie chaque nuit ce qu'elle a fait dans la journée)", url: 'https://fr.wikipedia.org/wiki/Amour_et_Amn%C3%A9sie'},
      {label: "Wikipedia, 50 First Dates, section Plot (vidéo préparée par Henry, que Lucy regarde au réveil et qui la met au courant ; cassette « Good Morning Lucy » complétée au fil du temps)", url: 'https://en.wikipedia.org/wiki/50_First_Dates'},
      {label: "Claude API, Using the Messages API, section Multiple conversational turns (« The Messages API is stateless, which means that you always send the full conversational history to the API » ; « Earlier conversational turns don't necessarily need to actually originate from Claude. You can use synthetic assistant messages »)", url: 'https://platform.claude.com/docs/en/build-with-claude/working-with-messages'},
      {label: "Matt Pocock, Dictionary of AI Coding, entrées Stateless, Session, Turn et Model provider request (hiérarchie session, tour, requête ; un tour contient une ou plusieurs requêtes, une par résultat d'outil)", url: 'https://github.com/mattpocock/dictionary-of-ai-coding/blob/main/dictionary/Turn.md'},
      {label: "Claude API, Prompt caching (cache de 5 minutes par défaut, rafraîchi à chaque usage ; lectures du cache à 0,1 fois le prix d'entrée de base, avec des exceptions par modèle)", url: 'https://platform.claude.com/docs/en/build-with-claude/prompt-caching'},
      {label: "OpenAI API, Conversation state (« While each text generation request is independent and stateless » ; « Even when using previous_response_id, all previous input tokens for responses in the chain are billed as input tokens in the API »)", url: 'https://developers.openai.com/api/docs/guides/conversation-state'},
      {label: "Claude Code, How Claude Code works (conversation enregistrée en JSONL sous ~/.claude/projects/ ; « Each new session starts with a fresh context window, without the conversation history from previous sessions »)", url: 'https://code.claude.com/docs/en/how-claude-code-works'},
      {label: "Claude Code, Manage sessions (sessions enregistrées en continu, qu'on peut reprendre après avoir quitté ou lancé /clear ; claude --resume)", url: 'https://code.claude.com/docs/en/sessions'},
    ],
  },
  {
    id: 'connaissances-parametriques',
    status: 'live',
    title: 'Connaissances paramétriques et contextuelles',
    en: 'parametric and contextual knowledge',
    aliases: ['parametric knowledge', 'contextual knowledge', 'parametric memory', 'in-context knowledge', 'knowledge conflicts', 'context-memory conflict'],
    aliasesFr: ['connaissances paramétriques', 'connaissances contextuelles', 'mémoire paramétrique', 'conflit de connaissances'],
    jargon: [
      {say: 'parametric knowledge', means: "ce que le modèle sait par ses paramètres, appris pendant l'entraînement et figé à sa date de coupure"},
      {say: 'in-context', means: "« dans le contexte », se dit de ce que le modèle lit dans la conversation au moment de répondre"},
      {say: 'knowledge conflict', means: "le cas où le contexte contredit ce que le modèle a appris, et où tout se joue sur celui des deux qu'il suit"},
      {say: 'grounding', means: "ancrer une réponse dans des documents fournis, pour qu'elle s'appuie sur le contexte plutôt que sur la mémoire du modèle"},
    ],
    cat: 'fondations',
    links: ['parametres', 'rag', 'date-de-coupure', 'fenetre-de-contexte', 'mythe-base-de-donnees', 'mythe-a-lu-tout-internet'],
    short:
      "Un modèle tient ses connaissances de deux sources, ses paramètres, figés à l'entraînement et parfois flous, et son contexte, qu'il lit au moment de répondre, exact et à jour.",
    image:
      "Raymond connaît par cœur les horaires du bus 42, ceux d'avant le changement de 2023, et les récite avec l'aplomb d'un chef de gare. Depuis que sa fille a collé la fiche à jour sur le frigo, il ne rate plus un bus, sauf la semaine où elle s'était trompée d'une ligne en la recopiant.",
    imagineForm: 'D',
    imagine:
      "« Je t'ai recopié la page Wikipédia du 100 mètres, quel est le record olympique ? », demande Agnès, qui a tapé 9,36 au lieu de 9,63. « Le record olympique est de 9,36 secondes, établi par Usain Bolt aux Jeux de Londres en 2012 », répond l'assistant.",
    full: [
      "Ce qu'un modèle sait lui vient de deux endroits. Les connaissances paramétriques sont celles que l'entraînement a déposées dans ses paramètres ; il les retrouve sans qu'on lui fournisse rien, mais elles sont figées à sa date de coupure et d'autant plus floues que le sujet était rare dans ses lectures. En février 2026, une équipe de Google a mesuré que Gemini 3 Pro avait appris presque tous les faits des pages Wikipédia les moins consultées, mais n'en retrouvait de tête que 63,3 %, contre 84,6 % pour les pages les plus vues. Les connaissances contextuelles sont celles qu'il lit dans sa fenêtre au moment de répondre, ta question, un document collé, le résultat d'une recherche web. Elles sont exactes et à jour, mais occupent de la place et se paient en tokens.",
      "Quand les deux se contredisent, le contexte l'emporte le plus souvent, même quand il a tort. Une équipe de Stanford a soumis à six modèles, dont GPT-4o, plus de 1 200 questions, des doses de médicaments aux records olympiques, chacune accompagnée d'un document où l'on avait glissé une erreur. Dans cette étude, présentée à NeurIPS fin 2024, les modèles reprenaient l'erreur plus de 60 % du temps alors qu'ils connaissaient la bonne réponse, d'autant plus volontiers que l'erreur était vraisemblable et qu'ils étaient peu sûrs d'eux.",
      "L'inverse arrive aussi. Le 17 novembre 2025, Andrej Karpathy essayait Gemini 3 en avant-première sans l'outil de recherche Google, et le modèle refusait de croire qu'on était en 2025. Il tenait les articles et les images que Karpathy lui montrait pour des faux fabriqués par une IA, en relevant de prétendus indices, jusqu'à ce que Karpathy active la recherche ; le modèle a alors écrit qu'il subissait « un choc temporel massif ». Dans le code, l'ancienne habitude revient de la même façon. Une étude présentée à ICSE 2025 a fait compléter par sept modèles du code qui appelait des fonctions Python devenues obsolètes. Ils reprenaient l'ancienne version dans 70 à 90 % des cas quand le code voisin l'utilisait déjà, contre 9 à 18 % quand il était à jour.",
      "La règle pratique en découle. Quand un fait est rare, postérieur à la date de coupure ou propre à ton entreprise, donne-le dans le contexte plutôt que de compter sur la mémoire du modèle, et pour une consigne qui contredit ses habitudes, écris-la clairement, près de l'endroit où elle sert. Comme le contexte gagne même quand il se trompe, relis aussi ce que tu y mets.",
    ],
    office: [
      {who: 'q', text: "On a collé la grille tarifaire 2026 dans le prompt, et il cite encore parfois les prix de l'an dernier. Pourquoi ?"},
      {who: 'a', text: "Les anciens prix sont dans ses paramètres et les nouveaux dans son contexte, et au fil d'une longue conversation l'habitude peut reprendre le dessus ; rappelle la grille au moment de la question, et demande-lui de citer la ligne qu'il utilise."},
    ],
    avoid:
      "« Si je lui donne le document, il ne peut plus se tromper. » Il suit le document même quand le document a tort, et les modèles testés à Stanford reprenaient une erreur glissée dans le texte plus de 60 % du temps.",
    video: null,
    sources: [
      {label: "Wikipedia, List of Olympic records in athletics (100 m hommes : 9,63 s, Usain Bolt, Jeux de 2012 à Londres)", url: 'https://en.wikipedia.org/wiki/List_of_Olympic_records_in_athletics'},
      {label: "Calderon et al. (Google Research, Technion), Empty Shelves or Lost Keys? Recall Is the Bottleneck for Parametric Factuality, 15 février 2026, révisé le 19 juin 2026, ICML 2026, section 5 (pour Gemini-3-Pro, faits encodés à 99,5 % pour les 20 % de pages les plus vues contre 94,5 % pour les 20 % les moins vues ; rappel direct des faits encodés de 84,6 % contre 63,3 %)", url: 'https://arxiv.org/abs/2602.14080'},
      {label: "Wu, Wu et Zou (Stanford), ClashEval: Quantifying the tug-of-war between an LLM's internal prior and external evidence, avril 2024, révisé le 7 février 2025, NeurIPS 2024 Datasets and Benchmarks, résumé (plus de 1 200 questions sur six domaines, dont doses de médicaments et records olympiques ; six modèles dont GPT-4o ; contenu incorrect adopté « over 60% of the time » contre une connaissance correcte ; moins adopté quand il est irréaliste ; plus adopté quand le modèle est peu confiant)", url: 'https://arxiv.org/abs/2404.10198'},
      {label: "Andrej Karpathy sur X, 18 novembre 2025 (« I played with Gemini 3 yesterday via early access »)", url: 'https://x.com/karpathy/status/1990854771058913347'},
      {label: "Andrej Karpathy sur X, 18 novembre 2025 (le modèle « refused to believe me that it is 2025 » ; images et articles tenus pour des faux générés par IA, « dead giveaways » ; « I forgot to turn on the \"Google Search\" tool »)", url: 'https://x.com/karpathy/status/1990855382756164013'},
      {label: "TechCrunch, Gemini 3 refused to believe it was 2025, and hilarity ensued, 20 novembre 2025 (réponse du modèle après activation de la recherche : « I am suffering from a massive case of temporal shock right now »)", url: 'https://techcrunch.com/2025/11/20/gemini-3-refused-to-believe-it-was-2025-and-hilarity-ensued/'},
      {label: "Wang et al., LLMs Meet Library Evolution: Evaluating Deprecated API Usage in LLM-based Code Completion, ICSE 2025, version du 13 février 2025 (7 modèles, 145 correspondances d'API dans 8 bibliothèques Python ; taux d'usage obsolète de 70 à 90 % dans les fonctions qui utilisent l'ancienne API, de 9 à 18 % dans celles qui sont à jour)", url: 'https://arxiv.org/abs/2406.09834'},
    ],
  },
];

// Lexique IA, vague 11, lot Z (méthode : travailler avec un agent). Format identique à lexique/terms.js, sans `num`.
// imagineForm : forme de l'« Imagine » (content/dico/univers.md, section « Les formes de l'Imagine »).
// Faits, chiffres et citations relevés le 3 octobre 2026 sur les pages citées dans `sources`.
module.exports = [
  {
    id: 'agents-md',
    status: 'live',
    title: 'AGENTS.md',
    en: 'AGENTS.md',
    aliases: ['AGENTS.md', 'CLAUDE.md', 'GEMINI.md', '.cursor/rules', 'context file', 'agent instructions file', 'agent experience', 'AX'],
    aliasesFr: ['fichier de consignes', 'fichier de contexte', 'expérience agent'],
    jargon: [
      {say: '/init', means: "la commande de Claude Code qui fait écrire au modèle un premier CLAUDE.md à partir du code du projet, un brouillon à élaguer ensuite"},
      {say: 'AGENTS.md imbriqués', means: "un fichier par sous-dossier ; l'agent suit celui qui est le plus proche du fichier qu'il modifie, qui l'emporte sur ceux du dessus"},
      {say: 'AX, agent experience', means: "la façon dont un projet accueille l'agent qui y travaille, sur le modèle de l'expérience utilisateur (UX) et de l'expérience développeur (DX)"},
    ],
    cat: 'methode',
    links: ['system-prompt', 'skill', 'memoire', 'context-engineering', 'sans-etat', 'passation'],
    short:
      "AGENTS.md est un fichier texte placé dans un projet, que les agents de code lisent au début de chaque session pour connaître ses commandes, ses conventions et ses pièges.",
    image:
      "En congé pour trois mois, Mme Garnier a scotché sur son bureau une page que relit chaque matin la remplaçante du jour, qui n'est jamais la même. Le programme de maths n'y figure pas, il est dans le manuel ; la page dit que la porte du fond ferme mal, que la cantine passe à 11 h 40 le jeudi et qu'Enzo n'a plus droit aux ciseaux.",
    imagineForm: 'A',
    imagine:
      "Des chercheurs de l'ETH Zurich ont publié en février 2026 une expérience où ils faisaient travailler des agents de code sur les mêmes tâches, avec et sans fichier AGENTS.md. Quand ce fichier avait été rédigé par un modèle, ils ne réussissaient pas plus de tâches et dépensaient environ 20 % de plus pour y arriver, l'équivalent d'un trajet de 12 kilomètres pour une adresse qui était à 10.",
    full: [
      "Un agent de code commence chaque session sans rien savoir du projet, ni la commande qui lance les tests, ni le dossier qu'on ne modifie jamais, ni la règle adoptée après la panne du mois dernier. Le harness lui donne donc, avant ton premier message, le contenu d'un fichier texte rangé dans le projet. Chaque outil a d'abord eu le sien, CLAUDE.md pour Claude Code, GEMINI.md pour Gemini CLI, des règles dans .cursor/rules pour Cursor. OpenAI a proposé AGENTS.md en août 2025 comme nom commun, et le 9 décembre 2025, le fichier a rejoint MCP à la Linux Foundation, au sein d'une nouvelle Agentic AI Foundation. La fondation l'annonçait alors adopté par plus de 60 000 projets open source, et le site du standard affiche toujours ce chiffre en octobre 2026.",
      "Le fichier est relu à chaque session, et chaque ligne coûte donc de la place dans la fenêtre de contexte, à chaque fois. La documentation de Claude Code conseille de rester sous 200 lignes et de se demander, pour chacune, si sa disparition ferait faire une erreur à l'agent. L'équipe d'OpenAI qui a écrit un produit entier avec Codex a essayé le grand fichier unique et y a renoncé, parce que lorsque tout est important, rien ne l'est, et que les règles périmées s'y accumulent sans que l'agent sache lesquelles tiennent encore. Son AGENTS.md fait environ 100 lignes et sert de sommaire, avec des renvois vers les documents du dossier docs/, que l'agent n'ouvre que lorsqu'il en a besoin.",
      "L'étude de l'ETH dit aussi ce qui marche. Les consignes du fichier sont suivies à la lettre, au point que les agents lançaient l'outil uv 1,6 fois par tâche quand le fichier le citait, contre moins d'une fois toutes les cent tâches sans lui. Les présentations générales du projet, elles, n'aidaient pas, sans doute parce que l'agent trouve la même chose en lisant le code. Un bon AGENTS.md garde donc ce qui ne se devine pas, une commande, un piège, une convention maison. Une autre étude, publiée en janvier 2026 sur 124 demandes de modification réelles, trouvait d'ailleurs qu'avec le fichier du projet, les agents finissaient en un temps médian plus court de 28,64 %, pour une réussite comparable.",
      "En janvier 2025, Mathias Biilmann, le patron de Netlify, a proposé de parler d'agent experience (AX), l'expérience qu'un agent vit en utilisant un produit, comme on parlait d'expérience utilisateur et d'expérience développeur. Dans un projet de code, l'AX va au-delà du fichier, puisqu'elle tient aussi à des vérifications que l'agent peut lancer seul, à une architecture qu'il peut suivre et à une fenêtre qu'on n'encombre pas.",
    ],
    then:
      "En 2025, Claude Code ignorait AGENTS.md, et un projet qui servait aussi à Codex ou à Cursor devait importer ce fichier depuis son CLAUDE.md ou créer un lien de l'un vers l'autre. Depuis le 18 septembre 2026, Claude Code lit lui aussi AGENTS.md quand le projet n'a pas de CLAUDE.md, le fichier que Codex, Cursor, GitHub Copilot ou Devin lisaient déjà.",
    office: [
      {who: 'q', text: "On a fait écrire notre AGENTS.md par l'agent, il fait 600 lignes. C'est bon, on est couverts ?"},
      {who: 'a', text: "Garde ce qu'il ne devinerait pas en lisant le code, la commande de test, le dossier généré à ne pas toucher, la règle née d'un incident, et coupe le reste. Dans l'étude de l'ETH, les fichiers écrits par un modèle coûtaient plus cher sans faire réussir plus de tâches."},
    ],
    avoid:
      "« C'est écrit dans AGENTS.md, donc il ne le fera pas. » Le fichier est lu comme du contexte, pas appliqué comme une règle, et la documentation de Claude Code renvoie à un hook, un script qui bloque l'action avant qu'elle parte, pour ce qui doit être interdit à coup sûr.",
    video: null,
    sources: [
      {label: "AGENTS.md, site officiel du standard (« used by over 60k open-source projects » ; « a README for agents » ; fichiers imbriqués, le plus proche l'emporte ; 88 fichiers AGENTS.md dans le dépôt principal d'OpenAI ; administré par l'Agentic AI Foundation de la Linux Foundation), consulté le 3 octobre 2026", url: 'https://agents.md/'},
      {label: "Linux Foundation, communiqué du 9 décembre 2025 (création de l'Agentic AI Foundation avec MCP, goose et AGENTS.md ; AGENTS.md « released by OpenAI in August 2025 », adopté par plus de 60 000 projets open source et par Amp, Codex, Cursor, Devin, Factory, Gemini CLI, GitHub Copilot, Jules et VS Code)", url: 'https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation'},
      {label: "Gloaguen et al. (ETH Zurich), Evaluating AGENTS.md: Are Repository-Level Context Files Helpful for Coding Agents?, 12 février 2026 (fichiers générés par un modèle : pas de gain de réussite, coût d'inférence +20 % sur SWE-bench et +23 % sur CTXbench ; fichiers écrits par les développeurs : +2,4 % de réussite, non significatif ; uv lancé 1,6 fois par tâche quand le fichier le cite, contre moins de 0,01 fois sinon ; les présentations du dépôt n'aident pas). Calcul de l'Imagine : 10 km x 1,2 = 12 km", url: 'https://arxiv.org/abs/2602.11988'},
      {label: "Lulla et al., On the Impact of AGENTS.md Files on the Efficiency of AI Coding Agents, 28 janvier 2026 (10 dépôts, 124 pull requests ; temps d'exécution médian -28,64 %, tokens de sortie -16,58 %, taux de réussite comparable)", url: 'https://arxiv.org/abs/2601.20404'},
      {label: "Claude Code, Best practices (CLAUDE.md lu au début de chaque conversation ; « Would removing this cause Claude to make mistakes? » ; à inclure et à exclure ; CLAUDE.md « advisory », hooks déterministes)", url: 'https://code.claude.com/docs/en/best-practices'},
      {label: "Claude Code, How Claude remembers your project (CLAUDE.md lus au début de chaque session ; « context, not enforced configuration », hook PreToolUse pour bloquer ; viser moins de 200 lignes ; /init ; lecture d'AGENTS.md à partir de la version 2.1.277 quand le projet n'a pas de CLAUDE.md)", url: 'https://code.claude.com/docs/en/memory'},
      {label: "Claude Code, journal des modifications, version 2.1.277 (« Added AGENTS.md support: in a project with no CLAUDE.md, Claude Code reads AGENTS.md instead »)", url: 'https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md'},
      {label: "npm, historique des versions de @anthropic-ai/claude-code (version 2.1.277 publiée le 18 septembre 2026)", url: 'https://www.npmjs.com/package/@anthropic-ai/claude-code?activeTab=versions'},
      {label: "OpenAI, Codex, Custom instructions with AGENTS.md (fichiers lus de la racine du dépôt jusqu'au dossier courant, le plus proche en dernier ; limite par défaut de 32 Kio)", url: 'https://learn.chatgpt.com/docs/agent-configuration/agents-md'},
      {label: "Ryan Lopopolo (OpenAI), Harness engineering: leveraging Codex in an agent-first world, 11 février 2026 (échec du « one big AGENTS.md » ; « When everything is \"important,\" nothing is » ; AGENTS.md d'environ 100 lignes utilisé comme sommaire, connaissances dans docs/)", url: 'https://openai.com/index/harness-engineering/'},
      {label: "Cursor, Rules (règles de projet dans .cursor/rules ; AGENTS.md accepté, fichiers imbriqués ; règles de moins de 500 lignes)", url: 'https://cursor.com/docs/context/rules'},
      {label: "Gemini CLI, GEMINI.md (fichiers de contexte concaténés et envoyés au modèle avec chaque prompt ; nom configurable, AGENTS.md compris)", url: 'https://geminicli.com/docs/cli/gemini-md/'},
      {label: "Matt Pocock, AI Coding Dictionary, AI Hero (AGENTS.md, « the project's standing brief to the agent » ; AX, « how well the environment is set up for an agent to do good work: checks, architecture, and free context »), consulté le 3 octobre 2026", url: 'https://www.aihero.dev/ai-coding-dictionary'},
      {label: "Mathias Biilmann, Introducing AX: Why Agent Experience Matters, 28 janvier 2025 (« the holistic experience AI agents will have as the user of a product or platform » ; après l'UX et la DX)", url: 'https://biilmann.blog/articles/introducing-ax/'},
    ],
  },
  {
    id: 'passation',
    status: 'live',
    title: 'Passation entre sessions',
    en: 'Handoff',
    aliases: ['handoff', 'session handoff', 'handoff artifact', 'handoff note', 'spec-driven development', 'SDD', 'primary source', 'secondary source'],
    aliasesFr: ['passation', 'note de passation', 'passage de relais', 'développement piloté par la spécification', 'source primaire', 'source secondaire'],
    jargon: [
      {say: 'handoff', means: "le passage de relais d'une session d'agent à la suivante, sans retour possible, puisque la nouvelle ne pourra pas interroger l'ancienne"},
      {say: 'spec', means: "la spécification, le document qui décrit ce qu'on construit sur plusieurs sessions, souvent découpé en tickets"},
      {say: 'ticket', means: "la part de travail d'une seule session, avec ce qui dira qu'elle est terminée"},
      {say: '/clear', means: "la commande de Claude Code qui vide la session en cours ; la suivante repart d'une fenêtre de contexte vide"},
    ],
    cat: 'methode',
    links: ['compaction-du-contexte', 'sans-etat', 'context-rot', 'agents-md', 'planification', 'dark-factory'],
    short:
      "La passation transmet un travail d'une session d'agent à la suivante par un document écrit, note, spec ou ticket, puisque la nouvelle session ne sait rien de l'ancienne.",
    image:
      "Avant trois semaines dans les Cévennes, sans réseau, Pierrette laisse au voisin un mot sur la table de la cuisine, « arroser les plantes deux fois par semaine ». Il l'a suivi avec un soin parfait, le cactus compris, et le ficus en plastique de l'entrée.",
    imagineForm: 'D',
    imagine:
      "« Pourquoi on a abandonné la bibliothèque de dates qu'on utilisait au début ? », demandes-tu à la session que tu viens d'ouvrir. « D'après la note de passation, elle a été remplacée hier, et c'est tout ce que j'en sais », répond-elle.",
    full: [
      "Une session d'agent finit toujours par s'arrêter, parce que sa fenêtre de contexte est pleine, parce que ses réponses se dégradent à mesure qu'elle s'allonge, ou parce que tu la vides toi-même avec /clear pour passer à autre chose. La session suivante repart de zéro, et ce qu'elle saura du travail déjà fait tient dans ce qu'on lui transmet. On appelle cela une passation (handoff), et elle va dans un seul sens, puisque la nouvelle session ne peut pas interroger l'ancienne. La compaction en est une forme automatique, où le modèle se résume lui-même ; les autres passent par un document, une note de passation, une spec ou un ticket.",
      "Tout document de ce genre est une source secondaire. Le code, l'historique git, les résultats des tests et la conversation elle-même sont des sources primaires, complètes mais coûteuses à relire, alors qu'un résumé coûte peu et perd forcément quelque chose. En avril 2025, une étude parue dans Royal Society Open Science a comparé 4 900 résumés d'articles scientifiques écrits par dix modèles aux textes d'origine. Les résumés laissaient tomber les détails qui limitaient la portée des conclusions, et DeepSeek, GPT-4o ou Llama 3.3 70B généralisaient trop dans 26 à 73 % des cas, même quand on leur demandait d'être précis.",
      "Une bonne note renvoie donc aux sources primaires au lieu de les paraphraser, avec les fichiers à rouvrir, la commande qui fait échouer le test et le commit où tout a changé, et elle garde ce qu'aucune d'elles ne contient, la raison des choix. Pour un chantier de plusieurs sessions, la documentation de Claude Code conseille de faire écrire une spec dans une session, puis de l'exécuter dans une session neuve. La spec utile nomme les fichiers concernés, dit ce qui sort du périmètre et se termine par une vérification de bout en bout.",
      "Le spec-driven development, le développement piloté par la spécification, fait de ce document le centre du travail. Kiro, l'éditeur de code lancé par AWS le 14 juillet 2025, produit des exigences, une conception et une liste de tâches avant d'écrire une ligne, et Spec Kit, publié par GitHub le 2 septembre 2025, enchaîne les commandes /specify, /plan et /tasks. En octobre 2025, Birgitta Böckeler a vu Kiro transformer un petit bug en 4 user stories et 16 critères d'acceptation. Elle y voyait un marteau-pilon pour écraser une noix, et avouait préférer relire du code plutôt que tous ces fichiers Markdown.",
    ],
    then:
      "Le 23 octobre 2025, l'agent de code Amp a supprimé sa compaction pour la remplacer par la passation. Tu donnais l'objectif de la session suivante, et Amp lui écrivait un prompt de départ avec la liste des fichiers utiles. Le 6 mai 2026, Amp a fait marche arrière, en jugeant que les modèles de 2026 compactaient assez bien pour que la compaction automatique, déclenchée à 90 % de la fenêtre, rende la passation inutile.",
    office: [
      {who: 'q', text: "La session rame, je vais la couper. Je lui demande un résumé de ce qu'on a fait ?"},
      {who: 'a', text: "Demande-lui plutôt une note pour la session suivante, avec ce qui reste à faire, les fichiers à rouvrir, la commande qui fait échouer le test et les pistes que vous avez écartées, avec leur raison, puisque cette raison n'est écrite nulle part ailleurs."},
    ],
    avoid:
      "« La spec est écrite, l'agent n'a plus qu'à la suivre. » Une spec est une source secondaire de plus, que l'agent lit à sa façon ; Birgitta Böckeler l'a vu régénérer des classes que la spec décrivait comme déjà existantes, et seul le code, relu ou testé, dit ce qui a vraiment été fait.",
    video: null,
    sources: [
      {label: "Matt Pocock, AI Coding Dictionary, AI Hero (handoff « with no return path » ; source primaire « complete and authoritative, but expensive to load », source secondaire « lossy by construction » ; spec, ticket ; la compaction comme passation en mémoire ; clearing), consulté le 3 octobre 2026", url: 'https://www.aihero.dev/ai-coding-dictionary'},
      {label: "Claude Code, Best practices (/clear pour repartir d'un contexte vide ; faire écrire une spec dans SPEC.md puis l'exécuter dans une session neuve ; une spec utile nomme les fichiers et interfaces, dit ce qui est hors périmètre et finit par une vérification de bout en bout)", url: 'https://code.claude.com/docs/en/best-practices'},
      {label: "Peters et Chin-Yee, Generalization bias in large language model summarization of scientific research, Royal Society Open Science 12(4), avril 2025 (10 modèles, 4 900 résumés ; omission des détails qui limitent la portée des conclusions ; surgénéralisation dans 26 à 73 % des cas pour DeepSeek, ChatGPT-4o et LLaMA 3.3 70B, même avec une consigne de précision)", url: 'https://arxiv.org/abs/2504.00025'},
      {label: "Crossref, métadonnées de l'article (Royal Society Open Science, volume 12, numéro 4, avril 2025)", url: 'https://doi.org/10.1098/rsos.241776'},
      {label: "Kiro, Introducing Kiro, 14 juillet 2025 (spécifications : exigences, document de conception, tâches et sous-tâches reliées aux exigences)", url: 'https://kiro.dev/blog/introducing-kiro/'},
      {label: "Constellation Research, AWS launches Kiro, an IDE powered by AI agents, 14 juillet 2025", url: 'https://www.constellationr.com/insights/news/aws-launches-kiro-ide-powered-ai-agents'},
      {label: "Den Delimarsky (GitHub), Spec-driven development with AI: Get started with a new open source toolkit, 2 septembre 2025 (Spec Kit ; /specify, /plan, /tasks ; « from \"code is the source of truth\" to \"intent is the source of truth\" »)", url: 'https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/'},
      {label: "Birgitta Böckeler, Understanding Spec-Driven-Development: Kiro, spec-kit, and Tessl, martinfowler.com, 15 octobre 2025 (« like using a sledgehammer to crack a nut » ; un petit bug devenu 4 user stories et 16 critères d'acceptation ; « I'd rather review code than all these markdown files » ; l'agent qui régénère des classes existantes décrites dans la spec)", url: 'https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html'},
      {label: "Amp, Handoff (No More Compaction), 23 octobre 2025 (compaction supprimée ; objectif de la nouvelle session, prompt généré et liste de fichiers)", url: 'https://ampcode.com/news/handoff'},
      {label: "Amp, Amp, Rebuilt, 6 mai 2026 (« Handoff is gone » ; compaction automatique à 90 % de la fenêtre ; « Today's leading frontier models are great at handling compaction »)", url: 'https://ampcode.com/news/neo'},
    ],
  },
  {
    id: 'dark-factory',
    status: 'live',
    title: 'Dark factory',
    en: 'Dark factory',
    aliases: ['dark factory', 'dark software factory', 'software factory', 'lights-out manufacturing', 'lights-out factory', 'AFK'],
    aliasesFr: ['usine logicielle', 'usine sans lumière'],
    jargon: [
      {say: 'AFK', means: "« away from keyboard », loin du clavier ; l'agent travaille pendant que personne ne le regarde, la nuit, le week-end ou pendant une réunion"},
      {say: 'software factory', means: "une organisation où ce sont des déclencheurs, un ticket ouvert, un test qui casse, une heure fixe, qui lancent les sessions d'agent, et non une personne"},
      {say: 'scenario', means: "chez StrongDM, un parcours d'utilisateur décrit hors du code, que les agents qui programment ne voient pas, pour qu'ils ne puissent pas l'écrire à la mesure de leur code"},
      {say: 'level 5', means: "le dernier des cinq niveaux de programmation avec l'IA décrits par Dan Shapiro en janvier 2026, celui où plus personne ne relit le code"},
    ],
    cat: 'methode',
    links: ['vibe-coding', 'human-in-the-loop', 'loop', 'evals', 'reward-hacking', 'passation'],
    short:
      "Une dark factory est une chaîne de développement où des déclencheurs lancent les agents sans personne au clavier, et où leur code part en production sans qu'aucun humain le relise.",
    image:
      "« Chez mon frère, l'embouteilleuse tourne toute la nuit sans personne, elle remplit, elle bouchonne, elle pèse et elle colle l'étiquette. Ses bouteilles sont justes au gramme près, et pour le vin, c'est le client qui goûte. »",
    imagineForm: 'E',
    imagine:
      "À 23 h, un client signale que l'export en PDF plante ; le ticket part tout seul chez un agent, qui écrit la correction, fait passer les tests et propose ses quarante lignes. À 9 h, Nathalie les lit, en refuse deux et met le reste en ligne. Dans l'équipe d'à côté, le même ticket, le même agent et les mêmes tests mettent la correction en ligne à 23 h 52, et personne ne lira jamais les quarante lignes.",
    full: [
      "Le mot vient de l'industrie. Une usine lights-out tourne sans personne sur place, et en 2003 le magazine Business 2.0 décrivait celle de Fanuc, au pied du mont Fuji, où des robots fabriquaient d'autres robots, environ 50 par 24 heures, sans surveillance pendant jusqu'à 30 jours. « Non seulement on éteint la lumière, mais on coupe aussi la clim et le chauffage », disait l'un de ses vice-présidents. Le 23 janvier 2026, Dan Shapiro, patron de Glowforge, a emprunté l'image pour le cinquième et dernier de ses niveaux de programmation avec l'IA, une boîte noire qui transforme des specs en logiciel. Il disait connaître une poignée de gens qui travaillaient ainsi, en équipes de moins de cinq personnes.",
      "Deux ingrédients font une dark factory. Le premier, ce sont des déclencheurs, un ticket ouvert, un test qui casse ou une heure fixe, qui lancent les sessions d'agent pendant que personne n'est au clavier. Le second, plus rare, c'est qu'aucun humain ne relit le code avant qu'il parte. StrongDM, éditeur d'un logiciel qui gère les accès aux serveurs et aux bases de données, a monté en juillet 2025 une équipe de trois personnes pour travailler ainsi. Le 6 février 2026, elle en a tiré deux règles, le code ne doit pas être écrit par des humains et ne doit pas être relu par des humains. Elle ajoutait qu'en dessous de 1 000 dollars de tokens par jour et par ingénieur, une telle usine avait encore de la marge.",
      "Sans relecture, tout repose sur la vérification, et elle doit résister à des agents qui savent la contourner. StrongDM raconte que ses agents ont vite pris des raccourcis, puisqu'une fonction qui renvoie toujours « vrai » suffit à faire passer des tests écrits trop étroitement. L'équipe a donc écrit des scénarios d'utilisateur rangés hors du code, que les agents ne voient pas, et les fait tourner contre des copies d'Okta, de Jira ou de Slack que des agents ont fabriquées à partir de leur documentation publique. Sa mesure de réussite est la part des parcours qui satisferaient probablement l'utilisateur, une probabilité, non un feu vert.",
      "Ce qui est annoncé vient surtout de ceux qui pratiquent. Le 11 février 2026, une équipe d'OpenAI a raconté avoir bâti en cinq mois un produit interne d'environ un million de lignes sans en écrire une seule à la main, en dix fois moins de temps selon sa propre estimation. Ses ingénieurs peuvent relire les modifications sans y être obligés, et l'équipe passait chaque vendredi, un jour sur cinq, à nettoyer le « AI slop » avant d'automatiser ce ménage. La mesure indépendante dit autre chose. En mars 2026, METR a constaté qu'environ la moitié des corrections d'agents validées par les tests de SWE-bench auraient été refusées par les mainteneurs des projets concernés, et c'est précisément ce jugement qu'une dark factory confie à ses contrôles automatiques.",
    ],
    then:
      "En mai 2025, l'agent de GitHub Copilot se lançait déjà tout seul quand on lui assignait un ticket, mais ses propositions ne lançaient aucun test automatique sans l'accord d'un humain, et celui qui l'avait sollicité ne pouvait pas les approuver lui-même. En février 2026, l'équipe d'OpenAI écrit que la relecture humaine est devenue facultative chez elle, et StrongDM l'interdit.",
    office: [
      {who: 'q', text: "Un prestataire nous vend une usine où les agents livrent sans relecture humaine. On signe ?"},
      {who: 'a', text: "Demande-lui ce qui vérifie le code à la place des relecteurs, qui a écrit ces vérifications, si les agents peuvent les lire, et combien de tokens tout cela brûle par jour ; c'est sur ces quatre réponses que tu signes."},
    ],
    avoid:
      "« Dans une dark factory, il n'y a plus personne. » Les humains quittent la relecture du code, pas l'usine ; chez StrongDM comme chez OpenAI, ils écrivent les specs, les scénarios et les contrôles, et c'est là que passe désormais leur temps.",
    video: null,
    sources: [
      {label: "Christopher Null et Brian Caulfield, Fade To Black, Business 2.0 (CNN Money), 1er juin 2003, archive (usine Fanuc près du mont Fuji ; environ 50 robots par équipe de 24 heures ; sans surveillance jusqu'à 30 jours ; Gary Zywiol : « Not only is it lights-out, we turn off the air conditioning and heat too »), citation traduite", url: 'https://web.archive.org/web/20091123102010/https://money.cnn.com/magazines/business2/business2_archive/2003/06/01/343371/index.htm'},
      {label: "Wikipédia, Lights out (manufacturing) (« lights-out manufacturing or dark factory » ; Fanuc)", url: 'https://en.wikipedia.org/wiki/Lights_out_(manufacturing)'},
      {label: "Dan Shapiro, The Five Levels: from Spicy Autocomplete to the Dark Factory, 23 janvier 2026 (niveau 5, « a black box that turns specs into software » ; référence à l'usine Fanuc ; « a handful of people », « less than five people »)", url: 'https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/'},
      {label: "Matt Pocock, AI Coding Dictionary, AI Hero (AFK ; software factory, « triggers, not humans, start agent sessions » ; dark factory, « no human ever reviews it »), consulté le 3 octobre 2026", url: 'https://www.aihero.dev/ai-coding-dictionary'},
      {label: "Justin McCarthy (StrongDM), Software Factories And The Agentic Moment, 6 février 2026 (« Code must not be written by humans », « Code must not be reviewed by humans » ; 1 000 $ de tokens par jour et par ingénieur ; équipe fondée le 14 juillet 2025 ; « return true » ; scénarios hors du code comme un holdout ; satisfaction ; clones d'Okta, Jira, Slack, Google Docs, Drive et Sheets)", url: 'https://factory.strongdm.ai/'},
      {label: "StrongDM, page d'accueil (plateforme de gestion des accès privilégiés aux infrastructures : cloud, bases de données, serveurs)", url: 'https://www.strongdm.com/'},
      {label: "Simon Willison, How StrongDM's AI team build serious software without even looking at the code, 7 février 2026 (équipe de trois ; clones construits par un agent à partir de la documentation publique des API ; réserve sur le coût, 20 000 $ par mois et par ingénieur)", url: 'https://simonwillison.net/2026/Feb/7/software-factory/'},
      {label: "Ryan Lopopolo (OpenAI), Harness engineering: leveraging Codex in an agent-first world, 11 février 2026 (0 ligne écrite à la main ; environ un million de lignes en cinq mois ; environ 1 500 pull requests, trois puis sept ingénieurs ; estimation de 1/10 du temps ; « Humans may review pull requests, but aren't required to » ; chaque vendredi, 20 % de la semaine, à nettoyer le « AI slop »)", url: 'https://openai.com/index/harness-engineering/'},
      {label: "METR, Many SWE-bench-Passing PRs Would Not Be Merged into Main, 10 mars 2026 (4 mainteneurs de scikit-learn, Sphinx et pytest ; 296 pull requests d'agents qui passaient les tests ; environ la moitié ne seraient pas fusionnées ; 24 points sous le correcteur automatique)", url: 'https://metr.org/notes/2026-03-10-many-swe-bench-passing-prs-would-not-be-merged-into-main/'},
      {label: "GitHub, GitHub Copilot: Meet the new coding agent, 19 mai 2025 (agent lancé en lui assignant une issue ; « The agent's pull requests require human approval before any CI/CD workflows are run » ; le demandeur ne peut pas approuver lui-même)", url: 'https://github.blog/news-insights/product-news/github-copilot-meet-the-new-coding-agent/'},
    ],
  },
];

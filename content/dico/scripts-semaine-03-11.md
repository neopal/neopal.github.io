# Scripts de la semaine du 3 novembre (ép. 25 à 31), à relire

Textes dits par la voix, scène par scène, avec ce qu'on voit à l'écran ; les indications de jeu entre crochets ne sont pas dites, et les mots anglais écrits en API dans le script (prononcés à l'anglaise) sont montrés ici sous leur forme écrite. Les fichiers sont dans `video/src/voix/<id>.script.json` (champ `screen` pour le visuel). Les durées sont estimées sans voix (4,4 mots/s), contrôle des sous-titres OK pour les sept. Compositions montées le 2026-11-02 sur ce calage estimé ; aucune voix générée.

## Ép. 25, mar. 03/11 : Claude, c'est qui exactement ?

Définition · fiche `claude` · composition `ClaudeVoix` · décor : restaurant d'hôtel (Hervé, le croque du bar ou le menu en sept plats) · durée estimée 66 s

Fil avec l'épisode d'avant : L'ép. 24 parlait des scores que les labos visent ; voilà l'un de leurs modèles, celui qui porte un prénom, et comme ChatGPT (ép. 11), ce nom cache plusieurs modèles

- **hook** : [warmly] C'est quoi... Claude…
  - *À l'écran* : Titre géant « CLAUDE » au centre. Derrière, posés dès la première image, quatre cartons de tailles croissantes empilés de travers (Haiku, Sonnet, Opus, Mythos), sans libellé encore. Aucun sous-titre (nocaption).
- **intro** : [curious] Tu crois que Claude, c'est un chatbot comme ChatGPT ? C'est d'abord une famille de modèles de langage d'Anthropic, et aussi le nom des applications qui les font tourner, du chat jusqu'à Claude Code.
  - *À l'écran* : Une bulle de chat dessinée, posée à l'entrée. Sur « famille de modèles », elle s'écarte et révèle derrière le modèle de Parts.tsx en quatre exemplaires de tailles différentes. Sur « applications », trois fenêtres glissent au-dessus en cascade, libellées « chat », « Code », « Cowork ».
- **paliers** : [warmly] Depuis mars 2024, chaque génération sort en trois tailles, Haiku, Sonnet et Opus, de la plus rapide à la plus capable… et en 2026 s'est ajouté un quatrième palier, Mythos, ouvert au public sous le nom de Fable.
  - *À l'écran* : Les quatre modèles s'alignent de gauche à droite par taille (bar grow), chacun reçoit son nom sur le mot qui le dit, 5 images après le bloc. Sous la rangée, une flèche « rapide » à gauche, « capable » à droite. Mythos arrive en dernier, en couleur d'accent.
- **herve** : [mischievously] Imagine Hervé, qui te dit « j'ai déjeuné au restaurant de l'hôtel »… a-t-il pris le croque-monsieur du bar, servi en cinq minutes, ou le menu en sept plats qui lui a coûté son après-midi ?
  - *À l'écran* : Scène propre à ce short : façade d'hôtel en pixel art, Hervé devant, qui cligne des yeux. Sur « croque-monsieur », à gauche, un croque sur une assiette et une horloge qui tourne de cinq minutes ; sur « sept plats », à droite, une table nappée où sept assiettes tombent en cascade pendant que l'horloge fait un tour complet.
- **flou** : [curious] Quand on te dit « j'ai demandé à Claude », c'est le même flou… entre un Haiku pressé et un Opus qui prend son temps.
  - *À l'écran* : Wipe : le croque devient le carton « Haiku », le menu le carton « Opus ». Au centre, une bulle « J'ai demandé à Claude » avec un point d'interrogation qui oscille entre les deux.
- **constitution** : [warmly] Anthropic règle son caractère avec une constitution, un texte qui dit ce que Claude doit faire et pourquoi. Elle existe en livre audio… lance-le à neuf heures, il se termine à treize heures sept.
  - *À l'écran* : Collage de la capture de la page « Claude's Constitution » (scotch aux coins). Sur « livre audio », une horloge murale pixel art à 9 h ; ses aiguilles tournent en continu jusqu'à 13 h 07 sur « treize heures sept », pendant qu'une barre de douze pistes se remplit (bar grow). Libellé bas : « 12 pistes ».
- **garde** : [curious] Une constitution n'empêche pas tout. En août 2025, Anthropic a révélé qu'un groupe criminel s'était servi de Claude Code pour faire chanter au moins dix-sept organisations.
  - *À l'écran* : La capture se replie. Une rangée de dix-sept petits immeubles pixel art se pose en cascade (count-up « 17 » en bas) ; sur « faire chanter », un cadenas rouge se ferme sur chacun, de gauche à droite.
- **chute** : [warmly] Alors la prochaine fois qu'on te dit « je l'ai demandé à Claude »… [pause] demande lequel, et ce qu'il avait sous les yeux.
  - *À l'écran* : Retour au restaurant de l'hôtel, plein cadre : Hervé à table entre le croque et le menu ; une étiquette « lequel ? » se pose entre les deux assiettes. Image finale pleine.

Description :

> Claude, c'est la famille de modèles de langage d'Anthropic, Haiku, Sonnet, Opus et Mythos, ouvert au public sous le nom de Fable, et le nom des applications qui les font tourner, du chat à Claude Code. Sa constitution, le texte qui règle son caractère, dure 4 h 08 en livre audio.
> https://neopal.github.io/lexique/claude/
> #claude #anthropic #llm #vulgarisation
> Capture : Anthropic, Claude's Constitution.

Sources : Fiche claude de lexique/terms.js : Wikipédia, Claude (AI), consulté le 29 octobre 2026 (famille de modèles d'Anthropic, applications claude.ai, Claude Code, Cowork ; quatre paliers Haiku, Sonnet, Opus, Mythos ; GTG-2002 et au moins 17 organisations, août 2025) ; https://en.wikipedia.org/wiki/Claude_(AI) ; Anthropic, Introducing the next generation of Claude, 4 mars 2024 (Claude 3 en trois modèles, Haiku, Sonnet, Opus) ; https://www.anthropic.com/news/claude-3-family ; Anthropic, Claude's Constitution (livre audio en 12 pistes, 14 858 s au total, soit 4 h 07 min 38 s ; 9 h + 4 h 07 = 13 h 07) ; https://www.anthropic.com/constitution ; Image : Hervé au restaurant de l'hôtel (fiche claude) ; scène inventée, aucun fait daté

Crédits images : Capture : Anthropic, « Claude's Constitution », anthropic.com/constitution (public/voix/claude-constitution.png), citation, à produire

## Ép. 26, mer. 04/11 : L'IA prévoit la rime avant d'écrire

Mythe · fiche `mythe-autocompletion` · composition `MytheAutocompletionVoix` · décor : échiquier (Kasparov) · durée estimée 58 s

Fil avec l'épisode d'avant : L'ép. 25 disait que Claude est un modèle de langage ; on entend souvent que ce n'est que de l'autocomplétion

À trancher : Phrase du hook provisoire (titre de la fiche) : aucune citation réelle et sourcée qui dise exactement « ce n'est que de l'autocomplétion » ; en chercher une avant la voix, sinon garder telle quelle comme les ép. 9, 11, 13, 15, 17, 20 et 22. Portrait de Garry Kasparov à prendre sur Wikimedia Commons (licence à vérifier), pixelisé et crédité.

- **hook** : [warmly] « Ce n'est que de l'autocomplétion »… sauf qu'avant d'écrire un mot, le modèle a parfois déjà prévu les suivants.
  - *À l'écran* : Dès la première image, un clavier de téléphone dessiné, collé de travers avec du scotch aux coins, avec trois suggestions de mots au-dessus. La phrase du mythe s'écrit à la machine en grand (typed), puis le tampon rouge FAUX s'écrase dessus (squash) et reste jusqu'à la fin du hook : c'est l'image de couverture.
- **vrai** : [curious] Le mythe a raison sur un point. Un modèle écrit bien sa réponse token après token, un petit bout de mot à la fois, comme le clavier de ton téléphone qui propose le mot suivant.
  - *À l'écran* : Le clavier recule. Une phrase s'écrit bloc par bloc, chaque token dans sa case (même rendu que le short Token) ; au-dessus de chaque nouvelle case, trois suggestions avec leurs barres de probabilité, et la plus haute est choisie. Libellé « token après token ».
- **rime** : [warmly] Mais en mars 2025, des chercheurs d'Anthropic ont regardé le calcul de Claude pendant qu'il écrivait un petit poème en anglais. Le premier vers finissait par grab it, et avant d'écrire le second, le modèle avait déjà choisi sa rime… rabbit, le lapin.
  - *À l'écran* : Collage de la capture de l'article d'Anthropic (scotch). Le premier vers s'écrit à la machine en bas, « He saw a carrot and had to grab it, » ; « grab it » se surligne (Highlight). Au-dessus du vide du second vers, une petite bulle de pensée s'allume sur « déjà choisi » avec un lapin pixel art et le mot « rabbit », pendant que le vers est encore vide.
- **effacer** : [curious] Les chercheurs ont effacé cette idée de son calcul… et le modèle a écrit un tout autre vers, qui finissait par habit.
  - *À l'écran* : Sur « effacé », une gomme SVG maison passe sur la bulle et le lapin disparaît. Le second vers s'écrit alors à la machine et finit par « habit », surligné. Libellés « rabbit » barré, « habit ».
- **kasparov** : [mischievously] Kasparov aussi jouait un coup après l'autre, et personne n'est allé lui dire qu'il ne faisait que pousser du bois.
  - *À l'écran* : Scène propre à ce short : un échiquier vu de dessus, Kasparov en portrait pixelisé (Commons) à côté. Une pièce avance d'une case ; en pointillés, trois coups suivants se dessinent derrière elle (draw-on), comme un plan déjà fait.
- **apres** : [warmly] Et le ChatGPT ou le Claude que tu utilises a ensuite appris à répondre, à refuser et à raisonner avant d'écrire… toujours avec cette même prédiction.
  - *À l'écran* : Retour aux cases de tokens. Trois étiquettes se posent en cascade au-dessus, sur leur mot : « répondre », « refuser », « raisonner ». En dessous, la même rangée de cases continue de s'écrire, inchangée.
- **chute** : [warmly] Alors oui, il écrit mot après mot… [pause] comme Kasparov joue coup après coup, en voyant plus loin que le prochain.
  - *À l'écran* : Retour à l'échiquier plein cadre, les coups en pointillés allumés jusqu'au bout du plan. Image finale pleine.

Description :

> « Ce n'est que de l'autocomplétion » ; pas tout à fait. Un modèle écrit bien token après token, mais en mars 2025, Anthropic a montré que Claude choisit la rime d'un vers avant d'en écrire le premier mot.
> https://neopal.github.io/lexique/mythe-autocompletion/
> #llm #chatgpt #ia #vulgarisation
> Capture : Anthropic, 27 mars 2025. Portrait pixelisé d'après Wikimedia Commons : Garry Kasparov, photo Comet Photo AG, 1987 (CC BY-SA 4.0).

Sources : Fiche mythe-autocompletion de lexique/terms.js : Anthropic, Tracing the thoughts of a large language model, 27 mars 2025 (le distique « He saw a carrot and had to grab it, / His hunger was like a starving rabbit » ; le modèle prévoit la rime avant le second vers ; en retirant le concept « rabbit », il écrit un vers qui finit par « habit ») ; https://www.anthropic.com/research/tracing-thoughts-language-model ; Lindsey et al. (Anthropic), On the Biology of a Large Language Model, mars 2025 (Claude 3.5 Haiku) ; https://transformer-circuits.pub/2025/attribution-graphs/biology.html ; Ouyang et al. (OpenAI), Training language models to follow instructions with human feedback, mars 2022 (post-entraînement) ; https://arxiv.org/abs/2203.02155 ; Image : Kasparov qui joue un coup après l'autre (fiche mythe-autocompletion)

Crédits images : Capture : Anthropic, 27 mars 2025, « Tracing the thoughts of a large language model » (public/voix/autocompletion-anthropic.png), citation, à produire ; Portrait : Garry Kasparov, Wikimedia Commons, pixelisé (licence à vérifier), à produire

## Ép. 27, jeu. 05/11 : L'IA suit tes mots, pas ton idée

Définition · fiche `pilotabilite` · composition `PilotabiliteVoix` · décor : chantier de peinture (Jean-Marc et le peintre) · durée estimée 60 s

Fil avec l'épisode d'avant : L'ép. 26 montrait que le modèle prolonge un motif ; une consigne en est un, et il la suit jusqu'à un certain point

- **hook** : [warmly] C'est quoi... la pilotabilité…
  - *À l'écran* : Titre géant « PILOTABILITÉ ». Derrière, posé dès la première image, un nuancier de peintre en éventail, à moitié ouvert. Aucun sous-titre (nocaption).
- **intro** : [curious] Tu crois qu'une IA fait ce que tu veux ? Elle fait ce que tu écris, en prolongeant tes mots comme elle prolonge tout le reste.
  - *À l'écran* : Une bulle de consigne s'écrit (typed) ; sur « prolongeant », la réponse sort de sa dernière ligne comme une suite, même police, même alignement. Libellé « tes mots », puis « la suite ».
- **nom** : [warmly] Jusqu'où une consigne la guide, c'est sa pilotabilité, ou en anglais, sa steerability.
  - *À l'écran* : « pilotabilité » s'écrit en grand, puis « steerability » dessous en couleur d'accent (passages masqués, onscreen). Un petit volant SVG maison tourne d'un quart de tour à côté.
- **peintre** : [mischievously] Imagine Jean-Marc, qui demande au peintre un blanc un peu chaleureux pour le salon… il a eu du jaune poussin. Pour la chambre, il a donné la référence du nuancier, et c'est le seul mur qu'il n'a pas fallu repeindre.
  - *À l'écran* : Scène propre à ce short : deux pièces vues de face, côte à côte, le peintre en pixel art avec son rouleau, Jean-Marc qui cligne des yeux. Sur « jaune poussin », le mur du salon se remplit de jaune (wipe) ; sur « référence du nuancier », une pastille numérotée du nuancier se colle à côté de la chambre, et le mur se remplit exactement de sa couleur, avec une coche.
- **regle** : [curious] Avec une IA, c'est pareil. Une consigne courte et vérifiable, un format, une langue, une longueur, tient très bien… une intention à deviner, beaucoup moins.
  - *À l'écran* : Quatre lignes se posent en cascade : « un format », « une langue », « une longueur », « une intention » ; à droite, chacune reçoit son verdict sur son mot, « forte » en couleur d'accent pour les trois premières, « faible » en gris pour la dernière (mots, pas de barres chiffrées).
- **grok** : [warmly] Une seule ligne peut déplacer beaucoup. En juillet 2025, l'entreprise d'Elon Musk a demandé à son chatbot Grok de ne pas craindre d'être politiquement incorrect… et Grok a fini par faire l'éloge d'Hitler, avant qu'on retire la ligne.
  - *À l'écran* : Une fenêtre de consignes dessinée (system prompt) avec des lignes grises ; sur « une seule ligne », une ligne s'ajoute en rouge et se surligne. Sur « politiquement incorrect », les réponses dessous basculent d'un cran vers la droite, puis de plusieurs ; sur « retire », la ligne rouge est barrée. Aucune image de la personne ni capture des messages.
- **majuscules** : [curious] Les modèles récents sont même devenus si dociles qu'Anthropic conseille d'arrêter d'écrire ses consignes en majuscules, qui les font trop obéir.
  - *À l'écran* : Une consigne « CRITICAL: YOU MUST » en grosses capitales tremble à l'écran ; sur « trop obéir », un petit agent appelle un outil, puis dix, en cascade. Sur « conseille », la consigne se réécrit en casse normale et les appels retombent à un.
- **chute** : [warmly] Alors quand l'IA rate ton but… [pause] demande-toi si tu lui as donné la référence du nuancier.
  - *À l'écran* : Retour aux deux pièces plein cadre : le salon jaune, la chambre juste ; le nuancier s'ouvre en grand au milieu. Image finale pleine.

Description :

> La pilotabilité (steerability), c'est jusqu'où une consigne guide un modèle ; forte pour un format ou une longueur, faible pour une intention à deviner. En juillet 2025, une seule ligne ajoutée aux consignes de Grok a suffi à le faire déraper.
> https://neopal.github.io/lexique/pilotabilite/
> #prompt #chatgpt #llm #vulgarisation

Sources : Fiche pilotabilite de lexique/terms.js : Anthropic, Prompting best practices (modèles plus réceptifs au system prompt ; adoucir « CRITICAL: You MUST ») ; https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-4-best-practices ; Fiche pilotabilite de lexique/terms.js : Wikipédia, Grok (chatbot) (juillet 2025, consigne « politically incorrect », éloge d'Adolf Hitler, consigne retirée puis remise le 15 juillet) ; https://en.wikipedia.org/wiki/Grok_(chatbot) ; Fiche pilotabilite de lexique/terms.js : Zhou et al. (Google), IFEval, 14 novembre 2023 (consignes vérifiables) ; https://arxiv.org/abs/2311.07911 ; Image : Jean-Marc et le peintre (fiche pilotabilite) ; scène inventée, aucun fait daté

## Ép. 28, ven. 06/11 : Ton agent oublie ? Mets un hook

Définition · fiche `hook` · composition `HookVoix` · décor : quai de métro (le passager qui bloque la porte) · durée estimée 60 s

Fil avec l'épisode d'avant : L'ép. 27 montrait qu'une consigne tient presque toujours ; pour ce qui doit tenir à chaque fois, il y a les hooks

- **hook** : [warmly] C'est quoi... un hook…
  - *À l'écran* : Titre géant « HOOK ». Derrière, posée dès la première image, une porte de métro pixel art fermée, avec son voyant. Aucun sous-titre (nocaption).
- **intro** : [curious] Tu crois qu'il suffit d'écrire une règle à ton agent pour qu'il la respecte ? Il la suivra presque toujours… et en production, presque, c'est un problème.
  - *À l'écran* : Une liste de consignes dessinée (fichier CLAUDE.md recréé), une règle surlignée « ne touche pas au dossier prod ». Sur « presque toujours », une rangée de vingt actions défile avec des coches ; sur « presque », une seule case devient rouge.
- **nom** : [warmly] Pour ce qui doit arriver à chaque fois, des outils comme Claude Code lancent eux-mêmes un petit programme, à un moment fixé, avant ou après chaque action de l'agent. C'est ce qu'on appelle un hook.
  - *À l'écran* : Frise des actions de l'agent ; devant et derrière chaque case, une petite porte s'insère (un portique avant, un portique après). « hook » s'écrit en grand au-dessus (passage masqué, onscreen).
- **metro** : [mischievously] Imagine le passager qui bloque la porte du métro pour son copain… il peut crier, le conducteur peut être en retard, la rame ne partira pas tant qu'une porte reste ouverte.
  - *À l'écran* : Scène propre à ce short : quai de métro, rame à l'arrêt, un passager pixel art qui retient la porte d'un bras, le conducteur en cabine. Le voyant de la porte reste rouge ; sur « ne partira pas », la rame tremble sans avancer, puis le voyant passe au vert quand la porte se ferme et la rame démarre.
- **avant** : [curious] Placé avant une action, un hook peut la bloquer, une écriture dans le dossier de production par exemple, et dire à l'agent pourquoi. Placé après, il range le code ou lance les tests, sans jamais oublier.
  - *À l'écran* : Retour à la frise. Une action « écrire dans prod » arrive au portique avant : il se ferme, croix rouge, et une petite bulle repart vers l'agent « bloquée : dossier protégé ». Puis une action normale passe ; au portique après, une brosse SVG maison range le code et une coche « tests » s'allume.
- **date** : [warmly] Anthropic les a ajoutés à Claude Code le 30 juin 2025… parce que les utilisateurs les réclamaient.
  - *À l'écran* : Collage de la ligne du changelog de Claude Code, « Released hooks », sur une page de calendrier arrachée au 30 juin 2025 (scotch aux coins).
- **danger** : [curious] Mais un hook tourne sur ta machine avec tous tes droits… alors on relit ceux qu'on récupère ailleurs.
  - *À l'écran* : Le portique grossit ; derrière lui, l'icône d'un ordinateur avec une clé. Sur « relit », une loupe passe sur un portique venu d'ailleurs, étiqueté « récupéré ».
- **chute** : [warmly] Ce qui doit arriver à chaque fois va dans un hook… [pause] et ce qui demande du jugement reste dans les consignes.
  - *À l'écran* : Retour au quai plein cadre : la porte se ferme, voyant vert, la rame part. Image finale pleine.

Description :

> Un hook, c'est un petit programme qu'un outil comme Claude Code lance de lui-même, avant ou après chaque action de l'agent ; la consigne est suivie presque toujours, le hook à chaque fois. Anthropic les a ajoutés à Claude Code le 30 juin 2025.
> https://neopal.github.io/lexique/hook/
> #claudecode #agentia #devtools #vulgarisation
> Capture : CHANGELOG de Claude Code (GitHub).

Sources : Fiche hook de lexique/terms.js : CHANGELOG de Claude Code, version 1.0.38 (« Released hooks. Special thanks to community input ») ; https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md ; Fiche hook de lexique/terms.js : registre npm, @anthropic-ai/claude-code 1.0.38 publiée le 30 juin 2025 ; https://registry.npmjs.org/@anthropic-ai/claude-code ; Fiche hook de lexique/terms.js : Claude Code, Hooks reference (PreToolUse peut bloquer l'appel d'outil ; « Command hooks execute shell commands with your full user permissions » ; relire et tester avant d'ajouter) ; https://code.claude.com/docs/en/hooks ; Image : le passager qui bloque la porte du métro ; scène inventée, aucun fait daté

Crédits images : Capture : CHANGELOG de Claude Code, version 1.0.38, GitHub anthropics/claude-code (public/voix/hook-voix-changelog.png), citation, à produire

## Ép. 29, sam. 07/11 : Les radiologues devaient disparaître

Mythe · fiche `mythe-remplace-metier` · composition `MytheMetierVoix` · décor : service de radiologie (le radiologue, le négatoscope) · durée estimée 58 s

Fil avec l'épisode d'avant : L'ép. 28 gardait aux humains ce qui demande du jugement ; alors l'IA va-t-elle remplacer tel métier demain ?

À trancher : Hook : vraie citation de Geoffrey Hinton en 2016 (« people should stop training radiologists now », rapportée par Works in Progress, 25 septembre 2025), traduite ; l'auteur n'est pas nommé à l'oral (univers.md, shorts mythe), la couverture suffit. Si on le montre, portrait Commons pixelisé et crédité. Portrait d'Erik Brynjolfsson (Commons) à vérifier.

- **hook** : [warmly] « On devrait arrêter dès maintenant de former des radiologues »… c'était en 2016, et les radiologues n'ont jamais été aussi demandés.
  - *À l'écran* : Dès la première image, une radio de thorax dessinée sur un négatoscope, collée au scotch. La phrase s'écrit à la machine en grand entre guillemets, avec « 2016 » en petit dessous ; le tampon rouge FAUX s'écrase dessus (squash) et reste jusqu'à la fin du hook : c'est l'image de couverture.
- **taches** : [curious] Un métier, c'est un paquet de tâches. D'après une étude de 2012, les radiologues ne passaient que 36 % de leur temps à lire des images… le reste, ce sont les patients, les autres médecins, l'enseignement.
  - *À l'écran* : Un radiologue pixel art à son bureau. Un camembert se construit à côté : une part de 36 % s'allume en couleur d'accent sur « 36 % » (libellé « images »), puis les trois autres parts tombent en cascade, libellées « patients », « médecins », « enseignement ».
- **records** : [warmly] En 2025, plus de 700 IA de radiologie avaient l'aval des autorités sanitaires américaines… et les internats ont ouvert un nombre record de 1 208 postes en radiologie.
  - *À l'écran* : Deux compteurs côte à côte. À gauche, des petites puces « IA » tombent en grille (count-up jusqu'à « 700 »). À droite, des blouses pixel art se rangent en colonnes (count-up jusqu'à « 1 208 postes », punch zoom du short sur le chiffre).
- **jeunes** : [curious] Ça ne veut pas dire que rien ne bouge. En août 2026, à Stanford, l'équipe d'Erik Brynjolfsson ne voit pas de destruction d'emplois… mais chez les 22-25 ans, dans les métiers les plus exposés à l'IA, l'emploi est environ 19 % sous ce qu'il aurait été.
  - *À l'écran* : Portrait pixelisé d'Erik Brynjolfsson (Commons) en collage, en haut à gauche. Graphique qui se construit : deux courbes partent du même point, « exposés » et « moins exposés » ; sur « 22-25 ans », la courbe « exposés » se détache vers le bas et l'écart se colore, libellé « −19 % ».
- **embauche** : [warmly] Le recul passe par des jeunes qu'on n'embauche pas, plutôt que par des licenciements… et une embauche qui n'a pas lieu ne se voit pas dans les chiffres du chômage.
  - *À l'écran* : Une porte de bureau avec un panneau « on recrute » qui se retourne en « complet ». Devant, une file de jeunes pixel art qui s'allonge, sans que personne ne sorte du bureau. En bas, une courbe du chômage reste plate, libellé « chômage ».
- **chute** : [warmly] Alors plutôt qu'une date de disparition… [pause] regarde quelles tâches de ton métier partent à l'IA, et combien de juniors on recrute encore.
  - *À l'écran* : Retour au radiologue à son bureau, plein cadre : un écran d'IA s'allume à côté de lui et prend la part « images » du camembert, il se tourne vers un patient. Image finale pleine.

Description :

> « L'IA va remplacer tel métier demain » ; en 2016, on annonçait la fin des radiologues, et en 2025 leurs internats ont ouvert un nombre record de postes. Ce qui recule pour l'instant, d'après Stanford, ce sont les embauches de jeunes dans les métiers les plus exposés.
> https://neopal.github.io/lexique/mythe-remplace-metier/
> #emploi #ia #travail #vulgarisation
> Capture et chiffres : Works in Progress, 25 septembre 2025 ; Stanford Digital Economy Lab, 12 août 2026.

Sources : Fiche mythe-remplace-metier de lexique/terms.js : Deena Mousa, Works in Progress, « AI isn't replacing radiologists », 25 septembre 2025 (Geoffrey Hinton en 2016 : « people should stop training radiologists now » ; plus de 700 modèles de radiologie autorisés par la FDA ; record de 1 208 postes d'internat en 2025 ; 36 % du temps à interpréter des images, étude de 2012) ; https://www.worksinprogress.news/p/why-ai-isnt-replacing-radiologists ; Fiche mythe-remplace-metier de lexique/terms.js : Stanford Digital Economy Lab, 12 août 2026 (pas de destruction d'emplois généralisée ; emploi des 22-25 ans dans les métiers exposés environ 19 % sous la tendance ; recul par moins d'embauches) ; https://digitaleconomy.stanford.edu/news/canariesaug26/

Crédits images : Portrait : Erik Brynjolfsson, Wikimedia Commons, pixelisé (licence à vérifier), à produire

## Ép. 30, dim. 08/11 : 440 000 dollars de fausses références

Définition · fiche `declaration-d-usage-de-l-ia` · composition `DeclarationVoix` · décor : bureau d'école (le mémoire de Léa) · durée estimée 69 s

Fil avec l'épisode d'avant : L'ép. 29 demandait quelles tâches partent à l'IA ; quand c'est elle qui a écrit, encore faut-il le dire

- **hook** : [warmly] C'est quoi... une déclaration d'usage de l'IA…
  - *À l'écran* : Titre géant « DÉCLARATION D'USAGE DE L'IA » sur deux lignes. Derrière, posé dès la première image, le bas d'un document avec quatre lignes vides. Aucun sous-titre (nocaption).
- **intro** : [curious] Tu crois que dire que tu as utilisé l'IA, c'est avouer que tu as bâclé ? En 2025, c'est le silence qui a coûté cher à Deloitte.
  - *À l'écran* : Une bulle « j'ai utilisé l'IA » avec un point d'interrogation inquiet ; sur « Deloitte », collage de la capture du titre de l'article de The Register (scotch aux coins).
- **rapport** : [warmly] Le cabinet avait rendu au gouvernement australien un rapport facturé 440 000 dollars australiens… un chercheur y a trouvé des études qui n'existent pas, et une citation inventée d'une décision de justice.
  - *À l'écran* : Un rapport relié se pose ; une étiquette de prix se colle avec un count-up jusqu'à « 440 000 $ AU ». Sur « chercheur », une loupe passe sur les notes de bas de page : trois références deviennent rouges et se barrent, puis une citation entre guillemets se barre aussi.
- **mention** : [curious] La version corrigée mentionnait enfin, dans sa méthode, un outil fondé sur GPT-4o… et Deloitte a remboursé la dernière tranche du contrat.
  - *À l'écran* : Le rapport se rouvre à la page « méthode », une ligne « Azure OpenAI GPT-4o » s'écrit à la machine et se surligne. Sur « remboursé », une pile de billets repart du rapport vers la gauche (arc).
- **nom** : [warmly] Ces quelques lignes qui disent quelle IA a servi, à quoi, comment on a relu, et qui en répond, c'est la déclaration d'usage de l'IA, ou en anglais, l'AI disclosure.
  - *À l'écran* : Les quatre lignes vides du hook se remplissent en cascade, chacune sur son mot : « quelle IA », « à quoi », « comment on a relu », « qui en répond ». Puis « déclaration d'usage de l'IA » en grand et « AI disclosure » dessous en couleur d'accent (passages masqués, onscreen).
- **memoire** : [mischievously] Imagine le mémoire de stage de Léa, avec au dos la ligne « relu par Monsieur Perrin »… ça ne dit pas qu'il l'a écrit, ça dit qui a regardé quoi, et à qui poser la question le jour où une erreur ressort.
  - *À l'écran* : Scène propre à ce short : un mémoire relié posé sur un bureau d'école, Léa en pixel art qui cligne des yeux. Le mémoire se retourne, la ligne « relu par M. Perrin » se surligne ; sur « une erreur ressort », une page sort du mémoire avec un point rouge et une flèche file vers une petite photo de M. Perrin.
- **loi** : [curious] Depuis le 2 août 2026, en Europe, le règlement sur l'IA rend la mention obligatoire pour les deepfakes et les textes générés pour informer le public… sauf quand une personne les a relus et en répond.
  - *À l'écran* : Collage de la capture de l'article 50 du règlement (scotch). Deux icônes tombent sur leur mot : un visage dédoublé (« deepfakes ») et une page de journal (« textes ») ; sur « sauf », une coche « relu et signé » vient se poser sur la page de journal.
- **chute** : [warmly] Alors en bas de ton prochain document, écris tes quatre lignes… [pause] et si la troisième est la plus dure à écrire, c'est par elle qu'il faut commencer.
  - *À l'écran* : Retour au bas du document : les quatre lignes remplies, la troisième « comment on a relu » s'allume en couleur d'accent. Image finale pleine.

Description :

> Une déclaration d'usage de l'IA (AI disclosure), ce sont quelques lignes qui disent quelle IA a servi, à quoi, comment on a relu, et qui en répond. En 2025, Deloitte a dû rembourser une partie d'un rapport plein de références inventées, qui ne mentionnait pas l'IA.
> https://neopal.github.io/lexique/declaration-d-usage-de-l-ia/
> #ia #transparence #aiact #vulgarisation
> Captures : The Register, 6 octobre 2025 ; règlement européen sur l'IA, article 50.

Sources : Fiche declaration-d-usage-de-l-ia de lexique/terms.js : The Register, 6 octobre 2025 (contrat de 440 000 dollars australiens ; fausses références et citation inventée d'une décision de la Cour fédérale ; version corrigée mentionnant Azure OpenAI GPT-4o dans la méthode ; remboursement de la dernière tranche ; erreurs relevées par Chris Rudge) ; https://www.theregister.com/2025/10/06/deloitte_ai_report_australia/ ; Fiche declaration-d-usage-de-l-ia de lexique/terms.js : règlement européen sur l'IA, article 50 (applicable le 2 août 2026 ; deepfakes et textes générés publiés pour informer le public, sauf relecture humaine et responsabilité éditoriale) ; https://artificialintelligenceact.eu/article/50/ ; Image : le mémoire de Léa relu par M. Perrin (fiche declaration-d-usage-de-l-ia) ; scène inventée, aucun fait daté

Crédits images : Capture : The Register, 6 octobre 2025 (public/voix/declaration-register.png), citation, à produire ; Capture : artificialintelligenceact.eu, article 50 (public/voix/declaration-article50.png), citation, à produire

## Ép. 31, lun. 09/11 : Oblige l'IA à montrer sa page

Définition · fiche `ancrage-aux-sources` · composition `AncrageVoix` · décor : repas de famille (Patrice au quiz) · durée estimée 57 s

Fil avec l'épisode d'avant : L'ép. 30 finissait sur des références inventées ; voilà comment on oblige un modèle à montrer d'où vient chaque phrase

- **hook** : [warmly] C'est quoi... l'ancrage aux sources…
  - *À l'écran* : Titre géant « ANCRAGE AUX SOURCES ». Derrière, posée dès la première image, une ancre SVG maison dont la chaîne descend vers une pile de documents. Aucun sous-titre (nocaption).
- **intro** : [curious] Tu crois qu'en donnant tes documents à une IA, elle ne peut plus inventer ? Elle peut encore… sauf si tu l'obliges à montrer d'où vient chaque phrase.
  - *À l'écran* : Une pile de documents glisse dans une bulle de chat ; la réponse s'écrit à côté, et sur « inventer », une de ses phrases devient rouge. Sur « d'où vient », un fil se tend de chaque phrase vers un passage des documents.
- **nom** : [warmly] Faire appuyer chaque affirmation sur un passage exact des documents fournis, c'est l'ancrage aux sources, ou en anglais, le grounding.
  - *À l'écran* : « ancrage aux sources » s'écrit en grand, puis « grounding » dessous en couleur d'accent (passages masqués, onscreen).
- **patrice** : [mischievously] Imagine Patrice au quiz du repas de famille, qui répond à tout avec aplomb… depuis que la règle oblige à montrer la page du dictionnaire avant de marquer le point, il dit « je passe » trois fois par partie, et il se trompe bien moins souvent.
  - *À l'écran* : Scène propre à ce short : table du dimanche en pixel art, Patrice qui lève la main à chaque question, un tableau de score derrière. Sur « la page du dictionnaire », un gros dictionnaire s'ouvre au milieu de la table ; sur « je passe », trois bulles « je passe » sortent de Patrice en cascade, et les croix rouges du tableau s'effacent une à une.
- **gestes** : [curious] Avec une IA, ça tient en trois consignes… tu l'autorises à dire « je ne sais pas », tu lui fais citer le passage mot pour mot, et tu lui fais retirer toute phrase qui n'en a pas.
  - *À l'écran* : Trois cartes numérotées tombent en cascade, chacune sur son mot : « 1 je ne sais pas », « 2 citer mot pour mot », « 3 retirer ». Sur « retirer », une phrase de la réponse sans fil vers les documents est barrée et sort du cadre (même mécanisme que le schéma de la fiche).
- **limite** : [warmly] L'ancrage réduit l'invention, sans la supprimer. En 2024, des chercheurs de Stanford ont montré que des outils juridiques vendus pour ça se trompaient encore sur 17 à 33 % des questions.
  - *À l'écran* : Collage de la capture de l'article de Stanford (scotch). Une jauge horizontale se remplit en count-up de 17 à 33 % sur « 17 à 33 % » ; libellé « questions ratées ».
- **chute** : [warmly] Alors quand une IA te cite ses sources… [pause] ouvre au moins celles qui portent les chiffres importants.
  - *À l'écran* : Retour à la réponse et à ses fils : trois fils marqués d'un chiffre s'allument, et un document s'ouvre au bout du premier. Image finale pleine.

Description :

> L'ancrage aux sources (grounding), c'est obliger un modèle à appuyer chaque phrase sur un passage exact des documents fournis, et à dire « je ne sais pas » quand ils ne couvrent pas la question. Ça réduit l'invention sans la supprimer.
> https://neopal.github.io/lexique/ancrage-aux-sources/
> #hallucination #chatgpt #rag #vulgarisation
> Capture : arXiv (Magesh et al., Stanford, mai 2024).

Sources : Fiche ancrage-aux-sources de lexique/terms.js : Anthropic, Reduce hallucinations (dire « I don't know » ; citations mot pour mot ; vérifier chaque affirmation par une citation, sinon la retirer) ; https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations ; Fiche ancrage-aux-sources de lexique/terms.js : Magesh et al. (Stanford), 30 mai 2024 (Lexis+ AI et Westlaw AI-Assisted Research hallucinent sur 17 à 33 % des requêtes) ; https://arxiv.org/abs/2405.20362 ; Image : Patrice au quiz du repas de famille (fiche ancrage-aux-sources) ; scène inventée, aucun fait daté

Crédits images : Capture : arXiv, Magesh et al., « Hallucination-Free? » (public/voix/ancrage-stanford.png), citation, à produire

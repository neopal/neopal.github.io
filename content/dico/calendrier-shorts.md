# Calendrier des shorts « Les mots de l'IA »

Shorts à voix off pour YouTube, TikTok et Instagram ; recette dans `video/VOIX.md`, ton et règles dans `univers.md` (« Shorts à voix off », « Les shorts mythe »). Décidé le 2026-10-09, à revoir après l'épisode 7.

## Le principe

- **Deux formats en alternance**, un épisode par jour :
  - **Définition** (« C'est quoi ? … ») : un mécanisme expliqué, avec l'image de la vie courante de la fiche. Exemples : Prédiction, Hallucination.
  - **Mythe** (tampon « FAUX ») : une phrase entendue, sourcée, démontée par un mécanisme qu'on peut dessiner. Exemple : Base de données.
- **Un troisième format à tester une fois**, « Entendu au bureau » : la question d'un collègue (rubrique `office` de la fiche) et la réponse en 40 s. Il vise le public pro de LinkedIn ; on le garde s'il retient aussi bien que les deux autres.
- **Les décors de l'image varient** (retour PA, 2026-10-09) : deux épisodes à moins de trois d'écart ne partagent pas le même décor (mariage, bureau, repas de famille…). Le témoin de mariage (ép. 1) puis le DJ du mariage la même semaine, c'était trop ; Température passe donc en ép. 6.
- **Chaque épisode répond au précédent**, pour qu'un spectateur qui en voit un ait une raison de voir le suivant. L'ordre va du plus grand public au plus technique.
- **Après l'épisode 7**, on regarde dans YouTube Studio la rétention à 3 s et le pourcentage de vues complètes par format, puis on ajuste le rythme et les formats.

## La semaine du 27 octobre

Décidée le 2026-10-22, à la demande de PA qui voulait « AI brain fry » (fiche écrite le même jour, vague 21). Les mythes en réserve s'épuisent : deux mythes, cinq définitions, d'abord le fil fatigue et surveillance (ép. 18 et 19), puis du grand public au plus technique. Scripts et visuel scène par scène (champ `screen`) écrits le 2026-10-22, à relire dans `scripts-semaine-27-10.md` ; calage estimé sans voix, contrôle « lisible dans le métro » OK pour les sept. Mots anglais passés en API partout, hook compris (règle du 2026-10-22). Les sept compositions Remotion sont montées le 2026-10-22 sur le calage estimé, nouveaux personnages définis dans chaque composition. Deuxième passe le même jour après un audit visuel indépendant : vrais collages (portraits Commons pixelisés de Zidane, Petit et Goodhart, page de titre Hetzel, photo du Galaxy S4, captures des pages citées), crédits dans `video/public/voix/CREDITS-semaine-27-10.md`, dans les champs `credits` et dans les descriptions. Ép. 21 : « une liste de cinq mille mots » devient « cinq mille mots » et « besoin d'une pause » devient « besoin de faire une pause », pour les coupures de sous-titres. Voix PAL - FR générées le 2026-10-23 (eleven_v4, une prise chacune, 8 927 crédits ; flow « Lexique IA, shorts semaine du 27/10 »), chutes en `[warmly]` (règle du jour), de 61,6 à 68,2 s ; transcriptions gratuites du flow, calage sur la vraie voix, `check:voix` OK pour les sept, rendu v1 dans `video/out/shorts/<id>/`. Les sept shorts sont programmés le 2026-10-26 sur YouTube, TikTok et Instagram, du 27 octobre au 2 novembre à 8 h ; textes, statut et liens YouTube dans `publication-semaine-27-10.json`. Reste à faire : ajouter chaque short à `lexique/shorts.js` une fois en ligne. Le short d'actualité « Black October » (`black-october.script.json`, fiche `chasse-aux-failles-par-ia`, écrit le 2026-10-26) devient l'ép. 25, à caser après le 2 novembre.

| Date | Ép. | Format | Fiche | Composition | Fil avec l'épisode d'avant | Décor |
|---|---|---|---|---|---|---|
| mar. 27/10 | 18 | Définition | `ai-brain-fry` | `AiBrainFryVoix` | L'ép. 17 demandait si un benchmark mesure ton travail ; voilà ce que le travail avec plusieurs agents fait à ta tête | piscine municipale (maître-nageur) |
| mer. 28/10 | 19 | Définition | `human-in-the-loop` | `HumanLoopVoix` | La fatigue de surveiller frappe au moment de valider, quand on approuve par réflexe | aéroport (contrôle des bagages) |
| jeu. 29/10 | 20 | Mythe | `mythe-plus-gros-plus-intelligent` | `MythePlusGrosVoix` | Le classifieur ne se fatigue pas ; faut-il pour autant le plus gros modèle du catalogue ? | librairie (Vingt mille lieues sous les mers) |
| ven. 30/10 | 21 | Définition | `context-rot` | `ContextRotVoix` | La taille seule ne fait pas un meilleur modèle, la longueur du contexte non plus | cuisine de restaurant (le rail à bons) |
| sam. 31/10 | 22 | Mythe | `mythe-a-lu-tout-internet` | `MytheInternetVoix` | Ce qu'on lui colle, il le lit moins bien quand ça s'allonge ; ce qu'il a lu à l'entraînement, il ne le retrouve pas toujours | stade (la finale de 98) |
| dim. 01/11 | 23 | Définition | `token` | `TokenVoix` | Ce qu'il a « lu » d'Internet, ce sont des tokens, et c'est ce que tu paies | supermarché (la caisse) |
| lun. 02/11 | 24 | Définition | `benchmaxxing` | `BenchmaxxingVoix` | Le texte se compte en tokens, les modèles en points ; viser le score, retour à l'ép. 17 | école (les annales du bac) |

Titres et descriptions : champ `publication` de chaque `video/src/voix/<id>.script.json` (ids `brain-fry`, `human-loop`, `plus-gros`, `context-rot`, `tout-internet`, `token-voix`, `benchmaxxing`). Hooks provisoires (champ `todo`) pour les deux mythes, faute de citation réelle qui dise exactement le mythe. Nouveaux personnages sans sprite dans `Pixel.tsx` : Fabrice, Karima, Mourad, Raymond, Mathis. Vraies images à vérifier : couverture Hetzel 1871 de Vingt mille lieues (Commons), portraits d'Emmanuel Petit (CC BY-SA 3.0) et de Zidane (licence contestée sur Commons, à confirmer).

## La semaine du 20 octobre

Décidée le 2026-10-19, à partir de l'actu du mois (GPT-6 dans ChatGPT et son interface qui fabrique des calculatrices le 7 octobre, l'« ère de l'AGI » annoncée avec GPT-6 Astra, le p(doom) relancé en septembre, les scores d'ARC-AGI-3 selon le harness). Quatre mythes, trois définitions, en alternance. Scripts relus par PA, animations validées, voix PAL - FR générées (eleven_v4, 8 564 crédits) et calées le 2026-10-19 ; les sept shorts sont rendus en v1 dans `video/out/shorts/<id>/` (vidéo `-v1.mp4` et couverture `-cover.jpg`, non versionnés). Les sept shorts sont programmés le 2026-10-19 sur YouTube, TikTok et Instagram, du 20 au 26 octobre à 8 h. Les textes de publication sont dans `publication-semaine-20-10.json`, avec le statut et les liens YouTube, et la procédure est dans `publication-modop.md`. Reste à faire : ajouter chaque short à `lexique/shorts.js` une fois en ligne. Ép. 12 : quatre images générées exprès par IA (ElevenLabs, à mentionner dans la description, « images générées par IA, exprès »).

| Date | Ép. | Format | Fiche | Composition | Fil avec l'épisode d'avant | Décor |
|---|---|---|---|---|---|---|
| mar. 20/10 | 11 | Mythe | `mythe-chatgpt-c-est-le-modele` | `MytheModeleVoix` | L'agent de l'ép. 10 tourne sur un modèle ; ChatGPT aussi, et ce modèle change sous l'application | cinéma (James Bond) |
| mer. 21/10 | 12 | Définition | `ai-slop` | `AiSlopVoix` | Ce que ces modèles déversent quand personne ne relit | groupe WhatsApp de famille |
| jeu. 22/10 | 13 | Mythe | `mythe-ia-calcule` | `MytheCalculeVoix` | L'ép. 11 finit sur « ChatGPT est nul en calcul » ; voilà pourquoi | plateau télé (Des chiffres et des lettres) |
| ven. 23/10 | 14 | Définition | `agi` | `AgiVoix` | Le modèle devine les chiffres, et ses labos annoncent l'AGI ; laquelle ? | repas du dimanche |
| sam. 24/10 | 15 | Mythe | `mythe-sait-quand-il-ne-sait-pas` | `MytheSaitPasVoix` | « L'ère de l'AGI », et le modèle ne sait toujours pas quand il ne sait pas | maison (Inès, 4 ans) |
| dim. 25/10 | 16 | Définition | `p-doom` | `PDoomVoix` | Alors, quel risque ? Le chiffre qu'on se renvoie, et pourquoi il ne se compare pas | météo du 20 heures |
| lun. 26/10 | 17 | Mythe | `mythe-bon-score-bon-modele` | `MytheScoreVoix` | Le p(doom) est une opinion ; les benchmarks se mesurent, mais mesurent-ils ton travail ? | bureau (le nouveau, appel client) |

Titres et descriptions : champ `publication` de chaque `video/src/voix/<id>.script.json`, recopiés dans `scripts-semaine-20-10.md`. Les accroches des quatre mythes sont provisoires (champ `todo`) tant qu'on n'a pas de citation réelle et sourcée.

## La semaine du 13 octobre

Rien n'est sorti les 10, 11 et 12 : le calendrier glisse d'une semaine (2026-10-12). Les sept épisodes ont leur voix et sont rendus dans `video/out/shorts/<id>/` (état ci-dessous).

| Date | Ép. | Format | Fiche | Composition | Fil avec l'épisode d'avant | Décor |
|---|---|---|---|---|---|---|
| mar. 13/10 | 4 | Définition | `fenetre-de-contexte` | `FenetreVoix` | L'ép. 3 dit qu'il réécrit tout ; voilà ce qu'il a sous les yeux pendant qu'il écrit | bureau (tableau blanc) |
| mer. 14/10 | 5 | Mythe (« PAS ENCORE ») | `mythe-apprend-de-nos-conversations` | `MytheConversationsVoix` | Le paquet est sa seule mémoire ; ce qu'il « sait » de toi, c'est une fiche qu'on lui relit | salon de coiffure |
| jeu. 15/10 | 6 | Définition | `temperature` | `TemperatureVoix` | L'ép. 3 montre deux réponses à la même question ; voilà pourquoi | mariage (DJ) |
| ven. 16/10 | 7 | Mythe | `mythe-taux-d-erreur` | `MytheTauxVoix` | « S'il se trompe, il se trompe pareil » ; alors, combien de fois ? | bar (comptoir) |
| sam. 17/10 | 8 | Au bureau (test) | `rag` | `RagVoix` | Une vraie base de documents, cette fois, rangée à côté du modèle (réponse à l'ép. 3) | machine à café, bureau |
| dim. 18/10 | 9 | Mythe | `mythe-lit-mot-par-mot` | `MytheLitVoix` | Les passages collés par le RAG, il les lit d'un bloc, pas mot par mot | école (copies) |
| lun. 19/10 | 10 | Définition | `agent` | `AgentVoix` | Le modèle qui agit, après le modèle qui lit et écrit | dîner du jeudi |

En réserve : mythes `mythe-a-lu-tout-internet`, `mythe-ia-calcule`, `mythe-sait-quand-il-ne-sait-pas`, `mythe-plus-gros-plus-intelligent`, `mythe-chatgpt-c-est-le-modele` ; définitions de la file d'attente de `video/VOIX.md` (Token, Embedding, MCP, Open weights, Context rot, Harness, Benchmaxxing…).

## Où on en est (2026-10-12, soir)

- Les sept épisodes (4 à 10) ont leur voix PAL - FR en `eleven_v4` et sont rendus en v1 dans `video/out/shorts/<id>/` (vidéo `-v1.mp4` et couverture `-cover.jpg`, non versionnés). Voix 4, 8, 9, 10 générées par le MCP dans le flow (transcription gratuite, calée sur le texte) ; voix 5, 6, 7 générées par PA dans Eleven Creative, importées et transcrites, puis reportées sur le texte du script par `video/tools/words-from-transcript.py`.
- Reste à faire par PA : relire les vidéos, planifier et publier (titres et descriptions ci-dessous), puis ajouter chaque short à `lexique/shorts.js` (recette, étape 13 de `video/VOIX.md`).
- Points à écouter : ép. 6, Scribe a entendu « Balassa » pour « Thalassa » ; ép. 7, « aucun thé » pour « au quinté ». Si la voix le dit vraiment ainsi, refaire la prise.
- Toujours ouverts : les accroches sans citation sourcée (ép. 5 et 9, champ `todo` des scripts) ; Nadia (ép. 5) et Nadine (ép. 10), deux prénoms proches ; ép. 4 et 6, un sous-titre double un titre écrit à l'écran (« Du côté de chez Swann », « Freed from Desire ») pendant deux secondes.

## À publier : titres et descriptions

Un titre de 40 caractères au plus ; la description donne le terme, le lien de la fiche en entier et trois hashtags précis, plus #vulgarisation. Même texte sur YouTube, TikTok et Instagram.

**Ép. 4, mar. 13/10** (`fenetre`) : Pourquoi ChatGPT oublie tes consignes
> La fenêtre de contexte (context window), c'est tout ce que le modèle a sous les yeux quand il te répond ; à chaque message, l'application lui renvoie tout le paquet, et quand il déborde, le début passe à la trappe.
> https://neopal.github.io/lexique/fenetre-de-contexte/
> #fenetredecontexte #chatgpt #llm #vulgarisation

**Ép. 5, mer. 14/10** (`conversations`) : ChatGPT n'apprend pas en te parlant
> « L'IA apprend en direct de nos conversations » ; pas encore. Pendant que tu lui parles, ses paramètres sont figés, et ce qu'il semble retenir de toi, c'est la mémoire, une fiche que l'application lui relit. Tes conversations peuvent quand même servir à entraîner le modèle suivant (réglage « Améliorer le modèle pour tout le monde », activé par défaut).
> https://neopal.github.io/lexique/mythe-apprend-de-nos-conversations/
> #chatgpt #memoire #ia #vulgarisation

**Ép. 6, jeu. 15/10** (`temperature`) : Pourquoi ChatGPT ne répond jamais pareil
> La température, c'est le réglage qui dose le hasard quand le modèle tire chaque mot au sort ; basse, il est prévisible, haute, il ose, mais jamais plus juste.
> https://neopal.github.io/lexique/temperature/
> #temperature #chatgpt #llm #vulgarisation

**Ép. 7, ven. 16/10** (`taux-d-erreur`) : L'IA se trompe à 36 % ? Pas vraiment
> « 64 % de réponses pertinentes », entendu au Sénat en juin 2025 ; le chiffre vient d'une étude de 2023 qui mesurait tout autre chose. Une IA n'a pas de taux d'erreur, seulement celui que tu mesures sur tes propres cas.
> https://neopal.github.io/lexique/mythe-taux-d-erreur/
> #hallucination #chatgpt #ia #vulgarisation

**Ép. 8, sam. 17/10** (`rag`) : Le chatbot RH peut-il se tromper ?
> Le RAG (retrieval augmented generation) va chercher les bons passages dans tes documents avant que le modèle réponde ; s'il ramène le mauvais, le modèle répond quand même. Regarde toujours le passage cité.
> https://neopal.github.io/lexique/rag/
> #rag #chatbot #ia #vulgarisation

**Ép. 9, dim. 18/10** (`lit-mot-par-mot`) : L'IA ne lit pas mot par mot
> Le modèle ne voit jamais un mot, il reçoit des tokens, tous d'un coup (le prefill), puis écrit sa réponse un token à la fois. Tout lire d'un coup ne veut pas dire tout retenir pareil.
> https://neopal.github.io/lexique/mythe-lit-mot-par-mot/
> #tokenizer #llm #ia #vulgarisation

**Ép. 10, lun. 19/10** (`agent`) : L'IA qui agit au lieu de répondre
> Un agent, c'est un modèle qu'on laisse agir : un objectif, des outils, et il choisit lui-même les étapes. Avant de le laisser faire seul, donne-lui une copie, pas l'original.
> https://neopal.github.io/lexique/agent/
> #agentia #llm #ia #vulgarisation

## Publiés

| Date | Ép. | Format | Fiche | Titre |
|---|---|---|---|---|
| 07/10 | 1 | Définition | `prediction-du-mot-suivant` | ChatGPT ne sait pas comment sa phrase va finir |
| 08/10 | 2 | Définition | `hallucination` | Pourquoi ChatGPT invente des sources |
| 09/10 | 3 | Mythe | `mythe-base-de-donnees` | ChatGPT n'a pas de base de données |

# Bible de l'univers : le studio

Toutes les fiches et tous les shorts se passent dans le même studio, avec les mêmes personnages. Une fiche n'invente pas un nouveau décor ; elle prend un objet ou un personnage d'ici.

## Le casting

| Personnage ou objet | Ce que c'est dans l'IA |
|---|---|
| **Le groupe** | Le modèle. Il ne fait qu'une chose : jouer la note suivante. |
| **Le chanteur** | La voix qui sort, un morceau à la fois : la génération, token par token. |
| **La console** | Les paramètres : des milliards de potards, réglés pendant l'entraînement, puis figés. |
| **La sampleuse** | Le tokenizer : elle découpe ce qui entre en samples numérotés. |
| **La banque de samples** | Le vocabulaire : environ 200 000 bouts de son préenregistrés. |
| **La bande** | La fenêtre de contexte : tout ce que le groupe entend encore. Au-delà, le début du morceau est effacé. |
| **L'ingé son** | L'entraînement : il fait écouter des millions de morceaux et tourne les potards jusqu'à ce que ça sonne juste. |
| **Le public** | Les humains qui notent les réponses (RLHF) : applaudissements ou sifflets. |
| **Le producteur** | Celui qui donne la consigne avant la session : le system prompt, le harness. |
| **Le pupitre** | Ce qu'on pose devant le groupe pendant qu'il joue : documents, résultats de recherche (RAG). |
| **La tournée** | Les agents : le groupe sort du studio avec ses roadies et ses outils. |
| **Les maisons de disques** | Les labs : Anthropic, OpenAI, Google, Mistral, DeepSeek. |

## Correspondances prévues

| Concept | Image |
|---|---|
| Prédiction du token suivant | Jouer la note qui sonne juste après les précédentes |
| Température | Le curseur d'impro, du métronome au free jazz |
| Attention | L'oreille qui monte certaines pistes et baisse les autres |
| Quantization | Passer du WAV au MP3 |
| Distillation | Un groupe de reprise qui apprend en écoutant le grand groupe |
| MoE | Un orchestre de solistes, un chef qui en fait jouer 2 ou 3 à la fois |
| Fine-tuning | Régler la console pour un genre |
| Reward hacking | Jouer de plus en plus fort parce que l'applaudimètre ne mesure que le volume |
| Flagornerie | Ne jouer que ce que le public veut entendre |
| Hallucination | Un morceau joué avec aplomb qui n'a jamais existé |
| Open weights | Le preset complet de la console, donné à tout le monde |
| KV cache | Les pistes déjà enregistrées qu'on ne rejoue pas |
| Embeddings | Décor annexe : la carte du son, où les sons proches sont voisins |

## Règles d'usage

1. Une image par fiche, selon la règle « L'image d'une fiche » ci-dessous (le casting du studio ne sert plus qu'aux shorts). Pas de métaphore filée sur trois paragraphes.
2. Chaque fiche a son « Imagine » : un moment qui fait sentir le concept ou sa limite sans l'expliquer. C'est la signature du lexique, on simplifie sans mentir et on fait sourire, mais la forme change d'une fiche à l'autre (voir « Les formes de l'Imagine ») pour que la formule ne se voie pas.

## L'image d'une fiche (règle révisée, PA, 2026-10-03)

Le studio n'est plus le décor imposé de « L'image » : trop de termes n'y ont pas d'équivalent, et 14 fiches devaient avouer que « l'image triche sur un point ». Pour chaque notion, la métaphore vient de la vie courante (cuisine, bureau, bistrot, famille, commerce, métro, repas du dimanche) ou des arts (cinéma, musique, peinture, théâtre, BD, série). Le studio reste l'habillage visuel des shorts.

**Objectif** : faire comprendre la notion en une image, et faire sourire. L'humour est le véhicule, la justesse est le but : une image drôle mais fausse est un échec.

1. **Le mécanisme avant l'image.** Nommer d'abord la propriété clé (« les paramètres ne bougent plus pendant l'utilisation », « on rejette à partir de la première erreur », « le coût explose avec la longueur »). L'image rend CETTE propriété, pas seulement le thème.
2. **Test de cohérence.** Chaque élément de l'image correspond à un élément technique : quelqu'un qui n'a compris que l'image doit pouvoir deviner une propriété vraie de la notion. Si l'image a besoin d'un rectificatif, on change d'image.
3. **Un des quatre registres**, en alternant selon ce qui est le plus juste et le plus drôle :
   - **Chronique** (ton Society) : observé, juste, légèrement ironique ; un fait ou un portrait précis, une chute sèche.
   - **Absurde du quotidien** (ton Fabcaro) : bureau, métro, repas du dimanche, soirée à deux, la petite de 4 ans ; une situation banale qui dérape avec un sérieux total ; prénoms datés (Thierry de la compta, Patrick, Valérie, Gérard).
   - **Sagesse naïve** (la grand-mère) : un savoir empirique jamais formalisé, tendre, dont l'angle mort fait la chute.
   - **Comptoir** : une seule réplique de bistrot entre guillemets, lucide et un peu cynique ; le patron sait de quoi il parle.

**Écriture** : 1 à 3 phrases ; concret (prénom, chiffre, lieu, objet) ; la chute EST le point technique, sans explication après ; jamais « c'est comme », jamais de jeu de mots sur le terme ; pas de cliché IA (cerveau, robot, bibliothèque géante) ; les règles d'écriture et anti-slop ci-dessus s'appliquent. Les prénoms varient d'une fiche à l'autre (pas plus de deux fiches par prénom).

**Le répertoire que PA aime** (exemples de ton, pas à recopier) : des figures que tout le monde reconnaît en une ligne et des références de culture populaire qui disent un style d'un mot.
- Archétypes du quotidien : le crypto bro qui te dit de tout miser sur un jeton, le type qui se lève dix minutes avant l'arrêt et bloque la porte du train, celui qui double dans la file de la poste, le voisin qui te parle de la météo, le beau-frère qui a un avis sur tout au repas de famille, le collègue qui répond « vu » à tous les mails.
- Références : « spectaculaire, morne et gris, comme un film de Christopher Nolan », « Stanley Kubrick sur un plateau » (quarante prises pour une porte qui s'ouvre), une série, une BD, un chanteur, un sportif, tant que la référence est juste et connue.
- Ce qui fait le plus rire PA : les épisodes mordants qu'on a un peu oubliés, scandales, moments politiques, sport (Alonso en 2015 qui hurle « GP2 engine ! » à la radio). Uniquement des faits publics, datés et documentés, racontés sans insulter personne ; la chute porte sur la notion, pas sur la personne.
- Plus c'est court et reconnaissable, mieux c'est : une figure, un trait, une chute. Un même archétype ou une même référence sert à deux fiches au plus.

**Auto-contrôle avant de rendre** : la propriété technique est-elle exacte ? L'image la rend-elle sans rectificatif ? Fait-elle sourire à la première lecture ? Si une réponse est non, on réécrit.

L'« Imagine » garde ses cinq formes. Quand l'Imagine d'une fiche fait déjà le travail de l'image, l'image prend un autre angle de la notion plutôt que de répéter la même scène.

## Les formes de l'Imagine

Cinq formes, une par fiche. Deux fiches reliées dans le graphe (dans un sens ou dans l'autre) n'utilisent jamais la même forme ; on le vérifie au script, pas à l'œil.

| Forme | Ce que c'est | Règle |
|---|---|---|
| **A. L'ordre de grandeur rendu physique** | Un chiffre réel traduit en durée, en distance ou en livre (« si tu lisais les paramètres un par seconde... ») | Chiffres vérifiés ou calculés, le calcul est donné en source |
| **B. L'expérience à faire soi-même** | Un essai de 30 secondes que le lecteur peut faire tout de suite, avec un voisin ou un chatbot | On ne promet que ce qui se reproduit à coup sûr |
| **C. La scène absurde du studio** | Une situation impossible avec les personnages du casting, qui finit sur une chute | Deux fiches au maximum dans tout le lexique |
| **D. Le dialogue à deux répliques** | Une question, une réponse, entre guillemets « » avec leur attribution (pas de tiret de dialogue) | La réponse montre la limite sans la commenter |
| **E. L'avant / après** | La même situation vue deux fois, une seule chose a changé | La chose qui change, c'est le concept de la fiche |

Attribution actuelle :

| Fiche | Forme |
|---|---|
| Token | D (« la troisième lettre de bonjour ») |
| Mythe : la base de données | C (« la page 112 ») |
| Paramètres | A (21 000 ans pour lire DeepSeek-V3) |
| Prédiction du mot suivant | B (« Il était une » avec ton voisin) |
| Hallucination | D (le résumé d'une thèse de 1962 sur les pigeons voyageurs) |
| Fenêtre de contexte | A (Proust sur la bande) |
| Tokenizer | C (trois « bonjour », trois découpages) |
| Embedding | E (« congé maternité » contre « Politique parentalité ») |
| Température | E (le nom du bar, curseur à gauche puis à fond) |
| RAG | B (le menu de la cantine collé dans la conversation) |

Quand on ajoute une fiche, on regarde les formes de ses voisines et on prend une forme libre ; si les cinq sont prises, on retire un lien faible plutôt que de répéter une forme.

## Correspondance anglaise

Chaque fiche porte, juste après son titre :
- `en` : le terme anglais principal, celui qu'on lit dans la doc et les articles ;
- `aliases` : les variantes et abréviations courantes ;
- `jargon` : 0 à 4 formules qu'on entend vraiment (« un modèle 7B », « 1M context », « temp 0 ») avec leur traduction claire. Pas de jargon inventé pour remplir ; un chiffre dans une traduction est sourcé comme le reste.
- `aliases` ne contient que de l'anglais ; les variantes françaises (« jeton », « poids ») vont dans `aliasesFr`, affiché sous « Aussi appelé ». Les deux sont cherchables ; un alias qui n'est que le pluriel du titre reste cherchable mais ne s'affiche pas.

## Solutions populaires

Champ optionnel `solutions: [{name, kind, url}]`, rendu après « Dans le jargon » et cherchable par nom (taper « Pinecone » mène au RAG).
- Seulement quand le lecteur repart avec un outil à essayer : RAG, Embedding, Tokenizer, Token, Paramètres. Pas ailleurs sans évidence.
- 6 entrées au plus (exception : Skill, 10 à 15 dépôts connus à date, demande PA du 2026-10-02), groupées par `kind`, un type court en français (« base vectorielle », « modèle d'embedding », « plateforme cloud », « bibliothèque open source », « outil pour tester »).
- Mélanger commercial, cloud et open source.
- URL = site ou doc officielle, vérifiée avant publication (une URL qui ne répond pas se corrige ou l'entrée sort).
- Aucun adjectif commercial, aucune affirmation de part de marché.

## Le studio dans les shorts

Dans les shorts, le studio est un habillage, pas une métaphore filée : rythme des coupes sur le beat, sound design, palette, transitions. L'explication montre le vrai mécanisme (les vrais tokens, les vrais numéros, les vraies probabilités). On n'utilise une image du studio que si elle explique mieux que le mécanisme lui-même.

Gabarit d'un short (35 s) :

| Temps | Bloc | Rôle |
|---|---|---|
| 0-3 s | Hook | Un fait surprenant, une phrase |
| 3-10 s | Anecdote | Une histoire vraie, datée, avec un nom |
| 10-25 s | Visualisation | Le mécanisme montré tel quel : le moment « ah ouais, je visualise » |
| 25-32 s | Et donc | Ce que ça change pour le spectateur |
| 32-35 s | Chute | Une phrase qui reste |

Test de sortie : le spectateur peut-il redessiner le mécanisme sur une serviette ? Sinon, la visualisation est à refaire.

Règles apprises sur le pilote Token (2026-10-02) :
- Ouvrir par la question du terme (« Qu'est-ce qu'un token ? ») : on est sur un site éducatif, le spectateur doit savoir ce qu'il va apprendre.
- Le lien de cause se montre, il ne se dit pas. Une anecdote (le bug strawberry) n'explique rien tant qu'on n'a pas vu POURQUOI le mécanisme la produit (les r enfermés dans les blocs).
- Un seul fil par short : couper ce qui ne sert pas ce fil (la rafale bonjour / fraise a sauté).
- Rythme : une nouvelle info toutes les 2 à 4 secondes, pas d'écran d'attente.

Règles d'écriture des textes à l'écran (retour PA, 2026-10-02) :
- Un texte à l'écran reste une phrase, avec sujet, verbe et connecteurs. Pas de réponse-fragment (« Un bloc de texte. »), pas de verdict d'un mot (« Faux. »), pas de paire de phrases courtes qui se répondent (« Il ne lit pas X. Il lit Y. »).
- Pas de deux-points de révélation : le contexte d'abord (« Quand tu interagis avec un LLM, tout se compte en tokens »).
- Le terme technique juste est montré (input tokens, output tokens) : le spectateur doit repartir avec le vocabulaire.
- Les phrases longues s'écrivent en casse normale ; les capitales sont réservées aux mots géants (le terme, le chiffre).
- Pas de surtitre mono espacé en haut de l'écran (« FONDATIONS / TOKEN 01 ») : ça fait template généré.
- Passe humanizer §R (staccato explicatif) sur chaque script avant rendu.

Règles de rythme et de visuel (retour PA sur la v3, 2026-10-02) :
- Une phrase seule à l'écran ennuie : chaque scène a un visuel qui bouge (interface de chat, schéma, frise, barres qui montent, icône qui se dessine).
- Chaque élément tombe sur un temps ; transitions sèches entre scènes, légère poussée de caméra en continu.
- Les données se montrent en graphique qui se construit (barres, frise, flux de tokens), jamais en chiffre posé seul.
- Un liseré en fond pulse sur le beat (plus fort au premier temps de la mesure) : c'est le seul habillage permanent avec la barre de progression.
- Icônes dessinées en SVG maison (croix, coche, cadenas, œil, ciseaux), pas de pack d'icônes générique.
- Durée cible : 30 à 32 s.

## Gabarit d'une fiche

En une phrase (ELI5, littérale : le studio n'y entre pas) > Correspondance anglaise (en, aliases anglais, aliasesFr, jargon) > L'image (studio, en disant qui est qui, avec une ouverture différente d'une fiche à l'autre : « vois le tokenizer comme... », « dans le studio, c'est... », « si le modèle est un groupe... », « le chanteur, c'est... » ; deux fiches n'ouvrent jamais leur image par la même tournure) > Imagine (une des cinq formes) > Définition complète (le sérieux) > 2024 vs 2026 (si une vraie évolution existe) > Entendu au bureau > À éviter > Script du short.
3. Le studio sert l'explication ; si un concept s'explique mieux sans lui, on s'en passe et on le dit.
4. Les exemples sont récents (2025-2026) dès qu'ils existent ; la rubrique « 2024 vs 2026 » apparaît seulement quand il y a une vraie évolution à raconter.

## Règles de la page web (retour PA, 2026-10-02)

- Nom de la section : **Lexique IA**. Wordmark en texte simple, une seule couleur (pas de « IA » en couleur d'accent).
- Aucun micro-texte décoratif : pas de surtitre qui répète le titre, pas de légende qui décrit l'évidence (« La version courte en 30 secondes, à partager »), pas d'indication d'usage quand l'interface parle d'elle-même.
- Test avant mise en ligne : lister chaque texte qui n'est pas du contenu (surtitres, légendes, aides, libellés) et supprimer ceux qu'un lecteur ne regretterait pas.

## Gestes de prose

Les gestes tirés des livres d'inspiration de PA (verbes anthropomorphes marqués, exemple fil rouge, terme pivot FR avec l'anglais une fois, histoire vraie qui installe l'idée, carte qu'on zoome...) sont dans `gestes-prose.md`, chacun avec son application et sa dérive. Les lire avant d'écrire une fiche ou un script. Le plan de tous les termes à écrire est dans `plan-termes.md`.

## Varier les exemples (règle PA, 2026-10-02 : « varie varie »)

- Un même exemple (un livre compté en tokens, un fait type « Paris est la capitale de la France », un incident, un modèle avec ses chiffres) apparaît dans deux fiches au maximum.
- Exceptions, les fils rouges voulus : strawberry / st raw berry (Token, Tokenizer) et « un train pour Lyon jeudi » (Agent, Boucle agent, Tool use).
- Les tournures aussi se surveillent d'une fiche à l'autre : ouverture de l'Imagine, réponse de l'« Entendu au bureau » (pas de série en « Parce que »), première phrase du « 2024 vs 2026 », chutes.
- Pour remplacer un exemple, en prendre un autre réel, vérifié et récent. Un livre compté en tokens vient du Projet Gutenberg, compté avec tiktoken (o200k_base) sur le texte entre les marqueurs START et END, et le calcul va dans le libellé de source. Déjà pris : Du côté de chez Swann (Fenêtre de contexte), Madame Bovary (Tokenizer), Vingt mille lieues sous les mers (Mythe : plus gros), Le Comte de Monte-Cristo (Modèles de raisonnement).
- On vérifie au script avant de publier : compter les n-grammes de 4 à 6 mots partagés entre fiches et traiter ceux qui portent un exemple ou une tournure, pas le vocabulaire du domaine (« la fenêtre de contexte »).

## Sources (règle PA, 2026-10-02)

- Uniquement des sources réelles, ouvertes et vérifiées (la page répond et contient bien le fait cité). Jamais de source reconstituée de mémoire.
- La plus récente possible quand plusieurs existent (préférer 2025-2026 à 2023).
- Si aucune source vérifiable n'existe pour un fait, on retire le fait ; si une fiche n'a aucune source vérifiable, pas de bloc Sources plutôt qu'une source douteuse.

## Fiches modèles (classement du lecteur exigeant, 2026-10-02)

À relire avant d'écrire une fiche : ce sont les trois mieux notées, chacune avec une forme d'Imagine différente.
- **fine-tuning** (dialogue) : la réponse « Pas spam. » montre la limite sans un mot de commentaire et fait rire ; une règle qui tranche (« RAG pour les faits, fine-tuning pour la manière ») avec un exemple daté.
- **rag** (expérience à faire soi-même) : le lecteur refait le mécanisme en 30 secondes et repart praticien (« Tu viens de faire du RAG à la main »), puis un chiffre sérieux en contrepoint.
- **flagornerie** (avant / après) : une seule variable change entre les deux scènes, le renversement se suffit à lui-même, puis une histoire vraie et datée, puis la cause.
Défauts des fiches les moins bien notées, à éviter : noms de modèles opaques et chiffres en rafale (tailles-de-modele, moe), six chiffres en deux phrases, dates empilées sans image, Imagine qui finit par une explication. Ouvertures « Avant, » : encore 8 Imagines, à ne plus utiliser.

## Règles vidéo v2 (critique des 7 premiers shorts, 2026-10-02)

- **Temps de lecture** (révisé le 2026-10-02 après retours : « pas le temps de lire », notamment sur Paramètres) : au plus 12 caractères par seconde pour chaque légende, mesurés de son apparition à la suivante moins 0,3 s d'animation d'entrée. L'œil lit la légende ET regarde le schéma : l'ancienne règle de 0,3 s par mot donnait 15 à 19 car/s, trop rapide. Pour garder un short nerveux, on coupe des mots plutôt qu'on allonge : une légende fait 50 à 80 caractères (10 à 15 mots), et ce que le schéma montre déjà (noms, dates, chiffres) sort de la phrase. 60 à 90 mots par short. Contrôle : `cd video && npm run check`.
- **Durée** : 35 à 45 s si le temps de lecture l'exige ; la règle des 30-32 s cède devant la lisibilité.
- **Zone de légende fixe** : la phrase occupe toujours la même zone (tiers haut), le schéma le tiers central, le tiers bas sert aux chiffres et libellés. L'œil ne cherche jamais la légende.
- **Taille minimale** : aucun texte sous 36 px sur un cadre de 1080 px (environ 13 px sur un téléphone) ; libellés mono à 36-44 px.
- **Pas de gabarit répété** : chaque short a au moins une scène dont la mise en scène n'existe dans aucun autre (pas deux « Et donc » en checklist avec un œil) ; l'italique couleur d'accent sert au plus deux fois par short.
- **Chute** : une seule légende, au moins 3 s de lecture, puis une image finale pleine (pas un cadre presque vide).
- **Carte titre** : 45 images partout, mot géant de taille constante d'un short à l'autre.

## Shorts à voix off (YouTube Shorts / TikTok, validé par PA le 2026-10-07)

Un format à part, pour YouTube et TikTok seulement : il ne remplace pas les vidéos muettes des fiches du site. Référence : le short Prédiction du token suivant (`video/src/PredictionVoix.tsx`, texte dans `video/src/voix/prediction.script.json`). La recette pas à pas (outils, commandes, pièges, coûts) est dans `video/VOIX.md`.

**Le ton : un podcast narré, avec un tout petit peu d'enthousiasme** (révisé par PA le 2026-10-09 : la première phrase d'Hallucination était trop enjouée). On parle au spectateur (« tu »), on pose des questions, on marque des pauses avec des points de suspension ; le ton et le rythme varient, mais légèrement, sans emphase de présentateur. Indications de jeu sobres : `[warmly]` (la première phrase), `[curious]`, `[softly]`, `[pause]`, et au plus un `[mischievously]` par short ; plus de `[excited]`, et jamais sur la première phrase. Jamais `[calmly]` : avec PAL - FR, la voix chuchote (retour PA, 2026-10-12, hook de Fenêtre « ridicule ») ; la première phrase se dit d'une voix posée, à pleine voix. Elles tiennent jusqu'à la suivante : on en change quand le ton change, pas à chaque phrase.

**La première image est la question du terme**, dite par la voix et écrite en grand : « C'est quoi ? la prédiction du token suivant… ». Dans le texte de la voix, on écrit « C'est quoi... la température… » : les points de suspension après « quoi » sonnent mieux que le point d'interrogation (test de PA, 2026-10-12) ; l'écran garde « C'est quoi ? ». Puis, dans l'ordre : une accroche qui retourne une idée reçue (« tu crois qu'il a déjà toute sa réponse en tête ? »), la notion de départ expliquée simplement (qu'est-ce qu'un token), le terme nommé en français puis en anglais, et seulement ensuite l'image (le témoin de mariage), le mécanisme, ce que ça change, la chute.

**Le terme anglais se prononce en anglais** : on l'écrit en API entre barres obliques dans le texte de la voix (`/nɛkst ˈtoʊkən pɹɪˈdɪkʃən/`) et sa forme écrite dans le champ `display` du script, pour les sous-titres. Quand le mot anglais est le même que le français, à l'accent près ou avec un « AI » devant (température / temperature, agent / AI agent), on ne le dit pas et on ne l'écrit pas à l'écran (retour PA, 2026-10-12).

**Les shorts « mythe »** (recette tirée du short Base de données, validé par PA le 2026-10-09, après l'échec de « L'IA n'existe pas ») :
- **Le tampon FAUX vise une phrase fausse telle qu'elle est écrite** (retour PA, 2026-10-09, sur « L'IA apprend de nos conversations ») : si une partie est vraie (les conversations entraînent le modèle suivant, la recherche teste des modèles qui apprennent pendant l'usage), on resserre la phrase sur ce qui est faux (« en direct ») et le short dit aussi ce qui est vrai. Si la chose existe en recherche mais pas dans les produits, le tampon dit « PAS ENCORE », pas « FAUX ».
- **Un mythe qui se montre, pas un débat de mots.** Le bon sujet a un mécanisme qu'on peut dessiner (une armoire vide, des potards, une bibliothèque qui tient dans un livre, des tokens qui s'écrivent). Un mythe qui se réfute par des distinctions de vocabulaire (« conscience ou discipline ») oblige à mettre des phrases à l'écran : on le laisse à la fiche.
- **L'accroche est la phrase du mythe, sourcée et en grand, puis un tampon « FAUX »** posé juste après la citation, qui reste jusqu'à la fin du hook : c'est l'image de couverture. L'objet d'où vient la phrase (livre, capture) est collé à côté. On vise l'idée : l'auteur n'est pas nommé à l'oral, la couverture suffit à sourcer.
- **Un fil, une scène par idée, une phrase par scène.** Deux histoires ne partagent jamais une phrase (« deux réponses » puis « les avocats » : deux phrases, deux scènes), sinon le sous-titre de l'une arrive sur l'image de l'autre.
- **L'image de la vie courante plutôt que le ratio.** « 1 900 tokens par potard » ne parlait à personne ; « une bibliothèque entière résumée dans un seul livre » se voit.
- **Deux preuves concrètes et datées**, dont une qui fait sourire (la jurisprudence inventée, 5 000 dollars d'amende), puis une chute qui reprend les images du short (la même jauge d'aplomb sur la bonne et la mauvaise réponse).
- **Aucune scène n'ouvre sur un écran vide** : quelque chose est posé dès les premières images, même avant le mot-repère. Chaque élément part quand il a servi.
- **Vérifier les faits sur la personne citée** : un titre qu'elle se donne (« cocréateur de Siri ») n'est pas un fait s'il est contesté.

**Durée : 60 à 70 s**, environ 170 mots dits. Au-delà, on coupe le texte plutôt que d'accélérer la voix.

**Règle « lisible dans le métro »** : un humain normal, téléphone à la main, debout dans une rame qui bouge, lit tout ce qui est à l'écran sans plisser les yeux.
- Aucun texte sous 48 px sur un cadre de 1080 px (libellés compris) ; sous-titres à 84 px, en Newsreader 600.
- Un sous-titre remplit 2 lignes entières, jamais 3 (la coupure se calcule sur la largeur réelle du texte, environ 20 caractères par ligne ; une 3e ligne fait coller le sous-titre au bord haut dans le fil Instagram) et reste au moins 1 s à l'écran ; le mot dit s'allume en couleur d'accent. Pas de bouts de phrase qui défilent trop vite pour être lus (retour PA, 2026-10-09), et une ligne ne finit ni sur un petit mot (« de », « que ») ni sur un nombre séparé de son unité.
- **Illustrer plutôt qu'étiqueter** (retour PA, 2026-10-09) : quand le texte cite un objet réel (un livre, un outil, un document, une personne), on montre l'objet lui-même en collage (vraie couverture, capture, portrait en pixel art, scotch aux coins, posé d'un coup) plutôt qu'une icône et un libellé. Crédit de l'image dans la description.
- L'écran ne double pas les sous-titres : il montre un schéma, et ses libellés font 3 mots au plus. Une carte de phrase à lire en même temps que le sous-titre crée la confusion (retour PA sur le short « L'IA n'existe pas », 2026-10-09).
- Ce qui est déjà écrit en grand à l'écran n'est pas sous-titré une deuxième fois (retour PA, 2026-10-12 : « context window » sous-titré sous « context window » écrit en grand, c'est fouillis) : la question du hook (`nocaption`), les citations montrées par le schéma (`quoted`), et le nom du terme, en français et en anglais, dans la scène qui le pose (`onscreen` du script : `{scène: [passages]}`, les passages dits pendant qu'ils sont écrits en grand). Une seule lecture à la fois : soit le sous-titre, soit l'écran.
- Le sous-titre et le schéma ne se touchent jamais : le bas du sous-titre est à 140 px au-dessus de la zone du schéma (`CAP_GAP`), pour qu'on ne lise jamais le sous-titre et le haut du schéma comme un seul bloc (à 70 px, ça collait encore, retour PA du 2026-10-12), et un schéma trop haut déborde vers le bas (`safe center` dans `Scene`), jamais vers le sous-titre (retour PA sur l'épisode Fenêtre, 2026-10-12).
- Un seul élément central par écran ; un libellé de schéma fait 3 mots au plus. Pas d'élément qui reste à l'écran sans raison (la bulle « Raconte-moi une histoire » de la v2 a sauté pour ça).
- Libellés secondaires en `#cfcfcf` au plus sombre, jamais de gris foncé sur noir.

**L'écran suit la voix** (retour PA sur le comptoir du short taux d'erreur, 2026-10-09 : l'expresso et le quinté arrivaient à contretemps, avec des libellés que la voix ne disait pas) :
- **Un élément entre sur le mot qui le nomme**, pas avant. Seul le décor de la scène (le comptoir, le miroir du salon) est posé dès l'entrée, pour qu'aucune scène n'ouvre sur un écran vide.
- **Un libellé reprend les mots dits** : la voix dit « infaillible », l'écran ne met pas « 0 erreur » ; la voix dit « 28 sur 30 », l'écran ne met pas « 28 / 30 ». Ce que la voix ne dit pas ne s'écrit pas, sauf un chiffre que la voix donne en toutes lettres. Un libellé nomme un objet du schéma (« la réponse », « Sylvie », « 28 morceaux ») ; il ne reformule pas la phrase que le sous-titre affiche déjà (« un token à la fois » sous « s'écrit un token à la fois » : supprimé).
- **Une idée à la fois** : quand la voix passe à l'idée suivante, l'élément d'avant s'efface ou passe en retrait.
- **Une image montre ses personnages**, en pixel art comme le portrait du Sénat : le patron du bar, Nadia, le DJ, pas seulement leurs objets. Une personne réelle citée apparaît en portrait pixelisé, crédité dans la description.
- **Contrôle avant rendu** : pour chaque scène, relire la phrase dite à côté de la liste de ses `at(scène, mot)` ; chaque élément doit tomber sur le mot qu'il illustre.

**Le mouvement** (principes d'animation retenus par PA, 2026-10-09 ; outils `ease`, `arc` et `squash` dans `video/src/kit.tsx`) :
- **Jamais de mouvement linéaire** : ce qui entre, se dessine ou se remplit part vite et se pose doucement (`ease`, courbe `out`) ; ce qui se déplace ou s'efface démarre et s'arrête en douceur (`inOut`). Seul un compte calé mot à mot sur la voix reste linéaire (les cases cochées une à une).
- **Arcs** : ce qui vole d'un point à un autre (bulles, fiche, tasse) suit une courbe (`arc`), jamais une ligne droite.
- **Décalage** : l'objet d'abord, son libellé 4 à 6 images après, jamais ensemble ; une série (cartes, cases) entre en cascade.
- **Anticipation** pour les gestes qui comptent : un petit recul avant de partir (la tasse et le ticket avant de se fondre).
- **Squash & stretch** réservé aux impacts (le tampon FAUX, la balle de paintball), à volume constant (`squash`). Ailleurs, il jure avec le style sec.
- **Un seul détail vivant par personnage** (il cligne des yeux, `Pixel`) : il ne doit pas voler la vedette au schéma.
- Pas d'exagération de plus que le léger dépassement du ressort de `Pop` : au-delà, ça fait appli pour enfants.
- Contrôle avant rendu : `cd video && npm run check:voix -- <id> <Composition>`.

**Le vocabulaire du motion** (tiré de deux bibliothèques MIT, showheyohtaki/motion-prompt et apenasdouglas/ai-motion-library, retenu le 2026-10-19) : chaque effet a un nom, et le code le nomme en commentaire (fade in, pop in, stagger, count-up, typewriter, highlight, draw-on, mask reveal, wipe, punch zoom, bar grow), pour qu'on puisse en parler sans le décrire.
- **Deux effets au plus par élément** : une entrée et, au besoin, une emphase (pop in puis highlight). Au-delà, l'œil ne sait plus quoi regarder.
- **Une chose bouge à la fois**, et chaque mouvement est suivi d'un temps de pose avant le suivant ; deux mouvements qui prennent tout le cadre ne se chevauchent jamais.
- **La sortie va plus vite que l'entrée**, environ 70 % de son temps (`gone`, 6 images, contre une dizaine pour `Pop`).
- **La cascade suit l'ordre de lecture**, de gauche à droite et de haut en bas, avec 2 à 3 images (0,06 à 0,1 s) entre deux éléments.
- **Une seule famille de courbes par short** (cubic du kit) ; le linéaire est réservé au compte calé sur la voix et au défilement continu.
- **Recettes** (briques dans `video/src/kit.tsx`) : un chiffre d'impact compte de 0 à sa valeur en 1 à 1,5 s (`countUp`), puis donne un punch zoom à l'arrivée (`punch` : 100 % à 110 % en 0,15 s, retour en 0,3 s), sur le mot qui le dit ; une citation s'écrit à la machine (`typed`, 25 à 40 caractères par seconde) puis se surligne de gauche à droite en 0,4 s (`Highlight`) ; un avant / après passe en wipe de 0,5 à 0,7 s ; une série de valeurs pousse en bar grow avec cascade ; un trait se dessine en 1,5 à 2 s (draw-on) ; un portrait ou une image fixe prend un Ken Burns de 5 % sur toute la scène.
- **Le punch zoom est rare** : un par short au plus, sur le chiffre ou le mot qui porte la scène, jamais sur le hook d'un mythe (le tampon y fait déjà l'impact).

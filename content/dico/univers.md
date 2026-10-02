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

1. Une image par fiche, tirée de ce casting. Pas de métaphore filée sur trois paragraphes.
2. Chaque fiche a son « Imagine » : un moment qui fait sentir le concept ou sa limite sans l'expliquer. C'est la signature du lexique, on simplifie sans mentir et on fait sourire, mais la forme change d'une fiche à l'autre (voir « Les formes de l'Imagine ») pour que la formule ne se voie pas.

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
- 6 entrées au plus, groupées par `kind`, un type court en français (« base vectorielle », « modèle d'embedding », « plateforme cloud », « bibliothèque open source », « outil pour tester »).
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

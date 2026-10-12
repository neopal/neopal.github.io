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

## La semaine du 13 octobre

Rien n'est sorti les 10, 11 et 12 : le calendrier glisse d'une semaine (2026-10-12). Les sept épisodes sont prêts en version sans voix dans `video/out/shorts/<id>/`, à relire avant les voix.

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

## Où on en est (2026-10-12, pour reprendre ailleurs)

- Les sept épisodes de la semaine (4 à 10) sont montés sans voix, sur un calage estimé (`*.words.json` marqués `estimated`). Les vidéos de relecture sont dans `video/out/shorts/<id>/`, non versionné : sur une autre machine, les refaire avec `npx remotion render src/index.ts <Composition> ...` (recette dans `video/VOIX.md`).
- Prochaine étape : la voix de l'ép. 4 (`fenetre`, sortie mar. 13/10), PAL - FR en `eleven_v4`, puis transcription du nœud, `node tools/align-from-words.mjs fenetre`, contrôle, rendu ; ensuite les ép. 5 à 10 dans l'ordre.
- Questions ouvertes pour PA avant les voix : le format « Entendu au bureau » (ép. 8) ; la scène des arcs (ép. 9) ; Nadia (ép. 5) et Nadine (ép. 10), deux prénoms proches ; les accroches sans citation sourcée (ép. 5 et 9, champ `todo` des scripts) ; le réglage ChatGPT « Améliorer le modèle pour tout le monde » activé par défaut (ép. 5, à vérifier dans ses réglages).

## Publiés

| Date | Ép. | Format | Fiche | Titre |
|---|---|---|---|---|
| 07/10 | 1 | Définition | `prediction-du-mot-suivant` | ChatGPT ne sait pas comment sa phrase va finir |
| 08/10 | 2 | Définition | `hallucination` | Pourquoi ChatGPT invente des sources |
| 09/10 | 3 | Mythe | `mythe-base-de-donnees` | ChatGPT n'a pas de base de données |

# Shorts à voix off : la recette

Format YouTube Shorts / TikTok, avec une voix et une musique ElevenLabs. Il ne remplace pas les vidéos muettes des fiches du lexique. Le ton, l'ordre du récit et la règle « lisible dans le métro » sont dans `content/dico/univers.md` (section « Shorts à voix off ») : les lire avant d'écrire le texte.

Référence validée : Prédiction du token suivant (2026-10-07), rendu dans `video/out/shorts/prediction/` (non versionné).

## Les fichiers d'un short `<id>`

| Fichier | Rôle |
|---|---|
| `src/voix/<id>.script.json` | Le texte dit, découpé en segments (un par scène), avec les indications de jeu ; `quoted`, `nocaption` et `display` règlent les sous-titres |
| `public/voix/<id>.mp3` | La voix retenue |
| `public/voix/<id>-music.mp3` | La musique |
| `src/voix/<id>.words.json` | La transcription mot à mot de la voix (Scribe), source du calage |
| `src/voix/<id>.align.json` | Le calage généré : début et fin de chaque scène et de chaque mot |
| `src/<Composition>.tsx` | Les scènes, une par segment, synchronisées sur les mots (`at('scene', 'mot')`) |
| `src/voix/VoixShort.tsx` | Le moteur commun : calage, sous-titres, hook titre, musique, montage |
| `src/voix/_modele.script.json` | Le modèle de texte d'un nouveau short |
| `src/voix/chunks.mjs` | Le découpage des sous-titres, partagé avec le contrôle |

## Démarrer un nouveau short

1. Copier `src/voix/_modele.script.json` en `src/voix/<id>.script.json` et écrire le texte (une scène par segment, noms de scènes libres).
2. Copier `src/PredictionVoix.tsx` en `src/<Nom>Voix.tsx` : garder l'en-tête (`makeVoix`, `V.TitleHook`, `V.Montage`), remplacer les scènes. Le moteur commun (calage, sous-titres, hook, musique, montage) est dans `src/voix/VoixShort.tsx` et ne se recopie pas.
3. Déclarer la composition dans `src/Root.tsx`.
4. Musique : pour économiser 900 crédits, réutiliser la piste de Prédiction avec `makeVoix(ALIGN, SCRIPT, 'voix/prediction-music.mp3')` ; si elle est plus courte que la voix, elle boucle.
5. Suivre le déroulé ci-dessous à partir de l'étape 2.

Budget : environ 1 300 crédits par short (voix seule, transcription gratuite), plus les prises que PA refait lui-même. Avec la musique réutilisée, 10 000 crédits font environ 7 shorts.

## File d'attente

Termes qui ont déjà une fiche et un short muet (donc des scènes à reprendre dans `src/<Terme>.tsx`), du plus grand public au plus technique : Hallucination, Température, Fenêtre de contexte, RAG, Agent, Paramètres, Token, Embedding, MCP, Open weights, Context rot, Sans état, Non-déterminisme, Harness, Benchmaxxing. Publiés : Prédiction du token suivant (2026-10-07). V1 rendue : Hallucination (2026-10-08, voix PAL - FR). Playlist YouTube : « Les mots de l'IA ».

## Le déroulé

Rangement de `out/` (non versionné) : `out/shorts/<id>/` ne contient que les livrables d'un short (une vidéo par version `-v1`, `-v2`…, la couverture, les tests de voix) ; les images de contrôle et le rendu brut vont dans `out/tmp/`, vidé quand le short est livré. Rien d'autre à la racine de `out/`.

1. **Écrire le texte** dans `<id>.script.json`, un segment par scène : hook (la question du terme), intro, notion de départ, nom du terme, image, mécanisme, et donc, chute. Environ 170 mots. Les termes anglais en API entre barres obliques, leur forme écrite dans `display`.
2. **Générer la voix dans le flow ElevenLabs** (MCP `elevenlabs`, outil `creative_generate_speech`, `generations_count: 1`). Modèle `eleven_v4`. La voix, c'est PA qui la choisit et peut générer lui-même ses prises dans le flow en retouchant le texte ; la voix retenue pour Prédiction est **Adrien Clairon - Podcast Narrator** ; à partir d'Hallucination, on essaie **PAL - FR**, la voix clonée de PA (`mW090pzjsAt4gvt0DNB8`), avec Adrien en repli. Si PA retouche le texte dans le flow, reporter ses changements dans le script : le calage compare les deux.
3. **Récupérer la voix** (`media[].url` du statut de la génération, ou le mp3 exporté par PA) dans `public/voix/<id>.mp3`.
4. **Transcrire le nœud de la voix** dans le flow (`creative_transcribe_audio`, `connect_from` = le nœud TTS). Sur un nœud généré, c'est gratuit et Scribe aligne le texte du prompt mot à mot. Télécharger `words_download_url` dans `src/voix/<id>.words.json`.
5. **Musique** : `creative_generate_in_flow`, `node_type: music`, `eleven_music_v1`, un prompt qui commence par `Instrumental only, no vocals.`, 120 BPM (le liseré du fond pulse à ce tempo), une durée un peu plus longue que la voix. Dans `public/voix/<id>-music.mp3`.
6. **Caler** : `node tools/align-from-words.mjs <id> --music`. Options : `--tempo=1.1` si la voix a été accélérée au montage (`ffmpeg -af atempo=1.1`), `--lead=1.8` si on ajoute un silence avant la voix (un segment au texte vide occupe ce temps). Le script s'arrête si la transcription ne correspond pas au texte.
7. **Contrôler** : `npm run check:voix -- <id> <Composition>` (lisibilité des sous-titres et tailles de texte). Corriger jusqu'à « OK ».
8. **Vérifier quelques images** avant le rendu complet : `npx remotion still src/index.ts <Composition> out/tmp/<n>.png --frame=<n>`.
9. **Rendre** : `npx remotion render src/index.ts <Composition> out/tmp/raw.mp4 --concurrency=12` (environ 3 min pour 70 s ; sans `--concurrency`, plus de 10 min).
10. **Encoder pour YouTube / TikTok** :
    `ffmpeg -i out/tmp/raw.mp4 -c:v libx264 -crf 23 -pix_fmt yuv420p -af loudnorm=I=-14:TP=-1:LRA=11 -c:a aac -b:a 192k -ar 48000 -movflags +faststart out/shorts/<id>/<id>-v<n>.mp4`
11. **Générer la couverture** : la première image ne montre que « C'est quoi ? », car le reste du titre arrive avec la voix ; YouTube et TikTok en feraient une miniature incomplète. On rend une image où la question complète est à l'écran, à la fin du hook (vers 2,7 s ; vérifier que le dernier mot du titre est posé) :
    `npx remotion still src/index.ts <Composition> out/shorts/<id>/<id>-cover.png --frame=80` puis `ffmpeg -i out/shorts/<id>/<id>-cover.png -q:v 2 out/shorts/<id>/<id>-cover.jpg`.
    YouTube : *Miniature > Ajouter* à la mise en ligne. TikTok : importer l'image si proposé, sinon choisir une image de la vidéo pendant le hook.
12. **Titre et description** : un titre court (40 caractères au plus, sinon les Shorts le coupent à l'écran) qui crée la curiosité, le terme technique dans la description pour la recherche, le lien vers la fiche du lexique, trois hashtags précis. Passe anti-slop (VOICE.md de PA) : pas de tiret cadratin, pas de « Découvrez », pas d'emoji décoratif, pas de deux-points de révélation.

## Pièges et coûts (appris sur Prédiction)

- Une génération de voix d'environ 70 s coûte 1 250 à 1 450 crédits, une musique de 55 à 72 s 900 crédits. Une seule prise par appel ; ne jamais relancer pour « réessayer » sans regarder le statut.
- Transcrire un nœud généré du flow : 0 crédit. Transcrire un fichier importé ou une musique : autant qu'une génération. Ne pas transcrire la musique pour vérifier qu'elle n'a pas de paroles, le prompt suffit.
- `eleven_v3` parle lentement (2,3 à 2,5 mots/s) : 85 s pour 210 mots. `eleven_v4` est plus vif et a été préféré par PA.
- La transcription d'une prise v3 / v4 contient les indications de jeu (`[curious]`), parfois collées à un mot (`suivant...[curious]`) ; `align-from-words.mjs` les retire.
- Si ElevenLabs répond « Free Tier access has been disabled », c'est le compte, pas le prompt : PA se réauthentifie avec `/mcp` et on relance.
- Voix clonée (PAL - FR) en `eleven_v4` : les indications de jeu passent (0,06 s dans la transcription, donc non dites) et le débit est plus vif (≈ 3,3 mots/s, 60 s pour 190 mots). Tester d'abord 2 segments (≈ 400 crédits) avant une nouvelle voix.
- Une ligne de sous-titre tient environ 24 caractères (mesuré sur un rendu), d'où `CAP_MAX = 36` dans `chunks.mjs`. Avec une voix rapide, une question courte (« La date du mariage de la cousine ? ») tient en moins d'1 s si on la coupe.
- `npm run check` (les shorts muets) plante sous Windows sur un chemin `C:\C:\` ; le contrôle des shorts à voix off est `check:voix`.

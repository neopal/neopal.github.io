# Vague 25 : grand public (5 novembre 2026)

Règles : `../../brief-fiche.md` (à suivre en entier), `../../univers.md`, `../../gestes-prose.md`.

## Pourquoi cette vague

Décidée le 2026-11-05 avec PA, à partir des stats YouTube Studio des 26 premiers shorts : ce qui fait des vues, c'est une surprise sur un outil du quotidien, avec un chiffre ou « ChatGPT » dans le titre (« Derrière ChatGPT, quinze IA différentes », 1 855 vues ; « ChatGPT ne calcule pas, il devine », 80 % de rétention ; « Ton français coûte plus cher à l'IA », 1 128 vues). Le jargon du milieu fait un flop (benchmaxxing, 126 vues ; brain fry, 141). Toutes les fiches de `plan-termes.md` étant publiées, cette vague ouvre cinq sujets grand public, chacun pensé pour devenir un short.

## Registre des ids, formes d'Imagine et liens imposés

| Lot | id | Titre | cat | Forme | Liens (3 à 7, formes déjà vérifiées) |
|---|---|---|---|---|---|
| a | `mythe-bouteille-d-eau` | « Une question à ChatGPT, c'est une bouteille d'eau » | mythes | A | cout-d-une-requete, compute, gpu, paradoxe-de-jevons, mythe-ia-locale |
| b | `clonage-de-voix` | Clonage de voix | ecosysteme | E | mythe-detecteur-de-texte-ia, ai-act, multimodal, responsabilite, ai-slop, dead-internet |
| c | `mythe-detecteur-de-texte-ia` | « Un détecteur prouve qu'un texte vient d'une IA » | mythes | D | declaration-d-usage-de-l-ia, ancrage-aux-sources, ai-slop, biais, clonage-de-voix |
| d | `shadow-ai` | Shadow AI (IA fantôme) | methode | B | mythe-ia-locale, memoire, prompt-injection, human-in-the-loop, ai-act |
| e | `ai-act` | AI Act (règlement européen sur l'IA) | ecosysteme | A | responsabilite, evaluations-de-dangerosite, open-weights, labs, clonage-de-voix, shadow-ai |

Ne pas ajouter de lien vers une fiche qui a la même forme d'Imagine (vérifié par `check-lot.mjs`). Un lien retiré se signale dans le rapport.

## Angles attendus

- **a, bouteille d'eau** : le chiffre qui circule (Washington Post, septembre 2024 : un mail de 100 mots écrit par GPT-4 « coûte » une bouteille d'un demi-litre), d'où il vient (Ren et al., « Making AI Less Thirsty »), ce que les labos publient depuis (Google, août 2025, médiane d'un prompt Gemini ; Altman, juin 2025 ; Mistral, juillet 2025, analyse de cycle de vie), et ce qui reste vrai : le total des data centers grimpe, les réponses longues, le raisonnement, l'image et la vidéo coûtent bien plus qu'un prompt texte médian. Tampon probable « FAUX » sur la phrase telle qu'écrite, mais le short dit aussi ce qui est vrai. Distinguer mesuré, déclaré par le vendeur, estimé.
- **b, clonage de voix** : combien de secondes d'audio suffisent aujourd'hui, ce que ça permet (doublage, voix perdue rendue, et la voix off de nos propres shorts, clonée avec l'accord de PA chez ElevenLabs), et les arnaques datées et sourcées (robocall Biden de janvier 2024 et l'amende de la FCC, visioconférence truquée d'Arup à Hong Kong en 2024, faux messages vocaux de Marco Rubio en 2025, arnaque au faux proche en France si source fiable). Le geste utile : le mot de passe familial.
- **c, détecteurs** : OpenAI retire son classifieur en juillet 2023 faute de précision ; Liang et al. (2023) montrent que les détecteurs accusent à tort les non-natifs ; le filigrane (SynthID Text de Google, Nature, octobre 2024) et pourquoi il ne couvre que les textes de son propre modèle et s'efface à la reformulation. Ce qui marche à la place : la déclaration d'usage et les sources vérifiables. Les vendeurs de détecteurs qui annoncent 99 % sont présentés comme tels.
- **d, shadow AI** : l'usage d'outils d'IA non validés par l'employeur ; Samsung en avril 2023 (code collé dans ChatGPT), le « bring your own AI » du Work Trend Index Microsoft et LinkedIn (2024), le coût des fuites liées au shadow AI chez IBM (Cost of a Data Breach 2025). Pas de morale : la cause, c'est que l'outil officiel manque ou arrive tard. L'expérience B doit se reproduire à coup sûr.
- **e, AI Act** : règlement (UE) 2024/1689, entré en vigueur le 1er août 2024, calendrier en étapes (interdictions depuis le 2 février 2025, modèles d'usage général depuis le 2 août 2025, haut risque ensuite) ; **vérifier l'état réel du calendrier en novembre 2026** (le « Digital Omnibus » proposé en novembre 2025 repoussait une partie du haut risque : adopté ou non ?). Ce qui est interdit (notation sociale, reconnaissance des émotions au travail et à l'école…), l'étiquetage des deepfakes (article 50), les amendes (jusqu'à 35 millions d'euros ou 7 % du chiffre d'affaires mondial). Forme A : un ordre de grandeur réel rendu physique, calcul en source.

## Livrables par lot

Comme `brief-fiche.md` § 7 : `lot-<x>.js` dans ce dossier, le schéma `lexique/schemas/<id>.svg`, zéro erreur à `node scripts/check-lot.mjs content/dico/vagues/25-grand-public/lot-<x>.js --urls`, puis le rapport, avec en plus une idée de short à voix off de 60 à 70 s (hook, anecdote, mécanisme, chute), titre YouTube de 40 caractères au plus.

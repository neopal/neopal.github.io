---
terme: Token
categorie: Fondations
numero: 01
statut: brouillon v5 (passe §R)
image: la sampleuse
connexions: [tokenizer, fenetre-de-contexte, prediction-du-mot-suivant, embedding, cout-d-une-requete]
---

# Token

## En une phrase

Un token est un bloc de texte numéroté : avant de lire ta question, le modèle la passe dans une sampleuse qui la découpe en blocs, et il ne travaille ensuite qu'avec leurs numéros.

## L'image

La sampleuse a une banque d'environ 200 000 pads. « bonjour » a le sien, parce qu'il revient trop souvent pour être découpé. « anticonstitutionnellement » en allume 5. « fraise » en allume 2 : f, puis raise.

## Imagine

Un producteur a enregistré « bonjour » sur un seul pad. Tu lui demandes quelle est la troisième lettre. Il réécoute le pad en boucle, très concentré, et finit par répondre : « bonjour ».

## Définition complète

Un token est un fragment de texte tiré d'un vocabulaire fixe : 200 019 entrées pour le découpeur de GPT-5 (le même que GPT-4o). Ce vocabulaire est construit avant l'entraînement, en gardant les bouts de texte les plus fréquents ; il suit la fréquence, jamais l'orthographe ni le sens. Un programme, le tokenizer, découpe tout ce qui entre et remplace chaque fragment par son numéro. En sortie, le modèle produit un numéro à la fois, retraduit en texte.

Quand tu interagis avec un LLM, tout se compte en tokens : les input tokens (ce que tu lui envoies), les output tokens (ce qu'il te répond, en général facturés plus cher), la quantité de texte qu'il peut lire d'un coup (la fenêtre de contexte) et la vitesse de réponse. Le français coûte d'ailleurs plus cher que l'anglais : le même paragraphe fait 65 tokens en anglais et 78 en français, soit 20 % de plus pour dire la même chose, parce que la banque a surtout été remplie avec de l'anglais.

## 2024 vs 2026

En 2024, la question piège était « combien de r dans strawberry ? ». ChatGPT répondait souvent 2, parce qu'il ne voit que trois blocs (st, raw, berry) et que les r sont enfermés dedans. Le projet secret d'OpenAI qui allait régler ça s'appelait, en interne, Strawberry ; il est sorti en septembre 2024 sous le nom o1, le premier modèle de raisonnement grand public. En 2026, les modèles de raisonnement réécrivent le mot lettre par lettre avant de compter. Le découpage est resté le même ; les modèles ont simplement appris à vérifier.

## Entendu au bureau

> Pourquoi la facture API a doublé ce mois-ci ?

> Ton chatbot renvoie tout l'historique à chaque message. Tu repaies les mêmes tokens à chaque tour.

## À éviter

« Un token, c'est un mot. » C'est vrai pour « bonjour », mais faux pour « fraise » ou « strawberry ». En français, compte environ 0,8 mot par token.

## Script du short (35 s, v3)

Texte à l'écran, sans voix, sur un beat à 120 BPM. Rendu pilote : `video/out/token.mp4`.

1. **Question (0-2 s)** : « Qu'est-ce qu'un TOKEN ? »
2. **Réponse (2-8 s)** : « Un token est un bloc de texte. » strawberry se coupe en st / raw / berry, les blocs se ferment sur leurs numéros (302, 1618, 19772). « Un modèle ne lit pas des lettres, mais lit des blocs numérotés. »
3. **Le bug (8-13 s)** : « En 2024, quand on demandait à ChatGPT combien il y a de r dans strawberry, il répondait : » « 2. » en rouge. « Ce qui était faux évidemment, il y en a 3. » « Alors pourquoi ? »
4. **Le pourquoi (13-22 s)** : les r s'allument, les boîtes se ferment. « Parce que les r sont enfermés dans les blocs. » Les numéros deviennent des « ? ». « Il ne voit que les numéros et doit "deviner" ce qu'il y a dedans. »
5. **Anecdote (22-26 s)** : « Pour régler ça, OpenAI a lancé un projet dont le nom de code était » tampon STRAWBERRY. « Il est sorti en septembre 2024 sous le nom o1. »
6. **Et donc (26-31 s)** : « Quand tu interagis avec un LLM, tout se compte en tokens. » input tokens : ce que tu lui envoies ; output tokens : ce qu'il te répond. « Et le même texte demande 20 % de tokens en plus en français qu'en anglais. »
7. **Chute (31-35 s)** : « En 2026, les modèles de raisonnement épellent le mot lettre par lettre avant de compter, comme toi en CP. » s-t-r-a-w-b-e-r-r-y, les trois r s'allument.

---

Sources et tests :
- Découpages, numéros, taille du vocabulaire, ratio FR/EN : `tiktoken`, encodage `o200k_base`, testé le 2026-10-01. GPT-5 utilise `o200k_base` d'après `openai/tiktoken`, `tiktoken/model.py`. Claude et Gemini ont leur propre découpeur ; les coupes changent, le principe reste.
- À sourcer avant publication : l'échec « strawberry » de 2024, le nom de code Strawberry (Reuters, juillet 2024), la sortie d'o1 (OpenAI, 12 septembre 2024).
- À tester avant publication : un modèle de raisonnement actuel sur « strawberry ».
- À sourcer : output tokens facturés plus cher que les input tokens (grilles tarifaires publiques des labs).

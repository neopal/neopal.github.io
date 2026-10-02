---
terme: "Mythe : l'IA cherche la réponse dans une base"
categorie: Mythes vs réalité
statut: brouillon v3
image: le groupe sans discothèque
connexions: [parametres, prediction-du-mot-suivant, hallucination, rag, temperature]
---

# « L'IA cherche la réponse dans une base »

## En une phrase

Le groupe n'a pas de discothèque : quand tu lui demandes un morceau, il ne sort pas le disque, il le rejoue de mémoire, note après note.

## L'image

Sa mémoire, c'est sa console : des milliards de potards réglés pendant l'entraînement, puis figés. Aucun morceau n'est rangé dedans, seulement des réglages qui font que telle note sonne juste après telle autre.

## Imagine

Tu demandes au groupe le morceau exact de la page 112 d'un roman. Il te joue quelque chose de superbe, sûr de lui, que personne n'a jamais écrit. Puis il salue.

## Définition complète

Un modèle de langage ne stocke pas de textes qu'il irait consulter. Il stocke des paramètres, des nombres ajustés pendant l'entraînement pour prédire le token suivant. Quand il répond, il écrit un token à la fois, en tirant à chaque pas un morceau parmi les plus probables. La réponse n'existe nulle part avant qu'il l'écrive.

Deux tests le montrent. Pose deux fois la même question dans deux conversations : la réponse change, alors qu'une base rendrait la même fiche. Demande une citation exacte : tu obtiens souvent une phrase plausible et fausse, l'hallucination.

Certains produits cherchent vraiment : ChatGPT avec la recherche web, Perplexity, le chatbot d'une entreprise branché sur ses documents (le RAG). Dans le studio, c'est quelqu'un qui pose une partition sur le pupitre. Le groupe la lit, puis il joue, toujours note après note. La recherche, c'est l'outil autour ; le modèle, lui, joue.

## 2024 vs 2026

En 2024, ChatGPT répondait surtout de mémoire, et la recherche web restait un mode à part. En 2026, la plupart des assistants cherchent tout seuls dès qu'une question porte sur l'actualité, et citent leurs sources. Ça donne l'impression d'une base ; en réalité, le pupitre est simplement mieux rempli.

## Entendu au bureau

> Il m'a sorti une jurisprudence avec le numéro et la date. Je l'ai cherchée, elle n'existe pas.

> Normal, il ne l'a pas retrouvée, il l'a écrite. Demande-lui la source et clique dessus.

## À éviter

« Il a trouvé ça sur Internet. » Sans recherche web activée, il n'a rien trouvé du tout : il a rejoué ce qui ressemblait à Internet.

## Script du short (35 s)

**Hook (0-3 s)**
Voix : « ChatGPT n'a pas de base de données. »
Écran : une icône de base de données, barrée.

**Anecdote (3-10 s)**
Voix : « En 2023, un avocat new-yorkais cite six jurisprudences trouvées par ChatGPT. Aucune n'existe. »
Écran : six références de jugements qui se tamponnent INTROUVABLE une par une.

**Visualisation (10-25 s)**
Voix : « Parce qu'il ne cherche pas. Il écrit, un mot à la fois. »
Écran : la question en haut. En dessous, un éventail de mots candidats avec leur probabilité (« La » 41 %, « Selon » 22 %, « Dans » 9 %). Un mot est tiré, il se pose, un nouvel éventail apparaît. La réponse se construit mot par mot.
Voix : « Pose la même question une deuxième fois. »
Écran : rembobinage, un autre mot est tiré au même endroit, la réponse part ailleurs.

**Et donc (25-32 s)**
Voix : « Quand il cherche sur le web, c'est un outil qui lui colle les résultats sous les yeux. Il les lit, puis il écrit pareil : mot par mot. »
Écran : des pages web glissent au-dessus de la question, le même mécanisme de tirage reprend.

**Chute (32-35 s)**
Voix : « L'avocat n'a pas été trahi par une base. Il a lu une jurisprudence que personne n'avait jamais écrite. Sauf ChatGPT. »

---

À vérifier avant publication :
- Le bloc 2024 vs 2026 décrit une tendance produit, pas un fait daté : le confirmer sur les assistants actuels (ChatGPT, Claude, Gemini), avec captures.
- L'anecdote « jurisprudence inventée » existe dans des affaires réelles (Mata v. Avianca, New York, 2023) ; la citer seulement avec la source.

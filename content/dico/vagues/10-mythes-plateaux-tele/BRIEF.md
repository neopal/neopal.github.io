# Brief vague 10 du Lexique IA : les mythes « fumeux » des plateaux télé

Suis intégralement `content/dico/vagues/09-technique-securite-histoire/BRIEF.md` (et tout ce vers quoi il renvoie) pour le format, les sources vérifiées en ligne, le schéma et les contrôles. Pour le champ `image`, applique la **nouvelle règle** de `content/dico/univers.md`, section « L'image d'une fiche (règle révisée, PA, 2026-10-03) », y compris « Le répertoire que PA aime » ; relis les images de reward-hacking, quantization, speculative-decoding, cout-d-une-requete dans `lexique/terms.js` : c'est le ton qui plaît à PA (Léa et ses gommettes, Mamie à la louche, le patron du comptoir).

## Le sujet
Des affirmations très reprises dans les médias français sur l'IA, souvent par des « experts » de plateau, et contredites publiquement, notamment par Monsieur Phi (Thibaut Giraud, vidéo « Luc Julia au Sénat : autopsie d'un grand N'IMPORTE QUOI », 12 août 2025) et par Fabien Mikol (posts et vidéos). Exemples : audition de Luc Julia au Sénat le 18 juin 2025 (« une marge d'erreur de 36 % » pour ChatGPT, GPT-4 « basé sur 1 200 milliards de données »), son livre « L'intelligence artificielle n'existe pas » (2019), « l'IA ne crée rien », « les LLM généralistes ne servent à rien, il faut des IA spécialisées », « l'IA n'est que de l'informatique avancée / que des fonctions, donc sans décision ».

## Ton et prudence
- Le titre de chaque fiche est la croyance, pas la personne. La fiche explique d'où vient l'idée et ce que montrent les faits, sans moquer ni insulter personne.
- Une citation attribuée à une personne n'entre que si tu l'as vérifiée sur une source primaire ou une source de presse fiable (compte rendu du Sénat, vidéo, article daté). Reste factuel : « a affirmé devant le Sénat que… ; l'étude citée date de 2022 et portait sur… ». Pas de jugement sur la personne, pas de controverse sur son CV (Siri) : ce n'est pas le sujet du lexique.
- Cite les contradicteurs (Monsieur Phi, Fabien Mikol, chercheurs) avec la date et le lien, et surtout les faits mesurés qui tranchent (études, benchmarks, exemples datés 2025-2026).
- Distingue ce qui est faux, ce qui est daté (vrai en 2022, plus en 2026) et ce qui reste débattu.

## Registre des ids (catégorie mythes, avec graphLabel « Mythe : … » comme les autres mythes)
Publiés : les 136 ids de `lexique/terms.js`. Il existe déjà mythe-autocompletion, mythe-ia-calcule, mythe-ia-comprend, mythe-bon-score-bon-modele, hallucination : lis-les, ne les répète pas, lie-les.
Vague 10, lot X :
- mythe-ia-ne-cree-pas (« L'IA ne sait pas créer »)
- mythe-ia-n-existe-pas (« L'intelligence artificielle n'existe pas »)
- mythe-taux-d-erreur (« ChatGPT se trompe une fois sur trois » : l'idée d'un taux d'erreur fixe et universel)
- mythe-ia-specialisees (« Les LLM généralistes ne servent à rien, il faut des IA spécialisées »)
- mythe-que-des-statistiques (« Ce ne sont que des statistiques / des fonctions, donc ça ne décide rien »)

Formes d'Imagine : choisis-les pour n'avoir aucun conflit avec les fiches liées (la forme C reste interdite).

## Sortie
`content/dico/vagues/10-mythes-plateaux-tele/lot-x.js` + `lexique/schemas/<id>.svg` (même vérification qu'avant, avec `node scripts/check-lot.mjs content/dico/vagues/10-mythes-plateaux-tele/lot-x.js`). Écris le fichier tôt et mets-le à jour au fur et à mesure. Aucun autre fichier, pas de git, pas de build.

## Rapport
Comme en vague 9, avec pour chaque citation attribuée la source exacte qui la prouve.

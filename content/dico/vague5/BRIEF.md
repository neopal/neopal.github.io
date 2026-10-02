# Brief vague 5 du Lexique IA : Distillation

Suis intégralement `content/dico/vague2/BRIEF.md`, `content/dico/vague3/BRIEF.md` (champs `table` et `reliability`) et `content/dico/vague4/BRIEF.md`. Lis `content/dico/univers.md` en entier (gabarit de fiche, formes de l'Imagine, varier les exemples, sources, fiches modèles) et `content/dico/gestes-prose.md`. Les fiches fine-tuning, rag et flagornerie de `lexique/terms.js` sont le niveau visé.

## Le terme
- id `distillation`, catégorie `entrainement`, EN `knowledge distillation` (alias : distillation, model distillation, teacher-student).
- Image prévue (`univers.md`) : le groupe de reprise qui apprend en écoutant le grand groupe. Le grand modèle est le professeur (teacher), le petit l'élève (student).
- Ce que le lecteur doit repartir en sachant : ce qu'on copie (les sorties ou les probabilités du grand modèle, pas ses paramètres), pourquoi le petit modèle obtenu est moins cher et presque aussi bon sur ce qu'on lui a montré, la différence avec le fine-tuning et la quantization, et l'enjeu actuel (labos qui accusent des concurrents de distiller leurs modèles via l'API, conditions d'utilisation qui l'interdisent).
- Exemples récents (2025-2026), réels, vérifiés en ligne (WebSearch/WebFetch), datés et sourcés : par exemple les modèles DeepSeek-R1-Distill (janvier 2025), les accusations d'OpenAI contre DeepSeek, les petits modèles des labos tirés de leurs grands modèles. Vérifie chaque fait sur la page citée ; si tu ne peux pas le vérifier, retire-le.
- Liens dans le graphe (`links`) : des ids existants seulement, par exemple fine-tuning, slm, quantization, tailles-de-modele, open-weights, post-entrainement. Choisis une forme d'Imagine qu'aucune fiche liée n'utilise (vérifie leurs `imagineForm` dans terms.js).
- Ne répète pas un exemple déjà utilisé dans deux fiches (règle « varie »).

## Sortie
1. `content/dico/vague5/lot-j.js`, même format que `content/dico/vague4/lot-i.js` (module.exports = [ {…} ], avec `imagineForm`, sans `num`, `video: null`).
2. Un schéma `lexique/schemas/distillation.svg` qui suit le brief des schémas : `/tmp/claude-0/-home-user-neopal-github-io/5c50080d-15c2-5d4f-bfb9-56c3d930f8e0/scratchpad/brief.md` (lis-le, utilise son script de vérification, regarde la capture). Le script lit la fiche dans `lexique/terms.js` : pour le tester, lance-le avec la variable LEX_EXTRA=content/dico/vague5/lot-j.js si besoin, ou vérifie simplement la capture (la catégorie entrainement a la couleur #F5D76E).
3. Ne modifie aucun autre fichier du repo (pas terms.js, pas de build, pas de git).

## Rapport
Le texte de la fiche en clair, la liste des sources avec ce que chacune prouve, et tout doute.

# Brief vague 13 du Lexique IA : déployer l'IA dans une entreprise

Suis intégralement `content/dico/vague11/BRIEF.md` (et tout ce vers quoi il renvoie) pour le format, les sources vérifiées en ligne, le schéma, l'image et les contrôles. Relis aussi `hill-climbing`, `prompt-caching` et `dark-factory` dans `lexique/terms.js`, les dernières fiches publiées.

## Point de départ
Le blog de Varick Agents (https://www.varickagents.com/blog, articles du 30 septembre 2026 : « Don't Apply AI », « Spend Less Tokens », « AI Adoption Is a Myth », « If AI Is So Great, Why Isn't It Working », « Forward-Deployed Engineering 101 », « How to Become an Applied AI Engineer »). PA est d'accord avec leur approche : redessiner le processus avant d'y mettre de l'IA, du code pour tout ce qui est déterministe, le modèle seulement pour les décisions, le plus petit modèle qui suffit. Mais Varick vend ce service, et ses chiffres viennent de ses clients : cite-les comme ses affirmations, et appuie chaque fiche d'abord sur des sources primaires (articles d'origine, rapports publics, docs des éditeurs, études datées, priorité 2025-2026).

## Registre des ids et formes d'Imagine imposées
Publiés : les 151 ids de `lexique/terms.js`. La forme C reste interdite ; une fiche ne se lie jamais à une fiche de même forme (publiée ou de la vague) : retire le lien le plus faible et signale-le.
- lot D (architecture)
  - `workflow-ou-agent` (forme D), titre « Workflow ou agent », catégorie agents : le tri en trois cases (déterministe = du code ; jugement = un modèle ou un agent ; décision à risque = l'humain tranche sur un dossier préparé), la distinction workflow / agent (Anthropic, « Building effective agents », décembre 2024 : le workflow suit un chemin écrit d'avance, l'agent choisit sa suite), le critère « peut-on écrire la liste des étapes avant de lancer ? ». Lis la fiche `agent` pour ne pas la répéter.
  - `routage-de-modeles` (forme A), titre « Routage de modèles », catégorie inference : envoyer chaque tâche au plus petit modèle qui suffit ; la règle 90/9/1 de Varick (présentée comme leur règle), Uber (27 août 2026, sous-agents sur modèles moins chers, déjà cité dans prompt-caching : un autre angle ou un autre exemple), RouteLLM (LMSYS, 2024) ou routeurs commerciaux, le routeur de GPT-5 (août 2025) et ce qu'il a donné ; le piège (un routeur qui se trompe coûte plus qu'il n'économise).
- lot E (organisation)
  - `mythe-ajouter-ia` (forme E), titre « Il suffit d'ajouter de l'IA à nos processus », catégorie mythes, avec graphLabel « Mythe : … » comme les autres mythes : Michael Hammer, « Reengineering Work: Don't Automate, Obliterate », Harvard Business Review, juillet-août 1990 (paving the cow paths, ses exemples chiffrés, vérifiés à la source) ; l'évaluation de Microsoft 365 Copilot par le Department for Business and Trade britannique (2025, rapport public) ; le paradoxe de la productivité (Solow 1987) si utile.
  - `forward-deployed-engineer` (forme B), titre « Forward-deployed engineer », catégorie ecosysteme : l'ingénieur envoyé chez le client ; origine Palantir ; qui en recrute en 2025-2026 (Anthropic, OpenAI...) avec des offres ou annonces vérifiées ; ce qu'il fait concrètement ; la critique (du conseil qui ne dit pas son nom ?).
  - `mythe-95-pourcent` (forme D), titre « 95 % des projets d'IA échouent », catégorie mythes, graphLabel « Mythe : … » : le rapport MIT NANDA « The GenAI Divide » (août 2025) ; ce qu'il a réellement mesuré (échantillon, définition de l'échec, horizon), les critiques publiées de sa méthode, comment le chiffre a circulé ; ce qui reste vrai. Ne te moque de personne. Ne lie pas `workflow-ou-agent` (même forme).

## Enrichissements (lot D)
Dans `content/dico/vague13/enrichissements.json`, au format `{"evals": {"full": [...], "sources": [...], "jargon": [...]}, "multi-agents": {...}}` (champs complets, existant recopié à l'identique, insertions seulement) :
- `evals` : le golden dataset (de vraies demandes étiquetées avec la bonne réponse, une vingtaine pour commencer) et la note séparée du résultat et de la trajectoire de l'agent ; jargon possible « golden dataset », « trajectory ». Une source primaire si possible (docs d'Anthropic ou d'OpenAI sur les evals d'agents), Varick en complément.
- `multi-agents` : une phrase sur l'idempotence (un agent qui relance une action ne doit pas la faire deux fois) et le principe d'un seul agent qui écrit chaque donnée critique.

## Sortie
lot D : `content/dico/vague13/lot-d.js`, `content/dico/vague13/enrichissements.json`, `lexique/schemas/workflow-ou-agent.svg`, `lexique/schemas/routage-de-modeles.svg`.
lot E : `content/dico/vague13/lot-e.js`, `lexique/schemas/mythe-ajouter-ia.svg`, `lexique/schemas/forward-deployed-engineer.svg`, `lexique/schemas/mythe-95-pourcent.svg`.
Vérifie chaque schéma avec `LEX_EXTRA=content/dico/vague13/<lot>.js node /tmp/claude-0/-home-user-neopal-github-io/5c50080d-15c2-5d4f-bfb9-56c3d930f8e0/scratchpad/check-schemas.mjs <id>`. Aucun autre fichier, pas de git, pas de build, ne touche pas lexique/terms.js.

## Rapport
Comme en vague 11 (y compris l'idée de short), plus ce que tu as retenu ou écarté de Varick et pourquoi.

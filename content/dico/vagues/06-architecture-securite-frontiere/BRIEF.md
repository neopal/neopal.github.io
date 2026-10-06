# Brief vague 6 du Lexique IA

Suis intégralement `content/dico/vagues/05-distillation/BRIEF.md` (qui renvoie aux briefs des vagues 2 à 4, à `univers.md` et à `gestes-prose.md`) pour le niveau, le format, les sources vérifiées en ligne et le schéma. La fiche `distillation` (dans `lexique/terms.js`) est le dernier exemple publié.

## Registre des ids
Publiés : les 72 ids de `lexique/terms.js` (lecture seule).
Vague 6 (liens croisés autorisés entre ces ids) :
- lot K (architecture) : transformer, auto-attention, reseau-de-neurones, deep-learning, multimodal
- lot L (usage et sécurité) : prompt-engineering, jailbreak, guardrails, human-in-the-loop, multi-agents
- lot M (frontière) : lois-d-echelle, test-time-compute, alignement, agi, donnees-d-entrainement

## Points propres à cette vague
- **transformer** : c'est l'acte fondateur des LLM. L'article « Attention Is All You Need » (Vaswani et al., Google, juin 2017) : date, auteurs, ce qu'il remplaçait (les réseaux récurrents qui lisaient mot après mot), pourquoi il a tout changé (lecture en parallèle, passage à l'échelle sur GPU), et ce que le « T » de GPT veut dire. Le distinguer de l'auto-attention (le mécanisme) qui a sa propre fiche.
- Les fiches de fondations (réseau de neurones, deep learning) visent un lecteur qui n'a jamais codé : l'histoire vraie qui installe l'idée (geste de prose) compte plus que les formules.
- Les termes contestés (AGI, lois d'échelle et plateau, alignement) : distingue toujours ce qui est mesuré de ce qui est annoncé, prédit ou débattu, et date chaque affirmation.
- Imagine : choisis une forme différente de toutes les fiches liées (publiées ou de la vague). Liste dans ton rapport la forme de chaque fiche et ses liens ; je vérifierai les conflits entre lots.

## Sortie
1. `content/dico/vagues/06-architecture-securite-frontiere/<lot>.js` (`lot-k.js`, `lot-l.js` ou `lot-m.js`), même format que `content/dico/vagues/05-distillation/lot-j.js`.
2. Un schéma par fiche : `lexique/schemas/<id>.svg` (brief des schémas : `content/dico/brief-fiche.md`, section « Le schéma »). Test : `node scripts/check-lot.mjs content/dico/vagues/06-architecture-securite-frontiere/<lot>.js` depuis la racine du repo, puis regarde la capture.
3. Aucun autre fichier modifié (pas terms.js, pas de build, pas de git).

## Rapport
Pour chaque fiche : short, forme d'Imagine, liens, les faits datés avec leur source, ce que montre le schéma, et tout doute ou fait retiré faute de vérification.

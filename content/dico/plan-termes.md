# Plan des termes du Lexique IA

Source de vérité de ce qu'on écrit, dans quel ordre. Statut : **publié**, **en cours** (agent contenu), **prévu**. Priorité : P1 = prochaine vague, P2 = ensuite, P3 = plus tard. La colonne « Image » propose une piste dans l'univers studio (`univers.md`) ; elle n'oblige à rien.

Sources des termes : liste initiale de PA (2026-10-01), ajouts de PA (2026-10-02 : tailles de modèle, benchmaxxing, second brain, knowledge graph, loop, harness, skill), livres d'inspiration (synthèse intégrée le 2026-10-02, voir le bilan en bas).

La colonne « Livres » indique quels livres d'inspiration traitent la notion, comme terme ou comme exemple explicite : AGT = Illustrated Guide to AI Agents, ENT = Agentic Enterprise, LLM = Build a LLM from Scratch, HO = Hands-On LLMs, HAM = Hamming, CAR = GenAI Career Masterplan, ULT = Ultra-intelligence. Vide quand aucun ne la traite. Les gestes d'écriture tirés de ces livres sont dans `gestes-prose.md`.

## 1. Fondations

| Terme | EN | Statut | Prio | Livres | Image |
|---|---|---|---|---|---|
| Token | token | publié | | AGT, LLM, HO, ULT, CAR | la sampleuse |
| Tokenizer | tokenizer | publié | | LLM, HO, ULT | la sampleuse et sa banque de pads |
| Paramètres | parameters, weights | publié | | LLM, ULT | la console de mixage |
| Tailles de modèle (7B, 70B, 405B) | model size | publié | | LLM, HO, CAR | la taille de la console |
| Prédiction du mot suivant | next-token prediction | publié | | AGT, LLM, HO, ULT, CAR | le chanteur qui ne connaît pas la chanson |
| Fenêtre de contexte | context window | publié | | AGT, LLM, HO, ENT, CAR | la longueur de bande |
| Embedding | embedding | publié | | AGT, LLM, HO, ULT, CAR | la carte du son |
| Auto-attention | self-attention | publié | | AGT, LLM, HO, ULT, CAR | l'oreille qui monte certaines pistes |
| Transformer | transformer | publié | | LLM, HO, ULT | la table de mixage complète |
| Logits | logits | publié | | LLM | les VU-mètres avant le choix de la note |
| Position | positional encoding | publié | | LLM | le numéro de mesure sur la partition |
| LLM (grand modèle de langage) | large language model | publié | | LLM, HO, ULT | le groupe tout entier |
| Réseau de neurones | neural network | publié | | HAM, ULT | le câblage de la console, potard relié à potard |
| Apprentissage automatique et deep learning | machine learning, deep learning | publié | | LLM, ULT, CAR | régler à l'oreille plutôt qu'écrire la partition |
| Encodeur et décodeur | encoder, decoder | publié | | LLM, HO, ULT | l'oreille qui analyse, la voix qui chante |
| Multimodal | multimodal model | publié | | AGT, HO | le groupe qui voit enfin la salle |
| Modèle de diffusion | diffusion model | publié | | CAR | la bande pleine de souffle qu'on nettoie passe après passe |
| World model | world model | publié | | | |
| Modèle | AI model | publié | | | |
| JEPA | Joint Embedding Predictive Architecture | publié | | | |

## 2. Entraînement

| Terme | EN | Statut | Prio | Livres | Image |
|---|---|---|---|---|---|
| Entraînement | training | publié | | LLM, ULT, HAM | l'ingé son qui règle la console |
| Pré-entraînement | pre-training, base model | publié | | AGT, LLM, HO, ULT, CAR | écouter des millions de morceaux |
| Date de coupure | knowledge cutoff | publié | | ULT, ENT | le dernier disque écouté |
| Lois d'échelle et plateau | scaling laws | publié | | ULT | plus de potards, plus d'écoute |
| Post-training, SFT | post-training, supervised fine-tuning | publié | | AGT, LLM, HO, ULT, CAR | les cours particuliers |
| RLHF | reinforcement learning from human feedback | publié | | AGT, HO, CAR, ENT | le public qui applaudit |
| DPO | direct preference optimization | publié | | LLM, HO | |
| RL à récompense vérifiable | RLVR | dans post-entrainement | | AGT, CAR | le juré qui a la partition |
| Constitutional AI | constitutional AI | publié | | | le règlement intérieur du studio |
| Distillation | distillation | publié | | ENT | le groupe de reprise |
| Fine-tuning | fine-tuning | publié | | LLM, HO, ULT, ENT, CAR | régler la console pour un genre |
| MoE | mixture of experts | publié | | AGT, CAR | l'orchestre de solistes |
| Architectures hybrides | hybrid architectures (Mamba, Gated DeltaNet) | publié | | | |
| Petits modèles embarqués | small / on-device models | dans slm | | ENT, LLM | le groupe acoustique |
| Open weights vs open source | open weights | publié | | LLM, ULT, HO | le preset donné à tout le monde |
| Données d'entraînement | training data | publié | | LLM, HAM | la discothèque de l'ingé son |
| Données synthétiques | synthetic data | publié | | ULT | s'entraîner sur ses propres maquettes |

## 3. Inférence

| Terme | EN | Statut | Prio | Livres | Image |
|---|---|---|---|---|---|
| Inférence vs entraînement | inference | publié | | ULT | le concert vs les répétitions |
| Température et sampling | temperature, sampling | publié | | AGT, LLM, HO | le curseur d'impro |
| KV cache | KV cache | publié | | AGT, HO | les pistes déjà enregistrées |
| Test-time compute | test-time compute | publié | | AGT, ULT, CAR | répéter avant de jouer |
| Modèles de raisonnement, chain-of-thought | reasoning models, CoT | publié | | AGT, HO, ULT, CAR, ENT | le brouillon avant la prise |
| Speculative decoding | speculative decoding | publié | | | |
| Quantization | quantization | publié | | HO, CAR | du WAV au MP3 |
| Coût d'une requête | cost per request | publié | | | la facture du studio |
| Latence vs débit | latency vs throughput | publié | | | |
| Apprentissage en contexte (few-shot) | in-context learning, few-shot | publié | | LLM, HO, CAR | jouer deux mesures au groupe pour lui donner le style |

## 4. Comportements et limites

| Terme | EN | Statut | Prio | Livres | Image |
|---|---|---|---|---|---|
| Hallucination | hallucination | publié | | AGT, ULT, ENT, HO, CAR | le morceau qui n'existe pas |
| Flagornerie | sycophancy | publié | | ULT, CAR | jouer ce que le public veut entendre |
| CoT infidèle | unfaithful chain-of-thought | publié | | CAR | |
| Biais | bias | publié | | CAR, HO | |
| Jailbreak | jailbreak | publié | | | |
| Prompt injection | prompt injection | publié | | AGT, ENT, CAR | la fausse partition glissée sur le pupitre |
| Mémorisation vs généralisation | memorization vs generalization | publié | | LLM, ULT, HAM | |
| L'IA comprend-elle ? | understanding | dans mythe-ia-comprend | | LLM, HAM, ULT, HO | |
| Mémoire | memory | publié | | AGT, HO, ENT, CAR | |
| Intelligence en dents de scie | jagged intelligence | publié | | ULT | le virtuose qui joue un concerto et rate une comptine |
| Capacités émergentes | emergent abilities | publié | | LLM, HAM, ULT | le groupe qui se met à harmoniser sans qu'on le lui ait appris |

## 5. Alignement et sécurité

| Terme | EN | Statut | Prio | Livres | Image |
|---|---|---|---|---|---|
| Alignement | alignment | publié | | ULT, HO | |
| Reward hacking | reward hacking | publié | | HAM, HO | l'applaudimètre qui ne mesure que le volume |
| Alignment faking | alignment faking | publié | | | |
| Guardrails | guardrails | publié | | AGT, ENT | |
| Red teaming | red teaming | publié | | ENT | |
| Évaluations de dangerosité | dangerous capability evals | publié | | | |
| Interprétabilité | interpretability | publié | | ULT | ouvrir la console |
| Responsabilité | liability, accountability | publié | | HAM, ENT | qui paie quand la sono grille la salle ? |
| Explosion de l'intelligence | intelligence explosion | publié | | ULT | |

## 6. Agents et produit

| Terme | EN | Statut | Prio | Livres | Image |
|---|---|---|---|---|---|
| Agent | agent, agentic | publié | | AGT, ENT, ULT, HO, CAR | la tournée |
| Harness | harness | publié | | AGT, ENT, CAR | le studio autour du groupe |
| Boucle agent | agent loop | publié | | AGT, HO, ULT | jouer, écouter, rejouer |
| Tool use, function calling | tool use | publié | | AGT, HO, CAR | les roadies et leurs outils |
| MCP | Model Context Protocol | publié | | AGT, ENT, CAR | la prise jack universelle |
| Skill | skill | publié | | AGT, ENT | la fiche technique du morceau |
| System prompt | system prompt | publié | | AGT, ENT | la consigne du producteur |
| RAG | retrieval-augmented generation | publié | | AGT, ULT, ENT, HO, CAR | la partition sur le pupitre |
| Context engineering | context engineering | publié | | AGT, ENT, CAR | bien remplir la bande |
| Mémoire externe | external memory | publié (dans memoire) | | AGT, ENT, CAR | le carnet du groupe |
| Multi-agents | multi-agent | publié | | AGT, ENT, CAR | plusieurs groupes sur la même tournée |
| Evals | evals | publié | | AGT, CAR | les auditions |
| Benchmarks | benchmarks | publié | | AGT, ULT, HO | le classement des ventes |
| Sandbox et permissions | sandbox, permissions | publié | | AGT, ENT, CAR | la cabine insonorisée |
| Human-in-the-loop | human-in-the-loop | publié | | AGT, ENT, CAR, HAM | le producteur qui valide chaque prise |
| Agent vs workflow | agent vs workflow | publié | | CAR, AGT, ENT | la setlist figée contre le groupe qui choisit le morceau suivant |
| Planification | planning | publié | | AGT, ENT | la setlist réécrite entre deux morceaux |
| Compaction du contexte | context compaction | publié | | AGT, CAR | résumer le début de la bande avant qu'il s'efface |
| LLM juge | LLM-as-a-judge | publié | | AGT, LLM, HO, CAR | un musicien qui note les prises d'un autre |
| Horizon d'autonomie | autonomy horizon | publié | | ULT | la longueur du set qu'il tient sans le producteur |
| Sortie structurée | structured output | publié | | HO, CAR | la grille d'accords imposée |

## 7. Écosystème et industrie

| Terme | EN | Statut | Prio | Livres | Image |
|---|---|---|---|---|---|
| Benchmaxxing | benchmaxxing | publié | | HAM, HO, ULT | le groupe qui ne répète que le morceau du concours |
| Labs | AI labs | publié | | | les maisons de disques |
| Modèle vs produit (« ChatGPT c'est le modèle ») | model vs product | publié | | ULT | le groupe vs la salle de concert |
| Open weights, souveraineté | open weights, sovereignty | publié | | ULT, HO, ENT | |
| GPU et puissance de calcul | GPU, compute | publié | | ULT, HO | les amplis et le groupe électrogène |
| La leçon amère | bitter lesson | publié | | ULT, HAM | des millions d'heures d'écoute battent les cours de solfège |
| IA générale (AGI) | AGI | publié | | ULT, HAM | |
| Systèmes experts et IA symbolique | expert systems, symbolic AI | publié | | HAM, ULT | jouer en suivant un manuel de règles |
| Effet IA | AI effect | publié | | HAM | « ce n'est que de la technique », dit-on dès que le groupe réussit le morceau |
| Optimisation pour les moteurs génératifs (GEO) | generative engine optimization | publié | | CAR | |

## 8. Méthode : travailler avec l'IA

| Terme | EN | Statut | Prio | Livres | Image |
|---|---|---|---|---|---|
| Second brain | second brain | publié | | | |
| Knowledge graph | knowledge graph | publié | | | la carte des connexions (le graphe du lexique lui-même) |
| Vibe coding | vibe coding | publié | | AGT, ENT, CAR | |
| Loop (boucle d'itération) | loop | publié | | HAM | |
| Prompt et prompt engineering | prompt, prompt engineering | publié | | ULT, HO, CAR, LLM | la première mesure qu'on joue au groupe |
| Capacité inexploitée | capability overhang | publié | | CAR | le synthé dont on n'utilise que trois presets |

## 9. Mythes vs réalité (une idée fausse par fiche)

| Mythe | Statut | Prio | Livres |
|---|---|---|---|
| L'IA cherche la réponse dans une base | publié | | HO, ULT |
| L'IA calcule | publié | | AGT, HO |
| L'IA sait quand elle ne sait pas | publié | | ENT |
| L'IA apprend de nos conversations | publié | | AGT, HO, ENT, CAR |
| L'IA comprend | publié | | LLM, HAM, ULT, HO |
| L'IA lit mot par mot | publié | | AGT, LLM, HO, ULT |
| Plus gros = plus intelligent | publié | | ULT, HO, CAR |
| ChatGPT, c'est le modèle | publié | | ULT |
| L'IA est neutre | publié | | CAR, HO |
| Un agent est autonome | publié | | AGT, CAR, ENT |
| L'IA a lu tout Internet donc sait tout | publié | | LLM, ULT, ENT |
| Le modèle raisonne comme nous | publié | | AGT, HO, CAR |
| L'IA a des valeurs | publié | P3 | ULT |
| L'IA va remplacer tel métier demain | publié | | HAM, ULT |
| L'IA open source est gratuite | publié | | ULT, HO |
| Ce n'est que de l'autocomplétion | publié | | HAM, ULT, LLM |
| Un bon score au benchmark fait un bon modèle | publié | | HAM, HO, ULT, AGT |
| Le modèle agit lui-même | publié | | AGT, CAR |

## Bilan de la synthèse des livres (2026-10-02)

Trente termes ajoutés, tous au statut « prévu » : 6 en Fondations, 2 en Entraînement, 1 en Inférence, 2 en Comportements et limites, 2 en Alignement et sécurité, 6 en Agents et produit, 6 en Écosystème et industrie, 2 en Méthode, 3 mythes. Un seul passe en P1 par thème au plus, quand la notion manque vraiment au lecteur : LLM, Intelligence en dents de scie, Agent vs workflow, Prompt et prompt engineering. Les statuts et priorités des lignes existantes n'ont pas bougé.

Plusieurs notions des livres sont créditées sur une ligne existante plutôt qu'ajoutées, parce qu'elles n'auraient pas leur propre « Imagine » : le modèle de base va dans Pré-entraînement, l'autorégression dans Prédiction du mot suivant, le top-k et le non-déterminisme dans Température, la descente de gradient et la fonction de coût dans Entraînement, LoRA dans Fine-tuning, le « perdu au milieu » dans Fenêtre de contexte (la fiche publiée le traite déjà), la recherche sémantique et la base vectorielle dans Embedding et RAG, le modèle de récompense dans RLHF, la réflexion dans Boucle agent, A2A dans MCP, la confiance calibrée dans Human-in-the-loop, le moindre privilège dans Sandbox, la loi de Goodhart dans Reward hacking et Benchmaxxing, la trajectoire et pass^k dans Evals.

Termes écartés volontairement, parce qu'ils sont trop pointus pour un lecteur curieux non technique ou qu'ils servent mieux d'exemple que de fiche :
- **Mécanique interne de l'attention** (requête, clé, valeur ; attention causale ; multi-têtes ; bloc transformer ; couche feedforward) : du détail de construction, que la fiche Auto-attention peut évoquer en une phrase.
- **Détails du découpage** (BPE, tokens spéciaux) : déjà couverts par la fiche Tokenizer.
- **Cuisine d'entraînement** (perplexité, époque, fenêtre glissante, gel des couches, régularisation, apprentissage contrastif, contre-exemple difficile, GRPO) : utiles à qui code un modèle, pas à qui veut le comprendre.
- **Ingénierie du RAG** (découpage en morceaux, reclassement, recherche hybride, rappel et précision) : des réglages de praticien, à garder comme exemples dans la fiche RAG.
- **Prompt template, sortie contrainte par grammaire, vote majoritaire** : trop proches de l'implémentation.
- **Vocabulaire d'architecture d'entreprise** d'ENT et de CAR (AAOSA, granularité des agents, agent ancré, journalisation de l'intention, second niveau de RACI, prolifération d'agents, purgatoire des pilotes, identité non humaine) : du jargon de DSI, sans mécanisme à montrer.
- **Web agentique** : trop spéculatif pour une définition qui doit tenir.
- **Notions de Hamming hors IA** (codes correcteurs, redondance, entropie, compression, grande dimension, distance, simulation, paradoxe de Simpson, effet Hawthorne, demi-vie du savoir, calcul de coin de table) : elles servent d'histoires et d'analogies, voir `gestes-prose.md`, pas de fiches.
- **Algorithme, loi de Moore, heuristique, test de Turing** : trop généraux pour une fiche à part ; les deux derniers nourrissent « L'IA comprend-elle ? ».

Le détail par terme, avec les livres et l'analogie retenue, est dans les notes de lecture privées (`sources inspiration/_notes/termes-et-prose.md`, hors git).

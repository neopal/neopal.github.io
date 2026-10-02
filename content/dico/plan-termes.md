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
| Tailles de modèle (7B, 70B, 405B) | model size | prévu | P1 | LLM, HO, CAR | la taille de la console |
| Prédiction du mot suivant | next-token prediction | publié | | AGT, LLM, HO, ULT, CAR | le chanteur qui ne connaît pas la chanson |
| Fenêtre de contexte | context window | publié | | AGT, LLM, HO, ENT, CAR | la longueur de bande |
| Embedding | embedding | publié | | AGT, LLM, HO, ULT, CAR | la carte du son |
| Auto-attention | self-attention | prévu | P2 | AGT, LLM, HO, ULT, CAR | l'oreille qui monte certaines pistes |
| Transformer | transformer | prévu | P2 | LLM, HO, ULT | la table de mixage complète |
| Logits | logits | prévu | P3 | LLM | les VU-mètres avant le choix de la note |
| Position | positional encoding | prévu | P3 | LLM | le numéro de mesure sur la partition |
| LLM (grand modèle de langage) | large language model | prévu | P1 | LLM, HO, ULT | le groupe tout entier |
| Réseau de neurones | neural network | prévu | P2 | HAM, ULT | le câblage de la console, potard relié à potard |
| Apprentissage automatique et deep learning | machine learning, deep learning | prévu | P2 | LLM, ULT, CAR | régler à l'oreille plutôt qu'écrire la partition |
| Encodeur et décodeur | encoder, decoder | prévu | P3 | LLM, HO, ULT | l'oreille qui analyse, la voix qui chante |
| Multimodal | multimodal model | prévu | P2 | AGT, HO | le groupe qui voit enfin la salle |
| Modèle de diffusion | diffusion model | prévu | P3 | CAR | la bande pleine de souffle qu'on nettoie passe après passe |

## 2. Entraînement

| Terme | EN | Statut | Prio | Livres | Image |
|---|---|---|---|---|---|
| Entraînement | training | prévu | P1 | LLM, ULT, HAM | l'ingé son qui règle la console |
| Pré-entraînement | pre-training, base model | prévu | P2 | AGT, LLM, HO, ULT, CAR | écouter des millions de morceaux |
| Date de coupure | knowledge cutoff | prévu | P1 | ULT, ENT | le dernier disque écouté |
| Lois d'échelle et plateau | scaling laws | prévu | P2 | ULT | plus de potards, plus d'écoute |
| Post-training, SFT | post-training, supervised fine-tuning | prévu | P2 | AGT, LLM, HO, ULT, CAR | les cours particuliers |
| RLHF | reinforcement learning from human feedback | prévu | P1 | AGT, HO, CAR, ENT | le public qui applaudit |
| DPO | direct preference optimization | prévu | P3 | LLM, HO | |
| RL à récompense vérifiable | RLVR | prévu | P2 | AGT, CAR | le juré qui a la partition |
| Constitutional AI | constitutional AI | prévu | P3 | | le règlement intérieur du studio |
| Distillation | distillation | prévu | P2 | ENT | le groupe de reprise |
| Fine-tuning | fine-tuning | prévu | P1 | LLM, HO, ULT, ENT, CAR | régler la console pour un genre |
| MoE | mixture of experts | prévu | P1 | AGT, CAR | l'orchestre de solistes |
| Architectures hybrides | hybrid architectures (Mamba, Gated DeltaNet) | prévu | P3 | | |
| Petits modèles embarqués | small / on-device models | prévu | P2 | ENT, LLM | le groupe acoustique |
| Open weights vs open source | open weights | prévu | P1 | LLM, ULT, HO | le preset donné à tout le monde |
| Données d'entraînement | training data | prévu | P2 | LLM, HAM | la discothèque de l'ingé son |
| Données synthétiques | synthetic data | prévu | P3 | ULT | s'entraîner sur ses propres maquettes |

## 3. Inférence

| Terme | EN | Statut | Prio | Livres | Image |
|---|---|---|---|---|---|
| Inférence vs entraînement | inference | prévu | P1 | ULT | le concert vs les répétitions |
| Température et sampling | temperature, sampling | publié | | AGT, LLM, HO | le curseur d'impro |
| KV cache | KV cache | prévu | P2 | AGT, HO | les pistes déjà enregistrées |
| Test-time compute | test-time compute | prévu | P2 | AGT, ULT, CAR | répéter avant de jouer |
| Modèles de raisonnement, chain-of-thought | reasoning models, CoT | prévu | P1 | AGT, HO, ULT, CAR, ENT | le brouillon avant la prise |
| Speculative decoding | speculative decoding | prévu | P3 | | |
| Quantization | quantization | prévu | P2 | HO, CAR | du WAV au MP3 |
| Coût d'une requête | cost per request | prévu | P1 | | la facture du studio |
| Latence vs débit | latency vs throughput | prévu | P3 | | |
| Apprentissage en contexte (few-shot) | in-context learning, few-shot | prévu | P2 | LLM, HO, CAR | jouer deux mesures au groupe pour lui donner le style |

## 4. Comportements et limites

| Terme | EN | Statut | Prio | Livres | Image |
|---|---|---|---|---|---|
| Hallucination | hallucination | publié | | AGT, ULT, ENT, HO, CAR | le morceau qui n'existe pas |
| Flagornerie | sycophancy | prévu | P1 | ULT, CAR | jouer ce que le public veut entendre |
| CoT infidèle | unfaithful chain-of-thought | prévu | P3 | CAR | |
| Biais | bias | prévu | P2 | CAR, HO | |
| Jailbreak | jailbreak | prévu | P2 | | |
| Prompt injection | prompt injection | prévu | P1 | AGT, ENT, CAR | la fausse partition glissée sur le pupitre |
| Mémorisation vs généralisation | memorization vs generalization | prévu | P2 | LLM, ULT, HAM | |
| L'IA comprend-elle ? | understanding | prévu | P3 | LLM, HAM, ULT, HO | |
| Mémoire | memory | prévu | P2 | AGT, HO, ENT, CAR | |
| Intelligence en dents de scie | jagged intelligence | prévu | P1 | ULT | le virtuose qui joue un concerto et rate une comptine |
| Capacités émergentes | emergent abilities | prévu | P2 | LLM, HAM, ULT | le groupe qui se met à harmoniser sans qu'on le lui ait appris |

## 5. Alignement et sécurité

| Terme | EN | Statut | Prio | Livres | Image |
|---|---|---|---|---|---|
| Alignement | alignment | prévu | P2 | ULT, HO | |
| Reward hacking | reward hacking | prévu | P1 | HAM, HO | l'applaudimètre qui ne mesure que le volume |
| Alignment faking | alignment faking | prévu | P3 | | |
| Guardrails | guardrails | prévu | P2 | AGT, ENT | |
| Red teaming | red teaming | prévu | P3 | ENT | |
| Évaluations de dangerosité | dangerous capability evals | prévu | P3 | | |
| Interprétabilité | interpretability | prévu | P2 | ULT | ouvrir la console |
| Responsabilité | liability, accountability | prévu | P2 | HAM, ENT | qui paie quand la sono grille la salle ? |
| Explosion de l'intelligence | intelligence explosion | prévu | P3 | ULT | |

## 6. Agents et produit

| Terme | EN | Statut | Prio | Livres | Image |
|---|---|---|---|---|---|
| Agent | agent, agentic | prévu | P1 | AGT, ENT, ULT, HO, CAR | la tournée |
| Harness | harness | prévu | P1 | AGT, ENT, CAR | le studio autour du groupe |
| Boucle agent | agent loop | prévu | P1 | AGT, HO, ULT | jouer, écouter, rejouer |
| Tool use, function calling | tool use | prévu | P1 | AGT, HO, CAR | les roadies et leurs outils |
| MCP | Model Context Protocol | prévu | P1 | AGT, ENT, CAR | la prise jack universelle |
| Skill | skill | prévu | P1 | AGT, ENT | la fiche technique du morceau |
| System prompt | system prompt | prévu | P1 | AGT, ENT | la consigne du producteur |
| RAG | retrieval-augmented generation | publié | | AGT, ULT, ENT, HO, CAR | la partition sur le pupitre |
| Context engineering | context engineering | prévu | P1 | AGT, ENT, CAR | bien remplir la bande |
| Mémoire externe | external memory | prévu | P2 | AGT, ENT, CAR | le carnet du groupe |
| Multi-agents | multi-agent | prévu | P2 | AGT, ENT, CAR | plusieurs groupes sur la même tournée |
| Evals | evals | prévu | P1 | AGT, CAR | les auditions |
| Benchmarks | benchmarks | prévu | P1 | AGT, ULT, HO | le classement des ventes |
| Sandbox et permissions | sandbox, permissions | prévu | P2 | AGT, ENT, CAR | la cabine insonorisée |
| Human-in-the-loop | human-in-the-loop | prévu | P2 | AGT, ENT, CAR, HAM | le producteur qui valide chaque prise |
| Agent vs workflow | agent vs workflow | prévu | P1 | CAR, AGT, ENT | la setlist figée contre le groupe qui choisit le morceau suivant |
| Planification | planning | prévu | P2 | AGT, ENT | la setlist réécrite entre deux morceaux |
| Compaction du contexte | context compaction | prévu | P2 | AGT, CAR | résumer le début de la bande avant qu'il s'efface |
| LLM juge | LLM-as-a-judge | prévu | P2 | AGT, LLM, HO, CAR | un musicien qui note les prises d'un autre |
| Horizon d'autonomie | autonomy horizon | prévu | P2 | ULT | la longueur du set qu'il tient sans le producteur |
| Sortie structurée | structured output | prévu | P3 | HO, CAR | la grille d'accords imposée |

## 7. Écosystème et industrie

| Terme | EN | Statut | Prio | Livres | Image |
|---|---|---|---|---|---|
| Benchmaxxing | benchmaxxing | prévu | P1 | HAM, HO, ULT | le groupe qui ne répète que le morceau du concours |
| Labs | AI labs | prévu | P2 | | les maisons de disques |
| Modèle vs produit (« ChatGPT c'est le modèle ») | model vs product | prévu | P1 | ULT | le groupe vs la salle de concert |
| Open weights, souveraineté | open weights, sovereignty | prévu | P2 | ULT, HO, ENT | |
| GPU et puissance de calcul | GPU, compute | prévu | P2 | ULT, HO | les amplis et le groupe électrogène |
| La leçon amère | bitter lesson | prévu | P2 | ULT, HAM | des millions d'heures d'écoute battent les cours de solfège |
| IA générale (AGI) | AGI | prévu | P2 | ULT, HAM | |
| Systèmes experts et IA symbolique | expert systems, symbolic AI | prévu | P3 | HAM, ULT | jouer en suivant un manuel de règles |
| Effet IA | AI effect | prévu | P3 | HAM | « ce n'est que de la technique », dit-on dès que le groupe réussit le morceau |
| Optimisation pour les moteurs génératifs (GEO) | generative engine optimization | prévu | P3 | CAR | |

## 8. Méthode : travailler avec l'IA

| Terme | EN | Statut | Prio | Livres | Image |
|---|---|---|---|---|---|
| Second brain | second brain | prévu | P1 | | |
| Knowledge graph | knowledge graph | prévu | P1 | | la carte des connexions (le graphe du lexique lui-même) |
| Vibe coding | vibe coding | prévu | P2 | AGT, ENT, CAR | |
| Loop (boucle d'itération) | loop | prévu | P1 | HAM | |
| Prompt et prompt engineering | prompt, prompt engineering | prévu | P1 | ULT, HO, CAR, LLM | la première mesure qu'on joue au groupe |
| Capacité inexploitée | capability overhang | prévu | P3 | CAR | le synthé dont on n'utilise que trois presets |

## 9. Mythes vs réalité (une idée fausse par fiche)

| Mythe | Statut | Prio | Livres |
|---|---|---|---|
| L'IA cherche la réponse dans une base | publié | | HO, ULT |
| L'IA calcule | prévu | P2 | AGT, HO |
| L'IA sait quand elle ne sait pas | prévu | P1 | ENT |
| L'IA apprend de nos conversations | prévu | P1 | AGT, HO, ENT, CAR |
| L'IA comprend | prévu | P2 | LLM, HAM, ULT, HO |
| L'IA lit mot par mot | prévu | P2 | AGT, LLM, HO, ULT |
| Plus gros = plus intelligent | prévu | P1 | ULT, HO, CAR |
| ChatGPT, c'est le modèle | prévu | P1 | ULT |
| L'IA est neutre | prévu | P2 | CAR, HO |
| Un agent est autonome | prévu | P1 | AGT, CAR, ENT |
| L'IA a lu tout Internet donc sait tout | prévu | P2 | LLM, ULT, ENT |
| Le modèle raisonne comme nous | prévu | P2 | AGT, HO, CAR |
| L'IA a des valeurs | prévu | P3 | ULT |
| L'IA va remplacer tel métier demain | prévu | P3 | HAM, ULT |
| L'IA open source est gratuite | prévu | P2 | ULT, HO |
| Ce n'est que de l'autocomplétion | prévu | P2 | HAM, ULT, LLM |
| Un bon score au benchmark fait un bon modèle | prévu | P2 | HAM, HO, ULT, AGT |
| Le modèle agit lui-même | prévu | P2 | AGT, CAR |

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

# Gestes de prose et de pédagogie

Douze gestes repérés dans les livres d'inspiration de PA, décrits avec nos mots et appliqués aux fiches et aux shorts du Lexique IA. Aucun texte des livres n'est repris ici. Abréviations : AGT = Illustrated Guide to AI Agents, ENT = Agentic Enterprise, LLM = Build a LLM from Scratch, HO = Hands-On LLMs, HAM = Hamming, CAR = GenAI Career Masterplan, ULT = Ultra-intelligence.

Ces gestes complètent `univers.md` sans le remplacer : quand un geste entre en conflit avec une règle de l'univers (le studio comme seule image, l'anecdote vraie et datée, pas de micro-texte décoratif), c'est l'univers qui gagne.

## Écrire juste

### 1. Marquer les verbes qui prêtent un esprit à la machine (ULT)

Quand une phrase dit que le modèle *sait*, *veut*, *croit* ou *comprend*, l'auteur marque le verbe d'une typographie à part et explique la convention une fois pour toutes. Le texte garde ainsi des phrases simples, et le lecteur sait à chaque instant que le verbe est un raccourci et non une affirmation sur une vie intérieure.

**Application.** Dans la fiche Hallucination, « le modèle *préfère* inventer plutôt que se taire » prend un italique discret, et un survol donne la version exacte : la suite inventée avait un score plus élevé que « je ne sais pas ». La convention s'explique une seule fois, dans la page d'accueil du lexique, puis s'applique à toutes les fiches, la Flagornerie et le futur « L'IA comprend-elle ? » en premier.

**Dérive à éviter.** Marquer tous les verbes jusqu'à hacher la lecture, ou laisser l'italique glisser vers l'ironie, comme si l'on se moquait de ceux qui parlent ainsi. Deux ou trois marques par fiche suffisent, réservées aux verbes où l'erreur de lecture coûte quelque chose.

### 2. Un terme pivot en français, l'anglais une fois entre parenthèses (ULT)

L'auteur choisit un mot pour chaque notion, donne l'anglais une seule fois au moment de la définition, puis s'y tient sans alterner. Quand le français est artificiel ou que l'anglais domine l'usage, il le dit franchement et garde l'anglais ; quand le terme courant trompe, il propose à côté un mot plus juste.

**Application.** La fiche Fenêtre de contexte pose « fenêtre de contexte (*context window*) » puis ne dit plus que « fenêtre », et la fiche Paramètres traite « poids » comme un synonyme annoncé une fois, sans passer de l'un à l'autre au fil des paragraphes. Pour Hallucination, la ligne « mot plus juste » peut proposer « confabulation », ce qui éclaire le mécanisme sans renommer la fiche.

**Dérive à éviter.** Franciser de force ce que le lecteur entendra en anglais au bureau : la fiche publiée s'appelle Token, et `univers.md` demande de montrer le vrai vocabulaire. Écrire « sous-mot » partout, ou inventer un équivalent pour prompt, RAG ou fine-tuning, contredirait cette fiche et isolerait le lecteur du mot qu'il croisera.

### 3. Dire où l'image triche (ULT, HO)

Après une analogie, les auteurs disent en une phrase l'endroit où elle cesse d'être vraie : le paysage à deux axes qui en a en réalité des milliards, les axes de sens d'un embedding qui ne correspondent à aucun concept lisible. On fait confiance à l'image parce qu'on connaît sa limite.

**Application.** La fiche Paramètres peut suivre « L'image » d'une phrase qui précise qu'aucun potard réel ne porte d'étiquette : personne ne sait ce que règle tel paramètre isolé. La fiche Embedding (carte du son) peut dire que la carte a des milliers de dimensions et non deux, et que ses axes n'ont pas de nom.

**Dérive à éviter.** Transformer l'aveu en tic de fin de section ou en paragraphe de précautions qui annule l'image. Une seule phrase, et seulement là où un lecteur attentif tirerait de l'image une conclusion fausse.

### 4. Le critère qui tranche une définition floue (CAR)

Plutôt que d'aligner des caractéristiques, l'auteur ramène une distinction disputée à un seul test que le lecteur peut appliquer seul, puis le fait tourner sur quelques cas ordinaires et sur des cas qui trompent.

**Application.** La future fiche Agent vs workflow tient sur ce test : si l'on peut écrire la liste des étapes avant de lancer le système, c'est un workflow, même s'il appelle trois fois un modèle ; si c'est le modèle qui choisit la suite en cours de route, c'est un agent. La fiche Open weights vs open source peut faire de même en demandant si l'on pourrait refaire l'entraînement avec ce qui est publié.

**Dérive à éviter.** Un critère si simple qu'il ment sur les cas limites, ou qu'il devient un verdict d'un mot. La fiche montre au moins un cas ambigu et dit de quel côté il tombe et pourquoi.

## Raconter

### 5. L'histoire qui installe l'idée avant de la nommer (HAM)

Hamming ne donne presque jamais une leçon nue : il raconte d'abord une scène précise, souvent une frustration ou une conversation, avec le doute qui suit chaque victoire, et la leçon générale n'arrive qu'à la fin, adossée au récit. Une variante qu'il affectionne est la scène où un chiffre rassurant se dégonfle quand quelqu'un demande, à voix haute, ce qu'il mesure vraiment.

**Application.** Les fiches Benchmarks, Evals et Reward hacking s'y prêtent : partir d'un score annoncé, poser la question du protocole, puis montrer l'écart entre réussir le test et réussir la tâche. L'histoire doit être vraie, datée, avec un nom, comme le demande le gabarit des shorts ; elle se cherche dans les sources de la fiche, pas dans la mémoire de l'auteur.

**Dérive à éviter.** Embellir ou composer une anecdote « exemplaire » qui n'a pas eu lieu, ce que l'univers et la rigueur interdisent. Autre dérive : livrer la morale avant l'histoire, ce qui transforme le récit en illustration d'une thèse déjà dite.

### 6. Montrer l'échec avant le mécanisme (AGT, LLM)

Avant d'expliquer une pièce, les auteurs font tourner le système sans elle et montrent ce qui casse : le modèle qui ne sait plus redire un prénom donné au message précédent, l'appel d'outil écrit en toutes lettres et qui ne déclenche rien, le modèle brut qui répond à une question par d'autres questions. La technique arrive comme la réponse à un problème que le lecteur vient de voir.

**Application.** C'est l'ouverture naturelle des fiches Mémoire, Tool use et Pré-entraînement. Dans un short, deux bulles de chat échouent, puis la même scène est rejouée avec la pièce ajoutée, ce qui respecte la règle de l'univers selon laquelle le lien de cause se montre au lieu de se dire.

**Dérive à éviter.** Mettre en scène un échec que les modèles actuels ne commettent plus, ce qui date la fiche et fait passer le lexique pour moqueur. L'échec se reproduit sur un modèle récent avant d'être publié, ou il est présenté comme ce qui se passerait sans la pièce expliquée.

### 7. Reformuler la question, puis donner quand même une position (HAM, ULT)

Face à une question piégée comme « une machine peut-elle penser ? », Hamming montre pourquoi elle est mal posée et propose une version qu'on peut trancher, puis renvoie le lecteur à ce qui le ferait changer d'avis. ULT donne la parole à un sceptique de bonne foi et lui répond avec des faits datés, ce qui évite d'avoir l'air de vendre la technologie.

**Application.** La fiche « L'IA comprend-elle ? » remplace le oui ou non par une question mesurable, par exemple ce que le modèle réussit sur des cas qu'il n'a pas pu voir, et la future fiche IA générale (AGI) peut s'appuyer sur l'horizon d'autonomie comme mesure concrète. La rubrique « Entendu au bureau » du gabarit accueille l'objection du sceptique et sa réponse courte.

**Dérive à éviter.** Refuser de conclure pour paraître nuancé, si bien que le lecteur repart sans rien. La fiche reformule, puis dit clairement ce que l'on sait aujourd'hui et ce qui reste ouvert.

## Montrer

### 8. L'exemple fil rouge qui grandit avec les notions (ULT, LLM, HO, CAR)

Les quatre livres gardent un même petit matériau d'une notion à l'autre, une phrase, un réseau jouet, un avis de restaurant, pour que seule la technique change. Le lecteur n'a jamais à réinstaller un décor, et il voit ce que chaque notion ajoute parce que tout le reste reste fixe.

**Application.** Le studio fournit déjà l'image ; le fil rouge, lui, fournit l'exemple concret. Une même phrase française de départ peut traverser Token, Prédiction du mot suivant, Température et Auto-attention, et un même cas d'agent (préparer un déplacement, par exemple) peut traverser Agent, Tool use, MCP, Boucle agent et Planification, avec un lien « cet exemple revient dans la fiche X ».

**Dérive à éviter.** Laisser le fil rouge devenir un second univers qui concurrence le studio, ou le tordre pour qu'il serve une notion où il ne va pas. Si l'exemple doit être forcé, la fiche en prend un autre et le dit.

### 9. Une carte unique qu'on zoome (AGT, LLM)

AGT pose dès le début un schéma d'anatomie de l'agent et le reprend à chaque chapitre avec la pièce du jour surlignée ; LLM fait de même avec la vie d'un modèle en trois étapes. Le lecteur sait toujours où il se trouve dans l'ensemble.

**Application.** Deux cartes suffisent au lexique : la vie d'un modèle (données, pré-entraînement, post-training, usage) pour Entraînement, Fine-tuning, RLHF et Date de coupure, et l'anatomie de l'agent (modèle au centre, mémoire, outils, planification) pour Agent, Tool use, MCP, Skill et Mémoire externe. Dans le short, la scène s'ouvre sur la carte entière, zoome sur la pièce, et dézoome à la chute.

**Dérive à éviter.** Afficher la carte partout comme un habillage, ce qui fait gabarit généré, exactement ce que l'univers proscrit avec le surtitre en haut d'écran. La carte n'apparaît que lorsqu'elle situe la notion, et elle reste un schéma qui bouge, pas un cartouche fixe.

### 10. Les étapes numérotées posées dans le dessin (AGT)

Pour un processus, AGT pose de petits numéros directement sur les flèches du schéma et le texte renvoie aux numéros plutôt qu'aux boîtes. Le regard suit l'ordre sans effort, et la description tient en peu de mots.

**Application.** Les fiches RAG, MCP, Tool use et Boucle agent reçoivent une frise de quatre à six étapes numérotées que le texte cite. Dans le short, chaque numéro s'allume sur le temps où la voix le décrit, ce qui sert la règle d'une information nouvelle toutes les deux à quatre secondes.

**Dérive à éviter.** Passer de six à douze étapes et retomber dans la liste de courses. Au-delà de six, on découpe en deux schémas, ou on regroupe.

### 11. Le chiffre jouet, puis la vraie échelle ramenée au quotidien (LLM, AGT, HO, ULT)

Les auteurs montrent un mécanisme sur des nombres qu'on refait de tête, un vocabulaire de neuf mots, une addition de deux chiffres, une matrice de dix sur dix, puis rappellent aussitôt les vrais ordres de grandeur et les rattachent à une chose familière : un temps d'attente à l'écran, une installation électrique connue, un salaire horaire.

**Application.** La fiche Température montre un histogramme de cinq barres dont un intrus comique grandit quand on pousse le curseur, puis rappelle que le vrai vocabulaire compte environ 200 000 entrées. La fiche Coût d'une requête refait le calcul d'une conversation type en trois lignes, avec des prix tirés de ses sources.

**Dérive à éviter.** Laisser croire que le chiffre jouet est le vrai, ou inventer une équivalence frappante qui ne tient pas. Chaque ordre de grandeur réel vient d'une source citée dans la fiche, et l'équivalence du quotidien se vérifie comme un fait.

### 12. Un code couleur fixe pour ce qui entre, ce qui sort et ce qui est figé (HO)

HO donne à chaque famille de modèles une couleur et une petite icône, annoncées une fois puis tenues jusqu'au bout, si bien que le lecteur reconnaît le type de chose d'un coup d'œil sans relire la légende.

**Application.** Dans les schémas des fiches et dans les shorts, une couleur pour ce qu'on donne au modèle (prompt, contexte, documents du pupitre), une pour ce qu'il produit, et une pour ce qui ne bouge pas pendant l'usage (les paramètres de la console). Le même code sert dans Fenêtre de contexte, RAG, Fine-tuning et KV cache, ce qui rend visible, par exemple, que le RAG change l'entrée et que le fine-tuning change la console.

**Dérive à éviter.** Multiplier les couleurs jusqu'à exiger une légende, ou entrer en conflit avec la palette du site. Trois rôles au plus, pris dans la palette existante, l'orange d'accent réservé à l'élément sur lequel la fiche veut attirer l'œil.

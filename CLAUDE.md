# CLAUDE.md - Contexte du Projet

## Vue d'ensemble
Site CV/Portfolio interactif pour **Pierre-Adrien LAIR** avec chatbot IA intégré.
- **URL** : https://neopal.github.io/
- **Repo** : https://github.com/neopal/neopal.github.io

## Stack Technique
- **Frontend** : HTML single-page, Tailwind CSS (via CDN), vanilla JavaScript
- **Fonts** : Inter + Space Grotesk (Google Fonts)
- **Icons** : Material Symbols Outlined
- **Chatbot** : Gemini 2.5 Flash API (clé dans index.html ligne ~920)
- **Hosting** : GitHub Pages (déploiement auto via `.github/workflows/static.yml`)
- **Analytics** : PostHog (EU) chargé par `assets/analytics.js` sur toutes les pages ; plan de marquage dans `content/analytics.md`

## Structure des fichiers
```
├── index.html          # Page principale (tout le site)
├── my_cv/
│   └── cv.md           # CV complet en Markdown (source de vérité pour le chatbot)
├── assets/
│   ├── avatar.png      # Photo de profil (utilisée dans chatbot + CTAs)
│   └── casquette.png   # Icône casquette (scroll indicator)
├── sitemap.xml         # SEO
├── robots.txt          # SEO + AI crawlers
├── llms.txt            # Contexte pour AI assistants
├── lexique/            # Lexique IA : index.html (graphe + fiche), terms.js (données), videos/
├── dico/               # Redirection vers lexique/ (ancienne URL)
├── content/dico/       # Coulisses éditoriales : brief-fiche.md, univers.md, plan, DA, vagues/ (archives)
├── scripts/            # build-lexique.mjs, check-lot.mjs, merge-lot.mjs
├── video/              # Pilote Remotion des shorts (node_modules et out/ ignorés)
├── .nojekyll           # Désactive Jekyll sur GitHub Pages
└── .github/workflows/static.yml  # GitHub Actions deploy
```

## Design
- **Palette** : `parchment` (#F5F2ED) fond, `charcoal` (#1A1A1A) texte, `anthropic-orange` (#D97706) accents
- **Style** : Brutalist/minimal, uppercase headings, tracking large
- **Responsive** : Mobile-first avec breakpoint `md:` (768px)

## Fonctionnalités clés

### 1. Chatbot IA (Gemini)
- Panel slide-in depuis la droite
- Charge `my_cv/cv.md` au runtime comme contexte
- SYSTEM_PROMPT défini dans index.html (~ligne 880)
- Répond à la 1ère personne comme Pierre-Adrien
- **Important** : Ne mentionne pas d'entreprise IA spécifique sauf si demandé

### 2. Export PDF (ATS-friendly, bilingue)
- `exportPDF('fr')` / `exportPDF('en')` ouvrent une fenêtre et déclenchent l'impression
- Contenu dans `CV_DATA` (index.html) : FR et EN, même structure, ~870 mots chacun
- Rendu par `buildCVHtml(lang)` ; styles dans `CV_STYLES`
- Layout ATS d'après `career-ops-hq/career-ops` (`templates/ats`) : **une seule colonne**,
  chaque champ en `display:block`, ligatures désactivées, typo 9.5-11.5px, titres de
  sections standards. Ne jamais réintroduire de `flex`/`grid` : les parsers lisent en travers.
- `atsNormalize()` convertit la ponctuation typographique en ASCII (tirets cadratins,
  guillemets courbes, espaces insécables, chasse nulle). La sortie doit rester 100% ASCII.
- Sortie sur 2 pages A4 (~1.8). C'est voulu : la version one-page précédente ne contenait
  que 288 mots.
- `CV_CONTACT.phone` est vide — le renseigner l'ajoute en première ligne de contact.
- Limite connue : l'impression navigateur injecte URL/date en en-tête si l'utilisateur ne
  décoche pas "En-têtes et pieds de page". Un bandeau `.hint` (masqué à l'impression) le rappelle.

### 3. Navigation
- Desktop : sidebar sticky à gauche avec scroll-spy
- Mobile : burger menu + overlay

### 4. Scroll Indicator
- Casquette + flèche pixel art en bas du viewport
- Disparaît après scroll (quand hero section passe 50% viewport)
- `id="scrollIndicator"` avec toggle `opacity-0`/`pointer-events-none`

### 5. Lexique IA (`/lexique/`)
- Glossaire FR de l'AI engineering : graphe des termes à gauche, fiche à droite, URL `?term=<id>`.
- Carte desktop (vue par défaut, sinon dernier choix en `localStorage`) : grappes par catégorie avec halo, taille des billes = racine du nombre de liens, libellés posés sans chevauchement par ordre d'importance (les autres au survol). Billes vivantes : on les attrape et les lance, les voisins suivent puis tout revient en place ; survol/focus = toutes les connexions. Mobile : index en liste + vue centrée « au tap » (pas de graphe complet).
- Filtre par catégorie : légende cliquable (desktop) et puces `.catchips` en tête de l'index (mobile), un seul état `catFilter` pour la carte, la liste A-Z et l'index.
- Contenu dans `lexique/terms.js` (`status: 'live'` = publié, `'soon'` = grisé dans le graphe).
- **Avant d'écrire une fiche ou un short, lire `content/dico/univers.md`** : gabarit de fiche, univers studio, règles d'écriture à l'écran (pas de staccato, pas de micro-texte décoratif), règles de rythme vidéo.
- Écrire un lot de fiches : suivre `content/dico/brief-fiche.md` (format, règles, sources, schéma). Un lot se vérifie avec `node scripts/check-lot.mjs <lot.js>` et se fusionne avec `node scripts/merge-lot.mjs <lot.js>` (numérotation, remplacement des fiches « soon »), puis build. Les vagues passées sont archivées dans `content/dico/vagues/` (index dans son README) ; ce sont des archives figées, `terms.js` fait foi.
- Chaque fait daté porte sa source dans `sources` ; les chiffres de tokenisation viennent d'un test `tiktoken`.
- Vidéos : rendu Remotion dans `video/`, puis recompression (`ffmpeg -crf 27 -movflags +faststart`) dans `lexique/videos/`.
- Shorts à voix off pour YouTube / TikTok (hors fiches ; une fois publiés, listés sur la page Shorts) : voix et musique ElevenLabs via le MCP, calage mot à mot, règle « lisible dans le métro ». Recette complète dans `video/VOIX.md`, ton et règles dans `univers.md` ; référence `video/src/PredictionVoix.tsx`.
- Schémas : `lexique/schemas/<id>.svg` (viewBox 360 de large, couleurs via les classes `.schema svg .xxx` de `lexique/index.html`, `<title>` obligatoire), affichés après l'« Imagine » sur les fiches sans vidéo. `lexique/schemas.js` est généré par le build, ne pas l'éditer.
- Un site cité en toutes lettres dans le texte (« va sur arcprize.org/play ») devient un lien si une source de la fiche pointe vers ce domaine. Les sources restent dans `terms.js` mais ne sont plus affichées.
- Termes cités dans le texte : la première mention d'une autre fiche (titre, nom anglais ou alias) devient un lien souligné en pointillés (`linkTerms` dans `render.js`). Les mots trop ambigus sont dans la liste `NEVER` ; un alias ne doit désigner qu'une seule fiche.
- Page Shorts (`/lexique/shorts/`) : les shorts à voix off publiés sur YouTube, lus dans un lecteur chargé au clic. Données dans `lexique/shorts.js` (un short n'y entre qu'une fois en ligne), couverture `lexique/shorts/<term>.jpg` en 540 px de large ; page générée par `scripts/shorts-page.mjs` via le build, reliée depuis l'en-tête du lexique et listée dans le sitemap.
- Après toute modif de `terms.js`, `render.js` ou des schémas : `node scripts/build-lexique.mjs`. `lexique/index.html` est en CRLF : l'éditer sans convertir les fins de ligne.

## SEO & AI Discoverability
- JSON-LD Schema.org (Person, `@id` `https://neopal.github.io/#person`) dans `<head>` du CV
- Open Graph + Twitter Cards
- `sitemap.xml`, `robots.txt` (robots IA actuels nommés et autorisés ; `/content/`, `/mockup/`, `/video/`, `/scripts/` exclus)
- `llms.txt` à la racine, qui renvoie vers `lexique/llms.txt` (index) et `lexique/llms-full.txt` (toutes les fiches en texte brut), générés par le build
- Lexique : chaque fiche porte un graphe JSON-LD (DefinedTerm + TechArticle avec auteur = la Person du CV, `datePublished` / `dateModified`, licence, `citation` = les sources de `terms.js`, `mentions` = termes liés ; VideoObject si vidéo ; BreadcrumbList) et les balises `article:*`. `datePublished` vient de la date d'ajout de la page dans git puis reste figée ; `dateModified` ne bouge que si la page change.
- Licence des définitions : CC BY 4.0 (`<link rel="license">`, bloc « Citer cette définition » avec bouton Copier en bas de chaque fiche)

## Points d'attention

### Tracking PostHog
Toute nouvelle page publique inclut `<script src="/assets/analytics.js"></script>` dans `<head>`. Les événements maison passent par `track(event, props)` et suivent `content/analytics.md` (noms `objet_verbe`, tableau à tenir à jour). Ne pas recoder pages vues ni scroll : `defaults` du SDK s'en charge.

### Clé API Gemini
Définie dans `index.html` (~ligne 913), variable `_t` obfusquée en array split. Si quota dépassé, le chatbot affiche une erreur.

### Années d'expérience dynamiques
```javascript
const CAREER_START = 2014;
const YEARS_EXP = new Date().getFullYear() - CAREER_START;
```
Mis à jour automatiquement dans le hero.

### CV comme source de vérité
Toute modification du profil doit être faite dans `my_cv/cv.md` - c'est ce fichier que le chatbot utilise.

## Commandes utiles
```bash
# Serveur local
python -m http.server 8000

# Deploy (auto via GitHub Actions sur push main)
git add -A && git commit -m "message" && git push
```

## Historique des features
- [x] Hero section responsive avec CTAs égaux
- [x] Chatbot Gemini avec contexte cv.md
- [x] Export PDF one-page
- [x] Scroll indicator avec hide on scroll
- [x] Navigation desktop/mobile
- [x] SEO complet (JSON-LD, OG, sitemap, robots, llms.txt)
- [x] Tracking PostHog sur tout le site (CV, lexique, shorts)

## Idées futures potentielles
- [ ] Mode sombre
- [ ] Animations d'entrée (Intersection Observer)
- [ ] Version anglaise
- [ ] Formulaire de contact
- [ ] Tests E2E avec Playwright

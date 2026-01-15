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

### 2. Export PDF
- Fonction `exportPDF()` génère un CV one-page dans nouvelle fenêtre
- Layout custom en HTML inline (pas CSS print)

### 3. Navigation
- Desktop : sidebar sticky à gauche avec scroll-spy
- Mobile : burger menu + overlay

### 4. Scroll Indicator
- Casquette + flèche pixel art en bas du viewport
- Disparaît après scroll (quand hero section passe 50% viewport)
- `id="scrollIndicator"` avec toggle `opacity-0`/`pointer-events-none`

## SEO & AI Discoverability
- JSON-LD Schema.org (Person) dans `<head>`
- Open Graph + Twitter Cards
- `sitemap.xml`, `robots.txt` (autorise tous crawlers AI)
- `llms.txt` pour ChatGPT/Claude/Perplexity

## Points d'attention

### Clé API Gemini
```javascript
const GEMINI_API_KEY = 'AIzaSyAIIFnYtbZOv6iOZzs_J5iPWARDPmZYZ_Q';  // ~ligne 920
```
Si quota dépassé, le chatbot affiche une erreur.

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

## Idées futures potentielles
- [ ] Mode sombre
- [ ] Animations d'entrée (Intersection Observer)
- [ ] Version anglaise
- [ ] Analytics (GA4 ou Plausible)
- [ ] Formulaire de contact
- [ ] Tests E2E avec Playwright

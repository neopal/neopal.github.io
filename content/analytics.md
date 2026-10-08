# Plan de marquage PostHog

Un seul fichier charge PostHog sur tout le site : `assets/analytics.js` (projet EU, `eu.i.posthog.com`).
Il est inclus en `<head>` du CV (`index.html`), du lexique (`lexique/index.html`, donc de chaque fiche
générée), de la page Shorts (`scripts/shorts-page.mjs`) et de la vraie 404 (`404.html`).
Toute nouvelle page HTML publique doit l'inclure : `<script src="/assets/analytics.js"></script>`.

## Principes

- **Le SDK fait le gros du travail.** `defaults: '2026-08-30'` règle les pages vues, la sortie de page
  et la profondeur de scroll. On ne recode pas ce que PostHog sait faire.
- **Peu d'événements maison, nommés `objet_verbe` au passé** (`term_opened`, `cv_pdf_exported`),
  en snake_case, avec des propriétés stables en snake_case. Un événement par intention, la variante
  va en propriété (`lang: 'en'`, pas `pdf_export_en`).
- **Tout le monde passe, bots compris** (`opt_out_useragent_filter: true`). PostHog marque les bots
  `$browser_type = 'bot'` : filtre `$browser_type != bot` pour l'audience humaine, `= bot` pour voir qui
  passe (seuls les robots qui exécutent le JS apparaissent : Googlebot, crawlers IA avec navigateur...).
- **Pas de profil personne** (`person_profiles: 'identified_only'`, aucun `identify`) : visiteurs anonymes,
  événements moins chers.
- **Les appels passent par `track(event, props)`**, qui ne casse jamais la page si PostHog est bloqué.

## Ce que règle `defaults: '2026-08-30'`

| Réglage | Effet |
|---|---|
| `capture_pageview: 'history_change'` | `$pageview` au chargement **et** à chaque `pushState` / retour arrière. Indispensable au lexique, qui change de fiche sans recharger la page. |
| `disable_capture_url_hashes` | Les ancres sont retirées des URL envoyées : `/#experience` remonte `/`. C'était la cause des chemins bizarres sur la home (liens du menu, flèche de scroll). |
| `capture_pageleave` | `$pageleave` avec `$prev_pageview_max_scroll_percentage` : la profondeur de scroll, sans code maison (l'ancien `scroll_depth` est supprimé). |
| `internal_or_test_user_hostname` | Le trafic `localhost` est marqué comme test. |

## Événements maison

### CV (`index.html`)

| Événement | Quand | Propriétés |
|---|---|---|
| `chat_opened` | Ouverture du chatbot | — |
| `chat_message_sent` | Question envoyée | `question` (500 car. max) |
| `$ai_generation` | Réponse (ou erreur) de Gemini, format [LLM analytics](https://posthog.com/docs/llm-analytics) | `$ai_trace_id` (une conversation = un chargement de page), `$ai_model`, `$ai_provider`, `$ai_input`, `$ai_output_choices`, `$ai_latency` (s), `$ai_input_tokens`, `$ai_output_tokens`, `$ai_http_status`, `$ai_is_error`, `$ai_error` |
| `cv_pdf_exported` | Export PDF | `lang` : `fr` / `en` |

### Lexique (`lexique/index.html`)

| Événement | Quand | Propriétés |
|---|---|---|
| `term_opened` | Fiche ouverte dans l'app (pas à l'arrivée sur la page : c'est le `$pageview`) | `term_id`, `term_category`, `via` : `carte`, `recherche`, `texte` (lien dans une définition), `connexions`, `pager`, `liste` (A-Z), `index`, `entete` |
| `term_soon_clicked` | Clic sur un terme « à venir » | `term_id`, `via` |
| `lexique_searched` | Pause de 1,2 s dans la recherche (2 car. min, pas de doublon) | `query`, `results_count` |
| `category_filtered` | Filtre de catégorie activé | `category` |
| `citation_copied` | « Copier » dans « Citer cette définition » | `term_id` |
| `video_played` | Lecture de la vidéo d'une fiche | `term_id` |

### Shorts et 404

| Événement | Quand | Propriétés |
|---|---|---|
| `short_played` | Clic sur un short (`/lexique/shorts/`) | `term_id`, `youtube_id` |
| `page_not_found` | Vraie 404 (pas la redirection d'un terme vers l'app) | `path` |

Le reste des clics (liens LinkedIn, mail, boutons) passe par l'autocapture.

## Tableau de bord conseillé

1. **Web analytics** (natif) : visiteurs, sources, pages ; un filtre `$browser_type` pour séparer humains et bots.
2. **Lexique** : top `$pageview` sur `/lexique/*` ; `term_opened` ventilé par `via` (comment on navigue) ;
   `lexique_searched` avec `results_count = 0` (les fiches à écrire) ; `term_soon_clicked` par `term_id`
   (la demande sur les fiches à venir).
3. **CV** : entonnoir `$pageview /` → `chat_opened` → `chat_message_sent` ; `cv_pdf_exported` par `lang`.
4. **LLM analytics** (natif) : latence, tokens, erreurs et questions du chatbot.

## Réglages côté interface PostHog

- Autocapture et heatmaps : activés ; session replay au goût (masquage des saisies par défaut).
- Laisser *Filter out internal and test users* désactivé : tout le trafic compte.

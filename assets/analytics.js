// PostHog : un seul fichier pour tout le site (CV, lexique, shorts, 404).
// Plan de marquage et conventions : content/analytics.md.
//
// - defaults '2026-08-30' : pages vues sur chaque changement d'URL (pushState du lexique compris),
//   page quittée avec profondeur de scroll, ancres (#experience...) retirées des URL,
//   localhost marqué comme trafic de test.
// - Pas de profil personne : visiteurs anonymes.
// - ?notrack sur n'importe quelle page exclut ce navigateur (mémorisé), ?track le réactive.
!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group identify setPersonProperties setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags resetGroups onFeatureFlags addFeatureFlagsHandler onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
posthog.init('phc_FACNCLu1wavY5qlWXOARKj21D2qQYY5C1CNXvJkkFok', {
  api_host: 'https://eu.i.posthog.com',
  defaults: '2026-08-30',
  person_profiles: 'identified_only',
  loaded: function (ph) {
    var q = location.search;
    if (/[?&]notrack\b/.test(q)) ph.opt_out_capturing();
    else if (/[?&]track\b/.test(q)) ph.opt_in_capturing();
  }
});

// track('evenement', {...}) : ne casse jamais la page si PostHog est bloqué.
window.track = function (event, props) {
  try { window.posthog.capture(event, props); } catch (e) { /* bloqueur, hors ligne */ }
};

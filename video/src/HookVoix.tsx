// Short Hook (YouTube / TikTok / Instagram), épisode 28, définition, voix off PAL - FR, préparé pour la semaine du
// 3 novembre 2026 (calage provisoire, sans voix). Fiche hook de lexique/terms.js ; sources dans voix/hook-voix.script.json :
// CHANGELOG de Claude Code 1.0.38 (« Released hooks ») et registre npm (30 juin 2025) ; Hooks reference de Claude Code
// (PreToolUse peut bloquer l'appel d'outil ; les hooks tournent avec tous les droits de l'utilisateur). Image inventée :
// le passager qui bloque la porte du métro. Fil : l'ép. 27 montrait qu'une consigne tient presque toujours.
// Le terme s'appelle comme la scène d'ouverture : la scène d'ouverture est `Hook`, l'objet « hook » est le `Portique`
// (une petite porte de métro avec son voyant), même dessin dans nom, avant et danger.
// La rame, sa porte, son voyant et le quai sont les mêmes dans hook, metro et chute (RameFond, RameFace, Quai, RT).
// Écarts au storyboard : la règle surlignée du CLAUDE.md n'a pas de texte (« ne touche pas au dossier prod » : six mots
// que la voix ne dit pas) ; la bulle renvoyée à l'agent montre un cadenas au lieu de « bloquée : dossier protégé » ; dans
// metro, la porte reste ouverte et rouge jusqu'au bout (la voix finit sur « reste ouverte »), la fermeture est gardée
// pour la chute ; dans la chute, une affiche CLAUDE.md (« les consignes ») reste sur le quai une fois la rame partie.
// L'écran suit la voix et Le mouvement (univers.md) : chaque élément entre sur le mot qui le nomme (at), easing du kit,
// arcs pour ce qui vole, défilement linéaire seulement pour la cascade de coches, un seul punch zoom (la case rouge de
// l'intro, sur le second « presque »).
import React from 'react';
import {Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Big, Check, Highlight, Lock, Mono, Pop, Scene, W, PAD, arc, clamp, ease, punch, useAccent, withAlpha} from './kit';
import {LABEL, blink, makeVoix} from './voix/VoixShort';
import {Pixel, type Sprite} from './voix/Pixel';
import {Cross, Model, pixelShadow} from './voix/Parts';
import ALIGN from './voix/hook-voix.align.json';
import SCRIPT from './voix/hook-voix.script.json';

const AC = '#D7A6FF'; // catégorie Agents et outils
const V = makeVoix(ALIGN, SCRIPT, 'voix/prediction-music.mp3');
const {at} = V;
export const HOOKVOIX_DURATION = V.duration;

const RED = '#FF4D4D';
const GREEN = '#4CD964';
const gone = (frame: number, until: number) => ease(frame, until, until + 6, [1, 0], 'inOut');
// Entrée / sortie identiques à celles de Scene, pour un calque posé hors de la Scene (le hook).
const useSceneOpacity = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  return interpolate(frame, [0, 6], [0, 1], clamp) * (1 - interpolate(frame, [durationInFrames - 5, durationInFrames], [0, 1], clamp));
};

// ---------- Personnages (pixel art, même format que voix/Pixel.tsx) ----------

const SKIN = '#e3b58e';
const SKIN2 = '#b07a52';

// Le passager qui retient la porte : sweat vert, le bras droit tendu vers le vantail.
const PASSAGER: Sprite = {
  rows: [
    '....HHHH......',
    '...HHHHHH.....',
    '...SSSSSS.....',
    '...SESSES.....',
    '...SSSSSS.....',
    '...SSRRSS.....',
    '....SSSS......',
    '..GGGGGGGGGGSS',
    '.GGGGGGGGGGGSS',
    '.GGGGGGGG.....',
    '.SGGGGGGG.....',
    '.SGGGGGGG.....',
    '...JJ..JJ.....',
    '...JJ..JJ.....',
  ],
  palette: {H: '#3a2a1a', S: SKIN, E: '#111', R: '#b5524f', G: '#4f8a5b', J: '#2f3b55'},
};

// Son copain, qui court sur le quai : cheveux noirs, veste orange.
const COPAIN: Sprite = {
  rows: [
    '....HHHH....',
    '...HHHHHH...',
    '...SSSSSS...',
    '...SESSES...',
    '...SSSSSS...',
    '...SSRRSS...',
    '....SSSS....',
    '..OOOOOOOO..',
    '.OOOOOOOOOO.',
    '.OOOOOOOOOO.',
    '.SOOOOOOOOS.',
    '.SOOOOOOOOS.',
    '...JJ..JJ...',
    '...JJ..JJ...',
  ],
  palette: {H: '#1e1e1e', S: SKIN2, E: '#111', R: '#7a2a2a', O: '#e07b39', J: '#3a3a3a'},
};

// Le conducteur, dans sa cabine : casquette et veste bleu nuit, galon jaune (aucun logo).
const CONDUCTEUR: Sprite = {
  rows: [
    '...KKKKKK...',
    '..KKKKKKKK..',
    '..YYYYYYYY..',
    '...SSSSSS...',
    '...SESSES...',
    '...SSSSSS...',
    '...SMMMMS...',
    '....SSSS....',
    '.NNNNWWNNNN.',
    '.NNNNWWNNNN.',
    '.SNNNNNNNNS.',
    '.SNNNNNNNNS.',
    '...NNNNNN...',
    '...NNNNNN...',
  ],
  palette: {K: '#1f2b45', Y: '#e8c45a', S: SKIN, E: '#111', M: '#5a3a22', N: '#1f2b45', W: '#f2f2f2'},
};

// Un utilisateur qui lève la main (scène date).
const user = (k: number): Sprite => ({
  rows: ['.......S', '..HHHH.S', '..SSSS.S', '..ESSE.S', '...SS.CS', '.CCCCCCC', '.CCCCCC.', '..CCCC..'],
  palette: {H: ['#4a4a4a', '#5a3a22', '#e8c45a', '#1e1e1e'][k % 4], S: k % 3 ? SKIN : SKIN2, E: '#111', C: ['#5b7fb5', '#4f8a5b', '#8e4a7a', '#e07b39', '#6a6a6a', '#b53a3a'][k % 6]},
});

// ---------- Objets dessinés (SVG maison) ----------

// Le Portique : l'objet « hook », une petite porte de métro posée sur la frise. Deux montants, un linteau, deux
// vantaux qui se ferment (p de 0, ouverte, à 1, fermée) et le voyant sur le linteau. `ailleurs` : celui qu'on a
// récupéré ailleurs, en brun. Même dessin dans nom, avant et danger.
const Portique: React.FC<{w: number; p?: number; light?: string; ailleurs?: boolean; ring?: string}> = ({w, p = 0, light = GREEN, ailleurs, ring}) => {
  const post = ailleurs ? '#b07a42' : '#cfcfcf';
  const leaf = ailleurs ? '#7a5532' : '#8a9099';
  return (
    <svg width={w} height={w * 2.2} viewBox="0 0 100 220" style={{overflow: 'visible'}}>
      <rect x="14" y="38" width="72" height="182" fill="#1d1d1d" />
      <rect x="14" y="38" width={36 * p} height="182" fill={leaf} />
      <rect x={86 - 36 * p} y="38" width={36 * p} height="182" fill={leaf} />
      <rect x="0" y="24" width="14" height="196" fill={ring ?? post} />
      <rect x="86" y="24" width="14" height="196" fill={ring ?? post} />
      <rect x="0" y="24" width="100" height="16" fill={ring ?? post} />
      <circle cx="50" cy="10" r="17" fill={light} opacity="0.3" />
      <circle cx="50" cy="10" r="10" fill={light} />
    </svg>
  );
};

// L'agent : le modèle du kit, avec deux yeux.
const Agent: React.FC<{w: number}> = ({w}) => {
  const k = w / 260;
  return (
    <div style={{position: 'relative', lineHeight: 0}}>
      <Model w={w} />
      {[80, 150].map((x) => (
        <div key={x} style={{position: 'absolute', left: x * k, top: 50 * k, width: 34 * k, height: 34 * k, background: '#fff'}}>
          <div style={{position: 'absolute', left: 14 * k, top: 10 * k, width: 14 * k, height: 14 * k, background: '#111'}} />
        </div>
      ))}
    </div>
  );
};

// Le fichier de consignes, recréé : titre CLAUDE.md et des lignes ; la troisième, la règle, se surligne (rule de 0 à 1).
const ClaudeMd: React.FC<{w: number; rule?: number}> = ({w, rule = 0}) => {
  const accent = useAccent();
  return (
    <div style={{width: w, background: '#efe9dc', border: '6px solid #fff', boxShadow: pixelShadow('#444'), padding: '26px 34px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 24}}>
      <Mono size={52} color="#111">CLAUDE.md</Mono>
      {[86, 64, 92, 58, 76].map((x, k) => (
        <div key={k} style={{position: 'relative', height: 20, width: `${x}%`}}>
          {k === 2 ? <div style={{position: 'absolute', left: -10, top: -10, bottom: -10, width: `calc(${rule * 100}% + 20px)`, background: accent}} /> : null}
          <div style={{position: 'absolute', inset: 0, background: k === 2 && rule > 0 ? '#111' : '#9a9384'}} />
        </div>
      ))}
    </div>
  );
};

// Une action de l'agent : une carte de code (traits) ; `mess` décale les lignes (code en désordre), `border` la teinte.
const Carte: React.FC<{w: number; mess?: number; border?: string; children?: React.ReactNode}> = ({w, mess = 0, border = '#8a8a8a', children}) => (
  <div style={{position: 'relative', width: w, height: w * 0.72, background: '#1a1a1a', border: `5px solid ${border}`, boxSizing: 'border-box', padding: `${w / 9}px ${w / 10}px`, display: 'flex', flexDirection: 'column', gap: w / 14}}>
    {[[70, 22], [50, -12], [80, 30], [40, 8]].map(([x, off], k) => (
      <div key={k} style={{height: Math.max(8, w / 18), width: `${x}%`, background: '#7a7a7a', transform: `translateX(${off * mess}px)`}} />
    ))}
    {children}
  </div>
);

const Folder: React.FC<{w: number}> = ({w}) => (
  <svg width={w} height={w * 0.8} viewBox="0 0 100 80">
    <path d="M4 14 H38 L46 24 H96 V76 H4 Z" fill="#e8c45a" stroke="#a8862a" strokeWidth="5" strokeLinejoin="round" />
  </svg>
);

// La brosse qui range le code : manche, monture, poils.
const Brosse: React.FC<{w: number}> = ({w}) => (
  <svg width={w} height={w} viewBox="0 0 100 100">
    <rect x="44" y="4" width="12" height="46" rx="5" fill="#c08a4a" />
    <rect x="20" y="48" width="60" height="16" fill="#8a5a2a" />
    {Array.from({length: 9}, (_, k) => <rect key={k} x={22 + k * 6.6} y="64" width="4" height="30" fill="#e8c45a" />)}
  </svg>
);

// L'horloge du conducteur en retard : l'aiguille tourne.
const Horloge: React.FC<{w: number; t: number}> = ({w, t}) => (
  <svg width={w} height={w} viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="42" fill="#111" stroke="#fff" strokeWidth="7" />
    <path d="M50 50 V26" stroke="#fff" strokeWidth="7" strokeLinecap="round" />
    <path d={`M50 50 L${50 + 32 * Math.sin(t)} ${50 - 32 * Math.cos(t)}`} stroke={RED} strokeWidth="6" strokeLinecap="round" />
  </svg>
);

// L'ordinateur (scène danger).
const Ordi: React.FC<{w: number}> = ({w}) => (
  <svg width={w} height={w * 0.8} viewBox="0 0 100 80">
    <rect x="4" y="4" width="92" height="58" fill="#1c2633" stroke="#cfcfcf" strokeWidth="4" />
    <rect x="44" y="62" width="12" height="10" fill="#cfcfcf" />
    <rect x="28" y="72" width="44" height="5" fill="#cfcfcf" />
  </svg>
);

// La clé : tous tes droits.
const Cle: React.FC<{w: number}> = ({w}) => {
  const accent = useAccent();
  return (
    <svg width={w} height={w / 2} viewBox="0 0 100 50">
      <circle cx="20" cy="25" r="14" fill="none" stroke={accent} strokeWidth="8" />
      <rect x="33" y="21" width="62" height="8" fill={accent} />
      <rect x="72" y="29" width="7" height="12" fill={accent} />
      <rect x="85" y="29" width="7" height="9" fill={accent} />
    </svg>
  );
};

// La loupe qui relit.
const Loupe: React.FC<{w: number}> = ({w}) => (
  <svg width={w} height={w} viewBox="0 0 100 100">
    <circle cx="40" cy="40" r="28" fill="rgba(255,255,255,0.12)" stroke="#fff" strokeWidth="8" />
    <path d="M60 60 L90 90" stroke="#fff" strokeWidth="12" strokeLinecap="round" />
  </svg>
);

// ---------- La rame, sa porte et le quai (scènes hook, metro, chute) ----------

// Coordonnées du cadre (1080 de large) : on pose ces calques à left = -PAD dans la zone centrale de la Scene.
const DC = 430; // centre de la porte
const RT = 120; // haut de la caisse dans la boîte de la scène
const RH = 330; // hauteur de la caisse
const GAP = 212; // ouverture de la porte retenue (le bras du passager touche le vantail)
const WINDOWS = [-720, -520, -320, -120, 40, 690];

// Le fond de la rame : caisse, bande, fenêtres, intérieur de la porte, cabine du conducteur.
const RameFond: React.FC = () => (
  <svg width={1080} height={RH} viewBox={`0 0 1080 ${RH}`} style={{overflow: 'visible', display: 'block'}}>
    <rect x={DC - 14} y={-22} width={28} height={24} fill="#8a9099" />
    <rect x={-760} y={0} width={1800} height={RH} rx={34} fill="#c9ced4" />
    <rect x={-760} y={236} width={1800} height={22} fill="#3a6ea5" />
    <rect x={-760} y={298} width={1800} height={32} fill="#9aa1aa" />
    {WINDOWS.map((x) => <rect key={x} x={x} y={46} width={150} height={120} fill="#1c2633" stroke="#8a9099" strokeWidth={6} />)}
    <rect x={DC - 110} y={24} width={220} height={RH - 24} fill="#10151c" />
    <rect x={DC + 76} y={24} width={8} height={RH - 24} fill="#6a6a6a" />
    <rect x={860} y={0} width={8} height={RH} fill="#9aa1aa" />
    <rect x={880} y={40} width={130} height={160} fill="#1c2633" stroke="#8a9099" strokeWidth={6} />
  </svg>
);

// La face : les deux vantaux (ouverture `g` en px) et le voyant au-dessus de la porte.
const RameFace: React.FC<{g: number; light: string}> = ({g, light}) => (
  <svg width={1080} height={RH} viewBox={`0 0 1080 ${RH}`} style={{overflow: 'visible', display: 'block'}}>
    {[DC - 110 - g / 2, DC + g / 2].map((x, k) => (
      <g key={k}>
        <rect x={x} y={24} width={110} height={RH - 24} fill="#dfe3e8" stroke="#8a9099" strokeWidth={4} />
        <rect x={x + 18} y={46} width={74} height={110} fill="#1c2633" />
      </g>
    ))}
    <circle cx={DC} cy={-34} r={28} fill={light} opacity={0.3} />
    <circle cx={DC} cy={-34} r={17} fill={light} />
  </svg>
);

// Le quai : bordure, ligne de sécurité jaune, dallage.
const Quai: React.FC = () => (
  <div style={{position: 'absolute', left: -PAD, top: RT + RH, width: 1080, height: 190, background: '#343434'}}>
    <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 10, background: '#5a5a5a'}} />
    <div style={{position: 'absolute', left: 0, right: 0, top: 26, height: 14, background: '#e8c45a'}} />
  </div>
);

// Le mur de la station derrière la rame (chute) : carrelage sombre.
const Mur: React.FC = () => (
  <div
    style={{
      position: 'absolute',
      left: -PAD,
      top: RT - 70,
      width: 1080,
      height: RH + 70,
      background: '#222',
      backgroundImage: 'linear-gradient(#2e2e2e 3px, transparent 3px), linear-gradient(90deg, #2e2e2e 3px, transparent 3px)',
      backgroundSize: '72px 40px',
    }}
  />
);

// ---------- 0. Hook : la porte de métro fermée, son voyant, et le titre ----------

const Hook: React.FC = () => {
  const op = useSceneOpacity();
  return (
    <>
      {/* La rame au-dessus du titre (aucun sous-titre dans le hook), posée dès la première image, porte fermée. */}
      <div style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 660, opacity: op, overflow: 'hidden'}}>
        <div style={{position: 'absolute', left: 0, top: 200, width: 1080, transform: 'scale(0.82)', transformOrigin: '50% 0'}}>
          <RameFond />
          <div style={{position: 'absolute', left: 0, top: 0}}>
            <RameFace g={0} light={GREEN} />
          </div>
          <div style={{position: 'absolute', left: 0, top: RH, width: 1080, height: 120, background: '#343434'}}>
            <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 10, background: '#5a5a5a'}} />
            <div style={{position: 'absolute', left: 0, right: 0, top: 26, height: 14, background: '#e8c45a'}} />
          </div>
        </div>
      </div>
      <V.TitleHook lead="C'est quoi ?" lines={['un hook']} cue="hook" />
    </>
  );
};

// ---------- 0 bis. La vanne : « pas le film de Spielberg », l'affiche de Hook (1991), dont le crochet happe les gestes ----------
// Vraie affiche du film en collage (public/voix/hook-voix-film.png, « Hook poster transparent.png », Wikipédia en anglais,
// affiche de TriStar Pictures, citation) ; le crochet du capitaine est au centre de l'affiche (HOOK_AT, en proportion).

const POSTER_W = 460;
const POSTER_H = Math.round((POSTER_W * 375) / 258);
const POSTER = {x: 214, y: 20};
const HOOK_AT = [0.589, 0.373];

const Crochet: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const accent = useAccent();
  const film = at('crochet', 'film');
  const attrape = at('crochet', 'attrape');
  const passage = at('crochet', 'passage');
  const HX = POSTER.x + POSTER_W * HOOK_AT[0];
  const HY = POSTER.y + POSTER_H * HOOK_AT[1];
  // L'affiche est collée d'un coup sur « film » (comme les collages des autres shorts), Ken Burns de 5 % ensuite.
  const slap = spring({frame: frame - film, fps, config: {damping: 12, stiffness: 260}});
  const kb = interpolate(frame, [film, film + 150], [1, 1.05], clamp);
  // Deux cartes d'action défilent en bas (défilement linéaire continu) ; sur leur mot, le crochet les happe en arc.
  const cards = [attrape, passage].map((tm, k) => {
    const x0 = -200 + ((frame * 6 + k * 420) % 1400);
    const m = ease(frame, tm, tm + 12, [0, 1], 'inOut');
    const [x, y] = arc(m, [x0, 760], [HX - 60, HY - 40], -80);
    return {x: frame >= tm ? x : x0, y: frame >= tm ? y : 760, s: frame >= tm ? 1 - 0.6 * m : 1, caught: frame >= tm + 12};
  });
  const shine = Math.max(...[attrape, passage].map((tm) => (frame >= tm + 12 ? ease(frame, tm + 12, tm + 20, [1, 0]) : 0)));
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 1000}}>
        <div style={{position: 'absolute', left: POSTER.x, top: POSTER.y, width: POSTER_W, height: POSTER_H, opacity: frame >= film ? 1 : 0, transform: `scale(${(1.4 - 0.4 * slap) * kb}) rotate(${-3 * (2 - slap)}deg)`, border: '10px solid #fff', boxShadow: pixelShadow('#333'), background: '#fff'}}>
          <Img src={staticFile('voix/hook-voix-film.png')} style={{width: '100%', height: '100%', display: 'block'}} />
          <div style={{position: 'absolute', left: -24, top: -16, width: 100, height: 32, background: 'rgba(240,230,200,0.8)', transform: 'rotate(-30deg)'}} />
          <div style={{position: 'absolute', right: -24, top: -16, width: 100, height: 32, background: 'rgba(240,230,200,0.8)', transform: 'rotate(28deg)'}} />
        </div>
        {cards.map((c, k) => (
          <div key={k} style={{position: 'absolute', left: c.x, top: c.y, transform: `scale(${c.s})`, opacity: c.caught ? 0 : 1}}>
            <Carte w={150} border={c.s < 1 ? accent : '#8a8a8a'} />
          </div>
        ))}
        {shine > 0 ? <div style={{position: 'absolute', left: HX - 40, top: HY - 40, width: 80, height: 80, borderRadius: '50%', background: withAlpha('#ffffff', 0.75 * shine)}} /> : null}
      </div>
    </Scene>
  );
};

// ---------- 1. Intro : le CLAUDE.md, la règle surlignée, vingt actions cochées et une case rouge ----------

const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const regle = at('intro', 'règle');
  const agent = at('intro', 'agent');
  const presque = at('intro', 'presque');
  const presque2 = at('intro', 'presque', 1);
  const BAD = 16;
  const BOX = 76;
  const STEP = (W - BOX) / 9;
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 640}}>
        {/* Le fichier de consignes, posé dès l'entrée ; highlight : la règle se surligne sur « règle ». */}
        <Pop at={2} style={{position: 'absolute', left: 0, top: 0, opacity: frame >= presque ? 0.55 : 1}}>
          <ClaudeMd w={540} rule={ease(frame, regle, regle + 12)} />
        </Pop>
        {/* pop in : l'agent, sur « agent ». */}
        <Pop at={agent} style={{position: 'absolute', left: 640, top: 90, opacity: frame >= presque ? 0.55 : 1}}>
          <Agent w={240} />
        </Pop>
        {/* stagger : vingt actions entrent en cascade, chacune cochée, sur « presque toujours ». */}
        {Array.from({length: 20}, (_, k) => {
          const t = presque + 2 * k;
          const bad = k === BAD && frame >= presque2;
          const s = bad ? punch(frame, presque2) : 1; // punch zoom (le seul du short) : la case rouge, sur le second « presque »
          return (
            <div key={k} style={{position: 'absolute', left: (k % 10) * STEP, top: 390 + Math.floor(k / 10) * (BOX + 18), opacity: frame >= t ? 1 : 0, transform: `scale(${s * ease(frame, t, t + 6, [0.6, 1])})`}}>
              <div style={{width: BOX, height: BOX, border: `5px solid ${bad ? RED : '#8a8a8a'}`, background: bad ? withAlpha(RED, 0.3) : '#1a1a1a', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 0}}>
                {bad ? <Cross p={ease(frame, presque2, presque2 + 8)} size={60} color={RED} /> : <Check p={ease(frame, t + 2, t + 8)} size={60} color={GREEN} />}
              </div>
            </div>
          );
        })}
      </div>
    </Scene>
  );
};

// ---------- 2. Le nom : la frise des actions, un portique avant et après chaque case, puis le terme ----------

const UNIT = 284;
const UNIT_X = (k: number) => k * (UNIT + (W - 3 * UNIT) / 2);
const PW = 64; // largeur d'un portique sur la frise (hauteur 141)
const BOXW = 140;
const FRISE_TOP = 360;

const Nom: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const claude = at('nom', 'Claude');
  const programme = at('nom', 'programme');
  const avant = at('nom', 'avant');
  const apres = at('nom', 'après');
  const cest = at('nom', "C'est");
  const hook = at('nom', 'hook');
  const dim = ease(frame, cest, cest + 8, [1, 0.35], 'inOut');
  // Le premier portique avant entre sur « programme », les autres en cascade sur « avant » ; les portiques après sur « après ».
  const tAvant = (k: number) => (k === 0 ? programme : avant + 3 * k);
  const tApres = (k: number) => apres + 3 * k;
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 640}}>
        <div style={{position: 'absolute', inset: 0, opacity: dim}}>
          {/* pop in : le nom de l'outil, sur « Claude ». */}
          <Pop at={claude} style={{position: 'absolute', left: 0, top: 250, opacity: gone(frame, cest)}}>
            <Mono size={52} color={LABEL}>Claude Code</Mono>
          </Pop>
          {/* La frise des actions de l'agent : le décor, posé dès l'entrée. */}
          <div style={{position: 'absolute', left: 0, top: FRISE_TOP + 70, width: W, height: 6, background: '#3a3a3a'}} />
          {[0, 1, 2].map((k) => (
            <React.Fragment key={k}>
              <Pop at={2 + 3 * k} style={{position: 'absolute', left: UNIT_X(k) + PW + 8, top: FRISE_TOP + 20}}>
                <Carte w={BOXW} border={k === 1 ? accent : '#8a8a8a'} />
              </Pop>
              <Pop at={tAvant(k)} style={{position: 'absolute', left: UNIT_X(k), top: FRISE_TOP, lineHeight: 0}}>
                <Portique w={PW} />
              </Pop>
              <Pop at={tApres(k)} style={{position: 'absolute', left: UNIT_X(k) + UNIT - PW, top: FRISE_TOP, lineHeight: 0}}>
                <Portique w={PW} />
              </Pop>
            </React.Fragment>
          ))}
        </div>
        {/* pop in : le terme écrit en grand, sur « hook » (sous-titre masqué par onscreen). */}
        <Pop at={hook} style={{position: 'absolute', left: 0, top: 20, width: W}}>
          <Big size={200} color={accent}>hook</Big>
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 3. L'image : le passager qui bloque la porte du métro ----------

const Metro: React.FC = () => {
  const frame = useCurrentFrame();
  const passager = at('metro', 'passager');
  const copain = at('metro', 'copain');
  const crier = at('metro', 'crier');
  const conducteur = at('metro', 'conducteur');
  const retard = at('metro', 'retard');
  const partira = at('metro', 'partira');
  const porte2 = at('metro', 'porte', 1);
  // Sur « partira pas », la rame tremble sans avancer (amortie) ; elle repart en tremblant sur le second « porte ».
  const shake = (t: number) => (frame >= t ? Math.sin((frame - t) * 2.4) * 7 * Math.exp(-(frame - t) / 14) : 0);
  const sx = shake(partira) + shake(porte2);
  // Le copain arrive en courant sur le quai (s'arrête à gauche de la porte), sur « copain ».
  const run = ease(frame, copain, copain + 22);
  const cx = interpolate(run, [0, 1], [-260, 60]);
  const bob = run < 1 && frame >= copain ? Math.abs(Math.sin(frame / 2.2)) * 10 : 0;
  // Le voyant reste rouge et clignote : la porte reste ouverte.
  const light = withAlpha(RED, blink(frame));
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 640}}>
        {/* Le décor posé dès l'entrée : le quai, la rame à l'arrêt porte ouverte, voyant rouge. */}
        <Quai />
        <div style={{position: 'absolute', left: -PAD, top: RT, transform: `translateX(${sx}px)`}}>
          <RameFond />
        </div>
        {/* pop in : le conducteur dans sa cabine, sur « conducteur ». */}
        <div style={{position: 'absolute', left: -PAD + 891 + sx, top: RT + 52, width: 108, height: 140, overflow: 'hidden', lineHeight: 0}}>
          <Pop at={conducteur}>
            <Pixel sprite={CONDUCTEUR} px={9} seed={2} />
          </Pop>
        </div>
        {/* pop in : le passager dans l'embrasure, le bras tendu contre le vantail, sur « passager ». */}
        <Pop at={passager} style={{position: 'absolute', left: -PAD + DC - 104 + sx, top: RT + RH - 210, lineHeight: 0}}>
          <Pixel sprite={PASSAGER} px={15} seed={1} />
        </Pop>
        <div style={{position: 'absolute', left: -PAD, top: RT, transform: `translateX(${sx}px)`}}>
          <RameFace g={GAP} light={light} />
        </div>
        {/* Le copain qui court sur le quai, sur « copain ». */}
        <div style={{position: 'absolute', left: -PAD + cx, top: RT + RH + 150 - 168 - bob, lineHeight: 0, opacity: frame >= copain ? 1 : 0}}>
          <Pixel sprite={COPAIN} px={12} seed={5} />
        </div>
        {/* pop in : le passager crie, sur « crier » ; la bulle part quand le conducteur arrive. */}
        <Pop at={crier} style={{position: 'absolute', left: -PAD + DC - 250, top: RT + 10, opacity: gone(frame, conducteur + 6)}}>
          <div style={{background: '#fff', border: '5px solid #111', borderRadius: 24, padding: '4px 26px'}}>
            <Mono size={72} color="#111">!!</Mono>
          </div>
        </Pop>
        {/* pop in : l'horloge au-dessus de la cabine, sur « retard » ; l'aiguille tourne. */}
        <Pop at={retard} style={{position: 'absolute', left: -PAD + 895, top: RT - 120, lineHeight: 0}}>
          <Horloge w={100} t={(frame - retard) / 6} />
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 4. Avant / après : le portique avant bloque l'écriture, le portique après range et teste ----------

const AG = {x: 0, y: 270, w: 160};
const GA = 380; // portique avant
const GB = 700; // portique après
const PG = 80; // largeur des portiques de cette scène (hauteur 176)
const G_TOP = 224;
const CW = 180; // carte d'action (hauteur 130)
const C_TOP = G_TOP + 176 - 30 - 130;
const WAIT = 190; // la carte attend devant le portique avant
const SLOT = 500; // entre les deux portiques

const Avant: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const action = at('avant', 'action');
  const bloquer = at('avant', 'bloquer');
  const production = at('avant', 'production');
  const pourquoi = at('avant', 'pourquoi');
  const place2 = at('avant', 'Placé', 1);
  const apres = at('avant', 'après');
  const range = at('avant', 'range');
  const tests = at('avant', 'tests');
  // Portique avant : se ferme sur « bloquer » (rouge), se rouvre sur le second « Placé » (vert).
  const pa = frame < place2 ? ease(frame, bloquer, bloquer + 8, [0, 1], 'inOut') : ease(frame, place2, place2 + 8, [1, 0], 'inOut');
  const lightA = frame >= bloquer && frame < place2 + 4 ? RED : GREEN;
  const out1 = gone(frame, place2);
  // Carte 1 : sort de l'agent sur « action » et s'arrête devant le portique avant.
  const x1 = ease(frame, action, action + 14, [60, WAIT]);
  // La bulle (cadenas) repart vers l'agent en arc sur « pourquoi ».
  const b = ease(frame, pourquoi, pourquoi + 16, [0, 1], 'inOut');
  const [bx, by] = arc(b, [GA - 20, G_TOP - 100], [AG.x + 10, AG.y - 150], 70);
  // Carte 2 : sort de l'agent sur le second « Placé », passe le portique avant et s'arrête entre les deux portiques.
  const x2 = frame < place2 + 2 ? 60 : ease(frame, place2 + 2, apres + 14, [60, SLOT], 'inOut');
  // La brosse passe de gauche à droite sur « range » ; le code s'aligne derrière elle.
  const br = ease(frame, range, range + 18, [0, 1], 'inOut');
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 640}}>
        {/* Le décor posé dès l'entrée : la frise, l'agent, les deux portiques. */}
        <div style={{position: 'absolute', left: AG.w, top: G_TOP + 176 - 24, width: W - AG.w, height: 6, background: '#3a3a3a'}} />
        {/* Carte 1 : l'écriture dans le dossier de production. */}
        <div style={{position: 'absolute', left: x1, top: C_TOP, opacity: (frame >= action ? 1 : 0) * out1}}>
          <Carte w={CW} border={frame >= bloquer ? RED : '#8a8a8a'}>
            {frame >= production ? (
              <Pop at={production} style={{position: 'absolute', right: -24, top: -40, lineHeight: 0}}>
                <Folder w={84} />
              </Pop>
            ) : null}
          </Carte>
          {/* draw-on : la croix rouge sur « bloquer ». */}
          <div style={{position: 'absolute', left: (CW - 120) / 2, top: 5, lineHeight: 0, opacity: frame >= bloquer + 4 ? 1 : 0}}>
            <Cross p={ease(frame, bloquer + 4, bloquer + 14)} size={120} color={RED} />
          </div>
        </div>
        {/* Le libellé de la carte, 4 images après le dossier. */}
        <Pop at={production + 5} style={{position: 'absolute', left: WAIT + CW / 2 - 145, top: G_TOP + 196, opacity: out1}}>
          <Mono size={48} color="#e8c45a">production</Mono>
        </Pop>
        {/* La bulle qui dit à l'agent pourquoi : un cadenas, en arc vers l'agent, sur « pourquoi ». */}
        <div style={{position: 'absolute', left: bx, top: by, opacity: (frame >= pourquoi ? 1 : 0) * out1}}>
          <div style={{background: '#fff', border: `5px solid ${RED}`, borderRadius: 22, padding: '10px 18px', lineHeight: 0}}>
            <Lock p={1} size={70} color={RED} />
          </div>
        </div>
        {/* Carte 2 : une action normale ; ses lignes s'alignent sous la brosse. */}
        <div style={{position: 'absolute', left: x2, top: C_TOP, opacity: frame >= place2 + 2 ? 1 : 0}}>
          <Carte w={CW} mess={1 - br} border={frame >= tests ? GREEN : '#8a8a8a'} />
        </div>
        {/* L'agent, à gauche, devant la frise (les cartes sortent de lui). */}
        <Pop at={0} style={{position: 'absolute', left: AG.x, top: AG.y}}>
          <Agent w={AG.w} />
        </Pop>
        <Pop at={2} style={{position: 'absolute', left: GA, top: G_TOP, lineHeight: 0}}>
          <Portique w={PG} p={pa} light={lightA} />
        </Pop>
        <Pop at={4} style={{position: 'absolute', left: GB, top: G_TOP, lineHeight: 0}}>
          <Portique w={PG} light={frame >= apres ? accent : GREEN} ring={frame >= apres ? accent : undefined} />
        </Pop>
        {/* La brosse, sur « range ». */}
        <div style={{position: 'absolute', left: SLOT - 50 + br * (CW - 20), top: C_TOP - 70, lineHeight: 0, opacity: frame >= range ? gone(frame, range + 22) : 0, transform: `rotate(${-20 + 40 * br}deg)`}}>
          <Brosse w={110} />
        </div>
        {/* pop in : la coche « tests » s'allume après le portique, sur « tests ». */}
        <Pop at={tests} style={{position: 'absolute', left: SLOT, top: G_TOP + 196, display: 'flex', alignItems: 'center', gap: 14}}>
          <div style={{lineHeight: 0}}><Check p={ease(frame, tests, tests + 10)} size={72} color={GREEN} /></div>
          <Mono size={52} color={GREEN}>tests</Mono>
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 5. La date : la ligne du changelog et la page de calendrier au 30 juin 2025 ----------

// Collage recréé sobre de la ligne du CHANGELOG de Claude Code (version 1.0.38).
// À REMPLACER par public/voix/hook-voix-changelog.png (capture du CHANGELOG, crédit dans le script).
const Changelog: React.FC<{hi: number}> = ({hi}) => (
  <div style={{position: 'relative', transform: 'rotate(-1.5deg)'}}>
    <div style={{width: 640, background: '#fff', border: '5px solid #fff', boxShadow: pixelShadow('#333'), padding: '24px 30px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 18}}>
      <Mono size={48} color="#555">## 1.0.38</Mono>
      <div style={{color: '#111'}}>
        <Highlight at={hi} color="#FFE14D"><Mono size={52} color="#111">- Released hooks</Mono></Highlight>
      </div>
      <div style={{height: 16, width: '78%', background: '#cfcfcf'}} />
      <div style={{height: 16, width: '56%', background: '#cfcfcf'}} />
    </div>
    <div style={{position: 'absolute', left: -18, top: -10, width: 80, height: 26, background: 'rgba(239,233,220,0.85)', transform: 'rotate(-30deg)'}} />
    <div style={{position: 'absolute', right: -18, bottom: -10, width: 80, height: 26, background: 'rgba(239,233,220,0.85)', transform: 'rotate(-30deg)'}} />
  </div>
);

// La page de calendrier arrachée : bord haut déchiré, scotch aux coins.
const Calendrier: React.FC = () => {
  const teeth = Array.from({length: 13}, (_, k) => `${(k * 100) / 12}% ${k % 2 ? 0 : 14}px`).join(', ');
  return (
    <div style={{position: 'relative', transform: 'rotate(3deg)'}}>
      <div style={{width: 360, background: '#f4f1ea', boxShadow: pixelShadow('#333'), clipPath: `polygon(${teeth}, 100% 100%, 0% 100%)`}}>
        <div style={{background: '#c0392b', padding: '30px 0 14px', display: 'flex', justifyContent: 'center'}}>
          <Mono size={52} color="#fff">juin 2025</Mono>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', padding: '10px 0 24px'}}>
          <Mono size={170} color="#111">30</Mono>
        </div>
      </div>
      <div style={{position: 'absolute', left: -22, bottom: -8, width: 80, height: 26, background: 'rgba(239,233,220,0.85)', transform: 'rotate(35deg)'}} />
      <div style={{position: 'absolute', right: -22, bottom: -8, width: 80, height: 26, background: 'rgba(239,233,220,0.85)', transform: 'rotate(-35deg)'}} />
    </div>
  );
};

const DateScene: React.FC = () => {
  const frame = useCurrentFrame();
  const ajoutes = at('date', 'ajoutés');
  const trente = at('date', '30');
  const utilisateurs = at('date', 'utilisateurs');
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 640}}>
        {/* pop in : la ligne du changelog, sur « Anthropic » ; highlight sur « ajoutés ». */}
        <Pop at={0} style={{position: 'absolute', left: 0, top: 0}}>
          <Changelog hi={ajoutes} />
        </Pop>
        {/* pop in : la page de calendrier, sur « 30 ». */}
        <Pop at={trente} style={{position: 'absolute', right: 10, top: 200}}>
          <Calendrier />
        </Pop>
        {/* stagger : les utilisateurs qui lèvent la main, de gauche à droite, sur « utilisateurs ». */}
        <div style={{position: 'absolute', left: 0, top: 560, display: 'flex', gap: 22}}>
          {Array.from({length: 4}, (_, k) => (
            <Pop key={k} at={utilisateurs + 3 * k} style={{lineHeight: 0}}>
              <div style={{transform: `translateY(${frame >= utilisateurs + 3 * k + 8 ? -Math.abs(Math.sin((frame + k * 5) / 5)) * 8 : 0}px)`}}>
                <Pixel sprite={user(k)} px={14} seed={k + 2} />
              </div>
            </Pop>
          ))}
        </div>
      </div>
    </Scene>
  );
};

// ---------- 6. Le danger : le portique grossit devant l'ordinateur et sa clé, puis la loupe sur un portique d'ailleurs ----------

const Danger: React.FC = () => {
  const frame = useCurrentFrame();
  const hook = at('danger', 'hook');
  const machine = at('danger', 'machine');
  const droits = at('danger', 'droits');
  const alors = at('danger', 'alors');
  const relit = at('danger', 'relit');
  const recup = at('danger', 'récupère');
  // Le portique, posé dès l'entrée, grossit sur « hook ».
  const grow = ease(frame, hook, hook + 14, [PG, 150], 'inOut');
  // Sur « alors », l'ordinateur et le portique passent en retrait à gauche ; le portique d'ailleurs arrive en arc.
  const back = ease(frame, alors, alors + 14, [0, 1], 'inOut');
  const f = ease(frame, alors, alors + 16, [0, 1], 'inOut');
  const [fx, fy] = arc(f, [1000, 300], [640, 230], 60);
  const lp = ease(frame, relit, relit + 20, [0, 1], 'inOut');
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 640}}>
        <div style={{position: 'absolute', inset: 0, transform: `translateX(${-120 * back}px) scale(${1 - 0.3 * back})`, transformOrigin: '0% 70%', opacity: 1 - 0.5 * back}}>
          {/* pop in : l'ordinateur derrière le portique, sur « machine » ; la clé sur son écran, sur « droits ». */}
          <Pop at={machine} style={{position: 'absolute', left: 300, top: 40, lineHeight: 0}}>
            <Ordi w={460} />
          </Pop>
          <Pop at={droits} style={{position: 'absolute', left: 560, top: 110, lineHeight: 0}}>
            <Cle w={150} />
          </Pop>
          <div style={{position: 'absolute', left: 200 - grow / 2, top: 560 - grow * 2.2, lineHeight: 0}}>
            <Portique w={grow} />
          </div>
        </div>
        {/* Le portique récupéré ailleurs, en brun, arrive en arc sur « alors ». */}
        <div style={{position: 'absolute', left: fx, top: fy, lineHeight: 0, opacity: frame >= alors ? 1 : 0}}>
          <Portique w={120} ailleurs light="#f0a040" />
        </div>
        {/* La loupe passe dessus, sur « relit ». */}
        <div style={{position: 'absolute', left: 560 + 180 * lp, top: 260 - 60 * Math.sin(Math.PI * lp), lineHeight: 0, opacity: frame >= relit ? 1 : 0}}>
          <Loupe w={170} />
        </div>
        {/* Son libellé, sur « récupère ». */}
        <Pop at={recup} style={{position: 'absolute', left: 560, top: 540}}>
          <Mono size={52} color="#f0a040">récupéré</Mono>
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 7. Chute : la porte se ferme sur « hook », voyant vert, la rame part ; l'affiche des consignes reste ----------

const Chute: React.FC = () => {
  const frame = useCurrentFrame();
  const hook = at('chute', 'hook');
  const consignes = at('chute', 'consignes');
  // La porte se ferme sur « hook », le voyant passe au vert, puis la rame part (démarrage et sortie en douceur).
  const g = ease(frame, hook, hook + 12, [GAP, 0], 'inOut');
  const light = frame >= hook + 10 ? GREEN : withAlpha(RED, blink(frame));
  const go = ease(frame, hook + 22, hook + 130, [0, 1900], 'inOut');
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 640}}>
        {/* Le décor : le mur de la station et le quai. */}
        <Mur />
        {/* pop in : l'affiche des consignes, sur le mur que la rame découvre, sur « consignes ». */}
        <Pop at={consignes} style={{position: 'absolute', left: (W - 480) / 2, top: RT - 50}}>
          <ClaudeMd w={480} rule={1} />
        </Pop>
        <Quai />
        {/* La rame, à la même place que dans metro ; le passager et son copain sont montés. */}
        <div style={{position: 'absolute', left: -PAD + go, top: RT}}>
          <RameFond />
          <div style={{position: 'absolute', left: 891, top: 52, width: 108, height: 140, overflow: 'hidden', lineHeight: 0}}>
            <Pixel sprite={CONDUCTEUR} px={9} seed={2} />
          </div>
          <div style={{position: 'absolute', left: DC - 104, top: RH - 210, lineHeight: 0}}>
            <Pixel sprite={PASSAGER} px={15} seed={1} />
          </div>
          <div style={{position: 'absolute', left: DC - 30, top: RH - 168, lineHeight: 0}}>
            <Pixel sprite={COPAIN} px={12} seed={5} />
          </div>
          <div style={{position: 'absolute', left: 0, top: 0}}>
            <RameFace g={g} light={light} />
          </div>
        </div>
      </div>
    </Scene>
  );
};

// ---------- Montage ----------

const SCENES: Record<string, React.FC> = {hook: Hook, crochet: Crochet, intro: Intro, nom: Nom, metro: Metro, avant: Avant, date: DateScene, danger: Danger, chute: Chute};

export const HookVoix: React.FC = () => <V.Montage scenes={SCENES} accent={AC} />;

// Short Context rot (YouTube / TikTok / Instagram), épisode 21, voix off PAL - FR, préparé le 2026-10-22 sur un calage
// provisoire (sans voix) : tout est ancré sur des mots (at), rien en temps fixe.
// Fiche context-rot de lexique/terms.js ; sources dans voix/context-rot.script.json : Simon Willison citant Workaccount2
// sur Hacker News (18 juin 2025, naissance du mot) ; Anthropic, Effective context engineering (29 septembre 2025, budget
// d'attention) ; Du et al. (Illinois, Amazon, 6 octobre 2025 : cinq modèles, la baisse persiste avec des espaces) ;
// Chroma, Context Rot (14 juillet 2025 : Qwen3-8B qui veut une pause et aller à la plage, vers 5 000 mots répétés).
// Collages réels (crédits dans public/voix/CREDITS-semaine-27-10.md et `credits` du script) : le commentaire Hacker News
// où naît le mot, l'étude Illinois / Amazon sur arXiv, le rapport de Chroma (captures, citation).
// Image : Mourad, chef un samedi soir de coup de feu, et le rail à bons de son passe (scène inventée).
// Fil : l'ép. 20 montrait que la taille ne fait pas tout ; la longueur non plus.
// L'écran suit la voix et Le mouvement (univers.md) : chaque élément entre sur le mot qui le nomme ; effets nommés en
// commentaire ; pas de punch zoom (aucun chiffre ne porte une scène seul). Scène propre à ce short : le rail à bons.
// Écarts au storyboard : illinois, les barres descendent sur « baissaient » (et non « allongé », qui étire la question) ;
// plage, le compteur porte le libellé « mots » (le chiffre 5 000 est déjà écrit), l'étiquette dit « Alibaba » (ce que
// dit la voix) plutôt que Qwen3-8B, et la colonne de « pomme » devient des cases (le mot n'est pas dit) ; mourad, les
// quarante bons pendent sur deux rails, le bon « sans gluten » agrandi sort à gauche pour laisser voir Mourad.
// Texte dit retouché (plage) pour les coupures de sous-titres : « après cinq mille mots à recopier » (sans « une liste
// de », qui coupait « cinq | mille ») et « besoin de faire une pause » (au lieu de « besoin d'une | pause »).
import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Big, Dots, Draw, Highlight, Mono, Pop, Scene, W, countUp, ease, useAccent, withAlpha} from './kit';
import {LABEL, makeVoix} from './voix/VoixShort';
import {Pixel, Sprite} from './voix/Pixel';
import {Doc, Model, Msg, pixelShadow} from './voix/Parts';
import ALIGN from './voix/context-rot.align.json';
import SCRIPT from './voix/context-rot.script.json';

const AC = '#8FB8FF'; // catégorie Inférence
const V = makeVoix(ALIGN, SCRIPT, 'voix/prediction-music.mp3');
const {at} = V;
export const CONTEXTROTVOIX_DURATION = V.duration;

const gone = (frame: number, until: number) => ease(frame, until, until + 6, [1, 0], 'inOut');
const from2 = (f: number) => Math.max(2, f);
const rnd = (k: number) => {
  const x = Math.sin(k * 12.9898 + 7.233) * 43758.5453;
  return x - Math.floor(x);
};
const useLate = () => {
  const {durationInFrames} = useVideoConfig();
  return (f: number, room = 10) => Math.min(f, durationInFrames - room);
};
const BROWN = '#8a5a2b'; // le contexte qui s'abîme
const GREEN = '#7CFFB2';
const ORANGE = '#FFA94D';
const RED = '#FF4D4D';

// ---------- Personnage : Mourad, le chef (sprite propre à ce short, même format que voix/Pixel.tsx) ----------
// Toque, veste de chef croisée à boutons, barbe courte ; il cligne des yeux (Pixel), rien d'autre.
const MOURAD: Sprite = {
  rows: [
    '...TTTTTT...',
    '..TTTTTTTT..',
    '...TTTTTT...',
    '...HSSSSH...',
    '...SESSES...',
    '...SSSSSS...',
    '...SBBBBS...',
    '....SBBS....',
    '..WWWWWWWW..',
    '.WWWKWWKWWW.',
    '.WWWWWWWWWW.',
    '.SWWKWWKWWS.',
    '...WWWWWW...',
    '...DDDDDD...',
  ],
  palette: {T: '#f4f4f4', H: '#1e1e1e', S: '#c98d64', E: '#111', B: '#2a1d14', W: '#eaeaea', K: '#8a8a8a', D: '#3a3a3a'},
};

// Le parasol de la plage.
const PARASOL: Sprite = {
  rows: [
    '...RRWWRR...',
    '.RRWWRRWWRR.',
    'RWWRRWWRRWWR',
    '.....PP.....',
    '.....PP.....',
    '.....PP.....',
    '.....PP.....',
    '..YYYYYYYY..',
  ],
  palette: {R: '#e74c3c', W: '#f2f2f2', P: '#8a5a35', Y: '#e8cf8a'},
};

// ---------- Pièces dessinées ----------

const Tape: React.FC<{style: React.CSSProperties}> = ({style}) => (
  <div style={{position: 'absolute', width: 64, height: 22, background: 'rgba(239,233,220,0.8)', ...style}} />
);

// Collage (univers.md) : une capture recadrée (crop en pixels de l'image source), bordure blanche, ombre pixel, scotch.
type Crop = {src: string; iw: number; x: number; y: number; cw: number; ch: number};
const Collage: React.FC<{c: Crop; w: number; children?: (k: number) => React.ReactNode}> = ({c, w, children}) => {
  const k = w / c.cw;
  return (
    <div style={{position: 'relative', width: w, height: c.ch * k, border: '4px solid #fff', boxShadow: pixelShadow('#333')}}>
      <div style={{position: 'absolute', inset: 0, overflow: 'hidden'}}>
        <Img src={staticFile(c.src)} style={{position: 'absolute', left: -c.x * k, top: -c.y * k, width: c.iw * k}} />
        {children ? children(k) : null}
      </div>
      <Tape style={{left: -22, top: -8, transform: 'rotate(-30deg)'}} />
      <Tape style={{right: -22, bottom: -8, transform: 'rotate(-30deg)'}} />
    </div>
  );
};
const HN: Crop = {src: 'voix/context-rot-hn.png', iw: 1000, x: 0, y: 0, cw: 920, ch: 200};
const ILLINOIS: Crop = {src: 'voix/context-rot-illinois.png', iw: 1000, x: 0, y: 100, cw: 1000, ch: 150};
const CHROMA: Crop = {src: 'voix/context-rot-chroma.png', iw: 1000, x: 110, y: 195, cw: 780, ch: 232};

// Une bulle de conversation réduite à des traits ; `rot` (0 -> 1) la fait brunir.
const RotMsg: React.FC<{w: number; right?: boolean; rot?: number; hot?: number}> = ({w, right, rot = 0, hot = 0}) => {
  const accent = useAccent();
  const line = rot > 0 ? `color-mix(in srgb, ${BROWN} ${Math.round(rot * 100)}%, #5a5a5a)` : '#5a5a5a';
  return (
    <div style={{alignSelf: right ? 'flex-end' : 'flex-start', width: w, height: 70, background: right ? (rot > 0 ? `color-mix(in srgb, #4a3220 ${Math.round(rot * 100)}%, #2a2a2a)` : '#2a2a2a') : 'transparent', border: right ? (hot > 0.5 ? `5px solid ${accent}` : 'none') : `4px solid ${hot > 0.5 ? accent : rot > 0.5 ? '#5e4228' : '#444'}`, borderRadius: 24, padding: '16px 22px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 10}}>
      <div style={{height: 11, width: '90%', background: line}} />
      <div style={{height: 11, width: '60%', background: line}} />
    </div>
  );
};

// ---------- 0. Hook : « C'est quoi ? le context rot », sur un ruban de conversation qui s'abîme par le bas ----------

const Ribbon: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: 96, right: 96, top: 0, transform: `translateY(${-frame * 1.2}px)`, display: 'flex', flexDirection: 'column', gap: 18, opacity: 0.35}}>
        {Array.from({length: 26}, (_, k) => <Msg key={k} w={[560, 420, 640, 380, 500][k % 5]} right={k % 2 === 0} />)}
      </div>
      {/* Le bas du ruban tache de brun, comme un fruit qui s'abîme. */}
      <div style={{position: 'absolute', inset: 0, background: `linear-gradient(transparent 40%, ${withAlpha(BROWN, 0.35)} 70%, ${withAlpha('#4a2c12', 0.75)})`}} />
      <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 75% 30% at 50% 50%, rgba(0,0,0,0.8), transparent)'}} />
    </AbsoluteFill>
  );
};

const Hook: React.FC = () => (
  <>
    <Ribbon />
    <V.TitleHook lead="C'est quoi ?" lines={['le context rot']} cue="context" />
  </>
);

// ---------- 1. Intro : les trois quarts de la fenêtre libres, et la qualité baisse déjà ----------

const qualityY = (x: number) => {
  // haute au début, elle pique du nez à partir du quart de la fenêtre
  const t = Math.min(1, Math.max(0, (x - 0.15) / 0.4));
  return 40 + 230 * t * t * (3 - 2 * t);
};

const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const late = useLate();
  const trois = at('intro', 'trois');
  const qualite = at('intro', 'qualité');
  const allonge = at('intro', "s'allonge");
  const pleine = late(at('intro', 'pleine'), 8);
  // La jauge se remplit lentement (du quart à la moitié) de « s'allonge » à « pleine ».
  const fill = 0.25 + ease(frame, allonge, pleine, [0, 0.25], 'inOut');
  const curveP = ease(frame, qualite, qualite + 12);
  const blinkOn = frame >= trois + 4 && frame < trois + 16;
  const N = 60;
  const pts: string[] = [];
  for (let i = 0; i <= N; i++) {
    const x = (i / N) * fill * curveP;
    pts.push(`${(x * W).toFixed(1)},${qualityY(x).toFixed(1)}`);
  }
  const last = fill * curveP;
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 560}}>
        {/* La courbe de qualité, au-dessus de la jauge, sur « qualité » ; elle suit le remplissage. */}
        <svg width={W} height={320} viewBox={`0 0 ${W} 320`} style={{position: 'absolute', left: 0, top: 0, opacity: frame >= qualite ? 1 : 0, overflow: 'visible'}}>
          <polyline points={pts.join(' ')} fill="none" stroke={accent} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
          <circle cx={last * W} cy={qualityY(last)} r={14} fill={accent} />
        </svg>
        <Pop at={qualite + 5} style={{position: 'absolute', right: 0, top: 0}}><Mono size={52} color={accent}>qualité</Mono></Pop>
        {/* La jauge de la fenêtre, posée dès l'entrée, remplie au quart ; la partie vide clignote en vert sur « trois quarts ». */}
        <Pop at={2} style={{position: 'absolute', left: 0, top: 360, width: W, height: 110, border: '6px solid #fff', boxSizing: 'border-box'}}>
          <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: `${fill * 100}%`, background: accent}} />
          <div style={{position: 'absolute', left: `${fill * 100}%`, right: 0, top: 0, bottom: 0, background: blinkOn ? withAlpha(GREEN, 0.45) : 'transparent'}} />
        </Pop>
        <Pop at={6} style={{position: 'absolute', left: 0, top: 490}}><Mono size={52} color="#fff">fenêtre</Mono></Pop>
      </div>
    </Scene>
  );
};

// ---------- 2. Notion : la pile de la conversation, relue en entier par le modèle ----------

const PILE = [
  {w: 420, right: true},
  {w: 520, right: false},
  {w: 360, right: true},
  {w: 560, right: false},
  {w: 400, right: true},
  {w: 480, right: false},
];

const Notion: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const late = useLate();
  const contexte = at('notion', 'contexte');
  const tout = at('notion', 'tout');
  const modele = at('notion', 'modèle');
  const relit = at('notion', 'relit');
  const conversation = at('notion', 'conversation');
  const colle = late(at('notion', 'collé'), 12);
  const climb = ease(frame, conversation, conversation + 20);
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 700}}>
        {/* La pile, dans l'ordre de lecture : la première bulle sur « contexte », les autres en cascade sur « tout ». */}
        <div style={{position: 'absolute', left: 120, right: 0, top: 0, display: 'flex', flexDirection: 'column', gap: 10}}>
          {PILE.map((m, k) => (
            <Pop key={k} at={k === 0 ? from2(contexte) : tout + 3 * (k - 1)} style={{alignSelf: m.right ? 'flex-end' : 'flex-start'}}>
              <RotMsg w={m.w} right={m.right} hot={k === 0 ? (climb >= 1 ? 1 : 0) : 0} />
            </Pop>
          ))}
        </div>
        {/* Le trait remonte toute la pile jusqu'à la première bulle (draw-on), sur « conversation entière ». */}
        <svg width={60} height={480} viewBox="0 0 60 480" style={{position: 'absolute', left: 50, top: 0, opacity: frame >= conversation ? 1 : 0}}>
          <Draw d="M30 470 V14 M12 34 L30 12 L48 34" p={climb} width={8} len={520} color={accent} />
        </svg>
        {/* Deux documents collés au scotch au milieu de la pile, sur « collé ». */}
        {[0, 1].map((k) => (
          <Pop key={k} at={colle + 3 * k} style={{position: 'absolute', left: 200 + 250 * k, top: 150 + 30 * k, transform: `rotate(${k ? 5 : -6}deg)`}}>
            <div style={{position: 'relative'}}>
              <Doc w={170} lines={3} />
              <Tape style={{left: -16, top: -8, transform: 'rotate(-30deg)'}} />
              <Tape style={{right: -16, top: -8, transform: 'rotate(30deg)'}} />
            </div>
          </Pop>
        ))}
        <Pop at={colle + 8} style={{position: 'absolute', left: 660, top: 230}}><Mono size={52} color="#fff">collé</Mono></Pop>
        {/* Le modèle en bas, sur « modèle » ; il reçoit la pile d'un bloc sur « relit » (flèche, draw-on). */}
        <svg width={70} height={60} viewBox="0 0 70 60" style={{position: 'absolute', left: W / 2 - 35, top: 448, opacity: frame >= relit ? 1 : 0}}>
          <Draw d="M35 4 V52 M16 34 L35 54 L54 34" p={ease(frame, relit, relit + 8)} width={8} len={110} color="#fff" />
        </svg>
        <Pop at={modele} style={{position: 'absolute', left: W / 2 - 150, top: 515}}>
          <div style={{boxShadow: frame >= relit + 6 ? `0 0 40px ${withAlpha(accent, 0.5)}` : 'none'}}><Model w={300} /></div>
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 3. Nom : le pourrissement du contexte, context rot, un mot né sur un forum ----------

const Nom: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const pourr = at('nom', 'pourrissement');
  const du = at('nom', 'du');
  const rot = at('nom', 'rot');
  const juin = at('nom', 'juin');
  // Mask reveal de « context rot », de gauche à droite.
  const reveal = ease(frame, rot - 10, rot + 4);
  // Le fond de bulles s'efface quand le terme arrive : le titre et la capture se lisent sur du noir.
  const bg = 0.3 * (frame < pourr - 6 ? 1 : gone(frame, pourr - 6));
  return (
    <>
      {/* Décor d'entrée : la pile de la scène d'avant, qui grandit encore ; les plus anciennes bulles brunissent. */}
      <AbsoluteFill style={{top: 640, overflow: 'hidden', opacity: bg}}>
        <div style={{position: 'absolute', left: 96, right: 96, top: 0, transform: `translateY(${-frame * 1.4}px)`, display: 'flex', flexDirection: 'column', gap: 14}}>
          {Array.from({length: 14}, (_, k) => (
            <RotMsg key={k} w={[420, 520, 360, 560, 400, 480][k % 6]} right={k % 2 === 0} rot={ease(frame, 2 + 4 * k, 10 + 4 * k)} />
          ))}
        </div>
      </AbsoluteFill>
      <Scene gap={50}>
        <div style={{display: 'flex', flexDirection: 'column', gap: 4}}>
          <Pop at={from2(pourr)}><Big size={100}>le pourrissement</Big></Pop>
          <Pop at={du}><Big size={100}>du contexte</Big></Pop>
          <div style={{marginTop: 26, clipPath: `inset(0 ${(1 - reveal) * 100}% 0 0)`}}>
            <Big size={120} color={accent}>context rot</Big>
          </div>
        </div>
        {/* Collage : le commentaire Hacker News où naît le mot, collé au scotch sur « juin 2025 » ; « context rot » surligné. */}
        <Pop at={juin} style={{alignSelf: 'center', transform: 'rotate(-1.5deg)'}}>
          <Collage c={HN} w={W - 8}>
            {(k) => (
              <div style={{position: 'absolute', left: 451 * k, top: 104 * k, width: 114 * k, height: 28 * k, background: withAlpha(ORANGE, 0.5), transform: `scaleX(${ease(frame, juin + 8, juin + 20)})`, transformOrigin: 'left center', mixBlendMode: 'multiply'}} />
            )}
          </Collage>
        </Pop>
      </Scene>
    </>
  );
};

// ---------- Le passe de Mourad (scènes mourad et chute) ----------

// Deux rails de vingt bons chacun : on voit les bons un par un, et qu'il y en a beaucoup.
const RAILS = [30, 180];
const TK_W = 40;
const TK_H = 110;
const SINGLE = 10; // le bon seul, au milieu du rail du haut
const GLUTEN = 27; // sur le rail du bas
const tkX = (i: number) => 14 + (i % 20) * 44;
const tkY = (i: number) => RAILS[Math.floor(i / 20)] + 10;
const CAM = 300; // travelling sur « pas plein » : assez pour voir le bout vide des rails, pas assez pour perdre Mourad

const Ticket: React.FC = () => (
  <div style={{width: TK_W, height: TK_H, background: '#f3eee2', border: '3px solid #b9b1a1', boxSizing: 'border-box', padding: '12px 5px', display: 'flex', flexDirection: 'column', gap: 8, boxShadow: '3px 3px 0 #222'}}>
    {[80, 60, 90, 50, 70].map((w, k) => <div key={k} style={{height: 6, width: `${w}%`, background: '#8a8478'}} />)}
  </div>
);

// Décor du passe : le mur, Mourad, le comptoir inox, les rails. children : les bons.
const Pass: React.FC<{children?: React.ReactNode; cam?: number}> = ({children, cam = 0}) => (
  <div style={{position: 'absolute', inset: 0, transform: `translateX(${-cam}px)`}}>
    <div style={{position: 'absolute', left: -200, width: 1800, top: 0, height: 600, background: 'repeating-linear-gradient(90deg, #121212 0 58px, #1c1c1c 58px 60px), #121212', opacity: 0.9}} />
    <div style={{position: 'absolute', left: -200, width: 1800, top: 0, height: 600, background: 'repeating-linear-gradient(#0000 0 58px, #1c1c1c 58px 60px)'}} />
    {/* Mourad, derrière le comptoir. */}
    <div style={{position: 'absolute', left: 340, top: 316}}>
      <Pixel sprite={MOURAD} px={18} seed={1} />
    </div>
    <div style={{position: 'absolute', left: -200, width: 1800, top: 545, height: 60, background: 'linear-gradient(#cfd3d6, #8a9096)', borderTop: '6px solid #eef1f3'}} />
    {/* Les deux rails à bons, longs, métalliques. */}
    {RAILS.map((y) => (
      <div key={y} style={{position: 'absolute', left: -200, width: 1700, top: y, height: 16, background: 'linear-gradient(#e6e9eb, #8a9096)', boxShadow: '0 4px 0 #333'}} />
    ))}
    {children}
  </div>
);

const Mourad: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const seul = at('mourad', 'seul');
  const lit = at('mourad', 'lit');
  const quarante = at('mourad', 'quarante');
  const sans = at('mourad', 'sans');
  const echappe = at('mourad', 'échappe');
  const pas = at('mourad', 'pas');
  // Le bon seul s'agrandit pendant que Mourad le lit, puis rentre dans le rang quand les quarante arrivent.
  const big = ease(frame, seul + 6, lit + 6) * (1 - ease(frame, quarante - 4, quarante + 6, [0, 1], 'inOut'));
  // Le bon « sans gluten » sort du rang vers la gauche, puis s'y fond sur « échappe ».
  const gl = ease(frame, sans, sans + 8) * (1 - ease(frame, echappe, echappe + 10, [0, 1], 'inOut'));
  const cam = ease(frame, pas, pas + 22, [0, CAM], 'inOut');
  const CARD_X = 0;
  const CARD_Y = 120;
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 600}}>
        <Pass cam={cam}>
          {/* Quarante bons en cascade rapide sur « quarante », rail du haut puis rail du bas ; le bon seul déjà en place. */}
          {Array.from({length: 40}, (_, i) => {
            const a = i === SINGLE ? seul : quarante + Math.floor(i * 0.6);
            if (frame < a) return null;
            const p = ease(frame, a, a + 5);
            const s = i === SINGLE ? 1 + 1 * big : 1;
            return (
              <div key={i} style={{position: 'absolute', left: tkX(i), top: tkY(i) + (1 - p) * -24, opacity: p * (i === GLUTEN ? 1 - gl : 1), transform: `scale(${s})`, transformOrigin: 'top center', zIndex: i === SINGLE ? 50 : i}}>
                <Ticket />
              </div>
            );
          })}
        </Pass>
        {/* Le bon « sans gluten », agrandi à gauche (Mourad reste visible), entouré en rouge sans barrer le texte. */}
        <div style={{position: 'absolute', left: tkX(GLUTEN) + (CARD_X - tkX(GLUTEN)) * gl, top: tkY(GLUTEN) + (CARD_Y - tkY(GLUTEN)) * gl, width: 320, height: 320, transform: `scale(${0.15 + 0.85 * gl})`, transformOrigin: 'top left', opacity: gl > 0.02 ? 1 : 0, zIndex: 60}}>
          <div style={{position: 'relative', width: 320, height: 320, background: '#f3eee2', border: '4px solid #b9b1a1', boxSizing: 'border-box', boxShadow: pixelShadow('#222'), display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4}}>
            <Mono size={52} color="#111">sans</Mono>
            <Mono size={52} color="#111">gluten</Mono>
            <svg width={320} height={320} viewBox="0 0 320 320" style={{position: 'absolute', left: -4, top: -4}}>
              <Draw d="M160 34 C262 32 300 100 298 160 C296 236 220 290 160 288 C80 286 22 236 22 160 C22 92 80 40 170 36" p={ease(frame, sans + 6, sans + 18)} width={8} len={900} color={RED} />
            </svg>
          </div>
        </div>
        {/* Libellé tenu jusqu'à la fin de la scène, à droite, sous les rails. */}
        <Pop at={quarante + 25} style={{position: 'absolute', right: 0, top: 330}}>
          <Mono size={60} color={accent}>quarante</Mono>
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 4. Attention : le camembert se partage entre de plus en plus de parts ----------

const Attention: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const att = at('attention', 'attention');
  const page = at('attention', 'page');
  // Une part de plus toutes les 2 images à partir de « chaque page ajoutée » (cascade calée, linéaire), de 3 à 40.
  const n = Math.min(40, 3 + Math.max(0, Math.floor((frame - page) / 2)));
  const R = 260;
  const C = 280;
  const slices = Array.from({length: n}, (_, k) => {
    const a0 = (k / n) * Math.PI * 2 - Math.PI / 2;
    const a1 = ((k + 1) / n) * Math.PI * 2 - Math.PI / 2;
    const p = (a: number) => `${C + R * Math.cos(a)},${C + R * Math.sin(a)}`;
    const fill = k === 0 ? ORANGE : k === n - 1 && frame >= page ? accent : ['#4a4a4a', '#6a6a6a', '#5a5a5a'][k % 3];
    return <path key={k} d={`M${C},${C} L${p(a0)} A${R},${R} 0 0 1 ${p(a1)} Z`} fill={fill} stroke="#000" strokeWidth={n > 20 ? 2 : 5} />;
  });
  return (
    <Scene>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30}}>
        {/* Le camembert plein, posé dès l'entrée ; la part orange s'amincit jusqu'à un fil. */}
        <Pop at={2}>
          <svg width={2 * C} height={2 * C} viewBox={`0 0 ${2 * C} ${2 * C}`}>{slices}</svg>
        </Pop>
        <Pop at={att + 5}><Mono size={56} color="#fff">attention</Mono></Pop>
      </div>
    </Scene>
  );
};

// ---------- 5. Illinois : l'étude ; la question s'allonge, les scores des cinq modèles baissent, même avec des espaces ----------

const DROP = [0.86, 0.5, 0.3, 0.68, 0.15]; // de 13,9 % à 85 % de baisse
const BAR_H = 360;

const Illinois: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const late = useLate();
  const illinois = at('illinois', 'Illinois');
  const allonge = at('illinois', 'allongé');
  const cinq = at('illinois', 'cinq');
  const baissaient = at('illinois', 'baissaient');
  const espaces = late(at('illinois', 'espaces'), 14);
  // La question s'étire en largeur sur « allongé » (de 6 à 20 cases).
  const stretch = ease(frame, allonge, allonge + 14, [0, 1], 'inOut');
  const nCells = 6 + Math.round(14 * stretch);
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 620}}>
        {/* La question : une bulle de cases-lettres, posée dès l'entrée. */}
        <Pop at={2} style={{position: 'absolute', left: 0, top: 0, width: 260 + (W - 260) * stretch, height: 110, border: '5px solid #fff', borderRadius: 30, boxSizing: 'border-box', padding: '0 24px', display: 'flex', alignItems: 'center', gap: 8, overflow: 'hidden'}}>
          {Array.from({length: nCells}, (_, k) => {
            const emptyP = k >= 6 ? ease(frame, espaces + Math.floor((k - 6) / 2), espaces + Math.floor((k - 6) / 2) + 4) : 0;
            return <div key={k} style={{flexShrink: 0, width: 30, height: 46, boxSizing: 'border-box', background: emptyP > 0.5 ? 'transparent' : '#cfcfcf', border: emptyP > 0.5 ? '4px solid #fff' : 'none'}} />;
          })}
          <Mono size={60} color="#fff">?</Mono>
        </Pop>
        {/* Cinq barres de score hautes, posées ; elles descendent en cascade sur « baissaient » (le contour garde la hauteur de départ). */}
        <div style={{position: 'absolute', left: 60, right: 60, top: 170, height: BAR_H, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between'}}>
          {DROP.map((d, k) => {
            const h = 1 - (1 - d) * ease(frame, baissaient + 3 * k, baissaient + 3 * k + 12);
            return (
              <Pop key={k} at={2 + 2 * k} style={{position: 'relative', width: 110, height: BAR_H}}>
                <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: BAR_H, border: '4px dashed #555', boxSizing: 'border-box', opacity: frame >= baissaient ? 1 : 0}} />
                <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: BAR_H * h, background: accent}} />
              </Pop>
            );
          })}
        </div>
        <Pop at={cinq + 5} style={{position: 'absolute', left: 0, right: 0, top: 560, display: 'flex', justifyContent: 'center'}}>
          <Mono size={52} color="#fff">cinq modèles</Mono>
        </Pop>
        {/* Collage : l'étude sur arXiv, sur « l'Illinois » ; elle part quand la question s'allonge. */}
        <div style={{position: 'absolute', left: 0, top: 150, zIndex: 5, opacity: frame < allonge ? 1 : gone(frame, allonge)}}>
          <Pop at={illinois}><Collage c={ILLINOIS} w={W - 8} /></Pop>
        </div>
      </div>
    </Scene>
  );
};

// ---------- 6. Plage : le rapport de Chroma ; cinq mille mots à recopier, et le modèle qui demande une pause ----------

const Plage: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const late = useLate();
  const juillet = at('plage', 'juillet');
  const cinq = at('plage', 'cinq');
  const mots = at('plage', 'mots');
  const alibaba = at('plage', 'Alibaba');
  const pause = at('plage', 'pause');
  const plage = late(at('plage', 'plage'), 12);
  const drop = ease(frame, plage, plage + 8);
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 690}}>
        {/* Le message à recopier, déjà là : des rangées de mots identiques (des cases) qui défilent (défilement continu, linéaire). */}
        <Pop at={2} style={{position: 'absolute', right: 0, top: 280, width: 500, height: 230, background: '#2a2a2a', borderRadius: 34, overflow: 'hidden'}}>
          <div style={{position: 'absolute', left: 36, top: 24, transform: `translateY(${-((frame * 2) % 58)}px)`, display: 'flex', flexDirection: 'column', gap: 24}}>
            {Array.from({length: 8}, (_, k) => (
              <div key={k} style={{display: 'flex', gap: 18}}>
                {[0, 1, 2].map((j) => <div key={j} style={{width: 124, height: 34, borderRadius: 8, background: '#9a9a9a'}} />)}
              </div>
            ))}
          </div>
          <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 60, background: 'linear-gradient(#2a2a2a, transparent)'}} />
          <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 60, background: 'linear-gradient(transparent, #2a2a2a)'}} />
        </Pop>
        {/* Le compteur : count-up jusqu'à 5 000 sur « cinq mille mots ». */}
        <div style={{position: 'absolute', left: 0, top: 280, width: 330, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, opacity: frame >= cinq ? 1 : 0}}>
          <Mono size={84} color={accent}>{countUp(frame, cinq, 5000, Math.max(12, mots - cinq + 6))}</Mono>
          <Pop at={mots + 4}><Mono size={52} color="#fff">mots</Mono></Pop>
        </div>
        {/* L'étiquette du modèle se pose sur la bulle de réponse, vide, sur « Alibaba ». */}
        <Pop at={alibaba} style={{position: 'absolute', left: 0, top: 480, border: `5px solid ${accent}`, borderRadius: 12, padding: '6px 18px', background: '#141414', zIndex: 2}}>
          <Mono size={52} color={accent}>Alibaba</Mono>
        </Pop>
        <Pop at={2} style={{position: 'absolute', left: 0, top: 550, width: 660, height: 140, background: '#3a3a3a', borderRadius: 34, display: 'flex', alignItems: 'center', gap: 18, padding: '0 34px', boxSizing: 'border-box'}}>
          {frame < pause ? (
            <Dots />
          ) : (
            <>
              {/* La réponse arrive : seul « pause » est lisible, surligné. */}
              <div style={{width: 120, height: 14, background: '#777'}} />
              <Mono size={60} color="#fff"><Highlight at={pause + 4}>pause</Highlight></Mono>
              <div style={{width: 150, height: 14, background: '#777'}} />
            </>
          )}
        </Pop>
        {/* Le parasol se plante au bout de la bulle, sur « plage ». */}
        <div style={{position: 'absolute', left: 690, top: 500 - 60 * (1 - drop), opacity: frame >= plage ? 1 : 0}}>
          <Pixel sprite={PARASOL} px={14} />
        </div>
        {/* Collage : le rapport de Chroma, sur « juillet 2025 », en haut ; il part quand le modèle d'Alibaba est nommé. */}
        <div style={{position: 'absolute', left: 0, top: 0, zIndex: 5, opacity: frame < alibaba ? 1 : gone(frame, alibaba)}}>
          <Pop at={from2(juillet)}><Collage c={CHROMA} w={W - 8} /></Pop>
        </div>
      </div>
    </Scene>
  );
};

// ---------- 7. Chute : vide le rail, et repars avec un seul bon ----------

const Chute: React.FC = () => {
  const frame = useCurrentFrame();
  const vide = at('chute', 'vide');
  const seul = at('chute', 'seul');
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 600}}>
        <Pass>
          {/* Les quarante bons, posés ; ils tombent d'un coup sur « vide le rail » (sortie rapide). */}
          {Array.from({length: 40}, (_, i) => {
            const a = vide + Math.floor(rnd(i) * 3);
            const f = ease(frame, a, a + 8, [0, 1], 'inOut');
            if (f >= 1) return null;
            return (
              <div key={i} style={{position: 'absolute', left: tkX(i), top: tkY(i) + 700 * f * f, opacity: 1 - f, transform: `rotate(${(rnd(i + 5) - 0.5) * 60 * f}deg)`, zIndex: i}}>
                <Ticket />
              </div>
            );
          })}
          {/* Un seul bon s'accroche au milieu du rail du haut, sur « un seul bon », et Mourad le lit (il s'agrandit, sans toucher la toque). */}
          <div style={{position: 'absolute', left: tkX(SINGLE), top: tkY(SINGLE), opacity: ease(frame, seul, seul + 5), transform: `translateY(${(1 - ease(frame, seul, seul + 5)) * -30}px) scale(${1 + 0.9 * ease(frame, seul + 6, seul + 20)})`, transformOrigin: 'top center', zIndex: 50}}>
            <Ticket />
          </div>
        </Pass>
      </div>
    </Scene>
  );
};

// ---------- Montage ----------

const SCENES: Record<string, React.FC> = {hook: Hook, intro: Intro, notion: Notion, nom: Nom, mourad: Mourad, attention: Attention, illinois: Illinois, plage: Plage, chute: Chute};

export const ContextRotVoix: React.FC = () => <V.Montage scenes={SCENES} accent={AC} />;

// Short AI brain fry (YouTube / TikTok / Instagram), épisode 18, définition, voix off PAL - FR, préparé le 2026-10-22
// (calage provisoire, sans voix). Fiche ai-brain-fry de lexique/terms.js ; sources dans voix/brain-fry.script.json :
// Bedard et al. (BCG), When Using AI Leads to « Brain Fry », Harvard Business Review, 5 mars 2026 (bourdonnement,
// brouillard, décisions plus lentes ; productivité ressentie qui plafonne à trois outils et baisse au-delà de quatre ;
// 39 % d'erreurs graves en plus ; épuisement plus faible quand l'IA prend les tâches répétitives) ; Anthropic,
// How employment is changing at Anthropic, 16 octobre 2026 (environ 80 % du temps de session à attendre un humain) ;
// l'image de Fabrice le maître-nageur.
// Fil : l'ép. 17 demandait si un benchmark mesure ton travail ; voilà ce que plusieurs agents à la fois font à ta tête.
// Le schéma de la fiche (lexique/schemas/ai-brain-fry.svg) sert de base aux scènes attente et bascule : quatre lignes
// d'agents qui avancent puis attendent, et ta ligne qui saute de l'un à l'autre.
// Ce que la voix ne dit pas ne s'écrit pas : ni « 1 488 salariés », ni « −15 % », ni « travaille » ; les libellés
// reprennent « avance », « attend », « moins épuisés ». Collages réels (crédits dans le script et
// public/voix/CREDITS-semaine-27-10.md) : l'article HBR sur « BCG », l'étude Anthropic sur « Anthropic ».
// L'écran suit la voix et Le mouvement (univers.md) : chaque élément entre sur le mot qui le nomme (at), easing du kit,
// arcs pour ce qui vole, un seul punch zoom (sur 80 %), italique d'accent seulement au hook et sur le terme (scène nom).
import React from 'react';
import {Img, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Big, Draw, Eye, Mono, Pop, Scene, W, arc, clamp, countUp, ease, punch, useAccent} from './kit';
import {LABEL, makeVoix} from './voix/VoixShort';
import {Pixel, type Sprite} from './voix/Pixel';
import {Cross, pixelShadow} from './voix/Parts';
import ALIGN from './voix/brain-fry.align.json';
import SCRIPT from './voix/brain-fry.script.json';

const AC = '#5FD3C6'; // catégorie Méthode (couleur de terms.js, aucune composition à voix off ne l'avait encore)
const V = makeVoix(ALIGN, SCRIPT, 'voix/prediction-music.mp3');
const {at} = V;
export const AIBRAINFRYVOIX_DURATION = V.duration;

const RED = '#FF4D4D';
const GREY = '#5a5a5a';
const gone = (frame: number, until: number) => ease(frame, until, until + 6, [1, 0], 'inOut');
// n instants répartis entre deux mots : jamais de pas fixe en images, la vraie voix changera les écarts.
const spread = (a: number, b: number, n: number) => Array.from({length: n}, (_, k) => Math.round(a + ((b - a) * k) / Math.max(1, n - 1)));

// ---------- Personnages (pixel art, même format que voix/Pixel.tsx) ----------

const SKIN = '#e3b58e';
const FAB_PAL = {H: '#5a3a22', S: SKIN, E: '#111', M: '#b5524f', R: '#d93a3a', W: '#f2f2f2', Y: '#e8c45a', B: '#2f2f2f', T: '#f2f2f2', K: '#5b9bd5'};
const fabrice = (eyes: string, shoulder = false): Sprite => ({
  rows: [
    '....HHHH....',
    '...HHHHHH...',
    '...SSSSSS...',
    eyes,
    '...SSSSSS...',
    '...SSMMSS...',
    '....SSSS....',
    shoulder ? '.TTRRWWRRR..' : '..RRRWWRRR..',
    shoulder ? '.TKRRRWRRRR.' : '.RRRRRWRRRR.',
    shoulder ? '.TTRRRYRRRR.' : '.RRRRRYRRRR.',
    shoulder ? '.TKRRRRRRRS.' : '.SRRRRRRRRS.',
    '.SRRRRRRRRS.',
    '...BBBBBB...',
    '...SS..SS...',
  ],
  palette: FAB_PAL,
});
// Fabrice, le maître-nageur : t-shirt rouge, sifflet au cou ; ses yeux suivent le bassin qu'il surveille.
const FAB_L = fabrice('...ESSESS...');
const FAB_R = fabrice('...SSESSE...');
// En chute : la serviette sur l'épaule.
const FAB_CALME_L = fabrice('...ESSESS...', true);
const FAB_CALME_R = fabrice('...SSESSE...', true);

// La serviette qui lui tombe sur la tête (rayée de bleu).
const SERVIETTE: Sprite = {
  rows: ['..TTTTTT..', '.TTTTTTTT.', 'TTTTTTTTTT', 'KKKKKKKKKK', 'TT......TT', 'TT......TT', 'KK......KK', 'TT......TT', 'TT......TT', 'TT......TT', 'F.F....F.F'],
  palette: {T: '#f2f2f2', K: '#5b9bd5', F: '#cfcfcf', S: '#f2f2f2'},
};

// Un nageur vu de dessus, qui nage vers la droite (bonnet, bras).
const NAGEUR_DESSUS = (cap: string): Sprite => ({
  rows: ['...S...S..', '.BBBBBBCC.', '.BBBBBBCC.', '...S...S..'],
  palette: {S: SKIN, B: '#1f3550', C: cap},
});
const CAPS = ['#e8c45a', '#f2f2f2', '#e07b39', '#d97a93', '#7CFFB2'];

// Un nageur du club, de face, qui sort de l'eau frais comme un gardon.
const club = (cap: string): Sprite => ({
  rows: [
    '....CCCC....',
    '...CCCCCC...',
    '...SSSSSS...',
    '...SESSES...',
    '...SSSSSS...',
    '...SSRRSS...',
    '....SSSS....',
    '..SSSSSSSS..',
    '.SSUUUUUUSS.',
    '.SSUUUUUUSS.',
    '.S.UUUUUU.S.',
    '...UUUUUU...',
    '...SS..SS...',
    '...SS..SS...',
  ],
  palette: {C: cap, S: SKIN, E: '#111', R: '#b5524f', U: '#1f3550'},
});

// ---------- Objets dessinés ----------

// Une fenêtre d'agent : barre de titre, deux lignes de texte, un curseur qui clignote.
const AgentWin: React.FC<{w: number; h: number; seed?: number}> = ({w, h, seed = 0}) => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const on = (frame + seed * 7) % 24 < 14;
  return (
    <div style={{width: w, height: h, background: '#151515', border: '5px solid #8a8a8a', boxShadow: pixelShadow('#2a2a2a'), boxSizing: 'border-box', display: 'flex', flexDirection: 'column'}}>
      <div style={{height: h * 0.17, background: '#2e2e2e', display: 'flex', alignItems: 'center', gap: w * 0.025, padding: `0 ${w * 0.04}px`}}>
        {[0, 1, 2].map((k) => <div key={k} style={{width: h * 0.07, height: h * 0.07, borderRadius: '50%', background: '#777'}} />)}
      </div>
      <div style={{flex: 1, padding: `${h * 0.1}px ${w * 0.07}px`, display: 'flex', flexDirection: 'column', gap: h * 0.08}}>
        <div style={{height: h * 0.07, width: `${[78, 64, 86, 70][seed % 4]}%`, background: '#555'}} />
        <div style={{height: h * 0.07, width: `${[52, 70, 44, 60][seed % 4]}%`, background: '#555'}} />
        <div style={{display: 'flex', alignItems: 'center', gap: w * 0.03}}>
          <div style={{height: h * 0.07, width: w * 0.12, background: '#555'}} />
          <div style={{width: h * 0.08, height: h * 0.15, background: accent, opacity: on ? 1 : 0}} />
        </div>
      </div>
    </div>
  );
};

// Un bassin vu de dessus : carrelage, lignes d'eau, margelle ; `glow` = le bassin regardé.
const Pool: React.FC<{w: number; h: number; glow?: boolean; children?: React.ReactNode}> = ({w, h, glow, children}) => {
  const accent = useAccent();
  return (
    <div style={{position: 'relative', width: w, height: h, background: '#2a86c4', backgroundImage: 'repeating-linear-gradient(0deg, transparent 0 34px, rgba(255,255,255,0.13) 34px 37px), repeating-linear-gradient(90deg, transparent 0 34px, rgba(255,255,255,0.13) 34px 37px)', border: `9px solid ${glow ? accent : '#dfe9ef'}`, boxSizing: 'border-box', overflow: 'hidden'}}>
      {[1, 2, 3].map((k) => <div key={k} style={{position: 'absolute', left: 0, right: 0, top: `${k * 25}%`, height: 0, borderTop: '4px dashed #1a5f8f'}} />)}
      {children}
    </div>
  );
};

// Un nageur qui fait des longueurs (défilement continu, linéaire), dans la ligne `lane`.
const Swimmer: React.FC<{w: number; h: number; lane: number; phase: number; cap: string; speed?: number}> = ({w, h, lane, phase, cap, speed = 1}) => {
  const frame = useCurrentFrame();
  const run = w - 18 - 120;
  const t = ((frame * 3 * speed + phase) % (2 * run) + 2 * run) % (2 * run);
  const right = t < run;
  const x = right ? t : 2 * run - t;
  return (
    <div style={{position: 'absolute', left: x, top: (h - 18) * (lane / 4) + (h - 18) / 8 - 24, lineHeight: 0, transform: right ? 'none' : 'scaleX(-1)'}}>
      <Pixel sprite={NAGEUR_DESSUS(cap)} px={12} />
    </div>
  );
};

// La chaise haute du maître-nageur.
const Chair: React.FC<{w: number; h: number}> = ({w, h}) => (
  <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
    <rect x={8} y={0} width={w - 16} height={16} fill="#dfe9ef" />
    <path d={`M20 16 L8 ${h} M${w - 20} 16 L${w - 8} ${h}`} stroke="#dfe9ef" strokeWidth="12" />
    {[0.35, 0.65].map((f) => <line key={f} x1={14} y1={16 + (h - 16) * f} x2={w - 14} y2={16 + (h - 16) * f} stroke="#dfe9ef" strokeWidth="8" />)}
  </svg>
);

// La piscine municipale : quatre bassins, Fabrice au milieu sur sa chaise haute.
const PW = 360;
const PH = 250;
const POOLS: [number, number][] = [[0, 0], [W - PW, 0], [0, 300], [W - PW, 300]];
const FAB = {x: 372, y: 140, px: 12};
const EYES: [number, number] = [FAB.x + 6 * FAB.px, FAB.y + 3.5 * FAB.px];
const poolCenter = (k: number): [number, number] => [POOLS[k][0] + PW / 2, POOLS[k][1] + PH / 2];

// Le regard de Fabrice : un trait pointillé vers le bassin surveillé.
const Gaze: React.FC<{k: number; opacity?: number}> = ({k, opacity = 1}) => {
  const accent = useAccent();
  const [x, y] = poolCenter(k);
  return (
    <svg width={W} height={560} viewBox={`0 0 ${W} 560`} style={{position: 'absolute', left: 0, top: 0, opacity}}>
      <line x1={EYES[0]} y1={EYES[1]} x2={x} y2={y} stroke={accent} strokeWidth="6" strokeDasharray="14 10" strokeLinecap="round" />
    </svg>
  );
};

// Deux icônes maison : un éclair (le saut d'un agent à l'autre), un dossier.
const Bolt: React.FC<{w: number; color?: string}> = ({w, color = RED}) => (
  <svg width={w} height={w * 1.4} viewBox="0 0 50 70">
    <polygon points="30,0 6,40 24,40 18,70 44,26 26,26" fill={color} />
  </svg>
);
const Folder: React.FC<{w: number; h: number}> = ({w, h}) => (
  <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
    <path d={`M0 8 H${w * 0.3} L${w * 0.36} 0 H${w * 0.6} V8 H${w} V${h} H0 Z`} fill="#d9b46a" stroke="#8a6a2a" strokeWidth="4" />
  </svg>
);

// Collage (univers.md, « illustrer plutôt qu'étiqueter ») : la vraie capture, recadrée sur `crop` (en pixels de la
// source, large de `sw`), bordure blanche, ombre pixel, scotch aux coins ; `tilt` posé sur le cadre (Pop écrase transform).
const Collage: React.FC<{src: string; sw: number; crop: [number, number, number, number]; w: number; tilt?: number}> = ({src, sw, crop: [cx, cy, cw, ch], w, tilt = 0}) => {
  const k = w / cw;
  return (
    <div style={{position: 'relative', transform: `rotate(${tilt}deg)`}}>
      <div style={{position: 'relative', width: w, height: ch * k, border: '5px solid #fff', boxShadow: pixelShadow('#333'), overflow: 'hidden', background: '#fff'}}>
        <Img src={staticFile(src)} style={{position: 'absolute', left: -cx * k, top: -cy * k, width: sw * k}} />
      </div>
      <div style={{position: 'absolute', left: -18, top: -10, width: 80, height: 26, background: 'rgba(239,233,220,0.85)', transform: 'rotate(-30deg)'}} />
      <div style={{position: 'absolute', right: -18, bottom: -10, width: 80, height: 26, background: 'rgba(239,233,220,0.85)', transform: 'rotate(-30deg)'}} />
    </div>
  );
};

// ---------- 0. Hook : le titre, et quatre fenêtres d'agent empilées de travers derrière ----------

const HOOK_WINS: [number, number, number][] = [[70, 250, -7], [640, 300, 6], [90, 1330, 5], [650, 1300, -5]];

const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  // Même entrée / sortie que la Scene du titre, pour que les fenêtres partent avec lui.
  const op = interpolate(frame, [0, 6], [0, 1], clamp) * (1 - interpolate(frame, [durationInFrames - 5, durationInFrames], [0, 1], clamp));
  return (
    <>
      <div style={{position: 'absolute', inset: 0, opacity: op * 0.55}}>
        {HOOK_WINS.map(([x, y, r], k) => (
          <div key={k} style={{position: 'absolute', left: x, top: y, transform: `rotate(${r}deg)`}}>
            <AgentWin w={320} h={210} seed={k} />
          </div>
        ))}
      </div>
      <V.TitleHook lead="C'est quoi ?" lines={["l'AI brain fry"]} cue="l'AI" />
    </>
  );
};

// ---------- 1. Intro : les fenêtres qui se multiplient, l'enquête du BCG, trois symptômes ----------

const WIN = {w: 270, h: 170};
// Grille centrée : deux colonnes pour quatre fenêtres, trois colonnes dès la cinquième.
const layout = (n: number, k: number): [number, number] => {
  const cols = n <= 4 ? 2 : 3;
  const total = cols * WIN.w + (cols - 1) * 39;
  return [(W - total) / 2 + (k % cols) * (WIN.w + 39), 70 + Math.floor(k / cols) * 220];
};
const mix = (a: [number, number], b: [number, number], p: number): [number, number] => [a[0] + (b[0] - a[0]) * p, a[1] + (b[1] - a[1]) * p];

// Les symptômes, sans libellé (le sous-titre les dit) : une tête de profil qui bourdonne, un nuage, un sablier.
const Buzz: React.FC<{w: number}> = ({w}) => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  return (
    <svg width={w} height={w} viewBox="0 0 100 100">
      {/* tête de profil tournée vers la droite : crâne, front, nez, menton, cou */}
      <path d="M38 92 V76 Q26 68 27 50 Q28 22 52 18 Q72 16 76 38 L84 52 L76 55 Q78 65 70 68 Q63 69 62 74 V92" fill="#2a2a2a" stroke="#fff" strokeWidth="4" strokeLinejoin="round" />
      <circle cx="64" cy="40" r="3.5" fill="#fff" />
      {[0, 1, 2].map((k) => {
        const o = 0.25 + 0.75 * (((frame + k * 5) % 15) / 15);
        return <path key={k} d={`M${20 - k * 7} ${28 - k * 5} Q${8 - k * 7} 50 ${20 - k * 7} ${72 + k * 5}`} fill="none" stroke={accent} strokeWidth="4" strokeLinecap="round" opacity={o} />;
      })}
    </svg>
  );
};
const Fog: React.FC<{w: number}> = ({w}) => {
  const frame = useCurrentFrame();
  const dx = Math.sin(frame / 12) * 4;
  return (
    <svg width={w} height={w} viewBox="0 0 100 100">
      <g transform={`translate(${dx} 0)`} fill="#9a9a9a">
        <circle cx="34" cy="56" r="18" />
        <circle cx="54" cy="44" r="22" />
        <circle cx="72" cy="58" r="16" />
        <rect x="18" y="56" width="70" height="18" rx="9" />
      </g>
      <g transform={`translate(${-dx} 0)`} stroke="#9a9a9a" strokeWidth="4" strokeLinecap="round">
        <line x1="14" y1="84" x2="60" y2="84" />
        <line x1="40" y1="92" x2="88" y2="92" />
      </g>
    </svg>
  );
};
const Hourglass: React.FC<{w: number; p: number}> = ({w, p}) => {
  const accent = useAccent();
  return (
    <svg width={w} height={w} viewBox="0 0 100 100">
      <polygon points={`32,${18 + 28 * p} 68,${18 + 28 * p} 50,46`} fill={accent} />
      <polygon points={`50,${84 - 30 * p} ${50 + 18 * p + 4},84 ${50 - 18 * p - 4},84`} fill={accent} />
      <line x1="50" y1="46" x2="50" y2="84" stroke={accent} strokeWidth="2" strokeDasharray="3 4" />
      <path d="M26 12 H74 M26 88 H74 M30 12 L50 48 L30 88 M70 12 L50 48 L70 88" fill="none" stroke="#fff" strokeWidth="5" strokeLinejoin="round" />
    </svg>
  );
};

const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const plus2 = at('intro', 'plus', 1);
  const avances = at('intro', 'avances');
  const bcg = at('intro', 'BCG');
  const bourdon = at('intro', 'bourdonnement');
  const brouillard = at('intro', 'brouillard');
  const decisions = at('intro', 'décisions');
  const appear = [2, 3, 4, 5, plus2, avances];
  const p5 = ease(frame, plus2, plus2 + 10, [0, 1], 'inOut');
  const p6 = ease(frame, avances, avances + 10, [0, 1], 'inOut');
  const pos = (k: number) => (k < 4 ? mix(mix(layout(4, k), layout(5, k), p5), layout(6, k), p6) : k === 4 ? mix(layout(5, k), layout(6, k), p6) : layout(6, k));
  const back = frame >= bcg ? ease(frame, bcg, bcg + 8, [1, 0.25], 'inOut') : 1;
  const out = gone(frame, bourdon - 4);
  // Une icône à la fois, au centre, chacune sur son mot ; la précédente s'efface quand la suivante arrive.
  const ICONS: [number, number, React.ReactNode][] = [
    [bourdon, brouillard, <Buzz w={340} />],
    [brouillard, decisions, <Fog w={340} />],
    [decisions, durationInFrames + 10, <Hourglass w={340} p={ease(frame, decisions, durationInFrames, [0, 1], 'inOut')} />],
  ];
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 640}}>
        {/* stagger : quatre fenêtres posées dès l'entrée, centrées ; la 5e sur « plus », la 6e sur « avances », la grille s'élargit. */}
        <div style={{position: 'absolute', inset: 0, opacity: back * out}}>
          {appear.map((t, k) => {
            const [x, y] = pos(k);
            return (
              <Pop key={k} at={t} style={{position: 'absolute', left: x, top: y}}>
                <AgentWin w={WIN.w} h={WIN.h} seed={k} />
              </Pop>
            );
          })}
        </div>
        {/* pop in : la vraie une de l'article HBR en collage, sur « BCG ». */}
        <div style={{position: 'absolute', left: (W - 840) / 2, top: 110, opacity: out}}>
          <Pop at={bcg}>
            <Collage src="voix/brain-fry-hbr.png" sw={1000} crop={[0, 0, 1000, 481]} w={840} tilt={-2} />
          </Pop>
        </div>
        {ICONS.map(([t, until, icon], k) => (
          <Pop key={k} at={t} style={{position: 'absolute', left: (W - 340) / 2, top: 120, lineHeight: 0, opacity: frame < until ? 1 : gone(frame, until)}}>
            {icon}
          </Pop>
        ))}
      </div>
    </Scene>
  );
};

// ---------- 2. Le nom : cerveau grillé, AI brain fry, et la poêle qui grésille ----------

const Pan: React.FC<{w: number}> = ({w}) => {
  const frame = useCurrentFrame();
  return (
    <svg width={w} height={w * 0.62} viewBox="0 0 400 250">
      {/* trois traits de fumée qui ondulent */}
      {[0, 1, 2].map((k) => {
        const y0 = 110 - ((frame * 1.5 + k * 20) % 60);
        return <path key={k} d={`M${150 + k * 45} ${y0} q-12 -16 0 -32 q12 -16 0 -32`} fill="none" stroke="#cfcfcf" strokeWidth="7" strokeLinecap="round" opacity={0.8 - ((frame * 1.5 + k * 20) % 60) / 90} />;
      })}
      <rect x="290" y="168" width="110" height="20" rx="8" fill="#555" />
      <ellipse cx="180" cy="180" rx="150" ry="48" fill="#2b2b2b" stroke="#8a8a8a" strokeWidth="8" />
      {/* le cerveau, rose, qui grésille un peu */}
      <g transform={`translate(${Math.sin(frame * 1.3) * 1.5} 0)`}>
        <ellipse cx="180" cy="162" rx="78" ry="34" fill="#e89aa8" stroke="#b5606f" strokeWidth="5" />
        <path d="M120 160 q15 -18 30 0 q15 18 30 0 q15 -18 30 0 q15 18 22 2" fill="none" stroke="#b5606f" strokeWidth="5" />
        <path d="M180 130 V194" stroke="#b5606f" strokeWidth="4" />
      </g>
    </svg>
  );
};

const Nom: React.FC = () => {
  const accent = useAccent();
  const cerveau = at('nom', 'cerveau');
  const ai = at('nom', "l'AI");
  return (
    <Scene gap={30}>
      {/* pop in : le terme français, puis l'anglais en couleur d'accent (sous-titre masqué par onscreen). */}
      <Pop at={cerveau} style={{display: 'flex', justifyContent: 'center'}}>
        <Big size={130}>cerveau grillé</Big>
      </Pop>
      <Pop at={ai} style={{display: 'flex', justifyContent: 'center'}}>
        <Big size={140} color={accent}>AI brain fry</Big>
      </Pop>
      {/* La poêle : le décor, posée dès l'entrée. */}
      <Pop at={2} style={{display: 'flex', justifyContent: 'center', lineHeight: 0, marginTop: 20}}>
        <Pan w={420} />
      </Pop>
    </Scene>
  );
};

// ---------- 3. L'image : Fabrice et ses quatre bassins ----------

// La piscine est décalée de OFF sous le badge « Fabrice », pour que le badge ne morde aucun bassin.
const OFF = 90;

// Les bassins et leurs nageurs (le décor de la piscine), avec un regard sur `look` (-1 : aucun).
const Piscine4: React.FC<{look: number; dim?: number[]; swimOut?: number[]; outOp?: number}> = ({look, dim = [], swimOut = [], outOp = 1}) => (
  <>
    {POOLS.map(([x, y], k) => (
      <div key={k} style={{position: 'absolute', left: x, top: y, opacity: dim.includes(k) ? 0.45 : 1}}>
        <Pool w={PW} h={PH} glow={look === k}>
          <div style={{opacity: swimOut.includes(k) ? outOp : 1}}>
            <Swimmer w={PW} h={PH} lane={1 + (k % 2)} phase={k * 97} cap={CAPS[k]} />
          </div>
        </Pool>
      </div>
    ))}
  </>
);

const Badge: React.FC<{at: number}> = ({at: a}) => (
  <Pop at={a} style={{position: 'absolute', left: W / 2 - 125, top: 0, background: '#000', padding: '4px 16px'}}>
    <Mono size={52} color="#fff">Fabrice</Mono>
  </Pop>
);

// Le club de natation : cinq nageurs qui sortent des bassins du bas et s'alignent, frais, sur la plage.
const CLUB_FROM: [number, number][] = [[40, 330], [190, 360], [560, 330], [700, 360], [110, 400]];

const Piscine: React.FC = () => {
  const frame = useCurrentFrame();
  const fab = at('piscine', 'Fabrice');
  const surveille = at('piscine', 'surveille');
  const quatre = at('piscine', 'quatre');
  const rince = at('piscine', 'rincé');
  const clubAt = at('piscine', 'club');
  // Le regard tourne d'un bassin à l'autre, de plus en plus vite, de « surveille » à « rincé » (écarts qui rétrécissent).
  const N = 16;
  const turns = Array.from({length: N}, (_, k) => Math.round(surveille + (rince - surveille) * Math.sqrt(k / N)));
  const ORDER4 = [0, 1, 3, 2];
  const idx = turns.filter((t) => frame >= t).length - 1;
  const look = idx >= 0 && frame < rince ? ORDER4[idx % 4] : -1;
  const sprite = look === 0 || look === 2 ? FAB_L : FAB_R;
  const towel = ease(frame, rince, rince + 12, [0, 1], 'inOut');
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: OFF + 700}}>
        <Badge at={fab + 5} />
        <div style={{position: 'absolute', left: 0, top: OFF, width: W, height: 700}}>
          {/* Les quatre bassins : le décor, posé dès l'entrée ; ils s'allument en cascade sur « quatre ». */}
          <Pop at={2} style={{position: 'absolute', inset: 0}}>
            <Piscine4 look={look} />
            {frame >= quatre && frame < quatre + 14
              ? POOLS.map(([x, y], k) => <div key={k} style={{position: 'absolute', left: x, top: y, width: PW, height: PH, border: `9px solid #fff`, boxSizing: 'border-box', opacity: frame >= quatre + k * 3 ? ease(frame, quatre + k * 3, quatre + 14, [1, 0]) : 0}} />)
              : null}
          </Pop>
          {look >= 0 ? <Gaze k={look} /> : null}
          {/* Fabrice sur sa chaise haute, sur « Fabrice » ; la serviette lui tombe sur la tête sur « rincé ». */}
          <Pop at={fab} style={{position: 'absolute', left: FAB.x, top: FAB.y, lineHeight: 0}}>
            <Pixel sprite={sprite} px={FAB.px} seed={2} />
            <div style={{position: 'absolute', left: 0, top: 14 * FAB.px - 6}}><Chair w={12 * FAB.px} h={260} /></div>
            {frame >= rince ? (
              <div style={{position: 'absolute', left: 1 * FAB.px, top: -200 + (200 - 2 * FAB.px) * towel, lineHeight: 0, transform: `rotate(${-8 * towel}deg)`}}>
                <Pixel sprite={SERVIETTE} px={FAB.px} />
              </div>
            ) : null}
          </Pop>
          {/* stagger + arcs : le club de natation sort de l'eau des bassins du bas et s'aligne, frais, sur la plage. */}
          {frame >= clubAt
            ? CLUB_FROM.map(([fx, fy], k) => {
                const p = ease(frame, clubAt + k * 3, clubAt + k * 3 + 16, [0, 1], 'inOut');
                const [x, y] = arc(p, [fx, fy], [40 + k * 165, 572], 40);
                return (
                  <div key={k} style={{position: 'absolute', left: x, top: y, lineHeight: 0, opacity: frame >= clubAt + k * 3 ? 1 : 0}}>
                    <Pixel sprite={club(CAPS[k])} px={9} seed={k} />
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </Scene>
  );
};

// ---------- 4. Attente : les bassins s'effacent, quatre lignes d'agents avancent un peu puis attendent ----------

const TR = {x: 235, w: W - 235, pitch: 90, h: 50};
const START = [0, 0.1, 0.2, 0.3];
const WORK = 0.14;

// Les quatre lignes de temps des agents ; `work` et `wait` vont de 0 à 1 (bar grow) ; `active` : la ligne où tu es.
const Tracks: React.FC<{show?: number[]; work: number[]; wait: number; active?: number}> = ({show = [1, 1, 1, 1], work, wait, active = -1}) => {
  const accent = useAccent();
  return (
    <>
      {[0, 1, 2, 3].map((k) => (
        <div key={k} style={{position: 'absolute', left: 0, top: k * TR.pitch, height: TR.h, width: W, opacity: show[k]}}>
          <div style={{position: 'absolute', left: 0, top: -4}}><Mono size={48} color={active === k ? accent : LABEL}>{`agent ${k + 1}`}</Mono></div>
          <div style={{position: 'absolute', left: TR.x, top: 0, width: TR.w, height: TR.h, outline: active === k ? `6px solid ${accent}` : '4px solid #444', outlineOffset: active === k ? 4 : 0}}>
            <div style={{position: 'absolute', left: `${START[k] * 100}%`, top: 0, bottom: 0, width: `${WORK * 100 * work[k]}%`, background: accent}} />
            <div style={{position: 'absolute', left: `${(START[k] + WORK) * 100}%`, top: 0, bottom: 0, width: `${(1 - START[k] - WORK) * 100 * wait}%`, background: GREY}} />
          </div>
        </div>
      ))}
    </>
  );
};

const Attente: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const agents = at('attente', 'agents');
  const avancent = at('attente', 'avancent');
  const attendent = at('attente', 'attend');
  const anthropic = at('attente', 'Anthropic');
  const n80 = at('attente', '80');
  const attendre = at('attente', 'attendre');
  // Les bassins de la scène d'avant, posés à l'entrée, s'effacent en cascade sur « agents » ; les lignes entrent ensuite.
  const show = [0, 1, 2, 3].map((k) => (frame >= agents + 14 + k * 3 ? ease(frame, agents + 14 + k * 3, agents + 22 + k * 3) : 0));
  const work = [0, 1, 2, 3].map((k) => ease(frame, avancent + k * 3, avancent + k * 3 + 12));
  const wait = ease(frame, attendent, attendent + 40, [0, 1], 'inOut');
  const COUNT = 36;
  const fill = ease(frame, n80, n80 + COUNT, [0, 0.8]);
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 720}}>
        {POOLS.map(([x, y], k) => (
          <div key={k} style={{position: 'absolute', left: x, top: OFF + y, opacity: gone(frame, agents + k * 3)}}>
            <Pool w={PW} h={PH} />
          </div>
        ))}
        {/* Les lignes et leur légende s'effacent complètement sur « Anthropic ». */}
        <div style={{position: 'absolute', left: 0, top: 40, width: W, height: 460, opacity: gone(frame, anthropic)}}>
          <Tracks show={show} work={work} wait={wait} />
          {/* La légende reprend les mots dits : « avancent », « attendent ». */}
          <div style={{position: 'absolute', left: TR.x, top: 380, display: 'flex', gap: 60}}>
            <Pop at={avancent + 5} style={{display: 'flex', alignItems: 'center', gap: 16}}>
              <div style={{width: 40, height: 40, background: accent}} />
              <Mono size={52} color="#fff">avance</Mono>
            </Pop>
            <Pop at={attendent + 5} style={{display: 'flex', alignItems: 'center', gap: 16}}>
              <div style={{width: 40, height: 40, background: GREY}} />
              <Mono size={52} color="#fff">attend</Mono>
            </Pop>
          </div>
        </div>
        {/* pop in : la vraie page de l'étude Anthropic en collage, sur « Anthropic ». */}
        <div style={{position: 'absolute', left: (W - 780) / 2, top: 0}}>
          <Pop at={anthropic + 4}>
            <Collage src="voix/brain-fry-anthropic.png" sw={960} crop={[60, 40, 840, 380]} w={780} tilt={2} />
          </Pop>
        </div>
        {/* count-up et punch zoom (le seul du short) sur 80 %, la barre se remplit aux quatre cinquièmes. */}
        <Pop at={n80} style={{position: 'absolute', left: 0, top: 400, width: W}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 30}}>
            <div style={{transform: `scale(${punch(frame, n80 + COUNT)})`, transformOrigin: 'left center', width: 270}}>
              <Mono size={96} color="#fff">{`${countUp(frame, n80, 80, COUNT)} %`}</Mono>
            </div>
            <div style={{position: 'relative', flex: 1, height: 90, border: '6px solid #fff', boxSizing: 'border-box'}}>
              <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: `${fill * 100}%`, background: GREY, display: 'flex', alignItems: 'center', paddingLeft: 14, boxSizing: 'border-box', overflow: 'hidden'}}>
                <div style={{opacity: frame >= attendre ? 1 : 0}}><Mono size={48} color="#fff">attend</Mono></div>
              </div>
            </div>
          </div>
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 5. Bascule : ta ligne qui saute d'un agent à l'autre, puis la courbe de productivité ----------

// La productivité ressentie (forme seule) : elle monte, plafonne vers 3 outils, redescend après 4.
const CH = {x0: 70, dx: 190, base: 460, top: 110};
const prod = (t: number) => (t <= 4 ? 1 - Math.exp(-(t - 1) * 1.7) : 1 - Math.exp(-3 * 1.7) - 0.55 * Math.pow(t - 4, 1.4));
const PTS = Array.from({length: 201}, (_, i) => {
  const t = 1 + (4 * i) / 200;
  return [CH.x0 + (t - 1) * CH.dx, CH.base - 30 - prod(t) * (CH.base - 30 - CH.top)] as [number, number];
});
const CUM = PTS.reduce<number[]>((acc, p, i) => [...acc, i ? acc[i - 1] + Math.hypot(p[0] - PTS[i - 1][0], p[1] - PTS[i - 1][1]) : 0], []);
const LEN = CUM[CUM.length - 1];
const lenAt = (t: number) => CUM[Math.round(((t - 1) / 4) * 200)] / LEN;
const CURVE = 'M' + PTS.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L');

const JUMPS = [1, 2, 3, 4, 1, 2];
const BOX = {w: 100, gap: 9};

const Bascule: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const passes = at('bascule', 'passes');
  const etait = at('bascule', 'était');
  const dapres = at('bascule', "D'après");
  const bcg = at('bascule', 'BCG');
  const prodAt = at('bascule', 'productivité');
  const ressent = at('bascule', 'ressent');
  const trois = at('bascule', 'trois');
  const outils = at('bascule', 'outils');
  const redescend = at('bascule', 'redescend');
  const quatre = at('bascule', 'quatre');
  const jumps = spread(passes, etait, JUMPS.length);
  const cur = jumps.filter((t) => frame >= t).length - 1;
  const slide = ease(frame, dapres, dapres + 12, [0, 1], 'inOut');
  // draw-on en trois temps : jusqu'à 3 sur « trois », le plateau jusqu'à 4, la descente sur « redescend ».
  const p =
    frame < trois + 6
      ? ease(frame, ressent, trois + 6, [0, lenAt(3)])
      : frame < redescend
        ? ease(frame, trois + 6, outils + 20, [lenAt(3), lenAt(4)])
        : ease(frame, redescend, quatre + 10, [lenAt(4), 1]);
  const tick = (i: number) => (i === 3 && frame >= trois ? accent : i === 4 && frame >= quatre ? RED : LABEL);
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 640}}>
        {/* Les lignes des agents et ta ligne : posées dès l'entrée ; elles glissent vers le haut sur « D'après ». */}
        <div style={{position: 'absolute', inset: 0, opacity: 1 - slide, transform: `translateY(${-160 * slide}px)`}}>
          <div style={{position: 'absolute', left: 0, top: 40, width: W, height: 400}}>
            <Tracks work={[1, 1, 1, 1]} wait={1} active={cur >= 0 ? JUMPS[cur] - 1 : -1} />
          </div>
          <div style={{position: 'absolute', left: 0, top: 40 + 4 * TR.pitch + 30, width: W, height: 70}}>
            {/* Ton curseur saute 1, 2, 3, 4, 1, 2 : une case par saut, un éclair rouge à chaque changement. */}
            {jumps.map((t, k) => (
              <React.Fragment key={k}>
                <Pop at={t} style={{position: 'absolute', left: TR.x + k * (BOX.w + BOX.gap), top: 0, width: BOX.w, height: 70, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <Mono size={52} color="#111">{String(JUMPS[k])}</Mono>
                </Pop>
                {k > 0 ? (
                  <Pop at={t} style={{position: 'absolute', left: TR.x + k * (BOX.w + BOX.gap) - 30, top: 80, lineHeight: 0}}>
                    <Bolt w={50} />
                  </Pop>
                ) : null}
              </React.Fragment>
            ))}
          </div>
        </div>
        {/* La courbe : l'axe « outils » de 1 à 5 posé sur « BCG », la courbe en draw-on, sans valeur verticale. */}
        {frame >= bcg ? (
          <div style={{position: 'absolute', inset: 0}}>
            <Pop at={prodAt} style={{position: 'absolute', left: 0, top: 0}}>
              <Mono size={52} color="#fff">productivité</Mono>
            </Pop>
            <Pop at={bcg} style={{position: 'absolute', left: 0, top: 0, width: W, height: 640}}>
              <svg width={W} height={CH.base + 10} viewBox={`0 0 ${W} ${CH.base + 10}`} style={{position: 'absolute', left: 0, top: 0}}>
                <path d={`M20 ${CH.base} H${W - 10}`} stroke="#fff" strokeWidth="6" />
                <path d={`M20 ${CH.base} V90`} stroke="#666" strokeWidth="5" />
                {[1, 2, 3, 4, 5].map((i) => <line key={i} x1={CH.x0 + (i - 1) * CH.dx} y1={CH.base - 12} x2={CH.x0 + (i - 1) * CH.dx} y2={CH.base + 6} stroke="#fff" strokeWidth="5" />)}
                <line x1={CH.x0 + 2 * CH.dx} y1={CH.top - 20} x2={CH.x0 + 2 * CH.dx} y2={CH.base} stroke={accent} strokeWidth="4" strokeDasharray="10 10" opacity={frame >= trois ? 1 : 0} />
                <line x1={CH.x0 + 3 * CH.dx} y1={CH.top - 20} x2={CH.x0 + 3 * CH.dx} y2={CH.base} stroke={RED} strokeWidth="4" strokeDasharray="10 10" opacity={frame >= quatre ? 1 : 0} />
                {frame >= ressent ? <Draw d={CURVE} p={p} width={10} len={LEN} color={accent} /> : null}
              </svg>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} style={{position: 'absolute', left: CH.x0 + (i - 1) * CH.dx - 16, top: CH.base + 16}}>
                  <Mono size={52} color={tick(i)}>{String(i)}</Mono>
                </div>
              ))}
            </Pop>
            <Pop at={outils} style={{position: 'absolute', right: 0, top: CH.base + 90}}>
              <Mono size={52} color="#fff">outils</Mono>
            </Pop>
          </div>
        ) : null}
      </div>
    </Scene>
  );
};

// ---------- 6. Erreurs : la pile de dossiers ratés, puis les tâches confiées à un agent et la fatigue qui baisse ----------

// Une petite fiche de tâche (deux traits), pour la pile de tâches répétitives.
const TaskCard: React.FC = () => (
  <div style={{width: 150, height: 92, background: '#efe9dc', border: '4px solid #111', boxShadow: pixelShadow('#444'), padding: '16px 16px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 12}}>
    <div style={{height: 10, width: '80%', background: '#9a9384'}} />
    <div style={{height: 10, width: '55%', background: '#9a9384'}} />
  </div>
);
// La personne qui confie ses tâches, en pixel art comme Fabrice : fatiguée (paupières tombantes, bouche plate),
// puis reposée (yeux ouverts, sourire).
const tete = (eyes: string, mouth: string, chin: string): Sprite => ({
  rows: ['....HHHH....', '...HHHHHH...', '...SSSSSS...', eyes, '...SSSSSS...', mouth, chin, '..GGGGGGGG..', '.GGGGGGGGGG.', '.GGGGGGGGGG.', '.SGGGGGGGGS.'],
  palette: {H: '#3a2a1a', S: SKIN, E: '#111', L: '#6a4a30', M: '#7a2a2a', G: '#4f8a5b'},
});
const TETE_FATIGUEE = tete('...SLSSLS...', '...SMMMMS...', '....SSSS....');
const TETE_REPOSEE = tete('...SESSES...', '...SSMMSS...', '....SSSS....');

const Erreurs: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const n39 = at('erreurs', '39');
  const erreurs = at('erreurs', "d'erreurs");
  const graves = at('erreurs', 'graves');
  const alors = at('erreurs', 'alors');
  const confient = at('erreurs', 'confient');
  const repet = at('erreurs', 'répétitives');
  const disent = at('erreurs', 'disent');
  const moins = at('erreurs', 'moins');
  const epuises = at('erreurs', 'épuisés');
  const level = frame >= moins ? ease(frame, moins, moins + 14, [0.78, 0.45], 'inOut') : 0.78;
  const fly = (k: number) => ease(frame, repet + k * 3, repet + k * 3 + 16, [0, 1], 'inOut');
  const rest = frame >= moins ? ease(frame, moins, moins + 14) : 0;
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 640}}>
        {/* 1er temps, centré : l'œil de celui qui surveille, « +39 % » en count-up, les dossiers ratés ; tout part sur « alors ». */}
        <div style={{position: 'absolute', inset: 0, opacity: gone(frame, alors)}}>
          <Pop at={2} style={{position: 'absolute', left: (W - 150) / 2, top: 0, lineHeight: 0}}>
            <Eye size={150} look={Math.sin(frame / 5) * 0.8} />
          </Pop>
          <Pop at={n39} style={{position: 'absolute', left: 0, top: 120, width: W, display: 'flex', justifyContent: 'center'}}>
            <Mono size={110} color={RED}>{`+${countUp(frame, n39, 39, 24)} %`}</Mono>
          </Pop>
          <Pop at={graves} style={{position: 'absolute', left: 0, top: 260, width: W, display: 'flex', justifyContent: 'center'}}>
            <Mono size={52} color="#fff">erreurs graves</Mono>
          </Pop>
          {[0, 1, 2, 3].map((k) => (
            <Pop key={k} at={erreurs + k * 4} style={{position: 'absolute', left: (W - 260) / 2 + (k % 2 ? 14 : -10), top: 600 - (k + 1) * 64, lineHeight: 0}}>
              <Folder w={260} h={58} />
              <div style={{position: 'absolute', left: 101, top: -1, lineHeight: 0}}><Cross p={ease(frame, erreurs + k * 4 + 3, erreurs + k * 4 + 12)} size={60} color={RED} /></div>
            </Pop>
          ))}
        </div>
        {/* 2e temps, centré : l'agent posé sur « alors » ; la pile de tâches répétitives (sur « confient ») part en arc
            et atterrit dans sa fenêtre (sur « répétitives »), où elle reste. */}
        <Pop at={alors + 6} style={{position: 'absolute', left: (W - 340) / 2, top: 0}}>
          <AgentWin w={340} h={220} seed={1} />
        </Pop>
        {[0, 1, 2].map((k) => {
          const [x, y] = arc(fly(k), [60 + k * 20, 330 + k * 24], [(W - 340) / 2 + 40 + k * 90, 96 + (k % 2) * 16], 90);
          return (
            <Pop key={k} at={confient + k * 3} style={{position: 'absolute', left: x, top: y}}>
              <div style={{transform: `scale(${1 - 0.55 * fly(k)})`, transformOrigin: 'left top'}}><TaskCard /></div>
            </Pop>
          );
        })}
        {/* La fatigue : la personne en pixel art, tête basse puis redressée, et la jauge horizontale qui recule d'un cran sur « moins ». */}
        <Pop at={disent} style={{position: 'absolute', left: 0, top: 300, width: W, display: 'flex', alignItems: 'center', gap: 40}}>
          <div style={{lineHeight: 0, transform: `translateY(${12 * (1 - rest)}px) rotate(${8 * (1 - rest)}deg)`}}>
            <Pixel sprite={rest > 0.5 ? TETE_REPOSEE : TETE_FATIGUEE} px={17} seed={6} />
          </div>
          <div style={{position: 'relative', flex: 1, height: 70, border: '6px solid #fff', boxSizing: 'border-box'}}>
            <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: `${level * 100}%`, background: '#e07b39'}} />
            {[0.25, 0.5, 0.75].map((f) => <div key={f} style={{position: 'absolute', top: 0, bottom: 0, left: `${f * 100}%`, width: 4, background: '#000'}} />)}
          </div>
        </Pop>
        <Pop at={epuises} style={{position: 'absolute', left: 184, top: 470, width: W - 184, display: 'flex', justifyContent: 'center'}}>
          <Mono size={56} color={accent}>moins épuisés</Mono>
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 7. Chute : la corde ferme deux bassins, Fabrice surveille les deux autres, tranquille ----------

const Chute: React.FC = () => {
  const frame = useCurrentFrame();
  const fab = at('chute', 'Fabrice');
  const quelques = at('chute', 'quelques');
  const bassins = at('chute', 'bassins');
  // Avant la corde, le regard fait encore le tour des quatre bassins ; ensuite il va et vient, lentement, entre les deux restants.
  const closed = frame >= bassins + 6;
  const look = closed ? (Math.floor((frame - bassins) / 40) % 2 ? 2 : 0) : [0, 1, 3, 2][Math.floor(frame / 22) % 4];
  const sprite = look === 0 || look === 2 ? FAB_CALME_L : FAB_CALME_R;
  const rope = (k: number) => ease(frame, quelques + k * 5, bassins + 6 + k * 5);
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: OFF + 600}}>
        <Badge at={fab} />
        <div style={{position: 'absolute', left: 0, top: OFF, width: W, height: 600}}>
        {/* Reprise de la piscine, posée dès l'entrée ; les deux bassins de droite s'éteignent quand la corde les ferme. */}
        <Pop at={2} style={{position: 'absolute', inset: 0}}>
          <Piscine4 look={look} dim={closed ? [1, 3] : []} swimOut={[1, 3]} outOp={frame >= quelques ? ease(frame, quelques, quelques + 10, [1, 0]) : 1} />
        </Pop>
        {/* draw-on : la corde à flotteurs barre les bassins de droite, de haut en bas. */}
        <svg width={W} height={560} viewBox={`0 0 ${W} 560`} style={{position: 'absolute', left: 0, top: 0}}>
          {[1, 3].map((k, i) => {
            const [x, y] = POOLS[k];
            const q = rope(i);
            if (frame < quelques + i * 5) return null;
            const x1 = x + 20;
            const x2 = x + 20 + (PW - 40) * q;
            const n = Math.floor(((PW - 40) * q) / 36);
            return (
              <g key={k}>
                <line x1={x1} y1={y + PH / 2} x2={x2} y2={y + PH / 2} stroke="#f2f2f2" strokeWidth="5" />
                {Array.from({length: n}, (_, j) => <circle key={j} cx={x1 + 18 + j * 36} cy={y + PH / 2} r="13" fill={j % 2 ? '#f2f2f2' : '#d93a3a'} />)}
              </g>
            );
          })}
        </svg>
        <Gaze k={look} opacity={0.8} />
        <Pop at={2} style={{position: 'absolute', left: FAB.x, top: FAB.y, lineHeight: 0}}>
          <Pixel sprite={sprite} px={FAB.px} seed={2} />
          <div style={{position: 'absolute', left: 0, top: 14 * FAB.px - 6}}><Chair w={12 * FAB.px} h={260} /></div>
        </Pop>
        </div>
      </div>
    </Scene>
  );
};

// ---------- Montage ----------

const SCENES: Record<string, React.FC> = {hook: Hook, intro: Intro, nom: Nom, piscine: Piscine, attente: Attente, bascule: Bascule, erreurs: Erreurs, chute: Chute};

export const AiBrainFryVoix: React.FC = () => <V.Montage scenes={SCENES} accent={AC} />;

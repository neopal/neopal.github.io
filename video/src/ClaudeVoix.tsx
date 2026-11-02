// Short Claude (YouTube / TikTok / Instagram), épisode 25, définition, voix off PAL - FR, préparé le 2026-11-02
// (calage provisoire, sans voix). Fiche claude de lexique/terms.js ; sources dans voix/claude.script.json : Wikipédia,
// Claude (AI) (famille de modèles d'Anthropic, applications, Claude Code ; quatre paliers Haiku, Sonnet, Opus, Mythos ;
// au moins 17 organisations, août 2025) ; Anthropic, Introducing the next generation of Claude (4 mars 2024) ;
// Anthropic, Claude's Constitution (livre audio de 4 h 07 : 9 h + 4 h 07 = 13 h 07) ; l'image d'Hervé au restaurant
// de l'hôtel (inventée).
// Fil : l'ép. 24 parlait des scores que les labos visent ; voilà l'un de leurs modèles, celui qui porte un prénom.
// Les quatre blocs (Haiku, Sonnet, Opus, Mythos) sont les mêmes du hook aux paliers, à la même place d'une scène à
// l'autre (INTRO, ROW) ; le croque et la table aux sept plats gardent leur place de herve à flou (PANEL).
// Ce que la voix ne dit pas ne s'écrit pas : la troisième fenêtre (Cowork) reste sans libellé, la barre du livre audio
// n'a pas de « 12 pistes », la bulle de flou ne dit que « Claude » (la phrase est déjà sous-titrée).
// Collage recréé (pas de capture disponible) : la page « Claude's Constitution », sans logo.
// L'écran suit la voix et Le mouvement (univers.md) : chaque élément entre sur le mot qui le nomme (at), easing du kit,
// un seul punch zoom (sur 13 h 07), italique d'accent seulement au hook.
import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Lock, Mono, Pop, Scene, W, arc, clamp, countUp, ease, punch, serif, useAccent, withAlpha, Draw} from './kit';
import {LABEL, makeVoix} from './voix/VoixShort';
import {Pixel, type Sprite} from './voix/Pixel';
import {Msg, pixelShadow} from './voix/Parts';
import ALIGN from './voix/claude.align.json';
import SCRIPT from './voix/claude.script.json';

const AC = '#F08DC2'; // catégorie Écosystème
const V = makeVoix(ALIGN, SCRIPT, 'voix/prediction-music.mp3');
const {at} = V;
export const CLAUDEVOIX_DURATION = V.duration;

const RED = '#FF4D4D';
const H = 820; // hauteur commune des schémas : plus haute que la zone, donc posée en haut, même place d'une scène à l'autre
const gone = (frame: number, until: number) => ease(frame, until, until + 6, [1, 0], 'inOut');
// Entrée / sortie identiques à celles de Scene, pour un calque posé hors de la Scene.
const useSceneOpacity = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  return interpolate(frame, [0, 6], [0, 1], clamp) * (1 - interpolate(frame, [durationInFrames - 5, durationInFrames], [0, 1], clamp));
};

// ---------- Pixel art (même format que voix/Pixel.tsx) ----------

// Une grille de `w` x `h` lettres `base`, avec des rectangles [x, y, largeur, hauteur, lettre] peints par-dessus.
const paint = (w: number, h: number, base: string, rects: [number, number, number, number, string][]): string[] => {
  const g = Array.from({length: h}, () => Array<string>(w).fill(base));
  for (const [x, y, rw, rh, c] of rects) for (let j = y; j < y + rh; j++) for (let i = x; i < x + rw; i++) if (g[j] && i < w) g[j][i] = c;
  return g.map((r) => r.join(''));
};

const SKIN = '#e3b58e';
// Contour clair d'un sprite sombre posé devant un fond noir (quatre ombres pleines décalées).
const OUTLINE = 'drop-shadow(5px 0 0 #dcdcdc) drop-shadow(-5px 0 0 #dcdcdc) drop-shadow(0 5px 0 #dcdcdc) drop-shadow(0 -5px 0 #dcdcdc)';

// Hervé : raie sur le côté, moustache, costume bleu marine, chemise blanche, cravate rouge.
const HERVE: Sprite = {
  rows: [
    '....HHHH....',
    '...HHHHHH...',
    '...HSSSSH...',
    '...SESSES...',
    '...SSSSSS...',
    '...SMMMMS...',
    '....SSSS....',
    '.JJJWTTWJJJ.',
    'JJJJWTTWJJJJ',
    'JJJJWTTWJJJJ',
    'SJJJJTTJJJJS',
    'SJJJJJJJJJJS',
    '..JJJJJJJJ..',
    '..JJJ..JJJ..',
  ],
  palette: {H: '#6b4a2b', S: SKIN, E: '#111', M: '#4a2f1a', J: '#34507f', W: '#f2f2f2', T: '#c0392b'},
};

// Le groupe criminel : une silhouette en sweat à capuche, le visage dans l'ombre.
const CAPUCHE: Sprite = {
  rows: [
    '...KKKKKK...',
    '..KKKKKKKK..',
    '..KKSSSSKK..',
    '..KKESSEKK..',
    '..KKSSSSKK..',
    '..KKSRRSKK..',
    '...KKSSKK...',
    '.KKKKKKKKKK.',
    'KKKKKKKKKKKK',
    'KKKKKKKKKKKK',
    'SKKKKKKKKKKS',
    'SKKKKKKKKKKS',
    '..KKKKKKKK..',
    '..KKK..KKK..',
  ],
  palette: {K: '#3d3d48', S: '#9c7a5c', E: '#111', R: '#5a3a2a'},
};

// La façade de l'hôtel : toit, deux étages de fenêtres (certaines allumées), stores rayés du restaurant, porte.
const FACADE: Sprite = {
  rows: paint(27, 11, 'W', [
    [0, 0, 27, 1, 'R'],
    [2, 2, 3, 2, 'G'], [7, 2, 3, 2, 'Y'], [17, 2, 3, 2, 'Y'], [22, 2, 3, 2, 'G'],
    [2, 5, 3, 2, 'Y'], [7, 5, 3, 2, 'G'], [12, 5, 3, 2, 'Y'], [17, 5, 3, 2, 'G'], [22, 5, 3, 2, 'Y'],
    ...Array.from({length: 11}, (_, i): [number, number, number, number, string] => [i, 8, 1, 1, i % 2 ? 'a' : 'A']),
    ...Array.from({length: 11}, (_, i): [number, number, number, number, string] => [16 + i, 8, 1, 1, i % 2 ? 'a' : 'A']),
    [1, 9, 9, 2, 'Y'], [17, 9, 9, 2, 'Y'],
    [11, 8, 5, 3, 'D'],
  ]),
  palette: {R: '#3a3a3a', W: '#c9b48a', G: '#5f88b0', Y: '#e8c45a', A: '#d93a3a', a: '#f2f2f2', D: '#5a3a22'},
};
const FAC_PX = 32;

// Un petit immeuble (une organisation) : toit, fenêtres, porte.
const IMMEUBLE: Sprite = {
  rows: paint(5, 7, 'B', [[0, 0, 5, 1, 'R'], [1, 2, 1, 1, 'Y'], [3, 2, 1, 1, 'N'], [1, 4, 1, 1, 'N'], [3, 4, 1, 1, 'Y'], [2, 5, 1, 2, 'D']]),
  palette: {B: '#8a8a8a', R: '#5a5a5a', Y: '#e8c45a', N: '#3a3a3a', D: '#4a4a4a'},
};

// ---------- Les quatre modèles ----------

// Un modèle : le bloc plein de cases de voix/Parts.tsx, avec la couleur de bordure en plus (Mythos en accent).
const Bloc: React.FC<{w: number; color?: string}> = ({w, color = '#fff'}) => (
  <div style={{width: w, height: w * 0.62, background: '#2a2a2a', border: `${Math.max(4, Math.round(w / 40))}px solid ${color}`, boxShadow: pixelShadow('#222'), display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: w / 30, padding: w / 14, boxSizing: 'border-box'}}>
    {Array.from({length: 10}, (_, k) => <div key={k} style={{background: color === '#fff' ? '#5a5a5a' : withAlpha(color, 0.45)}} />)}
  </div>
);

const NAMES = ['Haiku', 'Sonnet', 'Opus', 'Mythos'];
const BW = [130, 175, 225, 280]; // tailles croissantes ; rangés, ils font juste 888 px
// Intro : en vrac, de travers, derrière la bulle de chat [x, y, rotation].
const INTRO: [number, number, number][] = [
  [60, 500, -6],
  [230, 470, 5],
  [440, 440, -3],
  [600, 410, 4],
];
// Paliers : rangés de gauche à droite, posés sur la même ligne.
const BASE = 420;
// Plus d'écart après Haiku : son nom et celui de Sonnet, plus larges que leurs blocs, ne se touchent pas.
const ROW_X = [0, 174, 366, 608];

// ---------- Objets dessinés (SVG maison) ----------

// Horloge murale en pixel art : cadran rond fait de cases, quatre repères, deux aiguilles ; `m` en minutes depuis 0 h.
const PixClock: React.FC<{size: number; m: number}> = ({size, m}) => {
  const cells: React.ReactNode[] = [];
  for (let y = 0; y < 15; y++)
    for (let x = 0; x < 15; x++) {
      const d = Math.hypot(x - 7, y - 7);
      if (d <= 7.3) cells.push(<rect key={`${x}-${y}`} x={x} y={y} width={1.02} height={1.02} fill={d > 6.1 ? '#8a6a3a' : '#efe9dc'} />);
    }
  const ha = (((m / 60) % 12) / 12) * 2 * Math.PI;
  const ma = ((m % 60) / 60) * 2 * Math.PI;
  return (
    <svg width={size} height={size} viewBox="0 0 15 15">
      <g shapeRendering="crispEdges">
        {cells}
        {[[7, 1.6], [12.4, 7], [7, 12.4], [1.6, 7]].map(([x, y], k) => <rect key={k} x={x} y={y} width={1} height={1} fill="#333" />)}
      </g>
      <line x1={7.5} y1={7.5} x2={7.5 + 3.4 * Math.sin(ha)} y2={7.5 - 3.4 * Math.cos(ha)} stroke="#111" strokeWidth={1.1} strokeLinecap="square" />
      <line x1={7.5} y1={7.5} x2={7.5 + 5 * Math.sin(ma)} y2={7.5 - 5 * Math.cos(ma)} stroke={RED} strokeWidth={0.7} strokeLinecap="square" />
      <rect x={7} y={7} width={1} height={1} fill="#111" />
    </svg>
  );
};

// Le croque-monsieur sur son assiette.
const Croque: React.FC<{w: number}> = ({w}) => (
  <svg width={w} height={w * 0.37} viewBox="0 0 300 110" shapeRendering="crispEdges">
    <ellipse cx="150" cy="78" rx="142" ry="30" fill="#f2f2f2" stroke="#cfcfcf" strokeWidth="5" shapeRendering="auto" />
    <rect x="78" y="34" width="144" height="40" fill="#a8742a" />
    <rect x="84" y="22" width="132" height="22" fill="#e8c45a" />
    <rect x="100" y="44" width="16" height="12" fill="#e8c45a" />
    <rect x="170" y="44" width="12" height="16" fill="#e8c45a" />
    <rect x="84" y="54" width="132" height="6" fill="#d9a441" />
  </svg>
);

// Une assiette du menu (vue de biais), avec un mets de couleur `c`.
const Assiette: React.FC<{w: number; c: string}> = ({w, c}) => (
  <svg width={w} height={w * 0.4} viewBox="0 0 100 40">
    <ellipse cx="50" cy="22" rx="47" ry="16" fill="#f2f2f2" stroke="#cfcfcf" strokeWidth="3" />
    <ellipse cx="50" cy="20" rx="20" ry="7" fill={c} />
  </svg>
);
const METS = ['#4f8a5b', '#d9a441', '#c0392b', '#e07b39', '#8e4a7a', '#5f88b0', '#6b4a2b'];

// La table nappée et ses sept assiettes, qui tombent en cascade à partir de `t` (posées d'emblée si t ≤ 0).
const PLATES: [number, number][] = [[20, 0], [120, 0], [220, 0], [320, 0], [70, 50], [170, 50], [270, 50]];
const Table: React.FC<{t: number; frame: number}> = ({t, frame}) => (
  <div style={{position: 'relative', width: 420, height: 150}}>
    <div style={{position: 'absolute', left: 0, top: 20, width: 420, height: 130, background: '#f2f2f2', borderBottom: `14px solid ${RED}`, boxSizing: 'border-box', boxShadow: pixelShadow('#333')}} />
    {PLATES.map(([x, y], k) => {
      const s = t + 3 * k;
      return (
        <div key={k} style={{position: 'absolute', left: x, top: y + ease(frame, s, s + 10, [-70, 0]), opacity: frame >= s ? 1 : 0, lineHeight: 0}}>
          <Assiette w={100} c={METS[k]} />
        </div>
      );
    })}
  </div>
);

// Le casque du livre audio.
const Casque: React.FC<{w: number}> = ({w}) => (
  <svg width={w} height={w} viewBox="0 0 100 100">
    <path d="M18 62 V50 a32 32 0 0 1 64 0 V62" fill="none" stroke="#fff" strokeWidth="9" />
    <rect x="10" y="56" width="22" height="34" rx="6" fill={AC} />
    <rect x="68" y="56" width="22" height="34" rx="6" fill={AC} />
  </svg>
);

// Une bulle de parole, la queue vers le bas à gauche.
const Bulle: React.FC<{children: React.ReactNode}> = ({children}) => (
  <div style={{position: 'relative', background: '#151515', border: '5px solid #fff', borderRadius: 30, padding: '16px 36px'}}>
    {children}
    <svg width={60} height={50} viewBox="0 0 60 50" style={{position: 'absolute', left: 40, bottom: -45}}>
      <path d="M0 0 L20 46 L44 0" fill="#151515" stroke="#fff" strokeWidth="5" />
      <rect x="3" y="0" width="38" height="6" fill="#151515" />
    </svg>
  </div>
);

// Une fenêtre d'application : barre de titre à trois points, et son contenu (chat, code ou bureau).
const Fenetre: React.FC<{kind: 'chat' | 'code' | 'cowork'}> = ({kind}) => {
  const accent = useAccent();
  return (
    <div style={{width: 270, height: 190, background: '#111', border: '5px solid #8a8a8a', boxSizing: 'border-box', boxShadow: pixelShadow('#222'), overflow: 'hidden'}}>
      <div style={{height: 34, background: '#2a2a2a', display: 'flex', alignItems: 'center', gap: 8, padding: '0 12px'}}>
        {[0, 1, 2].map((k) => <div key={k} style={{width: 12, height: 12, borderRadius: 6, background: '#777'}} />)}
      </div>
      <div style={{padding: 14, display: 'flex', flexDirection: 'column', gap: 12}}>
        {kind === 'chat' ? (
          <>
            <div style={{alignSelf: 'flex-end', width: 130, height: 34, background: '#3a3a3a', borderRadius: 14}} />
            <div style={{width: 190, height: 50, border: '4px solid #555', borderRadius: 14, boxSizing: 'border-box'}} />
          </>
        ) : kind === 'code' ? (
          [120, 180, 90, 150].map((w, k) => (
            <div key={k} style={{display: 'flex', gap: 10}}>
              <div style={{width: 14, height: 14, background: accent}} />
              <div style={{width: w, height: 14, background: '#5a5a5a'}} />
            </div>
          ))
        ) : (
          <div style={{display: 'flex', gap: 18, paddingTop: 8}}>
            {[0, 1, 2].map((k) => <div key={k} style={{width: 60, height: 80, background: '#efe9dc', border: '4px solid #9a9384', boxSizing: 'border-box'}} />)}
          </div>
        )}
      </div>
    </div>
  );
};

// ---------- Collage recréé ----------

// À REMPLACER par la vraie capture public/voix/claude-constitution.png
// (page « Claude's Constitution », anthropic.com/constitution, crédit dans le script). En attendant : une feuille de
// papier recréée, bordure blanche, ombre pixel, scotch aux coins, le titre en texte et des lignes de texte en traits.
const CONST_W = 600;
const ConstitutionCollage: React.FC = () => (
  <div style={{position: 'relative', transform: 'rotate(-1.5deg)'}}>
    <div style={{width: CONST_W, background: '#efe9dc', border: '5px solid #fff', boxShadow: pixelShadow('#333'), padding: '30px 44px 40px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 18}}>
      <div style={{display: 'flex', gap: 14}}>
        {[70, 90, 60].map((w, k) => <div key={k} style={{width: w, height: 10, background: '#b8b0a0'}} />)}
      </div>
      <div style={{fontFamily: serif, fontWeight: 800, fontSize: 60, lineHeight: 1, color: '#141413'}}>Claude's Constitution</div>
      {[92, 80, 88, 70, 85, 60].map((w, k) => <div key={k} style={{height: 14, width: `${w}%`, background: '#9a9384'}} />)}
    </div>
    <div style={{position: 'absolute', left: -18, top: -10, width: 90, height: 28, background: 'rgba(239,233,220,0.85)', transform: 'rotate(-30deg)'}} />
    <div style={{position: 'absolute', right: -18, top: -10, width: 90, height: 28, background: 'rgba(239,233,220,0.85)', transform: 'rotate(30deg)'}} />
    <div style={{position: 'absolute', left: -18, bottom: -10, width: 90, height: 28, background: 'rgba(239,233,220,0.85)', transform: 'rotate(30deg)'}} />
    <div style={{position: 'absolute', right: -18, bottom: -10, width: 90, height: 28, background: 'rgba(239,233,220,0.85)', transform: 'rotate(-30deg)'}} />
  </div>
);
const CONST_X = (W - CONST_W) / 2;
const CONST_Y = 40;

// ---------- 0. Hook : les quatre blocs empilés de travers, et le titre ----------

const Hook: React.FC = () => {
  const op = useSceneOpacity();
  // La pile, du plus grand (en bas) au plus petit (en haut) : [haut, décalage, rotation].
  const PILE: [number, number, number][] = [
    [175, -8, -4],
    [240, 18, 6],
    [325, -20, -5],
    [445, 10, 4],
  ];
  return (
    <>
      {/* Posés dès la première image (aucun sous-titre dans le hook) : les quatre modèles, sans libellé. */}
      <div style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 660, opacity: op}}>
        {[3, 2, 1, 0].map((k) => (
          <div key={k} style={{position: 'absolute', left: 540 - BW[k] / 2 + PILE[k][1], top: PILE[k][0], transform: `rotate(${PILE[k][2]}deg)`}}>
            <Bloc w={BW[k]} />
          </div>
        ))}
      </div>
      <V.TitleHook lead="C'est quoi ?" lines={['Claude']} cue="Claude" />
    </>
  );
};

// ---------- 1. Intro : la bulle de chat s'écarte, les quatre modèles derrière, puis les applications ----------

const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const famille = at('intro', 'famille');
  const applis = at('intro', 'applications');
  const chat = at('intro', 'chat', 2);
  const code = at('intro', 'Code');
  // La bulle part sur « famille » en arc vers la droite, et s'efface en route.
  const p = ease(frame, famille, famille + 14, [0, 1], 'inOut');
  const [bx, by] = arc(p, [0, 0], [760, 120], 50);
  const WIN: ['chat' | 'code' | 'cowork', string, number][] = [
    ['chat', 'chat', chat],
    ['code', 'Claude Code', code],
    ['cowork', '', 0],
  ];
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: H}}>
        {/* Les quatre modèles, en vrac, cachés derrière la bulle jusqu'à « famille ». */}
        {INTRO.map(([x, y, r], k) => (
          <div key={k} style={{position: 'absolute', left: x, top: y, transform: `rotate(${r}deg)`}}>
            <Bloc w={BW[k]} />
          </div>
        ))}
        {/* La bulle de chat, posée à l'entrée : une conversation en traits. */}
        <div style={{position: 'absolute', left: 0, top: 380, opacity: gone(frame, famille + 6)}}>
          <div style={{width: W, height: 330, background: '#151515', border: '5px solid #fff', borderRadius: 34, boxSizing: 'border-box', padding: '30px 36px', display: 'flex', flexDirection: 'column', gap: 22, transform: `translate(${bx}px, ${by}px) rotate(${p * 8}deg)`}}>
            <Msg w={420} right />
            <Msg w={560} />
            <Msg w={300} right />
          </div>
        </div>
        {/* stagger : trois fenêtres d'application glissent au-dessus en cascade sur « applications » ; « chat » et
            « Claude Code » s'écrivent sur leur mot, la troisième (Cowork, que la voix ne nomme pas) reste sans libellé. */}
        {WIN.map(([kind, label, t], k) => {
          const s = applis + 3 * k;
          return (
            <div key={k} style={{position: 'absolute', left: k * 309, top: 0, width: 270, opacity: frame >= s ? ease(frame, s, s + 8) : 0, transform: `translateY(${ease(frame, s, s + 12, [-60, 0])}px)`}}>
              <Fenetre kind={kind} />
              {label ? (
                <Pop at={t} style={{position: 'absolute', left: -40, width: 350, top: 206, display: 'flex', justifyContent: 'center'}}>
                  <Mono size={48} color="#fff">{label}</Mono>
                </Pop>
              ) : null}
            </div>
          );
        })}
      </div>
    </Scene>
  );
};

// ---------- 2. Paliers : les blocs se rangent par taille, chacun reçoit son nom, puis Mythos en accent ----------

const Paliers: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const trois = at('paliers', 'trois');
  const T = [at('paliers', 'Haiku'), at('paliers', 'Sonnet'), at('paliers', 'Opus'), at('paliers', 'Mythos')];
  const rapide = at('paliers', 'rapide');
  const capable = at('paliers', 'capable');
  const quatrieme = at('paliers', 'quatrième');
  const fable = at('paliers', 'Fable');
  const arrow = ease(frame, rapide, capable);
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: H}}>
        {INTRO.map(([x0, y0, r0], k) => {
          // stagger : de leur place en vrac (celle de l'intro) à la rangée, en cascade de gauche à droite, sur « trois ».
          const m = ease(frame, trois + 3 * k, trois + 3 * k + 16, [0, 1], 'inOut');
          const h = BW[k] * 0.62;
          // En arc, jamais en ligne droite.
          const [x, y] = arc(m, [x0, y0], [ROW_X[k], BASE - h], 30);
          const myth = k === 3;
          // Mythos passe en retrait pendant « trois tailles », puis revient en accent sur « quatrième ».
          const op = myth ? (frame < quatrieme ? interpolate(frame, [trois, trois + 10], [1, 0.25], clamp) : ease(frame, quatrieme, quatrieme + 10, [0.25, 1])) : 1;
          const lit = myth && frame >= quatrieme;
          return (
            <div key={k} style={{position: 'absolute', left: x, top: y, transform: `rotate(${r0 * (1 - m)}deg)`, opacity: op}}>
              <Bloc w={BW[k]} color={lit ? accent : '#fff'} />
            </div>
          );
        })}
        {/* Le nom de chaque bloc, 5 images après le mot qui le dit, centré dessous. */}
        {NAMES.map((n, k) => (
          <Pop key={n} at={T[k] + 5} style={{position: 'absolute', left: ROW_X[k] + BW[k] / 2 - 100, width: 200, top: BASE + 20, display: 'flex', justifyContent: 'center'}}>
            <Mono size={48} color={k === 3 ? accent : '#fff'}>{n}</Mono>
          </Pop>
        ))}
        {/* « Fable » : la version de Mythos ouverte au public, posée au-dessus du bloc sur son mot. */}
        <Pop at={fable} style={{position: 'absolute', left: ROW_X[3] + BW[3] / 2 - 120, width: 240, top: BASE - BW[3] * 0.62 - 84, display: 'flex', justifyContent: 'center'}}>
          <Mono size={52} color={accent}>Fable</Mono>
        </Pop>
        {/* draw-on : la flèche de « rapide » (à gauche) à « capable » (à droite). */}
        <svg width={W} height={60} viewBox={`0 0 ${W} 60`} style={{position: 'absolute', left: 0, top: 560, overflow: 'visible'}}>
          {frame >= rapide ? <Draw d={`M10 30 H${W - 20}`} p={arrow} width={8} len={W - 30} color={LABEL} /> : null}
          {arrow > 0.97 ? <path d={`M${W - 40} 8 L${W - 4} 30 L${W - 40} 52 Z`} fill={LABEL} /> : null}
        </svg>
        <Pop at={rapide} style={{position: 'absolute', left: 0, top: 640}}>
          <Mono size={52} color={LABEL}>rapide</Mono>
        </Pop>
        <Pop at={capable} style={{position: 'absolute', right: 0, top: 640}}>
          <Mono size={52} color={LABEL}>capable</Mono>
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 3. Hervé : l'hôtel, le croque du bar en cinq minutes, le menu en sept plats tout l'après-midi ----------

// Les deux panneaux du bas, même place dans herve et flou : [centre x, largeur].
const PANEL = {left: 200, right: 678, top: 450};
const HERVE_POS = {x: 348, y: 190, px: 16};

const Herve: React.FC = () => {
  const frame = useCurrentFrame();
  const herve = at('herve', 'Hervé');
  const hotel = at('herve', 'hôtel');
  const croque = at('herve', 'croque');
  const minutes = at('herve', 'minutes');
  const menu = at('herve', 'menu');
  const sept = at('herve', 'sept');
  const apres = at('herve', 'après-midi');
  // Horloge du bar : cinq minutes (de midi à midi cinq) ; horloge du menu : un tour complet (de midi à 13 h).
  const m1 = ease(frame, croque + 6, minutes + 6, [720, 725], 'inOut');
  const m2 = ease(frame, sept, apres + 10, [720, 780], 'inOut');
  const facade = frame >= croque ? ease(frame, croque, croque + 10, [1, 0.6], 'inOut') : 1;
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: H}}>
        {/* Le décor, posé dès l'entrée : la façade de l'hôtel et son restaurant ; elle passe en retrait sur « croque ». */}
        <div style={{position: 'absolute', left: (W - 27 * FAC_PX) / 2, top: 0, lineHeight: 0, opacity: facade}}>
          <Pixel sprite={FACADE} px={FAC_PX} />
        </div>
        {/* L'enseigne, sur « hôtel », hors du retrait de la façade pour rester lisible. */}
        <div style={{position: 'absolute', left: (W - 27 * FAC_PX) / 2, top: 0}}>
          <Pop at={hotel} style={{position: 'absolute', left: 10 * FAC_PX - 6, top: 2 * FAC_PX - 6, width: 7 * FAC_PX + 12, height: 2 * FAC_PX + 12, background: '#2a2a2a', border: '4px solid #e8c45a', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Mono size={52} color="#e8c45a">hôtel</Mono>
          </Pop>
        </div>
        {/* Hervé devant la porte ; il cligne des yeux. Son nom à sa droite, 5 images après. */}
        <Pop at={herve} style={{position: 'absolute', left: HERVE_POS.x, top: HERVE_POS.y, lineHeight: 0}}>
          <Pixel sprite={HERVE} px={HERVE_POS.px} seed={2} />
        </Pop>
        <Pop at={herve + 5} style={{position: 'absolute', left: HERVE_POS.x + 12 * HERVE_POS.px + 24, top: 362}}>
          <Mono size={52} color="#fff">Hervé</Mono>
        </Pop>
        {/* À gauche, sur « croque » : l'horloge (cinq minutes) et le croque sur son assiette. */}
        <Pop at={croque} style={{position: 'absolute', left: PANEL.left - 70, top: PANEL.top, lineHeight: 0}}>
          <PixClock size={140} m={m1} />
        </Pop>
        <Pop at={croque + 4} style={{position: 'absolute', left: PANEL.left - 150, top: PANEL.top + 160, lineHeight: 0}}>
          <Croque w={300} />
        </Pop>
        <Pop at={minutes} style={{position: 'absolute', left: PANEL.left - 200, width: 400, top: PANEL.top + 290, display: 'flex', justifyContent: 'center'}}>
          <Mono size={52} color="#fff">5 minutes</Mono>
        </Pop>
        {/* À droite, sur « menu » : la table nappée ; sur « sept », les sept assiettes tombent en cascade pendant
            que l'horloge fait un tour complet. */}
        <Pop at={sept} style={{position: 'absolute', left: PANEL.right - 70, top: PANEL.top, lineHeight: 0}}>
          <PixClock size={140} m={m2} />
        </Pop>
        <Pop at={menu} style={{position: 'absolute', left: PANEL.right - 210, top: PANEL.top + 140}}>
          <Table t={sept} frame={frame} />
        </Pop>
        <Pop at={sept + 22} style={{position: 'absolute', left: PANEL.right - 200, width: 400, top: PANEL.top + 290, display: 'flex', justifyContent: 'center'}}>
          <Mono size={52} color="#fff">7 plats</Mono>
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 4. Flou : la bulle « Claude », le point d'interrogation qui hésite, le croque devient Haiku, le menu Opus ----------

// Wipe de gauche à droite : `a` s'efface derrière le trait d'accent, `b` apparaît (p de 0 à 1).
const Wipe: React.FC<{p: number; w: number; h: number; a: React.ReactNode; b: React.ReactNode}> = ({p, w, h, a, b}) => {
  const accent = useAccent();
  return (
    <div style={{position: 'relative', width: w, height: h}}>
      <div style={{position: 'absolute', inset: 0, clipPath: `inset(0 0 0 ${p * 100}%)`, display: 'flex', alignItems: 'flex-end', justifyContent: 'center'}}>{a}</div>
      <div style={{position: 'absolute', inset: 0, clipPath: `inset(0 ${100 - p * 100}% 0 0)`, display: 'flex', alignItems: 'flex-end', justifyContent: 'center'}}>{b}</div>
      {p > 0 && p < 1 ? <div style={{position: 'absolute', left: p * w - 4, top: 0, width: 8, height: h, background: accent}} /> : null}
    </div>
  );
};

const Flou: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const claude = at('flou', 'Claude');
  const flou = at('flou', 'flou');
  const haiku = at('flou', 'Haiku');
  const opus = at('flou', 'Opus');
  const pL = ease(frame, haiku, haiku + 18, [0, 1], 'inOut');
  const pR = ease(frame, opus, opus + 18, [0, 1], 'inOut');
  // Le point d'interrogation oscille d'une assiette à l'autre (aller-retour en douceur, une seconde et demie).
  const swing = Math.sin(((frame - flou) / 45) * 2 * Math.PI);
  const PW = 420;
  const PH = 300;
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: H}}>
        {/* La bulle de ce qu'on te dit, sur « Claude » : un seul mot, la phrase est déjà sous-titrée. */}
        <div style={{position: 'absolute', left: 0, top: 60, width: W, display: 'flex', justifyContent: 'center'}}>
          <Pop at={claude}>
            <Bulle><Mono size={72} color="#fff">Claude</Mono></Bulle>
          </Pop>
        </div>
        {/* Le point d'interrogation, sur « flou », qui hésite entre les deux. */}
        <Pop at={flou} style={{position: 'absolute', left: W / 2 - 40 + 200 * swing, top: 270}}>
          <Mono size={120} color={accent}>?</Mono>
        </Pop>
        {/* Les deux panneaux, à la place de herve, posés dès l'entrée ; wipe vers les blocs sur « Haiku » et « Opus ». */}
        <div style={{position: 'absolute', left: PANEL.left - PW / 2, top: PANEL.top + 30}}>
          <Wipe p={pL} w={PW} h={PH} a={<div style={{lineHeight: 0, paddingBottom: 30}}><Croque w={300} /></div>} b={<div style={{paddingBottom: 20}}><Bloc w={200} /></div>} />
        </div>
        <div style={{position: 'absolute', left: PANEL.right - PW / 2, top: PANEL.top + 30}}>
          <Wipe p={pR} w={PW} h={PH} a={<div style={{paddingBottom: 0}}><Table t={-99} frame={frame} /></div>} b={<div style={{paddingBottom: 20}}><Bloc w={346} /></div>} />
        </div>
        <Pop at={haiku + 18 + 5} style={{position: 'absolute', left: PANEL.left - 200, width: 400, top: PANEL.top + PH + 50, display: 'flex', justifyContent: 'center'}}>
          <Mono size={52} color="#fff">Haiku</Mono>
        </Pop>
        <Pop at={opus + 18 + 5} style={{position: 'absolute', left: PANEL.right - 200, width: 400, top: PANEL.top + PH + 50, display: 'flex', justifyContent: 'center'}}>
          <Mono size={52} color="#fff">Opus</Mono>
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 5. Constitution : le réglage du caractère, la page, puis le livre audio de 9 h à 13 h 07 ----------

const Constitution: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const regle = at('constitution', 'règle');
  const constit = at('constitution', 'constitution');
  const livre = at('constitution', 'livre');
  const audio = at('constitution', 'audio');
  const lance = at('constitution', 'lance');
  const neuf = at('constitution', 'neuf');
  const heures = at('constitution', 'heures');
  const sept = at('constitution', 'sept');
  // Les aiguilles tournent en continu de 9 h à 13 h 07 (4 h 07 de livre audio), de « heures » à « sept ».
  const m = ease(frame, heures, sept, [540, 787], 'inOut');
  const hh = Math.floor(m / 60);
  const mm = String(Math.floor(m % 60)).padStart(2, '0');
  const fill = ease(frame, heures, sept, [0, 12], 'inOut');
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: H}}>
        {/* Posé dès l'entrée : le modèle ; sur « règle », un potard tourne à côté (le caractère qu'on règle). */}
        <div style={{position: 'absolute', left: 120, top: 180, opacity: gone(frame, constit - 6)}}>
          <Pop at={0}><Bloc w={340} /></Pop>
        </div>
        <Pop at={regle} style={{position: 'absolute', left: 560, top: 175, lineHeight: 0, opacity: gone(frame, constit - 6)}}>
          <svg width={220} height={220} viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="#2a2a2a" stroke="#fff" strokeWidth="6" />
            <g transform={`rotate(${ease(frame, regle, regle + 20, [-130, 50], 'inOut')} 50 50)`}>
              <rect x="46" y="14" width="8" height="26" fill={accent} />
            </g>
          </svg>
        </Pop>
        {/* pop in : la page de la constitution en collage, sur « constitution » ; elle part sur « livre ». */}
        <div style={{position: 'absolute', left: CONST_X, top: CONST_Y, opacity: gone(frame, livre - 2)}}>
          <Pop at={constit}><ConstitutionCollage /></Pop>
        </div>
        {/* Sur « audio », l'horloge murale à 9 h. */}
        <Pop at={audio} style={{position: 'absolute', left: (W - 320) / 2, top: 0, lineHeight: 0}}>
          <PixClock size={320} m={m} />
        </Pop>
        {/* L'heure en chiffres, sur « neuf » ; punch zoom (le seul du short) à l'arrivée sur 13 h 07. */}
        <Pop at={neuf} style={{position: 'absolute', left: 0, width: W, top: 350, display: 'flex', justifyContent: 'center'}}>
          <div style={{transform: `scale(${punch(frame, sept)})`}}>
            <Mono size={96} color={frame >= sept ? accent : '#fff'}>{`${hh} h ${mm}`}</Mono>
          </div>
        </Pop>
        {/* bar grow : sur « lance-le », le casque et la barre de lecture en douze pistes, qui se remplit avec l'horloge. */}
        <Pop at={lance} style={{position: 'absolute', left: 0, top: 530, width: W, display: 'flex', alignItems: 'center', gap: 24}}>
          <Casque w={110} />
          <div style={{flex: 1, display: 'flex', gap: 6, height: 80}}>
            {Array.from({length: 12}, (_, k) => (
              <div key={k} style={{position: 'relative', flex: 1, border: '4px solid #fff', boxSizing: 'border-box'}}>
                <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: `${Math.max(0, Math.min(1, fill - k)) * 100}%`, background: accent}} />
              </div>
            ))}
          </div>
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 6. Garde-fou : la page se replie, août 2025, le groupe criminel, Claude Code, dix-sept organisations ----------

const ORG = {px: 16, pitch: 98, top: [400, 540]};

const Garde: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const tout = at('garde', 'tout');
  const aout = at('garde', 'août');
  const groupe = at('garde', 'groupe');
  const claude = at('garde', 'Claude');
  const chanter = at('garde', 'chanter');
  const dixsept = at('garde', 'dix-sept');
  const orgas = at('garde', 'organisations');
  const fold = ease(frame, tout, tout + 10, [1, 0], 'inOut');
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: H}}>
        {/* Posée dès l'entrée, à la place de la scène d'avant : la page de la constitution, qui se replie sur « tout ». */}
        {fold > 0 ? (
          <div style={{position: 'absolute', left: CONST_X, top: CONST_Y, transform: `scaleY(${fold})`, transformOrigin: '50% 0'}}>
            <ConstitutionCollage />
          </div>
        ) : null}
        <Pop at={aout} style={{position: 'absolute', left: 0, width: W, top: 0, display: 'flex', justifyContent: 'center'}}>
          <Mono size={64} color="#fff">août 2025</Mono>
        </Pop>
        {/* Le groupe criminel, sur « groupe », à gauche ; contour clair sur le fond noir. */}
        <Pop at={groupe} style={{position: 'absolute', left: 30, top: 120, lineHeight: 0, filter: OUTLINE}}>
          <Pixel sprite={CAPUCHE} px={16} seed={5} />
        </Pop>
        {/* Claude Code, sur « Claude » : un terminal recréé, sans commande écrite. */}
        <Pop at={claude} style={{position: 'absolute', left: 290, top: 110, width: W - 290, height: 250, background: '#0e0e0e', border: '5px solid #6a6a6a', boxSizing: 'border-box', overflow: 'hidden'}}>
          <div style={{height: 70, background: '#262626', display: 'flex', alignItems: 'center', padding: '0 20px', gap: 12}}>
            {[0, 1, 2].map((k) => <div key={k} style={{width: 16, height: 16, borderRadius: 8, background: '#777'}} />)}
            <div style={{marginLeft: 10}}><Mono size={48} color="#cfcfcf">Claude Code</Mono></div>
          </div>
          <div style={{padding: '22px 26px', display: 'flex', flexDirection: 'column', gap: 18}}>
            {[260, 380, 200].map((w, k) => (
              <div key={k} style={{display: 'flex', gap: 14}}>
                <div style={{width: 18, height: 18, background: accent}} />
                <div style={{width: w, height: 18, background: '#5a5a5a'}} />
              </div>
            ))}
          </div>
        </Pop>
        {/* stagger : sur « chanter », les dix-sept organisations se posent en cascade (lecture : gauche à droite, puis
            la deuxième rangée), et un cadenas rouge se ferme sur chacune juste après. */}
        {Array.from({length: 17}, (_, k) => {
          const row = k < 9 ? 0 : 1;
          const col = row ? k - 9 : k;
          const x = row ? ORG.pitch / 2 + col * ORG.pitch : col * ORG.pitch;
          const s = chanter + 2 * k;
          return (
            <div key={k} style={{position: 'absolute', left: x + 4, top: ORG.top[row]}}>
              <Pop at={s} style={{lineHeight: 0}}>
                <Pixel sprite={IMMEUBLE} px={ORG.px} />
              </Pop>
              <div style={{position: 'absolute', left: 16, top: 44, lineHeight: 0, opacity: frame >= s + 4 ? 1 : 0}}>
                <Lock p={ease(frame, s + 4, s + 12)} size={48} color={RED} />
              </div>
            </div>
          );
        })}
        {/* count-up : « 17 » sur « dix-sept », posé avant la fin de la scène ; « organisations » sur son mot. */}
        <div style={{position: 'absolute', left: 0, width: W, top: 680, display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap: 26}}>
          <Pop at={dixsept}><Mono size={96} color={RED}>{countUp(frame, dixsept, 17, 20)}</Mono></Pop>
          <Pop at={orgas}><Mono size={56} color="#fff">organisations</Mono></Pop>
        </div>
      </div>
    </Scene>
  );
};

// ---------- 7. Chute : retour au restaurant de l'hôtel, Hervé à table entre le croque et le menu, « lequel ? » ----------

const Chute: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const claude = at('chute', 'Claude');
  const demande = at('chute', 'demande');
  const lequel = at('chute', 'lequel');
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: H}}>
        {/* Le décor, posé dès l'entrée et plein cadre : le mur lambrissé du restaurant, deux appliques. */}
        <div style={{position: 'absolute', left: -96, top: 0, width: 1080, height: 560, background: '#4a3828'}}>
          {Array.from({length: 9}, (_, k) => <div key={k} style={{position: 'absolute', left: 60 + k * 120, top: 0, width: 8, height: 560, background: '#3a2a1c'}} />)}
          {[200, 880].map((x) => (
            <div key={x} style={{position: 'absolute', left: x - 30, top: 70, width: 60, height: 60, borderRadius: 30, background: '#e8c45a', boxShadow: '0 0 60px 20px rgba(232,196,90,0.35)'}} />
          ))}
        </div>
        {/* Hervé, assis derrière la table. */}
        <div style={{position: 'absolute', left: (W - 12 * 20) / 2, top: 250, lineHeight: 0}}>
          <Pixel sprite={HERVE} px={20} seed={2} />
        </div>
        {/* La table nappée, plein cadre : le croque à gauche, les sept assiettes du menu à droite. */}
        <div style={{position: 'absolute', left: -96, top: 500, width: 1080, height: 320, background: '#f2f2f2', borderTop: '10px solid #dcdcdc', boxSizing: 'border-box'}}>
          <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 24, background: RED}} />
        </div>
        <div style={{position: 'absolute', left: -10, top: 418, lineHeight: 0}}>
          <Croque w={300} />
        </div>
        <div style={{position: 'absolute', left: 575, top: 410}}>
          {PLATES.map(([x, y], k) => (
            <div key={k} style={{position: 'absolute', left: x * 0.8, top: y * 0.8, lineHeight: 0}}>
              <Assiette w={80} c={METS[k]} />
            </div>
          ))}
        </div>
        {/* Sur « Claude », la bulle de ce qu'on te dit, au-dessus d'Hervé ; elle s'efface sur « demande ». */}
        <div style={{position: 'absolute', left: 560, top: 90, opacity: gone(frame, demande - 2)}}>
          <Pop at={claude}>
            <Bulle><Mono size={64} color="#fff">Claude</Mono></Bulle>
          </Pop>
        </div>
        {/* Sur « lequel », l'étiquette se pose entre les deux assiettes, sur la nappe. */}
        <div style={{position: 'absolute', left: 0, width: W, top: 600, display: 'flex', justifyContent: 'center'}}>
          <Pop at={lequel} style={{background: accent, padding: '10px 34px', borderRadius: 10, boxShadow: pixelShadow('#333'), transform: 'rotate(-3deg)'}}>
            <Mono size={72} color="#111">lequel ?</Mono>
          </Pop>
        </div>
      </div>
    </Scene>
  );
};

// ---------- Montage ----------

const SCENES: Record<string, React.FC> = {hook: Hook, intro: Intro, paliers: Paliers, herve: Herve, flou: Flou, constitution: Constitution, garde: Garde, chute: Chute};

export const ClaudeVoix: React.FC = () => <V.Montage scenes={SCENES} accent={AC} />;

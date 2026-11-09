// Short Bande passante mémoire (YouTube / TikTok / Instagram), épisode 39, définition, voix off PAL - FR, préparé le
// 2026-11-09 (calage provisoire, sans voix). Fiche bande-passante-memoire de lexique/terms.js ; sources dans
// voix/bande-passante.script.json : NVIDIA, Mastering LLM Techniques: Inference Optimization (le decode relit les poids,
// limité par la bande passante mémoire) ; Ministral 3 8B en 4 bits, 6,0 Go (Ollama) ; Snapdragon 8 Elite, 84,8 Go/s ;
// RTX 5090, 1 792 Go/s ; H100 SXM, 3,35 To/s (calculs 14, 299 et 558 tokens/s) ; llama.cpp, discussion #4167 (LLaMA 7B
// sur M2 Ultra : 41 tokens/s en F16, 94 en Q4_0). Image inventée : Jean-Claude, qui relit son dictionnaire de 2 000 pages
// pour chaque mot de sa carte de vœux. Fil : l'ép. 38 disait que l'écriture relit tout le modèle à chaque token.
// La mémoire (Memoire), le tuyau (Tuyau) et la puce (Puce) sont les mêmes dans hook, base, nom et plafonds ; le bureau
// de Jean-Claude (Bureau) est le même dans jeanclaude et chute.
// Écarts au storyboard : le titre du hook est en casse normale (« bande passante », « mémoire »), comme les autres
// shorts, et « mémoire » tombe sur son mot ; dans plafonds, trois tuyaux et non quatre (le storyboard ne nomme que trois
// appareils), leur diamètre suit la racine du débit (la section du tuyau est proportionnelle aux Go/s), et le bloc
// « 6 Go » de base revient à côté du tuyau du téléphone sur « six gigaoctets » ; dans etdonc, un seul compteur qui
// monte de 41 à 94 au lieu de deux compteurs (une idée à la fois), et les blocs passent l'un après l'autre devant
// l'entrée du tuyau (le gros sort, le petit prend sa place) ; dans la chute, la carte finie dit « Bonne année ».
// L'écran suit la voix et Le mouvement (univers.md) : chaque élément entre sur le mot qui le nomme (at), easing du kit,
// arcs pour ce qui vole, linéaire seulement pour le défilement continu (le flux du tuyau, le flipbook) et les cases lues
// une à une ; un seul punch zoom (« 14 tokens/s »).
import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Big, Mono, Pop, Say, Scene, W, PAD, arc, clamp, countUp, ease, punch, serif, typed, useAccent, withAlpha} from './kit';
import {LABEL, makeVoix} from './voix/VoixShort';
import {Pixel, type Sprite} from './voix/Pixel';
import {pixelShadow} from './voix/Parts';
import ALIGN from './voix/bande-passante.align.json';
import SCRIPT from './voix/bande-passante.script.json';

const AC = '#8FB8FF'; // catégorie Inférence
const V = makeVoix(ALIGN, SCRIPT, 'voix/prediction-music.mp3');
const {at} = V;
export const BANDEPASSANTEVOIX_DURATION = V.duration;

const gone = (frame: number, until: number) => ease(frame, until, until + 6, [1, 0], 'inOut');
// Entrée / sortie identiques à celles de Scene, pour un calque posé hors de la Scene (le hook).
const useSceneOpacity = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  return interpolate(frame, [0, 6], [0, 1], clamp) * (1 - interpolate(frame, [durationInFrames - 5, durationInFrames], [0, 1], clamp));
};

// ---------- Personnage (pixel art, même format que voix/Pixel.tsx) ----------

const SKIN = '#e3b58e';

// Jean-Claude : front dégarni, cheveux gris sur les côtés, moustache, gilet marron sur chemise blanche. Assis : le bas
// est caché par le bureau.
const JEANCLAUDE: Sprite = {
  rows: [
    '....HHHH....',
    '...HSSSSH...',
    '..HSSSSSSH..',
    '..HSESSESH..',
    '...SSSSSS...',
    '...SMMMMS...',
    '....SSSS....',
    '.CCCCWWCCCC.',
    '.CCCCWWCCCC.',
    '.SCCCWWCCCS.',
    '.SCCCCCCCCS.',
    '...CCCCCC...',
    '...CCCCCC...',
    '...CCCCCC...',
  ],
  palette: {H: '#c8c8c8', S: SKIN, E: '#111', M: '#9a9a9a', C: '#7a5532', W: '#f2f2f2'},
};

// ---------- Objets dessinés (SVG maison) ----------

// Le tuyau entre la mémoire et la puce : même diamètre tout du long, un flux de données qui défile (linéaire, continu).
// `filet` : un mince filet (le hook) ; `flow` : opacité du flux (0 = tuyau vide).
const Tuyau: React.FC<{len: number; d: number; flow?: number; filet?: boolean; speed?: number}> = ({len, d, flow = 1, filet, speed = 6}) => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const wall = Math.max(3, Math.round(d / 14));
  const h = Math.max(3, filet ? d * 0.16 : d * 0.46);
  const dash = Math.max(8, filet ? d * 0.4 : d * 0.7);
  const gap = filet ? dash * 4 : dash * 1.7;
  const off = (frame * speed) % gap;
  const xs: number[] = [];
  for (let x = off - gap; x < len; x += gap) xs.push(x);
  return (
    <svg width={len} height={d} viewBox={`0 0 ${len} ${d}`} style={{display: 'block'}}>
      <rect x={0} y={0} width={len} height={d} fill="#1e1e1e" />
      {flow > 0
        ? xs.map((x, k) => {
            const x0 = Math.max(0, x);
            const x1 = Math.min(len, x + dash);
            return x1 > x0 ? <rect key={k} x={x0} y={(d - h) / 2} width={x1 - x0} height={h} fill={accent} opacity={flow} /> : null;
          })
        : null}
      <rect x={0} y={0} width={len} height={wall} fill="#9a9a9a" />
      <rect x={0} y={d - wall} width={len} height={wall} fill="#9a9a9a" />
    </svg>
  );
};

// La puce : un carré à broches, son cœur en couleur d'accent (glow de 0 à 1 quand les données arrivent).
const Puce: React.FC<{w: number; glow?: number; ring?: string}> = ({w, glow = 0, ring = '#cfcfcf'}) => {
  const accent = useAccent();
  return (
    <svg width={w} height={w} viewBox="0 0 100 100" style={{display: 'block'}}>
      {[24, 38, 52, 66].map((p) => (
        <g key={p} fill="#9a9a9a">
          <rect x={p} y={2} width={8} height={14} />
          <rect x={p} y={84} width={8} height={14} />
          <rect x={2} y={p} width={14} height={8} />
          <rect x={84} y={p} width={14} height={8} />
        </g>
      ))}
      <rect x={14} y={14} width={72} height={72} fill="#2a2a2a" stroke={ring} strokeWidth={4} />
      <rect x={30} y={30} width={40} height={40} fill={accent} opacity={0.45 + 0.55 * glow} />
      {glow > 0 ? <rect x={22} y={22} width={56} height={56} fill="none" stroke={accent} strokeWidth={3} opacity={glow} /> : null}
    </svg>
  );
};

// La mémoire : une boîte (style du modèle de Parts) remplie de blocs de poids, 4 x 4. show(k) : apparition du bloc k ;
// lit(k) : le bloc k est en train d'être lu (couleur d'accent).
const CELL = 50;
const CGAP = 16;
const MPAD = 20;
const MBORD = 6;
const MEM_W = 4 * CELL + 3 * CGAP + 2 * MPAD + 2 * MBORD; // 300
const cellXY = (k: number): [number, number] => [MBORD + MPAD + (k % 4) * (CELL + CGAP), MBORD + MPAD + Math.floor(k / 4) * (CELL + CGAP)];
const Memoire: React.FC<{show?: (k: number) => number; lit?: (k: number) => number; ring?: string}> = ({show = () => 1, lit = () => 0, ring = '#fff'}) => {
  const accent = useAccent();
  return (
    <div style={{position: 'relative', width: MEM_W, height: MEM_W, background: '#2a2a2a', border: `${MBORD}px solid ${ring}`, boxShadow: pixelShadow('#222'), boxSizing: 'border-box'}}>
      {Array.from({length: 16}, (_, k) => {
        const p = show(k);
        const [x, y] = cellXY(k);
        return (
          <div key={k} style={{position: 'absolute', left: x - MBORD, top: y - MBORD, width: CELL, height: CELL, background: lit(k) > 0 ? accent : '#5a5a5a', opacity: p > 0 ? 1 : 0, transform: `scale(${0.6 + 0.4 * p})`}} />
        );
      })}
    </div>
  );
};

// Un bloc de poids de n x n cases (etdonc) ; lit(k) : la case k a été lue.
const BCELL = 26;
const BGAP = 6;
const Bloc: React.FC<{n: number; lit: (k: number) => boolean}> = ({n, lit}) => {
  const accent = useAccent();
  return (
    <div style={{display: 'grid', gridTemplateColumns: `repeat(${n}, ${BCELL}px)`, gap: BGAP, padding: 14, background: '#2a2a2a', border: '5px solid #fff', boxShadow: pixelShadow('#222'), width: 'fit-content'}}>
      {Array.from({length: n * n}, (_, k) => <div key={k} style={{width: BCELL, height: BCELL, background: lit(k) ? accent : '#5a5a5a'}} />)}
    </div>
  );
};
const blocW = (n: number) => n * BCELL + (n - 1) * BGAP + 28 + 10;

// La carte graphique (intro) : équerre à gauche, connecteur doré, et la grille des cœurs de calcul (core(k) de 0 à 1).
const GCOLS = 20;
const GROWS = 9;
const CarteGraphique: React.FC<{core: (k: number) => number}> = ({core}) => {
  const accent = useAccent();
  const C = 22;
  const G = 7;
  return (
    <div style={{position: 'relative', width: 700, height: 340}}>
      <div style={{position: 'absolute', left: 0, top: -20, width: 26, height: 360, background: '#9a9a9a'}} />
      <div style={{position: 'absolute', left: 26, top: 0, width: 674, height: 320, background: '#1f3a2a', border: '5px solid #cfcfcf', boxSizing: 'border-box'}} />
      {Array.from({length: 14}, (_, k) => <div key={k} style={{position: 'absolute', left: 150 + k * 30, top: 320, width: 20, height: 20, background: '#d9a52b'}} />)}
      <div style={{position: 'absolute', left: 26 + (674 - (GCOLS * C + (GCOLS - 1) * G)) / 2, top: (320 - (GROWS * C + (GROWS - 1) * G)) / 2, display: 'grid', gridTemplateColumns: `repeat(${GCOLS}, ${C}px)`, gap: G}}>
        {Array.from({length: GCOLS * GROWS}, (_, k) => {
          const v = core(k);
          return <div key={k} style={{width: C, height: C, background: v > 0 ? withAlpha(accent, 0.3 + 0.7 * v) : '#34503f'}} />;
        })}
      </div>
    </div>
  );
};

// La main qui tape avec deux doigts (pixel art en rectangles) ; press = [doigt gauche, doigt droit], de 0 à 1.
const Main: React.FC<{u: number; press: [number, number]}> = ({u, press}) => (
  <svg width={9 * u} height={11 * u} viewBox="0 0 9 11" shapeRendering="crispEdges" style={{display: 'block', overflow: 'visible'}}>
    <rect x={0} y={0} width={9} height={2} fill="#5b7fb5" />
    <rect x={1} y={2} width={7} height={3} fill={SKIN} />
    {[2, 5].map((x, i) => (
      <g key={x} transform={`translate(0 ${2 * press[i]})`}>
        <rect x={x} y={5} width={2} height={3.5} fill={SKIN} />
        <rect x={x} y={8.5} width={2} height={0.6} fill="#f0d0b8" />
      </g>
    ))}
  </svg>
);

// Le chronomètre (nom) : l'aiguille fait un tour par seconde.
const Chrono: React.FC<{w: number; t: number}> = ({w, t}) => {
  const accent = useAccent();
  const a = t * 2 * Math.PI;
  return (
    <svg width={w} height={w * 1.15} viewBox="0 0 100 115" style={{display: 'block'}}>
      <rect x={42} y={0} width={16} height={12} fill="#cfcfcf" />
      <circle cx={50} cy={64} r={44} fill="#111" stroke="#fff" strokeWidth={7} />
      <path d={`M50 64 L${50 + 34 * Math.sin(a)} ${64 - 34 * Math.cos(a)}`} stroke={accent} strokeWidth={7} strokeLinecap="round" />
      <circle cx={50} cy={64} r={6} fill="#fff" />
    </svg>
  );
};

// Le téléphone, la carte de joueur et la puce de data center (plafonds).
const Telephone: React.FC = () => (
  <svg width={74} height={136} viewBox="0 0 74 136" style={{display: 'block'}}>
    <rect x={3} y={3} width={68} height={130} rx={12} fill="#2a2a2a" stroke="#cfcfcf" strokeWidth={5} />
    <rect x={11} y={16} width={52} height={100} fill="#1c2633" />
    <rect x={30} y={8} width={14} height={4} fill="#cfcfcf" />
  </svg>
);
const CarteJoueur: React.FC = () => (
  <svg width={140} height={96} viewBox="0 0 140 96" style={{display: 'block'}}>
    <rect x={0} y={0} width={10} height={96} fill="#9a9a9a" />
    <rect x={10} y={6} width={128} height={74} fill="#2a2a2a" stroke="#cfcfcf" strokeWidth={4} />
    {[44, 104].map((cx) => (
      <g key={cx}>
        <circle cx={cx} cy={43} r={26} fill="#5a5a5a" />
        <path d={`M${cx} 21 L${cx} 65 M${cx - 22} 43 L${cx + 22} 43`} stroke="#2a2a2a" strokeWidth={6} />
        <circle cx={cx} cy={43} r={7} fill="#cfcfcf" />
      </g>
    ))}
    <rect x={40} y={80} width={70} height={10} fill="#d9a52b" />
  </svg>
);

// Le Mac (etdonc) : un boîtier carré en aluminium, deux ports et un voyant en façade.
const Mac: React.FC = () => {
  const accent = useAccent();
  return (
    <svg width={260} height={130} viewBox="0 0 260 130" style={{display: 'block'}}>
      <rect x={0} y={10} width={260} height={110} rx={18} fill="#c9ced4" />
      <rect x={0} y={10} width={260} height={18} rx={9} fill="#e3e6ea" />
      <rect x={10} y={120} width={240} height={8} fill="#8a9099" />
      {[40, 64].map((x) => <rect key={x} x={x} y={70} width={14} height={24} rx={4} fill="#5a6068" />)}
      <circle cx={220} cy={84} r={6} fill={accent} />
    </svg>
  );
};

// Le dictionnaire (ou l'édition de poche) ouvert : deux pages crème, couverture rouge. open : 1 ouvert, 0 fermé
// (la moitié droite se rabat sur la gauche) ; flip : une page qui tourne (0 à 1), ou null.
const Livre: React.FC<{pw: number; ph: number; open?: number; flip?: number | null; cover?: string}> = ({pw, ph, open = 1, flip = null, cover = '#7a2a2a'}) => {
  const S = pw + 8; // la reliure
  const lines = (x: number) =>
    [0.18, 0.32, 0.46, 0.6, 0.74].map((y, k) => <rect key={k} x={x + pw * 0.14} y={ph * y} width={pw * [0.72, 0.6, 0.68, 0.5, 0.64][k]} height={Math.max(3, ph * 0.04)} fill="#9a9384" />);
  const sx = Math.cos(Math.PI * (1 - open)); // 1 ouvert, -1 rabattu
  const half = (s: number, fill: string, withLines: boolean) => {
    const x = s >= 0 ? S : S + pw * s;
    return (
      <g>
        <rect x={x} y={0} width={Math.abs(pw * s)} height={ph} fill={fill} />
        {withLines && s > 0.3 ? <g transform={`translate(${S} 0) scale(${s} 1) translate(${-S} 0)`}>{lines(S)}</g> : null}
      </g>
    );
  };
  const fs = flip === null ? null : Math.cos(Math.PI * flip);
  return (
    <svg width={2 * pw + 16} height={ph + 14} viewBox={`0 0 ${2 * pw + 16} ${ph + 14}`} style={{display: 'block', overflow: 'visible'}}>
      <rect x={0} y={6} width={sx > 0 ? 2 * pw + 16 : pw + 12} height={ph + 8} fill={cover} />
      <rect x={8} y={0} width={pw} height={ph} fill="#efe9dc" />
      {lines(8)}
      {sx > 0 ? (
        <>
          <rect x={S} y={6} width={(pw + 8) * sx} height={ph + 8} fill={cover} />
          {half(sx, '#efe9dc', true)}
        </>
      ) : (
        <rect x={S + (pw + 4) * sx} y={2} width={Math.abs((pw + 4) * sx)} height={ph + 10} fill={cover} />
      )}
      {fs !== null && open > 0.99 ? half(fs, fs > 0 ? '#e6dfcf' : '#d6cdb9', false) : null}
      <rect x={S - 2} y={0} width={4} height={ph} fill="#9a9384" />
    </svg>
  );
};

// La carte de vœux debout sur le bureau : bord rouge, le texte écrit à la main.
const CarteVoeux: React.FC<{children?: React.ReactNode}> = ({children}) => (
  <div style={{width: 250, height: 180, background: '#f4efe4', border: '8px solid #c0392b', boxShadow: pixelShadow('#1a1a1a'), boxSizing: 'border-box', padding: '18px 20px', fontFamily: serif, fontWeight: 800, fontStyle: 'italic', fontSize: 60, lineHeight: 1, color: '#2a2a2a'}}>
    {children}
  </div>
);

// Le bureau de Jean-Claude (jeanclaude et chute) : le mur, la fenêtre (night de 0, jour, à 1, nuit), Jean-Claude assis,
// le bureau, la carte de vœux à gauche et le livre à droite (book, posé en x 470, y 300).
const Bureau: React.FC<{night: number; card: React.ReactNode; book: React.ReactNode}> = ({night, card, book}) => {
  const sky = interpolate(night, [0, 1], [0, 1]);
  const mix = (a: number[], b: number[]) => `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * sky)).join(',')})`;
  return (
    <div style={{position: 'relative', height: 640}}>
      <div style={{position: 'absolute', left: -PAD, top: 0, width: 1080, height: 420, background: mix([52, 44, 38], [30, 26, 24])}} />
      {/* La fenêtre : ciel de jour, puis de nuit avec la lune. */}
      <div style={{position: 'absolute', left: 560, top: 20, width: 300, height: 230, background: mix([150, 205, 240], [16, 26, 58]), border: '12px solid #8a6a4a', boxSizing: 'border-box', overflow: 'hidden'}}>
        <div style={{position: 'absolute', left: 40, top: 40, width: 56, height: 56, borderRadius: 28, background: '#ffe680', opacity: 1 - night}} />
        <div style={{position: 'absolute', left: 170, top: 36, width: 50, height: 50, borderRadius: 25, background: '#f4f1d0', opacity: night}} />
        <div style={{position: 'absolute', left: 184, top: 30, width: 40, height: 40, borderRadius: 20, background: mix([150, 205, 240], [16, 26, 58]), opacity: night}} />
        {[[40, 130], [110, 60], [90, 160], [240, 140]].map(([x, y], k) => <div key={k} style={{position: 'absolute', left: x, top: y, width: 6, height: 6, background: '#fff', opacity: night}} />)}
        <div style={{position: 'absolute', left: 132, top: 0, width: 12, height: 230, background: '#8a6a4a'}} />
        <div style={{position: 'absolute', left: 0, top: 100, width: 300, height: 12, background: '#8a6a4a'}} />
      </div>
      <div style={{position: 'absolute', left: 300, top: 150, lineHeight: 0}}>
        <Pixel sprite={JEANCLAUDE} px={18} seed={3} />
      </div>
      {/* Le bureau : plateau et façade. */}
      <div style={{position: 'absolute', left: -PAD, top: 400, width: 1080, height: 36, background: '#7a5532'}} />
      <div style={{position: 'absolute', left: -PAD, top: 436, width: 1080, height: 204, background: '#4e3520'}} />
      <div style={{position: 'absolute', left: 20, top: 240, transform: 'rotate(-3deg)'}}>{card}</div>
      <div style={{position: 'absolute', left: 470, top: 300, lineHeight: 0}}>{book}</div>
    </div>
  );
};

// ---------- 0. Hook : la mémoire, le tuyau où coule un mince filet, la puce ; et le titre ----------

const Hook: React.FC = () => {
  const op = useSceneOpacity();
  const accent = useAccent();
  const bande = at('hook', 'bande');
  const memoire = at('hook', 'mémoire');
  return (
    <>
      {/* Le schéma au-dessus du titre (aucun sous-titre dans le hook), posé dès la première image. */}
      <div style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 660, opacity: op}}>
        <div style={{position: 'absolute', left: 130, top: 240, transform: 'scale(0.6)', transformOrigin: '0 0'}}>
          <Memoire />
        </div>
        <div style={{position: 'absolute', left: 310, top: 240 + 90 - 18}}>
          <Tuyau len={430} d={36} filet speed={4} />
        </div>
        <div style={{position: 'absolute', left: 740, top: 240}}>
          <Puce w={180} />
        </div>
      </div>
      <Scene>
        <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
          <Pop at={0}><Say size={100}>C'est quoi ?</Say></Pop>
          {/* pop in : le terme sur « bande », puis « mémoire » sur son mot. */}
          <Pop at={bande}><Big size={124} color={accent}><span style={{whiteSpace: 'nowrap'}}>bande passante</span></Big></Pop>
          <Pop at={memoire}><Big size={124} color={accent}>mémoire</Big></Pop>
        </div>
      </Scene>
    </>
  );
};

// ---------- 1. Intro : la carte graphique et ses centaines de cœurs ; le chat qui écrit token après token, à deux doigts ----------

const TOKENS = ['Voici', 'une', 'idée', 'de', 'carte', 'de', 'vœux', 'pour'];
const TOK_STEP = 14;

const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const milliers = at('intro', 'milliers');
  const ecrit = at('intro', 'écrit');
  const token = at('intro', 'token');
  const deux = at('intro', 'deux');
  // La carte graphique passe en retrait quand la voix passe à l'écriture.
  const r = ease(frame, ecrit, ecrit + 12, [0, 1], 'inOut');
  // stagger : les cœurs s'allument en vague diagonale sur « milliers » (flash, puis restent allumés).
  const core = (k: number) => {
    const t = milliers + (k % GCOLS) + Math.floor(k / GCOLS);
    return frame < t ? 0 : interpolate(frame - t, [0, 4, 14], [0, 1, 0.55], clamp);
  };
  // Les tokens arrivent un par un, lentement ; à partir de « deux doigts », chaque token tombe sur une frappe.
  const tokAt = (k: number) => token + TOK_STEP * k;
  const press = (i: number): number => {
    let p = 0;
    for (let k = 0; k < TOKENS.length; k++) {
      const t = tokAt(k);
      if (k % 2 === i && t >= deux - 2) p = Math.max(p, interpolate(frame - t, [-3, 0, 5], [0, 1, 0], clamp));
    }
    return p;
  };
  const keyDown = Math.max(press(0), press(1));
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 640}}>
        {/* La carte graphique, posée dès l'entrée. */}
        <Pop at={2} style={{position: 'absolute', left: (W - 700) / 2, top: 20, opacity: 1 - 0.6 * r}}>
          <div style={{transform: `translateY(${-10 * r}px) scale(${1 - 0.45 * r})`, transformOrigin: '50% 0'}}>
            <CarteGraphique core={core} />
          </div>
        </Pop>
        {/* pop in : la fenêtre de chat sur « token » ; typewriter au rythme des tokens, le dernier arrivé en couleur. */}
        <Pop at={token} style={{position: 'absolute', left: 0, top: 230, width: W}}>
          <div style={{border: '4px solid #444', borderRadius: 34, padding: '26px 34px', height: 190, boxSizing: 'border-box', display: 'flex', flexWrap: 'wrap', alignContent: 'flex-start', columnGap: 26, rowGap: 14}}>
            {TOKENS.map((t, k) => {
              const a = tokAt(k);
              if (frame < a) return null;
              const cur = frame < tokAt(k + 1);
              return (
                <div key={k} style={{transform: `scale(${ease(frame, a, a + 6, [0.7, 1])})`, transformOrigin: '0 100%'}}>
                  <Mono size={56} color={cur ? accent : '#fff'}>{t}</Mono>
                </div>
              );
            })}
          </div>
        </Pop>
        {/* pop in : deux doigts qui tapent sur une touche, sur « deux doigts », en rythme avec les tokens. */}
        <Pop at={deux} style={{position: 'absolute', left: W / 2 - 110, top: 436, width: 220, lineHeight: 0}}>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <Main u={18} press={[press(0), press(1)]} />
          </div>
          <div style={{width: 220, height: 60, marginTop: -8 + 6 * keyDown, background: '#3a3a3a', border: '5px solid #9a9a9a', borderBottomWidth: 14 - 6 * keyDown, boxSizing: 'border-box'}} />
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 2. Base : la mémoire se remplit de poids, « 6 Go » ; tout traverse le tuyau à chaque token ----------

const BM = {x: 0, y: 150}; // la mémoire
const BPY = BM.y + MEM_W / 2; // axe du tuyau (300)
const BCHIP = {x: 640, y: 200, w: 200};
const BD = 56; // diamètre du tuyau

const Base: React.FC = () => {
  const frame = useCurrentFrame();
  const parametres = at('base', 'paramètres');
  const memoire = at('base', 'mémoire');
  const giga = at('base', 'gigaoctets');
  const relus = at('base', 'relus');
  const a2 = at('base', 'à');
  // Deux passages complets : chaque bloc part en cascade (1 image d'écart), traverse le tuyau en 10 images.
  const passes = [relus, a2];
  const TRAVEL = 10;
  const arrive = passes.map((p) => p + 15 + TRAVEL);
  const flying = (k: number) =>
    passes.map((p) => {
      const t = p + k;
      return frame >= t && frame < t + TRAVEL ? ease(frame, t, t + TRAVEL, [0, 1], 'inOut') : -1;
    });
  const glow = Math.max(...arrive.map((a) => (frame >= a - 12 ? interpolate(frame - a, [-12, 0, 14], [0.4, 1, 0.3], clamp) : 0)));
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 640}}>
        {/* Le décor posé dès l'entrée : la mémoire (vide), le tuyau, la puce. stagger : les blocs de poids sur « paramètres ». */}
        <Pop at={0} style={{position: 'absolute', left: BM.x, top: BM.y}}>
          <Memoire show={(k) => ease(frame, parametres + 2 * k, parametres + 2 * k + 8)} lit={(k) => (flying(k).some((p) => p >= 0 && p < 0.3) ? 1 : 0)} />
        </Pop>
        <div style={{position: 'absolute', left: BM.x + MEM_W, top: BPY - BD / 2}}>
          <Tuyau len={BCHIP.x - MEM_W - BM.x} d={BD} flow={frame >= relus ? 0.5 : 0.18} />
        </div>
        <Pop at={2} style={{position: 'absolute', left: BCHIP.x, top: BCHIP.y}}>
          <Puce w={BCHIP.w} glow={glow} />
        </Pop>
        {/* Les blocs qui traversent le tuyau vers la puce, en cascade, sur « relus » puis sur « à chaque token ». */}
        {Array.from({length: 16}, (_, k) =>
          flying(k).map((p, j) => {
            if (p < 0) return null;
            const [cx, cy] = cellXY(k);
            const sx = BM.x + cx + CELL / 2;
            const sy = BM.y + cy + CELL / 2;
            const x = interpolate(p, [0, 0.4, 1], [sx, BM.x + MEM_W + 10, BCHIP.x + 70]);
            const y = interpolate(p, [0, 0.4, 1], [sy, BPY, BPY]);
            return <div key={`${k}-${j}`} style={{position: 'absolute', left: x - 18, top: y - 18, width: 36, height: 36, background: AC}} />;
          }),
        )}
        {/* Libellés : « mémoire » sous la boîte, « 6 Go » au-dessus, chacun sur son mot. */}
        <Pop at={memoire} style={{position: 'absolute', left: BM.x, top: BM.y + MEM_W + 24}}>
          <Mono size={52} color={LABEL}>mémoire</Mono>
        </Pop>
        <Pop at={giga} style={{position: 'absolute', left: BM.x, top: BM.y - 96}}>
          <Mono size={72}>6 Go</Mono>
        </Pop>
        {/* pop in : un token sort de la puce à la fin de chaque passage. */}
        {arrive.map((a, j) => (
          <Pop key={j} at={a} style={{position: 'absolute', left: BCHIP.x + 10, top: BCHIP.y + BCHIP.w + 24 + 84 * j}}>
            <div style={{border: `4px solid ${AC}`, borderRadius: 18, padding: '4px 20px'}}>
              <Mono size={52} color="#fff">token</Mono>
            </div>
          </Pop>
        ))}
      </div>
    </Scene>
  );
};

// ---------- 3. Le nom : le tuyau en gros plan, le chronomètre, puis le terme en français et en anglais ----------

const NY = 400; // haut du schéma
const NM = 180; // mémoire réduite
const ND = 110; // diamètre du tuyau
const NCHIP = 188;

const Nom: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const puce = at('nom', 'puce');
  const memoire = at('nom', 'mémoire');
  const seconde = at('nom', 'seconde');
  const cest = at('nom', "c'est");
  const bande = at('nom', 'bande');
  const memoire2 = at('nom', 'mémoire', 1);
  const memory = at('nom', 'memory');
  const dim = ease(frame, cest, cest + 8, [1, 0.35], 'inOut');
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 640}}>
        <div style={{position: 'absolute', inset: 0, opacity: dim}}>
          {/* Le décor : la mémoire, le tuyau (même diamètre tout du long), la puce. highlight : la puce sur « puce »,
              la mémoire sur « mémoire ». */}
          <div style={{position: 'absolute', left: 0, top: NY + (NCHIP - NM) / 2, transform: `scale(${NM / MEM_W})`, transformOrigin: '0 0'}}>
            <Memoire ring={frame >= memoire ? accent : '#fff'} />
          </div>
          <div style={{position: 'absolute', left: NM, top: NY + NCHIP / 2 - ND / 2}}>
            <Tuyau len={W - NM - NCHIP} d={ND} flow={0.85} speed={9} />
          </div>
          <div style={{position: 'absolute', left: W - NCHIP, top: NY}}>
            <Puce w={NCHIP} ring={frame >= puce ? accent : '#cfcfcf'} glow={frame >= puce ? 0.6 : 0} />
          </div>
          {/* pop in : le chronomètre sous le tuyau, sur « seconde » ; il part quand le terme arrive. */}
          <Pop at={seconde} style={{position: 'absolute', left: (W - 110) / 2, top: NY + NCHIP / 2 + ND / 2 + 24, opacity: gone(frame, bande)}}>
            <Chrono w={110} t={(frame - seconde) / 30} />
          </Pop>
        </div>
        {/* pop in : le terme en grand sur « bande », « mémoire » sur son mot, puis le nom anglais sur « memory »
            (sous-titres masqués par onscreen). */}
        <div style={{position: 'absolute', left: 0, top: 0, width: W, display: 'flex', flexDirection: 'column', gap: 6}}>
          <Pop at={bande}><Big size={124} color={accent}><span style={{whiteSpace: 'nowrap'}}>bande passante</span></Big></Pop>
          <Pop at={memoire2}><Big size={124} color={accent}>mémoire</Big></Pop>
          <Pop at={memory} style={{marginTop: 20}}><Big size={96}><span style={{whiteSpace: 'nowrap'}}>memory bandwidth</span></Big></Pop>
        </div>
      </div>
    </Scene>
  );
};

// ---------- 4. L'image : Jean-Claude relit son dictionnaire pour chaque mot de sa carte de vœux ----------

const FLIP = 5; // une page tourne en 5 images (flipbook, défilement continu)

const JeanClaude: React.FC = () => {
  const frame = useCurrentFrame();
  const deux = at('jeanclaude', 'deux');
  const pages = at('jeanclaude', 'pages');
  const chaque = at('jeanclaude', 'chaque');
  const mot = at('jeanclaude', 'mot');
  const carte = at('jeanclaude', 'carte');
  const voeux = at('jeanclaude', 'vœux');
  const tourner = at('jeanclaude', 'tourner');
  const soiree = at('jeanclaude', 'soirée');
  // Les pages défilent sur « deux mille pages » jusqu'à « mot », puis de nouveau sur « tourner les pages ».
  const flipping = (frame >= deux && frame < mot) || frame >= tourner;
  const flip = flipping ? ((frame - (frame >= tourner ? tourner : deux)) % FLIP) / FLIP : null;
  // Le dictionnaire se referme sur « carte » et se rouvre sur « vœux ».
  const open = frame < voeux ? ease(frame, carte, carte + 8, [1, 0], 'inOut') : ease(frame, voeux, voeux + 8, [0, 1], 'inOut');
  const night = ease(frame, soiree, soiree + 14, [0, 1], 'inOut');
  return (
    <Scene gap={0}>
      <Bureau
        night={night}
        // typewriter : un seul mot s'écrit sur la carte, sur « mot ».
        card={<CarteVoeux>{typed(frame, mot, 'Bonne', 22)}</CarteVoeux>}
        book={<Livre pw={190} ph={140} open={open} flip={flip} />}
      />
      {/* Le libellé du dictionnaire, sur « pages » ; il part sur « chaque mot ». */}
      <Pop at={pages} style={{position: 'absolute', left: 520, top: 480, opacity: gone(frame, chaque)}}>
        <Mono size={52} color={LABEL}>2 000 pages</Mono>
      </Pop>
    </Scene>
  );
};

// ---------- 5. Les plafonds : trois appareils, trois tuyaux, et les tokens par seconde en barres à la même échelle ----------

const ROW_Y = [110, 320, 530]; // axe de chaque rangée
const PIPE_X = 160;
const PIPE_L = 160;
const PIPE_D = [10, 42, 58]; // diamètre ∝ racine du débit : 85, 1 792 et 3 350 Go/s
const BAR_X = 345;
const BAR_H = 44;
const PX_PER_TOK = 530 / 558; // même échelle pour les trois barres
const TOKS = [14, 299, 558];

const Plafonds: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const telephone = at('plafonds', 'téléphone');
  const qvc = at('plafonds', 'quatre-vingt-cinq');
  const six = at('plafonds', 'six');
  const quatorze = at('plafonds', 'quatorze');
  const tokens = at('plafonds', 'tokens');
  const carte = at('plafonds', 'carte');
  const trois = at('plafonds', 'trois');
  const puce = at('plafonds', 'puce');
  const plus = at('plafonds', 'plus', 1);
  const cinq = at('plafonds', 'cinq', 1);
  const devices = [
    {at: telephone, el: <Telephone />, w: 74, h: 136},
    {at: carte, el: <CarteJoueur />, w: 140, h: 96},
    {at: puce, el: <Puce w={120} />, w: 120, h: 120},
  ];
  const pipeAt = [qvc, carte + 6, puce + 6];
  const barAt = [quatorze, trois, plus];
  const barDur = [8, 16, 20];
  const labels = ['14 tokens/s', '300', 'plus de 500'];
  const labelAt = [quatorze + 5, trois + 5, cinq];
  const out6 = gone(frame, quatorze);
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 640}}>
        {ROW_Y.map((cy, i) => {
          const wipe = ease(frame, pipeAt[i], pipeAt[i] + 10);
          const bar = TOKS[i] * PX_PER_TOK * ease(frame, barAt[i], barAt[i] + barDur[i]);
          const d = devices[i];
          return (
            <React.Fragment key={i}>
              {/* pop in : l'appareil, sur son nom. */}
              <Pop at={d.at} style={{position: 'absolute', left: (140 - d.w) / 2, top: cy - d.h / 2, lineHeight: 0}}>
                {d.el}
              </Pop>
              {/* wipe : le tuyau se déroule depuis l'appareil. */}
              <div style={{position: 'absolute', left: PIPE_X, top: cy - PIPE_D[i] / 2, width: PIPE_L * wipe, overflow: 'hidden', opacity: frame >= pipeAt[i] ? 1 : 0}}>
                <Tuyau len={PIPE_L} d={PIPE_D[i]} flow={0.8} speed={2 + 3 * i} />
              </div>
              {/* bar grow, en cascade sur leur mot, à la même échelle. */}
              <div style={{position: 'absolute', left: BAR_X, top: cy - BAR_H / 2, width: Math.max(frame >= barAt[i] ? 4 : 0, bar), height: BAR_H, background: accent}} />
              {/* Le libellé tel que dit par la voix, 5 images après la barre ; punch zoom (le seul du short) sur « 14 tokens/s ». */}
              <Pop at={labelAt[i]} style={{position: 'absolute', left: BAR_X, top: cy - BAR_H / 2 - 74}}>
                <div style={{transform: `scale(${i === 0 ? punch(frame, tokens) : 1})`, transformOrigin: '0 100%'}}>
                  <Mono size={56} color="#fff">{labels[i]}</Mono>
                </div>
              </Pop>
            </React.Fragment>
          );
        })}
        {/* Le libellé du tuyau du téléphone, 5 images après lui. */}
        <Pop at={qvc + 5} style={{position: 'absolute', left: PIPE_X - 10, top: ROW_Y[0] + 34}}>
          <Mono size={48} color={LABEL}>85 Go/s</Mono>
        </Pop>
        {/* Le bloc de 6 Go de la scène base revient sur « six gigaoctets », au-dessus du tuyau ; il part sur « quatorze ». */}
        <div style={{position: 'absolute', left: PIPE_X + 8, top: 0, display: 'flex', alignItems: 'center', gap: 18, opacity: out6}}>
          <Pop at={six} style={{lineHeight: 0}}>
            <div style={{width: 75, height: 75, overflow: 'hidden'}}>
              <div style={{transform: 'scale(0.25)', transformOrigin: '0 0'}}><Memoire /></div>
            </div>
          </Pop>
          <Pop at={six + 5}><Mono size={48}>6 Go</Mono></Pop>
        </div>
      </div>
    </Scene>
  );
};

// ---------- 6. Et donc : sur le même Mac, le bloc 16 bits passe lentement, le bloc 4 bits passe vite ----------

const EPY = 300; // axe du tuyau
const ED = 50;
const EPIPE = {x: 250, len: 370};
const BIG_N = 6;
const SMALL_N = 3;
const ENTRY = (n: number): [number, number] => [EPIPE.x - 24 - blocW(n), EPY - blocW(n) / 2]; // devant l'entrée du tuyau

const EtDonc: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const mac = at('etdonc', 'Mac');
  const quarante = at('etdonc', 'quarante');
  const seize = at('etdonc', 'seize');
  const bits1 = at('etdonc', 'bits', 0);
  const qvq = at('etdonc', 'quatre-vingt-quatorze');
  const bits2 = at('etdonc', 'bits', 1);
  // Lecture case par case (compte linéaire) : le gros bloc en 60 images, le petit en 24.
  const bigRead = (k: number) => frame >= quarante + (k * 60) / (BIG_N * BIG_N);
  const smallStart = qvq + 10;
  const smallRead = (k: number) => frame >= smallStart + (k * 24) / (SMALL_N * SMALL_N);
  const reading = (frame >= quarante && frame < quarante + 62) || (frame >= smallStart && frame < smallStart + 26);
  // Le gros bloc laisse la place (descend) après « seize bits » ; le petit arrive en arc devant l'entrée sur « quatre-vingt-quatorze ».
  const leave = ease(frame, bits1 + 8, bits1 + 18, [0, 1], 'inOut');
  const [bx0, by0] = ENTRY(BIG_N);
  const bigY = by0 + leave * (430 - by0);
  const come = ease(frame, qvq, qvq + 12, [0, 1], 'inOut');
  const [sx1, sy1] = ENTRY(SMALL_N);
  const [sx, sy] = arc(come, [40, 20], [sx1, sy1], 40);
  // Le compteur : count-up jusqu'à 41 sur « quarante et un », puis de 41 à 94 sur « quatre-vingt-quatorze ».
  const n = frame < qvq ? countUp(frame, quarante, 41, 30) : countUp(frame, qvq, 94, 30, 0, 41);
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 640}}>
        {/* Le décor : le tuyau et le Mac. */}
        <div style={{position: 'absolute', left: EPIPE.x, top: EPY - ED / 2}}>
          <Tuyau len={EPIPE.len} d={ED} flow={reading ? 0.9 : 0.15} speed={8} />
        </div>
        <div style={{position: 'absolute', left: EPIPE.x + EPIPE.len, top: EPY - 70, lineHeight: 0}}>
          <Mac />
        </div>
        <Pop at={mac} style={{position: 'absolute', left: EPIPE.x + EPIPE.len, top: EPY - 150}}>
          <Mono size={52} color={LABEL}>Mac</Mono>
        </Pop>
        {/* Le gros bloc, posé dès l'entrée devant le tuyau ; son libellé sur « seize ». */}
        <div style={{position: 'absolute', left: bx0, top: bigY, opacity: 1 - 0.45 * leave, display: 'flex', alignItems: 'flex-end', gap: 20}}>
          <Pop at={0}><Bloc n={BIG_N} lit={bigRead} /></Pop>
        </div>
        <Pop at={seize} style={{position: 'absolute', left: bx0 + blocW(BIG_N) + 24, top: bigY + blocW(BIG_N) - 64, opacity: 1 - 0.45 * leave}}>
          <Mono size={52} color="#fff">16 bits</Mono>
        </Pop>
        {/* Le petit bloc, posé dès l'entrée en haut à gauche ; son libellé sur le second « bits ». */}
        <div style={{position: 'absolute', left: frame >= qvq ? sx : 40, top: frame >= qvq ? sy : 20}}>
          <Pop at={2}><Bloc n={SMALL_N} lit={smallRead} /></Pop>
        </div>
        <Pop at={bits2} style={{position: 'absolute', left: sx1 + blocW(SMALL_N) + 20, top: sy1 - 70}}>
          <Mono size={52} color="#fff">4 bits</Mono>
        </Pop>
        {/* count-up : le compteur sous le Mac, sur « quarante et un ». */}
        <Pop at={quarante} style={{position: 'absolute', left: EPIPE.x + EPIPE.len, top: EPY + 90, display: 'flex', flexDirection: 'column', gap: 4}}>
          <Mono size={110} color={accent}>{n}</Mono>
          <Mono size={52} color={LABEL}>tokens/s</Mono>
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 7. Chute : Jean-Claude de nuit, avec une édition de poche ; la carte est finie ----------

const Chute: React.FC = () => {
  const frame = useCurrentFrame();
  const lire = at('chute', 'lire');
  // flipbook : l'édition de poche tourne ses pages à toute vitesse sur « lire plus vite ».
  const flip = frame >= lire && frame < lire + 30 ? ((frame - lire) % 4) / 4 : null;
  return (
    <Scene gap={0}>
      <div style={{transform: 'scale(1.1)', transformOrigin: '50% 60%'}}>
        <Bureau
          night={1}
          card={<CarteVoeux>Bonne<br />année</CarteVoeux>}
          book={
            <div style={{paddingLeft: 70, paddingTop: 44}}>
              <Livre pw={100} ph={80} flip={flip} cover="#2f5b8a" />
            </div>
          }
        />
      </div>
    </Scene>
  );
};

// ---------- Montage ----------

const SCENES: Record<string, React.FC> = {hook: Hook, intro: Intro, base: Base, nom: Nom, jeanclaude: JeanClaude, plafonds: Plafonds, etdonc: EtDonc, chute: Chute};

export const BandePassanteVoix: React.FC = () => <V.Montage scenes={SCENES} accent={AC} />;

// Short AI Act (YouTube / TikTok / Instagram), épisode 36, définition, voix off PAL - FR, préparé le 2026-11-09
// (calage provisoire, sans voix). Fiche ai-act de lexique/terms.js (vague 25), qui fait foi pour le calendrier ; sources
// dans voix/ai-act.script.json : page de la Commission (mise à jour du 19 octobre 2026), articles 5, 50, 113 et annexe III
// du règlement (UE) 2024/1689 modifié par l'omnibus 2026/1744. Image de la fiche : la piscine municipale dont le
// règlement arrive en trois fois (le saut du toit, le bonnet, le toboggan). Fil : l'ép. 35 (Shadow AI) parlait des outils
// que l'employeur n'a pas validés ; voilà ce que l'Europe impose déjà à toutes les IA.
// Aucun drapeau ni logo officiel : un cercle incomplet de dix étoiles dessinées, en couleur d'accent, sans fond bleu.
// Titres de presse génériques, sans nom ni logo de journal.
// La piscine (Piscine) a la même taille et la même place dans piscine et chute ; ses trois objets (toit barré, bonnet,
// toboggan) reviennent en petit dans interdits, bonnet et toboggan, pour dire de quel étage on parle.
// L'écran suit la voix et Le mouvement (univers.md) : chaque élément entre sur le mot qui le nomme (at), easing du kit,
// arcs pour ce qui vole (cartes IA, bonnet), un seul punch zoom (« décembre 2027 », dans toboggan).
import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Big, Highlight, Mono, Pop, Scene, arc, clamp, ease, punch, serif, useAccent, withAlpha} from './kit';
import {LABEL, makeVoix} from './voix/VoixShort';
import {Pixel, type Sprite} from './voix/Pixel';
import {Cross, Doc, Msg, pixelShadow} from './voix/Parts';
import ALIGN from './voix/ai-act.align.json';
import SCRIPT from './voix/ai-act.script.json';

const AC = '#F08DC2'; // catégorie Écosystème
const V = makeVoix(ALIGN, SCRIPT, 'voix/prediction-music.mp3');
const {at} = V;
export const AIACTVOIX_DURATION = V.duration;

const RED = '#FF4D4D';
const ORANGE = '#F5A623';
const gone = (frame: number, until: number) => ease(frame, until, until + 6, [1, 0], 'inOut');
// Entrée / sortie identiques à celles de Scene, pour un calque posé hors de la Scene (le hook).
const useSceneOpacity = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  return interpolate(frame, [0, 6], [0, 1], clamp) * (1 - interpolate(frame, [durationInFrames - 5, durationInFrames], [0, 1], clamp));
};

// ---------- Personnages en pixel art (même format que voix/Pixel.tsx) ----------

const SKIN = '#e3b58e';

// Le maître-nageur : casquette rouge, sifflet jaune, polo rouge, short bleu.
const MAITRE: Sprite = {
  rows: [
    '...RRRRRR...',
    '..RRRRRRRR..',
    '...SSSSSS...',
    '...SESSES...',
    '...SSSSSS...',
    '...SSMMSS...',
    '....SSSS....',
    '..PPPYPPPP..',
    '.PPPPYPPPPP.',
    '.PPPYYPPPPP.',
    '.SPPPPPPPPS.',
    '.S.BBBBBB.S.',
    '...BBBBBB...',
    '...SS..SS...',
    '...SS..SS...',
  ],
  palette: {R: '#d9443c', S: SKIN, E: '#111', M: '#b5524f', P: '#d9443c', Y: '#ffd23f', B: '#2f5d9a'},
};

// Le plongeur sur le toit : bonnet, maillot, bras levés.
const PLONGEUR: Sprite = {
  rows: [
    'S..CCCC..S',
    'S.CCCCCC.S',
    'S.SSSSSS.S',
    'S.SESSES.S',
    'SSSSSSSSSS',
    '...SSSS...',
    '..SSSSSS..',
    '..SKKKKS..',
    '..SKKKKS..',
    '...S..S...',
    '...S..S...',
    '..SS..SS..',
  ],
  palette: {C: '#5bb5e8', S: SKIN, E: '#111', K: '#2f5d9a'},
};

// Une personne quelconque (la carte de note sociale) : cheveux bruns, pull vert.
const CITOYEN: Sprite = {
  rows: [
    '...HHHHHH...',
    '..HHHHHHHH..',
    '..HSSSSSSH..',
    '...SESSES...',
    '...SSSSSS...',
    '...SSRRSS...',
    '....SSSS....',
    '..GGGGGGGG..',
    '.GGGGGGGGGG.',
    '.GGGGGGGGGG.',
    '.SGGGGGGGGS.',
  ],
  palette: {H: '#5a3a22', S: SKIN, E: '#111', R: '#b5524f', G: '#4f8a5b'},
};

// ---------- Objets dessinés ----------

// Une étoile à cinq branches (polygone), centrée en (cx, cy).
const starPoints = (cx: number, cy: number, r: number) =>
  Array.from({length: 10}, (_, i) => {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const rr = i % 2 ? r * 0.42 : r;
    return `${cx + rr * Math.cos(a)},${cy + rr * Math.sin(a)}`;
  }).join(' ');

// Le cercle d'étoiles stylisé : dix étoiles sur 300°, ouvert en bas (ce n'est pas le drapeau) ; `p` les fait entrer
// une à une dans l'ordre de lecture (draw-on en cascade).
const Etoiles: React.FC<{r: number; star?: number; p?: number; color?: string}> = ({r, star = 22, p = 1, color}) => {
  const accent = useAccent();
  const n = 10;
  const size = 2 * (r + star);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{overflow: 'visible'}}>
      {Array.from({length: n}, (_, i) => {
        const a = ((-240 + (i * 300) / (n - 1)) * Math.PI) / 180;
        const v = interpolate(p * n - i, [0, 1], [0, 1], clamp);
        const cx = r + star + r * Math.cos(a);
        const cy = r + star + r * Math.sin(a);
        return <polygon key={i} points={starPoints(cx, cy, star * (0.6 + 0.4 * v))} fill={color ?? accent} opacity={v} />;
      })}
    </svg>
  );
};

// Le texte de loi relié : couverture sombre, le cercle d'étoiles, des lignes de titre.
const Loi: React.FC<{w: number}> = ({w}) => {
  const h = w * 1.3;
  return (
    <div style={{position: 'relative', width: w, height: h, background: '#1f1f24', border: '8px solid #e8e8e8', boxShadow: pixelShadow('#333'), boxSizing: 'border-box'}}>
      <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: 26, background: '#2c2c33', borderRight: '4px solid #555'}} />
      <div style={{position: 'absolute', left: (w - 2 * (w * 0.26 + 20)) / 2 + 8, top: h * 0.12}}>
        <Etoiles r={w * 0.26} star={20} />
      </div>
      {[0.68, 0.48].map((k, i) => (
        <div key={i} style={{position: 'absolute', left: (w - w * k) / 2 + 8, top: h * 0.74 + i * 34, width: w * k, height: 14, background: '#8a8a8a'}} />
      ))}
    </div>
  );
};

// Un titre de presse générique : deux traits de titre et le mot « repoussé » surligné.
const Une: React.FC<{hi: number}> = ({hi}) => (
  <div style={{width: 520, background: '#efe9dc', border: '5px solid #111', boxShadow: pixelShadow('#444'), padding: '22px 28px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 14}}>
    <div style={{height: 14, width: '86%', background: '#6a655c'}} />
    <div style={{height: 14, width: '58%', background: '#6a655c'}} />
    <div style={{fontFamily: serif, fontWeight: 800, fontStyle: 'italic', fontSize: 64, lineHeight: 1, color: '#111'}}>
      <Highlight at={hi} color={RED}>repoussé</Highlight>
    </div>
  </div>
);

// Le bonnet de bain : une calotte et sa bordure.
const Bonnet: React.FC<{w: number}> = ({w}) => {
  const accent = useAccent();
  return (
    <svg width={w} height={w * 0.7} viewBox="0 0 100 70">
      <path d="M8 62 Q8 6 50 6 Q92 6 92 62 Z" fill={accent} stroke="#fff" strokeWidth="5" />
      <rect x="4" y="56" width="92" height="12" rx="4" fill={withAlpha(accent, 0.6)} stroke="#fff" strokeWidth="4" />
      <circle cx="34" cy="28" r="6" fill="#fff" opacity="0.5" />
    </svg>
  );
};

// Le toit barré : le plongeur debout sur une bande de toit, une croix rouge dessus (`p` dessine la croix).
const ToitBarre: React.FC<{px: number; p: number}> = ({px, p}) => (
  <div style={{position: 'relative', width: 10 * px + 40, height: 12 * px + 18}}>
    <div style={{position: 'absolute', left: 20, top: 0, lineHeight: 0}}>
      <Pixel sprite={PLONGEUR} px={px} seed={5} />
    </div>
    <div style={{position: 'absolute', left: 0, right: 0, top: 12 * px, height: 18, background: '#cfcfcf'}} />
    <div style={{position: 'absolute', left: -10, top: -10, lineHeight: 0}}>
      <Cross p={p} size={px * 10 + 60} color={RED} />
    </div>
  </div>
);

// Le toboggan : un tube épais qui serpente, tracé en draw-on (`p` de 0 à 1) ; l'échelle derrière.
const Toboggan: React.FC<{d: string; p: number; w: number; h: number; ladder?: [number, number, number]}> = ({d, p, w, h, ladder}) => {
  const accent = useAccent();
  return (
    <svg width={w} height={h} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
      {ladder ? (
        <g opacity={ease(p, 0, 0.2)}>
          <rect x={ladder[0]} y={ladder[1]} width={8} height={ladder[2] - ladder[1]} fill="#8a8a8a" />
          <rect x={ladder[0] + 44} y={ladder[1]} width={8} height={ladder[2] - ladder[1]} fill="#8a8a8a" />
          {Array.from({length: Math.floor((ladder[2] - ladder[1]) / 46)}, (_, i) => (
            <rect key={i} x={ladder[0]} y={ladder[1] + 30 + i * 46} width={52} height={7} fill="#8a8a8a" />
          ))}
        </g>
      ) : null}
      <path d={d} fill="none" stroke="#e8e8e8" strokeWidth={46} strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - p} />
      <path d={d} fill="none" stroke={accent} strokeWidth={30} strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - p} />
    </svg>
  );
};

// Point d'une courbe de Bézier cubique, pour une bille qui descend le toboggan.
const bez = (t: number, p: number[][]): [number, number] => {
  const q = 1 - t;
  const f = (k: number) => q * q * q * p[0][k] + 3 * q * q * t * p[1][k] + 3 * q * t * t * p[2][k] + t * t * t * p[3][k];
  return [f(0), f(1)];
};
const bezD = (p: number[][]) => `M${p[0][0]} ${p[0][1]} C${p[1][0]} ${p[1][1]} ${p[2][0]} ${p[2][1]} ${p[3][0]} ${p[3][1]}`;

// ---------- La piscine (scènes piscine et chute) ----------

// Coordonnées dans la boîte de la scène (888 × 660).
const BAT = {x: 0, y: 150, w: 600, h: 445};
const PANNEAU = {x: 30, y: 190, w: 220, h: 160};
const BASSIN = {x: 20, y: 432, w: 565, h: 150};
const CHAISE = {x: 410, y: 160};
const PISC_TOB = [[812, 92], [560, 110], [880, 400], [585, 468]];
const LADDER: [number, number, number] = [796, 92, 582];

type PiscineState = {regle: number; toit: number; croix: number; bonnet: number; tob: number};

const Piscine: React.FC<{s: PiscineState}> = ({s}) => {
  const frame = useCurrentFrame();
  // Le bonnet tombe en arc du haut de la scène jusqu'au panneau.
  const [bx, by] = arc(ease(s.bonnet, 0, 1, [0, 1], 'inOut'), [560, -40], [PANNEAU.x + 60, PANNEAU.y + 52], 40);
  return (
    <>
      {/* Le bâtiment : murs, bord du toit plus clair. */}
      <div style={{position: 'absolute', left: BAT.x, top: BAT.y, width: BAT.w, height: BAT.h, background: '#161616', border: '6px solid #8a8a8a', borderTop: '14px solid #cfcfcf', boxSizing: 'border-box'}} />
      {/* Le bassin et ses vaguelettes (défilement continu). */}
      <div style={{position: 'absolute', left: BASSIN.x, top: BASSIN.y, width: BASSIN.w, height: BASSIN.h, background: '#2f6fb5', border: '6px solid #e8e8e8', boxSizing: 'border-box', overflow: 'hidden'}}>
        {[0, 1, 2].map((r) => (
          <svg key={r} width={BASSIN.w + 80} height={20} style={{position: 'absolute', left: -((frame * 0.8 + r * 27) % 80), top: 24 + r * 40}}>
            <path d={Array.from({length: 9}, (_, i) => `M${i * 80} 10 q20 -10 40 0 t40 0`).join(' ')} fill="none" stroke="#8fc3f0" strokeWidth={4} />
          </svg>
        ))}
      </div>
      {/* Le maître-nageur sur sa chaise haute. */}
      <div style={{position: 'absolute', left: CHAISE.x + 6, top: CHAISE.y + 150, width: 8, height: BASSIN.y - CHAISE.y - 150, background: '#cfcfcf'}} />
      <div style={{position: 'absolute', left: CHAISE.x + 110, top: CHAISE.y + 150, width: 8, height: BASSIN.y - CHAISE.y - 150, background: '#cfcfcf'}} />
      <div style={{position: 'absolute', left: CHAISE.x - 6, top: CHAISE.y + 146, width: 136, height: 12, background: '#e8e8e8'}} />
      <div style={{position: 'absolute', left: CHAISE.x, top: CHAISE.y, lineHeight: 0}}>
        <Pixel sprite={MAITRE} px={10} seed={2} />
      </div>
      {/* Le panneau du règlement. */}
      <div style={{position: 'absolute', left: PANNEAU.x, top: PANNEAU.y, width: PANNEAU.w, height: PANNEAU.h, background: '#efe9dc', border: '5px solid #111', boxSizing: 'border-box', opacity: s.regle, transform: `scale(${0.8 + 0.2 * s.regle})`}}>
        <div style={{position: 'absolute', left: 20, top: 16, width: 120, height: 12, background: '#6a655c'}} />
      </div>
      {/* Le plongeur sur le toit, la croix rouge. */}
      <div style={{position: 'absolute', left: 440, top: 150 - 12 * 7, opacity: s.toit, lineHeight: 0}}>
        <ToitBarre px={7} p={s.croix} />
      </div>
      {/* Le bonnet, en vol puis sur le panneau. */}
      {s.bonnet > 0 ? (
        <div style={{position: 'absolute', left: bx, top: by, lineHeight: 0}}>
          <Bonnet w={110} />
        </div>
      ) : null}
      {/* Le toboggan et son échelle. */}
      <Toboggan d={bezD(PISC_TOB)} p={s.tob} w={888} h={660} ladder={s.tob > 0 ? LADDER : undefined} />
    </>
  );
};

// ---------- 0. Hook : le texte de loi et son cercle d'étoiles, puis le titre ----------

const Hook: React.FC = () => {
  const op = useSceneOpacity();
  return (
    <>
      {/* Le texte de loi au-dessus du titre (aucun sous-titre dans le hook), posé dès la première image. */}
      <div style={{position: 'absolute', left: (1080 - 330) / 2, top: 110, opacity: op}}>
        <Loi w={330} />
      </div>
      <V.TitleHook lead="C'est quoi ?" lines={["l'AI Act"]} cue="Act" />
    </>
  );
};

// ---------- 1. Intro : trois titres « repoussé », puis la frise déjà bien remplie ----------

const UNES: [number, number, number][] = [
  [0, 0, -3],
  [180, 92, 2],
  [368, 184, -1.5],
];
// Novembre 2026 sur une frise de 2024 à 2028.
const NOW = (2026 + 10 / 12 - 2024) / 4;

const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const rep = at('intro', 'repoussé');
  const bonne = at('intro', 'bonne');
  const deja = at('intro', 'déjà');
  const fill = ease(frame, deja, deja + 14, [0, NOW]);
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 640}}>
        {/* stagger : trois titres de presse, sur « repoussé », chacun surligné 8 images après son entrée. */}
        {UNES.map(([x, y, r], i) => (
          <Pop key={i} at={rep - 6 + 3 * i} style={{position: 'absolute', left: x, top: y}}>
            <div style={{transform: `rotate(${r}deg)`}}>
              <Une hi={rep + 2 + 3 * i} />
            </div>
          </Pop>
        ))}
        {/* pop in : la frise, sur « bonne » ; bar grow : sa partie déjà applicable, sur « déjà ». */}
        <Pop at={bonne} style={{position: 'absolute', left: 0, top: 440, width: 888}}>
          <div style={{position: 'relative', height: 200}}>
            <div style={{position: 'absolute', left: 0, top: 0, width: 888, height: 80, border: '6px solid #cfcfcf', boxSizing: 'border-box'}} />
            <div style={{position: 'absolute', left: 6, top: 6, width: (888 - 12) * fill, height: 68, background: accent}} />
            <div style={{position: 'absolute', left: 30, top: 6, height: 68, display: 'flex', alignItems: 'center', opacity: ease(frame, deja + 8, deja + 14)}}>
              <Mono size={52} color="#111">déjà</Mono>
            </div>
            <div style={{position: 'absolute', left: 0, top: 96}}><Mono size={48} color={LABEL}>2024</Mono></div>
            <div style={{position: 'absolute', right: 0, top: 96}}><Mono size={48} color={LABEL}>2028</Mono></div>
          </div>
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 2. Base : la pyramide des risques, trois cartes IA rangées ----------

const ETAGES = [
  {mot: 'interdits', label: 'interdits', w: 380, color: RED},
  {mot: 'encadrés', label: 'encadrés', w: 500, color: ORANGE},
  {mot: 'signaler', label: 'se signaler', w: 620, color: AC},
];
const PYR_X = 560; // axe de la pyramide
const PYR_Y = 110;
const ETAGE_H = 150;
const ETAGE_GAP = 14;
const etageY = (i: number) => PYR_Y + i * (ETAGE_H + ETAGE_GAP);

const Pyramide: React.FC<{t: number[]}> = ({t}) => {
  const frame = useCurrentFrame();
  return (
    <>
      {ETAGES.map((e, i) => (
        <Pop key={e.mot} at={t[i]} style={{position: 'absolute', left: PYR_X - e.w / 2, top: etageY(i), width: e.w, height: ETAGE_H}}>
          <div style={{width: '100%', height: '100%', background: e.color, border: '5px solid #0d0d0d', boxShadow: pixelShadow('#2a2a2a'), boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Mono size={52} color="#111">{e.label}</Mono>
          </div>
        </Pop>
      ))}
      {/* Les cartes IA : chacune quitte la pile 4 images après son étage et vole en arc jusqu'à côté de lui. */}
      {ETAGES.map((e, i) => {
        const m = ease(frame, t[i] + 4, t[i] + 18, [0, 1], 'inOut');
        const [x, y] = arc(m, [20 - 10 * (2 - i), 10 - 10 * (2 - i)], [PYR_X - e.w / 2 - 140, etageY(i) + 38], 50);
        return frame >= t[i] + 4 ? (
          <div key={i} style={{position: 'absolute', left: x, top: y, zIndex: 2}}>
            <Carte />
          </div>
        ) : null;
      })}
    </>
  );
};

const Carte: React.FC = () => (
  <div style={{width: 118, height: 76, background: '#2a2a2a', border: '5px solid #fff', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
    <Mono size={48} color="#fff">IA</Mono>
  </div>
);

const Base: React.FC = () => {
  const frame = useCurrentFrame();
  const range = at('base', 'range');
  const t = ETAGES.map((e) => at('base', e.mot));
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 640}}>
        {/* stagger : la pile des trois cartes IA en attente, en haut à gauche, sur « range » ; elles partent une à une. */}
        {[0, 1, 2].map((k) => (
          <Pop key={k} at={range + 2 * k} style={{position: 'absolute', left: 20 - 10 * k, top: 10 - 10 * k, opacity: t.filter((x) => frame >= x + 4).length <= 2 - k ? 1 : 0}}>
            <Carte />
          </Pop>
        ))}
        <Pyramide t={t} />
      </div>
    </Scene>
  );
};

// ---------- 3. Nom : la pyramide en retrait, la date, puis le terme et ses étoiles ----------

const Nom: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const aout = at('nom', 'août');
  const cest = at('nom', "c'est");
  const regl = at('nom', 'règlement');
  const act = at('nom', 'Act');
  const out = gone(frame, cest);
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 640}}>
        {/* Le décor : la pyramide de la scène d'avant, qui s'efface sur « c'est » (une idée à la fois). */}
        <div style={{position: 'absolute', inset: 0, opacity: out}}>
          <Pyramide t={[-30, -30, -30]} />
        </div>
        {/* pop in : la date d'entrée en vigueur, sur « août » ; elle part sur « c'est ». */}
        <Pop at={aout} style={{position: 'absolute', left: 0, top: 10, opacity: out}}>
          <Mono size={60}>août 2024</Mono>
        </Pop>
        {/* pop in : le terme en français puis en anglais (sous-titres masqués par onscreen). */}
        <Pop at={regl} style={{position: 'absolute', left: 0, top: 60}}>
          <Big size={92}>règlement européen</Big>
          <Big size={92}>sur l'IA</Big>
        </Pop>
        <Pop at={act} style={{position: 'absolute', left: 0, top: 330}}>
          <Big size={150} color={accent}>AI Act</Big>
        </Pop>
        {/* draw-on en cascade : le cercle d'étoiles stylisé, à droite du terme, sur « Act ». */}
        <div style={{position: 'absolute', left: 560, top: 250, opacity: frame >= act ? 1 : 0}}>
          <Etoiles r={120} star={24} p={ease(frame, act, act + 20)} />
        </div>
      </div>
    </Scene>
  );
};

// ---------- 4. L'image : la piscine dont le règlement arrive en trois fois ----------

const PiscineScene: React.FC = () => {
  const frame = useCurrentFrame();
  const regle = at('piscine', 'règlement');
  const toit = at('piscine', 'toit');
  const tout = at('piscine', 'tout');
  const bonnet = at('piscine', 'bonnet');
  const rentree = at('piscine', 'rentrée');
  const tob = at('piscine', 'toboggan');
  const prochain = at('piscine', 'prochain');
  const s: PiscineState = {
    regle: ease(frame, regle, regle + 8),
    toit: ease(frame, toit, toit + 6),
    croix: ease(frame, toit + 8, toit + 20),
    bonnet: ease(frame, bonnet, bonnet + 16),
    tob: ease(frame, tob, tob + 40),
  };
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 660}}>
        <Piscine s={s} />
        {/* Les trois échéances, reprises de la voix, chacune près de son objet. */}
        <Pop at={tout} style={{position: 'absolute', left: 0, top: 2}}>
          <Mono size={52}>tout de suite</Mono>
        </Pop>
        <Pop at={rentree} style={{position: 'absolute', left: PANNEAU.x, top: PANNEAU.y + PANNEAU.h + 14}}>
          <Mono size={48}>à la rentrée</Mono>
        </Pop>
        <Pop at={prochain} style={{position: 'absolute', left: 500, top: 598}}>
          <Mono size={48}>l'an prochain</Mono>
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 5. Interdits : la note sociale, les émotions au bureau, puis les applis qui déshabillent ----------

// Une rangée de cinq étoiles de notation, `n` pleines.
const Note: React.FC<{n: number; size: number}> = ({n, size}) => {
  const accent = useAccent();
  return (
    <svg width={size * 5 + 24} height={size}>
      {Array.from({length: 5}, (_, i) => (
        <polygon key={i} points={starPoints(size / 2 + i * (size + 6), size / 2, size / 2)} fill={i < n ? accent : '#4a4a4a'} />
      ))}
    </svg>
  );
};

// Un visage au-dessus d'un bureau, avec une jauge d'humeur dont l'aiguille oscille.
const Humeur: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const a = Math.sin(frame / 9) * 0.9;
  return (
    <svg width={320} height={300} viewBox="0 0 320 300">
      <path d="M70 70 A90 90 0 0 1 250 70" fill="none" stroke="#5a5a5a" strokeWidth={16} />
      <path d={`M160 92 L${160 + 70 * Math.sin(a)} ${92 - 70 * Math.cos(a)}`} stroke={accent} strokeWidth={8} strokeLinecap="round" />
      <circle cx="160" cy="160" r="54" fill={SKIN} stroke="#fff" strokeWidth={6} />
      <circle cx="140" cy="150" r="7" fill="#111" />
      <circle cx="180" cy="150" r="7" fill="#111" />
      <path d="M138 182 Q160 170 182 182" fill="none" stroke="#111" strokeWidth={6} />
      <rect x="20" y="226" width="280" height="22" fill="#8a6a4a" />
      <rect x="40" y="248" width="14" height="52" fill="#8a6a4a" />
      <rect x="266" y="248" width="14" height="52" fill="#8a6a4a" />
    </svg>
  );
};

// Un cadre photo (polaroïd) avec une silhouette, sans aucun détail du corps.
const Photo: React.FC = () => (
  <div style={{width: 300, height: 340, background: '#efe9dc', border: '5px solid #111', boxShadow: pixelShadow('#444'), padding: '22px 22px 70px', boxSizing: 'border-box'}}>
    <div style={{position: 'relative', width: '100%', height: '100%', background: '#3b4a5a', overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: '50%', top: 40, width: 80, height: 80, marginLeft: -40, borderRadius: 40, background: '#1d242c'}} />
      <div style={{position: 'absolute', left: '50%', top: 130, width: 180, height: 140, marginLeft: -90, borderRadius: '90px 90px 0 0', background: '#1d242c'}} />
    </div>
  </div>
);

// Un téléphone avec une grille d'applis ; une case en couleur d'accent.
const Appli: React.FC = () => {
  const accent = useAccent();
  return (
    <div style={{width: 230, height: 380, background: '#1c1c1c', border: '8px solid #e8e8e8', borderRadius: 40, boxShadow: pixelShadow('#333'), boxSizing: 'border-box', padding: '50px 22px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridAutoRows: 52, gap: 14}}>
      {Array.from({length: 12}, (_, i) => <div key={i} style={{borderRadius: 12, background: i === 4 ? accent : '#4a4a4a'}} />)}
    </div>
  );
};

const Interdits: React.FC = () => {
  const frame = useCurrentFrame();
  const fev = at('interdits', 'février');
  const sociale = at('interdits', 'sociale');
  const emo = at('interdits', 'émotions');
  const dec = at('interdits', 'décembre');
  const applis = at('interdits', 'applis');
  const photo = at('interdits', 'photo');
  const accord = at('interdits', 'accord');
  // Sur « décembre », la note sociale et les émotions s'effacent : une idée à la fois.
  const out = gone(frame, dec - 4);
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 640}}>
        {/* Le décor : le toit barré, en petit, en haut à gauche. */}
        <div style={{position: 'absolute', left: 0, top: 0, lineHeight: 0}}>
          <ToitBarre px={6} p={1} />
        </div>
        {/* pop in : la date des interdictions, sur « février » ; elle part sur « décembre ». */}
        <Pop at={fev} style={{position: 'absolute', left: 150, top: 26, opacity: out}}>
          <Mono size={60}>février 2025</Mono>
        </Pop>
        {/* pop in : la note sociale, sur « sociale », barrée 8 images après. */}
        <Pop at={sociale} style={{position: 'absolute', left: 0, top: 160, opacity: out}}>
          <div style={{position: 'relative', width: 400, height: 400}}>
            <div style={{width: 400, height: 330, background: '#1d1d1d', border: '5px solid #cfcfcf', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20}}>
              <Pixel sprite={CITOYEN} px={13} seed={1} />
              <Note n={2} size={50} />
            </div>
            <div style={{position: 'absolute', left: 0, top: 344}}><Mono size={48} color={LABEL}>note sociale</Mono></div>
            <div style={{position: 'absolute', left: 50, top: -20, lineHeight: 0}}>
              <Cross p={ease(frame, sociale + 8, sociale + 20)} size={300} color={RED} />
            </div>
          </div>
        </Pop>
        {/* pop in : le visage et sa jauge d'humeur au-dessus du bureau, sur « émotions », barré 8 images après. */}
        <Pop at={emo} style={{position: 'absolute', left: 470, top: 160, opacity: out}}>
          <div style={{position: 'relative', width: 400, height: 400}}>
            <div style={{width: 400, height: 330, background: '#1d1d1d', border: '5px solid #cfcfcf', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Humeur />
            </div>
            <div style={{position: 'absolute', left: 0, top: 344}}><Mono size={48} color={LABEL}>émotions</Mono></div>
            <div style={{position: 'absolute', left: 50, top: -20, lineHeight: 0}}>
              <Cross p={ease(frame, emo + 8, emo + 20)} size={300} color={RED} />
            </div>
          </div>
        </Pop>
        {/* pop in : la nouvelle date, sur « décembre » ; la photo sur « photo », barrée sur « accord ». */}
        <Pop at={dec} style={{position: 'absolute', left: 150, top: 26}}>
          <Mono size={60}>2 décembre</Mono>
        </Pop>
        {/* pop in : un téléphone et sa grille d'applis, sur « applis ». */}
        <Pop at={applis} style={{position: 'absolute', left: 40, top: 190}}>
          <Appli />
        </Pop>
        <Pop at={photo} style={{position: 'absolute', left: 480, top: 170}}>
          <div style={{position: 'relative', transform: 'rotate(-3deg)'}}>
            <Photo />
            <div style={{position: 'absolute', left: -20, top: 0, lineHeight: 0}}>
              <Cross p={ease(frame, accord, accord + 12)} size={340} color={RED} />
            </div>
          </div>
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 6. Bonnet : le chatbot qui dit qu'il est une machine, le deepfake signalé ----------

// Un visage dédoublé : deux contours décalés, l'un blanc, l'autre en couleur d'accent.
const Dedouble: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const dx = 14 + 4 * Math.sin(frame / 7);
  const face = (c: string, x: number) => (
    <g transform={`translate(${x} 0)`}>
      <ellipse cx="150" cy="130" rx="84" ry="104" fill="none" stroke={c} strokeWidth={8} />
      <circle cx="120" cy="115" r="9" fill={c} />
      <circle cx="180" cy="115" r="9" fill={c} />
      <path d="M115 175 Q150 198 185 175" fill="none" stroke={c} strokeWidth={7} />
    </g>
  );
  return (
    <svg width={330} height={260} viewBox="0 0 330 260" style={{overflow: 'visible'}}>
      {face(accent, dx)}
      {face('#fff', 0)}
    </svg>
  );
};

const Badge: React.FC<{children: React.ReactNode; color?: string; tilt?: number}> = ({children, color, tilt = -4}) => {
  const accent = useAccent();
  return (
    <div style={{display: 'inline-block', background: color ?? accent, border: '5px solid #111', padding: '6px 20px', transform: `rotate(${tilt}deg)`, boxShadow: pixelShadow('#2a2a2a')}}>
      <Mono size={52} color="#111">{children}</Mono>
    </div>
  );
};

const BonnetScene: React.FC = () => {
  const aout = at('bonnet', 'août');
  const chat = at('bonnet', 'chatbot');
  const machine = at('bonnet', 'machine');
  const deep = at('bonnet', 'deepfake');
  const signale = at('bonnet', 'signalé');
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 640}}>
        {/* Le décor : le bonnet, en petit, en haut à gauche. */}
        <div style={{position: 'absolute', left: 0, top: 0, lineHeight: 0}}>
          <Bonnet w={120} />
        </div>
        {/* pop in : la date, sur « août ». */}
        <Pop at={aout} style={{position: 'absolute', left: 150, top: 10}}>
          <Mono size={60}>2 août</Mono>
        </Pop>
        {/* pop in : la bulle du chatbot, sur « chatbot » ; le badge « machine » s'y accroche sur « machine ». */}
        <Pop at={chat} style={{position: 'absolute', left: 0, top: 190}}>
          <div style={{display: 'flex', flexDirection: 'column', gap: 16, width: 400}}>
            <Msg w={300} right />
            <Msg w={380} color="#cfcfcf" />
          </div>
        </Pop>
        <Pop at={machine} style={{position: 'absolute', left: 60, top: 430}}>
          <Badge>machine</Badge>
        </Pop>
        {/* pop in : le visage dédoublé, sur « deepfake » ; l'étiquette « signalé » se colle sur « signalé ». */}
        <Pop at={deep} style={{position: 'absolute', left: 500, top: 170}}>
          <Dedouble />
        </Pop>
        <Pop at={signale} style={{position: 'absolute', left: 540, top: 450}}>
          <Badge tilt={5}>signalé</Badge>
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 7. Toboggan : le haut risque, la demande de crédit, les règles qui glissent à décembre 2027 ----------

const TOB = [[300, 130], [860, 100], [80, 430], [640, 470]];

const TobogganScene: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const haut = at('toboggan', 'haut');
  const credit = at('toboggan', 'crédit');
  const regles = at('toboggan', 'règles');
  const glisse = at('toboggan', 'glissé');
  const dec = at('toboggan', 'décembre');
  // La bille descend de « glissé » à « décembre » (démarrage et arrêt en douceur), le long du toboggan.
  const t = ease(frame, glisse, dec + 4, [0, 1], 'inOut');
  const [bx, by] = bez(t, TOB);
  const s = punch(frame, dec + 4);
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 640}}>
        {/* Le décor : le toboggan, en grand, déjà tracé. */}
        <Toboggan d={bezD(TOB)} p={1} w={888} h={640} />
        {/* pop in : l'étiquette du haut du toboggan, sur « haut ». */}
        <Pop at={haut} style={{position: 'absolute', left: 440, top: 0}}>
          <Badge color={ORANGE} tilt={-2}>haut risque</Badge>
        </Pop>
        {/* pop in : la demande de crédit, sur « crédit » ; sa jauge de note se remplit (bar grow). */}
        <Pop at={credit} style={{position: 'absolute', left: 0, top: 210, opacity: gone(frame, glisse)}}>
          <div style={{display: 'flex', flexDirection: 'column', gap: 14}}>
            <Doc w={260} lines={3} title="crédit" />
            <div style={{width: 260, height: 34, border: '5px solid #cfcfcf', boxSizing: 'border-box'}}>
              <div style={{width: `${ease(frame, credit + 6, credit + 30) * 62}%`, height: '100%', background: ORANGE}} />
            </div>
          </div>
        </Pop>
        {/* pop in : la bille des règles, en haut du toboggan, sur « règles » ; elle descend sur « glissé ». */}
        <Pop at={regles} style={{position: 'absolute', left: bx - 110, top: by - 50, zIndex: 2}}>
          <div style={{width: 220, height: 100, borderRadius: 50, background: '#fff', border: `6px solid ${accent}`, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: pixelShadow('#333')}}>
            <Mono size={52} color="#111">règles</Mono>
          </div>
        </Pop>
        {/* pop in puis punch zoom : l'arrivée, en bas du toboggan, sur « décembre ». */}
        <Pop at={dec} style={{position: 'absolute', left: 360, top: 584}}>
          <div style={{transform: `scale(${s})`, transformOrigin: '50% 50%'}}>
            <Mono size={64}>décembre 2027</Mono>
          </div>
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 8. Chute : la piscine entière ; « repoussé » ne colle qu'au toboggan, le toit reste barré ----------

const Chute: React.FC = () => {
  const frame = useCurrentFrame();
  const rep = at('chute', 'repoussé');
  const interdit = at('chute', 'interdit');
  const s: PiscineState = {regle: 1, toit: 1, croix: interpolate(frame, [interdit, interdit + 12], [0, 1], clamp), bonnet: 1, tob: 1};
  const [ex, ey] = bez(1, PISC_TOB);
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 660}}>
        <Piscine s={s} />
        {/* La bille des règles, arrivée en bas du toboggan. */}
        <div style={{position: 'absolute', left: ex - 40, top: ey - 40, width: 80, height: 80, borderRadius: 40, background: '#fff', border: `6px solid ${AC}`, boxSizing: 'border-box'}} />
        {/* pop in : le titre « repoussé » collé sur le toboggan, sur « repoussé ». */}
        <Pop at={rep} style={{position: 'absolute', left: 600, top: 230}}>
          <div style={{transform: 'rotate(6deg)', background: '#efe9dc', border: '5px solid #111', padding: '8px 18px', boxShadow: pixelShadow('#444')}}>
            <div style={{fontFamily: serif, fontWeight: 800, fontStyle: 'italic', fontSize: 60, lineHeight: 1, color: '#111'}}>repoussé</div>
          </div>
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- Montage ----------

const SCENES: Record<string, React.FC> = {hook: Hook, intro: Intro, base: Base, nom: Nom, piscine: PiscineScene, interdits: Interdits, bonnet: BonnetScene, toboggan: TobogganScene, chute: Chute};

export const AiActVoix: React.FC = () => <V.Montage scenes={SCENES} accent={AC} />;

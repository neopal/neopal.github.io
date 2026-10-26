// Short Humain dans la boucle (YouTube / TikTok / Instagram), épisode 19, définition, voix off PAL - FR, préparé le
// 2026-10-22 (calage provisoire, sans voix). Fiche human-in-the-loop de lexique/terms.js ; sources dans
// voix/human-loop.script.json : Anthropic Engineering, Claude Code auto mode (25 mars 2026 : 93 % des demandes de
// permission acceptées) ; Anthropic, Auto mode is now the default (7 août 2026 : 1 053 testeurs, une commande dangereuse
// glissée, environ 17 % bloquées en début de session, 5 % après 50 demandes, 89 % pour le classifieur) ; le threat image
// projection des contrôles aux rayons X (Sensors, 2022) ; l'image de Karima au contrôle des bagages à Roissy.
// Fil : l'ép. 18 montrait la fatigue de qui surveille plusieurs agents ; ici, elle frappe au moment de valider.
// Collages réels (crédits dans le script et public/voix/CREDITS-semaine-27-10.md) : la page d'Anthropic Engineering
// sur « mars » (93 % surligné), le billet du blog Claude sur « Anthropic ». L'interface de Claude Code est recréée,
// sans commande écrite (la voix n'en dit aucune) ; la demande « Autoriser ? / Oui / Non » revient à l'expérience et à
// la chute (à la place du « Valider ? » du storyboard, que la voix ne dit pas).
// Le scanner a la même taille et la même place dans les quatre scènes où il apparaît (SCR, SCR_TOP).
// L'écran suit la voix et Le mouvement (univers.md) : chaque élément entre sur le mot qui le nomme (at), easing du kit,
// défilement linéaire seulement pour les tapis, un seul punch zoom (sur 93 %), italique d'accent au hook et au nom.
import React from 'react';
import {Img, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {ACCENTS, Big, Check, Draw, Eye, Mono, Pop, Scene, W, clamp, countUp, ease, punch, useAccent, withAlpha} from './kit';
import {LABEL, makeVoix} from './voix/VoixShort';
import {Pixel, type Sprite} from './voix/Pixel';
import {Model, pixelShadow} from './voix/Parts';
import ALIGN from './voix/human-loop.align.json';
import SCRIPT from './voix/human-loop.script.json';

const AC = ACCENTS.agents; // catégorie Agents et outils
const V = makeVoix(ALIGN, SCRIPT, 'voix/prediction-music.mp3');
const {at} = V;
export const HUMANLOOPVOIX_DURATION = V.duration;

const RED = '#FF4D4D';
const GREEN = '#4CD964';
const ORGA = '#f0a040'; // rayons X : l'organique en orange
const METAL = '#3a8bff'; // rayons X : le métal en bleu
const gone = (frame: number, until: number) => ease(frame, until, until + 6, [1, 0], 'inOut');
// Entrée / sortie identiques à celles de Scene, pour un calque posé hors de la Scene.
const useSceneOpacity = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  return interpolate(frame, [0, 6], [0, 1], clamp) * (1 - interpolate(frame, [durationInFrames - 5, durationInFrames], [0, 1], clamp));
};

// ---------- Personnages (pixel art, même format que voix/Pixel.tsx) ----------

const SKIN = '#e3b58e';
const SKIN2 = '#b07a52';
// Contour clair d'un sprite posé devant un fond sombre (quatre ombres pleines décalées).
const OUTLINE = 'drop-shadow(5px 0 0 #dcdcdc) drop-shadow(-5px 0 0 #dcdcdc) drop-shadow(0 5px 0 #dcdcdc) drop-shadow(0 -5px 0 #dcdcdc)';

// Le bonhomme devant son écran (hook) et la personne qui dit oui ou non (nom) : pull bleu.
const HUMAIN: Sprite = {
  rows: [
    '....HHHH....',
    '...HHHHHH...',
    '...SSSSSS...',
    '...SESSES...',
    '...SSSSSS...',
    '...SSRRSS...',
    '....SSSS....',
    '..BBBBBBBB..',
    '.BBBBBBBBBB.',
    '.BBBBBBBBBB.',
    '.SBBBBBBBBS.',
    '.SBBBBBBBBS.',
    '...BBBBBB...',
    '...BBBBBB...',
  ],
  palette: {H: '#4a4a4a', S: SKIN, E: '#111', R: '#b5524f', B: '#5b7fb5'},
};

// Karima, de trois quarts dos, face à l'écran du scanner : chignon noir, chemise bleu marine d'agent de sûreté.
// Profil de trois quarts : un œil, le nez, la joue ; l'œil, posé sur l'écran, ne bouge pas.
const KARIMA: Sprite = {
  rows: [
    '....HHH.....',
    '...HHHHHH...',
    '..HHHHHHHH..',
    '..HHHHHSSS..',
    '..HHHHHSES..',
    '..HHHHHSSSS.',
    '...HHHHSSS..',
    '....SSSS....',
    '.NNNNNNNNNN.',
    '.NNNNYNNNNN.',
    '.NNNNNNNNNN.',
    '.SNNNNNNNNS.',
    '...NNNNNN...',
    '...NNNNNN...',
  ],
  palette: {H: '#1e1e1e', S: SKIN2, E: '#111', N: '#22324f', Y: '#e8c45a'},
};
// En chute, elle tourne la tête : on voit le profil, l'œil grand ouvert levé vers la valise, la bouche ouverte.
const KARIMA_UP: Sprite = {
  rows: [
    '....HHH.....',
    '...HHHHHH...',
    '..HHHHHHHH..',
    '..HHHHHWES..',
    '..HHHHHSSSS.',
    '..HHHHHSSS..',
    '...HHHHSRS..',
    '....SSSSS...',
    '.NNNNNNNNNN.',
    '.NNNNYNNNNN.',
    '.NNNNNNNNNN.',
    '.SNNNNNNNNS.',
    '...NNNNNN...',
    '...NNNNNN...',
  ],
  palette: {H: '#1e1e1e', S: SKIN2, E: '#111', W: '#fff', R: '#7a2a2a', N: '#22324f', Y: '#e8c45a'},
};

// Un testeur, en petit (grille de l'expérience).
const testeur = (k: number): Sprite => ({
  rows: ['.HHHH.', '.SSSS.', '.ESSE.', '..SS..', 'CCCCCC', 'CCCCCC', '.CCCC.'],
  palette: {H: ['#4a4a4a', '#5a3a22', '#e8c45a', '#1e1e1e'][k % 4], S: k % 3 ? SKIN : SKIN2, E: '#111', C: ['#5b7fb5', '#4f8a5b', '#8e4a7a', '#e07b39', '#6a6a6a'][k % 5]},
});

// ---------- Collages ----------

// La vraie capture, recadrée sur `crop` (pixels de la source, large de `sw`), bordure blanche, ombre pixel, scotch
// aux coins ; `hi` : un cadre de surlignage sur un passage (pixels de la source), visible à `hiP`.
const Collage: React.FC<{src: string; sw: number; crop: [number, number, number, number]; w: number; tilt?: number; hi?: [number, number, number, number]; hiP?: number}> = ({src, sw, crop: [cx, cy, cw, ch], w, tilt = 0, hi, hiP = 0}) => {
  const k = w / cw;
  return (
    <div style={{position: 'relative', transform: `rotate(${tilt}deg)`}}>
      <div style={{position: 'relative', width: w, height: ch * k, border: '5px solid #fff', boxShadow: pixelShadow('#333'), overflow: 'hidden', background: '#fff'}}>
        <Img src={staticFile(src)} style={{position: 'absolute', left: -cx * k, top: -cy * k, width: sw * k}} />
        {hi ? <div style={{position: 'absolute', left: (hi[0] - cx) * k - 8, top: (hi[1] - cy) * k - 6, width: (hi[2] * k + 16) * hiP, height: hi[3] * k + 12, border: `5px solid ${RED}`, background: withAlpha('#FFE14D', 0.35), boxSizing: 'border-box', opacity: hiP > 0 ? 1 : 0}} /> : null}
      </div>
      <div style={{position: 'absolute', left: -18, top: -10, width: 80, height: 26, background: 'rgba(239,233,220,0.85)', transform: 'rotate(-30deg)'}} />
      <div style={{position: 'absolute', right: -18, bottom: -10, width: 80, height: 26, background: 'rgba(239,233,220,0.85)', transform: 'rotate(-30deg)'}} />
    </div>
  );
};

// ---------- Objets dessinés (SVG maison) ----------

const Envelope: React.FC<{w: number}> = ({w}) => (
  <svg width={w} height={w * 0.7} viewBox="0 0 100 70">
    <rect x="4" y="4" width="92" height="62" fill="#efe9dc" stroke="#fff" strokeWidth="5" />
    <path d="M6 8 L50 40 L94 8" fill="none" stroke="#8a8a8a" strokeWidth="5" />
  </svg>
);
const Coin: React.FC<{w: number}> = ({w}) => (
  <svg width={w} height={w} viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="44" fill="#e8c45a" stroke="#a8862a" strokeWidth="8" />
    <circle cx="50" cy="50" r="26" fill="none" stroke="#a8862a" strokeWidth="6" />
  </svg>
);
const Trash: React.FC<{w: number}> = ({w}) => (
  <svg width={w} height={w} viewBox="0 0 100 100">
    <rect x="16" y="18" width="68" height="10" fill="#cfcfcf" />
    <rect x="40" y="8" width="20" height="10" fill="#cfcfcf" />
    <path d="M22 32 H78 L72 94 H28 Z" fill="none" stroke="#cfcfcf" strokeWidth="7" strokeLinejoin="round" />
    {[38, 50, 62].map((x) => <line key={x} x1={x} y1="44" x2={x} y2="82" stroke="#cfcfcf" strokeWidth="5" />)}
  </svg>
);
const Skull: React.FC<{w: number}> = ({w}) => (
  <svg width={w} height={w} viewBox="0 0 100 100">
    <path d="M50 8 C24 8 12 26 14 48 C15 60 22 66 28 70 V86 H72 V70 C78 66 85 60 86 48 C88 26 76 8 50 8 Z" fill="#fff" />
    <circle cx="35" cy="46" r="11" fill="#111" />
    <circle cx="65" cy="46" r="11" fill="#111" />
    <path d="M50 58 L44 68 H56 Z" fill="#111" />
    {[40, 50, 60].map((x) => <line key={x} x1={x} y1="76" x2={x} y2="86" stroke="#111" strokeWidth="4" />)}
  </svg>
);
// Le pointeur de la souris.
const Cursor: React.FC<{w: number}> = ({w}) => (
  <svg width={w} height={w * 1.3} viewBox="0 0 50 65">
    <path d="M4 2 L4 52 L16 40 L26 62 L34 58 L24 37 L42 37 Z" fill="#fff" stroke="#111" strokeWidth="4" strokeLinejoin="round" />
  </svg>
);
// La barrière : deux montants et une lisse rayée qui descend devant la frise (p de 0, levée, à 1, baissée).
const Gate: React.FC<{p: number}> = ({p}) => (
  <svg width={120} height={300} viewBox="0 0 120 300" style={{overflow: 'visible'}}>
    <rect x={8} y={0} width={18} height={300} fill="#8a8a8a" />
    <rect x={94} y={0} width={18} height={300} fill="#8a8a8a" />
    <g transform={`translate(0 ${150 * p})`}>
      {Array.from({length: 5}, (_, k) => <rect key={k} x={36} y={k * 26} width={48} height={26} fill={k % 2 ? '#f2f2f2' : '#d93a3a'} />)}
    </g>
  </svg>
);

// ---------- Le scanner aux rayons X (scènes karima, tip, experience, chute) ----------

const SCR = {w: W, h: 420};
const SCR_TOP = 170; // même place dans les quatre scènes
const CASE = {w: 240, h: 170, pitch: 300};
const BELT_TOP = 110; // haut des valises (poignée comprise) dans l'écran ; elles reposent sur le tapis à 310
type Kind = 'socks' | 'trousse' | 'knife';

// Une chaussette aux rayons X (organique, donc orange) : tige avec deux rayures, talon arrondi, pied, pointe ronde.
const Sock: React.FC<{x: number; y: number; o: number}> = ({x, y, o}) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    <path d="M0 0 H22 V40 Q22 50 32 50 H44 A12 12 0 0 1 44 74 H14 A14 14 0 0 1 0 60 Z" fill={ORGA} stroke="#8a4a10" strokeWidth="2" />
    <rect x="0" y="8" width="22" height="5" fill="#b8641c" />
    <rect x="0" y="18" width="22" height="5" fill="#b8641c" />
  </g>
);

// Une valise vue aux rayons X, en fausses couleurs ; `gun` : la fausse image d'arme posée dessus (contour pointillé).
const Valise: React.FC<{kind: Kind; gun?: number; lit?: boolean}> = ({kind, gun = 0, lit}) => {
  const accent = useAccent();
  return (
    <svg width={CASE.w} height={CASE.h + 30} viewBox={`0 -30 ${CASE.w} ${CASE.h + 30}`} style={{overflow: 'visible'}}>
      <path d="M90 0 V-22 H150 V0" fill="none" stroke="#7fc6e8" strokeWidth="7" />
      <rect x="3" y="3" width={CASE.w - 6} height={CASE.h - 6} rx="16" fill="rgba(120,200,240,0.14)" stroke={lit ? accent : '#7fc6e8'} strokeWidth={lit ? 10 : 6} />
      {kind === 'knife' ? (
        <>
          <path d="M40 92 L150 70 L160 82 L48 104 Z" fill={METAL} />
          <rect x="150" y="68" width="56" height="22" rx="6" fill={ORGA} transform="rotate(-11 178 79)" />
          <path d="M40 130 q10 -18 30 -6 l14 10 q-8 18 -30 10 Z" fill={ORGA} opacity="0.85" />
        </>
      ) : kind === 'socks' ? (
        <>
          {/* Deux paires de chaussettes : tige rayée, talon arrondi, pointe ronde. */}
          {[[30, 36, 0.8], [56, 44, 1], [132, 40, 0.8], [158, 48, 1]].map(([x, y, o], k) => <Sock key={k} x={x} y={y} o={o} />)}
        </>
      ) : (
        <>
          <rect x="34" y="40" width="110" height="70" rx="20" fill={ORGA} />
          <line x1="44" y1="50" x2="134" y2="50" stroke={METAL} strokeWidth="5" strokeDasharray="6 5" />
          <path d="M160 50 h40 v76 h-40 Z" fill={ORGA} opacity="0.8" />
        </>
      )}
      {gun > 0 ? (
        <g opacity={gun}>
          <path d="M60 64 H196 V96 H124 L114 144 H84 L94 96 H60 Z" fill="rgba(58,139,255,0.55)" stroke="#e2edff" strokeWidth="6" strokeDasharray="12 8" />
          <rect x="52" y="52" width="48" height="16" fill="rgba(239,233,220,0.85)" transform="rotate(-25 76 60)" />
          <rect x="172" y="124" width="48" height="16" fill="rgba(239,233,220,0.85)" transform="rotate(-25 196 132)" />
        </g>
      ) : null}
    </svg>
  );
};

// Le moniteur du scanner : fond bleu nuit, tapis en bas, et ce qui défile dessus (enfants positionnés en absolu).
const XRay: React.FC<{children?: React.ReactNode}> = ({children}) => (
  <div style={{position: 'relative', width: SCR.w, height: SCR.h, background: '#0b1630', border: '10px solid #4a4a4a', boxShadow: pixelShadow('#222'), boxSizing: 'border-box', overflow: 'hidden'}}>
    <div style={{position: 'absolute', left: 0, right: 0, top: BELT_TOP + CASE.h + 30 + 6, height: 6, background: '#22406b'}} />
    {children}
  </div>
);

// Une file de valises posées à `x0 + j * pitch`, toutes celles qui tombent dans l'écran (aucun trou à l'entrée) ;
// `s` réduit les valises (posées sur le tapis), `skip` retire des valises suivies à part.
const Belt: React.FC<{x0: number; kinds: (j: number) => Kind; skip?: number[]; extra?: (j: number, x: number) => React.ReactNode; gun?: (j: number) => number; pitch?: number; s?: number; top?: number}> = ({x0, kinds, skip = [], extra, gun, pitch = CASE.pitch, s = 1, top = BELT_TOP}) => {
  const cw = CASE.w * s;
  const jmin = Math.ceil((-cw - 20 - x0) / pitch);
  const jmax = Math.floor((SCR.w - x0) / pitch);
  return (
    <>
      {Array.from({length: Math.max(0, jmax - jmin + 1)}, (_, i) => jmin + i).map((j) => {
        const x = x0 + j * pitch;
        if (skip.includes(j)) return null;
        return (
          <div key={j} style={{position: 'absolute', left: x, top: top + (CASE.h + 30) * (1 - s), width: CASE.w, height: CASE.h + 30, lineHeight: 0, transform: `scale(${s})`, transformOrigin: 'left top'}}>
            <Valise kind={kinds(j)} gun={gun ? gun(j) : 0} />
            {extra ? extra(j, x) : null}
          </div>
        );
      })}
    </>
  );
};
// Une valise sur deux de chaussettes, l'autre de trousses de toilette (j = 0 réservé à la valise suivie).
const ordinary = (j: number): Kind => (((j % 2) + 2) % 2 ? 'socks' : 'trousse');
const CENTER = (SCR.w - CASE.w) / 2;

// Karima devant l'écran, en bas à gauche, contour clair ; même place dans karima et chute.
const KAR = {x: 20, y: SCR_TOP + SCR.h - 70, px: 20};
const KarimaFig: React.FC<{sprite: Sprite}> = ({sprite}) => (
  <div style={{lineHeight: 0, filter: OUTLINE}}>
    <Pixel sprite={sprite} px={KAR.px} seed={4} />
  </div>
);

// Les deux boutons Oui / Non ; `yes` allume Oui.
const Buttons: React.FC<{yes?: boolean}> = ({yes}) => {
  const accent = useAccent();
  return (
    <div style={{display: 'flex', gap: 20}}>
      <div style={{padding: '4px 26px', background: yes ? accent : 'transparent', border: `4px solid ${accent}`, borderRadius: 8}}><Mono size={48} color={yes ? '#111' : accent}>Oui</Mono></div>
      <div style={{padding: '4px 26px', border: '4px solid #777', borderRadius: 8}}><Mono size={48} color="#bbb">Non</Mono></div>
    </div>
  );
};

// ---------- 0. Hook : l'agent et l'humain reliés par une boucle qui se dessine, et le titre ----------

const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const op = useSceneOpacity();
  const boucle = at('hook', 'boucle');
  const accent = useAccent();
  const p = ease(frame, 4, boucle + 10);
  return (
    <>
      {/* Le schéma au-dessus du titre (aucun sous-titre dans le hook) : le modèle avec deux yeux, la boucle en draw-on, le bonhomme à son écran. */}
      <div style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 660, opacity: op}}>
        <div style={{position: 'absolute', left: 110, top: 300}}>
          <Model w={260} />
          {[80, 150].map((x) => (
            <div key={x} style={{position: 'absolute', left: x, top: 50, width: 34, height: 34, background: '#fff'}}>
              <div style={{position: 'absolute', left: 14, top: 10, width: 14, height: 14, background: '#111'}} />
            </div>
          ))}
        </div>
        <svg width={1080} height={660} viewBox="0 0 1080 660" style={{position: 'absolute', left: 0, top: 0}}>
          <Draw d="M380 330 C460 190 580 190 640 300" p={Math.min(1, p * 2)} width={10} len={330} color={accent} />
          <Draw d="M650 470 C580 600 450 600 385 480" p={Math.max(0, p * 2 - 1)} width={10} len={330} color={accent} />
          {p > 0.48 ? <path d="M626 276 L648 314 L606 306 Z" fill={accent} /> : null}
          {p > 0.98 ? <path d="M398 506 L378 466 L420 476 Z" fill={accent} /> : null}
        </svg>
        <div style={{position: 'absolute', left: 660, top: 330, width: 130, height: 96, background: '#222', border: '6px solid #cfcfcf', boxSizing: 'border-box'}} />
        <div style={{position: 'absolute', left: 714, top: 426, width: 22, height: 26, background: '#cfcfcf'}} />
        <div style={{position: 'absolute', left: 800, top: 290, lineHeight: 0}}>
          <Pixel sprite={HUMAIN} px={12} seed={1} />
        </div>
      </div>
      <V.TitleHook lead="C'est quoi ?" lines={["l'humain", 'dans la boucle']} cue="l'humain" />
    </>
  );
};

// ---------- 1. Réflexe : le terminal, Oui en rafale, puis la vraie page d'Anthropic et 93 % ----------

// Une ligne de commande sans texte (la voix n'en nomme aucune) : deux traits.
const Bars: React.FC<{k: number; color?: string}> = ({k, color = '#6a6a6a'}) => (
  <div style={{display: 'flex', gap: 14, alignItems: 'center', height: 48}}>
    <div style={{width: [120, 90, 150, 110][k % 4], height: 16, background: color}} />
    <div style={{width: [160, 200, 120, 180][k % 4], height: 16, background: color}} />
  </div>
);

const Reflexe: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const valide = at('reflexe', 'valide');
  const mars = at('reflexe', 'mars');
  const acceptaient = at('reflexe', 'acceptaient');
  const n93 = at('reflexe', '93');
  // Le curseur glisse vers Oui et clique sur « valide » ; puis les demandes s'enchaînent de plus en plus vite jusqu'à « mars ».
  const cur = ease(frame, 4, valide, [0, 1], 'inOut');
  const N = 9;
  const reqs = Array.from({length: N}, (_, k) => Math.round(valide + (mars - 10 - valide) * Math.sqrt(k / N)));
  const done = reqs.filter((t) => frame >= t + 3).length;
  const yes = reqs.some((t) => frame >= t && frame < t + 4);
  const term = gone(frame, mars - 2);
  const COUNT = 36;
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 720}}>
        {/* Le terminal recréé, la demande « Autoriser ? » déjà posée à l'entrée. */}
        <Pop at={2} style={{position: 'absolute', left: 0, top: 0, width: W, height: 480, background: '#0e0e0e', border: '5px solid #6a6a6a', boxSizing: 'border-box', overflow: 'hidden', opacity: term}}>
          <div style={{height: 70, background: '#262626', display: 'flex', alignItems: 'center', padding: '0 24px', gap: 14}}>
            {[0, 1, 2].map((k) => <div key={k} style={{width: 18, height: 18, borderRadius: '50%', background: '#777'}} />)}
            <div style={{marginLeft: 14}}><Mono size={48} color="#cfcfcf">Claude Code</Mono></div>
          </div>
          {/* La dernière demande acceptée, cochée, au-dessus. */}
          {done > 0 ? (
            <div style={{position: 'absolute', left: 30, top: 92, display: 'flex', alignItems: 'center', gap: 12, opacity: 0.8}}>
              <Check p={1} size={48} />
              <Bars k={done - 1} />
            </div>
          ) : null}
          <div style={{position: 'absolute', left: 30, bottom: 26, width: 560, background: '#151515', border: `5px solid ${accent}`, borderRadius: 16, padding: '18px 24px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 16}}>
            <Mono size={52} color="#fff">Autoriser ?</Mono>
            <Bars k={done} color="#9a9a9a" />
            <Buttons yes={yes} />
          </div>
        </Pop>
        {/* Le pointeur, qui va cliquer sur Oui. */}
        <div style={{position: 'absolute', left: interpolate(cur, [0, 1], [700, 120]), top: interpolate(cur, [0, 1], [150, 420]), lineHeight: 0, opacity: term, transform: `scale(${frame >= valide && frame < valide + 6 ? 0.85 : 1})`}}>
          <Cursor w={56} />
        </div>
        {/* pop in : la vraie page d'Anthropic Engineering en collage, sur « mars » ; « 93% » s'y surligne sur « 93 ». */}
        <div style={{position: 'absolute', left: (W - 720) / 2, top: 0}}>
          <Pop at={mars}>
            <Collage src="voix/human-loop-auto-mode.png" sw={1000} crop={[60, 40, 880, 754]} w={720} tilt={-1.5} hi={[688, 744, 104, 24]} hiP={frame >= n93 ? ease(frame, n93, n93 + 12) : 0} />
          </Pop>
        </div>
        {/* count-up et punch zoom (le seul du short) : la jauge se remplit jusqu'à 93 %, sur « acceptaient » puis « 93 ». */}
        <Pop at={acceptaient} style={{position: 'absolute', left: 0, top: 640, width: W, display: 'flex', alignItems: 'center', gap: 30}}>
          <div style={{width: 270, transform: `scale(${punch(frame, n93 + COUNT)})`, transformOrigin: 'left center'}}>
            <Mono size={96} color="#fff">{`${frame >= n93 ? countUp(frame, n93, 93, COUNT) : '0'} %`}</Mono>
          </div>
          <div style={{position: 'relative', flex: 1, height: 90, border: '6px solid #fff', boxSizing: 'border-box'}}>
            <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: `${ease(frame, n93, n93 + COUNT, [0, 93])}%`, background: accent}} />
          </div>
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 2. Le nom : la frise d'actions, trois actions sensibles, la barrière, puis le terme ----------

const BOXW = 90;
const BOXP = 112;
const BAR_X = 600;

const Nom: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const envoi = at('nom', 'envoi');
  const paiement = at('nom', 'paiement');
  const suppr = at('nom', 'suppression');
  const pause = at('nom', 'pause');
  const personne = at('nom', 'personne');
  const cest = at('nom', "C'est");
  const humain = at('nom', "l'humain");
  const human = at('nom', 'human');
  // La frise défile (linéaire), puis s'arrête net sur « pause », la première case juste devant la barrière.
  const v = 4;
  const off = frame < pause ? v * frame : v * pause + v * 2 * ease(frame, pause, pause + 6, [0, 1]);
  const shift = BAR_X - BOXW - 20 - (v * pause + v * 2);
  const out = gone(frame, cest);
  const ICONS: [number, React.ReactNode, string][] = [
    [envoi, <Envelope w={130} />, 'envoi'],
    [paiement, <Coin w={110} />, 'paiement'],
    [suppr, <Trash w={120} />, 'suppression'],
  ];
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 640}}>
        <div style={{position: 'absolute', inset: 0, opacity: out}}>
          {/* stagger : les trois actions sensibles tombent en cascade au-dessus de la frise, chacune sur son mot. */}
          <div style={{position: 'absolute', left: 0, top: 0, width: W, display: 'flex', justifyContent: 'space-between'}}>
            {ICONS.map(([t, icon, label], k) => {
              const fall = ease(frame, t, t + 12, [-90, 0]);
              return (
                <div key={k} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, opacity: frame >= t ? 1 : 0}}>
                  <div style={{height: 140, display: 'flex', alignItems: 'flex-end', lineHeight: 0, transform: `translateY(${fall}px)`}}>{icon}</div>
                  <div style={{opacity: frame >= t + 5 ? 1 : 0}}><Mono size={48} color="#fff">{label}</Mono></div>
                </div>
              );
            })}
          </div>
          {/* La frise des actions de l'agent : défilement continu, posée dès l'entrée, qui file sous la barrière levée. */}
          <div style={{position: 'absolute', left: 0, top: 480, width: BAR_X + 60, height: 80, overflow: 'hidden'}}>
            {Array.from({length: 14}, (_, k) => {
              const x = ((k * BOXP + off + shift) % (14 * BOXP)) - BOXP;
              return <div key={k} style={{position: 'absolute', left: x, top: 5, width: BOXW, height: 70, border: `5px solid ${k % 4 === 1 ? accent : '#8a8a8a'}`, background: '#1a1a1a', boxSizing: 'border-box'}} />;
            })}
          </div>
          {/* La barrière : posée dès l'entrée, levée ; sa lisse descend devant la frise sur « pause ». */}
          <Pop at={2} style={{position: 'absolute', left: BAR_X - 30, top: 300, lineHeight: 0}}>
            <Gate p={ease(frame, pause, pause + 10, [0, 1], 'inOut')} />
          </Pop>
          {/* La personne qui dit oui ou non, derrière la barrière, à distance de la lisse. */}
          <Pop at={personne} style={{position: 'absolute', left: BAR_X + 130, top: 400, lineHeight: 0}}>
            <Pixel sprite={HUMAIN} px={12} seed={3} />
          </Pop>
        </div>
        {/* pop in : le terme, en français puis en anglais en couleur d'accent, écrit comme la voix le dit (sous-titre masqué par onscreen). */}
        <Pop at={humain} style={{position: 'absolute', left: 0, top: 80, width: W}}>
          <Big size={124}>l'humain dans la boucle</Big>
        </Pop>
        <Pop at={human} style={{position: 'absolute', left: 0, top: 380, width: W}}>
          <Big size={104} color={accent}><span style={{whiteSpace: 'nowrap'}}>human in the loop</span></Big>
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 3. L'image : Karima devant l'écran à rayons X, et le couteau qui passe ----------

const Karima: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const karimaAt = at('karima', 'Karima');
  const huit = at('karima', 'huit');
  const chaussettes = at('karima', 'chaussettes');
  const couteau = at('karima', 'couteau');
  const glisse = at('karima', 'glisse');
  // Le tapis ne ralentit jamais : la valise au couteau (j = 0) entre à gauche sur « couteau » et passe au centre sur
  // « glisse » (vitesse tirée des deux mots, pour rester calée sur la vraie voix). L'écran est plein dès l'entrée.
  const v = (CENTER + CASE.w) / Math.max(10, glisse - couteau);
  const x0 = CENTER + v * (frame - glisse);
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 820}}>
        {/* L'écran du scanner et son tapis : le décor, en mouvement dès l'entrée. */}
        <Pop at={0} style={{position: 'absolute', left: 0, top: SCR_TOP}}>
          <XRay>
            <Belt x0={x0} kinds={(j) => (j === 0 ? 'knife' : ordinary(j))} />
            {frame >= glisse ? (
              <div style={{position: 'absolute', left: x0 + 40, top: BELT_TOP + CASE.h + 50}}>
                <Mono size={48} color={METAL}>couteau</Mono>
              </div>
            ) : null}
          </XRay>
        </Pop>
        {/* Karima, de trois quarts dos, devant l'écran, en bas à gauche : son œil (un pixel) ne bouge pas. */}
        <Pop at={karimaAt} style={{position: 'absolute', left: KAR.x, top: KAR.y}}>
          <KarimaFig sprite={KARIMA} />
        </Pop>
        {/* Son nom sous elle, centré sur le sprite. */}
        <Pop at={karimaAt + 5} style={{position: 'absolute', left: KAR.x, width: 12 * KAR.px, top: KAR.y + 14 * KAR.px + 16, display: 'flex', justifyContent: 'center'}}>
          <Mono size={52} color="#fff">Karima</Mono>
        </Pop>
        {/* count-up : le compteur de valises, au-dessus de l'écran à droite, monte jusqu'à 800 de « huit » à « chaussettes ». */}
        <Pop at={huit} style={{position: 'absolute', right: 0, top: SCR_TOP - 110, display: 'flex', gap: 18, alignItems: 'baseline'}}>
          <Mono size={72} color={accent}>{countUp(frame, huit, 800, Math.max(20, chaussettes - huit))}</Mono>
          <Mono size={52} color={LABEL}>valises</Mono>
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 4. L'astuce : la fausse image d'arme, en gros plan dans une valise, l'œil qui s'ouvre ----------

const Tip: React.FC = () => {
  const frame = useCurrentFrame();
  const fausses = at('tip', 'fausses');
  const alerte = at('tip', 'alerte');
  // La valise anodine (j = 0) avance lentement ; sur « fausses », elle grossit (zoom) et l'arme s'y pose.
  const v = 2;
  const x0 = 230 + v * (frame - fausses);
  const g = frame >= fausses + 6 ? ease(frame, fausses + 6, fausses + 10) : 0;
  const zoom = ease(frame, fausses - 4, fausses + 8, [1, 1.6], 'inOut');
  const open = ease(frame, alerte, alerte + 10);
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 820}}>
        <Pop at={0} style={{position: 'absolute', left: 0, top: SCR_TOP}}>
          <XRay>
            <div style={{opacity: interpolate(zoom, [1, 1.6], [1, 0.45])}}>
              <Belt x0={x0} kinds={ordinary} skip={[0]} />
            </div>
            <div style={{position: 'absolute', left: x0, top: BELT_TOP, lineHeight: 0, transform: `scale(${zoom})`, transformOrigin: '50% 60%'}}>
              <Valise kind="socks" gun={g} />
            </div>
          </XRay>
        </Pop>
        {/* Karima s'efface à l'entrée. */}
        <div style={{position: 'absolute', left: KAR.x, top: KAR.y, opacity: gone(frame, 0)}}>
          <KarimaFig sprite={KARIMA} />
        </div>
        {/* Le libellé sous l'écran, à l'aplomb de la valise. */}
        <Pop at={fausses + 12} style={{position: 'absolute', left: Math.min(x0 - 20, W - 360), top: SCR_TOP + SCR.h + 24}}>
          <Mono size={52} color="#9cc4ff">fausse image</Mono>
        </Pop>
        {/* L'œil s'ouvre au-dessus de l'écran, sur « alerte ». */}
        <div style={{position: 'absolute', left: W / 2 - 85, top: 40, lineHeight: 0, opacity: frame >= alerte ? 1 : 0, transform: `scaleY(${open})`}}>
          <Eye size={170} look={Math.sin(frame / 6) * 0.7} />
        </div>
      </div>
    </Scene>
  );
};

// ---------- 5. L'expérience : le billet d'Anthropic, les demandes sur le tapis, mille testeurs, la commande dangereuse ----------

const Experience: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const anthropic = at('experience', 'Anthropic');
  const mille = at('experience', 'mille');
  const commande = at('experience', 'commande');
  const dangereuse = at('experience', 'dangereuse');
  const wipe = ease(frame, anthropic, anthropic + 18, [0, 1], 'inOut');
  // Même tapis, même sens : la bulle dangereuse (j = 0) passe au centre peu après « dangereuse ».
  const v = 4;
  const x0 = CENTER + v * (frame - dangereuse - 10);
  const red = frame >= commande;
  const jmin = Math.ceil((-300 - x0) / CASE.pitch);
  const jmax = Math.floor((SCR.w - x0) / CASE.pitch);
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 820}}>
        {/* wipe : du scanner (repris de la scène d'avant) vers les demandes de permission, de gauche à droite. */}
        <div style={{position: 'absolute', left: 0, top: SCR_TOP}}>
          <XRay>
            <Belt x0={x0} kinds={ordinary} />
            <div style={{position: 'absolute', inset: 0, background: '#0e0e0e', clipPath: `inset(0 ${100 - wipe * 100}% 0 0)`}}>
              {Array.from({length: Math.max(0, jmax - jmin + 1)}, (_, i) => jmin + i).map((j) => {
                const x = x0 + j * CASE.pitch;
                const danger = j === 0 && red;
                return (
                  <div key={j} style={{position: 'absolute', left: x - 20, top: 90, width: 270, height: 220, background: danger ? withAlpha(RED, 0.25) : '#151515', border: `5px solid ${danger ? RED : accent}`, borderRadius: 16, boxSizing: 'border-box', padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 14}}>
                    {danger ? (
                      <Pop at={dangereuse} style={{lineHeight: 0, alignSelf: 'center'}}><Skull w={110} /></Pop>
                    ) : (
                      <div style={{alignSelf: 'center'}}><Mono size={72} color={accent}>?</Mono></div>
                    )}
                    <div style={{display: 'flex', gap: 14, justifyContent: 'center'}}>
                      <div style={{width: 80, height: 40, border: `4px solid ${danger ? RED : accent}`, borderRadius: 8}} />
                      <div style={{width: 80, height: 40, border: '4px solid #777', borderRadius: 8}} />
                    </div>
                  </div>
                );
              })}
            </div>
          </XRay>
        </div>
        {/* pop in : le vrai billet du blog Claude en collage, sur « Anthropic » ; il part sur « mille ». */}
        <div style={{position: 'absolute', left: (W - 760) / 2, top: 30, opacity: gone(frame, mille - 4)}}>
          <Pop at={anthropic}>
            <Collage src="voix/human-loop-anthropic.png" sw={1000} crop={[230, 180, 760, 640]} w={760} tilt={1.5} />
          </Pop>
        </div>
        {/* stagger : la grille des testeurs apparaît en cascade (de gauche à droite, de haut en bas) sur « mille ». */}
        <div style={{position: 'absolute', left: 0, top: 30, display: 'grid', gridTemplateColumns: 'repeat(14, 54px)', columnGap: 9, rowGap: 6}}>
          {Array.from({length: 28}, (_, k) => (
            <Pop key={k} at={mille + Math.floor(k / 2)} style={{lineHeight: 0}}>
              <Pixel sprite={testeur(k)} px={9} seed={k} />
            </Pop>
          ))}
        </div>
        <Pop at={mille + 6} style={{position: 'absolute', right: 0, top: SCR_TOP + SCR.h + 30}}>
          <Mono size={52} color="#fff">mille testeurs</Mono>
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 6. La fatigue : loupe sur 0-20 %, la chute de 17 à 5 %, puis l'échelle s'ouvre à 100 % pour le 89 % ----------

const G = {x0: 210, x1: 840, base: 520, h: 440};
const gx = (n: number) => G.x0 + (n / 50) * (G.x1 - G.x0);
const tester = (n: number) => 5 + 12 * Math.exp(-n / 14) - 12 * Math.exp(-50 / 14) * (n / 50);

const Fatigue: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const n17 = at('fatigue', '17');
  const cinquante = at('fatigue', 'cinquante');
  const n5 = at('fatigue', '5');
  const classif = at('fatigue', 'classifieur');
  const n89 = at('fatigue', '89');
  // L'échelle verticale : d'abord 0 à 20 % (annoncée par le chiffre en haut de l'axe), puis elle s'ouvre à 100 % sur « classifieur ».
  const top = ease(frame, classif, classif + 18, [20, 100], 'inOut');
  const gy = (pct: number) => G.base - (pct / top) * G.h;
  const pts = Array.from({length: 101}, (_, i) => [gx(i / 2), gy(tester(i / 2))] as [number, number]);
  const len = pts.reduce((s, p, i) => (i ? s + Math.hypot(p[0] - pts[i - 1][0], p[1] - pts[i - 1][1]) : 0), 0);
  const path = 'M' + pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L');
  const drawT = ease(frame, cinquante, n5 + 6);
  const drawC = ease(frame, classif + 18, classif + 50);
  const grey = frame >= classif ? '#888' : '#fff';
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 640}}>
        {/* Les axes « demandes » de 0 à 50, et le haut de l'échelle (20 %, puis 100 %) : posés dès l'entrée. */}
        <Pop at={2} style={{position: 'absolute', inset: 0}}>
          <svg width={W} height={G.base + 10} viewBox={`0 0 ${W} ${G.base + 10}`} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
            <path d={`M${G.x0 - 20} ${G.base} H${G.x1 + 20}`} stroke="#fff" strokeWidth="6" />
            <path d={`M${G.x0 - 20} ${G.base} V${G.base - G.h - 20}`} stroke="#666" strokeWidth="5" />
            <line x1={G.x0 - 34} y1={G.base - G.h} x2={G.x0 - 6} y2={G.base - G.h} stroke="#cfcfcf" strokeWidth="5" />
            {[0, 50].map((n) => <line key={n} x1={gx(n)} y1={G.base - 10} x2={gx(n)} y2={G.base + 10} stroke="#fff" strokeWidth="5" />)}
            {frame >= n17 ? <circle cx={gx(0)} cy={gy(17)} r={14} fill={grey} /> : null}
            {frame >= cinquante ? <Draw d={path} p={drawT} width={10} len={len} color={grey} /> : null}
            {frame >= classif + 18 ? <Draw d={`M${gx(0)} ${gy(89)} H${gx(50)}`} p={drawC} width={12} len={gx(50) - gx(0)} color={accent} /> : null}
          </svg>
          <div style={{position: 'absolute', left: 0, width: G.x0 - 50, top: G.base - G.h - 30, display: 'flex', justifyContent: 'flex-end'}}><Mono size={48} color={LABEL}>{`${Math.round(top)} %`}</Mono></div>
          <div style={{position: 'absolute', left: gx(0) - 16, top: G.base + 16}}><Mono size={52} color={LABEL}>0</Mono></div>
          <div style={{position: 'absolute', left: gx(50) - 30, top: G.base + 16}}><Mono size={52} color={LABEL}>50</Mono></div>
          <div style={{position: 'absolute', left: W / 2 - 130, top: G.base + 16}}><Mono size={52} color="#fff">demandes</Mono></div>
        </Pop>
        <Pop at={n17 + 4} style={{position: 'absolute', left: gx(0) + 30, top: gy(17) - 80}}>
          <Mono size={56} color={grey}>17 %</Mono>
        </Pop>
        <Pop at={n5 + 4} style={{position: 'absolute', left: gx(50) - 110, top: gy(5) - 86}}>
          <Mono size={56} color={grey}>5 %</Mono>
        </Pop>
        <Pop at={classif + 18} style={{position: 'absolute', left: gx(0) + 20, top: gy(89) - 84}}>
          <Mono size={52} color={accent}>classifieur</Mono>
        </Pop>
        <Pop at={n89} style={{position: 'absolute', left: gx(50) - 150, top: gy(89) - 84}}>
          <Mono size={56} color={accent}>89 %</Mono>
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 7. Chute : le tapis s'arrête sur la valise au couteau, Karima la regarde, les chaussettes filent derrière ----------

const S2 = 0.8; // valises réduites en chute : trois valises tiennent à l'écran avec de l'air
const P2 = 290;
const CENTER2 = (SCR.w - CASE.w * S2) / 2;

const Chute: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const couteau = at('chute', 'couteau');
  const filer = at('chute', 'filer');
  // Le tapis roule (linéaire) puis freine pour poser la valise au couteau (j = 0) au centre, juste après « couteau ».
  const v = 7;
  const D = 24;
  const c0 = couteau + 8 - D;
  const off = (f: number) => (f < c0 ? v * f : v * c0 + ((v * D) / 3) * ease(f, c0, c0 + D));
  const x0 = CENTER2 - (v * c0 + (v * D) / 3) + off(frame);
  const lit = frame >= couteau + 8;
  // Sur « filer », les valises de chaussettes repartent sur le tapis du fond (démarrage en douceur), une coche verte chacune.
  const back = frame >= filer ? 6 * (frame - filer) * ease(frame, filer, filer + 12) : 0;
  const knife: [number, number] = [x0 + (CASE.w * S2) / 2, SCR_TOP + BELT_TOP + 30 + (CASE.h + 30) * (1 - S2) + 60];
  const eye: [number, number] = [KAR.x + 9.5 * KAR.px, KAR.y + 3.5 * KAR.px];
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 820}}>
        {/* Reprise du scanner, à la même place, déjà en mouvement. */}
        <Pop at={0} style={{position: 'absolute', left: 0, top: SCR_TOP}}>
          <XRay>
            {frame >= filer ? (
              <div style={{position: 'absolute', inset: 0, opacity: ease(frame, filer, filer + 8, [0, 0.9])}}>
                <Belt
                  x0={-200 + back}
                  top={-62}
                  s={0.45}
                  pitch={150}
                  kinds={() => 'socks'}
                  extra={(j) => <div style={{position: 'absolute', left: 60, top: 30, lineHeight: 0}}><Check p={ease(frame, filer + 6 + ((j % 4) + 4) % 4 * 3, filer + 16 + ((j % 4) + 4) % 4 * 3)} size={120} color={GREEN} /></div>}
                />
              </div>
            ) : null}
            <Belt x0={x0} kinds={(j) => (j === 0 ? 'knife' : ordinary(j))} pitch={P2} s={S2} skip={lit ? [0] : []} />
            {lit ? (
              <div style={{position: 'absolute', left: x0, top: BELT_TOP + (CASE.h + 30) * (1 - S2), width: CASE.w, height: CASE.h + 30, lineHeight: 0, transform: `scale(${S2})`, transformOrigin: 'left top'}}>
                <Valise kind="knife" lit />
              </div>
            ) : null}
          </XRay>
        </Pop>
        {/* La demande « Autoriser ? » au-dessus de l'écran, avec de l'air, sur « couteau ». */}
        <div style={{position: 'absolute', left: 0, top: 30, width: W, display: 'flex', justifyContent: 'center'}}>
          <Pop at={couteau + 4} style={{background: '#151515', border: `5px solid ${RED}`, borderRadius: 16, padding: '14px 24px', display: 'flex', alignItems: 'center', gap: 30}}>
            <Mono size={52} color="#fff">Autoriser ?</Mono>
            <Buttons />
          </Pop>
        </div>
        {/* Karima revient, tourne la tête et regarde enfin la valise (son regard en pointillé). */}
        {frame >= couteau + 8 ? (
          <svg width={W} height={820} viewBox={`0 0 ${W} 820`} style={{position: 'absolute', left: 0, top: 0}}>
            <line x1={eye[0]} y1={eye[1]} x2={eye[0] + (knife[0] - eye[0]) * ease(frame, couteau + 8, couteau + 18)} y2={eye[1] + (knife[1] - eye[1]) * ease(frame, couteau + 8, couteau + 18)} stroke={accent} strokeWidth="6" strokeDasharray="14 10" strokeLinecap="round" />
          </svg>
        ) : null}
        <Pop at={couteau} style={{position: 'absolute', left: KAR.x, top: KAR.y}}>
          <KarimaFig sprite={KARIMA_UP} />
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- Montage ----------

const SCENES: Record<string, React.FC> = {hook: Hook, reflexe: Reflexe, nom: Nom, karima: Karima, tip: Tip, experience: Experience, fatigue: Fatigue, chute: Chute};

export const HumanLoopVoix: React.FC = () => <V.Montage scenes={SCENES} accent={AC} />;

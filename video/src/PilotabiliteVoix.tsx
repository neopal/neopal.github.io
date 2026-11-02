// Short Pilotabilité (YouTube / TikTok / Instagram), épisode 27, définition, voix off PAL - FR, préparé le 2026-11-02
// (calage provisoire, sans voix). Fiche pilotabilite de lexique/terms.js ; sources dans voix/pilotabilite.script.json :
// Anthropic, Prompting best practices (modèles plus réceptifs, adoucir « CRITICAL: You MUST ») ; Wikipédia, Grok
// (juillet 2025, consigne « politically incorrect », retirée) ; IFEval (Google, 2023, consignes vérifiables) ; l'image
// de Jean-Marc et du peintre, inventée.
// Fil : l'ép. 26 montrait que le modèle prolonge un motif ; une consigne en est un, et il la suit jusqu'à un certain point.
// Scène grok : ni portrait, ni logo, ni capture de messages ; seulement une fenêtre de consignes dessinée.
// Les deux pièces (salon, chambre) ont la même taille et la même place dans peintre et chute (ROOM, ROOMS_TOP).
// L'écran suit la voix et Le mouvement (univers.md) : chaque élément entre sur le mot qui le nomme (at), easing du kit,
// linéaire seulement pour la frappe (typewriter), un seul punch zoom (la ligne rouge de Grok).
import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Big, Check, Mono, Pop, Scene, W, arc, clamp, ease, punch, typed, useAccent, withAlpha} from './kit';
import {LABEL, blink, makeVoix} from './voix/VoixShort';
import {Pixel, type Sprite} from './voix/Pixel';
import {Cross, Model, pixelShadow} from './voix/Parts';
import ALIGN from './voix/pilotabilite.align.json';
import SCRIPT from './voix/pilotabilite.script.json';

const AC = '#FFB86B'; // catégorie Comportements et limites
const V = makeVoix(ALIGN, SCRIPT, 'voix/prediction-music.mp3');
const {at} = V;
export const PILOTABILITEVOIX_DURATION = V.duration;

const RED = '#FF4D4D';
const YELLOW = '#FFD21F'; // le jaune poussin
const WARM = '#F3E6CB'; // le blanc chaleureux du nuancier, celui de la chambre
const PLASTER = '#8f8a82'; // le mur pas encore peint
const gone = (frame: number, until: number) => ease(frame, until, until + 6, [1, 0], 'inOut');
// Entrée / sortie identiques à celles de Scene, pour un calque posé hors de la Scene.
const useSceneOpacity = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  return interpolate(frame, [0, 6], [0, 1], clamp) * (1 - interpolate(frame, [durationInFrames - 5, durationInFrames], [0, 1], clamp));
};

// ---------- Personnages (pixel art, même format que voix/Pixel.tsx) ----------

const SKIN = '#e3b58e';

// Jean-Marc : crâne dégarni, couronne de cheveux bruns, moustache, polo vert, jean.
const JEANMARC: Sprite = {
  rows: [
    '...HSSSSH...',
    '..HSSSSSSH..',
    '..HSSSSSSH..',
    '..HSESSESH..',
    '...SSSSSS...',
    '...SMMMMS...',
    '....SSSS....',
    '..PPPPPPPP..',
    '.PPPPPPPPPP.',
    '.PPPPPPPPPP.',
    '.SPPPPPPPPS.',
    '.SPPPPPPPPS.',
    '...JJJJJJ...',
    '...JJ..JJ...',
  ],
  palette: {H: '#5a3a22', S: SKIN, E: '#111', M: '#5a3a22', P: '#4f8a5b', J: '#3b5a8a'},
};

// Le peintre : casquette et salopette blanches tachées de peinture, le rouleau levé dans la main droite.
const PEINTRE: Sprite = {
  rows: [
    '....CCCC...RRRRR',
    '...CCCCCCC.RRRRR',
    '...SSSSSS.....H.',
    '...SESSES.....H.',
    '...SSSSSS.....H.',
    '...SSMMSS.....H.',
    '....SSSS......H.',
    '..WWWWWWWW....H.',
    '.WWWWYWWWWSSSSH.',
    '.WWWWWWWWWW...H.',
    '.SWWBWWWWWW.....',
    '.SWWWWWWYWS.....',
    '...WWWWWW.......',
    '...WW..WW.......',
  ],
  palette: {C: '#f2f2f2', R: '#d9d0bf', H: '#8a8a8a', S: SKIN, E: '#111', M: '#b5524f', W: '#e8e8e8', Y: YELLOW, B: '#5b7fb5'},
};

// Jean-Marc cligne des yeux, vite et plusieurs fois, quand il découvre le jaune (yeux fermés une image sur trois).
const stunned = (s: Sprite, frame: number, from: number): Sprite =>
  frame >= from && frame < from + 24 && (frame - from) % 6 < 2 ? {...s, palette: {...s.palette, E: s.palette.S}} : s;

// ---------- Le nuancier en éventail (hook, chute) ----------

const STRIPS = [
  ['#fff7e0', '#ffeab0', '#ffd96a', '#f5c400'],
  ['#ffe9d6', '#ffc99a', '#ffa45c', '#f07a1a'],
  ['#ffe0dc', '#ffb3aa', '#ff7c6e', '#e0453a'],
  ['#f9e0ee', '#f2b3d6', '#e07bb4', '#b8478a'],
  ['#ece3fa', '#cdb6f2', '#a17fe0', '#6e4ab8'],
  ['#e0ecfa', '#acc9f0', '#6f9fe0', '#3a6cc0'],
  ['#dcf3ef', '#a6e0d6', '#5cc2b0', '#22917e'],
  ['#e6f3da', '#bfe2a0', '#8cc85c', '#5a9a2a'],
  [WARM, '#ece0c6', '#d9c7a4', '#bba57c'],
];

// Neuf lames qui pivotent autour d'un rivet ; `open` de 0 (fermé) à 1 (grand ouvert, environ 150°).
const Fan: React.FC<{open: number; r: number}> = ({open, r}) => {
  const spread = 12 + 138 * open;
  const n = STRIPS.length;
  const bw = r * 0.2;
  return (
    <svg width={2 * r + 40} height={r + 40} viewBox={`${-r - 20} ${-r - 20} ${2 * r + 40} ${r + 40}`} style={{overflow: 'visible'}}>
      {STRIPS.map((cols, k) => {
        const a = -spread / 2 + (spread * k) / (n - 1);
        const band = (r * 0.78) / cols.length;
        return (
          <g key={k} transform={`rotate(${a} 0 ${-bw / 2})`}>
            <rect x={-bw / 2} y={-r} width={bw} height={r} rx={8} fill="#efe9dc" stroke="#111" strokeWidth={3} />
            {cols.map((c, j) => <rect key={j} x={-bw / 2 + 6} y={-r + 6 + j * band} width={bw - 12} height={band - 4} fill={c} />)}
          </g>
        );
      })}
      <circle cx={0} cy={-bw / 2} r={bw * 0.22} fill="#8a8a8a" stroke="#111" strokeWidth={3} />
    </svg>
  );
};

// ---------- Les deux pièces vues de face (peintre, chute) ----------

const ROOM = {w: 420, h: 380, gap: 48};
const ROOMS_TOP = 70;
const ROOM_X = [0, ROOM.w + ROOM.gap];

// Une pièce : le mur (plâtre, puis la peinture en wipe de gauche à droite), une fenêtre, la plinthe et le parquet.
const Room: React.FC<{paint: number; color: string}> = ({paint, color}) => (
  <div style={{position: 'relative', width: ROOM.w, height: ROOM.h, border: '6px solid #cfcfcf', boxSizing: 'border-box', background: PLASTER, overflow: 'hidden'}}>
    <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: `${paint * 100}%`, background: color}} />
    <div style={{position: 'absolute', left: ROOM.w - 170, top: 46, width: 130, height: 150, border: '8px solid #efe9dc', background: '#2a3c5a', boxSizing: 'border-box'}}>
      <div style={{position: 'absolute', left: 49, top: 0, bottom: 0, width: 8, background: '#efe9dc'}} />
    </div>
    <div style={{position: 'absolute', left: 0, right: 0, bottom: 56, height: 14, background: '#efe9dc'}} />
    <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 56, background: 'repeating-linear-gradient(90deg, #8a5a32 0 70px, #7a4e2a 70px 74px)'}} />
  </div>
);

// La pastille du nuancier : la couleur en haut, son numéro dessous ; scotchée sur le mur de la chambre.
const CHIP = {w: 170, h: 200};
const Chip: React.FC = () => (
  <div style={{position: 'relative', width: CHIP.w, height: CHIP.h, background: '#fff', border: '4px solid #111', boxShadow: pixelShadow('#333'), boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
    <div style={{width: CHIP.w - 24, height: 110, marginTop: 10, background: WARM, border: '3px solid #bba57c', boxSizing: 'border-box'}} />
    <div style={{marginTop: 8}}><Mono size={48} color="#111">0502</Mono></div>
    <div style={{position: 'absolute', left: 40, top: -14, width: 90, height: 26, background: 'rgba(239,233,220,0.85)', transform: 'rotate(-6deg)'}} />
  </div>
);
const CHIP_AT: [number, number] = [ROOM_X[1] + 26, ROOMS_TOP + 40]; // posée sur le mur de la chambre, à gauche de la fenêtre

// ---------- 0. Hook : le nuancier à moitié ouvert, et le titre ----------

const Hook: React.FC = () => {
  const op = useSceneOpacity();
  return (
    <>
      {/* Le nuancier en éventail, à moitié ouvert, posé dès la première image au-dessus du titre (aucun sous-titre). */}
      <div style={{position: 'absolute', left: 0, top: 150, width: 1080, display: 'flex', justifyContent: 'center', opacity: op}}>
        <Fan open={0.45} r={400} />
      </div>
      <V.TitleHook lead="C'est quoi ?" lines={['la pilotabilité']} cue="pilotabilité" />
    </>
  );
};

// ---------- 1. Intro : la consigne s'écrit, la réponse sort de sa dernière ligne comme une suite ----------

const LINE = {h: 24, pitch: 56, x: 39, y0: 129};
const BUBBLE = {top: 90, h: 250};
const ASK = [800, 640, 760, 420]; // la consigne, en traits (la voix n'en dit pas le texte)
const MORE = [810 - 420 - 24, 810, 700, 560]; // la suite : la fin de la dernière ligne, puis trois lignes sous la bulle

const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const ecris = at('intro', 'écris');
  const prolongeant = at('intro', 'prolongeant');
  const mots = at('intro', 'mots');
  const prolonge = at('intro', 'prolonge', 1);
  // typewriter : la consigne se tape à vitesse constante de l'entrée à « écris » ; la suite, de « prolongeant » à « prolonge ».
  const totA = ASK.reduce((s, w) => s + w, 0);
  const shownA = interpolate(frame, [6, ecris], [0, totA], clamp);
  const totB = MORE.reduce((s, w) => s + w, 0);
  const shownB = interpolate(frame, [prolongeant, prolonge + 10], [0, totB], clamp);
  const part = (ws: number[], shown: number) => {
    let left = shown;
    return ws.map((w) => {
      const v = Math.max(0, Math.min(w, left));
      left -= w;
      return v;
    });
  };
  const a = part(ASK, shownA);
  const b = part(MORE, shownB);
  // Le curseur clignote au bout du dernier trait tapé.
  const caret = (() => {
    if (shownB > 0 || frame >= prolongeant) {
      const k = b.findIndex((v, i) => v < MORE[i]);
      const i = k < 0 ? MORE.length - 1 : Math.max(0, k);
      return i === 0 ? [LINE.x + ASK[3] + 24 + b[0], LINE.y0 + 3 * LINE.pitch] : [LINE.x + b[i], LINE.y0 + (3 + i) * LINE.pitch];
    }
    const k = a.findIndex((v, i) => v < ASK[i]);
    const i = k < 0 ? ASK.length - 1 : k;
    return [LINE.x + a[i], LINE.y0 + i * LINE.pitch];
  })();
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 620}}>
        {/* La bulle de consigne : posée dès l'entrée, ses traits se tapent. */}
        <Pop at={0} style={{position: 'absolute', left: 0, top: BUBBLE.top, width: W, height: BUBBLE.h, background: '#151515', border: '5px solid #8a8a8a', borderRadius: 26, boxSizing: 'border-box'}}>
          <div />
        </Pop>
        {a.map((v, k) => <div key={k} style={{position: 'absolute', left: LINE.x, top: LINE.y0 + k * LINE.pitch, width: v, height: LINE.h, background: '#e8e8e8'}} />)}
        {/* La suite sort de la dernière ligne, même épaisseur, même alignement, en couleur d'accent ; puis déborde de la bulle. */}
        <div style={{position: 'absolute', left: LINE.x + ASK[3] + 24, top: LINE.y0 + 3 * LINE.pitch, width: b[0], height: LINE.h, background: accent}} />
        {b.slice(1).map((v, k) => <div key={k} style={{position: 'absolute', left: LINE.x, top: LINE.y0 + (4 + k) * LINE.pitch, width: v, height: LINE.h, background: accent}} />)}
        <div style={{position: 'absolute', left: caret[0] + 8, top: caret[1] - 8, width: 10, height: LINE.h + 16, background: '#fff', opacity: blink(frame)}} />
        {/* Les deux libellés, chacun sur son mot. */}
        <Pop at={mots} style={{position: 'absolute', left: 0, top: 0}}><Mono size={52} color={LABEL}>tes mots</Mono></Pop>
        <Pop at={prolonge + 4} style={{position: 'absolute', right: 0, top: LINE.y0 + 6 * LINE.pitch + 50}}><Mono size={52} color={accent}>la suite</Mono></Pop>
      </div>
    </Scene>
  );
};

// ---------- 2. Le nom : le volant tourne d'un quart de tour, puis le terme en français et en anglais ----------

const Wheel: React.FC<{size: number; turn: number}> = ({size, turn}) => {
  const accent = useAccent();
  return (
    <svg width={size} height={size} viewBox="-100 -100 200 200" style={{transform: `rotate(${turn}deg)`}}>
      <circle r={86} fill="none" stroke="#e8e8e8" strokeWidth={16} />
      {[90, 210, 330].map((d) => <line key={d} x1={0} y1={0} x2={80 * Math.cos((d * Math.PI) / 180)} y2={80 * Math.sin((d * Math.PI) / 180)} stroke="#e8e8e8" strokeWidth={14} strokeLinecap="round" />)}
      <circle r={24} fill="#2a2a2a" stroke="#e8e8e8" strokeWidth={8} />
      <rect x={-8} y={-102} width={16} height={22} fill={accent} />
    </svg>
  );
};

const Nom: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const guide = at('nom', 'guide');
  const pilo = at('nom', 'pilotabilité');
  const steer = at('nom', 'steerability');
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 700}}>
        {/* Le volant, posé dès l'entrée ; il tourne d'un quart de tour sur « guide » (inOut). */}
        <Pop at={0} style={{position: 'absolute', left: (W - 300) / 2, top: 400, lineHeight: 0}}>
          <Wheel size={300} turn={ease(frame, guide - 6, guide + 16, [0, 90], 'inOut')} />
        </Pop>
        {/* pop in : le terme, écrit comme la voix le dit (sous-titre masqué par onscreen). */}
        <Pop at={pilo} style={{position: 'absolute', left: 0, top: 40, width: W}}>
          <Big size={124}>pilotabilité</Big>
        </Pop>
        <Pop at={steer} style={{position: 'absolute', left: 0, top: 200, width: W}}>
          <Big size={110} color={accent}><span style={{whiteSpace: 'nowrap'}}>steerability</span></Big>
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 3. L'image : Jean-Marc, le peintre, le salon jaune poussin et la chambre à la référence ----------

const CH = {top: ROOMS_TOP + ROOM.h + 40, px: 16};

const Peintre: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const jm = at('peintre', 'Jean-Marc');
  const peintre = at('peintre', 'peintre');
  const salon = at('peintre', 'salon');
  const jaune = at('peintre', 'jaune');
  const poussin = at('peintre', 'poussin');
  const chambre = at('peintre', 'chambre');
  const ref = at('peintre', 'référence');
  const nuancier = at('peintre', 'nuancier');
  const mur = at('peintre', 'mur');
  // La pastille vole en arc de la main de Jean-Marc jusqu'au mur de la chambre, sur « référence ».
  const fly = ease(frame, ref, ref + 14, [0, 1], 'inOut');
  const [cx, cy] = arc(fly, [120, CH.top + 60], CHIP_AT, 120);
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 820}}>
        {/* Le décor : les deux pièces, murs pas encore peints, posées dès l'entrée. */}
        {[0, 1].map((k) => (
          <Pop key={k} at={k * 3} style={{position: 'absolute', left: ROOM_X[k], top: ROOMS_TOP}}>
            {/* wipe : le salon en jaune poussin sur « jaune », la chambre à la couleur de la pastille sur « nuancier ». */}
            <Room paint={k === 0 ? ease(frame, jaune, jaune + 18, [0, 1], 'inOut') : ease(frame, nuancier, nuancier + 18, [0, 1], 'inOut')} color={k === 0 ? YELLOW : WARM} />
          </Pop>
        ))}
        <Pop at={salon} style={{position: 'absolute', left: ROOM_X[0], width: ROOM.w, top: 0, display: 'flex', justifyContent: 'center'}}><Mono size={52} color="#fff">salon</Mono></Pop>
        <Pop at={chambre} style={{position: 'absolute', left: ROOM_X[1], width: ROOM.w, top: 0, display: 'flex', justifyContent: 'center'}}><Mono size={52} color="#fff">chambre</Mono></Pop>
        {/* La coche sur le mur de la chambre, une fois peint, sur « mur » (draw-on). */}
        {frame >= mur ? (
          <div style={{position: 'absolute', left: ROOM_X[1] + ROOM.w - 170, top: ROOMS_TOP + 190, lineHeight: 0}}>
            <Check p={ease(frame, mur, mur + 14)} size={140} color="#2f8a3a" />
          </div>
        ) : null}
        {/* Jean-Marc, à gauche ; il cligne des yeux plusieurs fois devant le jaune poussin. */}
        <Pop at={jm} style={{position: 'absolute', left: 10, top: CH.top, lineHeight: 0}}>
          <Pixel sprite={stunned(JEANMARC, frame, poussin + 4)} px={CH.px} seed={2} />
        </Pop>
        <Pop at={jm + 5} style={{position: 'absolute', left: 0, width: 12 * CH.px + 20, top: CH.top + 14 * CH.px + 14, display: 'flex', justifyContent: 'center'}}>
          <Mono size={48} color={LABEL}>Jean-Marc</Mono>
        </Pop>
        {/* Le peintre et son rouleau, entre les deux pièces. */}
        <Pop at={peintre} style={{position: 'absolute', left: W / 2 - 8 * CH.px + 40, top: CH.top, lineHeight: 0}}>
          <Pixel sprite={PEINTRE} px={CH.px} seed={5} />
        </Pop>
        {/* La pastille du nuancier (arc), sur « référence ». */}
        {frame >= ref ? (
          <div style={{position: 'absolute', left: cx, top: cy, transform: `scale(${0.6 + 0.4 * fly}) rotate(${-4 * fly}deg)`, transformOrigin: 'left top'}}>
            <Chip />
          </div>
        ) : null}
      </div>
    </Scene>
  );
};

// ---------- 4. La règle : quatre consignes, trois tiennent, la dernière beaucoup moins ----------

const ROWS = [
  {label: 'un format', word: 'format', verdict: 'tient'},
  {label: 'une langue', word: 'langue', verdict: 'très'},
  {label: 'une longueur', word: 'longueur', verdict: 'bien'},
  {label: 'une intention', word: 'intention', verdict: 'moins'},
];

const Regle: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const ia = at('regle', 'IA');
  const pareil = at('regle', 'pareil');
  const format = at('regle', 'format');
  const top = 250;
  const pitch = 140;
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 820}}>
        {/* Le rappel du peintre (la pastille) posé dès l'entrée, l'IA sur « IA », le signe égal sur « pareil » ; ils passent en retrait sur « format ». */}
        <div style={{position: 'absolute', left: 0, top: 0, width: W, height: 210, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 60, opacity: interpolate(gone(frame, format - 4), [0, 1], [0.3, 1])}}>
          <Pop at={0} style={{lineHeight: 0}}><Chip /></Pop>
          <Pop at={pareil}><Mono size={96} color="#fff">=</Mono></Pop>
          <Pop at={ia} style={{lineHeight: 0}}><Model w={260} /></Pop>
        </div>
        {/* stagger : les quatre consignes en cascade, chacune sur son mot ; le verdict à droite, sur « tient très bien » puis « moins ». */}
        {ROWS.map((r, k) => {
          const t = at('regle', r.word);
          const v = at('regle', r.verdict);
          const weak = k === 3;
          return (
            <div key={k} style={{position: 'absolute', left: 0, top: top + k * pitch, width: W, height: pitch - 20}}>
              <Pop at={t} style={{position: 'absolute', left: 0, top: 0, width: W, height: pitch - 20, borderBottom: '4px solid #3a3a3a', display: 'flex', alignItems: 'center'}}>
                <Mono size={60} color="#fff">{r.label}</Mono>
              </Pop>
              <Pop at={v} style={{position: 'absolute', right: 0, top: 0, height: pitch - 20, display: 'flex', alignItems: 'center'}}>
                <Mono size={60} color={weak ? LABEL : accent}>{weak ? 'faible' : 'forte'}</Mono>
              </Pop>
            </div>
          );
        })}
      </div>
    </Scene>
  );
};

// ---------- 5. Grok : une ligne rouge dans la fenêtre de consignes, les réponses qui basculent, la ligne barrée ----------

const WIN = {top: 90, h: 360, bar: 64};
const GREYS = [720, 560, 680, 500];
const NOTCH = 96;

const Grok: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const ligne = at('grok', 'ligne');
  const juillet = at('grok', 'juillet');
  const grok = at('grok', 'Grok');
  const polit = at('grok', 'politiquement');
  const fini = at('grok', 'fini');
  const retire = at('grok', 'retire');
  const back = at('grok', 'ligne', 1);
  const redY = WIN.top + WIN.bar + 30 + 4 * 50;
  // Les réponses glissent d'un cran sur « politiquement », de cinq sur « fini », puis reviennent quand la ligne part.
  const shift = (d: number) =>
    NOTCH * (ease(frame, polit + d, polit + d + 12, [0, 1], 'inOut') + ease(frame, fini + d, fini + d + 16, [0, 4], 'inOut')) * ease(frame, back + d, back + d + 14, [1, 0], 'inOut');
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 820}}>
        <Pop at={juillet} style={{position: 'absolute', right: 0, top: 0}}><Mono size={56} color={accent}>juillet 2025</Mono></Pop>
        {/* La fenêtre de consignes dessinée, lignes grises, posée dès l'entrée ; le nom du chatbot dans sa barre sur « Grok ». */}
        <Pop at={0} style={{position: 'absolute', left: 0, top: WIN.top, width: W, height: WIN.h, background: '#151515', border: '5px solid #8a8a8a', borderRadius: 16, boxSizing: 'border-box', overflow: 'hidden'}}>
          <div style={{height: WIN.bar, background: '#262626', display: 'flex', alignItems: 'center', padding: '0 24px', gap: 14}}>
            {[0, 1, 2].map((k) => <div key={k} style={{width: 18, height: 18, borderRadius: '50%', background: '#777'}} />)}
            <div style={{marginLeft: 14, opacity: frame >= grok ? 1 : 0}}><Mono size={48} color="#e8e8e8">Grok</Mono></div>
          </div>
        </Pop>
        {GREYS.map((w, k) => (
          <div key={k} style={{position: 'absolute', left: 34, top: WIN.top + WIN.bar + 30 + k * 50, width: w, height: 22, background: '#6a6a6a', opacity: interpolate(frame, [0, 6], [0, 1], clamp)}} />
        ))}
        {/* La ligne ajoutée, en rouge, sur « ligne » : pop in, highlight, et le punch zoom du short ; barrée sur « retire » (draw-on). */}
        {frame >= ligne ? (
          <div style={{position: 'absolute', left: 34, top: redY - 12, width: 700, height: 46, transform: `scale(${punch(frame, ligne + 12)})`, transformOrigin: 'left center'}}>
            <div style={{position: 'absolute', left: -10, top: 0, height: 46, width: 720 * ease(frame, ligne + 4, ligne + 16), background: withAlpha('#FFE14D', 0.4), opacity: frame >= retire ? 0.35 : 1}} />
            <div style={{position: 'absolute', left: 0, top: 12, width: 640 * ease(frame, ligne, ligne + 8), height: 22, background: RED, opacity: frame >= retire ? 0.45 : 1}} />
            {frame >= retire ? <div style={{position: 'absolute', left: -14, top: 18, width: 670 * ease(frame, retire, retire + 10), height: 10, background: '#fff'}} /> : null}
          </div>
        ) : null}
        {/* Les réponses, sous la fenêtre, sur une règle à crans posée dès l'entrée ; elles basculent vers la droite (cascade de 3 images). */}
        <svg width={W} height={60} viewBox={`0 0 ${W} 60`} style={{position: 'absolute', left: 0, top: 760, opacity: interpolate(frame, [0, 6], [0, 1], clamp)}}>
          <line x1={0} y1={10} x2={W} y2={10} stroke="#cfcfcf" strokeWidth={5} />
          {Array.from({length: 10}, (_, k) => <line key={k} x1={4 + k * NOTCH} y1={0} x2={4 + k * NOTCH} y2={30} stroke="#cfcfcf" strokeWidth={5} />)}
        </svg>
        {[0, 1, 2].map((k) => {
          const s = shift(k * 3);
          const far = s / (5 * NOTCH);
          return (
            <div key={k} style={{position: 'absolute', left: s, top: 500 + k * 84, width: 380, height: 64, borderRadius: 20, background: '#222', border: `5px solid ${far > 0.5 ? RED : '#5a5a5a'}`, boxSizing: 'border-box', padding: '0 22px', display: 'flex', alignItems: 'center', gap: 14, opacity: interpolate(frame, [k * 2, k * 2 + 6], [0, 1], clamp)}}>
              <div style={{height: 14, width: [200, 150, 230][k], background: far > 0.5 ? withAlpha(RED, 0.8) : '#7a7a7a'}} />
              <div style={{height: 14, width: [70, 110, 50][k], background: far > 0.5 ? withAlpha(RED, 0.8) : '#7a7a7a'}} />
            </div>
          );
        })}
      </div>
    </Scene>
  );
};

// ---------- 6. Les majuscules : la consigne qui tremble, les appels d'outils en cascade, puis la casse normale ----------

const Wrench: React.FC<{w: number; color: string}> = ({w, color}) => (
  <svg width={w} height={w} viewBox="0 0 100 100">
    <path d="M64 12 a24 24 0 0 0 -22 32 L14 72 a10 10 0 0 0 14 14 L56 58 a24 24 0 0 0 32 -22 l-14 8 l-12 -6 l-2 -14 Z" fill={color} />
  </svg>
);

const Majuscules: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const dociles = at('majuscules', 'dociles');
  const anthropic = at('majuscules', 'Anthropic');
  const maj = at('majuscules', 'majuscules');
  const trop = at('majuscules', 'trop');
  // La consigne en capitales tremble jusqu'à « majuscules », où elle se réécrit en casse normale (typewriter).
  const shaking = frame < maj;
  const dx = shaking ? Math.round(Math.sin(frame * 2.7) * 5) : 0;
  const dy = shaking ? Math.round(Math.cos(frame * 3.3) * 4) : 0;
  const caps = gone(frame, maj);
  const soft = typed(frame, maj + 6, 'Critical: you must', 40);
  // Un appel d'outil dès l'entrée ; dix en cascade sur « dociles » (stagger de 3 images) ; retour à un sur « trop ».
  const CELL = 100;
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 770}}>
        <Pop at={anthropic} style={{position: 'absolute', left: 0, top: 0}}><Mono size={52} color={LABEL}>Anthropic</Mono></Pop>
        {/* La consigne, posée dès l'entrée. */}
        <Pop at={0} style={{position: 'absolute', left: 0, top: 90, width: W, height: 310, background: '#151515', border: `5px solid ${shaking ? RED : '#8a8a8a'}`, borderRadius: 16, boxSizing: 'border-box'}}>
          <div style={{position: 'absolute', left: 40, top: 26, transform: `translate(${dx}px, ${dy}px)`, opacity: caps}}>
            <Mono size={96} color="#fff">CRITICAL:</Mono>
            <Mono size={96} color={RED}>YOU MUST</Mono>
          </div>
          {frame >= maj + 6 ? (
            <div style={{position: 'absolute', left: 40, top: 100}}>
              <Mono size={72} color="#e8e8e8">{soft || ' '}</Mono>
            </div>
          ) : null}
        </Pop>
        {/* L'agent et ses appels d'outils. */}
        <Pop at={2} style={{position: 'absolute', left: 0, top: 520, lineHeight: 0}}><Model w={230} /></Pop>
        {Array.from({length: 10}, (_, k) => {
          const on = k === 0 ? 0 : dociles + 3 * (k - 1);
          const off = k === 0 ? 1 : gone(frame, trop + (9 - k));
          const x = 300 + (k % 5) * (CELL + 16);
          const y = 470 + Math.floor(k / 5) * (CELL + 16);
          return (
            <Pop key={k} at={on} style={{position: 'absolute', left: x, top: y, width: CELL, height: CELL, border: `5px solid ${k === 0 ? accent : RED}`, borderRadius: 14, background: '#1a1a1a', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: off}}>
              <Wrench w={60} color={k === 0 ? accent : '#e8e8e8'} />
            </Pop>
          );
        })}
      </div>
    </Scene>
  );
};

// ---------- 7. Chute : les deux pièces plein cadre, la croix sur le salon, le nuancier grand ouvert ----------

const Chute: React.FC = () => {
  const frame = useCurrentFrame();
  const but = at('chute', 'but');
  const ref = at('chute', 'référence');
  const open = ease(frame, ref - 4, ref + 18, [0.3, 0.82], 'inOut');
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 820}}>
        {/* Reprise des deux pièces, à la même place, déjà peintes ; la pastille et la coche sur la chambre. */}
        {[0, 1].map((k) => (
          <div key={k} style={{position: 'absolute', left: ROOM_X[k], top: ROOMS_TOP}}>
            <Room paint={1} color={k === 0 ? YELLOW : WARM} />
          </div>
        ))}
        <div style={{position: 'absolute', left: CHIP_AT[0], top: CHIP_AT[1], transform: 'rotate(-4deg)', transformOrigin: 'left top'}}><Chip /></div>
        <div style={{position: 'absolute', left: ROOM_X[1] + ROOM.w - 170, top: ROOMS_TOP + 190, lineHeight: 0}}><Check p={1} size={140} color="#2f8a3a" /></div>
        {/* La croix sur le salon, sur « but » (draw-on). */}
        <div style={{position: 'absolute', left: ROOM.w / 2 - 80, top: ROOMS_TOP + 200, lineHeight: 0, opacity: frame >= but ? 1 : 0}}>
          <Cross p={ease(frame, but, but + 12)} size={160} color={RED} />
        </div>
        {/* Jean-Marc et le peintre aux deux bords. */}
        <div style={{position: 'absolute', left: 0, top: 600, lineHeight: 0}}><Pixel sprite={JEANMARC} px={12} seed={2} /></div>
        <div style={{position: 'absolute', right: 0, top: 600, lineHeight: 0}}><Pixel sprite={PEINTRE} px={12} seed={5} /></div>
        {/* Le nuancier au milieu, à moitié ouvert dès l'entrée ; il s'ouvre en grand sur « référence ». */}
        <div style={{position: 'absolute', left: W / 2 - 300, top: 470, lineHeight: 0}}>
          <Fan open={open} r={280} />
        </div>
      </div>
    </Scene>
  );
};

// ---------- Montage ----------

const SCENES: Record<string, React.FC> = {hook: Hook, intro: Intro, nom: Nom, peintre: Peintre, regle: Regle, grok: Grok, majuscules: Majuscules, chute: Chute};

export const PilotabiliteVoix: React.FC = () => <V.Montage scenes={SCENES} accent={AC} />;

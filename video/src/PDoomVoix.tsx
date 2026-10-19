// Short p(doom) (YouTube / TikTok / Instagram), épisode 16, définition, voix off PAL - FR, préparé le 2026-10-19.
// Fiche p-doom de lexique/terms.js ; sources dans voix/p-doom.script.json : le terme courant depuis 2023 (Wikipédia) ;
// le patron d'Anthropic à 25 % que « things go really, really badly » (TechRadar, 20 septembre 2025) ; Yann LeCun,
// « less likely than an asteroid » (TechRadar, 7 avril 2024) ; plus de 10 % d'ici dix ans (CNBC, 9 septembre 2026) ;
// le tournoi du Forecasting Research Institute (2022, 80 experts, 89 superforecasters, 3 % contre huit fois moins,
// presque personne n'a bougé, Astral Codex Ten) ; l'image de la météo du 20 heures.
// Fil : si l'AGI arrive (ép. 14) avec un modèle qui ne sait pas ce qu'il ne sait pas (ép. 15), quel risque ?
// Le chiffre qu'on se renvoie. Le schéma de la fiche (lexique/schemas/p-doom.svg) sert de base : une échelle
// logarithmique, puis une règle par question.
// Ce que la voix ne dit pas ne s'écrit pas : ni 0,38 %, ni « < 0,01 % », ni « > 10 % », ni le nom du patron
// d'Anthropic (« patron d'Anthropic » à l'écran, portrait pixelisé générique).
// L'écran suit la voix et Le mouvement (univers.md) : chaque élément entre sur le mot qui le nomme, easing partout
// sauf le compte des jours de pluie (calé sur la voix), arcs pour ce qui vole, squash seulement à l'impact.
import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Big, Mono, Pop, Scene, W, arc, clamp, countUp, ease, punch, squash, useAccent, withAlpha} from './kit';
import {LABEL, makeVoix} from './voix/VoixShort';
import {Pixel} from './voix/Pixel';
import {pixelShadow} from './voix/Parts';
import ALIGN from './voix/p-doom.align.json';
import SCRIPT from './voix/p-doom.script.json';

const AC = '#F08DC2'; // catégorie Écosystème
const V = makeVoix(ALIGN, SCRIPT, 'voix/prediction-music.mp3');
const {at} = V;
export const PDOOMVOIX_DURATION = V.duration;

const gone = (frame: number, until: number) => ease(frame, until, until + 6, [1, 0], 'inOut');
const rnd = (k: number) => {
  const x = Math.sin(k * 12.9898 + 4.1414) * 43758.5453;
  return x - Math.floor(x);
};
const RAIN = '#5b9bd5';

// ---------- Personnages (pixel art, même format que voix/Pixel.tsx) ----------

const SKIN = '#e3b58e';
type Sprite = {rows: string[]; palette: Record<string, string>};

// Le chercheur de la Silicon Valley : sweat à capuche gris, cordon, badge au bout d'une lanière.
const HOODIE: Sprite = {
  rows: [
    '...GGGGGG...',
    '..GGHHHHGG..',
    '..GSSSSSSG..',
    '..GSESSESG..',
    '..GSSSSSSG..',
    '..GSSRRSSG..',
    '..GGSSSSGG..',
    '.GGGWGGWGGG.',
    '.GGGWLLWGGG.',
    '.GGGGLLGGGG.',
    '.SGGGBBGGGS.',
    '.SGGGBBGGGS.',
    '...GGGGGG...',
    '...GGGGGG...',
  ],
  palette: {G: '#7a7a7a', H: '#3a2a1a', S: SKIN, E: '#111', R: '#b5524f', W: '#e8e8e8', L: AC, B: '#f2f2f2'},
};

// Le patron : doudoune sans manches bleu nuit sur chemise claire, badge.
const VEST: Sprite = {
  rows: [
    '....HHHH....',
    '...HHHHHH...',
    '...SSSSSS...',
    '...SESSES...',
    '...SSSSSS...',
    '...SSRRSS...',
    '....SSSS....',
    '.CVVVCCVVVC.',
    '.CVVVCCVVVC.',
    '.CVVVVVVVVC.',
    '.SVVVBBVVVS.',
    '..VVVBBVVV..',
    '...VVVVVV...',
    '...VVVVVV...',
  ],
  palette: {H: '#c9a15a', S: SKIN, E: '#111', R: '#b5524f', C: '#cfe0f2', V: '#26375a', B: '#f2f2f2'},
};

// Le patron d'Anthropic (portrait générique) : cheveux bouclés, lunettes, pull sombre.
const PATRON_IA: Sprite = {
  rows: [
    '..H.HHH.H...',
    '.HHHHHHHHH..',
    '.HHHHHHHHHH.',
    '.HHSSSSSSHH.',
    '..KEKKKEKS..',
    '...SSSSSS...',
    '...SSRRSS...',
    '....SSSS....',
    '.PPPPSSPPPP.',
    '.PPPPPPPPPP.',
    '.SPPPPPPPPS.',
    '.SPPPPPPPPS.',
    '...PPPPPP...',
    '...PPPPPP...',
  ],
  palette: {H: '#3b2a20', S: SKIN, E: '#111', K: '#1a1a1a', R: '#b5524f', P: '#4a4f5a'},
};

// Yann LeCun (portrait générique) : cheveux sombres en arrière, grosses lunettes noires, veste noire, chemise blanche.
const LECUN: Sprite = {
  rows: [
    '...HHHHHH...',
    '..HHHHHHHH..',
    '..HSSSSSSH..',
    '..KKKSSKKK..',
    '..KEKKKKEK..',
    '...SSSSSS...',
    '...SSRRSS...',
    '....SSSS....',
    '.JJJJWWJJJJ.',
    '.JJJJWWJJJJ.',
    '.SJJJWWJJJS.',
    '.SJJJJJJJJS.',
    '...JJJJJJ...',
    '...JJJJJJ...',
  ],
  palette: {H: '#2a2522', S: SKIN, E: '#111', K: '#0d0d0d', R: '#b5524f', J: '#1f1f1f', W: '#f2f2f2'},
};

// La présentatrice météo : carré blond, tailleur rouge.
const METEO: Sprite = {
  rows: [
    '...YYYYYY...',
    '..YYYYYYYY..',
    '..YSSSSSSY..',
    '..YSESSESY..',
    '..YSSSSSSY..',
    '..YSSRRSSY..',
    '....SSSS....',
    '.TTTTWWTTTT.',
    '.TTTTWWTTTT.',
    '.TTTTTTTTTSS',
    '.STTTTTTTT..',
    '..TTTTTTTT..',
    '...TTTTTT...',
    '...TTTTTT...',
  ],
  palette: {Y: '#e8c45a', S: SKIN, E: '#111', R: '#b5524f', T: '#c0392b', W: '#f2f2f2'},
};

// Palmier, pour la Silicon Valley (pas d'yeux : il ne cligne pas).
const PALM: Sprite = {
  rows: [
    '.LL...LL.',
    'LLLL.LLLL',
    '...LLL...',
    '..LLTLL..',
    '.L..T..L.',
    '....T....',
    '....T....',
    '...T.....',
    '...T.....',
    '...T.....',
    '....T....',
    '....T....',
  ],
  palette: {L: '#4f8a5b', T: '#8a6a44'},
};

// ---------- Objets ----------

// Bulle de conversation, avec sa queue vers le personnage qui parle (à gauche).
const Bubble: React.FC<{children: React.ReactNode}> = ({children}) => (
  <div style={{position: 'relative', background: '#f2f2f2', borderRadius: 30, padding: '16px 34px', boxShadow: pixelShadow('#333')}}>
    {children}
    <svg width={60} height={50} viewBox="0 0 60 50" style={{position: 'absolute', left: 30, bottom: -44}}>
      <path d="M0 0 L50 0 L6 48 Z" fill="#f2f2f2" />
    </svg>
  </div>
);

// Astéroïde : un caillou cabossé à cratères, et sa traînée.
const Asteroid: React.FC<{s: number; trail?: number}> = ({s, trail = 1}) => (
  <svg width={s * 1.8} height={s} viewBox="0 0 180 100" style={{overflow: 'visible'}}>
    <path d="M120 20 L178 0 M128 46 L180 30 M118 72 L176 64" stroke="#e8c45a" strokeWidth="6" strokeLinecap="round" opacity={0.7 * trail} />
    <path d="M20 30 L44 10 L80 8 L104 26 L110 56 L94 84 L60 94 L28 84 L10 60 Z" fill="#8a7a6a" stroke="#d6d6d6" strokeWidth="5" />
    <circle cx="48" cy="38" r="11" fill="#6a5a4c" />
    <circle cx="78" cy="64" r="8" fill="#6a5a4c" />
    <circle cx="40" cy="70" r="6" fill="#6a5a4c" />
  </svg>
);

// Nuage, avec ou sans pluie.
const Cloud: React.FC<{s: number; rain?: number}> = ({s, rain = 0}) => (
  <svg width={s} height={s * 0.8} viewBox="0 0 100 80" style={{overflow: 'visible'}}>
    {rain > 0
      ? [20, 40, 60, 80].map((x, k) => <path key={k} d={`M${x} 56 L${x - 6} ${56 + 18 * rain}`} stroke={RAIN} strokeWidth="6" strokeLinecap="round" />)
      : null}
    <path d="M18 54 A16 16 0 0 1 22 24 A22 22 0 0 1 62 16 A18 18 0 0 1 86 32 A14 14 0 0 1 84 54 Z" fill="#f2f2f2" />
  </svg>
);

const SunIcon: React.FC<{s: number}> = ({s}) => (
  <svg width={s} height={s} viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="22" fill="#e8c45a" />
    {Array.from({length: 8}, (_, k) => {
      const a = (k / 8) * Math.PI * 2;
      return <path key={k} d={`M${50 + 30 * Math.cos(a)} ${50 + 30 * Math.sin(a)} L${50 + 42 * Math.cos(a)} ${50 + 42 * Math.sin(a)}`} stroke="#e8c45a" strokeWidth="7" strokeLinecap="round" />;
    })}
  </svg>
);

// Carte de France stylisée (hexagone et Corse), comme sur un plateau météo.
const France: React.FC<{s: number}> = ({s}) => (
  <svg width={s} height={s} viewBox="0 0 100 100">
    <path d="M52 4 L66 11 L80 18 L89 25 L86 44 L80 54 L85 66 L89 79 L72 84 L59 81 L48 90 L26 87 L17 80 L20 62 L16 50 L18 44 L3 37 L4 30 L18 28 L25 21 L31 25 L41 19 L46 11 Z" fill="#4f8a5b" stroke="#e8e8e8" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M92 84 L96 88 L95 97 L91 98 L90 90 Z" fill="#4f8a5b" stroke="#e8e8e8" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

// Une goutte (case de pluie du calendrier).
const Drop: React.FC<{s: number}> = ({s}) => (
  <svg width={s} height={s} viewBox="0 0 100 100">
    <path d="M50 10 C 50 10, 80 50, 80 66 A30 30 0 0 1 20 66 C 20 50, 50 10, 50 10 Z" fill={RAIN} />
  </svg>
);

// Une foule réduite à des silhouettes (« tous les humains »).
const Crowd: React.FC<{n: number; s: number; color?: string}> = ({n, s, color = '#e8e8e8'}) => (
  <svg width={n * s * 0.62} height={s} viewBox={`0 0 ${n * 62} 100`}>
    {Array.from({length: n}, (_, k) => (
      <g key={k} fill={color}>
        <circle cx={k * 62 + 31} cy="24" r="16" />
        <path d={`M${k * 62 + 9} 100 L${k * 62 + 13} 56 A18 18 0 0 1 ${k * 62 + 49} 56 L${k * 62 + 53} 100 Z`} />
      </g>
    ))}
  </svg>
);

// ---------- L'échelle logarithmique (de 0,01 % à 100 %), base du schéma de la fiche ----------

const RL = 840; // longueur de la règle
const RX = 24; // marge gauche de la règle
// Position d'une probabilité (en %) sur la règle : une décade par quart.
const lx = (pct: number) => RX + (RL * Math.log10(pct / 0.01)) / 4;

// La règle : un trait et cinq graduations sans chiffre (on ne lit que les points nommés par la voix).
const Ruler: React.FC<{p?: number; color?: string}> = ({p = 1, color = '#8a8a8a'}) => (
  <svg width={W} height={40} viewBox={`0 0 ${W} 40`} style={{position: 'absolute', left: 0, top: -20, overflow: 'visible'}}>
    <path d={`M${RX} 20 H${RX + RL * p}`} stroke={color} strokeWidth="6" strokeLinecap="round" />
    {[0, 1, 2, 3, 4].map((k) => (k / 4 <= p ? <path key={k} d={`M${RX + (RL * k) / 4} 6 V34`} stroke={color} strokeWidth="5" /> : null))}
  </svg>
);

const Dot: React.FC<{x: number; color: string; r?: number; style?: React.CSSProperties}> = ({x, color, r = 20, style}) => (
  <div style={{position: 'absolute', left: x - r, top: -r, width: 2 * r, height: 2 * r, borderRadius: r, background: color, border: '4px solid #000', boxSizing: 'border-box', ...style}} />
);

// ---------- 0. Hook ----------

const Hook: React.FC = () => <V.TitleHook lead="C'est quoi ?" lines={['le p(doom)']} cue="p(doom)" />;

// ---------- 1. La question qu'on se pose dans la Silicon Valley ----------

const Question: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const an = at('question', '2023');
  const valley = at('question', 'Silicon');
  const chercheurs = at('question', 'chercheurs');
  const patrons = at('question', 'patrons');
  const combien = at('question', 'combien');
  // Décor posé dès l'entrée : le sol, deux palmiers, un campus bas aux vitres bleutées, le soleil.
  return (
    <Scene>
      <div style={{position: 'relative', height: 620}}>
        <Pop at={0} style={{position: 'absolute', left: 0, top: 0, right: 0, height: 620}}>
          <div style={{position: 'absolute', right: 250, top: 150}}><SunIcon s={100} /></div>
          <div style={{position: 'absolute', left: 250, top: 420, width: 400, height: 120, background: '#2a2a2a', border: '5px solid #6f6f6f', display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 10, padding: 14, boxSizing: 'border-box'}}>
            {Array.from({length: 12}, (_, k) => <div key={k} style={{background: withAlpha('#8FB8FF', 0.35)}} />)}
          </div>
          <div style={{position: 'absolute', left: -10, top: 210, opacity: 0.9}}><Pixel sprite={PALM} px={28} /></div>
          <div style={{position: 'absolute', right: -6, top: 250, opacity: 0.9}}><Pixel sprite={PALM} px={24} /></div>
          <div style={{position: 'absolute', left: 0, right: 0, top: 540, height: 6, background: '#6f6f6f'}} />
        </Pop>
        {/* fade in des repères dits : l'année, puis le lieu */}
        <Pop at={an} style={{position: 'absolute', left: 0, top: 0}}><Mono size={64} color={accent}>2023</Mono></Pop>
        <Pop at={valley} style={{position: 'absolute', right: 0, top: 8}}><Mono size={52} color={LABEL}>Silicon Valley</Mono></Pop>
        {/* pop in des deux personnages, chacun sur son mot ; un seul détail vivant : ils clignent */}
        <Pop at={chercheurs} style={{position: 'absolute', left: 90, top: 316}}><Pixel sprite={HOODIE} px={16} seed={2} /></Pop>
        <Pop at={patrons} style={{position: 'absolute', right: 80, top: 316}}><Pixel sprite={VEST} px={16} seed={5} /></Pop>
        <Pop at={chercheurs + 4} style={{position: 'absolute', left: 40, top: 556}}><Mono size={48} color={LABEL}>chercheurs</Mono></Pop>
        <Pop at={patrons + 4} style={{position: 'absolute', right: 70, top: 556}}><Mono size={48} color={LABEL}>patrons</Mono></Pop>
        {/* pop in de la bulle : « combien ? » réduit à un pourcentage à trou (le sous-titre dit la phrase) */}
        <Pop at={combien} style={{position: 'absolute', left: 170, top: 120}}>
          <Bubble><Mono size={96} color="#111">? %</Mono></Bubble>
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 2. Le nom : p = probabilité, doom = la fin ----------

const Nom: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const proba = at('nom', 'probabilité');
  const personne = at('nom', 'personne');
  const doom = at('nom', 'doom');
  const fin = at('nom', 'fin');
  // La jauge se dessine sur « probabilité » ; sur « personne », quelqu'un pose son curseur (cascade en ordre de lecture).
  const draw = ease(frame, proba + 4, proba + 22);
  const cur = ease(frame, personne + 4, personne + 22, [0.05, 0.62], 'inOut');
  return (
    <Scene gap={30}>
      {/* pop in du terme, posé dès l'entrée (il vient d'être dit) ; highlight sur « doom » quand la voix le dit */}
      <Pop at={1} style={{alignSelf: 'center'}}>
        <Big size={170} color={accent}>
          <span>p(</span>
          <span style={{position: 'relative', display: 'inline-block'}}>
            doom
            {/* draw-on d'un trait blanc sous « doom », quand la voix le dit */}
            <span style={{position: 'absolute', left: 4, right: 4, bottom: -14, height: 12, background: '#fff', transform: `scaleX(${ease(frame, doom, doom + 12)})`, transformOrigin: 'left center'}} />
          </span>
          <span>)</span>
        </Big>
      </Pop>
      <div style={{display: 'flex', justifyContent: 'space-between', padding: '0 40px'}}>
        <Pop at={proba}><Mono size={52} color="#fff">p = probabilité</Mono></Pop>
        <Pop at={fin}><Mono size={52} color={accent}>la fin</Mono></Pop>
      </div>
      {/* draw-on de la jauge 0 à 100 %, puis le curseur posé par une personne */}
      <div style={{position: 'relative', height: 200, marginTop: 20, opacity: frame >= proba ? gone(frame, doom - 6) * 0.5 + 0.5 : 0}}>
        <div style={{position: 'absolute', left: 150, top: 70, width: (W - 150) * draw, height: 30, border: '4px solid #8a8a8a', boxSizing: 'border-box'}} />
        <div style={{position: 'absolute', left: 150, top: 70, width: (W - 150) * Math.min(draw, cur), height: 30, background: withAlpha(accent, 0.5)}} />
        <div style={{position: 'absolute', left: 150, top: 116, opacity: draw}}><Mono size={48} color={LABEL}>0 %</Mono></div>
        <div style={{position: 'absolute', right: 0, top: 116, opacity: draw}}><Mono size={48} color={LABEL}>100 %</Mono></div>
        <Pop at={personne} style={{position: 'absolute', left: 0, top: 0}}><Pixel sprite={HOODIE} px={9} seed={3} /></Pop>
        <div style={{position: 'absolute', left: 150 + (W - 150) * cur - 8, top: 52, width: 16, height: 66, background: '#fff', opacity: frame >= personne ? 1 : 0}} />
      </div>
    </Scene>
  );
};

// ---------- 3. Les écarts : 25 % d'un côté, moins qu'un astéroïde de l'autre ----------

const Ecarts: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const patron = at('ecarts', 'patron');
  const n25 = at('ecarts', '25');
  const lecun = at('ecarts', 'Yann');
  const moins = at('ecarts', 'moins');
  const aster = at('ecarts', 'astéroïde');
  // Le point du patron glisse depuis la gauche jusqu'à 25 %, en comptant (count-up calé sur « 25 »).
  const slide = ease(frame, n25, n25 + 30, [0, 1], 'inOut');
  const x25 = RX + (lx(25) - RX) * slide;
  // L'astéroïde arrive en arc du haut à droite et se pose au-dessus du point de LeCun.
  const fly = spring({frame: frame - aster, fps: 30, config: {damping: 18, stiffness: 90}});
  const [ax, ay] = arc(Math.min(1, fly), [700, -260], [90, 96], 120);
  return (
    <Scene>
      <div style={{position: 'relative', height: 600}}>
        {/* portraits pixelisés : pop in sur le nom */}
        <Pop at={patron} style={{position: 'absolute', right: 30, top: 0}}><Pixel sprite={PATRON_IA} px={11} seed={1} /></Pop>
        <Pop at={patron + 5} style={{position: 'absolute', right: 0, top: 165}}><Mono size={48} color={LABEL}>patron d'Anthropic</Mono></Pop>
        <Pop at={lecun} style={{position: 'absolute', left: 30, top: 0}}><Pixel sprite={LECUN} px={11} seed={4} /></Pop>
        <Pop at={lecun + 5} style={{position: 'absolute', left: 0, top: 165}}><Mono size={48} color={LABEL}>Yann LeCun</Mono></Pop>
        {/* la règle logarithmique, posée dès l'entrée (décor) */}
        <div style={{position: 'absolute', left: 0, top: 330, width: W}}>
          <Ruler />
          {frame >= n25 ? <Dot x={x25} color={accent} /> : null}
          {frame >= moins ? <Dot x={RX + 4} color="#fff" style={{transform: `scale(${usePopLike(frame, moins)})`}} /> : null}
        </div>
        {/* count-up + punch zoom sur le chiffre (le seul punch du short) */}
        <div style={{position: 'absolute', left: lx(25) - 110, top: 380, width: 220, display: 'flex', justifyContent: 'center', opacity: frame >= n25 ? 1 : 0, transform: `scale(${punch(frame, n25 + 30)})`}}>
          <Mono size={80} color={accent}>{countUp(frame, n25, 25, 30)} %</Mono>
        </div>
        {/* l'astéroïde vole en arc, puis son libellé */}
        <div style={{position: 'absolute', left: ax, top: 300 - 100 + ay - 60, opacity: frame >= aster ? 1 : 0}}><Asteroid s={90} trail={1 - Math.min(1, fly)} /></div>
        <Pop at={aster + 6} style={{position: 'absolute', left: 0, top: 390}}><Mono size={48} color="#fff">moins qu'un</Mono></Pop>
        <Pop at={aster + 9} style={{position: 'absolute', left: 0, top: 450}}><Mono size={48} color="#fff">astéroïde</Mono></Pop>
      </div>
    </Scene>
  );
};

// Petit pop sans conteneur (pour un point sur la règle).
const usePopLike = (frame: number, a: number) => spring({frame: frame - a, fps: 30, config: {damping: 14, stiffness: 240, mass: 0.55}});

// ---------- 4. Pas la même question : la règle se dédouble en trois règles ----------

const ROWS = [
  {y: 40, dots: [25]},
  {y: 250, dots: [3, 0.38]},
  {y: 460, dots: [10]},
];

const Pasla: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const question = at('pasla', 'question');
  const un = at('pasla', "l'un");
  const autres = at('pasla', "d'autres");
  const tous = at('pasla', 'tous');
  const ans = at('pasla', 'ans');
  // Sur « question », la règle unique (celle de l'écran d'avant) s'ouvre en trois, en douceur (inOut).
  const split = ease(frame, question, question + 14, [0, 1], 'inOut');
  const mid = 250;
  const cues = [un, autres, tous];
  return (
    <Scene>
      <div style={{position: 'relative', height: 600}}>
        {ROWS.map((r, k) => {
          const y = mid + (r.y + 70 - mid) * split;
          const lab = frame >= cues[k];
          return (
            <div key={k} style={{position: 'absolute', left: 0, top: y, width: W, opacity: k === 1 || split > 0 ? 1 : 0}}>
              <Ruler color={lab ? '#cfcfcf' : '#8a8a8a'} />
              {/* les points restent ; chacun prend la couleur d'accent quand sa question est dite */}
              {k === 0 || split > 0
                ? r.dots.map((d, i) => <Dot key={i} x={lx(d)} color={lab ? accent : '#6f6f6f'} />)
                : null}
            </div>
          );
        })}
        {/* avant l'ouverture, le point de LeCun est encore là ; il s'efface quand la règle se dédouble */}
        <div style={{position: 'absolute', left: 0, top: mid, width: W, opacity: gone(frame, question)}}>
          <Dot x={RX + 4} color="#fff" />
          <Dot x={lx(25)} color={accent} />
        </div>
        {/* les questions, chacune sur son mot (fade in au-dessus de sa règle) */}
        <Pop at={un + 8} style={{position: 'absolute', left: 0, top: 28}}><Mono size={48} color="#fff">« vraiment, vraiment mal »</Mono></Pop>
        <Pop at={at('pasla', "l'extinction")} style={{position: 'absolute', left: 0, top: 238}}><Mono size={48} color="#fff">extinction d'ici 2100</Mono></Pop>
        <Pop at={tous} style={{position: 'absolute', left: 0, top: 430, display: 'flex', alignItems: 'flex-end', gap: 20}}>
          <Crowd n={5} s={60} />
          <Mono size={48} color="#fff">dix ans</Mono>
        </Pop>
        {/* pop in en cascade des signes « différent » entre les règles */}
        {[0, 1].map((k) => (
          <Pop key={k} at={ans + 6 + 3 * k} style={{position: 'absolute', right: 0, top: [145, 355][k]}}>
            <Mono size={72} color={accent}>≠</Mono>
          </Pop>
        ))}
      </div>
    </Scene>
  );
};

// ---------- 5. La météo du 20 heures : trente jours de pluie sur cent, et la fin du monde qu'on ne recompte pas ----------

// Les trente jours de pluie, tirés une fois pour toutes, et l'ordre dans lequel on les coche.
const RAINY = Array.from({length: 100}, (_, k) => k)
  .sort((a, b) => rnd(a + 3) - rnd(b + 3))
  .slice(0, 30)
  .sort((a, b) => a - b);

const Meteo: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const accent = useAccent();
  const vingt = at('meteo', '20');
  const n30 = at('meteo', '30');
  const cent = at('meteo', 'cent');
  const verifier = at('meteo', 'vérifier');
  const trente = at('meteo', 'trente');
  const finMonde = at('meteo', 'fin');
  const uneFois = at('meteo', "qu'une");
  // La télé part quand la voix passe aux cent jours ; le calendrier part quand elle passe à la fin du monde.
  const tvOut = gone(frame, cent - 4);
  const calOut = gone(frame, finMonde - 4);
  // Compte calé sur la voix (linéaire) : les cases de pluie se cochent une à une de « vérifier » à « trente ».
  const ticked = Math.floor(interpolate(frame, [verifier, trente + 6], [0, 30], clamp));
  // La case géante tombe sur « fin » et s'écrase un instant à l'impact.
  const drop = spring({frame: frame - finMonde, fps, config: {damping: 12, stiffness: 200}});
  const [sx, sy] = squash(frame, finMonde + 6);
  return (
    <Scene>
      <div style={{position: 'relative', height: 620}}>
        {/* Décor posé dès l'entrée : la télé du salon ; le bulletin s'y allume sur « météo » */}
        <div style={{position: 'absolute', left: 54, top: 30, opacity: frame < cent ? 1 : tvOut}}>
          <Pop at={0}>
            <div style={{width: 780, height: 470, background: '#161616', border: '14px solid #3a3a3a', borderRadius: 18, boxShadow: pixelShadow('#222'), position: 'relative', overflow: 'hidden', boxSizing: 'border-box'}}>
              <div style={{position: 'absolute', inset: 0, background: '#1d3b5c', opacity: ease(frame, at('meteo', 'météo'), at('meteo', 'météo') + 8)}}>
                <div style={{position: 'absolute', left: 30, top: 66}}><France s={370} /></div>
                <div style={{position: 'absolute', left: 190, top: 300}}><SunIcon s={90} /></div>
                <div style={{position: 'absolute', right: 30, bottom: 0}}><Pixel sprite={METEO} px={14} seed={6} /></div>
              </div>
              {/* fade in de l'heure, sur « 20 heures » */}
              <Pop at={vingt} style={{position: 'absolute', left: 20, top: 14}}><Mono size={48} color="#fff">20 heures</Mono></Pop>
              {/* pop in du nuage et de son chiffre sur « 30 % » */}
              <Pop at={n30} style={{position: 'absolute', left: 120, top: 110}}><Cloud s={150} rain={ease(frame, n30 + 6, n30 + 16)} /></Pop>
              <Pop at={n30 + 4} style={{position: 'absolute', left: 430, top: 60}}><Mono size={96} color="#fff">30 %</Mono></Pop>
            </div>
            <div style={{width: 160, height: 26, background: '#3a3a3a', margin: '0 auto'}} />
          </Pop>
        </div>
        {/* Le calendrier de cent jours : stagger des lignes sur « cent jours », puis le compte des jours de pluie */}
        <div style={{position: 'absolute', left: 124, top: 0, opacity: frame < finMonde - 4 ? 1 : calOut}}>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(10, 56px)', gap: 8}}>
            {Array.from({length: 100}, (_, k) => {
              const rain = RAINY.indexOf(k);
              const on = rain >= 0 && rain < ticked;
              return (
                <Pop key={k} at={cent + 2 + Math.floor(k / 10) * 2} style={{width: 56, height: 56, border: `4px solid ${on ? RAIN : '#5a5a5a'}`, background: on ? withAlpha(RAIN, 0.25) : 'transparent', boxSizing: 'border-box', lineHeight: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  {on ? <Drop s={40} /> : null}
                </Pop>
              );
            })}
          </div>
          <div style={{display: 'flex', flexDirection: 'column', marginTop: 14}}>
            <Pop at={cent + 6}><Mono size={52} color={LABEL}>cent jours</Mono></Pop>
            <div style={{alignSelf: 'flex-end', opacity: frame >= verifier ? 1 : 0}}><Mono size={52} color={RAIN}>{frame >= trente ? 'trente fois' : String(ticked)}</Mono></div>
          </div>
        </div>
        {/* La fin du monde : une seule case, géante, qui tombe (squash à l'impact) */}
        <div style={{position: 'absolute', left: 194, top: 40, width: 500, opacity: frame >= finMonde ? 1 : 0, transform: `translateY(${(1 - drop) * -300}px) scale(${sx}, ${sy})`, transformOrigin: 'bottom center'}}>
          <div style={{height: 440, border: `10px solid ${accent}`, background: withAlpha(accent, 0.12), display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: pixelShadow('#333')}}>
            <Mono size={96} color={accent}>la fin</Mono>
          </div>
        </div>
        <Pop at={uneFois} style={{position: 'absolute', left: 0, right: 0, top: 510, display: 'flex', justifyContent: 'center'}}>
          <Mono size={56} color="#fff">une fois</Mono>
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 6. Le tournoi de 2022 : deux foules, 3 % contre huit fois moins, et personne ne bouge ----------

const DOT = 22;
const GAP = 8;
const COLS = 16;
const grid = (n: number) => Array.from({length: n}, (_, k) => ({x: (k % COLS) * (DOT + GAP), y: Math.floor(k / COLS) * (DOT + GAP)}));
const EXPERTS = grid(80);
const SUPERS = grid(89);
const TOP_A = 100;
const TOP_B = 370;

const Tournoi: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const accent = useAccent();
  const quatreVingts = at('tournoi', 'quatre-vingts');
  const experts = at('tournoi', 'experts');
  const neuf = at('tournoi', 'neuf');
  const supers = at('tournoi', 'superprévisionnistes');
  const extinction = at('tournoi', "d'extinction");
  const disaient = at('tournoi', 'disaient');
  const prev = at('tournoi', 'prévisionnistes', 1);
  const huit = at('tournoi', 'huit');
  const personne = at('tournoi', 'personne');
  const change = at('tournoi', 'changé');
  // Bar grow : 3 % sur la largeur pleine, les prévisionnistes huit fois moins.
  const BAR = 320;
  const barA = ease(frame, disaient, disaient + 24);
  const barB = ease(frame, prev, prev + 18);
  // « presque personne » : toute la foule se penche vers l'autre camp puis revient (inOut) ; un seul point traverse en arc.
  const lean = Math.sin(Math.PI * ease(frame, personne, personne + 16, [0, 1], 'inOut')) * 10;
  const cross = spring({frame: frame - change, fps, config: {damping: 16, stiffness: 110}});
  const [cx, cy] = arc(Math.min(1, cross), [EXPERTS[77].x, TOP_A + 60 + EXPERTS[77].y], [SUPERS[88].x + DOT + GAP, TOP_B + 60 + SUPERS[88].y], 70);
  return (
    <Scene>
      <div style={{position: 'relative', height: 640}}>
        {/* le sujet du débat, sur son mot */}
        <Pop at={extinction} style={{position: 'absolute', left: 0, right: 0, top: 0, display: 'flex', justifyContent: 'center'}}>
          <div style={{border: `5px solid ${accent}`, padding: '6px 20px'}}><Mono size={52} color="#fff">extinction d'ici 2100</Mono></div>
        </Pop>
        {/* les experts : libellé, puis stagger des points en ordre de lecture */}
        <Pop at={quatreVingts} style={{position: 'absolute', left: 0, top: TOP_A}}><Mono size={52} color="#fff">80 experts</Mono></Pop>
        {EXPERTS.map((d, k) => (
          <Pop key={k} at={experts + Math.floor(k / COLS) * 2} style={{position: 'absolute', left: d.x, top: TOP_A + 64 + d.y, transform: `translateY(${lean}px)`, opacity: k === 77 && frame >= change ? 0 : 1}}>
            <div style={{width: DOT, height: DOT, borderRadius: DOT / 2, background: '#e8e8e8'}} />
          </Pop>
        ))}
        {/* les superprévisionnistes */}
        <Pop at={neuf} style={{position: 'absolute', left: 0, top: TOP_B}}><Mono size={52} color={accent}>89 superprévisionnistes</Mono></Pop>
        {SUPERS.map((d, k) => (
          <Pop key={k} at={supers + Math.floor(k / COLS) * 2} style={{position: 'absolute', left: d.x, top: TOP_B + 64 + d.y, transform: `translateY(${-lean}px)`}}>
            <div style={{width: DOT, height: DOT, borderRadius: DOT / 2, background: accent}} />
          </Pop>
        ))}
        {/* le seul qui change de camp : il vole en arc d'une foule à l'autre */}
        {frame >= change ? <div style={{position: 'absolute', left: cx, top: cy, width: DOT, height: DOT, borderRadius: DOT / 2, background: '#e8e8e8'}} /> : null}
        {/* bar grow + count-up sur « 3 % » */}
        <div style={{position: 'absolute', left: COLS * (DOT + GAP) + 30, top: TOP_A + 70, opacity: frame >= disaient ? 1 : 0}}>
          <div style={{width: BAR * barA, height: 50, background: '#e8e8e8'}} />
          <div style={{marginTop: 10}}><Mono size={72} color="#fff">{countUp(frame, disaient, 3, 24)} %</Mono></div>
        </div>
        <div style={{position: 'absolute', left: COLS * (DOT + GAP) + 30, top: TOP_B + 70, opacity: frame >= prev ? 1 : 0}}>
          <div style={{width: (BAR / 8) * barB, height: 50, background: accent}} />
          <div style={{position: 'absolute', left: BAR / 8 + 10, top: 0, width: BAR - BAR / 8 - 10, height: 50, border: `3px dashed ${withAlpha('#e8e8e8', 0.35)}`, boxSizing: 'border-box', opacity: barB}} />
        </div>
        <Pop at={huit} style={{position: 'absolute', left: COLS * (DOT + GAP) + 30, top: TOP_B + 140}}><Mono size={52} color={accent}>huit fois</Mono></Pop>
        <Pop at={huit + 5} style={{position: 'absolute', left: COLS * (DOT + GAP) + 30, top: TOP_B + 200}}><Mono size={52} color={accent}>moins</Mono></Pop>
      </div>
    </Scene>
  );
};

// ---------- 7. Chute : le chiffre au centre, entouré de ses deux questions ----------

const Chute: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const pdoom = at('chute', 'p(doom)');
  const quoi = at('chute', 'quoi');
  const quand = at('chute', 'quand');
  const seul = at('chute', 'seul');
  // Sur « seul », le chiffre passe en retrait (fade) : ce qui compte, ce sont ses deux questions.
  const dim = ease(frame, seul, seul + 12, [1, 0.4], 'inOut');
  return (
    <Scene>
      <div style={{position: 'relative', height: 640}}>
        {/* rappel des images du short, posé dès l'entrée : la règle et ses points, les deux personnages */}
        <Pop at={0} style={{position: 'absolute', left: 0, top: 30, width: W, opacity: 0.55}}>
          <div style={{position: 'relative'}}>
            <Ruler />
            <Dot x={RX + 4} color="#fff" />
            <Dot x={lx(3)} color="#e8e8e8" />
            <Dot x={lx(25)} color={accent} />
          </div>
        </Pop>
        <Pop at={2} style={{position: 'absolute', left: 0, bottom: 0}}><Pixel sprite={HOODIE} px={10} seed={2} /></Pop>
        <Pop at={4} style={{position: 'absolute', right: 0, bottom: 0}}><Pixel sprite={VEST} px={10} seed={5} /></Pop>
        {/* le chiffre au centre, sur « p(doom) » */}
        <Pop at={pdoom} style={{position: 'absolute', left: 0, right: 0, top: 210, display: 'flex', justifyContent: 'center', opacity: dim}}>
          <div style={{border: '8px solid #fff', padding: '10px 40px'}}><Mono size={150} color="#fff">25 %</Mono></div>
        </Pop>
        {/* les deux questions, chacune sur son mot */}
        <Pop at={quoi} style={{position: 'absolute', left: 0, top: 110}}>
          <div style={{background: accent, padding: '6px 20px', transform: 'rotate(-4deg)'}}><Mono size={60} color="#111">de quoi ?</Mono></div>
        </Pop>
        <Pop at={quand} style={{position: 'absolute', right: 160, top: 495}}>
          <div style={{background: accent, padding: '6px 20px', transform: 'rotate(3deg)'}}><Mono size={60} color="#111">pour quand ?</Mono></div>
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- Montage ----------

const SCENES: Record<string, React.FC> = {hook: Hook, question: Question, nom: Nom, ecarts: Ecarts, pasla: Pasla, meteo: Meteo, tournoi: Tournoi, chute: Chute};

export const PDoomVoix: React.FC = () => <V.Montage scenes={SCENES} accent={AC} />;

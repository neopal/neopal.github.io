// Short Mythe « Premier au benchmark, c'est donc le meilleur modèle » (YouTube / TikTok / Instagram), épisode 17,
// voix off PAL - FR, préparé le 2026-10-19 sur un calage provisoire (sans voix).
// Fiche mythe-bon-score-bon-modele de lexique/terms.js (et fiche arc-agi pour les chiffres) ; sources dans
// voix/bon-score.script.json : ARC Prize, GPT-6 Astra début septembre 2026 sur ARC-AGI-3 semi-privé, 62,7 % dans le
// harness standard puis 99,9 % avec un harness qui garde le raisonnement d'un appel à l'autre ; METR, 10 mars 2026,
// 296 corrections d'agents validées par SWE-bench Verified, relues par quatre mainteneurs, environ la moitié refusée ;
// l'image du TOEIC de la fiche. La phrase du hook est provisoire et sans auteur : ni portrait ni objet source.
// Fil : le p(doom) est une opinion (ép. 16) ; les benchmarks, eux, se mesurent, mais mesurent-ils ce que tu crois ?
// L'écran suit la voix (univers.md) : chaque élément entre sur le mot qui le nomme (at('scène', 'mot')), rien en dur.
// Le mouvement : easing partout sauf les cascades calées sur la voix, arcs pour ce qui vole, squash au seul tampon,
// un seul punch zoom (sur 99,9 %, après un text swap sec depuis 62,7 %). Scène propre à ce short : la relecture, où les cartes validées se retournent.
import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Big, Check, Draw, Highlight, Mono, Pop, Scene, W, arc, ease, punch, typed, useAccent, withAlpha} from './kit';
import {LABEL, makeVoix} from './voix/VoixShort';
import {Pixel} from './voix/Pixel';
import {Model, Msg, Stamp, pixelShadow} from './voix/Parts';
import ALIGN from './voix/bon-score.align.json';
import SCRIPT from './voix/bon-score.script.json';

const AC = '#FF7A7A'; // catégorie Mythes vs réalité
const V = makeVoix(ALIGN, SCRIPT, 'voix/prediction-music.mp3');
const {at} = V;
export const MYTHESCOREVOIX_DURATION = V.duration;

const GREEN = '#7CFFB2'; // la coche des tests
const gone = (frame: number, until: number) => ease(frame, until, until + 6, [1, 0], 'inOut');
const rnd = (k: number) => {
  const x = Math.sin(k * 12.9898 + 7.233) * 43758.5453;
  return x - Math.floor(x);
};
// Un mot dit en toute fin de scène : son élément entre assez tôt pour être vu avant la coupe (le calage bougera).
const useLate = () => {
  const {durationInFrames} = useVideoConfig();
  return (f: number, room = 8) => Math.min(f, durationInFrames - room);
};

// ---------- Personnages (pixel art, même format que voix/Pixel.tsx) ----------

const SKIN = '#e3b58e';
type Sprite = {rows: string[]; palette: Record<string, string>};

// Le nouveau : raie sur le côté, chemise blanche, cravate, veste bleu marine.
const NOUVEAU: Sprite = {
  rows: [
    '...HHHHH....',
    '..HHHHHHH...',
    '..HSSSSSS...',
    '...SESSES...',
    '...SSSSSS...',
    '...SSRRSS...',
    '....SSSS....',
    '..BBBWWBBB..',
    '.BBBWKKWBBB.',
    '.BBBBKKBBBB.',
    '.SBBBKKBBBS.',
    '.SBBBBBBBBS.',
    '...BBBBBB...',
    '...BBBBBB...',
  ],
  palette: {H: '#3b2618', S: SKIN, E: '#111', R: '#b5524f', B: '#2c3e66', W: '#f2f2f2', K: '#8a2a2a'},
};

// Le client de Manchester : casquette plate, barbe rousse, écharpe, veste en tweed.
const CLIENT: Sprite = {
  rows: [
    '............',
    '..CCCCCCCC..',
    '.CCCCCCCCCC.',
    '...SSSSSS...',
    '...SESSES...',
    '...SSSSSS...',
    '...GGMMGG...',
    '....GGGG....',
    '.FFFFFFFFFF.',
    '.JJJFFJJJJJ.',
    '.JJJJFFJJJJ.',
    '.SJJJFFJJJS.',
    '...JJJJJJ...',
    '...JJJJJJ...',
  ],
  palette: {C: '#77736a', S: SKIN, E: '#111', G: '#b8622e', M: '#7a3a2a', F: '#c8423a', J: '#6b5a45'},
};

// Les développeurs qui relisent : un même gabarit en sweat à capuche ; L = lunettes (couleur de peau si sans).
const DEV_ROWS = [
  '...HHHHHH...',
  '..HHHHHHHH..',
  '..HSSSSSSH..',
  '...LELLEL...',
  '...SSSSSS...',
  '...SSRRSS...',
  '....SSSS....',
  '..OOOOOOOO..',
  '.OOOOWWOOOO.',
  '.OOOOOOOOOO.',
  '.SOOOOOOOOS.',
  '.SOOOOOOOOS.',
  '...OOOOOO...',
  '...OOOOOO...',
];
const dev = (hair: string, hoodie: string, glasses: boolean): Sprite => ({
  rows: DEV_ROWS,
  palette: {H: hair, S: SKIN, E: '#111', L: glasses ? '#2b2b2b' : SKIN, R: '#b5524f', O: hoodie, W: '#cfcfcf'},
});
const DEVS = [dev('#2a2a2a', '#4f8a5b', true), dev('#c2602b', '#5b7fb5', false), dev('#e8c45a', '#7a5a9a', false), dev('#5a3a22', '#b5804a', true)];

// ---------- Objets (SVG maison) ----------

// Un des jeux d'ARC-AGI-3 : une petite grille de pixels, un personnage bleu, une clé orange, une sortie jaune.
const GAME = ['GGGGGGGG', 'G..O...G', 'G.GG.G.G', 'G....G.G', 'GGG.GG.G', 'G.B....G', 'G...GGYG', 'GGGGGGGG'];
const GAME_COLORS: Record<string, string> = {'.': '#111', G: '#8a8a8a', B: '#1E93FF', O: '#FF851B', Y: '#FFDC00'};
const Game: React.FC<{cell: number}> = ({cell}) => (
  <div style={{display: 'grid', gridTemplateColumns: `repeat(8, ${cell}px)`, gap: 3, padding: 8, background: '#000', border: '6px solid #fff', boxShadow: pixelShadow('#333')}}>
    {GAME.flatMap((r, y) => [...r].map((c, x) => <div key={`${x}-${y}`} style={{width: cell, height: cell, background: GAME_COLORS[c]}} />))}
  </div>
);

// Le cadre du programme autour du modèle : un rectangle qui se dessine (draw-on).
const Frame: React.FC<{w: number; h: number; p: number; width?: number; color?: string}> = ({w, h, p, width = 8, color}) => {
  const accent = useAccent();
  const len = 2 * (w + h);
  return (
    <svg width={w + 20} height={h + 20} viewBox={`-10 -10 ${w + 20} ${h + 20}`} style={{position: 'absolute', overflow: 'visible'}}>
      <rect x={0} y={0} width={w} height={h} fill="none" stroke={color ?? accent} strokeWidth={width} strokeDasharray={len} strokeDashoffset={len * (1 - p)} />
    </svg>
  );
};

// Le carnet de notes : couverture en couleur d'accent, spirale, lignes.
const Carnet: React.FC<{w: number}> = ({w}) => {
  const accent = useAccent();
  return (
    <svg width={w} height={w * 1.25} viewBox="0 0 80 100">
      <rect x="12" y="4" width="64" height="92" fill={accent} stroke="#fff" strokeWidth="4" />
      {[16, 32, 48, 64, 80].map((y) => <circle key={y} cx="12" cy={y} r="5" fill="#000" stroke="#fff" strokeWidth="3" />)}
      <rect x="28" y="22" width="38" height="7" fill="#fff" />
      <rect x="28" y="38" width="30" height="6" fill="rgba(255,255,255,0.7)" />
      <rect x="28" y="52" width="34" height="6" fill="rgba(255,255,255,0.7)" />
    </svg>
  );
};

// Un téléphone de bureau tenu à l'oreille.
const Phone: React.FC<{w: number}> = ({w}) => (
  <svg width={w} height={w * 1.7} viewBox="0 0 40 68">
    <rect x="3" y="3" width="34" height="62" rx="7" fill="#1c1c1c" stroke="#fff" strokeWidth="4" />
    <rect x="9" y="12" width="22" height="34" fill="#5b7fb5" />
  </svg>
);

// Le nuage de Manchester, avec sa pluie.
const Rain: React.FC<{w: number; p: number}> = ({w, p}) => (
  <svg width={w} height={w * 0.8} viewBox="0 0 100 80">
    <path d="M22 44 a14 14 0 0 1 4 -27 a20 20 0 0 1 37 -4 a15 15 0 0 1 17 25 a10 10 0 0 1 -6 6 Z" fill="#cfcfcf" />
    {[30, 50, 70].map((x, k) => (
      <path key={x} d={`M${x} ${52 + ((p * 30 + k * 7) % 14)} l-5 12`} stroke="#8FB8FF" strokeWidth="5" strokeLinecap="round" />
    ))}
  </svg>
);

// ---------- 0. Hook : la phrase du mythe en grand, puis le tampon FAUX ----------

const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const late = useLate();
  const bench = at('hook', 'benchmark');
  const cest = at('hook', "c'est");
  const meilleur = at('hook', 'meilleur');
  const fin = at('hook', '»');
  const exercice = at('hook', 'exercice');
  const travail = late(at('hook', 'travail'));
  return (
    <Scene>
      <div style={{position: 'relative', display: 'flex', flexDirection: 'column', gap: 4}}>
        {/* Le verdict sur la phrase citée, posé juste après la citation ; il reste jusqu'à la fin du hook (couverture). */}
        <Stamp at={fin + 10} size={96} tilt={-12} bg="rgba(0,0,0,0.6)" style={{right: 0, top: -130, zIndex: 2}}>FAUX</Stamp>
        {/* pop in, ligne à ligne, au rythme de la citation */}
        <Pop at={0}><Big size={100}>« Premier</Big></Pop>
        <Pop at={Math.max(2, bench - 6)}><Big size={100}>au benchmark,</Big></Pop>
        <Pop at={cest}><Big size={100}>c'est donc le</Big></Pop>
        <Pop at={meilleur}><Big size={100} color={accent}>meilleur modèle »</Big></Pop>
        {/* Ce que la voix dit ensuite, sans sous-titre (nocaption) : ce que mesure un score, et ce qu'il ne mesure pas. */}
        <div style={{marginTop: 50, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 14}}>
          <Pop at={exercice} style={{display: 'flex', alignItems: 'center', gap: 6}}>
            <Check p={ease(frame, exercice + 4, exercice + 12)} size={64} color="#fff" />
            <Mono size={56} color="#fff">un exercice</Mono>
          </Pop>
          <Pop at={travail} style={{paddingLeft: 70}}><Mono size={56} color={accent}>pas ton travail</Mono></Pop>
        </div>
      </div>
    </Scene>
  );
};

// ---------- 1. ARC-AGI-3 : 62,7 %, puis 99,9 % sur les mêmes jeux avec un autre programme autour ----------

const Arc: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const gpt = at('arc', 'GPT-6');
  const astra = at('arc', 'Astra');
  const n62 = at('arc', '62,7');
  const jeux = at('arc', 'jeux');
  const arcagi = at('arc', 'ARC-AGI');
  const puis = at('arc', 'puis');
  const programme = at('arc', 'programme');
  const autour = at('arc', 'autour');
  // Text swap sec (pas de count-up : c'est un saut, pas un progrès graduel) : sur « puis », 62,7 % sort vers le haut
  // et 99,9 % entre par le bas derrière un masque, en 0,3 s ; punch zoom à l'arrivée (le seul du short).
  const SWAP = 9;
  const swap = ease(frame, puis, puis + SWAP, [0, 1], 'inOut');
  const done = puis + SWAP;
  return (
    <Scene
      bottom={
        <Pop at={n62} style={{display: 'flex', justifyContent: 'center'}}>
          <div style={{transform: `scale(${punch(frame, done)})`}}>
            {/* Le masque : une fenêtre de la hauteur du chiffre, les deux valeurs glissent dedans. */}
            <div style={{position: 'relative', height: 170, overflow: 'hidden', display: 'flex', justifyContent: 'center'}}>
              <div style={{transform: `translateY(${-170 * swap}px)`}}>
                <div style={{height: 170, display: 'flex', alignItems: 'center'}}><Mono size={130} color="#fff">62,7 %</Mono></div>
                <div style={{height: 170, display: 'flex', alignItems: 'center'}}><Mono size={130} color={accent}>99,9 %</Mono></div>
              </div>
            </div>
          </div>
        </Pop>
      }
    >
      <div style={{position: 'relative', width: W, height: 470}}>
        {/* Le décor : la date, posée dès l'entrée. */}
        {/* Il s'efface quand le programme entre en scène, pour laisser la place à son libellé. */}
        <Pop at={2} style={{position: 'absolute', left: 0, top: 0, opacity: gone(frame, programme)}}><Mono size={52} color={LABEL}>septembre 2026</Mono></Pop>
        {/* Un des jeux, puis le nom du test. */}
        <Pop at={jeux} style={{position: 'absolute', left: 0, top: 110}}><Game cell={28} /></Pop>
        <Pop at={arcagi} style={{position: 'absolute', left: 0, top: 400}}><Mono size={52} color="#fff">ARC-AGI-3</Mono></Pop>
        {/* Le modèle, puis le programme qui se dessine autour de lui (draw-on). */}
        <div style={{position: 'absolute', left: 430, top: 90, width: 400, height: 280}}>
          {frame >= programme ? <Frame w={400} h={280} p={ease(frame, programme, programme + 24)} /> : null}
          <Pop at={gpt} style={{position: 'absolute', left: 60, top: 54}}><Model w={280} /></Pop>
        </div>
        <Pop at={astra} style={{position: 'absolute', left: 430, width: 400, top: 400, display: 'flex', justifyContent: 'center'}}><Mono size={52} color="#fff">GPT-6 Astra</Mono></Pop>
        <Pop at={autour} style={{position: 'absolute', left: 430, width: 400, top: 10, display: 'flex', justifyContent: 'center'}}><Mono size={52} color={accent}>autre programme</Mono></Pop>
      </div>
    </Scene>
  );
};

// ---------- 2. Le harnais : le modèle cadenassé, le cadre qui change, le carnet qui passe d'un appel à l'autre ----------

const Harnais: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const late = useLate();
  const change = at('harnais', 'changé');
  const programme = at('harnais', 'programme');
  const raisonnement = at('harnais', 'raisonnement');
  const appel = late(at('harnais', 'appel'), 22);
  const autre = late(at('harnais', "l'autre"), 14);
  const seulement = at('harnais', 'seulement');
  // Le cadre change, le modèle non : sur « seulement », on revoit l'ancien programme (gris) ; sur « programme »,
  // le nouveau se redessine par-dessus (draw-on).
  const redraw = frame < seulement ? 1 : ease(frame, programme, programme + 18);
  // Le carnet vole en arc de l'appel de gauche à celui de droite, par-dessus le modèle.
  const hop = ease(frame, autre - 4, autre + 8, [0, 1], 'inOut');
  const [cx, cy] = arc(hop, [150, 20], [640, 20], 70);
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 470}}>
        {/* Le décor : le modèle dans son programme, tel que la scène d'avant l'a laissé. */}
        <div style={{position: 'absolute', left: 234, top: 120, width: 420, height: 290}}>
          {frame >= seulement ? <Frame w={420} h={290} p={1} width={8} color="#5a5a5a" /> : null}
          <Frame w={420} h={290} p={redraw} width={8} />
          <Pop at={0} style={{position: 'absolute', left: 70, top: 58}}><Model w={280} lock={ease(frame, change, change + 10)} /></Pop>
        </div>
        <Pop at={programme + 5} style={{position: 'absolute', left: 234, width: 420, top: 425, display: 'flex', justifyContent: 'center', opacity: frame >= raisonnement ? 0.4 : 1}}>
          <Mono size={52} color={accent}>le programme</Mono>
        </Pop>
        {/* Deux appels au modèle, de part et d'autre. */}
        <Pop at={appel} style={{position: 'absolute', left: 0, top: 220, display: 'flex', flexDirection: 'column', gap: 10, width: 200}}><Msg w={200} /></Pop>
        <Pop at={autre} style={{position: 'absolute', left: 688, top: 220, display: 'flex', flexDirection: 'column', gap: 10, width: 200}}><Msg w={200} right /></Pop>
        {/* Le carnet : pop in sur « raisonnement », puis il passe d'un appel à l'autre en arc. */}
        <Pop at={raisonnement} style={{position: 'absolute', left: cx, top: cy}}><Carnet w={96} /></Pop>
      </div>
    </Scene>
  );
};

// ---------- 3. Le TOEIC : 990 en gras sur le CV, puis l'appel avec Manchester ----------

const Toeic: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const late = useLate();
  const nouveau = at('toeic', 'nouveau');
  const n990 = at('toeic', '990');
  const maximal = at('toeic', 'maximal');
  const gras = at('toeic', 'gras');
  const cv = at('toeic', 'CV');
  const premier = at('toeic', 'premier');
  const appel = at('toeic', 'appel');
  const client = at('toeic', 'client');
  const manchester = at('toeic', 'Manchester');
  const repeats = [at('toeic', 'répéter'), at('toeic', 'chaque'), at('toeic', 'phrase')].map((f) => late(f, 10));
  const cvOut = frame >= premier;
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 560}}>
        {/* Le décor : le bureau, posé dès l'entrée. */}
        <Pop at={2} style={{position: 'absolute', left: 0, right: 0, top: 456}}><div style={{height: 24, background: '#b8b0a0'}} /></Pop>
        {/* Le nouveau, derrière son bureau ; au premier appel, le téléphone à l'oreille. */}
        <Pop at={nouveau} style={{position: 'absolute', left: 30, top: 232}}><Pixel sprite={NOUVEAU} px={16} seed={2} /></Pop>
        <Pop at={appel} style={{position: 'absolute', left: 196, top: 262}}><Phone w={40} /></Pop>
        {/* Son CV : la ligne du TOEIC s'écrit à la machine (typewriter), puis se surligne sur « en gras » (highlight). */}
        {frame < premier + 6 ? (
          <div style={{position: 'absolute', left: 400, top: 0, opacity: cvOut ? gone(frame, premier) : 1}}>
            <Pop at={n990} style={{width: 440, background: '#efe9dc', border: '6px solid #000', boxShadow: pixelShadow('#444'), padding: '26px 30px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 16}}>
              <div style={{display: 'flex', gap: 20, alignItems: 'center'}}>
                <div style={{width: 76, height: 90, background: '#c9c1b0', lineHeight: 0, overflow: 'hidden', display: 'flex', justifyContent: 'center'}}><Pixel sprite={NOUVEAU} px={6} seed={2} /></div>
                <div style={{opacity: frame >= cv ? 1 : 0}}><Mono size={72} color="#111">CV</Mono></div>
              </div>
              {[86, 64].map((w, k) => <div key={k} style={{height: 14, width: `${w}%`, background: '#9a9384'}} />)}
              <div style={{fontFamily: 'inherit', minHeight: 70}}>
                <Highlight at={gras}><Mono size={60} color="#111">{typed(frame, n990, 'TOEIC 990', 36)}</Mono></Highlight>
              </div>
              {[78, 58].map((w, k) => <div key={k} style={{height: 14, width: `${w}%`, background: '#9a9384'}} />)}
            </Pop>
            <Pop at={maximal} style={{marginTop: 18, display: 'flex', justifyContent: 'center'}}><Mono size={52} color={LABEL}>score maximal</Mono></Pop>
          </div>
        ) : null}
        {/* Le client de Manchester, sous son nuage. */}
        <Pop at={client} style={{position: 'absolute', left: 666, top: 232}}><Pixel sprite={CLIENT} px={16} seed={5} /></Pop>
        <Pop at={client + 4} style={{position: 'absolute', left: 626, top: 262}}><div style={{transform: 'scaleX(-1)', lineHeight: 0}}><Phone w={40} /></div></Pop>
        <Pop at={manchester} style={{position: 'absolute', left: 640, top: 96}}><Rain w={110} p={frame / 30} /></Pop>
        <Pop at={manchester + 4} style={{position: 'absolute', left: 540, width: 348, top: 494, display: 'flex', justifyContent: 'flex-end'}}><Mono size={52} color={LABEL}>Manchester</Mono></Pop>
        {/* Une bulle « ? » par phrase à répéter (stagger) : la voix ne dit pas « pardon », l'écran ne l'écrit pas. */}
        {repeats.map((f, k) => (
          <Pop key={k} at={f} style={{position: 'absolute', left: 250 + 26 * k, top: 190 - 92 * k, background: '#2a2a2a', border: `4px solid ${k === 2 ? accent : '#fff'}`, borderRadius: 28, padding: '8px 22px'}}>
            <Mono size={64} color="#fff">?</Mono>
          </Pop>
        ))}
      </div>
    </Scene>
  );
};

// ---------- 4. La relecture : près de 300 corrections validées par les tests, la moitié refusée ----------

const N = 296;
const COLS = 20;
const CELL_W = (W - (COLS - 1) * 6) / COLS;
const CELL_H = 26;
// Environ la moitié refusée, répartie un peu partout (ordre pseudo-aléatoire stable).
const REFUSED = Array.from({length: N}, (_, k) => k).filter((k) => rnd(k) < 0.5);

const Relecture: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const late = useLate();
  const y2026 = at('relecture', '2026');
  const devs = at('relecture', 'développeurs');
  const n300 = at('relecture', '300');
  const validees = at('relecture', 'validées');
  const tests = at('relecture', 'tests');
  const moitie = late(at('relecture', 'moitié'), 40);
  const acceptee = late(at('relecture', 'acceptée'), 8);
  // Cascades dans l'ordre de lecture : les cartes se posent sur « 300 », les coches vertes passent sur « validées … tests »,
  // les refus se retournent (flip) sur « la moitié … acceptée ».
  const fillEnd = n300 + 20;
  const checkEnd = Math.max(validees + 12, tests + 6);
  const flipEnd = Math.max(moitie + 12, acceptee);
  return (
    <Scene
      gap={26}
      bottom={
        <div style={{position: 'relative', display: 'flex', justifyContent: 'center'}}>
          {frame < moitie + 6 ? (
            <Pop at={n300} style={{opacity: gone(frame, moitie)}}><Mono size={64} color="#fff">près de 300</Mono></Pop>
          ) : (
            <Pop at={moitie}><Mono size={64} color={accent}>la moitié</Mono></Pop>
          )}
        </div>
      }
    >
      <div style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between'}}>
        <div style={{display: 'flex', gap: 18}}>
          {DEVS.map((s, k) => (
            <Pop key={k} at={devs + 3 * k}><Pixel sprite={s} px={9} seed={k * 3} /></Pop>
          ))}
        </div>
        <Pop at={Math.max(2, y2026 - 4)}><Mono size={52} color={LABEL}>2026</Mono></Pop>
      </div>
      <div style={{display: 'grid', gridTemplateColumns: `repeat(${COLS}, ${CELL_W}px)`, gap: 6}}>
        {Array.from({length: N}, (_, k) => {
          const r = k / N;
          const placed = ease(frame, n300 + r * 20, n300 + r * 20 + 4);
          const checked = ease(frame, validees + r * (checkEnd - validees), validees + r * (checkEnd - validees) + 5);
          const rank = REFUSED.indexOf(k);
          // Flip : la carte se retourne sur l'axe horizontal ; passé la moitié du geste, on voit son dos (le refus).
          const f = rank < 0 ? 0 : ease(frame, moitie + (rank / REFUSED.length) * (flipEnd - moitie), moitie + (rank / REFUSED.length) * (flipEnd - moitie) + 8, [0, 1], 'inOut');
          const back = f > 0.5;
          return (
            <div key={k} style={{position: 'relative', height: CELL_H, border: `3px solid ${placed > 0 ? (back ? accent : '#5a5a5a') : '#2a2a2a'}`, background: back ? withAlpha(accent, 0.35) : placed > 0 ? '#2a2a2a' : 'transparent', boxSizing: 'border-box', transform: `scaleY(${Math.abs(Math.cos(Math.PI * f))})`, opacity: 0.35 + 0.65 * placed, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              {checked > 0 && !back ? (
                <svg width={20} height={16} viewBox="0 0 20 16" style={{opacity: checked}}><path d="M2 8 L8 14 L18 2" fill="none" stroke={GREEN} strokeWidth={4} /></svg>
              ) : null}
              {back ? (
                <svg width={16} height={16} viewBox="0 0 16 16"><path d="M2 2 L14 14 M14 2 L2 14" fill="none" stroke="#fff" strokeWidth={3} /></svg>
              ) : null}
            </div>
          );
        })}
      </div>
    </Scene>
  );
};

// ---------- 5. À quoi sert un score : un filtre, une courbe de progrès, mais pas d'arbitre entre deux modèles proches ----------

const BASE = 520; // la ligne de base du graphique
const BAR = 110;
const MODEL_W = 150;
const MODEL_H = MODEL_W * 0.62;

const Column: React.FC<{x: number; h: number; style?: React.CSSProperties; children?: React.ReactNode}> = ({x, h, style, children}) => (
  <div style={{position: 'absolute', left: x - MODEL_W / 2, top: BASE - h - MODEL_H - 10, width: MODEL_W, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, ...style}}>
    <Model w={MODEL_W} />
    <div style={{width: BAR, height: h, background: '#9a9a9a'}} />
    {children}
  </div>
);

const Sert: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const late = useLate();
  const score = at('sert', 'score');
  const ecarter = at('sert', 'écarter');
  const trop = at('sert', 'trop');
  const faible = at('sert', 'faible');
  const progres = at('sert', 'progrès');
  const mais = at('sert', 'mais');
  const deux = at('sert', 'deux');
  const choisit = late(at('sert', 'choisit'), 20);
  // bar grow en cascade sur « score » : un modèle faible, deux modèles proches.
  const grow = (k: number) => ease(frame, score + 3 * k, score + 3 * k + 14);
  const up = ease(frame, progres, progres + 14); // bar grow : les progrès
  const level = ease(frame, deux, deux + 12, [0, 1], 'inOut'); // les deux se rejoignent au même niveau
  const hA = 250 * grow(1) + 40 * up + 10 * level;
  const hB = 270 * grow(2) + 40 * up - 10 * level;
  const xA = interpolate(level, [0, 1], [460, 330]);
  const xB = interpolate(level, [0, 1], [760, 560]);
  // Le modèle trop faible passe sous le seuil et tombe (anticipation d'une image, puis chute en arc).
  const fall = ease(frame, faible + 4, faible + 20, [0, 1], 'inOut');
  const [fx, fy] = arc(fall, [0, 0], [-60, 420], 40);
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 560}}>
        {/* Le décor : la ligne de base, posée dès l'entrée. */}
        <Pop at={2} style={{position: 'absolute', left: 0, right: 0, top: BASE}}><div style={{height: 8, background: '#fff'}} /></Pop>
        {/* Le seuil : un trait pointillé qui se dessine sur « écarter » (draw-on), et s'efface quand on compare deux modèles. */}
        <svg width={W} height={20} viewBox={`0 0 ${W} 20`} style={{position: 'absolute', left: 0, top: BASE - 200 - 10, opacity: frame >= ecarter ? gone(frame, deux) : 0}}>
          <line x1={0} y1={10} x2={W * ease(frame, ecarter, ecarter + 16)} y2={10} stroke={accent} strokeWidth={6} strokeDasharray="22 14" />
        </svg>
        {frame < faible + 22 ? (
          <div style={{position: 'absolute', left: 0, top: 0, width: W, height: 560, opacity: 1 - fall, transform: `translate(${fx}px, ${fy}px) rotate(${-20 * fall}deg)`}}>
            <Pop at={score}><Column x={130} h={110 * grow(0)} /></Pop>
            <Pop at={trop} style={{position: 'absolute', left: 30, top: BASE + 20}}><Mono size={52} color={accent}>trop faible</Mono></Pop>
          </div>
        ) : null}
        <Pop at={score + 3}><Column x={xA} h={hA} /></Pop>
        <Pop at={score + 6}><Column x={xB} h={hB} /></Pop>
        {/* Les progrès : une flèche qui se dessine à côté des deux barres. */}
        {frame >= progres && frame < mais + 6 ? (
          <div style={{position: 'absolute', left: 0, top: BASE + 20, width: W, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10, opacity: gone(frame, mais)}}>
            <svg width={60} height={60} viewBox="0 0 60 60"><Draw d="M30 54 L30 8 M12 26 L30 8 L48 26" p={ease(frame, progres, progres + 12)} width={8} len={120} color="#fff" /></svg>
            <Mono size={52} color="#fff">progrès</Mono>
          </div>
        ) : null}
        {/* Deux modèles au même niveau : pas de gagnant. */}
        <Pop at={choisit} style={{position: 'absolute', left: 445 - 60, width: 120, top: 40, display: 'flex', justifyContent: 'center'}}>
          <Mono size={120} color={accent}>?</Mono>
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 6. Chute : une semaine de vraies demandes, deux piles de travail, on garde la moins retouchée ----------

const DAY_W = 150;
const DAY_GAP = (W - 5 * DAY_W) / 4;
const dayX = (k: number) => k * (DAY_W + DAY_GAP) + DAY_W / 2;
const MX = [250, 640]; // les deux modèles
const MARKS = [[0, 1, 2, 4], [3]]; // les retouches sur chaque pile : beaucoup à gauche, une seule à droite

const Chute: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const late = useLate();
  const semaine = at('chute', 'semaine');
  const demandes = at('chute', 'demandes');
  const garde = at('chute', 'garde');
  const retouches = at('chute', 'retouches');
  const moins = late(at('chute', 'moins'), 30);
  // Les demandes de chaque jour partent vers les deux modèles en arc, en cascade de gauche à droite.
  const fly0 = demandes - 4;
  const flyEnd = fly0 + 4 * 3 + 14;
  const piles = Math.max(garde, flyEnd);
  const kept = ease(frame, moins, moins + 20);
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 620}}>
        {/* La semaine : cinq cases de calendrier, avec une demande chacune. */}
        {[0, 1, 2, 3, 4].map((k) => (
          <Pop key={k} at={semaine + 2 * k} style={{position: 'absolute', left: dayX(k) - DAY_W / 2, top: 0, width: DAY_W, height: 100, border: '5px solid #fff', boxSizing: 'border-box', background: '#1c1c1c'}}>
            <div style={{height: 18, background: accent}} />
            <div style={{display: 'flex', justifyContent: 'center', marginTop: 14, opacity: frame >= demandes ? 1 : 0}}>
              <div style={{width: 64, height: 40, background: '#efe9dc', border: '3px solid #000'}} />
            </div>
          </Pop>
        ))}
        {/* Les copies des demandes, qui volent vers chacun des deux modèles. */}
        {frame >= fly0 && frame < flyEnd + 2
          ? [0, 1, 2, 3, 4].flatMap((k) =>
              MX.map((mx, j) => {
                const p = ease(frame, fly0 + 3 * k, fly0 + 3 * k + 14, [0, 1], 'inOut');
                const [x, y] = arc(p, [dayX(k), 50], [mx, 230], 40);
                return p > 0 && p < 1 ? <div key={`${k}-${j}`} style={{position: 'absolute', left: x - 30, top: y - 18, width: 60, height: 36, background: '#efe9dc', border: '3px solid #000'}} /> : null;
              }),
            )
          : null}
        {/* Les deux modèles, posés dès l'entrée (ceux de la scène d'avant) ; celui qu'on garde s'encadre (draw-on). */}
        {MX.map((mx, j) => (
          <div key={j} style={{position: 'absolute', left: mx - 110, top: 190, opacity: j === 0 ? 1 - 0.6 * kept : 1}}>
            <Pop at={2}><Model w={220} /></Pop>
          </div>
        ))}
        {/* Les deux piles de travail, puis les retouches au stylo rouge. */}
        {MX.map((mx, j) => (
          <div key={j} style={{position: 'absolute', left: mx - 120, top: 360, width: 240, height: 240, opacity: j === 0 ? 1 - 0.6 * kept : 1}}>
            {[0, 1, 2, 3, 4].map((s) => (
              <Pop key={s} at={piles + 2 * s} style={{position: 'absolute', left: (s % 2) * 8, top: 200 - 44 * s, width: 230, height: 40, background: '#efe9dc', border: '3px solid #000', boxSizing: 'border-box'}}>
                <div style={{position: 'absolute', left: 16, top: 14, width: 120, height: 6, background: '#9a9384'}} />
                {MARKS[j].includes(s) ? (
                  <svg width={90} height={34} viewBox="0 0 90 34" style={{position: 'absolute', right: 8, top: 0}}>
                    <Draw d="M6 24 C 20 4, 30 30, 44 12 S 70 4, 84 22" p={ease(frame, retouches + MARKS[j].indexOf(s) * 3, retouches + MARKS[j].indexOf(s) * 3 + 10)} width={6} len={120} color="#e0312b" />
                  </svg>
                ) : null}
              </Pop>
            ))}
          </div>
        ))}
        {frame >= moins ? (
          <div style={{position: 'absolute', left: MX[1] - 150, top: 170}}>
            <Frame w={300} h={440} p={kept} width={8} />
            <Pop at={moins + 10} style={{position: 'absolute', left: 250, top: -50}}><Check p={ease(frame, moins + 10, moins + 20)} size={90} /></Pop>
          </div>
        ) : null}
      </div>
    </Scene>
  );
};

// ---------- Montage ----------

const SCENES: Record<string, React.FC> = {hook: Hook, arc: Arc, harnais: Harnais, toeic: Toeic, relecture: Relecture, sert: Sert, chute: Chute};

export const MytheScoreVoix: React.FC = () => <V.Montage scenes={SCENES} accent={AC} />;

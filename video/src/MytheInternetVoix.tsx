// Short Mythe « L'IA a lu tout Internet, donc elle sait tout » (YouTube / TikTok / Instagram), épisode 22, préparé le
// 2026-10-22 (calage estimé, sans voix). Fiche mythe-a-lu-tout-internet de lexique/terms.js ; sources dans
// voix/tout-internet.script.json : Common Crawl CC-MAIN-2026-39 (septembre 2026 : anglais 41,9 % des pages, français 4,7 %,
// breton 0,002 %), Calderon et al. (Google, février 2026 : Gemini 3 Pro retrouve de tête 84,6 % des faits encodés quand la
// page Wikipédia est très vue, 63,3 % quand elle l'est peu), finale de 1998 (Zidane deux fois de la tête, Petit le troisième).
// Fil : ce qu'on colle sous les yeux du modèle, il le lit moins bien quand ça s'allonge (ép. 21) ; ce qu'il a lu à
// l'entraînement, il ne le retrouve pas toujours non plus.
// Raymond est inventé (sprites dans ce fichier) ; Zidane et Petit sont de vraies personnes : vraies photos de Wikimedia
// Commons pixelisées (règle des vraies photos, ép. 11), en attente dans public/voix (voir PORTRAITS plus bas).
// Aucun logo : navigateur générique, vignettes façon album sans marque, pages Wikipédia sans le globe, Gemini en texte.
// L'écran suit la voix (univers.md) : chaque élément entre sur le mot qui le nomme, at('scène', 'mot'), jamais en secondes.
// Le mouvement : ease partout, arcs pour ce qui vole, squash au tampon et au rebond de la bulle, un seul punch zoom (« 85 »).
import React from 'react';
import {Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Big, Draw, Lock, Mono, Pop, Scene, Scissors, W, arc, clamp, countUp, ease, punch, squash, typed, useAccent} from './kit';
import {LABEL, blink, makeVoix} from './voix/VoixShort';
import {Pixel, type Sprite} from './voix/Pixel';
import {Cross, Stamp, pixelShadow} from './voix/Parts';
import ALIGN from './voix/tout-internet.align.json';
import SCRIPT from './voix/tout-internet.script.json';

const AC = '#FF7A7A'; // catégorie Mythes vs réalité
const V = makeVoix(ALIGN, SCRIPT, 'voix/prediction-music.mp3');
const {at} = V;
export const MYTHEINTERNETVOIX_DURATION = V.duration;

// Portraits réels, pixelisés en 48 × 63 comme les acteurs de MytheModeleVoix (crédits dans public/voix/CREDITS-semaine-27-10.md) :
//   public/voix/tout-internet-zidane.png (« Zinedine Zidane 2008.jpg », Raphaël Labbé, CC BY-SA 2.0)
//   public/voix/tout-internet-petit.png (« Emmanuel Petit.jpg », Christophe95, CC BY-SA 3.0)
// À false, un buste gris générique tient la place (un <Img> sur un fichier absent ferait échouer le rendu).
const PORTRAITS = true;

// Collage (univers.md, « Illustrer plutôt qu'étiqueter ») : une vraie capture posée d'un coup, bord blanc, ombre pixel,
// deux bouts de scotch aux coins. Captures dans public/voix (tout-internet-commoncrawl.png, tout-internet-calderon.png).
const Collage: React.FC<{src: string; w: number; ratio: number; at: number; tilt: number}> = ({src, w, ratio, at: a, tilt}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const slap = spring({frame: frame - a, fps, config: {damping: 12, stiffness: 260}});
  return (
    <div style={{position: 'relative', opacity: frame >= a ? 1 : 0, transform: `scale(${1.4 - 0.4 * slap}) rotate(${tilt * (2 - slap)}deg)`}}>
      <div style={{border: '8px solid #fff', boxShadow: pixelShadow('#333'), lineHeight: 0, background: '#fff'}}>
        <Img src={staticFile(src)} style={{width: w, height: Math.round(w * ratio), display: 'block'}} />
      </div>
      <div style={{position: 'absolute', left: -26, top: -14, width: 110, height: 34, background: 'rgba(239,233,220,0.85)', transform: 'rotate(-30deg)'}} />
      <div style={{position: 'absolute', right: -26, top: -14, width: 110, height: 34, background: 'rgba(239,233,220,0.85)', transform: 'rotate(30deg)'}} />
    </div>
  );
};

// Sortie : 6 images en inOut (plus rapide que l'entrée Pop).
const gone = (frame: number, until: number) => ease(frame, until, until + 6, [1, 0], 'inOut');
const SKIN = '#e3b58e';
const PAPER = '#efe9dc';

// ---------- Personnages (sprites propres à ce short, même format que Pixel.tsx : S peau, E yeux qui clignent) ----------

// Raymond, supporter des Bleus : cheveux gris, moustache, veste marron, écharpe bleue. Quatre poses, mêmes dimensions.
const RAY_PAL = {H: '#b9b9b9', S: SKIN, E: '#111', M: '#7a7a7a', B: '#2f5bd0', J: '#8a6a4a'};
const RAYMOND: Sprite = {
  rows: ['................', '................', '......HHHH......', '.....HHHHHH.....', '.....SSSSSS.....', '.....SESSES.....', '.....SSSSSS.....', '.....SMMMMS.....', '......SSSS......', '....BBBBBBBB....', '...JJJBBJJJJJ...', '...JJJBBJJJJJ...', '...SJJBBJJJJS...', '...SJJJJJJJJS...', '.....JJJJJJ.....', '.....JJJJJJ.....'],
  palette: RAY_PAL,
};
// Il se gratte la tête (le troisième but ne revient pas).
const RAYMOND_GRATTE: Sprite = {
  rows: ['................', '................', '......HHHH.SS...', '.....HHHHHHSS...', '.....SSSSSS.J...', '.....SESSES.J...', '.....SSSSSS.J...', '.....SMMMMS.J...', '......SSSS..J...', '....BBBBBBBBJ...', '...JJJBBJJJJJ...', '...JJJBBJJJJJ...', '...SJJBBJJJJ....', '...SJJJJJJJJ....', '.....JJJJJJ.....', '.....JJJJJJ.....'],
  palette: RAY_PAL,
};
// Il tend le bras (le résumé du match dans la main).
const RAYMOND_TEND: Sprite = {
  rows: ['................', '................', '......HHHH......', '.....HHHHHH.....', '.....SSSSSS.....', '.....SESSES.....', '.....SSSSSS.....', '.....SMMMMS.....', '......SSSS......', '....BBBBBBBB....', '...JJJBBJJJJJJSS', '...JJJBBJJJJJJSS', '...SJJBBJJJJ....', '...SJJJJJJJJ....', '.....JJJJJJ.....', '.....JJJJJJ.....'],
  palette: RAY_PAL,
};
// Il lève les bras (l'album est complet).
const RAYMOND_JOIE: Sprite = {
  rows: ['...SS......SS...', '....J......J....', '....J.HHHH.J....', '....JHHHHHHJ....', '....JSSSSSSJ....', '....JSESSESJ....', '....JSSSSSSJ....', '....JSMMMMSJ....', '....J.SSSS.J....', '....BBBBBBBB....', '...JJJBBJJJJJ...', '...JJJBBJJJJJ...', '....JJBBJJJJ....', '....JJJJJJJJ....', '.....JJJJJJ.....', '.....JJJJJJ.....'],
  palette: RAY_PAL,
};

// Le public de la tribune : bustes sans visage, en retrait (ils ne clignent pas, Raymond est le seul personnage).
const fan = (h: string, c: string): Sprite => ({
  rows: ['....HHHH....', '...HSSSSH...', '...SSSSSS...', '...SSSSSS...', '....SSSS....', '..CCCCCCCC..', '.CCCCCCCCCC.', '.CCCCCCCCCC.'],
  palette: {H: h, S: '#b08a6a', C: c},
});
const FANS = [fan('#3a2a1e', '#2f5bd0'), fan('#1e1e1e', '#f2f2f2'), fan('#6b4a2b', '#c0392b'), fan('#b9b9b9', '#2f5bd0'), fan('#2a2a2a', '#3a4a8a')];

// Les robots d'indexation : une araignée au bout de son fil (les yeux en couleur d'accent).
const spider = (eye: string): Sprite => ({
  rows: ['.L.....L.', '..L...L..', 'L..BBB..L', '.LBEBEBL.', 'L..BBB..L', '..L...L..', '.L.....L.'],
  palette: {L: '#cfcfcf', B: '#cfcfcf', S: '#cfcfcf', E: eye},
});

// Une bulle de chat (tes messages), en pixel art.
const BULLE: Sprite = {
  rows: ['..WWWWWWWWWW..', '.WWWWWWWWWWWW.', 'WWWWWWWWWWWWWW', 'WWKKWWKKWWKKWW', 'WWKKWWKKWWKKWW', 'WWWWWWWWWWWWWW', '.WWWWWWWWWWWW.', '..WWWWWWWWWW..', '..WWWW........', '..WWW.........', '..WW..........', '..W...........'],
  palette: {W: '#f2f2f2', K: '#141414'},
};

// Buste gris générique : il tient la place d'un portrait réel tant que le fichier n'est pas dans public/voix.
const BUSTE: Sprite = {
  rows: ['............', '....HHHH....', '...HHHHHH...', '...HSSSSH...', '...SSSSSS...', '...SSSSSS...', '...SSSSSS...', '....SSSS....', '.....SS.....', '..TTTTTTTT..', '.TTTTTTTTTT.', '.TTTTTTTTTT.', 'TTTTTTTTTTTT', 'TTTTTTTTTTTT', 'TTTTTTTTTTTT', 'TTTTTTTTTTTT'],
  palette: {H: '#5a5a5a', S: '#8a8a8a', T: '#4a4a4a'},
};

// ---------- Le navigateur aux onglets en éventail (repris par TokenVoix, ép. 23) ----------

export type TabLook = {fill: string; border: string; dashed?: boolean; q?: boolean};
const TABS = 9;
// w : largeur de la fenêtre ; les onglets au-delà du 4e débordent à droite en éventail ; look(k) colore l'onglet k.
export const Browser: React.FC<{w: number; look?: (k: number) => TabLook; tape?: boolean}> = ({w, look, tape = true}) => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const tw = w * 0.2;
  const th = w * 0.085;
  const h = w * 0.62;
  const bw = Math.max(3, Math.round(w / 130));
  return (
    <div style={{position: 'relative', width: w, height: h + th}}>
      {Array.from({length: TABS}, (_, k) => {
        const l = look?.(k) ?? {fill: '#3a3a3a', border: '#9a9a9a'};
        const out = Math.max(0, k - 3);
        return (
          <div key={k} style={{position: 'absolute', left: 14 + k * tw * 0.62, top: 0, width: tw, height: th + bw, background: l.fill, border: `${bw}px ${l.dashed ? 'dashed' : 'solid'} ${l.border}`, borderBottom: 'none', borderRadius: `${th / 3}px ${th / 3}px 0 0`, boxSizing: 'border-box', transformOrigin: '0% 100%', transform: `rotate(${-out * 7}deg) translateX(${out * 6}px)`, zIndex: TABS - k, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            {l.q ? <div style={{opacity: blink(frame), lineHeight: 1}}><Mono size={48} color={accent}>?</Mono></div> : null}
          </div>
        );
      })}
      <div style={{position: 'absolute', left: 0, top: th, width: w, height: h, border: `${bw * 2}px solid #fff`, background: '#141414', boxShadow: pixelShadow('#2a2a2a'), boxSizing: 'border-box', padding: w * 0.04, display: 'flex', flexDirection: 'column', gap: w * 0.035, zIndex: TABS + 1}}>
        <div style={{height: w * 0.07, borderRadius: w * 0.035, background: '#2a2a2a', display: 'flex', alignItems: 'center', padding: `0 ${w * 0.03}px`}}>
          <div style={{height: w * 0.016, width: '58%', background: '#6a6a6a'}} />
        </div>
        <div style={{display: 'flex', gap: w * 0.04}}>
          <div style={{width: w * 0.3, height: w * 0.22, background: '#3a3a3a'}} />
          <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: w * 0.03, paddingTop: w * 0.01}}>
            {[92, 70, 84, 60].map((p, k) => <div key={k} style={{height: w * 0.018, width: `${p}%`, background: '#6a6a6a'}} />)}
          </div>
        </div>
        {[88, 76, 82].map((p, k) => <div key={k} style={{height: w * 0.018, width: `${p}%`, background: '#5a5a5a'}} />)}
      </div>
      {/* Collé au mur : deux bouts de scotch aux coins. */}
      {tape ? (
        <>
          <div style={{position: 'absolute', left: -w * 0.04, top: th - w * 0.02, width: w * 0.14, height: w * 0.045, background: 'rgba(239,233,220,0.8)', transform: 'rotate(-32deg)', zIndex: TABS + 2}} />
          <div style={{position: 'absolute', right: -w * 0.04, bottom: -w * 0.01, width: w * 0.14, height: w * 0.045, background: 'rgba(239,233,220,0.8)', transform: 'rotate(-32deg)', zIndex: TABS + 2}} />
        </>
      ) : null}
    </div>
  );
};

// ---------- 0. Hook : la phrase du mythe à la machine, le tampon FAUX, le navigateur scotché ----------

const L1 = "« L'IA a lu tout";
const L2 = 'Internet, donc';
const L3 = 'elle sait tout »';
const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const internet = at('hook', 'Internet');
  const elle = at('hook', 'elle');
  const tout2 = at('hook', 'tout', 1);
  const partie = at('hook', 'partie');
  const retrouve = at('hook', 'retrouve');
  // « une partie du web » : les quatre onglets dans la fenêtre s'allument (lus), l'éventail reste gris ;
  // « ne retrouve pas tout » : deux des onglets lus passent en pointillés, un point d'interrogation clignote.
  const look = (k: number): TabLook => {
    if (k >= 4 || frame < partie + 2 * k) return {fill: '#2e2e2e', border: '#8a8a8a'};
    if ((k === 1 || k === 3) && frame >= retrouve + (k === 3 ? 5 : 0)) return {fill: '#141414', border: accent, dashed: true, q: true};
    return {fill: '#f2f2f2', border: '#f2f2f2'};
  };
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 640}}>
        {/* Typewriter : la citation s'écrit sur la voix, une ligne par groupe de mots. */}
        <div style={{position: 'absolute', left: 0, top: -470, display: 'flex', flexDirection: 'column', gap: 6}}>
          <Big size={100}>{typed(frame, 0, L1, 40) || ' '}</Big>
          <Big size={100}>{typed(frame, internet - 2, L2, 40) || ' '}</Big>
          <Big size={100}>{typed(frame, elle - 2, L3, 40) || ' '}</Big>
        </div>
        {/* Tampon FAUX sur « donc elle sait tout » (squash à l'impact), jusqu'à la fin du hook : l'image de couverture. */}
        <Stamp at={tout2 + 6} size={96} tilt={-12} bg="rgba(0,0,0,0.6)" style={{right: -24, top: -205, zIndex: 30}}>FAUX</Stamp>
        {/* Décor dès la première image : le navigateur collé de travers, ses onglets en éventail. */}
        <div style={{position: 'absolute', left: 10, top: 70, transform: 'rotate(-3deg)'}}>
          <Browser w={800} look={look} />
        </div>
      </div>
    </Scene>
  );
};

// ---------- 1. Vrai : une mosaïque de pages, les robots ramassent le web public, le tamis trie ----------

// 4 × 4 cases assez grandes pour lire les cadenas sur un téléphone (audit du 2026-10-22).
const COLS = 4;
const TW = 200;
const MT = 90;
const tileXY = (k: number): [number, number] => [(k % COLS) * 229, MT + Math.floor(k / COLS) * 170];
const LOCKED = [2, 7, 9, 15];
const PICK = [3, 8, 14];
const BROWSER_TILE = 5;
const SIEVE: [number, number] = [W / 2, 560];
const SPX = 11; // pixel des araignées (9 × 7 pixels)

const MiniPage: React.FC<{w?: number; lit?: boolean; grey?: boolean}> = ({w = TW, lit, grey}) => (
  <div style={{width: w, height: w * 0.75, background: grey ? '#262626' : '#1c1c1c', border: `4px solid ${lit ? '#fff' : grey ? '#444' : '#777'}`, boxSizing: 'border-box', padding: w * 0.1, display: 'flex', flexDirection: 'column', gap: w * 0.08}}>
    {[90, 64, 78].map((p, k) => <div key={k} style={{height: Math.max(4, w * 0.06), width: `${p}%`, background: grey ? '#3a3a3a' : lit ? '#cfcfcf' : '#6a6a6a'}} />)}
  </div>
);

// Le tamis : un cercle de bois et sa grille.
const Sieve: React.FC<{w: number}> = ({w}) => (
  <svg width={w} height={w * 0.42} viewBox="0 0 300 126" style={{overflow: 'visible'}}>
    <path d="M10 30 L40 110 H260 L290 30" fill="#1c1c1c" stroke="#c9a46a" strokeWidth="10" strokeLinejoin="round" />
    {[70, 110, 150, 190, 230].map((x) => <path key={x} d={`M${x} 34 L${x - 6 + (x - 150) * 0.15} 106`} stroke="#8a8a8a" strokeWidth="3" />)}
    {[56, 82].map((y) => <path key={y} d={`M${22 + (y - 30) * 0.37} ${y} H${278 - (y - 30) * 0.37}`} stroke="#8a8a8a" strokeWidth="3" />)}
    <ellipse cx="150" cy="30" rx="142" ry="16" fill="none" stroke="#c9a46a" strokeWidth="10" />
  </svg>
);

const Vrai: React.FC = () => {
  const frame = useCurrentFrame();
  const masse = at('vrai', 'masse');
  const reelle = at('vrai', 'réelle');
  const pub = at('vrai', 'public');
  const robots = at('vrai', 'robots');
  const trie = at('vrai', 'trié');
  // Le navigateur rétrécit (inOut) jusqu'à sa case de la mosaïque pendant « la masse de lecture est bien réelle ».
  const shrink = ease(frame, masse, reelle, [0, 1], 'inOut');
  const [bx, by] = tileXY(BROWSER_TILE);
  const s = interpolate(shrink, [0, 1], [1, TW / 520]);
  const dim = interpolate(frame, [trie, trie + 8], [1, 0.25], clamp);
  const shake = frame >= trie + 14 && frame < trie + 34 ? Math.sin((frame - trie) / 1.4) * 6 : 0;
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 840}}>
        {/* Stagger : la mosaïque de pages remplit l'écran dans l'ordre de lecture. */}
        {Array.from({length: 16}, (_, k) => {
          if (k === BROWSER_TILE || PICK.includes(k)) return null;
          const [x, y] = tileXY(k);
          const locked = LOCKED.includes(k) && frame >= pub + 3 * LOCKED.indexOf(k);
          return (
            <div key={k} style={{position: 'absolute', left: x, top: y, opacity: dim}}>
              <Pop at={masse + 4 + 2 * k}><MiniPage grey={locked} /></Pop>
              {/* « web public » : les pages derrière un cadenas restent grises. */}
              {LOCKED.includes(k) ? <Pop at={pub + 3 * LOCKED.indexOf(k)} style={{position: 'absolute', left: 45, top: 14}}><Lock p={1} size={110} color="#cfcfcf" /></Pop> : null}
            </div>
          );
        })}
        {/* Décor dès l'entrée : le navigateur du hook, qui devient une case parmi les autres. */}
        <div style={{position: 'absolute', left: interpolate(shrink, [0, 1], [184, bx]), top: interpolate(shrink, [0, 1], [60, by - 12]), transform: `scale(${s})`, transformOrigin: '0 0', opacity: dim}}>
          <Browser w={520} tape={false} />
        </div>
        {/* « robots » : trois araignées descendent au bout de leur fil (stagger), ramassent une page chacune ;
            « trié » : les pages volent en arc dans le tamis, il secoue, une page passe à travers. */}
        {PICK.map((k, i) => {
          const a = robots + 3 * i;
          const [tx, ty] = tileXY(k);
          // Arrivée et levée bornées par « trié » : elles finissent avant que les pages s'envolent, quel que soit le débit.
          const arr = Math.max(a + 4, Math.min(a + 14, trie - 4));
          const lift = ease(frame, arr + 1, Math.max(arr + 2, Math.min(arr + 10, trie)), [0, -24]);
          const fly = ease(frame, trie + 3 * i, trie + 3 * i + 14, [0, 1], 'inOut');
          const [px, py] = arc(fly, [tx, ty + lift], [SIEVE[0] - 50 + (i - 1) * 100, SIEVE[1] - 40], 70);
          const fall = i === 1 ? ease(frame, trie + 26, trie + 42, [0, 200], 'inOut') : 0;
          const sy = frame < trie ? ease(frame, a, arr, [-90, ty - 7 * SPX]) + lift : ease(frame, trie + 3 * i, trie + 3 * i + 12, [ty - 7 * SPX + lift, -100], 'inOut');
          return (
            <React.Fragment key={k}>
              <div style={{position: 'absolute', left: px, top: py + fall, transform: `scale(${1 - 0.5 * fly})`, transformOrigin: '0 0', opacity: (frame < trie ? 1 : 1) * (i === 1 ? interpolate(fall, [60, 200], [1, 0], clamp) : 1), zIndex: 5}}>
                <Pop at={masse + 4 + 2 * k}><MiniPage lit={frame >= arr} /></Pop>
              </div>
              {frame >= a && sy > -100 ? (
                <>
                  <div style={{position: 'absolute', left: tx + TW / 2 - 2, top: 0, width: 4, height: Math.max(0, sy + 4), background: '#8a8a8a', zIndex: 6}} />
                  <div style={{position: 'absolute', left: tx + TW / 2 - 4.5 * SPX, top: sy, zIndex: 7}}><Pixel sprite={spider(AC)} px={SPX} /></div>
                </>
              ) : null}
            </React.Fragment>
          );
        })}
        <Pop at={trie} style={{position: 'absolute', left: SIEVE[0] - 180, top: SIEVE[1] - 10, zIndex: 8}}>
          <div style={{transform: `rotate(${shake}deg)`}}><Sieve w={360} /></div>
        </Pop>
        <Pop at={trie + 5} style={{position: 'absolute', left: SIEVE[0] + 200, top: SIEVE[1] + 20, zIndex: 8}}><Mono size={56} color="#fff">trié</Mono></Pop>
        <Pop at={pub + 4} style={{position: 'absolute', left: 0, top: 772}}><Mono size={52} color={LABEL}>web public</Mono></Pop>
      </div>
    </Scene>
  );
};

// ---------- 2. Common Crawl : la barre des langues se colore mot à mot ----------

// Le drapeau breton (Gwenn ha Du) : neuf bandes, le canton d'hermines.
const Gwenn: React.FC<{w: number}> = ({w}) => (
  <svg width={w} height={(w * 2) / 3} viewBox="0 0 90 60" style={{display: 'block'}}>
    <rect width="90" height="60" fill="#f2f2f2" />
    {[0, 2, 4, 6, 8].map((k) => <rect key={k} x="0" y={(k * 60) / 9} width="90" height={60 / 9} fill="#141414" />)}
    <rect x="0" y="0" width="36" height={(4 * 60) / 9 + 0.5} fill="#f2f2f2" />
    {[[7, 6], [18, 6], [29, 6], [12, 16], [24, 16]].map(([x, y], k) => <path key={k} d={`M${x} ${y} l2 4 l2 -4 l-1 6 h-2 Z`} fill="#141414" />)}
    <rect x="0.5" y="0.5" width="89" height="59" fill="none" stroke="#9a9a9a" strokeWidth="1" />
  </svg>
);

const BAR_Y = 190;
const BAR_H = 130;
const EN = 0.419 * W; // 41,9 % des pages
const FR = 0.047 * W; // 4,7 %
const LOUPE: [number, number, number] = [680, 580, 130];
const Crawl: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const common = at('crawl', 'Common');
  const sept = at('crawl', 'septembre');
  const n42 = at('crawl', '42');
  const anglais = at('crawl', 'anglais');
  const n47 = at('crawl', '4,7');
  const francais = at('crawl', 'français');
  const n0 = at('crawl', '0,002');
  const breton = at('crawl', 'breton');
  const tes = at('crawl', 'tes');
  const messages = at('crawl', 'messages');
  const hit = messages + 4;
  // La bulle vole en arc vers la barre, rebondit dessus (squash à l'impact), puis repart hors du cadre par la gauche.
  const go = ease(frame, tes, hit, [0, 1], 'inOut');
  const back = ease(frame, hit, hit + 14, [0, 1], 'inOut');
  const away = ease(frame, hit + 16, hit + 30, [0, 1], 'inOut');
  const IMPACT: [number, number] = [-14, BAR_Y + BAR_H + 4];
  const [bx, by] = frame < hit ? arc(go, [-60, 700], IMPACT, 40) : frame < hit + 16 ? arc(back, IMPACT, [-30, 560], 50) : arc(away, [-30, 560], [-420, 640], 60);
  const [qx, qy] = squash(frame, hit, 0.2);
  const [cx, cy, r] = LOUPE;
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 820}}>
        {/* Décor d'entrée : le tamis de la scène d'avant se vide dans la barre, puis s'efface. */}
        {frame < 32 ? (
          <div style={{position: 'absolute', left: W / 2 - 110, top: 0, opacity: gone(frame, 26)}}>
            <div style={{transform: `rotate(${ease(frame, 0, 12, [0, 28])}deg)`, transformOrigin: '80% 50%'}}><Sieve w={220} /></div>
            {[0, 1].map((k) => (
              <div key={k} style={{position: 'absolute', left: 150 + 30 * k, top: ease(frame, 6 + 6 * k, 22 + 6 * k, [40, BAR_Y - 30], 'inOut'), opacity: frame >= 6 + 6 * k ? 1 : 0}}>
                <MiniPage w={64} lit />
              </div>
            ))}
          </div>
        ) : null}
        {/* Le libellé prend le relais de la capture quand elle part. */}
        <Pop at={Math.max(common, n42 - 4)} style={{position: 'absolute', left: 0, top: 112}}><Mono size={56} color="#fff">Common Crawl</Mono></Pop>
        {/* « Common Crawl » : la vraie page des statistiques de langues, collée d'un coup ; elle part quand la barre se remplit. */}
        {frame < n42 ? (
          <div style={{position: 'absolute', left: 124, top: 10, zIndex: 20, opacity: gone(frame, n42 - 6)}}>
            <Collage src="voix/tout-internet-commoncrawl.png" w={620} ratio={835 / 1000} at={common} tilt={-3} />
          </div>
        ) : null}
        <Pop at={sept} style={{position: 'absolute', right: 0, top: 118}}><Mono size={48} color={LABEL}>septembre 2026</Mono></Pop>
        {/* La barre, posée dès l'entrée ; bar grow sur chaque chiffre dit. */}
        <Pop at={2} style={{position: 'absolute', left: 0, top: BAR_Y, width: W, height: BAR_H}}>
          <div style={{position: 'absolute', inset: 0, background: '#333', border: '5px solid #fff', boxSizing: 'border-box'}} />
          <div style={{position: 'absolute', left: 5, top: 5, bottom: 5, width: Math.max(0, ease(frame, n42, n42 + 14, [0, EN - 5])), background: '#4f7fd0'}} />
          <div style={{position: 'absolute', left: EN, top: 5, bottom: 5, width: ease(frame, n47, n47 + 8, [0, FR]), background: '#f2f2f2'}} />
          {/* 0,002 % : un trait d'un pixel, en couleur d'accent, qui dépasse un peu pour se voir. */}
          <div style={{position: 'absolute', left: EN + FR, top: -14, height: BAR_H + 28, width: 3, background: accent, opacity: frame >= n0 ? 1 : 0}} />
          <Pop at={anglais} style={{position: 'absolute', left: 0, width: EN, top: 30, display: 'flex', justifyContent: 'center'}}><Mono size={56} color="#fff">anglais</Mono></Pop>
        </Pop>
        {/* « français » : le libellé sous son pan, relié par un trait. */}
        <Pop at={francais} style={{position: 'absolute', left: EN + FR / 2 - 250, width: 280, top: BAR_Y + BAR_H, display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
          <div style={{width: 5, height: 34, background: '#fff', marginRight: 28}} />
          <Mono size={52} color="#fff">français</Mono>
        </Pop>
        {/* « breton » : la loupe grossit le trait, avec le drapeau. */}
        <svg width={W} height={820} viewBox={`0 0 ${W} 820`} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible', pointerEvents: 'none'}}>
          <Draw d={`M${EN + FR + 2} ${BAR_Y + BAR_H + 14} L${cx - r * 0.72} ${cy - r * 0.7}`} p={ease(frame, breton, breton + 10)} width={4} len={300} color={accent} />
          <Draw d={`M${cx + r * 0.72} ${cy + r * 0.72} L${cx + r * 1.15} ${cy + r * 1.15}`} p={ease(frame, breton, breton + 10)} width={22} len={80} color="#c9a46a" />
        </svg>
        <Pop at={breton} style={{position: 'absolute', left: cx - r, top: cy - r, width: 2 * r, height: 2 * r}}>
          <div style={{position: 'absolute', inset: 0, borderRadius: '50%', overflow: 'hidden', background: '#333', border: '8px solid #c9a46a', boxSizing: 'border-box'}}>
            <div style={{position: 'absolute', left: 0, width: r - 50, top: 0, height: r, background: '#f2f2f2'}} />
            <div style={{position: 'absolute', left: r - 50, width: 26, top: 0, height: r, background: accent}} />
            <div style={{position: 'absolute', left: 30, top: r + 14}}><Gwenn w={150} /></div>
          </div>
        </Pop>
        <Pop at={breton + 5} style={{position: 'absolute', left: cx - 120, width: 240, top: cy + r + 30, display: 'flex', justifyContent: 'center'}}><Mono size={52} color="#fff">breton</Mono></Pop>
        {/* « tes messages » : la bulle tente d'entrer dans la barre et rebondit. */}
        {frame >= tes ? (
          <div style={{position: 'absolute', left: bx, top: by, transform: `scale(${qx}, ${qy})`, transformOrigin: '50% 0%', opacity: 1 - away}}>
            <Pixel sprite={BULLE} px={12} />
          </div>
        ) : null}
      </div>
    </Scene>
  );
};

// ---------- 3 et 6. La tribune, Raymond et l'album de sa mémoire ----------

// Une vignette de l'album : bord blanc, fond bleu, portrait réel pixelisé (ou buste générique en attendant).
const VW = 150;
const VH = Math.round((VW * 63) / 48);
const Vignette: React.FC<{who: 'zidane' | 'petit'}> = ({who}) => (
  <div style={{width: VW, height: VH, border: '6px solid #fff', background: '#1f3f8f', boxShadow: pixelShadow('#555'), boxSizing: 'content-box', lineHeight: 0, overflow: 'hidden'}}>
    {PORTRAITS ? (
      <Img src={staticFile(`voix/tout-internet-${who}.png`)} style={{width: VW, height: VH, imageRendering: 'pixelated', display: 'block'}} />
    ) : (
      <Pixel sprite={BUSTE} px={VW / 12} style={{display: 'block', marginTop: VH - (16 * VW) / 12}} />
    )}
  </div>
);

// Collée d'un coup : elle arrive grande et de travers, puis se cale.
const Slap: React.FC<{at: number; children: React.ReactNode; tilt: number}> = ({at: a, children, tilt}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({frame: frame - a, fps, config: {damping: 12, stiffness: 260}});
  return <div style={{opacity: frame >= a ? 1 : 0, transform: `scale(${1.5 - 0.5 * p}) rotate(${tilt * (2 - p)}deg)`}}>{children}</div>;
};

const AH = 390;
const SLOTS = [50, 250, 591];
const SLOT_Y = 92;
// open : 0 -> 1, la page de droite s'ouvre ; slots : image où chaque vignette se colle (99999 = case vide) ;
// q : image à partir de laquelle la case vide clignote d'un point d'interrogation.
const Album: React.FC<{open: number; title: number; slots: number[]; q: number}> = ({open, title, slots, q}) => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const who: ('zidane' | 'petit')[] = ['zidane', 'zidane', 'petit'];
  const page = (left: boolean): React.CSSProperties => ({position: 'absolute', top: 0, height: AH, width: W / 2, left: left ? 0 : W / 2, background: PAPER, border: '5px solid #fff', boxSizing: 'border-box', boxShadow: pixelShadow('#333')});
  return (
    <div style={{position: 'relative', width: W, height: AH}}>
      <div style={page(true)} />
      <div style={{...page(false), transform: `scaleX(${open})`, transformOrigin: '0 50%'}} />
      <div style={{position: 'absolute', left: W / 2 - 3, top: 0, width: 6, height: AH, background: '#9a9384'}} />
      <div style={{position: 'absolute', left: 36, top: 18, opacity: frame >= title ? 1 : 0}}><Mono size={52} color="#111">France 98</Mono></div>
      {SLOTS.map((x, k) => (
        <div key={k} style={{position: 'absolute', left: x, top: SLOT_Y, width: VW + 12, height: VH + 12, opacity: k === 2 ? open : 1}}>
          <div style={{position: 'absolute', inset: 0, border: '5px dashed #9a9384', boxSizing: 'border-box'}} />
          {k === 2 && frame >= q && frame < slots[2] ? (
            <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: blink(frame)}}><Mono size={110} color={accent}>?</Mono></div>
          ) : null}
          <div style={{position: 'absolute', left: 0, top: 0}}><Slap at={slots[k]} tilt={k === 1 ? 5 : -5}><Vignette who={who[k]} /></Slap></div>
        </div>
      ))}
    </div>
  );
};

// La tribune : trois gradins, le public en retrait ; Raymond au premier rang.
const RAY_X = 300;
const RAY_Y = 570;
const RPX = 15;
const Tribune: React.FC<{ray: Sprite; rayAt: number}> = ({ray, rayAt}) => (
  <>
    <svg width={W + 192} height={420} viewBox={`0 0 ${W + 192} 420`} style={{position: 'absolute', left: -96, top: 420}}>
      <rect x="0" y="0" width={W + 192} height="140" fill="#1e1e1e" />
      <rect x="0" y="120" width={W + 192} height="18" fill="#3a3a3a" />
      <rect x="0" y="138" width={W + 192} height="140" fill="#232323" />
      <rect x="0" y="260" width={W + 192} height="18" fill="#444" />
      <rect x="0" y="278" width={W + 192} height="142" fill="#282828" />
    </svg>
    {Array.from({length: 22}, (_, k) => {
      const row = Math.floor(k / 11);
      return (
        <div key={k} style={{position: 'absolute', left: -60 + (k % 11) * 92 + row * 46, top: 446 + row * 140, opacity: 0.5}}>
          <Pixel sprite={FANS[(k * 3 + row) % FANS.length]} px={7} />
        </div>
      );
    })}
    <Pop at={rayAt} style={{position: 'absolute', left: RAY_X, top: RAY_Y}}><Pixel sprite={ray} px={RPX} seed={2} /></Pop>
  </>
);

// Trois bulles de pensée entre la tête de Raymond et l'album (sa mémoire).
const Thought: React.FC<{at: number}> = ({at: a}) => (
  <>
    {[[RAY_X + 150, 548, 10], [RAY_X + 172, 498, 14], [RAY_X + 198, 438, 18]].map(([x, y, r], k) => (
      <Pop key={k} at={a + 3 * k} style={{position: 'absolute', left: x - r, top: y - r, width: 2 * r, height: 2 * r, borderRadius: '50%', background: '#cfcfcf'}}>
        <span />
      </Pop>
    ))}
  </>
);

const Stade: React.FC = () => {
  const frame = useCurrentFrame();
  const raymond = at('stade', 'Raymond');
  const revu = at('stade', 'revu');
  const finale = at('stade', 'finale');
  const y98 = at('stade', '98');
  const deux = at('stade', 'deux');
  const tetes = at('stade', 'têtes');
  const zidane = at('stade', 'Zidane');
  const troisieme = at('stade', 'troisième');
  const but = at('stade', 'but');
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 820}}>
        {/* Décor dès l'entrée : la tribune ; Raymond entre sur son nom et cligne des yeux. */}
        <Pop at={2} style={{position: 'absolute', inset: 0}}>
          <Tribune ray={frame >= but + 4 ? RAYMOND_GRATTE : RAYMOND} rayAt={raymond} />
        </Pop>
        <Thought at={revu} />
        {/* « la finale de 98 » : l'album s'ouvre (la page de droite se déplie) ; « deux têtes » : deux vignettes collées d'un coup. */}
        <Pop at={finale} style={{position: 'absolute', left: 0, top: 0}}>
          <Album open={ease(frame, finale + 4, finale + 16, [0, 1], 'inOut')} title={y98} slots={[Math.max(deux, tetes - 4), tetes + 4, 99999]} q={troisieme} />
        </Pop>
        <Pop at={zidane} style={{position: 'absolute', left: SLOTS[0], width: SLOTS[1] + VW + 12 - SLOTS[0], top: 312, display: 'flex', justifyContent: 'center'}}><Mono size={52} color="#111">Zidane</Mono></Pop>
        <Pop at={troisieme + 6} style={{position: 'absolute', left: W / 2, width: W / 2, top: 312, display: 'flex', justifyContent: 'center'}}><Mono size={52} color="#111">troisième but</Mono></Pop>
      </div>
    </Scene>
  );
};

// ---------- 4. Google : deux piles de pages, 85 faits retrouvés sur 100 contre 63 ----------

const CELL = 30;
const CG = 5;
const GRID = 10 * CELL + 9 * CG; // 345
const GX = [30, W - 30 - GRID];
// Une grille de 100 cases : `filled` cases grises (faits appris), dont `lit` allumées (retrouvées), dans l'ordre de lecture.
const Grid: React.FC<{filled: number; lit: number}> = ({filled, lit}) => {
  const accent = useAccent();
  return (
    <div style={{display: 'grid', gridTemplateColumns: `repeat(10, ${CELL}px)`, gap: CG}}>
      {Array.from({length: 100}, (_, k) => <div key={k} style={{width: CELL, height: CELL, boxSizing: 'border-box', border: k < filled ? 'none' : '3px solid #444', background: k < lit ? accent : k < filled ? '#5a5a5a' : 'transparent'}} />)}
    </div>
  );
};

// Une pile de pages d'encyclopédie dessinées (sans logo) : barre de titre, filet, encadré à droite, texte.
// Très lue : jaunie, cornée, de travers ; peu lue : neuve, poussiéreuse.
const Pile: React.FC<{worn?: boolean}> = ({worn}) => {
  const paper = worn ? '#e8dcc0' : '#f8f8f4';
  const ink = worn ? '#8a7a5a' : '#9a9a9a';
  return (
    <svg width={300} height={230} viewBox="0 0 300 230" style={{overflow: 'visible'}}>
      {[3, 2, 1].map((k) => (
        <rect key={k} x={20 + k * 6} y={20 + k * 7} width="260" height="190" fill={paper} stroke="#555" strokeWidth="3" transform={worn ? `rotate(${[0, 3, -4, 5][k]} 150 115)` : undefined} />
      ))}
      <g transform={worn ? 'rotate(-2 150 115)' : undefined}>
        <path d={worn ? 'M20 20 H252 L280 48 V210 H20 Z' : 'M20 20 H280 V210 H20 Z'} fill={paper} stroke="#555" strokeWidth="3" />
        {worn ? <path d="M252 20 V48 H280 Z" fill="#cdbf9f" stroke="#555" strokeWidth="2" /> : null}
        <rect x="36" y="34" width="150" height="18" fill="#222" />
        <rect x="36" y="58" width="96" height="5" fill={ink} />
        <path d="M36 72 H264" stroke="#555" strokeWidth="2" />
        <rect x="196" y="84" width="70" height="110" fill={worn ? '#dccfae' : '#ececec'} stroke="#aaa" strokeWidth="2" />
        <rect x="204" y="92" width="54" height="40" fill="#8aa0b8" />
        {[142, 156, 170, 184].map((y) => <rect key={y} x="204" y={y} width="50" height="4" fill={ink} />)}
        {[86, 100, 114, 128, 142, 156, 170, 184].map((y, k) => <rect key={y} x="36" y={y} width={[148, 130, 144, 120, 140, 136, 110, 146][k]} height="5" fill={ink} />)}
      </g>
      {worn ? null : [[52, 30], [120, 44], [230, 28], [90, 120], [170, 100], [250, 200], [60, 180]].map(([x, y], k) => <circle key={k} cx={x} cy={y} r={3.5} fill="#8a8a8a" />)}
    </svg>
  );
};

const Google: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const google = at('google', 'Google');
  const gemini = at('google', 'Gemini');
  const faits = at('google', 'faits');
  const appris = at('google', 'appris');
  const retrouvait = at('google', 'retrouvait');
  const n85 = at('google', '85');
  const tres = at('google', 'très');
  const lue = at('google', 'lue');
  const n63 = at('google', '63');
  const peu = at('google', 'peu');
  // « bien appris » : les 100 cases se remplissent de gris en cascade ; count-up calé sur « 85 » puis sur « 63 ».
  const filled = Math.round(ease(frame, appris, appris + 12, [0, 100]));
  const left = Number(countUp(frame, retrouvait, 85, n85 - retrouvait));
  const right = Number(countUp(frame, lue, 63, Math.max(8, n63 - lue)));
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 860}}>
        {/* « Google a testé » : l'étude elle-même (arXiv, février 2026), collée d'un coup ; elle part quand les grilles arrivent. */}
        {frame < faits ? (
          <div style={{position: 'absolute', left: 54, top: 100, zIndex: 20, opacity: gone(frame, faits - 6)}}>
            <Collage src="voix/tout-internet-calderon.png" w={760} ratio={654 / 1000} at={google} tilt={2} />
          </div>
        ) : null}
        <Pop at={gemini} style={{position: 'absolute', left: 0, right: 0, top: 0, display: 'flex', justifyContent: 'center'}}><Mono size={60} color="#fff">Gemini 3 Pro</Mono></Pop>
        {[0, 1].map((k) => (
          <Pop key={k} at={faits + 3 * k} style={{position: 'absolute', left: GX[k], top: 100}}>
            <Grid filled={filled} lit={k === 0 ? left : right} />
          </Pop>
        ))}
        {/* Le seul punch zoom du short, sur « 85 ». */}
        <div style={{position: 'absolute', left: GX[0], width: GRID, top: 462, display: 'flex', justifyContent: 'center', opacity: frame >= retrouvait ? 1 : 0, transform: `scale(${punch(frame, n85)})`}}>
          <Mono size={96} color={accent}>{String(left)}</Mono>
        </div>
        <div style={{position: 'absolute', left: GX[1], width: GRID, top: 462, display: 'flex', justifyContent: 'center', opacity: frame >= lue ? 1 : 0}}>
          <Mono size={96} color={accent}>{String(right)}</Mono>
        </div>
        {/* Décor dès l'entrée : les deux piles de pages Wikipédia. */}
        <Pop at={2} style={{position: 'absolute', left: GX[0] + GRID / 2 - 150, top: 556}}><Pile worn /></Pop>
        <Pop at={6} style={{position: 'absolute', left: GX[1] + GRID / 2 - 150, top: 556}}><Pile /></Pop>
        <Pop at={tres} style={{position: 'absolute', left: GX[0], width: GRID, top: 796, display: 'flex', justifyContent: 'center'}}><Mono size={52} color="#fff">très lue</Mono></Pop>
        <Pop at={peu} style={{position: 'absolute', left: GX[1], width: GRID, top: 796, display: 'flex', justifyContent: 'center'}}><Mono size={52} color="#fff">peu lue</Mono></Pop>
      </div>
    </Scene>
  );
};

// ---------- 5. Coupure : la frise défile, les ciseaux la tranchent, erreurs et canulars restent dans la pile ----------

// Scène agrandie (audit du 2026-10-22) : pages de 90 px sur la frise, ciseaux de 200 px, pile en haut, frise en bas.
const FRISE_Y = 620;
const STEP = 160;
const SPEED = 2.6;
const LW = 90;
const CUT_X = 560;
// Une page de la frise : marque 'x' (croix rouge) ou 'nez' (nez de clown).
const Leaf: React.FC<{w: number; mark?: 'x' | 'nez'; grey?: boolean}> = ({w, mark, grey}) => (
  <div style={{position: 'relative', width: w, height: w * 1.3, background: grey ? '#3a3a3a' : PAPER, border: '4px solid #555', boxSizing: 'border-box', padding: w * 0.14, display: 'flex', flexDirection: 'column', gap: w * 0.1}}>
    {[80, 60, 72].map((p, k) => <div key={k} style={{height: Math.max(4, w * 0.07), width: `${p}%`, background: grey ? '#555' : '#9a9384'}} />)}
    {mark === 'x' ? <div style={{position: 'absolute', left: -w * 0.1, top: w * 0.05}}><Cross p={1} size={Math.round(w * 1.2)} color="#FF4D4D" /></div> : null}
    {mark === 'nez' ? (
      <>
        <div style={{position: 'absolute', left: w * 0.32, top: w * 0.42, width: w * 0.36, height: w * 0.36, borderRadius: '50%', background: '#FF4D4D', border: '3px solid #111'}} />
        <svg width={w} height={w * 0.4} viewBox="0 0 100 40" style={{position: 'absolute', left: -4, top: w * 0.8}}><path d="M20 8 Q50 40 80 8" fill="none" stroke="#FF4D4D" strokeWidth="9" strokeLinecap="round" /></svg>
      </>
    ) : null}
  </div>
);

const PILE_X = 130;
const PILE_Y = 0;
const Coupure: React.FC = () => {
  const frame = useCurrentFrame();
  const date = at('coupure', 'date');
  const coupure = at('coupure', 'coupure');
  const erreurs = at('coupure', 'erreurs');
  const canulars = at('coupure', 'canulars');
  // Défilement continu (linéaire) vers la gauche : le temps avance vers la droite.
  const off = frame * SPEED;
  const cut = ease(frame, date, coupure, [0, 1]);
  const cutX = frame < coupure ? CUT_X : CUT_X - (frame - coupure) * SPEED;
  // Les deux pages marquées : posées sur la frise avant la coupure, elles remontent en arc dans la pile.
  const marked: {mark: 'x' | 'nez'; cue: number; slot: number}[] = [
    {mark: 'x', cue: erreurs, slot: 1},
    {mark: 'nez', cue: canulars, slot: 3},
  ];
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 800}}>
        {/* Décor dès l'entrée : la pile de ce que le modèle a lu. */}
        <div style={{position: 'absolute', left: PILE_X, top: PILE_Y}}>
          {[0, 1, 2, 3, 4].map((k) => (
            <div key={k} style={{position: 'absolute', left: k * 22, top: 130 - k * 28, transform: `rotate(${[-6, 4, -3, 6, -2][k]}deg)`}}>
              <Pop at={2 + 2 * k}><Leaf w={180} /></Pop>
            </div>
          ))}
        </div>
        {/* La frise et ses pages, qui défilent. */}
        <div style={{position: 'absolute', left: -96, width: W + 192, top: FRISE_Y, height: 6, background: '#777'}} />
        <div style={{position: 'absolute', left: cutX, right: -96, top: FRISE_Y, height: 6, background: '#333', opacity: frame >= coupure ? 1 : 0}} />
        {Array.from({length: 16}, (_, k) => {
          const x = 40 + k * STEP - off;
          if (x < -150 || x > W + 100) return null;
          const after = frame >= coupure && x + LW / 2 > cutX;
          const m = marked.find((q) => q.slot === k);
          const flying = m && frame >= m.cue;
          return (
            <div key={k} style={{position: 'absolute', left: x, top: FRISE_Y - LW * 1.3 - 24, opacity: flying ? 0 : 1}}>
              <div style={{position: 'absolute', left: LW / 2 - 3, top: LW * 1.3, width: 6, height: 26, background: after ? '#444' : '#9a9a9a'}} />
              <Leaf w={LW} grey={after} />
            </div>
          );
        })}
        {marked.map(({mark, cue, slot}) => {
          const x0 = 40 + slot * STEP - cue * SPEED;
          const p = ease(frame, cue + 2, cue + 18, [0, 1], 'inOut');
          const [x, y] = arc(p, [x0, FRISE_Y - LW * 1.3 - 24], mark === 'x' ? [PILE_X - 110, PILE_Y + 170] : [PILE_X + 190, PILE_Y + 40], 60);
          return frame >= cue ? (
            <div key={mark} style={{position: 'absolute', left: x, top: y, transform: `scale(${1 + 0.9 * p}) rotate(${(mark === 'x' ? -5 : 5) * p}deg)`, transformOrigin: '0 0', zIndex: 3}}>
              <Leaf w={LW} mark={mark} />
            </div>
          ) : null;
        })}
        {/* « date de coupure » : les ciseaux descendent et tranchent la frise ; tout ce qui arrive après passe en gris. */}
        <svg width={W} height={800} viewBox={`0 0 ${W} 800`} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible', opacity: frame >= date ? 1 : 0}}>
          <path d={`M${cutX + 3} ${FRISE_Y - 180} V${FRISE_Y - 180 + 240 * cut}`} stroke="#FF4D4D" strokeWidth="7" strokeDasharray="18 12" />
        </svg>
        <div style={{position: 'absolute', left: cutX - 97, top: FRISE_Y - 400 + 240 * cut, opacity: frame >= date ? 1 - ease(frame, coupure + 8, coupure + 16) : 0, transform: 'rotate(180deg)', zIndex: 4}}><Scissors size={200} /></div>
        <Pop at={coupure} style={{position: 'absolute', left: cutX - 130, width: 260, top: FRISE_Y + 70, display: 'flex', justifyContent: 'center'}}><Mono size={56} color="#fff">coupure</Mono></Pop>
      </div>
    </Scene>
  );
};

// ---------- 6. Chute : Raymond ressort le résumé du match, la troisième vignette se colle enfin ----------

// Une page de journal dessinée, sans titre réel : un bandeau, une photo de pelouse, des colonnes.
const Journal: React.FC<{w: number}> = ({w}) => (
  <svg width={w} height={w * 1.25} viewBox="0 0 160 200">
    <rect x="3" y="3" width="154" height="194" fill="#e8dcc0" stroke="#555" strokeWidth="4" />
    <rect x="14" y="14" width="132" height="20" fill="#2a2a2a" />
    <rect x="14" y="44" width="80" height="60" fill="#3f8a4f" />
    <path d="M14 74 H94 M54 44 V104" stroke="#e8e8e8" strokeWidth="2" />
    {[44, 58, 72, 86, 100].map((y) => <path key={y} d={`M102 ${y} H146`} stroke="#8a7a5a" strokeWidth="5" />)}
    {[118, 132, 146, 160, 174].map((y) => <path key={y} d={`M14 ${y} H${y % 28 ? 146 : 120}`} stroke="#8a7a5a" strokeWidth="5" />)}
  </svg>
);

const Chute: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const memoire = at('chute', 'mémoire');
  const colle = at('chute', 'colle');
  const resume = at('chute', 'résumé');
  const match = at('chute', 'match');
  const emmanuel = at('chute', 'Emmanuel');
  const petit = at('chute', 'Petit');
  const ray = frame >= petit + 2 ? RAYMOND_JOIE : frame >= colle ? RAYMOND_TEND : RAYMOND;
  // Le résumé sort de la poche dans la main tendue, à droite de sa tête (jamais devant son visage), puis vole en arc vers la case vide.
  const hand: [number, number] = [RAY_X + 15 * RPX - 10, RAY_Y + 7 * RPX];
  const p = ease(frame, resume, match + 6, [0, 1], 'inOut');
  const [jx, jy] = arc(p, hand, [SLOTS[2] + VW + 20, SLOT_Y + 290], 90);
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 820}}>
        {/* Décor dès l'entrée : la tribune, Raymond, l'album ouvert avec ses deux vignettes et la case vide qui clignote. */}
        <Pop at={2} style={{position: 'absolute', inset: 0}}><Tribune ray={ray} rayAt={0} /></Pop>
        <Pop at={2} style={{position: 'absolute', left: 0, top: 0}}>
          <Album open={1} title={0} slots={[-100, -100, emmanuel]} q={0} />
        </Pop>
        <Pop at={4} style={{position: 'absolute', left: SLOTS[0], width: SLOTS[1] + VW + 12 - SLOTS[0], top: 312, display: 'flex', justifyContent: 'center'}}><Mono size={52} color="#111">Zidane</Mono></Pop>
        {/* « la mémoire du modèle » : un cadre en pointillés se dessine autour de l'album (draw-on). */}
        <svg width={W} height={AH} viewBox={`0 0 ${W} ${AH}`} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
          <rect x={-14} y={-14} width={W + 28} height={AH + 28} fill="none" stroke={accent} strokeWidth="6" strokeDasharray={`${2 * (W + AH + 56) * ease(frame, memoire, memoire + 20)} 9999`} opacity={frame >= emmanuel ? 0 : 1} />
        </svg>
        {/* « colle-lui la bonne page » : le résumé du match sort, Raymond le tend vers l'album. */}
        {frame >= colle && frame < emmanuel + 6 ? (
          <div style={{position: 'absolute', left: jx - 10, top: jy - 175, opacity: gone(frame, emmanuel), transform: `rotate(${-8 + 8 * p}deg)`}}>
            <Pop at={colle}><Journal w={140} /></Pop>
          </div>
        ) : null}
        <Pop at={petit} style={{position: 'absolute', left: W / 2, width: W / 2, top: 316, display: 'flex', justifyContent: 'center'}}><Mono size={48} color="#111">Emmanuel Petit</Mono></Pop>
      </div>
    </Scene>
  );
};

// ---------- Montage ----------

const SCENES: Record<string, React.FC> = {hook: Hook, vrai: Vrai, crawl: Crawl, stade: Stade, google: Google, coupure: Coupure, chute: Chute};

export const MytheInternetVoix: React.FC = () => <V.Montage scenes={SCENES} accent={AC} />;

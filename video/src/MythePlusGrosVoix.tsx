// Short Mythe « Plus le modèle est gros, plus il est intelligent » (YouTube / TikTok / Instagram), épisode 20,
// voix off PAL - FR, préparé le 2026-10-22 sur un calage provisoire (sans voix) : tout est ancré sur des mots (at).
// Fiche mythe-plus-gros-plus-intelligent de lexique/terms.js ; sources dans voix/plus-gros.script.json : Hoffmann et al.
// (DeepMind, 29 mars 2022 : Chinchilla 70B bat Gopher 280B, même budget de calcul, quatre fois plus de données) ;
// Vingt mille lieues sous les mers compté en o200k_base (238 916 tokens) : 17,92 dollars pour GPT-4.5 (fenêtre de
// 128 000 tokens, donc deux moitiés), 48 centimes pour GPT-4.1 (fenêtre d'un million) ; OpenAI, 14 avril 2025 (GPT-4.5
// retiré de l'API le 14 juillet 2025, lancé le 27 février) ; MoE et modèles de raisonnement.
// Hook sans auteur (citation provisoire, cf. `todo` du script) : la phrase du mythe à la machine et le tampon FAUX ;
// seule la citation est masquée (`quoted`), la suite du hook est sous-titrée.
// Collages réels (crédits dans public/voix/CREDITS-semaine-27-10.md et `credits` du script) : la page de titre Hetzel
// (plus-gros-verne.jpg, domaine public), l'article Chinchilla sur arXiv et l'annonce GPT-4.1 d'OpenAI (captures).
// Fil : l'ép. 19 confiait le tri à un classifieur ; faut-il pour autant le plus gros modèle du catalogue ?
// L'écran suit la voix et Le mouvement (univers.md) : chaque élément entre sur le mot qui le nomme ; effets nommés en
// commentaire ; un seul punch zoom (sur 17,92 dollars). Scène propre à ce short : le livre coupé en deux pour la fenêtre.
// Écart au storyboard : retrait, l'étiquette GPT-4.1 se pose sur son propre point (avril 2025, à l'échelle) plutôt
// que sur celui de GPT-4.5 (février), pour que la frise reste juste ; gpt41, la capture d'OpenAI tient lieu d'étiquette.
import React from 'react';
import {Img, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Big, Check, Draw, Mono, Pop, Scene, Scissors, W, arc, countUp, ease, punch, typed, useAccent, withAlpha} from './kit';
import {LABEL, makeVoix} from './voix/VoixShort';
import {Pixel, Sprite} from './voix/Pixel';
import {Doc, Stamp, pixelShadow} from './voix/Parts';
import ALIGN from './voix/plus-gros.align.json';
import SCRIPT from './voix/plus-gros.script.json';

const AC = '#FF7A7A'; // catégorie Mythes vs réalité
const V = makeVoix(ALIGN, SCRIPT, 'voix/prediction-music.mp3');
const {at} = V;
export const MYTHEPLUSGROSVOIX_DURATION = V.duration;

const gone = (frame: number, until: number) => ease(frame, until, until + 6, [1, 0], 'inOut');
const from2 = (f: number) => Math.max(2, f);
const rnd = (k: number) => {
  const x = Math.sin(k * 12.9898 + 7.233) * 43758.5453;
  return x - Math.floor(x);
};
// Un mot dit en toute fin de scène : son élément entre assez tôt pour être vu avant la coupe (le calage bougera).
const useLate = () => {
  const {durationInFrames} = useVideoConfig();
  return (f: number, room = 10) => Math.min(f, durationInFrames - room);
};
const GOLD = '#FFC24A';

// ---------- Pixel art propre à ce short ----------

// La coupe du vainqueur.
const COUPE: Sprite = {
  rows: [
    'YY.YYYYYY.YY',
    'Y..YYYYYY..Y',
    'Y..YYYYYY..Y',
    '.Y.YYYYYY.Y.',
    '..YYYYYYYY..',
    '....YYYY....',
    '.....YY.....',
    '.....YY.....',
    '...BBBBBB...',
    '...BBBBBB...',
  ],
  palette: {Y: GOLD, B: '#8a5a35'},
};

// Le rayonnage de la librairie : des planches et des dos de livres (pixel art en SVG, une unité = `u` px).
const BOOK_COLORS = ['#7a2e2e', '#2e4a7a', '#3d6b45', '#8a6a2e', '#5a3a6b', '#6b6b6b', '#a0522d', '#2e6b6b'];
const Shelves: React.FC<{w: number; h: number; u?: number; rows?: number}> = ({w, h, u = 12, rows = 5}) => {
  const cols = Math.ceil(w / u);
  const rowH = Math.floor(h / u / rows);
  const rects: React.ReactNode[] = [];
  for (let r = 0; r < rows; r++) {
    const y0 = r * rowH;
    let x = 0;
    let k = r * 97;
    while (x < cols) {
      const bw = 2 + Math.floor(rnd(k) * 3);
      const bh = rowH - 2 - Math.floor(rnd(k + 1) * 4);
      rects.push(<rect key={`b${r}-${x}`} x={x} y={y0 + rowH - 1 - bh} width={bw - 0.2} height={bh} fill={BOOK_COLORS[Math.floor(rnd(k + 2) * BOOK_COLORS.length)]} />);
      rects.push(<rect key={`l${r}-${x}`} x={x} y={y0 + rowH - 1 - bh + 2} width={bw - 0.2} height={0.6} fill="rgba(255,255,255,0.35)" />);
      x += bw;
      k += 3;
    }
    rects.push(<rect key={`s${r}`} x={0} y={y0 + rowH - 1} width={cols} height={1} fill="#6e4528" />);
  }
  return (
    <svg width={w} height={h} viewBox={`0 0 ${cols} ${rows * rowH}`} preserveAspectRatio="none" shapeRendering="crispEdges">
      {rects}
    </svg>
  );
};

// ---------- Pièces dessinées ----------

// Un bout de scotch posé de travers.
const Tape: React.FC<{style: React.CSSProperties}> = ({style}) => (
  <div style={{position: 'absolute', width: 70, height: 24, background: 'rgba(239,233,220,0.8)', ...style}} />
);

// Collage (univers.md) : une capture recadrée (crop en pixels de l'image source), bordure blanche, ombre pixel, scotch.
type Crop = {src: string; iw: number; x: number; y: number; cw: number; ch: number};
const Collage: React.FC<{c: Crop; w: number; children?: React.ReactNode}> = ({c, w, children}) => {
  const k = w / c.cw;
  return (
    <div style={{position: 'relative', width: w, height: c.ch * k, border: '4px solid #fff', boxShadow: pixelShadow('#333'), boxSizing: 'content-box'}}>
      <div style={{position: 'absolute', inset: 0, overflow: 'hidden'}}>
        <Img src={staticFile(c.src)} style={{position: 'absolute', left: -c.x * k, top: -c.y * k, width: c.iw * k}} />
        {children}
      </div>
      <Tape style={{left: -24, top: -8, transform: 'rotate(-30deg)'}} />
      <Tape style={{right: -24, bottom: -8, transform: 'rotate(-30deg)'}} />
    </div>
  );
};
const CHINCHILLA: Crop = {src: 'voix/plus-gros-chinchilla.png', iw: 1000, x: 16, y: 104, cw: 790, ch: 76};
const GPT41: Crop = {src: 'voix/plus-gros-gpt41.png', iw: 1000, x: 150, y: 120, cw: 700, ch: 210};

// La page de titre Hetzel (scan Commons, 407 × 600), collée au scotch ; `half` n'en montre qu'une moitié.
const COVER_W = 400;
const COVER_H = Math.round((600 * COVER_W) / 407);
const Cover: React.FC<{half?: 'left' | 'right'}> = ({half}) => {
  const clip = half === 'left' ? 'inset(0 50% 0 0)' : half === 'right' ? 'inset(0 0 0 50%)' : 'none';
  return (
    <div style={{position: 'absolute', left: 0, top: 0, width: COVER_W, height: COVER_H}}>
      <div style={{position: 'absolute', inset: 0, clipPath: clip, boxShadow: half ? 'none' : pixelShadow('#333')}}>
        <Img src={staticFile('voix/plus-gros-verne.jpg')} style={{width: COVER_W, height: COVER_H, display: 'block', boxSizing: 'border-box', border: '4px solid #fff'}} />
      </div>
      {half !== 'right' ? <Tape style={{left: -22, top: -6, transform: 'rotate(-32deg)'}} /> : null}
      {half !== 'left' ? <Tape style={{right: -22, bottom: -6, transform: 'rotate(-32deg)'}} /> : null}
    </div>
  );
};

// Étiquette accrochée (nom d'un modèle) : un rectangle à œillet, texte mono.
const Tag: React.FC<{children: React.ReactNode; color?: string}> = ({children, color = '#fff'}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: 14, background: '#141414', border: `5px solid ${color}`, borderRadius: 14, padding: '10px 22px 10px 16px'}}>
    <div style={{width: 18, height: 18, borderRadius: 9, border: `4px solid ${color}`}} />
    <Mono size={52} color={color}>{children}</Mono>
  </div>
);

// Étiquette de prix de librairie : jaune, coins coupés ; `strike` la barre (elle passe en retrait).
const Price: React.FC<{big: string; small: string; strike?: number}> = ({big, small, strike = 0}) => (
  <div style={{position: 'relative', background: GOLD, padding: '12px 26px', display: 'flex', flexDirection: 'column', alignItems: 'center', clipPath: 'polygon(14px 0, calc(100% - 14px) 0, 100% 14px, 100% calc(100% - 14px), calc(100% - 14px) 100%, 14px 100%, 0 calc(100% - 14px), 0 14px)'}}>
    <Mono size={72} color="#111">{big}</Mono>
    <Mono size={48} color="#111">{small}</Mono>
    <div style={{position: 'absolute', left: 10, right: 10, top: '50%', height: 10, background: '#c0392b', transform: `scaleX(${strike}) rotate(-12deg)`, transformOrigin: 'left center'}} />
  </div>
);

// Le modèle à potards : la boîte du modèle (style de Parts.Model), une grille de potards sur sa face.
// cols peut être fractionnaire pendant qu'il grossit (bar grow sur sa largeur) ; show(k) = apparition du potard k.
const CELL = 90;
const Knob: React.FC<{d: number; k: number; lit?: number; off?: boolean}> = ({d, k, lit = 0, off}) => {
  const accent = useAccent();
  const ang = -130 + rnd(k + 11) * 260;
  return (
    <svg width={d} height={d} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="44" fill={lit > 0.5 ? accent : off ? '#333' : '#5a5a5a'} stroke={lit > 0.5 ? '#fff' : off ? '#444' : '#7a7a7a'} strokeWidth="6" />
      <line x1="50" y1="50" x2={50 + 34 * Math.sin((ang * Math.PI) / 180)} y2={50 - 34 * Math.cos((ang * Math.PI) / 180)} stroke={off ? '#555' : '#fff'} strokeWidth="9" strokeLinecap="round" />
    </svg>
  );
};
const KnobModel: React.FC<{cols: number; rows?: number; show: (k: number) => number; lit?: (k: number) => number; off?: boolean}> = ({cols, rows = 3, show, lit, off}) => {
  const n = Math.ceil(cols);
  return (
    <div style={{position: 'relative', width: cols * CELL + 48, height: rows * CELL + 48, background: '#2a2a2a', border: '8px solid #fff', boxShadow: pixelShadow('#222'), boxSizing: 'border-box', overflow: 'hidden'}}>
      {Array.from({length: n * rows}, (_, i) => {
        const c = i % n;
        const r = Math.floor(i / n);
        const k = r * 8 + c; // index stable quand le modèle s'élargit
        const p = show(k);
        return (
          <div key={k} style={{position: 'absolute', left: 16 + c * CELL + 8, top: 16 + r * CELL + 8, opacity: p > 0 ? 1 : 0, transform: `scale(${0.6 + 0.4 * p})`}}>
            <Knob d={CELL - 16} k={k} lit={lit ? lit(k) : 0} off={off && !(lit && lit(k) > 0.5)} />
          </div>
        );
      })}
    </div>
  );
};

// Pile de pièces (le budget de calcul).
const Coins: React.FC<{n: number; w?: number}> = ({n, w = 120}) => (
  <svg width={w} height={n * 16 + 30} viewBox={`0 0 ${w} ${n * 16 + 30}`}>
    {Array.from({length: n}, (_, k) => {
      const y = n * 16 + 12 - k * 16;
      return (
        <g key={k}>
          <rect x={6} y={y - 8} width={w - 12} height={16} fill="#c9921f" />
          <ellipse cx={w / 2} cy={y - 8} rx={w / 2 - 6} ry={10} fill={GOLD} stroke="#8a6416" strokeWidth={3} />
        </g>
      );
    })}
  </svg>
);

// Pile de pages (les textes lus) : des feuilles empilées, hauteur h.
const Pages: React.FC<{h: number; w?: number}> = ({h, w = 140}) => (
  <div style={{width: w, height: h, background: 'repeating-linear-gradient(#efe9dc 0 10px, #9a9384 10px 13px)', border: '4px solid #fff', boxSizing: 'border-box', boxShadow: pixelShadow('#333')}} />
);

// Une boucle (entraînement) : deux flèches en cercle.
const Loop: React.FC<{size: number; p: number}> = ({size, p}) => {
  const accent = useAccent();
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{transform: `rotate(${p * 200}deg)`}}>
      <Draw d="M50 14 A36 36 0 1 1 15 44" p={p} width={10} len={200} color={accent} />
      <path d="M50 2 L66 14 L50 26 Z" fill={accent} opacity={p} />
    </svg>
  );
};

// ---------- 0. Hook : la phrase du mythe à la machine, sur un rayonnage ; tampon FAUX sur « intelligent » ----------

const QUOTE = ['« Plus le modèle', 'est gros, plus il', 'est intelligent »'];
const QLEN = QUOTE.reduce((s, l) => s + l.length, 0);

const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const intelligent = at('hook', 'intelligent');
  const fin = at('hook', '»');
  const taille = at('hook', 'taille');
  const lu = at('hook', 'lu,');
  const entraine = at('hook', 'entraîné');
  // Typewriter calé sur la citation dite : tout est écrit au « » ».
  const cps = (QLEN / Math.max(20, fin - 2)) * 30;
  const n = typed(frame, 2, 'x'.repeat(QLEN), cps).length;
  let left = n;
  return (
    <>
      {/* Décor posé dès la première image : le rayonnage de la librairie, en retrait derrière le texte. */}
      <div style={{position: 'absolute', left: 0, top: 120, opacity: 0.32}}>
        <Shelves w={1080} h={1500} rows={6} />
      </div>
      <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 45% at 50% 50%, rgba(0,0,0,0.75), rgba(0,0,0,0.2))'}} />
      {/* Le haut s'assombrit : les sous-titres se lisent sur un fond calme. */}
      <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 640, background: 'linear-gradient(rgba(0,0,0,0.9) 70%, transparent)'}} />
      <Scene gap={170}>
        <div style={{position: 'relative', display: 'flex', flexDirection: 'column', gap: 6}}>
          {/* Tampon : chute + squash à l'impact, sur « intelligent », sous la citation (le haut est la zone des sous-titres) ;
              il reste jusqu'à la fin du hook (couverture). */}
          <Stamp at={intelligent + 10} size={96} tilt={-10} bg="rgba(0,0,0,0.6)" style={{right: 10, bottom: -160, zIndex: 2}}>FAUX</Stamp>
          {QUOTE.map((l, k) => {
            const vis = Math.max(0, Math.min(l.length, left));
            left -= l.length;
            return (
              <Big key={k} size={104}>
                <span>{l.slice(0, vis)}</span>
                <span style={{opacity: 0}}>{l.slice(vis)}</span>
              </Big>
            );
          })}
        </div>
        {/* Ce que la voix dit ensuite (sous-titré) : la taille, plus ce qu'il a lu, plus son entraînement. */}
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 34}}>
          <Pop at={taille}>
            <div style={{width: 190, height: 120, background: '#2a2a2a', border: '6px solid #fff', boxShadow: pixelShadow('#222'), display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, padding: 14, boxSizing: 'border-box'}}>
              {Array.from({length: 8}, (_, k) => <div key={k} style={{background: '#5a5a5a'}} />)}
            </div>
          </Pop>
          <Pop at={lu}><Mono size={72} color={LABEL}>+</Mono></Pop>
          <Pop at={lu}><Pages h={120} w={110} /></Pop>
          <Pop at={entraine}><Mono size={72} color={LABEL}>+</Mono></Pop>
          <Pop at={entraine}><Loop size={120} p={ease(frame, entraine, entraine + 16)} /></Pop>
        </div>
      </Scene>
    </>
  );
};

// ---------- 1. Taille : le modèle et ses potards ; des milliards ; on en ajoute ----------

const Taille: React.FC = () => {
  const frame = useCurrentFrame();
  const late = useLate();
  const param = at('taille', 'paramètres');
  const milliards = at('taille', 'milliards');
  const longtemps = at('taille', 'longtemps');
  const ajouter = late(at('taille', 'ajouter'), 18);
  // Bar grow sur la largeur : deux crans, sur « ajouter ».
  const cols = 4 + ease(frame, ajouter, ajouter + 8, [0, 2]) + ease(frame, ajouter + 10, ajouter + 18, [0, 2]);
  const show = (k: number) => {
    const c = k % 8;
    const r = Math.floor(k / 8);
    if (c < 4) return ease(frame, param + 2 * (r * 4 + c), param + 2 * (r * 4 + c) + 6); // cascade, ordre de lecture
    const a = c < 6 ? ajouter + 4 : ajouter + 14;
    return ease(frame, a + r * 2, a + r * 2 + 5);
  };
  // Le champ de petits potards qui déborde du cadre sur « milliards » (cascade depuis le modèle), puis s'efface.
  const field: React.ReactNode[] = [];
  const out = frame < longtemps + 6 ? gone(frame, longtemps) : 0;
  if (frame >= milliards && out > 0) {
    for (let y = -40; y < 680; y += 46) {
      for (let x = -120; x < 1010; x += 46) {
        const dx = x + 23 - W / 2;
        const dy = y + 23 - 300;
        const d = Math.sqrt(dx * dx + dy * dy);
        const a = milliards + d / 28;
        if (frame < a) continue;
        field.push(
          <div key={`${x}-${y}`} style={{position: 'absolute', left: x, top: y, opacity: ease(frame, a, a + 4) * out}}>
            <Knob d={38} k={x * 7 + y} />
          </div>,
        );
      }
    }
  }
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 600}}>
        <div style={{position: 'absolute', inset: 0}}>{field}</div>
        {/* Le modèle, posé dès l'entrée, au centre ; il garde sa place quand il s'élargit. */}
        <Pop at={2} style={{position: 'absolute', left: (W - (cols * CELL + 48)) / 2, top: 140}}>
          <KnobModel cols={cols} show={show} />
        </Pop>
        {/* Libellé décalé de 5 images. */}
        <Pop at={param + 5} style={{position: 'absolute', left: 0, right: 0, top: 500, display: 'flex', justifyContent: 'center', opacity: frame >= milliards ? (frame < longtemps ? 0 : 1) : 1}}>
          <Mono size={56} color="#fff">paramètres</Mono>
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 2. Chinchilla : quatre fois plus petit, même calcul, quatre fois plus de textes, et il gagne ----------

const Block: React.FC<{w: number; h: number; solid: number; dim?: number}> = ({w, h, solid, dim = 1}) => (
  <div style={{position: 'relative', width: w, height: h, boxSizing: 'border-box', border: `6px ${solid > 0.5 ? 'solid #fff' : 'dashed #6a6a6a'}`, background: withAlpha('#2a2a2a', solid), boxShadow: solid > 0.5 ? pixelShadow('#222') : 'none', opacity: dim, display: 'grid', gridTemplateColumns: `repeat(${Math.round(w / 50)}, 1fr)`, gap: 8, padding: 14}}>
    {Array.from({length: Math.round(w / 50) * Math.max(1, Math.round((h - 28) / 58))}, (_, k) => <div key={k} style={{background: '#5a5a5a', opacity: solid}} />)}
  </div>
);

const Chinchilla: React.FC = () => {
  const frame = useCurrentFrame();
  const late = useLate();
  const deepmind = at('chinchilla', 'DeepMind');
  const chin = at('chinchilla', 'Chinchilla');
  const gopher = at('chinchilla', 'Gopher');
  const budget = at('chinchilla', 'budget');
  const quatre = at('chinchilla', 'quatre', 1);
  const textes = at('chinchilla', 'textes');
  const battu = late(at('chinchilla', 'battu'), 16);
  const grow = ease(frame, quatre + 4, textes + 6); // bar grow, calé pour finir sur « textes »
  const coins = frame < quatre ? 1 : gone(frame, quatre); // les pièces partent quand les pages arrivent
  const fly = ease(frame, battu, battu + 12, [0, 1], 'inOut');
  const GX = 365; // centre de la colonne Gopher
  const CX = 724; // centre de la colonne Chinchilla
  const [tx, ty] = arc(fly, [W / 2 - 60, -40], [CX - 60, 205], 80);
  const pile = (cx: number, el: React.ReactNode, w: number) => <div style={{position: 'absolute', left: cx - w / 2, bottom: 0}}>{el}</div>;
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 700}}>
        {/* Collage : l'article de DeepMind sur arXiv, sur « DeepMind » ; il part quand Gopher est nommé. */}
        <div style={{position: 'absolute', left: 0, top: 0, opacity: frame < gopher + 10 ? 1 : gone(frame, gopher + 10)}}>
          <Pop at={deepmind}><Collage c={CHINCHILLA} w={W - 8} /></Pop>
        </div>
        {/* Décor : les deux modèles en silhouette (aire 4 pour 1) ; ils se remplissent sur leur nom, libellé 5 images après. */}
        <Pop at={2} style={{position: 'absolute', left: GX - 160, top: 200}}>
          <Block w={320} h={240} solid={ease(frame, gopher, gopher + 6)} dim={frame >= battu + 6 ? 0.45 : 1} />
        </Pop>
        <Pop at={2} style={{position: 'absolute', left: CX - 80, top: 320}}>
          <Block w={160} h={120} solid={ease(frame, chin, chin + 6)} />
        </Pop>
        <Pop at={gopher + 5} style={{position: 'absolute', left: GX - 180, width: 360, top: 456, display: 'flex', justifyContent: 'center'}}>
          <Mono size={56} color="#fff">Gopher</Mono>
        </Pop>
        <Pop at={chin + 5} style={{position: 'absolute', left: CX - 164, width: 328, top: 456, display: 'flex', justifyContent: 'center'}}>
          <Mono size={56} color="#fff">Chinchilla</Mono>
        </Pop>
        {/* La rangée du bas, un seul libellé à gauche : d'abord la même pile de pièces (« budget de calcul »),
            puis les pièces partent et les pages poussent (bar grow), quatre fois plus haut sous Chinchilla. */}
        <div style={{position: 'absolute', left: 0, right: 0, top: 540, height: 160}}>
          <div style={{position: 'absolute', left: 0, top: 70, opacity: coins}}>
            <Pop at={budget + 5}><Mono size={52} color={LABEL}>calcul</Mono></Pop>
          </div>
          <Pop at={textes + 5} style={{position: 'absolute', left: 0, top: 70}}><Mono size={52} color={LABEL}>textes</Mono></Pop>
          <div style={{position: 'absolute', inset: 0, opacity: coins}}>
            {pile(GX, <Pop at={budget}><Coins n={5} /></Pop>, 120)}
            {pile(CX, <Pop at={budget + 3}><Coins n={5} /></Pop>, 120)}
          </div>
          <div style={{position: 'absolute', inset: 0, opacity: frame >= quatre + 4 ? 1 : 0}}>
            {pile(GX, <Pages h={Math.max(4, 40 * grow)} />, 140)}
            {pile(CX, <Pages h={Math.max(4, 160 * grow)} />, 140)}
          </div>
        </div>
        {/* La coupe vole en arc au-dessus de Chinchilla sur « a battu ». */}
        <div style={{position: 'absolute', left: tx, top: ty, opacity: frame >= battu ? 1 : 0}}>
          <Pixel sprite={COUPE} px={10} />
        </div>
      </div>
    </Scene>
  );
};

// ---------- 3. Verne : la page de titre sur la table du libraire, coupée en deux pour la fenêtre de GPT-4.5 ----------

const Table: React.FC = () => (
  <div style={{position: 'absolute', left: -96, right: -96, top: 625, height: 150, background: 'repeating-linear-gradient(90deg, #6e4528 0 180px, #5e3a22 180px 186px)', borderTop: '10px solid #8a5a35'}} />
);

const Verne: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const late = useLate();
  const gpt = at('verne', 'GPT-4.5');
  const couper = at('verne', 'couper');
  const fenetre = at('verne', 'fenêtre');
  const prix = late(at('verne', '17,92'), 22);
  const kb = 1 + 0.05 * (frame / durationInFrames); // Ken Burns de 5 % sur toute la scène
  // Ciseaux : passent de haut en bas sur la ligne de coupe ; les moitiés s'écartent ensuite, droites.
  const cut = ease(frame, couper, couper + 12, [0, 1], 'inOut');
  const split = ease(frame, couper + 10, couper + 20);
  const drop = ease(frame, fenetre, fenetre + 12);
  const X = (W - COVER_W) / 2;
  const TOP = 30;
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 760}}>
        <Table />
        {/* La page de titre collée sur la table, posée dès l'entrée, avec un Ken Burns de 5 %. */}
        <Pop at={2} style={{position: 'absolute', left: X, top: TOP, width: COVER_W, height: COVER_H, transform: `scale(${kb})`}}>
          <div style={{position: 'absolute', left: -60 * split, top: 0}}><Cover half="left" /></div>
          <div style={{position: 'absolute', left: 60 * split, top: 0}}><Cover half="right" /></div>
        </Pop>
        {/* Les ciseaux, sur « couper ». */}
        <div style={{position: 'absolute', left: X + COVER_W / 2 - 45, top: -40 + 660 * cut, opacity: frame >= couper && cut < 1 ? 1 : 0, transform: 'rotate(180deg)'}}>
          <Scissors size={90} />
        </div>
        {/* La fenêtre descend sur « fenêtre » : elle ne contient qu'une moitié. */}
        <div style={{position: 'absolute', left: X - 60 - 16, top: TOP - 16 - 120 + 120 * drop, width: COVER_W / 2 + 32, height: COVER_H + 32, border: `8px solid ${AC}`, boxSizing: 'border-box', opacity: ease(frame, fenetre, fenetre + 6)}} />
        {/* Sur la table : le libellé de la fenêtre sous sa moitié, l'étiquette GPT-4.5 sous l'autre. */}
        <Pop at={fenetre + 5} style={{position: 'absolute', left: X - 60 - 60, width: COVER_W / 2 + 120, top: 668, display: 'flex', justifyContent: 'center'}}>
          <Mono size={52} color="#fff">fenêtre</Mono>
        </Pop>
        <Pop at={gpt} style={{position: 'absolute', left: X + COVER_W / 2 + 40, top: 655}}><Tag>GPT-4.5</Tag></Pop>
        {/* Étiquette de prix collée sur la moitié droite : count-up jusqu'à 17,92 puis punch zoom (le seul du short). */}
        <Pop at={prix} style={{position: 'absolute', left: X + COVER_W / 2 + 64, top: 300, transform: `rotate(6deg) scale(${punch(frame, prix + 16)})`}}>
          <Price big={countUp(frame, prix, 17.92, 16, 2)} small="dollars" />
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 4. GPT-4.1 : le livre entier tient dans la fenêtre, 48 centimes ----------

const Gpt41: React.FC = () => {
  const frame = useCurrentFrame();
  const late = useLate();
  const gpt = at('gpt41', 'GPT-4.1');
  const n48 = late(at('gpt41', '48'), 12);
  // Wipe : la page de titre entière glisse de la droite dans le grand cadre.
  const slide = ease(frame, 2, 18, [700, 0], 'inOut');
  const S = 0.68;
  const FW = 520;
  const FH = 480;
  const FX = (W - FW) / 2;
  const FY = 210;
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: FY + FH}}>
        {/* Collage : l'annonce d'OpenAI, sur « GPT-4.1 » (elle nomme le cadre). */}
        <Pop at={gpt} style={{position: 'absolute', left: (W - 608) / 2, top: 0}}><Collage c={GPT41} w={600} /></Pop>
        {/* Le grand cadre (fenêtre d'un million de tokens), posé dès l'entrée. */}
        <Pop at={2} style={{position: 'absolute', left: FX, top: FY, width: FW, height: FH, border: `8px solid ${AC}`, boxSizing: 'border-box'}} />
        <div style={{position: 'absolute', left: FX + (FW - COVER_W * S) / 2 + slide, top: FY + (FH - COVER_H * S) / 2, width: COVER_W * S, height: COVER_H * S}}>
          <div style={{transform: `scale(${S})`, transformOrigin: 'top left'}}><Cover /></div>
          {/* L'étiquette de 17,92 dollars, reprise de la scène d'avant, part sur « 48 » ; « 48 centimes » prend son coin. */}
          <div style={{position: 'absolute', right: -90, bottom: 30, transform: 'rotate(6deg)', opacity: frame < n48 ? 1 : gone(frame, n48)}}>
            <Price big="17,92" small="dollars" />
          </div>
          <Pop at={n48 + 4} style={{position: 'absolute', right: -90, bottom: 30, transform: 'rotate(-5deg)'}}>
            <Price big="48" small="centimes" />
          </Pop>
        </div>
      </div>
    </Scene>
  );
};

// ---------- 5. Retrait : la frise de GPT-4.5, de février à juillet 2025 ----------

// Échelle : 27 février (x = 60), 14 avril (GPT-4.1), 14 juillet 2025 (x = 828).
const XA = 60;
const XB = 828;
const XAPR = XA + ((XB - XA) * 46) / 137;
const LINE_Y = 330;

const Retrait: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const juillet = at('retrait', 'juillet');
  const retirait = at('retrait', 'retirait');
  const cinq = at('retrait', 'cinq');
  const gpt41 = at('retrait', 'GPT-4.1');
  const draw = ease(frame, 2, 30); // draw-on de la frise, de gauche à droite
  // Anticipation : l'étiquette s'enfonce un peu, puis part en arc hors cadre.
  const sink = ease(frame, retirait, retirait + 4) - ease(frame, retirait + 4, retirait + 7);
  const fly = ease(frame, retirait + 5, retirait + 20, [0, 1], 'inOut');
  const [fx, fy] = arc(fly, [0, 0], [-700, -500], 120);
  const hi = ease(frame, cinq, cinq + 14);
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 520}}>
        <svg width={W} height={520} viewBox={`0 0 ${W} 520`} style={{position: 'absolute', left: 0, top: 0}}>
          <Draw d={`M20 ${LINE_Y} H${W - 20}`} p={draw} width={8} len={W} color="#fff" />
          {/* L'intervalle de cinq mois se surligne (highlight) sur « cinq mois ». */}
          <line x1={XA} y1={LINE_Y} x2={XA + (XB - XA) * hi} y2={LINE_Y} stroke={accent} strokeWidth={22} strokeLinecap="round" opacity={frame >= cinq ? 1 : 0} />
          <circle cx={XA} cy={LINE_Y} r={20} fill="#fff" opacity={draw > 0.05 ? 1 : 0} />
          <circle cx={XB} cy={LINE_Y} r={20} fill="#fff" opacity={frame >= juillet ? 1 : 0} />
          <circle cx={XAPR} cy={LINE_Y} r={16} fill={accent} opacity={frame >= gpt41 ? 1 : 0} />
        </svg>
        {/* L'étiquette GPT-4.5, posée dès l'entrée sur son point (lancement), décollée sur « retirait ». */}
        <div style={{position: 'absolute', left: XA - 40, top: 150, transform: `translate(${fx}px, ${fy + 12 * sink}px) rotate(${-25 * fly}deg)`, opacity: frame < retirait + 20 ? 1 : 0}}>
          <Pop at={2}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
              <Tag>GPT-4.5</Tag>
              <div style={{width: 6, height: 70, background: '#fff', marginLeft: 34}} />
            </div>
          </Pop>
        </div>
        {/* Le second point, au bout, sur « juillet 2025 ». */}
        <Pop at={juillet + 4} style={{position: 'absolute', right: 0, top: LINE_Y + 40}}><Mono size={52} color="#fff">juillet 2025</Mono></Pop>
        <Pop at={cinq + 5} style={{position: 'absolute', left: XA - 20, top: LINE_Y + 40}}>
          <Mono size={56} color={accent}>cinq mois</Mono>
        </Pop>
        {/* GPT-4.1 prend la place laissée libre, sur son propre point (avril). */}
        <Pop at={gpt41} style={{position: 'absolute', left: XAPR - 37, top: 150, display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
          <Tag color={accent}>GPT-4.1</Tag>
          <div style={{width: 6, height: 70, background: accent, marginLeft: 34}} />
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 6. Depuis : une partie des potards seulement ; réfléchir par écrit avant de répondre ----------

const ACTIVE = [1, 10, 19]; // potards réveillés (index stable de KnobModel : r * 8 + c)

const Depuis: React.FC = () => {
  const frame = useCurrentFrame();
  const late = useLate();
  const partie = at('depuis', 'partie');
  const reflechir = at('depuis', 'réfléchir');
  const ecrit = at('depuis', 'écrit');
  const repondre = late(at('depuis', 'répondre'), 12);
  const lines = 4;
  // Le modèle est centré ; sur « répondre », le groupe glisse à gauche pour laisser sortir la réponse.
  const shift = ease(frame, repondre - 6, repondre + 4, [(W - 408) / 2, 0], 'inOut');
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 640}}>
        <div style={{position: 'absolute', left: shift, top: 0, width: 408, height: 640}}>
          {/* Bulle de brouillon au-dessus du modèle, sur « réfléchir » ; ses lignes s'écrivent jusqu'à « répondre ». */}
          <Pop at={reflechir} style={{position: 'absolute', left: -56, top: 0, width: 520, height: 210, border: '5px dashed #cfcfcf', borderRadius: 34, boxSizing: 'border-box', padding: '26px 34px', display: 'flex', flexDirection: 'column', gap: 18}}>
            {Array.from({length: lines}, (_, k) => {
              const a = ecrit + ((repondre - ecrit) * k) / lines;
              return <div key={k} style={{height: 16, width: `${[92, 70, 84, 58][k]}%`, background: '#9a9a9a', transform: `scaleX(${ease(frame, a, a + 8)})`, transformOrigin: 'left center'}} />;
            })}
          </Pop>
          {[0, 1].map((k) => (
            <Pop key={k} at={reflechir + 3 + 2 * k} style={{position: 'absolute', left: 190 - 30 * k, top: 220 + 24 * k, width: 26 - 8 * k, height: 26 - 8 * k, borderRadius: 20, border: '4px solid #cfcfcf'}} />
          ))}
          {/* Le modèle à potards de la scène taille, à sa taille de départ, posé dès l'entrée. */}
          <Pop at={2} style={{position: 'absolute', left: 0, top: 280}}>
            <KnobModel cols={4} show={() => 1} lit={(k) => (ACTIVE.includes(k) ? ease(frame, partie + 2 * ACTIVE.indexOf(k), partie + 2 * ACTIVE.indexOf(k) + 4) : 0)} off={frame >= partie} />
          </Pop>
          <Pop at={partie + 5} style={{position: 'absolute', left: 0, width: 408, top: 610, display: 'flex', justifyContent: 'center', opacity: frame >= reflechir ? 0.5 : 1}}>
            <Mono size={52} color="#fff">une partie</Mono>
          </Pop>
        </div>
        {/* La réponse sort ensuite, à droite, sur « répondre » : flèche (draw-on) puis bulle. */}
        <svg width={90} height={60} viewBox="0 0 90 60" style={{position: 'absolute', left: 430, top: 400, opacity: frame >= repondre + 2 ? 1 : 0}}>
          <Draw d="M6 30 H80 M60 12 L82 30 L60 48" p={ease(frame, repondre + 2, repondre + 10)} width={8} len={150} color="#fff" />
        </svg>
        <Pop at={repondre + 6} style={{position: 'absolute', left: 540, top: 360, width: 348, background: '#2a2a2a', borderRadius: 30, padding: '26px 30px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 14}}>
          <div style={{height: 16, width: '90%', background: AC}} />
          <div style={{height: 16, width: '60%', background: AC}} />
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 7. Chute : trois modèles sur le rayon ; ton texte passe au moyen, puis au petit ----------

const SpineModel: React.FC<{w: number; h: number; lit: number; dim?: number}> = ({w, h, lit, dim = 1}) => {
  const accent = useAccent();
  return (
    <div style={{width: w, height: h, background: '#2a2a2a', border: `7px solid ${lit > 0.5 ? accent : '#fff'}`, boxShadow: lit > 0.5 ? `0 0 40px ${withAlpha(accent, 0.6)}` : pixelShadow('#222'), boxSizing: 'border-box', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gridAutoRows: 30, gap: 10, padding: 16, alignContent: 'start', opacity: dim}}>
      {Array.from({length: 2 * Math.floor((h - 32) / 40)}, (_, k) => <div key={k} style={{background: lit > 0.5 ? withAlpha(accent, 0.7) : '#5a5a5a'}} />)}
    </div>
  );
};

const BOOKS = [
  {x: 20, w: 230, h: 470},
  {x: 330, w: 170, h: 340},
  {x: 580, w: 120, h: 230},
];
const BASE = 520;

const Chute: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const gros = at('chute', 'gros');
  const texte = at('chute', 'texte');
  const moyen = at('chute', 'moyen');
  const petit = at('chute', 'petit');
  // La feuille vole en arc vers le moyen (arrivée sur « moyen ») puis vers le petit (arrivée sur « petit »).
  const p1 = ease(frame, texte + 6, moyen, [0, 1], 'inOut');
  const p2 = ease(frame, moyen + 8, petit, [0, 1], 'inOut');
  const top = (b: (typeof BOOKS)[number]) => [b.x + b.w / 2 - 60, BASE - b.h - 170] as [number, number];
  const [sx, sy] = frame < moyen + 8 ? arc(p1, [760, -20], top(BOOKS[1]), 60) : arc(p2, top(BOOKS[1]), top(BOOKS[2]), 70);
  const litM = frame >= moyen && frame < petit ? 1 : 0;
  const litS = frame >= petit ? 1 : 0;
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 640}}>
        {/* Décor : le rayon, des livres ordinaires à droite, les trois modèles posés comme des livres. */}
        <div style={{position: 'absolute', left: 730, top: BASE - 300, opacity: 0.6}}><Shelves w={170} h={300} rows={1} u={10} /></div>
        <div style={{position: 'absolute', left: -96, right: -96, top: BASE, height: 26, background: '#8a5a35', borderBottom: '8px solid #5e3a22'}} />
        {BOOKS.map((b, k) => (
          <Pop key={k} at={2 + 2 * k} style={{position: 'absolute', left: b.x, top: BASE - b.h}}>
            <SpineModel w={b.w} h={b.h} lit={k === 1 ? litM : k === 2 ? litS : 0} dim={k === 0 && frame >= texte ? 0.6 : 1} />
          </Pop>
        ))}
        {/* Les coches : sur le moyen à « moyen », sur le petit à « petit ». */}
        {[1, 2].map((k) => {
          const a = k === 1 ? moyen : petit;
          const b = BOOKS[k];
          return (
            <div key={k} style={{position: 'absolute', left: b.x + b.w / 2 - 40, top: BASE - b.h - 96, opacity: frame >= a + 2 ? 1 : 0}}>
              <Check p={ease(frame, a + 2, a + 12)} size={80} color={k === 2 ? accent : '#fff'} />
            </div>
          );
        })}
        {/* Ta feuille, sur « ton propre texte ». */}
        <div style={{position: 'absolute', left: sx, top: sy, opacity: frame >= texte ? ease(frame, texte, texte + 4) * (frame >= petit + 6 ? 0 : 1) : 0, transform: `rotate(${-8 + 16 * p1}deg)`}}>
          <Doc w={120} lines={3} />
        </div>
        {/* Libellés sous le rayon, chacun sur son mot. */}
        <Pop at={gros} style={{position: 'absolute', left: BOOKS[0].x, width: BOOKS[0].w, top: BASE + 44, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <Mono size={48} color={LABEL}>le plus</Mono>
          <Mono size={48} color={LABEL}>gros</Mono>
        </Pop>
        <Pop at={moyen + 4} style={{position: 'absolute', left: BOOKS[1].x - 30, width: BOOKS[1].w + 60, top: BASE + 44, display: 'flex', justifyContent: 'center'}}>
          <Mono size={48} color="#fff">moyen</Mono>
        </Pop>
        <Pop at={petit + 4} style={{position: 'absolute', left: BOOKS[2].x - 40, width: BOOKS[2].w + 80, top: BASE + 44, display: 'flex', justifyContent: 'center'}}>
          <Mono size={48} color={accent}>petit</Mono>
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- Montage ----------

const SCENES: Record<string, React.FC> = {hook: Hook, taille: Taille, chinchilla: Chinchilla, verne: Verne, gpt41: Gpt41, retrait: Retrait, depuis: Depuis, chute: Chute};

export const MythePlusGrosVoix: React.FC = () => <V.Montage scenes={SCENES} accent={AC} />;

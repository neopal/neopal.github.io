// Short Benchmaxxing (YouTube / TikTok / Instagram), épisode 24, voix off PAL - FR, préparé le 2026-10-22 sur un calage
// provisoire (sans voix). Fiche benchmaxxing de lexique/terms.js (catégorie Écosystème) ; sources dans
// voix/benchmaxxing.script.json : MacTrast d'après AnandTech, 31 juillet 2013 (Galaxy S4 : 532 MHz dans les benchmarks,
// 480 dans les jeux) ; The Register, 8 avril 2025, et TechCrunch, 11 avril 2025 (Llama 4 2e sur LMArena dans sa version
// expérimentale, 32e dans la version téléchargeable) ; la loi de Goodhart (1975) ; l'image de Mathis et des annales.
// Le Galaxy S4 et le classement LMArena sont redessinés maison, sans logo ; Goodhart n'a pas de portrait (fiche bristol).
// Fil : le texte se compte en tokens (ép. 23), les modèles en points ; ici, ce qui arrive quand on vise les points.
// Décor commun : la salle de classe (tableau noir, craie, podium dessiné), du hook à la chute.
// L'écran suit la voix (univers.md) : chaque élément entre sur le mot qui le nomme (at('scène', 'mot')), rien en dur.
// Le mouvement : easing partout sauf les cascades et le défilement des corrigés, arcs pour ce qui vole, un seul punch
// zoom (Llama 4 à la 2e place), chaque effet nommé en commentaire (vocabulaire du motion).
// Scène propre à ce short : Mathis et ses annales, puis la pile d'annales qui revient derrière le modèle à la chute.
import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {ACCENTS, Big, Cross, Draw, Mono, Pop, Scene, W, arc, clamp, countUp, ease, punch, typed, useAccent, withAlpha} from './kit';
import {LABEL, makeVoix} from './voix/VoixShort';
import {Pixel, type Sprite} from './voix/Pixel';
import {Doc, Model, pixelShadow} from './voix/Parts';
import ALIGN from './voix/benchmaxxing.align.json';
import SCRIPT from './voix/benchmaxxing.script.json';

const AC = ACCENTS.ecosysteme; // catégorie Écosystème
const V = makeVoix(ALIGN, SCRIPT, 'voix/prediction-music.mp3');
const {at} = V;
export const BENCHMAXXINGVOIX_DURATION = V.duration;

const H = 600; // hauteur du schéma, dans la zone centrale de Scene (640)
const RED = '#e0312b'; // le stylo rouge de la prof
const SLATE = '#1c3328'; // le tableau noir (vert ardoise)
const WOOD = '#7a5230';
const CHALK = '#eef2ea';
const PAPER = '#efe9dc';

const gone = (frame: number, until: number) => ease(frame, until, until + 6, [1, 0], 'inOut');
const rnd = (k: number) => {
  const x = Math.sin(k * 12.9898 + 4.1414) * 43758.5453;
  return x - Math.floor(x);
};
// Un mot dit en toute fin de scène : son élément entre assez tôt pour être vu avant la coupe (le calage bougera).
const useLate = () => {
  const {durationInFrames} = useVideoConfig();
  return (f: number, room = 8) => Math.min(f, durationInFrames - room);
};

// ---------- Personnages (même format que voix/Pixel.tsx : une lettre = une couleur, E = les yeux qui clignent) ----------

const SKIN = '#e3b58e';

// Mathis, en terminale : cheveux châtain clair en bataille, sweat bleu à cordons.
const MATHIS: Sprite = {
  rows: [
    '..HHHHHHH...',
    '.HHHHHHHHH..',
    '..HSSSSSSH..',
    '...SESSES...',
    '...SSSSSS...',
    '...SSRRSS...',
    '....SSSS....',
    '..UUUUUUUU..',
    '.UUUUWWUUUU.',
    '.UUUUWWUUUU.',
    '.SUUUUUUUUS.',
    '.SUUUUUUUUS.',
    '...UUUUUU...',
    '...UUUUUU...',
  ],
  palette: {H: '#a8743a', S: SKIN, E: '#111', R: '#b5524f', U: '#3d5a99', W: '#cfcfcf'},
};

// Sa prof de maths, en pied (elle est debout, Mathis assis) : carré brun foncé, lunettes rouges, gilet rouge brique sur
// chemisier blanc, jupe grise, chaussures noires. Même taille de pixel que Mathis : elle est plus grande par le corps.
const PROF: Sprite = {
  rows: [
    '...HHHHHH...',
    '..HHHHHHHH..',
    '.HHSSSSSSHH.',
    '.HHGEGGEGHH.',
    '.HHSSSSSSHH.',
    '..HSSRRSSH..',
    '....SSSS....',
    '....SSSS....',
    '.CCCWWWWCCC.',
    '.CCCWWWWCCC.',
    '.SCCWWWWCCS.',
    '.SCCCCCCCCS.',
    '...CCCCCC...',
    '...CCCCCC...',
    '...KKKKKK...',
    '..KKKKKKKK..',
    '..KKKKKKKK..',
    '...SS..SS...',
    '...SS..SS...',
    '...SS..SS...',
    '..BBB..BBB..',
  ],
  palette: {H: '#2a1a14', S: SKIN, E: '#111', G: '#c23a32', R: '#b5524f', C: '#9a3f35', W: '#f2f2f2', K: '#5a5a62', B: '#111'},
};

// Les yeux fermés, pour un clignement calé sur un mot (le clignement de Pixel suit sa propre horloge).
const eyesShut = (s: Sprite): Sprite => ({rows: s.rows, palette: {...s.palette, E: s.palette.S}});

// ---------- Objets (dessinés maison) ----------

// Le tableau noir : ardoise verte, cadre en bois ; les enfants se placent dans l'ardoise (sous le cadre).
const Board: React.FC<{w: number; h: number; style?: React.CSSProperties; children?: React.ReactNode}> = ({w, h, style, children}) => (
  <div style={{position: 'absolute', width: w, height: h, background: SLATE, border: `14px solid ${WOOD}`, boxSizing: 'border-box', boxShadow: pixelShadow('#222'), ...style}}>
    {/* Traces d'éponge : deux voiles plus clairs, pour que l'ardoise ne soit pas un aplat. */}
    <div style={{position: 'absolute', left: '8%', top: '12%', width: '46%', height: '30%', background: 'rgba(255,255,255,0.05)', transform: 'rotate(-4deg)', filter: 'blur(24px)'}} />
    <div style={{position: 'absolute', right: '6%', bottom: '10%', width: '40%', height: '26%', background: 'rgba(255,255,255,0.045)', transform: 'rotate(3deg)', filter: 'blur(24px)'}} />
    {children}
  </div>
);

// Le podium tracé à la craie (draw-on, p de 0 à 1) : 2e à gauche, 1er au centre, 3e à droite. viewBox 300 x 130.
const PODIUM_TOP = 20 / 130; // haut de la marche du 1er, en fraction de la hauteur
// Les marches dans le viewBox : rang, x de début, x de fin, haut de la marche (le bas est à 128).
const PODIUM_STEPS: [string, number, number, number][] = [['2', 2, 100, 62], ['1', 100, 200, 20], ['3', 200, 298, 82]];
const Podium: React.FC<{w: number; p: number}> = ({w, p}) => {
  const seg = (k: number) => Math.max(0, Math.min(1, p * 3 - k));
  return (
    <svg width={w} height={(w * 130) / 300} viewBox="-4 -4 308 138" style={{overflow: 'visible'}}>
      <Draw d="M2 128 V62 H100 V20 H200 V82 H298 V128 Z" p={seg(0)} len={940} width={4} color={CHALK} />
      <Draw d="M100 62 V128 M200 82 V128" p={seg(1)} len={120} width={4} color={CHALK} />
      <Draw d="M0 128 H300" p={seg(2)} len={300} width={5} color={CHALK} />
    </svg>
  );
};

// Une annale : un livre de poche couché, vu de la tranche.
const ANNALE_H = 38;
const Annale: React.FC<{k: number; w: number}> = ({k, w}) => (
  <div style={{width: w, height: ANNALE_H - 4, background: k % 3 === 0 ? PAPER : k % 3 === 1 ? '#d9d2c3' : '#c9c1b0', border: '3px solid #000', boxSizing: 'border-box', display: 'flex', alignItems: 'center', gap: 8, padding: '0 10px', marginLeft: (k % 2) * 10 - 5}}>
    <div style={{width: 14, height: '100%', background: k % 2 ? '#5b7fb5' : '#b5524f'}} />
    <div style={{height: 6, width: `${40 + 30 * rnd(k)}%`, background: '#7a7365'}} />
  </div>
);

// La pile d'annales : elle monte de bas en haut en cascade à partir de `from` (2 images par livre).
const Pile: React.FC<{n: number; w: number; from: number}> = ({n, w, from}) => {
  const frame = useCurrentFrame();
  return (
    <div style={{display: 'flex', flexDirection: 'column-reverse', gap: 4}}>
      {Array.from({length: n}, (_, k) => (
        <div key={k} style={{opacity: frame >= from + 2 * k ? 1 : 0, transform: `translateY(${(1 - ease(frame, from + 2 * k, from + 2 * k + 6)) * -30}px)`}}>
          <Annale k={k} w={w} />
        </div>
      ))}
    </div>
  );
};

// La note entourée au stylo rouge (draw-on du cercle).
const Note: React.FC<{p: number; size?: number}> = ({p, size = 96}) => (
  <div style={{position: 'relative', padding: '10px 26px'}}>
    <Mono size={size} color={RED}>18</Mono>
    <svg width="100%" height="100%" viewBox="0 0 100 60" preserveAspectRatio="none" style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
      <Draw d="M86 10 C 70 -2, 20 0, 8 22 C 0 44, 40 62, 74 54 C 100 46, 102 18, 70 6" p={p} len={300} width={3.5} color={RED} />
    </svg>
  </div>
);

// Un morceau de scotch, pour coller un collage (photo, capture, portrait).
const Tape: React.FC<{style?: React.CSSProperties}> = ({style}) => (
  <div style={{position: 'absolute', width: 90, height: 30, background: 'rgba(230,220,170,0.78)', ...style}} />
);

// ---------- 0. Hook : la question en grand, devant le tableau noir de la classe ----------

const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const fade = interpolate(frame, [durationInFrames - 5, durationInFrames], [1, 0], clamp);
  return (
    <>
      {/* Le décor, dès la première image : le tableau de la classe et un podium à la craie (aucun chiffre que la voix ne dit pas). */}
      <AbsoluteFill style={{opacity: fade}}>
        <Board w={1080 - 2 * 60} h={1180} style={{left: 60, top: 230}}>
          <div style={{position: 'absolute', left: 230, top: 90, opacity: 0.8}}>
            <Podium w={460} p={1} />
          </div>
        </Board>
      </AbsoluteFill>
      <V.TitleHook lead="C'est quoi ?" lines={['le benchmaxxing']} cue="benchmaxxing" />
    </>
  );
};

// ---------- 1. Intro : le ticket de tokens devient une colonne de scores ; l'antisèche, rayée, rentre dans la trousse ----------

const SCORES = [0.5, 0.72, 0.84, 0.96]; // longueurs des barres de points à la craie (aucun chiffre écrit)

const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const late = useLate();
  const tokens = at('intro', 'tokens');
  const modeles = at('intro', 'modèles');
  const points = at('intro', 'points');
  const tricher = at('intro', 'tricher');
  const aucune = at('intro', 'aucune');
  const enfreinte = late(at('intro', 'enfreinte'), 16);
  // Le ticket glisse à gauche et se replie (inOut) vers la colonne de scores, puis s'efface quand le tableau arrive.
  const fold = ease(frame, modeles - 12, modeles + 6, [0, 1], 'inOut');
  // L'antisèche rentre dans la trousse, qui se referme (inOut).
  const shut = ease(frame, enfreinte, enfreinte + 12, [0, 1], 'inOut');
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: H}}>
        {/* Le tableau : pop in sur « modèles », quatre modèles en cascade ; leurs points poussent à la craie sur « en points » (bar grow) ;
            il s'efface entièrement quand la trousse arrive (rien ne reste derrière elle). */}
        {frame < tricher + 8 ? (
          <Pop at={modeles} style={{position: 'absolute', left: 0, top: 0, opacity: frame >= tricher ? gone(frame, tricher) : 1}}>
            <Board w={W} h={H}>
              {SCORES.map((s, k) => (
                <div key={k} style={{position: 'absolute', left: 70, top: 30 + k * 132, display: 'flex', alignItems: 'center', gap: 50}}>
                  <Pop at={modeles + 3 * k}><Model w={150} /></Pop>
                  <div style={{width: 520 * s * ease(frame, points + 3 * k, points + 3 * k + 14), height: 34, background: CHALK, opacity: 0.85}} />
                </div>
              ))}
            </Board>
          </Pop>
        ) : null}
        {/* Le ticket de caisse des tokens (fin de l'ép. 23), posé dès l'entrée. */}
        {frame < modeles + 10 ? (
          <div style={{position: 'absolute', left: 314, top: 0, opacity: gone(frame, modeles + 2), transform: `translateX(${-200 * fold}px) scaleY(${1 - 0.8 * fold})`, transformOrigin: 'top center'}}>
            <Pop at={0} style={{width: 260, height: 560, background: '#f4f1ea', padding: '26px 24px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 18, clipPath: 'polygon(0 0, 100% 0, 100% 97%, 90% 100%, 80% 97%, 70% 100%, 60% 97%, 50% 100%, 40% 97%, 30% 100%, 20% 97%, 10% 100%, 0 97%)'}}>
              <div style={{height: 64, opacity: frame >= tokens ? 1 : 0, display: 'flex', justifyContent: 'center'}}><Mono size={52} color="#111">tokens</Mono></div>
              {Array.from({length: 11}, (_, k) => (
                <div key={k} style={{display: 'flex', justifyContent: 'space-between'}}>
                  <div style={{height: 12, width: `${40 + 35 * rnd(k)}%`, background: '#9a9384'}} />
                  <div style={{height: 12, width: '18%', background: '#444'}} />
                </div>
              ))}
            </Pop>
          </div>
        ) : null}
        {/* La trousse : pop in sur « tricher », l'antisèche dépasse ; croix sur « aucune règle » (draw-on) ; elle rentre et la trousse se ferme. */}
        <Pop at={tricher} style={{position: 'absolute', left: 184, top: 150, width: 520, height: 420}}>
          <div style={{position: 'absolute', left: 150, top: 0, width: 220, height: 260, overflow: 'hidden'}}>
            <div style={{position: 'absolute', left: 20, top: 20, transform: `translateY(${shut * 250}px) rotate(-6deg)`}}>
              <div style={{width: 180, height: 230, background: PAPER, border: '4px solid #000', padding: '18px 16px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 12}}>
                {[80, 64, 90, 54, 76, 60].map((w, k) => <div key={k} style={{height: 8, width: `${w}%`, background: '#5b7fb5'}} />)}
              </div>
              <div style={{position: 'absolute', left: 5, top: 20}}>{frame >= aucune ? <Cross p={ease(frame, aucune, aucune + 12)} size={170} /> : null}</div>
            </div>
          </div>
          {/* Le corps de la trousse, avec sa fermeture éclair qui se referme de gauche à droite. */}
          <div style={{position: 'absolute', left: 0, top: 230, width: 520, height: 190, background: '#3f6b8a', border: '6px solid #000', borderRadius: 40, boxSizing: 'border-box', boxShadow: pixelShadow('#222')}}>
            <div style={{position: 'absolute', left: 30, right: 30, top: 18, height: 14, background: 'repeating-linear-gradient(90deg, #cfcfcf 0 8px, #2a2a2a 8px 14px)'}} />
            <div style={{position: 'absolute', left: 30 + 400 * shut, top: 6, width: 30, height: 44, background: '#cfcfcf', border: '4px solid #000', borderRadius: 6}} />
          </div>
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 2. Benchmark : la même copie sur trois pupitres, puis le podium à la craie ----------

const DESKS = [148, 444, 740];
const DESK_Y = 470;

const Bench: React.FC = () => {
  const frame = useCurrentFrame();
  const late = useLate();
  const bench = at('bench', 'benchmark');
  const examen = at('bench', 'examen');
  const memes = at('bench', 'mêmes');
  const classer = late(at('bench', 'classer'), 24);
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: H}}>
        {/* Le décor : le tableau et trois pupitres, posés dès l'entrée ; un modèle par pupitre (cascade). */}
        <Pop at={2} style={{position: 'absolute', left: 0, top: 0}}>
          <Board w={W} h={270}>
            {/* draw-on : le podium se trace à la craie sur « classer », les rangs suivent (stagger). */}
            <div style={{position: 'absolute', left: 210, top: 22}}>
              <Podium w={440} p={ease(frame, classer, classer + 16)} />
              {/* Les rangs, centrés dans leur marche (stagger), sans toucher les traits. */}
              {PODIUM_STEPS.map(([n, x0, x1, top], k) => {
                const s = 440 / 308;
                return (
                  <div key={n} style={{position: 'absolute', left: ((x0 + x1) / 2 + 4) * s, top: ((top + 128) / 2 + 4) * s, transform: 'translate(-50%, -50%)'}}>
                    <Pop at={classer + 10 + 2 * k}><div style={{lineHeight: 1}}><Mono size={48} color={CHALK}>{n}</Mono></div></Pop>
                  </div>
                );
              })}
            </div>
          </Board>
        </Pop>
        {DESKS.map((x, k) => (
          <React.Fragment key={x}>
            <Pop at={Math.max(2, bench - 4) + 3 * k} style={{position: 'absolute', left: x - 115, top: DESK_Y - 81}}><Model w={130} /></Pop>
            <Pop at={2} style={{position: 'absolute', left: x - 125, top: DESK_Y, width: 250}}>
              <div style={{height: 22, background: '#a0703f', border: '4px solid #000'}} />
              <div style={{display: 'flex', justifyContent: 'space-between', padding: '0 18px'}}>
                <div style={{width: 14, height: 100, background: '#5a3a22'}} />
                <div style={{width: 14, height: 100, background: '#5a3a22'}} />
              </div>
            </Pop>
          </React.Fragment>
        ))}
        {/* La copie d'examen : pop in sur « examen », au milieu du tableau ; elle part sur « mêmes questions ». */}
        {frame < memes + 6 ? (
          <div style={{position: 'absolute', left: 60, top: 40, display: 'flex', alignItems: 'center', gap: 30, opacity: gone(frame, memes)}}>
            <Pop at={examen}><Doc w={140} lines={4} /></Pop>
            <Pop at={examen + 5}><Mono size={56} color={CHALK}>examen</Mono></Pop>
          </div>
        ) : null}
        {/* Trois copies identiques tombent en arc sur les trois pupitres, en cascade de gauche à droite. */}
        {DESKS.map((x, k) => {
          const p = ease(frame, memes + 3 * k, memes + 3 * k + 14, [0, 1], 'inOut');
          const [cx, cy] = arc(p, [130, 60], [x + 20, DESK_Y - 62], 60);
          return frame >= memes + 3 * k ? (
            <div key={x} style={{position: 'absolute', left: cx, top: cy, transform: `rotate(${(1 - p) * -12 + k * 3 - 3}deg) scale(${1 - 0.35 * p})`, transformOrigin: 'top left'}}>
              <Doc w={140} lines={4} />
            </div>
          ) : null;
        })}
      </div>
    </Scene>
  );
};

// ---------- 3. Nom : sur le podium, la barre du classement s'envole, celle de ton usage ne bouge pas ----------

const BASE_Y = 496; // ligne de base des barres, dans l'ardoise (le libellé dessous garde 30 px avant le cadre)

const Nom: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const late = useLate();
  const regler = at('nom', 'Régler');
  const grimper = at('nom', 'grimper');
  const classement = at('nom', 'classement');
  const servir = at('nom', 'servir');
  const cestCa = late(at('nom', 'ça,'), 40);
  // bar grow : vite et haut pour le classement, presque rien pour l'usage.
  const up = ease(frame, grimper, grimper + 18);
  const meh = ease(frame, servir, servir + 14);
  const back = interpolate(frame, [cestCa - 10, cestCa - 2], [1, 0], clamp); // le schéma s'efface entièrement juste avant le terme
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 640}}>
        <Board w={W} h={640} style={{left: 0, top: 0}}>
          <div style={{position: 'absolute', inset: 0, opacity: back, display: back > 0 ? 'block' : 'none'}}>
            {/* Le décor : le podium de la scène d'avant et le modèle sur la plus haute marche. */}
            <div style={{position: 'absolute', left: 20, top: BASE_Y - (320 * 130) / 300 + 6}}>
              <Podium w={320} p={1} />
            </div>
            <div style={{position: 'absolute', left: 20 + 160 - 75, top: BASE_Y - (320 * 130) / 300 + 6 + 320 * (130 / 300) * PODIUM_TOP - 93 + 12}}>
              <Model w={150} />
              {/* Le potard qu'on règle : pop in sur « Régler », il tourne (ease). */}
              <Pop at={regler + 2} style={{position: 'absolute', right: -40, top: -36}}>
                <svg width={70} height={70} viewBox="0 0 70 70" style={{transform: `rotate(${-60 + 150 * ease(frame, regler + 6, regler + 24)}deg)`}}>
                  <circle cx="35" cy="35" r="28" fill={accent} stroke="#000" strokeWidth="5" />
                  <path d="M35 35 L35 10" stroke="#000" strokeWidth="7" strokeLinecap="round" />
                </svg>
              </Pop>
            </div>
            {/* Les deux barres, posées vides dès l'entrée, qui poussent sur « grimper » puis « te servir ». */}
            <div style={{position: 'absolute', left: 400, top: BASE_Y - 420 * up, width: 130, height: 420 * up, background: accent}} />
            <div style={{position: 'absolute', left: 650, top: BASE_Y - 8 - 34 * meh, width: 130, height: 8 + 34 * meh, background: '#cfcfcf'}} />
            <div style={{position: 'absolute', left: 360, top: BASE_Y, width: 500, height: 5, background: CHALK}} />
            <Pop at={classement} style={{position: 'absolute', left: 300, width: 330, top: BASE_Y + 14, display: 'flex', justifyContent: 'center'}}><Mono size={52} color={accent}>classement</Mono></Pop>
            <Pop at={servir} style={{position: 'absolute', left: 540, width: 300, top: BASE_Y - 130, display: 'flex', justifyContent: 'center'}}><Mono size={52} color={CHALK}>te servir</Mono></Pop>
          </div>
          {/* pop in : le terme en grand, écrit quand la voix le dit (sous-titre masqué par onscreen). */}
          <Pop at={cestCa} style={{position: 'absolute', left: 0, right: 0, top: 230, display: 'flex', justifyContent: 'center'}}>
            <Big size={116} color={accent}>benchmaxxing</Big>
          </Pop>
        </Board>
      </div>
    </Scene>
  );
};

// ---------- 4. L'image : Mathis, ses annales, le 18, et la dérivée ----------

const DESK = {x: 150, w: 430, y: 470};
const MATHIS_X = 200;
const PILE_X = 410;
const PILE_N = 12; // jusqu'au plafond de la pièce (le haut du schéma)
const SHEET = {x: 628, y: 40, w: 260};
const BLOCKS = 4;
const LIT = [0, 2]; // les deux exercices repris des annales

const Annales: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const late = useLate();
  const mathis = at('annales', 'Mathis');
  const annales = at('annales', 'annales');
  const corriges = at('annales', 'corrigés');
  const jour = at('annales', 'jour');
  const deux = at('annales', 'deux');
  const reprises = at('annales', 'reprises');
  const dixhuit = at('annales', '18');
  const prof = at('annales', 'prof');
  const derivee = late(at('annales', 'dérivée'), 18);
  // Mathis cligne des yeux deux fois après « dérivée ».
  const blinkNow = (frame >= derivee + 5 && frame < derivee + 8) || (frame >= derivee + 11 && frame < derivee + 14);
  // Défilement continu (linéaire) des corrigés au-dessus de sa tête, de « corrigés » à « jour J ».
  const scroll = Math.max(0, frame - corriges) * 6;
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: H}}>
        {/* Le décor : le sol, posé dès l'entrée. */}
        <Pop at={2} style={{position: 'absolute', left: 0, right: 0, top: 590}}><div style={{height: 10, background: '#3a3a3a'}} /></Pop>
        {/* Mathis, assis sur sa chaise à son bureau : pop in sur son prénom. Le dossier passe derrière lui, l'assise sous le plateau. */}
        <Pop at={Math.max(2, mathis - 2)} style={{position: 'absolute', left: MATHIS_X - 10, top: DESK.y - 85, width: 200, height: 590 - (DESK.y - 85)}}>
          <div style={{position: 'absolute', left: 0, top: 0, width: 16, height: 590 - (DESK.y - 85), background: '#5a3a22'}} />
          <div style={{position: 'absolute', right: 0, top: 0, width: 16, height: 590 - (DESK.y - 85), background: '#5a3a22'}} />
          <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 16, background: '#7a5230'}} />
          <div style={{position: 'absolute', left: -6, right: -6, top: 85 + 50, height: 18, background: '#7a5230', border: '3px solid #000'}} />
        </Pop>
        <Pop at={Math.max(2, mathis - 2)} style={{position: 'absolute', left: MATHIS_X, top: DESK.y - 160}}>
          <Pixel sprite={blinkNow ? eyesShut(MATHIS) : MATHIS} px={15} seed={1} />
        </Pop>
        <Pop at={Math.max(2, mathis - 2)} style={{position: 'absolute', left: DESK.x, top: DESK.y, width: DESK.w}}>
          <div style={{height: 24, background: '#a0703f', border: '4px solid #000'}} />
          <div style={{display: 'flex', justifyContent: 'space-between', padding: '0 20px'}}>
            <div style={{width: 16, height: 96, background: '#5a3a22'}} />
            <div style={{width: 16, height: 96, background: '#5a3a22'}} />
          </div>
        </Pop>
        {/* La pile d'annales : cascade de bas en haut sur « annales », jusqu'au plafond ; elle part quand la prof arrive. */}
        {frame < prof + 6 ? (
          <div style={{position: 'absolute', left: PILE_X, top: DESK.y - PILE_N * ANNALE_H, opacity: (frame >= jour ? 0.45 : 1) * gone(frame, prof)}}>
            <Pile n={PILE_N} w={170} from={annales} />
          </div>
        ) : null}
        {frame < jour + 6 ? (
          <Pop at={annales + 5} style={{position: 'absolute', left: PILE_X + 200, top: 300, opacity: gone(frame, jour)}}><Mono size={56} color="#fff">annales</Mono></Pop>
        ) : null}
        {/* Les corrigés qui défilent au-dessus de sa tête (la bulle de pensée), de « corrigés » à « jour J ». */}
        {frame < jour + 6 ? (
          <Pop at={corriges} style={{position: 'absolute', left: 60, top: 40, opacity: gone(frame, jour)}}>
            <div style={{width: 330, height: 180, borderRadius: 40, border: '5px solid #fff', background: '#1c1c1c', overflow: 'hidden', position: 'relative'}}>
              {Array.from({length: 12}, (_, k) => {
                const x = ((k * 110 - scroll) % 1320 + 1320) % 1320 - 110;
                return (
                  <div key={k} style={{position: 'absolute', left: x, top: 24, width: 88, height: 122, background: PAPER, border: '3px solid #000', boxSizing: 'border-box', padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: 9}}>
                    {[80, 60, 72, 50].map((w, j) => <div key={j} style={{height: 6, width: `${w}%`, background: j === 3 ? RED : '#9a9384'}} />)}
                  </div>
                );
              })}
            </div>
            <div style={{position: 'absolute', left: 230, top: 196, width: 30, height: 30, borderRadius: 15, border: '5px solid #fff', background: '#1c1c1c'}} />
            <div style={{position: 'absolute', left: 250, top: 236, width: 18, height: 18, borderRadius: 9, border: '4px solid #fff', background: '#1c1c1c'}} />
          </Pop>
        ) : null}
        {/* Le sujet du bac : pop in sur « jour J » ; deux exercices s'allument (highlight) ; deux pages d'annales s'y posent en arc. */}
        <Pop at={jour} style={{position: 'absolute', opacity: frame >= prof ? gone(frame, prof) : 1, left: SHEET.x, top: SHEET.y, width: SHEET.w, height: 470, background: PAPER, border: '6px solid #000', boxShadow: pixelShadow('#444'), boxSizing: 'border-box', padding: '96px 22px 20px', display: 'flex', flexDirection: 'column', gap: 14}}>
          {Array.from({length: BLOCKS}, (_, k) => {
            const lit = LIT.indexOf(k);
            const on = lit < 0 ? 0 : ease(frame, deux + 4 * lit, deux + 4 * lit + 8);
            return (
              <div key={k} style={{height: 72, border: '3px solid #9a9384', background: withAlpha(accent, 0.55 * on), padding: '12px 10px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 10}}>
                <div style={{height: 8, width: '80%', background: '#7a7365'}} />
                <div style={{height: 8, width: '55%', background: '#7a7365'}} />
              </div>
            );
          })}
          {/* La note rouge, entourée sur « 18 » (draw-on). */}
          <div style={{position: 'absolute', right: 6, top: -4, opacity: frame >= dixhuit ? 1 : 0}}>
            <Note p={ease(frame, dixhuit + 2, dixhuit + 16)} size={72} />
          </div>
        </Pop>
        {LIT.map((b, k) => {
          const start = reprises - 4 + 4 * k;
          const p = ease(frame, start, start + 12, [0, 1], 'inOut');
          const [x, y] = arc(p, [PILE_X + 20, 60 + 40 * k], [SHEET.x + 28, SHEET.y + 96 + b * 86 + 4], 50);
          return frame >= start && frame < dixhuit + 8 ? (
            <div key={b} style={{position: 'absolute', left: x, top: y, width: 204, height: 64, background: PAPER, border: `4px solid ${accent}`, boxSizing: 'border-box', opacity: frame >= dixhuit ? gone(frame, dixhuit) : 1}} />
          ) : null;
        })}
        {/* Sa prof : la copie a servi et s'efface ; elle entre debout à droite du bureau, plus haute que Mathis assis. */}
        <Pop at={prof + 4} style={{position: 'absolute', left: 640, top: 590 - 21 * 15}}>
          <Pixel sprite={PROF} px={15} seed={4} />
        </Pop>
        <Pop at={derivee} style={{position: 'absolute', left: 430, top: 90, background: '#fff', border: '5px solid #000', borderRadius: 30, padding: '10px 26px'}}>
          <Mono size={64} color="#111">f'(x) ?</Mono>
          {/* La pointe de la bulle, vers la tête de la prof. */}
          <svg width={60} height={56} viewBox="0 0 60 56" style={{position: 'absolute', left: 250, top: '100%', marginTop: -5, overflow: 'visible'}}>
            <path d="M0 0 L60 0 L46 52 Z" fill="#fff" stroke="#000" strokeWidth="5" strokeLinejoin="round" />
            <path d="M3 0 L57 0" stroke="#fff" strokeWidth="8" />
          </svg>
        </Pop>
      </div>
    </Scene>
  );
};

// La photo détourée du téléphone (400 x 783) réduite à 0,62 ; l'écran y occupe x 25-385, y 60-720.
const PHONE = {w: 248, h: 485, sx: 16, sy: 37, sw: 223, sh: 409};

// ---------- 5. Galaxy S4 : l'aiguille à 532 dans les tests, retombée à 480 dans les jeux ----------

const GAUGE = {w: 528, h: 300, cx: 264, cy: 268, r: 220, max: 600};
const needle = (v: number, len: number): [number, number] => {
  const t = Math.PI - (Math.PI * v) / GAUGE.max;
  return [GAUGE.cx + len * Math.cos(t), GAUGE.cy - len * Math.sin(t)];
};

const Flask: React.FC = () => (
  <svg width={96} height={110} viewBox="0 0 48 55">
    <path d="M18 4 H30 M20 4 V20 L6 46 Q4 51 10 51 H38 Q44 51 42 46 L28 20 V4" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinejoin="round" />
    <path d="M11 40 L37 40 L40 46 Q41 48 38 48 H10 Q7 48 8 46 Z" fill="#8FB8FF" />
  </svg>
);

const Pad: React.FC = () => (
  <svg width={140} height={90} viewBox="0 0 70 45">
    <path d="M14 8 H56 Q68 8 68 26 Q68 42 58 42 Q52 42 46 32 H24 Q18 42 12 42 Q2 42 2 26 Q2 8 14 8 Z" fill="#cfcfcf" stroke="#fff" strokeWidth="2" />
    <path d="M18 16 V30 M11 23 H25" stroke="#1c1c1c" strokeWidth="4" />
    <circle cx="50" cy="19" r="3.5" fill="#d9534f" />
    <circle cx="57" cy="26" r="3.5" fill="#5b7fb5" />
  </svg>
);

const Galaxy: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const late = useLate();
  const samsung = at('galaxy', 'Samsung');
  const s4 = at('galaxy', 'S4');
  const puce = at('galaxy', 'puce');
  const n532 = at('galaxy', '532');
  const logiciels = at('galaxy', 'logiciels');
  const test = at('galaxy', 'test');
  const jeu = at('galaxy', 'jeu');
  const n480 = late(at('galaxy', '480'), 14);
  // count-up de 0 à 532, posé sur « 532 » ; puis l'aiguille retombe de 532 à 480, posée sur « 480 ».
  const upFrom = n532 - 20;
  const downFrom = Math.min(jeu + 4, n480 - 12);
  const v = frame < downFrom ? ease(frame, upFrom, upFrom + 26, [0, 532]) : ease(frame, downFrom, n480, [532, 480], 'inOut');
  // Pas de valeur intermédiaire non dite à la descente : text swap sec de 532 à 480 quand l'aiguille retombe.
  const label = frame < downFrom ? countUp(frame, upFrom, 532, 26) : '480';
  const wipe = ease(frame, jeu - 2, jeu + 14, [0, 1], 'inOut'); // wipe : du test au jeu
  const [nx, ny] = needle(v, 190);
  const [m1x, m1y] = needle(480, GAUGE.r - 26);
  const [m2x, m2y] = needle(480, GAUGE.r + 18);
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: H}}>
        {/* La vraie photo du Galaxy S4 (collage, scotch), posée dès l'entrée ; sur « logiciels », l'écran s'éteint et affiche la fiole
            du test, puis la manette en wipe sur « jeu ». */}
        <Pop at={2} style={{position: 'absolute', left: 30, top: 0, width: PHONE.w, height: PHONE.h, transform: 'rotate(-2deg)'}}>
          <Img src={staticFile('voix/benchmaxxing-galaxy-s4.png')} style={{position: 'absolute', inset: 0, width: PHONE.w, height: PHONE.h, filter: 'drop-shadow(8px 8px 0 #333)'}} />
          <Img src={staticFile('voix/benchmaxxing-galaxy-s4-ecran-noir.png')} style={{position: 'absolute', inset: 0, width: PHONE.w, height: PHONE.h, opacity: ease(frame, logiciels - 3, logiciels + 3)}} />
          <div style={{position: 'absolute', left: PHONE.sx, top: PHONE.sy, width: PHONE.sw, height: PHONE.sh, overflow: 'hidden'}}>
            <Pop at={logiciels + 2} style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14}}>
              <Flask />
              <div style={{opacity: frame >= test ? 1 : 0}}><Mono size={52} color="#fff">test</Mono></div>
            </Pop>
            <div style={{position: 'absolute', inset: 0, background: '#0c0e12', clipPath: `inset(0 ${(1 - wipe) * 100}% 0 0)`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14}}>
              <Pad />
              <Mono size={52} color="#fff">jeu</Mono>
            </div>
          </div>
          <Tape style={{left: -26, top: 30, transform: 'rotate(-40deg)'}} />
          <Tape style={{right: -26, bottom: 40, transform: 'rotate(-40deg)'}} />
        </Pop>
        <Pop at={s4} style={{position: 'absolute', left: 0, width: 340, top: PHONE.h + 14, display: 'flex', justifyContent: 'center'}}><Mono size={52} color="#fff">Galaxy S4</Mono></Pop>
        {/* Le compteur de la puce graphique : pop in sur « puce », l'aiguille monte à 532 puis retombe à 480. */}
        <Pop at={puce} style={{position: 'absolute', left: 360, top: 0, width: GAUGE.w}}>
          <svg width={GAUGE.w} height={GAUGE.h} viewBox={`0 0 ${GAUGE.w} ${GAUGE.h}`} style={{overflow: 'visible'}}>
            <path d={`M${GAUGE.cx - GAUGE.r} ${GAUGE.cy} A${GAUGE.r} ${GAUGE.r} 0 0 1 ${GAUGE.cx + GAUGE.r} ${GAUGE.cy}`} fill="none" stroke="#cfcfcf" strokeWidth="10" />
            {Array.from({length: 7}, (_, k) => {
              const [ax, ay] = needle(k * 100, GAUGE.r - 6);
              const [bx, by] = needle(k * 100, GAUGE.r - 34);
              return <line key={k} x1={ax} y1={ay} x2={bx} y2={by} stroke="#cfcfcf" strokeWidth="6" />;
            })}
            {/* Le plafond des jeux, marqué quand l'aiguille y retombe. */}
            {frame >= downFrom ? <line x1={m1x} y1={m1y} x2={m2x} y2={m2y} stroke={accent} strokeWidth="10" opacity={ease(frame, downFrom, downFrom + 8)} /> : null}
            <line x1={GAUGE.cx} y1={GAUGE.cy} x2={nx} y2={ny} stroke={accent} strokeWidth="12" strokeLinecap="round" />
            <circle cx={GAUGE.cx} cy={GAUGE.cy} r="20" fill="#fff" />
          </svg>
        </Pop>
        {frame >= upFrom ? (
          <div style={{position: 'absolute', left: 360, width: GAUGE.w, top: 296, display: 'flex', justifyContent: 'center'}}>
            <Mono size={104} color={frame >= downFrom ? '#fff' : accent}>{label} MHz</Mono>
          </div>
        ) : null}
        {/* L'article de MacTrast (collage, scotch) : pop in sur « Samsung ». */}
        <Pop at={samsung} style={{position: 'absolute', left: 350, top: 450, transform: 'rotate(1.5deg)'}}>
          <Img src={staticFile('voix/benchmaxxing-mactrast.png')} style={{display: 'block', width: 538, border: '4px solid #000', boxShadow: pixelShadow('#444')}} />
          <Tape style={{left: 220, top: -16}} />
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 6. Llama 4 sur LMArena : 2e dans sa version d'exposition, 32e dans celle qu'on télécharge ----------

const ROWS = 32;
const ROW = 17;
const LIST = {x: 116, w: 300, top: 76};
const rowY = (r: number) => LIST.top + (r - 1) * ROW;
const PILL_X = 440;

const Pill: React.FC<{dl?: boolean}> = ({dl}) => {
  const accent = useAccent();
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 12, padding: '6px 20px', border: `5px solid ${accent}`, background: withAlpha(accent, 0.22), borderRadius: 16}}>
      <Mono size={52} color="#fff">Llama 4</Mono>
      {dl ? (
        <svg width={48} height={52} viewBox="0 0 48 52">
          <path d="M24 4 V34 M10 22 L24 36 L38 22 M6 46 H42" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : null}
    </div>
  );
};

const Llama: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const late = useLate();
  const meta = at('llama', 'Meta');
  const llama = at('llama', 'Llama');
  const lmarena = at('llama', 'LMArena');
  const deuxieme = at('llama', 'deuxième');
  const telecharger = at('llama', 'télécharger');
  const trente = late(at('llama', 'trente'), 18);
  // La première ligne se pose à la 2e place (inOut), punch zoom à l'arrivée sur « deuxième » (le seul du short).
  const land = ease(frame, deuxieme - 10, deuxieme, [0, 1], 'inOut');
  const y1 = interpolate(land, [0, 1], [200, rowY(2) + 5 - 42]);
  // La version téléchargeable tombe en arc jusqu'à la 32e place, posée sur « trente-deuxième ».
  const fall = ease(frame, telecharger + 4, trente, [0, 1], 'inOut');
  const [fx, fy] = arc(fall, [PILL_X, rowY(2) + 80], [PILL_X, rowY(ROWS) + 5 - 42], 40);
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 640}}>
        <Pop at={lmarena} style={{position: 'absolute', left: LIST.x, top: 0}}><Mono size={52} color="#fff">LMArena</Mono></Pop>
        {/* Le classement : 32 lignes anonymes, posées dès l'entrée en cascade rapide (le décor) ; son nom sur « LMArena ». */}
        {Array.from({length: ROWS}, (_, k) => {
          const r = k + 1;
          const lit = (r === 2 && frame >= deuxieme) || (r === ROWS && frame >= trente);
          return (
            <div key={r} style={{position: 'absolute', left: LIST.x, top: rowY(r), width: LIST.w * (0.45 + 0.55 * rnd(r)), height: 11, background: lit ? accent : '#4a4a4a', opacity: frame >= 1 + Math.floor(k / 4) ? 1 : 0}} />
          );
        })}
        <Pop at={deuxieme} style={{position: 'absolute', left: 30, top: rowY(2) - 34}}><Mono size={60} color={accent}>2e</Mono></Pop>
        <Pop at={trente} style={{position: 'absolute', left: 0, top: rowY(ROWS) - 34}}><Mono size={60} color={accent}>32e</Mono></Pop>
        {/* La version inscrite au classement : pop in sur « Llama », puis elle se pose à la 2e place. */}
        <Pop at={llama} style={{position: 'absolute', left: PILL_X, top: y1}}>
          <div style={{transform: `scale(${punch(frame, deuxieme)})`, transformOrigin: 'left center'}}><Pill /></div>
        </Pop>
        {/* L'article de The Register (collage, scotch) : pop in sur « Meta », à côté du classement. */}
        <Pop at={meta} style={{position: 'absolute', left: 432, top: 330, transform: 'rotate(-1.5deg)'}}>
          <Img src={staticFile('voix/benchmaxxing-llama.png')} style={{display: 'block', width: 456, border: '4px solid #000', boxShadow: pixelShadow('#444')}} />
          <Tape style={{left: -24, top: -10, transform: 'rotate(-35deg)'}} />
          <Tape style={{right: -24, top: -10, transform: 'rotate(35deg)'}} />
        </Pop>
        {/* La version téléchargeable : pop in sur « télécharger », juste sous la première, puis la chute en arc. */}
        <Pop at={telecharger} style={{position: 'absolute', left: fx, top: fy}}><Pill dl /></Pop>
      </div>
    </Scene>
  );
};

// ---------- 7. Goodhart : le score qu'on vise s'envole, le niveau s'aplatit ----------

const AX = {x0: 60, x1: 860, y0: 520, y1: 40};
const MID = {x: 420, score: 330, niveau: 360};

const Goodhart: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const late = useLate();
  const vise = at('goodhart', 'vise');
  const score = at('goodhart', 'score');
  const grimpe = at('goodhart', 'grimpe');
  const niveau = at('goodhart', 'niveau');
  const goodhart = at('goodhart', 'Goodhart');
  const y1975 = late(at('goodhart', '1975'), 14);
  const both = ease(frame, 4, 30); // draw-on à l'entrée : les deux courbes montent ensemble
  const split = ease(frame, grimpe, grimpe + 45); // draw-on : le score s'envole, le niveau s'aplatit
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 580}}>
        <svg width={W} height={580} viewBox={`0 0 ${W} 580`} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
          {/* Le décor : les axes, le temps en abscisse. */}
          <Draw d={`M${AX.x0} ${AX.y1} V${AX.y0} H${AX.x1}`} p={ease(frame, 0, 12)} len={1300} width={6} color="#cfcfcf" />
          <Draw d={`M${AX.x0} 490 C 200 470, 320 400, ${MID.x} ${MID.niveau}`} p={both} len={460} width={10} color="#cfcfcf" />
          <Draw d={`M${AX.x0} 480 C 200 450, 320 380, ${MID.x} ${MID.score}`} p={both} len={460} width={10} color={accent} />
          <Draw d={`M${MID.x} ${MID.niveau} C 540 320, 680 310, 840 306`} p={split} len={440} width={10} color="#cfcfcf" />
          <Draw d={`M${MID.x} ${MID.score} C 560 290, 700 200, 830 40`} p={split} len={560} width={10} color={accent} />
        </svg>
        {/* La cible se pose sur la courbe du score, sur « vise » (pop in). */}
        <Pop at={vise} style={{position: 'absolute', left: MID.x - 50, top: MID.score - 50}}>
          <svg width={100} height={100} viewBox="0 0 100 100">
            {[46, 32, 18].map((r, k) => <circle key={r} cx="50" cy="50" r={r} fill={k % 2 ? '#000' : accent} stroke="#000" strokeWidth="3" />)}
            <circle cx="50" cy="50" r="7" fill="#fff" />
          </svg>
        </Pop>
        <Pop at={score + 2} style={{position: 'absolute', left: 150, top: 290}}><Mono size={56} color={accent}>score</Mono></Pop>
        <Pop at={niveau} style={{position: 'absolute', left: 600, top: 340}}><Mono size={56} color="#fff">niveau</Mono></Pop>
        {/* La fiche bristol avec le portrait pixelisé de Goodhart (collage), scotchée sur « Goodhart », entre l'axe et la courbe ;
            l'année s'écrit sur « 1975 » (typewriter). */}
        <Pop at={goodhart} style={{position: 'absolute', left: 180, top: 0}}>
          <div style={{position: 'relative', transform: 'rotate(-3deg)', background: '#f3eedf', border: '4px solid #000', boxShadow: pixelShadow('#444'), padding: '18px 22px', boxSizing: 'border-box', display: 'flex', alignItems: 'center', gap: 22}}>
            <Img src={staticFile('voix/benchmaxxing-goodhart.png')} style={{display: 'block', width: 120, height: 158, imageRendering: 'pixelated', border: '3px solid #000'}} />
            <div style={{display: 'flex', flexDirection: 'column', gap: 6}}>
              <Mono size={52} color="#111">Goodhart</Mono>
              <div style={{height: 80}}><Mono size={72} color={RED}>{typed(frame, y1975, '1975', 24)}</Mono></div>
            </div>
            <Tape style={{left: -26, top: -12, transform: 'rotate(-35deg)'}} />
            <Tape style={{right: -26, top: -12, transform: 'rotate(35deg)'}} />
          </div>
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 8. Chute : le modèle premier partout, et derrière lui la pile d'annales ----------

const CPOD = {w: 480, x: (W - 480) / 2, base: 600};
const CPOD_H = (CPOD.w * 130) / 300;
const STEP1_Y = CPOD.base - CPOD_H + CPOD_H * PODIUM_TOP; // haut de la marche du 1er
const MEDALS: [number, number][] = [[140, 90], [210, 300], [690, 90], [760, 300], [130, 500]];

const Chute: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const late = useLate();
  const premier = at('chute', 'premier');
  const partout = at('chute', 'partout');
  const demande = at('chute', 'demande');
  const fait = at('chute', 'fait');
  const annales = late(at('chute', 'annales'), 40);
  const pileFrom = Math.min(fait, annales - 14);
  const noteAt = annales + 8;
  const n = Math.floor((STEP1_Y - 10) / ANNALE_H);
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 640}}>
        <Board w={W} h={640} style={{left: 0, top: 0}}>
          {/* La pile d'annales de Mathis, derrière le modèle, jusqu'au plafond : cascade sur « fait les annales ». */}
          {/* Ordre des plans : la pile au fond, posée sur la marche du 1er, puis le podium, puis le modèle devant elle. */}
          <div style={{position: 'absolute', left: (W - 28) / 2 - 170, top: STEP1_Y - 14 - n * ANNALE_H - 4}}>
            <Pile n={n} w={340} from={pileFrom} />
          </div>
          {/* Le décor : le podium à la craie et le modèle sur la plus haute marche. */}
          <div style={{position: 'absolute', left: CPOD.x - 14, top: CPOD.base - CPOD_H - 14}}>
            <Podium w={CPOD.w} p={1} />
          </div>
          <div style={{position: 'absolute', left: (W - 28) / 2 - 110, top: STEP1_Y - 14 - 136}}><Model w={220} /></div>
          <Pop at={premier} style={{position: 'absolute', left: (W - 28) / 2 - 18, top: STEP1_Y + 6}}><Mono size={64} color={CHALK}>1</Mono></Pop>
          {/* « premier partout » : des médailles du 1er tout autour, en cascade ; elles ont servi et partent sur « demande ». */}
          {frame < demande + 6 && MEDALS.map(([x, y], k) => (
            <Pop key={k} at={partout + 3 * k} style={{position: 'absolute', left: x - 14 - 45, top: y - 14, opacity: frame >= demande ? gone(frame, demande) : 1}}>
              <div style={{width: 90, height: 90, borderRadius: 45, background: accent, border: '5px solid #000', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Mono size={52} color="#111">1</Mono>
              </div>
            </Pop>
          ))}
          {/* La copie de Mathis avec son 18 entouré, collée au tableau : l'image finale. */}
          <Pop at={noteAt} style={{position: 'absolute', left: 636, top: 200, width: 190, background: PAPER, border: '5px solid #000', boxShadow: pixelShadow('#222'), padding: '10px 14px 18px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, transform: 'rotate(5deg)'}}>
            <Note p={ease(frame, noteAt + 4, noteAt + 18)} size={72} />
            {[86, 70, 80].map((w, k) => <div key={k} style={{height: 8, width: `${w}%`, background: '#9a9384'}} />)}
            <Tape style={{left: 50, top: -18, width: 80}} />
          </Pop>
        </Board>
      </div>
    </Scene>
  );
};

// ---------- Montage ----------

const SCENES: Record<string, React.FC> = {hook: Hook, intro: Intro, bench: Bench, nom: Nom, annales: Annales, galaxy: Galaxy, llama: Llama, goodhart: Goodhart, chute: Chute};

export const BenchmaxxingVoix: React.FC = () => <V.Montage scenes={SCENES} accent={AC} />;

// Short Ancrage aux sources (YouTube / TikTok / Instagram), épisode 31, définition, voix off PAL - FR, monté le
// 2026-11-02 (calage provisoire, sans voix). Fiche ancrage-aux-sources de lexique/terms.js ; sources dans
// voix/ancrage.script.json : Anthropic, Reduce hallucinations (dire « je ne sais pas », citer mot pour mot, retirer
// toute phrase sans citation) ; Magesh et al. (Stanford, 30 mai 2024 : outils juridiques, 17 à 33 % d'erreurs) ;
// l'image de Patrice au quiz du repas de famille (scène inventée).
// Fil : l'ép. 30 finissait sur des références inventées ; ici, on oblige le modèle à montrer d'où vient chaque phrase.
// Le mécanisme est celui du schéma de la fiche (lexique/schemas/ancrage-aux-sources.svg) mis en mouvement : le
// document à gauche, la réponse à droite, un fil de chaque phrase vers son passage, la phrase sans fil retirée.
// Le schéma (fenêtre, document, phrases, fils) a la même géométrie dans intro, gestes et chute (SCH, ROWS, PASS).
// L'écran suit la voix et Le mouvement (univers.md) : chaque élément entre sur le mot qui le nomme (at), easing du kit,
// arc pour la pile de documents, un seul punch zoom (sur 33 %), sortie plus rapide que l'entrée (gone).
import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Big, Draw, Mono, Pop, Scene, arc, clamp, countUp, ease, punch, serif, useAccent, withAlpha} from './kit';
import {LABEL, makeVoix} from './voix/VoixShort';
import {Pixel, type Sprite} from './voix/Pixel';
import {Cross, pixelShadow} from './voix/Parts';
import ALIGN from './voix/ancrage.align.json';
import SCRIPT from './voix/ancrage.script.json';

const AC = '#5FD3C6'; // catégorie Méthode
const V = makeVoix(ALIGN, SCRIPT, 'voix/prediction-music.mp3');
const {at} = V;
export const ANCRAGEVOIX_DURATION = V.duration;

const RED = '#FF4D4D';
const PAPER = '#efe9dc';
const INK = '#9a9384';
const gone = (frame: number, until: number) => ease(frame, until, until + 6, [1, 0], 'inOut');
// Entrée / sortie identiques à celles de Scene, pour un calque posé hors de la Scene (le hook).
const useSceneOpacity = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  return interpolate(frame, [0, 6], [0, 1], clamp) * (1 - interpolate(frame, [durationInFrames - 5, durationInFrames], [0, 1], clamp));
};

// ---------- Le schéma de la fiche : document fourni, réponse, fils ----------

// La fenêtre de conversation (888 x 600), le document à gauche, trois phrases de réponse à droite.
const SCH = {w: 888, h: 600};
const DOC = {x: 30, y: 40, w: 280, h: 520};
const LINES = [0.86, 0.7, 0.82, 0.62, 0.78, 0.9, 0.66, 0.74]; // largeur des traits du document
const lineY = (k: number) => DOC.y + 40 + 58 * k + 8; // milieu du k-ième trait
const PASS = [1, 4, 6]; // le passage qui appuie chaque phrase
const ROWS = {x: 420, w: 438, h: 110, ys: [60, 230, 400]};
const rowY = (k: number) => ROWS.ys[k] + ROWS.h / 2;
const threadD = (k: number) => {
  const sx = DOC.x + DOC.w - 6;
  const sy = lineY(PASS[k]);
  const ex = ROWS.x;
  const ey = rowY(k);
  return `M${sx} ${sy} C${sx + 60} ${sy}, ${ex - 60} ${ey}, ${ex} ${ey}`;
};

// Le document fourni : une feuille avec ses traits ; `hl[k]` (0 à 1) surligne le passage de la phrase k.
const SourceDoc: React.FC<{hl?: number[]; pile?: boolean}> = ({hl = [], pile}) => {
  const accent = useAccent();
  return (
    <div style={{position: 'relative', width: DOC.w, height: DOC.h}}>
      {pile ? (
        <>
          <div style={{position: 'absolute', left: 18, top: -14, width: DOC.w, height: DOC.h, background: '#d9d2c3', transform: 'rotate(3deg)'}} />
          <div style={{position: 'absolute', left: 8, top: -6, width: DOC.w, height: DOC.h, background: '#e4ddcf', transform: 'rotate(1.5deg)'}} />
        </>
      ) : null}
      <div style={{position: 'absolute', inset: 0, background: PAPER, border: '6px solid #000', boxShadow: pixelShadow('#444'), boxSizing: 'border-box'}}>
        {LINES.map((w, k) => {
          const p = hl[PASS.indexOf(k)] ?? 0;
          const isPass = PASS.includes(k);
          return (
            <div key={k} style={{position: 'absolute', left: 24, top: 40 + 58 * k - 6, width: (DOC.w - 48) * w, height: 16}}>
              <div style={{position: 'absolute', inset: 0, background: INK}} />
              {isPass && p > 0 ? <div style={{position: 'absolute', left: -6, top: -6, bottom: -6, width: `calc(${p * 100}% + 12px)`, background: accent}} /> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Une phrase de la réponse : deux traits qui s'écrivent (`p` de 0 à 1) ; `red` : la phrase inventée ; `chip` : son chiffre.
const Row: React.FC<{k: number; p?: number; red?: number; lit?: number; chip?: string}> = ({k, p = 1, red = 0, lit = 0, chip}) => {
  const accent = useAccent();
  const ink = red > 0 ? RED : '#fff';
  const border = red > 0 ? RED : lit > 0 ? accent : '#8a8a8a';
  return (
    <div style={{position: 'absolute', left: ROWS.x, top: ROWS.ys[k], width: ROWS.w, height: ROWS.h, background: red > 0 ? withAlpha(RED, 0.18 * red) : '#151515', border: `5px solid ${border}`, borderRadius: 18, boxSizing: 'border-box', padding: '0 24px', display: 'flex', alignItems: 'center', gap: 20}}>
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: 14}}>
        <div style={{height: 14, width: `${88 * ease(p, 0, 0.6)}%`, background: ink}} />
        <div style={{height: 14, width: `${60 * ease(p, 0.4, 1)}%`, background: ink}} />
      </div>
      {chip ? <div style={{border: `4px solid ${lit > 0 ? accent : '#8a8a8a'}`, background: lit > 0 ? withAlpha(accent, 0.2) : 'transparent', borderRadius: 8, padding: '0 10px'}}><Mono size={48} color={lit > 0 ? accent : '#fff'}>{chip}</Mono></div> : null}
    </div>
  );
};

// La fenêtre de conversation : le décor du schéma.
const Frame: React.FC = () => <div style={{position: 'absolute', left: 0, top: 0, width: SCH.w, height: SCH.h, border: '6px solid #444', borderRadius: 30, boxSizing: 'border-box'}} />;

// Les fils : `links[k]` (0 à 1) dessine le fil de la phrase k (draw-on) ; `lit[k]` l'allume en couleur d'accent ;
// `stub` : le fil de la phrase inventée, en pointillé rouge, qui part et ne trouve rien.
const Threads: React.FC<{links: number[]; lit?: number[]; stub?: number}> = ({links, lit = [], stub = 0}) => {
  const accent = useAccent();
  return (
    <svg width={SCH.w} height={SCH.h} viewBox={`0 0 ${SCH.w} ${SCH.h}`} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
      {links.map((p, k) => (p > 0 ? <Draw key={k} d={threadD(k)} p={p} width={(lit[k] ?? 0) > 0 ? 12 : 8} len={320} color={(lit[k] ?? 0) > 0 ? accent : '#cfcfcf'} /> : null))}
      {stub > 0 ? <path d={`M${ROWS.x} ${rowY(2)} L${ROWS.x - 70 * stub} ${rowY(2)}`} stroke={RED} strokeWidth={8} strokeDasharray="12 10" strokeLinecap="round" /> : null}
    </svg>
  );
};

// ---------- Objets dessinés (SVG maison) ----------

// L'ancre : anneau, jas, verge, bras courbes et pattes.
const Anchor: React.FC<{w: number}> = ({w}) => {
  const accent = useAccent();
  return (
    <svg width={w} height={w * 1.2} viewBox="0 0 200 240" style={{overflow: 'visible'}}>
      <circle cx="100" cy="22" r="16" fill="none" stroke={accent} strokeWidth="10" />
      <rect x="40" y="50" width="120" height="16" rx="6" fill={accent} />
      <rect x="92" y="36" width="16" height="180" fill={accent} />
      <path d="M24 146 Q34 222 100 222 Q166 222 176 146" fill="none" stroke={accent} strokeWidth="16" strokeLinecap="round" />
      <path d="M6 156 L24 120 L44 156 Z" fill={accent} />
      <path d="M156 156 L176 120 L194 156 Z" fill={accent} />
    </svg>
  );
};

// La chaîne : des maillons alternés, vus de face puis de profil, de y0 à y1.
const Chain: React.FC<{x: number; y0: number; y1: number}> = ({x, y0, y1}) => {
  const n = Math.floor((y1 - y0) / 34);
  return (
    <svg width={80} height={y1 - y0} viewBox={`0 0 80 ${y1 - y0}`} style={{position: 'absolute', left: x - 40, top: y0}}>
      {Array.from({length: n}, (_, k) =>
        k % 2 ? <rect key={k} x={36} y={k * 34 - 6} width={8} height={52} rx={4} fill="#9a9a9a" /> : <rect key={k} x={24} y={k * 34} width={32} height={42} rx={16} fill="none" stroke="#bdbdbd" strokeWidth={7} />,
      )}
    </svg>
  );
};

// Une feuille posée de travers dans la pile du hook.
const Sheet: React.FC<{w: number; h: number; tilt: number}> = ({w, h, tilt}) => (
  <div style={{width: w, height: h, background: PAPER, border: '5px solid #000', boxShadow: pixelShadow('#333'), boxSizing: 'border-box', transform: `rotate(${tilt}deg)`, padding: '22px 26px', display: 'flex', flexDirection: 'column', gap: 14}}>
    {[0.9, 0.7, 0.8].map((x, k) => <div key={k} style={{height: 12, width: `${x * 100}%`, background: INK}} />)}
  </div>
);

// Le dictionnaire : fermé (couverture), puis ouvert (deux pages) ; `p` de 0 (fermé) à 1 (ouvert), retournement en scaleX.
const Dico: React.FC<{p: number}> = ({p}) => {
  const accent = useAccent();
  const closed = p < 0.5;
  const s = closed ? 1 - 2 * p : 2 * p - 1;
  return (
    <div style={{width: 340, height: 190, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{transform: `scaleX(${Math.max(0.02, s)})`}}>
        {closed ? (
          <div style={{width: 200, height: 170, background: '#7a2a2a', border: '6px solid #3a1414', borderLeft: '22px solid #3a1414', boxShadow: pixelShadow('#222'), boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div style={{width: 90, height: 14, background: '#e8c45a'}} />
          </div>
        ) : (
          <div style={{display: 'flex', boxShadow: pixelShadow('#222')}}>
            {[0, 1].map((side) => (
              <div key={side} style={{width: 168, height: 180, background: '#f6f1e6', border: '5px solid #3a1414', borderLeftWidth: side ? 2 : 5, borderRightWidth: side ? 5 : 2, boxSizing: 'border-box', padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 12}}>
                {[0.9, 0.7, 0.85, 0.6, 0.8].map((x, k) => <div key={k} style={{height: 10, width: `${x * 100}%`, background: side && k === 2 ? accent : INK}} />)}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ---------- Personnages (pixel art, même format que voix/Pixel.tsx) ----------

const SKIN = '#e3b58e';
const SKIN2 = '#c99470';

// Patrice : dégarni, moustache, pull rouge brique. Assis : le bas du sprite passe sous la nappe.
const PATRICE: Sprite = {
  rows: [
    '..............',
    '.....SSSS.....',
    '....HSSSSH....',
    '....SESSES....',
    '....SSSSSS....',
    '....SMMMMS....',
    '.....SSSS.....',
    '...PPPPPPPP...',
    '..PPPPPPPPPP..',
    '..PPPPPPPPPP..',
    '..SPPPPPPPPS..',
    '..SPPPPPPPPS..',
    '....PPPPPP....',
    '....PPPPPP....',
  ],
  palette: {H: '#5a4632', S: SKIN, E: '#111', M: '#5a4632', P: '#b5523f'},
};
// La main levée : le bras droit monte au-dessus de la tête.
const PATRICE_UP: Sprite = {
  rows: [
    '............SS',
    '.....SSSS...SS',
    '....HSSSSH..PP',
    '....SESSES..PP',
    '....SSSSSS..PP',
    '....SMMMMS..PP',
    '.....SSSS...PP',
    '...PPPPPPPPPP.',
    '..PPPPPPPPPP..',
    '..PPPPPPPPPP..',
    '..SPPPPPPPP...',
    '..SPPPPPPPP...',
    '....PPPPPP....',
    '....PPPPPP....',
  ],
  palette: PATRICE.palette,
};
// La grand-mère : chignon gris, gilet vert.
const MAMIE: Sprite = {
  rows: [
    '....GGGG....',
    '...GGGGGG...',
    '..GGSSSSGG..',
    '..GSESSESG..',
    '..GSSSSSSG..',
    '...SSRRSS...',
    '....SSSS....',
    '..VVVVVVVV..',
    '.VVVVVVVVVV.',
    '.VVVVVVVVVV.',
    '.SVVVVVVVVS.',
    '.SVVVVVVVVS.',
    '...VVVVVV...',
    '...VVVVVV...',
  ],
  palette: {G: '#d8d8d8', S: SKIN, E: '#111', R: '#b5524f', V: '#5f8a55'},
};
// Le petit cousin : cheveux bruns, tee-shirt jaune, plus petit.
const COUSIN: Sprite = {
  rows: [
    '..HHHHHH..',
    '.HHHHHHHH.',
    '.HSSSSSSH.',
    '..SESSES..',
    '..SSSSSS..',
    '..SSRRSS..',
    '...SSSS...',
    '.YYYYYYYY.',
    'YYYYYYYYYY',
    'SYYYYYYYYS',
    '.YYYYYYYY.',
  ],
  palette: {H: '#4b2e1e', S: SKIN2, E: '#111', R: '#8a3a3a', Y: '#e8c45a'},
};

// ---------- 0. Hook : le titre, et derrière l'ancre dont la chaîne descend vers la pile de documents ----------

const Hook: React.FC = () => {
  const op = useSceneOpacity();
  return (
    <>
      {/* Posée dès la première image, à droite du titre (aucun sous-titre dans le hook) : la chaîne tombe du haut du cadre, l'ancre mord dans la pile. */}
      <AbsoluteFill style={{opacity: op}}>
        <Chain x={930} y0={0} y1={1260} />
        <div style={{position: 'absolute', left: 690, top: 1350}}><Sheet w={300} h={150} tilt={-4} /></div>
        <div style={{position: 'absolute', left: 740, top: 1300}}><Sheet w={280} h={140} tilt={5} /></div>
        <div style={{position: 'absolute', left: 820, top: 1110, lineHeight: 0}}><Anchor w={220} /></div>
      </AbsoluteFill>
      <V.TitleHook lead="C'est quoi ?" lines={["l'ancrage", 'aux sources']} cue="l'ancrage" />
    </>
  );
};

// ---------- 1. Intro : les documents donnés à l'IA, la réponse, la phrase inventée, puis les fils ----------

const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const documents = at('intro', 'documents');
  const ia = at('intro', 'IA');
  const inventer = at('intro', 'inventer');
  const dou = at('intro', "d'où");
  const chaque = at('intro', 'chaque');
  // La pile de documents arrive en arc dans la conversation, sur « documents ».
  const fly = spring({frame: frame - documents, fps, config: {damping: 15, stiffness: 120}});
  const [px, py] = arc(fly, [-260, 760], [DOC.x, DOC.y], 90);
  // La réponse s'écrit phrase après phrase à partir de « IA » ; la troisième rougit sur « inventer ».
  const rowP = [0, 1, 2].map((k) => ease(frame, ia + k * 12, ia + k * 12 + 12));
  const red = ease(frame, inventer, inventer + 8);
  // draw-on : sur « d'où », un fil se tend de chaque phrase vers son passage ; la phrase inventée n'en trouve pas.
  const links = [0, 1].map((k) => ease(frame, dou + k * 3, dou + k * 3 + 14));
  const hl = links.map((p) => ease(p, 0.8, 1));
  const stub = ease(frame, chaque, chaque + 10);
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: SCH.h}}>
        {/* Le décor : la fenêtre de conversation, posée dès l'entrée. */}
        <Pop at={2} style={{position: 'absolute', inset: 0}}><Frame /></Pop>
        <div style={{position: 'absolute', left: px, top: py, opacity: frame >= documents ? 1 : 0}}>
          <SourceDoc pile hl={hl} />
        </div>
        {frame >= ia ? [0, 1, 2].map((k) => <Row key={k} k={k} p={rowP[k]} red={k === 2 ? red : 0} />) : null}
        <Threads links={[...links, 0]} stub={stub} />
      </div>
    </Scene>
  );
};

// ---------- 2. Le nom : une affirmation, son passage exact, puis le terme ----------

const Nom: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const affirmation = at('nom', 'affirmation');
  const passage = at('nom', 'passage');
  const exact = at('nom', 'exact');
  const cest = at('nom', "c'est");
  const ancrage = at('nom', "l'ancrage");
  const aux = at('nom', 'aux');
  const grounding = at('nom', 'grounding');
  const out = gone(frame, cest);
  const hl = ease(frame, passage, passage + 10);
  const link = ease(frame, exact, exact + 14);
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: SCH.h}}>
        {/* Le schéma réduit à une phrase : le document posé dès l'entrée, l'affirmation, son passage, le fil. */}
        <div style={{position: 'absolute', inset: 0, opacity: out}}>
          <Pop at={2} style={{position: 'absolute', left: DOC.x, top: DOC.y}}>
            <SourceDoc hl={[0, hl]} />
          </Pop>
          <Pop at={affirmation} style={{position: 'absolute', inset: 0}}>
            <Row k={1} />
          </Pop>
          <Pop at={affirmation + 5} style={{position: 'absolute', left: ROWS.x, top: ROWS.ys[1] + ROWS.h + 20}}>
            <Mono size={52} color="#fff">affirmation</Mono>
          </Pop>
          <Threads links={[0, link, 0]} />
          <Pop at={exact + 5} style={{position: 'absolute', left: ROWS.x, top: ROWS.ys[1] - 90}}>
            <Mono size={52} color={accent}>passage exact</Mono>
          </Pop>
        </div>
        {/* pop in : le terme, en français puis en anglais en couleur d'accent, écrit comme la voix le dit (sous-titre masqué par onscreen). */}
        <Pop at={ancrage} style={{position: 'absolute', left: 0, top: 40, width: SCH.w}}>
          <Big size={124}>l'ancrage</Big>
        </Pop>
        <Pop at={aux} style={{position: 'absolute', left: 0, top: 170, width: SCH.w}}>
          <Big size={124}>aux sources</Big>
        </Pop>
        <Pop at={grounding} style={{position: 'absolute', left: 0, top: 380, width: SCH.w}}>
          <Big size={124} color={accent}>grounding</Big>
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 3. L'image : Patrice au quiz du repas de famille ----------

const TABLE_Y = 470; // haut de la nappe, dans la zone du schéma
const PX = 16;

// Une bulle « je passe » qui sort de Patrice.
const PassBubble: React.FC = () => (
  <div style={{position: 'relative', background: '#fff', borderRadius: 26, padding: '10px 26px'}}>
    <Mono size={52} color="#111">je passe</Mono>
    <div style={{position: 'absolute', left: 40, bottom: -22, width: 0, height: 0, borderLeft: '14px solid transparent', borderRight: '14px solid transparent', borderTop: '24px solid #fff'}} />
  </div>
);

const Patrice: React.FC = () => {
  const frame = useCurrentFrame();
  const patrice = at('patrice', 'Patrice');
  const quiz = at('patrice', 'quiz');
  const asks = [at('patrice', 'répond'), at('patrice', 'tout'), at('patrice', 'aplomb')];
  const page = at('patrice', 'page');
  const dico = at('patrice', 'dictionnaire');
  const passe = at('patrice', 'passe');
  // Il lève la main à chaque question ; une croix rouge s'inscrit au tableau 6 images après.
  const up = asks.some((t) => frame >= t && frame < t + 12);
  // stagger : trois bulles « je passe » en cascade à partir de « passe » ; chaque croix s'efface après sa bulle.
  const bubbles = [0, 1, 2].map((k) => passe + k * 10);
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 760}}>
        {/* Le tableau de score, derrière la table, sur « quiz » : les croix de Patrice. */}
        <Pop at={quiz} style={{position: 'absolute', left: 520, top: 30, width: 368, height: 250, background: '#1f3a2c', border: '14px solid #8a5a2b', boxSizing: 'border-box', boxShadow: pixelShadow('#222')}}>
          {asks.map((t, k) => {
            const erase = ease(frame, bubbles[k] + 4, bubbles[k] + 10, [1, 0], 'inOut');
            return frame >= t + 6 ? (
              <div key={k} style={{position: 'absolute', left: 22 + k * 108, top: 64, lineHeight: 0, opacity: erase}}>
                <Cross p={ease(frame, t + 6, t + 16)} size={96} color={RED} />
              </div>
            ) : null;
          })}
        </Pop>
        {/* La famille, assise : posée dès l'entrée (le décor). */}
        <Pop at={2} style={{position: 'absolute', left: 320, top: TABLE_Y - 11 * PX, lineHeight: 0}}>
          <Pixel sprite={MAMIE} px={PX} seed={2} />
        </Pop>
        <Pop at={2} style={{position: 'absolute', left: 640, top: TABLE_Y - 9 * PX, lineHeight: 0}}>
          <Pixel sprite={COUSIN} px={PX} seed={5} />
        </Pop>
        {/* Patrice, sur son nom ; il lève la main à chaque question. */}
        <Pop at={patrice} style={{position: 'absolute', left: 30, top: TABLE_Y - 11 * PX, lineHeight: 0}}>
          <Pixel sprite={up ? PATRICE_UP : PATRICE} px={PX} seed={1} />
        </Pop>
        {/* La table et sa nappe, devant les personnages. */}
        <Pop at={0} style={{position: 'absolute', left: -20, top: TABLE_Y, width: SCH.w + 40, height: 260, background: '#6e2b2b', borderTop: '14px solid #8e3a3a', boxSizing: 'border-box'}}>
          <div />
        </Pop>
        {/* Son nom, sur la nappe, devant lui. */}
        <Pop at={patrice + 5} style={{position: 'absolute', left: 30, top: TABLE_Y + 150}}>
          <Mono size={52} color="#fff">Patrice</Mono>
        </Pop>
        {/* Le dictionnaire, au milieu de la table : il arrive sur « page » et s'ouvre sur « dictionnaire ». */}
        <Pop at={page} style={{position: 'absolute', left: 290, top: TABLE_Y + 20, lineHeight: 0}}>
          <Dico p={ease(frame, dico, dico + 12, [0, 1], 'inOut')} />
        </Pop>
        {/* Les trois bulles « je passe », de bas en haut, au-dessus de Patrice. */}
        {bubbles.map((t, k) => (
          <Pop key={k} at={t} style={{position: 'absolute', left: 10 + k * 90, top: 200 - k * 100}}>
            <PassBubble />
          </Pop>
        ))}
      </div>
    </Scene>
  );
};

// ---------- 4. Les gestes : trois consignes en cascade, et la phrase sans fil retirée ----------

const CARD = {h: 96, gap: 18};
const S_G = 0.72; // schéma réduit sous les cartes (aucun texte dedans)

const Gestes: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const trois = at('gestes', 'trois');
  const je = at('gestes', 'je');
  const citer = at('gestes', 'citer');
  const passage = at('gestes', 'passage');
  const retirer = at('gestes', 'retirer');
  const toute = at('gestes', 'toute');
  const nen = at('gestes', "n'en");
  const CARDS: [number, string, string][] = [
    [je, '1', 'je ne sais pas'],
    [citer, '2', 'mot pour mot'],
    [retirer, '3', 'retirer'],
  ];
  const links = [0, 1].map((k) => ease(frame, passage + k * 3, passage + k * 3 + 14));
  const hl = links.map((p) => ease(p, 0.8, 1));
  const cross = ease(frame, toute, toute + 10);
  // La phrase barrée sort du cadre par la droite (inOut), plus vite qu'elle n'est entrée.
  const outX = ease(frame, nen, nen + 12, [0, 900], 'inOut');
  const outO = ease(frame, nen + 4, nen + 12, [1, 0], 'inOut');
  const schemaTop = 3 * CARD.h + 2 * CARD.gap + 40;
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: schemaTop + SCH.h * S_G}}>
        {/* stagger : trois emplacements sur « trois », puis chaque carte tombe dans le sien sur son mot. */}
        {CARDS.map(([t, n, label], k) => {
          const fall = ease(frame, t, t + 10, [-70, 0]);
          return (
            <div key={k} style={{position: 'absolute', left: 0, top: k * (CARD.h + CARD.gap), width: SCH.w, height: CARD.h}}>
              <Pop at={trois + k * 3} style={{position: 'absolute', inset: 0, border: '4px dashed #6a6a6a', borderRadius: 16, opacity: frame >= t ? 0 : 1}}>
                <div />
              </Pop>
              {frame >= t ? (
                <div style={{position: 'absolute', inset: 0, transform: `translateY(${fall}px)`, opacity: ease(frame, t, t + 4), background: '#151515', border: `5px solid ${k === 2 ? RED : accent}`, borderRadius: 16, boxSizing: 'border-box', display: 'flex', alignItems: 'center', gap: 28, overflow: 'hidden'}}>
                  <div style={{width: CARD.h - 10, alignSelf: 'stretch', background: k === 2 ? RED : accent, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Mono size={60} color="#111">{n}</Mono>
                  </div>
                  <Mono size={60} color="#fff">{label}</Mono>
                </div>
              ) : null}
            </div>
          );
        })}
        {/* Le schéma de la fiche, posé dès l'entrée : la phrase inventée en rouge, sans fil. */}
        <Pop at={2} style={{position: 'absolute', left: (SCH.w - SCH.w * S_G) / 2, top: schemaTop}}>
          <div style={{position: 'relative', width: SCH.w, height: SCH.h, transform: `scale(${S_G})`, transformOrigin: 'left top'}}>
            <Frame />
            <div style={{position: 'absolute', left: DOC.x, top: DOC.y}}><SourceDoc hl={hl} /></div>
            <Row k={0} />
            <Row k={1} />
            <div style={{position: 'absolute', left: 0, top: 0, transform: `translateX(${outX}px)`, opacity: outO}}>
              <Row k={2} red={1} />
              <div style={{position: 'absolute', left: ROWS.x + ROWS.w / 2 - 70, top: ROWS.ys[2] - 15, lineHeight: 0, opacity: frame >= toute ? 1 : 0}}>
                <Cross p={cross} size={140} color={RED} />
              </div>
            </div>
            <Threads links={[...links, 0]} />
          </div>
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 5. La limite : l'invention réduite, pas supprimée ; l'article de Stanford, 17 à 33 % ----------

// Collage recréé de l'article (cadre papier, scotch, titre en texte).
// À REMPLACER par public/voix/ancrage-stanford.png (capture arXiv, Magesh et al., « Hallucination-Free? »).
const StanfordCollage: React.FC = () => (
  <div style={{position: 'relative', transform: 'rotate(-1.5deg)'}}>
    <div style={{width: 700, background: '#fff', border: '5px solid #fff', boxShadow: pixelShadow('#333'), padding: '26px 34px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 14}}>
      <Mono size={48} color="#b31b1b">arXiv · mai 2024</Mono>
      <div style={{fontFamily: serif, fontWeight: 800, fontSize: 64, lineHeight: 1.05, color: '#111'}}>Hallucination-Free?</div>
      <div style={{fontFamily: serif, fontWeight: 400, fontSize: 48, lineHeight: 1.1, color: '#333'}}>Assessing the Reliability of Leading AI Legal Research Tools</div>
      <Mono size={48} color="#555">Stanford</Mono>
    </div>
    <div style={{position: 'absolute', left: -18, top: -10, width: 80, height: 26, background: 'rgba(239,233,220,0.85)', transform: 'rotate(-30deg)'}} />
    <div style={{position: 'absolute', right: -18, bottom: -10, width: 80, height: 26, background: 'rgba(239,233,220,0.85)', transform: 'rotate(-30deg)'}} />
  </div>
);

const GAUGE_Y = 620;

const Limite: React.FC = () => {
  const frame = useCurrentFrame();
  const reduit = at('limite', 'réduit');
  const y2024 = at('limite', '2024');
  const chercheurs = at('limite', 'chercheurs');
  const outils = at('limite', 'outils');
  const n17 = at('limite', '17');
  const n33 = at('limite', '33');
  const questions = at('limite', 'questions');
  // La jauge de l'invention, pleine à l'entrée, descend sur « réduit » sans toucher zéro ; elle se vide sur « 2024 ».
  const inv = frame < y2024 ? ease(frame, reduit, reduit + 18, [100, 28], 'inOut') : 0;
  const invOut = gone(frame, y2024);
  // bar grow puis count-up : 17 % sur « 17 », jusqu'à 33 % sur « 33 », punch zoom à l'arrivée (le seul du short).
  const COUNT = 30;
  const err = frame < n33 ? ease(frame, n17, n17 + 8, [0, 17]) : ease(frame, n33, n33 + COUNT, [17, 33]);
  const num = frame < n33 ? countUp(frame, n17, 17, 8) : countUp(frame, n33, 33, COUNT, 0, 17);
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 820}}>
        {/* pop in : l'article de Stanford en collage, sur « chercheurs ». */}
        <div style={{position: 'absolute', left: (SCH.w - 700) / 2, top: 0}}>
          <Pop at={chercheurs}>
            <StanfordCollage />
          </Pop>
        </div>
        {/* Les libellés au-dessus de la jauge : « l'invention », puis « outils juridiques ». */}
        <div style={{position: 'absolute', left: 0, top: GAUGE_Y - 80, opacity: invOut}}>
          <Pop at={2}><Mono size={52} color="#fff">l'invention</Mono></Pop>
        </div>
        <Pop at={outils} style={{position: 'absolute', left: 0, top: GAUGE_Y - 80}}>
          <Mono size={52} color="#fff">outils juridiques</Mono>
        </Pop>
        {/* La jauge : posée dès l'entrée (le décor de la scène). */}
        <Pop at={0} style={{position: 'absolute', left: 0, top: GAUGE_Y, width: SCH.w, display: 'flex', alignItems: 'center', gap: 28}}>
          <div style={{position: 'relative', flex: 1, height: 90, border: '6px solid #fff', boxSizing: 'border-box'}}>
            <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: `${inv}%`, background: RED, opacity: invOut}} />
            {frame >= n17 ? <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: `${err}%`, background: RED}} /> : null}
          </div>
          <div style={{width: 250, transform: `scale(${punch(frame, n33 + COUNT)})`, transformOrigin: 'right center', display: 'flex', justifyContent: 'flex-end', opacity: frame >= n17 ? 1 : 0}}>
            <Mono size={96} color="#fff">{`${num} %`}</Mono>
          </div>
        </Pop>
        <Pop at={questions} style={{position: 'absolute', left: 0, top: GAUGE_Y + 120}}>
          <Mono size={52} color={LABEL}>des questions</Mono>
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 6. Chute : la réponse et ses fils ; on ouvre la source du premier chiffre ----------

const CHIPS = ['17 %', '33 %', '2024'];

const Chute: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const cite = at('chute', 'cite');
  const ouvre = at('chute', 'ouvre');
  const chiffres = at('chute', 'chiffres');
  // Les fils se dessinent sur « cite » ; ils s'allument en cascade sur « chiffres ».
  const links = [0, 1, 2].map((k) => (frame >= cite ? ease(frame, cite + k * 3, cite + k * 3 + 14) : 0));
  const lit = [0, 1, 2].map((k) => (frame >= chiffres + k * 3 ? 1 : 0));
  const hl = [0, 1, 2].map((k) => (lit[k] ? 1 : k === 0 && frame >= ouvre ? 1 : 0));
  // Sur « ouvre », la source du premier fil s'ouvre sous la fenêtre : la page, son passage, et le chiffre dedans.
  const lead = ease(frame, ouvre, ouvre + 12);
  const PAGE = {x: 120, y: SCH.h + 40, w: 640, h: 180};
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: PAGE.y + PAGE.h}}>
        {/* Reprise du schéma, posée dès l'entrée : la fenêtre, le document, trois phrases chiffrées. */}
        <Pop at={0} style={{position: 'absolute', inset: 0}}>
          <Frame />
          <div style={{position: 'absolute', left: DOC.x, top: DOC.y}}><SourceDoc hl={hl} /></div>
          {[0, 1, 2].map((k) => <Row key={k} k={k} chip={CHIPS[k]} lit={lit[k]} />)}
        </Pop>
        <Threads links={links} lit={lit} />
        {/* draw-on : le renvoi du premier passage vers la page ouverte. */}
        {frame >= ouvre ? (
          <svg width={SCH.w} height={PAGE.y + 10} viewBox={`0 0 ${SCH.w} ${PAGE.y + 10}`} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
            <rect x={DOC.x + 12} y={lineY(PASS[0]) - 20} width={DOC.w - 24} height={40} fill="none" stroke={accent} strokeWidth={6} rx={6} />
            <Draw d={`M${DOC.x + 12} ${lineY(PASS[0])} C${-14} ${lineY(PASS[0])}, ${-14} ${PAGE.y - 60}, ${PAGE.x} ${PAGE.y + 40}`} p={lead} width={8} len={700} />
          </svg>
        ) : null}
        <Pop at={ouvre + 8} style={{position: 'absolute', left: PAGE.x, top: PAGE.y}}>
          <div style={{width: PAGE.w, height: PAGE.h, background: PAPER, border: `6px solid ${accent}`, boxShadow: pixelShadow(withAlpha(accent, 0.35)), boxSizing: 'border-box', padding: '22px 30px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 16}}>
            <div style={{height: 14, width: '80%', background: INK}} />
            <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
              <div style={{height: 14, width: 150, background: INK}} />
              <div style={{background: withAlpha(accent, 0.6), padding: '0 10px'}}><Mono size={56} color="#111">17 %</Mono></div>
              <div style={{height: 14, width: 120, background: INK}} />
            </div>
            <div style={{height: 14, width: '64%', background: INK}} />
          </div>
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- Montage ----------

const SCENES: Record<string, React.FC> = {hook: Hook, intro: Intro, nom: Nom, patrice: Patrice, gestes: Gestes, limite: Limite, chute: Chute};

export const AncrageVoix: React.FC = () => <V.Montage scenes={SCENES} accent={AC} />;

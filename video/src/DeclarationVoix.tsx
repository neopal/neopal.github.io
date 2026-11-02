// Short Déclaration d'usage de l'IA (YouTube / TikTok / Instagram), épisode 30, définition, voix off PAL - FR, monté la
// semaine du 3 novembre 2026 (calage provisoire, sans voix). Fiche declaration-d-usage-de-l-ia de lexique/terms.js ;
// sources dans voix/declaration.script.json : The Register, 6 octobre 2025 (rapport Deloitte facturé 440 000 dollars
// australiens, fausses références et citation inventée d'une décision de justice, version corrigée qui mentionne
// Azure OpenAI GPT-4o dans sa méthode, dernière tranche remboursée) ; règlement européen sur l'IA, article 50 (applicable
// le 2 août 2026) ; l'image du mémoire de Léa relu par M. Perrin (scène inventée).
// Fil : l'ép. 29 demandait quelles tâches partent à l'IA ; quand c'est elle qui a écrit, encore faut-il le dire.
// Le même bas de document (DOC) revient au hook (quatre lignes vides), au nom (elles se remplissent) et à la chute
// (la troisième s'allume). Ses libellés font 3 mots au plus : la troisième ligne s'écrit « on a relu » (la voix dit
// « comment on a relu », quatre mots), la même dans nom et chute.
// Collages : les captures de The Register et de l'article 50 ne sont pas encore produites ; deux collages sobres en
// tiennent la place (cadre papier, scotch, titre en texte simple, corps en traits gris), sans titre inventé.
// L'écran suit la voix et Le mouvement (univers.md) : chaque élément entre sur le mot qui le nomme (at), easing du kit,
// arcs pour ce qui vole (billets, coche, page), un seul punch zoom (sur 440 000), italique d'accent au hook et au nom.
import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Big, Check, Draw, Highlight, Mono, Pop, Say, Scene, W, arc, clamp, countUp, ease, punch, typed, useAccent, withAlpha} from './kit';
import {blink, makeVoix} from './voix/VoixShort';
import {Pixel, type Sprite} from './voix/Pixel';
import {Stamp, pixelShadow} from './voix/Parts';
import ALIGN from './voix/declaration.align.json';
import SCRIPT from './voix/declaration.script.json';

const AC = '#5FD3C6'; // catégorie Méthode
const V = makeVoix(ALIGN, SCRIPT, 'voix/prediction-music.mp3');
const {at} = V;
export const DECLARATIONVOIX_DURATION = V.duration;

const RED = '#FF4D4D';
const PAPER = '#efe9dc';
const INK = '#111';
const BAR = '#9a9384'; // les traits gris du texte imprimé
const gone = (frame: number, until: number) => ease(frame, until, until + 6, [1, 0], 'inOut');
// Entrée / sortie identiques à celles de Scene, pour un calque posé hors de la Scene (hook seulement : la chute ne sort pas).
const useSceneOpacity = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  return interpolate(frame, [0, 6], [0, 1], clamp) * (1 - interpolate(frame, [durationInFrames - 5, durationInFrames], [0, 1], clamp));
};

// ---------- Personnages (pixel art, même format que voix/Pixel.tsx) ----------

const SKIN = '#e3b58e';

// Toi (intro) : cheveux courts, pull vert.
const TOI: Sprite = {
  rows: [
    '....HHHH....',
    '...HHHHHH...',
    '...HSSSSH...',
    '...SESSES...',
    '...SSSSSS...',
    '...SSRRSS...',
    '....SSSS....',
    '..GGGGGGGG..',
    '.GGGGGGGGGG.',
    '.GGGGGGGGGG.',
    '.SGGGGGGGGS.',
    '.SGGGGGGGGS.',
    '...PPPPPP...',
    '...PPPPPP...',
  ],
  palette: {H: '#2a2a2a', S: SKIN, E: '#111', R: '#b5524f', G: '#4f8a5b', P: '#3a3a5a'},
};

// Léa, la stagiaire : cheveux châtains longs, pull framboise.
const LEA: Sprite = {
  rows: [
    '...HHHHHH...',
    '..HHHHHHHH..',
    '..HSSSSSSH..',
    '..HSESSESH..',
    '..HSSSSSSH..',
    '..HSSRRSSH..',
    '..HHSSSSHH..',
    '..HHSSSSHH..',
    '.LLLLLLLLLL.',
    '.LLLLLLLLLL.',
    '.SLLLLLLLLS.',
    '.SLLLLLLLLS.',
    '...JJJJJJ...',
    '...JJJJJJ...',
  ],
  palette: {H: '#6b3e26', S: SKIN, E: '#111', R: '#b5524f', L: '#c2455a', J: '#2f3b5a'},
};

// M. Perrin, le tuteur, en buste pour sa photo : cheveux gris, lunettes, moustache, veste et cravate.
const PERRIN: Sprite = {
  rows: [
    '....HHHH....',
    '...HHHHHH...',
    '..HSSSSSSH..',
    '...GEGGEG...',
    '...SSSSSS...',
    '...SMMMMS...',
    '....SSSS....',
    '..CCWKKWCC..',
    '.CCCCKKCCCC.',
    '.CCCCKKCCCC.',
    '.CCCCCCCCCC.',
  ],
  palette: {H: '#b9b9b9', S: SKIN, E: '#111', G: '#2b2b2b', M: '#7a7a7a', C: '#4a4a55', W: '#f2f2f2', K: '#7a2a2a'},
};

// ---------- Le bas du document : quelques traits de texte, un filet, puis les quatre lignes ----------

const ROWS = ['quelle IA', 'à quoi', 'on a relu', 'qui en répond'];
const ROW_H = 92;

// texts : ce qui est écrit sur chaque ligne (déjà tapé) ; hi / hiP : la ligne allumée en accent ; caret : curseur
// qui clignote au bout de cette ligne.
const FootDoc: React.FC<{texts: string[]; body?: number; hi?: number; hiP?: number; caret?: number}> = ({texts, body = 3, hi = -1, hiP = 0, caret = -1}) => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  return (
    <div style={{width: W, background: PAPER, border: '6px solid #000', boxShadow: pixelShadow('#444'), padding: '34px 56px 40px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column'}}>
      {Array.from({length: body}, (_, k) => <div key={k} style={{height: 20, width: `${[94, 82, 90, 70, 86][k % 5]}%`, background: BAR, marginBottom: 22}} />)}
      <div style={{height: 6, width: '36%', background: INK, margin: '14px 0 10px'}} />
      {ROWS.map((_, k) => (
        <div key={k} style={{position: 'relative', height: ROW_H, display: 'flex', alignItems: 'center', gap: 26, borderBottom: `4px dashed ${BAR}`}}>
          {k === hi ? <div style={{position: 'absolute', left: -14, right: -14, top: 8, bottom: 8, background: accent, transform: `scaleX(${hiP})`, transformOrigin: 'left center'}} /> : null}
          <div style={{position: 'relative', width: 20, height: 20, background: INK, flexShrink: 0}} />
          <div style={{position: 'relative', display: 'flex', alignItems: 'center', gap: 6}}>
            <Mono size={52} color={INK}>{texts[k] ?? ''}</Mono>
            {k === caret ? <div style={{width: 8, height: 54, background: INK, opacity: blink(frame)}} /> : null}
          </div>
        </div>
      ))}
    </div>
  );
};

// ---------- Le rapport, ses pages, les collages ----------

// La couverture du rapport relié : bleu nuit, reliure à anneaux, titre en traits blancs.
const COVER = {w: 340, h: 460};
const Cover: React.FC = () => (
  <div style={{position: 'relative', width: COVER.w, height: COVER.h, background: '#1f3550', border: '6px solid #0f1d30', boxShadow: pixelShadow('#222'), boxSizing: 'border-box'}}>
    <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: 40, background: '#14243a'}} />
    {[0, 1, 2, 3, 4].map((k) => <div key={k} style={{position: 'absolute', left: 10, top: 40 + k * 84, width: 22, height: 14, background: '#cfcfcf'}} />)}
    <div style={{position: 'absolute', left: 74, top: 70, width: 210, height: 24, background: '#f2f2f2'}} />
    <div style={{position: 'absolute', left: 74, top: 114, width: 160, height: 24, background: '#f2f2f2'}} />
    <div style={{position: 'absolute', left: 74, top: 172, width: 200, height: 12, background: '#7f93b0'}} />
    <div style={{position: 'absolute', left: 74, top: 380, width: 120, height: 12, background: '#7f93b0'}} />
  </div>
);

// Une feuille de papier posée (fond, bordure, ombre pixel), contenu en absolu.
const Sheet: React.FC<{w: number; h: number; children?: React.ReactNode}> = ({w, h, children}) => (
  <div style={{position: 'relative', width: w, height: h, background: PAPER, border: '6px solid #000', boxShadow: pixelShadow('#444'), boxSizing: 'border-box', overflow: 'hidden'}}>{children}</div>
);

// Le scotch aux deux coins d'un collage.
const Tape: React.FC = () => (
  <>
    <div style={{position: 'absolute', left: -18, top: -10, width: 90, height: 28, background: 'rgba(239,233,220,0.85)', transform: 'rotate(-30deg)'}} />
    <div style={{position: 'absolute', right: -18, bottom: -10, width: 90, height: 28, background: 'rgba(239,233,220,0.85)', transform: 'rotate(-30deg)'}} />
  </>
);

// À REMPLACER par public/voix/declaration-register.png (capture du titre de l'article de The Register, 6 octobre 2025),
// avec le Collage à <Img> de HumanLoopVoix.tsx. En attendant : le nom du site et « Deloitte » en texte simple, le titre
// et le corps en traits (aucun titre inventé).
const REG = {w: 760, h: 420};
const RegisterCollage: React.FC = () => (
  <div style={{position: 'relative', transform: 'rotate(-2deg)'}}>
    <div style={{position: 'relative', width: REG.w, height: REG.h, background: '#fff', border: '5px solid #fff', boxShadow: pixelShadow('#333'), boxSizing: 'border-box', padding: '28px 40px', display: 'flex', flexDirection: 'column', gap: 18}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 16, borderBottom: '5px solid #b01e1e', paddingBottom: 12}}>
        <div style={{width: 26, height: 26, background: '#b01e1e'}} />
        <Mono size={48} color="#b01e1e">The Register</Mono>
      </div>
      <Big size={104} color={INK}>Deloitte</Big>
      <div style={{height: 26, width: '92%', background: '#333'}} />
      <div style={{height: 26, width: '70%', background: '#333'}} />
      <div style={{height: 14, width: '88%', background: '#b8b8b8', marginTop: 10}} />
      <div style={{height: 14, width: '76%', background: '#b8b8b8'}} />
    </div>
    <Tape />
  </div>
);

// À REMPLACER par public/voix/declaration-article50.png (capture de l'article 50 du règlement européen sur l'IA,
// artificialintelligenceact.eu), avec le Collage à <Img> de HumanLoopVoix.tsx. En attendant : le titre « Article 50 »
// en texte simple, le corps en traits ; `hiP` surligne le trait de l'obligation.
const ART = {w: 760, h: 400};
const ArticleCollage: React.FC<{hiP: number}> = ({hiP}) => {
  const accent = useAccent();
  return (
    <div style={{position: 'relative', transform: 'rotate(1.5deg)'}}>
      <div style={{position: 'relative', width: ART.w, height: ART.h, background: '#fff', border: '5px solid #fff', boxShadow: pixelShadow('#333'), boxSizing: 'border-box', padding: '30px 40px', display: 'flex', flexDirection: 'column', gap: 20}}>
        <div style={{alignSelf: 'flex-start', background: '#1f3a8a', padding: '6px 22px'}}>
          <Mono size={56} color="#fff">Article 50</Mono>
        </div>
        {[90, 78, 94, 64, 84].map((w, k) => (
          <div key={k} style={{position: 'relative', height: 18, width: `${w}%`, background: '#b8b8b8', marginTop: k === 0 ? 8 : 0}}>
            {k === 2 ? <div style={{position: 'absolute', left: -8, right: -8, top: -10, bottom: -10, background: withAlpha(accent, 0.6), transform: `scaleX(${hiP})`, transformOrigin: 'left center'}} /> : null}
          </div>
        ))}
      </div>
      <Tape />
    </div>
  );
};

// ---------- Objets dessinés (SVG maison) ----------

// La loupe : verre teinté, monture sombre, manche en bois.
const Loupe: React.FC<{w: number}> = ({w}) => (
  <svg width={w} height={w} viewBox="0 0 100 100" style={{overflow: 'visible'}}>
    <line x1="58" y1="58" x2="92" y2="92" stroke="#6b3e26" strokeWidth="14" strokeLinecap="round" />
    <circle cx="38" cy="38" r="32" fill="rgba(170,220,255,0.25)" stroke="#222" strokeWidth="8" />
  </svg>
);

// Une liasse de billets.
const Bills: React.FC<{w: number}> = ({w}) => (
  <svg width={w} height={w * 0.6} viewBox="0 0 100 60">
    <rect x="8" y="2" width="90" height="42" fill="#2f6a40" stroke="#0f2a18" strokeWidth="3" />
    <rect x="2" y="14" width="90" height="42" fill="#4f8a5b" stroke="#0f2a18" strokeWidth="3" />
    <circle cx="47" cy="35" r="11" fill="none" stroke="#cfe8d0" strokeWidth="4" />
    <rect x="34" y="14" width="10" height="42" fill="#cfe8d0" opacity="0.6" />
  </svg>
);

// Un visage dédoublé (deepfake) : le vrai en trait plein, sa copie décalée en pointillé.
const Doubled: React.FC<{w: number}> = ({w}) => (
  <svg width={w} height={w} viewBox="0 0 100 100" style={{overflow: 'visible'}}>
    <g stroke="#9cc4ff" strokeWidth="5" fill="none" strokeDasharray="8 6">
      <ellipse cx="62" cy="46" rx="26" ry="32" />
      <circle cx="53" cy="42" r="3" fill="#9cc4ff" />
      <circle cx="71" cy="42" r="3" fill="#9cc4ff" />
      <path d="M52 60 Q62 68 72 60" />
    </g>
    <g stroke="#fff" strokeWidth="6" fill="#000">
      <ellipse cx="38" cy="52" rx="26" ry="32" />
    </g>
    <circle cx="29" cy="48" r="4" fill="#fff" />
    <circle cx="47" cy="48" r="4" fill="#fff" />
    <path d="M28 66 Q38 74 48 66" stroke="#fff" strokeWidth="5" fill="none" />
  </svg>
);

// Une page de journal : bandeau de titre, une image, deux colonnes.
const Journal: React.FC<{w: number}> = ({w}) => (
  <svg width={w} height={w * 1.2} viewBox="0 0 100 120">
    <rect x="3" y="3" width="94" height="114" fill={PAPER} stroke="#fff" strokeWidth="5" />
    <rect x="12" y="12" width="76" height="12" fill="#333" />
    <rect x="12" y="32" width="36" height="28" fill="#9a9384" />
    {[0, 1, 2, 3, 4, 5, 6].map((k) => <rect key={`a${k}`} x="12" y={66 + k * 7} width="36" height="3" fill="#777" />)}
    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((k) => <rect key={`b${k}`} x="54" y={32 + k * 7} width="34" height="3" fill="#777" />)}
  </svg>
);

// Le cercle des douze étoiles, sobre (des points jaunes sur bleu).
const EuRing: React.FC<{w: number}> = ({w}) => (
  <svg width={w} height={w * 0.7} viewBox="0 0 100 70">
    <rect x="0" y="0" width="100" height="70" fill="#1f3a8a" />
    {Array.from({length: 12}, (_, k) => {
      const a = (k / 12) * Math.PI * 2;
      return <circle key={k} cx={50 + 22 * Math.sin(a)} cy={35 - 22 * Math.cos(a)} r="3.4" fill="#f2c94c" />;
    })}
  </svg>
);

// ---------- 0. Hook : le titre, et derrière, dès la première image, le bas d'un document aux quatre lignes vides ----------

const Hook: React.FC = () => {
  const op = useSceneOpacity();
  const accent = useAccent();
  const q = at('hook', 'déclaration');
  return (
    <>
      {/* Le bas de la page, coupé par le haut du cadre, en retrait pour laisser la question au premier plan. */}
      <div style={{position: 'absolute', left: 96, top: -60, opacity: op * 0.6}}>
        <FootDoc texts={['', '', '', '']} body={5} />
      </div>
      {/* La question du terme, comme V.TitleHook, mais à 112 px et sans retour à la ligne pour tenir dans les 888 px. */}
      <Scene>
        <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
          <Pop at={0}><Say size={100}>C'est quoi ?</Say></Pop>
          {['la déclaration', "d'usage de l'IA"].map((l, k) => (
            <Pop key={k} at={q + 4 * k}>
              <Big size={112} color={accent}><span style={{whiteSpace: 'nowrap'}}>{l}</span></Big>
            </Pop>
          ))}
        </div>
      </Scene>
    </>
  );
};

// ---------- 1. Intro : « j'ai utilisé l'IA », l'inquiétude, le silence, puis l'article de The Register ----------

const COL_TOP = 60; // même place pour le collage dans intro et dans rapport

const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const utilise = at('intro', 'utilisé');
  const bacle = at('intro', 'bâclé');
  const silence = at('intro', 'silence');
  const deloitte = at('intro', 'Deloitte');
  const bubble = gone(frame, silence);
  const out = gone(frame, deloitte - 2);
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 700}}>
        {/* Toi, posé dès l'entrée (le décor de la scène), qui part quand l'article arrive. */}
        <div style={{position: 'absolute', left: 30, top: 330, lineHeight: 0, opacity: out}}>
          <Pop at={0}><Pixel sprite={TOI} px={18} seed={2} /></Pop>
        </div>
        {/* pop in : la bulle sur « utilisé » ; elle s'efface sur « silence ». */}
        <div style={{position: 'absolute', left: 250, top: 120, opacity: bubble}}>
          <Pop at={utilise}>
            <div style={{position: 'relative', background: '#2a2a2a', border: '5px solid #cfcfcf', borderRadius: 30, padding: '26px 34px'}}>
              <Mono size={54} color="#fff">j'ai utilisé l'IA</Mono>
              <svg width={60} height={50} viewBox="0 0 60 50" style={{position: 'absolute', left: 20, bottom: -46}}>
                <path d="M4 0 L56 0 L10 46 Z" fill="#2a2a2a" />
                <path d="M4 2 L10 46 L56 2" fill="none" stroke="#cfcfcf" strokeWidth="5" />
              </svg>
            </div>
          </Pop>
        </div>
        {/* Le point d'interrogation inquiet, sur « bâclé » : il tremble un peu. */}
        <div style={{position: 'absolute', left: 740, top: 0, opacity: bubble}}>
          <Pop at={bacle}>
            <div style={{transform: `rotate(${10 + 6 * Math.sin(frame / 3)}deg)`}}>
              <Big size={170} color="#f0a040">?</Big>
            </div>
          </Pop>
        </div>
        {/* pop in : l'article de The Register en collage, sur « Deloitte » (il reste en décor au début de rapport). */}
        <div style={{position: 'absolute', left: (W - REG.w) / 2, top: COL_TOP}}>
          <Pop at={deloitte}>
            <RegisterCollage />
          </Pop>
        </div>
      </div>
    </Scene>
  );
};

// ---------- 2. Le rapport : la couverture, l'étiquette de prix, puis la loupe sur les notes de bas de page ----------

const RAP = {x: 40, y: 80}; // la couverture du rapport, même place dans rapport et mention
const NOTE_Y = [200, 282, 364]; // les trois références
const QUOTE_Y = 456; // la citation
const NOTE_W = [520, 440, 590];

const Rapport: React.FC = () => {
  const frame = useCurrentFrame();
  const rapport = at('rapport', 'rapport');
  const facture = at('rapport', 'facturé');
  const n440 = at('rapport', '440');
  const chercheur = at('rapport', 'chercheur');
  const nexistent = at('rapport', "n'existent");
  const citation = at('rapport', 'citation');
  const inventee = at('rapport', 'inventée');
  const COUNT = 36;
  const cover = gone(frame, chercheur - 2);
  // La loupe balaie les références de « chercheur » à « études », puis descend sur la citation.
  const m1 = ease(frame, chercheur + 4, at('rapport', 'études'), [0, 1], 'inOut');
  const m2 = ease(frame, citation - 2, citation + 10, [0, 1], 'inOut');
  const lx = interpolate(m1, [0, 1], [80, 640]) + m2 * (300 - 640);
  const ly = interpolate(m1, [0, 1], [NOTE_Y[0] - 40, NOTE_Y[2] - 40]) + m2 * (QUOTE_Y - NOTE_Y[2]);
  const strike = (t: number) => ease(frame, t, t + 8);
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 700}}>
        {/* L'article de la scène d'avant, à la même place : le décor de l'entrée, qui part quand le rapport arrive. */}
        <div style={{position: 'absolute', left: (W - REG.w) / 2, top: COL_TOP, opacity: gone(frame, rapport - 6)}}>
          <RegisterCollage />
        </div>
        <div style={{position: 'absolute', inset: 0, opacity: cover}}>
          {/* pop in : le rapport relié se pose, sur « rapport ». */}
          <Pop at={rapport} style={{position: 'absolute', left: RAP.x, top: RAP.y, lineHeight: 0}}>
            <Cover />
          </Pop>
          {/* pop in puis count-up et punch zoom (le seul du short) : l'étiquette de prix se colle sur « facturé », le montant
              monte jusqu'à 440 000 sur « 440 000 ». */}
          <Pop at={facture} style={{position: 'absolute', left: 300, top: 330}}>
            <div style={{transform: `rotate(-6deg) scale(${punch(frame, n440 + COUNT)})`, transformOrigin: 'left center'}}>
              <div style={{position: 'relative', background: '#f2e3b3', padding: '22px 36px 22px 70px', clipPath: 'polygon(40px 0, 100% 0, 100% 100%, 40px 100%, 0 50%)', boxShadow: pixelShadow('#333')}}>
                <div style={{position: 'absolute', left: 30, top: '50%', width: 18, height: 18, marginTop: -9, borderRadius: '50%', background: '#000'}} />
                <Mono size={60} color={INK}>{`${frame >= n440 ? countUp(frame, n440, 440000, COUNT) : '0'} $ AU`}</Mono>
              </div>
            </div>
          </Pop>
        </div>
        {/* pop in : la page des notes de bas de page, sur « chercheur » ; trois références, puis la citation entre guillemets. */}
        <Pop at={chercheur} style={{position: 'absolute', left: 0, top: 40}}>
          <Sheet w={W} h={560}>
            {[40, 84, 128].map((y, k) => <div key={k} style={{position: 'absolute', left: 50, top: y, width: [760, 690, 720][k], height: 18, background: BAR}} />)}
            <div style={{position: 'absolute', left: 50, top: 168, width: 280, height: 6, background: INK}} />
            {NOTE_Y.map((y, k) => {
              const t = nexistent + 3 * k;
              const red = frame >= t;
              return (
                <div key={k} style={{position: 'absolute', left: 50, top: y, width: 760, height: 60}}>
                  <div style={{position: 'absolute', left: 0, top: 18, width: 60, height: 24, background: red ? RED : '#333'}} />
                  <div style={{position: 'absolute', left: 90, top: 20, width: NOTE_W[k], height: 20, background: red ? withAlpha(RED, 0.55) : BAR}} />
                  {/* draw-on : le trait qui barre la référence, en cascade sur « n'existent ». */}
                  <div style={{position: 'absolute', left: -10, top: 26, width: (NOTE_W[k] + 110) * strike(t), height: 8, background: RED}} />
                </div>
              );
            })}
            <div style={{position: 'absolute', left: 50, top: QUOTE_Y, width: 760, height: 76, display: 'flex', alignItems: 'center', gap: 18}}>
              <Mono size={64} color={frame >= inventee ? RED : INK}>«</Mono>
              <div style={{width: 500, height: 20, background: frame >= inventee ? withAlpha(RED, 0.55) : BAR}} />
              <Mono size={64} color={frame >= inventee ? RED : INK}>»</Mono>
              <div style={{position: 'absolute', left: -10, top: 36, width: 660 * strike(inventee), height: 8, background: RED}} />
            </div>
          </Sheet>
        </Pop>
        {/* La loupe, sur « chercheur », qui glisse d'une référence à l'autre puis sur la citation. */}
        {frame >= chercheur ? (
          <div style={{position: 'absolute', left: lx, top: 40 + ly, lineHeight: 0, opacity: ease(frame, chercheur, chercheur + 6)}}>
            <Loupe w={190} />
          </div>
        ) : null}
      </div>
    </Scene>
  );
};

// ---------- 3. La mention : « corrigée », la page méthode, GPT-4o à la machine, les billets qui repartent ----------

const Mention: React.FC = () => {
  const frame = useCurrentFrame();
  const corrigee = at('mention', 'corrigée');
  const methode = at('mention', 'méthode');
  const outil = at('mention', 'outil');
  const gpt = at('mention', 'GPT');
  const rembourse = at('mention', 'remboursé');
  const LINE = 'Azure OpenAI GPT-4o';
  const t = typed(frame, outil, LINE, 32);
  // Les billets partent du bas de la page et filent à gauche, hors du cadre, en arc et en cascade.
  const bills = [0, 1, 2].map((k) => {
    const p = ease(frame, rembourse + 4 * k, rembourse + 4 * k + 24, [0, 1], 'inOut');
    return arc(p, [W / 2 - 160 + 60 * k, 500], [-480, 220], 140);
  });
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 700}}>
        {/* Le rapport de la scène d'avant, centré : le décor de l'entrée ; le tampon « corrigée » s'y pose. */}
        <div style={{position: 'absolute', left: (W - COVER.w) / 2, top: RAP.y, lineHeight: 0, opacity: gone(frame, methode - 4)}}>
          <Pop at={0}><Cover /></Pop>
          <Stamp at={corrigee} size={56} style={{left: 30, top: 190, width: 'max-content', lineHeight: 1.15}}>corrigée</Stamp>
        </div>
        {/* pop in : la page « Méthode » sur « méthode » ; la ligne de l'outil s'écrit à la machine sur « outil »,
            puis highlight sur « GPT-4o ». */}
        <Pop at={methode} style={{position: 'absolute', left: 0, top: 30}}>
          <Sheet w={W} h={480}>
            <div style={{position: 'absolute', left: 56, top: 34}}>
              <Big size={92} color={INK}>Méthode</Big>
            </div>
            {[150, 192].map((y, k) => <div key={k} style={{position: 'absolute', left: 56, top: y, width: [740, 640][k], height: 18, background: BAR}} />)}
            <div style={{position: 'absolute', left: 56, top: 240, display: 'flex', alignItems: 'center', gap: 20}}>
              <Mono size={56} color={INK}>{t.slice(0, 12)}</Mono>
              {t.length > 13 ? (
                <Highlight at={gpt}>
                  <Mono size={56} color={INK}>{t.slice(13)}</Mono>
                </Highlight>
              ) : null}
            </div>
            {[350, 392].map((y, k) => <div key={k} style={{position: 'absolute', left: 56, top: y, width: [700, 560][k], height: 18, background: BAR}} />)}
          </Sheet>
        </Pop>
        {/* Trois liasses de billets repartent du rapport vers la gauche (arc), sur « remboursé ». */}
        {bills.map(([x, y], k) =>
          frame >= rembourse + 4 * k ? (
            <div key={k} style={{position: 'absolute', left: x, top: y, lineHeight: 0}}>
              <Bills w={200} />
            </div>
          ) : null,
        )}
      </div>
    </Scene>
  );
};

// ---------- 4. Le nom : les quatre lignes se remplissent, puis le terme en français et en anglais ----------

const Nom: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const cues = [at('nom', 'quelle'), at('nom', 'quoi'), at('nom', 'relu'), at('nom', 'répond')];
  const cest = at('nom', "c'est");
  const decl = at('nom', 'déclaration');
  const ai = at('nom', "l'AI");
  const texts = ROWS.map((r, k) => (frame >= cues[k] ? typed(frame, cues[k], r, 40) : ''));
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 640}}>
        {/* Le même bas de document qu'au hook, posé dès l'entrée ; chaque ligne s'écrit à la machine sur son mot. */}
        <div style={{position: 'absolute', left: 0, top: 20, opacity: gone(frame, cest)}}>
          <Pop at={0}><FootDoc texts={texts} body={2} /></Pop>
        </div>
        {/* pop in : le terme, écrit comme la voix le dit (sous-titre masqué par onscreen), puis l'anglais en accent. */}
        <div style={{position: 'absolute', left: 0, top: 90, width: W, display: 'flex', flexDirection: 'column', gap: 10}}>
          <Pop at={decl}><Big size={112}><span style={{whiteSpace: 'nowrap'}}>la déclaration</span></Big></Pop>
          <Pop at={decl + 4}><Big size={112}><span style={{whiteSpace: 'nowrap'}}>d'usage de l'IA</span></Big></Pop>
        </div>
        <Pop at={ai} style={{position: 'absolute', left: 0, top: 420, width: W}}>
          <Big size={112} color={accent}><span style={{whiteSpace: 'nowrap'}}>AI disclosure</span></Big>
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 5. L'image : le mémoire de Léa, retourné, « relu par M. Perrin », et la page qui ressort ----------

const MEM = {x: 0, y: 150, w: 640, h: 400};
const DESK_Y = 550;
const PHOTO = {x: 672, y: 10, w: 210, h: 220};

const Memoire: React.FC = () => {
  const frame = useCurrentFrame();
  const memoire = at('memoire', 'mémoire');
  const lea = at('memoire', 'Léa');
  const dos = at('memoire', 'dos');
  const relu = at('memoire', 'relu');
  const perrin = at('memoire', 'Perrin');
  const erreur = at('memoire', 'erreur');
  // Le mémoire se retourne sur « dos » (inOut) : il s'aplatit, puis montre son dos.
  const flip = ease(frame, dos, dos + 14, [0, 1], 'inOut');
  const back = flip >= 0.5;
  // Sur « erreur », une page sort du mémoire (arc) avec un point rouge, puis une flèche file vers la photo.
  const pg = ease(frame, erreur, erreur + 12, [0, 1], 'inOut');
  const [px, py] = arc(pg, [MEM.x + 180, MEM.y + 140], [MEM.x + 230, -10], 60);
  const arrow = ease(frame, erreur + 8, erreur + 22);
  const from: [number, number] = [MEM.x + 230 + 230, 70];
  const to: [number, number] = [PHOTO.x - 16, PHOTO.y + 120];
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 760}}>
        {/* Le bureau d'école : le décor, posé dès l'entrée. */}
        <Pop at={0} style={{position: 'absolute', left: 0, top: 0, width: W, height: 760}}>
          <div style={{position: 'absolute', left: 30, top: DESK_Y + 40, width: 30, height: 170, background: '#5a3a22'}} />
          <div style={{position: 'absolute', left: W - 60, top: DESK_Y + 40, width: 30, height: 170, background: '#5a3a22'}} />
        </Pop>
        {/* Léa derrière son bureau, sur « Léa » ; son prénom au-dessus d'elle, quelques images après. */}
        <Pop at={lea} style={{position: 'absolute', left: 680, top: 370, lineHeight: 0}}>
          <Pixel sprite={LEA} px={16} seed={5} />
        </Pop>
        <Pop at={lea + 5} style={{position: 'absolute', left: 680, width: 192, top: 290, display: 'flex', justifyContent: 'center'}}>
          <Mono size={52} color="#fff">Léa</Mono>
        </Pop>
        <Pop at={0} style={{position: 'absolute', left: 0, top: DESK_Y, width: W, height: 44, background: '#8a5a32', borderTop: '8px solid #b07a4a', boxSizing: 'border-box'}}>
          {null}
        </Pop>
        {/* La page qui ressort, sous le mémoire au départ. */}
        {frame >= erreur ? (
          <div style={{position: 'absolute', left: px, top: py, lineHeight: 0}}>
            <div style={{position: 'relative', width: 230, height: 160, background: PAPER, border: '5px solid #000', boxSizing: 'border-box', transform: `rotate(${-8 * pg}deg)`}}>
              {[24, 52, 80, 108].map((y, k) => <div key={k} style={{position: 'absolute', left: 20, top: y, width: [170, 140, 160, 110][k], height: 10, background: BAR}} />)}
              <div style={{position: 'absolute', left: 150, top: 70, width: 44, height: 44, borderRadius: '50%', background: RED, opacity: ease(frame, erreur + 6, erreur + 10)}} />
            </div>
          </div>
        ) : null}
        {/* pop in : le mémoire relié se pose sur le bureau, sur « mémoire » ; il se retourne sur « dos ». */}
        <Pop at={memoire} style={{position: 'absolute', left: MEM.x, top: MEM.y}}>
          <div style={{transform: `scaleX(${Math.abs(1 - 2 * flip)})`}}>
            <div style={{position: 'relative', width: MEM.w, height: MEM.h, background: back ? '#24493a' : '#2f5d4a', border: '6px solid #142a20', boxShadow: pixelShadow('#222'), boxSizing: 'border-box'}}>
              {back ? (
                // Le dos : la ligne « relu par M. Perrin » s'écrit sur « relu », puis highlight sur « Perrin ».
                <div style={{position: 'absolute', left: 24, right: 24, bottom: 50, background: PAPER, padding: '16px 18px'}}>
                  <Highlight at={perrin}>
                    <Mono size={48} color={INK}>{frame >= relu ? typed(frame, relu, 'relu par M. Perrin', 40) : ''}</Mono>
                  </Highlight>
                </div>
              ) : (
                <>
                  <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: 26, background: '#1d3d30'}} />
                  <div style={{position: 'absolute', left: 60, top: 110}}>
                    <Mono size={48} color="#fff">mémoire de stage</Mono>
                  </div>
                  <div style={{position: 'absolute', left: 60, top: 200, width: 220, height: 14, background: '#9cc4b0'}} />
                </>
              )}
            </div>
          </div>
        </Pop>
        {/* La petite photo de M. Perrin, épinglée en haut à droite, sur « Perrin ». */}
        <Pop at={perrin} style={{position: 'absolute', left: PHOTO.x, top: PHOTO.y}}>
          <div style={{transform: 'rotate(4deg)', width: PHOTO.w, height: PHOTO.h, background: '#f2f2f2', padding: '14px 14px 40px', boxSizing: 'border-box', boxShadow: pixelShadow('#333'), display: 'flex', alignItems: 'flex-end', justifyContent: 'center', overflow: 'hidden'}}>
            <div style={{width: '100%', height: '100%', background: '#c9d6e0', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', lineHeight: 0}}>
              <Pixel sprite={PERRIN} px={14} seed={7} />
            </div>
          </div>
        </Pop>
        {/* draw-on : la flèche qui file de la page vers la photo. */}
        {frame >= erreur + 8 ? (
          <svg width={W} height={300} viewBox={`0 0 ${W} 300`} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
            <Draw d={`M${from[0]} ${from[1]} Q${(from[0] + to[0]) / 2} ${from[1] - 50} ${to[0]} ${to[1]}`} p={arrow} width={10} len={260} color={RED} />
            {arrow > 0.95 ? <path d={`M${to[0] + 6} ${to[1] + 4} L${to[0] - 26} ${to[1] - 18} L${to[0] - 20} ${to[1] + 18} Z`} fill={RED} /> : null}
          </svg>
        ) : null}
      </div>
    </Scene>
  );
};

// ---------- 6. La loi : la date, l'Europe, l'article 50, deepfakes et textes, la coche de la relecture ----------

const JOUR = {x: 460, y: 470, w: 200}; // la page de journal
const Loi: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const aout = at('loi', 'août');
  const europe = at('loi', 'Europe');
  const reglement = at('loi', 'règlement');
  const obligatoire = at('loi', 'obligatoire');
  const deepfakes = at('loi', 'deepfakes');
  const textes = at('loi', 'textes');
  const sauf = at('loi', 'sauf');
  const relus = at('loi', 'relus');
  const intro = gone(frame, reglement - 4);
  // La coche arrive en arc d'en haut à droite et se pose sur le coin de la page de journal, sur « sauf ».
  const cp = ease(frame, sauf, sauf + 16, [0, 1], 'inOut');
  const [cx, cy] = arc(cp, [W - 60, -120], [JOUR.x + JOUR.w - 70, JOUR.y - 50], 80);
  const fall = (t: number) => ease(frame, t, t + 12, [-90, 0]);
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 820}}>
        <div style={{position: 'absolute', inset: 0, opacity: intro}}>
          {/* Le calendrier : le décor, posé dès l'entrée ; la date s'y écrit sur « août ». */}
          <Pop at={0} style={{position: 'absolute', left: 40, top: 100}}>
            <div style={{width: 320, height: 330, background: PAPER, border: '6px solid #000', boxShadow: pixelShadow('#444'), boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <div style={{alignSelf: 'stretch', height: 64, background: '#c0392b'}} />
              <Pop at={aout} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 10}}>
                <Big size={150} color={INK}>2</Big>
                <Mono size={52} color={INK}>août 2026</Mono>
              </Pop>
            </div>
          </Pop>
          {/* pop in : le cercle d'étoiles, sur « Europe ». */}
          <Pop at={europe} style={{position: 'absolute', left: 450, top: 150, lineHeight: 0}}>
            <EuRing w={380} />
          </Pop>
        </div>
        {/* pop in : l'article 50 en collage, sur « règlement » ; highlight du trait de l'obligation sur « obligatoire ». */}
        <div style={{position: 'absolute', left: (W - ART.w) / 2, top: 0}}>
          <Pop at={reglement}>
            <ArticleCollage hiP={ease(frame, obligatoire, obligatoire + 12)} />
          </Pop>
        </div>
        {/* stagger : les deux icônes tombent chacune sur son mot, le libellé quelques images après. */}
        <div style={{position: 'absolute', left: 90, top: JOUR.y, opacity: frame >= deepfakes ? 1 : 0, transform: `translateY(${fall(deepfakes)}px)`, lineHeight: 0}}>
          <Doubled w={220} />
        </div>
        <Pop at={deepfakes + 5} style={{position: 'absolute', left: 50, top: JOUR.y + 250}}>
          <Mono size={52} color="#fff">deepfakes</Mono>
        </Pop>
        <div style={{position: 'absolute', left: JOUR.x, top: JOUR.y - 10, opacity: frame >= textes ? 1 : 0, transform: `translateY(${fall(textes)}px)`, lineHeight: 0}}>
          <Journal w={JOUR.w} />
        </div>
        <Pop at={textes + 5} style={{position: 'absolute', left: JOUR.x + 20, top: JOUR.y + 250}}>
          <Mono size={52} color="#fff">textes</Mono>
        </Pop>
        {/* La coche de la relecture, en arc, sur « sauf » ; « relus » s'écrit à côté, sur « relus ». */}
        {frame >= sauf ? (
          <div style={{position: 'absolute', left: cx, top: cy, width: 130, height: 130, borderRadius: '50%', background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: pixelShadow('#222')}}>
            <Check p={ease(frame, sauf + 12, sauf + 22)} size={100} color={INK} />
          </div>
        ) : null}
        <Pop at={relus} style={{position: 'absolute', left: JOUR.x + JOUR.w + 30, top: JOUR.y + 110}}>
          <Mono size={52} color={accent}>relus</Mono>
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 7. Chute : le bas du document, les quatre lignes écrites, la troisième qui s'allume ----------

const Chute: React.FC = () => {
  const frame = useCurrentFrame();
  const ecris = at('chute', 'écris');
  const troisieme = at('chute', 'troisième');
  const commencer = at('chute', 'commencer');
  // stagger + typewriter : les quatre lignes s'écrivent l'une après l'autre sur « écris ».
  const texts = ROWS.map((r, k) => (frame >= ecris + 8 * k ? typed(frame, ecris + 8 * k, r, 40) : ''));
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 640}}>
        {/* Le bas de ton prochain document : le décor, posé dès l'entrée ; la troisième ligne s'allume sur « troisième »,
            le curseur y clignote sur « commencer ». L'image finale reste pleine. */}
        <Pop at={0} style={{position: 'absolute', left: 0, top: 20}}>
          <FootDoc texts={texts} body={3} hi={2} hiP={ease(frame, troisieme, troisieme + 12)} caret={frame >= commencer ? 2 : -1} />
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- Montage ----------

const SCENES: Record<string, React.FC> = {hook: Hook, intro: Intro, rapport: Rapport, mention: Mention, nom: Nom, memoire: Memoire, loi: Loi, chute: Chute};

export const DeclarationVoix: React.FC = () => <V.Montage scenes={SCENES} accent={AC} />;

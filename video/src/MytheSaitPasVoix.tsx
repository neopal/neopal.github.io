// Short Mythe « L'IA sait quand elle ne sait pas » (YouTube / TikTok / Instagram), épisode 15, préparé le 2026-10-19.
// Fiche mythe-sait-quand-il-ne-sait-pas de lexique/terms.js ; sources dans voix/sait-pas.script.json : Kalai et al.,
// Why Language Models Hallucinate (OpenAI et Georgia Tech, 4 septembre 2025 : l'anniversaire d'Adam Tauman Kalai demandé
// trois fois à DeepSeek-V3, réponses « 03-07 », « 15-06 » et « 01-01 », toutes fausses), GPT-5 System Card, tableau 8
// (SimpleQA sans web : o4-mini s'abstient 1 fois sur 100, gpt-5-thinking-mini 52 fois), l'image d'Inès, 4 ans, et la
// réponse « Entendu au bureau » de la fiche (repose la question ailleurs).
// Phrase du hook provisoire (l'« À éviter » de la fiche) : pas d'auteur, donc ni portrait ni objet source.
// Fil : après L'ère de l'AGI (ép. 14), le modèle ne sait toujours pas quand il ne sait pas.
// L'écran suit la voix (univers.md) : chaque élément entre sur le mot qui le nomme, chaque libellé reprend les mots dits.
// Le mouvement (univers.md) : easing partout sauf le compte calé sur la voix (la grille de GPT-5 thinking mini).
import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {Big, Draw, Mono, Pop, Scene, arc, clamp, ease, punch, typed, useAccent, withAlpha} from './kit';
import {LABEL, makeVoix} from './voix/VoixShort';
import {Pixel} from './voix/Pixel';
import {Model, Stamp, pixelShadow} from './voix/Parts';
import ALIGN from './voix/sait-pas.align.json';
import SCRIPT from './voix/sait-pas.script.json';

const AC = '#FF7A7A'; // catégorie Mythes vs réalité
const V = makeVoix(ALIGN, SCRIPT, 'voix/prediction-music.mp3');
const {at} = V;
export const MYTHESAITPASVOIX_DURATION = V.duration;

// Sortie : 6 images, plus vite que l'entrée (Pop, une dizaine).
const gone = (frame: number, until: number) => ease(frame, until, until + 6, [1, 0], 'inOut');

// Les trois dates données par DeepSeek-V3 (Kalai et al., 2025).
const DATES = ['03-07', '15-06', '01-01'];

// ---------- Personnages (pixel art, même format que voix/Pixel.tsx) ----------

const SKIN = '#e3b58e';

// Le chercheur : cheveux bruns, lunettes, barbe, pull bleu marine. Pas de nom : la voix dit « l'un d'entre eux ».
const CHERCHEUR = {
  rows: [
    '....HHHH....',
    '...HHHHHH...',
    '...SSSSSS...',
    '...GEGGEG...',
    '...SSSSSS...',
    '...BSRRSB...',
    '....BBBB....',
    '....SSSS....',
    '.NNNNNNNNNN.',
    '.NNNNNNNNNN.',
    '.SNNNNNNNNS.',
    '.SNNNNNNNNS.',
    '...NNNNNN...',
    '...NNNNNN...',
  ],
  palette: {H: '#3a2a1e', S: SKIN, E: '#111', G: '#2b2b2b', B: '#4a3426', R: '#b5524f', N: '#34466e'},
};

// Inès, 4 ans : grosse tête, couettes nouées de rouge, robe jaune. Petite à côté des adultes des autres shorts.
const INES = {
  rows: [
    'K..HHHHHH..K',
    'HHHHHHHHHHHH',
    'HH.HSSSSH.HH',
    'H..SESSESS.H',
    '...SSSSSSS..',
    '...SSRRSSS..',
    '....SSSSS...',
    '..DDDDDDDD..',
    '.SDDDDDDDDS.',
    '.SDDDDDDDDS.',
    '.DDDDDDDDDD.',
    '...SS..SS...',
  ],
  palette: {H: '#5a3a22', K: '#d9534f', S: SKIN, E: '#111', R: '#b5524f', D: '#e8b63c'},
};

// ---------- Pièces de ce short ----------

// Cadran d'aplomb : un demi-cercle et une aiguille (v de 0 à 1). L'aiguille se lit d'un coup d'œil, deux cadrans
// côte à côte se comparent sans chiffre.
const Dial: React.FC<{v: number; size: number; lit?: boolean}> = ({v, size, lit}) => {
  const accent = useAccent();
  const a = Math.PI * (1 - v);
  const x = 100 + 72 * Math.cos(a);
  const y = 100 - 72 * Math.sin(a);
  return (
    <svg width={size} height={size * 0.62} viewBox="0 0 200 124">
      <path d="M16 100 A84 84 0 0 1 184 100" fill="none" stroke="#444" strokeWidth="14" />
      <path d="M16 100 A84 84 0 0 1 184 100" fill="none" stroke={lit ? accent : '#fff'} strokeWidth="14" strokeDasharray={264} strokeDashoffset={264 * (1 - v)} />
      {[0, 0.25, 0.5, 0.75, 1].map((t) => {
        const ta = Math.PI * (1 - t);
        return <line key={t} x1={100 + 64 * Math.cos(ta)} y1={100 - 64 * Math.sin(ta)} x2={100 + 54 * Math.cos(ta)} y2={100 - 54 * Math.sin(ta)} stroke="#777" strokeWidth="4" />;
      })}
      <line x1="100" y1="100" x2={x} y2={y} stroke="#fff" strokeWidth="8" strokeLinecap="round" />
      <circle cx="100" cy="100" r="11" fill="#fff" />
    </svg>
  );
};

// Bulle de chat : `right` pour la question (l'humain), à gauche pour la réponse (le modèle).
const Bub: React.FC<{right?: boolean; children: React.ReactNode; style?: React.CSSProperties}> = ({right, children, style}) => (
  <div style={{alignSelf: right ? 'flex-end' : 'flex-start', background: right ? '#2a2a2a' : 'transparent', border: right ? '4px solid #2a2a2a' : '4px solid #666', borderRadius: 26, padding: '14px 26px', ...style}}>
    {children}
  </div>
);

// Gâteau d'anniversaire en SVG maison : trois étages de traits, une bougie dont la flamme vacille.
const Cake: React.FC<{size: number}> = ({size}) => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const f = 1 + 0.12 * Math.sin(frame / 3);
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <rect x="14" y="52" width="72" height="36" fill="#efe9dc" />
      <path d="M14 64 q9 8 18 0 t18 0 t18 0 t18 0" fill="none" stroke={accent} strokeWidth="6" />
      <rect x="8" y="86" width="84" height="7" fill="#fff" />
      <rect x="46" y="30" width="8" height="22" fill="#fff" />
      <ellipse cx="50" cy="22" rx={5 * f} ry={8 * f} fill="#ffb84d" />
    </svg>
  );
};

// ---------- 0. Hook : la phrase du mythe en grand, le tampon FAUX, et le même aplomb ----------

const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const aurait = at('hook', "l'aurait");
  const dit = at('hook', 'dit');
  const modele = at('hook', 'modèle');
  const aplomb = at('hook', 'aplomb');
  // L'aiguille monte au maximum sur « aplomb », et ne bouge plus sur « qu'il la connaisse ou non ».
  const needle = ease(frame, aplomb, aplomb + 14, [0, 0.92]);
  return (
    <Scene>
      <div style={{position: 'relative', display: 'flex', flexDirection: 'column', gap: 6}}>
        {/* Le verdict, posé juste après la citation ; il reste jusqu'à la fin du hook : c'est l'image de couverture. */}
        <Stamp at={dit + 8} size={96} tilt={-12} bg="rgba(0,0,0,0.6)" style={{right: 0, top: -260, zIndex: 2}}>FAUX</Stamp>
        <Pop at={0}><Big size={96}>« S'il ne savait pas,</Big></Pop>
        <Pop at={Math.max(4, aurait - 4)}><Big size={96}>il l'aurait dit »</Big></Pop>
        {/* Le modèle et son cadran d'aplomb : pop in, puis l'aiguille qui monte. */}
        <div style={{marginTop: 70, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 60}}>
          <Pop at={modele}><Model w={230} /></Pop>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6}}>
            <Pop at={aplomb - 4}><Dial v={needle} size={300} /></Pop>
            <Pop at={aplomb + 2}><Mono size={52} color="#fff">même aplomb</Mono></Pop>
          </div>
        </div>
      </div>
    </Scene>
  );
};

// ---------- 1. La question : l'anniversaire d'un chercheur, demandé à DeepSeek ----------

const Anniv: React.FC = () => {
  const frame = useCurrentFrame();
  const y2025 = at('anniv', '2025');
  const chercheurs = at('anniv', 'chercheurs');
  const openai = at('anniv', 'OpenAI');
  const deepseek = at('anniv', 'DeepSeek');
  const anniv = at('anniv', 'anniversaire');
  const repondre = at('anniv', 'répondre');
  const connaissait = at('anniv', 'connaissait');
  const q = typed(frame, anniv, 'anniversaire ?', 34); // typewriter
  return (
    <Scene>
      {/* Le décor : une fenêtre de conversation vide, posée dès l'entrée. */}
      <Pop at={0} style={{border: '6px solid #444', borderRadius: 30, boxShadow: pixelShadow('#1a1a1a'), overflow: 'hidden'}}>
        <div style={{height: 70, background: '#1c1c1c', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px'}}>
          <div style={{display: 'flex', gap: 14}}>
            {[0, 1, 2].map((k) => <div key={k} style={{width: 22, height: 22, borderRadius: 11, background: '#555'}} />)}
          </div>
          <Pop at={y2025}><Mono size={52} color={LABEL}>2025</Mono></Pop>
        </div>
        <div style={{padding: '30px 34px', display: 'flex', flexDirection: 'column', gap: 26, minHeight: 420}}>
          {/* Le chercheur et sa question, à droite. */}
          <div style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', gap: 26}}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 14, opacity: frame >= anniv - 2 ? 1 : 0}}>
              <Pop at={anniv - 2}>
                <Bub right style={{display: 'flex', alignItems: 'center', gap: 16, minWidth: 470}}>
                  <Cake size={70} />
                  <Mono size={52} color="#fff">{q || ' '}</Mono>
                </Bub>
              </Pop>
              {/* La consigne : une case au format JJ-MM, à remplir seulement s'il la connaissait. */}
              <Pop at={repondre} style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8}}>
                <div style={{border: '4px dashed #cfcfcf', padding: '6px 22px'}}><Mono size={52} color="#fff">JJ-MM</Mono></div>
                <div style={{opacity: frame >= connaissait ? 1 : 0}}><Mono size={48} color={LABEL}>s'il la connaissait</Mono></div>
              </Pop>
            </div>
            <Pop at={chercheurs} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, alignSelf: 'flex-start'}}>
              <div style={{opacity: frame >= openai ? 1 : 0}}><Mono size={48} color={LABEL}>OpenAI</Mono></div>
              <Pixel sprite={CHERCHEUR} px={12} seed={2} />
            </Pop>
          </div>
          {/* DeepSeek, à gauche : un modèle générique (pas de logo de marque). */}
          <Pop at={deepseek} style={{display: 'flex', alignItems: 'center', gap: 24}}>
            <Model w={170} />
            <Mono size={52} color="#fff">DeepSeek</Mono>
          </Pop>
        </div>
      </Pop>
    </Scene>
  );
};

// ---------- 2. Trois essais, trois dates, toutes fausses ; le droit de se taire, jamais pris ----------

const Trois: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const deepseek = at('trois', 'DeepSeek');
  const hits = [at('trois', 'donné'), at('trois', 'trois', 1), at('trois', 'dates')];
  const fausses = at('trois', 'fausses');
  const droit = at('trois', 'droit');
  const taire = at('trois', 'taire');
  return (
    <Scene gap={22}>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 110}}>
        <Pop at={deepseek} style={{display: 'flex', alignItems: 'center', gap: 20}}>
          <Model w={130} />
          <Mono size={52} color="#fff">DeepSeek</Mono>
        </Pop>
        {/* La question de la scène d'avant, en retrait : bulle assombrie, texte en LABEL (jamais plus sombre). */}
        <Pop at={0}>
          <Bub right style={{display: 'flex', alignItems: 'center', gap: 12, padding: '10px 22px', background: '#161616', borderColor: '#161616'}}>
            <Mono size={48} color={LABEL}>anniversaire ?</Mono>
          </Bub>
        </Pop>
      </div>
      {/* Le décor : trois essais numérotés, en stagger dès l'entrée ; chaque date s'y écrit à la machine sur son mot. */}
      {DATES.map((d, k) => {
        const strike = ease(frame, fausses - 4 + 4 * k, fausses + 6 + 4 * k);
        return (
          <Pop key={k} at={2 + 3 * k} style={{display: 'flex', alignItems: 'center', gap: 28}}>
            <Mono size={52} color={LABEL}>{`${k + 1}`}</Mono>
            <div style={{position: 'relative', width: 330, border: `4px ${frame >= hits[k] ? 'solid #666' : 'dashed #444'}`, borderRadius: 26, padding: '8px 30px', boxSizing: 'border-box'}}>
              <Mono size={76} color={frame >= fausses - 4 + 4 * k ? accent : '#fff'}>{typed(frame, hits[k], d, 30) || ' '}</Mono>
              {/* draw-on : la date barrée, de gauche à droite, en cascade sur « toutes fausses ». */}
              <svg width={330} height={110} viewBox="0 0 330 110" style={{position: 'absolute', left: -4, top: -4}}>
                <Draw d="M20 60 L310 50" p={strike} width={10} len={300} color={accent} />
              </svg>
            </div>
          </Pop>
        );
      })}
      {/* Le droit de se taire : une option restée vide, jamais cochée. */}
      <Pop at={droit} style={{display: 'flex', alignItems: 'center', gap: 28, marginTop: 10}}>
        <div style={{width: 30}} />
        <div style={{display: 'flex', alignItems: 'center', gap: 22, border: '4px dashed #cfcfcf', borderRadius: 26, padding: '12px 30px'}}>
          <div style={{width: 46, height: 46, border: '5px solid #cfcfcf', boxSizing: 'border-box'}} />
          <div style={{opacity: frame >= taire ? 1 : 0}}><Mono size={60} color="#fff">se taire</Mono></div>
        </div>
      </Pop>
    </Scene>
  );
};

// ---------- 3. L'image : Inès, 4 ans, la Lune, « 12 kilos » du même ton que son prénom ----------

const Moon: React.FC<{size: number}> = ({size}) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="46" fill="#efe9dc" />
    <circle cx="34" cy="38" r="10" fill="#cfc6b4" />
    <circle cx="62" cy="62" r="13" fill="#cfc6b4" />
    <circle cx="66" cy="30" r="6" fill="#cfc6b4" />
  </svg>
);

const STARS: [number, number][] = [[40, 50], [120, 30], [300, 60], [200, 110], [70, 190], [330, 200], [250, 30]];

const Ines: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const ines = at('ines', 'Inès');
  const quatre = at('ines', 'quatre');
  const pese = at('ines', 'pèse');
  const lune = at('ines', 'Lune');
  const douze = at('ines', 'douze');
  const prenom = at('ines', 'prénom');
  // La Lune monte dans la fenêtre en arc quand la voix la nomme.
  const rise = ease(frame, lune - 4, lune + 14);
  const [mx, my] = arc(rise, [20, 230], [210, 50], 30);
  return (
    <Scene>
      <div style={{position: 'relative', height: 600}}>
        {/* Le décor : la maison, une fenêtre de nuit et le sol, posés dès l'entrée. */}
        <Pop at={0} style={{position: 'absolute', right: 0, top: 0}}>
          <div style={{position: 'relative', width: 380, height: 290, background: '#0d1530', border: '12px solid #b8b0a0', boxSizing: 'border-box', overflow: 'hidden'}}>
            {STARS.map(([x, y], k) => <div key={k} style={{position: 'absolute', left: x, top: y, width: 8, height: 8, background: '#cfcfcf'}} />)}
            <div style={{position: 'absolute', left: mx, top: my, opacity: frame >= lune - 4 ? 1 : 0}}><Moon size={130} /></div>
            <div style={{position: 'absolute', left: 172, top: 0, bottom: 0, width: 12, background: '#b8b0a0'}} />
            <div style={{position: 'absolute', left: 0, right: 0, top: 128, height: 12, background: '#b8b0a0'}} />
          </div>
        </Pop>
        <Pop at={0} style={{position: 'absolute', left: -PADX, right: -PADX, top: 560}}><div style={{height: 14, background: '#3a3a3a'}} /></Pop>
        {/* « combien pèse » : un point d'interrogation à côté de la fenêtre, avant que la Lune n'y monte. */}
        <Pop at={pese} style={{position: 'absolute', right: 400, top: 60, opacity: gone(frame, douze)}}>
          <Mono size={110} color={accent}>?</Mono>
        </Pop>
        {/* Inès, à gauche : un seul détail vivant, elle cligne des yeux. */}
        <Pop at={ines} style={{position: 'absolute', left: 30, top: 40}}>
          <Pixel sprite={INES} px={18} seed={3} />
        </Pop>
        <Pop at={quatre} style={{position: 'absolute', left: 0, top: 290}}>
          <Mono size={52} color="#fff">Inès, 4 ans</Mono>
        </Pop>
        {/* Ses deux réponses, dites du même ton : même bulle, même taille, même aplomb. */}
        <div style={{position: 'absolute', left: 0, top: 410, display: 'flex', alignItems: 'center', gap: 18}}>
          <Pop at={douze} style={{border: `5px solid ${accent}`, borderRadius: 30, padding: '10px 24px', background: withAlpha(accent, 0.12)}}>
            <Mono size={56} color="#fff">« 12 kilos »</Mono>
          </Pop>
          <Pop at={prenom + 5}><Mono size={64} color={LABEL}>=</Mono></Pop>
          <Pop at={prenom} style={{border: `5px solid ${accent}`, borderRadius: 30, padding: '10px 24px', background: withAlpha(accent, 0.12)}}>
            <Mono size={56} color="#fff">« Inès »</Mono>
          </Pop>
        </div>
      </div>
    </Scene>
  );
};
const PADX = 40;

// ---------- 4. Le mécanisme : la suite la plus probable, la même assurance, l'aveu poussé par l'entraînement ----------

// Probabilités schématiques des suites possibles (les trois dates du test), la plus probable en tête.
const CANDS: [string, number][] = [['03-07', 0.34], ['15-06', 0.27], ['01-01', 0.2]];
const BAR = 260 / 0.34; // px par unité de probabilité

const Probable: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const suite = at('probable', 'suite');
  const probable = at('probable', 'probable');
  const inventee = at('probable', 'inventée');
  const assurance = at('probable', 'assurance');
  const exacte = at('probable', 'exacte');
  const sort = at('probable', 'sort');
  const dit = at('probable', 'dit');
  const sais = at('probable', 'sais');
  const entr = at('probable', 'entraînement');
  // Trois temps, une idée chacun : la liste des suites, puis les deux cadrans, puis la liste et l'aveu.
  const partA = frame < inventee + 2;
  const partB = frame >= inventee - 6 && frame < dit + 6;
  const partC = frame >= dit;
  const push = ease(frame, entr, entr + 20); // bar grow : l'entraînement pousse « je ne sais pas »
  const list = (dim: boolean) => (
    <div style={{display: 'flex', flexDirection: 'column', gap: 18}}>
      {CANDS.map(([t, p], k) => {
        const g = ease(frame, suite + 3 * k, suite + 3 * k + 16); // bar grow en cascade
        const top = k === 0 && frame >= probable;
        return (
          <div key={k} style={{display: 'flex', alignItems: 'center', gap: 20, height: 74}}>
            <div style={{width: 230}}><Mono size={60} color={dim ? LABEL : top ? accent : '#fff'}>{t}</Mono></div>
            {/* En retrait (dim) : barres assombries, texte en LABEL. */}
            <div style={{width: Math.max(8, BAR * p * (dim ? 1 : g)), height: 40, background: dim ? '#3a3a3a' : top ? accent : '#888'}} />
            {k === 0 && !dim ? <div style={{opacity: frame >= probable ? 1 : 0}}><Mono size={48} color={accent}>plus probable</Mono></div> : null}
          </div>
        );
      })}
    </div>
  );
  return (
    <Scene gap={24}>
      {partA ? (
        <div style={{display: 'flex', flexDirection: 'column', gap: 30, opacity: gone(frame, inventee - 4)}}>
          {/* Le modèle, et une flèche (draw-on) qui descend vers les suites possibles. */}
          <Pop at={0} style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4}}>
            <Model w={180} />
            <svg width={180} height={56} viewBox="0 0 180 56"><Draw d="M90 4 L90 48 M74 32 L90 50 L106 32" p={ease(frame, 4, 16)} width={8} len={110} color="#fff" /></svg>
          </Pop>
          {list(false)}
        </div>
      ) : null}
      {partB && !partC ? (
        <div style={{display: 'flex', justifyContent: 'space-between', opacity: frame >= dit ? gone(frame, dit) : 1}}>
          {[
            {label: 'date inventée', a: inventee, lit: true},
            {label: 'date exacte', a: exacte, lit: false},
          ].map(({label, a, lit}, k) => (
            <Pop key={k} at={a} style={{width: 420, border: `5px solid ${lit ? accent : '#fff'}`, boxShadow: pixelShadow('#222'), padding: '26px 10px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14}}>
              <Mono size={48} color={lit ? accent : '#fff'}>{label}</Mono>
              {/* L'aiguille monte au même cran sur les deux cadrans. */}
              <Dial v={ease(frame, k === 0 ? sort : exacte + 10, (k === 0 ? sort : exacte + 10) + 14, [0, 0.92])} size={300} />
              <div style={{opacity: frame >= assurance ? 1 : 0}}><Mono size={48} color={LABEL}>assurance</Mono></div>
            </Pop>
          ))}
        </div>
      ) : null}
      {partC ? (
        <>
          <Pop at={dit}>{list(true)}</Pop>
          {/* L'aveu, une suite parmi d'autres : sa barre est minuscule, jusqu'à ce que l'entraînement la pousse. */}
          <Pop at={sais} style={{display: 'flex', flexDirection: 'column', gap: 10, marginTop: 6}}>
            <Mono size={60} color="#fff">« je ne sais pas »</Mono>
            <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
              <div style={{width: 230}} />
              <div style={{width: BAR * (0.03 + 0.37 * push), height: 40, background: frame >= entr ? accent : '#888'}} />
              <div style={{opacity: frame >= entr ? 1 : 0}}><Mono size={48} color={accent}>entraînement</Mono></div>
            </div>
          </Pop>
        </>
      ) : null}
    </Scene>
  );
};

// ---------- 5. La preuve : deux grilles de cent questions, une case contre plus de la moitié ----------

// Une grille de 100 cases, 20 colonnes sur 5 rangées, lue colonne par colonne : `lit` cases « je ne sais pas »
// en couleur d'accent ; `one` (l'échelle de la case, 0 = éteinte) allume une seule case au milieu.
const Grid: React.FC<{show: number; lit: number; one?: number; half?: number}> = ({show, lit, one, half = 0}) => {
  const accent = useAccent();
  const cell = 32;
  const gap = 5;
  return (
    <div style={{position: 'relative', display: 'grid', gridTemplateColumns: `repeat(20, ${cell}px)`, gridTemplateRows: `repeat(5, ${cell}px)`, gridAutoFlow: 'column', gap, clipPath: `inset(0 ${100 - show * 100}% 0 0)`}}>
      {Array.from({length: 100}, (_, k) => {
        const solo = one !== undefined && k === 47 && one > 0;
        const on = one !== undefined ? solo : k < lit;
        return <div key={k} style={{background: on ? accent : '#4a4a4a', transform: solo ? `scale(${one})` : undefined}} />;
      })}
      {/* La moitié : un trait pointillé entre la 10e et la 11e colonne, dessiné sur « deux ». */}
      {half > 0 ? (
        <svg width={40} height={5 * cell + 4 * gap + 40} viewBox={`0 0 40 ${5 * cell + 4 * gap + 40}`} style={{position: 'absolute', left: 10 * (cell + gap) - gap / 2 - 20, top: -20}}>
          <line x1="20" y1="0" x2="20" y2={(5 * cell + 4 * gap + 40) * half} stroke="#fff" strokeWidth="6" strokeDasharray="12 8" />
        </svg>
      ) : null}
    </div>
  );
};

const Aveu: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const test = at('aveu', 'test');
  const culture = at('aveu', 'culture');
  const internet = at('aveu', 'internet');
  const o4 = at('aveu', 'o4');
  const une = at('aveu', "qu'une");
  const gpt = at('aveu', 'GPT-5');
  const disait = at('aveu', 'disait');
  const sais = at('aveu', 'sais');
  const deux = at('aveu', 'deux');
  // Compte calé sur la voix (linéaire) : 52 cases s'allument de « disait » à « deux ».
  const lit = Math.round(interpolate(frame, [disait, deux + 4], [0, 52], clamp));
  return (
    <Scene
      gap={22}
      bottom={
        <Pop at={sais} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20}}>
          <div style={{width: 44, height: 44, background: accent}} />
          <Mono size={52} color="#fff">« je ne sais pas »</Mono>
        </Pop>
      }
    >
      {/* Le test : une feuille, « culture générale », et le wifi barré pour « sans internet ». */}
      <div style={{display: 'flex', alignItems: 'center', gap: 24, minHeight: 84}}>
        <Pop at={Math.max(2, test - 4)} style={{width: 64, height: 84, background: '#efe9dc', border: '4px solid #000', boxShadow: pixelShadow('#444'), padding: 10, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 8}}>
          {[80, 60, 70].map((w, k) => <div key={k} style={{height: 7, width: `${w}%`, background: '#9a9384'}} />)}
        </Pop>
        <Pop at={culture}><Mono size={52} color="#fff">culture générale</Mono></Pop>
        <Pop at={internet} style={{marginLeft: 'auto', lineHeight: 0}}>
          <svg width={96} height={96} viewBox="0 0 100 100">
            <path d="M14 42 a52 52 0 0 1 72 0 M26 56 a34 34 0 0 1 48 0 M38 70 a16 16 0 0 1 24 0" fill="none" stroke="#fff" strokeWidth="8" strokeLinecap="round" />
            <circle cx="50" cy="82" r="6" fill="#fff" />
            <Draw d="M16 16 L84 90" p={ease(frame, internet + 4, internet + 14)} width={9} len={110} color={accent} />
          </svg>
        </Pop>
      </div>
      <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
        <Pop at={o4}><Mono size={56} color="#fff">o4-mini</Mono></Pop>
        {/* wipe de la grille, puis une seule case qui s'allume sur « qu'une », avec le seul punch zoom du short. */}
        <div style={{opacity: frame >= o4 ? 1 : 0}}>
          <Grid show={ease(frame, o4 + 2, o4 + 16, [0, 1], 'inOut')} lit={0} one={frame >= une ? punch(frame, une) : 0} />
        </div>
      </div>
      <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
        <Pop at={gpt}><Mono size={56} color="#fff">GPT-5 thinking mini</Mono></Pop>
        <div style={{opacity: frame >= gpt ? 1 : 0}}>
          <Grid show={ease(frame, gpt + 2, gpt + 16, [0, 1], 'inOut')} lit={lit} half={ease(frame, deux, deux + 12)} />
        </div>
      </div>
    </Scene>
  );
};

// ---------- 6. Chute : la même question dans une conversation neuve, une autre date ----------

const Panel: React.FC<{children: React.ReactNode; label?: React.ReactNode; style?: React.CSSProperties}> = ({children, label, style}) => (
  <div style={{border: '6px solid #444', borderRadius: 30, padding: '18px 26px', display: 'flex', flexDirection: 'column', gap: 14, position: 'relative', ...style}}>
    {label}
    {children}
  </div>
);

const Chute: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const certain = at('chute', 'certain');
  const repose = at('chute', 'repose');
  const conversation = at('chute', 'conversation');
  const reponse = at('chute', 'réponse');
  const change = at('chute', 'change');
  const rien = at('chute', 'rien');
  // wipe : la conversation neuve se découvre de haut en bas sur « repose ».
  const wipe = ease(frame, repose, repose + 18, [0, 1], 'inOut');
  const question = (
    <Bub right style={{display: 'flex', alignItems: 'center', gap: 14, padding: '8px 22px'}}>
      <Cake size={56} />
      <Mono size={52} color="#fff">anniversaire ?</Mono>
    </Bub>
  );
  return (
    <Scene gap={64}>
      {/* La conversation du début, reprise telle quelle : la question, la date, et « oui, certain ». */}
      <Pop at={0}>
        <Panel>
          {question}
          <div style={{display: 'flex', alignItems: 'center', gap: 22}}>
            <Bub style={{padding: '4px 26px'}}><Mono size={72} color={frame >= change ? accent : '#fff'}>{DATES[0]}</Mono></Bub>
            <Pop at={certain - 6} style={{position: 'relative'}}>
              <Bub style={{padding: '8px 22px'}}><Mono size={52} color="#fff">« oui, certain »</Mono></Bub>
              {/* draw-on : l'aplomb barré sur « rien ». */}
              <svg width={560} height={100} viewBox="0 0 560 100" style={{position: 'absolute', left: 0, top: -4, opacity: frame >= rien ? 1 : 0}}>
                <Draw d="M12 62 L532 38" p={ease(frame, rien, rien + 10)} width={10} len={540} color={accent} />
              </svg>
            </Pop>
          </div>
        </Panel>
      </Pop>
      {/* La conversation neuve : même question, autre date. */}
      <div style={{position: 'relative', opacity: frame >= repose ? 1 : 0}}>
        <Pop at={conversation} style={{position: 'absolute', left: 26, top: -36, zIndex: 2, background: '#000', padding: '0 12px'}}><Mono size={48} color={LABEL}>conversation neuve</Mono></Pop>
        <Panel style={{borderColor: frame >= conversation ? '#cfcfcf' : '#444', clipPath: `inset(0 0 ${100 - wipe * 100}% 0)`}}>
          {question}
          <div style={{display: 'flex', alignItems: 'center', gap: 22, minHeight: 104}}>
            <div style={{opacity: frame >= reponse ? 1 : 0}}>
              <Bub style={{padding: '4px 26px'}}><Mono size={72} color={frame >= change ? accent : '#fff'}>{typed(frame, reponse, DATES[1], 30) || ' '}</Mono></Bub>
            </div>
            <Pop at={change}><Mono size={84} color={accent}>≠ {DATES[0]}</Mono></Pop>
          </div>
        </Panel>
      </div>
    </Scene>
  );
};

// ---------- Montage ----------

const SCENES: Record<string, React.FC> = {hook: Hook, anniv: Anniv, trois: Trois, ines: Ines, probable: Probable, aveu: Aveu, chute: Chute};

export const MytheSaitPasVoix: React.FC = () => <V.Montage scenes={SCENES} accent={AC} />;

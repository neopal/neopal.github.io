// Short Mythe « L'IA va remplacer tel métier demain » (YouTube / TikTok / Instagram), épisode 29, préparé le
// 2026-11-02 (calage provisoire, sans voix). Fiche mythe-remplace-metier de lexique/terms.js ; sources dans
// voix/remplace-metier.script.json : Deena Mousa, Works in Progress (25 septembre 2025 : la phrase de 2016 « people should
// stop training radiologists now », plus de 700 modèles de radiologie autorisés par la FDA, record de 1 208 postes d'internat
// en 2025, 36 % du temps à lire des images d'après une étude de 2012) ; Stanford Digital Economy Lab (12 août 2026 : pas de
// destruction d'emplois généralisée, emploi des 22-25 ans des métiers les plus exposés environ 19 % sous la tendance, recul
// par moins d'embauches).
// Fil : l'ép. 28 gardait aux humains ce qui demande du jugement ; ici, un métier se découpe en tâches, et c'est l'embauche
// des juniors qui bouge, pas le métier qui disparaît.
// L'auteur de la phrase du hook n'est pas nommé (shorts mythe, univers.md) : la couverture suffit à sourcer.
// Le radiologue, le patient, les jeunes et la junior sont inventés (sprites dans ce fichier) ; Erik Brynjolfsson est une vraie
// personne : vraie photo de Wikimedia Commons pixelisée, en attente dans public/voix (voir PORTRAIT plus bas).
// Écarts au storyboard, pour que l'écran ne dise que ce que dit la voix : le panneau de la porte est un pictogramme qui se
// retourne (la voix ne dit ni « on recrute » ni « complet ») ; seule la courbe « plus exposés » porte un libellé (la voix
// ne dit pas « moins exposés »). Les trois parts « patients », « médecins », « enseignement » du camembert sont égales et
// sans chiffre : la source ne donne que les 36 %. Le graphique de l'écart n'a ni valeur ni date sur ses axes.
// L'écran suit la voix (univers.md) : chaque élément entre sur le mot qui le nomme, at('scène', 'mot'), jamais en secondes.
// Le mouvement : ease partout, arcs pour ce qui vole (la part « images » vers l'écran d'IA), squash au seul tampon, un seul
// punch zoom (« 1 208 postes »), aucun sur le hook.
import React from 'react';
import {Img, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Big, Check, Draw, Mono, Pop, Scene, W, arc, countUp, ease, punch, typed, useAccent, withAlpha} from './kit';
import {LABEL, makeVoix} from './voix/VoixShort';
import {Pixel, type Sprite} from './voix/Pixel';
import {Cross, Doc, Stamp, pixelShadow} from './voix/Parts';
import ALIGN from './voix/remplace-metier.align.json';
import SCRIPT from './voix/remplace-metier.script.json';

const AC = '#FF7A7A'; // catégorie Mythes vs réalité
const V = makeVoix(ALIGN, SCRIPT, 'voix/prediction-music.mp3');
const {at} = V;
export const MYTHEMETIERVOIX_DURATION = V.duration;

// À REMPLACER : portrait réel d'Erik Brynjolfsson, pixelisé en 48 × 63 comme les portraits de MytheInternetVoix, attendu
// dans public/voix/remplace-metier-brynjolfsson.png (photo Wikimedia Commons, licence et crédit à vérifier, à reporter dans
// le champ credits du script). Passer à true une fois le fichier posé : à false, un buste gris générique tient la place
// (un <Img> sur un fichier absent ferait échouer le rendu).
const PORTRAIT = false;

// Sortie : 6 images en inOut (plus rapide que l'entrée Pop).
const gone = (frame: number, until: number) => ease(frame, until, until + 6, [1, 0], 'inOut');
const SKIN = '#e3b58e';
const SKIN2 = '#b07a52';
const TAPE = 'rgba(239,233,220,0.85)';

// ---------- Personnages (sprites propres à ce short, même format que Pixel.tsx : S peau, E yeux qui clignent) ----------

// Le radiologue : cheveux bruns, lunettes, blouse blanche sur chemise bleue. Deux poses, mêmes dimensions.
const RADIO_PAL = {H: '#3a2a1e', S: SKIN, E: '#111', G: '#222', M: '#9a5a4a', C: '#4f7fd0', W: '#f2f2f2'};
const RADIO: Sprite = {
  rows: ['................', '.....HHHHHH.....', '....HHHHHHHH....', '....HSSSSSSH....', '....GGGSSGGG....', '....GEGSSGEG....', '....SSSSSSSS....', '.....SSMMSS.....', '......SSSS......', '...WWWWCCWWWW...', '..WWWWWCCWWWWW..', '..WWWWWCCWWWWW..', '..SWWWWCCWWWWS..', '..SWWWWWWWWWWS..', '....WWWWWWWW....', '....WWWWWWWW....'],
  palette: RADIO_PAL,
};
// Il se tourne vers le patient (à sa droite) et lui tend la main.
const RADIO_TOURNE: Sprite = {
  rows: ['................', '.....HHHHHH.....', '....HHHHHHHH....', '....HSSSSSSH....', '....HSSSGGGGG...', '....HSSSGEGSG...', '....SSSSSSSSS...', '.....SSSSMMS....', '......SSSS......', '...WWWWCCWWWW...', '..WWWWWCCWWWWWSS', '..WWWWWCCWWWWWSS', '..SWWWWCCWWWW...', '..SWWWWWWWWWW...', '....WWWWWWWW....', '....WWWWWWWW....'],
  palette: RADIO_PAL,
};

// Une silhouette de 12 × 16 : cheveux, peau, haut, bas. Les jeunes de la file, le patient, la junior.
const person = (h: string, s: string, t: string, p: string): Sprite => ({
  rows: ['............', '....HHHH....', '...HHHHHH...', '...HSSSSH...', '...SESSES...', '...SSSSSS...', '....SSSS....', '..TTTTTTTT..', '.TTTTTTTTTT.', '.TTTTTTTTTT.', '.STTTTTTTTS.', '.STTTTTTTTS.', '..PPPPPPPP..', '..PPP..PPP..', '..PPP..PPP..', '..KKK..KKK..'],
  palette: {H: h, S: s, E: '#111', T: t, P: p, K: '#111'},
});
const JEUNES = [
  person('#1e1e1e', SKIN2, '#3a8b5a', '#2f3f6a'),
  person('#c9a46a', SKIN, '#8e4a7a', '#333'),
  person('#4b2e1e', SKIN, '#d08a3a', '#2f3f6a'),
  person('#111', '#8a5a3a', '#4f7fd0', '#444'),
  person('#6b4a2b', SKIN, '#c0392b', '#2f2f2f'),
];
// Le patient : cheveux gris, blouse d'hôpital bleu clair.
const PATIENT = person('#b9b9b9', SKIN, '#8ec5e8', '#8ec5e8');
// La junior : une jeune en blouse blanche.
const JUNIOR = person('#4b2e1e', SKIN2, '#f2f2f2', '#2f3f6a');

// Une blouse sur son cintre (les postes d'internat).
const BLOUSE: Sprite = {
  rows: ['....KK....', '...K..K...', '.WWWWWWWW.', 'WWWWCCWWWW', 'WWWWCCWWWW', 'WW.WWWW.WW', 'WW.WWWW.WW', 'WW.WKWW.WW', '...WWWW...', '...WWWW...'],
  palette: {K: '#9a9a9a', W: '#f2f2f2', C: '#4f7fd0'},
};

// Buste gris générique : il tient la place du portrait réel tant que le fichier n'est pas dans public/voix.
const BUSTE: Sprite = {
  rows: ['............', '....HHHH....', '...HHHHHH...', '...HSSSSH...', '...SSSSSS...', '...SSSSSS...', '...SSSSSS...', '....SSSS....', '.....SS.....', '..TTTTTTTT..', '.TTTTTTTTTT.', '.TTTTTTTTTT.', 'TTTTTTTTTTTT', 'TTTTTTTTTTTT', 'TTTTTTTTTTTT', 'TTTTTTTTTTTT'],
  palette: {H: '#5a5a5a', S: '#8a8a8a', T: '#4a4a4a'},
};

// ---------- Objets dessinés (SVG maison) ----------

// Une radio de thorax : le film noir, les poumons sombres, la colonne, les côtes, les clavicules, le cœur.
const Film: React.FC<{w: number}> = ({w}) => (
  <svg width={w} height={(w * 190) / 220} viewBox="0 0 220 190" style={{display: 'block'}}>
    <rect width="220" height="190" fill="#111" />
    <ellipse cx="72" cy="100" rx="44" ry="66" fill="#2a3036" />
    <ellipse cx="148" cy="100" rx="44" ry="66" fill="#2a3036" />
    <ellipse cx="128" cy="134" rx="32" ry="26" fill="#6a7378" opacity="0.75" />
    <rect x="106" y="10" width="8" height="175" fill="#cfd8dc" opacity="0.85" />
    {[48, 66, 84, 102, 120, 138].map((y) => (
      <React.Fragment key={y}>
        <path d={`M106 ${y} Q 66 ${y - 14} 34 ${y + 16}`} stroke="#cfd8dc" strokeWidth="4" fill="none" opacity="0.8" />
        <path d={`M114 ${y} Q 154 ${y - 14} 186 ${y + 16}`} stroke="#cfd8dc" strokeWidth="4" fill="none" opacity="0.8" />
      </React.Fragment>
    ))}
    <path d="M106 32 Q 76 22 40 34 M114 32 Q 144 22 180 34" stroke="#e8eef0" strokeWidth="6" fill="none" />
  </svg>
);

// Le négatoscope : un caisson lumineux gris, la radio collée au scotch, la lumière qui déborde autour du film.
const Negatoscope: React.FC<{w: number}> = ({w}) => {
  const k = w / 300;
  return (
    <div style={{position: 'relative', width: w, height: 250 * k}}>
      <div style={{position: 'absolute', inset: 0, background: '#bfc5c9', border: `${Math.round(6 * k)}px solid #555`, boxSizing: 'border-box', boxShadow: pixelShadow('#2a2a2a')}} />
      <div style={{position: 'absolute', left: 16 * k, top: 16 * k, right: 16 * k, bottom: 30 * k, background: '#eef6fb', boxShadow: '0 0 60px rgba(220,240,255,0.45)'}} />
      <div style={{position: 'absolute', left: 46 * k, top: 22 * k, transform: 'rotate(-1.5deg)'}}><Film w={208 * k} /></div>
      {/* Scotch aux deux coins du haut du film. */}
      <div style={{position: 'absolute', left: 26 * k, top: 14 * k, width: 60 * k, height: 18 * k, background: TAPE, transform: 'rotate(-28deg)'}} />
      <div style={{position: 'absolute', left: 214 * k, top: 14 * k, width: 60 * k, height: 18 * k, background: TAPE, transform: 'rotate(28deg)'}} />
      {/* L'interrupteur du caisson. */}
      <div style={{position: 'absolute', right: 24 * k, bottom: 9 * k, width: 16 * k, height: 12 * k, background: '#4CD964'}} />
    </div>
  );
};

// Un écran posé sur pied ; `on` : l'écran d'IA allumé (cadre et lueur en couleur d'accent).
const Ecran: React.FC<{w: number; on?: number; children?: React.ReactNode}> = ({w, on = 0, children}) => {
  const accent = useAccent();
  const h = w * 0.72;
  return (
    <div style={{position: 'relative', width: w, height: h + w * 0.16}}>
      <div style={{position: 'absolute', left: w * 0.42, width: w * 0.16, top: h, height: w * 0.12, background: '#555'}} />
      <div style={{position: 'absolute', left: w * 0.28, width: w * 0.44, top: h + w * 0.1, height: w * 0.06, background: '#555'}} />
      <div style={{position: 'absolute', left: 0, top: 0, width: w, height: h, background: '#161616', border: `${Math.round(w / 28)}px solid ${on > 0.5 ? accent : '#8a8a8a'}`, boxSizing: 'border-box', boxShadow: on > 0 ? `0 0 ${50 * on}px ${withAlpha(accent, 0.5 * on)}` : pixelShadow('#2a2a2a'), display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'}}>
        {children}
      </div>
    </div>
  );
};

// Le bureau : un plateau de bois et deux pieds.
const Bureau: React.FC<{w: number; legs: number}> = ({w, legs}) => (
  <div style={{position: 'relative', width: w, height: 28 + legs}}>
    <div style={{position: 'absolute', left: 0, top: 0, width: w, height: 28, background: '#8a6a4a', borderTop: '6px solid #b08a5a', boxSizing: 'border-box'}} />
    <div style={{position: 'absolute', left: 24, top: 28, width: 20, height: legs, background: '#6a4f36'}} />
    <div style={{position: 'absolute', right: 24, top: 28, width: 20, height: legs, background: '#6a4f36'}} />
  </div>
);

// ---------- Le camembert des tâches (scènes taches et chute) ----------

// Angles en degrés, sens horaire depuis midi. La part « images » fait 36 % (129,6°) ; les trois autres, dont la source
// ne donne pas le partage, sont égales et ne portent aucun chiffre.
const PARTS: {from: number; to: number; color: string; label: string}[] = [
  {from: 0, to: 129.6, color: AC, label: 'images'},
  {from: 129.6, to: 206.4, color: '#f2f2f2', label: 'patients'},
  {from: 206.4, to: 283.2, color: '#bdbdbd', label: 'médecins'},
  {from: 283.2, to: 360, color: '#8a8a8a', label: 'enseignement'},
];
const pt = (cx: number, cy: number, r: number, a: number): [number, number] => [cx + r * Math.sin((a * Math.PI) / 180), cy - r * Math.cos((a * Math.PI) / 180)];
const wedge = (cx: number, cy: number, r: number, a0: number, a1: number) => {
  if (a1 - a0 < 0.01) return '';
  const [x0, y0] = pt(cx, cy, r, a0);
  const [x1, y1] = pt(cx, cy, r, Math.min(a1, a0 + 359.99));
  return `M${cx} ${cy} L${x0.toFixed(1)} ${y0.toFixed(1)} A${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} Z`;
};

// p[k] : remplissage de la part k, de 0 à 1 (elle s'ouvre dans le sens horaire) ; `hide` : une part partie ailleurs.
const Camembert: React.FC<{r: number; p: number[]; hide?: number}> = ({r, p, hide = -1}) => (
  <svg width={2 * r + 12} height={2 * r + 12} viewBox={`${-r - 6} ${-r - 6} ${2 * r + 12} ${2 * r + 12}`} style={{display: 'block', overflow: 'visible'}}>
    <circle cx={0} cy={0} r={r} fill="#2a2a2a" stroke="#fff" strokeWidth={6} />
    {PARTS.map(({from, to, color}, k) => (k === hide ? null : <path key={k} d={wedge(0, 0, r, from, from + (to - from) * p[k])} fill={color} stroke="#000" strokeWidth={4} strokeLinejoin="round" />))}
    {hide >= 0 ? <path d={wedge(0, 0, r, PARTS[hide].from, PARTS[hide].to)} fill="none" stroke="#8a8a8a" strokeWidth={5} strokeDasharray="14 10" /> : null}
  </svg>
);

// ---------- 0. Hook : la phrase de 2016 à la machine, le tampon FAUX, la radio sur le négatoscope ----------

const L1 = '« On devrait arrêter';
const L2 = 'dès maintenant';
const L3 = 'de former des';
const L4 = 'radiologues »';
const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const des = at('hook', 'dès');
  const former = at('hook', 'former');
  const radiologues = at('hook', 'radiologues');
  const fin = at('hook', '»');
  const y2016 = at('hook', '2016');
  const radiologues2 = at('hook', 'radiologues', 1);
  const demandes = at('hook', 'demandés');
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 640}}>
        {/* Typewriter : la citation s'écrit sur la voix, une ligne par groupe de mots. */}
        <div style={{position: 'absolute', left: 0, top: -480, display: 'flex', flexDirection: 'column', gap: 4}}>
          <Big size={92}>{typed(frame, 0, L1, 40) || ' '}</Big>
          <Big size={92}>{typed(frame, des - 2, L2, 40) || ' '}</Big>
          <Big size={92}>{typed(frame, former - 6, L3, 40) || ' '}</Big>
          <Big size={92}>{typed(frame, radiologues - 2, L4, 40) || ' '}</Big>
        </div>
        {/* « 2016 » en petit sous la citation, sur le mot. */}
        <Pop at={y2016} style={{position: 'absolute', left: 0, top: -84}}><Mono size={60} color={LABEL}>2016</Mono></Pop>
        {/* Tampon FAUX juste après la citation (squash à l'impact), jusqu'à la fin du hook : l'image de couverture. */}
        <Stamp at={fin + 4} size={96} tilt={-12} bg="rgba(0,0,0,0.6)" style={{right: -20, top: -250, zIndex: 30}}>FAUX</Stamp>
        {/* Décor dès la première image : la radio de thorax collée sur le négatoscope, de travers. */}
        <div style={{position: 'absolute', left: 0, top: 90, transform: 'rotate(-3deg)'}}>
          <Negatoscope w={560} />
        </div>
        {/* « les radiologues n'ont jamais été aussi demandés » : trois radiologues entrent en cascade, en escalier ;
            « demandés » : une flèche monte sous l'escalier (draw-on), sans jamais passer sur eux. */}
        {[0, 1, 2].map((k) => (
          <Pop key={k} at={radiologues2 + 3 * k} style={{position: 'absolute', left: 580 + 90 * k, top: 330 - 130 * k}}>
            <Pixel sprite={RADIO} px={7} seed={k + 1} />
          </Pop>
        ))}
        <svg width={W} height={640} viewBox={`0 0 ${W} 640`} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
          <Draw d="M560 560 L880 320" p={ease(frame, demandes, demandes + 14)} width={10} len={400} color={accent} />
          <Draw d="M844 322 L880 320 L868 354" p={ease(frame, demandes + 10, demandes + 18)} width={10} len={80} color={accent} />
        </svg>
      </div>
    </Scene>
  );
};

// ---------- 1. Tâches : le radiologue à son bureau, le camembert de son temps se construit ----------

const PIE = {cx: 250, cy: 560, r: 210};
const LBL_X = 500;
const LBL_Y = [380, 470, 560, 650];

const Taches: React.FC = () => {
  const frame = useCurrentFrame();
  const paquet = at('taches', 'paquet');
  const etude = at('taches', 'étude');
  const n36 = at('taches', '36');
  const images = at('taches', 'images');
  const patients = at('taches', 'patients');
  const medecins = at('taches', 'médecins');
  const enseignement = at('taches', 'enseignement');
  // Chaque part s'ouvre (draw-on, dans le sens horaire) sur le mot qui la nomme ; « 36 » ouvre la part « images ».
  const cues = [n36, patients, medecins, enseignement];
  const p = cues.map((c, k) => ease(frame, c, c + (k ? 8 : 12)));
  const labels = [images, patients, medecins, enseignement];
  const [tx, ty] = pt(PIE.cx, PIE.cy, PIE.r * 0.56, 64.8);
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 800}}>
        {/* Décor dès l'entrée : le radiologue à son bureau, devant sa radio. */}
        <Pop at={2} style={{position: 'absolute', left: 30, top: -16}}><Pixel sprite={RADIO} px={14} seed={1} /></Pop>
        <Pop at={4} style={{position: 'absolute', left: 250, top: 34}}>
          <Ecran w={200}><Film w={150} /></Ecran>
        </Pop>
        <Pop at={2} style={{position: 'absolute', left: 0, top: 180}}><Bureau w={480} legs={110} /></Pop>
        {/* « une étude de 2012 » : la feuille de l'étude, posée à droite ; elle part quand le camembert se colore. */}
        {frame < n36 + 8 ? (
          <div style={{position: 'absolute', left: 560, top: 20, opacity: gone(frame, n36), transform: 'rotate(4deg)'}}>
            <Pop at={etude}><Doc w={280} lines={4} title="2012" /></Pop>
          </div>
        ) : null}
        {/* « un paquet de tâches » : le disque gris, plein ; les parts le recouvrent ensuite. */}
        <Pop at={paquet} style={{position: 'absolute', left: PIE.cx - PIE.r - 6, top: PIE.cy - PIE.r - 6}}>
          <Camembert r={PIE.r} p={p} />
        </Pop>
        <Pop at={n36 + 6} style={{position: 'absolute', left: tx - 80, top: ty - 40, width: 160, display: 'flex', justifyContent: 'center'}}>
          <Mono size={60} color="#111">36 %</Mono>
        </Pop>
        {/* Les libellés, 4 à 6 images après leur part, avec la pastille de sa couleur. */}
        {PARTS.map(({color, label}, k) => (
          <Pop key={k} at={labels[k] + (k ? 5 : 0)} style={{position: 'absolute', left: LBL_X, top: LBL_Y[k], display: 'flex', alignItems: 'center', gap: 14}}>
            <div style={{width: 30, height: 30, background: color, border: '3px solid #fff', boxSizing: 'border-box'}} />
            <Mono size={48} color={k === 0 ? AC : '#fff'}>{label}</Mono>
          </Pop>
        ))}
      </div>
    </Scene>
  );
};

// ---------- 2. Records : 700 IA autorisées à gauche, 1 208 postes d'internat à droite ----------

const CHIP = 34;
const CHIP_P = 42;
const COL_W = 420;
const RIGHT_X = W - COL_W;
const GRID_TOP = 110;

// Une puce d'IA : un carré gris et ses pattes.
const Puce: React.FC = () => (
  <svg width={CHIP} height={CHIP} viewBox="0 0 34 34" style={{display: 'block'}}>
    {[9, 17, 25].map((v) => (
      <React.Fragment key={v}>
        <rect x={v - 1.5} y={0} width={3} height={6} fill="#9a9a9a" />
        <rect x={v - 1.5} y={28} width={3} height={6} fill="#9a9a9a" />
        <rect x={0} y={v - 1.5} width={6} height={3} fill="#9a9a9a" />
        <rect x={28} y={v - 1.5} width={6} height={3} fill="#9a9a9a" />
      </React.Fragment>
    ))}
    <rect x={5} y={5} width={24} height={24} fill="#cfcfcf" />
    <rect x={11} y={11} width={12} height={12} fill="#555" />
  </svg>
);

const Records: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const y2025 = at('records', '2025');
  const n700 = at('records', '700');
  const ia = at('records', 'IA');
  const aval = at('records', 'aval');
  const ouvert = at('records', 'ouvert');
  const n208 = at('records', '208');
  const postes = at('records', 'postes');
  // Count-up calé sur la voix : 0 -> 700 de « 2025 » à « 700 », 0 -> 1 208 de « ouvert » à « 1 208 ».
  const ias = countUp(frame, y2025, 700, Math.max(8, n700 - y2025));
  const pos = countUp(frame, ouvert, 1208, Math.max(8, n208 - ouvert));
  const nChips = 70;
  const nBlouses = 24;
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 680}}>
        {/* Décor dès l'entrée : les deux socles des compteurs. */}
        <Pop at={2} style={{position: 'absolute', left: 0, top: GRID_TOP + 300, width: COL_W, height: 6, background: '#555'}}><span /></Pop>
        <Pop at={4} style={{position: 'absolute', left: RIGHT_X, top: GRID_TOP + 300, width: COL_W, height: 6, background: '#555'}}><span /></Pop>
        <Pop at={y2025} style={{position: 'absolute', left: 0, right: 0, top: 0, display: 'flex', justifyContent: 'center'}}><Mono size={60} color="#fff">2025</Mono></Pop>
        {/* Stagger : les puces d'IA tombent en grille, dans l'ordre de lecture, pendant le compte. */}
        {Array.from({length: nChips}, (_, k) => {
          const a = y2025 + Math.round((k * Math.max(8, n700 - y2025)) / nChips);
          const x = (k % 10) * CHIP_P;
          const y = GRID_TOP + Math.floor(k / 10) * CHIP_P;
          return (
            <div key={k} style={{position: 'absolute', left: x, top: ease(frame, a, a + 8, [y - 80, y]), opacity: frame >= a ? 1 : 0}}>
              <Puce />
            </div>
          );
        })}
        {/* « l'aval des autorités » : une coche se dessine sur la grille (draw-on). */}
        <div style={{position: 'absolute', left: COL_W / 2 - 90, top: GRID_TOP + 50, opacity: frame >= aval ? 1 : 0}}>
          <Check p={ease(frame, aval, aval + 12)} size={180} color="#4CD964" />
        </div>
        {/* Stagger : les blouses se rangent en colonnes pendant le compte des postes. */}
        {Array.from({length: nBlouses}, (_, k) => {
          const a = ouvert + Math.round((k * Math.max(8, n208 - ouvert)) / nBlouses);
          const x = RIGHT_X + (k % 6) * 70;
          const y = GRID_TOP + Math.floor(k / 6) * 74;
          return (
            <div key={k} style={{position: 'absolute', left: x, top: ease(frame, a, a + 8, [y - 60, y]), opacity: frame >= a ? 1 : 0}}>
              <Pixel sprite={BLOUSE} px={6} />
            </div>
          );
        })}
        <div style={{position: 'absolute', left: 0, width: COL_W, top: GRID_TOP + 330, display: 'flex', justifyContent: 'center', opacity: frame >= y2025 ? 1 : 0}}>
          <Mono size={110} color="#fff">{ias}</Mono>
        </div>
        <Pop at={ia + 4} style={{position: 'absolute', left: 0, width: COL_W, top: GRID_TOP + 470, display: 'flex', justifyContent: 'center'}}><Mono size={56} color={LABEL}>IA</Mono></Pop>
        {/* Le seul punch zoom du short, sur « 1 208 ». */}
        <div style={{position: 'absolute', left: RIGHT_X, width: COL_W, top: GRID_TOP + 330, display: 'flex', justifyContent: 'center', opacity: frame >= ouvert ? 1 : 0, transform: `scale(${punch(frame, n208)})`}}>
          <Mono size={110} color={accent}>{pos}</Mono>
        </div>
        <Pop at={postes + 4} style={{position: 'absolute', left: RIGHT_X, width: COL_W, top: GRID_TOP + 470, display: 'flex', justifyContent: 'center'}}><Mono size={56} color={LABEL}>postes</Mono></Pop>
      </div>
    </Scene>
  );
};

// ---------- 3. Jeunes : le portrait de Brynjolfsson, deux courbes qui se séparent, l'écart de 19 % ----------

// Le graphique n'a ni valeur ni date sur ses axes : il montre une forme. L'axe vertical part de zéro, pour que l'écart
// dessiné soit bien 19 % de la courbe de référence.
const G = {x0: 40, x1: 860, base: 800, h: 520};
const SPLIT = 0.45;
const ref = (t: number) => 0.6 + 0.14 * t;
const smooth = (t: number) => {
  const u = Math.max(0, Math.min(1, (t - SPLIT) / (1 - SPLIT)));
  return u * u * (3 - 2 * u);
};
const expo = (t: number) => ref(t) * (1 - 0.19 * smooth(t));
const gxy = (t: number, v: number): [number, number] => [G.x0 + t * (G.x1 - G.x0), G.base - v * G.h];
const curve = (f: (t: number) => number, t0: number, t1: number) =>
  Array.from({length: 41}, (_, i) => gxy(t0 + ((t1 - t0) * i) / 40, f(t0 + ((t1 - t0) * i) / 40)));
const toPath = (pts: [number, number][]) => 'M' + pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L');
const lenOf = (pts: [number, number][]) => pts.reduce((s, p, i) => (i ? s + Math.hypot(p[0] - pts[i - 1][0], p[1] - pts[i - 1][1]) : 0), 0);

const PW = 150;
const PH = Math.round((PW * 63) / 48);
const Portrait: React.FC<{at: number}> = ({at: a}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  // Collé d'un coup : il arrive grand et de travers, puis se cale.
  const slap = spring({frame: frame - a, fps, config: {damping: 12, stiffness: 260}});
  return (
    <div style={{position: 'relative', opacity: frame >= a ? 1 : 0, transform: `scale(${1.4 - 0.4 * slap}) rotate(${-4 * (2 - slap)}deg)`}}>
      <div style={{width: PW, height: PH, border: '8px solid #fff', background: '#3a3a3a', boxShadow: pixelShadow('#333'), lineHeight: 0, overflow: 'hidden'}}>
        {PORTRAIT ? (
          <Img src={staticFile('voix/remplace-metier-brynjolfsson.png')} style={{width: PW, height: PH, imageRendering: 'pixelated', display: 'block'}} />
        ) : (
          // À REMPLACER : buste générique en attendant le portrait pixelisé d'Erik Brynjolfsson.
          <Pixel sprite={BUSTE} px={PW / 12} style={{display: 'block', marginTop: PH - (16 * PW) / 12}} />
        )}
      </div>
      <div style={{position: 'absolute', left: -22, top: -12, width: 84, height: 26, background: TAPE, transform: 'rotate(-30deg)'}} />
      <div style={{position: 'absolute', right: -22, top: -12, width: 84, height: 26, background: TAPE, transform: 'rotate(30deg)'}} />
    </div>
  );
};

const Jeunes: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const aout = at('jeunes', 'août');
  const stanford = at('jeunes', 'Stanford');
  const brynjolfsson = at('jeunes', 'Brynjolfsson');
  const destruction = at('jeunes', 'destruction');
  const mais = at('jeunes', 'mais');
  const ans = at('jeunes', '22-25');
  const exposes = at('jeunes', 'exposés');
  const n19 = at('jeunes', '19');
  // « pas de destruction d'emplois » : les deux courbes avancent ensemble, à plat (draw-on) ;
  // « exposés » : elles reprennent, et la courbe des plus exposés se détache vers le bas.
  const t1 = ease(frame, destruction, mais, [0, SPLIT]);
  const t2 = ease(frame, exposes, exposes + 30, [SPLIT, 1]);
  const t = frame < exposes ? t1 : t2;
  const refPts = curve(ref, 0, t);
  const expPts = curve(expo, 0, t);
  // « 19 % » : l'écart se colore (fade in), entre les deux courbes, de la séparation à la fin.
  const gapP = ease(frame, n19, n19 + 10);
  const top = curve(ref, SPLIT, 1);
  const bot = curve(expo, SPLIT, 1).reverse();
  const gap = toPath([...top, ...bot]) + ' Z';
  const [ex, ey] = gxy(1, expo(1));
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 840}}>
        {/* « août 2026, à Stanford » : la date, puis le lieu ; « Brynjolfsson » : son portrait collé d'un coup. */}
        <Pop at={aout} style={{position: 'absolute', left: 230, top: 110}}><Mono size={48} color={LABEL}>août 2026</Mono></Pop>
        <Pop at={stanford} style={{position: 'absolute', left: 230, top: 30}}><Mono size={60} color="#fff">Stanford</Mono></Pop>
        <div style={{position: 'absolute', left: 20, top: 10}}><Portrait at={brynjolfsson} /></div>
        {/* Décor dès l'entrée : les axes, sans valeur ni date. */}
        <Pop at={2} style={{position: 'absolute', left: 0, top: 0, width: W, height: 840}}>
          <svg width={W} height={840} viewBox={`0 0 ${W} 840`} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
            <path d={`M${G.x0} ${G.base} H${G.x1 + 20}`} stroke="#fff" strokeWidth="6" />
            <path d={`M${G.x0} ${G.base} V${G.base - G.h + 40}`} stroke="#666" strokeWidth="5" />
          </svg>
        </Pop>
        <svg width={W} height={840} viewBox={`0 0 ${W} 840`} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
          <path d={gap} fill={withAlpha(accent, 0.45)} opacity={gapP} />
          {t > 0.001 ? <path d={toPath(refPts)} fill="none" stroke="#9a9a9a" strokeWidth={10} strokeLinejoin="round" strokeLinecap="round" /> : null}
          {t > 0.001 ? <path d={toPath(expPts)} fill="none" stroke={t > SPLIT + 0.01 ? accent : '#fff'} strokeWidth={10} strokeLinejoin="round" strokeLinecap="round" strokeDasharray={lenOf(expPts) + 1} /> : null}
        </svg>
        {/* « 22-25 ans » : le titre du graphique, sur le mot. */}
        <Pop at={ans} style={{position: 'absolute', left: G.x0 + 30, top: 290}}><Mono size={56} color="#fff">22-25 ans</Mono></Pop>
        {/* Seule la courbe qui se détache porte un libellé : la voix dit « les plus exposés », pas « moins exposés ». */}
        <Pop at={exposes + 20} style={{position: 'absolute', right: W - ex, top: ey + 22}}><Mono size={52} color={accent}>plus exposés</Mono></Pop>
        <Pop at={n19 + 4} style={{position: 'absolute', right: W - ex, top: ey + 100}}><Mono size={72} color={accent}>{'−19 %'}</Mono></Pop>
      </div>
    </Scene>
  );
};

// ---------- 4. Embauche : la porte du bureau, la file des jeunes qui s'allonge, le chômage qui reste plat ----------

const DOOR = {x: 470, w: 220, top: 110, bottom: 470};
const QUEUE_X = [345, 240, 135, 30, -75];

// Le panneau de la porte, en pictogramme (la voix ne dit ni « on recrute » ni « complet ») : vert avec un « + » et une
// silhouette (on embauche), puis, retourné, rouge barré.
const Panneau: React.FC<{flip: number}> = ({flip}) => {
  const open = flip < 0.5;
  return (
    <div style={{width: 200, height: 120, transform: `scaleY(${Math.abs(Math.cos(Math.PI * flip))})`, background: open ? '#2f8a4f' : '#c0392b', border: '6px solid #fff', boxSizing: 'border-box', boxShadow: pixelShadow('#222'), display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16}}>
      {open ? (
        <>
          <svg width={48} height={64} viewBox="0 0 12 16" shapeRendering="crispEdges">
            <rect x="4" y="1" width="4" height="4" fill="#fff" />
            <rect x="2" y="6" width="8" height="6" fill="#fff" />
            <rect x="3" y="12" width="2" height="4" fill="#fff" />
            <rect x="7" y="12" width="2" height="4" fill="#fff" />
          </svg>
          <svg width={52} height={52} viewBox="0 0 10 10"><path d="M5 1 V9 M1 5 H9" stroke="#fff" strokeWidth="2.4" /></svg>
        </>
      ) : (
        <div style={{width: 130, height: 26, background: '#fff'}} />
      )}
    </div>
  );
};

const Embauche: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const jeunes = at('embauche', 'jeunes');
  const nembauche = at('embauche', "n'embauche");
  const licenciements = at('embauche', 'licenciements');
  const embauche2 = at('embauche', 'embauche', 1);
  const lieu = at('embauche', 'lieu');
  const voit = at('embauche', 'voit');
  const chomage = at('embauche', 'chômage');
  const flip = ease(frame, nembauche, nembauche + 10, [0, 1], 'inOut');
  // La file : trois jeunes sur « jeunes », puis elle s'allonge sur « embauche » et « lieu » (ils entrent par la gauche).
  const arrive = [jeunes, jeunes + 3, jeunes + 6, embauche2, lieu];
  // « licenciements » : la flèche de sortie se dessine, puis se barre (personne ne sort).
  const outP = ease(frame, licenciements, licenciements + 10);
  const crossP = ease(frame, licenciements + 10, licenciements + 20);
  // « ne se voit pas dans les chiffres du chômage » : la courbe se dessine, à plat (draw-on, 1,5 s).
  const flat = 'M0 690 C 120 684, 220 696, 330 688 S 560 694, 680 688 S 820 692, 888 689';
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 800}}>
        {/* Décor dès l'entrée : le mur du bureau, la porte fermée et son panneau. */}
        <Pop at={2} style={{position: 'absolute', left: 250, top: 40, width: W - 250, height: DOOR.bottom - 40, background: '#262626', borderTop: '6px solid #444'}}><span /></Pop>
        <Pop at={2} style={{position: 'absolute', left: DOOR.x, top: DOOR.top, width: DOOR.w, height: DOOR.bottom - DOOR.top, background: '#6a4f36', border: '8px solid #b08a5a', boxSizing: 'border-box'}}>
          <div style={{position: 'absolute', right: 22, top: 170, width: 22, height: 22, borderRadius: 11, background: '#e0c060'}} />
        </Pop>
        <div style={{position: 'absolute', left: DOOR.x + DOOR.w / 2 - 100, top: DOOR.top + 30}}>
          <Pop at={4}><Panneau flip={flip} /></Pop>
        </div>
        <div style={{position: 'absolute', left: 0, right: 0, top: DOOR.bottom, height: 6, background: '#777'}} />
        {/* La file des jeunes devant la porte. */}
        {QUEUE_X.map((x, k) => {
          const a = arrive[k];
          return frame >= a ? (
            <div key={k} style={{position: 'absolute', left: ease(frame, a, a + 14, [x - 160, x], 'inOut'), top: DOOR.bottom - 144, opacity: ease(frame, a, a + 5)}}>
              <Pixel sprite={JEUNES[k]} px={9} seed={k + 2} />
            </div>
          ) : null;
        })}
        {/* Personne ne sort : la flèche de sortie, barrée. */}
        <svg width={W} height={800} viewBox={`0 0 ${W} 800`} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
          <Draw d={`M${DOOR.x + DOOR.w + 20} 380 H860 M828 350 L860 380 L828 410`} p={outP} width={10} len={260} color="#cfcfcf" />
        </svg>
        <div style={{position: 'absolute', left: 720, top: 300, opacity: frame >= licenciements + 10 ? 1 : 0}}><Cross p={crossP} size={160} color="#FF4D4D" /></div>
        {/* En bas : la courbe du chômage reste plate. */}
        <svg width={W} height={800} viewBox={`0 0 ${W} 800`} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
          <path d="M0 760 H888" stroke="#555" strokeWidth="5" opacity={frame >= voit ? 1 : 0} />
          <Draw d={flat} p={ease(frame, voit, voit + 40)} width={10} len={900} color={accent} />
        </svg>
        <Pop at={chomage} style={{position: 'absolute', left: 0, top: 580}}><Mono size={56} color="#fff">chômage</Mono></Pop>
      </div>
    </Scene>
  );
};

// ---------- 5. Chute : le radiologue à son bureau, l'IA prend la part « images », il se tourne vers le patient ----------

const CPIE = {cx: 720, cy: 150, r: 130};
const SCREEN = {x: 10, y: 300, w: 270};

const Chute: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const taches = at('chute', 'tâches');
  const partent = at('chute', 'partent');
  const ia = at('chute', "l'IA");
  const juniors = at('chute', 'juniors');
  // « partent à l'IA » : la part « images » se détache du camembert et vole en arc jusqu'à l'écran, qui s'allume.
  const fly = ease(frame, partent, ia + 6, [0, 1], 'inOut');
  const [cx0, cy0] = pt(CPIE.cx, CPIE.cy, 0, 0);
  const [fx, fy] = arc(fly, [cx0, cy0], [SCREEN.x + SCREEN.w / 2, SCREEN.y + SCREEN.w * 0.36], 120);
  const on = ease(frame, ia + 6, ia + 14);
  const turned = frame >= ia + 14;
  // « tâches » : le camembert prend un léger highlight (contour en couleur d'accent).
  const hl = ease(frame, taches, taches + 8);
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 820}}>
        {/* Décor dès l'entrée : le camembert complet, l'écran avec la radio, le radiologue à son bureau, le patient qui attend. */}
        <Pop at={2} style={{position: 'absolute', left: CPIE.cx - CPIE.r - 6, top: CPIE.cy - CPIE.r - 6}}>
          <div style={{borderRadius: '50%', boxShadow: `0 0 0 ${8 * hl}px ${withAlpha(accent, 0.6)}`}}>
            <Camembert r={CPIE.r} p={[1, 1, 1, 1]} hide={frame >= partent ? 0 : -1} />
          </div>
        </Pop>
        <Pop at={2} style={{position: 'absolute', left: SCREEN.x, top: SCREEN.y}}>
          <Ecran w={SCREEN.w} on={on}>
            {on > 0.5 ? <Mono size={96} color={accent}>IA</Mono> : <Film w={200} />}
          </Ecran>
        </Pop>
        <Pop at={2} style={{position: 'absolute', left: 300, top: 260}}><Pixel sprite={turned ? RADIO_TOURNE : RADIO} px={18} seed={1} /></Pop>
        <Pop at={2} style={{position: 'absolute', left: 0, top: 520}}><Bureau w={W} legs={180} /></Pop>
        <Pop at={4} style={{position: 'absolute', left: 680, top: 470}}><Pixel sprite={PATIENT} px={14} seed={3} /></Pop>
        {/* La part qui vole, puis se fond dans l'écran. */}
        {frame >= partent && on < 1 ? (
          <svg width={2 * CPIE.r} height={2 * CPIE.r} viewBox={`${-CPIE.r} ${-CPIE.r} ${2 * CPIE.r} ${2 * CPIE.r}`} style={{position: 'absolute', left: fx - CPIE.r, top: fy - CPIE.r, overflow: 'visible', transform: `scale(${1 - 0.5 * fly})`, opacity: 1 - on}}>
            <path d={wedge(0, 0, CPIE.r, PARTS[0].from, PARTS[0].to)} fill={accent} stroke="#000" strokeWidth={4} />
          </svg>
        ) : null}
        {/* « combien de juniors » : la junior en blouse entre à côté du bureau, son libellé 5 images après. */}
        <Pop at={juniors} style={{position: 'absolute', left: 80, top: 500}}><Pixel sprite={JUNIOR} px={13} seed={4} /></Pop>
        <Pop at={juniors + 5} style={{position: 'absolute', left: 262, top: 600}}><Mono size={56} color="#fff">juniors</Mono></Pop>
      </div>
    </Scene>
  );
};

// ---------- Montage ----------

const SCENES: Record<string, React.FC> = {hook: Hook, taches: Taches, records: Records, jeunes: Jeunes, embauche: Embauche, chute: Chute};

export const MytheMetierVoix: React.FC = () => <V.Montage scenes={SCENES} accent={AC} />;

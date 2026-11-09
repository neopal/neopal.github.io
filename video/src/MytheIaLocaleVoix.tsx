// Short Mythe « Une IA locale, c'est ChatGPT chez soi » (YouTube / TikTok / Instagram), épisode 32, sortie le 2026-11-17,
// préparé le 2026-11-09 (calage provisoire, sans voix). Fiche mythe-ia-locale de lexique/terms.js ; sources dans
// voix/ia-locale.script.json : Journal du Geek (20 avril 2026, IA sans réseau quand ChatGPT tombe en panne), OpenAI et Ollama
// (gpt-oss-20b, 16 Go de mémoire), Epoch AI (9 septembre 2025 : six à douze mois de retard sur une carte graphique de joueur),
// fiches Hugging Face de GLM-5.3 et Kimi K3 (753 et 2 780 milliards de paramètres, contre environ 21 milliards).
// Fil : l'ép. 31 finissait sur les sources qu'on vérifie ; ici, on garde tout chez soi, et on paie en retard.
// Accroche sans auteur (phrase provisoire, titre de la fiche) : ni portrait ni objet source. Logo d'application générique
// (une bulle), jamais celui d'OpenAI. Gilles est inventé (sprite dans ce fichier).
// Écarts au storyboard, pour que l'écran ne dise que ce que dit la voix : la barre de téléchargement n'a pas de libellé
// « 14 Go », les blocs du petit et du grand modèle n'ont pas de « 20 Md » ni de « 2 800 Md » (la voix ne dit que « seize
// gigaoctets » et « des dizaines de fois ») ; sur la ligne du temps, le suiveur est la carte graphique, pas un point « ta
// machine » ; l'étiquette de l'affiche dit « un an après » (la voix ne dit « l'an dernier » qu'à la chute, où elle revient).
// Le bloc géant ne tient pas dans le cadre, puis la caméra recule sur « serveurs » et le montre posé sur ses baies.
// L'écran suit la voix (univers.md) : chaque élément entre sur le mot qui le nomme, at('scène', 'mot'), jamais en secondes.
// Le mouvement : ease partout, arcs pour ce qui vole (le modèle vers l'écran, l'enveloppe qui rebondit), squash au seul
// tampon, défilement linéaire du paysage du train, un seul punch zoom (« 6 à 12 mois »), aucun sur le hook.
import React from 'react';
import {useCurrentFrame} from 'remotion';
import {Big, Check, Draw, Mono, Pop, Scene, W, arc, ease, punch, typed, useAccent, withAlpha} from './kit';
import {LABEL, makeVoix} from './voix/VoixShort';
import {Pixel, type Sprite} from './voix/Pixel';
import {Cross, Doc, Model, Stamp, pixelShadow} from './voix/Parts';
import ALIGN from './voix/ia-locale.align.json';
import SCRIPT from './voix/ia-locale.script.json';

const AC = '#FF7A7A'; // catégorie Mythes vs réalité
const V = makeVoix(ALIGN, SCRIPT, 'voix/prediction-music.mp3');
const {at} = V;
export const MYTHEIALOCALEVOIX_DURATION = V.duration;

// Sortie : 6 images en inOut (plus rapide que l'entrée Pop).
const gone = (frame: number, until: number) => ease(frame, until, until + 6, [1, 0], 'inOut');
const TAPE = 'rgba(239,233,220,0.85)';
const SKIN = '#e3b58e';

// ---------- Gilles (sprite propre à ce short, même format que Pixel.tsx : S peau, E yeux qui clignent) ----------

// Gilles : dégarni, tempes grises, moustache, gilet marron sur chemise claire.
const GILLES: Sprite = {
  rows: ['................', '.....SSSSSS.....', '....HSSSSSSH....', '....HSSSSSSH....', '....SESSSSES....', '....SSSSSSSS....', '....SMMMMMMS....', '.....SSSSSS.....', '......SSSS......', '...CCCCWWCCCC...', '..CCCCCWWCCCCC..', '..CCCCCWWCCCCC..', '..SCCCCWWCCCCS..', '..SCCCCCCCCCCS..', '....PPPPPPPP....', '....PPPPPPPP....'],
  palette: {H: '#9a9a9a', S: SKIN, E: '#111', M: '#6b4a2b', C: '#8a5a32', W: '#e8e0d0', P: '#3a4a6a'},
};

// ---------- Objets dessinés (SVG maison) ----------

// Le portable : écran, charnière, base ; `children` s'affiche sur l'écran.
const Portable: React.FC<{w: number; children?: React.ReactNode}> = ({w, children}) => {
  const sh = w * 0.62;
  const b = Math.max(8, w / 26);
  return (
    <div style={{position: 'relative', width: w, height: sh + w * 0.08}}>
      <div style={{position: 'absolute', left: 0, top: 0, width: w, height: sh, background: '#cfd2d6', borderRadius: w / 24, padding: b, boxSizing: 'border-box', boxShadow: pixelShadow('#2a2a2a')}}>
        <div style={{position: 'relative', width: '100%', height: '100%', background: '#0e1520', borderRadius: 6, overflow: 'hidden'}}>{children}</div>
      </div>
      <div style={{position: 'absolute', left: -w * 0.08, top: sh, width: w * 1.16, height: w * 0.05, background: '#b9bdc2', borderRadius: `0 0 ${w / 26}px ${w / 26}px`}} />
      <div style={{position: 'absolute', left: w * 0.4, top: sh, width: w * 0.2, height: w * 0.02, background: '#8f9398'}} />
    </div>
  );
};

// Une conversation sur l'écran : des bulles réduites à des traits, qui arrivent une à une (`n` bulles visibles).
const Chat: React.FC<{w: number; n?: number}> = ({w, n = 3}) => {
  const accent = useAccent();
  const bw = w * 0.62;
  const rows = [true, false, true, false, true].slice(0, n);
  return (
    <div style={{position: 'absolute', inset: 0, padding: w * 0.06, display: 'flex', flexDirection: 'column', gap: w * 0.04, justifyContent: 'flex-end'}}>
      {rows.slice(-3).map((right, k) => (
        <div key={k} style={{alignSelf: right ? 'flex-end' : 'flex-start', width: bw, background: right ? '#2f3a4a' : 'transparent', border: right ? 'none' : `${Math.max(3, w / 120)}px solid ${withAlpha(accent, 0.8)}`, borderRadius: w * 0.05, padding: `${w * 0.03}px ${w * 0.04}px`, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: w * 0.02}}>
          <div style={{height: Math.max(5, w / 60), width: '86%', background: right ? '#9aa4b2' : '#cfcfcf'}} />
          <div style={{height: Math.max(5, w / 60), width: '54%', background: right ? '#9aa4b2' : '#cfcfcf'}} />
        </div>
      ))}
    </div>
  );
};

// Carte d'identité : photo, nom, lignes.
const CarteId: React.FC<{w: number}> = ({w}) => (
  <svg width={w} height={w * 0.63} viewBox="0 0 160 100" style={{display: 'block'}}>
    <rect x="3" y="3" width="154" height="94" rx="10" fill="#dfe8ef" stroke="#fff" strokeWidth="5" />
    <rect x="16" y="20" width="44" height="58" fill="#8aa0b4" />
    <circle cx="38" cy="40" r="11" fill="#e3b58e" />
    <rect x="22" y="56" width="32" height="22" fill="#4f6a86" />
    {[26, 44, 62].map((y, k) => <rect key={y} x="72" y={y} width={[70, 56, 64][k]} height="9" fill="#5a6a7a" />)}
  </svg>
);

// Carte bancaire : bande, puce, numéro.
const CarteBancaire: React.FC<{w: number}> = ({w}) => (
  <svg width={w} height={w * 0.63} viewBox="0 0 160 100" style={{display: 'block'}}>
    <rect x="3" y="3" width="154" height="94" rx="10" fill="#3a5fa0" stroke="#fff" strokeWidth="5" />
    <rect x="20" y="30" width="30" height="22" rx="4" fill="#e0c060" />
    {[0, 1, 2, 3].map((k) => <rect key={k} x={20 + 32 * k} y="66" width="26" height="9" fill="#cfd8e8" />)}
  </svg>
);

// Une enveloppe.
const Enveloppe: React.FC<{w: number}> = ({w}) => (
  <svg width={w} height={w * 0.66} viewBox="0 0 100 66" style={{display: 'block'}}>
    <rect x="3" y="3" width="94" height="60" fill="#f4f1ea" stroke="#777" strokeWidth="4" />
    <path d="M3 3 L50 38 L97 3" fill="none" stroke="#777" strokeWidth="4" />
  </svg>
);

// Icône de réseau (trois arcs et un point).
const Reseau: React.FC<{size: number}> = ({size}) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{display: 'block'}}>
    {[40, 28, 16].map((r, k) => <path key={r} d={`M${50 - r * 1.3} ${78 - r * 0.9} A${r * 1.6} ${r * 1.6} 0 0 1 ${50 + r * 1.3} ${78 - r * 0.9}`} fill="none" stroke="#fff" strokeWidth="9" strokeLinecap="round" opacity={1 - k * 0.1} />)}
    <circle cx="50" cy="80" r="8" fill="#fff" />
  </svg>
);

// Un nuage (le service en ligne) ; `off` : il s'éteint.
const Nuage: React.FC<{w: number; off: number}> = ({w, off}) => (
  <svg width={w} height={w * 0.6} viewBox="0 0 150 90" style={{display: 'block'}}>
    <path d="M30 80 Q4 80 6 58 Q8 38 32 40 Q36 12 66 12 Q92 12 100 34 Q130 28 140 54 Q146 80 118 80 Z" fill={off > 0.5 ? '#5a5a5a' : '#e8eef4'} stroke="#fff" strokeWidth="5" />
  </svg>
);

// Une barrette de mémoire : circuit vert, puces noires, contacts dorés.
const Barrette: React.FC<{w: number}> = ({w}) => (
  <svg width={w} height={w * 0.28} viewBox="0 0 250 70" style={{display: 'block'}}>
    <rect x="2" y="2" width="246" height="56" fill="#2f7a4a" stroke="#fff" strokeWidth="4" />
    {[0, 1, 2, 3, 4].map((k) => <rect key={k} x={16 + 46 * k} y="12" width="34" height="30" fill="#151515" />)}
    {Array.from({length: 22}, (_, k) => <rect key={k} x={8 + 11 * k} y="58" width="7" height="10" fill="#e0c060" />)}
  </svg>
);

// Une baie de serveurs : des tiroirs et leurs voyants.
const Baie: React.FC<{w: number; h: number}> = ({w, h}) => {
  const frame = useCurrentFrame();
  const n = 7;
  return (
    <div style={{width: w, height: h, background: '#1b1b1b', border: '8px solid #8a8a8a', boxSizing: 'border-box', padding: 12, display: 'flex', flexDirection: 'column', gap: 10}}>
      {Array.from({length: n}, (_, k) => (
        <div key={k} style={{flex: 1, background: '#333', display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px'}}>
          {[0, 1, 2].map((j) => <div key={j} style={{width: 12, height: 12, background: (frame + 7 * k + 13 * j) % 24 < 14 ? '#4CD964' : '#1f5a2f'}} />)}
        </div>
      ))}
    </div>
  );
};

// Une carte graphique : circuit, deux ventilateurs, équerre.
const Gpu: React.FC<{w: number}> = ({w}) => {
  const frame = useCurrentFrame();
  return (
    <svg width={w} height={w * 0.46} viewBox="0 0 240 110" style={{display: 'block'}}>
      <rect x="18" y="6" width="218" height="88" rx="6" fill="#2a2a2a" stroke="#fff" strokeWidth="5" />
      <rect x="4" y="2" width="14" height="104" fill="#9a9a9a" />
      {[78, 176].map((cx) => (
        <g key={cx} transform={`rotate(${frame * 9} ${cx} 50)`}>
          <circle cx={cx} cy="50" r="36" fill="#151515" stroke="#777" strokeWidth="4" />
          {[0, 72, 144, 216, 288].map((a) => <path key={a} d={`M${cx} 50 L${cx + 30 * Math.cos((a * Math.PI) / 180)} ${50 + 30 * Math.sin((a * Math.PI) / 180)}`} stroke="#8a8a8a" strokeWidth="8" strokeLinecap="round" />)}
        </g>
      ))}
      {Array.from({length: 14}, (_, k) => <rect key={k} x={60 + 10 * k} y="94" width="6" height="12" fill="#e0c060" />)}
    </svg>
  );
};

// Un ticket de cinéma.
const Ticket: React.FC<{w: number}> = ({w}) => (
  <svg width={w} height={w * 0.5} viewBox="0 0 160 80" style={{display: 'block'}}>
    <path d="M4 4 H156 V30 A10 10 0 0 0 156 50 V76 H4 V50 A10 10 0 0 0 4 30 Z" fill="#e0c060" stroke="#fff" strokeWidth="4" />
    <path d="M112 8 V72" stroke="#8a6a20" strokeWidth="4" strokeDasharray="7 6" />
    {[24, 40, 56].map((y, k) => <rect key={y} x="18" y={y - 4} width={[78, 60, 70][k]} height="8" fill="#8a6a20" />)}
  </svg>
);

// L'affiche du film projetée : nuit, lune, montagnes.
const Affiche: React.FC<{w: number; h: number}> = ({w, h}) => (
  <svg width={w} height={h} viewBox="0 0 220 150" preserveAspectRatio="none" style={{display: 'block'}}>
    <rect width="220" height="150" fill="#1f2f5a" />
    <circle cx="160" cy="40" r="20" fill="#f2e3a0" />
    <path d="M0 150 L50 70 L90 120 L130 60 L190 130 L220 100 V150 Z" fill="#0f1830" />
    <rect x="20" y="20" width="60" height="10" fill="#f2e3a0" opacity="0.7" />
  </svg>
);

// Le projecteur de cinéma : boîtier, objectif à gauche, deux bobines.
const Projecteur: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <svg width={150} height={150} viewBox="0 0 150 150" style={{display: 'block', overflow: 'visible'}}>
      {[46, 108].map((cx) => (
        <g key={cx} transform={`rotate(${frame * 4} ${cx} 40)`}>
          <circle cx={cx} cy="40" r="30" fill="#2a2a2a" stroke="#aaa" strokeWidth="5" />
          {[0, 120, 240].map((a) => <circle key={a} cx={cx + 15 * Math.cos((a * Math.PI) / 180)} cy={40 + 15 * Math.sin((a * Math.PI) / 180)} r="6" fill="#777" />)}
        </g>
      ))}
      <rect x="20" y="70" width="120" height="70" fill="#4a4a4a" stroke="#aaa" strokeWidth="5" />
      <rect x="0" y="90" width="24" height="28" fill="#777" stroke="#aaa" strokeWidth="4" />
    </svg>
  );
};

// ---------- Le garage de Gilles (scènes gilles et chute) ----------

const SHEET = {x: 20, y: 50, w: 440, h: 280};
const LENS: [number, number] = [520, 474];
const DOOR = {x: 690, y: 150, w: 198, h: 510};

// door : 0 ouverte, 1 fermée ; light : le projecteur allumé ; film : l'affiche sur le drap ; gilles : image où il entre.
const Garage: React.FC<{door: number; light: number; film: number; gilles: number; children?: React.ReactNode}> = ({door, light, film, gilles, children}) => {
  const frame = useCurrentFrame();
  return (
    <div style={{position: 'absolute', left: 0, top: 0, width: W, height: 740}}>
      {/* Le mur du fond, les briques, le sol. */}
      <div style={{position: 'absolute', left: 0, top: 0, width: W, height: 670, background: '#262626', borderTop: '8px solid #444', boxSizing: 'border-box'}} />
      <svg width={W} height={670} viewBox={`0 0 ${W} 670`} style={{position: 'absolute', left: 0, top: 0}}>
        {Array.from({length: 13}, (_, k) => <path key={k} d={`M0 ${40 + 50 * k} H${W}`} stroke="#2f2f2f" strokeWidth="4" />)}
      </svg>
      <div style={{position: 'absolute', left: -20, top: 670, width: W + 40, height: 60, background: '#3a3a3a', borderTop: '6px solid #555'}} />
      {/* La porte du garage : la rue la nuit, puis le rideau qui descend. */}
      <div style={{position: 'absolute', left: DOOR.x, top: DOOR.y, width: DOOR.w, height: DOOR.h, background: '#1d2a3a', border: '8px solid #555', boxSizing: 'border-box', overflow: 'hidden'}}>
        <div style={{position: 'absolute', left: 60, top: 60, width: 70, height: 70, borderRadius: 35, background: 'rgba(255,220,140,0.35)'}} />
        <div style={{position: 'absolute', left: 90, top: 100, width: 10, height: 420, background: '#555'}} />
        <div style={{position: 'absolute', left: 0, top: 0, width: '100%', height: `${door * 100}%`, background: 'repeating-linear-gradient(#7a7a7a 0 34px, #5a5a5a 34px 40px)'}} />
      </div>
      {/* Le drap tendu sur une corde, deux pinces. */}
      <div style={{position: 'absolute', left: 0, top: SHEET.y - 14, width: SHEET.x + SHEET.w + 30, height: 6, background: '#9a9a9a'}} />
      <div style={{position: 'absolute', left: SHEET.x, top: SHEET.y, width: SHEET.w, height: SHEET.h, background: '#eeeae0', boxShadow: pixelShadow('#1a1a1a'), overflow: 'hidden'}}>
        <div style={{position: 'absolute', inset: 0, opacity: film}}><Affiche w={SHEET.w} h={SHEET.h} /></div>
      </div>
      {[SHEET.x + 40, SHEET.x + SHEET.w - 60].map((x) => <div key={x} style={{position: 'absolute', left: x, top: SHEET.y - 24, width: 20, height: 34, background: '#c9a46a'}} />)}
      {/* Le faisceau du projecteur, du drap à l'objectif. */}
      <svg width={W} height={740} viewBox={`0 0 ${W} 740`} style={{position: 'absolute', left: 0, top: 0, opacity: light * (0.9 + 0.1 * Math.sin(frame / 2))}}>
        <defs>
          <linearGradient id="faisceau" x1="1" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="rgba(255,240,200,0.55)" />
            <stop offset="1" stopColor="rgba(255,240,200,0.08)" />
          </linearGradient>
        </defs>
        <polygon points={`${SHEET.x},${SHEET.y} ${SHEET.x + SHEET.w},${SHEET.y} ${LENS[0]},${LENS[1] - 10} ${LENS[0]},${LENS[1] + 10} ${SHEET.x},${SHEET.y + SHEET.h}`} fill="url(#faisceau)" />
      </svg>
      {/* Le projecteur sur sa caisse. */}
      <div style={{position: 'absolute', left: 500, top: 560, width: 170, height: 110, background: '#8a6a4a', borderTop: '6px solid #b08a5a', boxSizing: 'border-box'}} />
      <div style={{position: 'absolute', left: 510, top: 412}}><Projecteur /></div>
      {/* Le fauteuil, puis Gilles dedans. */}
      <div style={{position: 'absolute', left: 170, top: 430, width: 260, height: 240}}>
        <div style={{position: 'absolute', left: 30, top: 0, width: 200, height: 200, background: '#8e2b2b', border: '6px solid #5a1a1a', boxSizing: 'border-box'}} />
        <div style={{position: 'absolute', left: 0, top: 120, width: 50, height: 120, background: '#a33a3a', border: '6px solid #5a1a1a', boxSizing: 'border-box'}} />
        <div style={{position: 'absolute', right: 0, top: 120, width: 50, height: 120, background: '#a33a3a', border: '6px solid #5a1a1a', boxSizing: 'border-box'}} />
      </div>
      <Pop at={gilles} style={{position: 'absolute', left: 212, top: 452}}><Pixel sprite={GILLES} px={11} seed={2} /></Pop>
      {children}
    </div>
  );
};

// ---------- 0. Hook : la phrase du mythe à la machine, le tampon FAUX, le portable collé au scotch ----------

const L1 = '« Une IA locale,';
const L2 = "c'est ChatGPT";
const L3 = 'chez soi »';
const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const cest = at('hook', "c'est");
  const chez = at('hook', 'chez');
  const fin = at('hook', '»');
  const dernier = at('hook', 'dernier');
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 640}}>
        {/* Typewriter : la phrase s'écrit sur la voix, une ligne par groupe de mots. */}
        <div style={{position: 'absolute', left: 0, top: -480, display: 'flex', flexDirection: 'column', gap: 4}}>
          <Big size={100}>{typed(frame, 0, L1, 40) || ' '}</Big>
          <Big size={100}>{typed(frame, cest - 2, L2, 40) || ' '}</Big>
          <Big size={100}>{typed(frame, chez - 2, L3, 40) || ' '}</Big>
        </div>
        {/* Tampon FAUX juste après la phrase (squash à l'impact), jusqu'à la fin du hook : l'image de couverture. */}
        <Stamp at={fin + 4} size={96} tilt={-12} bg="rgba(0,0,0,0.6)" style={{right: -10, top: -250, zIndex: 30}}>FAUX</Stamp>
        {/* « l'an dernier » : la seule chose que dit la deuxième phrase, en libellé sous la citation (le hook n'a pas de sous-titre). */}
        <Pop at={dernier} style={{position: 'absolute', left: 0, top: -110}}><Mono size={60} color={LABEL}>l'an dernier</Mono></Pop>
        {/* Décor dès la première image : le portable et sa conversation, collé de travers au scotch. */}
        <div style={{position: 'absolute', left: 150, top: 60, transform: 'rotate(-4deg)'}}>
          <Portable w={560}><Chat w={520} n={3} /></Portable>
          <div style={{position: 'absolute', left: -34, top: -14, width: 120, height: 34, background: TAPE, transform: 'rotate(-32deg)'}} />
          <div style={{position: 'absolute', right: -34, top: -14, width: 120, height: 34, background: TAPE, transform: 'rotate(32deg)'}} />
        </div>
      </div>
    </Scene>
  );
};

// ---------- 1. Vrai : le téléchargement, ni compte ni abonnement, l'enveloppe qui rebondit sur le mur de la maison ----------

const LAP = {x: 214, y: 320, w: 460};
const WALL_R = 768;

const Vrai: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const telecharges = at('vrai', 'télécharges');
  const modele = at('vrai', 'modèle');
  const tourne = at('vrai', 'tourne');
  const compte = at('vrai', 'compte');
  const abonnement = at('vrai', 'abonnement');
  const messages = at('vrai', 'messages');
  const sortent = at('vrai', 'sortent');
  const chez = at('vrai', 'chez');
  // Bar grow : la barre se remplit de « télécharges » à « tourne » ; le modèle vole alors en arc jusque dans l'écran.
  const dl = ease(frame, telecharges, tourne);
  const fly = ease(frame, tourne, tourne + 14, [0, 1], 'inOut');
  const [mx, my] = arc(fly, [354, 30], [LAP.x + 149, LAP.y + 90], 40);
  // L'enveloppe : anticipation (petit recul), elle file vers le mur, rebondit et revient.
  const hit = sortent + 9;
  const envX = frame < sortent ? 470 - 14 * ease(frame, sortent - 5, sortent) : frame < hit ? ease(frame, sortent, hit, [456, WALL_R - 96], 'inOut') : ease(frame, hit, hit + 12, [WALL_R - 96, 560]);
  const flash = ease(frame, hit, hit + 3) * (1 - ease(frame, hit + 4, hit + 14));
  const houseP = ease(frame, messages, messages + 20);
  const homeHi = ease(frame, chez, chez + 8);
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 720}}>
        {/* Décor dès l'entrée : le portable. */}
        <Pop at={2} style={{position: 'absolute', left: LAP.x, top: LAP.y}}><Portable w={LAP.w} /></Pop>
        {/* « télécharges » : la barre de téléchargement (bar grow), sans libellé. Elle part quand le modèle s'installe. */}
        {frame < tourne + 20 ? (
          <div style={{position: 'absolute', left: LAP.x, top: 180, opacity: gone(frame, tourne + 12)}}>
            <Pop at={telecharges}>
              <div style={{width: LAP.w, height: 46, border: '6px solid #fff', boxSizing: 'border-box', padding: 6}}>
                <div style={{width: `${dl * 100}%`, height: '100%', background: accent}} />
              </div>
            </Pop>
          </div>
        ) : null}
        {/* « modèle ouvert » : le bloc du modèle, au-dessus de la barre ; sur « tourne », il vole dans l'écran. */}
        <div style={{position: 'absolute', left: mx, top: my, transform: `scale(${1 - 0.1 * fly})`, transformOrigin: 'top left'}}>
          <Pop at={modele}><Model w={180} /></Pop>
        </div>
        {/* « sans compte », « sans abonnement » : les deux cartes tombent en cascade, chacune barrée 6 images après. */}
        {frame < messages + 8
          ? [
              {a: compte, x: 20, C: CarteId},
              {a: abonnement, x: 628, C: CarteBancaire},
            ].map(({a, x, C}, k) => (
              <div key={k} style={{position: 'absolute', left: x, top: 40, opacity: gone(frame, messages)}}>
                <Pop at={a}>
                  <div style={{position: 'relative'}}>
                    <C w={240} />
                    <div style={{position: 'absolute', left: 50, top: -6, opacity: frame >= a + 6 ? 1 : 0}}><Cross p={ease(frame, a + 6, a + 16)} size={150} color="#FF4D4D" /></div>
                  </div>
                </Pop>
              </div>
            ))
          : null}
        {/* « messages » : le mur de la maison se dessine autour du portable (draw-on) ; il s'allume sur « chez toi ». */}
        <svg width={W} height={720} viewBox={`0 0 ${W} 720`} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
          <Draw d={`M120 680 V280 L444 70 L${WALL_R} 280 V680`} p={houseP} width={12} len={1900} color={homeHi > 0.5 ? accent : '#cfcfcf'} />
          <path d={`M${WALL_R} 300 V660`} stroke={accent} strokeWidth={22} opacity={flash} strokeLinecap="round" />
        </svg>
        {/* L'enveloppe tente de sortir et rebondit contre le mur. */}
        <div style={{position: 'absolute', left: envX, top: LAP.y + 40 - 30 * Math.sin(Math.PI * ease(frame, hit, hit + 12)), zIndex: 5}}>
          <Pop at={messages + 4}><Enveloppe w={90} /></Pop>
        </div>
      </div>
    </Scene>
  );
};

// ---------- 2. Train : le portable sur la tablette, le paysage qui défile, plus de réseau, ChatGPT en panne ----------

const WIN = {w: W, h: 440};
const Paysage: React.FC = () => {
  const frame = useCurrentFrame();
  // Défilement linéaire continu (le seul mouvement linéaire du short avec les ventilateurs) : loin lentement, près vite.
  const far = -((frame * 3) % 400);
  const near = -((frame * 12) % 300);
  return (
    <div style={{position: 'absolute', inset: 0, background: '#1d2a3a', overflow: 'hidden'}}>
      <svg width={WIN.w + 400} height={WIN.h} viewBox={`0 0 ${WIN.w + 400} ${WIN.h}`} style={{position: 'absolute', left: far, top: 0}}>
        {Array.from({length: 4}, (_, k) => <path key={k} d={`M${k * 400} 330 Q${k * 400 + 100} 220 ${k * 400 + 200} 300 Q${k * 400 + 300} 250 ${k * 400 + 400} 330 V${WIN.h} H${k * 400} Z`} fill="#2a4a3a" />)}
      </svg>
      <svg width={WIN.w + 300} height={WIN.h} viewBox={`0 0 ${WIN.w + 300} ${WIN.h}`} style={{position: 'absolute', left: near, top: 0}}>
        <rect x="0" y="360" width={WIN.w + 300} height="80" fill="#3a6a3a" />
        {Array.from({length: 5}, (_, k) => (
          <g key={k}>
            <rect x={k * 300 + 140} y="200" width="12" height="170" fill="#6a5a4a" />
            <rect x={k * 300 + 110} y="210" width="72" height="8" fill="#6a5a4a" />
          </g>
        ))}
        <path d={`M0 214 ${Array.from({length: 5}, (_, k) => `Q${k * 300 + 70} 250 ${k * 300 + 146} 214`).join(' ')}`} stroke="#4a4a4a" strokeWidth="3" fill="none" />
      </svg>
    </div>
  );
};

const Train: React.FC = () => {
  const frame = useCurrentFrame();
  const reseau = at('train', 'réseau');
  const chatgpt = at('train', 'ChatGPT');
  const panne = at('train', 'panne');
  // La conversation continue : une bulle de plus toutes les 30 images.
  const n = 1 + Math.min(4, Math.floor(frame / 30));
  const off = ease(frame, panne, panne + 6);
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 740}}>
        {/* Décor dès l'entrée : la fenêtre du train et son paysage, la tablette, le portable. */}
        <Pop at={2} style={{position: 'absolute', left: 0, top: 0, width: WIN.w, height: WIN.h}}>
          <div style={{position: 'absolute', inset: 0, borderRadius: 48, overflow: 'hidden', border: '16px solid #8a8a8a', boxSizing: 'border-box'}}>
            <Paysage />
          </div>
        </Pop>
        <Pop at={2} style={{position: 'absolute', left: -40, top: 646, width: W + 80, height: 30, background: '#6a4f36', borderTop: '6px solid #8a6a4a', boxSizing: 'border-box'}}><span /></Pop>
        <Pop at={4} style={{position: 'absolute', left: 254, top: 646 - 380 * 0.7}}><Portable w={380}><Chat w={340} n={n} /></Portable></Pop>
        {/* « réseau » : l'icône du réseau, barrée 6 images après. */}
        <Pop at={reseau} style={{position: 'absolute', left: 50, top: 46}}>
          <div style={{position: 'relative', width: 150, height: 150, background: 'rgba(0,0,0,0.55)', borderRadius: 75, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Reseau size={110} />
            <div style={{position: 'absolute', left: 0, top: 0, opacity: frame >= reseau + 6 ? 1 : 0}}><Cross p={ease(frame, reseau + 6, reseau + 16)} size={150} color="#FF4D4D" /></div>
          </div>
        </Pop>
        {/* « ChatGPT » : le service en ligne, un nuage ; « panne » : il s'éteint et se barre. */}
        <Pop at={chatgpt} style={{position: 'absolute', right: 40, top: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, background: 'rgba(0,0,0,0.55)', padding: '14px 20px', borderRadius: 20}}>
          <div style={{position: 'relative'}}>
            <Nuage w={170} off={off} />
            <div style={{position: 'absolute', left: 20, top: -14, opacity: frame >= panne ? 1 : 0}}><Cross p={ease(frame, panne, panne + 10)} size={130} color="#FF4D4D" /></div>
          </div>
          <Mono size={48} color={off > 0.5 ? LABEL : '#fff'}>ChatGPT</Mono>
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 3. Taille : le petit modèle entre dans le portable, le géant ne tient pas dans le cadre, puis ses serveurs ----------

const BIG = {w: 1200, h: 744};

const Taille: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const modele = at('taille', 'modèle');
  const moyenne = at('taille', 'moyenne');
  const openai = at('taille', 'OpenAI');
  const seize = at('taille', 'seize');
  const gigaoctets = at('taille', 'gigaoctets');
  const meilleurs = at('taille', 'meilleurs');
  const dizaines = at('taille', 'dizaines');
  const serveurs = at('taille', 'serveurs');
  // Le petit modèle tombe dans l'écran sur « moyenne » (arc).
  const inP = ease(frame, moyenne, moyenne + 12, [0, 1], 'inOut');
  const [sx, sy] = arc(inP, [364, 20], [364, 170], 30);
  // Sur « meilleurs », le portable (et son modèle) se range en petit dans le coin bas gauche.
  const away = ease(frame, meilleurs, meilleurs + 14, [0, 1], 'inOut');
  const lapScale = 1 - 0.55 * away;
  const lapX = 204 - 204 * away;
  const lapY = 70 + 470 * away;
  // « dizaines de fois » : le bloc géant descend du haut et déborde du cadre ; « serveurs » : la caméra recule (inOut).
  const drop = ease(frame, dizaines, dizaines + 14, [-BIG.h - 700, 0]);
  const zoom = ease(frame, serveurs, serveurs + 16, [1, 0.5], 'inOut');
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 760}}>
        {/* Le géant et ses baies, dans une scène qui recule autour du haut du cadre. */}
        <div style={{position: 'absolute', left: 0, top: 0, width: W, height: 760, transform: `scale(${zoom})`, transformOrigin: `${W / 2}px 0px`}}>
          {frame >= dizaines ? <div style={{position: 'absolute', left: (W - BIG.w) / 2, top: drop}}><Model w={BIG.w} /></div> : null}
          {[0, 1, 2, 3].map((k) => (
            <Pop key={k} at={serveurs + 2 * k} style={{position: 'absolute', left: (W - BIG.w) / 2 + 300 * k, top: BIG.h + 10}}>
              <Baie w={290} h={420} />
            </Pop>
          ))}
        </div>
        {/* Décor dès l'entrée : le portable ; il se range sur « meilleurs ». */}
        <div style={{position: 'absolute', left: lapX, top: lapY, transform: `scale(${lapScale})`, transformOrigin: 'top left', zIndex: 5}}>
          <Pop at={2}>
            <div style={{position: 'relative'}}>
              <Portable w={480} />
              {/* « modèle » : le petit bloc arrive au-dessus de l'écran, puis tombe dedans sur « moyenne ». */}
              <div style={{position: 'absolute', left: sx - 204, top: sy - 70}}>
                <Pop at={modele}><Model w={150} /></Pop>
              </div>
              {/* « OpenAI » : le libellé du petit modèle, sous le portable. */}
              <Pop at={openai} style={{position: 'absolute', left: 0, width: 480, top: 350, display: 'flex', justifyContent: 'center', opacity: gone(frame, meilleurs)}}>
                <Mono size={52} color={LABEL}>OpenAI</Mono>
              </Pop>
            </div>
          </Pop>
        </div>
        {/* « seize gigaoctets de mémoire » : la barrette, son libellé 5 images après ; elle part sur « meilleurs ». */}
        {frame < meilleurs + 8 ? (
          <div style={{position: 'absolute', left: 110, top: 520, display: 'flex', alignItems: 'center', gap: 28, opacity: gone(frame, meilleurs)}}>
            <Pop at={seize}><Barrette w={330} /></Pop>
            <Pop at={Math.max(seize + 5, gigaoctets)}><Mono size={72} color={accent}>16 Go</Mono></Pop>
          </div>
        ) : null}
      </div>
    </Scene>
  );
};

// ---------- 4. Retard : l'étude d'Epoch, la ligne du temps, la carte graphique qui suit les meilleurs ----------

const LINE_Y = 470;
const GPU_X = 60;
const LEAD_X = 700;

const Retard: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const y2025 = at('retard', '2025');
  const epoch = at('retard', 'Epoch');
  const carte = at('retard', 'carte');
  const rattrapent = at('retard', 'rattrapent');
  const meilleurs = at('retard', 'meilleurs');
  const six = at('retard', 'six');
  const mois = at('retard', 'mois');
  // « rattrapent » : la carte avance sur la ligne (inOut) sans rejoindre les meilleurs.
  const gx = ease(frame, rattrapent, rattrapent + 16, [GPU_X, GPU_X + 90], 'inOut');
  const gapX0 = gx + 230;
  // « six à douze mois » : l'écart se colore (wipe de gauche à droite).
  const gapP = ease(frame, six, six + 16);
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 720}}>
        {/* « 2025 », puis l'étude d'Epoch posée d'un coup ; elles partent sur « carte ». */}
        {frame < carte + 8 ? (
          <div style={{opacity: gone(frame, carte)}}>
            <Pop at={y2025} style={{position: 'absolute', left: 360, top: 70}}><Mono size={64} color="#fff">2025</Mono></Pop>
            <div style={{position: 'absolute', left: 30, top: 10, transform: 'rotate(-3deg)'}}>
              <Pop at={epoch}><Doc w={280} lines={4} title="Epoch" /></Pop>
            </div>
          </div>
        ) : null}
        {/* Décor dès l'entrée : la ligne du temps (draw-on) et sa flèche. */}
        <svg width={W} height={720} viewBox={`0 0 ${W} 720`} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
          <Draw d={`M0 ${LINE_Y} H${W - 10}`} p={ease(frame, 0, 24)} width={8} len={W} color="#cfcfcf" />
          <Draw d={`M${W - 40} ${LINE_Y - 30} L${W - 10} ${LINE_Y} L${W - 40} ${LINE_Y + 30}`} p={ease(frame, 18, 28)} width={8} len={100} color="#cfcfcf" />
          {/* L'écart entre la carte et les meilleurs. */}
          <rect x={gapX0} y={LINE_Y - 44} width={Math.max(0, (LEAD_X - 30 - gapX0) * gapP)} height={88} fill={withAlpha(accent, 0.45)} />
        </svg>
        {/* « carte graphique » : la carte se pose sur la ligne. */}
        <div style={{position: 'absolute', left: gx, top: LINE_Y - 120}}>
          <Pop at={carte}><Gpu w={230} /></Pop>
        </div>
        {/* « les meilleurs » : le point de tête, son libellé 5 images après. */}
        <Pop at={meilleurs} style={{position: 'absolute', left: LEAD_X - 30, top: LINE_Y - 30}}>
          <div style={{width: 60, height: 60, borderRadius: 30, background: '#fff', boxShadow: `0 0 30px ${withAlpha('#ffffff', 0.5)}`}} />
        </Pop>
        <Pop at={meilleurs + 5} style={{position: 'absolute', right: 0, top: LINE_Y - 140}}><Mono size={52} color="#fff">les meilleurs</Mono></Pop>
        {/* Le seul punch zoom du short, sur « mois ». */}
        <div style={{position: 'absolute', left: gapX0 - 40, width: LEAD_X - gapX0 + 40, top: LINE_Y + 80, display: 'flex', justifyContent: 'center', transform: `scale(${punch(frame, mois)})`}}>
          <Pop at={six + 6}><Mono size={72} color={accent}>6 à 12 mois</Mono></Pop>
        </div>
      </div>
    </Scene>
  );
};

// ---------- 5. Gilles : le garage, le projecteur, la porte qui se ferme, l'affiche qui arrive un an après ----------

const GillesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const gilles = at('gilles', 'Gilles');
  const cinema = at('gilles', 'cinéma');
  const personne = at('gilles', 'personne');
  const seance = at('gilles', 'séance');
  const films = at('gilles', 'films');
  const apres = at('gilles', 'après');
  const door = ease(frame, personne, personne + 14, [0, 1], 'inOut');
  const light = ease(frame, cinema, cinema + 8);
  const film = ease(frame, apres, apres + 10);
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 740}}>
        <Pop at={0} style={{position: 'absolute', left: 0, top: 0, width: W, height: 740}}>
          <Garage door={door} light={light} film={film} gilles={gilles} />
        </Pop>
        {/* « séance » : le ticket de cinéma, barré ; il part sur « films ». */}
        {frame < films + 8 ? (
          <div style={{position: 'absolute', left: 700, top: 10, opacity: gone(frame, films)}}>
            <Pop at={seance}>
              <div style={{position: 'relative'}}>
                <Ticket w={170} />
                <div style={{position: 'absolute', left: 25, top: -20, opacity: frame >= seance + 6 ? 1 : 0}}><Cross p={ease(frame, seance + 6, seance + 16)} size={120} color="#FF4D4D" /></div>
              </div>
            </Pop>
          </div>
        ) : null}
        {/* « films » : l'affiche glisse sur le drap ; « un an après » : son étiquette, scotchée en bas. */}
        <div style={{position: 'absolute', left: SHEET.x, top: SHEET.y, width: SHEET.w, height: SHEET.h, overflow: 'hidden', opacity: frame >= films ? 1 - film : 0}}>
          <div style={{position: 'absolute', left: ease(frame, films, films + 14, [SHEET.w, 0], 'inOut'), top: 0}}><Affiche w={SHEET.w} h={SHEET.h} /></div>
        </div>
        <Pop at={apres} style={{position: 'absolute', left: SHEET.x + 30, top: SHEET.y + SHEET.h - 50, background: '#111', padding: '6px 18px', border: `5px solid ${accent}`, transform: 'rotate(-3deg)'}}>
          <Mono size={52} color={accent}>un an après</Mono>
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 6. Et donc : trois cartes cochées, puis la salle de cinéma qui s'allume ----------

const CARDS = ['résumer', 'classer', 'traduire'];

const Cinema: React.FC<{sign: number}> = ({sign}) => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  return (
    <div style={{position: 'relative', width: 440, height: 620}}>
      <div style={{position: 'absolute', left: 0, top: 120, width: 440, height: 500, background: '#3a2a4a', border: '8px solid #6a5a7a', boxSizing: 'border-box'}} />
      {/* L'enseigne et ses ampoules qui clignotent. */}
      <div style={{position: 'absolute', left: 0, top: 0, width: 440, height: 140, background: '#1a1a1a', border: `8px solid ${sign > 0.5 ? accent : '#555'}`, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: sign > 0 ? `0 0 ${60 * sign}px ${withAlpha(accent, 0.6 * sign)}` : undefined}}>
        <div style={{opacity: sign}}><Mono size={72} color={accent}>CINÉMA</Mono></div>
      </div>
      {Array.from({length: 12}, (_, k) => <div key={k} style={{position: 'absolute', left: 14 + 36 * k, top: 146, width: 16, height: 16, borderRadius: 8, background: (frame + 3 * k) % 12 < 6 ? '#f2e3a0' : '#6a5a3a'}} />)}
      {/* Deux affiches et les portes. */}
      <div style={{position: 'absolute', left: 30, top: 210, width: 150, height: 210, overflow: 'hidden', border: '6px solid #e0c060'}}><Affiche w={150} h={210} /></div>
      <div style={{position: 'absolute', right: 30, top: 210, width: 150, height: 210, background: '#5a2a2a', border: '6px solid #e0c060', boxSizing: 'border-box'}} />
      <div style={{position: 'absolute', left: 140, top: 470, width: 160, height: 150, background: '#c0392b', border: '6px solid #e0c060', boxSizing: 'border-box'}} />
    </div>
  );
};

const Etdonc: React.FC = () => {
  const frame = useCurrentFrame();
  const cues = [at('etdonc', 'résumer'), at('etdonc', 'classer'), at('etdonc', 'traduire')];
  const dernier = at('etdonc', 'dernier');
  const cinema = at('etdonc', 'cinéma');
  // Les cartes passent en retrait quand la voix passe au cinéma.
  const dim = 1 - 0.6 * ease(frame, dernier, dernier + 8);
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 720}}>
        {/* Stagger : les trois cartes tombent sur leur mot, la coche se dessine 6 images après. */}
        {CARDS.map((label, k) => (
          <Pop key={k} at={cues[k]} style={{position: 'absolute', left: 0, top: 60 + 190 * k, opacity: dim}}>
            <div style={{width: 400, height: 150, background: '#efe9dc', border: '6px solid #000', boxShadow: pixelShadow('#444'), boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px 0 30px'}}>
              <Mono size={56} color="#111">{label}</Mono>
              <div style={{opacity: frame >= cues[k] + 6 ? 1 : 0}}><Check p={ease(frame, cues[k] + 6, cues[k] + 16)} size={100} color="#2f8a4f" /></div>
            </div>
          </Pop>
        ))}
        {/* « dernier cri » : la salle de cinéma entre à droite, plus grande ; son enseigne s'allume sur « cinéma ». */}
        <Pop at={dernier} style={{position: 'absolute', left: 440, top: 40}}>
          <Cinema sign={ease(frame, cinema, cinema + 8)} />
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 7. Chute : retour au garage, le projecteur allumé, le portable sur l'accoudoir ----------

const Chute: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const ia = at('chute', 'IA');
  const chatgpt = at('chute', 'ChatGPT');
  const dernier = at('chute', 'dernier');
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 740}}>
        {/* Décor dès l'entrée : le garage fermé, le projecteur allumé, l'affiche, Gilles dans son fauteuil. */}
        <Pop at={0} style={{position: 'absolute', left: 0, top: 0, width: W, height: 740}}>
          <Garage door={1} light={1} film={1} gilles={0}>
            {/* « IA locale » : le portable se pose sur l'accoudoir ; « ChatGPT » : la conversation s'affiche. */}
            <Pop at={ia} style={{position: 'absolute', left: 384, top: 452}}>
              <Portable w={190}>{frame >= chatgpt ? <Chat w={170} n={2} /> : null}</Portable>
            </Pop>
          </Garage>
        </Pop>
        {/* « l'an dernier » : l'étiquette sur l'affiche, comme dans la scène de Gilles. */}
        <Pop at={dernier} style={{position: 'absolute', left: SHEET.x + 30, top: SHEET.y + SHEET.h - 50, background: '#111', padding: '6px 18px', border: `5px solid ${accent}`, transform: 'rotate(-3deg)'}}>
          <Mono size={52} color={accent}>l'an dernier</Mono>
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- Montage ----------

const SCENES: Record<string, React.FC> = {hook: Hook, vrai: Vrai, train: Train, taille: Taille, retard: Retard, gilles: GillesScene, etdonc: Etdonc, chute: Chute};

export const MytheIaLocaleVoix: React.FC = () => <V.Montage scenes={SCENES} accent={AC} />;

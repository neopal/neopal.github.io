// Short Mythe « Un détecteur prouve qu'un texte vient d'une IA » (YouTube / TikTok / Instagram), épisode 34, préparé le
// 2026-11-09 (calage estimé, sans voix). Fiche mythe-detecteur-de-texte-ia de lexique/terms.js ; sources dans
// voix/detecteur.script.json : Ars Technica (14 juillet 2023 : en avril 2023, un détecteur juge la Constitution américaine
// probablement écrite par une IA ; perplexité) ; Liang et al., Stanford (2023 : sept détecteurs, 91 rédactions du TOEFL,
// 61 % classées générées en moyenne ; consigne de langue littéraire : détection de 100 % à 13 %) ; Chicago Booth Review
// (2 décembre 2025 : les trois détecteurs commerciaux sous 1 % de faux positifs) ; Cour suprême de l'État de New York
// (28 janvier 2026 : sanction annulée, score de 100 % contre deux détecteurs à 0 %) ; Nature (23 octobre 2024 : SynthID
// Text, le filigrane ne se lit qu'avec sa clé).
// Fil : l'ép. 33 pesait l'eau d'une question à ChatGPT ; ici, un pourcentage de détecteur qu'on prend pour une preuve.
// Personne réelle : aucune. L'étudiant de New York n'est ni nommé ni montré (silhouette inventée) ; le prof, l'élève et
// l'étudiant sont des sprites de ce fichier. Le détecteur est une fenêtre sans marque ; le parchemin est dessiné.
// Écarts au storyboard, pour que l'écran ne dise que ce que dit la voix : la barre de « contour » porte le libellé
// « détection », mot dit ; la grille de « progres » ne porte que « sur cent ».
// L'écran suit la voix (univers.md) : chaque élément entre sur le mot qui le nomme, at('scène', 'mot'), jamais en secondes.
// Le mouvement : ease partout, arcs pour ce qui vole (la loupe, la clé), squash au seul tampon, un seul punch zoom
// (« 61 % »), aucun sur le hook.
import React from 'react';
import {useCurrentFrame} from 'remotion';
import {Big, Check, Draw, Mono, Pop, Scene, W, arc, countUp, ease, punch, typed, useAccent, withAlpha} from './kit';
import {LABEL, makeVoix} from './voix/VoixShort';
import {Pixel, type Sprite} from './voix/Pixel';
import {Cross, Model, Msg, Stamp, pixelShadow} from './voix/Parts';
import ALIGN from './voix/detecteur.align.json';
import SCRIPT from './voix/detecteur.script.json';

const AC = '#FF7A7A'; // catégorie Mythes vs réalité
const V = makeVoix(ALIGN, SCRIPT, 'voix/prediction-music.mp3');
const {at} = V;
export const MYTHEDETECTEURVOIX_DURATION = V.duration;

// Sortie : 6 images en inOut (plus rapide que l'entrée Pop).
const gone = (frame: number, until: number) => ease(frame, until, until + 6, [1, 0], 'inOut');
const SKIN = '#e3b58e';
const SKIN2 = '#b07a52';
const TAPE = 'rgba(239,233,220,0.85)';
const PARCH = '#e8d9b5';
const INK = '#4a3420';
const GREEN = '#4CD964';

// ---------- Personnages (même format que Pixel.tsx : S peau, E yeux qui clignent) ----------

const person = (h: string, s: string, t: string, p: string): Sprite => ({
  rows: ['............', '....HHHH....', '...HHHHHH...', '...HSSSSH...', '...SESSES...', '...SSSSSS...', '....SSSS....', '..TTTTTTTT..', '.TTTTTTTTTT.', '.TTTTTTTTTT.', '.STTTTTTTTS.', '.STTTTTTTTS.', '..PPPPPPPP..', '..PPP..PPP..', '..PPP..PPP..', '..KKK..KKK..'],
  palette: {H: h, S: s, E: '#111', T: t, P: p, K: '#111'},
});
// L'élève : cheveux longs bruns, pull vert.
const ELEVE: Sprite = {
  rows: ['............', '...HHHHHH...', '..HHHHHHHH..', '..HSSSSSSH..', '..HSESSESH..', '..HSSSSSSH..', '..H.SSSS.H..', '..TTTTTTTT..', '.TTTTTTTTTT.', '.TTTTTTTTTT.', '.STTTTTTTTS.', '.STTTTTTTTS.', '..PPPPPPPP..', '..PPP..PPP..', '..PPP..PPP..', '..KKK..KKK..'],
  palette: {H: '#4b2e1e', S: SKIN, E: '#111', T: '#3a8b5a', P: '#2f3f6a', K: '#111'},
};
// Le prof : cheveux gris, gilet marron.
const PROF = person('#b9b9b9', SKIN, '#8a5a3a', '#333');
// L'étudiant de New York : silhouette inventée, sweat bleu.
const ETUDIANT = person('#111', SKIN2, '#4f7fd0', '#444');

// ---------- Objets dessinés (SVG maison) ----------

// La fenêtre du détecteur, sans marque : barre de titre, zone de contenu, jauge « IA » en bas.
// `fill` : remplissage de la jauge (0 à 1) ; `lit` : le libellé « IA » allumé ; `dim` : en retrait.
const Detecteur: React.FC<{w: number; h: number; fill?: number; lit?: number; children?: React.ReactNode}> = ({w, h, fill = 0, lit = 0, children}) => {
  const accent = useAccent();
  const bar = 34;
  return (
    <div style={{position: 'relative', width: w, height: h, background: '#1c1c1c', border: '6px solid #cfcfcf', boxSizing: 'border-box', boxShadow: pixelShadow('#2a2a2a')}}>
      <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 44, background: '#3a3a3a', display: 'flex', alignItems: 'center', gap: 12, paddingLeft: 18}}>
        {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => <div key={c} style={{width: 16, height: 16, borderRadius: 8, background: c}} />)}
      </div>
      <div style={{position: 'absolute', left: 24, right: 24, top: 64, bottom: bar + 70, overflow: 'visible'}}>{children}</div>
      {/* La jauge : piste grise, remplissage de gauche à droite (bar grow). */}
      <div style={{position: 'absolute', left: 24, right: 150, bottom: 40, height: bar, background: '#3a3a3a'}}>
        <div style={{width: `${fill * 100}%`, height: '100%', background: lit > 0.5 ? accent : '#9a9a9a'}} />
      </div>
      <div style={{position: 'absolute', right: 24, bottom: 26, opacity: 0.35 + 0.65 * lit}}>
        <Mono size={60} color={lit > 0.5 ? accent : '#9a9a9a'}>IA</Mono>
      </div>
    </div>
  );
};

// Petite fenêtre de détecteur (les sept de Stanford, les trois du tribunal) ; `children` : ce qu'elle affiche.
const MiniDet: React.FC<{w: number; border?: string; children?: React.ReactNode}> = ({w, border = '#cfcfcf', children}) => (
  <div style={{position: 'relative', width: w, height: w * 0.72, background: '#1c1c1c', border: `5px solid ${border}`, boxSizing: 'border-box', boxShadow: pixelShadow('#2a2a2a')}}>
    <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: w * 0.14, background: '#3a3a3a'}} />
    <div style={{position: 'absolute', left: 0, right: 0, top: w * 0.14, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{children}</div>
  </div>
);

// Le parchemin de la Constitution : « We the People » en calligraphie, des lignes d'écriture, la date à la plume.
const Parchemin: React.FC<{w: number; date?: number}> = ({w, date = 0}) => {
  const k = w / 400;
  return (
    <div style={{position: 'relative', width: w, height: 300 * k, background: PARCH, border: `${Math.round(5 * k)}px solid #b89a62`, boxSizing: 'border-box', boxShadow: pixelShadow('#3a2a1a')}}>
      <div style={{position: 'absolute', left: 26 * k, top: 18 * k, whiteSpace: 'nowrap'}}><Big size={Math.max(48, Math.round(50 * k))} color={INK}>We the People</Big></div>
      {[110, 140, 170, 200].map((y, i) => (
        <div key={y} style={{position: 'absolute', left: 28 * k, top: y * k, height: 8 * k, width: `${[84, 78, 88, 52][i]}%`, background: '#a08a64'}} />
      ))}
      {/* « 1787 » : la date s'inscrit à la plume, de gauche à droite (mask reveal). */}
      <div style={{position: 'absolute', right: 26 * k, bottom: 12 * k, clipPath: `inset(0 ${100 - 100 * date}% 0 0)`}}>
        <Mono size={Math.max(48, Math.round(60 * k))} color={INK}>1787</Mono>
      </div>
      <div style={{position: 'absolute', left: -14 * k, top: -10 * k, width: 70 * k, height: 20 * k, background: TAPE, transform: 'rotate(-30deg)'}} />
      <div style={{position: 'absolute', right: -14 * k, top: -10 * k, width: 70 * k, height: 20 * k, background: TAPE, transform: 'rotate(30deg)'}} />
    </div>
  );
};

// Une copie : une feuille avec trois traits ; `red` de 0 à 1 la teinte en couleur d'accent (classée générée) ;
// `half` : seule la moitié basse se teinte.
const Copie: React.FC<{w: number; red?: number; half?: boolean}> = ({w, red = 0, half}) => {
  const accent = useAccent();
  const h = w * 1.25;
  return (
    <div style={{position: 'relative', width: w, height: h, background: '#efe9dc', overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: half ? h / 2 : h, background: accent, opacity: red}} />
      {[0.22, 0.44, 0.66].map((y, i) => <div key={y} style={{position: 'absolute', left: w * 0.15, top: h * y, width: `${[70, 55, 62][i]}%`, height: Math.max(3, w / 12), background: '#9a9384'}} />)}
    </div>
  );
};

// Une ligne de mots en blocs (sans lettres) ; `tint` : de 0 à 1, les blocs prennent la teinte du parchemin.
const WORDS = [
  [150, 110, 190, 130, 170],
  [120, 200, 100, 160, 150],
  [180, 130, 150, 120, 140],
];
const PRED = [
  [0.55, 0.3, 0.8, 0.45, 0.65],
  [0.4, 0.75, 0.35, 0.6, 0.5],
  [0.7, 0.45, 0.55, 0.85, 0.4],
];
const mix = (a: string, b: string, t: number) => {
  const pa = parseInt(a.slice(1), 16);
  const pb = parseInt(b.slice(1), 16);
  const ch = (s: number) => Math.round(((pa >> s) & 255) * (1 - t) + ((pb >> s) & 255) * t);
  return `rgb(${ch(16)},${ch(8)},${ch(0)})`;
};

// Le marteau du juge, qui pivote autour de son manche ; `hit` de 0 à 1 : levé puis frappé.
const Marteau: React.FC<{size: number; angle: number}> = ({size, angle}) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{overflow: 'visible'}}>
    <g transform={`rotate(${angle} 80 80)`}>
      <rect x="22" y="44" width="62" height="10" fill="#b08a5a" transform="rotate(-35 80 80)" />
      <rect x="6" y="18" width="34" height="22" rx="3" fill="#6a4f36" transform="rotate(-35 80 80)" />
    </g>
    <rect x="0" y="86" width="56" height="12" fill="#6a4f36" />
  </svg>
);

// Une clé, tracée (draw-on).
const Cle: React.FC<{p: number; size: number}> = ({p, size}) => (
  <svg width={size} height={size * 0.5} viewBox="0 0 120 60" style={{overflow: 'visible'}}>
    <Draw d="M10 30 A 18 18 0 1 0 46 30 A 18 18 0 1 0 10 30" p={Math.min(1, p * 2)} width={9} len={120} color="#e0c060" />
    <Draw d="M46 30 H112 M96 30 V46 M108 30 V44" p={Math.max(0, p * 2 - 1)} width={9} len={110} color="#e0c060" />
  </svg>
);

// Une loupe.
const Loupe: React.FC<{size: number}> = ({size}) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle cx="40" cy="40" r="28" fill="rgba(255,255,255,0.12)" stroke="#fff" strokeWidth="9" />
    <path d="M60 60 L90 90" stroke="#fff" strokeWidth="13" strokeLinecap="round" />
  </svg>
);

// ---------- 0. Hook : la phrase du mythe à la machine, le tampon FAUX, la fenêtre du détecteur ----------

const L1 = '« Un détecteur';
const L2 = 'prouve qu’un texte';
const L3 = 'vient d’une IA »';
const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const prouve = at('hook', 'prouve');
  const vient = at('hook', 'vient');
  const fin = at('hook', '»');
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 640}}>
        {/* Typewriter : la citation s'écrit sur la voix, une ligne par groupe de mots. */}
        <div style={{position: 'absolute', left: 0, top: -440, display: 'flex', flexDirection: 'column', gap: 6}}>
          <Big size={100}>{typed(frame, 0, L1, 40) || ' '}</Big>
          <Big size={100}>{typed(frame, prouve - 2, L2, 40) || ' '}</Big>
          <Big size={100}>{typed(frame, vient - 2, L3, 40) || ' '}</Big>
        </div>
        {/* Tampon FAUX juste après la citation (squash à l'impact), jusqu'à la fin du hook : l'image de couverture. */}
        <Stamp at={fin + 2} size={110} tilt={-12} bg="rgba(0,0,0,0.6)" style={{right: -10, top: -160, zIndex: 30}}>FAUX</Stamp>
        {/* Décor dès la première image : la fenêtre du détecteur, jauge vide. */}
        <div style={{position: 'absolute', left: 104, top: 110}}>
          <Detecteur w={680} h={460} />
        </div>
      </div>
    </Scene>
  );
};

// ---------- 1. Constitution : le parchemin collé dans le détecteur, la jauge monte jusqu'à « IA », 1787 ----------

const Constitution: React.FC = () => {
  const frame = useCurrentFrame();
  const y2023 = at('constitution', '2023');
  const constitution = at('constitution', 'Constitution');
  const ecrite = at('constitution', 'écrite');
  const ia = at('constitution', 'IA');
  const y1787 = at('constitution', '1787');
  // « écrite par une IA » : la jauge pousse jusqu'à 96 % (bar grow), « IA » s'allume sur le mot.
  const fill = ease(frame, ecrite, ia + 4, [0, 0.96]);
  const lit = ease(frame, ia, ia + 6);
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 720}}>
        <Pop at={y2023} style={{position: 'absolute', left: 0, right: 0, top: 0, display: 'flex', justifyContent: 'center'}}><Mono size={60} color={LABEL}>2023</Mono></Pop>
        {/* Décor dès l'entrée : la fenêtre du détecteur. */}
        <div style={{position: 'absolute', left: 44, top: 100}}>
          <Detecteur w={800} h={600} fill={fill} lit={lit}>
            {/* « Constitution » : le parchemin collé d'un coup dans la fenêtre. */}
            <Pop at={constitution} style={{position: 'absolute', left: 60, top: 6, transform: 'rotate(-2deg)'}}>
              <Parchemin w={540} date={ease(frame, y1787, y1787 + 14)} />
            </Pop>
          </Detecteur>
        </div>
      </div>
    </Scene>
  );
};

// ---------- 2. Perplexité : des mots en blocs, la prévisibilité de chacun en barre, « généré » ----------

const ROW_Y = [220, 420, 620];
const BAR_H = 110;

const Perplexite: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const texte = at('perplexite', 'texte');
  const modele = at('perplexite', 'modèle');
  const previsible = at('perplexite', 'prévisible');
  const genere = at('perplexite', 'généré');
  const constitution = at('perplexite', 'Constitution');
  // « Constitution » : les blocs prennent la teinte du parchemin et toutes les barres montent au maximum.
  const tint = ease(frame, constitution, constitution + 12);
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 800}}>
        {/* « un modèle de langage » : le bloc du modèle se pose en haut à droite. */}
        <Pop at={modele} style={{position: 'absolute', left: W / 2 - 80, top: -60}}><Model w={160} /></Pop>
        {WORDS.map((row, r) => {
          let x = 0;
          return row.map((w, c) => {
            const left = x;
            x += w + 18;
            const k = r * row.length + c;
            const a = texte + 2 * k;
            // Bar grow en cascade dans l'ordre de lecture, sur « prévisible » ; au maximum sur « Constitution ».
            const b = previsible + 2 * k;
            const v = ease(frame, b, b + 10, [0, PRED[r][c]]) * (1 - tint) + tint;
            const hot = tint > 0.5 || PRED[r][c] >= 0.7;
            return (
              <React.Fragment key={k}>
                <div style={{position: 'absolute', left, top: ROW_Y[r], width: w, height: 54, background: mix('#5a5a5a', PARCH, tint), opacity: frame >= a ? ease(frame, a, a + 6) : 0}} />
                <div style={{position: 'absolute', left: left + w / 2 - 22, top: ROW_Y[r] - 14 - BAR_H * v, width: 44, height: BAR_H * v, background: hot ? accent : '#9a9a9a', opacity: frame >= b ? 1 : 0}} />
              </React.Fragment>
            );
          });
        })}
        {/* « généré » : le verdict, sous les mots. */}
        <Pop at={genere} style={{position: 'absolute', left: 0, right: 0, top: 712, display: 'flex', justifyContent: 'center'}}><Mono size={72} color={accent}>généré</Mono></Pop>
      </div>
    </Scene>
  );
};

// ---------- 3. TOEFL : sept détecteurs, 91 copies de non-natifs, 61 % classées générées ----------

const GRID = {cols: 13, cell: 52, gap: 16, top: 190};
// Ordre pseudo-aléatoire fixe des copies qui virent au rouge : 61 % de 91, soit 56 copies, éparpillées.
const ORDER = Array.from({length: 91}, (_, i) => i).sort((a, b) => ((a * 37) % 91) - ((b * 37) % 91));
const RED_SET = new Map(ORDER.slice(0, 56).map((i, rank) => [i, rank]));

const Toefl: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const ecrivent = at('toefl', 'écrivent');
  const stanford = at('toefl', 'Stanford');
  const sept = at('toefl', 'sept');
  const n91 = at('toefl', '91');
  const n61 = at('toefl', '61');
  const generees = at('toefl', 'générées');
  const fillLen = Math.max(12, generees - n61);
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 820}}>
        {/* Décor dès l'entrée : l'élève qui écrit simplement ; elle passe en retrait quand les copies arrivent. */}
        <div style={{position: 'absolute', left: 0, top: -20, opacity: frame < n91 ? 1 : ease(frame, n91, n91 + 8, [1, 0.35])}}>
          <Pop at={2}><Pixel sprite={ELEVE} px={8} seed={2} /></Pop>
        </div>
        <Pop at={ecrivent} style={{position: 'absolute', left: 104, top: 70}}><Copie w={44} /></Pop>
        <Pop at={stanford} style={{position: 'absolute', left: 170, top: -10}}><Mono size={52} color={LABEL}>Stanford</Mono></Pop>
        {/* « sept détecteurs » : sept petites fenêtres en rang (stagger). */}
        {Array.from({length: 7}, (_, k) => (
          <Pop key={k} at={sept + 2 * k} style={{position: 'absolute', left: 170 + k * 102, top: 70}}><MiniDet w={88} /></Pop>
        ))}
        {/* « 91 rédactions » : la grille se remplit en cascade, compte jusqu'à 91. */}
        {Array.from({length: 91}, (_, i) => {
          const a = n91 + Math.floor(i / 4);
          const rank = RED_SET.get(i);
          const red = rank === undefined ? 0 : ease(frame, n61 + Math.round((rank * fillLen) / 56), n61 + Math.round((rank * fillLen) / 56) + 4);
          return (
            <div key={i} style={{position: 'absolute', left: (i % GRID.cols) * (GRID.cell + GRID.gap), top: GRID.top + Math.floor(i / GRID.cols) * (GRID.cell * 1.25 + 12), opacity: frame >= a ? ease(frame, a, a + 4) : 0}}>
              <Copie w={GRID.cell} red={red} />
            </div>
          );
        })}
        <div style={{position: 'absolute', left: 0, top: 735, display: 'flex', alignItems: 'baseline', gap: 16, opacity: frame >= n91 ? 1 : 0}}>
          <Mono size={84} color="#fff">{countUp(frame, n91, 91, 24)}</Mono>
        </div>
        {/* Le seul punch zoom du short, sur « 61 % ». */}
        <div style={{position: 'absolute', left: 240, top: 735, opacity: frame >= n61 ? 1 : 0, transform: `scale(${punch(frame, n61 + fillLen)})`, transformOrigin: 'left center'}}>
          <Mono size={84} color={accent}>{countUp(frame, n61, 61, fillLen) + ' %'}</Mono>
        </div>
        <Pop at={generees + 4} style={{position: 'absolute', left: 560, top: 753}}><Mono size={56} color={accent}>générées</Mono></Pop>
      </div>
    </Scene>
  );
};

// ---------- 4. Contournement : ChatGPT réécrit en langue littéraire, la détection tombe de 100 % à 13 % ----------

const Contour: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const chatgpt = at('contour', 'ChatGPT');
  const texte = at('contour', 'texte');
  const litteraire = at('contour', 'littéraire');
  const detection = at('contour', 'détection');
  const n100 = at('contour', '100');
  const n13 = at('contour', '13');
  // La barre : pleine sur « 100 », elle chute à 13 % sur « 13 » (inOut), le chiffre compte à rebours.
  const v = frame < n13 ? ease(frame, n100 - 4, n100 + 6, [0, 100]) : ease(frame, n13, n13 + 16, [100, 13], 'inOut');
  const BW = 700;
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 780}}>
        {/* « ChatGPT » : la fenêtre de chat, la demande à droite. */}
        <Pop at={chatgpt} style={{position: 'absolute', left: 0, top: -20}}><Mono size={56} color="#fff">ChatGPT</Mono></Pop>
        <Pop at={chatgpt + 4} style={{position: 'absolute', left: 380, top: -20, width: 508}}><Msg w={508} right color="#8a8a8a" /></Pop>
        {/* « son texte » : la feuille ; « littéraire » : des arabesques à la plume se dessinent sur ses lignes. */}
        <Pop at={texte} style={{position: 'absolute', left: 0, top: 130}}>
          <div style={{position: 'relative', width: 560, height: 300, background: '#efe9dc', border: '6px solid #000', boxSizing: 'border-box', boxShadow: pixelShadow('#444')}}>
            {[50, 110, 170, 230].map((y, i) => <div key={y} style={{position: 'absolute', left: 40, top: y, width: [440, 380, 420, 300][i], height: 16, background: '#9a9384'}} />)}
            <svg width={560} height={300} viewBox="0 0 560 300" style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
              {[40, 100, 160, 220].map((y, i) => (
                <Draw key={y} d={`M30 ${y + 24} c 30 -40 60 40 90 0 s 60 40 90 0 s 60 40 90 0 s 60 40 90 0 s 60 40 90 0`} p={ease(frame, litteraire + 3 * i, litteraire + 3 * i + 14)} width={6} len={700} color="#b07a2a" />
              ))}
            </svg>
          </div>
        </Pop>
        {/* « la détection » : la barre et son libellé. */}
        <Pop at={detection} style={{position: 'absolute', left: 0, top: 500}}><Mono size={56} color="#fff">détection</Mono></Pop>
        <div style={{position: 'absolute', left: 0, top: 590, width: BW, height: 90, background: '#2a2a2a', opacity: frame >= detection ? 1 : 0}}>
          <div style={{width: `${v}%`, height: '100%', background: frame >= n13 ? accent : '#cfcfcf'}} />
        </div>
        <div style={{position: 'absolute', left: BW + 20, top: 596, opacity: frame >= n100 - 4 ? 1 : 0}}>
          <Mono size={64} color={frame >= n13 ? accent : '#fff'}>{`${Math.round(v)} %`}</Mono>
        </div>
      </div>
    </Scene>
  );
};

// ---------- 5. Progrès : 100 copies humaines, moins d'une accusée à tort ----------

const Progres: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const y2025 = at('progres', '2025');
  const accusaient = at('progres', 'accusaient');
  const moins = at('progres', 'moins');
  const cent = at('progres', 'cent');
  const C = 50;
  const GX = 0;
  const step = C + 12;
  // « accusaient » : la loupe balaie la grille en arc, de gauche à droite ; elle s'arrête sur la copie 47.
  const scan = ease(frame, accusaient, moins + 4, [0, 1], 'inOut');
  const tx = GX + (47 % 10) * step;
  const ty = 90 + Math.floor(47 / 10) * (C * 1.25 + 6);
  const [lx, ly] = arc(scan, [-40, 120], [tx - 10, ty - 10], 120);
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 820}}>
        <Pop at={y2025} style={{position: 'absolute', left: 0, right: 0, top: 0, display: 'flex', justifyContent: 'center'}}><Mono size={60} color={LABEL}>2025</Mono></Pop>
        {/* Décor dès l'entrée : la grille de cent copies humaines, en cascade rapide. */}
        {Array.from({length: 100}, (_, i) => (
          <div key={i} style={{position: 'absolute', left: GX + (i % 10) * step, top: 90 + Math.floor(i / 10) * (C * 1.25 + 6), opacity: ease(frame, 1 + Math.floor(i / 6), 5 + Math.floor(i / 6))}}>
            <Copie w={C} red={i === 47 ? ease(frame, moins, moins + 8) * (frame % 20 < 14 ? 1 : 0.6) : 0} half />
          </div>
        ))}
        {frame >= accusaient ? <div style={{position: 'absolute', left: lx, top: ly, opacity: gone(frame, cent + 10)}}><Loupe size={130} /></div> : null}
        <Pop at={cent} style={{position: 'absolute', left: 640, top: ty + 2}}><Mono size={52} color={accent}>sur cent</Mono></Pop>
      </div>
    </Scene>
  );
};

// ---------- 6. Tribunal : le marteau annule la sanction, 100 % contre 0 % et 0 % ----------

const Tribunal: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const janvier = at('tribunal', 'janvier');
  const york = at('tribunal', 'York');
  const annule = at('tribunal', 'annulé');
  const etudiant = at('tribunal', 'étudiant');
  const n100 = at('tribunal', '100');
  const deux = at('tribunal', 'deux');
  const n0 = at('tribunal', '0', 2);
  // Anticipation : le marteau se lève un peu avant « annulé », puis frappe sur le mot.
  const angle = frame < annule - 6 ? 0 : frame < annule ? ease(frame, annule - 6, annule, [0, -30], 'inOut') : ease(frame, annule, annule + 4, [-30, 8]);
  const crossP = ease(frame, annule + 3, annule + 15);
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 800}}>
        <Pop at={janvier} style={{position: 'absolute', left: 0, top: -10}}><Mono size={52} color={LABEL}>janvier 2026</Mono></Pop>
        <Pop at={york} style={{position: 'absolute', left: 0, top: 56}}><Mono size={52} color="#fff">New York</Mono></Pop>
        {/* Décor dès l'entrée : le pupitre du juge et son marteau, la feuille de sanction. */}
        <Pop at={2} style={{position: 'absolute', left: 0, top: 230, width: 400, height: 120, background: '#6a4f36', borderTop: '10px solid #b08a5a', boxSizing: 'border-box'}}><span /></Pop>
        <Pop at={2} style={{position: 'absolute', left: 150, top: 110}}><Marteau size={130} angle={angle} /></Pop>
        <Pop at={4} style={{position: 'absolute', left: 520, top: 0, transform: 'rotate(4deg)'}}>
          <div style={{position: 'relative', width: 300, height: 340, background: '#efe9dc', border: '6px solid #000', boxSizing: 'border-box', boxShadow: pixelShadow('#444')}}>
            <div style={{position: 'absolute', left: 30, top: 34, width: 200, height: 22, background: '#c0392b'}} />
            {[90, 130, 170, 210, 250].map((y, i) => <div key={y} style={{position: 'absolute', left: 30, top: y, width: [220, 180, 210, 150, 190][i], height: 12, background: '#9a9384'}} />)}
            <div style={{position: 'absolute', left: 50, top: 70, opacity: frame >= annule + 3 ? 1 : 0}}><Cross p={crossP} size={200} color="#FF4D4D" /></div>
          </div>
        </Pop>
        {/* « un étudiant » : sa silhouette (inventée), puis les trois détecteurs. */}
        <Pop at={etudiant} style={{position: 'absolute', left: 0, top: 470}}><Pixel sprite={ETUDIANT} px={14} seed={3} /></Pop>
        <Pop at={n100 - 2} style={{position: 'absolute', left: 200, top: 520}}>
          <MiniDet w={210} border={accent}><Mono size={56} color={accent}>100 %</Mono></MiniDet>
        </Pop>
        {[0, 1].map((k) => (
          <Pop key={k} at={deux + 3 * k} style={{position: 'absolute', left: 440 + 230 * k, top: 520}}>
            <MiniDet w={210} border={GREEN}>
              <div style={{opacity: frame >= n0 ? 1 : 0}}><Mono size={56} color={GREEN}>0 %</Mono></div>
            </MiniDet>
          </Pop>
        ))}
      </div>
    </Scene>
  );
};

// ---------- 7. Filigrane : un motif tissé dans le texte, qui ne s'allume qu'avec la clé ----------

const MARKS = Array.from({length: 22}, (_, i) => ({x: 40 + ((i * 173) % 760), y: 60 + ((i * 97) % 380)}));

const Filigrane: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const filigrane = at('filigrane', 'filigrane');
  const google = at('filigrane', 'Google');
  const cle = at('filigrane', 'clé');
  const modele = at('filigrane', 'modèle');
  const pose = at('filigrane', 'posé');
  // « filigrane » : le motif se tisse, à peine visible (fade in) ; « clé » : la clé se dessine, puis glisse sur le
  // texte en arc ; « modèle » : le motif s'allume en couleur d'accent sur son passage.
  const weave = ease(frame, filigrane, filigrane + 14, [0, 0.22]);
  const keyP = ease(frame, cle, cle + 14);
  const slide = ease(frame, cle + 14, pose, [0, 1], 'inOut');
  const [kx, ky] = arc(slide, [560, 560], [80, 240], 80);
  const glow = ease(frame, modele, modele + 10);
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 800}}>
        {/* Décor dès l'entrée : le texte en blocs gris. */}
        <Pop at={2} style={{position: 'absolute', left: 0, top: 40}}>
          <div style={{position: 'relative', width: W, height: 480, background: '#1c1c1c', border: '6px solid #cfcfcf', boxSizing: 'border-box'}}>
            {[0, 1, 2, 3, 4, 5].map((r) => {
              let x = 30;
              return [140, 100, 170, 120, 150].map((w, c) => {
                const left = x;
                x += w + 16;
                return <div key={`${r}-${c}`} style={{position: 'absolute', left, top: 40 + r * 70, width: w - (r === 5 && c > 2 ? 60 : 0), height: 34, background: '#5a5a5a', opacity: r === 5 && c > 2 ? 0 : 1}} />;
              });
            })}
            <svg width={W} height={480} viewBox={`0 0 ${W} 480`} style={{position: 'absolute', left: 0, top: 0}}>
              {MARKS.map(({x, y}, i) => (
                <path key={i} d={`M${x} ${y} l 14 -14 l 14 14 l -14 14 Z`} fill={glow > 0 ? accent : '#fff'} opacity={weave + (0.85 - weave) * glow} />
              ))}
            </svg>
          </div>
        </Pop>
        <Pop at={google} style={{position: 'absolute', left: 0, top: 560}}><Mono size={60} color="#fff">Google</Mono></Pop>
        {frame >= cle ? (
          <div style={{position: 'absolute', left: kx, top: ky}}>
            <Cle p={keyP} size={240} />
          </div>
        ) : null}
        {/* « l'a posé » : la coche, quand le motif s'est allumé. */}
        <div style={{position: 'absolute', right: 0, top: 540, opacity: frame >= pose ? 1 : 0}}>
          <Check p={ease(frame, pose, pose + 12)} size={150} color={GREEN} />
        </div>
      </div>
    </Scene>
  );
};

// ---------- 8. Chute : le prof et l'élève à la table, brouillons, sources, deux passages surlignés ----------

const Chute: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const pourcentage = at('chute', 'pourcentage');
  const brouillons = at('chute', 'brouillons');
  const sources = at('chute', 'sources');
  const expliquer = at('chute', 'expliquer');
  const passages = at('chute', 'passages');
  const dimmed = ease(frame, brouillons, brouillons + 8, [1, 0.3], 'inOut');
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 820}}>
        {/* « devant un pourcentage » : la jauge du détecteur, qui passe en retrait aux brouillons. */}
        <div style={{position: 'absolute', left: 244, top: -20, opacity: frame < brouillons ? 1 : dimmed}}>
          <Pop at={pourcentage}>
            <div style={{width: 400, height: 70, background: '#2a2a2a', border: '5px solid #cfcfcf', boxSizing: 'border-box', display: 'flex', alignItems: 'center', gap: 16, padding: '0 12px'}}>
              <div style={{flex: 1, height: 30, background: '#3a3a3a'}}><div style={{width: '87%', height: '100%', background: '#9a9a9a'}} /></div>
              <Mono size={48} color="#cfcfcf">%</Mono>
            </div>
          </Pop>
        </div>
        {/* Décor dès l'entrée : le prof à gauche, l'élève à droite, la table entre eux, la copie de l'élève. */}
        <Pop at={2} style={{position: 'absolute', left: 0, top: 170}}><Pixel sprite={PROF} px={18} seed={1} /></Pop>
        <Pop at={2} style={{position: 'absolute', right: 0, top: 170}}><Pixel sprite={ELEVE} px={18} seed={4} /></Pop>
        <Pop at={2} style={{position: 'absolute', left: 0, top: 500, width: W, height: 34, background: '#8a6a4a', borderTop: '8px solid #b08a5a', boxSizing: 'border-box'}}><span /></Pop>
        <div style={{position: 'absolute', left: 0, top: 534, width: 30, height: 260, background: '#6a4f36'}} />
        <div style={{position: 'absolute', right: 0, top: 534, width: 30, height: 260, background: '#6a4f36'}} />
        {/* La copie de l'élève, posée sur la table ; « deux passages » : deux lignes se surlignent (highlight). */}
        <Pop at={4} style={{position: 'absolute', left: 520, top: 330, transform: 'rotate(-3deg)'}}>
          <div style={{position: 'relative', width: 200, height: 170, background: '#efe9dc', border: '5px solid #000', boxSizing: 'border-box'}}>
            {[24, 54, 84, 114].map((y, i) => (
              <React.Fragment key={y}>
                {i === 1 || i === 3 ? <div style={{position: 'absolute', left: 14, top: y - 6, width: 160 * ease(frame, passages + 4 * (i === 3 ? 1 : 0), passages + 12 + 4 * (i === 3 ? 1 : 0)), height: 22, background: withAlpha(accent, 0.6)}} /> : null}
                <div style={{position: 'absolute', left: 20, top: y, width: [150, 120, 140, 100][i], height: 10, background: '#6a6457'}} />
              </React.Fragment>
            ))}
          </div>
        </Pop>
        {/* « les brouillons » : une pile de feuilles raturées ; « les sources » : deux livres. */}
        <Pop at={brouillons} style={{position: 'absolute', left: 250, top: 380}}>
          <div style={{position: 'relative', width: 200, height: 120}}>
            {[0, 1, 2].map((k) => (
              <div key={k} style={{position: 'absolute', left: 6 * k, top: 30 - 14 * k, width: 180, height: 90, background: '#efe9dc', border: '4px solid #000', boxSizing: 'border-box', transform: `rotate(${[-6, 4, -2][k]}deg)`}}>
                <svg width={172} height={82} viewBox="0 0 172 82" style={{position: 'absolute', left: 0, top: 0}}>
                  <path d="M16 26 H140 M16 48 H120" stroke="#9a9384" strokeWidth="8" />
                  {k === 2 ? <path d="M12 54 C 50 10, 90 70, 150 22" stroke="#c0392b" strokeWidth="6" fill="none" /> : null}
                </svg>
              </div>
            ))}
          </div>
        </Pop>
        <Pop at={sources} style={{position: 'absolute', left: 250, top: 270}}>
          <div style={{display: 'flex', flexDirection: 'column', gap: 4}}>
            <div style={{width: 190, height: 40, background: '#4f7fd0', borderLeft: '10px solid #2f4f8a'}} />
            <div style={{width: 170, height: 40, background: '#c0392b', borderLeft: '10px solid #7a2418', marginLeft: 12}} />
          </div>
        </Pop>
        {/* « expliquer » : une bulle part de l'élève. */}
        <Pop at={expliquer} style={{position: 'absolute', right: 230, top: 96, width: 260}}><Msg w={260} color="#cfcfcf" /></Pop>
      </div>
    </Scene>
  );
};

// ---------- Montage ----------

const SCENES: Record<string, React.FC> = {hook: Hook, constitution: Constitution, perplexite: Perplexite, toefl: Toefl, contour: Contour, progres: Progres, tribunal: Tribunal, filigrane: Filigrane, chute: Chute};

export const MytheDetecteurVoix: React.FC = () => <V.Montage scenes={SCENES} accent={AC} />;

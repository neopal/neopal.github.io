// Short Mythe « L'IA calcule » (YouTube / TikTok / Instagram), épisode 13, voix off PAL - FR, préparé le 2026-10-19.
// Fiche mythe-ia-calcule de lexique/terms.js ; sources dans voix/ia-calcule.script.json : la calculatrice sur mesure de
// ChatGPT (TechCrunch, 7 octobre 2026) ; Anthropic, Tracing the thoughts of a large language model (27 mars 2025 :
// Claude 3.5 Haiku fait 36 + 59 par un chemin approximatif et un chemin pour le chiffre des unités) ; Dziri et al.,
// Faith and Fate (mai 2023 : GPT-4 à 59 % sur les multiplications de deux nombres à trois chiffres) ; la délégation
// à un outil d'exécution de code. Image : l'épreuve « Le compte est bon » de Des chiffres et des lettres (aucun visuel
// repris : plaques, nombre à trouver et chronomètre redessinés).
// Fil : l'ép. 11 finissait sur « ChatGPT est nul en calcul » ; voilà pourquoi, et comment il s'en sort.
// Hook sans auteur (citation provisoire) : la phrase du mythe en grand et le tampon FAUX, pas de portrait.
// Une seule opération d'exemple suit le short : 347 × 862 = 299 114 (vérifié à la main : 258 600 + 40 514).
// Tokenisation testée avec tiktoken (o200k_base) le 2026-10-19 : « Le résultat est 299114 » donne
// Le | résultat | est | ␣ | 299 | 114 ; le token espace n'est pas dessiné. « 36 + 59 = 95 » : 95 est un seul token.
// Scène propre à ce short : le plateau du compte est bon, avec le candidat qui annonce un nombre sans brouillon.
// L'écran suit la voix et Le mouvement (univers.md) : chaque élément entre sur le mot qui le nomme ; effets nommés en commentaire.
import React from 'react';
import {useCurrentFrame} from 'remotion';
import {Big, Check, Draw, Highlight, Mono, Pop, Scene, W, arc, countUp, ease, punch, typed, useAccent, withAlpha} from './kit';
import {LABEL, makeVoix} from './voix/VoixShort';
import {Pixel} from './voix/Pixel';
import {Model, Stamp, pixelShadow} from './voix/Parts';
import ALIGN from './voix/ia-calcule.align.json';
import SCRIPT from './voix/ia-calcule.script.json';

const AC = '#FF7A7A'; // catégorie Mythes vs réalité
const V = makeVoix(ALIGN, SCRIPT, 'voix/prediction-music.mp3');
const {at} = V;
export const MYTHECALCULEVOIX_DURATION = V.duration;

// Sortie : 6 images, plus vite que l'entrée.
const gone = (frame: number, until: number) => ease(frame, until, until + 6, [1, 0], 'inOut');
const from2 = (f: number) => Math.max(2, f);

// ---------- Personnage : le candidat du compte est bon (sprite propre à ce short) ----------
// Costume bleu nuit, chemise blanche, cravate rouge ; il cligne des yeux (Pixel), rien d'autre.
const CANDIDAT = {
  rows: [
    '....HHHH....',
    '...HHHHHH...',
    '...HSSSSH...',
    '...SESSES...',
    '...SSSSSS...',
    '...SSRRSS...',
    '....SSSS....',
    '..JJWKKWJJ..',
    '.JJJJWKKJJJ.',
    '.JJJJWKKJJJ.',
    '.SJJJJKJJJS.',
    '.SJJJJJJJJS.',
    '...JJJJJJ...',
    '...JJJJJJ...',
  ],
  palette: {H: '#3a2a1e', S: '#e3b58e', E: '#111', R: '#b5524f', J: '#24365e', W: '#f2f2f2', K: '#c0392b'},
};

// ---------- Pièces dessinées ----------

// Logo générique d'appli de chat (pas de logo de marque) : un rond et une étincelle.
const AppLogo: React.FC<{size: number}> = ({size}) => {
  const accent = useAccent();
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="42" fill="none" stroke="#fff" strokeWidth="8" />
      <path d="M50 24 L56 44 L76 50 L56 56 L50 76 L44 56 L24 50 L44 44 Z" fill={accent} />
    </svg>
  );
};

// La petite calculatrice : un écran et un pavé de 16 touches (sans glyphes, colonne des opérateurs en accent).
// Ordre des touches : 7 8 9 ÷ / 4 5 6 × / 1 2 3 − / 0 , = +
const KEY = {'3': 10, '6': 6, '+': 15, '5': 5, '9': 2, '=': 14} as Record<string, number>;
const Calc: React.FC<{w: number; shown: string; pressed: number}> = ({w, shown, pressed}) => {
  const accent = useAccent();
  return (
    <div style={{width: w, background: '#1c1c1c', border: '6px solid #fff', borderRadius: 22, padding: 18, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 14}}>
      <div style={{height: 92, background: '#cfe3c8', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 16px'}}>
        <Mono size={56} color="#111">{shown}</Mono>
      </div>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10}}>
        {Array.from({length: 16}, (_, k) => {
          const op = k % 4 === 3;
          const on = k === pressed;
          return <div key={k} style={{height: 40, borderRadius: 8, background: on ? '#fff' : op ? withAlpha(accent, 0.8) : '#4a4a4a'}} />;
        })}
      </div>
    </div>
  );
};

// Un token : une étiquette mono encadrée.
const Chip: React.FC<{children: React.ReactNode; w: number; hot?: number}> = ({children, w, hot = 0}) => {
  const accent = useAccent();
  return (
    <div style={{width: w, height: 90, boxSizing: 'border-box', border: `5px solid ${hot > 0.5 ? accent : '#fff'}`, background: withAlpha(accent, 0.3 * hot), display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Mono size={56} color="#fff">{children}</Mono>
    </div>
  );
};

// Une fenêtre de terminal : barre de titre à trois points.
const Term: React.FC<{w: number; h: number; run?: boolean; children?: React.ReactNode}> = ({w, h, run, children}) => {
  const accent = useAccent();
  return (
    <div style={{width: w, height: h, background: '#111', border: '6px solid #fff', boxShadow: pixelShadow('#222'), boxSizing: 'border-box', display: 'flex', flexDirection: 'column'}}>
      <div style={{height: 52, borderBottom: '4px solid #444', display: 'flex', alignItems: 'center', gap: 12, padding: '0 18px'}}>
        {[0, 1, 2].map((k) => <div key={k} style={{width: 18, height: 18, borderRadius: 9, background: '#666'}} />)}
        <div style={{flex: 1}} />
        {/* Le bouton « exécuter » : un triangle qui s'allume quand le programme tourne. */}
        <svg width={48} height={48} viewBox="0 0 100 100"><path d="M28 18 L84 50 L28 82 Z" fill={run ? accent : '#666'} /></svg>
      </div>
      <div style={{padding: '22px 22px', display: 'flex', flexDirection: 'column', gap: 18}}>{children}</div>
    </div>
  );
};

// ---------- 0. Hook : « L'IA calcule », tampon FAUX ; dessous, l'opération qu'il ne pose pas et les chiffres qu'il écrit ----------

const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const fin = at('hook', '»');
  const pose = at('hook', 'pose');
  const pas = at('hook', 'pas');
  const ecrit = at('hook', 'écrit');
  const chiffres = at('hook', 'chiffres');
  return (
    <Scene gap={60}>
      <div style={{position: 'relative', display: 'flex', flexDirection: 'column', gap: 6}}>
        {/* Tampon : chute + squash à l'impact, juste après la citation ; il reste jusqu'à la fin du hook (couverture). */}
        <Stamp at={fin + 8} size={96} tilt={-12} bg="rgba(0,0,0,0.6)" style={{right: 0, top: -40, zIndex: 2}}>FAUX</Stamp>
        <Pop at={0}><Big size={150}>« L'IA</Big></Pop>
        <Pop at={4}><Big size={150}>calcule »</Big></Pop>
      </div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
        {/* L'opération posée en colonne : pop in sur « pose », croix dessinée (draw-on) sur « pas ». */}
        <Pop at={pose} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16}}>
          <div style={{position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', padding: '0 20px'}}>
            <Mono size={88} color="#fff">36</Mono>
            <Mono size={88} color="#fff">+ 59</Mono>
            <div style={{width: 250, height: 7, background: '#fff', marginTop: 8}} />
            <div style={{height: 80}} />
            {/* Une seule barre fine en diagonale (draw-on) : « 36 + 59 » reste lisible dessous. */}
            <svg width={300} height={340} viewBox="0 0 300 340" style={{position: 'absolute', left: 0, top: 0, opacity: frame >= pas ? 1 : 0}}>
              <Draw d="M14 326 L286 14" p={ease(frame, pas, pas + 12)} width={8} len={420} color={accent} />
            </svg>
          </div>
          <Mono size={48} color={LABEL}>l'opération</Mono>
        </Pop>
        {/* Les chiffres écrits comme du texte : typewriter avec curseur, sur « écrit » puis « chiffres ». */}
        <Pop at={ecrit} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, marginTop: 70}}>
          <div style={{display: 'flex', alignItems: 'center', border: '5px solid #fff', borderRadius: 26, padding: '18px 30px', minWidth: 300, justifyContent: 'center'}}>
            <Mono size={64} color="#fff">{typed(frame, ecrit + 4, '= ', 20)}</Mono>
            <Mono size={64} color={accent}>{typed(frame, chiffres, '95', 20)}</Mono>
            <div style={{width: 8, height: 64, marginLeft: 6, background: accent, opacity: Math.floor(frame / 8) % 2 ? 0.2 : 1}} />
          </div>
          <Mono size={48} color={LABEL}>les chiffres</Mono>
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 1. Calculette : ChatGPT affiche une calculatrice ; le modèle, à côté, ne compte pas comme elle ----------

const Calculette: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const octobre = at('calculette', 'octobre');
  const chat = at('calculette', 'ChatGPT');
  const calc = at('calculette', 'calculatrice');
  const faite = at('calculette', 'faite');
  const question = at('calculette', 'question');
  const modele = at('calculette', 'modèle');
  const compte = at('calculette', 'compte');
  // Les touches se pressent une à une sur « faite pour ta question » (compte calé sur la voix, linéaire).
  const SEQ = ['3', '6', '+', '5', '9', '='];
  const step = Math.floor(((frame - faite) / Math.max(1, question - faite)) * SEQ.length);
  const k = Math.min(SEQ.length - 1, step);
  const shown = frame < faite ? '0' : step >= SEQ.length ? '95' : '36+59'.slice(0, k + 1).replace('=', '');
  const pressed = frame >= faite && step < SEQ.length + 1 ? KEY[SEQ[k]] : -1;
  return (
    <Scene>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        {/* Décor : la fenêtre de chat, posée dès l'entrée ; le nom de l'appli sur « ChatGPT ». */}
        <Pop at={2} style={{width: 500, height: 600, border: '6px solid #fff', borderRadius: 30, background: '#141414', boxSizing: 'border-box', display: 'flex', flexDirection: 'column'}}>
          <div style={{height: 96, borderBottom: '4px solid #444', display: 'flex', alignItems: 'center', gap: 18, padding: '0 26px'}}>
            <AppLogo size={56} />
            <div style={{opacity: frame >= chat ? 1 : 0}}><Mono size={48} color="#fff">ChatGPT</Mono></div>
          </div>
          <div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            {/* La calculatrice sur mesure : pop in sur « calculatrice ». */}
            <Pop at={calc}><Calc w={340} shown={shown} pressed={pressed} /></Pop>
          </div>
        </Pop>
        {/* « ne compte pas comme elle » : le signe différent se dessine (draw-on). */}
        <svg width={110} height={110} viewBox="0 0 100 100" style={{opacity: frame >= compte ? 1 : 0}}>
          <Draw d="M18 38 H82 M18 62 H82" p={ease(frame, compte, compte + 10)} width={10} len={140} color={accent} />
          <Draw d="M66 14 L34 86" p={ease(frame, compte + 6, compte + 16)} width={10} len={90} color={accent} />
        </svg>
        <div style={{width: 250, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18}}>
          <Pop at={from2(octobre)} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Mono size={48} color={LABEL}>octobre</Mono>
            <Mono size={48} color={LABEL}>2026</Mono>
          </Pop>
          <div style={{height: 60}} />
          {/* Le modèle : pop in sur « modèle », libellé décalé de 5 images. */}
          <Pop at={modele}><Model w={240} /></Pop>
          <Pop at={modele + 5}><Mono size={48} color="#fff">le modèle</Mono></Pop>
        </div>
      </div>
    </Scene>
  );
};

// ---------- 2. Tokens : les mots puis les chiffres sortent du modèle de la même façon, par paquets ----------

// Positions des tokens (o200k_base) : « Le résultat est » sur une ligne, « 299 | 114 » sur la suivante.
const TOK = [
  {t: 'Le', x: 0, y: 250, w: 130},
  {t: 'résultat', x: 146, y: 250, w: 330},
  {t: 'est', x: 492, y: 250, w: 160},
  {t: '299', x: 0, y: 370, w: 170},
  {t: '114', x: 186, y: 370, w: 170},
];

const Tokens: React.FC = () => {
  const frame = useCurrentFrame();
  const operation = at('tokens', 'opération');
  const mot = at('tokens', 'mot');
  const tok1 = at('tokens', 'token', 0);
  const tok2 = at('tokens', 'token', 1);
  const paquets = at('tokens', 'paquets');
  const starts = [mot - 4, mot, mot + 4, tok1, tok2];
  const hot = ease(frame, paquets, paquets + 10);
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 470}}>
        {/* Décor : le modèle, posé dès l'entrée. */}
        <Pop at={2} style={{position: 'absolute', left: 0, top: 0}}><Model w={240} /></Pop>
        {/* La question : pop in sur « opération ». */}
        <Pop at={operation} style={{position: 'absolute', right: 0, top: 20, background: '#2a2a2a', borderRadius: 34, padding: '22px 36px'}}>
          <Mono size={64} color="#fff">347 × 862 ?</Mono>
        </Pop>
        {/* Chaque token vole du modèle à sa place en arc (stagger dans l'ordre de lecture) ; highlight des paquets de chiffres. */}
        {TOK.map((c, k) => {
          const a = starts[k];
          const p = ease(frame, a, a + 12, [0, 1], 'inOut');
          const [dx, dy] = arc(p, [120 - (c.x + c.w / 2), 75 - (c.y + 45)], [0, 0], 60);
          return (
            <div key={k} style={{position: 'absolute', left: c.x, top: c.y, opacity: frame >= a ? ease(frame, a, a + 4) : 0, transform: `translate(${dx}px, ${dy}px)`}}>
              <Chip w={c.w} hot={k >= 3 ? hot : 0}>{c.t}</Chip>
            </div>
          );
        })}
      </div>
    </Scene>
  );
};

// ---------- 3. Le compte est bon : un nombre qui a la bonne tête, sans une seule opération ----------

const PLATES = [100, 8, 5, 3, 7, 25]; // 8 × 100 − 5 = 795 : le compte est bon existe bien
const TARGET = '795';
const SAID = '785'; // le bon début, la bonne fin, le milieu au jugé

// Un nombre dont on peut surligner le premier et le dernier chiffre.
const Digits: React.FC<{n: string; size: number; first: number; last: number; color: string}> = ({n, size, first, last, color}) => {
  const accent = useAccent();
  return (
    <div style={{display: 'flex'}}>
      {[...n].map((d, k) => {
        const h = k === 0 ? first : k === n.length - 1 ? last : 0;
        return (
          <div key={k} style={{position: 'relative', padding: '0 2px'}}>
            <div style={{position: 'absolute', left: 0, right: 0, bottom: -8, height: 10, background: accent, transform: `scaleX(${h})`, transformOrigin: 'left center'}} />
            <Mono size={size} color={h > 0.5 ? accent : color}>{d}</Mono>
          </div>
        );
      })}
    </div>
  );
};

const Compte: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const candidat = at('compte', 'candidat');
  const chiffres = at('compte', 'Chiffres');
  const compteBon = at('compte', 'compte');
  const nombre = at('compte', 'nombre');
  const debut = at('compte', 'début');
  const fin = at('compte', 'fin');
  const pose = at('compte', 'posé');
  const operation = at('compte', 'opération');
  const first = ease(frame, debut, debut + 10);
  const last = ease(frame, fin, fin + 10);
  // Le chronomètre tourne à partir de « compte est bon » (rotation continue, linéaire comme une trotteuse).
  const sweep = Math.max(0, frame - compteBon) * 3;
  return (
    <Scene>
      <div style={{display: 'flex', flexDirection: 'column', gap: 34}}>
        {/* Décor du plateau, posé dès l'entrée : l'écran du nombre à trouver, le chrono, les six emplacements de plaques. */}
        <Pop at={2} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 50}}>
          <div style={{width: 300, height: 140, background: '#0d1a33', border: '6px solid #fff', boxShadow: pixelShadow('#222'), display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            {/* Le nombre à trouver : pop in sur « compte est bon ». */}
            <Pop at={compteBon}><Digits n={TARGET} size={100} first={first} last={last} color="#FFC24A" /></Pop>
          </div>
          <svg width={140} height={140} viewBox="0 0 100 100">
            <circle cx="50" cy="54" r="38" fill="#1c1c1c" stroke="#fff" strokeWidth="6" />
            <rect x="44" y="4" width="12" height="10" fill="#fff" />
            <path d={`M50 54 L${50 + 30 * Math.sin((sweep * Math.PI) / 180)} ${54 - 30 * Math.cos((sweep * Math.PI) / 180)}`} stroke={accent} strokeWidth="6" strokeLinecap="round" />
            <circle cx="50" cy="54" r="5" fill="#fff" />
          </svg>
        </Pop>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          {PLATES.map((n, k) => (
            <div key={k} style={{width: 132, height: 100, border: '4px dashed #444', boxSizing: 'border-box', position: 'relative'}}>
              {/* Les plaques se retournent en cascade sur « Chiffres » (stagger de 3 images). */}
              <Pop at={chiffres + 3 * k} style={{position: 'absolute', inset: -4, background: '#2f5fb3', border: '4px solid #fff', boxShadow: pixelShadow('#111'), display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Mono size={52} color="#fff">{n}</Mono>
              </Pop>
            </div>
          ))}
        </div>
        <div style={{display: 'flex', alignItems: 'flex-end', gap: 30, marginTop: 10}}>
          {/* Le candidat, à son pupitre : pop in sur « candidat ». */}
          <Pop at={candidat} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Pixel sprite={CANDIDAT} px={14} seed={2} />
            <div style={{width: 230, height: 26, background: '#b8b0a0'}} />
          </Pop>
          {/* Ce qu'il annonce : bulle en pop in sur « nombre », les bons bouts surlignés sur « début » et « fin ». */}
          <Pop at={nombre} style={{marginBottom: 120, border: '5px solid #fff', borderRadius: 30, padding: '14px 30px', background: '#141414'}}>
            <Digits n={SAID} size={88} first={first} last={last} color="#fff" />
          </Pop>
          {/* Son brouillon, vide : pop in sur « posé », les lignes vides s'allument sur « opération ». */}
          <Pop at={pose} style={{width: 250, height: 230, background: '#efe9dc', border: '6px solid #000', boxShadow: pixelShadow('#444'), padding: '26px 22px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 34, justifyContent: 'center'}}>
            {[0, 1, 2, 3].map((k) => (
              <div key={k} style={{height: 6, background: frame >= operation + 2 * k ? accent : '#b9b1a1'}} />
            ))}
          </Pop>
        </div>
      </div>
    </Scene>
  );
};

// ---------- 4. Haiku : dans Claude, deux chemins pour 36 + 59, l'ordre de grandeur et le chiffre des unités ----------

const Fuzzy: React.FC = () => (
  // Un chiffre qu'on ne connaît pas : une case hachurée.
  <div style={{width: 48, height: 70, background: 'repeating-linear-gradient(45deg, #5a5a5a 0 8px, #2a2a2a 8px 16px)'}} />
);

const Haiku: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const y2025 = at('haiku', '2025');
  const anthropic = at('haiku', 'Anthropic');
  const interieur = at('haiku', "l'intérieur");
  const claude = at('haiku', 'Claude', 0);
  const n36 = at('haiku', '36');
  const plus = at('haiku', 'plus');
  const n59 = at('haiku', '59');
  const estimait = at('haiku', 'estimait');
  const grandeur = at('haiku', 'grandeur');
  const trouvait = at('haiku', 'trouvait');
  const unites = at('haiku', 'unités');
  const combinait = at('haiku', 'combinait');
  const deux = at('haiku', 'deux');
  // Mask reveal : le capot du modèle s'efface de gauche à droite sur « l'intérieur ».
  const open = ease(frame, interieur, interieur + 15, [0, 1], 'inOut');
  return (
    <Scene gap={20}>
      <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between'}}>
        <Pop at={from2(claude)}><Mono size={60} color="#fff">Claude</Mono></Pop>
        <div style={{display: 'flex', gap: 24}}>
          <Pop at={anthropic}><Mono size={48} color={LABEL}>Anthropic</Mono></Pop>
          <Pop at={from2(y2025)}><Mono size={48} color={LABEL}>2025</Mono></Pop>
        </div>
      </div>
      {/* Décor : le modèle, boîte fermée, posé dès l'entrée. */}
      <Pop at={2} style={{position: 'relative', width: W, height: 640, flexShrink: 0, border: '6px solid #fff', boxSizing: 'border-box', background: '#111'}}>
        <svg width={W - 12} height={628} viewBox={`0 0 ${W - 12} 628`} style={{position: 'absolute', left: 0, top: 0}}>
          {/* Draw-on des deux chemins, puis de leur jonction. */}
          <Draw d="M438 120 C438 160 210 150 210 190" p={ease(frame, estimait, estimait + 18)} width={10} len={320} color="#fff" />
          <Draw d="M438 120 C438 160 666 150 666 190" p={ease(frame, trouvait, trouvait + 18)} width={10} len={320} color="#fff" />
          <Draw d="M335 248 C420 260 438 400 438 490" p={ease(frame, combinait, combinait + 12)} width={10} len={320} color={accent} />
          <Draw d="M541 248 C456 260 438 400 438 490" p={ease(frame, combinait, combinait + 12)} width={10} len={320} color={accent} />
        </svg>
        <div style={{position: 'absolute', left: 0, right: 0, top: 30, display: 'flex', justifyContent: 'center', gap: 18}}>
          <Pop at={n36}><Mono size={72} color="#fff">36</Mono></Pop>
          <Pop at={plus}><Mono size={72} color="#fff">+</Mono></Pop>
          <Pop at={n59}><Mono size={72} color="#fff">59</Mono></Pop>
        </div>
        {/* Chemin de gauche : l'ordre de grandeur, le chiffre des dizaines sûr, les unités floues. */}
        <Pop at={grandeur} style={{position: 'absolute', left: 60, top: 190, width: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14}}>
          <div style={{width: 250, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, border: '5px solid #fff', padding: '8px 0'}}>
            <Mono size={72} color="#fff">≈ 9</Mono>
            <Fuzzy />
          </div>
          <Mono size={48} color={LABEL}>ordre de</Mono>
          <Mono size={48} color={LABEL}>grandeur</Mono>
        </Pop>
        {/* Chemin de droite : le chiffre des unités, sans les dizaines. */}
        <Pop at={unites} style={{position: 'absolute', left: 516, top: 190, width: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14}}>
          <div style={{width: 250, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, border: '5px solid #fff', padding: '8px 0'}}>
            <Fuzzy />
            <Mono size={72} color="#fff">5</Mono>
          </div>
          <Mono size={48} color={LABEL}>chiffre</Mono>
          <Mono size={48} color={LABEL}>des unités</Mono>
        </Pop>
        {/* Les deux combinés : pop in sur « deux ». */}
        <Pop at={deux} style={{position: 'absolute', left: 0, right: 0, top: 492, display: 'flex', justifyContent: 'center'}}>
          <Mono size={110} color={accent}>95</Mono>
        </Pop>
        {/* Le capot, qui s'ouvre sur « l'intérieur » (mask reveal). */}
        <div style={{position: 'absolute', inset: 0, background: '#2a2a2a', clipPath: `inset(0 0 0 ${open * 100}%)`, display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 18, padding: 40, boxSizing: 'border-box'}}>
          {Array.from({length: 18}, (_, k) => <div key={k} style={{background: '#5a5a5a'}} />)}
        </div>
      </Pop>
    </Scene>
  );
};

// ---------- 5. Longs : la réussite baisse avec la longueur ; GPT-4 à 59 % sur trois chiffres ----------

// Des résultats de plus en plus longs : le début et la fin restent justes, le milieu se trompe.
const ROWS = [
  {n: 2, bad: [] as number[]},
  {n: 4, bad: [1]},
  {n: 6, bad: [2, 3]},
  {n: 8, bad: [2, 3, 4, 5]},
];

const Longs: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const petits = at('longs', 'petits');
  const degrade = at('longs', 'dégrade');
  const longueur = at('longs', 'longueur');
  const y2023 = at('longs', '2023');
  const gpt = at('longs', 'GPT-4');
  const reussi = at('longs', 'réussissait');
  const n59 = at('longs', '59');
  const multi = at('longs', 'multiplications');
  const trois = at('longs', 'trois');
  const fill = ease(frame, reussi, n59 + 2); // bar grow, calé pour finir sur « 59 »
  return (
    <Scene gap={40}>
      {frame < y2023 + 6 ? (
        <div style={{display: 'flex', gap: 40, opacity: gone(frame, y2023)}}>
          {/* La longueur : une flèche qui se dessine vers le bas (draw-on) sur « longueur ». */}
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10}}>
            <svg width={60} height={460} viewBox="0 0 60 460" style={{opacity: frame >= longueur ? 1 : 0}}>
              <Draw d="M30 10 V440 M10 412 L30 444 L50 412" p={ease(frame, longueur, longueur + 20)} width={8} len={520} color="#fff" />
            </svg>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', gap: 34}}>
            {ROWS.map((r, i) => (
              // Rangées en cascade : la première sur « petits », les suivantes sur « dégrade ».
              <Pop key={i} at={i === 0 ? petits : degrade + 4 * (i - 1)} style={{display: 'flex', alignItems: 'center', gap: 10}}>
                <div style={{width: 50}}><Mono size={52} color={LABEL}>=</Mono></div>
                {Array.from({length: r.n}, (_, k) => {
                  const bad = r.bad.includes(k);
                  return <div key={k} style={{width: 62, height: 78, border: `5px solid ${bad ? accent : '#fff'}`, background: bad ? withAlpha(accent, 0.35) : '#fff', boxSizing: 'border-box'}} />;
                })}
                {i === 0 ? <div style={{marginLeft: 26}}><Mono size={48} color={LABEL}>petits nombres</Mono></div> : null}
              </Pop>
            ))}
            <Pop at={longueur + 6}><Mono size={48} color={LABEL}>longueur</Mono></Pop>
          </div>
        </div>
      ) : (
        <>
          <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between'}}>
            <Pop at={gpt}><Mono size={64} color="#fff">GPT-4</Mono></Pop>
            <Pop at={y2023}><Mono size={52} color={LABEL}>2023</Mono></Pop>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: 30}}>
            {/* Bar grow jusqu'à 59 %, avec count-up + punch zoom (le seul du short) sur « 59 ». */}
            <Pop at={reussi} style={{flex: 1, height: 80, border: '6px solid #fff', boxSizing: 'border-box', position: 'relative'}}>
              <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: `${59 * fill}%`, background: accent}} />
            </Pop>
            <div style={{width: 280, transform: `scale(${punch(frame, n59)})`, transformOrigin: 'left center', opacity: frame >= reussi ? 1 : 0}}>
              <Mono size={110} color={accent}>{countUp(frame, reussi, 59, Math.max(10, n59 - reussi))} %</Mono>
            </div>
          </div>
          {/* La multiplication : pop in sur « multiplications », highlight des deux nombres sur « trois ». */}
          <Pop at={multi} style={{display: 'flex', justifyContent: 'center', gap: 30, marginTop: 30}}>
            <Mono size={96} color="#fff"><Highlight at={trois}>347</Highlight></Mono>
            <Mono size={96} color="#fff">×</Mono>
            <Mono size={96} color="#fff"><Highlight at={trois + 4}>862</Highlight></Mono>
          </Pop>
        </>
      )}
    </Scene>
  );
};

// ---------- 6. Outil : l'assistant écrit un petit programme, le fait tourner, recopie le résultat ----------

const CODE = 'print(347 * 862)';

const Outil: React.FC = () => {
  const frame = useCurrentFrame();
  const assistants = at('outil', 'assistants');
  const delegue = at('outil', 'délèguent');
  const ecrivent = at('outil', 'écrivent');
  const tourner = at('outil', 'tourner');
  const recopient = at('outil', 'recopient');
  const resultat = at('outil', 'résultat');
  const fly = ease(frame, recopient, recopient + 14, [0, 1], 'inOut');
  // Le nombre vole de la sortie du terminal (en haut à droite) jusqu'à la bulle (en bas), en arc.
  const [fx, fy] = arc(fly, [360, -270], [0, 0], 70);
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 560}}>
        {/* Décor : la bulle de réponse de l'assistant, vide, posée dès l'entrée. */}
        <Pop at={2} style={{position: 'absolute', left: 0, right: 0, top: 380, height: 150, border: '5px solid #444', borderRadius: 34, display: 'flex', alignItems: 'center', padding: '0 40px'}}>
          <div style={{transform: `translate(${fx}px, ${fy}px)`, opacity: frame >= recopient ? 1 : 0}}>
            {/* Arc puis highlight sur « résultat ». */}
            <Mono size={80} color="#fff"><Highlight at={resultat}>299 114</Highlight></Mono>
          </div>
        </Pop>
        {/* L'assistant : pop in sur « assistants ». */}
        <Pop at={from2(assistants)} style={{position: 'absolute', left: 0, top: 70}}><Model w={220} /></Pop>
        {/* Délégation : une flèche qui se dessine vers le terminal (draw-on). */}
        <svg width={110} height={60} viewBox="0 0 110 60" style={{position: 'absolute', left: 232, top: 110, opacity: frame >= delegue ? 1 : 0}}>
          <Draw d="M6 30 H96 M76 12 L98 30 L76 48" p={ease(frame, delegue, delegue + 10)} width={8} len={170} color="#fff" />
        </svg>
        <Pop at={delegue + 4} style={{position: 'absolute', left: 350, top: 0}}>
          <Term w={538} h={300} run={frame >= tourner}>
            {/* Le programme s'écrit à la machine (typewriter) sur « écrivent ». */}
            <Mono size={48} color="#fff">{typed(frame, ecrivent, CODE, 32)}</Mono>
            {/* Sa sortie apparaît quand il tourne (pop in). */}
            <Pop at={tourner + 6}><Mono size={48} color={LABEL}>299114</Mono></Pop>
          </Term>
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 7. Chute : la même réponse, l'une avec le code exécuté, l'autre devinée ----------

const Chute: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const total = at('chute', 'total');
  const execute = at('chute', 'exécuté');
  const sinon = at('chute', 'sinon');
  const devine = at('chute', 'deviné');
  const juste = at('chute', 'juste');
  const garanti = at('chute', 'garanti');
  const card: React.CSSProperties = {width: 420, height: 600, border: '6px solid #fff', borderRadius: 30, background: '#141414', boxSizing: 'border-box', padding: 26, display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'center', position: 'relative'};
  const answer = (
    <div style={{width: '100%', border: '5px solid #444', borderRadius: 26, padding: '18px 0', display: 'flex', justifyContent: 'center'}}>
      <Mono size={64} color="#fff">299 114</Mono>
    </div>
  );
  return (
    <Scene>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        {/* Décor : les deux fenêtres de réponse, posées dès l'entrée ; la réponse (le total) en pop in sur « total ». */}
        <Pop at={2} style={card}>
          <Pop at={execute} style={{display: 'flex', alignItems: 'center', gap: 8, alignSelf: 'flex-start'}}>
            <Check p={ease(frame, execute + 2, execute + 12)} size={56} color={accent} />
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <Mono size={48} color={accent}>code</Mono>
              <Mono size={48} color={accent}>exécuté</Mono>
            </div>
          </Pop>
          {/* Le programme de la scène d'avant, en petit. */}
          <Pop at={execute + 5}>
            <Term w={368} h={170} run>
              <div style={{height: 14, width: '90%', background: '#cfcfcf'}} />
              <div style={{height: 14, width: '50%', background: '#7a7a7a'}} />
            </Term>
          </Pop>
          <div style={{flex: 1}} />
          <Pop at={total} style={{width: '100%'}}>{answer}</Pop>
        </Pop>
        <Pop at={2} style={{...card, opacity: frame >= sinon ? 1 : 0.6}}>
          {/* Le candidat du compte est bon, qui annonce sans brouillon : pop in sur « sinon ». */}
          <Pop at={sinon} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 20}}>
            <Pixel sprite={CANDIDAT} px={12} seed={4} />
            <div style={{width: 200, height: 22, background: '#b8b0a0'}} />
          </Pop>
          <div style={{flex: 1}} />
          <Pop at={total + 4} style={{width: '100%'}}>{answer}</Pop>
          {/* Tampon DEVINÉ : chute + squash sur « deviné ». */}
          <Stamp at={devine} size={56} tilt={-6} bg="rgba(0,0,0,0.7)" style={{left: 74, top: 292, zIndex: 2}}>DEVINÉ</Stamp>
          {/* « souvent juste » : la coche se dessine ; « jamais garanti » : un point d'interrogation à côté. */}
          <div style={{position: 'absolute', right: 20, top: 30, display: 'flex', alignItems: 'center', gap: 6}}>
            <div style={{opacity: frame >= juste ? 1 : 0}}><Check p={ease(frame, juste, juste + 10)} size={64} color="#fff" /></div>
            <Pop at={garanti}><Mono size={72} color={accent}>?</Mono></Pop>
          </div>
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- Montage ----------

const SCENES: Record<string, React.FC> = {hook: Hook, calculette: Calculette, tokens: Tokens, compte: Compte, haiku: Haiku, longs: Longs, outil: Outil, chute: Chute};

export const MytheCalculeVoix: React.FC = () => <V.Montage scenes={SCENES} accent={AC} />;

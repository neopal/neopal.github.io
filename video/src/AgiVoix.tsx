// Short AGI (YouTube / TikTok / Instagram), épisode 14, voix off PAL - FR, préparé le 2026-10-19 (calage provisoire, sans voix).
// Fiche agi de lexique/terms.js ; sources dans voix/agi.script.json : l'annonce du 3 septembre 2026 au lancement de GPT-6 Astra
// (Gizmodo : le président d'OpenAI, « not unreasonable », montré mais pas nommé) ; l'accord Microsoft / OpenAI de 2023
// (TechCrunch, 26 décembre 2024, d'après The Information : 100 milliards de dollars de bénéfices) ; Hendrycks et al.,
// A Definition of AGI, 21 octobre 2025 (GPT-5 à 57 %, fort en connaissances, presque rien en mémoire à long terme ; les
// hauteurs des dix barres sont schématiques, aucun chiffre par domaine n'est écrit) ; Grace et al. (AI Impacts), enquête
// publiée en 2024 (une chance sur deux : 2047 pour toutes les tâches, 2116 pour tous les métiers) ; l'image de Théo.
// Fil : le modèle devine les chiffres (ép. 13), et ses labos annoncent pourtant l'AGI ; de quoi parlent-ils ?
// L'écran suit la voix et Le mouvement (univers.md) : chaque élément entre sur le mot qui le nomme, easing, arcs,
// un seul punch zoom (le 57 %), chaque effet nommé en commentaire (vocabulaire du motion).
import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Big, Draw, Highlight, Mono, Pop, Say, Scene, W, arc, countUp, ease, punch, serif, typed, useAccent, withAlpha} from './kit';
import {LABEL, makeVoix} from './voix/VoixShort';
import {Pixel} from './voix/Pixel';
import {Model, pixelShadow} from './voix/Parts';
import ALIGN from './voix/agi.align.json';
import SCRIPT from './voix/agi.script.json';

const AC = '#F08DC2'; // catégorie Écosystème
const V = makeVoix(ALIGN, SCRIPT, 'voix/prediction-music.mp3');
const {at} = V;
export const AGIVOIX_DURATION = V.duration;

const gone = (frame: number, until: number) => ease(frame, until, until + 6, [1, 0], 'inOut');
const H = 600; // hauteur du schéma, dans la zone centrale de Scene (640)

// ---------- Personnages (même format que voix/Pixel.tsx : une lettre = une couleur, E = les yeux qui clignent) ----------

type Sprite = {rows: string[]; palette: Record<string, string>};
const SKIN = '#e3b58e';

// Le président du labo, à la scène de lancement : cheveux courts, veste grise sur t-shirt sombre.
const PRESIDENT: Sprite = {
  rows: [
    '....HHHH....',
    '...HHHHHH...',
    '...SSSSSS...',
    '...SESSES...',
    '...SSSSSS...',
    '...SSRRSS...',
    '....SSSS....',
    '....SSSS....',
    '.GGGBBBBGGG.',
    '.GGGBBBBGGG.',
    '.SGGBBBBGGS.',
    '.SGGGBBGGGS.',
    '...GGGGGG...',
    '...GGGGGG...',
  ],
  palette: {H: '#3a2a1e', S: SKIN, E: '#111', R: '#b5524f', G: '#7a7a84', B: '#2a2a2a'},
};

// Théo, vingt-six ans : cheveux en bataille, barbe courte, sweat à capuche.
const THEO: Sprite = {
  rows: [
    '..HHHHHHH...',
    '..HHHHHHHH..',
    '...SSSSSSH..',
    '...SESSES...',
    '...SSSSSS...',
    '...BSRRSB...',
    '....BBBB....',
    '....SSSS....',
    '.UUUUUUUUUU.',
    '.UUUWUUWUUU.',
    '.SUUWUUWUUS.',
    '.SUUUUUUUUS.',
    '...UUUUUU...',
    '...UUUUUU...',
  ],
  palette: {H: '#6b4226', S: SKIN, E: '#111', R: '#b5524f', B: '#5a3a22', U: '#2f7f86', W: '#f2f2f2'},
};

// Mamie : cheveux blancs, gilet rose, collier de perles.
const MAMIE: Sprite = {
  rows: [
    '...WWWWWW...',
    '..WWWWWWWW..',
    '..WSSSSSSW..',
    '..WSESSESW..',
    '...SSSSSS...',
    '...SSRRSS...',
    '....SSSS....',
    '...QSQSQS...',
    '.CCCCCCCCCC.',
    '.CCCCCCCCCC.',
    '.SCCCCCCCCS.',
    '.SCCCCCCCCS.',
    '...CCCCCC...',
    '...CCCCCC...',
  ],
  palette: {W: '#ededed', S: SKIN, E: '#111', R: '#b5524f', Q: '#fff8e7', C: '#d27a9b'},
};

// Le père : moustache, chemise à carreaux bleue.
const PERE: Sprite = {
  rows: [
    '....HHHH....',
    '...HHHHHH...',
    '...HSSSSH...',
    '...SESSES...',
    '...SSSSSS...',
    '...SMMMMS...',
    '....SSSS....',
    '....SSSS....',
    '.KKKKKKKKKK.',
    '.KLKLKLKLKK.',
    '.SKKKKKKKKS.',
    '.SLKLKLKLKS.',
    '...KKKKKK...',
    '...KKKKKK...',
  ],
  palette: {H: '#6d6256', S: SKIN, E: '#111', M: '#4a3b2c', K: '#4a6fa5', L: '#2f4a75'},
};

// L'oncle banquier : cheveux plaqués, lunettes dorées, costume bleu nuit, cravate rouge.
const ONCLE: Sprite = {
  rows: [
    '...HHHHHH...',
    '...HHHHHHH..',
    '...SSSSSS...',
    '...GEGGEG...',
    '...SSSSSS...',
    '...SSRRSS...',
    '....SSSS....',
    '..NNWTTWNN..',
    '.NNNWTTWNNN.',
    '.NNNNTTNNNN.',
    '.SNNNTTNNNS.',
    '.SNNNNNNNNS.',
    '...NNNNNN...',
    '...NNNNNN...',
  ],
  palette: {H: '#151515', S: SKIN, E: '#111', G: '#c9a227', R: '#b5524f', N: '#1f2a44', W: '#f2f2f2', T: '#c0392b'},
};

// « Les humains » : une silhouette neutre, en gris.
const HUMAIN: Sprite = {
  rows: [
    '....HHHH....',
    '...HHHHHH...',
    '...SSSSSS...',
    '...SESSES...',
    '...SSSSSS...',
    '....SSSS....',
    '.TTTTTTTTTT.',
    '.TTTTTTTTTT.',
    '.STTTTTTTTS.',
    '.STTTTTTTTS.',
    '...TTTTTT...',
    '...TTTTTT...',
  ],
  palette: {H: '#bdbdbd', S: '#d9d9d9', E: '#111', T: '#8a8a8a'},
};

// ---------- 0. Hook ----------

const Hook: React.FC = () => <V.TitleHook lead="C'est quoi ?" lines={["l'AGI"]} cue="AGI" />;

// ---------- 1. Astra : l'écran de la soirée de lancement, puis « l'ère de l'AGI ? » ----------

// Logo générique d'un lancement : une étincelle à quatre branches (aucune marque).
const Spark: React.FC<{size: number}> = ({size}) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <path d="M50 4 C54 38 62 46 96 50 C62 54 54 62 50 96 C46 62 38 54 4 50 C38 46 46 38 50 4 Z" fill={useAccent()} />
  </svg>
);

const Astra: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const sept = at('astra', 'septembre');
  const gpt = at('astra', 'GPT-6');
  const pres = at('astra', 'président');
  const pas = at('astra', 'pas');
  const ere = at('astra', "l'ère");
  const mais = at('astra', 'mais');
  const exact = at('astra', 'exactement');
  const wipe = ease(frame, ere, ere + 16, [0, 1], 'inOut'); // wipe : la diapo du lancement passe à « l'ère de l'AGI »
  const q = ease(frame, exact, exact + 20); // le point d'interrogation grossit sur « exactement »
  const back = frame >= mais ? ease(frame, mais, mais + 8, [1, 0.35], 'inOut') : 1; // le président passe en retrait
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: H}}>
        {/* pop in : la date, sur « septembre » */}
        <Pop at={sept} style={{position: 'absolute', right: 0, top: 0}}><Mono size={48} color={LABEL}>3 septembre 2026</Mono></Pop>
        {/* Décor posé dès l'entrée : l'écran géant de la scène de lancement. */}
        <Pop at={2} style={{position: 'absolute', left: 0, top: 64, width: W, height: 270, boxSizing: 'border-box', border: `6px solid ${accent}`, background: '#121212', boxShadow: pixelShadow(withAlpha(accent, 0.3)), overflow: 'hidden'}}>
          <div style={{position: 'absolute', left: 22, top: 18, lineHeight: 0}}><Spark size={56} /></div>
          {/* typewriter : « GPT-6 Astra » s'écrit sur l'écran */}
          <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', clipPath: `inset(0 0 0 ${wipe * 100}%)`}}>
            <Mono size={88} color="#fff">{typed(frame, gpt, 'GPT-6 Astra', 30)}</Mono>
          </div>
          <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 26, clipPath: `inset(0 ${(1 - wipe) * 100}% 0 0)`}}>
            <Say size={84}>l'ère de l'AGI</Say>
            <div style={{opacity: frame >= exact ? 1 : 0, transform: `scale(${0.3 + 1.5 * q})`, transformOrigin: '50% 60%'}}>
              <Mono size={96} color={accent}>?</Mono>
            </div>
          </div>
          {wipe > 0 && wipe < 1 ? <div style={{position: 'absolute', top: 0, bottom: 0, left: `calc(${wipe * 100}% - 5px)`, width: 10, background: accent}} /> : null}
        </Pop>
        {/* pop in : le président, sur le mot ; son libellé 5 images après */}
        <div style={{position: 'absolute', left: 0, top: 372, opacity: back, display: 'flex', flexDirection: 'column', gap: 8}}>
          <Pop at={pres}><Pixel sprite={PRESIDENT} px={11} seed={3} /></Pop>
          <Pop at={pres + 5}><Mono size={48} color={LABEL}>le président</Mono></Pop>
        </div>
        {/* pop in puis typewriter : la citation tapée dans sa bulle (non sous-titrée, cf. quoted) */}
        <Pop at={pas} style={{position: 'absolute', left: 190, top: 384, opacity: back}}>
          <div style={{position: 'relative', background: '#efe9dc', border: '6px solid #000', boxShadow: pixelShadow('#444'), padding: '20px 26px', width: 690, boxSizing: 'border-box'}}>
            <div style={{position: 'absolute', left: -30, top: 34, width: 0, height: 0, borderTop: '18px solid transparent', borderBottom: '18px solid transparent', borderRight: '30px solid #000'}} />
            <Say size={54} color="#111">{typed(frame, pas + 2, '« pas déraisonnable »', 34) || ' '}</Say>
          </div>
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 2. Le nom : AGI, puis l'anglais lettre par lettre, la définition, et une étiquette par personne ----------

const EN = [
  {cue: 'artificial', word: 'artificial', nth: 0},
  {cue: 'general', word: 'general', nth: 0},
  {cue: 'intelligence', word: 'intelligence', nth: 1},
];
const TAGS = [
  {tilt: -6, color: AC, d: 'M10 30 C 40 0, 70 60, 100 26 S 150 10, 170 30'},
  {tilt: 4, color: '#5b7fb5', d: 'M10 20 L 60 20 M 10 44 L 140 44'},
  {tilt: -3, color: '#4f8a5b', d: 'M10 36 Q 50 0 90 36 T 170 36'},
  {tilt: 7, color: '#e8c45a', d: 'M10 40 L 40 12 L 70 40 L 100 12 L 130 40'},
];
const TAG_W = 190;
const TAG_GAP = (W - 4 * TAG_W) / 3;

const Nom: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const agi = at('nom', 'agi');
  const en = EN.map((e) => at('nom', e.cue, e.nth));
  const une = at('nom', 'une');
  const aussi = at('nom', 'aussi');
  const hum = at('nom', 'humains');
  const chacun = at('nom', 'chacun');
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: H}}>
        {/* pop in : le sigle, posé dès le premier mot */}
        <Pop at={Math.max(2, agi)} style={{position: 'absolute', left: 0, right: 0, top: 10, display: 'flex', justifyContent: 'center'}}>
          <Big size={150}>AGI</Big>
        </Pop>
        {/* stagger calé sur la voix : un mot anglais par mot dit, l'initiale en couleur d'accent (A, G, I) */}
        {frame < une + 6 ? (
          <div style={{position: 'absolute', left: 0, right: 0, top: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, opacity: gone(frame, une)}}>
            {EN.map((e, k) => (
              <Pop key={e.word} at={en[k]}>
                <Big size={100}><span style={{color: accent}}>{e.word[0].toUpperCase()}</span>{e.word.slice(1)}</Big>
              </Pop>
            ))}
          </div>
        ) : null}
        {/* La définition courte : le modèle = les humains (pop in en cascade, sur « une IA », « aussi », « humains ») */}
        {frame >= une && frame < chacun + 6 ? (
          <div style={{position: 'absolute', left: 0, right: 0, top: 250, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 34, opacity: gone(frame, chacun)}}>
            <Pop at={une}><Model w={240} /></Pop>
            <Pop at={aussi}><Mono size={96} color="#fff">=</Mono></Pop>
            <Pop at={hum} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10}}>
              <div style={{display: 'flex', gap: 8}}>
                {[0, 1, 2].map((k) => <Pixel key={k} sprite={HUMAIN} px={8} seed={k * 5} />)}
              </div>
              <Mono size={48} color={LABEL}>les humains</Mono>
            </Pop>
          </div>
        ) : null}
        {/* « chacun en a sa propre définition » : quatre étiquettes accrochées au sigle, chacune griffonnée autrement
            (draw-on des ficelles + pop in en cascade, 3 images d'écart, de gauche à droite) */}
        <svg width={W} height={H} style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}>
          {TAGS.map((t, k) => (
            <Draw key={k} d={`M${W / 2} 170 L${k * (TAG_W + TAG_GAP) + TAG_W / 2} 290`} p={ease(frame, chacun + 3 * k, chacun + 3 * k + 10)} width={4} len={500} color="#8a8a8a" />
          ))}
        </svg>
        {TAGS.map((t, k) => (
          <Pop key={k} at={chacun + 3 * k + 4} style={{position: 'absolute', left: k * (TAG_W + TAG_GAP), top: 290}}>
            <div style={{width: TAG_W, background: '#efe9dc', border: '5px solid #000', boxShadow: pixelShadow('#444'), padding: '16px 10px 18px', boxSizing: 'border-box', transform: `rotate(${t.tilt}deg)`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10}}>
              <div style={{width: 18, height: 18, borderRadius: 9, border: '4px solid #555'}} />
              <Mono size={48} color="#111">AGI =</Mono>
              <svg width={170} height={60} viewBox="0 0 180 60">
                <Draw d={t.d} p={ease(frame, chacun + 3 * k + 8, chacun + 3 * k + 22)} width={7} len={300} color={t.color} />
              </svg>
            </div>
          </Pop>
        ))}
      </div>
    </Scene>
  );
};

// ---------- 3. Théo : le repas du dimanche, et la toise où chacun met sa marque ----------

// La nappe vichy, le poulet du dimanche, les assiettes et la bouteille.
const Table: React.FC<{w: number}> = ({w}) => (
  <svg width={w} height={200} viewBox={`0 0 ${w} 200`}>
    <defs>
      <pattern id="agi-vichy" width="32" height="32" patternUnits="userSpaceOnUse">
        <rect width="32" height="32" fill="#f4efe6" />
        <rect width="16" height="32" fill="rgba(192,57,43,0.45)" />
        <rect width="32" height="16" fill="rgba(192,57,43,0.45)" />
      </pattern>
    </defs>
    <rect x="0" y="40" width={w} height="160" fill="url(#agi-vichy)" stroke="#000" strokeWidth="5" />
    <ellipse cx={w * 0.2} cy="56" rx="44" ry="13" fill="#fff" stroke="#999" strokeWidth="3" />
    <ellipse cx={w * 0.8} cy="56" rx="44" ry="13" fill="#fff" stroke="#999" strokeWidth="3" />
    <ellipse cx={w * 0.5} cy="58" rx="70" ry="18" fill="#fff" stroke="#999" strokeWidth="3" />
    <ellipse cx={w * 0.5} cy="38" rx="48" ry="28" fill="#c8803a" />
    <ellipse cx={w * 0.5 - 14} cy="28" rx="16" ry="8" fill="#e0a35e" />
    <path d={`M${w * 0.5 + 40} 30 l22 -14 M${w * 0.5 - 40} 30 l-22 -14`} stroke="#c8803a" strokeWidth="12" strokeLinecap="round" />
    <rect x={w * 0.66} y="-2" width="20" height="58" fill="#2e5a3a" />
    <rect x={w * 0.66 + 5} y="-16" width="10" height="18" fill="#2e5a3a" />
  </svg>
);

// La toise du mur (décor) : une règle en bois graduée.
const TOISE_X = 222;
const Toise: React.FC<{glow: number}> = ({glow}) => {
  const accent = useAccent();
  return (
    <svg width={48} height={H - 40} viewBox={`0 0 48 ${H - 40}`}>
      <rect x="2" y="2" width="44" height={H - 44} fill="#c9a46a" stroke={glow > 0 ? accent : '#000'} strokeWidth={4 + 4 * glow} />
      {Array.from({length: Math.floor((H - 60) / 20)}, (_, k) => (
        <path key={k} d={`M2 ${20 + k * 20} H${k % 5 === 0 ? 30 : 16}`} stroke="#5a4020" strokeWidth="3" />
      ))}
    </svg>
  );
};

const SEATS = [510, 640, 770];

const Theo: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const theo = at('theo', 'Théo');
  const vingt = at('theo', 'vingt');
  const grand = at('theo', 'grand');
  const FAMILY = [
    {sprite: MAMIE, name: ['Mamie'], who: at('theo', 'Mamie'), cue: at('theo', 'bac'), label: 'bac', y: 470},
    {sprite: PERE, name: ['son père'], who: at('theo', 'père'), cue: at('theo', 'loyer'), label: 'loyer', y: 300},
    {sprite: ONCLE, name: ["l'oncle", 'banquier'], who: at('theo', 'oncle'), cue: at('theo', 'premier'), label: 'million', y: 110},
  ];
  // Le décor de la scène : la toise et la table du dimanche, posées dès l'entrée.
  const glow = ease(frame, grand, grand + 6) * ease(frame, grand + 20, grand + 30, [1, 0], 'inOut'); // highlight de la toise sur « grand »
  return (
    <Scene bottom={<Pop at={vingt} style={{marginLeft: 290}}><Mono size={52} color={LABEL}>26 ans</Mono></Pop>}>
      <div style={{position: 'relative', width: W, height: H}}>
        <Pop at={2} style={{position: 'absolute', left: TOISE_X, top: 30, lineHeight: 0}}><Toise glow={glow} /></Pop>
        <Pop at={grand} style={{position: 'absolute', left: TOISE_X + 66, top: 0}}><Mono size={52} color={accent}>« grand »</Mono></Pop>
        {/* La marque de chacun sur la toise : draw-on du trait à sa hauteur, sur le mot du critère, puis son libellé ;
            la marque courante en couleur d'accent, les précédentes passent en retrait. */}
        {FAMILY.map((f, k) => {
          const next = k + 1 < FAMILY.length ? FAMILY[k + 1].cue : 10_000;
          const c = frame >= next ? LABEL : accent;
          return (
            <React.Fragment key={f.label}>
              <svg width={300} height={20} style={{position: 'absolute', left: TOISE_X - 10, top: f.y - 10, overflow: 'visible'}}>
                <Draw d="M0 10 H290" p={ease(frame, f.cue, f.cue + 10)} width={8} len={300} color={c} />
              </svg>
              <Pop at={f.cue + 5} style={{position: 'absolute', right: W - TOISE_X + 14, top: f.y - 32}}><Mono size={48} color={c}>{f.label}</Mono></Pop>
            </React.Fragment>
          );
        })}
        {/* pop in : Théo, debout contre la toise */}
        <Pop at={theo} style={{position: 'absolute', left: TOISE_X + 60, top: H - 10 - 224, lineHeight: 0}}><Pixel sprite={THEO} px={16} seed={1} /></Pop>
        {/* La famille, derrière la table : chacun entre sur son nom, son libellé au-dessus tant qu'il a la parole. */}
        {FAMILY.map((f, k) => {
          const next = k + 1 < FAMILY.length ? FAMILY[k + 1].who : 10_000;
          return (
            <React.Fragment key={f.label}>
              <Pop at={f.who} style={{position: 'absolute', left: SEATS[k], top: 296, lineHeight: 0}}><Pixel sprite={f.sprite} px={9} seed={k * 4 + 2} /></Pop>
              {frame < next + 6 ? (
                <Pop at={f.who + 5} style={{position: 'absolute', top: k === 2 ? 168 : 186, ...(k === 2 ? {right: 0, alignItems: 'flex-end'} : {left: SEATS[k] + 54 - 15 * f.name[0].length, alignItems: 'center'}), display: 'flex', flexDirection: 'column', opacity: gone(frame, next)}}>
                  {f.name.map((n) => <Mono key={n} size={48} color={accent}>{n}</Mono>)}
                </Pop>
              ) : null}
            </React.Fragment>
          );
        })}
        <Pop at={2} style={{position: 'absolute', left: 500, top: 400, lineHeight: 0}}><Table w={W - 500} /></Pop>
      </div>
    </Scene>
  );
};

// ---------- 4. Le contrat Microsoft / OpenAI de 2023 : l'AGI en dollars ----------

const Signature: React.FC<{p: number; d: string}> = ({p, d}) => (
  <svg width={226} height={70} viewBox="0 0 240 70">
    <Draw d={d} p={p} width={5} len={520} color="#1d2b6b" />
  </svg>
);

const Contrat: React.FC = () => {
  const frame = useCurrentFrame();
  const accord = at('contrat', 'accord');
  const signe = at('contrat', 'signé');
  const y2023 = at('contrat', '2023');
  const ms = at('contrat', 'Microsoft');
  const oa = at('contrat', 'OpenAI');
  const media = at('contrat', 'The');
  const agi = at('contrat', "l'agi");
  const n100 = at('contrat', '100');
  const dollars = at('contrat', 'dollars');
  const benef = at('contrat', 'bénéfices');
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: H}}>
        {/* Décor posé dès l'entrée : la feuille du contrat. */}
        <Pop at={2} style={{position: 'absolute', left: 0, top: 10}}>
          <div style={{width: 560, height: 570, background: '#efe9dc', border: '6px solid #000', boxShadow: pixelShadow('#444'), padding: '30px 26px', boxSizing: 'border-box', transform: 'rotate(-1.5deg)', display: 'flex', flexDirection: 'column', gap: 16}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', height: 66}}>
              {/* typewriter : le titre, sur « accord » */}
              <Mono size={60} color="#111">{typed(frame, accord, 'ACCORD', 26)}</Mono>
              <Pop at={y2023}><Mono size={52} color="#111">2023</Mono></Pop>
            </div>
            {[88, 70, 80].map((w, k) => <div key={k} style={{height: 12, width: `${w}%`, background: '#9a9384'}} />)}
            {/* La clause : « AGI = » sur le mot, puis le montant tapé (typewriter) et surligné (highlight) */}
            <div style={{display: 'flex', flexDirection: 'column', gap: 4, marginTop: 6, minHeight: 190}}>
              <Pop at={agi}><Mono size={56} color="#111">AGI =</Mono></Pop>
              <div style={{minHeight: 72}}>
                {frame >= n100 ? <Highlight at={dollars}><Mono size={54} color="#111">{typed(frame, n100, '100 milliards $', 34)}</Mono></Highlight> : null}
              </div>
              <Mono size={52} color="#111">{typed(frame, benef, 'de bénéfices', 34) || ' '}</Mono>
            </div>
            {/* Les signatures : draw-on sur « signé », les noms sur leurs mots */}
            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 'auto'}}>
              {[
                {name: 'Microsoft', at: ms, d: 'M10 50 C 30 10, 50 10, 60 45 S 90 60, 110 25 S 150 5, 160 45 S 200 50, 230 30', delay: 0},
                {name: 'OpenAI', at: oa, d: 'M10 40 C 40 0, 60 70, 90 30 S 130 10, 140 50 L 170 20 S 210 50, 230 40', delay: 10},
              ].map((s) => (
                <div key={s.name} style={{display: 'flex', flexDirection: 'column', gap: 4, width: 226}}>
                  <Signature p={ease(frame, signe + s.delay, signe + s.delay + 18)} d={s.d} />
                  <div style={{height: 4, background: '#111'}} />
                  <div style={{height: 60, opacity: frame >= s.at ? 1 : 0}}><Pop at={s.at}><Say size={48} color="#111">{s.name}</Say></Pop></div>
                </div>
              ))}
            </div>
          </div>
        </Pop>
        {/* pop in : la coupure de presse du média, scotchée sur le coin */}
        <Pop at={media} style={{position: 'absolute', right: -28, top: 40}}>
          <div style={{position: 'relative', width: 350, background: '#dcdcd4', border: '4px solid #000', boxShadow: pixelShadow('#333'), padding: '18px 20px', boxSizing: 'border-box', transform: 'rotate(5deg)', display: 'flex', flexDirection: 'column', gap: 10}}>
            <div style={{position: 'absolute', left: -20, top: -16, width: 90, height: 30, background: 'rgba(255,255,255,0.55)', transform: 'rotate(-30deg)'}} />
            <div style={{position: 'absolute', right: -20, top: -16, width: 90, height: 30, background: 'rgba(255,255,255,0.55)', transform: 'rotate(30deg)'}} />
            <div style={{fontFamily: serif, fontWeight: 800, fontSize: 48, lineHeight: 1, color: '#111'}}>The Information</div>
            {[94, 80, 88, 60].map((w, k) => <div key={k} style={{height: 10, width: `${w}%`, background: '#8f8f88'}} />)}
          </div>
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 5. La grille : dix domaines, l'adulte instruit en haut, GPT-5 à 57 % ----------

// Hauteurs schématiques des dix barres (connaissances en premier, mémoire à long terme en dernier).
const BARS = [0.9, 1, 1, 0.7, 0.4, 0.4, 0.4, 0.6, 0.3, 0.04];
const COL_GAP = 16;
const COL_W = (W - 9 * COL_GAP) / 10;
const GRID_TOP = 150;
const GRID_H = 290;

const Grille: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const grille = at('grille', 'grille');
  const octobre = at('grille', 'octobre');
  const trentaine = at('grille', 'trentaine');
  const gpt = at('grille', 'GPT-5');
  const n57 = at('grille', '57');
  const echelle = at('grille', 'échelle');
  const adulte = at('grille', 'adulte');
  const conn = at('grille', 'connaissances');
  const mem = at('grille', 'mémoire');
  const scale = punch(frame, n57 + 36); // count-up puis punch zoom sur le chiffre (le seul punch du short)
  return (
    <Scene
      bottom={
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <Pop at={n57}>
            <div style={{transform: `scale(${scale})`}}><Mono size={110} color={accent}>{countUp(frame, n57, 57, 36)} %</Mono></div>
          </Pop>
        </div>
      }
    >
      <div style={{position: 'relative', width: W, height: H}}>
        {/* Les chercheurs (une trentaine de têtes, stagger), puis GPT-5 qui prend leur place */}
        {frame < gpt + 6 ? (
          <div style={{position: 'absolute', left: 0, top: 14, display: 'flex', gap: 4, opacity: gone(frame, gpt)}}>
            {Array.from({length: 30}, (_, k) => (
              <Pop key={k} at={trentaine + Math.floor(k / 3)}>
                <svg width={12} height={30} viewBox="0 0 12 30"><rect x="2" y="0" width="8" height="8" fill="#d9d9d9" /><rect x="0" y="10" width="12" height="20" fill="#8a8a8a" /></svg>
              </Pop>
            ))}
          </div>
        ) : null}
        <Pop at={gpt} style={{position: 'absolute', left: 0, top: 0}}><Mono size={60} color="#fff">GPT-5</Mono></Pop>
        <Pop at={octobre} style={{position: 'absolute', right: 0, top: 6}}><Mono size={48} color={LABEL}>octobre 2025</Mono></Pop>
        {/* L'échelle : le trait de l'adulte instruit en haut de chaque colonne (draw-on), son libellé sur « adulte » */}
        <Pop at={adulte} style={{position: 'absolute', right: 0, top: GRID_TOP - 70}}><Mono size={48} color="#fff">adulte instruit</Mono></Pop>
        <svg width={W} height={20} style={{position: 'absolute', left: 0, top: GRID_TOP - 10, overflow: 'visible'}}>
          <Draw d={`M0 10 H${W}`} p={ease(frame, echelle, echelle + 20)} width={5} len={W} color="#fff" />
        </svg>
        {/* Décor posé dès l'entrée : dix colonnes en pointillés (stagger) ; sur « grille », elles se fixent en trait plein
            (emphase, en cascade), puis les barres de GPT-5 poussent (bar grow, cascade) */}
        {BARS.map((b, k) => {
          const grow = ease(frame, gpt + 2 * k, gpt + 2 * k + 10);
          const isConn = k === 0 && frame >= conn && frame < mem;
          const isMem = k === 9 && frame >= mem;
          const fixed = frame >= grille + 2 * k;
          return (
            <Pop key={k} at={2 + 2 * k} style={{position: 'absolute', left: k * (COL_W + COL_GAP), top: GRID_TOP, width: COL_W, height: GRID_H}}>
              <div style={{position: 'absolute', inset: 0, border: `4px ${fixed ? 'solid' : 'dashed'} ${isMem ? accent : fixed ? '#9a9a9a' : '#555'}`, boxSizing: 'border-box'}} />
              <div style={{position: 'absolute', left: 8, right: 8, bottom: 6, height: (GRID_H - 12) * b * grow, background: isConn ? accent : '#cfcfcf'}} />
            </Pop>
          );
        })}
        <Pop at={conn} style={{position: 'absolute', left: 0, top: GRID_TOP + GRID_H + 20}}><Mono size={48} color={frame >= mem ? LABEL : accent}>connaissances</Mono></Pop>
        <Pop at={mem} style={{position: 'absolute', right: 0, top: GRID_TOP + GRID_H + 20}}><Mono size={48} color={accent}>mémoire</Mono></Pop>
      </div>
    </Scene>
  );
};

// ---------- 6. L'enquête : une chance sur deux, 2047 pour toutes les tâches, 2116 pour tous les métiers ----------

// Une chance sur deux : un disque à moitié plein.
const Half: React.FC<{size: number}> = ({size}) => {
  const accent = useAccent();
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="44" fill="#1c1c1c" stroke="#fff" strokeWidth="6" />
      <path d="M50 6 A44 44 0 0 1 50 94 Z" fill={accent} />
    </svg>
  );
};

const AXIS_Y = 440;

const Enquete: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const accent = useAccent();
  const enquete = at('enquete', 'enquête');
  const y2024 = at('enquete', '2024');
  const chance = at('enquete', 'chance');
  const deux = at('enquete', 'deux');
  const toutes = at('enquete', 'toutes');
  const y2047 = at('enquete', '2047');
  const auto = at('enquete', 'automatiser');
  const metiers = at('enquete', 'métiers');
  const y2116 = at('enquete', '2116');
  // La frise s'élargit (zoom arrière, inOut) quand la voix passe aux métiers : 2047 recule, 2116 entre à droite.
  const end = ease(frame, auto, auto + 22, [2054, 2120], 'inOut');
  const X = (y: number) => ((y - 2024) / (end - 2024)) * (W - 40) + 10;
  const x47 = X(2047);
  const x116 = X(2116);
  const fly = spring({frame: frame - y2047, fps, config: {damping: 16, stiffness: 120}});
  const [dx, dy] = arc(Math.min(1, fly), [700, 60], [x47 - 50, AXIS_Y - 50], 80); // le disque vole en arc jusqu'à 2047
  const back = frame >= auto ? ease(frame, auto, auto + 8, [1, 0.35], 'inOut') : 1;
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: H}}>
        {/* Décor posé dès l'entrée : la frise (draw-on), qui part de maintenant */}
        <svg width={W} height={40} style={{position: 'absolute', left: 0, top: AXIS_Y - 20, overflow: 'visible'}}>
          <Draw d={`M0 20 H${W - 10}`} p={ease(frame, 2, 30)} width={6} len={W} color="#fff" />
          <path d={`M${W - 24} 6 L${W - 4} 20 L${W - 24} 34`} fill="none" stroke="#fff" strokeWidth="6" opacity={frame >= 30 ? 1 : 0} />
          <circle cx="10" cy="20" r="10" fill="#fff" />
        </svg>
        {/* La plus grande enquête : une pile de questionnaires (pop in), l'année sur « 2024 » */}
        <Pop at={enquete} style={{position: 'absolute', left: 0, top: 0, opacity: back}}>
          <div style={{position: 'relative', width: 350, height: 250}}>
            {[3, 2, 1, 0].map((k) => (
              <div key={k} style={{position: 'absolute', left: k * 12, top: k * 10, width: 290, height: 220, background: k ? '#cfc8b8' : '#efe9dc', border: '5px solid #000', boxSizing: 'border-box', padding: '22px 22px', display: 'flex', flexDirection: 'column', gap: 18}}>
                {k === 0 ? [0, 1, 2, 3].map((r) => (
                  <div key={r} style={{display: 'flex', alignItems: 'center', gap: 12}}>
                    <div style={{width: 24, height: 24, border: '4px solid #111', background: r === 1 ? '#111' : 'transparent'}} />
                    <div style={{height: 10, width: [150, 120, 170, 100][r], background: '#9a9384'}} />
                  </div>
                )) : null}
              </div>
            ))}
          </div>
        </Pop>
        <Pop at={y2024} style={{position: 'absolute', left: 350, top: 20, opacity: back}}><Mono size={52} color="#fff">2024</Mono></Pop>
        <div style={{position: 'absolute', left: x47 - 4, top: AXIS_Y - 28, width: 8, height: 56, background: '#fff', opacity: frame >= y2047 ? 1 : 0}} />
        {/* Une chance sur deux : le disque à moitié plein (pop in), puis il vole en arc vers 2047 */}
        <div style={{position: 'absolute', left: frame >= y2047 ? dx : 700, top: frame >= y2047 ? dy : 60}}>
          <Pop at={chance}><Half size={100} /></Pop>
        </div>
        <Pop at={deux} style={{position: 'absolute', left: 660, top: 180, opacity: frame >= y2047 ? gone(frame, y2047) : 1}}><Mono size={52} color={accent}>1 sur 2</Mono></Pop>
        {/* 2047 : toutes les tâches (libellé sur « toutes », l'année sur « 2047 ») ; ils glissent avec le zoom */}
        <Pop at={toutes} style={{position: 'absolute', left: Math.min(Math.max(0, x47 - 245), W - 490), top: AXIS_Y - 150}}><Mono size={48} color="#fff">toutes les tâches</Mono></Pop>
        <Pop at={y2047} style={{position: 'absolute', left: x47 - 70, top: AXIS_Y + 34}}><Mono size={60} color="#fff">2047</Mono></Pop>
        {/* 2116 : tous les métiers, tout au bout de la frise élargie */}
        <Pop at={metiers} style={{position: 'absolute', right: 0, top: AXIS_Y - 210}}><Mono size={48} color={accent}>tous les métiers</Mono></Pop>
        <div style={{position: 'absolute', left: x116 - 4, top: AXIS_Y - 28, width: 8, height: 56, background: accent, opacity: frame >= y2116 ? 1 : 0}} />
        {/* pop in : le second disque, posé sur 2116 */}
        <div style={{position: 'absolute', left: x116 - 50, top: AXIS_Y - 50}}><Pop at={y2116}><Half size={100} /></Pop></div>
        <Pop at={y2116} style={{position: 'absolute', left: Math.min(x116 - 70, W - 150), top: AXIS_Y + 34}}><Mono size={60} color={accent}>2116</Mono></Pop>
      </div>
    </Scene>
  );
};

// ---------- 7. Chute : toutes les définitions vues, autour de « laquelle ? » ----------

const Tag: React.FC<{children: React.ReactNode; tilt: number; sprite?: Sprite}> = ({children, tilt, sprite}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: 12, background: '#efe9dc', border: '5px solid #000', boxShadow: pixelShadow('#444'), padding: '10px 16px', transform: `rotate(${tilt}deg)`}}>
    {sprite ? <Pixel sprite={sprite} px={4} seed={tilt} /> : null}
    <Mono size={48} color="#111">{children}</Mono>
  </div>
);

const CH = 630; // la chute prend toute la zone centrale (640)

const Chute: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const agi = at('chute', 'agi');
  const laquelle = at('chute', 'laquelle');
  // Les définitions vues reviennent en étiquettes, en cascade dans l'ordre de lecture, juste après « l'AGI ».
  const TAGS_END: {el: string; left: number; top: number; tilt: number; sprite?: Sprite}[] = [
    {el: 'bac', left: 0, top: 0, tilt: -5, sprite: MAMIE},
    {el: 'loyer', left: 300, top: 12, tilt: 3, sprite: PERE},
    {el: 'million', left: 590, top: 0, tilt: -3, sprite: ONCLE},
    {el: '100 milliards $', left: 0, top: 440, tilt: 3},
    {el: '2047', left: 560, top: 446, tilt: -4},
    {el: '57 %', left: 70, top: 536, tilt: -2},
    {el: '2116', left: 620, top: 536, tilt: 4},
  ];
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: CH}}>
        {/* Décor posé dès l'entrée : l'écran de lancement de la scène 1 (quelqu'un t'annonce...) ; « l'AGI » s'y pose sur le mot */}
        <Pop at={2} style={{position: 'absolute', left: 150, top: 120, width: W - 300, height: 170, boxSizing: 'border-box', border: `6px solid ${accent}`, background: '#121212', boxShadow: pixelShadow(withAlpha(accent, 0.3)), display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{position: 'absolute', left: 16, top: 14, lineHeight: 0}}><Spark size={48} /></div>
          <Pop at={agi}><Big size={120}>l'AGI</Big></Pop>
        </Pop>
        {TAGS_END.map((t, k) => (
          <Pop key={t.el} at={agi + 8 + 3 * k} style={{position: 'absolute', left: t.left, top: t.top}}>
            <Tag tilt={t.tilt} sprite={t.sprite}>{t.el}</Tag>
          </Pop>
        ))}
        {/* pop in : « laquelle ? » en couleur d'accent sur le dernier mot (le 2e et dernier italique d'accent, après le hook) */}
        <Pop at={laquelle} style={{position: 'absolute', left: 0, right: 0, top: 308, display: 'flex', justifyContent: 'center'}}>
          <Big size={120} color={accent}>laquelle ?</Big>
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- Montage ----------

const SCENES: Record<string, React.FC> = {hook: Hook, astra: Astra, nom: Nom, theo: Theo, contrat: Contrat, grille: Grille, enquete: Enquete, chute: Chute};

export const AgiVoix: React.FC = () => <V.Montage scenes={SCENES} accent={AC} />;

// Short Température (YouTube / TikTok / Instagram), épisode 6, voix off PAL - FR, préparé le 2026-10-09.
// Fiche temperature de lexique/terms.js : le tirage pondéré, les scores divisés par la température ; Thinking Machines Lab,
// 10 septembre 2025 : 1 000 fois la même question à Qwen3 à température 0, 80 réponses différentes.
// Les scores sont l'exemple illustratif du short muet (src/Temperature.tsx), reportés sur des prénoms de bébé ; les pourcentages sont
// calculés pour de vrai (softmax des scores divisés par T).
// Règle de lisibilité : le discours passe par les sous-titres ; l'écran montre des schémas, libellés de 3 mots au plus.
// L'écran suit la voix et Le mouvement (univers.md, repassés le 2026-10-12) : libellés repris de la voix, le DJ montré, easing.
import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {Big, Draw, Mono, Pop, Say, Scene, W, clamp, ease, useAccent, withAlpha} from './kit';
import {LABEL, makeVoix} from './voix/VoixShort';
import {DJ, Pixel} from './voix/Pixel';
import ALIGN from './voix/temperature.align.json';
import SCRIPT from './voix/temperature.script.json';

const AC = '#8FB8FF'; // catégorie Inférence
const V = makeVoix(ALIGN, SCRIPT, 'voix/prediction-music.mp3');
const {at} = V;
export const TEMPERATUREVOIX_DURATION = V.duration;

const pixelShadow = (c: string) => `8px 8px 0 ${c}`;
const gone = (frame: number, until: number) => ease(frame, until, until + 6, [1, 0], 'inOut');
// Plusieurs étapes, chacune amortie (slow in / slow out).
const smooth = {...clamp, easing: Easing.inOut(Easing.cubic)};
const fr = (n: number, dec = 1) => n.toFixed(dec).replace('.', ',');

// ---------- Le tirage (exemple du short muet) ----------

const WORDS = ['Gabriel', 'Noah', 'Ulysse', 'Marcel', 'Clafoutis'];
const SCORES = [2.0, 1.0, 0.6, 0.2, -0.3];
const probs = (T: number) => {
  const e = SCORES.map((s) => Math.exp(s / T));
  const sum = e.reduce((a, b) => a + b, 0);
  return e.map((x) => x / sum);
};

// Barres : un nom, sa part de tickets, son pourcentage ; lit = le nom que le tirage éclaire.
const Bars: React.FC<{ps: number[]; grow?: number; lit?: number}> = ({ps, grow = 1, lit = -1}) => {
  const accent = useAccent();
  const NAME = 300;
  const VAL = 140;
  const track = W - NAME - VAL - 24;
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 18}}>
      {WORDS.map((w, i) => {
        const on = i === lit;
        return (
          <div key={w} style={{display: 'flex', alignItems: 'center', gap: 12}}>
            <div style={{width: NAME}}><Mono size={48} color={on ? accent : '#fff'}>{w}</Mono></div>
            <div style={{width: track, height: 56, position: 'relative'}}>
              <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: Math.max(6, track * ps[i] * grow), background: on ? accent : withAlpha(accent, 0.45), boxShadow: on ? `0 0 30px ${withAlpha(accent, 0.7)}` : 'none'}} />
            </div>
            <div style={{width: VAL, textAlign: 'right'}}><Mono size={48} color={on ? accent : LABEL}>{`${Math.round(ps[i] * grow * 100)} %`}</Mono></div>
          </div>
        );
      })}
    </div>
  );
};

// Le curseur de température, de 0 à 2.
const Slider: React.FC<{T: number}> = ({T}) => {
  const accent = useAccent();
  const x = (T / 2) * W;
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 14}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
        <Mono size={48} color={LABEL}>température</Mono>
        <Mono size={72} color={accent}>{fr(T)}</Mono>
      </div>
      <div style={{position: 'relative', height: 56}}>
        <div style={{position: 'absolute', left: 0, right: 0, top: 22, height: 12, background: '#333'}} />
        <div style={{position: 'absolute', left: 0, top: 22, height: 12, width: x, background: accent}} />
        <div style={{position: 'absolute', left: x - 28, top: 0, width: 56, height: 56, background: '#000', border: `10px solid ${accent}`, boxSizing: 'border-box'}} />
      </div>
    </div>
  );
};

// ---------- 0. Hook ----------

const Hook: React.FC = () => <V.TitleHook lead="C'est quoi ?" lines={['la température']} cue="température" />;

// ---------- 1. Intro : même question, deux réponses, et un dé ----------

const Die: React.FC<{roll: number; size: number}> = ({roll, size}) => {
  const accent = useAccent();
  // Le dé roule (rotation) puis se pose sur le cinq.
  const face = roll >= 1 ? 5 : 1 + (Math.floor(roll * 20) % 6);
  const PIPS: Record<number, [number, number][]> = {1: [[2, 2]], 2: [[1, 1], [3, 3]], 3: [[1, 1], [2, 2], [3, 3]], 4: [[1, 1], [1, 3], [3, 1], [3, 3]], 5: [[1, 1], [1, 3], [2, 2], [3, 1], [3, 3]], 6: [[1, 1], [1, 2], [1, 3], [3, 1], [3, 2], [3, 3]]};
  return (
    <svg width={size} height={size} viewBox="0 0 4 4" style={{transform: `rotate(${(1 - Math.min(1, roll)) * 540}deg)`}}>
      <rect x="0.15" y="0.15" width="3.7" height="3.7" fill="#fff" stroke={accent} strokeWidth="0.15" />
      {PIPS[face].map(([x, y], k) => <circle key={k} cx={x} cy={y} r="0.34" fill="#111" />)}
    </svg>
  );
};

const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const reponse = at('intro', 'réponse');
  const tire = at('intro', 'tire');
  return (
    <Scene gap={30}>
      {['Gabriel', 'Noah'].map((r, k) => (
        <Pop key={k} at={4 + k * 6} style={{border: '4px solid #666', padding: '20px 28px', display: 'flex', flexDirection: 'column', gap: 12, opacity: gone(frame, tire)}}>
          <Mono size={48} color={LABEL}>Un prénom pour le bébé ?</Mono>
          <div style={{opacity: frame >= reponse - 6 + k * 8 ? 1 : 0}}><Say size={64}>{r}</Say></div>
        </Pop>
      ))}
      {frame >= tire ? (
        <div style={{position: 'absolute', left: 0, right: 0, top: 160, display: 'flex', justifyContent: 'center'}}>
          <Pop at={tire}><Die roll={ease(frame, tire, tire + 24)} size={260} /></Pop>
        </div>
      ) : null}
    </Scene>
  );
};

// ---------- 2. Le tirage : une part de tickets par suite possible ----------

const Tirage: React.FC = () => {
  const frame = useCurrentFrame();
  const proba = at('tirage', 'probabilité');
  const tire = at('tirage', 'tire');
  const favoris = at('tirage', 'favoris');
  const grow = ease(frame, proba, proba + 20);
  const tickets = at('tirage', 'tickets');
  // La surbrillance saute d'un nom à l'autre pendant « il en tire une au sort », puis s'arrête sur le favori.
  const hop = frame < tire ? -1 : frame < tire + 30 ? Math.floor((frame - tire) / 4) % WORDS.length : 0;
  return (
    <Scene
      gap={36}
      bottom={
        <Pop at={Math.max(favoris, tickets)} style={{display: 'flex', justifyContent: 'center'}}>
          <Mono size={56} color={LABEL}>plus de tickets</Mono>
        </Pop>
      }
    >
      <Pop at={4}><Say size={60} color={LABEL}>Notre bébé s'appellera …</Say></Pop>
      <Pop at={4}><Bars ps={probs(1)} grow={grow} lit={hop} /></Pop>
    </Scene>
  );
};

// ---------- 3. Le nom : le réglage qui dose le hasard ----------

const Nom: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const dose = at('nom', 'dose');
  // Le curseur fait un aller-retour quand la voix dit « dose ce hasard ».
  const T = interpolate(frame, [dose, dose + 20, dose + 40, dose + 55], [1, 2, 0.2, 1], smooth);
  return (
    <Scene gap={50}>
      <Pop at={4}><Big size={124} color={accent}>température</Big></Pop>
      <Pop at={dose}><Slider T={T} /></Pop>
    </Scene>
  );
};

// ---------- 4. L'image : le DJ du mariage ----------

const Vinyl: React.FC<{spin: number; size: number; label: string}> = ({spin, size, label}) => {
  const accent = useAccent();
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{transform: `rotate(${spin}deg)`}}>
      <circle cx="50" cy="50" r="48" fill="#111" stroke="#fff" strokeWidth="3" />
      {[38, 30, 22].map((r) => <circle key={r} cx="50" cy="50" r={r} fill="none" stroke="#333" strokeWidth="1.5" />)}
      <circle cx="50" cy="50" r="15" fill={label} />
      <circle cx="50" cy="50" r="3" fill="#000" />
      <rect x="47" y="36" width="6" height="6" fill={accent} opacity="0.8" />
    </svg>
  );
};

const NOTES = Array.from({length: 9}, (_, k) => ({x: Math.sin(k * 7.1) * 300, y: Math.cos(k * 3.7) * 170, r: (k * 47) % 360}));

const Dj: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const bas = at('dj', 'bas');
  const fond = at('dj', 'fond');
  const jazz = at('dj', 'Thalassa');
  // Le fader du DJ : en bas pendant « réglé au plus bas », poussé à fond sur « fond ».
  const level = interpolate(frame, [bas - 6, bas + 6, fond - 6, fond + 6], [0.5, 0.08, 0.08, 1], smooth);
  const wild = ease(frame, fond, jazz + 10);
  const dj = at('dj', 'DJ');
  return (
    <Scene
      bottom={
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <Pop at={bas + 8} style={{opacity: gone(frame, fond)}}><Mono size={56} color="#fff">« Freed from Desire »</Mono></Pop>
          <Pop at={jazz}><Mono size={56} color={accent}>Thalassa</Mono></Pop>
        </div>
      }
    >
      <div style={{position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 70}}>
        {/* Le DJ derrière sa platine : il hoche la tête plus vite quand il part sur Thalassa. */}
        <Pop at={dj} style={{transform: `translateY(${Math.sin(frame / (6 - 3 * wild)) * (2 + 6 * wild)}px)`}}><Pixel sprite={DJ} px={14} seed={8} /></Pop>
        <Pop at={4}><Vinyl spin={frame * (3 + 20 * wild)} size={300} label={frame < fond ? '#e8e2d6' : accent} /></Pop>
        {/* Le fader : une glissière verticale, le bouton monte avec le réglage. */}
        <Pop at={4} style={{position: 'relative', width: 70, height: 380}}>
          <div style={{position: 'absolute', left: 29, top: 0, bottom: 0, width: 12, background: '#333'}} />
          <div style={{position: 'absolute', left: 29, bottom: 0, height: `${level * 100}%`, width: 12, background: accent}} />
          <div style={{position: 'absolute', left: 0, bottom: `calc(${level * 100}% - 22px)`, width: 70, height: 44, background: '#fff', border: `6px solid ${accent}`, boxSizing: 'border-box'}} />
        </Pop>
        {/* Les notes s'éparpillent quand le DJ part sur Thalassa. */}
        {NOTES.map((n, k) => (
          <div key={k} style={{position: 'absolute', left: '50%', top: '50%', transform: `translate(${n.x * wild - 30}px, ${n.y * wild - 30}px) rotate(${n.r * wild}deg)`, opacity: wild}}>
            <svg width={60} height={60} viewBox="0 0 10 10">
              <rect x="6" y="1" width="1.2" height="6" fill={accent} />
              <circle cx="4.6" cy="7.2" r="2" fill={accent} />
            </svg>
          </div>
        ))}
      </div>
    </Scene>
  );
};

// ---------- 5. Le prénom du bébé : température basse, puis haute ----------

const Chip: React.FC<{at: number; word: string; hi?: boolean}> = ({at: a, word, hi = false}) => {
  const accent = useAccent();
  return (
    <Pop at={a} style={{border: `4px solid ${hi ? accent : '#666'}`, padding: '8px 18px', background: hi ? withAlpha(accent, 0.15) : 'transparent'}}>
      <Mono size={48} color={hi ? accent : '#fff'}>{word}</Mono>
    </Pop>
  );
};

const Prenom: React.FC = () => {
  const frame = useCurrentFrame();
  const basse = at('prenom', 'basse');
  const gabriel = at('prenom', 'Gabriel');
  const haute = at('prenom', 'haute');
  const ulysse = at('prenom', 'Ulysse');
  const marcel = at('prenom', 'Marcel');
  const clafoutis = at('prenom', 'Clafoutis');
  const T = interpolate(frame, [basse - 4, basse + 12, haute - 4, haute + 16], [1, 0.3, 0.3, 1.5], smooth);
  const low = frame < haute;
  return (
    <Scene
      gap={34}
      bottom={
        <div style={{display: 'flex', flexWrap: 'wrap', gap: 14}}>
          {low ? (
            [0, 1, 2].map((k) => <Chip key={k} at={gabriel + k * 6} word="Gabriel" />)
          ) : (
            <>
              <Chip at={haute} word="Gabriel" />
              <Chip at={ulysse} word="Ulysse" hi />
              <Chip at={marcel} word="Marcel" hi />
              <Chip at={clafoutis} word="Clafoutis" hi />
            </>
          )}
        </div>
      }
    >
      <Pop at={4}><Slider T={T} /></Pop>
      <Pop at={4}><Bars ps={probs(T)} /></Pop>
    </Scene>
  );
};

// Les 80 cases à éclairer : les 1 000 triées par un hachage stable, on garde les 80 premières.
const hash = (k: number) => {
  const x = Math.sin(k * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};
const ODD = new Set(Array.from({length: 1000}, (_, k) => k).sort((p, q) => hash(p) - hash(q)).slice(0, 80));

// ---------- 6. Feynman, mille fois : 80 réponses différentes à température 0 ----------

const Feynman: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const zero = at('feynman', 'zéro');
  const mille = at('feynman', 'mille');
  const n80 = at('feynman', '80');
  const COLS = 40;
  const ROWS = 25;
  const filled = ease(frame, mille, mille + 40, [0, COLS * ROWS], 'inOut');
  // 80 réponses différentes sur 1 000 : 80 cases tirées une fois pour toutes, éparpillées, éclairées quand la voix dit « 80 ».
  const odd = (k: number) => ODD.has(k);
  const lit = frame >= n80;
  return (
    <Scene
      gap={28}
      bottom={
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
          <Pop at={mille}><Mono size={56} color="#fff">mille fois</Mono></Pop>
          <Pop at={n80}><Mono size={56} color={accent}>80 réponses</Mono></Pop>
        </div>
      }
    >
      <Pop at={Math.min(4, zero)} style={{display: 'flex', alignItems: 'baseline', gap: 18}}>
        <Mono size={48} color={LABEL}>température</Mono>
        <Mono size={72} color={accent}>0</Mono>
      </Pop>
      <div style={{display: 'grid', gridTemplateColumns: `repeat(${COLS}, 1fr)`, gap: 4, opacity: ease(frame, 4, 12)}}>
        {Array.from({length: COLS * ROWS}, (_, k) => (
          <div key={k} style={{height: 16, background: k >= filled ? '#1c1c1c' : lit && odd(k) ? accent : '#5a5a5a', boxShadow: lit && odd(k) && k < filled ? `0 0 8px ${withAlpha(accent, 0.8)}` : 'none'}} />
        ))}
      </div>
    </Scene>
  );
};

// ---------- 7. Chute : prévisible, pas plus juste ----------

const Chute: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const previsible = at('chute', 'prévisible');
  const juste = at('chute', 'juste');
  const pareil = at('chute', 'pareil');
  return (
    <Scene
      gap={18}
      bottom={
        <Pop at={previsible} style={{display: 'flex', justifyContent: 'center'}}>
          <Mono size={56} color={accent}>prévisible</Mono>
        </Pop>
      }
    >
      <Pop at={4}><Slider T={0.2} /></Pop>
      <Pop at={juste} style={{alignSelf: 'flex-end', background: '#2a2a2a', padding: '14px 28px'}}>
        <Say size={56}>Capitale de l'Australie ?</Say>
      </Pop>
      {/* La même mauvaise réponse, trois fois, avec la même assurance. */}
      {[0, 1, 2].map((k) => (
        <Pop key={k} at={(k === 0 ? juste + 10 : pareil) + k * 6} style={{border: `5px solid ${frame >= pareil + 10 ? accent : '#666'}`, padding: '8px 26px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Say size={56}>Sydney</Say>
          <svg width={56} height={56} viewBox="0 0 100 100" style={{opacity: frame >= pareil + 10 ? 1 : 0}}>
            <Draw d="M22 22 L78 78" p={ease(frame, pareil + 10, pareil + 18)} width={14} len={80} color={accent} />
            <Draw d="M78 22 L22 78" p={ease(frame, pareil + 14, pareil + 22)} width={14} len={80} color={accent} />
          </svg>
        </Pop>
      ))}
    </Scene>
  );
};

// ---------- Montage ----------

const SCENES: Record<string, React.FC> = {hook: Hook, intro: Intro, tirage: Tirage, nom: Nom, dj: Dj, prenom: Prenom, feynman: Feynman, chute: Chute};

export const TemperatureVoix: React.FC = () => <V.Montage scenes={SCENES} accent={AC} />;

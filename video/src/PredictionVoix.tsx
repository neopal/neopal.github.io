// Short Prédiction du token suivant, version voix off (test YouTube Shorts) : voix ElevenLabs façon vulgarisateur,
// scènes et sous-titres calés mot à mot sur src/voix/prediction.align.json (tools/align-from-words.mjs).
// Règle « lisible dans le métro » (univers.md) : aucun texte sous 48 px, sous-titres de 2 lignes au plus restant
// au moins 1 s, un seul élément central par écran. Contrôle : node tools/check-voix.mjs prediction PredictionVoix
import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {loadFont as loadSerif} from '@remotion/google-fonts/Newsreader';
import {AccentProvider, Big, Chrome, GREY, LastContext, Mono, Oscillo, PAD, Pop, Say, Scene, W, ZONE, clamp, serif, useAccent, withAlpha} from './kit';
import {Chip, GAP, STREAM, chipW} from './Prediction';
import ALIGN from './voix/prediction.align.json';
import SCRIPT from './voix/prediction.script.json';
import {makeChunks} from './voix/chunks.mjs';

loadSerif('normal', {weights: ['600'], subsets: ['latin', 'latin-ext']});

const FOND = '#7CFFB2';
const FPS = 30;
const TAIL = 2; // secondes d'image finale après le dernier mot
const LABEL = '#cfcfcf'; // libellés secondaires : jamais plus sombre, pour rester lisibles sur un téléphone

type Word = {w: string; start: number; end: number};
type Seg = {scene: string; start: number; end: number; words: Word[]};
const SEGS = ALIGN.segments as Seg[];

// Bornes des scènes en images : chaque scène commence avec son premier mot (la première à 0).
const FROM = SEGS.map((s, i) => (i === 0 ? 0 : Math.round(s.start * FPS)));
export const PREDICTIONVOIX_DURATION = Math.round((ALIGN.duration + TAIL) * FPS);
const LEN = FROM.map((f, i) => (i + 1 < FROM.length ? FROM[i + 1] : PREDICTIONVOIX_DURATION) - f);

// Image (locale à la scène) où la voix dit le n-ième mot qui contient `m`.
const at = (scene: string, m: string, nth = 0) => {
  const i = SEGS.findIndex((s) => s.scene === scene);
  const hits = SEGS[i].words.filter((w) => w.w.toLowerCase().includes(m.toLowerCase()));
  const w = hits[Math.min(nth, hits.length - 1)];
  if (!w) throw new Error(`mot « ${m} » absent de la scène ${scene}`);
  return Math.round(w.start * FPS) - FROM[i];
};

const blink = (frame: number) => (frame % 20 < 12 ? 1 : 0.35);

// ---------- Sous-titres : la phrase dite, par groupes de 2 lignes au plus, le mot en cours en couleur ----------

type Chunk = {words: Word[]; from: number; to: number; quote: boolean};
const CHUNKS = makeChunks(SEGS, ALIGN.duration + TAIL, SCRIPT.quoted, SCRIPT.nocaption) as Chunk[];

const Captions: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const accent = useAccent();
  const c = CHUNKS.find((x) => frame >= x.from && frame < x.to);
  if (!c || c.quote) return null;
  const p = spring({frame: frame - c.from, fps, config: {damping: 16, stiffness: 260, mass: 0.5}});
  const t = frame / FPS;
  const cur = c.words.reduce((k, w, i) => (t >= w.start - 0.04 ? i : k), -1);
  return (
    <div style={{position: 'absolute', left: PAD, right: PAD, bottom: 1920 - ZONE.center.top + 10, transform: `translateY(${(1 - p) * 30}px)`, opacity: p}}>
      <div style={{fontFamily: serif, fontWeight: 600, fontSize: 84, lineHeight: 1.1, letterSpacing: '-0.01em'}}>
        {c.words.map((w, k) => (
          <span key={k} style={{color: k === cur ? accent : k < cur ? '#fff' : '#a8a8a8'}}>
            {w.w}
            {k < c.words.length - 1 ? ' ' : ''}
          </span>
        ))}
      </div>
    </div>
  );
};

// ---------- 0. Hook : la question du terme, en grand, dès la première image ----------

const Hook: React.FC = () => {
  const accent = useAccent();
  const hookWords = SEGS[0].words;
  const q = hookWords.length ? at('hook', 'prédiction') : 5;
  return (
    <Scene>
      <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
        <Pop at={0}><Say size={100}>C'est quoi ?</Say></Pop>
        <Pop at={q}><Big size={124} color={accent}>la prédiction</Big></Pop>
        <Pop at={q + 4}><Big size={124} color={accent}>du token</Big></Pop>
        <Pop at={q + 8}><Big size={124} color={accent}>suivant</Big></Pop>
      </div>
    </Scene>
  );
};

// ---------- 1. Intro : la réponse de ChatGPT commence, la fin n'existe pas encore ----------

const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const fin = at('intro', 'finir');
  const words = ['Il', 'était', 'une'];
  const t0 = at('intro', 'ChatGPT');
  return (
    <Scene>
      <Pop at={t0}><Mono size={52} color={LABEL}>ChatGPT</Mono></Pop>
      <div style={{display: 'flex', flexWrap: 'wrap', gap: GAP, marginTop: 10}}>
        {words.map((w, k) => (
          <Pop key={k} at={t0 + 10 + k * 8}>
            <Chip t={w} size={60} on={interpolate(frame, [t0 + 10 + k * 8, t0 + 30 + k * 8], [1, 0], clamp)} />
          </Pop>
        ))}
        {[0, 1].map((k) => (
          <Pop key={`g${k}`} at={t0 + 40 + k * 6} style={{opacity: blink(frame + k * 7)}}>
            <Chip t=" ? " size={60} ghost />
          </Pop>
        ))}
      </div>
      <Pop at={fin - 4} style={{display: 'flex', justifyContent: 'center', marginTop: 30}}>
        <div style={{width: 200, height: 160, border: `8px dashed ${accent}`, borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: blink(frame)}}>
          <Big size={130} color={accent}>?</Big>
        </div>
      </Pop>
    </Scene>
  );
};

// ---------- 2. Token : le texte découpé en morceaux numérotés (o200k_base, vérifié avec tiktoken) ----------

const SENT = [
  {t: 'Il', id: 8438},
  {t: 'était', id: 16647},
  {t: 'une', id: 2463},
  {t: 'fois', id: 14697},
];
const LONG = [
  {t: 'ant', id: 493},
  {t: 'icon', id: 3679},
  {t: 'stitution', id: 20066},
  {t: 'nel', id: 10085},
  {t: 'lement', id: 1254},
];

const TokenChip: React.FC<{t: string; id: number; at: number}> = ({t, id, at: a}) => {
  const frame = useCurrentFrame();
  return (
    <Pop at={a} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10}}>
      <Chip t={t} size={60} on={interpolate(frame, [a, a + 24], [1, 0.25], clamp)} />
      <Mono size={48} color={LABEL}>{String(id)}</Mono>
    </Pop>
  );
};

const Token: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const cut = at('token', 'découpe');
  const meme = at('token', 'Même');
  const cinq = at('token', 'cinq');
  const split = at('token', 'devient');
  return (
    <Scene
      bottom={
        <Pop at={cinq} style={{display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap: 18}}>
          <Mono size={96} color={accent}>5</Mono>
          <Mono size={56} color="#fff">tokens</Mono>
        </Pop>
      }
    >
      {frame < cut ? (
        <Pop at={4} style={{display: 'flex', justifyContent: 'center'}}>
          <div style={{border: '4px solid #777', borderRadius: 12, padding: '14px 22px'}}>
            <Mono size={60} color="#fff">Il était une fois</Mono>
          </div>
        </Pop>
      ) : frame < meme ? (
        <div style={{display: 'flex', gap: 18, justifyContent: 'center'}}>
          {SENT.map((s, k) => <TokenChip key={k} t={s.t} id={s.id} at={cut + k * 7} />)}
        </div>
      ) : frame < split ? (
        <Pop at={meme} style={{display: 'flex', justifyContent: 'center'}}>
          <div style={{border: '4px solid #777', borderRadius: 12, padding: '14px 18px'}}>
            <Mono size={52} color="#fff">anticonstitutionnellement</Mono>
          </div>
        </Pop>
      ) : (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30}}>
          <div style={{display: 'flex', gap: 16}}>{LONG.slice(0, 3).map((s, k) => <TokenChip key={k} t={s.t} id={s.id} at={split + k * 5} />)}</div>
          <div style={{display: 'flex', gap: 16}}>{LONG.slice(3).map((s, k) => <TokenChip key={k} t={s.t} id={s.id} at={split + (k + 3) * 5} />)}</div>
        </div>
      )}
    </Scene>
  );
};

// ---------- 3. Le nom : deviner le token suivant ----------

const Nom: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const name = at('nom', 'prédiction');
  const en = at('nom', 'next');
  return (
    <Scene>
      {frame < name ? (
        <Pop at={4} style={{display: 'flex', gap: GAP, justifyContent: 'center'}}>
          {['Il', 'était', 'une'].map((t) => <Chip key={t} t={t} size={60} />)}
          <div style={{opacity: blink(frame), filter: `drop-shadow(0 0 18px ${withAlpha(accent, 0.7)})`}}><Chip t=" ? " size={60} ghost /></div>
        </Pop>
      ) : (
        <div style={{display: 'flex', flexDirection: 'column', gap: 4}}>
          <Pop at={name}><Big size={124} color={accent}>prédiction</Big></Pop>
          <Pop at={name + 5}><Big size={124} color={accent}>du token</Big></Pop>
          <Pop at={name + 10}><Big size={124} color={accent}>suivant</Big></Pop>
          <Pop at={en} style={{marginTop: 30}}><Mono size={52} color="#fff">next token prediction</Mono></Pop>
        </div>
      )}
    </Scene>
  );
};

// ---------- 4. Le témoin : la phrase se construit mot à mot, la salle se penche ----------

const SPEECH = [
  {t: 'Julien,', m: 'Julien'},
  {t: 'je', m: 'je'},
  {t: "l'ai", m: "l'ai"},
  {t: 'connu…', m: 'connu'},
];

const Card: React.FC = () => (
  <div style={{width: 170, height: 112, background: '#efe9dc', borderRadius: 8, padding: '16px 18px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 12}}>
    {[90, 70, 50].map((w) => <div key={w} style={{height: 8, width: `${w}%`, background: '#9a9384', borderRadius: 4}} />)}
  </div>
);

const Temoin: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const accent = useAccent();
  const fiches = at('temoin', 'fiches');
  const times = SPEECH.map((s) => at('temoin', s.m));
  const salle = at('temoin', 'salle');
  const ajoute = at('temoin', 'ajoute');
  const last = [...times].reverse().find((x) => frame >= x) ?? -99;
  const lean = spring({frame: frame - last, fps, config: {damping: 9, stiffness: 180}});
  const talking = frame >= times[0];
  return (
    <Scene>
      <div style={{position: 'relative', minHeight: 190}}>
        {/* Avant le discours : les fiches s'envolent quand la voix dit « fiches ». */}
        {frame < times[0]
          ? [0, 1, 2, 3].map((k) => {
              const t = interpolate(frame, [fiches + k * 2, fiches + k * 2 + 22], [0, 1], {...clamp, easing: (x) => x * x});
              const d = [[-420, -600, -70], [380, -560, 55], [-200, -800, 120], [260, -760, -95]][k];
              return (
                <Pop key={k} at={4 + k * 3} style={{position: 'absolute', left: 340 + k * 10, top: 20 - k * 6, opacity: 1 - t, transform: `translate(${d[0] * t}px, ${d[1] * t}px) rotate(${-6 + k * 4 + d[2] * t}deg)`}}>
                  <Card />
                </Pop>
              );
            })
          : null}
        <div style={{display: 'flex', flexWrap: 'wrap', gap: GAP, alignContent: 'flex-start'}}>
          {SPEECH.map((s, k) => (
            <Pop key={k} at={times[k]}>
              <Chip t={s.t} size={60} on={interpolate(frame, [times[k], times[k] + 20], [1, 0], clamp)} />
            </Pop>
          ))}
          {frame >= ajoute ? <div style={{opacity: blink(frame)}}><Chip t=" ? " size={60} ghost /></div> : null}
        </div>
      </div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: 260, marginTop: 40}}>
        {Array.from({length: 7}, (_, k) => {
          const on = interpolate(frame, [salle + k * 2, salle + k * 2 + 8], [0, 1], clamp);
          const tilt = talking ? (k - 3) * -4 * (1 - lean) : 0;
          return (
            <div key={k} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `rotate(${tilt}deg) translateY(${talking ? -14 * (1 - lean) : 0}px)`, transformOrigin: 'bottom center'}}>
              <div style={{width: 70, height: 70, borderRadius: 35, background: on > 0.5 ? accent : '#5a5a5a'}} />
              <div style={{width: 104, height: 110, borderRadius: '52px 52px 0 0', background: withAlpha(on > 0.5 ? FOND : '#ffffff', on > 0.5 ? 0.35 : 0.14), marginTop: 10}} />
            </div>
          );
        })}
      </div>
    </Scene>
  );
};

// ---------- 5. Le calcul : une probabilité pour chaque token du vocabulaire ----------

const CANDS = [
  {t: 'fois', p: 91},
  {t: 'autre', p: 3},
  {t: 'belle', p: 2},
  {t: 'seule', p: 1},
];

const Calcul: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const apres = at('calcul', 'Après');
  const proba = at('calcul', 'probabilité');
  const vocab = at('calcul', '200');
  const fois = at('calcul', 'fois');
  const win = interpolate(frame, [fois, fois + 8], [0, 1], clamp);
  const LBL = 220;
  const BAR = W - LBL - 150;
  return (
    <Scene
      bottom={
        <Pop at={vocab} style={{display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 18}}>
          <Mono size={84} color="#fff">200 000</Mono>
          <Mono size={52} color={LABEL}>tokens</Mono>
        </Pop>
      }
    >
      <Pop at={apres} style={{display: 'flex', gap: GAP, marginBottom: 20}}>
        {['Il', 'était', 'une'].map((t) => <Chip key={t} t={t} size={56} />)}
        {win > 0.5 ? <Chip t="fois" size={56} on={1} /> : <div style={{opacity: blink(frame)}}><Chip t=" ? " size={56} ghost /></div>}
      </Pop>
      {CANDS.map((c, k) => {
        const a = proba + 4 + k * 5;
        const grow = interpolate(frame, [a, a + 12], [0, 1], {...clamp, easing: (t) => 1 - (1 - t) ** 3});
        const first = k === 0;
        const w = Math.max(12, (BAR * c.p) / 100) * grow;
        return (
          <div key={c.t} style={{display: 'flex', alignItems: 'center', height: 80, opacity: frame >= a ? (first ? 1 : 1 - 0.5 * win) : 0}}>
            <div style={{width: LBL}}><Mono size={52} color={first && win > 0 ? accent : '#fff'}>{c.t}</Mono></div>
            <div style={{width: w, height: 50, background: first ? accent : '#888', borderRadius: 6, boxShadow: first ? `0 0 ${30 * win}px ${withAlpha(accent, 0.8)}` : 'none'}} />
            <div style={{marginLeft: 18}}><Mono size={48} color={first ? accent : LABEL}>{`${Math.round(c.p * grow)} %`}</Mono></div>
          </div>
        );
      })}
      <Pop at={proba + 30} style={{display: 'flex', justifyContent: 'flex-end'}}>
        <Mono size={48} color={LABEL}>chiffres illustratifs</Mono>
      </Pop>
    </Scene>
  );
};

// ---------- 6. La boucle : un passage par token, calé sur « ajoute », « encore un », « encore un » ----------

const BASE = ['Il', 'était', 'une'];
const ADDED = ['fois', 'un', 'petit'];
const SZ = 48;
const STRIP_Y = 10;
const STRIP_H = 86;
const LLM = {x: 420, y: 300, w: 400, h: 160};
const xAfter = (n: number) => [...BASE, ...ADDED].slice(0, n).reduce((s, t) => s + chipW(t, SZ) + GAP, 0);

const Boucle: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const accent = useAccent();
  const starts = [Math.max(4, at('boucle', 'ajoute') - 6), at('boucle', 'encore', 0) - 10, at('boucle', 'encore', 1) - 10];
  const k = starts.reduce((acc, s, i) => (frame >= s ? i : acc), -1);
  const LOOP = Math.min(56, (k + 1 < starts.length ? starts[k + 1] : durationInFrames) - (starts[k] ?? 0) - 2);
  const local = k >= 0 ? frame - starts[k] : -1;
  const s = LOOP / 52;
  const active = k >= 0 && local < LOOP;
  const added = k < 0 ? 0 : k + (local >= 40 * s ? 1 : 0);
  const strip = [...BASE, ...ADDED.slice(0, added)];
  const read = active ? interpolate(local, [0, 4 * s, 12 * s, 16 * s], [0, 1, 1, 0], clamp) : 0;
  const down = active ? interpolate(local, [2 * s, 14 * s], [0, 1], clamp) : -1;
  const think = active ? interpolate(local, [12 * s, 16 * s, 22 * s, 26 * s], [0, 1, 1, 0], clamp) : 0;
  const fly = active ? interpolate(local, [24 * s, 40 * s], [0, 1], {...clamp, easing: (t) => t * t * (3 - 2 * t)}) : -1;
  const ox = LLM.x + LLM.w;
  const oy = LLM.y + LLM.h / 2;
  const tx = k >= 0 ? xAfter(BASE.length + k) + chipW(ADDED[k], SZ) / 2 : 0;
  const ty = STRIP_Y + STRIP_H + 20;
  const c1 = [Math.min(W, ox + 60), oy - 40];
  const c2 = [Math.max(tx, ox - 40), ty + 140];
  const bez = (t: number) => {
    const p = [[ox, oy], c1, c2, [tx, ty]];
    const u = 1 - t;
    return [0, 1].map((i) => u ** 3 * p[0][i] + 3 * u * u * t * p[1][i] + 3 * u * t * t * p[2][i] + t ** 3 * p[3][i]);
  };
  const [fx, fy] = fly >= 0 ? bez(fly) : [0, 0];
  const ax = LLM.x + 70;
  return (
    <Scene
      bottom={
        <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between'}}>
          <Mono size={52}>autorégressif</Mono>
          <div style={{display: 'flex', alignItems: 'baseline', gap: 16}}>
            <Mono size={48} color={LABEL}>passage</Mono>
            <Mono size={80} color="#fff">{k + 1}</Mono>
          </div>
        </div>
      }
    >
      <div style={{position: 'relative', width: W, height: 600}}>
        <svg width={W} height={600} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
          <path d={`M ${ax} ${STRIP_Y + STRIP_H + 14} L ${ax} ${LLM.y - 14}`} stroke="#777" strokeWidth={7} fill="none" />
          <path d={`M ${ax - 18} ${LLM.y - 36} L ${ax} ${LLM.y - 12} L ${ax + 18} ${LLM.y - 36}`} stroke="#777" strokeWidth={7} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          {active ? <path d={`M ${ox} ${oy} C ${c1[0]} ${c1[1]}, ${c2[0]} ${c2[1]}, ${tx} ${ty + 6}`} stroke={withAlpha(FOND, 0.5)} strokeWidth={7} fill="none" strokeDasharray="14 12" /> : null}
          {down >= 0 ? <circle cx={ax} cy={STRIP_Y + STRIP_H + 14 + down * (LLM.y - STRIP_Y - STRIP_H - 40)} r={18} fill={accent} opacity={down < 1 ? 1 : 0} /> : null}
        </svg>
        <div style={{position: 'absolute', left: 0, top: STRIP_Y, display: 'flex', gap: GAP}}>
          {strip.map((t, i) => <div key={i}><Chip t={t} size={SZ} on={read} /></div>)}
        </div>
        {active && local < 40 * s ? (
          <div style={{position: 'absolute', left: xAfter(BASE.length + k), top: STRIP_Y, opacity: blink(frame)}}>
            <Chip t={' '.repeat(ADDED[k].length)} size={SZ} ghost />
          </div>
        ) : null}
        <div style={{position: 'absolute', left: 0, top: STRIP_Y + STRIP_H + 70}}>
          <Mono size={48} color={LABEL}>tout le texte</Mono>
        </div>
        <div style={{position: 'absolute', left: LLM.x, top: LLM.y, width: LLM.w, height: LLM.h, border: `6px solid ${accent}`, borderRadius: 26, background: withAlpha(accent, 0.08 + 0.22 * think), display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 26}}>
          <Big size={96} color={accent}>LLM</Big>
          <div style={{display: 'flex', alignItems: 'flex-end', gap: 8, height: 70, opacity: think}}>
            {[0, 1, 2, 3, 4].map((b) => <div key={b} style={{width: 14, height: 14 + 50 * Math.abs(Math.sin(frame / 2 + b * 1.7)) * (b === 0 ? 1 : 0.4), background: b === 0 ? accent : '#888', borderRadius: 3}} />)}
          </div>
        </div>
        <div style={{position: 'absolute', left: LLM.x, top: LLM.y + LLM.h + 24}}>
          <Mono size={48} color={LABEL}>token choisi</Mono>
        </div>
        {fly >= 0 && fly < 1 && local >= 24 * s ? (
          <div style={{position: 'absolute', left: fx - chipW(ADDED[k], SZ) / 2, top: fy - STRIP_H / 2, transform: `scale(${1 + 0.2 * Math.sin(Math.PI * fly)})`}}>
            <Chip t={ADDED[k]} size={SZ} on={1} />
          </div>
        ) : null}
      </div>
    </Scene>
  );
};

// ---------- 7. Et donc : l'affichage mot à mot, puis la facture qui suit la longueur ----------

const Ticket: React.FC<{label: string; n: number; from: number; rate: number; maxLines: number}> = ({label, n, from, rate, maxLines}) => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const count = Math.max(0, Math.min(n, Math.floor((frame - from) * rate)));
  const LINE = 58;
  const lines = Math.min(maxLines, count);
  return (
    <div style={{width: 420, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14}}>
      <Mono size={48} color={LABEL}>{label}</Mono>
      <div style={{width: 400, height: lines * LINE + 20, background: '#e9e6df', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '10px 20px', boxSizing: 'border-box'}}>
        {Array.from({length: lines}, (_, i) => count - lines + i + 1).map((p) => (
          <div key={p} style={{height: LINE, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <Mono size={48} color="#222">calcul</Mono>
            <Mono size={48} color="#222">{p}</Mono>
          </div>
        ))}
      </div>
      <div style={{display: 'flex', alignItems: 'baseline', gap: 12, opacity: count > 0 ? 1 : 0}}>
        <Mono size={72} color={count >= n ? accent : '#fff'}>{count}</Mono>
        <Mono size={48} color={LABEL}>tokens</Mono>
      </div>
    </div>
  );
};

const EtDonc: React.FC = () => {
  const frame = useCurrentFrame();
  const p1 = 4;
  const p2 = at('etdonc', 'Et');
  const step = Math.max(4, Math.floor((p2 - p1 - 10) / STREAM.length));
  const shown = Math.max(0, Math.min(STREAM.length, Math.floor((frame - p1) / step) + 1));
  return (
    <Scene>
      {frame < p2 ? (
        <div style={{display: 'flex', flexWrap: 'wrap', gap: GAP, alignContent: 'flex-start'}}>
          {STREAM.slice(0, shown).map((t, k) => (
            <Pop key={k} at={p1 + k * step}>
              <Chip t={t} size={60} on={interpolate(frame, [p1 + k * step, p1 + (k + 1) * step + 6], [1, 0], clamp)} />
            </Pop>
          ))}
        </div>
      ) : (
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', height: 620}}>
          <Ticket label="courte" n={30} from={p2 + 8} rate={0.5} maxLines={3} />
          <Ticket label="longue" n={600} from={p2 + 8} rate={5} maxLines={7} />
        </div>
      )}
    </Scene>
  );
};

// ---------- 8. Chute : la suite n'existe pas encore ----------

const NEXT = [
  {t: 'dragon', p: 0.95},
  {t: 'garçon', p: 0.8},
  {t: 'prince', p: 0.65},
  {t: 'roi', p: 0.55},
  {t: 'chat', p: 0.45},
];

const Chute: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const fin = at('chute', 'fin');
  const line = [...BASE, ...ADDED];
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 600}}>
        <Pop at={2} style={{position: 'absolute', left: 0, top: 10, display: 'flex', gap: GAP}}>
          {line.map((t, i) => <Chip key={i} t={t} size={SZ} />)}
        </Pop>
        <Pop at={fin - 6} style={{position: 'absolute', left: (W - 220) / 2, top: 140}}>
          <div style={{width: 220, height: 140, border: `7px dashed ${accent}`, borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: blink(frame)}}>
            <Big size={120} color={accent}>?</Big>
          </div>
        </Pop>
        <svg width={W} height={600} style={{position: 'absolute', left: 0, top: 0}}>
          {NEXT.map((c, k) => {
            const p = interpolate(frame, [fin + 4 * k, fin + 4 * k + 8], [0, 1], clamp);
            const x2 = 90 + k * ((W - 180) / (NEXT.length - 1));
            return <line key={c.t} x1={W / 2} y1={286} x2={W / 2 + (x2 - W / 2) * p} y2={286 + 180 * p} stroke={withAlpha(accent, 0.6 * c.p)} strokeWidth={6} />;
          })}
        </svg>
        {NEXT.map((c, k) => {
          const x2 = 90 + k * ((W - 180) / (NEXT.length - 1));
          return (
            <Pop key={c.t} at={fin + 4 * k + 6} style={{position: 'absolute', left: x2 - 110, top: 476 + (k % 2) * 66, width: 220, display: 'flex', justifyContent: 'center', opacity: c.p}}>
              <Mono size={52} color="#fff">{c.t}</Mono>
            </Pop>
          );
        })}
      </div>
    </Scene>
  );
};

// ---------- Montage ----------

const COMPS: Record<string, React.FC> = {hook: Hook, intro: Intro, token: Token, nom: Nom, temoin: Temoin, calcul: Calcul, boucle: Boucle, etdonc: EtDonc, chute: Chute};

export const PredictionVoix: React.FC = () => {
  const total = PREDICTIONVOIX_DURATION;
  const fadeOut = (f: number) => interpolate(f, [total - 30, total], [1, 0], clamp);
  return (
    <AccentProvider accent={FOND}>
      <AbsoluteFill style={{background: '#000'}}>
        {ALIGN.audio ? <Audio src={staticFile('voix/prediction.mp3')} /> : null}
        {/* Musique sous la voix : la piste ElevenLabs si elle existe, sinon le beat commun des shorts. */}
        <Audio loop src={staticFile(ALIGN.music ? 'voix/prediction-music.mp3' : 'beat.mp3')} volume={(f) => (ALIGN.audio ? 0.16 : 0.6) * fadeOut(f)} />
        <Oscillo />
        {SEGS.map((s, i) => (
          <Sequence key={s.scene} from={FROM[i]} durationInFrames={LEN[i]}>
            <LastContext.Provider value={i === SEGS.length - 1}>
              {React.createElement(COMPS[s.scene])}
            </LastContext.Provider>
          </Sequence>
        ))}
        <Captions />
        <Chrome />
      </AbsoluteFill>
    </AccentProvider>
  );
};

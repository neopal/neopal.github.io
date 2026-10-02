// Short Prédiction du mot suivant : un token à la fois, et chaque token relance tout le calcul (catégorie Fondations, accent vert).
// Scène propre à ce short : la boucle autorégressive, où le token choisi remonte se coller au texte qui redescend dans le modèle.
// Découpages vérifiés avec tiktoken (o200k_base) : « Il était une fois un petit dragon qui viv|ait seul », candidats d'un seul token.
import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {BEAT, Big, Bubble, DIM, GREY, Mono, Pop, Say, Scene, Scenes, Short, W, clamp, totalDuration, useAccent, usePop, useProg, withAlpha} from './kit';

const FOND = '#7CFFB2';

// ---------- Briques locales ----------

// Plex Mono : chasse fixe de 0,6 em, ce qui permet de calculer où tombe chaque token.
const CH = 0.6;
const PADX = 12;
const BORDER = 4;
const GAP = 12;
const chipW = (t: string, size: number) => t.length * CH * size + 2 * PADX + 2 * BORDER;

const Chip: React.FC<{t: string; size?: number; on?: number; ghost?: boolean; color?: string}> = ({t, size = 44, on = 0, ghost = false, color}) => {
  const accent = useAccent();
  return (
    <div
      style={{
        border: `${BORDER}px ${ghost ? 'dashed' : 'solid'} ${on > 0.02 ? accent : '#555'}`,
        background: withAlpha(accent, 0.22 * on),
        borderRadius: 10,
        padding: `8px ${PADX}px`,
        boxSizing: 'border-box',
        width: chipW(t, size),
      }}
    >
      <Mono size={size} color={color ?? (on > 0.5 ? accent : '#fff')}>{t}</Mono>
    </div>
  );
};

// ---------- 1. Réponse : la réponse s'affiche token par token ----------

const STREAM = ['Il', 'était', 'une', 'fois', 'un', 'petit', 'dragon', 'qui', 'viv', 'ait', 'seul'];

const Reponse: React.FC = () => {
  const frame = useCurrentFrame();
  const start = BEAT * 2;
  const shown = Math.max(0, Math.min(STREAM.length, Math.floor((frame - start) / BEAT) + 1));
  return (
    <Scene
      caps={[[0, "Un LLM écrit sa réponse un token à la fois, dans l'ordre où tu la lis."]]}
      bottom={
        <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', opacity: frame >= start ? 1 : 0}}>
          <Mono size={44}>streaming</Mono>
          <div style={{display: 'flex', alignItems: 'baseline', gap: 16}}>
            <Mono size={72} color="#fff">{shown}</Mono>
            <Mono size={40} color={GREY}>tokens</Mono>
          </div>
        </div>
      }
    >
      <Bubble side="right" at={BEAT * 0.6}><Say size={52}>Raconte-moi une histoire.</Say></Bubble>
      <div style={{display: 'flex', flexWrap: 'wrap', gap: GAP, minHeight: 220, alignContent: 'flex-start'}}>
        {STREAM.slice(0, shown).map((t, k) => {
          const at = start + k * BEAT;
          const fresh = interpolate(frame, [at, at + BEAT], [1, 0], clamp);
          return (
            <Pop key={k} at={at}>
              <Chip t={t} size={52} on={fresh} />
            </Pop>
          );
        })}
      </div>
    </Scene>
  );
};

// ---------- 2. Anecdote : le brouillon d'o1 sort lui aussi mot à mot ----------

const DRAFT = ['17 × 24', "c'est", '17 × 20', 'plus', '17 × 4,', 'donc', '340', '+', '68.'];

const Anecdote: React.FC = () => {
  const frame = useCurrentFrame();
  const start = BEAT * 2.4;
  const step = 11;
  const shown = Math.max(0, Math.min(DRAFT.length, Math.floor((frame - start) / step) + 1));
  const answerAt = start + DRAFT.length * step + BEAT * 0.6;
  const accent = useAccent();
  return (
    <Scene
      caps={[[0, 'Depuis o1, les modèles de raisonnement prédisent un brouillon avant la réponse.']]}
      gap={34}
      bottom={
        <Pop at={BEAT * 0.6} style={{display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 28}}>
          <Mono size={88}>o1</Mono>
          <Mono size={44} color={GREY}>12 sept. 2024</Mono>
        </Pop>
      }
    >
      <Bubble side="right" at={BEAT * 1.2}><Say size={52}>Combien font 17 × 24 ?</Say></Bubble>
      <Pop at={BEAT * 2} style={{border: '4px dashed #555', borderRadius: 24, padding: '18px 26px', minHeight: 200}}>
        <Mono size={38} color={DIM}>thinking tokens</Mono>
        <div style={{display: 'flex', flexWrap: 'wrap', columnGap: 18, rowGap: 6, marginTop: 10}}>
          {DRAFT.slice(0, shown).map((t, k) => (
            <Pop key={k} at={start + k * step}>
              <span style={{fontFamily: 'inherit'}}>
                <Mono size={46} color={GREY}>{t}</Mono>
              </span>
            </Pop>
          ))}
        </div>
      </Pop>
      <div style={{display: 'flex', alignItems: 'center', gap: 24, height: 110}}>
        <Pop at={answerAt} style={{border: `5px solid ${accent}`, borderRadius: 24, padding: '8px 34px'}}>
          <Mono size={80}>408</Mono>
        </Pop>
        <Pop at={answerAt + 4}><Mono size={40} color={DIM}>réponse</Mono></Pop>
      </div>
    </Scene>
  );
};

// ---------- 3. Mécanisme : une probabilité pour chaque token du vocabulaire ----------

const CANDS = [
  {t: 'fois', p: 91},
  {t: 'autre', p: 3},
  {t: 'belle', p: 2},
  {t: 'seule', p: 1},
  {t: 'petite', p: 1},
];

const Probas: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const win = useProg(BEAT * 6, BEAT * 6 + 8);
  const LABEL = 230;
  const BAR = W - LABEL - 140;
  return (
    <Scene
      caps={[[0, 'À chaque pas, il calcule une probabilité pour chaque token de son vocabulaire.']]}
      gap={22}
      bottom={
        <Pop at={BEAT * 4} style={{display: 'flex', justifyContent: 'flex-end'}}>
          <Mono size={38} color={DIM}>probabilités illustratives</Mono>
        </Pop>
      }
    >
      <Pop at={BEAT * 0.6} style={{display: 'flex', gap: GAP, marginBottom: 24}}>
        {['Il', 'était', 'une'].map((t) => <Chip key={t} t={t} />)}
        <div style={{opacity: frame % 20 < 12 ? 1 : 0.3}}><Chip t=" ? " ghost /></div>
      </Pop>
      {CANDS.map((c, k) => {
        const at = BEAT * (1.6 + 0.5 * k);
        const grow = interpolate(frame, [at, at + 12], [0, 1], {...clamp, easing: (t) => 1 - (1 - t) ** 3});
        const first = k === 0;
        const w = Math.max(10, (BAR * c.p) / 100) * grow;
        return (
          <div key={c.t} style={{display: 'flex', alignItems: 'center', height: 72, opacity: frame >= at ? (first ? 1 : 1 - 0.5 * win) : 0}}>
            <div style={{width: LABEL}}><Mono size={44} color={first && win > 0 ? accent : '#fff'}>{c.t}</Mono></div>
            <div style={{width: w, height: 46, background: first ? accent : '#777', borderRadius: 6, boxShadow: first ? `0 0 ${30 * win}px ${withAlpha(accent, 0.8)}` : 'none'}} />
            <div style={{marginLeft: 18}}><Mono size={40} color={first ? accent : GREY}>{`${Math.round(c.p * grow)} %`}</Mono></div>
          </div>
        );
      })}
      <Pop at={BEAT * 4.2} style={{display: 'flex', alignItems: 'center', height: 60}}>
        <Mono size={38} color={DIM}>… et des milliers d'autres tokens</Mono>
      </Pop>
    </Scene>
  );
};

// ---------- 4. La boucle : le token choisi remonte, tout le texte redescend ----------

const BASE = ['Il', 'était', 'une'];
const ADDED = ['fois', 'un', 'petit'];
const LOOP0 = BEAT; // début du premier passage
const LOOP = 52; // durée d'un passage
const SZ = 44;
// Repères du schéma (coordonnées dans la zone centrale, 888 × 600).
const STRIP_Y = 20;
const STRIP_H = 82;
const LLM = {x: 254, y: 290, w: 380, h: 150};
const xAfter = (n: number) => [...BASE, ...ADDED].slice(0, n).reduce((s, t) => s + chipW(t, SZ) + GAP, 0);

const Boucle: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const k = Math.floor((frame - LOOP0) / LOOP); // passage en cours (0, 1, 2)
  const local = frame - LOOP0 - k * LOOP;
  const active = k >= 0 && k < ADDED.length;
  const added = Math.max(0, Math.min(ADDED.length, frame < LOOP0 ? 0 : k + (local >= 40 ? 1 : 0)));
  const strip = [...BASE, ...ADDED.slice(0, added)];
  // Phases d'un passage : 0-12 le texte s'allume et descend, 12-24 calcul, 24-40 le token remonte.
  const read = active ? interpolate(local, [0, 4, 12, 16], [0, 1, 1, 0], clamp) : 0;
  const down = active ? interpolate(local, [2, 14], [0, 1], clamp) : -1;
  const think = active ? interpolate(local, [12, 16, 22, 26], [0, 1, 1, 0], clamp) : 0;
  const fly = active ? interpolate(local, [24, 40], [0, 1], {...clamp, easing: (t) => t * t * (3 - 2 * t)}) : -1;
  const passes = frame < LOOP0 ? 0 : Math.min(ADDED.length, k + 1);
  // Trajet de retour : de la sortie droite du LLM jusqu'au bout du texte.
  const ox = LLM.x + LLM.w;
  const oy = LLM.y + LLM.h / 2;
  const tx = active ? xAfter(BASE.length + k) + chipW(ADDED[k], SZ) / 2 : 0;
  const ty = STRIP_Y + STRIP_H + 20;
  const bez = (t: number) => {
    const p0 = [ox, oy], p1 = [ox + 230, oy], p2 = [Math.max(tx, ox + 120), ty + 120], p3 = [tx, ty];
    const u = 1 - t;
    return [0, 1].map((i) => u ** 3 * p0[i] + 3 * u * u * t * p1[i] + 3 * u * t * t * p2[i] + t ** 3 * p3[i]);
  };
  const [fx, fy] = fly >= 0 ? bez(fly) : [0, 0];
  const show = useProg(BEAT * 0.4, BEAT * 0.8);
  return (
    <Scene
      caps={[[0, "Il retient un token probable, l'ajoute au texte et relance tout le calcul."]]}
      bottom={
        <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', opacity: show}}>
          <Mono size={44}>autorégressif</Mono>
          <div style={{display: 'flex', alignItems: 'baseline', gap: 16}}>
            <Mono size={40} color={GREY}>passage</Mono>
            <Mono size={72} color="#fff">{passes}</Mono>
          </div>
        </div>
      }
    >
      <div style={{position: 'relative', width: W, height: 600, opacity: show}}>
        {/* Flèches */}
        <svg width={W} height={600} style={{position: 'absolute', left: 0, top: 0}}>
          <path d={`M ${LLM.x + 60} ${STRIP_Y + STRIP_H + 14} L ${LLM.x + 60} ${LLM.y - 14}`} stroke="#666" strokeWidth={6} fill="none" />
          <path d={`M ${LLM.x + 44} ${LLM.y - 34} L ${LLM.x + 60} ${LLM.y - 12} L ${LLM.x + 76} ${LLM.y - 34}`} stroke="#666" strokeWidth={6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          {active ? <path d={`M ${ox} ${oy} C ${ox + 230} ${oy}, ${Math.max(tx, ox + 120)} ${ty + 120}, ${tx} ${ty + 6}`} stroke={withAlpha(FOND, 0.45)} strokeWidth={6} fill="none" strokeDasharray="14 12" /> : null}
          {down >= 0 ? <circle cx={LLM.x + 60} cy={STRIP_Y + STRIP_H + 14 + down * (LLM.y - STRIP_Y - STRIP_H - 40)} r={16} fill={accent} opacity={down < 1 ? 1 : 0} /> : null}
        </svg>
        {/* Texte déjà écrit */}
        <div style={{position: 'absolute', left: 0, top: STRIP_Y, display: 'flex', gap: GAP}}>
          {strip.map((t, i) => (
            <div key={i}>
              <Chip t={t} size={SZ} on={i >= BASE.length && active && i === BASE.length + k - 1 && local < 8 ? 1 : read} />
            </div>
          ))}
        </div>
        {active && local < 40 ? (
          <div style={{position: 'absolute', left: xAfter(BASE.length + k), top: STRIP_Y, opacity: frame % 20 < 12 ? 1 : 0.35}}>
            <Chip t={'\u00a0'.repeat(ADDED[k].length)} size={SZ} ghost />
          </div>
        ) : null}
        <div style={{position: 'absolute', left: LLM.x + 40 - 290, width: 270, top: STRIP_Y + STRIP_H + 60, display: 'flex', justifyContent: 'flex-end'}}>
          <Mono size={36} color={DIM}>tout le texte</Mono>
        </div>
        {/* Le modèle */}
        <div style={{position: 'absolute', left: LLM.x, top: LLM.y, width: LLM.w, height: LLM.h, border: `5px solid ${accent}`, borderRadius: 26, background: withAlpha(accent, 0.08 + 0.2 * think), display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 26}}>
          <Big size={84} color={accent}>LLM</Big>
          <div style={{display: 'flex', alignItems: 'flex-end', gap: 8, height: 70, opacity: think}}>
            {[0, 1, 2, 3, 4].map((b) => (
              <div key={b} style={{width: 14, height: 14 + 50 * Math.abs(Math.sin(frame / 2 + b * 1.7)) * (b === 0 ? 1 : 0.4), background: b === 0 ? accent : '#888', borderRadius: 3}} />
            ))}
          </div>
        </div>
        <div style={{position: 'absolute', left: ox - 140, top: LLM.y + LLM.h + 26}}>
          <Mono size={36} color={DIM}>token choisi</Mono>
        </div>
        {/* Le token qui remonte */}
        {fly >= 0 && fly < 1 && local >= 24 ? (
          <div style={{position: 'absolute', left: fx - chipW(ADDED[k], SZ) / 2, top: fy - STRIP_H / 2, transform: `scale(${1 + 0.15 * Math.sin(Math.PI * fly)})`}}>
            <Chip t={ADDED[k]} size={SZ} on={1} />
          </div>
        ) : null}
      </div>
    </Scene>
  );
};

// ---------- 5. Et donc : un passage par token, la facture suit la longueur ----------

const Ticket: React.FC<{label: string; n: number; from: number; rate: number; maxLines: number}> = ({label, n, from, rate, maxLines}) => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const count = Math.max(0, Math.min(n, Math.floor((frame - from) * rate)));
  const LINE = 50;
  const lines = Math.min(maxLines, count);
  const done = count >= n;
  return (
    <div style={{width: 400, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14}}>
      <Mono size={38} color={GREY}>{label}</Mono>
      <div style={{width: 400, height: 8, background: '#444', borderRadius: 4}} />
      <div style={{width: 360, height: lines * LINE + 20, background: '#e9e6df', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '10px 18px', boxSizing: 'border-box'}}>
        {Array.from({length: lines}, (_, i) => count - lines + i + 1).map((p) => (
          <div key={p} style={{height: LINE, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <Mono size={36} color="#222">passage</Mono>
            <Mono size={36} color="#222">{p}</Mono>
          </div>
        ))}
      </div>
      <div style={{display: 'flex', alignItems: 'baseline', gap: 12, marginTop: 6, opacity: count > 0 ? 1 : 0}}>
        <Mono size={64} color={done ? accent : '#fff'}>{count}</Mono>
        <Mono size={38} color={GREY}>tokens</Mono>
      </div>
    </div>
  );
};

const EtDonc: React.FC = () => {
  return (
  <Scene
    caps={[[0, 'Chaque token demande un passage complet, donc une longue réponse *coûte plus*.']]}
    bottom={
      <Pop at={BEAT * 9} style={{display: 'flex', justifyContent: 'center'}}>
        <Mono size={38} color={DIM}>longueurs illustratives</Mono>
      </Pop>
    }
  >
    <Pop at={BEAT * 0.6} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', height: 600}}>
      <Ticket label="réponse courte" n={40} from={BEAT * 1.4} rate={0.5} maxLines={3} />
      <Ticket label="réponse longue" n={400} from={BEAT * 1.4} rate={3} maxLines={8} />
    </Pop>
  </Scene>
  );
};

// ---------- 6. Chute : la suite n'existe pas encore ----------

const NEXT = [
  {t: 'dragon', p: 0.9},
  {t: 'garçon', p: 0.75},
  {t: 'prince', p: 0.6},
  {t: 'roi', p: 0.5},
  {t: 'chat', p: 0.4},
];

const Chute: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const line = [...BASE, ...ADDED];
  const blink = frame % 20 < 12 ? 1 : 0.35;
  return (
    <Scene caps={[[0, "Sa réponse n'est écrite nulle part à l'avance, et la fin n'existe *pas encore*."]]}>
      <div style={{position: 'relative', width: W, height: 600}}>
        <Pop at={BEAT * 0.6} style={{position: 'absolute', left: 0, top: 10, display: 'flex', gap: GAP}}>
          {line.map((t, i) => <Chip key={i} t={t} size={SZ} />)}
        </Pop>
        <Pop at={BEAT * 1.4} style={{position: 'absolute', left: (W - 220) / 2, top: 140}}>
          <div style={{width: 220, height: 130, border: `6px dashed ${accent}`, borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: blink}}>
            <Big size={110} color={accent}>?</Big>
          </div>
        </Pop>
        <svg width={W} height={600} style={{position: 'absolute', left: 0, top: 0}}>
          {NEXT.map((c, k) => {
            const p = prog(frame, BEAT * (2.4 + 0.6 * k), BEAT * (2.4 + 0.6 * k) + 8);
            const x2 = 90 + k * ((W - 180) / (NEXT.length - 1));
            return <line key={c.t} x1={W / 2} y1={276} x2={W / 2 + (x2 - W / 2) * p} y2={276 + 190 * p} stroke={withAlpha(accent, 0.5 * c.p)} strokeWidth={5} />;
          })}
        </svg>
        {NEXT.map((c, k) => {
          const at = BEAT * (2.4 + 0.6 * k) + 6;
          const x2 = 90 + k * ((W - 180) / (NEXT.length - 1));
          return (
            <Pop key={c.t} at={at} style={{position: 'absolute', left: x2 - 110, top: 480 + (k % 2) * 60, width: 220, display: 'flex', justifyContent: 'center', opacity: c.p}}>
              <Mono size={42} color={k === 0 ? accent : '#fff'}>{c.t}</Mono>
            </Pop>
          );
        })}
      </div>
    </Scene>
  );
};

const prog = (frame: number, from: number, to: number) => interpolate(frame, [from, to], [0, 1], clamp);

const SCENES: Scenes = [
  [Reponse, 200],
  [Anecdote, 215],
  [Probas, 210],
  [Boucle, 225],
  [EtDonc, 210],
  [Chute, 205],
];

export const PREDICTION_DURATION = totalDuration(SCENES);

export const Prediction: React.FC = () => <Short title={["Qu'est-ce que la", 'prédiction', 'du mot suivant ?']} scenes={SCENES} accent={FOND} />;

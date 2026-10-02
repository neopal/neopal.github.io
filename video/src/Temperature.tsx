// Short Température : le tirage du mot suivant, et le réglage qui en change la forme (catégorie Inférence, accent bleu).
// Scène propre à ce short : la roue du tirage, dont les parts se redessinent quand on pousse la température, et qui sort trois noms de bar.
import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {BEAT, Cross, DIM, GREY, Mono, Pop, RED, Say, Scene, Scenes, Short, W, clamp, mono, svgPx, totalDuration, useProg, withAlpha} from './kit';

const AC = '#8FB8FF';
const acA = (a: number) => withAlpha(AC, a);

// Nombre à la française.
const fr = (n: number, dec = 1) => n.toFixed(dec).replace('.', ',');

// ---------- Le tirage (exemple illustratif) ----------

// Cinq suites possibles après « Mon bar s'appellera « Le », avec des scores inventés mais plausibles.
const WORDS = ['Comptoir', 'Zinc', 'Refuge', 'Bistrot', 'Hibou'];
const SCORES = [2.0, 1.0, 0.6, 0.2, -0.3];

// Le vrai calcul : scores divisés par T, puis softmax.
const probs = (T: number) => {
  const e = SCORES.map((s) => Math.exp(s / T));
  const sum = e.reduce((a, b) => a + b, 0);
  return e.map((x) => x / sum);
};

const pct = (p: number) => `${Math.round(p * 100)} %`;

// Barres horizontales : un mot, sa barre, sa probabilité. lit : rangée éclairée par le tirage.
const Bars: React.FC<{ps: number[]; grow?: number[]; lit?: number}> = ({ps, grow = [1, 1, 1, 1, 1], lit = -1}) => {
  const LABEL = 220;
  const VAL = 130;
  const track = W - LABEL - VAL - 20;
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 22}}>
      {WORDS.map((w, i) => {
        const g = grow[i];
        const on = i === lit;
        return (
          <div key={w} style={{display: 'flex', alignItems: 'center', gap: 10, opacity: g > 0 ? 1 : 0}}>
            <div style={{width: LABEL}}>
              <Mono size={40} color={on ? AC : '#fff'}>{w}</Mono>
            </div>
            <div style={{width: track, height: 62, position: 'relative'}}>
              <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: Math.max(6, track * ps[i] * g), background: on ? AC : acA(0.45), borderRadius: 6, boxShadow: on ? `0 0 30px ${acA(0.7)}` : 'none'}} />
            </div>
            <div style={{width: VAL, display: 'flex', justifyContent: 'flex-end'}}>
              <Mono size={40} color={on ? AC : GREY}>{pct(ps[i] * g)}</Mono>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// La phrase à compléter, avec le mot tiré (ou le curseur qui clignote).
const Prompt: React.FC<{word?: string}> = ({word}) => {
  const frame = useCurrentFrame();
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 4}}>
      <Say size={54} color={GREY}>Mon bar s'appellera</Say>
      <div style={{display: 'flex', alignItems: 'baseline', gap: 14, height: 70}}>
      <Say size={54} color={GREY}>« Le</Say>
      {word ? (
        <Pop at={0}><Say size={54} color={AC}>{word} »</Say></Pop>
      ) : (
        <div style={{width: 8, height: 60, background: AC, alignSelf: 'center', opacity: frame % 10 < 5 ? 1 : 0}} />
      )}
      </div>
    </div>
  );
};

// Curseur de température, du métronome au free jazz.
const Slider: React.FC<{T: number}> = ({T}) => {
  const MAX = 2;
  const x = (T / MAX) * W;
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 18}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
        <Mono size={40} color={GREY}>température</Mono>
        <Mono size={64}>{fr(T)}</Mono>
      </div>
      <div style={{position: 'relative', height: 50}}>
        <div style={{position: 'absolute', left: 0, right: 0, top: 21, height: 8, background: '#333', borderRadius: 4}} />
        <div style={{position: 'absolute', left: 0, top: 21, height: 8, width: x, background: AC, borderRadius: 4}} />
        <div style={{position: 'absolute', left: x - 25, top: 0, width: 50, height: 50, borderRadius: 25, background: '#000', border: `8px solid ${AC}`, boxSizing: 'border-box'}} />
      </div>
    </div>
  );
};

// Petite étiquette d'un mot tiré.
const Chip: React.FC<{at: number; word: string; hi?: boolean}> = ({at, word, hi = false}) => (
  <Pop at={at} style={{border: `4px solid ${hi ? AC : '#555'}`, borderRadius: 16, padding: '8px 20px', background: hi ? acA(0.15) : 'transparent'}}>
    <Mono size={40} color={hi ? AC : '#fff'}>{word}</Mono>
  </Pop>
);

// ---------- Scènes ----------

// Les cinq suites et leurs probabilités, puis le tirage qui ralentit et s'arrête sur une rangée.
const Reponse: React.FC = () => {
  const frame = useCurrentFrame();
  const grow = WORDS.map((_, i) => interpolate(frame, [BEAT * (1.5 + 0.5 * i), BEAT * (1.5 + 0.5 * i) + 10], [0, 1], clamp));
  const DRAW_FROM = BEAT * 5;
  const DRAW_TO = BEAT * 7.5;
  // Le curseur du tirage parcourt les rangées en ralentissant (9 sauts : il finit sur la rangée 0).
  const steps = Math.floor(interpolate(frame, [DRAW_FROM, DRAW_TO], [0, 10], {...clamp, easing: Easing.out(Easing.quad)}));
  const drawing = frame >= DRAW_FROM;
  const lit = drawing ? steps % WORDS.length : -1;
  const done = frame >= DRAW_TO + 6;
  return (
    <Scene caps={[[0, 'Le modèle donne une probabilité à chaque mot possible, puis il en tire un.']]} gap={40}>
      <Pop at={BEAT * 0.5}>
        <Prompt word={done ? WORDS[0] : undefined} />
      </Pop>
      <Bars ps={probs(1)} grow={grow} lit={lit} />
    </Scene>
  );
};

// Le curseur descend : les barres se redessinent, le favori sort à chaque tirage.
const Basse: React.FC = () => {
  const frame = useCurrentFrame();
  const T = interpolate(frame, [BEAT * 1.5, BEAT * 3.5], [1, 0.3], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const draws = [BEAT * 5, BEAT * 6, BEAT * 7];
  const flash = draws.some((d) => frame >= d - 4 && frame < d + 4);
  return (
    <Scene
      caps={[[0, 'Basse, la température donne presque toujours la victoire au favori.']]}
      gap={30}
      bottom={<Slider T={T} />}
    >
      <Pop at={BEAT * 0.6}><Mono size={40} color={DIM}>score de chaque mot ÷ T</Mono></Pop>
      <Bars ps={probs(T)} lit={flash ? 0 : -1} />
      <div style={{display: 'flex', gap: 18, justifyContent: 'center', height: 70}}>
        {draws.map((d, k) => <Chip key={k} at={d} word={WORDS[0]} hi />)}
      </div>
    </Scene>
  );
};

// ---------- La roue du tirage ----------

const R = 245;
const deg = (a: number) => (a * Math.PI) / 180;
const pt = (a: number, r: number) => [Math.sin(deg(a)) * r, -Math.cos(deg(a)) * r];

// Parts de la roue (en degrés, sens horaire depuis le haut).
const sectors = (ps: number[]) => {
  let acc = 0;
  return ps.map((p) => {
    const s = {from: acc, to: acc + p * 360};
    acc += p * 360;
    return s;
  });
};

const Wheel: React.FC<{ps: number[]; rot: number; lit: number}> = ({ps, rot, lit}) => {
  const S = 2 * R + 60;
  const secs = sectors(ps);
  return (
    <svg width={S} height={S} viewBox={`${-S / 2} ${-S / 2} ${S} ${S}`} style={{display: 'block', alignSelf: 'center', overflow: 'visible'}}>
      <g transform={`rotate(${rot})`}>
        {secs.map((s, i) => {
          const [x1, y1] = pt(s.from, R);
          const [x2, y2] = pt(s.to, R);
          const large = s.to - s.from > 180 ? 1 : 0;
          const mid = (s.from + s.to) / 2;
          const on = i === lit;
          const [tx, ty] = pt(mid, R * 0.56);
          return (
            <g key={i}>
              <path d={`M0 0 L${x1} ${y1} A${R} ${R} 0 ${large} 1 ${x2} ${y2} Z`} fill={on ? AC : acA(0.12 + 0.1 * (WORDS.length - i))} stroke="#000" strokeWidth={6} />
              <text x={tx} y={ty} transform={`rotate(${((((mid + rot) % 360) + 360) % 360 > 180 ? mid + 90 : mid - 90)} ${tx} ${ty})`} textAnchor="middle" dominantBaseline="central" fontFamily={mono} fontWeight={600} fontSize={svgPx(36)} fill={on ? '#000' : '#fff'}>
                {WORDS[i]}
              </text>
            </g>
          );
        })}
        <circle r={R} fill="none" stroke={AC} strokeWidth={6} />
      </g>
      <circle r={22} fill="#000" stroke={AC} strokeWidth={6} />
      {/* L'aiguille, fixe, en haut. */}
      <path d={`M-26 ${-R - 34} L26 ${-R - 34} L0 ${-R + 12} Z`} fill="#fff" />
    </svg>
  );
};

const T_HIGH = 1.8;
const SPINS = [
  {at: BEAT * 2.5, i: 0},
  {at: BEAT * 5, i: 2},
  {at: BEAT * 7.5, i: 4},
];
const SPIN_LEN = 24;

// Angles de fin de chaque tirage : deux tours, puis la part visée sous l'aiguille.
const spinTargets = (() => {
  const secs = sectors(probs(T_HIGH));
  let prev = 0;
  return SPINS.map((s) => {
    const mid = (secs[s.i].from + secs[s.i].to) / 2;
    const want = (((-mid - prev) % 360) + 360) % 360;
    prev = prev + 720 + want;
    return prev;
  });
})();

const Roue: React.FC = () => {
  const frame = useCurrentFrame();
  const T = interpolate(frame, [BEAT * 0.5, BEAT * 2], [0.3, T_HIGH], {...clamp, easing: Easing.inOut(Easing.cubic)});
  let rot = 0;
  let lit = -1;
  SPINS.forEach((s, k) => {
    const from = k === 0 ? 0 : spinTargets[k - 1];
    if (frame >= s.at) {
      rot = interpolate(frame, [s.at, s.at + SPIN_LEN], [from, spinTargets[k]], {...clamp, easing: Easing.out(Easing.cubic)});
      lit = frame >= s.at + SPIN_LEN ? s.i : -1;
    } else if (k === 0) rot = 0;
  });
  return (
    <Scene
      caps={[[0, 'Haute, elle aplatit les écarts, et des mots moins probables sortent.']]}
      gap={34}
      bottom={<Slider T={T} />}
    >
      <Wheel ps={probs(T)} rot={rot} lit={lit} />
      <div style={{display: 'flex', gap: 18, justifyContent: 'center', height: 70}}>
        {SPINS.map((s, k) => <Chip key={k} at={s.at + SPIN_LEN} word={`Le ${WORDS[s.i]}`} hi={k === SPINS.length - 1} />)}
      </div>
    </Scene>
  );
};

// ---------- Feynman, mille fois (Thinking Machines Lab, sept. 2025) ----------

const fmt = (n: number) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

// Le même début sur 102 tokens, puis la fourche.
const Tree: React.FC = () => {
  const frame = useCurrentFrame();
  const trunk = useProg(BEAT * 3.5, BEAT * 5.5);
  const forkA = useProg(BEAT * 6, BEAT * 7);
  const forkB = useProg(BEAT * 6.5, BEAT * 7.5);
  const others = useProg(BEAT * 8, BEAT * 9);
  const H = 600;
  const X = 260;
  const Y0 = 110;
  const Y1 = 360;
  const len = Y1 - Y0;
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{display: 'block', alignSelf: 'center', overflow: 'visible'}}>
      <g opacity={frame >= BEAT * 0.6 ? 1 : 0}>
        <rect x={6} y={6} width={W - 12} height={84} rx={20} fill="#111" stroke="#fff" strokeWidth={5} />
        <text x={W / 2} y={60} textAnchor="middle" fontFamily={mono} fontWeight={600} fontSize={svgPx(38)} fill="#fff">Tell me about Richard Feynman</text>
      </g>
      {/* Tronc : un trait par token, tous identiques. */}
      <line x1={X} y1={Y0} x2={X} y2={Y0 + len * trunk} stroke={AC} strokeWidth={22} />
      {Array.from({length: 17}, (_, k) => {
        const y = Y0 + 10 + (k / 16) * (len - 20);
        return y <= Y0 + len * trunk ? <line key={k} x1={X - 22} x2={X + 22} y1={y} y2={y} stroke="#000" strokeWidth={4} /> : null;
      })}
      <text x={X + 44} y={Y0 + len / 2 + 14} fontFamily={mono} fontWeight={600} fontSize={svgPx(40)} fill={AC} opacity={trunk >= 1 ? 1 : 0}>102 tokens identiques</text>
      {/* Les autres réponses, en pointillés discrets. */}
      {[-150, -80, 120, 200].map((dx, k) => (
        <line key={k} x1={X} y1={Y1} x2={X + dx * others} y2={Y1 + 90 * others} stroke="#555" strokeWidth={4} strokeDasharray="8 10" />
      ))}
      <line x1={X} y1={Y1} x2={X} y2={Y1 + 140 * forkA} stroke={AC} strokeWidth={18} strokeLinecap="round" />
      <path d={`M${X} ${Y1} Q${X + 260} ${Y1 + 20} ${X + 420} ${Y1 + 140}`} fill="none" stroke={AC} strokeWidth={6} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - forkB} />
      <text x={X} y={Y1 + 196} textAnchor="middle" fontFamily={mono} fontWeight={600} fontSize={svgPx(38)} fill="#fff" opacity={forkA >= 1 ? 1 : 0}>Queens, New York</text>
      <text x={X + 420} y={Y1 + 196} textAnchor="middle" fontFamily={mono} fontWeight={600} fontSize={svgPx(38)} fill={GREY} opacity={forkB >= 1 ? 1 : 0}>New York City</text>
      <text x={X} y={Y1 + 244} textAnchor="middle" fontFamily={mono} fontWeight={600} fontSize={svgPx(36)} fill={DIM} opacity={forkA >= 1 ? 1 : 0}>la plupart</text>
      <text x={X + 420} y={Y1 + 244} textAnchor="middle" fontFamily={mono} fontWeight={600} fontSize={svgPx(36)} fill={DIM} opacity={forkB >= 1 ? 1 : 0}>quelques-unes</text>
    </svg>
  );
};

// La cause : la même requête, calculée dans un paquet de 3 puis dans un paquet de 8 (illustratif).
const Paquets: React.FC<{at: number}> = ({at}) => {
  const lane = (n: number, out: string, from: number, color: string) => {
    const arrow = interpolate(useCurrentFrame(), [from + BEAT, from + BEAT + 10], [0, 1], clamp);
    return (
      <Pop at={from} style={{display: 'flex', alignItems: 'center', gap: 18}}>
        <div style={{display: 'flex', gap: 8, border: '4px solid #666', borderRadius: 14, padding: 10, width: 8 * 44 + 7 * 8 - 10, boxSizing: 'content-box'}}>
          {Array.from({length: n}, (_, k) => (
            <div key={k} style={{width: 36, height: 36, borderRadius: 6, background: k === 0 ? AC : '#555'}} />
          ))}
        </div>
        <div style={{width: 70 * arrow, height: 6, background: '#fff'}} />
        <div style={{opacity: arrow >= 1 ? 1 : 0}}>
          <Mono size={36} color={color}>{out}</Mono>
        </div>
      </Pop>
    );
  };
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 50}}>
      <Pop at={at} style={{display: 'flex', alignItems: 'center', gap: 16}}>
        <div style={{width: 36, height: 36, borderRadius: 6, background: AC}} />
        <Mono size={40} color={AC}>ta requête</Mono>
      </Pop>
      {lane(3, 'Queens, New York', at + BEAT, '#fff')}
      {lane(8, 'New York City', at + BEAT * 3, GREY)}
      <Pop at={at + BEAT * 4.5}><Mono size={40} color={DIM}>même question, autre paquet (exemple)</Mono></Pop>
    </div>
  );
};

const CAUSE = 172;
const Feynman: React.FC = () => {
  const frame = useCurrentFrame();
  const n = interpolate(frame, [BEAT * 1, BEAT * 3.5], [0, 1000], clamp);
  const eighty = frame >= BEAT * 9;
  const tree = frame < CAUSE;
  return (
    <Scene
      caps={[
        [0, 'Même à température 0, un modèle ne répond pas toujours pareil.'],
        [CAUSE, 'Le serveur calcule les requêtes par paquets, et le résultat bouge un peu.'],
      ]}
      bottom={
        <div style={{display: 'flex', flexDirection: 'column', gap: 14}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', opacity: frame >= BEAT ? 1 : 0}}>
            <Mono size={52} color="#fff">{fmt(n)} essais</Mono>
            <div style={{opacity: eighty ? 1 : 0}}><Mono size={52}>80 réponses</Mono></div>
          </div>
          <Mono size={36} color={DIM}>Thinking Machines Lab, sept. 2025, Qwen3</Mono>
        </div>
      }
    >
      {tree ? <Tree /> : <Paquets at={CAUSE + 6} />}
    </Scene>
  );
};

// ---------- Et donc ----------

// La requête d'API : la ligne temperature rayée, l'effort de réflexion à sa place (requête stylisée).
const EtDonc: React.FC = () => {
  const frame = useCurrentFrame();
  const strike = useProg(BEAT * 2.5, BEAT * 3.2);
  const cross = useProg(BEAT * 3.2, BEAT * 3.9);
  const line = (txt: React.ReactNode, at: number, extra?: React.ReactNode) => (
    <Pop at={at} style={{position: 'relative', display: 'flex', alignItems: 'center', gap: 20, height: 70}}>
      {txt}
      {extra}
    </Pop>
  );
  return (
    <Scene
      caps={[[0, 'En 2026, les modèles qui raisonnent ont presque effacé ce réglage.']]}
      bottom={
        <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
          <Pop at={BEAT * 5.5}><Mono size={38} color={GREY}>Anthropic, après Opus 4.6 : 1 seulement</Mono></Pop>
          <Pop at={BEAT * 6.5}><Mono size={38} color={GREY}>OpenAI, s'il raisonne : à retirer</Mono></Pop>
        </div>
      }
    >
      <Pop at={BEAT * 0.5} style={{border: '5px solid #555', borderRadius: 28, padding: '34px 44px', background: '#0d0d0d', display: 'flex', flexDirection: 'column', gap: 14}}>
        <Mono size={44} color={DIM}>{'{'}</Mono>
        {line(<Mono size={48} color="#fff">{'"messages": [ … ],'}</Mono>, BEAT * 0.5)}
        {line(
          <div style={{position: 'relative', opacity: 1 - 0.5 * strike}}>
            <Mono size={48} color="#fff">{'"temperature": 0.2,'}</Mono>
            <div style={{position: 'absolute', left: 0, top: 30, height: 8, width: `${strike * 92}%`, background: RED}} />
          </div>,
          BEAT * 1.2,
          <Cross p={cross} size={70} />,
        )}
        {line(<Mono size={48}>{'"effort": "high"'}</Mono>, BEAT * 4.2)}
        <Mono size={44} color={DIM}>{'}'}</Mono>
      </Pop>
    </Scene>
  );
};

// ---------- Chute ----------

// La cible : les fléchettes tombent toutes au même endroit, loin du centre.
const DARTS = [
  [178, -128],
  [196, -112],
  [168, -104],
  [190, -140],
  [206, -122],
];
const Chute: React.FC = () => {
  const frame = useCurrentFrame();
  const ring = useProg(BEAT * 4.5, BEAT * 5.5);
  const S = 600;
  const C = S / 2;
  return (
    <Scene
      caps={[[0, 'Une température basse rend le modèle *prévisible*, pas plus exact.']]}
      bottom={
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, opacity: frame >= BEAT * 6 ? 1 : 0}}>
          <Mono size={40} color="#fff">température 0,2</Mono>
          <Mono size={44} color={RED}>5 tirages, la même erreur</Mono>
        </div>
      }
    >
      <Pop at={BEAT * 0.4} style={{alignSelf: 'center'}}>
        <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`} style={{display: 'block', overflow: 'visible'}}>
          {[290, 220, 150, 80].map((r, k) => (
            <circle key={r} cx={C} cy={C} r={r} fill={k % 2 ? '#111' : '#1c1c1c'} stroke="#444" strokeWidth={4} />
          ))}
          <circle cx={C} cy={C} r={34} fill={AC} />
          <text x={C} y={C + 92} textAnchor="middle" fontFamily={mono} fontWeight={600} fontSize={svgPx(36)} fill={AC} opacity={frame >= BEAT * 6 ? 1 : 0}>la bonne réponse</text>
          {DARTS.map(([dx, dy], k) => {
            const at = BEAT * (1 + 0.6 * k);
            if (frame < at) return null;
            const s = interpolate(frame, [at, at + 6], [2.2, 1], clamp);
            return (
              <g key={k} transform={`translate(${C + dx} ${C + dy}) scale(${s})`}>
                <circle r={18} fill={RED} stroke="#000" strokeWidth={4} />
              </g>
            );
          })}
          <circle cx={C + 188} cy={C - 121} r={64} fill="none" stroke={RED} strokeWidth={5} strokeDasharray="12 10" pathLength={400} opacity={ring} />
        </svg>
      </Pop>
    </Scene>
  );
};

const SCENES: Scenes = [
  [Reponse, 200],
  [Basse, 182],
  [Roue, 186],
  [Feynman, 370],
  [EtDonc, 180],
  [Chute, 180],
];

export const TEMPERATURE_DURATION = totalDuration(SCENES);

export const Temperature: React.FC = () => <Short title={["Qu'est-ce que la", 'température ?']} scenes={SCENES} accent={AC} />;

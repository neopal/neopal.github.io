// Short Hallucination : une réponse plausible n'est pas une réponse vraie.
// Scène propre à ce short : le QCM sans points négatifs, où deviner finit toujours devant avouer.
import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {ACCENT, BEAT, Bubble, Check, Cross, DIM, Dots, Draw, GREY, Mono, Pop, RED, Say, Scene, Scenes, Short, W, clamp, totalDuration, useProg, withAlpha} from './kit';

const greenA = (a: number) => withAlpha(ACCENT, a);

// Balance de justice qui se dessine.
const Scales: React.FC<{p: number; size?: number}> = ({p, size = 160}) => {
  const seg = (k: number) => interpolate(p, [k / 4, (k + 1) / 4], [0, 1], clamp);
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <Draw d="M50 12 L50 86 M32 86 L68 86" p={seg(0)} color="#fff" width={5} len={120} />
      <Draw d="M18 24 L82 24" p={seg(1)} color="#fff" width={5} len={70} />
      <Draw d="M18 24 L8 52 L28 52 Z" p={seg(2)} color={ACCENT} width={4} len={80} />
      <Draw d="M82 24 L72 52 L92 52 Z" p={seg(3)} color={ACCENT} width={4} len={80} />
    </svg>
  );
};

// Lignes de texte grises qui s'écrivent (la forme d'un texte, sans contenu inventé).
const Lines: React.FC<{p: number; widths: number[]; h?: number}> = ({p, widths, h = 18}) => (
  <div style={{display: 'flex', flexDirection: 'column', gap: 14}}>
    {widths.map((w, k) => (
      <div key={k} style={{height: h, borderRadius: h / 2, background: '#5a5a5a', width: `${w * interpolate(p, [k / widths.length, (k + 1) / widths.length], [0, 1], clamp)}%`}} />
    ))}
  </div>
);

// ---------- Scènes ----------

// La question sur une thèse qui n'existe pas, et la réponse qui s'écrit avec aplomb (l'Imagine de la fiche).
const ANSWER = 'Avec plaisir. Soutenue à Toulouse, cette thèse compare 412 lâchers de pigeons.';

const Reponse: React.FC = () => {
  const frame = useCurrentFrame();
  const T0 = BEAT * 5;
  const typed = ANSWER.slice(0, Math.max(0, Math.floor((frame - T0) / 1.1)));
  const dots = frame >= BEAT * 3.4 && frame < T0;
  const crossP = useProg(BEAT * 12, BEAT * 12.8);
  return (
    <Scene
      caps={[[0, "Une hallucination, c'est quand un modèle affirme *avec assurance* quelque chose de faux."]]}
      bottom={
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, opacity: crossP > 0 ? 1 : 0}}>
          <Cross p={crossP} size={80} />
          <Mono size={44} color={RED}>cette thèse n'existe pas</Mono>
        </div>
      }
    >
      <Bubble side="right" at={BEAT * 1.2}><Say size={48}>Résume-moi la thèse de 1962 sur les pigeons voyageurs.</Say></Bubble>
      <div style={{alignSelf: 'flex-start', minHeight: 230, display: 'flex', alignItems: 'center'}}>
        {dots ? <Dots /> : null}
        {frame >= T0 ? (
          <div style={{border: '4px solid #444', borderRadius: 34, padding: '22px 34px', maxWidth: 780}}>
            <Say size={48}>{typed}</Say>
          </div>
        ) : null}
      </div>
    </Scene>
  );
};

// Air Canada : la règle inventée, puis le jugement.
const AirCanada: React.FC = () => {
  const lines = useProg(BEAT * 1.6, BEAT * 3);
  const crossP = useProg(BEAT * 3.2, BEAT * 3.9);
  const scales = useProg(BEAT * 6, BEAT * 7.4);
  const frame = useCurrentFrame();
  return (
    <Scene
      caps={[[0, "En 2024, Air Canada a été jugée responsable d'une règle inventée par son bot."]]}
      gap={40}
    >
      <Pop at={BEAT * 1.2} style={{display: 'flex', alignItems: 'center', gap: 24}}>
        <div style={{flex: 1, border: '4px solid #444', borderRadius: 34, padding: '28px 34px', display: 'flex', flexDirection: 'column', gap: 22}}>
          <Mono size={40} color={GREY}>règle de remboursement</Mono>
          <Lines p={lines} widths={[96, 88, 70]} />
        </div>
        <Cross p={crossP} size={120} />
      </Pop>
      <div style={{alignSelf: 'center', opacity: frame >= BEAT * 6 ? 1 : 0}}>
        <Scales p={scales} size={260} />
      </div>
    </Scene>
  );
};

// Le QCM sans points négatifs : avouer rapporte 0, deviner rapporte parfois 1 (exemple illustratif).
const GUESS = [false, true, false, false];

const Pourquoi: React.FC = () => {
  const frame = useCurrentFrame();
  const qAt = (k: number) => BEAT * 4 + k * BEAT * 1.2;
  const row = (label: string, guess: boolean, at: number) => {
    const total = guess ? GUESS.filter((g, k) => g && frame >= qAt(k) + 6).length : 0;
    return (
      <Pop at={at} style={{display: 'flex', alignItems: 'center', gap: 18}}>
        <div style={{width: 260}}><Say size={50} color={guess ? '#fff' : GREY}>{label}</Say></div>
        {GUESS.map((g, k) => {
          const on = frame >= qAt(k) + 6;
          const ok = guess && g;
          const col = !on ? '#333' : !guess ? '#555' : ok ? ACCENT : RED;
          return (
            <div key={k} style={{width: 96, height: 96, border: `4px solid ${col}`, background: on && ok ? greenA(0.18) : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Mono size={44} color={on ? (ok ? ACCENT : GREY) : '#444'}>{on ? (guess && g ? '1' : '0') : '?'}</Mono>
            </div>
          );
        })}
        <div style={{width: 90, textAlign: 'right'}}><Mono size={84} color={guess ? ACCENT : GREY}>{frame >= qAt(0) + 6 ? String(total) : ''}</Mono></div>
      </Pop>
    );
  };
  return (
    <Scene
      caps={[
        [0, 'En 2025, OpenAI montre que les tests notent comme un QCM sans points négatifs.'],
        [215, 'Avouer rapporte zéro, deviner parfois un point, donc il *devine*.'],
      ]}
      gap={40}
      bottom={
        <Pop at={BEAT * 2.6} style={{display: 'flex', justifyContent: 'center'}}>
          <Mono size={40} color={DIM}>4 questions dont il ignore la réponse</Mono>
        </Pop>
      }
    >
      {row('Il avoue', false, BEAT * 3)}
      {row('Il devine', true, BEAT * 3.3)}
    </Scene>
  );
};

// Trois références citées : le curseur ouvre chacune, la troisième ne mène nulle part (exemple illustratif).
const REFS = [
  {ok: true, w: [92, 64]},
  {ok: true, w: [84, 70]},
  {ok: false, w: [96, 58]},
];

const EtDonc: React.FC = () => {
  const frame = useCurrentFrame();
  const clickAt = (k: number) => BEAT * 2.4 + k * BEAT * 1.8;
  const CARD = 150;
  const GAP = 26;
  // Le curseur va d'une carte à l'autre, et clique.
  const target = REFS.reduce((acc, _, k) => acc + interpolate(frame, [clickAt(k) - 14, clickAt(k) - 2], [0, 1], {...clamp, easing: (t) => 1 - Math.pow(1 - t, 3)}), -1);
  const cy = Math.max(0, target) * (CARD + GAP) + CARD / 2;
  const cx = 330 + (target < 0 ? 120 : 0);
  const press = REFS.some((_, k) => frame >= clickAt(k) && frame < clickAt(k) + 4);
  return (
    <Scene caps={[[0, "S'il te cite trois études, ouvre chacune avant de la mettre dans ton deck."]]}>
      <div style={{position: 'relative', height: REFS.length * (CARD + GAP)}}>
        {REFS.map((r, k) => {
          const opened = frame >= clickAt(k) + 4;
          const p = interpolate(frame, [clickAt(k) + 4, clickAt(k) + 12], [0, 1], clamp);
          return (
            <Pop key={k} at={BEAT * 0.8 + k * 6} style={{position: 'absolute', left: 0, right: 0, top: k * (CARD + GAP), height: CARD, border: `4px solid ${opened ? (r.ok ? ACCENT : RED) : '#444'}`, borderRadius: 22, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 26}}>
              <div style={{flex: 1}}><Lines p={1} widths={r.w} h={20} /></div>
              <div style={{width: 300, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 14, opacity: opened ? 1 : 0}}>
                <Mono size={38} color={r.ok ? ACCENT : RED}>{r.ok ? 'trouvée' : 'introuvable'}</Mono>
                {r.ok ? <Check p={p} size={64} /> : <Cross p={p} size={64} />}
              </div>
            </Pop>
          );
        })}
        <svg width={70} height={90} viewBox="0 0 70 90" style={{position: 'absolute', left: cx, top: cy - 10, opacity: frame >= BEAT * 1.6 ? 1 : 0, transform: `scale(${press ? 0.85 : 1})`}}>
          <path d="M6 4 L6 70 L22 56 L34 84 L46 78 L34 52 L56 52 Z" fill="#fff" stroke="#000" strokeWidth={4} strokeLinejoin="round" />
        </svg>
      </div>
    </Scene>
  );
};

// Deux jauges : plausible se remplit, vrai n'est jamais mesuré.
const Chute: React.FC = () => {
  const frame = useCurrentFrame();
  const g = useProg(BEAT * 1.2, BEAT * 2.8);
  const gauge = (label: string, fill: number, at: number, unknown = false) => (
    <Pop at={at} style={{display: 'flex', flexDirection: 'column', gap: 12}}>
      <Mono size={56} color={GREY}>{label}</Mono>
      <div style={{position: 'relative', height: 150, border: '4px solid #444'}}>
        <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: `${fill * 100}%`, background: ACCENT}} />
        {unknown ? (
          <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: frame >= BEAT * 3 ? 1 : 0}}>
            <Mono size={56} color="#fff">jamais mesuré</Mono>
          </div>
        ) : null}
      </div>
    </Pop>
  );
  return (
    <Scene caps={[[0, 'Il ne ment pas, puisque mentir suppose de connaître la vérité.']]} gap={90}>
      {gauge('plausible', 0.94 * g, BEAT * 0.6)}
      {gauge('vrai', 0, BEAT * 1, true)}
    </Scene>
  );
};

const SCENES: Scenes = [
  [Reponse, 320],
  [AirCanada, 210],
  [Pourquoi, 390],
  [EtDonc, 210],
  [Chute, 175],
];

export const HALLUCINATION_DURATION = totalDuration(SCENES);

export const Hallucination: React.FC = () => <Short title={["Qu'est-ce qu'une", 'hallucination ?']} scenes={SCENES} />;

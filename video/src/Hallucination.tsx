// Short Hallucination : une réponse plausible n'est pas une réponse vraie.
import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {ACCENT, BEAT, Big, Bubble, Check, Cross, Dots, Draw, Eye, GREY, Hi, Mono, Pop, RED, Say, Scene, Scenes, Short, clamp, totalDuration, useProg} from './kit';

// Balance de justice qui se dessine.
const Scales: React.FC<{p: number; size?: number}> = ({p, size = 160}) => {
  const seg = (k: number) => interpolate(p, [k / 4, (k + 1) / 4], [0, 1], clamp);
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <Draw d="M50 12 L50 86 M32 86 L68 86" p={seg(0)} color="#fff" width={6} len={120} />
      <Draw d="M18 24 L82 24" p={seg(1)} color="#fff" width={6} len={70} />
      <Draw d="M18 24 L8 52 L28 52 Z" p={seg(2)} color={ACCENT} width={5} len={80} />
      <Draw d="M82 24 L72 52 L92 52 Z" p={seg(3)} color={ACCENT} width={5} len={80} />
    </svg>
  );
};

// Lignes de texte grises qui s'écrivent (contenu non cité, juste la forme d'une réponse).
const Lines: React.FC<{p: number; widths: number[]}> = ({p, widths}) => (
  <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
    {widths.map((w, k) => (
      <div key={k} style={{height: 18, borderRadius: 9, background: '#5a5a5a', width: `${w * interpolate(p, [k / widths.length, (k + 1) / widths.length], [0, 1], clamp)}%`}} />
    ))}
  </div>
);

// ---------- Scènes ----------

const Question: React.FC = () => (
  <Scene gap={14}>
    <Pop at={0}><Say size={104}>Qu'est-ce qu'une</Say></Pop>
    <Pop at={7}><Big size={126} color={ACCENT}><span style={{whiteSpace: 'nowrap'}}>hallucination ?</span></Big></Pop>
  </Scene>
);

const ANSWER = 'Oui, l’étude de Dupont et al. publiée en 2021 le démontre.';

const Reponse: React.FC = () => {
  const frame = useCurrentFrame();
  const T0 = BEAT * 3.4;
  const typed = ANSWER.slice(0, Math.max(0, Math.floor((frame - T0) / 1.1)));
  const dots = frame >= BEAT * 2 && frame < T0;
  const crossP = useProg(BEAT * 7.6, BEAT * 8.4);
  return (
    <Scene gap={34}>
      <Pop at={0}><Say size={64}>Une hallucination, c'est quand un modèle affirme <Hi>avec assurance</Hi> quelque chose de faux.</Say></Pop>
      <Bubble side="right" at={BEAT * 1.2}><Say size={50}>Tu as une étude qui le prouve ?</Say></Bubble>
      <div style={{alignSelf: 'flex-start', minHeight: 200, display: 'flex', alignItems: 'center', gap: 20}}>
        {dots ? <Dots /> : null}
        {frame >= T0 ? (
          <div style={{border: '4px solid #444', borderRadius: 34, padding: '24px 36px', maxWidth: 700}}>
            <Say size={50}>{typed}</Say>
          </div>
        ) : null}
        {crossP > 0 ? <Cross p={crossP} size={120} /> : null}
      </div>
      <div style={{height: 150}}>
        <Pop at={BEAT * 8.4}><Say size={58}>La référence a toutes les apparences d'une vraie, alors qu'<Hi color={RED}>elle n'existe pas.</Hi></Say></Pop>
      </div>
    </Scene>
  );
};

// Air Canada : la règle inventée, puis le jugement.
const AirCanada: React.FC = () => {
  const lines = useProg(BEAT * 1.6, BEAT * 3);
  const crossP = useProg(BEAT * 3.2, BEAT * 3.9);
  const scales = useProg(BEAT * 6, BEAT * 7.2);
  return (
    <Scene gap={40}>
      <Pop at={0}><Say size={60}>Le chatbot d'Air Canada avait inventé une règle de remboursement pour un client en deuil.</Say></Pop>
      <Pop at={BEAT * 1.2} style={{display: 'flex', alignItems: 'center', gap: 24}}>
        <div style={{flex: 1, border: '4px solid #444', borderRadius: 34, padding: '28px 34px', display: 'flex', flexDirection: 'column', gap: 22}}>
          <Mono size={36} color={GREY}>règle de remboursement</Mono>
          <Lines p={lines} widths={[96, 88, 70]} />
        </div>
        <Cross p={crossP} size={120} />
      </Pop>
      <div style={{height: 300}}>
        <Pop at={BEAT * 5.6} style={{display: 'flex', alignItems: 'center', gap: 30}}>
          <Scales p={scales} size={170} />
          <div style={{flex: 1}}>
            <Say size={58}>En février 2024, un tribunal a jugé la compagnie <Hi>responsable</Hi> de ce que disait son chatbot.</Say>
          </div>
        </Pop>
      </div>
    </Scene>
  );
};

// Le QCM sans points négatifs : avouer rapporte 0, deviner rapporte parfois 1 (exemple illustratif).
const GUESS = [false, true, false, false];

const Pourquoi: React.FC = () => {
  const frame = useCurrentFrame();
  const qAt = (k: number) => BEAT * 3 + k * BEAT;
  const row = (label: string, guess: boolean, at: number) => {
    const total = guess ? GUESS.filter((g, k) => g && frame >= qAt(k) + 6).length : 0;
    return (
      <Pop at={at} style={{display: 'flex', alignItems: 'center', gap: 20}}>
        <div style={{width: 300}}><Say size={46} color={guess ? '#fff' : GREY}>{label}</Say></div>
        {GUESS.map((g, k) => {
          const on = frame >= qAt(k) + 6;
          const ok = guess && g;
          const col = !on ? '#333' : !guess ? '#555' : ok ? ACCENT : RED;
          return (
            <div key={k} style={{width: 84, height: 84, border: `4px solid ${col}`, background: on && ok ? 'rgba(124,255,178,.18)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Mono size={40} color={on ? (ok ? ACCENT : GREY) : '#444'}>{on ? (guess ? (g ? '1' : '0') : '0') : '?'}</Mono>
            </div>
          );
        })}
        <div style={{width: 80, textAlign: 'right'}}><Mono size={80} color={guess ? ACCENT : GREY}>{frame >= qAt(0) + 6 ? String(total) : ''}</Mono></div>
      </Pop>
    );
  };
  const mid = frame < BEAT * 12.8;
  return (
    <Scene gap={50}>
      <Pop at={0}><Say size={58}>En septembre 2025, une étude d'OpenAI a montré que la plupart des évaluations notent les modèles comme un <Hi>QCM sans points négatifs.</Hi></Say></Pop>
      <div style={{display: 'flex', flexDirection: 'column', gap: 30}}>
        <Pop at={BEAT * 2.4}><Mono size={34} color="#8a8a8a">4 questions dont il ignore la réponse</Mono></Pop>
        {row('Il avoue « je ne sais pas »', false, BEAT * 2.6)}
        {row('Il devine', true, BEAT * 2.8)}
      </div>
      <div style={{position: 'relative', height: 230}}>
        <div style={{position: 'absolute', left: 0, right: 0, visibility: mid ? 'visible' : 'hidden'}}>
          <Pop at={BEAT * 7.6}><Say size={58}>Avouer ne rapporte jamais de point, alors que deviner en rapporte <Hi>parfois un.</Hi></Say></Pop>
        </div>
        <div style={{position: 'absolute', left: 0, right: 0}}>
          <Pop at={BEAT * 12.8}><Say size={58}>L'entraînement pousse donc les modèles à <Hi>deviner</Hi> plutôt qu'à avouer qu'ils ne savent pas.</Say></Pop>
        </div>
      </div>
    </Scene>
  );
};

// Vérifier les références précises.
const CHECKS = [
  {label: 'une date', ok: true},
  {label: 'une citation', ok: true},
  {label: 'une source', ok: false},
];

const EtDonc: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Scene gap={50}>
      <Pop at={0}><Say size={60}>Et donc, quand un modèle te donne une date, une citation ou une source, <Hi>vérifie-la</Hi> avant de l'utiliser.</Say></Pop>
      <div style={{display: 'flex', flexDirection: 'column', gap: 26}}>
        {CHECKS.map((c, k) => {
          const at = BEAT * 1.6 + k * BEAT * 1.4;
          const verdict = at + 14;
          const p = interpolate(frame, [verdict, verdict + 8], [0, 1], clamp);
          return (
            <Pop key={c.label} at={at} style={{display: 'flex', alignItems: 'center', gap: 30, border: '4px solid #333', borderRadius: 24, padding: '14px 28px', height: 120}}>
              <div style={{flex: 1}}><Mono size={48} color="#fff">{c.label}</Mono></div>
              <div style={{width: 130, display: 'flex', justifyContent: 'center'}}>
                {frame < verdict ? <Eye look={Math.sin((frame - at) / 3)} size={110} /> : c.ok ? <Check p={p} size={96} /> : <Cross p={p} size={90} />}
              </div>
            </Pop>
          );
        })}
      </div>
    </Scene>
  );
};

// Deux jauges : plausible se remplit, vrai n'est jamais mesuré.
const Chute: React.FC = () => {
  const frame = useCurrentFrame();
  const g = useProg(BEAT * 1.4, BEAT * 3);
  const gauge = (label: string, fill: number, color: string, at: number, unknown = false) => (
    <Pop at={at} style={{display: 'flex', flexDirection: 'column', gap: 12}}>
      <Mono size={40} color={GREY}>{label}</Mono>
      <div style={{position: 'relative', height: 64, border: '4px solid #444'}}>
        <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: `${fill * 100}%`, background: color}} />
        {unknown ? (
          <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: frame >= BEAT * 3 ? 1 : 0}}>
            <Mono size={44} color="#fff">?</Mono>
          </div>
        ) : null}
      </div>
    </Pop>
  );
  return (
    <Scene gap={50}>
      <Pop at={0}><Say size={60}>Il produit la suite la plus plausible, sans jamais vérifier qu'elle est vraie.</Say></Pop>
      <div style={{display: 'flex', flexDirection: 'column', gap: 30}}>
        {gauge('plausible', 0.94 * g, ACCENT, BEAT * 0.8)}
        {gauge('vrai', 0, ACCENT, BEAT * 1.2, true)}
      </div>
      <div style={{height: 160}}>
        <Pop at={BEAT * 4.6}><Say size={64}>Il ne ment donc pas, puisque mentir suppose de <Hi>connaître la vérité.</Hi></Say></Pop>
      </div>
    </Scene>
  );
};

const SCENES: Scenes = [
  [Question, 60],
  [Reponse, 180],
  [AirCanada, 150],
  [Pourquoi, 255],
  [EtDonc, 135],
  [Chute, 135],
];

export const HALLUCINATION_DURATION = totalDuration(SCENES);

export const Hallucination: React.FC = () => <Short scenes={SCENES} />;

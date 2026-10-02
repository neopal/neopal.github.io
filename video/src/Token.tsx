// Short Token : le mot découpé en blocs numérotés, et les r enfermés dedans.
// Scène propre à ce short : les ciseaux qui découpent « strawberry » tapé au clavier en blocs qui se referment sur leur numéro.
import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {ACCENT, BEAT, Big, Bubble, Check, Cross, DIM, Dots, Eye, GREY, Lock, Mono, Pop, RED, Say, Scene, Scenes, Scissors, Short, W, clamp, totalDuration, usePop, useProg, withAlpha} from './kit';

const greenA = (a: number) => withAlpha(ACCENT, a);

// ---------- Les blocs de strawberry ----------

const BLOCS = [
  {t: 'st', id: 302},
  {t: 'raw', id: 1618},
  {t: 'berry', id: 19772},
];

// split : 0 mot collé, 1 blocs séparés. closed : 0 lettres visibles, 1 boîte fermée sur le numéro.
const Boxes: React.FC<{split: number; closed: number; litR?: boolean; mystery?: boolean; lock?: number; size?: number}> = ({split, closed, litR = false, mystery = false, lock = 0, size = 104}) => {
  const frame = useCurrentFrame();
  const glow = 0.5 + 0.5 * Math.sin(frame / 3);
  return (
    <div style={{display: 'flex', gap: 10 + 30 * split, justifyContent: 'center'}}>
      {BLOCS.map((b) => (
        <div key={b.t} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10}}>
          <div style={{height: 60}}>{lock > 0 ? <Lock p={lock} /> : null}</div>
          <div style={{position: 'relative', border: `5px solid ${greenA(split)}`, background: greenA(0.14 * closed), padding: `16px ${10 + 12 * split}px`}}>
            <div style={{display: 'flex', opacity: 1 - closed}}>
              {b.t.split('').map((l, k) => {
                const r = litR && l === 'r';
                return (
                  <span key={k} style={{position: 'relative'}}>
                    {r ? <span style={{position: 'absolute', inset: -6, borderRadius: 999, border: `4px solid ${ACCENT}`, opacity: glow}} /> : null}
                    <Mono size={size} color={r ? ACCENT : '#fff'}>{l}</Mono>
                  </span>
                );
              })}
            </div>
            <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: closed}}>
              <Mono size={50}>{mystery ? '?' : b.id}</Mono>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const WORD = 'strawberry';

// ---------- Scènes ----------

const Reponse: React.FC = () => {
  const frame = useCurrentFrame();
  const typed = WORD.slice(0, Math.max(0, Math.floor((frame - 12) / 2.4)));
  const cut = useProg(BEAT * 3.4, BEAT * 3.4 + 10);
  const split = useProg(BEAT * 4.4, BEAT * 4.4 + 8);
  const closed = useProg(BEAT * 6.4, BEAT * 6.4 + 8);
  const typing = frame < BEAT * 3.4;
  return (
    <Scene
      caps={[[0, 'Un token est un bloc de texte numéroté, et le modèle ne lit que ce numéro.']]}
    >
      <div style={{position: 'relative', height: 260, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        {typing ? (
          <div style={{border: '4px solid #555', borderRadius: 20, padding: '22px 34px', minWidth: 640, display: 'flex', alignItems: 'center'}}>
            <Big size={96}>{typed}</Big>
            <div style={{width: 8, height: 90, background: ACCENT, marginLeft: 6, opacity: frame % 10 < 5 ? 1 : 0}} />
          </div>
        ) : (
          <Boxes split={split} closed={closed} />
        )}
        {cut > 0 && cut < 1 ? (
          <div style={{position: 'absolute', top: -30, left: `${8 + cut * 84}%`, transform: 'translateX(-50%) rotate(90deg)'}}>
            <Scissors size={130} />
          </div>
        ) : null}
      </div>
    </Scene>
  );
};

const Bug: React.FC = () => {
  const frame = useCurrentFrame();
  const dots = frame >= BEAT * 2.4 && frame < BEAT * 4;
  const cross = useProg(BEAT * 4.6, BEAT * 4.6 + 10);
  return (
    <Scene caps={[[0, "À l'été 2024, GPT-4o répondait souvent 2, alors qu'il y en a 3."]]}>
      <Bubble side="right" at={BEAT}><Say size={56}>Combien de r dans strawberry ?</Say></Bubble>
      <div style={{alignSelf: 'flex-start', height: 240, display: 'flex', alignItems: 'center'}}>
        {dots ? <Dots /> : frame >= BEAT * 4 ? (
          <div style={{display: 'flex', alignItems: 'center', gap: 30}}>
            <Pop at={BEAT * 4}><Mono size={200} color={RED}>2</Mono></Pop>
            <Cross p={cross} />
          </div>
        ) : null}
      </div>
    </Scene>
  );
};

// Les r sous les couvercles : l'œil cherche, il ne voit que des numéros (la seule scène de la série avec l'œil).
const Pourquoi: React.FC = () => {
  const frame = useCurrentFrame();
  const closed = useProg(BEAT * 3, BEAT * 3 + 8);
  const lock = useProg(BEAT * 3 + 4, BEAT * 3 + 12);
  const scanning = frame >= BEAT * 5;
  const look = Math.sin((frame - BEAT * 5) / 6);
  const mystery = frame >= BEAT * 7;
  return (
    <Scene
      caps={[[0, 'Il voyait st, raw et berry, avec les r *enfermés* dedans.']]}
    >
      <div style={{height: 90, display: 'flex', justifyContent: 'center', opacity: scanning ? 1 : 0}}>
        <Eye look={look} />
      </div>
      <Pop at={0}><Boxes split={1} closed={closed} litR={frame > 6} lock={lock} /></Pop>
    </Scene>
  );
};

// Le tampon du nom de code, puis la date de sortie.
const Anecdote: React.FC = () => {
  const stamp = usePop(BEAT * 2);
  const frame = useCurrentFrame();
  const o1 = usePop(BEAT * 6);
  return (
    <Scene
      caps={[[0, "OpenAI l'a réglé avec le projet Strawberry, sorti en 2024 sous le nom o1."]]}
      bottom={
        <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 28, opacity: frame >= BEAT * 6 ? 1 : 0, transform: `scale(${0.7 + 0.3 * o1})`}}>
          <Mono size={44} color={GREY}>12 sept. 2024</Mono>
          <Mono size={88}>o1</Mono>
        </div>
      }
    >
      <div style={{alignSelf: 'center', opacity: frame >= BEAT * 2 ? 1 : 0, transform: `rotate(-7deg) scale(${2.2 - 1.2 * stamp})`, border: `8px solid ${ACCENT}`, padding: '18px 40px'}}>
        <Big size={116} color={ACCENT}>Strawberry</Big>
      </div>
      <div style={{alignSelf: 'center', marginTop: 30, opacity: frame >= BEAT * 3 ? 1 : 0}}>
        <Mono size={40} color={DIM}>nom de code interne</Mono>
      </div>
    </Scene>
  );
};

// Toi -> LLM -> réponse, en colonne : les tokens descendent et remontent.
const Flow: React.FC = () => {
  const frame = useCurrentFrame();
  const a1 = useProg(BEAT * 1.6, BEAT * 2.6);
  const a2 = useProg(BEAT * 3.6, BEAT * 4.6);
  const node = (label: string, at: number, hi = false) => (
    <Pop at={at} style={{alignSelf: 'center', border: `5px solid ${hi ? ACCENT : '#fff'}`, borderRadius: 24, padding: '14px 40px', background: hi ? greenA(0.12) : 'transparent'}}>
      <Say size={62} color={hi ? ACCENT : '#fff'}>{label}</Say>
    </Pop>
  );
  const arrow = (p: number, label: string, flowFrom: number) => (
    <div style={{position: 'relative', height: 150, display: 'flex', justifyContent: 'center'}}>
      <div style={{width: 6, height: `${p * 100}%`, background: ACCENT}} />
      {p >= 1
        ? [0, 1, 2].map((k) => {
            const t = (((frame - flowFrom) / 20 + k / 3) % 1 + 1) % 1;
            return <div key={k} style={{position: 'absolute', left: W / 2 - 15, top: t * 120, width: 30, height: 30, background: ACCENT}} />;
          })
        : null}
      <div style={{position: 'absolute', left: W / 2 + 40, top: 48, opacity: p}}>
        <Mono size={44}>{label}</Mono>
      </div>
    </div>
  );
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      {node('toi', BEAT)}
      {arrow(a1, 'input tokens', BEAT * 2.6)}
      {node('LLM', BEAT * 2.4, true)}
      {arrow(a2, 'output tokens', BEAT * 4.6)}
      {node('réponse', BEAT * 4.4)}
    </div>
  );
};

const EtDonc: React.FC = () => (
  <Scene caps={[[0, "Avec un LLM, tout se compte en tokens, à l'envoi comme à la réponse."]]}>
    <Flow />
  </Scene>
);

// Le même paragraphe, compté en tokens : une case par token, 65 en anglais, 78 en français.
const Langues: React.FC = () => {
  const frame = useCurrentFrame();
  const PER = 13;
  const cell = W / PER;
  const grid = (n: number, from: number, color: string) => {
    const shown = Math.max(0, Math.min(n, Math.floor((frame - from) / 0.6)));
    return (
      <div style={{display: 'flex', flexWrap: 'wrap', width: W}}>
        {Array.from({length: n}, (_, i) => (
          <div key={i} style={{width: cell, height: cell * 0.5, padding: 3, boxSizing: 'border-box'}}>
            <div style={{width: '100%', height: '100%', background: i < shown ? color : 'transparent', border: `3px solid ${i < shown ? color : '#222'}`, boxSizing: 'border-box', borderRadius: 3}} />
          </div>
        ))}
      </div>
    );
  };
  const row = (label: string, n: number, from: number, color: string) => (
    <Pop at={from - 6} style={{display: 'flex', flexDirection: 'column', gap: 10}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
        <Mono size={40} color={GREY}>{label}</Mono>
        <Mono size={56} color={color}>{Math.max(0, Math.min(n, Math.floor((frame - from) / 0.6)))}</Mono>
      </div>
      {grid(n, from, color)}
    </Pop>
  );
  return (
    <Scene
      caps={[[0, 'Ce paragraphe fait 65 tokens en anglais et 78 en français.']]}
      gap={44}
      bottom={
        <div style={{display: 'flex', justifyContent: 'flex-end', opacity: frame >= BEAT * 6 ? 1 : 0}}>
          <Mono size={64}>+20 %</Mono>
        </div>
      }
    >
      {row('anglais', 65, BEAT * 1.2, '#fff')}
      {row('français', 78, BEAT * 3, ACCENT)}
    </Scene>
  );
};

// Chute : le mot épelé, chaque r s'allume et le compte monte jusqu'à 3.
const Chute: React.FC = () => {
  const frame = useCurrentFrame();
  const letterAt = (k: number) => BEAT * 1.4 + k * 4;
  const rIdx = [2, 7, 8];
  const count = rIdx.filter((k) => frame >= letterAt(k) + 4).length;
  return (
    <Scene
      caps={[[0, 'En 2026, les modèles de raisonnement épellent le mot avant de compter.']]}
      bottom={
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, opacity: count > 0 ? 1 : 0}}>
          <Mono size={140}>{count}</Mono>
          <Mono size={56} color={GREY}>r</Mono>
          {count === 3 ? <Check p={interpolate(frame, [letterAt(8) + 4, letterAt(8) + 14], [0, 1], clamp)} size={110} /> : null}
        </div>
      }
    >
      <Pop at={0}><Boxes split={1} closed={1} /></Pop>
      <div style={{display: 'flex', justifyContent: 'center', height: 80}}>
        <svg width={60} height={80} viewBox="0 0 60 80"><path d="M30 4 L30 70 M12 52 L30 72 L48 52" fill="none" stroke={ACCENT} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" /></svg>
      </div>
      <div style={{display: 'flex', gap: 6, justifyContent: 'center'}}>
        {WORD.split('').map((l, k) => {
          const on = l === 'r' && frame >= letterAt(k) + 4;
          return (
            <Pop key={k} at={letterAt(k)} style={{borderBottom: `8px solid ${on ? ACCENT : '#333'}`, paddingBottom: 8}}>
              <Mono size={130} color={on ? ACCENT : '#fff'}>{l}</Mono>
            </Pop>
          );
        })}
      </div>
    </Scene>
  );
};

const SCENES: Scenes = [
  [Reponse, 196],
  [Bug, 210],
  [Pourquoi, 160],
  [Anecdote, 195],
  [EtDonc, 170],
  [Langues, 165],
  [Chute, 185],
];

export const TOKEN_DURATION = totalDuration(SCENES);

export const Token: React.FC = () => <Short title={["Qu'est-ce qu'un", 'token ?']} scenes={SCENES} />;

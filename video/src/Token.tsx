// Short Token (pilote validé), direction C : typo sur le beat.
import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {ACCENT, BEAT, Big, Bubble, Check, Cross, Eye, GREY, Hi, Lock, Mono, Pop, RED, Say, Scene, Scenes, Scissors, Short, clamp, totalDuration, usePop, useProg} from './kit';

// ---------- Les blocs de strawberry ----------

const BLOCS = [
  {t: 'st', id: 302},
  {t: 'raw', id: 1618},
  {t: 'berry', id: 19772},
];

// split : 0 mot collé, 1 blocs séparés. closed : 0 lettres visibles, 1 boîte fermée sur le numéro.
const Boxes: React.FC<{split: number; closed: number; litR?: boolean; mystery?: boolean; lock?: number; size?: number}> = ({
  split,
  closed,
  litR = false,
  mystery = false,
  lock = 0,
  size = 96,
}) => {
  const frame = useCurrentFrame();
  const glow = 0.5 + 0.5 * Math.sin(frame / 3);
  return (
    <div style={{display: 'flex', gap: 10 + 30 * split, justifyContent: 'center'}}>
      {BLOCS.map((b) => (
        <div key={b.t} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10}}>
          <div style={{height: 60}}>{lock > 0 ? <Lock p={lock} /> : null}</div>
          <div style={{position: 'relative', border: `5px solid rgba(124,255,178,${split})`, background: `rgba(124,255,178,${0.14 * closed})`, padding: `16px ${10 + 12 * split}px`}}>
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
              <Mono size={size * 0.48}>{mystery ? '?' : b.id}</Mono>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// ---------- Scènes ----------

const Question: React.FC = () => (
  <Scene gap={10}>
    <Pop at={0}><Say size={110}>Qu'est-ce qu'un</Say></Pop>
    <Pop at={BEAT / 2}><Big size={200} color={ACCENT}><span style={{whiteSpace: 'nowrap'}}>token ?</span></Big></Pop>
  </Scene>
);

const WORD = 'strawberry';

const Reponse: React.FC = () => {
  const frame = useCurrentFrame();
  const typed = WORD.slice(0, Math.max(0, Math.floor((frame - 12) / 2.4)));
  const cut = useProg(BEAT * 3, BEAT * 3 + 8);
  const split = useProg(BEAT * 4, BEAT * 4 + 8);
  const closed = useProg(BEAT * 5, BEAT * 5 + 8);
  const typing = frame < BEAT * 3;
  return (
    <Scene gap={60}>
      <Pop at={0}><Say size={88}>Un token est un <Hi>bloc de texte.</Hi></Say></Pop>
      <div style={{position: 'relative', height: 230, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        {typing ? (
          <div style={{border: '4px solid #555', borderRadius: 20, padding: '22px 34px', minWidth: 640, display: 'flex', alignItems: 'center'}}>
            <Big size={96}>{typed}</Big>
            <div style={{width: 8, height: 90, background: ACCENT, marginLeft: 6, opacity: frame % 10 < 5 ? 1 : 0}} />
          </div>
        ) : (
          <Boxes split={split} closed={closed} />
        )}
        {cut > 0 && cut < 1 ? (
          <div style={{position: 'absolute', top: -20, left: `${8 + cut * 84}%`, transform: 'translateX(-50%) rotate(90deg)'}}>
            <Scissors size={120} />
          </div>
        ) : null}
      </div>
      <Pop at={BEAT * 6}>
        <Say>Un modèle ne lit pas des lettres, mais lit des <Hi>blocs numérotés.</Hi></Say>
      </Pop>
    </Scene>
  );
};

const Bug: React.FC = () => {
  const frame = useCurrentFrame();
  const dots = frame >= BEAT && frame < BEAT * 2.5;
  const cross = useProg(BEAT * 3, BEAT * 3 + 10);
  return (
    <Scene gap={28}>
      <Pop at={0}><Say size={62} color={GREY}>En 2024, quand on demandait à ChatGPT :</Say></Pop>
      <Bubble side="right" at={6}><Say size={58}>Combien de r dans strawberry ?</Say></Bubble>
      <div style={{alignSelf: 'flex-start', height: 220, display: 'flex', alignItems: 'center'}}>
        {dots ? (
          <div style={{display: 'flex', gap: 18, padding: '0 36px'}}>
            {[0, 1, 2].map((k) => (
              <div key={k} style={{width: 26, height: 26, borderRadius: 13, background: '#888', transform: `translateY(${Math.sin((frame + k * 4) / 3) * 10}px)`}} />
            ))}
          </div>
        ) : frame >= BEAT * 2.5 ? (
          <div style={{display: 'flex', alignItems: 'center', gap: 30}}>
            <Pop at={BEAT * 2.5}><Mono size={200} color={RED}>2.</Mono></Pop>
            <Cross p={cross} />
          </div>
        ) : null}
      </div>
      <Pop at={BEAT * 4.5}><Say size={64}>Ce qui était faux évidemment, il y en a <Hi>3.</Hi></Say></Pop>
      <Pop at={BEAT * 6.5}><Say size={96} color={ACCENT}>Alors pourquoi ?</Say></Pop>
    </Scene>
  );
};

const Pourquoi: React.FC = () => {
  const frame = useCurrentFrame();
  const closed = useProg(BEAT * 3, BEAT * 3 + 8);
  const lock = useProg(BEAT * 3 + 4, BEAT * 3 + 12);
  const scanning = frame >= BEAT * 7;
  const look = Math.sin((frame - BEAT * 7) / 6);
  const mystery = frame >= BEAT * 9;
  return (
    <Scene gap={50}>
      <div style={{height: 90, display: 'flex', justifyContent: 'center', opacity: scanning ? 1 : 0}}>
        <Eye look={look} />
      </div>
      <Pop at={0}><Boxes split={1} closed={closed} litR={frame > 6} mystery={mystery} lock={lock} /></Pop>
      <div style={{position: 'relative', height: 280}}>
        <div style={{position: 'absolute', left: 0, right: 0, visibility: frame < BEAT * 9 ? 'visible' : 'hidden'}}>
          <Pop at={BEAT * 3}>
            <Say>Parce que les r sont <Hi>enfermés</Hi> dans les blocs.</Say>
          </Pop>
        </div>
        <div style={{position: 'absolute', left: 0, right: 0}}>
          <Pop at={BEAT * 9}>
            <Say>Il ne voit que les numéros et doit <Hi>«{' '}deviner{' '}»</Hi> ce qu'il y a dedans.</Say>
          </Pop>
        </div>
      </div>
    </Scene>
  );
};

// Frise 2024 qui se construit.
const Anecdote: React.FC = () => {
  const stamp = usePop(BEAT * 2);
  const frame = useCurrentFrame();
  const axis = useProg(BEAT * 4, BEAT * 5);
  const W = 860;
  const points = [
    {x: 0.55, label: 'juillet : fuite du nom', at: BEAT * 5, hi: false},
    {x: 0.72, label: '12 sept. : o1', at: BEAT * 6, hi: true},
  ];
  return (
    <Scene gap={50}>
      <Pop at={0}><Say>Pour régler ça, OpenAI a lancé un projet dont le nom de code était</Say></Pop>
      <div style={{alignSelf: 'center', opacity: frame >= BEAT * 2 ? 1 : 0, transform: `rotate(-7deg) scale(${2.2 - 1.2 * stamp})`, border: `8px solid ${ACCENT}`, padding: '18px 40px'}}>
        <Big size={116} color={ACCENT}>Strawberry</Big>
      </div>
      <div style={{position: 'relative', height: 170, marginTop: 20}}>
        <Mono size={34} color="#8a8a8a">2024</Mono>
        <div style={{position: 'absolute', top: 70, left: 0, height: 6, width: W * axis, background: '#fff'}} />
        {points.map((pt) => (
          <Pop key={pt.label} at={pt.at} style={{position: 'absolute', top: 56, left: W * pt.x - 17}}>
            <div style={{width: 34, height: 34, borderRadius: 17, background: pt.hi ? ACCENT : '#fff'}} />
            <div style={{position: 'absolute', top: 50, left: -10, whiteSpace: 'nowrap'}}>
              <Mono size={30} color={pt.hi ? ACCENT : GREY}>{pt.label}</Mono>
            </div>
          </Pop>
        ))}
      </div>
    </Scene>
  );
};

// Toi -> LLM -> réponse, avec des tokens qui circulent, puis FR vs EN.
const Flow: React.FC = () => {
  const frame = useCurrentFrame();
  const a1 = useProg(BEAT * 1.5, BEAT * 2.5);
  const a2 = useProg(BEAT * 3, BEAT * 4);
  const node = (label: string, at: number, hi = false) => (
    <Pop at={at} style={{border: `5px solid ${hi ? ACCENT : '#fff'}`, borderRadius: 24, padding: '22px 26px', background: hi ? 'rgba(124,255,178,.12)' : 'transparent'}}>
      <Say size={46} color={hi ? ACCENT : '#fff'}>{label}</Say>
    </Pop>
  );
  const arrow = (p: number, label: string, flowFrom: number) => (
    <div style={{flex: 1, position: 'relative', height: 120, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
      <div style={{height: 6, width: `${p * 100}%`, background: ACCENT}} />
      {p >= 1
        ? [0, 1, 2].map((k) => {
            const t = (((frame - flowFrom) / 20 + k / 3) % 1 + 1) % 1;
            return <div key={k} style={{position: 'absolute', top: 45, left: `${t * 88}%`, width: 30, height: 30, background: ACCENT}} />;
          })
        : null}
      <div style={{position: 'absolute', top: 92, left: 0, right: 0, textAlign: 'center', opacity: p}}>
        <Mono size={30}>{label}</Mono>
      </div>
    </div>
  );
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
      {node('toi', BEAT)}
      {arrow(a1, 'input tokens', BEAT * 2.5)}
      {node('LLM', BEAT * 2, true)}
      {arrow(a2, 'output tokens', BEAT * 4)}
      {node('réponse', BEAT * 3.5)}
    </div>
  );
};

const Bars: React.FC = () => {
  const g = useProg(BEAT * 7, BEAT * 8.5);
  const bar = (label: string, n: number, color: string) => (
    <div style={{display: 'flex', alignItems: 'center', gap: 24}}>
      <Mono size={40} color={GREY}>{label}</Mono>
      <div style={{height: 64, width: n * g * 9, background: color}} />
      <Mono size={40} color={color}>{Math.round(n * g)}</Mono>
    </div>
  );
  return (
    <Pop at={BEAT * 6.5} style={{display: 'flex', flexDirection: 'column', gap: 20}}>
      <Say size={52} color={GREY}>Et le même texte demande 20 % de tokens en plus en français.</Say>
      {bar('EN', 65, '#fff')}
      {bar('FR', 78, ACCENT)}
    </Pop>
  );
};

const EtDonc: React.FC = () => (
  <Scene gap={60}>
    <Pop at={0}><Say>Quand tu interagis avec un LLM, tout se compte en <Hi>tokens.</Hi></Say></Pop>
    <Flow />
    <Bars />
  </Scene>
);

const Chute: React.FC = () => {
  const frame = useCurrentFrame();
  const letterAt = (k: number) => BEAT * 1.5 + k * 3;
  const rIdx = [2, 7, 8];
  const count = rIdx.filter((k) => frame >= letterAt(k) + 4).length;
  return (
    <Scene gap={50}>
      <Pop at={0}><Say size={66}>En 2026, les modèles de raisonnement épellent le mot lettre par lettre avant de compter, comme toi en CP.</Say></Pop>
      <div style={{display: 'flex', gap: 8}}>
        {WORD.split('').map((l, k) => {
          const on = l === 'r' && frame >= letterAt(k) + 4;
          return (
            <Pop key={k} at={letterAt(k)} style={{borderBottom: `8px solid ${on ? ACCENT : 'transparent'}`, paddingBottom: 8}}>
              <Big size={104} color={on ? ACCENT : '#fff'}>{l}</Big>
            </Pop>
          );
        })}
      </div>
      <div style={{display: 'flex', alignItems: 'center', gap: 24, opacity: count > 0 ? 1 : 0}}>
        <Say size={70} color={GREY}>nombre de r :</Say>
        <Mono size={140} color={ACCENT}>{count}</Mono>
        {count === 3 ? <Check p={interpolate(frame, [letterAt(8) + 4, letterAt(8) + 14], [0, 1], clamp)} size={110} /> : null}
      </div>
    </Scene>
  );
};

const SCENES: Scenes = [
  [Question, 45],
  [Reponse, 150],
  [Bug, 135],
  [Pourquoi, 195],
  [Anecdote, 120],
  [EtDonc, 195],
  [Chute, 120],
];

export const TOKEN_DURATION = totalDuration(SCENES);

export const Token: React.FC = () => <Short scenes={SCENES} />;

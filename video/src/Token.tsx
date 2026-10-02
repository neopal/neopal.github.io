// PILOTE JETABLE : short Token, direction C (typo sur le beat), v5.
import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {loadFont as loadInter} from '@remotion/google-fonts/Inter';
import {loadFont as loadMono} from '@remotion/google-fonts/IBMPlexMono';

const {fontFamily: inter} = loadInter('normal', {weights: ['800'], subsets: ['latin']});
const {fontFamily: mono} = loadMono('normal', {weights: ['400', '600'], subsets: ['latin']});

const ACCENT = '#7CFFB2';
const RED = '#FF4D4D';
const GREY = '#d6d6d6';
const BEAT = 15; // 120 BPM à 30 i/s
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

// ---------- Briques d'animation ----------

const usePop = (at: number) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return spring({frame: frame - at, fps, config: {damping: 14, stiffness: 240, mass: 0.55}});
};

const Pop: React.FC<{at: number; children: React.ReactNode; style?: React.CSSProperties}> = ({at, children, style}) => {
  const p = usePop(at);
  const frame = useCurrentFrame();
  return (
    <div style={{opacity: frame >= at ? 1 : 0, transform: `scale(${0.7 + 0.3 * p}) translateY(${(1 - p) * 40}px)`, ...style}}>
      {children}
    </div>
  );
};

// Progression linéaire 0 -> 1 entre deux images.
const useProg = (from: number, to: number) => interpolate(useCurrentFrame(), [from, to], [0, 1], clamp);

const Big: React.FC<{children: React.ReactNode; size?: number; color?: string}> = ({children, size = 110, color = '#fff'}) => (
  <div style={{fontFamily: inter, fontWeight: 800, fontSize: size, lineHeight: 0.95, textTransform: 'uppercase', color, letterSpacing: '-0.01em'}}>{children}</div>
);

// Phrase à l'écran : casse normale, une vraie phrase (cf. univers.md, règles d'écriture).
const Say: React.FC<{children: React.ReactNode; size?: number; color?: string}> = ({children, size = 72, color = '#fff'}) => (
  <div style={{fontFamily: inter, fontWeight: 800, fontSize: size, lineHeight: 1.08, color, letterSpacing: '-0.015em'}}>{children}</div>
);

const Mono: React.FC<{children: React.ReactNode; size?: number; color?: string}> = ({children, size = 40, color = ACCENT}) => (
  <div style={{fontFamily: mono, fontWeight: 600, fontSize: size, color}}>{children}</div>
);

const Hi: React.FC<{children: React.ReactNode}> = ({children}) => <span style={{color: ACCENT}}>{children}</span>;

// Scène : entrée et sortie sèches sur le temps, légère poussée de caméra.
const Scene: React.FC<{children: React.ReactNode; gap?: number}> = ({children, gap = 40}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const enter = interpolate(frame, [0, 6], [0, 1], clamp);
  const exit = interpolate(frame, [durationInFrames - 5, durationInFrames], [0, 1], clamp);
  const push = 1 + 0.035 * (frame / durationInFrames);
  return (
    <AbsoluteFill
      style={{
        padding: '0 96px',
        justifyContent: 'center',
        gap,
        opacity: enter * (1 - exit),
        transform: `translateY(${(1 - enter) * 80 - exit * 80}px) scale(${push})`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

// Trait SVG qui se dessine (progression 0 -> 1).
const Draw: React.FC<{d: string; p: number; color?: string; width?: number; len?: number}> = ({d, p, color = ACCENT, width = 10, len = 400}) => (
  <path d={d} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={len} strokeDashoffset={len * (1 - p)} />
);

// ---------- Icônes (SVG maison) ----------

const Cross: React.FC<{p: number; size?: number}> = ({p, size = 150}) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <Draw d="M20 20 L80 80" p={Math.min(1, p * 2)} color={RED} width={12} len={90} />
    <Draw d="M80 20 L20 80" p={Math.max(0, p * 2 - 1)} color={RED} width={12} len={90} />
  </svg>
);

const Check: React.FC<{p: number; size?: number}> = ({p, size = 70}) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <Draw d="M18 52 L42 76 L84 26" p={p} width={12} len={110} />
  </svg>
);

const Lock: React.FC<{p: number; size?: number}> = ({p, size = 56}) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{transform: `translateY(${(1 - p) * -20}px)`, opacity: p}}>
    <rect x="22" y="46" width="56" height="42" rx="6" fill={ACCENT} />
    <path d={`M34 46 V${34 - 6 * (1 - p)} a16 16 0 0 1 32 0 V46`} fill="none" stroke={ACCENT} strokeWidth="9" />
  </svg>
);

const Eye: React.FC<{size?: number; look: number}> = ({size = 120, look}) => (
  <svg width={size} height={size * 0.6} viewBox="0 0 100 60">
    <path d="M5 30 Q50 -10 95 30 Q50 70 5 30 Z" fill="none" stroke="#fff" strokeWidth="6" />
    <circle cx={50 + look * 22} cy="30" r="12" fill={ACCENT} />
  </svg>
);

const Scissors: React.FC<{size?: number}> = ({size = 70}) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle cx="28" cy="74" r="14" fill="none" stroke={ACCENT} strokeWidth="7" />
    <circle cx="72" cy="74" r="14" fill="none" stroke={ACCENT} strokeWidth="7" />
    <path d="M36 62 L70 8 M64 62 L30 8" stroke={ACCENT} strokeWidth="7" strokeLinecap="round" />
  </svg>
);

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
                    <Big size={size} color={r ? ACCENT : '#fff'}>{l}</Big>
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

const Bubble: React.FC<{children: React.ReactNode; side: 'left' | 'right'; at: number}> = ({children, side, at}) => (
  <Pop at={at} style={{alignSelf: side === 'right' ? 'flex-end' : 'flex-start', background: side === 'right' ? '#2a2a2a' : 'transparent', border: side === 'left' ? '4px solid #444' : 'none', borderRadius: 34, padding: '24px 36px', maxWidth: 760}}>
    {children}
  </Pop>
);

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
            <Pop at={BEAT * 2.5}><Big size={220} color={RED}>2.</Big></Pop>
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
      <Pop at={0}><Say>En 2026, les modèles de raisonnement épellent le mot lettre par lettre avant de compter, comme toi en CP.</Say></Pop>
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
        <Big size={150} color={ACCENT}>{count}</Big>
        {count === 3 ? <Check p={interpolate(frame, [letterAt(8) + 4, letterAt(8) + 14], [0, 1], clamp)} size={110} /> : null}
      </div>
    </Scene>
  );
};

// ---------- Cadre ----------

// Ligne d'oscilloscope discrète en fond : l'amplitude suit le beat, plus forte au premier temps.
const Oscillo: React.FC = () => {
  const frame = useCurrentFrame();
  const inBeat = frame % BEAT;
  const downbeat = Math.floor(frame / BEAT) % 4 === 0;
  const amp = 6 + 38 * Math.exp(-inBeat / 5) * (downbeat ? 1 : 0.6);
  const W = 1080;
  const pts: string[] = [];
  for (let x = 0; x <= W; x += 6) {
    const env = Math.sin((Math.PI * x) / W); // nul aux bords
    const y = Math.sin(x / 38 + frame / 4) * 0.6 + Math.sin(x / 17 - frame / 3) * 0.4;
    pts.push(`${x},${(y * amp * env).toFixed(1)}`);
  }
  return (
    <svg width={W} height={200} viewBox={`0 -100 ${W} 200`} style={{position: 'absolute', left: 0, bottom: 230, opacity: 0.35}}>
      <polyline points={pts.join(' ')} fill="none" stroke={ACCENT} strokeWidth={3} />
    </svg>
  );
};

const Chrome: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  return (
    <>
      <div style={{position: 'absolute', top: 0, left: 0, height: 10, width: `${(frame / durationInFrames) * 100}%`, background: ACCENT}} />
      <div style={{position: 'absolute', bottom: 80, left: 96, fontFamily: inter, fontWeight: 800, fontSize: 30, color: '#6f6f6f'}}>neopal.github.io</div>
    </>
  );
};

const SCENES: [React.FC, number][] = [
  [Question, 45],
  [Reponse, 150],
  [Bug, 135],
  [Pourquoi, 195],
  [Anecdote, 120],
  [EtDonc, 195],
  [Chute, 120],
];

export const TOKEN_DURATION = SCENES.reduce((s, [, d]) => s + d, 0);

export const Token: React.FC = () => {
  let from = 0;
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <Audio src={staticFile('beat.mp3')} />
      <Oscillo />
      {SCENES.map(([C, d], i) => {
        const el = (
          <Sequence key={i} from={from} durationInFrames={d}>
            <C />
          </Sequence>
        );
        from += d;
        return el;
      })}
      <Chrome />
    </AbsoluteFill>
  );
};

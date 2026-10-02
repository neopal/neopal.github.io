// Short Harness : le même modèle, deux harness, deux scores.
// Accent = catégorie « agents » (#D7A6FF). Le kit partagé code le vert en dur dans le cadre et quelques icônes :
// les briques teintées sont redéfinies ici (exportées aussi pour le short MCP).
import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {BEAT, Big, Cross, Draw, GREY, Hi, Mono, Pop, RED, Say, Scene, Scenes, clamp, mono, totalDuration, usePop, useProg} from './kit';

// ---------- Briques teintées (agents) ----------

export const AC = '#D7A6FF';
export const acA = (a: number) => `rgba(215,166,255,${a})`;

export const OscilloA: React.FC<{color?: string}> = ({color = AC}) => {
  const frame = useCurrentFrame();
  const inBeat = frame % BEAT;
  const downbeat = Math.floor(frame / BEAT) % 4 === 0;
  const amp = 6 + 38 * Math.exp(-inBeat / 5) * (downbeat ? 1 : 0.6);
  const W = 1080;
  const pts: string[] = [];
  for (let x = 0; x <= W; x += 6) {
    const env = Math.sin((Math.PI * x) / W);
    const y = Math.sin(x / 38 + frame / 4) * 0.6 + Math.sin(x / 17 - frame / 3) * 0.4;
    pts.push(`${x},${(y * amp * env).toFixed(1)}`);
  }
  return (
    <svg width={W} height={200} viewBox={`0 -100 ${W} 200`} style={{position: 'absolute', left: 0, bottom: 230, opacity: 0.35}}>
      <polyline points={pts.join(' ')} fill="none" stroke={color} strokeWidth={3} />
    </svg>
  );
};

export const ChromeA: React.FC<{color?: string}> = ({color = AC}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  return (
    <>
      <div style={{position: 'absolute', top: 0, left: 0, height: 10, width: `${(frame / durationInFrames) * 100}%`, background: color}} />
      <div style={{position: 'absolute', bottom: 80, left: 96, fontFamily: mono, fontWeight: 600, fontSize: 28, color: '#6f6f6f'}}>neopal.github.io</div>
    </>
  );
};

export const ShortA: React.FC<{scenes: Scenes; color?: string}> = ({scenes, color = AC}) => {
  let from = 0;
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <Audio src={staticFile('beat.mp3')} />
      <OscilloA color={color} />
      {scenes.map(([C, d], i) => {
        const el = (
          <Sequence key={i} from={from} durationInFrames={d}>
            <C />
          </Sequence>
        );
        from += d;
        return el;
      })}
      <ChromeA color={color} />
    </AbsoluteFill>
  );
};

export const CheckA: React.FC<{p: number; size?: number}> = ({p, size = 70}) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <Draw d="M18 52 L42 76 L84 26" p={p} color={AC} width={12} len={110} />
  </svg>
);

export const LockA: React.FC<{p: number; size?: number; color?: string}> = ({p, size = 56, color = AC}) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{transform: `translateY(${(1 - p) * -20}px)`, opacity: p}}>
    <rect x="22" y="46" width="56" height="42" rx="6" fill={color} />
    <path d={`M34 46 V${34 - 6 * (1 - p)} a16 16 0 0 1 32 0 V46`} fill="none" stroke={color} strokeWidth="9" />
  </svg>
);

export const EyeA: React.FC<{size?: number; look: number}> = ({size = 120, look}) => (
  <svg width={size} height={size * 0.6} viewBox="0 0 100 60">
    <path d="M5 30 Q50 -10 95 30 Q50 70 5 30 Z" fill="none" stroke="#fff" strokeWidth="6" />
    <circle cx={50 + look * 22} cy="30" r="12" fill={AC} />
  </svg>
);

// Nombre à la française (une décimale si besoin).
export const fr = (n: number, dec = 1) => {
  const s = n.toFixed(dec).replace('.', ',');
  return s.endsWith(',0') ? s.slice(0, -2) : s;
};

// ---------- Le harness qui se construit autour du modèle ----------

const MODULES = [
  {label: 'consignes', en: 'system prompt', x: 175, y: 110},
  {label: 'outils', en: 'tools', x: 713, y: 110},
  {label: 'contexte', en: 'context', x: 175, y: 590},
  {label: 'permissions', en: 'permission mode', x: 713, y: 590},
];

const Rig: React.FC<{mods: number[]; ring: number; core?: string}> = ({mods, ring, core = 'modèle'}) => {
  const W = 888;
  const H = 700;
  const cx = 444;
  const cy = 350;
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{display: 'block', alignSelf: 'center', overflow: 'visible'}}>
      <rect x={6} y={6} width={W - 12} height={H - 12} rx={44} fill={acA(0.06 * ring)} stroke={AC} strokeWidth={6} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - ring} />
      {MODULES.map((m, k) => (
        <Draw key={m.label} d={`M${cx} ${cy} L${m.x} ${m.y}`} p={Math.min(1, mods[k] * 1.6)} color={acA(0.7)} width={5} len={400} />
      ))}
      {MODULES.map((m, k) => {
        const p = mods[k];
        if (p <= 0) return null;
        const s = 0.7 + 0.3 * Math.min(1, p);
        return (
          <g key={m.label} transform={`translate(${m.x} ${m.y}) scale(${s})`} opacity={Math.min(1, p * 2)}>
            <rect x={-145} y={-58} width={290} height={116} rx={22} fill="#0b0b0b" stroke={AC} strokeWidth={5} />
            <text x={0} y={-4} textAnchor="middle" fontFamily={mono} fontWeight={600} fontSize={38} fill="#fff">{m.label}</text>
            <text x={0} y={34} textAnchor="middle" fontFamily={mono} fontWeight={400} fontSize={24} fill="#8a8a8a">{m.en}</text>
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r={96} fill="#141414" stroke="#fff" strokeWidth={6} />
      <text x={cx} y={cy + 12} textAnchor="middle" fontFamily={mono} fontWeight={600} fontSize={36} fill="#fff">{core}</text>
      {ring > 0.98 ? (
        <g>
          <rect x={cx - 105} y={-20} width={210} height={52} rx={10} fill="#000" />
          <text x={cx} y={20} textAnchor="middle" fontFamily={mono} fontWeight={600} fontSize={40} fill={AC}>harness</text>
        </g>
      ) : null}
    </svg>
  );
};

// ---------- Scènes ----------

const Question: React.FC = () => (
  <Scene gap={14}>
    <Pop at={0}><Say size={110}>Qu'est-ce qu'un</Say></Pop>
    <Pop at={8}><Big size={200} color={AC}><span style={{whiteSpace: 'nowrap'}}>harness ?</span></Big></Pop>
  </Scene>
);

const Reponse: React.FC = () => {
  const frame = useCurrentFrame();
  const mods = [1.5, 2.5, 3.5, 4.5].map((b) => interpolate(frame, [BEAT * b, BEAT * b + 10], [0, 1], clamp));
  const ring = useProg(BEAT * 5.3, BEAT * 6.3);
  return (
    <Scene gap={44}>
      <Pop at={0}><Say size={64}>Le harness est tout le logiciel qui entoure un modèle pour en faire <Hi color={AC}>un agent.</Hi></Say></Pop>
      <Pop at={BEAT * 0.6}><Rig mods={mods} ring={ring} /></Pop>
      <div style={{height: 150}}>
        <Pop at={BEAT * 7}><Say size={58}>Claude Code, Codex et Gemini CLI sont tous les trois des <Hi color={AC}>harness.</Hi></Say></Pop>
      </div>
    </Scene>
  );
};

// Classement Terminal-Bench 2.1 (Snorkel, consulté le 2 oct. 2026) : chaque ligne nomme un modèle et un harness.
const RUNS = [
  {model: 'GPT-5.5', harness: 'Terminus 2', who: 'harness du benchmark', v: 78, house: false, at: 2},
  {model: 'GPT-5.5', harness: 'Codex CLI', who: "harness d'OpenAI", v: 83.1, house: true, at: 3.6},
  {model: 'Gemini 3 Pro', harness: 'Terminus 2', who: 'harness du benchmark', v: 73.9, house: false, at: 8.6},
  {model: 'Gemini 3 Pro', harness: 'Gemini CLI', who: 'harness de Google', v: 65.8, house: true, at: 10.2},
];

const Score: React.FC = () => {
  const frame = useCurrentFrame();
  const row = (r: (typeof RUNS)[number]) => {
    const g = interpolate(frame, [BEAT * r.at, BEAT * r.at + 20], [0, 1], clamp);
    const col = r.house ? AC : '#fff';
    return (
      <Pop key={r.model + r.harness} at={BEAT * r.at} style={{display: 'flex', flexDirection: 'column', gap: 6}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
          <div style={{display: 'flex', alignItems: 'baseline', gap: 16, whiteSpace: 'nowrap'}}>
            <Mono size={36} color="#fff">{r.model}</Mono>
            <Mono size={36} color={col}>{r.harness}</Mono>
          </div>
          <Mono size={46} color={col}>{fr(r.v * g)} %</Mono>
        </div>
        <div style={{position: 'relative', height: 50, background: '#161616'}}>
          <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: `${r.v * g}%`, background: col}} />
        </div>
        <Mono size={24} color="#8a8a8a">{r.who}</Mono>
      </Pop>
    );
  };
  return (
    <Scene gap={40}>
      <Pop at={0}><Say size={56}>Sur le classement <span style={{whiteSpace: 'nowrap'}}>Terminal-Bench 2.1</span>, le même GPT-5.5 réussit 78 % des tâches dans Terminus 2 et <Hi color={AC}>83,1 % dans Codex CLI.</Hi></Say></Pop>
      <div style={{display: 'flex', flexDirection: 'column', gap: 18}}>
        {row(RUNS[0])}
        {row(RUNS[1])}
        <div style={{height: 14}} />
        {row(RUNS[2])}
        {row(RUNS[3])}
      </div>
      <div style={{height: 200}}>
        <Pop at={BEAT * 8}><Say size={56}>Le harness maison ne gagne pas toujours, puisque Gemini 3 Pro fait mieux dans Terminus 2 que dans <Hi color={AC}>Gemini CLI.</Hi></Say></Pop>
      </div>
    </Scene>
  );
};

// Le vrai mécanisme : le harness envoie, le modèle demande, le harness exécute ou bloque.
const MSGS = [
  {dir: 'in', label: 'consignes + outils', at: 1.4, color: '#fff'},
  {dir: 'out', label: 'lire_fichier("notes.md")', at: 3, color: '#fff', verdict: 'ok'},
  {dir: 'in', label: 'contenu du fichier', at: 4.6, color: GREY},
  {dir: 'out', label: 'supprimer("projet/")', at: 6.2, color: '#fff', verdict: 'no'},
  {dir: 'in', label: 'action refusée', at: 7.8, color: RED},
] as const;

const Mecanisme: React.FC = () => {
  const frame = useCurrentFrame();
  const W = 888;
  const L = 110;
  const R = 772;
  const y0 = 170;
  const step = 112;
  return (
    <Scene gap={40}>
      <Pop at={0}><Say size={58}>Le harness envoie au modèle ses consignes et ses outils, puis <Hi color={AC}>exécute ou bloque</Hi> chaque action que le modèle demande.</Say></Pop>
      <Pop at={BEAT * 0.6}>
        <svg width={W} height={y0 + step * 5} viewBox={`0 0 ${W} ${y0 + step * 5}`} style={{display: 'block', overflow: 'visible'}}>
          <line x1={L} y1={100} x2={L} y2={y0 + step * 4.6} stroke="#333" strokeWidth={4} strokeDasharray="10 12" />
          <line x1={R} y1={100} x2={R} y2={y0 + step * 4.6} stroke={acA(0.45)} strokeWidth={4} strokeDasharray="10 12" />
          <circle cx={L} cy={52} r={64} fill="#141414" stroke="#fff" strokeWidth={5} />
          <text x={L} y={61} textAnchor="middle" fontFamily={mono} fontWeight={600} fontSize={26} fill="#fff">modèle</text>
          <rect x={R - 110} y={8} width={220} height={88} rx={22} fill={acA(0.1)} stroke={AC} strokeWidth={5} />
          <text x={R} y={64} textAnchor="middle" fontFamily={mono} fontWeight={600} fontSize={32} fill={AC}>harness</text>
          {MSGS.map((m, k) => {
            const p = interpolate(frame, [BEAT * m.at, BEAT * m.at + 12], [0, 1], clamp);
            if (p <= 0) return null;
            const y = y0 + k * step;
            const from = m.dir === 'in' ? R : L;
            const to = m.dir === 'in' ? L : R;
            const head = from + (to - from) * p;
            const sgn = to > from ? 1 : -1;
            const vp = interpolate(frame, [BEAT * (m.at + 0.8), BEAT * (m.at + 0.8) + 10], [0, 1], clamp);
            const stroke = m.color === GREY ? '#8a8a8a' : m.color;
            return (
              <g key={k}>
                <text x={(L + R) / 2} y={y - 22} textAnchor="middle" fontFamily={mono} fontWeight={600} fontSize={34} fill={m.color} opacity={Math.min(1, p * 2)}>{m.label}</text>
                <line x1={from} y1={y} x2={head} y2={y} stroke={stroke} strokeWidth={5} strokeLinecap="round" />
                <path d={`M${head - sgn * 22} ${y - 13} L${head} ${y} L${head - sgn * 22} ${y + 13}`} fill="none" stroke={stroke} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
                {'verdict' in m && vp > 0 ? (
                  <g>
                    <circle cx={R} cy={y} r={40} fill="#000" stroke={m.verdict === 'ok' ? AC : RED} strokeWidth={4} opacity={vp} />
                    {m.verdict === 'ok' ? (
                      <svg x={R - 30} y={y - 30} width={60} height={60} viewBox="0 0 100 100"><Draw d="M18 52 L42 76 L84 26" p={vp} color={AC} width={13} len={110} /></svg>
                    ) : (
                      <svg x={R - 30} y={y - 32} width={60} height={60} viewBox="0 0 100 100" opacity={vp}>
                        <rect x="22" y="46" width="56" height="42" rx="6" fill={RED} />
                        <path d={`M34 46 V${34 - 6 * (1 - vp)} a16 16 0 0 1 32 0 V46`} fill="none" stroke={RED} strokeWidth="9" />
                      </svg>
                    )}
                  </g>
                ) : null}
              </g>
            );
          })}
        </svg>
      </Pop>
      <div style={{height: 150}}>
        <Pop at={BEAT * 9.6}><Say size={58}>Changer de harness change donc ce que le modèle voit et ce qu'il <Hi color={AC}>a le droit de faire.</Hi></Say></Pop>
      </div>
    </Scene>
  );
};

// Qui a bougé, le modèle ou le harness ?
const EtDonc: React.FC = () => {
  const frame = useCurrentFrame();
  const focus = frame < BEAT * 2.2 ? -1 : Math.floor((frame - BEAT * 2.2) / (BEAT * 1.4)) % 2;
  const card = (label: string, value: string, k: number, at: number) => {
    const on = focus === k;
    return (
      <Pop at={at} style={{display: 'flex', alignItems: 'center', gap: 24, border: `5px solid ${on ? AC : '#333'}`, background: on ? acA(0.08) : 'transparent', borderRadius: 28, padding: '22px 30px', height: 170}}>
        <div style={{width: 180}}><Mono size={36} color={GREY}>{label}</Mono></div>
        <div style={{flex: 1, whiteSpace: 'nowrap'}}><Big size={68} color={on ? AC : '#fff'}>{value}</Big></div>
        <div style={{width: 130, display: 'flex', justifyContent: 'center'}}>
          {on ? <EyeA look={Math.sin(frame / 3)} size={110} /> : <Mono size={64} color="#555">?</Mono>}
        </div>
      </Pop>
    );
  };
  return (
    <Scene gap={44}>
      <Pop at={0}><Say size={58}>Et donc, quand Claude Code change de comportement du jour au lendemain, vérifie lequel des deux, du modèle ou du harness, <Hi color={AC}>a été mis à jour.</Hi></Say></Pop>
      <div style={{display: 'flex', flexDirection: 'column', gap: 28}}>
        {card('modèle', 'Claude', 0, BEAT * 1.2)}
        {card('harness', 'Claude Code', 1, BEAT * 1.8)}
      </div>
    </Scene>
  );
};

// Modèle + harness = agent ; on change le harness, le score change.
const Chute: React.FC = () => {
  const frame = useCurrentFrame();
  const c1 = useProg(BEAT * 1, BEAT * 1.8);
  const c2 = useProg(BEAT * 2, BEAT * 2.8);
  const merge = usePop(BEAT * 3.4);
  const swap = frame >= BEAT * 5.4;
  const swapPop = usePop(BEAT * 5.4);
  const g = interpolate(frame, [BEAT * 3.6, BEAT * 4.6], [0, 1], clamp);
  const score = swap ? 78 + (83.1 - 78) * swapPop : 78 * g;
  return (
    <Scene gap={50}>
      <Pop at={0}><Say size={60}>Un agent est donc toujours un modèle et son harness, et changer le harness suffit à <Hi color={AC}>changer le score.</Hi></Say></Pop>
      <svg width={888} height={300} viewBox="0 0 888 300" style={{display: 'block', overflow: 'visible'}}>
        <circle cx={110} cy={150} r={80} fill="#141414" fillOpacity={c1} stroke="#fff" strokeWidth={5} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - c1} />
        <text x={110} y={160} textAnchor="middle" fontFamily={mono} fontWeight={600} fontSize={28} fill="#fff" opacity={c1}>modèle</text>
        <text x={232} y={168} textAnchor="middle" fontFamily={mono} fontWeight={600} fontSize={56} fill={GREY} opacity={c2}>+</text>
        <rect x={290} y={70} width={210} height={160} rx={30} fill="none" stroke={AC} strokeWidth={6} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - c2} />
        <text x={395} y={162} textAnchor="middle" fontFamily={mono} fontWeight={600} fontSize={30} fill={AC} opacity={c2}>harness</text>
        <g opacity={frame >= BEAT * 3.4 ? 1 : 0} transform={`translate(0 ${(1 - merge) * 30})`}>
          <text x={548} y={168} textAnchor="middle" fontFamily={mono} fontWeight={600} fontSize={56} fill={GREY}>=</text>
          <rect x={600} y={20} width={288} height={260} rx={40} fill={acA(0.08)} stroke={AC} strokeWidth={6} />
          <circle cx={744} cy={120} r={56} fill="#141414" stroke="#fff" strokeWidth={5} />
          <text x={744} y={130} textAnchor="middle" fontFamily={mono} fontWeight={600} fontSize={24} fill="#fff">modèle</text>
          <text x={744} y={232} textAnchor="middle" fontFamily={mono} fontWeight={600} fontSize={28} fill={AC}>{swap ? 'Codex CLI' : 'Terminus 2'}</text>
        </g>
      </svg>
      <Pop at={BEAT * 3.6} style={{display: 'flex', alignItems: 'baseline', justifyContent: 'flex-end', gap: 24}}>
        <div style={{whiteSpace: 'nowrap'}}><Mono size={30} color={GREY}>GPT-5.5, Terminal-Bench 2.1</Mono></div>
        <div style={{width: 400, textAlign: 'right', whiteSpace: 'nowrap'}}><Big size={120} color={swap ? AC : '#fff'}>{fr(score)} %</Big></div>
      </Pop>
    </Scene>
  );
};

const SCENES: Scenes = [
  [Question, 60],
  [Reponse, 180],
  [Score, 240],
  [Mecanisme, 225],
  [EtDonc, 135],
  [Chute, 120],
];

export const HARNESS_DURATION = totalDuration(SCENES);

export const Harness: React.FC = () => <ShortA scenes={SCENES} />;

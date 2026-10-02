// Short Harness : le même modèle, deux harness, deux scores (catégorie Agents, accent violet).
// Scène propre à ce short : le diagramme d'échanges modèle / harness, où le harness exécute une demande et en bloque une autre.
import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {ACCENTS, BEAT, Big, Check, Cross, DIM, Draw, GREY, Mono, Pop, RED, Scene, Scenes, Short, W, clamp, mono, svgPx, totalDuration, usePop, useProg, withAlpha} from './kit';

const AC = ACCENTS.agents;
const acA = (a: number) => withAlpha(AC, a);

// Nombre à la française (une décimale si besoin).
export const fr = (n: number, dec = 1) => {
  const s = n.toFixed(dec).replace('.', ',');
  return s.endsWith(',0') ? s.slice(0, -2) : s;
};

// ---------- Le harness qui se construit autour du modèle ----------

const MODULES = [
  {label: 'consignes', x: 175, y: 110},
  {label: 'outils', x: 713, y: 110},
  {label: 'contexte', x: 175, y: 530},
  {label: 'permissions', x: 713, y: 530},
];

const Rig: React.FC<{mods: number[]; ring: number}> = ({mods, ring}) => {
  const H = 640;
  const cx = W / 2;
  const cy = 320;
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
            <rect x={-150} y={-50} width={300} height={100} rx={22} fill="#0b0b0b" stroke={AC} strokeWidth={5} />
            <text x={0} y={13} textAnchor="middle" fontFamily={mono} fontWeight={600} fontSize={svgPx(40)} fill="#fff">{m.label}</text>
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r={100} fill="#141414" stroke="#fff" strokeWidth={6} />
      <text x={cx} y={cy + 14} textAnchor="middle" fontFamily={mono} fontWeight={600} fontSize={svgPx(40)} fill="#fff">modèle</text>
      {ring > 0.98 ? (
        <g>
          <rect x={cx - 110} y={-22} width={220} height={56} rx={10} fill="#000" />
          <text x={cx} y={20} textAnchor="middle" fontFamily={mono} fontWeight={600} fontSize={svgPx(44)} fill={AC}>harness</text>
        </g>
      ) : null}
    </svg>
  );
};

// ---------- Scènes ----------

const Reponse: React.FC = () => {
  const frame = useCurrentFrame();
  const mods = [1.5, 2.5, 3.5, 4.5].map((b) => interpolate(frame, [BEAT * b, BEAT * b + 10], [0, 1], clamp));
  const ring = useProg(BEAT * 5.3, BEAT * 6.3);
  return (
    <Scene
      caps={[
        [0, 'Le harness est tout le logiciel qui entoure un modèle pour en faire un agent.'],
        [160, 'Claude Code, Codex et Gemini CLI sont tous les trois des harness.'],
      ]}
    >
      <Pop at={BEAT * 0.6}><Rig mods={mods} ring={ring} /></Pop>
    </Scene>
  );
};

// Classement Terminal-Bench 2.1 (Snorkel, consulté le 2 oct. 2026) : chaque ligne nomme un modèle et un harness.
const GEM = 205;
const RUNS = [
  {model: 'GPT-5.5', harness: 'Terminus 2', v: 78, house: false, at: BEAT * 2},
  {model: 'GPT-5.5', harness: 'Codex CLI', v: 83.1, house: true, at: BEAT * 4},
  {model: 'Gemini 3 Pro', harness: 'Terminus 2', v: 73.9, house: false, at: GEM + BEAT},
  {model: 'Gemini 3 Pro', harness: 'Gemini CLI', v: 65.8, house: true, at: GEM + BEAT * 2.6},
];

const Score: React.FC = () => {
  const frame = useCurrentFrame();
  const row = (r: (typeof RUNS)[number]) => {
    const g = interpolate(frame, [r.at, r.at + 20], [0, 1], clamp);
    const col = r.house ? AC : '#fff';
    return (
      <Pop key={r.model + r.harness} at={r.at} style={{display: 'flex', flexDirection: 'column', gap: 6}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
          <div style={{display: 'flex', alignItems: 'baseline', gap: 16}}>
            <Mono size={38} color={GREY}>{r.model}</Mono>
            <Mono size={38} color={col}>{r.harness}</Mono>
          </div>
          <Mono size={48} color={col}>{fr(r.v * g)} %</Mono>
        </div>
        <div style={{position: 'relative', height: 50, background: '#161616'}}>
          <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: `${r.v * g}%`, background: col}} />
        </div>
      </Pop>
    );
  };
  return (
    <Scene
      caps={[
        [0, 'Sur Terminal-Bench 2.1, le même GPT-5.5 réussit 78 % des tâches dans Terminus 2 et 83,1 % dans Codex CLI.'],
        [GEM, 'Le harness maison ne gagne pas toujours, puisque Gemini 3 Pro fait mieux dans Terminus 2.'],
      ]}
      gap={22}
      bottom={
        <Pop at={BEAT * 4.6} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18}}>
          <div style={{width: 40, height: 28, background: AC}} />
          <Mono size={40} color={DIM}>harness du labo qui a fait le modèle</Mono>
        </Pop>
      }
    >
      {row(RUNS[0])}
      {row(RUNS[1])}
      <div style={{height: 30}} />
      {row(RUNS[2])}
      {row(RUNS[3])}
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
  const L = 100;
  const R = 770;
  const y0 = 220;
  const step = 98;
  const H = y0 + step * 4.4;
  return (
    <Scene caps={[[0, 'Le harness envoie au modèle ses consignes et ses outils, puis *exécute ou bloque* chaque action demandée.']]}>
      <Pop at={BEAT * 0.6}>
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{display: 'block', overflow: 'visible'}}>
          <line x1={L} y1={140} x2={L} y2={H} stroke="#333" strokeWidth={4} strokeDasharray="10 12" />
          <line x1={R} y1={140} x2={R} y2={H} stroke={acA(0.45)} strokeWidth={4} strokeDasharray="10 12" />
          <circle cx={L} cy={66} r={86} fill="#141414" stroke="#fff" strokeWidth={5} />
          <text x={L} y={79} textAnchor="middle" fontFamily={mono} fontWeight={600} fontSize={svgPx(36)} fill="#fff">modèle</text>
          <rect x={R - 120} y={16} width={240} height={100} rx={22} fill={acA(0.1)} stroke={AC} strokeWidth={5} />
          <text x={R} y={79} textAnchor="middle" fontFamily={mono} fontWeight={600} fontSize={svgPx(40)} fill={AC}>harness</text>
          {MSGS.map((m, k) => {
            const p = interpolate(frame, [BEAT * m.at, BEAT * m.at + 12], [0, 1], clamp);
            if (p <= 0) return null;
            const y = y0 + k * step;
            const from = m.dir === 'in' ? R : L;
            const to = m.dir === 'in' ? L : R;
            const head = from + (to - from) * p;
            const sgn = to > from ? 1 : -1;
            const vp = interpolate(frame, [BEAT * (m.at + 0.8), BEAT * (m.at + 0.8) + 10], [0, 1], clamp);
            const stroke = m.color === GREY ? '#9a9a9a' : m.color;
            return (
              <g key={k}>
                <text x={(L + R) / 2} y={y - 18} textAnchor="middle" fontFamily={mono} fontWeight={600} fontSize={svgPx(36)} fill={m.color} opacity={Math.min(1, p * 2)}>{m.label}</text>
                <line x1={from} y1={y} x2={head} y2={y} stroke={stroke} strokeWidth={5} strokeLinecap="round" />
                <path d={`M${head - sgn * 22} ${y - 13} L${head} ${y} L${head - sgn * 22} ${y + 13}`} fill="none" stroke={stroke} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
                {'verdict' in m && vp > 0 ? (
                  <g>
                    <circle cx={R + 60} cy={y} r={36} fill="#000" stroke={m.verdict === 'ok' ? AC : RED} strokeWidth={4} opacity={vp} />
                    {m.verdict === 'ok' ? (
                      <svg x={R + 33} y={y - 27} width={54} height={54} viewBox="0 0 100 100"><Draw d="M18 52 L42 76 L84 26" p={vp} color={AC} width={13} len={110} /></svg>
                    ) : (
                      <svg x={R + 33} y={y - 29} width={54} height={54} viewBox="0 0 100 100" opacity={vp}>
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
    </Scene>
  );
};

// Le journal des mises à jour se déroule ; le curseur cherche le jour où le comportement a changé.
// Entrées génériques (jours de la semaine, actions types) : ce n'est pas le vrai journal de Claude Code.
const LOG = [
  {day: 'lun.', tag: 'harness', what: 'correctif'},
  {day: 'mar.', tag: 'modèle', what: 'nouvelle version'},
  {day: 'mer.', tag: 'harness', what: 'nouvel outil'},
  {day: 'jeu.', tag: 'harness', what: 'consignes réécrites'},
  {day: 'ven.', tag: 'harness', what: 'correctif'},
] as const;
const HIT = 3;
const MODEL_ROW = 1;
const LOG_ROW = 96;

const EtDonc: React.FC = () => {
  const frame = useCurrentFrame();
  const lineAt = (k: number) => BEAT * 2.2 + k * 7;
  const scanFrom = BEAT * 5;
  const scanTo = BEAT * 6.6;
  const cur = interpolate(frame, [scanFrom, scanTo], [0, HIT], {...clamp, easing: (t) => 1 - Math.pow(1 - t, 2)});
  const landed = frame >= scanTo;
  const ok = useProg(scanTo + 2, scanTo + 10);
  const rule = useProg(scanTo + 8, scanTo + 16);
  return (
    <Scene
      caps={[[0, 'Quand Claude Code change de comportement, regarde qui a été mis à jour, le modèle ou le harness.']]}
      gap={24}
      bottom={
        <Pop at={BEAT * 1.2} style={{display: 'flex', alignItems: 'center', gap: 20}}>
          <div style={{width: 28, height: 28, borderRadius: 14, background: RED}} />
          <Mono size={40} color="#fff">jeu.</Mono>
          <Mono size={40} color={GREY}>il répond autrement</Mono>
        </Pop>
      }
    >
      <Pop at={BEAT * 1.8}>
        <div style={{border: '4px solid #333', borderRadius: 28, padding: '22px 26px 18px'}}>
          <Mono size={38} color={DIM}>journal des mises à jour</Mono>
          <div style={{position: 'relative', marginTop: 16, height: LOG.length * LOG_ROW}}>
            {frame >= scanFrom ? (
              <div style={{position: 'absolute', left: -12, right: -12, top: cur * LOG_ROW, height: LOG_ROW - 14, borderRadius: 16, border: `4px solid ${landed ? AC : acA(0.5)}`, background: acA(landed ? 0.14 : 0.05)}} />
            ) : null}
            {LOG.map((e, k) => {
              if (frame < lineAt(k)) return null;
              const type = interpolate(frame, [lineAt(k), lineAt(k) + 6], [0, 1], clamp);
              const ruledOut = k === MODEL_ROW && rule > 0;
              const harness = e.tag === 'harness';
              return (
                <div key={k} style={{position: 'absolute', left: 0, right: 0, top: k * LOG_ROW, height: LOG_ROW - 14, display: 'flex', alignItems: 'center', gap: 18, opacity: ruledOut ? 1 - 0.55 * rule : 1}}>
                  <div style={{width: 96}}><Mono size={36} color={k === HIT ? '#fff' : GREY}>{e.day}</Mono></div>
                  <div style={{width: 196, border: `3px solid ${harness ? AC : '#fff'}`, borderRadius: 12, padding: '2px 0', display: 'flex', justifyContent: 'center'}}>
                    <Mono size={36} color={harness ? AC : '#fff'}>{e.tag}</Mono>
                  </div>
                  <div style={{flex: 1, overflow: 'hidden', clipPath: `inset(0 ${(1 - type) * 100}% 0 0)`}}>
                    <Mono size={36} color={GREY}>{e.what}</Mono>
                  </div>
                  <div style={{width: 64, display: 'flex', justifyContent: 'center'}}>
                    {k === HIT && ok > 0 ? <Check p={ok} size={60} color={AC} /> : null}
                    {ruledOut ? <Cross p={rule} size={50} /> : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Pop>
    </Scene>
  );
};

// Modèle + harness = agent ; on change le harness, le score change.
const Chute: React.FC = () => {
  const frame = useCurrentFrame();
  const c1 = useProg(BEAT * 1, BEAT * 1.8);
  const c2 = useProg(BEAT * 2, BEAT * 2.8);
  const merge = usePop(BEAT * 3.4);
  const swapAt = BEAT * 7;
  const swap = frame >= swapAt;
  const swapPop = usePop(swapAt);
  const g = interpolate(frame, [BEAT * 3.6, BEAT * 4.6], [0, 1], clamp);
  const score = swap ? 78 + (83.1 - 78) * swapPop : 78 * g;
  return (
    <Scene
      caps={[[0, "Un agent, c'est donc toujours un modèle et son harness, et changer le harness suffit à *changer le score*."]]}
      gap={40}
      bottom={
        <Pop at={BEAT * 3.6} style={{display: 'flex', justifyContent: 'center'}}>
          <Mono size={40} color={DIM}>GPT-5.5 sur Terminal-Bench 2.1</Mono>
        </Pop>
      }
    >
      <svg width={W} height={320} viewBox={`0 0 ${W} 320`} style={{display: 'block', overflow: 'visible'}}>
        <circle cx={96} cy={160} r={92} fill="#141414" fillOpacity={c1} stroke="#fff" strokeWidth={5} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - c1} />
        <text x={96} y={173} textAnchor="middle" fontFamily={mono} fontWeight={600} fontSize={svgPx(36)} fill="#fff" opacity={c1}>modèle</text>
        <text x={222} y={180} textAnchor="middle" fontFamily={mono} fontWeight={600} fontSize={svgPx(56)} fill={GREY} opacity={c2}>+</text>
        <rect x={262} y={90} width={190} height={140} rx={30} fill="none" stroke={AC} strokeWidth={6} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - c2} />
        <text x={357} y={173} textAnchor="middle" fontFamily={mono} fontWeight={600} fontSize={svgPx(36)} fill={AC} opacity={c2}>harness</text>
        <g opacity={frame >= BEAT * 3.4 ? 1 : 0} transform={`translate(0 ${(1 - merge) * 30})`}>
          <text x={492} y={180} textAnchor="middle" fontFamily={mono} fontWeight={600} fontSize={svgPx(56)} fill={GREY}>=</text>
          <rect x={534} y={10} width={354} height={300} rx={40} fill={acA(0.08)} stroke={AC} strokeWidth={6} />
          <circle cx={711} cy={120} r={78} fill="#141414" stroke="#fff" strokeWidth={5} />
          <text x={711} y={133} textAnchor="middle" fontFamily={mono} fontWeight={600} fontSize={svgPx(36)} fill="#fff">modèle</text>
          <text x={711} y={262} textAnchor="middle" fontFamily={mono} fontWeight={600} fontSize={svgPx(40)} fill={AC}>{swap ? 'Codex CLI' : 'Terminus 2'}</text>
        </g>
      </svg>
      <Pop at={BEAT * 3.6} style={{display: 'flex', justifyContent: 'flex-end'}}>
        <Big size={150} color="#fff">{fr(score)} %</Big>
      </Pop>
    </Scene>
  );
};

const SCENES: Scenes = [
  [Reponse, 280],
  [Score, 360],
  [Mecanisme, 220],
  [EtDonc, 200],
  [Chute, 205],
];

export const HARNESS_DURATION = totalDuration(SCENES);

export const Harness: React.FC = () => <Short title={["Qu'est-ce qu'un", 'harness ?']} scenes={SCENES} accent={AC} />;

// Short Agent (fiche agent) : un modèle qu'on laisse choisir l'étape suivante (catégorie Agents, accent violet).
// Scènes propres à ce short : le rail du workflow tracé d'un coup contre la route de l'agent qui se décide à chaque fourche,
// et la nuit de Clio, de 18 h à midi le lendemain, sur une frise où la lune laisse place au soleil.
import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {ACCENTS, BEAT, Big, Check, DIM, Draw, GREY, Lock, Mono, Pop, RED, Scene, Scenes, Short, W, clamp, mono, svgPx, totalDuration, usePop, useProg, withAlpha} from './kit';

const AC = ACCENTS.agents;
const acA = (a: number) => withAlpha(AC, a);

// Libellé mono en SVG.
const T: React.FC<{x: number; y: number; size?: number; fill?: string; anchor?: 'start' | 'middle' | 'end'; opacity?: number; children: React.ReactNode}> = ({x, y, size = 36, fill = '#fff', anchor = 'middle', opacity = 1, children}) => (
  <text x={x} y={y} textAnchor={anchor} fontFamily={mono} fontWeight={600} fontSize={svgPx(size)} fill={fill} opacity={opacity}>{children}</text>
);

// ---------- 1. La réponse : un modèle, un objectif, des outils ----------

const TOOLS = [
  {label: 'chercher_trains', x: 222, at: 3.4},
  {label: 'ajouter_agenda', x: 666, at: 4.2},
];

const Reponse: React.FC = () => {
  const frame = useCurrentFrame();
  const goal = useProg(BEAT * 1.6, BEAT * 2.4);
  const model = usePop(BEAT * 2.4);
  return (
    <Scene caps={[[0, "Un agent est un modèle qu'on laisse agir, avec des outils."]]} gap={0}>
      <Pop at={BEAT * 0.8} style={{border: `4px solid ${AC}`, borderRadius: 26, padding: '18px 28px', background: acA(0.08)}}>
        <Mono size={36} color={DIM}>objectif (exemple de la fiche)</Mono>
        <div style={{height: 10}} />
        <Mono size={38} color="#fff">trouve-moi un train pour Lyon</Mono>
        <Mono size={38} color="#fff">jeudi et mets-le dans mon agenda</Mono>
      </Pop>
      <svg width={W} height={400} viewBox={`0 0 ${W} 400`} style={{display: 'block', overflow: 'visible'}}>
        <Draw d={`M${W / 2} 0 L${W / 2} 70`} p={goal} color={AC} width={6} len={80} />
        <g opacity={frame >= BEAT * 2.4 ? 1 : 0} transform={`translate(${W / 2} 150) scale(${0.7 + 0.3 * model})`}>
          <circle r={84} fill="#141414" stroke="#fff" strokeWidth={6} />
          <T x={0} y={13}>modèle</T>
        </g>
        {TOOLS.map((t) => {
          const line = interpolate(frame, [BEAT * t.at, BEAT * t.at + 8], [0, 1], clamp);
          const box = interpolate(frame, [BEAT * t.at + 4, BEAT * t.at + 12], [0, 1], clamp);
          return (
            <g key={t.label}>
              <Draw d={`M${W / 2} 234 L${t.x} 316`} p={line} color={acA(0.7)} width={5} len={500} />
              <g opacity={box} transform={`translate(${t.x} 340) scale(${0.8 + 0.2 * box})`}>
                <rect x={-205} y={-40} width={410} height={80} rx={18} fill="#0b0b0b" stroke={AC} strokeWidth={5} />
                <T x={0} y={13} fill={AC}>{t.label}</T>
              </g>
            </g>
          );
        })}
      </svg>
    </Scene>
  );
};

// ---------- 2. Workflow contre agent : qui choisit l'étape suivante ----------

const XS = [60, 315, 570, 825];
const YS = [50, 150, 250];
const ROUTE = [1, 0, 2, 1]; // la rangée choisie à chaque niveau (illustratif)
const START = 40;
const STEP = 34;

const Fourche: React.FC = () => {
  const frame = useCurrentFrame();
  const rail = useProg(BEAT * 0.8, BEAT * 0.8 + 8);
  const lvl = (frame - START) / STEP; // progression du point, en niveaux
  // Le point du workflow avance au même rythme que celui de l'agent.
  const wfx = interpolate(frame, [START, START + STEP * 3], [XS[0], XS[3]], clamp);
  // Position du point de l'agent : il ne quitte un niveau qu'après le choix (12 images après l'arrivée).
  const agentPos = () => {
    if (frame < START) return {x: XS[0], y: YS[ROUTE[0]]};
    const i = Math.min(2, Math.floor(lvl));
    const local = frame - (START + STEP * i);
    if (lvl >= 3) return {x: XS[3], y: YS[ROUTE[3]]};
    const m = interpolate(local, [12, STEP], [0, 1], clamp);
    return {x: XS[i] + (XS[i + 1] - XS[i]) * m, y: YS[ROUTE[i]] + (YS[ROUTE[i + 1]] - YS[ROUTE[i]]) * m};
  };
  const a = agentPos();
  const done = useProg(START + STEP * 3, START + STEP * 3 + 10);
  return (
    <Scene
      caps={[[0, "Un workflow suit un chemin écrit d'avance, alors qu'un agent choisit sa route."]]}
      gap={18}
      bottom={
        <Pop at={BEAT * 6} style={{display: 'flex', justifyContent: 'center'}}>
          <Mono size={40} color={DIM}>selon Anthropic, déc. 2024</Mono>
        </Pop>
      }
    >
      <Pop at={BEAT * 0.4} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
        <Mono size={44} color="#fff">workflow</Mono>
        <Mono size={36} color={DIM}>fixé par un développeur</Mono>
      </Pop>
      <svg width={W} height={110} viewBox={`0 0 ${W} 110`} style={{display: 'block', overflow: 'visible'}}>
        <line x1={XS[0]} y1={55} x2={XS[0] + (XS[3] - XS[0]) * rail} y2={55} stroke="#fff" strokeWidth={6} />
        {XS.map((x, k) => (
          <g key={k} opacity={rail >= k / 3 ? 1 : 0}>
            <circle cx={x} cy={55} r={36} fill="#141414" stroke="#fff" strokeWidth={5} />
            <T x={x} y={68}>{k + 1}</T>
          </g>
        ))}
        {frame >= START ? <circle cx={wfx} cy={55} r={16} fill="#fff" /> : null}
      </svg>
      <div style={{height: 20}} />
      <Pop at={BEAT * 2} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
        <Mono size={44} color={AC}>agent</Mono>
        <Mono size={36} color={DIM}>le modèle choisit à chaque étape</Mono>
      </Pop>
      <svg width={W} height={300} viewBox={`0 0 ${W} 300`} style={{display: 'block', overflow: 'visible'}}>
        {[0, 1, 2].map((i) => {
          const t0 = START + STEP * i;
          const show = interpolate(frame, [t0 - 10, t0], [0, 1], clamp);
          const pick = interpolate(frame, [t0 + 4, t0 + 12], [0, 1], clamp);
          const fx = XS[i];
          const fy = YS[ROUTE[i]];
          return (
            <g key={i}>
              {YS.map((y, r) => {
                const chosen = r === ROUTE[i + 1];
                return (
                  <g key={r} opacity={show}>
                    <line x1={fx} y1={fy} x2={XS[i + 1]} y2={y} stroke={chosen && pick > 0 ? AC : '#444'} strokeWidth={chosen ? 4 + 3 * pick : 4} strokeDasharray={chosen && pick > 0 ? undefined : '10 10'} />
                    <circle cx={XS[i + 1]} cy={y} r={chosen ? 22 + 6 * pick : 22} fill={chosen && pick > 0 ? acA(0.25 + 0.5 * pick) : '#111'} stroke={chosen && pick > 0 ? AC : '#555'} strokeWidth={4} />
                  </g>
                );
              })}
            </g>
          );
        })}
        <circle cx={XS[0]} cy={YS[ROUTE[0]]} r={28} fill={acA(0.6)} stroke={AC} strokeWidth={4} opacity={frame >= BEAT * 2 ? 1 : 0} />
        {frame >= START - 10 ? <circle cx={a.x} cy={a.y} r={16} fill="#fff" /> : null}
        {done > 0 ? (
          <svg x={XS[3] - 4} y={YS[ROUTE[3]] - 92} width={70} height={70} viewBox="0 0 100 100">
            <Draw d="M18 52 L42 76 L84 26" p={done} color={AC} width={13} len={110} />
          </svg>
        ) : null}
      </svg>
    </Scene>
  );
};

// ---------- 3. Le mécanisme : lire le résultat, choisir la suite ----------

type Seg = {t: string; c?: string};
type Row = {who: 'model' | 'prog'; segs: Seg[]; at: number};
const ROWS: Row[] = [
  {who: 'model', segs: [{t: 'chercher_trains(Lyon, jeudi)'}], at: 12},
  {who: 'prog', segs: [{t: '8 h 04 et 9 h 04 '}, {t: 'complets', c: RED}], at: 44},
  {who: 'model', segs: [{t: 'chercher_trains(Lyon, jeudi, '}, {t: '10 h+', c: AC}, {t: ')'}], at: 78},
  {who: 'prog', segs: [{t: '10 h 04, '}, {t: '2 places libres', c: AC}], at: 110},
  {who: 'model', segs: [{t: 'ajouter_agenda(jeudi 10 h 04)'}], at: 142},
  {who: 'prog', segs: [{t: 'ajouté', c: AC}], at: 176},
  {who: 'model', segs: [{t: 'tâche finie, je réponds'}], at: 206},
];
const CAP2 = 175;
const ROW_H = 82;

const Marker: React.FC<{who: Row['who']; glow: number}> = ({who, glow}) =>
  who === 'model' ? (
    <div style={{width: 30, height: 30, borderRadius: 15, background: '#fff'}} />
  ) : (
    <div style={{width: 30, height: 30, background: AC, boxShadow: `0 0 ${30 * glow}px ${12 * glow}px ${acA(0.6)}`}} />
  );

const Mecanisme: React.FC = () => {
  const frame = useCurrentFrame();
  const glow = interpolate(frame, [CAP2 + 50, CAP2 + 64], [0, 1], clamp);
  const fin = useProg(ROWS[6].at + 14, ROWS[6].at + 24);
  return (
    <Scene
      caps={[
        [0, 'Il lit le résultat de chaque action avant de choisir la suivante.'],
        [CAP2, 'Ce sont les programmes autour de lui qui exécutent ses demandes.'],
      ]}
      gap={0}
      bottom={
        <div style={{display: 'flex', flexDirection: 'column', gap: 14}}>
          <Pop at={ROWS[0].at} style={{display: 'flex', alignItems: 'center', gap: 20}}>
            <Marker who="model" glow={0} />
            <Mono size={38} color={GREY}>le modèle écrit une demande</Mono>
          </Pop>
          <Pop at={ROWS[1].at} style={{display: 'flex', alignItems: 'center', gap: 20}}>
            <Marker who="prog" glow={glow} />
            <Mono size={38} color={glow > 0.5 ? AC : GREY}>un programme l'exécute</Mono>
          </Pop>
        </div>
      }
    >
      {ROWS.map((r, k) => {
        if (frame < r.at) return <div key={k} style={{height: ROW_H}} />;
        const type = r.who === 'model' ? interpolate(frame, [r.at, r.at + 12], [0, 1], clamp) : 1;
        const p = interpolate(frame, [r.at, r.at + 6], [0, 1], clamp);
        const dim = r.who === 'model' ? 1 - 0.45 * glow : 1;
        return (
          <div key={k} style={{height: ROW_H, display: 'flex', alignItems: 'center', gap: 22, paddingLeft: r.who === 'prog' ? 52 : 0, opacity: p * dim, background: r.who === 'prog' ? acA(0.1 * glow) : 'transparent', borderRadius: 14}}>
            <Marker who={r.who} glow={glow} />
            <div style={{clipPath: `inset(0 ${(1 - type) * 100}% 0 0)`, display: 'flex'}}>
              {r.segs.map((s, j) => (
                <Mono key={j} size={36} color={s.c ?? (r.who === 'model' ? '#fff' : GREY)}>{s.t.replace(/ /g, '\u00a0')}</Mono>
              ))}
            </div>
            {k === 6 && fin > 0 ? <Check p={fin} size={56} color={AC} /> : null}
          </div>
        );
      })}
    </Scene>
  );
};

// ---------- 4. L'anecdote : une nuit entière sur la même tâche ----------

const Moon: React.FC<{x: number; y: number; o: number}> = ({x, y, o}) => (
  <g opacity={o} transform={`translate(${x} ${y})`}>
    <path d="M10 -30 A30 30 0 1 0 30 12 A24 24 0 1 1 10 -30 Z" fill="#e8e8e8" />
  </g>
);
const Sun: React.FC<{x: number; y: number; o: number}> = ({x, y, o}) => (
  <g opacity={o} transform={`translate(${x} ${y})`}>
    <circle r={22} fill={AC} />
    {Array.from({length: 8}, (_, k) => {
      const an = (k * Math.PI) / 4;
      return <line key={k} x1={Math.cos(an) * 32} y1={Math.sin(an) * 32} x2={Math.cos(an) * 44} y2={Math.sin(an) * 44} stroke={AC} strokeWidth={5} strokeLinecap="round" />;
    })}
  </g>
);

const NIGHT_FROM = BEAT * 1.4;
const NIGHT_TO = BEAT * 8;

const Nuit: React.FC = () => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [NIGHT_FROM, NIGHT_TO], [0, 1], clamp);
  const hours = 18 * p;
  const clock = (18 + Math.floor(hours)) % 24;
  const BX = 30;
  const BW = W - 60;
  const head = BX + BW * p;
  const plus = frame >= NIGHT_TO;
  const plusPop = usePop(NIGHT_TO);
  return (
    <Scene
      caps={[[0, 'Un développeur de Clio a laissé un agent travailler seul toute la nuit.']]}
      gap={26}
      bottom={
        <Pop at={BEAT * 1} style={{display: 'flex', justifyContent: 'center'}}>
          <Mono size={40} color={DIM}>Claude Opus 5.5, 22 sept. 2026</Mono>
        </Pop>
      }
    >
      <Pop at={BEAT * 0.6} style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between'}}>
        <div style={{display: 'flex', alignItems: 'baseline', gap: 18}}>
          <Big size={150} color="#fff">{Math.floor(hours)} h</Big>
          <div style={{opacity: plus ? 1 : 0, transform: `scale(${0.6 + 0.4 * plusPop})`}}>
            <Big size={150} color={AC}>+</Big>
          </div>
        </div>
        <Mono size={44} color={GREY}>{`${String(clock).padStart(2, '0')}:00`}</Mono>
      </Pop>
      <Pop at={BEAT * 0.8}>
        <svg width={W} height={230} viewBox={`0 0 ${W} 230`} style={{display: 'block', overflow: 'visible'}}>
          <Moon x={BX + BW * 0.2} y={40} o={interpolate(p, [0.05, 0.15, 0.6, 0.7], [0, 1, 1, 0.25], clamp)} />
          <Sun x={BX + BW * 0.82} y={40} o={interpolate(p, [0.62, 0.75], [0, 1], clamp)} />
          <rect x={BX} y={104} width={BW} height={30} rx={15} fill="#1a1a1a" />
          <rect x={BX} y={104} width={BW * p} height={30} rx={15} fill={AC} />
          {[0, 1 / 3, 2 / 3, 1].map((t, k) => (
            <line key={k} x1={BX + BW * t} y1={92} x2={BX + BW * t} y2={146} stroke="#666" strokeWidth={4} />
          ))}
          <circle cx={head} cy={119} r={22} fill="#fff" />
          <T x={BX} y={200} anchor="start" fill={GREY}>18 h</T>
          <T x={BX + BW / 3} y={200} fill={GREY}>minuit</T>
          <T x={BX + (BW * 2) / 3} y={200} fill={GREY}>6 h</T>
          <T x={BX + BW} y={200} anchor="end" fill={p >= 1 ? AC : GREY}>midi</T>
        </svg>
      </Pop>
      <Pop at={BEAT * 1.2} style={{display: 'flex', flexDirection: 'column', gap: 14}}>
        <div style={{display: 'flex', gap: 14}}>
          {Array.from({length: 6}, (_, k) => {
            const busy = frame >= NIGHT_FROM && (Math.floor((frame - NIGHT_FROM) / 9) % 6 === k || p >= 1);
            return <div key={k} style={{flex: 1, height: 64, borderRadius: 12, border: `4px solid ${AC}`, background: busy ? acA(0.55) : acA(0.08)}} />;
          })}
        </div>
        <Mono size={38} color={GREY}>six dépôts de code, une seule tâche</Mono>
      </Pop>
    </Scene>
  );
};

// ---------- 5. Et donc : une copie, pas l'original ----------

const Folder: React.FC<{label: string; color: string; children?: React.ReactNode}> = ({label, color, children}) => (
  <div style={{position: 'relative', width: 300, height: 150}}>
    <div style={{position: 'absolute', left: 0, top: 0, width: 120, height: 30, borderRadius: '14px 14px 0 0', background: color}} />
    <div style={{position: 'absolute', left: 0, top: 22, right: 0, bottom: 0, borderRadius: 18, border: `5px solid ${color}`, background: '#0d0d0d', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12}}>
      <Mono size={38} color={color}>{label}</Mono>
      {children}
    </div>
  </div>
);

const ERASE = 18;
const BACK = 104;

const Copie: React.FC = () => {
  const frame = useCurrentFrame();
  const lock = useProg(BEAT * 7.6, BEAT * 7.6 + 10);
  const hand = useProg(BEAT * 8.4, BEAT * 8.4 + 12);
  const erased = frame >= ERASE + 42 && frame < BACK;
  return (
    <Scene
      caps={[[0, "Il agit avec tes droits, alors confie-lui une copie, jamais l'original."]]}
      gap={22}
      bottom={
        <Pop at={BEAT * 0.6} style={{display: 'flex', justifyContent: 'center'}}>
          <Mono size={40} color={DIM}>Claude Cowork, février 2026</Mono>
        </Pop>
      }
    >
      <Pop at={BEAT * 0.4}>
        <Mono size={38} color={GREY}>près de 15 ans de photos de famille</Mono>
      </Pop>
      <div style={{display: 'flex', flexWrap: 'wrap', gap: 12}}>
        {Array.from({length: 15}, (_, k) => {
          const gone = interpolate(frame, [ERASE + 3 * k, ERASE + 3 * k + 4], [0, 1], clamp);
          const back = interpolate(frame, [BACK + 2 * k, BACK + 2 * k + 5], [0, 1], clamp);
          const vis = frame < BEAT * 0.4 + k ? 0 : 1 - gone + back * gone;
          const col = back > 0 ? GREY : '#e8e8e8';
          return (
            <div key={k} style={{width: (W - 48) / 5, height: 72, borderRadius: 8, border: `3px solid ${gone > 0 && back === 0 ? RED : '#333'}`, boxSizing: 'border-box', position: 'relative', overflow: 'hidden'}}>
              <div style={{position: 'absolute', inset: 6, borderRadius: 4, background: withAlpha(col === GREY ? '#9a9a9a' : '#e8e8e8', 0.85), opacity: vis}}>
                <svg width="100%" height="100%" viewBox="0 0 100 50" preserveAspectRatio="none">
                  <path d="M0 50 L30 22 L50 38 L70 18 L100 50 Z" fill="#2a2a2a" />
                  <circle cx="80" cy="12" r="6" fill="#2a2a2a" />
                </svg>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{height: 50, display: 'flex', alignItems: 'center'}}>
        {erased ? <Pop at={ERASE + 42}><Mono size={40} color={RED}>effacées par l'agent</Mono></Pop> : null}
        {frame >= BACK ? <Pop at={BACK}><Mono size={40} color={GREY}>sauvées par une restauration iCloud</Mono></Pop> : null}
      </div>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <Pop at={BEAT * 7.2}>
          <Folder label="original" color="#fff"><Lock p={lock} size={56} color="#fff" /></Folder>
        </Pop>
        <Pop at={BEAT * 8} style={{display: 'flex', alignItems: 'center', gap: 14}}>
          <svg width={110} height={60} viewBox="0 0 110 60" style={{overflow: 'visible'}}>
            <Draw d="M100 30 L10 30 M30 12 L10 30 L30 48" p={hand} color={AC} width={6} len={170} />
          </svg>
          <Folder label="copie" color={AC} />
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 6. Chute : le train est dans l'agenda ----------

const DAYS = ['mer.', 'jeu.', 'ven.'];
const HOURS = ['8 h', '9 h', '10 h', '11 h', '12 h'];
const HR = 92;

const Chute: React.FC = () => {
  const frame = useCurrentFrame();
  const drop = usePop(BEAT * 1.6);
  const ok = useProg(BEAT * 2.8, BEAT * 2.8 + 12);
  const COL0 = 120;
  const colW = (W - COL0) / 3;
  const top = 70 + HR * 2 + (HR * 4) / 60; // 10 h 04
  return (
    <Scene caps={[[0, "Ton assistant devient un *agent* dès qu'il choisit la suite."]]}>
      <Pop at={BEAT * 0.4}>
        <div style={{position: 'relative', width: W, height: 70 + HR * HOURS.length}}>
          {DAYS.map((d, k) => (
            <div key={d} style={{position: 'absolute', left: COL0 + colW * k, width: colW, top: 0, height: 60, display: 'flex', justifyContent: 'center'}}>
              <Mono size={40} color={k === 1 ? AC : GREY}>{d}</Mono>
            </div>
          ))}
          {HOURS.map((h, r) => (
            <React.Fragment key={h}>
              <div style={{position: 'absolute', left: 0, top: 70 + HR * r - 22}}>
                <Mono size={36} color={DIM}>{h}</Mono>
              </div>
              <div style={{position: 'absolute', left: COL0 - 10, right: 0, top: 70 + HR * r, height: 2, background: '#2c2c2c'}} />
            </React.Fragment>
          ))}
          {DAYS.map((d, k) => (
            <div key={d + 'l'} style={{position: 'absolute', left: COL0 + colW * k, top: 70, width: 2, height: HR * (HOURS.length - 1), background: '#2c2c2c'}} />
          ))}
          <div style={{position: 'absolute', left: COL0 + colW + 8, width: colW - 16, top, height: HR * 1.6, borderRadius: 16, background: acA(0.85), opacity: frame >= BEAT * 1.6 ? 1 : 0, transform: `translateY(${(1 - drop) * -220}px)`, padding: '12px 16px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 4}}>
            <Mono size={38} color="#000">10 h 04</Mono>
            <Mono size={36} color="#000">→ Lyon</Mono>
            <div style={{position: 'absolute', right: 8, top: 10}}>
              <Check p={ok} size={56} color="#000" />
            </div>
          </div>
        </div>
      </Pop>
    </Scene>
  );
};

const SCENES: Scenes = [
  [Reponse, 160],
  [Fourche, 205],
  [Mecanisme, 350],
  [Nuit, 190],
  [Copie, 190],
  [Chute, 175],
];

export const AGENT_DURATION = totalDuration(SCENES);

export const Agent: React.FC = () => <Short title={["Qu'est-ce qu'un", 'agent ?']} scenes={SCENES} accent={AC} />;

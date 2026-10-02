// Short Benchmaxxing : le classement qui monte plus vite que la qualité (catégorie Écosystème, accent rose).
// Le kit fixe l'accent en vert : ce fichier redéfinit en rose tout ce qui porte la couleur (cadre, oscillo, coche, œil).
import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {BEAT, Big, Draw, GREY, Mono, Pop, Say, Scene, Scenes, clamp, mono, totalDuration, useProg} from './kit';

const PINK = '#F08DC2';
const pinkA = (a: number) => `rgba(240,141,194,${a})`;

const Hi: React.FC<{children: React.ReactNode}> = ({children}) => <span style={{color: PINK, fontStyle: 'italic'}}>{children}</span>;

const rnd = (i: number) => {
  const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};

// ---------- Cadre en rose (copie du kit) ----------

const Oscillo: React.FC = () => {
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
      <polyline points={pts.join(' ')} fill="none" stroke={PINK} strokeWidth={3} />
    </svg>
  );
};

const Chrome: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  return (
    <>
      <div style={{position: 'absolute', top: 0, left: 0, height: 10, width: `${(frame / durationInFrames) * 100}%`, background: PINK}} />
      <div style={{position: 'absolute', bottom: 80, left: 96, fontFamily: mono, fontWeight: 600, fontSize: 28, color: '#6f6f6f'}}>neopal.github.io</div>
    </>
  );
};

const Short: React.FC<{scenes: Scenes}> = ({scenes}) => {
  let from = 0;
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <Audio src={staticFile('beat.mp3')} />
      <Oscillo />
      {scenes.map(([C, d], i) => {
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

// ---------- Icônes en rose ----------

const Check: React.FC<{p: number; size?: number}> = ({p, size = 70}) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <Draw d="M18 52 L42 76 L84 26" p={p} width={12} len={110} color={PINK} />
  </svg>
);

const Eye: React.FC<{size?: number; look: number}> = ({size = 120, look}) => (
  <svg width={size} height={size * 0.6} viewBox="0 0 100 60">
    <path d="M5 30 Q50 -10 95 30 Q50 70 5 30 Z" fill="none" stroke="#fff" strokeWidth="6" />
    <circle cx={50 + look * 22} cy="30" r="12" fill={PINK} />
  </svg>
);

// ---------- Le classement ----------

const ROW_H = 84;

// r : rang (continu) de la ligne rose. Les autres lignes sont des barres anonymes qui s'écartent pour la laisser passer.
const Board: React.FC<{r: number; rows?: number; name: React.ReactNode; tag?: React.ReactNode; scroll?: number; showFrom?: number; total?: number}> = ({
  r,
  rows = 7,
  name,
  tag,
  scroll = 0,
  showFrom = 0,
  total = 40,
}) => {
  const frame = useCurrentFrame();
  const greys: React.ReactNode[] = [];
  for (let g = 1; g <= total; g++) {
    const pos = g + interpolate(g + 1 - r, [0, 1], [0, 1], clamp);
    const top = (pos - 1) * ROW_H - scroll;
    if (top < -ROW_H || top > rows * ROW_H) continue;
    const vis = frame >= showFrom + Math.min(g, rows) * 3 ? 1 : 0;
    greys.push(
      <div key={g} style={{position: 'absolute', left: 0, right: 0, top, height: ROW_H - 14, display: 'flex', alignItems: 'center', gap: 24, opacity: vis}}>
        <div style={{width: 110, textAlign: 'right'}}><Mono size={36} color="#6a6a6a">#{Math.round(pos)}</Mono></div>
        <div style={{height: 22, borderRadius: 11, background: '#333', width: `${45 + 40 * rnd(g)}%`}} />
      </div>,
    );
  }
  const top = (r - 1) * ROW_H - scroll;
  return (
    <div style={{position: 'relative', height: rows * ROW_H, overflow: 'hidden'}}>
      {greys}
      <div style={{position: 'absolute', left: 0, right: 0, top, height: ROW_H - 14, display: 'flex', alignItems: 'center', gap: 24}}>
        <div style={{width: 110, textAlign: 'right'}}><Mono size={44} color={PINK}>#{Math.round(r)}</Mono></div>
        <div style={{flex: 1, height: '100%', border: `4px solid ${PINK}`, background: pinkA(0.15), borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 22px'}}>
          <Mono size={34} color="#fff">{name}</Mono>
          {tag ? <Mono size={26} color={PINK}>{tag}</Mono> : null}
        </div>
      </div>
    </div>
  );
};

// ---------- Scènes ----------

const Question: React.FC = () => (
  <Scene gap={14}>
    <Pop at={0}><Say size={104}>Qu'est-ce que le</Say></Pop>
    <Pop at={7}><Big size={124} color={PINK}><span style={{whiteSpace: 'nowrap'}}>benchmaxxing ?</span></Big></Pop>
  </Scene>
);

// Le modèle grimpe de la 5e à la 1re place, la jauge d'utilité ne bouge pas.
const Reponse: React.FC = () => {
  const frame = useCurrentFrame();
  const steps = [BEAT * 2, BEAT * 3, BEAT * 4, BEAT * 5];
  const r = 5 - steps.reduce((s, at) => s + interpolate(frame, [at, at + 6], [0, 1], clamp), 0);
  return (
    <Scene gap={44}>
      <Pop at={0}><Say size={60}>Le benchmaxxing consiste à optimiser un modèle pour <Hi>grimper dans les classements</Hi> plutôt que pour mieux servir ceux qui l'utilisent.</Say></Pop>
      <Pop at={BEAT * 1.2}>
        <Board r={r} rows={5} name="ton modèle" showFrom={BEAT * 1.2} />
      </Pop>
      <Pop at={BEAT * 2.4} style={{display: 'flex', flexDirection: 'column', gap: 12}}>
        <Mono size={34} color={GREY}>utilité pour toi</Mono>
        <div style={{position: 'relative', height: 48, border: '4px solid #444'}}>
          <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: '34%', background: '#888'}} />
        </div>
      </Pop>
    </Scene>
  );
};

// Llama 4 Maverick : 2e en version expérimentale, 32e en version publique.
const Maverick: React.FC = () => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [BEAT * 2, BEAT * 3], [8, 2], {...clamp, easing: (t) => 1 - Math.pow(1 - t, 3)});
  const drop = interpolate(frame, [BEAT * 8.5, BEAT * 12], [0, 1], {...clamp, easing: (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)});
  const r = frame < BEAT * 8.5 ? enter : 2 + 30 * drop;
  const scroll = Math.max(0, (r - 4) * ROW_H);
  const pub = frame >= BEAT * 7.5;
  const swap = interpolate(frame, [BEAT * 7.5, BEAT * 7.5 + 6], [0, 1], clamp);
  return (
    <Scene gap={40}>
      <div style={{position: 'relative', height: 300}}>
        <div style={{position: 'absolute', left: 0, right: 0, visibility: frame < BEAT * 7 ? 'visible' : 'hidden'}}>
          <Pop at={0}><Say size={56}>Début avril 2025, Meta inscrit sur LMArena une version de Llama 4 Maverick réglée pour plaire aux votants, et elle se classe <Hi>deuxième.</Hi></Say></Pop>
        </div>
        <div style={{position: 'absolute', left: 0, right: 0}}>
          <Pop at={BEAT * 7}><Say size={56}>Le 11 avril, LMArena classe la version que tout le monde peut télécharger, et elle tombe à la <Hi>32e place.</Hi></Say></Pop>
        </div>
      </div>
      <Pop at={BEAT * 1}>
        <Mono size={32} color="#8a8a8a">classement LMArena</Mono>
        <div style={{height: 16}} />
        <Board
          r={r}
          rows={7}
          scroll={scroll}
          showFrom={BEAT * 1}
          name="Llama 4 Maverick"
          tag={<span style={{opacity: pub ? swap : 1}}>{pub ? 'version publique' : 'version expérimentale'}</span>}
        />
      </Pop>
    </Scene>
  );
};

// Les 27 variantes testées en privé, puis une seule qui reste à l'écran.
const N_VAR = 27;
const BEST = 13;

const Variantes: React.FC = () => {
  const frame = useCurrentFrame();
  const at = (k: number) => BEAT * 1.2 + k * 2;
  const shown = Array.from({length: N_VAR}, (_, k) => k).filter((k) => frame >= at(k)).length;
  const pick = useProg(BEAT * 4.8, BEAT * 5.4);
  return (
    <Scene gap={44}>
      <Pop at={0}><Say size={56}>Fin avril 2025, une étude a compté <Hi>27 variantes</Hi> de Llama 4 testées en privé par Meta sur LMArena avant la sortie.</Say></Pop>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gap: 14}}>
        {Array.from({length: N_VAR}, (_, k) => {
          const best = k === BEST;
          const h = best ? 0.95 : 0.3 + 0.5 * rnd(k + 50);
          const dim = best ? 1 : 1 - 0.8 * pick;
          return (
            <Pop key={k} at={at(k)} style={{opacity: dim}}>
              <div style={{position: 'relative', height: 120, border: `4px solid ${best && pick > 0 ? PINK : '#555'}`, borderRadius: 10, background: best ? pinkA(0.2 * pick) : 'transparent', transform: `scale(${best ? 1 + 0.15 * pick : 1})`}}>
                <div style={{position: 'absolute', left: '30%', right: '30%', bottom: 8, height: `${h * 80}%`, background: best ? PINK : '#777'}} />
              </div>
            </Pop>
          );
        })}
      </div>
      <div style={{display: 'flex', alignItems: 'baseline', gap: 20, opacity: frame >= at(0) ? 1 : 0}}>
        <Mono size={36} color={GREY}>variantes testées :</Mono>
        <Mono size={80} color={PINK}>{shown}</Mono>
      </div>
      <div style={{height: 170}}>
        <Pop at={BEAT * 5.4}><Say size={56}>Tester des dizaines de versions en privé permet de ne montrer que <Hi>la meilleure</Hi> au classement.</Say></Pop>
      </div>
    </Scene>
  );
};

// Loi de Goodhart : le score et la qualité montent ensemble, puis se séparent quand on vise le score.
const X0 = 0.42;
const base = (x: number) => 0.08 + 0.55 * x;
const score = (x: number) => (x <= X0 ? base(x) : base(X0) + 0.88 * (x - X0));
const quality = (x: number) => (x <= X0 ? base(x) : base(X0) + 0.08 * (1 - Math.exp(-(x - X0) * 4)));

const Goodhart: React.FC = () => {
  const frame = useCurrentFrame();
  const p = useProg(BEAT * 1, BEAT * 5.5);
  const W = 888;
  const H = 520;
  const X = (x: number) => 20 + x * (W - 200);
  const Y = (v: number) => H - 50 - v * (H - 90);
  const line = (f: (x: number) => number) => {
    const pts: string[] = [];
    for (let x = 0; x <= p + 1e-6; x += 0.01) pts.push(`${X(x).toFixed(1)},${Y(f(x)).toFixed(1)}`);
    return pts.join(' ');
  };
  const gap: string[] = [];
  if (p > X0) {
    for (let x = X0; x <= p; x += 0.01) gap.push(`${X(x)},${Y(score(x))}`);
    for (let x = p; x >= X0; x -= 0.01) gap.push(`${X(x)},${Y(quality(x))}`);
  }
  const marker = interpolate(p, [X0, X0 + 0.06], [0, 1], clamp);
  const ends = interpolate(p, [0.95, 1], [0, 1], clamp);
  return (
    <Scene gap={40}>
      <div style={{position: 'relative', height: 300}}>
        <div style={{position: 'absolute', left: 0, right: 0, visibility: frame < BEAT * 6.5 ? 'visible' : 'hidden'}}>
          <Pop at={0}><Say size={56}>Au début, le score monte avec la qualité du modèle, mais quand on entraîne pour le score, <Hi>les deux courbes se séparent.</Hi></Say></Pop>
        </div>
        <div style={{position: 'absolute', left: 0, right: 0}}>
          <Pop at={BEAT * 6.5}><Say size={56}>C'est la loi de Goodhart, formulée en 1975, selon laquelle une mesure qui devient un objectif <Hi>cesse d'être une bonne mesure.</Hi></Say></Pop>
        </div>
      </div>
      <Pop at={BEAT * 0.6}>
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{display: 'block', overflow: 'visible'}}>
          <line x1={20} y1={H - 50} x2={W - 150} y2={H - 50} stroke="#555" strokeWidth={4} />
          <line x1={20} y1={H - 50} x2={20} y2={20} stroke="#555" strokeWidth={4} />
          <text x={20} y={H - 8} fontFamily={mono} fontWeight={600} fontSize={30} fill="#8a8a8a">entraînement →</text>
          {gap.length ? <polygon points={gap.join(' ')} fill={pinkA(0.16)} /> : null}
          <line x1={X(X0)} y1={Y(base(X0)) - 230 * marker} x2={X(X0)} y2={H - 50} stroke={PINK} strokeWidth={3} strokeDasharray="10 10" opacity={marker} />
          <text x={X(X0) - 14} y={Y(base(X0)) - 250} textAnchor="end" fontFamily={mono} fontWeight={600} fontSize={28} fill={PINK} opacity={marker}>on vise le score</text>
          <polyline points={line(quality)} fill="none" stroke="#fff" strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
          <polyline points={line(score)} fill="none" stroke={PINK} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
          <text x={X(1) + 18} y={Y(score(1)) + 10} fontFamily={mono} fontWeight={600} fontSize={32} fill={PINK} opacity={ends}>score</text>
          <text x={X(1) + 18} y={Y(quality(1)) + 10} fontFamily={mono} fontWeight={600} fontSize={32} fill="#fff" opacity={ends}>qualité</text>
        </svg>
      </Pop>
    </Scene>
  );
};

const CHECKS = ['qui a fait passer le test', 'sur quelle version', 'sur tes propres tâches'];

const EtDonc: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Scene gap={50}>
      <Pop at={0}><Say size={56}>Et donc, avant de changer de modèle parce qu'il est premier, regarde qui a fait passer les tests et sur quelle version, puis <Hi>essaie-le sur tes propres tâches.</Hi></Say></Pop>
      <div style={{display: 'flex', flexDirection: 'column', gap: 26}}>
        {CHECKS.map((c, k) => {
          const at = BEAT * 1.4 + k * BEAT * 1.3;
          const verdict = at + 14;
          const p = interpolate(frame, [verdict, verdict + 8], [0, 1], clamp);
          return (
            <Pop key={c} at={at} style={{display: 'flex', alignItems: 'center', gap: 30, border: '4px solid #333', borderRadius: 24, padding: '14px 28px', height: 116}}>
              <div style={{flex: 1}}><Mono size={42} color="#fff">{c}</Mono></div>
              <div style={{width: 130, display: 'flex', justifyContent: 'center'}}>
                {frame < verdict ? <Eye look={Math.sin((frame - at) / 3)} size={110} /> : <Check p={p} size={96} />}
              </div>
            </Pop>
          );
        })}
      </div>
    </Scene>
  );
};

// Le test ne couvre qu'un coin de tout ce qu'on demandera au modèle.
const COLS = 10;
const ROWS = 6;
const inTest = (c: number, r: number) => c >= 1 && c <= 3 && r >= 1 && r <= 2;

const Chute: React.FC = () => {
  const frame = useCurrentFrame();
  const lit = useProg(BEAT * 1.6, BEAT * 2.2);
  const cell = 888 / COLS;
  return (
    <Scene gap={44}>
      <Pop at={0}><Say size={58}>Souvent, aucune règle n'est enfreinte, parce que le score dit vrai sur le test mais <Hi>promet trop pour tout le reste.</Hi></Say></Pop>
      <Pop at={BEAT * 1}>
        <div style={{display: 'grid', gridTemplateColumns: `repeat(${COLS}, ${cell}px)`}}>
          {Array.from({length: COLS * ROWS}, (_, i) => {
            const c = i % COLS;
            const r = Math.floor(i / COLS);
            const t = inTest(c, r);
            const q = interpolate(frame, [BEAT * 3.4 + (c + r) * 1.5, BEAT * 3.4 + (c + r) * 1.5 + 4], [0, 1], clamp);
            return (
              <div key={i} style={{height: cell, border: `3px solid ${t && lit > 0 ? PINK : '#2e2e2e'}`, background: t ? pinkA(0.35 * lit) : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                {t ? <div style={{opacity: lit}}><Check p={lit} size={56} /></div> : <div style={{opacity: q}}><Mono size={40} color="#666">?</Mono></div>}
              </div>
            );
          })}
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 16}}>
          <div style={{opacity: lit}}><Mono size={32} color={PINK}>le test</Mono></div>
          <div style={{opacity: interpolate(frame, [BEAT * 3.4, BEAT * 4], [0, 1], clamp)}}><Mono size={32} color={GREY}>tout le reste</Mono></div>
        </div>
      </Pop>
    </Scene>
  );
};

const SCENES: Scenes = [
  [Question, 60],
  [Reponse, 120],
  [Maverick, 225],
  [Variantes, 150],
  [Goodhart, 180],
  [EtDonc, 120],
  [Chute, 105],
];

export const BENCHMAXXING_DURATION = totalDuration(SCENES);

export const Benchmaxxing: React.FC = () => <Short scenes={SCENES} />;

// Short Benchmaxxing : le classement qui monte plus vite que la qualité (catégorie Écosystème, accent rose).
// Scène propre à ce short : le communiqué « premier partout » annoté au stylo, deux questions entourées dans la marge.
import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {ACCENTS, BEAT, Check, DIM, Draw, GREY, Mono, Pop, Scene, Scenes, Short, W, clamp, mono, svgPx, totalDuration, useProg, withAlpha} from './kit';

const PINK = ACCENTS.ecosysteme;
const pinkA = (a: number) => withAlpha(PINK, a);

const rnd = (i: number) => {
  const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};

// ---------- Le classement ----------

const ROW_H = 84;

// r : rang (continu) de la ligne rose. Les autres lignes sont des barres anonymes qui s'écartent pour la laisser passer.
const Board: React.FC<{r: number; rows?: number; name: React.ReactNode; scroll?: number; showFrom?: number; total?: number}> = ({r, rows = 6, name, scroll = 0, showFrom = 0, total = 40}) => {
  const frame = useCurrentFrame();
  const greys: React.ReactNode[] = [];
  for (let g = 1; g <= total; g++) {
    const pos = g + interpolate(g + 1 - r, [0, 1], [0, 1], clamp);
    const top = (pos - 1) * ROW_H - scroll;
    if (top < -ROW_H || top > rows * ROW_H) continue;
    const vis = frame >= showFrom + Math.min(g, rows) * 3 ? 1 : 0;
    greys.push(
      <div key={g} style={{position: 'absolute', left: 0, right: 0, top, height: ROW_H - 14, display: 'flex', alignItems: 'center', gap: 24, opacity: vis}}>
        <div style={{width: 120, display: 'flex', justifyContent: 'flex-end'}}><Mono size={38} color="#7a7a7a">#{Math.round(pos)}</Mono></div>
        <div style={{height: 22, borderRadius: 11, background: '#333', width: `${45 + 40 * rnd(g)}%`}} />
      </div>,
    );
  }
  const top = (r - 1) * ROW_H - scroll;
  return (
    <div style={{position: 'relative', height: rows * ROW_H, overflow: 'hidden'}}>
      {greys}
      <div style={{position: 'absolute', left: 0, right: 0, top, height: ROW_H - 14, display: 'flex', alignItems: 'center', gap: 24}}>
        <div style={{width: 120, display: 'flex', justifyContent: 'flex-end'}}><Mono size={46} color={PINK}>#{Math.round(r)}</Mono></div>
        <div style={{flex: 1, height: '100%', border: `4px solid ${PINK}`, background: pinkA(0.15), borderRadius: 14, display: 'flex', alignItems: 'center', padding: '0 22px'}}>
          <Mono size={38} color="#fff">{name}</Mono>
        </div>
      </div>
    </div>
  );
};

// ---------- Scènes ----------

// Le modèle grimpe de la 5e à la 1re place, la jauge d'utilité ne bouge pas.
const Reponse: React.FC = () => {
  const frame = useCurrentFrame();
  const steps = [BEAT * 2, BEAT * 3, BEAT * 4, BEAT * 5];
  const r = 5 - steps.reduce((s, at) => s + interpolate(frame, [at, at + 6], [0, 1], clamp), 0);
  return (
    <Scene
      caps={[[0, "Le benchmaxxing, c'est optimiser un modèle pour *grimper dans les classements* plutôt que pour mieux te servir."]]}
      bottom={
        <Pop at={BEAT * 2.4} style={{display: 'flex', flexDirection: 'column', gap: 12}}>
          <Mono size={40} color={GREY}>utilité pour toi</Mono>
          <div style={{position: 'relative', height: 48, border: '4px solid #444'}}>
            <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: '34%', background: '#888'}} />
          </div>
        </Pop>
      }
    >
      <Pop at={BEAT * 1.2}>
        <Board r={r} rows={5} name="ton modèle" showFrom={BEAT * 1.2} />
      </Pop>
    </Scene>
  );
};

// Llama 4 Maverick : 2e en version expérimentale, 32e en version publique.
const MAV_SWAP = 175;
const Maverick: React.FC = () => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [BEAT * 2.7, BEAT * 4], [9, 2], {...clamp, easing: (t) => 1 - Math.pow(1 - t, 3)});
  const dropAt = MAV_SWAP + 12;
  const drop = interpolate(frame, [dropAt, dropAt + 55], [0, 1], {...clamp, easing: (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)});
  const r = frame < dropAt ? enter : 2 + 30 * drop;
  const scroll = frame < dropAt ? 0 : Math.max(0, (r - 4) * ROW_H);
  const pub = frame >= MAV_SWAP;
  return (
    <Scene
      caps={[
        [0, 'Début avril 2025, une variante de Llama 4 Maverick réglée pour plaire aux votants arrive deuxième sur LMArena.'],
        [MAV_SWAP, 'Le 11 avril, la version que tout le monde peut télécharger tombe à la 32e place.'],
      ]}
      gap={16}
      bottom={
        <div style={{display: 'flex', justifyContent: 'center', opacity: frame >= BEAT * 3 ? 1 : 0}}>
          <div style={{border: `4px solid ${pub ? '#fff' : PINK}`, borderRadius: 14, padding: '10px 26px'}}>
            <Mono size={44} color={pub ? '#fff' : PINK}>{pub ? 'version publique' : 'version expérimentale'}</Mono>
          </div>
        </div>
      }
    >
      <Pop at={BEAT}>
        <Mono size={40} color={DIM}>classement LMArena</Mono>
      </Pop>
      <Pop at={BEAT}>
        <Board r={r} rows={6} scroll={scroll} showFrom={BEAT} name="Llama 4 Maverick" />
      </Pop>
    </Scene>
  );
};

// Les 27 variantes testées en privé, une seule montrée.
const N_VAR = 27;
const BEST = 13;
const PICK = 105;

const Variantes: React.FC = () => {
  const frame = useCurrentFrame();
  const at = (k: number) => BEAT * 1.2 + k * 2;
  const shown = Array.from({length: N_VAR}, (_, k) => k).filter((k) => frame >= at(k)).length;
  const pick = useProg(PICK, PICK + 10);
  return (
    <Scene
      caps={[[0, 'Fin avril, une étude a compté 27 variantes privées testées par Meta avant la sortie.']]}
      bottom={
        <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', opacity: frame >= at(0) ? 1 : 0}}>
          <div style={{display: 'flex', alignItems: 'baseline', gap: 16}}>
            <Mono size={72} color={GREY}>{shown}</Mono>
            <Mono size={40} color={GREY}>testées</Mono>
          </div>
          <div style={{display: 'flex', alignItems: 'baseline', gap: 16, opacity: pick}}>
            <Mono size={72} color={PINK}>1</Mono>
            <Mono size={40} color={PINK}>montrée</Mono>
          </div>
        </div>
      }
    >
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gap: 14}}>
        {Array.from({length: N_VAR}, (_, k) => {
          const best = k === BEST;
          const h = best ? 0.95 : 0.3 + 0.5 * rnd(k + 50);
          const dim = best ? 1 : 1 - 0.8 * pick;
          return (
            <Pop key={k} at={at(k)} style={{opacity: dim}}>
              <div style={{position: 'relative', height: 150, border: `4px solid ${best && pick > 0 ? PINK : '#555'}`, borderRadius: 10, background: best ? pinkA(0.2 * pick) : 'transparent', transform: `scale(${best ? 1 + 0.15 * pick : 1})`}}>
                <div style={{position: 'absolute', left: '30%', right: '30%', bottom: 8, height: `${h * 80}%`, background: best ? PINK : '#777'}} />
              </div>
            </Pop>
          );
        })}
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
  const p = useProg(BEAT * 1, BEAT * 7);
  const H = 600;
  const X = (x: number) => 20 + x * (W - 220);
  const Y = (v: number) => H - 60 - v * (H - 100);
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
    <Scene caps={[[0, "Quand le score devient l'objectif, il grimpe plus vite que la qualité, comme le prévoit la loi de Goodhart."]]}>
      <Pop at={BEAT * 0.6}>
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{display: 'block', overflow: 'visible'}}>
          <line x1={20} y1={H - 60} x2={W - 170} y2={H - 60} stroke="#555" strokeWidth={4} />
          <line x1={20} y1={H - 60} x2={20} y2={20} stroke="#555" strokeWidth={4} />
          <text x={20} y={H - 6} fontFamily={mono} fontWeight={600} fontSize={svgPx(36)} fill="#9a9a9a">entraînement →</text>
          {gap.length ? <polygon points={gap.join(' ')} fill={pinkA(0.16)} /> : null}
          <line x1={X(X0)} y1={Y(base(X0)) - 250 * marker} x2={X(X0)} y2={H - 60} stroke={PINK} strokeWidth={3} strokeDasharray="10 10" opacity={marker} />
          <text x={X(X0) - 14} y={Y(base(X0)) - 266} textAnchor="end" fontFamily={mono} fontWeight={600} fontSize={svgPx(36)} fill={PINK} opacity={marker}>on vise le score</text>
          <polyline points={line(quality)} fill="none" stroke="#fff" strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
          <polyline points={line(score)} fill="none" stroke={PINK} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
          <text x={X(1) + 16} y={Y(score(1)) + 12} fontFamily={mono} fontWeight={600} fontSize={svgPx(38)} fill={PINK} opacity={ends}>score</text>
          <text x={X(1) + 16} y={Y(quality(1)) + 12} fontFamily={mono} fontWeight={600} fontSize={svgPx(38)} fill="#fff" opacity={ends}>qualité</text>
        </svg>
      </Pop>
    </Scene>
  );
};

// Le communiqué « premier partout », annoté au stylo : deux questions entourées dans la marge.
const EtDonc: React.FC = () => {
  const frame = useCurrentFrame();
  const c1 = useProg(BEAT * 2.2, BEAT * 3.2);
  const c2 = useProg(BEAT * 4.4, BEAT * 5.4);
  const n1 = interpolate(frame, [BEAT * 3, BEAT * 3.4], [0, 1], clamp);
  const n2 = interpolate(frame, [BEAT * 5.2, BEAT * 5.6], [0, 1], clamp);
  const CW = 560;
  const bar = (w: number, k: number) => <div key={k} style={{height: 18, borderRadius: 9, background: '#555', width: `${w}%`}} />;
  return (
    <Scene caps={[[0, 'Avant de migrer vers le modèle premier, regarde qui a fait passer les tests et sur quelle version.']]}>
      <div style={{position: 'relative', height: 600}}>
        <Pop at={BEAT * 0.8} style={{position: 'absolute', left: 0, top: 0, width: CW, height: 600, background: '#f2efe8', borderRadius: 10, padding: '36px 36px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 20, transform: 'rotate(-2deg)'}}>
          <Mono size={36} color="#555">communiqué</Mono>
          <div style={{display: 'flex', alignItems: 'baseline', gap: 16}}>
            <Mono size={96} color="#111">#1</Mono>
            <Mono size={40} color="#111">partout</Mono>
          </div>
          {[92, 80, 86].map(bar)}
          <div style={{height: 12}} />
          <div style={{display: 'flex', gap: 12}}>
            {[0, 1, 2, 3].map((k) => (
              <div key={k} style={{flex: 1, height: 96 + 30 * rnd(k + 7), alignSelf: 'flex-end', background: k === 1 ? '#111' : '#999'}} />
            ))}
          </div>
          {[70, 88].map(bar)}
        </Pop>
        <svg width={W} height={600} viewBox={`0 0 ${W} 600`} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
          <Draw d="M24 140 C 24 70, 330 66, 336 140 C 342 214, 24 218, 30 150" p={c1} color={PINK} width={7} len={900} />
          <Draw d="M340 120 C 420 104, 520 96, 600 92" p={c1} color={PINK} width={5} len={300} />
          <Draw d="M40 395 C 50 330, 520 330, 520 400 C 520 470, 40 470, 52 400" p={c2} color={PINK} width={7} len={1200} />
          <Draw d="M524 400 C 560 420, 580 430, 600 440" p={c2} color={PINK} width={5} len={120} />
        </svg>
        <div style={{position: 'absolute', left: 610, top: 66, opacity: n1}}>
          <Mono size={40} color={PINK}>testé</Mono>
          <Mono size={40} color={PINK}>par qui ?</Mono>
        </div>
        <div style={{position: 'absolute', left: 610, top: 410, opacity: n2}}>
          <Mono size={40} color={PINK}>quelle</Mono>
          <Mono size={40} color={PINK}>version ?</Mono>
        </div>
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
  const cell = W / COLS;
  return (
    <Scene
      caps={[[0, "Souvent, aucune règle n'est enfreinte, car le score dit vrai sur le test mais promet trop pour le reste."]]}
      bottom={
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <div style={{opacity: lit}}><Mono size={40} color={PINK}>le test</Mono></div>
          <div style={{opacity: interpolate(frame, [BEAT * 3.4, BEAT * 4], [0, 1], clamp)}}><Mono size={40} color={GREY}>tout le reste</Mono></div>
        </div>
      }
    >
      <Pop at={BEAT * 1}>
        <div style={{display: 'grid', gridTemplateColumns: `repeat(${COLS}, ${cell}px)`}}>
          {Array.from({length: COLS * ROWS}, (_, i) => {
            const c = i % COLS;
            const r = Math.floor(i / COLS);
            const t = inTest(c, r);
            const q = interpolate(frame, [BEAT * 3.4 + (c + r) * 1.5, BEAT * 3.4 + (c + r) * 1.5 + 4], [0, 1], clamp);
            return (
              <div key={i} style={{height: cell, border: `3px solid ${t && lit > 0 ? PINK : '#2e2e2e'}`, background: t ? pinkA(0.35 * lit) : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                {t ? <div style={{opacity: lit}}><Check p={lit} size={60} /></div> : <div style={{opacity: q}}><Mono size={44} color="#666">?</Mono></div>}
              </div>
            );
          })}
        </div>
      </Pop>
    </Scene>
  );
};

const SCENES: Scenes = [
  [Reponse, 170],
  [Maverick, 335],
  [Variantes, 160],
  [Goodhart, 195],
  [EtDonc, 190],
  [Chute, 230],
];

export const BENCHMAXXING_DURATION = totalDuration(SCENES);

export const Benchmaxxing: React.FC = () => <Short title={["Qu'est-ce que le", 'benchmaxxing ?']} scenes={SCENES} accent={PINK} />;

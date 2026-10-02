// Short Fenêtre de contexte : la bande de tokens qui se remplit, déborde, et se lit mal au milieu (catégorie Fondations, accent vert).
// Scène propre à ce short : le zoom arrière sur Du côté de chez Swann, de 8 000 tokens à un million.
import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {ACCENT, BEAT, Check, Cross, DIM, Draw, GREY, Mono, Pop, RED, Scene, Scenes, Short, W, clamp, mono, svgPx, totalDuration, useProg, withAlpha} from './kit';
const greenA = (a: number) => withAlpha(ACCENT, a);

// ---------- Les tokens de la bande ----------

type Kind = 'consignes' | 'historique' | 'document' | 'question' | 'reponse' | 'vide';

const KINDS: Record<Kind, {label: string; fill: string; border: string}> = {
  consignes: {label: 'tes consignes', fill: ACCENT, border: ACCENT},
  historique: {label: "l'historique", fill: '#9a9a9a', border: '#9a9a9a'},
  document: {label: 'un document joint', fill: '#555', border: '#555'},
  question: {label: 'ta question', fill: '#fff', border: '#fff'},
  reponse: {label: 'sa propre réponse', fill: 'transparent', border: ACCENT},
  vide: {label: '', fill: 'transparent', border: '#2c2c2c'},
};

const SEGMENTS: [Kind, number][] = [
  ['consignes', 3],
  ['historique', 7],
  ['document', 5],
  ['question', 2],
  ['reponse', 3],
];

const BAND: Kind[] = SEGMENTS.flatMap(([k, n]) => Array.from({length: n}, () => k));

const Cell: React.FC<{kind: Kind; size: number; style?: React.CSSProperties; children?: React.ReactNode}> = ({kind, size, style, children}) => {
  const k = KINDS[kind];
  return (
    <div style={{width: size, height: size, padding: 3, boxSizing: 'border-box', ...style}}>
      <div style={{width: '100%', height: '100%', background: k.fill, border: `4px solid ${k.border}`, boxSizing: 'border-box', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        {children}
      </div>
    </div>
  );
};

// ---------- Scènes ----------

// La bande se remplit segment par segment, la légende se construit en même temps.
const Reponse: React.FC = () => {
  const frame = useCurrentFrame();
  const segAt = (s: number) => BEAT * 1.6 + s * BEAT;
  const starts = SEGMENTS.reduce<number[]>((acc, [, n], s) => [...acc, s ? acc[s - 1] + SEGMENTS[s - 1][1] : 0], []);
  return (
    <Scene caps={[[0, "C'est tout le texte qu'un modèle peut avoir *sous les yeux en même temps*, compté en tokens."]]} gap={44}>
      <Pop at={BEAT}>
        <div style={{display: 'flex', border: `5px solid ${ACCENT}`, borderRadius: 8, padding: 4}}>
          {BAND.map((_, i) => {
            const s = SEGMENTS.findIndex((_, j) => i >= starts[j] && i < starts[j] + SEGMENTS[j][1]);
            const on = frame >= segAt(s) + (i - starts[s]) * 2;
            return <Cell key={i} kind={on ? BAND[i] : 'vide'} size={(W - 18) / BAND.length} />;
          })}
        </div>
      </Pop>
      <div style={{display: 'flex', flexDirection: 'column', gap: 14}}>
        {SEGMENTS.map(([k], s) => (
          <Pop key={k} at={segAt(s)} style={{display: 'flex', alignItems: 'center', gap: 22}}>
            <Cell kind={k} size={48} />
            <Mono size={42} color={k === 'consignes' || k === 'reponse' ? ACCENT : '#fff'}>{KINDS[k].label}</Mono>
          </Pop>
        ))}
      </div>
    </Scene>
  );
};

// La bande déborde : le flux glisse vers la gauche, le début sort de la fenêtre.
const WIN_CELLS = 20;
const C = 38;
const WIN_X = 120;
const STREAM: Kind[] = [...BAND, ...Array.from({length: 10}, (_, k) => ((k % 5) < 2 ? 'question' : 'reponse') as Kind)];

const Debord: React.FC = () => {
  const frame = useCurrentFrame();
  const shift = Array.from({length: 6}, (_, k) => BEAT * 1.6 + k * 8).reduce((s, at) => s + interpolate(frame, [at, at + 6], [0, 1], clamp), 0);
  const out = interpolate(shift, [4, 6], [0, 1], clamp);
  const crossP = useProg(BEAT * 5.4, BEAT * 6);
  const consX = WIN_X + (1.5 - shift) * C;
  return (
    <Scene caps={[[0, 'Quand la fenêtre est pleine, le début sort pour laisser entrer la suite, et le modèle ne le voit plus.']]}>
      <Pop at={BEAT * 0.6}>
        <div style={{position: 'relative', height: 300}}>
          {STREAM.map((k, i) => {
            const x = WIN_X + (i - shift) * C;
            if (i - shift >= WIN_CELLS) return null;
            const inside = x >= WIN_X - 1;
            const fade = inside ? 1 : interpolate(x, [WIN_X - C * 6, WIN_X], [0.15, 0.55], clamp);
            return (
              <div key={i} style={{position: 'absolute', left: x, top: 90 + (inside ? 0 : (WIN_X - x) * 0.25), opacity: fade, filter: inside ? 'none' : 'grayscale(1)'}}>
                <Cell kind={k} size={C} />
              </div>
            );
          })}
          <div style={{position: 'absolute', left: WIN_X - 8, top: 82, width: WIN_CELLS * C + 16, height: C + 16, border: `5px solid ${ACCENT}`, borderRadius: 8}} />
          <div style={{position: 'absolute', left: WIN_X, top: 20}}><Mono size={38} color={GREY}>fenêtre de contexte</Mono></div>
          <div style={{position: 'absolute', left: Math.max(-60, consX - 120), width: 240, top: 150, display: 'flex', justifyContent: 'center', opacity: frame >= BEAT * 1.2 ? 1 : 0}}>
            <Mono size={38} color={out > 0.5 ? RED : ACCENT}>consignes</Mono>
          </div>
          <div style={{position: 'absolute', left: Math.max(0, consX - 40), top: 206, opacity: crossP > 0 ? 1 : 0}}>
            <Cross p={crossP} size={80} />
          </div>
        </div>
      </Pop>
    </Scene>
  );
};

// Proust : la fenêtre de GPT-4 sur Swann, puis le zoom arrière jusqu'à un million de tokens.
const SWANN = 265851;
const fmt = (n: number) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

const SWAP = 190;
const Proust: React.FC = () => {
  const frame = useCurrentFrame();
  const z = interpolate(frame, [SWAP + 6, SWAP + 50], [0, 1], {...clamp, easing: (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)});
  const lerpLog = (a: number, b: number) => Math.exp(Math.log(a) + (Math.log(b) - Math.log(a)) * z);
  const ppt = lerpLog(W / SWANN, (W - 20) / 1e6);
  const wt = lerpLog(8000, 1e6);
  const big = z > 0.02;
  const pct = useProg(BEAT * 3, BEAT * 3.6);
  return (
    <Scene
      caps={[
        [0, "Du côté de chez Swann fait 265 851 tokens, et la fenêtre de GPT-4 en 2023 n'en gardait que 3 %."],
        [SWAP, "Une fenêtre d'un million de tokens le contient presque quatre fois."],
      ]}
      bottom={
        <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
          <div style={{opacity: z <= 0 || z >= 1 ? 1 : 0}}><Mono size={40} color={GREY}>{z >= 1 ? 'Gemini 1.5 Pro, février 2024' : 'GPT-4, 2023'}</Mono></div>
          <Mono size={64}>{fmt(wt)} tokens</Mono>
        </div>
      }
    >
      <Pop at={BEAT}>
        <div style={{position: 'relative', height: 240, overflow: 'hidden'}}>
          {[0, 1, 2, 3, 4].map((k) => {
            const x = k * SWANN * ppt;
            const w = SWANN * ppt - 6;
            if (x > W) return null;
            return (
              <div key={k} style={{position: 'absolute', left: x, top: 30, width: w, height: 180, background: '#262626', border: '3px solid #555', boxSizing: 'border-box', display: 'flex', alignItems: k === 0 && !big ? 'flex-start' : 'center', justifyContent: k === 0 && !big ? 'flex-end' : 'flex-start', padding: k === 0 && !big ? '24px 20px' : '0 20px', overflow: 'hidden'}}>
                {k === 0 && !big ? <Mono size={40} color="#bbb">Du côté de chez Swann</Mono> : null}
                {big && z > 0.7 ? <div style={{opacity: interpolate(z, [0.7, 1], [0, 1], clamp)}}><Mono size={36} color="#bbb">Swann</Mono></div> : null}
              </div>
            );
          })}
          <div style={{position: 'absolute', left: 0, top: 12, width: Math.max(8, wt * ppt), height: 216, border: `5px solid ${ACCENT}`, background: greenA(0.22), boxSizing: 'border-box'}} />
          <div style={{position: 'absolute', left: 44, top: 140, opacity: pct * (1 - interpolate(z, [0, 0.1], [0, 1], clamp))}}>
            <Mono size={44}>← 3 % du livre</Mono>
          </div>
        </div>
      </Pop>
    </Scene>
  );
};

// Lost in the Middle : une information déplacée dans la bande, et la courbe en U de ce que le modèle retrouve.
const U = (x: number) => 0.3 + 0.62 * Math.pow(2 * x - 1, 2);

const Milieu: React.FC = () => {
  const frame = useCurrentFrame();
  const p = useProg(BEAT * 1.6, BEAT * 8);
  const N = 20;
  const cs = W / N;
  const CH = 360;
  const X = (x: number) => cs / 2 + x * (W - cs);
  const Y = (v: number) => CH - 30 - v * (CH - 60);
  const pts: string[] = [];
  for (let x = 0; x <= p + 1e-6; x += 0.01) pts.push(`${X(x).toFixed(1)},${Y(U(x)).toFixed(1)}`);
  const low = U(p) < 0.45;
  return (
    <Scene
      caps={[[0, "Une information placée *au milieu* d'une longue fenêtre est moins bien retrouvée qu'au début ou à la fin."]]}
      bottom={
        <Pop at={BEAT * 8} style={{display: 'flex', justifyContent: 'center'}}>
          <Mono size={40} color={DIM}>étude Lost in the Middle, 2023</Mono>
        </Pop>
      }
    >
      <Pop at={BEAT}>
        <div style={{position: 'relative', height: cs}}>
          {Array.from({length: N}, (_, i) => (
            <div key={i} style={{position: 'absolute', left: i * cs}}><Cell kind="historique" size={cs} style={{opacity: 0.35}} /></div>
          ))}
          <div style={{position: 'absolute', left: p * (W - cs), top: 0}}>
            <Cell kind="consignes" size={cs} />
          </div>
        </div>
        <svg width={W} height={CH} viewBox={`0 0 ${W} ${CH}`} style={{display: 'block', marginTop: 24, overflow: 'visible'}}>
          <line x1={0} y1={CH - 30} x2={W} y2={CH - 30} stroke="#555" strokeWidth={4} />
          <polyline points={pts.join(' ')} fill="none" stroke={ACCENT} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
          <circle cx={X(p)} cy={Y(U(p))} r={18} fill={low ? RED : ACCENT} opacity={frame >= BEAT * 1.6 ? 1 : 0} />
          <line x1={X(p)} y1={Y(U(p)) + 18} x2={X(p)} y2={CH - 30} stroke={low ? RED : ACCENT} strokeWidth={3} strokeDasharray="8 8" opacity={frame >= BEAT * 1.6 ? 0.7 : 0} />
          <text x={0} y={CH + 22} fontFamily={mono} fontWeight={600} fontSize={svgPx(36)} fill="#9a9a9a">début</text>
          <text x={W / 2} y={CH + 22} textAnchor="middle" fontFamily={mono} fontWeight={600} fontSize={svgPx(36)} fill="#9a9a9a">milieu</text>
          <text x={W} y={CH + 22} textAnchor="end" fontFamily={mono} fontWeight={600} fontSize={svgPx(36)} fill="#9a9a9a">fin</text>
          <text x={W / 2} y={18} textAnchor="middle" fontFamily={mono} fontWeight={600} fontSize={svgPx(36)} fill={GREY}>information retrouvée</text>
        </svg>
      </Pop>
    </Scene>
  );
};

// Les deux options : redonner les consignes en fin de conversation, ou repartir d'une nouvelle conversation avec un résumé.
const EtDonc: React.FC = () => {
  const frame = useCurrentFrame();
  // Option 1 : la bande glisse de deux cases et les consignes reviennent à la fin, là où le modèle les retrouve.
  const RE = BEAT * 2.4;
  const slide = interpolate(frame, [RE, RE + 10], [0, 2], {...clamp, easing: (t) => 1 - Math.pow(1 - t, 3)});
  const ok1 = useProg(RE + 14, RE + 22);
  const BW = W - 130;
  const LN = 18;
  const cw = BW / LN;
  const LONG: Kind[] = Array.from({length: LN + 2}, (_, i) => (i === 8 || i === 9 || i >= LN ? 'consignes' : 'historique'));
  const arc = useProg(RE + 4, RE + 14);
  const ARC_TOP = 64;
  const ax0 = 7 * cw;
  const ax1 = (LN - 1) * cw;
  // Option 2 : nouvelle conversation, courte, avec le résumé et les consignes en tête.
  const NC = BEAT * 4.6;
  const fill = (i: number) => frame >= NC + BEAT * 0.6 + i * 2;
  const ok2 = useProg(NC + BEAT * 1.6, NC + BEAT * 1.6 + 8);
  const NEW: Kind[] = ['historique', 'historique', 'historique', 'consignes', 'consignes', 'question'];
  const label = (n: string, t: string) => (
    <div style={{display: 'flex', alignItems: 'baseline', gap: 18}}>
      <Mono size={44} color={ACCENT}>{n}</Mono>
      <Mono size={40} color="#ddd">{t}</Mono>
    </div>
  );
  return (
    <Scene caps={[[0, "Dans une longue conversation, redonne donc les consignes, ou repars d'une nouvelle avec un résumé."]]} gap={50}>
      <Pop at={BEAT * 1.2}>
        {label('1', 'redonne les consignes')}
        <div style={{display: 'flex', alignItems: 'center', marginTop: 14}}>
          <div style={{position: 'relative', width: BW, height: ARC_TOP + cw + 6, overflow: 'hidden'}}>
            {LONG.map((k, i) => {
              const fresh = i >= LN;
              const drown = k === 'consignes' && !fresh;
              return (
                <div key={i} style={{position: 'absolute', left: (i - slide) * cw, top: ARC_TOP}}>
                  <Cell kind={k} size={cw} style={{opacity: drown ? 0.35 : fresh ? 1 : 0.5}} />
                </div>
              );
            })}
            <svg width={BW} height={ARC_TOP} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
              <Draw d={`M${ax0} ${ARC_TOP - 6} C${ax0} 4, ${ax1} 4, ${ax1} ${ARC_TOP - 10}`} p={arc} width={4} len={900} />
              <path d={`M${ax1 - 12} ${ARC_TOP - 24} L${ax1} ${ARC_TOP - 8} L${ax1 + 12} ${ARC_TOP - 24}`} fill="none" stroke={ACCENT} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" opacity={arc >= 1 ? 1 : 0} />
            </svg>
          </div>
          <div style={{flex: 1, display: 'flex', justifyContent: 'center'}}>{ok1 > 0 ? <Check p={ok1} size={90} /> : null}</div>
        </div>
      </Pop>
      <Pop at={NC}>
        {label('2', 'nouvelle conversation + résumé')}
        <div style={{display: 'flex', alignItems: 'center', marginTop: 14}}>
          <div style={{display: 'flex', width: W - 130}}>
            {Array.from({length: 12}, (_, i) => (
              <Cell key={i} kind={i < NEW.length && fill(i) ? NEW[i] : 'vide'} size={cw} />
            ))}
          </div>
          <div style={{flex: 1, display: 'flex', justifyContent: 'center'}}>{ok2 > 0 ? <Check p={ok2} size={90} /> : null}</div>
        </div>
        <div style={{display: 'flex', gap: 30, marginTop: 14, opacity: frame >= NC + BEAT * 1.2 ? 1 : 0}}>
          <Mono size={36} color="#9a9a9a">résumé</Mono>
          <Mono size={36} color={ACCENT}>consignes</Mono>
          <Mono size={36} color="#fff">question</Mono>
        </div>
      </Pop>
    </Scene>
  );
};

// À chaque message, l'application renvoie tout le paquet ; le modèle n'a rien d'autre.
const Chute: React.FC = () => {
  const frame = useCurrentFrame();
  const send = (at: number) => interpolate(frame, [at, at + 10], [0, 1], {...clamp, easing: (t) => 1 - Math.pow(1 - t, 3)});
  const s1 = send(BEAT * 1.6);
  const forget = useProg(BEAT * 3, BEAT * 3.6);
  const s2 = send(BEAT * 4);
  const CS = 70;
  const packet = (cells: Kind[], s: number, opacity: number) => (
    <div style={{position: 'absolute', top: 210, left: -460 + s * (460 + W - 520 + (520 - cells.length * CS) / 2), display: 'flex', opacity: s > 0 ? opacity : 0}}>
      {cells.map((k, i) => <Cell key={i} kind={k} size={CS} />)}
    </div>
  );
  const P1: Kind[] = ['consignes', 'consignes', 'question'];
  const P2: Kind[] = ['consignes', 'consignes', 'historique', 'historique', 'reponse', 'question'];
  return (
    <Scene
      caps={[[0, "Le modèle repart de zéro à chaque message, et il ne voit que ce que l'application lui renvoie."]]}
    >
      <Pop at={BEAT}>
        <div style={{position: 'relative', height: 560}}>
          <div style={{position: 'absolute', left: 0, top: 40}}><Mono size={44} color="#fff">{frame >= BEAT * 4 ? 'message 2' : 'message 1'}</Mono></div>
          <div style={{position: 'absolute', right: 0, top: 110, width: 520, height: 400, border: `5px solid ${ACCENT}`, borderRadius: 24, background: greenA(0.08), display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 24}}>
            <Mono size={44}>modèle</Mono>
          </div>
          {packet(P1, s1, 1 - forget)}
          {packet(P2, s2, 1)}
        </div>
      </Pop>
    </Scene>
  );
};

const SCENES: Scenes = [
  [Reponse, 170],
  [Debord, 200],
  [Proust, 310],
  [Milieu, 185],
  [EtDonc, 190],
  [Chute, 215],
];

export const FENETRE_DURATION = totalDuration(SCENES);

export const Fenetre: React.FC = () => <Short title={["Qu'est-ce que la", 'fenêtre', 'de contexte ?']} scenes={SCENES} />;

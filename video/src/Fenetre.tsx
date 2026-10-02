// Short Fenêtre de contexte : la bande de tokens qui se remplit, déborde, et se lit mal au milieu (catégorie Fondations, accent vert).
import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {ACCENT, BEAT, Big, Check, Cross, Eye, GREY, Hi, Mono, Pop, RED, Say, Scene, Scenes, Short, clamp, mono, totalDuration, useProg} from './kit';

const W = 888;
const greenA = (a: number) => `rgba(124,255,178,${a})`;

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

const Question: React.FC = () => (
  <Scene gap={10}>
    <Pop at={0}><Say size={104}>Qu'est-ce que la</Say></Pop>
    <Pop at={7}><Big size={150} color={ACCENT}>fenêtre</Big></Pop>
    <Pop at={12}><Big size={124} color={ACCENT}><span style={{whiteSpace: 'nowrap'}}>de contexte ?</span></Big></Pop>
  </Scene>
);

// La bande se remplit segment par segment, la légende se construit en même temps.
const Reponse: React.FC = () => {
  const frame = useCurrentFrame();
  const segAt = (s: number) => BEAT * 1.6 + s * BEAT;
  const starts = SEGMENTS.reduce<number[]>((acc, [, n], s) => [...acc, s ? acc[s - 1] + SEGMENTS[s - 1][1] : 0], []);
  return (
    <Scene gap={44}>
      <Pop at={0}><Say size={60}>La fenêtre de contexte, c'est la quantité de texte qu'un modèle peut avoir <Hi>sous les yeux en même temps,</Hi> comptée en tokens.</Say></Pop>
      <Pop at={BEAT}>
        <div style={{display: 'flex', border: `5px solid ${ACCENT}`, borderRadius: 8, padding: 4}}>
          {BAND.map((_, i) => {
            const s = SEGMENTS.findIndex((_, j) => i >= starts[j] && i < starts[j] + SEGMENTS[j][1]);
            const on = frame >= segAt(s) + (i - starts[s]) * 2;
            return <Cell key={i} kind={on ? BAND[i] : 'vide'} size={(W - 18) / BAND.length} />;
          })}
        </div>
      </Pop>
      <div style={{display: 'flex', flexDirection: 'column', gap: 16, height: 330}}>
        {SEGMENTS.map(([k], s) => (
          <Pop key={k} at={segAt(s)} style={{display: 'flex', alignItems: 'center', gap: 22}}>
            <Cell kind={k} size={48} />
            <Mono size={38} color={k === 'consignes' || k === 'reponse' ? ACCENT : '#fff'}>{KINDS[k].label}</Mono>
          </Pop>
        ))}
      </div>
    </Scene>
  );
};

// La bande déborde : le flux glisse vers la gauche, le début sort de la fenêtre.
const WIN_CELLS = 20;
const C = 34;
const WIN_X = 208;
const STREAM: Kind[] = [...BAND, ...Array.from({length: 10}, (_, k) => ((k % 5) < 2 ? 'question' : 'reponse') as Kind)];

const Debord: React.FC = () => {
  const frame = useCurrentFrame();
  const shift = Array.from({length: 6}, (_, k) => BEAT * 1.6 + k * 8).reduce((s, at) => s + interpolate(frame, [at, at + 6], [0, 1], clamp), 0);
  const out = interpolate(shift, [4, 6], [0, 1], clamp);
  const crossP = useProg(BEAT * 5.4, BEAT * 6);
  const look = Math.sin(frame / 7);
  const consX = WIN_X + (1.5 - shift) * C;
  return (
    <Scene gap={50}>
      <Pop at={0}><Say size={60}>Quand la fenêtre est pleine, le début doit sortir pour laisser entrer la suite, et le modèle <Hi>ne voit plus ce qui en est sorti.</Hi></Say></Pop>
      <Pop at={BEAT * 0.6}>
        <div style={{display: 'flex', justifyContent: 'center', marginLeft: WIN_X - (W - WIN_CELLS * C) / 2, height: 80}}>
          <Eye look={look} size={120} />
        </div>
        <div style={{position: 'relative', height: 250}}>
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
          <div style={{position: 'absolute', left: WIN_X, top: 30}}><Mono size={28} color={GREY}>fenêtre de contexte</Mono></div>
          <div style={{position: 'absolute', left: consX - 80, width: 160, top: 160, textAlign: 'center', opacity: frame >= BEAT * 1.2 ? 1 : 0}}>
            <Mono size={28} color={out > 0.5 ? RED : ACCENT}>consignes</Mono>
          </div>
          <div style={{position: 'absolute', left: consX - 40, top: 196, opacity: crossP > 0 ? 1 : 0}}>
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

const Proust: React.FC = () => {
  const frame = useCurrentFrame();
  const z = interpolate(frame, [BEAT * 7, BEAT * 10], [0, 1], {...clamp, easing: (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)});
  const lerpLog = (a: number, b: number) => Math.exp(Math.log(a) + (Math.log(b) - Math.log(a)) * z);
  const ppt = lerpLog(W / SWANN, (W - 20) / 1e6);
  const wt = lerpLog(8000, 1e6);
  const big = z > 0.02;
  const pct = useProg(BEAT * 3, BEAT * 3.6);
  const phase2 = frame >= BEAT * 6.5;
  return (
    <Scene gap={44}>
      <div style={{position: 'relative', height: 300}}>
        <div style={{position: 'absolute', left: 0, right: 0, visibility: phase2 ? 'hidden' : 'visible'}}>
          <Pop at={0}><Say size={56}>Du côté de chez Swann, le premier tome de Proust, fait 265 851 tokens, et la fenêtre de GPT-4 en 2023 n'en gardait que <Hi>3 %.</Hi></Say></Pop>
        </div>
        <div style={{position: 'absolute', left: 0, right: 0}}>
          <Pop at={BEAT * 6.5}><Say size={56}>Gemini 1.5 Pro est passé à un million de tokens en février 2024, de quoi contenir le livre <Hi>presque quatre fois.</Hi></Say></Pop>
        </div>
      </div>
      <Pop at={BEAT}>
        <div style={{position: 'relative', height: 200, overflow: 'hidden'}}>
          {[0, 1, 2, 3, 4].map((k) => {
            const x = k * SWANN * ppt;
            const w = SWANN * ppt - 6;
            if (x > W) return null;
            return (
              <div key={k} style={{position: 'absolute', left: x, top: 30, width: w, height: 140, background: '#262626', border: '3px solid #555', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: k === 0 && !big ? 'flex-end' : 'flex-start', padding: '0 20px', overflow: 'hidden'}}>
                {k === 0 && !big ? <Mono size={30} color="#bbb">Du côté de chez Swann</Mono> : null}
                {big && z > 0.7 ? <div style={{opacity: interpolate(z, [0.7, 1], [0, 1], clamp)}}><Mono size={30} color="#bbb">Swann</Mono></div> : null}
              </div>
            );
          })}
          <div style={{position: 'absolute', left: 0, top: 12, width: Math.max(8, wt * ppt), height: 176, border: `5px solid ${ACCENT}`, background: greenA(0.22), boxSizing: 'border-box'}} />
          <div style={{position: 'absolute', left: 44, top: 70, opacity: pct * (1 - interpolate(z, [0, 0.1], [0, 1], clamp))}}>
            <Mono size={36}>← 3 % du livre</Mono>
          </div>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', gap: 8, marginTop: 20}}>
          <div style={{opacity: z <= 0 || z >= 1 ? 1 : 0}}><Mono size={34} color={GREY}>{z >= 1 ? 'Gemini 1.5 Pro, février 2024' : 'GPT-4, 2023'}</Mono></div>
          <Mono size={56}>{fmt(wt)} tokens</Mono>
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
    <Scene gap={40}>
      <Pop at={0}><Say size={54}>Même dans une grande fenêtre, les modèles retrouvent mieux une information placée au début ou à la fin <Hi>qu'au milieu,</Hi> comme l'a montré l'étude Lost in the Middle en 2023.</Say></Pop>
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
          <text x={0} y={CH + 14} fontFamily={mono} fontWeight={600} fontSize={30} fill="#8a8a8a">début</text>
          <text x={W / 2} y={CH + 14} textAnchor="middle" fontFamily={mono} fontWeight={600} fontSize={30} fill="#8a8a8a">milieu</text>
          <text x={W} y={CH + 14} textAnchor="end" fontFamily={mono} fontWeight={600} fontSize={30} fill="#8a8a8a">fin</text>
          <text x={W / 2} y={18} textAnchor="middle" fontFamily={mono} fontWeight={600} fontSize={30} fill={GREY}>information retrouvée</text>
        </svg>
      </Pop>
    </Scene>
  );
};

// Conversation longue (consignes noyées) puis nouvelle conversation avec résumé et consignes en tête.
const EtDonc: React.FC = () => {
  const frame = useCurrentFrame();
  const N = 20;
  const cs = W / N;
  const okP = useProg(BEAT * 4.8, BEAT * 5.4);
  const fill = (i: number) => frame >= BEAT * 3.6 + i * 2;
  const NEW: Kind[] = ['historique', 'historique', 'historique', 'consignes', 'consignes', 'question'];
  return (
    <Scene gap={44}>
      <Pop at={0}><Say size={58}>Et donc, dans une longue conversation, redonne les consignes importantes, ou repars d'une <Hi>nouvelle conversation avec un résumé.</Hi></Say></Pop>
      <Pop at={BEAT * 1.6}>
        <Mono size={32} color="#8a8a8a">conversation longue</Mono>
        <div style={{display: 'flex', marginTop: 12}}>
          {Array.from({length: N}, (_, i) => (
            <Cell key={i} kind={i === 9 || i === 10 ? 'consignes' : 'historique'} size={cs} style={{opacity: i === 9 || i === 10 ? 0.35 : 0.5}} />
          ))}
        </div>
      </Pop>
      <Pop at={BEAT * 3.2}>
        <Mono size={32} color="#8a8a8a">nouvelle conversation</Mono>
        <div style={{display: 'flex', alignItems: 'center', marginTop: 12}}>
          {Array.from({length: 14}, (_, i) => (
            <Cell key={i} kind={i < NEW.length && fill(i) ? NEW[i] : 'vide'} size={cs} />
          ))}
          <div style={{flex: 1, display: 'flex', justifyContent: 'center'}}><Check p={okP} size={90} /></div>
        </div>
        <div style={{display: 'flex', gap: 30, marginTop: 14, opacity: frame >= BEAT * 4 ? 1 : 0}}>
          <Mono size={30} color="#9a9a9a">résumé</Mono>
          <Mono size={30} color={ACCENT}>consignes</Mono>
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
  const packet = (cells: Kind[], s: number, opacity: number) => (
    <div style={{position: 'absolute', top: 70, left: -260 + s * (260 + W - 360 + (360 - cells.length * 36) / 2), display: 'flex', opacity: s > 0 ? opacity : 0}}>
      {cells.map((k, i) => <Cell key={i} kind={k} size={36} />)}
    </div>
  );
  const P1: Kind[] = ['consignes', 'consignes', 'question'];
  const P2: Kind[] = ['consignes', 'consignes', 'historique', 'historique', 'reponse', 'question'];
  return (
    <Scene gap={50}>
      <Pop at={0}><Say size={60}>Le modèle repart de zéro à chaque message, et il ne voit que <Hi>ce que l'application remet dans la fenêtre.</Hi></Say></Pop>
      <Pop at={BEAT}>
        <div style={{position: 'relative', height: 260}}>
          <div style={{position: 'absolute', left: 0, top: 0}}><Mono size={30} color="#8a8a8a">{frame >= BEAT * 4 ? 'message 2' : 'message 1'}</Mono></div>
          <div style={{position: 'absolute', right: 0, top: 10, width: 360, height: 200, border: `5px solid ${ACCENT}`, borderRadius: 24, background: greenA(0.08), display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 18}}>
            <Mono size={34}>modèle</Mono>
          </div>
          <div style={{position: 'absolute', right: 120, top: -60}}><Eye look={Math.sin(frame / 6)} size={120} /></div>
          {packet(P1, s1, 1 - forget)}
          {packet(P2, s2, 1)}
        </div>
      </Pop>
    </Scene>
  );
};

const SCENES: Scenes = [
  [Question, 60],
  [Reponse, 135],
  [Debord, 150],
  [Proust, 195],
  [Milieu, 180],
  [EtDonc, 120],
  [Chute, 105],
];

export const FENETRE_DURATION = totalDuration(SCENES);

export const Fenetre: React.FC = () => <Short scenes={SCENES} />;

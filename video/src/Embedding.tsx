// Short Embedding : une liste de nombres qui place un texte sur une carte du sens (catégorie Fondations, accent vert).
// Scène propre à ce short : la flèche Man -> Woman recopiée depuis King, qui atterrit sur Queen (word2vec, 2013).
import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {ACCENTS, BEAT, Big, Check, Cross, DIM, Draw, GREY, Mono, Pop, RED, Say, Scene, Scenes, Short, W, clamp, mono, svgPx, totalDuration, usePop, useProg, withAlpha} from './kit';

const AC = ACCENTS.fondations;
const acA = (a: number) => withAlpha(AC, a);

// Pseudo-aléatoire déterministe.
const rnd = (i: number) => {
  const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};

// Nombre à la française, signe moins typographique.
const num = (v: number) => (v < 0 ? '−' : '') + Math.abs(v).toFixed(3).replace('.', ',');
const fmt = (n: number) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

// ---------- La carte du sens ----------

const MW = W;
const MH = 600;

type Pt = {label: string; x: number; y: number; at: number; anchor?: 'start' | 'middle' | 'end'; dy?: number; color?: string; hi?: number};

const Grid: React.FC = () => (
  <g>
    <rect x={3} y={3} width={MW - 6} height={MH - 6} rx={24} fill="#070707" stroke="#2a2a2a" strokeWidth={4} />
    {Array.from({length: 11}, (_, k) => (
      <line key={'v' + k} x1={(k + 1) * (MW / 12)} y1={20} x2={(k + 1) * (MW / 12)} y2={MH - 20} stroke="#161616" strokeWidth={2} />
    ))}
    {Array.from({length: 7}, (_, k) => (
      <line key={'h' + k} x1={20} y1={(k + 1) * (MH / 8)} x2={MW - 20} y2={(k + 1) * (MH / 8)} stroke="#161616" strokeWidth={2} />
    ))}
  </g>
);

// Un point de la carte qui tombe sur son temps, avec son libellé.
const Dot: React.FC<{p: Pt}> = ({p}) => {
  const s = usePop(p.at);
  const frame = useCurrentFrame();
  if (frame < p.at) return null;
  const c = p.color ?? '#fff';
  const anchor = p.anchor ?? 'middle';
  const dx = anchor === 'start' ? 26 : anchor === 'end' ? -26 : 0;
  const dy = p.dy ?? (anchor === 'middle' ? -32 : 13);
  return (
    <g transform={`translate(${p.x} ${p.y})`}>
      {p.hi ? <circle r={20 + 26 * p.hi} fill="none" stroke={AC} strokeWidth={5} opacity={1 - 0.6 * p.hi} /> : null}
      <circle r={14 * s} fill={c} />
      <text x={dx} y={dy} textAnchor={anchor} fontFamily={mono} fontWeight={600} fontSize={svgPx(38)} fill={c} opacity={s}>
        {p.label}
      </text>
    </g>
  );
};

const MapSvg: React.FC<{children: React.ReactNode}> = ({children}) => (
  <svg width={MW} height={MH} viewBox={`0 0 ${MW} ${MH}`} style={{display: 'block', alignSelf: 'center', overflow: 'visible'}}>
    <Grid />
    {children}
  </svg>
);

// Trait qui relie deux points, dessiné progressivement.
const Link: React.FC<{a: Pt; b: Pt; p: number; color: string; dash?: boolean}> = ({a, b, p, color, dash}) => {
  if (p <= 0) return null;
  const x = a.x + (b.x - a.x) * p;
  const y = a.y + (b.y - a.y) * p;
  return <line x1={a.x} y1={a.y} x2={x} y2={y} stroke={color} strokeWidth={6} strokeLinecap="round" strokeDasharray={dash ? '4 18' : undefined} />;
};

// Flèche (vecteur) de (x1,y1) à (x2,y2), tracée jusqu'à p.
const Arrow: React.FC<{x1: number; y1: number; x2: number; y2: number; p: number; color: string; width?: number}> = ({x1, y1, x2, y2, p, color, width = 8}) => {
  if (p <= 0) return null;
  const x = x1 + (x2 - x1) * p;
  const y = y1 + (y2 - y1) * p;
  const a = Math.atan2(y2 - y1, x2 - x1);
  const h = 30;
  const head = `M${x - h * Math.cos(a - 0.45)} ${y - h * Math.sin(a - 0.45)} L${x} ${y} L${x - h * Math.cos(a + 0.45)} ${y - h * Math.sin(a + 0.45)}`;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x} y2={y} stroke={color} strokeWidth={width} strokeLinecap="round" />
      <path d={head} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
};

// ---------- Scènes ----------

// Un mot entre, une liste de nombres sort ; le compteur monte jusqu'à 1 536.
const VALS = Array.from({length: 12}, (_, i) => (rnd(i + 7) - 0.5) * 0.6);

const Reponse: React.FC = () => {
  const frame = useCurrentFrame();
  const arrow = useProg(BEAT * 1.4, BEAT * 2.2);
  const count = interpolate(frame, [BEAT * 5.4, BEAT * 8.4], [12, 1536], {...clamp, easing: (t) => t * t});
  const rowAt = (r: number) => BEAT * (2.4 + r);
  return (
    <Scene
      caps={[[0, 'Un embedding est une liste de nombres qui place un texte sur une carte du *sens*.']]}
      gap={20}
      bottom={
        <Pop at={BEAT * 5.4} style={{display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 22}}>
          <Mono size={96}>{fmt(count)}</Mono>
          <Mono size={40} color={GREY}>nombres</Mono>
        </Pop>
      }
    >
      <Pop at={BEAT * 0.6} style={{alignSelf: 'center', border: '5px solid #fff', borderRadius: 24, padding: '14px 44px'}}>
        <Big size={96}>facture</Big>
      </Pop>
      <div style={{display: 'flex', justifyContent: 'center', height: 90}}>
        <svg width={60} height={90} viewBox="0 0 60 90">
          <Draw d="M30 6 L30 80 M12 62 L30 82 L48 62" p={arrow} width={6} len={130} color={AC} />
        </svg>
      </div>
      <div style={{display: 'flex', flexDirection: 'column', gap: 14, alignSelf: 'center', border: `5px solid ${acA(0.8)}`, background: acA(0.08), padding: '20px 30px', borderRadius: 16}}>
        {[0, 1, 2].map((r) => (
          <Pop key={r} at={rowAt(r)} style={{display: 'flex', gap: 30}}>
            {VALS.slice(r * 4, r * 4 + 4).map((v, k) => (
              <div key={k} style={{width: 170, textAlign: 'right'}}>
                <Mono size={42} color={r === 2 && k === 3 ? DIM : '#fff'}>{r === 2 && k === 3 ? '…' : num(v)}</Mono>
              </div>
            ))}
          </Pop>
        ))}
      </div>
      <Pop at={BEAT * 5.4} style={{alignSelf: 'center'}}>
        <Mono size={38} color={DIM}>text-embedding-3-small</Mono>
      </Pop>
    </Scene>
  );
};

// Les voisins : facture près de devis, caisse claire près de clap, violoncelle à l'écart.
const P2: Record<string, Pt> = {
  facture: {label: 'facture', x: 200, y: 430, at: BEAT * 0.8, anchor: 'end'},
  devis: {label: 'devis', x: 320, y: 360, at: BEAT * 1.8, anchor: 'start'},
  caisse: {label: 'caisse claire', x: 600, y: 140, at: BEAT * 3.4},
  clap: {label: 'clap', x: 700, y: 230, at: BEAT * 4.2, anchor: 'start'},
  violon: {label: 'violoncelle', x: 660, y: 500, at: BEAT * 6, anchor: 'end'},
};

const Voisins: React.FC = () => {
  const l1 = useProg(BEAT * 2.4, BEAT * 3);
  const l2 = useProg(BEAT * 4.8, BEAT * 5.4);
  const l3 = useProg(BEAT * 7, BEAT * 8);
  const frame = useCurrentFrame();
  return (
    <Scene
      caps={[[0, "Deux textes qui parlent de la même chose tombent près l'un de l'autre."]]}
      bottom={
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <Pop at={BEAT * 3} style={{display: 'flex', alignItems: 'center', gap: 16}}>
            <div style={{width: 60, height: 8, background: AC, borderRadius: 4}} />
            <Mono size={40}>proches</Mono>
          </Pop>
          <Pop at={BEAT * 8} style={{display: 'flex', alignItems: 'center', gap: 16, opacity: frame >= BEAT * 8 ? 1 : 0}}>
            <div style={{width: 60, height: 0, borderTop: `8px dotted ${RED}`}} />
            <Mono size={40} color={RED}>loin</Mono>
          </Pop>
        </div>
      }
    >
      <Pop at={0}>
        <MapSvg>
          <Link a={P2.facture} b={P2.devis} p={l1} color={AC} />
          <Link a={P2.caisse} b={P2.clap} p={l2} color={AC} />
          <Link a={P2.caisse} b={P2.violon} p={l3} color={RED} dash />
          {Object.values(P2).map((p) => (
            <Dot key={p.label} p={p} />
          ))}
        </MapSvg>
      </Pop>
    </Scene>
  );
};

// L'anecdote : word2vec, 2013, et l'équation qui se pose terme par terme.
const EQ = [
  {t: 'King', c: '#fff'},
  {t: '−', c: GREY},
  {t: 'Man', c: '#fff'},
  {t: '+', c: GREY},
  {t: 'Woman', c: '#fff'},
  {t: '≈', c: GREY},
  {t: 'Queen', c: AC},
];

const Anecdote: React.FC = () => {
  const frame = useCurrentFrame();
  const line = useProg(BEAT * 1.6, BEAT * 2.6);
  return (
    <Scene
      caps={[[0, 'Ce papier a popularisé l’idée, et un de ses calculs est resté célèbre.']]}
      gap={26}
      bottom={
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap: 20}}>
          {EQ.map((e, k) => (
            <Pop key={k} at={BEAT * (4 + k * 0.6)}>
              <Mono size={60} color={e.c}>{e.t}</Mono>
            </Pop>
          ))}
        </div>
      }
    >
      <Pop at={BEAT * 0.6} style={{alignSelf: 'center', width: 760, border: '5px solid #555', borderRadius: 18, padding: '34px 44px', background: '#0c0c0c', display: 'flex', flexDirection: 'column', gap: 18}}>
        <Mono size={40} color={DIM}>arXiv, janvier 2013</Mono>
        <Big size={120} color={AC}>word2vec</Big>
        <div style={{height: 6, width: `${line * 100}%`, background: '#333'}} />
        <Pop at={BEAT * 2.2}><Mono size={40} color="#fff">Mikolov, Chen, Corrado, Dean</Mono></Pop>
        <Pop at={BEAT * 3}><Mono size={40} color={GREY}>Google</Mono></Pop>
      </Pop>
    </Scene>
  );
};

// Le moment « ah ouais » : la flèche Man -> Woman, recopiée depuis King, tombe sur Queen.
const P4: Record<string, Pt> = {
  man: {label: 'Man', x: 170, y: 480, at: BEAT * 0.8, anchor: 'end', dy: 13},
  woman: {label: 'Woman', x: 400, y: 420, at: BEAT * 1.6, anchor: 'start', dy: 46},
  king: {label: 'King', x: 360, y: 190, at: BEAT * 2.4, anchor: 'end', dy: 13},
};
const QUEEN = {x: 590, y: 130};

const Direction: React.FC = () => {
  const frame = useCurrentFrame();
  const a1 = useProg(BEAT * 3.2, BEAT * 4);
  const lift = interpolate(frame, [BEAT * 4.8, BEAT * 6], [0, 1], {...clamp, easing: (t) => 1 - (1 - t) ** 3});
  const qAt = BEAT * 6.2;
  const ring = interpolate((frame - qAt) % 30, [0, 30], [0, 1], clamp);
  const dx = P4.woman.x - P4.man.x;
  const dy = P4.woman.y - P4.man.y;
  const ox = P4.man.x + (P4.king.x - P4.man.x) * lift;
  const oy = P4.man.y + (P4.king.y - P4.man.y) * lift;
  const queen: Pt = {label: 'Queen', x: QUEEN.x, y: QUEEN.y, at: qAt, anchor: 'start', dy: 13, color: AC, hi: frame >= qAt ? ring : 0};
  return (
    <Scene
      caps={[[0, 'Les directions de la carte ont pris un sens que personne ne leur a donné.']]}
      bottom={
        <Pop at={BEAT * 7.4} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20}}>
          <Mono size={48} color="#fff">Woman − Man</Mono>
          <Mono size={48} color={GREY}>≈</Mono>
          <Mono size={48}>Queen − King</Mono>
        </Pop>
      }
    >
      <Pop at={0}>
        <MapSvg>
          <Arrow x1={P4.man.x} y1={P4.man.y} x2={P4.woman.x} y2={P4.woman.y} p={a1} color="#fff" width={7} />
          {lift > 0 ? <Arrow x1={ox} y1={oy} x2={ox + dx} y2={oy + dy} p={1} color={AC} /> : null}
          {lift > 0 && lift < 1 ? (
            <line x1={P4.man.x} y1={P4.man.y} x2={ox} y2={oy} stroke={acA(0.5)} strokeWidth={4} strokeDasharray="4 14" strokeLinecap="round" />
          ) : null}
          {Object.values(P4).map((p) => (
            <Dot key={p.label} p={p} />
          ))}
          <Dot p={queen} />
        </MapSvg>
      </Pop>
    </Scene>
  );
};

// Et donc : la question et la note tombent au même endroit, sans un mot commun.
const QUERY = 'congé maternité';
const P5: Record<string, Pt> = {
  frais: {label: 'Note de frais', x: 760, y: 380, at: BEAT * 0.6, anchor: 'end', dy: 13},
  tele: {label: 'Télétravail', x: 760, y: 190, at: BEAT * 0.9, anchor: 'end', dy: 13},
  paren: {label: 'Politique parentalité', x: 140, y: 100, at: BEAT * 1.2, anchor: 'start', dy: 13},
};

const EtDonc: React.FC = () => {
  const frame = useCurrentFrame();
  const typed = QUERY.slice(0, Math.max(0, Math.floor((frame - BEAT * 1.6) / 1.6)));
  const drop = interpolate(frame, [BEAT * 4, BEAT * 4.8], [0, 1], {...clamp, easing: (t) => 1 - (1 - t) ** 2});
  const link = useProg(BEAT * 5.2, BEAT * 5.8);
  const okP = useProg(BEAT * 6.4, BEAT * 7);
  const lit = frame >= BEAT * 5.8;
  const MH5 = 440;
  const qx = 200;
  const qy = 280;
  return (
    <Scene
      caps={[[0, 'Un moteur qui compare des embeddings trouve la note sans *aucun mot* en commun.']]}
      gap={22}
      bottom={
        <Pop at={BEAT * 6.4} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24}}>
          <Mono size={44} color={GREY}>mots en commun</Mono>
          <Mono size={84} color={RED}>0</Mono>
          <Check p={okP} size={90} />
        </Pop>
      }
    >
      <Pop at={BEAT * 0.4} style={{border: '4px solid #555', borderRadius: 999, padding: '16px 36px', display: 'flex', alignItems: 'center', gap: 20, minHeight: 72}}>
        <svg width={44} height={44} viewBox="0 0 44 44"><circle cx="18" cy="18" r="13" fill="none" stroke={GREY} strokeWidth="5" /><path d="M28 28 L40 40" stroke={GREY} strokeWidth="5" strokeLinecap="round" /></svg>
        <Say size={52}>{typed}</Say>
        <div style={{width: 6, height: 56, background: AC, opacity: frame < BEAT * 4 && frame % 10 < 5 ? 1 : 0}} />
      </Pop>
      <Pop at={BEAT * 0.4}>
        <svg width={MW} height={MH5} viewBox={`0 0 ${MW} ${MH5}`} style={{display: 'block', overflow: 'visible'}}>
          <rect x={3} y={3} width={MW - 6} height={MH5 - 6} rx={24} fill="#070707" stroke="#2a2a2a" strokeWidth={4} />
          {lit ? <circle cx={P5.paren.x} cy={P5.paren.y} r={22} fill={acA(0.25)} stroke={AC} strokeWidth={4} /> : null}
          {link > 0 ? <line x1={qx} y1={qy + 80 * (1 - drop)} x2={qx + (P5.paren.x - qx) * link} y2={qy + (P5.paren.y - qy) * link} stroke={AC} strokeWidth={6} strokeLinecap="round" /> : null}
          <Dot p={P5.frais} />
          <Dot p={P5.tele} />
          <Dot p={{...P5.paren, color: lit ? AC : '#fff'}} />
          {drop > 0 ? (
            <g transform={`translate(${qx} ${qy + 80 * (1 - drop)})`} opacity={drop}>
              <rect x={-14} y={-14} width={28} height={28} fill={AC} transform="rotate(45)" />
              <text x={30} y={13} fontFamily={mono} fontWeight={600} fontSize={svgPx(38)} fill={AC}>{QUERY}</text>
            </g>
          ) : null}
        </svg>
      </Pop>
    </Scene>
  );
};

// Chute : dans le LLM, chaque token devient une colonne de nombres dès l'entrée.
const TOKS = ['La', ' facture', ' est', ' payée'];

const Chute: React.FC = () => {
  const frame = useCurrentFrame();
  const CELLS = 9;
  return (
    <Scene caps={[[0, "Dans un LLM aussi, chaque token devient un embedding dès l'entrée du modèle."]]} gap={24}>
      <div style={{display: 'flex', justifyContent: 'center', gap: 22}}>
        {TOKS.map((t, k) => {
          const at = BEAT * (0.8 + k * 0.6);
          const fill = (j: number) => frame >= at + BEAT * 1.6 + j * 2;
          return (
            <div key={k} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, width: 200}}>
              <Pop at={at} style={{border: `5px solid ${AC}`, background: acA(0.12), padding: '10px 14px', borderRadius: 10}}>
                <Mono size={42} color="#fff">{t.replace(' ', '␣')}</Mono>
              </Pop>
              <svg width={40} height={56} viewBox="0 0 40 56" style={{opacity: frame >= at + 8 ? 1 : 0}}>
                <path d="M20 4 L20 46 M8 34 L20 48 L32 34" fill="none" stroke={GREY} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div style={{display: 'flex', flexDirection: 'column', gap: 6}}>
                {Array.from({length: CELLS}, (_, j) => {
                  const v = rnd(k * 31 + j);
                  return (
                    <div key={j} style={{width: 150, height: 40, borderRadius: 6, background: fill(j) ? withAlpha(v > 0.5 ? AC : '#ffffff', 0.15 + 0.75 * Math.abs(v - 0.5) * 2) : 'transparent', border: `3px solid ${fill(j) ? 'transparent' : '#222'}`}} />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </Scene>
  );
};

const SCENES: Scenes = [
  [Reponse, 225],
  [Voisins, 205],
  [Anecdote, 200],
  [Direction, 215],
  [EtDonc, 220],
  [Chute, 210],
];

export const EMBEDDING_DURATION = totalDuration(SCENES);

export const Embedding: React.FC = () => <Short title={["Qu'est-ce qu'un", 'embedding ?']} scenes={SCENES} accent={AC} />;

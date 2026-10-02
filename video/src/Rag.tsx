// Short RAG : chercher les bons passages, puis les coller avec la question (catégorie Agents, accent violet).
// Scène propre à ce short : les morceaux du document qui se classent par similarité avec la question, les deux plus proches remontent.
import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {BEAT, Big, Bubble, Check, Cross, DIM, Dots, Draw, GREY, Mono, Pop, RED, Say, Scene, Scenes, Short, W, clamp, mono, svgPx, totalDuration, usePop, useProg, withAlpha} from './kit';

const AC = '#D7A6FF';
const acA = (a: number) => withAlpha(AC, a);
const NB = ' ';

const fr2 = (n: number) => n.toFixed(2).replace('.', ',');

// Exemple fil rouge : le document de la cantine et la question sur jeudi (illustratif).
const QUESTION = `Quel est le menu de jeudi${NB}?`;
const CHUNKS = [
  {t: `Lundi${NB}: lasagnes`, v: '[0,3 −0,6 …]', s: 0.61},
  {t: `Jeudi${NB}: couscous`, v: '[0,7 −0,2 …]', s: 0.86},
  {t: `Ouvert de 11${NB}h${NB}30 à 14${NB}h`, v: '[−0,4 0,3 …]', s: 0.44},
  {t: 'Badge exigé au parking', v: '[0,1 0,8 …]', s: 0.08},
];
const SORTED = [1, 0, 2, 3]; // ordre par similarité décroissante

// Icône de document (SVG maison).
const DocIcon: React.FC<{size?: number}> = ({size = 54}) => (
  <svg width={size} height={size * 1.2} viewBox="0 0 50 60">
    <path d="M4 4 H32 L46 18 V56 H4 Z" fill="none" stroke={AC} strokeWidth={4} strokeLinejoin="round" />
    <path d="M32 4 V18 H46" fill="none" stroke={AC} strokeWidth={4} strokeLinejoin="round" />
    <path d="M12 30 H38 M12 39 H38 M12 48 H28" stroke={AC} strokeWidth={4} strokeLinecap="round" />
  </svg>
);

const FileChip: React.FC = () => (
  <div style={{display: 'flex', alignItems: 'center', gap: 18, border: `4px solid ${AC}`, borderRadius: 22, padding: '12px 26px', background: acA(0.1)}}>
    <DocIcon />
    <Mono size={40} color="#fff">cantine.pdf</Mono>
  </div>
);

// ---------- Scènes ----------

// Sans le document, il ne sait pas ; avec le document posé avant la question, il répond juste.
const FILE_AT = BEAT * 5;
const FIX_AT = BEAT * 7;

const Reponse: React.FC = () => {
  const frame = useCurrentFrame();
  const cross = useProg(BEAT * 3.4, BEAT * 3.4 + 10);
  const ok = useProg(FIX_AT + 4, FIX_AT + 14);
  const thinking = (frame >= BEAT * 2 && frame < BEAT * 3) || (frame >= FILE_AT + 8 && frame < FIX_AT);
  return (
    <Scene
      caps={[[0, "Le RAG donne au modèle les bons documents avant qu'il réponde."]]}
      gap={26}
      bottom={
        <Pop at={BEAT * 1.4} style={{display: 'flex', justifyContent: 'flex-end'}}>
          <Mono size={36} color={DIM}>exemple</Mono>
        </Pop>
      }
    >
      <div style={{height: 104, alignSelf: 'flex-end'}}>
        <Pop at={FILE_AT}><FileChip /></Pop>
      </div>
      <Bubble side="right" at={BEAT}><Say size={52}>{QUESTION}</Say></Bubble>
      <div style={{height: 150, alignSelf: 'stretch', display: 'flex', alignItems: 'center'}}>
        {thinking ? (
          <Dots />
        ) : frame >= FIX_AT ? (
          <Bubble side="left" at={FIX_AT}>
            <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
              <Say size={52}>Jeudi, c'est couscous.</Say>
              <Check p={ok} size={70} color={AC} />
            </div>
          </Bubble>
        ) : frame >= BEAT * 3 ? (
          <Bubble side="left" at={BEAT * 3}>
            <div style={{display: 'flex', alignItems: 'center', gap: 20, opacity: frame >= FILE_AT ? 0.45 : 1}}>
              <Say size={48}>Je ne connais pas ce menu.</Say>
              <Cross p={cross} size={56} />
            </div>
          </Bubble>
        ) : null}
      </div>
    </Scene>
  );
};

// L'article de 2020 : les trois initiales s'allument et donnent le sigle, puis le modèle se branche sur Wikipédia.
const Anecdote: React.FC = () => {
  const frame = useCurrentFrame();
  const lit = (at: number) => frame >= at;
  const L = (ch: string, at: number) => (
    <span style={{color: lit(at) ? AC : '#fff', fontWeight: lit(at) ? 800 : 400, fontStyle: lit(at) ? 'italic' : 'normal'}}>{ch}</span>
  );
  const rag = usePop(BEAT * 3);
  const wire = useProg(BEAT * 4.4, BEAT * 5.4);
  const pages = (k: number) => interpolate(frame, [BEAT * 5.4 + k * 4, BEAT * 5.4 + k * 4 + 6], [0, 1], clamp);
  return (
    <Scene
      caps={[[0, "Le nom vient d'un article qui branchait un modèle sur Wikipédia."]]}
      gap={40}
      bottom={
        <Pop at={BEAT * 1.2} style={{display: 'flex', justifyContent: 'center', gap: 28, alignItems: 'baseline'}}>
          <Mono size={40} color="#fff">Lewis et al.</Mono>
          <Mono size={40} color={GREY}>mai 2020</Mono>
        </Pop>
      }
    >
      <Pop at={BEAT * 0.6} style={{border: '4px solid #444', borderRadius: 26, padding: '26px 34px', display: 'flex', flexDirection: 'column', gap: 10}}>
        <Mono size={36} color={DIM}>arXiv</Mono>
        <Say size={60}>{L('R', BEAT * 1.4)}etrieval-{L('A', BEAT * 1.9)}ugmented</Say>
        <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between'}}>
          <Say size={60}>{L('G', BEAT * 2.4)}eneration</Say>
          <div style={{opacity: frame >= BEAT * 3 ? 1 : 0, transform: `scale(${0.6 + 0.4 * rag})`, transformOrigin: 'right bottom'}}>
            <Big size={120} color={AC}>RAG</Big>
          </div>
        </div>
      </Pop>
      <svg width={W} height={230} viewBox={`0 0 ${W} 230`} style={{display: 'block', overflow: 'visible'}}>
        <g opacity={frame >= BEAT * 4 ? 1 : 0}>
          <circle cx={100} cy={100} r={88} fill="#141414" stroke="#fff" strokeWidth={5} />
          <text x={100} y={113} textAnchor="middle" fontFamily={mono} fontWeight={600} fontSize={svgPx(36)} fill="#fff">modèle</text>
        </g>
        <Draw d="M196 100 L500 100" p={wire} color={AC} width={6} len={310} />
        {[0, 1, 2, 3, 4].map((k) => (
          <g key={k} opacity={pages(k)} transform={`translate(${540 + k * 16} ${30 + (4 - k) * 8 - (1 - pages(k)) * 30})`}>
            <rect width={250} height={120} rx={10} fill="#0d0d0d" stroke={k === 4 ? AC : '#666'} strokeWidth={4} />
            {k === 4 ? (
              <g>
                <text x={22} y={58} fontFamily="serif" fontWeight={700} fontSize={svgPx(44)} fill="#fff">W</text>
                <path d="M78 42 H226 M78 64 H226 M22 92 H200" stroke="#777" strokeWidth={6} strokeLinecap="round" />
              </g>
            ) : null}
          </g>
        ))}
        <text x={680} y={222} textAnchor="middle" fontFamily={mono} fontWeight={600} fontSize={svgPx(36)} fill={GREY} opacity={pages(4)}>index de Wikipédia</text>
      </svg>
    </Scene>
  );
};

// Le document coupé en chunks, puis chaque chunk traduit en vecteur et rangé dans le vector store.
const ROW = 80;
const CHUNK_W = 572;

const Decoupe: React.FC = () => {
  const frame = useCurrentFrame();
  const cuts = [1, 2, 3].map((k) => interpolate(frame, [BEAT * (1.4 + 0.4 * k), BEAT * (1.4 + 0.4 * k) + 6], [0, 1], clamp));
  const split = useProg(BEAT * 3.2, BEAT * 3.8);
  const vec = (k: number) => interpolate(frame, [BEAT * 4.4 + k * 7, BEAT * 4.4 + k * 7 + 7], [0, 1], clamp);
  const store = useProg(BEAT * 7, BEAT * 7.6);
  const gap = 22 * split;
  return (
    <Scene
      caps={[[0, 'Tes documents sont coupés en morceaux, chacun traduit en vecteur.']]}
      bottom={
        <div style={{display: 'flex', justifyContent: 'flex-end', opacity: store, paddingRight: 40}}>
          <Mono size={44}>vector store</Mono>
        </div>
      }
    >
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', height: 60}}>
        <Pop at={BEAT * 0.6}><Mono size={36} color={split > 0.5 ? AC : DIM}>{split > 0.5 ? 'chunks' : 'cantine.pdf'}</Mono></Pop>
        <div style={{opacity: vec(0), paddingRight: 30}}><Mono size={36}>embeddings</Mono></div>
      </div>
      <Pop at={BEAT * 0.6} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
        <div style={{position: 'relative', width: CHUNK_W, display: 'flex', flexDirection: 'column', gap, border: `4px solid ${withAlpha('#888888', 1 - split)}`, borderRadius: 14}}>
          {CHUNKS.map((c, k) => (
            <div key={k} style={{height: ROW, boxSizing: 'border-box', display: 'flex', alignItems: 'center', padding: '0 18px', border: `4px solid ${acA(split)}`, borderRadius: 14, background: acA(0.08 * split)}}>
              <Mono size={36} color="#fff">{c.t}</Mono>
            </div>
          ))}
          {split < 1
            ? [1, 2, 3].map((k) => (
                <div key={k} style={{position: 'absolute', left: -14, top: k * ROW - 3, height: 6, width: `${cuts[k - 1] * (CHUNK_W + 28)}px`, background: AC, opacity: 1 - split}} />
              ))
            : null}
        </div>
        <div style={{display: 'flex', flexDirection: 'column', gap, border: `4px solid ${acA(store)}`, borderRadius: 18, padding: '0 14px', background: acA(0.06 * store)}}>
          {CHUNKS.map((c, k) => (
            <div key={k} style={{height: ROW, display: 'flex', alignItems: 'center', clipPath: `inset(0 ${(1 - vec(k)) * 100}% 0 0)`}}>
              <Mono size={36}>{c.v}</Mono>
            </div>
          ))}
        </div>
      </Pop>
    </Scene>
  );
};

// La question devient un vecteur ; chaque chunk reçoit sa similarité, puis la liste se reclasse.
const SLOT = 104;

const Recherche: React.FC = () => {
  const frame = useCurrentFrame();
  const qv = useProg(BEAT * 1.2, BEAT * 1.6);
  const bar = (k: number) => interpolate(frame, [BEAT * (2 + k * 0.7), BEAT * (2 + k * 0.7) + 12], [0, 1], clamp);
  const re = interpolate(frame, [BEAT * 6, BEAT * 7], [0, 1], {...clamp, easing: (t) => t * t * (3 - 2 * t)});
  const hl = useProg(BEAT * 7.6, BEAT * 7.6 + 8);
  return (
    <Scene
      caps={[[0, 'Le système ramène les morceaux *les plus proches* de ta question.']]}
      gap={34}
      bottom={
        <Pop at={BEAT * 2} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
          <Mono size={40} color="#fff">similarité</Mono>
          <Mono size={36} color={DIM}>scores d'exemple</Mono>
        </Pop>
      }
    >
      <Pop at={BEAT * 0.6} style={{border: '4px solid #555', borderRadius: 24, padding: '16px 28px', display: 'flex', flexDirection: 'column', gap: 6}}>
        <Say size={50}>{QUESTION}</Say>
        <div style={{display: 'flex', gap: 22, alignItems: 'baseline', clipPath: `inset(0 ${(1 - qv) * 100}% 0 0)`}}>
          <Mono size={36} color={DIM}>vecteur</Mono>
          <Mono size={36}>[0,7 −0,3 …]</Mono>
        </div>
      </Pop>
      <div style={{position: 'relative', height: SLOT * 4}}>
        <div style={{position: 'absolute', left: -20, right: -20, top: -12, height: SLOT * 2 + 2, borderRadius: 18, border: `4px solid ${AC}`, background: acA(0.08), opacity: hl}} />
        {CHUNKS.map((c, k) => {
          const slot = k + (SORTED.indexOf(k) - k) * re;
          const top = SORTED.indexOf(k) < 2;
          const col = top && hl > 0.5 ? AC : '#fff';
          const g = bar(k);
          return (
            <div key={k} style={{position: 'absolute', left: 0, right: 0, top: slot * SLOT, height: SLOT - 20, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 8, opacity: frame >= BEAT * (1.6 + k * 0.7) ? (hl > 0.5 && !top ? 0.5 : 1) : 0}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                <Mono size={36} color={col}>{c.t}</Mono>
                <Mono size={40} color={col}>{fr2(c.s * g)}</Mono>
              </div>
              <div style={{height: 12, background: '#1a1a1a'}}>
                <div style={{height: '100%', width: `${c.s * g * 100}%`, background: top && hl > 0.5 ? AC : '#bbb'}} />
              </div>
            </div>
          );
        })}
      </div>
    </Scene>
  );
};

// La fenêtre de contexte se remplit : consignes, les deux morceaux, la question ; la réponse sort, sourcée.
const ANSWER = ['Jeudi,', "c'est", 'couscous.'];
const ANS_AT = BEAT * 4.8;

const Contexte: React.FC = () => {
  const frame = useCurrentFrame();
  const BLOCKS = [
    {label: 'consignes', at: BEAT * 0.8, color: GREY, tag: ''},
    {label: CHUNKS[1].t, at: BEAT * 1.6, color: AC, tag: '[1]'},
    {label: CHUNKS[0].t, at: BEAT * 2.2, color: AC, tag: '[2]'},
    {label: QUESTION, at: BEAT * 3, color: '#fff', tag: ''},
  ];
  const arrow = useProg(BEAT * 3.8, BEAT * 4.5);
  const shown = frame >= ANS_AT ? Math.floor((frame - ANS_AT) / 4) + 1 : 0;
  const lock = useProg(BEAT * 7, BEAT * 7 + 10);
  return (
    <Scene
      caps={[[0, 'Le modèle les lit avec ta question, puis il répond.']]}
      gap={18}
      bottom={
        <div style={{display: 'flex', alignItems: 'center', gap: 22, opacity: lock}}>
          <svg width={64} height={64} viewBox="0 0 100 100">
            <rect x="22" y="46" width="56" height="42" rx="6" fill={AC} />
            <path d={`M34 46 V${34 - 6 * (1 - lock)} a16 16 0 0 1 32 0 V46`} fill="none" stroke={AC} strokeWidth="9" />
          </svg>
          <Mono size={40} color={GREY}>paramètres du modèle inchangés</Mono>
        </div>
      }
    >
      <Pop at={BEAT * 0.4} style={{border: `4px solid ${acA(0.6)}`, borderRadius: 26, padding: '18px 24px 22px', display: 'flex', flexDirection: 'column', gap: 12}}>
        <Mono size={36} color={DIM}>fenêtre de contexte</Mono>
        {BLOCKS.map((b, k) => {
          const p = interpolate(frame, [b.at, b.at + 8], [0, 1], clamp);
          return (
            <div key={k} style={{height: 74, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', borderRadius: 14, border: `4px solid ${b.color}`, background: b.color === AC ? acA(0.1) : 'transparent', opacity: p, transform: `translateX(${(1 - p) * 260}px)`}}>
              {k === 3 ? <Say size={46}>{b.label}</Say> : <Mono size={36} color={b.color === AC ? '#fff' : GREY}>{b.label}</Mono>}
              {b.tag ? <Mono size={36}>{b.tag}</Mono> : null}
            </div>
          );
        })}
      </Pop>
      <div style={{display: 'flex', alignItems: 'center', gap: 24, height: 80, paddingLeft: 40}}>
        <svg width={50} height={80} viewBox="0 0 50 80">
          <Draw d="M25 4 L25 70 M9 54 L25 72 L41 54" p={arrow} color={AC} width={6} len={130} />
        </svg>
        <div style={{opacity: arrow}}><Mono size={36} color={GREY}>modèle</Mono></div>
      </div>
      <div style={{height: 110, display: 'flex', alignItems: 'center'}}>
        {shown > 0 ? (
          <div style={{border: '4px solid #444', borderRadius: 34, padding: '20px 32px', display: 'flex', alignItems: 'baseline', gap: 14}}>
            {ANSWER.slice(0, shown).map((w, k) => (
              <Say key={k} size={52}>{w}</Say>
            ))}
            {shown > ANSWER.length ? <Mono size={40}>[1]</Mono> : null}
          </div>
        ) : null}
      </div>
    </Scene>
  );
};

// L'étude de 2024 : une grille de 100 questions, 17 à 33 réponses inventées ; puis le geste, ouvrir le passage cité.
const PH = BEAT * 8;

const Etude: React.FC = () => {
  const frame = useCurrentFrame();
  const solid = Math.max(0, Math.min(17, Math.floor((frame - BEAT * 1.6) / 1.2)));
  const range = Math.max(0, Math.min(16, Math.floor((frame - BEAT * 3.8) / 1.2)));
  const outA = useProg(PH - 6, PH);
  const open = useProg(BEAT * 9.6, BEAT * 10.2);
  const ok = useProg(BEAT * 11, BEAT * 11 + 10);
  const pulse = frame >= BEAT * 9 ? 0.6 + 0.4 * Math.sin((frame - BEAT * 9) / 3) : 0;
  const CELL = 52;
  const GAP = 6;
  return (
    <Scene
      caps={[[0, "Il peut encore se tromper, alors ouvre le passage qu'il cite."]]}
      bottom={
        <div style={{display: 'flex', justifyContent: 'center', opacity: frame >= BEAT * 3 ? 1 - outA : 0}}>
          <Mono size={40} color={GREY}>questions avec une réponse inventée</Mono>
        </div>
      }
    >
      <div style={{position: 'relative', height: 620}}>
        <div style={{position: 'absolute', inset: 0, opacity: 1 - outA, display: 'flex', flexDirection: 'column', gap: 26, justifyContent: 'center'}}>
          <Pop at={BEAT * 0.6} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
            <Mono size={38} color="#fff">Lexis+ AI, Westlaw</Mono>
            <Mono size={38} color={GREY}>mai 2024</Mono>
          </Pop>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <Pop at={BEAT}>
              <div style={{display: 'grid', gridTemplateColumns: `repeat(10, ${CELL}px)`, gap: GAP}}>
                {Array.from({length: 100}, (_, i) => {
                  const red = i < solid;
                  const maybe = i >= 17 && i < 17 + range;
                  return (
                    <div key={i} style={{width: CELL, height: CELL, boxSizing: 'border-box', borderRadius: 6, background: red ? RED : maybe ? withAlpha(RED, 0.25) : '#1c1c1c', border: maybe ? `4px solid ${RED}` : 'none'}} />
                  );
                })}
              </div>
            </Pop>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, width: 290}}>
              <div style={{opacity: solid > 0 ? 1 : 0}}><Big size={100} color={RED}><span style={{whiteSpace: 'nowrap'}}>{solid}{NB}%</span></Big></div>
              <div style={{opacity: range > 0 ? 1 : 0}}><Mono size={40} color={GREY}>à</Mono></div>
              <div style={{opacity: range > 0 ? 1 : 0}}><Big size={100} color={RED}><span style={{whiteSpace: 'nowrap'}}>{17 + range}{NB}%</span></Big></div>
            </div>
          </div>
        </div>
        {frame >= PH ? (
          <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 0}}>
            <Pop at={PH} style={{alignSelf: 'flex-start', border: '4px solid #444', borderRadius: 34, padding: '20px 32px', display: 'flex', alignItems: 'baseline', gap: 14}}>
              <Say size={52}>Jeudi, c'est couscous</Say>
              <div style={{border: `3px solid ${acA(pulse)}`, borderRadius: 10, padding: '0 6px'}}><Mono size={40}>[1]</Mono></div>
            </Pop>
            <div style={{height: 90, marginLeft: 600, opacity: open}}>
              <svg width={40} height={90} viewBox="0 0 40 90">
                <Draw d="M20 4 L20 80 M6 66 L20 82 L34 66" p={open} color={AC} width={6} len={130} />
              </svg>
            </div>
            <div style={{opacity: open, transform: `translateY(${(1 - open) * 30}px)`, border: `4px solid ${AC}`, borderRadius: 22, padding: '20px 26px', background: acA(0.08), display: 'flex', flexDirection: 'column', gap: 12}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
                <DocIcon size={40} />
                <Mono size={36} color={DIM}>[1] cantine.pdf</Mono>
              </div>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <Mono size={40} color="#fff">{CHUNKS[1].t}</Mono>
                <Check p={ok} size={76} color={AC} />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </Scene>
  );
};

// Chute : le modèle verrouillé, les documents rangés à côté, et des copies de morceaux qui passent dans la conversation à chaque question.
const CYCLE = 90;
const CY0 = BEAT * 2;

const Chute: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame >= CY0 ? (frame - CY0) % CYCLE : -1;
  const appear = useProg(BEAT * 0.4, BEAT * 1.2);
  const lockP = useProg(BEAT * 1, BEAT * 1 + 10);
  const docsP = useProg(BEAT * 1.2, BEAT * 2);
  const fly = (start: number) => (t < 0 ? 0 : interpolate(t, [start, start + 12], [0, 1], clamp));
  const c1 = fly(0);
  const c2 = fly(15);
  const q = t >= 30 ? 1 : 0;
  const read = t >= 42 ? interpolate(t, [42, 54], [0, 1], clamp) : 0;
  const H = 520;
  // Positions : documents à droite, conversation au centre, modèle à gauche.
  const DOC = [{y: 110}, {y: 190}, {y: 270}, {y: 350}];
  const CONV = [{y: 130}, {y: 200}];
  const flying = (src: number, dst: number, p: number) => {
    if (p <= 0 || p >= 1) return null;
    const x = 668 + (360 - 668) * p;
    const y = DOC[src].y - 10 + (CONV[dst].y - DOC[src].y + 10) * p - Math.sin(Math.PI * p) * 70;
    return <rect x={x} y={y} width={210} height={48} rx={10} fill={acA(0.5)} stroke={AC} strokeWidth={4} />;
  };
  return (
    <Scene caps={[[0, 'Tes documents ne sont jamais entrés dans le modèle, ils restent *à côté*.']]}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{display: 'block', overflow: 'visible', opacity: appear}}>
        {/* Modèle verrouillé */}
        <circle cx={100} cy={240} r={96} fill="#141414" stroke="#fff" strokeWidth={5} />
        <g transform="translate(60 150) scale(0.8)" opacity={lockP}>
          <rect x="22" y="46" width="56" height="42" rx="6" fill={AC} />
          <path d={`M34 46 V${34 - 6 * (1 - lockP)} a16 16 0 0 1 32 0 V46`} fill="none" stroke={AC} strokeWidth="9" />
        </g>
        <text x={100} y={292} textAnchor="middle" fontFamily={mono} fontWeight={600} fontSize={svgPx(36)} fill="#fff">modèle</text>
        {/* La conversation, lue par le modèle */}
        <rect x={340} y={70} width={250} height={340} rx={24} fill="#0b0b0b" stroke="#666" strokeWidth={4} />
        {CONV.map((c, k) => ((k === 0 ? c1 : c2) >= 1 ? <rect key={k} x={360} y={c.y} width={210} height={48} rx={10} fill={acA(0.5)} stroke={AC} strokeWidth={4} /> : null))}
        {q ? <rect x={360} y={290} width={210} height={70} rx={14} fill="#2a2a2a" stroke="#fff" strokeWidth={4} /> : null}
        {q ? <text x={465} y={338} textAnchor="middle" fontFamily={mono} fontWeight={600} fontSize={svgPx(40)} fill="#fff">?</text> : null}
        <line x1={330} y1={240} x2={330 - 120 * read} y2={240} stroke={AC} strokeWidth={6} strokeLinecap="round" />
        {read > 0.95 ? <path d="M226 226 L206 240 L226 254" fill="none" stroke={AC} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" /> : null}
        {/* Les documents, rangés à côté */}
        <rect x={648} y={70} width={240} height={340} rx={24} fill={acA(0.08 * docsP)} stroke={AC} strokeWidth={5} opacity={docsP} />
        {DOC.map((d, k) => (
          <rect key={k} x={663} y={d.y - 10} width={210} height={48} rx={10} fill="#111" stroke={k < 2 ? AC : '#777'} strokeWidth={4} opacity={docsP} />
        ))}
        {flying(1, 0, c1)}
        {flying(0, 1, c2)}
        <text x={465} y={470} textAnchor="middle" fontFamily={mono} fontWeight={600} fontSize={svgPx(36)} fill={GREY}>conversation</text>
        <text x={768} y={470} textAnchor="middle" fontFamily={mono} fontWeight={600} fontSize={svgPx(36)} fill={AC} opacity={docsP}>tes documents</text>
      </svg>
    </Scene>
  );
};

const SCENES: Scenes = [
  [Reponse, 175],
  [Anecdote, 175],
  [Decoupe, 180],
  [Recherche, 175],
  [Contexte, 165],
  [Etude, 230],
  [Chute, 195],
];

export const RAG_DURATION = totalDuration(SCENES);

export const Rag: React.FC = () => <Short title={["Qu'est-ce que le", 'RAG ?']} scenes={SCENES} accent={AC} />;

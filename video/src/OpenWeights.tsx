// Short Open weights (catégorie Écosystème, accent rose).
// Faits (sources de la fiche open-weights dans lexique/terms.js) : OpenAI publie gpt-oss le 5 août 2025 sous Apache 2.0,
// ses premiers modèles de langage open-weight depuis GPT-2 (2019) ; gpt-oss-120b = 117 milliards de paramètres,
// 65,2 Go de poids en 15 fichiers .safetensors, plus config.json et LICENSE (API Hugging Face, 2 et 6 octobre 2026) ; les données d'entraînement ne sont pas publiées ;
// OLMo 3 (Ai2) publie aussi données, code et étapes d'entraînement.
// Scène propre à ce short : la console de potards qui se range dans un fichier téléchargeable.
import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {BEAT, Check, Cross, DIM, Draw, GREY, Lock, Mono, Pop, Say, Scene, Scenes, Short, W, clamp, mono, serif, svgPx, totalDuration, useProg, withAlpha} from './kit';

const AC = '#F08DC2';
const acA = (a: number) => withAlpha(AC, a);

// Pseudo-aléatoire déterministe.
const rnd = (i: number) => {
  const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};

// Potard : angle en degrés (-135 à 135).
const Knob: React.FC<{cx: number; cy: number; r: number; angle: number; lit?: boolean}> = ({cx, cy, r, angle, lit}) => {
  const a = (angle * Math.PI) / 180;
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={lit ? acA(0.22) : '#151515'} stroke={lit ? AC : '#7a7a7a'} strokeWidth={r * 0.14} />
      <line x1={cx} y1={cy} x2={cx + r * 0.82 * Math.sin(a)} y2={cy - r * 0.82 * Math.cos(a)} stroke={lit ? AC : '#fff'} strokeWidth={r * 0.18} strokeLinecap="round" />
    </g>
  );
};

// Angle final de chaque potard, celui que l'entraînement a fixé.
const finalAngle = (i: number) => -120 + 240 * rnd(i);

// ---------- Scènes ----------

// La frise : GPT-2 ouvert, puis des modèles fermés, puis gpt-oss.
const Annonce: React.FC = () => {
  const draw = useProg(BEAT * 1, BEAT * 7);
  const X0 = 40, X1 = W - 40, Y = 250;
  // Positions écartées à la main : 2019 et 2020 sont trop proches pour que leurs libellés tiennent à l'échelle.
  const xOf = (year: number) => X0 + ({2019: 0, 2020: 0.3, 2023: 0.66, 2025: 1} as Record<number, number>)[year] * (X1 - X0);
  const items = [
    {year: 2019, name: 'GPT-2', open: true, at: BEAT * 1},
    {year: 2020, name: 'GPT-3', open: false, at: BEAT * 2.6},
    {year: 2023, name: 'GPT-4', open: false, at: BEAT * 4.6},
    {year: 2025, name: 'gpt-oss', open: true, at: BEAT * 7},
  ];
  const frame = useCurrentFrame();
  return (
    <Scene
      caps={[[0, 'Le 5 août 2025, OpenAI publie gpt-oss, ses premiers poids ouverts depuis GPT-2.']]}
      bottom={
        <Pop at={BEAT * 8.5} style={{display: 'flex', justifyContent: 'center'}}>
          <Mono size={44} color={GREY}>6 ans sans modèle de langage ouvert</Mono>
        </Pop>
      }
    >
      <svg width={W} height={460} viewBox={`0 0 ${W} 460`} style={{alignSelf: 'center', overflow: 'visible'}}>
        <line x1={X0} y1={Y} x2={X0 + (X1 - X0) * draw} y2={Y} stroke="#555" strokeWidth={6} strokeLinecap="round" />
        {items.map((it) => {
          const on = frame >= it.at;
          const x = xOf(it.year);
          const c = it.open ? AC : '#8a8a8a';
          return (
            <g key={it.name} opacity={on ? 1 : 0}>
              <circle cx={x} cy={Y} r={it.open ? 30 : 20} fill={it.open ? AC : '#000'} stroke={c} strokeWidth={6} />
              <text x={x} y={Y - 70} textAnchor="middle" fontFamily={mono} fontWeight={600} fontSize={svgPx(44)} fill={it.open ? '#fff' : GREY}>{it.name}</text>
              <text x={x} y={Y + 100} textAnchor="middle" fontFamily={mono} fontWeight={600} fontSize={svgPx(38)} fill={DIM}>{it.year}</text>
              {!it.open ? (
                // Petit cadenas sous le point : modèle fermé.
                <g transform={`translate(${x - 22}, ${Y + 128})`}>
                  <rect x={4} y={20} width={36} height={26} rx={4} fill="#8a8a8a" />
                  <path d="M12 20 V12 a10 10 0 0 1 20 0 V20" fill="none" stroke="#8a8a8a" strokeWidth={6} />
                </g>
              ) : null}
            </g>
          );
        })}
      </svg>
    </Scene>
  );
};

// La console de potards se règle, puis se range dans les fichiers qu'on télécharge.
const PACK = BEAT * 8;
const Console: React.FC = () => {
  const frame = useCurrentFrame();
  const set = useProg(BEAT * 0.6, BEAT * 5);
  const pack = useProg(PACK, PACK + BEAT * 1.6);
  const COLS = 6, ROWS = 4, CELL = 130;
  const CW = COLS * CELL, CH = ROWS * CELL;
  const knobs: React.ReactNode[] = [];
  for (let i = 0; i < COLS * ROWS; i++) {
    const c = i % COLS, r = Math.floor(i / COLS);
    // Chaque potard part d'un angle quelconque et se pose sur sa valeur finale, en décalé.
    const local = interpolate(set, [rnd(i + 50) * 0.5, rnd(i + 50) * 0.5 + 0.5], [0, 1], clamp);
    const angle = interpolate(local, [0, 1], [finalAngle(i + 7), finalAngle(i)]);
    knobs.push(<Knob key={i} cx={c * CELL + CELL / 2} cy={r * CELL + CELL / 2} r={CELL * 0.34} angle={angle} lit={local >= 1} />);
  }
  const file = (name: string, info: string, at: number) => (
    <Pop at={at} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: W - 40, padding: '26px 34px', border: `4px solid ${acA(0.8)}`, borderRadius: 14, background: '#0d0d0d'}}>
      <Mono size={44} color="#fff">{name}</Mono>
      <Mono size={44}>{info}</Mono>
    </Pop>
  );
  return (
    <Scene
      caps={[[0, 'On télécharge ses *117 milliards* de paramètres, environ 65 Go, et sa licence.']]}
      bottom={
        <div style={{display: 'flex', justifyContent: 'center'}}>
          {frame < PACK ? (
            <Pop at={BEAT * 2}>
              <Mono size={44} color={GREY}>réglés pendant l'entraînement</Mono>
            </Pop>
          ) : null}
        </div>
      }
      gap={28}
    >
      {frame < PACK + BEAT * 1.6 ? (
        <div style={{alignSelf: 'center', transform: `scale(${1 - 0.85 * pack})`, opacity: 1 - pack}}>
          <svg width={CW} height={CH} viewBox={`0 0 ${CW} ${CH}`}>{knobs}</svg>
        </div>
      ) : (
        <>
          {file('15 × .safetensors', '65 Go', PACK + BEAT * 1.6)}
          {file('config.json', 'réglages', PACK + BEAT * 2.4)}
          {file('LICENSE', 'Apache 2.0', PACK + BEAT * 3.2)}
        </>
      )}
    </Scene>
  );
};

// Ce qui est publié, modèle par modèle : gpt-oss d'abord, puis OLMo 3 à côté.
const OLMO = 180;
const ROWS = ['poids', 'licence', "code d'entraînement", 'données', 'étapes'];
const Publie: React.FC = () => {
  const frame = useCurrentFrame();
  const cell = (open: boolean, at: number) => {
    const p = interpolate(frame, [at, at + 10], [0, 1], clamp);
    return (
      <div style={{width: 200, display: 'flex', justifyContent: 'center', opacity: frame >= at ? 1 : 0}}>
        {open ? <Check p={p} size={70} color={AC} /> : <Lock p={p} size={64} color="#8a8a8a" />}
      </div>
    );
  };
  return (
    <Scene
      caps={[
        [0, "Les données et le code d'entraînement, eux, restent chez OpenAI."],
        [OLMO, "OLMo 3, de l'institut Ai2, publie aussi ses données et chaque étape."],
      ]}
      gap={22}
    >
      <div style={{display: 'flex', alignItems: 'center'}}>
        <div style={{flex: 1}} />
        <div style={{width: 200, display: 'flex', justifyContent: 'center'}}><Mono size={40} color="#fff">gpt-oss</Mono></div>
        <div style={{width: 200, display: 'flex', justifyContent: 'center', opacity: frame >= OLMO ? 1 : 0}}><Mono size={40} color="#fff">OLMo 3</Mono></div>
      </div>
      {ROWS.map((label, k) => (
        <Pop key={label} at={BEAT * 0.6 + k * 8} style={{display: 'flex', alignItems: 'center', borderTop: '3px solid #2a2a2a', paddingTop: 18}}>
          <div style={{flex: 1}}><Mono size={40} color={GREY}>{label}</Mono></div>
          {cell(k < 2, BEAT * 1.4 + k * 12)}
          {cell(true, OLMO + BEAT * 0.8 + k * 8)}
        </Pop>
      ))}
    </Scene>
  );
};

// Chez toi : le modèle tourne dans ta boîte, la flèche vers l'éditeur est barrée.
const ChezToi: React.FC = () => {
  const arrow = useProg(BEAT * 2, BEAT * 3.4);
  const cross = useProg(BEAT * 4, BEAT * 5);
  return (
    <Scene
      caps={[[0, 'Tu peux donc le faire tourner chez toi, sans rien envoyer à personne.']]}
      bottom={
        <Pop at={BEAT * 6} style={{display: 'flex', justifyContent: 'center'}}>
          <Mono size={44} color={GREY}>tes données restent sur tes serveurs</Mono>
        </Pop>
      }
    >
      <div style={{position: 'relative', width: W, height: 460, alignSelf: 'center'}}>
        <Pop at={BEAT * 0.6} style={{position: 'absolute', left: 0, top: 40, width: 400, height: 380, border: `5px solid ${AC}`, borderRadius: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 26}}>
          <svg width={260} height={170} viewBox="0 0 260 170">
            {Array.from({length: 6}, (_, i) => (
              <Knob key={i} cx={45 + (i % 3) * 85} cy={42 + Math.floor(i / 3) * 86} r={30} angle={finalAngle(i)} lit />
            ))}
          </svg>
          <Mono size={40} color="#fff">tes serveurs</Mono>
        </Pop>
        <svg width={W} height={460} viewBox={`0 0 ${W} 460`} style={{position: 'absolute', left: 0, top: 0}}>
          <Draw d="M420 230 L640 230" p={arrow} color="#777" width={8} len={230} />
          <path d={`M620 210 L645 230 L620 250`} fill="none" stroke="#777" strokeWidth={8} strokeLinecap="round" opacity={arrow > 0.95 ? 1 : 0} />
          <g transform="translate(470, 170)">
            <svg width={120} height={120} viewBox="0 0 100 100" opacity={cross > 0 ? 1 : 0}>
              <Draw d="M20 20 L80 80" p={Math.min(1, cross * 2)} color="#FF4D4D" width={12} len={90} />
              <Draw d="M80 20 L20 80" p={Math.max(0, cross * 2 - 1)} color="#FF4D4D" width={12} len={90} />
            </svg>
          </g>
        </svg>
        <Pop at={BEAT * 1.6} style={{position: 'absolute', right: 0, top: 150, width: 210, height: 160, border: '5px dashed #555', borderRadius: 80, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Mono size={38} color={DIM}>éditeur</Mono>
        </Pop>
      </div>
    </Scene>
  );
};

// Chute : le résultat est sur la table, la recette reste sous cadenas.
const Chute: React.FC = () => {
  const lockP = useProg(BEAT * 3, BEAT * 4);
  const card = (children: React.ReactNode, border: string, at: number) => (
    <Pop at={at} style={{width: (W - 40) / 2, height: 560, border: `5px solid ${border}`, borderRadius: 22, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 30}}>
      {children}
    </Pop>
  );
  return (
    <Scene caps={[[0, "Open weights te donne *le résultat* de l'entraînement, pas de quoi le refaire."]]}>
      <div style={{display: 'flex', justifyContent: 'space-between', width: W}}>
        {card(
          <>
            <svg width={300} height={200} viewBox="0 0 300 200">
              {Array.from({length: 6}, (_, i) => (
                <Knob key={i} cx={55 + (i % 3) * 95} cy={50 + Math.floor(i / 3) * 100} r={36} angle={finalAngle(i + 3)} lit />
              ))}
            </svg>
            <div style={{fontFamily: serif, fontWeight: 800, fontStyle: 'italic', fontSize: 76, color: AC}}>le résultat</div>
            <Mono size={40} color={GREY}>poids publiés</Mono>
          </>,
          AC,
          BEAT * 1,
        )}
        {card(
          <>
            <Lock p={lockP} size={190} color="#8a8a8a" />
            <div style={{fontFamily: serif, fontWeight: 800, fontStyle: 'italic', fontSize: 76, color: '#bbb'}}>la recette</div>
            <Mono size={40} color={DIM}>données privées</Mono>
          </>,
          '#444',
          BEAT * 2.4,
        )}
      </div>
    </Scene>
  );
};

const SCENES: Scenes = [
  [Annonce, 225],
  [Console, 250],
  [Publie, 380],
  [ChezToi, 210],
  [Chute, 250],
];

export const OPENWEIGHTS_DURATION = totalDuration(SCENES);

export const OpenWeights: React.FC = () => <Short title={["Qu'est-ce qu'un modèle", 'open', 'weights ?']} scenes={SCENES} accent={AC} />;

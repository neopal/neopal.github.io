// Short Paramètres : la console de potards, réglée pendant l'entraînement puis figée.
import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {ACCENT, BEAT, Big, Bubble, Check, Cross, Eye, GREY, Hi, Lock, Mono, Pop, RED, Say, Scene, Scenes, Short, clamp, totalDuration, useProg} from './kit';

// Pseudo-aléatoire déterministe.
const rnd = (i: number) => {
  const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};

// ---------- La console ----------

type KnobFn = (i: number) => number;

// Grille de potards dessinée dans un seul SVG. angle en degrés (-135 à 135), lit de 0 à 1.
const Console: React.FC<{cols: number; rows: number; width?: number; maxCell?: number; angle: KnobFn; lit?: KnobFn; dim?: number}> = ({
  cols,
  rows,
  width = 888,
  maxCell = 300,
  angle,
  lit = () => 0,
  dim = 1,
}) => {
  const cell = Math.min(width / cols, maxCell);
  const W = cell * cols;
  const H = cell * rows;
  const knobs: React.ReactNode[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const i = r * cols + c;
      const cx = c * cell + cell / 2;
      const cy = r * cell + cell / 2;
      const rad = cell * 0.36;
      const a = (angle(i) * Math.PI) / 180;
      const l = lit(i) > 0.02 ? lit(i) : 0;
      const stroke = l > 0 ? ACCENT : '#7a7a7a';
      knobs.push(
        <g key={i} opacity={l > 0 ? 1 : dim}>
          <circle cx={cx} cy={cy} r={rad} fill={l > 0 ? `rgba(124,255,178,${0.25 * l})` : '#151515'} stroke={stroke} strokeWidth={Math.max(1.5, cell * 0.05)} />
          <line x1={cx} y1={cy} x2={cx + rad * 0.85 * Math.sin(a)} y2={cy - rad * 0.85 * Math.cos(a)} stroke={l > 0 ? ACCENT : '#fff'} strokeWidth={Math.max(1.5, cell * 0.07)} strokeLinecap="round" />
        </g>,
      );
    }
  }
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{display: 'block', alignSelf: 'center'}}>
      {knobs}
    </svg>
  );
};

const baseAngle = (i: number) => -120 + 240 * rnd(i);

// ---------- Scènes ----------

const Question: React.FC = () => (
  <Scene gap={14}>
    <Pop at={0}><Say size={104}>Que sont les paramètres d'un</Say></Pop>
    <Pop at={8}><Big size={190} color={ACCENT}><span style={{whiteSpace: 'nowrap'}}>modèle ?</span></Big></Pop>
  </Scene>
);

// Un potard qui tourne (= un nombre qui change), puis la console qui se multiplie.
const Reponse: React.FC = () => {
  const frame = useCurrentFrame();
  const STEPS = [
    {at: 0, cols: 1, rows: 1},
    {at: BEAT * 4, cols: 3, rows: 2},
    {at: BEAT * 4.5, cols: 8, rows: 5},
    {at: BEAT * 5, cols: 16, rows: 10},
    {at: BEAT * 5.5, cols: 28, rows: 17},
  ];
  const step = [...STEPS].reverse().find((s) => frame >= s.at) ?? STEPS[0];
  const turn = interpolate(frame, [BEAT, BEAT * 1.6, BEAT * 2.4, BEAT * 3.2], [-60, 70, 20, 95], clamp);
  const single = step.cols === 1;
  const value = (turn / 135) * 0.05;
  return (
    <Scene gap={50}>
      <Pop at={0}><Say size={68}>Un paramètre est un nombre que le modèle règle, comme un <Hi>potard</Hi> sur une console de mixage.</Say></Pop>
      <div style={{height: 560, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20}}>
        <Pop at={BEAT * 0.6}>
          <Console cols={step.cols} rows={step.rows} maxCell={300} angle={(i) => (single ? turn : baseAngle(i))} dim={step.cols > 10 ? 0.6 : 1} />
        </Pop>
        <div style={{height: 60, opacity: single && frame >= BEAT ? 1 : 0}}>
          <Mono size={52}>{value.toFixed(4).replace('.', ',')}</Mono>
        </div>
      </div>
      <div style={{height: 90}}>
        <Pop at={BEAT * 6.5}><Say size={68}>Et un modèle de langage en contient des <Hi>milliards.</Hi></Say></Pop>
      </div>
    </Scene>
  );
};

// Barres qui se construisent : GPT-3 puis DeepSeek-V3.
const Taille: React.FC = () => {
  const g1 = useProg(BEAT, BEAT * 2.2);
  const g2 = useProg(BEAT * 3.2, BEAT * 4.6);
  const MAX = 671;
  const bar = (label: string, n: number, g: number, at: number, color: string) => (
    <Pop at={at} style={{display: 'flex', flexDirection: 'column', gap: 14}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
        <Mono size={40} color={GREY}>{label}</Mono>
        <Mono size={44} color={color}>{Math.round(n * g)} milliards</Mono>
      </div>
      <div style={{height: 72, width: `${(n / MAX) * 100 * g}%`, background: color}} />
    </Pop>
  );
  return (
    <Scene gap={70}>
      <Pop at={0}><Say size={66}>GPT-3 en avait 175 milliards en 2020, et DeepSeek-V3 en a <Hi>671 milliards</Hi> fin 2024.</Say></Pop>
      <div style={{display: 'flex', flexDirection: 'column', gap: 50}}>
        {bar('GPT-3, 2020', 175, g1, BEAT * 0.8, '#fff')}
        {bar('DeepSeek-V3, fin 2024', 671, g2, BEAT * 3, ACCENT)}
      </div>
    </Scene>
  );
};

// L'entraînement : chaque erreur fait tourner les potards, puis la console se fige.
const Entrainement: React.FC = () => {
  const frame = useCurrentFrame();
  const t1 = useProg(BEAT * 2.2, BEAT * 3);
  const t2 = useProg(BEAT * 4.4, BEAT * 5.2);
  const lock = useProg(BEAT * 8, BEAT * 8 + 10);
  const tries = [
    {at: BEAT * 1.4, w: 'Lyon', ok: false},
    {at: BEAT * 3.6, w: 'Marseille', ok: false},
    {at: BEAT * 5.8, w: 'Paris', ok: true},
  ];
  const cur = [...tries].reverse().find((t) => frame >= t.at);
  const iconP = cur ? interpolate(frame, [cur.at + 3, cur.at + 12], [0, 1], clamp) : 0;
  const angle = (i: number) => baseAngle(i) + (rnd(i + 100) - 0.5) * 70 * t1 + (rnd(i + 200) - 0.5) * 50 * t2;
  return (
    <Scene gap={44}>
      <Pop at={0}><Say size={60}>Pendant l'entraînement, le modèle prédit le token suivant, et chaque erreur fait tourner les potards d'un cran.</Say></Pop>
      <Pop at={BEAT * 0.8}>
        <Say size={54} color={GREY}>La capitale de la France est</Say>
        <div style={{height: 120, display: 'flex', alignItems: 'center', gap: 24}}>
          {cur ? (
            <>
              <Big size={96} color={cur.ok ? ACCENT : RED}>{cur.w}</Big>
              {cur.ok ? <Check p={iconP} size={96} /> : <Cross p={iconP} size={90} />}
            </>
          ) : (
            <div style={{width: 8, height: 90, background: ACCENT, opacity: frame % 10 < 5 ? 1 : 0}} />
          )}
        </div>
      </Pop>
      <div style={{position: 'relative'}}>
        <Pop at={BEAT * 0.8}>
          <Console cols={10} rows={3} angle={angle} lit={() => Math.max(Math.sin(Math.PI * t1), Math.sin(Math.PI * t2))} dim={1 - 0.6 * lock} />
        </Pop>
        <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          {lock > 0 ? <Lock p={lock} size={170} /> : null}
        </div>
      </div>
      <div style={{height: 160}}>
        <Pop at={BEAT * 8}><Say size={60}>À la fin, on fige la console, et c'est ce réglage figé qu'on appelle <Hi>le modèle.</Hi></Say></Pop>
      </div>
    </Scene>
  );
};

// Où est rangé un fait ? Nulle part en particulier : il s'allume sur des potards dispersés.
const PARIS = new Set(Array.from({length: 84}, (_, i) => i).filter((i) => rnd(i + 300) < 0.3));

const Paris: React.FC = () => {
  const frame = useCurrentFrame();
  const scanning = frame >= BEAT && frame < BEAT * 3.6;
  const look = Math.sin((frame - BEAT) / 5);
  const lit = (i: number) => (PARIS.has(i) ? interpolate(frame, [BEAT * 3.6 + rnd(i + 400) * 12, BEAT * 3.6 + rnd(i + 400) * 12 + 4], [0, 1], clamp) : 0);
  return (
    <Scene gap={44}>
      <Pop at={0}><Say size={64}>Alors, dans quel potard est rangé « <Hi>Paris est la capitale de la France</Hi> » ?</Say></Pop>
      <div style={{height: 80, display: 'flex', justifyContent: 'center', opacity: scanning ? 1 : 0}}>
        <Eye look={look} size={130} />
      </div>
      <Pop at={BEAT * 0.6}>
        <Console cols={12} rows={7} angle={baseAngle} lit={lit} dim={0.55} />
      </Pop>
      <div style={{height: 230}}>
        <Pop at={BEAT * 5}><Say size={62}>Aucun potard ne le contient seul, parce que ce fait est <Hi>réparti sur des milliers</Hi> d'entre eux.</Say></Pop>
      </div>
    </Scene>
  );
};

// Une conversation passe, la console ne bouge pas.
const EtDonc: React.FC = () => {
  const frame = useCurrentFrame();
  const lock = useProg(BEAT * 4, BEAT * 4 + 10);
  return (
    <Scene gap={34}>
      <Pop at={0}><Say size={58}>Et donc, quand tu discutes avec un modèle, ses paramètres restent figés, et ta conversation <Hi>ne le modifie pas.</Hi></Say></Pop>
      <Bubble side="right" at={BEAT * 1.4}><Say size={46}>Voici les chiffres de mon client.</Say></Bubble>
      <Bubble side="left" at={BEAT * 2.8}><Say size={46}>Je les ai sous les yeux pour cette conversation.</Say></Bubble>
      <div style={{position: 'relative', marginTop: 20}}>
        <Pop at={BEAT * 4}>
          <Console cols={10} rows={2} angle={baseAngle} dim={0.4} />
        </Pop>
        <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          {lock > 0 ? <Lock p={lock} size={130} /> : null}
        </div>
      </div>
      <Pop at={BEAT * 5.5}>
        <div style={{display: 'flex', alignItems: 'baseline', gap: 20, justifyContent: 'center'}}>
          <Mono size={44} color={GREY}>paramètres modifiés :</Mono>
          <Mono size={96}>{frame >= BEAT * 5.5 ? '0' : ''}</Mono>
        </div>
      </Pop>
    </Scene>
  );
};

// Effacer : une ligne de base de données part proprement, un fait réparti non.
const ROWS = [
  ['Lyon', 'préfecture', 'Rhône'],
  ['Paris', 'capitale', 'France'],
  ['Rome', 'capitale', 'Italie'],
];

const Chute: React.FC = () => {
  const frame = useCurrentFrame();
  const strike = useProg(BEAT * 2.4, BEAT * 3);
  const gone = useProg(BEAT * 3.2, BEAT * 3.8);
  const okP = useProg(BEAT * 3.8, BEAT * 4.4);
  const crossP = useProg(BEAT * 7, BEAT * 7.8);
  const lit = (i: number) => (PARIS.has(i) ? 1 : 0);
  return (
    <Scene gap={36}>
      <Pop at={0}><Say size={58}>C'est aussi pour ça qu'on ne peut pas effacer une information d'un modèle comme on supprime <Hi>une ligne dans une base de données.</Hi></Say></Pop>
      <Pop at={BEAT * 1.2}>
        <Mono size={34} color="#8a8a8a">base de données</Mono>
        <div style={{display: 'flex', alignItems: 'center', gap: 24, marginTop: 12}}>
          <div style={{flex: 1, border: '4px solid #444'}}>
            {ROWS.map((r, k) => {
              const target = k === 1;
              return (
                <div key={k} style={{position: 'relative', display: 'flex', overflow: 'hidden', height: target ? 64 * (1 - gone) : 64, borderTop: k ? '3px solid #333' : 'none', background: target && frame >= BEAT * 2 ? 'rgba(255,77,77,.15)' : 'transparent'}}>
                  {r.map((c) => (
                    <div key={c} style={{flex: 1, padding: '10px 16px'}}><Mono size={34} color={target ? '#fff' : GREY}>{c}</Mono></div>
                  ))}
                  {target ? <div style={{position: 'absolute', left: 12, top: 31, height: 5, width: `${strike * 95}%`, background: RED}} /> : null}
                </div>
              );
            })}
          </div>
          <Check p={okP} size={90} />
        </div>
      </Pop>
      <Pop at={BEAT * 5}>
        <Mono size={34} color="#8a8a8a">modèle</Mono>
        <div style={{display: 'flex', alignItems: 'center', gap: 24, marginTop: 12}}>
          <Console cols={12} rows={7} width={770} angle={baseAngle} lit={lit} dim={0.5} />
          <Cross p={crossP} size={90} />
        </div>
      </Pop>
    </Scene>
  );
};

const SCENES: Scenes = [
  [Question, 60],
  [Reponse, 150],
  [Taille, 120],
  [Entrainement, 180],
  [Paris, 150],
  [EtDonc, 150],
  [Chute, 150],
];

export const PARAMETRES_DURATION = totalDuration(SCENES);

export const Parametres: React.FC = () => <Short scenes={SCENES} />;

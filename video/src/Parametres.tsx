// Short Paramètres : la console de potards, réglée pendant l'entraînement puis figée.
// Scène propre à ce short : le compteur qui lit les 671 milliards de paramètres un par seconde et fait défiler 21 000 ans.
import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {ACCENT, BEAT, Big, Bubble, Check, Cross, DIM, GREY, Lock, Mono, Pop, RED, Say, Scene, Scenes, Short, W, clamp, totalDuration, useProg, withAlpha} from './kit';

const greenA = (a: number) => withAlpha(ACCENT, a);

// Pseudo-aléatoire déterministe.
const rnd = (i: number) => {
  const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};

const fmt = (n: number) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

// ---------- La console ----------

type KnobFn = (i: number) => number;

// Grille de potards dessinée dans un seul SVG. angle en degrés (-135 à 135), lit de 0 à 1.
const Console: React.FC<{cols: number; rows: number; width?: number; maxCell?: number; angle: KnobFn; lit?: KnobFn; dim?: number}> = ({cols, rows, width = W, maxCell = 300, angle, lit = () => 0, dim = 1}) => {
  const cell = Math.min(width / cols, maxCell);
  const CW = cell * cols;
  const CH = cell * rows;
  const knobs: React.ReactNode[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const i = r * cols + c;
      const cx = c * cell + cell / 2;
      const cy = r * cell + cell / 2;
      const rad = cell * 0.36;
      const a = (angle(i) * Math.PI) / 180;
      const l = lit(i) > 0.02 ? lit(i) : 0;
      knobs.push(
        <g key={i} opacity={l > 0 ? 1 : dim}>
          <circle cx={cx} cy={cy} r={rad} fill={l > 0 ? greenA(0.25 * l) : '#151515'} stroke={l > 0 ? ACCENT : '#7a7a7a'} strokeWidth={Math.max(1.5, cell * 0.05)} />
          <line x1={cx} y1={cy} x2={cx + rad * 0.85 * Math.sin(a)} y2={cy - rad * 0.85 * Math.cos(a)} stroke={l > 0 ? ACCENT : '#fff'} strokeWidth={Math.max(1.5, cell * 0.07)} strokeLinecap="round" />
        </g>,
      );
    }
  }
  return (
    <svg width={CW} height={CH} viewBox={`0 0 ${CW} ${CH}`} style={{display: 'block', alignSelf: 'center'}}>
      {knobs}
    </svg>
  );
};

const baseAngle = (i: number) => -120 + 240 * rnd(i);

// ---------- Scènes ----------

// Un potard qui tourne (= un nombre qui change), puis la console qui se multiplie.
const Reponse: React.FC = () => {
  const frame = useCurrentFrame();
  const STEPS = [
    {at: 0, cols: 1, rows: 1},
    {at: BEAT * 5, cols: 3, rows: 2},
    {at: BEAT * 5.5, cols: 8, rows: 5},
    {at: BEAT * 6, cols: 16, rows: 10},
    {at: BEAT * 6.5, cols: 28, rows: 17},
  ];
  const step = [...STEPS].reverse().find((s) => frame >= s.at) ?? STEPS[0];
  const turn = interpolate(frame, [BEAT, BEAT * 1.8, BEAT * 2.8, BEAT * 3.8], [-60, 70, 20, 95], clamp);
  const single = step.cols === 1;
  const value = (turn / 135) * 0.05;
  return (
    <Scene
      caps={[[0, "Un paramètre est un nombre, comme la position d'un potard, et un modèle de langage en contient des *milliards*."]]}
      bottom={
        <div style={{display: 'flex', justifyContent: 'center'}}>
          {single ? (
            <div style={{opacity: frame >= BEAT ? 1 : 0}}><Mono size={64}>{value.toFixed(4).replace('.', ',')}</Mono></div>
          ) : null}
        </div>
      }
    >
      <Pop at={BEAT * 0.6}>
        <Console cols={step.cols} rows={step.rows} maxCell={340} angle={(i) => (single ? turn : baseAngle(i))} dim={step.cols > 10 ? 0.6 : 1} />
      </Pop>
    </Scene>
  );
};

// Lire les paramètres un par seconde : le compteur de paramètres et le compteur d'années tournent ensemble.
const YEARS = 21000;
const Lecture: React.FC = () => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [BEAT * 2.4, BEAT * 11], [0, 1], {...clamp, easing: (t) => t * t * (3 - 2 * t)});
  const years = YEARS * p;
  const done = p >= 1;
  return (
    <Scene
      caps={[[0, 'DeepSeek-V3 en a 671 milliards, et les lire à voix haute, un par seconde, prendrait environ 21 000 ans.']]}
      gap={40}
    >
      <Pop at={BEAT * 0.6} style={{display: 'flex', flexDirection: 'column', gap: 8}}>
        <Mono size={40} color={GREY}>paramètres lus</Mono>
        <Mono size={76} color="#fff">{fmt(671e9 * p)}</Mono>
      </Pop>
      <Pop at={BEAT * 1.2} style={{display: 'flex', flexDirection: 'column', gap: 14, marginTop: 30}}>
        <div style={{position: 'relative', height: 120}}>
          <div style={{position: 'absolute', left: 0, right: 0, top: 54, height: 6, background: '#333'}} />
          {Array.from({length: 22}, (_, k) => (
            <div key={k} style={{position: 'absolute', left: (k / 21) * (W - 6), top: k % 5 === 0 ? 30 : 42, width: 6, height: k % 5 === 0 ? 54 : 30, background: k / 21 <= p ? ACCENT : '#444'}} />
          ))}
          <div style={{position: 'absolute', left: 0, top: 54, height: 6, width: `${p * 100}%`, background: ACCENT}} />
        </div>
        <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'flex-end', gap: 20}}>
          <Big size={140} color="#fff">{fmt(years)}</Big>
          <Mono size={56} color={GREY}>ans</Mono>
        </div>
      </Pop>
    </Scene>
  );
};

// L'entraînement : chaque erreur fait tourner les potards d'un cran.
const Entrainement: React.FC = () => {
  const frame = useCurrentFrame();
  const t1 = useProg(BEAT * 3.4, BEAT * 4.4);
  const tries = [
    {at: BEAT * 2.2, w: 'le Cervin', ok: false},
    {at: BEAT * 5.6, w: 'le Mont-Blanc', ok: true},
  ];
  const cur = [...tries].reverse().find((t) => frame >= t.at);
  const iconP = cur ? interpolate(frame, [cur.at + 3, cur.at + 12], [0, 1], clamp) : 0;
  const angle = (i: number) => baseAngle(i) + (rnd(i + 100) - 0.5) * 80 * t1;
  return (
    <Scene caps={[[0, "Pendant l'entraînement, chaque paramètre est ajusté par petites touches pour que le modèle prédise mieux le token suivant."]]} gap={36}>
      <Pop at={BEAT}>
        <Say size={52} color={GREY}>Le plus haut sommet des Alpes est</Say>
        <div style={{height: 120, display: 'flex', alignItems: 'center', gap: 24}}>
          {cur ? (
            <>
              <Big size={96} color={cur.ok ? '#fff' : RED}>{cur.w}</Big>
              {cur.ok ? <Check p={iconP} size={96} /> : <Cross p={iconP} size={90} />}
            </>
          ) : (
            <div style={{width: 8, height: 90, background: ACCENT, opacity: frame % 10 < 5 ? 1 : 0}} />
          )}
        </div>
      </Pop>
      <Pop at={BEAT}>
        <Console cols={10} rows={3} angle={angle} lit={() => Math.sin(Math.PI * t1)} />
      </Pop>
    </Scene>
  );
};

// La console se fige, une conversation passe dessus sans rien tourner.
const Fige: React.FC = () => {
  const frame = useCurrentFrame();
  const lock = useProg(BEAT * 1, BEAT * 1 + 10);
  return (
    <Scene
      caps={[[0, "Ensuite ils ne bougent plus, et c'est pour ça que discuter avec lui ne le change pas."]]}
      gap={40}
      bottom={
        <Pop at={BEAT * 6} style={{display: 'flex', alignItems: 'baseline', gap: 24, justifyContent: 'center'}}>
          <Mono size={110}>0</Mono>
          <Mono size={44} color={GREY}>paramètre modifié</Mono>
        </Pop>
      }
    >
      <div style={{position: 'relative'}}>
        <Console cols={10} rows={2} angle={baseAngle} dim={1 - 0.6 * lock} />
        <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          {lock > 0 ? <Lock p={lock} size={140} /> : null}
        </div>
      </div>
      <Bubble side="right" at={BEAT * 2.6}><Say size={50}>Voici les chiffres de mon client.</Say></Bubble>
    </Scene>
  );
};

// Où est rangé un fait ? Nulle part en particulier : il s'allume sur des potards dispersés.
const FACT = new Set(Array.from({length: 96}, (_, i) => i).filter((i) => rnd(i + 300) < 0.3));

const Reparti: React.FC = () => {
  const frame = useCurrentFrame();
  const lit = (i: number) => (FACT.has(i) ? interpolate(frame, [BEAT * 2 + rnd(i + 400) * 30, BEAT * 2 + rnd(i + 400) * 30 + 4], [0, 1], clamp) : 0);
  return (
    <Scene
      caps={[[0, 'Un fait comme « le Mont-Blanc est le plus haut sommet des Alpes » est *réparti* sur des milliers de paramètres.']]}
      bottom={
        <Pop at={BEAT * 6} style={{display: 'flex', justifyContent: 'center'}}>
          <Mono size={44} color={GREY}>aucun potard ne le contient seul</Mono>
        </Pop>
      }
    >
      <Pop at={BEAT * 0.6}>
        <Console cols={12} rows={8} angle={baseAngle} lit={lit} dim={0.55} />
      </Pop>
    </Scene>
  );
};

// Effacer : une ligne de base de données part proprement, un fait réparti non.
const ROWS = [
  ['Loire', 'fleuve', 'France'],
  ['Mont-Blanc', 'sommet', 'Alpes'],
  ['Etna', 'volcan', 'Sicile'],
];

const Chute: React.FC = () => {
  const frame = useCurrentFrame();
  const strike = useProg(BEAT * 2.4, BEAT * 3);
  const gone = useProg(BEAT * 3.2, BEAT * 3.8);
  const okP = useProg(BEAT * 3.8, BEAT * 4.4);
  const crossP = useProg(BEAT * 6.4, BEAT * 7.2);
  const lit = (i: number) => (FACT.has(i) ? 1 : 0);
  return (
    <Scene caps={[[0, "On ne peut donc pas l'effacer comme on supprime une ligne dans une base de données."]]} gap={40}>
      <Pop at={BEAT * 1.2}>
        <Mono size={40} color={DIM}>base de données</Mono>
        <div style={{display: 'flex', alignItems: 'center', gap: 24, marginTop: 12}}>
          <div style={{flex: 1, border: '4px solid #444'}}>
            {ROWS.map((r, k) => {
              const target = k === 1;
              return (
                <div key={k} style={{position: 'relative', display: 'flex', overflow: 'hidden', height: target ? 70 * (1 - gone) : 70, borderTop: k ? '3px solid #333' : 'none', background: target && frame >= BEAT * 2 ? 'rgba(255,77,77,.15)' : 'transparent'}}>
                  {r.map((c) => (
                    <div key={c} style={{flex: 1, padding: '12px 14px'}}><Mono size={38} color={target ? '#fff' : GREY}>{c}</Mono></div>
                  ))}
                  {target ? <div style={{position: 'absolute', left: 12, top: 33, height: 5, width: `${strike * 95}%`, background: RED}} /> : null}
                </div>
              );
            })}
          </div>
          <Check p={okP} size={90} />
        </div>
      </Pop>
      <Pop at={BEAT * 5}>
        <Mono size={40} color={DIM}>modèle</Mono>
        <div style={{display: 'flex', alignItems: 'center', gap: 24, marginTop: 12}}>
          <Console cols={12} rows={6} width={770} angle={baseAngle} lit={lit} dim={0.5} />
          <Cross p={crossP} size={90} />
        </div>
      </Pop>
    </Scene>
  );
};

const SCENES: Scenes = [
  [Reponse, 200],
  [Lecture, 200],
  [Entrainement, 230],
  [Fige, 215],
  [Reparti, 200],
  [Chute, 190],
];

export const PARAMETRES_DURATION = totalDuration(SCENES);

export const Parametres: React.FC = () => <Short title={['Que sont les', 'paramètres ?']} scenes={SCENES} />;

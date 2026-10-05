// Short Mythe « 95 % des projets d'IA échouent » (catégorie Mythes, accent rouge corail).
// Faits : MIT NANDA, The GenAI Divide, juillet 2025 (52 organisations interrogées, 153 réponses ; outils spécialisés :
// 60 % étudiés, 20 % en pilote, 5 % mis en place) ; Fortune, 18 août 2025 ; CNN, 20 août 2025 (Nasdaq -1,46 %,
// Palantir -9,35 % le 19 août). Calcul : 5 / 20, environ un pilote sur quatre.
// Scène propre à ce short : la grille de 100 cases dont le dénominateur passe de 100 à 20.
import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {BEAT, DIM, GREY, Mono, Pop, Say, Scene, Scenes, Short, W, clamp, mono, serif, totalDuration, useProg, withAlpha} from './kit';

const AC = '#FF7A7A';
const acA = (a: number) => withAlpha(AC, a);

// ---------- La grille de 100 organisations ----------
// k < 5 : mis en place ; k < 20 : pilote ; k < 60 : étudié ; le reste : rien.
const CELL = 64;
const GAP = 12;
type Mode = {build: number; fadeNoPilot?: number; litPilot?: number};
const Grid: React.FC<Mode> = ({build, fadeNoPilot = 0, litPilot = 0}) => (
  <div style={{display: 'grid', gridTemplateColumns: `repeat(10, ${CELL}px)`, gap: GAP, alignSelf: 'center'}}>
    {Array.from({length: 100}, (_, k) => {
      const tier = k < 5 ? 3 : k < 20 ? 2 : k < 60 ? 1 : 0;
      const on = build >= [0, 0.33, 0.66, 1][tier] || tier === 0;
      const noPilot = tier <= 1;
      const border = tier === 3 ? AC : tier === 2 ? (on ? AC : '#333') : tier === 1 && on ? '#777' : '#2c2c2c';
      const bg = tier === 3 && on ? AC : tier === 2 && litPilot > 0 ? acA(0.18 * litPilot) : 'transparent';
      return (
        <div key={k} style={{width: CELL, height: CELL, borderRadius: 6, border: `4px solid ${on ? border : '#2c2c2c'}`, background: bg, opacity: noPilot ? 1 - 0.8 * fadeNoPilot : 1, transform: `scale(${tier >= 2 ? 1 + 0.06 * litPilot : 1})`}} />
      );
    })}
  </div>
);

// ---------- Scènes ----------

const DROP = 205;

const Titre: React.FC = () => {
  const frame = useCurrentFrame();
  const after = frame >= DROP;
  const fall = useProg(DROP + BEAT * 1, DROP + BEAT * 4);
  const stock = (name: string, pct: string, depth: number, at: number) => (
    <Pop at={at} style={{display: 'flex', alignItems: 'center', gap: 26}}>
      <div style={{width: 280}}><Mono size={48} color="#fff">{name}</Mono></div>
      <svg width={360} height={120} viewBox="0 0 360 120">
        <polyline points={`0,30 90,26 150,34 200,30 ${200 + 160 * fall},${30 + depth * fall}`} fill="none" stroke={AC} strokeWidth={8} strokeLinejoin="round" />
      </svg>
      <Mono size={48} color={AC}>{fall > 0.9 ? pct : ''}</Mono>
    </Pop>
  );
  return (
    <Scene
      caps={[
        [0, "En août 2025, Fortune titre que 95 % des pilotes d'IA en entreprise échouent."],
        [DROP, 'Le lendemain, le Nasdaq perd 1,46 % et Palantir plus de 9 %.'],
      ]}
      gap={50}
    >
      {!after ? (
        <Pop at={BEAT * 1.4} style={{alignSelf: 'center', border: '4px solid #555', borderRadius: 10, padding: '34px 40px', width: W - 60, display: 'flex', flexDirection: 'column', gap: 18}}>
          <Mono size={36} color={DIM}>MIT report</Mono>
          <div style={{fontFamily: serif, fontWeight: 800, fontSize: 210, lineHeight: 0.9, color: AC}}>95 %</div>
          <Say size={52}>of generative AI pilots at companies are failing</Say>
        </Pop>
      ) : (
        <>
          {stock('Nasdaq', '-1,46 %', 40, DROP + BEAT * 0.6)}
          {stock('Palantir', '-9 %', 85, DROP + BEAT * 1.2)}
        </>
      )}
    </Scene>
  );
};

// L'échantillon : 52 points pour 52 organisations interrogées.
const Echantillon: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Scene
      caps={[[0, 'Le rapport du MIT repose sur 52 organisations interrogées, pas sur des milliers de projets.']]}
      bottom={
        <Pop at={BEAT * 6} style={{display: 'flex', justifyContent: 'center'}}>
          <Mono size={44} color={GREY}>52 entretiens et 153 réponses</Mono>
        </Pop>
      }
    >
      <div style={{display: 'flex', flexWrap: 'wrap', gap: 22, width: W, justifyContent: 'center'}}>
        {Array.from({length: 52}, (_, k) => (
          <div key={k} style={{width: 46, height: 46, borderRadius: 23, background: '#cfcfcf', opacity: frame >= BEAT * 1.2 + k * 1.6 ? 1 : 0}} />
        ))}
      </div>
    </Scene>
  );
};

const Grille: React.FC = () => {
  const build = interpolate(useCurrentFrame(), [BEAT * 1, BEAT * 8], [0, 1], clamp);
  const legend = (c: string, fill: boolean, t: string, at: number) => (
    <Pop at={at} style={{display: 'flex', alignItems: 'center', gap: 14}}>
      <div style={{width: 34, height: 34, borderRadius: 4, border: `4px solid ${c}`, background: fill ? c : 'transparent'}} />
      <Mono size={38} color={GREY}>{t}</Mono>
    </Pop>
  );
  return (
    <Scene
      caps={[[0, "Sur 100 organisations, 60 ont étudié un outil, 20 l'ont testé, 5 l'ont mis en place."]]}
      bottom={
        <div style={{display: 'flex', justifyContent: 'center', gap: 30}}>
          {legend('#777', false, '60 étudié', BEAT * 3)}
          {legend(AC, false, '20 testé', BEAT * 5.5)}
          {legend(AC, true, '5 en place', BEAT * 8)}
        </div>
      }
    >
      <Grid build={build} />
    </Scene>
  );
};

const SPLIT = 175;

const Denominateur: React.FC = () => {
  const frame = useCurrentFrame();
  const fade = useProg(BEAT * 1.4, BEAT * 3);
  const lit = useProg(SPLIT + BEAT * 0.6, SPLIT + BEAT * 2);
  return (
    <Scene
      caps={[
        [0, "Les 95 % comptent donc les 80 qui n'ont jamais lancé de pilote."],
        [SPLIT, 'Parmi les 20 qui ont essayé, 5 ont réussi, environ un sur quatre.'],
      ]}
      bottom={
        <Pop at={frame >= SPLIT ? SPLIT + BEAT * 2.4 : BEAT * 3.4} style={{display: 'flex', justifyContent: 'center'}}>
          <Mono size={60} color={frame >= SPLIT ? AC : GREY}>{frame >= SPLIT ? '5 / 20' : '80 sans pilote'}</Mono>
        </Pop>
      }
    >
      <Grid build={1} fadeNoPilot={fade} litPilot={lit} />
    </Scene>
  );
};

// Chute : la même case pleine, deux dénominateurs.
const Chute: React.FC = () => {
  const p1 = useProg(BEAT * 1, BEAT * 2.4);
  const p2 = useProg(BEAT * 3, BEAT * 4.4);
  const row = (den: number, label: string, p: number, at: number) => (
    <Pop at={at} style={{display: 'flex', flexDirection: 'column', gap: 14}}>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <Mono size={48} color="#fff">{`5 / ${den}`}</Mono>
        <Mono size={44} color={AC}>{p > 0.9 ? label : ''}</Mono>
      </div>
      <div style={{height: 70, width: W, border: '4px solid #444', position: 'relative'}}>
        <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: W * (5 / den) * p, background: AC}} />
      </div>
    </Pop>
  );
  return (
    <Scene caps={[[0, "Un pourcentage dit peu tant qu'on ne sait pas ce qu'il y a en dessous."]]} gap={70}>
      {row(100, '« 95 % échouent »', p1, BEAT * 0.8)}
      {row(20, '1 pilote sur 4', p2, BEAT * 2.8)}
    </Scene>
  );
};

const SCENES: Scenes = [
  [Titre, 380],
  [Echantillon, 240],
  [Grille, 240],
  [Denominateur, 360],
  [Chute, 200],
];

export const MYTHE95_DURATION = totalDuration(SCENES);

export const Mythe95: React.FC = () => <Short title={["95 % des projets d'IA", 'échouent,', 'vraiment ?']} scenes={SCENES} accent={AC} />;

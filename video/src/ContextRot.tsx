// Short Context rot : plus le contexte s'allonge, moins le modèle lit bien (catégorie Inférence, accent bleu).
// Faits : NoLiMa (Modarressi et al., Adobe Research et LMU Munich, arXiv 2502.05167, février 2025, ICML 2025) :
// 13 modèles annoncés à 128K tokens ou plus ; à 32K, 11 tombent sous 50 % de leur score à contexte court ;
// GPT-4o passe d'environ 99,3 % à 69,7 %.
// Scène propre à ce short : un token qui répartit son attention entre de plus en plus de voisins, et les liens qui pâlissent.
import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {BEAT, Bubble, Cross, DIM, GREY, Mono, Pop, RED, Say, Scene, Scenes, Short, W, clamp, totalDuration, useProg, withAlpha} from './kit';

const AC = '#8FB8FF';
const acA = (a: number) => withAlpha(AC, a);

// Lignes grises d'un long document, avec une seule ligne bleue (l'info cachée).
const Doc: React.FC<{p: number; needle: number; rows?: number}> = ({p, needle, rows = 14}) => (
  <div style={{display: 'flex', flexDirection: 'column', gap: 12, border: '4px solid #444', borderRadius: 18, padding: 28}}>
    {Array.from({length: rows}, (_, k) => {
      const w = [92, 84, 96, 70, 88, 94, 78, 90, 86, 74, 95, 82, 89, 76][k % 14];
      const on = interpolate(p, [k / rows, (k + 1) / rows], [0, 1], clamp);
      return <div key={k} style={{height: 16, borderRadius: 8, width: `${w * on}%`, background: k === needle ? AC : '#4a4a4a'}} />;
    })}
  </div>
);

// ---------- Scènes ----------

const Aiguille: React.FC = () => {
  const doc = useProg(BEAT * 1, BEAT * 4);
  return (
    <Scene
      caps={[[0, 'En 2025, une équipe cache une info dans un long texte et demande aux modèles de la retrouver.']]}
      gap={40}
      bottom={
        <Pop at={BEAT * 6} style={{display: 'flex', justifyContent: 'center'}}>
          <Mono size={44} color={DIM}>13 modèles testés</Mono>
        </Pop>
      }
    >
      <Doc p={doc} needle={9} />
      <Bubble side="right" at={BEAT * 4.6}><Say size={46}>Quel personnage est déjà allé à Dresde ?</Say></Bubble>
    </Scene>
  );
};

// GPT-4o à contexte court puis à 32 000 tokens ; ensuite, les 13 modèles dont 11 passent sous la moitié.
const SPLIT = 225;

const Chute32k: React.FC = () => {
  const frame = useCurrentFrame();
  const g1 = useProg(BEAT * 1.4, BEAT * 3);
  const g2 = useProg(BEAT * 4, BEAT * 6);
  const after = frame >= SPLIT;
  const TRACK = W - 320;
  const bar = (label: string, v: number, g: number, col: string, at: number) => (
    <Pop at={at} style={{display: 'flex', flexDirection: 'column', gap: 12}}>
      <Mono size={42} color={GREY}>{label}</Mono>
      <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
        <div style={{width: TRACK, height: 84, border: '4px solid #333', position: 'relative'}}>
          <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: TRACK * (v / 100) * g, background: col}} />
        </div>
        <Mono size={56} color={col}>{g > 0 ? `${Math.round(v * g)} %` : ''}</Mono>
      </div>
    </Pop>
  );
  return (
    <Scene
      caps={[
        [0, 'Même le meilleur, GPT-4o, passe de 99 % à 70 % de bonnes réponses.'],
        [SPLIT, 'Onze modèles sur treize tombent sous la moitié de leur score de départ.'],
      ]}
      gap={60}
      bottom={
        after ? (
          <Pop at={SPLIT + BEAT * 5} style={{display: 'flex', justifyContent: 'center'}}>
            <Mono size={44} color={DIM}>à 32 000 tokens</Mono>
          </Pop>
        ) : null
      }
    >
      {!after ? (
        <>
          {bar('texte court', 99.3, g1, AC, BEAT * 1)}
          {bar('32 000 tokens', 69.7, g2, acA(0.6), BEAT * 3.6)}
        </>
      ) : (
        <div style={{display: 'flex', flexWrap: 'wrap', gap: 26, width: W, justifyContent: 'center'}}>
          {Array.from({length: 13}, (_, k) => {
            const at = SPLIT + BEAT * 1 + k * 6;
            const drop = k < 11;
            const p = interpolate(frame, [at + 10, at + 18], [0, 1], clamp);
            return (
              <Pop key={k} at={at} style={{width: 150, height: 150, borderRadius: 75, border: `5px solid ${drop && p > 0 ? RED : AC}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                {drop ? <Cross p={p} size={80} /> : <Mono size={40} color={AC}>ok</Mono>}
              </Pop>
            );
          })}
        </div>
      )}
    </Scene>
  );
};

// Un token au centre relié à ses voisins : leur nombre grimpe, chaque lien pâlit (le budget d'attention se partage).
const STEPS = [6, 18, 48];

const Budget: React.FC = () => {
  const frame = useCurrentFrame();
  const step = Math.min(STEPS.length - 1, Math.max(0, Math.floor((frame - BEAT * 1.5) / (BEAT * 4))));
  const n = STEPS[step];
  const local = interpolate(frame - BEAT * 1.5 - step * BEAT * 4, [0, 12], [0, 1], clamp);
  const S = 600;
  const c = S / 2;
  const share = 1 / n;
  return (
    <Scene
      caps={[[0, "Chaque token partage une attention limitée entre tous les autres, donc plus il y en a, moins chacun compte."]]}
      bottom={
        <Pop at={BEAT * 1.5} style={{display: 'flex', justifyContent: 'center'}}>
          <Mono size={44} color={GREY}>{`${n} voisins, ${Math.round(share * 100)} % chacun`}</Mono>
        </Pop>
      }
    >
      <Pop at={BEAT * 1} style={{alignSelf: 'center'}}>
        <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`}>
          {Array.from({length: n}, (_, k) => {
            const a = (2 * Math.PI * k) / n - Math.PI / 2;
            const r = 250;
            const x = c + r * Math.cos(a) * local;
            const y = c + r * Math.sin(a) * local;
            return (
              <g key={`${n}-${k}`}>
                <line x1={c} y1={c} x2={x} y2={y} stroke={AC} strokeWidth={Math.max(1.5, 14 * share * 6)} opacity={Math.min(1, 0.25 + 4 * share)} />
                <circle cx={x} cy={y} r={n > 20 ? 9 : 16} fill="#666" />
              </g>
            );
          })}
          <circle cx={c} cy={c} r={34} fill={AC} />
        </svg>
      </Pop>
    </Scene>
  );
};

// La session qui grossit, puis /clear : on repart d'une session vide avec un résumé court.
const Clear: React.FC = () => {
  const frame = useCurrentFrame();
  const CLEAR = BEAT * 9;
  const fill = interpolate(frame, [BEAT * 1, CLEAR - 6], [0.06, 0.88], clamp);
  const cleared = frame >= CLEAR;
  const reset = interpolate(frame, [CLEAR, CLEAR + 8], [0, 1], clamp);
  const level = cleared ? 0.88 - 0.8 * reset : fill;
  const msgs = Math.floor(level * 16);
  return (
    <Scene
      caps={[[0, "Quand l'agent s'embrouille au bout de deux heures, une session neuve vaut mieux qu'une consigne de plus."]]}
      gap={36}
      bottom={
        <Pop at={CLEAR} style={{display: 'flex', justifyContent: 'center'}}>
          <Mono size={56} color={AC}>/clear</Mono>
        </Pop>
      }
    >
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 40, alignSelf: 'center'}}>
        <div style={{width: 200, height: 560, border: '4px solid #444', borderRadius: 14, position: 'relative', overflow: 'hidden'}}>
          <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: `${level * 100}%`, background: `linear-gradient(to top, ${acA(0.85)}, ${acA(0.25)})`}} />
        </div>
        <div style={{display: 'flex', flexDirection: 'column-reverse', gap: 10, width: 480, height: 560}}>
          {Array.from({length: msgs}, (_, k) => (
            <div key={k} style={{height: 24, borderRadius: 12, width: `${[90, 60, 80, 70][k % 4]}%`, alignSelf: k % 2 ? 'flex-end' : 'flex-start', background: k % 2 ? '#3a3a3a' : '#555'}} />
          ))}
        </div>
      </div>
      <div style={{alignSelf: 'center', opacity: cleared ? reset : 0}}>
        <Mono size={40} color={GREY}>session neuve, résumé court</Mono>
      </div>
    </Scene>
  );
};

// Chute : la capacité de la fenêtre contre ce qui est bien lu.
const Chute: React.FC = () => {
  const cap = useProg(BEAT * 1, BEAT * 2.4);
  const lu = useProg(BEAT * 2.6, BEAT * 4);
  return (
    <Scene caps={[[0, "La taille de la fenêtre dit ce qu'il peut lire, pas ce qu'il lit bien."]]} gap={70}>
      <Pop at={BEAT * 0.8} style={{display: 'flex', flexDirection: 'column', gap: 14}}>
        <Mono size={44} color={GREY}>ce qu'il peut lire</Mono>
        <div style={{height: 110, width: W * cap, border: `5px solid ${AC}`, borderRadius: 8}} />
      </Pop>
      <Pop at={BEAT * 2.4} style={{display: 'flex', flexDirection: 'column', gap: 14}}>
        <Mono size={44} color={GREY}>ce qu'il lit bien</Mono>
        <div style={{height: 110, width: W * lu, borderRadius: 8, background: `linear-gradient(to right, ${AC} 0%, ${acA(0.5)} 30%, ${acA(0.08)} 75%, transparent 100%)`}} />
      </Pop>
    </Scene>
  );
};

const SCENES: Scenes = [
  [Aiguille, 245],
  [Chute32k, 420],
  [Budget, 290],
  [Clear, 270],
  [Chute, 190],
];

export const CONTEXTROT_DURATION = totalDuration(SCENES);

export const ContextRot: React.FC = () => <Short title={["Qu'est-ce que le", 'context rot ?']} scenes={SCENES} accent={AC} />;

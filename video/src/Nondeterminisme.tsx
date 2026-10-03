// Short Non-déterminisme : la même question, mille fois, à température zéro (catégorie Comportements, accent orange).
// Faits : Thinking Machines Lab, « Defeating Nondeterminism in LLM Inference », Horace He, 10 septembre 2025
// (Qwen3-235B-A22B-Instruct-2507, 1 000 réponses de 1 000 tokens, 80 réponses distinctes, divergence au 103e token,
// 992 « Queens, New York » contre 8 « New York City » ; noyaux invariants au lot : 1 000 réponses identiques, 42 s contre 26 s).
// Scène propre à ce short : la réponse qui bifurque au 103e token, puis le plateau de lots dont la taille change.
import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {BEAT, Bubble, Check, Cross, DIM, GREY, Mono, Pop, Say, Scene, Scenes, Short, W, clamp, totalDuration, useProg, withAlpha} from './kit';

const AC = '#FFB86B';
const acA = (a: number) => withAlpha(AC, a);
const nfr = (n: number) => n.toLocaleString('fr-FR').replace(/ | /g, ' ');

// ---------- Scènes ----------

// Mille fois la même question : le compteur grimpe, la température reste à zéro.
const Question: React.FC = () => {
  const frame = useCurrentFrame();
  const c = interpolate(frame, [BEAT * 3, BEAT * 9], [1, 1000], {...clamp, easing: (t) => t * t});
  return (
    <Scene
      caps={[[0, 'En 2025, un labo pose mille fois la même question à un modèle, température à zéro.']]}
      gap={60}
      bottom={
        <Pop at={BEAT * 2} style={{display: 'flex', justifyContent: 'center'}}>
          <Mono size={44} color={DIM}>température = 0</Mono>
        </Pop>
      }
    >
      <Bubble side="right" at={BEAT * 1}><Mono size={44} color="#fff">Tell me about Richard Feynman</Mono></Bubble>
      <Pop at={BEAT * 2.6} style={{alignSelf: 'center'}}>
        <Mono size={150} color={AC}>{`× ${nfr(Math.round(c))}`}</Mono>
      </Pop>
    </Scene>
  );
};

// La réponse s'écrit, identique jusqu'au 103e token, puis se sépare en deux branches ; ensuite, les 80 versions.
const PREFIX = 'Feynman was born on May 11, 1918, in';
const SPLIT = 215;

const Bifurque: React.FC = () => {
  const frame = useCurrentFrame();
  const typed = PREFIX.slice(0, Math.max(0, Math.floor((frame - BEAT * 1) / 1.2)));
  const fork = useProg(BEAT * 5, BEAT * 6.2);
  const bars = useProg(BEAT * 7, BEAT * 9);
  const after = frame >= SPLIT;
  const branch = (label: string, n: number, y: number) => (
    <div style={{position: 'absolute', left: 260, top: y - 50, width: W - 260, opacity: fork}}>
      <Mono size={44} color="#fff">{label}</Mono>
      <div style={{display: 'flex', alignItems: 'center', gap: 16, marginTop: 10}}>
        <div style={{height: 34, width: Math.max(6, 440 * (n / 1000) * bars), background: n > 500 ? AC : acA(0.6), borderRadius: 4}} />
        <Mono size={40} color={GREY}>{bars > 0 ? `${Math.round(n * bars)} fois` : ''}</Mono>
      </div>
    </div>
  );
  // 80 versions : 80 cases, la première (78 fois) plus large.
  const cells = Array.from({length: 80}, (_, k) => k);
  return (
    <Scene
      caps={[
        [0, 'Les 102 premiers tokens sont identiques, puis la réponse bifurque au 103e.'],
        [SPLIT, "Au total, mille réponses en donnent 80 différentes, alors qu'aucun dé n'était lancé."],
      ]}
      bottom={
        after ? (
          <Pop at={SPLIT + BEAT * 0.6} style={{display: 'flex', justifyContent: 'center'}}>
            <Mono size={44} color={DIM}>80 réponses différentes</Mono>
          </Pop>
        ) : (
          <Pop at={BEAT * 4} style={{display: 'flex', justifyContent: 'center'}}>
            <Mono size={44} color={DIM}>token 103</Mono>
          </Pop>
        )
      }
    >
      {!after ? (
        <div style={{position: 'relative', height: 520}}>
          <div style={{width: W}}><Mono size={44} color={GREY}><span style={{whiteSpace: 'normal'}}>{typed}</span></Mono></div>
          <svg width={W} height={400} style={{position: 'absolute', left: 0, top: 120}}>
            <path d={`M120 0 V${60 * fork} `} stroke={AC} strokeWidth={6} fill="none" />
            <path d={`M120 60 C 160 60, 200 ${60 + 70 * fork}, 240 ${60 + 70 * fork}`} stroke={AC} strokeWidth={6} fill="none" opacity={fork} />
            <path d={`M120 60 C 160 60, 200 ${60 + 230 * fork}, 240 ${60 + 230 * fork}`} stroke={acA(0.6)} strokeWidth={6} fill="none" opacity={fork} />
          </svg>
          {branch('Queens, New York', 992, 120 + 130)}
          {branch('New York City', 8, 120 + 290)}
        </div>
      ) : (
        <div style={{display: 'flex', flexWrap: "wrap", gap: 12, width: W, justifyContent: 'center'}}>
          {cells.map((k) => (
            <div key={k} style={{width: 60, height: 60, borderRadius: 6, border: `4px solid ${k === 0 ? AC : '#555'}`, background: k === 0 ? acA(0.35) : 'transparent', opacity: frame >= SPLIT + 6 + k * 1.2 ? 1 : 0}} />
          ))}
        </div>
      )}
    </Scene>
  );
};

// Le plateau de lots : ta requête (orange) partage le calcul avec celles des autres, et la taille du lot change.
const SIZES = [3, 8, 5, 9];

const Lots: React.FC = () => {
  const frame = useCurrentFrame();
  const step = Math.min(SIZES.length - 1, Math.max(0, Math.floor((frame - BEAT * 1.4) / (BEAT * 2.4))));
  const n = SIZES[step];
  const SLOT = 76;
  return (
    <Scene
      caps={[[0, "Ta requête est calculée en lot avec d'autres, et la taille du lot change l'ordre des calculs."]]}
      gap={70}
      bottom={
        <Pop at={BEAT * 9.5} style={{display: 'flex', justifyContent: 'center'}}>
          <Mono size={48} color={AC}>(a + b) + c ≠ a + (b + c)</Mono>
        </Pop>
      }
    >
      <Pop at={BEAT * 1.2} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 26}}>
        <div style={{display: 'flex', gap: 12, padding: 20, border: '4px solid #444', borderRadius: 18, minHeight: SLOT + 40}}>
          {Array.from({length: n}, (_, k) => (
            <div key={`${step}-${k}`} style={{width: SLOT, height: SLOT, borderRadius: 10, background: k === 1 ? AC : '#3a3a3a'}} />
          ))}
        </div>
        <Mono size={44} color={GREY}>{`lot de ${n} requêtes`}</Mono>
      </Pop>
      <Pop at={BEAT * 7.5} style={{alignSelf: 'center'}}>
        <Say size={50} color={GREY}>en virgule flottante, l'ordre des additions compte</Say>
      </Pop>
    </Scene>
  );
};

// La réparation : des calculs qui ignorent la taille du lot ; 80 versions tombent à 1, au prix de la vitesse.
const Repare: React.FC = () => {
  const shrink = useProg(BEAT * 3, BEAT * 5);
  const v = Math.round(80 - 79 * shrink);
  const speed = useProg(BEAT * 8, BEAT * 9.5);
  const bar = (label: string, s: number, col: string, at: number) => (
    <Pop at={at} style={{display: 'flex', alignItems: 'center', gap: 20}}>
      <div style={{width: 300}}><Mono size={40} color={GREY}>{label}</Mono></div>
      <div style={{height: 54, width: (W - 460) * (s / 42) * speed, background: col, borderRadius: 4}} />
      <Mono size={40} color={GREY}>{speed > 0.9 ? `${s} s` : ''}</Mono>
    </Pop>
  );
  return (
    <Scene
      caps={[[0, 'Avec des calculs indifférents à la taille du lot, les mille réponses redeviennent identiques.']]}
      gap={56}
      bottom={
        <Pop at={BEAT * 10} style={{display: 'flex', justifyContent: 'center'}}>
          <Mono size={44} color={DIM}>1,6 fois plus lent</Mono>
        </Pop>
      }
    >
      <Pop at={BEAT * 1.6} style={{display: 'flex', alignItems: 'baseline', gap: 24, alignSelf: 'center'}}>
        <Mono size={170} color={AC}>{String(v)}</Mono>
        <Mono size={44} color={GREY}>{v > 1 ? 'versions' : 'version'}</Mono>
      </Pop>
      {bar('calcul normal', 26, '#555', BEAT * 7.6)}
      {bar('invariant', 42, AC, BEAT * 7.9)}
    </Scene>
  );
};

// Chute : dix lancements du même test, deux échecs (exemple illustratif).
const RUNS = [true, true, false, true, true, true, true, false, true, true];

const Chute: React.FC = () => {
  const frame = useCurrentFrame();
  const at = (k: number) => BEAT * 1.4 + k * 7;
  return (
    <Scene caps={[[0, 'Une seule réponse ne prouve rien, alors lance ton test dix fois.']]}>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 22, width: W}}>
        {RUNS.map((ok, k) => {
          const p = interpolate(frame, [at(k), at(k) + 8], [0, 1], clamp);
          return (
            <Pop key={k} at={at(k)} style={{height: 160, border: `4px solid ${ok ? '#555' : '#FF4D4D'}`, borderRadius: 18, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4}}>
              {ok ? <Check p={p} size={84} color={AC} /> : <Cross p={p} size={84} />}
              <Mono size={36} color={DIM}>{`#${k + 1}`}</Mono>
            </Pop>
          );
        })}
      </div>
    </Scene>
  );
};

const SCENES: Scenes = [
  [Question, 225],
  [Bifurque, 440],
  [Lots, 250],
  [Repare, 250],
  [Chute, 200],
];

export const NONDETERMINISME_DURATION = totalDuration(SCENES);

export const Nondeterminisme: React.FC = () => <Short title={["Qu'est-ce que le", 'non-', 'déterminisme ?']} scenes={SCENES} accent={AC} />;

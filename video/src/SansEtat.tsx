// Short Sans état : le modèle ne garde rien d'une requête à l'autre, le harness lui renvoie tout (catégorie Agents, accent violet).
// Faits : documentation de l'API Messages de Claude (« stateless », l'historique complet est envoyé à chaque requête) ;
// la démo Josette est l'Imagine de la fiche (réponses du modèle : exemple illustratif).
// Scène propre à ce short : le triangle des requêtes, chaque barre reprend toutes les précédentes.
import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {BEAT, Bubble, DIM, GREY, Mono, Pop, Say, Scene, Scenes, Short, W, clamp, totalDuration, useProg, withAlpha} from './kit';

const AC = '#D7A6FF';
const acA = (a: number) => withAlpha(AC, a);

// Une requête : un cadre qui contient ce qui part chez le modèle.
const Req: React.FC<{n: number; at: number; children: React.ReactNode}> = ({n, at, children}) => (
  <Pop at={at} style={{border: '4px solid #444', borderRadius: 26, padding: '18px 24px 22px', display: 'flex', flexDirection: 'column', gap: 14}}>
    <Mono size={36} color={DIM}>{`requête ${n}`}</Mono>
    {children}
  </Pop>
);

// ---------- Scènes ----------

const SPLIT = 220;

const Josette: React.FC = () => {
  const frame = useCurrentFrame();
  const after = frame >= SPLIT;
  return (
    <Scene
      caps={[
        [0, 'Envoie « Je m\'appelle Josette », puis demande ton prénom dans une nouvelle requête.'],
        [SPLIT, "Le modèle ne garde rien d'une requête à l'autre, chacune repart de zéro."],
      ]}
      gap={34}
      bottom={
        after ? (
          <Pop at={SPLIT + BEAT * 1.5} style={{display: 'flex', justifyContent: 'center'}}>
            <Mono size={44} color={DIM}>aucune mémoire entre les deux</Mono>
          </Pop>
        ) : null
      }
    >
      <Req n={1} at={BEAT * 1}>
        <Bubble side="right" at={BEAT * 1.4}><Say size={44}>Je m'appelle Josette.</Say></Bubble>
        <Bubble side="left" at={BEAT * 3}><Say size={44}>Enchanté, Josette !</Say></Bubble>
      </Req>
      <Req n={2} at={BEAT * 6}>
        <Bubble side="right" at={BEAT * 6.4}><Say size={44}>Comment je m'appelle ?</Say></Bubble>
        <Bubble side="left" at={BEAT * 8.4}><Say size={44}>Je ne connais pas ton prénom.</Say></Bubble>
      </Req>
    </Scene>
  );
};

// Les segments d'une requête : consignes, puis l'historique (pâle), puis le seul message neuf (plein).
const SEG = 64;
const Stack: React.FC<{k: number; at: number; label?: boolean}> = ({k, at, label = true}) => (
  <Pop at={at} style={{display: 'flex', alignItems: 'center', gap: 18}}>
    {label ? <div style={{width: 200}}><Mono size={36} color={DIM}>{`requête ${k}`}</Mono></div> : null}
    <div style={{display: 'flex', gap: 6}}>
      <div style={{width: SEG * 1.4, height: 70, background: '#666', borderRadius: 6}} />
      {Array.from({length: 2 * k - 1}, (_, j) => (
        <div key={j} style={{width: SEG, height: 70, borderRadius: 6, background: j === 2 * k - 2 ? AC : acA(0.28)}} />
      ))}
    </div>
  </Pop>
);

const Renvoi: React.FC = () => (
  <Scene
    caps={[[0, "Pour tenir la conversation, le harness lui renvoie tout l'historique à chaque tour."]]}
    gap={30}
    bottom={
      <Pop at={BEAT * 8} style={{display: 'flex', gap: 34, justifyContent: 'center'}}>
        <Mono size={40} color="#999">consignes</Mono>
        <Mono size={40} color={acA(0.6)}>déjà envoyé</Mono>
        <Mono size={40} color={AC}>nouveau</Mono>
      </Pop>
    }
  >
    {[1, 2, 3, 4].map((k) => <Stack key={k} k={k} at={BEAT * (1.4 + (k - 1) * 1.6)} />)}
  </Scene>
);

// Le triangle : des dizaines de requêtes dans un seul tour d'agent, chaque barre plus longue que la précédente.
const N = 30;

const Triangle: React.FC = () => {
  const frame = useCurrentFrame();
  const shown = Math.floor(interpolate(frame, [BEAT * 1.2, BEAT * 8], [0, N], clamp));
  return (
    <Scene
      caps={[[0, "Un seul tour d'agent enchaîne des dizaines de requêtes, et chacune renvoie tout."]]}
      bottom={
        <Pop at={BEAT * 9} style={{display: 'flex', justifyContent: 'center'}}>
          <Mono size={44} color={GREY}>une requête par appel d'outil</Mono>
        </Pop>
      }
    >
      <div style={{display: 'flex', flexDirection: 'column', gap: 5}}>
        {Array.from({length: N}, (_, k) => (
          <div key={k} style={{height: 14, borderRadius: 3, width: 90 + (W - 90) * ((k + 1) / N), opacity: k < shown ? 1 : 0, background: `linear-gradient(to right, #666 0, #666 90px, ${acA(0.3)} 90px, ${acA(0.3)} calc(100% - 22px), ${AC} calc(100% - 22px))`}} />
        ))}
      </div>
    </Scene>
  );
};

// /clear : l'historique s'efface, il ne reste que les consignes.
const Clear: React.FC = () => {
  const frame = useCurrentFrame();
  const CLEAR = BEAT * 5;
  const wipe = interpolate(frame, [CLEAR, CLEAR + 10], [1, 0], clamp);
  const LEN = 11;
  return (
    <Scene
      caps={[[0, "Après /clear, il ne reste que les consignes, et le reste est oublié pour de bon."]]}
      gap={40}
      bottom={
        <Pop at={CLEAR - 4} style={{display: 'flex', justifyContent: 'center'}}>
          <Mono size={56} color={AC}>/clear</Mono>
        </Pop>
      }
    >
      <Pop at={BEAT * 1} style={{display: 'flex', gap: 6, alignSelf: 'flex-start'}}>
        <div style={{width: SEG * 1.4, height: 90, background: '#666', borderRadius: 6}} />
        {Array.from({length: LEN}, (_, j) => (
          <div key={j} style={{width: SEG, height: 90, borderRadius: 6, background: j === LEN - 1 ? AC : acA(0.28), opacity: wipe, transform: `translateY(${(1 - wipe) * 60}px)`}} />
        ))}
      </Pop>
    </Scene>
  );
};

// Chute : ce qui doit durer s'écrit dans un fichier, qui rejoint les consignes de la session suivante.
const Fichier: React.FC = () => {
  const frame = useCurrentFrame();
  const write = useProg(BEAT * 1.4, BEAT * 3.4);
  const join = interpolate(frame, [BEAT * 4.2, BEAT * 5.4], [0, 1], clamp);
  const lines = [80, 64, 90, 52];
  return (
    <Scene caps={[[0, "Ce qui doit durer d'une session à l'autre s'écrit dans un fichier."]]} gap={50}>
      <Pop at={BEAT * 0.8} style={{alignSelf: 'center', width: 520, border: `4px solid ${AC}`, borderRadius: 18, padding: 28, display: 'flex', flexDirection: 'column', gap: 16, transform: `translateY(${join * 40}px)`}}>
        <Mono size={44} color={AC}>AGENTS.md</Mono>
        {lines.map((w, k) => (
          <div key={k} style={{height: 18, borderRadius: 9, background: '#5a5a5a', width: `${w * interpolate(write, [k / 4, (k + 1) / 4], [0, 1], clamp)}%`}} />
        ))}
      </Pop>
      <Pop at={BEAT * 4} style={{display: 'flex', alignItems: 'center', gap: 6, alignSelf: 'center'}}>
        <div style={{width: SEG * 1.4, height: 90, background: '#666', borderRadius: 6}} />
        <div style={{width: SEG * 2.2 * join, height: 90, background: acA(0.85), borderRadius: 6}} />
        <div style={{marginLeft: 20}}><Mono size={40} color={GREY}>{join > 0.9 ? 'session suivante' : ''}</Mono></div>
      </Pop>
    </Scene>
  );
};

const SCENES: Scenes = [
  [Josette, 425],
  [Renvoi, 235],
  [Triangle, 225],
  [Clear, 215],
  [Fichier, 195],
];

export const SANSETAT_DURATION = totalDuration(SCENES);

export const SansEtat: React.FC = () => <Short title={["Qu'est-ce qu'un modèle", 'sans état ?']} scenes={SCENES} accent={AC} />;

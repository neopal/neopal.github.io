// Short Mythe « Il suffit d'ajouter de l'IA à nos processus » (catégorie Mythes, accent rouge corail).
// Faits : Michael Hammer, « Reengineering Work: Don't Automate, Obliterate », Harvard Business Review, juillet-août 1990
// (un assureur : 22 jours de traitement pour 17 minutes de travail ; « stop paving the cow paths » ; Mutual Benefit Life :
// jusqu'à 30 étapes, 5 services, 19 personnes, 5 à 25 jours, puis un gestionnaire unique et 2 à 5 jours).
// Scène propre à ce short : le chemin de vaches qu'on goudronne, puis le tracé droit.
import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {BEAT, DIM, Draw, GREY, Mono, Pop, Scene, Scenes, Short, W, clamp, totalDuration, useProg, withAlpha} from './kit';

const AC = '#FF7A7A';
const acA = (a: number) => withAlpha(AC, a);

// 22 jours sur toute la largeur ; 17 minutes de travail = une fente (agrandie pour être visible).
const DayBar: React.FC<{fill: number; sliver: number; sliverW?: number}> = ({fill, sliver, sliverW = 14}) => (
  <div style={{position: 'relative', width: W, height: 120, border: '4px solid #444'}}>
    <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: `${fill * 100}%`, background: '#333'}} />
    {Array.from({length: 21}, (_, k) => (
      <div key={k} style={{position: 'absolute', top: 0, bottom: 0, left: `${((k + 1) / 22) * 100}%`, width: 2, background: '#1c1c1c', opacity: fill > (k + 1) / 22 ? 1 : 0}} />
    ))}
    <div style={{position: 'absolute', top: -14, bottom: -14, left: '41%', width: sliverW, background: AC, opacity: sliver, boxShadow: `0 0 24px ${acA(0.8)}`}} />
  </div>
);

// ---------- Scènes ----------

const SPLIT = 175;

const Attente: React.FC = () => {
  const frame = useCurrentFrame();
  const fill = useProg(BEAT * 1, BEAT * 7);
  const sliver = interpolate(frame, [SPLIT + 8, SPLIT + 20], [0, 1], clamp);
  return (
    <Scene
      caps={[
        [0, 'Chez un assureur, une demande restait 22 jours en traitement.'],
        [SPLIT, "Elle n'avait été travaillée que 17 minutes."],
      ]}
      gap={40}
      bottom={
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <Mono size={44} color={GREY}>{fill > 0.98 ? '22 jours' : `${Math.max(1, Math.round(fill * 22))} jours`}</Mono>
          <Mono size={44} color={AC}>{sliver > 0.5 ? '17 minutes de travail' : ''}</Mono>
        </div>
      }
    >
      <DayBar fill={fill} sliver={sliver} />
      <Pop at={BEAT * 7.4} style={{alignSelf: 'center'}}>
        <Mono size={40} color={DIM}>le reste, des dossiers qui attendent</Mono>
      </Pop>
    </Scene>
  );
};

const IAx2: React.FC = () => {
  const shrink = useProg(BEAT * 4, BEAT * 5.5);
  return (
    <Scene
      caps={[[0, 'Si une IA fait ces 17 minutes deux fois plus vite, le délai ne bouge presque pas.']]}
      gap={40}
      bottom={
        <Pop at={BEAT * 7} style={{display: 'flex', justifyContent: 'center'}}>
          <Mono size={48} color={GREY}>toujours presque 22 jours</Mono>
        </Pop>
      }
    >
      <Pop at={BEAT * 2.4} style={{alignSelf: 'center', border: `4px solid ${AC}`, borderRadius: 40, padding: '10px 34px'}}>
        <Mono size={52} color={AC}>IA × 2</Mono>
      </Pop>
      <DayBar fill={1} sliver={1} sliverW={14 - 7 * shrink} />
    </Scene>
  );
};

// Le chemin de vaches : un sentier sinueux qu'on goudronne tel quel.
const PATH = 'M60 520 C 200 500, 120 380, 300 360 S 520 420, 560 280 S 420 120, 640 90 S 820 160, 830 40';

const Vaches: React.FC = () => {
  const trail = useProg(BEAT * 1, BEAT * 3.4);
  const tar = useProg(BEAT * 5, BEAT * 8.5);
  return (
    <Scene
      caps={[[0, 'En 1990, Michael Hammer appelle ça goudronner les chemins de vaches.']]}
      bottom={
        <Pop at={BEAT * 9} style={{display: 'flex', justifyContent: 'center'}}>
          <Mono size={42} color={DIM}>« stop paving the cow paths »</Mono>
        </Pop>
      }
    >
      <svg width={W} height={560} viewBox="0 0 888 560">
        <Draw d={PATH} p={trail} color="#6b5a3a" width={46} len={1500} />
        <Draw d={PATH} p={tar} color="#3a3a3a" width={40} len={1500} />
        <Draw d={PATH} p={tar} color="#d8d8d8" width={4} len={1500} />
      </svg>
    </Scene>
  );
};

// Mutual Benefit Life : cinq services et leurs passages de main, puis un seul gestionnaire.
const Gestionnaire: React.FC = () => {
  const frame = useCurrentFrame();
  const merge = useProg(BEAT * 6, BEAT * 7.6);
  const bar = useProg(BEAT * 8.4, BEAT * 10);
  const BOX = 150;
  const xs = [0, 1, 2, 3, 4].map((k) => k * ((W - BOX) / 4));
  return (
    <Scene
      caps={[[0, 'Mutual Benefit Life confie chaque demande à un seul gestionnaire, du dépôt au contrat.']]}
      gap={40}
      bottom={
        <div style={{display: 'flex', flexDirection: 'column', gap: 14, opacity: frame >= BEAT * 8.4 ? 1 : 0}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
            <div style={{width: 230}}><Mono size={40} color={GREY}>avant</Mono></div>
            <div style={{height: 40, width: (W - 470) * bar, background: '#555'}} />
            <Mono size={40} color={GREY}>5 à 25 j</Mono>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
            <div style={{width: 230}}><Mono size={40} color={AC}>après</Mono></div>
            <div style={{height: 40, width: (W - 470) * 0.2 * bar, background: AC}} />
            <Mono size={40} color={AC}>2 à 5 j</Mono>
          </div>
        </div>
      }
    >
      <div style={{position: 'relative', height: 300, width: W}}>
        {xs.map((x, k) => {
          const cx = x + (((W - BOX) / 2) - x) * merge;
          return (
            <Pop key={k} at={BEAT * (1.2 + k * 0.5)} style={{position: 'absolute', left: cx, top: 60, width: BOX, height: BOX, border: `4px solid ${merge > 0.95 ? AC : '#666'}`, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: k === 2 || merge < 0.95 ? 1 : 0}}>
              <Mono size={merge > 0.95 ? 72 : 38} color={merge > 0.95 ? AC : GREY}>{merge > 0.95 ? '1' : `S${k + 1}`}</Mono>
            </Pop>
          );
        })}
        <svg width={W} height={300} style={{position: 'absolute', left: 0, top: 0, opacity: 1 - merge}}>
          {xs.slice(0, 4).map((x, k) => (
            <path key={k} d={`M${x + BOX} 135 L${xs[k + 1]} 135`} stroke="#888" strokeWidth={5} strokeDasharray="10 8" opacity={frame >= BEAT * (3.6 + k * 0.4) ? 1 : 0} />
          ))}
        </svg>
        <div style={{position: 'absolute', left: 0, right: 0, top: 250, textAlign: 'center', opacity: frame >= BEAT * 4 ? 1 : 0}}>
          <Mono size={40} color={DIM}>{merge > 0.95 ? 'un seul gestionnaire' : '30 étapes, 19 personnes'}</Mono>
        </div>
      </div>
    </Scene>
  );
};

// Chute : le chemin redessiné en ligne droite, et l'IA posée dessus.
const Chute: React.FC = () => {
  const frame = useCurrentFrame();
  const straight = useProg(BEAT * 1, BEAT * 3);
  return (
    <Scene caps={[[0, "Redessine le circuit d'abord, puis donne à l'IA ce qui reste à faire."]]}>
      <svg width={W} height={560} viewBox="0 0 888 560">
        <path d={PATH} fill="none" stroke="#3a3a3a" strokeWidth={40} strokeLinecap="round" opacity={0.35} />
        <Draw d="M60 520 L830 40" p={straight} color={AC} width={40} len={920} />
      </svg>
      <div style={{position: 'absolute', left: 380, top: 230, opacity: frame >= BEAT * 3.4 ? 1 : 0, border: '4px solid #fff', borderRadius: 40, padding: '8px 28px', background: '#000'}}>
        <Mono size={48} color="#fff">IA</Mono>
      </div>
    </Scene>
  );
};

const SCENES: Scenes = [
  [Attente, 320],
  [IAx2, 230],
  [Vaches, 210],
  [Gestionnaire, 330],
  [Chute, 210],
];

export const HAMMER_DURATION = totalDuration(SCENES);

export const Hammer: React.FC = () => <Short title={["Il suffit d'ajouter", "de l'IA ?"]} scenes={SCENES} accent={AC} />;

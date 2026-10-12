// Short Agent (YouTube / TikTok / Instagram), épisode 10, voix off PAL - FR, préparé le 2026-10-12.
// Fiche agent de lexique/terms.js ; sources dans voix/agent.script.json : la boucle objectif, action, résultat ;
// workflow contre agent (Anthropic, 19 décembre 2024) ; l'image du dîner de Nadine ; Claude Opus 5.5 (22 septembre 2026,
// une tâche lancée la nuit, plus de 18 heures) ; Claude Cowork (février 2026, près de quinze ans de photos effacées,
// restaurées depuis iCloud). Répond aux épisodes d'avant : après le modèle qui écrit, le modèle qui agit.
// L'écran suit la voix et Le mouvement (univers.md) : chaque élément entre sur le mot qui le nomme, easing et arcs.
import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Big, Check, Draw, Lock, Mono, Pop, Say, Scene, W, arc, clamp, ease, useAccent, withAlpha} from './kit';
import {LABEL, blink, makeVoix} from './voix/VoixShort';
import {FILS, Pixel} from './voix/Pixel';
import {Cross, Model, pixelShadow} from './voix/Parts';
import ALIGN from './voix/agent.align.json';
import SCRIPT from './voix/agent.script.json';

const AC = '#D7A6FF'; // catégorie Agents et outils
const V = makeVoix(ALIGN, SCRIPT, 'voix/prediction-music.mp3');
const {at} = V;
export const AGENTVOIX_DURATION = V.duration;

const gone = (frame: number, until: number) => ease(frame, until, until + 6, [1, 0], 'inOut');

// Un outil, en icône SVG maison : loupe, agenda, terminal.
const Tool: React.FC<{kind: 'loupe' | 'agenda' | 'terminal'; size: number}> = ({kind, size}) => {
  const accent = useAccent();
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      {kind === 'loupe' ? (
        <>
          <circle cx="42" cy="42" r="24" fill="none" stroke={accent} strokeWidth="8" />
          <path d="M60 60 L86 86" stroke={accent} strokeWidth="11" strokeLinecap="round" />
        </>
      ) : kind === 'agenda' ? (
        <>
          <rect x="14" y="20" width="72" height="66" fill="none" stroke={accent} strokeWidth="8" />
          <path d="M14 40 H86 M32 12 V28 M68 12 V28" stroke={accent} strokeWidth="8" />
          <rect x="30" y="52" width="14" height="12" fill={accent} />
        </>
      ) : (
        <>
          <rect x="10" y="18" width="80" height="64" fill="none" stroke={accent} strokeWidth="8" />
          <path d="M24 40 L38 50 L24 60 M44 62 H64" stroke={accent} strokeWidth="7" fill="none" />
        </>
      )}
    </svg>
  );
};

// ---------- 0. Hook ----------

const Hook: React.FC = () => <V.TitleHook lead="C'est quoi ?" lines={['un agent']} cue="agent" />;

// ---------- 1. Intro : le modèle qui écrit, puis le modèle qu'on laisse agir ----------

const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const ecrit = at('intro', 'écrit');
  const agir = at('intro', 'agir');
  const pen = ease(frame, ecrit, ecrit + 24);
  return (
    <Scene gap={30}>
      <div style={{display: 'flex', alignItems: 'center', gap: 40}}>
        <Pop at={2}><Model w={300} /></Pop>
        {/* Ce qu'on a vu jusqu'ici : il écrit (un trait qui se dessine). */}
        <div style={{display: 'flex', flexDirection: 'column', gap: 14, opacity: frame >= ecrit ? (frame >= agir ? 0.35 : 1) : 0}}>
          <svg width={400} height={120} viewBox="0 0 400 120">
            <Draw d="M10 70 C 50 20, 80 110, 120 60 S 190 20, 220 70 S 300 110, 390 50" p={pen} width={10} len={560} color="#fff" />
          </svg>
          <Mono size={52} color={LABEL}>il écrit</Mono>
        </div>
      </div>
      {/* Ce qu'on lui confie maintenant : des outils, et la main pour s'en servir. */}
      <div style={{display: 'flex', alignItems: 'center', gap: 30, opacity: frame >= agir ? 1 : 0}}>
        {(['loupe', 'agenda', 'terminal'] as const).map((k, i) => (
          <Pop key={k} at={agir + i * 4} style={{border: `5px solid ${accent}`, padding: 12, lineHeight: 0}}><Tool kind={k} size={110} /></Pop>
        ))}
        <Pop at={agir + 14}><Mono size={64} color={accent}>il agit</Mono></Pop>
      </div>
    </Scene>
  );
};

// ---------- 2. La boucle : objectif, action, résultat, action suivante ----------

const NODES = [
  {cue: 'action', label: 'action', x: 444, y: 70},
  {cue: 'résultat', label: 'résultat', x: 740, y: 300},
  {cue: 'suivante', label: 'suivante', x: 148, y: 300},
];

const Boucle: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const objectif = at('boucle', 'objectif');
  const outils = at('boucle', 'outils');
  const finie = at('boucle', 'finie');
  const cues = NODES.map((n) => at('boucle', n.cue));
  // Un jeton fait le tour de la boucle, de plus en plus vite, puis s'arrête sur « finie ».
  const lap = frame >= cues[2] && frame < finie ? ((frame - cues[2]) / 30) % 1 : 0;
  const [tx, ty] = lap < 0.34 ? arc(lap / 0.34, [444, 120], [740, 340], -60) : lap < 0.67 ? arc((lap - 0.34) / 0.33, [740, 340], [148, 340], -40) : arc((lap - 0.67) / 0.33, [148, 340], [444, 120], -60);
  return (
    <Scene
      gap={20}
      bottom={
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <Pop at={objectif} style={{border: '5px solid #fff', padding: '8px 18px'}}><Mono size={52} color="#fff">objectif</Mono></Pop>
          <Pop at={outils} style={{display: 'flex', gap: 10}}>
            {(['loupe', 'agenda', 'terminal'] as const).map((k) => <Tool key={k} kind={k} size={70} />)}
          </Pop>
        </div>
      }
    >
      <div style={{position: 'relative', height: 480}}>
        <svg width={W} height={480} viewBox={`0 0 ${W} 480`} style={{position: 'absolute', inset: 0}}>
          <Draw d="M520 110 Q 720 140 740 290" p={ease(frame, cues[1], cues[1] + 12)} width={6} len={300} color={withAlpha(accent, 0.6)} />
          <Draw d="M680 360 Q 444 440 210 360" p={ease(frame, cues[2], cues[2] + 12)} width={6} len={600} color={withAlpha(accent, 0.6)} />
          <Draw d="M150 290 Q 170 140 370 110" p={ease(frame, cues[2] + 8, cues[2] + 20)} width={6} len={320} color={withAlpha(accent, 0.6)} />
        </svg>
        {NODES.map((n, k) => (
          <Pop key={n.cue} at={cues[k]} style={{position: 'absolute', left: n.x - 120, top: n.y, width: 240, display: 'flex', justifyContent: 'center', border: `5px solid ${accent}`, background: '#1c1c1c', padding: '10px 0'}}>
            <Mono size={52} color="#fff">{n.label}</Mono>
          </Pop>
        ))}
        {lap > 0 ? <div style={{position: 'absolute', left: tx - 16, top: ty - 16, width: 32, height: 32, borderRadius: 16, background: accent}} /> : null}
        <Pop at={finie} style={{position: 'absolute', left: 444 - 150, top: 200, display: 'flex', alignItems: 'center', gap: 6}}>
          <Check p={ease(frame, finie, finie + 10)} size={70} color="#fff" />
          <Mono size={52} color="#fff">tâche finie</Mono>
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 3. Le nom ----------

const Nom: React.FC = () => {
  const accent = useAccent();
  const agent = at('nom', 'agent');
  const en = at('nom', 'AI');
  return (
    <Scene gap={30}>
      <Pop at={agent}><Big size={150} color={accent}>agent</Big></Pop>
      <Pop at={en} style={{display: 'flex', alignItems: 'baseline', gap: 20}}>
        <Mono size={48} color={LABEL}>en anglais</Mono>
        <Mono size={64} color="#fff">AI agent</Mono>
      </Pop>
    </Scene>
  );
};

// ---------- 4. L'image : le dîner du jeudi ----------

// Les étapes que le fils choisit lui-même, une par une : le marché fermé, le frigo, le téléphone, les crêpes.
const Step: React.FC<{kind: 'marche' | 'frigo' | 'tel' | 'crepes'; size: number; off?: boolean}> = ({kind, size, off}) => {
  const accent = useAccent();
  const c = off ? '#777' : '#fff';
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      {kind === 'marche' ? (
        <>
          <path d="M12 40 L22 16 H78 L88 40 Z" fill="none" stroke={c} strokeWidth="6" />
          <path d="M18 40 V86 H82 V40" fill="none" stroke={c} strokeWidth="6" />
          <rect x="40" y="56" width="20" height="30" fill={c} />
        </>
      ) : kind === 'frigo' ? (
        <>
          <rect x="24" y="8" width="52" height="84" fill="none" stroke={c} strokeWidth="6" />
          <path d="M24 38 H76 M34 20 V30 M34 48 V62" stroke={c} strokeWidth="6" />
        </>
      ) : kind === 'tel' ? (
        <>
          <rect x="30" y="8" width="40" height="84" rx="6" fill="none" stroke={c} strokeWidth="6" />
          <path d="M44 80 H56" stroke={c} strokeWidth="6" />
        </>
      ) : (
        <>
          <ellipse cx="50" cy="66" rx="40" ry="12" fill="none" stroke={c} strokeWidth="6" />
          <ellipse cx="50" cy="58" rx="34" ry="10" fill={accent} />
          <ellipse cx="50" cy="50" rx="34" ry="10" fill="#e8c45a" />
        </>
      )}
    </svg>
  );
};

const Diner: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const fils = at('diner', 'fils');
  const mot = at('diner', 'mot');
  const euros = at('diner', 'euros');
  const ferme = at('diner', 'fermé');
  const frigo = at('diner', 'frigo');
  const grand = at('diner', 'grand-mère');
  const crepes = at('diner', 'crêpes');
  const STEPS = [
    {kind: 'marche' as const, at: ferme - 6, label: 'fermé'},
    {kind: 'frigo' as const, at: frigo, label: 'frigo'},
    {kind: 'tel' as const, at: grand, label: 'grand-mère'},
    {kind: 'crepes' as const, at: crepes, label: 'crêpes'},
  ];
  return (
    <Scene gap={34}>
      <div style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between'}}>
        <Pop at={fils} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10}}>
          <Pixel sprite={FILS} px={15} seed={7} />
          <Mono size={48} color={LABEL}>son fils</Mono>
        </Pop>
        {/* Le mot sur la table, avec le billet : la phrase est à l'écran, pas sous-titrée (quoted). */}
        <Pop at={mot} style={{position: 'relative', background: '#efe9dc', border: '6px solid #000', boxShadow: pixelShadow('#444'), padding: '22px 26px', transform: 'rotate(-2deg)', width: 420}}>
          <Say size={58} color="#111">« Fais-nous un dîner »</Say>
          <div style={{position: 'absolute', right: -24, bottom: -30, opacity: frame >= euros ? 1 : 0, background: '#4f8a5b', border: '4px solid #fff', padding: '4px 14px', transform: 'rotate(8deg)'}}>
            <Mono size={48} color="#fff">20 €</Mono>
          </div>
        </Pop>
      </div>
      {/* Le chemin qu'il trace lui-même : chaque étape tombe sur son mot, reliée à la précédente par un arc. */}
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
        {STEPS.map((s, k) => (
          <Pop key={s.kind} at={s.at} style={{position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, width: 200}}>
            <div style={{border: `5px solid ${k === 3 ? accent : '#fff'}`, padding: 12, lineHeight: 0, position: 'relative'}}>
              <Step kind={s.kind} size={120} off={k === 0} />
              {k === 0 ? <div style={{position: 'absolute', inset: 10, lineHeight: 0}}><Cross p={ease(frame, ferme, ferme + 12)} size={120} /></div> : null}
            </div>
            <Mono size={48} color={k === 3 ? accent : '#fff'}>{s.label}</Mono>
          </Pop>
        ))}
      </div>
    </Scene>
  );
};

// ---------- 5. Automatisme contre agent : qui choisit l'étape suivante ----------

const Workflow: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const automatisme = at('workflow', 'automatisme');
  const developpeur = at('workflow', 'développeur');
  const avance = at('workflow', 'avance');
  const agent = at('workflow', 'agent');
  const route = at('workflow', 'route');
  // Côté agent, les étapes apparaissent une à une et bifurquent, choisies pendant « en cours de route ».
  const n = Math.floor(interpolate(frame, [agent, route + 20], [0, 4], clamp));
  return (
    <Scene gap={44}>
      <div style={{display: 'flex', flexDirection: 'column', gap: 18}}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <Pop at={automatisme}><Mono size={52} color="#fff">automatisme</Mono></Pop>
          <Pop at={developpeur}><Mono size={48} color={LABEL}>le développeur</Mono></Pop>
        </div>
        {/* Les étapes écrites d'avance : posées toutes en même temps, en ligne droite. */}
        <div style={{display: 'flex', alignItems: 'center', gap: 0, opacity: frame >= avance ? 1 : 0}}>
          {[1, 2, 3, 4].map((k) => (
            <React.Fragment key={k}>
              <div style={{width: 150, height: 90, border: '5px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Mono size={52} color="#fff">{k}</Mono></div>
              {k < 4 ? <div style={{flex: 1, height: 6, background: '#fff'}} /> : null}
            </React.Fragment>
          ))}
        </div>
        <Pop at={avance} style={{alignSelf: 'flex-end'}}><Mono size={48} color={LABEL}>à l'avance</Mono></Pop>
      </div>
      <div style={{display: 'flex', flexDirection: 'column', gap: 18, opacity: frame >= agent ? 1 : 0.0}}>
        <Pop at={agent}><Mono size={52} color={accent}>agent</Mono></Pop>
        {/* Les étapes choisies en route : chacune décalée, comme un chemin qui se cherche. */}
        <div style={{position: 'relative', height: 200}}>
          {[0, 1, 2, 3].slice(0, n).map((k) => (
            <Pop key={k} at={agent + k * 12} style={{position: 'absolute', left: k * 245, top: [60, 0, 110, 40][k], width: 150, height: 90, border: `5px solid ${accent}`, background: withAlpha(accent, 0.15), display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Mono size={52} color={accent}>?</Mono>
            </Pop>
          ))}
        </div>
        <Pop at={route} style={{alignSelf: 'flex-end'}}><Mono size={48} color={accent}>en cours de route</Mono></Pop>
      </div>
    </Scene>
  );
};

// ---------- 6. La nuit : une seule tâche, et le lendemain midi il y est encore ----------

const Moon: React.FC<{size: number}> = ({size}) => (
  <svg width={size} height={size} viewBox="0 0 100 100"><path d="M64 12 A40 40 0 1 0 88 66 A32 32 0 1 1 64 12 Z" fill="#e8e2d6" /></svg>
);
const Sun: React.FC<{size: number}> = ({size}) => {
  const accent = useAccent();
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="22" fill="#e8c45a" />
      {Array.from({length: 8}, (_, k) => {
        const a = (k / 8) * Math.PI * 2;
        return <path key={k} d={`M${50 + 30 * Math.cos(a)} ${50 + 30 * Math.sin(a)} L${50 + 42 * Math.cos(a)} ${50 + 42 * Math.sin(a)}`} stroke={accent} strokeWidth="6" strokeLinecap="round" />;
      })}
    </svg>
  );
};

const Nuit: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const tache = at('nuit', 'tâche');
  const rentrer = at('nuit', 'rentrer');
  const lendemain = at('nuit', 'lendemain');
  const encore = at('nuit', 'encore');
  // La barre de travail avance de la nuit au lendemain midi, et continue au-delà.
  const work = ease(frame, rentrer, encore + 20, [0, 1], 'inOut');
  return (
    <Scene gap={40}>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <Pop at={rentrer} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6}}><Moon size={130} /></Pop>
        <Pop at={lendemain} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6}}>
          <Sun size={130} />
          <Mono size={48} color={LABEL}>le lendemain midi</Mono>
        </Pop>
      </div>
      {/* La tâche unique, et la barre qui avance pendant que tout le monde dort. */}
      <Pop at={tache} style={{border: `6px solid ${accent}`, padding: '18px 22px', display: 'flex', flexDirection: 'column', gap: 16}}>
        <Mono size={52} color="#fff">une seule tâche</Mono>
        <div style={{position: 'relative', height: 36, border: '4px solid #666'}}>
          <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: `${92 * work}%`, background: accent}} />
          <div style={{position: 'absolute', left: `${92 * work}%`, top: -6, width: 14, height: 40, background: '#fff', opacity: frame >= encore ? blink(frame) : 1}} />
        </div>
      </Pop>
      <Pop at={encore} style={{alignSelf: 'flex-end'}}><Mono size={56} color={accent}>encore</Mono></Pop>
    </Scene>
  );
};

// ---------- 7. Les photos effacées, retrouvées dans une sauvegarde ----------

const Photos: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const accent = useAccent();
  const ranger = at('photos', 'ranger');
  const efface = at('photos', 'effacé');
  const photos = at('photos', 'photos');
  const sauvegarde = at('photos', 'sauvegarde');
  // Les photos disparaissent une à une sur « effacé », puis reviennent en arc depuis la sauvegarde.
  const del = Math.floor(interpolate(frame, [efface, photos + 10], [0, 24], clamp));
  const back = spring({frame: frame - sauvegarde, fps, config: {damping: 16, stiffness: 120}});
  const restored = frame >= sauvegarde;
  return (
    <Scene gap={30}>
      <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
        <Pop at={ranger}><Mono size={52} color={LABEL}>ranger un ordinateur</Mono></Pop>
        <Pop at={photos} style={{alignSelf: 'flex-end'}}><Mono size={52} color={accent}>15 ans de photos</Mono></Pop>
      </div>
      <div style={{position: 'relative', height: 420}}>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12}}>
          {Array.from({length: 24}, (_, k) => {
            const gone_ = !restored && k < del;
            const [dx, dy] = restored && k < 24 ? arc(Math.min(1, back), [600 - (k % 6) * 145, 360 - Math.floor(k / 6) * 92], [0, 0], 40) : [0, 0];
            return (
              <Pop key={k} at={ranger + Math.floor(k / 3)} style={{height: 80, background: ['#5b7fb5', '#4f8a5b', '#e8c45a', '#b5524f', '#8e4a7a'][k % 5], border: '4px solid #fff', opacity: gone_ ? 0.08 : 1, transform: `translate(${dx}px, ${dy}px)`}}><div /></Pop>
            );
          })}
        </div>
        <Pop at={sauvegarde} style={{position: 'absolute', right: 0, bottom: 0, border: '5px solid #fff', padding: '10px 18px', display: 'flex', alignItems: 'center', gap: 14}}>
          <Mono size={52} color="#fff">sauvegarde</Mono>
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 8. Chute : une copie, pas l'original ----------

const Folder: React.FC<{label: string; color: string; children?: React.ReactNode}> = ({label, color, children}) => (
  <div style={{position: 'relative', width: 340, height: 230, border: `6px solid ${color}`, background: '#1c1c1c', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 18, boxSizing: 'border-box'}}>
    <div style={{position: 'absolute', left: -6, top: -40, width: 140, height: 40, border: `6px solid ${color}`, borderBottom: 'none', background: '#1c1c1c'}} />
    <Mono size={52} color={color}>{label}</Mono>
    {children}
  </div>
);

const Chute: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const accent = useAccent();
  const seul = at('chute', 'seul');
  const copie = at('chute', 'copie');
  const original = at('chute', 'original');
  // La copie se détache de l'original en arc et part vers l'agent ; l'original reste sous cadenas.
  const fly = spring({frame: frame - copie, fps, config: {damping: 15, stiffness: 120}});
  const [cx, cy] = arc(fly, [0, 0], [0, 330], -60);
  return (
    <Scene gap={30}>
      <div style={{position: 'relative', height: 640}}>
        <Pop at={2} style={{position: 'absolute', left: 0, top: 40}}>
          <Folder label="l'original" color="#fff">
            <div style={{position: 'absolute', right: -30, top: -50, lineHeight: 0, opacity: frame >= original ? 1 : 0}}><Lock p={ease(frame, original, original + 10)} size={90} color={accent} /></div>
          </Folder>
        </Pop>
        <div style={{position: 'absolute', left: cx, top: 40 + cy, opacity: frame >= copie ? 1 : 0}}>
          <Folder label="une copie" color={accent} />
        </div>
        <Pop at={seul} style={{position: 'absolute', right: 0, top: 360, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10}}>
          <Model w={260} />
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- Montage ----------

const SCENES: Record<string, React.FC> = {hook: Hook, intro: Intro, boucle: Boucle, nom: Nom, diner: Diner, workflow: Workflow, nuit: Nuit, photos: Photos, chute: Chute};

export const AgentVoix: React.FC = () => <V.Montage scenes={SCENES} accent={AC} />;

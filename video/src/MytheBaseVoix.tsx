// Short Mythe « L'IA cherche la réponse dans une base » (YouTube / TikTok), voix off PAL - FR, préparé le 2026-10-08.
// Fiche mythe-base-de-donnees de lexique/terms.js ; faits ajoutés pour le short, sources dans voix/base-de-donnees.script.json :
// la phrase du livre de 2025 (p. 105, relevée par l'AFIS le 2 septembre 2025), Llama 3 (Meta, 18 avril 2024 : plus de
// 15T tokens, 8B paramètres, d'où 1 875 tokens par paramètre), Mata v. Avianca (22 juin 2023 : six décisions inventées
// par ChatGPT, 5 000 dollars d'amende). L'auteur du livre n'est pas nommé : la pique vise l'idée, pas la personne.
// Règle de lisibilité (retour PA sur le short « n'existe pas ») : le discours passe par les sous-titres seuls ; l'écran
// ne montre que des schémas, avec des libellés de 3 mots au plus.
// Le moteur (calage, sous-titres, montage) est dans voix/VoixShort.tsx ; ce fichier ne contient que les scènes.
import React from 'react';
import {Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Big, Check, Draw, Lock, Mono, Pop, Say, Scene, W, clamp, useAccent, withAlpha} from './kit';
import {LABEL, makeVoix} from './voix/VoixShort';
import ALIGN from './voix/base-de-donnees.align.json';
import SCRIPT from './voix/base-de-donnees.script.json';

const AC = '#FF7A7A'; // catégorie Mythes vs réalité
const V = makeVoix(ALIGN, SCRIPT, 'voix/prediction-music.mp3');
const {at} = V;
export const MYTHEBASEVOIX_DURATION = V.duration;

const pixelShadow = (c: string) => `8px 8px 0 ${c}`;
// Un élément qui a fini son rôle s'efface en 6 images : rien ne reste à l'écran sans raison.
const gone = (frame: number, until: number) => interpolate(frame, [until, until + 6], [1, 0], clamp);

// ---------- 0. Hook : la phrase du livre, en grand, et le livre lui-même ----------
// La couverture (public/voix/ia-n-existe-pas-livre-2025.png, 160 x 240) est collée comme une coupure de presse :
// quand on cite un objet réel, on le montre (univers.md, « Illustrer plutôt qu'étiqueter »). Crédit dans la description.

const Collage: React.FC<{src: string; w: number; h: number; at: number; tilt: number}> = ({src, w, h, at: a, tilt}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  // Posée d'un coup, comme une photo qu'on plaque sur un tableau : elle arrive grande et de travers, puis se cale.
  const slap = spring({frame: frame - a, fps, config: {damping: 12, stiffness: 260}});
  return (
    <div style={{position: 'relative', opacity: frame >= a ? 1 : 0, transform: `scale(${1.5 - 0.5 * slap}) rotate(${tilt * (2 - slap)}deg)`}}>
      <div style={{border: '8px solid #fff', boxShadow: pixelShadow('#333'), lineHeight: 0}}>
        <Img src={staticFile(src)} style={{width: w, height: h}} />
      </div>
      {/* Deux bouts de scotch aux coins. */}
      <div style={{position: 'absolute', left: -22, top: -14, width: 90, height: 30, background: 'rgba(239,233,220,0.85)', transform: 'rotate(-30deg)'}} />
      <div style={{position: 'absolute', right: -22, top: -14, width: 90, height: 30, background: 'rgba(239,233,220,0.85)', transform: 'rotate(30deg)'}} />
    </div>
  );
};

const Hook: React.FC = () => {
  const accent = useAccent();
  const puise = at('hook', 'puise');
  const base = at('hook', 'base');
  const n = at('hook', '760');
  const livre = at('hook', 'livre');
  return (
    <Scene>
      <div style={{position: 'relative', display: 'flex', flexDirection: 'column', gap: 6}}>
        {/* Le verdict sur la phrase citée, posé juste après la citation, il reste jusqu'à la fin du hook : c'est l'image de couverture. */}
        <Stamp at={at('hook', 'paramètres') + 14} size={96} tilt={-12} bg="rgba(0,0,0,0.6)" style={{right: 10, top: 70, zIndex: 2}}>FAUX</Stamp>
        <Pop at={0}><Big size={100}>« ChatGPT puise</Big></Pop>
        <Pop at={Math.min(puise + 6, base)}><Big size={100}>dans sa base</Big></Pop>
        <Pop at={base + 8}><Big size={100}>de données »</Big></Pop>
        <div style={{marginTop: 36, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
            <Pop at={n}><Mono size={76} color={accent}>1 760</Mono></Pop>
            <Pop at={n + 4}><Mono size={76} color={accent}>milliards</Mono></Pop>
            <Pop at={n + 8}><Mono size={52} color={LABEL}>de paramètres</Mono></Pop>
          </div>
          <div style={{marginRight: 30}}>
            <Collage src="voix/ia-n-existe-pas-livre-2025.png" w={208} h={312} at={livre} tilt={5} />
          </div>
        </div>
      </div>
    </Scene>
  );
};

// ---------- 1. L'armoire à fiches : on l'ouvre, elle est vide ----------

const Cabinet: React.FC<{open: number; tabs: number; scale?: number}> = ({open, tabs, scale = 1}) => {
  const accent = useAccent();
  const cols = 3;
  const rows = 4;
  const dw = 230;
  const dh = 96;
  const gap = 18;
  const pad = 24;
  const w = cols * dw + (cols - 1) * gap + 2 * pad;
  const h = rows * dh + (rows - 1) * gap + 2 * pad;
  return (
    <svg width={w * scale} height={(h + 30) * scale} viewBox={`0 0 ${w} ${h + 30}`} style={{overflow: 'visible'}}>
      <rect x="0" y="0" width={w} height={h} fill="#2a2a2a" stroke="#fff" strokeWidth="6" />
      <rect x="30" y={h} width="40" height="30" fill="#fff" />
      <rect x={w - 70} y={h} width="40" height="30" fill="#fff" />
      {Array.from({length: rows * cols}, (_, k) => {
        const c = k % cols;
        const r = Math.floor(k / cols);
        const x = pad + c * (dw + gap);
        const y = pad + r * (dh + gap);
        // Les tiroirs sortent l'un après l'autre, en diagonale.
        const o = interpolate(open, [(c + r) / 10, (c + r) / 10 + 0.5], [0, 1], clamp);
        return (
          <g key={k} transform={`translate(${-o * 10}, ${o * 34})`}>
            {/* L'intérieur du tiroir, vide, apparaît quand il sort. */}
            <rect x={x} y={y - o * 60} width={dw} height={dh + o * 60} fill="#000" stroke="#fff" strokeWidth="5" />
            <rect x={x} y={y} width={dw} height={dh} fill="#3a3a3a" stroke="#fff" strokeWidth="5" />
            <rect x={x + dw / 2 - 34} y={y + dh / 2 - 8} width="68" height="16" fill="#cfcfcf" />
            {/* L'étiquette du tiroir, la « fiche » qu'on croit y trouver. */}
            <rect x={x + 20} y={y + 14} width="56" height="20" fill={accent} opacity={interpolate(tabs, [k / 12, k / 12 + 0.1], [0, 1], clamp)} />
          </g>
        );
      })}
    </svg>
  );
};

const Armoire: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const armoire = at('armoire', 'armoire');
  const fiches = at('armoire', 'fiches');
  const ouvrant = at('armoire', 'ouvrant');
  const aucune = at('armoire', 'aucune');
  return (
    <Scene
      bottom={
        <Pop at={aucune} style={{display: 'flex', justifyContent: 'center'}}>
          <Mono size={64} color={accent}>aucune fiche</Mono>
        </Pop>
      }
    >
      <Pop at={armoire} style={{display: 'flex', justifyContent: 'center'}}>
        <Cabinet open={interpolate(frame, [ouvrant, ouvrant + 30], [0, 1], clamp)} tabs={interpolate(frame, [fiches, fiches + 20], [0, 1], clamp)} scale={0.92} />
      </Pop>
    </Scene>
  );
};

// ---------- 2. Les potards : des milliards de nombres, réglés puis figés ----------

const Knob: React.FC<{angle: number; size: number; color?: string}> = ({angle, size, color = '#fff'}) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="40" fill="#1c1c1c" stroke={color} strokeWidth="8" />
    <line x1="50" y1="50" x2={50 + 32 * Math.sin((angle * Math.PI) / 180)} y2={50 - 32 * Math.cos((angle * Math.PI) / 180)} stroke={color} strokeWidth="10" strokeLinecap="round" />
  </svg>
);

// Angle de départ et angle réglé, fixes par potard (pseudo-aléatoire stable).
const rnd = (k: number) => {
  const x = Math.sin(k * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

const Potards: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const params = at('potards', 'paramètres');
  const milliards = at('potards', 'milliards');
  const regles = at('potards', 'réglés');
  const entrainement = at('potards', 'entraînement');
  const touche = at('potards', 'touche');
  const cols = 7;
  const rows = 4;
  // Pendant « réglés pendant l'entraînement », chaque potard tourne vers sa valeur ; après « touche plus », il est figé.
  const tune = interpolate(frame, [regles, entrainement + 40], [0, 1], clamp);
  const frozen = frame >= touche;
  return (
    <Scene
      gap={40}
      bottom={
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24}}>
          <Pop at={params}><Mono size={64} color="#fff">paramètres</Mono></Pop>
          {frozen ? <Pop at={touche}><Lock p={interpolate(frame, [touche, touche + 10], [0, 1], clamp)} size={80} color={accent} /></Pop> : null}
        </div>
      }
    >
      <Pop at={params} style={{display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 14, transform: `scale(${1 - 0.1 * interpolate(frame, [milliards, milliards + 20], [0, 1], clamp)})`}}>
        {Array.from({length: cols * rows}, (_, k) => {
          const a0 = -130 + 260 * rnd(k);
          const a1 = -130 + 260 * rnd(k + 100);
          const wobble = tune > 0 && tune < 1 ? 25 * Math.sin(frame / 3 + k) * (1 - tune) : 0;
          return (
            <div key={k} style={{display: 'flex', justifyContent: 'center'}}>
              <Knob size={96} angle={a0 + (a1 - a0) * tune + wobble} color={frozen ? accent : '#fff'} />
            </div>
          );
        })}
      </Pop>
      <Pop at={milliards} style={{display: 'flex', justifyContent: 'center'}}>
        <Mono size={56} color={LABEL}>× des milliards</Mono>
      </Pop>
    </Scene>
  );
};

// ---------- 3. La taille : une bibliothèque entière résumée dans un seul livre ----------
// Image de la voix, sans chiffre de plus : 15 000 milliards de tokens lus contre 8 milliards de paramètres gardés.

const SPINES = Array.from({length: 2 * 44}, (_, k) => ({h: 70 + 40 * rnd(k + 7), c: ['#cfcfcf', '#9a9a9a', '#e8e2d6', '#6f6f6f', '#b8b0a0'][Math.floor(rnd(k + 50) * 5)]}));

const Shelf: React.FC<{built: number}> = ({built}) => (
  <div style={{display: 'flex', flexDirection: 'column', gap: 0}}>
    {[0, 1].map((r) => (
      <div key={r} style={{display: 'flex', alignItems: 'flex-end', gap: 2, height: 116, borderBottom: '8px solid #fff'}}>
        {SPINES.slice(r * 44, r * 44 + 44).map((s, k) => (
          <div key={k} style={{width: 18, height: s.h, background: s.c, opacity: r * 44 + k < built * SPINES.length ? 1 : 0}} />
        ))}
      </div>
    ))}
  </div>
);

const Taille: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const accent = useAccent();
  const lu = at('taille', '15');
  const garde = at('taille', 'garde');
  const biblio = at('taille', 'bibliothèque');
  const livre = at('taille', 'livre');
  const built = interpolate(frame, [4, lu + 20], [0, 1], clamp);
  // « comme si on résumait une bibliothèque » : les étagères se tassent et filent dans le livre.
  const squash = interpolate(frame, [biblio, livre], [0, 1], clamp);
  const pulse = spring({frame: frame - livre, fps, config: {damping: 8, stiffness: 200}});
  return (
    <Scene gap={24}>
      <div style={{position: 'relative', height: 330}}>
        <div style={{opacity: 1 - squash, transformOrigin: '50% 100%', transform: `scale(${1 - 0.8 * squash}, ${1 - 0.6 * squash}) translateY(${squash * 120}px)`}}>
          <Shelf built={built} />
        </div>
        <Pop at={lu} style={{position: 'absolute', left: 0, top: 262, display: 'flex', alignItems: 'baseline', gap: 16, opacity: 1 - squash}}>
          <Mono size={52} color="#fff">15 000 milliards</Mono>
          <Mono size={48} color={LABEL}>tokens lus</Mono>
        </Pop>
      </div>
      <Pop at={garde} style={{display: 'flex', alignItems: 'center', gap: 30}}>
        {/* Le livre gardé : un seul volume, en couleur d'accent. */}
        <div style={{position: 'relative', width: 120, height: 160, background: accent, border: '6px solid #fff', boxShadow: pixelShadow(withAlpha(accent, 0.35)), transform: `scale(${1 + 0.25 * pulse * (frame >= livre ? 1 : 0)})`}}>
          <div style={{position: 'absolute', left: 14, top: 0, bottom: 0, width: 8, background: 'rgba(0,0,0,0.35)'}} />
          <div style={{position: 'absolute', left: 36, right: 14, top: 26, height: 10, background: '#fff'}} />
          <div style={{position: 'absolute', left: 36, right: 30, top: 46, height: 8, background: 'rgba(255,255,255,0.6)'}} />
        </div>
        <div style={{display: 'flex', flexDirection: 'column', gap: 6}}>
          <Mono size={52} color={accent}>8 milliards</Mono>
          <Mono size={48} color={LABEL}>paramètres gardés</Mono>
        </div>
      </Pop>
    </Scene>
  );
};

// ---------- 4. Il écrit : un token à la fois, tiré parmi les plus probables ----------

const ANSWER = ["C'est", ' Léonard', ' de', ' Vinci'];
const CANDS = [',', '.', ' qui'];

const Ecrit: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const question = at('ecrit', 'question');
  const ecrit = at('ecrit', 'écrit');
  const tirant = at('ecrit', 'tirant');
  const probables = at('ecrit', 'probables');
  const step = Math.max(6, Math.floor((tirant - 8 - ecrit) / ANSWER.length));
  const shown = frame < ecrit ? 0 : Math.min(ANSWER.length, 1 + Math.floor((frame - ecrit) / step));
  // Le tirage : la surbrillance saute d'un candidat à l'autre, puis s'arrête sur « , » quand la voix dit « probables ».
  const landed = frame >= probables;
  const hop = landed ? 0 : Math.floor((frame - tirant) / 5) % CANDS.length;
  return (
    <Scene
      gap={36}
      bottom={
        <Pop at={ecrit} style={{display: 'flex', justifyContent: 'center'}}>
          <Mono size={56} color={LABEL}>token par token</Mono>
        </Pop>
      }
    >
      {/* « Impossible d'y ranger les textes » : l'armoire barrée, avant la question. */}
      {frame < question + 6 ? (
        <Pop at={4} style={{position: 'absolute', left: 0, right: 0, top: 120, display: 'flex', justifyContent: 'center', opacity: gone(frame, question)}}>
          <div style={{position: 'relative'}}>
            <Cabinet open={0} tabs={1} scale={0.6} />
            <svg width={440} height={300} viewBox="0 0 100 100" preserveAspectRatio="none" style={{position: 'absolute', left: -20, top: -10}}>
              <Draw d="M8 8 L92 92" p={interpolate(frame, [10, 24], [0, 1], clamp)} width={5} len={130} />
            </svg>
          </div>
        </Pop>
      ) : null}
      <Pop at={question} style={{alignSelf: 'flex-end', background: '#2a2a2a', borderRadius: 34, padding: '22px 34px'}}>
        <Say size={60}>Qui a peint la Joconde ?</Say>
      </Pop>
      <div style={{display: 'flex', alignItems: 'flex-start', gap: 8, minHeight: 300, opacity: frame >= ecrit ? 1 : 0}}>
        <div style={{display: 'flex', flexWrap: 'wrap', gap: 8, maxWidth: W - 200}}>
          {ANSWER.slice(0, shown).map((t, k) => (
            <Pop key={k} at={ecrit + k * step} style={{border: '4px solid #fff', padding: '8px 14px'}}>
              <Say size={60}>{t.trim()}</Say>
            </Pop>
          ))}
        </div>
        {/* Les candidats pour le token suivant ; le tiré passe en couleur. */}
        <Pop at={tirant} style={{display: 'flex', flexDirection: 'column', gap: 10}}>
          {CANDS.map((c, k) => (
            <div key={k} style={{border: `4px solid ${k === hop ? accent : '#666'}`, background: k === hop ? withAlpha(accent, landed ? 0.35 : 0.15) : 'transparent', padding: '6px 18px', minWidth: 110, textAlign: 'center'}}>
              <Mono size={52} color={k === hop ? accent : LABEL}>{c.trim()}</Mono>
            </div>
          ))}
        </Pop>
      </div>
    </Scene>
  );
};

// Tampon : posé d'un coup, de travers, quand la voix arrive au mot.
const Stamp: React.FC<{at: number; children: React.ReactNode; size: number; tilt?: number; bg?: string; style?: React.CSSProperties}> = ({at: a, children, size, tilt = -10, bg = 'transparent', style}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const accent = useAccent();
  const p = spring({frame: frame - a, fps, config: {damping: 9, stiffness: 220}});
  return (
    <div style={{position: 'absolute', padding: '6px 18px', border: `${Math.round(size / 9)}px solid ${accent}`, background: bg, transform: `scale(${1.8 - 0.8 * p}) rotate(${tilt * p}deg)`, opacity: frame >= a ? 1 : 0, ...style}}>
      <Mono size={size} color={accent}>{children}</Mono>
    </div>
  );
};

// ---------- 5. Deux réponses à la même question ----------

const Deux: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const reponses = at('deux', 'réponses');
  const diff = at('deux', 'différentes');
  return (
    <Scene gap={22}>
      {['Pistache', 'Moustache'].map((r, k) => (
        <Pop key={k} at={4 + k * 6} style={{border: `4px solid ${frame >= diff ? accent : '#666'}`, padding: '20px 28px', display: 'flex', flexDirection: 'column', gap: 12}}>
          <Mono size={48} color={LABEL}>Un nom pour mon chat ?</Mono>
          <div style={{opacity: frame >= reponses - 8 + k * 8 ? 1 : 0}}><Say size={64}>{r}</Say></div>
        </Pop>
      ))}
    </Scene>
  );
};

// ---------- 6. Les avocats : la jurisprudence inventée ----------

const Avocats: React.FC = () => {
  const accent = useAccent();
  const inventees = at('avocats', 'inventées');
  const amende = at('avocats', '000');
  return (
    <Scene
      bottom={
        <Pop at={amende} style={{display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 22}}>
          <Mono size={84} color={accent}>5 000 $</Mono>
          <Mono size={52} color={LABEL}>d'amende</Mono>
        </Pop>
      }
    >
      {/* La décision citée par les avocats, qui n'a jamais existé. */}
      <Pop at={4} style={{position: 'relative', margin: '0 30px', background: '#efe9dc', border: '8px solid #000', boxShadow: pixelShadow('#444'), padding: '36px 40px', display: 'flex', flexDirection: 'column', gap: 18}}>
        <Mono size={48} color="#555">jurisprudence</Mono>
        <Say size={64} color="#111">Varghese v. China Southern Airlines</Say>
        <div style={{height: 14, width: '80%', background: '#9a9384'}} />
        <div style={{height: 14, width: '64%', background: '#9a9384'}} />
        <Stamp at={inventees} size={56} bg="#efe9dc" style={{right: 30, bottom: 30}}>inventée</Stamp>
      </Pop>
    </Scene>
  );
};

// ---------- 7. Chute : le même aplomb, qu'il ait raison ou tort ----------

const Verdict: React.FC<{answer: string; ok: boolean; at: number; fillAt: number; markAt: number}> = ({answer, ok, at: a, fillAt, markAt}) => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const fill = interpolate(frame, [fillAt, fillAt + 18], [0, 1], clamp);
  const mark = interpolate(frame, [markAt, markAt + 10], [0, 1], clamp);
  return (
    <Pop at={a} style={{border: `6px solid ${frame >= markAt ? (ok ? '#fff' : accent) : '#666'}`, boxShadow: pixelShadow('#222'), padding: '24px 30px', display: 'flex', flexDirection: 'column', gap: 16}}>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <Say size={56}>{answer}</Say>
        <div style={{opacity: frame >= markAt ? 1 : 0, lineHeight: 0}}>
          {ok ? (
            <Check p={mark} size={76} color="#fff" />
          ) : (
            <svg width={76} height={76} viewBox="0 0 100 100">
              <Draw d="M22 22 L78 78" p={mark} width={12} len={80} color={accent} />
              <Draw d="M78 22 L22 78" p={mark} width={12} len={80} color={accent} />
            </svg>
          )}
        </div>
      </div>
      <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
        <Mono size={48} color={LABEL}>aplomb</Mono>
        <div style={{flex: 1, height: 30, border: '4px solid #fff', position: 'relative'}}>
          <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: `${fill * 100}%`, background: '#fff'}} />
        </div>
      </div>
    </Pop>
  );
};

const Chute: React.FC = () => {
  const frame = useCurrentFrame();
  const reecrit = at('chute', 'réécrit');
  const aplomb = at('chute', 'aplomb');
  const raison = at('chute', 'raison');
  const tort = at('chute', 'tort');
  // Avant l'aplomb : l'armoire vide, et le trait qui s'écrit à côté quand la voix dit « réécrit ».
  const pen = interpolate(frame, [reecrit, reecrit + 40], [0, 1], clamp);
  return (
    <Scene gap={34}>
      {frame < aplomb + 6 ? (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 30, opacity: gone(frame, aplomb)}}>
          <Pop at={4} style={{opacity: 0.55}}><Cabinet open={1} tabs={0} scale={0.42} /></Pop>
          <svg width={360} height={200} viewBox="0 0 360 200" style={{opacity: frame >= reecrit ? 1 : 0}}>
            <Draw d="M10 120 C 50 40, 80 180, 120 100 S 190 40, 220 110 S 300 170, 350 80" p={pen} width={12} len={520} />
          </svg>
        </div>
      ) : null}
      {frame >= aplomb ? (
        <>
          <Verdict answer="Léonard de Vinci" ok at={aplomb} fillAt={aplomb} markAt={raison} />
          <Verdict answer="Varghese v. China…" ok={false} at={aplomb + 6} fillAt={aplomb + 6} markAt={tort} />
        </>
      ) : null}
    </Scene>
  );
};

// ---------- Montage ----------

const SCENES: Record<string, React.FC> = {hook: Hook, armoire: Armoire, potards: Potards, taille: Taille, ecrit: Ecrit, deux: Deux, avocats: Avocats, chute: Chute};

export const MytheBaseVoix: React.FC = () => <V.Montage scenes={SCENES} accent={AC} />;

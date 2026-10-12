// Short Fenêtre de contexte (YouTube / TikTok / Instagram), épisode 4, voix off PAL - FR, préparé le 2026-10-09.
// Fiche fenetre-de-contexte de lexique/terms.js : le paquet renvoyé à chaque message, le tableau blanc de la salle de réunion ;
// Du côté de chez Swann compté avec tiktoken (265 851 tokens), GPT-4 à 8 000 tokens en 2023, un million depuis 2024
// (Gemini 1.5 Pro) ; Chroma, juillet 2025 : 18 modèles, tous moins fiables quand le texte s'allonge (courbes schématiques).
// Règle de lisibilité : le discours passe par les sous-titres ; l'écran montre des schémas, libellés de 3 mots au plus.
// L'écran suit la voix et Le mouvement (univers.md, repassés le 2026-10-12) : libellés repris de la voix, Patrick montré, easing.
import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Big, Draw, Mono, Pop, Say, Scene, W, clamp, ease, useAccent, withAlpha} from './kit';
import {LABEL, makeVoix} from './voix/VoixShort';
import {PATRICK, Pixel} from './voix/Pixel';
import ALIGN from './voix/fenetre.align.json';
import SCRIPT from './voix/fenetre.script.json';

const AC = '#7CFFB2'; // catégorie Fondations (celle de la fiche fenetre-de-contexte)
const V = makeVoix(ALIGN, SCRIPT, 'voix/prediction-music.mp3');
const {at} = V;
export const FENETREVOIX_DURATION = V.duration;

const pixelShadow = (c: string) => `8px 8px 0 ${c}`;
const gone = (frame: number, until: number) => ease(frame, until, until + 6, [1, 0], 'inOut');
const rnd = (k: number) => {
  const x = Math.sin(k * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};

// ---------- 0. Hook ----------

const Hook: React.FC = () => <V.TitleHook lead="C'est quoi ?" lines={['la fenêtre', 'de contexte']} cue="fenêtre" />;

// ---------- 1. Intro : la consigne du début sort de l'écran ----------

const MSGS = ['Fais-moi un plan', 'Ajoute un exemple', 'Plus court', 'Et la conclusion ?', 'Reformule le 2', 'Ajoute des chiffres'];

const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const consigne = at('intro', 'consigne');
  const heure = at('intro', 'heure');
  const rien = at('intro', 'rien');
  // Pendant « une heure plus tard », les messages s'empilent et poussent la consigne vers le haut, hors du cadre.
  const n = Math.floor(ease(frame, heure - 10, rien, [0, MSGS.length], 'inOut'));
  const ROW = 104;
  const shift = Math.max(0, n - 2) * ROW;
  return (
    <Scene>
      <div style={{position: 'relative', height: 600, overflow: 'hidden'}}>
        <div style={{position: 'absolute', left: 0, right: 0, top: 0, transform: `translateY(${-shift}px)`, display: 'flex', flexDirection: 'column', gap: 16}}>
          <Pop at={consigne} style={{alignSelf: 'flex-end', background: withAlpha(accent, 0.25), border: `4px solid ${accent}`, padding: '18px 28px'}}>
            <Say size={60}>Réponds en anglais</Say>
          </Pop>
          {MSGS.slice(0, n).map((m, k) => (
            <div key={k} style={{alignSelf: k % 2 ? 'flex-start' : 'flex-end', background: k % 2 ? 'transparent' : '#2a2a2a', border: k % 2 ? '4px solid #444' : 'none', padding: '14px 26px', height: 88, boxSizing: 'border-box'}}>
              <Say size={52} color={k % 2 ? LABEL : '#fff'}>{k % 2 ? 'Voici…' : m}</Say>
            </div>
          ))}
        </div>
        {/* Le haut de l'écran se fond dans le noir : ce qui en sort est perdu. */}
        <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 80, background: 'linear-gradient(#000, transparent)'}} />
      </div>
    </Scene>
  );
};

// ---------- 2. Le paquet : tout ce qu'on lui renvoie à chaque message ----------

const PIECES = [
  {cue: 'consignes', label: 'consignes', h: 80},
  {cue: 'historique', label: 'historique', h: 190},
  {cue: 'fichiers', label: 'fichiers', h: 120},
  {cue: 'question', label: 'ta question', h: 80},
];

const Packet: React.FC<{cues: number[]; frame: number; fill?: number}> = ({cues, frame, fill = 1}) => {
  const accent = useAccent();
  return (
    <div style={{width: 520, border: `8px solid ${accent}`, boxShadow: pixelShadow(withAlpha(accent, 0.35)), padding: 14, display: 'flex', flexDirection: 'column', gap: 10}}>
      {PIECES.map((p, k) => (
        <div key={k} style={{height: p.h * fill, background: k === 1 ? '#3a3a3a' : '#2a2a2a', border: '3px solid #666', display: 'flex', alignItems: 'center', paddingLeft: 18, opacity: frame >= cues[k] ? 1 : 0, transform: `translateY(${frame >= cues[k] ? 0 : -30}px)`, overflow: 'hidden'}}>
          <Mono size={48} color="#fff">{p.label}</Mono>
        </div>
      ))}
    </div>
  );
};

const Paquet: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const cues = PIECES.map((p) => at('paquet', p.cue));
  const memoire = at('paquet', 'mémoire');
  return (
    <Scene
      bottom={
        <Pop at={memoire} style={{display: 'flex', justifyContent: 'center'}}>
          <Mono size={56} color={accent}>pas d'autre mémoire</Mono>
        </Pop>
      }
    >
      <Pop at={4} style={{display: 'flex', justifyContent: 'center'}}>
        <Packet cues={cues} frame={frame} />
      </Pop>
    </Scene>
  );
};

// ---------- 3. Le nom : la taille maximale du paquet ----------

const Nom: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const accent = useAccent();
  const maxi = at('nom', 'maximale');
  const fen = at('nom', 'fenêtre');
  const en = at('nom', 'context');
  // Sur « maximale », un cadre se pose autour du paquet : sa limite.
  const lim = spring({frame: frame - maxi, fps, config: {damping: 14, stiffness: 200}});
  return (
    <Scene gap={30}>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: 400, marginTop: 30}}>
        <div style={{position: 'relative', transform: 'scale(0.66)', transformOrigin: '50% 0'}}>
          <Pop at={4}><Packet cues={[0, 0, 0, 0]} frame={frame} /></Pop>
          <div style={{position: 'absolute', left: -26, right: -26, top: -26, bottom: -26, border: `6px dashed #fff`, opacity: frame >= maxi ? 1 : 0, transform: `scale(${1.25 - 0.25 * lim})`}} />
        </div>
      </div>
      <Pop at={fen}><Big size={96} color={accent}>fenêtre de contexte</Big></Pop>
      <Pop at={en} style={{display: 'flex', alignItems: 'baseline', gap: 20}}>
        <Mono size={48} color={LABEL}>en anglais</Mono>
        <Mono size={64} color="#fff">context window</Mono>
      </Pop>
    </Scene>
  );
};

// ---------- 4. L'image : le tableau blanc de la salle de réunion ----------

// Les lignes écrites au feutre : 3 colonnes x 6 rangées ; la case en haut à gauche porte la décision en orange.
const LINES = Array.from({length: 18}, (_, k) => ({c: k % 3, r: Math.floor(k / 3), w: 150 + 90 * rnd(k)}));

const Tableau: React.FC = () => {
  const frame = useCurrentFrame();
  const efface = at('tableau', 'efface');
  const plein = at('tableau', 'plein');
  const pourquoi = at('tableau', 'pourquoi');
  const orange = at('tableau', 'orange');
  const ORANGE = '#FF9A3D';
  const BW = 880;
  const BH = 520;
  // Le tableau se remplit de l'image 4 jusqu'à « plein » ; l'éponge passe sur le coin pendant « efface par le coin ».
  const written = ease(frame, 4, plein, [1, LINES.length], 'inOut');
  const wipe = ease(frame, efface, efface + 24, [0, 1], 'inOut');
  const patrick = at('tableau', 'Patrick');
  const seize = at('tableau', 'seize');
  return (
    <Scene
      gap={20}
      bottom={
        <div style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between'}}>
          <Pop at={patrick} style={{display: 'flex', alignItems: 'flex-end', gap: 16}}>
            <Pixel sprite={PATRICK} px={10} seed={9} />
            <Mono size={48} color="#fff">Patrick</Mono>
          </Pop>
          <Pop at={seize}><Mono size={56} color={LABEL}>16 h</Mono></Pop>
        </div>
      }
    >
      <Pop at={4} style={{position: 'relative', width: BW, height: BH, background: '#f4f4f0', border: '10px solid #cfcfcf', boxShadow: pixelShadow('#333')}}>
        {/* La décision du matin, en orange, dans le coin. */}
        <div style={{position: 'absolute', left: 30, top: 26, opacity: 1 - wipe}}>
          <div style={{width: 230, height: 22, background: ORANGE, marginBottom: 14}} />
          <div style={{width: 180, height: 22, background: ORANGE}} />
        </div>
        {LINES.map((l, k) => (k === 0 || k === 3 ? null : (
          <div key={k} style={{position: 'absolute', left: 30 + l.c * 285, top: 26 + l.r * 80, width: l.w, height: 18, background: '#3a3a3a', opacity: k < written ? 1 : 0}} />
        )))}
        {/* L'éponge balaie le coin en haut à gauche. */}
        <div style={{position: 'absolute', left: 10 + 240 * Math.sin(wipe * Math.PI * 3) * (1 - wipe) + 120 * wipe, top: 20 + 70 * wipe, width: 110, height: 70, background: '#2a6cff', border: '6px solid #fff', opacity: frame >= efface && wipe < 1 ? 1 : 0}} />
        {/* Ce qu'on écrit à la place, en gris : la suite de la réunion. */}
        {[0, 1].map((k) => <div key={k} style={{position: 'absolute', left: 30, top: 26 + k * 36, width: 200 - 40 * k, height: 18, background: '#3a3a3a', opacity: frame >= efface + 30 + k * 8 ? 1 : 0}} />)}
        <div style={{position: 'absolute', right: 40, bottom: 20, opacity: frame >= pourquoi ? 1 : 0}}>
          <Big size={180} color={frame >= orange ? ORANGE : '#3a3a3a'}>?</Big>
        </div>
      </Pop>
    </Scene>
  );
};

// ---------- 5. Proust : 3 % de Swann en 2023, presque quatre fois le livre depuis 2024 ----------

const SWANN = 265851;

const Proust: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const y2023 = at('proust', '2023');
  const pct = at('proust', '3');
  const swann = at('proust', 'Swann');
  const y2024 = at('proust', '2024');
  const million = at('proust', 'million');
  const quatre = at('proust', 'quatre');
  // Avant 2024, l'échelle est le livre (888 px) ; ensuite, l'échelle est la fenêtre d'un million de tokens.
  const zoom = ease(frame, y2024, million + 10, [0, 1], 'inOut');
  const gpt4 = at('proust', 'GPT-4');
  const scale = W / (SWANN + (1000000 - SWANN) * zoom);
  const book = SWANN * scale;
  const win = (8000 + (1000000 - 8000) * zoom) * scale;
  const books = ease(frame, million, quatre + 20, [1, 3.76]);
  return (
    <Scene
      gap={40}
      bottom={
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
          <Pop at={y2023} style={{display: 'flex', alignItems: 'baseline', gap: 14}}>
            <Mono size={56} color={frame < y2024 ? accent : LABEL}>8 000</Mono>
            <div style={{opacity: frame >= gpt4 ? 1 : 0}}><Mono size={48} color={LABEL}>GPT-4</Mono></div>
          </Pop>
          <Pop at={million}><Mono size={56} color={accent}>1 million</Mono></Pop>
        </div>
      }
    >
      <Pop at={swann} style={{display: 'flex', alignItems: 'baseline', gap: 18}}>
        <Say size={60}>Du côté de chez Swann</Say>
      </Pop>
      {/* Les livres, bout à bout : un seul avant 2024, puis autant qu'en contient la fenêtre. */}
      <div style={{position: 'relative', height: 130, opacity: frame >= y2023 ? 1 : 0}}>
        {Array.from({length: 4}, (_, k) => (
          <div key={k} style={{position: 'absolute', left: k * book, top: 0, width: Math.max(0, Math.min(1, books - k)) * book - 4, height: 130, background: '#e8e2d6', borderRight: '4px solid #000', opacity: k === 0 || frame >= million ? 1 : 0}} />
        ))}
        {/* La fenêtre : un cadre posé sur les livres. */}
        <div style={{position: 'absolute', left: -8, top: -14, width: win + 16, height: 158, border: `8px solid ${accent}`, boxShadow: `0 0 26px ${withAlpha(accent, 0.6)}`, opacity: frame >= pct ? 1 : 0}} />
      </div>
      <Pop at={pct} style={{display: 'flex', alignItems: 'baseline', gap: 18, opacity: gone(frame, y2024)}}>
        <Mono size={84} color={accent}>3 %</Mono>
        <Mono size={48} color={LABEL}>du livre</Mono>
      </Pop>
    </Scene>
  );
};

// ---------- 6. La limite : 18 modèles, tous moins fiables quand le texte s'allonge ----------

const Limite: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const n18 = at('limite', '18');
  const tous = at('limite', 'tous');
  const texte = at('limite', 'texte');
  const p = ease(frame, tous, texte + 20, [0, 1], 'inOut');
  const GW = W;
  const GH = 440;
  // 18 courbes schématiques : chacune part haut, et toutes descendent quand la longueur augmente.
  const curves = Array.from({length: 18}, (_, k) => {
    const y0 = 40 + 50 * rnd(k);
    const drop = 180 + 170 * rnd(k + 30);
    const pts = Array.from({length: 9}, (_, i) => {
      const x = (i / 8) * GW;
      const y = y0 + drop * Math.pow(i / 8, 1.3) + 14 * Math.sin(i * 1.7 + k);
      return `${i ? 'L' : 'M'}${x.toFixed(0)} ${y.toFixed(0)}`;
    });
    return pts.join(' ');
  });
  return (
    <Scene
      gap={24}
      bottom={
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <Pop at={n18}><Mono size={48} color={accent}>18 modèles</Mono></Pop>
          <Pop at={texte}><Mono size={48} color={LABEL}>texte plus long →</Mono></Pop>
        </div>
      }
    >
      <Pop at={4} style={{display: 'flex', alignItems: 'baseline', gap: 18}}>
        <Mono size={48} color={LABEL}>fiabilité</Mono>
      </Pop>
      <svg width={GW} height={GH} viewBox={`0 0 ${GW} ${GH}`} style={{overflow: 'visible'}}>
        <line x1="0" y1={GH} x2={GW} y2={GH} stroke="#666" strokeWidth="4" />
        <line x1="0" y1="0" x2="0" y2={GH} stroke="#666" strokeWidth="4" />
        {curves.map((d, k) => <Draw key={k} d={d} p={p} width={5} len={1400} color={k % 3 ? withAlpha(accent, 0.55) : accent} />)}
      </svg>
    </Scene>
  );
};

// ---------- 7. Chute : redonne la consigne, ou repars avec un résumé ----------

const Chute: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const redonne = at('chute', 'redonne');
  const neuve = at('chute', 'neuve');
  const resume = at('chute', 'résumé');
  return (
    <Scene gap={30}>
      {/* La consigne perdue, en pointillés, qui revient en couleur quand on la redonne. */}
      <Pop at={4} style={{alignSelf: 'flex-end', background: frame >= redonne ? withAlpha(accent, 0.25) : 'transparent', border: frame >= redonne ? `4px solid ${accent}` : '4px dashed #555', padding: '18px 28px'}}>
        <Say size={60} color={frame >= redonne ? '#fff' : '#666'}>Réponds en anglais</Say>
      </Pop>
      <Pop at={neuve} style={{border: '6px solid #fff', boxShadow: pixelShadow('#333'), padding: '24px 30px', display: 'flex', flexDirection: 'column', gap: 16}}>
        <Mono size={48} color={LABEL}>conversation neuve</Mono>
        <div style={{opacity: frame >= resume ? 1 : 0, background: '#2a2a2a', border: '3px solid #666', padding: '14px 20px', display: 'flex', flexDirection: 'column', gap: 10}}>
          <Mono size={48} color={accent}>résumé</Mono>
          <div style={{height: 14, width: '86%', background: '#5a5a5a'}} />
          <div style={{height: 14, width: '64%', background: '#5a5a5a'}} />
        </div>
      </Pop>
    </Scene>
  );
};

// ---------- Montage ----------

const SCENES: Record<string, React.FC> = {hook: Hook, intro: Intro, paquet: Paquet, nom: Nom, tableau: Tableau, proust: Proust, limite: Limite, chute: Chute};

export const FenetreVoix: React.FC = () => <V.Montage scenes={SCENES} accent={AC} />;

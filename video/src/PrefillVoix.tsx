// Short Prefill et decode (YouTube / TikTok / Instagram), épisode 38, définition, voix off PAL - FR, préparé le 2026-11-09
// (calage provisoire, sans voix). Fiche prefill-et-decode de lexique/terms.js ; sources dans voix/prefill-decode.script.json :
// NVIDIA, Mastering LLM Techniques: Inference Optimization (17 novembre 2023 : le prefill sature le calcul, le decode est
// limité par la mémoire) ; llama-bench de llama.cpp (Qwen2 7B Q4_K_M sur CUDA : 7 340 tokens/s en lecture, 120,6 en
// écriture) ; discussion #4167 de llama.cpp (M4 : 221 tokens/s en lecture, d'où le mail en 0,7 s et le PDF de 80 pages
// en 300 s). Image inventée : le serveur de brasserie qui prend la commande d'une table de douze en une minute, puis fait
// un aller-retour en cuisine par assiette. Fil : l'ép. 37 montrait un modèle qui écrit lentement faute de mémoire.
// Code couleur tenu de bout en bout : la lecture (prefill) en bleu, couleur de la catégorie Inférence ; l'écriture
// (decode) en orange (DEC). La brasserie (mur, porte de la cuisine, table, convives, serveur) est la même dans serveur
// et chute (Brasserie, Tablee, WT) ; la fenêtre de chat est la même dans hook, intro et chute (ChatWin).
// Écarts au storyboard :
// - base : les dix tokens reprennent les morceaux du storyboard (« Ré », « sume », « -moi »…), complétés à la main ;
//   ce découpage n'est pas vérifié avec tiktoken (absent de la machine le 2026-11-09). À recompter avant publication.
//   La boîte de la mémoire de travail porte « mémoire de travail » et non « KV cache » : la voix ne dit pas KV cache.
//   « deux temps » ouvre la scène avec deux pastilles 1 et 2 (rien n'est posé sinon avant « modèle ») ; sur « en même
//   temps », dix traits partent ensemble des tokens vers le modèle.
// - nom : « decode » s'écrit en orange (couleur de l'écriture), pas en bleu ; l'italique couleur d'accent reste à deux
//   emplois (hook, prefill).
// - serveur : pas de compteur « 1 / 12 » écrit (la voix ne le dit pas) ; les assiettes se posent une à une devant les
//   convives, et la porte de la cuisine porte le mot « cuisine », sur ce mot.
// - mesure : libellés « lecture » / « écriture » (la voix dit « lit » / « écrit ») et chiffres exacts de la source
//   (7 340 et 121) alors que la voix dit « sept mille » et « cent vingt », comme le demande le storyboard.
// - pourquoi : la boîte des poids est le bloc du modèle (même dessin que dans base, sans libellé « poids du modèle »,
//   que la voix ne dit pas) ; sa copie en pointillés descend et remonte. À chaque passage, un seul cœur de la puce
//   s'allume en orange : écrire n'occupe presque pas le calcul.
// - chute : le carnet du serveur est devenu une longue bande de commande qu'il relit, une ligne de lecture y descend.
// L'écran suit la voix et Le mouvement (univers.md) : chaque élément entre sur le mot qui le nomme (at), easing du kit,
// arcs pour ce qui vole, linéaire seulement pour les cases du decode (une par battement) et la lecture continue de la
// chute ; un seul punch zoom (7 340, à la fin de son count-up).
import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {BEAT, Big, Dots, Say, Draw, Mono, PAD, Pop, Scene, W, arc, clamp, countUp, ease, punch, useAccent, withAlpha} from './kit';
import {LABEL, makeVoix} from './voix/VoixShort';
import {Pixel, type Sprite} from './voix/Pixel';
import {Model, pixelShadow} from './voix/Parts';
import ALIGN from './voix/prefill-decode.align.json';
import SCRIPT from './voix/prefill-decode.script.json';

const AC = '#8FB8FF'; // catégorie Inférence : la lecture (prefill)
const DEC = '#FFB86B'; // l'écriture (decode)
const V = makeVoix(ALIGN, SCRIPT, 'voix/prediction-music.mp3');
const {at} = V;
export const PREFILLVOIX_DURATION = V.duration;

const gone = (frame: number, until: number) => ease(frame, until, until + 6, [1, 0], 'inOut');
// Entrée / sortie identiques à celles de Scene, pour un calque posé hors de la Scene (le hook).
const useSceneOpacity = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  return interpolate(frame, [0, 6], [0, 1], clamp) * (1 - interpolate(frame, [durationInFrames - 5, durationInFrames], [0, 1], clamp));
};

// ---------- Personnages (pixel art, même format que voix/Pixel.tsx) ----------

const SKIN = '#e3b58e';
const SKIN2 = '#b07a52';

// Le serveur de brasserie : cheveux plaqués, nœud papillon, gilet noir, long tablier blanc.
const SERVEUR: Sprite = {
  rows: [
    '....HHHH....',
    '...HHHHHH...',
    '...SSSSSS...',
    '...SESSES...',
    '...SSSSSS...',
    '...SMMMMS...',
    '....SSSS....',
    '..WWWNNWWW..',
    '.WVVVWWVVVW.',
    '.WVVVWWVVVW.',
    '.SVVVWWVVVS.',
    '.SAAAAAAAAS.',
    '..AAAAAAAA..',
    '..AAAAAAAA..',
  ],
  palette: {H: '#1e1e1e', S: SKIN, E: '#111', M: '#3a2a1a', W: '#f2f2f2', N: '#b53a3a', V: '#262626', A: '#ececec'},
};

const HAIRS = ['#4a4a4a', '#5a3a22', '#e8c45a', '#1e1e1e', '#c2602b', '#b9b9b9'];
const CLOTHES = ['#5b7fb5', '#4f8a5b', '#8e4a7a', '#e07b39', '#6a6a6a', '#b53a3a'];

// Un convive en buste, de face (rangée du fond) ou de dos (rangée de devant).
const convive = (k: number, back: boolean): Sprite => ({
  rows: back
    ? ['...HHHH...', '..HHHHHH..', '..HHHHHH..', '..HHHHHH..', '..HHHHHH..', '...HHHH...', '...SSSS...', '.CCCCCCCC.', 'CCCCCCCCCC']
    : ['...HHHH...', '..HHHHHH..', '..SSSSSS..', '..SESSES..', '..SSSSSS..', '..SSRRSS..', '...SSSS...', '.CCCCCCCC.', 'CCCCCCCCCC'],
  palette: {H: HAIRS[(k * 5) % 6], S: k % 3 === 1 ? SKIN2 : SKIN, E: '#111', R: '#b5524f', C: CLOTHES[(k * 7 + (back ? 3 : 0)) % 6]},
});

// ---------- Objets dessinés (SVG maison) ----------

// L'icône du PDF : une page au coin plié, bandeau rouge ; derrière, `sheets` feuilles en pile vers le haut et la gauche
// (pile qui s'épaissit), pour ne pas mordre sur le nom du fichier.
const PdfIcon: React.FC<{w: number; sheets?: number; t0?: number}> = ({w, sheets = 0, t0 = 0}) => (
  <div style={{position: 'relative', width: w, height: w * 1.26, lineHeight: 0}}>
    {/* stagger : les feuilles de la pile, l'une après l'autre, vers le haut et la gauche. */}
    {Array.from({length: sheets}, (_, k) => (
      <Pop key={k} at={t0 + 2 * k} style={{position: 'absolute', left: -7 * (sheets - k), top: -7 * (sheets - k), width: w, height: w * 1.26, background: k % 2 ? '#d8d2c4' : '#efe9dc', border: '3px solid #777', boxSizing: 'border-box'}}>
        {null}
      </Pop>
    ))}
    <svg width={w} height={w * 1.26} viewBox="0 0 100 126" style={{position: 'absolute', left: 0, top: 0}}>
      <path d="M4 4 H70 L96 30 V122 H4 Z" fill="#f4f1ea" stroke="#777" strokeWidth="4" />
      <path d="M70 4 V30 H96" fill="#d8d2c4" stroke="#777" strokeWidth="4" />
      <rect x="4" y="52" width="92" height="30" fill="#d0302f" />
      {[94, 104, 114].map((y) => <rect key={y} x="16" y={y} width="62" height="5" fill="#9a9384" />)}
    </svg>
  </div>
);

// La fenêtre de chat : barre de titre, la bulle de l'utilisateur avec sa pièce jointe, puis la zone de réponse.
const ChatWin: React.FC<{w: number; h: number; sheets?: number; t0?: number; children?: React.ReactNode}> = ({w, h, sheets = 0, t0 = 0, children}) => (
  <div style={{width: w, height: h, background: '#121212', border: '5px solid #4a4a4a', borderRadius: 30, boxSizing: 'border-box', padding: '22px 30px', display: 'flex', flexDirection: 'column', gap: 26}}>
    <div style={{display: 'flex', gap: 12}}>
      {[0, 1, 2].map((k) => <div key={k} style={{width: 20, height: 20, borderRadius: 10, background: '#4a4a4a'}} />)}
    </div>
    <div style={{alignSelf: 'flex-end', background: '#2a2a2a', borderRadius: 30, padding: '22px 30px', display: 'flex', alignItems: 'center', gap: 22}}>
      <PdfIcon w={64} sheets={sheets} t0={t0} />
      <Mono size={52} color="#fff">rapport.pdf</Mono>
    </div>
    {children}
  </div>
);

// Le chronomètre : cadran, bouton, aiguille (angle en tours).
const Chrono: React.FC<{w: number; turns: number; color?: string}> = ({w, turns, color = '#fff'}) => {
  const a = turns * 2 * Math.PI;
  return (
    <svg width={w} height={w * 1.15} viewBox="0 0 100 115">
      <rect x="42" y="2" width="16" height="12" fill="#cfcfcf" />
      <circle cx="50" cy="65" r="44" fill="#111" stroke="#cfcfcf" strokeWidth="7" />
      {[0, 1, 2, 3].map((k) => <rect key={k} x="48" y="27" width="4" height="9" fill="#777" transform={`rotate(${k * 90} 50 65)`} />)}
      <path d={`M50 65 L${50 + 34 * Math.sin(a)} ${65 - 34 * Math.cos(a)}`} stroke={color} strokeWidth="7" strokeLinecap="round" />
      <circle cx="50" cy="65" r="6" fill={color} />
    </svg>
  );
};

// Une jauge en demi-cercle ; v de 0 (à gauche) à 1 (à droite).
const Jauge: React.FC<{w: number; v: number}> = ({w, v}) => {
  const t = Math.PI * (1 - v);
  return (
    <svg width={w} height={w * 0.6} viewBox="0 0 100 60">
      <path d="M8 54 A42 42 0 0 1 92 54" fill="none" stroke="#5a5a5a" strokeWidth="9" />
      <path d="M50 54 L50 54" />
      <path d={`M50 54 L${50 + 36 * Math.cos(t)} ${54 - 36 * Math.sin(t)}`} stroke="#fff" strokeWidth="6" strokeLinecap="round" />
      <circle cx="50" cy="54" r="6" fill="#fff" />
    </svg>
  );
};

// La carte graphique : la carte, deux ventilateurs (qui tournent), le connecteur doré.
const Gpu: React.FC<{w: number}> = ({w}) => {
  const frame = useCurrentFrame();
  return (
    <svg width={w} height={w * 0.36} viewBox="0 0 300 108">
      <rect x="4" y="4" width="292" height="84" rx="8" fill="#2b2b2b" stroke="#8a8a8a" strokeWidth="5" />
      {[80, 210].map((cx) => (
        <g key={cx} transform={`rotate(${frame * 9} ${cx} 46)`}>
          <circle cx={cx} cy="46" r="34" fill="#151515" stroke="#5a5a5a" strokeWidth="4" />
          {[0, 1, 2, 3, 4].map((k) => <path key={k} d={`M${cx} 46 Q ${cx + 10} 26 ${cx} 16`} stroke="#6a6a6a" strokeWidth="7" fill="none" transform={`rotate(${k * 72} ${cx} 46)`} />)}
        </g>
      ))}
      <rect x="40" y="88" width="190" height="16" fill="#c9a23a" />
    </svg>
  );
};

// La puce : 16 cœurs ; `lit` les allume tous (bleu), `one` allume un seul cœur en orange.
const Puce: React.FC<{w: number; lit: number; one?: number}> = ({w, lit, one = 0}) => {
  const accent = useAccent();
  return (
    <svg width={w} height={w} viewBox="0 0 120 120">
      {Array.from({length: 6}, (_, k) => (
        <g key={k}>
          <rect x={18 + k * 16} y="0" width="6" height="12" fill="#9a9a9a" />
          <rect x={18 + k * 16} y="108" width="6" height="12" fill="#9a9a9a" />
          <rect x="0" y={18 + k * 16} width="12" height="6" fill="#9a9a9a" />
          <rect x="108" y={18 + k * 16} width="12" height="6" fill="#9a9a9a" />
        </g>
      ))}
      <rect x="12" y="12" width="96" height="96" fill="#1d1d1d" stroke="#9a9a9a" strokeWidth="4" />
      {Array.from({length: 13}, (_, k) => {
        const x = 22 + (k % 4) * 20;
        const y = 22 + Math.floor(k / 4) * 20;
        const fill = k === 5 && one > 0 ? withAlpha(DEC, 0.25 + 0.75 * one) : lit > 0 ? withAlpha(accent, 0.2 + 0.8 * lit) : '#3a3a3a';
        return <rect key={k} x={x} y={y} width="16" height="16" fill={fill} />;
      })}
    </svg>
  );
};

// Le portable (façon Mac, sans logo) : écran, charnière, base ; `children` s'affiche sur l'écran.
const Portable: React.FC<{w: number; children?: React.ReactNode}> = ({w, children}) => {
  const sh = w * 0.62;
  return (
    <div style={{position: 'relative', width: w, height: sh + 34}}>
      <div style={{position: 'absolute', left: 0, top: 0, width: w, height: sh, background: '#cfd2d6', borderRadius: 18, padding: 16, boxSizing: 'border-box'}}>
        <div style={{position: 'relative', width: '100%', height: '100%', background: '#0e1520', borderRadius: 6, overflow: 'hidden'}}>{children}</div>
      </div>
      <div style={{position: 'absolute', left: -36, top: sh, width: w + 72, height: 22, background: '#b9bdc2', borderRadius: '0 0 16px 16px'}} />
      <div style={{position: 'absolute', left: w / 2 - 60, top: sh, width: 120, height: 8, background: '#8f9398'}} />
    </div>
  );
};

const Enveloppe: React.FC<{w: number}> = ({w}) => (
  <svg width={w} height={w * 0.66} viewBox="0 0 100 66">
    <rect x="3" y="3" width="94" height="60" fill="#f4f1ea" stroke="#777" strokeWidth="4" />
    <path d="M3 3 L50 38 L97 3" fill="none" stroke="#777" strokeWidth="4" />
  </svg>
);

// ---------- 0. Hook : la fenêtre de chat et sa pièce jointe, puis le titre ----------

const Hook: React.FC = () => {
  const accent = useAccent();
  const op = useSceneOpacity();
  const prefill = at('hook', 'prefill');
  const decode = at('hook', 'decode');
  return (
    <>
      {/* La fenêtre de chat au-dessus du titre (aucun sous-titre dans le hook), posée dès la première image. */}
      <div style={{position: 'absolute', left: PAD, top: 150, opacity: op}}>
        <ChatWin w={W} h={420}>
          <div style={{width: 420, height: 60, border: '4px solid #333', borderRadius: 26}} />
        </ChatWin>
      </div>
      <Scene>
        <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
          <Pop at={0}><Say size={100}>C'est quoi ?</Say></Pop>
          {/* pop in : chaque moitié du terme sur le mot qui la dit. */}
          <Pop at={prefill}><Big size={124} color={accent}>le prefill</Big></Pop>
          <Pop at={decode}><Big size={124} color={DEC}>et le decode</Big></Pop>
        </div>
      </Scene>
    </>
  );
};

// ---------- 1. Intro : le long PDF, l'écran vide et le chrono, puis la réponse qui défile ; deux vitesses ----------

const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const long = at('intro', 'long');
  const vide = at('intro', 'vide');
  const defile = at('intro', 'défile');
  const deux = at('intro', 'deux');
  // Le chrono tourne pendant l'écran vide (lentement, en douceur) et s'arrête quand la réponse défile.
  const turns = frame < vide ? 0 : ease(frame, vide, defile, [0, 0.85], 'inOut');
  const dim = ease(frame, deux, deux + 8, [1, 0.4], 'inOut');
  return (
    <Scene
      gap={0}
      bottom={
        // pop in : deux jauges côte à côte, l'une lente, l'autre rapide, sur « deux vitesses ».
        <div style={{display: 'flex', justifyContent: 'center', gap: 120}}>
          {[0.18, 0.92].map((v, k) => (
            <Pop key={k} at={deux + 4 * k} style={{lineHeight: 0}}>
              <Jauge w={230} v={v * ease(frame, deux + 4 * k + 4, deux + 4 * k + 22)} />
            </Pop>
          ))}
        </div>
      }
    >
      <div style={{position: 'relative', height: 640, opacity: dim}}>
        <Pop at={0}>
          <ChatWin w={W} h={640} sheets={10} t0={long}>
            <div style={{display: 'flex', alignItems: 'flex-start', gap: 40}}>
              {/* La zone de réponse : vide avec trois points, puis les lignes qui défilent d'un coup (typewriter). */}
              <div style={{width: 560, height: 250, border: '4px solid #444', borderRadius: 30, padding: '34px 30px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 26, justifyContent: frame < defile ? 'center' : 'flex-start', opacity: frame >= vide ? 1 : 0}}>
                {frame < defile ? <Dots /> : [92, 78, 88, 64].map((x, k) => (
                  <div key={k} style={{height: 20, width: `${x * ease(frame, defile + 3 * k, defile + 3 * k + 6)}%`, background: '#cfcfcf'}} />
                ))}
              </div>
              {/* pop in : le chronomètre, sur « vide ». */}
              <Pop at={vide} style={{lineHeight: 0}}>
                <Chrono w={170} turns={turns} />
              </Pop>
            </div>
          </ChatWin>
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 2. La lecture : dix tokens qui s'allument d'un bloc, puis la mémoire de travail ----------

// Le message découpé en tokens (morceaux du storyboard, découpage à vérifier avec tiktoken).
const MSG = [['Ré', 'sume', '-moi', 'ce', 'rapport'], ['en', 'trois', 'points', ',', 'merci']];
const TOK_H = 74;
const TOK_TOP = 100;
const MODEL = {x: 0, y: 360, w: 250};
const KV = {x: 330, y: 360, w: W - 330, h: 180};

const Tok: React.FC<{t: string; lit: number; color?: string}> = ({t, lit, color}) => {
  const accent = useAccent();
  const c = color ?? accent;
  return (
    <div style={{height: TOK_H, boxSizing: 'border-box', border: `4px solid ${lit > 0 ? c : '#777'}`, background: lit > 0 ? withAlpha(c, 0.15 + 0.6 * lit) : '#1c1c1c', padding: '0 14px', display: 'flex', alignItems: 'center'}}>
      <Mono size={48} color="#fff">{t}</Mono>
    </div>
  );
};

const Base: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const deux = at('base', 'deux');
  const dabord = at('base', "D'abord");
  const modele = at('base', 'modèle');
  const message = at('base', 'message');
  const bloc = at('base', 'bloc');
  const meme = at('base', 'même');
  const range = at('base', 'range');
  const memoire = at('base', 'mémoire');
  // Le flash : les dix cases ensemble sur « bloc » (pas en cascade), puis elles restent allumées, plus calmes.
  const flash = frame < bloc ? 0 : interpolate(frame, [bloc, bloc + 3, bloc + 14], [0, 1, 0.45], clamp);
  // Centres approximatifs des tokens (Mono 48 : environ 29 px par lettre), pour les traits vers le modèle.
  const centers = MSG.flatMap((row, r) => {
    const ws = row.map((t) => 36 + 29 * t.length);
    const gap = (W - ws.reduce((a, b) => a + b, 0)) / (row.length - 1);
    return ws.map((w, k) => [ws.slice(0, k).reduce((a, b) => a + b + gap, 0) + w / 2, TOK_TOP + r * (TOK_H + 12) + TOK_H] as [number, number]);
  });
  const links = ease(frame, meme, meme + 12);
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 640}}>
        {/* Les deux temps : deux pastilles reliées, sur « deux temps » ; la première s'allume sur « D'abord ». */}
        <div style={{position: 'absolute', left: 0, top: 0, display: 'flex', alignItems: 'center', gap: 0, opacity: gone(frame, message)}}>
          {[0, 1].map((k) => (
            <React.Fragment key={k}>
              {k === 1 ? <Pop at={deux + 3} style={{width: 140, height: 6, background: '#555'}}>{null}</Pop> : null}
              <Pop at={deux + 5 * k} style={{width: 84, height: 84, borderRadius: 42, border: `5px solid ${k === 0 && frame >= dabord ? accent : '#777'}`, background: k === 0 && frame >= dabord ? withAlpha(accent, 0.3) : '#1c1c1c', display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box'}}>
                <Mono size={52} color="#fff">{String(k + 1)}</Mono>
              </Pop>
            </React.Fragment>
          ))}
        </div>
        {/* stagger : les tokens du message, en ordre de lecture, sur « message » ; flash d'un bloc sur « bloc ». */}
        {MSG.map((row, r) => (
          <div key={r} style={{position: 'absolute', left: 0, top: TOK_TOP + r * (TOK_H + 12), width: W, display: 'flex', justifyContent: 'space-between'}}>
            {row.map((t, k) => (
              <Pop key={k} at={message + 2 * (r * 5 + k)}>
                <Tok t={t} lit={flash} />
              </Pop>
            ))}
          </div>
        ))}
        {/* draw-on : dix traits partent ensemble vers le modèle, sur « en même temps » ; ils partent sur « range ». */}
        <svg width={W} height={640} viewBox={`0 0 ${W} 640`} style={{position: 'absolute', left: 0, top: 0, opacity: frame >= meme ? gone(frame, range) : 0}}>
          {centers.map(([x, y], k) => (
            <Draw key={k} d={`M${x} ${y + 4} L${MODEL.x + MODEL.w / 2} ${MODEL.y - 6}`} p={links} width={5} len={900} color={withAlpha(accent, 0.8)} />
          ))}
        </svg>
        {/* pop in : le modèle, sur « modèle ». */}
        <Pop at={modele} style={{position: 'absolute', left: MODEL.x, top: MODEL.y}}>
          <Model w={MODEL.w} />
        </Pop>
        {/* pop in : la mémoire de travail sur « mémoire », ses dix cases en cascade, le libellé 5 images après. */}
        <Pop at={memoire} style={{position: 'absolute', left: KV.x, top: KV.y, width: KV.w, height: KV.h, border: `5px solid ${accent}`, boxSizing: 'border-box', padding: 20, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14}}>
          {Array.from({length: 10}, (_, k) => (
            <div key={k} style={{background: withAlpha(accent, 0.75), opacity: frame >= memoire + 4 + 2 * k ? 1 : 0, transform: `scale(${ease(frame, memoire + 4 + 2 * k, memoire + 10 + 2 * k, [0.4, 1])})`}} />
          ))}
        </Pop>
        <Pop at={memoire + 5} style={{position: 'absolute', left: KV.x, top: KV.y + KV.h + 16}}>
          <Mono size={48} color={LABEL}>mémoire de travail</Mono>
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 3. Le nom : prefill à gauche, la rangée allumée d'un bloc ; decode à droite, une case par battement ----------

const COL = (W - 40) / 2; // 424
const CELL = 72;
const CELL_GAP = (COL - 5 * CELL) / 4;

const Cells: React.FC<{n: number; color: string; lit: (k: number) => number}> = ({n, color, lit}) => (
  <div style={{display: 'grid', gridTemplateColumns: `repeat(5, ${CELL}px)`, gap: CELL_GAP}}>
    {Array.from({length: n}, (_, k) => {
      const l = lit(k);
      return <div key={k} style={{width: CELL, height: CELL, boxSizing: 'border-box', border: `4px solid ${l > 0 ? color : '#555'}`, background: l > 0 ? withAlpha(color, 0.25 + 0.6 * l) : '#161616', transform: `scale(${l > 0 ? ease(l, 0, 1, [0.6, 1]) : 1})`}} />;
    })}
  </div>
);

const Nom: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const lecture = at('nom', 'lecture');
  const prefill = at('nom', 'prefill');
  const ensuite = at('nom', 'Ensuite');
  const ecrit = at('nom', 'écrit');
  const decode = at('nom', 'decode');
  // Gauche : les dix cases s'allument ensemble sur « lecture ». Droite : une case de plus à chaque battement dès « écrit ».
  const block = frame >= lecture ? ease(frame, lecture, lecture + 6) : 0;
  const left = ease(frame, ensuite, ensuite + 8, [1, 0.4], 'inOut');
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 640}}>
        <div style={{position: 'absolute', left: 0, top: 0, width: COL, height: 640, opacity: left}}>
          {/* pop in : le terme écrit en grand, sur « prefill » (sous-titre masqué par onscreen, si le script le permet). */}
          <Pop at={prefill} style={{position: 'absolute', left: 0, top: 60}}>
            <Big size={124} color={accent}>prefill</Big>
          </Pop>
          <Pop at={0} style={{position: 'absolute', left: 0, top: 280}}>
            <Cells n={10} color={accent} lit={() => block} />
          </Pop>
        </div>
        <div style={{position: 'absolute', left: COL + 40, top: 0, width: COL, height: 640}}>
          <Pop at={decode} style={{position: 'absolute', left: 0, top: 60}}>
            <Big size={124} color={DEC}>decode</Big>
          </Pop>
          {/* Les cases vides apparaissent sur « Ensuite » ; chacune s'allume sur son battement (compte linéaire). */}
          <Pop at={ensuite} style={{position: 'absolute', left: 0, top: 280}}>
            <Cells n={10} color={DEC} lit={(k) => (frame >= ecrit + k * BEAT ? ease(frame, ecrit + k * BEAT, ecrit + k * BEAT + 5) : 0)} />
          </Pop>
        </div>
      </div>
    </Scene>
  );
};

// ---------- 4. L'image : la brasserie, la table de douze, le serveur et ses allers-retours en cuisine ----------

const DOOR = {x: 790, y: 80, w: 150, h: 250};
const TBL = {x: -30, y: 300, w: 650, h: 130};
const SEAT = (k: number) => TBL.x + 22 + (k % 6) * 105; // k de 0 à 11 : 0-5 au fond, 6-11 devant
const WT = {x: 650, y: 286}; // le serveur, debout au bout de la table
const AT_DOOR: [number, number] = [DOOR.x + 15, DOOR.y + 100];
const CONV_PX = 9;

// Le décor : mur lambrissé, sol carrelé, porte de la cuisine à hublot.
const Brasserie: React.FC<{cuisine?: number}> = ({cuisine}) => (
  <>
    <div style={{position: 'absolute', left: -PAD, top: 0, width: 1080, height: 330, background: '#4a3426'}}>
      <div style={{position: 'absolute', left: 0, right: 0, top: 200, height: 130, background: '#3a281c', borderTop: '8px solid #6a4a32'}} />
    </div>
    <div style={{position: 'absolute', left: -PAD, top: 330, width: 1080, height: 310, background: '#26221f', backgroundImage: 'linear-gradient(90deg, #322c27 4px, transparent 4px), linear-gradient(#322c27 4px, transparent 4px)', backgroundSize: '90px 60px'}} />
    <div style={{position: 'absolute', left: DOOR.x, top: DOOR.y, width: DOOR.w, height: DOOR.h, background: '#7a5532', border: '8px solid #5a3a22', boxSizing: 'border-box'}}>
      <div style={{position: 'absolute', left: DOOR.w / 2 - 38, top: 36, width: 60, height: 60, borderRadius: '50%', background: '#e8d9a8', border: '7px solid #cfcfcf'}} />
    </div>
    {cuisine !== undefined ? (
      <Pop at={cuisine} style={{position: 'absolute', left: W - 225, top: DOOR.y - 78}}>
        <Mono size={52} color="#fff">cuisine</Mono>
      </Pop>
    ) : null}
  </>
);

// La table de douze : six convives de face au fond, six de dos devant ; `plates` = assiettes servies (de 0 à 12).
const Tablee: React.FC<{plates?: (k: number) => boolean; children?: React.ReactNode}> = ({plates = () => false, children}) => (
  <>
    {Array.from({length: 6}, (_, k) => (
      <div key={k} style={{position: 'absolute', left: SEAT(k), top: TBL.y - 62, lineHeight: 0}}>
        <Pixel sprite={convive(k, false)} px={CONV_PX} seed={k * 3} />
      </div>
    ))}
    <div style={{position: 'absolute', left: TBL.x, top: TBL.y, width: TBL.w, height: TBL.h, background: '#7a4a2a', borderBottom: '14px solid #5a341c', boxSizing: 'border-box'}} />
    {Array.from({length: 12}, (_, k) => (
      <div key={k} style={{position: 'absolute', left: SEAT(k) + 12, top: TBL.y + (k < 6 ? 16 : 70), width: 66, height: 28, borderRadius: '50%', background: '#f4f4f0', border: '4px solid #bdbdb6', opacity: plates(k) ? 1 : 0}} />
    ))}
    {children}
    {Array.from({length: 6}, (_, k) => (
      <div key={k} style={{position: 'absolute', left: SEAT(k), top: TBL.y + 106, lineHeight: 0}}>
        <Pixel sprite={convive(k + 6, true)} px={CONV_PX} />
      </div>
    ))}
  </>
);

// Une petite bulle de convive : deux traits.
const Parle: React.FC = () => (
  <div style={{position: 'relative', width: 80, height: 50, background: '#fff', border: '4px solid #111', borderRadius: 18, boxSizing: 'border-box', padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 6}}>
    <div style={{height: 7, width: '90%', background: '#777'}} />
    <div style={{height: 7, width: '60%', background: '#777'}} />
  </div>
);

// Le carnet du serveur : `p` de 0 à 1, les lignes s'écrivent.
const Carnet: React.FC<{p: number}> = ({p}) => (
  <div style={{width: 74, height: 96, background: '#f4f1ea', border: '4px solid #777', boxSizing: 'border-box', padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: 9}}>
    {[0, 1, 2, 3, 4, 5].map((k) => <div key={k} style={{height: 5, width: `${[90, 70, 84, 60, 80, 66][k] * interpolate(p * 6 - k, [0, 1], [0, 1], clamp)}%`, background: '#3a3a3a'}} />)}
  </div>
);

const Serveur: React.FC = () => {
  const frame = useCurrentFrame();
  const serveur = at('serveur', 'serveur');
  const commande = at('serveur', 'commande');
  const minute = at('serveur', 'minute');
  const aller = at('serveur', 'aller');
  const cuisine = at('serveur', 'cuisine');
  const chaque = at('serveur', 'chaque');
  // Un aller-retour : anticipation (petit recul), arc vers la porte, demi-tour, arc du retour avec une assiette.
  const trips = [aller, chaque];
  const trip = (t0: number) => {
    if (frame < t0) return {pos: [WT.x - 10 * ease(frame, t0 - 5, t0), WT.y] as [number, number], plate: false};
    if (frame < t0 + 12) return {pos: arc(ease(frame, t0, t0 + 12, [0, 1], 'inOut'), [WT.x - 10, WT.y], AT_DOOR, 40), plate: false};
    if (frame < t0 + 26) return {pos: arc(ease(frame, t0 + 12, t0 + 26, [0, 1], 'inOut'), AT_DOOR, [WT.x, WT.y], 40), plate: true};
    return null;
  };
  const cur = trips.map(trip).find((t, k) => t && (k === trips.length - 1 || frame < trips[k + 1] - 5)) ?? {pos: [WT.x, WT.y] as [number, number], plate: false};
  const served = trips.filter((t0) => frame >= t0 + 26).length;
  const atDoor = trips.some((t0) => frame >= t0 + 8 && frame < t0 + 16);
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 640}}>
        <Brasserie cuisine={cuisine} />
        <Tablee plates={(k) => k < served} />
        {/* pop in : douze bulles ensemble sur « commande » : tout le monde parle en même temps ; elles partent sur « minute ». */}
        {Array.from({length: 12}, (_, k) => (
          <Pop key={k} at={commande} style={{position: 'absolute', left: SEAT(k) + 34, top: k < 6 ? TBL.y - 132 : TBL.y + 52, opacity: gone(frame, minute + 4)}}>
            <Parle />
          </Pop>
        ))}
        {/* Le serveur entre sur « serveur » ; son carnet se remplit de « commande » à « minute ». */}
        <div style={{position: 'absolute', left: cur.pos[0], top: cur.pos[1], lineHeight: 0, opacity: (frame >= serveur ? 1 : 0) * (atDoor ? 0.35 : 1)}}>
          <Pop at={serveur}>
            <div style={{position: 'relative'}}>
              <Pixel sprite={SERVEUR} px={10} seed={4} />
              <div style={{position: 'absolute', left: 92, top: 74}}>
                {cur.plate ? (
                  <div style={{width: 66, height: 28, borderRadius: '50%', background: '#f4f4f0', border: '4px solid #bdbdb6', marginTop: 20}} />
                ) : (
                  <Carnet p={ease(frame, commande, minute + 6)} />
                )}
              </div>
            </div>
          </Pop>
        </div>
      </div>
    </Scene>
  );
};

// ---------- 5. La mesure : lecture contre écriture, à la même échelle (bar grow, count-up) ----------

const LECT = 7340;
const ECRI = 121;

const Mesure: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const carte = at('mesure', 'carte');
  const modele = at('mesure', 'modèle');
  const lit = at('mesure', 'lit');
  const sept = at('mesure', 'sept');
  const ecrit = at('mesure', 'écrit');
  const cent = at('mesure', 'cent');
  const BAR = W;
  const g1 = ease(frame, sept, sept + 36);
  const g2 = ease(frame, cent, cent + 20);
  const pz = punch(frame, sept + 36); // punch zoom, le seul du short : 7 340 à l'arrivée de son count-up
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 640}}>
        {/* pop in : la carte graphique, sur « carte » ; le petit modèle posé dessus, sur « modèle ». */}
        <Pop at={carte} style={{position: 'absolute', left: 0, top: 0, lineHeight: 0}}>
          <Gpu w={520} />
        </Pop>
        <Pop at={modele} style={{position: 'absolute', left: 600, top: 20}}>
          <Model w={200} />
        </Pop>
        {/* Les deux pistes, à la même échelle : le décor, posé dès l'entrée. */}
        {[0, 1].map((k) => (
          <Pop key={k} at={2 + 3 * k} style={{position: 'absolute', left: 0, top: 265 + 235 * k, width: BAR, height: 56, background: '#1f1f1f'}}>
            {null}
          </Pop>
        ))}
        {/* bar grow : la lecture pousse jusqu'au bord sur « sept mille », count-up de 0 à 7 340. */}
        <Pop at={lit} style={{position: 'absolute', left: 0, top: 200}}>
          <Mono size={48} color={LABEL}>lecture</Mono>
        </Pop>
        <div style={{position: 'absolute', left: 0, top: 265, width: BAR * g1, height: 56, background: accent, opacity: frame >= sept ? 1 : 0}} />
        <div style={{position: 'absolute', left: 0, top: 330, opacity: frame >= sept ? 1 : 0, transform: `scale(${pz})`, transformOrigin: '0% 50%'}}>
          <Mono size={64} color={accent}>{`${countUp(frame, sept, LECT)} tokens/s`}</Mono>
        </div>
        {/* bar grow : l'écriture, un trait minuscule à la même échelle, sur « cent vingt ». */}
        <Pop at={ecrit} style={{position: 'absolute', left: 0, top: 435}}>
          <Mono size={48} color={LABEL}>écriture</Mono>
        </Pop>
        <div style={{position: 'absolute', left: 0, top: 500, width: Math.max(4, ((BAR * ECRI) / LECT) * g2), height: 56, background: DEC, opacity: frame >= cent ? 1 : 0}} />
        <div style={{position: 'absolute', left: 0, top: 565, opacity: frame >= cent ? 1 : 0}}>
          <Mono size={64} color={DEC}>{`${countUp(frame, cent, ECRI, 20)} tokens/s`}</Mono>
        </div>
      </div>
    </Scene>
  );
};

// ---------- 6. Pourquoi : la puce calcule tout d'un coup, puis relit tout le modèle à chaque token ----------

const PM = {x: (W - 300) / 2, y: 0, w: 300}; // le modèle (hauteur 186)
const PC = {x: (W - 260) / 2, y: 340, w: 260}; // la puce
const DROP = PC.y - 186 - 14; // descente de la copie en pointillés jusqu'au haut de la puce

const Pourquoi: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const calcule = at('pourquoi', 'calcule');
  const ecrire = at('pourquoi', 'écrire');
  const relire = at('pourquoi', 'relire');
  // Lecture : tous les cœurs d'un flash sur « calcule », éteints sur « écrire ».
  const lit = frame < calcule ? 0 : interpolate(frame, [calcule, calcule + 3, calcule + 16], [0, 1, 0.6], clamp) * (1 - ease(frame, ecrire, ecrire + 8));
  // Écriture : trois passages de la copie en pointillés (descente, remontée), un token orange sort à chaque arrivée.
  const passes = [0, 1, 2].map((k) => relire + 24 * k);
  const drop = passes.reduce((y, t0) => (frame >= t0 && frame < t0 + 24 ? (frame < t0 + 11 ? ease(frame, t0, t0 + 11, [0, DROP], 'inOut') : ease(frame, t0 + 12, t0 + 23, [DROP, 0], 'inOut')) : y), 0);
  const ghost = frame >= relire && frame < passes[2] + 24;
  const one = Math.max(0, ...passes.map((t0) => (frame >= t0 + 10 ? interpolate(frame, [t0 + 10, t0 + 12, t0 + 22], [0, 1, 0], clamp) : 0)));
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 640}}>
        {/* Le décor posé dès l'entrée : le modèle en haut, la puce au centre. */}
        <Pop at={0} style={{position: 'absolute', left: PM.x, top: PM.y}}>
          <Model w={PM.w} />
        </Pop>
        {/* La copie du modèle en pointillés, qui descend jusqu'à la puce et remonte, sur « relire ». */}
        <div style={{position: 'absolute', left: PM.x, top: PM.y + drop, width: PM.w, height: 186, border: `6px dashed ${DEC}`, boxSizing: 'border-box', background: withAlpha(DEC, 0.12), opacity: ghost ? 1 : 0}} />
        <Pop at={2} style={{position: 'absolute', left: PC.x, top: PC.y, lineHeight: 0}}>
          <Puce w={PC.w} lit={lit} one={one} />
        </Pop>
        {/* Un token orange sort de la puce en arc à chaque passage et se range à droite. */}
        {passes.map((t0, k) => {
          const p = ease(frame, t0 + 10, t0 + 20, [0, 1], 'inOut');
          const [x, y] = arc(p, [PC.x + PC.w / 2 - 32, PC.y + PC.w / 2 - 32], [PC.x + PC.w + 50 + 0 * k, PC.y + 20 + 80 * k], 60);
          return <div key={k} style={{position: 'absolute', left: x, top: y, width: 64, height: 64, background: DEC, border: '4px solid #fff', boxSizing: 'border-box', opacity: frame >= t0 + 10 ? 1 : 0, transform: `scale(${0.5 + 0.5 * p})`}} />;
        })}
        {/* Pendant la lecture, un halo bleu autour de la puce. */}
        <div style={{position: 'absolute', left: PC.x - 20, top: PC.y - 20, width: PC.w + 40, height: PC.w + 40, border: `6px solid ${withAlpha(accent, 0.6 * lit)}`, boxSizing: 'border-box'}} />
      </div>
    </Scene>
  );
};

// ---------- 7. Et donc : sur un Mac, le mail lu en moins d'une seconde, le PDF de 80 pages en plus de 4 minutes ----------

const Etdonc: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const mail = at('etdonc', 'mail');
  const moins = at('etdonc', 'moins');
  const pdf = at('etdonc', 'PDF');
  const pages = at('etdonc', 'pages');
  const plus = at('etdonc', 'plus');
  const minutes = at('etdonc', 'minutes');
  const reponse = at('etdonc', 'réponse');
  const secrit = at('etdonc', "s'écrit");
  // L'enveloppe vole en arc jusqu'à l'écran sur « mail » ; la pile de pages sur « PDF ».
  const e = ease(frame, mail, mail + 14, [0, 1], 'inOut');
  const [ex, ey] = arc(e, [-60, -40], [150, 110], 50);
  const pp = ease(frame, pdf, pdf + 14, [0, 1], 'inOut');
  const [px, py] = arc(pp, [-60, -60], [180, 60], 50);
  // Le chrono : un quart de tour pour le mail ; pour le PDF, il tourne longtemps (plus de quatre tours) jusqu'à « minutes ».
  const turns = frame < pdf ? (frame < mail ? 0 : ease(frame, mail, moins - 4, [0, 0.12])) : ease(frame, pdf + 4, minutes + 6, [0, 4.3], 'inOut');
  const chronoColor = frame >= pdf ? DEC : accent;
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 640}}>
        {/* Le décor posé dès l'entrée : le portable. */}
        <Pop at={0} style={{position: 'absolute', left: 30, top: 40}}>
          <Portable w={540}>
            {/* typewriter : cinq lignes de réponse s'écrivent d'un coup sur « s'écrit ». */}
            <div style={{position: 'absolute', left: 30, top: 34, right: 30, display: 'flex', flexDirection: 'column', gap: 26}}>
              {[90, 76, 84, 62, 72].map((x, k) => (
                <div key={k} style={{height: 18, width: `${x * ease(frame, secrit + 3 * k, secrit + 3 * k + 6)}%`, background: '#cfcfcf'}} />
              ))}
            </div>
          </Portable>
        </Pop>
        {/* L'enveloppe du mail ; elle part sur « PDF ». */}
        <div style={{position: 'absolute', left: 30 + ex, top: 40 + ey, lineHeight: 0, opacity: frame >= mail ? gone(frame, pdf) : 0}}>
          <Enveloppe w={200} />
        </div>
        {/* La pile de pages ; elle s'efface sur « réponse », pour laisser l'écran à la réponse. */}
        <div style={{position: 'absolute', left: 30 + px, top: 40 + py, opacity: frame >= pdf ? gone(frame, reponse) : 0}}>
          <PdfIcon w={110} sheets={12} t0={pdf + 2} />
        </div>
        {/* pop in : le chronomètre, sur « mail ». */}
        <Pop at={mail} style={{position: 'absolute', left: 660, top: 40, lineHeight: 0}}>
          <Chrono w={220} turns={turns} color={chronoColor} />
        </Pop>
        {/* Les libellés, en bas à droite : le premier part sur « PDF », le second entre sur « plus ». */}
        <Pop at={moins} style={{position: 'absolute', right: 0, top: 470, opacity: gone(frame, pdf)}}>
          <Mono size={60} color={accent}>moins d'1 s</Mono>
        </Pop>
        <Pop at={plus} style={{position: 'absolute', right: 0, top: 470}}>
          <Mono size={60} color={DEC}>plus de 4 min</Mono>
        </Pop>
        {/* Le libellé des pages, sur « pages » (la voix dit le nombre en toutes lettres). */}
        <Pop at={pages} style={{position: 'absolute', left: 0, top: 470, opacity: frame >= reponse ? 0.4 : 1}}>
          <Mono size={60} color="#fff">80 pages</Mono>
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 8. Chute : la brasserie, le serveur relit encore sa longue commande, le chat attend sur la table ----------

const Chute: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const accent = useAccent();
  const ia = at('chute', 'IA');
  // La lecture continue (défilement linéaire) : la ligne de lecture descend sans finir la bande.
  const read = interpolate(frame, [0, durationInFrames], [0.08, 0.7], clamp);
  const STRIP = {x: WT.x + 96, y: WT.y + 60, w: 130, h: 280};
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 640}}>
        <Brasserie />
        <Tablee>
          {/* pop in : la fenêtre de chat et ses trois points, posée sur la table, sur « IA ». */}
          <Pop at={ia} style={{position: 'absolute', left: 150, top: TBL.y + 6}}>
            <div style={{width: 300, height: 110, background: '#121212', border: '5px solid #4a4a4a', borderRadius: 24, boxSizing: 'border-box', display: 'flex', alignItems: 'center'}}>
              <Dots />
            </div>
          </Pop>
        </Tablee>
        {/* Le serveur relit sa longue commande : la bande déroulée, une ligne de lecture qui descend. */}
        <div style={{position: 'absolute', left: WT.x, top: WT.y, lineHeight: 0}}>
          <Pixel sprite={SERVEUR} px={10} seed={4} />
        </div>
        <div style={{position: 'absolute', left: STRIP.x, top: STRIP.y, width: STRIP.w, height: STRIP.h, background: '#f4f1ea', border: '4px solid #777', boxSizing: 'border-box', padding: '14px 12px', display: 'flex', flexDirection: 'column', gap: 12, boxShadow: pixelShadow('#1a1a1a')}}>
          {Array.from({length: 13}, (_, k) => <div key={k} style={{height: 6, flexShrink: 0, width: `${[90, 70, 84, 60, 80, 66, 88, 74][k % 8]}%`, background: k / 13 < read ? '#3a3a3a' : '#9a9384'}} />)}
          <div style={{position: 'absolute', left: -10, right: -10, top: 8 + (STRIP.h - 24) * read, height: 10, background: withAlpha(accent, 0.85)}} />
        </div>
      </div>
    </Scene>
  );
};

// ---------- Montage ----------

const SCENES: Record<string, React.FC> = {hook: Hook, intro: Intro, base: Base, nom: Nom, serveur: Serveur, mesure: Mesure, pourquoi: Pourquoi, etdonc: Etdonc, chute: Chute};

export const PrefillVoix: React.FC = () => <V.Montage scenes={SCENES} accent={AC} />;

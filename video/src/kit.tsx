// Briques communes des shorts du Lexique IA (règles vidéo v2, content/dico/univers.md).
import React, {createContext, useContext} from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {loadFont as loadSerif} from '@remotion/google-fonts/Newsreader';
import {loadFont as loadMono} from '@remotion/google-fonts/IBMPlexMono';

// Typo retenue par PA (content/dico/da/typo.html, carte A) : Newsreader pour les phrases et les mots géants,
// IBM Plex Mono pour les tokens, chiffres et termes de jargon.
export const {fontFamily: serif} = loadSerif('normal', {weights: ['400', '800'], subsets: ['latin', 'latin-ext']});
loadSerif('italic', {weights: ['400', '800'], subsets: ['latin', 'latin-ext']});
export const {fontFamily: mono} = loadMono('normal', {weights: ['400', '600'], subsets: ['latin', 'latin-ext']});

// Couleur d'accent par catégorie du lexique. Chaque short la choisit une fois (prop `accent` de <Short>) ;
// toutes les briques du kit la lisent dans le contexte, rien n'est recopié dans les shorts.
export const ACCENTS = {
  fondations: '#7CFFB2', // vert : Token, Paramètres, Hallucination, Fenêtre de contexte
  agents: '#D7A6FF', // violet : Harness, MCP
  ecosysteme: '#F08DC2', // rose : Benchmaxxing
} as const;
export const ACCENT = ACCENTS.fondations;

// '#RRGGBB' -> 'rgba(r,g,b,a)'.
export const withAlpha = (hex: string, a: number) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
};

const AccentContext = createContext<string>(ACCENT);
export const AccentProvider: React.FC<{accent: string; children: React.ReactNode}> = ({accent, children}) => (
  <AccentContext.Provider value={accent}>{children}</AccentContext.Provider>
);
export const useAccent = () => useContext(AccentContext);
export const RED = '#FF4D4D';
export const GREY = '#d6d6d6';
export const DIM = '#9a9a9a'; // libellés secondaires (plus clair que l'ancien #8a8a8a, lisible sur téléphone)
export const BEAT = 15; // 120 BPM à 30 i/s
export const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

// ---------- Briques d'animation ----------

export const usePop = (at: number) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return spring({frame: frame - at, fps, config: {damping: 14, stiffness: 240, mass: 0.55}});
};

// Le masquage (rien avant `at`) est toujours appliqué : une opacité passée en style se multiplie avec lui.
export const Pop: React.FC<{at: number; children: React.ReactNode; style?: React.CSSProperties}> = ({at, children, style}) => {
  const p = usePop(at);
  const frame = useCurrentFrame();
  const extra = style?.opacity === undefined ? 1 : Number(style.opacity);
  return (
    <div style={{...style, opacity: (frame >= at ? 1 : 0) * extra, transform: `scale(${0.7 + 0.3 * p}) translateY(${(1 - p) * 40}px)`}}>
      {children}
    </div>
  );
};

// Progression linéaire 0 -> 1 entre deux images.
export const useProg = (from: number, to: number) => interpolate(useCurrentFrame(), [from, to], [0, 1], clamp);

// ---------- Tailles et mise en page ----------

// Aucun texte sous 36 px sur un cadre de 1080 px : les briques de texte refusent de rendre en dessous.
export const MIN_PX = 36;
const floor = (px: number, who: string) => {
  if (px < MIN_PX) throw new Error(`${who} : ${px} px, sous le minimum de ${MIN_PX} px`);
  return px;
};

// Trois zones fixes, les mêmes dans toutes les scènes : la légende en haut, le schéma au centre,
// les chiffres et libellés en bas, au-dessus de la bande couverte par l'interface TikTok / Shorts.
export const PAD = 96;
export const W = 1080 - 2 * PAD; // 888
export const ZONE = {
  cap: {top: 170, h: 470},
  center: {top: 660, h: 640},
  bottom: {top: 1320, h: 200},
} as const;

// Taille unique des légendes et du mot géant de la carte titre.
export const CAP_SIZE = 60; // rendu 66 px
export const TITLE_WORD = 124;
export const TITLE_FRAMES = 45;

// Mot géant : Newsreader 800 italique, casse normale.
export const Big: React.FC<{children: React.ReactNode; size?: number; color?: string}> = ({children, size = 110, color = '#fff'}) => (
  <div style={{fontFamily: serif, fontWeight: 800, fontStyle: 'italic', fontSize: floor(size, 'Big'), lineHeight: 0.95, color, letterSpacing: '-0.01em'}}>{children}</div>
);

// La serif a un œil plus petit qu'Inter : les tailles des phrases sont agrandies d'autant.
const SERIF_SCALE = 1.1;

// Phrase à l'écran : casse normale, une vraie phrase (cf. univers.md, règles d'écriture).
export const Say: React.FC<{children: React.ReactNode; size?: number; color?: string}> = ({children, size = 72, color = '#fff'}) => (
  <div style={{fontFamily: serif, fontWeight: 400, fontSize: floor(size * SERIF_SCALE, 'Say'), lineHeight: 1.12, color, letterSpacing: '-0.01em'}}>{children}</div>
);

export const Mono: React.FC<{children: React.ReactNode; size?: number; color?: string}> = ({children, size = 40, color}) => {
  const accent = useAccent();
  return <div style={{fontFamily: mono, fontWeight: 600, fontSize: floor(size, 'Mono'), color: color ?? accent, whiteSpace: 'nowrap'}}>{children}</div>;
};

// Libellé mono pour les SVG : même plancher que <Mono>.
export const svgPx = (px: number) => floor(px, 'texte SVG');

// Mise en valeur : couleur d'accent et italique, en écho au mot géant. Au plus deux fois par short
// (à vérifier à l'œil ; le rythme est contrôlé par check-captions.mjs) ; dans une légende, on l'écrit *entre astérisques*.
export const Hi: React.FC<{children: React.ReactNode; color?: string}> = ({children, color}) => {
  const accent = useAccent();
  return <span style={{color: color ?? accent, fontStyle: 'italic'}}>{children}</span>;
};

// ---------- Légendes ----------

// Une légende est une chaîne simple : *mot* = mise en valeur. Rien d'autre (check-captions.mjs lit ces chaînes telles quelles).
export type Caps = [number, string][];

const renderCap = (t: string) => t.split('*').map((part, k) => (k % 2 ? <Hi key={k}>{part}</Hi> : <React.Fragment key={k}>{part}</React.Fragment>));

// La légende active de la scène, toujours à la même place : collée en haut de la zone de légende.
const CapLayer: React.FC<{caps: Caps}> = ({caps}) => {
  const frame = useCurrentFrame();
  const cur = [...caps].sort((a, b) => b[0] - a[0]).find(([at]) => frame >= at);
  if (!cur) return null;
  return (
    <Pop key={cur[0]} at={cur[0]}>
      <Say size={CAP_SIZE}>{renderCap(cur[1])}</Say>
    </Pop>
  );
};

export const LastContext = createContext(false);

// Scène : entrée et sortie sèches sur le temps, légère poussée de caméra, trois zones fixes.
// caps : les légendes ; children : le schéma (zone centrale) ; bottom : chiffres et libellés.
// La dernière scène (la chute) ne sort pas : son image finale reste pleine jusqu'à la fin.
export const Scene: React.FC<{caps?: Caps; children?: React.ReactNode; bottom?: React.ReactNode; gap?: number}> = ({caps = [], children, bottom, gap = 30}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const last = useContext(LastContext);
  const enter = interpolate(frame, [0, 6], [0, 1], clamp);
  const exit = last ? 0 : interpolate(frame, [durationInFrames - 5, durationInFrames], [0, 1], clamp);
  const push = 1 + 0.03 * (frame / durationInFrames);
  const zone = (z: {top: number; h: number}, extra: React.CSSProperties): React.CSSProperties => ({position: 'absolute', left: PAD, right: PAD, top: z.top, height: z.h, display: 'flex', flexDirection: 'column', ...extra});
  return (
    <AbsoluteFill style={{opacity: enter * (1 - exit), transform: `translateY(${(1 - enter) * 80 - exit * 80}px) scale(${push})`}}>
      <div style={zone(ZONE.cap, {justifyContent: 'flex-start'})}>
        <CapLayer caps={caps} />
      </div>
      <div style={zone(ZONE.center, {justifyContent: 'center', gap})}>{children}</div>
      <div style={zone(ZONE.bottom, {justifyContent: 'center'})}>{bottom}</div>
    </AbsoluteFill>
  );
};

// Carte titre commune : 45 images, même taille de mot géant partout, posée avant l'image 39 (poster à 1,3 s).
const TitleCard: React.FC<{lead: string; words: string[]}> = ({lead, words}) => {
  const accent = useAccent();
  return (
    <AbsoluteFill style={{padding: `0 ${PAD}px`, justifyContent: 'center', gap: 10}}>
      <Pop at={0}><Say size={100}>{lead}</Say></Pop>
      {words.map((w, k) => (
        <Pop key={k} at={5 + 4 * k}>
          <Big size={TITLE_WORD} color={accent}><span style={{whiteSpace: 'nowrap'}}>{w}</span></Big>
        </Pop>
      ))}
    </AbsoluteFill>
  );
};

// ---------- Icônes (SVG maison) ----------

// Trait SVG qui se dessine (progression 0 -> 1).
export const Draw: React.FC<{d: string; p: number; color?: string; width?: number; len?: number}> = ({d, p, color, width = 10, len = 400}) => {
  const accent = useAccent();
  return <path d={d} fill="none" stroke={color ?? accent} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={len} strokeDashoffset={len * (1 - p)} />;
};

export const Cross: React.FC<{p: number; size?: number}> = ({p, size = 150}) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <Draw d="M20 20 L80 80" p={Math.min(1, p * 2)} color={RED} width={12} len={90} />
    <Draw d="M80 20 L20 80" p={Math.max(0, p * 2 - 1)} color={RED} width={12} len={90} />
  </svg>
);

export const Check: React.FC<{p: number; size?: number; color?: string}> = ({p, size = 70, color}) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <Draw d="M18 52 L42 76 L84 26" p={p} width={12} len={110} color={color} />
  </svg>
);

export const Lock: React.FC<{p: number; size?: number; color?: string}> = ({p, size = 56, color}) => {
  const accent = useAccent();
  const c = color ?? accent;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{transform: `translateY(${(1 - p) * -20}px)`, opacity: p}}>
      <rect x="22" y="46" width="56" height="42" rx="6" fill={c} />
      <path d={`M34 46 V${34 - 6 * (1 - p)} a16 16 0 0 1 32 0 V46`} fill="none" stroke={c} strokeWidth="9" />
    </svg>
  );
};

export const Eye: React.FC<{size?: number; look: number}> = ({size = 120, look}) => (
  <svg width={size} height={size * 0.6} viewBox="0 0 100 60">
    <path d="M5 30 Q50 -10 95 30 Q50 70 5 30 Z" fill="none" stroke="#fff" strokeWidth="6" />
    <circle cx={50 + look * 22} cy="30" r="12" fill={useAccent()} />
  </svg>
);

export const Scissors: React.FC<{size?: number}> = ({size = 70}) => {
  const c = useAccent();
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <circle cx="28" cy="74" r="14" fill="none" stroke={c} strokeWidth="7" />
      <circle cx="72" cy="74" r="14" fill="none" stroke={c} strokeWidth="7" />
      <path d="M36 62 L70 8 M64 62 L30 8" stroke={c} strokeWidth="7" strokeLinecap="round" />
    </svg>
  );
};

// ---------- Interface de chat ----------

export const Bubble: React.FC<{children: React.ReactNode; side: 'left' | 'right'; at: number}> = ({children, side, at}) => (
  <Pop at={at} style={{alignSelf: side === 'right' ? 'flex-end' : 'flex-start', background: side === 'right' ? '#2a2a2a' : 'transparent', border: side === 'left' ? '4px solid #444' : 'none', borderRadius: 34, padding: '22px 34px', maxWidth: 780}}>
    {children}
  </Pop>
);

// Trois points qui sautillent (le modèle « écrit »).
export const Dots: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div style={{display: 'flex', gap: 18, padding: '0 36px'}}>
      {[0, 1, 2].map((k) => (
        <div key={k} style={{width: 26, height: 26, borderRadius: 13, background: '#888', transform: `translateY(${Math.sin((frame + k * 4) / 3) * 10}px)`}} />
      ))}
    </div>
  );
};

// ---------- Cadre ----------

// Ligne d'oscilloscope discrète en fond, sous la zone des libellés : l'amplitude suit le beat, plus forte au premier temps.
export const Oscillo: React.FC = () => {
  const frame = useCurrentFrame();
  const inBeat = frame % BEAT;
  const downbeat = Math.floor(frame / BEAT) % 4 === 0;
  const amp = 6 + 34 * Math.exp(-inBeat / 5) * (downbeat ? 1 : 0.6);
  const WF = 1080;
  const pts: string[] = [];
  for (let x = 0; x <= WF; x += 6) {
    const env = Math.sin((Math.PI * x) / WF); // nul aux bords
    const y = Math.sin(x / 38 + frame / 4) * 0.6 + Math.sin(x / 17 - frame / 3) * 0.4;
    pts.push(`${x},${(y * amp * env).toFixed(1)}`);
  }
  return (
    <svg width={WF} height={160} viewBox={`0 -80 ${WF} 160`} style={{position: 'absolute', left: 0, top: 1540, opacity: 0.3}}>
      <polyline points={pts.join(' ')} fill="none" stroke={useAccent()} strokeWidth={3} />
    </svg>
  );
};

export const Chrome: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  return (
    <>
      <div style={{position: 'absolute', top: 0, left: 0, height: 10, width: `${(frame / durationInFrames) * 100}%`, background: useAccent()}} />
      <div style={{position: 'absolute', bottom: 70, left: PAD, fontFamily: mono, fontWeight: 600, fontSize: 36, color: '#6f6f6f'}}>neopal.github.io</div>
    </>
  );
};

// ---------- Short complet ----------

export type Scenes = [React.FC, number][];

export const totalDuration = (scenes: Scenes) => TITLE_FRAMES + scenes.reduce((s, [, d]) => s + d, 0);

// title : [« Qu'est-ce qu'un », « token ? »] ; un mot géant trop long passe sur deux entrées (« fenêtre », « de contexte ? »).
export const Short: React.FC<{title: string[]; scenes: Scenes; accent?: string}> = ({title, scenes, accent = ACCENT}) => {
  const total = totalDuration(scenes);
  let from = TITLE_FRAMES;
  return (
    <AccentProvider accent={accent}>
      <AbsoluteFill style={{background: '#000'}}>
        <Audio src={staticFile('beat.mp3')} volume={(f) => interpolate(f, [total - 45, total], [0.9, 0], clamp)} />
        <Oscillo />
        <Sequence from={0} durationInFrames={TITLE_FRAMES}>
          <TitleCard lead={title[0]} words={title.slice(1)} />
        </Sequence>
        {scenes.map(([C, d], i) => {
          const el = (
            <Sequence key={i} from={from} durationInFrames={d}>
              <LastContext.Provider value={i === scenes.length - 1}>
                <C />
              </LastContext.Provider>
            </Sequence>
          );
          from += d;
          return el;
        })}
        <Chrome />
      </AbsoluteFill>
    </AccentProvider>
  );
};

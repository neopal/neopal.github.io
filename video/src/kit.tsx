// Briques communes des shorts du Lexique IA (extraites du pilote Token).
import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {loadFont as loadSerif} from '@remotion/google-fonts/Newsreader';
import {loadFont as loadMono} from '@remotion/google-fonts/IBMPlexMono';

// Typo retenue par PA (content/dico/da/typo.html, carte A) : Newsreader pour les phrases et les mots géants,
// IBM Plex Mono pour les tokens, chiffres et termes de jargon.
export const {fontFamily: serif} = loadSerif('normal', {weights: ['400', '800'], subsets: ['latin', 'latin-ext']});
loadSerif('italic', {weights: ['400', '800'], subsets: ['latin', 'latin-ext']});
export const {fontFamily: mono} = loadMono('normal', {weights: ['400', '600'], subsets: ['latin']});

export const ACCENT = '#7CFFB2';
export const RED = '#FF4D4D';
export const GREY = '#d6d6d6';
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

// Mot géant : Newsreader 800 italique, casse normale.
export const Big: React.FC<{children: React.ReactNode; size?: number; color?: string}> = ({children, size = 110, color = '#fff'}) => (
  <div style={{fontFamily: serif, fontWeight: 800, fontStyle: 'italic', fontSize: size, lineHeight: 0.95, color, letterSpacing: '-0.01em'}}>{children}</div>
);

// La serif a un œil plus petit qu'Inter : les tailles des phrases sont agrandies d'autant.
const SERIF_SCALE = 1.1;

// Phrase à l'écran : casse normale, une vraie phrase (cf. univers.md, règles d'écriture).
export const Say: React.FC<{children: React.ReactNode; size?: number; color?: string}> = ({children, size = 72, color = '#fff'}) => (
  <div style={{fontFamily: serif, fontWeight: 400, fontSize: size * SERIF_SCALE, lineHeight: 1.12, color, letterSpacing: '-0.01em'}}>{children}</div>
);

export const Mono: React.FC<{children: React.ReactNode; size?: number; color?: string}> = ({children, size = 40, color = ACCENT}) => (
  <div style={{fontFamily: mono, fontWeight: 600, fontSize: size, color}}>{children}</div>
);

// Mise en valeur : couleur d'accent et italique, en écho au mot géant.
export const Hi: React.FC<{children: React.ReactNode; color?: string}> = ({children, color = ACCENT}) => <span style={{color, fontStyle: 'italic'}}>{children}</span>;

// Scène : entrée et sortie sèches sur le temps, légère poussée de caméra.
export const Scene: React.FC<{children: React.ReactNode; gap?: number}> = ({children, gap = 40}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const enter = interpolate(frame, [0, 6], [0, 1], clamp);
  const exit = interpolate(frame, [durationInFrames - 5, durationInFrames], [0, 1], clamp);
  const push = 1 + 0.035 * (frame / durationInFrames);
  return (
    <AbsoluteFill
      style={{
        padding: '0 96px',
        justifyContent: 'center',
        gap,
        opacity: enter * (1 - exit),
        transform: `translateY(${(1 - enter) * 80 - exit * 80}px) scale(${push})`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

// Trait SVG qui se dessine (progression 0 -> 1).
export const Draw: React.FC<{d: string; p: number; color?: string; width?: number; len?: number}> = ({d, p, color = ACCENT, width = 10, len = 400}) => (
  <path d={d} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={len} strokeDashoffset={len * (1 - p)} />
);

// ---------- Icônes (SVG maison) ----------

export const Cross: React.FC<{p: number; size?: number}> = ({p, size = 150}) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <Draw d="M20 20 L80 80" p={Math.min(1, p * 2)} color={RED} width={12} len={90} />
    <Draw d="M80 20 L20 80" p={Math.max(0, p * 2 - 1)} color={RED} width={12} len={90} />
  </svg>
);

export const Check: React.FC<{p: number; size?: number}> = ({p, size = 70}) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <Draw d="M18 52 L42 76 L84 26" p={p} width={12} len={110} />
  </svg>
);

export const Lock: React.FC<{p: number; size?: number}> = ({p, size = 56}) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{transform: `translateY(${(1 - p) * -20}px)`, opacity: p}}>
    <rect x="22" y="46" width="56" height="42" rx="6" fill={ACCENT} />
    <path d={`M34 46 V${34 - 6 * (1 - p)} a16 16 0 0 1 32 0 V46`} fill="none" stroke={ACCENT} strokeWidth="9" />
  </svg>
);

export const Eye: React.FC<{size?: number; look: number}> = ({size = 120, look}) => (
  <svg width={size} height={size * 0.6} viewBox="0 0 100 60">
    <path d="M5 30 Q50 -10 95 30 Q50 70 5 30 Z" fill="none" stroke="#fff" strokeWidth="6" />
    <circle cx={50 + look * 22} cy="30" r="12" fill={ACCENT} />
  </svg>
);

export const Scissors: React.FC<{size?: number}> = ({size = 70}) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle cx="28" cy="74" r="14" fill="none" stroke={ACCENT} strokeWidth="7" />
    <circle cx="72" cy="74" r="14" fill="none" stroke={ACCENT} strokeWidth="7" />
    <path d="M36 62 L70 8 M64 62 L30 8" stroke={ACCENT} strokeWidth="7" strokeLinecap="round" />
  </svg>
);

// ---------- Interface de chat ----------

export const Bubble: React.FC<{children: React.ReactNode; side: 'left' | 'right'; at: number}> = ({children, side, at}) => (
  <Pop at={at} style={{alignSelf: side === 'right' ? 'flex-end' : 'flex-start', background: side === 'right' ? '#2a2a2a' : 'transparent', border: side === 'left' ? '4px solid #444' : 'none', borderRadius: 34, padding: '24px 36px', maxWidth: 760}}>
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

// Ligne d'oscilloscope discrète en fond : l'amplitude suit le beat, plus forte au premier temps.
export const Oscillo: React.FC = () => {
  const frame = useCurrentFrame();
  const inBeat = frame % BEAT;
  const downbeat = Math.floor(frame / BEAT) % 4 === 0;
  const amp = 6 + 38 * Math.exp(-inBeat / 5) * (downbeat ? 1 : 0.6);
  const W = 1080;
  const pts: string[] = [];
  for (let x = 0; x <= W; x += 6) {
    const env = Math.sin((Math.PI * x) / W); // nul aux bords
    const y = Math.sin(x / 38 + frame / 4) * 0.6 + Math.sin(x / 17 - frame / 3) * 0.4;
    pts.push(`${x},${(y * amp * env).toFixed(1)}`);
  }
  return (
    <svg width={W} height={200} viewBox={`0 -100 ${W} 200`} style={{position: 'absolute', left: 0, bottom: 230, opacity: 0.35}}>
      <polyline points={pts.join(' ')} fill="none" stroke={ACCENT} strokeWidth={3} />
    </svg>
  );
};

export const Chrome: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  return (
    <>
      <div style={{position: 'absolute', top: 0, left: 0, height: 10, width: `${(frame / durationInFrames) * 100}%`, background: ACCENT}} />
      <div style={{position: 'absolute', bottom: 80, left: 96, fontFamily: mono, fontWeight: 600, fontSize: 28, color: '#6f6f6f'}}>neopal.github.io</div>
    </>
  );
};

// ---------- Short complet ----------

export type Scenes = [React.FC, number][];

export const totalDuration = (scenes: Scenes) => scenes.reduce((s, [, d]) => s + d, 0);

export const Short: React.FC<{scenes: Scenes}> = ({scenes}) => {
  let from = 0;
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <Audio src={staticFile('beat.mp3')} />
      <Oscillo />
      {scenes.map(([C, d], i) => {
        const el = (
          <Sequence key={i} from={from} durationInFrames={d}>
            <C />
          </Sequence>
        );
        from += d;
        return el;
      })}
      <Chrome />
    </AbsoluteFill>
  );
};

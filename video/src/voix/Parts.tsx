// Pièces communes des shorts à voix off (le modèle, une bulle, un document, le tampon, une croix), pour ne pas les
// recopier d'un short à l'autre. Elles suivent les règles « L'écran suit la voix » et « Le mouvement » de univers.md.
import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Draw, Lock, Mono, squash, useAccent} from '../kit';

export const pixelShadow = (c: string) => `8px 8px 0 ${c}`;

// Tampon : il tombe de haut (1,8 fois sa taille), de travers, puis s'écrase un instant à l'impact.
export const Stamp: React.FC<{at: number; children: React.ReactNode; size: number; tilt?: number; bg?: string; style?: React.CSSProperties}> = ({at: a, children, size, tilt = -10, bg = 'transparent', style}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const accent = useAccent();
  const p = spring({frame: frame - a, fps, config: {damping: 9, stiffness: 220}});
  const [sx, sy] = squash(frame, a + 5);
  const s = 1.8 - 0.8 * p;
  return (
    <div style={{position: 'absolute', padding: '6px 18px', border: `${Math.round(size / 9)}px solid ${accent}`, background: bg, transform: `scale(${s * sx}, ${s * sy}) rotate(${tilt * p}deg)`, opacity: frame >= a ? 1 : 0, ...style}}>
      <Mono size={size} color={accent}>{children}</Mono>
    </div>
  );
};

// Le modèle : un bloc plein de cases ; le cadenas dit qu'il ne bouge plus.
export const Model: React.FC<{w?: number; lock?: number}> = ({w = 300, lock = 0}) => {
  const accent = useAccent();
  return (
    <div style={{position: 'relative', width: w, height: w * 0.62, background: '#2a2a2a', border: `${Math.max(4, Math.round(w / 50))}px solid #fff`, boxShadow: pixelShadow('#222'), display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: w / 30, padding: w / 14, boxSizing: 'border-box'}}>
      {Array.from({length: 10}, (_, k) => <div key={k} style={{background: '#5a5a5a'}} />)}
      {lock > 0 ? <div style={{position: 'absolute', right: -w / 8, top: -w / 8, lineHeight: 0}}><Lock p={lock} size={Math.max(56, w / 3)} color={accent} /></div> : null}
    </div>
  );
};

// Une bulle de conversation réduite à des traits ; `color` teinte les traits (une réponse, une question).
export const Msg: React.FC<{w: number; right?: boolean; color?: string}> = ({w, right, color = '#5a5a5a'}) => (
  <div style={{alignSelf: right ? 'flex-end' : 'flex-start', width: w, background: right ? '#2a2a2a' : 'transparent', border: right ? 'none' : '4px solid #444', borderRadius: 26, padding: '18px 24px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 10}}>
    <div style={{height: 12, width: '90%', background: color}} />
    <div style={{height: 12, width: '60%', background: color}} />
  </div>
);

// Une feuille de papier, avec `lines` traits ; `hi` surligne un trait en couleur d'accent (le passage utile).
export const Doc: React.FC<{w: number; lines?: number; hi?: number; title?: string; border?: string}> = ({w, lines = 4, hi = -1, title, border = '#000'}) => {
  const accent = useAccent();
  return (
    <div style={{width: w, background: '#efe9dc', border: `6px solid ${border}`, boxShadow: pixelShadow('#444'), padding: `${w / 12}px ${w / 10}px`, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: w / 22}}>
      {title ? <Mono size={48} color="#111">{title}</Mono> : null}
      {Array.from({length: lines}, (_, k) => <div key={k} style={{height: Math.max(8, w / 22), width: `${[90, 72, 84, 60, 78][k % 5]}%`, background: k === hi ? accent : '#9a9384'}} />)}
    </div>
  );
};

// Croix tracée en deux traits (p de 0 à 1).
export const Cross: React.FC<{p: number; size: number; color?: string}> = ({p, size, color}) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <Draw d="M22 22 L78 78" p={Math.min(1, p * 2)} width={12} len={80} color={color} />
    <Draw d="M78 22 L22 78" p={Math.max(0, p * 2 - 1)} width={12} len={80} color={color} />
  </svg>
);

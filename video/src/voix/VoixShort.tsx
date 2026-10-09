// Moteur commun des shorts à voix off (YouTube / TikTok) : calage des scènes sur la voix, sous-titres mot à mot,
// hook titre, montage audio. Un short n'écrit que ses scènes (voir video/VOIX.md et PredictionVoix.tsx).
// Règle « lisible dans le métro » (univers.md) : aucun texte sous 48 px, sous-titres de 2 lignes au plus restant
// au moins 1 s. Contrôle : npm run check:voix -- <id> <Composition>
import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {loadFont as loadSerif} from '@remotion/google-fonts/Newsreader';
import {AccentProvider, Big, Chrome, LastContext, Oscillo, PAD, Pop, Say, Scene, ZONE, clamp, serif, useAccent} from '../kit';
import {makeChunks} from './chunks.mjs';

loadSerif('normal', {weights: ['600'], subsets: ['latin', 'latin-ext']});

export const FPS = 30;
export const TAIL = 2; // secondes d'image finale après le dernier mot
export const LABEL = '#cfcfcf'; // libellés secondaires : jamais plus sombre, pour rester lisibles sur un téléphone
export const blink = (frame: number) => (frame % 20 < 12 ? 1 : 0.35);

export type Word = {w: string; start: number; end: number};
export type Seg = {scene: string; start: number; end: number; words: Word[]};
type Align = {id: string; audio: boolean; music: boolean; duration: number; segments: Seg[]};
type Script = {quoted?: string[]; nocaption?: string[]};
type Chunk = {words: Word[]; from: number; to: number; quote: boolean};

// id : le nom des fichiers (public/voix/<id>.mp3, <id>-music.mp3) ; music : une autre piste, pour en réutiliser une.
export const makeVoix = (align: Align, script: Script, music?: string) => {
  const SEGS = align.segments;
  // Bornes des scènes en images : chaque scène commence avec son premier mot (la première à 0).
  const FROM = SEGS.map((s, i) => (i === 0 ? 0 : Math.round(s.start * FPS)));
  const duration = Math.round((align.duration + TAIL) * FPS);
  const LEN = FROM.map((f, i) => (i + 1 < FROM.length ? FROM[i + 1] : duration) - f);

  // Image (locale à la scène) où la voix dit le n-ième mot qui contient `m`.
  const at = (scene: string, m: string, nth = 0) => {
    const i = SEGS.findIndex((s) => s.scene === scene);
    if (i < 0) throw new Error(`scène « ${scene} » absente du calage`);
    const hits = SEGS[i].words.filter((w) => w.w.toLowerCase().includes(m.toLowerCase()));
    const w = hits[Math.min(nth, hits.length - 1)];
    if (!w) throw new Error(`mot « ${m} » absent de la scène ${scene}`);
    return Math.round(w.start * FPS) - FROM[i];
  };

  // Sous-titres : la phrase dite, par groupes de 2 lignes au plus, le mot en cours en couleur.
  const CHUNKS = makeChunks(SEGS, align.duration + TAIL, script.quoted ?? [], script.nocaption ?? []) as Chunk[];
  const Captions: React.FC = () => {
    const frame = useCurrentFrame();
    const {fps} = useVideoConfig();
    const accent = useAccent();
    const c = CHUNKS.find((x) => frame >= x.from && frame < x.to);
    if (!c || c.quote) return null;
    const p = spring({frame: frame - c.from, fps, config: {damping: 16, stiffness: 260, mass: 0.5}});
    const t = frame / FPS;
    const cur = c.words.reduce((k, w, i) => (t >= w.start - 0.04 ? i : k), -1);
    return (
      <div style={{position: 'absolute', left: PAD, right: PAD, bottom: 1920 - ZONE.center.top + 10, transform: `translateY(${(1 - p) * 30}px)`, opacity: p}}>
        <div style={{fontFamily: serif, fontWeight: 600, fontSize: 84, lineHeight: 1.1, letterSpacing: '-0.01em'}}>
          {c.words.map((w, k) => (
            <span key={k} style={{color: k === cur ? accent : k < cur ? '#fff' : '#a8a8a8'}}>
              {w.w}
              {k < c.words.length - 1 ? ' ' : ''}
            </span>
          ))}
        </div>
      </div>
    );
  };

  // Hook : la question du terme en grand, première image du short (et couverture, cf. VOIX.md étape 11).
  // lead s'affiche tout de suite ; les lignes du terme tombent quand la voix dit `cue` (scène « hook »).
  const TitleHook: React.FC<{lead: string; lines: string[]; cue: string}> = ({lead, lines, cue}) => {
    const accent = useAccent();
    const q = SEGS[0].words.length ? at('hook', cue) : 5;
    return (
      <Scene>
        <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
          <Pop at={0}><Say size={100}>{lead}</Say></Pop>
          {lines.map((l, k) => <Pop key={k} at={q + 4 * k}><Big size={124} color={accent}>{l}</Big></Pop>)}
        </div>
      </Scene>
    );
  };

  // Montage : une Sequence par segment de la voix, sous-titres et habillage par-dessus.
  const Montage: React.FC<{scenes: Record<string, React.FC>; accent: string}> = ({scenes, accent}) => {
    const fadeOut = (f: number) => interpolate(f, [duration - 30, duration], [1, 0], clamp);
    const missing = SEGS.map((s) => s.scene).filter((s) => !scenes[s]);
    if (missing.length) throw new Error(`scènes sans composant : ${missing.join(', ')}`);
    return (
      <AccentProvider accent={accent}>
        <AbsoluteFill style={{background: '#000'}}>
          {align.audio ? <Audio src={staticFile(`voix/${align.id}.mp3`)} /> : null}
          {/* Musique sous la voix : la piste du short, une piste réutilisée, ou le beat commun des shorts muets. Volume 0,11 sous la voix (0,16 jusqu'au short Base de données, jugé trop fort par PA le 2026-10-09). */}
          <Audio loop src={staticFile(music ?? (align.music ? `voix/${align.id}-music.mp3` : 'beat.mp3'))} volume={(f) => (align.audio ? 0.11 : 0.6) * fadeOut(f)} />
          <Oscillo />
          {SEGS.map((s, i) => (
            <Sequence key={s.scene} from={FROM[i]} durationInFrames={LEN[i]}>
              <LastContext.Provider value={i === SEGS.length - 1}>{React.createElement(scenes[s.scene])}</LastContext.Provider>
            </Sequence>
          ))}
          <Captions />
          <Chrome />
        </AbsoluteFill>
      </AccentProvider>
    );
  };

  return {at, duration, TitleHook, Montage};
};

// Short Shadow AI (YouTube / TikTok / Instagram), épisode 35, définition, voix off PAL - FR, préparé le 2026-11-09
// (calage provisoire, sans voix). Fiche shadow-ai de lexique/terms.js (vague 25) ; sources dans voix/shadow-ai.script.json :
// sondage Censuswide pour Microsoft UK, octobre 2025 (71 % des 2 003 salariés britanniques ont déjà utilisé au travail un
// outil d'IA grand public non approuvé) ; centre d'aide OpenAI (« Améliorer le modèle pour tous » activé par défaut sur
// les comptes perso) ; OpenAI Enterprise privacy (les comptes entreprise n'entraînent aucun modèle par défaut).
// Image de la fiche : la photocopieuse du troisième en panne depuis mars, et le reprographe d'en face (scène inventée).
// Fil : l'ép. 34 montrait qu'aucun détecteur ne prouve qu'un texte vient d'une IA ; au bureau, l'IA qu'on utilise en
// douce passe inaperçue, et le vrai sujet devient ce qu'on y colle.
// Le téléphone du compte perso (Phone, Chat) revient dans hook, base, nom, mecanisme et etdonc ; la photocopieuse et
// les deux collègues dans image et chute ; le reprographe dans image et mecanisme ; l'interrupteur (Toggle) dans
// mecanisme (allumé) et etdonc (éteint).
// Le panneau de réglages est dessiné, sans logo ni capture : seule la ligne citée par la voix y est écrite.
// L'écran suit la voix et Le mouvement (univers.md) : chaque élément entre sur le mot qui le nomme (at), easing du kit,
// arcs pour ce qui vole (feuilles, bulle), un seul punch zoom (71 %, sur « cent »).
import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Big, Check, Cross, Draw, Mono, Pop, Scene, W, arc, clamp, countUp, ease, punch, serif, typed, useAccent, withAlpha} from './kit';
import {LABEL, blink, makeVoix} from './voix/VoixShort';
import {Pixel, type Sprite} from './voix/Pixel';
import {Model, pixelShadow} from './voix/Parts';
import ALIGN from './voix/shadow-ai.align.json';
import SCRIPT from './voix/shadow-ai.script.json';

const AC = '#5FD3C6'; // catégorie Méthode
const V = makeVoix(ALIGN, SCRIPT, 'voix/prediction-music.mp3');
const {at} = V;
export const SHADOWAIVOIX_DURATION = V.duration;

const RED = '#FF4D4D';
const PAPER = '#efe9dc';
const gone = (frame: number, until: number) => ease(frame, until, until + 6, [1, 0], 'inOut');
// Entrée / sortie identiques à celles de Scene, pour un calque posé hors de la Scene (le hook).
const useSceneOpacity = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  return interpolate(frame, [0, 6], [0, 1], clamp) * (1 - interpolate(frame, [durationInFrames - 5, durationInFrames], [0, 1], clamp));
};

// ---------- Personnages en pixel art (même format que voix/Pixel.tsx) ----------

const SKIN = '#e3b58e';

// Le reprographe d'en face : lunettes, cheveux gris, blouse bleue.
const REPRO: Sprite = {
  rows: [
    '....HHHH....',
    '...HHHHHH...',
    '...SSSSSS...',
    '..GGEGGEGG..',
    '...SSSSSS...',
    '...SSRRSS...',
    '....SSSS....',
    '..BBBBBBBB..',
    '.BBBBWWBBBB.',
    '.BBBBWWBBBB.',
    '.SBBBBBBBBS.',
    '.SBBBBBBBBS.',
    '...BBBBBB...',
    '...JJ..JJ...',
    '..ZZZ..ZZZ..',
  ],
  palette: {H: '#bdbdbd', S: SKIN, E: '#111', G: '#333', R: '#b5524f', B: '#3b6fa8', W: '#f2f2f2', J: '#2f3b55', Z: '#4a3a2a'},
};

// Une collègue : carré brun, pull vert.
const COL_A: Sprite = {
  rows: [
    '...HHHHHH...',
    '..HHHHHHHH..',
    '..HSSSSSSH..',
    '..HSESSESH..',
    '..HSSSSSSH..',
    '...SSRRSS...',
    '....SSSS....',
    '..VVVVVVVV..',
    '.VVVVVVVVVV.',
    '.VVVVVVVVVV.',
    '.SVVVVVVVVS.',
    '.SVVVVVVVVS.',
    '...JJJJJJ...',
    '...JJ..JJ...',
    '..ZZZ..ZZZ..',
  ],
  palette: {H: '#6b3e22', S: SKIN, E: '#111', R: '#b5524f', V: '#4f8a5b', J: '#2a2a2a', Z: '#111'},
};

// Un collègue : barbe, chemise moutarde.
const COL_B: Sprite = {
  rows: [
    '....HHHH....',
    '...HHHHHH...',
    '...SSSSSS...',
    '...SESSES...',
    '...SSSSSS...',
    '...HSRRSH...',
    '....HHHH....',
    '..MMMMMMMM..',
    '.MMMMMMMMMM.',
    '.MMMMMMMMMM.',
    '.SMMMMMMMMS.',
    '.SMMMMMMMMS.',
    '...JJJJJJ...',
    '...JJ..JJ...',
    '..ZZZ..ZZZ..',
  ],
  palette: {H: '#3a2a1a', S: SKIN, E: '#111', R: '#b5524f', M: '#c9a23a', J: '#2f3b55', Z: '#4a3a2a'},
};

// Une lune en pixel art.
const MOON: Sprite = {
  rows: ['..YYY.', '.YYY..', 'YYY...', 'YYY...', 'YYY...', '.YYY..', '..YYY.'],
  palette: {Y: '#f3dd8a'},
};

// Un petit salarié de la grille (tête et buste), en deux couleurs.
const Person: React.FC<{lit: number}> = ({lit}) => {
  const accent = useAccent();
  const c = lit > 0 ? accent : '#4a4a4a';
  return (
    <div style={{position: 'relative', width: 40, height: 42, transform: `scale(${1 + 0.15 * lit * (1 - lit) * 4})`}}>
      <div style={{position: 'absolute', left: 12, top: 0, width: 16, height: 16, background: c}} />
      <div style={{position: 'absolute', left: 4, top: 20, width: 32, height: 22, background: c}} />
    </div>
  );
};

// ---------- Objets dessinés ----------

// Un téléphone debout : le cadre, l'encoche et l'écran (contenu en enfant, rogné).
const Phone: React.FC<{w: number; h: number; children?: React.ReactNode}> = ({w, h, children}) => (
  <div style={{position: 'relative', width: w, height: h, background: '#1c1c1c', border: '8px solid #e8e8e8', borderRadius: w / 5, boxShadow: pixelShadow('#333'), boxSizing: 'border-box'}}>
    <div style={{position: 'absolute', left: 12, right: 12, top: 40, bottom: 30, background: '#111', borderRadius: 10, overflow: 'hidden'}}>{children}</div>
    <div style={{position: 'absolute', left: '50%', top: 13, width: w / 3, height: 12, marginLeft: -w / 6, borderRadius: 6, background: '#444'}} />
  </div>
);

// L'écran de chat : une question (bulle pleine), puis la réponse dont les lignes s'écrivent (`lines` de 0 à 3).
const Chat: React.FC<{k: number; lines?: number}> = ({k, lines = 0}) => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 16 * k, padding: 14 * k}}>
      <div style={{alignSelf: 'flex-end', width: '72%', background: '#2a2a2a', borderRadius: 18 * k, padding: 14 * k, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 9 * k}}>
        <div style={{height: 10 * k, width: '90%', background: '#7a7a7a'}} />
        <div style={{height: 10 * k, width: '55%', background: '#7a7a7a'}} />
      </div>
      <div style={{alignSelf: 'flex-start', width: '86%', border: `${Math.max(3, 4 * k)}px solid #555`, borderRadius: 18 * k, padding: 14 * k, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 9 * k}}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{display: 'flex', alignItems: 'center', gap: 6 * k}}>
            <div style={{height: 10 * k, width: `${Math.max(0, Math.min(1, lines - i)) * [84, 70, 50][i]}%`, background: '#e8e8e8'}} />
            {Math.floor(lines) === i || (i === 2 && lines >= 3) || (i === 0 && lines <= 0) ? <div style={{width: 6 * k, height: 26 * k, background: accent, opacity: blink(frame) > 0.5 ? 1 : 0}} /> : null}
          </div>
        ))}
      </div>
    </div>
  );
};

// Un ordinateur portable : l'écran (contenu en enfant) et le clavier.
const Laptop: React.FC<{w: number; on?: boolean; children?: React.ReactNode}> = ({w, on = true, children}) => (
  <div style={{width: w}}>
    <div style={{position: 'relative', width: w * 0.86, height: w * 0.56, margin: '0 auto', background: on ? '#18232b' : '#0e0e0e', border: '8px solid #e8e8e8', borderRadius: 12, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{children}</div>
    <div style={{width: w, height: w * 0.06, background: '#cfcfcf', borderRadius: '0 0 14px 14px', boxShadow: pixelShadow('#333')}} />
  </div>
);

// Une affichette scotchée : papier, texte, deux bouts de scotch.
const Affiche: React.FC<{w: number; h: number; children: React.ReactNode; tilt?: number}> = ({w, h, children, tilt = -3}) => (
  <div style={{position: 'relative', width: w, height: h, transform: `rotate(${tilt}deg)`}}>
    <div style={{width: w, height: h, background: PAPER, boxShadow: pixelShadow('#444'), display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{children}</div>
    <div style={{position: 'absolute', left: -18, top: -10, width: w * 0.32, height: 26, background: 'rgba(239,233,220,0.75)', transform: 'rotate(-24deg)'}} />
    <div style={{position: 'absolute', right: -18, top: -10, width: w * 0.32, height: 26, background: 'rgba(239,233,220,0.75)', transform: 'rotate(22deg)'}} />
  </div>
);

// La photocopieuse : le corps, le couvercle, le bac de sortie, un voyant (rouge en panne, vert réparée).
const Copieur: React.FC<{w: number; ok?: number}> = ({w, ok = 0}) => (
  <svg width={w} height={w * 1.05} viewBox="0 0 200 210">
    <rect x="20" y="40" width="160" height="160" fill="#d9d9d9" stroke="#8a8a8a" strokeWidth="6" />
    <rect x="12" y="22" width="176" height="24" fill="#bdbdbd" stroke="#8a8a8a" strokeWidth="6" />
    <rect x="34" y="62" width="74" height="30" fill="#2a2a2a" />
    <circle cx="146" cy="77" r="12" fill={ok > 0.5 ? '#5FD3A0' : RED} />
    <rect x="34" y="112" width="132" height="12" fill="#9a9a9a" />
    <rect x="34" y="140" width="132" height="12" fill="#9a9a9a" />
    <rect x="180" y="104" width="18" height="40" fill="#bdbdbd" stroke="#8a8a8a" strokeWidth="4" />
  </svg>
);

// Une feuille de papier, quelques traits gris.
const Feuille: React.FC<{w: number; hi?: boolean}> = ({w, hi}) => {
  const accent = useAccent();
  return (
    <div style={{width: w, height: w * 1.3, background: PAPER, border: '3px solid #555', boxSizing: 'border-box', padding: w / 8, display: 'flex', flexDirection: 'column', gap: w / 10}}>
      {[90, 70, 84, 56].map((p, i) => <div key={i} style={{height: Math.max(4, w / 14), width: `${p}%`, background: hi && i === 1 ? accent : '#9a9384'}} />)}
    </div>
  );
};

// L'interrupteur des réglages : `on` de 0 (éteint, gris) à 1 (allumé, couleur d'accent).
const Toggle: React.FC<{w: number; on: number}> = ({w, on}) => {
  const accent = useAccent();
  const h = w * 0.55;
  return (
    <div style={{position: 'relative', width: w, height: h, borderRadius: h / 2, background: on > 0.5 ? accent : '#555', boxSizing: 'border-box'}}>
      <div style={{position: 'absolute', top: h * 0.1, left: h * 0.1 + on * (w - h), width: h * 0.8, height: h * 0.8, borderRadius: h / 2, background: '#f2f2f2'}} />
    </div>
  );
};

// La loupe (chute).
const Loupe: React.FC<{w: number}> = ({w}) => (
  <svg width={w} height={w} viewBox="0 0 100 100">
    <circle cx="40" cy="40" r="28" fill="rgba(255,255,255,0.08)" stroke="#fff" strokeWidth="8" />
    <path d="M61 61 L90 90" stroke="#fff" strokeWidth="12" strokeLinecap="round" />
  </svg>
);

// ---------- 0. Hook : le bureau, l'écran éteint, et dessous un téléphone allumé ----------

const Hook: React.FC = () => {
  const op = useSceneOpacity();
  const accent = useAccent();
  return (
    <>
      {/* Le décor, posé dès la première image au-dessus du titre (aucun sous-titre dans le hook). */}
      <div style={{position: 'absolute', left: 96, top: 120, width: W, height: 500, opacity: op}}>
        <div style={{position: 'absolute', left: 80, top: 0}}>
          <Laptop w={420} on={false} />
        </div>
        <div style={{position: 'absolute', left: 0, top: 270, width: W, height: 16, background: '#8a6a4a'}} />
        {/* L'ombre sous le bureau, et le téléphone qui y brille. */}
        <div style={{position: 'absolute', left: 40, top: 286, width: W - 80, height: 214, background: 'linear-gradient(#0a0a0a, #000)'}} />
        <div style={{position: 'absolute', left: 600, top: 300, width: 180, height: 190, borderRadius: 90, background: withAlpha(accent, 0.18), filter: 'blur(30px)'}} />
        <div style={{position: 'absolute', left: 620, top: 300, transform: 'rotate(-8deg)'}}>
          <Phone w={130} h={210}>
            <Chat k={0.5} lines={2} />
          </Phone>
        </div>
      </div>
      <V.TitleHook lead="C'est quoi ?" lines={['le shadow AI']} cue="shadow" />
    </>
  );
};

// ---------- 1. Intro : l'affichette « IA » barrée, puis 71 salariés sur 100 ----------

const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const interdite = at('intro', 'interdite');
  const soixante = at('intro', 'soixante');
  const cent = at('intro', 'cent');
  const brit = at('intro', 'Royaume');
  const validee = at('intro', 'validée');
  // count-up de 0 à 71, de « soixante » à « cent » ; la grille s'allume au même rythme (ordre de lecture).
  const n = Math.round(ease(frame, soixante, Math.max(cent, soixante + 24), [0, 71]));
  const s = punch(frame, Math.max(cent, soixante + 24));
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 640}}>
        {/* Le décor : l'affichette scotchée, posée dès l'entrée ; la croix se trace sur « interdite » ; elle pâlit sur « validée ». */}
        <Pop at={0} style={{position: 'absolute', left: 0, top: 20, opacity: ease(frame, validee, validee + 10, [1, 0.35], 'inOut')}}>
          <Affiche w={300} h={260}>
            <div style={{fontFamily: serif, fontWeight: 800, fontSize: 150, color: '#111', lineHeight: 1}}>IA</div>
          </Affiche>
          <div style={{position: 'absolute', left: 40, top: 20}}>
            <Cross p={ease(frame, interdite, interdite + 12)} size={220} />
          </div>
        </Pop>
        {/* count-up et punch zoom : 71 %, sous l'affichette. */}
        <Pop at={soixante} style={{position: 'absolute', left: 10, top: 360}}>
          <div style={{transform: `scale(${s})`, transformOrigin: '0% 50%'}}>
            <Mono size={120}>{countUp(frame, soixante, 71, Math.max(24, cent - soixante))} %</Mono>
          </div>
        </Pop>
        {/* stagger : la grille de 100 salariés, posée sur « Royaume-Uni », 71 s'allument en cascade à partir de « soixante ». */}
        <Pop at={brit} style={{position: 'absolute', left: 388, top: 10}}>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(10, 40px)', gap: '8px 10px'}}>
            {Array.from({length: 100}, (_, i) => <Person key={i} lit={i < n ? 1 : 0} />)}
          </div>
        </Pop>
        {/* Libellé sous la grille, sur « britanniques ». */}
        <Pop at={brit} style={{position: 'absolute', left: 300, top: 560}}>
          <Mono size={52} color={LABEL}>Royaume-Uni</Mono>
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 2. Base : l'outil validé à gauche, le compte gratuit à droite ----------

const Base: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const outil = at('base', 'outil');
  const valide = at('base', 'validé');
  const paye = at('base', 'payé');
  const compte = at('base', 'compte');
  const soir = at('base', 'soir');
  const perso = at('base', 'perso');
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 640}}>
        {/* Le décor : le plateau du bureau. */}
        <div style={{position: 'absolute', left: 0, top: 470, width: W, height: 14, background: '#8a6a4a'}} />
        {/* pop in : le portable de l'entreprise, sur « outil » ; la coche se trace sur « validé ». */}
        <Pop at={outil} style={{position: 'absolute', left: 0, top: 200}}>
          <Laptop w={420}>
            <svg width={150} height={150} viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="44" fill="none" stroke={accent} strokeWidth="7" opacity={frame >= valide ? 1 : 0.25} />
              <Draw d="M28 52 L44 68 L74 34" p={ease(frame, valide, valide + 10)} width={10} len={70} />
            </svg>
          </Laptop>
        </Pop>
        <Pop at={valide + 5} style={{position: 'absolute', left: 30, top: 510}}>
          <Mono size={52} color={LABEL}>outil validé</Mono>
        </Pop>
        {/* pop in : l'étiquette « payé », sur « payé ». */}
        <Pop at={paye} style={{position: 'absolute', left: 250, top: 120}}>
          <div style={{transform: 'rotate(8deg)', background: accent, padding: '8px 22px', borderRadius: 8}}>
            <Mono size={52} color="#111">payé</Mono>
          </div>
        </Pop>
        {/* pop in : le téléphone du compte gratuit, sur « compte » ; libellé 5 images après. */}
        <Pop at={compte} style={{position: 'absolute', left: 600, top: 120}}>
          <Phone w={230} h={350}>
            <Chat k={0.8} lines={0} />
            <div style={{position: 'absolute', left: 14, bottom: 14, opacity: frame >= perso ? 1 : 0}}>
              <Mono size={48} color={accent}>{typed(frame, perso, '@perso', 30)}</Mono>
            </div>
          </Phone>
        </Pop>
        <Pop at={compte + 5} style={{position: 'absolute', left: 520, top: 510}}>
          <Mono size={52} color={LABEL}>compte gratuit</Mono>
        </Pop>
        {/* pop in : la lune au-dessus du téléphone, sur « soir ». */}
        <Pop at={soir} style={{position: 'absolute', left: 820, top: 10, lineHeight: 0}}>
          <Pixel sprite={MOON} px={12} />
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 3. Nom : le téléphone travaille, l'ombre passe, puis le terme ----------

const Nom: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const travaille = at('nom', 'travaille');
  const cest = at('nom', "c'est", 1);
  const ia = at('nom', "l'IA");
  const shadow = at('nom', 'shadow');
  // L'ombre glisse sur le téléphone sur « c'est » (le terme arrive) : il passe en retrait.
  const sh = ease(frame, cest, cest + 14, [0, 1], 'inOut');
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 640}}>
        {/* Le décor : le téléphone du compte perso ; sa réponse s'écrit sur « travaille ». */}
        <div style={{position: 'absolute', left: (W - 220) / 2, top: 300, opacity: 1 - 0.55 * sh}}>
          <Phone w={220} h={330}>
            <Chat k={0.75} lines={ease(frame, travaille, travaille + 30, [0, 3])} />
          </Phone>
          {/* L'ombre, de gauche à droite (wipe). */}
          <div style={{position: 'absolute', left: -40, top: -20, width: 300 * sh, height: 370, background: 'linear-gradient(90deg, rgba(0,0,0,0.9), rgba(0,0,0,0.65))'}} />
        </div>
        {/* pop in : le terme en français puis en anglais (sous-titres masqués par onscreen). */}
        <Pop at={ia} style={{position: 'absolute', left: 0, top: 0}}>
          <Big size={118}>IA fantôme</Big>
        </Pop>
        <Pop at={shadow} style={{position: 'absolute', left: 0, top: 130}}>
          <Big size={150} color={accent}>shadow AI</Big>
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 4. L'image : la photocopieuse du troisième, et le reprographe d'en face ----------

const OFFICE = {x: 0, y: 70, w: 450, h: 560};
const SHOP = {x: 560, y: 150, w: 328, h: 480};
const FLOOR_Y = 630;

// Le bureau du troisième : le mur, l'étage numéroté, le sol.
const Bureau: React.FC = () => (
  <div style={{position: 'absolute', left: OFFICE.x, top: OFFICE.y, width: OFFICE.w, height: OFFICE.h, background: '#1a1a1a', border: '6px solid #8a8a8a', boxSizing: 'border-box'}}>
    <div style={{position: 'absolute', right: 14, top: 10}}>
      <Mono size={52} color={LABEL}>3e</Mono>
    </div>
  </div>
);

// La boutique du reprographe : un store rayé, la vitrine.
const Boutique: React.FC = () => {
  const accent = useAccent();
  return (
    <div style={{position: 'absolute', left: SHOP.x, top: SHOP.y, width: SHOP.w, height: SHOP.h}}>
      <div style={{position: 'absolute', left: -10, top: 0, width: SHOP.w + 20, height: 60, background: `repeating-linear-gradient(90deg, ${accent} 0 40px, #f2f2f2 40px 80px)`}} />
      <div style={{position: 'absolute', left: 0, top: 60, width: SHOP.w, height: SHOP.h - 60, background: '#1d2226', border: '6px solid #8a8a8a', borderTop: 'none', boxSizing: 'border-box'}} />
    </div>
  );
};

const Photocopie: React.FC = () => {
  const frame = useCurrentFrame();
  const photo = at('image', 'photocopieuse');
  const panne = at('image', 'panne');
  const mars = at('image', 'mars');
  const etage = at('image', 'étage');
  const copies = at('image', 'copies');
  const repro = at('image', 'reprographe');
  const contrats = at('image', 'contrats');
  const juri = at('image', 'juridique');
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 640}}>
        {/* Le décor : le bureau du troisième, la rue, la boutique d'en face. */}
        <Bureau />
        <Boutique />
        <div style={{position: 'absolute', left: 0, top: FLOOR_Y, width: W, height: 8, background: '#5a5a5a'}} />
        {/* pop in : la photocopieuse, sur « photocopieuse » ; l'affichette « en panne », sur « panne ». */}
        <Pop at={photo} style={{position: 'absolute', left: 20, top: 380, lineHeight: 0}}>
          <Copieur w={220} />
        </Pop>
        <Pop at={panne} style={{position: 'absolute', left: 14, top: 330}}>
          <Affiche w={260} h={74} tilt={-6}>
            <Mono size={48} color={RED}>en panne</Mono>
          </Affiche>
        </Pop>
        {/* pop in : la page de calendrier « mars », sur « mars ». */}
        <Pop at={mars} style={{position: 'absolute', left: 14, top: 96}}>
          <div style={{width: 140, background: PAPER, boxShadow: pixelShadow('#444')}}>
            <div style={{height: 26, background: RED}} />
            <div style={{padding: '10px 0', textAlign: 'center'}}>
              <Mono size={48} color="#111">mars</Mono>
            </div>
          </div>
        </Pop>
        {/* stagger : les deux collègues de l'étage, sur « étage ». */}
        <Pop at={etage} style={{position: 'absolute', left: 260, top: FLOOR_Y - 15 * 11, lineHeight: 0}}>
          <Pixel sprite={COL_A} px={11} seed={1} />
        </Pop>
        <Pop at={etage + 3} style={{position: 'absolute', left: 330, top: FLOOR_Y - 15 * 11, lineHeight: 0}}>
          <Pixel sprite={COL_B} px={11} seed={4} />
        </Pop>
        {/* pop in : le reprographe dans sa boutique, sur « reprographe ». */}
        <Pop at={repro} style={{position: 'absolute', left: SHOP.x + 40, top: FLOOR_Y - 15 * 12, lineHeight: 0}}>
          <Pixel sprite={REPRO} px={12} seed={2} />
        </Pop>
        {/* Les copies volent en arc du bureau vers la boutique, une toutes les 9 images à partir de « copies ». */}
        {Array.from({length: 6}, (_, i) => {
          const t = copies + 9 * i;
          const p = ease(frame, t, t + 18, [0, 1], 'inOut');
          if (frame < t || p >= 1) return null;
          const [x, y] = arc(p, [300, 360], [SHOP.x + 200, SHOP.y + 220], 90);
          return (
            <div key={i} style={{position: 'absolute', left: x, top: y, transform: `rotate(${(p - 0.5) * 40}deg)`}}>
              <Feuille w={50} />
            </div>
          );
        })}
        {/* stagger : la pile de chemises « contrats » derrière le reprographe, sur « contrats ». */}
        {[0, 1, 2, 3].map((i) => (
          <Pop key={i} at={contrats + 2 * i} style={{position: 'absolute', left: SHOP.x + 180, top: SHOP.y + 290 - i * 34, width: 130, height: 30, background: ['#c9a23a', '#b5524f', '#3b6fa8', '#4f8a5b'][i], border: '3px solid #111', boxSizing: 'border-box'}}>
            <div />
          </Pop>
        ))}
        <Pop at={contrats + 6} style={{position: 'absolute', left: SHOP.x + 70, top: SHOP.y + 76}}>
          <Mono size={48} color="#fff">contrats</Mono>
        </Pop>
        {/* pop in : la porte du juridique au fond du bureau, sur « juridique ». */}
        <Pop at={juri} style={{position: 'absolute', left: 160, top: 150}}>
          <div style={{width: 280, height: 170, background: '#2a2a2a', border: '5px solid #8a8a8a', boxSizing: 'border-box', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 12}}>
            <Mono size={48} color={LABEL}>juridique</Mono>
          </div>
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 5. Mécanisme : le compte perso, le réglage activé par défaut, la feuille qui part entraîner ----------

const PHONE_M = {x: 30, y: 300, w: 200, h: 320};
const MODEL_M = {x: 540, y: 360, w: 300};

const Mecanisme: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const chatgpt = at('mecanisme', 'ChatGPT');
  const reglages = at('mecanisme', 'réglages');
  const ameliorer = at('mecanisme', 'Améliorer');
  const active = at('mecanisme', 'activé');
  const colles = at('mecanisme', 'colles');
  const entrainer = at('mecanisme', 'entraîner');
  const openai = at('mecanisme', 'OpenAI');
  // La feuille arrive dans le téléphone sur « colles » (arc), puis repart vers les modèles sur « entraîner ».
  const inP = ease(frame, colles, colles + 16, [0, 1], 'inOut');
  const outP = ease(frame, entrainer, entrainer + 18, [0, 1], 'inOut');
  const phoneMid: [number, number] = [PHONE_M.x + PHONE_M.w / 2 - 30, PHONE_M.y + 120];
  const [fx, fy] = frame < entrainer ? arc(inP, [PHONE_M.x + 30, 330], phoneMid, 70) : arc(outP, phoneMid, [MODEL_M.x + MODEL_M.w / 2 - 30, MODEL_M.y + 30], 90);
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 640}}>
        {/* Le décor : le reprographe, qui s'efface sur « ChatGPT » pour laisser la place au téléphone. */}
        <div style={{position: 'absolute', left: PHONE_M.x + 20, top: 640 - 15 * 13, lineHeight: 0, opacity: gone(frame, chatgpt)}}>
          <Pixel sprite={REPRO} px={13} seed={2} />
        </div>
        {/* pop in : le téléphone du compte perso, sur « ChatGPT ». */}
        <Pop at={chatgpt} style={{position: 'absolute', left: PHONE_M.x, top: PHONE_M.y}}>
          <Phone w={PHONE_M.w} h={PHONE_M.h}>
            <Chat k={0.7} lines={3} />
          </Phone>
        </Pop>
        {/* pop in : le panneau de réglages, sur « réglages » ; la ligne citée s'écrit à la machine ; l'interrupteur s'allume sur « activé ». */}
        <Pop at={reglages} style={{position: 'absolute', left: 0, top: 0, width: W, height: 260, background: '#1b1b1b', border: '5px solid #6a6a6a', borderRadius: 26, boxSizing: 'border-box', padding: '26px 34px'}}>
          <div style={{display: 'flex', flexDirection: 'column', gap: 14}}>
            <div style={{height: 14, width: 260, background: '#4a4a4a'}} />
            <div style={{height: 2, width: '100%', background: '#3a3a3a'}} />
          </div>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 22, gap: 30}}>
            <div style={{fontFamily: serif, fontWeight: 600, fontSize: 60, lineHeight: 1.08, color: '#f2f2f2', width: 600, minHeight: 130}}>{typed(frame, ameliorer, 'Améliorer le modèle pour tous', 36)}</div>
            <div style={{opacity: frame >= ameliorer ? 1 : 0.3}}>
              <Toggle w={130} on={ease(frame, active, active + 8)} />
            </div>
          </div>
        </Pop>
        {/* La feuille collée, sur « colles », puis vers les modèles sur « entraîner ». */}
        {frame >= colles && (frame < entrainer + 18) ? (
          <div style={{position: 'absolute', left: fx, top: fy, opacity: frame < entrainer && inP >= 1 ? 0.0 : 1}}>
            <Feuille w={64} hi />
          </div>
        ) : null}
        {/* pop in : les modèles, sur « entraîner » ; libellé sur « OpenAI ». */}
        <Pop at={entrainer} style={{position: 'absolute', left: MODEL_M.x, top: MODEL_M.y}}>
          <div style={{boxShadow: frame >= entrainer + 18 ? `0 0 ${30 * ease(frame, entrainer + 18, entrainer + 26)}px ${accent}` : 'none'}}>
            <Model w={MODEL_M.w} />
          </div>
        </Pop>
        <Pop at={openai} style={{position: 'absolute', left: MODEL_M.x + 40, top: MODEL_M.y + 210}}>
          <Mono size={56} color="#fff">OpenAI</Mono>
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 6. Et donc : le mur du réseau et la 4G, puis le compte entreprise et la règle d'une ligne ----------

const WALL = {x: 400, y: 60, w: 90, h: 360};

const Mur: React.FC = () => (
  <div style={{position: 'relative', width: WALL.w, height: WALL.h, background: '#7a3b2e', overflow: 'hidden', border: '4px solid #3a1d16', boxSizing: 'border-box'}}>
    {Array.from({length: 12}, (_, r) => (
      <div key={r} style={{position: 'absolute', left: r % 2 ? -22 : 0, top: r * 30, width: 140, height: 4, background: '#3a1d16'}}>
        {[0, 1, 2].map((c) => <div key={c} style={{position: 'absolute', left: c * 44 + 20, top: 0, width: 4, height: 30, background: '#3a1d16'}} />)}
      </div>
    ))}
  </div>
);

const EtDonc: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const reseau = at('etdonc', 'réseau');
  const g4 = at('etdonc', '4G');
  const poche = at('etdonc', 'poche');
  const marche = at('etdonc', 'marche');
  const entreprise = at('etdonc', 'entreprise');
  const aucun = at('etdonc', 'aucun');
  const regle = at('etdonc', 'règle');
  // La bulle part du téléphone et passe au-dessus du mur, en arc, sur « poche ».
  const hop = ease(frame, poche, poche + 20, [0, 1], 'inOut');
  const [bx, by] = arc(hop, [150, 400], [640, 140], 140);
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 640}}>
        {/* Première idée : le réseau bloqué, la 4G qui passe au-dessus. Elle s'efface sur « marche ». */}
        <div style={{position: 'absolute', inset: 0, opacity: gone(frame, marche)}}>
          {/* Le décor : le portable du bureau à gauche, la bulle de chat à droite, l'accès barré. */}
          <div style={{position: 'absolute', left: 0, top: 120}}>
            <Laptop w={300} />
          </div>
          <div style={{position: 'absolute', left: 620, top: 130, width: 240, height: 120, borderRadius: 30, border: '6px solid #555', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div style={{width: 140, height: 14, background: '#9a9a9a'}} />
          </div>
          {/* draw-on : l'accès du portable vers la bulle, coupé au mur ; croix rouge sur « réseau ». */}
          <svg width={W} height={640} style={{position: 'absolute', left: 0, top: 0}}>
            <path d="M290 230 L396 230" fill="none" stroke={accent} strokeWidth={8} strokeDasharray="18 12" strokeDashoffset={106 * (1 - ease(frame, reseau, reseau + 10))} opacity={frame >= reseau ? 1 : 0} />
          </svg>
          <Pop at={reseau + 10} style={{position: 'absolute', left: 300, top: 250, lineHeight: 0}}>
            <Cross p={ease(frame, reseau + 10, reseau + 22)} size={90} />
          </Pop>
          {/* pop in : le mur du réseau, sur « réseau » ; libellé 5 images après. */}
          <Pop at={reseau} style={{position: 'absolute', left: WALL.x, top: WALL.y}}>
            <Mur />
          </Pop>
          <Pop at={reseau + 5} style={{position: 'absolute', left: WALL.x - 60, top: WALL.y + WALL.h + 12}}>
            <Mono size={48} color={LABEL}>réseau</Mono>
          </Pop>
          {/* pop in : le téléphone en 4G, sur « 4G » ; sa bulle saute le mur sur « poche ». */}
          <Pop at={g4} style={{position: 'absolute', left: 110, top: 410}}>
            <Phone w={140} h={220}>
              <Chat k={0.5} lines={1} />
            </Phone>
          </Pop>
          <Pop at={g4 + 5} style={{position: 'absolute', left: 270, top: 560}}>
            <Mono size={64}>4G</Mono>
          </Pop>
          {frame >= poche ? (
            <div style={{position: 'absolute', left: bx, top: by, width: 90, height: 56, borderRadius: 20, background: withAlpha(accent, 0.85), opacity: hop >= 1 ? 0 : 1}} />
          ) : null}
          {frame >= poche + 20 ? (
            <div style={{position: 'absolute', left: 640, top: 140, width: 200, height: 100, borderRadius: 26, background: withAlpha(accent, 0.25 * ease(frame, poche + 20, poche + 28))}} />
          ) : null}
        </div>
        {/* Deuxième idée : la carte « compte entreprise », son interrupteur éteint sur « aucun » ; puis la règle d'une ligne. */}
        <Pop at={entreprise} style={{position: 'absolute', left: 0, top: 40, width: 640, background: '#1b1b1b', border: `6px solid ${accent}`, borderRadius: 26, boxSizing: 'border-box', padding: '30px 34px', display: 'flex', flexDirection: 'column', gap: 30}}>
          <Mono size={52} color="#fff">compte entreprise</Mono>
          <div style={{display: 'flex', alignItems: 'center', gap: 30}}>
            <div style={{flex: 1, height: 14, background: '#4a4a4a'}} />
            <Toggle w={130} on={ease(frame, aucun, aucun + 8, [1, 0])} />
          </div>
        </Pop>
        <Pop at={regle} style={{position: 'absolute', left: 560, top: 300, width: 300, height: 300, background: '#f3dd8a', boxShadow: pixelShadow('#444'), transform: 'rotate(4deg)'}}>
          <svg width={300} height={300} viewBox="0 0 300 300">
            <Draw d="M40 150 L260 150" p={ease(frame, regle + 6, regle + 30)} color="#111" width={12} len={230} />
          </svg>
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 7. Chute : retour au bureau du troisième ; la loupe, puis la photocopieuse réparée ----------

const Chute: React.FC = () => {
  const frame = useCurrentFrame();
  const triche = at('chute', 'triche');
  const repare = at('chute', 'répare');
  // La loupe passe sur les deux collègues sur « triche » (aller simple, inOut).
  const lx = ease(frame, triche - 4, triche + 22, [440, 700], 'inOut');
  // L'affichette tombe sur « répare » (anticipation : un petit recul, puis la chute).
  const fall = ease(frame, repare + 3, repare + 18, [0, 1], 'inOut');
  const lift = ease(frame, repare - 3, repare + 3, [0, 1], 'inOut') * (1 - fall);
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 640}}>
        {/* Le décor : le bureau, la photocopieuse et son affichette, les deux collègues. */}
        <div style={{position: 'absolute', left: 0, top: 0, width: W, height: 640, background: '#1a1a1a', border: '6px solid #8a8a8a', boxSizing: 'border-box'}} />
        <div style={{position: 'absolute', right: 26, top: 16}}>
          <Mono size={52} color={LABEL}>3e</Mono>
        </div>
        <div style={{position: 'absolute', left: 40, top: 250, lineHeight: 0}}>
          <Copieur w={340} ok={frame >= repare + 8 ? 1 : 0} />
        </div>
        <div style={{position: 'absolute', left: 70, top: 170 + 500 * fall - 12 * lift, opacity: 1 - fall, transform: `rotate(${-6 + 70 * fall}deg)`}}>
          <Affiche w={310} h={90} tilt={0}>
            <Mono size={56} color={RED}>en panne</Mono>
          </Affiche>
        </div>
        <div style={{position: 'absolute', left: 480, top: 630 - 15 * 14, lineHeight: 0}}>
          <Pixel sprite={COL_A} px={14} seed={1} />
        </div>
        <div style={{position: 'absolute', left: 670, top: 630 - 15 * 14, lineHeight: 0}}>
          <Pixel sprite={COL_B} px={14} seed={4} />
        </div>
        {/* La loupe, sur « triche » : elle passe sur les collègues puis s'efface sur « répare ». */}
        {frame >= triche - 4 ? (
          <div style={{position: 'absolute', left: lx, top: 300, opacity: gone(frame, repare)}}>
            <Loupe w={150} />
          </div>
        ) : null}
        {/* pop in : la coche sur la photocopieuse, sur « répare » ; les copies sortent en cascade. */}
        <Pop at={repare + 8} style={{position: 'absolute', left: 150, top: 60}}>
          <Check p={ease(frame, repare + 8, repare + 20)} size={170} color="#5FD3A0" />
        </Pop>
        {[0, 1, 2, 3].map((i) => {
          const t = repare + 14 + 6 * i;
          const p = ease(frame, t, t + 12);
          return frame >= t ? (
            <div key={i} style={{position: 'absolute', left: 380 + 14 * p + i * 4, top: 380 + 120 * p + i * 8 - 20, transform: `rotate(${6 * i - 6}deg)`, zIndex: 0}}>
              <Feuille w={70} />
            </div>
          ) : null;
        })}
      </div>
    </Scene>
  );
};

// ---------- Montage ----------

const SCENES: Record<string, React.FC> = {hook: Hook, intro: Intro, base: Base, nom: Nom, image: Photocopie, mecanisme: Mecanisme, etdonc: EtDonc, chute: Chute};

export const ShadowAiVoix: React.FC = () => <V.Montage scenes={SCENES} accent={AC} />;

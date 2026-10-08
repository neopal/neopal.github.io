// Short Mythe « L'intelligence artificielle n'existe pas » (YouTube / TikTok), voix off PAL - FR, préparé le 2026-10-08.
// Faits et citations : fiche mythe-ia-n-existe-pas de lexique/terms.js (livres de Luc Julia, 2019 et 2025 ; proposition
// de Dartmouth, 31 août 1955 ; Jones et Bergen, mars 2025, GPT-4.5 jugé humain dans 73 % des cas avec une consigne
// de persona ; Sénat, audition du 18 juin 2025, « j'affirme qu'elles le sont déjà depuis longtemps »).
// Portrait : public/voix/ia-n-existe-pas-julia.png, 48 x 63 pixels en 5 gris, tiré de « Luc Julia 2019 (cropped).jpg »
// (Wikimedia Commons, capture d'une vidéo du CESE, CC BY 3.0) : créditer dans la description. Il reste neutre ;
// l'emoji qui se retourne vise l'affirmation, pas la personne.
// Le moteur (calage, sous-titres, montage) est dans voix/VoixShort.tsx ; ce fichier ne contient que les scènes.
import React from 'react';
import {Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Big, Check, Dots, Mono, Pop, Say, Scene, W, clamp, useAccent, withAlpha} from './kit';
import {LABEL, blink, makeVoix} from './voix/VoixShort';
import ALIGN from './voix/ia-n-existe-pas.align.json';
import SCRIPT from './voix/ia-n-existe-pas.script.json';

const AC = '#FF7A7A'; // catégorie Mythes vs réalité
const V = makeVoix(ALIGN, SCRIPT, 'voix/prediction-music.mp3');
const {at} = V;
export const MYTHEEXISTEPASVOIX_DURATION = V.duration;

// Ombre en escalier : l'effet « pixel » des couvertures et des cartes.
const pixelShadow = (c: string) => `8px 8px 0 ${c}`;

// ---------- 0. Hook : le mythe entre guillemets, puis « vraiment ? » ----------

const Hook: React.FC = () => {
  const accent = useAccent();
  const q = at('hook', 'vraiment');
  return (
    <Scene>
      <div style={{display: 'flex', flexDirection: 'column', gap: 6}}>
        <Pop at={0}><Big size={104}>« L'intelligence</Big></Pop>
        <Pop at={3}><Big size={104}>artificielle</Big></Pop>
        <Pop at={6}><Big size={104}>n'existe pas »</Big></Pop>
        <Pop at={q} style={{marginTop: 24}}><Big size={124} color={accent}>vraiment ?</Big></Pop>
      </div>
    </Scene>
  );
};

// ---------- 1. Le livre : les vraies couvertures, en pixel art lo-fi ----------
// public/voix/ia-n-existe-pas-livre-2019.png (64 x 103) et -2025.png (64 x 96) : couvertures réduites à 12 couleurs.
// Sources : frenchrights.com (First éditions, 2019) et critiqueslibres.com (Le Cherche Midi, 2025). Montrées pour
// commenter les livres ; crédit dans la description.

const Book: React.FC<{src: string; w: number; h: number; reveal: number}> = ({src, w, h, reveal}) => (
  <div style={{border: '6px solid #000', boxShadow: pixelShadow('#444'), lineHeight: 0}}>
    <Img src={staticFile(src)} style={{width: w * 5, height: h * 5, imageRendering: 'pixelated', clipPath: `inset(0 0 ${100 - (Math.floor(reveal * h) / h) * 100}% 0)`}} />
  </div>
);

const Livre: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const accent = useAccent();
  const titre = at('livre', 'titre');
  const y2019 = at('livre', '2019');
  const suite = at('livre', 'suite');
  const toujours = at('livre', 'toujours');
  const verif = at('livre', 'vérifie');
  const slide = spring({frame: frame - suite, fps, config: {damping: 14, stiffness: 160}});
  const stamp = spring({frame: frame - toujours, fps, config: {damping: 9, stiffness: 220}});
  const lens = interpolate(frame, [verif, verif + 14], [0, 1], clamp);
  const X2 = W - 320 - 12; // couverture 2025 : 320 x 480
  const Y2 = 90;
  return (
    <Scene>
      <div style={{position: 'relative', height: 640}}>
        <Pop at={titre} style={{position: 'absolute', left: 0, top: 0}}>
          <Book src="voix/ia-n-existe-pas-livre-2019.png" w={64} h={103} reveal={interpolate(frame, [titre, titre + 18], [0, 1], clamp)} />
        </Pop>
        <Pop at={y2019} style={{position: 'absolute', left: 0, top: 545}}>
          <Mono size={52} color="#fff">2019</Mono>
        </Pop>
        {frame >= suite ? (
          <div style={{position: 'absolute', left: X2, top: Y2, transform: `translateX(${(1 - slide) * 500}px) rotate(${3 * slide}deg)`}}>
            <Book src="voix/ia-n-existe-pas-livre-2025.png" w={64} h={96} reveal={1} />
            <div style={{position: 'absolute', right: 0, top: 492}}><Mono size={52} color="#fff">2025</Mono></div>
            {/* Le sous-titre « n'existe (toujours) pas », illisible en pixels : le tampon le redit. */}
            <div style={{position: 'absolute', left: 14, top: 392, padding: '6px 14px', background: '#0b0b0b', border: `4px solid ${accent}`, transform: `scale(${0.4 + 0.6 * stamp}) rotate(${-8 * stamp}deg)`, opacity: frame >= toujours ? 1 : 0}}>
              <Mono size={52} color={accent}>(toujours)</Mono>
            </div>
          </div>
        ) : null}
        {/* La loupe se pose sur « (toujours) » quand la voix dit « on vérifie ». */}
        <svg width={230} height={230} viewBox="0 0 100 100" style={{position: 'absolute', left: X2 + 110, top: Y2 + 330, opacity: lens, transform: `scale(${0.7 + 0.3 * lens})`}}>
          <circle cx="40" cy="40" r="28" fill="none" stroke="#fff" strokeWidth="7" />
          <path d="M60 60 L88 88" stroke="#fff" strokeWidth="12" strokeLinecap="square" />
        </svg>
      </div>
    </Scene>
  );
};

// ---------- 2. Dartmouth, 1955 : le pari écrit noir sur blanc ----------

const Dartmouth: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const t0 = at('dartmouth', '1955');
  const pari = at('dartmouth', 'pari');
  const intel = at('dartmouth', 'intelligence');
  const machine = at('dartmouth', 'machine');
  const lines = interpolate(frame, [t0 + 6, pari], [0, 1], clamp);
  const mark = interpolate(frame, [intel, intel + 10], [0, 1], clamp);
  return (
    <Scene gap={40}>
      <Pop at={t0} style={{background: '#efe9dc', border: '8px solid #000', boxShadow: pixelShadow('#444'), padding: '36px 40px', display: 'flex', flexDirection: 'column', gap: 22}}>
        <Mono size={56} color="#111">Dartmouth, 1955</Mono>
        {[92, 84, 70].map((w, k) => (
          <div key={k} style={{height: 18, background: '#9a9384', width: `${w * interpolate(lines, [k / 3, (k + 1) / 3], [0, 1], clamp)}%`}} />
        ))}
        <div style={{opacity: frame >= intel ? 1 : 0, alignSelf: 'flex-start', position: 'relative', padding: '4px 10px'}}>
          <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: `${mark * 100}%`, background: withAlpha(accent, 0.55)}} />
          <div style={{position: 'relative'}}><Mono size={60} color="#111">intelligence</Mono></div>
        </div>
      </Pop>
      <Pop at={machine} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 28}}>
        <Mono size={72} color={LABEL}>→</Mono>
        {/* Une machine en pixel art : écran, pied. */}
        <svg width={170} height={150} viewBox="0 0 17 15" shapeRendering="crispEdges">
          <rect x="0" y="0" width="17" height="11" fill="#fff" />
          <rect x="1" y="1" width="15" height="9" fill="#111" />
          <rect x="3" y="3" width="2" height="2" fill={accent} opacity={blink(frame)} />
          <rect x="6" y="3" width="7" height="2" fill="#777" />
          <rect x="3" y="6" width="9" height="2" fill="#777" />
          <rect x="7" y="11" width="3" height="2" fill="#fff" />
          <rect x="4" y="13" width="9" height="2" fill="#fff" />
        </svg>
      </Pop>
    </Scene>
  );
};

// ---------- 3. Le mot : conscience, débat ouvert ; discipline, elle existe ----------

const Branch: React.FC<{label: string; at: number; verdict: React.ReactNode; verdictAt: number; on: boolean}> = ({label, at: a, verdict, verdictAt, on}) => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  return (
    <Pop at={a} style={{border: `6px solid ${on ? accent : '#666'}`, boxShadow: pixelShadow(on ? withAlpha(accent, 0.35) : '#222'), padding: '28px 34px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
      <Say size={64}>{label}</Say>
      <div style={{opacity: frame >= verdictAt ? 1 : 0, display: 'flex', alignItems: 'center', gap: 14}}>{verdict}</div>
    </Pop>
  );
};

const Mot: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const disc = at('mot', 'discipline');
  const consc = at('mot', 'conscience', 1);
  const ouvert = at('mot', 'ouvert');
  const disc2 = at('mot', 'discipline', 1);
  const fausse = at('mot', 'fausse');
  return (
    <Scene gap={44}>
      <Pop at={4} style={{display: 'flex', justifyContent: 'center'}}><Big size={120}>intelligence</Big></Pop>
      <Branch label="conscience" at={consc} verdictAt={ouvert} on={false} verdict={<div style={{opacity: blink(frame)}}><Big size={100} color="#fff">?</Big></div>} />
      <Branch
        label="discipline"
        at={disc}
        verdictAt={disc2}
        on={frame >= fausse}
        verdict={<><Mono size={52} color={accent}>existe</Mono><Check p={interpolate(frame, [disc2, disc2 + 10], [0, 1], clamp)} size={80} color={accent} /></>}
      />
    </Scene>
  );
};

// ---------- 4. Le test de Turing à trois : la machine prise pour l'humain ----------

const Chat: React.FC<{name: string; reveal: boolean; machine: boolean; at: number}> = ({name, reveal, machine, at: a}) => {
  const accent = useAccent();
  return (
    <Pop at={a} style={{flex: 1, height: 360, border: `6px solid ${reveal && machine ? accent : '#666'}`, boxShadow: pixelShadow('#222'), display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', padding: '26px 0'}}>
      <Big size={110} color="#fff">{name}</Big>
      {reveal ? <Mono size={52} color={machine ? accent : LABEL}>{machine ? 'GPT-4.5' : 'humain'}</Mono> : <Dots />}
    </Pop>
  );
};

const Turing: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const accent = useAccent();
  const disc = at('turing', 'discutent');
  const pers = at('turing', 'personnage');
  const pct = at('turing', '73');
  const mach = at('turing', 'machine');
  const pick = spring({frame: frame - pct, fps, config: {damping: 12, stiffness: 200}});
  return (
    <Scene
      gap={40}
      bottom={
        <Pop at={pct} style={{display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 22}}>
          <Mono size={110} color={accent}>73 %</Mono>
          <Mono size={48} color={LABEL}>pris pour l'humain</Mono>
        </Pop>
      }
    >
      <div style={{display: 'flex', gap: 30}}>
        <Chat name="A" at={disc} reveal={frame >= mach} machine={false} />
        <Chat name="B" at={disc + 5} reveal={frame >= mach} machine />
      </div>
      {/* « humain ? » : l'interrogateur désigne B. */}
      <Pop at={pers} style={{display: 'flex', justifyContent: 'center'}}>
        <div style={{transform: `translateX(${(W / 4 + 15) * pick}px)`, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <Mono size={64} color="#fff">▲</Mono>
          <Mono size={52} color="#fff">humain ?</Mono>
        </div>
      </Pop>
    </Scene>
  );
};

// ---------- 5. Le Sénat : ses propres mots, et l'emoji qui se retourne ----------

// Emoji en pixel art, 12 x 12 : # visage, o yeux, m bouche. Il pivote de 180° : le sourire passe à l'envers.
const FACE = [
  '...######...',
  '..########..',
  '.##########.',
  '###o####o###',
  '###o####o###',
  '############',
  '############',
  '##m######m##',
  '.##mmmmmm##.',
  '.##########.',
  '..########..',
  '...######...',
];

const PixelFace: React.FC<{size: number; flip: number}> = ({size, flip}) => (
  <svg width={size} height={size} viewBox="0 0 12 12" shapeRendering="crispEdges" style={{transform: `rotate(${180 * flip}deg)`}}>
    {FACE.flatMap((row, y) => [...row].map((c, x) => (c === '.' ? null : <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={c === '#' ? '#FFD23F' : '#2a1a00'} />)))}
  </svg>
);

const Senat: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const accent = useAccent();
  const senat = at('senat', 'Sénat');
  const declare = at('senat', 'déclaré');
  const reveal = interpolate(frame, [4, 24], [0, 1], clamp);
  const pasmal = at('senat', 'Pas');
  const existe = at('senat', 'existe');
  const flip = spring({frame: frame - existe, fps, config: {damping: 10, stiffness: 120}});
  return (
    <Scene
      gap={34}
      bottom={
        <Pop at={pasmal} style={{display: 'flex', justifyContent: 'center'}}>
          <div style={{filter: `drop-shadow(0 0 ${30 * flip}px ${withAlpha(accent, 0.6)})`}}><PixelFace size={200} flip={flip} /></div>
        </Pop>
      }
    >
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 36}}>
        <Pop at={4} style={{border: `6px solid ${accent}`, boxShadow: pixelShadow(withAlpha(accent, 0.35)), lineHeight: 0}}>
          {/* Le portrait se dessine rangée de pixels par rangée. */}
          <Img src={staticFile('voix/ia-n-existe-pas-julia.png')} style={{width: 240, height: 315, imageRendering: 'pixelated', clipPath: `inset(0 0 ${100 - (Math.floor(reveal * 63) / 63) * 100}% 0)`}} />
        </Pop>
        <Pop at={senat} style={{display: 'flex', flexDirection: 'column', gap: 6, paddingBottom: 6}}>
          <Mono size={56} color="#fff">Luc Julia</Mono>
          <Mono size={48} color={LABEL}>Sénat</Mono>
          <Mono size={48} color={LABEL}>18 juin 2025</Mono>
        </Pop>
      </div>
      <Pop at={declare} style={{border: '6px solid #fff', boxShadow: pixelShadow('#444'), padding: '30px 36px', display: 'flex', flexDirection: 'column', gap: 16}}>
        <Say size={60}>« j'affirme qu'elles le sont déjà depuis longtemps »</Say>
        <Mono size={48} color={LABEL}>plus intelligentes que nous</Mono>
      </Pop>
    </Scene>
  );
};

// ---------- 6. Chute : de quelle intelligence parle-t-on ? ----------

const Chute: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const quelle = at('chute', 'quelle');
  const lit = interpolate(frame, [quelle, quelle + 8], [0, 1], clamp);
  return (
    <Scene>
      <div style={{display: 'flex', flexDirection: 'column', gap: 6}}>
        <Pop at={4}><Big size={104}>« L'IA</Big></Pop>
        <Pop at={8}><Big size={104}>n'existe pas »</Big></Pop>
      </div>
      <Pop at={quelle} style={{display: 'flex', alignItems: 'center', gap: 24, marginTop: 40}}>
        <div style={{border: `6px solid ${accent}`, boxShadow: pixelShadow(withAlpha(accent, 0.35)), padding: '18px 28px', background: withAlpha(accent, 0.12 * lit)}}>
          <Big size={110} color={accent}>intelligence</Big>
        </div>
        <div style={{opacity: blink(frame)}}><Big size={130} color={accent}>?</Big></div>
      </Pop>
    </Scene>
  );
};

// ---------- Montage ----------

const SCENES: Record<string, React.FC> = {hook: Hook, livre: Livre, dartmouth: Dartmouth, mot: Mot, turing: Turing, senat: Senat, chute: Chute};

export const MytheExistePasVoix: React.FC = () => <V.Montage scenes={SCENES} accent={AC} />;

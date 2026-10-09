// Short Mythe « L'intelligence artificielle n'existe pas » (YouTube / TikTok), voix off PAL - FR, préparé le 2026-10-08.
// Faits et citations : fiche mythe-ia-n-existe-pas de lexique/terms.js (livres de Luc Julia, 2019 et 2025 ; présentation
// du livre de 2019, notice INSP : une discipline « qui n'avait rien à voir avec l'intelligence » ; proposition de
// Dartmouth, 31 août 1955 ; Jones et Bergen, mars 2025, GPT-4.5 jugé humain dans 73 % des cas avec une consigne de
// persona ; Sénat, audition du 18 juin 2025, « j'affirme qu'elles le sont déjà depuis longtemps », supérieures « dans
// les domaines spécifiques pour lesquels elles ont été créées »).
// Le fil (v4) : l'auteur de la formule dit lui-même au Sénat que ces IA nous dépassent ; les deux tiennent parce
// qu'il joue sur le mot, alors que le nom désigne depuis 1955 une discipline qui parie sur l'intelligence ; la chute
// corrige le titre d'un mot (« consciente »). La pique vise la formule, jamais la personne.
// Portrait : public/voix/ia-n-existe-pas-julia.png, 48 x 63 pixels en 5 gris, tiré de « Luc Julia 2019 (cropped).jpg »
// (Wikimedia Commons, capture d'une vidéo du CESE, CC BY 3.0) : créditer dans la description.
// Le moteur (calage, sous-titres, montage) est dans voix/VoixShort.tsx ; ce fichier ne contient que les scènes.
import React from 'react';
import {Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Big, Check, Dots, Mono, Pop, Say, Scene, W, clamp, useAccent, withAlpha} from './kit';
import {LABEL, makeVoix} from './voix/VoixShort';
import ALIGN from './voix/ia-n-existe-pas.align.json';
import SCRIPT from './voix/ia-n-existe-pas.script.json';

const AC = '#FF7A7A'; // catégorie Mythes vs réalité
const V = makeVoix(ALIGN, SCRIPT, 'voix/prediction-music.mp3');
const {at} = V;
export const MYTHEEXISTEPASVOIX_DURATION = V.duration;

// Ombre en escalier : l'effet « pixel » des couvertures et des cartes.
const pixelShadow = (c: string) => `8px 8px 0 ${c}`;

// Un élément qui a fini son rôle s'efface en 6 images : rien ne reste à l'écran sans raison.
const gone = (frame: number, until: number) => interpolate(frame, [until, until + 6], [1, 0], clamp);

// ---------- 0. Hook : la formule, puis l'exception ----------

const Hook: React.FC = () => {
  const accent = useAccent();
  const sauf = at('hook', 'sauf');
  return (
    <Scene>
      <div style={{display: 'flex', flexDirection: 'column', gap: 6}}>
        <Pop at={0}><Big size={104}>« L'intelligence</Big></Pop>
        <Pop at={3}><Big size={104}>artificielle</Big></Pop>
        <Pop at={6}><Big size={104}>n'existe pas »</Big></Pop>
        <Pop at={sauf} style={{marginTop: 36}}><Say size={72} color={accent}>…sauf quand son auteur parle au Sénat.</Say></Pop>
      </div>
    </Scene>
  );
};

// ---------- 1. Les livres : les vraies couvertures, en pixel art ----------
// public/voix/ia-n-existe-pas-livre-2019.png (160 x 238) et -2025.png (160 x 240), 32 couleurs, affichées à x2.
// Sources : sorbonne-universite.fr (First éditions, 2019) et la vignette Amazon (Le Cherche Midi, 2025). Montrées
// pour commenter les livres ; crédit dans la description.

const SCALE = 2;
const Book: React.FC<{src: string; w: number; h: number; reveal: number}> = ({src, w, h, reveal}) => (
  <div style={{border: '6px solid #000', boxShadow: pixelShadow('#444'), lineHeight: 0}}>
    <Img src={staticFile(src)} style={{width: w * SCALE, height: h * SCALE, imageRendering: 'pixelated', clipPath: `inset(0 0 ${100 - (Math.floor(reveal * h) / h) * 100}% 0)`}} />
  </div>
);

const Livre: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const accent = useAccent();
  const livre = at('livre', 'titre');
  const y2019 = at('livre', '2019');
  const suite = at('livre', 'suite');
  const toujours = at('livre', 'toujours');
  const slide = spring({frame: frame - suite, fps, config: {damping: 14, stiffness: 160}});
  const ring = spring({frame: frame - toujours, fps, config: {damping: 10, stiffness: 220}});
  const X2 = W - 320 - 12; // couverture 2025 : 320 x 480
  const Y2 = 90;
  return (
    <Scene>
      <div style={{position: 'relative', height: 640}}>
        <Pop at={livre} style={{position: 'absolute', left: 0, top: 0}}>
          <Book src="voix/ia-n-existe-pas-livre-2019.png" w={160} h={238} reveal={interpolate(frame, [livre, livre + 18], [0, 1], clamp)} />
        </Pop>
        <Pop at={y2019} style={{position: 'absolute', left: 0, top: 500}}>
          <Mono size={52} color="#fff">2019</Mono>
        </Pop>
        {frame >= suite ? (
          <div style={{position: 'absolute', left: X2, top: Y2, transform: `translateX(${(1 - slide) * 500}px) rotate(${3 * slide}deg)`}}>
            <Book src="voix/ia-n-existe-pas-livre-2025.png" w={160} h={240} reveal={1} />
            <div style={{position: 'absolute', right: 0, top: 504}}><Mono size={52} color="#fff">2025</Mono></div>
            {/* Le cadre entoure le vrai « (TOUJOURS) » du sous-titre ; blanc, car l'accent se perd sur le bandeau rouge. */}
            <div style={{position: 'absolute', left: 90, top: 402, width: 116, height: 48, border: '6px solid #fff', boxShadow: '0 0 24px rgba(255,255,255,0.7)', opacity: frame >= toujours ? 1 : 0, transform: `scale(${1.6 - 0.6 * ring})`}} />
          </div>
        ) : null}
      </div>
    </Scene>
  );
};

// ---------- 2. Le Sénat : ses propres mots, avec la réserve ----------

const Senat: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const date = at('senat', '18');
  const senateurs = at('senat', 'sénateurs');
  const intel = at('senat', 'intelligentes');
  const domaines = at('senat', 'domaines');
  const reveal = interpolate(frame, [date, date + 20], [0, 1], clamp);
  return (
    <Scene gap={30}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 36}}>
        <Pop at={date} style={{border: `6px solid ${accent}`, boxShadow: pixelShadow(withAlpha(accent, 0.35)), lineHeight: 0}}>
          {/* Le portrait se dessine rangée de pixels par rangée. */}
          <Img src={staticFile('voix/ia-n-existe-pas-julia.png')} style={{width: 144, height: 189, imageRendering: 'pixelated', clipPath: `inset(0 0 ${100 - (Math.floor(reveal * 63) / 63) * 100}% 0)`}} />
        </Pop>
        <div style={{display: 'flex', flexDirection: 'column', gap: 6, paddingBottom: 6}}>
          <Pop at={date}><Mono size={56} color="#fff">Luc Julia</Mono></Pop>
          <Pop at={senateurs}><Mono size={48} color={LABEL}>Sénat</Mono></Pop>
          <Pop at={date}><Mono size={48} color={LABEL}>18 juin 2025</Mono></Pop>
        </div>
      </div>
      <Pop at={intel} style={{border: '6px solid #fff', boxShadow: pixelShadow('#444'), padding: '30px 36px', display: 'flex', flexDirection: 'column', gap: 16}}>
        <Mono size={48} color={LABEL}>plus intelligentes que nous ?</Mono>
        <Say size={60}>« j'affirme qu'elles le sont déjà depuis longtemps »</Say>
        <div style={{opacity: frame >= domaines ? 1 : 0, alignSelf: 'flex-start', padding: '4px 12px', background: withAlpha(accent, 0.2), border: `4px solid ${accent}`}}>
          <Mono size={48} color={accent}>domaines spécifiques</Mono>
        </div>
      </Pop>
    </Scene>
  );
};

// ---------- 3. Le mot : la machine consciente, jamais montrée ; la discipline, elle, existe ----------

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
  const consc = at('mot', 'consciente');
  const montre = at('mot', 'montré');
  const disc = at('mot', 'discipline');
  const y1956 = at('mot', '1956');
  return (
    <Scene gap={44}>
      <Pop at={4} style={{display: 'flex', justifyContent: 'center'}}><Big size={120}>intelligence</Big></Pop>
      <Branch label="conscience" at={consc} verdictAt={montre} on={false} verdict={<Mono size={52} color="#fff">jamais montrée</Mono>} />
      <Branch
        label="discipline"
        at={disc}
        verdictAt={y1956}
        on={frame >= y1956}
        verdict={<><Mono size={52} color={accent}>depuis 1956</Mono><Check p={interpolate(frame, [y1956, y1956 + 10], [0, 1], clamp)} size={80} color={accent} /></>}
      />
    </Scene>
  );
};

// ---------- 4. Dartmouth : « rien à voir avec l'intelligence », contre le texte de 1955 ----------

const Dartmouth: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const pres = at('dartmouth', 'présentation');
  const alors = at('dartmouth', 'alors');
  const y1955 = at('dartmouth', '1955');
  const pari = at('dartmouth', 'pariait');
  const machine = at('dartmouth', 'précisément');
  const strike = interpolate(frame, [alors, alors + 8], [0, 1], clamp);
  const mark = interpolate(frame, [pari, pari + 10], [0, 1], clamp);
  return (
    <Scene>
      <div style={{position: 'relative', height: 640}}>
        {/* La présentation du livre, barrée quand la voix dit « alors que ». */}
        <Pop at={pres} style={{position: 'absolute', left: 0, right: 0, top: 120, opacity: gone(frame, y1955), border: '6px solid #fff', boxShadow: pixelShadow('#444'), padding: '30px 36px', display: 'flex', flexDirection: 'column', gap: 16}}>
          <Mono size={48} color={LABEL}>présentation du livre</Mono>
          <div style={{position: 'relative'}}>
            <Say size={64}>« rien à voir avec l'intelligence »</Say>
            <div style={{position: 'absolute', left: 0, top: '50%', height: 10, width: `${strike * 100}%`, background: accent}} />
          </div>
        </Pop>
        {/* Le projet de 1955 : son pari, écrit en toutes lettres. */}
        <Pop at={y1955} style={{position: 'absolute', left: 0, right: 0, top: 40, background: '#efe9dc', border: '8px solid #000', boxShadow: pixelShadow('#444'), padding: '36px 40px', display: 'flex', flexDirection: 'column', gap: 22}}>
          <Mono size={56} color="#111">Dartmouth, 1955</Mono>
          <div style={{alignSelf: 'flex-start', position: 'relative', padding: '4px 10px'}}>
            <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: `${mark * 100}%`, background: withAlpha(accent, 0.55)}} />
            <div style={{position: 'relative'}}><Say size={64} color="#111">simuler l'intelligence</Say></div>
          </div>
        </Pop>
        <Pop at={machine} style={{position: 'absolute', left: 0, right: 0, top: 380, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 28}}>
          <Mono size={72} color={LABEL}>→</Mono>
          {/* Une machine en pixel art : écran, pied. */}
          <svg width={204} height={180} viewBox="0 0 17 15" shapeRendering="crispEdges">
            <rect x="0" y="0" width="17" height="11" fill="#fff" />
            <rect x="1" y="1" width="15" height="9" fill="#111" />
            <rect x="3" y="3" width="2" height="2" fill={accent} />
            <rect x="6" y="3" width="7" height="2" fill="#777" />
            <rect x="3" y="6" width="9" height="2" fill="#777" />
            <rect x="7" y="11" width="3" height="2" fill="#fff" />
            <rect x="4" y="13" width="9" height="2" fill="#fff" />
          </svg>
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 5. Le test de Turing à trois : 73 % contre 27 % ----------

const Chat: React.FC<{name: string; reveal: boolean; machine: boolean; at: number}> = ({name, reveal, machine, at: a}) => {
  const accent = useAccent();
  return (
    <Pop at={a} style={{flex: 1, height: 300, border: `6px solid ${reveal && machine ? accent : '#666'}`, boxShadow: pixelShadow('#222'), display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', padding: '26px 0'}}>
      <Big size={110} color="#fff">{name}</Big>
      {reveal ? <Mono size={52} color={machine ? accent : LABEL}>{machine ? 'GPT-4.5' : 'humain'}</Mono> : <Dots />}
    </Pop>
  );
};

// Barre « pris pour l'humain » qui se remplit jusqu'à sa part.
const Bar: React.FC<{label: string; pct: number; p: number; color: string}> = ({label, pct, p, color}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: 20, opacity: p > 0 ? 1 : 0}}>
    <div style={{width: 230}}><Mono size={48} color={LABEL}>{label}</Mono></div>
    <div style={{flex: 1, height: 52, position: 'relative'}}>
      <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: `${pct * p}%`, background: color}} />
    </div>
    <div style={{width: 150, textAlign: 'right'}}><Mono size={56} color={color}>{Math.round(pct * p)} %</Mono></div>
  </div>
);

const Turing: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const prennent = at('turing', 'prennent');
  const pct = at('turing', '73');
  const vrai = at('turing', 'vrai');
  const pM = interpolate(frame, [pct, pct + 16], [0, 1], clamp);
  const pH = interpolate(frame, [vrai, vrai + 12], [0, 1], clamp);
  return (
    <Scene gap={44}>
      <div style={{display: 'flex', gap: 30}}>
        <Chat name="A" at={4} reveal={frame >= prennent} machine={false} />
        <Chat name="B" at={9} reveal={frame >= prennent} machine />
      </div>
      <div style={{display: 'flex', flexDirection: 'column', gap: 18}}>
        <Pop at={pct}><Mono size={48} color="#fff">pris pour l'humain</Mono></Pop>
        <Bar label="GPT-4.5" pct={73} p={pM} color={accent} />
        <Bar label="humain" pct={27} p={pH} color="#fff" />
      </div>
    </Scene>
  );
};

// ---------- 6. Chute : le titre corrigé d'un mot ----------

const Chute: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const accent = useAccent();
  const consc = at('chute', 'consciente');
  const titre = at('chute', 'titre');
  const ins = spring({frame: frame - consc, fps, config: {damping: 13, stiffness: 180}});
  const frameIn = spring({frame: frame - titre, fps, config: {damping: 14, stiffness: 200}});
  return (
    <Scene>
      <div style={{alignSelf: 'flex-start', position: 'relative', padding: '40px 44px', border: `8px solid ${withAlpha(accent, frameIn)}`, boxShadow: frameIn > 0 ? pixelShadow(withAlpha(accent, 0.35 * frameIn)) : 'none', display: 'flex', flexDirection: 'column', gap: 6}}>
        <Pop at={0}><Big size={110}>« L'IA</Big></Pop>
        {/* Le mot qui manquait se glisse dans le titre, avec le signe d'insertion du correcteur. */}
        <div style={{height: 120 * ins, overflow: 'hidden', opacity: frame >= consc ? 1 : 0}}>
          <div style={{display: 'flex', alignItems: 'baseline', gap: 16, transform: `translateY(${(1 - ins) * -40}px)`}}>
            <Mono size={72} color={accent}>^</Mono>
            <Big size={110} color={accent}>consciente</Big>
          </div>
        </div>
        <Pop at={4}><Big size={110}>n'existe pas »</Big></Pop>
      </div>
    </Scene>
  );
};

// ---------- Montage ----------

const SCENES: Record<string, React.FC> = {hook: Hook, livre: Livre, senat: Senat, mot: Mot, dartmouth: Dartmouth, turing: Turing, chute: Chute};

export const MytheExistePasVoix: React.FC = () => <V.Montage scenes={SCENES} accent={AC} />;

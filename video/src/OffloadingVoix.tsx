// Short Offloading (YouTube / TikTok / Instagram), épisode 37, définition, voix off PAL - FR, préparé le 2026-11-09
// (calage provisoire, sans voix). Fiche offloading de lexique/terms.js (vague 26) ; sources dans voix/offloading.script.json :
// fiche Hugging Face de Mistral Large 4 (1 000 milliards de paramètres, 128 experts dont 4 actifs) ; GGUF Unsloth UD-IQ1_S
// (233 Go ; 11 Go relus par token) ; communiqué Samsung UFS 5.0 (moins de 5,4 Go/s pour l'UFS 4.1) ; Galaxy S25 Ultra
// (12 Go) ; tutoriel KTransformers (DeepSeek-R1, 8,7 à 11,3 tokens/s). La publication X du 8 novembre est reconstituée
// et dessinée : ni nom, ni photo (avatar gris, « @… »), aucun logo. Image inventée : Bastien, son frigo de bar et ses
// courses à la cave. Fil : après la vague grand public, une IA géante sur ton téléphone.
// Le téléphone en coupe (puce, mémoire, stockage) a la même taille et la même place dans base, nom et mecanisme
// (PH, PUCE, MEM, STO) ; le petit téléphone et sa bulle de chat (Phone, Chat) reviennent dans hook, intro, etdonc, pc et
// chute ; le studio de Bastien, son frigo et sa cave dans bastien et chute.
// Écarts au storyboard : le titre du hook est en casse normale (« l'offloading »), comme tous les hooks ; dans base, les
// paramètres entrent en petits blocs qui tombent dans la mémoire (« range ses paramètres dans la mémoire »), et la barre
// « 233 Go » part du bord gauche de la case mémoire, au-dessus du téléphone, pour qu'on compare les deux longueurs ;
// dans nom, la flèche stockage → puce est un arc avec un bloc qui fait la navette ; dans mecanisme, les quatre experts
// s'allument sur « quatre » (le mot dit en premier), un libellé « 128 experts » entre sur « experts », et le tuyau étroit
// est la flèche de nom qui se rétrécit (même chemin) ; dans etdonc, la question s'affiche dans le téléphone sur
// « question » ; dans chute, Bastien et son frigo entrent sur « parler ».
// L'écran suit la voix et Le mouvement (univers.md) : chaque élément entre sur le mot qui le nomme (at), easing du kit,
// arcs pour ce qui vole, linéaire seulement pour le défilement continu (navette, tuyau, tokens), un seul punch zoom
// (la barre « 233 Go », sur « gigaoctets »).
import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Big, Mono, Pop, Scene, W, arc, clamp, countUp, ease, punch, serif, useAccent, withAlpha} from './kit';
import {LABEL, blink, makeVoix} from './voix/VoixShort';
import {Pixel, type Sprite} from './voix/Pixel';
import {pixelShadow} from './voix/Parts';
import ALIGN from './voix/offloading.align.json';
import SCRIPT from './voix/offloading.script.json';

const AC = '#8FB8FF'; // catégorie Inférence
const V = makeVoix(ALIGN, SCRIPT, 'voix/prediction-music.mp3');
const {at} = V;
export const OFFLOADINGVOIX_DURATION = V.duration;

const RED = '#FF4D4D';
const gone = (frame: number, until: number) => ease(frame, until, until + 6, [1, 0], 'inOut');
// Entrée / sortie identiques à celles de Scene, pour un calque posé hors de la Scene (le hook).
const useSceneOpacity = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  return interpolate(frame, [0, 6], [0, 1], clamp) * (1 - interpolate(frame, [durationInFrames - 5, durationInFrames], [0, 1], clamp));
};

// ---------- Personnages et objets en pixel art (même format que voix/Pixel.tsx) ----------

const SKIN = '#e3b58e';

// Bastien : cheveux blond foncé, chemise bleue et cravate.
const BASTIEN: Sprite = {
  rows: [
    '....HHHH....',
    '...HHHHHH...',
    '...SSSSSS...',
    '...SESSES...',
    '...SSSSSS...',
    '...SSRRSS...',
    '....SSSS....',
    '..CCCKKCCC..',
    '.CCCCKKCCCC.',
    '.CCCCKKCCCC.',
    '.SCCCKKCCCS.',
    '.SCCCCCCCCS.',
    '...JJ..JJ...',
    '...JJ..JJ...',
    '..ZZZ..ZZZ..',
  ],
  palette: {H: '#a8823a', S: SKIN, E: '#111', R: '#b5524f', C: '#5b7fb5', K: '#7a2a2a', J: '#2f3b55', Z: '#7a4a2a'},
};

// Un bocal de courses : couvercle rouge, verre, contenu orangé.
const JAR: Sprite = {
  rows: ['.RRRR.', 'GGGGGG', 'GOOOOG', 'GOOOOG', 'GOOOOG', '.GGGG.'],
  palette: {R: '#c0443c', G: '#cfe3e8', O: '#e09a3a'},
};

// ---------- Objets dessinés ----------

// Un téléphone debout : le cadre, l'encoche et l'écran (contenu en enfant, rogné).
const Phone: React.FC<{w: number; h: number; children?: React.ReactNode}> = ({w, h, children}) => (
  <div style={{position: 'relative', width: w, height: h, background: '#1c1c1c', border: '8px solid #e8e8e8', borderRadius: w / 5, boxShadow: pixelShadow('#333'), boxSizing: 'border-box'}}>
    <div style={{position: 'absolute', left: 12, right: 12, top: 40, bottom: 30, background: '#111', borderRadius: 10, overflow: 'hidden'}}>{children}</div>
    <div style={{position: 'absolute', left: '50%', top: 13, width: w / 3, height: 12, marginLeft: -w / 6, borderRadius: 6, background: '#444'}} />
  </div>
);

// L'écran de chat : la question (bulle pleine, à droite) quand `q` > 0, puis la bulle de réponse avec sa ligne
// (`line` de 0 à 1) et le curseur qui clignote.
const Chat: React.FC<{k: number; q?: number; line?: number}> = ({k, q = 0, line = 0}) => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 16 * k, padding: 14 * k}}>
      {q > 0 ? (
        <div style={{alignSelf: 'flex-end', width: '72%', background: '#2a2a2a', borderRadius: 18 * k, padding: 14 * k, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 9 * k, opacity: q, transform: `translateY(${(1 - q) * 20}px)`}}>
          <div style={{height: 10 * k, width: '90%', background: '#7a7a7a'}} />
          <div style={{height: 10 * k, width: '55%', background: '#7a7a7a'}} />
        </div>
      ) : null}
      <div style={{alignSelf: 'flex-start', width: '84%', border: `${Math.max(3, 4 * k)}px solid #555`, borderRadius: 18 * k, padding: 14 * k, boxSizing: 'border-box', display: 'flex', alignItems: 'center', gap: 6 * k}}>
        <div style={{height: 10 * k, width: `${line * 78}%`, background: '#e8e8e8'}} />
        <div style={{width: 6 * k, height: 30 * k, background: accent, opacity: blink(frame) > 0.5 ? 1 : 0}} />
      </div>
    </div>
  );
};

// La publication X, reconstituée : avatar gris, « @… », le texte ; deux bouts de scotch aux coins.
const Post: React.FC<{w: number}> = ({w}) => (
  <div style={{position: 'relative', width: w}}>
    <div style={{background: '#16181c', border: '4px solid #3a3f45', borderRadius: 26, padding: '28px 32px', boxSizing: 'border-box', boxShadow: pixelShadow('#2a2a2a'), display: 'flex', flexDirection: 'column', gap: 20}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
        <div style={{width: 76, height: 76, borderRadius: 38, background: '#6a6a6a'}} />
        <Mono size={48} color="#9aa5b1">@…</Mono>
      </div>
      <div style={{fontFamily: serif, fontWeight: 400, fontSize: 54, lineHeight: 1.15, color: '#f2f2f2'}}>1T paramètres, en local, sur mon smartphone</div>
      <div style={{display: 'flex', gap: 60}}>
        {[0, 1, 2].map((i) => <div key={i} style={{width: 70, height: 12, background: '#3a3f45'}} />)}
      </div>
    </div>
    <div style={{position: 'absolute', left: -26, top: -14, width: 110, height: 34, background: 'rgba(239,233,220,0.8)', transform: 'rotate(-28deg)'}} />
    <div style={{position: 'absolute', right: -26, top: -14, width: 110, height: 34, background: 'rgba(239,233,220,0.8)', transform: 'rotate(26deg)'}} />
  </div>
);

// Chronomètre : l'aiguille tourne (t en radians).
const Chrono: React.FC<{w: number; t: number}> = ({w, t}) => (
  <svg width={w} height={w * 1.15} viewBox="0 0 100 115">
    <rect x="42" y="0" width="16" height="12" fill="#cfcfcf" />
    <rect x="47" y="10" width="6" height="8" fill="#cfcfcf" />
    <circle cx="50" cy="65" r="44" fill="#111" stroke="#fff" strokeWidth="7" />
    <path d={`M50 65 L${50 + 34 * Math.sin(t)} ${65 - 34 * Math.cos(t)}`} stroke={RED} strokeWidth="6" strokeLinecap="round" />
    <circle cx="50" cy="65" r="5" fill="#fff" />
  </svg>
);

// L'horloge du bureau, aiguilles sur 11 h.
const Horloge: React.FC<{w: number; h?: number}> = ({w, h = 11}) => (
  <svg width={w} height={w} viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="44" fill="#efe9dc" stroke="#fff" strokeWidth="6" />
    {Array.from({length: 12}, (_, i) => {
      const a = (i * Math.PI) / 6;
      return <rect key={i} x="48" y="10" width="4" height="9" fill="#555" transform={`rotate(${(a * 180) / Math.PI} 50 50)`} />;
    })}
    <path d="M50 50 V16" stroke="#111" strokeWidth="5" strokeLinecap="round" />
    <path d={`M50 50 L${50 + 24 * Math.sin((h * Math.PI) / 6)} ${50 - 24 * Math.cos((h * Math.PI) / 6)}`} stroke="#111" strokeWidth="8" strokeLinecap="round" />
    <circle cx="50" cy="50" r="5" fill={RED} />
  </svg>
);

// ---------- Le téléphone en coupe (scènes base, nom, mecanisme) ----------

// Coordonnées dans la boîte de la scène (888 × 640) : la coque couchée, la puce, la mémoire collée à la puce, le
// stockage plus loin.
const PH = {x: 0, y: 200, w: W, h: 400};
const PUCE = {x: 46, y: 312, w: 176};
const MEM = {x: 262, y: 318, w: 176, h: 150};
const STO = {x: 474, y: 238, w: 370, h: 322};
const BLOCK = 42;
// Les six blocs de poids rangés dans la mémoire (3 × 2).
const MEM_SLOT = (i: number) => ({x: MEM.x + 13 + (i % 3) * (BLOCK + 12), y: MEM.y + 27 + Math.floor(i / 3) * (BLOCK + 12)});
// Le reste du modèle, empilé au-dessus de la mémoire (il ne rentre pas), puis rangé dans le stockage (7 × 2).
const PILE = 14;
const PILE_SLOT = (i: number) => ({x: MEM.x + 13 + (i % 3) * (BLOCK + 12), y: MEM.y - 62 - Math.floor(i / 3) * (BLOCK + 10)});
const STO_SLOT = (i: number) => ({x: STO.x + 22 + (i % 7) * (BLOCK + 6), y: STO.y + 110 + Math.floor(i / 7) * (BLOCK + 10)});
// Le chemin stockage → puce, au-dessus de la mémoire.
const PATH_A: [number, number] = [STO.x + 120, STO.y + 4];
const PATH_B: [number, number] = [PUCE.x + PUCE.w / 2, PUCE.y - 8];
const PATH_LIFT = 70;
const PATH_D = `M${PATH_A[0]} ${PATH_A[1]} Q${(PATH_A[0] + PATH_B[0]) / 2} ${(PATH_A[1] + PATH_B[1]) / 2 - 2 * PATH_LIFT} ${PATH_B[0]} ${PATH_B[1]}`;

const Coque: React.FC = () => (
  <div style={{position: 'absolute', left: PH.x, top: PH.y, width: PH.w, height: PH.h, background: '#141414', border: '8px solid #e8e8e8', borderRadius: 60, boxShadow: pixelShadow('#333'), boxSizing: 'border-box'}}>
    <div style={{position: 'absolute', right: 22, top: '50%', width: 14, height: 90, marginTop: -45, borderRadius: 7, background: '#444'}} />
  </div>
);

const Puce: React.FC = () => (
  <div style={{position: 'relative', width: PUCE.w, height: PUCE.w}}>
    {Array.from({length: 5}, (_, i) => (
      <React.Fragment key={i}>
        <div style={{position: 'absolute', left: 24 + i * 29, top: 0, width: 12, height: 18, background: '#9a9a9a'}} />
        <div style={{position: 'absolute', left: 24 + i * 29, bottom: 0, width: 12, height: 18, background: '#9a9a9a'}} />
      </React.Fragment>
    ))}
    <div style={{position: 'absolute', left: 6, right: 6, top: 16, bottom: 16, background: '#2c2c2c', border: '5px solid #cfcfcf', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Mono size={48} color="#f2f2f2">puce</Mono>
    </div>
  </div>
);

// La case mémoire : `lit` l'allume en couleur d'accent.
const Memoire: React.FC<{lit?: number}> = ({lit = 0}) => {
  const accent = useAccent();
  return <div style={{width: MEM.w, height: MEM.h, background: withAlpha(accent, 0.08 + 0.3 * lit), border: `6px solid ${lit > 0.5 ? accent : '#8a8a8a'}`, boxSizing: 'border-box'}} />;
};

const Stockage: React.FC<{label?: boolean}> = ({label = true}) => (
  <div style={{width: STO.w, height: STO.h, background: '#1d1d1d', border: '6px solid #8a8a8a', boxSizing: 'border-box', padding: '14px 20px'}}>
    {label ? <Mono size={48} color={LABEL}>stockage</Mono> : null}
  </div>
);

const Bloc: React.FC<{dim?: boolean}> = ({dim}) => {
  const accent = useAccent();
  return <div style={{width: BLOCK, height: BLOCK, background: dim ? '#4a5568' : withAlpha(accent, 0.85), border: '3px solid #0d0d0d', boxSizing: 'border-box'}} />;
};

// Le décor commun des trois scènes en coupe : la coque, la puce, la mémoire et ses six blocs.
const CoupeFond: React.FC<{lit?: number}> = ({lit = 1}) => (
  <>
    <Coque />
    <div style={{position: 'absolute', left: PUCE.x, top: PUCE.y}}><Puce /></div>
    <div style={{position: 'absolute', left: MEM.x, top: MEM.y}}><Memoire lit={lit} /></div>
    {Array.from({length: 6}, (_, i) => (
      <div key={i} style={{position: 'absolute', left: MEM_SLOT(i).x, top: MEM_SLOT(i).y}}><Bloc /></div>
    ))}
  </>
);

// ---------- 0. Hook : le téléphone, sa bulle vide et son curseur, puis le titre ----------

const Hook: React.FC = () => {
  const op = useSceneOpacity();
  return (
    <>
      {/* Le téléphone au-dessus du titre (aucun sous-titre dans le hook), posé dès la première image. */}
      <div style={{position: 'absolute', left: (1080 - 270) / 2, top: 110, opacity: op}}>
        <Phone w={270} h={470}>
          <Chat k={1.1} />
        </Phone>
      </div>
      <V.TitleHook lead="C'est quoi ?" lines={["l'offloading"]} cue="offloading" />
    </>
  );
};

// ---------- 1. Intro : la publication X, le compteur, le téléphone et son « ? » ----------

const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const x = at('intro', 'X');
  const mille = at('intro', 'mille');
  const tel = at('intro', 'téléphone');
  const hic = at('intro', 'hic');
  // La publication est collée d'un coup, de travers, sur « X ».
  const slap = spring({frame: frame - x, fps, config: {damping: 12, stiffness: 260}});
  // Le téléphone glisse depuis la droite sur « téléphone ».
  const px = ease(frame, tel, tel + 14, [1100, 650], 'inOut');
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 640}}>
        {/* pop in (collage) : la publication, sur « X ». */}
        <div style={{position: 'absolute', left: 0, top: 10, opacity: frame >= x ? 1 : 0, transform: `scale(${1.35 - 0.35 * slap}) rotate(${-3 * (2 - slap)}deg)`, transformOrigin: '30% 30%'}}>
          <Post w={600} />
        </div>
        {/* count-up : mille milliards, sur « mille ». */}
        <Pop at={mille} style={{position: 'absolute', left: 0, top: 470}}>
          <Mono size={60}>{countUp(frame, mille, 1e12, 36)}</Mono>
        </Pop>
        {/* Le téléphone, sur « téléphone ». */}
        <div style={{position: 'absolute', left: px, top: 170, opacity: frame >= tel ? 1 : 0}}>
          <Phone w={230} h={400}>
            <Chat k={0.95} />
          </Phone>
        </div>
        {/* pop in : le point d'interrogation rouge au-dessus du téléphone, sur « hic ». */}
        <Pop at={hic} style={{position: 'absolute', left: 735, top: 10}}>
          <Big size={150} color={RED}>?</Big>
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 2. Base : la mémoire près de la puce, puis 233 Go contre 12 ----------

const Base: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const params = at('base', 'paramètres');
  const memoire = at('base', 'mémoire');
  const puce = at('base', 'puce');
  const deux = at('base', 'deux');
  const giga = at('base', 'gigaoctets');
  const douze = at('base', 'douze');
  // bar grow : de 0 à 233/12 fois la largeur de la mémoire, de « deux cent » à « gigaoctets » ; punch zoom à l'arrivée.
  const len = ease(frame, deux, giga, [0, (233 / 12) * MEM.w]);
  const s = punch(frame, giga);
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 640}}>
        {/* Le décor : la coque du téléphone. */}
        <Coque />
        {/* pop in : la mémoire, sur « mémoire » ; son libellé 5 images après ; elle s'allume sur « douze ». */}
        <Pop at={memoire} style={{position: 'absolute', left: MEM.x, top: MEM.y}}>
          <Memoire lit={ease(frame, douze, douze + 8)} />
        </Pop>
        <Pop at={memoire + 5} style={{position: 'absolute', left: MEM.x - 14, top: MEM.y + MEM.h + 10}}>
          <Mono size={48} color={LABEL}>mémoire</Mono>
        </Pop>
        {/* stagger : six blocs de paramètres sur « paramètres », qui tombent en arc dans la mémoire quand elle arrive. */}
        {Array.from({length: 6}, (_, i) => {
          const t = memoire + 6 + 2 * i;
          const m = ease(frame, t, t + 12, [0, 1], 'inOut');
          const from: [number, number] = [MEM.x - 150 + i * 60, 40];
          const to = MEM_SLOT(i);
          const [bx, by] = arc(m, from, [to.x, to.y], 40);
          return (
            <Pop key={i} at={params + 2 * i} style={{position: 'absolute', left: bx, top: by}}>
              <Bloc />
            </Pop>
          );
        })}
        {/* pop in : la puce, tout près, sur « puce ». */}
        <Pop at={puce} style={{position: 'absolute', left: PUCE.x, top: PUCE.y}}>
          <Puce />
        </Pop>
        {/* bar grow : 233 Go, du bord gauche de la mémoire, qui déborde du cadre ; libellé 5 images après. */}
        <div style={{position: 'absolute', left: MEM.x, top: 40, width: len, height: 110, background: accent, opacity: frame >= deux ? 1 : 0, transform: `scale(${s})`, transformOrigin: '0% 50%'}} />
        <Pop at={deux + 5} style={{position: 'absolute', left: MEM.x + 22, top: 52}}>
          <div style={{transform: `scale(${s})`, transformOrigin: '0% 50%'}}>
            <Mono size={72} color="#111">233 Go</Mono>
          </div>
        </Pop>
        {/* pop in : 12 Go, juste au-dessus de la mémoire, sur « douze ». */}
        <Pop at={douze + 4} style={{position: 'absolute', left: MEM.x + 2, top: MEM.y - 92}}>
          <Mono size={60}>12 Go</Mono>
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 3. Nom : le reste part au stockage, la navette stockage → puce, puis le terme ----------

const Nom: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const stockage = at('nom', 'stockage');
  const chercher = at('nom', 'chercher');
  const cest = at('nom', "C'est");
  const dech = at('nom', 'déchargement');
  const off = at('nom', 'offloading');
  // Sur « C'est », le schéma passe en retrait : il pâlit et descend en rétrécissant, pour laisser la place au terme.
  const dim = ease(frame, cest, cest + 8, [1, 0.3], 'inOut');
  const shrink = ease(frame, cest, cest + 10, [1, 0.7], 'inOut');
  // La navette : un bloc fait l'aller-retour stockage → puce (défilement continu, 36 images par aller-retour).
  const cycle = 36;
  const ph = frame >= chercher + 10 ? ((frame - chercher - 10) % cycle) / cycle : 0;
  const m = ease(ph < 0.5 ? ph * 2 : 2 - ph * 2, 0, 1, [0, 1], 'inOut');
  const [nx, ny] = arc(m, PATH_A, PATH_B, PATH_LIFT);
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 640}}>
        <div style={{position: 'absolute', inset: 0, opacity: dim, transform: `scale(${shrink})`, transformOrigin: '50% 100%'}}>
          {/* Le décor : le téléphone en coupe, la mémoire pleine, et le reste du modèle empilé au-dessus. */}
          <CoupeFond />
          {/* pop in : le stockage, sur « stockage ». */}
          <Pop at={stockage} style={{position: 'absolute', left: STO.x, top: STO.y}}>
            <Stockage />
          </Pop>
          {/* stagger en arc : le reste des blocs descend dans le stockage, juste après lui. */}
          {Array.from({length: PILE}, (_, i) => {
            const t = stockage + 6 + 2 * i;
            const p = ease(frame, t, t + 14, [0, 1], 'inOut');
            const a = PILE_SLOT(i);
            const b = STO_SLOT(i);
            const [x, y] = arc(p, [a.x, a.y], [b.x, b.y], 60);
            return (
              <div key={i} style={{position: 'absolute', left: x, top: y}}>
                <Bloc dim={p >= 1} />
              </div>
            );
          })}
          {/* draw-on : le chemin stockage → puce, sur « chercher », puis la navette. */}
          <svg width={W} height={640} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
            <path d={PATH_D} fill="none" stroke={accent} strokeWidth={8} strokeDasharray="22 16" strokeDashoffset={0} opacity={frame >= chercher ? ease(frame, chercher, chercher + 10) : 0} />
          </svg>
          {frame >= chercher + 10 ? (
            <div style={{position: 'absolute', left: nx - BLOCK / 2, top: ny - BLOCK / 2}}>
              <Bloc />
            </div>
          ) : null}
        </div>
        {/* pop in : le terme en français puis en anglais, en grand au-dessus (sous-titres masqués par onscreen). */}
        <Pop at={dech} style={{position: 'absolute', left: 0, top: 0}}>
          <Big size={118}>déchargement</Big>
        </Pop>
        <Pop at={off} style={{position: 'absolute', left: 0, top: 130}}>
          <Big size={150} color={accent}>offloading</Big>
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 4. L'image : Bastien, son frigo de bar et ses courses à la cave ----------

// Le studio en haut à gauche, la cave en bas à droite, un escalier en zigzag entre les deux.
const ROOM = {x: 0, y: 10, w: 440, h: 370};
const FLOOR = ROOM.y + ROOM.h;
const CAVE = {x: 560, y: 380, w: 320, h: 250};
const CAVE_FLOOR = CAVE.y + CAVE.h;
const BPX = 16; // Bastien : 192 × 240
const B_HOME = 50;
const B_CAVE = CAVE.x + 30;

// Le frigo de bar : petit, blanc, une poignée.
const Frigo: React.FC<{style?: React.CSSProperties}> = ({style}) => (
  <div style={{...style, width: 116, height: 140, background: '#e8e8e8', border: '5px solid #b8b8b8', boxSizing: 'border-box', borderRadius: 6}}>
    <div style={{position: 'absolute', right: 10, top: 20, width: 8, height: 34, background: '#888'}} />
  </div>
);

// Le studio : une fenêtre, et le frigo de bar.
const Studio: React.FC = () => (
  <div style={{position: 'absolute', left: ROOM.x, top: ROOM.y, width: ROOM.w, height: ROOM.h, background: '#1a1a1a', border: '6px solid #8a8a8a', boxSizing: 'border-box'}}>
    <div style={{position: 'absolute', left: 40, top: 30, width: 90, height: 70, background: '#1c2633', border: '5px solid #8a8a8a'}} />
    <Frigo style={{position: 'absolute', right: 30, bottom: 0}} />
  </div>
);

// La cave : trois étagères pleines de bocaux, une ampoule nue.
const Cave: React.FC<{w: number; h: number}> = ({w, h}) => {
  const k = w / 320;
  return (
    <div style={{position: 'relative', width: w, height: h, background: '#15120e', border: `${Math.round(8 * k)}px solid #6e5a44`, boxSizing: 'border-box'}}>
      <div style={{position: 'absolute', left: w / 2 - 10 * k, top: 6 * k, width: 20 * k, height: 26 * k, borderRadius: '50%', background: '#ffe9a8', boxShadow: '0 0 30px #ffe9a8'}} />
      {[0, 1, 2].map((r) => (
        <React.Fragment key={r}>
          <div style={{position: 'absolute', left: 10 * k, right: 10 * k, top: (100 + r * 62) * k, height: 8 * k, background: '#8a6a4a'}} />
          {[0, 1, 2, 3, 4].map((c) => (
            <div key={c} style={{position: 'absolute', left: (22 + c * 56) * k, top: (100 + r * 62) * k - 6 * 6 * k, lineHeight: 0}}>
              <Pixel sprite={JAR} px={6 * k} seed={r * 5 + c} />
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

// L'escalier : des marches en zigzag du sol du studio jusqu'au sol de la cave.
const Escalier: React.FC = () => {
  const steps = 12;
  const x0 = ROOM.w;
  const x1 = CAVE.x;
  const dx = (x1 - x0) / steps;
  const dy = (CAVE_FLOOR - FLOOR) / steps;
  const d = Array.from({length: steps}, () => `h ${dx} v ${dy}`).join(' ');
  return (
    <svg style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}} width={W} height={660}>
      <path d={`M ${x0} ${FLOOR} ${d}`} fill="none" stroke="#5a5a5a" strokeWidth={8} />
    </svg>
  );
};

const Bastien: React.FC = () => {
  const frame = useCurrentFrame();
  const nom = at('bastien', 'Bastien');
  const cave = at('bastien', 'cave');
  const etages = at('bastien', 'étages');
  const plat = at('bastien', 'plat');
  const minuit = at('bastien', 'minuit');
  // Sur « plat », Bastien descend à la cave en arc, prend un bocal, et remonte avec.
  const go = ease(frame, plat, plat + 16, [0, 1], 'inOut');
  const back = ease(frame, plat + 26, plat + 44, [0, 1], 'inOut');
  const top = FLOOR - 15 * BPX;
  const bottom = CAVE_FLOOR - 15 * BPX;
  const [bx, by] = frame < plat + 21 ? arc(go, [B_HOME, top], [B_CAVE, bottom], 60) : arc(back, [B_CAVE, bottom], [B_HOME, top], 60);
  const bocal = frame >= plat + 21;
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 660}}>
        {/* Le décor : le studio minuscule et son frigo de bar. */}
        <Studio />
        {/* fade in : l'escalier, sur « étages ». */}
        <div style={{opacity: ease(frame, etages, etages + 10, [0, 1])}}>
          <Escalier />
        </div>
        {/* pop in : la cave et ses bocaux, sur « cave ». */}
        <Pop at={cave} style={{position: 'absolute', left: CAVE.x, top: CAVE.y}}>
          <Cave w={CAVE.w} h={CAVE.h} />
        </Pop>
        {/* pop in : Bastien, sur « Bastien » ; il fait l'aller-retour sur « plat ». */}
        <Pop at={nom} style={{position: 'absolute', left: bx, top: by, lineHeight: 0}}>
          <Pixel sprite={BASTIEN} px={BPX} seed={3} />
          {bocal ? (
            <div style={{position: 'absolute', left: 11 * BPX, top: 8 * BPX, lineHeight: 0}}>
              <Pixel sprite={JAR} px={7} />
            </div>
          ) : null}
        </Pop>
        {/* pop in : l'horloge sur minuit, sur « minuit ». */}
        <Pop at={minuit} style={{position: 'absolute', left: 640, top: 60, lineHeight: 0}}>
          <Horloge w={170} h={0} />
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 5. Mécanisme : quatre experts sur 128, 11 Go à relire, un tuyau de 5 Go/s ----------

const COLS = 16;
const CELL = 19;
const CGAP = 2;
const LIT = [19, 54, 85, 110];

const Mecanisme: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const quatre = at('mecanisme', 'quatre');
  const experts = at('mecanisme', 'experts');
  const onze = at('mecanisme', 'onze');
  const cinq = at('mecanisme', 'cinq');
  const gx = STO.x + (STO.w - (COLS * CELL + (COLS - 1) * CGAP)) / 2;
  const gy = STO.y + 82;
  // Le chemin de nom se rétrécit en tuyau sur « cinq » ; l'accent y défile lentement (linéaire).
  const tube = ease(frame, cinq, cinq + 10);
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 640}}>
        {/* Le décor : le téléphone en coupe, le stockage et ses 128 experts, le chemin vers la puce. */}
        <CoupeFond />
        <div style={{position: 'absolute', left: STO.x, top: STO.y}}><Stockage /></div>
        {Array.from({length: 128}, (_, i) => {
          const li = LIT.indexOf(i);
          const on = li >= 0 ? ease(frame, quatre + 3 * li, quatre + 3 * li + 6) : 0;
          return (
            <div
              key={i}
              style={{position: 'absolute', left: gx + (i % COLS) * (CELL + CGAP), top: gy + Math.floor(i / COLS) * (CELL + CGAP), width: CELL, height: CELL, background: on > 0 ? accent : '#4a4a4a', transform: `scale(${1 + 0.7 * on})`, boxShadow: on > 0 ? `0 0 ${18 * on}px ${accent}` : 'none', zIndex: on > 0 ? 1 : 0}}
            />
          );
        })}
        <svg width={W} height={640} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
          <path d={PATH_D} fill="none" stroke="#cfcfcf" strokeWidth={8 + 22 * tube} opacity={tube} />
          <path d={PATH_D} fill="none" stroke="#111" strokeWidth={4 + 10 * tube} opacity={tube} />
          <path d={PATH_D} fill="none" stroke={accent} strokeWidth={8 - 2 * tube} strokeDasharray="22 16" strokeDashoffset={frame >= cinq ? -(frame - cinq) * 0.6 : 0} />
        </svg>
        {/* pop in : le libellé des experts sous le stockage, sur « experts » ; il part sur « onze ». */}
        <Pop at={experts} style={{position: 'absolute', left: STO.x + 20, top: PH.y + PH.h + 16, opacity: gone(frame, onze)}}>
          <Mono size={52} color={LABEL}>128 experts</Mono>
        </Pop>
        {/* bar grow : la jauge 11 Go se remplit au-dessus du chemin, sur « onze » ; libellé 5 images après. */}
        <Pop at={onze} style={{position: 'absolute', left: 0, top: 20, width: 500, height: 80, border: `6px solid ${accent}`, boxSizing: 'border-box'}}>
          <div style={{width: `${ease(frame, onze + 4, onze + 34) * 100}%`, height: '100%', background: withAlpha(accent, 0.75)}} />
        </Pop>
        <Pop at={onze + 5} style={{position: 'absolute', left: 525, top: 22}}>
          <Mono size={60}>11 Go</Mono>
        </Pop>
        {/* pop in : le débit du tuyau, sur « cinq » ; le chronomètre démarre. */}
        <Pop at={cinq} style={{position: 'absolute', left: 60, top: 128}}>
          <Mono size={52} color="#fff">5 Go/s</Mono>
        </Pop>
        <Pop at={cinq + 4} style={{position: 'absolute', left: 760, top: 0, lineHeight: 0}}>
          <Chrono w={120} t={Math.max(0, frame - cinq - 4) / 8} />
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 6. Et donc : une à deux secondes par token, une station de métro pour une phrase ----------

const LINE_Y = 470;
const ST_A = 60;
const ST_B = 460;

const Rame: React.FC = () => (
  <svg width={170} height={74} viewBox="0 0 170 74">
    <rect x="0" y="0" width="170" height="64" rx="16" fill="#c9ced4" />
    <rect x="0" y="40" width="170" height="8" fill="#3a6ea5" />
    {[14, 62, 110].map((x) => <rect key={x} x={x} y="10" width="40" height="24" fill="#1c2633" />)}
    <circle cx="36" cy="66" r="8" fill="#555" />
    <circle cx="134" cy="66" r="8" fill="#555" />
  </svg>
);

const EtDonc: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const une = at('etdonc', 'une');
  const question = at('etdonc', 'question');
  const metro = at('etdonc', 'métro');
  const station = at('etdonc', 'station');
  const suivante = at('etdonc', 'suivante');
  // La rame part sur « métro » et arrive sur « station » (démarrage et arrêt en douceur).
  const rx = ease(frame, metro, station, [ST_A - 85, ST_B - 85], 'inOut');
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 640}}>
        {/* Le décor : le chronomètre qui tourne encore, la ligne de métro et ses deux stations, le téléphone. */}
        <div style={{position: 'absolute', left: 0, top: 110, lineHeight: 0}}>
          <Chrono w={120} t={(frame + 120) / 8} />
        </div>
        <div style={{position: 'absolute', left: ST_A, top: LINE_Y - 4, width: ST_B - ST_A, height: 8, background: accent}} />
        {[ST_A, ST_B].map((x) => (
          <div key={x} style={{position: 'absolute', left: x - 24, top: LINE_Y - 24, width: 48, height: 48, borderRadius: 24, background: '#111', border: `8px solid ${accent}`, boxSizing: 'border-box'}} />
        ))}
        <div style={{position: 'absolute', left: 600, top: 120}}>
          <Phone w={270} h={440}>
            <Chat k={1.05} q={ease(frame, question, question + 8)} line={ease(frame, suivante, suivante + 10)} />
          </Phone>
        </div>
        {/* pop in : le temps par token, au-dessus du chronomètre, sur « une ». */}
        <Pop at={une} style={{position: 'absolute', left: 0, top: 10}}>
          <Mono size={60}>1 à 2 s / token</Mono>
        </Pop>
        {/* La rame, sur « métro ». */}
        <Pop at={metro} style={{position: 'absolute', left: rx, top: LINE_Y - 86, lineHeight: 0}}>
          <Rame />
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 7. PC : la tour et sa mémoire vive, une dizaine de tokens par seconde ----------

const Tour: React.FC<{lit: (i: number) => number}> = ({lit}) => {
  const accent = useAccent();
  return (
    <div style={{position: 'relative', width: 290, height: 420, background: '#1f1f1f', border: '8px solid #e8e8e8', boxShadow: pixelShadow('#333'), boxSizing: 'border-box'}}>
      <div style={{position: 'absolute', left: 22, right: 22, top: 26, height: 250, background: '#10151c', border: '5px solid #6a6a6a'}}>
        <div style={{position: 'absolute', left: 18, top: 24, width: 70, height: 70, background: '#3a3a3a', border: '4px solid #8a8a8a'}} />
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{position: 'absolute', left: 112 + i * 30, top: 20, width: 20, height: 200, background: lit(i) > 0 ? accent : '#4f6a4f', opacity: 0.5 + 0.5 * Math.max(lit(i), 0.6)}} />
        ))}
      </div>
      <div style={{position: 'absolute', left: 40, bottom: 40, width: 30, height: 30, borderRadius: 15, border: '5px solid #8a8a8a'}} />
    </div>
  );
};

const Jeton: React.FC<{o: number}> = ({o}) => {
  const accent = useAccent();
  return <div style={{width: 84, height: 40, borderRadius: 20, border: `5px solid ${accent}`, background: withAlpha(accent, 0.3), boxSizing: 'border-box', opacity: o}} />;
};

const Pc: React.FC = () => {
  const frame = useCurrentFrame();
  const ordi = at('pc', 'ordinateur');
  const vive = at('pc', 'vive');
  const deepseek = at('pc', 'DeepSeek');
  const dizaine = at('pc', 'dizaine');
  const n = frame >= dizaine ? Math.floor((frame - dizaine) / 3) + 1 : 0;
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 640}}>
        {/* Le décor : le téléphone de l'épisode, sa réponse d'une ligne. */}
        <div style={{position: 'absolute', left: 620, top: 200}}>
          <Phone w={240} h={390}>
            <Chat k={0.95} q={1} line={1} />
          </Phone>
        </div>
        {/* pop in : la tour, sur « ordinateur » ; ses barrettes s'allument en cascade sur « vive ». */}
        <Pop at={ordi} style={{position: 'absolute', left: 50, top: 170}}>
          <Tour lit={(i) => ease(frame, vive + 3 * i, vive + 3 * i + 6)} />
        </Pop>
        {/* pop in : le nom du modèle sous la tour, sur « DeepSeek ». */}
        <Pop at={deepseek} style={{position: 'absolute', left: 60, top: 600}}>
          <Mono size={52} color={LABEL}>DeepSeek</Mono>
        </Pop>
        {/* stagger : une dizaine de tokens par seconde sortent de la tour (un toutes les 3 images), un seul du téléphone. */}
        {Array.from({length: n}, (_, i) => {
          const t = dizaine + 3 * i;
          const p = interpolate(frame, [t, t + 24], [0, 1], clamp);
          const dx = [-120, 60, -40, 130, -150, 20, 100, -80][i % 8];
          return p < 1 ? (
            <div key={i} style={{position: 'absolute', left: 153 + dx * p, top: 150 - 190 * p}}>
              <Jeton o={1 - p * p} />
            </div>
          ) : null;
        })}
        <div style={{position: 'absolute', left: 698, top: ease(frame, dizaine, dizaine + 45, [190, 70]), opacity: frame >= dizaine ? 1 : 0}}>
          <Jeton o={1} />
        </div>
      </div>
    </Scene>
  );
};

// ---------- 8. Chute : le téléphone et sa ligne unique ; Bastien devant son frigo, un bocal à la main, à minuit ----------

const Chute: React.FC = () => {
  const memoire = at('chute', 'parler');
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 640}}>
        {/* Le décor : le téléphone plein cadre, sa question, sa réponse d'une ligne et le curseur. */}
        <div style={{position: 'absolute', left: 0, top: 0}}>
          <Phone w={370} h={640}>
            <Chat k={1.45} q={1} line={1} />
          </Phone>
        </div>
        {/* pop in : Bastien devant son frigo de bar, un bocal à la main, l'horloge sur minuit, sur « parler ». */}
        <Pop at={memoire} style={{position: 'absolute', left: 420, top: 0, width: 468, height: 640}}>
          <div style={{position: 'absolute', left: 290, top: 60, lineHeight: 0}}>
            <Horloge w={150} h={0} />
          </div>
          <div style={{position: 'absolute', left: 0, top: 600, width: 468, height: 8, background: '#5a5a5a'}} />
          <Frigo style={{position: 'absolute', left: 300, top: 490}} />
          <div style={{position: 'absolute', left: 40, top: 600 - 15 * 14, lineHeight: 0}}>
            <Pixel sprite={BASTIEN} px={14} seed={3} />
            <div style={{position: 'absolute', left: 11 * 14, top: 8 * 14, lineHeight: 0}}>
              <Pixel sprite={JAR} px={8} />
            </div>
          </div>
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- Montage ----------

const SCENES: Record<string, React.FC> = {hook: Hook, intro: Intro, base: Base, nom: Nom, bastien: Bastien, mecanisme: Mecanisme, etdonc: EtDonc, pc: Pc, chute: Chute};

export const OffloadingVoix: React.FC = () => <V.Montage scenes={SCENES} accent={AC} />;

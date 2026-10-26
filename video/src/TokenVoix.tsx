// Short « C'est quoi ? un token… » (YouTube / TikTok / Instagram), épisode 23, préparé le 2026-10-22 (calage estimé, sans voix).
// Fiche token de lexique/terms.js ; sources dans voix/token-voix.script.json : découpages et numéros o200k_base testés avec
// tiktoken le 2026-10-22 (« Il a lu tout Internet » = 8438 | 261 | 8620 | 5501 | 7380 ; « kouign-amann » = kou | ign | -am | ann
// = 43498 | 733 | 37701 | 934), article premier de la Déclaration universelle des droits de l'homme : 33 tokens en anglais,
// 41 en français. Fil : ce que le modèle a « lu » d'Internet (ép. 22), ce sont des tokens, et c'est aussi ce que tu paies.
// L'image (la caisse qui ne lit que le code-barres) est inventée : pot de pâte à tartiner générique, sans marque ni logo.
// L'écran suit la voix (univers.md) : chaque élément entre sur le mot qui le nomme, at('scène', 'mot'), jamais en secondes ;
// atW pour les mots trop courts que at() confondrait (« a », « lu », « ta », « sa »).
// Le mouvement : ease partout, arcs pour ce qui vole, défilement linéaire du tapis, pas de punch zoom (rien ne le porte ici).
import React from 'react';
import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Big, Draw, Mono, Pop, Scene, Scissors, W, arc, clamp, ease, useAccent, withAlpha} from './kit';
import {blink, makeVoix} from './voix/VoixShort';
import {Pixel, type Sprite} from './voix/Pixel';
import {Model, pixelShadow} from './voix/Parts';
import {Browser} from './MytheInternetVoix';
import ALIGN from './voix/token-voix.align.json';
import SCRIPT from './voix/token-voix.script.json';

const AC = '#7CFFB2'; // catégorie Fondations (celle de la fiche token)
const V = makeVoix(ALIGN, SCRIPT, 'voix/prediction-music.mp3');
const {at} = V;
export const TOKENVOIX_DURATION = V.duration;

// Image (locale à la scène) d'un mot exact, ponctuation retirée : at() cherche une sous-chaîne, et « a » ou « lu »
// tomberaient sur « Dans » ou « plus ». Mêmes bornes de scène que makeVoix (la première commence à 0).
const atW = (scene: string, word: string, nth = 0) => {
  const i = ALIGN.segments.findIndex((s) => s.scene === scene);
  const seg = ALIGN.segments[i];
  const hits = seg.words.filter((w) => w.w.replace(/[«»,.…!?;:]/g, '').toLowerCase() === word.toLowerCase());
  const w = hits[Math.min(nth, hits.length - 1)];
  if (!w) throw new Error(`mot « ${word} » absent de la scène ${scene}`);
  return Math.round(w.start * 30) - (i === 0 ? 0 : Math.round(seg.start * 30));
};

const gone = (frame: number, until: number) => ease(frame, until, until + 6, [1, 0], 'inOut');
const SKIN = '#e3b58e';
const MONO_CH = 0.6; // largeur d'un caractère d'IBM Plex Mono, en em

// Le vrai découpage o200k_base (tiktoken, 2026-10-22).
const PHRASE = [
  {t: 'Il', id: 8438},
  {t: 'a', id: 261},
  {t: 'lu', id: 8620},
  {t: 'tout', id: 5501},
  {t: 'Internet', id: 7380},
];
const KOUIGN = [
  {t: 'kou', id: 43498},
  {t: 'ign', id: 733},
  {t: '-am', id: 37701},
  {t: 'ann', id: 934},
];
const BS = 48; // taille du texte des blocs
const blockW = (t: string, id: number) => Math.round(Math.max(t.length, String(id).length) * BS * MONO_CH + 32);

// ---------- Pièces dessinées (SVG maison et pixel art) ----------

// Le tapis de caisse : bandes qui défilent (off en pixels), rouleaux aux bouts.
const Belt: React.FC<{w: number; h: number; off: number}> = ({w, h, off}) => (
  <div style={{position: 'relative', width: w, height: h, background: 'repeating-linear-gradient(90deg, #262626 0 34px, #1a1a1a 34px 68px)', backgroundPosition: `${off}px 0`, borderTop: '6px solid #555', borderBottom: '6px solid #555', boxSizing: 'border-box'}} />
);

// Un bloc de texte numéroté (un token) ; flip de 0 à 1 : il se retourne et montre son numéro.
const Block: React.FC<{t: string; id: number; flip?: number; lit?: boolean; dimText?: boolean; size?: number; w?: number}> = ({t, id, flip = 0, lit, dimText, size = BS, w}) => {
  const accent = useAccent();
  const back = flip >= 0.5;
  return (
    <div style={{width: w ?? blockW(t, id), height: size * 1.7, transform: `scaleX(${Math.max(0.04, Math.abs(Math.cos(Math.PI * flip)))})`, background: back ? withAlpha(accent, 0.18) : '#1c1c1c', border: `4px solid ${lit || back ? accent : '#888'}`, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{opacity: dimText && !back ? 0.15 : 1}}>
        <Mono size={size} color={back ? accent : '#fff'}>{back ? String(id) : t}</Mono>
      </div>
    </div>
  );
};

// Le pot de pâte à tartiner, générique : couvercle blanc, verre brun, étiquette crème avec un code-barres, sans marque.
// clear (0 -> 1) : le verre devient transparent et montre les noisettes qui tournent.
const Jar: React.FC<{w: number; clear?: number}> = ({w, clear = 0}) => {
  const frame = useCurrentFrame();
  return (
    <svg width={w} height={w * 1.3} viewBox="0 0 100 130">
      <rect x="8" y="24" width="84" height="104" rx="14" fill="#5a3418" opacity={1 - 0.8 * clear} stroke="#fff" strokeWidth="3" />
      {clear > 0
        ? Array.from({length: 7}, (_, k) => {
            const a = (k / 7) * Math.PI * 2 + frame / 14;
            const r = 14 + (k % 3) * 9;
            return (
              <g key={k} opacity={clear}>
                <circle cx={50 + r * Math.cos(a)} cy={78 + r * Math.sin(a) * 0.8} r="9" fill="#a0652a" stroke="#3a2210" strokeWidth="2" />
                <circle cx={47 + r * Math.cos(a)} cy={75 + r * Math.sin(a) * 0.8} r="3" fill="#d9a46a" />
              </g>
            );
          })
        : null}
      <g opacity={1 - 0.7 * clear}>
        <rect x="8" y="52" width="84" height="46" fill="#efe0c8" />
        <ellipse cx="50" cy="68" rx="22" ry="9" fill="#a0652a" />
        {[0, 3, 5, 9, 11, 14, 17, 19, 23, 25, 28].map((x) => <rect key={x} x={34 + x} y="80" width={x % 2 ? 1.5 : 2.5} height="14" fill="#111" />)}
      </g>
      <rect x="14" y="4" width="72" height="22" rx="5" fill="#f2f2f2" stroke="#9a9a9a" strokeWidth="2" />
    </svg>
  );
};

// Ta main, qui pose le pot sur le tapis (manche bleu).
const HAND: Sprite = {
  rows: ['.......SSSS...', 'CCCCCCSSSSSSS.', 'CCCCCCSSSSSSSS', 'CCCCCCSSSSSSS.', 'CCCCCCSSSSS...', '.......SS.....'],
  palette: {C: '#5b7fb5', S: SKIN},
};

// Le kouign-amann : un gâteau rond, doré, aux plis caramélisés.
const Kouign: React.FC<{w: number}> = ({w}) => (
  <svg width={w} height={w * 0.7} viewBox="0 0 140 98">
    <ellipse cx="70" cy="58" rx="66" ry="36" fill="#b8742a" />
    <ellipse cx="70" cy="50" rx="62" ry="32" fill="#d9a54a" />
    {[0, 1, 2, 3, 4].map((k) => {
      const a = (k / 5) * Math.PI * 2;
      return <path key={k} d={`M70 50 Q${70 + 40 * Math.cos(a + 0.6)} ${50 + 20 * Math.sin(a + 0.6)} ${70 + 58 * Math.cos(a)} ${50 + 28 * Math.sin(a)}`} fill="none" stroke="#8a4a14" strokeWidth="5" strokeLinecap="round" />;
    })}
    <ellipse cx="70" cy="50" rx="14" ry="8" fill="#e8c46a" />
  </svg>
);

// La caisse : un écran (texte mono en couleur d'accent) sur un socle gris.
const Register: React.FC<{w: number; children?: React.ReactNode}> = ({w, children}) => (
  <div style={{width: w, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
    <div style={{width: w, height: 120, background: '#0c0c0c', border: '6px solid #777', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, boxShadow: pixelShadow('#222')}}>{children}</div>
    <div style={{width: 30, height: 40, background: '#555'}} />
    <div style={{width: w * 0.8, height: 70, background: '#3a3a3a', border: '5px solid #777', boxSizing: 'border-box'}} />
  </div>
);

// La vitre du scanner sur le tapis et son laser rouge ; sweep (0 -> 1) balaie de haut en bas.
const LASER = '#FF4D4D';
const ScanGlass: React.FC<{w: number; h: number; sweep?: number}> = ({w, h, sweep = -1}) => (
  <div style={{position: 'relative', width: w, height: h, background: 'rgba(120,160,190,0.25)', border: '5px solid #9a9a9a', boxSizing: 'border-box'}}>
    <div style={{position: 'absolute', left: 6, right: 6, top: '50%', height: 4, background: LASER, opacity: 0.8}} />
    {sweep >= 0 && sweep <= 1 ? <div style={{position: 'absolute', left: -20, right: -20, top: -h * 2.2 + sweep * h * 2.2, height: 8, background: LASER, boxShadow: `0 0 18px ${LASER}`}} /> : null}
  </div>
);

// Douchette : un scanner à main qui vise vers le bas ; beam (0 -> 1) allume le faisceau.
const Gun: React.FC<{beam: number}> = ({beam}) => (
  <svg width={120} height={150} viewBox="0 0 120 150" style={{overflow: 'visible'}}>
    <path d="M60 140 L30 70 H90 Z" fill={LASER} opacity={0.45 * beam} />
    <rect x="20" y="30" width="80" height="44" rx="10" fill="#3a3a3a" stroke="#cfcfcf" strokeWidth="5" />
    <rect x="70" y="0" width="26" height="44" rx="8" fill="#3a3a3a" stroke="#cfcfcf" strokeWidth="5" />
    <rect x="34" y="66" width="52" height="10" fill={LASER} />
  </svg>
);

// Flash du bip : un anneau qui s'ouvre et s'éteint en 10 images.
const Bip: React.FC<{at: number; x: number; y: number}> = ({at: a, x, y}) => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const p = ease(frame, a, a + 10);
  if (frame < a || frame > a + 10) return null;
  return <div style={{position: 'absolute', left: x - 20 - 30 * p, top: y - 20 - 30 * p, width: 40 + 60 * p, height: 40 + 60 * p, borderRadius: '50%', border: `6px solid ${accent}`, opacity: 1 - p, zIndex: 9}} />;
};

// ---------- 0. Hook : la question, et le tapis de caisse qui avance derrière avec un pot posé dessus ----------

const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const exit = interpolate(frame, [durationInFrames - 5, durationInFrames], [1, 0], clamp);
  return (
    <>
      {/* Décor dès la première image (la miniature n'est jamais nue) : le tapis, sa barre de séparation et un pot, à droite du titre. */}
      <AbsoluteFill style={{opacity: 0.9 * exit}}>
        <div style={{position: 'absolute', left: 0, top: 1330}}><Belt w={1080} h={110} off={frame * 1.5} /></div>
        <div style={{position: 'absolute', left: 120 + frame * 1.5, top: 1298, width: 300, height: 34, background: '#9a9a9a', border: '4px solid #cfcfcf', boxSizing: 'border-box'}} />
        <div style={{position: 'absolute', left: 760 + frame * 1.5, top: 1330 - 160 * 1.3 + 8}}><Jar w={160} /></div>
      </AbsoluteFill>
      <V.TitleHook lead="C'est quoi ?" lines={['un token…']} cue="token" />
    </>
  );
};

// ---------- 1. Intro : le navigateur de l'ép. 22 ; ses mots s'échappent, s'éteignent et se retournent en numéros ----------

const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const modele = at('intro', 'modèle');
  const verite = at('intro', 'vérité');
  const suite = at('intro', 'suite');
  const numeros = at('intro', 'numéros');
  const xs = rowX(BW, ROW_GAP);
  const fly = Math.max(2, Math.min(5, Math.floor((verite - modele - 16) / PHRASE.length)));
  const step = Math.max(2, Math.floor((numeros - suite) / PHRASE.length));
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 640}}>
        {/* Décor dès l'entrée : le navigateur aux onglets en éventail. */}
        <Pop at={2} style={{position: 'absolute', left: 0, top: 30}}><Browser w={500} /></Pop>
        {/* « ce que son modèle a lu » : les mots « Il a lu tout Internet » sortent du navigateur en arc (stagger) et se rangent ;
            ils s'éteignent pendant « en vérité », puis « suite de numéros » : chacun se retourne et montre son numéro (flip en cascade). */}
        {PHRASE.map((t, k) => {
          const a = modele + fly * k;
          const p = ease(frame, a, a + 16, [0, 1], 'inOut');
          const [x, y] = arc(p, [60 + 50 * k, 200], [xs[k], 500], 120);
          const f = ease(frame, suite + step * k, suite + step * k + 10);
          const dim = f > 0 ? 1 : ease(frame, verite, suite, [1, 0.4]);
          return frame >= a ? (
            <div key={k} style={{position: 'absolute', left: x, top: y, transform: `scale(${0.6 + 0.4 * p})`, transformOrigin: '0 0', zIndex: 21, opacity: dim}}>
              <Block t={t.t} id={t.id} flip={f} />
            </div>
          ) : null;
        })}
      </div>
    </Scene>
  );
};

// ---------- 2. Découpe : les ciseaux du tokenizer, le tiroir du vocabulaire, chaque bloc montre son numéro ----------

const BW = PHRASE.map((p) => blockW(p.t, p.id));
const ROW_GAP = Math.floor((W - BW.reduce((a, b) => a + b, 0)) / (PHRASE.length - 1));
const Decoupe: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const tokenizer = at('decoupe', 'tokenizer');
  const blocs = at('decoupe', 'blocs');
  const vocab = at('decoupe', 'vocabulaire');
  const n200 = at('decoupe', '200');
  const remplace = at('decoupe', 'remplace');
  const numero = at('decoupe', 'numéro');
  // Les ciseaux passent d'une coupure à l'autre entre « tokenizer » et « blocs » ; chaque coupure s'ouvre à leur passage.
  // Au moins 4 images entre deux coupures, même si la voix dit « tokenizer » et « blocs » presque d'affilée.
  const cuts = [0, 1, 2, 3].map((j) => Math.round(tokenizer + (Math.max(blocs - tokenizer, 16) * (j + 1)) / 4));
  const gaps = cuts.map((c) => ease(frame, c, c + 6, [0, ROW_GAP]));
  const xs = BW.map((_, k) => BW.slice(0, k).reduce((a, b) => a + b, 0) + gaps.slice(0, k).reduce((a, b) => a + b, 0));
  const tight = BW.reduce((a, b) => a + b, 0);
  const shift = (W - tight - gaps.reduce((a, b) => a + b, 0)) / 2; // la ligne reste centrée pendant qu'elle s'ouvre
  const cutX = (j: number) => shift + xs[j] + BW[j] + gaps[j] / 2;
  const sj = Math.min(3, Math.max(0, cuts.findIndex((c) => frame < c)));
  const sx = frame < cuts[0] ? cutX(0) : frame >= cuts[3] ? cutX(3) : interpolate(frame, [cuts[sj - 1] ?? tokenizer, cuts[sj]], [cutX(Math.max(0, sj - 1)), cutX(sj)], clamp);
  const flipStep = Math.max(4, Math.floor((numero - remplace) / PHRASE.length));
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 700}}>
        <Pop at={tokenizer + 4} style={{position: 'absolute', left: 0, top: 0}}><Mono size={56} color={accent}>tokenizer</Mono></Pop>
        {/* Ciseaux : ils apparaissent sur « tokenizer » et descendent sur chaque coupure. */}
        {frame >= tokenizer && frame < blocs + 14 ? (
          <div style={{position: 'absolute', left: sx - 50, top: 70 + 20 * Math.abs(Math.sin((frame - tokenizer) / 3)), opacity: gone(frame, blocs + 6), transform: 'rotate(180deg)', zIndex: 5}}><Scissors size={100} /></div>
        ) : null}
        {/* Décor dès l'entrée : la phrase, d'un seul tenant ; « remplace chaque bloc par son numéro » : flip en cascade. */}
        {PHRASE.map((p, k) => (
          <div key={k} style={{position: 'absolute', left: shift + xs[k], top: 190}}>
            <Pop at={2}>
              <Block t={p.t} id={p.id} lit={frame >= cuts[Math.min(3, k)]} flip={ease(frame, remplace + flipStep * k, remplace + flipStep * k + 10)} />
            </Pop>
          </div>
        ))}
        {/* « vocabulaire » : le tiroir à étiquettes, un tiroir s'ouvre. */}
        <Pop at={vocab} style={{position: 'absolute', left: 0, top: 340, width: W, height: 260, background: '#2a2a2a', border: '6px solid #9a9a9a', boxSizing: 'border-box', padding: 14, display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 10}}>
          {Array.from({length: 24}, (_, k) => {
            const open = k === 10 ? ease(frame, vocab + 8, vocab + 18) : 0;
            return (
              <div key={k} style={{position: 'relative', background: '#3a3a3a', border: '3px solid #666', transform: `translateY(${open * 24}px) scale(${1 + open * 0.18})`, zIndex: k === 10 ? 2 : 1}}>
                <div style={{position: 'absolute', left: '35%', right: '35%', top: '45%', height: 8, background: '#9a9a9a'}} />
                {k === 10 ? <div style={{position: 'absolute', left: 6, right: 6, top: 6, height: 14, background: accent, opacity: open}} /> : null}
              </div>
            );
          })}
        </Pop>
        <Pop at={n200} style={{position: 'absolute', left: 0, right: 0, top: 630, display: 'flex', justifyContent: 'center'}}><Mono size={56} color="#fff">200 000 morceaux</Mono></Pop>
      </div>
    </Scene>
  );
};

// ---------- 3. Nom : un bloc grossit, « TOKEN » au-dessus, le modèle ne prend que le numéro ----------

const Nom: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const blocs = at('nom', 'blocs');
  const cest = at('nom', "c'est");
  const manipule = at('nom', 'manipule');
  const leurs = at('nom', 'leurs');
  const numeros = at('nom', 'numéros');
  const dim = frame >= leurs;
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 640}}>
        {/* Décor dès l'entrée : la rangée des cinq blocs numérotés ; sur « blocs », elle s'efface et un bloc grossit. */}
        {frame < blocs + 8 ? (
          <div style={{position: 'absolute', left: 0, top: 230, display: 'flex', gap: ROW_GAP, opacity: gone(frame, blocs)}}>
            {PHRASE.map((p, k) => <Pop key={k} at={2}><Block t={p.t} id={p.id} flip={1} /></Pop>)}
          </div>
        ) : null}
        {/* « c'est un token » : le mot écrit en grand (le sous-titre se tait pendant ce passage, onscreen). */}
        <Pop at={cest} style={{position: 'absolute', left: 0, right: 0, top: 0, display: 'flex', justifyContent: 'center'}}><Big size={170} color={accent}>TOKEN</Big></Pop>
        <Pop at={blocs} style={{position: 'absolute', left: 0, right: 0, top: 210, display: 'flex', justifyContent: 'center'}}>
          <div style={{display: 'flex', border: `6px solid ${accent}`, background: '#141414', boxShadow: pixelShadow('#2a2a2a')}}>
            <div style={{padding: '18px 30px', opacity: dim ? ease(frame, leurs, leurs + 8, [1, 0.15]) : 1}}><Mono size={80} color="#fff">Internet</Mono></div>
            <div style={{width: 6, background: accent}} />
            <div style={{padding: '18px 30px', background: frame >= numeros ? withAlpha(accent, 0.2) : 'transparent'}}><Mono size={80} color={accent}>7380</Mono></div>
          </div>
        </Pop>
        {/* « le modèle ne manipule » : le modèle, et le seul numéro qui descend vers lui (draw-on). */}
        <svg width={W} height={640} viewBox={`0 0 ${W} 640`} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
          <Draw d={`M${W / 2 + 230} 345 Q${W / 2 + 200} 420 ${W / 2 + 30} 460`} p={ease(frame, leurs, leurs + 12)} width={8} len={300} />
        </svg>
        <Pop at={manipule} style={{position: 'absolute', left: W / 2 - 150, top: 460}}><Model w={300} /></Pop>
      </div>
    </Scene>
  );
};

// ---------- 4. Caisse : le pot passe au scanner, la caisse ne lit que le code-barres ----------

const BELT_Y = 440;
const SCAN_X = 540;
const JW = 150;
const Caisse: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const pot = at('caisse', 'pot');
  const passe = at('caisse', 'passe');
  const lit = at('caisse', 'lit');
  const code = at('caisse', 'code-barres');
  const prix = at('caisse', 'prix');
  const noisettes = at('caisse', 'noisettes');
  // Le pot avance avec le tapis (inOut) jusqu'à la vitre, où il arrive sur « code-barres ».
  const move = ease(frame, passe, code, [0, 1], 'inOut');
  const jx = interpolate(move, [0, 1], [70, SCAN_X + 10]);
  const sweep = frame >= code ? ease(frame, code, code + 10) : -1;
  const handIn = ease(frame, pot - 6, pot + 6, [-260, 20]) - ease(frame, pot + 14, pot + 26, [0, 300], 'inOut');
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 760}}>
        {/* Décor dès l'entrée : la caisse, le tapis et la vitre du scanner. */}
        <Pop at={2} style={{position: 'absolute', right: 0, top: 0}}>
          <Register w={440}>
            {/* La caisse ne voit qu'un numéro, comme le modèle (7380, le numéro du token « Internet ») ; sur « prix », le
                symbole seul, sans montant inventé. */}
            {frame >= prix ? <Mono size={96} color={accent}>€</Mono> : frame >= code + 4 ? <Mono size={72} color={accent}>7380</Mono> : null}
          </Register>
        </Pop>
        <div style={{position: 'absolute', left: -96, top: BELT_Y}}><Belt w={W + 192} h={110} off={jx} /></div>
        <div style={{position: 'absolute', left: SCAN_X - 10, top: BELT_Y - 14, zIndex: 3}}><ScanGlass w={190} h={138} /></div>
        {/* « ton pot » : ta main le pose sur le tapis. */}
        <div style={{position: 'absolute', left: jx, top: BELT_Y - JW * 1.3 + 8, zIndex: 4}}>
          <Pop at={pot}><Jar w={JW} clear={ease(frame, noisettes, noisettes + 10)} /></Pop>
        </div>
        {/* « code-barres » : le laser balaie le pot, bip. */}
        {sweep >= 0 && sweep < 1 ? <div style={{position: 'absolute', left: jx - 20, width: JW + 40, top: BELT_Y - 190 + sweep * 190, height: 8, background: LASER, boxShadow: `0 0 18px ${LASER}`, zIndex: 6}} /> : null}
        <Bip at={code + 8} x={SCAN_X + 95} y={BELT_Y - 100} />
        {/* « noisettes » : le point d'interrogation clignote à côté du pot, pas sur l'écran. */}
        {frame >= noisettes ? <div style={{position: 'absolute', left: jx - 130, width: 120, top: BELT_Y - JW * 1.3 + 10, display: 'flex', justifyContent: 'center', opacity: blink(frame), zIndex: 7}}><Pop at={noisettes}><Mono size={110} color={accent}>?</Mono></Pop></div> : null}
        {frame >= pot - 6 && frame < pot + 26 ? <div style={{position: 'absolute', left: handIn - 120, top: BELT_Y - 110, zIndex: 5}}><Pixel sprite={HAND} px={13} /></div> : null}
        <div style={{position: 'absolute', left: 0, right: 0, top: 600, display: 'flex', justifyContent: 'center'}}>
          {frame < noisettes ? <Pop at={code + 5} style={{opacity: frame >= lit ? 1 : 0}}><Mono size={56} color="#fff">code-barres</Mono></Pop> : <Pop at={noisettes + 5}><Mono size={56} color="#fff">noisettes ?</Mono></Pop>}
        </div>
      </div>
    </Scene>
  );
};

// ---------- 5. Blocs : cinq bips pour la phrase, quatre pour le kouign-amann ; les morceaux fréquents s'empilent ----------

const KW = KOUIGN.map((p) => blockW(p.t, p.id));
const rowX = (ws: number[], gap: number) => ws.map((_, k) => ws.slice(0, k).reduce((a, b) => a + b + gap, 0));
const TOP_X = rowX(BW, ROW_GAP);
const BOT_X = rowX(KW, 16);
const TOP_Y = 210;
const BOT_Y = 490;
const Blocs: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const phrase = at('blocs', 'phrase');
  const cinq = at('blocs', 'cinq');
  const kouign = at('blocs', 'kouign');
  const quatre = at('blocs', 'quatre');
  const frequents = at('blocs', 'fréquents');
  // Un bip par mot dit : Il, a, lu, tout, Internet.
  const topBips = [atW('blocs', 'Il'), atW('blocs', 'a'), atW('blocs', 'lu'), atW('blocs', 'tout'), atW('blocs', 'Internet')];
  // Le kouign-amann se découpe, puis quatre bips répartis jusqu'à « quatre ».
  // Le gâteau reste entier au moins 20 images (centré, en grand) avant de se découper.
  const split = Math.max(kouign + 8, Math.min(kouign + 22, quatre - 16));
  const botBips = [0, 1, 2, 3].map((k) => Math.round(split + 4 + ((quatre - split - 4) * k) / 3));
  // La douchette va de bloc en bloc (inOut) ; elle vise la rangée du haut puis celle du bas.
  const target = (f: number): [number, number] => {
    const bips = f < split ? topBips : botBips;
    const xs = f < split ? TOP_X.map((x, k) => x + BW[k] / 2) : BOT_X.map((x, k) => x + KW[k] / 2);
    const y = f < split ? TOP_Y - 160 : BOT_Y - 160; // au-dessus de la rangée visée
    const i = bips.findIndex((b) => f < b);
    if (i === 0) return [xs[0], y];
    if (i < 0) return [xs[xs.length - 1], y];
    return [interpolate(ease(f, bips[i - 1] + 2, Math.max(bips[i - 1] + 3, bips[i] - 1), [0, 1], 'inOut'), [0, 1], [xs[i - 1], xs[i]]), y];
  };
  const [gx, gy] = target(frame);
  const firing = [...topBips, ...botBips].some((b) => frame >= b && frame < b + 6);
  const gunOn = frame >= phrase && frame < quatre + 12;
  const stack = (k: number, top: boolean) => (top ? ease(frame, frequents + 2 * k, frequents + 2 * k + 10) : 0);
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 680}}>
        {/* Décor dès l'entrée : deux tapis. */}
        <div style={{position: 'absolute', left: -96, top: TOP_Y + 82}}><Belt w={W + 192} h={30} off={frame} /></div>
        <div style={{position: 'absolute', left: -96, top: BOT_Y + 82}}><Belt w={W + 192} h={30} off={frame} /></div>
        {/* La phrase : ses cinq blocs posés dès l'entrée, chacun bipe sur son mot (les numéros, déjà vus, ne sont pas répétés). */}
        {PHRASE.map((p, k) => (
          <div key={k} style={{position: 'absolute', left: TOP_X[k], top: TOP_Y}}>
            {/* « les plus fréquents » : derrière chaque bloc du haut, ses copies s'empilent haut. */}
            {[5, 4, 3, 2, 1].map((c) => <div key={c} style={{position: 'absolute', left: 0, top: -c * 18 * stack(k, true), width: BW[k], height: BS * 1.7, border: `4px solid ${withAlpha(accent, 0.5)}`, background: '#141414', boxSizing: 'border-box', opacity: stack(k, true)}} />)}
            <Pop at={2 + 2 * k}><Block t={p.t} id={p.id} lit={frame >= topBips[k]} /></Pop>
          </div>
        ))}
        <Pop at={cinq} style={{position: 'absolute', right: 0, top: TOP_Y + 100}}><Mono size={56} color={accent}>5 tokens</Mono></Pop>
        {/* « kouign-amann » : le gâteau pop in, puis se découpe en quatre blocs. */}
        {frame < split + 6 ? (
          <div style={{position: 'absolute', left: W / 2 - 170, top: BOT_Y - 120, opacity: gone(frame, split), zIndex: 9}}><Pop at={kouign}><Kouign w={340} /></Pop></div>
        ) : null}
        {KOUIGN.map((p, k) => (
          <div key={k} style={{position: 'absolute', left: BOT_X[k], top: BOT_Y}}>
            <Pop at={split + 2 * k}><Block t={p.t} id={p.id} lit={frame >= botBips[k]} /></Pop>
          </div>
        ))}
        <Pop at={quatre + 4} style={{position: 'absolute', right: 0, top: BOT_Y + 100}}><Mono size={56} color={accent}>4 tokens</Mono></Pop>
        {gunOn ? (
          <div style={{position: 'absolute', left: gx - 60, top: gy, opacity: gone(frame, quatre + 6), zIndex: 8}}><Pop at={phrase}><Gun beam={firing ? 1 : 0} /></Pop></div>
        ) : null}
        {topBips.map((b, k) => <Bip key={k} at={b} x={TOP_X[k] + BW[k] / 2} y={TOP_Y + 40} />)}
        {botBips.map((b, k) => <Bip key={`b${k}`} at={b} x={BOT_X[k] + KW[k] / 2} y={BOT_Y + 40} />)}
      </div>
    </Scene>
  );
};

// ---------- 6. Facture : tout se compte en tokens, 33 lignes en anglais, 41 en français ----------

const TKW = 400;
const LINE_H = 8;
const LINE_G = 3;
const PRINT_Y = 110; // l'imprimante à tickets
const pct = (k: number) => [86, 70, 92, 64, 78, 88, 58, 74][k % 8];
// Un ticket de caisse : en-tête, puis ses lignes (une par token), les dernières surlignées à partir de `hiFrom`.
const Ticket: React.FC<{lines: number; head?: React.ReactNode; hiFrom?: number; hi?: boolean; children?: React.ReactNode}> = ({lines, head, hiFrom = 999, hi, children}) => {
  const accent = useAccent();
  return (
    <div style={{width: TKW, background: '#f2efe6', boxShadow: pixelShadow('#333'), padding: '16px 24px 22px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: LINE_G}}>
      {head}
      {children}
      {Array.from({length: lines}, (_, k) => <div key={k} style={{height: LINE_H, width: `${pct(k)}%`, background: hi && k >= hiFrom ? accent : '#8a8a8a'}} />)}
    </div>
  );
};

// Collage (univers.md, « Illustrer plutôt qu'étiqueter ») : la vraie page de l'ONU, posée d'un coup, scotch et ombre pixel.
// Captures dans public/voix (token-dudh.png, token-dudh-en.png), crédits dans public/voix/CREDITS-semaine-27-10.md.
const Collage: React.FC<{src: string; w: number; ratio: number; at: number; tilt: number}> = ({src, w, ratio, at: a, tilt}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const slap = spring({frame: frame - a, fps, config: {damping: 12, stiffness: 260}});
  return (
    <div style={{position: 'relative', opacity: frame >= a ? 1 : 0, transform: `scale(${1.4 - 0.4 * slap}) rotate(${tilt * (2 - slap)}deg)`}}>
      <div style={{border: '8px solid #fff', boxShadow: pixelShadow('#333'), lineHeight: 0, background: '#fff'}}>
        <Img src={staticFile(src)} style={{width: w, height: Math.round(w * ratio), display: 'block'}} />
      </div>
      <div style={{position: 'absolute', left: -26, top: -14, width: 110, height: 34, background: 'rgba(239,233,220,0.85)', transform: 'rotate(-30deg)'}} />
      <div style={{position: 'absolute', right: -26, top: -14, width: 110, height: 34, background: 'rgba(239,233,220,0.85)', transform: 'rotate(30deg)'}} />
    </div>
  );
};

const Facture: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const compte = at('facture', 'compte');
  const question = at('facture', 'question');
  const reponse = at('facture', 'réponse');
  const facture = at('facture', 'facture');
  const article = at('facture', 'article');
  const premier = at('facture', 'premier');
  const declaration = at('facture', 'Déclaration');
  const droits = at('facture', 'droits');
  const n33 = at('facture', '33');
  const anglais = at('facture', 'anglais');
  const n41 = at('facture', '41');
  const francais = at('facture', 'français');
  const quart = at('facture', 'quart');
  const ta = atW('facture', 'ta');
  const sa = atW('facture', 'sa');
  // Une ligne par token, comptée sur la voix (linéaire) : 33 jusqu'à « 33 », puis le ticket français continue jusqu'à « 41 ».
  const en = Math.floor(interpolate(frame, [droits, n33], [0, 33], clamp));
  const fr = frame < n33 ? en : Math.floor(interpolate(frame, [n33, n41], [33, 41], clamp));
  const q = Math.floor(interpolate(frame, [question, question + 10], [0, 4], clamp));
  const r = Math.floor(interpolate(frame, [reponse, reponse + 14], [0, 6], clamp));
  const lab = (t: string, a: number) => (frame >= a ? <div style={{marginTop: 6}}><Mono size={48} color="#111">{t}</Mono></div> : null);
  const xs = rowX(BW, ROW_GAP);
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 800}}>
        {/* Décor dès l'entrée : les cinq tokens de la phrase au-dessus de l'imprimante ; « compte » : ils tombent dedans (stagger). */}
        {PHRASE.map((p, k) => {
          const d = ease(frame, compte + 3 * k, compte + 3 * k + 10, [0, 1], 'inOut');
          return d < 1 ? (
            <div key={k} style={{position: 'absolute', left: xs[k], top: d * (PRINT_Y - 20), opacity: 1 - d}}>
              <Pop at={2 + 2 * k}><Block t={p.t} id={p.id} lit /></Pop>
            </div>
          ) : null;
        })}
        <Pop at={2} style={{position: 'absolute', left: -20, right: -20, top: PRINT_Y, height: 60, background: '#3a3a3a', border: '6px solid #777', boxSizing: 'border-box', zIndex: 2}}><span /></Pop>
        {/* « ta question, sa réponse » : un premier ticket, une ligne par token ; « facture » : le total. */}
        {frame < article + 8 ? (
          <div style={{position: 'absolute', left: W / 2 - TKW / 2, top: PRINT_Y + 50, opacity: gone(frame, article)}}>
            <Pop at={compte + 6}>
              <Ticket lines={0}>
                {lab('ta question', ta)}
                {Array.from({length: q}, (_, k) => <div key={k} style={{height: LINE_H, width: `${pct(k)}%`, background: '#8a8a8a'}} />)}
                {lab('sa réponse', sa)}
                {Array.from({length: r}, (_, k) => <div key={k} style={{height: LINE_H, width: `${pct(k + 3)}%`, background: '#8a8a8a'}} />)}
                {frame >= facture ? <div style={{marginTop: 10, borderTop: '5px double #111', paddingTop: 6, display: 'flex', justifyContent: 'flex-end'}}><Mono size={64} color="#111">€</Mono></div> : <div style={{height: 20}} />}
              </Ticket>
            </Pop>
          </div>
        ) : null}
        {/* « l'article premier » : deux tickets côte à côte, en-tête « Article 1 » sur « Déclaration ». */}
        {[0, 1].map((k) => (
          <div key={k} style={{position: 'absolute', left: k === 0 ? 0 : W - TKW, top: PRINT_Y + 50}}>
            <Pop at={article + 6 + 3 * k}>
              <Ticket lines={k === 0 ? en : fr} hiFrom={33} hi={frame >= quart} head={frame >= declaration ? <div style={{marginBottom: 6}}><Mono size={48} color="#111">Article 1</Mono></div> : <div style={{height: 70}} />} />
            </Pop>
          </div>
        ))}
        {/* « l'article premier de la Déclaration » : la vraie page de l'ONU, en français puis en anglais ; elles partent quand
            les tickets commencent à compter (« droits »). */}
        {frame < droits ? (
          <div style={{position: 'absolute', inset: 0, zIndex: 10, opacity: gone(frame, droits - 6)}}>
            <div style={{position: 'absolute', left: 0, top: 120}}><Collage src="voix/token-dudh.png" w={520} ratio={922 / 1000} at={article} tilt={-3} /></div>
            <div style={{position: 'absolute', left: 400, top: 470}}><Collage src="voix/token-dudh-en.png" w={480} ratio={507 / 1000} at={premier} tilt={4} /></div>
          </div>
        ) : null}
        <div style={{position: 'absolute', left: 0, width: TKW, top: 730, display: 'flex', alignItems: 'baseline', gap: 20, opacity: frame >= droits ? 1 : 0}}>
          <Mono size={64} color={accent}>{String(en)}</Mono>
          {frame >= anglais ? <Pop at={anglais}><Mono size={52} color="#fff">anglais</Mono></Pop> : null}
        </div>
        <div style={{position: 'absolute', left: W - TKW, width: TKW, top: 730, display: 'flex', alignItems: 'baseline', gap: 20, opacity: frame >= droits ? 1 : 0}}>
          <Mono size={64} color={accent}>{String(fr)}</Mono>
          {frame >= francais ? <Pop at={francais}><Mono size={52} color="#fff">français</Mono></Pop> : null}
        </div>
      </div>
    </Scene>
  );
};

// ---------- 7. Chute : deux voies sur le tapis, l'aller (tes tokens) et le retour (la réponse), le long ticket descend ----------

// Le tapis va de droite à gauche : chaque bloc sort de la caisse (à droite), passe la vitre, bipe, puis s'arrête dans la file
// à gauche ; la file se lit donc dans l'ordre (« Il a lu tout Internet »). La caisse et son ticket tiennent la colonne de droite.
const CW = PHRASE.map((p) => Math.round(p.t.length * BS * MONO_CH + 16)); // blocs serrés sur leur texte (sans numéro)
const C_GAP = 4;
const SLOT_A = rowX(CW, C_GAP);
const REPLY = [96, 70, 120, 84, 104, 76]; // la réponse : des blocs sans texte (aucune réponse inventée)
const SLOT_R = rowX(REPLY, 10);
const SXC = 640; // centre de la vitre
const LANE_A = 280; // haut du tapis « aller »
const LANE_R = 540; // haut du tapis « retour »
const LANE_H = 120;
const RX = 668; // la caisse et son ticket
const ScanIcon: React.FC<{s: number}> = ({s}) => {
  const c = useAccent();
  return (
    <svg width={s} height={s * 0.7} viewBox="0 0 100 70">
      {[6, 16, 22, 34, 40, 52, 58, 64, 76, 88].map((x, k) => <rect key={x} x={x} y="8" width={k % 3 ? 4 : 7} height="54" fill={c} />)}
      <rect x="0" y="33" width="100" height="4" fill={LASER} />
    </svg>
  );
};
const Chute: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const passe = at('chute', 'passe');
  const bip = at('chute', 'bip');
  const aller = at('chute', 'aller');
  const retour = at('chute', 'retour');
  // Aller : un bip par token, de « passe » jusqu'à juste avant « aller », à vitesse constante (défilement linéaire).
  const inStep = (Math.max(bip, aller - 6) - passe) / (PHRASE.length - 1);
  const inBips = PHRASE.map((_, k) => Math.round(passe + inStep * k));
  // Vitesses (pixels par image) tirées de l'écart entre deux bips : deux blocs ne se chevauchent jamais avant la vitre.
  const V_IN = Math.ceil((Math.max(...CW) + 30) / Math.max(1, inStep));
  // Retour : la réponse passe à son tour, bip après bip, de « aller » jusqu'après « retour ».
  const outStep = (retour + 14 - aller) / (REPLY.length - 1);
  const outBips = REPLY.map((_, k) => Math.round(aller + outStep * k));
  const V_OUT = Math.ceil((Math.max(...REPLY) + 24) / Math.max(1, outStep));
  const all = [...inBips, ...outBips];
  const bips = all.filter((b) => frame >= b).length;
  // L'écran de la caisse : l'icône de scan en permanence, « bip » à chaque passage.
  const flash = all.some((b) => frame >= b && frame < b + 8);
  const stop = retour + 24;
  const off = Math.min(frame, stop) * 3;
  // Le ticket : des lignes déjà imprimées, puis une ligne par bip ; il descend jusqu'au bas du cadre utile.
  const ticketH = 330 + bips * 30;
  // Position d'un bloc : il arrive de la droite, son centre passe la vitre à son bip, puis il glisse jusqu'à sa place dans la file.
  const pos = (slot: number, w: number, b: number, v: number) => Math.max(slot, SXC - w / 2 + (b - frame) * v);
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 860}}>
        {/* Décor dès l'entrée : la caisse (icône de scan, « bip » à chaque passage), son ticket, les deux tapis, la vitre. */}
        <div style={{position: 'absolute', left: -96, top: LANE_A, width: RX + 96, overflow: 'hidden'}}><Belt w={RX + 96} h={LANE_H} off={-off} /></div>
        <div style={{position: 'absolute', left: -96, top: LANE_R, width: RX + 96, overflow: 'hidden'}}><Belt w={RX + 96} h={LANE_H} off={-off} /></div>
        <Pop at={aller} style={{position: 'absolute', left: 0, top: LANE_A - 80}}><Mono size={56} color="#fff">aller</Mono></Pop>
        <Pop at={retour} style={{position: 'absolute', left: 0, top: LANE_R - 80}}><Mono size={56} color="#fff">retour</Mono></Pop>
        {/* Aller : tes tokens, avec leur texte. */}
        {PHRASE.map((p, k) => {
          const x = pos(SLOT_A[k], CW[k], inBips[k], V_IN);
          return x < RX + 40 ? <div key={k} style={{position: 'absolute', left: x, top: LANE_A + 19, zIndex: 4}}><Block t={p.t} id={p.id} w={CW[k]} lit={frame >= inBips[k]} /></div> : null;
        })}
        {/* Retour : la réponse du modèle, des blocs de mêmes tailles, sans texte. */}
        {REPLY.map((w, k) => {
          const x = pos(SLOT_R[k], w, outBips[k], V_OUT);
          return x < RX + 40 ? <div key={k} style={{position: 'absolute', left: x, top: LANE_R + 19, width: w, height: BS * 1.7, border: `4px solid ${frame >= outBips[k] ? '#fff' : '#777'}`, background: '#262626', boxSizing: 'border-box', zIndex: 4}} /> : null;
        })}
        <div style={{position: 'absolute', left: SXC - 45, top: LANE_A - 10, zIndex: 5}}><ScanGlass w={90} h={LANE_R + LANE_H + 20 - LANE_A} /></div>
        {inBips.map((b, k) => <Bip key={`a${k}`} at={b} x={SXC} y={LANE_A + 60} />)}
        {outBips.map((b, k) => <Bip key={`r${k}`} at={b} x={SXC} y={LANE_R + 60} />)}
        {/* La caisse, à droite : les blocs en sortent ; le long ticket descend, une ligne par bip (l'aller en accent). */}
        <Pop at={2} style={{position: 'absolute', left: RX, top: 0, zIndex: 7}}>
          <Register w={220}>
            <ScanIcon s={70} />
            {flash ? <Mono size={56} color={accent}>bip</Mono> : null}
          </Register>
        </Pop>
        <div style={{position: 'absolute', left: RX + 20, top: 236, width: 180, height: Math.min(860 - 236, ticketH), overflow: 'hidden', background: '#f2efe6', boxShadow: pixelShadow('#333'), zIndex: 6, padding: '18px 18px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 12}}>
          {Array.from({length: 8}, (_, k) => <div key={`o${k}`} style={{flex: 'none', height: 18, width: `${pct(k + 2)}%`, background: '#b8b4aa'}} />)}
          {Array.from({length: bips}, (_, k) => <div key={k} style={{flex: 'none', height: 18, width: `${pct(k)}%`, background: k < PHRASE.length ? accent : '#6a6a6a'}} />)}
        </div>
      </div>
    </Scene>
  );
};

// ---------- Montage ----------

const SCENES: Record<string, React.FC> = {hook: Hook, intro: Intro, decoupe: Decoupe, nom: Nom, caisse: Caisse, blocs: Blocs, facture: Facture, chute: Chute};

export const TokenVoix: React.FC = () => <V.Montage scenes={SCENES} accent={AC} />;

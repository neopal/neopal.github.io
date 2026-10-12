// Short Mythe « L'IA lit mot par mot » (YouTube / TikTok / Instagram), épisode 9, préparé le 2026-10-12.
// Fiche mythe-lit-mot-par-mot de lexique/terms.js ; sources dans voix/lit-mot-par-mot.script.json : découpages tiktoken
// (o200k_base : la phrase mélangée en 28 tokens, la correcte en 17), le prefill d'un seul bloc puis le decode token par token,
// l'image de Madame Lemoine, NoLiMa (Adobe, février 2025 : GPT-4o de 99,3 % à 69,7 % à 32 000 tokens), le conseil
// d'Anthropic (le document en haut, la question à la fin).
// À FAIRE avant la voix : la phrase du hook est provisoire (le titre de la fiche), il manque une citation sourcée.
// L'écran suit la voix et Le mouvement (univers.md) : chaque élément entre sur le mot qui le nomme, easing et arcs.
import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {Big, Check, Draw, Mono, Pop, Say, Scene, W, clamp, ease, useAccent, withAlpha} from './kit';
import {LABEL, makeVoix} from './voix/VoixShort';
import {LEMOINE, Pixel} from './voix/Pixel';
import {Cross, Doc, Stamp, pixelShadow} from './voix/Parts';
import ALIGN from './voix/lit-mot-par-mot.align.json';
import SCRIPT from './voix/lit-mot-par-mot.script.json';

const AC = '#FF7A7A'; // catégorie Mythes vs réalité
const V = makeVoix(ALIGN, SCRIPT, 'voix/prediction-music.mp3');
const {at} = V;
export const MYTHELITVOIX_DURATION = V.duration;

const gone = (frame: number, until: number) => ease(frame, until, until + 6, [1, 0], 'inOut');

// Le vrai découpage o200k_base (tiktoken, recompté le 2026-10-12) : la phrase mélangée en entier, 28 tokens,
// et la phrase correcte, 17 tokens.
const SCRAMBLED = ['Ce', ' tx', 'ete', ' a', ' les', ' lt', 'et', 'res', ' mél', 'agn', 'ées', ',', ' m', 'ias', ' tu', ' p', 'ue', 'x', ' le', ' l', 'rie', ' sn', 'as', ' p', 'bol', 'r', 'ème', ' ?'];
const CORRECT = ['Ce', ' texte', ' a', ' les', ' lettres', ' mél', 'ang', 'ées', ',', ' mais', ' tu', ' peux', ' le', ' lire', ' sans', ' problème', ' ?'];

// Un token : une pastille mono ; l'espace initial est montré par un point discret.
const Chip: React.FC<{t: string; hi?: boolean; dim?: boolean}> = ({t, hi, dim}) => {
  const accent = useAccent();
  return (
    <div style={{border: `3px solid ${hi ? accent : '#777'}`, background: hi ? withAlpha(accent, 0.25) : '#1c1c1c', padding: '2px 10px', opacity: dim ? 0.5 : 1}}>
      <Mono size={48} color={hi ? accent : '#fff'}>{t.trim() || '·'}</Mono>
    </div>
  );
};

// ---------- 0. Hook : la phrase du mythe, en grand, avec un curseur qui lit mot après mot ----------

const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const mot = at('hook', 'mot');
  const realite = at('hook', 'réalité');
  // Le curseur saute d'un mot à l'autre, comme on imagine qu'il lit.
  const step = Math.floor(Math.max(0, frame - mot) / 8) % 3;
  return (
    <Scene>
      <div style={{position: 'relative', display: 'flex', flexDirection: 'column', gap: 6}}>
        <Stamp at={realite} size={96} tilt={-12} bg="rgba(0,0,0,0.6)" style={{right: 0, top: -170, zIndex: 2}}>FAUX</Stamp>
        <Pop at={0}><Big size={120}>« L'IA lit</Big></Pop>
        <Pop at={Math.max(2, mot - 4)}><Big size={120} color={accent}>mot par mot »</Big></Pop>
        <div style={{display: 'flex', gap: 22, marginTop: 30, opacity: frame >= mot ? gone(frame, realite) : 0}}>
          {[0, 1, 2].map((k) => <div key={k} style={{width: [150, 110, 160][k], height: 14, background: k === step ? accent : '#444'}} />)}
        </div>
      </div>
    </Scene>
  );
};

// ---------- 1. La phrase aux lettres mélangées, qu'il remet d'aplomb ----------

const Melange: React.FC = () => {
  const frame = useCurrentFrame();
  const phrase = at('melange', 'phrase');
  const aplomb = at('melange', 'aplomb');
  return (
    <Scene gap={34}>
      {/* La phrase est écrite dans la bulle : la voix la cite, le sous-titre ne la répète pas (quoted). */}
      <Pop at={phrase} style={{alignSelf: 'flex-end', background: '#2a2a2a', borderRadius: 34, padding: '24px 32px', maxWidth: 760}}>
        <Say size={64}>« Ce txete a les ltetres mélagnées »</Say>
      </Pop>
      <Pop at={aplomb} style={{alignSelf: 'flex-start', border: '4px solid #fff', borderRadius: 34, padding: '24px 32px', maxWidth: 760, display: 'flex', alignItems: 'center', gap: 16}}>
        <Say size={64}>Ce texte a les lettres mélangées</Say>
        <Check p={ease(frame, aplomb + 4, aplomb + 12)} size={70} color="#fff" />
      </Pop>
    </Scene>
  );
};

// ---------- 2. Ce qu'il reçoit : 28 morceaux, contre 17 pour la phrase correcte ----------

const Tokens: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const tokenizer = at('tokens', 'tokenizer');
  const n28 = at('tokens', '28');
  const tx = at('tokens', 'tx');
  const bol = at('tokens', 'bol');
  const correcte = at('tokens', 'correcte');
  const n17 = at('tokens', '17');
  // Les morceaux tombent en cascade pendant « l'a hachée en 28 morceaux ».
  const cut = Math.floor(ease(frame, tokenizer, n28 + 10, [0, SCRAMBLED.length], 'inOut'));
  return (
    <Scene
      gap={18}
      bottom={
        <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between'}}>
          <Pop at={n28}><Mono size={64} color={accent}>28 morceaux</Mono></Pop>
          <Pop at={n17}><Mono size={64} color="#fff">17</Mono></Pop>
        </div>
      }
    >
      <Pop at={tokenizer}><Mono size={52} color={LABEL}>tokenizer</Mono></Pop>
      <div style={{display: 'flex', flexWrap: 'wrap', gap: 8, width: W, minHeight: 250, alignContent: 'flex-start', opacity: frame >= correcte ? 0.45 : 1}}>
        {SCRAMBLED.slice(0, cut).map((t, k) => <Chip key={k} t={t} hi={(t === ' tx' && frame >= tx) || (t === 'bol' && frame >= bol)} />)}
      </div>
      <div style={{display: 'flex', flexWrap: 'wrap', gap: 8, width: W, opacity: frame >= correcte ? 1 : 0}}>
        {CORRECT.map((t, k) => <Pop key={k} at={correcte + Math.floor(k / 2)}><Chip t={t} /></Pop>)}
      </div>
    </Scene>
  );
};

// ---------- 3. Tout d'un coup : chaque morceau regarde tous les autres ----------

const LINE = ['Ce', ' texte', ' a', ' les', ' lettres'];
// Largeur de chaque pastille (le texte mono à 48 px fait environ 29 px par lettre), et son centre pour les arcs.
const WIDTHS = LINE.map((t) => 50 + 30 * t.trim().length);
const GAP_B = (W - WIDTHS.reduce((a, b) => a + b, 0)) / (LINE.length - 1);
const CENTERS = WIDTHS.map((w, k) => WIDTHS.slice(0, k).reduce((a, b) => a + b + GAP_B, 0) + w / 2);

const Bloc: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const gauche = at('bloc', 'gauche');
  const droite = at('bloc', 'droite');
  const coup = at('bloc', 'coup');
  const chacun = at('bloc', 'chacun');
  const temps = at('bloc', 'temps');
  // Une flèche qui lit de gauche à droite, barrée ; puis toutes les pastilles s'allument d'un coup.
  const sweep = ease(frame, gauche, droite + 6, [0, 1], 'inOut');
  const all = frame >= coup;
  const links = ease(frame, chacun, temps + 6);
  const xs = CENTERS;
  return (
    <Scene gap={20}>
      {/* Les liens de l'attention : un arc entre chaque paire de pastilles, tracés pendant « chacun regarde tous les autres ». */}
      <svg width={W} height={240} viewBox={`0 0 ${W} 240`} style={{overflow: 'visible'}}>
        {xs.flatMap((a, i) => xs.slice(i + 1).map((b, j) => (
          <Draw key={`${i}-${j}`} d={`M${a} 236 Q ${(a + b) / 2} ${236 - (b - a) * 0.55} ${b} 236`} p={links} width={3} len={900} color={withAlpha(accent, 0.55)} />
        )))}
      </svg>
      <div style={{display: 'flex', gap: 6, width: W, justifyContent: 'space-between'}}>
        {LINE.map((t, k) => (
          <Pop key={k} at={2 + k}><div style={{width: WIDTHS[k], display: 'flex', justifyContent: 'center', border: `3px solid ${all ? accent : '#777'}`, background: all ? withAlpha(accent, 0.25) : '#1c1c1c', padding: '2px 0'}}><Mono size={48} color="#fff">{t.trim()}</Mono></div></Pop>
        ))}
      </div>
      {/* « il ne lit pas de gauche à droite » : la flèche passe, puis se fait barrer. */}
      <div style={{position: 'relative', height: 110, opacity: frame >= gauche ? gone(frame, coup) : 0}}>
        <svg width={W} height={80} viewBox={`0 0 ${W} 80`}>
          <Draw d={`M10 40 L${W - 30} 40 M${W - 60} 14 L${W - 26} 40 L${W - 60} 66`} p={sweep} width={8} len={1000} color="#fff" />
        </svg>
        <div style={{position: 'absolute', left: W / 2 - 50, top: -10, opacity: frame >= droite ? 1 : 0}}><Cross p={ease(frame, droite, droite + 12)} size={100} /></div>
      </div>
      <Pop at={coup} style={{alignSelf: 'center'}}><Mono size={56} color={accent}>d'un coup</Mono></Pop>
    </Scene>
  );
};

// ---------- 4. Le nom : le prefill, puis la réponse un token à la fois ----------

const ANSWER = ['Oui', ',', ' je', ' peux', ' le', ' lire'];

const Nom: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const prefill = at('nom', 'prefill');
  const reponse = at('nom', 'réponse');
  const token = at('nom', 'token');
  const fois = at('nom', 'fois');
  const shown = Math.floor(interpolate(frame, [token, fois + 30], [0, ANSWER.length], clamp));
  return (
    <Scene gap={34}>
      <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
        {/* Le bloc d'entrée, d'un seul tenant. */}
        <Pop at={4} style={{display: 'flex', flexWrap: 'wrap', gap: 6, border: `6px solid ${frame >= prefill ? accent : '#555'}`, padding: 14}}>
          {LINE.map((t, k) => <Chip key={k} t={t} hi={frame >= prefill} />)}
        </Pop>
        <Pop at={prefill}><Big size={130} color={accent}>prefill</Big></Pop>
      </div>
      {/* La réponse, elle, s'écrit ensuite un token après l'autre. */}
      <div style={{display: 'flex', flexDirection: 'column', gap: 14, opacity: frame >= reponse ? 1 : 0}}>
        <Pop at={reponse}><Mono size={52} color={LABEL}>la réponse</Mono></Pop>
        <div style={{display: 'flex', gap: 8, minHeight: 70}}>
          {ANSWER.slice(0, shown).map((t, k) => <Pop key={k} at={token + k * 5}><Chip t={t} /></Pop>)}
        </div>
      </div>
    </Scene>
  );
};

// ---------- 5. L'image : Madame Lemoine, la copie d'un coup d'œil, la marge mot après mot ----------

const Prof: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const lemoine = at('prof', 'Lemoine');
  const rate = at('prof', 'raté');
  const coup = at('prof', 'coup');
  const matinee = at('prof', 'matinée');
  const rouge = at('prof', 'rouge');
  const apres = at('prof', 'après');
  // Le regard balaie la copie en un éclair ; le stylo, lui, écrit lentement dans la marge.
  const glance = ease(frame, coup, coup + 8, [0, 1], 'inOut');
  const pen = ease(frame, rouge, apres + 40, [0, 1], 'inOut');
  return (
    <Scene gap={24}>
      <div style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between'}}>
        <Pop at={lemoine} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10}}>
          <Pixel sprite={LEMOINE} px={16} seed={6} />
          <Mono size={52} color="#fff">Madame Lemoine</Mono>
        </Pop>
        <Pop at={coup} style={{paddingBottom: 60}}><Mono size={52} color={accent}>d'un coup d'œil</Mono></Pop>
      </div>
      {/* La copie : un paragraphe raté, repéré d'un coup ; la marge se remplit au stylo rouge. */}
      <Pop at={4} style={{position: 'relative', background: '#f4f4f0', border: '8px solid #cfcfcf', boxShadow: pixelShadow('#333'), padding: '26px 30px 26px 30px', display: 'flex', gap: 24}}>
        <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: 14}}>
          {[0, 1, 2, 3, 4, 5].map((k) => (
            <div key={k} style={{height: 14, width: `${[94, 86, 90, 78, 92, 70][k]}%`, background: (k === 2 || k === 3) && frame >= rate ? withAlpha(accent, 0.8) : '#555'}} />
          ))}
          {/* L'éclair du regard, du haut en bas de la copie. */}
          <div style={{position: 'absolute', left: 20, right: 200, top: 16 + 160 * glance, height: 8, background: withAlpha(accent, 0.6), opacity: frame >= coup && glance < 1 ? 1 : 0}} />
        </div>
        <div style={{width: 160, borderLeft: '4px solid #e0a0a0', paddingLeft: 12}}>
          <svg width={150} height={170} viewBox="0 0 150 170">
            <Draw d="M6 20 C 30 6, 40 34, 64 18 S 100 8, 130 22 M6 64 C 26 50, 46 78, 70 60 S 110 52, 140 66 M6 108 C 30 94, 44 120, 70 104 S 104 96, 128 110" p={pen} width={6} len={700} color="#d0302f" />
          </svg>
        </div>
      </Pop>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <Pop at={matinee}><Mono size={52} color={LABEL}>la matinée</Mono></Pop>
        <Pop at={apres}><Mono size={52} color="#d0302f">mot après mot</Mono></Pop>
      </div>
    </Scene>
  );
};

// ---------- 6. Tout lire ne veut pas dire tout peser : 99 % puis 70 % ----------

const Pese: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const texte = at('pese', 'texte');
  const n32 = at('pese', '32');
  const detail = at('pese', 'détail');
  const n70 = at('pese', '70');
  const n99 = at('pese', '99');
  const court = at('pese', 'court');
  return (
    <Scene gap={30}>
      {/* Le long texte, avec le détail caché (une ligne en couleur), qui pâlit quand la voix dit 70 %. */}
      <Pop at={texte} style={{background: '#efe9dc', border: '6px solid #000', boxShadow: pixelShadow('#444'), padding: '20px 26px', display: 'flex', flexDirection: 'column', gap: 8}}>
        {Array.from({length: 14}, (_, k) => (
          <div key={k} style={{height: 10, width: `${[92, 80, 88, 70, 95, 84][k % 6]}%`, background: k === 9 && frame >= detail ? withAlpha(accent, frame >= n70 ? 0.45 : 1) : '#9a9384'}} />
        ))}
      </Pop>
      <Pop at={n32} style={{alignSelf: 'flex-end'}}><Mono size={52} color={LABEL}>32 000 tokens</Mono></Pop>
      {/* Les deux scores : 70 % sur le texte long, 99 % sur un texte court. */}
      <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
        {[{v: 70, at: n70, label: 'texte long', c: accent}, {v: 99, at: n99, label: 'texte court', c: '#fff'}].map((b) => (
          <div key={b.v} style={{display: 'flex', alignItems: 'center', gap: 18, opacity: frame >= b.at ? 1 : 0}}>
            <div style={{width: (W - 330) * (b.v / 100) * ease(frame, b.at, b.at + 14), height: 40, background: b.c}} />
            <Mono size={56} color={b.c}>{`${b.v} %`}</Mono>
            <div style={{opacity: b.v === 99 ? (frame >= court ? 1 : 0) : 1}}><Mono size={48} color={LABEL}>{b.label}</Mono></div>
          </div>
        ))}
      </div>
    </Scene>
  );
};

// ---------- 7. Chute : le document d'abord, la question à la fin, avec ses mots exacts ----------

const Chute: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const document = at('chute', 'document');
  const question = at('chute', 'question');
  const mots = at('chute', 'mots');
  const link = ease(frame, mots, mots + 14);
  return (
    <Scene
      gap={16}
      bottom={
        <Pop at={mots} style={{display: 'flex', justifyContent: 'flex-end'}}><Mono size={52} color={accent}>ses mots exacts</Mono></Pop>
      }
    >
      <Pop at={document}>
        <Doc w={620} lines={3} hi={frame >= mots ? 1 : -1} title="ton document" />
      </Pop>
      {/* Le même mot, dans le document et dans la question : un trait les relie. */}
      <svg width={W} height={80} viewBox={`0 0 ${W} 80`} style={{opacity: frame >= mots ? 1 : 0}}>
        <Draw d="M220 4 C 220 40, 560 40, 600 76" p={link} width={8} len={460} />
      </svg>
      <Pop at={question} style={{alignSelf: 'flex-end', background: '#2a2a2a', borderRadius: 30, padding: '20px 28px', display: 'flex', flexDirection: 'column', gap: 10, width: 520}}>
        <Mono size={52} color="#fff">ta question</Mono>
        <div style={{display: 'flex', gap: 10}}>
          <div style={{height: 14, width: 120, background: '#777'}} />
          <div style={{height: 14, width: 140, background: frame >= mots ? accent : '#777'}} />
          <div style={{height: 14, width: 90, background: '#777'}} />
        </div>
      </Pop>
    </Scene>
  );
};

// ---------- Montage ----------

const SCENES: Record<string, React.FC> = {hook: Hook, melange: Melange, tokens: Tokens, bloc: Bloc, nom: Nom, prof: Prof, pese: Pese, chute: Chute};

export const MytheLitVoix: React.FC = () => <V.Montage scenes={SCENES} accent={AC} />;

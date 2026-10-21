// Short Mythe « ChatGPT, c'est une IA » (YouTube / TikTok / Instagram), épisode 11, préparé le 2026-10-19 (calage provisoire, sans voix).
// Fiche mythe-chatgpt-c-est-le-modele de lexique/terms.js ; sources dans voix/chatgpt-modele.script.json : lancement le
// 30 novembre 2022 avec GPT-3.5, plus d'une quinzaine de modèles successifs, GPT-6 sorti en septembre 2026 en trois versions
// (Luna, Sol, Astra ; OpenAI, 22 septembre 2026, Wikipédia), les protestations au retrait de GPT-4o (Wikipédia, ChatGPT),
// James Bond depuis Dr. No (1962), six acteurs de Sean Connery à Daniel Craig (Wikipédia, James Bond).
// Fil : l'agent de l'ép. 10 tourne sur un modèle ; ChatGPT aussi, et ce modèle change sous l'application.
// Accroche sans auteur (citation provisoire) : ni portrait ni objet source. Logo d'application générique (une bulle),
// jamais celui d'OpenAI ; têtes des acteurs génériques (seule la couleur des cheveux change), aucun portrait ressemblant.
// L'écran suit la voix (univers.md) : chaque élément entre sur le mot qui le nomme, at('scène', 'mot'), jamais en secondes.
// Le mouvement : ease partout, défilement de la frise en inOut, arcs pour les bulles qui volent, squash au seul tampon.
import React from 'react';
import {Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {Big, Check, Draw, Mono, Pop, Scene, W, arc, clamp, ease, useAccent, withAlpha} from './kit';
import {LABEL, makeVoix} from './voix/VoixShort';
import {Pixel} from './voix/Pixel';
import {Cross, Stamp, pixelShadow} from './voix/Parts';
import ALIGN from './voix/chatgpt-modele.align.json';
import SCRIPT from './voix/chatgpt-modele.script.json';

const AC = '#FF7A7A'; // catégorie Mythes vs réalité
const V = makeVoix(ALIGN, SCRIPT, 'voix/prediction-music.mp3');
const {at} = V;
export const MYTHEMODELEVOIX_DURATION = V.duration;

// Sortie : 6 images en inOut (plus rapide que l'entrée Pop).
const gone = (frame: number, until: number) => ease(frame, until, until + 6, [1, 0], 'inOut');
const rnd = (k: number) => {
  const x = Math.sin(k * 12.9898 + 11.7) * 43758.5453;
  return x - Math.floor(x);
};
const SKIN = '#e3b58e';

// ---------- Personnages (sprites propres à ce short, même format que Pixel.tsx) ----------

// Six têtes d'acteurs génériques : même visage, seule la coiffure et la couleur des cheveux changent.
const head = (hair: [string, string, string], color: string) => ({
  rows: [...hair, '.SSESSESS.', '.SSSSSSSS.', '.SSSRRSSS.', '..SSSSSS..', '...SSSS...'],
  palette: {H: color, S: SKIN, E: '#111', R: '#b5524f'},
});
const HEADS = [
  head(['..HHHHHH..', '.HHHHHHHH.', '.HHSSSSSH.'], '#1e1e1e'),
  head(['...HHHHH..', '.HHHHHHHH.', '.HSSSSSHH.'], '#6b4a2b'),
  head(['..HHHHHHH.', '.HHHHHHHHH', '.HSSSSSSH.'], '#a58a6a'),
  head(['.HHHHHHHH.', '.HHHHHHHH.', '.SSSSSSSS.'], '#3b2a1e'),
  head(['..HHHHHH..', 'HHHHHHHHHH', 'HHSSSSSSHH'], '#141414'),
  head(['..H.HH.H..', '.HHHHHHHH.', '.SSSSSSSS.'], '#d9bf6a'),
];

// Utilisateurs de ChatGPT (gpt4o, chute) : corps entier, ils clignent des yeux (le seul détail vivant).
const user = (hair: string[], h: string, top: string) => ({
  rows: [...hair, '...SESSES...', '...SSSSSS...', '...SSRRSS...', '....SSSS....', '..TTTTTTTT..', '.TTTTTTTTTT.', '.TTTTTTTTTT.', '.STTTTTTTTS.', '.STTTTTTTTS.', '...TTTTTT...', '...TTTTTT...'],
  palette: {H: h, S: SKIN, E: '#111', R: '#b5524f', T: top},
});
const USERS = [
  user(['....HHHH....', '...HHHHHH...', '...HSSSSH...'], '#5a3a22', '#3f8a8a'),
  user(['...HHHHHH...', '..HHHHHHHH..', '..HHSSSSHH..'], '#1e1e1e', '#d9a52b'),
  user(['....HHHH....', '...HHHHHH...', '...SSSSSS...'], '#b9b9b9', '#7a5ab5'),
];

// ---------- Pièces de l'application (SVG maison) ----------

// Logo générique d'application de chat : une bulle avec trois points (pas le logo d'une marque).
const Logo: React.FC<{s: number}> = ({s}) => (
  <svg width={s} height={s} viewBox="0 0 100 100">
    <path d="M26 10 H74 Q88 10 88 24 V56 Q88 70 74 70 H48 L26 90 V70 Q12 70 12 56 V24 Q12 10 26 10 Z" fill="#fff" />
    {[32, 50, 68].map((x) => <circle key={x} cx={x} cy={40} r={7} fill="#141414" />)}
  </svg>
);

// La fenêtre de l'application : logo et nom à gauche, barre d'adresse à droite, champ de saisie dessous.
// typing (0 -> 1) : la question tapée dans le champ.
const AppWin: React.FC<{w?: number; addr?: boolean; typing?: number}> = ({w = W, addr = true, typing = 0}) => (
  <div style={{width: w, border: '6px solid #fff', background: '#141414', boxShadow: pixelShadow('#2a2a2a'), boxSizing: 'border-box'}}>
    <div style={{display: 'flex', alignItems: 'center', gap: 16, padding: '14px 20px', borderBottom: '6px solid #fff'}}>
      <Logo s={64} />
      <Mono size={52} color="#fff">ChatGPT</Mono>
      {addr ? (
        <div style={{flex: 1, height: 60, borderRadius: 30, background: '#2a2a2a', display: 'flex', alignItems: 'center', gap: 14, padding: '0 22px', marginLeft: 14}}>
          <svg width={26} height={30} viewBox="0 0 26 30"><rect x="2" y="13" width="22" height="16" fill="#9a9a9a" /><path d="M7 13 V9 a6 6 0 0 1 12 0 V13" fill="none" stroke="#9a9a9a" strokeWidth="4" /></svg>
          <div style={{height: 12, width: '72%', background: '#6a6a6a'}} />
        </div>
      ) : null}
    </div>
    <div style={{padding: 20}}>
      <div style={{height: 70, borderRadius: 35, border: '4px solid #444', display: 'flex', alignItems: 'center', padding: '0 26px', gap: 16, boxSizing: 'border-box'}}>
        <div style={{flex: 1}}><div style={{height: 14, width: `${70 * typing}%`, background: '#9a9a9a'}} /></div>
        <div style={{width: 40, height: 40, borderRadius: 20, background: '#444'}} />
      </div>
    </div>
  </div>
);

// Un modèle : le bloc de Parts.tsx, avec bordure réglable et des cases qui varient d'un modèle à l'autre (seed).
const Block: React.FC<{w: number; seed?: number; border?: string}> = ({w, seed = 0, border = '#fff'}) => (
  <div style={{width: w, height: w * 0.62, background: '#2a2a2a', border: `${Math.max(4, Math.round(w / 50))}px solid ${border}`, boxShadow: pixelShadow('#222'), display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: w / 30, padding: w / 14, boxSizing: 'border-box'}}>
    {Array.from({length: 10}, (_, k) => <div key={k} style={{background: seed && rnd(seed * 10 + k) < 0.35 ? '#a0a0a0' : '#5a5a5a'}} />)}
  </div>
);

// Le câble entre la fenêtre et le modèle ; une pastille remonte le câble quand le modèle répond (pulses).
const Cable: React.FC<{h: number; pulses?: number[]; p?: number}> = ({h, pulses = [], p = 1}) => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const live = pulses.map((a) => interpolate(frame, [a, a + 14], [0, 1], clamp)).find((v) => v > 0 && v < 1);
  return (
    <div style={{position: 'relative', alignSelf: 'center', width: 6, height: h}}>
      <div style={{position: 'absolute', left: 0, top: 0, width: 6, height: h * p, background: '#fff'}} />
      {live !== undefined ? <div style={{position: 'absolute', left: -9, top: h * (1 - live) - 12, width: 24, height: 24, borderRadius: 12, background: accent}} /> : null}
    </div>
  );
};

// Étiquette au-dessus de la fenêtre (même logo, même adresse), avec un petit trait qui la relie à ce qu'elle nomme.
// edge : le trait part du bord gauche de l'étiquette (pour viser le logo) au lieu de son milieu.
const Tag: React.FC<{at: number; children: React.ReactNode; check?: boolean; color?: string; edge?: boolean}> = ({at: a, children, check, color, edge}) => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  return (
    <Pop at={a} style={{display: 'flex', flexDirection: 'column', alignItems: edge ? 'flex-start' : 'center'}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 4}}>
        {check ? <Check p={ease(frame, a + 4, a + 12)} size={56} color="#fff" /> : null}
        <Mono size={52} color={color ?? accent}>{children}</Mono>
      </div>
      <div style={{width: 6, height: 26, background: color ?? accent, marginLeft: edge ? 40 : 0}} />
    </Pop>
  );
};

// Rangée d'étiquettes au-dessus de la fenêtre : à gauche sur le logo, à droite sur l'adresse. Hauteur fixe.
const TagsRow: React.FC<{left?: React.ReactNode; right?: React.ReactNode}> = ({left, right}) => (
  <div style={{height: 96, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 20px 0 0'}}>
    <div style={{marginLeft: 4}}>{left}</div>
    <div style={{marginRight: 140}}>{right}</div>
  </div>
);

// ---------- 0. Hook : la phrase du mythe en grand, le tampon, puis l'application et ses modèles ----------

const ROW_N = 16;
const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const une = at('hook', 'une');
  const ia = at('hook', 'IA');
  const appli = at('hook', 'application');
  const derriere = at('hook', 'derrière');
  const quinz = at('hook', 'quinzaine');
  const modeles = at('hook', 'modèles');
  const BW = 46;
  const GAP = (W - ROW_N * BW) / (ROW_N - 1);
  const lastX = W - BW / 2;
  return (
    <Scene>
      <div style={{position: 'relative', display: 'flex', flexDirection: 'column', gap: 4}}>
        {/* Tampon FAUX : il tombe juste après la citation (squash à l'impact) et reste jusqu'à la fin du hook. */}
        <Stamp at={ia + 10} size={96} tilt={-12} bg="rgba(0,0,0,0.6)" style={{right: 0, top: -200, zIndex: 2}}>FAUX</Stamp>
        <Pop at={0}><Big size={120}>« ChatGPT,</Big></Pop>
        <Pop at={Math.max(2, une - 4)}><Big size={120}>c'est une IA »</Big></Pop>
        <div style={{height: 46}} />
        {/* « une application » : la fenêtre, pop in. */}
        <Pop at={appli}><AppWin /></Pop>
        {/* « derrière » : le câble se dessine (draw-on) jusqu'au modèle qui répond aujourd'hui, au bout de la rangée. */}
        <svg width={W} height={70} viewBox={`0 0 ${W} 70`} style={{opacity: frame >= derriere ? 1 : 0}}>
          <Draw d={`M${W / 2} 0 V30 H${lastX} V70`} p={ease(frame, derriere, derriere + 12)} width={6} len={W} color="#fff" />
        </svg>
        {/* « une quinzaine de modèles se sont succédé » : les modèles d'avant, en stagger de gauche à droite. */}
        <div style={{display: 'flex', gap: GAP}}>
          {Array.from({length: ROW_N}, (_, k) => (
            <Pop key={k} at={k === ROW_N - 1 ? derriere + 10 : quinz + 2 * k}>
              <Block w={BW} border={k === ROW_N - 1 ? '#fff' : '#777'} />
            </Pop>
          ))}
        </div>
        <Pop at={modeles} style={{marginTop: 16}}><Mono size={52} color={LABEL}>quinzaine de modèles</Mono></Pop>
      </div>
    </Scene>
  );
};

// ---------- 1. 2022 : la fenêtre ne bouge pas, la frise des modèles défile dessous ----------

const SP = 210; // écart entre deux modèles sur la frise
const FBW = 150;
const Y2022: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const d30 = at('2022', '30');
  const ouvrais = at('2022', 'ouvrais');
  const g35 = at('2022', 'GPT-3.5');
  const repondait = at('2022', 'répondait');
  const octobre = at('2022', 'octobre');
  const y26 = at('2022', '2026');
  const adresse = at('2022', 'adresse');
  const logo = at('2022', 'logo');
  const g6 = at('2022', 'GPT-6');
  const repondent = at('2022', 'répondent');
  // Défilement continu de la frise (inOut) de GPT-3.5 à GPT-6, entre « octobre » et « même adresse ».
  const off = ease(frame, octobre, Math.max(octobre + 20, adresse - 4), [0, (ROW_N - 1) * SP], 'inOut');
  const cur = Math.round(off / SP);
  return (
    <Scene>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <TagsRow left={<Tag at={logo} edge>même logo</Tag>} right={<Tag at={adresse}>même adresse</Tag>} />
        {/* Décor posé dès l'entrée : la fenêtre ; « tu ouvrais ChatGPT » : la question se tape dans le champ. */}
        <Pop at={2}><AppWin typing={ease(frame, ouvrais, ouvrais + 16)} /></Pop>
        <Cable h={70} pulses={[repondait, repondent]} />
        {/* La frise : pop in sur la date, puis elle défile sous le câble. */}
        <Pop at={d30} style={{position: 'relative', height: 260}}>
          <div style={{position: 'absolute', left: -200, width: 1480, top: FBW * 0.31 - 3, height: 6, background: '#444'}} />
          {Array.from({length: ROW_N}, (_, k) => {
            const x = W / 2 + k * SP - off;
            const lit = (k === 0 && frame >= g35 && cur === 0) || (k === ROW_N - 1 && frame >= g6);
            return (
              <div key={k} style={{position: 'absolute', left: x - FBW / 2, top: 0, width: FBW, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12}}>
                <Block w={FBW} seed={k + 1} border={lit ? accent : k === cur ? '#fff' : '#666'} />
                {k === 0 ? (
                  <>
                    <div style={{opacity: frame >= g35 ? 1 : 0}}><Mono size={52} color="#fff">GPT-3.5</Mono></div>
                    <Mono size={48} color={LABEL}>30 novembre 2022</Mono>
                  </>
                ) : null}
                {k === ROW_N - 1 ? (
                  <>
                    <div style={{opacity: frame >= g6 ? 1 : 0}}><Mono size={52} color="#fff">GPT-6</Mono></div>
                    <div style={{opacity: frame >= y26 - 6 ? 1 : 0}}><Mono size={48} color={LABEL}>octobre 2026</Mono></div>
                  </>
                ) : null}
              </div>
            );
          })}
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 2. L'application en coupe : le modèle au centre, les couches autour, l'aiguillage ----------

const Sheet: React.FC<{s: number}> = ({s}) => {
  const c = useAccent();
  return (
    <svg width={s} height={s} viewBox="0 0 100 100">
      <rect x="20" y="10" width="60" height="80" fill="none" stroke={c} strokeWidth="7" />
      {[30, 46, 62, 78].map((y) => <path key={y} d={`M32 ${y} H68`} stroke={c} strokeWidth="6" />)}
    </svg>
  );
};
const Notebook: React.FC<{s: number}> = ({s}) => {
  const c = useAccent();
  return (
    <svg width={s} height={s} viewBox="0 0 100 100">
      <rect x="24" y="10" width="58" height="80" fill="none" stroke={c} strokeWidth="7" />
      {[24, 42, 60, 78].map((y) => <path key={y} d={`M14 ${y} H32`} stroke={c} strokeWidth="6" />)}
      <rect x="44" y="28" width="26" height="14" fill={c} />
    </svg>
  );
};
const Globe: React.FC<{s: number}> = ({s}) => {
  const c = useAccent();
  return (
    <svg width={s} height={s} viewBox="0 0 100 100">
      <circle cx="44" cy="44" r="32" fill="none" stroke={c} strokeWidth="7" />
      <ellipse cx="44" cy="44" rx="13" ry="32" fill="none" stroke={c} strokeWidth="5" />
      <path d="M12 44 H76" stroke={c} strokeWidth="5" />
      <circle cx="72" cy="72" r="12" fill="#000" stroke={c} strokeWidth="6" />
      <path d="M80 80 L94 94" stroke={c} strokeWidth="8" strokeLinecap="round" />
    </svg>
  );
};

const CH = 760; // hauteur du schéma de la coupe
const HUB: [number, number] = [W / 2, 500];
const SLOTS = [148, W / 2, W - 148];
const MTOP = 590;
const Appli: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const modele = at('appli', 'modèle');
  const fichier = at('appli', 'fichier');
  const predit = at('appli', 'prédit');
  const suite = at('appli', 'suite');
  const chat = at('appli', 'ChatGPT');
  const appli = at('appli', 'application');
  const autour = at('appli', 'autour');
  const consignes = at('appli', 'consignes');
  const memoire = at('appli', 'mémoire');
  const recherche = at('appli', 'recherche');
  const choisit = at('appli', 'choisit');
  const quel = at('appli', 'quel');
  const repond = at('appli', 'répond');
  // Le modèle se range au centre de la coupe (inOut) quand la voix passe à ChatGPT.
  const mv = ease(frame, chat, chat + 16, [0, 1], 'inOut');
  const mw = interpolate(mv, [0, 1], [300, 170]);
  const cy = interpolate(mv, [0, 1], [330, MTOP + 170 * 0.31]);
  const before = frame < chat + 6;
  // L'aiguillage : l'aiguille pivote à gauche, puis à droite, puis se pose au centre sur « répond ».
  const ang = (x: number) => Math.atan2(MTOP - 30 - HUB[1], x - HUB[0]);
  const a = frame < quel ? ang(SLOTS[0]) : frame < repond ? interpolate(ease(frame, quel, quel + 8, [0, 1], 'inOut'), [0, 1], [ang(SLOTS[0]), ang(SLOTS[2])]) : interpolate(ease(frame, repond, repond + 8, [0, 1], 'inOut'), [0, 1], [ang(SLOTS[2]), ang(SLOTS[1])]);
  const chips = [
    {cue: consignes, x: SLOTS[0], icon: <Sheet s={90} />, label: ['consignes'], from: [SLOTS[0], 300]},
    {cue: memoire, x: SLOTS[1], icon: <Notebook s={90} />, label: ['mémoire'], from: [SLOTS[1], 300]},
    {cue: recherche, x: SLOTS[2], icon: <Globe s={90} />, label: ['recherche', 'web'], from: [SLOTS[2], 352]},
  ];
  return (
    <Scene>
      <div style={{position: 'relative', height: CH}}>
        {/* Phase 1 : le modèle seul, du texte entre, la suite sort (pop in puis fade out quand ChatGPT arrive). */}
        {before ? (
          <div style={{position: 'absolute', inset: 0, opacity: gone(frame, chat)}}>
            <Pop at={predit} style={{position: 'absolute', left: 0, top: 280, width: 200, display: 'flex', flexDirection: 'column', gap: 14}}>
              {[90, 70, 84].map((w, k) => <div key={k} style={{height: 18, width: `${w}%`, background: '#9a9a9a'}} />)}
            </Pop>
            <Pop at={suite} style={{position: 'absolute', right: 0, top: 300, display: 'flex', alignItems: 'center', gap: 16}}>
              <svg width={60} height={40} viewBox="0 0 60 40"><Draw d="M4 20 H50 M36 6 L52 20 L36 34" p={ease(frame, suite, suite + 8)} width={7} len={120} color="#fff" /></svg>
              <div style={{width: 110, height: 26, background: accent}} />
            </Pop>
            <Pop at={fichier} style={{position: 'absolute', left: 0, right: 0, top: 470, display: 'flex', justifyContent: 'center'}}>
              <Mono size={52} color={LABEL}>fichier de paramètres</Mono>
            </Pop>
          </div>
        ) : null}
        {/* Phase 2 : le cadre de l'application se dessine autour (draw-on), son en-tête en pop in. */}
        <svg width={W} height={CH} viewBox={`0 0 ${W} ${CH}`} style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
          <Draw d={`M${W / 2} 3 H${W - 3} V${CH - 3} H3 V3 Z`} p={ease(frame, appli, autour + 10)} width={6} len={2 * (W + CH)} color="#fff" />
          <Draw d={`M3 110 H${W - 3}`} p={ease(frame, autour, autour + 10)} width={6} len={W} color="#fff" />
          {/* Chaque couche se branche sur l'aiguillage (draw-on), sur le mot qui la nomme. */}
          {chips.map((c, k) => (
            <Draw key={k} d={`M${c.from[0]} ${c.from[1]} Q${c.from[0]} ${HUB[1]} ${HUB[0]} ${HUB[1]}`} p={ease(frame, c.cue + 6, c.cue + 18)} width={6} len={420} color={withAlpha(accent, 0.7)} />
          ))}
          {/* Les voies de l'aiguillage vers trois modèles, sur « choisit ». */}
          {SLOTS.map((x, k) => (
            <Draw key={k} d={`M${HUB[0]} ${HUB[1]} L${x} ${MTOP - 6}`} p={ease(frame, choisit + 2 * k, choisit + 2 * k + 10)} width={5} len={360} color="#777" />
          ))}
          {frame >= choisit ? (
            <>
              <path d={`M${HUB[0]} ${HUB[1]} l${Math.cos(a) * 80} ${Math.sin(a) * 80}`} stroke={accent} strokeWidth={12} strokeLinecap="round" />
              <circle cx={HUB[0]} cy={HUB[1]} r={16} fill="#fff" />
            </>
          ) : frame >= consignes + 6 ? <circle cx={HUB[0]} cy={HUB[1]} r={12} fill="#fff" /> : null}
        </svg>
        <Pop at={chat} style={{position: 'absolute', left: 24, top: 22, display: 'flex', alignItems: 'center', gap: 16}}>
          <Logo s={64} />
          <Mono size={52} color="#fff">ChatGPT</Mono>
        </Pop>
        {chips.map((c, k) => (
          <Pop key={k} at={c.cue} style={{position: 'absolute', left: c.x - 150, width: 300, top: 130, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6}}>
            {c.icon}
            {c.label.map((l) => <Mono key={l} size={48} color="#fff">{l}</Mono>)}
          </Pop>
        ))}
        {/* Les deux autres modèles possibles, sur « choisit » ; celui qui répond s'entoure d'accent sur « répond ». */}
        {[0, 2].map((k, i) => (
          <Pop key={k} at={choisit + 4 + 3 * i} style={{position: 'absolute', left: SLOTS[k] - 85, top: MTOP, opacity: 0.6}}>
            <Block w={170} seed={k + 3} />
          </Pop>
        ))}
        <div style={{position: 'absolute', left: W / 2 - mw / 2, top: cy - mw * 0.31, outline: frame >= repond ? `6px solid ${accent}` : 'none', outlineOffset: 8}}>
          <Pop at={Math.max(2, modele - 4)}><Block w={mw} /></Pop>
        </div>
      </div>
    </Scene>
  );
};

// ---------- 3. James Bond : le smoking reste, l'acteur change ----------

// Le smoking, en SVG maison (viewBox 300 x 300). parts : smoking (chemise, revers, nœud), martini, cintre (rôle vide).
const Tux: React.FC<{w: number; shirt: number; martini: number; hanger?: boolean}> = ({w, shirt, martini, hanger}) => (
  <svg width={w} height={w} viewBox="0 0 300 300" style={{overflow: 'visible'}}>
    {hanger ? <path d="M120 0 a12 12 0 1 1 12 12 V24 L40 72 H200 L132 24" fill="none" stroke="#cfcfcf" strokeWidth="6" /> : <rect x="106" y="22" width="28" height="34" fill={SKIN} />}
    {/* Bras droit qui tient le verre. */}
    <path d="M182 92 L246 160" stroke="#fff" strokeWidth="44" strokeLinecap="round" opacity={martini} />
    <path d="M182 92 L246 160" stroke="#262626" strokeWidth="34" strokeLinecap="round" opacity={martini} />
    <path d="M50 74 Q120 44 190 74 L215 300 L25 300 Z" fill="#262626" stroke="#fff" strokeWidth="5" />
    <g opacity={shirt} transform={`translate(120 52) scale(${0.6 + 0.4 * shirt}) translate(-120 -52)`}>
      <path d="M98 56 L120 160 L142 56 Z" fill="#f2f2f2" />
      <path d="M98 56 L80 178 L120 160 Z M142 56 L160 178 L120 160 Z" fill="#161616" stroke="#fff" strokeWidth="3" />
      <path d="M102 50 L120 60 L102 70 Z M138 50 L120 60 L138 70 Z" fill="#111" stroke="#cfcfcf" strokeWidth="2" />
    </g>
    <g opacity={martini} transform={`translate(250 160) scale(${0.6 + 0.4 * martini}) translate(-250 -160)`}>
      <path d="M216 66 L284 66 L250 110 Z" fill="rgba(207,232,255,0.25)" stroke="#fff" strokeWidth="5" strokeLinejoin="round" />
      <path d="M250 110 V158 M232 160 H268" stroke="#fff" strokeWidth="5" />
      <path d="M242 70 L266 98" stroke="#cfcfcf" strokeWidth="3" />
      <circle cx="258" cy="86" r="8" fill="#8fbf5a" />
      <circle cx="250" cy="150" r="13" fill={SKIN} />
    </g>
  </svg>
);

// Le canon de pistolet stylisé (décor) : cercles et rayures en spirale.
const Barrel: React.FC<{r: number}> = ({r}) => (
  <svg width={2 * r} height={2 * r} viewBox="-100 -100 200 200">
    <circle r="98" fill="#101010" stroke="#3a3a3a" strokeWidth="3" />
    {[78, 58, 38].map((q) => <circle key={q} r={q} fill="none" stroke="#262626" strokeWidth="2" />)}
    {Array.from({length: 8}, (_, k) => {
      const pts = Array.from({length: 12}, (_, i) => {
        const rr = 22 + i * 7;
        const t = (k / 8) * Math.PI * 2 + (rr / 98) * 1.1;
        return `${(rr * Math.cos(t)).toFixed(1)},${(rr * Math.sin(t)).toFixed(1)}`;
      });
      return <polyline key={k} points={pts.join(' ')} fill="none" stroke="#2e2e2e" strokeWidth="4" />;
    })}
  </svg>
);

// Les six acteurs, de vraies photos de Wikimedia Commons pixelisées en 48 × 63 (comme le portrait de Luc Julia, ép. 7) ;
// crédits dans voix/chatgpt-modele.script.json (champ credits), à recopier dans la description.
const ACTORS = ['connery', 'lazenby', 'moore', 'dalton', 'brosnan', 'craig'];
const Portrait: React.FC<{k: number; w: number; border?: string}> = ({k, w, border = '#fff'}) => (
  <div style={{border: `${Math.max(3, Math.round(w / 30))}px solid ${border}`, boxShadow: pixelShadow('#222'), lineHeight: 0}}>
    <Img src={staticFile(`voix/chatgpt-modele-bond-${ACTORS[k]}.png`)} style={{width: w, height: Math.round((w * 63) / 48), imageRendering: 'pixelated', display: 'block'}} />
  </div>
);
const HPX = 13; // taille d'un pixel des têtes sur la silhouette
const Bond: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const james = at('bond', 'James');
  const nom = at('bond', 'nom');
  const smoking = at('bond', 'smoking');
  const martini = at('bond', 'martini');
  const y1962 = at('bond', '1962');
  const six = at('bond', 'six');
  const role = at('bond', 'rôle');
  const sean = at('bond', 'Sean');
  const daniel = at('bond', 'Daniel');
  // « six acteurs ont tenu le rôle » : les têtes se remplacent en cascade (stagger de 6 images) jusqu'à « rôle ».
  const step = Math.max(5, Math.floor((role - six) / 6));
  const idx = frame < six ? 0 : Math.min(5, Math.floor((frame - six) / step));
  return (
    <Scene>
      <div style={{position: 'relative', height: 820}}>
        {/* Décor posé dès l'entrée : le canon de pistolet. */}
        <Pop at={2} style={{position: 'absolute', left: W / 2 - 240, top: 0}}><Barrel r={240} /></Pop>
        {/* « James Bond » : la silhouette en smoking, pop in. */}
        <Pop at={james} style={{position: 'absolute', left: W / 2 - 132, top: 120}}>
          <Tux w={330} shirt={ease(frame, smoking, smoking + 8)} martini={ease(frame, martini, martini + 8)} />
        </Pop>
        <Pop at={james} style={{position: 'absolute', left: W / 2 - 60, top: 6}}>
          <Portrait key={idx} k={idx} w={120} />
        </Pop>
        {/* « le nom » : la plaque, fixe jusqu'à la fin. */}
        <div style={{position: 'absolute', left: 0, right: 0, top: 500, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <Pop at={nom} style={{border: '5px solid #fff', padding: '8px 22px'}}><Mono size={64} color="#fff">James Bond</Mono></Pop>
          <Pop at={y1962} style={{opacity: frame >= six ? 0.45 : 1}}><Mono size={56} color={LABEL}>depuis 1962</Mono></Pop>
        </div>
        {/* Les six acteurs, en stagger dans l'ordre de lecture, synchrones avec la tête qui change. */}
        <div style={{position: 'absolute', left: 0, right: 0, top: 650, display: 'flex', justifyContent: 'space-between'}}>
          {ACTORS.map((_, k) => (
            <Pop key={k} at={six + k * step} style={{lineHeight: 0, outline: (k === 0 && frame >= sean) || (k === 5 && frame >= daniel) ? `5px solid ${accent}` : 'none', outlineOffset: 6}}>
              <Portrait k={k} w={80} />
            </Pop>
          ))}
        </div>
        <div style={{position: 'absolute', left: 0, right: 0, top: 770, display: 'flex', justifyContent: 'space-between'}}>
          <Pop at={sean}><Mono size={48} color="#fff">Sean Connery</Mono></Pop>
          <Pop at={daniel}><Mono size={48} color="#fff">Daniel Craig</Mono></Pop>
        </div>
      </div>
    </Scene>
  );
};

// ---------- 4. Le rôle et l'acteur : le parallèle en deux colonnes ----------

const Role: React.FC = () => {
  const accent = useAccent();
  const role = at('role', 'rôle');
  const modele = at('role', 'modèle');
  const acteur = at('role', 'acteur');
  const col = (x: number): React.CSSProperties => ({position: 'absolute', left: x - 210, width: 420, display: 'flex', justifyContent: 'center'});
  return (
    <Scene>
      <div style={{position: 'relative', height: 760}}>
        <Pop at={role + 5} style={{...col(210), top: 0}}><Mono size={64} color={accent}>le rôle</Mono></Pop>
        <Pop at={acteur + 5} style={{...col(W - 210), top: 0}}><Mono size={64} color={accent}>l'acteur</Mono></Pop>
        {/* Le rôle : le smoking vide sur son cintre ; l'acteur : une tête. Pop in sur le mot. */}
        <Pop at={role} style={{...col(210), top: 100}}><Tux w={280} shirt={1} martini={1} hanger /></Pop>
        <Pop at={acteur} style={{...col(W - 210), top: 110}}><Portrait k={5} w={170} /></Pop>
        <Pop at={role} style={{...col(210), top: 400}}><Mono size={72} color="#fff">=</Mono></Pop>
        <Pop at={acteur} style={{...col(W - 210), top: 400}}><Mono size={72} color="#fff">=</Mono></Pop>
        {/* ChatGPT (dit en premier) : la fenêtre ; le modèle : le bloc. */}
        <Pop at={0} style={{...col(210), top: 520}}><AppWin w={410} addr={false} /></Pop>
        <Pop at={modele} style={{...col(W - 210), top: 530}}><Block w={260} /></Pop>
      </div>
    </Scene>
  );
};

// ---------- 5. GPT-6 : trois versions derrière une seule fenêtre ----------

const VERSIONS = [
  {name: 'Luna', cue: 'Luna', head: 1},
  {name: 'Sol', cue: 'Sol', head: 3},
  {name: 'Astra', cue: 'Astra', head: 4},
];
const Gpt6: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const sept = at('gpt6', 'septembre');
  const g6 = at('gpt6', 'GPT-6');
  const trois = at('gpt6', 'trois');
  const acteurs = at('gpt6', 'acteurs');
  const seul = at('gpt6', 'seul');
  const BOXW = 240;
  return (
    <Scene>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <TagsRow left={<Pop at={sept} style={{paddingBottom: 20}}><Mono size={52} color={LABEL}>septembre 2026</Mono></Pop>} />
        <Pop at={2}><AppWin /></Pop>
        {/* « un seul rôle » : trois câbles partent de la même fenêtre (draw-on). */}
        <svg width={W} height={90} viewBox={`0 0 ${W} 90`}>
          {SLOTS.map((x, k) => <Draw key={k} d={`M${W / 2} 0 Q${W / 2} 60 ${x} 90`} p={ease(frame, seul + 2 * k, seul + 2 * k + 12)} width={6} len={420} color="#fff" />)}
        </svg>
        {/* « GPT-6 » : la famille, un cadre en pointillés ; ses trois versions entrent en stagger. */}
        <Pop at={g6} style={{position: 'relative', border: `5px dashed ${accent}`, height: 400, boxSizing: 'border-box'}}>
          <div style={{position: 'absolute', left: 20, top: -40, background: '#000', padding: '0 12px'}}><Mono size={64} color={accent}>GPT-6</Mono></div>
          {VERSIONS.map((v, k) => {
            const cue = at('gpt6', v.cue);
            return (
              <div key={v.name} style={{position: 'absolute', left: SLOTS[k] - BOXW / 2, width: BOXW, top: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12}}>
                <div style={{height: 80, display: 'flex', alignItems: 'flex-end'}}>
                  <Pop at={acteurs + 3 * k}><Portrait k={v.head} w={60} /></Pop>
                </div>
                <Pop at={trois + 3 * k}><Block w={220} seed={k + 7} /></Pop>
                <Pop at={cue}><Mono size={56} color="#fff">{v.name}</Mono></Pop>
              </div>
            );
          })}
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 6. GPT-4o : on retire le modèle, les utilisateurs protestent, la fenêtre ne bouge pas ----------

const Bubble: React.FC<{w: number}> = ({w}) => {
  const accent = useAccent();
  return (
    <div style={{position: 'relative', width: w, background: '#1c1c1c', border: `5px solid ${accent}`, borderRadius: 28, padding: '16px 22px', boxSizing: 'border-box', display: 'flex', alignItems: 'center', gap: 16}}>
      <Mono size={64} color={accent}>!</Mono>
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: 10}}>
        <div style={{height: 12, width: '90%', background: '#9a9a9a'}} />
        <div style={{height: 12, width: '60%', background: '#9a9a9a'}} />
      </div>
    </div>
  );
};

const BUBBLES: {x: number; y: number; from: [number, number]}[] = [
  {x: 0, y: 420, from: [40, 760]},
  {x: W - 270, y: 410, from: [W - 120, 760]},
  {x: 10, y: 560, from: [300, 760]},
];
const Gpt4o: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const g4o = at('gpt4o', 'GPT-4o');
  const util = at('gpt4o', 'utilisateurs');
  const protest = at('gpt4o', 'protesté');
  const change = at('gpt4o', 'changé');
  const adresse = at('gpt4o', 'adresse');
  const logo = at('gpt4o', 'logo');
  // Le bloc GPT-4o sort (anticipation : petit recul, puis il part en arc vers la droite), un autre prend sa place.
  const out = ease(frame, g4o + 12, g4o + 22, [0, 1], 'inOut');
  const back = interpolate(frame, [g4o + 6, g4o + 10, g4o + 12], [0, -14, 0], clamp);
  const [ox, oy] = arc(out, [0, 0], [560, 160], 50);
  const shots = [protest, protest + 10, change];
  return (
    <Scene
      bottom={
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', padding: '0 20px'}}>
          {USERS.map((u, k) => <Pop key={k} at={util + 3 * k}><Pixel sprite={u} px={9} seed={k + 4} /></Pop>)}
        </div>
      }
    >
      <div style={{position: 'relative', height: 640}}>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <TagsRow left={<Tag at={logo} check color="#fff" edge>le logo</Tag>} right={<Tag at={adresse} check color="#fff">l'adresse</Tag>} />
          <Pop at={2}><AppWin /></Pop>
          <Cable h={60} />
          <div style={{position: 'relative', height: 220}}>
            {/* Le modèle d'avant : décor dès l'entrée, nommé sur « GPT-4o », puis il sort (fade + arc). */}
            {frame < g4o + 24 ? (
              <div style={{position: 'absolute', left: W / 2 - 120 + ox + back, top: oy, opacity: 1 - out, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, width: 240}}>
                <Pop at={2}><Block w={240} seed={4} border={frame >= g4o ? accent : '#fff'} /></Pop>
                <Pop at={g4o}><Mono size={56} color="#fff">GPT-4o</Mono></Pop>
              </div>
            ) : null}
            <div style={{position: 'absolute', left: W / 2 - 120, top: 0}}>
              <Pop at={g4o + 22}><Block w={240} seed={9} /></Pop>
            </div>
          </div>
        </div>
        {/* Les bulles de protestation volent en arc depuis les utilisateurs et se posent autour de la fenêtre. */}
        {BUBBLES.map((b, k) => {
          const p = ease(frame, shots[k], shots[k] + 12);
          const [x, y] = arc(p, b.from, [b.x, b.y], 80);
          return frame >= shots[k] ? (
            <div key={k} style={{position: 'absolute', left: x, top: y, transform: `scale(${0.5 + 0.5 * p})`, transformOrigin: 'left top', zIndex: 3}}>
              <Bubble w={270} />
            </div>
          ) : null;
        })}
      </div>
    </Scene>
  );
};

// ---------- 7. Chute : « quel modèle ? », « à quelle date ? » ----------

const Calculator: React.FC<{s: number}> = ({s}) => (
  <svg width={s} height={s * 1.3} viewBox="0 0 100 130">
    <rect x="8" y="4" width="84" height="122" rx="8" fill="#2a2a2a" stroke="#fff" strokeWidth="5" />
    <rect x="18" y="14" width="64" height="26" fill="#9fbf8f" />
    {Array.from({length: 12}, (_, k) => <rect key={k} x={18 + (k % 3) * 23} y={50 + Math.floor(k / 3) * 18} width="18" height="12" fill="#cfcfcf" />)}
  </svg>
);

// Étiquette collée sur la fenêtre, de travers.
const Sticker: React.FC<{at: number; children: React.ReactNode; tilt: number; style: React.CSSProperties}> = ({at: a, children, tilt, style}) => {
  const accent = useAccent();
  return (
    <div style={{position: 'absolute', zIndex: 3, transform: `rotate(${tilt}deg)`, ...style}}>
      <Pop at={a} style={{background: '#000', border: `5px solid ${accent}`, padding: '6px 18px'}}>
        <Mono size={56} color={accent}>{children}</Mono>
      </Pop>
    </div>
  );
};

const NAMES: Record<number, string> = {0: 'GPT-3.5', 15: 'GPT-6'};
const Chute: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const quelquun = at('chute', 'quelqu');
  const dit = at('chute', 'dit');
  const nul = at('chute', 'nul');
  const calcul = at('chute', 'calcul');
  const demande = at('chute', 'demande');
  const quel = at('chute', 'quel', 1);
  const modele = at('chute', 'modèle');
  const quelle = at('chute', 'quelle');
  const date = at('chute', 'date');
  // « à quelle date » : le curseur parcourt la frise de 2022 à 2026, le modèle sous la fenêtre change avec lui.
  const pos = ease(frame, date, date + 40, [0, ROW_N - 1], 'inOut');
  const idx = Math.round(pos);
  const MB = 60;
  const MG = (W - ROW_N * MB) / (ROW_N - 1);
  // Changement de modèle : le bloc s'estompe et glisse un peu à chaque passage d'un cran à l'autre.
  const swap = Math.min(1, Math.max(0, 1 - 2 * Math.abs(pos - idx)) * 1.6);
  return (
    <Scene>
      <div style={{position: 'relative', height: 820}}>
        {/* Décor : la fenêtre, posée dès l'entrée ; « quel modèle ? » se colle sur la fenêtre, « quelle date ? » sous la frise. */}
        <Pop at={2}><AppWin /></Pop>
        <Sticker at={quel} tilt={-4} style={{right: -10, top: 118}}>quel modèle ?</Sticker>
        <Sticker at={quelle} tilt={3} style={{left: 0, top: 735}}>quelle date ?</Sticker>
        {/* « quelqu'un te dit » : la personne et sa bulle (calculatrice barrée sur « nul en calcul ») ; fade out sur « demande-lui ». */}
        {frame < demande + 6 ? (
          <div style={{position: 'absolute', left: 0, right: 0, top: 320, display: 'flex', alignItems: 'flex-end', gap: 40, opacity: gone(frame, demande)}}>
            <Pop at={quelquun}><Pixel sprite={USERS[2]} px={16} seed={1} /></Pop>
            <Pop at={dit} style={{marginBottom: 120, border: '5px solid #fff', borderRadius: 30, padding: '20px 30px', display: 'flex', alignItems: 'center', gap: 26}}>
              <Logo s={90} />
              <div style={{position: 'relative', lineHeight: 0, opacity: frame >= calcul ? 1 : 0}}>
                <Calculator s={110} />
                <div style={{position: 'absolute', left: -30, top: -5}}><Cross p={ease(frame, Math.max(nul, calcul) + 4, Math.max(nul, calcul) + 16)} size={170} color="#FF4D4D" /></div>
              </div>
            </Pop>
          </div>
        ) : null}
        {frame >= demande ? (
          <div style={{position: 'absolute', left: 0, right: 0, top: 240, display: 'flex', flexDirection: 'column'}}>
            <Cable h={60} p={ease(frame, demande + 4, demande + 14)} />
            {/* Le modèle sous la fenêtre : il change au fil de la frise (ses cases et son nom). */}
            <Pop at={modele} style={{alignSelf: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, height: 210}}>
              <div style={{transform: `translateY(${(1 - swap) * -16}px)`, opacity: 0.4 + 0.6 * swap}}>
                <Block w={220} seed={idx + 1} border={NAMES[idx] ? accent : '#fff'} />
              </div>
              <div style={{opacity: NAMES[idx] ? 1 : 0}}><Mono size={56} color="#fff">{NAMES[idx] ?? ' '}</Mono></div>
            </Pop>
            {/* La frise des modèles, de 2022 à 2026, avec son curseur. */}
            <Pop at={quelle + 5} style={{position: 'relative', height: 200, marginTop: 30}}>
              <div style={{position: 'absolute', left: (MB + MG) * pos + MB / 2 - 16, top: 0, width: 0, height: 0, borderLeft: '16px solid transparent', borderRight: '16px solid transparent', borderTop: `24px solid ${accent}`}} />
              <div style={{position: 'absolute', top: 36, left: 0, right: 0, display: 'flex', gap: MG}}>
                {Array.from({length: ROW_N}, (_, k) => <Block key={k} w={MB} border={k === idx ? accent : '#777'} />)}
              </div>
              <div style={{position: 'absolute', top: 100, left: 0, right: 0, display: 'flex', justifyContent: 'space-between'}}>
                <Mono size={48} color={LABEL}>2022</Mono>
                <Mono size={48} color={LABEL}>2026</Mono>
              </div>
            </Pop>
          </div>
        ) : null}
      </div>
    </Scene>
  );
};

// ---------- Montage ----------

const SCENES: Record<string, React.FC> = {hook: Hook, '2022': Y2022, appli: Appli, bond: Bond, role: Role, gpt6: Gpt6, gpt4o: Gpt4o, chute: Chute};

export const MytheModeleVoix: React.FC = () => <V.Montage scenes={SCENES} accent={AC} />;

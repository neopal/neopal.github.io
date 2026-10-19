// Short AI slop (YouTube / TikTok / Instagram), épisode 12, voix off PAL - FR, préparé le 2026-10-19 (calage provisoire, sans voix).
// Fiche ai-slop de lexique/terms.js ; sources dans voix/ai-slop.script.json : Kapwing, AI Slop Report (28 novembre 2025 :
// un compte YouTube neuf en octobre 2025, un Short de slop sur cinq parmi les premiers proposés) ; slop, la pâtée des cochons ;
// Merriam-Webster, slop mot de l'année 2025 (NBC News, 15 décembre 2025) ; l'image de Tata Ginette et du groupe de famille ;
// Deezer Newsroom (juillet 2026 : jusqu'à 90 000 morceaux générés par jour en juin 2026, plus de la moitié des envois,
// 1 à 3 % des écoutes, jusqu'à 85 % de ces écoutes frauduleuses en 2025).
// Fil : après le modèle qui change sous l'appli, ce que ces modèles déversent quand personne ne relit.
// Les images de slop (public/voix/ai-slop-*.jpg) sont générées exprès par IA (ElevenLabs, gpt-image-2.5-sunburst) : à créditer en description.
// L'écran suit la voix et Le mouvement (univers.md) : chaque élément entre sur le mot qui le nomme (at), easing du kit,
// arcs pour ce qui vole, un seul punch zoom (sur 90 000), italique d'accent seulement au hook et sur le terme (scène nom).
import React from 'react';
import {Img, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Big, Draw, Eye, Mono, Pop, Scene, W, arc, countUp, ease, punch, typed, useAccent, withAlpha} from './kit';
import {LABEL, makeVoix} from './voix/VoixShort';
import {Pixel} from './voix/Pixel';
import {Cross, pixelShadow} from './voix/Parts';
import ALIGN from './voix/ai-slop.align.json';
import SCRIPT from './voix/ai-slop.script.json';

const AC = '#F08DC2'; // catégorie Écosystème
const V = makeVoix(ALIGN, SCRIPT, 'voix/prediction-music.mp3');
const {at} = V;
export const AISLOPVOIX_DURATION = V.duration;

const gone = (frame: number, until: number) => ease(frame, until, until + 6, [1, 0], 'inOut');
const rnd = (k: number) => {
  const x = Math.sin(k * 12.9898 + 21.73) * 43758.5453;
  return x - Math.floor(x);
};
const COLORS = ['#5b7fb5', '#4f8a5b', '#e8c45a', '#b5524f', '#8e4a7a', '#e07b39'];
const SKIN = '#e3b58e';

// ---------- Sprites propres à ce short (même format que voix/Pixel.tsx) ----------

// Le cochon, de profil, le groin tourné vers l'auge ; il cligne des yeux.
const COCHON = {
  rows: [
    '...pp...........',
    '..PPPP..........',
    '.PPEPPPPPPPPPPP.',
    'NNPPPPPPPPPPPPPP',
    'NNPPPPPPPPPPPPPC',
    '.PPPPPPPPPPPPPP.',
    '..PPPPPPPPPPPP..',
    '..PP.PP...PP.PP.',
    '..PP.PP...PP.PP.',
    '..hh.hh...hh.hh.',
  ],
  palette: {P: '#f2a7b8', S: '#f2a7b8', p: '#d97a93', N: '#d97a93', E: '#111', C: '#d97a93', h: '#5a3a3a'},
};

// Tata Ginette : permanente mauve, lunettes, collier de perles, gilet fuchsia.
const GINETTE = {
  rows: [
    '..HHHHHHHH..',
    '.HHHHHHHHHH.',
    '.HHSSSSSSHH.',
    '.HGEGSSGEGH.',
    '..SSSSSSSS..',
    '..SSSRRSSS..',
    '...SSSSSS...',
    '..CLLLLLLC..',
    '.CCCCCCCCCC.',
    '.CCCCCCCCCC.',
    '.SCCCCCCCCS.',
    '.SCCCCCCCCS.',
    '...CCCCCC...',
    '...CCCCCC...',
  ],
  palette: {H: '#a99bc9', S: SKIN, E: '#111', G: '#2b2b2b', R: '#c0506a', L: '#f2f2f2', C: '#c2557f'},
};
// La même, de dos : elle poste sans regarder.
const GINETTE_DOS = {
  rows: [
    '..HHHHHHHH..',
    '.HHHHHHHHHH.',
    '.HHHHHHHHHH.',
    '.HHHHHHHHHH.',
    '..HHHHHHHH..',
    '..HHHHHHHH..',
    '...SSSSSS...',
    '..CCCCCCCC..',
    '.CCCCCCCCCC.',
    '.CCCCCCCCCC.',
    '.SCCCCCCCCS.',
    '.SCCCCCCCCS.',
    '...CCCCCC...',
    '...CCCCCC...',
  ],
  palette: {H: '#a99bc9', S: SKIN, C: '#c2557f'},
};

// Le pouce de celui qui fait défiler.
const POUCE = {
  rows: ['...NNN...', '..NNNNN..', '..SSSSS..', '.SSSSSSS.', '.SSSSSSS.', '.SSSSSSS.', '.SSSSSSS.', 'SSSSSSSSS', 'SSSSSSSSS', 'SSSSSSSSS', 'SSSSSSSSS'],
  palette: {N: '#f6dccb', S: SKIN},
};

// Un auditeur au casque, et le robot qui prend sa place.
const AUDITEUR = {
  rows: ['..HHHHH..', '.PHHHHHP.', 'PPSSSSSPP', 'PPSESESPP', '.PSSSSSP.', '..SSSSS..', '...SSS...'],
  palette: {H: '#4b2e1e', P: '#8FB8FF', S: SKIN, E: '#111'},
};
const ROBOT = {
  rows: ['....A....', '....A....', '.MMMMMMM.', '.MEMMMEM.', '.MMMMMMM.', '.MRRRRRM.', '.MMMMMMM.'],
  palette: {A: '#cfcfcf', M: '#9aa3ad', S: '#9aa3ad', E: '#FF4D4D', R: '#3a3a3a'},
};

// ---------- Objets dessinés ----------

// Un téléphone : le cadre, l'encoche et l'écran (contenu en enfant, rogné).
const Phone: React.FC<{w: number; h: number; screen?: string; children?: React.ReactNode}> = ({w, h, screen = '#111', children}) => (
  <div style={{position: 'relative', width: w, height: h, background: '#1c1c1c', border: '8px solid #e8e8e8', borderRadius: 48, boxShadow: pixelShadow('#333'), boxSizing: 'border-box'}}>
    <div style={{position: 'absolute', left: 14, right: 14, top: 44, bottom: 36, background: screen, borderRadius: 12, overflow: 'hidden'}}>{children}</div>
    <div style={{position: 'absolute', left: '50%', top: 14, width: 90, height: 14, marginLeft: -45, borderRadius: 7, background: '#444'}} />
  </div>
);

// Les vraies images de slop (générées par IA pour ce short), et le cadrage qui garde leur sujet en vue.
type Slop = 'chat' | 'crevette' | 'mamie' | 'pompier';
const SLOP_POS: Record<Slop, string> = {chat: '32% 40%', crevette: '55% 35%', mamie: '58% 50%', pompier: '35% 45%'};
const SLOPS: Slop[] = ['chat', 'crevette', 'pompier', 'mamie'];
const SlopImg: React.FC<{name: Slop}> = ({name}) => (
  <Img src={staticFile(`voix/ai-slop-${name}.jpg`)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: SLOP_POS[name], display: 'block'}} />
);

// Collage (univers.md) : une image posée, bordure blanche fine, ombre pixel, deux bouts de scotch aux coins.
const Collage: React.FC<{name: Slop; w: number; h: number}> = ({name, w, h}) => (
  <div style={{position: 'relative', width: w, height: h, border: '4px solid #fff', boxShadow: pixelShadow('#333'), boxSizing: 'border-box'}}>
    <SlopImg name={name} />
    <div style={{position: 'absolute', left: -14, top: -8, width: 54, height: 18, background: 'rgba(239,233,220,0.75)', transform: 'rotate(-30deg)'}} />
    <div style={{position: 'absolute', right: -14, bottom: -8, width: 54, height: 18, background: 'rgba(239,233,220,0.75)', transform: 'rotate(-30deg)'}} />
  </div>
);

// Une vignette de Short : une silhouette sur fond de couleur (ou une vraie image de slop), et la colonne de boutons à droite.
const ShortCard: React.FC<{w: number; h: number; k: number; img?: Slop}> = ({w, h, k, img}) => (
  <div style={{position: 'relative', width: w, height: h, background: COLORS[k % COLORS.length], overflow: 'hidden', borderRadius: 8}}>
    {img ? (
      <div style={{position: 'absolute', inset: 0}}><SlopImg name={img} /></div>
    ) : (
      <>
        <div style={{position: 'absolute', left: w * 0.32, top: h * 0.26, width: w * 0.22, height: w * 0.22, borderRadius: '50%', background: 'rgba(255,255,255,0.75)'}} />
        <div style={{position: 'absolute', left: w * 0.22, top: h * 0.26 + w * 0.25, width: w * 0.42, height: h, borderRadius: w * 0.2, background: 'rgba(255,255,255,0.75)'}} />
      </>
    )}
    {[0, 1, 2].map((i) => (
      <div key={i} style={{position: 'absolute', right: w * 0.05, bottom: h * 0.1 + i * w * 0.13, width: w * 0.09, height: w * 0.09, borderRadius: '50%', background: '#fff'}} />
    ))}
  </div>
);

// Le fil de Shorts qui défile : `offset` en pixels ; `imgs` place de vraies images de slop sur certaines vignettes.
const Feed: React.FC<{w: number; ch: number; offset: number; imgs?: Record<number, Slop>; n?: number}> = ({w, ch, offset, imgs = {}, n = 30}) => (
  <div style={{position: 'absolute', left: 0, top: 0, transform: `translateY(${-offset}px)`, display: 'flex', flexDirection: 'column', gap: 14}}>
    {Array.from({length: n}, (_, k) => <ShortCard key={k} w={w} h={ch} k={k} img={imgs[k]} />)}
  </div>
);

// Engrenage : la marque d'une vidéo fabriquée à la chaîne.
const Gear: React.FC<{w: number; color: string}> = ({w, color}) => (
  <svg width={w} height={w} viewBox="0 0 100 100">
    {Array.from({length: 8}, (_, k) => <rect key={k} x="42" y="4" width="16" height="22" fill={color} transform={`rotate(${k * 45} 50 50)`} />)}
    <circle cx="50" cy="50" r="30" fill={color} />
    <circle cx="50" cy="50" r="12" fill="#111" />
  </svg>
);

// L'auge en bois, vue de face (le contenu passe derrière la planche de devant).
const Trough: React.FC<{w: number; h: number; children?: React.ReactNode}> = ({w, h, children}) => (
  <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{overflow: 'visible'}}>
    <polygon points={`0,0 ${w},0 ${w - 40},${h} 40,${h}`} fill="#8a5a35" stroke="#5a3a20" strokeWidth="8" />
    {[0.33, 0.66].map((f) => <line key={f} x1={20 * f * 2} y1={h * f} x2={w - 20 * f * 2} y2={h * f} stroke="#5a3a20" strokeWidth="6" />)}
    <rect x={-14} y={-14} width={w + 28} height={18} fill="#6e4528" />
    {children}
  </svg>
);

// Une pièce de monnaie, sans texte.
const Coin: React.FC<{w: number}> = ({w}) => (
  <svg width={w} height={w} viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="46" fill="#e8c45a" stroke="#a8862a" strokeWidth="8" />
    <circle cx="50" cy="50" r="28" fill="none" stroke="#a8862a" strokeWidth="6" />
  </svg>
);

// Une note de musique.
const Note: React.FC<{w: number; color: string}> = ({w, color}) => (
  <svg width={w} height={w} viewBox="0 0 100 100">
    <ellipse cx="34" cy="76" rx="18" ry="14" fill={color} />
    <rect x="46" y="14" width="8" height="64" fill={color} />
    <path d="M54 14 Q 80 24 78 48 Q 72 34 54 32 Z" fill={color} />
  </svg>
);

// ---------- Les images que poste Tata Ginette (dessins plats, sans texte) ----------

const ImgGeneric: React.FC<{k: number}> = ({k}) => {
  const kind = k % 3;
  return (
    <svg width="100%" height="100%" viewBox="0 0 155 100" preserveAspectRatio="xMidYMid slice">
      {kind === 0 ? (
        // Coucher de soleil sur la mer.
        <>
          <rect width="155" height="100" fill="#e07b39" />
          <circle cx="78" cy="62" r="22" fill="#e8c45a" />
          <rect y="62" width="155" height="38" fill="#5b7fb5" />
        </>
      ) : kind === 1 ? (
        // Un bouquet de roses.
        <>
          <rect width="155" height="100" fill="#4f8a5b" />
          {[[52, 44], [78, 34], [104, 46], [66, 62], [92, 62]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="14" fill="#d9534f" stroke="#8e2a2a" strokeWidth="3" />)}
        </>
      ) : (
        // Un tournesol qui sourit.
        <>
          <rect width="155" height="100" fill="#8FB8FF" />
          {Array.from({length: 10}, (_, i) => <ellipse key={i} cx="78" cy="30" rx="7" ry="16" fill="#e8c45a" transform={`rotate(${i * 36} 78 50)`} />)}
          <circle cx="78" cy="50" r="15" fill="#5a3a22" />
          <path d="M70 52 Q 78 60 86 52" stroke="#e8c45a" strokeWidth="2.5" fill="none" />
        </>
      )}
    </svg>
  );
};

// ---------- 0. Hook ----------

const Hook: React.FC = () => <V.TitleHook lead="C'est quoi ?" lines={["l'AI slop"]} cue="slop" />;

// ---------- 1. Intro : le fil de Shorts, la vidéo fabriquée à la chaîne, un sur cinq sur un compte neuf ----------

const PH = {w: 380, h: 700};
const SCR = {w: PH.w - 44, h: PH.h - 96};
const CARD_H = 300;
const WEIRD = 6;

const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const defiler = at('intro', 'défiler');
  const bizarre = at('intro', 'bizarre');
  const fabriquee = at('intro', 'fabriquée');
  const octobre = at('intro', 'octobre');
  const compte = at('intro', 'compte');
  const neuf = at('intro', 'neuf');
  const short = at('intro', 'Short', 1);
  const cinq = at('intro', 'cinq');
  // Défilement du fil (glissé), qui s'arrête sur la vidéo bizarre au centre de l'écran.
  const stop = WEIRD * (CARD_H + 14) - (SCR.h - CARD_H) / 2;
  const offset = ease(frame, defiler, bizarre, [0, stop], 'inOut');
  const newAcc = frame >= compte;
  const CLONES: [number, number, Slop][] = [[470, 30, 'chat'], [680, 30, 'crevette'], [470, 250, 'pompier'], [680, 250, 'mamie']];
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: PH.h}}>
        <Pop at={2} style={{position: 'absolute', left: 20, top: 0}}>
          <Phone w={PH.w} h={PH.h}>
            {/* Le fil, puis le compte neuf (fondu sur « compte »). */}
            <div style={{position: 'absolute', inset: 0, opacity: gone(frame, compte)}}>
              <Feed w={SCR.w} ch={CARD_H} offset={offset} imgs={{[WEIRD]: 'mamie'}} />
            </div>
            {newAcc ? (
              <div style={{position: 'absolute', inset: 0, padding: 18, display: 'flex', flexDirection: 'column', gap: 12}}>
                {/* fade in : l'en-tête du compte neuf, avatar vide. */}
                <Pop at={compte} style={{display: 'flex', alignItems: 'center', gap: 16, height: 84}}>
                  <div style={{width: 76, height: 76, borderRadius: '50%', border: '5px dashed #9a9a9a', boxSizing: 'border-box'}} />
                  <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
                    <div style={{width: 150, height: 14, background: '#5a5a5a'}} />
                    <div style={{width: 100, height: 14, background: '#3a3a3a'}} />
                  </div>
                </Pop>
                {/* stagger : les cinq premiers Shorts proposés, puis le quatrième marqué sur « cinq ». */}
                {[0, 1, 2, 3, 4].map((k) => {
                  const mark = k === 3 && frame >= cinq;
                  return (
                    <Pop key={k} at={short + k * 3} style={{display: 'flex', alignItems: 'center', gap: 14, height: 88, padding: '0 8px', border: `5px solid ${mark ? accent : 'transparent'}`, background: mark ? withAlpha(accent, 0.18) : 'transparent'}}>
                      <ShortCard w={52} h={78} k={k + 2} img={k === 3 ? 'crevette' : undefined} />
                      <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: 10}}>
                        <div style={{width: '90%', height: 12, background: '#5a5a5a'}} />
                        <div style={{width: '60%', height: 12, background: '#3a3a3a'}} />
                      </div>
                      {k === 3 ? <div style={{lineHeight: 0, opacity: mark ? 1 : 0, transform: `rotate(${ease(frame, cinq, cinq + 20, [0, 90])}deg)`}}><Gear w={56} color={accent} /></div> : null}
                    </Pop>
                  );
                })}
              </div>
            ) : null}
          </Phone>
        </Pop>
        {/* stagger + arcs : d'autres vidéos de slop sortent du téléphone, fabriquées à la chaîne (collages) ; elles s'effacent sur « octobre ». */}
        {frame >= fabriquee && frame < octobre + 6
          ? CLONES.map(([x, y, name], k) => {
              const p = ease(frame, fabriquee + k * 5, fabriquee + k * 5 + 12);
              const [cx, cy] = arc(p, [20 + PH.w / 2 - 70, PH.h / 2 - 100], [x, y], 60);
              return (
                <div key={k} style={{position: 'absolute', left: cx, top: cy, opacity: (frame >= fabriquee + k * 5 ? 1 : 0) * gone(frame, octobre), transform: `rotate(${(k % 2 ? 4 : -4) * p}deg)`, lineHeight: 0}}>
                  <Collage name={name} w={190} h={120} />
                </div>
              );
            })
          : null}
        {/* Les libellés repris de la voix, à droite du téléphone. */}
        <div style={{position: 'absolute', left: 470, top: 40, display: 'flex', flexDirection: 'column', gap: 70}}>
          <Pop at={octobre}><Mono size={52} color={LABEL}>octobre 2025</Mono></Pop>
          <Pop at={neuf} style={{opacity: frame >= cinq ? 0.8 : 1, display: 'flex', flexDirection: 'column'}}>
            <Mono size={52} color="#fff">compte</Mono>
            <Mono size={52} color="#fff">tout neuf</Mono>
          </Pop>
          <Pop at={cinq + 5} style={{marginTop: 150}}><Mono size={58} color={accent}>un sur cinq</Mono></Pop>
        </div>
      </div>
    </Scene>
  );
};

// ---------- 2. La pâtée : l'auge, le cochon, puis le contenu déversé en masse ----------

const TR = {x: 30, y: 400, w: 600, h: 180};
const DROP = {w: 56, h: 80, fall: 14};

const Patee: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const accent = useAccent();
  const slop = at('patee', 'slop');
  const patee = at('patee', 'pâtée');
  const cochons = at('patee', 'cochons');
  const contenu = at('patee', 'contenu');
  const masse = at('patee', 'masse');
  const occuper = at('patee', 'occuper');
  const vues = at('patee', 'vues');
  // Les vignettes tombent une à une sur « contenu », puis en rafale à partir de « masse ».
  const spawns: number[] = [];
  for (let t = contenu; t < masse; t += 8) spawns.push(t);
  for (let t = masse; t < durationInFrames - DROP.fall; t += 2) spawns.push(t);
  const goo = ease(frame, patee, patee + 15);
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 640}}>
        {/* Les vignettes : elles tombent en arc, de travers (sans soin), et s'empilent ; après « occuper », le tas déborde de l'auge. */}
        {spawns.map((t0, k) => {
          if (frame < t0) return null;
          const p = ease(frame, t0, t0 + DROP.fall, [0, 1], 'inOut');
          const sx = TR.x + 60 + rnd(k) * (TR.w - 180);
          const spill = t0 >= occuper;
          const lx = spill ? TR.x - 30 + rnd(k + 7) * (TR.w + 20) : TR.x + 70 + rnd(k + 3) * (TR.w - 200);
          const ly = TR.y - 50 - Math.min(260, k * 3.2) * (spill ? 1 - Math.abs((lx - TR.x - TR.w / 2) / TR.w) : 1);
          const [x, y] = arc(p, [sx, 0], [lx, ly], 20);
          return (
            // Une vignette sur trois est une vraie image de slop (16:9), les autres des cartes de couleur.
            k % 3 === 0 ? (
              <div key={k} style={{position: 'absolute', left: x - 20, top: y + 12, width: 100, height: 58, border: '3px solid #fff', boxSizing: 'border-box', overflow: 'hidden', transform: `rotate(${(rnd(k + 11) - 0.5) * 70 * p}deg)`}}>
                <SlopImg name={SLOPS[(k / 3) % 4]} />
              </div>
            ) : (
              <div key={k} style={{position: 'absolute', left: x, top: y, width: DROP.w, height: DROP.h, background: COLORS[k % COLORS.length], border: '4px solid #fff', boxSizing: 'border-box', transform: `rotate(${(rnd(k + 11) - 0.5) * 70 * p}deg)`}} />
            )
          );
        })}
        {/* L'auge : le décor, posée dès l'entrée ; la pâtée monte sur « pâtée », « slop » s'écrit sur la planche. */}
        <Pop at={2} style={{position: 'absolute', left: TR.x, top: TR.y}}>
          <svg width={TR.w} height={40} viewBox={`0 0 ${TR.w} 40`} style={{position: 'absolute', left: 0, top: -30 * goo, overflow: 'visible'}}>
            <ellipse cx={TR.w / 2} cy={34} rx={(TR.w / 2 - 10) * goo} ry={24 * goo} fill="#9b7b5b" />
          </svg>
          <Trough w={TR.w} h={TR.h} />
          <Pop at={slop} style={{position: 'absolute', left: 0, right: 0, top: 50, display: 'flex', justifyContent: 'center'}}>
            <Mono size={72} color="#f3e3c8">slop</Mono>
          </Pop>
        </Pop>
        {/* Le cochon, sur « cochons » ; il cligne des yeux. */}
        <Pop at={cochons} style={{position: 'absolute', left: TR.x + TR.w + 8, top: TR.y + TR.h - 140, lineHeight: 0}}>
          <Pixel sprite={COCHON} px={14} seed={3} />
        </Pop>
        {/* pop in : l'œil des vues, en haut à droite. */}
        <Pop at={vues} style={{position: 'absolute', right: 0, top: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, background: '#000', padding: 10}}>
          <Eye size={130} look={Math.sin(frame / 8) * 0.6} />
          <Mono size={52} color={accent}>vues</Mono>
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 3. Le nom : AI slop en grand, et le mot de l'année dans le dictionnaire ----------

const Nom: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const ai = at('nom', 'AI');
  const mot = at('nom', 'mot');
  const annee = at('nom', 'mot', 1);
  const y2025 = at('nom', '2025');
  return (
    <Scene gap={50}>
      {/* pop in : le terme anglais en grand, écrit quand la voix le dit (sous-titre masqué par onscreen). */}
      <Pop at={ai} style={{display: 'flex', justifyContent: 'center', opacity: frame >= mot ? 0.7 : 1}}>
        <Big size={160} color={accent}>AI slop</Big>
      </Pop>
      {/* Le dictionnaire ouvert : le décor, posé dès l'entrée ; typewriter : l'entrée « slop » s'écrit sur « le mot slop » ; pop in : le bandeau du mot de l'année. */}
      <Pop at={2} style={{position: 'relative', alignSelf: 'center', width: 760, height: 320, display: 'flex', boxShadow: pixelShadow('#444')}}>
        {[0, 1].map((side) => (
          <div key={side} style={{flex: 1, background: '#efe9dc', border: '6px solid #000', borderLeftWidth: side ? 3 : 6, borderRightWidth: side ? 6 : 3, padding: '30px 34px', display: 'flex', flexDirection: 'column', gap: 18, boxSizing: 'border-box'}}>
            {side === 0 ? (
              <div style={{display: 'flex', flexDirection: 'column', gap: 4}}>
                <div style={{fontFamily: 'Newsreader', fontWeight: 800, fontSize: 76, color: '#111', lineHeight: 1, height: 76}}>{typed(frame, mot, 'slop', 30)}</div>
              </div>
            ) : null}
            {[86, 70, 92, 60, ...(side ? [80, 74] : [])].map((w, k) => <div key={k} style={{height: 14, width: `${w}%`, background: '#9a9384'}} />)}
          </div>
        ))}
        <div style={{position: 'absolute', left: 90, right: 0, bottom: -40, transform: 'rotate(-5deg)', opacity: frame >= annee ? 1 : 0}}>
          <Pop at={annee} style={{background: accent, border: '6px solid #000', padding: '12px 22px', display: 'flex', justifyContent: 'center', gap: 22}}>
            <Mono size={52} color="#111">mot de l'année</Mono>
            <div style={{opacity: frame >= y2025 ? 1 : 0}}><Mono size={52} color="#111">2025</Mono></div>
          </Pop>
        </div>
      </Pop>
    </Scene>
  );
};

// ---------- 4. L'image : Tata Ginette et le groupe de la famille ----------

const GP = {x: 428, w: 460, h: 700};
const CHAT = {w: GP.w - 44, h: GP.h - 96 - 96};
const BUB = {w: 330, h: 206, gap: 18};
const NPOST = 15;

const Ginette: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const ginette = at('ginette', 'Ginette');
  const poste = at('ginette', 'poste');
  const quinze = at('ginette', 'quinze');
  const famille = at('ginette', 'famille');
  const regarder = at('ginette', 'regarder');
  const rien = at('ginette', 'rien');
  const toi = at('ginette', 'toi');
  const defiler = at('ginette', 'défiler');
  // Les quinze images tombent en rafale, de « poste » à « famille » (compte calé sur la voix) ; les deux dernières,
  // le chat violoniste et Venise, restent à l'écran.
  const posts = Array.from({length: NPOST}, (_, k) => Math.round(poste + ((famille - poste) * k) / (NPOST - 1)));
  const pitch = BUB.h + BUB.gap;
  const pushed = posts.reduce((s, t) => s + ease(frame, t, t + 5), 0);
  // Sur « défiler », le pouce glisse et le fil remonte de deux images.
  const back = ease(frame, defiler, defiler + 18, [0, 2 * pitch], 'inOut');
  const y = CHAT.h - 14 - pushed * pitch + back;
  // Les quatre dernières sont de vraies images de slop ; le chat violoniste en dernier, le plus longtemps à l'écran.
  const LAST: Slop[] = ['mamie', 'pompier', 'crevette', 'chat'];
  const img = (k: number) => (k >= NPOST - 4 ? <SlopImg name={LAST[k - (NPOST - 4)]} /> : <ImgGeneric k={k} />);
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: GP.h}}>
        {/* Tata Ginette ; de dos sur « regarder » ; en retrait quand c'est à toi. */}
        <div style={{position: 'absolute', left: 0, top: 120, width: 400, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 18, opacity: frame >= toi ? 0.75 : 1}}>
          <Pop at={ginette} style={{lineHeight: 0, marginLeft: 30}}>
            <Pixel sprite={frame >= regarder ? GINETTE_DOS : GINETTE} px={17} seed={5} />
          </Pop>
          <Pop at={ginette + 5}><Mono size={52} color="#fff">Tata Ginette</Mono></Pop>
          <Pop at={quinze}><Mono size={56} color={accent}>15 images</Mono></Pop>
          {/* pop in + draw-on : une pièce barrée, ça ne lui coûte rien. */}
          <Pop at={rien} style={{position: 'relative', lineHeight: 0, marginLeft: 30}}>
            <Coin w={110} />
            <div style={{position: 'absolute', left: -5, top: -5, lineHeight: 0}}><Cross p={ease(frame, rien + 3, rien + 15)} size={120} color="#FF4D4D" /></div>
          </Pop>
        </div>
        {/* Le téléphone et le groupe de la famille : le décor, posé dès l'entrée. */}
        <Pop at={2} style={{position: 'absolute', left: GP.x, top: 0}}>
          <Phone w={GP.w} h={GP.h} screen="#e9e1d4">
            <div style={{position: 'absolute', left: 0, right: 0, top: 96, bottom: 0, overflow: 'hidden'}}>
              <div style={{position: 'absolute', left: 14, top: 0, transform: `translateY(${y}px)`}}>
                {posts.map((t, k) => (
                  <div key={k} style={{position: 'absolute', left: 0, top: k * pitch, width: BUB.w, height: BUB.h, background: '#d9fdd3', borderRadius: 18, padding: 8, boxSizing: 'border-box', boxShadow: '0 3px 0 rgba(0,0,0,0.15)', opacity: frame >= t ? 1 : 0, transform: `scale(${frame >= t ? ease(frame, t, t + 5, [0.85, 1]) : 0.85})`, transformOrigin: 'left bottom'}}>
                    <div style={{width: '100%', height: '100%', borderRadius: 10, overflow: 'hidden'}}>{img(k)}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* L'en-tête vert du groupe (générique). */}
            <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 96, background: '#1f7a5a', display: 'flex', alignItems: 'center', gap: 16, padding: '0 18px'}}>
              <div style={{width: 60, height: 60, borderRadius: '50%', background: '#cfe9dc', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', overflow: 'hidden'}}>
                <div style={{width: 20, height: 20, borderRadius: '50%', background: '#1f7a5a', marginBottom: 4, boxShadow: '-14px 6px 0 #1f7a5a, 14px 6px 0 #1f7a5a'}} />
              </div>
              <Mono size={48} color="#fff">Famille</Mono>
            </div>
          </Phone>
        </Pop>
        {/* Ton pouce, sur « toi » ; il glisse sur « défiler ». */}
        <Pop at={toi} style={{position: 'absolute', left: GP.x + GP.w / 2 - 54, top: GP.h - 330, lineHeight: 0}}>
          <div style={{transform: `translateY(${ease(frame, defiler, defiler + 18, [0, 150], 'inOut')}px)`}}>
            <Pixel sprite={POUCE} px={12} />
          </div>
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 5. Deezer : 90 000 morceaux en une journée, plus de la moitié des envois ----------

const SHARE = 0.56; // schématique : « plus de la moitié »

const Deezer: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const juin = at('deezer', 'juin');
  const deezer = at('deezer', 'Deezer');
  const n90 = at('deezer', '90');
  const morceaux = at('deezer', 'morceaux');
  const journee = at('deezer', 'journée');
  const plus = at('deezer', 'plus');
  const moitie = at('deezer', 'moitié');
  const nouveaux = at('deezer', 'nouveaux');
  const COUNT = 36;
  const fill = ease(frame, plus + 4, moitie + 4, [0, SHARE]);
  const day = ease(frame, journee, journee + 24);
  const back = frame >= plus ? 0.75 : 1;
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 640}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
          <Pop at={deezer}><Mono size={64} color="#fff">Deezer</Mono></Pop>
          <Pop at={juin}><Mono size={52} color={LABEL}>juin 2026</Mono></Pop>
        </div>
        {/* count-up + punch zoom sur le chiffre (le seul punch du short) ; le compteur à zéro est posé dès l'entrée. */}
        <div style={{position: 'absolute', left: 0, top: 110, display: 'flex', alignItems: 'center', gap: 34, opacity: back}}>
          <Pop at={2} style={{display: 'flex', flexDirection: 'column', gap: 6}}>
            <div style={{transform: `scale(${punch(frame, n90 + COUNT)})`, transformOrigin: 'left center'}}>
              <Mono size={150} color={frame >= n90 ? '#fff' : LABEL}>{frame >= n90 ? countUp(frame, n90, 90000, COUNT) : '0'}</Mono>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: 14, opacity: frame >= morceaux ? 1 : 0}}>
              <Note w={64} color={accent} />
              <Mono size={56} color={LABEL}>morceaux</Mono>
            </div>
          </Pop>
          {/* draw-on : le cadran d'une journée qui fait son tour. */}
          <Pop at={journee} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6}}>
            <svg width={150} height={150} viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="#444" strokeWidth="6" />
              <Draw d="M50 8 A42 42 0 1 1 49.9 8" p={day} width={6} len={265} color="#fff" />
              <path d={`M50 50 L${50 + 30 * Math.sin(day * Math.PI * 2)} ${50 - 30 * Math.cos(day * Math.PI * 2)}`} stroke={accent} strokeWidth="6" strokeLinecap="round" />
            </svg>
            <Mono size={48} color={LABEL}>une journée</Mono>
          </Pop>
        </div>
        {/* bar grow : la part des morceaux générés dans tous les nouveaux envois, qui passe la moitié. */}
        <div style={{position: 'absolute', left: 0, top: 460, width: W}}>
          <Pop at={plus} style={{position: 'relative', height: 96, border: '6px solid #fff', boxSizing: 'border-box'}}>
            <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: `${fill * 100}%`, background: accent}} />
            <div style={{position: 'absolute', left: '50%', top: -26, bottom: -26, width: 0, borderLeft: `6px dashed ${frame >= moitie ? '#fff' : '#888'}`}} />
          </Pop>
          <div style={{position: 'relative', height: 70, marginTop: 30}}>
            <Pop at={moitie} style={{position: 'absolute', left: W / 2 - 90, top: -215}}><Mono size={52} color="#fff">moitié</Mono></Pop>
            <Pop at={nouveaux} style={{position: 'absolute', right: 0, top: 0}}><Mono size={52} color={LABEL}>nouveaux envois</Mono></Pop>
          </div>
        </div>
      </div>
    </Scene>
  );
};

// ---------- 6. Les écoutes : 1 à 3 %, et dans ces écoutes, 85 % de robots ----------

const HEADS = 20;
const ROBOTS = 17; // 85 % de 20

const Ecoutes: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const un = at('ecoutes', '1');
  const trois = at('ecoutes', '3');
  const ecoutes = at('ecoutes', 'écoutes');
  const y2025 = at('ecoutes', '2025');
  const n85 = at('ecoutes', '85');
  const robots = at('ecoutes', 'robots');
  const encaiss = at('ecoutes', 'encaissaient');
  const sliver = ease(frame, un, trois + 6, [0.01, 0.03]);
  const zoom = ease(frame, y2025, y2025 + 14);
  const BOX = {top: 330, h: 330};
  const head = 72; // 9 pixels x 8
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 640}}>
        {/* Rappel de la scène d'avant, posé dès l'entrée : les envois, plus de la moitié générée. */}
        <div style={{position: 'absolute', left: 0, top: 0, width: W}}>
          <Mono size={48} color={LABEL}>envois</Mono>
          <div style={{opacity: frame >= y2025 ? 0.5 : 1, position: 'relative', height: 70, border: '6px solid #fff', boxSizing: 'border-box', marginTop: 8}}>
            <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: `${SHARE * 100}%`, background: accent}} />
          </div>
        </div>
        {/* bar grow : la même masse ne fait qu'un filet des écoutes. */}
        <div style={{position: 'absolute', left: 0, top: 150, width: W}}>
          <div style={{height: 60, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between'}}>
            <Pop at={ecoutes}><Mono size={48} color="#fff">écoutes</Mono></Pop>
            <Pop at={trois}><Mono size={56} color={accent}>1 à 3 %</Mono></Pop>
          </div>
          <Pop at={un} style={{position: 'relative', height: 70, border: '6px solid #fff', boxSizing: 'border-box', marginTop: 8}}>
            <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: `${sliver * 100}%`, minWidth: 10, background: accent}} />
          </Pop>
        </div>
        {/* mask reveal : la loupe sur ce filet d'écoutes, ouverte sur « 2025 ». */}
        {frame >= y2025 ? (
          <svg width={W} height={BOX.top} viewBox={`0 0 ${W} ${BOX.top}`} style={{position: 'absolute', left: 0, top: 0}}>
            <path d={`M0 288 L0 ${288 + (BOX.top - 288) * zoom}`} stroke={accent} strokeWidth="4" />
            <path d={`M${0.03 * W} 288 L${0.03 * W + (W - 0.03 * W) * zoom} ${288 + (BOX.top - 288) * zoom}`} stroke={accent} strokeWidth="4" strokeDasharray="10 8" />
          </svg>
        ) : null}
        <div style={{position: 'absolute', left: 0, top: BOX.top, width: W, height: BOX.h, border: `5px solid ${accent}`, boxSizing: 'border-box', clipPath: `inset(0 ${100 - zoom * 100}% ${100 - zoom * 100}% 0)`, opacity: frame >= y2025 ? 1 : 0, padding: '16px 18px'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', height: 64}}>
            <Mono size={48} color={LABEL}>2025</Mono>
            <div style={{display: 'flex', gap: 16, alignItems: 'baseline'}}>
              <Pop at={n85}><Mono size={60} color={accent}>85 %</Mono></Pop>
              <Pop at={robots}><Mono size={52} color="#fff">robots</Mono></Pop>
            </div>
          </div>
          {/* stagger : de gauche à droite, 17 auditeurs sur 20 deviennent des robots. */}
          <div style={{display: 'grid', gridTemplateColumns: `repeat(10, ${head}px)`, columnGap: 6, rowGap: 14, marginTop: 14}}>
            {Array.from({length: HEADS}, (_, k) => {
              const col = k % 10;
              const row = Math.floor(k / 10);
              const order = col * 2 + row;
              const isBot = order < ROBOTS && frame >= n85 + order * 2;
              return (
                <Pop key={k} at={y2025 + 10 + order} style={{lineHeight: 0}}>
                  <Pixel sprite={isBot ? ROBOT : AUDITEUR} px={8} seed={k} />
                </Pop>
              );
            })}
          </div>
        </div>
        {/* arcs + stagger : les pièces partent des robots et s'alignent au bas de la loupe, les droits encaissés. */}
        {frame >= encaiss
          ? Array.from({length: 8}, (_, k) => {
              const p = ease(frame, encaiss + k * 3, encaiss + k * 3 + 14, [0, 1], 'inOut');
              const from: [number, number] = [40 + (k % 5) * 130, BOX.top + 110 + (k % 2) * 80];
              const to: [number, number] = [30 + k * 60, BOX.top + BOX.h - 90];
              const [x, yy] = arc(p, from, to, 50);
              return frame >= encaiss + k * 3 ? <div key={k} style={{position: 'absolute', left: x, top: yy, lineHeight: 0}}><Coin w={70} /></div> : null;
            })
          : null}
      </div>
    </Scene>
  );
};

// ---------- 7. Chute : le slop coûte presque rien, ton attention paie la différence ----------

const Chute: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const accent = useAccent();
  const presque = at('chute', 'presque');
  const attention = at('chute', 'attention');
  const paie = at('chute', 'paie');
  const T = {x: 350, y: 440, w: 370, h: 150};
  const G = {x: 560, y: 90, w: 130, h: 250};
  // La jauge d'attention se vide de « paie » jusqu'à la fin ; ce qu'elle perd coule dans l'auge.
  const level = ease(frame, paie, durationInFrames - 10, [1, 0.12], 'inOut');
  const flowing = frame >= paie;
  return (
    <Scene gap={0}>
      <div style={{position: 'relative', height: 700}}>
        {/* Le téléphone et son fil qui défile (défilement continu, linéaire) : reprise de l'intro, posé dès l'entrée. */}
        <Pop at={2} style={{position: 'absolute', left: 0, top: 0}}>
          <Phone w={320} h={600}>
            <Feed w={320 - 44} ch={240} offset={(frame * 9) % ((240 + 14) * 6)} n={14} imgs={{1: 'chat', 7: 'chat', 4: 'pompier', 10: 'pompier'}} />
          </Phone>
        </Pop>
        {/* La jauge d'attention, sur « attention ». */}
        <Pop at={attention} style={{position: 'absolute', left: G.x - 110, top: 0}}><Mono size={52} color="#fff">ton attention</Mono></Pop>
        <Pop at={attention} style={{position: 'absolute', left: G.x, top: G.y, width: G.w, height: G.h, border: '6px solid #fff', borderRadius: 18, boxSizing: 'border-box', overflow: 'hidden'}}>
          <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: `${level * 100}%`, background: accent}} />
          {[0.25, 0.5, 0.75].map((f) => <div key={f} style={{position: 'absolute', left: 0, width: 34, top: `${f * 100}%`, height: 5, background: '#fff'}} />)}
        </Pop>
        {/* draw-on : le filet qui coule de la jauge vers l'auge. */}
        <svg width={W} height={700} viewBox={`0 0 ${W} 700`} style={{position: 'absolute', left: 0, top: 0, pointerEvents: 'none'}}>
          {frame >= attention ? <rect x={G.x + G.w / 2 - 10} y={G.y + G.h - 2} width={20} height={18} fill="#fff" /> : null}
          {flowing ? <Draw d={`M${G.x + G.w / 2} ${G.y + G.h + 16} L${G.x + G.w / 2} ${T.y - 6}`} p={ease(frame, paie, paie + 10)} width={12} len={T.y - G.y - G.h} color={accent} /> : null}
        </svg>
        {/* L'auge pleine et le cochon : reprise de la scène pâtée, posée dès l'entrée. */}
        <Pop at={4} style={{position: 'absolute', left: T.x, top: T.y}}>
          <svg width={T.w} height={40} viewBox={`0 0 ${T.w} 40`} style={{position: 'absolute', left: 0, top: -30, overflow: 'visible'}}>
            <ellipse cx={T.w / 2} cy={30} rx={T.w / 2 - 6} ry={30 + 10 * (1 - level)} fill="#9b7b5b" />
            {Array.from({length: 7}, (_, k) =>
              k % 3 === 1 ? (
                // Deux vraies images de slop dans le tas, de travers.
                <g key={k} transform={`rotate(${(rnd(k + 4) - 0.5) * 40} ${48 + k * 46} 20)`}>
                  <rect x={14 + k * 46} y={-4 - 10 * rnd(k)} width={76} height={46} fill="#fff" />
                  <image href={staticFile(`voix/ai-slop-${k === 1 ? 'crevette' : 'mamie'}.jpg`)} x={17 + k * 46} y={-1 - 10 * rnd(k)} width={70} height={40} preserveAspectRatio="xMidYMid slice" />
                </g>
              ) : (
                <rect key={k} x={30 + k * 46} y={-6 - 18 * rnd(k)} width={36} height={52} fill={COLORS[k % COLORS.length]} stroke="#fff" strokeWidth="4" transform={`rotate(${(rnd(k + 4) - 0.5) * 60} ${48 + k * 46} 20)`} />
              ),
            )}
          </svg>
          <Trough w={T.w} h={T.h} />
        </Pop>
        <Pop at={6} style={{position: 'absolute', left: T.x + T.w + 4, top: T.y + T.h - 100, lineHeight: 0}}>
          <Pixel sprite={COCHON} px={9} seed={3} />
        </Pop>
        {/* pop in : l'étiquette de prix sur l'auge. */}
        <Pop at={presque} style={{position: 'absolute', left: T.x + 10, top: T.y + T.h + 24, background: '#efe9dc', border: '5px solid #000', padding: '6px 18px', transform: 'rotate(-3deg)'}}>
          <Mono size={52} color="#111">presque rien</Mono>
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- Montage ----------

const SCENES: Record<string, React.FC> = {hook: Hook, intro: Intro, patee: Patee, nom: Nom, ginette: Ginette, deezer: Deezer, ecoutes: Ecoutes, chute: Chute};

export const AiSlopVoix: React.FC = () => <V.Montage scenes={SCENES} accent={AC} />;

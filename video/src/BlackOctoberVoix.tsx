// Short Black October (YouTube / TikTok / Instagram), hors-série d'actu sans numéro (les ép. 18 à 24 sont pris), voix off PAL - FR, préparé le 2026-10-26.
// Fiche chasse-aux-failles-par-ia de lexique/terms.js ; sources dans voix/black-october.script.json : php2shell
// (Wiz, 21 octobre 2026 : trouvée le 19 août avec des modèles, WordPress de test le 21, signalée le 24, corrigée
// le 21 octobre), sites gouvernementaux coupés (Wikipédia, PHP2Shell), première attaque le 17 octobre (AWS),
// « Black October » (Axios, 22 octobre 2026) ; l'image de l'immeuble et du plombier du jeudi.
// Fil : après le bon score (ép. 17), un fait de la semaine ; l'accroche est une question, l'histoire dira si le
// surnom tient (PA, 2026-10-26).
// Le schéma de la fiche (lexique/schemas/chasse-aux-failles-par-ia.svg) sert de base à la course : deux jours pour
// exploiter, plus de soixante pour corriger.
// Ce que la voix ne dit pas ne s'écrit pas : ni Gemini, ni GPT, ni les numéros de CVE, ni eMudhra.
import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Big, Mono, Pop, Scene, W, clamp, countUp, ease, punch, squash, useAccent, withAlpha} from './kit';
import {LABEL, makeVoix} from './voix/VoixShort';
import {Pixel} from './voix/Pixel';
import {Cross, pixelShadow} from './voix/Parts';
import ALIGN from './voix/black-october.align.json';
import SCRIPT from './voix/black-october.script.json';

const AC = '#F08DC2'; // catégorie Écosystème
const V = makeVoix(ALIGN, SCRIPT, 'voix/prediction-music.mp3');
const {at} = V;
export const BLACKOCTOBERVOIX_DURATION = V.duration;

const gone = (frame: number, until: number) => ease(frame, until, until + 6, [1, 0], 'inOut');
const RED = '#FF7A7A';

// ---------- Personnage ----------

const SKIN = '#e3b58e';
type Sprite = {rows: string[]; palette: Record<string, string>};

// Le plombier : casquette rouge, salopette bleue, clé à molette à la main.
const PLOMBIER: Sprite = {
  rows: [
    '...RRRRRR...',
    '..RRRRRRRR..',
    '..RSSSSSSRR.',
    '...SESSES...',
    '...SSSSSS...',
    '...SMMMMS...',
    '....SSSS....',
    '.WBBWWWWBBW.',
    '.WBBBBBBBBW.',
    '.SBBBBBBBBSK',
    '.SBBBBBBBB.K',
    '..BBBBBBBB.K',
    '...BBBBBB...',
    '...BB..BB...',
  ],
  palette: {R: '#c0392b', S: SKIN, E: '#111', M: '#5a3a22', W: '#e8e8e8', B: '#2f5d9a', K: '#9a9a9a'},
};

// ---------- Objets ----------

// Une fenêtre de navigateur, avec sa barre et ses trois points ; `dark` l'éteint.
const Browser: React.FC<{w: number; h: number; dark?: number; children?: React.ReactNode; border?: string}> = ({w, h, dark = 0, children, border = '#8a8a8a'}) => (
  <div style={{width: w, height: h, border: `5px solid ${border}`, borderRadius: 10, background: '#1a1a1a', boxSizing: 'border-box', position: 'relative', overflow: 'hidden'}}>
    <div style={{height: 30, background: '#2c2c2c', display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 10}}>
      {[0, 1, 2].map((k) => <div key={k} style={{width: 12, height: 12, borderRadius: 6, background: '#6f6f6f'}} />)}
    </div>
    <div style={{position: 'absolute', left: 0, right: 0, top: 30, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{children}</div>
    <div style={{position: 'absolute', inset: 0, background: '#000', opacity: dark * 0.85}} />
  </div>
);

// Un bâtiment officiel : fronton et colonnes.
const Gov: React.FC<{s: number}> = ({s}) => (
  <svg width={s} height={s} viewBox="0 0 100 100">
    <path d="M10 34 L50 10 L90 34 Z" fill="#d6d6d6" />
    {[20, 40, 60, 80].map((x) => <rect key={x} x={x - 5} y="38" width="10" height="42" fill="#d6d6d6" />)}
    <rect x="8" y="82" width="84" height="10" fill="#d6d6d6" />
  </svg>
);

// La prise débranchée : les deux moitiés s'écartent de `p` (0 = branchée).
const Plug: React.FC<{s: number; p: number}> = ({s, p}) => (
  <svg width={s * 2} height={s} viewBox="0 0 200 100" style={{overflow: 'visible'}}>
    <g transform={`translate(${-30 * p} 0)`}>
      <path d="M0 50 H50" stroke="#d6d6d6" strokeWidth="8" />
      <rect x="50" y="26" width="40" height="48" rx="6" fill="#d6d6d6" />
      <path d="M90 38 H106 M90 62 H106" stroke="#d6d6d6" strokeWidth="7" />
    </g>
    <g transform={`translate(${30 * p} 0)`}>
      <rect x="110" y="22" width="40" height="56" rx="6" fill="#6f6f6f" />
      <path d="M150 50 H200" stroke="#6f6f6f" strokeWidth="8" />
    </g>
  </svg>
);

// L'éclair : le modèle d'IA.
const Bolt: React.FC<{s: number; color: string}> = ({s, color}) => (
  <svg width={s} height={s} viewBox="0 0 100 100">
    <path d="M58 4 L18 58 H46 L38 96 L82 38 H54 Z" fill={color} />
  </svg>
);

const Shield: React.FC<{s: number; color: string}> = ({s, color}) => (
  <svg width={s} height={s} viewBox="0 0 100 100">
    <path d="M50 6 L88 20 V48 C88 72 70 88 50 96 C30 88 12 72 12 48 V20 Z" fill="none" stroke={color} strokeWidth="9" strokeLinejoin="round" />
    <path d="M32 50 L46 64 L70 38" fill="none" stroke={color} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Le pied-de-biche : l'attaque.
const Crowbar: React.FC<{s: number; color: string}> = ({s, color}) => (
  <svg width={s} height={s} viewBox="0 0 100 100">
    <path d="M78 10 C92 14 94 30 82 34 M80 22 L22 84 L10 78" fill="none" stroke={color} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Le détecteur de fuites : un boîtier et son voyant.
const Detector: React.FC<{s: number; on: boolean}> = ({s, on}) => (
  <svg width={s} height={s} viewBox="0 0 100 100">
    <rect x="22" y="14" width="56" height="72" rx="10" fill="#d6d6d6" />
    <circle cx="50" cy="40" r="13" fill={on ? '#5b9bd5' : '#6f6f6f'} />
    <rect x="34" y="64" width="32" height="8" rx="4" fill="#6f6f6f" />
  </svg>
);

const Drop: React.FC<{s: number}> = ({s}) => (
  <svg width={s} height={s} viewBox="0 0 100 100">
    <path d="M50 10 C 50 10, 80 50, 80 66 A30 30 0 0 1 20 66 C 20 50, 50 10, 50 10 Z" fill="#5b9bd5" />
  </svg>
);

// Le serveur de l'hébergeur : trois tiroirs et leurs voyants.
const Server: React.FC<{s: number}> = ({s}) => (
  <svg width={s} height={s * 1.2} viewBox="0 0 100 120">
    {[0, 1, 2].map((k) => (
      <g key={k}>
        <rect x="8" y={8 + k * 36} width="84" height="30" rx="4" fill="#2c2c2c" stroke="#8a8a8a" strokeWidth="4" />
        <circle cx="22" cy={23 + k * 36} r="5" fill="#7FD68A" />
        <path d={`M40 ${23 + k * 36} H80`} stroke="#6f6f6f" strokeWidth="5" />
      </g>
    ))}
  </svg>
);

// ---------- 0. Hook : la question, posée comme une question ----------

const Hook: React.FC = () => <V.TitleHook lead="Et si on vivait…" lines={['un Black', 'October ?']} cue="Black" />;

// ---------- 1. Les sites qu'on débranche, deux failles, deux sites sur trois ----------

const Sites: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const gouv = at('sites', 'gouvernements');
  const debr = at('sites', 'débranché');
  const failles = at('sites', 'failles');
  const dix = at('sites', 'dix');
  const php = at('sites', 'PHP');
  const deux = at('sites', 'deux', 1);
  const trois = at('sites', 'trois');
  // Une idée à la fois : les sites coupés, puis le code de PHP et ses deux failles, puis les deux sites sur trois.
  const sitesOut = gone(frame, failles - 4);
  const codeOut = gone(frame, deux - 4);
  const unplug = ease(frame, debr, debr + 12, [0, 1], 'inOut');
  return (
    <Scene>
      <div style={{position: 'relative', height: 620}}>
        {/* Décor posé dès l'entrée : quatre sites allumés ; les bâtiments officiels entrent sur « gouvernements » */}
        <div style={{position: 'absolute', left: 0, top: 0, width: W, opacity: frame < failles ? 1 : sitesOut}}>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 28}}>
            {[0, 1, 2, 3].map((k) => (
              <Pop key={k} at={k * 2}>
                {/* stagger : les fenêtres s'éteignent une à une à partir de « débranché » */}
                <Browser w={430} h={210} dark={ease(frame, debr + 3 * k, debr + 3 * k + 8)}>
                  <div style={{opacity: frame >= gouv + 2 * k ? 1 : 0}}><Gov s={110} /></div>
                </Browser>
              </Pop>
            ))}
          </div>
          <div style={{position: 'absolute', left: W / 2 - 110, top: 500, opacity: frame >= debr ? 1 : 0}}><Plug s={110} p={unplug} /></div>
        </div>
        {/* Le code de PHP : deux lignes surlignées sur « failles », puis « plus de dix ans » */}
        <div style={{position: 'absolute', left: 0, top: 20, width: W, opacity: frame < failles ? 0 : frame < deux - 4 ? 1 : codeOut}}>
          <Pop at={failles}>
            <div style={{border: '5px solid #8a8a8a', borderRadius: 10, padding: '24px 30px', background: '#161616', display: 'flex', flexDirection: 'column', gap: 18}}>
              {[0.7, 0.5, 0.85, 0.6, 0.75, 0.45].map((w, k) => {
                const bad = k === 1 || k === 4;
                return <div key={k} style={{height: 26, width: `${w * 100}%`, background: bad ? RED : '#4a4a4a', opacity: bad ? ease(frame, failles + 4 + 3 * (k === 4 ? 1 : 0), failles + 12 + 3 * (k === 4 ? 1 : 0), [0.25, 1]) : 1}} />;
              })}
            </div>
          </Pop>
          <Pop at={php} style={{position: 'absolute', right: 30, top: -20}}><div style={{background: accent, padding: '4px 18px'}}><Mono size={60} color="#111">PHP</Mono></div></Pop>
          <Pop at={dix} style={{marginTop: 30}}><Mono size={60} color={RED}>plus de dix ans</Mono></Pop>
        </div>
        {/* Deux sites sur trois : trois fenêtres, deux prennent la couleur de PHP (stagger) */}
        <div style={{position: 'absolute', left: 0, top: 120, width: W, display: 'flex', justifyContent: 'space-between'}}>
          {[0, 1, 2].map((k) => (
            <Pop key={k} at={deux + 2 * k}>
              <Browser w={270} h={250} border={k < 2 && frame >= trois ? accent : '#8a8a8a'}>
                <div style={{width: 160, height: 120, background: k < 2 ? withAlpha(accent, frame >= trois ? 0.6 : 0.15) : '#2c2c2c'}} />
              </Browser>
            </Pop>
          ))}
        </div>
        <Pop at={trois + 2} style={{position: 'absolute', left: 0, right: 0, top: 420, display: 'flex', justifyContent: 'center'}}>
          <Mono size={64} color={accent}>deux sur trois</Mono>
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 2. Wiz, des modèles, deux jours, un WordPress de test ; le nom du terme ----------

const Nom: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const wiz = at('nom', 'Wiz');
  const modeles = at('nom', 'modèles');
  const jours = at('nom', 'jours');
  const wp = at('nom', 'WordPress');
  const test = at('nom', 'test');
  const chasse = at('nom', 'chasse');
  const vuln = at('nom', 'vulnerability');
  // Le récit part quand le terme arrive.
  const storyOut = gone(frame, chasse - 4);
  // Draw-on de la frise de deux jours, sur « jours ».
  const draw = ease(frame, jours, jours + 16);
  return (
    <Scene>
      <div style={{position: 'relative', height: 620}}>
        <div style={{position: 'absolute', inset: 0, opacity: frame < chasse - 4 ? 1 : storyOut}}>
          <Pop at={wiz} style={{position: 'absolute', left: 0, top: 0}}>
            <div style={{border: '5px solid #fff', padding: '8px 30px'}}><Mono size={72} color="#fff">Wiz</Mono></div>
          </Pop>
          <Pop at={modeles} style={{position: 'absolute', left: 260, top: -10, display: 'flex', alignItems: 'center', gap: 10}}>
            <Bolt s={110} color={accent} />
            <Mono size={56} color={accent}>modèles d'IA</Mono>
          </Pop>
          {/* la frise de deux jours, posée sur « jours » */}
          <div style={{position: 'absolute', left: 30, top: 300, width: 420, opacity: frame >= jours ? 1 : 0}}>
            <div style={{height: 8, width: 420 * draw, background: accent}} />
            <div style={{position: 'absolute', left: -14, top: -12, width: 32, height: 32, borderRadius: 16, background: accent}} />
            <div style={{position: 'absolute', left: 406, top: -12, width: 32, height: 32, borderRadius: 16, background: accent, opacity: draw}} />
            <div style={{position: 'absolute', left: 80, top: 34}}><Mono size={56} color="#fff">deux jours</Mono></div>
          </div>
          {/* le WordPress de test, qui passe au rouge */}
          <Pop at={wp} style={{position: 'absolute', right: 0, top: 160}}>
            <Browser w={300} h={260} border={frame >= wp + 6 ? RED : '#8a8a8a'}>
              <div style={{width: 120, height: 120, borderRadius: 60, border: `10px solid ${frame >= wp + 6 ? RED : '#d6d6d6'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box'}}>
                <span style={{fontFamily: 'serif', fontSize: 80, fontWeight: 800, color: frame >= wp + 6 ? RED : '#d6d6d6'}}>W</span>
              </div>
            </Browser>
          </Pop>
          <Pop at={wp + 4} style={{position: 'absolute', right: 20, top: 440}}><Mono size={52} color={LABEL}>WordPress</Mono></Pop>
          <Pop at={test} style={{position: 'absolute', right: 20, top: 500}}><Mono size={52} color={RED}>de test</Mono></Pop>
        </div>
        {/* le terme, en français puis en anglais (masqués des sous-titres par `onscreen`) */}
        <div style={{position: 'absolute', left: 0, top: 60, width: W, display: 'flex', flexDirection: 'column', gap: 40}}>
          <Pop at={chasse}><Big size={124} color={accent}>Chasse aux failles par IA</Big></Pop>
          <Pop at={vuln}><Mono size={60} color="#fff">AI vulnerability discovery</Mono></Pop>
        </div>
      </div>
    </Scene>
  );
};

// ---------- 3. L'immeuble : tout le monde a son détecteur, un seul plombier, le jeudi ----------

const WINDOWS = Array.from({length: 12}, (_, k) => ({col: k % 3, row: Math.floor(k / 3)}));
// Les dix fenêtres où l'on trouve une fuite, dans l'ordre où elles s'allument.
const LEAKS = [4, 0, 9, 2, 7, 11, 5, 1, 10, 6];

const Immeuble: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const detect = at('immeuble', 'détecteur');
  const dix = at('immeuble', 'dix');
  const semaine = at('immeuble', 'semaine');
  const plombier = at('immeuble', 'plombier');
  const seul = at('immeuble', 'seul');
  const jeudi = at('immeuble', 'jeudi');
  // Compte calé sur la voix (linéaire) : les dix fuites s'allument de « dix » à « semaine ».
  const leaks = Math.floor(interpolate(frame, [dix, semaine + 8], [0, 10], clamp));
  return (
    <Scene>
      <div style={{position: 'relative', height: 640}}>
        {/* Décor posé dès l'entrée : la façade, douze fenêtres */}
        <Pop at={0} style={{position: 'absolute', left: 0, top: 0}}>
          <div style={{width: 520, height: 600, background: '#2a2622', border: '6px solid #6f6f6f', boxSizing: 'border-box', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 26, padding: 30, boxShadow: pixelShadow('#222')}}>
            {WINDOWS.map((w, k) => {
              const li = LEAKS.indexOf(k);
              const leak = li >= 0 && li < leaks;
              return (
                <div key={k} style={{background: withAlpha('#8FB8FF', 0.18), border: '4px solid #8a8a8a', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  {/* pop in en cascade des détecteurs, dans l'ordre de lecture */}
                  <Pop at={detect + k}><Detector s={70} on={leak} /></Pop>
                  {leak ? <div style={{position: 'absolute', right: -6, top: -10}}><Drop s={44} /></div> : null}
                </div>
              );
            })}
          </div>
        </Pop>
        {/* le compteur de fuites */}
        <div style={{position: 'absolute', left: 560, top: 60, opacity: frame >= dix ? 1 : 0}}>
          <Mono size={110} color="#5b9bd5">{leaks}</Mono>
          <div><Mono size={48} color={LABEL}>{frame >= semaine ? 'par semaine' : ''}</Mono></div>
        </div>
        {/* le plombier, seul, en bas */}
        <Pop at={plombier} style={{position: 'absolute', left: 600, top: 330}}><Pixel sprite={PLOMBIER} px={18} seed={3} /></Pop>
        <Pop at={seul} style={{position: 'absolute', left: 580, top: 594}}><Mono size={48} color="#fff">un seul</Mono></Pop>
        {/* l'agenda, ouvert sur le jeudi */}
        <Pop at={jeudi} style={{position: 'absolute', left: 560, top: 230}}>
          <div style={{background: '#f2f2f2', padding: '6px 22px', transform: 'rotate(-4deg)', boxShadow: pixelShadow('#333')}}><Mono size={56} color="#111">jeudi</Mono></div>
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 4. La course : du 24 août au 21 octobre, et l'attaque du 17 ----------

const X0 = 40;
const X1 = W - 40;
// 24 août = jour 0, 21 octobre = jour 58 ; 17 octobre = jour 54.
const dayX = (d: number) => X0 + ((X1 - X0) * d) / 58;

const Course: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const accent = useAccent();
  const aout = at('course', 'août');
  const octobre = at('course', 'octobre');
  const n17 = at('course', '17');
  const amazon = at('course', 'Amazon');
  const attaque = at('course', 'attaque');
  // Bar grow lent, du signalement au correctif.
  const grow = ease(frame, aout, octobre + 4, [0, 1], 'inOut');
  // La croix rouge tombe sur « 17 » et s'écrase un instant à l'impact.
  const fall = spring({frame: frame - n17, fps, config: {damping: 12, stiffness: 200}});
  const [sx, sy] = squash(frame, n17 + 6);
  return (
    <Scene>
      <div style={{position: 'relative', height: 560}}>
        <Pop at={aout} style={{position: 'absolute', left: 0, top: 70}}><Mono size={52} color="#fff">24 août</Mono></Pop>
        <Pop at={octobre} style={{position: 'absolute', right: 0, top: 70}}><Mono size={52} color={accent}>21 octobre</Mono></Pop>
        <div style={{position: 'absolute', left: X0, top: 190, width: X1 - X0, height: 40, border: '4px solid #8a8a8a', boxSizing: 'border-box'}} />
        <div style={{position: 'absolute', left: X0, top: 190, width: (X1 - X0) * grow, height: 40, background: withAlpha(accent, 0.55)}} />
        <Pop at={octobre} style={{position: 'absolute', left: X1 - 4, top: 160}}><div style={{width: 8, height: 100, background: accent}} /></Pop>
        {/* la première attaque, quatre jours avant l'arrivée */}
        <div style={{position: 'absolute', left: dayX(54) - 50, top: 130, opacity: frame >= n17 ? 1 : 0, transform: `translateY(${(1 - fall) * -260}px) scale(${sx}, ${sy})`, transformOrigin: 'bottom center'}}>
          <Cross p={1} size={100} color={RED} />
        </div>
        <Pop at={n17 + 4} style={{position: 'absolute', left: dayX(54) - 110, top: 270}}><Mono size={52} color={RED}>le 17</Mono></Pop>
        <Pop at={amazon} style={{position: 'absolute', left: 0, top: 370}}><Mono size={56} color="#fff">Amazon</Mono></Pop>
        <Pop at={attaque} style={{position: 'absolute', left: 0, top: 440}}><Mono size={56} color={RED}>première attaque</Mono></Pop>
      </div>
    </Scene>
  );
};

// ---------- 5. Et donc : la même IA pour défendre et pour attaquer ; le surnom, avec son point d'interrogation ----------

const Etdonc: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const ia = at('etdonc', "L'IA");
  const defendre = at('etdonc', 'défendre');
  const attaquer = at('etdonc', 'attaquer');
  const black = at('etdonc', 'Black');
  // Les deux flèches partent de l'éclair (draw-on), l'une puis l'autre.
  const left = ease(frame, defendre, defendre + 12);
  const right = ease(frame, attaquer, attaquer + 12);
  const duoOut = gone(frame, black - 4);
  return (
    <Scene>
      <div style={{position: 'relative', height: 600}}>
        <div style={{position: 'absolute', inset: 0, opacity: frame < black - 4 ? 1 : duoOut * 0.3 + 0.0}}>
          <Pop at={ia} style={{position: 'absolute', left: W / 2 - 80, top: 0}}><Bolt s={160} color={accent} /></Pop>
          <svg width={W} height={200} style={{position: 'absolute', left: 0, top: 150}}>
            <path d={`M${W / 2 - 40} 10 L${W / 2 - 40 - 220 * left} ${10 + 140 * left}`} stroke="#d6d6d6" strokeWidth="8" strokeLinecap="round" />
            <path d={`M${W / 2 + 40} 10 L${W / 2 + 40 + 220 * right} ${10 + 140 * right}`} stroke="#d6d6d6" strokeWidth="8" strokeLinecap="round" />
          </svg>
          <Pop at={defendre + 8} style={{position: 'absolute', left: 60, top: 300}}><Shield s={160} color="#7FD68A" /></Pop>
          <Pop at={defendre + 12} style={{position: 'absolute', left: 40, top: 480}}><Mono size={52} color="#7FD68A">défendre</Mono></Pop>
          <Pop at={attaquer + 8} style={{position: 'absolute', right: 60, top: 300}}><Crowbar s={160} color={RED} /></Pop>
          <Pop at={attaquer + 12} style={{position: 'absolute', right: 40, top: 480}}><Mono size={52} color={RED}>attaquer</Mono></Pop>
        </div>
        {/* le surnom, sur « Black » ; puis son point d'interrogation (masqué des sous-titres par `onscreen`) */}
        <Pop at={black} style={{position: 'absolute', left: 0, right: 0, top: 180, display: 'flex', justifyContent: 'center'}}>
          <div style={{background: '#000', border: '8px solid #fff', padding: '20px 40px', boxShadow: pixelShadow('#333')}}>
            <Big size={110} color="#fff">Black October</Big>
          </div>
        </Pop>
        {/* pop in du point d'interrogation, sous le cadre, quand le surnom est dit */}
        <Pop at={black + 8} style={{position: 'absolute', left: 0, right: 0, top: 380, display: 'flex', justifyContent: 'center'}}>
          <Big size={200} color={accent}>?</Big>
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- 6. Chute : ça se joue chez l'hébergeur ; deux jours pour exploiter, plus de soixante pour corriger ----------

const Chute: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const heb = at('chute', 'hébergeur');
  const jour = at('chute', 'jour', 0);
  const ici = at('chute', 'ici');
  const deux = at('chute', 'deux');
  const soixante = at('chute', 'soixante');
  const corriger = at('chute', 'corriger');
  const srvOut = gone(frame, ici - 4);
  // Bar grow : deux jours, puis plus de soixante (count-up et le seul punch zoom du short).
  const BAR = W - 40;
  const a = ease(frame, deux, deux + 10);
  const b = ease(frame, soixante, soixante + 36);
  return (
    <Scene>
      <div style={{position: 'relative', height: 620}}>
        {/* l'hébergeur et son serveur ; « à jour » sur « jour » */}
        <div style={{position: 'absolute', inset: 0, opacity: frame < ici - 4 ? 1 : srvOut}}>
          <Pop at={heb} style={{position: 'absolute', left: W / 2 - 110, top: 40}}><Server s={220} /></Pop>
          <Pop at={heb + 6} style={{position: 'absolute', left: 0, right: 0, top: 330, display: 'flex', justifyContent: 'center'}}><Mono size={56} color={LABEL}>hébergeur</Mono></Pop>
          <Pop at={jour} style={{position: 'absolute', left: 0, right: 0, top: 410, display: 'flex', justifyContent: 'center'}}>
            <div style={{background: accent, padding: '4px 20px'}}><Mono size={60} color="#111">PHP à jour</Mono></div>
          </Pop>
        </div>
        {/* les deux barres de la fiche */}
        <div style={{position: 'absolute', left: 0, top: 100, width: W, opacity: frame >= deux ? 1 : 0}}>
          <Mono size={56} color="#fff">exploiter la faille</Mono>
          <div style={{marginTop: 16, height: 60, width: Math.max(8, (BAR * 2) / 63) * a, background: RED}} />
          <div style={{marginTop: 10}}><Mono size={64} color={RED}>deux jours</Mono></div>
        </div>
        <div style={{position: 'absolute', left: 0, top: 380, width: W, opacity: frame >= soixante ? 1 : 0}}>
          <div style={{opacity: frame >= corriger ? 1 : 0.0}}><Mono size={56} color="#fff">corriger</Mono></div>
          <div style={{marginTop: 16, height: 60, width: BAR * b, background: accent}} />
          <div style={{marginTop: 10, transform: `scale(${punch(frame, soixante + 36)})`, transformOrigin: 'left center'}}>
            <Mono size={64} color={accent}>plus de {countUp(frame, soixante, 60, 36)} jours</Mono>
          </div>
        </div>
      </div>
    </Scene>
  );
};

// ---------- Montage ----------

const SCENES: Record<string, React.FC> = {hook: Hook, sites: Sites, nom: Nom, immeuble: Immeuble, course: Course, etdonc: Etdonc, chute: Chute};

export const BlackOctoberVoix: React.FC = () => <V.Montage scenes={SCENES} accent={AC} />;

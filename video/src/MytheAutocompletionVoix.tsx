// Short Mythe « Ce n'est que de l'autocomplétion » (YouTube / TikTok / Instagram), épisode 26, préparé le 2026-11-02
// (calage estimé, sans voix). Fiche mythe-autocompletion de lexique/terms.js ; sources dans voix/autocompletion.script.json :
// Anthropic, « Tracing the thoughts of a large language model » (27 mars 2025 : le distique « He saw a carrot and had to
// grab it, / His hunger was like a starving rabbit », le modèle choisit « rabbit » avant d'écrire le second vers ; concept
// retiré, il écrit un vers qui finit par « habit ») ; Lindsey et al., On the Biology of a Large Language Model (mars 2025).
// Fil : l'ép. 25 disait que Claude est un modèle de langage ; on entend souvent que ce n'est que de l'autocomplétion.
// Kasparov est une vraie personne : portrait réel pixelisé (règle des vraies photos, ép. 11), en attente (voir PORTRAIT).
// Aucun logo : clavier de téléphone générique, article d'Anthropic recréé en collage sobre en attendant la vraie capture.
// L'écran suit la voix (univers.md) : chaque élément entre sur le mot qui le nomme, at('scène', 'mot'), jamais en secondes.
// Le mouvement : ease partout, arcs pour ce qui vole (le pion), squash réservé au tampon FAUX, aucun punch zoom
// (le tampon fait l'impact du hook, et aucune scène ne porte de chiffre).
import React from 'react';
import {Img, staticFile, useCurrentFrame} from 'remotion';
import {Big, Draw, Highlight, Mono, Pop, RED, Scene, W, arc, ease, serif, typed, useAccent, withAlpha} from './kit';
import {LABEL, blink, makeVoix} from './voix/VoixShort';
import {Pixel, type Sprite} from './voix/Pixel';
import {Stamp, pixelShadow} from './voix/Parts';
import ALIGN from './voix/autocompletion.align.json';
import SCRIPT from './voix/autocompletion.script.json';

const AC = '#FF7A7A'; // catégorie Mythes vs réalité
const V = makeVoix(ALIGN, SCRIPT, 'voix/prediction-music.mp3');
const {at} = V;
export const MYTHEAUTOCOMPLETIONVOIX_DURATION = V.duration;

// Les mots anglais sont écrits en API dans la voix (« /ɡɹæb ɪt/ », « /ˈɹæbɪt/ ») : selon le calage (estimé ou tiré de la
// vraie voix), le mot porte la forme API ou la forme écrite. On essaie les deux.
const atAny = (scene: string, words: string[], nth = 0) => {
  for (const w of words) {
    try {
      return at(scene, w, nth);
    } catch {
      // forme suivante
    }
  }
  throw new Error(`aucun de ${words.join(' / ')} dans la scène ${scene}`);
};

// Portrait réel, pixelisé en 48 × 63 comme ceux de MytheInternetVoix (crédit à ajouter dans la description) :
//   public/voix/autocompletion-kasparov.png (« Garry Kasparov - 1987 - cropped.jpg », Comet Photo AG, Zürich, 5 avril 1987,
//   CC BY-SA 4.0, Wikimedia Commons ; crédits dans public/voix/CREDITS-semaine-03-11.md).
// À false, un buste gris générique tient la place (un <Img> sur un fichier absent ferait échouer le rendu).
const PORTRAIT = true;

// Sortie : 6 images en inOut (plus rapide que l'entrée Pop).
const gone = (frame: number, until: number) => ease(frame, until, until + 6, [1, 0], 'inOut');
const PAPER = '#efe9dc';
const MONO_CH = 0.6; // largeur d'un caractère d'IBM Plex Mono, en em

// Deux bouts de scotch aux coins (collage).
const Tape: React.FC<{w: number; top?: number}> = ({w, top = 0}) => (
  <>
    <div style={{position: 'absolute', left: -w * 0.04, top: top - w * 0.02, width: w * 0.14, height: w * 0.045, background: 'rgba(239,233,220,0.85)', transform: 'rotate(-32deg)', zIndex: 3}} />
    <div style={{position: 'absolute', right: -w * 0.04, top: top - w * 0.02, width: w * 0.14, height: w * 0.045, background: 'rgba(239,233,220,0.85)', transform: 'rotate(32deg)', zIndex: 3}} />
  </>
);

// ---------- Le clavier de téléphone (dessiné, sans marque) ----------

// w : largeur ; sugg : les trois suggestions de la barre ; lit : celle qui s'allume ; text : taille des suggestions.
const Keyboard: React.FC<{w: number; sugg: string[]; lit?: number; text: number; border?: string; tape?: boolean}> = ({w, sugg, lit = -1, text, border = '#fff', tape = true}) => {
  const accent = useAccent();
  const pad = 16;
  const gap = Math.max(6, Math.round(w / 90));
  const kw = (w - 2 * pad - 16 - 9 * gap) / 10;
  const kh = kw * 1.3;
  return (
    <div style={{position: 'relative', width: w}}>
      <div style={{width: w, background: '#1c1c1c', border: `8px solid ${border}`, boxSizing: 'border-box', boxShadow: pixelShadow('#2a2a2a'), padding: pad, display: 'flex', flexDirection: 'column', gap}}>
        {/* La barre des trois suggestions, comme sur tous les claviers de téléphone. */}
        <div style={{height: 88, display: 'flex', alignItems: 'center', borderBottom: '3px solid #444', marginBottom: gap}}>
          {sugg.map((s, k) => (
            <React.Fragment key={k}>
              {k ? <div style={{width: 3, height: 52, background: '#555'}} /> : null}
              <div style={{flex: 1, display: 'flex', justifyContent: 'center'}}>
                <Mono size={text} color={k === lit ? accent : '#fff'}>{s}</Mono>
              </div>
            </React.Fragment>
          ))}
        </div>
        {[10, 9, 7].map((n, r) => (
          <div key={r} style={{display: 'flex', justifyContent: 'center', gap}}>
            {Array.from({length: n}, (_, k) => <div key={k} style={{width: kw, height: kh, background: '#3a3a3a', borderRadius: 8}} />)}
          </div>
        ))}
        <div style={{display: 'flex', justifyContent: 'center', gap}}>
          <div style={{width: kw * 1.5, height: kh, background: '#2e2e2e', borderRadius: 8}} />
          <div style={{width: kw * 5, height: kh, background: '#3a3a3a', borderRadius: 8}} />
          <div style={{width: kw * 1.5, height: kh, background: '#2e2e2e', borderRadius: 8}} />
        </div>
      </div>
      {tape ? <Tape w={w} /> : null}
    </div>
  );
};

// ---------- Les tokens (même rendu que le short Token, sans les numéros) ----------

const BS = 48; // taille du texte des cases
const BH = Math.round(BS * 1.7);
const blockW = (t: string) => Math.round(Math.max(t.length, 2) * BS * MONO_CH + 40);
const GAP = 14;
// Abscisses des cases d'une rangée centrée dans le cadre.
const rowX = (toks: string[]) => {
  const total = toks.reduce((s, t) => s + blockW(t), 0) + GAP * (toks.length - 1);
  let x = (W - total) / 2;
  return toks.map((t) => {
    const x0 = x;
    x += blockW(t) + GAP;
    return x0;
  });
};

const Block: React.FC<{t: string; lit?: boolean}> = ({t, lit}) => {
  const accent = useAccent();
  return (
    <div style={{width: blockW(t), height: BH, background: lit ? withAlpha(accent, 0.18) : '#1c1c1c', border: `4px solid ${lit ? accent : '#888'}`, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Mono size={BS} color="#fff">{t}</Mono>
    </div>
  );
};

// La case suivante, encore vide : pointillés qui clignotent.
const Slot: React.FC<{t: string}> = ({t}) => {
  const frame = useCurrentFrame();
  return <div style={{width: blockW(t), height: BH, border: '4px dashed #9a9a9a', boxSizing: 'border-box', opacity: blink(frame)}} />;
};

// Trois suggestions et leurs barres de probabilité (bar grow en cascade) ; la plus haute est choisie à `choose`.
const SUGG_W = 390;
const SUGG_ROW = 66;
const SuggStack: React.FC<{words: string[]; probs: number[]; at: number; choose: number}> = ({words, probs, at: a, choose}) => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  return (
    <div style={{width: SUGG_W, display: 'flex', flexDirection: 'column', gap: 4}}>
      {words.map((w, k) => {
        const chosen = k === 0 && frame >= choose;
        return (
          <Pop key={k} at={a + 2 * k} style={{height: SUGG_ROW - 4, display: 'flex', alignItems: 'center', gap: 16}}>
            <div style={{width: 160}}><Mono size={48} color={chosen ? accent : '#fff'}>{w}</Mono></div>
            <div style={{height: 30, width: 210 * probs[k] * ease(frame, a + 4 + 2 * k, a + 16 + 2 * k), background: chosen ? accent : '#8a8a8a'}} />
          </Pop>
        );
      })}
    </div>
  );
};

// ---------- 0. Hook : la phrase du mythe à la machine, le tampon FAUX, le clavier scotché ----------

const L1 = "« Ce n'est que de";
const L2 = "l'autocomplétion »";
const HOOK_SUGG = ['le', 'mot', 'suivant'];
const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const auto = at('hook', 'autocompl');
  const fin = at('hook', '»');
  const mot = at('hook', 'mot');
  const suivants = at('hook', 'suivants');
  const lit = frame >= suivants ? 2 : frame >= mot ? 1 : -1;
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 640}}>
        {/* Typewriter : la citation s'écrit sur la voix, une ligne par groupe de mots. */}
        <div style={{position: 'absolute', left: 0, top: -470, display: 'flex', flexDirection: 'column', gap: 10}}>
          <Big size={88}>{typed(frame, 0, L1, 40) || ' '}</Big>
          <Big size={88}>{typed(frame, auto - 4, L2, 40) || ' '}</Big>
        </div>
        {/* Tampon FAUX juste après la citation (squash à l'impact), jusqu'à la fin du hook : l'image de couverture. */}
        <Stamp at={fin + 6} size={96} tilt={-12} bg="rgba(0,0,0,0.6)" style={{right: -10, top: -285, zIndex: 30}}>FAUX</Stamp>
        {/* Décor dès la première image : le clavier collé de travers ; « un mot », « les suivants » allument leur suggestion. */}
        <div style={{position: 'absolute', left: 34, top: 20, transform: 'rotate(-3deg)'}}>
          <Keyboard w={820} sugg={HOOK_SUGG} lit={lit} text={52} />
        </div>
      </div>
    </Scene>
  );
};

// ---------- 1. Vrai : la réponse s'écrit case par case, trois suggestions au-dessus de chaque case ----------

// Découpage o200k_base vérifié avec tiktoken (2026-11-02) : « Il fait très beau » = Il | fait | très | beau.
// Les barres sont un ordre de grandeur montré, pas une mesure : aucun chiffre n'est affiché.
const PHRASE = ['Il', 'fait', 'très', 'beau'];
const STEPS = [
  {w: ['Il', 'Le', 'Je'], p: [0.62, 0.22, 0.1]},
  {w: ['fait', 'est', 'a'], p: [0.55, 0.25, 0.12]},
  {w: ['très', 'beau', 'un'], p: [0.42, 0.3, 0.15]},
  {w: ['beau', 'chaud', 'bon'], p: [0.7, 0.14, 0.08]},
];
const ROW_Y = 250;
const Vrai: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const token = at('vrai', 'token');
  const clavier = at('vrai', 'clavier');
  const suivant = at('vrai', 'suivant');
  // Une case toutes les STEP images, de « token » à « mot suivant » : les suggestions sortent, les barres poussent,
  // la plus haute est choisie, puis le token tombe dans sa case.
  const STEP = Math.max(30, Math.floor((suivant - token) / PHRASE.length));
  const s = (k: number) => token + k * STEP;
  const xs = rowX(PHRASE);
  const cur = Math.max(0, Math.min(PHRASE.length - 1, Math.floor((frame - token) / STEP)));
  // Le clavier recule (inOut) vers le bas du cadre pendant « Le mythe a raison sur un point ».
  const back = ease(frame, 4, 30, [0, 1], 'inOut');
  const kw = 820 - 230 * back;
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 820}}>
        {/* Décor dès l'entrée : le clavier du hook, qui recule et rapetisse ; « clavier » l'allume. */}
        <div style={{position: 'absolute', left: 34 + ((W - 590) / 2 - 34) * back, top: 20 + 400 * back, transform: `rotate(${-3 + 1 * back}deg)`}}>
          <Keyboard w={kw} sugg={STEPS[cur].w} lit={frame >= s(cur) + 18 ? 0 : -1} text={48} border={frame >= clavier ? accent : '#fff'} tape={false} />
        </div>
        {/* Stagger : une case par token, chacune après ses trois suggestions. */}
        {PHRASE.map((t, k) => {
          const a = s(k);
          const drop = a + 24;
          return (
            <React.Fragment key={k}>
              {frame >= a && frame < drop ? <div style={{position: 'absolute', left: xs[k], top: ROW_Y}}><Slot t={t} /></div> : null}
              <Pop at={drop} style={{position: 'absolute', left: xs[k], top: ROW_Y}}><Block t={t} lit={frame < drop + 10} /></Pop>
              {frame >= a && frame < a + 32 ? (
                <div style={{position: 'absolute', left: Math.max(0, Math.min(W - SUGG_W, xs[k] - 20)), top: ROW_Y - 20 - 3 * SUGG_ROW, opacity: gone(frame, a + 26)}}>
                  <SuggStack words={STEPS[k].w} probs={STEPS[k].p} at={a} choose={a + 18} />
                </div>
              ) : null}
            </React.Fragment>
          );
        })}
        <Pop at={s(0) + 30} style={{position: 'absolute', left: xs[0], top: ROW_Y + BH + 14}}><Mono size={52} color={LABEL}>token</Mono></Pop>
      </div>
    </Scene>
  );
};

// ---------- 2 et 3. Le poème : la feuille, les deux vers, la bulle de pensée et le lapin ----------

// Le lapin, en pixel art (S = couleur des paupières pour le clignement).
const LAPIN: Sprite = {
  rows: ['..WW...WW...', '..WP...PW...', '..WP...PW...', '..WP...PW...', '..WW...WW...', '..WWWWWWW...', '.WWWWWWWWW..', '.WWEWWWEWW..', '.WWWWNWWWW..', '..WWWWWWW...', '...WWWWW....', '..WWWWWWWW..', '.WWWWWWWWWW.', '.WWWWWWWWWWW', '..WW....WW..'],
  palette: {W: '#d9d9d9', P: '#f4a6b8', E: '#111', N: '#f4a6b8', S: '#d9d9d9'},
};

const V1 = ['He saw a carrot', 'and had to grab it,'];
// Second vers une fois « rabbit » retiré du calcul : les sources publiques (Anthropic, 27 mars 2025 ; Lindsey et al.)
// ne donnent que sa fin, « habit » ; on ne montre donc que ce mot, sans inventer le reste du vers.
const V2 = ['', '… habit'];
const PAPER_Y = 320;
const LINE_H = 80;
const LINE_X = 50;
const lineTop = (k: number) => PAPER_Y + 26 + LINE_H * k + (k >= 2 ? 30 : 0);

// Une ligne de vers ; quand elle est écrite en entier, `hi` surligne un mot (Highlight).
const Line: React.FC<{text: string; full: string; hi?: {word: string; at: number}}> = ({text, full, hi}) => {
  const style: React.CSSProperties = {fontFamily: serif, fontStyle: 'italic', fontWeight: 400, fontSize: 64, lineHeight: 1, color: '#111', whiteSpace: 'nowrap'};
  if (hi && text === full) {
    const i = full.indexOf(hi.word);
    return <div style={style}>{full.slice(0, i)}<Highlight at={hi.at}>{hi.word}</Highlight>{full.slice(i + hi.word.length)}</div>;
  }
  return <div style={style}>{text || ' '}</div>;
};

// Les lignes déjà tapées d'un vers (typewriter sur plusieurs lignes).
const typedLines = (frame: number, start: number, lines: string[], cps = 40) => {
  const t = typed(frame, start, lines.join('\n'), cps).split('\n');
  return lines.map((_, k) => t[k] ?? '');
};

// La feuille du poème : le premier vers tapé, le second encore vide (deux lignes en pointillés tracées par `dash`).
const Poem: React.FC<{v1: string[]; v2: string[]; grab: number; habit: number; dash: number}> = ({v1, v2, grab, habit, dash}) => (
  <>
    <div style={{position: 'absolute', left: 0, top: PAPER_Y, width: W, height: 420, background: PAPER, border: '5px solid #fff', boxSizing: 'border-box', boxShadow: pixelShadow('#333')}} />
    <svg width={W} height={820} viewBox={`0 0 ${W} 820`} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
      {[2, 3].map((k) => (
        <path key={k} d={`M${LINE_X} ${lineTop(k) + 70} H${LINE_X + [430, 500][k - 2] * dash}`} stroke="#9a9384" strokeWidth="5" strokeDasharray="16 12" />
      ))}
    </svg>
    {v1.map((t, k) => (
      <div key={k} style={{position: 'absolute', left: LINE_X, top: lineTop(k)}}>
        <Line text={t} full={V1[k]} hi={k === 1 ? {word: 'grab it', at: grab} : undefined} />
      </div>
    ))}
    {v2.map((t, k) => (
      <div key={k} style={{position: 'absolute', left: LINE_X, top: lineTop(k + 2)}}>
        <Line text={t} full={V2[k]} hi={k === 1 ? {word: 'habit', at: habit} : undefined} />
      </div>
    ))}
  </>
);

// La bulle de pensée au-dessus du second vers, ses trois petites bulles en cascade (stagger) depuis la feuille.
const BUB = {x: 430, y: 0, w: 458, h: 270};
const Thought: React.FC<{at: number; dim?: number; children?: React.ReactNode}> = ({at: a, dim = 1, children}) => (
  <div style={{position: 'absolute', inset: 0, opacity: dim}}>
    {[[600, 610, 10], [650, 480, 15], [700, 330, 20]].map(([x, y, r], k) => (
      <Pop key={k} at={a + 3 * k} style={{position: 'absolute', left: x - r, top: y - r, width: 2 * r, height: 2 * r, borderRadius: '50%', background: '#f2f2f2', border: '4px solid #555', boxSizing: 'border-box'}}>
        <span />
      </Pop>
    ))}
    <Pop at={a + 9} style={{position: 'absolute', left: BUB.x, top: BUB.y, width: BUB.w, height: BUB.h, borderRadius: '50%', background: '#f2f2f2', border: '6px solid #555', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 26}}>
      {children}
    </Pop>
  </div>
);

// Collage recréé de l'article d'Anthropic : feuille blanche, scotch, le titre en texte.
// À REMPLACER par public/voix/autocompletion-anthropic.png (vraie capture, comme le Collage de MytheInternetVoix).
const Article: React.FC<{at: number}> = ({at: a}) => {
  const frame = useCurrentFrame();
  const slap = ease(frame, a, a + 8);
  return (
    <div style={{position: 'relative', width: 720, opacity: frame >= a ? 1 : 0, transform: `scale(${1.3 - 0.3 * slap}) rotate(${-2 * (2 - slap)}deg)`}}>
      <div style={{background: '#fbfbf8', border: '8px solid #fff', boxShadow: pixelShadow('#333'), padding: '40px 46px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 22}}>
        <Mono size={48} color="#555">Anthropic</Mono>
        <div style={{fontFamily: serif, fontWeight: 800, fontSize: 60, lineHeight: 1.05, color: '#111'}}>Tracing the thoughts of a large language model</div>
        {[92, 80, 86].map((p, k) => <div key={k} style={{height: 14, width: `${p}%`, background: '#b5b5b5'}} />)}
      </div>
      <Tape w={720} />
    </div>
  );
};

const Rime: React.FC = () => {
  const frame = useCurrentFrame();
  const mars = at('rime', 'mars');
  const anthropic = at('rime', 'Anthropic');
  const premier = at('rime', 'premier');
  const vers = at('rime', 'vers');
  const grab = atAny('rime', ['grab', 'ɡɹæb']);
  const second = at('rime', 'second');
  const choisi = at('rime', 'choisi');
  const rabbit = atAny('rime', ['ɹæb', 'rabbit']);
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 820}}>
        {/* Décor dès l'entrée : la feuille du poème ; « vers » : le premier vers à la machine ; « grab it » se surligne. */}
        <Pop at={0} style={{position: 'absolute', inset: 0}}>
          <Poem v1={typedLines(frame, vers, V1)} v2={['', '']} grab={grab} habit={99999} dash={ease(frame, second, second + 14)} />
        </Pop>
        {/* « déjà choisi » : la bulle de pensée s'allume ; « rabbit » : le lapin et son mot, pendant que le vers est vide. */}
        <Thought at={choisi - 9}>
          <Pop at={rabbit}><Pixel sprite={LAPIN} px={9} seed={1} /></Pop>
          <Pop at={rabbit + 5}><Mono size={56} color="#111">rabbit</Mono></Pop>
        </Thought>
        {/* « mars 2025 », « Anthropic » : l'article collé d'un coup ; ils partent avant « Le premier vers ». */}
        {frame < premier ? (
          <div style={{position: 'absolute', inset: 0, opacity: gone(frame, premier - 7), zIndex: 20}}>
            <Pop at={mars} style={{position: 'absolute', left: 0, top: 0}}><Mono size={52} color={LABEL}>mars 2025</Mono></Pop>
            <div style={{position: 'absolute', left: (W - 720) / 2, top: 90}}><Article at={anthropic} /></div>
          </div>
        ) : null}
      </div>
    </Scene>
  );
};

// La gomme, SVG maison.
const Gomme: React.FC = () => (
  <svg width={190} height={110} viewBox="0 0 190 110">
    <g transform="rotate(-18 95 55)">
      <rect x="20" y="28" width="150" height="54" rx="8" fill="#f4a6b8" stroke="#111" strokeWidth="5" />
      <rect x="100" y="28" width="70" height="54" fill="#3d6fd0" stroke="#111" strokeWidth="5" />
    </g>
  </svg>
);

const Effacer: React.FC = () => {
  const frame = useCurrentFrame();
  const efface = at('effacer', 'effacé');
  const habit = atAny('effacer', ['hæb', 'habit']);
  // « effacé » : la gomme frotte le lapin deux fois (inOut) puis repart ; le lapin s'efface sous elle, « rabbit » est barré.
  const rub = ease(frame, efface, efface + 24, [0, 1], 'inOut');
  const gx = BUB.x + 40 + 130 * (0.5 - 0.5 * Math.cos(rub * Math.PI * 4));
  const gy = BUB.y + 70 + 14 * Math.sin(rub * Math.PI * 8);
  const out = ease(frame, efface + 26, efface + 34, [0, 1], 'inOut');
  const [ox, oy] = arc(out, [gx, gy], [W + 60, -160], 40);
  const lapin = 1 - ease(frame, efface + 4, efface + 24);
  const strike = ease(frame, efface + 28, efface + 38);
  // Le second vers s'écrit à la machine pour finir sur « habit » quand la voix le dit.
  const start = habit - Math.ceil(((V2.join('\n').length - 2) * 30) / 40);
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 820}}>
        {/* Décor dès l'entrée : la feuille, le premier vers surligné, la bulle et son lapin. */}
        <Poem v1={V1} v2={typedLines(frame, start, V2)} grab={-20} habit={habit + 2} dash={1} />
        <Thought at={-30} dim={1 - 0.3 * ease(frame, start, start + 10)}>
          <div style={{opacity: lapin, filter: `blur(${(1 - lapin) * 3}px)`}}><Pixel sprite={LAPIN} px={9} seed={1} /></div>
          <div style={{position: 'relative'}}>
            <Mono size={56} color="#111">rabbit</Mono>
            <svg width={220} height={70} viewBox="0 0 220 70" style={{position: 'absolute', left: -10, top: 0, overflow: 'visible'}}>
              <Draw d="M4 40 L214 32" p={strike} width={8} len={220} color={RED} />
            </svg>
          </div>
        </Thought>
        {frame >= efface && out < 1 ? <div style={{position: 'absolute', left: ox, top: oy, zIndex: 10}}><Gomme /></div> : null}
      </div>
    </Scene>
  );
};

// ---------- 4 et 6. L'échiquier de Kasparov ----------

// Les pièces en pixel art (O = contour, W = remplissage), 8 × 8.
const PIECE = {
  pion: ['..OOOO..', '.OWWWWO.', '.OWWWWO.', '..OWWO..', '..OWWO..', '.OWWWWO.', 'OWWWWWWO', 'OOOOOOOO'],
  cavalier: ['..OOOO..', '.OWWWWO.', 'OWWOWWWO', 'OWWWWWWO', '.OOOWWWO', '..OWWWO.', '.OWWWWWO', 'OOOOOOOO'],
  dame: ['O..OO..O', 'OO.OO.OO', 'OWOWWOWO', '.OWWWWO.', '..OWWO..', '..OWWO..', '.OWWWWO.', 'OOOOOOOO'],
  roi: ['...OO...', '..OOOO..', '...OO...', '.OOOOOO.', '.OWWWWO.', '..OWWO..', '.OWWWWO.', 'OOOOOOOO'],
};
type Kind = keyof typeof PIECE;
const BLANC = {O: '#111', W: '#f6f6f2'};
const NOIR = {O: '#cfcfcf', W: '#1e1e1e'};
// Colonnes a = 1 … h = 8, rangées 1 … 8 (les blancs en bas).
const PIECES: {k: Kind; f: number; r: number; white: boolean}[] = [
  {k: 'roi', f: 5, r: 1, white: true}, {k: 'dame', f: 4, r: 1, white: true}, {k: 'cavalier', f: 6, r: 3, white: true},
  ...[1, 2, 3, 6, 7, 8].map((f) => ({k: 'pion' as Kind, f, r: 2, white: true})), {k: 'pion', f: 4, r: 4, white: true},
  {k: 'roi', f: 5, r: 8, white: false}, {k: 'dame', f: 4, r: 8, white: false}, {k: 'cavalier', f: 3, r: 6, white: false},
  ...[1, 2, 3, 6, 7, 8].map((f) => ({k: 'pion' as Kind, f, r: 7, white: false})), {k: 'pion', f: 4, r: 6, white: false},
];
// Le coup joué (pion e4 -> e5) puis le plan : cavalier f3 -> g5, dame d1 -> h5, dame h5 -> f7 (la case visée).
const PLAN: [number, number, number, number][] = [[6, 3, 7, 5], [4, 1, 8, 5], [8, 5, 6, 7]];
const TARGET: [number, number] = [6, 7];
const ctr = (f: number, r: number, S: number): [number, number] => [(f - 0.5) * S, (8 - r + 0.5) * S];

// Un coup en pointillés : les points se posent un à un (draw-on), la pointe arrive à la fin.
const Dotted: React.FC<{from: [number, number]; to: [number, number]; p: number; color: string; S: number}> = ({from, to, p, color, S}) => {
  const len = Math.hypot(to[0] - from[0], to[1] - from[1]);
  const head = S * 0.32;
  const step = S * 0.24;
  const n = Math.max(1, Math.floor((len - head) / step));
  const ux = (to[0] - from[0]) / len;
  const uy = (to[1] - from[1]) / len;
  const deg = (Math.atan2(uy, ux) * 180) / Math.PI;
  return (
    <g>
      {Array.from({length: n}, (_, k) => (k + 1) / n <= p + 1e-6 ? <circle key={k} cx={from[0] + ux * step * (k + 0.6)} cy={from[1] + uy * step * (k + 0.6)} r={S * 0.07} fill={color} /> : null)}
      {p >= 0.98 ? <path d={`M0 0 L${-head} ${-head * 0.62} L${-head} ${head * 0.62} Z`} fill={color} transform={`translate(${to[0]} ${to[1]}) rotate(${deg})`} /> : null}
    </g>
  );
};

// pawn : 0 -> 1, le pion e4 avance en e5 (arc) ; plan : avancée de chaque coup ; colors : couleur de chaque coup ;
// target : la case visée s'allume.
const Board: React.FC<{S: number; pawn: number; plan: number[]; colors: string[]; target: number}> = ({S, pawn, plan, colors, target}) => {
  const accent = useAccent();
  const px = S / 10;
  const [tx, ty] = [(TARGET[0] - 1) * S, (8 - TARGET[1]) * S];
  const [mx, my] = arc(pawn, [(5 - 1) * S, (8 - 4) * S], [(5 - 1) * S, (8 - 5) * S], S * 0.25);
  return (
    <div style={{position: 'relative', width: 8 * S, height: 8 * S, border: '8px solid #fff', boxShadow: pixelShadow('#333'), boxSizing: 'content-box'}}>
      <svg width={8 * S} height={8 * S} viewBox={`0 0 ${8 * S} ${8 * S}`} style={{position: 'absolute', left: 0, top: 0}} shapeRendering="crispEdges">
        {Array.from({length: 64}, (_, k) => <rect key={k} x={(k % 8) * S} y={Math.floor(k / 8) * S} width={S} height={S} fill={(k % 8 + Math.floor(k / 8)) % 2 ? '#8a6a48' : '#d8c7a0'} />)}
        <rect x={tx} y={ty} width={S} height={S} fill={withAlpha(accent, 0.55 * target)} />
      </svg>
      {PIECES.map((q, k) => (
        <div key={k} style={{position: 'absolute', left: (q.f - 1) * S + px, top: (8 - q.r) * S + px}}>
          <Pixel sprite={{rows: PIECE[q.k], palette: q.white ? BLANC : NOIR}} px={px} />
        </div>
      ))}
      <div style={{position: 'absolute', left: mx + px, top: my + px}}>
        <Pixel sprite={{rows: PIECE.pion, palette: BLANC}} px={px} />
      </div>
      <svg width={8 * S} height={8 * S} viewBox={`0 0 ${8 * S} ${8 * S}`} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
        {PLAN.map(([f0, r0, f1, r1], k) => <Dotted key={k} from={ctr(f0, r0, S)} to={ctr(f1, r1, S)} p={plan[k]} color={colors[k]} S={S} />)}
      </svg>
    </div>
  );
};

// Buste gris générique, sans visage : il tient la place du portrait réel tant que le fichier n'est pas dans public/voix.
const BUSTE: Sprite = {
  rows: ['............', '....HHHH....', '...HHHHHH...', '...HSSSSH...', '...SSSSSS...', '...SSSSSS...', '...SSSSSS...', '....SSSS....', '.....SS.....', '..TTTTTTTT..', '.TTTTTTTTTT.', '.TTTTTTTTTT.', 'TTTTTTTTTTTT', 'TTTTTTTTTTTT', 'TTTTTTTTTTTT', 'TTTTTTTTTTTT'],
  palette: {H: '#5a5a5a', S: '#8a8a8a', T: '#4a4a4a'},
};
const PW = 260;
const PH = Math.round((PW * 63) / 48);
// Portrait : bord blanc, ombre pixel, Ken Burns de 5 % sur la scène.
const Portrait: React.FC<{kb: number}> = ({kb}) => (
  <div style={{width: PW, height: PH, border: '8px solid #fff', background: '#2a2a2a', boxShadow: pixelShadow('#333'), lineHeight: 0, overflow: 'hidden'}}>
    <div style={{transform: `scale(${1 + 0.05 * kb})`, transformOrigin: '50% 40%'}}>
      {PORTRAIT ? (
        <Img src={staticFile('voix/autocompletion-kasparov.png')} style={{width: PW, height: PH, imageRendering: 'pixelated', display: 'block'}} />
      ) : (
        <Pixel sprite={BUSTE} px={PW / 12} style={{display: 'block', marginTop: PH - (16 * PW) / 12}} />
      )}
    </div>
  </div>
);

const KS = 66;
const Kasparov: React.FC = () => {
  const frame = useCurrentFrame();
  const kas = at('kasparov', 'Kasparov');
  const coup = at('kasparov', 'coup');
  const autre = at('kasparov', "l'autre");
  // « un coup » : le pion avance d'une case (arc, inOut) ; « après l'autre » : trois coups en pointillés, l'un après l'autre.
  const pawn = ease(frame, coup, coup + 12, [0, 1], 'inOut');
  const plan = PLAN.map((_, k) => ease(frame, autre + 18 * k, autre + 18 * k + 16));
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 760}}>
        {/* Décor dès l'entrée : l'échiquier vu de dessus ; « Kasparov » : son portrait à côté, puis son nom. */}
        <Pop at={0} style={{position: 'absolute', left: 0, top: 60}}>
          <Board S={KS} pawn={pawn} plan={plan} colors={[LABEL, LABEL, LABEL]} target={0} />
        </Pop>
        <Pop at={kas} style={{position: 'absolute', left: W - PW - 16, top: 60}}><Portrait kb={frame / 180} /></Pop>
        <Pop at={kas + 5} style={{position: 'absolute', left: W - PW - 40, width: PW + 40, top: 60 + PH + 40, display: 'flex', justifyContent: 'center'}}><Mono size={52} color="#fff">Kasparov</Mono></Pop>
      </div>
    </Scene>
  );
};

// ---------- 5. Après : les étiquettes du post-entraînement au-dessus, la même rangée de cases en dessous ----------

// Découpage o200k_base vérifié avec tiktoken (2026-11-02) : « Oui, voici la réponse » = Oui | , | voici | la | réponse.
const REPONSE = ['Oui', ',', 'voici', 'la', 'réponse'];
const TAGS: [string, number, number][] = [['répondre', 0, 0], ['refuser', 230, 112], ['raisonner', 460, 224]];
const Apres: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const cues = [at('apres', 'répondre'), at('apres', 'refuser'), at('apres', 'raisonner')];
  const prediction = at('apres', 'prédiction');
  const xs = rowX(REPONSE);
  // La rangée s'écrit à son rythme, entre les étiquettes (une chose bouge à la fois) : un token toutes les ~30 images.
  const times = [0, cues[0] - 52, cues[0] - 22, cues[2] + 24, cues[2] + 50];
  const lit = frame >= prediction;
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 560}}>
        {/* « répondre », « refuser », « raisonner » : trois étiquettes se posent en cascade, chacune sur son mot. */}
        {TAGS.map(([t, x, y], k) => (
          <Pop key={k} at={cues[k]} style={{position: 'absolute', left: x, top: y, padding: '14px 26px', border: '5px solid #fff', background: '#1c1c1c', boxShadow: pixelShadow('#333')}}>
            <Mono size={52} color="#fff">{t}</Mono>
          </Pop>
        ))}
        {/* Décor dès l'entrée : la rangée de cases du début, qui continue de s'écrire, inchangée ; « prédiction » l'allume. */}
        {REPONSE.map((t, k) => {
          const next = k + 1 < REPONSE.length ? times[k + 1] : 99999;
          return (
            <React.Fragment key={k}>
              <Pop at={times[k]} style={{position: 'absolute', left: xs[k], top: 440}}><Block t={t} lit={lit} /></Pop>
              {k + 1 < REPONSE.length && frame >= times[k] + 8 && frame < next ? (
                <div style={{position: 'absolute', left: xs[k + 1], top: 440}}><Slot t={REPONSE[k + 1]} /></div>
              ) : null}
            </React.Fragment>
          );
        })}
        <div style={{position: 'absolute', left: xs[0] - 12, top: 428, width: xs[4] + blockW('réponse') - xs[0] + 24, height: BH + 24, border: `5px solid ${accent}`, boxSizing: 'border-box', opacity: lit ? ease(frame, prediction, prediction + 8) : 0}} />
      </div>
    </Scene>
  );
};

// ---------- 6. Chute : mot après mot, coup après coup, le plan allumé jusqu'au bout ----------

const CS = 80;
const Chute: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const ecrit = at('chute', 'écrit');
  const mots = [ecrit, at('chute', 'mot'), at('chute', 'après'), at('chute', 'mot', 1)];
  const coups = [at('chute', 'coup'), at('chute', 'après', 1), at('chute', 'coup', 1)];
  const loin = at('chute', 'loin');
  const xs = rowX(PHRASE);
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 800}}>
        {/* « mot après mot » : la rangée de cases du début revient, une case par mot dit. */}
        {PHRASE.map((t, k) => <Pop key={k} at={mots[k]} style={{position: 'absolute', left: xs[k], top: 0}}><Block t={t} /></Pop>)}
        {/* Décor dès l'entrée : l'échiquier plein cadre, le plan en pointillés gris ; « coup après coup » l'allume coup par coup,
            « plus loin » allume la case visée. Image finale pleine. */}
        <Pop at={0} style={{position: 'absolute', left: (W - 8 * CS) / 2 - 8, top: BH + 40}}>
          <Board S={CS} pawn={1} plan={[1, 1, 1]} colors={coups.map((c) => (frame >= c ? accent : LABEL))} target={ease(frame, loin, loin + 10)} />
        </Pop>
      </div>
    </Scene>
  );
};

// ---------- Montage ----------

const SCENES: Record<string, React.FC> = {hook: Hook, vrai: Vrai, rime: Rime, effacer: Effacer, kasparov: Kasparov, apres: Apres, chute: Chute};

export const MytheAutocompletionVoix: React.FC = () => <V.Montage scenes={SCENES} accent={AC} />;

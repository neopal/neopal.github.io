// Short Mythe « L'IA apprend en direct de nos conversations » (YouTube / TikTok / Instagram), épisode 5, préparé le 2026-10-09.
// Fiche mythe-apprend-de-nos-conversations de lexique/terms.js (révisée le 2026-10-09) ; sources dans voix/conversations.script.json.
// Le mythe visé est précis : le modèle n'apprend pas PENDANT qu'on lui parle. Le short dit aussi ce qui est vrai :
// nos conversations entraînent le modèle suivant (activé par défaut chez ChatGPT), et la recherche (Google : Titans,
// Nested Learning) teste des modèles qui apprennent pendant l'usage, qu'aucun assistant grand public n'utilise encore.
// Répond à l'épisode 4 (Fenêtre de contexte : le paquet est sa seule mémoire). Image : le salon de coiffure (Nadia).
// À FAIRE avant la voix : la phrase du hook est provisoire (le titre de la fiche), il manque une citation sourcée.
// L'écran suit la voix (univers.md) : chaque élément entre sur le mot qui le nomme, chaque libellé reprend les mots dits.
// Le mouvement (univers.md) : easing partout, arcs pour les bulles et la fiche qui volent, tampon écrasé à l'impact.
import React from 'react';
import {Easing, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Big, Draw, Lock, Mono, Pop, Scene, Scissors, arc, clamp, ease, squash, useAccent, withAlpha} from './kit';
import {LABEL, makeVoix} from './voix/VoixShort';
import {NADIA, Pixel, REMPLACANTE} from './voix/Pixel';
import ALIGN from './voix/conversations.align.json';
import SCRIPT from './voix/conversations.script.json';

const AC = '#FF7A7A'; // catégorie Mythes vs réalité
const V = makeVoix(ALIGN, SCRIPT, 'voix/prediction-music.mp3');
const {at} = V;
export const MYTHECONVERSATIONSVOIX_DURATION = V.duration;

const pixelShadow = (c: string) => `8px 8px 0 ${c}`;
const gone = (frame: number, until: number) => ease(frame, until, until + 6, [1, 0], 'inOut');

// Tampon : posé d'un coup, de travers, quand la voix arrive au mot.
const Stamp: React.FC<{at: number; children: React.ReactNode; size: number; tilt?: number; bg?: string; style?: React.CSSProperties}> = ({at: a, children, size, tilt = -10, bg = 'transparent', style}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const accent = useAccent();
  const p = spring({frame: frame - a, fps, config: {damping: 9, stiffness: 220}});
  // Il tombe de haut (1,8 fois sa taille), puis s'écrase un instant à l'impact.
  const [sx, sy] = squash(frame, a + 5);
  const s = 1.8 - 0.8 * p;
  return (
    <div style={{position: 'absolute', padding: '6px 18px', border: `${Math.round(size / 9)}px solid ${accent}`, background: bg, transform: `scale(${s * sx}, ${s * sy}) rotate(${tilt * p}deg)`, opacity: frame >= a ? 1 : 0, ...style}}>
      <Mono size={size} color={accent}>{children}</Mono>
    </div>
  );
};

// Le modèle : un bloc plein, le même dans tout le short ; le cadenas dit qu'il ne bouge plus.
// live : ses cases changent sans arrêt (un modèle de recherche qui apprend pendant l'usage).
const Model: React.FC<{w?: number; lock?: number; dashed?: boolean; live?: boolean}> = ({w = 300, lock = 0, dashed, live}) => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  return (
    <div style={{position: 'relative', width: w, height: w * 0.62, background: dashed ? 'transparent' : '#2a2a2a', border: `${Math.max(4, Math.round(w / 50))}px ${dashed ? 'dashed' : 'solid'} #fff`, boxShadow: dashed ? 'none' : pixelShadow('#222'), display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: w / 30, padding: w / 14, boxSizing: 'border-box'}}>
      {Array.from({length: 10}, (_, k) => {
        const flick = live && Math.sin(frame / 4 + k * 1.7) > 0.3;
        return <div key={k} style={{background: dashed ? 'transparent' : flick ? accent : '#5a5a5a', border: dashed ? '3px dashed #555' : 'none'}} />;
      })}
      {lock > 0 ? <div style={{position: 'absolute', right: -w / 8, top: -w / 8, lineHeight: 0}}><Lock p={lock} size={Math.max(56, w / 3)} color={accent} /></div> : null}
    </div>
  );
};

// Une bulle de conversation, réduite à des traits.
const Msg: React.FC<{w: number; right?: boolean}> = ({w, right}) => (
  <div style={{alignSelf: right ? 'flex-end' : 'flex-start', width: w, background: right ? '#2a2a2a' : 'transparent', border: right ? 'none' : '4px solid #444', borderRadius: 26, padding: '18px 24px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 10}}>
    <div style={{height: 12, width: '90%', background: '#5a5a5a'}} />
    <div style={{height: 12, width: '60%', background: '#5a5a5a'}} />
  </div>
);

// ---------- 0. Hook : la phrase du mythe, en grand ----------

const Hook: React.FC = () => {
  const accent = useAccent();
  const apprend = at('hook', 'apprend');
  const direct = at('hook', 'direct');
  const conv = at('hook', 'conversations');
  const instant = at('hook', 'encore');
  return (
    <Scene>
      <div style={{position: 'relative', display: 'flex', flexDirection: 'column', gap: 6}}>
        {/* « PAS ENCORE » plutôt que « FAUX » : des modèles qui apprennent pendant l'usage existent en recherche (scène « recherche »). */}
        <Stamp at={instant} size={84} tilt={-10} bg="rgba(0,0,0,0.6)" style={{right: 0, bottom: -150, zIndex: 2}}>PAS ENCORE</Stamp>
        <Pop at={0}><Big size={110}>« L'IA apprend</Big></Pop>
        <Pop at={Math.max(2, Math.min(apprend + 4, direct))}><Big size={110} color={accent}>en direct</Big></Pop>
        <Pop at={conv - 4}><Big size={110}>de nos conversations »</Big></Pop>
      </div>
    </Scene>
  );
};

// ---------- 1. Figé : les messages arrivent, le modèle ne bouge pas ----------

const Fige: React.FC = () => {
  const frame = useCurrentFrame();
  const parles = at('fige', 'parles');
  const modele = at('fige', 'modèle');
  const figes = at('fige', 'figés');
  const entrainement = at('fige', 'entraînement');
  // Les messages partent de la droite et rebondissent sur le modèle sans y laisser de trace.
  const shots = [parles, parles + 12, modele + 12, figes, figes + 14, entrainement];
  return (
    <Scene
      bottom={
        <Pop at={figes} style={{display: 'flex', justifyContent: 'center'}}>
          <Mono size={56} color={LABEL}>paramètres figés</Mono>
        </Pop>
      }
    >
      <div style={{position: 'relative', height: 420}}>
        <Pop at={Math.min(modele, 6)} style={{position: 'absolute', left: 0, top: 70}}>
          <Model w={420} lock={ease(frame, figes, figes + 10)} />
        </Pop>
        {shots.map((s, k) => {
          const t = frame - s;
          if (t < 0 || t > 30) return null;
          // Aller en arc jusqu'au bord du modèle, puis rebond en arc vers le bas, en s'effaçant.
          const go = ease(t, 0, 12, [0, 1], 'inOut');
          const back = ease(t, 12, 30);
          const y0 = 60 + (k % 3) * 110;
          const [x, y] = t < 12 ? arc(go, [688, y0], [450, y0], 40) : arc(back, [450, y0], [610, y0 + 140], 50);
          return (
            <div key={k} style={{position: 'absolute', left: x, top: y, opacity: 1 - back}}>
              <Msg w={200} right />
            </div>
          );
        })}
      </div>
    </Scene>
  );
};

// ---------- 2. La fenêtre : la conversation passe, puis rien n'en reste ----------

const Fenetre: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const conv = at('fenetre', 'conversation');
  const fen = at('fenetre', 'fenêtre');
  const repondre = at('fenetre', 'répondre');
  const rien = at('fenetre', 'rien');
  const n = Math.floor(interpolate(frame, [conv, repondre], [1, 4], clamp));
  const wipe = ease(frame, rien, rien + 12, [1, 0], 'inOut');
  return (
    <Scene gap={50}>
      <div style={{position: 'relative', height: 330}}>
        {/* Le cadre de la fenêtre se pose sur « fenêtre », autour des messages déjà là. */}
        <div style={{position: 'absolute', inset: 0, border: `8px solid ${frame >= fen ? accent : 'transparent'}`, boxShadow: frame >= fen ? `0 0 26px ${withAlpha(accent, 0.5)}` : 'none'}} />
        <div style={{position: 'absolute', inset: 22, display: 'flex', flexDirection: 'column', gap: 14, overflow: 'hidden', opacity: wipe}}>
          {frame >= conv ? Array.from({length: n}, (_, k) => <Msg key={k} w={k % 2 ? 420 : 360} right={k % 2 === 0} />) : null}
        </div>
      </div>
      {/* Le modèle, en dessous : le décor, déjà vu à la scène d'avant. */}
      <div style={{display: 'flex', alignItems: 'center', gap: 34}}>
        <Pop at={2}><Model w={240} lock={1} /></Pop>
        <Pop at={rien}><Mono size={56} color={LABEL}>rien n'en reste</Mono></Pop>
      </div>
    </Scene>
  );
};

// ---------- 3. Le nom : la mémoire, des notes rangées à part et recollées ----------

const NOTES = ['tutoiement', 'végétarienne', 'habite Lyon'];

const Note: React.FC<{lines: string[]; extra?: string; extraAt?: number}> = ({lines, extra, extraAt = 0}) => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  return (
    <div style={{width: 470, background: '#efe9dc', border: '6px solid #000', boxShadow: pixelShadow('#444'), padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 10}}>
      <Mono size={48} color="#111">mémoire</Mono>
      {lines.map((l) => <Mono key={l} size={48} color="#555">{l}</Mono>)}
      {extra ? <div style={{opacity: frame >= extraAt ? 1 : 0, background: withAlpha(accent, 0.3), padding: '0 8px'}}><Mono size={48} color="#111">{extra}</Mono></div> : null}
    </div>
  );
};

const Memoire: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const accent = useAccent();
  const mem = at('memoire', 'mémoire');
  const en = at('memoire', 'memory');
  const notes = at('memoire', 'notes');
  const recolle = at('memoire', 'recolle');
  const debut = at('memoire', 'début');
  // La fiche glisse de son coin (à part du modèle) jusque dans la conversation suivante, sur « recolle ».
  const move = spring({frame: frame - recolle, fps, config: {damping: 16, stiffness: 120}});
  const [noteX, noteY] = arc(move, [400, 10], [0, 16], 50);
  return (
    <Scene gap={30}>
      <div style={{display: 'flex', alignItems: 'baseline', gap: 24}}>
        <Pop at={mem}><Big size={110} color={accent}>mémoire</Big></Pop>
        <Pop at={en}><Mono size={64} color="#fff">memory</Mono></Pop>
      </div>
      <div style={{position: 'relative', height: 420}}>
        {/* La conversation suivante : elle apparaît quand on y recolle la fiche. */}
        <Pop at={recolle} style={{position: 'absolute', left: 0, top: 0, width: 500, height: 400, border: `6px solid ${withAlpha(accent, 0.7)}`, boxSizing: 'border-box'}}>
          <div style={{position: 'absolute', left: 20, bottom: 20, opacity: frame >= debut ? 1 : 0}}><Msg w={300} right /></div>
        </Pop>
        <div style={{position: 'absolute', left: noteX, top: noteY, transform: `rotate(${3 * (1 - move)}deg)`, opacity: frame >= notes ? 1 : 0}}>
          <Note lines={NOTES} />
        </div>
      </div>
    </Scene>
  );
};

// ---------- 4. L'image : Nadia et la fiche client ----------

const Salon: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const nadia = at('salon', 'Nadia');
  const degrade = at('salon', 'dégradé');
  const fiche = at('salon', 'fiche');
  const remplacante = at('salon', 'remplaçante');
  const question = at('salon', 'question');
  const swap = frame >= remplacante;
  return (
    <Scene gap={30}>
      <div style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between'}}>
        {/* Le miroir du salon (le décor), puis Nadia dedans ; sa remplaçante prend sa place. */}
        <Pop at={2} style={{position: 'relative', width: 380, height: 460, borderRadius: '190px 190px 20px 20px', border: '10px solid #cfcfcf', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', gap: 14, paddingBottom: 20, boxSizing: 'border-box', background: '#1a1a1a', overflow: 'hidden'}}>
          <div style={{position: 'absolute', right: 30, top: 70}}><Scissors size={80} /></div>
          <Pop at={swap ? remplacante : nadia}><Pixel sprite={swap ? REMPLACANTE : NADIA} px={20} seed={swap ? 2 : 0} /></Pop>
          <Pop at={swap ? remplacante : nadia}><Mono size={48} color="#fff">{swap ? 'remplaçante' : 'Nadia'}</Mono></Pop>
        </Pop>
        <div style={{position: 'relative', width: 460, height: 460}}>
          {/* Ce que dit Nadia : la phrase est à l'écran, donc pas sous-titrée (quoted). */}
          <Pop at={degrade} style={{position: 'absolute', left: 0, top: 0, width: 440, background: '#2a2a2a', borderRadius: 30, padding: '20px 26px', opacity: gone(frame, remplacante)}}>
            <Mono size={48} color="#fff">« dégradé,</Mono>
            <Mono size={48} color="#fff">pas trop court</Mono>
            <Mono size={48} color="#fff">derrière » ?</Mono>
          </Pop>
          {/* La fiche client, où elle l'a lu : elle part avec Nadia. */}
          <Pop at={fiche} style={{position: 'absolute', left: 0, top: 240, width: 440, background: '#efe9dc', border: '6px solid #000', boxShadow: pixelShadow('#444'), padding: '18px 22px', display: 'flex', flexDirection: 'column', gap: 8, opacity: gone(frame, remplacante)}}>
            <Mono size={48} color="#111">fiche client</Mono>
            <div style={{height: 12, width: '80%', background: '#9a9384'}} />
            <div style={{height: 12, width: '60%', background: '#9a9384'}} />
          </Pop>
          {swap ? (
            <Pop at={question - 4} style={{position: 'absolute', left: 0, top: 0, width: 440, background: '#2a2a2a', borderRadius: 30, padding: '20px 26px'}}>
              <Mono size={48} color={accent}>la même question</Mono>
            </Pop>
          ) : null}
        </div>
      </div>
    </Scene>
  );
};

// ---------- 5. L'entraînement : tes conversations servent au modèle suivant ----------

const Entrainement: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const conv = at('entrainement', 'conversations');
  const suivant = at('entrainement', 'suivant');
  const chatgpt = at('entrainement', 'ChatGPT');
  const defaut = at('entrainement', 'défaut');
  const coupes = at('entrainement', 'coupes');
  const on = frame >= defaut && frame < coupes + 6;

  return (
    <Scene
      gap={40}
      bottom={
        <Pop at={chatgpt} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24}}>
          <Mono size={52} color="#fff">ChatGPT</Mono>
          <div style={{width: 120, height: 60, borderRadius: 30, background: on ? accent : '#444', position: 'relative'}}>
            <div style={{position: 'absolute', top: 8, left: 8 + 60 * (ease(frame, defaut, defaut + 8, [0, 1], 'inOut') - ease(frame, coupes, coupes + 8, [0, 1], 'inOut')), width: 44, height: 44, borderRadius: 22, background: '#fff'}} />
          </div>
          <div style={{opacity: frame >= defaut ? 1 : 0}}><Mono size={48} color={LABEL}>{frame >= coupes ? 'coupé' : 'par défaut'}</Mono></div>
        </Pop>
      }
    >
      <Pop at={suivant} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18}}>
        <Mono size={52} color={accent}>le modèle suivant</Mono>
        <Model w={320} dashed />
      </Pop>
      <div style={{position: 'relative', height: 160}}>
        {[0, 1, 2].map((k) => {
          // Tant que le réglage reste activé, les conversations montent vers le modèle suivant (en pointillés).
          const flowing = frame >= suivant && frame < coupes;
          const t = flowing ? ((frame - suivant) / 36 + k / 3) % 1 : 0;
          // Chaque bulle monte en arc vers le modèle suivant, en accélérant puis en ralentissant.
          const [bx, by] = arc(Easing.inOut(Easing.cubic)(t), [110 + k * 230, 90], [330, -230], 50);
          return (
            <Pop key={k} at={conv + k * 3} style={{position: 'absolute', left: bx, top: by, opacity: flowing ? 1 - t : 0.5, transform: 'scale(0.7)'}}>
              <Msg w={200} right />
            </Pop>
          );
        })}
      </div>
    </Scene>
  );
};

// ---------- 6. La recherche : des modèles qui apprennent pendant l'usage, pas encore chez toi ----------

const Recherche: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const chercheurs = at('recherche', 'chercheurs');
  const google = at('recherche', 'Google');
  const apprennent = at('recherche', 'apprennent');
  const assistant = at('recherche', 'assistants');
  const encore = at('recherche', 'encore');
  return (
    <Scene gap={34}>
      {/* La paillasse : un article de recherche, et le modèle expérimental dont les cases changent en direct. */}
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <Pop at={chercheurs} style={{width: 300, background: '#efe9dc', border: '6px solid #000', boxShadow: pixelShadow('#444'), padding: '22px 24px', display: 'flex', flexDirection: 'column', gap: 12}}>
          <div style={{opacity: frame >= google ? 1 : 0}}><Mono size={52} color="#111">Google</Mono></div>
          {[90, 70, 84, 60].map((w, k) => <div key={k} style={{height: 12, width: `${w}%`, background: '#9a9384'}} />)}
        </Pop>
        <Pop at={apprennent - 6} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14}}>
          <Model w={300} live={frame >= apprennent} />
          <Mono size={48} color={accent}>apprennent</Mono>
        </Pop>
      </div>
      {/* L'assistant de tous les jours : une conversation, avec le modèle figé. */}
      <Pop at={assistant} style={{position: 'relative', border: '6px solid #fff', padding: '22px 26px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
          <Mono size={48} color={LABEL}>assistants du quotidien</Mono>
          <Msg w={340} right />
        </div>
        <Lock p={1} size={80} color="#fff" />
        <Stamp at={encore} size={56} bg="#000" style={{right: 30, top: -40}}>pas encore</Stamp>
      </Pop>
    </Scene>
  );
};

// ---------- 7. Chute : la correction dans la mémoire ----------

const Chute: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const erreur = at('chute', 'erreur');
  const correction = at('chute', 'correction');
  const memoire = at('chute', 'mémoire');
  const relit = at('chute', 'relit');
  return (
    <Scene gap={40}>
      {/* La même réponse, trois fois : les cases sont là dès l'entrée, les croix tombent sur « erreur ». */}
      <div style={{display: 'flex', justifyContent: 'center', gap: 30, opacity: frame >= memoire ? 0.35 : 1}}>
        {[0, 1, 2].map((k) => (
          <Pop key={k} at={2 + k * 4} style={{width: 220, height: 130, border: `5px solid ${frame >= erreur ? accent : '#666'}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <svg width={80} height={80} viewBox="0 0 100 100">
              <Draw d="M22 22 L78 78" p={ease(frame, erreur + k * 4, erreur + k * 4 + 8)} width={12} len={80} />
              <Draw d="M78 22 L22 78" p={ease(frame, erreur + k * 4 + 4, erreur + k * 4 + 12)} width={12} len={80} />
            </svg>
          </Pop>
        ))}
      </div>
      <Pop at={Math.min(correction, memoire)} style={{display: 'flex', justifyContent: 'center'}}>
        <div style={{transform: `scale(${1 + 0.06 * ease(frame, relit, relit + 8)})`}}>
          <Note lines={NOTES.slice(0, 2)} extra="ta correction" extraAt={correction} />
        </div>
      </Pop>
    </Scene>
  );
};

// ---------- Montage ----------

const SCENES: Record<string, React.FC> = {hook: Hook, fige: Fige, fenetre: Fenetre, memoire: Memoire, salon: Salon, entrainement: Entrainement, recherche: Recherche, chute: Chute};

export const MytheConversationsVoix: React.FC = () => <V.Montage scenes={SCENES} accent={AC} />;

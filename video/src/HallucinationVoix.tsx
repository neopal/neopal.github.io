// Short Hallucination (YouTube / TikTok), voix off ElevenLabs avec la voix clonée de PA (PAL - FR), 2026-10-08.
// Le moteur (calage sur la voix, sous-titres, hook, montage) est dans voix/VoixShort.tsx ; ce fichier ne contient que les scènes.
import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {Big, Bubble, Check, Cross, Dots, Draw, Mono, Pop, RED, Say, Scene, W, clamp, useAccent, withAlpha} from './kit';
import {Chip, GAP} from './Prediction';
import {LABEL, blink, makeVoix} from './voix/VoixShort';
import ALIGN from './voix/hallucination.align.json';
import SCRIPT from './voix/hallucination.script.json';

const FOND = '#7CFFB2';
// Musique réutilisée de Prédiction (VOIX.md, « Démarrer un nouveau short », étape 4).
const V = makeVoix(ALIGN, SCRIPT, 'voix/prediction-music.mp3');
const {at} = V;
export const HALLUCINATIONVOIX_DURATION = V.duration;

// Lignes grises qui s'écrivent : la forme d'un texte, sans contenu inventé.
const Lines: React.FC<{p: number; widths: number[]; h?: number}> = ({p, widths, h = 20}) => (
  <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
    {widths.map((w, k) => (
      <div key={k} style={{height: h, borderRadius: h / 2, background: '#6a6a6a', width: `${w * interpolate(p, [k / widths.length, (k + 1) / widths.length], [0, 1], clamp)}%`}} />
    ))}
  </div>
);

// ---------- 0. Hook : la question du terme, en grand, dès la première image ----------

const Hook: React.FC = () => <V.TitleHook lead="C'est quoi ?" lines={['une', 'hallucination']} cue="hallucination" />;

// ---------- 1. Intro : ChatGPT cite une source ; il ne ment pas, il ne sait pas ----------

const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const t0 = at('intro', 'ChatGPT');
  const src = at('intro', 'source');
  const ment = at('intro', 'ment');
  const sait = at('intro', 'sait');
  const lines = interpolate(frame, [src, src + 18], [0, 1], clamp);
  return (
    <Scene>
      <Pop at={t0}><Mono size={52} color={LABEL}>ChatGPT</Mono></Pop>
      <Pop at={src} style={{border: `5px solid ${frame >= ment ? RED : '#555'}`, borderRadius: 30, padding: '30px 34px', display: 'flex', flexDirection: 'column', gap: 22}}>
        <Mono size={48} color={LABEL}>source</Mono>
        <Lines p={lines} widths={[94, 80, 56]} />
      </Pop>
      <Pop at={sait} style={{display: 'flex', justifyContent: 'center', marginTop: 20}}>
        <div style={{width: 200, height: 160, border: `8px dashed ${accent}`, borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: blink(frame)}}>
          <Big size={130} color={accent}>?</Big>
        </div>
      </Pop>
    </Scene>
  );
};

// ---------- 2. Base : pas de base de données, le mot le plus plausible, puis le suivant ----------

const Cylinder: React.FC<{p: number}> = ({p}) => (
  <svg width={260} height={300} viewBox="0 0 100 116">
    <Draw d="M10 18 A40 12 0 0 0 90 18 A40 12 0 0 0 10 18" p={p} color="#fff" width={5} len={260} />
    <Draw d="M10 18 L10 98 A40 12 0 0 0 90 98 L90 18" p={p} color="#fff" width={5} len={260} />
    <Draw d="M10 46 A40 12 0 0 0 90 46 M10 72 A40 12 0 0 0 90 72" p={p} color="#888" width={4} len={260} />
  </svg>
);

const PHRASE = ['Le', 'mariage', 'a', 'eu', 'lieu', 'en', 'juin'];

const Base: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const chercher = at('base', 'chercher');
  const donnees = at('base', 'données');
  const ecrit = at('base', 'écrit');
  const point = at('base', 'point');
  const step = Math.max(4, Math.floor((point - ecrit) / PHRASE.length));
  const shown = Math.max(0, Math.min(PHRASE.length, Math.floor((frame - ecrit) / step) + 1));
  const writing = shown < PHRASE.length;
  return (
    <Scene>
      {frame < ecrit ? (
        <Pop at={chercher} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', height: 320}}>
          <Cylinder p={interpolate(frame, [chercher, chercher + 16], [0, 1], clamp)} />
          <div style={{position: 'absolute', opacity: frame >= donnees ? 1 : 0}}>
            <Cross p={interpolate(frame, [donnees, donnees + 10], [0, 1], clamp)} size={300} />
          </div>
        </Pop>
      ) : (
        <div style={{display: 'flex', flexWrap: 'wrap', gap: GAP, alignContent: 'flex-start'}}>
          {PHRASE.slice(0, shown).map((t, k) => (
            <Pop key={k} at={ecrit + k * step}>
              <Chip t={t} size={60} on={interpolate(frame, [ecrit + k * step, ecrit + (k + 1) * step + 6], [1, 0], clamp)} />
            </Pop>
          ))}
          {writing ? <div style={{opacity: blink(frame)}}><Chip t=" ? " size={60} ghost /></div> : null}
          {frame >= point ? <Pop at={point}><Chip t="." size={60} on={1} color={accent} /></Pop> : null}
        </div>
      )}
    </Scene>
  );
};

// ---------- 3. Le nom : plausible se remplit, vrai n'est jamais mesuré ----------

const Gauge: React.FC<{label: string; fill: number; at: number; unknown?: boolean}> = ({label, fill, at: a, unknown}) => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  return (
    <Pop at={a} style={{display: 'flex', flexDirection: 'column', gap: 14}}>
      <Mono size={56} color="#fff">{label}</Mono>
      <div style={{position: 'relative', height: 140, border: '5px solid #666'}}>
        <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: `${fill * 100}%`, background: accent}} />
        {unknown ? (
          <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: frame >= a + 8 ? 1 : 0}}>
            <Mono size={56} color={LABEL}>jamais mesuré</Mono>
          </div>
        ) : null}
      </div>
    </Pop>
  );
};

const Nom: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const plaus = at('nom', 'plausible');
  const vrai = at('nom', 'vrai');
  const name = at('nom', 'hallucination');
  const en = at('nom', 'anglais');
  const fill = interpolate(frame, [plaus, plaus + 20], [0, 0.94], {...clamp, easing: (t) => 1 - (1 - t) ** 3});
  return (
    <Scene gap={70}>
      {frame < name ? (
        <>
          <Gauge label="plausible" fill={fill} at={plaus} />
          <Gauge label="vrai" fill={0} at={vrai} unknown />
        </>
      ) : (
        <div style={{display: 'flex', flexDirection: 'column', gap: 30}}>
          <Pop at={name}><Big size={124} color={accent}>hallucination</Big></Pop>
          <Pop at={en + 6} style={{display: 'flex', alignItems: 'baseline', gap: 20}}>
            <Mono size={48} color={LABEL}>EN</Mono>
            <Mono size={56} color="#fff">hallucination</Mono>
          </Pop>
        </div>
      )}
    </Scene>
  );
};

// ---------- 4. Tonton Gilbert : la même assurance, qu'il ait raison ou tort ----------

const Gilbert: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const t0 = at('gilbert', 'Gilbert');
  const quote = at('gilbert', '14');
  const raison = at('gilbert', 'raison');
  const deux = at('gilbert', 'deux');
  const aplomb = at('gilbert', 'aplomb');
  // Il bombe le torse quand il parle.
  const puff = frame >= quote ? 1 + 0.04 * Math.abs(Math.sin((frame - quote) / 4)) * (frame < raison ? 1 : 0) : 1;
  return (
    <Scene gap={50}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 30}}>
        <Pop at={t0} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `scale(${puff})`, transformOrigin: 'bottom center'}}>
          <div style={{width: 110, height: 110, borderRadius: 55, background: accent}} />
          <div style={{width: 170, height: 190, borderRadius: '85px 85px 0 0', background: withAlpha(FOND, 0.35), marginTop: 12}} />
        </Pop>
        <Pop at={quote} style={{flex: 1, border: '5px solid #fff', borderRadius: '40px 40px 40px 6px', padding: '28px 32px', marginBottom: 150}}>
          <Say size={60}>« Le 14 juin 97, il pleuvait ! »</Say>
        </Pop>
      </div>
      <div style={{display: 'flex', justifyContent: 'center', gap: 120}}>
        <Pop at={raison} style={{display: 'flex', alignItems: 'center', gap: 14}}>
          <Check p={interpolate(frame, [raison, raison + 10], [0, 1], clamp)} size={110} />
          <Mono size={56} color="#fff">vrai</Mono>
        </Pop>
        <Pop at={deux} style={{display: 'flex', alignItems: 'center', gap: 14}}>
          <Cross p={interpolate(frame, [deux, deux + 10], [0, 1], clamp)} size={110} />
          <Mono size={56} color="#fff">faux</Mono>
        </Pop>
      </div>
      <Pop at={aplomb} style={{display: 'flex', justifyContent: 'center'}}>
        <Mono size={56} color={accent}>même aplomb</Mono>
      </Pop>
    </Scene>
  );
};

// ---------- 5. Les pigeons : une thèse inventée, résumée avec aplomb ----------

const ANSWER = 'Avec plaisir ! Soutenue à Toulouse, elle compare 412 lâchers de pigeons…';

const Pigeons: React.FC = () => {
  const frame = useCurrentFrame();
  const ask = at('pigeons', 'demande');
  const a0 = at('pigeons', 'Avec');
  const a1 = at('pigeons', 'pigeons', 1) + 12;
  const n = Math.round(interpolate(frame, [a0, a1], [0, ANSWER.length], clamp));
  const t412 = at('pigeons', '412');
  return (
    <Scene
      gap={40}
      bottom={
        <Pop at={t412 + 10} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20}}>
          <Cross p={interpolate(frame, [t412 + 10, t412 + 20], [0, 1], clamp)} size={90} />
          <Mono size={52} color={RED}>thèse inventée</Mono>
        </Pop>
      }
    >
      <Bubble side="right" at={4}><Say size={56}>Résume la thèse de 1962 sur les pigeons voyageurs.</Say></Bubble>
      <div style={{alignSelf: 'flex-start', minHeight: 300, display: 'flex', alignItems: 'center'}}>
        {frame >= ask && frame < a0 ? <Dots /> : null}
        {frame >= a0 ? (
          <div style={{border: '4px solid #555', borderRadius: 34, padding: '24px 34px', maxWidth: 800}}>
            <Say size={58}>{ANSWER.slice(0, n)}</Say>
          </div>
        ) : null}
      </div>
    </Scene>
  );
};

// ---------- 6. Le QCM sans points négatifs, en trois temps calés sur la voix ----------
// a) le test : une question à 4 choix, et une erreur ne coûte rien (−1 barré, 0) ;
// b) les deux stratégies : « je ne sais pas » rapporte 0, deviner tombe parfois juste (+1) ;
// c) « donc ils apprennent à deviner » : deviner gagne, l'autre s'efface.

const OPTS = ['A', 'B', 'C', 'D'];
const RIGHT = 2;

const Options: React.FC<{size: number; lit?: number; ok?: boolean}> = ({size, lit = -1, ok = false}) => {
  const accent = useAccent();
  return (
    <div style={{display: 'flex', gap: size * 0.22}}>
      {OPTS.map((o, k) => {
        const on = k === lit;
        const col = on ? (ok ? accent : '#fff') : '#777';
        return (
          <div key={o} style={{width: size, height: size, border: `5px solid ${col}`, borderRadius: 14, background: on && ok ? withAlpha(accent, 0.25) : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Mono size={Math.max(48, size * 0.5)} color={on ? (ok ? accent : '#fff') : LABEL}>{o}</Mono>
          </div>
        );
      })}
    </div>
  );
};

const Qcm: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const tests = at('qcm', 'tests');
  const qcm = at('qcm', 'QCM');
  const neg = at('qcm', 'négatifs');
  const jns = at('qcm', 'Je');
  const zero = at('qcm', 'zéro');
  const dev = at('qcm', 'deviner', 0);
  const point = at('qcm', 'point', 1); // le premier « point » est dans « sans points négatifs »
  const donc = at('qcm', 'donc');

  if (frame < jns) {
    const strike = interpolate(frame, [neg + 8, neg + 16], [0, 1], clamp);
    return (
      <Scene gap={50}>
        <Pop at={qcm} style={{display: 'flex', justifyContent: 'center'}}><Big size={120} color="#fff">QCM</Big></Pop>
        <Pop at={4} style={{border: '5px solid #666', borderRadius: 30, padding: '34px 40px', display: 'flex', flexDirection: 'column', gap: 34}}>
          <Lines p={interpolate(frame, [4, tests + 14], [0, 1], clamp)} widths={[90, 62]} />
          <Options size={120} />
        </Pop>
        <Pop at={neg} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 36}}>
          <Mono size={56} color="#fff">erreur</Mono>
          <div style={{opacity: 1 - 0.55 * strike}}><Mono size={96} color={RED}>−1</Mono></div>
          <div style={{opacity: strike, display: 'flex', alignItems: 'center', gap: 36}}>
            <Mono size={72} color={LABEL}>→</Mono>
            <Mono size={96} color={accent}>0</Mono>
          </div>
        </Pop>
      </Scene>
    );
  }

  // Deviner : la sélection passe d'une case à l'autre, puis tombe sur la bonne quand la voix dit « point ».
  const rolling = frame >= dev && frame < point;
  const lit = frame < dev ? -1 : rolling ? Math.floor((frame - dev) / 3) % OPTS.length : RIGHT;
  const won = frame >= donc;
  const grow = interpolate(frame, [donc, donc + 10], [0, 1], clamp);
  const card = (dim: number, glow: number): React.CSSProperties => ({border: `5px solid ${glow > 0 ? accent : '#666'}`, borderRadius: 30, padding: '30px 36px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, opacity: 1 - 0.7 * dim, boxShadow: glow > 0 ? `0 0 ${40 * glow}px ${withAlpha(accent, 0.6)}` : 'none'});
  return (
    <Scene gap={50} bottom={<Pop at={dev} style={{display: 'flex', justifyContent: 'center'}}><Mono size={48} color={LABEL}>exemple illustratif</Mono></Pop>}>
      <Pop at={0} style={card(grow, 0)}>
        <Say size={64}>je ne sais pas</Say>
        <div style={{opacity: frame >= zero ? 1 : 0}}><Mono size={110} color="#fff">0</Mono></div>
      </Pop>
      <Pop at={dev} style={{...card(0, won ? grow : 0), transform: `scale(${1 + 0.06 * grow})`}}>
        <div style={{display: 'flex', flexDirection: 'column', gap: 24}}>
          <Say size={64} color={won ? accent : '#fff'}>deviner</Say>
          <Options size={80} lit={lit} ok={!rolling && lit === RIGHT} />
        </div>
        <div style={{opacity: frame >= point ? 1 : 0}}><Mono size={110} color={accent}>+1</Mono></div>
      </Pop>
    </Scene>
  );
};

// ---------- 7. Chute : clique sur chaque étude ; la troisième n'existe pas ----------

const REFS = [
  {ok: true, w: [92, 64]},
  {ok: true, w: [84, 70]},
  {ok: false, w: [96, 58]},
];

const Chute: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const clique = at('chute', 'clique');
  const tort = at('chute', 'tort');
  const clickAt = (k: number) => (k < 2 ? clique + 6 + k * 16 : tort - 6);
  const CARD = 150;
  const GAPC = 28;
  const target = REFS.reduce((acc, _, k) => acc + interpolate(frame, [clickAt(k) - 12, clickAt(k) - 2], [0, 1], {...clamp, easing: (t) => 1 - Math.pow(1 - t, 3)}), -1);
  const cy = Math.max(0, target) * (CARD + GAPC) + CARD / 2;
  const press = REFS.some((_, k) => frame >= clickAt(k) && frame < clickAt(k) + 4);
  return (
    <Scene>
      <div style={{position: 'relative', height: REFS.length * (CARD + GAPC)}}>
        {REFS.map((r, k) => {
          const opened = frame >= clickAt(k) + 4;
          const p = interpolate(frame, [clickAt(k) + 4, clickAt(k) + 12], [0, 1], clamp);
          return (
            <Pop key={k} at={4 + k * 5} style={{position: 'absolute', left: 0, right: 0, top: k * (CARD + GAPC), height: CARD, border: `5px solid ${opened ? (r.ok ? accent : RED) : '#666'}`, borderRadius: 22, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 26}}>
              <div style={{flex: 1}}><Lines p={1} widths={r.w} /></div>
              <div style={{width: 340, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 14, opacity: opened ? 1 : 0}}>
                <Mono size={48} color={r.ok ? accent : RED}>{r.ok ? 'trouvée' : 'introuvable'}</Mono>
                {r.ok ? <Check p={p} size={64} /> : <Cross p={p} size={64} />}
              </div>
            </Pop>
          );
        })}
        <svg width={70} height={90} viewBox="0 0 70 90" style={{position: 'absolute', left: 250, top: cy - 10, opacity: frame >= clique - 4 ? 1 : 0, transform: `scale(${press ? 0.85 : 1})`}}>
          <path d="M6 4 L6 70 L22 56 L34 84 L46 78 L34 52 L56 52 Z" fill="#fff" stroke="#000" strokeWidth={4} strokeLinejoin="round" />
        </svg>
      </div>
    </Scene>
  );
};

// ---------- Montage ----------

const SCENES: Record<string, React.FC> = {hook: Hook, intro: Intro, base: Base, nom: Nom, gilbert: Gilbert, pigeons: Pigeons, qcm: Qcm, chute: Chute};

export const HallucinationVoix: React.FC = () => <V.Montage scenes={SCENES} accent={FOND} />;

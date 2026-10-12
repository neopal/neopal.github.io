// Short Mythe « ChatGPT se trompe une fois sur trois » (YouTube / TikTok / Instagram), épisode 7, préparé le 2026-10-09.
// Fiche mythe-taux-d-erreur de lexique/terms.js ; sources dans voix/taux-d-erreur.script.json : la phrase dite au Sénat
// le 18 juin 2025 (compte rendu de la commission des affaires économiques), l'étude HKUST de février 2023 (634 exercices,
// 64,33 % ; bon sens 28/30, deux étapes 8/30), le classement Vectara du 22 septembre 2026 (1,8 % à 24,2 %).
// L'orateur est montré (portrait pixelisé, nom écrit) mais pas nommé à l'oral : la pique vise l'idée d'un taux unique.
// Portrait : public/voix/ia-n-existe-pas-julia.png (CESE, CC BY 3.0, via Wikimedia Commons) : créditer dans la description.
// Répond à l'épisode 6 (Température : « s'il se trompe, il se trompe pareil à chaque fois »).
// L'écran suit la voix (univers.md) : chaque élément entre sur le mot qui le nomme, chaque libellé reprend les mots dits.
// Le mouvement (univers.md) : easing partout sauf les comptes calés sur la voix, arcs pour ce qui vole, impact écrasé.
import React from 'react';
import {Easing, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Big, Check, Draw, Mono, Pop, Scene, W, arc, clamp, ease, squash, useAccent, withAlpha} from './kit';
import {LABEL, makeVoix} from './voix/VoixShort';
import {PATRON, Pixel} from './voix/Pixel';
import ALIGN from './voix/taux-d-erreur.align.json';
import SCRIPT from './voix/taux-d-erreur.script.json';

const AC = '#FF7A7A'; // catégorie Mythes vs réalité
const V = makeVoix(ALIGN, SCRIPT, 'voix/prediction-music.mp3');
const {at} = V;
export const MYTHETAUXVOIX_DURATION = V.duration;

const pixelShadow = (c: string) => `8px 8px 0 ${c}`;
const gone = (frame: number, until: number) => ease(frame, until, until + 6, [1, 0], 'inOut');
const rnd = (k: number) => {
  const x = Math.sin(k * 12.9898 + 4.1414) * 43758.5453;
  return x - Math.floor(x);
};

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

const Cross: React.FC<{p: number; size: number}> = ({p, size}) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <Draw d="M22 22 L78 78" p={Math.min(1, p * 2)} width={12} len={80} />
    <Draw d="M78 22 L22 78" p={Math.max(0, p * 2 - 1)} width={12} len={80} />
  </svg>
);

// Une jauge de 30 pastilles : `ok` réussies en blanc, les autres en couleur d'accent.
const Gauge: React.FC<{ok: number; p: number; dim?: boolean}> = ({ok, p, dim}) => {
  const accent = useAccent();
  return (
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(15, 1fr)', gap: 10, opacity: dim ? 0.4 : 1}}>
      {Array.from({length: 30}, (_, k) => {
        const on = k < p * 30;
        const good = k < ok;
        return <div key={k} style={{height: 46, border: `4px solid ${on ? (good ? '#fff' : accent) : '#444'}`, background: on ? (good ? '#fff' : withAlpha(accent, 0.3)) : 'transparent'}} />;
      })}
    </div>
  );
};

// ---------- 0. Hook : la phrase dite au Sénat, en grand, et celui qui l'a dite ----------

const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const pert = at('hook', 'pertinentes');
  const n64 = at('hook', '64');
  const n36 = at('hook', '36');
  const quoi = at('hook', 'quoi');
  const senat = at('hook', 'Sénat');
  // Le portrait se dessine rangée de pixels par rangée, quand la voix dit « Sénat ».
  const reveal = ease(frame, senat, senat + 16);
  return (
    <Scene>
      <div style={{position: 'relative', display: 'flex', flexDirection: 'column', gap: 6}}>
        <Stamp at={quoi + 10} size={96} tilt={-12} bg="rgba(0,0,0,0.6)" style={{right: 0, top: -150, zIndex: 2}}>FAUX</Stamp>
        <Pop at={0}><Big size={100}>« Ces IA sont</Big></Pop>
        <Pop at={Math.min(pert, n64 - 4)}><Big size={100}>pertinentes</Big></Pop>
        <Pop at={n64}><Big size={100} color={accent}>à 64 % »</Big></Pop>
        <div style={{marginTop: 40, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between'}}>
          <div style={{display: 'flex', flexDirection: 'column', gap: 8, paddingBottom: 10}}>
            <Pop at={n36}><Mono size={76} color={accent}>36 %</Mono></Pop>
            <Pop at={n36 + 6}><Mono size={52} color={LABEL}>n'importe quoi</Mono></Pop>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14}}>
            <Pop at={senat} style={{border: `6px solid ${accent}`, boxShadow: pixelShadow(withAlpha(accent, 0.35)), lineHeight: 0}}>
              <Img src={staticFile('voix/ia-n-existe-pas-julia.png')} style={{width: 168, height: 220, imageRendering: 'pixelated', clipPath: `inset(0 0 ${100 - (Math.floor(reveal * 63) / 63) * 100}% 0)`}} />
            </Pop>
            <Pop at={senat + 4}><Mono size={52} color="#fff">Luc Julia</Mono></Pop>
            <Pop at={senat + 8} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <Mono size={48} color={LABEL}>Sénat</Mono>
              <Mono size={48} color={LABEL}>juin 2025</Mono>
            </Pop>
          </div>
        </div>
      </div>
    </Scene>
  );
};

// ---------- 1. Une fois sur trois ? Le chiffre vient d'une étude de Hong Kong ----------

const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const trompe = at('intro', 'trompe');
  const trois = at('intro', 'trois');
  const etude = at('intro', 'étude');
  const hk = at('intro', 'Hong');
  return (
    <Scene>
      {/* L'idée reçue, dessinée telle qu'on l'entend : trois réponses, une fausse. */}
      {frame < etude + 6 ? (
        <div style={{display: 'flex', justifyContent: 'center', gap: 34, opacity: gone(frame, etude)}}>
          {[0, 1, 2].map((k) => (
            <Pop key={k} at={trompe + k * 4} style={{width: 240, height: 300, border: `6px solid ${k === 2 && frame >= trois ? accent : '#fff'}`, boxShadow: pixelShadow('#222'), display: 'flex', flexDirection: 'column', gap: 18, padding: 26, boxSizing: 'border-box', alignItems: 'center', justifyContent: 'center'}}>
              <div style={{height: 14, width: '90%', background: '#5a5a5a'}} />
              <div style={{height: 14, width: '70%', background: '#5a5a5a'}} />
              <div style={{height: 14, width: '80%', background: '#5a5a5a'}} />
              <div style={{lineHeight: 0, opacity: frame >= trois ? 1 : 0}}>
                {k === 2 ? <Cross p={ease(frame, trois + 4, trois + 16)} size={90} /> : <Check p={ease(frame, trois + k * 3, trois + k * 3 + 8)} size={90} color="#fff" />}
              </div>
            </Pop>
          ))}
        </div>
      ) : null}
      {/* L'étude d'où vient le chiffre : un article de recherche. */}
      {frame >= etude ? (
        <Pop at={etude} style={{alignSelf: 'center', width: 600, background: '#efe9dc', border: '8px solid #000', boxShadow: pixelShadow('#444'), padding: '34px 40px', display: 'flex', flexDirection: 'column', gap: 16}}>
          <div style={{opacity: frame >= hk ? 1 : 0}}><Mono size={52} color="#333">Hong Kong</Mono></div>
          {[92, 80, 86, 60, 88, 70].map((w, k) => <div key={k} style={{height: 14, width: `${w}%`, background: '#9a9384'}} />)}
        </Pop>
      ) : null}
    </Scene>
  );
};

// ---------- 2. L'étude : 634 exercices, 64 % de réussite en moyenne ----------

const N = 634;
const COLS = 32;

const Etude: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const y2023 = at('etude', '2023');
  const n634 = at('etude', '634');
  const reussi = at('etude', 'réussissait');
  const n64 = at('etude', '64');
  const moyenne = at('etude', 'moyenne');
  // La grille se pose dès l'entrée (le décor de la scène) et finit de se remplir sur « 634 ».
  const shown = ease(frame, 4, n634 + 12, [0, N], 'inOut');
  const lit = ease(frame, reussi, n64 + 6, [0, 1], 'inOut');
  return (
    <Scene
      gap={26}
      bottom={
        <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 22}}>
          <Pop at={n64}><Mono size={84} color={accent}>64 %</Mono></Pop>
          <Pop at={moyenne}><Mono size={52} color={LABEL}>en moyenne</Mono></Pop>
        </div>
      }
    >
      <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between'}}>
        <Pop at={n634} style={{display: 'flex', alignItems: 'baseline', gap: 18}}>
          <Mono size={64} color="#fff">634</Mono>
          <Mono size={52} color={LABEL}>exercices</Mono>
        </Pop>
        <Pop at={y2023}><Mono size={52} color={LABEL}>2023</Mono></Pop>
      </div>
      <div style={{display: 'grid', gridTemplateColumns: `repeat(${COLS}, 1fr)`, gap: 4, width: W}}>
        {Array.from({length: N}, (_, k) => {
          // Les réussites s'allument un peu partout (ordre pseudo-aléatoire stable), jusqu'à 64 %.
          const ok = rnd(k) < 0.64 * lit;
          return <div key={k} style={{height: 22, background: k < shown ? (ok ? '#fff' : '#3a3a3a') : 'transparent'}} />;
        })}
      </div>
    </Scene>
  );
};

// ---------- 3. Bon sens : la balle de paintball, 28 sur 30 ----------

const Paintball: React.FC<{size: number; p: number; sq: [number, number]}> = ({size, p, sq}) => {
  const accent = useAccent();
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{overflow: 'visible'}}>
      {/* La tache, qui gicle quand la voix dit « paintball ». */}
      {Array.from({length: 8}, (_, k) => {
        const a = (k / 8) * Math.PI * 2 + 0.3;
        const r = 30 + 26 * p * (0.6 + 0.4 * rnd(k));
        return <circle key={k} cx={50 + r * Math.cos(a)} cy={50 + r * Math.sin(a)} r={7 * p + 2 * rnd(k + 9)} fill={accent} opacity={p} />;
      })}
      {/* La balle s'écrase sur l'impact, à volume constant. */}
      <g transform={`translate(50 50) scale(${sq[0]} ${sq[1]}) translate(-50 -50)`}>
        <circle cx="50" cy="50" r="30" fill={accent} />
        <ellipse cx="40" cy="38" rx="10" ry="6" fill="#fff" opacity="0.6" />
      </g>
    </svg>
  );
};

const PaintballScene: React.FC = () => {
  const frame = useCurrentFrame();
  const sens = at('paintball', 'sens');
  const balle = at('paintball', 'balle');
  const paint = at('paintball', 'paintball');
  const reussi = at('paintball', 'réussissait');
  const n28 = at('paintball', '28');
  return (
    <Scene
      gap={44}
      bottom={
        <Pop at={n28} style={{display: 'flex', justifyContent: 'center'}}>
          <Mono size={84} color="#fff">28 sur 30</Mono>
        </Pop>
      }
    >
      <div style={{display: 'flex', alignItems: 'center', gap: 50, minHeight: 200}}>
        <Pop at={balle}><Paintball size={190} p={ease(frame, paint, paint + 10)} sq={squash(frame, paint, 0.22)} /></Pop>
        <Pop at={Math.max(2, sens - 6)}><Mono size={64} color="#fff">bon sens</Mono></Pop>
      </div>
      <Pop at={reussi - 6}>
        <Gauge ok={28} p={ease(frame, reussi, n28 + 6)} />
      </Pop>
    </Scene>
  );
};

// ---------- 4. Deux informations à enchaîner : 8 sur 30 ----------

const Enchaine: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const deux = at('enchaine', 'deux');
  const infos = at('enchaine', 'informations');
  const reussi = at('enchaine', 'réussissait');
  const n8 = at('enchaine', '8');
  const link = ease(frame, infos, infos + 14);
  return (
    <Scene
      gap={34}
      bottom={
        <Pop at={n8} style={{display: 'flex', justifyContent: 'center'}}>
          <Mono size={84} color={accent}>8 sur 30</Mono>
        </Pop>
      }
    >
      {/* Le score de bon sens reste en haut, en retrait : on compare. */}
      <Pop at={0} style={{display: 'flex', flexDirection: 'column', gap: 14}}>
        <Mono size={48} color={LABEL}>bon sens</Mono>
        <Gauge ok={28} p={1} dim />
      </Pop>
      {/* Deux fiches reliées : la réponse demande d'aller de l'une à l'autre. */}
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14}}>
        <div style={{display: 'flex', alignItems: 'center'}}>
          {[0, 1].map((k) => (
            <React.Fragment key={k}>
              <Pop at={deux + k * 5} style={{width: 220, height: 130, border: '6px solid #fff', padding: 22, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 14}}>
                <div style={{height: 14, width: '80%', background: '#9a9a9a'}} />
                <div style={{height: 14, width: '60%', background: '#9a9a9a'}} />
              </Pop>
              {k === 0 ? (
                <svg width={150} height={60} viewBox="0 0 150 60">
                  <Draw d="M10 30 L130 30 M110 12 L132 30 L110 48" p={link} width={8} len={200} color="#fff" />
                </svg>
              ) : null}
            </React.Fragment>
          ))}
        </div>
        <Pop at={infos}><Mono size={52} color={accent}>deux informations</Mono></Pop>
      </div>
      <Pop at={reussi - 6}>
        <Gauge ok={8} p={ease(frame, reussi, n8 + 6)} />
      </Pop>
    </Scene>
  );
};

// ---------- 5. L'image : le patron du bar, infaillible à l'expresso, à côté au quinté ----------

const Cup: React.FC<{size: number}> = ({size}) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <path d="M18 40 H74 V62 a20 20 0 0 1 -20 20 H38 a20 20 0 0 1 -20 -20 Z" fill="#fff" />
    <path d="M74 46 h8 a10 10 0 0 1 0 20 h-8" fill="none" stroke="#fff" strokeWidth="7" />
    <rect x="10" y="86" width="74" height="7" fill="#fff" />
    <path d="M36 30 q-6 -9 0 -18 M52 30 q-6 -9 0 -18" fill="none" stroke="#cfcfcf" strokeWidth="5" strokeLinecap="round" />
  </svg>
);

// Le ticket de quinté : dix paris, les ratés se barrent un à un pendant « neuf fois sur dix ».
const Ticket: React.FC<{misses: number}> = ({misses}) => {
  const accent = useAccent();
  const HIT = 6; // le seul pari gagné
  let seen = 0;
  return (
    <div style={{width: 360, background: '#efe9dc', border: '6px solid #000', boxShadow: pixelShadow('#444'), padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 12}}>
      <Mono size={48} color="#111">QUINTÉ</Mono>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8}}>
        {Array.from({length: 10}, (_, k) => {
          const miss = k !== HIT && seen++ < misses;
          return (
            <div key={k} style={{height: 52, border: '3px solid #555', background: miss ? withAlpha(accent, 0.25) : 'transparent', lineHeight: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              {miss ? <Cross p={1} size={48} /> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Comptoir: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const accent = useAccent();
  const patron = at('comptoir', 'patron');
  const infaillible = at('comptoir', 'infaillible');
  const expresso = at('comptoir', 'expressos');
  const quinte = at('comptoir', 'quinté');
  const neuf = at('comptoir', 'neuf');
  const dix = at('comptoir', 'dix');
  const moyenne = at('comptoir', 'moyenne');
  const sens = at('comptoir', 'sens');
  // « faire sa moyenne » : la tasse et le ticket glissent l'un vers l'autre et se fondent en une case « moyenne ».
  // Anticipation : elles reculent un peu avant de partir. Arcs : elles se rejoignent en passant par le haut.
  const back = interpolate(frame, [moyenne - 6, moyenne - 2, moyenne + 2], [0, -0.07, 0], clamp);
  const merge = spring({frame: frame - moyenne, fps, config: {damping: 16, stiffness: 140}}) + back;
  const merged = frame >= moyenne;
  const [cupX, cupY] = arc(merge, [30, 10], [290, 10], 60);
  const [tixX, tixY] = arc(merge, [0, 10], [250, 10], 60);
  return (
    <Scene gap={20}>
      {/* Le patron, derrière le zinc. */}
      <Pop at={patron} style={{display: 'flex', justifyContent: 'center', opacity: merged ? 0.5 : 1}}>
        <Pixel sprite={PATRON} px={17} seed={1} />
      </Pop>
      {/* Le zinc : le décor de la scène, posé dès l'entrée. */}
      <Pop at={2}><div style={{height: 22, background: '#b8b0a0'}} /></Pop>
      <div style={{position: 'relative', height: 300}}>
        <div style={{position: 'absolute', left: cupX, top: cupY, opacity: merged ? 1 - merge : 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10}}>
          <Pop at={expresso}><Cup size={150} /></Pop>
          <Pop at={expresso + 4} style={{display: 'flex', alignItems: 'center', gap: 4}}>
            <Check p={ease(frame, expresso + 4, expresso + 12)} size={60} color="#fff" />
            <Mono size={52} color="#fff">infaillible</Mono>
          </Pop>
        </div>
        <div style={{position: 'absolute', right: tixX, top: tixY, opacity: merged ? 1 - merge : 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10}}>
          <Pop at={quinte}><Ticket misses={Math.floor(interpolate(frame, [neuf, dix + 10], [0, 9], clamp))} /></Pop>
          <Pop at={neuf}><Mono size={52} color={accent}>neuf sur dix</Mono></Pop>
        </div>
        {/* La moyenne : une case qui ne dit rien de l'un ni de l'autre, barrée sur « aucun sens ». */}
        {merged ? (
          <Pop at={moyenne + 8} style={{position: 'absolute', left: 444 - 190, top: 30, width: 380, border: '6px dashed #fff', padding: '26px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6}}>
            <Mono size={56} color="#fff">moyenne</Mono>
            <div style={{position: 'absolute', left: -20, top: -20, lineHeight: 0, opacity: frame >= sens ? 1 : 0}}>
              <svg width={420} height={150} viewBox="0 0 420 150"><Draw d="M10 140 L410 10" p={ease(frame, sens, sens + 10)} width={12} len={440} color={accent} /></svg>
            </div>
          </Pop>
        ) : null}
      </div>
    </Scene>
  );
};

// ---------- 6. Les résumés en 2026 : de 1,8 % à 24 % selon le modèle ----------

// Barres schématiques entre les deux extrêmes publiés (1,8 % et 24,2 %), triées du meilleur au moins bon.
const BARS = Array.from({length: 12}, (_, k) => 1.8 + (24.2 - 1.8) * Math.pow(k / 11, 1.6));

const Resumes: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const y2026 = at('resumes', '2026');
  const modeles = at('resumes', 'modèles');
  const article = at('resumes', 'article');
  const absent = at('resumes', 'absent');
  const meilleur = at('resumes', 'meilleur');
  const n18 = at('resumes', '1,8');
  const moins = at('resumes', 'moins');
  const n24 = at('resumes', '24');
  const grow = interpolate(frame, [absent, n24 + 6], [0, 1], clamp);
  const max = 24.2;
  return (
    <Scene gap={14}>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, minHeight: 70}}>
        {/* L'article à résumer, puis ce qu'on mesure : le fait absent du texte. */}
        <Pop at={article} style={{display: 'flex', alignItems: 'center', gap: 16}}>
          <div style={{width: 52, height: 66, background: '#efe9dc', border: '4px solid #000', boxShadow: pixelShadow('#444')}} />
          <div style={{opacity: frame >= absent ? 1 : 0}}><Mono size={48} color={LABEL}>fait absent</Mono></div>
        </Pop>
        <Pop at={Math.max(2, y2026 - 4)}><Mono size={52} color={LABEL}>2026</Mono></Pop>
      </div>
      {BARS.map((v, k) => {
        const first = k === 0;
        const last = k === BARS.length - 1;
        // Les barres (les modèles) sont posées sur « modèles », puis s'allongent jusqu'à leur taux.
        const on = interpolate(grow, [(0.75 * k) / BARS.length, (0.75 * k) / BARS.length + 0.25], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
        return (
          <div key={k} style={{display: 'flex', alignItems: 'center', gap: 18, height: 30, opacity: frame >= modeles ? 1 : 0}}>
            <div style={{width: Math.max(10, (((W - 320) * v) / max) * on), height: 26, background: first && frame >= meilleur ? '#fff' : last && frame >= moins ? accent : '#555'}} />
            {first ? (
              <div style={{opacity: frame >= meilleur ? 1 : 0, display: 'flex', gap: 14}}>
                <Mono size={48} color={LABEL}>le meilleur</Mono>
                <div style={{opacity: frame >= n18 ? 1 : 0}}><Mono size={48} color="#fff">1,8 %</Mono></div>
              </div>
            ) : null}
            {last ? (
              <div style={{opacity: frame >= moins ? 1 : 0, display: 'flex', gap: 14}}>
                <div style={{opacity: frame >= n24 ? 1 : 0}}><Mono size={48} color={accent}>24 %</Mono></div>
              </div>
            ) : null}
          </div>
        );
      })}
    </Scene>
  );
};

// ---------- 7. Chute : ton taux, mesuré sur cinquante cas ----------

const Chute: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const taux = at('chute', 'taux');
  const tien = at('chute', 'tien');
  const cinquante = at('chute', 'cinquante');
  const connais = at('chute', 'connais');
  // Les cinquante cas se corrigent un à un pendant « dont tu connais déjà la réponse » ; quatre sont faux.
  const WRONG = [7, 19, 30, 44];
  const done = Math.floor(interpolate(frame, [connais, connais + 50], [0, 50], clamp));
  return (
    <Scene gap={30}>
      {/* « pas de taux d'erreur » : les deux jauges de l'étude, qui ne font pas un taux. */}
      {frame < tien + 6 ? (
        <div style={{display: 'flex', flexDirection: 'column', gap: 26, opacity: gone(frame, tien)}}>
          <Pop at={2}><Gauge ok={28} p={1} /></Pop>
          <Pop at={6}><Gauge ok={8} p={1} /></Pop>
          <Pop at={taux} style={{display: 'flex', justifyContent: 'center'}}><Mono size={64} color={accent}>taux d'erreur ?</Mono></Pop>
        </div>
      ) : null}
      {frame >= tien ? (
        <>
          <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between'}}>
            <Pop at={tien}><Mono size={64} color="#fff">le tien</Mono></Pop>
            <Pop at={cinquante}><Mono size={52} color={LABEL}>cinquante cas</Mono></Pop>
          </div>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: 12, opacity: frame >= cinquante ? 1 : 0}}>
            {Array.from({length: 50}, (_, k) => {
              const checked = k < done;
              const wrong = WRONG.includes(k);
              return (
                <div key={k} style={{height: 64, border: `4px solid ${checked ? (wrong ? accent : '#fff') : '#555'}`, background: checked && wrong ? withAlpha(accent, 0.35) : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  {checked && !wrong ? <div style={{width: 20, height: 20, background: '#fff'}} /> : null}
                </div>
              );
            })}
          </div>
        </>
      ) : null}
    </Scene>
  );
};

// ---------- Montage ----------

const SCENES: Record<string, React.FC> = {hook: Hook, intro: Intro, etude: Etude, paintball: PaintballScene, enchaine: Enchaine, comptoir: Comptoir, resumes: Resumes, chute: Chute};

export const MytheTauxVoix: React.FC = () => <V.Montage scenes={SCENES} accent={AC} />;

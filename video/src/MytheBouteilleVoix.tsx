// Short Mythe « Une question à ChatGPT, c'est une bouteille d'eau » (YouTube / TikTok / Instagram), épisode 33, préparé le
// 2026-11-09 (calage estimé, sans voix). Fiche mythe-bouteille-d-eau de lexique/terms.js ; sources dans
// voix/bouteille-d-eau.script.json : Washington Post du 18 septembre 2024 relayé par The Verge (519 mL pour un e-mail de
// 100 mots écrit par GPT-4) ; Li et al., Making AI Less « Thirsty » (l'essentiel de l'eau comptée vient des centrales) ;
// Google, 21 août 2025 (0,26 mL, environ cinq gouttes, eau des centres de données seulement, sans vérification par un
// tiers) ; Mistral AI, 22 juillet 2025 (45 mL par réponse, fabrication des serveurs comprise, relu par deux cabinets) ;
// Epoch AI, 7 février 2025 (0,3 Wh contre près de 40 Wh avec un très long document : plus de cent fois) ; AIE, 16 avril
// 2026 (électricité des centres de données +17 % en 2025, doublement attendu d'ici 2030).
// Fil : l'ép. 32 gardait l'IA chez soi ; ici, ce que coûte en eau une question posée en ligne.
// La phrase du hook n'est pas attribuée à l'oral (shorts mythe, univers.md) : le journal est nommé à la scène suivante.
// Aucun logo ni capture : le journal, la bouteille, la centrale et les serveurs sont dessinés (SVG maison).
// Écarts au storyboard, pour que l'écran ne dise que ce que dit la voix : pas de libellé « fabrication » sous l'usine ni
// d'étiquette « Agence internationale de l'énergie » ; le graphique de la scène total n'a aucune valeur sur l'axe, ses
// hauteurs suivent les rapports dits (+17 %, puis le double).
// L'écran suit la voix (univers.md) : chaque élément entre sur le mot qui le nomme, at('scène', 'mot'), jamais en secondes.
// Le mouvement : ease partout, arcs pour ce qui vole (l'eau vers la centrale, les verres vers la bouteille), squash au seul
// tampon, un seul punch zoom (« 11 », scène bouteille), aucun sur le hook.
import React from 'react';
import {useCurrentFrame} from 'remotion';
import {Big, Check, Draw, Mono, Pop, Scene, W, arc, countUp, ease, punch, typed, useAccent, withAlpha} from './kit';
import {LABEL, makeVoix} from './voix/VoixShort';
import {Cross, Doc, Msg, Stamp, pixelShadow} from './voix/Parts';
import ALIGN from './voix/bouteille-d-eau.align.json';
import SCRIPT from './voix/bouteille-d-eau.script.json';

const AC = '#FF7A7A'; // catégorie Mythes vs réalité
const V = makeVoix(ALIGN, SCRIPT, 'voix/prediction-music.mp3');
const {at} = V;
export const MYTHEBOUTEILLEVOIX_DURATION = V.duration;

// Sortie : 6 images en inOut (plus rapide que l'entrée Pop).
const gone = (frame: number, until: number) => ease(frame, until, until + 6, [1, 0], 'inOut');
const WATER = '#5ab4e8';
const TAPE = 'rgba(239,233,220,0.85)';

// ---------- Objets dessinés (SVG maison) ----------

// La bouteille d'un demi-litre : bouchon, goulot, corps à côtes ; `level` de 0 à 1 (l'eau monte du fond).
const Bouteille: React.FC<{w: number; level?: number}> = ({w, level = 0}) => {
  const top = 246 - 176 * Math.max(0, Math.min(1, level));
  return (
    <svg width={w} height={(w * 260) / 100} viewBox="0 0 100 260" style={{display: 'block', overflow: 'visible'}}>
      <rect x="34" y="0" width="32" height="20" rx="3" fill="#3a7bd5" />
      <rect x="31" y="20" width="38" height="6" fill="#2d62ac" />
      <path d="M36 26 L36 40 Q12 54 12 82 L12 238 Q12 252 26 252 L74 252 Q88 252 88 238 L88 82 Q88 54 64 40 L64 26 Z" fill="rgba(220,235,245,0.12)" stroke="#e6eef3" strokeWidth="4" />
      {level > 0.001 ? <path d={`M16 ${Math.max(top, 74)} L84 ${Math.max(top, 74)} L84 238 Q84 248 74 248 L26 248 Q16 248 16 238 Z`} fill={WATER} opacity={0.9} /> : null}
      {[110, 170].map((y) => <path key={y} d={`M12 ${y} H88`} stroke="#e6eef3" strokeWidth="3" opacity="0.6" />)}
    </svg>
  );
};

// Un verre droit ; `level` de 0 à 1.
const Verre: React.FC<{w: number; level?: number}> = ({w, level = 0}) => {
  const top = 92 - 80 * Math.max(0, Math.min(1, level));
  return (
    <svg width={w} height={w} viewBox="0 0 100 100" style={{display: 'block', overflow: 'visible'}}>
      {level > 0.001 ? <path d={`M${14 + (top - 8) * 0.08} ${top} L${86 - (top - 8) * 0.08} ${top} L78 92 L22 92 Z`} fill={WATER} opacity={0.9} /> : null}
      <path d="M12 6 L22 94 L78 94 L88 6" fill="none" stroke="#e6eef3" strokeWidth="5" strokeLinejoin="round" />
    </svg>
  );
};

// Une goutte.
const Goutte: React.FC<{w: number}> = ({w}) => (
  <svg width={w} height={w * 1.3} viewBox="0 0 20 26" style={{display: 'block'}}>
    <path d="M10 1 C 10 1, 1 12, 1 17 A9 9 0 0 0 19 17 C 19 12, 10 1, 10 1 Z" fill={WATER} />
  </svg>
);

// La tour de refroidissement d'une centrale : silhouette hyperbolique ; `steam` de 0 à 1 fait monter le panache.
const Tour: React.FC<{w: number; steam?: number; grey?: boolean}> = ({w, steam = 0, grey}) => {
  const frame = useCurrentFrame();
  return (
    <svg width={w} height={w * 1.3} viewBox="0 0 200 260" style={{display: 'block', overflow: 'visible'}}>
      {steam > 0
        ? [0, 1, 2, 3].map((k) => {
            const u = ((frame / 40 + k / 4) % 1) * steam;
            return <circle key={k} cx={100 + 18 * Math.sin(k * 2 + frame / 20)} cy={70 - 150 * u} r={30 + 40 * u} fill="#e8e8e8" opacity={(0.7 - 0.6 * u) * steam} />;
          })
        : null}
      <path d="M40 80 Q70 160 30 250 L170 250 Q130 160 160 80 Z" fill={grey ? '#555' : '#bfc5c9'} stroke={grey ? '#777' : '#fff'} strokeWidth="5" />
      <path d="M58 96 H142" stroke={grey ? '#666' : '#9aa1a5'} strokeWidth="6" />
    </svg>
  );
};

// La baie de serveurs : un caisson, des tiroirs, des diodes qui clignotent.
const Baie: React.FC<{w: number}> = ({w}) => {
  const frame = useCurrentFrame();
  return (
    <svg width={w} height={w * 1.6} viewBox="0 0 100 160" style={{display: 'block'}}>
      <rect x="4" y="4" width="92" height="152" fill="#222" stroke="#cfcfcf" strokeWidth="5" />
      {[0, 1, 2, 3, 4].map((k) => (
        <React.Fragment key={k}>
          <rect x="14" y={16 + 27 * k} width="72" height="18" fill="#3a3a3a" />
          <rect x="72" y={22 + 27 * k} width="7" height="6" fill={(frame + 7 * k) % 24 < 14 ? '#4CD964' : '#2a5a3a'} />
        </React.Fragment>
      ))}
    </svg>
  );
};

// Une enveloppe.
const Enveloppe: React.FC<{w: number}> = ({w}) => (
  <svg width={w} height={w * 0.66} viewBox="0 0 150 100" style={{display: 'block'}}>
    <rect x="4" y="4" width="142" height="92" fill="#efe9dc" stroke="#000" strokeWidth="5" />
    <path d="M4 4 L75 58 L146 4" fill="none" stroke="#000" strokeWidth="5" strokeLinejoin="round" />
  </svg>
);

// Une page de journal : une manchette en barres épaisses, une photo grise, des colonnes de traits ; pas de logo.
const Journal: React.FC<{w: number}> = ({w}) => (
  <div style={{width: w, background: '#efe9dc', border: '6px solid #000', boxShadow: pixelShadow('#444'), padding: w / 14, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: w / 26}}>
    <div style={{height: w / 12, width: '100%', background: '#111'}} />
    <div style={{height: 4, width: '100%', background: '#111'}} />
    <div style={{height: w / 18, width: '86%', background: '#333'}} />
    <div style={{display: 'flex', gap: w / 22}}>
      <div style={{flex: 1, height: w * 0.36, background: '#9a9384'}} />
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: w / 30}}>
        {[90, 70, 84, 64, 80, 72].map((p, k) => <div key={k} style={{height: w / 34, width: `${p}%`, background: '#9a9384'}} />)}
      </div>
    </div>
    {[94, 78, 88].map((p, k) => <div key={k} style={{height: w / 34, width: `${p}%`, background: '#9a9384'}} />)}
  </div>
);

// Une usine : toit en dents de scie, cheminée.
const Usine: React.FC<{w: number}> = ({w}) => (
  <svg width={w} height={w * 0.8} viewBox="0 0 200 160" style={{display: 'block'}}>
    <rect x="140" y="10" width="26" height="80" fill="#8a8a8a" stroke="#fff" strokeWidth="4" />
    <path d="M10 150 L10 70 L55 40 L55 70 L100 40 L100 70 L145 40 L145 70 L190 70 L190 150 Z" fill="#4a4a4a" stroke="#fff" strokeWidth="5" strokeLinejoin="round" />
    {[30, 80, 130].map((x) => <rect key={x} x={x} y="95" width="28" height="24" fill="#e0c060" />)}
  </svg>
);

// Une loupe.
const Loupe: React.FC<{w: number}> = ({w}) => (
  <svg width={w} height={w} viewBox="0 0 100 100" style={{display: 'block'}}>
    <circle cx="40" cy="40" r="28" fill="rgba(255,255,255,0.08)" stroke="#e6eef3" strokeWidth="8" />
    <path d="M61 61 L90 90" stroke="#e6eef3" strokeWidth="12" strokeLinecap="round" />
  </svg>
);

// Un petit téléphone, la bouteille à l'écran (la phrase qui circule).
const Phone: React.FC<{w: number}> = ({w}) => (
  <div style={{width: w, height: w * 1.8, background: '#161616', border: '6px solid #cfcfcf', borderRadius: w / 7, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: pixelShadow('#2a2a2a')}}>
    <Bouteille w={w * 0.4} level={1} />
  </div>
);

// Le scotch d'un collage.
const Scotch: React.FC<{left: number; top: number; rot: number}> = ({left, top, rot}) => (
  <div style={{position: 'absolute', left, top, width: 84, height: 26, background: TAPE, transform: `rotate(${rot}deg)`}} />
);

// ---------- 0. Hook : la phrase à la machine, le tampon FAUX, la bouteille collée au scotch ----------

const L1 = '« Une question';
const L2 = 'à ChatGPT, c’est';
const L3 = 'une bouteille';
const L4 = 'd’eau »';
const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const chatgpt = at('hook', 'ChatGPT');
  const bouteille = at('hook', 'bouteille');
  const eau = at('hook', "d'eau");
  const fin = at('hook', '»');
  const reseaux = at('hook', 'réseaux');
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 640}}>
        {/* Typewriter : la phrase du mythe s'écrit sur la voix, une ligne par groupe de mots. */}
        <div style={{position: 'absolute', left: 0, top: -480, display: 'flex', flexDirection: 'column', gap: 4}}>
          <Big size={92}>{typed(frame, 0, L1, 40) || ' '}</Big>
          <Big size={92}>{typed(frame, chatgpt - 6, L2, 40) || ' '}</Big>
          <Big size={92}>{typed(frame, bouteille - 6, L3, 40) || ' '}</Big>
          <Big size={92}>{typed(frame, eau - 2, L4, 40) || ' '}</Big>
        </div>
        {/* Tampon FAUX juste après la citation (squash à l'impact), jusqu'à la fin du hook : l'image de couverture. */}
        <Stamp at={fin + 4} size={96} tilt={-12} bg="rgba(0,0,0,0.6)" style={{right: -20, top: -250, zIndex: 30}}>FAUX</Stamp>
        {/* Décor dès la première image : la bouteille collée de travers, une bulle de chat à côté. */}
        <div style={{position: 'absolute', left: 30, top: 60, transform: 'rotate(-4deg)'}}>
          <Bouteille w={190} level={1} />
          <Scotch left={-30} top={-6} rot={-30} />
          <Scotch left={140} top={-6} rot={30} />
        </div>
        <Pop at={2} style={{position: 'absolute', left: 250, top: 90, display: 'flex', flexDirection: 'column', width: 280}}>
          <Msg w={280} right />
        </Pop>
        {/* « réseaux » : la même bouteille sur trois téléphones, en cascade. */}
        {[0, 1, 2].map((k) => (
          <Pop key={k} at={reseaux + 3 * k} style={{position: 'absolute', left: 290 + 190 * k, top: 300 - 40 * k}}>
            <div style={{transform: `rotate(${[-6, 3, 8][k]}deg)`}}><Phone w={150} /></div>
          </Pop>
        ))}
      </div>
    </Scene>
  );
};

// ---------- 1. Origine : le journal, l'e-mail de 100 mots, la bouteille qui se remplit jusqu'à 519 mL ----------

const Origine: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const washington = at('origine', 'Washington');
  const septembre = at('origine', 'septembre');
  const email = at('origine', 'e-mail');
  const n100 = at('origine', '100');
  const demande = at('origine', 'demande');
  const n519 = at('origine', '519');
  const eau = at('origine', "d'eau");
  // Count-up calé sur la voix : 0 -> 519 de « 519 » à « d'eau » ; la bouteille monte en même temps (519 / 500 : pleine).
  const v = countUp(frame, n519, 519, Math.max(10, eau - n519 + 6));
  const level = ease(frame, n519, n519 + Math.max(10, eau - n519 + 6));
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 720}}>
        {/* Décor dès l'entrée : la page de journal, posée de travers. */}
        <Pop at={2} style={{position: 'absolute', left: 0, top: 120, transform: 'rotate(-2deg)'}}><Journal w={380} /></Pop>
        <Pop at={washington} style={{position: 'absolute', left: 0, top: 0}}><Mono size={60} color="#fff">Washington Post</Mono></Pop>
        <Pop at={septembre} style={{position: 'absolute', left: 0, top: 640}}><Mono size={52} color={LABEL}>septembre 2024</Mono></Pop>
        {/* « e-mail de 100 mots » : l'enveloppe, puis son libellé. */}
        <Pop at={email} style={{position: 'absolute', left: 470, top: 130}}><Enveloppe w={230} /></Pop>
        <Pop at={n100 + 4} style={{position: 'absolute', left: 470, top: 300}}><Mono size={52} color="#fff">100 mots</Mono></Pop>
        {/* « demande 519 millilitres d'eau » : la bouteille vide arrive, se remplit pendant le compte. */}
        <Pop at={demande} style={{position: 'absolute', left: 740, top: 150}}><Bouteille w={140} level={level} /></Pop>
        <div style={{position: 'absolute', left: 470, top: 420, opacity: frame >= n519 ? 1 : 0}}>
          <Mono size={96} color={accent}>{v} mL</Mono>
        </div>
      </div>
    </Scene>
  );
};

// ---------- 2. Centrales : l'eau part surtout vers la tour de refroidissement, un filet vers les serveurs ----------

const BOT = {x: 370, y: 110, w: 150};
const Centrales: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const serveurs = at('centrales', 'serveurs');
  const evapore = at('centrales', "s'évapore");
  const centrales = at('centrales', 'centrales');
  const alimentent = at('centrales', 'alimentent');
  // « serveurs » : un filet d'eau (draw-on) part vers la baie ; « s'évapore » : la bouteille se vide vers la gauche, en
  // gouttes qui volent en arc jusqu'à la tour (elle arrive sur « centrales »).
  const trickle = ease(frame, serveurs + 4, serveurs + 16);
  const drain = ease(frame, evapore, alimentent + 10, [0, 1], 'inOut');
  const level = 1 - 0.85 * drain - 0.05 * trickle;
  const mouth: [number, number] = [BOT.x + BOT.w / 2, BOT.y + 20];
  const tower: [number, number] = [150, 260];
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 720}}>
        {/* Décor dès l'entrée : la bouteille pleine des 519 mL. */}
        <Pop at={2} style={{position: 'absolute', left: BOT.x, top: BOT.y}}><Bouteille w={BOT.w} level={level} /></Pop>
        {/* Le compte de la scène précédente reste lisible sous la bouteille jusqu'à ce qu'elle se vide. */}
        {frame < evapore + 6 ? (
          <div style={{position: 'absolute', left: BOT.x - 60, width: BOT.w + 120, top: BOT.y + 410, display: 'flex', justifyContent: 'center', opacity: gone(frame, evapore)}}>
            <Mono size={72} color={accent}>519 mL</Mono>
          </div>
        ) : null}
        <Pop at={serveurs} style={{position: 'absolute', left: 700, top: 230}}><Baie w={170} /></Pop>
        <Pop at={serveurs + 5} style={{position: 'absolute', left: 660, top: 520}}><Mono size={52} color="#fff">serveurs</Mono></Pop>
        <svg width={W} height={720} viewBox={`0 0 ${W} 720`} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
          <Draw d={`M${BOT.x + BOT.w - 10} 420 Q 640 440 700 400`} p={trickle} width={6} len={360} color={WATER} />
        </svg>
        <Pop at={centrales} style={{position: 'absolute', left: 0, top: 160}}><Tour w={300} steam={ease(frame, centrales + 4, centrales + 30)} /></Pop>
        <Pop at={centrales + 5} style={{position: 'absolute', left: 10, top: 560}}><Mono size={52} color={accent}>centrales</Mono></Pop>
        {/* L'eau qui vole en arc vers la tour : six gouttes décalées. */}
        {drain > 0 && drain < 1
          ? [0, 1, 2, 3, 4, 5].map((k) => {
              const u = (drain * 3 + k / 6) % 1;
              const [x, y] = arc(u, mouth, tower, 110);
              return (
                <div key={k} style={{position: 'absolute', left: x - 14, top: y - 18, opacity: Math.min(1, (1 - u) * 3)}}>
                  <Goutte w={28} />
                </div>
              );
            })
          : null}
      </div>
    </Scene>
  );
};

// ---------- 3. Labos : Google, 0,26 mL, cinq gouttes ; seulement ses centres de données, sans vérification ----------

const Labos: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const y2025 = at('labos', '2025');
  const google = at('labos', 'Google');
  const n026 = at('labos', '0,26');
  const cinq = at('labos', 'cinq');
  const centres = at('labos', 'centres');
  const verif = at('labos', 'vérification');
  // « cinq gouttes » : cinq gouttes tombent dans le verre, en cascade ; le verre en garde une trace.
  const drops = [0, 1, 2, 3, 4].map((k) => cinq + 4 * k);
  const fallen = drops.filter((d) => frame >= d + 10).length;
  // « centres de données » : le haut de la scène passe en retrait.
  const dim = frame >= centres ? ease(frame, centres, centres + 8, [1, 0.35]) : 1;
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 760}}>
        {/* Décor dès l'entrée : le verre vide. */}
        <div style={{opacity: dim}}>
          <Pop at={2} style={{position: 'absolute', left: 600, top: 120}}><Verre w={200} level={0.03 * fallen} /></Pop>
          <Pop at={y2025} style={{position: 'absolute', left: 0, top: 0}}><Mono size={60} color={LABEL}>2025</Mono></Pop>
          <Pop at={google} style={{position: 'absolute', left: 0, top: 90}}><Mono size={72} color="#fff">Google</Mono></Pop>
          <Pop at={n026} style={{position: 'absolute', left: 0, top: 190}}><Mono size={96} color={accent}>0,26 mL</Mono></Pop>
          {drops.map((d, k) =>
            frame >= d && frame < d + 10 ? (
              <div key={k} style={{position: 'absolute', left: 688, top: ease(frame, d, d + 10, [-40, 230], 'inOut')}}>
                <Goutte w={26} />
              </div>
            ) : null,
          )}
        </div>
        {/* « ses centres de données » : un cadre pointillé autour de la seule baie ; la tour reste dehors, grisée. */}
        <Pop at={centres} style={{position: 'absolute', left: 0, top: 400}}><Tour w={170} grey /></Pop>
        <Pop at={centres + 3} style={{position: 'absolute', left: 230, top: 380, width: 230, height: 330, border: `6px dashed ${accent}`, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Baie w={130} />
        </Pop>
        {/* « sans vérification extérieure » : la loupe, barrée, et son libellé. */}
        <Pop at={verif} style={{position: 'absolute', left: 620, top: 430}}>
          <div style={{position: 'relative', width: 180, height: 180}}>
            <Loupe w={180} />
            <div style={{position: 'absolute', left: 0, top: 0}}><Cross p={ease(frame, verif + 6, verif + 16)} size={180} color="#FF4D4D" /></div>
          </div>
        </Pop>
        <Pop at={verif + 5} style={{position: 'absolute', right: 0, top: 730}}><Mono size={48} color="#fff">sans vérification</Mono></Pop>
      </div>
    </Scene>
  );
};

// ---------- 4. Mistral : de l'usine à la réponse, deux relectures, 45 mL ----------

const Mistral: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const mistral = at('mistral', 'Mistral');
  const fabrication = at('mistral', 'fabrication');
  const serveurs = at('mistral', 'serveurs');
  const cabinets = at('mistral', 'cabinets');
  const n45 = at('mistral', '45');
  const reponse = at('mistral', 'réponse');
  const v = countUp(frame, n45, 45, 24);
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 740}}>
        <Pop at={mistral} style={{position: 'absolute', left: 0, top: 0}}><Mono size={72} color="#fff">Mistral</Mono></Pop>
        {/* La chaîne, dans l'ordre de lecture : l'usine, la baie, la réponse ; une flèche se dessine entre chaque. */}
        <Pop at={fabrication} style={{position: 'absolute', left: 0, top: 130}}><Usine w={220} /></Pop>
        <Pop at={serveurs} style={{position: 'absolute', left: 340, top: 100}}><Baie w={130} /></Pop>
        <Pop at={reponse} style={{position: 'absolute', left: 600, top: 170, display: 'flex', flexDirection: 'column', width: 280}}><Msg w={280} /></Pop>
        <svg width={W} height={740} viewBox={`0 0 ${W} 740`} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
          <Draw d="M236 230 H322 M300 210 L322 230 L300 250" p={ease(frame, serveurs - 4, serveurs + 6)} width={8} len={160} color="#cfcfcf" />
          <Draw d="M486 230 H582 M560 210 L582 230 L560 250" p={ease(frame, reponse - 4, reponse + 6)} width={8} len={160} color="#cfcfcf" />
        </svg>
        {/* « deux cabinets » : deux feuilles cochées tombent en cascade. */}
        {[0, 1].map((k) => (
          <Pop key={k} at={cabinets + 3 * k} style={{position: 'absolute', left: 20 + 170 * k, top: 420 + 20 * k, transform: `rotate(${k ? 4 : -4}deg)`}}>
            <div style={{position: 'relative'}}>
              <Doc w={170} lines={4} />
              <div style={{position: 'absolute', right: -30, bottom: -30}}><Check p={ease(frame, cabinets + 3 * k + 6, cabinets + 3 * k + 16)} size={110} color="#4CD964" /></div>
            </div>
          </Pop>
        ))}
        {/* « 45 millilitres » : le verre se remplit pendant le compte. */}
        <Pop at={n45} style={{position: 'absolute', left: 700, top: 400}}><Verre w={170} level={ease(frame, n45, n45 + 24) * 0.75} /></Pop>
        <div style={{position: 'absolute', left: 440, top: 600, opacity: frame >= n45 ? 1 : 0}}>
          <Mono size={96} color={accent}>{v} mL</Mono>
        </div>
      </div>
    </Scene>
  );
};

// ---------- 5. Bouteille : deux bouteilles à remplir, près de 2 000 questions contre 11 verres ----------

const LB = {x: 40, y: 130, w: 170};
const RB = {x: 660, y: 130, w: 170};
const GLASS = 56;
const glassPos = (k: number): [number, number] => [300 + (k % 4) * 78, 150 + Math.floor(k / 4) * 96];

const Remplir: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const mille = at('bouteille', 'mille');
  const google = at('bouteille', 'Google');
  const onze = at('bouteille', 'onze');
  const mistral = at('bouteille', 'Mistral');
  // Gauche : « deux mille » : la bouteille se remplit goutte à goutte (compte linéaire calé sur la voix).
  const nQ = Math.round(2000 * Math.max(0, Math.min(1, (frame - mille) / Math.max(20, google - mille + 10))));
  const leftLevel = nQ / 2000;
  // Droite : « onze » : les onze verres volent en arc vers la bouteille, en cascade (3 images d'écart).
  const pours = Array.from({length: 11}, (_, k) => onze + 3 * k);
  const poured = pours.filter((p) => frame >= p + 10).length;
  const lastPour = pours[10] + 10;
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 760}}>
        {/* Décor dès l'entrée : les deux bouteilles vides, les onze petits verres pleins au milieu. */}
        <Pop at={2} style={{position: 'absolute', left: LB.x, top: LB.y}}><Bouteille w={LB.w} level={leftLevel} /></Pop>
        <Pop at={2} style={{position: 'absolute', left: RB.x, top: RB.y}}><Bouteille w={RB.w} level={poured / 11} /></Pop>
        {pours.map((p, k) => {
          const [gx, gy] = glassPos(k);
          if (frame >= p + 10) return null;
          const u = ease(frame, p, p + 10, [0, 1], 'inOut');
          const [x, y] = arc(u, [gx, gy], [RB.x + RB.w / 2 - GLASS / 2, RB.y - 20], 60);
          return (
            <div key={k} style={{position: 'absolute', left: x, top: y, opacity: frame >= 4 ? 1 - 0.6 * u : 0, transform: `rotate(${80 * u}deg)`}}>
              <Verre w={GLASS} level={0.8} />
            </div>
          );
        })}
        <Pop at={google} style={{position: 'absolute', left: LB.x, top: 0}}><Mono size={60} color="#fff">Google</Mono></Pop>
        <Pop at={mistral} style={{position: 'absolute', left: RB.x - 40, top: 0}}><Mono size={60} color="#fff">Mistral</Mono></Pop>
        <div style={{position: 'absolute', left: 0, top: 600, width: 260, display: 'flex', justifyContent: 'center', opacity: frame >= mille ? 1 : 0}}>
          <Mono size={96} color="#fff">{nQ.toLocaleString('fr-FR').replace(/ | /g, ' ')}</Mono>
        </div>
        {/* Le seul punch zoom du short, sur « 11 », quand le dernier verre est versé. */}
        <div style={{position: 'absolute', left: RB.x - 40, top: 600, width: 260, display: 'flex', justifyContent: 'center', opacity: frame >= onze ? 1 : 0, transform: `scale(${punch(frame, lastPour)})`}}>
          <Mono size={96} color={accent}>{poured}</Mono>
        </div>
      </div>
    </Scene>
  );
};

// ---------- 6. Vrai : la barre d'un très long document contre celle d'une question simple ----------

const BASE = 640;
const Vrai: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const doc = at('vrai', 'document');
  const cent = at('vrai', 'cent');
  const energie = at('vrai', "l'énergie");
  const simple = at('vrai', 'simple');
  const bigH = ease(frame, cent, cent + 24, [0, 520]);
  const unroll = ease(frame, doc, doc + 20);
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 760}}>
        {/* Décor dès l'entrée : la ligne de base. */}
        <Pop at={2} style={{position: 'absolute', left: 0, top: BASE, width: W, height: 6, background: '#777'}}><span /></Pop>
        {/* Décor dès l'entrée : le rouleau fermé ; « document » : il se déroule (mask reveal vers le bas). */}
        <Pop at={2} style={{position: 'absolute', left: 700, top: 60}}>
          <div style={{position: 'relative', width: 170}}>
            <div style={{width: 170, height: 34, background: '#d8d0bf', border: '5px solid #000', borderRadius: 17, boxSizing: 'border-box'}} />
            <div style={{width: 150, marginLeft: 10, height: 520 * unroll, overflow: 'hidden', background: '#efe9dc', borderLeft: '4px solid #000', borderRight: '4px solid #000', boxSizing: 'border-box', padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 12}}>
              {Array.from({length: 22}, (_, k) => <div key={k} style={{flex: 'none', height: 8, width: `${[90, 70, 84, 62, 78][k % 5]}%`, background: '#9a9384'}} />)}
            </div>
          </div>
        </Pop>
        {/* « plus de cent fois » : la barre du document monte (bar grow) ; « l'énergie » : son libellé. */}
        <div style={{position: 'absolute', left: 470, top: BASE - bigH, width: 170, height: bigH, background: accent}} />
        <Pop at={cent + 4} style={{position: 'absolute', left: 100, top: 30}}><Mono size={60} color={accent}>plus de 100 fois</Mono></Pop>
        <Pop at={energie} style={{position: 'absolute', left: 470, top: BASE + 20}}><Mono size={52} color="#fff">énergie</Mono></Pop>
        {/* « une question simple » : la petite bulle, sa barre minuscule, son libellé. */}
        <Pop at={simple} style={{position: 'absolute', left: 0, top: 380, display: 'flex', flexDirection: 'column', width: 260}}><Msg w={260} right /></Pop>
        <div style={{position: 'absolute', left: 60, top: BASE - 6 * ease(frame, simple, simple + 8), width: 140, height: 6 * ease(frame, simple, simple + 8), background: '#fff'}} />
        <Pop at={simple + 5} style={{position: 'absolute', left: 0, top: BASE + 20}}><Mono size={48} color={LABEL}>question simple</Mono></Pop>
      </div>
    </Scene>
  );
};

// ---------- 7. Total : 2024, 2025 (+17 %), 2030 (le double) ----------

const TB = {base: 660, w: 200, xs: [40, 344, 648], h2024: 230};
const Total: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const grimpe = at('total', 'grimpe');
  const y2025 = at('total', '2025');
  const n17 = at('total', '17');
  const doubler = at('total', 'doubler');
  const y2030 = at('total', '2030');
  const h2025 = TB.h2024 * 1.17;
  const b25 = ease(frame, y2025, y2025 + 16, [0, h2025]);
  const b30 = ease(frame, doubler, doubler + 24, [0, 2 * h2025]);
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 780}}>
        {/* Décor dès l'entrée : l'axe et la barre grise de 2024. */}
        <Pop at={2} style={{position: 'absolute', left: 0, top: TB.base, width: W, height: 6, background: '#fff'}}><span /></Pop>
        <Pop at={2} style={{position: 'absolute', left: TB.xs[0], top: TB.base - TB.h2024, width: TB.w, height: TB.h2024, background: '#6a6a6a'}}><span /></Pop>
        <Pop at={4} style={{position: 'absolute', left: TB.xs[0] + 30, top: TB.base + 20}}><Mono size={52} color={LABEL}>2024</Mono></Pop>
        {/* « grimpe » : une flèche monte au-dessus des barres (draw-on). */}
        <svg width={W} height={780} viewBox={`0 0 ${W} 780`} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
          <Draw d="M60 330 Q 300 280 560 60" p={ease(frame, grimpe, grimpe + 18)} width={8} len={620} color="#cfcfcf" />
          <Draw d="M520 66 L560 60 L556 100" p={ease(frame, grimpe + 14, grimpe + 22)} width={8} len={90} color="#cfcfcf" />
        </svg>
        {/* « En 2025 » : la barre monte (bar grow) ; « 17 % » : son libellé. */}
        <div style={{position: 'absolute', left: TB.xs[1], top: TB.base - b25, width: TB.w, height: b25, background: '#cfcfcf'}} />
        <Pop at={y2025 + 4} style={{position: 'absolute', left: TB.xs[1] + 30, top: TB.base + 20}}><Mono size={52} color="#fff">2025</Mono></Pop>
        <Pop at={n17} style={{position: 'absolute', left: TB.xs[1] + 10, top: TB.base - h2025 - 90}}><Mono size={64} color={accent}>+17 %</Mono></Pop>
        {/* « doubler d'ici 2030 » : une barre en pointillés monte au double. */}
        <div style={{position: 'absolute', left: TB.xs[2], top: TB.base - b30, width: TB.w, height: b30, border: frame >= doubler ? `6px dashed ${accent}` : 'none', background: withAlpha(accent, 0.18), boxSizing: 'border-box'}} />
        <Pop at={y2030} style={{position: 'absolute', left: TB.xs[2] + 30, top: TB.base + 20}}><Mono size={52} color={accent}>2030</Mono></Pop>
      </div>
    </Scene>
  );
};

// ---------- 8. Chute : une goutte, puis la pluie de questions, puis les bouteilles qui s'alignent ----------

const CB = {x: 344, y: 40, w: 200};
const Chute: React.FC = () => {
  const frame = useCurrentFrame();
  const gouttes = at('chute', 'gouttes');
  const remplit = at('chute', 'remplit');
  const annee = at('chute', 'année');
  // « quelques gouttes » : une goutte tombe dans la bouteille ; « remplit » : une pluie de bulles de chat devenues gouttes.
  const first = ease(frame, gouttes, gouttes + 10, [-80, 440], 'inOut');
  const fill = ease(frame, remplit, annee + 12, [0.04, 1], 'inOut');
  const level = frame >= gouttes + 10 ? fill : 0;
  const rain = frame >= remplit && frame < annee + 14;
  return (
    <Scene>
      <div style={{position: 'relative', width: W, height: 760}}>
        {/* Décor dès l'entrée : la bouteille du hook, vide. */}
        <Pop at={2} style={{position: 'absolute', left: CB.x, top: CB.y}}><Bouteille w={CB.w} level={level} /></Pop>
        {frame >= gouttes && frame < gouttes + 10 ? (
          <div style={{position: 'absolute', left: CB.x + CB.w / 2 - 16, top: first}}><Goutte w={32} /></div>
        ) : null}
        {/* La pluie : des petites bulles de chat qui tombent vers le goulot et se changent en gouttes à mi-chemin. */}
        {rain
          ? Array.from({length: 8}, (_, k) => {
              const u = ((frame - remplit) / 16 + k / 8) % 1;
              const x0 = CB.x + CB.w / 2 + (k % 2 ? 1 : -1) * (120 + 40 * (k % 4));
              const [x, y] = arc(u, [x0, -160], [CB.x + CB.w / 2, CB.y + 30], -20);
              return (
                <div key={k} style={{position: 'absolute', left: x - 24, top: y - 20}}>
                  {u < 0.5 ? <div style={{width: 64, height: 36, borderRadius: 14, background: '#2a2a2a', border: '3px solid #8a8a8a'}} /> : <Goutte w={28} />}
                </div>
              );
            })
          : null}
        {/* « chaque année » : d'autres bouteilles pleines se rangent de part et d'autre, en cascade. */}
        {[20, 180, 580, 740].map((x, k) => (
          <Pop key={x} at={annee + 3 * k} style={{position: 'absolute', left: x, top: CB.y + 180}}>
            <Bouteille w={130} level={1} />
          </Pop>
        ))}
      </div>
    </Scene>
  );
};

// ---------- Montage ----------

const SCENES: Record<string, React.FC> = {hook: Hook, origine: Origine, centrales: Centrales, labos: Labos, mistral: Mistral, bouteille: Remplir, vrai: Vrai, total: Total, chute: Chute};

export const MytheBouteilleVoix: React.FC = () => <V.Montage scenes={SCENES} accent={AC} />;

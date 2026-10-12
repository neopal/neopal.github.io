// Short « Entendu au bureau » : le RAG (YouTube / TikTok / Instagram), épisode 8, préparé le 2026-10-12.
// Format test du calendrier (content/dico/calendrier-shorts.md) : la question d'un collègue, la réponse en moins d'une minute.
// Fiche rag de lexique/terms.js ; sources dans voix/rag.script.json : le principe, l'image de Sylvie, Magesh et al.
// (30 mai 2024 : Lexis+ AI et l'assistant de Westlaw, 17 à 33 % d'hallucinations).
// Répond à l'épisode 3 (« pas de base de données ») : cette fois il y a une vraie base, rangée à côté du modèle.
// L'écran suit la voix et Le mouvement (univers.md) : chaque élément entre sur le mot qui le nomme, easing et arcs.
import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Big, Draw, Mono, Pop, Say, Scene, arc, ease, useAccent, withAlpha} from './kit';
import {LABEL, makeVoix} from './voix/VoixShort';
import {ASSISTANTE, COLLEGUE, Pixel, SYLVIE} from './voix/Pixel';
import {Cross, Doc, Model, Msg, pixelShadow} from './voix/Parts';
import ALIGN from './voix/rag.align.json';
import SCRIPT from './voix/rag.script.json';

const AC = '#D7A6FF'; // catégorie Agents et outils
const V = makeVoix(ALIGN, SCRIPT, 'voix/prediction-music.mp3');
const {at} = V;
export const RAGVOIX_DURATION = V.duration;

const gone = (frame: number, until: number) => ease(frame, until, until + 6, [1, 0], 'inOut');

// Une loupe, qui balaie les documents pendant la recherche.
const Loupe: React.FC<{size: number}> = ({size}) => {
  const accent = useAccent();
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <circle cx="40" cy="40" r="26" fill={withAlpha(accent, 0.15)} stroke={accent} strokeWidth="8" />
      <path d="M60 60 L88 88" stroke={accent} strokeWidth="12" strokeLinecap="round" />
    </svg>
  );
};

// ---------- 0. Hook : la question du collègue, à la machine à café ----------

const Hook: React.FC = () => {
  const accent = useAccent();
  const donc = at('hook', 'donc');
  const cafe = at('hook', 'café');
  return (
    <Scene>
      <div style={{display: 'flex', flexDirection: 'column', gap: 34}}>
        {/* La question, dans la bulle du collègue : déjà écrite, donc pas sous-titrée (nocaption). */}
        <Pop at={0} style={{position: 'relative', background: '#2a2a2a', borderRadius: 40, padding: '34px 40px', display: 'flex', flexDirection: 'column', gap: 10}}>
          <Say size={66}>« Le chatbot RH est branché sur nos documents,</Say>
          <Pop at={donc}><Say size={66} color={accent}>donc il ne peut pas se tromper ? »</Say></Pop>
          <div style={{position: 'absolute', left: 90, bottom: -38, width: 0, height: 0, borderLeft: '22px solid transparent', borderRight: '22px solid transparent', borderTop: '40px solid #2a2a2a'}} />
        </Pop>
        <div style={{display: 'flex', alignItems: 'flex-end', gap: 30}}>
          <Pop at={2}><Pixel sprite={COLLEGUE} px={16} seed={3} /></Pop>
          <Pop at={cafe} style={{paddingBottom: 10}}><Mono size={52} color={LABEL}>machine à café</Mono></Pop>
        </div>
      </div>
    </Scene>
  );
};

// ---------- 1. La base : rangée à côté du modèle, on y cherche les passages ----------

const DOCS = [0, 1, 2, 3, 4, 5];
const HIT = [1, 4]; // les deux passages qui parlent de la question

const Base: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const base = at('base', 'base');
  const modele = at('base', 'modèle');
  const programme = at('base', 'programme');
  const passages = at('base', 'passages');
  // La loupe passe d'un document à l'autre pendant « un programme y cherche », puis s'arrête.
  const sweep = ease(frame, programme, passages, [0, 1], 'inOut');
  return (
    <Scene
      bottom={
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <Pop at={modele}><Mono size={52} color="#fff">le modèle</Mono></Pop>
          <Pop at={base + 4}><Mono size={52} color={LABEL}>base de documents</Mono></Pop>
        </div>
      }
    >
      <div style={{position: 'relative', height: 520}}>
        <Pop at={modele} style={{position: 'absolute', left: 0, top: 150}}><Model w={300} /></Pop>
        {/* La base : six documents en pile, à droite. */}
        {DOCS.map((k) => (
          <Pop key={k} at={base + k * 2} style={{position: 'absolute', left: 420 + (k % 2) * 230, top: Math.floor(k / 2) * 170}}>
            <Doc w={200} lines={4} hi={frame >= passages && HIT.includes(k) ? 1 : -1} border={frame >= passages && HIT.includes(k) ? accent : '#000'} />
          </Pop>
        ))}
        {frame >= programme && frame < passages + 20 ? (
          <div style={{position: 'absolute', left: 400 + 230 * Math.abs(Math.sin(sweep * Math.PI * 1.5)), top: 20 + 340 * sweep, opacity: gone(frame, passages + 14)}}>
            <Loupe size={150} />
          </div>
        ) : null}
      </div>
    </Scene>
  );
};

// ---------- 2. Il les colle sous les yeux du modèle, répond, n'en garde rien ----------

const Colle: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const accent = useAccent();
  const colle = at('colle', 'colle');
  const question = at('colle', 'question');
  const repond = at('colle', 'répond');
  const garder = at('colle', 'garder');
  // Les deux passages montent en arc depuis la base jusque dans la conversation.
  const fly = spring({frame: frame - colle, fps, config: {damping: 15, stiffness: 120}});
  const clear = ease(frame, garder, garder + 12, [1, 0], 'inOut');
  return (
    <Scene gap={30}>
      {/* La conversation : ce que le modèle a sous les yeux au moment de répondre. */}
      <div style={{position: 'relative', height: 470, border: `8px solid ${accent}`, boxShadow: `0 0 26px ${withAlpha(accent, 0.45)}`}}>
        {[0, 1].map((k) => {
          const [x, y] = arc(fly, [520 + k * 60, 520], [30 + k * 250, 30], 80);
          return (
            <div key={k} style={{position: 'absolute', left: x, top: y, opacity: (frame >= colle ? 1 : 0) * clear}}>
              <Doc w={220} lines={3} hi={1} />
            </div>
          );
        })}
        <Pop at={question} style={{position: 'absolute', right: 30, top: 230, opacity: clear}}><Msg w={300} right /></Pop>
        <Pop at={repond} style={{position: 'absolute', left: 30, top: 330, opacity: clear}}><Msg w={380} color={accent} /></Pop>
      </div>
      <div style={{display: 'flex', alignItems: 'center', gap: 34}}>
        <Pop at={2}><Model w={220} lock={1} /></Pop>
        <Pop at={garder}><Mono size={52} color={LABEL}>sans rien garder</Mono></Pop>
      </div>
    </Scene>
  );
};

// ---------- 3. Le nom : RAG, Retrieval Augmented Generation ----------

const Nom: React.FC = () => {
  const accent = useAccent();
  const rag = at('nom', 'RAG');
  const words = [
    {w: 'Retrieval', at: at('nom', 'Retrieval')},
    {w: 'Augmented', at: at('nom', 'Augmented')},
    {w: 'Generation', at: at('nom', 'Generation')},
  ];
  return (
    <Scene gap={30}>
      <Pop at={rag}><Big size={220} color={accent}>RAG</Big></Pop>
      <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
        {words.map((x) => (
          <Pop key={x.w} at={x.at} style={{display: 'flex'}}>
            <Mono size={64} color={accent}>{x.w[0]}</Mono>
            <Mono size={64} color="#fff">{x.w.slice(1)}</Mono>
          </Pop>
        ))}
      </div>
    </Scene>
  );
};

// ---------- 4. L'image : l'assistante de Sylvie et les trois mails ----------

const Sylvie: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const accent = useAccent();
  const assistante = at('sylvie', 'assistante');
  const sylvie = at('sylvie', 'Sylvie');
  const mails = at('sylvie', 'mails');
  const rdv = at('sylvie', 'rendez-vous');
  const coeur = at('sylvie', 'cœur');
  const lendemain = at('sylvie', 'lendemain');
  const rien = at('sylvie', 'rien');
  // Les trois mails passent en arc des mains de l'assistante jusque sous le nez de Sylvie, sur « rendez-vous ».
  const give = spring({frame: frame - rdv, fps, config: {damping: 15, stiffness: 130}});
  const forget = ease(frame, lendemain, lendemain + 10, [1, 0], 'inOut');
  return (
    <Scene gap={30}>
      <div style={{position: 'relative', height: 560}}>
        <Pop at={assistante} style={{position: 'absolute', left: 0, top: 160, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10}}>
          <Pixel sprite={ASSISTANTE} px={14} seed={4} />
          <Mono size={48} color={LABEL}>l'assistante</Mono>
        </Pop>
        <Pop at={sylvie} style={{position: 'absolute', right: 0, top: 160, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10}}>
          <Pixel sprite={SYLVIE} px={18} seed={5} />
          <Mono size={52} color="#fff">Sylvie</Mono>
        </Pop>
        {[0, 1, 2].map((k) => {
          const [x, y] = arc(give, [40 + k * 30, 40 + k * 16], [430 + k * 26, 30 + k * 16], 70);
          return (
            <Pop key={k} at={mails + k * 4} style={{position: 'absolute', left: x, top: y, opacity: forget}}>
              <div style={{transform: `rotate(${(k - 1) * 5}deg)`}}><Doc w={170} lines={3} title={k === 0 ? 'mail' : undefined} /></div>
            </Pop>
          );
        })}
        {/* « par cœur », puis le lendemain, plus rien. */}
        <Pop at={coeur} style={{position: 'absolute', right: 10, top: 520, opacity: gone(frame, lendemain)}}><Mono size={52} color={accent}>par cœur</Mono></Pop>
        {frame >= lendemain ? <Pop at={lendemain} style={{position: 'absolute', right: 10, top: 520}}><Mono size={52} color={LABEL}>le lendemain</Mono></Pop> : null}
        {frame >= rien ? (
          <Pop at={rien} style={{position: 'absolute', right: 90, top: -40}}>
            <Big size={200} color={accent}>?</Big>
          </Pop>
        ) : null}
      </div>
    </Scene>
  );
};

// ---------- 5. Quand la recherche se trompe : 17 à 33 % d'erreurs en 2024 ----------

const Erreur: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const mauvais = at('erreur', 'mauvais');
  const repond = at('erreur', 'répond');
  const y2024 = at('erreur', '2024');
  const juridiques = at('erreur', 'juridiques');
  const n17 = at('erreur', '17');
  const n33 = at('erreur', '33');
  const band = ease(frame, n17, n33 + 6, [0, 1], 'inOut');
  const BW = 888;
  return (
    <Scene gap={40}>
      {/* Le mauvais mail ramené par la recherche, et la réponse qui part quand même. */}
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', opacity: frame >= y2024 ? 0.35 : 1}}>
        <Pop at={Math.min(mauvais, 6)} style={{position: 'relative'}}>
          <Doc w={240} lines={4} border={frame >= mauvais ? accent : '#000'} />
          <div style={{position: 'absolute', right: -20, top: -20, lineHeight: 0, opacity: frame >= mauvais ? 1 : 0}}><Cross p={ease(frame, mauvais, mauvais + 12)} size={90} /></div>
        </Pop>
        <svg width={120} height={60} viewBox="0 0 120 60" style={{opacity: frame >= repond ? 1 : 0}}>
          <Draw d="M8 30 L100 30 M82 12 L104 30 L82 48" p={ease(frame, repond, repond + 10)} width={8} len={200} color="#fff" />
        </svg>
        <Pop at={repond}><Msg w={380} color="#fff" /></Pop>
      </div>
      {/* L'étude de 2024 : la part des questions où les outils juridiques se trompaient, de 17 à 33 %. */}
      <div style={{display: 'flex', flexDirection: 'column', gap: 18, opacity: frame >= y2024 ? 1 : 0}}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <Pop at={juridiques}><Mono size={52} color="#fff">outils juridiques</Mono></Pop>
          <Pop at={y2024}><Mono size={52} color={LABEL}>2024</Mono></Pop>
        </div>
        <div style={{position: 'relative', height: 60, border: '4px solid #666'}}>
          <div style={{position: 'absolute', top: 0, bottom: 0, left: BW * 0.17, width: BW * 0.16 * band, background: withAlpha(accent, 0.6), borderLeft: `6px solid ${accent}`}} />
        </div>
        <div style={{position: 'relative', height: 70}}>
          <Pop at={n17} style={{position: 'absolute', left: BW * 0.17 - 40}}><Mono size={56} color={accent}>17</Mono></Pop>
          <Pop at={n33} style={{position: 'absolute', left: BW * 0.33 - 10}}><Mono size={56} color={accent}>33 %</Mono></Pop>
        </div>
      </div>
    </Scene>
  );
};

// ---------- 6. Chute : regarde le passage qu'il cite ----------

const Chute: React.FC = () => {
  const frame = useCurrentFrame();
  const accent = useAccent();
  const reponse = at('chute', 'réponse');
  const passage = at('chute', 'passage');
  const cite = at('chute', 'cite');
  return (
    <Scene gap={30}>
      {/* La réponse, avec son renvoi [1]. */}
      <Pop at={Math.min(reponse, 4)} style={{alignSelf: 'flex-start', background: 'transparent', border: '4px solid #fff', borderRadius: 26, padding: '22px 28px', display: 'flex', alignItems: 'center', gap: 18}}>
        <div style={{display: 'flex', flexDirection: 'column', gap: 10, width: 360}}>
          <div style={{height: 12, width: '90%', background: '#fff'}} />
          <div style={{height: 12, width: '64%', background: '#fff'}} />
        </div>
        <div style={{border: `4px solid ${accent}`, padding: '0 12px', opacity: frame >= passage ? 1 : 0}}><Mono size={48} color={accent}>[1]</Mono></div>
      </Pop>
      {/* Le lien du renvoi jusqu'au passage, puis le passage, posé en grand. */}
      <svg width={888} height={110} viewBox="0 0 888 110" style={{opacity: frame >= cite ? 1 : 0}}>
        <Draw d="M440 6 C 440 60, 600 50, 640 104" p={ease(frame, cite, cite + 12)} width={8} len={260} />
      </svg>
      <Pop at={passage} style={{alignSelf: 'flex-end', boxShadow: pixelShadow(withAlpha(accent, 0.35))}}>
        <Doc w={460} lines={5} hi={2} title="passage cité" border={accent} />
      </Pop>
    </Scene>
  );
};

// ---------- Montage ----------

const SCENES: Record<string, React.FC> = {hook: Hook, base: Base, colle: Colle, nom: Nom, sylvie: Sylvie, erreur: Erreur, chute: Chute};

export const RagVoix: React.FC = () => <V.Montage scenes={SCENES} accent={AC} />;

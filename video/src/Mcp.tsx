// Short MCP : une prise standard entre les assistants et leurs outils (catégorie Agents, accent violet).
// Scène propre à ce short : les 60 000 câbles sur mesure qui s'effacent devant une seule barre MCP.
import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {ACCENTS, BEAT, DIM, Draw, GREY, Lock, Mono, Pop, RED, Scene, Scenes, Short, W, clamp, mono, svgPx, totalDuration, usePop, useProg, withAlpha} from './kit';

const AC = ACCENTS.agents;
const acA = (a: number) => withAlpha(AC, a);

// Pseudo-aléatoire déterministe.
const rnd = (i: number) => {
  const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};

// Boîte avec un libellé mono, dessinée en SVG.
const Node: React.FC<{x: number; y: number; w: number; h: number; label: string; sub?: string; p?: number; hi?: boolean; color?: string}> = ({x, y, w, h, label, sub, p = 1, hi = false, color}) => {
  if (p <= 0) return null;
  const s = 0.75 + 0.25 * Math.min(1, p);
  const c = color ?? (hi ? AC : '#fff');
  return (
    <g transform={`translate(${x + w / 2} ${y + h / 2}) scale(${s})`} opacity={Math.min(1, p * 2)}>
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={18} fill={hi ? acA(0.1) : '#0b0b0b'} stroke={c} strokeWidth={5} />
      <text x={0} y={sub ? -8 : 13} textAnchor="middle" fontFamily={mono} fontWeight={600} fontSize={svgPx(36)} fill={c}>{label}</text>
      {sub ? <text x={0} y={36} textAnchor="middle" fontFamily={mono} fontWeight={600} fontSize={svgPx(36)} fill="#9a9a9a">{sub}</text> : null}
    </g>
  );
};

// Fiche prise mâle « MCP » au bout d'un câble.
const Plug: React.FC<{x: number; y: number; on: number}> = ({x, y, on}) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-96} y={-30} width={96} height={60} rx={8} fill={AC} />
    <rect x={0} y={-18} width={18} height={11} fill={AC} />
    <rect x={0} y={7} width={18} height={11} fill={AC} />
    <text x={-48} y={13} textAnchor="middle" fontFamily={mono} fontWeight={600} fontSize={svgPx(36)} fill="#000">MCP</text>
    {on > 0 && on < 1 ? <circle cx={16} cy={0} r={20 + 50 * on} fill="none" stroke={AC} strokeWidth={4} opacity={1 - on} /> : null}
  </g>
);

// ---------- Scènes ----------

// Une application se branche sur un serveur, puis deux autres sur le même serveur.
const APPS = [
  {label: 'ChatGPT', y: 20, at: 6.4},
  {label: 'Claude', y: 210, at: 1},
  {label: 'Cursor', y: 400, at: 7.2},
];

const Reponse: React.FC = () => {
  const frame = useCurrentFrame();
  const SX = 600;
  const SY = 260;
  return (
    <Scene
      caps={[[0, "MCP est un standard ouvert pour *brancher* une appli d'IA sur un outil."]]}
    >
      <svg width={W} height={520} viewBox={`0 0 ${W} 520`} style={{display: 'block', overflow: 'visible'}}>
        <Node x={SX} y={SY - 90} w={288} h={180} label="GitHub" sub="serveur MCP" p={interpolate(frame, [BEAT * 1.6, BEAT * 1.6 + 10], [0, 1], clamp)} />
        {APPS.map((a) => {
          const p = interpolate(frame, [BEAT * a.at, BEAT * a.at + 10], [0, 1], clamp);
          const c = interpolate(frame, [BEAT * (a.at + 1.2), BEAT * (a.at + 2.2)], [0, 1], clamp);
          const snap = interpolate(frame, [BEAT * (a.at + 2.2), BEAT * (a.at + 2.2) + 12], [0, 1], clamp);
          const ay = a.y + 50;
          // Le câble part de l'application et suit une courbe jusqu'à la prise du serveur.
          const ex = 230 + (SX - 18 - 230) * c;
          const ey = ay + (SY - ay) * (c * c * (3 - 2 * c));
          return (
            <g key={a.label}>
              {c > 0 ? <path d={`M230 ${ay} C${230 + (ex - 230) * 0.5} ${ay}, ${230 + (ex - 230) * 0.5} ${ey}, ${ex - 96} ${ey}`} fill="none" stroke={AC} strokeWidth={6} /> : null}
              {c > 0 ? <Plug x={ex} y={ey} on={snap} /> : null}
              <Node x={0} y={a.y} w={230} h={100} label={a.label} p={p} hi={snap >= 1} />
            </g>
          );
        })}
      </svg>
    </Scene>
  );
};

// Frise verticale : lancement, adoptions, fondation (seule frise de la série).
const DATES = [
  {d: 'nov. 2024', who: 'Anthropic le publie', at: 1.4, hi: true},
  {d: 'mars 2025', who: 'OpenAI l’adopte', at: 3.4, hi: false},
  {d: 'avril 2025', who: 'Google aussi', at: 4.8, hi: false},
  {d: 'déc. 2025', who: 'Linux Foundation', at: 6.6, hi: true},
];

const Frise: React.FC = () => {
  const axis = useProg(BEAT * 1.2, BEAT * 7);
  return (
    <Scene
      caps={[[0, "Anthropic l'a publié en 2024, OpenAI et Google l'ont adopté en 2025."]]}
      bottom={
        <Pop at={BEAT * 8.4} style={{display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 20}}>
          <Mono size={72}>97 M</Mono>
          <Mono size={40} color={GREY}>de téléchargements par mois</Mono>
        </Pop>
      }
    >
      <div style={{position: 'relative', paddingLeft: 80, display: 'flex', flexDirection: 'column', gap: 46}}>
        <div style={{position: 'absolute', left: 18, top: 20, width: 6, height: `${axis * 88}%`, background: '#fff'}} />
        {DATES.map((e) => (
          <Pop key={e.d} at={BEAT * e.at} style={{position: 'relative', display: 'flex', flexDirection: 'column', gap: 4}}>
            <div style={{position: 'absolute', left: -80, top: 8, width: 42, height: 42, borderRadius: 21, background: e.hi ? AC : '#fff'}} />
            <Mono size={48} color={e.hi ? AC : '#fff'}>{e.d}</Mono>
            <Mono size={40} color={GREY}>{e.who}</Mono>
          </Pop>
        ))}
      </div>
    </Scene>
  );
};

// Le calcul : 6 applications × 10 000 serveurs = 60 000 câbles ; avec MCP, 6 + 10 000 = 10 006 pièces.
const MESH_APPS = ['Claude', 'ChatGPT', 'Cursor', 'Gemini', 'Copilot', 'VS Code'];
const MESH_SRV = ['GitHub', 'Slack', 'Drive', 'serveur', 'serveur', 'serveur'];
const AFTER = 180;

const Calcul: React.FC = () => {
  const frame = useCurrentFrame();
  const BW = 210;
  const BH = 76;
  const gap = 100;
  const H = gap * 5 + BH;
  const yc = (k: number) => k * gap + BH / 2;
  const after = frame >= AFTER;
  const fadeMesh = interpolate(frame, [AFTER - 6, AFTER + 6], [1, 0], clamp);
  const bus = useProg(AFTER + 3, AFTER + 18);
  const spokes = useProg(AFTER + 18, AFTER + 40);
  const f1 = usePop(BEAT * 7);
  const f2 = usePop(AFTER + 48);
  const cables: React.ReactNode[] = [];
  MESH_APPS.forEach((_, a) => {
    MESH_SRV.forEach((__, s) => {
      const i = a * 6 + s;
      const start = BEAT * 1.6 + a * BEAT * 0.8 + s * 2;
      const p = interpolate(frame, [start, start + 10], [0, 1], clamp);
      if (p <= 0) return;
      const wob = (rnd(i) - 0.5) * 160;
      cables.push(
        <path key={i} d={`M${BW} ${yc(a)} C${BW + 160} ${yc(a) + wob}, ${W - BW - 160} ${yc(s) - wob}, ${W - BW} ${yc(s)}`} fill="none" stroke={rnd(i + 50) < 0.5 ? '#9a9a9a' : '#6a6a6a'} strokeWidth={3} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} opacity={fadeMesh} />,
      );
    });
  });
  const BX = W / 2;
  return (
    <Scene
      caps={[
        [0, 'Sans prise commune, il faut un câble sur mesure par paire.'],
        [AFTER, 'Avec MCP, chacun a *sa prise*, et 10 006 prises suffisent.'],
      ]}
      bottom={
        <div style={{display: 'flex', justifyContent: 'center'}}>
          {frame >= BEAT * 7 && !after ? (
            <div style={{transform: `scale(${0.7 + 0.3 * f1})`, display: 'flex', alignItems: 'baseline', gap: 20}}>
              <Mono size={52} color="#fff">6 × 10 000 =</Mono>
              <Mono size={76} color={RED}>60 000</Mono>
              <Mono size={36} color={GREY}>câbles</Mono>
            </div>
          ) : null}
          {frame >= AFTER + 48 ? (
            <div style={{transform: `scale(${0.7 + 0.3 * f2})`, display: 'flex', alignItems: 'baseline', gap: 20}}>
              <Mono size={52} color="#fff">6 + 10 000 =</Mono>
              <Mono size={76} color={AC}>10 006</Mono>
              <Mono size={36} color={GREY}>prises</Mono>
            </div>
          ) : null}
        </div>
      }
    >
      <Pop at={BEAT * 0.8}>
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{display: 'block', overflow: 'visible'}}>
          {cables}
          {after ? (
            <g>
              <rect x={BX - 36} y={0} width={72} height={H * bus} rx={14} fill={AC} />
              {bus >= 1 ? (
                <text x={BX} y={H / 2} textAnchor="middle" fontFamily={mono} fontWeight={600} fontSize={svgPx(36)} fill="#000" transform={`rotate(-90 ${BX} ${H / 2})`} dy={12}>MCP</text>
              ) : null}
              {MESH_APPS.map((_, k) => (
                <Draw key={'a' + k} d={`M${BW} ${yc(k)} L${BX - 36} ${yc(k)}`} p={spokes} color={AC} width={6} len={300} />
              ))}
              {MESH_SRV.map((_, k) => (
                <Draw key={'s' + k} d={`M${W - BW} ${yc(k)} L${BX + 36} ${yc(k)}`} p={spokes} color={AC} width={6} len={300} />
              ))}
            </g>
          ) : null}
          {MESH_APPS.map((l, k) => (
            <Node key={l} x={0} y={k * gap} w={BW} h={BH} label={l} hi={after && spokes >= 1} />
          ))}
          {MESH_SRV.map((l, k) => (
            <Node key={k} x={W - BW} y={k * gap} w={BW} h={BH} label={l} hi={after && spokes >= 1} />
          ))}
        </svg>
      </Pop>
    </Scene>
  );
};

// La prise ne filtre rien : un ticket piégé passe dans le câble, et les dépôts privés partent vers un dépôt public.
const Incident: React.FC = () => {
  const frame = useCurrentFrame();
  const cable = useProg(BEAT * 0.8, BEAT * 1.6);
  const bad = frame >= BEAT * 3;
  const leak = useProg(BEAT * 7, BEAT * 9);
  const packets = [0, 1, 2, 3].map((k) => {
    const t = (frame - BEAT * 1.6) / 50 + k / 4;
    return {k, x: t < 0 ? -1 : t % 1};
  });
  const Y2 = 330;
  return (
    <Scene caps={[[0, 'En mai 2025, un ticket piégé a fait fuiter des dépôts privés via un agent MCP.']]}>
      <svg width={W} height={560} viewBox={`0 0 ${W} 560`} style={{display: 'block', overflow: 'visible'}}>
        <Node x={0} y={40} w={240} h={110} label="GitHub" />
        <Node x={W - 240} y={40} w={240} h={110} label="agent" hi />
        <line x1={240} y1={95} x2={240 + (W - 480) * cable} y2={95} stroke={AC} strokeWidth={6} />
        {cable >= 1
          ? packets.map(({k, x}) => {
              if (x < 0 || x > 1) return null;
              const isBad = bad && k === 2;
              return <rect key={k} x={250 + (W - 540) * x} y={75} width={44} height={40} rx={6} fill={isBad ? RED : '#fff'} />;
            })
          : null}
        {bad ? <text x={W / 2} y={195} textAnchor="middle" fontFamily={mono} fontWeight={600} fontSize={svgPx(38)} fill={RED}>ticket piégé</text> : null}
        <g opacity={frame >= BEAT * 5.4 ? 1 : 0}>
          <rect x={0} y={Y2} width={300} height={150} rx={18} fill="#0b0b0b" stroke="#fff" strokeWidth={5} />
          <text x={150} y={Y2 + 66} textAnchor="middle" fontFamily={mono} fontWeight={600} fontSize={svgPx(36)} fill="#fff">dépôts</text>
          <text x={150} y={Y2 + 110} textAnchor="middle" fontFamily={mono} fontWeight={600} fontSize={svgPx(36)} fill="#fff">privés</text>
          <rect x={W - 300} y={Y2} width={300} height={150} rx={18} fill="rgba(255,77,77,.12)" stroke={RED} strokeWidth={5} />
          <text x={W - 150} y={Y2 + 66} textAnchor="middle" fontFamily={mono} fontWeight={600} fontSize={svgPx(36)} fill={RED}>dépôt</text>
          <text x={W - 150} y={Y2 + 110} textAnchor="middle" fontFamily={mono} fontWeight={600} fontSize={svgPx(36)} fill={RED}>public</text>
          <Draw d={`M310 ${Y2 + 75} L${W - 320} ${Y2 + 75}`} p={leak} color={RED} width={6} len={300} />
          {leak >= 1 ? <path d={`M${W - 340} ${Y2 + 58} L${W - 318} ${Y2 + 75} L${W - 340} ${Y2 + 92}`} fill="none" stroke={RED} strokeWidth={6} strokeLinecap="round" /> : null}
          {[0, 1, 2].map((k) => {
            const t = interpolate(frame, [BEAT * 7 + k * 8, BEAT * 9 + k * 8], [0, 1], clamp);
            return t > 0 && t < 1 ? <rect key={k} x={320 + (W - 680) * t} y={Y2 + 58} width={36} height={34} rx={5} fill="#fff" /> : null;
          })}
        </g>
      </svg>
    </Scene>
  );
};

// Chute : la liste des outils d'un serveur, les droits d'écriture coupés un à un.
const TOOLS = [
  {name: 'lire_ticket', kind: 'lecture', on: true},
  {name: 'lister_dépôts', kind: 'lecture', on: true},
  {name: 'créer_dépôt', kind: 'écriture', on: false},
  {name: 'supprimer_dépôt', kind: 'écriture', on: false},
];

const Switch: React.FC<{on: number}> = ({on}) => (
  <div style={{position: 'relative', width: 110, height: 60, borderRadius: 30, background: on > 0.5 ? acA(0.35) : '#222', border: `4px solid ${on > 0.5 ? AC : '#555'}`}}>
    <div style={{position: 'absolute', top: 6, left: 6 + 50 * on, width: 40, height: 40, borderRadius: 20, background: on > 0.5 ? AC : '#777'}} />
  </div>
);

const Chute: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Scene caps={[[0, 'Avant de brancher un serveur, lis ses outils et ne lui laisse que les droits utiles.']]}>
      <Pop at={BEAT * 1} style={{border: '4px solid #444', borderRadius: 28, padding: '22px 28px', display: 'flex', flexDirection: 'column', gap: 10}}>
        <Mono size={40} color="#fff">serveur MCP · outils</Mono>
        {TOOLS.map((t, k) => {
          const at = BEAT * 1.6 + k * BEAT * 0.8;
          const offAt = BEAT * 5 + (k - 2) * BEAT;
          const on = t.on ? 1 : 1 - interpolate(frame, [offAt, offAt + 8], [0, 1], clamp);
          const off = on < 0.5;
          return (
            <Pop key={t.name} at={at} style={{display: 'flex', alignItems: 'center', gap: 20, borderTop: '3px solid #2a2a2a', paddingTop: 12, height: 96}}>
              <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                <Mono size={40} color={off ? '#666' : '#fff'}>{t.name}</Mono>
                <Mono size={36} color={off ? '#555' : GREY}>{t.kind}</Mono>
              </div>
              {off ? <Lock p={1} size={56} color={RED} /> : null}
              <Switch on={on} />
            </Pop>
          );
        })}
      </Pop>
    </Scene>
  );
};

const SCENES: Scenes = [
  [Reponse, 200],
  [Frise, 185],
  [Calcul, 340],
  [Incident, 240],
  [Chute, 230],
];

export const MCP_DURATION = totalDuration(SCENES);

export const Mcp: React.FC = () => <Short title={["Qu'est-ce que", 'MCP ?']} scenes={SCENES} accent={AC} />;

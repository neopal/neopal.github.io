// Short MCP : une prise standard entre les assistants et leurs outils.
import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {BEAT, Big, Draw, GREY, Hi, Mono, Pop, RED, Say, Scene, Scenes, clamp, mono, totalDuration, usePop, useProg} from './kit';
import {AC, CheckA, EyeA, LockA, ShortA, acA} from './Harness';

// Pseudo-aléatoire déterministe.
const rnd = (i: number) => {
  const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};

// Boîte avec un libellé mono, dessinée en SVG.
const Node: React.FC<{x: number; y: number; w: number; h: number; label: string; sub?: string; p?: number; hi?: boolean; size?: number}> = ({x, y, w, h, label, sub, p = 1, hi = false, size = 32}) => {
  if (p <= 0) return null;
  const s = 0.75 + 0.25 * Math.min(1, p);
  return (
    <g transform={`translate(${x + w / 2} ${y + h / 2}) scale(${s})`} opacity={Math.min(1, p * 2)}>
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={18} fill={hi ? acA(0.1) : '#0b0b0b'} stroke={hi ? AC : '#fff'} strokeWidth={5} />
      <text x={0} y={sub ? -4 : size * 0.36} textAnchor="middle" fontFamily={mono} fontWeight={600} fontSize={size} fill={hi ? AC : '#fff'}>{label}</text>
      {sub ? <text x={0} y={30} textAnchor="middle" fontFamily={mono} fontWeight={400} fontSize={22} fill="#8a8a8a">{sub}</text> : null}
    </g>
  );
};

// Fiche prise mâle « MCP » au bout d'un câble.
const Plug: React.FC<{x: number; y: number; on: number}> = ({x, y, on}) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-74} y={-26} width={74} height={52} rx={8} fill={AC} />
    <rect x={0} y={-16} width={16} height={10} fill={AC} />
    <rect x={0} y={6} width={16} height={10} fill={AC} />
    <text x={-37} y={10} textAnchor="middle" fontFamily={mono} fontWeight={600} fontSize={24} fill="#000">MCP</text>
    {on > 0 && on < 1 ? <circle cx={16} cy={0} r={20 + 50 * on} fill="none" stroke={AC} strokeWidth={4} opacity={1 - on} /> : null}
  </g>
);

// ---------- Scènes ----------

const Question: React.FC = () => (
  <Scene gap={14}>
    <Pop at={0}><Say size={110}>Qu'est-ce que</Say></Pop>
    <Pop at={8}><Big size={240} color={AC}><span style={{whiteSpace: 'nowrap'}}>MCP ?</span></Big></Pop>
  </Scene>
);

// Une application se branche sur un serveur, puis deux autres sur le même serveur.
const APPS = [
  {label: 'ChatGPT', y: 20, at: 6.6},
  {label: 'Claude', y: 200, at: 1},
  {label: 'Cursor', y: 380, at: 7.2},
];

const Reponse: React.FC = () => {
  const frame = useCurrentFrame();
  const SX = 640;
  const SY = 230;
  return (
    <Scene gap={44}>
      <Pop at={0}><Say size={60}>MCP est un standard ouvert qui définit comment une application d'IA <Hi color={AC}>se branche</Hi> sur un outil ou une source de données.</Say></Pop>
      <svg width={888} height={500} viewBox="0 0 888 500" style={{display: 'block', overflow: 'visible'}}>
        <Node x={SX} y={SY - 80} w={248} h={160} label="GitHub" sub="serveur MCP" p={interpolate(frame, [BEAT * 1.6, BEAT * 1.6 + 10], [0, 1], clamp)} />
        {APPS.map((a) => {
          const p = interpolate(frame, [BEAT * a.at, BEAT * a.at + 10], [0, 1], clamp);
          const c = interpolate(frame, [BEAT * (a.at + 1.2), BEAT * (a.at + 2.2)], [0, 1], clamp);
          const snap = interpolate(frame, [BEAT * (a.at + 2.2), BEAT * (a.at + 2.2) + 12], [0, 1], clamp);
          const ay = a.y + 50;
          // Le câble part de l'application et suit une courbe jusqu'à la prise du serveur.
          const ex = 230 + (SX - 16 - 230) * c;
          const t = c;
          const ey = ay + (SY - ay) * (t * t * (3 - 2 * t));
          return (
            <g key={a.label}>
              {c > 0 ? <path d={`M230 ${ay} C${230 + (ex - 230) * 0.5} ${ay}, ${230 + (ex - 230) * 0.5} ${ey}, ${ex - 74} ${ey}`} fill="none" stroke={AC} strokeWidth={6} /> : null}
              {c > 0 ? <Plug x={ex} y={ey} on={snap} /> : null}
              <Node x={0} y={a.y} w={230} h={100} label={a.label} p={p} hi={snap >= 1} />
            </g>
          );
        })}
      </svg>
      <div style={{height: 210}}>
        <Pop at={BEAT * 5.6}><Say size={58}>On écrit le connecteur une fois, et tous les assistants compatibles <Hi color={AC}>peuvent s'en servir.</Hi></Say></Pop>
      </div>
    </Scene>
  );
};

// Frise : lancement, adoptions, fondation.
const DATES = [
  {d: 'nov. 2024', t: 'Anthropic publie MCP avec six serveurs d’exemple, dont Google Drive, Slack et GitHub.', at: 1.6},
  {d: 'mars et avril 2025', t: 'OpenAI l’adopte en mars, puis Google en avril.', at: 4.2},
  {d: 'déc. 2025', t: 'Anthropic le confie à l’Agentic AI Foundation, sous l’égide de la Linux Foundation.', at: 6.6},
];

const Frise: React.FC = () => {
  const frame = useCurrentFrame();
  const axis = useProg(BEAT * 1.2, BEAT * 7.4);
  const dl = interpolate(frame, [BEAT * 8.8, BEAT * 8.8 + 20], [0, 1], clamp);
  return (
    <Scene gap={44}>
      <Pop at={0}><Say size={60}>Anthropic a publié MCP le 25 novembre 2024, et ses concurrents l’ont adopté <Hi color={AC}>en quelques mois.</Hi></Say></Pop>
      <div style={{position: 'relative', paddingLeft: 70, display: 'flex', flexDirection: 'column', gap: 34}}>
        <div style={{position: 'absolute', left: 16, top: 14, width: 6, height: `${axis * 94}%`, background: '#fff'}} />
        {DATES.map((e, k) => (
          <Pop key={e.d} at={BEAT * e.at} style={{position: 'relative'}}>
            <div style={{position: 'absolute', left: -70, top: 4, width: 38, height: 38, borderRadius: 19, background: k === 0 || k === 2 ? AC : '#fff'}} />
            <Mono size={38} color={AC}>{e.d}</Mono>
            <div style={{marginTop: 6}}><Say size={46}>{e.t}</Say></div>
          </Pop>
        ))}
        <Pop at={BEAT * 8.8} style={{display: 'flex', flexDirection: 'column', gap: 12}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
            <Mono size={30} color={GREY}>téléchargements des kits, par mois</Mono>
            <Mono size={48} color={AC}>{Math.round(97 * dl)} M</Mono>
          </div>
          <div style={{height: 40, width: `${dl * 100}%`, background: AC}} />
        </Pop>
      </div>
    </Scene>
  );
};

// Le calcul : 6 applications × 10 000 serveurs = 60 000 câbles ; avec MCP, 6 + 10 000 = 10 006 pièces.
const MESH_APPS = ['Claude', 'ChatGPT', 'Cursor', 'Gemini', 'Copilot', 'VS Code'];
const MESH_SRV = ['GitHub', 'Slack', 'Drive', 'serveur', 'serveur', 'serveur'];

const Calcul: React.FC = () => {
  const frame = useCurrentFrame();
  const W = 888;
  const BW = 210;
  const BH = 76;
  const gap = 104;
  const H = gap * 5 + BH;
  const yc = (k: number) => k * gap + BH / 2;
  const after = frame >= BEAT * 10;
  const fadeMesh = interpolate(frame, [BEAT * 9.6, BEAT * 10.4], [1, 0], clamp);
  const bus = useProg(BEAT * 10.2, BEAT * 11);
  const spokes = useProg(BEAT * 11, BEAT * 12.4);
  const f1 = usePop(BEAT * 7);
  const f2 = usePop(BEAT * 13.6);
  const cables: React.ReactNode[] = [];
  MESH_APPS.forEach((_, a) => {
    MESH_SRV.forEach((__, s) => {
      const i = a * 6 + s;
      const start = BEAT * 1.6 + a * BEAT * 0.8 + s * 2;
      const p = interpolate(frame, [start, start + 10], [0, 1], clamp);
      if (p <= 0) return;
      const y1 = yc(a);
      const y2 = yc(s);
      const wob = (rnd(i) - 0.5) * 160;
      cables.push(
        <path key={i} d={`M${BW} ${y1} C${BW + 160} ${y1 + wob}, ${W - BW - 160} ${y2 - wob}, ${W - BW} ${y2}`} fill="none" stroke={rnd(i + 50) < 0.5 ? '#9a9a9a' : '#6a6a6a'} strokeWidth={3} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} opacity={fadeMesh} />,
      );
    });
  });
  const BX = W / 2;
  return (
    <Scene gap={36}>
      <Pop at={0}><Say size={56}>Sans prise commune, six applications et plus de 10 000 serveurs demandent <Hi color={AC}>un câble sur mesure</Hi> par paire.</Say></Pop>
      <Pop at={BEAT * 0.8}>
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{display: 'block', overflow: 'visible'}}>
          {cables}
          {after ? (
            <g>
              <rect x={BX - 34} y={0} width={68} height={H * bus} rx={14} fill={AC} />
              {bus >= 1 ? (
                <text x={BX} y={H / 2} textAnchor="middle" fontFamily={mono} fontWeight={600} fontSize={30} fill="#000" transform={`rotate(-90 ${BX} ${H / 2})`} dy={10}>MCP</text>
              ) : null}
              {MESH_APPS.map((_, k) => (
                <Draw key={'a' + k} d={`M${BW} ${yc(k)} L${BX - 34} ${yc(k)}`} p={spokes} color={AC} width={6} len={300} />
              ))}
              {MESH_SRV.map((_, k) => (
                <Draw key={'s' + k} d={`M${W - BW} ${yc(k)} L${BX + 34} ${yc(k)}`} p={spokes} color={AC} width={6} len={300} />
              ))}
            </g>
          ) : null}
          {MESH_APPS.map((l, k) => (
            <Node key={l} x={0} y={k * gap} w={BW} h={BH} label={l} size={30} hi={after && spokes >= 1} />
          ))}
          {MESH_SRV.map((l, k) => (
            <Node key={k} x={W - BW} y={k * gap} w={BW} h={BH} label={l} size={30} hi={after && spokes >= 1} />
          ))}
        </svg>
      </Pop>
      <div style={{position: 'relative', height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        {frame >= BEAT * 7 && !after ? (
          <div style={{transform: `scale(${0.7 + 0.3 * f1})`, display: 'flex', alignItems: 'baseline', gap: 20, whiteSpace: 'nowrap'}}>
            <Mono size={52} color="#fff">6 × 10 000 =</Mono>
            <Mono size={76} color={RED}>60 000</Mono>
            <Mono size={32} color={GREY}>câbles</Mono>
          </div>
        ) : null}
        {frame >= BEAT * 13.6 ? (
          <div style={{transform: `scale(${0.7 + 0.3 * f2})`, display: 'flex', alignItems: 'baseline', gap: 20, whiteSpace: 'nowrap'}}>
            <Mono size={52} color="#fff">6 + 10 000 =</Mono>
            <Mono size={76} color={AC}>10 006</Mono>
            <Mono size={32} color={GREY}>prises</Mono>
          </div>
        ) : null}
      </div>
      <div style={{height: 150}}>
        <Pop at={BEAT * 11}><Say size={56}>Avec MCP, chaque application et chaque serveur ont <Hi color={AC}>leur propre prise</Hi>, et un seul branchement suffit à chacun.</Say></Pop>
      </div>
    </Scene>
  );
};

// Lire la liste des outils et ne garder que les droits utiles.
const TOOLS = [
  {name: 'lire_ticket', kind: 'lecture', ok: true},
  {name: 'lister_dépôts', kind: 'lecture', ok: true},
  {name: 'créer_dépôt', kind: 'écriture', ok: false},
  {name: 'supprimer_dépôt', kind: 'écriture', ok: false},
];

const EtDonc: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Scene gap={40}>
      <Pop at={0}><Say size={56}>Et donc, avant de brancher un serveur MCP, lis la liste des outils qu'il expose et ne lui laisse que <Hi color={AC}>les droits dont ta tâche a besoin.</Hi></Say></Pop>
      <Pop at={BEAT * 1.2} style={{border: '4px solid #444', borderRadius: 28, padding: '22px 28px', display: 'flex', flexDirection: 'column', gap: 14}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
          <Mono size={34} color="#fff">serveur MCP</Mono>
          <Mono size={28} color="#8a8a8a">tools</Mono>
        </div>
        {TOOLS.map((t, k) => {
          const at = BEAT * 2 + k * BEAT * 1;
          const verdict = at + 12;
          const p = interpolate(frame, [verdict, verdict + 8], [0, 1], clamp);
          return (
            <Pop key={t.name} at={at} style={{display: 'flex', alignItems: 'center', gap: 20, borderTop: '3px solid #2a2a2a', paddingTop: 12, height: 86}}>
              <div style={{flex: 1}}><Mono size={38} color={frame >= verdict && !t.ok ? '#666' : '#fff'}>{t.name}</Mono></div>
              <Mono size={26} color={GREY}>{t.kind}</Mono>
              <div style={{width: 100, display: 'flex', justifyContent: 'center'}}>
                {frame < verdict ? <EyeA look={Math.sin((frame - at) / 3)} size={86} /> : t.ok ? <CheckA p={p} size={72} /> : <LockA p={p} size={64} color={RED} />}
              </div>
            </Pop>
          );
        })}
      </Pop>
    </Scene>
  );
};

// La prise ne filtre rien : un paquet piégé passe comme les autres.
const Chute: React.FC = () => {
  const frame = useCurrentFrame();
  const W = 888;
  const cable = useProg(BEAT * 0.8, BEAT * 1.6);
  const bad = frame >= BEAT * 3.6;
  // Paquets en boucle continue sur le câble.
  const packets = [0, 1, 2, 3].map((k) => {
    const t = (frame - BEAT * 1.6) / 50 + k / 4;
    return {k, x: t < 0 ? -1 : t % 1};
  });
  return (
    <Scene gap={50}>
      <Pop at={0}><Say size={62}>Une prise standard ne dit pourtant rien de <Hi color={AC}>ce qui passe dans le câble.</Hi></Say></Pop>
      <div style={{position: 'relative'}}>
        <svg width={W} height={220} viewBox={`0 0 ${W} 220`} style={{display: 'block', overflow: 'visible'}}>
          <Node x={0} y={60} w={200} h={100} label="serveur" size={30} />
          <Node x={W - 200} y={60} w={200} h={100} label="agent" size={30} hi />
          <line x1={200} y1={110} x2={200 + (W - 400) * cable} y2={110} stroke={AC} strokeWidth={6} />
          {cable >= 1
            ? packets.map(({k, x}) => {
                if (x < 0 || x > 1) return null;
                const isBad = bad && k === 2;
                return <rect key={k} x={210 + (W - 460) * x} y={92} width={40} height={36} rx={6} fill={isBad ? RED : '#fff'} />;
              })
            : null}
          {cable >= 1 ? <Plug x={W / 2 + 37} y={110} on={0} /> : null}
        </svg>
      </div>
      <div style={{height: 260}}>
        <Pop at={BEAT * 4.4} style={{display: 'flex', alignItems: 'flex-start', gap: 28}}>
          <div style={{flex: 'none', width: 40, height: 36, marginTop: 18, borderRadius: 6, background: RED}} />
          <Say size={52}>En mai 2025, un ticket piégé sur GitHub a suffi à pousser un agent branché par MCP à recopier des dépôts privés <Hi color={RED}>dans un dépôt public.</Hi></Say>
        </Pop>
      </div>
    </Scene>
  );
};

const SCENES: Scenes = [
  [Question, 60],
  [Reponse, 180],
  [Frise, 195],
  [Calcul, 255],
  [EtDonc, 135],
  [Chute, 135],
];

export const MCP_DURATION = totalDuration(SCENES);

export const Mcp: React.FC = () => <ShortA scenes={SCENES} />;

// Entrée Remotion propre au short MCP (n'utilise pas le Root partagé).
import React from 'react';
import {Composition, registerRoot} from 'remotion';
import {Mcp, MCP_DURATION} from './Mcp';

const RootMcp: React.FC = () => (
  <Composition id="Mcp" component={Mcp} durationInFrames={MCP_DURATION} fps={30} width={1080} height={1920} />
);

registerRoot(RootMcp);

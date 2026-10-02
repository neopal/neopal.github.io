// Entrée Remotion propre au short Harness (n'utilise pas le Root partagé).
import React from 'react';
import {Composition, registerRoot} from 'remotion';
import {Harness, HARNESS_DURATION} from './Harness';

const RootHarness: React.FC = () => (
  <Composition id="Harness" component={Harness} durationInFrames={HARNESS_DURATION} fps={30} width={1080} height={1920} />
);

registerRoot(RootHarness);

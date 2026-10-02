// Entrée Remotion propre au short Benchmaxxing (ne touche pas au Root partagé).
import React from 'react';
import {Composition, registerRoot} from 'remotion';
import {Benchmaxxing, BENCHMAXXING_DURATION} from './Benchmaxxing';

const Root: React.FC = () => (
  <Composition id="Benchmaxxing" component={Benchmaxxing} durationInFrames={BENCHMAXXING_DURATION} fps={30} width={1080} height={1920} />
);

registerRoot(Root);

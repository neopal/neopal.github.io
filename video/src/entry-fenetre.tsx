// Entrée Remotion propre au short Fenêtre de contexte (ne touche pas au Root partagé).
import React from 'react';
import {Composition, registerRoot} from 'remotion';
import {Fenetre, FENETRE_DURATION} from './Fenetre';

const Root: React.FC = () => (
  <Composition id="Fenetre" component={Fenetre} durationInFrames={FENETRE_DURATION} fps={30} width={1080} height={1920} />
);

registerRoot(Root);

import React from 'react';
import {Composition} from 'remotion';
import {Token, TOKEN_DURATION} from './Token';
import {Parametres, PARAMETRES_DURATION} from './Parametres';
import {Hallucination, HALLUCINATION_DURATION} from './Hallucination';

export const Root: React.FC = () => (
  <>
    <Composition id="Token" component={Token} durationInFrames={TOKEN_DURATION} fps={30} width={1080} height={1920} />
    <Composition id="Parametres" component={Parametres} durationInFrames={PARAMETRES_DURATION} fps={30} width={1080} height={1920} />
    <Composition id="Hallucination" component={Hallucination} durationInFrames={HALLUCINATION_DURATION} fps={30} width={1080} height={1920} />
  </>
);

import React from 'react';
import {Composition} from 'remotion';
import {Token, TOKEN_DURATION} from './Token';

export const Root: React.FC = () => (
  <Composition id="Token" component={Token} durationInFrames={TOKEN_DURATION} fps={30} width={1080} height={1920} />
);

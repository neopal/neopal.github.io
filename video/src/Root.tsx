import React from 'react';
import {Composition} from 'remotion';
import {Token, TOKEN_DURATION} from './Token';
import {Parametres, PARAMETRES_DURATION} from './Parametres';
import {Hallucination, HALLUCINATION_DURATION} from './Hallucination';
import {Harness, HARNESS_DURATION} from './Harness';
import {Mcp, MCP_DURATION} from './Mcp';
import {Benchmaxxing, BENCHMAXXING_DURATION} from './Benchmaxxing';
import {Fenetre, FENETRE_DURATION} from './Fenetre';
import {Prediction, PREDICTION_DURATION} from './Prediction';
import {Temperature, TEMPERATURE_DURATION} from './Temperature';
import {Rag, RAG_DURATION} from './Rag';
import {Embedding, EMBEDDING_DURATION} from './Embedding';
import {Agent, AGENT_DURATION} from './Agent';
import {ContextRot, CONTEXTROT_DURATION} from './ContextRot';
import {SansEtat, SANSETAT_DURATION} from './SansEtat';
import {Nondeterminisme, NONDETERMINISME_DURATION} from './Nondeterminisme';

// Les shorts dans une seule entrée (stills et rendus partagent le même bundle).
const C = {fps: 30, width: 1080, height: 1920} as const;

export const Root: React.FC = () => (
  <>
    <Composition id="Token" component={Token} durationInFrames={TOKEN_DURATION} {...C} />
    <Composition id="Parametres" component={Parametres} durationInFrames={PARAMETRES_DURATION} {...C} />
    <Composition id="Hallucination" component={Hallucination} durationInFrames={HALLUCINATION_DURATION} {...C} />
    <Composition id="Harness" component={Harness} durationInFrames={HARNESS_DURATION} {...C} />
    <Composition id="Mcp" component={Mcp} durationInFrames={MCP_DURATION} {...C} />
    <Composition id="Benchmaxxing" component={Benchmaxxing} durationInFrames={BENCHMAXXING_DURATION} {...C} />
    <Composition id="Fenetre" component={Fenetre} durationInFrames={FENETRE_DURATION} {...C} />
    <Composition id="Prediction" component={Prediction} durationInFrames={PREDICTION_DURATION} {...C} />
    <Composition id="Temperature" component={Temperature} durationInFrames={TEMPERATURE_DURATION} {...C} />
    <Composition id="Rag" component={Rag} durationInFrames={RAG_DURATION} {...C} />
    <Composition id="Embedding" component={Embedding} durationInFrames={EMBEDDING_DURATION} {...C} />
    <Composition id="Agent" component={Agent} durationInFrames={AGENT_DURATION} {...C} />
    <Composition id="ContextRot" component={ContextRot} durationInFrames={CONTEXTROT_DURATION} {...C} />
    <Composition id="SansEtat" component={SansEtat} durationInFrames={SANSETAT_DURATION} {...C} />
    <Composition id="Nondeterminisme" component={Nondeterminisme} durationInFrames={NONDETERMINISME_DURATION} {...C} />
  </>
);

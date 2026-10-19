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
import {Mythe95, MYTHE95_DURATION} from './Mythe95';
import {Hammer, HAMMER_DURATION} from './Hammer';
import {Nondeterminisme, NONDETERMINISME_DURATION} from './Nondeterminisme';
import {OpenWeights, OPENWEIGHTS_DURATION} from './OpenWeights';
import {PredictionVoix, PREDICTIONVOIX_DURATION} from './PredictionVoix';
import {HallucinationVoix, HALLUCINATIONVOIX_DURATION} from './HallucinationVoix';
import {MytheExistePasVoix, MYTHEEXISTEPASVOIX_DURATION} from './MytheExistePasVoix';
import {MytheBaseVoix, MYTHEBASEVOIX_DURATION} from './MytheBaseVoix';
import {TemperatureVoix, TEMPERATUREVOIX_DURATION} from './TemperatureVoix';
import {FenetreVoix, FENETREVOIX_DURATION} from './FenetreVoix';
import {MytheConversationsVoix, MYTHECONVERSATIONSVOIX_DURATION} from './MytheConversationsVoix';
import {MytheTauxVoix, MYTHETAUXVOIX_DURATION} from './MytheTauxVoix';
import {RagVoix, RAGVOIX_DURATION} from './RagVoix';
import {MytheLitVoix, MYTHELITVOIX_DURATION} from './MytheLitVoix';
import {AgentVoix, AGENTVOIX_DURATION} from './AgentVoix';
import {MytheModeleVoix, MYTHEMODELEVOIX_DURATION} from './MytheModeleVoix';
import {AiSlopVoix, AISLOPVOIX_DURATION} from './AiSlopVoix';
import {MytheCalculeVoix, MYTHECALCULEVOIX_DURATION} from './MytheCalculeVoix';
import {AgiVoix, AGIVOIX_DURATION} from './AgiVoix';
import {MytheSaitPasVoix, MYTHESAITPASVOIX_DURATION} from './MytheSaitPasVoix';
import {PDoomVoix, PDOOMVOIX_DURATION} from './PDoomVoix';
import {MytheScoreVoix, MYTHESCOREVOIX_DURATION} from './MytheScoreVoix';

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
    <Composition id="Mythe95" component={Mythe95} durationInFrames={MYTHE95_DURATION} {...C} />
    <Composition id="Hammer" component={Hammer} durationInFrames={HAMMER_DURATION} {...C} />
    <Composition id="Nondeterminisme" component={Nondeterminisme} durationInFrames={NONDETERMINISME_DURATION} {...C} />
    <Composition id="OpenWeights" component={OpenWeights} durationInFrames={OPENWEIGHTS_DURATION} {...C} />
    <Composition id="PredictionVoix" component={PredictionVoix} durationInFrames={PREDICTIONVOIX_DURATION} {...C} />
    <Composition id="HallucinationVoix" component={HallucinationVoix} durationInFrames={HALLUCINATIONVOIX_DURATION} {...C} />
    <Composition id="MytheExistePasVoix" component={MytheExistePasVoix} durationInFrames={MYTHEEXISTEPASVOIX_DURATION} {...C} />
    <Composition id="MytheBaseVoix" component={MytheBaseVoix} durationInFrames={MYTHEBASEVOIX_DURATION} {...C} />
    <Composition id="TemperatureVoix" component={TemperatureVoix} durationInFrames={TEMPERATUREVOIX_DURATION} {...C} />
    <Composition id="FenetreVoix" component={FenetreVoix} durationInFrames={FENETREVOIX_DURATION} {...C} />
    <Composition id="MytheConversationsVoix" component={MytheConversationsVoix} durationInFrames={MYTHECONVERSATIONSVOIX_DURATION} {...C} />
    <Composition id="MytheTauxVoix" component={MytheTauxVoix} durationInFrames={MYTHETAUXVOIX_DURATION} {...C} />
    <Composition id="RagVoix" component={RagVoix} durationInFrames={RAGVOIX_DURATION} {...C} />
    <Composition id="MytheLitVoix" component={MytheLitVoix} durationInFrames={MYTHELITVOIX_DURATION} {...C} />
    <Composition id="AgentVoix" component={AgentVoix} durationInFrames={AGENTVOIX_DURATION} {...C} />
    <Composition id="MytheModeleVoix" component={MytheModeleVoix} durationInFrames={MYTHEMODELEVOIX_DURATION} {...C} />
    <Composition id="AiSlopVoix" component={AiSlopVoix} durationInFrames={AISLOPVOIX_DURATION} {...C} />
    <Composition id="MytheCalculeVoix" component={MytheCalculeVoix} durationInFrames={MYTHECALCULEVOIX_DURATION} {...C} />
    <Composition id="AgiVoix" component={AgiVoix} durationInFrames={AGIVOIX_DURATION} {...C} />
    <Composition id="MytheSaitPasVoix" component={MytheSaitPasVoix} durationInFrames={MYTHESAITPASVOIX_DURATION} {...C} />
    <Composition id="PDoomVoix" component={PDoomVoix} durationInFrames={PDOOMVOIX_DURATION} {...C} />
    <Composition id="MytheScoreVoix" component={MytheScoreVoix} durationInFrames={MYTHESCOREVOIX_DURATION} {...C} />
  </>
);

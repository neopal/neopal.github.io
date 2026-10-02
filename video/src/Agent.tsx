// Short Agent (fiche agent) : en cours d'écriture.
import React from 'react';
import {Say, Scene, Scenes, Short, totalDuration} from './kit';

const Brouillon: React.FC = () => <Scene caps={[[0, 'Short en cours de production.']]} />;

const SCENES: Scenes = [[Brouillon, 120]];

export const AGENT_DURATION = totalDuration(SCENES);

export const Agent: React.FC = () => <Short title={['À venir', 'agent']} scenes={SCENES} />;

// Short Rag (fiche rag) : en cours d'écriture.
import React from 'react';
import {Say, Scene, Scenes, Short, totalDuration} from './kit';

const Brouillon: React.FC = () => <Scene caps={[[0, 'Short en cours de production.']]} />;

const SCENES: Scenes = [[Brouillon, 120]];

export const RAG_DURATION = totalDuration(SCENES);

export const Rag: React.FC = () => <Short title={['À venir', 'rag']} scenes={SCENES} />;

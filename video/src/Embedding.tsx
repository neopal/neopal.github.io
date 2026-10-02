// Short Embedding (fiche embedding) : en cours d'écriture.
import React from 'react';
import {Say, Scene, Scenes, Short, totalDuration} from './kit';

const Brouillon: React.FC = () => <Scene caps={[[0, 'Short en cours de production.']]} />;

const SCENES: Scenes = [[Brouillon, 120]];

export const EMBEDDING_DURATION = totalDuration(SCENES);

export const Embedding: React.FC = () => <Short title={['À venir', 'embedding']} scenes={SCENES} />;

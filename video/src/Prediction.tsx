// Short Prediction (fiche prediction-du-mot-suivant) : en cours d'écriture.
import React from 'react';
import {Say, Scene, Scenes, Short, totalDuration} from './kit';

const Brouillon: React.FC = () => <Scene caps={[[0, 'Short en cours de production.']]} />;

const SCENES: Scenes = [[Brouillon, 120]];

export const PREDICTION_DURATION = totalDuration(SCENES);

export const Prediction: React.FC = () => <Short title={['À venir', 'prediction-du-mot-suivant']} scenes={SCENES} />;

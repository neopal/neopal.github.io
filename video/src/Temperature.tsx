// Short Temperature (fiche temperature) : en cours d'écriture.
import React from 'react';
import {Say, Scene, Scenes, Short, totalDuration} from './kit';

const Brouillon: React.FC = () => <Scene caps={[[0, 'Short en cours de production.']]} />;

const SCENES: Scenes = [[Brouillon, 120]];

export const TEMPERATURE_DURATION = totalDuration(SCENES);

export const Temperature: React.FC = () => <Short title={['À venir', 'temperature']} scenes={SCENES} />;

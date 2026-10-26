// Personnages en pixel art des shorts à voix off : l'image d'un short montre ses personnages, pas seulement
// leurs objets (univers.md, « L'écran suit la voix »). Un sprite est une grille de lettres, une lettre = une couleur.
// Un seul détail vivant par personnage (secondary action, univers.md « Le mouvement ») : il cligne des yeux.
import React from 'react';
import {useCurrentFrame} from 'remotion';

export type Sprite = {rows: string[]; palette: Record<string, string>};

// Clignement : les yeux (lettre E) prennent la couleur de la peau pendant 3 images, toutes les 2,5 s environ ;
// `seed` décale le rythme d'un personnage à l'autre.
export const Pixel: React.FC<{sprite: Sprite; px: number; seed?: number; style?: React.CSSProperties}> = ({sprite, px, seed = 0, style}) => {
  const frame = useCurrentFrame();
  const closed = (frame + seed * 23) % 76 >= 73;
  const palette = closed ? {...sprite.palette, E: sprite.palette.S} : sprite.palette;
  const h = sprite.rows.length;
  const w = Math.max(...sprite.rows.map((r) => r.length));
  return (
    <svg width={w * px} height={h * px} viewBox={`0 0 ${w} ${h}`} shapeRendering="crispEdges" style={style}>
      {sprite.rows.flatMap((r, y) =>
        [...r].map((c, x) => (palette[c] ? <rect key={`${x}-${y}`} x={x} y={y} width={1.02} height={1.02} fill={palette[c]} /> : null)),
      )}
    </svg>
  );
};

const SKIN = '#e3b58e';

// Le patron du bar : moustache, chemise blanche, tablier, torchon sur l'épaule.
export const PATRON: Sprite = {
  rows: [
    '....HHHH....',
    '...HHHHHH...',
    '...SSSSSS...',
    '...SESSES...',
    '...SSSSSS...',
    '...SMMMMS...',
    '....SSSS....',
    '..WWWWWWWT..',
    '.WWAAAAAAWT.',
    '.WWAAAAAAWT.',
    '.SWAAAAAAWS.',
    '.SWAAAAAAWS.',
    '...AAAAAA...',
    '...AAAAAA...',
  ],
  palette: {H: '#4a4a4a', S: SKIN, E: '#111', M: '#3a2a1a', W: '#f2f2f2', A: '#2f2f2f', T: '#d9534f'},
};

// Nadia, la coiffeuse : cheveux longs bruns, haut couleur prune.
export const NADIA: Sprite = {
  rows: [
    '...HHHHHH...',
    '..HHHHHHHH..',
    '..HSSSSSSH..',
    '..HSESSESH..',
    '..HSSSSSSH..',
    '..HSSRRSSH..',
    '..HHSSSSHH..',
    '..HHTTTTHH..',
    '.TTTTTTTTTT.',
    '.TTTTTTTTTT.',
    '.STTTTTTTTS.',
    '.STTTTTTTTS.',
    '...TTTTTT...',
    '...TTTTTT...',
  ],
  palette: {H: '#4b2e1e', S: SKIN, E: '#111', R: '#b5524f', T: '#8e4a7a'},
};

// Sa remplaçante : cheveux courts blonds, haut vert.
export const REMPLACANTE: Sprite = {
  rows: [
    '....YYYY....',
    '...YYYYYY...',
    '...YSSSSY...',
    '...SESSES...',
    '...SSSSSS...',
    '...SSRRSS...',
    '....SSSS....',
    '....SSSS....',
    '.GGGGGGGGGG.',
    '.GGGGGGGGGG.',
    '.SGGGGGGGGS.',
    '.SGGGGGGGGS.',
    '...GGGGGG...',
    '...GGGGGG...',
  ],
  palette: {Y: '#e8c45a', S: SKIN, E: '#111', R: '#b5524f', G: '#4f8a5b'},
};

// Thierry, le collègue de la machine à café : lunettes, chemise bleue, cravate.
export const COLLEGUE: Sprite = {
  rows: [
    '....HHHH....',
    '...HHHHHH...',
    '...SSSSSS...',
    '...GEGGEG...',
    '...SSSSSS...',
    '...SSRRSS...',
    '....SSSS....',
    '..BBBKKBBB..',
    '.BBBBKKBBBB.',
    '.BBBBKKBBBB.',
    '.SBBBKKBBBS.',
    '.SBBBBBBBBS.',
    '...BBBBBB...',
    '...BBBBBB...',
  ],
  palette: {H: '#8a8a8a', S: SKIN, E: '#111', G: '#2b2b2b', R: '#b5524f', B: '#5b7fb5', K: '#7a2a2a'},
};

// Sylvie : carré noir, veste grise.
export const SYLVIE: Sprite = {
  rows: [
    '...HHHHHH...',
    '..HHHHHHHH..',
    '..HHSSSSHH..',
    '..HSESSESH..',
    '..HSSSSSSH..',
    '..HSSRRSSH..',
    '..HHSSSSHH..',
    '....SSSS....',
    '.VVVVWWVVVV.',
    '.VVVVWWVVVV.',
    '.SVVVWWVVVS.',
    '.SVVVVVVVVS.',
    '...VVVVVV...',
    '...VVVVVV...',
  ],
  palette: {H: '#1e1e1e', S: SKIN, E: '#111', R: '#b5524f', V: '#6a6a6a', W: '#f2f2f2'},
};

// L'assistante de Sylvie : queue de cheval rousse, pull jaune.
export const ASSISTANTE: Sprite = {
  rows: [
    '....HHHH..H.',
    '...HHHHHHHH.',
    '...SSSSSS.H.',
    '...SESSES...',
    '...SSSSSS...',
    '...SSRRSS...',
    '....SSSS....',
    '....SSSS....',
    '.JJJJJJJJJJ.',
    '.JJJJJJJJJJ.',
    '.SJJJJJJJJS.',
    '.SJJJJJJJJS.',
    '...JJJJJJ...',
    '...JJJJJJ...',
  ],
  palette: {H: '#c2602b', S: SKIN, E: '#111', R: '#b5524f', J: '#d9a52b'},
};

// Madame Lemoine, la prof : chignon gris, lunettes, gilet vert sapin.
export const LEMOINE: Sprite = {
  rows: [
    '.....HH.....',
    '...HHHHHH...',
    '..HHHHHHHH..',
    '..HSSSSSSH..',
    '...GEGGEG...',
    '...SSSSSS...',
    '...SSRRSS...',
    '....SSSS....',
    '.CCCCWWCCCC.',
    '.CCCCWWCCCC.',
    '.SCCCWWCCCS.',
    '.SCCCCCCCCS.',
    '...CCCCCC...',
    '...CCCCCC...',
  ],
  palette: {H: '#b9b9b9', S: SKIN, E: '#111', G: '#2b2b2b', R: '#b5524f', C: '#3f6b4f', W: '#f2f2f2'},
};

// Le fils de Nadine : mèche brune, sweat orange.
export const FILS: Sprite = {
  rows: [
    '...HHHHH....',
    '..HHHHHHHH..',
    '...HSSSSSH..',
    '...SESSES...',
    '...SSSSSS...',
    '...SSRRSS...',
    '....SSSS....',
    '..OOOOOOOO..',
    '.OOOOOOOOOO.',
    '.OOOOOOOOOO.',
    '.SOOOOOOOOS.',
    '.SOOOOOOOOS.',
    '...OOOOOO...',
    '...OOOOOO...',
  ],
  palette: {H: '#5a3a22', S: SKIN, E: '#111', R: '#b5524f', O: '#e07b39'},
};

// Le DJ du mariage : casque sur les oreilles, chemise noire.
export const DJ: Sprite = {
  rows: [
    '...HHHHHH...',
    '..PHHHHHHP..',
    '.PPSSSSSSPP.',
    '.PPSESSESPP.',
    '..PSSSSSSP..',
    '...SSRRSS...',
    '....SSSS....',
    '....SSSS....',
    '.NNNNNNNNNN.',
    '.NNNNNNNNNN.',
    '.SNNNNNNNNS.',
    '.SNNNNNNNNS.',
    '...NNNNNN...',
    '...NNNNNN...',
  ],
  palette: {H: '#2a2a2a', P: '#8FB8FF', S: SKIN, E: '#111', R: '#b5524f', N: '#3a3a3a'},
};

// Patrick, qui efface le tableau blanc : crâne dégarni, polo rouge.
export const PATRICK: Sprite = {
  rows: [
    '............',
    '...H....H...',
    '...SSSSSS...',
    '...SESSES...',
    '...SSSSSS...',
    '...SSRRSS...',
    '....SSSS....',
    '....SSSS....',
    '.LLLLLLLLLL.',
    '.LLLLLLLLLL.',
    '.SLLLLLLLLS.',
    '.SLLLLLLLLS.',
    '...LLLLLL...',
    '...LLLLLL...',
  ],
  palette: {H: '#7a7a7a', S: SKIN, E: '#111', R: '#b5524f', L: '#b53a3a'},
};

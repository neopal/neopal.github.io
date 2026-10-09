# Compte les lignes de chaque sous-titre des shorts à voix off, tel que le navigateur les coupera :
# Newsreader 600 à 84 px, interlettrage -0,01 em, sur la largeur des sous-titres (1080 - 2 x 96 = 888 px).
# Les largeurs viennent des avances de la police (fontTools) ; le crénage est ignoré, d'où une marge de 2 %.
# Usage (depuis video/) : node tools/dump-chunks.mjs <id> | python -I tools/caption-lines.py <police.woff2>
# La police : le fichier « latin » de Newsreader listé dans node_modules/@remotion/google-fonts/dist/esm/Newsreader.mjs.
import json
import sys

from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

SIZE, SPACING, WIDTH, MARGIN = 84, -0.01, 1080 - 2 * 96, 0.98

font = instancer.instantiateVariableFont(TTFont(sys.argv[1]), {'wght': 600})
upm = font['head'].unitsPerEm
cmap = font.getBestCmap()
hmtx = font['hmtx']


def width(text):
    adv = sum(hmtx[cmap.get(ord(c), cmap[ord('?')])][0] for c in text)
    return adv * SIZE / upm + SPACING * SIZE * len(text)


def lines(words):
    n, cur = 1, ''
    for w in words:
        trial = (cur + ' ' + w) if cur else w
        if cur and width(trial) > WIDTH * MARGIN:
            n, cur = n + 1, w
        else:
            cur = trial
    return n


bad = 0
sys.stdout.reconfigure(encoding='utf-8')
# Lecture en UTF-8 explicite : sous Windows, stdin est en cp1252 et chaque lettre accentuée compterait double.
for c in json.loads(sys.stdin.buffer.read().decode('utf-8')):
    if c['quote']:
        continue
    n = lines(c['words'])
    flag = '  <<< 3 LIGNES' if n > 2 else ''
    bad += n > 2
    print(f"{n} l. {len(c['text']):2d} car. « {c['text']} »{flag}")
print(f'{bad} sous-titre(s) sur plus de 2 lignes')
sys.exit(1 if bad else 0)

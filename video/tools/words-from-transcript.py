# Voix générée hors du flow (prise exportée par PA, puis importée et transcrite) : Scribe transcrit ce qu'il entend,
# avec sa ponctuation et sans la phonétique (« memory » pour « /ˈmɛməɹi/ »). Ce script reporte ses temps sur les mots
# du script, pour que align-from-words.mjs retrouve le texte exact.
# Usage (depuis video/) : python -I tools/words-from-transcript.py <id>
# Lit src/voix/<id>.script.json et src/voix/<id>.words.json (la transcription brute, gardée en <id>.scribe.json),
# réécrit src/voix/<id>.words.json avec un mot par mot du script.
import difflib, json, re, sys, unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
vid = sys.argv[1]
script = json.loads((ROOT / 'src/voix' / f'{vid}.script.json').read_text(encoding='utf-8'))
words_path = ROOT / 'src/voix' / f'{vid}.words.json'
scribe_path = ROOT / 'src/voix' / f'{vid}.scribe.json'
if not scribe_path.exists():
    scribe_path.write_text(words_path.read_text(encoding='utf-8'), encoding='utf-8')
heard = [w for w in json.loads(scribe_path.read_text(encoding='utf-8'))['words'] if w['type'] == 'word' and not re.fullmatch(r'\[.*\]', w['text'])]

def norm(s):
    s = unicodedata.normalize('NFC', re.sub(r'\[[^\]]*\]', '', s).lower())
    return ''.join(c for c in s if c.isalnum())

# Le texte entendu, lettre par lettre, chaque lettre rattachée au mot qui la porte.
h_chars, h_owner = [], []
for i, w in enumerate(heard):
    for c in norm(w['text']):
        h_chars.append(c); h_owner.append(i)

# Les mots du script (les indications de jeu ne sont pas dites).
tokens = [t for s in script['segments'] for t in s['say'].split() if not re.fullmatch(r'\[[^\]]*\]', t)]
s_chars, s_owner = [], []
for i, t in enumerate(tokens):
    for c in norm(t):
        s_chars.append(c); s_owner.append(i)

# Chaque lettre du script reçoit la position de la lettre entendue qui lui correspond (ou la plus proche avant).
sm = difflib.SequenceMatcher(None, s_chars, h_chars, autojunk=False)
pos = [None] * len(s_chars)
for a, b, n in sm.get_matching_blocks():
    for j in range(n):
        pos[a + j] = b + j
ratio = sm.ratio()

out, first = [], {}
for ci, ti in enumerate(s_owner):
    first.setdefault(ti, ci)
end_of = {}
for ci, ti in enumerate(s_owner):
    end_of[ti] = ci
matched = lambda ti: any(pos[c] is not None for c in range(first[ti], end_of[ti] + 1))

def owner_near(ci, step):
    # Mot entendu de la lettre appariée la plus proche, avant (step -1) ou après (step 1).
    while 0 <= ci < len(pos) and pos[ci] is None:
        ci += step
    return h_owner[pos[ci]] if 0 <= ci < len(pos) else (0 if step < 0 else len(heard) - 1)

for ti, t in enumerate(tokens):
    if ti in first and matched(ti):
        a = owner_near(first[ti], 1)
        b = owner_near(end_of[ti], -1)
        start, end = heard[a]['start'], heard[max(a, b)]['end']
    elif ti in first:  # dit autrement (« quatre-vingt » pour « 80 ») : les mots entendus entre les deux voisins appariés
        a = owner_near(first[ti], -1)
        b = owner_near(end_of[ti], 1)
        inside = heard[a + 1:b] or [heard[a]]
        start, end = inside[0]['start'], inside[-1]['end']
    else:  # ponctuation seule (« ou »), collée au mot d'avant
        start = end = out[-1]['end'] if out else 0
    out.append({'text': t, 'type': 'word', 'start': start, 'end': max(end, start)})

words_path.write_text(json.dumps({'words': out, 'source': 'words-from-transcript', 'match': round(ratio, 3)}, ensure_ascii=False), encoding='utf-8')
print(f'{vid} : {len(tokens)} mots du script, {len(heard)} entendus, correspondance des lettres {ratio:.1%}')

// Confere se o material impresso (colors.js) bate com o app (index.html)
// e com o lib.js dos pôsteres de violão, trompete e flauta.
// Uso: node cheatsheet/check-colors.js
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { EGUCHI_COLORS, noteToMidi } = require('./colors.js');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const grab = (name) => {
  const m = html.match(new RegExp(`const ${name} = ([\\[{][\\s\\S]*?\\n[\\]}]);`));
  if (!m) throw new Error(`${name} não encontrado em index.html`);
  return vm.runInNewContext(`(${m[1]})`);
};
const CHORDS = grab('CHORDS');
const KID_INFO = grab('KID_INFO');
const norm = (s) => s.toLowerCase();
const freqToMidi = (f) => Math.round(69 + 12 * Math.log2(f / 440));

const errors = [];
if (CHORDS.length !== EGUCHI_COLORS.length) errors.push(`app tem ${CHORDS.length} cores, impresso tem ${EGUCHI_COLORS.length}`);
CHORDS.forEach((c, i) => {
  const p = EGUCHI_COLORS[i];
  if (!p) return;
  const where = `#${i + 1} ${c.name}`;
  if (p.id !== c.id) errors.push(`${where}: id ${p.id} ≠ ${c.id}`);
  if (p.name !== c.name) errors.push(`${where}: nome ${p.name} ≠ ${c.name}`);
  if (norm(p.hex) !== norm(c.hex)) errors.push(`${where}: cor ${p.hex} ≠ ${c.hex}`);
  if (norm(p.chord) !== norm(c.chord)) errors.push(`${where}: acorde ${p.chord} ≠ ${c.chord}`);
  if (p.chordSym !== c.chordSym) errors.push(`${where}: cifra ${p.chordSym} ≠ ${c.chordSym}`);
  if (p.notesPt.join() !== c.notes.join()) errors.push(`${where}: notas ${p.notesPt} ≠ ${c.notes}`);
  const appMidi = c.freqs.map(freqToMidi).join();
  const prMidi = p.notes.map(noteToMidi).join();
  if (appMidi !== prMidi) errors.push(`${where}: teclas ${p.notes} não soam como o app`);
  const k = KID_INFO[c.id];
  if (!k) errors.push(`${where}: sem KID_INFO no app`);
  else {
    if (k.emoji !== p.emoji) errors.push(`${where}: emoji ${p.emoji} ≠ ${k.emoji}`);
    if (k.desc !== p.kid) errors.push(`${where}: frase infantil difere do app`);
  }
});
// lib.js (pôsteres dos outros instrumentos): mesmas cores, cifras e teclas
const lib = fs.readFileSync(path.join(__dirname, 'lib.js'), 'utf8');
const lm = lib.match(/const VOICINGS = (\[[\s\S]*?\n\]);/);
if (!lm) errors.push('VOICINGS não encontrado em lib.js');
else {
  const VOICINGS = vm.runInNewContext(`(${lm[1]})`);
  if (VOICINGS.length !== EGUCHI_COLORS.length) errors.push(`lib.js tem ${VOICINGS.length} voicings, impresso tem ${EGUCHI_COLORS.length}`);
  EGUCHI_COLORS.forEach(p => {
    const v = VOICINGS.find(x => x.name === p.name);
    if (!v) { errors.push(`lib.js: falta ${p.name}`); return; }
    if (norm(v.hex) !== norm(p.hex)) errors.push(`lib.js ${p.name}: cor ${v.hex} ≠ ${p.hex}`);
    if (v.chordSym !== p.chordSym) errors.push(`lib.js ${p.name}: cifra ${v.chordSym} ≠ ${p.chordSym}`);
    if (v.notes.join() !== p.notes.join()) errors.push(`lib.js ${p.name}: teclas ${v.notes} ≠ ${p.notes}`);
    if (v.introOrder !== p.level - 1) errors.push(`lib.js ${p.name}: ordem ${v.introOrder + 1} ≠ ${p.level}`);
  });
}

if (errors.length) {
  console.error('✗ Material impresso fora de sincronia com o app:\n  ' + errors.join('\n  '));
  process.exit(1);
}
console.log(`✓ ${EGUCHI_COLORS.length} cores coerentes entre app, colors.js e lib.js`);

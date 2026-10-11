// Confere se o material impresso (colors.js) bate com o app (index.html).
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
if (errors.length) {
  console.error('✗ Material impresso fora de sincronia com o app:\n  ' + errors.join('\n  '));
  process.exit(1);
}
console.log(`✓ ${EGUCHI_COLORS.length} cores coerentes entre app e material impresso`);

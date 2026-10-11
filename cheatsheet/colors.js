// Eguchi · fonte única das cores para o material impresso
// ---------------------------------------------------------
// Mesmas 12 cores, na mesma ordem, do app (index.html → CHORDS + KID_INFO).
// Nome, cor (hex), acorde e notas TÊM de bater com o app: rode
//   node cheatsheet/check-colors.js
// depois de mudar qualquer um dos dois lados.

const EGUCHI_COLORS = [
  // ---- 8 cores Eguchi (níveis 1-8 do app) ----
  { id: 'red', level: 1, name: 'Vermelho', kanji: '赤', emoji: '🍎', hex: '#c8332a', text: '#fff',
    chord: 'Dó maior', chordSym: 'C', notes: ['C4', 'E4', 'G4'], notesPt: ['Dó', 'Mi', 'Sol'],
    role: 'I · o lar', kid: 'É o som de casa: firme e feliz. As músicas adoram terminar nele!' },
  { id: 'white', level: 2, name: 'Branco', kanji: '白', emoji: '☁️', hex: '#f0e8db', text: '#1a1614',
    chord: 'Sol maior', chordSym: 'G', notes: ['G4', 'B4', 'D5'], notesPt: ['Sol', 'Si', 'Ré'],
    role: 'V · quer voltar pra casa', kid: 'Brilhante como nuvem no sol. Parece que quer voltar pra casa.' },
  { id: 'yellow', level: 3, name: 'Amarelo', kanji: '黄', emoji: '🌻', hex: '#e8b637', text: '#1a1614',
    chord: 'Fá maior', chordSym: 'F', notes: ['F4', 'A4', 'C5'], notesPt: ['Fá', 'Lá', 'Dó'],
    role: 'IV · abraço', kid: 'Quentinho e gostoso, como um abraço.' },
  { id: 'green', level: 4, name: 'Verde', kanji: '緑', emoji: '🌳', hex: '#3a7d44', text: '#fff',
    chord: 'Ré menor', chordSym: 'Dm', notes: ['D4', 'F4', 'A4'], notesPt: ['Ré', 'Fá', 'Lá'],
    role: 'ii · pensativo', kid: 'Floresta misteriosa: um som pensativo.' },
  { id: 'black', level: 5, name: 'Preto', kanji: '黒', emoji: '🌙', hex: '#1f1a16', text: '#fff',
    chord: 'Mi menor', chordSym: 'Em', notes: ['E4', 'G4', 'B4'], notesPt: ['Mi', 'Sol', 'Si'],
    role: 'iii · noite calma', kid: 'Noite calma. Um som profundo e tranquilo.' },
  { id: 'purple', level: 6, name: 'Roxo', kanji: '紫', emoji: '🍇', hex: '#6a4878', text: '#fff',
    chord: 'Lá menor', chordSym: 'Am', notes: ['A4', 'C5', 'E5'], notesPt: ['Lá', 'Dó', 'Mi'],
    role: 'vi · saudade', kid: 'Um pouquinho triste, como o fim da tarde.' },
  { id: 'blue', level: 7, name: 'Azul', kanji: '青', emoji: '🌊', hex: '#3a5c8a', text: '#fff',
    chord: 'Si♭ maior', chordSym: 'B♭', notes: ['Bb4', 'D5', 'F5'], notesPt: ['Si♭', 'Ré', 'Fá'],
    role: '♭VII · vem de longe', kid: 'Parece que vem de longe, lá do mar.' },
  { id: 'brown', level: 8, name: 'Marrom', kanji: '茶', emoji: '🍫', hex: '#6b4a30', text: '#fff',
    chord: 'Sol 7', chordSym: 'G7', notes: ['G4', 'B4', 'D5', 'F5'], notesPt: ['Sol', 'Si', 'Ré', 'Fá'],
    role: 'V7 · inquieto', kid: 'Inquieto! Ele quer ir para outro lugar.' },
  // ---- 4 cores cromáticas (níveis 9-12) ----
  { id: 'coral', level: 9, name: 'Coral', kanji: 'D', emoji: '🍊', hex: '#e88a33', text: '#1a1614',
    chord: 'Ré maior', chordSym: 'D', notes: ['D4', 'F#4', 'A4'], notesPt: ['Ré', 'Fá♯', 'Lá'],
    role: 'II · ensolarado', kid: 'Alegre e ensolarado, cheiro de férias.' },
  { id: 'lilas', level: 10, name: 'Lilás', kanji: 'A', emoji: '🌸', hex: '#b045b8', text: '#fff',
    chord: 'Lá maior', chordSym: 'A', notes: ['A4', 'C#5', 'E5'], notesPt: ['Lá', 'Dó♯', 'Mi'],
    role: 'V/ii · anuncia', kid: 'Brilhante, parece que vai anunciar algo.' },
  { id: 'limao', level: 11, name: 'Limão', kanji: 'E', emoji: '🍋', hex: '#a8c437', text: '#1a1614',
    chord: 'Mi maior', chordSym: 'E', notes: ['E4', 'G#4', 'B4'], notesPt: ['Mi', 'Sol♯', 'Si'],
    role: 'V/vi · subindo', kid: 'Azedinho e animado, subindo, subindo!' },
  { id: 'ambar', level: 12, name: 'Âmbar', kanji: 'E♭', emoji: '🍯', hex: '#d4a833', text: '#1a1614',
    chord: 'Mi♭ maior', chordSym: 'E♭', notes: ['Eb4', 'G4', 'Bb4'], notesPt: ['Mi♭', 'Sol', 'Si♭'],
    role: '♭III · dourado', kid: 'Dourado e doce, como mel.' },
];

// Cor muito clara (Branco) precisa de borda para aparecer no papel.
function needsOutline(c) { return c.hex.toLowerCase() === '#f0e8db'; }

// ---------------------------------------------------------
// Teclado (C4–B5) com teclas pretas e notas do acorde marcadas
// ---------------------------------------------------------
const PC = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
const WHITE_STEPS = [0, 2, 4, 5, 7, 9, 11];
const BLACK_AFTER = { 1: 0, 3: 1, 6: 3, 8: 4, 10: 5 }; // semitom preto → índice da branca à esquerda

function noteToMidi(n) {
  const m = n.match(/^([A-G])([#b]?)(\d)$/);
  if (!m) return null;
  let v = PC[m[1]] + (m[2] === '#' ? 1 : m[2] === 'b' ? -1 : 0);
  return (parseInt(m[3], 10) + 1) * 12 + v;
}

// opts: { bw, width, height, labels: true }
function keyboardSVG(color, opts = {}) {
  const bw = !!opts.bw;
  const kw = 20, kh = 78, bkw = 12, bkh = 48, oct0 = 4, octs = 2;
  const W = kw * 7 * octs, H = kh + 2;
  const stroke = '#2b2240';
  const marked = new Map(color.notes.map((n, i) => [noteToMidi(n), i + 1]));
  const dotFill = bw ? '#2b2240' : color.hex;
  const dotText = bw ? '#fff' : color.text;
  const dotStroke = needsOutline(color) || bw ? '#2b2240' : 'rgba(0,0,0,0.25)';
  let s = `<svg class="kbd" viewBox="-1 -1 ${W + 2} ${H + 2}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${color.chord}: ${color.notesPt.join(', ')}">`;
  // Em tecla preta a bolinha ganha contorno branco (e, no P&B, fundo branco) para não sumir.
  const dot = (cx, cy, r, i, onBlack) => {
    const fill = onBlack && bw ? '#fff' : dotFill;
    const txt = onBlack && bw ? '#2b2240' : dotText;
    const st = onBlack ? '#fff' : dotStroke;
    return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${st}" stroke-width="${onBlack ? 1.6 : 1.2}"/>` +
      (opts.labels === false ? '' : `<text x="${cx}" y="${cy + r * 0.38}" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="${r * 1.1}" fill="${txt}">${i}</text>`);
  };
  for (let o = 0; o < octs; o++) {
    WHITE_STEPS.forEach((step, wi) => {
      const x = (o * 7 + wi) * kw;
      s += `<rect x="${x}" y="0" width="${kw}" height="${kh}" rx="2" fill="#fff" stroke="${stroke}" stroke-width="1"/>`;
      const midi = (oct0 + o + 1) * 12 + step;
      if (marked.has(midi)) s += dot(x + kw / 2, kh - 13, 7.5, marked.get(midi));
      if (step === 0) s += `<text x="${x + kw / 2}" y="${kh - 30}" text-anchor="middle" font-family="Fredoka, sans-serif" font-size="7" fill="#9a90ad">Dó${oct0 + o}</text>`;
    });
    Object.entries(BLACK_AFTER).forEach(([semi, wi]) => {
      const x = (o * 7 + wi) * kw + kw - bkw / 2;
      s += `<rect x="${x}" y="0" width="${bkw}" height="${bkh}" rx="1.5" fill="#2b2240" stroke="${stroke}" stroke-width="1"/>`;
      const midi = (oct0 + o + 1) * 12 + Number(semi);
      if (marked.has(midi)) s += dot(x + bkw / 2, bkh - 10, 6.5, marked.get(midi), true);
    });
  }
  return s + '</svg>';
}

if (typeof window !== 'undefined') window.Eguchi = { COLORS: EGUCHI_COLORS, keyboardSVG, needsOutline, noteToMidi };
if (typeof module !== 'undefined') module.exports = { EGUCHI_COLORS, noteToMidi };

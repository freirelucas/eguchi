// Eguchi · fonte única das cores para o material impresso
// ---------------------------------------------------------
// As 9 cores do método Eguchi original (Dó, Fá e Sol maior em 3 posições),
// na ordem de introdução de Sakakibara (2014) — iguais ao app (index.html →
// CHORDS + KID_INFO) e ao lib.js dos pôsteres de violão/trompete/flauta.
// Depois de mudar qualquer lado, rode:  node cheatsheet/check-colors.js

const EGUCHI_COLORS = [
  { id: 'red', level: 1, name: 'Vermelho', kanji: '赤', emoji: '🍎', hex: '#c8332a', text: '#fff', family: 'Dó maior',
    chord: 'Dó maior', chordSym: 'C', notes: ['C4', 'E4', 'G4'], notesPt: ['Dó', 'Mi', 'Sol'], bass: 'Dó',
    role: 'pé em Dó · o lar', kid: 'O som de casa: firme, com o pé bem no chão.' },
  { id: 'yellow', level: 2, name: 'Amarelo', kanji: '黄', emoji: '🌻', hex: '#e8c83a', text: '#1a1614', family: 'Fá maior',
    chord: 'Fá maior', chordSym: 'F/C', notes: ['C5', 'F5', 'A5'], notesPt: ['Dó', 'Fá', 'Lá'], bass: 'Dó',
    role: 'pé em Dó · alto e aberto', kid: 'Lá no alto e brilhante, como o sol do meio-dia.' },
  { id: 'blue', level: 3, name: 'Azul', kanji: '青', emoji: '🌊', hex: '#3a6a9a', text: '#fff', family: 'Sol maior',
    chord: 'Sol maior', chordSym: 'G/B', notes: ['B4', 'D5', 'G5'], notesPt: ['Si', 'Ré', 'Sol'], bass: 'Si',
    role: 'pé em Si · quer voltar', kid: 'Alto e calmo como o céu, mas quer voltar pra casa.' },
  { id: 'black', level: 4, name: 'Preto', kanji: '黒', emoji: '🌙', hex: '#1a1614', text: '#ede4d0', family: 'Fá maior',
    chord: 'Fá maior', chordSym: 'F/A', notes: ['A4', 'C5', 'F5'], notesPt: ['Lá', 'Dó', 'Fá'], bass: 'Lá',
    role: 'pé em Lá · denso', kid: 'Mais grave e misterioso, como a noite.' },
  { id: 'green', level: 5, name: 'Verde', kanji: '緑', emoji: '🌳', hex: '#5a8a3a', text: '#fff', family: 'Sol maior',
    chord: 'Sol maior', chordSym: 'G/D', notes: ['D5', 'G5', 'B5'], notesPt: ['Ré', 'Sol', 'Si'], bass: 'Ré',
    role: 'pé em Ré · o mais agudo', kid: 'O mais agudo de todos: um broto novinho.' },
  { id: 'orange', level: 6, name: 'Laranja', kanji: '橙', emoji: '🍊', hex: '#e88a33', text: '#1a1614', family: 'Dó maior',
    chord: 'Dó maior', chordSym: 'C/E', notes: ['E4', 'G4', 'C5'], notesPt: ['Mi', 'Sol', 'Dó'], bass: 'Mi',
    role: 'pé em Mi · segue em frente', kid: 'Parece o Vermelho, mas mais leve: não tem cara de fim.' },
  { id: 'purple', level: 7, name: 'Roxo', kanji: '紫', emoji: '🍇', hex: '#7a3d8a', text: '#fff', family: 'Fá maior',
    chord: 'Fá maior', chordSym: 'F', notes: ['F4', 'A4', 'C5'], notesPt: ['Fá', 'Lá', 'Dó'], bass: 'Fá',
    role: 'pé em Fá · outra casa', kid: 'Firme e quentinho: uma outra casa.' },
  { id: 'pink', level: 8, name: 'Rosa', kanji: '桃', emoji: '🌸', hex: '#e89aaa', text: '#1a1614', family: 'Sol maior',
    chord: 'Sol maior', chordSym: 'G', notes: ['G4', 'B4', 'D5'], notesPt: ['Sol', 'Si', 'Ré'], bass: 'Sol',
    role: 'pé em Sol · anúncio', kid: 'Anuncia que algo vai acontecer, como a primavera.' },
  { id: 'brown', level: 9, name: 'Marrom', kanji: '茶', emoji: '🍫', hex: '#7a4d2a', text: '#fff', family: 'Dó maior',
    chord: 'Dó maior', chordSym: 'C/G', notes: ['G4', 'C5', 'E5'], notesPt: ['Sol', 'Dó', 'Mi'], bass: 'Sol',
    role: 'pé em Sol · flutuando', kid: 'Fica flutuando no ar, esperando alguma coisa.' },
];

// Cor anterior mais parecida (mesma regra do app: notas em comum, mesmo pé, altura próxima).
// É o par a treinar quando a cor nova chega.
function looksLike(c) {
  const mean = x => x.notes.reduce((s, n) => s + noteToMidi(n), 0) / x.notes.length;
  let best = null, score = -1;
  EGUCHI_COLORS.filter(o => o.level < c.level).forEach(o => {
    const s = c.notesPt.filter(n => o.notesPt.includes(n)).length * 2 + (o.bass === c.bass ? 2 : 0) + (Math.abs(mean(o) - mean(c)) < 3 ? 1 : 0);
    if (s > score || (s === score && o.level > best.level)) { best = o; score = s; }
  });
  return best;
}

// Nenhuma das 9 cores é clara demais para o papel; fica o gancho para cores futuras.
function needsOutline(c) { return false; }

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
      if (step === 0) s += `<text x="${x + kw / 2}" y="${kh - 30}" text-anchor="middle" font-family="Fredoka, sans-serif" font-size="8.5" font-weight="600" fill="#6b6182">Dó${oct0 + o}</text>`;
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

if (typeof window !== 'undefined') window.Eguchi = { COLORS: EGUCHI_COLORS, keyboardSVG, needsOutline, noteToMidi, looksLike };
if (typeof module !== 'undefined') module.exports = { EGUCHI_COLORS, noteToMidi };

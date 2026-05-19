// Eguchi Cheat Sheet — shared data + SVG generators
// Authentic 9-voicing Eguchi method (Eguchi 1991, Sakakibara 2014)
// All voicings in C4-B5 range. Colors per traditional Japanese flag system.

const VOICINGS = [
  // Dó maior (C major) — 3 inversões
  { name: 'Vermelho', kanji: '赤', kanjiReading: 'aka', hex: '#c8332a', text: '#fff',
    chord: 'Dó maior', chordSym: 'C', inv: 'fundamental', invShort: 'I',
    notes: ['C4', 'E4', 'G4'], notesPt: ['Dó', 'Mi', 'Sol'],
    introOrder: 0,
    etymology: 'fogo amplo · sol nascendo',
    bass: 'Dó (tônica) grave',
    feel: 'lar firme · ponto de repouso',
    verbete: '赤 (aka) é a cor mais elementar do léxico japonês — uma das poucas cores adjetivais verdadeiras. Tônica no grave = o ouvido reconhece "casa" instantaneamente. O mais resoluto dos três voicings de Dó.' },

  { name: 'Laranja', kanji: '橙', kanjiReading: 'daidai', hex: '#e88a33', text: '#1a1614',
    chord: 'Dó maior', chordSym: 'C/E', inv: '1ª inversão', invShort: 'I⁶',
    notes: ['E4', 'G4', 'C5'], notesPt: ['Mi', 'Sol', 'Dó'],
    introOrder: 5,
    etymology: 'laranja-amarga · daidai',
    bass: 'Mi (terça) grave',
    feel: 'movimento ascendente · abertura',
    verbete: '橙 (daidai) é a fruta japonesa que persiste no pé entre estações — homófona de "geração após geração". Terça no grave dá sensação de elevação a partir do meio. Caráter aberto, não-conclusivo.' },

  { name: 'Marrom', kanji: '茶', kanjiReading: 'cha', hex: '#7a4d2a', text: '#fff',
    chord: 'Dó maior', chordSym: 'C/G', inv: '2ª inversão', invShort: 'I⁶₄',
    notes: ['G4', 'C5', 'E5'], notesPt: ['Sol', 'Dó', 'Mi'],
    introOrder: 8,
    etymology: 'chá fermentado · wabi',
    bass: 'Sol (quinta) grave',
    feel: 'suspensão · à espera',
    verbete: '茶 (cha) é a cor da terra-mãe e do chá envelhecido — estética wabi do imperfeito. Quinta no grave sem tônica embaixo cria um "buraco perceptual": o cérebro busca a fundação e sente tensão. O voicing mais transiente de Dó.' },

  // Fá maior (F major) — 3 inversões
  { name: 'Roxo', kanji: '紫', kanjiReading: 'murasaki', hex: '#7a3d8a', text: '#fff',
    chord: 'Fá maior', chordSym: 'F', inv: 'fundamental', invShort: 'IV',
    notes: ['F4', 'A4', 'C5'], notesPt: ['Fá', 'Lá', 'Dó'],
    introOrder: 6,
    etymology: 'flor gromwell · cor imperial',
    bass: 'Fá (tônica de F) grave',
    feel: 'outro lar · aspiração',
    verbete: '紫 (murasaki) era cor reservada à corte imperial japonesa — só nobreza alta a usava. Subdominante (IV) é o segundo centro tonal — outro lar fora do Vermelho. Sensação de aspiração distante.' },

  { name: 'Preto', kanji: '黒', kanjiReading: 'kuro', hex: '#1a1614', text: '#ede4d0',
    chord: 'Fá maior', chordSym: 'F/A', inv: '1ª inversão', invShort: 'IV⁶',
    notes: ['A4', 'C5', 'F5'], notesPt: ['Lá', 'Dó', 'Fá'],
    introOrder: 3,
    etymology: 'escuridão · profundidade',
    bass: 'Lá (terça) grave',
    feel: 'mistério · peso emocional',
    verbete: '黒 (kuro) é a profundidade da noite — ausência luminosa em vez de cor. Terça do Fá no grave gera densidade contemplativa. O voicing mais "denso emocionalmente" do método.' },

  { name: 'Amarelo', kanji: '黄', kanjiReading: 'kii', hex: '#e8c83a', text: '#1a1614',
    chord: 'Fá maior', chordSym: 'F/C', inv: '2ª inversão', invShort: 'IV⁶₄',
    introOrder: 1,
    notes: ['C5', 'F5', 'A5'], notesPt: ['Dó', 'Fá', 'Lá'],
    etymology: 'sol no zênite · ouro',
    bass: 'Dó (quinta) grave',
    feel: 'luz alta · suspensão luminosa',
    verbete: '黄 (kii) é o sol pleno do meio-dia — máximo de claridade sem o calor saturado do vermelho. Fá flutua sobre Dó grave: elevação luminosa, conclusão adiada.' },

  // Sol maior (G major) — 3 inversões
  { name: 'Rosa', kanji: '桃', kanjiReading: 'momo', hex: '#e89aaa', text: '#1a1614',
    chord: 'Sol maior', chordSym: 'G', inv: 'fundamental', invShort: 'V',
    notes: ['G4', 'B4', 'D5'], notesPt: ['Sol', 'Si', 'Ré'],
    introOrder: 7,
    etymology: 'flor de pessegueiro · primavera',
    bass: 'Sol (tônica de G) grave',
    feel: 'anúncio · promessa',
    verbete: '桃 (momo) é a flor do pessegueiro — primavera, promessa, doçura terna. Dominante (V) com tônica no grave: anúncio direto de retorno ao Vermelho. A "cor da expectativa".' },

  { name: 'Azul', kanji: '青', kanjiReading: 'ao', hex: '#3a6a9a', text: '#fff',
    chord: 'Sol maior', chordSym: 'G/B', inv: '1ª inversão', invShort: 'V⁶',
    notes: ['B4', 'D5', 'G5'], notesPt: ['Si', 'Ré', 'Sol'],
    introOrder: 2,
    etymology: 'azul-verde · céu, mar, broto',
    bass: 'Si (terça) grave',
    feel: 'tensão lateral · sutileza',
    verbete: '青 (ao) cobre azul E verde — vastidão do céu, juventude da folha. Terça do Sol no grave amacia a tensão dominante; expectativa fica mais lateral, mais sutil que no Rosa.' },

  { name: 'Verde', kanji: '緑', kanjiReading: 'midori', hex: '#5a8a3a', text: '#fff',
    chord: 'Sol maior', chordSym: 'G/D', inv: '2ª inversão', invShort: 'V⁶₄',
    notes: ['D5', 'G5', 'B5'], notesPt: ['Ré', 'Sol', 'Si'],
    introOrder: 4,
    etymology: 'broto novo · midori',
    bass: 'Ré (quinta) grave',
    feel: 'preparação · iminência',
    verbete: '緑 (midori) é o verde recente, o broto que acabou de abrir — palavra mais nova que 青. Quinta do Sol no grave: preparação direta pro retorno à tônica. Soa "antes da resolução".' },
];

// Family-level pedagogical intros — explain how to distinguish voicings within a chord
const FAMILY_INTROS = {
  'C major': {
    label: 'Dó maior · I',
    cue: 'a tônica do sistema · ponto de chegada',
    distinguish: 'Três modos de tocar o mesmo acorde. A nota mais GRAVE é a chave perceptual — antes de pular pra outra família, treine ouvir QUAL é o pé: Dó (赤, raiz firme), Mi (橙, terça aberta) ou Sol (茶, quinta suspensa). O cérebro infantil aprende a "ouvir esse pé" antes da harmonia inteira.'
  },
  'F major': {
    label: 'Fá maior · IV',
    cue: 'subdominante · segundo centro tonal',
    distinguish: 'O acorde do "afastamento da casa" — soa diferente do Dó porque o pé tonal mudou. Os três voicings pintam tons da mesma distância: Fá grave (紫, nobreza), Lá grave (黒, profundidade), Dó grave (黄, luz alta).'
  },
  'G major': {
    label: 'Sol maior · V',
    cue: 'dominante · tensão que quer voltar',
    distinguish: 'O acorde que pede pra resolver no Vermelho. As três inversões são gradações da mesma promessa: Sol grave (桃, anúncio claro), Si grave (青, suspensão lateral), Ré grave (緑, iminência).'
  }
};

if (typeof window !== 'undefined') window.EguchiCheat_FAMILIES = FAMILY_INTROS;

// ============================================================
// PIANO KEYBOARD SVG — 2 octaves C4–B5
// ============================================================
const PIANO_WHITES = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const PIANO_WHITE_IDX = { C: 0, D: 1, E: 2, F: 3, G: 4, A: 5, B: 6 };
const PIANO_BLACK_OFFSETS = [
  // offset from preceding white key, by note name
  { after: 'C', name: 'C#' },
  { after: 'D', name: 'D#' },
  { after: 'F', name: 'F#' },
  { after: 'G', name: 'G#' },
  { after: 'A', name: 'A#' },
];

function pianoSVG(voicing, opts = {}) {
  const bw = !!opts.bw;
  const kw = opts.keyWidth || 26;
  const kh = opts.keyHeight || 96;
  const bkw = Math.round(kw * 0.62);
  const bkh = Math.round(kh * 0.62);
  const startOct = 4, endOct = 5;
  const nOcts = endOct - startOct + 1;
  const whiteCount = nOcts * 7;
  const w = whiteCount * kw;
  const labelGap = 16;
  const h = kh + labelGap;
  const stroke = bw ? '#111' : '#241c14';
  const whiteFill = bw ? '#fff' : '#f6f0e6';
  const blackFill = bw ? '#222' : '#1a1310';
  const highlightFill = voicing.hex;
  const highlightStroke = bw ? '#000' : voicing.hex;
  const highlightText = voicing.text;

  function whiteX(note, oct) {
    return ((oct - startOct) * 7 + PIANO_WHITE_IDX[note]) * kw;
  }

  let svg = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">`;
  // White keys
  for (let oct = startOct; oct <= endOct; oct++) {
    for (const n of PIANO_WHITES) {
      const x = whiteX(n, oct);
      svg += `<rect x="${x}" y="0" width="${kw}" height="${kh}" fill="${whiteFill}" stroke="${stroke}" stroke-width="1.2"/>`;
    }
  }
  // Black keys
  for (let oct = startOct; oct <= endOct; oct++) {
    for (const b of PIANO_BLACK_OFFSETS) {
      const baseX = whiteX(b.after, oct);
      const bx = baseX + kw - bkw / 2;
      svg += `<rect x="${bx}" y="0" width="${bkw}" height="${bkh}" fill="${blackFill}" stroke="${stroke}" stroke-width="1"/>`;
    }
  }
  // Highlight 3 voicing notes (white keys only for our 9 voicings)
  voicing.notes.forEach((noteOct, i) => {
    const note = noteOct.replace(/\d+/, '');
    const oct = parseInt(noteOct.match(/\d+/)[0]);
    const x = whiteX(note, oct);
    const dotR = Math.min(kw, kh) * 0.22;
    const cx = x + kw / 2;
    const cy = kh - dotR - 6;
    svg += `<circle cx="${cx}" cy="${cy}" r="${dotR}" fill="${highlightFill}" stroke="${highlightStroke}" stroke-width="1.5"/>`;
    svg += `<text x="${cx}" y="${cy + dotR * 0.42}" text-anchor="middle" font-family="'Fraunces', serif" font-size="${dotR * 1.1}" font-weight="500" fill="${highlightText}">${i + 1}</text>`;
  });
  // C labels at start of each octave
  for (let oct = startOct; oct <= endOct; oct++) {
    const x = whiteX('C', oct);
    svg += `<text x="${x + kw / 2}" y="${kh + labelGap - 4}" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="9" fill="${bw ? '#444' : '#6e6253'}">C${oct}</text>`;
  }
  svg += '</svg>';
  return svg;
}

// ============================================================
// GUITAR FRET DIAGRAM — 6 strings, 4 frets, with note positions
// ============================================================
// Standard tuning: E2 A2 D3 G3 B3 E4 (strings 6→1)
// 3-note compact voicings:
const GUITAR_SHAPES = {
  // string indices 1=high E, 6=low E. null = mute, 0 = open, N = fret N
  // [s6, s5, s4, s3, s2, s1] (low → high)
  'C4,E4,G4': { frets: [null, 3, 2, 0, null, null], fingers: [0, 3, 2, 0, 0, 0], notes: { 5: 'C', 4: 'E', 3: 'G' } },
  'E4,G4,C5': { frets: [null, null, 2, 0, 1, null], fingers: [0, 0, 2, 0, 1, 0], notes: { 4: 'E', 3: 'G', 2: 'C' } },
  'G4,C5,E5': { frets: [null, null, null, 0, 1, 0], fingers: [0, 0, 0, 0, 1, 0], notes: { 3: 'G', 2: 'C', 1: 'E' } },
  'F4,A4,C5': { frets: [null, null, 3, 2, 1, null], fingers: [0, 0, 3, 2, 1, 0], notes: { 4: 'F', 3: 'A', 2: 'C' } },
  'A4,C5,F5': { frets: [null, null, null, 2, 1, 1], fingers: [0, 0, 0, 3, 1, 2], notes: { 3: 'A', 2: 'C', 1: 'F' } },
  'C5,F5,A5': { frets: [null, null, null, 5, 6, 5], fingers: [0, 0, 0, 1, 3, 2], notes: { 3: 'C', 2: 'F', 1: 'A' }, startFret: 5 },
  'G4,B4,D5': { frets: [3, 2, 0, null, null, null], fingers: [3, 2, 0, 0, 0, 0], notes: { 6: 'G', 5: 'B', 4: 'D' } },
  'B4,D5,G5': { frets: [null, null, null, null, 3, 3], fingers: [0, 0, 0, 0, 2, 3], notes: { 2: 'D', 1: 'G' }, notesAlt: 'B4 = strings 5 fret 2 alt' },
  'D5,G5,B5': { frets: [null, null, null, null, null, null], fingers: [0, 0, 0, 0, 0, 0], notes: {}, special: 'D5-G5-B5 — use high frets (string 1 frets 3,5,7) or capo' },
};

// Better guitar voicings (revised) — playable 3-string shapes:
const GUITAR_VOICINGS = {
  'C4,E4,G4': { label: 'CEG · raiz', shape: [['x',6],[3,5],[2,4],[0,3],['x',2],['x',1]], finger: { 5: 3, 4: 2 }, openish: true },
  'E4,G4,C5': { label: 'EGC · 1ª inv', shape: [['x',6],['x',5],[2,4],[0,3],[1,2],['x',1]], finger: { 4: 2, 2: 1 } },
  'G4,C5,E5': { label: 'GCE · 2ª inv', shape: [['x',6],['x',5],['x',4],[0,3],[1,2],[0,1]], finger: { 2: 1 } },
  'F4,A4,C5': { label: 'FAC · raiz', shape: [['x',6],['x',5],[3,4],[2,3],[1,2],['x',1]], finger: { 4: 3, 3: 2, 2: 1 } },
  'A4,C5,F5': { label: 'ACF · 1ª inv', shape: [['x',6],['x',5],['x',4],[2,3],[1,2],[1,1]], finger: { 3: 3, 2: 1, 1: 2 } },
  'C5,F5,A5': { label: 'CFA · 2ª inv', shape: [['x',6],['x',5],['x',4],[5,3],[6,2],[5,1]], finger: { 3: 1, 2: 3, 1: 2 }, startFret: 5 },
  'G4,B4,D5': { label: 'GBD · raiz', shape: [[3,6],[2,5],[0,4],['x',3],['x',2],['x',1]], finger: { 6: 3, 5: 2 } },
  'B4,D5,G5': { label: 'BDG · 1ª inv', shape: [['x',6],[2,5],[0,4],[0,3],['x',2],['x',1]], finger: { 5: 2 } },
  'D5,G5,B5': { label: 'DGB · 2ª inv', shape: [['x',6],['x',5],[0,4],[0,3],[0,2],['x',1]], finger: {}, openish: true },
};

function guitarSVG(voicing, opts = {}) {
  const bw = !!opts.bw;
  const key = voicing.notes.join(',');
  const v = GUITAR_VOICINGS[key];
  if (!v) return `<svg viewBox="0 0 100 100"><text x="10" y="50" font-size="10">?</text></svg>`;

  const w = 100, h = 130;
  const padTop = 22, padLeft = 12;
  const fretboardW = w - padLeft - 12;
  const fretboardH = h - padTop - 24;
  const nFrets = 4;
  const fretH = fretboardH / nFrets;
  const stringSpacing = fretboardW / 5;
  const stringColor = bw ? '#222' : '#3a2f24';
  const fretColor = bw ? '#888' : '#5a4a36';
  const nutColor = bw ? '#000' : '#1a1310';
  const dotFill = voicing.hex;
  const dotStroke = bw ? '#000' : '#1a1310';
  const dotText = voicing.text;

  let svg = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">`;
  // Strings (6 horizontal, since we draw vertical neck)
  for (let s = 0; s < 6; s++) {
    const x = padLeft + s * stringSpacing;
    svg += `<line x1="${x}" y1="${padTop}" x2="${x}" y2="${padTop + fretboardH}" stroke="${stringColor}" stroke-width="1.3"/>`;
  }
  // Nut (top) — only if startFret is 1
  const startFret = v.startFret || 1;
  if (startFret === 1) {
    svg += `<rect x="${padLeft - 1}" y="${padTop - 3}" width="${fretboardW + 2}" height="4" fill="${nutColor}"/>`;
  } else {
    svg += `<text x="${padLeft - 4}" y="${padTop + fretH * 0.6}" text-anchor="end" font-family="'JetBrains Mono', monospace" font-size="8" fill="${bw ? '#444' : '#6e6253'}">${startFret}</text>`;
  }
  // Frets
  for (let f = 1; f <= nFrets; f++) {
    const y = padTop + f * fretH;
    svg += `<line x1="${padLeft}" y1="${y}" x2="${padLeft + fretboardW}" y2="${y}" stroke="${fretColor}" stroke-width="0.8"/>`;
  }
  // String markers (x / o above the nut)
  const positions = [];
  v.shape.forEach(([fret, stringNum]) => {
    positions[stringNum] = fret;
  });
  for (let s = 1; s <= 6; s++) {
    const x = padLeft + (6 - s) * stringSpacing; // string 6 = leftmost = lowest E
    const mark = positions[s];
    const y = padTop - 8;
    if (mark === 'x' || mark === undefined) {
      svg += `<text x="${x}" y="${y}" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="10" fill="${bw ? '#444' : '#6e6253'}">×</text>`;
    } else if (mark === 0) {
      svg += `<circle cx="${x}" cy="${y - 2}" r="3" fill="none" stroke="${bw ? '#000' : '#3a2f24'}" stroke-width="1"/>`;
    }
  }
  // Finger dots
  v.shape.forEach(([fret, stringNum]) => {
    if (typeof fret !== 'number' || fret <= 0) return;
    const x = padLeft + (6 - stringNum) * stringSpacing;
    const fretIdx = fret - startFret + 1;
    if (fretIdx < 1 || fretIdx > nFrets) return;
    const y = padTop + (fretIdx - 0.5) * fretH;
    svg += `<circle cx="${x}" cy="${y}" r="${stringSpacing * 0.32}" fill="${dotFill}" stroke="${dotStroke}" stroke-width="1.2"/>`;
    const fingerNum = v.finger[stringNum];
    if (fingerNum) {
      svg += `<text x="${x}" y="${y + 3}" text-anchor="middle" font-family="sans-serif" font-size="9" font-weight="bold" fill="${dotText}">${fingerNum}</text>`;
    }
  });
  // Label below
  svg += `<text x="${w / 2}" y="${h - 6}" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="9" fill="${bw ? '#222' : '#3a2f24'}">${v.label}</text>`;
  svg += '</svg>';
  return svg;
}

// ============================================================
// TRUMPET VALVE FINGERINGS — in C
// ============================================================
const TRUMPET_FINGERINGS = {
  'C': [], 'D': [1, 3], 'E': [1, 2], 'F': [1], 'G': [], 'A': [1, 2], 'B': [2],
};

function trumpetSVG(voicing, opts = {}) {
  const bw = !!opts.bw;
  const noteW = 64;
  const w = noteW * 3;
  const h = 90;
  const padTop = 14;
  const valveR = 8;
  const valveGap = 22;
  const valveY = padTop + 18;
  const valveColor = bw ? '#222' : '#3a2f24';
  const filledColor = voicing.hex;
  const filledText = voicing.text;
  const noteLabelColor = bw ? '#222' : '#3a2f24';

  let svg = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">`;
  voicing.notes.forEach((noteOct, i) => {
    const note = noteOct.replace(/\d+/, '');
    const oct = noteOct.match(/\d+/)[0];
    const fingering = TRUMPET_FINGERINGS[note] || [];
    const cx = i * noteW + noteW / 2;
    // Note name label
    svg += `<text x="${cx}" y="${padTop}" text-anchor="middle" font-family="'Fraunces', serif" font-size="14" font-weight="500" fill="${noteLabelColor}">${voicing.notesPt[i]}${oct}</text>`;
    // 3 valves
    for (let v = 1; v <= 3; v++) {
      const vx = cx + (v - 2) * valveGap;
      const pressed = fingering.includes(v);
      svg += `<circle cx="${vx}" cy="${valveY + 18}" r="${valveR}" fill="${pressed ? filledColor : (bw ? '#fff' : '#f6f0e6')}" stroke="${valveColor}" stroke-width="1.4"/>`;
      svg += `<text x="${vx}" y="${valveY + 22}" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="500" fill="${pressed ? filledText : valveColor}">${v}</text>`;
    }
    // Fingering label
    const label = fingering.length === 0 ? 'aberto' : fingering.join('+');
    svg += `<text x="${cx}" y="${h - 8}" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="9" fill="${noteLabelColor}">${label}</text>`;
  });
  svg += '</svg>';
  return svg;
}

// ============================================================
// STAFF / PARTITURA — Treble clef + 3 note heads
// White-key notes only (our voicings). Range C4–C6.
// ============================================================
const STAFF_PITCH_Y = {
  // y-coord in viewBox where each pitch sits (step = 5px, stave 5 lines of 10px gap)
  'C4': 70, 'D4': 65, 'E4': 60, 'F4': 55, 'G4': 50, 'A4': 45, 'B4': 40,
  'C5': 35, 'D5': 30, 'E5': 25, 'F5': 20, 'G5': 15, 'A5': 10, 'B5': 5, 'C6': 0,
};

function staffSVG(voicing, opts = {}) {
  const bw = !!opts.bw;
  const w = 200, h = 88;
  const staveLeftX = 38;
  const staveRightX = w - 10;
  const staveTopY = 20;   // top line = F5
  const staveBottomY = 60; // bottom line = E4
  const lineColor = bw ? '#111' : '#1a1614';
  const dotFill = voicing.hex;
  const dotStroke = bw ? '#000' : '#1a1614';
  const labelColor = bw ? '#444' : '#6e6253';

  let svg = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">`;

  // 5 stave lines
  for (let i = 0; i < 5; i++) {
    const y = staveTopY + i * 10;
    svg += `<line x1="${staveLeftX - 4}" y1="${y}" x2="${staveRightX}" y2="${y}" stroke="${lineColor}" stroke-width="0.8"/>`;
  }
  // Left bar
  svg += `<line x1="${staveLeftX - 4}" y1="${staveTopY}" x2="${staveLeftX - 4}" y2="${staveBottomY}" stroke="${lineColor}" stroke-width="1.5"/>`;
  // Right end bar (double)
  svg += `<line x1="${staveRightX - 2}" y1="${staveTopY}" x2="${staveRightX - 2}" y2="${staveBottomY}" stroke="${lineColor}" stroke-width="0.8"/>`;
  svg += `<line x1="${staveRightX}" y1="${staveTopY}" x2="${staveRightX}" y2="${staveBottomY}" stroke="${lineColor}" stroke-width="1.8"/>`;

  // Treble clef — simplified SVG path scaled to fit
  // Center of clef "swirl" sits on G4 line (y=50). Path drawn from y≈10 to y≈75.
  svg += `<g transform="translate(${staveLeftX - 32}, ${staveTopY - 8}) scale(0.052)">
    <path d="M 376.4 154 c 0 -8 -1.8 -16.6 -5.4 -25.7 -10.2 -25.5 -27.5 -47.4 -52 -65.6 -1.8 -1.5 -2.8 -2.6 -3.2 -3.4 -0.4 -0.8 -0.6 -2.2 -0.6 -4.3 0 -16.2 4 -32 12.1 -47.4 8.1 -15.4 17.1 -29.5 27.1 -42.3 4.2 -5.3 8 -10.4 11.4 -15.4 9.8 -13.6 14.7 -25.7 14.7 -36.3 0 -12.4 -2.4 -23.7 -7.2 -34 -4.8 -10.3 -11.3 -19.1 -19.4 -26.4 -8.1 -7.3 -17.5 -13 -28.2 -17.2 -10.7 -4.2 -21.8 -6.2 -33.4 -6.2 -14.5 0 -27 4 -37.6 12 -10.6 8 -17.9 18 -22.1 30 -4.2 12 -4.7 25.1 -1.5 39.4 3.2 14.3 10.5 27.1 22 38.6 13.4 13.4 22.1 22.1 26 26.1 6 6.7 9.9 13.7 11.6 21.1 1.7 7.4 1.4 14.8 -1 22.1 -5.9 17.4 -16.5 31.6 -31.7 42.6 -15.2 11 -32.4 17.3 -51.5 19 V 35.4 c 12.5 -2.5 23.2 -7.3 32.1 -14.4 8.9 -7.1 16.1 -15.7 21.7 -25.8 5.6 -10.1 8.3 -20.5 8.3 -31.1 0 -11.5 -2.3 -22.4 -6.9 -32.7 -4.6 -10.3 -11 -19.3 -19.1 -27 -16.2 -15.4 -36.6 -23.1 -61 -23.1 -32.6 0 -57 9.9 -73.1 29.6 -16.1 19.7 -24.2 43.7 -24.2 72 0 17.6 4 34 12.1 49.4 8.1 15.4 19.4 28.2 33.8 38.6 23.4 16.7 41.4 28.6 53.9 35.6 v 50.4 c -16.7 -2.1 -33.4 -7.4 -50.1 -16 -16.7 -8.6 -31.6 -19.5 -44.9 -32.8 -13.3 -13.3 -23.9 -28.7 -31.7 -46.2 -7.9 -17.5 -11.8 -36.3 -11.8 -56.5 0 -25.3 5.4 -47.3 16.3 -65.9 10.9 -18.6 25.9 -33.7 45.1 -45.4 19.2 -11.7 41.1 -19.6 65.6 -23.7 v -27.4 c -36 5.6 -64.2 18.9 -84.7 39.9 -20.5 21 -34.8 47.4 -42.7 79.2 -3.6 14.5 -5.4 29.7 -5.4 45.4 0 31.7 8.6 60.7 25.7 87.1 17.1 26.4 39.7 47.7 67.8 64 z" fill="${lineColor}"/>
  </g>`;

  // Note heads (3 notes spread horizontally)
  const noteCount = voicing.notes.length;
  const noteSpacing = (staveRightX - staveLeftX - 30) / (noteCount + 1);
  voicing.notes.forEach((noteOct, i) => {
    const y = STAFF_PITCH_Y[noteOct];
    if (y === undefined) return;
    const x = staveLeftX + 22 + (i + 1) * noteSpacing;

    // Ledger lines below stave (for C4 — below E4 by 2 steps)
    if (y > staveBottomY) {
      // C4 needs ledger at y=70
      svg += `<line x1="${x - 7}" y1="${y}" x2="${x + 7}" y2="${y}" stroke="${lineColor}" stroke-width="0.9"/>`;
    }
    // Ledger lines above stave
    if (y < staveTopY) {
      // For A5 (y=10), C6 (y=0): draw ledger lines
      if (y <= 10) {
        svg += `<line x1="${x - 7}" y1="10" x2="${x + 7}" y2="10" stroke="${lineColor}" stroke-width="0.9"/>`;
      }
      if (y <= 0) {
        svg += `<line x1="${x - 7}" y1="0" x2="${x + 7}" y2="0" stroke="${lineColor}" stroke-width="0.9"/>`;
      }
    }

    // Note head (rotated oval — standard music notation note head)
    svg += `<ellipse cx="${x}" cy="${y}" rx="5.6" ry="4.2" fill="${dotFill}" stroke="${dotStroke}" stroke-width="1" transform="rotate(-22 ${x} ${y})"/>`;
    // Order index above note
    svg += `<text x="${x}" y="${y - 8}" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="7" font-weight="700" fill="${labelColor}">${i + 1}</text>`;
  });

  // Note labels below the stave
  voicing.notes.forEach((noteOct, i) => {
    const x = staveLeftX + 22 + (i + 1) * noteSpacing;
    svg += `<text x="${x}" y="${h - 5}" text-anchor="middle" font-family="'Fraunces', serif" font-size="10" font-style="italic" fill="${labelColor}">${voicing.notesPt[i]}</text>`;
  });

  svg += '</svg>';
  return svg;
}

// ============================================================
// Range: C5 a B6. Voicings (originalmente C4-B5) tocados transpostos
// 1 oitava acima — registro natural da flauta doce.
// T (polegar) + 7 furos. Valor 1=fechado, 0=aberto, 0.5=meio-furo (polegar).
// ============================================================
const RECORDER_FINGERINGS = {
  'C5': { T: 1,   holes: [1,1,1,1,1,1,1] },
  'D5': { T: 1,   holes: [1,1,1,1,1,1,0] },
  'E5': { T: 1,   holes: [1,1,1,1,1,0,0] },
  'F5': { T: 1,   holes: [1,1,1,1,0,1,1] },  // Baroque
  'G5': { T: 1,   holes: [1,1,1,1,0,0,0] },
  'A5': { T: 1,   holes: [1,1,1,0,0,0,0] },
  'B5': { T: 1,   holes: [1,1,0,0,0,0,0] },
  'C6': { T: 1,   holes: [0,1,0,0,0,0,0] },
  'D6': { T: 0,   holes: [0,1,1,1,1,1,0] },
  'E6': { T: 0.5, holes: [1,1,0,1,1,0,0] },
  'F6': { T: 0.5, holes: [1,0,1,1,0,1,1] },
  'G6': { T: 0.5, holes: [1,1,1,0,0,0,0] },
  'A6': { T: 0.5, holes: [1,1,0,1,1,1,0] },
  'B6': { T: 0.5, holes: [1,0,1,1,1,0,0] },
};

function recorderSVG(voicing, opts = {}) {
  const bw = !!opts.bw;
  const colW = 28;
  const w = colW * 3;
  const padTop = 14;
  const holeR = 4.8;
  const holeGap = 9;
  const holeStart = padTop + 10;
  const h = holeStart + 8 * holeGap + 12;
  const stroke = bw ? '#222' : '#3a2f24';
  const closedFill = voicing.hex;
  const labelColor = bw ? '#222' : '#3a2f24';
  const captionColor = bw ? '#555' : '#6e6253';

  function transposeOctaveUp(noteOct) {
    return noteOct.replace(/(\d+)/, (m, n) => (parseInt(n) + 1));
  }

  let svg = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">`;

  voicing.notes.forEach((noteOct, i) => {
    const note = transposeOctaveUp(noteOct);
    const fing = RECORDER_FINGERINGS[note];
    const cx = i * colW + colW / 2;
    // Note label (Portuguese pitch name)
    svg += `<text x="${cx}" y="${padTop}" text-anchor="middle" font-family="'Fraunces', serif" font-size="11.5" font-weight="500" fill="${labelColor}">${voicing.notesPt[i]}</text>`;
    // Order index (1, 2, 3)
    svg += `<text x="${cx - colW/2 + 4}" y="${padTop}" text-anchor="start" font-family="'JetBrains Mono', monospace" font-size="8" font-weight="700" fill="${closedFill}">${i+1}</text>`;

    if (!fing) {
      svg += `<text x="${cx}" y="${holeStart + 20}" text-anchor="middle" font-size="9" fill="${labelColor}">—</text>`;
      return;
    }

    // Thumb hole
    const tCy = holeStart;
    const tVal = fing.T;
    if (tVal === 0) {
      svg += `<circle cx="${cx}" cy="${tCy}" r="${holeR}" fill="white" stroke="${stroke}" stroke-width="1.2"/>`;
    } else if (tVal === 0.5) {
      svg += `<circle cx="${cx}" cy="${tCy}" r="${holeR}" fill="white" stroke="${stroke}" stroke-width="1.2"/>`;
      svg += `<path d="M ${cx-holeR} ${tCy} A ${holeR} ${holeR} 0 0 1 ${cx+holeR} ${tCy} Z" fill="${closedFill}" stroke="none"/>`;
    } else {
      svg += `<circle cx="${cx}" cy="${tCy}" r="${holeR}" fill="${closedFill}" stroke="${stroke}" stroke-width="1.2"/>`;
    }
    // 'T' label to the left of thumb
    svg += `<text x="${cx - holeR - 3}" y="${tCy + 3}" text-anchor="end" font-family="'JetBrains Mono', monospace" font-size="7" fill="${labelColor}">T</text>`;

    // 7 finger holes
    fing.holes.forEach((closed, idx) => {
      const cy = holeStart + (idx + 1) * holeGap;
      const fill = closed ? closedFill : 'white';
      svg += `<circle cx="${cx}" cy="${cy}" r="${holeR}" fill="${fill}" stroke="${stroke}" stroke-width="1.2"/>`;
      // small index for finger position
      if (idx === 0) {
        svg += `<text x="${cx - holeR - 3}" y="${cy + 3}" text-anchor="end" font-family="'JetBrains Mono', monospace" font-size="6.5" fill="${labelColor}">${idx+1}</text>`;
      }
    });
  });

  // Caption
  svg += `<text x="${w/2}" y="${h - 2}" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="7" fill="${captionColor}">● fechado · ○ aberto · ◐ meio-polegar</text>`;

  svg += '</svg>';
  return svg;
}

// Helper exposed for backward compat — harmonica replaced by recorder
const RECORDER_MISSING_NOTES = []; // all voicings fit C5-B6 transposed range

// Export-friendly (no module system, just attach to window)
if (typeof window !== 'undefined') {
  window.EguchiCheat = { VOICINGS, pianoSVG, guitarSVG, trumpetSVG, recorderSVG, staffSVG, RECORDER_MISSING_NOTES };
}

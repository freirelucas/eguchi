// Eguchi Cheat Sheet — shared data + SVG generators
// Authentic 9-voicing Eguchi method (Eguchi 1991, Sakakibara 2014)
// All voicings in C4-B5 range. Colors per traditional Japanese flag system.

const VOICINGS = [
  // Dó maior (C major) — 3 inversões
  { name: 'Vermelho', kanji: '赤', kanjiReading: 'aka', hex: '#c8332a', text: '#fff',
    chord: 'Dó maior', chordSym: 'C', inv: 'fundamental', invShort: 'I',
    notes: ['C4', 'E4', 'G4'], notesPt: ['Dó', 'Mi', 'Sol'],
    etymology: 'fogo amplo · sol nascendo',
    bass: 'Dó (tônica) grave',
    feel: 'lar firme · ponto de repouso',
    verbete: '赤 (aka) é a cor mais elementar do léxico japonês — uma das poucas cores adjetivais verdadeiras. Tônica no grave = o ouvido reconhece "casa" instantaneamente. O mais resoluto dos três voicings de Dó.' },

  { name: 'Laranja', kanji: '橙', kanjiReading: 'daidai', hex: '#e88a33', text: '#1a1614',
    chord: 'Dó maior', chordSym: 'C/E', inv: '1ª inversão', invShort: 'I⁶',
    notes: ['E4', 'G4', 'C5'], notesPt: ['Mi', 'Sol', 'Dó'],
    etymology: 'laranja-amarga · daidai',
    bass: 'Mi (terça) grave',
    feel: 'movimento ascendente · abertura',
    verbete: '橙 (daidai) é a fruta japonesa que persiste no pé entre estações — homófona de "geração após geração". Terça no grave dá sensação de elevação a partir do meio. Caráter aberto, não-conclusivo.' },

  { name: 'Marrom', kanji: '茶', kanjiReading: 'cha', hex: '#7a4d2a', text: '#fff',
    chord: 'Dó maior', chordSym: 'C/G', inv: '2ª inversão', invShort: 'I⁶₄',
    notes: ['G4', 'C5', 'E5'], notesPt: ['Sol', 'Dó', 'Mi'],
    etymology: 'chá fermentado · wabi',
    bass: 'Sol (quinta) grave',
    feel: 'suspensão · à espera',
    verbete: '茶 (cha) é a cor da terra-mãe e do chá envelhecido — estética wabi do imperfeito. Quinta no grave sem tônica embaixo cria um "buraco perceptual": o cérebro busca a fundação e sente tensão. O voicing mais transiente de Dó.' },

  // Fá maior (F major) — 3 inversões
  { name: 'Roxo', kanji: '紫', kanjiReading: 'murasaki', hex: '#7a3d8a', text: '#fff',
    chord: 'Fá maior', chordSym: 'F', inv: 'fundamental', invShort: 'IV',
    notes: ['F4', 'A4', 'C5'], notesPt: ['Fá', 'Lá', 'Dó'],
    etymology: 'flor gromwell · cor imperial',
    bass: 'Fá (tônica de F) grave',
    feel: 'outro lar · aspiração',
    verbete: '紫 (murasaki) era cor reservada à corte imperial japonesa — só nobreza alta a usava. Subdominante (IV) é o segundo centro tonal — outro lar fora do Vermelho. Sensação de aspiração distante.' },

  { name: 'Preto', kanji: '黒', kanjiReading: 'kuro', hex: '#1a1614', text: '#ede4d0',
    chord: 'Fá maior', chordSym: 'F/A', inv: '1ª inversão', invShort: 'IV⁶',
    notes: ['A4', 'C5', 'F5'], notesPt: ['Lá', 'Dó', 'Fá'],
    etymology: 'escuridão · profundidade',
    bass: 'Lá (terça) grave',
    feel: 'mistério · peso emocional',
    verbete: '黒 (kuro) é a profundidade da noite — ausência luminosa em vez de cor. Terça do Fá no grave gera densidade contemplativa. O voicing mais "denso emocionalmente" do método.' },

  { name: 'Amarelo', kanji: '黄', kanjiReading: 'kii', hex: '#e8c83a', text: '#1a1614',
    chord: 'Fá maior', chordSym: 'F/C', inv: '2ª inversão', invShort: 'IV⁶₄',
    notes: ['C5', 'F5', 'A5'], notesPt: ['Dó', 'Fá', 'Lá'],
    etymology: 'sol no zênite · ouro',
    bass: 'Dó (quinta) grave',
    feel: 'luz alta · suspensão luminosa',
    verbete: '黄 (kii) é o sol pleno do meio-dia — máximo de claridade sem o calor saturado do vermelho. Fá flutua sobre Dó grave: elevação luminosa, conclusão adiada.' },

  // Sol maior (G major) — 3 inversões
  { name: 'Rosa', kanji: '桃', kanjiReading: 'momo', hex: '#e89aaa', text: '#1a1614',
    chord: 'Sol maior', chordSym: 'G', inv: 'fundamental', invShort: 'V',
    notes: ['G4', 'B4', 'D5'], notesPt: ['Sol', 'Si', 'Ré'],
    etymology: 'flor de pessegueiro · primavera',
    bass: 'Sol (tônica de G) grave',
    feel: 'anúncio · promessa',
    verbete: '桃 (momo) é a flor do pessegueiro — primavera, promessa, doçura terna. Dominante (V) com tônica no grave: anúncio direto de retorno ao Vermelho. A "cor da expectativa".' },

  { name: 'Azul', kanji: '青', kanjiReading: 'ao', hex: '#3a6a9a', text: '#fff',
    chord: 'Sol maior', chordSym: 'G/B', inv: '1ª inversão', invShort: 'V⁶',
    notes: ['B4', 'D5', 'G5'], notesPt: ['Si', 'Ré', 'Sol'],
    etymology: 'azul-verde · céu, mar, broto',
    bass: 'Si (terça) grave',
    feel: 'tensão lateral · sutileza',
    verbete: '青 (ao) cobre azul E verde — vastidão do céu, juventude da folha. Terça do Sol no grave amacia a tensão dominante; expectativa fica mais lateral, mais sutil que no Rosa.' },

  { name: 'Verde', kanji: '緑', kanjiReading: 'midori', hex: '#5a8a3a', text: '#fff',
    chord: 'Sol maior', chordSym: 'G/D', inv: '2ª inversão', invShort: 'V⁶₄',
    notes: ['D5', 'G5', 'B5'], notesPt: ['Ré', 'Sol', 'Si'],
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
// FLAUTA DOCE SOPRANO em Dó — Baroque fingering
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
  window.EguchiCheat = { VOICINGS, pianoSVG, guitarSVG, trumpetSVG, recorderSVG, RECORDER_MISSING_NOTES };
}

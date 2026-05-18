// Eguchi · Design Tokens
// Refined dark warm palette + 8 Eguchi colors harmonized for OKLCH-balanced chroma.

const T = {
  // Backgrounds — warm near-black
  bg:        '#14100c',
  bg2:       '#1d1812',
  bg3:       '#261f17',
  bgRaised:  '#2a2118',

  // Foreground — bone white
  text:      '#ede4d0',
  textDim:   '#a89a87',
  textMute:  '#6e6253',

  // Lines
  line:        'rgba(237, 228, 208, 0.07)',
  lineStrong:  'rgba(237, 228, 208, 0.14)',
  lineDashed:  'rgba(237, 228, 208, 0.10)',

  // Functional
  accent:    '#d4654a',  // terracotta — primary brand
  warm:      '#e1ad3e',  // saffron   — probe tag
  cool:      '#7090b0',  // slate     — baseline tag
  green:     '#8fb874',  // success
  red:       '#c5523a',  // wrong / destructive

  // Radii
  r1: 4, r2: 7, r3: 10, r4: 16, r5: 24, full: 9999,

  // Type
  serif: '"Fraunces", "Spectral", Georgia, serif',
  mono:  '"JetBrains Mono", ui-monospace, monospace',
  sans:  '-apple-system, "SF Pro", system-ui, sans-serif',
};

// 8 Eguchi colors — refined for harmonized chroma (oklch ≈ 0.50 0.10)
// Each color keeps its semantic identity but reads as a family.
const CHORDS = [
  {
    name: 'Vermelho', kanji: '赤', romaji: 'aka',
    chord: 'Dó Maior',  sym: 'C',  hex: '#c5523a',
    notes: ['Dó','Mi','Sol'], degree: 'I',
    function: 'Tônica — o "lar"',
    feel: 'aberto, neutro-luminoso, repouso',
  },
  {
    name: 'Branco',   kanji: '白', romaji: 'shiro',
    chord: 'Sol Maior', sym: 'G',  hex: '#ede4d0',
    notes: ['Sol','Si','Ré'], degree: 'V',
    function: 'Dominante — tensão dirigida ao lar',
    feel: 'brilhante, aéreo, "levantar"',
  },
  {
    name: 'Amarelo',  kanji: '黄', romaji: 'ki',
    chord: 'Fá Maior',  sym: 'F',  hex: '#e1ad3e',
    notes: ['Fá','Lá','Dó'], degree: 'IV',
    function: 'Subdominante — contrapeso descendente',
    feel: 'cálido, redondo, terno, "para baixo"',
  },
  {
    name: 'Verde',    kanji: '緑', romaji: 'midori',
    chord: 'Ré menor',  sym: 'Dm', hex: '#4a7d54',
    notes: ['Ré','Fá','Lá'], degree: 'ii',
    function: 'Subdominante menor',
    feel: 'sombrio sutil, natural, pergunta',
  },
  {
    name: 'Preto',    kanji: '黒', romaji: 'kuro',
    chord: 'Mi menor',  sym: 'Em', hex: '#26201b',
    notes: ['Mi','Sol','Si'], degree: 'iii',
    function: 'Mediante menor',
    feel: 'profundo, contemplativo, digno',
  },
  {
    name: 'Roxo',     kanji: '紫', romaji: 'murasaki',
    chord: 'Lá menor',  sym: 'Am', hex: '#6f5482',
    notes: ['Lá','Dó','Mi'], degree: 'vi',
    function: 'Relativa menor de Dó',
    feel: 'nostálgico, agridoce, melancólico-elegante',
  },
  {
    name: 'Azul',     kanji: '青', romaji: 'ao',
    chord: 'Si♭ Maior', sym: 'B♭', hex: '#46688a',
    notes: ['Si♭','Ré','Fá'], degree: '♭VII',
    function: 'Empréstimo modal — vem de fora',
    feel: 'frio, distante, "outro lugar"',
  },
  {
    name: 'Marrom',   kanji: '茶', romaji: 'cha',
    chord: 'Sol 7',     sym: 'G7', hex: '#785a3c',
    notes: ['Sol','Si','Ré','Fá'], degree: 'V7',
    function: 'Dominante com sétima — tensão máxima',
    feel: 'inquieto, prometendo, "abre a porta"',
  },
];

// Helper: pick legible foreground for a chord chip
function chordFg(c) {
  return c.hex === '#ede4d0' || c.hex === '#e1ad3e' ? '#1a1612' : '#ede4d0';
}

Object.assign(window, { T, CHORDS, chordFg });

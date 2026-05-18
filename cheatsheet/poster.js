// Eguchi A3 Poster builder — call buildPoster(instrumentKey)
// Requires lib.js already loaded.

const POSTER_INSTRUMENTS = {
  piano:    { label: 'Piano',                tagline: 'Teclado · acorde simultâneo',         renderFn: 'pianoSVG',     svgOpts: { keyWidth: 14, keyHeight: 58 } },
  violao:   { label: 'Violão',               tagline: 'Afinação padrão · voicing de 3 cordas', renderFn: 'guitarSVG',    svgOpts: {} },
  trompete: { label: 'Trompete em Dó',       tagline: 'Concert pitch · arpejo monofônico',    renderFn: 'trumpetSVG',   svgOpts: {} },
  flauta:   { label: 'Flauta Doce em Dó',    tagline: 'Soprano barroca · 1 oitava acima · arpejo', renderFn: 'recorderSVG', svgOpts: {} },
};

const FAMILIES = [
  { key: 'C major', roman: 'I',  voicings: [0, 1, 2] },
  { key: 'F major', roman: 'IV', voicings: [3, 4, 5] },
  { key: 'G major', roman: 'V',  voicings: [6, 7, 8] },
];

function buildPoster(instrumentKey, opts) {
  opts = opts || {};
  const bw = !!opts.bw;
  const cfg = POSTER_INSTRUMENTS[instrumentKey];
  if (!cfg) return;
  const renderFn = window.EguchiCheat[cfg.renderFn];
  const svgOpts = { ...cfg.svgOpts, bw };
  const familyIntros = window.EguchiCheat_FAMILIES || {};

  // Header
  document.title = `Eguchi · A3 ${cfg.label}`;
  document.getElementById('instrumentName').textContent = cfg.label.toLowerCase();
  const subEl = document.getElementById('instrumentSub');
  if (subEl) subEl.textContent = cfg.tagline;

  // Families
  const container = document.getElementById('familiesWrap');
  if (!container) return;
  container.innerHTML = '';
  FAMILIES.forEach(fam => {
    const intro = familyIntros[fam.key] || {};
    const voicings = fam.voicings.map(i => window.EguchiCheat.VOICINGS[i]);
    const row = document.createElement('div');
    row.className = 'family-row';
    row.innerHTML = `
      <div class="family-header">
        <span class="roman">${fam.roman}</span>
        <span class="name">${intro.label || fam.key}</span>
        <span class="cue">${intro.cue || ''}</span>
      </div>
      ${intro.distinguish ? `<div class="family-distinguish">${intro.distinguish}</div>` : ''}
      <div class="voicing-trio"></div>
    `;
    const trio = row.querySelector('.voicing-trio');
    voicings.forEach(v => {
      const card = document.createElement('div');
      card.className = 'voicing';
      const svg = renderFn(v, svgOpts);
      card.innerHTML = `
        <div class="color-band" style="background:${v.hex};color:${v.text};">
          <span class="inv-tag" style="color:${v.text};">${v.invShort}</span>
          <span class="kanji" style="color:${v.text};">${v.kanji}</span>
          <span class="kanji-side" style="color:${v.text};">
            <span class="reading">${v.kanjiReading}</span>
            <span class="etymology">${v.etymology || ''}</span>
          </span>
        </div>
        <div class="body">
          <div class="name-line">
            <span class="pt-name">${v.name}</span>
            <span class="cifra">${v.chordSym}</span>
          </div>
          <div class="bass-cue">▸ ${v.bass || ''} · ${v.feel || ''}</div>
          <div class="notes">
            <strong>${v.notesPt[0]}</strong><span class="arrow">→</span>
            <strong>${v.notesPt[1]}</strong><span class="arrow">→</span>
            <strong>${v.notesPt[2]}</strong>
          </div>
          <div class="diagram">${svg}</div>
          <div class="verbete">${v.verbete || ''}</div>
        </div>
      `;
      trio.appendChild(card);
    });
    container.appendChild(row);
  });

  // Footer
  const footEl = document.getElementById('posterFooterRight');
  if (footEl) footEl.textContent = `A3 retrato · ${cfg.label.toLowerCase()}`;
}

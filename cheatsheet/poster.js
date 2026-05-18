// Eguchi A3 Poster builder — call buildPoster(instrumentKey)
// Requires lib.js already loaded.

const POSTER_INSTRUMENTS = {
  piano: { label: 'Piano', tagline: 'Teclado · acorde simultâneo', renderFn: 'pianoSVG', svgOpts: { keyWidth: 16, keyHeight: 64 } },
  violao: { label: 'Violão', tagline: 'Afinação padrão · voicing de 3 cordas', renderFn: 'guitarSVG', svgOpts: {} },
  trompete: { label: 'Trompete em Dó', tagline: 'Concert pitch · arpejo monofônico', renderFn: 'trumpetSVG', svgOpts: {} },
  gaita: { label: 'Gaita Diatônica em Dó', tagline: 'Richter · 10 furos · arpejo · ↑ sopra / ↓ puxa', renderFn: 'harmonicaSVG', svgOpts: {} },
};

const FAMILIES = [
  { roman: 'I',  name: 'Dó maior',  desc: 'tônica · o lar',          slice: [0, 3] },
  { roman: 'IV', name: 'Fá maior',  desc: 'subdominante · o repouso', slice: [3, 6] },
  { roman: 'V',  name: 'Sol maior', desc: 'dominante · a tensão',     slice: [6, 9] },
];

function buildPoster(instrumentKey, opts) {
  opts = opts || {};
  const bw = !!opts.bw;
  const cfg = POSTER_INSTRUMENTS[instrumentKey];
  if (!cfg) return;
  const renderFn = window.EguchiCheat[cfg.renderFn];
  const svgOpts = { ...cfg.svgOpts, bw };

  // Header
  document.title = `Eguchi · A3 ${cfg.label}`;
  document.getElementById('instrumentName').textContent = cfg.label.toLowerCase();
  const subEl = document.getElementById('instrumentSub');
  if (subEl) subEl.textContent = cfg.tagline;

  // Build families
  const container = document.getElementById('familiesWrap');
  if (!container) return;
  container.innerHTML = '';
  FAMILIES.forEach(fam => {
    const voicings = window.EguchiCheat.VOICINGS.slice(fam.slice[0], fam.slice[1]);
    const row = document.createElement('div');
    row.className = 'family-row';
    row.innerHTML = `
      <div class="family-label">
        <span class="roman">${fam.roman}</span>
        <span class="name">${fam.name}</span>
        <span class="meta">${fam.desc}</span>
      </div>
      <div class="voicing-trio"></div>
    `;
    const trio = row.querySelector('.voicing-trio');
    voicings.forEach(v => {
      const card = document.createElement('div');
      card.className = 'voicing';
      const svg = renderFn(v, svgOpts);
      card.innerHTML = `
        <div class="color-band" style="background:${v.hex};color:${v.text};">
          <span class="inv-tag" style="color:${v.text};opacity:0.7;">${v.invShort}</span>
          <span class="kanji" style="color:${v.text};">${v.kanji}</span>
          <span class="kanji-reading" style="color:${v.text};">${v.kanjiReading}</span>
        </div>
        <div class="body">
          <div class="name-line">
            <span class="pt-name">${v.name}</span>
            <span class="cifra">${v.chordSym}</span>
          </div>
          <div class="notes">
            <strong>${v.notesPt[0]}</strong><span class="arrow">→</span>
            <strong>${v.notesPt[1]}</strong><span class="arrow">→</span>
            <strong>${v.notesPt[2]}</strong>
          </div>
          <div class="diagram">${svg}</div>
          <div class="voicing-detail">${v.notes.join(' · ')}</div>
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

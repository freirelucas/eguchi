// Eguchi · Onboarding (first-run + calibration)

function ScrPad({ children, style }) {
  return <div style={{ padding: '20px 22px 28px', flex: 1, display: 'flex', flexDirection: 'column', ...style }}>{children}</div>;
}

// 1 · Welcome — the lab feeling
function ScrOnboardWelcome() {
  return (
    <ScrPad>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Label style={{ display: 'block', marginBottom: 14 }}>江口式実験室 · n=1</Label>
        <H1>treino<br/><em style={{ color: T.accent, fontStyle: 'italic' }}>de ouvido.</em></H1>
        <p style={{ fontFamily: T.serif, fontSize: 16, lineHeight: 1.55, color: T.textDim, marginTop: 22 }}>
          O método Eguchi associa cada acorde a uma cor. Aqui, ele é um experimento de um sujeito só — você.
        </p>
        <p style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 13.5, color: T.textMute, marginTop: 14, lineHeight: 1.5 }}>
          Mediremos antes. Treinaremos com rigor. Exportaremos os dados.
        </p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {[0,1,2,3].map(i => <div key={i} style={{ flex: 1, height: 2, background: i === 0 ? T.accent : T.bg3, borderRadius: 1 }} />)}
      </div>
      <div style={{ marginTop: 16 }}><Btn variant="primary" block>Continuar</Btn></div>
    </ScrPad>
  );
}

// 2 · What you'll do
function ScrOnboardGoal() {
  const steps = [
    { n: '01', t: 'Baseline cego', d: '50 trials sem feedback — para saber seu ponto de partida.' },
    { n: '02', t: 'Treino diário', d: '15 a 100 trials. Acordes desbloqueados gradualmente.' },
    { n: '03', t: 'Probes periódicos', d: 'A cada 5 sessões, teste com variações inéditas.' },
    { n: '04', t: 'Diário', d: 'Sono, café, mood. Variáveis confundidoras viram dados.' },
  ];
  return (
    <ScrPad>
      <Label style={{ display: 'block' }}>O que vai acontecer</Label>
      <h2 style={{ fontFamily: T.serif, fontWeight: 400, fontSize: 28, letterSpacing: '-0.02em', lineHeight: 1.1, marginTop: 10, marginBottom: 22 }}>
        Quatro coisas, <em style={{ color: T.accent, fontStyle: 'italic' }}>repetidas.</em>
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18, flex: 1 }}>
        {steps.map(s => (
          <div key={s.n} style={{ display: 'flex', gap: 14 }}>
            <span style={{ fontFamily: T.mono, fontSize: 11, color: T.accent, letterSpacing: '0.1em', paddingTop: 3 }}>{s.n}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: T.serif, fontSize: 17, lineHeight: 1.25 }}>{s.t}</div>
              <div style={{ fontFamily: T.serif, fontSize: 13, color: T.textDim, marginTop: 4, lineHeight: 1.5 }}>{s.d}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 16 }}>
        {[0,1,2,3].map(i => <div key={i} style={{ flex: 1, height: 2, background: i === 1 ? T.accent : T.bg3, borderRadius: 1 }} />)}
      </div>
      <div style={{ marginTop: 16 }}><Btn variant="primary" block>Continuar</Btn></div>
    </ScrPad>
  );
}

// 3 · Audio calibration — volume + headphones
function ScrOnboardCalibrate() {
  return (
    <ScrPad>
      <Label style={{ display: 'block' }}>Calibração · 01</Label>
      <h2 style={{ fontFamily: T.serif, fontWeight: 400, fontSize: 28, lineHeight: 1.1, marginTop: 10, marginBottom: 4 }}>
        Som <em style={{ color: T.accent, fontStyle: 'italic' }}>limpo.</em>
      </h2>
      <p style={{ fontFamily: T.serif, fontSize: 14, color: T.textDim, lineHeight: 1.5, marginBottom: 24 }}>
        Use fones. Toque uma vez e ajuste o volume até a nota mais aguda ficar nítida sem doer.
      </p>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
        <PlayBtn size={120} state="idle" label="Lá 4 · 440 Hz · senoidal" />

        <div style={{ width: '100%', maxWidth: 280 }}>
          <Label style={{ display: 'block', marginBottom: 8 }}>volume do app</Label>
          <div style={{ height: 3, background: T.bg2, borderRadius: 2, position: 'relative' }}>
            <div style={{ height: '100%', width: '60%', background: T.accent, borderRadius: 2 }} />
            <div style={{ position: 'absolute', left: '60%', top: -7, transform: 'translateX(-50%)', width: 17, height: 17, borderRadius: '50%', background: T.text, boxShadow: '0 2px 4px rgba(0,0,0,0.4)' }} />
          </div>
        </div>
      </div>

      <div style={{ padding: 14, background: 'rgba(112,144,176,0.08)', border: `1px solid rgba(112,144,176,0.18)`, borderRadius: 6, marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
          <span style={{ fontFamily: T.mono, fontSize: 10, color: T.cool, letterSpacing: '0.16em', textTransform: 'uppercase' }}>i</span>
          <span style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 13, color: T.textDim, lineHeight: 1.45 }}>
            Sem fones, a discriminação cai ~30%. Use o mesmo par sempre — o equipamento entra como covariável.
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {[0,1,2,3].map(i => <div key={i} style={{ flex: 1, height: 2, background: i === 2 ? T.accent : T.bg3, borderRadius: 1 }} />)}
      </div>
      <div style={{ marginTop: 14 }}><Btn variant="primary" block>Está bom</Btn></div>
    </ScrPad>
  );
}

// 4 · Color↔chord intro
function ScrOnboardColors() {
  return (
    <ScrPad>
      <Label style={{ display: 'block' }}>Calibração · 02</Label>
      <h2 style={{ fontFamily: T.serif, fontWeight: 400, fontSize: 28, lineHeight: 1.1, marginTop: 10, marginBottom: 4 }}>
        Oito acordes, <em style={{ color: T.accent, fontStyle: 'italic' }}>oito cores.</em>
      </h2>
      <p style={{ fontFamily: T.serif, fontSize: 13.5, color: T.textDim, lineHeight: 1.5, marginBottom: 18 }}>
        Vermelho é Dó maior — o "lar". Branco é Sol maior — o brilho que quer voltar. Marrom é Sol7 — a tensão que abre portas. Você não precisa decorar agora.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, flex: 1, alignContent: 'start' }}>
        {CHORDS.map(c => (
          <div key={c.name} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '8px 10px', borderRadius: 6, background: 'rgba(255,255,255,0.02)',
            border: `1px solid ${T.line}`,
          }}>
            <div style={{ width: 28, height: 28, borderRadius: 5, background: c.hex, flexShrink: 0, border: c.hex === '#26201b' ? '1px solid rgba(237,228,208,0.12)' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: chordFg(c), fontFamily: T.serif, fontSize: 14 }}>{c.kanji}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: T.serif, fontSize: 12.5, lineHeight: 1 }}>{c.name}</div>
              <div style={{ fontFamily: T.mono, fontSize: 9, color: T.textMute, marginTop: 2 }}>{c.sym}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 14 }}>
        {[0,1,2,3].map(i => <div key={i} style={{ flex: 1, height: 2, background: i === 3 ? T.accent : T.bg3, borderRadius: 1 }} />)}
      </div>
      <div style={{ marginTop: 12 }}><Btn variant="primary" block>Quero medir</Btn></div>
    </ScrPad>
  );
}

// 5 · Baseline gate
function ScrOnboardBaseline() {
  return (
    <ScrPad>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Label style={{ display: 'block', marginBottom: 14, color: T.cool }}>baseline · cego</Label>
        <H2>Antes de treinar,<br/><em style={{ color: T.cool, fontStyle: 'italic' }}>uma medição.</em></H2>
        <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', gap: 12 }}>
            <span style={{ fontFamily: T.mono, fontSize: 11, color: T.cool, paddingTop: 2 }}>⏱</span>
            <div style={{ fontFamily: T.serif, fontSize: 14.5, lineHeight: 1.5, color: T.textDim }}>
              <strong style={{ color: T.text, fontWeight: 500 }}>50 trials.</strong> Cerca de 6 minutos. Você tocará todas as 8 cores misturadas.
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <span style={{ fontFamily: T.mono, fontSize: 11, color: T.cool, paddingTop: 2 }}>○</span>
            <div style={{ fontFamily: T.serif, fontSize: 14.5, lineHeight: 1.5, color: T.textDim }}>
              <strong style={{ color: T.text, fontWeight: 500 }}>Sem feedback.</strong> Não saberá se acertou. É o que torna a medida limpa.
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <span style={{ fontFamily: T.mono, fontSize: 11, color: T.cool, paddingTop: 2 }}>⟲</span>
            <div style={{ fontFamily: T.serif, fontSize: 14.5, lineHeight: 1.5, color: T.textDim }}>
              <strong style={{ color: T.text, fontWeight: 500 }}>Sem ressentimento.</strong> Provavelmente vai acertar perto do acaso (12.5%). É o objetivo.
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Btn variant="primary" block style={{ background: T.cool, color: T.bg }}>Começar baseline</Btn>
        <Btn variant="ghost" block small>Pular por agora</Btn>
      </div>
    </ScrPad>
  );
}

Object.assign(window, {
  ScrPad,
  ScrOnboardWelcome, ScrOnboardGoal, ScrOnboardCalibrate,
  ScrOnboardColors, ScrOnboardBaseline,
});

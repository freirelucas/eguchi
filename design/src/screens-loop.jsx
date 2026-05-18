// Eguchi · Loop screens (session end, streak, drill, baseline-vs-now)

// ─── Session-end summary ───
function ScrSessionEnd() {
  const colorAcc = [
    { c: CHORDS[0], pct: 0.95 },
    { c: CHORDS[1], pct: 0.82 },
    { c: CHORDS[2], pct: 0.73 },
    { c: CHORDS[3], pct: 0.61 },
    { c: CHORDS[4], pct: 0.45 },
  ];
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <TopBar back="← Menu" title="sessão · feito" meta="30 trials" />

      <div style={{ flex: 1, overflowY: 'auto', padding: '18px 22px 22px' }}>
        {/* hero metric */}
        <div style={{ textAlign: 'center', marginBottom: 26, marginTop: 8 }}>
          <Label>acurácia · sessão</Label>
          <div style={{ fontFamily: T.serif, fontSize: 72, lineHeight: 1, marginTop: 8, color: T.green }}>
            83<span style={{ fontSize: 32, color: T.textDim }}>%</span>
          </div>
          <div style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 14, color: T.textDim, marginTop: 6 }}>
            +5pp vs sua média dos últimos 7 dias
          </div>
        </div>

        {/* per-color */}
        <Label style={{ display: 'block', marginBottom: 10 }}>por cor · esta sessão</Label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 22 }}>
          {colorAcc.map(({ c, pct }) => (
            <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 16, height: 16, borderRadius: 3, background: c.hex, border: c.hex === '#26201b' ? '1px solid rgba(237,228,208,0.12)' : 'none' }} />
              <div style={{ width: 70, fontFamily: T.serif, fontSize: 13 }}>{c.name}</div>
              <div style={{ flex: 1, height: 3, background: T.bg2, borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${pct * 100}%`, background: pct > 0.7 ? T.green : pct > 0.5 ? T.warm : T.red }} />
              </div>
              <div style={{ fontFamily: T.mono, fontSize: 10, color: T.textDim, width: 32, textAlign: 'right' }}>{Math.round(pct * 100)}%</div>
            </div>
          ))}
        </div>

        {/* secondary metrics */}
        <Panel style={{ marginBottom: 18 }}>
          <PanelRow label="tempo médio resposta" value="1.24s" valueColor={T.green} />
          <PanelRow label="trial mais rápido" value="0.51s" divider />
          <PanelRow label="trial mais lento" value="3.82s" divider />
        </Panel>

        {/* insight callout */}
        <div style={{ padding: 14, background: 'rgba(212,101,74,0.06)', border: `1px solid rgba(212,101,74,0.18)`, borderRadius: 6, marginBottom: 22 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <span style={{ fontFamily: T.mono, fontSize: 10, color: T.accent, letterSpacing: '0.16em', textTransform: 'uppercase' }}>↗ insight</span>
          </div>
          <div style={{ fontFamily: T.serif, fontSize: 14.5, lineHeight: 1.5, marginTop: 8 }}>
            Você está trocando <em style={{ color: T.accent, fontStyle: 'italic' }}>Preto com Roxo</em> em 4 de 6 erros. Os dois são menores próximos — vale um drill focado.
          </div>
          <div style={{ marginTop: 10 }}>
            <Btn variant="ghost" small>Treinar Preto vs Roxo</Btn>
          </div>
        </div>

        {/* next unlock progress */}
        <Label style={{ display: 'block', marginBottom: 8 }}>desbloqueio · cor 6 · roxo</Label>
        <Panel>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
            <span style={{ fontFamily: T.serif, fontSize: 14 }}>P(acerto &gt; 85%)</span>
            <span style={{ fontFamily: T.mono, fontSize: 12, color: T.accent }}>87% · falta 8%</span>
          </div>
          <ProgressBar pct={0.87} />
          <div style={{ fontFamily: T.mono, fontSize: 9.5, color: T.textMute, marginTop: 8, lineHeight: 1.5 }}>
            48/50 trials no nível · RT 1.24s ✓ &lt;1.5s · 6/7 dias
          </div>
        </Panel>
      </div>

      <div style={{ padding: '12px 22px 8px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <Btn variant="ghost" small>Ver detalhes</Btn>
        <Btn variant="primary" small>Continuar</Btn>
      </div>
    </div>
  );
}

// ─── Streak / consistency ───
function ScrStreak() {
  // 8 weeks × 7 days grid
  const data = Array.from({ length: 56 }, (_, i) => {
    // first 14 days: half done
    if (i < 4) return 0;
    if (i < 8) return Math.random() > 0.5 ? 1 : 0;
    // recent 14 days: full streak
    if (i > 41) return 1;
    return Math.random() > 0.3 ? 1 : 0;
  });

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <TopBar back="← Menu" title="consistência" meta="8 sem" />
      <div style={{ flex: 1, overflowY: 'auto', padding: '18px 22px 22px' }}>
        <div style={{ textAlign: 'center', marginBottom: 26 }}>
          <Label>streak atual</Label>
          <div style={{ fontFamily: T.serif, fontSize: 78, lineHeight: 1, marginTop: 8 }}>
            14
          </div>
          <div style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 14, color: T.textDim, marginTop: 6 }}>
            dias seguidos · seu recorde
          </div>
        </div>

        {/* heatmap */}
        <Label style={{ display: 'block', marginBottom: 10 }}>últimas 8 semanas</Label>
        <div style={{ display: 'grid', gridTemplateColumns: 'auto repeat(7, 1fr)', gap: 4, marginBottom: 18 }}>
          <div />
          {['s','t','q1','q2','s1','s2','d'].map((d, i) => <div key={d} style={{ fontFamily: T.mono, fontSize: 9, color: T.textMute, textAlign: 'center' }}>{['s','t','q','q','s','s','d'][i]}</div>)}
          {Array.from({ length: 8 }, (_, w) => (
            <React.Fragment key={`w${w}`}>
              <div style={{ fontFamily: T.mono, fontSize: 9, color: T.textMute, paddingTop: 8 }}>{w === 0 ? 'agora' : `-${w}`}</div>
              {Array.from({ length: 7 }, (_, d) => {
                const idx = (7 - w) * 7 + d;
                const val = data[Math.max(0, Math.min(55, idx))];
                return (
                  <div key={`${w}-${d}`} style={{ aspectRatio: '1', borderRadius: 3, background: val ? T.accent : T.bg2, opacity: val ? 0.8 + Math.random() * 0.2 : 1 }} />
                );
              })}
            </React.Fragment>
          ))}
        </div>

        <Panel style={{ marginBottom: 14 }}>
          <PanelRow label="dias treinados · 56" value="42" />
          <PanelRow label="% consistência" value="75%" valueColor={T.green} divider />
          <PanelRow label="maior streak" value="14 dias" divider />
          <PanelRow label="média trials/dia" value="34" divider />
        </Panel>

        <div style={{ padding: 14, background: T.bg2, borderRadius: 6 }}>
          <div style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 13.5, color: T.textDim, lineHeight: 1.55 }}>
            <em style={{ color: T.accent }}>Sem culpa.</em> 5 minutos contam. Consistência move acurácia mais do que volume — Sakakibara observou ganhos com 20 min/dia, não 2h.
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Focused drill (1–2 colors) ───
function ScrDrill() {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <TopBar back="← Menu" title="drill focado" meta="5 min" />

      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 22px 22px' }}>
        <Label style={{ display: 'block' }}>par confundido</Label>
        <H2 style={{ marginTop: 8, marginBottom: 16 }}>Preto vs <em style={{ color: T.accent, fontStyle: 'italic' }}>Roxo.</em></H2>
        <p style={{ fontFamily: T.serif, fontSize: 14, color: T.textDim, lineHeight: 1.55, marginBottom: 22 }}>
          Você troca essas duas em 4 de cada 10 erros. Vamos isolar — só essas duas, 20 trials, feedback rico.
        </p>

        {/* the two colors big */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
          {[CHORDS[4], CHORDS[5]].map(c => (
            <div key={c.name} style={{ aspectRatio: '0.85', borderRadius: 12, background: c.hex, padding: 16, color: chordFg(c), fontFamily: T.serif, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: c.hex === '#26201b' ? '1px solid rgba(237,228,208,0.12)' : 'none' }}>
              <div style={{ fontSize: 44, lineHeight: 1 }}>{c.kanji}</div>
              <div>
                <div style={{ fontSize: 22 }}>{c.name}</div>
                <div style={{ fontFamily: T.mono, fontSize: 10, opacity: 0.7, marginTop: 4, letterSpacing: '0.14em', textTransform: 'uppercase' }}>{c.chord}</div>
              </div>
            </div>
          ))}
        </div>

        {/* settings */}
        <ScreenSection title="trials">
          <Seg options={['10','20','30']} active="20" />
        </ScreenSection>
        <ScreenSection title="timbre">
          <Seg options={['piano','sine','órgão']} active="piano" />
        </ScreenSection>

        <Panel style={{ marginTop: 6 }}>
          <PanelRow label="seu histórico · roxo" value="61%" valueColor={T.red} />
          <PanelRow label="seu histórico · preto" value="64%" valueColor={T.red} divider />
          <PanelRow label="confusão mútua" value="38%" valueColor={T.warm} divider />
        </Panel>
      </div>

      <div style={{ padding: '12px 22px 8px' }}><Btn variant="primary" block>Começar drill</Btn></div>
    </div>
  );
}

// ─── Baseline vs Now ───
function ScrBaselineVsNow() {
  // mini chart svg: baseline (cool) vs now (accent) per color
  const data = CHORDS.map((c, i) => ({
    c,
    baseline: [0.12, 0.18, 0.10, 0.16, 0.13, 0.09, 0.11, 0.10][i],
    now:      [0.95, 0.82, 0.73, 0.61, 0.45, 0.35, 0,    0][i],
    unlocked: i < 6,
  }));

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <TopBar back="← Menu" title="baseline vs agora" meta="∆ 42 dias" />

      <div style={{ flex: 1, overflowY: 'auto', padding: '18px 22px 22px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
          <div>
            <Label style={{ color: T.cool }}>baseline · 6 abr</Label>
            <div style={{ fontFamily: T.serif, fontSize: 48, lineHeight: 1, color: T.cool, marginTop: 6 }}>27<span style={{ fontSize: 22 }}>%</span></div>
          </div>
          <div style={{ fontFamily: T.serif, fontSize: 28, color: T.textMute, fontStyle: 'italic' }}>→</div>
          <div style={{ textAlign: 'right' }}>
            <Label style={{ color: T.accent }}>agora · 18 mai</Label>
            <div style={{ fontFamily: T.serif, fontSize: 48, lineHeight: 1, color: T.accent, marginTop: 6 }}>78<span style={{ fontSize: 22 }}>%</span></div>
          </div>
        </div>

        <div style={{ padding: '14px 16px', background: 'rgba(143,184,116,0.08)', border: `1px solid rgba(143,184,116,0.20)`, borderRadius: 6, marginBottom: 24 }}>
          <Label style={{ color: T.green }}>delta</Label>
          <div style={{ fontFamily: T.serif, fontSize: 22, marginTop: 4 }}>
            +51 pontos percentuais.
          </div>
          <div style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 13, color: T.textDim, marginTop: 6, lineHeight: 1.5 }}>
            Significativo bem além do acaso (12.5%). Caveat: sem grupo controle.
          </div>
        </div>

        <Label style={{ display: 'block', marginBottom: 12 }}>por cor · comparação</Label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 22 }}>
          {data.map(({ c, baseline, now, unlocked }) => (
            <div key={c.name} style={{ opacity: unlocked ? 1 : 0.4 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5 }}>
                <div style={{ width: 14, height: 14, borderRadius: 3, background: c.hex, border: c.hex === '#26201b' ? '1px solid rgba(237,228,208,0.12)' : 'none' }} />
                <span style={{ fontFamily: T.serif, fontSize: 12.5, flex: 1 }}>{c.name}</span>
                <span style={{ fontFamily: T.mono, fontSize: 9.5, color: T.cool, width: 36, textAlign: 'right' }}>{Math.round(baseline * 100)}%</span>
                <span style={{ fontFamily: T.mono, fontSize: 9.5, color: T.textMute }}>→</span>
                <span style={{ fontFamily: T.mono, fontSize: 9.5, color: unlocked ? T.green : T.textMute, width: 36, textAlign: 'right' }}>{unlocked ? Math.round(now * 100) + '%' : '—'}</span>
              </div>
              <div style={{ height: 4, background: T.bg2, borderRadius: 1, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', height: '100%', width: `${baseline * 100}%`, background: T.cool, opacity: 0.5 }} />
                <div style={{ position: 'absolute', height: '100%', width: `${now * 100}%`, background: T.accent }} />
              </div>
            </div>
          ))}
        </div>

        <Btn variant="ghost" block small>Refazer baseline (recomendado a cada 90 dias)</Btn>
      </div>
    </div>
  );
}

Object.assign(window, {
  ScrSessionEnd, ScrStreak, ScrDrill, ScrBaselineVsNow,
});

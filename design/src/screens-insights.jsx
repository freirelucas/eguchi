// Eguchi · Insights, probes, stats

// ─── Insights screen ───
function ScrInsights() {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <TopBar back="← Menu" title="insights" meta="auto" />

      <div style={{ flex: 1, overflowY: 'auto', padding: '18px 22px 22px' }}>

        {/* major insight */}
        <div style={{ padding: 18, borderRadius: 10, background: 'rgba(212,101,74,0.07)', border: `1px solid rgba(212,101,74,0.22)`, marginBottom: 14 }}>
          <Label style={{ color: T.accent }}>↗ confusão · alta</Label>
          <h3 style={{ fontFamily: T.serif, fontWeight: 400, fontSize: 22, lineHeight: 1.2, margin: '8px 0 10px', letterSpacing: '-0.01em' }}>
            <em style={{ color: T.accent, fontStyle: 'italic' }}>Preto</em> vira <em style={{ color: T.accent, fontStyle: 'italic' }}>Roxo</em> em 38% dos erros.
          </h3>
          <p style={{ fontFamily: T.serif, fontSize: 13, color: T.textDim, lineHeight: 1.5 }}>
            Ambos são acordes menores com terça menor adjacente — confusão estrutural, não de afinação. Treine como par.
          </p>
          <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
            <Btn variant="primary" small>Drill 5min</Btn>
            <Btn variant="ghost" small>Dispensar</Btn>
          </div>
        </div>

        {/* secondary insights */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>

          <div style={{ padding: 14, borderRadius: 8, background: T.bg2, border: `1px solid ${T.line}` }}>
            <Label style={{ color: T.green }}>↘ rt em queda</Label>
            <div style={{ fontFamily: T.serif, fontSize: 16, lineHeight: 1.35, marginTop: 6 }}>
              <em style={{ color: T.green, fontStyle: 'italic' }}>Vermelho</em> caiu de 1.8s → 0.6s em 14 dias.
            </div>
            <div style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 12, color: T.textMute, marginTop: 4, lineHeight: 1.5 }}>
              Está migrando de cálculo para reconhecimento direto.
            </div>
          </div>

          <div style={{ padding: 14, borderRadius: 8, background: T.bg2, border: `1px solid ${T.line}` }}>
            <Label style={{ color: T.warm }}>○ probe vs treino</Label>
            <div style={{ fontFamily: T.serif, fontSize: 16, lineHeight: 1.35, marginTop: 6 }}>
              Treino 82% · probe 54%.
            </div>
            <div style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 12, color: T.textMute, marginTop: 4, lineHeight: 1.5 }}>
              Gap de 28 pontos sugere overfitting ao voicing fixo. Ative variações.
            </div>
          </div>

          <div style={{ padding: 14, borderRadius: 8, background: T.bg2, border: `1px solid ${T.line}` }}>
            <Label style={{ color: T.cool }}>i correlação · sono</Label>
            <div style={{ fontFamily: T.serif, fontSize: 16, lineHeight: 1.35, marginTop: 6 }}>
              Dias com &lt;6h sono → −14pp acurácia.
            </div>
            <div style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 12, color: T.textMute, marginTop: 4, lineHeight: 1.5 }}>
              N=11. Considere pular treino nesses dias.
            </div>
          </div>

          <div style={{ padding: 14, borderRadius: 8, background: T.bg2, border: `1px solid ${T.line}` }}>
            <Label style={{ color: T.textMute }}>i hora do dia</Label>
            <div style={{ fontFamily: T.serif, fontSize: 16, lineHeight: 1.35, marginTop: 6 }}>
              Melhor performance entre 9–11h.
            </div>
            <div style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 12, color: T.textMute, marginTop: 4, lineHeight: 1.5 }}>
              Acurácia 84% vs 71% à noite. N=42 sessões.
            </div>
          </div>

        </div>

        <div style={{ marginTop: 20, padding: 12, borderRadius: 6, background: 'rgba(212,101,74,0.04)', border: `1px dashed rgba(212,101,74,0.18)` }}>
          <div style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 12, color: T.textMute, lineHeight: 1.55 }}>
            <span style={{ color: T.accent }}>N=1 caveat.</span> Insights são heurísticos. Sem grupo controle, padrões podem ser ruído. Exporte os dados quando quiser análise séria.
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── Probe timeline ───
function ScrProbes() {
  const probes = [
    { date: '14 mai', n: 10, train: 0.82, probe: 0.54, instr: 'piano' },
    { date: '03 mai', n: 10, train: 0.78, probe: 0.50, instr: 'sine' },
    { date: '22 abr', n: 10, train: 0.71, probe: 0.40, instr: 'organ' },
    { date: '11 abr', n: 10, train: 0.63, probe: 0.30, instr: 'piano' },
    { date: '06 abr', n: 10, train: null, probe: 0.13, instr: 'piano', isBaseline: true },
  ];

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <TopBar back="← Menu" title="probes · histórico" meta="5 + baseline" />

      <div style={{ flex: 1, overflowY: 'auto', padding: '18px 22px 22px' }}>
        <p style={{ fontFamily: T.serif, fontSize: 13.5, color: T.textDim, lineHeight: 1.5, marginBottom: 22, fontStyle: 'italic' }}>
          Probes testam <em style={{ color: T.warm }}>generalização</em>. Se acurácia do treino sobe mais que probe, você está decorando, não aprendendo.
        </p>

        {/* mini twin-line chart */}
        <div style={{ marginBottom: 26 }}>
          <Label style={{ display: 'block', marginBottom: 10 }}>treino vs probe · trajetória</Label>
          <div style={{ background: T.bg2, borderRadius: 8, padding: '16px 12px 10px' }}>
            <svg viewBox="0 0 300 110" style={{ width: '100%', height: 110 }}>
              {/* grid */}
              {[0, 25, 50, 75, 100].map(y => (
                <line key={y} x1="20" x2="295" y1={10 + (100 - y)} y2={10 + (100 - y)} stroke={T.line} />
              ))}
              {[0, 50, 100].map(y => (
                <text key={'l'+y} x="0" y={14 + (100 - y)} fontSize="8" fontFamily={T.mono} fill={T.textMute}>{y}</text>
              ))}
              {/* treino line */}
              {[null, 0.63, 0.71, 0.78, 0.82].map((v, i, a) => {
                if (!v) return null;
                const prev = a[i - 1];
                if (!prev) return null;
                const x1 = 30 + (i - 1) * 65;
                const x2 = 30 + i * 65;
                return <line key={'t'+i} x1={x1} y1={10 + (1 - prev) * 100} x2={x2} y2={10 + (1 - v) * 100} stroke={T.accent} strokeWidth="2" />;
              })}
              {[null, 0.63, 0.71, 0.78, 0.82].map((v, i) => v && <circle key={'td'+i} cx={30 + i * 65} cy={10 + (1 - v) * 100} r="3.5" fill={T.accent} />)}

              {/* probe line */}
              {[0.13, 0.30, 0.40, 0.50, 0.54].map((v, i, a) => {
                const prev = a[i - 1];
                if (prev === undefined) return null;
                const x1 = 30 + (i - 1) * 65;
                const x2 = 30 + i * 65;
                return <line key={'p'+i} x1={x1} y1={10 + (1 - prev) * 100} x2={x2} y2={10 + (1 - v) * 100} stroke={T.warm} strokeWidth="2" />;
              })}
              {[0.13, 0.30, 0.40, 0.50, 0.54].map((v, i) => <circle key={'pd'+i} cx={30 + i * 65} cy={10 + (1 - v) * 100} r="3.5" fill={T.warm} />)}

              {/* dotted gap shading near right */}
              <line x1="290" x2="290" y1={10 + (1 - 0.82) * 100} y2={10 + (1 - 0.54) * 100} stroke={T.textMute} strokeWidth="1" strokeDasharray="2 2" />
              <text x="278" y={10 + (1 - 0.68) * 100} fontSize="9" fill={T.textMute} fontFamily={T.mono}>28pp</text>
            </svg>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', marginTop: 8 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: T.mono, fontSize: 9.5, color: T.textDim }}>
                <span style={{ width: 10, height: 2, background: T.accent }} /> treino
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: T.mono, fontSize: 9.5, color: T.textDim }}>
                <span style={{ width: 10, height: 2, background: T.warm }} /> probe
              </span>
            </div>
          </div>
        </div>

        <Label style={{ display: 'block', marginBottom: 10 }}>histórico · cego</Label>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {probes.map((p, i) => (
            <div key={i} style={{ padding: '14px 0', borderBottom: `1px solid ${T.line}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                  <div style={{ fontFamily: T.serif, fontSize: 15, color: p.isBaseline ? T.cool : T.text }}>{p.date}</div>
                  <div style={{ fontFamily: T.mono, fontSize: 9, color: T.textMute, marginTop: 3, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    {p.isBaseline ? 'baseline · 50 trials' : `probe · ${p.n} trials · ${p.instr}`}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: T.serif, fontSize: 22, color: p.isBaseline ? T.cool : T.warm, lineHeight: 1 }}>
                    {Math.round(p.probe * 100)}<span style={{ fontSize: 12, color: T.textMute }}>%</span>
                  </div>
                  {!p.isBaseline && <div style={{ fontFamily: T.mono, fontSize: 9, color: T.textMute, marginTop: 4 }}>treino: {Math.round(p.train * 100)}%</div>}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

// ─── Stats deep ───
function ScrStats() {
  // confusion matrix shading
  const matrix = [
    [38, 1,  0,  1, 0, 0, 0, 0],
    [ 2, 32, 3,  0, 0, 1, 1, 1],
    [ 1, 2, 28, 3, 0, 0, 0, 2],
    [ 1, 0, 4, 22, 2, 5, 0, 0],
    [ 0, 0, 0, 3, 18, 7, 1, 0],
    [ 0, 1, 0, 4, 6, 15, 0, 0],
    [ 0, 0, 0, 0, 0, 0,  0, 0],
    [ 0, 0, 0, 0, 0, 0,  0, 0],
  ];
  const rowMax = matrix.map(r => Math.max(...r));

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <TopBar back="← Menu" title="estatísticas" meta="treino" />

      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 22px 22px' }}>
        <Seg options={['treino','baseline','probe']} active="treino" />

        <ScreenSection title="métricas globais" style={{ marginTop: 20 }}>
          <Panel>
            <PanelRow label="acurácia" value="78%" valueColor={T.green} />
            <PanelRow label="tempo médio resposta" value="1.24s" divider />
            <PanelRow label="total de testes" value="1240" divider />
            <PanelRow label="dias treinando" value="42" divider />
          </Panel>
        </ScreenSection>

        <ScreenSection title="matriz de confusão">
          <div style={{ background: T.bg2, borderRadius: 8, padding: 10, overflowX: 'auto' }}>
            <table style={{ borderCollapse: 'collapse', fontFamily: T.mono, fontSize: 9.5, margin: '0 auto' }}>
              <thead>
                <tr>
                  <th style={{ width: 16 }} />
                  {CHORDS.map(c => (
                    <th key={c.name} style={{ padding: 0, width: 22, height: 22 }}>
                      <div style={{ width: 14, height: 14, borderRadius: 2, background: c.hex, margin: '0 auto', border: c.hex === '#26201b' ? '1px solid rgba(237,228,208,0.18)' : 'none' }} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {matrix.map((row, ri) => (
                  <tr key={ri}>
                    <td style={{ padding: 0, textAlign: 'center', width: 16 }}>
                      <div style={{ width: 12, height: 12, borderRadius: 2, background: CHORDS[ri].hex, margin: '0 auto', border: CHORDS[ri].hex === '#26201b' ? '1px solid rgba(237,228,208,0.18)' : 'none' }} />
                    </td>
                    {row.map((v, ci) => {
                      const isDiag = ri === ci;
                      const intensity = rowMax[ri] > 0 ? v / rowMax[ri] : 0;
                      return (
                        <td key={ci} style={{
                          width: 22, height: 22, textAlign: 'center',
                          background: v === 0 ? T.bg : isDiag ? `rgba(143,184,116,${0.1 + 0.4 * intensity})` : `rgba(212,101,74,${0.05 + 0.35 * intensity})`,
                          color: isDiag ? T.green : (v > 0 ? T.accent : T.textMute),
                          fontWeight: isDiag ? 700 : 400,
                          border: `1px solid ${T.bg}`,
                        }}>{v || ''}</td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ fontFamily: T.mono, fontSize: 9, color: T.textMute, textAlign: 'center', marginTop: 8, letterSpacing: '0.1em' }}>
            linha · tocado <span style={{ opacity: 0.4 }}>·</span> coluna · escolhido
          </div>
        </ScreenSection>

        <ScreenSection title="curva de aprendizado · acurácia">
          <div style={{ background: T.bg2, borderRadius: 8, padding: '14px 10px' }}>
            <svg viewBox="0 0 300 100" style={{ width: '100%', height: 90 }}>
              {[0, 25, 50, 75, 100].map(y => <line key={y} x1="0" x2="300" y1={5 + (100 - y) * 0.85} y2={5 + (100 - y) * 0.85} stroke={T.line} />)}
              <line x1="0" x2="300" y1={5 + (100 - 85) * 0.85} y2={5 + (100 - 85) * 0.85} stroke={T.green} strokeDasharray="3 3" />
              <text x="2" y={4 + (100 - 85) * 0.85} fontSize="8" fontFamily={T.mono} fill={T.green}>85%</text>
              <polyline points="0,80 14,76 28,70 42,68 56,62 70,58 84,54 98,50 112,46 126,42 140,38 154,34 168,30 182,28 196,26 210,24 224,22 238,20 252,21 266,19 280,18 294,17"
                fill="none" stroke={T.accent} strokeWidth="2" />
            </svg>
            <div style={{ fontFamily: T.mono, fontSize: 9, color: T.textMute, marginTop: 6, display: 'flex', justifyContent: 'space-between' }}>
              <span>6 abr</span><span>18 mai · hoje</span>
            </div>
          </div>
        </ScreenSection>

        <ScreenSection title="exportar / importar">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <Btn variant="ghost">JSON</Btn>
            <Btn variant="ghost">CSV</Btn>
          </div>
        </ScreenSection>
      </div>
    </div>
  );
}

Object.assign(window, { ScrInsights, ScrProbes, ScrStats });

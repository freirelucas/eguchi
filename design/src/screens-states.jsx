// Eguchi · State screens (loading, empty, error, success)

// ─── Loading · skeleton ───
function ScrLoading() {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 40, borderBottom: `1px solid ${T.line}` }} />
      <div style={{ padding: '24px 22px', flex: 1 }}>
        <div style={{ height: 16, width: '40%', background: T.bg2, borderRadius: 3, marginBottom: 14 }} />
        <div style={{ height: 38, width: '70%', background: T.bg2, borderRadius: 4, marginBottom: 24 }} />
        <div style={{ height: 92, background: T.bg2, borderRadius: 8, marginBottom: 12 }} />
        <div style={{ height: 56, background: T.bg2, borderRadius: 8, marginBottom: 12 }} />
        <div style={{ height: 56, background: T.bg2, borderRadius: 8 }} />
      </div>
      <div style={{ textAlign: 'center', paddingBottom: 28, fontFamily: T.serif, fontStyle: 'italic', fontSize: 13, color: T.textMute }}>
        carregando…
      </div>
    </div>
  );
}

// ─── Empty · first launch / reset ───
function ScrEmpty() {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 22px', textAlign: 'center' }}>
      <svg width="90" height="90" viewBox="0 0 90 90" style={{ marginBottom: 22 }}>
        {[
          [45, 18], [62, 28], [68, 45], [62, 62],
          [45, 70], [28, 62], [22, 45], [28, 28],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="6" fill={CHORDS[i].hex} opacity={0.35}
            stroke={CHORDS[i].hex === '#26201b' ? 'rgba(237,228,208,0.2)' : 'none'} />
        ))}
      </svg>
      <H2 style={{ fontSize: 24 }}>Ainda sem <em style={{ color: T.accent, fontStyle: 'italic' }}>dados.</em></H2>
      <p style={{ fontFamily: T.serif, fontSize: 13.5, color: T.textDim, lineHeight: 1.55, marginTop: 12, maxWidth: 260 }}>
        Faça um baseline ou uma sessão de treino para começar a popular esta tela.
      </p>
      <div style={{ marginTop: 22, width: '100%', maxWidth: 240, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Btn variant="primary" block small>Fazer baseline</Btn>
        <Btn variant="ghost" block small>Treinar sem baseline</Btn>
      </div>
    </div>
  );
}

// ─── Error · audio context blocked ───
function ScrError() {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <TopBar back="← Sair" title="erro" meta="" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 22px', textAlign: 'center' }}>
        <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(197,82,58,0.12)', border: `1px solid rgba(197,82,58,0.3)`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
          <span style={{ fontFamily: T.serif, fontSize: 28, color: T.red, fontStyle: 'italic' }}>!</span>
        </div>
        <H2 style={{ fontSize: 22 }}><em style={{ color: T.red, fontStyle: 'italic' }}>Sem áudio.</em></H2>
        <p style={{ fontFamily: T.serif, fontSize: 13.5, color: T.textDim, lineHeight: 1.55, marginTop: 12, maxWidth: 270 }}>
          O navegador bloqueou o áudio. Toque em qualquer lugar para liberar — política padrão do Safari/Chrome.
        </p>
        <div style={{ marginTop: 22, width: '100%', maxWidth: 240 }}>
          <Btn variant="primary" block small>Tocar para liberar</Btn>
        </div>

        <p style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 11.5, color: T.textMute, marginTop: 30, maxWidth: 260, lineHeight: 1.5 }}>
          Se persistir: verifique se o silencioso do iPhone está desativado.
        </p>
      </div>
    </div>
  );
}

// ─── Success · unlock animation ───
function ScrUnlock() {
  const c = CHORDS[5]; // Roxo unlocked
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 22px', textAlign: 'center', background: T.bg }}>
      <Label style={{ color: T.green, marginBottom: 18 }}>nível desbloqueado</Label>

      {/* big color reveal */}
      <div style={{ position: 'relative', marginBottom: 24 }}>
        <div style={{
          width: 160, height: 160, borderRadius: '50%',
          background: c.hex,
          boxShadow: `0 0 0 16px ${c.hex}33, 0 0 0 32px ${c.hex}1a, 0 20px 60px rgba(0,0,0,0.4)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: chordFg(c), fontFamily: T.serif, fontSize: 84,
        }}>{c.kanji}</div>
      </div>

      <H1 style={{ fontSize: 44 }}>{c.name}.</H1>
      <p style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 16, color: T.textDim, marginTop: 10, maxWidth: 280, lineHeight: 1.4 }}>
        {c.chord} · a relativa menor de Dó. O lar visto pela sombra.
      </p>

      <Panel style={{ marginTop: 30, width: '100%', maxWidth: 280 }}>
        <PanelRow label="trials neste nível" value="58" />
        <PanelRow label="acurácia" value="89%" valueColor={T.green} divider />
        <PanelRow label="rt médio" value="1.18s" divider />
        <PanelRow label="P(domínio)" value="96%" valueColor={T.green} divider />
      </Panel>

      <div style={{ marginTop: 28, width: '100%', maxWidth: 280 }}>
        <Btn variant="primary" block>Continuar treinando</Btn>
      </div>
    </div>
  );
}

Object.assign(window, { ScrLoading, ScrEmpty, ScrError, ScrUnlock });

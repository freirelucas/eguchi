// Eguchi · Core screens (Menu + Training A & B)

// ─── Menu / Home ───
function ScrMenu() {
  return (
    <div style={{ flex: 1, padding: '24px 22px 22px', display: 'flex', flexDirection: 'column' }}>
      <div>
        <div style={{ textAlign: 'center', marginTop: 8, marginBottom: 28 }}>
          <H1 style={{ fontSize: 56 }}>eguchi<em style={{ color: T.accent, fontStyle: 'italic' }}>lab.</em></H1>
          <div style={{ fontFamily: T.mono, fontSize: 9.5, letterSpacing: '0.3em', textTransform: 'uppercase', color: T.textMute, marginTop: 12 }}>n=1 · treino & mensuração</div>
          <div style={{ fontFamily: T.serif, fontSize: 12, color: T.textMute, marginTop: 4, letterSpacing: '0.4em' }}>江口式実験室</div>
        </div>

        {/* Today panel — replaces the static "metrics" panel with a more daily-oriented view */}
        <Panel style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div>
              <Label>hoje</Label>
              <div style={{ fontFamily: T.serif, fontSize: 30, lineHeight: 1, marginTop: 6 }}>terça, 19 mai</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <Label>streak</Label>
              <div style={{ fontFamily: T.serif, fontSize: 30, lineHeight: 1, marginTop: 6, color: T.accent }}>14 <span style={{ fontSize: 16, color: T.textDim }}>dias</span></div>
            </div>
          </div>
          {/* mini-week */}
          <div style={{ marginTop: 14, display: 'flex', gap: 5 }}>
            {['S','T','Q','Q','S','S','D'].map((d, i) => (
              <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ fontFamily: T.mono, fontSize: 9, color: T.textMute, marginBottom: 4 }}>{d}</div>
                <div style={{ height: 24, borderRadius: 3, background: i <= 5 ? T.accent : T.bg3, opacity: i === 6 ? 1 : (i <= 5 ? (0.45 + i * 0.09) : 1) }} />
              </div>
            ))}
          </div>
        </Panel>

        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 8, marginBottom: 12 }}>
          <Panel style={{ padding: '12px 14px' }}>
            <Label>nível</Label>
            <div style={{ fontFamily: T.serif, fontSize: 22, lineHeight: 1, marginTop: 4 }}>3 <span style={{ color: T.textMute }}>/ 8</span></div>
            <div style={{ fontFamily: T.mono, fontSize: 9, color: T.textMute, marginTop: 4 }}>★ próx: 12 trials</div>
          </Panel>
          <Panel style={{ padding: '12px 14px' }}>
            <Label>acurácia</Label>
            <div style={{ fontFamily: T.serif, fontSize: 22, lineHeight: 1, marginTop: 4, color: T.green }}>78<span style={{ fontSize: 14, color: T.textDim }}>%</span></div>
            <div style={{ fontFamily: T.mono, fontSize: 9, color: T.textMute, marginTop: 4 }}>+12 vs baseline</div>
          </Panel>
        </div>
      </div>

      <div style={{ flex: 1 }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Btn variant="primary" block>Treinar sessão · 30 trials</Btn>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <Btn sub="1–2 cores · 5 min">Drill focado</Btn>
          <Btn sub="ver detalhes">Insights</Btn>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <Btn variant="ghost">Explorar</Btn>
          <Btn variant="ghost">Diário</Btn>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <Btn variant="ghost">Estatísticas</Btn>
          <Btn variant="ghost">Ajustes</Btn>
        </div>
      </div>
    </div>
  );
}

// ─── Training · A (classic — refined) ───
function ScrTrainA() {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <TopBar back="← Sair" title={<>treino <em style={{ color: T.accent }}>·</em> n3</>} meta="14 / 30" />

      {/* progress */}
      <div style={{ padding: '10px 18px' }}><ProgressBar pct={14/30} /></div>

      {/* play area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: '8px 18px' }}>
        <div style={{ fontFamily: T.mono, fontSize: 9.5, letterSpacing: '0.22em', textTransform: 'uppercase', color: T.textMute }}>toque para ouvir</div>
        <PlayBtn size={140} state="idle" />
        <div style={{ fontFamily: T.serif, fontSize: 13, fontStyle: 'italic', color: T.textDim, height: 18, textAlign: 'center' }}>—</div>
      </div>

      {/* color grid · 5 unlocked */}
      <div style={{ paddingBottom: 18 }}>
        <ColorGrid unlocked={5} />
      </div>
    </div>
  );
}

// Variation: post-answer state (correct flash)
function ScrTrainAFeedback() {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <TopBar back="← Sair" title={<>treino <em style={{ color: T.accent }}>·</em> n3</>} meta="15 / 30" />
      <div style={{ padding: '10px 18px' }}><ProgressBar pct={15/30} /></div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, padding: '8px 18px' }}>
        <div style={{ fontFamily: T.mono, fontSize: 9.5, letterSpacing: '0.22em', textTransform: 'uppercase', color: T.green }}>acerto · 870ms</div>
        <PlayBtn size={140} state="idle" />
        <div style={{ fontFamily: T.serif, fontSize: 22, color: T.green, fontStyle: 'italic', textAlign: 'center' }}>
          Vermelho.
          <div style={{ fontFamily: T.mono, fontSize: 10, color: T.textMute, fontStyle: 'normal', marginTop: 6, letterSpacing: '0.16em', textTransform: 'uppercase' }}>Dó Maior · C</div>
        </div>
      </div>

      <div style={{ paddingBottom: 18 }}>
        <ColorGrid unlocked={5} flash="Vermelho" selected="correct" />
      </div>
    </div>
  );
}

// ─── Training · B (radial — single-stage instrument) ───
function ScrTrainB() {
  // Color ring around play button — the icon's identity made into UI
  const R = 105;
  const cx = 180, cy = 180;
  const colors = CHORDS.slice(0, 5); // 5 unlocked
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <TopBar back="← Sair" title={<>treino <em style={{ color: T.accent }}>· radial</em></>} meta="14 / 30" />
      <div style={{ padding: '10px 18px' }}><ProgressBar pct={14/30} /></div>

      <div style={{ flex: 1, position: 'relative' }}>
        <svg viewBox="0 0 360 360" style={{ position: 'absolute', inset: 0, width: '100%', height: 'auto' }}>
          {/* ring guide */}
          <circle cx={cx} cy={cy} r={R} fill="none" stroke={T.line} />
          {/* unlocked color dots */}
          {CHORDS.map((c, i) => {
            const ang = (i / 8) * Math.PI * 2 - Math.PI / 2;
            const x = cx + Math.cos(ang) * R;
            const y = cy + Math.sin(ang) * R;
            const unlocked = i < 5;
            return (
              <g key={c.name} opacity={unlocked ? 1 : 0.13}>
                <circle cx={x} cy={y} r={26} fill={c.hex} stroke={c.hex === '#26201b' ? 'rgba(237,228,208,0.18)' : 'none'} />
                <text x={x} y={y + 5} textAnchor="middle" fill={chordFg(c)} fontFamily={T.serif} fontSize={18}>{c.kanji}</text>
              </g>
            );
          })}
          {/* center play */}
          <circle cx={cx} cy={cy} r={48} fill={T.bg2} />
          <text x={cx} y={cy + 10} textAnchor="middle" fill={T.text} fontSize={28}>▶</text>
        </svg>

        {/* hint */}
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 32, textAlign: 'center' }}>
          <div style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 14, color: T.textDim }}>toque o centro · arraste para a cor</div>
          <div style={{ fontFamily: T.mono, fontSize: 9.5, color: T.textMute, marginTop: 6, letterSpacing: '0.18em', textTransform: 'uppercase' }}>n3 · 5 cores desbloqueadas</div>
        </div>
      </div>
    </div>
  );
}

// Variation: B in active feedback (radial with correct ring)
function ScrTrainBFeedback() {
  const R = 105;
  const cx = 180, cy = 180;
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <TopBar back="← Sair" title={<>treino <em style={{ color: T.accent }}>· radial</em></>} meta="15 / 30" />
      <div style={{ padding: '10px 18px' }}><ProgressBar pct={15/30} /></div>

      <div style={{ flex: 1, position: 'relative' }}>
        <svg viewBox="0 0 360 360" style={{ position: 'absolute', inset: 0, width: '100%', height: 'auto' }}>
          <circle cx={cx} cy={cy} r={R} fill="none" stroke={T.line} />
          {CHORDS.map((c, i) => {
            const ang = (i / 8) * Math.PI * 2 - Math.PI / 2;
            const x = cx + Math.cos(ang) * R;
            const y = cy + Math.sin(ang) * R;
            const unlocked = i < 5;
            const isAnswer = i === 0;
            return (
              <g key={c.name} opacity={unlocked ? 1 : 0.13}>
                {isAnswer && <circle cx={x} cy={y} r={34} fill="none" stroke={T.green} strokeWidth={2} />}
                <circle cx={x} cy={y} r={26} fill={c.hex} stroke={c.hex === '#26201b' ? 'rgba(237,228,208,0.18)' : 'none'} />
                <text x={x} y={y + 5} textAnchor="middle" fill={chordFg(c)} fontFamily={T.serif} fontSize={18}>{c.kanji}</text>
              </g>
            );
          })}
          <circle cx={cx} cy={cy} r={48} fill={T.accent} opacity={0.16} />
          <circle cx={cx} cy={cy} r={36} fill={T.accent} />
          <text x={cx} y={cy + 8} textAnchor="middle" fill={T.bg} fontFamily={T.serif} fontStyle="italic" fontSize={14}>tocando</text>
        </svg>

        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 32, textAlign: 'center' }}>
          <div style={{ fontFamily: T.serif, fontSize: 20, fontStyle: 'italic', color: T.green }}>Vermelho.</div>
          <div style={{ fontFamily: T.mono, fontSize: 9.5, color: T.textMute, marginTop: 6, letterSpacing: '0.18em', textTransform: 'uppercase' }}>acerto · 870ms</div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  ScrMenu, ScrTrainA, ScrTrainAFeedback, ScrTrainB, ScrTrainBFeedback,
});

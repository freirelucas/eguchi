// Eguchi · Design system cards
// Cards for: foundations (palette, type, spacing/radii) and components (buttons,
// panels, play button states, color grid). Rendered in the canvas, NOT inside phones.

// ─── Card chrome ───
function Card({ children, w = 360, h, pad = 24, dark = true, style }) {
  return (
    <div style={{
      width: w, height: h, padding: pad, borderRadius: 12,
      background: dark ? T.bg : '#faf6ee',
      color: dark ? T.text : '#1a1612',
      fontFamily: T.mono, fontSize: 12, lineHeight: 1.5,
      boxShadow: '0 20px 50px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.06)',
      ...style,
    }}>{children}</div>
  );
}

function CardTitle({ kicker, title, sub, dark = true }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{
        fontFamily: T.mono, fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase',
        color: dark ? T.textMute : '#9a8d76', marginBottom: 6,
      }}>{kicker}</div>
      <div style={{
        fontFamily: T.serif, fontSize: 26, letterSpacing: '-0.02em', lineHeight: 1.05,
        color: dark ? T.text : '#1a1612',
      }}>{title}</div>
      {sub && <div style={{
        fontFamily: T.serif, fontStyle: 'italic', fontSize: 14, marginTop: 6,
        color: dark ? T.textDim : '#6e6253',
      }}>{sub}</div>}
    </div>
  );
}

// ─── Palette card ───
function PaletteCard() {
  return (
    <Card w={760} h={520}>
      <CardTitle
        kicker="Tokens · 01"
        title="Paleta Eguchi"
        sub="Oito acordes, oito cores. Refinadas com chroma comparável para harmonia visual mantendo identidade semântica."
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 20 }}>
        {CHORDS.map(c => (
          <div key={c.name}>
            <div style={{
              aspectRatio: '1.4', borderRadius: 8, background: c.hex,
              border: c.hex === '#26201b' ? '1px solid rgba(237,228,208,0.12)' : 'none',
              display: 'flex', alignItems: 'flex-end', padding: 12,
              color: chordFg(c), fontFamily: T.serif,
            }}>
              <div>
                <div style={{ fontSize: 32, lineHeight: 1 }}>{c.kanji}</div>
                <div style={{ fontSize: 11, opacity: 0.7, marginTop: 4, fontFamily: T.mono, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{c.romaji}</div>
              </div>
            </div>
            <div style={{ marginTop: 8, fontFamily: T.serif, fontSize: 15 }}>{c.name}</div>
            <div style={{ fontFamily: T.mono, fontSize: 10, color: T.textDim, marginTop: 2 }}>{c.hex.toUpperCase()}</div>
            <div style={{ fontFamily: T.mono, fontSize: 9.5, color: T.textMute, marginTop: 2 }}>{c.chord} · {c.degree}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ─── Neutrals & functional colors card ───
function NeutralsCard() {
  const rows = [
    ['bg',         T.bg,        'Fundo principal'],
    ['bg-2',       T.bg2,       'Painéis, botões secundários'],
    ['bg-3',       T.bg3,       'Surface elevada'],
    ['text',       T.text,      'Texto principal'],
    ['text-dim',   T.textDim,   'Texto secundário'],
    ['text-mute',  T.textMute,  'Texto terciário, captions'],
    ['line',       T.line,      'Bordas, divisores'],
  ];
  const fn = [
    ['accent',  T.accent,  'Primário · ação, treino'],
    ['warm',    T.warm,    'Tag · probe (generalização)'],
    ['cool',    T.cool,    'Tag · baseline (medição inicial)'],
    ['green',   T.green,   'Sucesso · acerto'],
    ['red',     T.red,     'Erro · destrutivo'],
  ];
  return (
    <Card w={500} h={520}>
      <CardTitle kicker="Tokens · 02" title="Neutros & Funcionais" sub="Quentes, dessaturados — a base que segura as oito cores sem competir." />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {rows.map(([n, v, d]) => (
          <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 38, height: 38, borderRadius: 6, background: v, border: '1px solid rgba(237,228,208,0.1)' }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: T.mono, fontSize: 11.5 }}>--{n}</div>
              <div style={{ fontFamily: T.mono, fontSize: 9.5, color: T.textMute, marginTop: 2 }}>{d}</div>
            </div>
            <div style={{ fontFamily: T.mono, fontSize: 10, color: T.textDim }}>{v.length > 12 ? v.slice(0, 18) + '…' : v.toUpperCase()}</div>
          </div>
        ))}
        <div style={{ height: 1, background: T.line, margin: '8px 0' }} />
        {fn.map(([n, v, d]) => (
          <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 38, height: 38, borderRadius: 6, background: v }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: T.mono, fontSize: 11.5 }}>--{n}</div>
              <div style={{ fontFamily: T.mono, fontSize: 9.5, color: T.textMute, marginTop: 2 }}>{d}</div>
            </div>
            <div style={{ fontFamily: T.mono, fontSize: 10, color: T.textDim }}>{v.toUpperCase()}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ─── Type card ───
function TypeCard() {
  return (
    <Card w={560} h={520}>
      <CardTitle kicker="Tokens · 03" title="Tipografia" sub="Fraunces (serif editorial) para expressão · JetBrains Mono para precisão técnica." />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
        <div>
          <div style={{ fontFamily: T.mono, fontSize: 9.5, color: T.textMute, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Fraunces · Display · 58 / -0.04em</div>
          <div style={{ fontFamily: T.serif, fontWeight: 400, fontSize: 58, letterSpacing: '-0.04em', lineHeight: 0.95, marginTop: 4 }}>eguchi<em style={{ color: T.accent, fontStyle: 'italic' }}>lab.</em></div>
        </div>
        <div>
          <div style={{ fontFamily: T.mono, fontSize: 9.5, color: T.textMute, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Fraunces · Title · 30</div>
          <div style={{ fontFamily: T.serif, fontWeight: 400, fontSize: 30, marginTop: 4 }}>Acertou. <em style={{ color: T.green, fontStyle: 'italic' }}>Vermelho.</em></div>
        </div>
        <div>
          <div style={{ fontFamily: T.mono, fontSize: 9.5, color: T.textMute, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Fraunces Italic · Subtítulo · 18</div>
          <div style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 18, fontWeight: 500, color: T.accent, marginTop: 4 }}>medir antes de treinar</div>
        </div>
        <div>
          <div style={{ fontFamily: T.mono, fontSize: 9.5, color: T.textMute, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Fraunces · Corpo · 14.5 / 1.6</div>
          <div style={{ fontFamily: T.serif, fontSize: 14.5, lineHeight: 1.6, marginTop: 4, maxWidth: 460 }}>A premissa é simples: cada acorde tem uma cor. Você toca, sua mão escolhe.</div>
        </div>
        <div>
          <div style={{ fontFamily: T.mono, fontSize: 9.5, color: T.textMute, letterSpacing: '0.2em', textTransform: 'uppercase' }}>JetBrains Mono · UI · 11.5 / 0.14em</div>
          <div style={{ fontFamily: T.mono, fontSize: 11.5, letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: 4 }}>Treinar sessão</div>
        </div>
        <div>
          <div style={{ fontFamily: T.mono, fontSize: 9.5, color: T.textMute, letterSpacing: '0.2em', textTransform: 'uppercase' }}>JetBrains Mono · Label · 10 / 0.22em</div>
          <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: T.textMute, marginTop: 4 }}>Acurácia geral</div>
        </div>
      </div>
    </Card>
  );
}

// ─── Spacing & radii card ───
function SpacingCard() {
  const radii = [['r1', 4], ['r2', 7], ['r3', 10], ['r4', 16], ['r5', 24], ['full', 999]];
  const space = [4, 8, 12, 16, 20, 24, 32, 40, 56];
  return (
    <Card w={400} h={520}>
      <CardTitle kicker="Tokens · 04" title="Raios & Espaços" sub="Escala discreta. Compacta no mobile, generosa nos momentos editoriais." />
      <div style={{ marginBottom: 22 }}>
        <Label style={{ display: 'block', marginBottom: 10 }}>Radii</Label>
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end' }}>
          {radii.map(([n, v]) => (
            <div key={n} style={{ textAlign: 'center' }}>
              <div style={{ width: 44, height: 44, background: T.bg2, borderRadius: v, border: `1px solid ${T.line}` }} />
              <div style={{ fontFamily: T.mono, fontSize: 9.5, color: T.textDim, marginTop: 6 }}>{n}</div>
              <div style={{ fontFamily: T.mono, fontSize: 9, color: T.textMute }}>{v === 999 ? '∞' : v}</div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Label style={{ display: 'block', marginBottom: 10 }}>Spacing</Label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {space.map(s => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontFamily: T.mono, fontSize: 10, color: T.textDim, width: 26 }}>{s}</span>
              <div style={{ height: 4, width: s * 4, background: T.accent, opacity: 0.7, borderRadius: 1 }} />
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

// ─── Component card · buttons ───
function ButtonsCard() {
  return (
    <Card w={400} h={520}>
      <CardTitle kicker="Componentes · 01" title="Botões" sub="Hierarquia: primary (ação principal da tela), default, ghost, danger." />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div>
          <Label style={{ display: 'block', marginBottom: 6 }}>Primary</Label>
          <Btn variant="primary" block>Treinar sessão</Btn>
        </div>
        <div>
          <Label style={{ display: 'block', marginBottom: 6 }}>Default · with sub</Label>
          <Btn sub="medir partida" block>Baseline</Btn>
        </div>
        <div>
          <Label style={{ display: 'block', marginBottom: 6 }}>Ghost</Label>
          <Btn variant="ghost" block>Importar JSON</Btn>
        </div>
        <div>
          <Label style={{ display: 'block', marginBottom: 6 }}>Danger</Label>
          <Btn variant="danger" small>Resetar progresso</Btn>
        </div>
        <div>
          <Label style={{ display: 'block', marginBottom: 6 }}>Segmented</Label>
          <Seg options={['piano', 'cordas', 'órgão', 'sine']} active="piano" />
        </div>
        <div>
          <Label style={{ display: 'block', marginBottom: 6 }}>Pills</Label>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <Pill>treino</Pill>
            <Pill tone="baseline">baseline</Pill>
            <Pill tone="probe">probe</Pill>
            <Pill tone="good">+7 dias</Pill>
            <Pill tone="accent">N1 desbloqueado</Pill>
          </div>
        </div>
      </div>
    </Card>
  );
}

// ─── Play button states card ───
function PlayBtnCard() {
  return (
    <Card w={500} h={520}>
      <CardTitle kicker="Componentes · 02" title="Play · estados" sub="O centro do app. Toque, espera, ouvir, responder. Toda transição tem rítmica." />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 12 }}>
        <div style={{ textAlign: 'center' }}>
          <PlayBtn state="idle" />
          <div style={{ fontFamily: T.mono, fontSize: 10, color: T.textDim, marginTop: 12, letterSpacing: '0.12em', textTransform: 'uppercase' }}>idle</div>
          <div style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 12, color: T.textMute, marginTop: 4 }}>aguardando toque</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <PlayBtn state="playing" />
          <div style={{ fontFamily: T.mono, fontSize: 10, color: T.textDim, marginTop: 12, letterSpacing: '0.12em', textTransform: 'uppercase' }}>playing</div>
          <div style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 12, color: T.textMute, marginTop: 4 }}>halos pulsam 1.2s</div>
        </div>
      </div>
      <div style={{ marginTop: 24, padding: 16, background: T.bg2, borderRadius: 8, fontFamily: T.serif, fontSize: 13, lineHeight: 1.55, color: T.textDim }}>
        <span style={{ color: T.accent, fontStyle: 'italic' }}>Microcoreografia. </span>
        Idle → tap escala 0.95 (100ms) → som dispara → playing state com glow expandindo 0→40px ao longo de 1.2s ease-out → halo desvanece → retorna a idle. RT é cronometrado a partir do fim do som.
      </div>
    </Card>
  );
}

// ─── Color grid component card ───
function ColorGridCard() {
  return (
    <Card w={400} h={520}>
      <CardTitle kicker="Componentes · 03" title="Color grid" sub="A grade de resposta. 4×2 mobile. Estados: idle, disabled (não desbloqueado), flash acerto, flash erro." />
      <div style={{ marginBottom: 16 }}>
        <Label style={{ display: 'block', marginBottom: 8 }}>Nível 1 (2 cores)</Label>
        <ColorGrid unlocked={2} padding="0" />
      </div>
      <div style={{ marginBottom: 16 }}>
        <Label style={{ display: 'block', marginBottom: 8 }}>Nível 4 (5 cores)</Label>
        <ColorGrid unlocked={5} padding="0" />
      </div>
      <div>
        <Label style={{ display: 'block', marginBottom: 8 }}>Completo + flash</Label>
        <ColorGrid unlocked={8} padding="0" flash="Vermelho" selected="correct" />
      </div>
    </Card>
  );
}

// ─── Panels card ───
function PanelsCard() {
  return (
    <Card w={400} h={520}>
      <CardTitle kicker="Componentes · 04" title="Painéis & linhas" sub="Surfaces transparentes com bordas finas. Linhas dashed entre rows." />
      <Panel style={{ marginBottom: 14 }}>
        <PanelRow label="Nível atual" value="3 / 8" />
        <PanelRow label="Sessões" value="42" divider />
        <PanelRow label="Acurácia geral" value="78%" valueColor={T.green} divider />
        <PanelRow label="Baseline" value="feito · 27%" valueColor={T.cool} divider />
      </Panel>
      <div style={{ marginTop: 18 }}>
        <Label style={{ display: 'block', marginBottom: 8 }}>Métrica destacada (variante)</Label>
        <div style={{
          padding: 18, borderRadius: 10, background: T.bg2, border: `1px solid ${T.line}`,
          display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ fontFamily: T.serif, fontSize: 42, lineHeight: 1, color: T.text }}>78<span style={{ fontSize: 22, color: T.textDim }}>%</span></div>
            <Label style={{ marginTop: 6, display: 'block' }}>acurácia · 7d</Label>
          </div>
          <div style={{ fontFamily: T.serif, fontSize: 17, fontStyle: 'italic', color: T.green }}>+12pp</div>
        </div>
      </div>
    </Card>
  );
}

Object.assign(window, {
  Card, CardTitle,
  PaletteCard, NeutralsCard, TypeCard, SpacingCard,
  ButtonsCard, PlayBtnCard, ColorGridCard, PanelsCard,
});

// Eguchi · Interaction & motion specs (for handoff to Claude Code)

// Generic spec card
function SpecCard({ kicker, title, sub, w = 480, h, children }) {
  return (
    <Card w={w} h={h}>
      <CardTitle kicker={kicker} title={title} sub={sub} />
      {children}
    </Card>
  );
}

// Timeline visualizer
function TimelineRow({ label, ms, total = 2000, color = '#d4654a', bar = true }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontFamily: T.mono, fontSize: 11, color: T.text }}>{label}</span>
        <span style={{ fontFamily: T.mono, fontSize: 10, color: T.textDim }}>{ms}ms</span>
      </div>
      <div style={{ height: 6, background: T.bg2, borderRadius: 3, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${(ms / total) * 100}%`, background: color, opacity: bar ? 1 : 0 }} />
      </div>
    </div>
  );
}

// ─── Spec · Training trial choreography ───
function SpecTrialChoreo() {
  return (
    <SpecCard
      kicker="Specs · 01"
      title="Coreografia de um trial"
      sub="Timing canônico entre tap na cor e início do próximo. RT é medido do fim do áudio à confirmação da resposta."
      w={520} h={520}
    >
      <TimelineRow label="play btn idle → tap" ms={0} />
      <TimelineRow label="tap scale(0.95) → 1.0" ms={100} />
      <TimelineRow label="audio ramps up (5ms)" ms={5} color={T.cool} />
      <TimelineRow label="chord sustains" ms={1400} color={T.cool} />
      <TimelineRow label="audio decays (500ms)" ms={500} color={T.cool} />
      <TimelineRow label="RT clock starts" ms={50} color={T.warm} />
      <TimelineRow label="USER taps color · variable" ms={800} color={T.warm} />
      <TimelineRow label="flash ring (green/red)" ms={500} color={T.green} />
      <TimelineRow label="feedback text fade-in" ms={200} />
      <TimelineRow label="dwell on result" ms={1100} color={T.textDim} />
      <TimelineRow label="reset → next trial" ms={250} />
      <div style={{ marginTop: 16, padding: 12, background: T.bg2, borderRadius: 6, fontFamily: T.serif, fontStyle: 'italic', fontSize: 12, color: T.textDim, lineHeight: 1.5 }}>
        Total dwell pós-resposta: ~1.6s. Suficiente para registrar o acerto sem virar uma pausa.
      </div>
    </SpecCard>
  );
}

// ─── Spec · Easings + motion tokens ───
function SpecMotion() {
  const easings = [
    ['ease-out-expressive', 'cubic-bezier(0.2, 0.7, 0.3, 1)', 'Tap, hover, scale snaps. Default.'],
    ['ease-in-out-smooth',  'cubic-bezier(0.4, 0.0, 0.2, 1)', 'Screen transitions.'],
    ['ease-out-soft',       'cubic-bezier(0.0, 0.0, 0.2, 1)', 'Halo pulses, opacity reveals.'],
  ];
  const durations = [
    ['xs · 100ms', 'tap acknowledgment'],
    ['sm · 200ms', 'flash on grid'],
    ['md · 400ms', 'progress bar fill'],
    ['lg · 1200ms', 'play halo pulse'],
    ['xl · 2400ms', 'chord sustain'],
  ];
  return (
    <SpecCard
      kicker="Specs · 02"
      title="Motion · easings & durations"
      sub="Conservador. Nenhuma transição passa de 400ms exceto pulsos do play."
      w={440} h={520}
    >
      <Label style={{ display: 'block', marginBottom: 10 }}>easings</Label>
      {easings.map(([n, v, u]) => (
        <div key={n} style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontFamily: T.mono, fontSize: 11, color: T.text, width: 140 }}>{n}</span>
            <div style={{ flex: 1, height: 20, position: 'relative' }}>
              <svg width="100%" height="20" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d={`M0 20 C${n.includes('expressive') ? '20 6, 30 0' : n.includes('smooth') ? '40 18, 60 2' : '0 18, 20 4'}, 100 0`} stroke={T.accent} fill="none" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
          <div style={{ fontFamily: T.mono, fontSize: 9.5, color: T.textMute, marginTop: 4, marginLeft: 0 }}>{v}</div>
          <div style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 12, color: T.textDim, marginTop: 2 }}>{u}</div>
        </div>
      ))}

      <Label style={{ display: 'block', marginBottom: 8, marginTop: 18 }}>durations</Label>
      {durations.map(([n, u]) => (
        <div key={n} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: `1px solid ${T.line}`, fontSize: 12 }}>
          <span style={{ fontFamily: T.mono, color: T.text }}>{n}</span>
          <span style={{ fontFamily: T.serif, fontStyle: 'italic', color: T.textDim }}>{u}</span>
        </div>
      ))}
    </SpecCard>
  );
}

// ─── Spec · Navigation / transitions ───
function SpecNav() {
  return (
    <SpecCard
      kicker="Specs · 03"
      title="Navegação · transições entre telas"
      sub="Mobile fluido. Push horizontal padrão; modal slide-up para baseline/probe (separação simbólica)."
      w={480} h={520}
    >
      <Label style={{ display: 'block', marginBottom: 12 }}>tipos</Label>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <NavSpec
          name="push horizontal"
          desc="Menu → Treino, Menu → Stats, etc."
          timing="320ms · ease-in-out-smooth"
          arrow="→"
        />
        <NavSpec
          name="modal slide-up"
          desc="Início de baseline · início de probe. Sinaliza 'modo medição'."
          timing="380ms · ease-out-expressive"
          arrow="↑"
        />
        <NavSpec
          name="fade cross"
          desc="Fim de sessão → menu. Apenas opacidade, 250ms."
          timing="250ms · ease-out-soft"
          arrow="✕"
        />
        <NavSpec
          name="hero scale"
          desc="Tap em cor desbloqueada → tela de unlock. A cor escala de tile (28px) a círculo grande (160px)."
          timing="600ms · ease-out-expressive"
          arrow="◯"
        />
      </div>

      <div style={{ marginTop: 18, padding: 12, background: T.bg2, borderRadius: 6, fontFamily: T.serif, fontStyle: 'italic', fontSize: 12, color: T.textDim, lineHeight: 1.5 }}>
        Botão back nunca tem ícone — só o texto "← Menu" / "← Sair". Reforça que isto não é um sistema operacional, é um instrumento.
      </div>
    </SpecCard>
  );
}

function NavSpec({ name, desc, timing, arrow }) {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
      <div style={{
        width: 36, height: 36, borderRadius: 6, background: T.bg2, border: `1px solid ${T.line}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: T.serif, fontSize: 18, color: T.accent,
      }}>{arrow}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: T.mono, fontSize: 11, color: T.text }}>{name}</div>
        <div style={{ fontFamily: T.serif, fontSize: 13, color: T.textDim, marginTop: 3, lineHeight: 1.4 }}>{desc}</div>
        <div style={{ fontFamily: T.mono, fontSize: 9.5, color: T.textMute, marginTop: 4 }}>{timing}</div>
      </div>
    </div>
  );
}

// ─── Spec · Microinteraction details ───
function SpecMicro() {
  return (
    <SpecCard
      kicker="Specs · 04"
      title="Microinterações"
      sub="Cada interação tem uma resposta tátil — visual, audível, ou ambas. Sem hover (mobile)."
      w={480} h={520}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {[
          ['tap em cor (acerto)', 'flash verde 500ms → texto entra · haptic light', T.green],
          ['tap em cor (erro)', 'flash vermelho 500ms → mostra correta com halo + cor errada pisca · haptic medium', T.red],
          ['tap no play btn', 'scale(0.95) → som dispara → halo pulse 1.2s ease-out → escala volta', T.accent],
          ['drag em slider (volume)', 'scrub realtime no áudio · haptic tick a cada 10%', T.warm],
          ['scroll em stats', 'momentum nativo iOS · paralaxe sutil no header (-20%)', T.cool],
          ['long-press em cor (explore)', '350ms → mostra preview do nome + acorde como tooltip', T.textDim],
          ['unlock event', 'haptic success (notification) → tela hero animada → confetti sutil OFF · over the top neste contexto', T.green],
        ].map(([k, v, c], i) => (
          <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', paddingBottom: 12, borderBottom: i < 6 ? `1px solid ${T.line}` : 'none' }}>
            <div style={{ width: 4, height: 30, background: c, borderRadius: 1, marginTop: 3 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: T.mono, fontSize: 11, color: T.text }}>{k}</div>
              <div style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 12.5, color: T.textDim, marginTop: 3, lineHeight: 1.45 }}>{v}</div>
            </div>
          </div>
        ))}
      </div>
    </SpecCard>
  );
}

// ─── Spec · Accessibility ───
function SpecA11y() {
  return (
    <SpecCard
      kicker="Specs · 05"
      title="Acessibilidade"
      sub="O método depende de áudio. Cores são identificáveis também pelo kanji e o nome."
      w={440} h={460}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {[
          ['hit targets', '≥44pt em todos os controles. Color tiles 76pt na grade 4×2.'],
          ['contraste', 'Texto base 13.5:1 · text-dim 6.3:1 · text-mute 3.8:1 (apenas labels small)'],
          ['cor + texto', 'Cada cor sempre acompanha kanji + nome em PT. Daltonismo: kanji é o ancorador semântico.'],
          ['daltonismo', 'Pares confundíveis (Vermelho/Verde, Verde/Marrom) têm diferença forte de luminosidade.'],
          ['screen reader', 'play btn aria "tocar acorde"; color btn aria "{nome}, {acorde}". Feedback usa aria-live polite.'],
          ['reduced motion', 'Halo pulse desliga · flash vira fade · transições push 100ms.'],
          ['idioma', 'PT-BR primário. Kanji é decorativo + mnemônico (lang="ja"). Romaji nos detalhes.'],
        ].map(([k, v]) => (
          <div key={k}>
            <div style={{ fontFamily: T.mono, fontSize: 11, color: T.accent, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{k}</div>
            <div style={{ fontFamily: T.serif, fontSize: 13, color: T.textDim, marginTop: 4, lineHeight: 1.5 }}>{v}</div>
          </div>
        ))}
      </div>
    </SpecCard>
  );
}

// ─── Spec · Information architecture ───
function SpecIA() {
  const nodes = [
    { id: 'home', label: 'Menu', x: 220, y: 30, primary: true },
    { id: 'onb', label: 'Onboarding', x: 60, y: 30, dim: true },
    { id: 'train', label: 'Treino', x: 140, y: 130, primary: true },
    { id: 'drill', label: 'Drill', x: 220, y: 130 },
    { id: 'baseline', label: 'Baseline', x: 300, y: 130, tone: 'cool' },
    { id: 'probe', label: 'Probe', x: 380, y: 130, tone: 'warm' },
    { id: 'session', label: 'Fim sessão', x: 100, y: 220 },
    { id: 'unlock', label: 'Unlock', x: 180, y: 220 },
    { id: 'stats', label: 'Stats', x: 100, y: 310 },
    { id: 'insights', label: 'Insights', x: 200, y: 310 },
    { id: 'probes', label: 'Probes', x: 300, y: 310, tone: 'warm' },
    { id: 'bvn', label: 'B vs Now', x: 400, y: 310, tone: 'cool' },
    { id: 'streak', label: 'Streak', x: 180, y: 400 },
    { id: 'diary', label: 'Diário', x: 280, y: 400 },
    { id: 'explore', label: 'Explorar', x: 60, y: 220 },
    { id: 'settings', label: 'Ajustes', x: 380, y: 30 },
    { id: 'method', label: 'Método', x: 380, y: 400 },
  ];
  const edges = [
    ['onb','home'], ['home','train'], ['home','drill'],
    ['home','baseline'], ['home','probe'], ['home','explore'],
    ['home','stats'], ['home','settings'], ['home','method'],
    ['train','session'], ['session','unlock'], ['session','home'],
    ['stats','insights'], ['stats','probes'], ['stats','bvn'],
    ['home','streak'], ['home','diary'],
  ];
  const byId = Object.fromEntries(nodes.map(n => [n.id, n]));

  const tone = (n) => n.tone === 'cool' ? T.cool : n.tone === 'warm' ? T.warm : n.primary ? T.accent : T.text;

  return (
    <SpecCard
      kicker="Specs · 06"
      title="Arquitetura de informação"
      sub="Hub-and-spoke. Menu é o centro; todas as ações principais ficam a um tap."
      w={500} h={520}
    >
      <svg viewBox="0 0 460 440" style={{ width: '100%', height: 380 }}>
        {edges.map(([a, b], i) => {
          const na = byId[a], nb = byId[b];
          return <line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} stroke={T.line} />;
        })}
        {nodes.map(n => (
          <g key={n.id}>
            <rect x={n.x - 38} y={n.y - 12} width={76} height={24} rx={4}
              fill={n.primary ? 'rgba(212,101,74,0.16)' : T.bg2}
              stroke={tone(n)} strokeWidth={n.primary ? 1.5 : 1}
              opacity={n.dim ? 0.5 : 1} />
            <text x={n.x} y={n.y + 4} textAnchor="middle" fontSize="10"
              fontFamily={T.mono} fill={tone(n)} opacity={n.dim ? 0.7 : 1}
              style={{ letterSpacing: '0.05em' }}>{n.label}</text>
          </g>
        ))}
      </svg>
    </SpecCard>
  );
}

// ─── Spec · Cross-platform (iOS + Android) ───
function SpecPlatform() {
  return (
    <SpecCard
      kicker="Specs · 07"
      title="Plataforma · iOS + Android"
      sub="Mockups estão em frame iPhone só por convenção. O PWA roda igual em ambos — mas há 4 pontos de cuidado no Android."
      w={520} h={560}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* hardware back */}
        <div style={{ padding: 14, borderRadius: 8, background: T.bg2, border: `1px solid ${T.line}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <span style={{
              fontFamily: T.mono, fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase',
              padding: '2px 6px', borderRadius: 3, background: 'rgba(212,101,74,0.18)', color: T.accent,
            }}>crítico</span>
            <span style={{ fontFamily: T.mono, fontSize: 11, color: T.text }}>back button hardware</span>
          </div>
          <p style={{ fontFamily: T.serif, fontSize: 12.5, color: T.textDim, lineHeight: 1.5, margin: 0 }}>
            Android tem botão back físico/gesture. Sem interceptar, o usuário sai do PWA quando queria voltar pro menu.
          </p>
          <pre style={{
            fontFamily: T.mono, fontSize: 10, color: T.warm, background: T.bg, padding: '10px 12px',
            borderRadius: 4, marginTop: 8, overflow: 'auto', lineHeight: 1.5,
          }}>{`// push estado a cada goTo()
function goTo(screen) {
  history.pushState({screen}, '', '#' + screen);
  showScreen(screen);
}
window.addEventListener('popstate', (e) => {
  showScreen(e.state?.screen || 'menu');
});`}</pre>
        </div>

        {/* haptics */}
        <div style={{ padding: 14, borderRadius: 8, background: T.bg2, border: `1px solid ${T.line}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <span style={{
              fontFamily: T.mono, fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase',
              padding: '2px 6px', borderRadius: 3, background: 'rgba(225,173,62,0.18)', color: T.warm,
            }}>API</span>
            <span style={{ fontFamily: T.mono, fontSize: 11, color: T.text }}>haptics</span>
          </div>
          <p style={{ fontFamily: T.serif, fontSize: 12.5, color: T.textDim, lineHeight: 1.5, margin: 0 }}>
            <code style={{ fontFamily: T.mono, fontSize: 10.5, color: T.warm }}>navigator.vibrate(ms)</code> funciona no Android Chrome.
            iOS Safari ignora a API mas suporta haptics via <code style={{ fontFamily: T.mono, fontSize: 10.5, color: T.warm }}>{`<input type="button">`}</code> tap. Compatibilidade: chame <code style={{ fontFamily: T.mono, fontSize: 10.5, color: T.warm }}>navigator.vibrate?.(10)</code> sem assumir efeito.
          </p>
        </div>

        {/* status bar / theme color */}
        <div style={{ padding: 14, borderRadius: 8, background: T.bg2, border: `1px solid ${T.line}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <span style={{
              fontFamily: T.mono, fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase',
              padding: '2px 6px', borderRadius: 3, background: 'rgba(143,184,116,0.18)', color: T.green,
            }}>ok</span>
            <span style={{ fontFamily: T.mono, fontSize: 11, color: T.text }}>status bar · already covered</span>
          </div>
          <p style={{ fontFamily: T.serif, fontSize: 12.5, color: T.textDim, lineHeight: 1.5, margin: 0 }}>
            <code style={{ fontFamily: T.mono, fontSize: 10.5, color: T.warm }}>theme-color #14100c</code> tinge a barra de status no Chrome Android.
            iOS usa <code style={{ fontFamily: T.mono, fontSize: 10.5, color: T.warm }}>apple-mobile-web-app-status-bar-style</code>. Ambos já no head.
          </p>
        </div>

        {/* install prompts */}
        <div style={{ padding: 14, borderRadius: 8, background: T.bg2, border: `1px solid ${T.line}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <span style={{
              fontFamily: T.mono, fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase',
              padding: '2px 6px', borderRadius: 3, background: 'rgba(112,144,176,0.18)', color: T.cool,
            }}>ux</span>
            <span style={{ fontFamily: T.mono, fontSize: 11, color: T.text }}>install prompt</span>
          </div>
          <p style={{ fontFamily: T.serif, fontSize: 12.5, color: T.textDim, lineHeight: 1.5, margin: 0 }}>
            Android dispara <code style={{ fontFamily: T.mono, fontSize: 10.5, color: T.warm }}>beforeinstallprompt</code>. Capturar e oferecer "Instalar app" no menu após 3 sessões — não logo no primeiro acesso (intrusivo).
            iOS exige passo manual ("Adicionar à tela inicial") — mostrar dica visual após sessão #3 se rodando no Safari.
          </p>
        </div>

      </div>
    </SpecCard>
  );
}

Object.assign(window, {
  SpecCard, SpecTrialChoreo, SpecMotion, SpecNav, SpecMicro, SpecA11y, SpecIA, SpecPlatform,
});

// Eguchi · UI Kit
// Reusable presentational components. Read CHORDS + T from tokens.jsx.

// ─── Phone frame ───
// Compact dark phone with status bar + home indicator. Sized for the canvas.
function Phone({ children, width = 360, height = 760, label }) {
  return (
    <div style={{
      width, height, borderRadius: 38, overflow: 'hidden', position: 'relative',
      background: T.bg, color: T.text, fontFamily: T.mono, fontSize: 13.5,
      boxShadow: '0 30px 70px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.05) inset, 0 0 0 1px rgba(0,0,0,0.5)',
      WebkitFontSmoothing: 'antialiased',
    }}>
      {/* status bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 30,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '14px 22px 8px', fontFamily: T.sans, fontWeight: 600, fontSize: 13.5,
        color: T.text,
      }}>
        <span>9:41</span>
        {/* dynamic island */}
        <div style={{ width: 96, height: 26, borderRadius: 14, background: '#000',
          position: 'absolute', left: '50%', top: 9, transform: 'translateX(-50%)' }} />
        <span style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
          <svg width="15" height="10" viewBox="0 0 19 12"><rect x="0" y="7.5" width="3.2" height="4.5" rx="0.7" fill={T.text}/><rect x="4.8" y="5" width="3.2" height="7" rx="0.7" fill={T.text}/><rect x="9.6" y="2.5" width="3.2" height="9.5" rx="0.7" fill={T.text}/><rect x="14.4" y="0" width="3.2" height="12" rx="0.7" fill={T.text}/></svg>
          <svg width="22" height="10" viewBox="0 0 27 13"><rect x="0.5" y="0.5" width="23" height="12" rx="3.5" stroke={T.text} strokeOpacity="0.5" fill="none"/><rect x="2" y="2" width="17" height="9" rx="2" fill={T.text}/></svg>
        </span>
      </div>
      {/* content area */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, paddingTop: 38, paddingBottom: 14, display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
      {/* home indicator */}
      <div style={{ position: 'absolute', bottom: 8, left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 40 }}>
        <div style={{ width: 110, height: 4, borderRadius: 100, background: 'rgba(237,228,208,0.45)' }} />
      </div>
    </div>
  );
}

// ─── Top bar ───
function TopBar({ back = '← Menu', title, meta, italic = false }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '10px 18px 8px', borderBottom: `1px solid ${T.line}`,
    }}>
      <span style={{ color: T.textDim, fontFamily: T.mono, fontSize: 11.5 }}>{back}</span>
      <span style={{ fontFamily: T.serif, fontSize: 15.5, fontStyle: italic ? 'italic' : 'normal' }}>
        {title}
      </span>
      <span style={{ color: T.textMute, fontFamily: T.mono, fontSize: 10, letterSpacing: '0.1em' }}>{meta}</span>
    </div>
  );
}

// ─── Label (small caps) ───
function Label({ children, color, style }) {
  return (
    <span style={{
      fontFamily: T.mono, fontSize: 9.5, letterSpacing: '0.22em',
      textTransform: 'uppercase', color: color || T.textMute, ...style,
    }}>{children}</span>
  );
}

// ─── Panel (bordered surface row container) ───
function Panel({ children, style }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.018)', border: `1px solid ${T.line}`,
      borderRadius: T.r2, padding: '12px 14px', ...style,
    }}>{children}</div>
  );
}

function PanelRow({ label, value, valueColor, divider }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
      padding: '7px 0', borderTop: divider ? `1px dashed ${T.lineDashed}` : 'none',
      marginTop: divider ? 4 : 0,
    }}>
      <Label>{label}</Label>
      <span style={{ fontFamily: T.serif, fontSize: 17, color: valueColor || T.text }}>{value}</span>
    </div>
  );
}

// ─── Buttons ───
function Btn({ children, variant = 'default', small, style, sub, block, onClick }) {
  const base = {
    fontFamily: T.mono, fontSize: 11.5, letterSpacing: '0.14em',
    textTransform: 'uppercase', padding: small ? '10px 14px' : '14px 16px',
    borderRadius: T.r1, border: '1px solid transparent', cursor: 'pointer',
    textAlign: sub ? 'left' : 'center', display: 'block',
    width: block ? '100%' : 'auto', lineHeight: 1.2,
  };
  const variants = {
    default: { background: T.bg2, color: T.text },
    primary: { background: T.accent, color: T.bg, fontWeight: 700 },
    ghost:   { background: 'transparent', color: T.textDim, border: `1px solid ${T.line}` },
    danger:  { background: 'transparent', color: T.red, border: `1px solid rgba(197,82,58,0.4)` },
  };
  return (
    <div style={{ ...base, ...variants[variant], ...style }}>
      <div>{children}</div>
      {sub && <div style={{
        fontSize: 9, letterSpacing: '0.1em', textTransform: 'none', fontWeight: 400,
        color: variant === 'primary' ? 'rgba(20,16,12,0.65)' : T.textMute, marginTop: 4,
      }}>{sub}</div>}
    </div>
  );
}

// ─── Play button (center stage) ───
function PlayBtn({ size = 130, state = 'idle', label }) {
  // state: idle | playing | replay
  const playing = state === 'playing';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <div style={{
        width: size, height: size, borderRadius: '50%',
        background: playing ? T.accent : T.bg2,
        color: playing ? T.bg : T.text,
        fontFamily: T.serif, fontStyle: 'italic', fontSize: size > 80 ? 17 : 14,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: playing
          ? `0 0 0 16px rgba(212,101,74,0.12), 0 0 0 32px rgba(212,101,74,0.05), 0 8px 24px rgba(0,0,0,0.4)`
          : `0 8px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)`,
        position: 'relative',
      }}>
        {playing
          ? <span style={{ fontStyle: 'italic' }}>tocando…</span>
          : <span style={{ fontSize: size > 80 ? 38 : 24 }}>▶</span>}
      </div>
      {label && <span style={{ color: T.textMute, fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase' }}>{label}</span>}
    </div>
  );
}

// ─── Color chip (square) ───
function ColorChip({ chord, size = 64, disabled, flash, showName = true, showKanji = true, onlyKanji = false }) {
  const fg = chordFg(chord);
  return (
    <div style={{
      aspectRatio: '1', width: size, borderRadius: T.r2,
      background: chord.hex,
      border: chord.hex === '#26201b' ? '1px solid rgba(237,228,208,0.12)' : '1px solid transparent',
      opacity: disabled ? 0.13 : 1,
      boxShadow:
        flash === 'correct' ? `0 0 0 4px ${T.green}` :
        flash === 'wrong'   ? `0 0 0 4px ${T.red}` : 'none',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      color: fg, fontFamily: T.serif, gap: 2,
      position: 'relative',
    }}>
      {onlyKanji
        ? <span style={{ fontSize: size * 0.55, lineHeight: 1 }}>{chord.kanji}</span>
        : <>
            {showKanji && <span style={{ fontSize: Math.max(13, size * 0.26), lineHeight: 1 }}>{chord.kanji}</span>}
            {showName && <span style={{ fontSize: Math.max(9, size * 0.13), fontWeight: 500, letterSpacing: '0.02em' }}>{chord.name}</span>}
          </>}
    </div>
  );
}

// ─── Color grid 4×2 ───
function ColorGrid({ unlocked = 8, gap = 7, padding = '0 18px', sizeHint, flash, selected }) {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap, padding,
    }}>
      {CHORDS.map((c, i) => {
        const dis = i >= unlocked;
        return (
          <div key={c.name} style={{
            aspectRatio: '1', borderRadius: T.r2, background: c.hex,
            opacity: dis ? 0.13 : 1, position: 'relative',
            border: c.hex === '#26201b' ? '1px solid rgba(237,228,208,0.12)' : '1px solid transparent',
            boxShadow:
              flash === c.name && selected === 'correct' ? `0 0 0 3px ${T.green}` :
              flash === c.name && selected === 'wrong'   ? `0 0 0 3px ${T.red}` : 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column', color: chordFg(c), gap: 1,
          }}>
            <span style={{ fontFamily: T.serif, fontSize: 17, lineHeight: 1 }}>{c.kanji}</span>
            <span style={{ fontFamily: T.serif, fontSize: 9.5, fontWeight: 500 }}>{c.name}</span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Progress thin bar ───
function ProgressBar({ pct, color, height = 2 }) {
  return (
    <div style={{ height, background: T.bg2, borderRadius: 1, overflow: 'hidden' }}>
      <div style={{ height: '100%', width: `${pct * 100}%`, background: color || T.accent }} />
    </div>
  );
}

// ─── Pill badge ───
function Pill({ children, tone = 'default' }) {
  const tones = {
    default:  { bg: T.bg3, color: T.textDim },
    baseline: { bg: 'rgba(112,144,176,0.18)', color: T.cool },
    probe:    { bg: 'rgba(225,173,62,0.16)',  color: T.warm },
    good:     { bg: 'rgba(143,184,116,0.16)', color: T.green },
    accent:   { bg: 'rgba(212,101,74,0.16)',  color: T.accent },
  }[tone];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      fontFamily: T.mono, fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase',
      padding: '3px 7px', borderRadius: 3, background: tones.bg, color: tones.color,
    }}>{children}</span>
  );
}

// ─── Segmented control (static) ───
function Seg({ options, active }) {
  return (
    <div style={{
      display: 'flex', background: T.bg2, borderRadius: T.r2, padding: 3, gap: 2,
    }}>
      {options.map(o => (
        <span key={o} style={{
          flex: 1, textAlign: 'center', padding: '8px 4px', borderRadius: 4,
          fontFamily: T.mono, fontSize: 10.5, letterSpacing: '0.08em', textTransform: 'uppercase',
          background: o === active ? T.accent : 'transparent',
          color: o === active ? T.bg : T.textDim, fontWeight: o === active ? 700 : 400,
        }}>{o}</span>
      ))}
    </div>
  );
}

// ─── Display headings ───
function H1({ children, em, style }) {
  return (
    <h1 style={{
      fontFamily: T.serif, fontWeight: 400, fontSize: 58, lineHeight: 0.95,
      letterSpacing: '-0.04em', margin: 0, ...style,
    }}>
      {children}{em && <em style={{ color: T.accent, fontStyle: 'italic' }}>{em}</em>}
    </h1>
  );
}

function H2({ children, style }) {
  return (
    <h2 style={{ fontFamily: T.serif, fontWeight: 400, fontSize: 30, lineHeight: 1, letterSpacing: '-0.02em', margin: 0, ...style }}>{children}</h2>
  );
}

function H3({ children, style }) {
  return (
    <h3 style={{ fontFamily: T.serif, fontWeight: 500, fontStyle: 'italic', fontSize: 18, margin: 0, color: T.accent, ...style }}>{children}</h3>
  );
}

// ─── Section header inside a screen ───
function ScreenSection({ title, children, style }) {
  return (
    <div style={{ marginBottom: 18, ...style }}>
      <Label style={{ display: 'block', marginBottom: 8 }}>{title}</Label>
      {children}
    </div>
  );
}

Object.assign(window, {
  Phone, TopBar, Label, Panel, PanelRow,
  Btn, PlayBtn, ColorChip, ColorGrid,
  ProgressBar, Pill, Seg, H1, H2, H3, ScreenSection,
});

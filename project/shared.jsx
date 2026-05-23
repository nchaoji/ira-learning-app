// shared.jsx — UI primitives & data for the Ira prototype
// Loaded after icons.jsx, before screen files.

// ─────────────────────────────────────────────────────────────
// Track palette & metadata
// ─────────────────────────────────────────────────────────────
const TRACKS = {
  phy:   { key: 'phy',  name: 'Physics',       short: 'Phy',  color: 'var(--tk-phy)',  icon: 'atom',   group: 'PCB' },
  chem:  { key: 'chem', name: 'Chemistry',     short: 'Chem', color: 'var(--tk-chem)', icon: 'beaker', group: 'PCB' },
  bio:   { key: 'bio',  name: 'Biology',       short: 'Bio',  color: 'var(--tk-bio)',  icon: 'dna',    group: 'PCB' },
  ger:   { key: 'ger',  name: 'German',        short: 'Ger',  color: 'var(--tk-ger)',  icon: 'globe',  group: 'Language' },
  math:  { key: 'math', name: 'NIOS Maths',    short: 'Math', color: 'var(--tk-math)', icon: 'sigma',  group: 'Core' },
  psy:   { key: 'psy',  name: 'Psychology',    short: 'Psy',  color: 'var(--tk-psy)',  icon: 'brain',  group: 'Core' },
  gk:    { key: 'gk',   name: 'GK & Current',  short: 'GK',   color: 'var(--tk-gk)',   icon: 'globe',  group: 'Daily' },
  vol:   { key: 'vol',  name: 'Volunteering',  short: 'Vol',  color: 'var(--tk-vol)',  icon: 'heart',  group: 'Profile' },
  jrn:   { key: 'jrn',  name: 'Journal',       short: 'Jrn',  color: 'var(--tk-vol)',  icon: 'pen',    group: 'Profile' },
};

// ─────────────────────────────────────────────────────────────
// Primitive: chip / pill
// ─────────────────────────────────────────────────────────────
function Chip({ children, color, bg, tone = 'soft', size = 'sm', style }) {
  const c = color || 'var(--ink)';
  const styles = {
    soft:    { background: bg || 'var(--paper-2)', color: c, border: 'none' },
    outline: { background: 'transparent', color: c, border: `1px solid ${c}` },
    solid:   { background: c, color: '#fff', border: 'none' },
    ghost:   { background: 'transparent', color: c, border: '1px solid var(--hair)' },
  }[tone];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: size === 'sm' ? '2px 8px' : '4px 10px',
      borderRadius: 999, fontSize: size === 'sm' ? 11 : 12,
      fontWeight: 500, lineHeight: 1.4,
      ...styles, ...style,
    }}>{children}</span>
  );
}

// Track chip with color dot
function TrackChip({ track, size = 'sm', selected, onClick }) {
  const t = TRACKS[track];
  if (!t) return null;
  return (
    <span onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: size === 'sm' ? '3px 9px 3px 7px' : '5px 12px 5px 9px',
      borderRadius: 999,
      background: selected ? t.color : 'var(--card)',
      color: selected ? '#fff' : 'var(--ink-2)',
      fontSize: size === 'sm' ? 11 : 12,
      fontWeight: 500, letterSpacing: -0.1,
      border: selected ? 'none' : '1px solid var(--hair)',
      cursor: onClick ? 'pointer' : 'default',
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: 99,
        background: selected ? '#fff' : t.color,
      }} />
      {t.name}
    </span>
  );
}

// Health dot (green / amber / red)
function HealthDot({ status = 'green', size = 8 }) {
  const c = status === 'green' ? 'var(--green)' : status === 'amber' ? 'var(--amber)' : 'var(--red)';
  return <span style={{ width: size, height: size, borderRadius: 99, background: c, display: 'inline-block', flexShrink: 0 }} />;
}

// ─────────────────────────────────────────────────────────────
// Card
// ─────────────────────────────────────────────────────────────
function Card({ children, style, padding = 16, onClick }) {
  return (
    <div onClick={onClick} style={{
      background: 'var(--card)',
      borderRadius: 'var(--r-lg)',
      padding,
      border: '1px solid var(--hair)',
      cursor: onClick ? 'pointer' : 'default',
      ...style,
    }}>{children}</div>
  );
}

// ─────────────────────────────────────────────────────────────
// Progress bar — slim, editorial
// ─────────────────────────────────────────────────────────────
function ProgressBar({ value = 0, max = 100, color = 'var(--ink)', height = 4, track = 'var(--hair-2)' }) {
  return (
    <div style={{ height, background: track, borderRadius: 99, overflow: 'hidden' }}>
      <div style={{ width: `${Math.min(100, (value/max)*100)}%`, height: '100%', background: color, borderRadius: 99, transition: 'width 0.6s ease' }} />
    </div>
  );
}

// segmented stacked bar (e.g. concept mastery distribution)
function StackedBar({ segments = [], height = 8 }) {
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  return (
    <div style={{ display: 'flex', height, borderRadius: 99, overflow: 'hidden', gap: 1.5, background: 'var(--paper)' }}>
      {segments.map((s, i) => (
        <div key={i} style={{ flex: s.value / total, background: s.color }} />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Button
// ─────────────────────────────────────────────────────────────
function Btn({ children, variant = 'primary', size = 'md', icon, onClick, style }) {
  const sizes = {
    sm: { padding: '7px 14px', fontSize: 13, borderRadius: 999 },
    md: { padding: '11px 18px', fontSize: 14, borderRadius: 999 },
    lg: { padding: '14px 22px', fontSize: 15, borderRadius: 999 },
  };
  const variants = {
    primary: { background: 'var(--ink)', color: 'var(--paper)', border: '1px solid var(--ink)' },
    accent:  { background: 'var(--accent)', color: '#fff', border: '1px solid var(--accent)' },
    ghost:   { background: 'transparent', color: 'var(--ink)', border: '1px solid var(--hair)' },
    soft:    { background: 'var(--paper-2)', color: 'var(--ink)', border: '1px solid transparent' },
  };
  return (
    <button onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      cursor: 'pointer', fontFamily: 'var(--f-sans)', fontWeight: 500,
      letterSpacing: -0.1, lineHeight: 1, whiteSpace: 'nowrap',
      ...sizes[size], ...variants[variant], ...style,
    }}>
      {icon}
      {children}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// Top app bar (in-app, replaces the iOS large-title nav)
// ─────────────────────────────────────────────────────────────
function AppBar({ title, subtitle, leading, trailing, onBack }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center',
      padding: '14px 18px 8px',
    }}>
      {onBack ? (
        <button onClick={onBack} style={{
          background: 'transparent', border: 'none', cursor: 'pointer',
          padding: 6, marginLeft: -6, marginRight: 6, color: 'var(--ink)',
        }}>
          <Icons.back size={22}/>
        </button>
      ) : leading}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="upper" style={{ fontSize: 10, color: 'var(--ink-faint)', fontWeight: 600 }}>{subtitle}</div>
        <div className="serif" style={{ fontSize: 24, lineHeight: 1.1, color: 'var(--ink)', marginTop: 2 }}>{title}</div>
      </div>
      {trailing}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Bottom tab bar
// ─────────────────────────────────────────────────────────────
function TabBar({ active, onSelect }) {
  const tabs = [
    { id: 'today',   label: 'Today',   icon: 'spark' },
    { id: 'tracks',  label: 'Tracks',  icon: 'layers' },
    { id: 'recall',  label: 'Recall',  icon: 'brain' },
    { id: 'journal', label: 'Journal', icon: 'pen' },
    { id: 'me',      label: 'Me',      icon: 'user' },
  ];
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 30,
      paddingBottom: 28, paddingTop: 8,
      background: 'linear-gradient(to top, var(--paper) 60%, color-mix(in oklab, var(--paper) 0%, transparent))',
      display: 'flex', justifyContent: 'space-around',
    }}>
      {tabs.map(t => {
        const Icon = Icons[t.icon];
        const isActive = active === t.id;
        return (
          <button key={t.id} onClick={() => onSelect?.(t.id)} style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            padding: '6px 10px',
            color: isActive ? 'var(--ink)' : 'var(--ink-faint)',
          }}>
            <Icon size={22} sw={isActive ? 2 : 1.5}/>
            <span style={{ fontSize: 10, fontWeight: isActive ? 600 : 500, letterSpacing: -0.1 }}>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Phone shell — paper-background frame (NOT iOS-style)
// Drops the system app-look in favour of Ira's own visual system.
// ─────────────────────────────────────────────────────────────
function Phone({ children, time = '7:48', dark = false, statusInk }) {
  // night theme is detected via the parent .theme-night class; for other
  // themes we just honour the token vars. Status bar SVG fills use the
  // computed ink color via currentColor.
  return (
    <div style={{
      width: 390, height: 800, borderRadius: 44,
      background: 'var(--paper)',
      boxShadow: '0 30px 60px rgba(26,24,20,0.18), 0 0 0 9px #15140F, 0 0 0 10px rgba(255,255,255,0.05)',
      position: 'relative', overflow: 'hidden',
      fontFamily: 'var(--f-sans)', color: 'var(--ink)',
    }}>
      {/* dynamic island */}
      <div style={{
        position: 'absolute', top: 11, left: '50%', transform: 'translateX(-50%)',
        width: 110, height: 32, borderRadius: 20, background: '#000', zIndex: 80,
      }} />
      {/* status bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 54,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '18px 30px 0', zIndex: 70, color: 'var(--ink)',
        fontFamily: '-apple-system, system-ui', fontSize: 15, fontWeight: 600,
      }}>
        <span className="tnum">{time}</span>
        <span style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {/* signal */}
          <svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor"><rect y="7" width="3" height="4" rx="0.6"/><rect x="4.5" y="5" width="3" height="6" rx="0.6"/><rect x="9" y="2.5" width="3" height="8.5" rx="0.6"/><rect x="13.5" width="3" height="11" rx="0.6"/></svg>
          {/* battery */}
          <svg width="24" height="11" viewBox="0 0 24 11" fill="none"><rect x="0.5" y="0.5" width="20" height="10" rx="2.5" stroke="currentColor" strokeOpacity="0.4"/><rect x="2" y="2" width="17" height="7" rx="1.3" fill="currentColor"/><rect x="21.5" y="3.5" width="1.5" height="4" rx="0.5" fill="currentColor" opacity="0.4"/></svg>
        </span>
      </div>
      <div className="no-scroll" style={{
        position: 'absolute', inset: 0, overflow: 'auto',
      }}>
        {children}
      </div>
      {/* home indicator */}
      <div style={{
        position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)',
        width: 134, height: 5, borderRadius: 99,
        background: 'color-mix(in oklab, var(--ink) 30%, transparent)',
        zIndex: 90, pointerEvents: 'none',
      }} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Tiny streak/level/xp pieces
// ─────────────────────────────────────────────────────────────
function StreakBadge({ n, label = 'day streak', mono = true, color = 'var(--accent)' }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 4, color }}>
      <Icons.flame size={13} c={color} sw={1.8}/>
      <span className={mono ? 'mono' : ''} style={{ fontSize: 13, fontWeight: 600 }}>{n}</span>
      <span style={{ fontSize: 11, color: 'var(--ink-mute)', fontWeight: 500 }}>{label}</span>
    </span>
  );
}

// Tiny sparkline for the recall trend
function Sparkline({ data = [], color = 'var(--ink)', w = 80, h = 22, fill = false }) {
  if (!data.length) return null;
  const max = Math.max(...data, 5);
  const min = Math.min(...data, 0);
  const range = Math.max(0.001, max - min);
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 2) - 1;
    return [x, y];
  });
  const d = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ');
  const dFill = `${d} L ${w} ${h} L 0 ${h} Z`;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: 'block' }}>
      {fill && <path d={dFill} fill={color} opacity={0.12}/>}
      <path d={d} stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// section header inside content
function SectionHead({ title, action, style }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
      padding: '6px 18px 8px', ...style,
    }}>
      <span className="upper" style={{ fontSize: 10.5, fontWeight: 600, color: 'var(--ink-mute)' }}>{title}</span>
      {action}
    </div>
  );
}

Object.assign(window, {
  TRACKS, Chip, TrackChip, HealthDot, Card, ProgressBar, StackedBar,
  Btn, AppBar, TabBar, Phone, StreakBadge, Sparkline, SectionHead,
});

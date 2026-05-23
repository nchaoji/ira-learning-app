// components.jsx — shared UI primitives
import Icons from './icons.jsx';

// ── Chip / pill ───────────────────────────────────────────────
export function Chip({ children, color, bg, tone = 'soft', size = 'sm', style }) {
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
      padding: size === 'sm' ? '2px 9px' : '5px 12px',
      borderRadius: 999, fontSize: size === 'sm' ? 11 : 12,
      fontWeight: 500, lineHeight: 1.4,
      ...styles, ...style,
    }}>{children}</span>
  );
}

// ── Health dot ────────────────────────────────────────────────
export function HealthDot({ status = 'green', size = 8 }) {
  const c = status === 'green' ? 'var(--green)' : status === 'amber' ? 'var(--amber)' : 'var(--red)';
  return <span style={{ width: size, height: size, borderRadius: 99, background: c, display: 'inline-block', flexShrink: 0 }} />;
}

// ── Card ──────────────────────────────────────────────────────
export function Card({ children, style, padding = 16, onClick }) {
  return (
    <div onClick={onClick} style={{
      background: 'var(--card)', borderRadius: 'var(--r-lg)',
      padding, border: '1px solid var(--hair)',
      cursor: onClick ? 'pointer' : 'default',
      ...style,
    }}>{children}</div>
  );
}

// ── Progress bar ──────────────────────────────────────────────
export function ProgressBar({ value = 0, max = 100, color = 'var(--ink)', height = 4, track = 'var(--hair-2)' }) {
  return (
    <div style={{ height, background: track, borderRadius: 99, overflow: 'hidden' }}>
      <div style={{ width: `${Math.min(100, (value / max) * 100)}%`, height: '100%', background: color, borderRadius: 99, transition: 'width 0.6s ease' }} />
    </div>
  );
}

// ── Stacked bar ───────────────────────────────────────────────
export function StackedBar({ segments = [], height = 8 }) {
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  return (
    <div style={{ display: 'flex', height, borderRadius: 99, overflow: 'hidden', gap: 1.5, background: 'var(--paper)' }}>
      {segments.map((s, i) => (
        <div key={i} style={{ flex: s.value / total, background: s.color }} />
      ))}
    </div>
  );
}

// ── Button ────────────────────────────────────────────────────
export function Btn({ children, variant = 'primary', size = 'md', icon, onClick, style, disabled }) {
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
    <button onClick={onClick} disabled={disabled} style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1,
      fontFamily: 'var(--f-sans)', fontWeight: 500,
      letterSpacing: -0.1, lineHeight: 1, whiteSpace: 'nowrap',
      ...sizes[size], ...variants[variant], ...style,
    }}>
      {icon}
      {children}
    </button>
  );
}

// ── Top app bar ───────────────────────────────────────────────
export function AppBar({ title, subtitle, leading, trailing, onBack }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '14px 18px 8px' }}>
      {onBack ? (
        <button onClick={onBack} style={{
          background: 'transparent', border: 'none', cursor: 'pointer',
          padding: 6, marginLeft: -6, marginRight: 6, color: 'var(--ink)',
        }}>
          <Icons.back size={22} />
        </button>
      ) : leading}
      <div style={{ flex: 1, minWidth: 0 }}>
        {subtitle && <div className="upper" style={{ fontSize: 10, color: 'var(--ink-faint)', fontWeight: 600 }}>{subtitle}</div>}
        <div className="serif" style={{ fontSize: 24, lineHeight: 1.1, color: 'var(--ink)', marginTop: 2 }}>{title}</div>
      </div>
      {trailing}
    </div>
  );
}

// ── Bottom tab bar ────────────────────────────────────────────
export function TabBar({ active, onSelect }) {
  const tabs = [
    { id: 'today',   label: 'Today',   icon: 'spark' },
    { id: 'tracks',  label: 'Tracks',  icon: 'layers' },
    { id: 'recall',  label: 'Recall',  icon: 'brain' },
    { id: 'journal', label: 'Journal', icon: 'pen' },
    { id: 'me',      label: 'Me',      icon: 'user' },
  ];
  return (
    <div style={{
      position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
      width: '100%', maxWidth: 430,
      paddingBottom: 'max(20px, calc(8px + var(--safe-bottom, 0px)))',
      paddingTop: 8,
      background: 'linear-gradient(to top, var(--paper) 60%, color-mix(in oklab, var(--paper) 0%, transparent))',
      display: 'flex', justifyContent: 'space-around',
      zIndex: 30,
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
            <Icon size={22} sw={isActive ? 2 : 1.5} />
            <span style={{ fontSize: 10, fontWeight: isActive ? 600 : 500, letterSpacing: -0.1 }}>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ── Streak badge ──────────────────────────────────────────────
export function StreakBadge({ n, label = 'day streak', color = 'var(--accent)' }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 4, color }}>
      <Icons.flame size={13} c={color} sw={1.8} />
      <span className="mono" style={{ fontSize: 13, fontWeight: 600 }}>{n}</span>
      <span style={{ fontSize: 11, color: 'var(--ink-mute)', fontWeight: 500 }}>{label}</span>
    </span>
  );
}

// ── Sparkline ─────────────────────────────────────────────────
export function Sparkline({ data = [], color = 'var(--ink)', w = 80, h = 22, fill = false }) {
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
      {fill && <path d={dFill} fill={color} opacity={0.12} />}
      <path d={d} stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Section header ────────────────────────────────────────────
export function SectionHead({ title, action, style }) {
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

// ── Status bar spacer ─────────────────────────────────────────
export function StatusSpacer() {
  return <div style={{ height: 'max(54px, calc(44px + var(--safe-top, 0px)))' }} />;
}

// ── Concept dot ───────────────────────────────────────────────
export function ConceptDot({ c }) {
  return <span style={{ width: 10, height: 10, borderRadius: 3, background: c, opacity: 0.9 }} />;
}

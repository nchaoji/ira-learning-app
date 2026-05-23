import { useNavigate } from 'react-router-dom';
import Icons from '../icons.jsx';
import { useAppState } from '../state.jsx';
import { Card, ProgressBar, SectionHead, StatusSpacer, TabBar } from '../components.jsx';

export default function Me() {
  const { state } = useAppState();
  const nav = useNavigate();
  const s = state;
  const xpPct = (s.user.xp / s.user.xpToNext) * 100;

  return (
    <div className="ira-screen">
      <div className="no-scroll" style={{ flex: 1, overflowY: 'auto', paddingBottom: 100 }}>
        <StatusSpacer />

        {/* profile header */}
        <div style={{ padding: '14px 18px 8px', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 64, height: 64, borderRadius: 99,
            background: 'var(--ink)', color: 'var(--paper)',
            fontFamily: 'var(--f-serif)', fontSize: 30,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>I</div>
          <div style={{ flex: 1 }}>
            <div className="serif" style={{ fontSize: 26, lineHeight: 1.1 }}>Ira</div>
            <div style={{ fontSize: 12, color: 'var(--ink-mute)', marginTop: 2 }}>Class 11 · CBSE · PCB + Psych</div>
          </div>
        </div>

        {/* level + XP */}
        <div style={{ padding: '14px 18px' }}>
          <Card padding={18} style={{ background: 'var(--ink)', borderColor: 'transparent' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14 }}>
              <div>
                <div className="upper" style={{ fontSize: 10, fontWeight: 600, color: 'color-mix(in oklab, var(--paper) 55%, transparent)' }}>
                  Level {s.user.level} · {s.user.levelName}
                </div>
                <div style={{ marginTop: 4 }}>
                  <span className="mono" style={{ fontSize: 22, color: 'var(--paper)' }}>{s.user.xp}</span>
                  <span style={{ color: 'color-mix(in oklab, var(--paper) 40%, transparent)', fontSize: 16 }}> / {s.user.xpToNext} XP</span>
                </div>
              </div>
              <span style={{ fontSize: 11, color: 'color-mix(in oklab, var(--paper) 55%, transparent)' }}>
                {s.user.xpToNext - s.user.xp} to Pathfinder
              </span>
            </div>
            <ProgressBar value={xpPct} color="var(--accent)" track="color-mix(in oklab, var(--paper) 12%, transparent)" height={5} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontSize: 10.5, color: 'color-mix(in oklab, var(--paper) 45%, transparent)' }}>
              <span>Explorer</span>
              <span>Scholar</span>
              <span style={{ color: 'var(--paper)' }}>· Navigator</span>
              <span>Pathfinder</span>
              <span>Trailblazer</span>
            </div>
          </Card>
        </div>

        {/* streaks */}
        <SectionHead title="Streaks" />
        <div style={{ padding: '0 18px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <StreakCell n={s.streaks.master} label="master streak" icon="bolt" big />
          <StreakCell n={s.streaks.gk} label="GK days" icon="flame" big accent />
          <StreakCell n={s.streaks.recall} label="recall days" icon="brain" />
          <StreakCell n={s.streaks.writing} label="writing weeks" icon="pen" />
        </div>

        {/* achievements */}
        <SectionHead title="Achievements" action={<span style={{ fontSize: 11, color: 'var(--ink-mute)' }}>3 of 8</span>} style={{ paddingTop: 22 }} />
        <div style={{ padding: '0 18px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          {s.badges.map(b => <BadgeTile key={b.id} b={b} />)}
        </div>

        {/* parent view link */}
        <SectionHead title="Quick links" style={{ paddingTop: 26 }} />
        <div style={{ padding: '0 18px', marginBottom: 12 }}>
          <Card padding={14} onClick={() => nav('/parent')} style={{ cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Icons.trend size={18} c="var(--ink-mute)" sw={1.6} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13.5, fontWeight: 500 }}>Parent overview</div>
                <div style={{ fontSize: 11, color: 'var(--ink-mute)', marginTop: 1 }}>Niranjan's dashboard — track health & milestones</div>
              </div>
              <Icons.arrow size={14} c="var(--ink-faint)" />
            </div>
          </Card>
        </div>

        {/* settings */}
        <SectionHead title="Settings" />
        <div style={{ padding: '0 16px' }}>
          <Card padding={0}>
            {[
              { icon: 'bell',     label: 'Notifications',         sub: 'On · 5/day max · quiet 9pm – 7am' },
              { icon: 'calendar', label: 'Class schedule',        sub: 'Aakash · Goethe · School' },
              { icon: 'shield',   label: 'Privacy & parent view', sub: 'Niranjan sees health, not content' },
              { icon: 'lock',     label: 'Streak freezes',        sub: '1 available · resets June 1', last: true },
            ].map((r, i) => {
              const Icon = Icons[r.icon];
              return (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px',
                  borderBottom: r.last ? 'none' : '1px solid var(--hair-2)',
                }}>
                  <Icon size={18} c="var(--ink-mute)" sw={1.6} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 500 }}>{r.label}</div>
                    <div style={{ fontSize: 11, color: 'var(--ink-mute)', marginTop: 1 }}>{r.sub}</div>
                  </div>
                  <Icons.arrow size={14} c="var(--ink-faint)" />
                </div>
              );
            })}
          </Card>
        </div>
      </div>

      <TabBar active="me" onSelect={(id) => {
        if (id === 'recall') nav('/recall/1');
        else nav('/' + id);
      }} />
    </div>
  );
}

function StreakCell({ n, label, icon, big, accent }) {
  const Icon = Icons[icon];
  const c = accent ? 'var(--accent)' : 'var(--ink)';
  return (
    <div style={{ background: 'var(--card)', borderRadius: 'var(--r-md)', padding: 14, border: '1px solid var(--hair)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <Icon size={14} c={c} sw={1.8} />
        <span style={{ fontSize: 11.5, color: 'var(--ink-mute)', textTransform: 'lowercase' }}>{label}</span>
      </div>
      <div className="mono" style={{ fontSize: big ? 32 : 24, fontWeight: 600, color: c, marginTop: 6, letterSpacing: -1 }}>{n}</div>
    </div>
  );
}

function BadgeTile({ b }) {
  return (
    <div style={{
      background: b.earned ? 'var(--card)' : 'var(--paper-2)',
      borderRadius: 'var(--r-md)', padding: 12,
      border: '1px solid var(--hair)',
      opacity: b.earned ? 1 : 0.55,
      textAlign: 'center', aspectRatio: '1',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: 10, margin: '0 auto',
        background: b.earned ? 'var(--accent-soft)' : 'var(--hair-2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icons.badge size={20} c={b.earned ? 'var(--accent)' : 'var(--ink-faint)'} sw={1.6} />
      </div>
      <div style={{ fontSize: 10.5, lineHeight: 1.2, fontWeight: 500, color: 'var(--ink)' }}>{b.name}</div>
      <div style={{ fontSize: 9.5, color: 'var(--ink-faint)' }} className="mono">
        {b.earned ? b.date : `${b.progress}% in`}
      </div>
    </div>
  );
}

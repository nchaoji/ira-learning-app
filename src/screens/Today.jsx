import { useNavigate } from 'react-router-dom';
import Icons from '../icons.jsx';
import { useAppState, TRACKS } from '../state.jsx';
import { Card, Chip, HealthDot, Btn, SectionHead, StatusSpacer, TabBar } from '../components.jsx';

export default function Today() {
  const { state } = useAppState();
  const nav = useNavigate();
  const s = state;
  const xpPct = (s.user.xp / s.user.xpToNext) * 100;

  return (
    <div className="ira-screen">
      <div className="no-scroll" style={{ flex: 1, overflowY: 'auto', paddingBottom: 100 }}>
        <StatusSpacer />

        {/* header */}
        <div style={{ padding: '12px 22px 8px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <div className="upper" style={{ fontSize: 10.5, color: 'var(--ink-faint)', fontWeight: 600 }}>
              {s.today.day} · {s.today.date}
            </div>
            <div className="serif" style={{ fontSize: 30, lineHeight: 1.05, marginTop: 4, color: 'var(--ink)' }}>
              Good morning,<br />Ira.
            </div>
          </div>
          <button onClick={() => nav('/me')} style={{
            background: 'var(--card)', border: '1px solid var(--hair)', borderRadius: 99,
            width: 40, height: 40, cursor: 'pointer', padding: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--f-serif)', fontSize: 17, color: 'var(--ink)',
          }}>I</button>
        </div>

        {/* today's focus hero card */}
        <div style={{ padding: '14px 18px 8px' }}>
          <div style={{
            background: 'var(--ink)', color: 'var(--paper)',
            borderRadius: 'var(--r-xl)', padding: '22px 22px 20px',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: -40, right: -40, width: 140, height: 140,
              background: 'radial-gradient(circle, rgba(217,98,126,0.4), transparent 70%)',
              borderRadius: '50%',
            }} />
            <div style={{ position: 'relative' }}>
              <div className="upper" style={{ fontSize: 10, color: 'color-mix(in oklab, var(--paper) 55%, transparent)', fontWeight: 600, marginBottom: 8 }}>
                Today's focus
              </div>
              <div className="serif" style={{ fontSize: 22, lineHeight: 1.2, color: 'var(--paper)' }}>
                Physics class at Aakash, 4:30 pm.<br />
                <span style={{ color: 'color-mix(in oklab, var(--paper) 55%, transparent)' }}>Brain dump waiting after.</span>
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 16, alignItems: 'center' }}>
                <Btn variant="accent" size="sm" onClick={() => nav('/recall/1')}>Start a recall</Btn>
                <span style={{ fontSize: 12, color: 'color-mix(in oklab, var(--paper) 55%, transparent)' }}>or do it after class</span>
              </div>
            </div>
          </div>
        </div>

        {/* streak ribbon */}
        <div style={{ display: 'flex', gap: 8, padding: '12px 18px 4px', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px 8px 10px', background: 'var(--card)', borderRadius: 99, border: '1px solid var(--hair)' }}>
            <Icons.flame size={14} c="var(--accent)" sw={2} />
            <span className="mono" style={{ fontSize: 13, fontWeight: 600 }}>{s.streaks.gk}</span>
            <span style={{ fontSize: 11, color: 'var(--ink-mute)' }}>GK</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px 8px 10px', background: 'var(--card)', borderRadius: 99, border: '1px solid var(--hair)' }}>
            <Icons.brain size={14} c="var(--ink)" sw={1.8} />
            <span className="mono" style={{ fontSize: 13, fontWeight: 600 }}>{s.streaks.recall}</span>
            <span style={{ fontSize: 11, color: 'var(--ink-mute)' }}>recall days</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px 8px 10px', background: 'var(--card)', borderRadius: 99, border: '1px solid var(--hair)', marginLeft: 'auto' }}>
            <Icons.badge size={14} c="var(--ink)" sw={1.8} />
            <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--ink)' }}>L{s.user.level} · {s.user.levelName}</span>
          </div>
        </div>

        {/* tasks */}
        <SectionHead title={`Today · ${s.tasks.length} tasks`} action={<span style={{ fontSize: 11, color: 'var(--ink-mute)' }}>~29 min</span>} style={{ paddingTop: 18 }} />
        <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {s.tasks.map(t => <TaskRow key={t.id} task={t} completed={s.completedTasks.includes(t.id)} nav={nav} />)}
        </div>

        {/* weekly synthesis */}
        <SectionHead title="This week" style={{ paddingTop: 22 }} />
        <div style={{ padding: '0 18px' }}>
          <Card padding={16} style={{ background: 'var(--paper-2)', borderColor: 'transparent' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--accent-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icons.layers size={16} c="var(--accent-ink)" />
              </div>
              <div style={{ flex: 1 }}>
                <div className="serif" style={{ fontSize: 16, lineHeight: 1.25 }}>Weekly Synthesis Challenge</div>
                <div style={{ fontSize: 12.5, color: 'var(--ink-mute)', marginTop: 4, lineHeight: 1.45 }}>
                  Pick one concept from Physics, Chem and Bio this week. How do they connect?
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}>
                  <Chip color="var(--accent-ink)" bg="var(--accent-soft)">+50 XP</Chip>
                  <span style={{ fontSize: 11, color: 'var(--ink-mute)' }}>3 days left</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* drift watch */}
        <SectionHead title="Drift watch" style={{ paddingTop: 22 }} />
        <div style={{ padding: '0 18px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Card padding={14}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <HealthDot status="amber" size={10} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13.5, fontWeight: 500 }}>Volunteering — 3 weeks since last session</div>
                <div style={{ fontSize: 11.5, color: 'var(--ink-mute)', marginTop: 2 }}>Even 2 hours this weekend helps the Ashoka profile.</div>
              </div>
              <Icons.arrow size={16} c="var(--ink-faint)" />
            </div>
          </Card>
          <Card padding={14}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <HealthDot status="amber" size={10} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13.5, fontWeight: 500 }}>Organic Chem recall dipping</div>
                <div style={{ fontSize: 11.5, color: 'var(--ink-mute)', marginTop: 2 }}>Carbonyl reactions: 2.7/5 avg over 2 weeks. Revisit Ch 12?</div>
              </div>
              <Icons.arrow size={16} c="var(--ink-faint)" />
            </div>
          </Card>
        </div>
      </div>

      <TabBar active="today" onSelect={(id) => {
        if (id === 'recall') nav('/recall/1');
        else nav('/' + id);
      }} />
    </div>
  );
}

function TaskRow({ task, completed, nav }) {
  const t = TRACKS[task.track];
  if (!t) return null;
  const Icon = Icons[t.icon] || Icons.spark;
  const handleClick = () => {
    if (completed) return;
    if (task.kind === 'gk') nav('/gk');
    else if (task.kind === 'recall') nav('/recall/1');
    else if (task.kind === 'review') nav('/review');
    else if (task.kind === 'journal') nav('/journal');
  };
  return (
    <div onClick={handleClick} style={{
      background: completed ? 'var(--paper-2)' : 'var(--card)',
      borderRadius: 'var(--r-md)', padding: '12px 14px',
      border: '1px solid var(--hair)',
      display: 'flex', alignItems: 'center', gap: 12,
      cursor: completed ? 'default' : 'pointer',
      opacity: completed ? 0.55 : 1,
    }}>
      <div style={{
        width: 38, height: 38, borderRadius: 10,
        background: completed ? 'var(--green-soft)' : `color-mix(in oklab, ${t.color} 14%, var(--paper))`,
        color: completed ? 'var(--green)' : t.color,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        {completed ? <Icons.check size={18} c="var(--green)" sw={2} /> : <Icon size={18} c={t.color} sw={1.8} />}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--ink)', textDecoration: completed ? 'line-through' : 'none' }}>{task.title}</div>
        <div style={{ fontSize: 11.5, color: 'var(--ink-mute)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{task.sub}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 3, flexShrink: 0 }}>
        <span className="mono" style={{ fontSize: 11, color: 'var(--ink)', fontWeight: 600 }}>+{task.xp}</span>
        <span style={{ fontSize: 10, color: 'var(--ink-faint)' }}>{task.minutes}m</span>
      </div>
    </div>
  );
}

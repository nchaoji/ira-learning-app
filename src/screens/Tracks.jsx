import { useNavigate } from 'react-router-dom';
import Icons from '../icons.jsx';
import { useAppState, TRACKS } from '../state.jsx';
import { Card, HealthDot, ProgressBar, AppBar, SectionHead, StatusSpacer, TabBar } from '../components.jsx';

export default function TracksScreen() {
  const { state } = useAppState();
  const nav = useNavigate();
  return (
    <div className="ira-screen">
      <div className="no-scroll" style={{ flex: 1, overflowY: 'auto', paddingBottom: 100 }}>
        <StatusSpacer />
        <AppBar subtitle="22-month horizon · 7 tracks" title="Your tracks"
          trailing={<button style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 6 }}><Icons.filter size={20} /></button>}
        />

        {/* horizon strip */}
        <div style={{ padding: '4px 18px 14px' }}>
          <Card padding={14} style={{ background: 'var(--paper-2)', borderColor: 'transparent' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <span className="upper" style={{ fontSize: 10, fontWeight: 600, color: 'var(--ink-mute)' }}>Horizon</span>
              <span style={{ fontSize: 11, color: 'var(--ink-mute)' }}>May 26 → Mar 2028</span>
            </div>
            <div style={{ display: 'flex', height: 6, borderRadius: 99, overflow: 'hidden', background: 'var(--hair-2)' }}>
              <div style={{ width: '4%', height: '100%', background: 'var(--ink)' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
              <span className="mono" style={{ fontSize: 11, color: 'var(--ink-mute)' }}>Month 1</span>
              <span className="mono" style={{ fontSize: 11, color: 'var(--ink-mute)' }}>22 months to boards</span>
            </div>
          </Card>
        </div>

        <SectionHead title="Active · core academics" />
        <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {['phy', 'chem', 'bio', 'psy'].map(k => {
            const t = state.tracks.find(x => x.key === k);
            return <TrackRow key={k} t={t} nav={nav} />;
          })}
        </div>

        <SectionHead title="Languages & supplementary" style={{ paddingTop: 22 }} />
        <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {['ger', 'math'].map(k => {
            const t = state.tracks.find(x => x.key === k);
            return <TrackRow key={k} t={t} nav={nav} />;
          })}
        </div>

        <SectionHead title="Daily habits & profile" style={{ paddingTop: 22 }} />
        <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {['gk', 'vol'].map(k => {
            const t = state.tracks.find(x => x.key === k);
            return <TrackRow key={k} t={t} nav={nav} />;
          })}
        </div>
      </div>

      <TabBar active="tracks" onSelect={(id) => {
        if (id === 'recall') nav('/recall/1');
        else nav('/' + id);
      }} />
    </div>
  );
}

function TrackRow({ t, nav }) {
  if (!t) return null;
  const meta = TRACKS[t.key];
  const Icon = Icons[meta.icon];
  const dim = t.syllabus === 0 && t.pace.includes('starts');
  return (
    <div onClick={() => t.key === 'bio' ? nav('/concept') : null} style={{
      background: 'var(--card)', borderRadius: 'var(--r-md)',
      padding: 14, border: '1px solid var(--hair)',
      cursor: t.key === 'bio' ? 'pointer' : 'default', opacity: dim ? 0.7 : 1,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 10,
          background: `color-mix(in oklab, ${meta.color} 14%, var(--paper))`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <Icon size={20} c={meta.color} sw={1.8} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
            <span style={{ fontSize: 15, fontWeight: 500 }}>{meta.name}</span>
            <HealthDot status={t.status} />
          </div>
          <div style={{ fontSize: 11.5, color: 'var(--ink-mute)', marginTop: 2 }}>{t.lastConcept}</div>
          {t.syllabus !== null && t.syllabus > 0 && (
            <div style={{ marginTop: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                <span className="mono" style={{ fontSize: 11, color: 'var(--ink)', fontWeight: 600 }}>{t.syllabus}%</span>
                <span style={{ fontSize: 11, color: 'var(--ink-mute)' }}>{t.pace}</span>
              </div>
              <ProgressBar value={t.syllabus} color={meta.color} />
            </div>
          )}
          {t.syllabus === null && t.streak > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}>
              <Icons.flame size={13} c="var(--accent)" sw={1.8} />
              <span className="mono" style={{ fontSize: 12, fontWeight: 600 }}>{t.streak}</span>
              <span style={{ fontSize: 11, color: 'var(--ink-mute)' }}>day streak</span>
            </div>
          )}
          {dim && <div style={{ fontSize: 11.5, color: 'var(--ink-mute)', marginTop: 8, fontStyle: 'italic' }}>{t.pace}</div>}
          {t.flag && (
            <div style={{ marginTop: 8, padding: '6px 10px', background: 'var(--amber-soft)', borderRadius: 8, fontSize: 11, color: '#6B4A14', display: 'flex', alignItems: 'center', gap: 5 }}>
              <Icons.flag size={10} c="#6B4A14" sw={2} />{t.flag}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

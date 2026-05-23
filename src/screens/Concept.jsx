import { useNavigate } from 'react-router-dom';
import { useAppState, TRACKS } from '../state.jsx';
import { Card, AppBar, SectionHead, StackedBar, StatusSpacer, ConceptDot } from '../components.jsx';

export default function ConceptScreen() {
  const { state } = useAppState();
  const nav = useNavigate();
  const cm = state.conceptMap;
  const meta = TRACKS[cm.track];
  const totals = cm.modules.reduce((a, m) => ({
    g: a.g + m.green, a: a.a + m.amber, r: a.r + m.red, t: a.t + m.total,
  }), { g: 0, a: 0, r: 0, t: 0 });

  return (
    <div className="ira-screen">
      <div className="no-scroll" style={{ flex: 1, overflowY: 'auto', paddingBottom: 40 }}>
        <StatusSpacer />
        <AppBar subtitle={meta.name + ' · Class 11'} title="Concept mastery" onBack={() => nav('/tracks')} />

        {/* summary hero */}
        <div style={{ padding: '4px 18px 14px' }}>
          <div style={{
            background: 'var(--ink)', color: 'var(--paper)',
            borderRadius: 'var(--r-xl)', padding: 22,
          }}>
            <div className="upper" style={{ fontSize: 10, color: 'color-mix(in oklab, var(--paper) 55%, transparent)', fontWeight: 600 }}>Exam readiness</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 6 }}>
              <span className="serif" style={{ fontSize: 56, lineHeight: 1, color: 'var(--paper)' }}>{Math.round(totals.g / totals.t * 100)}</span>
              <span style={{ fontSize: 18, color: 'color-mix(in oklab, var(--paper) 55%, transparent)' }}>% strong</span>
            </div>
            <div style={{ fontSize: 12.5, color: 'color-mix(in oklab, var(--paper) 65%, transparent)', marginTop: 6, lineHeight: 1.45 }}>
              Target by Dec 2027 — 70% green.<br />
              You're tracking <span style={{ color: 'var(--green)' }}>+8% above pace</span>.
            </div>
            <div style={{ marginTop: 16 }}>
              <StackedBar height={6} segments={[
                { value: totals.g, color: 'var(--green)' },
                { value: totals.a, color: 'var(--amber)' },
                { value: totals.r, color: 'var(--red)' },
              ]} />
              <div style={{ display: 'flex', gap: 14, marginTop: 10, fontSize: 11, color: 'color-mix(in oklab, var(--paper) 70%, transparent)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ width: 7, height: 7, borderRadius: 99, background: 'var(--green)' }} /> Strong · {totals.g}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ width: 7, height: 7, borderRadius: 99, background: 'var(--amber)' }} /> Fading · {totals.a}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ width: 7, height: 7, borderRadius: 99, background: 'var(--red)' }} /> Weak · {totals.r}
                </span>
              </div>
            </div>
          </div>
        </div>

        <SectionHead title="By module" />
        <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {cm.modules.map((m, i) => (
            <Card key={i} padding={14} style={m.current ? { borderColor: 'var(--accent)' } : null}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 500 }}>{m.name}</div>
                  {m.current && <div style={{ fontSize: 10.5, color: 'var(--accent)', marginTop: 2, fontWeight: 600 }} className="upper">Currently studying</div>}
                </div>
                <span className="mono" style={{ fontSize: 11.5, color: 'var(--ink-mute)' }}>{m.green}/{m.total}</span>
              </div>
              <div style={{ marginTop: 10 }}>
                <StackedBar height={6} segments={[
                  { value: m.green, color: 'var(--green)' },
                  { value: m.amber, color: 'var(--amber)' },
                  { value: m.red,   color: 'var(--red)' },
                ]} />
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 12 }}>
                {Array.from({ length: m.green }).map((_, j) => <ConceptDot key={'g'+j} c="var(--green)" />)}
                {Array.from({ length: m.amber }).map((_, j) => <ConceptDot key={'a'+j} c="var(--amber)" />)}
                {Array.from({ length: m.red }).map((_, j) => <ConceptDot key={'r'+j} c="var(--red)" />)}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

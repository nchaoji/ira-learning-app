import { useAppState, TRACKS } from '../state.jsx';
import Icons from '../icons.jsx';
import { Card, StackedBar, Sparkline, SectionHead } from '../components.jsx';
import { ParentNav } from './Dashboard.jsx';
import { useNavigate } from 'react-router-dom';

const subjects = [
  { key: 'phy',  green: 31, amber: 18, red: 11, total: 60, target: 75 },
  { key: 'chem', green: 24, amber: 22, red: 14, total: 60, target: 75 },
  { key: 'bio',  green: 38, amber: 16, red: 6,  total: 60, target: 80 },
  { key: 'psy',  green: 22, amber: 10, red: 4,  total: 36, target: 70 },
];

export default function ParentReadiness() {
  const { state } = useAppState();
  const nav = useNavigate();
  const tracksWithTrend = state.tracks.filter(t => t.trend && t.trend.length);

  return (
    <div className="parent-screen">
      <ParentNav onNav={nav} active="readiness" />
      <div style={{ padding: '32px 40px 60px', maxWidth: 1180, margin: '0 auto', boxSizing: 'border-box' }}>
        <div className="upper" style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink-mute)' }}>
          Projected · 10 months to boards
        </div>
        <h1 className="serif" style={{ fontSize: 44, lineHeight: 1.05, margin: '6px 0 28px', fontWeight: 400 }}>
          Exam readiness.<br />
          <span style={{ color: 'var(--ink-mute)' }}>Bio leads. Chem needs work.</span>
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 40 }}>
          {subjects.map(sub => {
            const m = TRACKS[sub.key];
            const Icon = Icons[m.icon];
            const pct = Math.round(sub.green / sub.total * 100);
            const onTarget = pct >= sub.target * 0.6;
            return (
              <Card key={sub.key} padding={22}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <div style={{
                    width: 30, height: 30, borderRadius: 8,
                    background: m.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={15} c="#fff" sw={1.8} />
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 500 }}>{m.name}</span>
                  <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--ink-mute)' }}>Target {sub.target}%</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                  <span className="serif" style={{ fontSize: 48, lineHeight: 1 }}>{pct}</span>
                  <span style={{ fontSize: 18, color: 'var(--ink-mute)' }}>% strong</span>
                </div>
                <div style={{ fontSize: 11.5, color: onTarget ? 'var(--green)' : 'var(--amber)', marginTop: 4, fontWeight: 500 }}>
                  {onTarget
                    ? `On pace for ${sub.target}% by Dec '27`
                    : `Trailing target — needs ${sub.target - pct}% lift`}
                </div>
                <div style={{ marginTop: 14 }}>
                  <StackedBar height={6} segments={[
                    { value: sub.green, color: 'var(--green)' },
                    { value: sub.amber, color: 'var(--amber)' },
                    { value: sub.red,   color: 'var(--red)' },
                  ]} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 10.5, color: 'var(--ink-mute)' }} className="mono">
                    <span>{sub.green} strong</span>
                    <span>{sub.amber} fading</span>
                    <span>{sub.red} weak</span>
                    <span>· {sub.total} total</span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <SectionHead title="Recall quality — 12 week rolling avg" style={{ paddingLeft: 0, paddingTop: 0 }} />
        <Card padding={24}>
          <div style={{ display: 'flex', gap: 24, alignItems: 'flex-end', height: 120, paddingBottom: 8, borderBottom: '1px solid var(--hair-2)' }}>
            {tracksWithTrend.map(t => {
              const m = TRACKS[t.key];
              const avg = (t.trend.reduce((a, b) => a + b, 0) / t.trend.length).toFixed(1);
              return (
                <div key={t.key} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                  <Sparkline data={t.trend} color={m.color} w={140} h={70} fill />
                  <div style={{ fontSize: 11, color: 'var(--ink-mute)' }}>{m.name}</div>
                  <span className="mono" style={{ fontSize: 13, fontWeight: 600 }}>{avg}/5</span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}

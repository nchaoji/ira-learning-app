// parent-screens.jsx — Niranjan's dashboard
// Web-first, calm, data-dense. Exception-based.

function ParentDashboard({ state }) {
  const s = state;
  return (
    <div style={{
      background: 'var(--paper)', minHeight: '100%', color: 'var(--ink)',
      fontFamily: 'var(--f-sans)', display: 'flex', flexDirection: 'column',
    }}>
      <ParentNav/>
      <div style={{ padding: '32px 40px 40px', maxWidth: 1180, width: '100%', boxSizing: 'border-box', margin: '0 auto' }}>
        {/* header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 28 }}>
          <div>
            <div className="upper" style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink-mute)' }}>Week of 26 May 2026</div>
            <h1 className="serif" style={{ fontSize: 44, lineHeight: 1.05, margin: '6px 0 0', fontWeight: 400 }}>
              Ira is on track.
              <span style={{ color: 'var(--ink-mute)' }}> Two amber flags.</span>
            </h1>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Btn variant="ghost" size="sm" icon={<Icons.calendar size={14}/>}>This week</Btn>
            <Btn variant="ghost" size="sm" icon={<Icons.bell size={14}/>}>Weekly digest</Btn>
          </div>
        </div>

        {/* hero metric strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 32 }}>
          <HeroMetric label="Tracks on schedule" value="5 / 7" sub="2 amber · 0 red"/>
          <HeroMetric label="Daily active days (30d)" value="28 / 30" sub="93% — target 90%"/>
          <HeroMetric label="Recall sessions completed" value="11 / 12" sub="92% of Aakash days"/>
          <HeroMetric label="Master streak" value="18" sub="days · longest this term" tone="accent"/>
        </div>

        {/* track grid */}
        <SectionHead title="7-track health" style={{ paddingLeft: 0, paddingTop: 0 }}/>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 32 }}>
          {s.tracks.map(t => <ParentTrackCard key={t.key} t={t}/>)}
        </div>

        {/* two-column: milestones + activity */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 24 }}>
          <div>
            <SectionHead title="22-month milestone timeline" style={{ paddingLeft: 0, paddingTop: 0 }}/>
            <MilestoneTimeline milestones={s.milestones}/>
          </div>
          <div>
            <SectionHead title="Recent activity" style={{ paddingLeft: 0, paddingTop: 0 }}/>
            <Card padding={0}>
              {s.activity.map((a, i) => (
                <div key={i} style={{
                  padding: '12px 14px',
                  borderBottom: i < s.activity.length - 1 ? '1px solid var(--hair-2)' : 'none',
                  display: 'flex', alignItems: 'flex-start', gap: 10,
                }}>
                  <span className="mono upper" style={{
                    fontSize: 10, fontWeight: 600, color: 'var(--ink-mute)',
                    width: 32, flexShrink: 0, paddingTop: 2,
                  }}>{a.when}</span>
                  <span style={{ fontSize: 12.5, color: 'var(--ink)' }}>{a.what}</span>
                </div>
              ))}
              <div style={{ padding: '12px 14px', borderTop: '1px solid var(--hair-2)', fontSize: 11.5, color: 'var(--ink-mute)', fontStyle: 'italic' }}>
                Brain dump and journal content are private to Ira. You see signals, not surveillance.
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function ParentNav() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '20px 40px', borderBottom: '1px solid var(--hair)',
      background: 'color-mix(in oklab, var(--paper) 70%, transparent)', backdropFilter: 'blur(8px)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
        <div className="serif" style={{ fontSize: 22, letterSpacing: -0.5 }}>ira <span style={{ color: 'var(--accent)' }}>·</span></div>
        <nav style={{ display: 'flex', gap: 20, fontSize: 13, color: 'var(--ink-mute)' }}>
          <span style={{ color: 'var(--ink)', fontWeight: 500, borderBottom: '2px solid var(--accent)', paddingBottom: 4 }}>Overview</span>
          <span>Tracks</span>
          <span>Readiness</span>
          <span>Milestones</span>
          <span>Digest</span>
        </nav>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Icons.search size={18} c="var(--ink-mute)"/>
        <Icons.bell size={18} c="var(--ink-mute)"/>
        <div style={{
          width: 32, height: 32, borderRadius: 99, background: 'var(--ink)', color: 'var(--paper)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--f-serif)', fontSize: 14,
        }}>N</div>
      </div>
    </div>
  );
}

function HeroMetric({ label, value, sub, tone }) {
  return (
    <Card padding={18} style={tone === 'accent' ? { background: 'var(--ink)', borderColor: 'transparent', color: 'var(--paper)' } : null}>
      <div className="upper" style={{ fontSize: 10.5, fontWeight: 600, color: tone === 'accent' ? 'color-mix(in oklab, var(--paper) 55%, transparent)' : 'var(--ink-mute)' }}>{label}</div>
      <div className="serif" style={{ fontSize: 38, lineHeight: 1, margin: '8px 0 4px', color: tone === 'accent' ? 'var(--paper)' : 'var(--ink)' }}>{value}</div>
      <div style={{ fontSize: 11.5, color: tone === 'accent' ? 'color-mix(in oklab, var(--paper) 55%, transparent)' : 'var(--ink-mute)' }}>{sub}</div>
    </Card>
  );
}

function ParentTrackCard({ t }) {
  const meta = TRACKS[t.key];
  const Icon = Icons[meta.icon];
  const trend = t.trend || [];
  return (
    <Card padding={16} style={{ position: 'relative' }}>
      <div style={{
        position: 'absolute', top: 14, right: 14,
        display: 'flex', alignItems: 'center', gap: 5,
      }}>
        <HealthDot status={t.status}/>
        <span className="upper" style={{ fontSize: 9.5, fontWeight: 600,
          color: t.status === 'green' ? 'var(--green)' : t.status === 'amber' ? 'var(--amber)' : 'var(--red)' }}>
          {t.status}
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        <div style={{
          width: 28, height: 28, borderRadius: 7,
          background: meta.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon size={14} c="#fff" sw={1.8}/>
        </div>
        <span style={{ fontSize: 13, fontWeight: 500 }}>{meta.name}</span>
      </div>

      {t.syllabus !== null && t.syllabus > 0 ? (
        <>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 4 }}>
            <span className="mono" style={{ fontSize: 22, fontWeight: 600 }}>{t.syllabus}<span style={{ fontSize: 13, color: 'var(--ink-mute)' }}>%</span></span>
            {trend.length > 0 && <Sparkline data={trend} color={meta.color} w={64} h={20} fill/>}
          </div>
          <div style={{ fontSize: 10.5, color: 'var(--ink-mute)', marginBottom: 8 }}>{t.pace}</div>
          <ProgressBar value={t.syllabus} color={meta.color} height={3}/>
        </>
      ) : t.syllabus === null && t.streak > 0 ? (
        <>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <span className="mono" style={{ fontSize: 22, fontWeight: 600 }}>{t.streak}<span style={{ fontSize: 11, color: 'var(--ink-mute)', marginLeft: 4 }}>days</span></span>
            {trend.length > 0 && <Sparkline data={trend} color={meta.color} w={64} h={20} fill/>}
          </div>
          <div style={{ fontSize: 10.5, color: 'var(--ink-mute)', marginTop: 4 }}>{t.lastConcept}</div>
        </>
      ) : (
        <>
          <div style={{ fontSize: 12, color: 'var(--ink-mute)', fontStyle: 'italic', marginTop: 4 }}>{t.pace}</div>
          <div style={{ fontSize: 10.5, color: 'var(--ink-faint)', marginTop: 6 }}>{t.lastConcept}</div>
        </>
      )}

      {t.flag && (
        <div style={{
          marginTop: 12, padding: '8px 10px',
          background: 'var(--amber-soft)', borderRadius: 8,
          fontSize: 11, color: '#6B4A14', display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <Icons.flag size={11} c="#6B4A14" sw={2}/>
          {t.flag}
        </div>
      )}
    </Card>
  );
}

function MilestoneTimeline({ milestones }) {
  // 22-month timeline starting May 2026
  const now = 0; // "now" position
  return (
    <Card padding={20}>
      {/* track */}
      <div style={{ position: 'relative', padding: '12px 4px 28px' }}>
        <div style={{
          position: 'absolute', left: 0, right: 0, top: 28,
          height: 2, background: 'var(--hair-2)',
        }}/>
        <div style={{
          position: 'absolute', left: 0, top: 28,
          width: '4%', height: 2, background: 'var(--ink)',
        }}/>
        <div style={{
          position: 'absolute', left: '4%', top: 22, width: 14, height: 14, marginLeft: -7,
          borderRadius: 99, background: 'var(--accent)', border: '3px solid var(--paper)',
          boxShadow: '0 0 0 1px var(--accent)',
        }}/>
        <div style={{
          position: 'absolute', left: '4%', top: 0, transform: 'translateX(-50%)',
          fontSize: 10, color: 'var(--accent)', fontWeight: 600,
        }} className="upper mono">Now</div>

        {/* milestones */}
        <div style={{ position: 'relative', height: 80, marginTop: 4 }}>
          {milestones.map((m, i) => {
            // distribute evenly between 8% and 95%
            const pos = 8 + (i / (milestones.length - 1)) * 87;
            const above = i % 2 === 0;
            return (
              <div key={i} style={{
                position: 'absolute', left: `${pos}%`, top: above ? 0 : 30,
                transform: 'translateX(-50%)',
              }}>
                {above ? (
                  <>
                    <div style={{ fontSize: 10.5, color: 'var(--ink)', textAlign: 'center', whiteSpace: 'nowrap', fontWeight: 500 }}>{m.label}</div>
                    <div className="mono" style={{ fontSize: 9.5, color: 'var(--ink-mute)', textAlign: 'center', marginTop: 2 }}>{m.date}</div>
                    <div style={{ width: 1, height: 8, background: 'var(--hair)', margin: '4px auto 0' }}/>
                  </>
                ) : (
                  <>
                    <div style={{ width: 1, height: 8, background: 'var(--hair)', margin: '0 auto 4px' }}/>
                    <div className="mono" style={{ fontSize: 9.5, color: 'var(--ink-mute)', textAlign: 'center' }}>{m.date}</div>
                    <div style={{ fontSize: 10.5, color: 'var(--ink)', textAlign: 'center', whiteSpace: 'nowrap', fontWeight: 500, marginTop: 2 }}>{m.label}</div>
                  </>
                )}
                <div style={{
                  position: 'absolute', left: '50%', top: above ? 'calc(100% - 4px)' : -4,
                  marginLeft: -3, width: 6, height: 6, borderRadius: 99,
                  background: 'var(--card)', border: '1.5px solid var(--ink-faint)',
                }}/>
              </div>
            );
          })}
        </div>
      </div>

      {/* next-3 callout */}
      <div style={{
        display: 'flex', gap: 12, marginTop: 18,
        paddingTop: 18, borderTop: '1px solid var(--hair-2)',
      }}>
        {milestones.slice(0, 3).map((m, i) => (
          <div key={i} style={{ flex: 1 }}>
            <div className="upper mono" style={{ fontSize: 9.5, fontWeight: 600, color: 'var(--ink-mute)' }}>{m.date}</div>
            <div style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--ink)', marginTop: 2 }}>{m.label}</div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 6 }}>
              <HealthDot status="green" size={6}/>
              <span style={{ fontSize: 10.5, color: 'var(--green)', fontWeight: 600 }}>On track</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ─────────────────────────────────────────────────────────────
// Readiness view — secondary tab content (shown in another window)
// ─────────────────────────────────────────────────────────────
function ParentReadiness({ state }) {
  const s = state;
  // exam-readiness mock data
  const subjects = [
    { key: 'phy',  green: 31, amber: 18, red: 11, total: 60, target: 75 },
    { key: 'chem', green: 24, amber: 22, red: 14, total: 60, target: 75 },
    { key: 'bio',  green: 38, amber: 16, red: 6,  total: 60, target: 80 },
    { key: 'psy',  green: 22, amber: 10, red: 4,  total: 36, target: 70 },
  ];
  return (
    <div style={{ background: 'var(--paper)', minHeight: '100%' }}>
      <ParentNav/>
      <div style={{ padding: '32px 40px 40px', maxWidth: 1180, margin: '0 auto', boxSizing: 'border-box' }}>
        <div className="upper" style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink-mute)' }}>Projected · 10 months to boards</div>
        <h1 className="serif" style={{ fontSize: 44, lineHeight: 1.05, margin: '6px 0 22px', fontWeight: 400 }}>
          Exam readiness.<br/>
          <span style={{ color: 'var(--ink-mute)' }}>Bio leads. Chem needs work.</span>
        </h1>

        {/* per-subject readiness */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {subjects.map(sub => {
            const m = TRACKS[sub.key];
            const Icon = Icons[m.icon];
            const pct = Math.round(sub.green / sub.total * 100);
            const onTarget = pct >= sub.target * 0.6;
            return (
              <Card key={sub.key} padding={22}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 30, height: 30, borderRadius: 8, background: m.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={15} c="#fff" sw={1.8}/>
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 500 }}>{m.name}</span>
                  <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--ink-mute)' }}>Target {sub.target}%</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                  <span className="serif" style={{ fontSize: 48, lineHeight: 1 }}>{pct}</span>
                  <span style={{ fontSize: 18, color: 'var(--ink-mute)' }}>% strong</span>
                </div>
                <div style={{ fontSize: 11.5, color: onTarget ? 'var(--green)' : 'var(--amber)', marginTop: 4, fontWeight: 500 }}>
                  {onTarget ? `On pace for ${sub.target}% by Dec '27` : `Trailing target — needs ${sub.target - pct}% lift`}
                </div>
                <div style={{ marginTop: 14 }}>
                  <StackedBar height={6} segments={[
                    { value: sub.green, color: 'var(--green)' },
                    { value: sub.amber, color: 'var(--amber)' },
                    { value: sub.red,   color: 'var(--red)' },
                  ]}/>
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

        {/* recall trend */}
        <SectionHead title="Recall quality — 12 week rolling avg" style={{ paddingLeft: 0, paddingTop: 28 }}/>
        <Card padding={24}>
          <div style={{ display: 'flex', gap: 24, alignItems: 'flex-end', height: 120, paddingBottom: 8, borderBottom: '1px solid var(--hair-2)' }}>
            {s.tracks.filter(t => t.trend && t.trend.length).map(t => {
              const m = TRACKS[t.key];
              return (
                <div key={t.key} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                  <Sparkline data={t.trend} color={m.color} w={140} h={70} fill/>
                  <div style={{ fontSize: 11, color: 'var(--ink-mute)' }}>{m.name}</div>
                  <span className="mono" style={{ fontSize: 13, fontWeight: 600 }}>{(t.trend.reduce((a,b)=>a+b,0) / t.trend.length).toFixed(1)}/5</span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}

Object.assign(window, { ParentDashboard, ParentReadiness, ParentNav });

// ira-screens-a.jsx — Today, Tracks, ConceptMap
// Each screen is a function component that takes ({ nav, state })

// ─────────────────────────────────────────────────────────────
// TODAY — daily dashboard. The heart of the app.
// ─────────────────────────────────────────────────────────────
function ScreenToday({ nav, state }) {
  const s = state;
  const xpPct = (s.user.xp / s.user.xpToNext) * 100;
  return (
    <div style={{ paddingBottom: 100 }}>
      {/* status spacer */}
      <div style={{ height: 54 }}/>

      {/* header */}
      <div style={{ padding: '12px 22px 8px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <div className="upper" style={{ fontSize: 10.5, color: 'var(--ink-faint)', fontWeight: 600 }}>
            {s.today.day} · {s.today.date}
          </div>
          <div className="serif" style={{ fontSize: 30, lineHeight: 1.05, marginTop: 4, color: 'var(--ink)' }}>
            Good morning,<br/>Ira.
          </div>
        </div>
        <button onClick={() => nav('me')} style={{
          background: 'var(--card)', border: '1px solid var(--hair)', borderRadius: 99,
          width: 40, height: 40, cursor: 'pointer', padding: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--f-serif)', fontSize: 17, color: 'var(--ink)',
        }}>I</button>
      </div>

      {/* the moment — what matters most today */}
      <div style={{ padding: '14px 18px 8px' }}>
        <div style={{
          background: 'var(--ink)', color: 'var(--paper)',
          borderRadius: 'var(--r-xl)', padding: '22px 22px 20px',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* subtle vermillion glow corner */}
          <div style={{
            position: 'absolute', top: -40, right: -40, width: 140, height: 140,
            background: 'radial-gradient(circle, rgba(197,83,42,0.4), transparent 70%)',
            borderRadius: '50%',
          }}/>
          <div style={{ position: 'relative' }}>
            <div className="upper" style={{ fontSize: 10, color: 'color-mix(in oklab, var(--paper) 55%, transparent)', fontWeight: 600, marginBottom: 8 }}>
              Today's focus
            </div>
            <div className="serif" style={{ fontSize: 22, lineHeight: 1.2, color: 'var(--paper)' }}>
              Physics class at Aakash, 4:30 pm.<br/>
              <span style={{ color: 'color-mix(in oklab, var(--paper) 55%, transparent)' }}>Brain dump waiting after.</span>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 16, alignItems: 'center' }}>
              <Btn variant="accent" size="sm" onClick={() => nav('recall')}>Start a recall</Btn>
              <span style={{ fontSize: 12, color: 'color-mix(in oklab, var(--paper) 55%, transparent)' }}>or do it after class</span>
            </div>
          </div>
        </div>
      </div>

      {/* streak ribbon */}
      <div style={{
        display: 'flex', gap: 8, padding: '12px 18px 4px', alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px 8px 10px', background: 'var(--card)', borderRadius: 99, border: '1px solid var(--hair)' }}>
          <Icons.flame size={14} c="var(--accent)" sw={2}/>
          <span className="mono" style={{ fontSize: 13, fontWeight: 600 }}>{s.streaks.gk}</span>
          <span style={{ fontSize: 11, color: 'var(--ink-mute)' }}>GK</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px 8px 10px', background: 'var(--card)', borderRadius: 99, border: '1px solid var(--hair)' }}>
          <Icons.brain size={14} c="var(--ink)" sw={1.8}/>
          <span className="mono" style={{ fontSize: 13, fontWeight: 600 }}>{s.streaks.recall}</span>
          <span style={{ fontSize: 11, color: 'var(--ink-mute)' }}>recall days</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px 8px 10px', background: 'var(--card)', borderRadius: 99, border: '1px solid var(--hair)', marginLeft: 'auto' }}>
          <Icons.badge size={14} c="var(--ink)" sw={1.8}/>
          <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--ink)' }}>L{s.user.level} · {s.user.levelName}</span>
        </div>
      </div>

      {/* today's tasks */}
      <SectionHead title="Today · 5 tasks" action={
        <span style={{ fontSize: 11, color: 'var(--ink-mute)' }}>~29 min</span>
      } style={{ paddingTop: 18 }}/>

      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {s.tasks.map(t => <TaskRow key={t.id} task={t} nav={nav}/>)}
      </div>

      {/* weekly synthesis nudge */}
      <SectionHead title="This week" style={{ paddingTop: 22 }}/>
      <div style={{ padding: '0 18px' }}>
        <Card padding={16} style={{ background: 'var(--paper-2)', borderColor: 'transparent' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--accent-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icons.layers size={16} c="var(--accent-ink)"/>
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

      {/* drift watch (parent-style nudge, shown softly) */}
      <SectionHead title="Drift watch" style={{ paddingTop: 22 }}/>
      <div style={{ padding: '0 18px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Card padding={14}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <HealthDot status="amber" size={10}/>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13.5, fontWeight: 500 }}>Volunteering — 3 weeks since last session</div>
              <div style={{ fontSize: 11.5, color: 'var(--ink-mute)', marginTop: 2 }}>Even 2 hours this weekend helps the Ashoka profile.</div>
            </div>
            <Icons.arrow size={16} c="var(--ink-faint)"/>
          </div>
        </Card>
        <Card padding={14}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <HealthDot status="amber" size={10}/>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13.5, fontWeight: 500 }}>Organic Chem recall dipping</div>
              <div style={{ fontSize: 11.5, color: 'var(--ink-mute)', marginTop: 2 }}>Carbonyl reactions: 2.7/5 avg over 2 weeks. Revisit Ch 12?</div>
            </div>
            <Icons.arrow size={16} c="var(--ink-faint)"/>
          </div>
        </Card>
      </div>
    </div>
  );
}

function TaskRow({ task, nav }) {
  const t = TRACKS[task.track];
  const Icon = Icons[t.icon] || Icons.spark;
  const handler = task.kind === 'gk' ? () => nav('gk')
                : task.kind === 'recall' ? () => nav('recall')
                : task.kind === 'review' ? () => nav('review')
                : task.kind === 'journal' ? () => nav('journal')
                : null;
  return (
    <div onClick={handler} style={{
      background: 'var(--card)', borderRadius: 'var(--r-md)',
      padding: '12px 14px', border: '1px solid var(--hair)',
      display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
    }}>
      <div style={{
        width: 38, height: 38, borderRadius: 10,
        background: `color-mix(in oklab, ${t.color} 14%, var(--paper))`,
        color: t.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        <Icon size={18} c={t.color} sw={1.8}/>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
          <span style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--ink)' }}>{task.title}</span>
        </div>
        <div style={{ fontSize: 11.5, color: 'var(--ink-mute)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {task.sub}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 3, flexShrink: 0 }}>
        <span className="mono" style={{ fontSize: 11, color: 'var(--ink)', fontWeight: 600 }}>+{task.xp}</span>
        <span style={{ fontSize: 10, color: 'var(--ink-faint)' }}>{task.minutes}m</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// TRACKS — all 7+ tracks overview
// ─────────────────────────────────────────────────────────────
function ScreenTracks({ nav, state }) {
  const s = state;
  return (
    <div style={{ paddingBottom: 100 }}>
      <div style={{ height: 54 }}/>
      <AppBar subtitle="22-month horizon · 7 tracks" title="Your tracks"
        trailing={<button style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 6 }}><Icons.filter size={20}/></button>}
      />

      {/* horizon strip */}
      <div style={{ padding: '4px 18px 14px' }}>
        <Card padding={14} style={{ background: 'var(--paper-2)', borderColor: 'transparent' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <span className="upper" style={{ fontSize: 10, fontWeight: 600, color: 'var(--ink-mute)' }}>Horizon</span>
            <span style={{ fontSize: 11, color: 'var(--ink-mute)' }}>May 26 → Mar 2028</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 0, height: 6, borderRadius: 99, overflow: 'hidden', background: 'var(--hair-2)' }}>
            <div style={{ width: '4%', height: '100%', background: 'var(--ink)' }}/>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
            <span className="mono" style={{ fontSize: 11, color: 'var(--ink-mute)' }}>Month 1</span>
            <span className="mono" style={{ fontSize: 11, color: 'var(--ink-mute)' }}>22 months to boards</span>
          </div>
        </Card>
      </div>

      <SectionHead title="Active · core academics"/>
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {['phy','chem','bio','psy'].map(k => <TrackRow key={k} t={s.tracks.find(x=>x.key===k)} nav={nav}/>)}
      </div>

      <SectionHead title="Languages & supplementary" style={{ paddingTop: 22 }}/>
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {['ger','math'].map(k => <TrackRow key={k} t={s.tracks.find(x=>x.key===k)} nav={nav}/>)}
      </div>

      <SectionHead title="Daily habits & profile" style={{ paddingTop: 22 }}/>
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {['gk','vol'].map(k => <TrackRow key={k} t={s.tracks.find(x=>x.key===k)} nav={nav}/>)}
      </div>
    </div>
  );
}

function TrackRow({ t, nav }) {
  if (!t) return null;
  const meta = TRACKS[t.key];
  const Icon = Icons[meta.icon];
  const dim = t.syllabus === 0 && t.pace.includes('starts');
  return (
    <div onClick={() => t.key === 'bio' ? nav('concept') : null} style={{
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
          <Icon size={20} c={meta.color} sw={1.8}/>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
            <span style={{ fontSize: 15, fontWeight: 500 }}>{meta.name}</span>
            <HealthDot status={t.status}/>
          </div>
          <div style={{ fontSize: 11.5, color: 'var(--ink-mute)', marginTop: 2 }}>{t.lastConcept}</div>
          {t.syllabus !== null && t.syllabus > 0 && (
            <div style={{ marginTop: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                <span className="mono" style={{ fontSize: 11, color: 'var(--ink)', fontWeight: 600 }}>{t.syllabus}%</span>
                <span style={{ fontSize: 11, color: 'var(--ink-mute)' }}>{t.pace}</span>
              </div>
              <ProgressBar value={t.syllabus} color={meta.color}/>
            </div>
          )}
          {t.syllabus === null && t.streak > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}>
              <Icons.flame size={13} c="var(--accent)" sw={1.8}/>
              <span className="mono" style={{ fontSize: 12, fontWeight: 600 }}>{t.streak}</span>
              <span style={{ fontSize: 11, color: 'var(--ink-mute)' }}>day streak</span>
            </div>
          )}
          {dim && (
            <div style={{ fontSize: 11.5, color: 'var(--ink-mute)', marginTop: 8, fontStyle: 'italic' }}>{t.pace}</div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CONCEPT MAP — drill into a track's mastery
// ─────────────────────────────────────────────────────────────
function ScreenConcept({ nav, state }) {
  const cm = state.conceptMap;
  const meta = TRACKS[cm.track];
  const totals = cm.modules.reduce((a, m) => ({
    g: a.g + m.green, a: a.a + m.amber, r: a.r + m.red, t: a.t + m.total,
  }), { g: 0, a: 0, r: 0, t: 0 });
  return (
    <div style={{ paddingBottom: 100 }}>
      <div style={{ height: 54 }}/>
      <AppBar subtitle={meta.name + ' · Class 11'} title="Concept mastery" onBack={() => nav('tracks')}/>

      {/* summary card */}
      <div style={{ padding: '4px 18px 14px' }}>
        <div style={{
          background: 'var(--ink)', color: 'var(--paper)',
          borderRadius: 'var(--r-xl)', padding: 22, position: 'relative',
        }}>
          <div className="upper" style={{ fontSize: 10, color: 'color-mix(in oklab, var(--paper) 55%, transparent)', fontWeight: 600 }}>Exam readiness</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 6 }}>
            <span className="serif" style={{ fontSize: 56, lineHeight: 1, color: 'var(--paper)' }}>{Math.round(totals.g / totals.t * 100)}</span>
            <span style={{ fontSize: 18, color: 'color-mix(in oklab, var(--paper) 55%, transparent)' }}>% strong</span>
          </div>
          <div style={{ fontSize: 12.5, color: 'color-mix(in oklab, var(--paper) 65%, transparent)', marginTop: 6, lineHeight: 1.45 }}>
            Target by Dec 2027 — 70% green.<br/>
            You're tracking <span style={{ color: 'var(--green-soft)' }}>+8% above pace</span>.
          </div>
          <div style={{ marginTop: 16 }}>
            <StackedBar height={6} segments={[
              { value: totals.g, color: 'var(--green)' },
              { value: totals.a, color: 'var(--amber)' },
              { value: totals.r, color: 'var(--red)' },
            ]}/>
            <div style={{ display: 'flex', gap: 14, marginTop: 10, fontSize: 11, color: 'color-mix(in oklab, var(--paper) 70%, transparent)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 7, height: 7, borderRadius: 99, background: 'var(--green)' }}/> Strong · {totals.g}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 7, height: 7, borderRadius: 99, background: 'var(--amber)' }}/> Fading · {totals.a}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 7, height: 7, borderRadius: 99, background: 'var(--red)' }}/> Weak · {totals.r}
              </span>
            </div>
          </div>
        </div>
      </div>

      <SectionHead title="By module"/>
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
              ]}/>
            </div>
            {/* concept dots — visual proxy */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 12 }}>
              {Array.from({ length: m.green }).map((_, j) => <ConceptDot key={'g'+j} c="var(--green)"/>)}
              {Array.from({ length: m.amber }).map((_, j) => <ConceptDot key={'a'+j} c="var(--amber)"/>)}
              {Array.from({ length: m.red }).map((_, j) => <ConceptDot key={'r'+j} c="var(--red)"/>)}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ConceptDot({ c }) {
  return <span style={{ width: 10, height: 10, borderRadius: 3, background: c, opacity: 0.9 }}/>;
}

Object.assign(window, { ScreenToday, ScreenTracks, ScreenConcept, TaskRow, TrackRow, ConceptDot });

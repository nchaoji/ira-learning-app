// ira-screens-c.jsx — GK Quiz, Spaced Review, Journal, Profile

// ─────────────────────────────────────────────────────────────
// GK QUIZ — daily 5-question habit
// ─────────────────────────────────────────────────────────────
function ScreenGK({ nav, state }) {
  const q = state.gk;
  const [picked, setPicked] = React.useState(null);
  const reveal = picked !== null;
  const correct = reveal && picked === q.correct;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ height: 54 }}/>
      <AppBar subtitle="DAILY GK · Q3 / 5" title="Keep the streak."
        onBack={() => nav('today')}
        trailing={
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 10px', background: 'var(--accent-soft)', borderRadius: 99 }}>
            <Icons.flame size={13} c="var(--accent)" sw={2}/>
            <span className="mono" style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent-ink)' }}>48</span>
          </div>
        }
      />

      <div style={{ padding: '0 18px', flex: 1 }}>
        {/* progress dots */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 24 }}>
          {[0,1,2,3,4].map(i => (
            <div key={i} style={{
              flex: 1, height: 3, borderRadius: 99,
              background: i < 2 ? 'var(--green)' : i === 2 ? 'var(--ink)' : 'var(--hair-2)',
            }}/>
          ))}
        </div>

        <Chip color="var(--ink-mute)" tone="ghost">{q.category}</Chip>
        <div className="serif" style={{ fontSize: 22, lineHeight: 1.3, marginTop: 14, color: 'var(--ink)' }}>
          {q.q}
        </div>

        <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {q.options.map((opt, i) => {
            const isCorrect = i === q.correct;
            const isPicked = picked === i;
            let bg = 'var(--card)', col = 'var(--ink)', border = '1px solid var(--hair)';
            if (reveal && isCorrect) { bg = 'var(--green-soft)'; col = '#3F5A30'; border = '1px solid var(--green)'; }
            else if (reveal && isPicked && !isCorrect) { bg = 'var(--red-soft)'; col = '#7A2820'; border = '1px solid var(--red)'; }
            else if (reveal) { col = 'var(--ink-faint)'; }
            return (
              <button key={i} disabled={reveal} onClick={() => setPicked(i)} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '14px 16px', background: bg, border, borderRadius: 'var(--r-md)',
                fontFamily: 'var(--f-sans)', fontSize: 15, color: col,
                textAlign: 'left', cursor: reveal ? 'default' : 'pointer',
                transition: 'all 0.2s',
              }}>
                <span style={{
                  width: 26, height: 26, borderRadius: 99, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: reveal && isCorrect ? 'var(--green)' : reveal && isPicked ? 'var(--red)' : 'var(--paper-2)',
                  color: reveal && (isCorrect || isPicked) ? '#fff' : 'var(--ink-mute)',
                  fontFamily: 'var(--f-mono)', fontSize: 11, fontWeight: 600,
                }}>{reveal && isCorrect ? <Icons.check size={14}/> : String.fromCharCode(65 + i)}</span>
                {opt}
              </button>
            );
          })}
        </div>

        {reveal && (
          <Card padding={14} style={{ marginTop: 18, background: correct ? 'var(--green-soft)' : 'var(--paper-2)', borderColor: 'transparent' }}>
            <div className="upper" style={{ fontSize: 10, fontWeight: 600, color: correct ? '#3F5A30' : 'var(--ink-mute)' }}>
              {correct ? 'Correct' : 'The answer is Mizoram'}
            </div>
            <div style={{ fontSize: 12.5, color: 'var(--ink)', marginTop: 6, lineHeight: 1.45 }}>
              Mizoram recorded ~25% decadal growth — the highest in the latest update. Tag: CUET GK, Economic Survey 2024.
            </div>
          </Card>
        )}
      </div>

      <div style={{ padding: '16px 18px 36px' }}>
        {!reveal ? (
          <Btn variant="primary" onClick={() => setPicked(2)} style={{ width: '100%' }}>Submit</Btn>
        ) : (
          <Btn variant="primary" icon={<Icons.arrow size={16} c="var(--paper)"/>} onClick={() => nav('today')} style={{ width: '100%', flexDirection: 'row-reverse' }}>
            Next question
          </Btn>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SPACED REVIEW — surface a 4-day-old concept
// ─────────────────────────────────────────────────────────────
function ScreenReview({ nav, state }) {
  const [stage, setStage] = React.useState('write');  // write -> compare -> rate
  const [text, setText] = React.useState('');
  const [rating, setRating] = React.useState(null);
  const original = `Newton's third law: every action has an equal and opposite reaction. Forces always come in pairs — they act on different bodies. If body A pushes B with force F, B pushes A with -F. This is why rockets work: the engine pushes gas down, gas pushes the rocket up. Walking too — your foot pushes the ground back, the ground pushes you forward.`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ height: 54 }}/>
      <AppBar subtitle="SPACED REVIEW · DAY 4" title="What do you still know?"
        onBack={() => nav('today')}
        trailing={<Chip color="var(--tk-phy)" tone="outline">Physics</Chip>}
      />

      <div style={{ padding: '0 18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Card padding={14} style={{ marginBottom: 14 }}>
          <div className="upper" style={{ fontSize: 10, fontWeight: 600, color: 'var(--ink-mute)' }}>4 days ago · Aakash class</div>
          <div className="serif" style={{ fontSize: 18, lineHeight: 1.3, marginTop: 6, color: 'var(--ink)' }}>
            Explain Newton's third law in your own words.
          </div>
        </Card>

        {stage === 'write' && (
          <>
            <div style={{ fontSize: 12.5, color: 'var(--ink-mute)', marginBottom: 8 }}>
              Don't peek. Write whatever surfaces — even fragments help.
            </div>
            <textarea autoFocus value={text} onChange={e => setText(e.target.value)} placeholder="Start typing…" className="no-scroll" style={{
              flex: 1, minHeight: 200, boxSizing: 'border-box',
              padding: 16,
              background: 'var(--card)', border: '1px solid var(--hair)',
              borderRadius: 'var(--r-md)', resize: 'none',
              fontFamily: 'var(--f-serif)', fontSize: 17, lineHeight: 1.55,
              color: 'var(--ink)', outline: 'none',
            }}/>
          </>
        )}

        {stage === 'compare' && (
          <div style={{ flex: 1, overflow: 'auto' }} className="no-scroll">
            <div className="upper" style={{ fontSize: 10, fontWeight: 600, color: 'var(--ink-mute)', marginBottom: 8 }}>Your recall (just now)</div>
            <Card padding={14} style={{ marginBottom: 14 }}>
              <div className="serif" style={{ fontSize: 15.5, lineHeight: 1.5, color: 'var(--ink)' }}>
                {text || <span style={{ color: 'var(--ink-faint)' }}>— blank —</span>}
              </div>
            </Card>
            <div className="upper" style={{ fontSize: 10, fontWeight: 600, color: 'var(--ink-mute)', marginBottom: 8 }}>Your original brain dump · 22 May</div>
            <Card padding={14} style={{ background: 'var(--paper-2)', borderColor: 'transparent' }}>
              <div className="serif" style={{ fontSize: 15.5, lineHeight: 1.55, color: 'var(--ink-2)' }}>
                {original}
              </div>
            </Card>

            <div style={{ marginTop: 18 }}>
              <div className="upper" style={{ fontSize: 10, fontWeight: 600, color: 'var(--ink-mute)' }}>Rate yourself · honesty matters</div>
              <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                {[1,2,3,4,5].map(v => (
                  <button key={v} onClick={() => setRating(v)} style={{
                    flex: 1, height: 44, borderRadius: 10,
                    background: rating === v ? 'var(--ink)' : 'var(--card)',
                    color: rating === v ? 'var(--paper)' : 'var(--ink)',
                    border: `1px solid ${rating === v ? 'var(--ink)' : 'var(--hair)'}`,
                    fontFamily: 'var(--f-mono)', fontWeight: 600, fontSize: 15,
                    cursor: 'pointer',
                  }}>{v}</button>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                <span style={{ fontSize: 10.5, color: 'var(--ink-faint)' }}>Forgot</span>
                <span style={{ fontSize: 10.5, color: 'var(--ink-faint)' }}>Perfect</span>
              </div>
              {rating && rating >= 4 && (
                <div style={{
                  marginTop: 14, padding: '10px 12px',
                  background: 'var(--green-soft)', borderRadius: 'var(--r-md)',
                  fontSize: 12.5, color: '#3F5A30', display: 'flex', gap: 8, alignItems: 'center',
                }}>
                  <Icons.check size={14} c="var(--green)" sw={2}/>
                  Concept moved to <strong style={{ fontWeight: 600 }}>strong</strong>. Next surface: Day 7.
                </div>
              )}
              {rating && rating < 4 && (
                <div style={{
                  marginTop: 14, padding: '10px 12px',
                  background: 'var(--amber-soft)', borderRadius: 'var(--r-md)',
                  fontSize: 12.5, color: '#6B4A14', display: 'flex', gap: 8, alignItems: 'center',
                }}>
                  <Icons.refresh size={14} c="var(--amber)" sw={2}/>
                  Interval reset. We'll surface this tomorrow.
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div style={{ padding: '16px 18px 36px', display: 'flex', gap: 10 }}>
        {stage === 'write' && (
          <>
            <Btn variant="ghost" onClick={() => setStage('compare')} style={{ flex: 1 }}>I'm blank</Btn>
            <Btn variant="primary" onClick={() => setStage('compare')} style={{ flex: 1.6 }}>Compare</Btn>
          </>
        )}
        {stage === 'compare' && (
          <Btn variant="accent" disabled={!rating} onClick={() => nav('today')} style={{ width: '100%' }}>
            Save & continue
          </Btn>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// JOURNAL
// ─────────────────────────────────────────────────────────────
function ScreenJournal({ nav, state }) {
  const entries = [
    { d: 'Yest', tag: 'bookreflection', title: 'Ch 6 — System 1 / System 2', body: 'Kahneman says we think we\'re reasoning when we\'re just rationalising. Most of my "decisions" today were just System 1 grabbing whatever was closest…', words: 312 },
    { d: '21 May', tag: 'currentaffairs', title: 'The Mizoram demographic story', body: 'I keep coming back to why that one state. Migration, late demographic transition, and the church-led education push — three threads I want to pull on…', words: 198 },
    { d: '19 May', tag: 'volunteering', title: 'Saturday at the anganwadi', body: 'The kid with the chalk was reading "ब-त-ख" before me. I think she\'s 4. The "system" of these classrooms is mostly older girls running them…', words: 256 },
    { d: '17 May', tag: 'personal', title: 'On waiting for Aakash results', body: 'I refresh the app like 12 times an hour. Why does waiting feel worse than the test itself? Loss aversion, probably.', words: 124 },
    { d: '14 May', tag: 'bookreflection', title: 'Ch 4 — Heuristics', body: 'Anchoring is everywhere. Even the way I read my own marks — I anchor on the highest score I\'ve ever gotten…', words: 287 },
  ];
  return (
    <div style={{ paddingBottom: 100 }}>
      <div style={{ height: 54 }}/>
      <AppBar subtitle="6-WEEK STREAK · PRIVATE" title="Journal"
        trailing={<button style={{ width: 36, height: 36, borderRadius: 99, background: 'var(--ink)', color: 'var(--paper)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icons.plus size={18} c="var(--paper)"/></button>}
      />

      {/* "essay seedbed" callout */}
      <div style={{ padding: '4px 18px 14px' }}>
        <Card padding={14} style={{ background: 'var(--paper-2)', borderColor: 'transparent' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Icons.bolt size={16} c="var(--accent)" sw={2}/>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 500 }}>4 entries this month — Ashoka essay seedbed</div>
              <div style={{ fontSize: 11.5, color: 'var(--ink-mute)', marginTop: 2 }}>Your tagged reflections become raw material in 18 months.</div>
            </div>
          </div>
        </Card>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 18px 14px', overflow: 'auto' }} className="no-scroll">
        {['All', '#bookreflection', '#psychology', '#currentaffairs', '#volunteering', '#personal'].map((tag, i) => (
          <Chip key={i} tone={i === 0 ? 'solid' : 'ghost'} color={i === 0 ? 'var(--ink)' : 'var(--ink-mute)'} style={{ flexShrink: 0, padding: '6px 12px' }}>{tag}</Chip>
        ))}
      </div>

      <div style={{ padding: '0 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {entries.map((e, i) => (
          <Card key={i} padding={16}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 4 }}>
              <span className="upper" style={{ fontSize: 10, fontWeight: 600, color: 'var(--accent)' }}>#{e.tag}</span>
              <span className="mono" style={{ fontSize: 10.5, color: 'var(--ink-faint)' }}>{e.d}</span>
            </div>
            <div className="serif" style={{ fontSize: 18, lineHeight: 1.3, color: 'var(--ink)' }}>{e.title}</div>
            <div style={{ fontSize: 13.5, color: 'var(--ink-mute)', marginTop: 8, lineHeight: 1.55 }}>{e.body}</div>
            <div className="mono" style={{ fontSize: 10.5, color: 'var(--ink-faint)', marginTop: 10 }}>{e.words} words</div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ME / Profile
// ─────────────────────────────────────────────────────────────
function ScreenMe({ nav, state }) {
  const s = state;
  const xpPct = (s.user.xp / s.user.xpToNext) * 100;
  return (
    <div style={{ paddingBottom: 100 }}>
      <div style={{ height: 54 }}/>

      <div style={{ padding: '14px 18px 8px', display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{
          width: 64, height: 64, borderRadius: 99, background: 'var(--ink)', color: 'var(--paper)',
          fontFamily: 'var(--f-serif)', fontSize: 30,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>I</div>
        <div style={{ flex: 1 }}>
          <div className="serif" style={{ fontSize: 26, lineHeight: 1.1 }}>Ira</div>
          <div style={{ fontSize: 12, color: 'var(--ink-mute)', marginTop: 2 }}>Class 11 · CBSE · PCB + Psych</div>
        </div>
      </div>

      {/* level + xp */}
      <div style={{ padding: '14px 18px' }}>
        <Card padding={18} style={{ background: 'var(--ink)', borderColor: 'transparent' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14 }}>
            <div>
              <div className="upper" style={{ fontSize: 10, fontWeight: 600, color: 'color-mix(in oklab, var(--paper) 55%, transparent)' }}>Level {s.user.level} · {s.user.levelName}</div>
              <div className="serif" style={{ fontSize: 28, color: 'var(--paper)', lineHeight: 1, marginTop: 4 }}>
                <span className="mono" style={{ fontFamily: 'var(--f-mono)', fontSize: 22 }}>{s.user.xp}</span>
                <span style={{ color: 'color-mix(in oklab, var(--paper) 40%, transparent)', fontSize: 16 }}> / {s.user.xpToNext} XP</span>
              </div>
            </div>
            <span style={{ fontSize: 11, color: 'color-mix(in oklab, var(--paper) 55%, transparent)' }}>{s.user.xpToNext - s.user.xp} to Pathfinder</span>
          </div>
          <ProgressBar value={xpPct} color="var(--accent)" track="color-mix(in oklab, var(--paper) 12%, transparent)" height={5}/>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontSize: 10.5, color: 'color-mix(in oklab, var(--paper) 45%, transparent)' }}>
            <span>Explorer</span><span>Scholar</span><span style={{ color: 'var(--paper)' }}>· Navigator</span><span>Pathfinder</span><span>Trailblazer</span>
          </div>
        </Card>
      </div>

      {/* streak grid */}
      <SectionHead title="Streaks"/>
      <div style={{ padding: '0 18px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <StreakCell n={s.streaks.master} label="master streak" icon="bolt" big/>
        <StreakCell n={s.streaks.gk} label="GK days" icon="flame" big accent/>
        <StreakCell n={s.streaks.recall} label="recall days" icon="brain"/>
        <StreakCell n={s.streaks.writing} label="writing weeks" icon="pen"/>
      </div>

      {/* badges */}
      <SectionHead title="Achievements" action={<span style={{ fontSize: 11, color: 'var(--ink-mute)' }}>3 of 8</span>} style={{ paddingTop: 22 }}/>
      <div style={{ padding: '0 18px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
        {s.badges.map(b => <BadgeTile key={b.id} b={b}/>)}
      </div>

      {/* settings */}
      <SectionHead title="Settings" style={{ paddingTop: 26 }}/>
      <div style={{ padding: '0 16px' }}>
        <Card padding={0}>
          {[
            { icon: 'bell',   label: 'Notifications',      sub: 'On · 5/day max · quiet 9pm – 7am' },
            { icon: 'calendar', label: 'Class schedule',   sub: 'Aakash · Goethe · School' },
            { icon: 'shield', label: 'Privacy & parent view', sub: 'Niranjan sees health, not content' },
            { icon: 'lock',   label: 'Streak freezes',     sub: '1 available · resets June 1', last: true },
          ].map((r, i) => {
            const Icon = Icons[r.icon];
            return (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '14px 16px',
                borderBottom: r.last ? 'none' : '1px solid var(--hair-2)',
              }}>
                <Icon size={18} c="var(--ink-mute)" sw={1.6}/>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 500 }}>{r.label}</div>
                  <div style={{ fontSize: 11, color: 'var(--ink-mute)', marginTop: 1 }}>{r.sub}</div>
                </div>
                <Icons.arrow size={14} c="var(--ink-faint)"/>
              </div>
            );
          })}
        </Card>
      </div>
    </div>
  );
}

function StreakCell({ n, label, icon, big, accent }) {
  const Icon = Icons[icon];
  const c = accent ? 'var(--accent)' : 'var(--ink)';
  return (
    <div style={{
      background: 'var(--card)', borderRadius: 'var(--r-md)',
      padding: 14, border: '1px solid var(--hair)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <Icon size={14} c={c} sw={1.8}/>
        <span style={{ fontSize: 11.5, color: 'var(--ink-mute)', textTransform: 'lowercase' }}>{label}</span>
      </div>
      <div className="mono" style={{ fontSize: big ? 32 : 24, fontWeight: 600, color: c, marginTop: 6, letterSpacing: -1 }}>
        {n}
      </div>
    </div>
  );
}

function BadgeTile({ b }) {
  return (
    <div style={{
      background: b.earned ? 'var(--card)' : 'var(--paper-2)',
      borderRadius: 'var(--r-md)',
      padding: 12, border: '1px solid var(--hair)',
      opacity: b.earned ? 1 : 0.55, textAlign: 'center',
      aspectRatio: '1', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: 10, margin: '0 auto',
        background: b.earned ? 'var(--accent-soft)' : 'var(--hair-2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icons.badge size={20} c={b.earned ? 'var(--accent)' : 'var(--ink-faint)'} sw={1.6}/>
      </div>
      <div style={{ fontSize: 10.5, lineHeight: 1.2, fontWeight: 500, color: 'var(--ink)' }}>{b.name}</div>
      <div style={{ fontSize: 9.5, color: 'var(--ink-faint)' }} className="mono">
        {b.earned ? b.date : `${b.progress}% in`}
      </div>
    </div>
  );
}

Object.assign(window, { ScreenGK, ScreenReview, ScreenJournal, ScreenMe });

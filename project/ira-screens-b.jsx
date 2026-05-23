// ira-screens-b.jsx — The Recall Flow (the heart of the learning engine)
// Brain dump → 3 questions → connect prompt → session complete

// ─────────────────────────────────────────────────────────────
// Step indicator
// ─────────────────────────────────────────────────────────────
function RecallSteps({ step }) {
  return (
    <div style={{ display: 'flex', gap: 4, padding: '6px 18px 14px' }}>
      {[1,2,3,4].map(n => (
        <div key={n} style={{
          flex: 1, height: 3, borderRadius: 99,
          background: n <= step ? 'var(--ink)' : 'var(--hair-2)',
        }}/>
      ))}
    </div>
  );
}

// Small "from class" context bubble that anchors every step
function ClassContext({ track = 'phy', topic = 'Thermodynamics: 2nd Law', time = '4:30 – 6:30 pm Aakash' }) {
  const meta = TRACKS[track];
  const Icon = Icons[meta.icon];
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '10px 14px', margin: '0 18px 16px',
      background: `color-mix(in oklab, ${meta.color} 10%, var(--paper))`,
      borderRadius: 'var(--r-md)',
    }}>
      <div style={{
        width: 30, height: 30, borderRadius: 8,
        background: meta.color, color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        <Icon size={16} c="#fff" sw={1.8}/>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="upper" style={{ fontSize: 9.5, fontWeight: 600, color: meta.color, letterSpacing: 0.1 }}>
          {meta.name} · today
        </div>
        <div style={{ fontSize: 12.5, color: 'var(--ink)', fontWeight: 500, marginTop: 1 }}>{topic}</div>
      </div>
      <span style={{ fontSize: 10.5, color: 'var(--ink-mute)' }}>{time}</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// STEP 1 — BRAIN DUMP
// ─────────────────────────────────────────────────────────────
function ScreenRecall({ nav, state }) {
  const [text, setText] = React.useState(
`Today Aakash covered the second law of thermodynamics.
Entropy of an isolated system never decreases — it can only increase or stay constant.
Heat flows naturally from hot to cold, never the other way without work.
A heat engine can never have 100% efficiency — some heat is always lost to the cold reservoir. This loss is the entropy term.
Carnot engine is the upper bound. Real engines are worse.
Mr. Mathur used the example of ice melting on a kitchen counter — the disorder of the universe increases even though the ice becomes more ordered as water.`);
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const [seconds, setSeconds] = React.useState(284); // 4m44s
  React.useEffect(() => {
    const i = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(i);
  }, []);
  const mm = Math.floor(seconds / 60).toString().padStart(2, '0');
  const ss = (seconds % 60).toString().padStart(2, '0');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ height: 54 }}/>
      <AppBar subtitle="STEP 1 OF 4 · BRAIN DUMP" title="What do you remember?" onBack={() => nav('today')}
        trailing={<span style={{
          fontSize: 12, fontFamily: 'var(--f-mono)', color: 'var(--ink-mute)',
          padding: '6px 10px', background: 'var(--card)', borderRadius: 99,
          border: '1px solid var(--hair)',
        }}>{mm}:{ss}</span>}
      />
      <RecallSteps step={1}/>
      <ClassContext/>

      <div style={{ padding: '0 18px 12px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 13, color: 'var(--ink-mute)', marginBottom: 12, lineHeight: 1.5 }}>
          No notes. No textbook. Just what's in your head. <span style={{ color: 'var(--ink)' }}>Quantity over polish.</span>
        </div>
        <div style={{
          flex: 1, background: 'var(--card)', borderRadius: 'var(--r-md)',
          padding: 16, border: '1px solid var(--hair)',
          display: 'flex', flexDirection: 'column',
        }}>
          <textarea value={text} onChange={e=>setText(e.target.value)} className="no-scroll" style={{
            flex: 1, border: 'none', outline: 'none',
            background: 'transparent', resize: 'none',
            fontFamily: 'var(--f-serif)', fontSize: 17, lineHeight: 1.55,
            color: 'var(--ink)', minHeight: 240,
          }}/>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            paddingTop: 10, borderTop: '1px solid var(--hair-2)', marginTop: 8,
          }}>
            <span className="mono" style={{ fontSize: 11.5, color: 'var(--ink-mute)' }}>{words} words</span>
            <div style={{ display: 'flex', gap: 4 }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} style={{ width: 28, height: 3, borderRadius: 99, background: words >= (i+1)*40 ? 'var(--green)' : 'var(--hair-2)' }}/>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '8px 18px 36px', display: 'flex', gap: 10 }}>
        <Btn variant="ghost" onClick={() => nav('today')} style={{ flex: 1 }}>Save & exit</Btn>
        <Btn variant="primary" icon={<Icons.arrow size={16} c="var(--paper)"/>} onClick={() => nav('recall2')} style={{ flex: 1.6, flexDirection: 'row-reverse' }}>
          Next · 3 questions
        </Btn>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// STEP 2 — THREE QUESTIONS
// ─────────────────────────────────────────────────────────────
function ScreenRecall2({ nav, state }) {
  const [a1, setA1] = React.useState('Entropy and the second law — the directionality of it. Why does the universe pick one direction in time?');
  const [a2, setA2] = React.useState('Imagine you drop a glass — it shatters. You\'ve never seen the pieces jump back together on their own. That\'s entropy. Disorder always grows because there are millions more ways for things to be messy than to be neat.');
  const [a3, setA3] = React.useState('Is entropy what gives time its arrow, or is it the other way around?');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ height: 54 }}/>
      <AppBar subtitle="STEP 2 OF 4 · THREE QUESTIONS" title="Make it yours." onBack={() => nav('recall')}/>
      <RecallSteps step={2}/>

      <div className="no-scroll" style={{ padding: '0 18px 20px', flex: 1, overflow: 'auto' }}>
        <ThreeQRow n={1} q="The hardest concept today?" hint="In one line." value={a1} onChange={setA1}/>
        <ThreeQRow n={2} q="Explain it like you're teaching a friend." hint="Generation effect. Your own words." value={a2} onChange={setA2} big/>
        <ThreeQRow n={3} q="One question you still have." hint="Open loops keep your brain working." value={a3} onChange={setA3}/>
      </div>

      <div style={{ padding: '8px 18px 36px', display: 'flex', gap: 10 }}>
        <Btn variant="ghost" onClick={() => nav('recall')} style={{ flex: 1 }}>Back</Btn>
        <Btn variant="primary" icon={<Icons.arrow size={16} c="var(--paper)"/>} onClick={() => nav('recall3')} style={{ flex: 1.6, flexDirection: 'row-reverse' }}>
          Next · connect
        </Btn>
      </div>
    </div>
  );
}

function ThreeQRow({ n, q, hint, value, onChange, big }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
        <span className="serif" style={{ fontSize: 26, color: 'var(--accent)', lineHeight: 1 }}>{n}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--ink)' }}>{q}</div>
          <div style={{ fontSize: 11.5, color: 'var(--ink-mute)', marginTop: 2 }}>{hint}</div>
        </div>
      </div>
      <textarea value={value} onChange={e => onChange(e.target.value)} className="no-scroll" style={{
        width: '100%', boxSizing: 'border-box',
        padding: '12px 14px',
        background: 'var(--card)', border: '1px solid var(--hair)',
        borderRadius: 'var(--r-md)', resize: 'none',
        fontFamily: 'var(--f-serif)', fontSize: 16, lineHeight: 1.5,
        color: 'var(--ink)', outline: 'none',
        minHeight: big ? 110 : 64,
      }}/>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// STEP 3 — CONNECT PROMPT
// ─────────────────────────────────────────────────────────────
function ScreenRecall3({ nav, state }) {
  const [text, setText] = React.useState('Entropy reminds me of diffusion in Biology — molecules moving from high to low concentration is entropy in action. Both are about systems moving toward equilibrium, toward the most probable state.');
  const [rating, setRating] = React.useState(4);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ height: 54 }}/>
      <AppBar subtitle="STEP 3 OF 4 · CONNECT" title="One bridge." onBack={() => nav('recall2')}/>
      <RecallSteps step={3}/>

      <div style={{ padding: '0 18px 16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Card padding={14} style={{ background: 'var(--paper-2)', borderColor: 'transparent', marginBottom: 14 }}>
          <div className="serif" style={{ fontSize: 17, lineHeight: 1.35, color: 'var(--ink)' }}>
            How does today connect to anything from another subject?
          </div>
          <div style={{ fontSize: 11.5, color: 'var(--ink-mute)', marginTop: 6 }}>
            Interleaving. Today this is a +10 XP bonus.
          </div>
        </Card>

        <textarea value={text} onChange={e => setText(e.target.value)} className="no-scroll" style={{
          flex: 1, minHeight: 140, boxSizing: 'border-box',
          padding: 14,
          background: 'var(--card)', border: '1px solid var(--hair)',
          borderRadius: 'var(--r-md)', resize: 'none',
          fontFamily: 'var(--f-serif)', fontSize: 16, lineHeight: 1.55,
          color: 'var(--ink)', outline: 'none',
        }}/>

        {/* recall self-rating */}
        <div style={{ marginTop: 18 }}>
          <div className="upper" style={{ fontSize: 10, fontWeight: 600, color: 'var(--ink-mute)' }}>How much could you recall?</div>
          <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
            {[1,2,3,4,5].map(v => (
              <button key={v} onClick={() => setRating(v)} style={{
                flex: 1, height: 40, borderRadius: 10,
                background: rating === v ? 'var(--ink)' : 'var(--card)',
                color: rating === v ? 'var(--paper)' : 'var(--ink)',
                border: `1px solid ${rating === v ? 'var(--ink)' : 'var(--hair)'}`,
                fontFamily: 'var(--f-mono)', fontWeight: 600, fontSize: 14,
                cursor: 'pointer',
              }}>{v}</button>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
            <span style={{ fontSize: 10.5, color: 'var(--ink-faint)' }}>Almost nothing</span>
            <span style={{ fontSize: 10.5, color: 'var(--ink-faint)' }}>Almost everything</span>
          </div>
        </div>
      </div>

      <div style={{ padding: '8px 18px 36px', display: 'flex', gap: 10 }}>
        <Btn variant="ghost" onClick={() => nav('recall4')} style={{ flex: 1 }}>Skip</Btn>
        <Btn variant="accent" icon={<Icons.check size={16}/>} onClick={() => nav('recall4')} style={{ flex: 1.6, flexDirection: 'row-reverse' }}>
          Complete session
        </Btn>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// STEP 4 — SESSION COMPLETE
// ─────────────────────────────────────────────────────────────
function ScreenRecall4({ nav, state }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--paper)' }}>
      <div style={{ height: 54 }}/>
      <div style={{ padding: '14px 18px 8px', textAlign: 'right' }}>
        <button onClick={() => nav('today')} style={{ background: 'transparent', border: 'none', padding: 6, cursor: 'pointer' }}>
          <Icons.close size={22}/>
        </button>
      </div>

      <div style={{ padding: '8px 24px 0', flex: 1 }}>
        <div className="upper" style={{ fontSize: 10.5, fontWeight: 600, color: 'var(--accent)' }}>SESSION COMPLETE</div>
        <div className="serif" style={{ fontSize: 36, lineHeight: 1.1, marginTop: 8, color: 'var(--ink)' }}>
          Locked in.<br/>
          <span style={{ color: 'var(--ink-mute)' }}>This will resurface tomorrow.</span>
        </div>

        {/* the gains — quiet, not confetti */}
        <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <GainRow label="Post-class recall" xp={25}/>
          <GainRow label="Connect prompt bonus" xp={10}/>
          <GainRow label="Recall streak ↑ 13 days" xp={0} note/>
        </div>

        {/* spaced repetition schedule */}
        <SectionHead title="Re-surfacing schedule" style={{ paddingTop: 28, paddingLeft: 0, paddingRight: 0 }}/>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, borderRadius: 'var(--r-md)', overflow: 'hidden', border: '1px solid var(--hair)' }}>
          {[
            { d: 'Tomorrow', sub: 'Wed · 27 May',     label: 'Day 1 quick recall' },
            { d: 'In 2 days', sub: 'Thu · 28 May',    label: 'Day 2' },
            { d: 'In 4 days', sub: 'Sat · 30 May',    label: 'Day 4' },
            { d: 'In 1 week', sub: 'Tue · 2 Jun',     label: 'Day 7 deep recall' },
            { d: 'In 2 weeks', sub: 'Tue · 9 Jun',    label: 'Day 14 — to long-term' },
          ].map((r, i) => (
            <div key={i} style={{
              padding: '12px 14px', background: 'var(--card)',
              borderTop: i ? '1px solid var(--hair-2)' : 'none',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <div className="mono" style={{
                fontSize: 11, color: 'var(--ink-mute)', minWidth: 76,
              }}>{r.d}</div>
              <div style={{ flex: 1, fontSize: 13, color: 'var(--ink)' }}>{r.label}</div>
              <div style={{ fontSize: 10.5, color: 'var(--ink-faint)' }}>{r.sub}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '16px 18px 36px' }}>
        <Btn variant="primary" onClick={() => nav('today')} style={{ width: '100%' }}>Back to today</Btn>
      </div>
    </div>
  );
}

function GainRow({ label, xp, note }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '10px 14px', background: 'var(--card)',
      border: '1px solid var(--hair)', borderRadius: 'var(--r-md)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Icons.check size={14} c={note ? 'var(--accent)' : 'var(--green)'} sw={2.2}/>
        <span style={{ fontSize: 13.5, color: 'var(--ink)' }}>{label}</span>
      </div>
      {xp > 0 ? (
        <span className="mono" style={{ fontSize: 12.5, color: 'var(--ink)', fontWeight: 600 }}>+{xp} XP</span>
      ) : (
        <span style={{ fontSize: 10.5, color: 'var(--ink-mute)' }}>streak</span>
      )}
    </div>
  );
}

Object.assign(window, { ScreenRecall, ScreenRecall2, ScreenRecall3, ScreenRecall4 });

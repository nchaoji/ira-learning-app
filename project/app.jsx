// app.jsx — main mount: assembles the design canvas with all artboards

const { useState } = React;

// Mini router inside a Phone — each phone instance has its own screen state
function IraDevice({ initial = 'today', time = '7:48' }) {
  const [screen, setScreen] = useState(initial);
  const nav = (s) => setScreen(s);
  const state = window.IRA_STATE;

  // map screen -> component
  const screens = {
    today:    ScreenToday,
    tracks:   ScreenTracks,
    concept:  ScreenConcept,
    recall:   ScreenRecall,
    recall2:  ScreenRecall2,
    recall3:  ScreenRecall3,
    recall4:  ScreenRecall4,
    gk:       ScreenGK,
    review:   ScreenReview,
    journal:  ScreenJournal,
    me:       ScreenMe,
  };
  const Screen = screens[screen] || ScreenToday;
  // dark-paper screen for completion
  const dark = false;
  // which screens use the bottom tab bar
  const showTabs = ['today','tracks','journal','me'].includes(screen);
  const tabActive = { today: 'today', tracks: 'tracks', journal: 'journal', me: 'me' }[screen];

  return (
    <Phone time={time} dark={dark}>
      <Screen nav={nav} state={state}/>
      {showTabs && <TabBar active={tabActive} onSelect={(t) => {
        if (t === 'recall') nav('recall');
        else nav(t);
      }}/>}
    </Phone>
  );
}

function App() {
  return (
    <DesignCanvas
      title="Ira"
      subtitle="Learning Intelligence — for Ira (Class 11, CBSE PCB + Psych) · 22-month horizon · May 2026"
    >
      {/* VISUAL OPTIONS — four directions for the system */}
      <DCSection id="visual-options" title="Visual directions" subtitle="Four ways the system could feel. Each Today screen is live — tap to navigate.">
        {VISUAL_OPTIONS.map(o => (
          <DCArtboard key={o.id} id={'opt-'+o.id} label={o.name} width={420} height={1090}>
            <VisualOption {...o}/>
          </DCArtboard>
        ))}
      </DCSection>

      {/* INTRO NOTE */}
      <DCSection id="intro" title="The brief — and the system" subtitle="Working draft from the BRD, May 2026">
        <DCArtboard id="reasoning" label="Design rationale" width={760} height={520}>
          <ReasoningCard/>
        </DCArtboard>
        <DCArtboard id="system" label="Visual system" width={580} height={520}>
          <SystemCard/>
        </DCArtboard>
      </DCSection>

      {/* IRA — DAILY */}
      <DCSection id="ira-daily" title="Ira · Daily" subtitle="The Today screen is the anchor. Tap any device to play.">
        <DCArtboard id="today"   label="Today · Tuesday Aakash day" width={420} height={830}>
          <IraDevice initial="today"/>
        </DCArtboard>
        <DCArtboard id="tracks"  label="7 tracks · health & pace"   width={420} height={830}>
          <IraDevice initial="tracks"/>
        </DCArtboard>
        <DCArtboard id="concept" label="Concept mastery — Biology"  width={420} height={830}>
          <IraDevice initial="concept"/>
        </DCArtboard>
      </DCSection>

      {/* RECALL FLOW */}
      <DCSection id="recall-flow" title="The recall engine" subtitle="Post-class flow: brain dump → 3 questions → connect → spaced repetition.">
        <DCArtboard id="r1" label="1 · Brain dump"  width={420} height={830}>
          <IraDevice initial="recall"/>
        </DCArtboard>
        <DCArtboard id="r2" label="2 · 3 questions" width={420} height={830}>
          <IraDevice initial="recall2"/>
        </DCArtboard>
        <DCArtboard id="r3" label="3 · Connect"     width={420} height={830}>
          <IraDevice initial="recall3"/>
        </DCArtboard>
        <DCArtboard id="r4" label="4 · Locked in"   width={420} height={830}>
          <IraDevice initial="recall4"/>
        </DCArtboard>
      </DCSection>

      {/* HABITS */}
      <DCSection id="habits" title="Habits & focus" subtitle="Daily GK quiz, spaced reviews resurfacing old material.">
        <DCArtboard id="gk"     label="Daily GK · keeps the 48-day streak" width={420} height={830}>
          <IraDevice initial="gk"/>
        </DCArtboard>
        <DCArtboard id="review" label="Spaced review · Day 4 surfaces"     width={420} height={830}>
          <IraDevice initial="review"/>
        </DCArtboard>
      </DCSection>

      {/* REFLECTION & PROFILE */}
      <DCSection id="reflection" title="Reflection & profile" subtitle="Private journal, level progression, badges.">
        <DCArtboard id="journal" label="Journal — private to Ira"     width={420} height={830}>
          <IraDevice initial="journal"/>
        </DCArtboard>
        <DCArtboard id="me"      label="Me · Level 7 Navigator"        width={420} height={830}>
          <IraDevice initial="me"/>
        </DCArtboard>
      </DCSection>

      {/* PARENT VIEW */}
      <DCSection id="parent" title="Parent view — Niranjan" subtitle="Trust, not surveillance. Exception-based weekly check-ins.">
        <DCArtboard id="parent-overview" label="Overview · weekly health"  width={1220} height={860}>
          <ChromeWindow url="ira.app / parent / overview" width={1220} height={860}
            tabs={[{ title: 'Ira · Parent Overview' }, { title: 'Aakash Portal' }]} activeIndex={0}>
            <ParentDashboard state={window.IRA_STATE}/>
          </ChromeWindow>
        </DCArtboard>
        <DCArtboard id="parent-readiness" label="Readiness · projected to boards" width={1220} height={860}>
          <ChromeWindow url="ira.app / parent / readiness" width={1220} height={860}
            tabs={[{ title: 'Ira · Readiness' }]} activeIndex={0}>
            <ParentReadiness state={window.IRA_STATE}/>
          </ChromeWindow>
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

// ─────────────────────────────────────────────────────────────
// REASONING CARD — the "junior designer thinking aloud" panel
// ─────────────────────────────────────────────────────────────
function ReasoningCard() {
  return (
    <div style={{
      width: '100%', height: '100%', background: 'var(--card)',
      borderRadius: 'var(--r-lg)', border: '1px solid var(--hair)',
      padding: '32px 36px', boxSizing: 'border-box',
      fontFamily: 'var(--f-sans)', color: 'var(--ink)', overflow: 'auto',
    }} className="no-scroll">
      <div className="upper" style={{ fontSize: 11, fontWeight: 600, color: 'var(--accent)' }}>Working notes</div>
      <h2 className="serif" style={{ fontSize: 32, lineHeight: 1.1, margin: '6px 0 16px', fontWeight: 400 }}>
        What I'm designing for.
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div>
          <div className="upper" style={{ fontSize: 10, fontWeight: 600, color: 'var(--ink-mute)' }}>The real problem</div>
          <p style={{ fontSize: 13.5, lineHeight: 1.55, margin: '6px 0 0', color: 'var(--ink-2)' }}>
            Drift, not capability. A week of skipped GK becomes a month. The app's job is to make the daily loop frictionless and the consequence of skipping <em>visible</em> — without becoming a surveillance tool.
          </p>
        </div>
        <div>
          <div className="upper" style={{ fontSize: 10, fontWeight: 600, color: 'var(--ink-mute)' }}>The non-negotiable</div>
          <p style={{ fontSize: 13.5, lineHeight: 1.55, margin: '6px 0 0', color: 'var(--ink-2)' }}>
            Brain dump &rarr; 3 questions &rarr; connect &rarr; spaced repetition (1, 2, 4, 7, 14). Everything else exists in service of getting this loop to happen on Aakash days.
          </p>
        </div>
        <div>
          <div className="upper" style={{ fontSize: 10, fontWeight: 600, color: 'var(--ink-mute)' }}>Tone</div>
          <p style={{ fontSize: 13.5, lineHeight: 1.55, margin: '6px 0 0', color: 'var(--ink-2)' }}>
            Editorial &amp; mature — not edtech-bubblegum. Ira is 16, not 9. Gamification stays small: a streak counter, an XP number, a level word. No confetti. The serious aesthetic <em>is</em> the respect.
          </p>
        </div>
        <div>
          <div className="upper" style={{ fontSize: 10, fontWeight: 600, color: 'var(--ink-mute)' }}>Parent rule</div>
          <p style={{ fontSize: 13.5, lineHeight: 1.55, margin: '6px 0 0', color: 'var(--ink-2)' }}>
            Niranjan sees signals — green / amber / red, streaks, milestones. Never the content of a brain dump or journal entry. Trust but verify, exception-based, 3 minutes a week.
          </p>
        </div>
      </div>

      <div style={{
        marginTop: 26, padding: 18, borderRadius: 'var(--r-md)',
        background: 'var(--paper-2)',
      }}>
        <div className="upper" style={{ fontSize: 10, fontWeight: 600, color: 'var(--ink-mute)' }}>What's in this canvas</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginTop: 10, fontSize: 12.5, color: 'var(--ink-2)' }}>
          <div><strong style={{ color: 'var(--ink)' }}>Daily</strong> — Today, Tracks, Concept mastery</div>
          <div><strong style={{ color: 'var(--ink)' }}>Recall flow</strong> — 4 steps, post-Aakash</div>
          <div><strong style={{ color: 'var(--ink)' }}>Habits</strong> — GK quiz, spaced review</div>
          <div><strong style={{ color: 'var(--ink)' }}>Reflection</strong> — Journal &amp; Me</div>
          <div><strong style={{ color: 'var(--ink)' }}>Parent</strong> — Overview &amp; readiness</div>
          <div style={{ color: 'var(--ink-mute)', fontStyle: 'italic' }}>Every phone is clickable — try it.</div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SYSTEM CARD — color, type, tracks
// ─────────────────────────────────────────────────────────────
function SystemCard() {
  return (
    <div style={{
      width: '100%', height: '100%', background: 'var(--card)',
      borderRadius: 'var(--r-lg)', border: '1px solid var(--hair)',
      padding: '32px 32px', boxSizing: 'border-box',
      fontFamily: 'var(--f-sans)', color: 'var(--ink)', overflow: 'auto',
    }} className="no-scroll">
      <div className="upper" style={{ fontSize: 11, fontWeight: 600, color: 'var(--accent)' }}>Visual system</div>
      <h2 className="serif" style={{ fontSize: 30, lineHeight: 1.1, margin: '6px 0 18px', fontWeight: 400 }}>Quiet, editorial, warm.</h2>

      {/* type */}
      <div className="upper" style={{ fontSize: 10, fontWeight: 600, color: 'var(--ink-mute)', marginBottom: 8 }}>Type</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 4 }}>
        <span className="serif" style={{ fontSize: 36, lineHeight: 1 }}>Aa</span>
        <span style={{ fontSize: 12, color: 'var(--ink-mute)' }}>Instrument Serif — moments, headings, the brand voice</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 4 }}>
        <span style={{ fontSize: 24, fontWeight: 500 }}>Aa</span>
        <span style={{ fontSize: 12, color: 'var(--ink-mute)' }}>DM Sans — UI, body, buttons</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 18 }}>
        <span className="mono" style={{ fontSize: 22, fontWeight: 600 }}>48</span>
        <span style={{ fontSize: 12, color: 'var(--ink-mute)' }}>JetBrains Mono — streaks, XP, dates</span>
      </div>

      {/* paper / ink */}
      <div className="upper" style={{ fontSize: 10, fontWeight: 600, color: 'var(--ink-mute)', marginBottom: 8 }}>Paper · Ink · Accent</div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
        <Swatch c="var(--paper)"  l="paper" sub="#F2EEE5"/>
        <Swatch c="var(--card)"   l="card"  sub="#FBF8F1"/>
        <Swatch c="var(--ink)"    l="ink"   sub="#1A1814" dark/>
        <Swatch c="var(--accent)" l="vermillion" sub="#C5532A" dark/>
      </div>

      {/* signal */}
      <div className="upper" style={{ fontSize: 10, fontWeight: 600, color: 'var(--ink-mute)', marginBottom: 8 }}>Signal</div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
        <Swatch c="var(--green)" l="green" sub="on schedule" dark/>
        <Swatch c="var(--amber)" l="amber" sub="drift" dark/>
        <Swatch c="var(--red)"   l="red" sub="action needed" dark/>
      </div>

      {/* tracks */}
      <div className="upper" style={{ fontSize: 10, fontWeight: 600, color: 'var(--ink-mute)', marginBottom: 8 }}>Track colors · 7 + 1</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {Object.keys(TRACKS).filter(k => k !== 'jrn').map(k => (
          <div key={k} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '5px 10px 5px 8px', background: 'var(--paper-2)', borderRadius: 99,
          }}>
            <span style={{ width: 9, height: 9, borderRadius: 99, background: TRACKS[k].color }}/>
            <span style={{ fontSize: 11, color: 'var(--ink-2)' }}>{TRACKS[k].name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Swatch({ c, l, sub, dark }) {
  return (
    <div style={{
      flex: 1, height: 76, background: c, borderRadius: 'var(--r-md)',
      padding: 10, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
      color: dark ? '#fff' : 'var(--ink)', border: '1px solid var(--hair)',
    }}>
      <div style={{ fontSize: 11.5, fontWeight: 500 }}>{l}</div>
      <div className="mono" style={{ fontSize: 9.5, opacity: 0.7 }}>{sub}</div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);

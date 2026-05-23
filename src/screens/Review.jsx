import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icons from '../icons.jsx';
import { useAppState } from '../state.jsx';
import { Card, Chip, Btn, AppBar, StatusSpacer } from '../components.jsx';

export default function Review() {
  const { dispatch } = useAppState();
  const nav = useNavigate();
  const [stage, setStage] = useState('write');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(null);

  const original = "Newton's third law: every action has an equal and opposite reaction. Forces always come in pairs — they act on different bodies. If body A pushes B with force F, B pushes A with -F. This is why rockets work: the engine pushes gas down, gas pushes the rocket up. Walking too — your foot pushes the ground back, the ground pushes you forward.";

  const handleSave = () => {
    dispatch({ type: 'COMPLETE_TASK', id: 't1' });
    dispatch({ type: 'ADD_XP', amount: 15 });
    nav('/today');
  };

  return (
    <div className="ira-screen">
      <div className="no-scroll" style={{ flex: 1, overflowY: 'auto' }}>
        <StatusSpacer />
        <AppBar subtitle="SPACED REVIEW · DAY 4" title="What do you still know?"
          onBack={() => nav('/today')}
          trailing={<Chip color="var(--tk-phy)" tone="outline">Physics</Chip>}
        />

        <div style={{ padding: '0 18px', display: 'flex', flexDirection: 'column' }}>
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
                minHeight: 200, boxSizing: 'border-box', padding: 16,
                background: 'var(--card)', border: '1px solid var(--hair)',
                borderRadius: 'var(--r-md)', resize: 'none',
                fontFamily: 'var(--f-serif)', fontSize: 17, lineHeight: 1.55,
                color: 'var(--ink)', outline: 'none',
              }} />
            </>
          )}

          {stage === 'compare' && (
            <>
              <div className="upper" style={{ fontSize: 10, fontWeight: 600, color: 'var(--ink-mute)', marginBottom: 8 }}>Your recall (just now)</div>
              <Card padding={14} style={{ marginBottom: 14 }}>
                <div className="serif" style={{ fontSize: 15.5, lineHeight: 1.5, color: 'var(--ink)' }}>
                  {text || <span style={{ color: 'var(--ink-faint)' }}>— blank —</span>}
                </div>
              </Card>
              <div className="upper" style={{ fontSize: 10, fontWeight: 600, color: 'var(--ink-mute)', marginBottom: 8 }}>Your original brain dump · 22 May</div>
              <Card padding={14} style={{ marginBottom: 18, background: 'var(--paper-2)', borderColor: 'transparent' }}>
                <div className="serif" style={{ fontSize: 15.5, lineHeight: 1.55, color: 'var(--ink-2)' }}>{original}</div>
              </Card>

              <div className="upper" style={{ fontSize: 10, fontWeight: 600, color: 'var(--ink-mute)' }}>Rate yourself · honesty matters</div>
              <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                {[1, 2, 3, 4, 5].map(v => (
                  <button key={v} onClick={() => setRating(v)} style={{
                    flex: 1, height: 44, borderRadius: 10,
                    background: rating === v ? 'var(--ink)' : 'var(--card)',
                    color: rating === v ? 'var(--paper)' : 'var(--ink)',
                    border: `1px solid ${rating === v ? 'var(--ink)' : 'var(--hair)'}`,
                    fontFamily: 'var(--f-mono)', fontWeight: 600, fontSize: 15, cursor: 'pointer',
                  }}>{v}</button>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                <span style={{ fontSize: 10.5, color: 'var(--ink-faint)' }}>Forgot</span>
                <span style={{ fontSize: 10.5, color: 'var(--ink-faint)' }}>Perfect</span>
              </div>

              {rating && rating >= 4 && (
                <div style={{ marginTop: 14, padding: '10px 12px', background: 'var(--green-soft)', borderRadius: 'var(--r-md)', fontSize: 12.5, color: '#3F5A30', display: 'flex', gap: 8, alignItems: 'center' }}>
                  <Icons.check size={14} c="var(--green)" sw={2} />
                  Concept moved to <strong>strong</strong>. Next surface: Day 7.
                </div>
              )}
              {rating && rating < 4 && (
                <div style={{ marginTop: 14, padding: '10px 12px', background: 'var(--amber-soft)', borderRadius: 'var(--r-md)', fontSize: 12.5, color: '#6B4A14', display: 'flex', gap: 8, alignItems: 'center' }}>
                  <Icons.refresh size={14} c="var(--amber)" sw={2} />
                  Interval reset. We'll surface this tomorrow.
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div style={{ padding: '16px 18px 36px', display: 'flex', gap: 10 }}>
        {stage === 'write' && (
          <>
            <Btn variant="ghost" onClick={() => setStage('compare')} style={{ flex: 1 }}>I'm blank</Btn>
            <Btn variant="primary" onClick={() => setStage('compare')} style={{ flex: 1.6 }}>Compare</Btn>
          </>
        )}
        {stage === 'compare' && (
          <Btn variant="accent" disabled={!rating} onClick={handleSave} style={{ width: '100%' }}>
            Save & continue
          </Btn>
        )}
      </div>
    </div>
  );
}

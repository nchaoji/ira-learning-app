import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icons from '../icons.jsx';
import { useAppState } from '../state.jsx';
import { Card, Chip, Btn, AppBar, StatusSpacer } from '../components.jsx';

export default function GKQuiz() {
  const { state, dispatch } = useAppState();
  const nav = useNavigate();
  const q = state.gk;
  const [picked, setPicked] = useState(null);
  const reveal = picked !== null;
  const correct = reveal && picked === q.correct;

  const handleNext = () => {
    dispatch({ type: 'COMPLETE_TASK', id: 't3' });
    if (correct) dispatch({ type: 'INCREMENT_STREAK', key: 'gk' });
    nav('/today');
  };

  return (
    <div className="ira-screen">
      <div className="no-scroll" style={{ flex: 1, overflowY: 'auto' }}>
        <StatusSpacer />
        <AppBar subtitle="DAILY GK · Q3 / 5" title="Keep the streak."
          onBack={() => nav('/today')}
          trailing={
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 10px', background: 'var(--accent-soft)', borderRadius: 99 }}>
              <Icons.flame size={13} c="var(--accent)" sw={2} />
              <span className="mono" style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent-ink)' }}>{state.streaks.gk}</span>
            </div>
          }
        />

        <div style={{ padding: '0 18px' }}>
          {/* progress dots */}
          <div style={{ display: 'flex', gap: 4, marginBottom: 24 }}>
            {[0, 1, 2, 3, 4].map(i => (
              <div key={i} style={{
                flex: 1, height: 3, borderRadius: 99,
                background: i < 2 ? 'var(--green)' : i === 2 ? 'var(--ink)' : 'var(--hair-2)',
              }} />
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
                  }}>
                    {reveal && isCorrect ? <Icons.check size={14} /> : String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                </button>
              );
            })}
          </div>

          {reveal && (
            <Card padding={14} style={{ marginTop: 18, background: correct ? 'var(--green-soft)' : 'var(--paper-2)', borderColor: 'transparent' }}>
              <div className="upper" style={{ fontSize: 10, fontWeight: 600, color: correct ? '#3F5A30' : 'var(--ink-mute)' }}>
                {correct ? 'Correct!' : 'The answer is Mizoram'}
              </div>
              <div style={{ fontSize: 12.5, color: 'var(--ink)', marginTop: 6, lineHeight: 1.45 }}>
                Mizoram recorded ~25% decadal growth — the highest in the latest update. Tag: CUET GK, Economic Survey 2024.
              </div>
            </Card>
          )}
        </div>
      </div>

      <div style={{ padding: '16px 18px 36px' }}>
        {!reveal
          ? <Btn variant="primary" onClick={() => setPicked(2)} style={{ width: '100%' }}>Submit</Btn>
          : <Btn variant="primary" icon={<Icons.arrow size={16} c="var(--paper)" />} onClick={handleNext} style={{ width: '100%', flexDirection: 'row-reverse' }}>
              Next question
            </Btn>
        }
      </div>
    </div>
  );
}

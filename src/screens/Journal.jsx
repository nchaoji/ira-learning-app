import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icons from '../icons.jsx';
import { useAppState } from '../state.jsx';
import { Card, Chip, Btn, AppBar, SectionHead, StatusSpacer, TabBar } from '../components.jsx';

export default function Journal() {
  const { state, dispatch } = useAppState();
  const nav = useNavigate();
  const [selectedTag, setSelectedTag] = useState('All');
  const [showCompose, setShowCompose] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');

  const tags = ['All', '#bookreflection', '#psychology', '#currentaffairs', '#volunteering', '#personal'];
  const filtered = selectedTag === 'All'
    ? state.journal
    : state.journal.filter(e => `#${e.tag}` === selectedTag);

  const handleSave = () => {
    if (!newTitle.trim() || !newBody.trim()) return;
    const words = newBody.trim().split(/\s+/).length;
    dispatch({ type: 'ADD_JOURNAL', entry: { tag: 'personal', title: newTitle.trim(), body: newBody.trim(), words } });
    dispatch({ type: 'ADD_XP', amount: 5 });
    setShowCompose(false);
    setNewTitle('');
    setNewBody('');
  };

  if (showCompose) {
    return (
      <div className="ira-screen">
        <div className="no-scroll" style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
          <StatusSpacer />
          <AppBar title="New entry" onBack={() => setShowCompose(false)}
            trailing={<Btn variant="accent" size="sm" onClick={handleSave}>Save</Btn>}
          />
          <div style={{ padding: '8px 18px', flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <input
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              placeholder="Title…"
              style={{
                width: '100%', boxSizing: 'border-box', border: 'none',
                borderBottom: '1px solid var(--hair)', padding: '8px 0',
                fontFamily: 'var(--f-serif)', fontSize: 22, color: 'var(--ink)',
                background: 'transparent', outline: 'none',
              }}
            />
            <textarea
              value={newBody}
              onChange={e => setNewBody(e.target.value)}
              placeholder="Write…"
              className="no-scroll"
              style={{
                flex: 1, minHeight: 300, border: 'none', outline: 'none',
                fontFamily: 'var(--f-serif)', fontSize: 17, lineHeight: 1.6,
                color: 'var(--ink)', background: 'transparent', resize: 'none',
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ira-screen">
      <div className="no-scroll" style={{ flex: 1, overflowY: 'auto', paddingBottom: 100 }}>
        <StatusSpacer />
        <AppBar subtitle="6-WEEK STREAK · PRIVATE" title="Journal"
          trailing={
            <button onClick={() => setShowCompose(true)} style={{
              width: 36, height: 36, borderRadius: 99,
              background: 'var(--ink)', color: 'var(--paper)',
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icons.plus size={18} c="var(--paper)" />
            </button>
          }
        />

        {/* essay seedbed */}
        <div style={{ padding: '4px 18px 14px' }}>
          <Card padding={14} style={{ background: 'var(--paper-2)', borderColor: 'transparent' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Icons.bolt size={16} c="var(--accent)" sw={2} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500 }}>4 entries this month — Ashoka essay seedbed</div>
                <div style={{ fontSize: 11.5, color: 'var(--ink-mute)', marginTop: 2 }}>Your tagged reflections become raw material in 18 months.</div>
              </div>
            </div>
          </Card>
        </div>

        {/* tag filter */}
        <div style={{ display: 'flex', gap: 8, padding: '0 18px 14px', overflowX: 'auto' }} className="no-scroll">
          {tags.map((tag, i) => (
            <Chip key={i}
              tone={tag === selectedTag ? 'solid' : 'ghost'}
              color={tag === selectedTag ? 'var(--ink)' : 'var(--ink-mute)'}
              style={{ flexShrink: 0, padding: '6px 12px', cursor: 'pointer' }}
              onClick={() => setSelectedTag(tag)}
            >{tag}</Chip>
          ))}
        </div>

        <div style={{ padding: '0 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filtered.map((e) => (
            <Card key={e.id} padding={16}>
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

      <TabBar active="journal" onSelect={(id) => {
        if (id === 'recall') nav('/recall/1');
        else nav('/' + id);
      }} />
    </div>
  );
}

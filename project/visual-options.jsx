// visual-options.jsx — 4 theme directions for the visual system

// A single themed option: caption stack + a live Today phone
function VisualOption({ themeClass, name, tagline, swatches, typeSample, bestFor }) {
  return (
    <div className={themeClass} style={{
      width: '100%', height: '100%',
      display: 'flex', flexDirection: 'column', gap: 18,
      alignItems: 'center', paddingTop: 4,
      fontFamily: 'var(--f-sans)', color: 'var(--ink)',
    }}>
      {/* caption card — uses the same theme's tokens for a true sample */}
      <div style={{
        width: 390, padding: '18px 20px',
        background: 'var(--card)', borderRadius: 'var(--r-lg)',
        border: '1px solid var(--hair)',
        boxSizing: 'border-box',
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
          <h3 className="serif" style={{
            fontSize: 26, margin: 0, lineHeight: 1, color: 'var(--ink)', fontWeight: 400,
          }}>{name}</h3>
          <span className="mono upper" style={{ fontSize: 9, fontWeight: 600, color: 'var(--ink-mute)' }}>
            {bestFor}
          </span>
        </div>
        <p style={{ fontSize: 12.5, lineHeight: 1.5, color: 'var(--ink-mute)', margin: '8px 0 14px' }}>
          {tagline}
        </p>
        {/* swatch row + type sample on one line */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <div style={{ display: 'flex', gap: 4 }}>
            {swatches.map((c, i) => (
              <span key={i} style={{
                width: 22, height: 22, borderRadius: 6, background: c,
                border: '1px solid var(--hair)',
              }}/>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span className="serif" style={{ fontSize: 22, lineHeight: 1, color: 'var(--ink)' }}>{typeSample.serif}</span>
            <span className="mono" style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)' }}>{typeSample.mono}</span>
          </div>
        </div>
      </div>

      {/* live themed phone */}
      <IraDevice initial="today"/>
    </div>
  );
}

// each option's metadata
const VISUAL_OPTIONS = [
  {
    id: 'linen',
    themeClass: '',                 // default tokens (current)
    name: 'Editorial Linen',
    tagline: 'Mature, warm, restrained. Treats Ira as the serious student she is. The current direction.',
    swatches: ['#F2EEE5', '#1A1814', '#C5532A', '#5C7A4F'],
    typeSample: { serif: 'Aa', mono: '48' },
    bestFor: 'CURRENT · ANCHOR',
  },
  {
    id: 'bloom',
    themeClass: 'theme-bloom',
    name: 'Soft Bloom',
    tagline: 'Warm rose, peach paper, plum ink. Still serious — but softer, more personal. Reads "her notebook" not "her tax software".',
    swatches: ['#FBEFE6', '#2D1F26', '#D9627E', '#7A9A6E'],
    typeSample: { serif: 'Aa', mono: '48' },
    bestFor: 'WARMER · PERSONAL',
  },
  {
    id: 'night',
    themeClass: 'theme-night',
    name: 'Night Studio',
    tagline: 'For 11 pm study sessions. Deep warm dark, cream type, sunlit peach accent. Pulls the device into the room.',
    swatches: ['#14130F', '#F2EBDC', '#FFB078', '#A5C58F'],
    typeSample: { serif: 'Aa', mono: '48' },
    bestFor: 'LATE-NIGHT · FOCUS',
  },
  {
    id: 'notebook',
    themeClass: 'theme-notebook',
    name: 'Notebook',
    tagline: 'A paper page she\'s annotating. Cream-yellow, red ink, slightly heavier hairlines. The app vanishes; the work shows.',
    swatches: ['#F5ECCF', '#221E16', '#C13E2A', '#5C7A4F'],
    typeSample: { serif: 'Aa', mono: '48' },
    bestFor: 'JOURNAL · CRAFT',
  },
];

window.VisualOption = VisualOption;
window.VISUAL_OPTIONS = VISUAL_OPTIONS;

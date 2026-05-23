// icons.jsx — small, line-style 1.5px stroke icon set
// Sized 20 by default. Pass size + color.

const I = ({ size = 20, c = 'currentColor', sw = 1.5, children, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
       stroke={c} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"
       style={{ display: 'block', flexShrink: 0, ...style }}>
    {children}
  </svg>
);

const Icons = {
  // navigation
  home:    (p) => <I {...p}><path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1z"/></I>,
  spark:   (p) => <I {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/></I>,
  brain:   (p) => <I {...p}><path d="M9 4a3 3 0 0 0-3 3v1a3 3 0 0 0-2 5 3 3 0 0 0 2 5v1a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3v-1a3 3 0 0 0 2-5 3 3 0 0 0-2-5V7a3 3 0 0 0-3-3z"/><path d="M12 4v16"/></I>,
  book:    (p) => <I {...p}><path d="M4 4h10a4 4 0 0 1 4 4v12H8a4 4 0 0 1-4-4z"/><path d="M4 4v12a4 4 0 0 1 4-4h10"/></I>,
  user:    (p) => <I {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/></I>,
  flag:    (p) => <I {...p}><path d="M5 21V4h13l-2 4 2 4H5"/></I>,
  flame:   (p) => <I {...p}><path d="M12 3c1 3 5 4 5 9a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3 1-5 1-8z"/></I>,
  check:   (p) => <I {...p}><path d="M4 12l5 5L20 6"/></I>,
  arrow:   (p) => <I {...p}><path d="M5 12h14M13 6l6 6-6 6"/></I>,
  back:    (p) => <I {...p}><path d="M19 12H5M11 6l-6 6 6 6"/></I>,
  plus:    (p) => <I {...p}><path d="M12 5v14M5 12h14"/></I>,
  close:   (p) => <I {...p}><path d="M6 6l12 12M18 6L6 18"/></I>,
  dots:    (p) => <I {...p}><circle cx="6" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="18" cy="12" r="1"/></I>,
  bell:    (p) => <I {...p}><path d="M6 9a6 6 0 0 1 12 0v5l2 3H4l2-3z"/><path d="M10 20a2 2 0 0 0 4 0"/></I>,
  clock:   (p) => <I {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></I>,
  calendar:(p) => <I {...p}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></I>,
  bolt:    (p) => <I {...p}><path d="M13 3L4 14h7l-1 7 9-11h-7z"/></I>,
  badge:   (p) => <I {...p}><circle cx="12" cy="9" r="6"/><path d="M9 14l-2 7 5-3 5 3-2-7"/></I>,
  pen:     (p) => <I {...p}><path d="M4 20l4-1 11-11-3-3L5 16z"/></I>,
  layers:  (p) => <I {...p}><path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5M3 18l9 5 9-5"/></I>,
  target:  (p) => <I {...p}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></I>,
  trend:   (p) => <I {...p}><path d="M3 17l6-6 4 4 8-9"/><path d="M14 6h7v7"/></I>,
  search:  (p) => <I {...p}><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></I>,
  filter:  (p) => <I {...p}><path d="M3 5h18l-7 9v6l-4-2v-4z"/></I>,
  globe:   (p) => <I {...p}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/></I>,
  shield:  (p) => <I {...p}><path d="M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6z"/></I>,
  hand:    (p) => <I {...p}><path d="M7 12V5a1.5 1.5 0 0 1 3 0v6M10 11V4a1.5 1.5 0 0 1 3 0v7M13 11V5a1.5 1.5 0 0 1 3 0v9M16 11V8a1.5 1.5 0 0 1 3 0v9a5 5 0 0 1-5 5h-2c-3 0-5-1-6-4l-3-6a1.5 1.5 0 0 1 3-1.5L7 14"/></I>,
  beaker:  (p) => <I {...p}><path d="M9 3h6M10 3v7l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3"/><path d="M7 15h10"/></I>,
  atom:    (p) => <I {...p}><circle cx="12" cy="12" r="2"/><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/></I>,
  dna:     (p) => <I {...p}><path d="M7 3c0 5 10 6 10 11s-10 6-10 11M17 3c0 5-10 6-10 11s10 6 10 11"/><path d="M9 6h6M9 10h6M9 14h6M9 18h6"/></I>,
  sigma:   (p) => <I {...p}><path d="M18 5H7l6 7-6 7h11"/></I>,
  chat:    (p) => <I {...p}><path d="M21 12a8 8 0 0 1-12 7l-5 1 1-5A8 8 0 1 1 21 12z"/></I>,
  graph:   (p) => <I {...p}><path d="M4 4v16h16M8 16l4-6 3 3 5-8"/></I>,
  heart:   (p) => <I {...p}><path d="M12 21s-8-5-8-12a5 5 0 0 1 8-3 5 5 0 0 1 8 3c0 7-8 12-8 12z"/></I>,
  lock:    (p) => <I {...p}><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></I>,
  refresh: (p) => <I {...p}><path d="M21 12a9 9 0 1 1-3-7M21 5v5h-5"/></I>,
};

Object.assign(window, { Icons });

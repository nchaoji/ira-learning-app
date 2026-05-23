import { createContext, useContext, useReducer, useEffect } from 'react';

// ── Initial state (from BRD / prototype fixture data) ────────
const INITIAL = {
  user: { name: 'Ira', level: 7, levelName: 'Navigator', xp: 1240, xpToNext: 1500 },
  streaks: { master: 18, gk: 48, recall: 12, writing: 6 },
  today: { day: 'Tuesday', date: 'May 26', aakash: 'Physics' },
  tracks: [
    { key: 'phy',  status: 'green', streak: 12, syllabus: 38, pace: 'on schedule',   trend: [3,3,4,4,3,4,4,5,4,5,4,5], lastConcept: 'Thermodynamics: 2nd Law' },
    { key: 'chem', status: 'amber', streak: 12, syllabus: 35, pace: 'on schedule',   trend: [4,4,3,4,3,3,3,3,2,3,3,3], lastConcept: 'Carbonyl group reactions', flag: 'Organic recall dipping' },
    { key: 'bio',  status: 'green', streak: 12, syllabus: 42, pace: '1 week ahead',  trend: [4,4,5,4,5,5,4,5,5,5,4,5], lastConcept: 'Digestion: Enzymes' },
    { key: 'ger',  status: 'green', streak: 0,  syllabus: 0,  pace: 'starts Aug 8',  trend: [], lastConcept: 'A1 begins Aug' },
    { key: 'math', status: 'green', streak: 0,  syllabus: 0,  pace: 'starts Q3 2027',trend: [], lastConcept: 'NIOS Maths · Q3 2027' },
    { key: 'psy',  status: 'green', streak: 4,  syllabus: 25, pace: 'on schedule',   trend: [4,4,4,5,4,5,5,4,5,5,5,5], lastConcept: 'NCERT Ch 4: Human Development' },
    { key: 'gk',   status: 'green', streak: 48, syllabus: null, pace: '48-day streak',trend: [4,4,5,4,5,5,4,5,5,5,5,5], lastConcept: 'Mizoram Census · Economic Survey' },
    { key: 'vol',  status: 'amber', streak: 0,  syllabus: null, pace: 'last: 3w ago', trend: [], lastConcept: 'Anganwadi · 4 May', flag: 'No session in 3 weeks' },
  ],
  tasks: [
    { id: 't1', kind: 'review',  track: 'bio',  title: 'Spaced review — Day 4',         sub: '"Explain Newton\'s 3rd law in your own words"', xp: 15, due: 'now',     minutes: 4 },
    { id: 't2', kind: 'review',  track: 'chem', title: 'Spaced review — Day 7',         sub: 'Carbonyl group reactions',                        xp: 15, due: 'today',   minutes: 5 },
    { id: 't3', kind: 'gk',      track: 'gk',   title: 'Daily GK quiz',                 sub: '5 questions · keeps your 48-day streak',         xp: 10, due: 'today',   minutes: 3 },
    { id: 't4', kind: 'recall',  track: 'phy',  title: 'Post-class recall — Physics',   sub: "After today's Aakash class (6:30 pm)",           xp: 25, due: 'evening', minutes: 12 },
    { id: 't5', kind: 'journal', track: 'jrn',  title: 'Journal entry',                 sub: '"Thinking, Fast and Slow" — Ch 7 reflection',    xp: 5,  due: 'tonight', minutes: 5 },
  ],
  completedTasks: [],
  reviewsDue: 3,
  milestones: [
    { date: 'Aug 2026', label: 'Goethe A1 begins',       status: 'upcoming' },
    { date: 'Dec 2026', label: 'A1 German exam',          status: 'upcoming' },
    { date: 'Mar 2027', label: 'Class 11 finals',         status: 'upcoming' },
    { date: 'Jul 2027', label: 'B1 German begins',        status: 'upcoming' },
    { date: 'Oct 2027', label: 'NIOS Maths registration', status: 'upcoming' },
    { date: 'Jan 2028', label: 'Ashoka application',      status: 'upcoming' },
    { date: 'Mar 2028', label: 'CBSE Boards',             status: 'upcoming' },
  ],
  activity: [
    { when: 'Mon', what: '+25 XP — Physics post-class recall (Thermodynamics)' },
    { when: 'Mon', what: '+10 XP — GK quiz (4/5)' },
    { when: 'Sun', what: 'Weekly Synthesis Challenge completed (+50)' },
    { when: 'Sun', what: 'Finished Ch 6 — "Thinking, Fast and Slow"' },
    { when: 'Sat', what: 'Goethe trial-lesson reflection logged' },
    { when: 'Fri', what: '+15 XP — Biology spaced review (Day 7, scored 5/5)' },
  ],
  gk: {
    q: 'Which Indian state recorded the highest decadal growth in the 2024 census update?',
    options: ['Bihar', 'Meghalaya', 'Mizoram', 'Nagaland'],
    correct: 2,
    category: 'Demographics · Polity',
  },
  badges: [
    { id: 'b1', name: 'First 30-day GK streak',    earned: true,  date: 'Apr 16' },
    { id: 'b2', name: 'Thermodynamics tackled',     earned: true,  date: 'May 24' },
    { id: 'b3', name: 'Cross-subject connector',    earned: true,  date: 'May 19', sub: '10 connect prompts' },
    { id: 'b4', name: '100 recall sessions',        earned: false, progress: 78 },
    { id: 'b5', name: '50 concepts mastered',       earned: false, progress: 31 },
    { id: 'b6', name: 'A1 German complete',         earned: false, progress: 0 },
    { id: 'b7', name: 'Weekly synthesiser ×4',      earned: false, progress: 3 },
    { id: 'b8', name: '200-day master streak',      earned: false, progress: 18 },
  ],
  conceptMap: {
    track: 'bio',
    modules: [
      { name: 'Diversity in Living World',  green: 14, amber: 2, red: 0, total: 16 },
      { name: 'Structural Organisation',    green: 9,  amber: 3, red: 1, total: 13 },
      { name: 'Cell Structure & Function',  green: 8,  amber: 4, red: 2, total: 14 },
      { name: 'Plant Physiology',           green: 4,  amber: 6, red: 3, total: 13 },
      { name: 'Human Physiology',           green: 3,  amber: 5, red: 8, total: 16, current: true },
    ],
  },
  journal: [
    { id: 'j1', d: 'Yest',   tag: 'bookreflection', title: 'Ch 6 — System 1 / System 2',       body: "Kahneman says we think we're reasoning when we're just rationalising. Most of my \"decisions\" today were just System 1 grabbing whatever was closest…",                                    words: 312 },
    { id: 'j2', d: '21 May', tag: 'currentaffairs',  title: 'The Mizoram demographic story',   body: 'I keep coming back to why that one state. Migration, late demographic transition, and the church-led education push — three threads I want to pull on…',                                words: 198 },
    { id: 'j3', d: '19 May', tag: 'volunteering',    title: 'Saturday at the anganwadi',       body: "The kid with the chalk was reading \"ब-त-ख\" before me. I think she's 4. The \"system\" of these classrooms is mostly older girls running them…",                                      words: 256 },
    { id: 'j4', d: '17 May', tag: 'personal',        title: 'On waiting for Aakash results',   body: 'I refresh the app like 12 times an hour. Why does waiting feel worse than the test itself? Loss aversion, probably.',                                                                    words: 124 },
    { id: 'j5', d: '14 May', tag: 'bookreflection',  title: 'Ch 4 — Heuristics',              body: "Anchoring is everywhere. Even the way I read my own marks — I anchor on the highest score I've ever gotten…",                                                                             words: 287 },
  ],
};

// ── Reducer ───────────────────────────────────────────────────
function reducer(state, action) {
  switch (action.type) {
    case 'COMPLETE_TASK': {
      const task = state.tasks.find(t => t.id === action.id);
      if (!task) return state;
      return {
        ...state,
        completedTasks: [...state.completedTasks, action.id],
        user: { ...state.user, xp: state.user.xp + task.xp },
      };
    }
    case 'ADD_XP':
      return { ...state, user: { ...state.user, xp: state.user.xp + action.amount } };
    case 'INCREMENT_STREAK':
      return { ...state, streaks: { ...state.streaks, [action.key]: state.streaks[action.key] + 1 } };
    case 'ADD_JOURNAL': {
      const entry = { id: 'j' + Date.now(), d: 'Today', ...action.entry };
      return { ...state, journal: [entry, ...state.journal] };
    }
    case 'LOAD':
      return { ...state, ...action.data };
    default:
      return state;
  }
}

// ── Context ───────────────────────────────────────────────────
const AppCtx = createContext(null);

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, INITIAL, (init) => {
    try {
      const saved = localStorage.getItem('ira-state');
      if (saved) return { ...init, ...JSON.parse(saved) };
    } catch {}
    return init;
  });

  // persist to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('ira-state', JSON.stringify(state));
    } catch {}
  }, [state]);

  return <AppCtx.Provider value={{ state, dispatch }}>{children}</AppCtx.Provider>;
}

export function useAppState() {
  return useContext(AppCtx);
}

// ── Track metadata ─────────────────────────────────────────────
export const TRACKS = {
  phy:  { key: 'phy',  name: 'Physics',      short: 'Phy',  color: 'var(--tk-phy)',  icon: 'atom',   group: 'PCB' },
  chem: { key: 'chem', name: 'Chemistry',    short: 'Chem', color: 'var(--tk-chem)', icon: 'beaker', group: 'PCB' },
  bio:  { key: 'bio',  name: 'Biology',      short: 'Bio',  color: 'var(--tk-bio)',  icon: 'dna',    group: 'PCB' },
  ger:  { key: 'ger',  name: 'German',       short: 'Ger',  color: 'var(--tk-ger)',  icon: 'globe',  group: 'Language' },
  math: { key: 'math', name: 'NIOS Maths',   short: 'Math', color: 'var(--tk-math)', icon: 'sigma',  group: 'Core' },
  psy:  { key: 'psy',  name: 'Psychology',   short: 'Psy',  color: 'var(--tk-psy)',  icon: 'brain',  group: 'Core' },
  gk:   { key: 'gk',   name: 'GK & Current', short: 'GK',   color: 'var(--tk-gk)',   icon: 'globe',  group: 'Daily' },
  vol:  { key: 'vol',  name: 'Volunteering', short: 'Vol',  color: 'var(--tk-vol)',  icon: 'heart',  group: 'Profile' },
  jrn:  { key: 'jrn',  name: 'Journal',      short: 'Jrn',  color: 'var(--tk-vol)',  icon: 'pen',    group: 'Profile' },
};

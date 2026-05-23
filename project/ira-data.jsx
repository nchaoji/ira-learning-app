// ira-data.jsx — fixture data for the prototype
// Shaped from the BRD: 7 tracks, 22-month horizon, May 2026

const IRA_STATE = {
  user: { name: 'Ira', level: 7, levelName: 'Navigator', xp: 1240, xpToNext: 1500 },
  streaks: { master: 18, gk: 48, recall: 12, writing: 6 },
  today: {
    day: 'Tuesday',
    date: 'May 26',
    aakash: 'Physics',          // today is an Aakash Physics day
    weather: 'Tue · Aakash day',
  },
  tracks: [
    { key: 'phy',  status: 'green', streak: 12, syllabus: 38, pace: 'on schedule',  trend: [3,3,4,4,3,4,4,5,4,5,4,5], lastConcept: 'Thermodynamics: 2nd Law' },
    { key: 'chem', status: 'amber', streak: 12, syllabus: 35, pace: 'on schedule',  trend: [4,4,3,4,3,3,3,3,2,3,3,3], lastConcept: 'Carbonyl group reactions', flag: 'Organic recall dipping' },
    { key: 'bio',  status: 'green', streak: 12, syllabus: 42, pace: '1 week ahead', trend: [4,4,5,4,5,5,4,5,5,5,4,5], lastConcept: 'Digestion: Enzymes' },
    { key: 'ger',  status: 'green', streak: 0,  syllabus: 0,  pace: 'starts Aug 8', trend: [], lastConcept: 'A1 begins Aug', flag: null, level: 'A1 · Pre-start' },
    { key: 'math', status: 'green', streak: 0,  syllabus: 0,  pace: 'starts Q3 2027', trend: [], lastConcept: 'NIOS Maths · Q3 2027' },
    { key: 'psy',  status: 'green', streak: 4,  syllabus: 25, pace: 'on schedule',  trend: [4,4,4,5,4,5,5,4,5,5,5,5], lastConcept: 'NCERT Ch 4: Human Development' },
    { key: 'gk',   status: 'green', streak: 48, syllabus: null, pace: '48-day streak', trend: [4,4,5,4,5,5,4,5,5,5,5,5], lastConcept: 'Mizoram Census · Economic Survey' },
    { key: 'vol',  status: 'amber', streak: 0,  syllabus: null, pace: 'last: 3w ago',  trend: [], lastConcept: 'Anganwadi · 4 May', flag: 'No session in 3 weeks' },
  ],
  // today's task queue
  tasks: [
    { id: 't1', kind: 'review',   track: 'bio',  title: 'Spaced review — Day 4', sub: '"Explain Newton\'s 3rd law in your own words"', xp: 15, due: 'now',    minutes: 4 },
    { id: 't2', kind: 'review',   track: 'chem', title: 'Spaced review — Day 7', sub: 'Carbonyl group reactions', xp: 15, due: 'today',  minutes: 5 },
    { id: 't3', kind: 'gk',       track: 'gk',   title: 'Daily GK quiz', sub: '5 questions · keeps your 48-day streak', xp: 10, due: 'today', minutes: 3 },
    { id: 't4', kind: 'recall',   track: 'phy',  title: 'Post-class recall — Physics', sub: 'After today\'s Aakash class (6:30 pm)', xp: 25, due: 'evening', minutes: 12 },
    { id: 't5', kind: 'journal',  track: 'jrn',  title: 'Journal entry', sub: '"Thinking, Fast and Slow" — Ch 7 reflection', xp: 5, due: 'tonight', minutes: 5 },
  ],
  reviewsDue: 3,
  // milestones for parent timeline
  milestones: [
    { date: 'Aug 2026', label: 'Goethe A1 begins',     status: 'upcoming' },
    { date: 'Dec 2026', label: 'A1 German exam',        status: 'upcoming' },
    { date: 'Mar 2027', label: 'Class 11 finals',       status: 'upcoming' },
    { date: 'Jul 2027', label: 'B1 German begins',      status: 'upcoming' },
    { date: 'Oct 2027', label: 'NIOS Maths registration', status: 'upcoming' },
    { date: 'Jan 2028', label: 'Ashoka application',    status: 'upcoming' },
    { date: 'Mar 2028', label: 'CBSE Boards',           status: 'upcoming' },
  ],
  // recent activity for parent
  activity: [
    { when: 'Mon', what: '+25 XP — Physics post-class recall (Thermodynamics)' },
    { when: 'Mon', what: '+10 XP — GK quiz (4/5)' },
    { when: 'Sun', what: 'Weekly Synthesis Challenge completed (+50)' },
    { when: 'Sun', what: 'Finished Ch 6 — "Thinking, Fast and Slow"' },
    { when: 'Sat', what: 'Goethe trial-lesson reflection logged' },
    { when: 'Fri', what: '+15 XP — Biology spaced review (Day 7, scored 5/5)' },
  ],
  // GK quiz seed
  gk: {
    q: 'Which Indian state recorded the highest decadal growth in the 2024 census update?',
    options: ['Bihar', 'Meghalaya', 'Mizoram', 'Nagaland'],
    correct: 2,
    category: 'Demographics · Polity',
  },
  // achievement badges
  badges: [
    { id: 'b1', name: 'First 30-day GK streak', earned: true,  date: 'Apr 16' },
    { id: 'b2', name: 'Thermodynamics tackled',  earned: true,  date: 'May 24' },
    { id: 'b3', name: 'Cross-subject connector', earned: true,  date: 'May 19', sub: '10 connect prompts' },
    { id: 'b4', name: '100 recall sessions',     earned: false, progress: 78 },
    { id: 'b5', name: '50 concepts mastered',    earned: false, progress: 31 },
    { id: 'b6', name: 'A1 German complete',      earned: false, progress: 0 },
    { id: 'b7', name: 'Weekly synthesiser ×4',   earned: false, progress: 3 },
    { id: 'b8', name: '200-day master streak',   earned: false, progress: 18 },
  ],
  // concept mastery for Biology
  conceptMap: {
    track: 'bio',
    modules: [
      { name: 'Diversity in Living World', green: 14, amber: 2, red: 0, total: 16 },
      { name: 'Structural Organisation',   green: 9,  amber: 3, red: 1, total: 13 },
      { name: 'Cell Structure & Function', green: 8,  amber: 4, red: 2, total: 14 },
      { name: 'Plant Physiology',          green: 4,  amber: 6, red: 3, total: 13 },
      { name: 'Human Physiology',          green: 3,  amber: 5, red: 8, total: 16, current: true },
    ],
  },
};

window.IRA_STATE = IRA_STATE;

import { Routes, Route, Navigate } from 'react-router-dom';
import Today from './screens/Today.jsx';
import Tracks from './screens/Tracks.jsx';
import Concept from './screens/Concept.jsx';
import Recall from './screens/Recall.jsx';
import GKQuiz from './screens/GKQuiz.jsx';
import Review from './screens/Review.jsx';
import Journal from './screens/Journal.jsx';
import Me from './screens/Me.jsx';
import ParentDashboard from './parent/Dashboard.jsx';
import ParentReadiness from './parent/Readiness.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/today" replace />} />
      <Route path="/today" element={<Today />} />
      <Route path="/tracks" element={<Tracks />} />
      <Route path="/concept" element={<Concept />} />
      <Route path="/recall/:step" element={<Recall />} />
      <Route path="/gk" element={<GKQuiz />} />
      <Route path="/review" element={<Review />} />
      <Route path="/journal" element={<Journal />} />
      <Route path="/me" element={<Me />} />
      <Route path="/parent" element={<ParentDashboard />} />
      <Route path="/parent/readiness" element={<ParentReadiness />} />
    </Routes>
  );
}

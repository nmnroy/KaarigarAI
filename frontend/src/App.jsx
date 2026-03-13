import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PitchDeck from './pages/PitchDeck';

function App() {
  return (
    <Router>
      <div className="font-sans">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/pitch" element={<PitchDeck />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

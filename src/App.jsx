import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import InvitationPage from './InvitationPage';
import InteractiveGlitters from './InteractiveGlitters';
import MusicPlayer from './MusicPlayer';
import './index.css';

function App() {
  const [musicStarted, setMusicStarted] = useState(false);

  const startMusic = () => {
    setMusicStarted(true);
  };

  return (
    <Router>
      <InteractiveGlitters />
      {musicStarted && <MusicPlayer />}
      <Routes>
        <Route path="/" element={<LandingPage onEnvelopeOpen={startMusic} />} />
        <Route path="/invitation" element={<InvitationPage />} />
      </Routes>
    </Router>
  );
}

export default App;

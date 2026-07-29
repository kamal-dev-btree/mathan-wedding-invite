import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = ({ onEnvelopeOpen }) => {
  const navigate = useNavigate();
  const [isOpening, setIsOpening] = useState(false);
  const [showLetter, setShowLetter] = useState(false);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);
    
    // Start music immediately
    if (onEnvelopeOpen) onEnvelopeOpen();
    
    setTimeout(() => setShowLetter(true), 800);
    setTimeout(() => navigate('/invitation'), 2500);
  };

  return (
    <div className="landing-container">
      {/* Floating hearts */}
      <div className="floating-hearts">
        <span className="heart" style={{ left: '10%', animationDelay: '0s' }}>♥</span>
        <span className="heart" style={{ left: '25%', animationDelay: '2s' }}>♥</span>
        <span className="heart" style={{ left: '40%', animationDelay: '4s' }}>♥</span>
        <span className="heart" style={{ left: '60%', animationDelay: '1s' }}>♥</span>
        <span className="heart" style={{ left: '75%', animationDelay: '3s' }}>♥</span>
        <span className="heart" style={{ left: '90%', animationDelay: '5s' }}>♥</span>
      </div>

      <div className="landing-content fade-in">
        <p className="top-text">
          WITH HEARTS FULL OF JOY<br/>WE INVITE YOU TO
        </p>

        {/* 3D Envelope */}
        <div className="env-scene" onClick={handleOpen}>
          <div className={`env ${isOpening ? '' : 'shake-animation'}`}>
            {/* Envelope back */}
            <div className="env-back"></div>

            {/* Letter inside */}
            <div className={`env-letter ${showLetter ? 'env-letter-out' : ''}`}>
              <p className="letter-line1">You're Invited!</p>
              <p className="letter-line2">M & M</p>
            </div>

            {/* Envelope front bottom half */}
            <div className="env-front"></div>

            {/* Top flap — folds open */}
            <div className={`env-flap ${isOpening ? 'env-flap-open' : ''}`}></div>

            {/* Wax seal */}
            <div className={`env-seal ${isOpening ? 'env-seal-gone' : ''}`}>
              M&M
            </div>
          </div>

          {!isOpening && <p className="tap-hint">Tap to open</p>}
        </div>

        <div className="names-container">
          <h1 className="name-script">Mathanraj</h1>
          <div className="ampersand">&</div>
          <h1 className="name-script">Mithuna</h1>
        </div>

        <p className="event-type">RECEPTION & WEDDING CELEBRATION</p>
        <p className="event-date-text">11 · NOV · 2026 · RASIPURAM</p>
      </div>
    </div>
  );
};

export default LandingPage;

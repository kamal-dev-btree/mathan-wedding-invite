import React, { useState, useEffect } from 'react';
import { MapPin, CalendarHeart, Clock } from 'lucide-react';
import ScratchCard from './ScratchCard';
import './InvitationPage.css';
import './RevealDesign.css';
import './EventDetails.css';

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  return (
    <div className="countdown-wrapper">
      {Object.keys(timeLeft).length ? (
        <div className="timer-grid">
          <div className="time-box">
            <span className="time-value">{timeLeft.days}</span>
            <span className="time-label">Days</span>
          </div>
          <div className="time-box">
            <span className="time-value">{timeLeft.hours}</span>
            <span className="time-label">Hours</span>
          </div>
          <div className="time-box">
            <span className="time-value">{timeLeft.minutes}</span>
            <span className="time-label">Mins</span>
          </div>
          <div className="time-box">
            <span className="time-value">{timeLeft.seconds}</span>
            <span className="time-label">Secs</span>
          </div>
        </div>
      ) : (
        <span>It's Wedding Day! 🎉</span>
      )}
    </div>
  );
};

import couple1 from './assets/couple1.png';

const ImageCarousel = () => {
  return (
    <div className="carousel-container" style={{ 
      position: 'relative', 
      width: '100%', 
      maxWidth: '450px', 
      margin: '0 auto 30px auto', 
      aspectRatio: '4/5', 
      overflow: 'hidden', 
      borderRadius: '20px', 
      maskImage: 'radial-gradient(ellipse at center, black 60%, transparent 100%)',
      WebkitMaskImage: 'radial-gradient(ellipse at center, black 60%, transparent 100%)'
    }}>
      <img 
        src={couple1} 
        alt="Couple" 
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }} 
      />
    </div>
  );
};

const InvitationPage = () => {
  return (
    <div className="invitation-container">
      <div className="bg-pattern"></div>
      
      {/* Header Section */}
      <section className="section hero-section fade-in">
        <h2 className="script-title">Mathanraj <span className="script-ampersand">&</span> Mithuna</h2>
        <p className="hero-quote">
          "Together with love, we invite you to celebrate our special moments..."
        </p>
      </section>

      <div className="section-divider"><span className="divider-line"></span><span className="divider-icon">♥</span><span className="divider-line"></span></div>

      {/* Our Journey Section */}
      <section className="section journey-section" style={{ padding: '20px 20px 60px 20px' }}>
        <p className="scratch-hint">✦ Cherished moments ✦</p>
        <h2 className="section-title">A Love Story in Frame</h2>
        <div className="borderless-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <ImageCarousel />
          <p className="quote-text" style={{ 
            marginTop: '10px', 
            textShadow: '0 2px 10px rgba(255,255,255,0.9), 0 0 20px rgba(255,255,255,0.8)',
            position: 'relative',
            zIndex: 2,
            padding: '0 20px'
          }}>
            "Two hearts choosing each other — this is where the forever begins, with a ring and a promise that love is home."
          </p>
        </div>
      </section>

      <div className="section-divider"><span className="divider-line"></span><span className="divider-icon">♥</span><span className="divider-line"></span></div>
      {/* Our Celebrations Section */}
      <section className="section celebrations-section">
        <p className="scratch-hint">✦ Save the Dates ✦</p>
        <h2 className="section-title">Our Celebrations</h2>
        <p className="scratch-hint" style={{ marginBottom: '25px' }}>✦ scratch the card to reveal ✦</p>
        
        <ScratchCard 
          coverText="Scratch Here"
          revealContent={
            <div className="reveal-new-design">
              <p className="reveal-month">NOV · 2026</p>
              <h1 className="reveal-date-number">11</h1>
              <h2 className="reveal-event-name">Wedding Day</h2>
              <div className="reveal-line"></div>
              <p className="reveal-venue">9 : 00 AM · RANGASAMY MANDABAM</p>
            </div>
          }
        />
      </section>

      <div className="section-divider"><span className="divider-line"></span><span className="divider-icon">♥</span><span className="divider-line"></span></div>

      {/* ===== DAY 1 · RECEPTION ===== */}
      <section className="section event-detail-section">
        <div className="event-block">
          <div className="day-banner">
            <div className="day-banner-line"></div>
            <span className="day-banner-text">DAY 1 · RECEPTION</span>
            <div className="day-banner-line"></div>
          </div>
          <div className="event-detail-card">
            <div className="event-stars">✦ · ✦</div>
            <h2 className="event-title-script">Reception</h2>

            <div className="event-info-row">
              <span className="event-info-icon">📅</span>
              <span className="event-info-label">DATE</span>
              <span className="event-info-dot">·</span>
              <span className="event-info-value">11 Nov 2026 · Wednesday</span>
            </div>
            <div className="event-info-row">
              <span className="event-info-icon">🕖</span>
              <span className="event-info-label">TIME</span>
              <span className="event-info-dot">·</span>
              <span className="event-info-value">7:00 PM onwards</span>
            </div>
            <div className="event-info-row">
              <span className="event-info-icon">🏛️</span>
              <span className="event-info-label">VENUE</span>
              <span className="event-info-dot">·</span>
              <span className="event-info-value">Rangasamy Thirumana Mandabam, Rasipuram</span>
            </div>

            <p className="event-detail-quote">
              "Two hearts choosing each other — this is where the forever begins, with a ring and a promise that love is home."
            </p>

            <p className="event-cta">✦ JOIN US FOR THIS JOYFUL BEGINNING ✦</p>
          </div>
        </div>
      </section>

      {/* ===== DAY 2 · WEDDING ===== */}
      <section className="section event-detail-section">
        <div className="event-block">
          <div className="day-banner">
            <div className="day-banner-line"></div>
            <span className="day-banner-text">DAY 2 · WEDDING</span>
            <div className="day-banner-line"></div>
          </div>
          <div className="event-detail-card">
            <div className="event-stars">✦ · ✦</div>
            <h2 className="event-title-script">Wedding</h2>

            <div className="event-info-row">
              <span className="event-info-icon">📅</span>
              <span className="event-info-label">DATE</span>
              <span className="event-info-dot">·</span>
              <span className="event-info-value">11 Nov 2026 · Wednesday</span>
            </div>
            <div className="event-info-row">
              <span className="event-info-icon">🕘</span>
              <span className="event-info-label">TIME</span>
              <span className="event-info-dot">·</span>
              <span className="event-info-value">9:00 AM · Muhurtham</span>
            </div>
            <div className="event-info-row">
              <span className="event-info-icon">🏛️</span>
              <span className="event-info-label">VENUE</span>
              <span className="event-info-dot">·</span>
              <span className="event-info-value">Rangasamy Thirumana Mandabam, Rasipuram</span>
            </div>

            <p className="event-detail-quote">
              "Today two souls become one — blessed by the sacred fire, bound by family, and carried forward by the grace of love."
            </p>

            <p className="event-cta">✦ WITNESS OUR MOST SACRED UNION ✦</p>
          </div>
        </div>
      </section>

      <div className="section-divider"><span className="divider-line"></span><span className="divider-icon">♥</span><span className="divider-line"></span></div>

      {/* The Venue Section */}
      <section className="section venue-section">
        <h2 className="section-title">The Venue</h2>
        <div className="card-container venue-card" style={{ flexDirection: 'column' }}>
          <div className="venue-details" style={{ width: '100%', textAlign: 'center' }}>
            <h3>Rangasamy Thirumana Mandabam</h3>
            <p style={{ justifyContent: 'center' }}><MapPin size={16} className="inline-icon" /> R.Pattanam, near Govt. Higher Secondary School, Rasipuram, Tamil Nadu 637408</p>
            <p className="features">Ample parking · AC hall · Traditional setting</p>
            
            <iframe 
              src="https://maps.google.com/maps?q=Rangasamy+Thirumana+Mandabam,+Rasipuram,+Tamil+Nadu&t=&z=15&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="300" 
              style={{ border: 0, borderRadius: '12px', marginTop: '20px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }} 
              allowFullScreen="" 
              loading="lazy"
              title="Venue Map"
            ></iframe>
            
            <a 
              href="https://www.google.com/maps/search/?api=1&query=Rangasamy+Thirumana+Mandabam+Rasipuram" 
              target="_blank" 
              rel="noreferrer"
              className="btn-primary"
              style={{ display: 'inline-block', marginTop: '25px' }}
            >
              ↗ Open in Google Maps App
            </a>
          </div>
        </div>
      </section>

      <div className="section-divider"><span className="divider-line"></span><span className="divider-icon">♥</span><span className="divider-line"></span></div>

      {/* Counting Down Section */}
      <section className="section countdown-section">
        <h2 className="section-title">Counting Down</h2>
        <p className="countdown-desc">
          With joyful hearts and the blessings of our families, we invite you to witness the beginning of our beautiful forever.
        </p>
        <p className="event-date">
          <Clock size={16} className="inline-icon"/> 11 · 11 · 2026 · Rangasamy Thirumana Mandabam, Rasipuram
        </p>
        
        <CountdownTimer targetDate="2026-11-11T09:00:00" />
      </section>
      
      <footer className="footer">
        <div className="footer-hearts">♥ ♥ ♥</div>
        <p>Made with ❤️ for Mathanraj & Mithuna</p>
      </footer>
    </div>
  );
};

export default InvitationPage;

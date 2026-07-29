import React, { useState, useRef, useEffect } from 'react';
import './MusicPlayer.css';
import bgmAudio from './assets/bgm.mp3';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    // Initialize audio element
    const audio = new Audio(bgmAudio);
    audio.loop = true;
    audio.currentTime = 47; // Start at 47th second
    audioRef.current = audio;

    // Attempt to play immediately
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.log("Autoplay was prevented by browser:", error);
        setIsPlaying(false);
      });
    }

    // Cleanup on unmount
    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <button
      className={`music-btn ${isPlaying ? 'music-playing' : ''}`}
      onClick={toggleMusic}
      aria-label={isPlaying ? 'Pause music' : 'Play music'}
    >
      <span className="music-icon">♪</span>
      <span className="music-label">{isPlaying ? 'ON' : 'OFF'}</span>
    </button>
  );
};

export default MusicPlayer;

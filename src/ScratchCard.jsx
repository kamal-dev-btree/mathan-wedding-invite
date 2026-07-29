import React, { useRef, useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import './ScratchCard.css';

const ScratchCard = ({ revealContent, coverText }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isScratched, setIsScratched] = useState(false);
  const [showReveal, setShowReveal] = useState(false);

  // Confetti burst on reveal
  useEffect(() => {
    if (isScratched) {
      setShowReveal(true);
      const duration = 3 * 1000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 70,
          origin: { x: 0, y: 0.6 },
          colors: ['#e58a9e', '#d4af37', '#ffffff', '#f9a8ba', '#FFD700']
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 70,
          origin: { x: 1, y: 0.6 },
          colors: ['#e58a9e', '#d4af37', '#ffffff', '#f9a8ba', '#FFD700']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [isScratched]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const container = containerRef.current;
    
    let isDrawing = false;
    let scratchedPixels = 0;
    
    const resizeCanvas = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      
      // Solid pink gradient cover — fully opaque
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#e58a9e');
      gradient.addColorStop(0.5, '#f2a3b5');
      gradient.addColorStop(1, '#f9b8c6');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Decorative dots pattern
      ctx.fillStyle = 'rgba(255,255,255,0.08)';
      for (let x = 0; x < canvas.width; x += 20) {
        for (let y = 0; y < canvas.height; y += 20) {
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Main text
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = 'rgba(0,0,0,0.15)';
      ctx.shadowBlur = 6;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Icon
      ctx.font = '48px serif';
      ctx.fillText('🎁', canvas.width / 2, canvas.height / 2 - 50);
      
      // Title
      ctx.font = 'bold 28px "Cormorant Garamond", serif';
      ctx.fillText('Scratch to Reveal', canvas.width / 2, canvas.height / 2 + 10);
      
      ctx.shadowBlur = 0;
      ctx.font = '14px "Montserrat", sans-serif';
      ctx.fillStyle = 'rgba(255,255,255,0.75)';
      ctx.fillText('Use your finger or mouse', canvas.width / 2, canvas.height / 2 + 45);
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const getMousePos = (evt) => {
      const rect = canvas.getBoundingClientRect();
      const x = (evt.clientX || (evt.touches && evt.touches[0].clientX)) - rect.left;
      const y = (evt.clientY || (evt.touches && evt.touches[0].clientY)) - rect.top;
      return { x, y };
    };

    const handleScratchStart = (e) => {
      isDrawing = true;
      scratch(e);
    };

    const handleScratchMove = (e) => {
      if (!isDrawing) return;
      scratch(e);
    };

    const handleScratchEnd = () => {
      isDrawing = false;
      checkScratched();
    };

    const scratch = (e) => {
      e.preventDefault();
      const pos = getMousePos(e);
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 50, 0, Math.PI * 2);
      ctx.fill();
      scratchedPixels++;
      
      if(scratchedPixels % 8 === 0) checkScratched();
    };

    const checkScratched = () => {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      let transparentPixels = 0;
      for (let i = 3; i < data.length; i += 4) {
        if (data[i] === 0) transparentPixels++;
      }
      
      const totalPixels = data.length / 4;
      const percentage = (transparentPixels / totalPixels) * 100;
      
      if (percentage > 40 && !isScratched) {
        setIsScratched(true);
      }
    };

    canvas.addEventListener('mousedown', handleScratchStart);
    canvas.addEventListener('mousemove', handleScratchMove);
    canvas.addEventListener('mouseup', handleScratchEnd);
    canvas.addEventListener('mouseleave', handleScratchEnd);
    
    canvas.addEventListener('touchstart', handleScratchStart, { passive: false });
    canvas.addEventListener('touchmove', handleScratchMove, { passive: false });
    canvas.addEventListener('touchend', handleScratchEnd);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if(canvas) {
        canvas.removeEventListener('mousedown', handleScratchStart);
        canvas.removeEventListener('mousemove', handleScratchMove);
        canvas.removeEventListener('mouseup', handleScratchEnd);
        canvas.removeEventListener('mouseleave', handleScratchEnd);
        
        canvas.removeEventListener('touchstart', handleScratchStart);
        canvas.removeEventListener('touchmove', handleScratchMove);
        canvas.removeEventListener('touchend', handleScratchEnd);
      }
    };
  }, [coverText, isScratched]);

  return (
    <div className="scratch-container" ref={containerRef}>
      <div className={`reveal-content ${showReveal ? 'reveal-pop' : ''}`}>
        {revealContent}
      </div>
      <canvas 
        ref={canvasRef} 
        className={`scratch-canvas ${isScratched ? 'scratched-fade' : ''}`}
      />
    </div>
  );
};

export default ScratchCard;

import React, { useEffect, useState } from 'react';
import './AmbientBackground.css';

const AmbientBackground = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = [];
    // Generate 40 particles: 20 gold dust, 20 petals
    for (let i = 0; i < 40; i++) {
      const isPetal = i % 2 === 0;
      newParticles.push({
        id: i,
        type: isPetal ? 'petal' : 'dust',
        left: Math.random() * 100 + '%',
        top: Math.random() * 100 + '%',
        animationDuration: (Math.random() * 15 + 10) + 's', // 10s to 25s
        animationDelay: '-' + (Math.random() * 20) + 's',
        size: isPetal ? (Math.random() * 10 + 15) + 'px' : (Math.random() * 3 + 2) + 'px',
        opacity: Math.random() * 0.5 + 0.2
      });
    }
    setParticles(newParticles);
  }, []);

  return (
    <div className="ambient-container">
      {particles.map(p => (
        <div 
          key={p.id}
          className={`particle ${p.type}`}
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationDuration: p.animationDuration,
            animationDelay: p.animationDelay
          }}
        ></div>
      ))}
      <div className="ambient-overlay"></div>
    </div>
  );
};

export default AmbientBackground;

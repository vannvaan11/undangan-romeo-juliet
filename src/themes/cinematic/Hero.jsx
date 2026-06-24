import React, { useEffect, useState } from 'react';

const Hero = ({ config, onOpen }) => {
  const [opened, setOpened] = useState(false);

  const handleOpen = () => {
    setOpened(true);
    onOpen();
  };

  return (
    <div className={`cover-overlay ${opened ? 'opened' : ''}`} style={{
      backgroundColor: 'var(--color-primary)',
      backgroundImage: `url('/assets/dark_floral.png')`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundBlendMode: 'overlay'
    }}>
      <div className="cover-content fade-in visible" style={{ position: 'relative', zIndex: 10 }}>
        <p className="font-accent" style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'var(--color-accent)', textShadow: '0 4px 10px rgba(0,0,0,0.5)' }}>
          The Wedding Of
        </p>
        <h1 style={{ 
          fontSize: '4.5rem', lineHeight: '1', marginBottom: '1rem', 
          color: 'var(--color-text-light)',
          textShadow: '0 4px 15px rgba(0,0,0,0.6)',
          letterSpacing: '-2px'
        }}>
          {config.groom.namaPanggilan}<br/>
          <span className="font-accent" style={{fontSize: '3rem', color: 'var(--color-accent)'}}>&</span><br/>
          {config.bride.namaPanggilan}
        </h1>
        
        <div style={{ width: '1px', height: '60px', backgroundColor: 'var(--color-accent)', margin: '2rem auto' }}></div>

        <p style={{ fontSize: '1rem', marginBottom: '2rem', letterSpacing: '4px', color: 'var(--color-secondary)' }}>
          {config.tanggalTampilan}
        </p>
        
        <button onClick={handleOpen} className="btn-primary" style={{ padding: '1rem 3rem', letterSpacing: '2px', backgroundColor: 'transparent', border: '1px solid var(--color-accent)', color: 'var(--color-accent)' }}>
          BUKA UNDANGAN
        </button>
      </div>
    </div>
  );
};

export default Hero;

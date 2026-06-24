import React, { useState, useEffect, useRef } from 'react';
import Hero from './components/Hero';
import Profiles from './components/Profiles';
import EventDetails from './components/EventDetails';
import Gallery from './components/Gallery';
import RSVP from './components/RSVP';
import DigitalEnvelope from './components/DigitalEnvelope';
import MusicPlayer from './components/MusicPlayer';
import AmbientBackground from './components/AmbientBackground';
import AdminPanel, { getConfig } from './components/AdminPanel';
import './index.css';

function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [config, setConfig] = useState(() => getConfig());

  const handleOpenInvitation = () => {
    setIsOpened(true);
    setIsPlaying(true);
    document.body.style.overflowY = 'auto';
  };

  const cursorRef = useRef(null);

  // Check for ?admin in URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('admin')) {
      setShowAdmin(true);
    }
  }, []);

  // Apply theme colors from config
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', config.tema.primary);
    root.style.setProperty('--color-primary-light', config.tema.primaryLight);
    root.style.setProperty('--color-secondary', config.tema.secondary);
    root.style.setProperty('--color-accent', config.tema.accent);
    root.style.setProperty('--color-text-light', config.tema.textLight);
    root.style.setProperty('--color-text-muted', config.tema.textMuted);
    document.body.style.backgroundColor = config.tema.bgBody;
  }, [config]);

  useEffect(() => {
    document.body.style.overflowY = 'hidden';

    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top = e.clientY + 'px';
      }
    };
    const handleMouseOver = (e) => {
      if (e.target.tagName?.toLowerCase() === 'button' || e.target.tagName?.toLowerCase() === 'a' || e.target.closest?.('button') || e.target.closest?.('a')) {
        cursorRef.current?.classList.add('hovering');
      }
    };
    const handleMouseOut = () => {
      cursorRef.current?.classList.remove('hovering');
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.body.style.overflowY = 'auto';
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    }
  }, []);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const handleCloseAdmin = () => {
    setShowAdmin(false);
    setConfig(getConfig()); // reload config after admin closes
    // Remove ?admin from URL without reload
    const url = new URL(window.location);
    url.searchParams.delete('admin');
    window.history.replaceState({}, '', url);
  };

  // Admin Panel
  if (showAdmin) {
    return <AdminPanel onClose={handleCloseAdmin} />;
  }

  return (
    <>
      <div ref={cursorRef} className="custom-cursor"></div>
      <div className="container">
        {isOpened && <AmbientBackground />}
        <Hero config={config} onOpen={handleOpenInvitation} />

        {isOpened && (
          <div style={{ animation: 'fadeInUp 1.5s cubic-bezier(0.25, 1, 0.5, 1) forwards' }}>
            <Profiles config={config} />
            <EventDetails config={config} />
            <Gallery config={config} />
            <DigitalEnvelope config={config} />
            <RSVP />

            {/* ── CLOSING SECTION ── */}
            <footer style={{
              textAlign: 'center', padding: '5rem 2rem 4rem',
              position: 'relative', overflow: 'hidden',
              borderTop: '1px solid rgba(212,175,55,0.15)'
            }}>
              <div style={{
                position: 'absolute', top: '-40px', left: '50%', transform: 'translateX(-50%)',
                width: '250px', height: '250px',
                backgroundImage: `url('/assets/dark_floral.png')`,
                backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center',
                opacity: 0.12, pointerEvents: 'none', mixBlendMode: 'screen'
              }}></div>

              <div style={{ width: '1px', height: '60px', background: 'linear-gradient(to bottom, transparent, var(--color-accent))', margin: '0 auto 2rem' }}></div>

              <p style={{ fontFamily: 'var(--font-accent)', fontSize: '1.2rem', color: 'rgba(212,175,55,0.7)', letterSpacing: '2px', marginBottom: '0.5rem' }}>
                {config.penutup.salam}
              </p>
              <h2 style={{
                fontFamily: 'var(--font-accent)', fontSize: '4rem',
                color: 'var(--color-text-light)', lineHeight: '1.1', marginBottom: '2rem',
                textShadow: '0 4px 20px rgba(0,0,0,0.5)'
              }}>
                {config.groom.namaLengkap.split(' ')[0]} & {config.bride.namaLengkap.split(' ')[0]}
              </h2>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center', marginBottom: '2rem' }}>
                <div style={{ width: '60px', height: '1px', background: 'rgba(212,175,55,0.4)' }}></div>
                <span style={{ color: 'var(--color-accent)', fontSize: '1.2rem' }}>✦</span>
                <div style={{ width: '60px', height: '1px', background: 'rgba(212,175,55,0.4)' }}></div>
              </div>

              <p style={{ fontSize: '0.85rem', letterSpacing: '2px', color: 'rgba(253,253,253,0.35)', lineHeight: '2' }}>
                {config.akad.tanggal.toUpperCase()}<br />{config.penutup.lokasi}
              </p>
              <p style={{ marginTop: '3rem', fontSize: '0.7rem', color: 'rgba(253,253,253,0.2)', letterSpacing: '3px' }}>
                {config.penutup.branding}
              </p>
            </footer>
          </div>
        )}

        {isOpened && <MusicPlayer isPlaying={isPlaying} togglePlay={togglePlay} />}

        {/* Floating Admin Button — only visible in dev */}
        {!isOpened && (
          <button
            onClick={() => setShowAdmin(true)}
            title="Buka Admin Panel"
            style={{
              position: 'fixed', bottom: '2rem', left: '1.5rem', zIndex: 999,
              width: '44px', height: '44px', borderRadius: '50%',
              background: 'rgba(26,38,57,0.85)', border: '1px solid rgba(212,175,55,0.3)',
              color: '#D4AF37', fontSize: '1.2rem',
              display: 'flex', justifyContent: 'center', alignItems: 'center',
              cursor: 'pointer', backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
            }}
          >⚙️</button>
        )}
      </div>
    </>
  );
}

export default App;

import React, { useState, useEffect, Suspense, useRef } from 'react';
import MusicPlayer from './components/MusicPlayer';
import AdminPanel, { getConfig } from './components/AdminPanel';
import './index.css';

// Lazy load themes
const CinematicTheme = React.lazy(() => import('./themes/cinematic/index.jsx'));
const MinimalistTheme = React.lazy(() => import('./themes/minimalist/index.jsx'));
const RusticTheme = React.lazy(() => import('./themes/rustic/index.jsx'));
const EditorialTheme = React.lazy(() => import('./themes/editorial/index.jsx'));
const RoyalTheme = React.lazy(() => import('./themes/royal/index.jsx'));

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

  // Reset isOpened when theme layout changes
  const prevLayoutRef = useRef(config.layout);
  useEffect(() => {
    if (prevLayoutRef.current !== config.layout) {
      prevLayoutRef.current = config.layout;
      setIsOpened(false);
      setIsPlaying(false);
      document.body.style.overflowY = 'hidden';
    }
  }, [config.layout]);

  const cursorRef = useRef(null);

  useEffect(() => {
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

  // Render Active Theme
  const renderTheme = () => {
    const props = { config, isOpened, onOpen: handleOpenInvitation };
    
    switch (config.layout) {
      case 'cinematic':
        return <CinematicTheme {...props} />;
      case 'minimalist':
        return <MinimalistTheme {...props} />;
      case 'rustic':
        return <RusticTheme {...props} />;
      case 'editorial':
        return <EditorialTheme {...props} />;
      case 'royal':
        return <RoyalTheme {...props} />;
      default:
        return <CinematicTheme {...props} />;
    }
  };

  return (
    <>
      <div ref={cursorRef} className="custom-cursor"></div>
      <div style={{ width: '100%', minHeight: '100vh' }}>
        <Suspense fallback={<div style={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent)'}}>Memuat Undangan...</div>}>
          {renderTheme()}
        </Suspense>
      </div>

      <MusicPlayer isPlaying={isPlaying} togglePlay={togglePlay} url="/assets/music.mp3" />

      {/* ADMIN PANEL TOGGLE (Only visible if not opened yet) */}
      {!isOpened && (
        <button
          onClick={() => setShowAdmin(true)}
          style={{
            position: 'fixed', bottom: '1rem', left: '1rem', zIndex: 9999,
            background: 'rgba(0,0,0,0.5)', color: '#fff', border: 'none',
            borderRadius: '50%', width: '40px', height: '40px',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}
          title="Buka Panel Admin"
        >
          ⚙️
        </button>
      )}
    </>
  );
}

export default App;

import React, { useRef, useEffect } from 'react';

const MusicPlayer = ({ isPlaying, togglePlay }) => {
  return (
    <button
      className="music-player"
      onClick={togglePlay}
      aria-label={isPlaying ? 'Pause music' : 'Play music'}
      title={isPlaying ? 'Pause Musik' : 'Putar Musik'}
    >
      {isPlaying ? (
        /* Pause icon - two bars */
        <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--color-accent)">
          <rect x="6" y="4" width="4" height="16" rx="1"/>
          <rect x="14" y="4" width="4" height="16" rx="1"/>
        </svg>
      ) : (
        /* Play icon */
        <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--color-accent)">
          <polygon points="5,3 19,12 5,21"/>
        </svg>
      )}

      {/* Pulsing ring when playing */}
      {isPlaying && (
        <span style={{
          position: 'absolute', inset: '-6px',
          borderRadius: '50%',
          border: '1px solid rgba(212,175,55,0.4)',
          animation: 'pulseRing 2s ease-out infinite'
        }}></span>
      )}
    </button>
  );
};

export default MusicPlayer;

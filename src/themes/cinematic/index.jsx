import React from 'react';
import Hero from './Hero';
import Profiles from './Profiles';
import EventDetails from './EventDetails';
import Gallery from './Gallery';
import DigitalEnvelope from './DigitalEnvelope';
import RSVP from './RSVP';
import AmbientBackground from '../../components/AmbientBackground';

const CinematicTheme = ({ config, isOpened, onOpen }) => {
  return (
    <div className="container theme-cinematic">
      {isOpened && <AmbientBackground />}
      <Hero config={config} onOpen={onOpen} />

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
          </footer>
        </div>
      )}
    </div>
  );
};

export default CinematicTheme;

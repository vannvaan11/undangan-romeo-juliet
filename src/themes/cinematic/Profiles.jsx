import React, { useEffect, useRef } from 'react';

const Profiles = ({ config }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) { entry.target.classList.add('visible'); }
          else { entry.target.classList.remove('visible'); }
        });
      },
      { threshold: 0.2 }
    );
    const elements = sectionRef.current.querySelectorAll('.fade-in, .zoom-in');
    elements.forEach((el) => observer.observe(el));
    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  const { groom, bride } = config;

  const renderProfile = (person) => (
    <div className="fade-in" style={{ textAlign: 'center', maxWidth: '350px', position: 'relative', zIndex: 1 }}>
      <div style={{ width: '240px', height: '320px', margin: '0 auto 1.5rem', position: 'relative' }}>
        <div className="mask-arch" style={{ position: 'absolute', inset: '-3px', background: 'linear-gradient(to bottom, var(--color-accent), rgba(212,175,55,0.3))' }}></div>
        <div className="mask-arch" style={{ position: 'absolute', inset: '0', overflow: 'hidden' }}>
          <img src={person.foto} alt={person.namaPanggilan} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>
      <p className="font-accent" style={{ color: 'var(--color-accent)', fontSize: '1.5rem', marginBottom: '0' }}>{person.label}</p>
      <h3 style={{ fontSize: '2.5rem', color: 'var(--color-text-light)', letterSpacing: '2px', marginBottom: '0.5rem' }}>{person.namaPanggilan}</h3>
      <p style={{ color: 'rgba(253,253,253,0.55)', fontSize: '0.9rem', fontStyle: 'italic' }}>{person.orangTua}</p>
    </div>
  );

  return (
    <section ref={sectionRef} className="section-padding">
      <div className="section-title fade-in">
        <p>Mempelai</p>
        <h2>BRIDE & GROOM</h2>
        <div style={{ width: '50px', height: '1px', backgroundColor: 'var(--color-accent)', margin: '1rem auto' }}></div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', alignItems: 'center', position: 'relative' }}>
        <div className="zoom-in" style={{
          position: 'absolute', top: '20%', left: '-20%', width: '300px', height: '300px',
          backgroundImage: `url('/assets/dark_floral.png')`,
          backgroundSize: 'contain', backgroundRepeat: 'no-repeat',
          opacity: 0.1, zIndex: 0, pointerEvents: 'none', mixBlendMode: 'screen'
        }}></div>

        {renderProfile(groom)}
        <h2 className="font-accent zoom-in" style={{ fontSize: '5rem', color: 'var(--color-accent)', margin: '-2rem 0' }}>&</h2>
        {renderProfile(bride)}
      </div>
    </section>
  );
};

export default Profiles;

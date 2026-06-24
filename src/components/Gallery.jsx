import React, { useRef, useEffect } from 'react';

const Gallery = ({ config }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) { entry.target.classList.add('visible'); }
          else { entry.target.classList.remove('visible'); }
        });
      },
      { threshold: 0.1 }
    );
    const elements = sectionRef.current.querySelectorAll('.zoom-in, .fade-in');
    elements.forEach((el) => observer.observe(el));
    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <section ref={sectionRef} className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '1px', height: '80px', background: 'linear-gradient(to bottom, transparent, var(--color-accent))' }}></div>

      <div className="section-title zoom-in" style={{ paddingTop: '3rem' }}>
        <p style={{ fontFamily: 'var(--font-accent)', fontSize: '2rem', color: 'var(--color-accent)' }}>Our Story</p>
        <h2 style={{ color: 'var(--color-text-light)', fontSize: '2.5rem', letterSpacing: '4px' }}>GALLERY</h2>
        <div style={{ width: '50px', height: '1px', backgroundColor: 'var(--color-accent)', margin: '1rem auto' }}></div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        {config.galeri.map((photo, index) => (
          <div key={index} className="zoom-in" style={{
            gridColumn: photo.span === 'wide' ? 'span 2' : 'span 1',
            aspectRatio: photo.span === 'wide' ? '16/9' : '3/4',
            borderRadius: 'var(--radius-sm)', overflow: 'hidden',
            border: '1px solid rgba(212, 175, 55, 0.2)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            transitionDelay: `${index * 0.15}s`
          }}>
            <img src={photo.src} alt={`Gallery ${index + 1}`} style={{
              width: '100%', height: '100%', objectFit: 'cover',
              transition: 'transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
              filter: 'brightness(0.85)'
            }}
              onMouseOver={e => { e.currentTarget.style.transform = 'scale(1.08)'; e.currentTarget.style.filter = 'brightness(1)'; }}
              onMouseOut={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.filter = 'brightness(0.85)'; }}
            />
          </div>
        ))}
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '1px', height: '80px', background: 'linear-gradient(to top, transparent, var(--color-accent))' }}></div>
    </section>
  );
};

export default Gallery;

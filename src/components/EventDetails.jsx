import React, { useEffect, useState, useRef } from 'react';

const EventDetails = ({ config }) => {
  const sectionRef = useRef(null);
  const targetDate = new Date(config.tanggalAcara).getTime();
  const [timeLeft, setTimeLeft] = useState({ hari: 0, jam: 0, menit: 0, detik: 0 });

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
    const elements = sectionRef.current.querySelectorAll('.fade-in, .zoom-in');
    elements.forEach((el) => observer.observe(el));

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance < 0) { clearInterval(interval); return; }
      setTimeLeft({
        hari: Math.floor(distance / (1000 * 60 * 60 * 24)),
        jam: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        menit: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        detik: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => { elements.forEach((el) => observer.unobserve(el)); clearInterval(interval); };
  }, [targetDate]);

  const { akad, resepsi } = config;

  const renderEvent = (event) => (
    <div className="fade-in glass-panel" style={{ padding: '3rem 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', backgroundImage: `url('/assets/dark_floral.png')`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', opacity: 0.15, pointerEvents: 'none', mixBlendMode: 'screen' }}></div>
      <p className="font-accent" style={{ fontSize: '2.5rem', color: 'var(--color-accent)', marginBottom: '0.5rem', lineHeight: '1' }}>{event.subjudul}</p>
      <h3 style={{ fontSize: '2rem', color: 'var(--color-text-light)', marginBottom: '1rem', letterSpacing: '2px' }}>{event.judul}</h3>
      <p style={{ fontWeight: 'bold', marginBottom: '0.5rem', letterSpacing: '1px' }}>{event.tanggal}</p>
      <p style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>{event.waktu}</p>
      <div style={{ width: '30px', height: '1px', backgroundColor: 'var(--color-accent)', margin: '1rem auto' }}></div>
      <p style={{ marginBottom: '1.5rem', fontSize: '0.9rem', fontStyle: 'italic' }}>
        <strong>{event.tempat}</strong><br />{event.alamat}
      </p>
      <a href={event.linkMaps} target="_blank" rel="noreferrer" className="btn-outline" style={{ borderColor: 'var(--color-accent)', color: 'var(--color-accent)' }}>Lihat Lokasi</a>
    </div>
  );

  return (
    <section ref={sectionRef} className="section-padding">
      <div className="section-title fade-in">
        <p>Detail Acara</p>
        <h2>WEDDING EVENT</h2>
        <div style={{ width: '50px', height: '1px', backgroundColor: 'var(--color-accent)', margin: '1rem auto' }}></div>
      </div>

      <div className="zoom-in glass-panel-dark" style={{ padding: '2rem', marginBottom: '3rem', textAlign: 'center', border: '1px solid var(--color-accent)' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-accent)' }}>Menuju Hari Bahagia</h3>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} style={{ background: 'transparent', width: '70px', height: '70px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '1px solid rgba(212, 175, 55, 0.3)', borderRadius: 'var(--radius-sm)' }}>
              <span style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--color-text-light)' }}>{value}</span>
              <span style={{ fontSize: '0.6rem', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--color-accent)' }}>{unit}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {renderEvent(akad)}
        {renderEvent(resepsi)}
      </div>
    </section>
  );
};

export default EventDetails;

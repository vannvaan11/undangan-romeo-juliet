import React, { useRef, useEffect, useState } from 'react';

const DigitalEnvelope = ({ config }) => {
  const sectionRef = useRef(null);
  const [copied, setCopied] = useState('');

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
    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(''), 2500);
  };

  return (
    <section ref={sectionRef} className="section-padding" style={{ position: 'relative' }}>
      <div style={{
        position: 'absolute', top: '-30px', right: '-30px', width: '180px', height: '180px',
        backgroundImage: `url('/assets/dark_floral.png')`,
        backgroundSize: 'contain', backgroundRepeat: 'no-repeat',
        opacity: 0.12, pointerEvents: 'none', zIndex: 0
      }}></div>

      <div className="section-title fade-in" style={{ position: 'relative', zIndex: 1 }}>
        <p style={{ fontFamily: 'var(--font-accent)', fontSize: '2rem', color: 'var(--color-accent)' }}>Tanda Kasih</p>
        <h2 style={{ color: 'var(--color-text-light)', fontSize: '2.2rem', letterSpacing: '4px' }}>AMPLOP DIGITAL</h2>
        <div style={{ width: '50px', height: '1px', backgroundColor: 'var(--color-accent)', margin: '1rem auto' }}></div>
      </div>

      <div className="fade-in" style={{ textAlign: 'center', marginBottom: '2.5rem', position: 'relative', zIndex: 1 }}>
        <p style={{ color: 'rgba(253,253,253,0.6)', maxWidth: '360px', margin: '0 auto', fontStyle: 'italic', lineHeight: '1.8' }}>
          "{config.teksAmplop}"
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center', position: 'relative', zIndex: 1 }}>
        {config.rekening.map((acc, i) => (
          <div key={i} className="fade-in" style={{
            width: '100%', maxWidth: '380px', padding: '2rem',
            background: 'rgba(26, 38, 57, 0.6)', backdropFilter: 'blur(20px)',
            border: '1px solid rgba(212, 175, 55, 0.3)', borderRadius: 'var(--radius-md)',
            textAlign: 'center', transitionDelay: `${i * 0.2}s`, position: 'relative', overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(to right, transparent, var(--color-accent), transparent)' }}></div>
            <p style={{ fontSize: '1.8rem', marginBottom: '0.75rem' }}>{acc.icon}</p>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--color-accent)', letterSpacing: '3px', marginBottom: '0.75rem' }}>{acc.bank.toUpperCase()}</h3>
            <p style={{ fontSize: '1.8rem', fontFamily: 'var(--font-heading)', fontWeight: '700', letterSpacing: '4px', color: 'var(--color-text-light)', marginBottom: '0.5rem' }}>{acc.nomorRekening}</p>
            <p style={{ color: 'rgba(253,253,253,0.5)', fontSize: '0.85rem', marginBottom: '1.5rem', fontStyle: 'italic' }}>a.n {acc.atasNama}</p>
            <button onClick={() => copyToClipboard(acc.nomorRaw)} style={{
              padding: '0.6rem 2rem', background: copied === acc.nomorRaw ? 'rgba(212,175,55,0.2)' : 'transparent',
              border: '1px solid var(--color-accent)', borderRadius: 'var(--radius-full)',
              color: 'var(--color-accent)', fontSize: '0.8rem', letterSpacing: '2px',
              transition: 'all 0.4s ease', cursor: 'pointer', fontFamily: 'var(--font-body)'
            }}>
              {copied === acc.nomorRaw ? '✓ TERSALIN' : 'SALIN NOMOR'}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DigitalEnvelope;

import React, { useState, useRef, useEffect } from 'react';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';

const RSVP = () => {
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({ nama: '', kehadiran: 'Hadir', pesan: '' });
  const [messages, setMessages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            entry.target.classList.remove('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      const elements = sectionRef.current.querySelectorAll('.fade-in, .zoom-in');
      elements.forEach((el) => observer.observe(el));
    }

    // Real-time listener — field names: nama, kehadiran, pesan
    const q = query(collection(db, "guestbook"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snap) => {
      const msgs = snap.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          // Support both old field names (name/attendance/message) and new (nama/kehadiran/pesan)
          nama: data.nama || data.name || 'Anonim',
          kehadiran: data.kehadiran || data.attendance || 'Hadir',
          pesan: data.pesan || data.message || '',
          date: data.timestamp
            ? data.timestamp.toDate().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
            : 'Baru saja'
        };
      });
      setMessages(msgs);
    }, err => console.error("Firebase read error:", err));

    return () => {
      if (sectionRef.current) {
        const elements = sectionRef.current.querySelectorAll('.fade-in, .zoom-in');
        elements.forEach((el) => observer.unobserve(el));
      }
      unsubscribe();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nama || !formData.pesan) return;
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "guestbook"), {
        nama: formData.nama,
        kehadiran: formData.kehadiran,
        pesan: formData.pesan,
        timestamp: serverTimestamp()
      });
      setFormData({ nama: '', kehadiran: 'Hadir', pesan: '' });
      setSent(true);
      setTimeout(() => setSent(false), 3000);
    } catch (error) {
      console.error("Error:", error);
      alert('Gagal mengirim. Periksa konfigurasi Firebase Anda.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const attendanceColor = (val) => {
    if (val === 'Hadir') return { bg: 'rgba(212,175,55,0.2)', text: 'var(--color-accent)' };
    if (val === 'Tidak Hadir') return { bg: 'rgba(255,100,100,0.15)', text: '#ff8080' };
    return { bg: 'rgba(255,255,255,0.1)', text: 'rgba(255,255,255,0.5)' };
  };

  const inputStyle = {
    width: '100%', padding: '1rem 1.2rem',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(212,175,55,0.25)',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--color-text-light)',
    fontFamily: 'var(--font-body)', fontSize: '0.9rem',
    outline: 'none', transition: 'border-color 0.3s ease',
    marginBottom: '1rem'
  };

  return (
    <section ref={sectionRef} className="section-padding" style={{ position: 'relative' }}>

      {/* Decorative floral bottom-left */}
      <div style={{
        position: 'absolute', bottom: '-20px', left: '-30px', width: '200px', height: '200px',
        backgroundImage: `url('/assets/dark_floral.png')`,
        backgroundSize: 'contain', backgroundRepeat: 'no-repeat',
        opacity: 0.1, pointerEvents: 'none', zIndex: 0, transform: 'rotate(180deg) scaleX(-1)', mixBlendMode: 'screen'
      }}></div>

      <div className="section-title fade-in" style={{ position: 'relative', zIndex: 1 }}>
        <p style={{ fontFamily: 'var(--font-accent)', fontSize: '2rem', color: 'var(--color-accent)' }}>Buku Tamu</p>
        <h2 style={{ color: 'var(--color-text-light)', fontSize: '2.2rem', letterSpacing: '4px' }}>RSVP &amp; WISHES</h2>
        <div style={{ width: '50px', height: '1px', backgroundColor: 'var(--color-accent)', margin: '1rem auto' }}></div>
      </div>

      {/* Form */}
      <div className="fade-in" style={{
        background: 'rgba(26,38,57,0.6)', backdropFilter: 'blur(20px)',
        border: '1px solid rgba(212,175,55,0.25)', borderRadius: 'var(--radius-md)',
        padding: '2rem', marginBottom: '2.5rem', position: 'relative', zIndex: 1
      }}>
        <form onSubmit={handleSubmit}>
          <input
            type="text" placeholder="Nama Lengkap Anda"
            required value={formData.nama}
            onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
            style={inputStyle}
            onFocus={e => e.target.style.borderColor = 'var(--color-accent)'}
            onBlur={e => e.target.style.borderColor = 'rgba(212,175,55,0.25)'}
          />
          <select
            value={formData.kehadiran}
            onChange={(e) => setFormData({ ...formData, kehadiran: e.target.value })}
            style={{ ...inputStyle, cursor: 'pointer' }}
            onFocus={e => e.target.style.borderColor = 'var(--color-accent)'}
            onBlur={e => e.target.style.borderColor = 'rgba(212,175,55,0.25)'}
          >
            <option value="Hadir" style={{ background: '#1A2639' }}>Insya Allah Hadir 🌹</option>
            <option value="Tidak Hadir" style={{ background: '#1A2639' }}>Mohon Maaf, Tidak Bisa Hadir</option>
            <option value="Masih Ragu" style={{ background: '#1A2639' }}>Masih Ragu-ragu</option>
          </select>
          <textarea
            placeholder="Tuliskan doa & ucapan tulus Anda..."
            required value={formData.pesan}
            onChange={(e) => setFormData({ ...formData, pesan: e.target.value })}
            style={{ ...inputStyle, minHeight: '110px', resize: 'vertical' }}
            onFocus={e => e.target.style.borderColor = 'var(--color-accent)'}
            onBlur={e => e.target.style.borderColor = 'rgba(212,175,55,0.25)'}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: '100%', padding: '1rem',
              background: sent ? 'rgba(212,175,55,0.3)' : isSubmitting ? 'rgba(212,175,55,0.2)' : 'transparent',
              border: '1px solid var(--color-accent)',
              borderRadius: 'var(--radius-full)',
              color: 'var(--color-accent)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.85rem', letterSpacing: '3px',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              transition: 'all 0.4s ease'
            }}
            onMouseOver={e => { if (!isSubmitting && !sent) { e.currentTarget.style.background = 'var(--color-accent)'; e.currentTarget.style.color = 'var(--color-primary)'; }}}
            onMouseOut={e => { if (!sent) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--color-accent)'; }}}
          >
            {sent ? '✓ TERKIRIM!' : isSubmitting ? 'MENGIRIM...' : 'KIRIM UCAPAN'}
          </button>
        </form>
      </div>

      {/* Messages Wall */}
      <div className="fade-in" style={{ position: 'relative', zIndex: 1 }}>
        {messages.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'rgba(212,175,55,0.4)', fontSize: '0.85rem', letterSpacing: '2px', padding: '2rem 0' }}>
            — Belum ada ucapan. Jadilah yang pertama! —
          </p>
        ) : (
          <>
            <h3 style={{
              fontSize: '0.8rem', letterSpacing: '4px', color: 'var(--color-accent)',
              textAlign: 'center', marginBottom: '1.5rem'
            }}>
              — UCAPAN &amp; DOA ({messages.length}) —
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '420px', overflowY: 'auto', paddingRight: '4px' }}>
              {messages.map((msg) => {
                const colors = attendanceColor(msg.kehadiran);
                return (
                  <div key={msg.id} style={{
                    padding: '1.25rem 1.5rem',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(212,175,55,0.15)',
                    borderRadius: 'var(--radius-sm)',
                    borderLeft: '2px solid var(--color-accent)',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <strong style={{ color: 'var(--color-text-light)', fontSize: '0.9rem' }}>{msg.nama}</strong>
                      <span style={{
                        fontSize: '0.65rem', padding: '2px 10px',
                        borderRadius: '20px', background: colors.bg, color: colors.text,
                        letterSpacing: '1px'
                      }}>
                        {msg.kehadiran.toUpperCase()}
                      </span>
                    </div>
                    <p style={{ color: 'rgba(253,253,253,0.65)', fontSize: '0.875rem', lineHeight: '1.7', fontStyle: 'italic' }}>"{msg.pesan}"</p>
                    <span style={{ fontSize: '0.7rem', color: 'rgba(212,175,55,0.5)', marginTop: '0.75rem', display: 'block' }}>{msg.date}</span>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default RSVP;

import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";

const RusticTheme = ({ config, isOpened, onOpen }) => {
  return (
    <div className="theme-rustic" style={{ fontFamily: "'Montserrat', sans-serif", backgroundColor: '#fdfbf7', color: '#4a3728', minHeight: '100vh' }}>

      {/* Fixed Hero — slides up when opened */}
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 9999,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '2rem', textAlign: 'center', backgroundColor: '#fdfbf7', overflow: 'hidden',
        transition: 'transform 1.2s cubic-bezier(0.77, 0, 0.175, 1)',
        transform: isOpened ? 'translateY(-100vh)' : 'translateY(0)',
        pointerEvents: isOpened ? 'none' : 'auto'
      }}>
        {/* Botanical leaf overlays */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', backgroundImage: 'radial-gradient(circle at top left, rgba(74,93,35,0.08) 0%, transparent 50%), radial-gradient(circle at bottom right, rgba(139,101,8,0.08) 0%, transparent 50%)' }}></div>

        <p style={{ fontSize: '0.75rem', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '1.5rem', color: '#8b6508', fontWeight: 500 }}>Pernikahan</p>
        <h1 style={{ fontSize: 'clamp(4rem, 12vw, 7.5rem)', margin: '0 0 1rem 0', fontFamily: "'Great Vibes', cursive", color: '#4a5d23', lineHeight: 1.1 }}>
          {config.groom.namaPanggilan} &amp; {config.bride.namaPanggilan}
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1rem 0 2.5rem', color: '#8b6508', opacity: 0.6 }}>
          <div style={{ width: '50px', height: '1px', backgroundColor: '#8b6508', opacity: 0.5 }}></div>
          <span style={{ fontSize: '0.8rem', letterSpacing: '2px' }}>🌿</span>
          <div style={{ width: '50px', height: '1px', backgroundColor: '#8b6508', opacity: 0.5 }}></div>
        </div>
        <p style={{ fontSize: '1.1rem', color: '#6b5040', letterSpacing: '1px', marginBottom: '3rem' }}>{config.tanggalTampilan}</p>

        <button
          onClick={onOpen}
          style={{
            padding: '1rem 3rem', backgroundColor: '#4a5d23', borderRadius: '40px',
            border: 'none', color: '#fff', fontWeight: 600,
            fontSize: '0.9rem', letterSpacing: '2px', cursor: 'pointer',
            boxShadow: '0 6px 20px rgba(74,93,35,0.25)', transition: 'all 0.3s', fontFamily: 'inherit'
          }}
          onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(74,93,35,0.35)'; }}
          onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(74,93,35,0.25)'; }}
        >
          Buka Undangan 🌿
        </button>
      </div>

      {/* Main content — visible after opened */}
      <div style={{
        minHeight: '100vh',
        paddingTop: isOpened ? '2rem' : '100vh',
        opacity: isOpened ? 1 : 0,
        transition: 'opacity 0.8s ease 0.6s',
        pointerEvents: isOpened ? 'auto' : 'none'
      }}>
        <Profiles config={config} />
        <EventDetails config={config} />
        <Gallery config={config} />
        <DigitalEnvelope config={config} />
        <RSVPRustic config={config} />
        <Footer config={config} />
      </div>
    </div>
  );
};

// --- SUB-COMPONENTS ---

const Profiles = ({ config }) => (
  <div style={{ padding: '6rem 2rem', backgroundColor: '#fdfbf7', textAlign: 'center', position: 'relative' }}>
    {/* Decorative top border */}
    <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '60%', height: '1px', background: 'linear-gradient(to right, transparent, rgba(139,101,8,0.3), transparent)' }}></div>

    <p style={{ fontSize: '0.75rem', letterSpacing: '4px', textTransform: 'uppercase', color: '#8b6508', marginBottom: '0.75rem' }}>Bismillah</p>
    <p style={{ maxWidth: '500px', margin: '0 auto 5rem', lineHeight: 1.9, color: '#7a6050', fontStyle: 'italic', fontSize: '0.95rem' }}>{config.kutipan.teks}</p>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem', maxWidth: '700px', margin: '0 auto' }}>
      {[config.groom, config.bride].map((person, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: i % 2 === 0 ? 'row' : 'row-reverse', alignItems: 'center', gap: '3rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <div style={{ position: 'relative' }}>
            <img src={person.foto} alt={person.namaPanggilan} style={{ width: '220px', height: '300px', objectFit: 'cover', display: 'block', borderRadius: '120px 120px 20px 20px' }} />
          </div>
          <div style={{ textAlign: i % 2 === 0 ? 'left' : 'right', flex: '1', minWidth: '200px' }}>
            <p style={{ fontSize: '0.7rem', letterSpacing: '3px', textTransform: 'uppercase', color: '#8b6508', marginBottom: '0.5rem' }}>{i === 0 ? 'Mempelai Pria' : 'Mempelai Wanita'}</p>
            <h3 style={{ fontSize: '2rem', fontFamily: "'Great Vibes', cursive", margin: '0 0 0.5rem 0', color: '#4a5d23', fontWeight: 400 }}>{person.namaLengkap}</h3>
            <p style={{ color: '#7a6050', fontSize: '0.85rem', marginBottom: '1rem', lineHeight: 1.7 }}>{person.orangTua}</p>
            <a href={person.instagram} target="_blank" rel="noreferrer" style={{ color: '#4a5d23', textDecoration: 'none', fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase', borderBottom: '1px solid #4a5d23', paddingBottom: '2px' }}>Instagram ↗</a>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const EventDetails = ({ config }) => (
  <div style={{ padding: '6rem 2rem', backgroundColor: '#f0ebe1' }}>
    <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
      <span style={{ fontSize: '2rem' }}>🌿</span>
      <p style={{ fontSize: '0.75rem', letterSpacing: '4px', textTransform: 'uppercase', color: '#8b6508', margin: '1rem 0 0.5rem' }}>Detail Acara</p>
      <h2 style={{ fontFamily: "'Great Vibes', cursive", fontSize: '2.5rem', color: '#4a5d23', marginBottom: '4rem', fontWeight: 400 }}>Rangkaian Acara</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
        {[config.akad, config.resepsi].map((evt, i) => (
          <div key={i} style={{ backgroundColor: '#fdfbf7', padding: '2.5rem 2rem', borderRadius: '16px', border: '1px solid rgba(139,101,8,0.15)', textAlign: 'left' }}>
            <p style={{ color: '#8b6508', fontSize: '0.7rem', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '1rem' }}>{evt.judul}</p>
            <h3 style={{ fontSize: '1.3rem', margin: '0 0 0.75rem 0', color: '#4a3728', fontWeight: 600 }}>{evt.tanggal}</h3>
            <p style={{ color: '#7a6050', marginBottom: '0.5rem', fontSize: '0.9rem' }}>{evt.waktu}</p>
            <p style={{ fontWeight: 600, marginBottom: '0.5rem', color: '#4a5d23', fontSize: '0.95rem' }}>{evt.tempat}</p>
            <p style={{ fontSize: '0.85rem', color: '#7a6050', marginBottom: '1.5rem', lineHeight: 1.7 }}>{evt.alamat}</p>
            <a href={evt.linkMaps} target="_blank" rel="noreferrer" style={{ display: 'inline-block', padding: '0.7rem 1.5rem', backgroundColor: '#4a5d23', color: '#fff', textDecoration: 'none', fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', borderRadius: '30px' }}>📍 Lihat Peta</a>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Gallery = ({ config }) => (
  <div style={{ padding: '6rem 2rem', backgroundColor: '#fdfbf7' }}>
    <p style={{ textAlign: 'center', fontSize: '0.75rem', letterSpacing: '4px', textTransform: 'uppercase', color: '#8b6508', marginBottom: '0.5rem' }}>Our Moments</p>
    <h2 style={{ textAlign: 'center', fontFamily: "'Great Vibes', cursive", fontSize: '2.5rem', color: '#4a5d23', marginBottom: '3rem', fontWeight: 400 }}>Gallery</h2>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem', maxWidth: '900px', margin: '0 auto' }}>
      {config.galeri.map((img, i) => (
        <div key={i} style={{ overflow: 'hidden', borderRadius: '12px', gridColumn: img.span === 'wide' ? '1 / -1' : 'auto' }}>
          <img src={img.src} alt="Gallery" style={{ width: '100%', height: img.span === 'wide' ? '380px' : '280px', objectFit: 'cover', transition: 'transform 0.6s ease', display: 'block' }}
            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
          />
        </div>
      ))}
    </div>
  </div>
);

const DigitalEnvelope = ({ config }) => (
  <div style={{ padding: '6rem 2rem', backgroundColor: '#4a5d23', textAlign: 'center' }}>
    <p style={{ fontSize: '0.75rem', letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '0.5rem' }}>Wedding Gift</p>
    <h2 style={{ fontFamily: "'Great Vibes', cursive", fontSize: '2.5rem', color: '#fff', marginBottom: '1rem', fontWeight: 400 }}>Amplop Digital</h2>
    <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '450px', margin: '0 auto 3rem', fontSize: '0.9rem', lineHeight: 1.8 }}>{config.teksAmplop}</p>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '480px', margin: '0 auto' }}>
      {config.rekening.map((rek, i) => (
        <div key={i} style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '1.5rem 2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ textAlign: 'left' }}>
            <p style={{ margin: '0 0 0.25rem', fontWeight: 600, color: '#fff', fontSize: '0.95rem' }}>{rek.bank}</p>
            <p style={{ margin: '0 0 0.25rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>{rek.nomorRekening}</p>
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem' }}>a.n. {rek.atasNama}</p>
          </div>
          <button onClick={() => navigator.clipboard.writeText(rek.nomorRaw)} style={{ padding: '0.5rem 1.25rem', backgroundColor: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer', borderRadius: '8px', fontSize: '0.75rem', letterSpacing: '1px', fontFamily: 'inherit' }}>📋 Salin</button>
        </div>
      ))}
    </div>
  </div>
);

const RSVPRustic = ({ config }) => {
  const [messages, setMessages] = useState([]);
  const [form, setForm] = useState({ nama: '', pesan: '', kehadiran: 'Hadir' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "guestbook"), orderBy("timestamp", "desc"));
    const unsub = onSnapshot(q, snap => setMessages(snap.docs.map(d => {
      const data = d.data();
      return {
        id: d.id,
        nama: data.nama || data.name || 'Anonim',
        kehadiran: data.kehadiran || data.attendance || 'Hadir',
        pesan: data.pesan || data.message || '',
        date: data.timestamp
          ? data.timestamp.toDate().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
          : 'Baru saja'
      };
    })));
    return unsub;
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.nama || !form.pesan) return;
    setLoading(true);
    try {
      await addDoc(collection(db, "guestbook"), { ...form, timestamp: serverTimestamp() });
      setForm({ nama: '', pesan: '', kehadiran: 'Hadir' });
      setSent(true); setTimeout(() => setSent(false), 3000);
    } catch { alert("Gagal mengirim."); }
    setLoading(false);
  };

  const inputStyle = { width: '100%', padding: '0.9rem 1rem', marginBottom: '0.75rem', backgroundColor: '#fff', border: '1px solid rgba(139,101,8,0.25)', color: '#4a3728', outline: 'none', fontFamily: 'inherit', fontSize: '0.9rem', borderRadius: '8px', transition: 'border-color 0.3s' };

  return (
    <div style={{ padding: '6rem 2rem', backgroundColor: '#f0ebe1' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <p style={{ textAlign: 'center', fontSize: '0.75rem', letterSpacing: '4px', textTransform: 'uppercase', color: '#8b6508', marginBottom: '0.5rem' }}>Konfirmasi Kehadiran</p>
        <h2 style={{ textAlign: 'center', fontFamily: "'Great Vibes', cursive", fontSize: '2.5rem', color: '#4a5d23', marginBottom: '3rem', fontWeight: 400 }}>RSVP & Buku Tamu</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
          <form onSubmit={submit}>
            <input style={inputStyle} placeholder="Nama Anda" value={form.nama} onChange={e => setForm({ ...form, nama: e.target.value })} />
            <select style={inputStyle} value={form.kehadiran} onChange={e => setForm({ ...form, kehadiran: e.target.value })}>
              <option value="Hadir">Hadir 🎉</option>
              <option value="Tidak Hadir">Tidak Hadir 😢</option>
            </select>
            <textarea style={{ ...inputStyle, height: '120px', resize: 'vertical' }} placeholder="Ucapan & Doa..." value={form.pesan} onChange={e => setForm({ ...form, pesan: e.target.value })} />
            <button type="submit" disabled={loading} style={{ width: '100%', padding: '1rem', backgroundColor: '#4a5d23', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.85rem', fontFamily: 'inherit', borderRadius: '8px', transition: 'opacity 0.3s' }}>
              {sent ? '✓ Terkirim!' : loading ? 'Mengirim...' : '🌿 Kirim Ucapan'}
            </button>
          </form>
          <div style={{ maxHeight: '420px', overflowY: 'auto', paddingRight: '0.5rem' }}>
            {messages.length === 0 && <p style={{ color: '#999', fontSize: '0.85rem', textAlign: 'center' }}>Belum ada ucapan.</p>}
            {messages.map(m => (
              <div key={m.id} style={{ paddingBottom: '1.25rem', marginBottom: '1.25rem', borderBottom: '1px solid rgba(139,101,8,0.12)', backgroundColor: '#fdfbf7', padding: '1rem 1.25rem', borderRadius: '8px', marginBottom: '0.75rem' }}>
                <p style={{ margin: '0 0 0.4rem 0', fontWeight: 600, color: '#4a3728', fontSize: '0.9rem' }}>{m.nama} <span style={{ fontSize: '0.65rem', padding: '2px 8px', backgroundColor: m.kehadiran === 'Hadir' ? 'rgba(74,93,35,0.12)' : 'rgba(0,0,0,0.05)', color: m.kehadiran === 'Hadir' ? '#4a5d23' : '#888', marginLeft: '0.5rem', borderRadius: '20px', letterSpacing: '1px' }}>{m.kehadiran}</span></p>
                <p style={{ margin: 0, color: '#7a6050', fontSize: '0.85rem', lineHeight: 1.6 }}>{m.pesan}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Footer = ({ config }) => (
  <div style={{ padding: '5rem 2rem', textAlign: 'center', backgroundColor: '#fdfbf7', borderTop: '1px solid rgba(139,101,8,0.1)' }}>
    <span style={{ fontSize: '2rem', display: 'block', marginBottom: '1.5rem' }}>🌿</span>
    <p style={{ color: '#8b6508', fontFamily: "'Great Vibes', cursive", fontSize: '2rem', marginBottom: '0.75rem' }}>{config.penutup.salam}</p>
    <p style={{ color: '#4a5d23', fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{config.groom.namaPanggilan} &amp; {config.bride.namaPanggilan}</p>
    <p style={{ color: '#bbb', fontSize: '0.7rem', letterSpacing: '2px', textTransform: 'uppercase', marginTop: '2rem' }}>{config.penutup.branding}</p>
  </div>
);

export default RusticTheme;

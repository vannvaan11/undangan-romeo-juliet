import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";

const MinimalistTheme = ({ config, isOpened, onOpen }) => {
  return (
    <div className="theme-minimalist" style={{ fontFamily: "'Inter', 'Montserrat', sans-serif", backgroundColor: '#f8f5f0', color: '#222', minHeight: '100vh' }}>
      
      {/* Fixed Hero that slides up on open */}
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 9999,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '2rem', textAlign: 'center', backgroundColor: '#1a1a2e', overflow: 'hidden',
        transition: 'transform 1.2s cubic-bezier(0.77, 0, 0.175, 1)',
        transform: isOpened ? 'translateY(-100vh)' : 'translateY(0)',
        pointerEvents: isOpened ? 'none' : 'auto'
      }}>
        {/* Elegant border frame */}
        <div style={{ position: 'absolute', top: '2rem', bottom: '2rem', left: '2rem', right: '2rem', border: '1px solid rgba(212,175,55,0.35)', pointerEvents: 'none' }}></div>
        <div style={{ position: 'absolute', top: '2.8rem', bottom: '2.8rem', left: '2.8rem', right: '2.8rem', border: '1px solid rgba(212,175,55,0.1)', pointerEvents: 'none' }}></div>

        <p style={{ fontSize: '0.8rem', letterSpacing: '6px', textTransform: 'uppercase', marginBottom: '2rem', color: 'rgba(212,175,55,0.7)', fontWeight: 300 }}>The Wedding Of</p>
        <h1 style={{ fontSize: 'clamp(3.5rem, 10vw, 6.5rem)', fontWeight: 200, margin: '0 0 0.5rem 0', fontFamily: "'Great Vibes', cursive", color: '#fff', lineHeight: 1.1 }}>
          {config.groom.namaPanggilan}
        </h1>
        <p style={{ fontSize: '1rem', letterSpacing: '8px', color: 'rgba(212,175,55,0.6)', margin: '0.5rem 0' }}>&amp;</p>
        <h1 style={{ fontSize: 'clamp(3.5rem, 10vw, 6.5rem)', fontWeight: 200, margin: '0 0 2rem 0', fontFamily: "'Great Vibes', cursive", color: '#fff', lineHeight: 1.1 }}>
          {config.bride.namaPanggilan}
        </h1>
        <p style={{ fontSize: '0.85rem', letterSpacing: '3px', color: 'rgba(255,255,255,0.4)', marginBottom: '3.5rem' }}>{config.tanggalTampilan}</p>

        <button
          onClick={onOpen}
          style={{
            padding: '1rem 3.5rem', backgroundColor: 'transparent',
            border: '1px solid rgba(212,175,55,0.6)', color: 'rgba(212,175,55,0.9)',
            fontSize: '0.8rem', letterSpacing: '4px', textTransform: 'uppercase', cursor: 'pointer',
            transition: 'all 0.4s', fontFamily: 'inherit', fontWeight: 400
          }}
          onMouseOver={e => { e.currentTarget.style.backgroundColor = 'rgba(212,175,55,0.15)'; e.currentTarget.style.borderColor = '#D4AF37'; }}
          onMouseOut={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = 'rgba(212,175,55,0.6)'; }}
        >
          Open Invitation
        </button>
      </div>

      {/* Main Content — always rendered but invisible behind hero until opened */}
      <div style={{
        paddingTop: isOpened ? '0' : '100vh',
        transition: 'padding-top 0s',
        opacity: isOpened ? 1 : 0,
        animation: isOpened ? 'fadeIn 1s 0.8s both' : 'none'
      }}>
        <Profiles config={config} />
        <EventDetails config={config} />
        <Gallery config={config} />
        <DigitalEnvelope config={config} />
        <RSVPMini config={config} />
        <Footer config={config} />
      </div>
    </div>
  );
};

// --- SUB-COMPONENTS ---

const Profiles = ({ config }) => (
  <div style={{ padding: '7rem 2rem 5rem', backgroundColor: '#f8f5f0', textAlign: 'center' }}>
    <p style={{ fontSize: '0.75rem', letterSpacing: '5px', textTransform: 'uppercase', color: 'rgba(212,175,55,0.8)', marginBottom: '1.5rem' }}>Bismillahirrahmanirrahim</p>
    <p style={{ maxWidth: '500px', margin: '0 auto 5rem', lineHeight: 1.9, color: '#666', fontStyle: 'italic', fontSize: '0.95rem' }}>{config.kutipan.teks}</p>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem', maxWidth: '700px', margin: '0 auto' }}>
      {[config.groom, config.bride].map((person, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: i % 2 === 0 ? 'row' : 'row-reverse', alignItems: 'center', gap: '3rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <div style={{ position: 'relative' }}>
            <img src={person.foto} alt={person.namaPanggilan} style={{ width: '220px', height: '300px', objectFit: 'cover', display: 'block' }} />
            <div style={{ position: 'absolute', bottom: '-12px', right: i % 2 === 0 ? '-12px' : 'auto', left: i % 2 !== 0 ? '-12px' : 'auto', width: '100%', height: '100%', border: '1px solid rgba(212,175,55,0.4)', zIndex: 0, pointerEvents: 'none' }}></div>
          </div>
          <div style={{ textAlign: i % 2 === 0 ? 'left' : 'right', flex: '1', minWidth: '200px' }}>
            <p style={{ fontSize: '0.7rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(212,175,55,0.7)', marginBottom: '0.5rem' }}>{i === 0 ? 'The Groom' : 'The Bride'}</p>
            <h3 style={{ fontSize: '1.8rem', fontFamily: "'Great Vibes', cursive", margin: '0 0 0.5rem 0', color: '#222', fontWeight: 400 }}>{person.namaLengkap}</h3>
            <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '1rem', lineHeight: 1.7 }}>{person.orangTua}</p>
            <a href={person.instagram} target="_blank" rel="noreferrer" style={{ color: '#222', textDecoration: 'none', fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', borderBottom: '1px solid #222', paddingBottom: '2px', transition: 'color 0.3s' }}>Instagram</a>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const EventDetails = ({ config }) => (
  <div style={{ padding: '6rem 2rem', backgroundColor: '#1a1a2e', color: '#fff' }}>
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <p style={{ textAlign: 'center', fontSize: '0.75rem', letterSpacing: '5px', textTransform: 'uppercase', color: 'rgba(212,175,55,0.7)', marginBottom: '0.75rem' }}>Save The Date</p>
      <h2 style={{ textAlign: 'center', fontSize: '2.2rem', fontFamily: "'Great Vibes', cursive", marginBottom: '4rem', fontWeight: 400, color: '#fff' }}>Detail Acara</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
        {[config.akad, config.resepsi].map((evt, i) => (
          <div key={i} style={{ borderLeft: '1px solid rgba(212,175,55,0.4)', paddingLeft: '2rem' }}>
            <p style={{ color: 'rgba(212,175,55,0.8)', fontSize: '0.7rem', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '1rem' }}>{evt.judul}</p>
            <h3 style={{ fontSize: '1.3rem', margin: '0 0 0.75rem 0', fontWeight: 300, letterSpacing: '1px' }}>{evt.tanggal}</h3>
            <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>{evt.waktu}</p>
            <p style={{ fontWeight: 600, marginBottom: '0.5rem', color: '#fff' }}>{evt.tempat}</p>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', marginBottom: '1.5rem', lineHeight: 1.7 }}>{evt.alamat}</p>
            <a href={evt.linkMaps} target="_blank" rel="noreferrer" style={{ display: 'inline-block', padding: '0.7rem 1.8rem', border: '1px solid rgba(212,175,55,0.5)', color: 'rgba(212,175,55,0.8)', textDecoration: 'none', fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', transition: 'all 0.3s' }}>View Map</a>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Gallery = ({ config }) => (
  <div style={{ padding: '6rem 2rem', backgroundColor: '#f8f5f0' }}>
    <p style={{ textAlign: 'center', fontSize: '0.75rem', letterSpacing: '5px', textTransform: 'uppercase', color: 'rgba(212,175,55,0.8)', marginBottom: '0.75rem' }}>Our Story</p>
    <h2 style={{ textAlign: 'center', fontSize: '2rem', fontFamily: "'Great Vibes', cursive", marginBottom: '3rem', color: '#222', fontWeight: 400 }}>Gallery</h2>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0.5rem', maxWidth: '900px', margin: '0 auto' }}>
      {config.galeri.map((img, i) => (
        <img key={i} src={img.src} alt="Gallery" style={{ width: '100%', height: img.span === 'wide' ? '350px' : '280px', objectFit: 'cover', gridColumn: img.span === 'wide' ? '1 / -1' : 'auto', transition: 'transform 0.5s', filter: 'brightness(0.95)' }} />
      ))}
    </div>
  </div>
);

const DigitalEnvelope = ({ config }) => (
  <div style={{ padding: '6rem 2rem', backgroundColor: '#1a1a2e', textAlign: 'center' }}>
    <div style={{ maxWidth: '550px', margin: '0 auto', padding: '3rem 2.5rem', border: '1px solid rgba(212,175,55,0.3)', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '-1px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#1a1a2e', padding: '0 1rem' }}>
        <span style={{ fontSize: '1.2rem' }}>💌</span>
      </div>
      <p style={{ fontSize: '0.75rem', letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(212,175,55,0.7)', marginBottom: '0.5rem' }}>Wedding</p>
      <h2 style={{ fontSize: '1.8rem', fontFamily: "'Great Vibes', cursive", marginBottom: '1rem', color: '#fff', fontWeight: 400 }}>Gift</h2>
      <p style={{ color: 'rgba(255,255,255,0.4)', marginBottom: '2.5rem', fontSize: '0.85rem', lineHeight: 1.8 }}>{config.teksAmplop}</p>

      {config.rekening.map((rek, i) => (
        <div key={i} style={{ marginBottom: '2rem', padding: '1.5rem', border: '1px solid rgba(255,255,255,0.05)', backgroundColor: 'rgba(255,255,255,0.03)' }}>
          <p style={{ fontSize: '0.7rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(212,175,55,0.7)', marginBottom: '0.5rem' }}>{rek.bank}</p>
          <p style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '0.25rem', fontWeight: 300, letterSpacing: '1px' }}>{rek.nomorRekening}</p>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem', marginBottom: '1rem' }}>a.n. {rek.atasNama}</p>
          <button onClick={() => navigator.clipboard.writeText(rek.nomorRaw)} style={{ padding: '0.5rem 1.5rem', backgroundColor: 'rgba(212,175,55,0.15)', color: 'rgba(212,175,55,0.9)', border: '1px solid rgba(212,175,55,0.3)', cursor: 'pointer', fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', fontFamily: 'inherit' }}>Copy</button>
        </div>
      ))}
    </div>
  </div>
);

const RSVPMini = ({ config }) => {
  const [messages, setMessages] = useState([]);
  const [form, setForm] = useState({ nama: '', pesan: '', kehadiran: 'Hadir' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "guestbook"), orderBy("timestamp", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
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
    } catch { alert("Gagal mengirim pesan."); }
    setLoading(false);
  };

  const inputStyle = { width: '100%', padding: '0.9rem 1rem', marginBottom: '0.75rem', backgroundColor: 'transparent', border: '1px solid rgba(212,175,55,0.3)', color: '#fff', outline: 'none', fontFamily: 'inherit', fontSize: '0.9rem', transition: 'border-color 0.3s' };

  return (
    <div style={{ padding: '6rem 2rem', backgroundColor: '#f8f5f0' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <p style={{ textAlign: 'center', fontSize: '0.75rem', letterSpacing: '5px', textTransform: 'uppercase', color: 'rgba(212,175,55,0.8)', marginBottom: '0.5rem' }}>Join Our Celebration</p>
        <h2 style={{ textAlign: 'center', fontSize: '2rem', fontFamily: "'Great Vibes', cursive", color: '#222', marginBottom: '3rem', fontWeight: 400 }}>RSVP & Guestbook</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
          <div>
            <form onSubmit={submit}>
              <input style={{...inputStyle, color: '#222', borderColor: 'rgba(0,0,0,0.2)', backgroundColor: '#fff'}} placeholder="Nama Anda" value={form.nama} onChange={e => setForm({ ...form, nama: e.target.value })} />
              <select style={{...inputStyle, color: '#222', borderColor: 'rgba(0,0,0,0.2)', backgroundColor: '#fff'}} value={form.kehadiran} onChange={e => setForm({ ...form, kehadiran: e.target.value })}>
                <option value="Hadir">Hadir 🎉</option>
                <option value="Tidak Hadir">Tidak Hadir 😢</option>
              </select>
              <textarea style={{...inputStyle, height: '120px', resize: 'vertical', color: '#222', borderColor: 'rgba(0,0,0,0.2)', backgroundColor: '#fff'}} placeholder="Ucapan & Doa..." value={form.pesan} onChange={e => setForm({ ...form, pesan: e.target.value })} />
              <button type="submit" disabled={loading} style={{ width: '100%', padding: '1rem', backgroundColor: '#1a1a2e', color: '#D4AF37', border: 'none', cursor: 'pointer', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', fontSize: '0.8rem', fontFamily: 'inherit', transition: 'opacity 0.3s' }}>
                {sent ? '✓ Terkirim!' : loading ? 'Mengirim...' : 'Kirim Ucapan'}
              </button>
            </form>
          </div>
          <div style={{ maxHeight: '400px', overflowY: 'auto', paddingRight: '0.5rem' }}>
            {messages.length === 0 && <p style={{ color: '#999', fontSize: '0.85rem', textAlign: 'center', marginTop: '2rem' }}>Belum ada ucapan. Jadilah yang pertama!</p>}
            {messages.map(m => (
              <div key={m.id} style={{ paddingBottom: '1.25rem', marginBottom: '1.25rem', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
                <p style={{ margin: '0 0 0.4rem 0', fontWeight: 600, color: '#222', fontSize: '0.9rem' }}>{m.nama} <span style={{ fontSize: '0.65rem', padding: '2px 8px', backgroundColor: m.kehadiran === 'Hadir' ? 'rgba(212,175,55,0.2)' : 'rgba(0,0,0,0.08)', color: m.kehadiran === 'Hadir' ? '#8b6508' : '#666', marginLeft: '0.5rem', borderRadius: '2px', letterSpacing: '1px', textTransform: 'uppercase' }}>{m.kehadiran}</span></p>
                <p style={{ margin: 0, color: '#666', fontSize: '0.85rem', lineHeight: 1.6 }}>{m.pesan}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Footer = ({ config }) => (
  <div style={{ padding: '5rem 2rem', textAlign: 'center', backgroundColor: '#1a1a2e', borderTop: '1px solid rgba(212,175,55,0.1)' }}>
    <div style={{ width: '1px', height: '50px', background: 'linear-gradient(to bottom, transparent, rgba(212,175,55,0.4))', margin: '0 auto 2rem' }}></div>
    <p style={{ color: 'rgba(212,175,55,0.6)', fontFamily: "'Great Vibes', cursive", fontSize: '1.8rem', marginBottom: '1rem' }}>{config.penutup.salam}</p>
    <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', letterSpacing: '4px', textTransform: 'uppercase' }}>{config.groom.namaPanggilan} &amp; {config.bride.namaPanggilan}</p>
    <p style={{ color: 'rgba(255,255,255,0.15)', fontSize: '0.65rem', letterSpacing: '2px', marginTop: '2rem', textTransform: 'uppercase' }}>{config.penutup.branding}</p>
  </div>
);

export default MinimalistTheme;

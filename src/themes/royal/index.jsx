import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";

const RoyalTheme = ({ config, isOpened, onOpen }) => {
  return (
    <div className="theme-royal" style={{ fontFamily: "'Cinzel', serif", backgroundColor: '#111', color: '#e6d5b8', minHeight: '100vh' }}>

      {/* Ornate corner borders (always visible, above content) */}
      <div style={{ position: 'fixed', top: '24px', left: '24px', right: '24px', bottom: '24px', border: '1px solid rgba(212,175,55,0.25)', pointerEvents: 'none', zIndex: 200 }}>
        <div style={{ position: 'absolute', top: '-8px', left: '-8px', width: '24px', height: '24px', borderTop: '2px solid #d4af37', borderLeft: '2px solid #d4af37' }}></div>
        <div style={{ position: 'absolute', top: '-8px', right: '-8px', width: '24px', height: '24px', borderTop: '2px solid #d4af37', borderRight: '2px solid #d4af37' }}></div>
        <div style={{ position: 'absolute', bottom: '-8px', left: '-8px', width: '24px', height: '24px', borderBottom: '2px solid #d4af37', borderLeft: '2px solid #d4af37' }}></div>
        <div style={{ position: 'absolute', bottom: '-8px', right: '-8px', width: '24px', height: '24px', borderBottom: '2px solid #d4af37', borderRight: '2px solid #d4af37' }}></div>
      </div>

      {/* Fixed Hero — slides up on open */}
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 9999,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '2rem', textAlign: 'center',
        background: 'radial-gradient(circle at center, #2a2020 0%, #111 100%)',
        overflow: 'hidden',
        transition: 'transform 1.2s cubic-bezier(0.77, 0, 0.175, 1)',
        transform: isOpened ? 'translateY(-100vh)' : 'translateY(0)',
        pointerEvents: isOpened ? 'none' : 'auto'
      }}>
        {/* Monogram circle */}
        <div style={{ width: '100px', height: '100px', margin: '0 auto 2rem', border: '1px solid rgba(212,175,55,0.6)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 30px rgba(212,175,55,0.1)' }}>
          <span style={{ fontFamily: "'Great Vibes', cursive", fontSize: '3rem', color: '#d4af37', lineHeight: 1 }}>
            {config.groom.namaPanggilan[0]}{config.bride.namaPanggilan[0]}
          </span>
        </div>

        <p style={{ fontSize: '0.75rem', letterSpacing: '8px', textTransform: 'uppercase', marginBottom: '2rem', color: 'rgba(212,175,55,0.6)', fontWeight: 400 }}>The Royal Wedding</p>

        <h1 style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', margin: '0 0 1.5rem 0', color: '#d4af37', lineHeight: 1.15, letterSpacing: '2px' }}>
          {config.groom.namaPanggilan} <span style={{ fontSize: '0.5em', color: 'rgba(255,255,255,0.3)' }}>&amp;</span> {config.bride.namaPanggilan}
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ width: '60px', height: '1px', backgroundColor: 'rgba(212,175,55,0.3)' }}></div>
          <span style={{ color: 'rgba(212,175,55,0.5)', fontSize: '0.8rem', letterSpacing: '3px' }}>❖</span>
          <div style={{ width: '60px', height: '1px', backgroundColor: 'rgba(212,175,55,0.3)' }}></div>
        </div>

        <p style={{ fontSize: '1.1rem', letterSpacing: '4px', color: 'rgba(230,213,184,0.6)', marginBottom: '3.5rem' }}>{config.tanggalTampilan}</p>

        <button
          onClick={onOpen}
          style={{
            marginTop: '0', padding: '1rem 3.5rem', backgroundColor: 'transparent',
            border: '1px solid rgba(212,175,55,0.6)', color: '#d4af37',
            fontSize: '0.8rem', letterSpacing: '5px', textTransform: 'uppercase', cursor: 'pointer',
            transition: 'all 0.4s', fontFamily: "'Cinzel', serif"
          }}
          onMouseOver={e => { e.currentTarget.style.backgroundColor = 'rgba(212,175,55,0.1)'; e.currentTarget.style.borderColor = '#d4af37'; }}
          onMouseOut={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = 'rgba(212,175,55,0.6)'; }}
        >
          Unlock Invitation
        </button>
      </div>

      {/* Main content */}
      <div style={{
        minHeight: '100vh',
        paddingTop: isOpened ? '2rem' : '100vh',
        opacity: isOpened ? 1 : 0,
        transition: 'opacity 0.8s ease 0.6s',
        pointerEvents: isOpened ? 'auto' : 'none'
      }}>

        <Profiles config={config} />
        <RoyalDivider />
        <EventDetails config={config} />
        <RoyalDivider />
        <Gallery config={config} />
        <RoyalDivider />
        <DigitalEnvelope config={config} />
        <RoyalDivider />
        <RSVPRoyal config={config} />
        <Footer config={config} />
      </div>
    </div>
  );
};

const RoyalDivider = () => (
  <div style={{ textAlign: 'center', margin: '0', padding: '2rem 0', borderTop: '1px solid rgba(212,175,55,0.1)', borderBottom: '1px solid rgba(212,175,55,0.1)' }}>
    <span style={{ color: '#d4af37', fontSize: '1.5rem', letterSpacing: '8px' }}>❖ ❖ ❖</span>
  </div>
);

const Profiles = ({ config }) => (
  <div style={{ padding: '6rem 2rem', textAlign: 'center' }}>
    <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: '1.5rem', color: 'rgba(212,175,55,0.5)', marginBottom: '0.5rem', fontWeight: 400 }}>Bismillah</p>
    <p style={{ maxWidth: '550px', margin: '0 auto 5rem', fontSize: '1rem', fontStyle: 'italic', color: 'rgba(230,213,184,0.5)', lineHeight: 1.9, fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}>&ldquo;{config.kutipan.teks}&rdquo;</p>

    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '4rem' }}>
      {[config.groom, config.bride].map((person, i) => (
        <div key={i} style={{ width: '280px', textAlign: 'center' }}>
          <div style={{ width: '220px', height: '300px', margin: '0 auto 2rem', padding: '8px', border: '1px solid rgba(212,175,55,0.4)', borderRadius: '120px 120px 0 0', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
            <img src={person.foto} alt={person.namaPanggilan} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '112px 112px 0 0', filter: 'sepia(0.25) contrast(1.1)' }} />
          </div>
          <p style={{ fontSize: '0.65rem', letterSpacing: '5px', textTransform: 'uppercase', color: 'rgba(212,175,55,0.5)', marginBottom: '0.5rem' }}>{i === 0 ? 'Mempelai Pria' : 'Mempelai Wanita'}</p>
          <h3 style={{ fontSize: '1.5rem', margin: '0 0 0.75rem', color: '#d4af37', fontWeight: 400 }}>{person.namaLengkap}</h3>
          <p style={{ color: 'rgba(230,213,184,0.4)', fontSize: '0.85rem', lineHeight: 1.7, fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}>{person.orangTua}</p>
        </div>
      ))}
    </div>
  </div>
);

const EventDetails = ({ config }) => (
  <div style={{ padding: '5rem 2rem', textAlign: 'center' }}>
    <p style={{ fontSize: '0.65rem', letterSpacing: '8px', textTransform: 'uppercase', color: 'rgba(212,175,55,0.5)', marginBottom: '0.75rem' }}>Royal Ceremony</p>
    <h2 style={{ fontSize: '2.5rem', color: '#d4af37', marginBottom: '4rem', letterSpacing: '4px', fontWeight: 400 }}>The Details</h2>

    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      {[config.akad, config.resepsi].map((evt, i) => (
        <div key={i} style={{ flex: '1', minWidth: '280px', padding: '3rem 2rem', backgroundColor: 'rgba(212,175,55,0.03)', border: '1px solid rgba(212,175,55,0.15)', textAlign: 'center' }}>
          <p style={{ color: 'rgba(212,175,55,0.6)', fontSize: '0.7rem', letterSpacing: '5px', textTransform: 'uppercase', marginBottom: '2rem' }}>{evt.judul}</p>
          <h3 style={{ fontSize: '1.6rem', margin: '0 0 0.75rem 0', color: '#e6d5b8', fontWeight: 400 }}>{evt.tanggal}</h3>
          <p style={{ color: 'rgba(230,213,184,0.4)', marginBottom: '2rem', fontSize: '1rem', fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}>{evt.waktu}</p>
          <div style={{ width: '40px', height: '1px', backgroundColor: 'rgba(212,175,55,0.3)', margin: '0 auto 2rem' }}></div>
          <p style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '0.75rem', color: '#e6d5b8' }}>{evt.tempat}</p>
          <p style={{ fontSize: '0.9rem', color: 'rgba(230,213,184,0.35)', marginBottom: '2.5rem', lineHeight: 1.7, fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}>{evt.alamat}</p>
          <a href={evt.linkMaps} target="_blank" rel="noreferrer" style={{ padding: '0.8rem 2rem', backgroundColor: '#d4af37', color: '#111', textDecoration: 'none', fontSize: '0.75rem', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 700, display: 'inline-block' }}>Map ↗</a>
        </div>
      ))}
    </div>
  </div>
);

const Gallery = ({ config }) => (
  <div style={{ padding: '5rem 2rem', textAlign: 'center' }}>
    <p style={{ fontSize: '0.65rem', letterSpacing: '8px', textTransform: 'uppercase', color: 'rgba(212,175,55,0.5)', marginBottom: '0.75rem' }}>Our Moments</p>
    <h2 style={{ fontSize: '2.5rem', color: '#d4af37', marginBottom: '4rem', letterSpacing: '4px', fontWeight: 400 }}>Portraits</h2>
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.5rem', maxWidth: '900px', margin: '0 auto' }}>
      {config.galeri.map((img, i) => (
        <div key={i} style={{ width: img.span === 'wide' ? '100%' : 'calc(50% - 0.75rem)', minWidth: '260px', padding: '10px', backgroundColor: '#1a1a1a', border: '1px solid rgba(212,175,55,0.2)' }}>
          <img src={img.src} alt="Gallery" style={{ width: '100%', height: img.span === 'wide' ? '450px' : '350px', objectFit: 'cover', filter: 'sepia(0.15)', display: 'block' }} />
        </div>
      ))}
    </div>
  </div>
);

const DigitalEnvelope = ({ config }) => (
  <div style={{ padding: '5rem 2rem', textAlign: 'center' }}>
    <p style={{ fontSize: '0.65rem', letterSpacing: '8px', textTransform: 'uppercase', color: 'rgba(212,175,55,0.5)', marginBottom: '0.75rem' }}>Royal Gift</p>
    <h2 style={{ fontSize: '2.5rem', color: '#d4af37', marginBottom: '2rem', letterSpacing: '4px', fontWeight: 400 }}>Wedding Gift</h2>
    <p style={{ maxWidth: '500px', margin: '0 auto 4rem', color: 'rgba(230,213,184,0.45)', lineHeight: 1.9, fontSize: '0.95rem', fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}>{config.teksAmplop}</p>

    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem' }}>
      {config.rekening.map((rek, i) => (
        <div key={i} style={{ padding: '3rem 2.5rem', border: '1px solid rgba(212,175,55,0.3)', minWidth: '280px', backgroundColor: 'rgba(0,0,0,0.4)', textAlign: 'center' }}>
          <p style={{ fontSize: '0.7rem', letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(212,175,55,0.5)', marginBottom: '1rem' }}>{rek.bank}</p>
          <p style={{ fontSize: '1.4rem', color: '#e6d5b8', marginBottom: '0.5rem', letterSpacing: '3px', fontWeight: 400 }}>{rek.nomorRekening}</p>
          <p style={{ color: 'rgba(230,213,184,0.35)', marginBottom: '2rem', fontFamily: "'Montserrat', sans-serif", fontSize: '0.85rem' }}>a.n. {rek.atasNama}</p>
          <button onClick={() => navigator.clipboard.writeText(rek.nomorRaw)} style={{ padding: '0.8rem 2rem', backgroundColor: 'transparent', color: '#d4af37', border: '1px solid rgba(212,175,55,0.5)', cursor: 'pointer', fontSize: '0.75rem', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: "'Cinzel', serif", transition: 'all 0.3s' }}
            onMouseOver={e => { e.currentTarget.style.backgroundColor = '#d4af37'; e.currentTarget.style.color = '#111'; }}
            onMouseOut={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#d4af37'; }}
          >Copy</button>
        </div>
      ))}
    </div>
  </div>
);

const RSVPRoyal = ({ config }) => {
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

  const inputStyle = { width: '100%', padding: '1rem', marginBottom: '1.25rem', backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(212,175,55,0.2)', color: '#e6d5b8', fontFamily: "'Montserrat', sans-serif", outline: 'none', fontSize: '0.95rem', transition: 'border-color 0.3s' };

  return (
    <div style={{ padding: '5rem 2rem', textAlign: 'center' }}>
      <p style={{ fontSize: '0.65rem', letterSpacing: '8px', textTransform: 'uppercase', color: 'rgba(212,175,55,0.5)', marginBottom: '0.75rem' }}>Guest Registry</p>
      <h2 style={{ fontSize: '2.5rem', color: '#d4af37', marginBottom: '4rem', letterSpacing: '4px', fontWeight: 400 }}>RSVP</h2>

      <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '4rem', textAlign: 'left' }}>
        <div style={{ flex: '1', minWidth: '280px' }}>
          <form onSubmit={submit}>
            <input style={inputStyle} placeholder="Honorable Guest Name" value={form.nama} onChange={e => setForm({ ...form, nama: e.target.value })} />
            <select style={{...inputStyle, cursor: 'pointer'}} value={form.kehadiran} onChange={e => setForm({ ...form, kehadiran: e.target.value })}>
              <option value="Hadir" style={{ color: '#000' }}>Will Attend</option>
              <option value="Tidak Hadir" style={{ color: '#000' }}>Unable to Attend</option>
            </select>
            <textarea style={{ ...inputStyle, height: '120px', resize: 'vertical' }} placeholder="Your Wishes &amp; Message..." value={form.pesan} onChange={e => setForm({ ...form, pesan: e.target.value })} />
            <button type="submit" disabled={loading} style={{ width: '100%', padding: '1.2rem', backgroundColor: '#d4af37', color: '#111', border: 'none', cursor: 'pointer', fontSize: '0.85rem', letterSpacing: '4px', textTransform: 'uppercase', fontWeight: 700, fontFamily: "'Cinzel', serif", transition: 'opacity 0.3s' }}>
              {sent ? '✓ Sent!' : loading ? 'Submitting...' : 'Send Wishes'}
            </button>
          </form>
        </div>

        <div style={{ flex: '1', minWidth: '280px', maxHeight: '500px', overflowY: 'auto', paddingRight: '0.5rem' }}>
          {messages.length === 0 && <p style={{ color: 'rgba(230,213,184,0.3)', fontSize: '0.9rem', fontFamily: "'Montserrat', sans-serif" }}>No messages yet. Be the first.</p>}
          {messages.map(m => (
            <div key={m.id} style={{ padding: '1.5rem', border: '1px solid rgba(212,175,55,0.12)', marginBottom: '1rem', backgroundColor: 'rgba(212,175,55,0.02)' }}>
              <p style={{ margin: '0 0 0.75rem', fontSize: '1rem', color: '#d4af37', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span>{m.nama}</span>
                <span style={{ fontSize: '0.65rem', color: m.kehadiran === 'Hadir' ? '#d4af37' : 'rgba(230,213,184,0.35)', border: `1px solid ${m.kehadiran === 'Hadir' ? 'rgba(212,175,55,0.4)' : 'rgba(255,255,255,0.1)'}`, padding: '2px 8px', letterSpacing: '2px' }}>{m.kehadiran}</span>
              </p>
              <p style={{ margin: 0, color: 'rgba(230,213,184,0.4)', lineHeight: 1.7, fontFamily: "'Montserrat', sans-serif", fontWeight: 300, fontSize: '0.9rem' }}>{m.pesan}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Footer = ({ config }) => (
  <div style={{ padding: '6rem 2rem 5rem', textAlign: 'center', borderTop: '1px solid rgba(212,175,55,0.1)' }}>
    <div style={{ width: '60px', height: '60px', margin: '0 auto 2rem', border: '1px solid rgba(212,175,55,0.4)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontFamily: "'Great Vibes', cursive", fontSize: '2rem', color: '#d4af37', lineHeight: 1 }}>
        {config.groom.namaPanggilan[0]}{config.bride.namaPanggilan[0]}
      </span>
    </div>
    <p style={{ fontSize: '1.5rem', color: '#e6d5b8', letterSpacing: '6px', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 400 }}>
      {config.groom.namaPanggilan} &amp; {config.bride.namaPanggilan}
    </p>
    <p style={{ color: 'rgba(212,175,55,0.5)', fontSize: '0.9rem', letterSpacing: '2px', fontFamily: "'Great Vibes', cursive", fontSize: '1.5rem' }}>{config.penutup.salam}</p>
    <p style={{ color: 'rgba(230,213,184,0.2)', fontSize: '0.7rem', letterSpacing: '3px', textTransform: 'uppercase', marginTop: '2rem' }}>{config.penutup.branding}</p>
  </div>
);

export default RoyalTheme;

import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";

const EditorialTheme = ({ config, isOpened, onOpen }) => {
  return (
    <div className="theme-editorial" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", backgroundColor: '#fff', color: '#111', minHeight: '100vh' }}>

      {/* Fixed black Hero that slides up on open */}
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 9999,
        backgroundColor: '#000', color: '#fff', overflow: 'hidden',
        transition: 'transform 1.2s cubic-bezier(0.77, 0, 0.175, 1)',
        transform: isOpened ? 'translateY(-100vh)' : 'translateY(0)',
        pointerEvents: isOpened ? 'none' : 'auto'
      }}>
        {/* Background image right side */}
        <div style={{ position: 'absolute', right: 0, top: 0, width: '60%', height: '100%', opacity: 0.5 }}>
          <img src={config.galeri[0]?.src || config.groom.foto} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(1)' }} alt="" />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #000 0%, transparent 60%)' }}></div>
        </div>

        {/* Left text content */}
        <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '8%', maxWidth: '600px' }}>
          <p style={{ letterSpacing: '8px', textTransform: 'uppercase', fontSize: '0.7rem', marginBottom: '1.5rem', color: 'rgba(255,255,255,0.5)', fontWeight: 400 }}>You're Invited</p>
          <h1 style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', fontFamily: "'Cinzel', serif", margin: '0 0 0.5rem', lineHeight: 1, fontWeight: 400 }}>
            THE WEDDING
          </h1>
          <h1 style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', fontFamily: "'Cinzel', serif", margin: '0 0 2rem', lineHeight: 1, fontWeight: 400, color: 'rgba(255,255,255,0.6)' }}>
            OF
          </h1>
          <p style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontFamily: "'Great Vibes', cursive", margin: '0 0 3rem', color: 'rgba(255,255,255,0.85)' }}>
            {config.groom.namaPanggilan} &amp; {config.bride.namaPanggilan}
          </p>
          <p style={{ fontSize: '0.85rem', letterSpacing: '3px', color: 'rgba(255,255,255,0.35)', marginBottom: '3rem' }}>{config.tanggalTampilan}</p>
          <button
            onClick={onOpen}
            style={{ padding: '1.2rem 3rem', backgroundColor: '#fff', color: '#000', border: 'none', cursor: 'pointer', fontSize: '0.85rem', letterSpacing: '4px', textTransform: 'uppercase', fontWeight: 700, width: 'max-content', transition: 'all 0.3s', fontFamily: 'inherit' }}
            onMouseOver={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.85)'; }}
            onMouseOut={e => { e.currentTarget.style.backgroundColor = '#fff'; }}
          >
            Enter Experience
          </button>
        </div>

        {/* Issue number / date stamp */}
        <div style={{ position: 'absolute', bottom: '2rem', right: '2rem', color: 'rgba(255,255,255,0.25)', fontSize: '0.7rem', letterSpacing: '3px', textTransform: 'uppercase', textAlign: 'right' }}>
          <p style={{ margin: 0 }}>{config.tanggalTampilan}</p>
          <p style={{ margin: '0.25rem 0 0' }}>Vol. I</p>
        </div>
      </div>

      {/* Main Content — split layout after open */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        opacity: isOpened ? 1 : 0,
        animation: isOpened ? 'fadeIn 1s 0.8s both' : 'none',
        pointerEvents: isOpened ? 'auto' : 'none'
      }}>
        {/* Spacer behind hero */}
        <div style={{ height: '100vh' }}></div>

        {/* Main scrollable body — editorial style */}
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '5rem 3rem', width: '100%' }}>
          
          {/* The Couple */}
          <Profiles config={config} />
          <Divider />
          <EventDetails config={config} />
          <Divider />
          <Gallery config={config} />
          <Divider />
          <DigitalEnvelope config={config} />
          <Divider />
          <RSVPEditorial config={config} />
          <Footer config={config} />
        </div>
      </div>
    </div>
  );
};

// --- SUB-COMPONENTS ---

const Divider = () => (
  <div style={{ height: '1px', backgroundColor: '#111', margin: '5rem 0' }}></div>
);

const Profiles = ({ config }) => (
  <div>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4rem', flexWrap: 'wrap', gap: '2rem' }}>
      <div>
        <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '5px', marginBottom: '0.5rem', color: '#888' }}>The Couple</p>
        <h2 style={{ fontSize: '3rem', fontFamily: "'Cinzel', serif", margin: 0, fontWeight: 400 }}>Meet the Pair</h2>
      </div>
      <p style={{ maxWidth: '380px', lineHeight: 1.9, fontStyle: 'italic', color: '#555', fontSize: '0.95rem' }}>&ldquo;{config.kutipan.teks}&rdquo;</p>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
      {[config.groom, config.bride].map((person, i) => (
        <div key={i} style={{ position: 'relative', overflow: 'hidden', cursor: 'default' }}>
          <img src={person.foto} alt={person.namaPanggilan} style={{ width: '100%', height: '480px', objectFit: 'cover', filter: 'grayscale(0.6)', display: 'block', transition: 'filter 0.5s' }}
            onMouseOver={e => e.currentTarget.style.filter = 'grayscale(0)'}
            onMouseOut={e => e.currentTarget.style.filter = 'grayscale(0.6)'}
          />
          <div style={{ padding: '1.5rem 0' }}>
            <h3 style={{ fontSize: '2rem', fontFamily: "'Cinzel', serif", margin: '0 0 0.5rem', fontWeight: 400 }}>{person.namaLengkap}</h3>
            <p style={{ margin: '0 0 1rem', color: '#777', fontSize: '0.9rem', lineHeight: 1.6 }}>{person.orangTua}</p>
            <a href={person.instagram} target="_blank" rel="noreferrer" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px', color: '#000', textDecoration: 'none', borderBottom: '1px solid #000', paddingBottom: '2px' }}>Instagram</a>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const EventDetails = ({ config }) => (
  <div>
    <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '5px', marginBottom: '0.5rem', color: '#888' }}>The Details</p>
    <h2 style={{ fontSize: '3rem', fontFamily: "'Cinzel', serif", margin: '0 0 4rem', fontWeight: 400 }}>Date &amp; Venue</h2>

    {[config.akad, config.resepsi].map((evt, i) => (
      <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem', marginBottom: '3rem', paddingBottom: '3rem', borderBottom: i === 0 ? '1px solid #eee' : 'none' }}>
        <div>
          <p style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '3px', margin: '0 0 1rem', fontSize: '0.8rem' }}>{evt.judul}</p>
          <p style={{ fontSize: '1.3rem', fontFamily: "'Cinzel', serif", margin: '0 0 0.5rem', fontWeight: 400 }}>{evt.tanggal}</p>
          <p style={{ fontSize: '0.95rem', color: '#666' }}>{evt.waktu}</p>
        </div>
        <div>
          <p style={{ fontSize: '1.3rem', fontWeight: 700, margin: '0 0 0.5rem' }}>{evt.tempat}</p>
          <p style={{ fontSize: '0.95rem', color: '#555', margin: '0 0 1.5rem', lineHeight: 1.7 }}>{evt.alamat}</p>
          <a href={evt.linkMaps} target="_blank" rel="noreferrer" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px', color: '#000', textDecoration: 'none', borderBottom: '1px solid #000' }}>View Location ↗</a>
        </div>
      </div>
    ))}
  </div>
);

const Gallery = ({ config }) => (
  <div>
    <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '5px', marginBottom: '0.5rem', color: '#888' }}>Our Story</p>
    <h2 style={{ fontSize: '3rem', fontFamily: "'Cinzel', serif", margin: '0 0 3rem', fontWeight: 400 }}>Gallery</h2>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
      {config.galeri.map((img, i) => (
        <div key={i} style={{ overflow: 'hidden', gridColumn: img.span === 'wide' ? '1 / -1' : 'auto' }}>
          <img src={img.src} alt="" style={{ width: '100%', height: img.span === 'wide' ? '500px' : '350px', objectFit: 'cover', display: 'block', filter: 'grayscale(0.7)', transition: 'filter 0.5s, transform 0.6s' }}
            onMouseOver={e => { e.currentTarget.style.filter = 'grayscale(0)'; e.currentTarget.style.transform = 'scale(1.03)'; }}
            onMouseOut={e => { e.currentTarget.style.filter = 'grayscale(0.7)'; e.currentTarget.style.transform = 'scale(1)'; }}
          />
        </div>
      ))}
    </div>
  </div>
);

const DigitalEnvelope = ({ config }) => (
  <div>
    <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '5px', marginBottom: '0.5rem', color: '#888' }}>Wedding Gift</p>
    <h2 style={{ fontSize: '3rem', fontFamily: "'Cinzel', serif", margin: '0 0 2rem', fontWeight: 400 }}>Gift</h2>
    <p style={{ marginBottom: '3rem', fontSize: '1rem', lineHeight: 1.8, maxWidth: '500px', color: '#555' }}>{config.teksAmplop}</p>

    {config.rekening.map((rek, i) => (
      <div key={i} style={{ padding: '2rem', border: '1px solid #111', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <p style={{ margin: '0 0 0.5rem', fontWeight: 700, fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '2px' }}>{rek.bank}</p>
          <p style={{ margin: 0, color: '#555', fontSize: '0.95rem' }}>{rek.nomorRekening} &nbsp;·&nbsp; a.n. {rek.atasNama}</p>
        </div>
        <button onClick={() => navigator.clipboard.writeText(rek.nomorRaw)} style={{ padding: '0.8rem 2rem', backgroundColor: '#111', color: '#fff', border: 'none', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.75rem', fontFamily: 'inherit', transition: 'opacity 0.3s' }}>Copy</button>
      </div>
    ))}
  </div>
);

const RSVPEditorial = ({ config }) => {
  const [messages, setMessages] = useState([]);
  const [form, setForm] = useState({ nama: '', pesan: '', kehadiran: 'Hadir' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "guestbook"), orderBy("timestamp", "desc"));
    const unsub = onSnapshot(q, snap => setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
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

  const inputStyle = { width: '100%', padding: '1rem 0', marginBottom: '2rem', border: 'none', borderBottom: '1px solid #111', backgroundColor: 'transparent', outline: 'none', fontFamily: 'inherit', fontSize: '1rem', color: '#111' };

  return (
    <div>
      <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '5px', marginBottom: '0.5rem', color: '#888' }}>Join Us</p>
      <h2 style={{ fontSize: '3rem', fontFamily: "'Cinzel', serif", margin: '0 0 4rem', fontWeight: 400 }}>RSVP</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
        <form onSubmit={submit}>
          <input style={inputStyle} placeholder="Full Name" value={form.nama} onChange={e => setForm({ ...form, nama: e.target.value })} />
          <select style={inputStyle} value={form.kehadiran} onChange={e => setForm({ ...form, kehadiran: e.target.value })}>
            <option value="Hadir">Accept with pleasure</option>
            <option value="Tidak Hadir">Decline with regret</option>
          </select>
          <textarea style={{ ...inputStyle, height: '100px', resize: 'none' }} placeholder="Your message..." value={form.pesan} onChange={e => setForm({ ...form, pesan: e.target.value })} />
          <button type="submit" disabled={loading} style={{ padding: '1rem 3rem', backgroundColor: '#111', color: '#fff', border: 'none', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '3px', fontWeight: 700, fontFamily: 'inherit', fontSize: '0.8rem', transition: 'opacity 0.3s' }}>
            {sent ? '✓ Sent!' : loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>

        <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
          {messages.length === 0 && <p style={{ color: '#aaa', fontSize: '0.9rem' }}>Be the first to leave a message.</p>}
          {messages.map(m => (
            <div key={m.id} style={{ marginBottom: '2.5rem', paddingBottom: '2.5rem', borderBottom: '1px solid #eee' }}>
              <p style={{ margin: '0 0 0.5rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>{m.nama}</span>
                <span style={{ fontWeight: 400, fontSize: '0.7rem', color: '#888', letterSpacing: '2px' }}>[{m.kehadiran}]</span>
              </p>
              <p style={{ margin: 0, color: '#444', lineHeight: 1.7, fontSize: '0.95rem' }}>{m.pesan}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Footer = ({ config }) => (
  <div style={{ textAlign: 'center', paddingTop: '5rem', marginTop: '3rem', borderTop: '1px solid #111' }}>
    <h2 style={{ fontSize: '2.5rem', fontFamily: "'Cinzel', serif", fontWeight: 400, letterSpacing: '5px', marginBottom: '1rem' }}>
      {config.groom.namaPanggilan} &amp; {config.bride.namaPanggilan}
    </h2>
    <p style={{ fontSize: '0.8rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '0.5rem' }}>{config.tanggalTampilan}</p>
    <p style={{ fontSize: '0.7rem', color: '#ccc', textTransform: 'uppercase', letterSpacing: '2px', marginTop: '2rem' }}>{config.penutup.branding}</p>
  </div>
);

export default EditorialTheme;

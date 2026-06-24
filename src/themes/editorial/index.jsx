import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";

const EditorialTheme = ({ config, isOpened, onOpen }) => {
  return (
    <div className="theme-editorial" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", backgroundColor: '#ffffff', color: '#111' }}>
      {!isOpened ? (
        <Hero config={config} onOpen={onOpen} />
      ) : (
        <div style={{ display: 'flex', flexDirection: window.innerWidth > 900 ? 'row' : 'column', minHeight: '100vh', animation: 'fadeIn 1s forwards' }}>
          
          {/* Left Side: Sticky Image */}
          <div style={{ flex: window.innerWidth > 900 ? '0 0 45%' : 'auto', height: window.innerWidth > 900 ? '100vh' : '60vh', position: window.innerWidth > 900 ? 'sticky' : 'relative', top: 0, overflow: 'hidden' }}>
            <img src={config.groom.foto} alt="Cover" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(0.5)' }} />
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to right, rgba(0,0,0,0.4), transparent)' }}></div>
            <h1 style={{ position: 'absolute', bottom: '2rem', left: '2rem', color: '#fff', fontSize: '3rem', fontFamily: "'Cinzel', serif", m: 0, lineHeight: 1 }}>
              {config.groom.namaPanggilan}<br/>&<br/>{config.bride.namaPanggilan}
            </h1>
          </div>

          {/* Right Side: Scrolling Content */}
          <div style={{ flex: '1', padding: window.innerWidth > 900 ? '4rem' : '2rem', backgroundColor: '#fff', overflowX: 'hidden' }}>
            <Profiles config={config} />
            <div style={{ height: '1px', backgroundColor: '#000', margin: '4rem 0' }}></div>
            <EventDetails config={config} />
            <div style={{ height: '1px', backgroundColor: '#000', margin: '4rem 0' }}></div>
            <Gallery config={config} />
            <div style={{ height: '1px', backgroundColor: '#000', margin: '4rem 0' }}></div>
            <DigitalEnvelope config={config} />
            <div style={{ height: '1px', backgroundColor: '#000', margin: '4rem 0' }}></div>
            <RSVPEditorial config={config} />
            <Footer config={config} />
          </div>

        </div>
      )}
    </div>
  );
};

// --- SUB-COMPONENTS ---

const Hero = ({ config, onOpen }) => (
  <div style={{ height: '100vh', display: 'flex', backgroundColor: '#000', color: '#fff', overflow: 'hidden' }}>
    <div style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '10%', zIndex: 2 }}>
      <p style={{ letterSpacing: '5px', textTransform: 'uppercase', fontSize: '0.8rem', marginBottom: '1rem' }}>You're Invited</p>
      <h1 style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', fontFamily: "'Cinzel', serif", margin: '0 0 2rem', lineHeight: 1 }}>
        THE WEDDING OF<br/>{config.groom.namaPanggilan} & {config.bride.namaPanggilan}
      </h1>
      <button onClick={onOpen} style={{ padding: '1.2rem 3rem', backgroundColor: '#fff', color: '#000', border: 'none', cursor: 'pointer', fontSize: '0.9rem', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 'bold', width: 'max-content' }}>
        Enter Experience
      </button>
    </div>
    <div style={{ position: 'absolute', right: 0, top: 0, width: '60%', height: '100%', opacity: 0.6 }}>
      <img src={config.galeri[0]?.src || config.groom.foto} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(1)' }} alt="" />
    </div>
  </div>
);

const Profiles = ({ config }) => (
  <div>
    <p style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem', color: '#777' }}>The Couple</p>
    <p style={{ fontSize: '1.2rem', lineHeight: 1.6, marginBottom: '4rem', fontStyle: 'italic', fontFamily: "'Cinzel', serif" }}>"{config.kutipan.teks}"</p>
    
    {[config.groom, config.bride].map((person, i) => (
      <div key={i} style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '3rem', margin: '0 0 0.5rem', fontFamily: "'Cinzel', serif", textTransform: 'uppercase' }}>{person.namaLengkap}</h2>
        <p style={{ margin: '0 0 1rem', color: '#555' }}>{person.orangTua}</p>
        <a href={person.instagram} target="_blank" rel="noreferrer" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#000', textDecoration: 'none', borderBottom: '1px solid #000', paddingBottom: '2px' }}>Instagram</a>
      </div>
    ))}
  </div>
);

const EventDetails = ({ config }) => (
  <div>
    <h2 style={{ fontSize: '2.5rem', fontFamily: "'Cinzel', serif", textTransform: 'uppercase', margin: '0 0 3rem' }}>The Details</h2>
    
    {[config.akad, config.resepsi].map((evt, i) => (
      <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', marginBottom: '3rem' }}>
        <div>
          <p style={{ fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', margin: '0 0 0.5rem' }}>{evt.judul}</p>
          <p style={{ fontSize: '0.9rem', color: '#777' }}>{evt.tanggal}</p>
          <p style={{ fontSize: '0.9rem', color: '#777' }}>{evt.waktu}</p>
        </div>
        <div>
          <p style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '0 0 0.5rem' }}>{evt.tempat}</p>
          <p style={{ fontSize: '1rem', color: '#555', margin: '0 0 1rem', lineHeight: 1.5 }}>{evt.alamat}</p>
          <a href={evt.linkMaps} target="_blank" rel="noreferrer" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#000', textDecoration: 'none', borderBottom: '1px solid #000' }}>View Location</a>
        </div>
      </div>
    ))}
  </div>
);

const Gallery = ({ config }) => (
  <div>
    <h2 style={{ fontSize: '2.5rem', fontFamily: "'Cinzel', serif", textTransform: 'uppercase', margin: '0 0 3rem' }}>Gallery</h2>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
      {config.galeri.map((img, i) => (
        <img key={i} src={img.src} alt="" style={{ width: '100%', height: 'auto', display: 'block', filter: 'grayscale(0.8)' }} onMouseOver={e => e.target.style.filter='grayscale(0)'} onMouseOut={e => e.target.style.filter='grayscale(0.8)'} />
      ))}
    </div>
  </div>
);

const DigitalEnvelope = ({ config }) => (
  <div>
    <h2 style={{ fontSize: '2.5rem', fontFamily: "'Cinzel', serif", textTransform: 'uppercase', margin: '0 0 2rem' }}>Gift</h2>
    <p style={{ marginBottom: '3rem', fontSize: '1.1rem', lineHeight: 1.6 }}>{config.teksAmplop}</p>
    
    {config.rekening.map((rek, i) => (
      <div key={i} style={{ padding: '2rem', border: '1px solid #000', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <p style={{ margin: '0 0 0.5rem', fontWeight: 'bold', fontSize: '1.2rem' }}>{rek.bank}</p>
          <p style={{ margin: 0, color: '#555' }}>{rek.nomorRekening} (a.n. {rek.atasNama})</p>
        </div>
        <button onClick={() => navigator.clipboard.writeText(rek.nomorRaw)} style={{ padding: '0.8rem 1.5rem', backgroundColor: '#000', color: '#fff', border: 'none', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.8rem' }}>Copy</button>
      </div>
    ))}
  </div>
);

const RSVPEditorial = () => {
  const [messages, setMessages] = useState([]);
  const [form, setForm] = useState({ nama: '', pesan: '', kehadiran: 'Hadir' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "guestbook"), orderBy("timestamp", "desc"));
    const unsub = onSnapshot(q, (snap) => setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
    return unsub;
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if(!form.nama || !form.pesan) return;
    setLoading(true);
    try {
      await addDoc(collection(db, "guestbook"), { ...form, timestamp: serverTimestamp() });
      setForm({ nama: '', pesan: '', kehadiran: 'Hadir' });
    } catch (error) {
      alert("Error.");
    }
    setLoading(false);
  };

  const inputStyle = { width: '100%', padding: '1rem 0', marginBottom: '2rem', border: 'none', borderBottom: '1px solid #000', backgroundColor: 'transparent', outline: 'none', fontFamily: 'inherit', fontSize: '1rem' };

  return (
    <div>
      <h2 style={{ fontSize: '2.5rem', fontFamily: "'Cinzel', serif", textTransform: 'uppercase', margin: '0 0 3rem' }}>RSVP</h2>
      
      <form onSubmit={submit} style={{ marginBottom: '4rem' }}>
        <input style={inputStyle} placeholder="Full Name" value={form.nama} onChange={e => setForm({...form, nama: e.target.value})} />
        <select style={inputStyle} value={form.kehadiran} onChange={e => setForm({...form, kehadiran: e.target.value})}>
          <option value="Hadir">Accept with pleasure</option>
          <option value="Tidak Hadir">Decline with regret</option>
        </select>
        <textarea style={{...inputStyle, height: '80px', resize: 'none'}} placeholder="Message" value={form.pesan} onChange={e => setForm({...form, pesan: e.target.value})} />
        <button type="submit" disabled={loading} style={{ padding: '1rem 3rem', backgroundColor: '#000', color: '#fff', border: 'none', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 'bold' }}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      
      <div>
        {messages.map(m => (
          <div key={m.id} style={{ marginBottom: '2rem' }}>
            <p style={{ margin: '0 0 0.5rem', fontWeight: 'bold', textTransform: 'uppercase' }}>{m.nama} <span style={{ color: '#888', fontWeight: 'normal', fontSize: '0.8rem', marginLeft: '1rem' }}>[{m.kehadiran}]</span></p>
            <p style={{ margin: 0, color: '#333', lineHeight: 1.6 }}>{m.pesan}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Footer = ({ config }) => (
  <div style={{ textAlign: 'center', marginTop: '6rem', paddingTop: '2rem', borderTop: '1px solid #eee' }}>
    <p style={{ fontSize: '1.5rem', fontFamily: "'Cinzel', serif", letterSpacing: '5px' }}>{config.groom.namaPanggilan} & {config.bride.namaPanggilan}</p>
    <p style={{ fontSize: '0.8rem', color: '#999', textTransform: 'uppercase', letterSpacing: '2px' }}>{config.tanggalTampilan}</p>
  </div>
);

export default EditorialTheme;

import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";

const MinimalistTheme = ({ config, isOpened, onOpen }) => {
  return (
    <div className="theme-minimalist" style={{ fontFamily: "'Inter', sans-serif", backgroundColor: 'var(--color-bg-body)', color: 'var(--color-text-light)' }}>
      <Hero config={config} isOpened={isOpened} onOpen={onOpen} />
      {isOpened && (
        <div style={{ animation: 'fadeIn 1s forwards' }}>
          <Profiles config={config} />
          <EventDetails config={config} />
          <Gallery config={config} />
          <DigitalEnvelope config={config} />
          <RSVPMini config={config} />
          <Footer config={config} />
        </div>
      )}
    </div>
  );
};

// --- SUB-COMPONENTS ---

const Hero = ({ config, isOpened, onOpen }) => (
  <div style={{
    minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    padding: '2rem', textAlign: 'center', backgroundColor: 'var(--color-primary)', position: 'relative', overflow: 'hidden'
  }}>
    <div style={{
      position: 'absolute', top: '2rem', bottom: '2rem', left: '2rem', right: '2rem',
      border: '1px solid var(--color-accent)', opacity: 0.3, pointerEvents: 'none'
    }}></div>
    
    <div style={{ zIndex: 1, transition: 'all 1s', transform: isOpened ? 'translateY(-50px)' : 'translateY(0)', opacity: isOpened ? 0 : 1, pointerEvents: isOpened ? 'none' : 'auto' }}>
      <p style={{ fontSize: '0.9rem', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '2rem', color: 'var(--color-secondary)' }}>The Wedding Of</p>
      <h1 style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 300, margin: '0 0 1rem 0', fontFamily: "'Playfair Display', serif", color: 'var(--color-text-light)', lineHeight: 1.1 }}>
        {config.groom.namaPanggilan} <br/><span style={{ fontSize: '0.5em', fontStyle: 'italic', color: 'var(--color-accent)' }}>&</span><br/> {config.bride.namaPanggilan}
      </h1>
      <p style={{ fontSize: '1rem', letterSpacing: '2px', marginTop: '2rem', color: 'var(--color-text-muted)' }}>{config.tanggalTampilan}</p>
      
      {!isOpened && (
        <button onClick={onOpen} style={{
          marginTop: '4rem', padding: '1rem 3rem', backgroundColor: 'transparent',
          border: '1px solid var(--color-accent)', color: 'var(--color-accent)',
          fontSize: '0.9rem', letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer',
          transition: 'all 0.3s'
        }} onMouseOver={e => { e.target.style.backgroundColor = 'var(--color-accent)'; e.target.style.color = 'var(--color-primary)'; }} onMouseOut={e => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = 'var(--color-accent)'; }}>
          Open Invitation
        </button>
      )}
    </div>
  </div>
);

const Profiles = ({ config }) => (
  <div style={{ padding: '6rem 2rem', backgroundColor: 'var(--color-bg-body)', textAlign: 'center' }}>
    <p style={{ fontSize: '0.8rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: '1rem' }}>Bismillah</p>
    <p style={{ maxWidth: '600px', margin: '0 auto 4rem', lineHeight: 1.8, color: 'var(--color-text-muted)', fontStyle: 'italic' }}>{config.kutipan.teks}</p>
    
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', maxWidth: '800px', margin: '0 auto' }}>
      {[config.groom, config.bride].map((person, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: i % 2 === 0 ? 'row' : 'row-reverse', alignItems: 'center', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <img src={person.foto} alt={person.namaPanggilan} style={{ width: '250px', height: '350px', objectFit: 'cover', filter: 'grayscale(0.3)' }} />
          <div style={{ textAlign: i % 2 === 0 ? 'left' : 'right', flex: '1', minWidth: '250px' }}>
            <h3 style={{ fontSize: '2.5rem', fontFamily: "'Playfair Display', serif", margin: '0 0 0.5rem 0', color: 'var(--color-text-light)' }}>{person.namaLengkap}</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>{person.orangTua}</p>
            <a href={person.instagram} target="_blank" rel="noreferrer" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '1px', textTransform: 'uppercase', borderBottom: '1px solid var(--color-accent)' }}>Instagram</a>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const EventDetails = ({ config }) => (
  <div style={{ padding: '6rem 2rem', backgroundColor: 'var(--color-primary)', color: 'var(--color-text-light)' }}>
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', fontSize: '2rem', fontFamily: "'Playfair Display', serif", marginBottom: '4rem', letterSpacing: '2px' }}>Event Details</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
        {[config.akad, config.resepsi].map((evt, i) => (
          <div key={i} style={{ borderLeft: '1px solid var(--color-accent)', paddingLeft: '2rem' }}>
            <p style={{ color: 'var(--color-accent)', fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1rem' }}>{evt.judul}</p>
            <h3 style={{ fontSize: '1.5rem', margin: '0 0 1rem 0', fontFamily: "'Playfair Display', serif" }}>{evt.tanggal}</h3>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>{evt.waktu}</p>
            <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>{evt.tempat}</p>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem', lineHeight: 1.6 }}>{evt.alamat}</p>
            <a href={evt.linkMaps} target="_blank" rel="noreferrer" style={{ display: 'inline-block', padding: '0.8rem 2rem', border: '1px solid var(--color-text-light)', color: 'var(--color-text-light)', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '1px', textTransform: 'uppercase', transition: 'all 0.3s' }}>View Map</a>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Gallery = ({ config }) => (
  <div style={{ padding: '6rem 2rem', backgroundColor: 'var(--color-bg-body)' }}>
    <h2 style={{ textAlign: 'center', fontSize: '2rem', fontFamily: "'Playfair Display', serif", marginBottom: '4rem', color: 'var(--color-text-light)', letterSpacing: '2px' }}>Gallery</h2>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', maxWidth: '1000px', margin: '0 auto' }}>
      {config.galeri.map((img, i) => (
        <img key={i} src={img.src} alt="Gallery" style={{ width: '100%', height: img.span === 'wide' ? '400px' : '300px', objectFit: 'cover', gridColumn: img.span === 'wide' ? '1 / -1' : 'auto', filter: 'grayscale(0.2)' }} />
      ))}
    </div>
  </div>
);

const DigitalEnvelope = ({ config }) => (
  <div style={{ padding: '6rem 2rem', backgroundColor: 'var(--color-primary)', textAlign: 'center' }}>
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '3rem 2rem', border: '1px solid var(--color-accent)' }}>
      <h2 style={{ fontSize: '2rem', fontFamily: "'Playfair Display', serif", marginBottom: '1rem', color: 'var(--color-text-light)' }}>Wedding Gift</h2>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: '3rem', fontSize: '0.9rem', lineHeight: 1.6 }}>{config.teksAmplop}</p>
      
      {config.rekening.map((rek, i) => (
        <div key={i} style={{ marginBottom: '2rem' }}>
          <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--color-text-light)' }}>{rek.bank} - {rek.nomorRekening}</p>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>a.n. {rek.atasNama}</p>
          <button onClick={() => navigator.clipboard.writeText(rek.nomorRaw)} style={{ padding: '0.5rem 1.5rem', backgroundColor: 'var(--color-text-light)', color: 'var(--color-primary)', border: 'none', cursor: 'pointer', fontSize: '0.8rem', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 'bold' }}>Copy Account</button>
        </div>
      ))}
    </div>
  </div>
);

const RSVPMini = () => {
  const [messages, setMessages] = useState([]);
  const [form, setForm] = useState({ nama: '', pesan: '', kehadiran: 'Hadir' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "guestbook"), orderBy("timestamp", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
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
      alert("Error submitting RSVP.");
    }
    setLoading(false);
  };

  const inputStyle = { width: '100%', padding: '1rem', marginBottom: '1rem', backgroundColor: 'transparent', border: '1px solid var(--color-accent)', color: 'var(--color-text-light)', outline: 'none', fontFamily: 'inherit' };

  return (
    <div style={{ padding: '6rem 2rem', backgroundColor: 'var(--color-bg-body)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
        <div style={{ gridColumn: '1 / -1' }}><h2 style={{ fontSize: '2rem', fontFamily: "'Playfair Display', serif", color: 'var(--color-text-light)', marginBottom: '2rem' }}>RSVP & Guestbook</h2></div>
        
        <div style={{ gridColumn: window.innerWidth > 768 ? '1 / 2' : '1 / -1' }}>
          <form onSubmit={submit}>
            <input style={inputStyle} placeholder="Name" value={form.nama} onChange={e => setForm({...form, nama: e.target.value})} />
            <select style={inputStyle} value={form.kehadiran} onChange={e => setForm({...form, kehadiran: e.target.value})}>
              <option value="Hadir" style={{color:'#000'}}>Will Attend</option>
              <option value="Tidak Hadir" style={{color:'#000'}}>Unable to Attend</option>
            </select>
            <textarea style={{...inputStyle, height: '120px', resize: 'vertical'}} placeholder="Message / Wishes" value={form.pesan} onChange={e => setForm({...form, pesan: e.target.value})} />
            <button type="submit" disabled={loading} style={{ width: '100%', padding: '1rem', backgroundColor: 'var(--color-accent)', color: 'var(--color-primary)', border: 'none', cursor: 'pointer', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase' }}>
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
        
        <div style={{ gridColumn: window.innerWidth > 768 ? '2 / 3' : '1 / -1', maxHeight: '400px', overflowY: 'auto', paddingRight: '1rem' }}>
          {messages.map(m => (
            <div key={m.id} style={{ paddingBottom: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold', color: 'var(--color-text-light)' }}>{m.nama} <span style={{ fontSize: '0.7rem', padding: '2px 6px', backgroundColor: m.kehadiran==='Hadir' ? 'var(--color-accent)' : '#ccc', color: '#000', marginLeft: '0.5rem', borderRadius: '2px' }}>{m.kehadiran}</span></p>
              <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>{m.pesan}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Footer = ({ config }) => (
  <div style={{ padding: '4rem 2rem', textAlign: 'center', backgroundColor: 'var(--color-primary)' }}>
    <p style={{ color: 'var(--color-secondary)', fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontStyle: 'italic', marginBottom: '1rem' }}>{config.penutup.salam}</p>
    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase' }}>{config.groom.namaPanggilan} & {config.bride.namaPanggilan}</p>
  </div>
);

export default MinimalistTheme;

import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";

const RoyalTheme = ({ config, isOpened, onOpen }) => {
  return (
    <div className="theme-royal" style={{ fontFamily: "'Cinzel', serif", backgroundColor: '#1a1a1a', color: '#e6d5b8', minHeight: '100vh', backgroundImage: 'radial-gradient(circle at center, #2a2a2a 0%, #111 100%)' }}>
      
      {/* Ornate Border Overlay */}
      <div style={{ position: 'fixed', top: '20px', left: '20px', right: '20px', bottom: '20px', border: '1px solid rgba(212, 175, 55, 0.3)', pointerEvents: 'none', zIndex: 99 }}>
        <div style={{ position: 'absolute', top: '-10px', left: '-10px', width: '30px', height: '30px', borderTop: '2px solid #d4af37', borderLeft: '2px solid #d4af37' }}></div>
        <div style={{ position: 'absolute', top: '-10px', right: '-10px', width: '30px', height: '30px', borderTop: '2px solid #d4af37', borderRight: '2px solid #d4af37' }}></div>
        <div style={{ position: 'absolute', bottom: '-10px', left: '-10px', width: '30px', height: '30px', borderBottom: '2px solid #d4af37', borderLeft: '2px solid #d4af37' }}></div>
        <div style={{ position: 'absolute', bottom: '-10px', right: '-10px', width: '30px', height: '30px', borderBottom: '2px solid #d4af37', borderRight: '2px solid #d4af37' }}></div>
      </div>

      <Hero config={config} isOpened={isOpened} onOpen={onOpen} />
      
      {isOpened && (
        <div style={{ animation: 'fadeIn 1.5s forwards' }}>
          <Profiles config={config} />
          <div style={{ textAlign: 'center', margin: '3rem 0' }}><span style={{ color: '#d4af37', fontSize: '2rem' }}>❖</span></div>
          <EventDetails config={config} />
          <div style={{ textAlign: 'center', margin: '3rem 0' }}><span style={{ color: '#d4af37', fontSize: '2rem' }}>❖</span></div>
          <Gallery config={config} />
          <div style={{ textAlign: 'center', margin: '3rem 0' }}><span style={{ color: '#d4af37', fontSize: '2rem' }}>❖</span></div>
          <DigitalEnvelope config={config} />
          <div style={{ textAlign: 'center', margin: '3rem 0' }}><span style={{ color: '#d4af37', fontSize: '2rem' }}>❖</span></div>
          <RSVPRoyal config={config} />
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
    padding: '2rem', textAlign: 'center', position: 'relative'
  }}>
    <div style={{ zIndex: 1, transition: 'all 1.5s', transform: isOpened ? 'scale(1.1)' : 'scale(1)', opacity: isOpened ? 0 : 1, pointerEvents: isOpened ? 'none' : 'auto', padding: '4rem 2rem', backgroundColor: 'rgba(17, 17, 17, 0.8)', border: '1px solid rgba(212, 175, 55, 0.5)', borderRadius: '5px', backdropFilter: 'blur(10px)', maxWidth: '600px', width: '100%' }}>
      
      <div style={{ width: '80px', height: '80px', margin: '0 auto 2rem', border: '1px solid #d4af37', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: "'Great Vibes', cursive", fontSize: '2.5rem', color: '#d4af37', lineHeight: 1 }}>
          {config.groom.namaPanggilan[0]}{config.bride.namaPanggilan[0]}
        </span>
      </div>

      <p style={{ fontSize: '0.9rem', letterSpacing: '5px', textTransform: 'uppercase', marginBottom: '1.5rem', color: '#a0a0a0' }}>The Royal Wedding</p>
      
      <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', margin: '0 0 2rem 0', color: '#d4af37', lineHeight: 1.2 }}>
        {config.groom.namaPanggilan} <span style={{ fontSize: '0.6em', color: '#888' }}>&</span> {config.bride.namaPanggilan}
      </h1>
      
      <p style={{ fontSize: '1.2rem', letterSpacing: '3px', color: '#e6d5b8' }}>{config.tanggalTampilan}</p>
      
      {!isOpened && (
        <button onClick={onOpen} style={{
          marginTop: '4rem', padding: '1rem 3rem', backgroundColor: 'transparent',
          border: '1px solid #d4af37', color: '#d4af37',
          fontSize: '0.9rem', letterSpacing: '3px', textTransform: 'uppercase', cursor: 'pointer',
          transition: 'all 0.3s'
        }} onMouseOver={e => { e.target.style.backgroundColor = '#d4af37'; e.target.style.color = '#111'; }} onMouseOut={e => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#d4af37'; }}>
          Unlock Invitation
        </button>
      )}
    </div>
  </div>
);

const Profiles = ({ config }) => (
  <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
    <p style={{ maxWidth: '600px', margin: '0 auto 5rem', fontSize: '1.1rem', fontStyle: 'italic', color: '#a0a0a0', lineHeight: 1.8 }}>"{config.kutipan.teks}"</p>
    
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '4rem' }}>
      {[config.groom, config.bride].map((person, i) => (
        <div key={i} style={{ width: '300px' }}>
          <div style={{ width: '250px', height: '350px', margin: '0 auto 2rem', padding: '10px', border: '1px solid #d4af37', borderRadius: '150px 150px 0 0' }}>
            <img src={person.foto} alt={person.namaPanggilan} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '140px 140px 0 0', filter: 'sepia(0.3) contrast(1.2)' }} />
          </div>
          <h3 style={{ fontSize: '2rem', margin: '0 0 1rem', color: '#d4af37' }}>{person.namaLengkap}</h3>
          <p style={{ color: '#a0a0a0', fontSize: '0.9rem', lineHeight: 1.6 }}>{person.orangTua}</p>
        </div>
      ))}
    </div>
  </div>
);

const EventDetails = ({ config }) => (
  <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
    <h2 style={{ fontSize: '3rem', color: '#d4af37', marginBottom: '4rem', letterSpacing: '4px' }}>The Ceremony</h2>
    
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '3rem', maxWidth: '1000px', margin: '0 auto' }}>
      {[config.akad, config.resepsi].map((evt, i) => (
        <div key={i} style={{ flex: '1', minWidth: '300px', padding: '3rem', backgroundColor: 'rgba(212, 175, 55, 0.03)', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
          <p style={{ color: '#d4af37', fontSize: '1rem', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '2rem' }}>{evt.judul}</p>
          <h3 style={{ fontSize: '2rem', margin: '0 0 1rem 0', color: '#e6d5b8' }}>{evt.tanggal}</h3>
          <p style={{ color: '#a0a0a0', marginBottom: '2rem', fontSize: '1.2rem' }}>{evt.waktu}</p>
          <div style={{ width: '50px', height: '1px', backgroundColor: '#d4af37', margin: '0 auto 2rem' }}></div>
          <p style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '1rem' }}>{evt.tempat}</p>
          <p style={{ fontSize: '1rem', color: '#a0a0a0', marginBottom: '3rem', lineHeight: 1.6 }}>{evt.alamat}</p>
          <a href={evt.linkMaps} target="_blank" rel="noreferrer" style={{ padding: '1rem 2.5rem', backgroundColor: '#d4af37', color: '#111', textDecoration: 'none', fontSize: '0.9rem', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 'bold' }}>View Map</a>
        </div>
      ))}
    </div>
  </div>
);

const Gallery = ({ config }) => (
  <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
    <h2 style={{ fontSize: '3rem', color: '#d4af37', marginBottom: '4rem', letterSpacing: '4px' }}>Portraits</h2>
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      {config.galeri.map((img, i) => (
        <div key={i} style={{ width: img.span === 'wide' ? '100%' : 'calc(50% - 1rem)', minWidth: '300px', padding: '15px', backgroundColor: '#222', border: '1px solid rgba(212, 175, 55, 0.4)' }}>
          <img src={img.src} alt="Gallery" style={{ width: '100%', height: img.span === 'wide' ? '500px' : '400px', objectFit: 'cover', filter: 'sepia(0.2) contrast(1.1)' }} />
        </div>
      ))}
    </div>
  </div>
);

const DigitalEnvelope = ({ config }) => (
  <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
    <h2 style={{ fontSize: '3rem', color: '#d4af37', marginBottom: '2rem', letterSpacing: '4px' }}>Wedding Gift</h2>
    <p style={{ maxWidth: '600px', margin: '0 auto 4rem', color: '#a0a0a0', lineHeight: 1.8, fontSize: '1.1rem' }}>{config.teksAmplop}</p>
    
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem' }}>
      {config.rekening.map((rek, i) => (
        <div key={i} style={{ padding: '3rem 2rem', border: '1px solid rgba(212, 175, 55, 0.5)', minWidth: '300px', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <p style={{ fontSize: '1.5rem', color: '#d4af37', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '2px' }}>{rek.bank}</p>
          <p style={{ fontSize: '1.5rem', color: '#e6d5b8', marginBottom: '1rem', letterSpacing: '3px' }}>{rek.nomorRekening}</p>
          <p style={{ color: '#a0a0a0', marginBottom: '2rem' }}>{rek.atasNama}</p>
          <button onClick={() => navigator.clipboard.writeText(rek.nomorRaw)} style={{ padding: '0.8rem 2rem', backgroundColor: 'transparent', color: '#d4af37', border: '1px solid #d4af37', cursor: 'pointer', fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase', transition: 'all 0.3s' }} onMouseOver={e => { e.target.style.backgroundColor = '#d4af37'; e.target.style.color = '#111'; }} onMouseOut={e => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#d4af37'; }}>Copy Details</button>
        </div>
      ))}
    </div>
  </div>
);

const RSVPRoyal = () => {
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

  const inputStyle = { width: '100%', padding: '1rem', marginBottom: '1.5rem', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(212,175,55,0.3)', color: '#e6d5b8', fontFamily: 'inherit', outline: 'none' };

  return (
    <div style={{ padding: '4rem 2rem' }}>
      <h2 style={{ textAlign: 'center', fontSize: '3rem', color: '#d4af37', marginBottom: '4rem', letterSpacing: '4px' }}>Guest Registry</h2>
      
      <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '4rem' }}>
        <div style={{ flex: '1', minWidth: '300px' }}>
          <form onSubmit={submit}>
            <input style={inputStyle} placeholder="Honorable Guest Name" value={form.nama} onChange={e => setForm({...form, nama: e.target.value})} />
            <select style={inputStyle} value={form.kehadiran} onChange={e => setForm({...form, kehadiran: e.target.value})}>
              <option value="Hadir" style={{color:'#000'}}>Will Attend</option>
              <option value="Tidak Hadir" style={{color:'#000'}}>Unable to Attend</option>
            </select>
            <textarea style={{...inputStyle, height: '120px', resize: 'vertical'}} placeholder="Your Wishes..." value={form.pesan} onChange={e => setForm({...form, pesan: e.target.value})} />
            <button type="submit" disabled={loading} style={{ width: '100%', padding: '1.2rem', backgroundColor: '#d4af37', color: '#111', border: 'none', cursor: 'pointer', fontSize: '1rem', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 'bold' }}>
              {loading ? 'Submitting...' : 'Send Wishes'}
            </button>
          </form>
        </div>
        
        <div style={{ flex: '1', minWidth: '300px', maxHeight: '500px', overflowY: 'auto', paddingRight: '1rem' }}>
          {messages.map(m => (
            <div key={m.id} style={{ padding: '2rem', border: '1px solid rgba(212,175,55,0.2)', marginBottom: '1.5rem', backgroundColor: 'rgba(0,0,0,0.3)' }}>
              <p style={{ margin: '0 0 1rem', fontSize: '1.2rem', color: '#d4af37', display: 'flex', justifyContent: 'space-between' }}>
                <span>{m.nama}</span>
                <span style={{ fontSize: '0.8rem', color: m.kehadiran==='Hadir' ? '#d4af37' : '#888', border: `1px solid ${m.kehadiran==='Hadir' ? '#d4af37' : '#888'}`, padding: '2px 8px' }}>{m.kehadiran}</span>
              </p>
              <p style={{ margin: 0, color: '#a0a0a0', lineHeight: 1.6 }}>{m.pesan}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Footer = ({ config }) => (
  <div style={{ padding: '6rem 2rem 4rem', textAlign: 'center' }}>
    <div style={{ width: '50px', height: '50px', margin: '0 auto 2rem', border: '1px solid #d4af37', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontFamily: "'Great Vibes', cursive", fontSize: '1.5rem', color: '#d4af37', lineHeight: 1 }}>
        {config.groom.namaPanggilan[0]}{config.bride.namaPanggilan[0]}
      </span>
    </div>
    <p style={{ fontSize: '1.5rem', color: '#e6d5b8', letterSpacing: '5px', textTransform: 'uppercase', marginBottom: '1rem' }}>
      {config.groom.namaPanggilan} & {config.bride.namaPanggilan}
    </p>
    <p style={{ color: '#a0a0a0', fontSize: '0.9rem', letterSpacing: '2px', fontStyle: 'italic' }}>{config.penutup.salam}</p>
  </div>
);

export default RoyalTheme;

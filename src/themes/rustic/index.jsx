import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";

const RusticTheme = ({ config, isOpened, onOpen }) => {
  return (
    <div className="theme-rustic" style={{ fontFamily: "'Montserrat', sans-serif", backgroundColor: '#fdfbf7', color: '#4a5d23' }}>
      <Hero config={config} isOpened={isOpened} onOpen={onOpen} />
      {isOpened && (
        <div style={{ animation: 'fadeIn 1.2s forwards' }}>
          <Profiles config={config} />
          <EventDetails config={config} />
          <Gallery config={config} />
          <DigitalEnvelope config={config} />
          <RSVPRustic config={config} />
          <Footer config={config} />
        </div>
      )}
    </div>
  );
};

// --- SUB-COMPONENTS ---

const leafOverlay = (
  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', backgroundImage: 'radial-gradient(circle at top left, rgba(74, 93, 35, 0.1) 0%, transparent 40%), radial-gradient(circle at bottom right, rgba(139, 101, 8, 0.1) 0%, transparent 40%)' }}></div>
);

const Hero = ({ config, isOpened, onOpen }) => (
  <div style={{
    minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    padding: '2rem', textAlign: 'center', backgroundColor: '#f4f1ea', position: 'relative', overflow: 'hidden'
  }}>
    {leafOverlay}
    
    <div style={{ zIndex: 1, transition: 'all 1.5s ease-in-out', transform: isOpened ? 'scale(1.1)' : 'scale(1)', opacity: isOpened ? 0 : 1, pointerEvents: isOpened ? 'none' : 'auto', border: '2px solid #8b6508', padding: '3rem 2rem', borderRadius: '15px', backgroundColor: 'rgba(253,251,247,0.8)', backdropFilter: 'blur(5px)' }}>
      <p style={{ fontSize: '1rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1rem', color: '#8b6508' }}>Pernikahan</p>
      <h1 style={{ fontSize: 'clamp(4rem, 10vw, 7rem)', margin: '0', fontFamily: "'Great Vibes', cursive", color: '#4a5d23', textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>
        {config.groom.namaPanggilan} & {config.bride.namaPanggilan}
      </h1>
      <p style={{ fontSize: '1.2rem', marginTop: '1rem', color: '#555', fontWeight: 'bold' }}>{config.tanggalTampilan}</p>
      
      {!isOpened && (
        <button onClick={onOpen} style={{
          marginTop: '3rem', padding: '1rem 2.5rem', backgroundColor: '#4a5d23', borderRadius: '30px',
          border: 'none', color: '#fff', fontWeight: 'bold',
          fontSize: '1rem', letterSpacing: '1px', cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(74, 93, 35, 0.3)', transition: 'transform 0.3s'
        }} onMouseOver={e => e.target.style.transform = 'scale(1.05)'} onMouseOut={e => e.target.style.transform = 'scale(1)'}>
          Buka Undangan 🌿
        </button>
      )}
    </div>
  </div>
);

const Profiles = ({ config }) => (
  <div style={{ padding: '5rem 2rem', backgroundColor: '#fdfbf7', textAlign: 'center', position: 'relative' }}>
    <h2 style={{ fontFamily: "'Great Vibes', cursive", fontSize: '3rem', color: '#8b6508', marginBottom: '1rem' }}>Mempelai</h2>
    <p style={{ maxWidth: '700px', margin: '0 auto 4rem', color: '#666', fontStyle: 'italic', lineHeight: 1.8 }}>"{config.kutipan.teks}"</p>
    
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '3rem' }}>
      {[config.groom, config.bride].map((person, i) => (
        <div key={i} style={{ flex: '1', minWidth: '280px', maxWidth: '350px', backgroundColor: '#fff', padding: '1.5rem', borderRadius: '10px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', position: 'relative' }}>
          <div style={{ width: '100%', height: '350px', borderRadius: '8px', overflow: 'hidden', marginBottom: '1.5rem' }}>
            <img src={person.foto} alt={person.namaPanggilan} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <h3 style={{ fontSize: '1.5rem', margin: '0 0 0.5rem 0', color: '#4a5d23' }}>{person.namaLengkap}</h3>
          <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{person.orangTua}</p>
          <a href={person.instagram} target="_blank" rel="noreferrer" style={{ display: 'inline-block', padding: '0.5rem 1.5rem', borderRadius: '20px', border: '1px solid #4a5d23', color: '#4a5d23', textDecoration: 'none', fontSize: '0.8rem', transition: 'all 0.3s' }}>@Instagram</a>
        </div>
      ))}
    </div>
  </div>
);

const EventDetails = ({ config }) => (
  <div style={{ padding: '6rem 2rem', backgroundColor: '#f4f1ea', position: 'relative' }}>
    {leafOverlay}
    <h2 style={{ textAlign: 'center', fontFamily: "'Great Vibes', cursive", fontSize: '3.5rem', color: '#4a5d23', marginBottom: '3rem' }}>Waktu & Tempat</h2>
    
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      {[config.akad, config.resepsi].map((evt, i) => (
        <div key={i} style={{ flex: '1', minWidth: '300px', backgroundColor: '#fff', padding: '3rem 2rem', borderRadius: '15px', textAlign: 'center', boxShadow: '0 5px 20px rgba(74, 93, 35, 0.08)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-20px', right: '-20px', fontSize: '4rem', opacity: 0.1 }}>🌿</div>
          <h3 style={{ color: '#8b6508', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem' }}>{evt.judul}</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4a5d23', margin: '0 0 0.5rem 0' }}>{evt.tanggal}</p>
          <p style={{ color: '#666', marginBottom: '1.5rem' }}>Pukul {evt.waktu}</p>
          <p style={{ fontWeight: 'bold', color: '#333' }}>{evt.tempat}</p>
          <p style={{ fontSize: '0.9rem', color: '#777', margin: '0.5rem 0 2rem' }}>{evt.alamat}</p>
          <a href={evt.linkMaps} target="_blank" rel="noreferrer" style={{ padding: '0.8rem 2rem', backgroundColor: '#8b6508', color: '#fff', textDecoration: 'none', borderRadius: '30px', fontSize: '0.9rem' }}>Buka Google Maps</a>
        </div>
      ))}
    </div>
  </div>
);

const Gallery = ({ config }) => (
  <div style={{ padding: '6rem 2rem', backgroundColor: '#fdfbf7', textAlign: 'center' }}>
    <h2 style={{ fontFamily: "'Great Vibes', cursive", fontSize: '3.5rem', color: '#8b6508', marginBottom: '1rem' }}>Momen Kami</h2>
    <p style={{ color: '#666', marginBottom: '3rem' }}>Kenangan indah yang terabadikan</p>
    
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      {config.galeri.map((img, i) => (
        <div key={i} style={{ backgroundColor: '#fff', padding: '10px 10px 40px 10px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', transform: `rotate(${Math.random() * 6 - 3}deg)`, transition: 'transform 0.3s', cursor: 'pointer' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05) rotate(0deg)'} onMouseOut={e => e.currentTarget.style.transform = `rotate(${Math.random() * 6 - 3}deg)`}>
          <img src={img.src} alt="Gallery" style={{ width: img.span === 'wide' ? '600px' : '280px', height: '300px', objectFit: 'cover', maxWidth: '100%' }} />
        </div>
      ))}
    </div>
  </div>
);

const DigitalEnvelope = ({ config }) => (
  <div style={{ padding: '5rem 2rem', backgroundColor: '#f4f1ea', textAlign: 'center' }}>
    <h2 style={{ fontFamily: "'Great Vibes', cursive", fontSize: '3rem', color: '#4a5d23', marginBottom: '1rem' }}>Tanda Kasih</h2>
    <p style={{ maxWidth: '600px', margin: '0 auto 3rem', color: '#666', lineHeight: 1.6 }}>{config.teksAmplop}</p>
    
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem' }}>
      {config.rekening.map((rek, i) => (
        <div key={i} style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '15px', border: '1px dashed #8b6508', minWidth: '250px' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{rek.icon}</div>
          <h3 style={{ color: '#4a5d23', margin: '0 0 0.5rem' }}>{rek.bank}</h3>
          <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#333', letterSpacing: '1px', marginBottom: '0.5rem' }}>{rek.nomorRekening}</p>
          <p style={{ color: '#666', marginBottom: '1.5rem' }}>a.n. {rek.atasNama}</p>
          <button onClick={() => navigator.clipboard.writeText(rek.nomorRaw)} style={{ padding: '0.6rem 1.5rem', backgroundColor: '#f4f1ea', border: '1px solid #8b6508', color: '#8b6508', borderRadius: '20px', cursor: 'pointer' }}>Salin Rekening</button>
        </div>
      ))}
    </div>
  </div>
);

const RSVPRustic = () => {
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

  const inputStyle = { width: '100%', padding: '1rem', marginBottom: '1rem', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fdfbf7', fontFamily: 'inherit' };

  return (
    <div style={{ padding: '6rem 2rem', backgroundColor: '#fdfbf7' }}>
      <h2 style={{ textAlign: 'center', fontFamily: "'Great Vibes', cursive", fontSize: '3.5rem', color: '#8b6508', marginBottom: '3rem' }}>Buku Tamu & RSVP</h2>
      <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '3rem' }}>
        
        <div style={{ flex: '1', minWidth: '300px', backgroundColor: '#fff', padding: '2rem', borderRadius: '15px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)' }}>
          <form onSubmit={submit}>
            <input style={inputStyle} placeholder="Nama Anda" value={form.nama} onChange={e => setForm({...form, nama: e.target.value})} />
            <select style={inputStyle} value={form.kehadiran} onChange={e => setForm({...form, kehadiran: e.target.value})}>
              <option value="Hadir">Hadir</option>
              <option value="Tidak Hadir">Maaf, Tidak Bisa Hadir</option>
            </select>
            <textarea style={{...inputStyle, height: '100px'}} placeholder="Berikan doa & ucapan..." value={form.pesan} onChange={e => setForm({...form, pesan: e.target.value})} />
            <button type="submit" disabled={loading} style={{ width: '100%', padding: '1rem', backgroundColor: '#4a5d23', color: '#fff', border: 'none', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold' }}>
              {loading ? 'Mengirim...' : 'Kirim Ucapan'}
            </button>
          </form>
        </div>
        
        <div style={{ flex: '1', minWidth: '300px', maxHeight: '450px', overflowY: 'auto', paddingRight: '1rem' }}>
          {messages.map(m => (
            <div key={m.id} style={{ backgroundColor: '#f4f1ea', padding: '1.5rem', borderRadius: '10px', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 'bold', color: '#4a5d23' }}>{m.nama}</span>
                <span style={{ fontSize: '0.75rem', backgroundColor: m.kehadiran==='Hadir' ? '#e0e8d3' : '#f2dcdb', color: m.kehadiran==='Hadir' ? '#4a5d23' : '#a04040', padding: '4px 8px', borderRadius: '12px' }}>{m.kehadiran}</span>
              </div>
              <p style={{ margin: 0, color: '#555', fontSize: '0.95rem', lineHeight: 1.5 }}>{m.pesan}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Footer = ({ config }) => (
  <div style={{ padding: '3rem 2rem', textAlign: 'center', backgroundColor: '#4a5d23', color: '#fff' }}>
    <h2 style={{ fontFamily: "'Great Vibes', cursive", fontSize: '2.5rem', margin: '0 0 0.5rem 0' }}>{config.groom.namaPanggilan} & {config.bride.namaPanggilan}</h2>
    <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>Terima kasih atas doa & restunya.</p>
  </div>
);

export default RusticTheme;

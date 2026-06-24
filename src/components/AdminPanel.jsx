import React, { useState, useEffect } from 'react';
import CONFIG from '../config';

const STORAGE_KEY = 'wedding_config_override';

function loadConfig() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) { /* ignore */ }
  return null;
}

function saveConfig(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getConfig() {
  const override = loadConfig();
  if (!override) return CONFIG;
  // Deep merge: override on top of CONFIG
  return deepMerge(CONFIG, override);
}

function deepMerge(base, override) {
  const result = { ...base };
  for (const key of Object.keys(override)) {
    if (override[key] && typeof override[key] === 'object' && !Array.isArray(override[key])) {
      result[key] = deepMerge(base[key] || {}, override[key]);
    } else {
      result[key] = override[key];
    }
  }
  return result;
}

// ── Helper: Section wrapper with title ──
const Section = ({ title, children }) => (
  <div style={{ marginBottom: '2rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '12px', padding: '1.5rem' }}>
    <h3 style={{ fontSize: '0.75rem', letterSpacing: '4px', textTransform: 'uppercase', color: '#D4AF37', marginBottom: '1.25rem', borderBottom: '1px solid rgba(212,175,55,0.2)', paddingBottom: '0.75rem' }}>{title}</h3>
    {children}
  </div>
);

// ── Helper: Input field ──
const Field = ({ label, value, onChange, type = 'text', placeholder = '' }) => (
  <div style={{ marginBottom: '1rem' }}>
    <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(253,253,253,0.5)', marginBottom: '0.35rem', letterSpacing: '1px' }}>{label}</label>
    {type === 'textarea' ? (
      <textarea
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={inputStyle}
        rows={3}
      />
    ) : type === 'color' ? (
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        <input type="color" value={value || '#000000'} onChange={e => onChange(e.target.value)} style={{ width: '40px', height: '36px', border: 'none', background: 'transparent', cursor: 'pointer' }} />
        <input type="text" value={value || ''} onChange={e => onChange(e.target.value)} style={{ ...inputStyle, marginBottom: 0, flex: 1 }} placeholder="#HEX" />
      </div>
    ) : (
      <input
        type={type}
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={inputStyle}
      />
    )}
  </div>
);

const inputStyle = {
  width: '100%', padding: '0.7rem 1rem',
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(212,175,55,0.2)',
  borderRadius: '8px',
  color: '#FDFDFD',
  fontFamily: "'Montserrat', sans-serif",
  fontSize: '0.85rem',
  outline: 'none',
  transition: 'border-color 0.3s',
};

// ── MAIN ADMIN COMPONENT ──
const AdminPanel = ({ onClose }) => {
  const [config, setConfig] = useState(() => getConfig());
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('mempelai');

  const update = (path, value) => {
    setConfig(prev => {
      const keys = path.split('.');
      const newConfig = JSON.parse(JSON.stringify(prev));
      let obj = newConfig;
      for (let i = 0; i < keys.length - 1; i++) {
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      return newConfig;
    });
    setSaved(false);
  };

  const handleSave = () => {
    saveConfig(config);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleReset = () => {
    if (window.confirm('Reset semua pengaturan ke default? Data yang sudah diubah akan hilang.')) {
      localStorage.removeItem(STORAGE_KEY);
      setConfig(CONFIG);
      setSaved(false);
    }
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `config_${config.groom.namaPanggilan}_${config.bride.namaPanggilan}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const imported = JSON.parse(ev.target.result);
        setConfig(imported);
        saveConfig(imported);
        alert('Konfigurasi berhasil diimpor!');
      } catch { alert('File tidak valid!'); }
    };
    reader.readAsText(file);
  };

  const tabs = [
    { id: 'mempelai', label: '💍 Mempelai' },
    { id: 'acara', label: '📅 Acara' },
    { id: 'galeri', label: '🖼️ Galeri' },
    { id: 'rekening', label: '💳 Rekening' },
    { id: 'tema', label: '🎨 Tema' },
    { id: 'lainnya', label: '⚙️ Lainnya' },
  ];

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100000,
      background: '#0a0f18',
      overflowY: 'auto',
      fontFamily: "'Montserrat', sans-serif",
      color: '#FDFDFD'
    }}>
      {/* Header */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 10,
        background: 'rgba(10,15,24,0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(212,175,55,0.2)',
        padding: '1rem 1.5rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <div>
          <h1 style={{ fontSize: '1.1rem', letterSpacing: '3px', color: '#D4AF37', margin: 0 }}>⚙️ ADMIN PANEL</h1>
          <p style={{ fontSize: '0.7rem', color: 'rgba(253,253,253,0.35)', margin: '0.25rem 0 0', letterSpacing: '2px' }}>EDITOR UNDANGAN DIGITAL</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          {saved && <span style={{ fontSize: '0.75rem', color: '#4ade80', letterSpacing: '1px' }}>✓ TERSIMPAN</span>}
          <button onClick={handleSave} style={btnGold}>💾 SIMPAN</button>
          <button onClick={onClose} style={btnOutline}>✕ TUTUP</button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div style={{
        display: 'flex', gap: '0', overflowX: 'auto',
        borderBottom: '1px solid rgba(212,175,55,0.15)',
        background: 'rgba(10,15,24,0.7)',
        position: 'sticky', top: '62px', zIndex: 9
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '0.85rem 1.25rem',
              background: activeTab === tab.id ? 'rgba(212,175,55,0.15)' : 'transparent',
              border: 'none',
              borderBottom: activeTab === tab.id ? '2px solid #D4AF37' : '2px solid transparent',
              color: activeTab === tab.id ? '#D4AF37' : 'rgba(253,253,253,0.5)',
              fontSize: '0.75rem', letterSpacing: '1px',
              cursor: 'pointer', whiteSpace: 'nowrap',
              fontFamily: "'Montserrat', sans-serif",
              transition: 'all 0.3s'
            }}
          >{tab.label}</button>
        ))}
      </div>

      {/* Content */}
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '1.5rem' }}>

        {/* ── TAB: MEMPELAI ── */}
        {activeTab === 'mempelai' && (
          <>
            <Section title="MEMPELAI PRIA">
              <Field label="Nama Lengkap" value={config.groom.namaLengkap} onChange={v => update('groom.namaLengkap', v)} />
              <Field label="Nama Panggilan (akan ditampilkan besar)" value={config.groom.namaPanggilan} onChange={v => update('groom.namaPanggilan', v)} />
              <Field label="Orang Tua" value={config.groom.orangTua} onChange={v => update('groom.orangTua', v)} placeholder="Putra dari Bapak & Ibu ..." />
              <Field label="URL Foto" value={config.groom.foto} onChange={v => update('groom.foto', v)} placeholder="https://..." />
              <Field label="Instagram" value={config.groom.instagram} onChange={v => update('groom.instagram', v)} />
            </Section>
            <Section title="MEMPELAI WANITA">
              <Field label="Nama Lengkap" value={config.bride.namaLengkap} onChange={v => update('bride.namaLengkap', v)} />
              <Field label="Nama Panggilan (akan ditampilkan besar)" value={config.bride.namaPanggilan} onChange={v => update('bride.namaPanggilan', v)} />
              <Field label="Orang Tua" value={config.bride.orangTua} onChange={v => update('bride.orangTua', v)} placeholder="Putri dari Bapak & Ibu ..." />
              <Field label="URL Foto" value={config.bride.foto} onChange={v => update('bride.foto', v)} placeholder="https://..." />
              <Field label="Instagram" value={config.bride.instagram} onChange={v => update('bride.instagram', v)} />
            </Section>
          </>
        )}

        {/* ── TAB: ACARA ── */}
        {activeTab === 'acara' && (
          <>
            <Section title="TANGGAL UTAMA & COUNTDOWN">
              <Field label="Tanggal Acara (format: YYYY-MM-DDTHH:MM:SS)" value={config.tanggalAcara} onChange={v => update('tanggalAcara', v)} placeholder="2026-10-24T08:00:00" />
              <Field label="Tanggal Tampilan (di Hero)" value={config.tanggalTampilan} onChange={v => update('tanggalTampilan', v)} placeholder="24 . 10 . 2026" />
            </Section>
            <Section title="AKAD NIKAH">
              <Field label="Judul" value={config.akad.judul} onChange={v => update('akad.judul', v)} />
              <Field label="Subjudul" value={config.akad.subjudul} onChange={v => update('akad.subjudul', v)} />
              <Field label="Tanggal" value={config.akad.tanggal} onChange={v => update('akad.tanggal', v)} />
              <Field label="Waktu" value={config.akad.waktu} onChange={v => update('akad.waktu', v)} />
              <Field label="Nama Tempat" value={config.akad.tempat} onChange={v => update('akad.tempat', v)} />
              <Field label="Alamat" value={config.akad.alamat} onChange={v => update('akad.alamat', v)} />
              <Field label="Link Google Maps" value={config.akad.linkMaps} onChange={v => update('akad.linkMaps', v)} />
            </Section>
            <Section title="RESEPSI">
              <Field label="Judul" value={config.resepsi.judul} onChange={v => update('resepsi.judul', v)} />
              <Field label="Subjudul" value={config.resepsi.subjudul} onChange={v => update('resepsi.subjudul', v)} />
              <Field label="Tanggal" value={config.resepsi.tanggal} onChange={v => update('resepsi.tanggal', v)} />
              <Field label="Waktu" value={config.resepsi.waktu} onChange={v => update('resepsi.waktu', v)} />
              <Field label="Nama Tempat" value={config.resepsi.tempat} onChange={v => update('resepsi.tempat', v)} />
              <Field label="Alamat" value={config.resepsi.alamat} onChange={v => update('resepsi.alamat', v)} />
              <Field label="Link Google Maps" value={config.resepsi.linkMaps} onChange={v => update('resepsi.linkMaps', v)} />
            </Section>
          </>
        )}

        {/* ── TAB: GALERI ── */}
        {activeTab === 'galeri' && (
          <Section title="FOTO GALERI">
            <p style={{ fontSize: '0.75rem', color: 'rgba(253,253,253,0.4)', marginBottom: '1rem', lineHeight: '1.8' }}>
              Masukkan URL foto prewedding klien. Pilih "Lebar Penuh" untuk foto landscape, "Setengah" untuk portrait.
            </p>
            {config.galeri.map((foto, i) => (
              <div key={i} style={{ marginBottom: '1.5rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid rgba(212,175,55,0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.7rem', color: '#D4AF37', letterSpacing: '2px' }}>FOTO {i + 1}</span>
                  <button onClick={() => {
                    const g = [...config.galeri];
                    g.splice(i, 1);
                    update('galeri', g);
                  }} style={{ background: 'rgba(255,80,80,0.15)', border: '1px solid rgba(255,80,80,0.3)', color: '#ff8080', padding: '0.25rem 0.75rem', borderRadius: '6px', fontSize: '0.7rem', cursor: 'pointer', fontFamily: "'Montserrat', sans-serif" }}>Hapus</button>
                </div>
                <Field label="URL Foto" value={foto.src} onChange={v => {
                  const g = [...config.galeri];
                  g[i] = { ...g[i], src: v };
                  update('galeri', g);
                }} placeholder="https://..." />
                <div style={{ marginBottom: '0.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.7rem', color: 'rgba(253,253,253,0.4)', marginBottom: '0.35rem' }}>Ukuran</label>
                  <select value={foto.span} onChange={e => {
                    const g = [...config.galeri];
                    g[i] = { ...g[i], span: e.target.value };
                    update('galeri', g);
                  }} style={{ ...inputStyle, cursor: 'pointer' }}>
                    <option value="wide" style={{ background: '#0a0f18' }}>Lebar Penuh (Landscape)</option>
                    <option value="normal" style={{ background: '#0a0f18' }}>Setengah (Portrait)</option>
                  </select>
                </div>
                {foto.src && <img src={foto.src} alt="" style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '6px', marginTop: '0.5rem', opacity: 0.7 }} />}
              </div>
            ))}
            <button onClick={() => update('galeri', [...config.galeri, { src: '', span: 'normal' }])} style={{ ...btnOutline, width: '100%' }}>+ Tambah Foto</button>
          </Section>
        )}

        {/* ── TAB: REKENING ── */}
        {activeTab === 'rekening' && (
          <Section title="REKENING / AMPLOP DIGITAL">
            <Field label="Teks Pengantar" value={config.teksAmplop} onChange={v => update('teksAmplop', v)} type="textarea" />
            {config.rekening.map((rek, i) => (
              <div key={i} style={{ marginBottom: '1.5rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid rgba(212,175,55,0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.7rem', color: '#D4AF37', letterSpacing: '2px' }}>REKENING {i + 1}</span>
                  <button onClick={() => {
                    const r = [...config.rekening];
                    r.splice(i, 1);
                    update('rekening', r);
                  }} style={{ background: 'rgba(255,80,80,0.15)', border: '1px solid rgba(255,80,80,0.3)', color: '#ff8080', padding: '0.25rem 0.75rem', borderRadius: '6px', fontSize: '0.7rem', cursor: 'pointer', fontFamily: "'Montserrat', sans-serif" }}>Hapus</button>
                </div>
                <Field label="Nama Bank" value={rek.bank} onChange={v => { const r = [...config.rekening]; r[i] = { ...r[i], bank: v }; update('rekening', r); }} />
                <Field label="Nomor Rekening (tampilan)" value={rek.nomorRekening} onChange={v => { const r = [...config.rekening]; r[i] = { ...r[i], nomorRekening: v }; update('rekening', r); }} />
                <Field label="Nomor Rekening (tanpa spasi, untuk disalin)" value={rek.nomorRaw} onChange={v => { const r = [...config.rekening]; r[i] = { ...r[i], nomorRaw: v }; update('rekening', r); }} />
                <Field label="Atas Nama" value={rek.atasNama} onChange={v => { const r = [...config.rekening]; r[i] = { ...r[i], atasNama: v }; update('rekening', r); }} />
                <Field label="Icon (emoji)" value={rek.icon} onChange={v => { const r = [...config.rekening]; r[i] = { ...r[i], icon: v }; update('rekening', r); }} />
              </div>
            ))}
            <button onClick={() => update('rekening', [...config.rekening, { bank: '', nomorRekening: '', nomorRaw: '', atasNama: '', icon: '🏦' }])} style={{ ...btnOutline, width: '100%' }}>+ Tambah Rekening</button>
          </Section>
        )}

        {/* ── TAB: TEMA ── */}
        {activeTab === 'tema' && (
          <>
            <Section title="LAYOUT TEMA UTAMA">
              <p style={{ fontSize: '0.75rem', color: 'rgba(253,253,253,0.4)', marginBottom: '1rem', lineHeight: '1.8' }}>
                Pilih gaya desain undangan. Setiap layout memiliki susunan elemen dan bentuk yang sangat berbeda.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {[
                  { id: 'cinematic', name: '🎬 Cinematic Arch', desc: 'Gelap, mewah, arch kaca' },
                  { id: 'minimalist', name: '🍃 Minimalist Elegance', desc: 'Bersih, putih, kotak tajam' },
                  { id: 'rustic', name: '🌿 Rustic Botanical', desc: 'Hangat, daun watercolor' },
                  { id: 'editorial', name: '📸 Modern Editorial', desc: 'Vogue split-screen layout' },
                  { id: 'royal', name: '👑 Classic Royal', desc: 'Simetris, bingkai klasik emas' }
                ].map(l => (
                  <div 
                    key={l.id} 
                    onClick={() => update('layout', l.id)}
                    style={{ 
                      padding: '1rem', 
                      background: config.layout === l.id ? 'rgba(212,175,55,0.15)' : 'rgba(255,255,255,0.03)', 
                      border: config.layout === l.id ? '1px solid #D4AF37' : '1px solid rgba(255,255,255,0.1)', 
                      borderRadius: '8px', 
                      cursor: 'pointer',
                      transition: 'all 0.3s'
                    }}
                  >
                    <p style={{ margin: 0, fontWeight: 'bold', color: config.layout === l.id ? '#D4AF37' : '#fff', fontSize: '0.9rem' }}>{l.name}</p>
                    <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.7rem', color: 'rgba(253,253,253,0.5)' }}>{l.desc}</p>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="WARNA TEMA">
            <p style={{ fontSize: '0.75rem', color: 'rgba(253,253,253,0.4)', marginBottom: '1rem', lineHeight: '1.8' }}>
              Sesuaikan warna dengan tema baju prewedding klien. Klik kotak warna atau ketik kode HEX.
            </p>
            <Field label="Warna Utama (Latar Gelap)" value={config.tema.primary} onChange={v => update('tema.primary', v)} type="color" />
            <Field label="Warna Utama Terang" value={config.tema.primaryLight} onChange={v => update('tema.primaryLight', v)} type="color" />
            <Field label="Warna Sekunder (Champagne)" value={config.tema.secondary} onChange={v => update('tema.secondary', v)} type="color" />
            <Field label="Warna Aksen (Emas/Gold)" value={config.tema.accent} onChange={v => update('tema.accent', v)} type="color" />
            <Field label="Warna Teks Terang" value={config.tema.textLight} onChange={v => update('tema.textLight', v)} type="color" />
            <Field label="Warna Teks Redup" value={config.tema.textMuted} onChange={v => update('tema.textMuted', v)} type="color" />
            <Field label="Warna Latar Body" value={config.tema.bgBody} onChange={v => update('tema.bgBody', v)} type="color" />

            {/* Preview */}
            <div style={{ marginTop: '1.5rem', padding: '1.5rem', borderRadius: '12px', background: config.tema.primary, border: `1px solid ${config.tema.accent}30`, textAlign: 'center' }}>
              <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: '1.5rem', color: config.tema.accent }}>Preview Tema</p>
              <h3 style={{ fontFamily: "'Cinzel', serif", color: config.tema.textLight, fontSize: '1.5rem', letterSpacing: '3px' }}>{config.groom.namaPanggilan} & {config.bride.namaPanggilan}</h3>
              <p style={{ color: config.tema.textMuted, fontSize: '0.8rem' }}>Teks biasa terlihat seperti ini</p>
              <p style={{ color: config.tema.secondary, fontSize: '0.8rem' }}>Teks sekunder terlihat seperti ini</p>
            </div>
          </Section>
          </>
        )}

        {/* ── TAB: LAINNYA ── */}
        {activeTab === 'lainnya' && (
          <>
            <Section title="TEKS PENUTUP">
              <Field label="Salam Penutup" value={config.penutup.salam} onChange={v => update('penutup.salam', v)} />
              <Field label="Lokasi" value={config.penutup.lokasi} onChange={v => update('penutup.lokasi', v)} />
              <Field label="Branding" value={config.penutup.branding} onChange={v => update('penutup.branding', v)} />
            </Section>
            <Section title="MUSIK LATAR">
              <Field label="URL File Musik" value={config.musikUrl} onChange={v => update('musikUrl', v)} placeholder="/assets/music.mp3" />
              <p style={{ fontSize: '0.7rem', color: 'rgba(253,253,253,0.35)', marginTop: '0.5rem', lineHeight: '1.7' }}>
                💡 Taruh file .mp3 di folder <code style={{ color: '#D4AF37' }}>public/assets/</code> lalu tulis <code style={{ color: '#D4AF37' }}>/assets/namafile.mp3</code>
              </p>
            </Section>
            <Section title="EKSPOR & IMPOR KONFIGURASI">
              <p style={{ fontSize: '0.75rem', color: 'rgba(253,253,253,0.4)', marginBottom: '1rem', lineHeight: '1.8' }}>
                Simpan konfigurasi klien sebagai file JSON untuk digunakan nanti, atau impor konfigurasi yang sudah ada.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button onClick={handleExport} style={btnGold}>📤 Ekspor ke File JSON</button>
                <label style={{ ...btnOutline, cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}>
                  📥 Impor dari File JSON
                  <input type="file" accept=".json" onChange={handleImport} style={{ display: 'none' }} />
                </label>
              </div>
              <div style={{ marginTop: '1.5rem' }}>
                <button onClick={handleReset} style={{ ...btnOutline, width: '100%', borderColor: 'rgba(255,80,80,0.4)', color: '#ff8080' }}>🗑️ Reset Semua ke Default</button>
              </div>
            </Section>
          </>
        )}

        {/* Bottom spacer */}
        <div style={{ height: '5rem' }}></div>
      </div>

      {/* Floating Save Bar */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        background: 'rgba(10,15,24,0.95)', backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(212,175,55,0.2)',
        padding: '1rem 1.5rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10
      }}>
        <p style={{ fontSize: '0.7rem', color: 'rgba(253,253,253,0.35)', letterSpacing: '1px' }}>
          Setelah menyimpan, tutup panel ini untuk melihat hasil perubahan.
        </p>
        <button onClick={() => { handleSave(); onClose(); }} style={btnGold}>
          💾 SIMPAN & LIHAT HASIL
        </button>
      </div>
    </div>
  );
};

// ── Button Styles ──
const btnGold = {
  padding: '0.6rem 1.5rem',
  background: 'rgba(212,175,55,0.2)',
  border: '1px solid #D4AF37',
  borderRadius: '8px',
  color: '#D4AF37',
  fontSize: '0.75rem', letterSpacing: '2px',
  cursor: 'pointer',
  fontFamily: "'Montserrat', sans-serif",
  transition: 'all 0.3s',
  whiteSpace: 'nowrap',
};

const btnOutline = {
  padding: '0.6rem 1.5rem',
  background: 'transparent',
  border: '1px solid rgba(253,253,253,0.2)',
  borderRadius: '8px',
  color: 'rgba(253,253,253,0.6)',
  fontSize: '0.75rem', letterSpacing: '2px',
  cursor: 'pointer',
  fontFamily: "'Montserrat', sans-serif",
  transition: 'all 0.3s',
  whiteSpace: 'nowrap',
};

export default AdminPanel;

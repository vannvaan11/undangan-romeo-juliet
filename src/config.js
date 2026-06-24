/**
 * ╔═══════════════════════════════════════════════════════════╗
 * ║        KONFIGURASI UNDANGAN DIGITAL - EDIT DI SINI       ║
 * ╠═══════════════════════════════════════════════════════════╣
 * ║  File ini adalah SATU-SATUNYA file yang perlu Anda edit  ║
 * ║  untuk setiap klien baru. Ubah data di bawah, simpan,    ║
 * ║  dan undangan langsung berubah otomatis!                  ║
 * ╚═══════════════════════════════════════════════════════════╝
 */

const CONFIG = {

  // ┌─────────────────────────────────────┐
  // │         TEMA / LAYOUT UTAMA         │
  // └─────────────────────────────────────┘
  // Pilihan: "cinematic", "minimalist", "rustic", "editorial", "royal"
  layout: "cinematic",

  // ┌─────────────────────────────────────┐
  // │         DATA MEMPELAI PRIA          │
  // └─────────────────────────────────────┘
  groom: {
    namaLengkap: "Romeo Montague",
    namaPanggilan: "ROMEO",
    label: "The Groom",
    orangTua: "Putra dari Bapak & Ibu Montague",
    foto: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    instagram: "@romeomontague",
  },

  // ┌─────────────────────────────────────┐
  // │        DATA MEMPELAI WANITA         │
  // └─────────────────────────────────────┘
  bride: {
    namaLengkap: "Juliet Capulet",
    namaPanggilan: "JULIET",
    label: "The Bride",
    orangTua: "Putri dari Bapak & Ibu Capulet",
    foto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    instagram: "@julietcapulet",
  },

  // ┌─────────────────────────────────────┐
  // │          DETAIL AKAD NIKAH          │
  // └─────────────────────────────────────┘
  akad: {
    judul: "AKAD NIKAH",
    subjudul: "The Holy Matrimony",
    tanggal: "Sabtu, 24 Oktober 2026",
    waktu: "08:00 WIB - Selesai",
    tempat: "Masjid Agung Verona",
    alamat: "Jl. Cinta Damai No. 1, Kota Verona",
    linkMaps: "https://maps.google.com",
  },

  // ┌─────────────────────────────────────┐
  // │          DETAIL RESEPSI             │
  // └─────────────────────────────────────┘
  resepsi: {
    judul: "RESEPSI",
    subjudul: "The Celebration",
    tanggal: "Sabtu, 24 Oktober 2026",
    waktu: "11:00 WIB - 14:00 WIB",
    tempat: "Gedung Serbaguna Verona",
    alamat: "Jl. Kebahagiaan No. 99, Kota Verona",
    linkMaps: "https://maps.google.com",
  },

  // ┌─────────────────────────────────────┐
  // │      TANGGAL UNTUK COUNTDOWN        │
  // └─────────────────────────────────────┘
  // Format: YYYY-MM-DDTHH:MM:SS
  tanggalAcara: "2026-10-24T08:00:00",
  tanggalTampilan: "24 . 10 . 2026",

  // ┌─────────────────────────────────────┐
  // │           GALERI FOTO               │
  // └─────────────────────────────────────┘
  // Ganti URL dengan foto prewedding klien
  // span: 'wide' = lebar penuh, 'normal' = setengah lebar
  galeri: [
    { src: "https://images.unsplash.com/photo-1583939000240-690e16fb2f32?auto=format&fit=crop&w=800&q=80", span: "wide" },
    { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80", span: "normal" },
    { src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=600&q=80", span: "normal" },
    { src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80", span: "wide" },
  ],

  // ┌─────────────────────────────────────┐
  // │       AMPLOP DIGITAL / REKENING     │
  // └─────────────────────────────────────┘
  rekening: [
    {
      bank: "Bank BCA",
      nomorRekening: "1234 5678 90",
      nomorRaw: "1234567890",
      atasNama: "Romeo Montague",
      icon: "🏦",
    },
    {
      bank: "Bank Mandiri",
      nomorRekening: "0987 6543 21",
      nomorRaw: "0987654321",
      atasNama: "Juliet Capulet",
      icon: "💳",
    },
  ],

  // ┌─────────────────────────────────────┐
  // │           TEMA WARNA                │
  // └─────────────────────────────────────┘
  // Ubah warna ini untuk menyesuaikan dengan tema klien
  tema: {
    primary: "#1A2639",        // Warna utama (latar gelap)
    primaryLight: "#2C3E50",   // Warna utama terang
    secondary: "#F3E5D8",      // Warna sekunder (champagne)
    accent: "#D4AF37",         // Warna aksen (gold)
    textLight: "#FDFDFD",      // Teks terang
    textMuted: "#6B7280",      // Teks redup
    bgBody: "#0e1520",         // Latar belakang body
  },

  // ┌─────────────────────────────────────┐
  // │          MUSIK LATAR                │
  // └─────────────────────────────────────┘
  // Taruh file mp3 di folder public/assets/ lalu tulis namanya di sini
  musikUrl: "/assets/music.mp3",

  // ┌─────────────────────────────────────┐
  // │         TEKS PENUTUP                │
  // └─────────────────────────────────────┘
  penutup: {
    salam: "With love,",
    lokasi: "VERONA, ITALIA",
    branding: "MADE WITH ♥ — UNDANGAN DIGITAL PREMIUM",
  },

  // ┌─────────────────────────────────────┐
  // │         TEKS AMPLOP DIGITAL         │
  // └─────────────────────────────────────┘
  teksAmplop: "Doa restu Anda adalah karunia terbesar bagi kami. Namun jika berkenan berbagi kasih...",

};

export default CONFIG;

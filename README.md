# ☕ TemuKopi - Platform Rekomendasi & Pencari Coffee Shop Lokal (UMKM)

[![React](https://img.shields.io/badge/React-18.3-blue?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.4-purple?logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Docker](https://img.shields.io/badge/Docker-Supported-blue?logo=docker&logoColor=white)](https://www.docker.com/)

**TemuKopi** adalah platform web modern interaktif yang dirancang khusus untuk mempertemukan pecinta kopi dengan kedai kopi lokal (UMKM) terbaik di sekitar mereka. Melalui pendekatan yang inovatif dan personal, platform ini membantu pengguna menemukan lokasi nongkrong, nugas, atau bersantai yang paling cocok dengan suasana hati (*mood*) serta kecocokan profil rasa kopi yang diinginkan.
---

## 🌟 Fitur Utama (Key Features)

TemuKopi hadir dengan serangkaian fitur premium terintegrasi yang menghadirkan pengalaman pengguna luar biasa:

### 1. 🧠 Mood Finder AI Assistant
* **Chatbot Pintar:** Pengguna dapat berinteraksi langsung dengan AI TemuKopi untuk menceritakan suasana hati mereka (misalnya: *"capek banget habis nugas butuh tempat yang tenang dengan kopi strong"*).
* **Rekomendasi Cerdas:** AI akan memproses teks tersebut dan secara instan merekomendasikan daftar kedai kopi serta racikan kopi yang paling sesuai.
tes doang
### 2. 🎚️ Taste Profile Matcher (Pencocok Cita Rasa)
* **Slider Interaktif:** Pengguna dapat mengatur tingkat preferensi rasa yang diinginkan menggunakan slider interaktif:
  * 🍬 **Manis**
  * 🥛 **Creamy**
  * ⚡ **Strong**
  * ☕ **Pahit**
  * 🍃 **Segar**
* **Dynamic Matching Score:** Sistem secara dinamis menghitung persentase kecocokan (*match percentage*) dari menu kopi yang tersedia di database berdasarkan preferensi yang dimasukkan.

### 3. 🔍 Pencarian & Filter Kedai Kopi Presisi
* **Filter Fasilitas Lengkap:** Cari kedai kopi berdasarkan kebutuhan fasilitas seperti **WiFi**, **Stopkontak**, **Parkir**, **Outdoor Area**, **Musholla**, dan **Meeting Room**.
* **Filter Geografis & Jarak:** Filter pencarian berdasarkan Kota/Wilayah serta batas jarak maksimal (dalam kilometer).
* **Multi-Sorting:** Urutkan hasil pencarian berdasarkan **Rating Tertinggi**, **Jarak Terdekat**, atau **Harga Termurah**.

### 4. 🏢 Detail Kedai Kopi & Interaksi Sosial
* **Tab Informasi Dinamis:** Setiap kedai kopi dilengkapi halaman detail yang menyajikan:
  * **Tentang:** Deskripsi singkat suasana dan keunggulan tempat.
  * **Menu:** Daftar menu minuman dan makanan beserta harganya.
  * **Ulasan:** Sistem ulasan dan rating bintang interaktif dari pelanggan asli.
  * **Foto:** Galeri foto suasana kedai kopi.
  * **Promo:** Promo atau diskon aktif yang sedang berlangsung di kedai tersebut.
* **Fitur Simpan (Bookmarks/Favorites):** Simpan kedai kopi favorit Anda untuk diakses kembali nanti melalui tab Favorit.

### 5. 🏪 Pendaftaran Mitra UMKM (Mitra Kopi)
* **Formulir Mandiri:** Memudahkan pemilik kedai kopi lokal untuk mendaftarkan bisnis mereka ke database TemuKopi secara gratis.
* **Validasi Form:** Dilengkapi validasi formulir lengkap untuk menjamin kualitas data kedai kopi yang didaftarkan.

### 6. 🎵 Ambient Background Audio Player
* **Floating Controller:** Pemutar musik estetik di pojok kanan bawah yang menemani petualangan pencarian kopi Anda dengan alunan musik latar santai khas kedai kopi.
* **Dynamic Soundwave:** Animasi gelombang suara interaktif yang bergerak harmonis mengikuti alunan lagu saat sedang diputar.

---

## 💻 Tech Stack (Teknologi yang Digunakan)

* **Frontend Framework:** [React.js](https://react.dev/) (dengan TypeScript untuk keamanan tipe data)
* **Build Tool:** [Vite](https://vite.dev/) (untuk performa pengembangan secepat kilat)
* **Styling & UI:** [Tailwind CSS v4](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
* **Iconography:** [Lucide React](https://lucide.dev/)
* **Animations:** [Framer Motion / Motion](https://motion.dev/) & CSS Keyframes
* **Server & Deployment:** [Nginx](https://www.nginx.com/) & [Docker](https://www.docker.com/)

---

## 📁 Struktur Proyek (Project Structure)

```text
TemuKopi-project/
├── public/                 # Aset statis public
├── src/
│   ├── app/
│   │   ├── components/     # Komponen UI & Integrasi Figma
│   │   │   ├── figma/      # Komponen render visual (termasuk fallback image)
│   │   │   └── ui/         # Komponen UI fundamental (Shadcn/Radix)
│   │   └── App.tsx         # File utama aplikasi (State global, routing, & logika halaman)
│   ├── imports/            # Aset gambar lokal untuk kategori dan halaman favorit
│   ├── styles/
│   │   └── index.css       # Konfigurasi styling global & Tailwind directives
│   └── main.tsx            # Entry point React
├── Dockerfile              # Docker configuration untuk production build
├── nginx.conf              # Konfigurasi Nginx server (SPA Routing fallback)
├── package.json            # Daftar dependensi & npm scripts
└── README.md               # Dokumentasi proyek (File ini)
```

---

## 🚀 Cara Menjalankan Aplikasi (Running Locally)

Ikuti langkah-langkah di bawah ini untuk menjalankan TemuKopi di komputer lokal Anda:

### 📋 Prasyarat
Pastikan Anda sudah menginstal:
* [Node.js](https://nodejs.org/) (Versi 18 ke atas)
* npm atau pnpm/yarn

### 🛠️ Langkah-Langkah

1. **Unduh/Clone Proyek**
   ```bash
   git clone <repository-url>
   cd TemuKopi-project
   ```

2. **Instal Dependensi**
   Gunakan npm untuk menginstal semua modul yang dibutuhkan:
   ```bash
   npm install
   ```

3. **Jalankan Development Server**
   Mulai server lokal untuk melihat hasil langsung secara real-time:
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan secara lokal di alamat: `http://localhost:5173` (atau port lain yang tersedia).

4. **Build untuk Produksi**
   Jika ingin membuat file siap produksi:
   ```bash
   npm run build
   ```
   Hasil build berupa file HTML, CSS, dan JS statis akan tersimpan di dalam folder `dist/`.

---

## 🐳 Menjalankan dengan Docker

Platform ini sudah dikonfigurasi sepenuhnya agar dapat dijalankan menggunakan container Docker dengan bantuan Nginx untuk melayani file statis SPA (*Single Page Application*).

1. **Build Docker Image**
   ```bash
   docker build -t temukopi-app .
   ```

2. **Jalankan Docker Container**
   Jalankan container pada port `80` (atau port lain pilihan Anda, misal port `8080` lokal):
   ```bash
   docker run -d -p 8080:80 --name temukopi-container temukopi-app
   ```

3. **Akses Aplikasi**
   Buka peramban (*browser*) Anda dan akses `http://localhost:8080`.

---

## 🎨 Detail Desain & Estetika (Design Theme)

Aplikasi TemuKopi didesain dengan konsep **Warm-Coffee & Glassmorphism Aesthetic**:
* **Warna Dominan:** Menggunakan palet warna hangat seperti Cokelat Kopi pekat (`#2C1810`), Emas Kopi hangat (`#C8813A`), Krim Lembut (`#FAF6F0`), dan Abu-abu Estetik.
* **Tipografi:** Menggunakan hierarki huruf modern yang nyaman dibaca dengan transisi halus pada setiap hover element.
* **Animasi:** Dilengkapi dengan transisi halaman selembut mentega menggunakan kombinasi CSS variables dan spring animations.

---

## 📜 Lisensi & Atribusi
* Komponen UI diadaptasi sebagian dari [shadcn/ui](https://ui.shadcn.com/) di bawah [Lisensi MIT](https://github.com/shadcn-ui/ui/blob/main/LICENSE.md).
* Aset foto ilustrasi bersumber dari [Unsplash](https://unsplash.com) di bawah [Lisensi Bebas Unsplash](https://unsplash.com/license).

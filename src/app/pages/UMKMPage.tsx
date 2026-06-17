import React, { useState } from "react";
import { createPortal } from "react-dom";
import { ShoppingBag, Heart, MessageSquare, Star, Camera, TrendingUp, ChevronDown, Check, Plus } from "lucide-react";
import { Shop, Page, unsplash } from "@/app/data/coffeeData";
import { Footer } from "@/app/components/Footer";

export function UMKMPage({
  shops,
  setShops,
  nav,
}: {
  shops: Shop[];
  setShops: React.Dispatch<React.SetStateAction<Shop[]>>;
  nav: (p: Page) => void;
}) {
  const [form, setForm] = useState({
    nama: "",
    alamat: "",
    telepon: "",
    jam: "08.00 - 22.00",
    kategori: "Coffee Shop",
    deskripsi: "",
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nama || !form.alamat) return;

    // Create a new shop dynamically based on the form inputs!
    const newId = `umkm-${Date.now()}`;
    const newShop: Shop = {
      id: newId,
      name: form.nama,
      rating: 5.0,
      reviews: 1,
      distance: "0.5 km",
      distanceNum: 0.5,
      tags: [form.kategori, "Baru"],
      price: "Rp 15.000 - 35.000",
      priceMin: 15000,
      img: unsplash("1497515114629-f71d768fd07c"), // beautiful coffee image
      reason: form.deskripsi || "Coffee shop baru terdaftar dengan konsep yang sangat menarik.",
      facilities: ["WiFi", "Stopkontak"],
      city: "Jakarta Selatan",
    };

    setShops((prev) => [newShop, ...prev]);
    setShowSuccessModal(true);
  };

  const stats = [
    { label: "Total Order", value: "1.245", icon: ShoppingBag, color: "bg-blue-50 text-blue-600 border border-blue-100" },
    { label: "Total Favorit", value: "328", icon: Heart, color: "bg-red-50 text-red-600 border border-red-100" },
    { label: "Total Ulasan", value: "86", icon: MessageSquare, color: "bg-emerald-50 text-emerald-600 border border-emerald-100" },
    { label: "Rating Toko", value: "4.6", icon: Star, color: "bg-amber-50 text-amber-600 border border-amber-100" },
  ];

  const chartData = [45, 62, 38, 71, 55, 83, 49, 67, 72, 88, 61, 75, 90, 54, 68, 43, 79, 65, 58, 82, 74, 91, 67, 53, 78, 84, 69, 57, 73, 88];

  return (
    <div className="flex-1 flex flex-col justify-between animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-extrabold text-[#2C1810] tracking-tight">Kemitraan UMKM TemuKopi</h1>
          <p className="text-sm text-[#8B6B4A] mt-2 font-medium max-w-sm mx-auto">Daftarkan coffee shop Anda agar terdaftar dan terintegrasi langsung di peta pencarian cerdas kami.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Registration */}
          <form onSubmit={handleRegister} className="lg:col-span-6 bg-card border border-border/80 rounded-3xl p-6 shadow-xl space-y-4">
            <h2 className="text-lg font-extrabold text-[#2C1810] border-b border-border/40 pb-3 flex items-center gap-2">
              <Plus className="w-5 h-5 text-[#C8813A]" /> Formulir Pendaftaran Kedai
            </h2>
            <div className="space-y-4">
              {[
                { key: "nama", label: "Nama Coffee Shop", placeholder: "Contoh: Kopi Kopi Sore", type: "text" },
                { key: "alamat", label: "Alamat Lengkap Toko", placeholder: "Jl. Sudirman No. 12...", type: "text" },
                { key: "telepon", label: "Nomor WhatsApp Toko", placeholder: "+62 812...", type: "tel" },
                { key: "jam", label: "Jam Operasional", placeholder: "08.00 – 22.00", type: "text" },
              ].map(({ key, label, placeholder, type }) => (
                <div key={key} className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#2C1810]">{label}</label>
                  <input
                    type={type}
                    required={key === "nama" || key === "alamat"}
                    placeholder={placeholder}
                    value={form[key as keyof typeof form]}
                    onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                    className="w-full px-4 py-3 rounded-2xl bg-[#F0E8DC]/40 border border-border/50 text-xs font-bold text-[#2C1810] placeholder-[#8B6B4A]/50 outline-none focus:border-[#C8813A] focus:bg-white transition-all shadow-inner"
                  />
                </div>
              ))}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#2C1810]">Kategori Utama</label>
                  <select
                    value={form.kategori}
                    onChange={(e) => setForm((f) => ({ ...f, kategori: e.target.value }))}
                    className="w-full px-4 py-3 rounded-2xl bg-[#F0E8DC]/40 border border-border/50 text-xs font-bold text-[#2C1810] outline-none focus:bg-white focus:border-[#C8813A]"
                  >
                    {["Coffee Shop", "Kafe Estetik", "Cozy Workspace", "Humble Cafe"].map((k) => (
                      <option key={k} value={k}>{k}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#2C1810]">Upload Foto Cover</label>
                  <div className="w-full px-4 py-2.5 bg-[#FAF6F0] rounded-2xl border border-dashed border-[#C8813A]/50 flex items-center justify-center gap-2 cursor-pointer hover:bg-[#F0E8DC]/40 transition-colors">
                    <Camera className="w-4 h-4 text-[#C8813A]" />
                    <span className="text-[10px] font-extrabold text-[#8B6B4A]">Pilih File</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#2C1810]">Deskripsi Singkat Keunikan Toko</label>
                <textarea
                  placeholder="Ceritakan konsep kedai Anda, racikan andalan, suasana musik..."
                  value={form.deskripsi}
                  onChange={(e) => setForm((f) => ({ ...f, deskripsi: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-3 rounded-2xl bg-[#F0E8DC]/40 border border-border/50 text-xs font-bold text-[#2C1810] placeholder-[#8B6B4A]/50 outline-none focus:border-[#C8813A] focus:bg-white resize-none shadow-inner transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-[#2C1810] text-[#FAF6F0] font-extrabold text-xs hover:bg-[#C8813A] transition-all duration-300 shadow-md cursor-pointer text-center uppercase tracking-wider"
              >
                Ajukan Pendaftaran Toko
              </button>
            </div>
          </form>

          {/* Dashboard Preview panel */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-card border border-border/80 rounded-3xl p-6 shadow-xl">
              <h2 className="text-base font-extrabold text-[#2C1810] mb-5 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#C8813A]" /> Dashboard Merchant Simulasi
              </h2>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {stats.map(({ label, value, icon: IconComp, color }) => (
                  <div key={label} className={`${color} rounded-2xl p-4 shadow-sm`}>
                    <IconComp className="w-5 h-5" />
                    <p className="text-2xl font-black mt-2 tracking-tight">{value}</p>
                    <p className="text-[10px] font-bold opacity-80 mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-xs font-bold text-[#2C1810] mb-3">Pengunjung 30 Hari Terakhir</p>
                <div className="flex items-end gap-1.5 h-24">
                  {chartData.map((val, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded bg-[#C8813A] opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
                      style={{ height: `${val}%` }}
                      title={`${val * 10} Pengunjung`}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-2 border-t border-border/30 pt-2">
                  <span className="text-[10px] text-[#8B6B4A] font-bold">1 Mei</span>
                  <span className="text-[10px] text-[#8B6B4A] font-bold">30 Mei</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Keuntungan Bergabung */}
        <section className="mt-16 mb-12">
          <h2 className="text-2xl font-extrabold text-[#2C1810] text-center mb-2 tracking-tight">Keuntungan Bergabung</h2>
          <p className="text-sm text-[#8B6B4A] text-center font-medium mb-8 max-w-md mx-auto">Mengapa ratusan pemilik kedai kopi memilih TemuKopi sebagai platform utama mereka</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { emoji: "🌐", title: "Visibilitas Online", desc: "Kedai Anda tampil di pencarian cerdas yang diakses ribuan pecinta kopi setiap hari." },
              { emoji: "🤖", title: "AI Recommendation", desc: "Kopi Anda otomatis direkomendasikan oleh Mood Finder AI kepada pengguna yang cocok." },
              { emoji: "📊", title: "Analytics Dashboard", desc: "Pantau jumlah pengunjung, favorit, dan ulasan toko secara real-time." },
              { emoji: "🎯", title: "Promo Tools", desc: "Pasang kupon promo langsung di platform dan jangkau pelanggan baru." },
            ].map((b) => (
              <div key={b.title} className="bg-card border border-border/60 rounded-3xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="text-3xl mb-3">{b.emoji}</div>
                <h3 className="font-extrabold text-sm text-[#2C1810] mb-2">{b.title}</h3>
                <p className="text-xs text-[#8B6B4A] font-medium leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Counter */}
        <section className="mb-12">
          <div className="bg-[#2C1810] rounded-3xl p-8 md:p-10 shadow-xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { value: "500+", label: "Mitra UMKM" },
                { value: "50.000+", label: "Pengguna Aktif" },
                { value: "12", label: "Kota Terjangkau" },
                { value: "98%", label: "Tingkat Kepuasan" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-3xl md:text-4xl font-black text-[#C8813A] tracking-tight">{s.value}</p>
                  <p className="text-xs text-[#A89278] font-bold mt-1 uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial Mitra */}
        <section className="mb-12">
          <h2 className="text-2xl font-extrabold text-[#2C1810] text-center mb-2 tracking-tight">Cerita Sukses Mitra Kami</h2>
          <p className="text-sm text-[#8B6B4A] text-center font-medium mb-8">Kata pemilik kedai yang sudah bergabung di TemuKopi</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { name: "Ibu Ratna – Kopi Selasar Jati", text: "Sejak bergabung di TemuKopi, pengunjung kedai saya naik 40%! Banyak pelanggan baru yang datang karena rekomendasi AI.", rating: 5 },
              { name: "Pak Dedi – Laju Kopi Surabaya", text: "Dashboard analytics-nya sangat membantu untuk mengambil keputusan bisnis. Saya bisa tahu menu mana yang paling diminati.", rating: 5 },
            ].map((t) => (
              <div key={t.name} className="bg-card border border-border/60 rounded-3xl p-6 shadow-sm">
                <div className="flex gap-0.5 mb-3">{[1,2,3,4,5].map(s => <Star key={s} className={`w-4 h-4 ${s <= t.rating ? 'text-amber-500 fill-amber-500' : 'text-amber-200'}`} />)}</div>
                <p className="text-xs text-[#8B6B4A] font-semibold leading-relaxed italic mb-4">&ldquo;{t.text}&rdquo;</p>
                <p className="text-xs font-extrabold text-[#2C1810]">{t.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-6">
          <h2 className="text-2xl font-extrabold text-[#2C1810] text-center mb-2 tracking-tight">Pertanyaan Umum (FAQ)</h2>
          <p className="text-sm text-[#8B6B4A] text-center font-medium mb-8">Jawaban atas pertanyaan yang sering ditanyakan mitra baru</p>
          <div className="max-w-2xl mx-auto space-y-3">
            {[
              { q: "Apakah pendaftaran di TemuKopi gratis?", a: "Ya! Pendaftaran mitra UMKM sepenuhnya gratis, tanpa biaya berlangganan bulanan apapun." },
              { q: "Berapa lama proses verifikasi kedai saya?", a: "Proses verifikasi membutuhkan waktu 1-3 hari kerja setelah pengajuan formulir lengkap." },
              { q: "Apakah saya bisa memasang promo sendiri?", a: "Tentu! Anda bisa membuat dan mengelola promo dari dashboard mitra kapan saja." },
              { q: "Bagaimana cara meningkatkan visibilitas kedai?", a: "Lengkapi profil, tambahkan foto berkualitas, dan dorong pelanggan untuk memberikan ulasan." },
            ].map((faq, i) => (
              <details key={i} className="bg-card border border-border/60 rounded-2xl shadow-sm group">
                <summary className="px-5 py-4 text-sm font-bold text-[#2C1810] cursor-pointer flex items-center justify-between hover:text-[#C8813A] transition-colors">
                  {faq.q}
                  <ChevronDown className="w-4 h-4 text-[#8B6B4A] group-open:rotate-180 transition-transform shrink-0" />
                </summary>
                <div className="px-5 pb-4 text-xs text-[#8B6B4A] font-medium leading-relaxed border-t border-border/30 pt-3">{faq.a}</div>
              </details>
            ))}
          </div>
        </section>
      </div>

      <Footer nav={nav} />

      {/* Success Modal Dialogue */}
      {showSuccessModal && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-fadeIn">
          <div className="relative bg-card border border-border/80 rounded-3xl p-8 max-w-md w-full shadow-2xl text-center animate-scaleUp">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4 border border-emerald-200">
              <Check className="w-8 h-8 text-emerald-600 stroke-[3]" />
            </div>
            <h2 className="text-2xl font-black text-[#2C1810] mb-2 leading-snug">Pendaftaran Berhasil!</h2>
            <p className="text-xs text-[#8B6B4A] leading-relaxed font-semibold mb-6 max-w-xs mx-auto">
              Hore! Coffee Shop &ldquo;{form.nama}&rdquo; berhasil didaftarkan dan langsung tayang secara instan di peta pencarian TemuKopi!
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  nav("pencarian");
                }}
                className="flex-1 py-3 bg-[#2C1810] text-[#FAF6F0] rounded-2xl font-extrabold text-xs hover:bg-[#C8813A] transition-all cursor-pointer shadow-md"
              >
                Cari Kedai Saya
              </button>
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  setForm({ nama: "", alamat: "", telepon: "", jam: "08.00 - 22.00", kategori: "Coffee Shop", deskripsi: "" });
                }}
                className="py-3 px-5 bg-[#FAF6F0] text-[#8B6B4A] rounded-2xl font-extrabold text-xs border border-border/40 hover:bg-[#F0E8DC]/30 transition-all cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

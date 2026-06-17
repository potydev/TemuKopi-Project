import { useState } from "react";
import { createPortal } from "react-dom";
import { Check, Tag, Heart, Coffee, Star, Sparkles, ArrowRight, X, Clock } from "lucide-react";
import { Page } from "@/app/data/coffeeData";
import { Footer } from "@/app/components/Footer";

export function PromoPage({
  nav,
  claimedPromos,
  setClaimedPromos,
}: {
  nav: (p: Page) => void;
  claimedPromos: Set<number>;
  setClaimedPromos: React.Dispatch<React.SetStateAction<Set<number>>>;
}) {
  const [selected, setSelected] = useState<number | null>(null);

  const promos = [
    {
      title: "Happy Hour Diskon 20%",
      subtitle: "Setiap hari 14.00 – 17.00 · Semua menu minuman",
      desc: "Nikmati potongan harga eksklusif 20% untuk seluruh racikan kopi segar kami di sore hari. Sangat pas menemani waktu beristirahat melepas penat.",
      bg: "from-[#C8813A] to-[#8B4513]",
      emoji: "⏰",
      valid: "Berlaku hingga 31 Desember 2026",
    },
    {
      title: "Paket Hemat Ngopi & Nongkrong",
      subtitle: "Mulai dari Rp 35.000 · Kopi + snack pilihan",
      desc: "Butuh cemilan teman ngopi? Dapatkan menu signature dipadukan satu kue lembut pilihan (brownies/croissant) dengan harga ekstra hemat.",
      bg: "from-[#5C3317] to-[#2C1810]",
      emoji: "☕",
      valid: "Berlaku setiap hari operasional",
    },
    {
      title: "Buy 1 Get 1 Signature",
      subtitle: "Setiap pembelian menu kopi terfavorit",
      desc: "Beli satu menu kopi signature kami secara dine-in, dan dapatkan satu cup gratis menu pilihan sepuasmu! Sangat pas buat ngopi berdua si dia.",
      bg: "from-teal-800 to-emerald-950",
      emoji: "🎁",
      valid: "Berlaku setiap Senin – Rabu",
    },
  ];

  return (
    <div className="flex-1 flex flex-col justify-between animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-extrabold text-[#2C1810] tracking-tight">Kupon Promo & Paket Hemat</h1>
          <p className="text-sm text-[#8B6B4A] mt-2 font-medium max-w-sm mx-auto">Klaim kupon promo menarik di bawah ini untuk nongkrong hemat di kedai kopi favorit!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {promos.map((promo, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`rounded-3xl bg-gradient-to-br ${promo.bg} p-6 text-white text-left hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 shadow-md relative overflow-hidden group cursor-pointer`}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-xl group-hover:scale-150 transition-transform" />
              {claimedPromos.has(i) && (
                <span className="absolute top-4 right-4 bg-white/20 backdrop-blur-md rounded-full px-3 py-1 text-[10px] font-extrabold border border-white/25 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Diklaim
                </span>
              )}
              <div className="text-5xl mb-4 group-hover:rotate-12 transition-transform duration-300">{promo.emoji}</div>
              <h3 className="text-lg font-extrabold mb-1.5 leading-snug line-clamp-1">{promo.title}</h3>
              <p className="text-white/70 text-xs font-semibold leading-relaxed mb-4">{promo.subtitle}</p>
              <div className="mt-4 pt-4 border-t border-white/20">
                <p className="text-[10px] text-white/50 font-bold tracking-wide uppercase">{promo.valid}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Cara Klaim Promo - 3 Steps */}
        <section className="mt-16 mb-12">
          <h2 className="text-2xl font-extrabold text-[#2C1810] text-center mb-2 tracking-tight">Cara Klaim Promo</h2>
          <p className="text-sm text-[#8B6B4A] text-center font-medium mb-8 max-w-md mx-auto">Hanya 3 langkah mudah untuk menikmati promo spesial TemuKopi</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { step: "1", icon: <Tag className="w-6 h-6" />, title: "Pilih Promo", desc: "Jelajahi kupon promo yang tersedia dan pilih yang paling sesuai kebutuhanmu." },
              { step: "2", icon: <Heart className="w-6 h-6" />, title: "Klaim Kupon", desc: "Klik tombol 'Klaim Kupon Promo' untuk menyimpan kupon ke akun profilmu." },
              { step: "3", icon: <Coffee className="w-6 h-6" />, title: "Tunjukkan di Kasir", desc: "Buka kupon dari halaman Profil dan tunjukkan ke kasir saat memesan kopi." },
            ].map((item) => (
              <div key={item.step} className="relative bg-card border border-border/60 rounded-3xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#C8813A] text-white text-sm font-black flex items-center justify-center shadow-md">{item.step}</div>
                <div className="w-14 h-14 rounded-2xl bg-[#F0E8DC]/60 flex items-center justify-center text-[#C8813A] mx-auto mb-4 mt-2 group-hover:bg-[#C8813A]/10 transition-colors">{item.icon}</div>
                <h3 className="font-extrabold text-[#2C1810] text-sm mb-2">{item.title}</h3>
                <p className="text-xs text-[#8B6B4A] font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonial Promo */}
        <section className="mb-12">
          <h2 className="text-2xl font-extrabold text-[#2C1810] text-center mb-2 tracking-tight">Kata Mereka Tentang Promo Kami</h2>
          <p className="text-sm text-[#8B6B4A] text-center font-medium mb-8 max-w-md mx-auto">Pengguna yang sudah menikmati keuntungan promo TemuKopi</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { name: "Rizky Aditya", avatar: "RA", text: "Happy Hour-nya beneran hemat! Sering banget klaim promo ini buat ngopi sore bareng temen kantor.", rating: 5 },
              { name: "Siti Nurhaliza", avatar: "SN", text: "Paket kopi + snack-nya worth it banget. Brownies almondnya juara, kopinya juga mantap!", rating: 5 },
              { name: "Budi Santoso", avatar: "BS", text: "Buy 1 Get 1 pas banget buat date sama pacar. Hemat tapi tetap romantis. Terima kasih TemuKopi!", rating: 4 },
            ].map((t) => (
              <div key={t.name} className="bg-card border border-border/60 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-full bg-[#2C1810] flex items-center justify-center text-[#FAF6F0] text-xs font-extrabold shrink-0 border-2 border-white shadow">{t.avatar}</div>
                  <div>
                    <p className="font-extrabold text-sm text-[#2C1810]">{t.name}</p>
                    <div className="flex gap-0.5 mt-0.5">
                      {[1,2,3,4,5].map(s => <Star key={s} className={`w-3 h-3 ${s <= t.rating ? 'text-amber-500 fill-amber-500' : 'text-amber-200'}`} />)}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-[#8B6B4A] font-semibold leading-relaxed italic">&ldquo;{t.text}&rdquo;</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Banner UMKM */}
        <section className="mb-6">
          <div className="rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-xl" style={{ background: 'linear-gradient(135deg, #2C1810 0%, #5C3317 50%, #C8813A 100%)' }}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            <div className="relative z-10">
              <span className="text-[#FAF6F0] bg-white/10 px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wider uppercase inline-flex items-center gap-1.5 mb-3 border border-white/10">
                <Sparkles className="w-3 h-3 text-[#F0C896]" /> Untuk Pemilik Kedai
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2 leading-tight tracking-tight">Punya Kedai Kopi?</h2>
              <p className="text-white/70 max-w-md leading-relaxed font-semibold text-sm">Pasang promo eksklusif toko Anda di TemuKopi dan jangkau ribuan penikmat kopi baru setiap harinya!</p>
            </div>
            <button onClick={() => nav('umkm')} className="shrink-0 px-8 py-4 bg-[#FAF6F0] text-[#2C1810] rounded-2xl font-bold hover:bg-white active:scale-95 transition-all hover:scale-103 shadow-lg relative z-10 flex items-center gap-2 group cursor-pointer text-sm">
              Daftar Sekarang <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>
        </section>
      </div>

      <Footer nav={nav} />

      {/* Detail Modal */}
      {selected !== null && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn">
          <div
            className="absolute inset-0"
            onClick={() => setSelected(null)}
          />
          <div className="relative bg-[#FFFFFF] border border-border/80 rounded-3xl p-8 max-w-md w-full shadow-2xl animate-scaleUp">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#FAF6F0] flex items-center justify-center border border-border/20 shadow-sm"
            >
              <X className="w-4 h-4 text-[#8B6B4A]" />
            </button>
            <div className="text-5xl mb-4">{promos[selected].emoji}</div>
            <h2 className="text-2xl font-black text-[#2C1810] mb-3 leading-snug">{promos[selected].title}</h2>
            <p className="text-xs text-[#8B6B4A] font-semibold leading-relaxed mb-5">{promos[selected].desc}</p>
            <p className="text-[10px] font-extrabold text-[#C8813A] bg-[#FAF6F0] border border-border/20 rounded-xl px-4 py-2 w-fit flex items-center gap-1.5 mb-6">
              <Clock className="w-3.5 h-3.5" /> {promos[selected].valid}
            </p>
            <button
              onClick={() => {
                setClaimedPromos((prev) => {
                  const n = new Set(prev);
                  n.add(selected);
                  return n;
                });
                setSelected(null);
              }}
              className={`w-full py-3.5 rounded-2xl font-extrabold text-sm transition-all shadow-md ${claimedPromos.has(selected)
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : "bg-[#2C1810] text-[#FAF6F0] hover:bg-[#C8813A] cursor-pointer"
                }`}
            >
              {claimedPromos.has(selected) ? "✓ Kupon Berhasil Disimpan" : "Klaim Kupon Promo"}
            </button>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

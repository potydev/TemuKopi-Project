import { useState } from "react";
import { Sparkles, Search, ChevronRight, ArrowRight, Star } from "lucide-react";
import { Page, Shop, unsplash, CATEGORIES } from "@/app/data/coffeeData";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { ShopCard } from "@/app/components/ShopCard";
import { Footer } from "@/app/components/Footer";

export function HomePage({
  nav,
  favs,
  toggleFav,
  shops,
  setGlobalSearchQuery,
  setSelectedShopId,
}: {
  nav: (p: Page) => void;
  favs: Set<string>;
  toggleFav: (id: string) => void;
  shops: Shop[];
  setGlobalSearchQuery: (q: string) => void;
  setSelectedShopId: (id: string) => void;
}) {
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = () => {
    setGlobalSearchQuery(searchInput);
    nav("pencarian");
  };

  return (
    <div className="flex-1 flex flex-col justify-between animate-fadeIn">
      {/* Hero */}
      <section
        className="relative h-[560px] md:h-[640px] flex items-center overflow-hidden"
        style={{
          backgroundImage: `url(${unsplash("1551887196-72e32bfc7bf3", 1600, 900)})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#2C1810]/95 via-[#2C1810]/75 to-transparent z-0" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 text-left">
            <p className="text-[#C8813A] font-bold text-xs md:text-sm mb-4 tracking-widest uppercase flex items-center gap-2">
              <Sparkles className="w-4 h-4 animate-spin-slow" /> Cari Kopi Sesuai Karaktermu
            </p>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-5 tracking-tight">
              Temukan Coffee Shop
              <span className="text-[#FAF6F0] font-normal italic block mt-1">Sesuai Mood & Selera Rasa</span>
            </h1>
            <p className="text-white/80 text-base md:text-lg mb-8 max-w-xl leading-relaxed font-medium">
              Eksplorasi ratusan coffee shop unik. Dapatkan rekomendasi pintar berdasarkan suasana hatimu atau takar preferensi rasa kopimu sendiri.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-xl">
              <div className="flex-1 flex items-center gap-3 bg-white/95 backdrop-blur-md rounded-2xl px-5 py-4 shadow-2xl border border-white/20 transition-spring focus-within:ring-2 focus-within:ring-[#C8813A]">
                <Search className="w-5 h-5 text-[#8B6B4A] shrink-0" />
                <input
                  placeholder="Cari coffee shop, lokasi, suasana..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="flex-1 bg-transparent text-[#2C1810] placeholder-[#8B6B4A]/60 text-sm font-semibold outline-none"
                />
              </div>
              <button
                onClick={handleSearch}
                className="px-8 py-4 bg-[#C8813A] text-white rounded-2xl font-bold text-sm transition-spring hover:scale-103 hover:bg-[#2C1810] active:scale-97 shadow-xl hover:shadow-[0_12px_24px_rgba(200,129,58,0.3)] flex items-center justify-center gap-2 shrink-0 group"
              >
                <Search className="w-4 h-4 group-hover:scale-110 transition-spring" /> Cari Sekarang
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Ambiance Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#2C1810]">Cari Berdasarkan Suasana</h2>
          <p className="text-sm text-[#8B6B4A] mt-2 font-medium">Pilih getaran suasana yang kamu butuhkan saat ini</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setGlobalSearchQuery(cat.id);
                nav("pencarian");
              }}
              className="flex flex-col items-center gap-3 p-6 bg-card rounded-3xl border border-border/40 hover:border-[#C8813A]/30 hover:bg-[#FAF6F0] hover:shadow-[0_15px_30px_rgba(200,129,58,0.08)] hover:-translate-y-1.5 transition-spring group cursor-pointer"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#F0E8DC]/40 group-hover:bg-[#C8813A]/10 flex items-center justify-center transition-spring overflow-hidden">
                <ImageWithFallback
                  src={cat.icon}
                  alt={`${cat.label} icon`}
                  className="w-10 h-10 object-contain"
                />
              </div>
              <span className="text-sm font-bold text-[#2C1810] group-hover:text-[#C8813A] transition-colors duration-300">
                {cat.label}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Recommendations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#2C1810]">Rekomendasi Terpopuler</h2>
            <p className="text-sm text-[#8B6B4A] mt-1 font-medium">Rekomendasi coffee shop unggulan berdasarkan tingkat kepuasan pelanggan</p>
          </div>
          <button
            onClick={() => {
              setGlobalSearchQuery("");
              nav("pencarian");
            }}
            className="text-sm font-bold text-[#C8813A] flex items-center gap-1 hover:gap-2.5 transition-spring"
          >
            Lihat Semua <ChevronRight className="w-4 h-4 transition-transform duration-300" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {shops.filter((s) => s.active !== false).slice(0, 4).map((shop) => (
            <ShopCard
              key={shop.id}
              shop={shop}
              fav={favs.has(shop.id)}
              onFav={() => toggleFav(shop.id)}
              onDetail={() => {
                setSelectedShopId(shop.id);
                nav("detail");
              }}
            />
          ))}
        </div>
      </section>

      {/* AI CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div
          className="rounded-3xl p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl"
          style={{ background: "linear-gradient(135deg, #2C1810 0%, #5C3317 50%, #C8813A 100%)" }}
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
          <div className="text-left relative z-10">
            <span className="text-[#FAF6F0] bg-white/10 px-3 py-1 rounded-full text-xs font-extrabold tracking-wider uppercase inline-flex items-center gap-1.5 mb-4 border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-[#F0C896] animate-pulse" /> Fitur Pintar AI
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight tracking-tight">
              Bingung Mau Nongkrong & Ngopi di Mana?
            </h2>
            <p className="text-white/80 max-w-xl leading-relaxed font-semibold text-sm md:text-base">
              Ceritakan saja suasana hatimu saat ini ke AI TemuKopi, dan kami akan menyajikan kombinasi menu kopi serta lokasi coffee shop yang paling pas secara instan!
            </p>
          </div>
          <button
            onClick={() => nav("mood")}
            className="shrink-0 px-8 py-4.5 bg-[#FAF6F0] text-[#2C1810] rounded-2xl font-bold hover:bg-white active:scale-95 transition-spring hover:scale-103 shadow-lg hover:shadow-[0_12px_24px_rgba(255,255,255,0.15)] relative z-10 flex items-center gap-2 group cursor-pointer text-sm"
          >
            Coba Mood Finder AI <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300 ease-out" />
          </button>
        </div>
      </section>

      {/* Testimonial Pengguna */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#2C1810]">Apa Kata Penikmat Kopi?</h2>
          <p className="text-sm text-[#8B6B4A] mt-2 font-medium">Pengalaman nyata pengguna TemuKopi di seluruh Indonesia</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Aulia Rahma", city: "Jakarta", avatar: "AR", text: "TemuKopi benar-benar mengubah cara saya mencari coffee shop. AI-nya akurat banget ngerti mood saya!", rating: 5 },
            { name: "Dimas Pratama", city: "Bandung", avatar: "DP", text: "Fitur taste profile-nya keren! Sekarang saya selalu cocok dengan kopi yang dipesan. Nggak pernah kecewa lagi.", rating: 5 },
            { name: "Sarah Amelia", city: "Surabaya", avatar: "SA", text: "Udah nemu banyak hidden gem coffee shop berkat TemuKopi. Promo-promonya juga bikin hemat banget!", rating: 4 },
          ].map((t) => (
            <div key={t.name} className="bg-card border border-border/60 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all">
              <div className="flex gap-0.5 mb-4">{[1,2,3,4,5].map(s => <Star key={s} className={`w-4 h-4 ${s <= t.rating ? 'text-amber-500 fill-amber-500' : 'text-amber-200'}`} />)}</div>
              <p className="text-xs text-[#8B6B4A] font-semibold leading-relaxed italic mb-5">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3 pt-4 border-t border-border/30">
                <div className="w-10 h-10 rounded-full bg-[#2C1810] flex items-center justify-center text-[#FAF6F0] text-xs font-extrabold shrink-0 border-2 border-white shadow">{t.avatar}</div>
                <div>
                  <p className="font-extrabold text-sm text-[#2C1810]">{t.name}</p>
                  <p className="text-[10px] text-[#8B6B4A] font-bold">{t.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-[#2C1810] rounded-3xl p-8 md:p-10 shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "50.000+", label: "Penikmat Kopi" },
              { value: "500+", label: "Kedai Partner" },
              { value: "12", label: "Kota Terjangkau" },
              { value: "4.8", label: "Rating Rata-rata" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-3xl md:text-4xl font-black text-[#C8813A] tracking-tight">{s.value}</p>
                <p className="text-xs text-[#A89278] font-bold mt-1 uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer nav={nav} />
    </div>
  );
}

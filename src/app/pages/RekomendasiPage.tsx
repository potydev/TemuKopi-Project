import { useState, useEffect } from "react";
import { Sparkles, Utensils, ChevronRight, Zap, Globe, Coffee, Brain, ArrowRight } from "lucide-react";
import { Page, COFFEES } from "@/app/data/coffeeData";
import { Footer } from "@/app/components/Footer";

export function RekomendasiPage({ nav }: { nav: (p: Page) => void }) {
  const [prefs, setPrefs] = useState({ manis: 80, creamy: 70, strong: 40, pahit: 30, segar: 60 });
  const [dynamicMenuMatches, setDynamicMenuMatches] = useState<{ name: string; shop: string; match: number; img: string }[]>([]);

  useEffect(() => {
    // Math logic calculation to recommend dynamic menus based on Taste sliders!
    const matches = COFFEES.map(c => {
      // Simple absolute deviation matching score
      let diff = 0;
      diff += Math.abs(prefs.manis - c.profile.manis);
      diff += Math.abs(prefs.creamy - c.profile.creamy);
      diff += Math.abs(prefs.strong - c.profile.strong);
      diff += Math.abs(prefs.pahit - c.profile.pahit);
      diff += Math.abs(prefs.segar - c.profile.segar);

      // Convert difference to percentage (Max difference is 500)
      const pct = Math.max(0, Math.min(100, Math.round(100 - (diff / 5))));

      let matchedShop = "Tanamera Coffee";
      if (c.id === "espresso") matchedShop = "Kolektif Space";
      if (c.id === "vanilla-latte") matchedShop = "Kopi Ruang Hati";
      if (c.id === "iced-latte") matchedShop = "See You Coffee";

      return {
        name: c.name,
        shop: matchedShop,
        match: pct,
        img: c.img
      };
    }).sort((a, b) => b.match - a.match);

    setDynamicMenuMatches(matches.slice(0, 3));
  }, [prefs]);

  const sliderLabels: Record<string, string> = {
    manis: "🍯 Manis / Sweetness",
    creamy: "🥛 Gurih / Creaminess",
    strong: "💪 Ketajaman / Body",
    pahit: "☕ Kepahitan / Bitterness",
    segar: "🌿 Kesegaran / Acidity",
  };

  return (
    <div className="flex-1 flex flex-col justify-between animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-extrabold text-[#2C1810] tracking-tight">
            Pencari Menu Kopi Sesuai Selera Lidah
          </h1>
          <p className="text-sm text-[#8B6B4A] mt-2 font-medium max-w-xl mx-auto">
            Geser slider di bawah untuk menyesuaikan takaran rasa kopi impianmu, dan sistem algoritma cerdas kami akan mencari menu yang paling mendekati 100% secara real-time!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sliders Container */}
          <div className="lg:col-span-7 bg-card border border-border/80 rounded-3xl p-6 shadow-xl space-y-6">
            <h2 className="text-lg font-extrabold text-[#2C1810] border-b border-border/40 pb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#C8813A]" /> Setel Preferensi Rasa Kopimu
            </h2>
            <div className="space-y-6">
              {(Object.entries(prefs) as [keyof typeof prefs, number][]).map(([key, val]) => (
                <div key={key} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-[#2C1810]">{sliderLabels[key]}</span>
                    <span className="text-sm font-extrabold text-[#C8813A] bg-[#F0E8DC]/50 px-2 py-0.5 rounded-lg">{val}%</span>
                  </div>
                  <div className="relative h-3 bg-[#F0E8DC] rounded-full overflow-hidden flex items-center">
                    <div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#C8813A] to-[#2C1810] rounded-full pointer-events-none transition-all duration-300"
                      style={{ width: `${val}%` }}
                    />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={val}
                      onChange={(e) => setPrefs((p) => ({ ...p, [key]: Number(e.target.value) }))}
                      className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dynamic Recommendations List */}
          <div className="lg:col-span-5 bg-card border border-border/80 rounded-3xl p-6 shadow-xl space-y-5">
            <h2 className="text-lg font-extrabold text-[#2C1810] border-b border-border/40 pb-3 flex items-center gap-2">
              <Utensils className="w-5 h-5 text-[#C8813A]" /> Hasil Pencocokan Menu Kopi
            </h2>
            <div className="space-y-4">
              {dynamicMenuMatches.map((menu) => (
                <button
                  key={menu.name}
                  onClick={() => nav("menu")}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl border border-border/40 hover:border-[#C8813A] hover:bg-[#FAF6F0] hover:shadow-md transition-all text-left bg-white group cursor-pointer"
                >
                  <img
                    src={menu.img}
                    alt={menu.name}
                    className="w-16 h-16 object-cover rounded-2xl bg-[#F0E8DC] shrink-0 shadow"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-extrabold text-[#2C1810] text-sm group-hover:text-[#C8813A] transition-colors">{menu.name}</p>
                    <p className="text-xs text-[#8B6B4A] font-semibold mt-0.5">{menu.shop}</p>
                  </div>
                  <div className="text-right shrink-0 flex flex-col items-end">
                    <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#2C1810] text-[#FAF6F0] group-hover:bg-[#C8813A] transition-colors shadow-sm">
                      <span className="text-xs font-extrabold">{menu.match}%</span>
                    </div>
                    <p className="text-[10px] text-[#8B6B4A] font-bold mt-1 uppercase tracking-wider">Cocok</p>
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={() => nav("menu")}
              className="w-full py-3.5 rounded-2xl border-2 border-[#2C1810] text-[#2C1810] font-extrabold text-sm hover:bg-[#2C1810] hover:text-[#FAF6F0] active:scale-95 transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              Lihat Semua Menu Kedai <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Kenali Profil Rasa Kopimu */}
        <section className="mt-16 mb-12">
          <h2 className="text-2xl font-extrabold text-[#2C1810] text-center mb-2 tracking-tight">Kenali 5 Elemen Rasa Kopi</h2>
          <p className="text-sm text-[#8B6B4A] text-center font-medium mb-8 max-w-lg mx-auto">Pahami setiap dimensi rasa kopi untuk menemukan racikan yang paling cocok di lidahmu</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { emoji: "🍯", title: "Manis", desc: "Tingkat gula alami dari biji kopi, susu, atau sirup. Cocok untuk pemula.", color: "from-amber-50 to-orange-50 border-amber-200" },
              { emoji: "🥛", title: "Creamy", desc: "Tekstur gurih lembut dari susu segar, oat milk, atau foam kental.", color: "from-slate-50 to-gray-100 border-gray-200" },
              { emoji: "💪", title: "Strong", desc: "Intensitas body kopi—semakin tinggi, semakin pekat dan berkarakter.", color: "from-red-50 to-rose-50 border-red-200" },
              { emoji: "☕", title: "Pahit", desc: "Ciri khas espresso and dark roast. Semakin pahit, semakin bernyali.", color: "from-stone-100 to-stone-50 border-stone-300" },
              { emoji: "🌿", title: "Segar", desc: "Asam sitrus ringan dari light roast, memberikan sensasi fruity.", color: "from-emerald-50 to-green-50 border-emerald-200" },
            ].map((item) => (
              <div key={item.title} className={`bg-gradient-to-b ${item.color} rounded-3xl p-5 text-center border hover:shadow-md hover:-translate-y-1 transition-all duration-300`}>
                <div className="text-3xl mb-3">{item.emoji}</div>
                <h3 className="font-extrabold text-sm text-[#2C1810] mb-1.5">{item.title}</h3>
                <p className="text-[11px] text-[#8B6B4A] font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Fun Facts */}
        <section className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: <Zap className="w-5 h-5" />, fact: "1 shot espresso mengandung ~63mg kafein — setara satu teh hijau ukuran besar!" },
              { icon: <Globe className="w-5 h-5" />, fact: "Indonesia adalah produsen kopi terbesar ke-4 di dunia dengan 700.000+ ton per tahun." },
              { icon: <Coffee className="w-5 h-5" />, fact: "Kopi susu dengan gula aren adalah menu terlaris di 80% coffee shop Indonesia." },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3.5 p-5 bg-card border border-border/50 rounded-2xl shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-[#F0E8DC] flex items-center justify-center text-[#C8813A] shrink-0">{item.icon}</div>
                <p className="text-xs text-[#8B6B4A] font-semibold leading-relaxed">{item.fact}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA ke Mood Finder */}
        <section className="mb-6">
          <div className="rounded-3xl p-8 md:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 bg-[#F0E8DC] border border-border/40 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#2C1810] flex items-center justify-center shadow-md shrink-0">
                <Brain className="w-7 h-7 text-[#F0C896]" />
              </div>
              <div>
                <h3 className="font-extrabold text-[#2C1810] text-base">Masih Bingung Pilih Rasa?</h3>
                <p className="text-xs text-[#8B6B4A] font-medium mt-0.5">Ceritakan mood-mu ke AI dan dapatkan rekomendasi otomatis!</p>
              </div>
            </div>
            <button onClick={() => nav("mood")} className="shrink-0 px-6 py-3 bg-[#2C1810] text-[#FAF6F0] rounded-2xl font-bold text-sm hover:bg-[#C8813A] active:scale-95 transition-all shadow-md flex items-center gap-2 group cursor-pointer">
              Coba Mood Finder AI <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </section>
      </div>

      <Footer nav={nav} />
    </div>
  );
}

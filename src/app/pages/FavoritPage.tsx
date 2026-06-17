import { useState } from "react";
import { Heart, Star, Tag } from "lucide-react";
import { Shop, Page } from "@/app/data/coffeeData";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { Pill } from "@/app/components/ui/Pill";
import { Footer } from "@/app/components/Footer";

// Import favorit page icons
import favIcon from "@/imports/fav.png";
import clockIcon from "@/imports/clock.png";

export function FavoritPage({
  nav,
  favs,
  toggleFav,
  shops,
  setSelectedShopId,
}: {
  nav: (p: Page) => void;
  favs: Set<string>;
  toggleFav: (id: string) => void;
  shops: Shop[];
  setSelectedShopId: (id: string) => void;
}) {
  const [activeTab, setActiveTab] = useState<"favorit" | "riwayat">("favorit");

  const favShops = shops.filter((s) => favs.has(s.id));
  const history = [shops[3] || shops[0], shops[0], shops[1]];

  return (
    <div className="flex-1 flex flex-col justify-between animate-fadeIn">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="text-3xl font-extrabold text-[#2C1810] mb-6 tracking-tight">Kedai Disimpan</h1>

        {/* Stats Ringkasan */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { icon: <Heart className="w-4.5 h-4.5 text-red-500 fill-red-500" />, value: favShops.length, label: "Favorit" },
            { icon: <Star className="w-4.5 h-4.5 text-amber-500 fill-amber-500" />, value: 5, label: "Ulasan Ditulis" },
            { icon: <Tag className="w-4.5 h-4.5 text-[#C8813A]" />, value: 2, label: "Promo Diklaim" },
          ].map((item) => (
            <div key={item.label} className="bg-card border border-border/60 rounded-2xl p-4 text-center shadow-sm">
              <div className="flex justify-center mb-1.5">{item.icon}</div>
              <p className="text-xl font-black text-[#2C1810]">{item.value}</p>
              <p className="text-[10px] font-bold text-[#8B6B4A] uppercase tracking-wide">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border/40 gap-1 overflow-x-auto [&::-webkit-scrollbar]:hidden mb-6">
          {(["favorit", "riwayat"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3.5 text-sm font-extrabold capitalize relative transition-colors flex items-center gap-2 ${activeTab === tab
                  ? "text-[#C8813A]"
                  : "text-[#8B6B4A] hover:text-[#2C1810]"
                }`}
            >
              <ImageWithFallback
                src={tab === "favorit" ? favIcon : clockIcon}
                alt={tab === "favorit" ? "Favorit icon" : "Clock icon"}
                className={tab === "favorit" ? "w-4 h-4 object-contain" : "w-5 h-5 object-contain"}
              />
              {tab === "favorit" ? "Favorit Saya" : "Baru Saja Dilihat"}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C8813A]" />
              )}
            </button>
          ))}
        </div>

        {activeTab === "favorit" ? (
          <div className="space-y-4">
            {favShops.length === 0 ? (
              <div className="text-center py-16 bg-white border border-border/80 rounded-3xl shadow-sm">
                <Heart className="w-12 h-12 text-[#D0C0A8] mx-auto mb-4 animate-pulse" />
                <p className="text-sm text-[#8B6B4A] font-semibold">Belum ada coffee shop favorit yang disimpan.</p>
                <button
                  onClick={() => nav("pencarian")}
                  className="mt-4 px-6 py-2.5 bg-[#2C1810] text-[#FAF6F0] rounded-xl text-xs font-bold hover:bg-[#C8813A] transition-colors"
                >
                  Cari Kedai Sekarang
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {favShops.map((shop) => (
                  <div key={shop.id} className="bg-card border border-border/60 rounded-3xl overflow-hidden flex shadow-sm hover:shadow-md transition-all items-center">
                    <img
                      src={shop.img}
                      alt={shop.name}
                      className="w-28 h-24 object-cover bg-[#F0E8DC] shrink-0"
                    />
                    <div className="flex-1 flex items-center p-4 gap-4 min-w-0">
                      <div className="flex-1 min-w-0">
                        <p className="font-extrabold text-sm text-[#2C1810] truncate">{shop.name}</p>
                        <div className="flex items-center gap-1.5 mt-1 text-xs text-[#8B6B4A] font-semibold">
                          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                          <span>{shop.rating} · {shop.distance}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button onClick={() => toggleFav(shop.id)} className="w-9 h-9 rounded-full bg-[#FAF6F0] flex items-center justify-center border border-border/30">
                          <Heart className="w-4.5 h-4.5 text-red-500 fill-red-500" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedShopId(shop.id);
                            nav("detail");
                          }}
                          className="text-xs px-4 py-2.5 rounded-xl bg-[#2C1810] text-[#FAF6F0] font-extrabold hover:bg-[#C8813A] transition-colors shadow-sm"
                        >
                          Detail
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((shop, i) => (
              <div key={i} className="bg-card border border-border/60 rounded-3xl overflow-hidden flex shadow-sm items-center">
                <img
                  src={shop.img}
                  alt={shop.name}
                  className="w-28 h-24 object-cover bg-[#F0E8DC] shrink-0"
                />
                <div className="flex-1 flex items-center p-4 gap-4 min-w-0">
                  <div className="flex-1 min-w-0">
                    <p className="font-extrabold text-sm text-[#2C1810] truncate">{shop.name}</p>
                    <div className="flex items-center gap-1.5 mt-1 text-xs text-[#8B6B4A] font-semibold">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span>{shop.rating} · {shop.distance}</span>
                    </div>
                    <span className="text-[10px] text-[#A89278] font-bold mt-1.5 block">Dilihat kemarin</span>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedShopId(shop.id);
                      nav("detail");
                    }}
                    className="shrink-0 text-xs px-4 py-2.5 rounded-xl bg-[#2C1810] text-[#FAF6F0] font-extrabold hover:bg-[#C8813A] transition-colors shadow-sm"
                  >
                    Detail
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Mungkin Kamu Suka */}
        <section className="mt-12 mb-6">
          <h2 className="text-xl font-extrabold text-[#2C1810] mb-2 tracking-tight">Mungkin Kamu Suka</h2>
          <p className="text-xs text-[#8B6B4A] font-medium mb-5">Rekomendasi berdasarkan tag favorit kamu</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {shops.filter(s => !favs.has(s.id)).slice(0, 3).map((shop) => (
              <div key={shop.id} className="bg-card border border-border/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group cursor-pointer" onClick={() => { setSelectedShopId(shop.id); nav('detail'); }}>
                <img src={shop.img} alt={shop.name} className="w-full h-32 object-cover bg-[#F0E8DC] group-hover:scale-105 transition-transform duration-500" />
                <div className="p-4">
                  <p className="font-extrabold text-sm text-[#2C1810] group-hover:text-[#C8813A] transition-colors truncate">{shop.name}</p>
                  <div className="flex items-center gap-1.5 mt-1 text-xs text-[#8B6B4A] font-semibold">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    <span>{shop.rating} · {shop.city}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {shop.tags.slice(0, 2).map(t => <Pill key={t} label={t} />)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer nav={nav} />
    </div>
  );
}

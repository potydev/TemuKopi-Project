import { useState, useEffect } from "react";
import { Wifi, Zap, Car, Leaf, Globe, Coffee, Filter, MapPin, Check, Search, Heart, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Page, Shop } from "@/app/data/coffeeData";
import { Pill } from "@/app/components/ui/Pill";
import { Footer } from "@/app/components/Footer";

export function PencarianPage({
  nav,
  favs,
  toggleFav,
  shops,
  searchQuery,
  setSearchQuery,
  setSelectedShopId,
}: {
  nav: (p: Page) => void;
  favs: Set<string>;
  toggleFav: (id: string) => void;
  shops: Shop[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  setSelectedShopId: (id: string) => void;
}) {
  const [distance, setDistance] = useState(10); // set default max distance to 10 to cover Bali/Malang
  const [selectedCity, setSelectedCity] = useState("Semua Kota");
  const [facilities, setFacilities] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<"rating" | "distance" | "price">("rating");
  const [activePage, setActivePage] = useState(1);

  const uniqueCities = Array.from(new Set(shops.map((s) => s.city))).sort();

  const toggleFacility = (f: string) => {
    setFacilities((prev) => {
      const n = new Set(prev);
      n.has(f) ? n.delete(f) : n.add(f);
      return n;
    });
  };

  const facilityOptions = ["WiFi", "Stopkontak", "Parkir", "Outdoor", "Musholla", "Meeting Room"];

  const facilityIcons: Record<string, typeof Wifi> = {
    WiFi: Wifi,
    Stopkontak: Zap,
    Parkir: Car,
    Outdoor: Leaf,
    Musholla: Globe,
    "Meeting Room": Coffee,
  };

  // Dynamic Filtering Logic based on active search states!
  const filteredShops = shops
    .filter((shop) => shop.active !== false)
    .filter((shop) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = shop.name.toLowerCase().includes(q);
        const matchesTags = shop.tags.some(t => t.toLowerCase().includes(q));
        const matchesReason = shop.reason.toLowerCase().includes(q);
        if (!matchesName && !matchesTags && !matchesReason) return false;
      }

      // 2. City Location Filter
      if (selectedCity !== "Semua Kota" && shop.city !== selectedCity) return false;

      // 3. Distance Filter
      if (shop.distanceNum > distance) return false;

      // 4. Facilities Checklist Filter
      for (const fac of facilities) {
        if (!shop.facilities.includes(fac)) return false;
      }

      return true;
    })
    // 5. Dynamic Sorting
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "distance") return a.distanceNum - b.distanceNum;
      if (sortBy === "price") return a.priceMin - b.priceMin;
      return 0;
    });

  // Dynamic Pagination
  const pageSize = 3;
  const totalPages = Math.ceil(filteredShops.length / pageSize) || 1;
  const paginatedShops = filteredShops.slice((activePage - 1) * pageSize, activePage * pageSize);

  useEffect(() => {
    setActivePage(1);
  }, [searchQuery, distance, selectedCity, facilities, sortBy]);

  return (
    <div className="animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Filter Sidebar */}
          <div className="lg:col-span-4 bg-card border border-border/80 rounded-3xl p-6 shadow-xl lg:sticky lg:top-24">
            <h3 className="font-extrabold text-[#2C1810] text-base mb-6 border-b border-border/40 pb-3 flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#C8813A]" /> Penyaring Kedai
            </h3>

            <div className="space-y-6">
              {/* Location Select */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#8B6B4A] uppercase tracking-wider block">
                  Lokasi Daerah
                </label>
                <div className="flex items-center gap-2.5 px-4 py-3 bg-[#FAF6F0] rounded-2xl border border-border/60">
                  <MapPin className="w-4 h-4 text-[#C8813A] shrink-0" />
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="flex-1 bg-transparent text-sm font-semibold text-[#2C1810] outline-none"
                  >
                    <option value="Semua Kota">Semua Kota</option>
                    {uniqueCities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Distance Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-[#8B6B4A] uppercase tracking-wider">Maks. Jarak</label>
                  <span className="text-xs font-extrabold text-[#C8813A] bg-[#F0E8DC]/50 px-2 py-0.5 rounded-lg">{distance} km</span>
                </div>
                <div className="relative h-2.5 bg-[#F0E8DC] rounded-full overflow-hidden flex items-center">
                  <div
                    className="absolute inset-y-0 left-0 bg-[#C8813A] rounded-full pointer-events-none"
                    style={{ width: `${(distance / 10) * 100}%` }}
                  />
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={distance}
                    onChange={(e) => setDistance(Number(e.target.value))}
                    className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
                  />
                </div>
              </div>

              {/* Facilities Checklist */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-[#8B6B4A] uppercase tracking-wider block">
                  Fasilitas Wajib
                </label>
                <div className="grid grid-cols-2 gap-3.5">
                  {facilityOptions.map((f) => (
                    <label key={f} className="flex items-center gap-2.5 cursor-pointer group">
                      <div
                        onClick={() => toggleFacility(f)}
                        className={`w-5 h-5 rounded-lg flex items-center justify-center border transition-all shrink-0 ${facilities.has(f)
                            ? "bg-[#2C1810] border-[#2C1810] text-white"
                            : "border-border bg-white group-hover:border-[#C8813A]"
                          }`}
                      >
                        {facilities.has(f) && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <span className="text-xs font-bold text-[#2C1810] group-hover:text-[#C8813A] transition-colors">{f}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  setDistance(5);
                  setSelectedCity("Semua Kota");
                  setFacilities(new Set());
                  setSortBy("rating");
                  setSearchQuery("");
                }}
                className="w-full py-3.5 rounded-2xl bg-[#F0E8DC] text-[#2C1810] hover:bg-[#FAF6F0] border border-border/40 text-xs font-bold transition-colors cursor-pointer text-center"
              >
                Reset Filter
              </button>
            </div>
          </div>

          {/* Results Main Section */}
          <div className="lg:col-span-8 space-y-6">
            {/* Top Search Input & Sort Selector */}
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="flex-1 w-full flex items-center gap-3 px-5 py-3.5 bg-card border border-border/80 rounded-2xl shadow-sm focus-within:ring-2 focus-within:ring-[#C8813A] transition-all">
                <Search className="w-4 h-4 text-[#8B6B4A] shrink-0" />
                <input
                  placeholder="Cari kedai kopi terkece..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent text-sm font-semibold text-[#2C1810] placeholder-[#8B6B4A]/60 outline-none"
                />
              </div>
              <div className="flex items-center gap-2 bg-card border border-border/80 rounded-2xl px-4 py-3.5 shadow-sm w-full sm:w-auto">
                <span className="text-xs text-[#8B6B4A] font-bold whitespace-nowrap">Urutkan:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-xs font-extrabold text-[#2C1810] outline-none"
                >
                  <option value="rating">⭐️ Rating Tertinggi</option>
                  <option value="distance">📍 Jarak Terdekat</option>
                  <option value="price">💰 Harga Termurah</option>
                </select>
              </div>
            </div>

            {/* Quick Tags */}
            <div className="flex flex-wrap gap-2">
              {["WiFi Kencang", "Outdoor Asri", "Cozy & Tenang", "Work Friendly", "Pet Friendly", "24 Jam"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSearchQuery(tag.split(" ")[0])}
                  className={`text-[10px] font-bold px-3 py-1.5 rounded-full border transition-all cursor-pointer ${searchQuery.toLowerCase().includes(tag.split(" ")[0].toLowerCase())
                      ? "bg-[#2C1810] text-[#FAF6F0] border-[#2C1810]"
                      : "bg-white border-border/60 text-[#8B6B4A] hover:border-[#C8813A] hover:text-[#C8813A]"
                    }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <p className="text-xs text-[#8B6B4A] font-extrabold bg-[#F0E8DC]/40 px-4 py-2.5 rounded-xl border border-border/30 inline-block shadow-sm">
                🎯 {filteredShops.length} coffee shop ditemukan
              </p>
              <p className="text-[10px] text-[#8B6B4A] font-bold bg-white px-3 py-2 rounded-lg border border-border/30 shadow-sm">
                ☕ {shops.length} kedai · {Array.from(new Set(shops.map(s => s.city))).length} kota
              </p>
            </div>

            {/* Cards List layout */}
            {filteredShops.length === 0 ? (
              <div className="text-center py-20 bg-card border border-border/85 rounded-3xl shadow-md">
                <Coffee className="w-14 h-14 text-[#D0C0A8] mx-auto mb-4 animate-bounce" />
                <h3 className="font-extrabold text-[#2C1810] text-lg mb-1">Kedai Kopi Tidak Ditemukan</h3>
                <p className="text-sm text-[#8B6B4A] font-medium max-w-xs mx-auto">Coba atur ulang saringan atau ganti kata kuncimu</p>
              </div>
            ) : (
              <div className="space-y-4">
                {paginatedShops.map((shop) => (
                  <div
                    key={shop.id}
                    className="bg-card border border-border/80 rounded-3xl overflow-hidden flex flex-col sm:flex-row hover:shadow-xl hover:-translate-y-1 transition-all duration-300 shadow-md group cursor-pointer"
                    onClick={() => {
                      setSelectedShopId(shop.id);
                      nav("detail");
                    }}
                  >
                    <div className="sm:w-56 h-48 sm:h-auto relative overflow-hidden shrink-0">
                      <img
                        src={shop.img}
                        alt={shop.name}
                        className="w-full h-full object-cover bg-[#F0E8DC] group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-[#FAF6F0]/90 backdrop-blur-sm px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        <span className="text-[10px] font-extrabold text-[#2C1810]">{shop.rating}</span>
                      </div>
                    </div>
                    <div className="flex-1 p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div>
                            <h3 className="font-extrabold text-base text-[#2C1810] group-hover:text-[#C8813A] transition-colors">{shop.name}</h3>
                            <div className="flex items-center gap-3 text-xs text-[#8B6B4A] mt-1 font-semibold">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5 text-[#C8813A]" />
                                {shop.city} ({shop.distance})
                              </span>
                              <span>·</span>
                              <span className="text-emerald-600 font-bold">{shop.price}</span>
                            </div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFav(shop.id);
                            }}
                            className="w-8 h-8 rounded-full hover:bg-[#F0E8DC] flex items-center justify-center transition-colors shadow-sm"
                          >
                            <Heart
                              className={`w-4.5 h-4.5 ${favs.has(shop.id) ? "text-red-500 fill-red-500 animate-pulse" : "text-[#8B6B4A]"}`}
                            />
                          </button>
                        </div>
                        <p className="text-xs text-[#8B6B4A] leading-relaxed mb-4 font-medium line-clamp-2">
                          {shop.reason}
                        </p>
                      </div>
                      <div className="flex items-center justify-between gap-4 border-t border-border/30 pt-4 flex-wrap">
                        <div className="flex flex-wrap gap-1">
                          {shop.tags.map((t) => (
                            <Pill key={t} label={t} />
                          ))}
                        </div>
                        <div className="flex gap-2.5 text-[#8B6B4A] items-center">
                          {shop.facilities?.slice(0, 4).map((f) => {
                            const IconComp = facilityIcons[f];
                            return IconComp ? (
                              <div key={f} className="w-6 h-6 rounded-lg bg-[#FAF6F0] flex items-center justify-center border border-border/30 shadow-sm" title={f}>
                                <IconComp className="w-3.5 h-3.5 text-[#C8813A]" />
                              </div>
                            ) : null;
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  disabled={activePage === 1}
                  onClick={() => setActivePage(p => Math.max(1, p - 1))}
                  className="w-10 h-10 rounded-xl border border-border/80 flex items-center justify-center text-[#8B6B4A] hover:bg-white bg-[#FAF6F0] shadow-sm disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setActivePage(p)}
                    className={`w-10 h-10 rounded-xl text-xs font-bold transition-all shadow-sm ${activePage === p
                        ? "bg-[#2C1810] text-[#FAF6F0] scale-105 border border-[#2C1810]"
                        : "border border-border/80 text-[#8B6B4A] hover:bg-white bg-[#FAF6F0]"
                      }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  disabled={activePage === totalPages}
                  onClick={() => setActivePage(p => Math.min(totalPages, p + 1))}
                  className="w-10 h-10 rounded-xl border border-border/80 flex items-center justify-center text-[#8B6B4A] hover:bg-white bg-[#FAF6F0] shadow-sm disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer nav={nav} />
    </div>
  );
}

import { useState } from "react";
import { Coffee, Search, Star, Power } from "lucide-react";
import { Section, EmptyState } from "./shared";
import type { AdminShop } from "./types";

export function KelolaShopTab({
  shops, onToggleActive,
}: {
  shops: AdminShop[];
  onToggleActive: (id: string) => void;
}) {
  const [search, setSearch] = useState("");
  const filteredShops = shops.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Section title="Kelola Coffee Shop" subtitle="Atur status aktif/nonaktif coffee shop terdaftar." icon={<Coffee className="w-5 h-5" />}>
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B6B4A]" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari nama atau kota..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border/40 bg-[#FAF6F0]/50 text-xs font-semibold text-[#2C1810] focus:outline-none focus:border-[#C8813A]"
        />
      </div>
      <div className="space-y-2">
        {filteredShops.map((s) => {
          const isActive = s.active !== false;
          return (
            <div key={s.id} className="flex items-center gap-3 p-3 rounded-2xl border border-border/40 bg-[#FAF6F0]/50">
              <img src={s.img} alt={s.name} className="w-14 h-14 object-cover rounded-xl shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-[#2C1810] text-xs truncate">{s.name}</h3>
                  <span className={`text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider ${
                    isActive ? "bg-emerald-100 text-emerald-700" : "bg-gray-200 text-gray-600"
                  }`}>{isActive ? "Aktif" : "Nonaktif"}</span>
                </div>
                <div className="flex items-center gap-3 mt-0.5 text-[10px] text-[#8B6B4A] font-bold">
                  <span>📍 {s.city}</span>
                  <span className="flex items-center gap-0.5"><Star className="w-3 h-3 fill-amber-500 text-amber-500" />{s.rating} ({s.reviews})</span>
                </div>
              </div>
              <button
                onClick={() => onToggleActive(s.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-bold transition-colors shrink-0 ${
                  isActive
                    ? "bg-white border border-red-300 text-red-600 hover:bg-red-50"
                    : "bg-emerald-500 hover:bg-emerald-600 text-white"
                }`}
              >
                <Power className="w-3.5 h-3.5" />
                {isActive ? "Nonaktifkan" : "Aktifkan"}
              </button>
            </div>
          );
        })}
        {filteredShops.length === 0 && <EmptyState msg="Tidak ada coffee shop ditemukan." />}
      </div>
    </Section>
  );
}

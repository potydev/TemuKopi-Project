import { Coffee, Store, Utensils, Tag, AlertTriangle, Users, TrendingUp, Star } from "lucide-react";
import { Section } from "./shared";
import type { AdminShop } from "./types";

export function DashboardTab({
  shops, activeShopsCount, inactiveShopsCount, pendingUMKMCount,
  pendingMenuCount, pendingPromoCount, flaggedReviewsCount, totalReviews,
}: {
  shops: AdminShop[]; activeShopsCount: number; inactiveShopsCount: number;
  pendingUMKMCount: number; pendingMenuCount: number; pendingPromoCount: number;
  flaggedReviewsCount: number; totalReviews: number;
}) {
  const stats = [
    { label: "Total Coffee Shop", value: shops.length, icon: <Coffee className="w-5 h-5" />, color: "from-amber-500 to-orange-600", sub: `${activeShopsCount} aktif • ${inactiveShopsCount} nonaktif` },
    { label: "Menunggu Verifikasi UMKM", value: pendingUMKMCount, icon: <Store className="w-5 h-5" />, color: "from-blue-500 to-indigo-600", sub: "Perlu tindakan" },
    { label: "Menunggu Verifikasi Menu", value: pendingMenuCount, icon: <Utensils className="w-5 h-5" />, color: "from-purple-500 to-pink-600", sub: "Perlu tindakan" },
    { label: "Promo Pending", value: pendingPromoCount, icon: <Tag className="w-5 h-5" />, color: "from-rose-500 to-red-600", sub: "Perlu tindakan" },
    { label: "Review Dilaporkan", value: flaggedReviewsCount, icon: <AlertTriangle className="w-5 h-5" />, color: "from-red-500 to-rose-700", sub: `Dari ${totalReviews} total review` },
    { label: "Total Pengguna", value: 1284, icon: <Users className="w-5 h-5" />, color: "from-emerald-500 to-teal-600", sub: "+12% bulan ini" },
  ];

  return (
    <>
      <Section title="Ringkasan Data" subtitle="Statistik real-time platform TemuKopi." icon={<TrendingUp className="w-5 h-5" />}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="p-4 rounded-2xl bg-gradient-to-br border border-border/40 shadow-sm relative overflow-hidden bg-white">
              <div className={`absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br ${s.color} opacity-10`} />
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} text-white flex items-center justify-center shadow-md mb-3`}>
                {s.icon}
              </div>
              <p className="text-[10px] text-[#8B6B4A] font-extrabold uppercase tracking-wider">{s.label}</p>
              <p className="text-2xl font-black text-[#2C1810] mt-1">{s.value.toLocaleString("id-ID")}</p>
              <p className="text-[10px] text-[#8B6B4A] font-semibold mt-1">{s.sub}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Coffee Shop Teratas" subtitle="5 coffee shop dengan rating tertinggi." icon={<Star className="w-5 h-5" />}>
        <div className="space-y-2">
          {[...shops].sort((a, b) => b.rating - a.rating).slice(0, 5).map((s, i) => (
            <div key={s.id} className="flex items-center gap-3 p-3 rounded-2xl bg-[#FAF6F0]/50 border border-border/30">
              <div className="w-8 h-8 rounded-full bg-[#2C1810] text-white flex items-center justify-center text-xs font-black shrink-0">#{i + 1}</div>
              <img src={s.img} alt={s.name} className="w-12 h-12 object-cover rounded-xl shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="font-extrabold text-[#2C1810] text-xs truncate">{s.name}</h3>
                <p className="text-[10px] text-[#8B6B4A] font-bold">{s.city}</p>
              </div>
              <div className="flex items-center gap-1 text-xs font-extrabold text-[#2C1810] shrink-0">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />{s.rating}
                <span className="text-[10px] text-[#8B6B4A] font-bold">({s.reviews})</span>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

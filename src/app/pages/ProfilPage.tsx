import { useEffect } from "react";
import {
  Home, Coffee, Heart, Clock, Tag, ShoppingBag, MapPin, Camera,
  ArrowRight, Sparkles, MessageSquare, Star
} from "lucide-react";
import { useApp } from "@/app/context/AppContext";
import { toast } from "sonner";
import { Shop, Page, unsplash, PROFILE_IMAGE } from "@/app/data/coffeeData";
import { Footer } from "@/app/components/Footer";

export function ProfilPage({
  nav,
  shops,
  claimedPromos,
}: {
  nav: (p: Page) => void;
  shops: Shop[];
  claimedPromos: Set<number>;
}) {
  const { user, setUser } = useApp();

  useEffect(() => {
    if (!user) {
      nav("login");
    }
  }, [user, nav]);

  if (!user) return null;

  const displayName = user.name;
  const displayEmail = user.email;
  const menuItems = [
    { icon: <Home className="w-4 h-4" />, label: "Beranda Profil", active: true },
    { icon: <Coffee className="w-4 h-4" />, label: "Preferensi Kopi" },
    { icon: <Heart className="w-4 h-4" />, label: "Favorit Tersimpan" },
    { icon: <Clock className="w-4 h-4" />, label: "Riwayat AI" },
    { icon: <Tag className="w-4 h-4" />, label: "Promo Tersimpan" },
  ];

  const preferenceStats = [
    { icon: <Coffee className="w-5 h-5" />, label: "Kopi Andalan", value: "Double Espresso, Caramel Macchiato, Kopi Aren" },
    { icon: <Coffee className="w-5 h-5" />, label: "Kadar Manis", value: "Manis Sedang (70%)" },
    { icon: <Coffee className="w-5 h-5" />, label: "Kadar Gurih", value: "Creamy Maksimal (90%)" },
    { icon: <Coffee className="w-5 h-5" />, label: "Tingkat Pahit", value: "Rendah Lembut" },
    { icon: <ShoppingBag className="w-5 h-5" />, label: "Kisaran Anggaran", value: "Rp 20.000 - Rp 50.000" },
    { icon: <MapPin className="w-5 h-5" />, label: "Suasana Favorit", value: "Tenang, Cozy, Work Friendly" },
  ];

  const aiHistory = [
    { prompt: "Aku lagi capek dan pengen santai sunyi", result: "Caramel Macchiato", date: "Baru saja" },
    { prompt: "Aku butuh fokus nugas koding serius", result: "Double Espresso", date: "Kemarin" },
    { prompt: "Healing sejuk estetik di luar ruangan", result: "Iced Latte", date: "3 hari lalu" },
  ];

  // Dynamic promo integration matching claimed coupon indexes!
  const promoData = [
    { id: 0, title: "Happy Hour Diskon 20%", subtitle: "Setiap hari 14.00 - 17.00", img: unsplash("1517701604599-bb29b565090c", 360, 160) },
    { id: 1, title: "Paket Kopi + Cemilan Hemat", subtitle: "Mulai dari Rp 35.000 saja", img: unsplash("1461023058943-07fcbe16d735", 360, 160) },
    { id: 2, title: "Buy 1 Get 1 Free Signature", subtitle: "Kupon khusus kencan berdua", img: unsplash("1509042239860-f550ce710b93", 360, 160) },
  ];

  const activeClaimedPromos = promoData.filter((p) => claimedPromos.has(p.id));

  return (
    <div className="flex-1 flex flex-col justify-between animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Profile Card and navigation menu */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card border border-border/80 rounded-3xl p-6 text-center shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-[#C8813A]/5 rounded-full blur-xl" />
              <div className="relative w-24 h-24 mx-auto mb-4">
                <img
                  src={PROFILE_IMAGE}
                  alt={`Foto profil ${displayName}`}
                  className="w-24 h-24 rounded-full object-cover bg-[#F0E8DC] border-2 border-white shadow-md"
                />
                <button className="absolute right-0 bottom-1 w-8 h-8 rounded-full bg-white border border-border/30 shadow flex items-center justify-center cursor-pointer text-[#C8813A]">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <h1 className="text-xl font-extrabold text-[#2C1810] tracking-tight">{displayName}</h1>
              <p className="text-xs text-[#8B6B4A] font-semibold mt-1 mb-5">{displayEmail}</p>
              <div className="flex gap-2 justify-center flex-wrap">
                <span className="text-[10px] font-extrabold bg-[#2C1810] text-[#FAF6F0] px-3.5 py-1.5 rounded-full shadow-sm">
                  {user?.role === "admin" ? "🛡️ Administrator" : "Penikmat Kopi Gold"}
                </span>
              </div>
              {user?.role === "admin" && (
                <button
                  onClick={() => nav("admin")}
                  className="mt-4 w-full py-2.5 rounded-xl bg-gradient-to-r from-[#C8813A] to-[#A0641F] text-white text-xs font-extrabold shadow-md hover:shadow-lg transition-all"
                >
                  Buka Admin Dashboard →
                </button>
              )}

              <div className="grid grid-cols-4 gap-2 mt-6 pt-6 border-t border-border/30 lg:hidden">
                {[
                  { icon: <Heart className="w-4.5 h-4.5 text-red-500 fill-red-500" />, value: 3, label: "Favorit" },
                  { icon: <Clock className="w-4.5 h-4.5 text-[#8B6B4A]" />, value: aiHistory.length, label: "Riwayat" },
                  { icon: <Star className="w-4.5 h-4.5 text-amber-500 fill-amber-500" />, value: 5, label: "Ulasan" },
                  { icon: <Tag className="w-4.5 h-4.5 text-indigo-500 fill-indigo-100" />, value: claimedPromos.size, label: "Kupon" },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <div className="flex justify-center mb-1">{item.icon}</div>
                    <p className="text-sm font-black text-[#2C1810]">{item.value}</p>
                    <p className="text-[9px] font-bold text-[#8B6B4A] uppercase tracking-wide">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:block bg-card border border-border/80 rounded-3xl p-4 shadow-xl">
              <div className="space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.label}
                    className={`w-full flex items-center gap-3.5 rounded-2xl px-4 py-3 text-xs font-bold transition-all ${item.active
                        ? "bg-[#F0E8DC] text-[#2C1810] shadow-sm"
                        : "text-[#8B6B4A] hover:bg-[#FAF6F0]"
                      }`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </div>
              <div className="border-t border-border/30 mt-4 pt-4 space-y-1">
                <button className="w-full flex items-center gap-3.5 rounded-2xl px-4 py-3 text-xs font-bold text-[#8B6B4A] hover:bg-[#FAF6F0]">
                  <Sparkles className="w-4 h-4 text-[#C8813A]" /> Notifikasi Akun
                </button>
                <button
                  onClick={() => {
                    setUser(null);
                    toast.success("Berhasil keluar akun.");
                    nav("home");
                  }}
                  className="w-full flex items-center gap-3.5 rounded-2xl px-4 py-3 text-xs font-bold text-red-500 hover:bg-red-50"
                >
                  <ArrowRight className="w-4 h-4 rotate-180" /> Keluar Akun
                </button>
              </div>
            </div>
          </div>

          {/* Right Info panels */}
          <div className="lg:col-span-8 space-y-6">
            {/* User Taste Profile Stats */}
            <div className="bg-card border border-border/80 rounded-3xl p-6 shadow-xl">
              <div className="flex items-center justify-between gap-4 mb-4 border-b border-border/30 pb-4">
                <div className="flex items-center gap-3">
                  <Coffee className="w-5 h-5 text-[#C8813A]" />
                  <div>
                    <h2 className="font-extrabold text-base text-[#2C1810]">Profil Preferensi Rasa Kopi</h2>
                    <p className="text-xs text-[#8B6B4A] font-semibold">Takar rasa kopi andalanmu secara dinamis untuk AI Pintar.</p>
                  </div>
                </div>
                <button
                  onClick={() => nav("rekomendasi")}
                  className="px-4 py-2.5 rounded-xl border border-[#C8813A] text-xs font-bold text-[#C8813A] bg-white hover:bg-[#FAF6F0] shadow-sm transition-all"
                >
                  Ubah Preferensi Rasa
                </button>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {preferenceStats.map((item, i) => (
                  <div key={i} className="flex items-center gap-3.5 p-3.5 bg-[#FAF6F0] rounded-2xl border border-border/20 shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-white border border-border/20 text-[#8B6B4A] flex items-center justify-center shrink-0 shadow-sm">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[10px] text-[#8B6B4A] font-extrabold uppercase tracking-wider">{item.label}</p>
                      <p className="text-xs font-bold text-[#2C1810] mt-0.5">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid xl:grid-cols-2 gap-6">
              {/* AI Prompts History list */}
              <div className="bg-card border border-border/80 rounded-3xl p-6 shadow-xl space-y-4">
                <h2 className="font-extrabold text-[#2C1810] text-sm flex items-center gap-2 border-b border-border/30 pb-3">
                  <MessageSquare className="w-5 h-5 text-[#C8813A]" />
                  Riwayat Konsultasi AI
                </h2>
                <div className="space-y-3">
                  {aiHistory.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-2xl bg-[#FAF6F0] p-3 border border-border/25 shadow-sm">
                      <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shrink-0 shadow-sm">
                        <MessageSquare className="w-4.5 h-4.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-[#2C1810] truncate">&ldquo;{item.prompt}&rdquo;</p>
                        <p className="text-[9px] text-[#8B6B4A] font-bold mt-0.5">{item.date}</p>
                      </div>
                      <button
                        onClick={() => nav("mood")}
                        className="px-3 py-1.5 rounded-lg border border-border/40 text-[10px] font-extrabold text-[#8B6B4A] hover:bg-white transition-colors"
                      >
                        Buka
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Claimed Coupons List dynamically */}
              <div className="bg-card border border-border/80 rounded-3xl p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-border/30 pb-3">
                  <h2 className="font-extrabold text-[#2C1810] text-sm flex items-center gap-2">
                    <Tag className="w-5 h-5 text-[#C8813A]" />
                    Promo Tersimpan
                  </h2>
                  <button
                    onClick={() => nav("promo")}
                    className="text-xs font-extrabold text-[#C8813A] hover:underline"
                  >
                    Tambah Kupon
                  </button>
                </div>
                <div className="space-y-3">
                  {activeClaimedPromos.length === 0 ? (
                    <div className="text-center py-8">
                      <Tag className="w-10 h-10 text-[#D0C0A8] mx-auto mb-2 animate-bounce" />
                      <p className="text-xs text-[#8B6B4A] font-semibold">Klaim kupon promo di halaman Promo untuk dipajang di sini.</p>
                    </div>
                  ) : (
                    activeClaimedPromos.map((promo) => (
                      <div
                        key={promo.id}
                        onClick={() => nav("promo")}
                        className="relative h-24 rounded-2xl overflow-hidden text-left shadow-sm border border-border/30 group cursor-pointer"
                      >
                        <img src={promo.img} alt={promo.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                        <div className="relative p-3.5 h-full flex flex-col justify-between">
                          <div>
                            <p className="text-white font-extrabold text-xs">{promo.title}</p>
                            <p className="text-[#F0E8DC]/80 text-[10px] font-semibold mt-0.5">{promo.subtitle}</p>
                          </div>
                          <span className="inline-flex px-2 py-0.5 rounded bg-emerald-500 text-white text-[9px] font-black w-fit border border-emerald-400/30 uppercase tracking-wide">
                            Siap Digunakan
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
            {/* Achievement Badges */}
            <div className="bg-card border border-border/80 rounded-3xl p-6 shadow-xl">
              <h2 className="font-extrabold text-[#2C1810] text-sm flex items-center gap-2 border-b border-border/30 pb-3 mb-5">
                <Sparkles className="w-5 h-5 text-[#C8813A]" /> Pencapaian Kopimu
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { emoji: "☕", title: "Pencinta Espresso", desc: "Sudah menjelajah 5+ kedai espresso", unlocked: true },
                  { emoji: "🌍", title: "Explorer 3 Kota", desc: "Menjelajah kedai di 3 kota berbeda", unlocked: true },
                  { emoji: "⭐", title: "Review Master", desc: "Menulis 5+ ulasan kedai kopi", unlocked: true },
                  { emoji: "🎯", title: "AI Expert", desc: "Menggunakan Mood Finder 10 kali", unlocked: false },
                ].map((badge, i) => (
                  <div key={i} className={`text-center p-4 rounded-2xl border transition-all ${badge.unlocked ? 'bg-gradient-to-b from-amber-50 to-orange-50 border-amber-200 shadow-sm' : 'bg-gray-50 border-gray-200 opacity-50 grayscale'}`}>
                    <div className="text-3xl mb-2">{badge.emoji}</div>
                    <p className="text-xs font-extrabold text-[#2C1810]">{badge.title}</p>
                    <p className="text-[9px] text-[#8B6B4A] font-semibold mt-1 leading-relaxed">{badge.desc}</p>
                    {badge.unlocked && <span className="inline-block mt-2 text-[8px] font-black bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">✓ Terbuka</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer nav={nav} />
    </div>
  );
}

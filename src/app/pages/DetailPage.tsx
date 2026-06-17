import { useState } from "react";
import { ChevronLeft, Star, Clock, Navigation, Bookmark, Share2, Tag, Coffee, Wifi, Zap, Car, Leaf, Globe } from "lucide-react";
import { Page, Shop, unsplash } from "@/app/data/coffeeData";
import { StarRow } from "@/app/components/ui/StarRow";
import { Pill } from "@/app/components/ui/Pill";

export function DetailPage({
  nav,
  favs,
  toggleFav,
  shopId,
  shops,
}: {
  nav: (p: Page) => void;
  favs: Set<string>;
  toggleFav: (id: string) => void;
  shopId: string;
  shops: Shop[];
}) {
  const [activeTab, setActiveTab] = useState<"tentang" | "menu" | "ulasan" | "foto" | "promo">("tentang");
  const [saved, setSaved] = useState(false);
  const shop = shops.find((s) => s.id === shopId) || shops[1];

  const currentIndex = shops.findIndex((s) => s.id === shop.id);
  const nextImg1 = shops[(currentIndex + 1) % shops.length].img;
  const nextImg2 = shops[(currentIndex + 2) % shops.length].img;

  const [reviews, setReviews] = useState([
    {
      name: "Aulia Rahma",
      rating: 5,
      text: "Tempatnya sangat nyaman untuk kerja laptopan berjam-jam. WiFi super kencang & colokan melimpah di setiap meja.",
      time: "2 hari lalu",
      avatar: "AR",
    },
    {
      name: "Dimas Pratama",
      rating: 5,
      text: "Suasananya sangat tenang dan menyejukkan. Kopinya pekat dengan standard premium. Staff ramah banget.",
      time: "5 hari lalu",
      avatar: "DP",
    },
    {
      name: "Sarah Amelia",
      rating: 4,
      text: "Kopi susu arennya enak banget, manisnya legit alami! Tempat estetik & instagramable buat OOTD.",
      time: "1 minggu lalu",
      avatar: "SA",
    },
  ]);

  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const starCounts = [
    reviews.filter(r => r.rating === 5).length + 117,
    reviews.filter(r => r.rating === 4).length + 43,
    reviews.filter(r => r.rating === 3).length + 14,
    reviews.filter(r => r.rating === 2).length + 4,
    reviews.filter(r => r.rating === 1).length + 2,
  ];

  const totalReviews = starCounts.reduce((a, b) => a + b, 0);
  // Average rating calculated dynamically
  const averageRating = (
    (starCounts[0] * 5 + starCounts[1] * 4 + starCounts[2] * 3 + starCounts[3] * 2 + starCounts[4] * 1) /
    totalReviews
  ).toFixed(1);

  const handleSubmitReview = () => {
    if (!reviewText.trim() || reviewRating === 0) return;
    setReviews((prev) => [
      {
        name: "Fakhrizz (Kamu)",
        rating: reviewRating,
        text: reviewText,
        time: "Baru saja",
        avatar: "KM",
      },
      ...prev,
    ]);
    setReviewText("");
    setReviewRating(0);
  };

  const facilityIcons: Record<string, typeof Wifi> = {
    WiFi: Wifi,
    Stopkontak: Zap,
    Parkir: Car,
    Outdoor: Leaf,
    Musholla: Globe,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeIn">
      <button
        onClick={() => nav("pencarian")}
        className="flex items-center gap-2 text-sm font-bold text-[#8B6B4A] mb-6 hover:text-[#2C1810] transition-colors bg-white px-4 py-2 rounded-xl shadow-sm border border-border/30 w-fit"
      >
        <ChevronLeft className="w-4 h-4" /> Kembali ke Pencarian
      </button>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="md:col-span-2 rounded-3xl overflow-hidden h-72 sm:h-[420px] shadow-md relative group">
          <img src={shop.img} alt={shop.name} className="w-full h-full object-cover bg-[#F0E8DC] group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
          {[nextImg1, nextImg2].map((src, i) => (
            <div key={i} className="rounded-3xl overflow-hidden h-32 md:h-[200px] shadow-sm relative group">
              <img src={src} alt="" className="w-full h-full object-cover bg-[#F0E8DC] group-hover:scale-105 transition-transform duration-500" />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-border/30 pb-5">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-extrabold text-[#2C1810] tracking-tight">{shop.name}</h1>
                <span className="text-xs px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 font-extrabold border border-emerald-200 shadow-sm flex items-center gap-1 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  Buka
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3.5 text-sm text-[#8B6B4A] mt-2.5 font-semibold">
                <div className="flex items-center gap-1 text-[#2C1810]">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="font-extrabold">{averageRating}</span>
                  <span className="text-xs text-[#8B6B4A]">({totalReviews} ulasan)</span>
                </div>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-[#C8813A]" /> 07.00 – 22.00
                </span>
                <span>·</span>
                <span className="text-emerald-700 font-bold">{shop.price}</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2">
              <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-[#2C1810] text-[#FAF6F0] text-xs font-bold hover:bg-[#C8813A] hover:text-white transition-all shadow-md">
                <Navigation className="w-4 h-4" /> Rute Jalan
              </button>
              <button
                onClick={() => setSaved(!saved)}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-bold border transition-all shadow-sm ${saved
                    ? "bg-[#C8813A] border-[#C8813A] text-white"
                    : "border-border bg-white text-[#8B6B4A] hover:bg-[#F0E8DC]/20"
                  }`}
              >
                <Bookmark className={`w-4 h-4 ${saved ? "fill-white" : ""}`} />
                {saved ? "Tersimpan" : "Simpan Kedai"}
              </button>
              <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl border border-border bg-white text-[#8B6B4A] text-xs font-bold hover:bg-[#F0E8DC]/20 transition-all shadow-sm">
                <Share2 className="w-4 h-4" /> Bagikan
              </button>
            </div>
          </div>

          {/* Tab Menu Header */}
          <div className="flex border-b border-border/40 gap-1 overflow-x-auto [&::-webkit-scrollbar]:hidden">
            {["tentang", "menu", "ulasan"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-5 py-3.5 text-sm font-bold capitalize transition-all relative shrink-0 ${activeTab === tab
                    ? "text-[#C8813A] bg-[#FAF6F0] rounded-t-2xl border-t border-x border-border/30"
                    : "text-[#8B6B4A] hover:text-[#2C1810]"
                  }`}
              >
                {tab === "tentang" ? "Tentang Kedai" : tab === "menu" ? "Daftar Menu" : "Ulasan Publik"}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C8813A]" />
                )}
              </button>
            ))}
          </div>

          {/* Dynamic Tab Body */}
          <div className="bg-card border border-border/50 rounded-3xl p-6 shadow-md animate-fadeIn">
            {activeTab === "tentang" && (
              <div className="space-y-6">
                <p className="text-sm text-[#8B6B4A] leading-relaxed font-semibold">
                  Tanamera Coffee menyuguhkan konsep arsitektur minimalis industrial yang sangat cocok sebagai workspace tenang, ruang rapat kolektif, maupun bersantai hangat di sore hari. Kami bangga menyajikan racikan biji kopi single origin lokal terbaik hasil roasting tangan ahli artisan nusantara.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { icon: <MapPin className="w-4 h-4" />, label: "Alamat Lengkap", value: "Jl. Kemang Raya No. 45, Jakarta Selatan" },
                    { icon: <Clock className="w-4 h-4" />, label: "Jam Operasional", value: "07.00 – 22.00 (Setiap Hari)" },
                    { icon: <Tag className="w-4 h-4" />, label: "Kisaran Anggaran", value: "Rp 25.000 – 60.000 / orang" },
                    { icon: <Coffee className="w-4 h-4" />, label: "Fasilitas Unggulan", value: "Area AC, Stopkontak, Meeting Room, WiFi Kencang" },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3.5 p-4 bg-[#FAF6F0] rounded-2xl border border-border/20 items-center">
                      <div className="w-10 h-10 rounded-xl bg-white border border-border/20 flex items-center justify-center text-[#C8813A] shadow-sm shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-[10px] text-[#8B6B4A] font-extrabold uppercase tracking-wider">{item.label}</p>
                        <p className="text-xs font-bold text-[#2C1810] mt-0.5 leading-snug">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "menu" && (
              <div className="space-y-4">
                <h3 className="font-extrabold text-[#2C1810] text-sm">Signature & Menu Terlaris</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { name: "Kopi Aren Premium", price: "Rp 28.000", desc: "Espresso strong dibalut susu segar creamy & gula aren murni.", img: unsplash("1503240778100-fd245e17a273", 100, 100) },
                    { name: "Caramel Macchiato Sweet", price: "Rp 35.000", desc: "Susu caramel gurih manis bertingkat dengan shot kopi pekat.", img: unsplash("1563311977-d285756282dc", 100, 100) },
                    { name: "Matcha Latte Fresh", price: "Rp 32.000", desc: "Matcha grade Uji Jepang di-whipped lembut bersama susu segar.", img: unsplash("1578314675249-a6910f80cc4e", 100, 100) },
                  ].map((m) => (
                    <div key={m.name} className="flex gap-4 p-3 bg-white border border-border/40 rounded-2xl shadow-sm items-center hover:border-[#C8813A] transition-colors">
                      <img src={m.img} alt={m.name} className="w-16 h-16 object-cover rounded-xl shrink-0" />
                      <div>
                        <p className="font-extrabold text-sm text-[#2C1810]">{m.name}</p>
                        <p className="text-xs font-extrabold text-[#C8813A] mt-0.5">{m.price}</p>
                        <p className="text-[10px] text-[#8B6B4A] font-semibold leading-relaxed mt-1 line-clamp-1">{m.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "ulasan" && (
              <div className="space-y-6">
                {/* Tulis Ulasan Box */}
                <div className="bg-[#FAF6F0] rounded-2xl p-5 border border-border/30 space-y-4">
                  <h4 className="font-extrabold text-sm text-[#2C1810]">Beri Rating & Tulis Pengalamanmu</h4>
                  <div className="flex gap-3 items-center">
                    <span className="text-xs font-bold text-[#8B6B4A]">Rating Anda:</span>
                    <div className="flex gap-1.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button key={s} onClick={() => setReviewRating(s)} className="hover:scale-110 transition-transform">
                          <Star
                            className={`w-7 h-7 transition-colors ${s <= reviewRating ? "text-amber-500 fill-amber-500" : "text-amber-200/50"}`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <textarea
                    placeholder="Ceritakan rasa kopinya, keramahan staf, kenyamanan colokan WiFi..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-border/40 text-xs font-bold text-[#2C1810] placeholder-[#8B6B4A]/50 outline-none focus:border-[#C8813A] resize-none shadow-inner"
                  />
                  <button
                    onClick={handleSubmitReview}
                    className="px-6 py-2.5 bg-[#2C1810] text-[#FAF6F0] rounded-xl text-xs font-extrabold hover:bg-[#C8813A] transition-colors cursor-pointer"
                  >
                    Kirim Ulasan
                  </button>
                </div>

                {/* Ulasan List */}
                <div className="space-y-4">
                  {reviews.map((r, i) => (
                    <div key={i} className="bg-white border border-border/40 rounded-2xl p-4 shadow-sm animate-fadeIn">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-[#2C1810] flex items-center justify-center text-[#FAF6F0] text-sm font-extrabold shrink-0 border-2 border-white shadow">
                          {r.avatar}
                        </div>
                        <div>
                          <p className="font-extrabold text-[#2C1810] text-xs">{r.name}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <StarRow rating={r.rating} />
                            <span className="text-[10px] text-[#8B6B4A] font-semibold">{r.time}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-[#8B6B4A] font-semibold leading-relaxed">{r.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Rating Breakdown sidebar */}
        <div className="lg:col-span-4 bg-card border border-border/80 rounded-3xl p-6 shadow-xl space-y-6">
          <h3 className="font-extrabold text-[#2C1810] text-base border-b border-border/40 pb-3">Rating Keseluruhan</h3>
          <div className="text-center bg-[#FAF6F0] py-6 rounded-3xl border border-border/30">
            <div className="text-6xl font-black text-[#2C1810] tracking-tight">{averageRating}</div>
            <div className="flex justify-center my-2.5">
              <StarRow rating={parseFloat(averageRating)} />
            </div>
            <p className="text-xs text-[#8B6B4A] font-bold">{totalReviews} ulasan nyata pengunjung</p>
          </div>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((s, idx) => (
              <div key={s} className="flex items-center gap-2 text-xs">
                <span className="text-xs font-bold text-[#8B6B4A] w-3">{s}</span>
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />
                <div className="flex-1 h-2 bg-[#F0E8DC] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full"
                    style={{ width: `${(starCounts[idx] / totalReviews) * 100}%` }}
                  />
                </div>
                <span className="text-[10px] font-bold text-[#8B6B4A] w-7 text-right">{starCounts[idx]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

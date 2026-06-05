import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  Coffee, Search, Heart, Star, MapPin, Clock, Wifi, Zap, Car,
  ChevronRight, ChevronLeft, ChevronDown, Send, Brain, Sparkles,
  Home, Navigation, ArrowRight, Share2, Bookmark, Filter, X, Check,
  MessageSquare, TrendingUp, Camera, Tag, Bot,
  User, ShoppingBag, Map, Leaf, Utensils, Globe, Volume2, VolumeX, BookOpen,
} from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

// Import category icons
import nugasIcon from "@/imports/nugas.png";
import meetingIcon from "@/imports/meeting.png";
import dateIcon from "@/imports/date.png";
import nongkrongIcon from "@/imports/nongkrong.png";
import healingIcon from "@/imports/healing.png";
import malamIcon from "@/imports/malam.png";

// Import favorit page icons
import favIcon from "@/imports/fav.png";
import clockIcon from "@/imports/clock.png";

type Page = "home" | "mood" | "rekomendasi" | "pencarian" | "detail" | "menu" | "promo" | "umkm" | "ulasan" | "favorit" | "profil";

// ── Helpers ────────────────────────────────────────────────────────────────────
const unsplash = (id: string, w = 800, h = 500) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format`;

const PROFILE_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cdefs%3E%3CradialGradient id='bg' cx='50%25' cy='48%25' r='70%25'%3E%3Cstop offset='0%25' stop-color='%235b5252'/%3E%3Cstop offset='100%25' stop-color='%23151112'/%3E%3C/radialGradient%3E%3Cfilter id='blur'%3E%3CfeGaussianBlur stdDeviation='3.2'/%3E%3C/filter%3E%3C/defs%3E%3Crect width='200' height='200' fill='url(%23bg)'/%3E%3Cg filter='url(%23blur)'%3E%3Cellipse cx='100' cy='138' rx='53' ry='62' fill='%23ddd8d8'/%3E%3Cellipse cx='73' cy='77' rx='31' ry='28' fill='%23d8d4d4'/%3E%3Cellipse cx='128' cy='77' rx='31' ry='28' fill='%23d8d4d4'/%3E%3Cellipse cx='68' cy='76' rx='14' ry='10' fill='%23201a1b' transform='rotate(-7 68 76)'/%3E%3Cellipse cx='123' cy='76' rx='14' ry='10' fill='%23201a1b' transform='rotate(8 123 76)'/%3E%3Cellipse cx='73' cy='70' rx='6' ry='4' fill='%23fff' opacity='.42'/%3E%3Cellipse cx='129' cy='70' rx='6' ry='4' fill='%23fff' opacity='.42'/%3E%3Cpath d='M60 111 C82 119 119 119 142 111' fill='none' stroke='%238b8585' stroke-width='5' stroke-linecap='round' opacity='.72'/%3E%3C/g%3E%3C/svg%3E";

// ── Initial Data ───────────────────────────────────────────────────────────────
interface Shop {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  distance: string;
  distanceNum: number;
  tags: string[];
  price: string;
  priceMin: number;
  img: string;
  reason: string;
  facilities: string[];
  city: string;
}

const INITIAL_SHOPS: Shop[] = [
  {
    id: "kopiruanghati",
    name: "Kopi Ruang Hati",
    rating: 4.6,
    reviews: 230,
    distance: "1.2 km",
    distanceNum: 1.2,
    tags: ["Tenang", "Cozy", "WiFi"],
    price: "Rp 20.000 – 45.000",
    priceMin: 20000,
    img: unsplash("1600093463592-8e36ae95ef56"),
    reason: "Cocok untuk me time dan suasana santai yang menenangkan.",
    facilities: ["WiFi", "Stopkontak", "Parkir"],
    city: "Jakarta Selatan",
  },
  {
    id: "tanamera",
    name: "Tanamera Coffee",
    rating: 4.7,
    reviews: 186,
    distance: "2.1 km",
    distanceNum: 2.1,
    tags: ["Cozy", "Premium", "Tenang"],
    price: "Rp 25.000 – 60.000",
    priceMin: 25000,
    img: unsplash("1521017432531-fbd92d768814"),
    reason: "Cocok untuk menikmati kopi premium creamy dengan suasana yang sangat nyaman.",
    facilities: ["WiFi", "Stopkontak", "Parkir", "Outdoor", "Musholla"],
    city: "Jakarta Selatan",
  },
  {
    id: "kolektif",
    name: "Kolektif Space",
    rating: 4.5,
    reviews: 152,
    distance: "1.8 km",
    distanceNum: 1.8,
    tags: ["Work Friendly", "Stopkontak", "Tenang"],
    price: "Rp 20.000 – 50.000",
    priceMin: 20000,
    img: unsplash("1538333581680-29dd4752ddf2"),
    reason: "Sangat menunjang produktivitas dengan meeting room mumpuni namun tetap santai.",
    facilities: ["WiFi", "Stopkontak", "Parkir", "Meeting Room"],
    city: "Jakarta Pusat",
  },
  {
    id: "seeyou",
    name: "See You Coffee",
    rating: 4.4,
    reviews: 118,
    distance: "3.2 km",
    distanceNum: 3.2,
    tags: ["Estetik", "Cozy", "Outdoor"],
    price: "Rp 18.000 – 40.000",
    priceMin: 18000,
    img: unsplash("1542181961-9590d0c79dab"),
    reason: "Suasana outdoor asri dan estetik, sangat pas untuk berfoto & healing sejenak.",
    facilities: ["WiFi", "Outdoor", "Parkir"],
    city: "Bandung",
  },
  {
    id: "kopiselasar",
    name: "Kopi Selasar Jati",
    rating: 4.8,
    reviews: 340,
    distance: "0.8 km",
    distanceNum: 0.8,
    tags: ["Asri", "Tenang", "Healing"],
    price: "Rp 15.000 – 35.000",
    priceMin: 15000,
    img: unsplash("1447933601403-0c6688de566e"),
    reason: "Nikmati ketenangan menyeruput kopi dengan angin sepoi-sepoi khas Jogja di bawah rindangnya pohon jati.",
    facilities: ["WiFi", "Parkir", "Outdoor", "Musholla"],
    city: "Yogyakarta",
  },
  {
    id: "titiktemu",
    name: "Titik Temu Coffee",
    rating: 4.6,
    reviews: 215,
    distance: "4.5 km",
    distanceNum: 4.5,
    tags: ["Social Hub", "Premium", "Estetik"],
    price: "Rp 30.000 – 75.000",
    priceMin: 30000,
    img: unsplash("1501339847302-ac426a4a7cbb"),
    reason: "Sangat pas untuk bersosialisasi dan menikmati kopi kelas dunia di tengah taman terbuka tropis Bali.",
    facilities: ["WiFi", "Outdoor", "Parkir"],
    city: "Bali",
  },
  {
    id: "filosofikopi",
    name: "Filosofi Kopi Melawai",
    rating: 4.5,
    reviews: 512,
    distance: "2.5 km",
    distanceNum: 2.5,
    tags: ["Cozy", "Nongkrong", "Work Friendly"],
    price: "Rp 25.000 – 50.000",
    priceMin: 25000,
    img: unsplash("1498804103079-a6351b050096"),
    reason: "Tempat ikonik untuk berdiskusi santai tentang seni, kehidupan, dan cita rasa kopi manual brew terbaik.",
    facilities: ["WiFi", "Stopkontak", "Parkir"],
    city: "Jakarta Selatan",
  },
  {
    id: "seniman",
    name: "Seniman Coffee",
    rating: 4.9,
    reviews: 423,
    distance: "5.1 km",
    distanceNum: 5.1,
    tags: ["Premium", "Creative Space", "Healing"],
    price: "Rp 35.000 – 80.000",
    priceMin: 35000,
    img: unsplash("1495474472287-4d71bcdd2085"),
    reason: "Surganya pencinta kopi artisan dengan kursi goyang ikonik dan barista berlisensi internasional.",
    facilities: ["WiFi", "AC", "Meeting Room", "Parkir"],
    city: "Bali",
  },
  {
    id: "tokodjawa",
    name: "Kopi Toko Djawa Braga",
    rating: 4.7,
    reviews: 670,
    distance: "1.5 km",
    distanceNum: 1.5,
    tags: ["Estetik", "Vintage", "Nongkrong"],
    price: "Rp 15.000 – 30.000",
    priceMin: 15000,
    img: unsplash("1511920170033-f8396924c348"),
    reason: "Atmosfer vintage yang magis di Jalan Braga. Kopi susu legendaris dipadukan dengan wangi buku lama.",
    facilities: ["Indoor", "WiFi", "Parkir"],
    city: "Bandung",
  },
  {
    id: "lajukopi",
    name: "Laju Kopi Surabaya",
    rating: 4.4,
    reviews: 98,
    distance: "2.8 km",
    distanceNum: 2.8,
    tags: ["Minimalis", "Work Friendly", "Nugas"],
    price: "Rp 18.000 – 35.000",
    priceMin: 18000,
    img: unsplash("1554118811-1e0d58224f24"),
    reason: "Konsep arsitektur industrial modern yang sunyi, sangat mendukung fokus penuh untuk nugas serius.",
    facilities: ["WiFi", "Stopkontak", "AC", "Parkir"],
    city: "Surabaya",
  },
  {
    id: "giyanti",
    name: "Giyanti Coffee Roastery",
    rating: 4.8,
    reviews: 310,
    distance: "3.5 km",
    distanceNum: 3.5,
    tags: ["Premium", "Cozy", "Estetik"],
    price: "Rp 35.000 – 70.000",
    priceMin: 35000,
    img: unsplash("1517256064527-09c53b2d0bc6"),
    reason: "Kedai kopi bergaya eksentrik dengan biji kopi sangrai mandiri yang memiliki aroma buah yang segar.",
    facilities: ["WiFi", "Outdoor", "Indoor", "AC", "Parkir"],
    city: "Jakarta Pusat",
  },
  {
    id: "bumiayu",
    name: "Bumi Ayu Coffee Malang",
    rating: 4.6,
    reviews: 140,
    distance: "4.2 km",
    distanceNum: 4.2,
    tags: ["Healing", "Asri", "Malam"],
    price: "Rp 15.000 – 38.000",
    priceMin: 15000,
    img: unsplash("1507133750040-4a8f57021571"),
    reason: "Menikmati pemandangan pegunungan kota Malang dari area rooftop yang sejuk dengan secangkir kopi tubruk hangat.",
    facilities: ["WiFi", "Outdoor", "Musholla", "Parkir"],
    city: "Malang",
  },
  {
    id: "commongrounds",
    name: "Common Grounds",
    rating: 4.7,
    reviews: 280,
    distance: "3.9 km",
    distanceNum: 3.9,
    tags: ["Meeting", "Premium", "Work Friendly"],
    price: "Rp 30.000 – 65.000",
    priceMin: 30000,
    img: unsplash("1463797224155-85a921420247"),
    reason: "Tempat favorit bagi para profesional bisnis untuk mengadakan pertemuan formal dengan sajian hidangan brunch berkualitas tinggi.",
    facilities: ["Meeting Room", "WiFi", "Indoor", "AC", "Parkir"],
    city: "Surabaya",
  },
  {
    id: "klinikkopi",
    name: "Klinik Kopi Jogja",
    rating: 4.9,
    reviews: 490,
    distance: "2.2 km",
    distanceNum: 2.2,
    tags: ["Healing", "Tenang", "Asri"],
    price: "Rp 20.000 – 40.000",
    priceMin: 20000,
    img: unsplash("1508700115892-45ecd05ae2ad"),
    reason: "Bukan kedai kopi biasa. Di sini Anda akan berkonsultasi langsung dengan roaster tentang sejarah setiap biji kopi tanpa gula.",
    facilities: ["WiFi", "Outdoor", "Parkir"],
    city: "Yogyakarta",
  }
];

const COFFEES = [
  {
    id: "vanilla-latte",
    name: "Vanilla Latte",
    rasa: "Creamy, manis ringan",
    kafein: 2,
    reason: "Cocok untuk mood santai dan tidak terlalu pahit",
    img: unsplash("1503240778100-fd245e17a273", 300, 300),
    profile: { manis: 75, creamy: 85, strong: 40, pahit: 30, segar: 50 }
  },
  {
    id: "caramel-macchiato",
    name: "Caramel Macchiato",
    rasa: "Manis, creamy",
    kafein: 2,
    reason: "Cocok untuk melepas capek dengan rasa yang lembut manis",
    img: unsplash("1563311977-d285756282dc", 300, 300),
    profile: { manis: 90, creamy: 90, strong: 30, pahit: 20, segar: 40 }
  },
  {
    id: "iced-latte",
    name: "Iced Latte",
    rasa: "Ringan, creamy, segar",
    kafein: 2,
    reason: "Cocok untuk suasana santai dan me time menyegarkan",
    img: unsplash("1578314675249-a6910f80cc4e", 300, 300),
    profile: { manis: 50, creamy: 75, strong: 50, pahit: 40, segar: 80 }
  },
  {
    id: "kopisusu-aren",
    name: "Kopi Susu Aren",
    rasa: "Gurih, manis legit, strong",
    kafein: 3,
    reason: "Cocok untuk nambah energi dan produktivitas harian",
    img: unsplash("1517701604599-bb29b565090c", 300, 300),
    profile: { manis: 80, creamy: 70, strong: 70, pahit: 55, segar: 30 }
  },
  {
    id: "espresso",
    name: "Double Espresso",
    rasa: "Sangat pahit, pekat, asam halus",
    kafein: 5,
    reason: "Cocok untuk fokus total, nugas semalaman, anti-ngantuk",
    img: unsplash("1514432324607-a09d9b4aefdd", 300, 300),
    profile: { manis: 0, creamy: 0, strong: 100, pahit: 95, segar: 20 }
  },
];

const CATEGORIES = [
  { id: "Nugas", label: "Nugas", icon: nugasIcon },
  { id: "Meeting", label: "Meeting", icon: meetingIcon },
  { id: "Date", label: "Date", icon: dateIcon },
  { id: "Nongkrong", label: "Nongkrong", icon: nongkrongIcon },
  { id: "Healing", label: "Healing", icon: healingIcon },
  { id: "Malam", label: "Malam Hari", icon: malamIcon },
];

// ── Atoms ──────────────────────────────────────────────────────────────────────
function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`w-4 h-4 transition-colors ${s <= Math.round(rating) ? "text-amber-500 fill-amber-500" : "text-amber-200/50"
            }`}
        />
      ))}
    </div>
  );
}

function Pill({ label }: { label: string }) {
  return (
    <span className="text-[10px] px-2.5 py-1 rounded-full bg-[#F0E8DC] text-[#8B6B4A] font-semibold tracking-wide shadow-sm hover:scale-105 transition-spring">
      {label}
    </span>
  );
}

function ShopCard({
  shop,
  fav,
  onFav,
  onDetail,
}: {
  shop: Shop;
  fav: boolean;
  onFav: () => void;
  onDetail: () => void;
}) {
  return (
    <div className="bg-card rounded-2xl border border-[#2C1810]/8 overflow-hidden shadow-sm hover:shadow-[0_20px_40px_rgba(200,129,58,0.12)] hover:-translate-y-2 hover:border-[#C8813A]/30 transition-spring flex flex-col h-full group">
      <div className="relative overflow-hidden cursor-pointer" onClick={onDetail}>
        <img
          src={shop.img}
          alt={shop.name}
          className="w-full h-48 object-cover bg-[#F0E8DC] group-hover:scale-105 group-hover:brightness-95 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFav();
          }}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md transition-spring active:scale-90 hover:bg-white hover:scale-110"
        >
          <Heart
            className={`w-4 h-4 transition-spring ${fav ? "text-red-500 fill-red-500 scale-110" : "text-[#8B6B4A] hover:text-red-500"
              }`}
          />
        </button>
        <div className="absolute top-3 left-3">
          <div className="flex items-center gap-1 bg-white/95 backdrop-blur-sm rounded-full px-2.5 py-1 shadow-sm">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 animate-pulse" />
            <span className="text-xs font-bold text-[#2C1810]">{shop.rating}</span>
            <span className="text-[10px] text-[#8B6B4A] font-semibold">({shop.reviews})</span>
          </div>
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-1 mb-1.5">
            <h3
              onClick={onDetail}
              className="font-bold text-[#2C1810] group-hover:text-[#C8813A] transition-colors duration-300 cursor-pointer text-base line-clamp-1"
            >
              {shop.name}
            </h3>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-100 shrink-0 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              Buka
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs text-[#8B6B4A] mb-3">
            <span className="flex items-center gap-1 font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#C8813A]" />
              {shop.distance} · {shop.city}
            </span>
            <span className="font-semibold text-emerald-600/90">{shop.price}</span>
          </div>
          <div className="flex flex-wrap gap-1 mb-4">
            {shop.tags.map((t) => (
              <Pill key={t} label={t} />
            ))}
          </div>
          {shop.reason && (
            <p className="text-xs text-[#8B6B4A]/90 mb-4 leading-relaxed line-clamp-2 italic">
              &ldquo;{shop.reason}&rdquo;
            </p>
          )}
        </div>
        <button
          onClick={onDetail}
          className="w-full py-2.5 rounded-xl bg-[#2C1810] text-[#FAF6F0] text-xs font-bold hover:bg-[#C8813A] hover:text-white transition-spring shadow-sm flex items-center justify-center gap-2 hover:shadow-md hover:scale-102 active:scale-98 group-hover:shadow-md"
        >
          Lihat Detail <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </div>
    </div>
  );
}

// ── Navbar ─────────────────────────────────────────────────────────────────────
function Navbar({ page, nav, favCount }: { page: Page; nav: (p: Page) => void; favCount: number }) {
  const [open, setOpen] = useState(false);
  const links: { label: string; p: Page }[] = [
    { label: "Beranda", p: "home" },
    { label: "Cari", p: "pencarian" },
    { label: "Mood Finder AI", p: "mood" },
    { label: "Taste Profile", p: "rekomendasi" },
    { label: "Promo", p: "promo" },
    { label: "Untuk UMKM", p: "umkm" },
  ];
  return (
    <nav className="sticky top-0 z-50 bg-[#FAF6F0]/90 backdrop-blur-xl border-b border-border/40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <button onClick={() => nav("home")} className="flex items-center gap-2.5 shrink-0 group transition-spring hover:scale-102 active:scale-95">
            <div className="w-10 h-10 rounded-2xl bg-[#2C1810] flex items-center justify-center group-hover:bg-[#C8813A] transition-spring shadow-md group-hover:shadow-[0_8px_16px_rgba(200,129,58,0.2)]">
              <Coffee className="w-5 h-5 text-[#FAF6F0] group-hover:rotate-12 transition-spring" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-[#2C1810] group-hover:text-[#C8813A] transition-spring">
              TemuKopi
            </span>
          </button>
          <div className="hidden md:flex items-center gap-1.5">
            {links.map((l) => (
              <button
                key={l.p}
                onClick={() => nav(l.p)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold tracking-wide transition-spring relative hover:scale-103 active:scale-97 ${page === l.p
                    ? "text-[#C8813A] bg-[#F0E8DC]/50 shadow-inner"
                    : "text-[#8B6B4A] hover:text-[#2C1810] hover:bg-[#F0E8DC]/40 hover:shadow-[0_4px_12px_rgba(200,129,58,0.06)]"
                  }`}
              >
                {l.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => nav("favorit")}
              className="w-10 h-10 rounded-full hover:bg-red-50/80 flex items-center justify-center transition-spring relative shadow-sm border border-border/20 bg-white hover:scale-110 active:scale-90 group"
            >
              <Heart className="w-5 h-5 text-[#8B6B4A] group-hover:text-red-500 group-hover:scale-110 transition-spring" />
              {favCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-[#FAF6F0] animate-bounce">
                  {favCount}
                </span>
              )}
            </button>
            <button
              onClick={() => nav("profil")}
              className="w-10 h-10 rounded-full bg-[#2C1810] flex items-center justify-center transition-spring hover:scale-110 active:scale-90 shadow-md border-2 border-white hover:bg-[#C8813A]"
            >
              <User className="w-5 h-5 text-[#FAF6F0]" />
            </button>
            <button
              className="md:hidden w-10 h-10 rounded-full hover:bg-[#F0E8DC]/40 flex items-center justify-center shadow-sm bg-white"
              onClick={() => setOpen(!open)}
            >
              {open ? <X className="w-5 h-5 text-[#8B6B4A]" /> : <ChevronDown className="w-5 h-5 text-[#8B6B4A]" />}
            </button>
          </div>
        </div>
        {open && (
          <div className="md:hidden border-t border-border/30 py-3 space-y-1 animate-fadeIn duration-200">
            {links.map((l) => (
              <button
                key={l.p}
                onClick={() => {
                  nav(l.p);
                  setOpen(false);
                }}
                className={`w-full text-left px-4 py-3 text-sm font-bold rounded-xl transition-all ${page === l.p
                    ? "text-[#C8813A] bg-orange-50/80 border-l-4 border-[#C8813A]"
                    : "text-[#8B6B4A] hover:bg-[#F0E8DC]/30"
                  }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

// ── Bottom Nav (Mobile) ────────────────────────────────────────────────────────
function BottomNav({ page, nav }: { page: Page; nav: (p: Page) => void }) {
  const items = [
    { Icon: Home, label: "Beranda", p: "home" as Page },
    { Icon: Search, label: "Cari", p: "pencarian" as Page },
    { Icon: Bot, label: "AI", p: "mood" as Page },
    { Icon: Heart, label: "Favorit", p: "favorit" as Page },
    { Icon: User, label: "Profil", p: "profil" as Page },
  ];
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-[#FAF6F0]/95 backdrop-blur-xl border-t border-border/30 shadow-lg">
      <div className="flex">
        {items.map(({ Icon, label, p }) => (
          <button
            key={p}
            onClick={() => nav(p)}
            className="flex-1 flex flex-col items-center gap-0.5 py-3 transition-transform active:scale-95"
          >
            <Icon className={`w-5 h-5 transition-transform duration-200 ${page === p ? "text-[#C8813A] scale-110" : "text-[#8B6B4A]"}`} />
            <span className={`text-[10px] font-bold ${page === p ? "text-[#C8813A]" : "text-[#8B6B4A]"}`}>
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Footer ─────────────────────────────────────────────────────────────────────
function Footer({ nav }: { nav: (p: Page) => void }) {
  const features = [
    { icon: <Search className="w-5 h-5" />, label: "Temukan Coffee Shop" },
    { icon: <Brain className="w-5 h-5" />, label: "Sesuai Mood Kamu" },
    { icon: <Utensils className="w-5 h-5" />, label: "Menu Sesuai Selera" },
  ];
  return (
    <footer className="bg-[#2C1810] text-[#FAF6F0] py-16 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C8813A]/5 rounded-full blur-3xl" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <button onClick={() => nav("home")} className="flex items-center gap-3 justify-center mb-4 group">
            <div className="w-12 h-12 rounded-2xl bg-[#C8813A] flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300">
              <Coffee className="w-6 h-6 text-white" />
            </div>
            <span className="text-3xl font-extrabold tracking-tight text-white">TemuKopi</span>
          </button>
          <p className="text-[#A89278] text-sm max-w-md mx-auto leading-relaxed font-medium">
            Temukan coffee shop terbaik di sekitarmu, disesuaikan penuh dengan suasana hati dan preferensi rasa unik kamu.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 mb-12">
          {features.map((f) => (
            <div key={f.label} className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-2xl border border-white/5 hover:border-[#C8813A]/20 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#3D2518] flex items-center justify-center text-[#C8813A]">
                {f.icon}
              </div>
              <span className="text-sm font-semibold text-[#D0C0A8]">{f.label}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-[#3D2518] pt-8 text-center flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#6B5040] font-semibold">© 2026 TemuKopi. Dibuat dengan cinta untuk penikmat kopi Indonesia.</p>
          <div className="flex gap-6">
            {["Tentang Kami", "Ketentuan", "Kontak"].map((term) => (
              <button key={term} className="text-xs text-[#6B5040] hover:text-[#C8813A] font-bold transition-colors">
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Home Page ──────────────────────────────────────────────────────────────────
function HomePage({
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
    <div className="animate-fadeIn relative overflow-hidden">
      {/* Background Decorative Blur circles */}
      <div className="absolute top-[20%] left-[-10%] w-[300px] h-[300px] rounded-full bg-[#C8813A]/5 blur-3xl pointer-events-none" />
      <div className="absolute top-[50%] right-[-10%] w-[400px] h-[400px] rounded-full bg-[#2C1810]/5 blur-3xl pointer-events-none" />
      <div className="absolute top-[80%] left-[-15%] w-[350px] h-[350px] rounded-full bg-[#C8813A]/5 blur-3xl pointer-events-none" />

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
        
        {/* SVG Wave Separator */}
        <div className="absolute bottom-0 left-0 right-0 z-10 overflow-hidden leading-none">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] text-background fill-current">
            <path d="M0,0 C150,90 350,120 600,100 C850,80 1050,110 1200,90 L1200,120 L0,120 Z"></path>
          </svg>
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

      {/* Spotlight Cafe */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="text-center mb-10">
          <span className="text-[#C8813A] bg-[#C8813A]/10 px-3 py-1 rounded-full text-xs font-extrabold tracking-wider uppercase inline-flex items-center gap-1.5 mb-2 border border-[#C8813A]/20">
            <Star className="w-3.5 h-3.5 fill-[#C8813A] text-[#C8813A]" /> Sorotan Utama
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#2C1810]">Kedai Pilihan Minggu Ini</h2>
          <p className="text-sm text-[#8B6B4A] mt-2 font-medium">Coffee shop dengan rating terbaik dan kenyamanan maksimal pilihan redaksi</p>
        </div>
        
        <div className="bg-card border border-border/40 rounded-[32px] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 grid md:grid-cols-12 gap-0 relative group">
          {/* Left: Image with Zoom Effect */}
          <div className="md:col-span-7 relative h-72 md:h-auto overflow-hidden">
            <img 
              src={unsplash("1498804103079-a6351b050096", 1000, 600)} 
              alt="Tanamera Coffee" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-card/20" />
            <span className="absolute top-4 left-4 bg-[#C8813A] text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-md">
              Pilihan Editor ★ 4.8
            </span>
          </div>
          
          {/* Right: Info Glassmorphism Card */}
          <div className="md:col-span-5 p-8 md:p-12 flex flex-col justify-between bg-card text-left">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-[#FAF6F0] border border-border/20 px-3 py-1 rounded-lg text-[10px] font-extrabold text-[#8B6B4A]">Tenang</span>
                <span className="bg-[#FAF6F0] border border-border/20 px-3 py-1 rounded-lg text-[10px] font-extrabold text-[#8B6B4A]">WiFi Cepat</span>
                <span className="bg-[#FAF6F0] border border-border/20 px-3 py-1 rounded-lg text-[10px] font-extrabold text-[#8B6B4A]">Outdoor</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-[#2C1810] mb-3 group-hover:text-[#C8813A] transition-colors duration-300">
                Tanamera Coffee
              </h3>
              <p className="text-[#8B6B4A] text-xs font-semibold leading-relaxed mb-6">
                Menyajikan cita rasa kopi Nusantara asli dengan standard roasting internasional. Tempat yang sangat ideal untuk bekerja secara remote (WFC) dengan ambiance tenang, dekorasi kayu hangat, dan kebun semi-outdoor yang asri.
              </p>
              
              <div className="space-y-3 border-t border-border/30 pt-6">
                <div className="flex items-center gap-3 text-xs text-[#8B6B4A] font-semibold">
                  <MapPin className="w-4 h-4 text-[#C8813A] shrink-0" />
                  <span>Kebayoran Baru, Jakarta Selatan</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-[#8B6B4A] font-semibold">
                  <Clock className="w-4 h-4 text-[#C8813A] shrink-0" />
                  <span>07.00 - 22.00 WIB</span>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => {
                setSelectedShopId("tanamera");
                nav("detail");
              }}
              className="mt-8 w-full py-4 bg-[#2C1810] text-[#FAF6F0] hover:bg-[#C8813A] rounded-2xl font-extrabold text-sm transition-spring shadow-lg flex items-center justify-center gap-2 cursor-pointer group"
            >
              Lihat Detail Menu & Ulasan 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
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
          {shops.slice(0, 4).map((shop) => (
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

      {/* Stats Counter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-[#FAF6F0]/80 border border-border/30 rounded-[32px] p-10 md:p-12 shadow-lg backdrop-blur-md relative overflow-hidden">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#C8813A]/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#2C1810]/5 rounded-full blur-3xl" />
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 relative z-10 text-center">
            <div className="flex flex-col items-center p-4 group hover:scale-105 transition-spring">
              <div className="w-12 h-12 rounded-2xl bg-[#C8813A]/10 flex items-center justify-center text-[#C8813A] mb-4 group-hover:bg-[#C8813A] group-hover:text-white transition-colors duration-300">
                <Coffee className="w-6 h-6" />
              </div>
              <span className="text-3xl md:text-4xl font-black text-[#2C1810] tracking-tight">150+</span>
              <span className="text-xs md:text-sm text-[#8B6B4A] font-bold mt-2">Kedai Terdaftar</span>
            </div>
            
            <div className="flex flex-col items-center p-4 group hover:scale-105 transition-spring">
              <div className="w-12 h-12 rounded-2xl bg-[#C8813A]/10 flex items-center justify-center text-[#C8813A] mb-4 group-hover:bg-[#C8813A] group-hover:text-white transition-colors duration-300">
                <Leaf className="w-6 h-6" />
              </div>
              <span className="text-3xl md:text-4xl font-black text-[#2C1810] tracking-tight">45+</span>
              <span className="text-xs md:text-sm text-[#8B6B4A] font-bold mt-2">Biji Single Origin</span>
            </div>
            
            <div className="flex flex-col items-center p-4 group hover:scale-105 transition-spring">
              <div className="w-12 h-12 rounded-2xl bg-[#C8813A]/10 flex items-center justify-center text-[#C8813A] mb-4 group-hover:bg-[#C8813A] group-hover:text-white transition-colors duration-300">
                <Tag className="w-6 h-6" />
              </div>
              <span className="text-3xl md:text-4xl font-black text-[#2C1810] tracking-tight">12K+</span>
              <span className="text-xs md:text-sm text-[#8B6B4A] font-bold mt-2">Promo Diklaim</span>
            </div>
            
            <div className="flex flex-col items-center p-4 group hover:scale-105 transition-spring">
              <div className="w-12 h-12 rounded-2xl bg-[#C8813A]/10 flex items-center justify-center text-[#C8813A] mb-4 group-hover:bg-[#C8813A] group-hover:text-white transition-colors duration-300">
                <Globe className="w-6 h-6" />
              </div>
              <span className="text-3xl md:text-4xl font-black text-[#2C1810] tracking-tight">12</span>
              <span className="text-xs md:text-sm text-[#8B6B4A] font-bold mt-2">Kota Terjangkau</span>
            </div>
          </div>
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

      {/* Journal & Coffee Tips Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 animate-fadeIn">
        <div className="text-center mb-10">
          <span className="text-[#C8813A] bg-[#C8813A]/10 px-3 py-1 rounded-full text-xs font-extrabold tracking-wider uppercase inline-flex items-center gap-1.5 mb-2 border border-[#C8813A]/20">
            <BookOpen className="w-3.5 h-3.5" /> Edukasi & Gaya Hidup
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#2C1810]">Jurnal & Tips Kopi</h2>
          <p className="text-sm text-[#8B6B4A] mt-2 font-medium">Pelajari racikan, panduan berkunjung, dan budaya kopi terbaik</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {/* Card 1 */}
          <div className="bg-card border border-border/40 rounded-[32px] overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-spring group">
            <div className="h-48 overflow-hidden relative">
              <img 
                src={unsplash("1501339847302-ac426a4a7cbb", 600, 400)} 
                alt="Work From Cafe" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white text-[10px] font-extrabold px-3 py-1 rounded-full">
                Tips WFC
              </span>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-extrabold text-[#2C1810] mb-2 leading-snug group-hover:text-[#C8813A] transition-colors duration-300">
                5 Tips Menemukan Coffee Shop yang Nyaman untuk Work From Cafe
              </h3>
              <p className="text-xs text-[#8B6B4A] font-semibold leading-relaxed mb-4">
                Tidak semua kedai kopi cocok untuk bekerja. Pelajari cara memilih kedai dengan kestabilan WiFi, stopkontak melimpah, dan pencahayaan yang pas.
              </p>
              <div className="text-[10px] font-bold text-[#C8813A] uppercase tracking-wider">
                Baca Selengkapnya
              </div>
            </div>
          </div>
          
          {/* Card 2 */}
          <div className="bg-card border border-border/40 rounded-[32px] overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-spring group">
            <div className="h-48 overflow-hidden relative">
              <img 
                src={unsplash("1447933601403-0c6688de566e", 600, 400)} 
                alt="Arabica vs Robusta" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white text-[10px] font-extrabold px-3 py-1 rounded-full">
                Panduan Biji
              </span>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-extrabold text-[#2C1810] mb-2 leading-snug group-hover:text-[#C8813A] transition-colors duration-300">
                Mengenal Perbedaan Arabika & Robusta untuk Pemula
              </h3>
              <p className="text-xs text-[#8B6B4A] font-semibold leading-relaxed mb-4">
                Sebelum memesan menu di kedai kopi favoritmu, ketahui perbedaan mendasar dari rasa asam Arabika dibandingkan rasa pekat pahit khas Robusta.
              </p>
              <div className="text-[10px] font-bold text-[#C8813A] uppercase tracking-wider">
                Baca Selengkapnya
              </div>
            </div>
          </div>
          
          {/* Card 3 */}
          <div className="bg-card border border-border/40 rounded-[32px] overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-spring group">
            <div className="h-48 overflow-hidden relative">
              <img 
                src={unsplash("1514432324607-a09d9b4aefdd", 600, 400)} 
                alt="Taste Notes" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white text-[10px] font-extrabold px-3 py-1 rounded-full">
                Sains Kopi
              </span>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-extrabold text-[#2C1810] mb-2 leading-snug group-hover:text-[#C8813A] transition-colors duration-300">
                Cara Barista Profesional Membaca 'Taste Notes' Seduhan Kopi
              </h3>
              <p className="text-xs text-[#8B6B4A] font-semibold leading-relaxed mb-4">
                Bisa merasakan hint buah beri, cokelat, hingga karamel di dalam kopi hitam polos? Temukan rahasia melatih lidahmu agar lebih sensitif.
              </p>
              <div className="text-[10px] font-bold text-[#C8813A] uppercase tracking-wider">
                Baca Selengkapnya
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 animate-fadeIn">
        <div className="text-center mb-10">
          <span className="text-[#C8813A] bg-[#C8813A]/10 px-3 py-1 rounded-full text-xs font-extrabold tracking-wider uppercase inline-flex items-center gap-1.5 mb-2 border border-[#C8813A]/20">
            <MessageSquare className="w-3.5 h-3.5" /> Ulasan Jujur
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#2C1810]">Kata Mereka Tentang TemuKopi</h2>
          <p className="text-sm text-[#8B6B4A] mt-2 font-medium">Cerita nyata dari komunitas penikmat kopi yang menemukan kedai favorit mereka</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {/* Review 1 */}
          <div className="bg-[#FAF6F0]/50 border border-border/30 rounded-[32px] p-8 shadow-sm backdrop-blur-sm relative group hover:bg-[#FAF6F0] hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-4 mb-5">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces" 
                alt="Nadia Kirana" 
                className="w-12 h-12 rounded-2xl object-cover border border-[#C8813A]/20 shadow-sm"
              />
              <div>
                <h4 className="text-sm font-extrabold text-[#2C1810]">Nadia Kirana</h4>
                <p className="text-[10px] text-[#C8813A] font-bold">Freelance Designer</p>
              </div>
            </div>
            <div className="flex gap-0.5 text-amber-500 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current text-amber-500" />
              ))}
            </div>
            <p className="text-xs text-[#8B6B4A] font-semibold leading-relaxed italic">
              "Fitur Mood Finder AI-nya juara banget! Iseng pilih mood 'Butuh Inspirasi', langsung direkomendasiin Tanamera Coffee dan rasanya bener-bener cocok sama suasana hati saya hari itu. Definisinya andalan baru pas mau WFC!"
            </p>
          </div>
          
          {/* Review 2 */}
          <div className="bg-[#FAF6F0]/50 border border-border/30 rounded-[32px] p-8 shadow-sm backdrop-blur-sm relative group hover:bg-[#FAF6F0] hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-4 mb-5">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces" 
                alt="Aditya Pratama" 
                className="w-12 h-12 rounded-2xl object-cover border border-[#C8813A]/20 shadow-sm"
              />
              <div>
                <h4 className="text-sm font-extrabold text-[#2C1810]">Aditya Pratama</h4>
                <p className="text-[10px] text-[#C8813A] font-bold">Software Engineer</p>
              </div>
            </div>
            <div className="flex gap-0.5 text-amber-500 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current text-amber-500" />
              ))}
            </div>
            <p className="text-xs text-[#8B6B4A] font-semibold leading-relaxed italic">
              "Suka banget sama info fasilitasnya yang super detail. Di sini tertulis lengkap mana yang ada colokan, WiFi cepat, sampai area indoor ber-AC. Sangat mempermudah saya nyari tempat meeting santai bareng klien."
            </p>
          </div>
          
          {/* Review 3 */}
          <div className="bg-[#FAF6F0]/50 border border-border/30 rounded-[32px] p-8 shadow-sm backdrop-blur-sm relative group hover:bg-[#FAF6F0] hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-4 mb-5">
              <img 
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces" 
                alt="Siti Rahma" 
                className="w-12 h-12 rounded-2xl object-cover border border-[#C8813A]/20 shadow-sm"
              />
              <div>
                <h4 className="text-sm font-extrabold text-[#2C1810]">Siti Rahma</h4>
                <p className="text-[10px] text-[#C8813A] font-bold">Kopi Enthusiast</p>
              </div>
            </div>
            <div className="flex gap-0.5 text-amber-500 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current text-amber-500" />
              ))}
            </div>
            <p className="text-xs text-[#8B6B4A] font-semibold leading-relaxed italic">
              "Klaim kupon promonya gampang banget dan beneran bisa dipakai pas bayar di kasir. Websitenya juga cepet dibuka, visualnya rapi dan sangat memanjakan mata penikmat estestika kopi. Sukses terus TemuKopi!"
            </p>
          </div>
        </div>
      </section>

      <Footer nav={nav} />
    </div>
  );
}

// ── Mood Finder Page ───────────────────────────────────────────────────────────
interface ChatMessage {
  sender: "ai" | "user";
  text: string;
  shops?: Shop[];
  coffee?: typeof COFFEES[0];
}

function MoodFinderPage({
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
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: "ai",
      text: "Hai Fakhrizz! Aku TemuKopi AI ☕ Ceritakan suasana hatimu atau kebutuhanmu saat ini (misal: pengen nugas santai, cari tempat estetik outdoor, capek nugas butuh kafein), biar aku carikan kedai & racikan kopi terbaik buat kamu!"
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const suggestions = [
    "Butuh fokus buat nugas serius 📚",
    "Capek bgt butuh tempat healing tenang 🌿",
    "Mau nongkrong outdoor estetik bareng temen 👥",
    "Kencan cozy & romantis berdua 🌹",
  ];

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Add user message
    const userMsg: ChatMessage = { sender: "user", text: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // AI thinking timeout simulation
    setTimeout(() => {
      setIsTyping(false);
      const query = textToSend.toLowerCase();
      let matchedShops: Shop[] = [];
      let matchedCoffee: typeof COFFEES[0] | undefined;
      let replyText = "";

      if (query.includes("nugas") || query.includes("fokus") || query.includes("kerja") || query.includes("tugas")) {
        matchedShops = shops.filter(s => s.facilities.includes("Meeting Room") || s.tags.includes("Work Friendly"));
        matchedCoffee = COFFEES.find(c => c.id === "espresso");
        replyText = "Wah, kamu lagi produktif banget ya! Kamu butuh asupan kafein mantap biar melek dan meja kerja yang memadai dengan colokan listrik melimpah. Aku merekomendasikan tempat-tempat workspace terfavorit ini untuk melancarkan tugasmu!";
      } else if (query.includes("healing") || query.includes("sepi") || query.includes("tenang") || query.includes("capek") || query.includes("santai")) {
        matchedShops = shops.filter(s => s.tags.includes("Tenang"));
        matchedCoffee = COFFEES.find(c => c.id === "vanilla-latte");
        replyText = "Tenang sejenak... Kamu butuh me-time untuk melepas penat diiringi kopi manis yang lembut. Berikut adalah kedai dengan nuansa paling sunyi dan teduh yang cocok buat me-recharge energimu.";
      } else if (query.includes("outdoor") || query.includes("estetik") || query.includes("foto") || query.includes("cantik")) {
        matchedShops = shops.filter(s => s.tags.includes("Estetik") || s.facilities.includes("Outdoor"));
        matchedCoffee = COFFEES.find(c => c.id === "iced-latte");
        replyText = "Siap eksis! Kamu butuh pemandangan outdoor yang asri dan sudut-sudut estetik instagramable buat foto-foto. Yuk cek rekomendasi kedai kopi paling 'scenic' dan segar di bawah ini!";
      } else if (query.includes("romantis") || query.includes("date") || query.includes("kencan") || query.includes("cozy")) {
        matchedShops = shops.filter(s => s.tags.includes("Cozy"));
        matchedCoffee = COFFEES.find(c => c.id === "caramel-macchiato");
        replyText = "Uuuu, kencan manis ya! Nikmati atmosfer hangat yang intim nan romantis bersama si dia ditemani manis lembutnya karamel susu. Coba intip kedai estetik romantis pilihan AI berikut.";
      } else {
        // Fallback
        matchedShops = [shops[0], shops[1]];
        matchedCoffee = COFFEES[2];
        replyText = "Menarik banget suasana hatimu! Biar harimu makin berwarna, aku saranin nyoba kopi susu segar terpopuler kami. Ini daftar tempat terbaik yang pas buat segala jenis mood kamu!";
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: replyText,
          shops: matchedShops.length > 0 ? matchedShops : [shops[0]],
          coffee: matchedCoffee
        }
      ]);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeIn">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Chat Container */}
        <div className="lg:col-span-7 flex flex-col h-[650px] bg-card border border-border/80 rounded-3xl overflow-hidden shadow-xl">
          {/* Header */}
          <div className="p-5 border-b border-border/40 bg-[#FAF6F0]/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#2C1810] flex items-center justify-center shadow-md">
                <Bot className="w-6 h-6 text-[#F0C896]" />
              </div>
              <div>
                <h2 className="font-extrabold text-[#2C1810] text-base">Mood Finder AI</h2>
                <p className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Sistem AI Aktif
                </p>
              </div>
            </div>
            <button
              onClick={() => setMessages([
                {
                  sender: "ai",
                  text: "Hai Fakhrizz! Aku TemuKopi AI ☕ Ceritakan suasana hatimu atau kebutuhanmu saat ini, biar aku racikkan kedai terkece!"
                }
              ])}
              className="text-xs font-extrabold text-[#C8813A] hover:underline"
            >
              Hapus Obrolan
            </button>
          </div>

          {/* Messages list */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-muted/10">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex gap-3 ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                {m.sender === "ai" && (
                  <div className="w-9 h-9 rounded-xl bg-[#2C1810] flex items-center justify-center shrink-0 shadow-md">
                    <Coffee className="w-4 h-4 text-[#F0C896]" />
                  </div>
                )}
                <div className="max-w-[85%] flex flex-col gap-3">
                  <div
                    className={`px-5 py-4 rounded-3xl text-sm leading-relaxed font-semibold shadow-sm ${m.sender === "user"
                        ? "bg-[#2C1810] text-white rounded-tr-none"
                        : "bg-[#F0E8DC] text-[#2C1810] rounded-tl-none border border-border/20"
                      }`}
                  >
                    {m.text}
                  </div>

                  {/* Render matched items inside bubble context */}
                  {m.sender === "ai" && (m.coffee || m.shops) && (
                    <div className="space-y-3 mt-1 w-full animate-fadeIn">
                      {/* Coffee match */}
                      {m.coffee && (
                        <div className="bg-white border border-[#C8813A]/20 rounded-2xl p-4 flex gap-4 shadow-sm items-center">
                          <img
                            src={m.coffee.img}
                            alt={m.coffee.name}
                            className="w-14 h-14 object-cover rounded-xl shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <span className="text-[9px] bg-orange-100 text-[#C8813A] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                              Racikan Rekomendasi
                            </span>
                            <p className="font-bold text-sm text-[#2C1810] mt-1">{m.coffee.name}</p>
                            <p className="text-xs text-[#8B6B4A] italic">{m.coffee.rasa}</p>
                          </div>
                        </div>
                      )}

                      {/* Shops matches list */}
                      {m.shops && m.shops.map((shop) => (
                        <div key={shop.id} className="bg-white border border-border/50 rounded-2xl p-3.5 flex gap-4 shadow-sm hover:border-[#C8813A] transition-all">
                          <img
                            src={shop.img}
                            alt={shop.name}
                            className="w-16 h-16 object-cover rounded-xl shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <p className="font-bold text-sm text-[#2C1810] truncate">{shop.name}</p>
                              <button onClick={() => toggleFav(shop.id)} className="shrink-0">
                                <Heart className={`w-4 h-4 ${favs.has(shop.id) ? "text-red-500 fill-red-500" : "text-[#8B6B4A]"}`} />
                              </button>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-[#8B6B4A] mt-0.5 font-medium">
                              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                              <span>{shop.rating}</span>
                              <span>·</span>
                              <span>{shop.distance}</span>
                            </div>
                            <button
                              onClick={() => {
                                setSelectedShopId(shop.id);
                                nav("detail");
                              }}
                              className="mt-2 text-xs font-bold text-[#C8813A] hover:underline flex items-center gap-0.5"
                            >
                              Detail Kedai <ChevronRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {m.sender === "user" && (
                  <div className="w-9 h-9 rounded-xl bg-[#C8813A] flex items-center justify-center shrink-0 shadow-md">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 justify-start items-center">
                <div className="w-9 h-9 rounded-xl bg-[#2C1810] flex items-center justify-center shrink-0 shadow-md">
                  <Coffee className="w-4 h-4 text-[#F0C896]" />
                </div>
                <div className="bg-[#F0E8DC] rounded-3xl rounded-tl-none px-5 py-4 border border-border/20 flex gap-1.5 items-center shadow-sm">
                  <span className="w-2.5 h-2.5 bg-[#8B6B4A] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2.5 h-2.5 bg-[#8B6B4A] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2.5 h-2.5 bg-[#8B6B4A] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
          </div>

          {/* Quick chips container */}
          <div className="px-5 py-3 border-t border-border/20 bg-muted/5 flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => handleSend(s.replace(/[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD00-\uDFFF]/g, ""))}
                className="shrink-0 text-xs font-bold px-3.5 py-2 rounded-full bg-white border border-border/50 text-[#8B6B4A] hover:border-[#C8813A] hover:text-[#C8813A] transition-all whitespace-nowrap shadow-sm hover:shadow"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Chat input box */}
          <div className="p-4 border-t border-border/40 bg-white flex gap-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
              placeholder="Ceritakan moodmu di sini (misal: lagi stres butuh kopi manis)..."
              className="flex-1 px-5 py-3.5 rounded-2xl bg-[#F0E8DC]/50 border border-border/40 text-sm font-semibold text-[#2C1810] placeholder-[#8B6B4A]/60 outline-none focus:border-[#C8813A] focus:bg-white transition-all shadow-inner"
            />
            <button
              onClick={() => handleSend(input)}
              className="w-14 h-14 rounded-2xl bg-[#2C1810] flex items-center justify-center hover:bg-[#C8813A] active:scale-95 transition-all shadow-md shrink-0 cursor-pointer text-white"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right: AI Intelligence Panel Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-card border border-border/80 rounded-3xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#C8813A]/5 rounded-full blur-xl" />
            <h3 className="font-extrabold text-[#2C1810] text-lg mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5 text-[#C8813A]" /> Teknologi Mood Finder AI
            </h3>
            <p className="text-sm text-[#8B6B4A] leading-relaxed font-semibold mb-4">
              Mood Finder AI menganalisis kosakata emosional, tingkat kepenatan, serta tujuan kunjungan Anda untuk mencocokkannya dengan atmosfer fisik dan racikan kopi dari database kedai kami.
            </p>
            <div className="space-y-3.5">
              {[
                { title: "📚 Fokus & Produktivitas", desc: "Mendongkrak konsentrasi penuh dengan asupan espresso berkafein tinggi serta workspace ramah colokan." },
                { title: "🌿 Anti-Stres & Healing", desc: "Memulihkan ketenangan jiwa dengan aneka teh herbal, kopi susu lembut, serta halaman kedai asri berhembus angin." },
                { title: "🌹 Kencan Intim & Cozy", desc: "Merajut kenyamanan kencan dengan musik latar lembut, minuman karamel creamy manis, dan penerangan syahdu." },
              ].map((item, i) => (
                <div key={i} className="p-3 bg-[#FAF6F0] rounded-2xl border border-border/20">
                  <p className="text-xs font-extrabold text-[#2C1810] mb-1">{item.title}</p>
                  <p className="text-[11px] text-[#8B6B4A] font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Rekomendasi Page (Taste Profile Finder) ────────────────────────────────────
function RekomendasiPage({ nav }: { nav: (p: Page) => void }) {
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeIn">
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
    </div>
  );
}

// ── Pencarian Page ─────────────────────────────────────────────────────────────
function PencarianPage({
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeIn">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Filter Sidebar */}
        <div className="lg:col-span-4 bg-card border border-border/80 rounded-3xl p-6 shadow-xl sticky top-24">
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

          <p className="text-xs text-[#8B6B4A] font-extrabold bg-[#F0E8DC]/40 px-4 py-2.5 rounded-xl border border-border/30 inline-block shadow-sm">
            🎯 {filteredShops.length} coffee shop ditemukan
          </p>

          {/* Cards List layout */}
          {paginatedShops.length === 0 ? (
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
  );
}

// ── Detail Page ────────────────────────────────────────────────────────────────
function DetailPage({
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

// ── Menu Page ──────────────────────────────────────────────────────────────────
function MenuPage({
  nav,
  shopId,
  shops,
}: {
  nav: (p: Page) => void;
  shopId: string;
  shops: Shop[];
}) {
  const [activeCat, setActiveCat] = useState("Semua Menu");
  const shop = shops.find((s) => s.id === shopId) || shops[1];
  const categories = ["Semua Menu", "Signature", "Coffee", "Non Coffee", "Snack"];

  const menuItems = [
    { name: "Kopi Aren Premium", price: "Rp 28.000", cat: "Signature", img: unsplash("1503240778100-fd245e17a273", 200, 200) },
    { name: "Caramel Macchiato Sweet", price: "Rp 35.000", cat: "Coffee", img: unsplash("1563311977-d285756282dc", 200, 200) },
    { name: "Vanilla Latte Soft", price: "Rp 32.000", cat: "Coffee", img: unsplash("1742549626436-bf3c11dab212", 200, 200) },
    { name: "Matcha Latte Fresh", price: "Rp 32.000", cat: "Non Coffee", img: unsplash("1578314675249-a6910f80cc4e", 200, 200) },
    { name: "Croissant Gold Chocolate", price: "Rp 18.000", cat: "Snack", img: unsplash("1629610207316-1f58e0ea19e4", 200, 200) },
    { name: "Brownies Almond Butter", price: "Rp 22.000", cat: "Snack", img: unsplash("1762922425478-7049c54bfbec", 200, 200) },
  ];

  const filtered = activeCat === "Semua Menu" ? menuItems : menuItems.filter((m) => m.cat === activeCat);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeIn">
      <button
        onClick={() => nav("detail")}
        className="flex items-center gap-2 text-sm font-bold text-[#8B6B4A] mb-6 hover:text-[#2C1810] transition-colors bg-white px-4 py-2 rounded-xl shadow-sm border border-border/30 w-fit"
      >
        <ChevronLeft className="w-4 h-4" /> Kembali ke Detail
      </button>
      <h1 className="text-3xl font-extrabold text-[#2C1810] mb-8 tracking-tight">Daftar Menu {shop.name}</h1>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Category List Sidebar */}
        <div className="md:col-span-3 bg-card border border-border/80 rounded-3xl p-4 shadow-md space-y-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-extrabold tracking-wide transition-all ${activeCat === cat
                  ? "bg-[#2C1810] text-[#FAF6F0] shadow-md scale-105"
                  : "text-[#8B6B4A] hover:bg-[#FAF6F0]"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Cards Grid */}
        <div className="md:col-span-9">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <div key={item.name} className="bg-card border border-border/60 rounded-3xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 shadow-sm flex flex-col justify-between group">
                <div className="overflow-hidden">
                  <img src={item.img} alt={item.name} className="w-full h-36 object-cover bg-[#F0E8DC] group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] font-extrabold bg-[#F0E8DC] text-[#8B6B4A] px-2 py-0.5 rounded-full inline-block mb-1.5 shadow-sm uppercase tracking-wide">
                      {item.cat}
                    </span>
                    <p className="font-extrabold text-xs text-[#2C1810] leading-snug line-clamp-1">{item.name}</p>
                  </div>
                  <p className="text-xs font-black text-[#C8813A] mt-2.5">{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Promo Page ─────────────────────────────────────────────────────────────────
function PromoPage({
  nav: _nav,
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeIn">
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

// ── UMKM Page ──────────────────────────────────────────────────────────────────
function UMKMPage({
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeIn">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-extrabold text-[#2C1810] tracking-tight">Kemitraan UMKM TemuKopi</h1>
        <p className="text-sm text-[#8B6B4A] mt-2 font-medium max-w-sm mx-auto">Daftarkan coffee shop Anda agar terdaftar dan terintegrasi langsung di peta pencarian cerdas kami.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Registration */}
        <form onSubmit={handleRegister} className="lg:col-span-6 bg-card border border-border/80 rounded-3xl p-6 shadow-xl space-y-4">
          <h2 className="text-lg font-extrabold text-[#2C1810] border-b border-border/40 pb-3 flex items-center gap-2">
            <PlusIcon className="w-5 h-5 text-[#C8813A]" /> Formulir Pendaftaran Kedai
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

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 12h14M12 5v14" />
    </svg>
  );
}

// ── Favorit Page ───────────────────────────────────────────────────────────────
function FavoritPage({
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
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 animate-fadeIn">
      <h1 className="text-3xl font-extrabold text-[#2C1810] mb-8 tracking-tight">Kedai Disimpan</h1>

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
    </div>
  );
}

// ── Profil Page ────────────────────────────────────────────────────────────────
function ProfilPage({
  nav,
  shops,
  claimedPromos,
}: {
  nav: (p: Page) => void;
  shops: Shop[];
  claimedPromos: Set<number>;
}) {
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeIn">
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Profile Card and navigation menu */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-card border border-border/80 rounded-3xl p-6 text-center shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-[#C8813A]/5 rounded-full blur-xl" />
            <div className="relative w-24 h-24 mx-auto mb-4">
              <img
                src={PROFILE_IMAGE}
                alt="Foto profil Fakhrizz"
                className="w-24 h-24 rounded-full object-cover bg-[#F0E8DC] border-2 border-white shadow-md"
              />
              <button className="absolute right-0 bottom-1 w-8 h-8 rounded-full bg-white border border-border/30 shadow flex items-center justify-center cursor-pointer text-[#C8813A]">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <h1 className="text-xl font-extrabold text-[#2C1810] tracking-tight">Fakhrizz</h1>
            <p className="text-xs text-[#8B6B4A] font-semibold mt-1 mb-5">fakhrizz.umkm@gmail.com</p>
            <div className="flex gap-2 justify-center">
              <span className="text-[10px] font-extrabold bg-[#2C1810] text-[#FAF6F0] px-3.5 py-1.5 rounded-full shadow-sm">
                Penikmat Kopi Gold
              </span>
            </div>

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
              <button className="w-full flex items-center gap-3.5 rounded-2xl px-4 py-3 text-xs font-bold text-red-500 hover:bg-red-50">
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
        </div>
      </div>
    </div>
  );
}

// ── Root App Component ────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [shops, setShops] = useState<Shop[]>(INITIAL_SHOPS);
  const [favs, setFavs] = useState<Set<string>>(new Set(["tanamera"]));
  const [claimedPromos, setClaimedPromos] = useState<Set<number>>(new Set());
  const [globalSearchQuery, setGlobalSearchQuery] = useState("");
  const [showPreloader, setShowPreloader] = useState(true);
  const [selectedShopId, setSelectedShopId] = useState<string>("tanamera");

  const [isPlaying, setIsPlaying] = useState(() => {
    const saved = localStorage.getItem("temukopi_music");
    return saved === "true";
  });
  const [audio] = useState(() => {
    const a = new Audio("/assets/sound/backsoud-temukopi.mp3");
    a.loop = true;
    a.volume = 0.3;
    return a;
  });

  useEffect(() => {
    if (isPlaying) {
      audio.play().catch((err) => {
        console.log("Autoplay blocked by browser. User interaction required:", err);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying, audio]);

  useEffect(() => {
    const handleFirstInteraction = () => {
      if (isPlaying) {
        audio.play().catch(() => {});
      }
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
    };
    document.addEventListener("click", handleFirstInteraction);
    document.addEventListener("touchstart", handleFirstInteraction);
    return () => {
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, [isPlaying, audio]);

  useEffect(() => {
    return () => {
      audio.pause();
    };
  }, [audio]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPreloader(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const nav = (p: Page) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleFav = (id: string) => {
    setFavs((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between selection:bg-[#C8813A] selection:text-white">
      {showPreloader && (
        <div className="fixed inset-0 bg-[#FAF6F0] z-[9999] flex flex-col items-center justify-center animate-preloader-fadeOut">
          <div className="flex flex-col items-center gap-4 animate-logo-scale">
            <div className="w-20 h-20 rounded-3xl bg-[#2C1810] flex items-center justify-center shadow-2xl relative overflow-hidden">
              <Coffee className="w-10 h-10 text-[#FAF6F0] animate-bounce relative z-10" />
              <div className="absolute bottom-0 inset-x-0 bg-[#C8813A] rounded-b-2xl animate-cup-fill" style={{ height: "0%" }} />
            </div>
            <h1 className="font-extrabold text-2xl tracking-tight text-[#2C1810] flex items-center gap-1.5 mt-2">
              TemuKopi
            </h1>
            <p className="text-[10px] text-[#8B6B4A] font-extrabold tracking-[0.2em] uppercase animate-pulse">Menyeduh Suasana...</p>
          </div>
        </div>
      )}
      <div>
        <Navbar page={page} nav={nav} favCount={favs.size} />
        <main className="pb-20 md:pb-6 animate-page-transition" key={page}>
          {page === "home" && (
            <HomePage
              nav={nav}
              favs={favs}
              toggleFav={toggleFav}
              shops={shops}
              setGlobalSearchQuery={setGlobalSearchQuery}
              setSelectedShopId={setSelectedShopId}
            />
          )}
          {page === "mood" && (
            <MoodFinderPage
              nav={nav}
              favs={favs}
              toggleFav={toggleFav}
              shops={shops}
              setSelectedShopId={setSelectedShopId}
            />
          )}
          {page === "rekomendasi" && <RekomendasiPage nav={nav} />}
          {page === "pencarian" && (
            <PencarianPage
              nav={nav}
              favs={favs}
              toggleFav={toggleFav}
              shops={shops}
              searchQuery={globalSearchQuery}
              setSearchQuery={setGlobalSearchQuery}
              setSelectedShopId={setSelectedShopId}
            />
          )}
          {page === "detail" && (
            <DetailPage
              nav={nav}
              favs={favs}
              toggleFav={toggleFav}
              shopId={selectedShopId}
              shops={shops}
            />
          )}
          {page === "menu" && (
            <MenuPage
              nav={nav}
              shopId={selectedShopId}
              shops={shops}
            />
          )}
          {page === "promo" && (
            <PromoPage
              nav={nav}
              claimedPromos={claimedPromos}
              setClaimedPromos={setClaimedPromos}
            />
          )}
          {page === "umkm" && (
            <UMKMPage
              shops={shops}
              setShops={setShops}
              nav={nav}
            />
          )}
          {page === "favorit" && (
            <FavoritPage
              nav={nav}
              favs={favs}
              toggleFav={toggleFav}
              shops={shops}
              setSelectedShopId={setSelectedShopId}
            />
          )}
          {page === "profil" && (
            <ProfilPage
              nav={nav}
              shops={shops}
              claimedPromos={claimedPromos}
            />
          )}
        </main>
      </div>
      {/* Floating Audio Player Button */}
      <button
        onClick={() => {
          const nextState = !isPlaying;
          setIsPlaying(nextState);
          localStorage.setItem("temukopi_music", String(nextState));
        }}
        className="fixed bottom-24 right-6 md:bottom-6 md:right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#2C1810] text-[#FAF6F0] hover:bg-[#C8813A] transition-all duration-300 shadow-xl border border-white/10 group active:scale-95 cursor-pointer backdrop-blur-md"
        title={isPlaying ? "Matikan Musik" : "Putar Musik"}
      >
        {isPlaying ? (
          <div className="flex items-center gap-1.5">
            <div className="flex items-end gap-0.5 h-3 w-3 mr-0.5">
              <span className="w-0.5 bg-[#FAF6F0] rounded-full animate-soundwave-1 h-2.5" />
              <span className="w-0.5 bg-[#FAF6F0] rounded-full animate-soundwave-2 h-3" />
              <span className="w-0.5 bg-[#FAF6F0] rounded-full animate-soundwave-3 h-2" />
            </div>
            <Volume2 className="w-4 h-4" />
          </div>
        ) : (
          <div className="flex items-center gap-1.5">
            <VolumeX className="w-4 h-4 text-[#FAF6F0]/60" />
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#FAF6F0]/60 group-hover:text-white transition-colors">Muted</span>
          </div>
        )}
      </button>
      <BottomNav page={page} nav={nav} />
    </div>
  );
}
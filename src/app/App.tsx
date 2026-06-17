import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  Coffee, Search, Heart, Star, MapPin, Clock, Wifi, Zap, Car,
  ChevronRight, ChevronLeft, ChevronDown, Send, Brain, Sparkles,
  Home, Navigation, ArrowRight, Share2, Bookmark, Filter, X, Check,
  MessageSquare, TrendingUp, Camera, Tag, Bot,
  User, ShoppingBag, Map, Leaf, Utensils, Globe, Volume2, VolumeX,
} from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { useApp } from "@/app/context/AppContext";
import { LoginPage } from "@/app/pages/LoginPage";
import { AdminPage } from "@/app/components/AdminPage";
import { toast } from "sonner";

import {
  Page,
  Shop,
  unsplash,
  PROFILE_IMAGE,
  INITIAL_SHOPS,
  COFFEES,
  CATEGORIES,
} from "@/app/data/coffeeData";

// Import favorit page icons
import favIcon from "@/imports/fav.png";
import clockIcon from "@/imports/clock.png";

import { StarRow } from "@/app/components/ui/StarRow";
import { Pill } from "@/app/components/ui/Pill";
import { ShopCard } from "@/app/components/ShopCard";
import { Navbar } from "@/app/components/Navbar";
import { BottomNav } from "@/app/components/BottomNav";
import { Footer } from "@/app/components/Footer";

import { HomePage } from "@/app/pages/HomePage";

import { MoodFinderPage } from "@/app/pages/MoodFinderPage";

import { RekomendasiPage } from "@/app/pages/RekomendasiPage";

import { PencarianPage } from "@/app/pages/PencarianPage";

import { DetailPage } from "@/app/pages/DetailPage";

import { MenuPage } from "@/app/pages/MenuPage";

import { PromoPage } from "@/app/pages/PromoPage";

import { UMKMPage } from "@/app/pages/UMKMPage";

import { FavoritPage } from "@/app/pages/FavoritPage";

import { ProfilPage } from "@/app/pages/ProfilPage";

// ── Root App Component ────────────────────────────────────────────────────────
export default function App() {
  const { user, setUser } = useApp();
  const [page, setPage] = useState<Page>("home");
  const [shops, setShops] = useState<Shop[]>(INITIAL_SHOPS);

  const toggleShopActive = (id: string) => {
    setShops((prev) =>
      prev.map((s) => (s.id === id ? { ...s, active: s.active === false ? true : false } : s))
    );
  };

  const approveShop = (approved: any) => {
    const newShop: Shop = {
      id: approved.id,
      name: approved.name,
      rating: approved.rating,
      reviews: approved.reviews,
      distance: "0.5 km",
      distanceNum: 0.5,
      tags: ["Cozy", "WiFi"],
      price: "Rp 15.000 – 40.000",
      priceMin: 15000,
      img: approved.img || unsplash("1501339847302-ac426a4a7cbb"),
      reason: "Baru bergabung di TemuKopi!",
      facilities: ["WiFi", "Parkir"],
      city: approved.city,
      active: true,
    };
    setShops((prev) => [newShop, ...prev]);
  };
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

  const handleLogin = (loggedInUser: any) => {
    setUser(loggedInUser);
    toast.success(`Selamat datang kembali, ${loggedInUser.name}!`);
    nav("profil");
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] flex flex-col justify-between selection:bg-[#C8813A] selection:text-white">
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
      <div className="flex-1 flex flex-col">
        <Navbar page={page} nav={nav} favCount={favs.size} />
        <main className={`${["home", "rekomendasi", "favorit", "profil", "promo", "umkm"].includes(page) ? "flex-1 flex flex-col" : "pb-20 md:pb-6"} animate-page-transition`} key={page}>
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
          {page === "login" && (
            <LoginPage nav={nav} onLogin={handleLogin} />
          )}
          {page === "admin" && (
            user?.role === "admin" ? (
              <AdminPage
                adminName={user.name}
                shops={shops}
                onToggleShopActive={toggleShopActive}
                onApproveShop={approveShop}
                onLogout={() => {
                  setUser(null);
                  toast.success("Berhasil keluar akun.");
                  nav("home");
                }}
                nav={nav}
              />
            ) : (
              <LoginPage nav={nav} onLogin={handleLogin} />
            )
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
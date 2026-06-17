import { useState } from "react";
import { Coffee, Heart, User, X, ChevronDown } from "lucide-react";
import { Page } from "@/app/data/coffeeData";
import { useApp } from "@/app/context/AppContext";

export function Navbar({ page, nav, favCount }: { page: Page; nav: (p: Page) => void; favCount: number }) {
  const { user } = useApp();
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
              onClick={() => {
                if (!user) nav("login");
                else if (user.role === "admin") nav("admin");
                else nav("profil");
              }}
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

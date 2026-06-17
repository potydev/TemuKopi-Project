import { Home, Search, Bot, Heart, User } from "lucide-react";
import { Page } from "@/app/data/coffeeData";
import { useApp } from "@/app/context/AppContext";

export function BottomNav({ page, nav }: { page: Page; nav: (p: Page) => void }) {
  const { user } = useApp();
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
            onClick={() => {
              if (p === "profil") {
                if (!user) nav("login");
                else nav("profil");
              } else {
                nav(p);
              }
            }}
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

import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Page, Shop, unsplash } from "@/app/data/coffeeData";

export function MenuPage({
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

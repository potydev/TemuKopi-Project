import { Heart, Star, MapPin, ChevronRight } from "lucide-react";
import { Shop } from "@/app/data/coffeeData";
import { StarRow } from "@/app/components/ui/StarRow";
import { Pill } from "@/app/components/ui/Pill";

export function ShopCard({
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

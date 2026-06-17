import { Star } from "lucide-react";

export function StarRow({ rating }: { rating: number }) {
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

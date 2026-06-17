import { MessageSquare, Star, AlertTriangle, Trash2 } from "lucide-react";
import { Section, EmptyState } from "./shared";
import type { Review } from "./types";

export function KelolaReviewTab({
  items, onDelete,
}: {
  items: Review[];
  onDelete: (id: string) => void;
}) {
  return (
    <Section title="Kelola Review" subtitle="Hapus review yang tidak pantas atau melanggar pedoman." icon={<MessageSquare className="w-5 h-5" />}>
      <div className="space-y-3">
        {items.map((r) => (
          <div key={r.id} className={`p-4 rounded-2xl border ${r.flagged ? "border-red-300 bg-red-50/50" : "border-border/40 bg-[#FAF6F0]/50"}`}>
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#2C1810] text-white flex items-center justify-center font-extrabold text-xs shrink-0">
                  {r.user.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-[#2C1810] text-xs">{r.user}</h3>
                    {r.flagged && (
                      <span className="flex items-center gap-1 text-[9px] px-2 py-0.5 rounded-full bg-red-500 text-white font-black">
                        <AlertTriangle className="w-2.5 h-2.5" />DILAPORKAN
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-[#8B6B4A] font-bold">{r.shopName} • {r.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-3 h-3 ${i < r.rating ? "fill-amber-500 text-amber-500" : "text-gray-300"}`} />
                ))}
              </div>
            </div>
            <p className="text-xs text-[#5B3A1F] font-medium mb-3 pl-13">{r.comment}</p>
            <button onClick={() => onDelete(r.id)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-[10px] font-bold transition-colors ml-auto">
              <Trash2 className="w-3.5 h-3.5" />Hapus Review
            </button>
          </div>
        ))}
        {items.length === 0 && <EmptyState msg="Tidak ada review tersisa." />}
      </div>
    </Section>
  );
}

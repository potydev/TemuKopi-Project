import { Tag, CheckCircle2, XCircle } from "lucide-react";
import { Section, EmptyState } from "./shared";
import type { PendingPromo } from "./types";

export function KelolaPromoTab({
  items, onApprove, onReject,
}: {
  items: PendingPromo[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}) {
  return (
    <Section title="Kelola Promo" subtitle="Tinjau & kelola promo yang diajukan UMKM." icon={<Tag className="w-5 h-5" />}>
      {items.length === 0 ? (
        <EmptyState msg="Tidak ada promo yang menunggu review." />
      ) : (
        <div className="space-y-3">
          {items.map((p) => (
            <div key={p.id} className="p-4 rounded-2xl border border-border/40 bg-[#FAF6F0]/50">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-extrabold text-[#2C1810] text-sm">{p.title}</h3>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#C8813A] text-white font-black">{p.discount}</span>
                  </div>
                  <p className="text-[10px] text-[#8B6B4A] font-bold">{p.shopName} • Periode: {p.period}</p>
                </div>
                <span className="text-[10px] font-bold text-[#8B6B4A] shrink-0">{p.submittedAt}</span>
              </div>
              <p className="text-xs text-[#5B3A1F] font-medium mb-3">{p.description}</p>
              <div className="flex gap-2">
                <button onClick={() => onApprove(p.id)} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-colors">
                  <CheckCircle2 className="w-4 h-4" />Setujui
                </button>
                <button onClick={() => onReject(p.id)} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-red-300 text-red-600 hover:bg-red-50 text-xs font-bold transition-colors">
                  <XCircle className="w-4 h-4" />Tolak
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}

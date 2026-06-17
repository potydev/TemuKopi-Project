import { Utensils, CheckCircle2, XCircle } from "lucide-react";
import { Section, EmptyState } from "./shared";
import type { PendingMenu } from "./types";

export function VerifikasiMenuTab({
  items, onApprove, onReject,
}: {
  items: PendingMenu[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}) {
  return (
    <Section title="Verifikasi Menu" subtitle="Tinjau menu baru yang diajukan pemilik UMKM." icon={<Utensils className="w-5 h-5" />}>
      {items.length === 0 ? (
        <EmptyState msg="Tidak ada menu yang menunggu verifikasi." />
      ) : (
        <div className="grid sm:grid-cols-2 gap-3">
          {items.map((m) => (
            <div key={m.id} className="flex gap-3 p-3 rounded-2xl border border-border/40 bg-[#FAF6F0]/50">
              <img src={m.img} alt={m.menuName} className="w-20 h-20 object-cover rounded-xl shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="font-extrabold text-[#2C1810] text-xs truncate">{m.menuName}</h3>
                <p className="text-[10px] text-[#8B6B4A] font-bold">{m.shopName}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#F0E8DC] text-[#5B3A1F] font-bold">{m.category}</span>
                  <span className="text-xs font-extrabold text-[#C8813A]">Rp {m.price.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex gap-1.5 mt-2">
                  <button onClick={() => onApprove(m.id)} className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-[10px] font-bold">
                    <CheckCircle2 className="w-3 h-3" />Setujui
                  </button>
                  <button onClick={() => onReject(m.id)} className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white border border-red-300 text-red-600 hover:bg-red-50 text-[10px] font-bold">
                    <XCircle className="w-3 h-3" />Tolak
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}

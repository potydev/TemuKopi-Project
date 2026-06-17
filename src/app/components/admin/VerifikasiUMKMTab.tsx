import { Store, CheckCircle2, XCircle, Eye } from "lucide-react";
import { Section, EmptyState } from "./shared";
import type { PendingUMKM } from "./types";

export function VerifikasiUMKMTab({
  items, onApprove, onReject,
}: {
  items: PendingUMKM[];
  onApprove: (u: PendingUMKM) => void;
  onReject: (id: string) => void;
}) {
  return (
    <Section title="Verifikasi UMKM" subtitle="Tinjau pendaftaran coffee shop baru sebelum dipublikasikan." icon={<Store className="w-5 h-5" />}>
      {items.length === 0 ? (
        <EmptyState msg="Tidak ada pendaftaran UMKM yang menunggu." />
      ) : (
        <div className="space-y-3">
          {items.map((u) => (
            <div key={u.id} className="flex flex-col sm:flex-row gap-4 p-4 rounded-2xl border border-border/40 bg-[#FAF6F0]/50">
              <img src={u.img} alt={u.name} className="w-full sm:w-32 h-32 sm:h-24 object-cover rounded-xl shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-extrabold text-[#2C1810] text-sm">{u.name}</h3>
                    <p className="text-xs text-[#8B6B4A] font-semibold">Pemilik: {u.owner} • {u.email}</p>
                  </div>
                  <span className="text-[10px] font-bold text-[#8B6B4A] shrink-0">{u.submittedAt}</span>
                </div>
                <p className="text-xs text-[#5B3A1F] font-medium mb-3">📍 {u.address}, {u.city}</p>
                <div className="flex gap-2">
                  <button onClick={() => onApprove(u)} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-colors shadow-sm">
                    <CheckCircle2 className="w-4 h-4" />Setujui
                  </button>
                  <button onClick={() => onReject(u.id)} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-red-300 text-red-600 hover:bg-red-50 text-xs font-bold transition-colors">
                    <XCircle className="w-4 h-4" />Tolak
                  </button>
                  <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-border/40 text-[#8B6B4A] hover:bg-[#FAF6F0] text-xs font-bold transition-colors ml-auto">
                    <Eye className="w-4 h-4" />Detail
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

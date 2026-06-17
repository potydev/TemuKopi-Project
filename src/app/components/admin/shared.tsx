import type { ReactNode, ReactElement } from "react";
import { CheckCircle2 } from "lucide-react";

export function Section({ title, subtitle, icon, children }: { title: string; subtitle: string; icon: ReactElement; children: ReactNode }) {
  return (
    <div className="bg-card border border-border/80 rounded-3xl p-6 shadow-xl">
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border/30">
        <div className="w-10 h-10 rounded-xl bg-[#F0E8DC] text-[#C8813A] flex items-center justify-center">{icon}</div>
        <div>
          <h2 className="font-extrabold text-base text-[#2C1810]">{title}</h2>
          <p className="text-xs text-[#8B6B4A] font-semibold">{subtitle}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

export function EmptyState({ msg }: { msg: string }) {
  return (
    <div className="text-center py-10">
      <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-2" />
      <p className="text-xs text-[#8B6B4A] font-bold">{msg}</p>
    </div>
  );
}

import { Coffee, Search, Brain, Utensils } from "lucide-react";
import { Page } from "@/app/data/coffeeData";

export function Footer({ nav }: { nav: (p: Page) => void }) {
  const features = [
    { icon: <Search className="w-5 h-5" />, label: "Temukan Coffee Shop" },
    { icon: <Brain className="w-5 h-5" />, label: "Sesuai Mood Kamu" },
    { icon: <Utensils className="w-5 h-5" />, label: "Menu Sesuai Selera" },
  ];
  return (
    <footer className="bg-[#2C1810] text-[#FAF6F0] pt-16 pb-36 md:pb-16 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C8813A]/5 rounded-full blur-3xl" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <button onClick={() => nav("home")} className="flex items-center gap-3 justify-center mb-4 group">
            <div className="w-12 h-12 rounded-2xl bg-[#C8813A] flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300">
              <Coffee className="w-6 h-6 text-white" />
            </div>
            <span className="text-3xl font-extrabold tracking-tight text-white">TemuKopi</span>
          </button>
          <p className="text-[#A89278] text-sm max-w-md mx-auto leading-relaxed font-medium">
            Temukan coffee shop terbaik di sekitarmu, disesuaikan penuh dengan suasana hati dan preferensi rasa unik kamu.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 mb-12">
          {features.map((f) => (
            <div key={f.label} className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-2xl border border-white/5 hover:border-[#C8813A]/20 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#3D2518] flex items-center justify-center text-[#C8813A]">
                {f.icon}
              </div>
              <span className="text-sm font-semibold text-[#D0C0A8]">{f.label}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-[#3D2518] pt-8 text-center flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#6B5040] font-semibold">© 2026 TemuKopi. Dibuat dengan cinta untuk penikmat kopi Indonesia.</p>
          <div className="flex gap-6">
            {["Tentang Kami", "Ketentuan", "Kontak"].map((term) => (
              <button key={term} className="text-xs text-[#6B5040] hover:text-[#C8813A] font-bold transition-colors">
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

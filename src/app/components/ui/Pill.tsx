export function Pill({ label }: { label: string }) {
  return (
    <span className="text-[10px] px-2.5 py-1 rounded-full bg-[#F0E8DC] text-[#8B6B4A] font-semibold tracking-wide shadow-sm hover:scale-105 transition-spring">
      {label}
    </span>
  );
}

import { useState } from "react";
import { Bot, Coffee, Heart, Star, ChevronRight, User, Send, Brain } from "lucide-react";
import { Page, Shop, COFFEES } from "@/app/data/coffeeData";
import { useApp } from "@/app/context/AppContext";
import { Footer } from "@/app/components/Footer";

interface ChatMessage {
  sender: "ai" | "user";
  text: string;
  shops?: Shop[];
  coffee?: typeof COFFEES[0];
}

export function MoodFinderPage({
  nav,
  favs,
  toggleFav,
  shops,
  setSelectedShopId,
}: {
  nav: (p: Page) => void;
  favs: Set<string>;
  toggleFav: (id: string) => void;
  shops: Shop[];
  setSelectedShopId: (id: string) => void;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: "ai",
      text: "Hai Fakhrizz! Aku TemuKopi AI ☕ Ceritakan suasana hatimu atau kebutuhanmu saat ini (misal: pengen nugas santai, cari tempat estetik outdoor, capek nugas butuh kafein), biar aku carikan kedai & racikan kopi terbaik buat kamu!"
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const suggestions = [
    "Butuh fokus buat nugas serius 📚",
    "Capek bgt butuh tempat healing tenang 🌿",
    "Mau nongkrong outdoor estetik bareng temen 👥",
    "Kencan cozy & romantis berdua 🌹",
  ];

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Add user message
    const userMsg: ChatMessage = { sender: "user", text: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // AI thinking timeout simulation
    setTimeout(() => {
      setIsTyping(false);
      const query = textToSend.toLowerCase();
      let matchedShops: Shop[] = [];
      let matchedCoffee: typeof COFFEES[0] | undefined;
      let replyText = "";

      if (query.includes("nugas") || query.includes("fokus") || query.includes("kerja") || query.includes("tugas")) {
        matchedShops = shops.filter(s => s.facilities.includes("Meeting Room") || s.tags.includes("Work Friendly"));
        matchedCoffee = COFFEES.find(c => c.id === "espresso");
        replyText = "Wah, kamu lagi produktif banget ya! Kamu butuh asupan kafein mantap biar melek dan meja kerja yang memadai dengan colokan listrik melimpah. Aku merekomendasikan tempat-tempat workspace terfavorit ini untuk melancarkan tugasmu!";
      } else if (query.includes("healing") || query.includes("sepi") || query.includes("tenang") || query.includes("capek") || query.includes("santai")) {
        matchedShops = shops.filter(s => s.tags.includes("Tenang"));
        matchedCoffee = COFFEES.find(c => c.id === "vanilla-latte");
        replyText = "Tenang sejenak... Kamu butuh me-time untuk melepas penat diiringi kopi manis yang lembut. Berikut adalah kedai dengan nuansa paling sunyi dan teduh yang cocok buat me-recharge energimu.";
      } else if (query.includes("outdoor") || query.includes("estetik") || query.includes("foto") || query.includes("cantik")) {
        matchedShops = shops.filter(s => s.tags.includes("Estetik") || s.facilities.includes("Outdoor"));
        matchedCoffee = COFFEES.find(c => c.id === "iced-latte");
        replyText = "Siap eksis! Kamu butuh pemandangan outdoor yang asri dan sudut-sudut estetik instagramable buat foto-foto. Yuk cek rekomendasi kedai kopi paling 'scenic' dan segar di bawah ini!";
      } else if (query.includes("romantis") || query.includes("date") || query.includes("kencan") || query.includes("cozy")) {
        matchedShops = shops.filter(s => s.tags.includes("Cozy"));
        matchedCoffee = COFFEES.find(c => c.id === "caramel-macchiato");
        replyText = "Uuuu, kencan manis ya! Nikmati atmosfer hangat yang intim nan romantis bersama si dia ditemani manis lembutnya karamel susu. Coba intip kedai estetik romantis pilihan AI berikut.";
      } else {
        // Fallback
        matchedShops = [shops[0], shops[1]];
        matchedCoffee = COFFEES[2];
        replyText = "Menarik banget suasana hatimu! Biar harimu makin berwarna, aku saranin nyoba kopi susu segar terpopuler kami. Ini daftar tempat terbaik yang pas buat segala jenis mood kamu!";
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: replyText,
          shops: matchedShops.length > 0 ? matchedShops : [shops[0]],
          coffee: matchedCoffee
        }
      ]);
    }, 1500);
  };

  return (
    <div className="animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Chat Container */}
        <div className="lg:col-span-7 flex flex-col h-[650px] bg-card border border-border/80 rounded-3xl overflow-hidden shadow-xl">
          {/* Header */}
          <div className="p-5 border-b border-border/40 bg-[#FAF6F0]/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#2C1810] flex items-center justify-center shadow-md">
                <Bot className="w-6 h-6 text-[#F0C896]" />
              </div>
              <div>
                <h2 className="font-extrabold text-[#2C1810] text-base">Mood Finder AI</h2>
                <p className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Sistem AI Aktif
                </p>
              </div>
            </div>
            <button
              onClick={() => setMessages([
                {
                  sender: "ai",
                  text: "Hai Fakhrizz! Aku TemuKopi AI ☕ Ceritakan suasana hatimu atau kebutuhanmu saat ini, biar aku racikkan kedai terkece!"
                }
              ])}
              className="text-xs font-extrabold text-[#C8813A] hover:underline"
            >
              Hapus Obrolan
            </button>
          </div>

          {/* Messages list */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-muted/10">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex gap-3 ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                {m.sender === "ai" && (
                  <div className="w-9 h-9 rounded-xl bg-[#2C1810] flex items-center justify-center shrink-0 shadow-md">
                    <Coffee className="w-4 h-4 text-[#F0C896]" />
                  </div>
                )}
                <div className="max-w-[85%] flex flex-col gap-3">
                  <div
                    className={`px-5 py-4 rounded-3xl text-sm leading-relaxed font-semibold shadow-sm ${m.sender === "user"
                        ? "bg-[#2C1810] text-white rounded-tr-none"
                        : "bg-[#F0E8DC] text-[#2C1810] rounded-tl-none border border-border/20"
                      }`}
                  >
                    {m.text}
                  </div>

                  {/* Render matched items inside bubble context */}
                  {m.sender === "ai" && (m.coffee || m.shops) && (
                    <div className="space-y-3 mt-1 w-full animate-fadeIn">
                      {/* Coffee match */}
                      {m.coffee && (
                        <div className="bg-white border border-[#C8813A]/20 rounded-2xl p-4 flex gap-4 shadow-sm items-center">
                          <img
                            src={m.coffee.img}
                            alt={m.coffee.name}
                            className="w-14 h-14 object-cover rounded-xl shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <span className="text-[9px] bg-orange-100 text-[#C8813A] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                              Racikan Rekomendasi
                            </span>
                            <p className="font-bold text-sm text-[#2C1810] mt-1">{m.coffee.name}</p>
                            <p className="text-xs text-[#8B6B4A] italic">{m.coffee.rasa}</p>
                          </div>
                        </div>
                      )}

                      {/* Shops matches list */}
                      {m.shops && m.shops.map((shop) => (
                        <div key={shop.id} className="bg-white border border-border/50 rounded-2xl p-3.5 flex gap-4 shadow-sm hover:border-[#C8813A] transition-all">
                          <img
                            src={shop.img}
                            alt={shop.name}
                            className="w-16 h-16 object-cover rounded-xl shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <p className="font-bold text-sm text-[#2C1810] truncate">{shop.name}</p>
                              <button onClick={() => toggleFav(shop.id)} className="shrink-0">
                                <Heart className={`w-4 h-4 ${favs.has(shop.id) ? "text-red-500 fill-red-500" : "text-[#8B6B4A]"}`} />
                              </button>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-[#8B6B4A] mt-0.5 font-medium">
                              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                              <span>{shop.rating}</span>
                              <span>·</span>
                              <span>{shop.distance}</span>
                            </div>
                            <button
                              onClick={() => {
                                setSelectedShopId(shop.id);
                                nav("detail");
                              }}
                              className="mt-2 text-xs font-bold text-[#C8813A] hover:underline flex items-center gap-0.5"
                            >
                              Detail Kedai <ChevronRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {m.sender === "user" && (
                  <div className="w-9 h-9 rounded-xl bg-[#C8813A] flex items-center justify-center shrink-0 shadow-md">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 justify-start items-center">
                <div className="w-9 h-9 rounded-xl bg-[#2C1810] flex items-center justify-center shrink-0 shadow-md">
                  <Coffee className="w-4 h-4 text-[#F0C896]" />
                </div>
                <div className="bg-[#F0E8DC] rounded-3xl rounded-tl-none px-5 py-4 border border-border/20 flex gap-1.5 items-center shadow-sm">
                  <span className="w-2.5 h-2.5 bg-[#8B6B4A] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2.5 h-2.5 bg-[#8B6B4A] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2.5 h-2.5 bg-[#8B6B4A] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
          </div>

          {/* Quick chips container */}
          <div className="px-5 py-3 border-t border-border/20 bg-muted/5 flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => handleSend(s.replace(/[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD00-\uDFFF]/g, ""))}
                className="shrink-0 text-xs font-bold px-3.5 py-2 rounded-full bg-white border border-border/50 text-[#8B6B4A] hover:border-[#C8813A] hover:text-[#C8813A] transition-all whitespace-nowrap shadow-sm hover:shadow"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Chat input box */}
          <div className="p-4 border-t border-border/40 bg-white flex gap-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
              placeholder="Ceritakan moodmu di sini (misal: lagi stres butuh kopi manis)..."
              className="flex-1 px-5 py-3.5 rounded-2xl bg-[#F0E8DC]/50 border border-border/40 text-sm font-semibold text-[#2C1810] placeholder-[#8B6B4A]/60 outline-none focus:border-[#C8813A] focus:bg-white transition-all shadow-inner"
            />
            <button
              onClick={() => handleSend(input)}
              className="w-14 h-14 rounded-2xl bg-[#2C1810] flex items-center justify-center hover:bg-[#C8813A] active:scale-95 transition-all shadow-md shrink-0 cursor-pointer text-white"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right: AI Intelligence Panel Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-card border border-border/80 rounded-3xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#C8813A]/5 rounded-full blur-xl" />
            <h3 className="font-extrabold text-[#2C1810] text-lg mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5 text-[#C8813A]" /> Teknologi Mood Finder AI
            </h3>
            <p className="text-sm text-[#8B6B4A] leading-relaxed font-semibold mb-4">
              Mood Finder AI menganalisis kosakata emosional, tingkat kepenatan, serta tujuan kunjungan Anda untuk mencocokkannya dengan atmosfer fisik dan racikan kopi dari database kedai kami.
            </p>
            <div className="space-y-3.5">
              {[
                { title: "📚 Fokus & Produktivitas", desc: "Mendongkrak konsentrasi penuh dengan asupan espresso berkafein tinggi serta workspace ramah colokan." },
                { title: "🌿 Anti-Stres & Healing", desc: "Memulihkan ketenangan jiwa dengan aneka teh herbal, kopi susu lembut, serta halaman kedai asri berhembus angin." },
                { title: "🌹 Kencan Intim & Cozy", desc: "Merajut kenyamanan kencan dengan musik latar lembut, minuman karamel creamy manis, dan penerangan syahdu." },
              ].map((item, i) => (
                <div key={i} className="p-3 bg-[#FAF6F0] rounded-2xl border border-border/20">
                  <p className="text-xs font-extrabold text-[#2C1810] mb-1">{item.title}</p>
                  <p className="text-[11px] text-[#8B6B4A] font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer nav={nav} />
  </div>
  );
}

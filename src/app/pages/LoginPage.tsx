import { useState } from "react";
import { useNavigate } from "react-router";
import { Icons } from "@/app/components/Icons";
import { useApp } from "@/app/context/AppContext";
import { motion } from "motion/react";
import { toast } from "sonner";

export function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { setUser } = useApp();
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate login
        setTimeout(() => {
            setIsLoading(false);
            if (email === "admin@temukopi.id") {
                setUser({ name: "Admin TemuKopi", email, role: "admin" });
                toast.success("Selamat datang, Admin!");
                navigate("/");
            } else if (email === "merchant@temukopi.id") {
                setUser({ name: "Kopi Kenangan", email, role: "merchant" });
                toast.success("Halo, Merchant!");
                navigate("/");
            } else {
                setUser({ name: "Fakhrizz", email, role: "user" });
                toast.success("Login Berhasil!");
                navigate("/");
            }
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#FAF6F0] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-[#C8813A]/5 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#2C1810]/5 rounded-full blur-3xl" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white rounded-[32px] p-8 md:p-10 shadow-[0_32px_64px_-16px_rgba(44,24,16,0.1)] border border-[#2C1810]/5 z-10"
            >
                <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-[#2C1810] flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <Icons.Coffee className="w-8 h-8 text-[#FAF6F0]" />
                    </div>
                    <h1 className="text-2xl font-extrabold text-[#2C1810]">TemuKopi</h1>
                    <p className="text-sm text-[#8B6B4A] font-medium mt-1">
                        Masuk untuk menjelajahi rasa kopi terbaik
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-[#8B6B4A] uppercase tracking-wider ml-1">
                            Email
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#8B6B4A]">
                                <Icons.User className="w-4 h-4" />
                            </div>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="nama@email.com"
                                className="w-full bg-[#FAF6F0] border border-[#2C1810]/10 rounded-2xl py-3.5 pl-11 pr-4 text-sm font-semibold text-[#2C1810] outline-none focus:ring-2 focus:ring-[#C8813A] focus:bg-white transition-all shadow-inner"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-[#8B6B4A] uppercase tracking-wider ml-1">
                            Kata Sandi
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#8B6B4A]">
                                <Icons.CheckCircle2 className="w-4 h-4" />
                            </div>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-[#FAF6F0] border border-[#2C1810]/10 rounded-2xl py-3.5 pl-11 pr-4 text-sm font-semibold text-[#2C1810] outline-none focus:ring-2 focus:ring-[#C8813A] focus:bg-white transition-all shadow-inner"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-4 rounded-2xl bg-[#2C1810] text-white font-extrabold text-sm hover:bg-[#C8813A] active:scale-[0.98] transition-all shadow-lg shadow-[#2C1810]/20 flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                Masuk Sekarang
                                <Icons.ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 pt-8 border-t border-[#2C1810]/5 text-center">
                    <p className="text-xs text-[#8B6B4A] font-medium">
                        Belum punya akun?{" "}
                        <button className="text-[#C8813A] font-bold hover:underline">
                            Daftar Gratis
                        </button>
                    </p>
                    <div className="mt-4 flex flex-wrap justify-center gap-2">
                        <button
                            onClick={() => { setEmail("admin@temukopi.id"); setPassword("admin123"); }}
                            className="text-[10px] px-2 py-1 rounded-full bg-[#F0E8DC] text-[#8B6B4A] font-bold hover:bg-[#2C1810] hover:text-white transition-colors"
                        >
                            Demo Admin
                        </button>
                        <button
                            onClick={() => { setEmail("merchant@temukopi.id"); setPassword("merchant123"); }}
                            className="text-[10px] px-2 py-1 rounded-full bg-[#F0E8DC] text-[#8B6B4A] font-bold hover:bg-[#2C1810] hover:text-white transition-colors"
                        >
                            Demo Merchant
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

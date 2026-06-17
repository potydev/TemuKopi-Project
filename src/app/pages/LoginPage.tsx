import { useState, type FormEvent } from "react";
import { Coffee } from "lucide-react";

export interface CurrentUser {
    name: string;
    email: string;
    role: "user" | "admin";
}

interface LoginPageProps {
    onLogin: (user: CurrentUser) => void;
    nav: (page: any) => void;
}

export function LoginPage({ onLogin, nav }: LoginPageProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const submit = (e: FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            if (email === "admin@temukopi.id" && password === "admin123") {
                onLogin({ name: "Admin TemuKopi", email, role: "admin" });
            } else if (email && password.length >= 6) {
                onLogin({ name: email.split("@")[0] || "Pengguna", email, role: "user" });
            } else {
                setError("Email atau password tidak valid. Min. 6 karakter.");
            }
        }, 500);
    };

    return (
        <div className="max-w-md mx-auto px-4 py-12 animate-fadeIn">
            <div className="bg-card border border-border/80 rounded-3xl p-8 shadow-xl">
                <div className="flex flex-col items-center mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-[#2C1810] flex items-center justify-center mb-3 shadow-lg">
                        <Coffee className="w-8 h-8 text-[#FAF6F0]" />
                    </div>
                    <h1 className="font-extrabold text-2xl text-[#2C1810] tracking-tight">Masuk ke TemuKopi</h1>
                    <p className="text-xs text-[#8B6B4A] font-semibold mt-1 text-center">Akses profil, favorit, dan dashboard admin.</p>
                </div>
                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className="text-[10px] font-extrabold text-[#8B6B4A] uppercase tracking-wider">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="email@contoh.com"
                            className="w-full mt-1 px-4 py-3 rounded-xl border border-border/40 bg-[#FAF6F0]/50 text-sm font-semibold text-[#2C1810] focus:outline-none focus:border-[#C8813A]"
                        />
                    </div>
                    <div>
                        <label className="text-[10px] font-extrabold text-[#8B6B4A] uppercase tracking-wider">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full mt-1 px-4 py-3 rounded-xl border border-border/40 bg-[#FAF6F0]/50 text-sm font-semibold text-[#2C1810] focus:outline-none focus:border-[#C8813A]"
                        />
                    </div>
                    {error && <p className="text-xs text-red-500 font-bold bg-red-50 p-2 rounded-lg">{error}</p>}
                    <button type="submit" disabled={loading} className="w-full py-3 rounded-xl bg-[#2C1810] hover:bg-[#C8813A] text-white text-sm font-extrabold transition-colors shadow-md disabled:opacity-60">
                        {loading ? "Memproses..." : "Masuk"}
                    </button>
                    <button type="button" onClick={() => nav("home")} className="w-full py-3 rounded-xl bg-transparent border border-border/40 hover:bg-[#FAF6F0] text-[#2C1810] text-sm font-extrabold transition-all active:scale-98">
                        Kembali ke Beranda
                    </button>
                </form>
                <div className="mt-6 p-3 rounded-xl bg-[#FAF6F0] border border-border/30 text-[10px] font-bold text-[#8B6B4A]">
                    <p className="text-[#2C1810] font-extrabold mb-1">Demo Akun:</p>
                    <p>👤 User: email apapun + password min. 6 karakter</p>
                    <p>🛡️ Admin: admin@temukopi.id / admin123</p>
                </div>
            </div>
        </div>
    );
}

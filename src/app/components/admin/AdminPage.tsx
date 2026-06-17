import { useState, type ReactElement } from "react";
import {
  LayoutDashboard, Store, Utensils, Tag, MessageSquare, Coffee,
  ArrowLeft, ShieldCheck,
} from "lucide-react";

import type { AdminShop, AdminTab, PendingUMKM, PendingMenu, PendingPromo, Review } from "./types";
import { INITIAL_PENDING_UMKM, INITIAL_PENDING_MENU, INITIAL_PENDING_PROMO, INITIAL_REVIEWS } from "./data";
import { DashboardTab } from "./DashboardTab";
import { VerifikasiUMKMTab } from "./VerifikasiUMKMTab";
import { VerifikasiMenuTab } from "./VerifikasiMenuTab";
import { KelolaShopTab } from "./KelolaShopTab";
import { KelolaPromoTab } from "./KelolaPromoTab";
import { KelolaReviewTab } from "./KelolaReviewTab";

export type { AdminShop } from "./types";

export function AdminPage({
  adminName,
  shops,
  onToggleShopActive,
  onApproveShop,
  onLogout,
  nav,
}: {
  adminName: string;
  shops: AdminShop[];
  onToggleShopActive: (id: string) => void;
  onApproveShop: (shop: AdminShop) => void;
  onLogout: () => void;
  nav: (p: string) => void;
}) {
  const [tab, setTab] = useState<AdminTab>("dashboard");
  const [pendingUMKM, setPendingUMKM] = useState<PendingUMKM[]>(INITIAL_PENDING_UMKM);
  const [pendingMenu, setPendingMenu] = useState<PendingMenu[]>(INITIAL_PENDING_MENU);
  const [pendingPromo, setPendingPromo] = useState<PendingPromo[]>(INITIAL_PENDING_PROMO);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);

  const approveUMKM = (u: PendingUMKM) => {
    onApproveShop({
      id: u.id + "-" + Date.now(),
      name: u.name,
      rating: 0,
      reviews: 0,
      city: u.city,
      img: u.img,
      active: true,
    });
    setPendingUMKM((prev) => prev.filter((x) => x.id !== u.id));
  };
  const rejectUMKM = (id: string) => setPendingUMKM((prev) => prev.filter((x) => x.id !== id));

  const approveMenu = (id: string) => setPendingMenu((prev) => prev.filter((x) => x.id !== id));
  const rejectMenu = (id: string) => setPendingMenu((prev) => prev.filter((x) => x.id !== id));

  const approvePromo = (id: string) => setPendingPromo((prev) => prev.filter((x) => x.id !== id));
  const rejectPromo = (id: string) => setPendingPromo((prev) => prev.filter((x) => x.id !== id));

  const deleteReview = (id: string) => setReviews((prev) => prev.filter((x) => x.id !== id));

  const activeShopsCount = shops.filter((s) => s.active !== false).length;
  const inactiveShopsCount = shops.length - activeShopsCount;
  const flaggedReviews = reviews.filter((r) => r.flagged).length;

  const tabs: { key: AdminTab; label: string; icon: ReactElement; badge?: number }[] = [
    { key: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
    { key: "umkm", label: "Verifikasi UMKM", icon: <Store className="w-4 h-4" />, badge: pendingUMKM.length },
    { key: "menu", label: "Verifikasi Menu", icon: <Utensils className="w-4 h-4" />, badge: pendingMenu.length },
    { key: "shop", label: "Kelola Coffee Shop", icon: <Coffee className="w-4 h-4" /> },
    { key: "promo", label: "Kelola Promo", icon: <Tag className="w-4 h-4" />, badge: pendingPromo.length },
    { key: "review", label: "Kelola Review", icon: <MessageSquare className="w-4 h-4" />, badge: flaggedReviews },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#2C1810] to-[#5B3A1F] rounded-3xl p-6 mb-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C8813A]/20 rounded-full blur-3xl" />
        <div className="relative flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => nav("profil")}
              className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="w-12 h-12 rounded-2xl bg-[#C8813A] flex items-center justify-center shadow-lg">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-extrabold text-xl tracking-tight">Admin Dashboard</h1>
              <p className="text-xs text-[#D0C0A8] font-semibold">Selamat datang, {adminName}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="px-4 py-2.5 rounded-xl bg-red-500/90 hover:bg-red-500 text-white text-xs font-bold transition-colors shadow-md"
          >
            Keluar
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Sidebar */}
        <aside className="lg:col-span-3">
          <div className="bg-card border border-border/80 rounded-3xl p-3 shadow-xl lg:sticky lg:top-24">
            <div className="space-y-1">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`w-full flex items-center justify-between gap-3 rounded-2xl px-4 py-3 text-xs font-bold transition-all ${
                    tab === t.key
                      ? "bg-[#2C1810] text-white shadow-md"
                      : "text-[#8B6B4A] hover:bg-[#FAF6F0]"
                  }`}
                >
                  <span className="flex items-center gap-3">{t.icon}{t.label}</span>
                  {t.badge !== undefined && t.badge > 0 && (
                    <span className={`min-w-5 h-5 px-1.5 rounded-full text-[10px] font-black flex items-center justify-center ${
                      tab === t.key ? "bg-[#C8813A] text-white" : "bg-red-500 text-white"
                    }`}>{t.badge}</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="lg:col-span-9 space-y-6">
          {tab === "dashboard" && (
            <DashboardTab
              shops={shops}
              activeShopsCount={activeShopsCount}
              inactiveShopsCount={inactiveShopsCount}
              pendingUMKMCount={pendingUMKM.length}
              pendingMenuCount={pendingMenu.length}
              pendingPromoCount={pendingPromo.length}
              flaggedReviewsCount={flaggedReviews}
              totalReviews={reviews.length}
            />
          )}
          {tab === "umkm" && <VerifikasiUMKMTab items={pendingUMKM} onApprove={approveUMKM} onReject={rejectUMKM} />}
          {tab === "menu" && <VerifikasiMenuTab items={pendingMenu} onApprove={approveMenu} onReject={rejectMenu} />}
          {tab === "shop" && <KelolaShopTab shops={shops} onToggleActive={onToggleShopActive} />}
          {tab === "promo" && <KelolaPromoTab items={pendingPromo} onApprove={approvePromo} onReject={rejectPromo} />}
          {tab === "review" && <KelolaReviewTab items={reviews} onDelete={deleteReview} />}
        </main>
      </div>
    </div>
  );
}

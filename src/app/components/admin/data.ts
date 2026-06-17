import type { PendingUMKM, PendingMenu, PendingPromo, Review } from "./types";

export const INITIAL_PENDING_UMKM: PendingUMKM[] = [
  {
    id: "u1", name: "Kopi Senja Hari", owner: "Bagas Pratama",
    email: "bagas@kopisenja.id", city: "Jakarta Timur",
    address: "Jl. Cipinang Raya No. 12", submittedAt: "2 jam lalu",
    img: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=400&h=300&fit=crop&auto=format",
  },
  {
    id: "u2", name: "Brewmate Co.", owner: "Sinta Larasati",
    email: "sinta@brewmate.co", city: "Surabaya",
    address: "Jl. Darmo Permai II No. 88", submittedAt: "5 jam lalu",
    img: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=400&h=300&fit=crop&auto=format",
  },
  {
    id: "u3", name: "Sudut Pandang Kopi", owner: "Dimas Aditya",
    email: "dimas@sudutpandang.com", city: "Bandung",
    address: "Jl. Riau No. 45", submittedAt: "1 hari lalu",
    img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop&auto=format",
  },
];

export const INITIAL_PENDING_MENU: PendingMenu[] = [
  { id: "m1", shopName: "Kopi Ruang Hati", menuName: "Pandan Latte Signature", category: "Signature", price: 38000, submittedAt: "3 jam lalu", img: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400&h=300&fit=crop&auto=format" },
  { id: "m2", shopName: "Tanamera Coffee", menuName: "Cold Brew Aren", category: "Cold", price: 32000, submittedAt: "6 jam lalu", img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop&auto=format" },
  { id: "m3", shopName: "Filosofi Kopi Melawai", menuName: "Croffle Coklat Premium", category: "Snack", price: 28000, submittedAt: "1 hari lalu", img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop&auto=format" },
];

export const INITIAL_PENDING_PROMO: PendingPromo[] = [
  { id: "p1", shopName: "Kolektif Space", title: "Diskon Akhir Pekan 30%", description: "Berlaku untuk semua menu signature setiap Sabtu-Minggu", discount: "30%", period: "5 Jun - 30 Jun 2026", submittedAt: "1 jam lalu" },
  { id: "p2", shopName: "See You Coffee", title: "Beli 2 Gratis 1 Croffle", description: "Khusus pembelian di tempat dengan minimum 2 kopi", discount: "B2G1", period: "10 Jun - 20 Jun 2026", submittedAt: "4 jam lalu" },
];

export const INITIAL_REVIEWS: Review[] = [
  { id: "r1", user: "Andre M.", shopName: "Tanamera Coffee", rating: 5, comment: "Kopinya enak banget, suasana tenang, cocok buat kerja!", flagged: false, date: "2 jam lalu" },
  { id: "r2", user: "Anonim", shopName: "Kopi Ruang Hati", rating: 1, comment: "Pelayan jelek banget!!! Kopinya juga rasa air gula doang, parah!!", flagged: true, date: "5 jam lalu" },
  { id: "r3", user: "Linda P.", shopName: "See You Coffee", rating: 4, comment: "Tempatnya estetik, kopinya enak. Hanya saja agak ramai di weekend.", flagged: false, date: "1 hari lalu" },
  { id: "r4", user: "User2342", shopName: "Filosofi Kopi Melawai", rating: 1, comment: "SAMPAH! JANGAN KESINI! BUANG-BUANG DUIT AJA!", flagged: true, date: "2 hari lalu" },
];

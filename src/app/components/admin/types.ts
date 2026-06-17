export interface AdminShop {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  city: string;
  img: string;
  active?: boolean;
}

export interface PendingUMKM {
  id: string;
  name: string;
  owner: string;
  email: string;
  city: string;
  address: string;
  submittedAt: string;
  img: string;
}

export interface PendingMenu {
  id: string;
  shopName: string;
  menuName: string;
  category: string;
  price: number;
  submittedAt: string;
  img: string;
}

export interface PendingPromo {
  id: string;
  shopName: string;
  title: string;
  description: string;
  discount: string;
  period: string;
  submittedAt: string;
}

export interface Review {
  id: string;
  user: string;
  shopName: string;
  rating: number;
  comment: string;
  flagged: boolean;
  date: string;
}

export type AdminTab = "dashboard" | "umkm" | "menu" | "shop" | "promo" | "review";

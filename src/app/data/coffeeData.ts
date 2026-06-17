import nugasIcon from "@/imports/nugas.png";
import meetingIcon from "@/imports/meeting.png";
import dateIcon from "@/imports/date.png";
import nongkrongIcon from "@/imports/nongkrong.png";
import healingIcon from "@/imports/healing.png";
import malamIcon from "@/imports/malam.png";

export type Page = "home" | "mood" | "rekomendasi" | "pencarian" | "detail" | "menu" | "promo" | "umkm" | "ulasan" | "favorit" | "profil" | "login" | "admin";

export const unsplash = (id: string, w = 800, h = 500) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format`;

export const PROFILE_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cdefs%3E%3CradialGradient id='bg' cx='50%25' cy='48%25' r='70%25'%3E%3Cstop offset='0%25' stop-color='%235b5252'/%3E%3Cstop offset='100%25' stop-color='%23151112'/%3E%3C/radialGradient%3E%3Cfilter id='blur'%3E%3CfeGaussianBlur stdDeviation='3.2'/%3E%3C/filter%3E%3C/defs%3E%3Crect width='200' height='200' fill='url(%23bg)'/%3E%3Cg filter='url(%23blur)'%3E%3Cellipse cx='100' cy='138' rx='53' ry='62' fill='%23ddd8d8'/%3E%3Cellipse cx='73' cy='77' rx='31' ry='28' fill='%23d8d4d4'/%3E%3Cellipse cx='128' cy='77' rx='31' ry='28' fill='%23d8d4d4'/%3E%3Cellipse cx='68' cy='76' rx='14' ry='10' fill='%23201a1b' transform='rotate(-7 68 76)'/%3E%3Cellipse cx='123' cy='76' rx='14' ry='10' fill='%23201a1b' transform='rotate(8 123 76)'/%3E%3Cellipse cx='73' cy='70' rx='6' ry='4' fill='%23fff' opacity='.42'/%3E%3Cellipse cx='129' cy='70' rx='6' ry='4' fill='%23fff' opacity='.42'/%3E%3Cpath d='M60 111 C82 119 119 119 142 111' fill='none' stroke='%238b8585' stroke-width='5' stroke-linecap='round' opacity='.72'/%3E%3C/g%3E%3C/svg%3E";

export interface Shop {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  distance: string;
  distanceNum: number;
  tags: string[];
  price: string;
  priceMin: number;
  img: string;
  reason: string;
  facilities: string[];
  city: string;
  active?: boolean;
}

export const INITIAL_SHOPS: Shop[] = [
  {
    id: "kopiruanghati",
    name: "Kopi Ruang Hati",
    rating: 4.6,
    reviews: 230,
    distance: "1.2 km",
    distanceNum: 1.2,
    tags: ["Tenang", "Cozy", "WiFi"],
    price: "Rp 20.000 – 45.000",
    priceMin: 20000,
    img: unsplash("1600093463592-8e36ae95ef56"),
    reason: "Cocok untuk me time dan suasana santai yang menenangkan.",
    facilities: ["WiFi", "Stopkontak", "Parkir"],
    city: "Jakarta Selatan",
  },
  {
    id: "tanamera",
    name: "Tanamera Coffee",
    rating: 4.7,
    reviews: 186,
    distance: "2.1 km",
    distanceNum: 2.1,
    tags: ["Cozy", "Premium", "Tenang"],
    price: "Rp 25.000 – 60.000",
    priceMin: 25000,
    img: unsplash("1521017432531-fbd92d768814"),
    reason: "Cocok untuk menikmati kopi premium creamy dengan suasana yang sangat nyaman.",
    facilities: ["WiFi", "Stopkontak", "Parkir", "Outdoor", "Musholla"],
    city: "Jakarta Selatan",
  },
  {
    id: "kolektif",
    name: "Kolektif Space",
    rating: 4.5,
    reviews: 152,
    distance: "1.8 km",
    distanceNum: 1.8,
    tags: ["Work Friendly", "Stopkontak", "Tenang"],
    price: "Rp 20.000 – 50.000",
    priceMin: 20000,
    img: unsplash("1538333581680-29dd4752ddf2"),
    reason: "Sangat menunjang produktivitas dengan meeting room mumpuni namun tetap santai.",
    facilities: ["WiFi", "Stopkontak", "Parkir", "Meeting Room"],
    city: "Jakarta Pusat",
  },
  {
    id: "seeyou",
    name: "See You Coffee",
    rating: 4.4,
    reviews: 118,
    distance: "3.2 km",
    distanceNum: 3.2,
    tags: ["Estetik", "Cozy", "Outdoor"],
    price: "Rp 18.000 – 40.000",
    priceMin: 18000,
    img: unsplash("1542181961-9590d0c79dab"),
    reason: "Suasana outdoor asri dan estetik, sangat pas untuk berfoto & healing sejenak.",
    facilities: ["WiFi", "Outdoor", "Parkir"],
    city: "Bandung",
  },
  {
    id: "kopiselasar",
    name: "Kopi Selasar Jati",
    rating: 4.8,
    reviews: 340,
    distance: "0.8 km",
    distanceNum: 0.8,
    tags: ["Asri", "Tenang", "Healing"],
    price: "Rp 15.000 – 35.000",
    priceMin: 15000,
    img: unsplash("1447933601403-0c6688de566e"),
    reason: "Nikmati ketenangan menyeruput kopi dengan angin sepoi-sepoi khas Jogja di bawah rindangnya pohon jati.",
    facilities: ["WiFi", "Parkir", "Outdoor", "Musholla"],
    city: "Yogyakarta",
  },
  {
    id: "titiktemu",
    name: "Titik Temu Coffee",
    rating: 4.6,
    reviews: 215,
    distance: "4.5 km",
    distanceNum: 4.5,
    tags: ["Social Hub", "Premium", "Estetik"],
    price: "Rp 30.000 – 75.000",
    priceMin: 30000,
    img: unsplash("1501339847302-ac426a4a7cbb"),
    reason: "Sangat pas untuk bersosialisasi dan menikmati kopi kelas dunia di tengah taman terbuka tropis Bali.",
    facilities: ["WiFi", "Outdoor", "Parkir"],
    city: "Bali",
  },
  {
    id: "filosofikopi",
    name: "Filosofi Kopi Melawai",
    rating: 4.5,
    reviews: 512,
    distance: "2.5 km",
    distanceNum: 2.5,
    tags: ["Cozy", "Nongkrong", "Work Friendly"],
    price: "Rp 25.000 – 50.000",
    priceMin: 25000,
    img: unsplash("1498804103079-a6351b050096"),
    reason: "Tempat ikonik untuk berdiskusi santai tentang seni, kehidupan, dan cita rasa kopi manual brew terbaik.",
    facilities: ["WiFi", "Stopkontak", "Parkir"],
    city: "Jakarta Selatan",
  },
  {
    id: "seniman",
    name: "Seniman Coffee",
    rating: 4.9,
    reviews: 423,
    distance: "5.1 km",
    distanceNum: 5.1,
    tags: ["Premium", "Creative Space", "Healing"],
    price: "Rp 35.000 – 80.000",
    priceMin: 35000,
    img: unsplash("1495474472287-4d71bcdd2085"),
    reason: "Surganya pencinta kopi artisan dengan kursi goyang ikonik dan barista berlisensi internasional.",
    facilities: ["WiFi", "AC", "Meeting Room", "Parkir"],
    city: "Bali",
  },
  {
    id: "tokodjawa",
    name: "Kopi Toko Djawa Braga",
    rating: 4.7,
    reviews: 670,
    distance: "1.5 km",
    distanceNum: 1.5,
    tags: ["Estetik", "Vintage", "Nongkrong"],
    price: "Rp 15.000 – 30.000",
    priceMin: 15000,
    img: unsplash("1511920170033-f8396924c348"),
    reason: "Atmosfer vintage yang magis di Jalan Braga. Kopi susu legendaris dipadukan dengan wangi buku lama.",
    facilities: ["Indoor", "WiFi", "Parkir"],
    city: "Bandung",
  },
  {
    id: "lajukopi",
    name: "Laju Kopi Surabaya",
    rating: 4.4,
    reviews: 98,
    distance: "2.8 km",
    distanceNum: 2.8,
    tags: ["Minimalis", "Work Friendly", "Nugas"],
    price: "Rp 18.000 – 35.000",
    priceMin: 18000,
    img: unsplash("1554118811-1e0d58224f24"),
    reason: "Konsep arsitektur industrial modern yang sunyi, sangat mendukung fokus penuh untuk nugas serius.",
    facilities: ["WiFi", "Stopkontak", "AC", "Parkir"],
    city: "Surabaya",
  },
  {
    id: "giyanti",
    name: "Giyanti Coffee Roastery",
    rating: 4.8,
    reviews: 310,
    distance: "3.5 km",
    distanceNum: 3.5,
    tags: ["Premium", "Cozy", "Estetik"],
    price: "Rp 35.000 – 70.000",
    priceMin: 35000,
    img: unsplash("1517256064527-09c53b2d0bc6"),
    reason: "Kedai kopi bergaya eksentrik dengan biji kopi sangrai mandiri yang memiliki aroma buah yang segar.",
    facilities: ["WiFi", "Outdoor", "Indoor", "AC", "Parkir"],
    city: "Jakarta Pusat",
  },
  {
    id: "bumiayu",
    name: "Bumi Ayu Coffee Malang",
    rating: 4.6,
    reviews: 140,
    distance: "4.2 km",
    distanceNum: 4.2,
    tags: ["Healing", "Asri", "Malam"],
    price: "Rp 15.000 – 38.000",
    priceMin: 15000,
    img: unsplash("1507133750040-4a8f57021571"),
    reason: "Menikmati pemandangan pegunungan kota Malang dari area rooftop yang sejuk dengan secangkir kopi tubruk hangat.",
    facilities: ["WiFi", "Outdoor", "Musholla", "Parkir"],
    city: "Malang",
  },
  {
    id: "commongrounds",
    name: "Common Grounds",
    rating: 4.7,
    reviews: 280,
    distance: "3.9 km",
    distanceNum: 3.9,
    tags: ["Meeting", "Premium", "Work Friendly"],
    price: "Rp 30.000 – 65.000",
    priceMin: 30000,
    img: unsplash("1463797224155-85a921420247"),
    reason: "Tempat favorit bagi para profesional bisnis untuk mengadakan pertemuan formal dengan sajian hidangan brunch berkualitas tinggi.",
    facilities: ["Meeting Room", "WiFi", "Indoor", "AC", "Parkir"],
    city: "Surabaya",
  },
  {
    id: "klinikkopi",
    name: "Klinik Kopi Jogja",
    rating: 4.9,
    reviews: 490,
    distance: "2.2 km",
    distanceNum: 2.2,
    tags: ["Healing", "Tenang", "Asri"],
    price: "Rp 20.000 – 40.000",
    priceMin: 20000,
    img: unsplash("1508700115892-45ecd05ae2ad"),
    reason: "Bukan kedai kopi biasa. Di sini Anda akan berkonsultasi langsung dengan roaster tentang sejarah setiap biji kopi tanpa gula.",
    facilities: ["WiFi", "Outdoor", "Parkir"],
    city: "Yogyakarta",
  }
];

export const COFFEES = [
  {
    id: "vanilla-latte",
    name: "Vanilla Latte",
    rasa: "Creamy, manis ringan",
    kafein: 2,
    reason: "Cocok untuk mood santai and tidak terlalu pahit",
    img: unsplash("1503240778100-fd245e17a273", 300, 300),
    profile: { manis: 75, creamy: 85, strong: 40, pahit: 30, segar: 50 }
  },
  {
    id: "caramel-macchiato",
    name: "Caramel Macchiato",
    rasa: "Manis, creamy",
    kafein: 2,
    reason: "Cocok untuk melepas capek dengan rasa yang lembut manis",
    img: unsplash("1563311977-d285756282dc", 300, 300),
    profile: { manis: 90, creamy: 90, strong: 30, pahit: 20, segar: 40 }
  },
  {
    id: "iced-latte",
    name: "Iced Latte",
    rasa: "Ringan, creamy, segar",
    kafein: 2,
    reason: "Cocok untuk suasana santai dan me time menyegarkan",
    img: unsplash("1578314675249-a6910f80cc4e", 300, 300),
    profile: { manis: 50, creamy: 75, strong: 50, pahit: 40, segar: 80 }
  },
  {
    id: "kopisusu-aren",
    name: "Kopi Susu Aren",
    rasa: "Gurih, manis legit, strong",
    kafein: 3,
    reason: "Cocok untuk nambah energi dan produktivitas harian",
    img: unsplash("1517701604599-bb29b565090c", 300, 300),
    profile: { manis: 80, creamy: 70, strong: 70, pahit: 55, segar: 30 }
  },
  {
    id: "espresso",
    name: "Double Espresso",
    rasa: "Sangat pahit, pekat, asam halus",
    kafein: 5,
    reason: "Cocok untuk fokus total, nugas semalaman, anti-ngantuk",
    img: unsplash("1514432324607-a09d9b4aefdd", 300, 300),
    profile: { manis: 0, creamy: 0, strong: 100, pahit: 95, segar: 20 }
  },
];

export const CATEGORIES = [
  { id: "Nugas", label: "Nugas", icon: nugasIcon },
  { id: "Meeting", label: "Meeting", icon: meetingIcon },
  { id: "Date", label: "Date", icon: dateIcon },
  { id: "Nongkrong", label: "Nongkrong", icon: nongkrongIcon },
  { id: "Healing", label: "Healing", icon: healingIcon },
  { id: "Malam", label: "Malam Hari", icon: malamIcon },
];

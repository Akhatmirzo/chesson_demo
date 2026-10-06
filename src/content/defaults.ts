import type { LandingData } from './types';

/**
 * Server javob bermaguncha (yoki build vaqtida API yo'q bo'lsa) ko'rinadigan ma'lumot.
 * Haqiqiy qiymatlar admin panelidagi «Sayt» sahifasidan keladi — bu yerdagilar faqat zaxira.
 */
export const DEFAULT_LANDING: LandingData = {
  promo: null,
  plans: [],
  coaches: [
    { id: 'c1', name: 'Elbek Jumanov', title: 'FM · 2155 reyting', experience: "7 yillik tajriba · 200+ o'quvchi tayyorlagan.", languages: 'Rus · Uzb tillarida dars beradi', photoUrl: '/coaches/coach-1.webp' },
    { id: 'c2', name: 'Jamshidbek Aytimbetov', title: 'FM · 2048 reyting', experience: "4 yillik tajriba · 300+ o'quvchi tayyorlagan.", languages: 'Rus · Uzb tillarida dars beradi', photoUrl: '/coaches/coach-2.webp' },
    { id: 'c3', name: 'Gulchekhra Abdukholikova', title: 'KMC · 1586 reyting', experience: "6 yillik tajriba · 400+ o'quvchi tayyorlagan.", languages: 'Uzb tilida dars beradi', photoUrl: '/coaches/coach-3.webp' },
    { id: 'c4', name: 'Inomjon Shaymuratov', title: 'FM · 2101 reyting', experience: "6 yillik tajriba · 500+ o'quvchi tayyorlagan.", languages: 'Uzb · Rus tillarida dars beradi', photoUrl: '/coaches/coach-9.webp' },
    { id: 'c5', name: 'Erkinov Rustambek', title: 'FM · 1927 reyting', experience: "3 yillik tajriba · 200+ o'quvchi tayyorlagan.", languages: 'Uzb · Rus · Eng tillarida dars beradi', photoUrl: '/coaches/coach-5.webp' },
    { id: 'c6', name: 'Rano Abdukholikova', title: 'KM · 1831 reyting', experience: "4 yillik tajriba · 150+ o'quvchi tayyorlagan.", languages: 'Uzb tilida dars beradi', photoUrl: '/coaches/coach-8.webp' },
    { id: 'c7', name: 'Sanjar Eshpolatov', title: 'Chess On · Murabbiy', experience: "3 yillik tajriba · 200+ o'quvchi tayyorlagan.", languages: 'Uzb tilida dars beradi', photoUrl: '/coaches/coach-4.webp' },
  ],
  stats: [
    { value: '2,400+', label: "O'quvchilar" },
    { value: '18', label: 'Sertifikatli murabbiy' },
    { value: '4.9★', label: 'Ota-onalar bahosi' },
  ],
  contacts: {
    phones: ['+998 88 102 22 62', '+998 50 760 03 00'],
    email: 'admin@chesson.uz',
    address: "Toshkent, O'zbekiston",
  },
  faq: [
    { q: 'Onlayn shaxmat darsi samaralimi?', a: "Ha! Darslar o'zimizning interaktiv platformamizda jonli o'tadi: ustoz taxtada ko'rsatadi, bola o'zi yuradi, savol beradi. Darsdan keyin uyga vazifa, boshqotirmalar va o'yinlar bilan mustahkamlaydi." },
    { q: 'Necha yoshdan boshlash mumkin?', a: "5 yoshdan boshlab. Kichiklarga o'yin shaklida, kattaroq va musobaqaga tayyorlanayotganlarga chuqurlashtirilgan strategik metodika bilan o'tiladi." },
    { q: 'Bola shaxmatni umuman bilmasa-chi?', a: "Muammo emas. Birinchi dars — bepul diagnostika: ustoz bolaning darajasini aniqlab, mos guruh va dasturni tavsiya qiladi." },
    { q: 'Darslar qancha davom etadi va qachon bo\'ladi?', a: "Davomiyligi va jadvali tanlangan tarifga bog'liq. Qulay vaqtni bepul darsda ustoz bilan kelishasiz, jadval esa platformada va Telegram'da ko'rinib turadi." },
    { q: 'Birinchi dars rostdan ham bepulmi?', a: "Ha, 100% bepul va hech qanday majburiyatsiz. Davom etish qarori butunlay sizniki." },
  ],
};

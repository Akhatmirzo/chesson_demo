import type { Spot } from '@/components/Hotspots';

export interface ShowcaseStep {
  id: string;
  label: string;
  title: string;
  text: string;
  shot: string;
  alt: string;
  spots: Spot[];
}

/** O'quvchi paneli ekranlari — haqiqiy platformadan skrinshotlar. Nuqtalar foizda (16:10 rasm ustida). */
export const SHOWCASE: ShowcaseStep[] = [
  {
    id: 'bosh',
    label: 'Bosh sahifa',
    title: 'Har kuni nima qilishni biladi',
    text: "Keyingi dars, bugungi tangalar, daraja va uyga vazifa — bola tizimga kirishi bilan hammasini bir qarashda ko'radi.",
    shot: 'kid-home',
    alt: "O'quvchi bosh sahifasi",
    spots: [
      { x: 45, y: 33, title: 'Keyingi dars', text: 'Vaqti, guruhi va ustozi. Dars boshlanganda shu yerda «Darsga kirish» tugmasi chiqadi.' },
      { x: 45, y: 73, title: 'Bugungi tangalar', text: "Zadacha, o'yin g'alabasi va ustoz bonusi uchun tanga yig'adi — har kungi kichik maqsad." },
      { x: 83, y: 26, title: 'Daraja', text: "XP yig'ib Piyodadan Ot, Fil, Ruh va Farzin darajasiga ko'tariladi." },
      { x: 83.5, y: 52, title: 'Uyga vazifa', text: "Ustoz bergan topshiriqlar. Hammasi bajarilsa — «Dam ol!»" },
    ],
  },
  {
    id: 'jadval',
    label: 'Jadval va dars',
    title: 'Darsga bitta tugma bilan kiradi',
    text: "Hech qanday Zoom havolasi yoki parol kerak emas. Ustoz darsni boshlashi bilan yashil «Dars xonasiga kirish» tugmasi paydo bo'ladi.",
    shot: 'kid-schedule',
    alt: "Jadval va «Dars xonasiga kirish» tugmasi",
    spots: [
      { x: 45, y: 51, title: 'Dars xonasiga kirish', text: "Bosadi — va darhol ustoz bilan jonli darsda. Sahifani yangilash ham shart emas." },
      { x: 65, y: 33, title: 'LIVE', text: 'Dars hozir ketayotganini ko\'rsatadi.' },
      { x: 58, y: 20, title: 'Haftalik jadval', text: 'Qaysi kuni dars borligi bir qarashda.' },
      { x: 83.5, y: 37, title: 'Davomat', text: "Bu oy nechta darsga qatnashgani va ketma-ketlik seriyasi." },
    ],
  },
  {
    id: 'oyin',
    label: "O'yin",
    title: "Kompyuter va sinfdoshlar bilan o'ynaydi",
    text: "Chumolidan Ustagacha 8 ta raqib, vaqt nazorati va yordamlar. O'rgangan bilimini darhol amalda sinaydi.",
    shot: 'kid-play',
    alt: "O'ynash sahifasi: raqib, rang va vaqt tanlash",
    spots: [
      { x: 44.5, y: 43, title: '8 ta raqib', text: "Har birining o'z darajasi bor. Yutsa — kartasida yulduzcha paydo bo'ladi." },
      { x: 42, y: 13, title: "O'quvchilar bilan", text: "Sinfdoshlari bilan onlayn o'ynaydi. Har g'alaba +1 tanga." },
      { x: 83, y: 72, title: 'Maslahat', text: "Qiynalsa — eng yaxshi yurishni ko'rsatadi. Yurishni qaytarish ham mumkin." },
      { x: 83, y: 46, title: "O'yin vaqti", text: "Vaqtsiz — shoshmasdan o'ylash uchun, yoki 5, 10, 15 daqiqa." },
    ],
  },
  {
    id: 'boshqotirma',
    label: 'Boshqotirma',
    title: 'Har kuni zadacha — har biri +1 tanga',
    text: "5 ta qiyinlik darajasi, cheksiz zadachalar va «Hotira mashqi». Bola o'zi xohlab qayta-qayta kiradi.",
    shot: 'kid-puzzles',
    alt: 'Boshqotirma: 5 ta qiyinlik darajasi',
    spots: [
      { x: 58, y: 45, title: '5 ta daraja', text: "1 yurishda matdan murakkab etyudlargacha. O'ziga mosini tanlaydi." },
      { x: 41, y: 20, title: 'Kunlik maqsad', text: 'Har yechilgan zadacha uchun +1 tanga.' },
      { x: 37, y: 6, title: 'Hotira mashqi', text: 'Pozitsiyani eslab qolib, taxtada tiklaydi — diqqat va xotira uchun.' },
      { x: 85.5, y: 68, title: 'Davom etish', text: "Boshlagan joyidan davom ettiradi." },
    ],
  },
  {
    id: 'profil',
    label: 'Profil',
    title: "O'sishini raqamlarda ko'radi",
    text: "Daraja yo'li, reyting, jami XP, kunlik seriya, medallar va so'nggi o'yinlar — bola ham, ota-ona ham natijani ko'radi.",
    shot: 'kid-profile',
    alt: "O'quvchi profili: daraja, reyting, medallar",
    spots: [
      { x: 58.5, y: 46, title: "Daraja yo'li", text: 'Piyoda → Ot → Fil → Ruh → Farzin. Keyingi darajagacha qancha XP qolgani yozilgan.' },
      { x: 58, y: 63, title: "Ko'rsatkichlar", text: 'Reyting, jami XP, kunlik seriya va davomat foizi.' },
      { x: 43.5, y: 86, title: 'Medallar', text: "Birinchi g'alaba, 7 kunlik seriya va boshqa yutuqlar uchun." },
      { x: 82, y: 88, title: "So'nggi o'yinlar", text: "Kim bilan o'ynagani va natijasi." },
    ],
  },
];

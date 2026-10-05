# Aqlli Yurish — online shaxmat maktabi (landing page)

Bitta sahifali, statik eksport qilinadigan landing: Next.js 16 + TypeScript + Tailwind CSS 4 + GSAP (ScrollTrigger, SplitText) + Lenis + @react-three/fiber / drei + lucide-react.

## Ishga tushirish

Node.js 20+ kerak.

```bash
npm install
```

```bash
npm run dev
```

Brauzerda: http://localhost:3000

### Production build (statik fayllar)

```bash
npm run build
```

Natija `out/` papkasida — uni istalgan statik hostingga (Netlify, Vercel, Cloudflare Pages, GitHub Pages, oddiy Nginx) yuklash mumkin. Lokal ko'rish:

```bash
npm start
```

Brauzerda: http://localhost:4000

## Kontentni qayerdan o'zgartirish

**Hamma matn, narx, raqam, ism va kontakt — bitta faylda: [`src/content/site.ts`](src/content/site.ts).**

| Nima | `site.ts` dagi joyi |
| --- | --- |
| Maktab nomi, shior, telefon, Telegram, email | `brand` |
| Hero sarlavha, matn, tugmalar | `hero` |
| "Online dars qanday o'tadi" 4 qadam | `steps` |
| Kurslar (3 daraja) va kattalar kursi | `courses` |
| Narxlar (3 tarif) | `pricing` |
| Murabbiylar | `coaches` |
| Natijalar (4 raqam) | `stats` |
| "Bir yurishda mat" mashqi (pozitsiya + javoblar) | `puzzle` |
| Ota-onalar fikrlari | `testimonials` |
| FAQ | `faq` |
| Forma variantlari va "rahmat" xabari | `signup` |

⚠️ Hozirgi narxlar, raqamlar, murabbiylar, fikrlar va kontaktlar — **NAMUNA**. Haqiqiy ma'lumotlarni kiritgach, `site.ts` boshidagi `showSampleBadges` ni `false` qiling — saytdagi "namuna" belgilari yo'qoladi.

Yozuv bo'yicha eslatma: `oʻ`, `gʻ` uchun `ʻ` (U+02BB), tutuq belgisi uchun `ʼ` (U+02BC) ishlatilgan. Sarlavha shrifti (Nunito) bu belgilarni keng bo'shliq bilan chizgani uchun sarlavhalarda ular avtomatik ravishda ko'rinishi bir xil `‘ ’` belgilariga almashtiriladi (`src/lib/typo.ts`) — siz `site.ts` da to'g'ri harflarni yozavering.

### Mat mashqini o'zgartirish

`puzzle.board` — 8 ta qator (8-qatordan 1-qatorgacha), `K Q R B N P` — oq, `k q r b n p` — qora, `.` — bo'sh katak. Har bir javob variantida `from`/`to` (masalan `d1` → `d8`) va `correct: true/false`. To'g'ri javobda figura `from` dan `to` ga suriladi. Pozitsiya haqiqatan "bir yurishda mat" ekanini o'zingiz tekshiring. Ekran o'quvchi uchun pozitsiya tavsifi `src/components/sections/Puzzle.tsx` dagi `aria-label` da — pozitsiyani o'zgartirsangiz, uni ham yangilang.

### Rasmlar

`public/photos/` — har bir rasm ikki o'lchamda (`-800.webp`, `-1200.webp`). Yangi rasm qo'shsangiz, shu nomlash tartibida qo'ying va komponentdagi `name` ni o'zgartiring. Manbalar va litsenziyalar — [`CREDITS.md`](CREDITS.md).

## Ariza formasi

Forma `.env` orqali sozlanadi (`.env.example` dan nusxa oling → `.env.local`):

- **Formspree:** `NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/xxxx`
- **Web3Forms:** `NEXT_PUBLIC_FORM_ENDPOINT=https://api.web3forms.com/submit` va `NEXT_PUBLIC_FORM_ACCESS_KEY=...`
- **Hech biri bo'lmasa:** "Yozilish" bosilganda ariza matni bilan Telegram ochiladi (`brand.telegram`).

Telefon `+998 XX XXX XX XX` formatida tekshiriladi. `.env` qiymatlari build vaqtida kodga yoziladi — o'zgartirgach `npm run build` ni qayta ishga tushiring.

## Tezlik bo'yicha qarorlar

- **3D faqat hero'da, bitta canvas.** Three.js alohida chunk; desktopda foydalanuvchining birinchi harakatida (sichqoncha, scroll, klaviatura) yuklanadi. Ungacha 3D sahnaning aynan birinchi kadri bo'lgan poster turadi, farq ko'rinmaydi.
- **Mobil / zaif qurilma / reduced-motion** — 3D yo'q, statik poster (`public/poster/king-m.webp`).
- **GSAP va Lenis** boshlang'ich JS'ga kirmaydi: desktopda hydration'dan keyin, mobilda birinchi scroll/tegishda yuklanadi. Touch qurilmalarda Lenis o'chiq (native scroll).
- **Animatsiyalar** faqat `transform` va `opacity`; har biri bo'lim ekranga yaqinlashganda ishga tushadi; `prefers-reduced-motion` da hammasi o'chadi.
- Ekrandan tashqaridagi bo'limlar `content-visibility: auto` bilan (`globals.css` dagi `.cv`). Bo'lim balandligi ko'p o'zgarsa, u yerdagi `--cis` qiymatlarini yangilang (anchor havolalar aniq ishlashi uchun).
- Body shrifti (Inter) sahifa chizilgandan keyin yuklanadi; sarlavha shrifti (Nunito 900) — oldindan.

Lighthouse'ni lokal tekshirish (`npm start` ishlab turgan bo'lishi kerak, Chrome o'rnatilgan bo'lsin):

```bash
npm run lighthouse
```

## Dev yordamchi skriptlar (`scripts/`)

| Skript | Vazifasi |
| --- | --- |
| `extract-king.mjs` | `ABeautifulGame.glb` dan faqat qirolni ajratib, siqadi → `public/models/king.glb` |
| `shrink-hdr.mjs` | HDRI ni 2x kichraytiradi |
| `shot.mjs` | Headless Chrome orqali skrinshot (desktop/mobil, bo'limlar bo'yicha) |
| `sheet.mjs` | Skrinshotlarni bitta varaqqa yig'adi |
| `make-poster.mjs` | Render qilingan PNG dan poster WebP'larini yaratadi |
| `lh.sh` | Lighthouse (mobil + desktop) |

### Posterni qayta yaratish

3D sahna (kamera, yorug'lik) o'zgarsa, poster ham yangilanishi kerak:

1. `npm run dev`
2. `node scripts/shot.mjs http://localhost:3000/poster-gen scripts/.poster.png 720 1200 --transparent --wait=window.__ready --delay=2000`
3. `node scripts/make-poster.mjs` — `public/poster/king.webp` va `king-m.webp` ni yaratadi.

`/poster-gen` sahifasi faqat dev rejimda mavjud (`*.dev.tsx`), production build'ga kirmaydi.

## Tuzilma

```
src/
  app/            layout.tsx, page.tsx, globals.css, icon.svg
  content/site.ts ← BUTUN KONTENT
  components/
    hero/         Hero.tsx (poster + 3D), KingScene.tsx (R3F sahna)
    sections/     Steps, Courses, Pricing, Coaches, Stats, Puzzle, Testimonials, Faq, Signup
    ui/           SectionHeading, Photo, ChessPiece
    ScrollAnimations.tsx  — barcha scroll animatsiyalari (data-* atributlar orqali)
    SmoothScroll.tsx, DeferredFonts.tsx, Header.tsx, Footer.tsx, Logo.tsx
  lib/            motion.ts (GSAP yuklash), gsap.ts, typo.ts, format.ts
public/
  models/king.glb, hdri/, poster/, photos/, logo.svg
```

# Chesson — sotuv landing sahifasi (demo)

Bolalar uchun onlayn shaxmat maktabi Chesson'ning ota-onalar va bolalar uchun landing sahifasi.
Next.js 16 (statik eksport) + React 19 + CSS Modules. Murakkab animatsiyalar (GSAP) faqat kompyuterda yuklanadi, telefonda — yengil CSS animatsiyalar.

Bu — demo nusxa (Vercel). Asosiy kod `chesson_v2` monoreposida `apps/landing` papkasida.

## Ishga tushirish

```bash
npm install
npm run dev
```

Brauzerda: http://localhost:3100

```bash
npm run build
```

Natija — `out/` papkasida (statik fayllar).

## Ma'lumotlar

Aksiya, tariflar, raqamlar, aloqa, murabbiylar va savollar platforma API'sidan keladi (`GET /api/public/landing`, admin panelidagi «Sayt» sahifasidan tahrirlanadi).
API bo'lmasa `src/content/defaults.ts` dagi zaxira ma'lumot ko'rsatiladi.
Ariza formasi `POST /api/public/leads` ga yuboradi.

API manzili: `NEXT_PUBLIC_API_BASE` (masalan `https://chesson.uz/api`). Bo'sh bo'lsa — saytning o'z domeni `/api`.

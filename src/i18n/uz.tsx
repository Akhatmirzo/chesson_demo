/**
 * O'zbekcha matnlar (asosiy til, `/`). Ruscha (`/ru`) — `ru.tsx`, shu shaklda (`Dict`).
 * Admin «Sayt»dan o'zgaradigan matnlar (aksiya, tariflar, murabbiylar, raqamlar, savollar) bu yerda emas — serverdan keladi.
 * Ro'yxatlar komponentdagi ikonka/rasm ro'yxati bilan bir xil tartibda.
 */
export const uz = {
  meta: {
    title: 'Chesson — bolalar uchun onlayn shaxmat maktabi',
    // ~150 belgi: Google qidiruv natijasida qisqartirmasdan ko'rsatadi
    description:
      "Bolalar uchun onlayn shaxmat maktabi: tajribali murabbiylar bilan jonli darslar, o'yin va boshqotirmalar, ota-onalar uchun davomat. Birinchi dars bepul.",
    keywords: ['shaxmat maktabi', 'bolalar uchun shaxmat', 'onlayn shaxmat darslari', 'shaxmat murabbiyi', 'Toshkent shaxmat', 'Chesson'],
    ogAlt: 'Chesson platformasi',
    orgAlternateName: 'Chesson onlayn shaxmat maktabi',
    country: "O'zbekiston",
    city: 'Toshkent',
    notFoundTitle: 'Sahifa topilmadi — Chesson',
  },
  common: {
    logoAlt: 'Chesson — online shaxmat maktabi',
    close: 'Yopish',
    currency: "so'm",
  },
  lang: { label: 'Til', uz: "O'zbekcha", ru: 'Русский' },
  header: {
    home: 'Chesson — bosh sahifa',
    navLabel: 'Asosiy navigatsiya',
    nav: ['Platforma', 'Jonli dars', 'Ota-onalar', 'Murabbiylar', 'Savollar'],
    login: 'Kirish',
    cta: 'Bepul dars',
    menuOpen: 'Menyu',
    menuClose: 'Menyuni yopish',
    sheetLogin: 'Platformaga kirish',
    sheetCta: 'Bepul darsga yozilish',
  },
  hero: {
    chip: 'Birinchi dars — bepul va majburiyatsiz',
    title: [{ w: 'Farzandingiz' }, { w: 'uchun' }, { w: 'birinchi', grad: true }, { w: 'bepul', grad: true }, { w: 'shaxmat' }, { w: 'darsi' }] as { w: string; grad?: boolean }[],
    sub: (
      <>
        Farzandingizda <b>mantiq, diqqat va strategik fikrlashni</b> rivojlantiring. Tajribali ustozlar bilan jonli onlayn darslar, o&apos;yin va
        boshqotirmalar bilan qiziqarli platforma.
      </>
    ),
    cta: 'Bepul darsga yozilish',
    see: "Platformani ko'rish",
    shotAlt: "O'quvchi paneli: keyingi dars, bugungi tangalar, daraja va uyga vazifa",
    phoneAlt: "Telefondagi o'quvchi paneli",
    streak: ['Kunlik seriya', '12 kun'],
    coins: ['Dars uchun', '+10 tanga'],
    xp: ['Ot darajasigacha', '73 XP'],
  },
  why: {
    eyebrow: 'Nega shaxmat?',
    title: (
      <>
        Ekranga qaramlik o&apos;rniga — <span className="grad-text">fikrlash</span>
      </>
    ),
    lead: "Shaxmat — bolaning kelajagi uchun eng foydali «ekran vaqti». Har bir dars uchta muhim ko'nikmani rivojlantiradi.",
    cards: [
      {
        title: 'Diqqat va xotira',
        text: "Telefon o'yinlaridan chalg'ib, e'tiborini bir joyga jamlashni va ma'lumotlarni tezda eslab qolishni o'rganadi.",
      },
      {
        title: 'Mantiq va hisob-kitob',
        text: "Har bir yurishni 3–4 qadam oldindan rejalashtirish orqali aniq fanlar va matematikaga bo'lgan qiziqishi ortadi.",
      },
      {
        title: "G'alaba va sabr xarakteri",
        text: "Mag'lubiyatni to'g'ri qabul qilish, mas'uliyatni o'z zimmasiga olish va qiyinchilikda shoshmaslikni shakllantiradi.",
      },
    ],
  },
  showcase: {
    eyebrow: 'Bizning platforma',
    title: (
      <>
        O&apos;quvchi uchun <span className="grad-text">to&apos;liq onlayn muhit</span>
      </>
    ),
    lead: "Chesson — bu shunchaki dars emas. Bola o'ynaydi, mashq qiladi, tanga yig'adi va o'z o'sishini kuzatib boradi.",
    tabsLabel: "Platforma bo'limlari",
    prev: 'Oldingi',
    next: 'Keyingi',
    hint: "Raqamli nuqtalarni bosib ko'ring",
    steps: [
      {
        label: 'Bosh sahifa',
        title: 'Har kuni nima qilishni biladi',
        text: "Keyingi dars, bugungi tangalar, daraja va uyga vazifa — bola tizimga kirishi bilan hammasini bir qarashda ko'radi.",
        alt: "O'quvchi bosh sahifasi",
        spots: [
          { title: 'Keyingi dars', text: 'Vaqti, guruhi va ustozi. Dars boshlanganda shu yerda «Darsga kirish» tugmasi chiqadi.' },
          { title: 'Bugungi tangalar', text: "Zadacha, o'yin g'alabasi va ustoz bonusi uchun tanga yig'adi — har kungi kichik maqsad." },
          { title: 'Daraja', text: "XP yig'ib Piyodadan Ot, Fil, Ruh va Farzin darajasiga ko'tariladi." },
          { title: 'Uyga vazifa', text: 'Ustoz bergan topshiriqlar. Hammasi bajarilsa — «Dam ol!»' },
        ],
      },
      {
        label: 'Jadval va dars',
        title: 'Darsga bitta tugma bilan kiradi',
        text: "Hech qanday Zoom havolasi yoki parol kerak emas. Ustoz darsni boshlashi bilan yashil «Dars xonasiga kirish» tugmasi paydo bo'ladi.",
        alt: 'Jadval va «Dars xonasiga kirish» tugmasi',
        spots: [
          { title: 'Dars xonasiga kirish', text: 'Bosadi — va darhol ustoz bilan jonli darsda. Sahifani yangilash ham shart emas.' },
          { title: 'LIVE', text: "Dars hozir ketayotganini ko'rsatadi." },
          { title: 'Haftalik jadval', text: 'Qaysi kuni dars borligi bir qarashda.' },
          { title: 'Davomat', text: 'Bu oy nechta darsga qatnashgani va ketma-ketlik seriyasi.' },
        ],
      },
      {
        label: "O'yin",
        title: "Kompyuter va sinfdoshlar bilan o'ynaydi",
        text: "Chumolidan Ustagacha 8 ta raqib, vaqt nazorati va yordamlar. O'rgangan bilimini darhol amalda sinaydi.",
        alt: "O'ynash sahifasi: raqib, rang va vaqt tanlash",
        spots: [
          { title: '8 ta raqib', text: "Har birining o'z darajasi bor. Yutsa — kartasida yulduzcha paydo bo'ladi." },
          { title: "O'quvchilar bilan", text: "Sinfdoshlari bilan onlayn o'ynaydi. Har g'alaba +1 tanga." },
          { title: 'Maslahat', text: "Qiynalsa — eng yaxshi yurishni ko'rsatadi. Yurishni qaytarish ham mumkin." },
          { title: "O'yin vaqti", text: "Vaqtsiz — shoshmasdan o'ylash uchun, yoki 5, 10, 15 daqiqa." },
        ],
      },
      {
        label: 'Boshqotirma',
        title: 'Har kuni zadacha — har biri +1 tanga',
        text: "5 ta qiyinlik darajasi, cheksiz zadachalar va «Hotira mashqi». Bola o'zi xohlab qayta-qayta kiradi.",
        alt: 'Boshqotirma: 5 ta qiyinlik darajasi',
        spots: [
          { title: '5 ta daraja', text: "1 yurishda matdan murakkab etyudlargacha. O'ziga mosini tanlaydi." },
          { title: 'Kunlik maqsad', text: 'Har yechilgan zadacha uchun +1 tanga.' },
          { title: 'Hotira mashqi', text: 'Pozitsiyani eslab qolib, taxtada tiklaydi — diqqat va xotira uchun.' },
          { title: 'Davom etish', text: 'Boshlagan joyidan davom ettiradi.' },
        ],
      },
      {
        label: 'Profil',
        title: "O'sishini raqamlarda ko'radi",
        text: "Daraja yo'li, reyting, jami XP, kunlik seriya, medallar va so'nggi o'yinlar — bola ham, ota-ona ham natijani ko'radi.",
        alt: "O'quvchi profili: daraja, reyting, medallar",
        spots: [
          { title: "Daraja yo'li", text: 'Piyoda → Ot → Fil → Ruh → Farzin. Keyingi darajagacha qancha XP qolgani yozilgan.' },
          { title: "Ko'rsatkichlar", text: 'Reyting, jami XP, kunlik seriya va davomat foizi.' },
          { title: 'Medallar', text: "Birinchi g'alaba, 7 kunlik seriya va boshqa yutuqlar uchun." },
          { title: "So'nggi o'yinlar", text: "Kim bilan o'ynagani va natijasi." },
        ],
      },
    ],
  },
  live: {
    eyebrow: 'Jonli dars',
    // o'rtadagi so'z ajratib ko'rsatiladi (CSS modul sinfi komponentda)
    title: ['Ustoz bilan xuddi', 'yonma-yon', "o'tirgandek"] as [string, string, string],
    lead: "Darslar o'zimizning dars xonamizda o'tadi — Zoom'siz, havolasiz. Kompyuter, planshet yoki telefonda brauzer bo'lsa yetarli.",
    points: [
      { title: 'Umumiy taxta', text: "Ustoz yurgan har bir yurish, chizgan o'q va belgi bolaning ekranida darhol ko'rinadi." },
      { title: "Qo'l ko'tarish va yurish huquqi", text: "Savoli bo'lsa qo'l ko'taradi. Ustoz ruxsat bersa — taxtada o'zi yuradi." },
      { title: 'Kamera, ovoz va chat', text: "Ustozni ko'rib, eshitib o'tiradi. Uyalchan bola chatda yozishi ham mumkin." },
      { title: 'Guruhda yoki yakkama-yakka', text: "Kichik guruhlarda yoki individual — bolangizga qaysi qulay bo'lsa." },
    ],
    caption: "Bu — haqiqiy dars xonasining jonli namunasi. «Qo'l ko'tarish»ni bosib ko'ring.",
  },
  classroom: {
    title: 'Guruh darsi · Debyut-1',
    meta: 'Ustoz Elbek Jumanov · 57 daqiqa qoldi',
    board: 'Taxta',
    gallery: 'Galereya',
    exit: 'Chiqish',
    boardAria: "Ustoz taxtada Italyan o'yinini ko'rsatmoqda: o'qlar f7 katakka ishora qiladi",
    teacher: 'Elbek Jumanov',
    me: 'Timur (siz)',
    handRaised: "Qo'l ko'tarilgan",
    who: { ustoz: 'Ustoz', siz: 'Siz' },
    raise: "Qo'l ko'tarish",
    lower: "Qo'lni tushirish",
    chat: {
      hello: "Salom, Timur! Bugun ochilishdagi tuzoqlarni o'rganamiz 👋",
      question: 'Ot g5 ga borsa — qaysi katak himoyasiz qoladi? 🤔',
      raised: "✋ Timur qo'l ko'tardi",
      answer: 'f7! U yerni faqat shoh himoya qilyapti',
      praise: 'Barakalla! 🎉 +2 tanga',
    },
  },
  parents: {
    eyebrow: 'Ota-onalar uchun',
    title: (
      <>
        Farzandingiz qanday o&apos;qiyotgani — <span className="grad-text">doim ko&apos;z oldingizda</span>
      </>
    ),
    lead: "Alohida ota-ona paneli: davomat, uyga vazifa, to'lovlar va bolaning yutuqlari. Savol berib, kutib o'tirish shart emas.",
    tabsLabel: "Ota-ona paneli bo'limlari",
    tabs: [
      {
        label: 'Bosh sahifa',
        alt: 'Ota-ona paneli: farzandlar, keyingi dars va bugungi holat',
        spots: [
          { title: 'Farzandlar', text: 'Bir nechta farzand bitta hisobda — ismini bosib almashtirasiz.' },
          { title: 'Bugun nima qildi', text: "Nechta zadacha yechdi, o'yinda yutdimi, ustoz bonus berdimi." },
          { title: 'Uyga vazifa', text: "Bajarilganmi, muddati o'tdimi — darhol ko'rinadi." },
          { title: "Qo'shimcha bo'limlar", text: "Ota-onada alohida «Davomat» va «To'lovlar» bo'limlari bor." },
        ],
      },
      {
        label: 'Davomat',
        alt: "Davomat: foiz, keldi / kech qoldi / yo'q va darslar ro'yxati",
        spots: [
          { title: 'Davomat foizi', text: 'Nechta darsdan nechtasida qatnashgani.' },
          { title: 'Batafsil', text: "Keldi, kech qoldi, sababli va sababsiz yo'q — alohida sanaladi." },
          { title: 'Har bir dars', text: "Sana, vaqt, ustoz va holat. Kechikkan bo'lsa — necha daqiqa." },
          { title: 'Davr', text: "Shu oy, o'tgan oy, 30 yoki 90 kun." },
        ],
      },
      {
        label: "To'lovlar",
        alt: "To'lovlar: qolgan darslar, hisoblar va dars paketlari",
        spots: [
          { title: 'Qolgan darslar', text: 'Paketda nechta dars qolgani va qachongacha amal qilishi.' },
          { title: 'Hisoblar', text: "Har bir to'lov: summa, sana va holat." },
          { title: 'Dars paketlari', text: "Har paket bo'yicha sarflangan va qolgan darslar." },
        ],
      },
    ],
    points: [
      { title: 'Bir hisob — bir nechta farzand', text: 'Har biriga alohida login shart emas.' },
      { title: 'Shaffof davomat', text: 'Har bir dars holati — kunma-kun.' },
      { title: "To'lov va qolgan darslar", text: "Qancha to'langan, nechta dars qolgan — aniq." },
      { title: 'Telegram bildirishnomalari', text: "Dars eslatmasi, yangi vazifa, to'lov qabul qilindi." },
    ],
    tgLabel: 'Telegram bildirishnomalari namunasi',
    tg: [
      { t: 'Ertaga 17:00 da dars bor', d: "Aziza · Boshlang'ich-1 · Ustoz Ali Valiyev" },
      { t: 'Yangi uyga vazifa', d: "Kompyuterga qarshi 3 ta o'yin · +10 tanga" },
      { t: "To'lov qabul qilindi ✅", d: "1 100 000 so'm · 12 dars qo'shildi" },
    ],
  },
  motivation: {
    eyebrow: 'Motivatsiya',
    title: (
      <>
        O&apos;qish — <span className="grad-text">o&apos;yindek qiziqarli</span>
      </>
    ),
    lead: "Tanga, XP, darajalar va medallar bolani har kuni o'zi xohlab shaxmatga qaytaradi. Yig'ilgan tangalarga do'kondan sovg'a oladi.",
    levelsTitle: 'Piyodadan Farzingacha',
    levelsText: "Har bir dars, vazifa va zadacha XP beradi — bola darajama-daraja ko'tariladi.",
    levels: ['Piyoda', 'Ot', 'Fil', 'Ruh', 'Farzin'],
    earnTitle: "Tanga qanday yig'iladi?",
    earnText: "Do'kondan avatar, unvon va sovg'alar olish uchun.",
    earn: [
      ['Zadacha', '+1'],
      ["O'yinda g'alaba", '+1'],
      ['Darsda qatnashish', '+10'],
      ['Uyga vazifa', '10 gacha'],
      ['7 kunlik seriya', '+20'],
      ['Ustoz bonusi', '+1–5'],
    ] as [string, string][],
    medalsTitle: 'Medallar',
    medalsText: "Birinchi g'alaba, 7 kunlik seriya, «Boshqotirma qiroli»…",
    oppsTitle: '8 ta raqib — chumolidan sherga',
    oppsText: "Kompyuter raqiblari bola bilan birga «o'sadi».",
  },
  coaches: {
    eyebrow: 'Murabbiylar',
    title: (
      <>
        Farzandingizga saboq beradigan <span className="grad-text">tajribali ustozlar</span>
      </>
    ),
    lead: 'FIDE unvonli va reytingli murabbiylar — bolalar bilan ishlashni biladigan, sabrli ustozlar.',
  },
  plans: {
    eyebrow: 'Tariflar',
    title: (
      <>
        O&apos;zingizga <span className="grad-text">mos tarifni</span> tanlang
      </>
    ),
    lead: 'Avval bepul sinov darsi — keyin qaror qilasiz. Narxlar oylik.',
    cta: 'Bepul darsdan boshlash',
  },
  trial: {
    eyebrow: "30 daqiqada nima bo'ladi?",
    title: (
      <>
        Bepul sinov darsi — <span className="grad-text">3 bosqich</span>
      </>
    ),
    lead: "Hech qanday majburiyatsiz. Farzandingizning darajasini aniqlaymiz va aniq yo'l xaritasini beramiz.",
    steps: [
      { time: '0–10 daqiqa', title: 'Tanishuv va baholash', text: "Ustoz bolaning shaxmat bilimi va fikrlash tezligini o'yin tarzidagi savollar orqali aniqlaydi." },
      { time: '10–25 daqiqa', title: "O'yin sessiyasi", text: "Bola ustoz bilan jonli partiya o'ynaydi — qiziqishi va kuchli tomonlari ochiladi." },
      { time: '25–30 daqiqa', title: "Shaxsiy yo'riqnoma", text: "Ota-onaga aniq tavsiyalar: bolaning darajasi, o'sish rejasi va mos guruh." },
    ],
  },
  signup: {
    chip: 'Birinchi dars — bepul',
    title: 'Bepul darsga hoziroq yoziling',
    text: "Ma'lumotlaringizni qoldiring — administratorimiz qo'ng'iroq qilib, sizga qulay vaqtni kelishib oladi.",
    perks: ['30 daqiqalik bepul diagnostika darsi', 'Tajribali murabbiy bilan yakkama-yakka', 'Bolangiz uchun shaxsiy tavsiyalar', 'Hech qanday majburiyatsiz'],
  },
  faq: {
    eyebrow: 'Savol-javob',
    title: "Ko'p beriladigan savollar",
  },
  footer: {
    about: 'Bolalar uchun onlayn shaxmat maktabi: jonli darslar, qiziqarli platforma va ota-onalar uchun shaffof nazorat.',
    siteLabel: "Sayt bo'limlari",
    site: 'Sayt',
    links: ['Platforma', 'Jonli dars', 'Ota-onalar uchun', 'Murabbiylar', 'Savollar'],
    contact: "Bog'lanish",
    users: "O'quvchilar va ustozlar",
    login: 'Platformaga kirish →',
    loginNote: 'Login va parolni maktab administratori beradi.',
    rights: 'Barcha huquqlar himoyalangan.',
    pieces: 'Donalar: Lichess (cburnett, GPL)',
  },
  lead: {
    title: 'Bepul sinov darsiga yozilish',
    sub: '30 daqiqa · onlayn · majburiyatsiz',
    name: 'Ota-onaning ismi',
    namePh: 'Ismingiz',
    phone: 'Telefon raqami',
    age: 'Bolaning yoshi',
    time: 'Qulay vaqt',
    // `label` — ko'rinadigan matn; serverga o'zbekcha `value` ketadi (admin bir xil ko'radi)
    ages: [
      { value: '5–6 yosh', label: '5–6 yosh' },
      { value: '7–9 yosh', label: '7–9 yosh' },
      { value: '10–12 yosh', label: '10–12 yosh' },
      { value: '13+ yosh', label: '13+ yosh' },
    ],
    times: [
      { value: 'Ertalab', label: 'Ertalab' },
      { value: 'Tushdan keyin', label: 'Tushdan keyin' },
      { value: 'Kechqurun', label: 'Kechqurun' },
      { value: 'Dam olish kunlari', label: 'Dam olish kunlari' },
    ],
    submit: 'Bepul darsga yozilish',
    sending: 'Yuborilmoqda…',
    privacy: "Ma'lumotlaringiz faqat siz bilan bog'lanish uchun ishlatiladi.",
    doneTitle: 'Arizangiz qabul qilindi! 🎉',
    doneText: "Tez orada administratorimiz qo'ng'iroq qilib, bepul dars vaqtini kelishib oladi.",
    errName: 'Ismingizni yozing.',
    errPhone: "Telefon raqamini to'liq yozing: +998 XX XXX XX XX",
    errors: {
      network: "Internet aloqasini tekshirib, qayta urinib ko'ring.",
      rate: "Juda ko'p urinish. Bir necha daqiqadan so'ng qayta urinib ko'ring.",
      invalid: "Ma'lumotlarni tekshiring: ism va telefon raqami to'g'ri yozilganmi?",
      failed: "So'rovni yuborib bo'lmadi. Qayta urinib ko'ring yoki telefon orqali bog'laning.",
      unknown: "Xatolik yuz berdi. Qayta urinib ko'ring.",
    },
  },
  notFound: {
    title: 'Sahifa topilmadi',
    text: "Bu manzil mavjud emas yoki ko'chirilgan. Bosh sahifadan bepul sinov darsiga yozilishingiz mumkin.",
    home: 'Bosh sahifaga qaytish',
  },
};

export type Dict = typeof uz;

/**
 * ============================================================
 *  SAYT KONTENTI — hamma matn, narx, raqam va ism shu yerda.
 * ============================================================
 *
 *  ⚠️  NAMUNA: bu fayldagi narxlar, raqamlar, murabbiylar, ota-onalar
 *  fikrlari va kontaktlar — ishonarli NAMUNA, haqiqiy maʼlumot emas.
 *  Saytni ishga tushirishdan oldin oʻzingiznikiga almashtiring.
 *  Almashtirib boʻlgach `showSampleBadges` ni `false` qiling —
 *  shunda saytdagi "namuna" belgilari yoʻqoladi.
 *
 *  Oʻzbek harflari: oʻ, gʻ uchun ʻ (U+02BB), tutuq belgisi uchun ʼ (U+02BC).
 */

export const showSampleBadges = true; // NAMUNA belgilari

export const brand = {
  name: 'Aqlli Yurish',
  slogan: 'Farzandingiz oʻylab yurishni oʻrganadi.',
  description:
    '6–16 yoshli bolalar va kattalar uchun online shaxmat maktabi: Zoom orqali jonli darslar, interaktiv taxta, 4–6 kishilik guruhlar. Birinchi dars bepul.',
  // NAMUNA kontaktlar
  phone: '+998 90 000 00 00',
  phoneHref: 'tel:+998900000000',
  telegram: 'https://t.me/aqlli_yurish_namuna',
  telegramLabel: '@aqlli_yurish_namuna',
  email: 'salom@aqlliyurish.example',
  workHours: 'Har kuni 9:00–21:00',
};

export const nav = [
  { label: 'Qanday oʻtadi', href: '#jarayon' },
  { label: 'Kurslar', href: '#kurslar' },
  { label: 'Narxlar', href: '#narxlar' },
  { label: 'Murabbiylar', href: '#murabbiylar' },
  { label: 'Savollar', href: '#savollar' },
];

export const hero = {
  eyebrow: 'Online shaxmat maktabi · 6–16 yosh',
  title: 'Farzandingiz oʻylab yurishni oʻrganadi',
  lead: 'Zoom orqali jonli darslar, interaktiv taxta va 4–6 kishilik kichik guruhlar. Diqqat, sabr va mantiq — har bir darsda.',
  ctaPrimary: 'Bepul sinov darsiga yozilish',
  ctaSecondary: 'Kurslarni koʻrish',
  badges: ['Birinchi dars — bepul', 'Guruhda 4–6 bola', 'Kattalar uchun ham kurs bor'],
};

export const steps = {
  eyebrow: '4 qadam',
  title: 'Online dars qanday oʻtadi',
  lead: 'Uydan chiqmasdan, yoʻlga vaqt sarflamasdan. Kompyuter yoki planshet, internet va quloqchin — boshqa hech narsa kerak emas.',
  items: [
    {
      title: 'Ariza qoldiring',
      text: 'Formani toʻldiring — ish vaqtida 15 daqiqa ichida qoʻngʻiroq qilib, qulay vaqtni kelishamiz.',
    },
    {
      title: 'Bepul sinov dars',
      text: '30 daqiqalik Zoom darsida murabbiy bolaning darajasini aniqlaydi. Hech qanday majburiyat yoʻq.',
    },
    {
      title: 'Guruhga qoʻshilish',
      text: 'Yoshi va darajasiga mos 4–6 kishilik guruhga yoki individual darsga yozilasiz.',
    },
    {
      title: 'Muntazam darslar',
      text: 'Haftasiga 2–3 marta Zoom yoki Google Meet + interaktiv taxta. Har oy ota-onaga qisqa hisobot.',
    },
  ],
};

export const courses = {
  eyebrow: 'Daraja boʻyicha',
  title: 'Kurslar',
  lead: 'Uch daraja — har biri aniq maqsad bilan. Qaysi biri mos kelishini sinov darsda birga aniqlaymiz.',
  items: [
    {
      level: 'Boshlangʻich',
      age: '6–9 yosh',
      duration: '3 oy · 24 dars',
      learns: [
        'Figuralar yurishi va oʻyin qoidalari',
        'Shoh, rokirovka, mat va pat',
        'Oddiy taktika: vilka va bogʻlash',
        'Diqqatni jamlash odati',
      ],
    },
    {
      level: 'Oʻrta',
      age: '9–13 yosh',
      duration: '4 oy · 32 dars',
      learns: [
        'Debyut tamoyillari',
        'Taktik kombinatsiyalar',
        'Asosiy endshpillar',
        'Oʻz oʻyinini tahlil qilish',
      ],
    },
    {
      level: 'Turnirga tayyorlov',
      age: '11–16 yosh',
      duration: '6 oy · 48 dars',
      learns: [
        'Shaxsiy debyut repertuari',
        'Murakkab endshpil va strategiya',
        'Vaqt nazorati va oʻyin psixologiyasi',
        'Online turnirlar va partiyalar tahlili',
      ],
    },
  ],
  adults: {
    title: 'Kattalar uchun alohida kurs',
    text: 'Noldan boshlash yoki darajani oshirish — kechki vaqtda va dam olish kunlari, guruhda yoki individual.',
  },
};

// NAMUNA narxlar
export const pricing = {
  eyebrow: 'Tariflar',
  title: 'Narxlar',
  lead: 'Oyiga bir marta toʻlov. Birinchi sinov dars — bepul.',
  currency: 'soʻm',
  plans: [
    {
      name: 'Guruh · Standart',
      price: '390 000',
      period: 'oyiga',
      featured: false,
      features: ['Oyiga 8 dars (haftada 2)', '4–6 kishilik guruh', 'Uy vazifasi va mashqlar', 'Oylik hisobot'],
    },
    {
      name: 'Guruh · Intensiv',
      price: '540 000',
      period: 'oyiga',
      featured: true,
      featuredLabel: 'Eng koʻp tanlanadi',
      features: [
        'Oyiga 12 dars (haftada 3)',
        '4–6 kishilik guruh',
        'Haftalik ichki turnir',
        'Partiyalar tahlili murabbiy bilan',
      ],
    },
    {
      name: 'Individual',
      price: '1 200 000',
      period: 'oyiga',
      featured: false,
      features: ['Oyiga 8 ta yakkama-yakka dars', 'Shaxsiy oʻquv reja', 'Moslashuvchan vaqt', 'Kattalar uchun ham'],
    },
  ],
  note: 'Aka-uka yoki opa-singil birga oʻqisa — ikkinchisiga 10% chegirma.',
};

// NAMUNA murabbiylar (rasm oʻrniga bosh harflar)
export const coaches = {
  eyebrow: 'Jamoa',
  title: 'Murabbiylar',
  lead: 'Bolalar bilan ishlashni biladigan, sabrli va talabchan ustozlar.',
  items: [
    {
      initials: 'DR',
      name: 'Dilshod Rahimov',
      role: 'Bosh murabbiy',
      text: '12 yillik murabbiylik tajribasi. Oʻrta va turnir guruhlarini olib boradi.',
    },
    {
      initials: 'MY',
      name: 'Malika Yusupova',
      role: 'Boshlangʻich guruhlar',
      text: '6–9 yoshli bolalar bilan 7 yil. Murakkab gʻoyalarni oʻyin orqali tushuntiradi.',
    },
    {
      initials: 'JK',
      name: 'Jasur Karimov',
      role: 'Turnirga tayyorlov',
      text: 'Yoshlar turnirlarida 10 yildan ortiq tajriba. Debyut va endshpil boʻyicha.',
    },
  ],
};

// NAMUNA raqamlar
export const stats = {
  eyebrow: 'Raqamlarda',
  title: 'Natijalar',
  items: [
    { value: 1200, decimals: 0, suffix: '+', label: 'oʻquvchi biz bilan oʻqigan' },
    { value: 4.9, decimals: 1, suffix: '', label: 'ota-onalar bahosi (5 dan)' },
    { value: 87, decimals: 0, suffix: '%', label: 'oʻquvchining darajasi 3 oyda oshgan' },
    { value: 6, decimals: 0, suffix: '', label: 'kishigacha — guruh hajmi' },
  ],
};

/**
 * "Bir yurishda mat" mashqi.
 * Taxta: `board` — 8 qator, yuqoridan pastga (8-qatordan 1-qatorgacha).
 * Harflar: K Q R B N P — oq; k q r b n p — qora; '.' — boʻsh katak.
 */
export const puzzle = {
  eyebrow: 'Oʻzingizni sinang',
  title: 'Bir yurishda mat',
  lead: 'Oq yuradi. Qaysi yurish darhol mat qiladi? Toʻgʻri javobni tanlang.',
  board: [
    '......k.',
    '.....ppp',
    '........',
    '........',
    '..q.....',
    '........',
    'r....PPP',
    '...R..K.',
  ],
  options: [
    {
      move: 'Ruh d8',
      from: 'd1',
      to: 'd8',
      correct: true,
      explain: 'Toʻgʻri! Ruh d8 ga chiqib qora shohga shoh beradi. Shohni oʻz piyodalari toʻsib turibdi, qochadigan katak yoʻq — mat!',
    },
    {
      move: 'Ruh d7',
      from: 'd1',
      to: 'd7',
      correct: false,
      explain: 'Bu yurish shoh bermaydi — qora shoh xavfsiz qoladi. Shohga hujum qiladigan yurishni qidiring.',
    },
    {
      move: 'Piyoda h3',
      from: 'h2',
      to: 'h3',
      correct: false,
      explain: 'Foydali ehtiyot yurish, lekin mat emas. Qora shohning orqasida boʻsh qator bor — undan foydalaning.',
    },
  ],
};

// NAMUNA fikrlar
export const testimonials = {
  eyebrow: 'Fikrlar',
  title: 'Ota-onalar fikri',
  items: [
    {
      name: 'Nodira',
      who: 'Amirning onasi, 8 yosh',
      text: 'Amir avval 10 daqiqa ham bir joyda oʻtira olmasdi. Ikki oydan beri darsni oʻzi kutib turadi, maktabda ham diqqati yaxshilandi.',
    },
    {
      name: 'Bobur',
      who: 'Sevinchning otasi, 11 yosh',
      text: 'Online boʻlgani uchun yoʻlga vaqt ketmaydi. Murabbiy har oy nima oʻrganilganini va nimaga eʼtibor berish kerakligini yozib yuboradi.',
    },
    {
      name: 'Gulnora',
      who: 'Temur va Layloning onasi',
      text: 'Ikkala farzandim har xil guruhda — har biriga darajasiga qarab vazifa beriladi. Sinov darsdan keyin qaror qilish oson boʻldi.',
    },
  ],
};

export const faq = {
  eyebrow: 'Savollar',
  title: 'Koʻp beriladigan savollar',
  items: [
    {
      q: 'Darslar qanday platformada oʻtadi?',
      a: 'Zoom yoki Google Meet orqali. Murabbiy ekranida interaktiv taxta boʻladi, bola yurishlarni oʻzi ham qiladi. Havolani har dars oldidan yuboramiz.',
    },
    {
      q: 'Farzandim shaxmatni umuman bilmaydi. Bu muammo emasmi?',
      a: 'Yoʻq. Boshlangʻich kurs aynan noldan boshlaydiganlar uchun: figuralar yurishidan boshlab, oʻyin orqali oʻrgatamiz.',
    },
    {
      q: 'Sinov dars rostdan ham bepulmi?',
      a: 'Ha. 30 daqiqa, hech qanday toʻlov yoki majburiyat yoʻq. Dars oxirida murabbiy darajani va mos guruhni tavsiya qiladi.',
    },
    {
      q: 'Dars uchun nima kerak?',
      a: 'Kompyuter yoki planshet, barqaror internet va quloqchin. Telefon ham boʻladi, lekin taxta katta ekranda qulayroq.',
    },
    {
      q: 'Darsni qoldirib ketsak-chi?',
      a: 'Guruh darsining yozuvini yuboramiz. Individual darsni 24 soat oldin ogohlantirsangiz, boshqa vaqtga koʻchiramiz.',
    },
    {
      q: 'Toʻlov qanday amalga oshiriladi?',
      a: 'Oyiga bir marta, bank kartasi orqali. Batafsil maʼlumotni sinov darsdan keyin beramiz.',
    },
    {
      q: 'Kattalar uchun ham kurs bormi?',
      a: 'Ha. Kattalar uchun alohida kechki guruhlar va individual darslar bor — noldan ham, davom ettirish uchun ham.',
    },
    {
      q: 'Natijani qanday bilaman?',
      a: 'Har oy qisqa hisobot yuboramiz: nimalar oʻrganildi, qaysi mavzuga eʼtibor berish kerak va keyingi maqsad.',
    },
  ],
};

export const signup = {
  eyebrow: 'Bepul',
  title: 'Bepul sinov darsiga yozilish',
  lead: 'Formani toʻldiring — qoʻngʻiroq qilib, qulay vaqtni kelishamiz. 30 daqiqa, hech qanday majburiyat yoʻq.',
  ages: ['5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', 'Kattalar (17+)'],
  levels: ['Umuman bilmaydi', 'Boshlangʻich', 'Oʻrta', 'Turnirga tayyorlov'],
  times: ['Ertalab (9:00–12:00)', 'Tushdan keyin (12:00–17:00)', 'Kechqurun (17:00–21:00)', 'Dam olish kunlari'],
  submit: 'Yozilish',
  success: {
    title: 'Rahmat! Arizangiz qabul qilindi.',
    text: 'Tez orada siz bilan bogʻlanamiz va sinov dars vaqtini kelishamiz.',
  },
  fallback: 'Forma hozircha Telegram orqali ishlaydi — maʼlumotlaringiz bilan Telegram ochiladi.',
};

export const footer = {
  text: 'Online shaxmat maktabi: bolalar va kattalar uchun jonli darslar.',
};

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
    { id: 'c3', name: 'Gulchekhra Abdukholikova', title: 'KMC · 1586 reyting', experience: "6 yillik tajriba · 400+ o'quvchi tayyorlagan.", languages: 'Uzb tilida dars beradi', photoUrl: '/coaches/coach-3.webp?v=2' },
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

/**
 * Ruscha sahifa (`/ru`) zaxirasi — o'zbekchasining tarjimasi. Admin «Sayt»da ruscha matn kiritmagan maydonlarda server
 * o'zbekchasini beradi; bu yerdagisi faqat API javob bermaganda (va build'da API bo'lmaganda) ko'rinadi.
 */
export const DEFAULT_LANDING_RU: LandingData = {
  promo: null,
  plans: [],
  coaches: [
    { id: 'c1', name: 'Элбек Джуманов', title: 'FM · рейтинг 2155', experience: 'Опыт 7 лет · подготовил 200+ учеников.', languages: 'Преподаёт на русском и узбекском', photoUrl: '/coaches/coach-1.webp' },
    { id: 'c2', name: 'Жамшидбек Айтимбетов', title: 'FM · рейтинг 2048', experience: 'Опыт 4 года · подготовил 300+ учеников.', languages: 'Преподаёт на русском и узбекском', photoUrl: '/coaches/coach-2.webp' },
    { id: 'c3', name: 'Гульчехра Абдухоликова', title: 'КМС · рейтинг 1586', experience: 'Опыт 6 лет · подготовила 400+ учеников.', languages: 'Преподаёт на узбекском', photoUrl: '/coaches/coach-3.webp?v=2' },
    { id: 'c4', name: 'Иномжон Шаймуратов', title: 'FM · рейтинг 2101', experience: 'Опыт 6 лет · подготовил 500+ учеников.', languages: 'Преподаёт на узбекском и русском', photoUrl: '/coaches/coach-9.webp' },
    { id: 'c5', name: 'Рустамбек Эркинов', title: 'FM · рейтинг 1927', experience: 'Опыт 3 года · подготовил 200+ учеников.', languages: 'Преподаёт на узбекском, русском и английском', photoUrl: '/coaches/coach-5.webp' },
    { id: 'c6', name: 'Рано Абдухоликова', title: 'КМ · рейтинг 1831', experience: 'Опыт 4 года · подготовила 150+ учеников.', languages: 'Преподаёт на узбекском', photoUrl: '/coaches/coach-8.webp' },
    { id: 'c7', name: 'Санжар Эшполатов', title: 'Chess On · Тренер', experience: 'Опыт 3 года · подготовил 200+ учеников.', languages: 'Преподаёт на узбекском', photoUrl: '/coaches/coach-4.webp' },
  ],
  stats: [
    { value: '2,400+', label: 'Учеников' },
    { value: '18', label: 'Сертифицированных тренеров' },
    { value: '4.9★', label: 'Оценка родителей' },
  ],
  contacts: {
    phones: ['+998 88 102 22 62', '+998 50 760 03 00'],
    email: 'admin@chesson.uz',
    address: 'Ташкент, Узбекистан',
  },
  faq: [
    { q: 'Эффективны ли онлайн-уроки шахмат?', a: 'Да! Уроки проходят вживую на нашей интерактивной платформе: тренер показывает на доске, ребёнок сам делает ходы и задаёт вопросы. После урока знания закрепляются домашними заданиями, задачами и играми.' },
    { q: 'С какого возраста можно начинать?', a: 'С 5 лет. С малышами занимаемся в игровой форме, со старшими и теми, кто готовится к турнирам, — по углублённой стратегической методике.' },
    { q: 'А если ребёнок совсем не умеет играть?', a: 'Не проблема. Первый урок — бесплатная диагностика: тренер определит уровень ребёнка и порекомендует подходящую группу и программу.' },
    { q: 'Сколько длятся уроки и когда они проходят?', a: 'Длительность и расписание зависят от выбранного тарифа. Удобное время вы согласуете с тренером на бесплатном уроке, а расписание всегда видно на платформе и в Telegram.' },
    { q: 'Первый урок действительно бесплатный?', a: 'Да, на 100% бесплатно и без каких-либо обязательств. Решение о продолжении — полностью за вами.' },
  ],
};

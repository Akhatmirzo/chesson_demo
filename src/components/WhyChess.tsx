import { Brain, HeartHandshake, Sigma } from 'lucide-react';
import s from './WhyChess.module.css';

const CARDS = [
  {
    icon: Brain,
    tone: 'blue',
    title: 'Diqqat va xotira',
    text: "Telefon o'yinlaridan chalg'ib, e'tiborini bir joyga jamlashni va ma'lumotlarni tezda eslab qolishni o'rganadi.",
  },
  {
    icon: Sigma,
    tone: 'violet',
    title: 'Mantiq va hisob-kitob',
    text: "Har bir yurishni 3–4 qadam oldindan rejalashtirish orqali aniq fanlar va matematikaga bo'lgan qiziqishi ortadi.",
  },
  {
    icon: HeartHandshake,
    tone: 'amber',
    title: "G'alaba va sabr xarakteri",
    text: "Mag'lubiyatni to'g'ri qabul qilish, mas'uliyatni o'z zimmasiga olish va qiyinchilikda shoshmaslikni shakllantiradi.",
  },
];

export function WhyChess() {
  return (
    <section className="section" id="nega">
      <div className="container">
        <div className="head-center reveal">
          <span className="eyebrow">Nega shaxmat?</span>
          <h2 className="h2">
            Ekranga qaramlik o&apos;rniga — <span className="grad-text">fikrlash</span>
          </h2>
          <p className="lead">Shaxmat — bolaning kelajagi uchun eng foydali «ekran vaqti». Har bir dars uchta muhim ko&apos;nikmani rivojlantiradi.</p>
        </div>
        <div className={s.grid}>
          {CARDS.map((c, i) => (
            <article key={c.title} className={`${s.card} ${s[c.tone]} reveal`} style={{ ['--d' as string]: `${i * 110}ms` }}>
              <span className={s.icon}>
                <c.icon size={24} aria-hidden="true" />
              </span>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
              <span className={s.glow} aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

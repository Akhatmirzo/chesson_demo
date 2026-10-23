import { Brain, HeartHandshake, Sigma } from 'lucide-react';
import { getDict, type Locale } from '@/i18n';
import s from './WhyChess.module.css';

/** Kartalar ikonka va rangi; matni lug'atda (`why.cards`, shu tartibda) */
const CARDS = [
  { icon: Brain, tone: 'blue' },
  { icon: Sigma, tone: 'violet' },
  { icon: HeartHandshake, tone: 'amber' },
];

export function WhyChess({ locale }: { locale: Locale }) {
  const t = getDict(locale).why;
  return (
    <section className="section" id="nega">
      <div className="container">
        <div className="head-center reveal">
          <span className="eyebrow">{t.eyebrow}</span>
          <h2 className="h2">{t.title}</h2>
          <p className="lead">{t.lead}</p>
        </div>
        <div className={s.grid}>
          {CARDS.map((c, i) => (
            <article key={c.tone} className={`${s.card} ${s[c.tone]} reveal`} style={{ ['--d' as string]: `${i * 110}ms` }}>
              <span className={s.icon}>
                <c.icon size={24} aria-hidden="true" />
              </span>
              <h3>{t.cards[i].title}</h3>
              <p>{t.cards[i].text}</p>
              <span className={s.glow} aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

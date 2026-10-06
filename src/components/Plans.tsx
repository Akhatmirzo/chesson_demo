'use client';

import { Check, Sparkles } from 'lucide-react';
import { formatSum } from '@/lib/api';
import { useLanding, useLead } from './providers';
import s from './Plans.module.css';

/** Tariflar admin panelidan keladi; birorta faol tarif bo'lmasa bo'lim ko'rinmaydi. */
export function Plans() {
  const { plans } = useLanding();
  const { open } = useLead();
  if (!plans.length) return null;
  return (
    <section id="tariflar" className={`section ${s.section}`}>
      <div className="container">
        <div className="head-center reveal">
          <span className="eyebrow">Tariflar</span>
          <h2 className="h2">
            O&apos;zingizga <span className="grad-text">mos tarifni</span> tanlang
          </h2>
          <p className="lead">Avval bepul sinov darsi — keyin qaror qilasiz. Narxlar oylik.</p>
        </div>
        <div className={s.grid} style={{ ['--cols' as string]: Math.min(plans.length, 3) }}>
          {plans.map((p, i) => (
            <article key={p.id} className={`${s.card} ${p.highlighted ? s.hot : ''} reveal`} style={{ ['--d' as string]: `${i * 100}ms` }}>
              {p.badge && (
                <span className={s.badge}>
                  <Sparkles size={13} aria-hidden="true" /> {p.badge}
                </span>
              )}
              <h3>{p.title}</h3>
              {p.subtitle && <p className={s.sub}>{p.subtitle}</p>}
              <div className={s.price}>
                {p.oldPriceUzs ? <s className={s.old}>{formatSum(p.oldPriceUzs)}</s> : null}
                <b>{formatSum(p.priceUzs)}</b>
                <span>so&apos;m / {p.periodLabel}</span>
              </div>
              {p.lessonsLabel && <p className={s.lessons}>{p.lessonsLabel}</p>}
              <ul>
                {p.features.map((f) => (
                  <li key={f}>
                    <Check size={16} aria-hidden="true" /> {f}
                  </li>
                ))}
              </ul>
              <button type="button" className={`btn ${p.highlighted ? 'btn-primary' : 'btn-ghost'} ${s.cta}`} onClick={() => open(`tarif:${p.title}`)}>
                Bepul darsdan boshlash
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

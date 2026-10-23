'use client';

import { Check, Gift } from 'lucide-react';
import { LeadForm } from './LeadForm';
import { useLanding, useT } from './providers';
import s from './Signup.module.css';

export function Signup() {
  const { promo } = useLanding();
  const t = useT().signup;
  return (
    <section id="yozilish" className="section">
      <div className="container">
        <div className={`${s.card} reveal`}>
          <div className={s.left}>
            <span className={s.chip}>
              {promo ? (
                <>
                  <span aria-hidden="true">{promo.emoji || '🎁'}</span> {promo.text}
                </>
              ) : (
                <>
                  <Gift size={15} aria-hidden="true" /> {t.chip}
                </>
              )}
            </span>
            <h2>{t.title}</h2>
            <p>{t.text}</p>
            <ul>
              {t.perks.map((p) => (
                <li key={p}>
                  <span>
                    <Check size={15} aria-hidden="true" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/art/happy-full.webp" alt="" className={s.mascot} width={170} height={200} loading="lazy" />
            <span className={s.board} aria-hidden="true" />
          </div>
          <div className={s.right}>
            <LeadForm source="sahifa" />
          </div>
        </div>
      </div>
    </section>
  );
}

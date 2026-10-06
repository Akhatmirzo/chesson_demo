'use client';

import { Check, Gift } from 'lucide-react';
import { LeadForm } from './LeadForm';
import { useLanding } from './providers';
import s from './Signup.module.css';

const PERKS = ['30 daqiqalik bepul diagnostika darsi', "Tajribali murabbiy bilan yakkama-yakka", 'Bolangiz uchun shaxsiy tavsiyalar', 'Hech qanday majburiyatsiz'];

export function Signup() {
  const { promo } = useLanding();
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
                  <Gift size={15} aria-hidden="true" /> Birinchi dars — bepul
                </>
              )}
            </span>
            <h2>Bepul darsga hoziroq yoziling</h2>
            <p>Ma&apos;lumotlaringizni qoldiring — administratorimiz qo&apos;ng&apos;iroq qilib, sizga qulay vaqtni kelishib oladi.</p>
            <ul>
              {PERKS.map((p) => (
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

'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, Flame, MonitorPlay, Sparkles } from 'lucide-react';
import { BrowserFrame, PhoneFrame, Shot } from './Frames';
import { useLanding, useLead } from './providers';
import s from './Hero.module.css';

/** "2,400+" → 0 dan 2400 gacha sanab chiqadi, qolgan belgilar (+, ★) saqlanadi */
function CountUp({ value, delay }: { value: string; delay: number }) {
  const m = value.match(/^([^\d]*)([\d][\d,.\s]*)(.*)$/);
  const [shown, setShown] = useState(value);
  useEffect(() => {
    if (!m) return;
    const raw = m[2];
    const decimals = raw.includes('.') ? raw.split('.')[1].length : 0;
    const target = parseFloat(raw.replace(/[,\s]/g, ''));
    if (!isFinite(target) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const fmt = (n: number) =>
      decimals ? n.toFixed(decimals) : raw.includes(',') ? Math.round(n).toLocaleString('en-US') : String(Math.round(n));
    setShown(m[1] + fmt(0) + m[3]);
    let raf = 0;
    const start = performance.now() + delay * 1000;
    const dur = 1400;
    const tick = (t: number) => {
      const p = Math.min(1, Math.max(0, (t - start) / dur));
      const e = 1 - Math.pow(1 - p, 3);
      setShown(m[1] + fmt(target * e) + m[3]);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  return <>{shown}</>;
}

const TITLE: { w: string; grad?: boolean }[] = [
  { w: 'Farzandingiz' },
  { w: 'uchun' },
  { w: 'birinchi', grad: true },
  { w: 'bepul', grad: true },
  { w: 'sinov' },
  { w: 'darsi' },
];

export function Hero() {
  const { promo, stats } = useLanding();
  const { open } = useLead();
  const introSec = typeof document !== 'undefined' && document.documentElement.classList.contains('intro') ? 1.3 : 0.05;

  return (
    <section className={s.hero}>
      <div className={s.bg} aria-hidden="true">
        <span className={s.blobA} />
        <span className={s.blobB} />
        <span className={s.grid} />
      </div>
      <div className={`container ${s.inner}`}>
        <div className={s.copy}>
          <p className={`${s.chip} ${s.in}`} style={{ ['--i' as string]: 0 }}>
            {promo ? (
              <>
                <span aria-hidden="true">{promo.emoji || '🎉'}</span> {promo.text}
              </>
            ) : (
              <>
                <Sparkles size={15} aria-hidden="true" /> Birinchi dars — bepul va majburiyatsiz
              </>
            )}
          </p>
          <h1 className={s.title}>
            {TITLE.map((t, i) => (
              <span key={i}>
                <span className={s.wordWrap}>
                  <span className={`${s.word} ${t.grad ? 'grad-text' : ''}`} style={{ ['--i' as string]: i + 1 }}>
                    {t.w}
                  </span>
                </span>{' '}
              </span>
            ))}
          </h1>
          <p className={`${s.sub} ${s.in}`} style={{ ['--i' as string]: 6 }}>
            Farzandingizda <b>mantiq, diqqat va strategik fikrlashni</b> rivojlantiring. Tajribali ustozlar bilan jonli onlayn darslar,
            o&apos;yin va boshqotirmalar bilan qiziqarli platforma.
          </p>
          <div className={`${s.ctas} ${s.in}`} style={{ ['--i' as string]: 7 }}>
            <button type="button" className="btn btn-primary" onClick={() => open('hero')}>
              {promo?.ctaLabel || 'Bepul darsga yozilish'} <ArrowRight className="arrow" size={18} aria-hidden="true" />
            </button>
            <a href="#platforma" className="btn btn-ghost">
              <MonitorPlay size={18} aria-hidden="true" /> Platformani ko&apos;rish
            </a>
          </div>
          {stats.length > 0 && (
            <dl className={`${s.stats} ${s.in}`} style={{ ['--i' as string]: 8 }}>
              {stats.map((st, i) => (
                <div key={i} className={s.stat}>
                  <dt>{st.label}</dt>
                  <dd>
                    <CountUp value={st.value} delay={introSec + 0.9} />
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        <div className={s.visual} data-hero-visual>
          <div className={s.stage}>
            <div className={s.mascotPos} data-depth="0.6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/art/cheer-full.webp" alt="" className={s.mascot} width={170} height={200} />
            </div>
            <div data-depth="0.25">
              <div className={s.browserWrap}>
                <BrowserFrame>
                  <Shot name="kid-home" alt="O'quvchi paneli: keyingi dars, bugungi tangalar, daraja va uyga vazifa" priority sizes="(max-width: 1024px) 92vw, 640px" />
                </BrowserFrame>
              </div>
            </div>
            <div className={s.phonePos} data-depth="0.9">
              <div className={s.phoneWrap}>
                <PhoneFrame>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/shots/phone-home.webp" alt="Telefondagi o'quvchi paneli" width={520} height={1125} />
                </PhoneFrame>
              </div>
            </div>
            <div className={`${s.fPos} ${s.f1}`} data-depth="1.2">
              <div className={s.float}>
                <span className={s.fIcon} style={{ background: '#fff1e6', color: '#f97316' }}>
                  <Flame size={18} aria-hidden="true" />
                </span>
                <span>
                  <small>Kunlik seriya</small>
                  <b>12 kun</b>
                </span>
              </div>
            </div>
            <div className={`${s.fPos} ${s.f2}`} data-depth="1.5">
              <div className={s.float}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/art/dokonchi-tanga.webp" alt="" width={36} height={36} className={s.coin} />
                <span>
                  <small>Dars uchun</small>
                  <b>+10 tanga</b>
                </span>
              </div>
            </div>
            <div className={`${s.fPos} ${s.f3}`} data-depth="1">
              <div className={s.float}>
                <span className={s.fIcon} style={{ background: '#f3e8ff' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/kidpieces/wN.webp" alt="" width={22} height={22} />
                </span>
                <span className={s.xp}>
                  <small>Ot darajasigacha</small>
                  <b>73 XP</b>
                  <i>
                    <em />
                  </i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

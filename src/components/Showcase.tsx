'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SHOWCASE } from '@/content/showcase';
import { BrowserFrame, Shot } from './Frames';
import { Hotspots } from './Hotspots';
import s from './Showcase.module.css';

const DESKTOP = '(min-width: 1024px)';

/**
 * Kompyuterda: bo'lim «yopishib» turadi, skroll qilinganda ekranlar ketma-ket almashadi (CSS sticky + skroll ulushi).
 * Telefonda: oddiy tablar va barmoq bilan surish.
 */
export function Showcase() {
  const [active, setActive] = useState(0);
  const [sub, setSub] = useState(0); // joriy qadam ichidagi ulush (0..1) — chap ro'yxatdagi chiziq uchun
  const track = useRef<HTMLDivElement>(null);
  const touch = useRef<number | null>(null);
  const N = SHOWCASE.length;

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP);
    let raf = 0;
    const calc = () => {
      raf = 0;
      if (!mq.matches || !track.current) return;
      const r = track.current.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = Math.min(0.9999, Math.max(0, -r.top / total));
      const idx = Math.floor(p * N);
      setActive(idx);
      setSub(p * N - idx);
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(calc);
    };
    calc();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    mq.addEventListener('change', on);
    return () => {
      window.removeEventListener('scroll', on);
      window.removeEventListener('resize', on);
      mq.removeEventListener('change', on);
      cancelAnimationFrame(raf);
    };
  }, [N]);

  const go = useCallback(
    (i: number) => {
      const idx = (i + N) % N;
      if (window.matchMedia(DESKTOP).matches && track.current) {
        // kompyuterda — tegishli skroll joyiga silliq o'tish
        const top = track.current.getBoundingClientRect().top + window.scrollY;
        const total = track.current.offsetHeight - window.innerHeight;
        window.scrollTo({ top: top + (total * (idx + 0.05)) / N, behavior: 'smooth' });
      } else {
        setActive(idx);
      }
    },
    [N],
  );

  const step = SHOWCASE[active];

  return (
    <section id="platforma" className={s.section}>
      <div className="container">
        <div className="head-center reveal">
          <span className="eyebrow">Bizning platforma</span>
          <h2 className="h2">
            O&apos;quvchi uchun <span className="grad-text">to&apos;liq onlayn muhit</span>
          </h2>
          <p className="lead">Chesson — bu shunchaki dars emas. Bola o&apos;ynaydi, mashq qiladi, tanga yig&apos;adi va o&apos;z o&apos;sishini kuzatib boradi.</p>
        </div>
      </div>

      <div ref={track} className={s.track} style={{ ['--n' as string]: N }}>
        <div className={s.sticky}>
          <div className={`container ${s.layout}`}>
            <div className={s.side}>
              <div className={s.tabs} role="tablist" aria-label="Platforma bo'limlari">
                {SHOWCASE.map((st, i) => (
                  <button
                    key={st.id}
                    type="button"
                    role="tab"
                    aria-selected={i === active}
                    className={`${s.tab} ${i === active ? s.tabOn : ''}`}
                    onClick={() => go(i)}
                  >
                    <span className={s.tabNum}>{String(i + 1).padStart(2, '0')}</span>
                    <span className={s.tabBody}>
                      <span className={s.tabLabel}>{st.label}</span>
                      <span className={s.tabTitle}>{st.title}</span>
                      <span className={s.tabText}>{st.text}</span>
                    </span>
                    <span className={s.bar} aria-hidden="true">
                      <i style={{ transform: `scaleY(${i < active ? 1 : i === active ? Math.max(0.04, sub) : 0})` }} />
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className={s.stage}>
              <div
                className={s.frameWrap}
                onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
                onTouchEnd={(e) => {
                  if (touch.current === null) return;
                  const dx = e.changedTouches[0].clientX - touch.current;
                  touch.current = null;
                  if (Math.abs(dx) > 45) go(active + (dx < 0 ? 1 : -1));
                }}
              >
                <BrowserFrame url={`crm.chesson.uz/${step.id === 'bosh' ? '' : step.id}`}>
                  {SHOWCASE.map((st, i) => (
                    <div key={st.id} className={`${s.layer} ${i === active ? s.layerOn : ''}`} aria-hidden={i !== active}>
                      <Shot name={st.shot} alt={st.alt} sizes="(max-width: 1024px) 94vw, 760px" />
                      {i === active && <Hotspots spots={st.spots} auto={i === 0} />}
                    </div>
                  ))}
                </BrowserFrame>
              </div>
              <div className={s.mobileText} aria-live="polite">
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
              <div className={s.pager}>
                <button type="button" aria-label="Oldingi" onClick={() => go(active - 1)}>
                  <ChevronLeft size={20} />
                </button>
                <span className={s.dots}>
                  {SHOWCASE.map((st, i) => (
                    <i key={st.id} className={i === active ? s.dotOn : ''} />
                  ))}
                </span>
                <button type="button" aria-label="Keyingi" onClick={() => go(active + 1)}>
                  <ChevronRight size={20} />
                </button>
              </div>
              <p className={s.hint}>Raqamli nuqtalarni bosib ko&apos;ring</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

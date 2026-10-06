'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { ArrowRight, ChevronDown, Check } from 'lucide-react';
import { hero } from '@/content/site';
import { isDesktop, loadGsap, onFirstInteraction, prefersReducedMotion } from '@/lib/motion';
import { display } from '@/lib/typo';

// Three.js faqat kerak bo'lganda yuklanadi (alohida chunk)
const KingScene = dynamic(() => import('./KingScene'), { ssr: false });

const POSTER = '/poster/king.webp';
const POSTER_MOBILE = '/poster/king-m.webp';

/** 3D faqat katta ekran, sichqoncha va yetarli quvvatli qurilmada. */
function canRender3D() {
  if (prefersReducedMotion()) return false;
  if (window.innerWidth < 1024) return false;
  if (window.matchMedia('(pointer: coarse)').matches) return false;
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  if (nav.connection?.saveData) return false;
  if ((nav.deviceMemory ?? 8) < 4) return false;
  if ((nav.hardwareConcurrency ?? 8) < 4) return false;
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const posterRef = useRef<HTMLImageElement>(null);
  const hintRef = useRef<HTMLAnchorElement>(null);
  const progress = useRef(0);
  const listeners = useRef(new Set<() => void>());
  const [use3D, setUse3D] = useState(false);
  const [ready3D, setReady3D] = useState(false);

  const subscribe = useCallback((fn: () => void) => {
    listeners.current.add(fn);
    return () => {
      listeners.current.delete(fn);
    };
  }, []);
  const onReady = useCallback(() => setReady3D(true), []);

  // 3D foydalanuvchining birinchi harakatida yuklanadi (sichqoncha, scroll, klaviatura).
  // Ungacha 3D sahnaning aynan birinchi kadri bo'lgan poster turadi — farq ko'rinmaydi,
  // lekin sahifaning birinchi yuklanishi (LCP/TBT) Three.js'ga bog'liq bo'lmaydi.
  useEffect(() => {
    if (!canRender3D()) return;
    const { promise, cancel } = onFirstInteraction(['pointermove', 'scroll', 'wheel', 'keydown', 'pointerdown']);
    let alive = true;
    promise.then(() => alive && setUse3D(true));
    return () => {
      alive = false;
      cancel();
    };
  }, []);

  useEffect(() => {
    const el = root.current;
    const title = titleRef.current;
    if (!el || !title) return;
    const reduced = prefersReducedMotion();
    // Kirish animatsiyasi faqat desktopda (mobilda matn darhol ko'rinadi — LCP uchun)
    const intro = !reduced && isDesktop();
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    loadGsap().then(({ gsap, ScrollTrigger, SplitText }) => {
      if (cancelled) return;
      ctx = gsap.context(() => {
        gsap.set(title, { opacity: 1 });
        if (intro) {
          // Sarlavha harflari pastdan paydo bo'ladi
          const split = SplitText.create(title, { type: 'words,chars', mask: 'words', aria: 'auto' });
          gsap.from(split.chars, { yPercent: 110, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.018 });
          gsap.fromTo(
            '[data-reveal="hero"]',
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.08, delay: 0.3 },
          );
        } else {
          gsap.set('[data-reveal="hero"]', { opacity: 1 });
        }

        if (reduced) return;

        const mm = gsap.matchMedia();
        // Desktop: sticky hero — scroll qirolni aylantiradi va kamerani yaqinlashtiradi
        mm.add('(min-width: 1024px)', () => {
          // 1-ekran: qirol aylanadi va yaqinlashadi; 2-ekran: keyingi panel ustiga chiqadi
          const kingEnd = () => '+=' + window.innerHeight;
          ScrollTrigger.create({
            trigger: el,
            start: 'top top',
            end: kingEnd,
            invalidateOnRefresh: true,
            scrub: true,
            onUpdate: (self) => {
              progress.current = self.progress;
              listeners.current.forEach((fn) => fn());
            },
          });
          gsap.to(textRef.current, {
            yPercent: -18,
            opacity: 0,
            ease: 'none',
            scrollTrigger: { trigger: el, start: () => 'top+=' + window.innerHeight * 0.6 + ' top', end: kingEnd, scrub: true, invalidateOnRefresh: true },
          });
          gsap.to(hintRef.current, {
            opacity: 0,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top top', end: '+=160', scrub: true },
          });
          // Poster (3D yuklanguncha) ham yengil kattalashadi
          gsap.to(posterRef.current, {
            scale: 1.12,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top top', end: kingEnd, scrub: true, invalidateOnRefresh: true },
          });
        });
        // Mobil: yengil parallax
        mm.add('(max-width: 1023px)', () => {
          gsap.to(posterRef.current, {
            yPercent: 10,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
          });
        });
      }, el);
    });

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <section ref={root} id="top" className="relative lg:h-[300vh]" aria-labelledby="hero-title">
      <div data-hero-stage className="relative overflow-hidden lg:sticky lg:top-0 lg:h-svh">
        <div className="relative mx-auto grid max-w-7xl px-4 pt-20 sm:px-6 pb-14 lg:h-full lg:grid-cols-12 lg:items-center lg:px-8 lg:pt-16 lg:pb-0">
          <div ref={textRef} className="relative z-10 mt-2 lg:col-span-6 lg:mt-0">
            <p
              data-reveal="hero"
              className="mb-5 inline-flex items-center gap-2 rounded-full bg-green-pale px-3.5 py-1.5 text-sm font-bold text-green-ink"
            >
              <span className="size-1.5 rounded-full bg-green" aria-hidden="true" />
              {hero.eyebrow}
            </p>
            <h1
              ref={titleRef}
              id="hero-title"
              data-split
              className="font-display text-[2.5rem] leading-[1.04] font-black tracking-tight text-ink sm:text-6xl lg:text-[4.4rem]"
            >
              {display(hero.title)}
            </h1>
            <p data-reveal="hero" className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">
              {hero.lead}
            </p>
            <div data-reveal="hero" className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#yozilish"
                className="group btn-3d inline-flex items-center justify-center gap-2 rounded-2xl bg-green font-extrabold tracking-[0.06em] text-on-green uppercase px-7 py-4 text-[15px]"
              >
                {hero.ctaPrimary}
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
              <a
                href="#kurslar"
                className="btn-3d inline-flex items-center justify-center rounded-2xl border-2 border-swan bg-paper font-extrabold tracking-[0.06em] text-humpback uppercase [--btn-shadow:var(--color-swan)] px-6 py-4 text-[15px]"
              >
                {hero.ctaSecondary}
              </a>
            </div>
            <ul data-reveal="hero" className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
              {hero.badges.map((b) => (
                <li key={b} className="flex items-center gap-1.5 text-[15px] font-medium text-ink-soft">
                  <Check className="size-4 text-green-deep" strokeWidth={3} aria-hidden="true" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* Vizual: poster (har doim) + 3D (faqat desktop). Mobilda matndan oldin. */}
          <div className="relative order-first -mx-4 h-[230px] sm:mx-0 sm:h-[300px] lg:absolute lg:inset-y-0 lg:right-0 lg:order-none lg:mt-0 lg:h-full lg:w-[54%]">
            {/* Fon: yumshoq katak naqsh */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{
                backgroundImage:
                  'radial-gradient(ellipse 60% 55% at 50% 60%, rgba(88,204,2,0.10), transparent 70%), conic-gradient(from 0deg at 50% 50%, #eaf7dc 0 25%, transparent 0 50%, #eaf7dc 0 75%, transparent 0)',
                backgroundSize: '100% 100%, 64px 64px',
                maskImage: 'radial-gradient(ellipse 50% 50% at 50% 62%, #000 15%, transparent 72%)',
                WebkitMaskImage: 'radial-gradient(ellipse 50% 50% at 50% 62%, #000 15%, transparent 72%)',
              }}
            />
            <picture>
              <source media="(max-width: 1023px)" srcSet={POSTER_MOBILE} width={251} height={522} />
              <img
                ref={posterRef}
                src={POSTER}
                alt="Yashil marmar shaxmat qiroli"
                width={720}
                height={1200}
                fetchPriority="high"
                decoding="async"
                className={`absolute inset-0 h-full w-full object-contain py-3 transition-opacity duration-700 lg:py-0 ${ready3D ? 'opacity-0' : 'opacity-100'}`}
              />
            </picture>
            {use3D && (
              <div className={`absolute inset-0 transition-opacity duration-700 ${ready3D ? 'opacity-100' : 'opacity-0'}`}>
                <KingScene progress={progress} subscribe={subscribe} onReady={onReady} />
              </div>
            )}
          </div>
        </div>

        <a
          ref={hintRef}
          href="#jarayon"
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-xs font-semibold tracking-wide text-ink-soft uppercase lg:flex"
          aria-label="Keyingi boʻlimga oʻtish"
        >
          Pastga aylantiring
          <ChevronDown className="size-5" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

'use client';

/**
 * GSAP (+ScrollTrigger, SplitText) va Lenis boshlang'ich JS'ga kirmaydi:
 *  - desktopda (hero kirish animatsiyasi uchun) hydration'dan keyin darhol yuklanadi;
 *  - mobil/touch'da birinchi ekranga kerak emas — foydalanuvchi birinchi marta
 *    scroll qilganda / tekkanda yuklanadi (LCP va TBT ga ta'sir qilmaydi).
 */
type GsapModule = typeof import('./gsap');
let gsapPromise: Promise<GsapModule> | null = null;

const INTERACTION_EVENTS = ['scroll', 'wheel', 'touchstart', 'pointerdown', 'keydown'] as const;

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const isDesktop = () =>
  typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px) and (pointer: fine)').matches;

export const isTouch = () => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

/** Foydalanuvchining birinchi harakatini kutadi (yoki sahifa allaqachon pastga aylantirilgan bo'lsa — darhol). */
export function onFirstInteraction(
  events: readonly string[] = INTERACTION_EVENTS,
): { promise: Promise<void>; cancel: () => void } {
  let cancel = () => {};
  const promise = new Promise<void>((resolve) => {
    if (window.scrollY > 0 || location.hash) return resolve();
    const done = () => {
      cancel();
      resolve();
    };
    events.forEach((e) => window.addEventListener(e, done, { passive: true, once: true }));
    cancel = () => events.forEach((e) => window.removeEventListener(e, done));
  });
  return { promise, cancel };
}

export const loadGsap = () =>
  (gsapPromise ??= (isDesktop() ? Promise.resolve() : onFirstInteraction().promise)
    .then(() => import('./gsap'))
    .then((mod) => {
      // GSAP tayyor — CSS failsafe'ni o'chiramiz, ko'rsatishni endi GSAP boshqaradi
      document.documentElement.classList.add('anim-ready');
      return mod;
    }));

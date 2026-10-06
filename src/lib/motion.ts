'use client';

import { useEffect, useState } from 'react';
import type { gsap as GsapType } from 'gsap';
import type { ScrollTrigger as ScrollTriggerType } from 'gsap/ScrollTrigger';

/** Murakkab animatsiyalar faqat kompyuterda: keng ekran + sichqoncha + harakat cheklanmagan. */
export const RICH_QUERY = '(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)';

export function isRichMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia(RICH_QUERY).matches;
}

export function useRichMotion(): boolean {
  const [rich, setRich] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(RICH_QUERY);
    const on = () => setRich(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return rich;
}

let gsapPromise: Promise<{ gsap: typeof GsapType; ScrollTrigger: typeof ScrollTriggerType }> | null = null;

/** GSAP faqat kerak bo'lganda (kompyuterda) yuklanadi — telefonga bu kod umuman kelmaydi. */
export function loadGsap() {
  if (!gsapPromise) {
    gsapPromise = Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([g, st]) => {
      g.gsap.registerPlugin(st.ScrollTrigger);
      return { gsap: g.gsap, ScrollTrigger: st.ScrollTrigger };
    });
  }
  return gsapPromise;
}

/** Intro tugaguncha kutish (sessiyada birinchi kirishda ~1.4s) */
export function introDelay(): number {
  return typeof document !== 'undefined' && document.documentElement.classList.contains('intro') ? 1.35 : 0;
}

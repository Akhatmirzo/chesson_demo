'use client';

import { useEffect } from 'react';
import { isTouch, loadGsap, prefersReducedMotion } from '@/lib/motion';

/** Lenis silliq scroll + GSAP ScrollTrigger sinxronlash. Reduced-motion va touch qurilmalarda o'chiq (native scroll). */
export default function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion() || isTouch()) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;
    Promise.all([loadGsap(), import('lenis')]).then(([{ gsap, ScrollTrigger }, { default: Lenis }]) => {
      if (cancelled) return;
      const lenis = new Lenis({ autoRaf: false, anchors: { offset: -72 } });
      lenis.on('scroll', ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      cleanup = () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return null;
}

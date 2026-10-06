'use client';

import { useEffect } from 'react';
import { isRichMotion, loadGsap } from '@/lib/motion';

/**
 * Faqat kompyuterda yuklanadigan qo'shimcha harakatlar (GSAP):
 *  - qahramon bo'limdagi vizual sichqonchaga qarab chuqurlik bilan og'adi (data-depth qatlamlari);
 *  - skroll qilinganda qahramon vizuali sekin yuqoriga suriladi va kichrayadi;
 *  - bo'lim sarlavhalaridagi gradient so'zlar skroll bilan «yonadi».
 * Telefonga/planshetga bu kod umuman yuklanmaydi.
 */
export function DesktopMotion() {
  useEffect(() => {
    if (!isRichMotion()) return;
    let cleanup: (() => void) | undefined;
    let cancelled = false;

    loadGsap().then(({ gsap, ScrollTrigger }) => {
      if (cancelled) return;
      const ctx = gsap.context(() => {
        const visual = document.querySelector<HTMLElement>('[data-hero-visual]');
        if (visual) {
          const layers = Array.from(visual.querySelectorAll<HTMLElement>('[data-depth]')).map((el) => ({
            el,
            d: Number(el.dataset.depth) || 0,
            x: gsap.quickTo(el, 'x', { duration: 0.9, ease: 'power3.out' }),
            y: gsap.quickTo(el, 'y', { duration: 0.9, ease: 'power3.out' }),
          }));
          const hero = visual.closest('section') as HTMLElement;
          const onMove = (e: PointerEvent) => {
            const r = hero.getBoundingClientRect();
            const nx = (e.clientX - r.left) / r.width - 0.5;
            const ny = (e.clientY - r.top) / r.height - 0.5;
            for (const l of layers) {
              l.x(nx * 26 * l.d);
              l.y(ny * 20 * l.d);
            }
          };
          const onLeave = () => layers.forEach((l) => (l.x(0), l.y(0)));
          hero.addEventListener('pointermove', onMove);
          hero.addEventListener('pointerleave', onLeave);

          gsap.to(visual, {
            yPercent: -8,
            scale: 0.96,
            ease: 'none',
            scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.6 },
          });

          cleanup = () => {
            hero.removeEventListener('pointermove', onMove);
            hero.removeEventListener('pointerleave', onLeave);
          };
        }

        // Jonli dars namunasi skroll bilan biroz «ko'tarilib» keladi
        const room = document.querySelector('#dars [class*="room"]');
        if (room) {
          gsap.fromTo(
            room,
            { rotateX: 14, y: 60, transformPerspective: 1400, transformOrigin: '50% 100%' },
            { rotateX: 0, y: 0, ease: 'none', scrollTrigger: { trigger: room, start: 'top bottom', end: 'center center', scrub: 0.8 } },
          );
        }

        // Motivatsiya kartalari — har biri o'z tezligida (yengil parallaks)
        document.querySelectorAll<HTMLElement>('#motivatsiya article').forEach((el, i) => {
          gsap.fromTo(el, { y: 30 + (i % 2) * 30 }, { y: 0, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'top 55%', scrub: 0.6 } });
        });
      });
      ScrollTrigger.refresh();
      const prev = cleanup;
      cleanup = () => {
        prev?.();
        ctx.revert();
      };
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return null;
}

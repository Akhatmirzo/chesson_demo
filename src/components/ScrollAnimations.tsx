'use client';

import { useEffect } from 'react';
import { loadGsap, prefersReducedMotion } from '@/lib/motion';
import { formatNumber as fmt } from '@/lib/format';

/**
 * Sahifadagi barcha scroll animatsiyalari — data-* atributlar orqali (faqat transform va opacity).
 * Har bir animatsiya bo'lim ekranga yaqinlashganda ishga tushadi.
 *
 *  data-panel           — hero ustiga chiqib keladigan panel (desktop)
 *  data-split="lines"   — sarlavha qatorma-qator pastdan chiqadi
 *  data-reveal="up"     — yumshoq fade-up
 *  data-stagger > data-stagger-item — ketma-ket chiqish
 *  data-cards > data-card           — kartochkalar (navbatma-navbat qiya holatdan)
 *  data-fan > data-fan-item         — narx kartochkalari yelpig'ichdek yoyiladi
 *  data-avatar          — murabbiy bosh harflari "sakrab" chiqadi
 *  data-photo > data-parallax       — rasm ichida parallax
 *  data-curtain         — rasm ustidagi parda yuqoriga yig'iladi
 *  data-line            — qadamlarni bog'lovchi chiziq scroll bilan chiziladi
 *  data-count           — raqam sanaladi
 *  data-marquee         — katta yozuv scroll bilan suriladi
 *  data-zoom            — blok kichik holatdan to'liq kenglikka ochiladi
 *  data-board           — taxta kataklari to'lqin bo'lib paydo bo'ladi
 */
export default function ScrollAnimations() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;
    let ro: ResizeObserver | undefined;

    loadGsap().then(({ gsap, ScrollTrigger, SplitText }) => {
      if (cancelled) return;
      ctx = gsap.context(() => {
        const q = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
          Array.from(root.querySelectorAll<T & Element>(sel)) as T[];
        const onEnter = (trigger: Element, start = 'top 85%') => ({ trigger, start, once: true });

        // --- Hero -> keyingi blok: hero orqaga ketadi, panel ustiga chiqib keladi (desktop) ---
        const mm = gsap.matchMedia();
        mm.add('(min-width: 1024px)', () => {
          const panel = document.querySelector('[data-panel]');
          const stage = document.querySelector('[data-hero-stage]');
          if (!panel || !stage) return;
          const st = { trigger: panel, start: 'top bottom', end: 'top top', scrub: true };
          gsap.fromTo(stage, { scale: 1, opacity: 1, yPercent: 0 }, { scale: 0.86, opacity: 0.25, yPercent: -6, ease: 'none', scrollTrigger: st });
          gsap.fromTo(panel, { scaleX: 0.9, y: 60 }, { scaleX: 1, y: 0, ease: 'power1.out', scrollTrigger: { ...st, end: 'top 25%' } });
        });

        // --- Sarlavhalar: qatorlar maska ichidan ko'tariladi.
        // Bo'lish (SplitText) faqat sarlavha ekranga yaqinlashganda — boshlang'ich yuklanish yengil bo'ladi.
        q('[data-split="lines"]').forEach((el) => {
          ScrollTrigger.create({
            trigger: el,
            start: 'top 92%',
            once: true,
            onEnter: () => {
              const split = SplitText.create(el, { type: 'lines', mask: 'lines', aria: 'auto' });
              gsap.set(el, { opacity: 1 });
              gsap.from(split.lines, {
                yPercent: 110,
                duration: 1,
                ease: 'expo.out',
                stagger: 0.12,
                onComplete: () => split.revert(),
              });
            },
          });
        });

        // --- Oddiy fade-up ---
        q('[data-reveal="up"]').forEach((el) => {
          gsap.fromTo(el, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: onEnter(el, 'top 90%') });
        });

        // --- Ketma-ket chiqish ---
        q('[data-stagger]').forEach((group) => {
          gsap.fromTo(
            q('[data-stagger-item]', group),
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1, scrollTrigger: onEnter(group) },
          );
        });

        // --- Kartochkalar: navbatma-navbat qiya holatdan tekislanadi ---
        q('[data-cards]').forEach((group) => {
          const cards = q('[data-card]', group);
          gsap.fromTo(
            cards,
            { opacity: 0, y: 110, rotate: (i: number) => (i % 2 ? 3 : -3), transformOrigin: '50% 100%' },
            { opacity: 1, y: 0, rotate: 0, duration: 1.1, ease: 'expo.out', stagger: 0.12, scrollTrigger: onEnter(group, 'top 82%') },
          );
          q('[data-avatar]', group).forEach((av, i) => {
            gsap.fromTo(
              av,
              { scale: 0.3, rotate: -30 },
              { scale: 1, rotate: 0, duration: 0.9, ease: 'back.out(1.8)', delay: 0.25 + i * 0.12, scrollTrigger: onEnter(group, 'top 82%') },
            );
          });
        });

        // --- Narxlar: yelpig'ich ---
        q('[data-fan]').forEach((group) => {
          const items = q('[data-fan-item]', group);
          const wide = window.matchMedia('(min-width: 768px)').matches;
          gsap.fromTo(
            items,
            {
              opacity: 0,
              x: (i: number) => (wide ? (i - 1) * -140 : 0),
              y: (i: number) => (wide ? (i === 1 ? 40 : 90) : 60),
              rotate: (i: number) => (wide ? (i - 1) * 8 : 0),
              scale: 0.9,
            },
            { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1, duration: 1.2, ease: 'expo.out', stagger: 0.08, scrollTrigger: onEnter(group, 'top 80%') },
          );
        });

        // --- Rasmlar: parallax + parda ---
        q('[data-photo]').forEach((box) => {
          const img = box.querySelector('[data-parallax]');
          if (img) {
            // Rasm 1.16 marta kattalashtirilgan — parallax chetlarni ochib qo'ymaydi
            gsap.set(img, { scale: 1.16 });
            gsap.fromTo(
              img,
              { yPercent: -6 },
              { yPercent: 6, ease: 'none', scrollTrigger: { trigger: box, start: 'top bottom', end: 'bottom top', scrub: true } },
            );
          }
          const curtain = box.querySelector('[data-curtain]');
          if (curtain) {
            const tl = gsap.timeline({ scrollTrigger: onEnter(box, 'top 80%') });
            tl.fromTo(curtain, { scaleY: 1 }, { scaleY: 0, duration: 1.2, ease: 'expo.inOut' });
            if (img) tl.fromTo(img, { scale: 1.45 }, { scale: 1.16, duration: 1.6, ease: 'expo.out' }, 0.2);
          }
        });

        // --- Qadamlar chizig'i ---
        q('[data-line]').forEach((line) => {
          gsap.fromTo(
            line,
            { scaleX: 0 },
            { scaleX: 1, ease: 'none', scrollTrigger: { trigger: line.parentElement?.parentElement ?? line, start: 'top 80%', end: 'bottom 55%', scrub: true } },
          );
        });

        // --- Raqamlar sanaladi ---
        q('[data-count]').forEach((el) => {
          const target = Number(el.dataset.count);
          const decimals = Number(el.dataset.decimals ?? 0);
          const obj = { v: 0 };
          el.textContent = fmt(0, decimals);
          gsap.to(obj, {
            v: target,
            duration: 2.2,
            ease: 'power2.out',
            scrollTrigger: onEnter(el, 'top 90%'),
            onUpdate: () => {
              el.textContent = fmt(obj.v, decimals);
            },
          });
        });

        // --- Katta yozuv ---
        q('[data-marquee]').forEach((el) => {
          gsap.fromTo(
            el,
            { xPercent: 0 },
            { xPercent: -35, ease: 'none', scrollTrigger: { trigger: el.closest('section') ?? el, start: 'top bottom', end: 'bottom top', scrub: true } },
          );
        });

        // --- Forma bloki kengayadi ---
        q('[data-zoom]').forEach((el) => {
          gsap.fromTo(
            el,
            { scale: 0.92, y: 40 },
            { scale: 1, y: 0, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'top 30%', scrub: true } },
          );
        });

        // --- Taxta: kataklar to'lqin, keyin figuralar tushadi ---
        q('[data-board]').forEach((board) => {
          const tl = gsap.timeline({ scrollTrigger: onEnter(board, 'top 80%') });
          tl.fromTo(
            q('[data-square]', board),
            { opacity: 0, scale: 0.4 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.5,
              ease: 'power2.out',
              stagger: { grid: [8, 8], from: 'end', amount: 0.7 },
              clearProps: 'transform,opacity',
            },
          ).fromTo(
            q('[data-piece]', board),
            { opacity: 0, y: -40 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'bounce.out', stagger: 0.06, clearProps: 'transform,opacity' },
            '-=0.2',
          );
        });
      });

      // Shriftlar yuklanganda va content-visibility bo'limlari chizilganda balandliklar o'zgaradi —
      // ScrollTrigger pozitsiyalarini yangilaymiz
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
      let t = 0;
      ro = new ResizeObserver(() => {
        window.clearTimeout(t);
        t = window.setTimeout(() => ScrollTrigger.refresh(), 150);
      });
      const main = document.querySelector('main');
      if (main) ro.observe(main);
    });

    return () => {
      cancelled = true;
      ro?.disconnect();
      ctx?.revert();
    };
  }, []);

  return null;
}

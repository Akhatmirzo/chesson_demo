'use client';

import { useEffect, useState } from 'react';
import { Logo } from './Logo';
import s from './Intro.module.css';

const N = 6; // 6×6 katak — yengil, lekin «taxta» seziladi

/**
 * Sessiyada birinchi kirishda: taxta kataklari to'lqin bo'lib ochiladi → logo → parda yuqoriga ko'tariladi.
 * Faqat CSS animatsiya (JS kutubxonasiz), <html class="intro"> bo'lmasa umuman ko'rinmaydi.
 */
export function Intro() {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    if (!html.classList.contains('intro')) {
      setGone(true);
      return;
    }
    const t = window.setTimeout(() => {
      html.classList.add('intro-done');
      try {
        sessionStorage.setItem('ch-intro', '1');
      } catch {}
      setGone(true);
    }, 1900);
    return () => clearTimeout(t);
  }, []);

  if (gone) return null;

  return (
    <div className={s.intro} aria-hidden="true">
      <div className={s.board}>
        {Array.from({ length: N * N }, (_, i) => {
          const r = Math.floor(i / N);
          const c = i % N;
          return <span key={i} className={(r + c) % 2 ? s.dark : s.light} style={{ ['--k' as string]: r + c }} />;
        })}
      </div>
      <div className={s.logo}>
        <Logo size={56} />
        <p className={s.tag}>Onlayn shaxmat maktabi</p>
      </div>
    </div>
  );
}

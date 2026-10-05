'use client';

import { useEffect } from 'react';

/**
 * Inter (body shrifti, ~48 KB) birinchi kadr chizilgandan keyin yuklanadi va tayyor bo'lgach
 * <html> ga .fonts-ready qo'shiladi. Ungacha 'Inter Fallback' (next/font yaratgan, o'lchamlari
 * Inter'ga moslangan Arial) ishlatiladi — shuning uchun almashganda matn deyarli siljimaydi.
 */
export default function DeferredFonts() {
  useEffect(() => {
    let cancelled = false;
    const run = () => {
      // 2 kadr kutamiz — birinchi chizish (LCP) albatta o'tib bo'lgan bo'ladi
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          document.fonts
            .load('1em Inter')
            .catch(() => undefined)
            .then(() => {
              if (!cancelled) document.documentElement.classList.add('fonts-ready');
            });
        }),
      );
    };
    if (document.readyState === 'complete') run();
    else window.addEventListener('load', run, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener('load', run);
    };
  }, []);

  return null;
}

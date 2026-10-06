'use client';

import { useEffect, useId, useRef, useState } from 'react';
import s from './Hotspots.module.css';

export interface Spot {
  /** Rasm ustidagi joy, foizda */
  x: number;
  y: number;
  title: string;
  text: string;
}

/**
 * Skrinshot ustidagi miltillovchi nuqtalar. Kompyuterda — ustiga borganda, telefonda — bosganda izoh chiqadi.
 * `auto` berilsa, ko'rinishga kirganda birinchi izoh o'zi bir lahzaga ochiladi (foydalanuvchi bosish mumkinligini sezishi uchun).
 */
export function Hotspots({ spots, auto = false }: { spots: Spot[]; auto?: boolean }) {
  const [open, setOpen] = useState<number | null>(null);
  const [pinned, setPinned] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const uid = useId();
  const pinnedRef = useRef(pinned);
  pinnedRef.current = pinned;

  useEffect(() => {
    if (!auto || !root.current) return;
    let t1: number | undefined;
    let t2: number | undefined;
    const io = new IntersectionObserver(
      ([en]) => {
        if (en.isIntersecting) {
          t1 = window.setTimeout(() => setOpen((o) => (o === null ? 0 : o)), 900);
          t2 = window.setTimeout(() => setOpen((o) => (o === 0 && !pinnedRef.current ? null : o)), 3600);
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(root.current);
    return () => {
      io.disconnect();
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [auto]);

  // tashqariga bosilganda yopiladi
  useEffect(() => {
    if (open === null) return;
    const onDoc = (e: PointerEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) {
        setOpen(null);
        setPinned(false);
      }
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && (setOpen(null), setPinned(false));
    document.addEventListener('pointerdown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className={s.layer} ref={root}>
      {spots.map((sp, i) => {
        const isOpen = open === i;
        const right = sp.x > 58;
        const below = sp.y < 30;
        return (
          <div key={i} className={s.spot} style={{ ['--x' as string]: `${sp.x}%`, ['--y' as string]: `${sp.y}%`, zIndex: isOpen ? 5 : 2 }}>
            <button
              type="button"
              className={`${s.dot} ${isOpen ? s.active : ''}`}
              aria-expanded={isOpen}
              aria-describedby={isOpen ? `${uid}-${i}` : undefined}
              aria-label={sp.title}
              onMouseEnter={() => !pinned && setOpen(i)}
              onMouseLeave={() => !pinned && setOpen((o) => (o === i ? null : o))}
              onFocus={() => setOpen(i)}
              onClick={() => {
                if (isOpen && pinned) {
                  setOpen(null);
                  setPinned(false);
                } else {
                  setOpen(i);
                  setPinned(true);
                }
              }}
            >
              <span className={s.num}>{i + 1}</span>
            </button>
            <div
              id={`${uid}-${i}`}
              role="tooltip"
              className={`${s.tip} ${isOpen ? s.tipOpen : ''} ${right ? s.tipLeft : ''} ${below ? s.tipBelow : ''}`}
            >
              <strong>{sp.title}</strong>
              <span>{sp.text}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

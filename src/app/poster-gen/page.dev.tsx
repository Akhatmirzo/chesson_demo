'use client';
// Faqat dev: 3D sahnadan poster yaratish. README'dagi "Poster" bo'limiga qarang.
// VAQTINCHALIK: poster rasmini 3D sahnadan yaratish uchun. Keyin o'chiriladi.
import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
const KingScene = dynamic(() => import('@/components/hero/KingScene'), { ssr: false });
export default function PosterGen() {
  const progress = useRef(0);
  useEffect(() => {
    document.documentElement.style.background = 'transparent';
    document.body.style.background = 'transparent';
    document.querySelector('header')?.remove();
  }, []);
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'transparent' }}>
      <KingScene progress={progress} subscribe={() => () => {}} onReady={() => ((window as unknown as { __ready: boolean }).__ready = true)} />
    </div>
  );
}

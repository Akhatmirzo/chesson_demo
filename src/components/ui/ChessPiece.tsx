import type { ReactNode, SVGProps } from 'react';

/** Oddiy, to'liq (solid) shaxmat figuralari — 45x45 koordinata tizimida. */
const SHAPES: Record<string, (detail: string) => ReactNode> = {
  p: () => (
    <>
      <circle cx="22.5" cy="13" r="5.5" />
      <path d="M18 21h9l-1 3h-7z" />
      <path d="M19 24h7c1 4.5 3.5 8 6.5 11h-20c3-3 5.5-6.5 6.5-11z" />
      <rect x="10.5" y="35" width="24" height="5.5" rx="2" />
    </>
  ),
  r: () => (
    <>
      <path d="M11.5 8.5h4.5v3.5h3.5V8.5h6v3.5H29V8.5h4.5v7.5L30 19H15l-3.5-3z" />
      <path d="M15.5 19h14l1.3 13.5H14.2z" />
      <path d="M12 32.5h21v3H12z" />
      <rect x="10" y="35.5" width="25" height="5" rx="2" />
    </>
  ),
  k: () => (
    <>
      <path d="M21 3.5h3v3h3v3h-3v4h-3v-4h-3v-3h3z" />
      <path d="M22.5 13.5c-6.5 0-11.5 3.5-11.5 8.5 0 3.7 2.5 6.6 4 9.5h15c1.5-2.9 4-5.8 4-9.5 0-5-5-8.5-11.5-8.5z" />
      <path d="M15 31.5h15l1.5 4h-18z" />
      <rect x="10.5" y="35.5" width="24" height="5" rx="2" />
    </>
  ),
  q: () => (
    <>
      <circle cx="8.5" cy="12" r="2.6" />
      <circle cx="15.5" cy="9.5" r="2.6" />
      <circle cx="22.5" cy="8.5" r="2.6" />
      <circle cx="29.5" cy="9.5" r="2.6" />
      <circle cx="36.5" cy="12" r="2.6" />
      <path d="M9 14.5 14 30h17l5-15.5-6.5 8-1-10.5-4 10-2.5-11-2.5 11-4-10-1 10.5z" />
      <path d="M13.5 30h18l1.2 5h-20.4z" />
      <rect x="10.5" y="35.5" width="24" height="5" rx="2" />
    </>
  ),
  b: (detail) => (
    <>
      <circle cx="22.5" cy="6.5" r="2.6" />
      <path d="M22.5 9c-5 3.5-7.5 8.2-7.5 12.2 0 4.3 3 6.8 7.5 6.8s7.5-2.5 7.5-6.8c0-4-2.5-8.7-7.5-12.2z" />
      <path d="M22.5 14.5v6M19.5 17.5h6" stroke={detail} strokeWidth="1.8" />
      <path d="M17 28.5h11l1.5 6.5h-14z" />
      <rect x="10.5" y="35.5" width="24" height="5" rx="2" />
    </>
  ),
  n: (detail) => (
    <>
      <path d="M13.5 35.5h20c.5-9-1.5-16.5-6-21.5l.5-5-3.5 2.5c-2.3-1.2-4.7-1-6.8.2L16.5 9l.2 4.6c-3.2 2.8-5.5 6.4-6.5 10.4l2.3 3.2 4.6-2.6 3.3.6c-3.2 2.8-5.9 6-6.9 10.3z" />
      <circle cx="20" cy="17.5" r="1.3" fill={detail} stroke="none" />
      <rect x="10.5" y="35.5" width="24" height="5" rx="2" />
    </>
  ),
};

type Props = SVGProps<SVGSVGElement> & { piece: string };

/** piece: 'K','Q','R','B','N','P' — oq; kichik harf — qora */
export default function ChessPiece({ piece, ...rest }: Props) {
  const white = piece === piece.toUpperCase();
  const fill = white ? '#fffdf8' : '#1a1a1a';
  const detail = white ? '#1a1a1a' : '#fffdf8';
  const shape = SHAPES[piece.toLowerCase()];
  if (!shape) return null;
  return (
    <svg viewBox="0 0 45 45" fill={fill} stroke="#1a1a1a" strokeWidth="1.5" strokeLinejoin="round" {...rest}>
      {shape(detail)}
    </svg>
  );
}

import s from './Logo.module.css';

/**
 * Brend logosi («chess on — online shaxmat maktabi», public/brand). `ink` — yorug' fon uchun (matn to'q),
 * `white` — to'q fon uchun (asl oq). O'lcham — balandlik bo'yicha (nisbat 326×200). `alt` — sahifa tilida.
 */
export function Logo({
  height = 44,
  variant = 'ink',
  priority = false,
  alt = 'Chesson — online shaxmat maktabi',
}: {
  height?: number;
  variant?: 'ink' | 'white';
  priority?: boolean;
  alt?: string;
}) {
  const src = `/brand/logo-${variant}`;
  return (
    <picture className={s.logo}>
      <source srcSet={`${src}.webp`} type="image/webp" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${src}.png`}
        alt={alt}
        height={height}
        width={Math.round((height * 326) / 200)}
        style={{ height, width: 'auto' }}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
      />
    </picture>
  );
}

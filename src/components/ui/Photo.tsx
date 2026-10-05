type Props = {
  /** public/photos ichidagi fayl nomi, o'lchamsiz: masalan "bolalar-guruh" */
  name: string;
  alt: string;
  className?: string;
  sizes?: string;
  /** Ochilishda "parda" effekti (pastdan yuqoriga) */
  curtain?: boolean;
  /** Parda rangi (tailwind bg-*) */
  curtainClass?: string;
};

/** Rasm: 800/1200 WebP srcset, ichki parallax va ixtiyoriy "parda" bilan ochilish. */
export default function Photo({
  name,
  alt,
  className = '',
  sizes = '(min-width: 1024px) 40vw, 100vw',
  curtain = false,
  curtainClass = 'bg-cream',
}: Props) {
  return (
    <div className={`relative overflow-hidden rounded-[28px] bg-cream-deep ${className}`} data-photo>
      <img
        data-parallax
        src={`/photos/${name}-800.webp`}
        srcSet={`/photos/${name}-800.webp 800w, /photos/${name}-1200.webp 1200w`}
        sizes={sizes}
        alt={alt}
        width={1200}
        height={800}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full scale-[1.16] object-cover"
      />
      {curtain && <div data-curtain aria-hidden="true" className={`absolute inset-0 origin-top ${curtainClass}`} />}
    </div>
  );
}

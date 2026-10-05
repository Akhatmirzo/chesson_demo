import { brand, showSampleBadges, stats } from '@/content/site';
import { display } from '@/lib/typo';
import { formatNumber } from '@/lib/format';

export default function Stats() {
  return (
    <section id="natijalar" className="cv relative overflow-hidden bg-forest-deep py-20 text-cream lg:py-28" aria-labelledby="natijalar-title">
      {/* Fon foto + parallax */}
      <div aria-hidden="true" className="absolute inset-0" data-photo>
        <img
          data-parallax
          src="/photos/taxta-yaqin-800.webp"
          srcSet="/photos/taxta-yaqin-800.webp 800w, /photos/taxta-yaqin-1200.webp 1200w"
          sizes="100vw"
          alt=""
          width={1200}
          height={800}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full scale-[1.16] object-cover opacity-[0.16]"
        />
      </div>

      {/* Scroll bilan siljiydigan katta yozuv */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-6 overflow-hidden whitespace-nowrap select-none">
        <p data-marquee className="font-display text-[18vw] leading-none font-black text-cream/[0.05] lg:text-[11rem]">
          {display(`${brand.name} · Oʻyla · Yur · Gʻalaba · ${brand.name} · Oʻyla · Yur · Gʻalaba`)}
        </p>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p data-reveal="up" className="text-sm font-bold tracking-[0.14em] text-coral uppercase">
          {stats.eyebrow}
          {showSampleBadges && <span className="ml-2 tracking-normal normal-case text-cream/50">(namuna)</span>}
        </p>
        <h2 id="natijalar-title" data-split="lines" className="mt-4 font-display text-4xl font-black tracking-tight sm:text-5xl">
          {display(stats.title)}
        </h2>

        <dl data-stagger className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 lg:mt-16 lg:grid-cols-4">
          {stats.items.map((s) => (
            <div key={s.label} data-stagger-item className="border-t border-cream/15 pt-6">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block font-display text-5xl font-black tracking-tight tabular-nums sm:text-6xl lg:text-7xl">
                  <span data-count={s.value} data-decimals={s.decimals}>
                    {formatNumber(s.value, s.decimals)}
                  </span>
                  <span className="text-coral">{s.suffix}</span>
                </span>
                <span className="mt-3 block max-w-[16rem] text-cream/70" aria-hidden="true">
                  {s.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

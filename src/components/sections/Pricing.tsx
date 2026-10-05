import { Check, Sparkles } from 'lucide-react';
import { pricing, showSampleBadges } from '@/content/site';
import SectionHeading from '@/components/ui/SectionHeading';
import { display } from '@/lib/typo';

export default function Pricing() {
  return (
    <section id="narxlar" className="cv relative overflow-hidden bg-cream-deep py-20 lg:py-32" aria-labelledby="narxlar-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="narxlar-title" eyebrow={pricing.eyebrow} title={pricing.title} lead={pricing.lead} center />

        <ul data-fan className="mt-14 grid items-stretch gap-5 md:grid-cols-3 lg:mt-16 lg:gap-6">
          {pricing.plans.map((p) => (
            <li
              key={p.name}
              data-fan-item
              className={`relative flex flex-col rounded-[28px] p-7 lg:p-9 ${
                p.featured
                  ? 'bg-forest text-cream shadow-[0_40px_80px_-40px_rgba(22,58,43,0.8)] md:-my-4 md:py-11 lg:py-13'
                  : 'border border-ink/8 bg-cream'
              }`}
            >
              {p.featured && (
                <span className="absolute -top-3.5 left-7 inline-flex items-center gap-1.5 rounded-full bg-coral px-3.5 py-1.5 text-xs font-bold text-ink">
                  <Sparkles className="size-3.5" aria-hidden="true" />
                  {p.featuredLabel}
                </span>
              )}
              <h3 className={`font-display text-xl font-extrabold ${p.featured ? 'text-cream' : 'text-ink'}`}>
                {display(p.name)}
              </h3>
              <p className="mt-5 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <span className="font-display text-[2.6rem] leading-none font-black tracking-tight whitespace-nowrap tabular-nums lg:text-5xl">{p.price}</span>
                <span className={p.featured ? 'text-cream/70' : 'text-ink-soft'}>
                  {pricing.currency} / {p.period}
                </span>
              </p>
              <ul className="mt-7 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className={`flex gap-2.5 ${p.featured ? 'text-cream/85' : 'text-ink-soft'}`}>
                    <Check
                      className={`mt-0.5 size-4 shrink-0 ${p.featured ? 'text-coral' : 'text-forest'}`}
                      strokeWidth={3}
                      aria-hidden="true"
                    />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <a
                  href="#yozilish"
                  className={`flex items-center justify-center rounded-full px-6 py-3.5 font-bold transition-transform hover:-translate-y-0.5 ${
                    p.featured ? 'bg-coral text-ink' : 'bg-ink text-cream'
                  }`}
                >
                  Bepul sinovdan boshlash
                </a>
              </div>
            </li>
          ))}
        </ul>

        <p data-reveal="up" className="mt-12 text-center text-ink-soft">
          {pricing.note}
          {showSampleBadges && (
            <span className="ml-2 rounded-full bg-ink/8 px-2 py-0.5 text-xs font-semibold text-ink-soft">namuna narxlar</span>
          )}
        </p>
      </div>
    </section>
  );
}

import { Quote, Star } from 'lucide-react';
import { showSampleBadges, testimonials } from '@/content/site';
import SectionHeading from '@/components/ui/SectionHeading';

export default function Testimonials() {
  return (
    <section id="fikrlar" className="cv bg-cream py-20 lg:py-32" aria-labelledby="fikrlar-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="fikrlar-title" eyebrow={testimonials.eyebrow} title={testimonials.title} center />

        <ul data-cards className="mt-14 grid gap-5 md:grid-cols-3 lg:gap-6">
          {testimonials.items.map((t, i) => (
            <li
              key={t.name}
              data-card
              className={`relative flex flex-col rounded-[28px] p-7 lg:p-8 ${
                i === 1 ? 'bg-forest text-cream md:mt-8 md:-mb-8' : 'border border-ink/8 bg-white/70'
              }`}
            >
              <Quote className={`size-9 ${i === 1 ? 'text-coral' : 'text-forest/25'}`} aria-hidden="true" />
              <div className="mt-5 flex gap-0.5" role="img" aria-label="5 dan 5 baho">
                {Array.from({ length: 5 }, (_, s) => (
                  <Star key={s} className="size-4 text-coral" fill="currentColor" aria-hidden="true" />
                ))}
              </div>
              <blockquote className={`mt-4 text-lg leading-relaxed ${i === 1 ? 'text-cream/90' : 'text-ink'}`}>
                {t.text}
              </blockquote>
              <p className="mt-auto pt-7">
                <span className="block font-bold">{t.name}</span>
                <span className={`text-sm ${i === 1 ? 'text-cream/65' : 'text-ink-soft'}`}>{t.who}</span>
              </p>
              {showSampleBadges && (
                <span
                  className={`absolute top-7 right-7 rounded-full border border-dashed px-2.5 py-1 text-xs font-semibold ${
                    i === 1 ? 'border-cream/30 text-cream/70' : 'border-ink/25 text-ink-soft'
                  }`}
                >
                  namuna
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

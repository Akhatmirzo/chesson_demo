import { coaches, showSampleBadges } from '@/content/site';
import SectionHeading from '@/components/ui/SectionHeading';

const tones = ['bg-forest text-cream', 'bg-coral text-ink', 'bg-ink text-cream'];

export default function Coaches() {
  return (
    <section id="murabbiylar" className="cv bg-cream py-20 lg:py-32" aria-labelledby="murabbiylar-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="murabbiylar-title" eyebrow={coaches.eyebrow} title={coaches.title} lead={coaches.lead} />

        <ul data-cards className="mt-14 grid gap-5 md:grid-cols-3 lg:gap-6">
          {coaches.items.map((c, i) => (
            <li key={c.name} data-card className="group relative rounded-[28px] border border-ink/8 bg-white/70 p-7 lg:p-8">
              {showSampleBadges && (
                <span className="absolute top-6 right-6 rounded-full border border-dashed border-ink/25 px-2.5 py-1 text-xs font-semibold text-ink-soft">
                  namuna
                </span>
              )}
              <div
                data-avatar
                aria-hidden="true"
                className={`flex size-24 items-center justify-center rounded-[26px] font-display text-3xl font-black tracking-tight ${tones[i % tones.length]}`}
              >
                {c.initials}
              </div>
              <h3 className="mt-7 text-xl font-bold">{c.name}</h3>
              <p className="mt-1 text-sm font-semibold text-forest">{c.role}</p>
              <p className="mt-4 leading-relaxed text-ink-soft">{c.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

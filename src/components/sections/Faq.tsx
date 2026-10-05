import { Plus } from 'lucide-react';
import { brand, faq } from '@/content/site';
import SectionHeading from '@/components/ui/SectionHeading';

/** Accordion: <details name="faq"> — bir vaqtda bittasi ochiq, JS kerak emas. */
export default function Faq() {
  return (
    <section id="savollar" className="cv bg-cream-deep py-20 lg:py-32" aria-labelledby="savollar-title">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeading id="savollar-title" eyebrow={faq.eyebrow} title={faq.title} />
            <p data-reveal="up" className="mt-6 text-ink-soft">
              Javob topmadingizmi? Telegramʼda yozing:{' '}
              <a href={brand.telegram} className="font-bold text-forest underline-offset-4 hover:underline">
                {brand.telegramLabel}
              </a>
            </p>
          </div>
        </div>

        <div data-stagger className="space-y-3 lg:col-span-7">
          {faq.items.map((item, i) => (
            <details
              key={item.q}
              name="faq"
              data-stagger-item
              open={i === 0}
              className="group rounded-3xl border border-ink/8 bg-cream px-6 transition-colors open:bg-white"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-6 py-5 text-lg font-bold">
                {item.q}
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-forest/8 text-forest transition-transform duration-300 group-open:rotate-45 group-open:bg-forest group-open:text-cream">
                  <Plus className="size-5" aria-hidden="true" />
                </span>
              </summary>
              <div className="faq-body pb-6 leading-relaxed text-ink-soft">{item.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

import { LayoutGrid, MonitorPlay, Video } from 'lucide-react';
import { steps } from '@/content/site';
import SectionHeading from '@/components/ui/SectionHeading';
import Photo from '@/components/ui/Photo';
import { display } from '@/lib/typo';

const platforms = [
  { icon: Video, label: 'Zoom' },
  { icon: MonitorPlay, label: 'Google Meet' },
  { icon: LayoutGrid, label: 'Interaktiv taxta' },
];

/** Desktopda hero ustiga "panel" bo'lib chiqib keladi (lg:-mt-[100vh]). */
export default function Steps() {
  return (
    <section id="jarayon" className="cv relative z-20 lg:-mt-[100vh]" aria-labelledby="jarayon-title">
      <div
        data-panel
        className="origin-top rounded-t-[36px] bg-forest text-cream shadow-[0_-30px_80px_-30px_rgba(22,58,43,0.55)] lg:rounded-t-[56px]"
      >
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
          <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <SectionHeading id="jarayon-title" eyebrow={steps.eyebrow} title={steps.title} lead={steps.lead} dark />
              <ul data-stagger className="mt-8 flex flex-wrap gap-2.5">
                {platforms.map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    data-stagger-item
                    className="flex items-center gap-2 rounded-full border border-cream/20 bg-cream/5 px-4 py-2 text-sm font-semibold"
                  >
                    <Icon className="size-4 text-coral" aria-hidden="true" />
                    {label}
                  </li>
                ))}
              </ul>
            </div>
            {/* Faqat desktopda: mobilda bu rasm birinchi ekran yuklanishiga (LCP) qo'shilib qolardi */}
            <Photo
              name="qiz-oylaydi"
              alt="Qiz shaxmat taxtasi ustida keyingi yurishni oʻylayapti"
              className="hidden aspect-[4/3] lg:col-span-5 lg:block"
              curtain
              curtainClass="bg-forest"
            />
          </div>

          <div className="relative mt-16 lg:mt-24">
            {/* Qadamlarni bog'lovchi chiziq — scroll bilan chiziladi */}
            <div aria-hidden="true" className="absolute top-7 right-0 left-0 hidden h-px bg-cream/15 lg:block">
              <div data-line className="h-[2px] origin-left -translate-y-px bg-coral" />
            </div>
            <ol data-stagger className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {steps.items.map((item, i) => (
              <li key={item.title} data-stagger-item className="relative">
                <span className="relative flex size-14 items-center justify-center rounded-full border border-cream/25 bg-forest font-display text-lg font-black text-coral">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-6 font-display text-2xl font-extrabold">{display(item.title)}</h3>
                <p className="mt-3 leading-relaxed text-cream/75">{item.text}</p>
              </li>
            ))}
            </ol>
          </div>

        </div>
      </div>
    </section>
  );
}

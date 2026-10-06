import { ArrowRight, CalendarDays, Check, Users } from 'lucide-react';
import { courses } from '@/content/site';
import SectionHeading from '@/components/ui/SectionHeading';
import Photo from '@/components/ui/Photo';
import { display } from '@/lib/typo';

const accents = ['bg-green-pale text-green-ink', 'bg-blue-pale text-blue-ink', 'bg-bee-pale text-bee-ink'];

export default function Courses() {
  return (
    <section id="kurslar" className="cv relative bg-paper py-20 lg:py-32" aria-labelledby="kurslar-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading id="kurslar-title" eyebrow={courses.eyebrow} title={courses.title} lead={courses.lead} />
          </div>
        </div>

        <Photo
          name="bolalar-guruh"
          alt="Bolalar murabbiy bilan guruhda shaxmat oʻynamoqda"
          className="mt-12 aspect-[16/10] sm:aspect-[21/8]"
          sizes="(min-width: 1280px) 1216px, 100vw"
          curtain
        />

        <ul data-cards className="mt-10 grid gap-5 md:grid-cols-3 lg:mt-14 lg:gap-6">
          {courses.items.map((c, i) => (
            <li
              key={c.level}
              data-card
              className="flex flex-col rounded-[24px] border-2 border-b-4 border-swan bg-paper p-7 lg:p-8"
            >
              <span className={`self-start rounded-full px-3.5 py-1.5 text-xs font-bold tracking-wide uppercase ${accents[i]}`}>
                {i + 1}-daraja
              </span>
              <h3 className="mt-5 font-display text-3xl font-black tracking-tight">{display(c.level)}</h3>
              <dl className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[15px] text-ink-soft">
                <div className="flex items-center gap-1.5">
                  <dt className="sr-only">Yosh</dt>
                  <Users className="size-4 text-macaw-deep" aria-hidden="true" />
                  <dd>{c.age}</dd>
                </div>
                <div className="flex items-center gap-1.5">
                  <dt className="sr-only">Davomiylik</dt>
                  <CalendarDays className="size-4 text-macaw-deep" aria-hidden="true" />
                  <dd>{c.duration}</dd>
                </div>
              </dl>
              <p className="mt-6 text-sm font-bold text-ink">Nimani oʻrganadi:</p>
              <ul className="mt-3 space-y-2.5">
                {c.learns.map((l) => (
                  <li key={l} className="flex gap-2.5 leading-snug text-ink-soft">
                    <Check className="mt-0.5 size-4 shrink-0 text-green-deep" strokeWidth={3} aria-hidden="true" />
                    {l}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <div
          data-reveal="up"
          className="mt-6 grid overflow-hidden rounded-[24px] border-2 border-b-4 border-[#84d8ff] bg-blue-pale sm:grid-cols-5 lg:mt-8"
        >
          <Photo
            name="ota-bola"
            alt="Kattalar va bola shaxmat oʻynamoqda"
            className="aspect-[16/10] rounded-none sm:col-span-2 sm:aspect-auto sm:min-h-[260px]"
            sizes="(min-width: 640px) 40vw, 100vw"
          />
          <div className="flex flex-col justify-center p-7 sm:col-span-3 lg:p-10">
            <h3 className="font-display text-2xl font-black sm:text-3xl">{display(courses.adults.title)}</h3>
            <p className="mt-3 max-w-lg leading-relaxed text-ink-soft">{courses.adults.text}</p>
            <a
              href="#yozilish"
              className="group mt-6 inline-flex items-center gap-2 self-start font-extrabold tracking-[0.04em] text-blue-ink uppercase"
            >
              Kattalar kursiga yozilish
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

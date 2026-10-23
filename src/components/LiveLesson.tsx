import { Hand, MessagesSquare, MousePointerClick, Users } from 'lucide-react';
import { getDict, type Locale } from '@/i18n';
import { ClassroomDemo } from './ClassroomDemo';
import s from './LiveLesson.module.css';

/** Ikonkalar; matni lug'atda (`live.points`, shu tartibda) */
const ICONS = [MousePointerClick, Hand, MessagesSquare, Users];

export function LiveLesson({ locale }: { locale: Locale }) {
  const t = getDict(locale).live;
  const [before, hl, after] = t.title;
  return (
    <section id="dars" className={s.section}>
      <div className={s.glow} aria-hidden="true" />
      <div className={`container ${s.inner}`}>
        <div className={s.copy}>
          <span className={`eyebrow ${s.eyebrow} reveal`}>{t.eyebrow}</span>
          <h2 className={`h2 ${s.h2} reveal`} style={{ ['--d' as string]: '80ms' }}>
            {before} <span className={s.hl}>{hl}</span> {after}
          </h2>
          <p className={`lead ${s.lead} reveal`} style={{ ['--d' as string]: '160ms' }}>
            {t.lead}
          </p>
          <ul className={s.points}>
            {t.points.map((p, i) => {
              const Icon = ICONS[i];
              return (
                <li key={p.title} className="reveal" style={{ ['--d' as string]: `${220 + i * 90}ms` }}>
                  <span className={s.pIcon}>
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <span>
                    <b>{p.title}</b>
                    <span>{p.text}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className={`${s.demo} reveal`} style={{ ['--d' as string]: '120ms' }}>
          <ClassroomDemo />
          <p className={s.caption}>{t.caption}</p>
        </div>
      </div>
    </section>
  );
}

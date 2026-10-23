import { getDict, type Locale } from '@/i18n';
import s from './TrialSteps.module.css';

export function TrialSteps({ locale }: { locale: Locale }) {
  const t = getDict(locale).trial;
  return (
    <section id="sinov" className="section">
      <div className="container">
        <div className="head-center reveal">
          <span className="eyebrow">{t.eyebrow}</span>
          <h2 className="h2">{t.title}</h2>
          <p className="lead">{t.lead}</p>
        </div>
        <ol className={s.steps}>
          {t.steps.map((st, i) => (
            <li key={st.title} className={`${s.step} reveal`} style={{ ['--d' as string]: `${i * 140}ms` }}>
              <span className={`${s.num} ${i === 2 ? s.last : ''}`}>{i + 1}</span>
              <span className={s.time}>{st.time}</span>
              <h3>{st.title}</h3>
              <p>{st.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

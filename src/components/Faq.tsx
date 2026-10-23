'use client';

import { Plus } from 'lucide-react';
import { useLanding, useT } from './providers';
import s from './Faq.module.css';

export function Faq() {
  const { faq } = useLanding();
  const t = useT().faq;
  if (!faq.length) return null;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
  return (
    <section id="savollar" className="section">
      <div className="container">
        <div className="head-center reveal">
          <span className="eyebrow">{t.eyebrow}</span>
          <h2 className="h2">{t.title}</h2>
        </div>
        <div className={s.list}>
          {faq.map((f, i) => (
            <details key={f.q} className={`${s.item} reveal`} style={{ ['--d' as string]: `${i * 60}ms` }}>
              <summary>
                {f.q}
                <span className={s.icon} aria-hidden="true">
                  <Plus size={18} />
                </span>
              </summary>
              <div className={s.answer}>
                <p>{f.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </section>
  );
}

'use client';

import { Languages, Trophy } from 'lucide-react';
import { useLanding } from './providers';
import s from './Coaches.module.css';

/** Rasm manzili: "/coaches/..." — landingning o'zida, "/api/..." — admin yuklagan (API orqali), to'liq URL — o'zicha */
function photoSrc(url: string): string {
  if (/^https?:\/\//.test(url) || url.startsWith('/coaches/')) return url;
  const api = process.env.NEXT_PUBLIC_API_BASE;
  if (api && url.startsWith('/api/')) return api.replace(/\/api\/?$/, '') + url;
  return url;
}

export function Coaches() {
  const { coaches } = useLanding();
  if (!coaches.length) return null;
  // Kompyuterda cheksiz lenta: ro'yxat ikki marta (ikkinchisi ekran o'quvchilardan yashirin)
  const loop = coaches.length >= 4;
  return (
    <section id="murabbiylar" className="section">
      <div className="container">
        <div className="head-center reveal">
          <span className="eyebrow">Murabbiylar</span>
          <h2 className="h2">
            Farzandingizga saboq beradigan <span className="grad-text">tajribali ustozlar</span>
          </h2>
          <p className="lead">FIDE unvonli va reytingli murabbiylar — bolalar bilan ishlashni biladigan, sabrli ustozlar.</p>
        </div>
      </div>
      <div className={`${s.viewport} reveal`} style={{ ['--d' as string]: '120ms' }}>
        <div className={`${s.rail} ${loop ? s.loop : ''}`} style={{ ['--count' as string]: coaches.length }}>
          {(loop ? [...coaches, ...coaches] : coaches).map((c, i) => (
            <article key={`${c.id}-${i}`} className={s.card} aria-hidden={i >= coaches.length ? true : undefined}>
              <div className={s.photo}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photoSrc(c.photoUrl)} alt={i < coaches.length ? c.name : ''} loading="lazy" width={600} height={750} />
              </div>
              <div className={s.body}>
                <h3>{c.name}</h3>
                <span className={s.title}>
                  <Trophy size={13} aria-hidden="true" /> {c.title}
                </span>
                <p>{c.experience}</p>
                <span className={s.lang}>
                  <Languages size={14} aria-hidden="true" /> {c.languages}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

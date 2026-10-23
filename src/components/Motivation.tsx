'use client';

import { useEffect, useRef, useState } from 'react';
import { useT } from './providers';
import s from './Motivation.module.css';

/** Daraja donalari (nomi lug'atda — `motivation.levels`) */
const LEVELS = ['wP', 'wN', 'wB', 'wR', 'wQ'];

/** Tanga manbalari rangi (matni lug'atda — `motivation.earn`) */
const EARN_TONES = ['violet', 'amber', 'green', 'blue', 'orange', 'violet'];

const MEDALS = ['ach-firstwin', 'ach-streak', 'ach-puzzle', 'ach-win', 'ach-friends', 'ach-throne'];
const OPPONENTS = ['ant', 'chick', 'bunny', 'fox', 'wolf', 'bear', 'eagle', 'lion'];

export function Motivation() {
  const t = useT().motivation;
  const ref = useRef<HTMLDivElement>(null);
  const [lvl, setLvl] = useState(0);

  // Ko'rinishga kirganda daraja yo'li bosqichma-bosqich to'ladi
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let timer: number | undefined;
    const io = new IntersectionObserver(
      ([en]) => {
        if (!en.isIntersecting) return;
        io.disconnect();
        let i = 0;
        const step = () => {
          i += 1;
          setLvl(i);
          if (i < LEVELS.length - 1) timer = window.setTimeout(step, 520);
        };
        timer = window.setTimeout(step, 400);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <section className={`section ${s.section}`} id="motivatsiya">
      <div className="container">
        <div className="head-center reveal">
          <span className="eyebrow">{t.eyebrow}</span>
          <h2 className="h2">{t.title}</h2>
          <p className="lead">{t.lead}</p>
        </div>

        <div className={s.bento}>
          <article className={`${s.card} ${s.levels} reveal`} ref={ref}>
            <h3>{t.levelsTitle}</h3>
            <p>{t.levelsText}</p>
            <div className={s.path} style={{ ['--p' as string]: lvl / (LEVELS.length - 1) }}>
              <span className={s.track}>
                <i />
              </span>
              {LEVELS.map((img, i) => (
                <span key={img} className={`${s.node} ${i <= lvl ? s.nodeOn : ''}`}>
                  <span className={s.badge}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/kidpieces/${img}.webp`} alt="" width={40} height={40} loading="lazy" />
                  </span>
                  <small>{t.levels[i]}</small>
                </span>
              ))}
            </div>
          </article>

          <article className={`${s.card} ${s.earn} reveal`} style={{ ['--d' as string]: '100ms' }}>
            <div className={s.earnHead}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/art/dokonchi-tanga.webp" alt="" width={64} height={64} loading="lazy" />
              <div>
                <h3>{t.earnTitle}</h3>
                <p>{t.earnText}</p>
              </div>
            </div>
            <ul>
              {t.earn.map(([label, v], i) => (
                <li key={label} className={s[EARN_TONES[i]]}>
                  <span>{label}</span>
                  <b>{v}</b>
                </li>
              ))}
            </ul>
          </article>

          <article className={`${s.card} ${s.medals} reveal`} style={{ ['--d' as string]: '160ms' }}>
            <h3>{t.medalsTitle}</h3>
            <p>{t.medalsText}</p>
            <div className={s.medalRow}>
              {MEDALS.map((m, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={m} src={`/art/${m}.webp`} alt="" width={84} height={84} loading="lazy" style={{ ['--k' as string]: i }} />
              ))}
            </div>
          </article>

          <article className={`${s.card} ${s.opps} reveal`} style={{ ['--d' as string]: '220ms' }}>
            <h3>{t.oppsTitle}</h3>
            <p>{t.oppsText}</p>
            <div className={s.oppRow}>
              {OPPONENTS.map((o, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={o} src={`/art/opp-${o}.webp`} alt="" width={56} height={56} loading="lazy" style={{ ['--k' as string]: i }} />
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

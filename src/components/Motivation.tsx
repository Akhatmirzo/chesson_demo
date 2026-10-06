'use client';

import { useEffect, useRef, useState } from 'react';
import s from './Motivation.module.css';

const LEVELS = [
  { name: 'Piyoda', img: 'wP' },
  { name: 'Ot', img: 'wN' },
  { name: 'Fil', img: 'wB' },
  { name: 'Ruh', img: 'wR' },
  { name: 'Farzin', img: 'wQ' },
];

const EARN = [
  { label: 'Zadacha', v: '+1', tone: 'violet' },
  { label: "O'yinda g'alaba", v: '+1', tone: 'amber' },
  { label: 'Darsda qatnashish', v: '+10', tone: 'green' },
  { label: 'Uyga vazifa', v: '10 gacha', tone: 'blue' },
  { label: '7 kunlik seriya', v: '+20', tone: 'orange' },
  { label: 'Ustoz bonusi', v: '+1–5', tone: 'violet' },
];

const MEDALS = ['ach-firstwin', 'ach-streak', 'ach-puzzle', 'ach-win', 'ach-friends', 'ach-throne'];
const OPPONENTS = ['ant', 'chick', 'bunny', 'fox', 'wolf', 'bear', 'eagle', 'lion'];

export function Motivation() {
  const ref = useRef<HTMLDivElement>(null);
  const [lvl, setLvl] = useState(0);

  // Ko'rinishga kirganda daraja yo'li bosqichma-bosqich to'ladi
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let t: number | undefined;
    const io = new IntersectionObserver(
      ([en]) => {
        if (!en.isIntersecting) return;
        io.disconnect();
        let i = 0;
        const step = () => {
          i += 1;
          setLvl(i);
          if (i < LEVELS.length - 1) t = window.setTimeout(step, 520);
        };
        t = window.setTimeout(step, 400);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, []);

  return (
    <section className={`section ${s.section}`} id="motivatsiya">
      <div className="container">
        <div className="head-center reveal">
          <span className="eyebrow">Motivatsiya</span>
          <h2 className="h2">
            O&apos;qish — <span className="grad-text">o&apos;yindek qiziqarli</span>
          </h2>
          <p className="lead">Tanga, XP, darajalar va medallar bolani har kuni o&apos;zi xohlab shaxmatga qaytaradi. Yig&apos;ilgan tangalarga do&apos;kondan sovg&apos;a oladi.</p>
        </div>

        <div className={s.bento}>
          <article className={`${s.card} ${s.levels} reveal`} ref={ref}>
            <h3>Piyodadan Farzingacha</h3>
            <p>Har bir dars, vazifa va zadacha XP beradi — bola darajama-daraja ko&apos;tariladi.</p>
            <div className={s.path} style={{ ['--p' as string]: lvl / (LEVELS.length - 1) }}>
              <span className={s.track}>
                <i />
              </span>
              {LEVELS.map((l, i) => (
                <span key={l.name} className={`${s.node} ${i <= lvl ? s.nodeOn : ''}`}>
                  <span className={s.badge}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/kidpieces/${l.img}.webp`} alt="" width={40} height={40} loading="lazy" />
                  </span>
                  <small>{l.name}</small>
                </span>
              ))}
            </div>
          </article>

          <article className={`${s.card} ${s.earn} reveal`} style={{ ['--d' as string]: '100ms' }}>
            <div className={s.earnHead}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/art/dokonchi-tanga.webp" alt="" width={64} height={64} loading="lazy" />
              <div>
                <h3>Tanga qanday yig&apos;iladi?</h3>
                <p>Do&apos;kondan avatar, unvon va sovg&apos;alar olish uchun.</p>
              </div>
            </div>
            <ul>
              {EARN.map((e) => (
                <li key={e.label} className={s[e.tone]}>
                  <span>{e.label}</span>
                  <b>{e.v}</b>
                </li>
              ))}
            </ul>
          </article>

          <article className={`${s.card} ${s.medals} reveal`} style={{ ['--d' as string]: '160ms' }}>
            <h3>Medallar</h3>
            <p>Birinchi g&apos;alaba, 7 kunlik seriya, «Boshqotirma qiroli»…</p>
            <div className={s.medalRow}>
              {MEDALS.map((m, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={m} src={`/art/${m}.webp`} alt="" width={84} height={84} loading="lazy" style={{ ['--k' as string]: i }} />
              ))}
            </div>
          </article>

          <article className={`${s.card} ${s.opps} reveal`} style={{ ['--d' as string]: '220ms' }}>
            <h3>8 ta raqib — chumolidan sherga</h3>
            <p>Kompyuter raqiblari bola bilan birga «o&apos;sadi».</p>
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

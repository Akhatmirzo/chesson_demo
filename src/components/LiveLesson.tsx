import { Hand, MessagesSquare, MousePointerClick, Users } from 'lucide-react';
import { ClassroomDemo } from './ClassroomDemo';
import s from './LiveLesson.module.css';

const POINTS = [
  { icon: MousePointerClick, title: 'Umumiy taxta', text: "Ustoz yurgan har bir yurish, chizgan o'q va belgi bolaning ekranida darhol ko'rinadi." },
  { icon: Hand, title: "Qo'l ko'tarish va yurish huquqi", text: "Savoli bo'lsa qo'l ko'taradi. Ustoz ruxsat bersa — taxtada o'zi yuradi." },
  { icon: MessagesSquare, title: 'Kamera, ovoz va chat', text: "Ustozni ko'rib, eshitib o'tiradi. Uyalchan bola chatda yozishi ham mumkin." },
  { icon: Users, title: 'Guruhda yoki yakkama-yakka', text: 'Kichik guruhlarda yoki individual — bolangizga qaysi qulay bo\'lsa.' },
];

export function LiveLesson() {
  return (
    <section id="dars" className={s.section}>
      <div className={s.glow} aria-hidden="true" />
      <div className={`container ${s.inner}`}>
        <div className={s.copy}>
          <span className={`eyebrow ${s.eyebrow} reveal`}>Jonli dars</span>
          <h2 className={`h2 ${s.h2} reveal`} style={{ ['--d' as string]: '80ms' }}>
            Ustoz bilan xuddi <span className={s.hl}>yonma-yon</span> o&apos;tirgandek
          </h2>
          <p className={`lead ${s.lead} reveal`} style={{ ['--d' as string]: '160ms' }}>
            Darslar o&apos;zimizning dars xonamizda o&apos;tadi — Zoom&apos;siz, havolasiz. Kompyuter, planshet yoki telefonda brauzer bo&apos;lsa yetarli.
          </p>
          <ul className={s.points}>
            {POINTS.map((p, i) => (
              <li key={p.title} className="reveal" style={{ ['--d' as string]: `${220 + i * 90}ms` }}>
                <span className={s.pIcon}>
                  <p.icon size={20} aria-hidden="true" />
                </span>
                <span>
                  <b>{p.title}</b>
                  <span>{p.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className={`${s.demo} reveal`} style={{ ['--d' as string]: '120ms' }}>
          <ClassroomDemo />
          <p className={s.caption}>Bu — haqiqiy dars xonasining jonli namunasi. «Qo&apos;l ko&apos;tarish»ni bosib ko&apos;ring.</p>
        </div>
      </div>
    </section>
  );
}

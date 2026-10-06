'use client';

import { useState } from 'react';
import { BellRing, CalendarCheck, Users, Wallet } from 'lucide-react';
import type { Spot } from './Hotspots';
import { BrowserFrame, Shot } from './Frames';
import { Hotspots } from './Hotspots';
import s from './Parents.module.css';

const TABS: { id: string; label: string; shot: string; alt: string; spots: Spot[] }[] = [
  {
    id: 'bosh',
    label: 'Bosh sahifa',
    shot: 'parent-home',
    alt: 'Ota-ona paneli: farzandlar, keyingi dars va bugungi holat',
    spots: [
      { x: 8.5, y: 21, title: 'Farzandlar', text: "Bir nechta farzand bitta hisobda — ismini bosib almashtirasiz." },
      { x: 45, y: 63, title: 'Bugun nima qildi', text: "Nechta zadacha yechdi, o'yinda yutdimi, ustoz bonus berdimi." },
      { x: 83.5, y: 55, title: 'Uyga vazifa', text: "Bajarilganmi, muddati o'tdimi — darhol ko'rinadi." },
      { x: 8, y: 57, title: "Qo'shimcha bo'limlar", text: "Ota-onada alohida «Davomat» va «To'lovlar» bo'limlari bor." },
    ],
  },
  {
    id: 'davomat',
    label: 'Davomat',
    shot: 'parent-attendance',
    alt: "Davomat: foiz, keldi / kech qoldi / yo'q va darslar ro'yxati",
    spots: [
      { x: 58.5, y: 29, title: 'Davomat foizi', text: 'Nechta darsdan nechtasida qatnashgani.' },
      { x: 58.5, y: 44, title: 'Batafsil', text: "Keldi, kech qoldi, sababli va sababsiz yo'q — alohida sanaladi." },
      { x: 90.5, y: 63, title: 'Har bir dars', text: 'Sana, vaqt, ustoz va holat. Kechikkan bo\'lsa — necha daqiqa.' },
      { x: 39.5, y: 16, title: 'Davr', text: 'Shu oy, o\'tgan oy, 30 yoki 90 kun.' },
    ],
  },
  {
    id: 'tolov',
    label: "To'lovlar",
    shot: 'parent-payments',
    alt: "To'lovlar: qolgan darslar, hisoblar va dars paketlari",
    spots: [
      { x: 32.5, y: 30, title: 'Qolgan darslar', text: 'Paketda nechta dars qolgani va qachongacha amal qilishi.' },
      { x: 58.5, y: 52, title: 'Hisoblar', text: "Har bir to'lov: summa, sana va holat." },
      { x: 58.5, y: 87, title: 'Dars paketlari', text: 'Har paket bo\'yicha sarflangan va qolgan darslar.' },
    ],
  },
];

const POINTS = [
  { icon: Users, title: 'Bir hisob — bir nechta farzand', text: 'Har biriga alohida login shart emas.' },
  { icon: CalendarCheck, title: 'Shaffof davomat', text: 'Har bir dars holati — kunma-kun.' },
  { icon: Wallet, title: "To'lov va qolgan darslar", text: "Qancha to'langan, nechta dars qolgan — aniq." },
  { icon: BellRing, title: 'Telegram bildirishnomalari', text: "Dars eslatmasi, yangi vazifa, to'lov qabul qilindi." },
];

const TG = [
  { t: 'Ertaga 17:00 da dars bor', d: 'Aziza · Boshlang\'ich-1 · Ustoz Ali Valiyev' },
  { t: 'Yangi uyga vazifa', d: 'Kompyuterga qarshi 3 ta o\'yin · +10 tanga' },
  { t: "To'lov qabul qilindi ✅", d: "1 100 000 so'm · 12 dars qo'shildi" },
];

export function Parents() {
  const [tab, setTab] = useState(0);
  return (
    <section id="ota-onalar" className="section">
      <div className={`container ${s.inner}`}>
        <div className={s.copy}>
          <span className="eyebrow reveal">Ota-onalar uchun</span>
          <h2 className="h2 reveal" style={{ ['--d' as string]: '80ms' }}>
            Farzandingiz qanday o&apos;qiyotgani — <span className="grad-text">doim ko&apos;z oldingizda</span>
          </h2>
          <p className="lead reveal" style={{ ['--d' as string]: '160ms' }}>
            Alohida ota-ona paneli: davomat, uyga vazifa, to&apos;lovlar va bolaning yutuqlari. Savol berib, kutib o&apos;tirish shart emas.
          </p>
          <ul className={s.points}>
            {POINTS.map((p, i) => (
              <li key={p.title} className="reveal" style={{ ['--d' as string]: `${200 + i * 80}ms` }}>
                <span className={s.pIcon}>
                  <p.icon size={19} aria-hidden="true" />
                </span>
                <span>
                  <b>{p.title}</b>
                  <span>{p.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className={`${s.visual} reveal`} style={{ ['--d' as string]: '120ms' }}>
          <div className={s.tabs} role="tablist" aria-label="Ota-ona paneli bo'limlari">
            {TABS.map((t, i) => (
              <button key={t.id} type="button" role="tab" aria-selected={i === tab} className={i === tab ? s.on : ''} onClick={() => setTab(i)}>
                {t.label}
              </button>
            ))}
          </div>
          <BrowserFrame url="crm.chesson.uz/ota-ona">
            {TABS.map((t, i) => (
              <div key={t.id} className={`${s.layer} ${i === tab ? s.layerOn : ''}`} aria-hidden={i !== tab}>
                <Shot name={t.shot} alt={t.alt} sizes="(max-width: 1024px) 94vw, 680px" />
                {i === tab && <Hotspots spots={t.spots} />}
              </div>
            ))}
          </BrowserFrame>
          <div className={s.tg} aria-label="Telegram bildirishnomalari namunasi">
            <div className={s.tgHead}>
              <span className={s.tgLogo} aria-hidden="true">
                <svg viewBox="0 0 24 24" width="14" height="14">
                  <path fill="#fff" d="M21.9 4.3 18.7 19c-.2 1-.9 1.3-1.7.8l-4.7-3.5-2.3 2.2c-.3.3-.5.5-1 .5l.3-4.8 8.8-7.9c.4-.3-.1-.5-.6-.2L6.6 13 2 11.6c-1-.3-1-1 .2-1.5l18.2-7c.9-.3 1.6.2 1.5 1.2Z" />
                </svg>
              </span>
              Chesson bot
            </div>
            {TG.map((m, i) => (
              <div key={m.t} className={s.tgMsg} style={{ ['--k' as string]: i }}>
                <b>{m.t}</b>
                <span>{m.d}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

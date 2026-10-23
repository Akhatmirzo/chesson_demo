'use client';

import { useState } from 'react';
import { BellRing, CalendarCheck, Users, Wallet } from 'lucide-react';
import { BrowserFrame, Shot } from './Frames';
import { Hotspots } from './Hotspots';
import { withText } from '@/content/showcase';
import { useT } from './providers';
import s from './Parents.module.css';

/** Panel ekranlari va nuqtalar joyi (foizda); matnlari lug'atda — `parents.tabs`, shu tartibda */
const TABS = [
  { id: 'bosh', shot: 'parent-home', spots: [{ x: 8.5, y: 21 }, { x: 45, y: 63 }, { x: 83.5, y: 55 }, { x: 8, y: 57 }] },
  { id: 'davomat', shot: 'parent-attendance', spots: [{ x: 58.5, y: 29 }, { x: 58.5, y: 44 }, { x: 90.5, y: 63 }, { x: 39.5, y: 16 }] },
  { id: 'tolov', shot: 'parent-payments', spots: [{ x: 32.5, y: 30 }, { x: 58.5, y: 52 }, { x: 58.5, y: 87 }] },
];

/** Ikonkalar; matni lug'atda (`parents.points`) */
const ICONS = [Users, CalendarCheck, Wallet, BellRing];

export function Parents() {
  const t = useT().parents;
  const [tab, setTab] = useState(0);
  return (
    <section id="ota-onalar" className="section">
      <div className={`container ${s.inner}`}>
        <div className={s.copy}>
          <span className="eyebrow reveal">{t.eyebrow}</span>
          <h2 className="h2 reveal" style={{ ['--d' as string]: '80ms' }}>
            {t.title}
          </h2>
          <p className="lead reveal" style={{ ['--d' as string]: '160ms' }}>
            {t.lead}
          </p>
          <ul className={s.points}>
            {t.points.map((p, i) => {
              const Icon = ICONS[i];
              return (
                <li key={p.title} className="reveal" style={{ ['--d' as string]: `${200 + i * 80}ms` }}>
                <span className={s.pIcon}>
                  <Icon size={19} aria-hidden="true" />
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

        <div className={`${s.visual} reveal`} style={{ ['--d' as string]: '120ms' }}>
          <div className={s.tabs} role="tablist" aria-label={t.tabsLabel}>
            {TABS.map((tb, i) => (
              <button key={tb.id} type="button" role="tab" aria-selected={i === tab} className={i === tab ? s.on : ''} onClick={() => setTab(i)}>
                {t.tabs[i].label}
              </button>
            ))}
          </div>
          <BrowserFrame url="crm.chesson.uz/ota-ona">
            {TABS.map((tb, i) => (
              <div key={tb.id} className={`${s.layer} ${i === tab ? s.layerOn : ''}`} aria-hidden={i !== tab}>
                <Shot name={tb.shot} alt={t.tabs[i].alt} sizes="(max-width: 1024px) 94vw, 680px" />
                {i === tab && <Hotspots spots={withText(tb.spots, t.tabs[i].spots)} />}
              </div>
            ))}
          </BrowserFrame>
          <div className={s.tg} aria-label={t.tgLabel}>
            <div className={s.tgHead}>
              <span className={s.tgLogo} aria-hidden="true">
                <svg viewBox="0 0 24 24" width="14" height="14">
                  <path fill="#fff" d="M21.9 4.3 18.7 19c-.2 1-.9 1.3-1.7.8l-4.7-3.5-2.3 2.2c-.3.3-.5.5-1 .5l.3-4.8 8.8-7.9c.4-.3-.1-.5-.6-.2L6.6 13 2 11.6c-1-.3-1-1 .2-1.5l18.2-7c.9-.3 1.6.2 1.5 1.2Z" />
                </svg>
              </span>
              Chesson bot
            </div>
            {t.tg.map((m, i) => (
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

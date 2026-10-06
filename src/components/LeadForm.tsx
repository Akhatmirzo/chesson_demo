'use client';

import { useState, type FormEvent } from 'react';
import { ArrowRight, Loader2, Lock } from 'lucide-react';
import { LeadError, submitLead } from '@/lib/api';
import s from './LeadForm.module.css';

const AGES = ['5–6 yosh', '7–9 yosh', '10–12 yosh', '13+ yosh'];
const TIMES = ['Ertalab', 'Tushdan keyin', 'Kechqurun', 'Dam olish kunlari'];

/** +998 XX XXX XX XX ko'rinishida yozadi */
function formatPhone(raw: string): string {
  let d = raw.replace(/\D/g, '');
  if (d.startsWith('998')) d = d.slice(3);
  d = d.slice(0, 9);
  const parts = [d.slice(0, 2), d.slice(2, 5), d.slice(5, 7), d.slice(7, 9)].filter(Boolean);
  return '+998 ' + parts.join(' ');
}

function utm(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  const p = new URLSearchParams(window.location.search);
  const out: Record<string, string> = {};
  for (const [k, key] of [['utm_source', 'utmSource'], ['utm_medium', 'utmMedium'], ['utm_campaign', 'utmCampaign']] as const) {
    const v = p.get(k);
    if (v) out[key] = v.slice(0, 80);
  }
  return out;
}

export function LeadForm({ source, onDone, compact = false }: { source: string; onDone?: () => void; compact?: boolean }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [age, setAge] = useState('');
  const [time, setTime] = useState('');
  const [website, setWebsite] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'done'>('idle');
  const [err, setErr] = useState<string | null>(null);

  const digits = phone.replace(/\D/g, '').slice(3);
  const valid = name.trim().length >= 2 && digits.length === 9;

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!valid) {
      setErr(name.trim().length < 2 ? 'Ismingizni yozing.' : "Telefon raqamini to'liq yozing: +998 XX XXX XX XX");
      return;
    }
    setErr(null);
    setState('sending');
    try {
      await submitLead({
        parentName: name.trim(),
        phone: '+998' + digits,
        childAge: age || undefined,
        preferredTime: time || undefined,
        comment: source ? `Manba: ${source}` : undefined,
        website,
        ...utm(),
      });
      setState('done');
    } catch (ex) {
      setErr(ex instanceof LeadError ? ex.message : "Xatolik yuz berdi. Qayta urinib ko'ring.");
      setState('idle');
    }
  }

  if (state === 'done') {
    return (
      <div className={s.done} role="status">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/art/cheer-full.webp" alt="" width={120} height={140} />
        <h3>Arizangiz qabul qilindi! 🎉</h3>
        <p>Tez orada administratorimiz qo&apos;ng&apos;iroq qilib, bepul dars vaqtini kelishib oladi.</p>
        {onDone && (
          <button type="button" className="btn btn-ghost" onClick={onDone}>
            Yopish
          </button>
        )}
      </div>
    );
  }

  return (
    <form className={`${s.form} ${compact ? s.compact : ''}`} onSubmit={submit} noValidate>
      <label className={s.field}>
        <span>Ota-onaning ismi</span>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ismingiz" autoComplete="name" maxLength={80} required />
      </label>
      <label className={s.field}>
        <span>Telefon raqami</span>
        <input
          value={phone}
          onChange={(e) => setPhone(formatPhone(e.target.value))}
          inputMode="tel"
          autoComplete="tel"
          placeholder="+998 90 123 45 67"
          required
        />
      </label>
      <fieldset className={s.choices}>
        <legend>Bolaning yoshi</legend>
        <div>
          {AGES.map((a) => (
            <button type="button" key={a} className={age === a ? s.chipOn : ''} aria-pressed={age === a} onClick={() => setAge(age === a ? '' : a)}>
              {a}
            </button>
          ))}
        </div>
      </fieldset>
      <fieldset className={s.choices}>
        <legend>Qulay vaqt</legend>
        <div>
          {TIMES.map((t) => (
            <button type="button" key={t} className={time === t ? s.chipOn : ''} aria-pressed={time === t} onClick={() => setTime(time === t ? '' : t)}>
              {t}
            </button>
          ))}
        </div>
      </fieldset>
      {/* bot tuzog'i: odamlarga ko'rinmaydi */}
      <input className={s.trap} tabIndex={-1} autoComplete="off" aria-hidden="true" value={website} onChange={(e) => setWebsite(e.target.value)} name="website" />
      {err && (
        <p className={s.err} role="alert">
          {err}
        </p>
      )}
      <button type="submit" className={`btn btn-primary ${s.submit}`} disabled={state === 'sending'}>
        {state === 'sending' ? (
          <>
            <Loader2 size={18} className={s.spin} aria-hidden="true" /> Yuborilmoqda…
          </>
        ) : (
          <>
            Bepul darsga yozilish <ArrowRight className="arrow" size={18} aria-hidden="true" />
          </>
        )}
      </button>
      <p className={s.privacy}>
        <Lock size={13} aria-hidden="true" /> Ma&apos;lumotlaringiz faqat siz bilan bog&apos;lanish uchun ishlatiladi.
      </p>
    </form>
  );
}

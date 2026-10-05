'use client';

import { useRef, useState, type FormEvent } from 'react';
import { ArrowRight, CircleCheck, LoaderCircle, Phone, Send } from 'lucide-react';
import { brand, signup } from '@/content/site';
import Photo from '@/components/ui/Photo';
import { display } from '@/lib/typo';

/**
 * Yuborish manzili .env orqali (README'ga qarang):
 *  NEXT_PUBLIC_FORM_ENDPOINT   — Formspree (https://formspree.io/f/xxxx) yoki Web3Forms (https://api.web3forms.com/submit)
 *  NEXT_PUBLIC_FORM_ACCESS_KEY — faqat Web3Forms uchun access key
 * Manzil bo'lmasa — ariza matni bilan Telegram ochiladi.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? '';
const ACCESS_KEY = process.env.NEXT_PUBLIC_FORM_ACCESS_KEY ?? '';

type Fields = { name: string; phone: string; age: string; level: string; time: string };
type Errors = Partial<Record<keyof Fields, string>>;
const EMPTY: Fields = { name: '', phone: '+998 ', age: '', level: '', time: '' };

/** Raqamlarni "+998 90 123 45 67" ko'rinishiga keltiradi */
export function formatPhone(raw: string) {
  let d = raw.replace(/\D/g, '');
  if (d.length < 3) d = '998';
  else if (!d.startsWith('998')) d = '998' + d;
  d = d.slice(0, 12);
  const p = [d.slice(0, 3), d.slice(3, 5), d.slice(5, 8), d.slice(8, 10), d.slice(10, 12)].filter(Boolean);
  return '+' + p.join(' ') + (d.length <= 3 ? ' ' : '');
}

export const isValidPhone = (v: string) => /^998\d{9}$/.test(v.replace(/\D/g, ''));

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = 'Ismingizni kiriting';
  if (!isValidPhone(f.phone)) e.phone = 'Telefon raqam +998 XX XXX XX XX formatida boʻlsin';
  if (!f.age) e.age = 'Yoshni tanlang';
  if (!f.level) e.level = 'Darajani tanlang';
  if (!f.time) e.time = 'Qulay vaqtni tanlang';
  return e;
}

const inputCls =
  'mt-2 block w-full rounded-2xl border bg-white px-4 py-3.5 text-base text-ink outline-none transition-colors placeholder:text-ink-soft/50 focus:border-forest focus-visible:outline-none aria-[invalid=true]:border-coral';

export default function Signup() {
  const [f, setF] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [viaTelegram, setViaTelegram] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const set = (k: keyof Fields, v: string) => {
    setF((prev) => ({ ...prev, [k]: v }));
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const fd = new FormData(ev.currentTarget);
    if (fd.get('company')) return; // spam tuzog'i
    const e = validate(f);
    setErrors(e);
    const first = Object.keys(e)[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    const payload = {
      name: f.name.trim(),
      phone: f.phone.trim(),
      age: f.age,
      level: f.level,
      time: f.time,
      subject: `${brand.name}: sinov darsiga yangi ariza`,
    };

    if (!ENDPOINT) {
      const text = [
        `Assalomu alaykum! Bepul sinov darsiga yozilmoqchiman.`,
        `Ism: ${payload.name}`,
        `Telefon: ${payload.phone}`,
        `Yosh: ${payload.age}`,
        `Daraja: ${payload.level}`,
        `Qulay vaqt: ${payload.time}`,
      ].join('\n');
      window.open(`${brand.telegram}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
      setViaTelegram(true);
      setStatus('done');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(ACCESS_KEY ? { ...payload, access_key: ACCESS_KEY } : payload),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('done');
    } catch {
      setStatus('error');
    }
  };

  const err = (k: keyof Fields) =>
    errors[k] ? (
      <p id={`${k}-error`} className="mt-1.5 text-sm font-semibold text-[#b8381c]">
        {errors[k]}
      </p>
    ) : null;
  const aria = (k: keyof Fields) => ({
    'aria-invalid': !!errors[k],
    'aria-describedby': errors[k] ? `${k}-error` : undefined,
  });

  return (
    <section id="yozilish" className="cv bg-cream px-3 pb-3 sm:px-4 sm:pb-4" aria-labelledby="yozilish-title">
      <div
        data-zoom
        className="mx-auto grid max-w-[1400px] overflow-hidden rounded-[36px] bg-forest text-cream lg:grid-cols-2 lg:rounded-[48px]"
      >
        <div className="flex flex-col p-7 pt-14 sm:p-12 lg:p-16">
          <p data-reveal="up" className="text-sm font-bold tracking-[0.14em] text-coral uppercase">
            {signup.eyebrow}
          </p>
          <h2 id="yozilish-title" data-split="lines" className="mt-4 font-display text-4xl leading-[1.08] font-black tracking-tight sm:text-5xl">
            {display(signup.title)}
          </h2>
          <p data-reveal="up" className="mt-5 max-w-md text-lg leading-relaxed text-cream/75">
            {signup.lead}
          </p>
          <Photo
            name="murabbiy-dars"
            alt="Murabbiy bolalarga shaxmat darsini tushuntirmoqda"
            className="mt-10 hidden aspect-[16/10] lg:block"
            sizes="40vw"
            curtain
            curtainClass="bg-forest"
          />
          <div data-reveal="up" className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-cream/85 lg:mt-8">
            <a href={brand.phoneHref} className="flex items-center gap-2 font-semibold hover:text-coral">
              <Phone className="size-4 text-coral" aria-hidden="true" />
              {brand.phone}
            </a>
            <a href={brand.telegram} className="flex items-center gap-2 font-semibold hover:text-coral">
              <Send className="size-4 text-coral" aria-hidden="true" />
              {brand.telegramLabel}
            </a>
          </div>
        </div>

        <div className="p-3 sm:p-4 lg:p-5">
          <div data-reveal="up" className="h-full rounded-[28px] bg-cream p-6 text-ink sm:p-10 lg:rounded-[36px] lg:p-12">
            {status === 'done' ? (
              <div className="flex h-full min-h-[420px] flex-col items-center justify-center text-center puzzle-msg" role="status">
                <CircleCheck className="size-16 text-forest" strokeWidth={1.6} aria-hidden="true" />
                <h3 className="mt-6 font-display text-3xl font-black">{display(signup.success.title)}</h3>
                <p className="mt-3 max-w-sm text-ink-soft">{signup.success.text}</p>
                {viaTelegram && <p className="mt-4 max-w-sm text-sm text-ink-soft">{signup.fallback}</p>}
                <button
                  type="button"
                  onClick={() => {
                    setF(EMPTY);
                    setStatus('idle');
                    setViaTelegram(false);
                  }}
                  className="mt-8 text-sm font-bold text-forest underline-offset-4 hover:underline"
                >
                  Yana bir ariza qoldirish
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-5">
                <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                <div>
                  <label htmlFor="name" className="text-sm font-bold">
                    Ismingiz
                  </label>
                  <input
                    id="name"
                    name="name"
                    autoComplete="name"
                    placeholder="Masalan, Nodira"
                    value={f.name}
                    onChange={(e) => set('name', e.target.value)}
                    className={`${inputCls} border-ink/12`}
                    {...aria('name')}
                  />
                  {err('name')}
                </div>
                <div>
                  <label htmlFor="phone" className="text-sm font-bold">
                    Telefon raqam
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="+998 90 123 45 67"
                    value={f.phone}
                    onChange={(e) => set('phone', formatPhone(e.target.value))}
                    className={`${inputCls} border-ink/12 tabular-nums`}
                    {...aria('phone')}
                  />
                  {err('phone')}
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="age" className="text-sm font-bold">
                      Bolaning yoshi
                    </label>
                    <select
                      id="age"
                      name="age"
                      value={f.age}
                      onChange={(e) => set('age', e.target.value)}
                      className={`${inputCls} border-ink/12 appearance-none`}
                      {...aria('age')}
                    >
                      <option value="">Tanlang</option>
                      {signup.ages.map((a) => (
                        <option key={a} value={a}>
                          {a}
                        </option>
                      ))}
                    </select>
                    {err('age')}
                  </div>
                  <div>
                    <label htmlFor="level" className="text-sm font-bold">
                      Daraja
                    </label>
                    <select
                      id="level"
                      name="level"
                      value={f.level}
                      onChange={(e) => set('level', e.target.value)}
                      className={`${inputCls} border-ink/12 appearance-none`}
                      {...aria('level')}
                    >
                      <option value="">Tanlang</option>
                      {signup.levels.map((l) => (
                        <option key={l} value={l}>
                          {l}
                        </option>
                      ))}
                    </select>
                    {err('level')}
                  </div>
                </div>
                <fieldset {...aria('time')}>
                  <legend className="text-sm font-bold">Qulay vaqt</legend>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {signup.times.map((t) => (
                      <label
                        key={t}
                        className={`cursor-pointer rounded-2xl border px-3 py-3 text-sm font-semibold transition-colors has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-coral ${
                          f.time === t ? 'border-forest bg-forest text-cream' : 'border-ink/12 bg-white hover:border-forest'
                        }`}
                      >
                        <input
                          type="radio"
                          name="time"
                          value={t}
                          checked={f.time === t}
                          onChange={() => set('time', t)}
                          className="sr-only"
                        />
                        {t}
                      </label>
                    ))}
                  </div>
                  {err('time')}
                </fieldset>

                {status === 'error' && (
                  <p className="rounded-2xl bg-coral/15 px-4 py-3 text-sm font-semibold" role="alert">
                    Yuborishda xatolik boʻldi. Iltimos, qayta urinib koʻring yoki Telegramʼda yozing:{' '}
                    <a href={brand.telegram} className="underline">
                      {brand.telegramLabel}
                    </a>
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="group mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-coral px-7 py-4 text-base font-bold text-ink transition-transform hover:-translate-y-0.5 disabled:opacity-70"
                >
                  {status === 'sending' ? (
                    <LoaderCircle className="size-5 animate-spin" aria-hidden="true" />
                  ) : (
                    <>
                      {signup.submit}
                      <ArrowRight className="size-5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </>
                  )}
                </button>
                <p className="text-center text-xs text-ink-soft">
                  Maʼlumotlaringiz faqat siz bilan bogʻlanish uchun ishlatiladi.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

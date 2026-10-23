import type { LandingData } from '@/content/types';
import type { Locale } from '@/i18n';

/** Prod'da landing va API bitta domen ostida (chesson.uz/api → Caddy). Lokal — .env orqali. */
export const API_BASE = (process.env.NEXT_PUBLIC_API_BASE ?? '/api').replace(/\/$/, '');

/** Kontent tanlangan tilda: ruscha kiritilmagan maydonlarda server o'zbekchasini beradi */
export async function fetchLanding(lang: Locale, signal?: AbortSignal): Promise<LandingData> {
  const res = await fetch(`${API_BASE}/public/landing?lang=${lang}`, { signal, headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`landing ${res.status}`);
  return (await res.json()) as LandingData;
}

export interface LeadPayload {
  parentName: string;
  phone: string;
  childAge?: string;
  preferredTime?: string;
  comment?: string;
  /** Bot tuzog'i — odam to'ldirmaydi */
  website?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  /** Qaysi til sahifasidan — adminda «RU» belgisi */
  lang?: Locale;
}

/** Xato turi — matnni forma tanlangan tilda ko'rsatadi */
export type LeadErrorCode = 'network' | 'rate' | 'invalid' | 'failed';

export class LeadError extends Error {
  constructor(readonly code: LeadErrorCode) {
    super(code);
  }
}

export async function submitLead(payload: LeadPayload): Promise<void> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}/public/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, source: 'landing' }),
    });
  } catch {
    throw new LeadError('network');
  }
  if (res.status === 429) throw new LeadError('rate');
  if (res.status === 400) throw new LeadError('invalid');
  if (!res.ok) throw new LeadError('failed');
}

/** 1100000 → "1 100 000" */
export function formatSum(n: number): string {
  return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

/** "+998 88 102 22 62" → "+998881022262" (tel: havola uchun) */
export function telHref(phone: string): string {
  return 'tel:' + phone.replace(/[^\d+]/g, '');
}

export function telegramHref(v: string): string {
  if (/^https?:\/\//.test(v)) return v;
  return 'https://t.me/' + v.replace(/^@/, '');
}

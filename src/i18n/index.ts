import { ru } from './ru';
import { uz, type Dict } from './uz';

export type { Dict };
export type Locale = 'uz' | 'ru';
export const LOCALES: Locale[] = ['uz', 'ru'];

const DICTS: Record<Locale, Dict> = { uz, ru };

export function getDict(locale: Locale): Dict {
  return DICTS[locale];
}

/** Til sahifasining manzili: o'zbekcha — ildiz (`/`), ruscha — `/ru` */
export function localePath(locale: Locale): string {
  return locale === 'uz' ? '/' : `/${locale}`;
}

/** Open Graph `locale` qiymati */
export const OG_LOCALE: Record<Locale, string> = { uz: 'uz_UZ', ru: 'ru_RU' };

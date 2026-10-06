// Serverdan keladigan (admin «Sayt» sahifasida tahrirlanadigan) landing ma'lumotlari.
// Shakl — API'dagi `GET /api/public/landing` javobi bilan bir xil.

export interface Promo {
  enabled?: boolean;
  text: string;
  emoji?: string | null;
  until?: string | null;
  ctaLabel?: string | null;
}

export interface Plan {
  id: string;
  title: string;
  subtitle?: string | null;
  priceUzs: number;
  oldPriceUzs?: number | null;
  periodLabel: string;
  lessonsLabel?: string | null;
  features: string[];
  highlighted: boolean;
  badge?: string | null;
}

export interface Coach {
  id: string;
  name: string;
  title: string;
  experience: string;
  languages: string;
  photoUrl: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Contacts {
  phones: string[];
  telegram?: string | null;
  instagram?: string | null;
  email?: string | null;
  address?: string | null;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface LandingData {
  promo: Promo | null;
  plans: Plan[];
  coaches: Coach[];
  stats: Stat[];
  contacts: Contacts;
  faq: FaqItem[];
}

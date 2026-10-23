import { DEFAULT_LANDING, DEFAULT_LANDING_RU } from '@/content/defaults';
import type { LandingData } from '@/content/types';
import { getDict, type Locale } from '@/i18n';
import { Providers } from './providers';
import { Intro } from './Intro';
import { Header } from './Header';
import { Hero } from './Hero';
import { WhyChess } from './WhyChess';
import { Showcase } from './Showcase';
import { LiveLesson } from './LiveLesson';
import { Parents } from './Parents';
import { Motivation } from './Motivation';
import { Coaches } from './Coaches';
import { Plans } from './Plans';
import { TrialSteps } from './TrialSteps';
import { Signup } from './Signup';
import { Faq } from './Faq';
import { Footer } from './Footer';
import { LeadModal } from './LeadModal';
import { DesktopMotion } from './DesktopMotion';

const DEFAULTS: Record<Locale, LandingData> = { uz: DEFAULT_LANDING, ru: DEFAULT_LANDING_RU };

/**
 * Build vaqtida serverdan joriy kontent olinadi (HTML'da darhol ko'rinadi, qidiruv tizimlari uchun ham),
 * API yo'q bo'lsa — zaxira. Brauzerda baribir eng yangisi qayta olinadi.
 */
async function loadInitial(locale: Locale): Promise<LandingData> {
  const fallback = DEFAULTS[locale];
  const base = process.env.LANDING_BUILD_API;
  if (!base) return fallback;
  try {
    const res = await fetch(`${base.replace(/\/$/, '')}/public/landing?lang=${locale}`, { signal: AbortSignal.timeout(4000), cache: 'no-store' });
    if (!res.ok) return fallback;
    return { ...fallback, ...((await res.json()) as LandingData) };
  } catch {
    return fallback;
  }
}

/** Butun landing — til bo'yicha (`/` o'zbekcha, `/ru` ruscha) */
export async function LandingPage({ locale }: { locale: Locale }) {
  const initial = await loadInitial(locale);
  return (
    <Providers initial={initial} locale={locale} t={getDict(locale)}>
      <Intro />
      <Header />
      <main id="top">
        <Hero />
        <WhyChess locale={locale} />
        <Showcase />
        <LiveLesson locale={locale} />
        <Parents />
        <Motivation />
        <Coaches />
        <Plans />
        <TrialSteps locale={locale} />
        <Signup />
        <Faq />
      </main>
      <Footer />
      <LeadModal />
      <DesktopMotion />
    </Providers>
  );
}

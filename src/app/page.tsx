import { DEFAULT_LANDING } from '@/content/defaults';
import type { LandingData } from '@/content/types';
import { Providers } from '@/components/providers';
import { Intro } from '@/components/Intro';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { WhyChess } from '@/components/WhyChess';
import { Showcase } from '@/components/Showcase';
import { LiveLesson } from '@/components/LiveLesson';
import { Parents } from '@/components/Parents';
import { Motivation } from '@/components/Motivation';
import { Coaches } from '@/components/Coaches';
import { Plans } from '@/components/Plans';
import { TrialSteps } from '@/components/TrialSteps';
import { Signup } from '@/components/Signup';
import { Faq } from '@/components/Faq';
import { Footer } from '@/components/Footer';
import { LeadModal } from '@/components/LeadModal';
import { DesktopMotion } from '@/components/DesktopMotion';

/**
 * Build vaqtida serverdan joriy kontent olinadi (HTML'da darhol ko'rinadi, qidiruv tizimlari uchun ham),
 * API yo'q bo'lsa — zaxira. Brauzerda baribir eng yangisi qayta olinadi.
 */
async function loadInitial(): Promise<LandingData> {
  const base = process.env.LANDING_BUILD_API;
  if (!base) return DEFAULT_LANDING;
  try {
    const res = await fetch(`${base.replace(/\/$/, '')}/public/landing`, { signal: AbortSignal.timeout(4000), cache: 'no-store' });
    if (!res.ok) return DEFAULT_LANDING;
    return { ...DEFAULT_LANDING, ...((await res.json()) as LandingData) };
  } catch {
    return DEFAULT_LANDING;
  }
}

export default async function Page() {
  const initial = await loadInitial();
  return (
    <Providers initial={initial}>
      <Intro />
      <Header />
      <main id="top">
        <Hero />
        <WhyChess />
        <Showcase />
        <LiveLesson />
        <Parents />
        <Motivation />
        <Coaches />
        <Plans />
        <TrialSteps />
        <Signup />
        <Faq />
      </main>
      <Footer />
      <LeadModal />
      <DesktopMotion />
    </Providers>
  );
}

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/hero/Hero';
import SmoothScroll from '@/components/SmoothScroll';
import ScrollAnimations from '@/components/ScrollAnimations';
import Steps from '@/components/sections/Steps';
import Courses from '@/components/sections/Courses';
import Pricing from '@/components/sections/Pricing';
import Coaches from '@/components/sections/Coaches';
import Stats from '@/components/sections/Stats';
import Puzzle from '@/components/sections/Puzzle';
import Testimonials from '@/components/sections/Testimonials';
import Faq from '@/components/sections/Faq';
import Signup from '@/components/sections/Signup';

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <ScrollAnimations />
      <Header />
      <main>
        <Hero />
        <Steps />
        <Courses />
        <Pricing />
        <Coaches />
        <Stats />
        <Puzzle />
        <Testimonials />
        <Faq />
        <Signup />
      </main>
      <Footer />
    </>
  );
}

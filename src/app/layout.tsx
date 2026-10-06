import type { Metadata, Viewport } from 'next';
import { Inter, Manrope } from 'next/font/google';
import './globals.css';

const manrope = Manrope({ subsets: ['latin', 'cyrillic'], weight: ['600', '700', '800'], variable: '--font-manrope', display: 'swap' });
const inter = Inter({ subsets: ['latin', 'cyrillic'], weight: ['400', '500', '600', '700'], variable: '--font-inter', display: 'swap' });

const SITE_URL = 'https://chesson.uz';
const TITLE = 'Chesson — bolalar uchun onlayn shaxmat maktabi';
const DESCRIPTION =
  "Farzandingiz uchun onlayn shaxmat maktabi: tajribali murabbiylar bilan jonli darslar, o'yin va boshqotirmalar bilan qiziqarli platforma, ota-onalar uchun shaffof davomat. Birinchi dars — bepul.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: ['shaxmat maktabi', 'bolalar uchun shaxmat', 'onlayn shaxmat darslari', 'shaxmat murabbiyi', 'Toshkent shaxmat', 'Chesson'],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'uz_UZ',
    url: SITE_URL,
    siteName: 'Chesson',
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Chesson platformasi' }],
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: ['/og.jpg'] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#2563eb' };

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Chesson',
  url: SITE_URL,
  description: DESCRIPTION,
  areaServed: 'UZ',
  address: { '@type': 'PostalAddress', addressLocality: 'Toshkent', addressCountry: 'UZ' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz" className={`no-js ${manrope.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        {/* JS bor — .reveal animatsiyalari ishlaydi; intro faqat sessiyada birinchi marta */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "var d=document.documentElement;d.classList.remove('no-js');try{if(!sessionStorage.getItem('ch-intro')&&!matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('intro')}catch(e){}",
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

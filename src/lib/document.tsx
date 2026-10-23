import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Inter, Manrope } from 'next/font/google';
import '@/app/globals.css';
import { DEFAULT_LANDING } from '@/content/defaults';
import { getDict, localePath, OG_LOCALE, type Locale } from '@/i18n';
import { SITE_URL } from '@/lib/site';

/*
 * Ikki til — ikki root layout (`app/(uz)`, `app/(ru)`): har sahifada o'z <html lang>, meta va hreflang.
 * Umumiy qism shu yerda.
 */

export const manrope = Manrope({ subsets: ['latin', 'cyrillic'], weight: ['600', '700', '800'], variable: '--font-manrope', display: 'swap' });
export const inter = Inter({ subsets: ['latin', 'cyrillic'], weight: ['400', '500', '600', '700'], variable: '--font-inter', display: 'swap' });

/** Har til sahifasi bir-birining tarjimasi ekanini qidiruv tizimiga aytadi (o'zbekcha — sukut) */
const LANGUAGE_ALTERNATES = { uz: '/', ru: '/ru', 'x-default': '/' };

export function buildMetadata(locale: Locale): Metadata {
  const m = getDict(locale).meta;
  const url = `${SITE_URL}${localePath(locale) === '/' ? '' : localePath(locale)}`;
  return {
    metadataBase: new URL(SITE_URL),
    title: m.title,
    description: m.description,
    keywords: m.keywords,
    alternates: { canonical: localePath(locale), languages: LANGUAGE_ALTERNATES },
    openGraph: {
      type: 'website',
      locale: OG_LOCALE[locale],
      alternateLocale: Object.entries(OG_LOCALE)
        .filter(([l]) => l !== locale)
        .map(([, v]) => v),
      url,
      siteName: 'Chesson',
      title: m.title,
      description: m.description,
      images: [{ url: '/og.jpg', width: 1200, height: 630, alt: m.ogAlt }],
    },
    twitter: { card: 'summary_large_image', title: m.title, description: m.description, images: ['/og.jpg'] },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#2563eb' };

/** Qidiruv tizimlari uchun: maktab (logo, aloqa) va sayt nomi — Google natijada nom/logoni shundan oladi */
function orgJsonLd(locale: Locale) {
  const m = getDict(locale).meta;
  const { contacts } = DEFAULT_LANDING;
  const sameAs = [contacts.telegram, contacts.instagram].filter((u): u is string => !!u && /^https?:\/\//.test(u));
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'EducationalOrganization',
        '@id': `${SITE_URL}/#org`,
        name: 'Chesson',
        alternateName: m.orgAlternateName,
        url: SITE_URL,
        logo: `${SITE_URL}/brand/logo-ink.png`,
        image: `${SITE_URL}/og.jpg`,
        description: m.description,
        areaServed: { '@type': 'Country', name: m.country },
        address: { '@type': 'PostalAddress', addressLocality: m.city, addressCountry: 'UZ' },
        email: contacts.email,
        telephone: contacts.phones[0],
        contactPoint: contacts.phones.map((telephone) => ({
          '@type': 'ContactPoint',
          telephone,
          contactType: 'customer service',
          availableLanguage: ['uz', 'ru'],
        })),
        ...(sameAs.length ? { sameAs } : {}),
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'Chesson',
        inLanguage: ['uz', 'ru'],
        publisher: { '@id': `${SITE_URL}/#org` },
      },
    ],
  };
}

export function RootDocument({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <html lang={locale} className={`no-js ${manrope.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        {/* JS bor — .reveal animatsiyalari ishlaydi; intro faqat sessiyada birinchi marta */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "var d=document.documentElement;d.classList.remove('no-js');try{if(!sessionStorage.getItem('ch-intro')&&!matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('intro')}catch(e){}",
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd(locale)) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

import type { Metadata, Viewport } from 'next';
import { Inter, Nunito } from 'next/font/google';
import { brand } from '@/content/site';
import DeferredFonts from '@/components/DeferredFonts';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
  // Body shrifti sahifa chizilgandan keyin yuklanadi (DeferredFonts), ungacha metrikasi
  // moslashtirilgan 'Inter Fallback' ishlatiladi — LCP shriftni kutmaydi, layout siljimaydi.
  preload: false,
});

const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin'],
  // Faqat 900 — bitta statik fayl (~17 KB). 800 so'ralgan joylarda ham 900 ishlatiladi.
  weight: ['900'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: `${brand.name} — online shaxmat maktabi`,
  description: brand.description,
  openGraph: {
    title: `${brand.name} — online shaxmat maktabi`,
    description: brand.description,
    locale: 'uz_UZ',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#faf7f0',
};

// JS mavjud bo'lsa, animatsiya qilinadigan elementlarni boshidanoq yashiradi (miltillamaslik uchun)
const jsFlag = `document.documentElement.classList.add('js')`;

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="uz" className={`${inter.variable} ${nunito.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsFlag }} />
      </head>
      <body>
        <DeferredFonts />
        {children}
      </body>
    </html>
  );
}

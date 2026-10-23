import type { Metadata } from 'next';
import '@/app/globals.css';
import { Logo } from '@/components/Logo';
import { inter, manrope } from '@/lib/document';
import { uz } from '@/i18n/uz';
import { ru } from '@/i18n/ru';

export const metadata: Metadata = {
  title: `${uz.notFound.title} · ${ru.notFound.title} — Chesson`,
  robots: { index: false, follow: true },
};

/**
 * Mavjud bo'lmagan har qanday manzil (ikkala til uchun bitta — ikki root layout bor). Statik eksportda 404.html;
 * Caddy uni 404 holati bilan beradi. Ikki tilda: o'zbekcha va ruscha.
 */
export default function GlobalNotFound() {
  return (
    <html lang="uz" className={`${manrope.variable} ${inter.variable}`}>
      <body>
        <main
          className="container"
          style={{ minHeight: '100dvh', display: 'grid', placeContent: 'center', justifyItems: 'center', gap: 18, textAlign: 'center' }}
        >
          <Logo height={56} alt={uz.common.logoAlt} />
          {[uz, ru].map((d, i) => (
            <section key={i} lang={i ? 'ru' : 'uz'} style={{ display: 'grid', justifyItems: 'center', gap: 12, maxWidth: 440 }}>
              <h1 style={{ fontSize: 'clamp(24px, 4.5vw, 34px)', margin: 0 }}>{d.notFound.title}</h1>
              <p style={{ margin: 0, color: 'var(--text-secondary)' }}>{d.notFound.text}</p>
              <a href={i ? '/ru' : '/'} className={i ? 'btn btn-ghost' : 'btn btn-primary'}>
                {d.notFound.home}
              </a>
            </section>
          ))}
        </main>
      </body>
    </html>
  );
}

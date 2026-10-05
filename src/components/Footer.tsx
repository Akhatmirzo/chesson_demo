import { Mail, Phone, Send } from 'lucide-react';
import { brand, footer, nav, showSampleBadges } from '@/content/site';
import { Logo } from './Logo';

export default function Footer() {
  return (
    <footer id="site-footer" className="cv bg-cream text-ink">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-4 max-w-sm text-ink-soft">{footer.text}</p>
            <p className="mt-2 text-sm text-ink-soft">{brand.workHours}</p>
          </div>
          <nav aria-label="Pastki menyu" className="md:col-span-3">
            <p className="text-sm font-bold">Boʻlimlar</p>
            <ul className="mt-4 space-y-2.5 text-ink-soft">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="hover:text-forest">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="md:col-span-4">
            <p className="text-sm font-bold">
              Aloqa
              {showSampleBadges && <span className="ml-2 text-xs font-semibold text-ink-soft">(namuna)</span>}
            </p>
            <ul className="mt-4 space-y-2.5 text-ink-soft">
              <li>
                <a href={brand.phoneHref} className="flex items-center gap-2 hover:text-forest">
                  <Phone className="size-4 text-forest" aria-hidden="true" />
                  {brand.phone}
                </a>
              </li>
              <li>
                <a href={brand.telegram} className="flex items-center gap-2 hover:text-forest">
                  <Send className="size-4 text-forest" aria-hidden="true" />
                  {brand.telegramLabel}
                </a>
              </li>
              <li>
                <a href={`mailto:${brand.email}`} className="flex items-center gap-2 hover:text-forest">
                  <Mail className="size-4 text-forest" aria-hidden="true" />
                  {brand.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-ink/10 pt-6 text-sm text-ink-soft md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {brand.name}
          </p>
          <p>
            Foto:{' '}
            <a href="https://www.pexels.com" className="underline-offset-2 hover:underline">
              Pexels
            </a>{' '}
            · 3D model:{' '}
            <a
              href="https://github.com/KhronosGroup/glTF-Sample-Assets/tree/main/Models/ABeautifulGame"
              className="underline-offset-2 hover:underline"
            >
              «A Beautiful Game»
            </a>{' '}
            — MaterialX Project / ASWF, Ed Mackey,{' '}
            <a href="https://creativecommons.org/licenses/by/4.0/" className="underline-offset-2 hover:underline">
              CC BY 4.0
            </a>{' '}
            · HDRI: Poly Haven (CC0)
          </p>
        </div>
      </div>
    </footer>
  );
}

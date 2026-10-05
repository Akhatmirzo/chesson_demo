import { hero, nav } from '@/content/site';
import { Logo } from './Logo';

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/5 bg-cream/90">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Logo />
        <nav aria-label="Asosiy menyu" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-[15px] font-medium text-ink-soft">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="transition-colors hover:text-forest">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href="#yozilish"
          className="rounded-full bg-forest px-4 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-forest-deep sm:px-5"
        >
          <span className="sm:hidden">Bepul dars</span>
          <span className="hidden sm:inline">{hero.ctaPrimary}</span>
        </a>
      </div>
    </header>
  );
}

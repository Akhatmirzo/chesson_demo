'use client';

import { useEffect, useState } from 'react';
import { LogIn, Menu, X } from 'lucide-react';
import { LOCALES, localePath } from '@/i18n';
import { Logo } from './Logo';
import { useLead, useLocale, useT } from './providers';
import s from './Header.module.css';

/** Bo'lim langarlari (matni lug'atda — `header.nav`, shu tartibda) */
const NAV = ['#platforma', '#dars', '#ota-onalar', '#murabbiylar', '#savollar'];

export const PLATFORM_URL = 'https://crm.chesson.uz';

/** UZ | RU — boshqa til sahifasiga oddiy havola (hreflang bilan) */
export function LangSwitch({ className = '' }: { className?: string }) {
  const locale = useLocale();
  const t = useT();
  return (
    <nav className={`${s.langs} ${className}`} aria-label={t.lang.label}>
      {LOCALES.map((l) => (
        <a key={l} href={localePath(l)} hrefLang={l} lang={l} aria-current={l === locale ? 'true' : undefined} title={t.lang[l]}>
          {l.toUpperCase()}
        </a>
      ))}
    </nav>
  );
}

export function Header() {
  const { open } = useLead();
  const t = useT();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menu ? 'hidden' : '';
  }, [menu]);

  return (
    <>
      <header className={`${s.header} ${scrolled ? s.scrolled : ''} ${menu ? s.solid : ''}`}>
        <div className={`container ${s.inner}`}>
          <a href="#top" className={s.brand} aria-label={t.header.home}>
            <Logo height={46} priority alt={t.common.logoAlt} />
          </a>
          <nav className={s.nav} aria-label={t.header.navLabel}>
            {NAV.map((href, i) => (
              <a key={href} href={href}>
                {t.header.nav[i]}
              </a>
            ))}
          </nav>
          <div className={s.actions}>
            <LangSwitch />
            <a href={PLATFORM_URL} className={s.login}>
              <LogIn size={17} aria-hidden="true" />
              {t.header.login}
            </a>
            <button
              type="button"
              className={`btn btn-primary ${s.cta}`}
              onClick={() => open('header')}
            >
              {t.header.cta}
            </button>
            <button
              type="button"
              className={s.burger}
              aria-label={menu ? t.header.menuClose : t.header.menuOpen}
              aria-expanded={menu}
              onClick={() => setMenu((m) => !m)}
            >
              {menu ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>
      {/* Menyu header'dan tashqarida: header'dagi blur/animatsiya fixed elementni o'z ichiga «qamab» qo'ymasligi uchun */}
      <div className={`${s.sheet} ${menu ? s.sheetOpen : ''}`} aria-hidden={!menu}>
        <nav className={s.sheetNav}>
          {NAV.map((href, i) => (
            <a
              key={href}
              href={href}
              onClick={() => setMenu(false)}
              style={{ transitionDelay: menu ? `${60 + i * 40}ms` : '0ms' }}
              tabIndex={menu ? 0 : -1}
            >
              {t.header.nav[i]}
            </a>
          ))}
          <a href={PLATFORM_URL} className={s.sheetLogin} tabIndex={menu ? 0 : -1}>
            <LogIn size={18} aria-hidden="true" /> {t.header.sheetLogin}
          </a>
          <button
            type="button"
            className="btn btn-primary"
            tabIndex={menu ? 0 : -1}
            onClick={() => {
              setMenu(false);
              open('menu');
            }}
          >
            {t.header.sheetCta}
          </button>
        </nav>
      </div>
    </>
  );
}

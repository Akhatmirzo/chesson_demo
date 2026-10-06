'use client';

import { useEffect, useState } from 'react';
import { LogIn, Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { useLead } from './providers';
import s from './Header.module.css';

const NAV = [
  { href: '#platforma', label: 'Platforma' },
  { href: '#dars', label: 'Jonli dars' },
  { href: '#ota-onalar', label: 'Ota-onalar' },
  { href: '#murabbiylar', label: 'Murabbiylar' },
  { href: '#savollar', label: 'Savollar' },
];

export const PLATFORM_URL = 'https://crm.chesson.uz';

export function Header() {
  const { open } = useLead();
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
          <a href="#top" className={s.brand} aria-label="Chesson — bosh sahifa">
            <Logo size={34} />
          </a>
          <nav className={s.nav} aria-label="Asosiy navigatsiya">
            {NAV.map((n) => (
              <a key={n.href} href={n.href}>
                {n.label}
              </a>
            ))}
          </nav>
          <div className={s.actions}>
            <a href={PLATFORM_URL} className={s.login}>
              <LogIn size={17} aria-hidden="true" />
              Kirish
            </a>
            <button
              type="button"
              className={`btn btn-primary ${s.cta}`}
              onClick={() => open('header')}
            >
              Bepul dars
            </button>
            <button
              type="button"
              className={s.burger}
              aria-label={menu ? 'Menyuni yopish' : 'Menyu'}
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
          {NAV.map((n, i) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setMenu(false)}
              style={{ transitionDelay: menu ? `${60 + i * 40}ms` : '0ms' }}
              tabIndex={menu ? 0 : -1}
            >
              {n.label}
            </a>
          ))}
          <a href={PLATFORM_URL} className={s.sheetLogin} tabIndex={menu ? 0 : -1}>
            <LogIn size={18} aria-hidden="true" /> Platformaga kirish
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
            Bepul darsga yozilish
          </button>
        </nav>
      </div>
    </>
  );
}

'use client';

import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { telegramHref, telHref } from '@/lib/api';
import { Logo } from './Logo';
import { LangSwitch, PLATFORM_URL } from './Header';
import { useLanding, useT } from './providers';
import s from './Footer.module.css';

/** Bo'lim langarlari (matni lug'atda — `footer.links`, shu tartibda) */
const LINKS = ['#platforma', '#dars', '#ota-onalar', '#murabbiylar', '#savollar'];

function instaHref(v: string) {
  return /^https?:\/\//.test(v) ? v : `https://instagram.com/${v.replace(/^@/, '')}`;
}

export function Footer() {
  const { contacts } = useLanding();
  const t = useT();
  return (
    <footer className={s.footer}>
      <div className={`container ${s.grid}`}>
        <div className={s.brand}>
          <Logo height={52} alt={t.common.logoAlt} />
          <p>{t.footer.about}</p>
          <div className={s.social}>
            {contacts.telegram && (
              <a href={telegramHref(contacts.telegram)} target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                <Send size={18} />
              </a>
            )}
            {contacts.instagram && (
              <a href={instaHref(contacts.instagram)} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
                </svg>
              </a>
            )}
          </div>
        </div>
        <nav className={s.col} aria-label={t.footer.siteLabel}>
          <h3>{t.footer.site}</h3>
          {LINKS.map((href, i) => (
            <a key={href} href={href}>
              {t.footer.links[i]}
            </a>
          ))}
        </nav>
        <div className={s.col}>
          <h3>{t.footer.contact}</h3>
          {contacts.phones.map((p) => (
            <a key={p} href={telHref(p)}>
              <Phone size={15} aria-hidden="true" /> {p}
            </a>
          ))}
          {contacts.email && (
            <a href={`mailto:${contacts.email}`}>
              <Mail size={15} aria-hidden="true" /> {contacts.email}
            </a>
          )}
          {contacts.address && (
            <span>
              <MapPin size={15} aria-hidden="true" /> {contacts.address}
            </span>
          )}
        </div>
        <div className={s.col}>
          <h3>{t.footer.users}</h3>
          <a href={PLATFORM_URL} className={s.login}>
            {t.footer.login}
          </a>
          <span className={s.note}>{t.footer.loginNote}</span>
        </div>
      </div>
      <div className={`container ${s.bottom}`}>
        <span>
          © {new Date().getFullYear()} Chesson. {t.footer.rights}
        </span>
        <LangSwitch />
        <span>{t.footer.pieces}</span>
      </div>
    </footer>
  );
}

'use client';

import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { telegramHref, telHref } from '@/lib/api';
import { Logo } from './Logo';
import { PLATFORM_URL } from './Header';
import { useLanding } from './providers';
import s from './Footer.module.css';

function instaHref(v: string) {
  return /^https?:\/\//.test(v) ? v : `https://instagram.com/${v.replace(/^@/, '')}`;
}

export function Footer() {
  const { contacts } = useLanding();
  return (
    <footer className={s.footer}>
      <div className={`container ${s.grid}`}>
        <div className={s.brand}>
          <Logo size={34} />
          <p>Bolalar uchun onlayn shaxmat maktabi: jonli darslar, qiziqarli platforma va ota-onalar uchun shaffof nazorat.</p>
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
        <nav className={s.col} aria-label="Sayt bo'limlari">
          <h3>Sayt</h3>
          <a href="#platforma">Platforma</a>
          <a href="#dars">Jonli dars</a>
          <a href="#ota-onalar">Ota-onalar uchun</a>
          <a href="#murabbiylar">Murabbiylar</a>
          <a href="#savollar">Savollar</a>
        </nav>
        <div className={s.col}>
          <h3>Bog&apos;lanish</h3>
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
          <h3>O&apos;quvchilar va ustozlar</h3>
          <a href={PLATFORM_URL} className={s.login}>
            Platformaga kirish →
          </a>
          <span className={s.note}>Login va parolni maktab administratori beradi.</span>
        </div>
      </div>
      <div className={`container ${s.bottom}`}>
        <span>© {new Date().getFullYear()} Chesson. Barcha huquqlar himoyalangan.</span>
        <span>Donalar: Lichess (cburnett, GPL)</span>
      </div>
    </footer>
  );
}

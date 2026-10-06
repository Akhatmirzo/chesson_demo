'use client';

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import type { LandingData } from '@/content/types';
import { fetchLanding } from '@/lib/api';

const DataCtx = createContext<LandingData | null>(null);
const LeadCtx = createContext<{ open: (source?: string) => void; close: () => void; isOpen: boolean; source: string }>({
  open: () => {},
  close: () => {},
  isOpen: false,
  source: '',
});

/** Build vaqtidagi ma'lumot darhol ko'rinadi, keyin serverdan eng yangisi olinadi (aksiya, narx o'zgargan bo'lsa). */
export function Providers({ initial, children }: { initial: LandingData; children: ReactNode }) {
  const [data, setData] = useState(initial);
  const [lead, setLead] = useState({ isOpen: false, source: '' });

  useEffect(() => {
    const ac = new AbortController();
    fetchLanding(ac.signal)
      .then((d) => setData((prev) => ({ ...prev, ...d, contacts: d.contacts ?? prev.contacts })))
      .catch(() => {});
    return () => ac.abort();
  }, []);

  // Sahifadagi barcha .reveal elementlari ko'rinishga kirganda yumshoq paydo bo'ladi
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.reveal:not(.in)');
    if (!('IntersectionObserver' in window)) {
      els.forEach((e) => e.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (en.isIntersecting) {
            en.target.classList.add('in');
            io.unobserve(en.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [data]);

  const open = useCallback((source = '') => setLead({ isOpen: true, source }), []);
  const close = useCallback(() => setLead((l) => ({ ...l, isOpen: false })), []);

  return (
    <DataCtx.Provider value={data}>
      <LeadCtx.Provider value={{ open, close, isOpen: lead.isOpen, source: lead.source }}>{children}</LeadCtx.Provider>
    </DataCtx.Provider>
  );
}

export function useLanding(): LandingData {
  const d = useContext(DataCtx);
  if (!d) throw new Error('Providers yo\'q');
  return d;
}

export function useLead() {
  return useContext(LeadCtx);
}

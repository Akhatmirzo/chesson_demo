'use client';

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { LeadForm } from './LeadForm';
import { useLead } from './providers';
import s from './LeadModal.module.css';

export function LeadModal() {
  const { isOpen, close, source } = useLead();
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (isOpen && !d.open) d.showModal();
    if (!isOpen && d.open) d.close();
  }, [isOpen]);

  return (
    <dialog
      ref={ref}
      className={s.dialog}
      onClose={close}
      onClick={(e) => {
        if (e.target === ref.current) close();
      }}
      aria-labelledby="lead-title"
    >
      <div className={s.box}>
        <button type="button" className={s.x} onClick={close} aria-label="Yopish">
          <X size={20} />
        </button>
        <h2 id="lead-title">Bepul sinov darsiga yozilish</h2>
        <p className={s.sub}>30 daqiqa · onlayn · majburiyatsiz</p>
        {isOpen && <LeadForm source={source} onDone={close} compact />}
      </div>
    </dialog>
  );
}

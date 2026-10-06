import { Crown } from 'lucide-react';
import s from './Logo.module.css';

export function Logo({ size = 34, light = false }: { size?: number; light?: boolean }) {
  return (
    <span className={s.logo} style={{ ['--s' as string]: `${size}px` }}>
      <span className={s.mark}>
        <span className={s.dot} aria-hidden="true" />
        <Crown size={size * 0.5} color="#fff" aria-hidden="true" />
      </span>
      <span className={s.word} style={light ? { color: '#fff' } : undefined}>
        Chesson
      </span>
    </span>
  );
}

import type { CSSProperties, ReactNode } from 'react';
import s from './Frames.module.css';

/** Brauzer oynasi ramkasi — ichida platforma skrinshoti */
export function BrowserFrame({
  url = 'crm.chesson.uz',
  children,
  className = '',
  style,
}: {
  url?: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={`${s.browser} ${className}`} style={style}>
      <div className={s.bar}>
        <span className={s.dots} aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className={s.url}>
          <svg width="11" height="11" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="currentColor" d="M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5Zm-3 8V7a3 3 0 1 1 6 0v3H9Z" />
          </svg>
          {url}
        </span>
      </div>
      <div className={s.screen}>{children}</div>
    </div>
  );
}

export function PhoneFrame({ children, className = '', style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <div className={`${s.phone} ${className}`} style={style}>
      <span className={s.notch} aria-hidden="true" />
      <div className={s.phoneScreen}>{children}</div>
    </div>
  );
}

/** 960/1600 o'lchamli webp — ekran kengligiga qarab mosi yuklanadi */
export function Shot({ name, alt, priority = false, sizes = '(max-width: 1024px) 100vw, 760px' }: { name: string; alt: string; priority?: boolean; sizes?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/shots/${name}-960.webp`}
      srcSet={`/shots/${name}-960.webp 960w, /shots/${name}-1600.webp 1600w`}
      sizes={sizes}
      alt={alt}
      width={1600}
      height={1000}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      className={s.shot}
    />
  );
}

import { brand } from '@/content/site';

export function LogoMark({ className = 'size-9' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className={className}>
      <rect width="48" height="48" rx="12" fill="#58CC02" />
      <path
        fill="#FFFFFF"
        d="M23 6h2v3h3v2h-3v4h-2v-4h-3V9h3zM17.5 16h13l-2.2 6.5h-8.6zM19.2 24h9.6l1.6 10.5H17.6zM14.5 36h19v5h-19z"
      />
      <circle cx="37" cy="12" r="3.5" fill="#FFC800" />
    </svg>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#top" className="flex items-center gap-2.5" aria-label={`${brand.name} — bosh sahifa`}>
      <LogoMark />
      <span className={`font-display text-xl font-extrabold tracking-tight ${light ? 'text-paper' : 'text-green-deep'}`}>
        {brand.name}
      </span>
    </a>
  );
}

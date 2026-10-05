import { display } from '@/lib/typo';

type Props = {
  eyebrow?: string;
  title: string;
  lead?: string;
  id?: string;
  dark?: boolean;
  center?: boolean;
};

/** Bo'lim sarlavhasi: eyebrow + qatorma-qator chiqadigan sarlavha + lead. */
export default function SectionHeading({ eyebrow, title, lead, id, dark = false, center = false }: Props) {
  return (
    <div className={`max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <p
          data-reveal="up"
          className={`mb-4 text-sm font-bold tracking-[0.14em] uppercase ${dark ? 'text-coral' : 'text-forest'}`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        data-split="lines"
        className={`font-display text-4xl leading-[1.08] font-black tracking-tight sm:text-5xl ${dark ? 'text-cream' : 'text-ink'}`}
      >
        {display(title)}
      </h2>
      {lead && (
        <p
          data-reveal="up"
          className={`mt-5 text-lg leading-relaxed ${dark ? 'text-cream/75' : 'text-ink-soft'} ${center ? 'mx-auto' : ''}`}
        >
          {lead}
        </p>
      )}
    </div>
  );
}

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

/** Page-width wrapper (1280px, 48px gutters; 22px on phones). */
export function Container({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('mx-auto w-full max-w-[1280px] px-12 max-md:px-[22px]', className)} {...props} />;
}

type SectionProps = React.ComponentProps<'section'> & {
  /** Galaxy brightness behind this section (0–1) */
  galaxy: number;
  /** Name the galaxy renderer uses to anchor nebulae / black hole */
  gx: string;
};

/** Page section that the galaxy background reacts to. */
export function Section({ galaxy, gx, className, ...props }: SectionProps) {
  return <section data-galaxy={galaxy} data-gx={gx} className={cn('relative py-[150px] max-md:py-24', className)} {...props} />;
}

/** Uppercase monospace label. */
export function Mono({ className, tone = 'dim', ...props }: React.ComponentProps<'span'> & { tone?: 'gold' | 'dim' }) {
  return (
    <span
      className={cn('font-mono text-xs tracking-[0.14em] uppercase', tone === 'gold' ? 'text-gold' : 'text-zinc-400', className)}
      {...props}
    />
  );
}

/** Thin gold line used before section labels. */
export function Rule({ flip }: { flip?: boolean }) {
  return <i className={cn('block h-px w-10 bg-linear-to-r from-gold to-gold/0', flip && '-scale-x-100')} />;
}

/** Glowing gold dot. */
export function Dot({ className }: { className?: string }) {
  return <span className={cn('mr-2.5 inline-block size-2 rounded-full bg-gold align-middle shadow-[0_0_12px_var(--color-gold)]', className)} />;
}

/** "01 — About" style section label. */
export function Eyebrow({ children, className, center }: { children: React.ReactNode; className?: string; center?: boolean }) {
  return (
    <div className={cn('mb-7 flex items-center gap-3.5', center && 'justify-center', className)}>
      <Rule />
      <Mono tone="gold">{children}</Mono>
      {center && <Rule flip />}
    </div>
  );
}

export function Heading2({ className, ...props }: React.ComponentProps<'h2'>) {
  return (
    <h2
      className={cn('reveal-text m-0 font-display text-[clamp(40px,5vw,72px)] leading-[1.02] font-semibold tracking-[-0.035em]', className)}
      {...props}
    />
  );
}

export function Lead({ className, ...props }: React.ComponentProps<'p'>) {
  return <p className={cn('m-0 text-[19px] leading-[1.65] text-zinc-400', className)} {...props} />;
}

/** Tag list; entries in [brackets] render as dashed placeholders. */
export function Tags({ items, className }: { items: string[]; className?: string }) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {items.map((t) => (
        <Badge key={t} variant={t.startsWith('[') ? 'placeholder' : 'tag'}>{t}</Badge>
      ))}
    </div>
  );
}

/** Bulleted capability list with ember dots; two columns on desktop. */
export function Caps({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn('m-0 mt-6 grid list-none grid-cols-2 gap-x-6 gap-y-2.5 p-0 max-md:grid-cols-1', className)}>
      {items.map((c) => (
        <li
          key={c}
          className="flex items-start gap-2.5 text-[14.5px] leading-[1.45] text-zinc-200 before:mt-[7px] before:size-1.5 before:flex-none before:rounded-full before:bg-ember before:shadow-[0_0_10px_rgba(224,118,58,0.7)] before:content-['']"
        >
          {c}
        </li>
      ))}
    </ul>
  );
}

/** Small monospace footnote. */
export function Note({ className, ...props }: React.ComponentProps<'p'>) {
  return <p className={cn('m-0 font-mono text-[11px] tracking-[.06em] text-zinc-500', className)} {...props} />;
}

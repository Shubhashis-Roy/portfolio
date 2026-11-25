/**
 * Shared building blocks for a project showcase.
 *
 * Used twice: inside an Experience entry (products built in a role) and in the
 * Personal Projects section. The hover zoom and title underline need a
 * `group/project` wrapper around whichever layout uses these.
 */
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Project } from '@/data/content';
import CaseStudyButton from './CaseStudyButton';
import { Dot, Mono, Note } from './primitives';
import CrushesMockup from './mockups/CrushesMockup';
import PlayerIntelMockup from './mockups/PlayerIntelMockup';
import WellnessMockup from './mockups/WellnessMockup';
import HealthcareMockup from './mockups/HealthcareMockup';
import PharmaMockup from './mockups/PharmaMockup';

const MOCKUPS: Record<Project['id'], () => React.JSX.Element> = {
  crushes: CrushesMockup,
  player: PlayerIntelMockup,
  wellness: WellnessMockup,
  healthcare: HealthcareMockup,
  pharma: PharmaMockup,
};

/** Framed concept mockup with its "not a real screenshot" label. */
export function Preview({ p, className }: { p: Project; className: string }) {
  const Mockup = MOCKUPS[p.id];
  return (
    <div data-no-halo className={cn('reveal-media relative isolate overflow-hidden rounded-[28px] border border-white/9 bg-panel', className)}>
      <span className="absolute top-[18px] left-5 z-3 rounded-full border border-white/10 bg-ink/70 px-2.5 py-[7px] font-mono text-[10.5px] tracking-[.14em] text-zinc-400 uppercase">
        {p.previewLabel}
      </span>
      <Mockup />
    </div>
  );
}

/** Project title with a gold underline that draws in on hover. */
export function ProjectTitle({ children, className }: { children: React.ReactNode; className: string }) {
  return (
    <h3 className={cn('m-0', className)}>
      <span className="bg-[linear-gradient(var(--color-gold),var(--color-gold))] bg-[length:0_2px] bg-[position:0_100%] bg-no-repeat pb-1 font-display font-semibold tracking-[-0.035em] transition-[background-size] duration-600 ease-out-expo group-hover/project:bg-[length:100%_2px]">
        {children}
      </span>
    </h3>
  );
}

/** "01 — Featured · Social / Real-Time Application" style line above a title. */
export function ProjectMeta({ label, category }: { label: string; category: string }) {
  return (
    <div className="mb-[18px] flex flex-wrap items-center gap-4">
      <Mono tone="gold">{label}</Mono>
      <Mono>{category}</Mono>
    </div>
  );
}

export function Org({ p, dot }: { p: Project; dot?: boolean }) {
  if (!p.org) return null;
  return (
    <p className="mt-4 mb-0">
      <Badge variant="org">
        {dot && <Dot className="m-0 size-1.5" />}
        {p.org}
      </Badge>
    </p>
  );
}

export function Description({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn('mt-[18px] mb-0 text-[17px] leading-[1.65] text-zinc-300', className)}>{children}</p>;
}

/** Store links, grouped per app - used in the Experience block and the case study. */
export function StoreLinks({ links, className }: { links: NonNullable<Project['links']>; className?: string }) {
  const groups = [...new Set(links.map((l) => l.group))];
  return (
    <div className={cn('flex flex-col gap-2.5', className)}>
      {groups.map((g) => (
        <div key={g} className="flex flex-wrap items-center gap-x-2.5 gap-y-2">
          <Mono className="text-[11px] text-zinc-500">{g}</Mono>
          {links
            .filter((l) => l.group === g)
            .map((l) => (
              <a
                key={l.label}
                href={l.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/15 px-3 py-1 font-mono text-[11px] tracking-[.06em] text-zinc-300 no-underline transition-colors duration-300 hover:border-gold/60 hover:text-gold"
              >
                {l.label} ↗
              </a>
            ))}
        </div>
      ))}
    </div>
  );
}

/** "View Details" plus the live-link button (or the reason there isn't one). */
export function ProjectActions({ p }: { p: Project }) {
  // With per-store links a single "View Project" button would hide three of them.
  const stores = p.links?.length ? p.links : null;
  return (
    <>
      <div className="mt-7 flex flex-wrap items-center gap-3">
        <CaseStudyButton id={p.id} />
        {!stores &&
          (p.liveUrl ? (
            <Button asChild variant="outline" size="sm">
              <a href={p.liveUrl} target="_blank" rel="noreferrer">View Project ↗</a>
            </Button>
          ) : (
            !p.privateProduct && (
              <Button variant="outline" size="sm" disabled title="Add the live URL">View Project ↗</Button>
            )
          ))}
      </div>
      {stores && (
        <div className="mt-7">
          <Mono tone="gold" className="text-[11px]">Available on</Mono>
          <StoreLinks links={stores} className="mt-3" />
        </div>
      )}
      {!p.privateProduct && !p.liveUrl && !stores && <Note className="mt-3">Live link: [add URL]</Note>}
    </>
  );
}

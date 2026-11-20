'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { projects, type Project } from '@/data/content';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import CaseStudyModal from './CaseStudyModal';
import { Caps, Container, Dot, Eyebrow, Lead, Mono, Note, Section, Tags } from './primitives';
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

const byId = (id: Project['id']) => {
  const index = projects.findIndex((p) => p.id === id);
  return { p: projects[index], index };
};

type OpenFn = (index: number) => void;

/** Project card wrapper; `group/project` drives the hover zoom and title underline. */
function Article({ className, ...props }: React.ComponentProps<'article'>) {
  return <article className={cn('group/project reveal relative', className)} {...props} />;
}

function Preview({ p, className }: { p: Project; className: string }) {
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
function Title({ children, className }: { children: React.ReactNode; className: string }) {
  return (
    <h3 className={cn('m-0', className)}>
      <span className="bg-[linear-gradient(var(--color-gold),var(--color-gold))] bg-[length:0_2px] bg-[position:0_100%] bg-no-repeat pb-1 font-display font-semibold tracking-[-0.035em] transition-[background-size] duration-600 ease-out-expo group-hover/project:bg-[length:100%_2px]">
        {children}
      </span>
    </h3>
  );
}

function Meta({ p, label }: { p: Project; label?: string }) {
  return (
    <div className="mb-[18px] flex flex-wrap items-center gap-4">
      <Mono tone="gold">{label ?? p.num}</Mono>
      <Mono>{p.category}</Mono>
    </div>
  );
}

function Org({ p, dot }: { p: Project; dot?: boolean }) {
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

function Description({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn('mt-[18px] mb-0 text-[17px] leading-[1.65] text-zinc-300', className)}>{children}</p>;
}

function Actions({ p, onOpen }: { p: Project; onOpen: () => void }) {
  const details = (
    <Button size="sm" onClick={onOpen}>
      View Details <ArrowRight size={16} aria-hidden />
    </Button>
  );
  if (p.privateProduct) {
    return (
      <div className="mt-7 flex flex-wrap items-center gap-3">
        {details}
        <Note>Company product · no public link</Note>
      </div>
    );
  }
  return (
    <>
      <div className="mt-7 flex flex-wrap items-center gap-3">
        {details}
        {p.liveUrl ? (
          <Button asChild variant="outline" size="sm">
            <a href={p.liveUrl} target="_blank" rel="noreferrer">View Project ↗</a>
          </Button>
        ) : (
          <Button variant="outline" size="sm" disabled title="Add the live URL">View Project ↗</Button>
        )}
      </div>
      {!p.liveUrl && <Note className="mt-3">Live link: [add URL]</Note>}
    </>
  );
}

function Featured({ onOpen }: { onOpen: OpenFn }) {
  const { p, index } = byId('crushes');
  return (
    <Article className="mb-[140px]">
      <Preview p={p} className="h-[640px] max-md:h-[520px]" />
      <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <Meta p={p} label={`${p.num} — Featured`} />
          <Title className="text-[clamp(40px,4.6vw,64px)] leading-none">{p.name}</Title>
          {p.subtitle && <p className="mt-3 mb-0 font-display text-[22px] tracking-[-0.02em] text-zinc-300">{p.subtitle}</p>}
          <Actions p={p} onOpen={() => onOpen(index)} />
        </div>
        <div className="md:col-span-7">
          <Description className="mt-0">{p.desc}</Description>
          <Caps items={p.caps} />
          <Tags items={p.tags} className="mt-7" />
        </div>
      </div>
    </Article>
  );
}

function Column({ id, onOpen }: { id: Project['id']; onOpen: OpenFn }) {
  const { p, index } = byId(id);
  return (
    <Article>
      <Preview p={p} className="h-[460px]" />
      <div className="px-1 pt-9">
        <Meta p={p} />
        <Title className="text-[34px] leading-[1.1]">{p.name}</Title>
        <Org p={p} />
        <Description>{p.desc}</Description>
        <Caps items={p.caps} />
        <Tags items={p.tags} className="mt-6" />
        <Actions p={p} onOpen={() => onOpen(index)} />
      </div>
    </Article>
  );
}

function Alternating({ id, onOpen, flip, className, previewClass }: { id: Project['id']; onOpen: OpenFn; flip?: boolean; className?: string; previewClass: string }) {
  const { p, index } = byId(id);
  return (
    <Article className={cn('grid grid-cols-1 items-center gap-7 md:grid-cols-12 md:gap-14', className)}>
      <div className={cn('md:col-span-7', flip && 'md:order-2')}>
        <Preview p={p} className={previewClass} />
      </div>
      <div className={cn('md:col-span-5', flip && 'md:order-1')}>
        <Meta p={p} />
        <Title className="text-[38px] leading-[1.08]">{p.name}</Title>
        <Org p={p} dot={p.id === 'healthcare'} />
        <Description>{p.desc}</Description>
        <Caps items={p.caps} />
        <Tags items={p.tags} className="mt-6" />
        <Actions p={p} onOpen={() => onOpen(index)} />
      </div>
    </Article>
  );
}

export default function Projects() {
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const open: OpenFn = (i) => {
    setIndex(i);
    setIsOpen(true);
  };
  const professional = projects.filter((p) => p.org).length;

  return (
    <Section id="projects" galaxy={0.6} gx="projects" className="pt-[170px] max-md:pt-24">
      <Container>
        <div className="mb-[88px] grid grid-cols-1 items-end gap-7 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-8">
            <Eyebrow className="reveal">03 — Selected Projects</Eyebrow>
            <h2 className="reveal-text m-0 font-display text-[clamp(52px,7vw,104px)] leading-[0.96] font-semibold tracking-[-0.035em]">
              Selected Projects
            </h2>
            <Lead className="reveal mt-7 max-w-[640px] text-[21px]">
              Turning complex ideas into intelligent, scalable digital products.
            </Lead>
          </div>
          <div className="reveal md:col-span-4 md:text-right">
            <p className="m-0 font-mono text-xs leading-loose tracking-[0.14em] text-zinc-400 uppercase">
              {String(projects.length).padStart(2, '0')} projects
              <br />
              {String(professional).padStart(2, '0')} from professional roles
            </p>
          </div>
        </div>

        <Featured onOpen={open} />

        <div className="mb-[150px] grid grid-cols-1 gap-10 md:grid-cols-2">
          <Column id="player" onOpen={open} />
          <Column id="wellness" onOpen={open} />
        </div>

        <Alternating id="healthcare" onOpen={open} className="mb-[150px]" previewClass="h-[520px]" />
        <Alternating id="pharma" onOpen={open} flip previewClass="h-[500px]" />
      </Container>

      <CaseStudyModal open={isOpen} onOpenChange={setIsOpen} index={index} onNavigate={setIndex} />
    </Section>
  );
}

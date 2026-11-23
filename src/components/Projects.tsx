import { experience, personalProjects, type Project } from '@/data/content';
import { cn } from '@/lib/utils';
import { Caps, Container, Eyebrow, Lead, Section, Tags } from './primitives';
import { Description, Org, Preview, ProjectActions, ProjectMeta, ProjectTitle } from './project-parts';

const num = (p: Project) => String(personalProjects.indexOf(p) + 1).padStart(2, '0');

/** Project card wrapper; `group/project` drives the hover zoom and title underline. */
function Article({ className, ...props }: React.ComponentProps<'article'>) {
  return <article className={cn('group/project reveal relative', className)} {...props} />;
}

/** Lead project: full-width preview, then a two-column write-up. */
function Featured({ p, className }: { p: Project; className?: string }) {
  return (
    <Article className={className}>
      <Preview p={p} className="h-[640px] max-md:h-[520px]" />
      <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <ProjectMeta label={`${num(p)} - Featured`} category={p.category} />
          <ProjectTitle className="text-[clamp(40px,4.6vw,64px)] leading-none">{p.name}</ProjectTitle>
          {p.subtitle && <p className="mt-3 mb-0 font-display text-[22px] tracking-[-0.02em] text-zinc-300">{p.subtitle}</p>}
          <ProjectActions p={p} />
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

/** Preview beside the write-up; `flip` puts the preview on the right. */
function Alternating({ p, flip, className, previewClass }: { p: Project; flip?: boolean; className?: string; previewClass: string }) {
  return (
    <Article className={cn('grid grid-cols-1 items-center gap-7 md:grid-cols-12 md:gap-14', className)}>
      <div className={cn('md:col-span-7', flip && 'md:order-2')}>
        <Preview p={p} className={previewClass} />
      </div>
      <div className={cn('md:col-span-5', flip && 'md:order-1')}>
        <ProjectMeta label={num(p)} category={p.category} />
        <ProjectTitle className="text-[38px] leading-[1.08]">{p.name}</ProjectTitle>
        <Org p={p} />
        <Description>{p.desc}</Description>
        <Caps items={p.caps} />
        <Tags items={p.tags} className="mt-6" />
        <ProjectActions p={p} />
      </div>
    </Article>
  );
}

export default function Projects() {
  const [featured, ...rest] = personalProjects;
  const atWork = experience.flatMap((x) => x.projectIds ?? []).length;

  return (
    <Section id="projects" galaxy={0.6} gx="projects" className="pt-[170px] max-md:pt-24">
      <Container>
        <div className="mb-[88px] grid grid-cols-1 items-end gap-7 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-8">
            <Eyebrow className="reveal">04 - Personal Projects</Eyebrow>
            <h2 className="reveal-text m-0 font-display text-[clamp(52px,7vw,104px)] leading-[0.96] font-semibold tracking-[-0.035em]">
              Personal Projects
            </h2>
            <Lead className="reveal mt-7 max-w-[640px] text-[21px]">
              Built outside client work - ideas taken end to end, from the first sketch to a running product.
            </Lead>
          </div>
          <div className="reveal md:col-span-4 md:text-right">
            <p className="m-0 font-mono text-xs leading-loose tracking-[0.14em] text-zinc-400 uppercase">
              {String(personalProjects.length).padStart(2, '0')} personal project{personalProjects.length === 1 ? '' : 's'}
              <br />
              <a href="#experience" className="no-underline transition-colors hover:text-gold">
                {String(atWork).padStart(2, '0')} more under experience ↑
              </a>
            </p>
          </div>
        </div>

        {featured && <Featured p={featured} className={rest.length ? 'mb-[140px]' : undefined} />}
        {rest.map((p, i) => (
          <Alternating key={p.id} p={p} flip={i % 2 === 0} className={i < rest.length - 1 ? 'mb-[150px]' : undefined} previewClass="h-[520px]" />
        ))}
      </Container>
    </Section>
  );
}

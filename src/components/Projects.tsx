import { experience, personalProjects } from '@/data/content';
import { Container, Eyebrow, Lead, Section } from './primitives';
import ProjectCard from './ProjectCard';

export default function Projects() {
  const atWork = experience.flatMap((x) => x.projectIds ?? []).length;

  return (
    <Section id="projects" galaxy={0.6} gx="projects" className="pt-[110px] max-md:pt-16">
      <Container>
        <div className="mb-[88px] grid grid-cols-1 items-end gap-7 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-8">
            <Eyebrow className="reveal">04 - Personal Projects</Eyebrow>
            <h2 className="reveal-text m-0 font-display text-[clamp(52px,7vw,104px)] leading-[0.96] font-semibold tracking-[-0.035em]">
              Personal Projects
            </h2>
            <Lead className="reveal mt-7 max-w-[640px] text-[21px]">
              Built outside client work - ideas taken end to end, from the first sketch to a running product. Click a card for the full story.
            </Lead>
          </div>
          <div className="reveal md:col-span-4 md:text-right">
            {/* Sits over the bright accretion disk - bigger, brighter text with a dark halo so it stays readable. */}
            <p className="m-0 font-mono text-[15px] leading-[2.1] font-medium tracking-[0.12em] text-zinc-100 uppercase [text-shadow:0_0_2px_rgb(var(--ink-rgb)),0_0_8px_rgb(var(--ink-rgb)/0.95),0_0_18px_rgb(var(--ink-rgb)/0.9)]">
              <span className="text-gold">{String(personalProjects.length).padStart(2, '0')}</span> personal project
              {personalProjects.length === 1 ? '' : 's'}
              <br />
              <a href="#experience" className="text-zinc-100 underline decoration-gold/60 underline-offset-[6px] transition-colors hover:text-gold">
                <span className="text-gold">{String(atWork).padStart(2, '0')}</span>
                {' '}more under experience ↑
              </a>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {personalProjects.map((p, i) => (
            <ProjectCard key={p.id} p={p} index={i} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

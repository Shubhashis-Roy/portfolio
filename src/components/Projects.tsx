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
            <p className="m-0 font-mono text-xs leading-loose tracking-[0.14em] text-zinc-400 uppercase">
              {String(personalProjects.length).padStart(2, '0')} personal project{personalProjects.length === 1 ? '' : 's'}
              <br />
              <a href="#experience" className="no-underline transition-colors hover:text-gold">
                {String(atWork).padStart(2, '0')} more under experience ↑
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

import { experience, profile, projectById, type ProjectId } from '@/data/content';
import { cn } from '@/lib/utils';
import { Caps, Container, Eyebrow, Heading2, Lead, Section, Tags } from './primitives';
import { Description, Preview, ProjectActions, ProjectMeta, ProjectTitle } from './project-parts';

/** A product built in a role, shown in full under that role's summary. */
function RoleProject({ id, className }: { id: ProjectId; className?: string }) {
  const p = projectById(id);
  if (!p) return null;
  return (
    <div className={cn('group/project', className)}>
      {!p.hideMockup && <Preview p={p} className="h-[420px] max-md:h-[360px]" />}
      <div className={p.hideMockup ? undefined : 'pt-9'}>
        <ProjectMeta label="Product" category={p.category} />
        <ProjectTitle className="text-[30px] leading-[1.12] max-md:text-[26px]">{p.name}</ProjectTitle>
        <Description>{p.desc}</Description>
        <Caps items={p.caps} />
        {/* No stack row here — the role's tags above already carry it, and the
            case-study dialog has a dedicated Stack section. */}
        <ProjectActions p={p} />
      </div>
    </div>
  );
}

export default function Experience() {
  return (
    <Section id="experience" galaxy={0.35} gx="experience">
      <Container>
        <Eyebrow className="reveal">02 - Experience</Eyebrow>
        <Heading2 className="mb-6 max-w-[820px]">Products built inside real teams.</Heading2>
        <Lead className="reveal mb-16 max-w-[640px]">
          {profile.experience} of experience across three roles and various products - each one shown with the work it involved.
        </Lead>
        <div className="border-t border-white/10">
          {experience.map((x) => (
            <div
              key={x.company}
              className="reveal grid grid-cols-1 gap-3.5 border-b border-white/10 py-16 transition-[background] duration-400 hover:bg-linear-to-r hover:from-gold/4 hover:to-gold/0 md:grid-cols-12 md:gap-8 md:py-20"
            >
              {/* Company stays in view while its product scrolls past (nav is 76px tall). */}
              <div className="md:sticky md:top-[100px] md:col-span-4 md:self-start">
                <div className="flex items-start gap-4">
                  {x.logo && (
                    <img
                      src={x.logo}
                      alt={`${x.company} logo`}
                      width={56}
                      height={56}
                      loading="lazy"
                      decoding="async"
                      className="mt-1 size-14 shrink-0 rounded-lg border border-white/10 bg-white object-contain"
                    />
                  )}
                  <div className="min-w-0">
                    <p className="m-0 font-display text-[34px] leading-[1.1] font-semibold tracking-[-0.03em]">
                      {x.company}
                    </p>
                    <div className="mt-3 font-mono text-xs leading-[1.9] tracking-[0.14em] text-zinc-400 uppercase">
                      {[[x.current ? 'Current' : null, x.role].filter(Boolean).join(' · '), x.dates, x.location]
                        .filter(Boolean)
                        .map((line) => (
                          <p key={line} className="m-0">{line}</p>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:col-span-8">
                <Lead className="text-[17px]">{x.summary}</Lead>
                {x.highlights && <Caps items={x.highlights} className="mt-7" />}
                <Tags items={x.tags} className="mt-7" />
                {x.projectIds?.map((pid, i) => (
                  <RoleProject
                    key={pid}
                    id={pid}
                    className={i === 0 ? 'mt-12' : 'mt-14 border-t border-white/8 pt-14'}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

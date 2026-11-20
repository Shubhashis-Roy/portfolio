import { experience } from '@/data/content';
import { Container, Dot, Eyebrow, Heading2, Lead, Section, Tags } from './primitives';

export default function Experience() {
  return (
    <Section id="experience" galaxy={0.25} gx="experience">
      <Container>
        <Eyebrow className="reveal">02 — Experience</Eyebrow>
        <Heading2 className="mb-16 max-w-[820px]">Products built inside real teams.</Heading2>
        <div className="border-t border-white/10">
          {experience.map((x) => (
            <div
              key={x.company}
              className="reveal grid grid-cols-1 gap-3.5 border-b border-white/10 py-11 transition-[background] duration-400 hover:bg-linear-to-r hover:from-gold/4 hover:to-gold/0 md:grid-cols-12 md:gap-8"
            >
              <div className="md:col-span-4">
                <p className="m-0 font-display text-[34px] font-semibold tracking-[-0.03em]">
                  {x.current && <Dot />}
                  {x.company}
                </p>
                <p className="mt-3 mb-0 font-mono text-xs tracking-[0.14em] text-zinc-400 uppercase">
                  {[x.current ? 'Current' : null, x.role, x.dates].filter(Boolean).join(' · ')}
                </p>
              </div>
              <div className="md:col-span-8">
                <Lead className="text-[17px]">{x.summary}</Lead>
                <Tags items={x.tags} className="mt-5" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

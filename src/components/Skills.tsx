import { skills } from '@/data/content';
import { Container, Eyebrow, Heading2, Lead, Section } from './primitives';
import SkillCard from './SkillCard';

export default function Skills() {
  return (
    <Section id="skills" galaxy={0.35} gx="skills">
      <Container>
        <div className="grid grid-cols-1 items-end gap-7 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-7">
            <Eyebrow className="reveal">03 - Tech Skills</Eyebrow>
            <Heading2>The stack behind the work.</Heading2>
          </div>
          <Lead className="reveal md:col-span-5">
            Technologies used across the projects above - grouped by where they sit in the product.
          </Lead>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-6">
          {skills.map((s, i) => (
            // 5 groups: three across on the first row, two wider ones below.
            <SkillCard
              key={s.group}
              group={s.group}
              items={s.items}
              index={i}
              className={`reveal ${i < 3 ? 'lg:col-span-2' : 'lg:col-span-3'} ${i === skills.length - 1 && skills.length % 2 ? 'md:col-span-2' : ''}`}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}

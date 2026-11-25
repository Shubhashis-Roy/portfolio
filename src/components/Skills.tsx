import { skills } from '@/data/content';
import { Card } from '@/components/ui/card';
import { Container, Eyebrow, Heading2, Lead, Mono, Section, Tags } from './primitives';

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
        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-6">
          {skills.map((s, i) => (
            // 5 groups: three across on the first row, two wider ones below.
            <Card key={s.group} className={`reveal ${i < 3 ? 'lg:col-span-2' : 'lg:col-span-3'} ${i === skills.length - 1 && skills.length % 2 ? 'md:col-span-2' : ''}`}>
              <Mono tone="gold">{s.group}</Mono>
              <Tags items={s.items} className="mt-5" />
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}

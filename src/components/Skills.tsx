import { skills } from '@/data/content';
import { Container, Eyebrow, Heading2, Lead, Section } from './primitives';
import TiltCard from './TiltCard';

/** Stroke icons (24px grid) shown in each card's front circle, keyed by skill group. */
const ICONS: Record<string, React.ReactNode> = {
  Languages: <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />,
  Frontend: (
    <>
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </>
  ),
  Backend: (
    <>
      <rect x="3" y="3" width="18" height="7" rx="2" />
      <rect x="3" y="14" width="18" height="7" rx="2" />
      <path d="M7 6.5h.01M7 17.5h.01" />
    </>
  ),
  'Generative AI': (
    <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z" />
  ),
  Tools: <path d="M14.7 6.3a4 4 0 0 0 5 5L22 14l-8 8-2.3-2.3a4 4 0 0 0-5-5L4.4 12.4a4 4 0 0 1 5.3-5.3z" />,
};

/** One line under each group title. */
const BLURBS: Record<string, string> = {
  Languages: 'What the code is written in.',
  Frontend: 'Web and mobile interfaces.',
  Backend: 'APIs, data and real-time.',
  'Generative AI': 'LLMs, agents and retrieval.',
  Tools: 'Shipping and running it.',
};

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
            <TiltCard
              key={s.group}
              title={s.group}
              text={BLURBS[s.group]}
              icon={<svg viewBox="0 0 24 24">{ICONS[s.group] ?? ICONS.Tools}</svg>}
              items={s.items}
              footer={`${s.items.length} skills`}
              index={i}
              className={`reveal ${i < 3 ? 'lg:col-span-2' : 'lg:col-span-3'} ${i === skills.length - 1 && skills.length % 2 ? 'md:col-span-2' : ''}`}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}

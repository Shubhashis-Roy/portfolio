import { BrainCircuit, Globe, Layers, PlugZap, Rocket, Zap } from 'lucide-react';
import { whyHireMe } from '@/data/content';
import { Container, Eyebrow, Heading2, Section } from './primitives';
import TiltCard from './TiltCard';

/** Icon for each point, in the same order as `whyHireMe`. */
const ICONS = [BrainCircuit, Layers, Zap, Globe, Rocket, PlugZap];

export default function WhyHireMe() {
  return (
    <Section id="why-hire-me" galaxy={0.5} gx="about">
      <Container>
        <Eyebrow className="reveal">01 - Why hire me</Eyebrow>
        <Heading2 className="max-w-[900px]">What I bring to your team.</Heading2>
        <div className="mt-14 grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {whyHireMe.map((p, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <TiltCard
                key={p.title}
                className="reveal"
                title={p.title}
                text={p.text}
                icon={<Icon aria-hidden />}
                index={i}
              />
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

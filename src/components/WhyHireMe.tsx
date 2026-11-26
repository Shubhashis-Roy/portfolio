import { CheckCircle2 } from 'lucide-react';
import { whyHireMe } from '@/data/content';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { Container, Eyebrow, Heading2, Section } from './primitives';

export default function WhyHireMe() {
  return (
    <Section id="why-hire-me" galaxy={0.5} gx="about">
      <Container>
        <Eyebrow className="reveal">01 - Why hire me</Eyebrow>
        <Heading2 className="max-w-[900px]">What I bring to your team.</Heading2>
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {whyHireMe.map((p) => (
            <Card key={p.title} className="reveal p-7">
              <CheckCircle2 className="text-gold" size={26} aria-hidden />
              <CardTitle className="mt-4 text-[20px]">{p.title}</CardTitle>
              <CardDescription>{p.text}</CardDescription>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}

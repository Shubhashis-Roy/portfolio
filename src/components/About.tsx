import { focusAreas } from '@/data/content';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { FocusIcon } from './Icons';
import { Container, Eyebrow, Heading2, Lead, Section } from './primitives';

export default function About() {
  return (
    <Section id="about" galaxy={0.4} gx="about">
      <Container>
        <div className="grid grid-cols-1 gap-7 md:grid-cols-12 md:gap-12">
          <div className="reveal md:col-span-4">
            <Eyebrow>01 — About</Eyebrow>
          </div>
          <div className="md:col-span-8">
            <Heading2>Building where AI meets product engineering.</Heading2>
            <Lead className="reveal mt-8 max-w-[720px]">
              I design and build full-stack products end to end — from real-time communication and conversational AI
              to clinical workflows and commerce platforms. My work connects large language models, retrieval
              pipelines, and real-time infrastructure to interfaces people actually enjoy using.
            </Lead>
          </div>
        </div>
        <div className="mt-[72px] grid grid-cols-1 gap-5 md:grid-cols-3">
          {focusAreas.map((f) => (
            <Card key={f.title} className="reveal">
              <div className="flex size-11 items-center justify-center rounded-[14px] border border-gold/35 bg-gold/5 text-gold">
                <FocusIcon kind={f.icon} />
              </div>
              <CardTitle>{f.title}</CardTitle>
              <CardDescription>{f.text}</CardDescription>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}

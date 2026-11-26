'use client';

import { useRotation } from '@/lib/useRotation';

/** Greetings the hero cycles through, one by one, each with its own gesture. The first is what renders on the server. */
const greetings = [
  { text: 'Hi there', emoji: '👋', lang: 'en' }, // English
  { text: 'Namaskar', emoji: '🙏', lang: 'bn' }, // Bengali
  { text: 'Namaste', emoji: '🙏', lang: 'hi' }, // Hindi
  { text: '¡Hola!', emoji: '👋', lang: 'es' }, // Spanish
  { text: 'Hallo', emoji: '🤝', lang: 'de' }, // German
  { text: 'Marhaba', emoji: '🤗', lang: 'ar' }, // Arabic
  { text: 'Bonjour', emoji: '😊', lang: 'fr' }, // French
  { text: 'Vanakkam', emoji: '🙏', lang: 'ta' }, // Tamil
  { text: 'Olá', emoji: '👋', lang: 'pt' }, // Portuguese
  { text: 'Merhaba', emoji: '🤝', lang: 'tr' }, // Turkish
  { text: 'Namaskaram', emoji: '🙏', lang: 'te' }, // Telugu
];

const HOLD_MS = 2200; // how long each greeting stays
const FADE_MS = 350; // fade out / in duration

/** "Hi there 👋" that rotates (text + emoji) through greetings in different languages. */
export default function Greeting({ className }: { className?: string }) {
  const { index: i, shown } = useRotation(greetings.length, HOLD_MS, FADE_MS);

  const g = greetings[i];
  return (
    <span className={className} aria-label="Hi there">
      <span
        lang={g.lang}
        dir="auto"
        aria-hidden
        className={`inline-block transition-[opacity,transform,filter] ease-out motion-reduce:transition-none ${
          shown ? 'translate-y-0 opacity-100 blur-0' : '-translate-y-2 opacity-0 blur-[2px]'
        }`}
        style={{ transitionDuration: `${FADE_MS}ms` }}
      >
        {g.text} {g.emoji}
      </span>
    </span>
  );
}

'use client';

import { useEffect, useState } from 'react';

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

const HOLD_MS = 2000; // how long a fully typed greeting stays
const TYPE_MS = 85; // per character, typing
const DELETE_MS = 45; // per character, deleting (faster, like a real backspace)
const GAP_MS = 250; // empty pause between deleting and typing the next one
const REDUCED_SWAP_MS = 2600; // reduced motion: plain swap, no typing

/**
 * "Hi there 👋" that types itself out, holds, backspaces and types the next greeting (with a blinking caret).
 * The emoji pops in once the word is complete. Deliberately a different motion from the role's 3D word flip below.
 */
export default function Greeting({ className }: { className?: string }) {
  const [i, setI] = useState(0);
  const [len, setLen] = useState(() => Array.from(greetings[0].text).length); // server renders the first greeting in full

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let idx = 0;
    let n = Array.from(greetings[0].text).length;

    if (reduce) {
      const id = setInterval(() => {
        idx = (idx + 1) % greetings.length;
        setI(idx);
        setLen(Array.from(greetings[idx].text).length);
      }, REDUCED_SWAP_MS);
      return () => clearInterval(id);
    }

    const del = () => {
      n -= 1;
      setLen(n);
      if (n > 0) t = setTimeout(del, DELETE_MS);
      else
        t = setTimeout(() => {
          idx = (idx + 1) % greetings.length;
          setI(idx);
          type();
        }, GAP_MS);
    };
    const type = () => {
      const full = Array.from(greetings[idx].text).length;
      n += 1;
      setLen(n);
      t = setTimeout(n < full ? type : del, n < full ? TYPE_MS : HOLD_MS);
    };

    t = setTimeout(del, HOLD_MS);
    return () => clearTimeout(t);
  }, []);

  const g = greetings[i];
  const chars = Array.from(g.text);
  const done = len >= chars.length;
  return (
    <span className={className} aria-label="Hi there">
      <span lang={g.lang} dir="auto" aria-hidden className="inline-flex items-baseline">
        <span className="whitespace-pre">{chars.slice(0, len).join('')}</span>
        <span
          className={`ml-[0.08em] inline-block h-[0.9em] w-[3px] translate-y-[0.1em] self-center rounded-full bg-current ${
            done ? 'animate-caret' : ''
          } motion-reduce:hidden`}
        />
        <span
          className={`ml-[0.3em] inline-block origin-[50%_80%] transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none ${
            done ? 'scale-100 rotate-0 opacity-100' : 'scale-0 -rotate-45 opacity-0'
          }`}
        >
          {g.emoji}
        </span>
      </span>
    </span>
  );
}

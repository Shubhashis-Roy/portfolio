'use client';

import { profile } from '@/data/content';
import { useRotation } from '@/lib/useRotation';
import { cn } from '@/lib/utils';

const HOLD_MS = 3000; // a bit longer than the greeting so the two don't swap in lockstep
const FLIP_MS = 450; // one word's flip
const STAGGER_MS = 80; // delay between consecutive words

const maxWords = Math.max(...profile.roles.map((r) => r.split(' ').length));
/** The swap waits until the last word of the outgoing role has finished flipping away. */
const OUT_MS = FLIP_MS + STAGGER_MS * (maxWords - 1);

/**
 * Hero role that rotates through `profile.roles`.
 * Each word flips over in 3D, one after another (a split-flap cascade) - a different motion from the greeting's fade-up.
 * The gradient sits on each word because `bg-clip-text` doesn't paint through transformed children.
 * All roles are stacked in one grid cell (only the current one visible), so the box is always as tall as the
 * longest title and the layout below never jumps. Screen readers get the main `profile.role` only.
 */
export default function RoleRotator({ className }: { className?: string }) {
  const { index, shown } = useRotation(profile.roles.length, HOLD_MS, OUT_MS);
  return (
    <>
      <span className="sr-only">{profile.role}.</span>
      <span aria-hidden className="grid [perspective:800px]">
        {profile.roles.map((r, i) => {
          const words = `${r}.`.split(' ');
          const state = i !== index ? 'waiting' : shown ? 'in' : 'out';
          return (
            <em key={r} className="not-italic [grid-area:1/1]">
              {words.map((w, j) => (
                <span key={j}>
                  <span
                    className={cn(
                      className,
                      'inline-block origin-[50%_50%_-0.35em] transition-[transform,opacity] ease-[cubic-bezier(0.2,0.7,0.2,1)] [backface-visibility:hidden] motion-reduce:transition-none',
                      state === 'in' && 'opacity-100 [transform:rotateX(0deg)]',
                      state === 'out' && 'opacity-0 [transform:rotateX(90deg)]',
                      state === 'waiting' && 'opacity-0 [transform:rotateX(-90deg)]',
                    )}
                    style={{
                      transitionDuration: state === 'waiting' ? '0ms' : `${FLIP_MS}ms`,
                      transitionDelay: state === 'waiting' ? '0ms' : `${j * STAGGER_MS}ms`,
                    }}
                  >
                    {w}
                  </span>
                  {j < words.length - 1 && ' '}
                </span>
              ))}
            </em>
          );
        })}
      </span>
    </>
  );
}

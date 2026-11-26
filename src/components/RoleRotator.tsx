'use client';

import { profile } from '@/data/content';
import { useRotation } from '@/lib/useRotation';
import { cn } from '@/lib/utils';

const HOLD_MS = 3000; // a bit longer than the greeting so the two don't swap in lockstep
const FADE_MS = 400;

/**
 * Hero role that rotates through `profile.roles`.
 * Sits on its own line under the name. All roles are stacked in one grid cell (only the current one visible),
 * so the box is always as tall as the longest title and the layout below never jumps. Screen readers get the main `profile.role` only.
 */
export default function RoleRotator({ className }: { className?: string }) {
  const { index, shown } = useRotation(profile.roles.length, HOLD_MS, FADE_MS);
  return (
    <>
      <span className="sr-only">{profile.role}.</span>
      <span aria-hidden className="grid">
        {profile.roles.map((r, i) => (
          <em
            key={r}
            className={cn(
              className,
              '[grid-area:1/1] transition-[opacity,translate] ease-out motion-reduce:transition-none',
              i === index && shown ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0',
            )}
            style={{ transitionDuration: `${FADE_MS}ms` }}
          >
            {r}.
          </em>
        ))}
      </span>
    </>
  );
}

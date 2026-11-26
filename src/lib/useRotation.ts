'use client';

import { useEffect, useState } from 'react';

/**
 * Cycles an index through `count` items: holds each for `holdMs`, fades out for `fadeMs`, swaps, fades back in.
 * Returns the current index and whether it is visible (false during the fade-out).
 */
export function useRotation(count: number, holdMs: number, fadeMs: number) {
  const [index, setIndex] = useState(0);
  const [shown, setShown] = useState(true);

  useEffect(() => {
    let swap: ReturnType<typeof setTimeout>;
    const tick = setInterval(() => {
      setShown(false);
      swap = setTimeout(() => {
        setIndex((n) => (n + 1) % count);
        setShown(true);
      }, fadeMs);
    }, holdMs + fadeMs);
    return () => {
      clearInterval(tick);
      clearTimeout(swap);
    };
  }, [count, holdMs, fadeMs]);

  return { index, shown };
}

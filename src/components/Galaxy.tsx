'use client';

import { useEffect, useRef } from 'react';
import { GalaxyRenderer } from '@/galaxy/GalaxyRenderer';

type Props = { intensity?: number; animate?: boolean };

/** Fixed full-screen canvas. Reads `[data-galaxy]` sections inside the nearest `[data-galaxy-root]`. */
export default function Galaxy({ intensity = 1, animate = true }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<GalaxyRenderer | null>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    const root = cv?.closest<HTMLElement>('[data-galaxy-root]');
    if (!cv || !root) return;
    const r = new GalaxyRenderer(cv, root, { intensity, animate });
    rendererRef.current = r;
    return () => r.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (rendererRef.current) rendererRef.current.opts = { intensity, animate };
  }, [intensity, animate]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <canvas ref={canvasRef} className="block size-full" />
    </div>
  );
}

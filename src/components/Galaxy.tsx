'use client';

import { useEffect, useRef } from 'react';
import { GalaxyRenderer } from '@/galaxy/GalaxyRenderer';

type Props = { intensity?: number; animate?: boolean };

/** Fixed full-screen canvas. Reads `[data-galaxy]` sections inside the nearest `.pf` container. */
export default function Galaxy({ intensity = 1, animate = true }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<GalaxyRenderer | null>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    const root = cv?.closest<HTMLElement>('.pf');
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
    <div className="gx" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}

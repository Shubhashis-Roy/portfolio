'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import WhatsAppButton from './WhatsAppButton';

/**
 * Floating "back to top" button; appears once the visitor has scrolled past the first screen.
 * Also renders the WhatsApp button, which sits in the corner until this one appears, then moves up above it.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <WhatsAppButton raised={visible} />
      <Button
        variant="icon"
        size="icon"
        aria-label="Back to top"
        title="Back to top"
        tabIndex={visible ? 0 : -1}
        aria-hidden={!visible}
        // Smooth unless the visitor prefers reduced motion (html has scroll-smooth, disabled for reduced motion).
        onClick={() => window.scrollTo({ top: 0 })}
        className={cn(
          'fixed right-6 bottom-6 z-40 bg-panel/80 shadow-[0_10px_40px_rgb(0_0_0/0.5),0_0_24px_rgb(var(--gold-rgb)/0.15)] backdrop-blur-md max-md:right-4 max-md:bottom-4',
          'transition-[opacity,transform,background-color,color,border-color] duration-300 ease-out-expo',
          visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0',
        )}
      >
        <ArrowUp size={18} aria-hidden />
      </Button>
    </>
  );
}

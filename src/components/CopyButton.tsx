'use client';

import { useEffect, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

/** Small icon button that copies `value` to the clipboard and flashes a check mark. */
export default function CopyButton({ value, label, className }: { value: string; label: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      // Clipboard blocked (e.g. insecure context) — fall back to a prompt the visitor can copy from.
      window.prompt(`Copy ${label}`, value);
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? `${label} copied` : `Copy ${label}`}
      title={copied ? 'Copied!' : `Copy ${label}`}
      className={cn(
        'inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/18 bg-ink/60 text-zinc-300 transition-colors hover:border-gold hover:text-gold',
        copied && 'border-gold text-gold',
        className,
      )}
    >
      {copied ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}
      <span aria-live="polite" className="sr-only">{copied ? `${label} copied` : ''}</span>
    </button>
  );
}

import type { Metadata } from 'next';
import { ArrowDownToLine, ArrowLeft } from 'lucide-react';
import { profile } from '@/data/content';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: `Resume - ${profile.name}`,
  description: `Resume of ${profile.name}, ${profile.role}.`,
};

export default function ResumePage() {
  const fileName = profile.resumeUrl.split('/').pop();
  return (
    <main className="flex h-dvh flex-col bg-ink text-white">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3 md:px-8">
        <Button asChild variant="outline" size="sm">
          <a href="/">
            <ArrowLeft size={16} aria-hidden /> Portfolio
          </a>
        </Button>
        <h1 className="font-display text-base font-semibold md:text-lg">{profile.name} — Resume</h1>
        <Button asChild size="sm">
          <a href={profile.resumeUrl} download={fileName}>
            Download <ArrowDownToLine size={16} aria-hidden />
          </a>
        </Button>
      </header>
      <object data={profile.resumeUrl} type="application/pdf" className="w-full flex-1">
        {/* Fallback for browsers that can't display PDFs inline (e.g. most mobile browsers). */}
        <div className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
          <p className="text-white/70">Your browser can’t preview the PDF here.</p>
          <Button asChild>
            <a href={profile.resumeUrl} download={fileName}>
              Download Resume <ArrowDownToLine size={18} aria-hidden />
            </a>
          </Button>
        </div>
      </object>
    </main>
  );
}

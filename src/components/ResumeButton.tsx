import { ArrowUpRight } from 'lucide-react';
import { profile } from '@/data/content';
import { Button } from '@/components/ui/button';

/** Opens the resume preview page (/resume) in a new tab; it has its own Download button. */
export default function ResumeButton({ icon = true }: { icon?: boolean }) {
  const content = (
    <>
      View Resume {icon && <ArrowUpRight size={18} aria-hidden />}
    </>
  );
  return (
    <Button asChild variant="outline">
      {profile.resumeUrl ? (
        <a href="/resume" target="_blank" rel="noopener noreferrer">{content}</a>
      ) : (
        <a href="#contact" title="Connect to your resume PDF">{content}</a>
      )}
    </Button>
  );
}

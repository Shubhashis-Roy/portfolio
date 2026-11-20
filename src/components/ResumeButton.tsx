import { ArrowDownToLine } from 'lucide-react';
import { profile } from '@/data/content';
import { Button } from '@/components/ui/button';

export default function ResumeButton({ icon = true }: { icon?: boolean }) {
  const content = (
    <>
      Download Resume {icon && <ArrowDownToLine size={18} aria-hidden />}
    </>
  );
  return (
    <Button asChild variant="outline">
      {profile.resumeUrl ? (
        <a href={profile.resumeUrl} download>{content}</a>
      ) : (
        <a href="#contact" title="Connect to your resume PDF">{content}</a>
      )}
    </Button>
  );
}

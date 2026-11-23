'use client';

import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ProjectId } from '@/data/content';
import { useCaseStudy } from './CaseStudyProvider';

/** "View Details" — opens the shared case-study dialog. */
export default function CaseStudyButton({ id }: { id: ProjectId }) {
  const open = useCaseStudy();
  return (
    <Button size="sm" onClick={() => open(id)}>
      View Details <ArrowRight size={16} aria-hidden />
    </Button>
  );
}

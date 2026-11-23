'use client';

import { createContext, useCallback, useContext, useState } from 'react';
import { projects, type ProjectId } from '@/data/content';
import CaseStudyModal from './CaseStudyModal';

/** Opens the case-study dialog for a project id. */
const CaseStudyContext = createContext<(id: ProjectId) => void>(() => {});

export const useCaseStudy = () => useContext(CaseStudyContext);

/**
 * Owns the single case-study dialog for the whole page, so both the Experience
 * section (professional products) and the Personal Projects section can open it.
 * Children are passed through untouched and stay Server Components.
 */
export default function CaseStudyProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const show = useCallback((id: ProjectId) => {
    const i = projects.findIndex((p) => p.id === id);
    if (i < 0) return;
    setIndex(i);
    setOpen(true);
  }, []);

  return (
    <CaseStudyContext.Provider value={show}>
      {children}
      <CaseStudyModal open={open} onOpenChange={setOpen} index={index} onNavigate={setIndex} />
    </CaseStudyContext.Provider>
  );
}

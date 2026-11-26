import Galaxy from '@/components/Galaxy';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import WhyHireMe from '@/components/WhyHireMe';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import CaseStudyProvider from '@/components/CaseStudyProvider';

// Rebuild the page at most once a day so the experience counter stays current.
export const revalidate = 86400;

export default function Home() {
  return (
    <div data-galaxy-root className="relative min-h-full bg-ink text-white">
      <Galaxy intensity={1} animate />
      <div className="relative z-1">
        <Nav />
        <CaseStudyProvider>
          <main>
            <Hero />
            <WhyHireMe />
            <Experience />
            <Skills />
            <Projects />
            <Contact />
          </main>
        </CaseStudyProvider>
        <Footer />
        <BackToTop />
      </div>
    </div>
  );
}

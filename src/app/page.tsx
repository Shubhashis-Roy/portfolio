import Galaxy from '@/components/Galaxy';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import WhatsAppButton from '@/components/WhatsAppButton';
import CaseStudyProvider from '@/components/CaseStudyProvider';

export default function Home() {
  return (
    <div data-galaxy-root className="relative min-h-full bg-ink text-white">
      <Galaxy intensity={1} animate />
      <div className="relative z-1">
        <Nav />
        <CaseStudyProvider>
          <main>
            <Hero />
            <About />
            <Experience />
            <Skills />
            <Projects />
            <Contact />
          </main>
        </CaseStudyProvider>
        <Footer />
        <WhatsAppButton />
        <BackToTop />
      </div>
    </div>
  );
}

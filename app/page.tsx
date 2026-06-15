'use client';

import { useRef, useState, type TouchEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/sections/hero';
import { AboutSection } from '@/components/sections/about';
import { TechnologiesSection } from '@/components/sections/technologies';
import { ProjectsSection } from '@/components/sections/projects';
import { ArchitectureSection } from '@/components/sections/architecture';
import { ExperienceSection } from '@/components/sections/experience';
import { CertificationsSection } from '@/components/sections/certifications';
import { ContactSection } from '@/components/sections/contact';

const sections = [
  { id: 'Hero', label: 'Home' },
  { id: 'About', label: 'About' },
  { id: 'Technologies', label: 'Technologies' },
  { id: 'Projects', label: 'Projects' },
  { id: 'Architecture', label: 'Architecture' },
  { id: 'Experience', label: 'Experience' },
  { id: 'Contact', label: 'Contact' },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState('Hero');
  const [direction, setDirection] = useState(0);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const activeIndex = sections.findIndex((section) => section.id === activeSection);

  const selectSection = (sectionId: string) => {
    const nextIndex = sections.findIndex((section) => section.id === sectionId);
    if (nextIndex === -1 || nextIndex === activeIndex) return;

    setDirection(nextIndex > activeIndex ? 1 : -1);
    setActiveSection(sectionId);
  };

  const goToAdjacentSection = (offset: -1 | 1) => {
    const nextIndex = activeIndex + offset;
    const nextSection = sections[nextIndex];
    if (!nextSection) return;

    setDirection(offset);
    setActiveSection(nextSection.id);
  };

  const handleTouchStart = (event: TouchEvent<HTMLElement>) => {
    const touch = event.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event: TouchEvent<HTMLElement>) => {
    const start = touchStartRef.current;
    touchStartRef.current = null;
    if (!start) return;

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;

    if (Math.abs(deltaX) < 60 || Math.abs(deltaX) < Math.abs(deltaY) * 1.5) return;

    goToAdjacentSection(deltaX < 0 ? 1 : -1);
  };

  const sectionVariants = {
    enter: (slideDirection: number) => ({
      opacity: 0,
      x: slideDirection > 0 ? 72 : -72,
    }),
    center: {
      opacity: 1,
      x: 0,
    },
    exit: (slideDirection: number) => ({
      opacity: 0,
      x: slideDirection > 0 ? -72 : 72,
    }),
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'About':
        return <AboutSection />;
      case 'Technologies':
        return <TechnologiesSection />;
      case 'Projects':
        return <ProjectsSection />;
      case 'Architecture':
        return <ArchitectureSection />;
      case 'Experience':
        return <ExperienceSection />;
      case 'Contact':
        return <ContactSection />;
      case 'Hero':
      default:
        return <HeroSection />;
    }
  };

  return (
    <>
      <Header
        activeSection={activeSection}
        sections={sections}
        onSelectSection={selectSection}
      />
      <main
        className="relative min-h-screen overflow-x-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {activeIndex > 0 && (
          <button
            type="button"
            aria-label="Previous section"
            onClick={() => goToAdjacentSection(-1)}
            className="fixed left-0 top-24 z-30 hidden h-[calc(100vh-6rem)] w-12 cursor-w-resize bg-transparent md:block"
          />
        )}
        {activeIndex < sections.length - 1 && (
          <button
            type="button"
            aria-label="Next section"
            onClick={() => goToAdjacentSection(1)}
            className="fixed right-0 top-24 z-30 hidden h-[calc(100vh-6rem)] w-12 cursor-e-resize bg-transparent md:block"
          />
        )}

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeSection}
            custom={direction}
            variants={sectionVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            {renderActiveSection()}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer
        sections={sections.filter((section) =>
          ['About', 'Projects', 'Experience', 'Contact'].includes(section.id)
        )}
        onSelectSection={selectSection}
      />
    </>
  );
}

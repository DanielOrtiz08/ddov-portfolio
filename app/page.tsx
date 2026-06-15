'use client';

import { useState } from 'react';
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

  return (
    <>
      <Header
        activeSection={activeSection}
        sections={sections}
        onSelectSection={setActiveSection}
      />
      <main className="min-h-screen">
        <div className={activeSection === 'Hero' ? 'block' : 'hidden'}>
          <HeroSection />
        </div>
        <div className={activeSection === 'About' ? 'block' : 'hidden'}>
          <AboutSection />
        </div>
        <div className={activeSection === 'Technologies' ? 'block' : 'hidden'}>
          <TechnologiesSection />
        </div>
        <div className={activeSection === 'Projects' ? 'block' : 'hidden'}>
          <ProjectsSection />
        </div>
        <div className={activeSection === 'Architecture' ? 'block' : 'hidden'}>
          <ArchitectureSection />
        </div>
        <div className={activeSection === 'Experience' ? 'block' : 'hidden'}>
          <ExperienceSection />
        </div>
        <div className={activeSection === 'Contact' ? 'block' : 'hidden'}>
          <ContactSection />
        </div>
      </main>
      <Footer
        sections={sections.filter((section) =>
          ['About', 'Projects', 'Experience', 'Contact'].includes(section.id)
        )}
        onSelectSection={setActiveSection}
      />
    </>
  );
}

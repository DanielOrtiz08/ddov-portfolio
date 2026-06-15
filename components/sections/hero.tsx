'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Github, Linkedin, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FloatingTechIcons } from '@/components/ui-custom/floating-tech-icons';

const roles = [
  'Backend Engineer',
  'Java Developer',
  'Spring Boot Expert',
  'Cloud Architect',
];

export function HeroSection() {
  const [currentRole, setCurrentRole] = React.useState(0);

  React.useEffect(() => {
    const protectImage = (event: Event) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest('[data-protected-image="true"]')) {
        event.preventDefault();
      }
    };

    document.addEventListener('contextmenu', protectImage);
    document.addEventListener('dragstart', protectImage);

    return () => {
      document.removeEventListener('contextmenu', protectImage);
      document.removeEventListener('dragstart', protectImage);
    };
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float animation-delay-200" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.1] dark:opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                              linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <FloatingTechIcons />

      {/* Main content */}
      <div className="section-container pt-24 pb-16 text-center">
        {/* Profile image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <div
            className="relative inline-block select-none"
            data-protected-image="true"
            onContextMenu={(event) => event.preventDefault()}
          >
            {/* Glow ring */}
            {/*<div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent blur-xl opacity-50 scale-110 animate-pulse-glow" />*/}

            {/* Border gradient */}
            <div className="relative p-1 rounded-full bg-gradient-to-r from-primary to-accent">
              <div className="relative h-40 w-40 overflow-hidden rounded-full bg-card sm:h-44 sm:w-44 md:h-48 md:w-48">
                <Image
                  src="/images/foto-formal.png"
                  alt="Foto profesional"
                  fill
                  draggable={false}
                  onContextMenu={(event) => event.preventDefault()}
                  className="pointer-events-none object-cover"
                  sizes="(max-width: 768px) 14rem, 16rem"
                />
                <div className="absolute inset-0" aria-hidden="true" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-sm md:text-base font-medium text-muted-foreground mb-2">
            Hello, I&apos;m
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4">
            <span className="gradient-text">Daniel Ortiz</span>
          </h1>
        </motion.div>

        {/* Animated role */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6 h-12 md:h-16"
        >
          <p className="text-xl md:text-3xl lg:text-4xl font-medium text-foreground">
            <motion.span
              key={currentRole}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="inline-block"
            >
              {roles[currentRole]}
            </motion.span>
          </p>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-2xl mx-auto text-base md:text-lg text-muted-foreground mb-8"
        >
          Final-semester Systems Engineering student specializing in{' '}
          <span className="text-foreground font-medium">Java</span>,{' '}
          <span className="text-foreground font-medium">Spring Boot</span>, and{' '}
          <span className="text-foreground font-medium">Cloud Computing</span>. Building scalable
          distributed systems and microservices architectures.
        </motion.p>

        {/* Tech stack pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {['Java', 'Spring Boot', 'PostgreSQL', 'Docker', 'AWS', 'Azure'].map((tech, index) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="px-3 py-1.5 text-sm font-medium rounded-full glass border border-border/50"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              asChild
              size="lg"
              className="btn-gradient text-white px-8 h-12 rounded-xl shadow-lg"
            >
              <a href="/files/Daniel_Ortiz_CV.pdf" download="Daniel_Ortiz_CV.pdf">
                <Download className="mr-2 h-4 w-4" />
                Download CV
              </a>
            </Button>
          </motion.div>

          <div className="flex gap-3">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                asChild
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-xl"
              >
                <a
                  href="https://github.com/DanielOrtiz08"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-5 w-5" />
                </a>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                asChild
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-xl"
              >
                <a
                  href="https://www.linkedin.com/in/daniel-david-ortiz-villanueva-7a8053257/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

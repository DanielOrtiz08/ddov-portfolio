'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Github, Linkedin, Menu, Terminal, X } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NavItem {
  id: string;
  label: string;
}

const defaultNavItems: NavItem[] = [
  { id: 'Hero', label: 'Home' },
  { id: 'About', label: 'About' },
  { id: 'Technologies', label: 'Technologies' },
  { id: 'Projects', label: 'Projects' },
  { id: 'Architecture', label: 'Architecture' },
  { id: 'Experience', label: 'Experience' },
  { id: 'Contact', label: 'Contact' },
];

const socialLinks = [
  {
    icon: Github,
    href: 'https://github.com/DanielOrtiz08',
    label: 'GitHub',
  },
  {
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/daniel-david-ortiz-villanueva-7a8053257',
    label: 'LinkedIn',
  },
];

interface HeaderProps {
  activeSection?: string;
  sections?: NavItem[];
  onSelectSection?: (sectionId: string) => void;
}

export function Header({
  activeSection,
  sections = defaultNavItems,
  onSelectSection,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const activeLabel = sections.find((item) => item.id === activeSection)?.label ?? 'Home';

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'glass border-b border-border/50 py-3'
          : 'bg-transparent py-5'
      )}
    >
      <nav className="section-container flex items-center justify-between">
        <motion.button
          type="button"
          onClick={() => {
            onSelectSection?.('Hero');
            setIsMobileMenuOpen(false);
          }}
          className="flex items-center gap-2 border-0 bg-transparent p-0 text-left text-lg font-semibold"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
            <Terminal className="h-5 w-5 text-white" />
          </div>
          <span className="gradient-text font-mono">Systems Engineer</span>
        </motion.button>

        {/* Desktop Navigation */}
        <motion.div
          className="hidden md:flex items-center gap-1"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {sections.map((item, index) => (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => onSelectSection?.(item.id)}
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                item.id === activeSection
                  ? 'bg-primary/10 text-primary ring-1 ring-primary/20'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              )}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 + 0.2 }}
            >
              {item.label}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ThemeToggle />
          <span className="md:hidden rounded-full border border-border/60 bg-background/90 px-3 py-1 text-xs font-medium text-primary shadow-sm">
            {activeLabel}
          </span>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </motion.div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 md:hidden"
          >
            <button
              type="button"
              aria-label="Close mobile menu"
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute inset-y-0 left-0 bg-foreground/5"
              style={{ right: 'min(86vw, 24rem)' }}
            />

            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="glass ml-auto flex h-full w-[86vw] max-w-sm flex-col border-l border-border/60 bg-background/95 px-5 py-5 shadow-2xl shadow-foreground/10 dark:bg-background/90"
            >
              <div className="mb-8 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => {
                    onSelectSection?.('Hero');
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex min-w-0 items-center gap-2 border-0 bg-transparent p-0 text-left font-semibold"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
                    <Terminal className="h-5 w-5 text-white" />
                  </div>
                  <span className="truncate font-mono text-sm text-primary">Systems Engineer</span>
                </button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close mobile menu"
                  className="shrink-0"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="mb-5 rounded-lg border border-primary/20 bg-primary/10 px-3 py-2 text-sm font-medium text-primary">
                {activeLabel}
              </div>

              <nav className="flex flex-col gap-2">
                {sections.map((item, index) => (
                  <motion.button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      onSelectSection?.(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={cn(
                      'w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors',
                      item.id === activeSection
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    )}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </nav>

              <div className="mt-auto space-y-4 border-t border-border/60 pt-5">
                <Button
                  asChild
                  className="btn-gradient h-11 w-full rounded-lg text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <a href="/files/Daniel_Ortiz_CV.pdf" download="Daniel_Ortiz_CV.pdf">
                    <Download className="mr-2 h-4 w-4" />
                    Download CV
                  </a>
                </Button>

                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <Button
                      key={social.label}
                      asChild
                      variant="outline"
                      size="icon"
                      className="h-11 w-11 rounded-lg"
                    >
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <social.icon className="h-5 w-5" />
                        <span className="sr-only">{social.label}</span>
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

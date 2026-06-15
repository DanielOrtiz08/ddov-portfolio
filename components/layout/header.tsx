'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Terminal } from 'lucide-react';
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
        <motion.a
          href="#"
          className="flex items-center gap-2 font-semibold text-lg"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
            <Terminal className="h-5 w-5 text-white" />
          </div>
          <span className="gradient-text font-mono">Systems Engineer</span>
        </motion.a>

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
                  ? 'text-foreground bg-muted'
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden glass border-b border-border/50"
          >
            <div className="section-container py-4 flex flex-col gap-2">
              {sections.map((item, index) => (
                <motion.button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onSelectSection?.(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

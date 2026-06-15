'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Terminal } from 'lucide-react';

const socialLinks = [
  {
    icon: Github,
    href: 'https://github.com/DanielOrtiz08',
    label: 'GitHub',
  },
  {
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/daniel-david-ortiz-villanueva-7a8053257/',
    label: 'LinkedIn',
  },
  {
    icon: Mail,
    href: 'mailto:ddov0811@gmail.com',
    label: 'Email',
  },
];

interface FooterLink {
  id: string;
  label: string;
}

const quickLinks: FooterLink[] = [
  { id: 'About', label: 'About' },
  { id: 'Projects', label: 'Projects' },
  { id: 'Experience', label: 'Experience' },
  { id: 'Contact', label: 'Contact' },
];

interface FooterProps {
  sections?: FooterLink[];
  onSelectSection?: (sectionId: string) => void;
}

export function Footer({
  sections = quickLinks,
  onSelectSection,
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 bg-card/50">
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <motion.button
              type="button"
              onClick={() => onSelectSection?.('Hero')}
              className="flex items-center gap-2 border-0 bg-transparent p-0 text-left text-lg font-semibold"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
                <Terminal className="h-5 w-5 text-white" />
              </div>
              <span className="gradient-text font-mono">Systems Engineer</span>
            </motion.button>
            <p className="text-sm text-muted-foreground max-w-xs">
              Backend Engineer specializing in Java, Spring Boot, and Cloud Architecture.
              Building scalable distributed systems.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="font-semibold text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-1">
              {sections.map((link) => (
                <li key={link.id}>
                  <motion.button
                    type="button"
                    onClick={() => onSelectSection?.(link.id)}
                    className="text-sm text-left w-full text-muted-foreground hover:text-foreground transition-colors"
                    whileHover={{ x: 4 }}
                  >
                    {link.label}
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm uppercase tracking-wider">
              Connect
            </h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted hover:bg-gradient-to-br hover:from-primary hover:to-accent text-muted-foreground hover:text-white transition-all"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="h-5 w-5" />
                  <span className="sr-only">{social.label}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <p className="text-sm text-muted-foreground w-full sm:w-auto">
            © {currentYear} Daniel David Ortiz Villanueva. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground w-full sm:w-auto sm:text-right">
            Built with Next.js, TypeScript & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}

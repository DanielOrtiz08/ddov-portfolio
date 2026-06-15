'use client';

import { motion, useInView } from 'framer-motion';
import * as React from 'react';
import {
  GraduationCap,
  Briefcase,
  Award,
  Calendar,
  MapPin,
  ExternalLink,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const experiences = [
  {
    type: 'work',
    title: 'Auxiliar de Mantenimiento y Distribución de Agua',
    company: 'Acuagranvía',
    location: 'Zona Bananera, Magdalena',
    period: '2021 - Present',
    description: [
      'Support in preventive and corrective maintenance activities for water supply connections',
      'Monitoring and control of the potable water distribution network',
      'User support and service resolution for water supply related requests',
    ],
    icon: Briefcase,
    color: 'from-blue-500 to-cyan-400',
  },
  {
    type: 'education',
    title: 'Systems Engineering',
    company: 'Universidad del Magdalena',
    location: 'Santa Marta, Colombia',
    period: '2021 - Present',
    description: [
      'Final semester student',
      'Focus on software development and distributed systems',
      'Core curriculum in programming, databases, and software architecture',
    ],
    icon: GraduationCap,
    color: 'from-emerald-500 to-green-400',
  },
  {
    type: 'certification',
    title: 'Backend Java & Spring Boot Program',
    company: 'Oracle Next Education (ONE) + Alura Latam',
    location: 'Online',
    period: '2024 - 2025',
    description: [
      'Comprehensive Java development training',
      'Spring Boot ecosystem and enterprise patterns',
      'Completion certificate obtained',
    ],
    icon: Award,
    color: 'from-orange-500 to-amber-400',
    link: 'https://www.aluracursos.com/',
  },
];

export function ExperienceSection() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="section-container" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Experience & <span className="gradient-text">Education</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My professional journey and educational background
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-accent to-primary/20 md:-translate-x-1/2" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={cn(
                'relative pl-12 md:pl-0 pb-12 last:pb-0',
                index % 2 === 0 ? 'md:pr-[50%] md:text-right' : 'md:pl-[50%]'
              )}
            >
              {/* Timeline dot */}
              <div
                className={cn(
                  'absolute left-0 md:left-1/2 top-0 -translate-x-0 md:-translate-x-1/2 w-10 h-10 rounded-full bg-card border-2 border-primary flex items-center justify-center z-10',
                  'shadow-lg shadow-primary/20'
                )}
              >
                <div className={cn(
                  'w-full h-full rounded-full flex items-center justify-center bg-gradient-to-br',
                  exp.color
                )}>
                  <exp.icon className="h-5 w-5 text-white" />
                </div>
              </div>

              {/* Content card */}
              <div
                className={cn(
                  'glass rounded-2xl p-6 ml-4 md:ml-0',
                  index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
                )}
              >
                {/* Header */}
                <div className={cn(
                  'flex flex-col gap-1 mb-3',
                  index % 2 === 0 ? 'md:items-end' : 'md:items-start'
                )}>
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary inline-flex items-center gap-1 self-start">
                    <Calendar className="h-3 w-3" />
                    {exp.period}
                  </span>
                  <h3 className="text-lg font-semibold">{exp.title}</h3>
                </div>

                {/* Company and location */}
                <div className={cn(
                  'flex flex-wrap gap-2 text-sm text-muted-foreground mb-4',
                  index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'
                )}>
                  <span className="font-medium text-foreground">{exp.company}</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {exp.location}
                  </span>
                </div>

                {/* Description */}
                <ul className={cn(
                  'space-y-1.5 text-sm text-muted-foreground',
                  index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                )}>
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Link if available */}
                {exp.link && (
                  <div className={cn(
                    'mt-4',
                    index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                  )}>
                    <a
                      href={exp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                    >
                      View Program
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

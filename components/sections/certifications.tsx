'use client';

import { motion, useInView } from 'framer-motion';
import * as React from 'react';
import { Award, ExternalLink, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

const certifications = [
  {
    title: 'Backend Java & Spring Boot',
    issuer: 'Oracle Next Education + Alura Latam',
    date: '2025',
    description: 'Comprehensive backend development program covering Java, Spring Boot, REST APIs, and enterprise patterns',
    credential: null,
    color: 'from-green-500 to-grey-400',
  },
  {
    title: 'Microsoft Certified: Azure Developer Associate',
    issuer: 'Microsoft Azure',
    date: 'In Progress',
    description: 'Foundational understanding of Azure Cloud services and architecture',
    credential: null,
    color: 'from-blue-500 to-grey-400',
    inProgress: true,
  },
];

export function CertificationsSection() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="certifications" className="py-24 relative overflow-hidden">
      <div className="section-container" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Certifications & <span className="gradient-text">Achievements</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Professional certifications and recognition
          </p>
        </motion.div>

        {/* Certifications grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className={cn(
                'group relative glass rounded-2xl p-6 card-hover',
                cert.inProgress && 'opacity-80'
              )}
            >
              {/* In progress badge */}
              {cert.inProgress && (
                <div className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs font-medium px-2 py-1 rounded-full">
                  In Progress
                </div>
              )}

              {/* Icon */}
              <div className={cn(
                'w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br',
                cert.color
              )}>
                <Award className="h-7 w-7 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold mb-1">{cert.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">{cert.issuer}</p>
              <p className="text-sm text-muted-foreground mb-4">{cert.description}</p>

              {/* Date */}
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {cert.date}
                </span>
                {cert.credential && (
                  <a
                    href={cert.credential}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-primary hover:underline"
                  >
                    View Credential
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Placeholder for future certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
        </motion.div>
      </div>
    </section>
  );
}

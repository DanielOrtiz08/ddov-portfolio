'use client';

import { motion, useInView } from 'framer-motion';
import * as React from 'react';
import { GraduationCap, Code2, Cloud, Server, Lightbulb, Users } from 'lucide-react';

const highlights = [
  {
    icon: GraduationCap,
    title: 'Systems Engineering',
    description: 'Final-semester student at Universidad del Magdalena',
  },
  {
    icon: Code2,
    title: 'Backend Focused',
    description: 'Java, Spring Boot, REST APIs, Microservices',
  },
  {
    icon: Cloud,
    title: 'Cloud Native',
    description: 'AWS, Azure, Serverless Architecture',
  },
  {
    icon: Server,
    title: 'Distributed Systems',
    description: 'Scalable architectures, High availability',
  },
];

const timeline = [
  {
    year: '2021',
    title: 'Journey Begins',
    description: 'Started Systems Engineering at Universidad del Magdalena',
  },
  {
    year: '2024',
    title: 'Backend Specialization',
    description: 'Oracle Next Education + Alura Latam - Java & Spring Boot',
  },
  {
    year: '2025',
    title: 'Cloud Journey',
    description: 'Deep dive into Azure services',
  },
  {
    year: '2026',
    title: 'Senior Year',
    description: 'Final semester, ready for professional challenges',
  },
];

export function AboutSection() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
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
            About <span className="gradient-text">Me</span>
          </h2>
        </motion.div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 h-full"
          >
            <div className="glass rounded-2xl p-8 h-full">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                Who I Am
              </h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  I&apos;m Daniel David Ortiz Villanueva, a final-semester Systems Engineering
                  student at the University of Magdalena in Santa Marta, Colombia, with a deep 
                  passion for backend development and cloud architecture.
                </p>
                <p>
                  My journey in software engineering has been driven by a fascination with
                  building robust, scalable systems. I believe that great software is built
                  on solid foundations, clean architecture, and an understanding of how
                  systems work at scale.
                </p>
                <p>
                  I specialize in designing and implementing REST APIs, microservices
                  architectures, and cloud-native solutions. My experience with
                  authentication systems (JWT, OAuth2, Keycloak), databases (PostgreSQL,
                  Redis, DynamoDB), and message brokers (Kafka, RabbitMQ) enables me to
                  build comprehensive backend solutions.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative h-full"
          >
            <div className="glass rounded-2xl p-8 h-full">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Users className="h-5 w-5 text-accent" />
                My Journey
              </h3>

              <div className="relative space-y-6 h-full">
                {/* Timeline line */}
                <div className="absolute left-[10px] top-3 bottom-12 w-[2px] bg-gradient-to-b from-primary via-accent to-primary/20" />

                {timeline.map((item, index) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.15 }}
                    className="relative pl-8"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-1 h-6 w-6 rounded-full bg-card border-2 border-primary flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>

                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                          {item.year}
                        </span>
                        <h4 className="font-medium mt-2">{item.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Highlights grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid sm:grid-cols-2 gap-4 h-full"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="glass rounded-xl p-3 card-hover"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20">
                    <item.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{item.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Languages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="glass rounded-xl p-12 h-full flex flex-col justify-center items-start"
          >
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <span className="text-sm uppercase tracking-wider text-muted-foreground">
                Languages
              </span>
            </h4>
            <div className="flex gap-3">
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-muted">
                Spanish (Native)
              </span>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-muted">
                English (B1)
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

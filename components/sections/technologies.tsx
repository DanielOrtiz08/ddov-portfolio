'use client';

import { motion, useInView } from 'framer-motion';
import * as React from 'react';
import { cn } from '@/lib/utils';

const techCategories = [
  {
    name: 'Languages',
    icon: '💻',
    color: 'from-blue-500 to-cyan-400',
    items: [
      { name: 'Java', level: 'Advanced' },
      { name: 'SQL', level: 'Advanced' },
      { name: 'Python', level: 'Intermediate' },
      { name: 'TypeScript', level: 'Basic' },
      { name: 'JavaScript', level: 'Basic' },
      { name: 'C/C++', level: 'Intermediate' },
    ],
  },
  {
    name: 'Backend',
    icon: '⚙️',
    color: 'from-green-500 to-black-400',
    items: [
      { name: 'Spring Boot', level: 'Advanced' },
      { name: 'Spring Security', level: 'Intermediate' },
      { name: 'Spring Data JPA', level: 'Advanced' },
      { name: 'Spring WebFlux', level: 'Intermediate' },
      { name: 'Node.js', level: 'Intermediate' },
      { name: 'Express.js', level: 'Intermediate' },
      { name: 'FastAPI', level: 'Basic' },
      { name: 'Hibernate', level: 'Intermediate' },
      { name: 'MapStruct', level: 'Intermediate' },
    ],
  },
  {
    name: 'Security',
    icon: '🔐',
    color: 'from-red-500 to-black-400',
    items: [
      { name: 'JWT', level: 'Intermediate' },
      { name: 'OAuth2', level: 'Intermediate' },
      { name: 'RBAC', level: 'Advanced' },
      { name: 'Keycloak', level: 'Basic' },
    ],
  },
  {
    name: 'Databases',
    icon: '🗄️',
    color: 'from-orange-500 to-amber-400',
    items: [
      { name: 'PostgreSQL', level: 'Advanced' },
      { name: 'Redis', level: 'Intermediate' },
      { name: 'DynamoDB', level: 'Intermediate' },
      { name: 'Query Methods', level: 'Advanced' },
      { name: 'Stored Procedures', level: 'Intermediate' },
    ],
  },
  {
    name: 'Cloud',
    icon: '☁️',
    color: 'from-sky-500 to-blue-400',
    items: [
      { name: 'AWS Lambda', level: 'Basic' },
      { name: 'API Gateway', level: 'Basic' },
      { name: 'Azure App Service', level: 'Advanced' },
      { name: 'Azure SQL', level: 'Intermediate' },
      { name: 'Azure DevOps', level: 'Intermediate' },
      { name: 'AWS CDK', level: 'Basic' },
    ],
  },
  {
    name: 'DevOps',
    icon: '🚀',
    color: 'from-red-500 to-rose-400',
    items: [
      { name: 'Git', level: 'Intermediate' },
      { name: 'GitHub', level: 'Advanced' },
      { name: 'Git Flow', level: 'Intermediate' },
      { name: 'Docker', level: 'Intermediate' },
      { name: 'Azure Pipelines', level: 'Intermediate' },
      { name: 'Postman', level: 'Advanced' },
    ],
  },
  {
    name: 'Architecture & Messaging',
    icon: '🏗️',
    color: 'from-indigo-500 to-black-400',
    items: [
      { name: 'Microservices', level: 'Intermediate' },
      { name: 'REST APIs', level: 'Advanced' },
      { name: 'Serverless', level: 'Intermediate' },
      { name: 'Event-Driven', level: 'Basic' },
      { name: 'SOLID', level: 'Intermediate' },
      { name: 'Kafka', level: 'Basic' },
      { name: 'RabbitMQ', level: 'Basic' },
    ],
  },
  {
    name: 'Messaging',
    icon: '📨',
    color: 'from-sky-500 to-white-200',
    items: [
      { name: 'Kafka', level: 'Basic' },
      { name: 'RabbitMQ', level: 'Basic' },
    ],
  },
  {
    name: 'Frontend',
    icon: '🎨',
    color: 'from-red-500 to-orange-400',
    items: [
      { name: 'React', level: 'Intermediate' },
      { name: 'Angular', level: 'Intermediate' },
      { name: 'HTML/CSS', level: 'Intermediate' },
    ],
  },
];

const levelColors: Record<string, string> = {
  Advanced: 'bg-green-500/20 text-green-600 dark:text-green-400',
  Intermediate: 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400',
  Basic: 'bg-slate-500/20 text-slate-600 dark:text-slate-400',
};

export function TechnologiesSection() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="technologies" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl opacity-30" />
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
            Technology <span className="gradient-text">Stack</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tools and technologies I use to build robust, scalable backend systems
          </p>
        </motion.div>

        {/* Categories grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="glass rounded-2xl p-6 card-hover"
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-4">
                <div className={cn(
                  'w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-gradient-to-br',
                  category.color
                )}>
                  {category.icon}
                </div>
                <h3 className="font-semibold">{category.name}</h3>
              </div>

              {/* Tech items */}
              <div className="flex flex-wrap gap-2">
                {category.items.map((tech, techIndex) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: categoryIndex * 0.1 + techIndex * 0.05 }}
                    className="group relative"
                  >
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-muted hover:bg-muted/80 transition-colors cursor-default">
                      {tech.name}
                      <span className={cn(
                        'text-xs px-1.5 py-0.5 rounded',
                        levelColors[tech.level]
                      )}>
                        {tech.level}
                      </span>
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground text-sm">
            Also experienced with:{' '}
            <span className="text-foreground">
              Gradle, Maven, Vite, npm, JUnit, Swagger/OpenAPI, Lombok
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

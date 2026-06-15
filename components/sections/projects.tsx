'use client';

import { motion, useInView } from 'framer-motion';
import * as React from 'react';
import { ExternalLink, Github, Layers, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { FloatingTechIcons } from '@/components/ui-custom/floating-tech-icons';

const projects = [
  {
    id: 1,
    title: 'Flight Reservation System',
    description:
      'A comprehensive REST API for flight booking management with user authentication, reservation processing, and payment integration. Features complete JWT and OAuth2 security implementation.',
    longDescription:
      'Designed and implemented a complete REST API for flight management, user management, and secure authentication. Integrated Spring Security with JWT and OAuth2 for endpoint protection. Utilized DTOs and MapStruct for clean architecture separation.',
    technologies: ['Spring Boot', 'Spring Security', 'PostgreSQL', 'JWT', 'OAuth2', 'MapStruct', 'React', 'TypeScript'],
    architecture: 'Layered Architecture',
    highlights: ['JWT Authentication', 'OAuth2 Integration', 'DTO Pattern', 'Exception Handling'],
    github: 'https://github.com/DanielOrtiz08/ReservaDeVuelos',
    demo: null,
    featured: true,
    color: 'from-blue-600 to-cyan-500',
  },
  {
    id: 2,
    title: 'Professional Practices Management',
    subtitle: 'LinkedMag',
    description:
      'A full-stack system for managing university professional practices with role-based access control, document management, and progress tracking.',
    longDescription:
      'Full-stack application for managing professional internships at universities. Implemented JWT-based authentication, role-based authorization, and a complete Angular frontend.',
    technologies: ['Node.js', 'Express.js', 'PostgreSQL', 'Sequelize', 'JWT', 'Angular', 'TypeScript'],
    architecture: 'Multicapa Architecture',
    highlights: ['RBAC', 'Document Management', 'Progress Tracking', 'Email Notifications'],
    github: 'https://github.com/DanielOrtiz08/linked-mag-backend',
    demo: null,
    featured: true,
    color: 'from-emerald-600 to-green-500',
  },
  {
    id: 3,
    title: 'E-Commerce NoSQL',
    description:
      'A FastAPI-based e-commerce backend utilizing DynamoDB for flexible NoSQL storage and Redis caching for optimized query performance.',
    longDescription:
      'Modern e-commerce backend built with FastAPI, leveraging DynamoDB&apos;s flexible schema design and Redis for high-performance caching of frequent queries.',
    technologies: ['FastAPI', 'Python', 'DynamoDB', 'Redis', 'React'],
    architecture: 'Modular Architecture',
    highlights: ['NoSQL Persistence', 'Redis Caching', 'Async Operations', 'API Documentation'],
    github: 'https://github.com/IsAndresL/E-Commerce-NoSQL',
    demo: null,
    featured: true,
    color: 'from-orange-600 to-amber-500',
  },
  {
    id: 4,
    title: 'SupplyChain Hub',
    description:
      'Enterprise-grade logistics and supply chain platform built with Spring Cloud microservices.',
    longDescription:
      'Distributed logistics platform designed to demonstrate modern backend architecture patterns. The system uses independent microservices, event-driven communication, centralized configuration, service discovery, observability, authentication, caching, and cloud-native deployment practices.',
    technologies: [
      'Java 21',
      'Spring Boot',
      'Spring Cloud Gateway',
      'Eureka',
      'Config Server',
      'Keycloak',
      'Kafka',
      'RabbitMQ',
      'Redis',
      'PostgreSQL',
      'Docker',
      'Prometheus',
      'Grafana',
      'Azure'
    ],
    architecture: 'Microservices',
    highlights: [
      'Service Discovery',
      'API Gateway',
      'OAuth2 & OIDC',
      'Event-Driven Architecture',
      'Distributed Tracing',
      'Circuit Breaker',
      'Observability Stack',
      'CI/CD with Azure DevOps'
    ],
    github: 'https://github.com/DanielOrtiz08/SupplyChain-Hub',
    demo: null,
    featured: false,
    color: 'from-cyan-600 to-blue-600',
    comingSoon: true
  },
  {
    id: 5,
    title: 'Nearby',
    description:
      'University housing platform evolving into a social ecosystem for students.',
    longDescription:
      'Scalable platform initially focused on housing discovery near universities and designed to evolve into a social ecosystem that combines recommendations, student communities, local commerce, events, personalized advertising, gamification and intelligent matching between users.',
    technologies: [
      'Java 21',
      'Spring Boot',
      'PostgreSQL',
      'Redis',
      'Spring Security',
      'JWT',
      'OAuth2',
      'MapStruct',
      'Docker',
      'React',
      'Azure'
    ],
    architecture: 'Modular Monolith → Microservices',
    highlights: [
      'Recommendation System',
      'Social Features',
      'Gamification',
      'Advanced Search',
      'Personalized Advertising',
      'Scalable Domain Design',
      'Domain-Driven Design'
    ],
    github: 'https://github.com/DanielOrtiz08/Nearby',
    demo: null,
    featured: false,
    color: 'from-blue-700 to-sky-600',
    comingSoon: true
  },
  {
    id: 6,
    title: 'SecureCore',
    description:
      'Security-focused backend platform built with Spring Modulith and cloud security practices.',
    longDescription:
      'Backend system created to explore advanced security, modular architecture and secure cloud development. The project focuses on authentication, authorization, secrets management, auditing, secure communication and modular monolith design.',
    technologies: [
      'Java 21',
      'Spring Boot',
      'Spring Modulith',
      'Spring Security',
      'OAuth2',
      'JWT',
      'Keycloak',
      'Azure Key Vault',
      'PostgreSQL',
      'Docker',
      'JUnit 5',
      'Mockito',
      'Testcontainers'
    ],
    architecture: 'Modular Monolith',
    highlights: [
      'Spring Modulith',
      'Azure Key Vault',
      'RBAC',
      'Audit Logging',
      'Security Testing',
      'Module Boundaries',
      'Secure Configuration Management'
    ],
    github: 'https://github.com/DanielOrtiz08/SecureCore',
    demo: null,
    featured: false,
    color: 'from-emerald-600 to-teal-600',
    comingSoon: true
  }
];

export function ProjectsSection() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <FloatingTechIcons />

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
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
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A selection of projects showcasing backend architecture, cloud integration, and scalable system design
          </p>
        </motion.div>

        {/* Featured projects */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {projects
            .filter((p) => p.featured)
            .map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group relative"
              >
                <div className="glass rounded-2xl overflow-hidden card-hover h-full">
                  {/* Gradient accent */}
                  <div className={cn(
                    'h-2 w-full bg-gradient-to-r',
                    project.color
                  )} />

                  <div className="p-8">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                            {project.architecture}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold">{project.title}</h3>
                        {project.subtitle && (
                          <p className="text-sm text-muted-foreground">{project.subtitle}</p>
                        )}
                      </div>
                      <div className={cn(
                        'p-3 rounded-xl bg-gradient-to-br',
                        project.color,
                        'opacity-80 group-hover:opacity-100 transition-opacity'
                      )}>
                        <Layers className="h-5 w-5 text-white" />
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className="text-xs px-2 py-1 rounded-md bg-muted"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className="text-xs font-medium px-2 py-1 rounded-md border border-border/50"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 5 && (
                        <span className="text-xs px-2 py-1 text-muted-foreground">
                          +{project.technologies.length - 5} more
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      {project.github && (
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="gap-2"
                        >
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="h-4 w-4" />
                            Code
                          </a>
                        </Button>
                      )}
                      {project.demo && (
                        <Button
                          asChild
                          size="sm"
                          className="btn-gradient text-white gap-2"
                        >
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4" />
                            Demo
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>

        {/* Other projects */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects
            .filter((p) => !p.featured)
            .map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className={cn(
                  'group relative glass rounded-xl p-6 card-hover',
                  project.comingSoon && 'opacity-70'
                )}
              >
                {/* Coming soon badge */}
                {project.comingSoon && (
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-primary to-accent text-white text-xs font-medium px-2 py-1 rounded-full">
                    Coming Soon
                  </div>
                )}

                <div className="flex items-start gap-3 mb-3">
                  <div className={cn(
                    'w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br',
                    project.color,
                    'opacity-80'
                  )}>
                    <Layers className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{project.title}</h4>
                    <span className="text-xs text-muted-foreground">
                      {project.architecture}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-0.5 rounded bg-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {project.github && !project.comingSoon && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-4 right-4 p-2 rounded-lg bg-muted opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}

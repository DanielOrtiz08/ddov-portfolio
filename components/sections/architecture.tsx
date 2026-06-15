'use client';

import { motion, useInView } from 'framer-motion';
import * as React from 'react';
import {
  Server,
  Cloud,
  Shield,
  Database,
  ArrowRightLeft,
  Globe,
  Lock,
  Activity,
  Container,
  GitBranch,
  Layers,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { FloatingTechIcons } from '@/components/ui-custom/floating-tech-icons';

const architecturePatterns = [
  {
    name: 'Microservices',
    icon: Layers,
    description: 'Distributed systems with independent services',
    technologies: ['Spring Cloud', 'Consul', 'Eureka'],
    color: 'from-blue-500 to-cyan-400',
  },
  {
    name: 'API Gateway',
    icon: Globe,
    description: 'Single entry point for all client requests',
    technologies: ['Spring Cloud Gateway', 'Zuul'],
    color: 'from-sky-600 to-blue-500',
  },
  {
    name: 'Service Discovery',
    icon: GitBranch,
    description: 'Dynamic service registration and discovery',
    technologies: ['Eureka', 'Consul'],
    color: 'from-green-500 to-emerald-400',
  },
  {
    name: 'Config Server',
    icon: Server,
    description: 'Centralized configuration management',
    technologies: ['Spring Cloud Config'],
    color: 'from-orange-500 to-amber-400',
  },
];

const securityPatterns = [
  {
    name: 'OAuth2',
    icon: Lock,
    description: 'Authorization framework',
    color: 'from-blue-700 to-cyan-500',
  },
  {
    name: 'JWT',
    icon: Shield,
    description: 'Token-based authentication',
    color: 'from-red-500 to-rose-400',
  },
  {
    name: 'Keycloak',
    icon: Shield,
    description: 'Identity and access management',
    color: 'from-teal-500 to-cyan-400',
  },
  {
    name: 'RBAC',
    icon: Lock,
    description: 'Role-based access control',
    color: 'from-yellow-500 to-orange-400',
  },
];

const cloudServices = [
  {
    category: 'AWS',
    services: [
      { name: 'Lambda', icon: Zap },
      { name: 'AWS CDK', icon: Container },
      { name: 'DynamoDB', icon: Database },
    ],
  },
  {
    category: 'Azure',
    services: [
      { name: 'App Service', icon: Server },
      { name: 'SQL Database', icon: Database },
      { name: 'DevOps', icon: GitBranch },
      { name: 'Static Web Apps', icon: Cloud },
      { name: 'Pipelines', icon: ArrowRightLeft },
    ],
  },
];

const observabilityItems = [
  { name: 'Logging', icon: Activity },
  { name: 'Metrics', icon: Zap },
  { name: 'Tracing', icon: ArrowRightLeft },
  { name: 'Alerts', icon: Activity },
];

export function ArchitectureSection() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="architecture" className="py-24 relative overflow-hidden">
      <FloatingTechIcons />

      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-3xl" />
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
            Architecture & <span className="gradient-text">Cloud</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Building scalable, secure, and observable distributed systems
          </p>
        </motion.div>

        {/* Microservices Architecture Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass rounded-2xl p-8 mb-8"
        >
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Layers className="h-5 w-5 text-primary" />
            Architecture Patterns
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {architecturePatterns.map((pattern, index) => (
              <motion.div
                key={pattern.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="group relative bg-card rounded-xl p-5 hover:scale-105 transition-transform cursor-default"
              >
                <div className={cn(
                  'w-12 h-12 rounded-xl flex items-center justify-center mb-3 bg-gradient-to-br',
                  pattern.color
                )}>
                  <pattern.icon className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold">{pattern.name}</h4>
                <p className="text-xs text-muted-foreground mt-1">{pattern.description}</p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {pattern.technologies.map((tech) => (
                    <span key={tech} className="text-xs px-2 py-0.5 rounded bg-muted">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Grid layout for Security & Cloud */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Security */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass rounded-2xl p-8"
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Shield className="h-5 w-5 text-accent" />
              Security & Auth
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {securityPatterns.map((pattern, index) => (
                <motion.div
                  key={pattern.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-card hover:bg-muted transition-colors"
                >
                  <div className={cn(
                    'w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br',
                    pattern.color
                  )}>
                    <pattern.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{pattern.name}</h4>
                    <p className="text-xs text-muted-foreground">{pattern.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Observability */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="glass rounded-2xl p-8"
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Observability
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {observabilityItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-card hover:bg-muted transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-400">
                    <item.icon className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="font-medium text-sm">{item.name}</h4>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Cloud Services */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="glass rounded-2xl p-8 mt-8"
        >
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Cloud className="h-5 w-5 text-accent" />
            Cloud Services
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            {cloudServices.map((provider, providerIndex) => (
              <div key={provider.category}>
                <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-muted-foreground">
                  {provider.category}
                </h4>
                <div className="flex flex-wrap gap-3">
                  {provider.services.map((service, serviceIndex) => (
                    <motion.div
                      key={service.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: 0.7 + providerIndex * 0.1 + serviceIndex * 0.05 }}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card hover:bg-muted transition-colors"
                    >
                      <service.icon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{service.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Messaging */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="glass rounded-2xl p-8 mt-8"
        >
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <ArrowRightLeft className="h-5 w-5 text-primary" />
            Message Brokers
          </h3>

          <div className="flex gap-4">
            {['Kafka', 'RabbitMQ', 'Redis Pub/Sub'].map((broker, index) => (
              <motion.div
                key={broker}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                className="flex items-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-border/50"
              >
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="font-medium">{broker}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

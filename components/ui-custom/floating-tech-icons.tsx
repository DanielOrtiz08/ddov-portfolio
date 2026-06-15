'use client';

import { motion } from 'framer-motion';
import { Cloud, Code2, Database, Server, Shield, Terminal } from 'lucide-react';

const floatingIcons = [
  { icon: Server, className: 'top-[18%] left-[8%]', color: 'text-primary', delay: 0, duration: 5 },
  { icon: Cloud, className: 'top-[28%] right-[10%]', color: 'text-accent', delay: 0.4, duration: 6 },
  { icon: Terminal, className: 'bottom-[22%] left-[11%]', color: 'text-primary', delay: 0.8, duration: 7 },
  { icon: Code2, className: 'bottom-[32%] right-[7%]', color: 'text-accent', delay: 1.2, duration: 5.5 },
  { icon: Shield, className: 'top-[54%] left-[4%]', color: 'text-accent', delay: 1.6, duration: 6.5 },
  { icon: Database, className: 'top-[58%] right-[5%]', color: 'text-primary', delay: 2, duration: 6 },
];

export function FloatingTechIcons() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block" aria-hidden="true">
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          className={`absolute ${item.className}`}
          animate={{
            y: [0, index % 2 === 0 ? -18 : 18, 0],
            rotate: [0, index % 2 === 0 ? 8 : -8, 0],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: item.delay,
          }}
        >
          <div className="rounded-2xl border border-border/50 bg-background/55 p-4 shadow-lg shadow-primary/5 backdrop-blur-md">
            <item.icon className={`h-7 w-7 ${item.color}`} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

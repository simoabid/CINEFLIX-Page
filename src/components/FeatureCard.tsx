import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Sparkles,
  Layers,
  Search,
  Play,
  ListChecks,
  Users,
  Shield,
  Monitor,
  Wifi,
  type LucideIcon,
} from 'lucide-react';
import type { FeatureIcon } from '../config/site';
import { easeSnappy, fadeUp } from '../motion/variants';

const ICONS: Record<FeatureIcon, LucideIcon> = {
  sparkles: Sparkles,
  layers: Layers,
  search: Search,
  play: Play,
  list: ListChecks,
  users: Users,
  shield: Shield,
  monitor: Monitor,
  wifi: Wifi,
};

interface FeatureCardProps {
  icon: FeatureIcon;
  title: string;
  description: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => {
  const Icon = ICONS[icon];
  const reduced = useReducedMotion();

  return (
    <motion.article
      variants={reduced ? undefined : fadeUp}
      whileHover={
        reduced
          ? undefined
          : {
              y: -8,
              transition: easeSnappy,
            }
      }
      whileTap={reduced ? undefined : { scale: 0.985 }}
      className="relative bg-glass-card border border-glass-border rounded-xl p-6 sm:p-8 group h-full overflow-hidden will-change-transform"
    >
      {/* Hover glow wash */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            'radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%), rgba(255,30,39,0.12), transparent 40%)',
        }}
        aria-hidden="true"
      />
      <div
        className="relative"
        onMouseMove={(e) => {
          const el = e.currentTarget.parentElement as HTMLElement;
          if (!el) return;
          const r = el.getBoundingClientRect();
          el.style.setProperty('--mx', `${e.clientX - r.left}px`);
          el.style.setProperty('--my', `${e.clientY - r.top}px`);
        }}
      >
        <motion.div
          className="w-12 h-12 rounded-xl bg-accent-red/10 border border-accent-red/20 flex items-center justify-center text-accent-red mb-5"
          whileHover={reduced ? undefined : { scale: 1.12, rotate: -4 }}
          transition={easeSnappy}
        >
          <Icon className="w-5 h-5" aria-hidden="true" strokeWidth={2} />
        </motion.div>
        <h3 className="text-lg font-bold font-display mb-2 text-white group-hover:text-white transition-colors">
          {title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
          {description}
        </p>
      </div>
      <div
        className="absolute inset-0 rounded-xl border border-transparent group-hover:border-glass-border-hover pointer-events-none transition-colors duration-300 shadow-none group-hover:shadow-glow"
        aria-hidden="true"
      />
    </motion.article>
  );
};

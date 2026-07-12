import React from 'react';
import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion';
import {
  fadeUp,
  fadeIn,
  scaleIn,
  slideInLeft,
  slideInRight,
  staggerContainer,
  staggerFast,
} from '../../motion/variants';

const PRESETS = {
  fadeUp,
  fadeIn,
  scaleIn,
  slideInLeft,
  slideInRight,
  stagger: staggerContainer,
  staggerFast,
} as const;

type Preset = keyof typeof PRESETS;

type RevealProps = {
  children: React.ReactNode;
  preset?: Preset;
  className?: string;
  delay?: number;
  as?: keyof typeof motion;
  once?: boolean;
  amount?: number;
} & Omit<HTMLMotionProps<'div'>, 'children' | 'variants'>;

export const Reveal: React.FC<RevealProps> = ({
  children,
  preset = 'fadeUp',
  className,
  delay = 0,
  once = true,
  amount = 0.2,
  ...rest
}) => {
  const reduced = useReducedMotion();
  const variants = PRESETS[preset];

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount, margin: '0px 0px -8% 0px' }}
      transition={delay ? { delay } : undefined}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

/** Stagger parent — children should use RevealItem */
export const RevealGroup: React.FC<{
  children: React.ReactNode;
  className?: string;
  fast?: boolean;
}> = ({ children, className, fast }) => {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={fast ? staggerFast : staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </motion.div>
  );
};

export const RevealItem: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div className={className} variants={fadeUp}>
      {children}
    </motion.div>
  );
};

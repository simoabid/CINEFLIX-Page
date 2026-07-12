import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type FloatingProps = {
  children: React.ReactNode;
  className?: string;
  /** Amplitude in px */
  y?: number;
  duration?: number;
  delay?: number;
};

/** Gentle continuous float — for hero mockups / ornaments. */
export const Floating: React.FC<FloatingProps> = ({
  children,
  className,
  y = 10,
  duration = 4.5,
  delay = 0,
}) => {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      animate={{ y: [0, -y, 0] }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
};

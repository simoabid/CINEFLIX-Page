import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { fadeUp, easeOutExpo } from '../motion/variants';

interface SectionHeadingProps {
  badge: string;
  title: React.ReactNode;
  description?: string;
  align?: 'center' | 'left';
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  description,
  align = 'center',
}) => {
  const reduced = useReducedMotion();
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-start';

  const body = (
    <>
      <motion.span
        variants={reduced ? undefined : fadeUp}
        className="inline-block bg-accent-red/10 border border-accent-red/20 text-accent-red px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider"
      >
        {badge}
      </motion.span>
      <motion.h2
        variants={reduced ? undefined : fadeUp}
        className="text-3xl sm:text-4xl font-bold font-display mt-4 mb-3 text-white"
      >
        {title}
      </motion.h2>
      {description ? (
        <motion.p
          variants={reduced ? undefined : fadeUp}
          className="text-gray-400 text-sm sm:text-base leading-relaxed"
        >
          {description}
        </motion.p>
      ) : null}
    </>
  );

  if (reduced) {
    return <div className={`mb-12 sm:mb-16 max-w-[68ch] ${alignClass}`}>{body}</div>;
  }

  return (
    <motion.div
      className={`mb-12 sm:mb-16 max-w-[68ch] ${alignClass}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.1, delayChildren: 0.05 },
        },
      }}
      transition={easeOutExpo}
    >
      {body}
    </motion.div>
  );
};

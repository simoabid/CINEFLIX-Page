import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type TextRevealProps = {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  delay?: number;
};

/**
 * Word-by-word stagger entrance for headlines.
 */
export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  className,
  as: Tag = 'span',
  delay = 0,
}) => {
  const reduced = useReducedMotion();
  const words = text.split(/(\s+)/);

  if (reduced) {
    const Comp = Tag;
    return <Comp className={className}>{text}</Comp>;
  }

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden="true"
        className="inline"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.04, delayChildren: delay },
          },
        }}
      >
        {words.map((word, i) =>
          /^\s+$/.test(word) ? (
            <span key={`s-${i}`}>{word}</span>
          ) : (
            <span key={`w-${i}`} className="inline-block overflow-hidden align-bottom">
              <motion.span
                className="inline-block"
                variants={{
                  hidden: { y: '110%', opacity: 0 },
                  visible: {
                    y: 0,
                    opacity: 1,
                    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
              >
                {word}
              </motion.span>
            </span>
          ),
        )}
      </motion.span>
    </Tag>
  );
};

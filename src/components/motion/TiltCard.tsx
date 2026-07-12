import React, { useRef } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from 'framer-motion';

type TiltCardProps = {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glare?: boolean;
};

/**
 * 3D perspective tilt on hover with optional light glare.
 */
export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className,
  maxTilt = 8,
  glare = true,
}) => {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  const springRX = useSpring(rotateX, { stiffness: 220, damping: 18 });
  const springRY = useSpring(rotateY, { stiffness: 220, damping: 18 });
  const glareBg = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.14), transparent 55%)`;

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateX.set((0.5 - py) * maxTilt * 2);
    rotateY.set((px - 0.5) * maxTilt * 2);
    glareX.set(px * 100);
    glareY.set(py * 100);
  };

  const onLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    glareX.set(50);
    glareY.set(50);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative ${className ?? ''}`}
      style={{
        rotateX: springRX,
        rotateY: springRY,
        transformStyle: 'preserve-3d',
        transformPerspective: 900,
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ z: 8 }}
    >
      {children}
      {glare ? (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: glareBg, borderRadius: 'inherit' }}
          aria-hidden="true"
        />
      ) : null}
    </motion.div>
  );
};

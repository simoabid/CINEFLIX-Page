import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export type ProductFrameSize = 'hero' | 'feature' | 'showcase';

/**
 * Laptop PNG is 1536×1024.
 * Screen hole re-measured from the updated computer_frame.png
 * (transparent gap between side bezels): x=235–1298, y=165–766.
 */
export const LAPTOP_ASPECT = 'aspect-[1536/1024]';

/**
 * Display area inside computer_frame.png (percent of full asset).
 * Recalibrated after the larger laptop asset update.
 */
export const SCREEN_INSET = {
  top: '16.11%',
  left: '15.30%',
  width: '69.27%',
  height: '58.79%',
} as const;


/** @deprecated kept for older imports */
export const SCREENSHOT_ASPECT = 'aspect-[1905/962]';

interface ProductFrameProps {
  src?: string;
  alt?: string;
  children?: React.ReactNode;
  size?: ProductFrameSize;
  stage?: boolean;
  tilt?: boolean;
  className?: string;
  urlLabel?: string;
  loading?: 'eager' | 'lazy';
}

/**
 * MacBook frame using public/computer_frame.png.
 * Screenshots sit in the measured transparent display hole under the bezel layer.
 */
export const ProductFrame: React.FC<ProductFrameProps> = ({
  src,
  alt = '',
  children,
  size = 'feature',
  stage = true,
  tilt = false,
  className = '',
  loading = 'lazy',
}) => {
  const reduced = useReducedMotion();

  return (
    <div className={`relative w-full ${className}`}>
      {stage ? (
        <div className="absolute inset-0 pointer-events-none overflow-visible" aria-hidden="true">
          <motion.div
            className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 w-[110%] h-[90%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(88,28,135,0.28)_0%,rgba(255,30,39,0.08)_40%,transparent_70%)] blur-2xl"
            animate={
              reduced ? undefined : { scale: [1, 1.05, 1], opacity: [0.65, 0.95, 0.65] }
            }
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="absolute left-1/2 bottom-[8%] -translate-x-1/2 w-[70%] h-[18%] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.55)_0%,transparent_70%)] blur-xl" />
        </div>
      ) : null}

      <motion.div
        className={[
          'relative z-10 w-full',
          tilt ? 'lg:[transform:perspective(1600px)_rotateY(-4deg)_rotateX(1.5deg)]' : '',
        ].join(' ')}
        whileHover={
          reduced
            ? undefined
            : tilt
              ? { rotateY: -1.5, rotateX: 0.5, scale: 1.01 }
              : { y: -6, scale: 1.01 }
        }
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        {/*
          Forced laptop aspect so % insets map 1:1 to the PNG.
          Frame uses object-fill (not contain) so it never letterboxes.
        */}
        <div className={`relative w-full ${LAPTOP_ASPECT}`}>
          {/* Screen content — clipped to measured glass area */}
          <div
            className="absolute z-0 overflow-hidden bg-[#0a0a12]"
            style={{
              top: SCREEN_INSET.top,
              left: SCREEN_INSET.left,
              width: SCREEN_INSET.width,
              height: SCREEN_INSET.height,
              // Soft clip to match slightly rounded display corners
              borderRadius: size === 'showcase' ? '0.45%' : '0.35%',
            }}
          >
            {children ? (
              children
            ) : src ? (
              <img
                src={src}
                alt={alt}
                className="absolute inset-0 w-full h-full object-cover object-center"
                loading={loading}
                decoding="async"
              />
            ) : null}
          </div>

          {/* Device chrome on top — fill box exactly (no letterboxing) */}
          <img
            src="/computer_frame.png"
            alt=""
            className="absolute inset-0 z-10 w-full h-full object-fill pointer-events-none select-none drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)]"
            draggable={false}
            decoding="async"
            loading={loading === 'eager' ? 'eager' : 'lazy'}
          />
        </div>

        <div
          className="absolute -bottom-2 left-[12%] right-[12%] h-6 sm:h-8 bg-black/50 blur-2xl rounded-full opacity-60 pointer-events-none"
          aria-hidden="true"
        />
      </motion.div>
    </div>
  );
};

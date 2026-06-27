import { useEffect, useRef } from 'react';

export function HeroGlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const glow1Ref = useRef<HTMLDivElement>(null);
  const glow2Ref = useRef<HTMLDivElement>(null);
  const glow3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    const glow1 = glow1Ref.current;
    const glow2 = glow2Ref.current;
    const glow3 = glow3Ref.current;
    if (!container || !glow1 || !glow2 || !glow3) return;

    let mouseX = 0; // -0.5 to 0.5
    let mouseY = 0; // -0.5 to 0.5
    let scrollY = 0;

    let targetGlow1X = 0, targetGlow1Y = 0;
    let targetGlow2X = 0, targetGlow2Y = 0;
    let targetGlow3X = 0, targetGlow3Y = 0;

    let currentGlow1X = 0, currentGlow1Y = 0;
    let currentGlow2X = 0, currentGlow2Y = 0;
    let currentGlow3X = 0, currentGlow3Y = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      // Normalize mouse positions between -0.5 and 0.5
      mouseX = (e.clientX - rect.left) / rect.width - 0.5;
      mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    };

    const onScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    let animId: number;

    const tick = () => {
      // Target translations based on formulas
      targetGlow1X = mouseX * 20;
      targetGlow1Y = mouseY * 20 + scrollY * -0.04;

      targetGlow2X = mouseX * 40;
      targetGlow2Y = mouseY * 40 + scrollY * -0.08;

      targetGlow3X = mouseX * 60;
      targetGlow3Y = mouseY * 60 + scrollY * -0.12;

      // Smooth interpolation (spring lag)
      currentGlow1X += (targetGlow1X - currentGlow1X) * 0.1;
      currentGlow1Y += (targetGlow1Y - currentGlow1Y) * 0.1;

      currentGlow2X += (targetGlow2X - currentGlow2X) * 0.1;
      currentGlow2Y += (targetGlow2Y - currentGlow2Y) * 0.1;

      currentGlow3X += (targetGlow3X - currentGlow3X) * 0.1;
      currentGlow3Y += (targetGlow3Y - currentGlow3Y) * 0.1;

      // Apply transforms
      glow1.style.transform = `translate3d(${currentGlow1X}px, ${currentGlow1Y}px, 0)`;
      glow2.style.transform = `translate3d(${currentGlow2X}px, ${currentGlow2Y}px, 0)`;
      glow3.style.transform = `translate3d(${currentGlow3X}px, ${currentGlow3Y}px, 0)`;

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div
        ref={glow1Ref}
        className="absolute w-[600px] h-[600px] bg-accent-red rounded-full blur-[120px] opacity-15 -top-[200px] -right-[100px] pointer-events-none animate-glow-drift-1"
      />
      <div
        ref={glow2Ref}
        className="absolute w-[400px] h-[400px] bg-accent-red/80 rounded-full blur-[120px] opacity-10 -bottom-[100px] -left-[100px] pointer-events-none animate-glow-drift-2"
      />
      <div
        ref={glow3Ref}
        className="absolute w-[300px] h-[300px] bg-accent-red/60 rounded-full blur-[120px] opacity-8 top-[50%] left-[40%] pointer-events-none animate-glow-drift-3"
      />
      <div
        className="absolute w-[500px] h-[500px] bg-accent-red rounded-full blur-[120px] opacity-[0.12] top-[15%] -left-[200px] pointer-events-none animate-glow-drift-2"
      />
      <div
        className="absolute w-[450px] h-[450px] bg-accent-red/90 rounded-full blur-[120px] opacity-[0.10] top-[30%] -right-[150px] pointer-events-none animate-glow-drift-3"
      />
      <div
        className="absolute w-[350px] h-[350px] bg-accent-red/70 rounded-full blur-[125px] opacity-[0.08] top-[42%] -left-[100px] pointer-events-none animate-glow-drift-1"
      />
      <div
        className="absolute w-[600px] h-[600px] bg-accent-red rounded-full blur-[130px] opacity-[0.12] top-[65%] -right-[200px] pointer-events-none animate-glow-drift-2"
      />
      <div
        className="absolute w-[400px] h-[400px] bg-accent-red/80 rounded-full blur-[120px] opacity-[0.09] top-[78%] -left-[150px] pointer-events-none animate-glow-drift-3"
      />
      <div
        className="absolute w-[550px] h-[550px] bg-accent-red/90 rounded-full blur-[120px] opacity-[0.11] top-[90%] -right-[150px] pointer-events-none animate-glow-drift-1"
      />
    </div>
  );
}

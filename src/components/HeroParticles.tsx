import { useEffect, useRef } from 'react';

export function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    // Keep particle count low — Lenis + motion already cost frames
    const particleCount = window.innerWidth < 768 ? 10 : 22;
    const particles: Particle[] = [];


    const handleResize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    class Particle {
      x: number = 0;
      y: number = 0;
      size: number = 0;
      speedX: number = 0;
      speedY: number = 0;
      baseOpacity: number = 0;
      pulse: number = 0;
      pulseSpeed: number = 0;
      canvas: HTMLCanvasElement;

      constructor(canvasElement: HTMLCanvasElement) {
        this.canvas = canvasElement;
        this.reset();
        // Stagger initial coordinates
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
      }

      reset() {
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.baseOpacity = Math.random() * 0.3 + 0.1;
        this.pulse = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.pulse += this.pulseSpeed;

        // Reset if out of bounds
        if (this.x < 0 || this.x > this.canvas.width || this.y < 0 || this.y > this.canvas.height) {
          this.reset();
        }
      }

      draw(cContext: CanvasRenderingContext2D) {
        const currentOpacity = this.baseOpacity + Math.sin(this.pulse) * 0.1;
        cContext.beginPath();
        cContext.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        cContext.fillStyle = `rgba(255, 30, 39, ${Math.max(0.02, currentOpacity)})`;
        cContext.fill();
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas));
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });

      // Skip O(n²) connection lines — too expensive with Lenis + Framer
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}

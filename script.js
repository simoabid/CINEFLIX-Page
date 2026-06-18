// CINEFLIX Landing Page — Premium Animations
// Following Emil Kowalski's design engineering philosophy

document.addEventListener('DOMContentLoaded', () => {

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(hover: none)').matches;

  // ===== SMOOTH SCROLL =====
  // CSS scroll-behavior: smooth handles anchor links natively.
  // For wheel scrolling, we use a lightweight overscroll approach:
  // let the browser scroll natively, then add momentum after release.

  // ===== SCROLL PROGRESS BAR =====
  const scrollProgress = document.getElementById('scrollProgress');
  const updateScrollProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = `${progress}%`;
  };
  window.addEventListener('scroll', updateScrollProgress, { passive: true });

  // ===== CUSTOM CURSOR — spring-like lag =====
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    const animateCursorRing = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;
      requestAnimationFrame(animateCursorRing);
    };
    animateCursorRing();

    const hoverTargets = document.querySelectorAll('a, button, .feature-card, .content-card, .pricing-card, .testimonial-card');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorDot.classList.add('hovering');
        cursorRing.classList.add('hovering');
      });
      el.addEventListener('mouseleave', () => {
        cursorDot.classList.remove('hovering');
        cursorRing.classList.remove('hovering');
      });
    });
  }

  // ===== HERO PARTICLES =====
  const canvas = document.getElementById('heroParticles');
  if (canvas && !prefersReducedMotion) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 40;

    const resizeCanvas = () => {
      const hero = document.getElementById('hero');
      canvas.width = hero.offsetWidth;
      canvas.height = hero.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.3 + 0.1;
        this.pulse = Math.random() * Math.PI * 2;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.pulse += 0.02;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
          this.reset();
        }
      }
      draw() {
        const currentOpacity = this.opacity + Math.sin(this.pulse) * 0.1;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(229, 9, 20, ${Math.max(0, currentOpacity)})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(229, 9, 20, ${0.05 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animateParticles);
    };
    animateParticles();
  }

  // ===== HERO ENTRANCE ORCHESTRATION =====
  // Staggered entrance with 80ms delays between elements
  const heroElements = [
    '.hero-badge', '.hero-text h1', '.hero-subtitle',
    '.hero-ctas', '.hero-stats', '.phone-mockup'
  ];
  heroElements.forEach((selector, i) => {
    const el = document.querySelector(selector);
    if (el) {
      setTimeout(() => el.classList.add('animate-in'), 200 + i * 80);
    }
  });

  // Phone floating animation after entrance completes
  setTimeout(() => {
    const phone = document.querySelector('.phone-mockup');
    if (phone && !prefersReducedMotion) {
      phone.classList.add('float');
    }
  }, 1400);

  // ===== HERO GLOW PARALLAX (mouse + scroll combined) =====
  const hero = document.getElementById('hero');
  const glows = document.querySelectorAll('.hero-glow');
  let glowMouseX = 0, glowMouseY = 0;
  let glowScrollY = 0;

  if (hero && !prefersReducedMotion) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      glowMouseX = (e.clientX - rect.left) / rect.width - 0.5;
      glowMouseY = (e.clientY - rect.top) / rect.height - 0.5;
    });

    const animateGlows = () => {
      glows.forEach((glow, i) => {
        const speed = (i + 1) * 20;
        const scrollSpeed = (i + 1) * 0.04;
        const mx = glowMouseX * speed;
        const my = glowMouseY * speed + glowScrollY * scrollSpeed;
        glow.style.transform = `translate(${mx}px, ${my}px)`;
      });
      requestAnimationFrame(animateGlows);
    };
    animateGlows();

    window.addEventListener('scroll', () => {
      glowScrollY = window.scrollY;
    }, { passive: true });
  }

  // ===== NAV SCROLL =====
  const nav = document.getElementById('nav');
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ===== MOBILE MENU =====
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  window.closeMenu = () => {
    navToggle.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  };

  // ===== INTERSECTION OBSERVER — staggered clip-path reveals =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = parseInt(el.dataset.delay) || 0;
        setTimeout(() => {
          el.classList.add('animate-in');
        }, delay);
        observer.unobserve(el);
      }
    });
  }, observerOptions);

  // Observe section headers
  document.querySelectorAll('.section-tag, .section-header h2, .section-desc').forEach(el => {
    observer.observe(el);
  });

  // Observe feature cards with stagger (60ms between items)
  document.querySelectorAll('.feature-card').forEach((el, i) => {
    el.dataset.delay = i * 60;
    observer.observe(el);
  });

  // Observe screenshot items with stagger
  document.querySelectorAll('.screenshot-item').forEach((el, i) => {
    el.dataset.delay = i * 100;
    observer.observe(el);
  });

  // Observe steps with stagger
  document.querySelectorAll('.step').forEach((el, i) => {
    el.dataset.delay = i * 100;
    observer.observe(el);
  });

  // Observe tech cards with stagger (50ms between items)
  document.querySelectorAll('.tech-card').forEach((el, i) => {
    el.dataset.delay = i * 50;
    observer.observe(el);
  });
  document.querySelectorAll('.tech-stat').forEach((el, i) => {
    el.dataset.delay = i * 60;
    observer.observe(el);
  });

  // Observe pricing cards with stagger
  document.querySelectorAll('.pricing-card').forEach((el, i) => {
    el.dataset.delay = i * 80;
    observer.observe(el);
  });

  // Observe testimonial cards with stagger
  document.querySelectorAll('.testimonial-card').forEach((el, i) => {
    el.dataset.delay = i * 60;
    observer.observe(el);
  });

  // Observe CTA card
  document.querySelectorAll('.cta-card').forEach(el => {
    observer.observe(el);
  });

  // Observe developer card
  document.querySelectorAll('.developer-card').forEach(el => {
    observer.observe(el);
  });

  // Observe support card
  document.querySelectorAll('.support-card').forEach(el => {
    observer.observe(el);
  });

  // Observe FAQ items with stagger
  document.querySelectorAll('.faq-item').forEach((el, i) => {
    el.dataset.delay = i * 60;
    observer.observe(el);
  });

  // Observe video card
  document.querySelectorAll('.video-card').forEach(el => {
    observer.observe(el);
  });

  // ===== ANIMATED COUNTERS — easeOutExpo =====
  const counters = document.querySelectorAll('.stat-num[data-target]');
  let countersAnimated = false;

  const animateCounters = () => {
    if (countersAnimated) return;
    countersAnimated = true;

    counters.forEach((counter, i) => {
      const target = parseFloat(counter.dataset.target);
      const decimals = parseInt(counter.dataset.decimals) || 0;
      const suffix = counter.dataset.suffix || '';
      const format = counter.dataset.format;
      const duration = 2000;
      const start = performance.now();

      const easeOutExpo = (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

      setTimeout(() => {
        const updateCounter = (now) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = easeOutExpo(progress);
          let current = eased * target;

          if (format === 'short') {
            if (current >= 1000000) {
              counter.textContent = (current / 1000000).toFixed(0) + 'M' + suffix;
            } else if (current >= 1000) {
              counter.textContent = (current / 1000).toFixed(0) + 'K' + suffix;
            } else {
              counter.textContent = Math.floor(current) + suffix;
            }
          } else {
            counter.textContent = current.toFixed(decimals) + suffix;
          }

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            if (format === 'short') {
              if (target >= 1000000) {
                counter.textContent = (target / 1000000).toFixed(0) + 'M' + suffix;
              } else if (target >= 1000) {
                counter.textContent = (target / 1000).toFixed(0) + 'K' + suffix;
              } else {
                counter.textContent = target + suffix;
              }
            } else {
              counter.textContent = target.toFixed(decimals) + suffix;
            }
          }
        };
        requestAnimationFrame(updateCounter);
      }, i * 100);
    });
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.hero-stats');
  if (statsSection) {
    statsObserver.observe(statsSection);
  }

  // ===== 3D TILT ON CARDS =====
  const tiltCards = document.querySelectorAll('.tilt-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / centerY * -6;
      const rotateY = (x - centerX) / centerX * 6;
      card.style.setProperty('--rotate-x', `${rotateX}deg`);
      card.style.setProperty('--rotate-y', `${rotateY}deg`);
    });
    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--rotate-x', '0deg');
      card.style.setProperty('--rotate-y', '0deg');
    });
  });

  // ===== MAGNETIC BUTTONS — spring-interpolated =====
  const magneticBtns = document.querySelectorAll('.magnetic-btn');
  magneticBtns.forEach(btn => {
    let currentX = 0, currentY = 0;
    let targetX = 0, targetY = 0;

    const animateMagnetic = () => {
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;
      btn.style.transform = `translate(${currentX}px, ${currentY}px)`;
      if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
        requestAnimationFrame(animateMagnetic);
      }
    };

    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      targetX = (e.clientX - rect.left - rect.width / 2) * 0.2;
      targetY = (e.clientY - rect.top - rect.height / 2) * 0.2;
      requestAnimationFrame(animateMagnetic);
    });
    btn.addEventListener('mouseleave', () => {
      targetX = 0;
      targetY = 0;
      requestAnimationFrame(animateMagnetic);
    });
  });

  // ===== BUTTON RIPPLE EFFECT =====
  const addRipple = (e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  };
  document.querySelectorAll('.btn, .tab').forEach(btn => {
    btn.addEventListener('click', addRipple);
  });

  // ===== PRICING TOGGLE WITH ANIMATION =====
  const pricingToggle = document.getElementById('pricingToggle');
  const monthlyLabel = document.getElementById('monthlyLabel');
  const annualLabel = document.getElementById('annualLabel');
  const priceAmounts = document.querySelectorAll('.price-amount[data-monthly]');
  let isAnnual = false;

  pricingToggle.addEventListener('click', () => {
    isAnnual = !isAnnual;
    pricingToggle.classList.toggle('active', isAnnual);
    monthlyLabel.classList.toggle('active', !isAnnual);
    annualLabel.classList.toggle('active', isAnnual);

    priceAmounts.forEach(el => {
      el.classList.add('changing');
      setTimeout(() => {
        const price = isAnnual ? el.dataset.annual : el.dataset.monthly;
        el.textContent = `$${price}`;
        el.classList.remove('changing');
      }, 200);
    });
  });

  // ===== SMOOTH ANCHOR SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = nav.offsetHeight + 20;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ===== SCROLL-BASED HERO FADE =====
  if (!prefersReducedMotion) {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      const updateHeroFade = () => {
        const scrollY = window.scrollY;
        const heroHeight = hero.offsetHeight;
        const fadeStart = heroHeight * 0.3;
        const fadeEnd = heroHeight * 0.7;
        const opacity = 1 - Math.max(0, Math.min(1, (scrollY - fadeStart) / (fadeEnd - fadeStart)));
        const translateY = scrollY * 0.15;
        heroContent.style.opacity = opacity;
        heroContent.style.transform = `translateY(${translateY}px)`;
      };
      window.addEventListener('scroll', updateHeroFade, { passive: true });
    }
  }

  // ===== SOCIAL PROOF COUNTER — slow auto-increment =====
  const downloadCountEl = document.getElementById('downloadCount');
  if (downloadCountEl) {
    let downloadCount = 12847;
    const incrementCounter = () => {
      downloadCount += 1;
      downloadCountEl.textContent = downloadCount.toLocaleString();
      const nextDelay = 3000 + Math.random() * 4000;
      setTimeout(incrementCounter, nextDelay);
    };
    setTimeout(incrementCounter, 5000);
  }

  // ===== VIDEO CARD — animate on scroll =====
  const videoCard = document.querySelector('.video-card');
  if (videoCard) {
    if (prefersReducedMotion) {
      videoCard.style.opacity = '1';
      videoCard.style.transform = 'translateY(0)';
    } else {
      videoCard.style.opacity = '0';
      videoCard.style.transform = 'translateY(24px)';
      const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            videoCard.style.transition = 'opacity 0.7s var(--ease-snappy), transform 0.7s var(--ease-snappy)';
            videoCard.style.opacity = '1';
            videoCard.style.transform = 'translateY(0)';
            videoObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
      videoObserver.observe(videoCard);
    }
  }

  // ===== SCROLL-DRIVEN PHONE MOCKUP =====
  const phoneSlides = document.querySelectorAll('.phone-screen-slide');
  const scrollSections = document.querySelectorAll('[data-phone-section]');

  if (phoneSlides.length && scrollSections.length) {
    const phoneObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.dataset.phoneSection;
          phoneSlides.forEach(slide => {
            slide.classList.toggle('active', slide.dataset.section === sectionId);
          });
        }
      });
    }, { threshold: 0.3 });

    scrollSections.forEach(section => {
      phoneObserver.observe(section);
    });
  }

});

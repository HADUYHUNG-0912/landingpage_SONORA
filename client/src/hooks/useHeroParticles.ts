import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
  maxOpacity: number;
  life: number;
  maxLife: number;
  twinkleSpeed: number;
  twinklePhase: number;
  oscillationSpeed: number;
  oscillationAmp: number;
}

export function useHeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) return;

    let width = 0;
    let height = 0;
    let particleCount = 0;

    const colors = [
      'rgba(255, 255, 255, 1)',   // Soft white
      'rgba(240, 230, 255, 1)',   // Pale violet
      'rgba(162, 141, 255, 1)',   // Violet
      'rgba(121, 233, 246, 1)'    // Cyan
    ];

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      particleCount = window.innerWidth > 840 ? 45 : 20;
      initParticles();
    };

    const spawnParticle = (isInitial = false): Particle => {
      const startX = isInitial ? Math.random() * width : (Math.random() * 0.4 + 0.1) * width;
      const startY = isInitial ? Math.random() * height : (Math.random() * 0.5 + 0.4) * height;

      const colorRoll = Math.random();
      let color = colors[0];
      if (colorRoll > 0.6) color = colors[1];
      if (colorRoll > 0.85) color = colors[2];
      if (colorRoll > 0.95) color = colors[3];

      const sizeRoll = Math.random();
      const size = sizeRoll > 0.95 ? (Math.random() * 1.5 + 2) : 
                   sizeRoll > 0.8 ? (Math.random() * 1 + 1.5) : 
                   (Math.random() * 1 + 0.5);

      const vx = Math.random() * 0.3 + 0.1;
      const vy = (Math.random() * -0.2) - 0.05;

      return {
        x: startX,
        y: startY,
        vx: vx,
        vy: vy,
        size: size,
        color: color,
        opacity: 0,
        maxOpacity: Math.random() * 0.5 + 0.2,
        life: 0,
        maxLife: Math.random() * 400 + 300,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
        oscillationSpeed: Math.random() * 0.02 + 0.01,
        oscillationAmp: Math.random() * 0.3 + 0.1,
      };
    };

    const initParticles = () => {
      particlesRef.current = Array.from({ length: particleCount }, () => spawnParticle(true));
    };

    const draw = () => {
      if (!isVisibleRef.current) {
        animationRef.current = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      particlesRef.current.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy + Math.sin(p.life * p.oscillationSpeed) * p.oscillationAmp;
        p.life++;

        let lifeProgress = p.life / p.maxLife;
        let fadeOpacity = 1;
        if (lifeProgress < 0.1) {
          fadeOpacity = lifeProgress / 0.1;
        } else if (lifeProgress > 0.9) {
          fadeOpacity = (1 - lifeProgress) / 0.1;
        }

        const twinkle = (Math.sin(p.life * p.twinkleSpeed + p.twinklePhase) + 1) / 2;
        p.opacity = p.maxOpacity * fadeOpacity * (0.4 + twinkle * 0.6);

        if (p.life >= p.maxLife || p.x > width || p.y < 0) {
          particlesRef.current[i] = spawnParticle();
        }

        ctx.beginPath();
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        const rgbMatch = p.color.match(/rgba\((\d+),\s*(\d+),\s*(\d+)/);
        if (rgbMatch) {
          const [, r, g, b] = rgbMatch;
          gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${p.opacity})`);
          gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${p.opacity * 0.3})`);
          gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        } else {
          gradient.addColorStop(0, p.color);
          gradient.addColorStop(1, 'transparent');
        }

        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(draw);
    };

    const observer = new IntersectionObserver((entries) => {
      isVisibleRef.current = entries[0].isIntersecting;
    }, { threshold: 0 });
    observer.observe(canvas);

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationRef.current);
      observer.disconnect();
    };
  }, []);

  return canvasRef;
}

import { useEffect, useRef } from "react";
import { useLowPowerMode } from "../../hooks/usePerformance";

interface ParticleFieldProps {
  /** Color base de las partículas, en formato "r,g,b" */
  colorRgb?: string;
  /** Densidad base (partículas por cada 20.000 px^2 aprox.) */
  density?: number;
  /** Velocidad vertical de deriva */
  drift?: number;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  r: number;
  vy: number;
  vx: number;
  alpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

/**
 * Fondo de partículas ambientales en canvas. Deliberadamente sutil:
 * no debe competir con el contenido. Se adapta a low-power/reduced
 * motion reduciendo densidad y deteniendo el movimiento.
 */
export function ParticleField({
  colorRgb = "185,166,255",
  density = 1,
  drift = 6,
  className = "",
}: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lowPower = useLowPowerMode();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let raf = 0;
    let running = true;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      const parent = canvas!.parentElement;
      width = parent ? parent.clientWidth : window.innerWidth;
      height = parent ? parent.clientHeight : window.innerHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const area = width * height;
      const baseCount = Math.round((area / 20000) * density * (lowPower ? 0.35 : 1));
      const count = Math.max(8, Math.min(baseCount, lowPower ? 40 : 140));

      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.6 + 0.4,
        vy: (Math.random() * 0.5 + 0.1) * (drift / 6),
        vx: (Math.random() - 0.5) * 0.15,
        alpha: Math.random() * 0.5 + 0.15,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
      }));
    }

    function tick() {
      if (!running) return;
      ctx!.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.y -= p.vy;
        p.x += p.vx;
        p.twinklePhase += p.twinkleSpeed;
        if (p.y < -10) p.y = height + 10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const twinkle = (Math.sin(p.twinklePhase) + 1) / 2;
        const a = p.alpha * (0.5 + twinkle * 0.5);

        ctx!.beginPath();
        ctx!.fillStyle = `rgba(${colorRgb},${a})`;
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fill();
      }
      raf = requestAnimationFrame(tick);
    }

    resize();
    tick();

    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const onVisibility = () => {
      running = document.visibilityState === "visible";
      if (running) raf = requestAnimationFrame(tick);
      else cancelAnimationFrame(raf);
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [colorRgb, density, drift, lowPower]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
    />
  );
}

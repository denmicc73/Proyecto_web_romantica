import { useEffect, useRef } from "react";

/**
 * Cursor personalizado: un punto luminoso violeta que sigue al ratón
 * con un pequeño retardo (lerp) y crece sobre elementos interactivos.
 * Se desactiva por completo en touch/móvil (el CSS global también lo
 * neutraliza vía media query hover:hover + pointer:fine).
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const scaleRef = useRef(1);
  const targetScaleRef = useRef(1);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isFinePointer) return;

    document.body.classList.add("custom-cursor-active");

    const onMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest?.(
        "a, button, [data-cursor-interactive]"
      );
      targetScaleRef.current = el ? 2.4 : 1;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });

    let raf = 0;
    const animate = () => {
      posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.22;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.22;
      scaleRef.current += (targetScaleRef.current - scaleRef.current) * 0.18;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0) translate(-50%, -50%) scale(${scaleRef.current})`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-3 w-3 rounded-full [@media(hover:hover)_and_(pointer:fine)]:block"
      style={{
        background: "var(--color-violet-glow)",
        boxShadow: "0 0 16px 4px rgba(124,92,255,0.55)",
        transition: "background 0.3s ease",
        willChange: "transform",
      }}
    />
  );
}

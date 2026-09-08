import { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePrefersReducedMotion } from "../../hooks/usePerformance";

type Tag = "h1" | "h2" | "h3" | "p" | "span";

interface RevealTextProps {
  children: string;
  as?: Tag;
  className?: string;
  /** Anima por palabras (headlines) o por líneas (párrafos largos) */
  mode?: "words" | "lines";
  /** Dispara al entrar en viewport en vez de al montar */
  triggerOnView?: boolean;
  delay?: number;
  stagger?: number;
  duration?: number;
}

/**
 * Divide el texto y anima su aparición palabra a palabra (máscara +
 * desplazamiento vertical + fade), pensado para titulares con
 * protagonismo. Respeta prefers-reduced-motion mostrando el texto
 * directamente.
 */
export function RevealText({
  children,
  as = "p",
  className = "",
  mode = "words",
  triggerOnView = true,
  delay = 0,
  stagger = 0.045,
  duration = 1,
}: RevealTextProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const Tag = as as React.ElementType;

  const units = mode === "words" ? children.split(" ") : children.split("\n");

  useEffect(() => {
    const el = containerRef.current;
    if (!el || reducedMotion) return;

    const targets = el.querySelectorAll<HTMLElement>("[data-reveal-unit]");

    const run = () => {
      gsap.fromTo(
        targets,
        { yPercent: 115, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration,
          delay,
          stagger,
          ease: "power4.out",
        }
      );
    };

    if (!triggerOnView) {
      run();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            run();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  if (reducedMotion) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Tag ref={containerRef as never} className={className}>
      {units.map((unit, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-top"
          style={{ paddingBottom: "0.08em", marginBottom: "-0.08em" }}
        >
          <span data-reveal-unit className="inline-block will-change-transform">
            {unit}
            {mode === "words" && i < units.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}

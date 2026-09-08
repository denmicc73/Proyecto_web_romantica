import { useEffect, useState } from "react";

/** Respeta prefers-reduced-motion del sistema. */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const listener = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);

  return reduced;
}

/** true en viewports estrechos (móvil/tablet pequeña). */
export function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);

  return isMobile;
}

/**
 * Heurística sencilla para bajar la densidad de efectos (partículas,
 * blur) en dispositivos con pocos núcleos/memoria o que ya piden
 * menos movimiento. No pretende ser exacta, solo evitar que la
 * experiencia vaya pesada en gama baja.
 */
export function useLowPowerMode(): boolean {
  const prefersReduced = usePrefersReducedMotion();
  const [lowPower, setLowPower] = useState(false);

  useEffect(() => {
    const cores = navigator.hardwareConcurrency ?? 8;
    const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
    setLowPower(cores <= 4 || mem <= 4);
  }, []);

  return prefersReduced || lowPower;
}

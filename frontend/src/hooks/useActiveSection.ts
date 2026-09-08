import { useEffect, useState } from "react";

/**
 * Observa una lista de secciones por id y devuelve el índice de la
 * que ocupa más protagonismo en el viewport en cada momento.
 */
export function useActiveSection(ids: readonly string[]): number {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let bestId: string | null = null;
        let bestRatio = 0;
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > bestRatio) {
            bestRatio = entry.intersectionRatio;
            bestId = entry.target.id;
          }
        }
        if (bestId) {
          const idx = ids.indexOf(bestId);
          if (idx !== -1) setActive(idx);
        }
      },
      { threshold: [0.25, 0.5, 0.75] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

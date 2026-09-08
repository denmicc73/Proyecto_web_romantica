interface ProgressNavProps {
  currentIndex: number;
  total: number;
  visible: boolean;
}

/**
 * Sustituye a una navbar tradicional. Una "M" discreta en la esquina,
 * un indicador "01 / 08" y una barra vertical de progreso narrativo.
 * No es clicable a propósito: el usuario avanza mediante scroll, esto
 * solo le sitúa dentro de la historia.
 */
export function ProgressNav({ currentIndex, total, visible }: ProgressNavProps) {
  if (!visible) return null;
  const progress = total > 1 ? currentIndex / (total - 1) : 0;
  const pad = (n: number) => String(n + 1).padStart(2, "0");

  return (
    <div className="pointer-events-none fixed inset-0 z-40 select-none">
      <div className="absolute left-6 top-6 font-serif text-lg italic text-ivory/70 sm:left-8 sm:top-8">
        M
      </div>

      <div className="absolute right-6 top-6 font-sans text-[11px] tracking-[0.14em] text-ivory-dim sm:right-8 sm:top-8">
        {pad(currentIndex)} / {pad(total - 1)}
      </div>

      <div className="absolute right-6 top-1/2 hidden h-32 w-px -translate-y-1/2 bg-white/10 sm:right-9 sm:block">
        <div
          className="absolute left-1/2 top-0 w-px -translate-x-1/2 bg-violet-glow transition-[height] duration-500 ease-out"
          style={{
            height: `${progress * 100}%`,
            boxShadow: "0 0 6px 1px rgba(185,166,255,0.6)",
          }}
        />
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import { COUNTER, PERSON } from "../../content/relationship";
import { useCountdown } from "../../hooks/useCountdown";
import { ParticleField } from "../ui/ParticleField";
import { RevealText } from "../ui/RevealText";
import { Scene } from "../ui/Scene";

export function CounterScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const value = useCountdown(PERSON.relationshipStartISO, active);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Scene id="counter" background="radial-gradient(ellipse at 50% 50%, #0F0A1E 0%, #05050A 70%)">
      <div ref={containerRef} className="relative flex w-full max-w-2xl flex-col items-center text-center">
        <ParticleField colorRgb="124,92,255" density={0.5} drift={2} />

        <RevealText as="p" className="font-sans text-xs tracking-[0.3em] text-ivory-dim">
          {COUNTER.eyebrow}
        </RevealText>

        <div className="relative z-10 mt-12 grid grid-cols-4 gap-3 sm:gap-10">
          {COUNTER.units.map((unit) => (
            <div key={unit.key} className="flex flex-col items-center">
              <span className="font-serif text-3xl tabular-nums text-ivory sm:text-6xl">
                {String(value[unit.key]).padStart(2, "0")}
              </span>
              <span className="mt-2 font-sans text-[9px] tracking-[0.15em] text-ivory-dim sm:text-xs sm:tracking-[0.2em]">
                {unit.label}
              </span>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-sm space-y-2">
          {COUNTER.lines.map((line, i) => (
            <RevealText
              key={i}
              as="p"
              delay={i * 0.12}
              className="font-serif text-lg italic text-ivory-dim"
            >
              {line}
            </RevealText>
          ))}
        </div>
      </div>
    </Scene>
  );
}

import { useEffect, useRef } from "react";
import { gsap } from "../../animations/gsapSetup";
import { SCENE_CORDOBA } from "../../content/relationship";
import { ParticleField } from "../ui/ParticleField";
import { RevealText } from "../ui/RevealText";
import { Scene } from "../ui/Scene";

/**
 * Córdoba se diferencia deliberadamente de Jerez: aquí hay
 * movimiento horizontal (líneas de "camino"), más luz y una
 * paleta que mezcla violeta con un cálido tenue — sensación de
 * descubrimiento y libertad en vez de solemnidad.
 */
export function CordobaScene() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sceneRef.current || !linesRef.current) return;
    const ctx = gsap.context(() => {
      const lines = linesRef.current!.querySelectorAll<HTMLElement>("[data-road-line]");
      lines.forEach((line, i) => {
        gsap.fromTo(
          line,
          { xPercent: -100, opacity: 0 },
          {
            xPercent: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sceneRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1 + i * 0.4,
            },
          }
        );
      });
    }, sceneRef);
    return () => ctx.revert();
  }, []);

  return (
    <Scene
      id={SCENE_CORDOBA.id}
      background="linear-gradient(160deg, #0B0716 0%, #05050A 55%, #120A18 100%)"
    >
      <div ref={sceneRef} className="relative flex w-full max-w-3xl flex-col items-center text-center">
        <ParticleField colorRgb="185,166,255" density={0.7} drift={5} />

        {/* Líneas de camino abstractas, distinto lenguaje visual que Jerez */}
        <div
          ref={linesRef}
          className="pointer-events-none absolute inset-x-0 bottom-[20%] -z-0 flex flex-col gap-6 opacity-60"
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              data-road-line
              className="h-px w-full"
              style={{
                background: `linear-gradient(90deg, transparent, rgba(217,166,108,${0.25 - i * 0.05}) 30%, rgba(124,92,255,${0.35 - i * 0.08}) 70%, transparent)`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10">
          <RevealText as="p" className="font-sans text-xs tracking-[0.3em] text-violet-glow/70">
            {SCENE_CORDOBA.eyebrow}
          </RevealText>

          <RevealText as="h2" className="mt-5 font-serif text-5xl italic text-ivory sm:text-7xl">
            {SCENE_CORDOBA.title}
          </RevealText>

          <RevealText as="p" className="mt-4 font-sans text-base text-ivory-dim sm:text-lg">
            {SCENE_CORDOBA.subtitle}
          </RevealText>

          <div className="mx-auto mt-16 max-w-md space-y-3">
            {SCENE_CORDOBA.lines.map((line, i) => (
              <RevealText
                key={i}
                as="p"
                delay={i * 0.12}
                className="font-serif text-xl italic text-ivory-dim sm:text-2xl"
              >
                {line}
              </RevealText>
            ))}
          </div>

          <RevealText
            as="p"
            delay={0.3}
            className="mt-14 font-sans text-sm tracking-[0.1em] text-violet-glow/80"
          >
            {SCENE_CORDOBA.closing}
          </RevealText>
        </div>
      </div>
    </Scene>
  );
}

import { useEffect, useRef } from "react";
import { gsap } from "../../animations/gsapSetup";
import { SCENE_CANDELA } from "../../content/relationship";
import { ParticleField } from "../ui/ParticleField";
import { RevealText } from "../ui/RevealText";
import { Scene } from "../ui/Scene";

/**
 * Escena abstracta: una casa sugerida por formas y luz cálida, no
 * literal. El punto de luz central actúa como "ventana" y reacciona
 * muy levemente al scroll para dar sensación de profundidad.
 */
export function CandelaScene() {
  const glowRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!glowRef.current || !sceneRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        glowRef.current,
        { scale: 0.85, opacity: 0.4 },
        {
          scale: 1.15,
          opacity: 0.8,
          ease: "none",
          scrollTrigger: {
            trigger: sceneRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );
    }, sceneRef);
    return () => ctx.revert();
  }, []);

  return (
    <Scene id={SCENE_CANDELA.id} background="radial-gradient(ellipse at 50% 65%, #14100A 0%, #05050A 65%)">
      <div ref={sceneRef} className="relative flex w-full max-w-3xl flex-col items-center text-center">
        <ParticleField colorRgb="217,166,108" density={0.5} drift={2.5} />

        {/* "Casa" abstracta: silueta trapezoidal con luz cálida interior */}
        <div className="pointer-events-none absolute bottom-[18%] left-1/2 -z-0 h-[38vh] w-[52vw] max-w-[420px] -translate-x-1/2 opacity-70">
          <div
            ref={glowRef}
            className="absolute inset-0"
            style={{
              clipPath: "polygon(50% 0%, 100% 38%, 100% 100%, 0% 100%, 0% 38%)",
              background:
                "linear-gradient(180deg, rgba(217,166,108,0.16) 0%, rgba(217,166,108,0.04) 55%, transparent 100%)",
              boxShadow: "0 0 120px 40px rgba(217,166,108,0.08)",
              border: "1px solid rgba(217,166,108,0.12)",
            }}
          />
          <div
            className="absolute left-1/2 top-[46%] h-[14%] w-[10%] -translate-x-1/2 rounded-sm"
            style={{
              background: "rgba(217,166,108,0.55)",
              boxShadow: "0 0 40px 14px rgba(217,166,108,0.35)",
            }}
          />
        </div>

        <div className="relative z-10">
          <RevealText
            as="p"
            className="font-sans text-xs tracking-[0.3em] text-amber/80"
          >
            {SCENE_CANDELA.eyebrow}
          </RevealText>

          <RevealText
            as="h2"
            className="mt-5 font-serif text-5xl italic text-ivory sm:text-7xl"
          >
            {SCENE_CANDELA.title}
          </RevealText>

          <RevealText
            as="p"
            className="mt-4 font-sans text-base text-ivory-dim sm:text-lg"
          >
            {SCENE_CANDELA.subtitle}
          </RevealText>

          <div className="mx-auto mt-16 max-w-md space-y-4">
            {SCENE_CANDELA.lines.map((line, i) => (
              <RevealText
                key={i}
                as="p"
                delay={i * 0.15}
                className="font-serif text-lg italic text-ivory-dim sm:text-xl"
              >
                {line}
              </RevealText>
            ))}
          </div>
        </div>
      </div>
    </Scene>
  );
}

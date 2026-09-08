import { useEffect, useRef } from "react";
import { gsap } from "../../animations/gsapSetup";
import { SCENE_JEREZ } from "../../content/relationship";
import { ParticleField } from "../ui/ParticleField";
import { usePrefersReducedMotion } from "../../hooks/usePerformance";

/**
 * La escena más importante de la web. Se ancla (pin) durante un
 * tramo largo de scroll y va revelando los "beats" de texto uno a
 * uno, terminando con la revelación de la fecha. Todo en violeta
 * oscuro, tipografía grande, ritmo lento.
 */
export function JerezScene() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const beatRefs = useRef<Array<HTMLDivElement | null>>([]);
  const dateRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion || !wrapperRef.current || !pinRef.current) return;

    const ctx = gsap.context(() => {
      const beats = beatRefs.current.filter(Boolean) as HTMLDivElement[];
      gsap.set(beats, { opacity: 0, y: 24 });
      gsap.set(dateRef.current, { opacity: 0, y: 24, scale: 0.96 });

      const isMobile = window.innerWidth < 640;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: isMobile ? "+=200%" : "+=280%",
          scrub: 0.6,
          pin: pinRef.current,
          anticipatePin: 1,
        },
      });

      beats.forEach((beat) => {
        tl.to(beat, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });
        tl.to({}, { duration: 0.5 }); // pausa: silencio visual
        tl.to(beat, { opacity: 0, y: -18, duration: 0.5, ease: "power2.in" });
      });

      tl.to({}, { duration: 0.3 });
      tl.to(dateRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "power3.out" });
      tl.to(
        glowRef.current,
        { opacity: 1, scale: 1.4, duration: 1.2, ease: "power2.out" },
        "<"
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  // Fallback estático para reduced motion: todo visible en columna.
  if (reducedMotion) {
    return (
      <section
        id={SCENE_JEREZ.id}
        className="relative flex min-h-screen w-full flex-col items-center justify-center gap-10 px-6 py-24 text-center"
        style={{ background: "radial-gradient(ellipse at 50% 40%, #1A1030 0%, #05050A 70%)" }}
      >
        <p className="font-sans text-xs tracking-[0.3em] text-violet-glow/80">{SCENE_JEREZ.eyebrow}</p>
        <h2 className="font-serif text-6xl italic text-ivory sm:text-8xl">{SCENE_JEREZ.title}</h2>
        <p className="font-sans text-ivory-dim">{SCENE_JEREZ.subtitle}</p>
        <div className="max-w-xl space-y-6">
          {SCENE_JEREZ.beats.map((beat, i) => (
            <div key={i} className="space-y-1">
              {beat.map((line, j) => (
                <p key={j} className="font-serif text-2xl italic text-ivory">
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-6 font-serif text-4xl tracking-[0.1em] text-violet-glow">
          {SCENE_JEREZ.dateReveal}
        </div>
        <p className="font-sans text-sm text-ivory-dim">{SCENE_JEREZ.dateCaption}</p>
      </section>
    );
  }

  return (
    <div ref={wrapperRef} id={SCENE_JEREZ.id} className="relative">
      <div
        ref={pinRef}
        className="relative flex h-screen w-full items-center justify-center overflow-hidden px-6"
        style={{ background: "radial-gradient(ellipse at 50% 38%, #1A1030 0%, #05050A 72%)" }}
      >
        <div
          ref={glowRef}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[42vh] w-[42vh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0"
          style={{
            background:
              "radial-gradient(circle, rgba(124,92,255,0.35) 0%, rgba(124,92,255,0.05) 60%, transparent 75%)",
            filter: "blur(20px)",
          }}
        />
        <ParticleField colorRgb="124,92,255" density={0.8} drift={4} />

        <div className="relative z-10 flex flex-col items-center text-center">
          <p className="mb-10 font-sans text-xs tracking-[0.3em] text-violet-glow/70">
            {SCENE_JEREZ.eyebrow}
          </p>

          <div className="relative h-[34vh] w-full max-w-2xl sm:h-[28vh]">
            {SCENE_JEREZ.beats.map((beat, i) => (
              <div
                key={i}
                ref={(el) => {
                  beatRefs.current[i] = el;
                }}
                className="absolute inset-0 flex flex-col items-center justify-center gap-2"
              >
                {beat.map((line, j) => (
                  <p
                    key={j}
                    className="font-serif text-3xl italic leading-tight text-ivory sm:text-5xl"
                  >
                    {line}
                  </p>
                ))}
              </div>
            ))}

            <div
              ref={dateRef}
              className="absolute inset-0 flex flex-col items-center justify-center gap-3"
            >
              <span className="font-serif text-5xl tracking-[0.08em] text-violet-glow sm:text-7xl">
                {SCENE_JEREZ.dateReveal}
              </span>
              <span className="font-sans text-sm tracking-[0.15em] text-ivory-dim">
                {SCENE_JEREZ.dateCaption}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

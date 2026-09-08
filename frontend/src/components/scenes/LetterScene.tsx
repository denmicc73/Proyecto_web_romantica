import { useEffect, useRef } from "react";
import { gsap } from "../../animations/gsapSetup";
import { LETTER } from "../../content/relationship";
import { ParticleField } from "../ui/ParticleField";
import { Scene } from "../ui/Scene";

export function LetterScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      const paragraphs = containerRef.current!.querySelectorAll<HTMLElement>("[data-letter-p]");
      paragraphs.forEach((p) => {
        gsap.fromTo(
          p,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: p,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <Scene id="letter" className="items-start py-32 sm:items-center" background="#05050A">
      <div ref={containerRef} className="relative mx-auto w-full max-w-xl">
        <ParticleField colorRgb="124,92,255" density={0.35} drift={1.5} />

        <p className="relative z-10 mb-14 text-center font-serif text-4xl italic text-ivory sm:text-5xl">
          {LETTER.heading}
        </p>

        <div className="relative z-10 space-y-6">
          {LETTER.paragraphs.map((paragraph, i) => (
            <p
              key={i}
              data-letter-p
              className="font-serif text-lg leading-relaxed text-ivory-dim sm:text-xl"
              style={{ lineHeight: 1.7 }}
            >
              {paragraph}
            </p>
          ))}
        </div>

        <p
          data-letter-p
          className="relative z-10 mt-14 text-right font-serif text-2xl italic text-ivory"
        >
          {LETTER.signature}
        </p>
      </div>
    </Scene>
  );
}

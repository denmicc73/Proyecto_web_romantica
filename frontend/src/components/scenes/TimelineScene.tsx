import { useEffect, useRef } from "react";
import { gsap } from "../../animations/gsapSetup";
import { TIMELINE } from "../../content/relationship";
import { Scene } from "../ui/Scene";

export function TimelineScene() {
  const railRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    if (!railRef.current || !fillRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        fillRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: railRef.current,
            start: "top 75%",
            end: "bottom 60%",
            scrub: 0.6,
          },
        }
      );

      const mobileFill = railRef.current!.querySelector<HTMLElement>("[data-mobile-fill]");
      if (mobileFill) {
        gsap.fromTo(
          mobileFill,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top center",
            scrollTrigger: {
              trigger: railRef.current,
              start: "top 75%",
              end: "bottom 60%",
              scrub: 0.6,
            },
          }
        );
      }

      dotsRef.current.forEach((dot) => {
        if (!dot) return;
        gsap.fromTo(
          dot,
          { scale: 0.4, opacity: 0.3 },
          {
            scale: 1,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: dot,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, railRef);
    return () => ctx.revert();
  }, []);

  return (
    <Scene id="timeline" background="linear-gradient(180deg, #05050A 0%, #0B0716 100%)">
      <div className="relative flex w-full max-w-4xl flex-col items-center">
        <p className="font-sans text-xs tracking-[0.3em] text-ivory-dim">Nuestro recorrido</p>

        <div ref={railRef} className="relative mt-20 w-full">
          {/* Riel vertical — solo móvil */}
          <div className="absolute left-[3px] top-1 bottom-1 w-px bg-white/10 sm:hidden" />
          <div
            className="absolute left-[3px] top-1 w-px origin-top bg-violet-glow sm:hidden"
            style={{
              height: "calc(100% - 0.5rem)",
              boxShadow: "0 0 8px 1px rgba(185,166,255,0.5)",
              transform: "scaleY(0)",
            }}
            data-mobile-fill
          />

          {/* Riel horizontal — sm y superior */}
          <div className="absolute left-0 right-0 top-1/2 hidden h-px bg-white/10 sm:block" />
          <div
            ref={fillRef}
            className="absolute left-0 right-0 top-1/2 hidden h-px sm:block"
            style={{
              background: "linear-gradient(90deg, var(--color-violet-deep), var(--color-violet-glow))",
              boxShadow: "0 0 8px 1px rgba(185,166,255,0.5)",
            }}
          />

          <div className="grid grid-cols-1 gap-10 pl-9 sm:grid-cols-4 sm:gap-6 sm:pl-0">
            {TIMELINE.map((item, i) => (
              <div key={item.id} className="relative flex flex-col items-start sm:items-center sm:text-center">
                <div
                  ref={(el) => {
                    dotsRef.current[i] = el;
                  }}
                  className="absolute -left-9 top-1 h-[7px] w-[7px] shrink-0 rounded-full sm:relative sm:left-0 sm:top-0 sm:mb-6"
                  style={{
                    background: "var(--color-violet-glow)",
                    boxShadow: "0 0 10px 3px rgba(185,166,255,0.55)",
                  }}
                />
                <div>
                  <p className="font-sans text-[10px] tracking-[0.2em] text-violet-glow/70">
                    {item.index}
                  </p>
                  <p className="mt-1 font-serif text-xl italic text-ivory sm:text-2xl">
                    {item.title}
                  </p>
                  <p className="mt-1 font-sans text-sm text-ivory-dim">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Scene>
  );
}

import { useEffect, useRef, useState } from "react";
import { gsap } from "../../animations/gsapSetup";
import { INTRO } from "../../content/relationship";
import { Button } from "../ui/Button";
import { ParticleField } from "../ui/ParticleField";

interface IntroGateProps {
  onEnter: () => void;
}

/**
 * Pantalla previa a toda la experiencia. No forma parte del scroll:
 * se superpone y desaparece con un fade cinematográfico al pulsar
 * "Entrar". Aquí es donde se activa el gesto de usuario necesario
 * para poder reproducir audio.
 */
export function IntroGate({ onEnter }: IntroGateProps) {
  const [closing, setClosing] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.set([dateRef.current, nameRef.current, linesRef.current, ctaRef.current], {
      opacity: 0,
    })
      .to(dateRef.current, { opacity: 1, duration: 1.2, delay: 0.3 })
      .to(dateRef.current, { opacity: 0.35, duration: 0.8 }, "+=1")
      .to(nameRef.current, { opacity: 1, duration: 1.2 }, "-=0.4")
      .to(nameRef.current, { opacity: 0.5, duration: 0.8 }, "+=1.1")
      .to(linesRef.current, { opacity: 1, duration: 1.4 }, "-=0.3")
      .to(ctaRef.current, { opacity: 1, duration: 1.2 }, "+=0.9");
    return () => {
      tl.kill();
    };
  }, []);

  const handleEnter = () => {
    setClosing(true);
    gsap.to(rootRef.current, {
      opacity: 0,
      duration: 1.4,
      ease: "power2.inOut",
      onComplete: onEnter,
    });
  };

  return (
    <div
      ref={rootRef}
      className={`fixed inset-0 z-[70] flex flex-col items-center justify-center bg-void px-6 text-center ${
        closing ? "pointer-events-none" : ""
      }`}
    >
      <ParticleField colorRgb="124,92,255" density={0.6} drift={3} />

      <div ref={dateRef} className="relative font-sans text-xs tracking-[0.3em] text-ivory-dim">
        {INTRO.date}
      </div>

      <div
        ref={nameRef}
        className="relative mt-6 font-serif text-6xl italic text-ivory sm:text-8xl"
      >
        {INTRO.name}
      </div>

      <div ref={linesRef} className="relative mt-10 max-w-md space-y-2">
        {INTRO.lines.map((line, i) => (
          <p key={i} className="font-serif text-lg italic text-ivory-dim sm:text-xl">
            {line}
          </p>
        ))}
      </div>

      <div ref={ctaRef} className="relative mt-14 flex flex-col items-center gap-4">
        <Button onClick={handleEnter}>{INTRO.cta}</Button>
        <span className="text-[11px] tracking-[0.2em] text-ivory-dim/70">{INTRO.hint}</span>
      </div>
    </div>
  );
}

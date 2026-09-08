import { useRef, useState } from "react";
import { gsap } from "../../animations/gsapSetup";
import { FINAL_SCENE } from "../../content/relationship";
import { Button } from "../ui/Button";
import { ParticleField } from "../ui/ParticleField";
import { RevealText } from "../ui/RevealText";
import { Scene } from "../ui/Scene";

export function FinalScene() {
  const [confirmed, setConfirmed] = useState(false);
  const glowRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  const promptRef = useRef<HTMLDivElement>(null);

  const handleChoice = () => {
    setConfirmed(true);
    const tl = gsap.timeline();
    tl.to(promptRef.current, { opacity: 0, duration: 0.6, ease: "power2.in" })
      .fromTo(
        glowRef.current,
        { scale: 0.3, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.6, ease: "power2.out" },
        "-=0.2"
      )
      .fromTo(
        messageRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" },
        "-=0.8"
      );
  };

  return (
    <Scene id="final" background="#020203">
      <div className="relative flex w-full max-w-2xl flex-col items-center text-center">
        <ParticleField colorRgb="124,92,255" density={confirmed ? 1.1 : 0.5} drift={2.5} />

        <div
          ref={glowRef}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0"
          style={{
            background:
              "radial-gradient(circle, rgba(124,92,255,0.4) 0%, rgba(124,92,255,0.08) 55%, transparent 75%)",
            filter: "blur(30px)",
          }}
        />

        <div ref={promptRef} className="relative z-10">
          <RevealText as="p" className="font-serif text-4xl italic text-ivory sm:text-6xl">
            {`${FINAL_SCENE.name}.`}
          </RevealText>

          <div className="mx-auto mt-8 max-w-md space-y-2">
            {FINAL_SCENE.lines.map((line, i) => (
              <RevealText
                key={i}
                as="p"
                delay={0.3 + i * 0.2}
                className="font-serif text-xl italic text-ivory-dim"
              >
                {line}
              </RevealText>
            ))}
          </div>

          <RevealText
            as="p"
            delay={0.9}
            className="mx-auto mt-14 max-w-sm font-sans text-base text-ivory sm:text-lg"
          >
            {FINAL_SCENE.question}
          </RevealText>

          {!confirmed && (
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              {FINAL_SCENE.options.map((option) => (
                <Button key={option} onClick={handleChoice}>
                  {option}
                </Button>
              ))}
            </div>
          )}
        </div>

        <div ref={messageRef} className="relative z-10 opacity-0">
          <p className="font-serif text-4xl italic text-ivory sm:text-6xl">
            {FINAL_SCENE.finalMessage}
          </p>
        </div>
      </div>
    </Scene>
  );
}

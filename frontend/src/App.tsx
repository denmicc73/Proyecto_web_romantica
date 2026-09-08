import { useEffect, useRef, useState } from "react";
import "./animations/gsapSetup";
import { STORY_SECTIONS } from "./content/relationship";
import { CandelaScene } from "./components/scenes/CandelaScene";
import { CordobaScene } from "./components/scenes/CordobaScene";
import { CounterScene } from "./components/scenes/CounterScene";
import { FinalScene } from "./components/scenes/FinalScene";
import { IntroGate } from "./components/scenes/IntroGate";
import { JerezScene } from "./components/scenes/JerezScene";
import { LetterScene } from "./components/scenes/LetterScene";
import { QuiereMeScene } from "./components/scenes/QuiereMeScene";
import { TimelineScene } from "./components/scenes/TimelineScene";
import { CustomCursor } from "./components/ui/CustomCursor";
import { MusicPlayer } from "./components/ui/MusicPlayer";
import { ProgressNav } from "./components/ui/ProgressNav";
import { useActiveSection } from "./hooks/useActiveSection";

const sectionIds = STORY_SECTIONS.map((s) => s.id);

function App() {
  const [entered, setEntered] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const activeIndex = useActiveSection(sectionIds);

  // Mientras se muestra la pantalla de entrada, el documento no debe
  // poder scrollearse por debajo: si eso pasa (rueda del ratón,
  // restauración de scroll del navegador, etc.), al pulsar "Entrar"
  // la experiencia aparecería a mitad de la historia en vez de al
  // principio.
  useEffect(() => {
    if (!entered) {
      window.scrollTo(0, 0);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [entered]);

  const handleEnter = () => {
    // Por si acaso el scroll se movió mientras el gate estaba
    // bloqueado (p. ej. gestos táctiles), forzamos ir arriba antes
    // de revelar la historia.
    window.scrollTo(0, 0);
    setEntered(true);
    audioRef.current?.play().catch(() => {
      // Si el navegador bloquea el audio, el usuario puede darle
      // al reproductor manualmente; no rompemos la experiencia.
    });
  };

  return (
    <div className="grain relative bg-void">
      <CustomCursor />
      <MusicPlayer ref={audioRef} visible={entered} />
      <ProgressNav currentIndex={activeIndex} total={sectionIds.length} visible={entered} />

      {!entered && <IntroGate onEnter={handleEnter} />}

      <main id="intro" aria-hidden={!entered}>
        <CandelaScene />
        <JerezScene />
        <CordobaScene />
        <CounterScene />
        <TimelineScene />
        <LetterScene />
        <QuiereMeScene />
        <FinalScene />
      </main>
    </div>
  );
}

export default App;

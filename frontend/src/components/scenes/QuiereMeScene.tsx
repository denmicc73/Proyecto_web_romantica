import { QUIEREME_UN_POCO } from "../../content/relationship";
import { RevealText } from "../ui/RevealText";
import { Scene } from "../ui/Scene";

/**
 * La escena más minimalista de toda la web, tal y como pide el
 * brief: sin decoración. Toda la emoción viene de la tipografía,
 * el espacio y el silencio.
 */
export function QuiereMeScene() {
  return (
    <Scene id="quiereme" background="#05050A">
      <div className="relative flex w-full max-w-lg flex-col items-center gap-10 text-center">
        <RevealText as="p" className="font-sans text-sm text-ivory-dim">
          {QUIEREME_UN_POCO.pre}
        </RevealText>

        <RevealText
          as="h2"
          delay={0.4}
          className="font-serif text-5xl italic text-ivory sm:text-7xl"
        >
          {QUIEREME_UN_POCO.phrase}
        </RevealText>

        <RevealText as="p" delay={0.9} className="font-sans text-sm text-ivory-dim">
          {QUIEREME_UN_POCO.post}
        </RevealText>
      </div>
    </Scene>
  );
}

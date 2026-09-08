import { forwardRef, useEffect, useState } from "react";
import { SONG } from "../../content/relationship";

interface MusicPlayerProps {
  visible: boolean;
}

export const MusicPlayer = forwardRef<HTMLAudioElement, MusicPlayerProps>(
  function MusicPlayer({ visible }, ref) {
    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [showVolume, setShowVolume] = useState(false);

    useEffect(() => {
      const audio = (ref as React.RefObject<HTMLAudioElement>)?.current;
      if (!audio) return;

      audio.volume = volume;

      const onPlay = () => setPlaying(true);
      const onPause = () => setPlaying(false);

      audio.addEventListener("play", onPlay);
      audio.addEventListener("pause", onPause);

      return () => {
        audio.removeEventListener("play", onPlay);
        audio.removeEventListener("pause", onPause);
      };
    }, [ref]);

    const toggle = () => {
      const audio = (ref as React.RefObject<HTMLAudioElement>)?.current;
      if (!audio) return;

      if (audio.paused) {
        audio.play().catch(() => {});
      } else {
        audio.pause();
      }
    };

    const changeVolume = (value: number) => {
      setVolume(value);

      const audio = (ref as React.RefObject<HTMLAudioElement>)?.current;
      if (audio) {
        audio.volume = value;
      }
    };

    if (!visible) {
      return (
        <audio
          ref={ref}
          src={SONG.src}
          loop
          preload="none"
        />
      );
    }

    return (
      <>
        <audio
          ref={ref}
          src={SONG.src}
          loop
          preload="none"
        />

        <div className="fixed bottom-6 left-6 z-50 flex items-center gap-2 sm:bottom-8 sm:left-8">

          {/* Música */}
          <button
            type="button"
            onClick={toggle}
            data-cursor-interactive
            aria-label={playing ? "Pausar música" : "Reproducir música"}
            className="
              flex items-center gap-2
              rounded-full
              border border-white/10
              bg-white/[0.04]
              px-3.5 py-2
              backdrop-blur-md
              transition-all duration-300
              hover:border-violet-glow/40
              hover:bg-white/[0.08]
            "
          >
            <span
              className="h-[7px] w-[7px] rounded-full"
              style={{
                background: playing
                  ? "var(--color-violet-glow)"
                  : "rgba(255,255,255,0.35)",
                boxShadow: playing
                  ? "0 0 8px 2px rgba(185,166,255,0.7)"
                  : "none",
                animation: playing
                  ? "pulse 1.6s ease-in-out infinite"
                  : "none",
              }}
            />

            <span className="font-sans text-[11px] tracking-[0.14em] text-ivory-dim">
              {playing ? "MUSIC" : "PAUSED"}
            </span>
          </button>

          {/* Volumen */}
          <div
            className={`
              flex items-center
              rounded-full
              border border-white/10
              bg-white/[0.04]
              backdrop-blur-md
              transition-all duration-300
              overflow-hidden
              ${showVolume ? "w-36 px-3" : "w-9"}
            `}
          >
            <button
              type="button"
              onClick={() => setShowVolume(!showVolume)}
              data-cursor-interactive
              aria-label="Controlar volumen"
              className="
                flex h-9 w-9
                shrink-0
                items-center justify-center
                text-sm
                transition-opacity
                hover:opacity-70
              "
            >
              {volume === 0 ? "🔇" : volume < 0.5 ? "🔉" : "🔊"}
            </button>

            {showVolume && (
              <div className="flex flex-1 items-center gap-2 pr-1">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) =>
                    changeVolume(Number(e.target.value))
                  }
                  aria-label="Volumen"
                  className="h-1 w-full cursor-pointer appearance-none rounded-full bg-white/20 accent-violet-glow"
                />

                <span className="w-8 text-right font-sans text-[9px] text-ivory-dim">
                  {Math.round(volume * 100)}%
                </span>
              </div>
            )}
          </div>
        </div>

        <style>{`
          @keyframes pulse {
            0%, 100% {
              opacity: 1;
              transform: scale(1);
            }

            50% {
              opacity: 0.5;
              transform: scale(0.72);
            }
          }
        `}</style>
      </>
    );
  }
);
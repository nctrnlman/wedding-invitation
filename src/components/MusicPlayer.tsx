"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  // Try autoplay (MUTED) on mount
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    el.loop = true;
    el.preload = "auto";
    el.volume = 0.7;
    el.muted = true; // <— penting agar autoplay lolos
    el.autoplay = true; // opsional, bantu hint

    el.play()
      .then(() => {
        setIsPlaying(true);
        setAutoplayBlocked(false);
      })
      .catch(() => {
        setAutoplayBlocked(true);
        setIsPlaying(false);
      });

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);

    // First-gesture unlock: unmute + play
    const unlock = async () => {
      if (!audioRef.current) return;
      try {
        audioRef.current.muted = false;
        await audioRef.current.play();
        setIsPlaying(true);
        setAutoplayBlocked(false);
        removeUnlockers();
      } catch {
        // still blocked; keep button visible
      }
    };
    const addUnlockers = () => {
      window.addEventListener("pointerdown", unlock, { once: true });
      window.addEventListener("keydown", unlock, { once: true });
      window.addEventListener("touchstart", unlock, { once: true });
    };
    const removeUnlockers = () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
      window.removeEventListener("touchstart", unlock);
    };
    addUnlockers();

    // Retry when tab becomes visible
    const onVisibility = async () => {
      if (document.visibilityState === "visible" && audioRef.current) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
          setAutoplayBlocked(false);
        } catch {
          // ignore
        }
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      removeUnlockers();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  // Manual toggle via button
  const toggle = async () => {
    const el = audioRef.current;
    if (!el) return;
    try {
      if (el.paused) {
        el.muted = false; // pastikan unmute saat user menekan tombol
        await el.play();
        setIsPlaying(true);
        setAutoplayBlocked(false);
      } else {
        el.pause();
        setIsPlaying(false);
      }
    } catch {
      setAutoplayBlocked(true);
    }
  };

  return (
    <>
      {/* NOTE: start muted for autoplay policy, unmute after first gesture */}
      <audio ref={audioRef} src="/music/Bermuara.mp3" />

      <button
        type="button"
        onClick={toggle}
        aria-label={isPlaying ? "Pause music" : "Play music"}
        title={autoplayBlocked ? "Tap to play music" : undefined}
        className={`
          fixed bottom-5 right-5 z-50
          inline-flex items-center justify-center
          h-11 w-11 sm:h-12 sm:w-12 rounded-full
          transition-transform duration-200 hover:scale-[1.06] focus:outline-none
          ring-1 ring-[rgba(180,138,60,.45)]
          shadow-[0_10px_24px_-10px_rgba(180,138,60,.55)]
          bg-[linear-gradient(180deg,#f4e4bf_0%,#e7c983_50%,#d2aa59_100%)]
          text-[#1b1b1b]
        `}
      >
        {/* inner layer */}
        <span
          aria-hidden
          className={`
            absolute inset-[3px] rounded-full
            bg-white/40 backdrop-blur-[2px]
            ring-1 ring-black/5
          `}
        />

        {/* equalizer when playing */}
        <span
          aria-hidden
          className={`
            pointer-events-none absolute inset-0 grid place-items-center
            ${isPlaying ? "opacity-100" : "opacity-0"}
          `}
        >
          <span className="relative flex items-end gap-[3px] h-4">
            <i className="eq-bar" style={{ animationDelay: "0ms" }} />
            <i className="eq-bar" style={{ animationDelay: "120ms" }} />
            <i className="eq-bar" style={{ animationDelay: "240ms" }} />
          </span>
        </span>

        {!isPlaying && (
          <Play
            className="relative h-4 w-4 translate-x-[1px]"
            aria-hidden="true"
          />
        )}

        <span
          aria-hidden
          className={`
            pointer-events-none absolute inset-0 rounded-full
            ${isPlaying ? "animate-softPulse" : ""}
          `}
        />
      </button>

      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          .animate-softPulse,
          .eq-bar {
            animation: none !important;
          }
        }
        .eq-bar {
          display: inline-block;
          width: 3px;
          height: 6px;
          border-radius: 2px;
          background: #1b1b1b;
          animation: eqBounce 850ms ease-in-out infinite;
        }
        .eq-bar:nth-child(2) {
          height: 10px;
        }
        .eq-bar:nth-child(3) {
          height: 8px;
        }

        @keyframes eqBounce {
          0%,
          100% {
            transform: scaleY(0.7);
            opacity: 0.85;
          }
          50% {
            transform: scaleY(1.6);
            opacity: 1;
          }
        }
        .animate-softPulse {
          box-shadow: 0 0 0 0 rgba(210, 170, 89, 0.35);
          animation: softPulse 1800ms ease-out infinite;
        }
        @keyframes softPulse {
          0% {
            box-shadow: 0 0 0 0 rgba(210, 170, 89, 0.35);
          }
          70% {
            box-shadow: 0 0 0 12px rgba(210, 170, 89, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(210, 170, 89, 0);
          }
        }
      `}</style>
    </>
  );
}

"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { titleCase, sessionLabel } from "@/lib/format";

type Props = { guest?: string; session?: string };

export default function InviteCover({ guest, session = "1" }: Props) {
  const name = useMemo(
    () => (guest ? titleCase(guest) : "Tamu Undangan"),
    [guest]
  );

  /** Typing Animation */
  const fullText = "You are invited to";
  const [typed, setTyped] = useState("");
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const DURATION = 1400;
    const start = performance.now();

    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / DURATION);
      setTyped(fullText.slice(0, Math.round(p * fullText.length)));
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    const id = requestAnimationFrame(tick);
    rafRef.current = id;

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, []);

  return (
    <section
      id="cover"
      aria-label="Invitation Cover"
      className="relative min-h-[100dvh] flex flex-col items-center justify-center px-6 py-16 sm:py-24 overflow-hidden"
    >
      {/* ===== PAGE BACKGROUND (marble + damask + vignette + grain) ===== */}
      <div aria-hidden className="absolute inset-0 -z-10">
        {/* marble base */}
        <div
          className="absolute inset-0"
          style={{
            background: [
              "linear-gradient(180deg,#f6f1e6 0%,#efe8dc 100%)",
              "radial-gradient(1200px 700px at 60% -10%, rgba(0,0,0,.045), transparent 60%)",
              "radial-gradient(900px 600px at 0% 100%, rgba(0,0,0,.035), transparent 60%)",
            ].join(","),
          }}
        />
        {/* gold focus glow */}
        <div
          className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 w-[70vw] max-w-[700px] aspect-square rounded-full blur-[100px] opacity-55"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(192,150,84,.35), rgba(192,150,84,.14) 55%, transparent 75%)",
          }}
        />
        {/* subtle damask watermark (earth tone) */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,\
<svg xmlns='http://www.w3.org/2000/svg' width='320' height='320' viewBox='0 0 320 320'>\
<defs>\
<pattern id='d' width='160' height='160' patternUnits='userSpaceOnUse' patternTransform='scale(1)'>\
<path d='M80 10c-8 12-22 20-38 20 12 6 22 16 26 28-6-2-12-3-18-3-26 0-48 17-54 40 12-10 28-16 46-16 4 0 9 0 13 1-8 9-13 21-13 34 0 17 8 32 21 42-2-4-3-9-3-13 0-20 13-38 33-45-3 6-5 13-5 20 0 24 18 44 42 47-8-7-12-18-12-30 0-22 16-41 38-45-4-2-9-3-14-3-7 0-13 1-19 3 5-12 15-22 27-28-16 0-30-8-38-20z' fill='%239c7b57' fill-opacity='.45'/>\
</pattern>\
</defs>\
<rect width='100%' height='100%' fill='url(%23d)'/>\
</svg>\")",
            backgroundSize: "320px 320px",
          }}
        />
        {/* vignette + grain */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ boxShadow: "inset 0 0 160px rgba(0,0,0,.1)" }}
        />
        <div
          className="absolute inset-0 mix-blend-multiply opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/></filter><rect width='64' height='64' filter='url(%23n)' opacity='.25'/></svg>\")",
          }}
        />

        {/* Falling Earth-tone Petals */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className={`petal petal-${i + 1}`} aria-hidden />
          ))}
        </div>
      </div>

      {/* Headline + underline shimmer */}
      <p className="script-gold text-[30px] sm:text-[38px] md:text-[44px] tracking-[.12em] mb-5">
        <span
          className={
            typed.length < fullText.length ? "typing-caret" : undefined
          }
        >
          {typed || "\u00A0"}
        </span>
      </p>
      <span
        aria-hidden
        className="mb-6 h-[2px] w-[220px] sm:w-[260px] md:w-[300px] rounded-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, #b48a3c 20%, #e3c27f 55%, #b48a3c 80%, transparent)",
          mask: "linear-gradient(90deg, transparent 0, black 10%, black 90%, transparent 100%)",
        }}
      />

      {/* ===== CARD (compact, satu saja) ===== */}
      <div
        className={`
          relative mx-auto w-full max-w-[480px]
          rounded-[24px] px-8 sm:px-10 py-10 text-center
          bg-white/78 backdrop-blur-md
          shadow-[0_24px_60px_-30px_rgba(0,0,0,.35)]
          ring-1 ring-black/5
        `}
        style={{
          // fabric dots pattern
          backgroundImage:
            "radial-gradient(rgba(0,0,0,0.04) 1px, transparent 1px)",
          backgroundSize: "12px 12px",
        }}
      >
        {/* Foil edge */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[24px]"
          style={{
            padding: "1px",
            background:
              "linear-gradient(180deg, rgba(238,212,152,.85), rgba(199,159,90,.55) 50%, rgba(238,212,152,.85))",
            WebkitMask:
              "linear-gradient(#000 0 0) padding-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />

        {/* Guest & Session */}
        <div className="space-y-3">
          <div className="script-gold text-xl sm:text-2xl">Dear</div>

          <div
            className={`
              inline-block rounded-2xl px-6 py-2.5
              font-display text-coffee font-semibold
              text-[22px] sm:text-[26px]
              bg-gradient-to-br from-[#f2e9dd] via-[#e6d9c5]/70 to-[#f2e9dd]
              shadow-inner
            `}
          >
            {name}
          </div>

          <div className="pt-1">
            <span className="pill-gold text-sm font-medium">
              {sessionLabel(session)}
            </span>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8">
          <a
            href="#main"
            className={`
              btn-gold inline-flex items-center justify-center gap-2
              px-6 py-3 text-sm font-semibold rounded-full
              ring-1 ring-[rgba(192,150,84,.5)]
              shadow-[0_8px_22px_-8px_rgba(192,150,84,.55)]
              hover:scale-[1.03] hover:shadow-[0_10px_28px_-10px_rgba(192,150,84,.6)]
              transition-all duration-300
            `}
          >
            <span>Open Invitation</span>
            <svg
              className="ml-1.5 h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m13 5 7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>

      {/* === local styles === */}
      <style jsx>{`
        .typing-caret {
          position: relative;
        }
        .typing-caret::after {
          content: "";
          display: inline-block;
          vertical-align: -0.1em;
          width: 0.07em;
          height: 1em;
          margin-left: 0.12em;
          border-right: 2px solid currentColor;
          animation: caretBlink 1s steps(2, start) infinite;
        }
        @keyframes caretBlink {
          0%,
          49% {
            border-color: transparent;
          }
          50%,
          100% {
            border-color: currentColor;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .petal {
            display: none !important;
          }
        }
        .petal {
          position: absolute;
          top: -10%;
          width: 14px;
          height: 10px;
          border-radius: 60% 40% 60% 40% / 60% 60% 40% 40%;
          filter: blur(0.2px);
          opacity: 0.55;
          animation: fall 10s linear infinite, drift 5s ease-in-out infinite;
        }
        /* Earth-tone variations */
        .petal-1 {
          left: 8%;
          background: radial-gradient(
            ellipse at 60% 40%,
            #c8a57a 0%,
            #b68d62 60%,
            transparent 70%
          );
        }
        .petal-2 {
          left: 20%;
          background: radial-gradient(
            ellipse at 60% 40%,
            #b47a56 0%,
            #9c6444 60%,
            transparent 70%
          );
          animation-duration: 12s;
        }
        .petal-3 {
          left: 33%;
          background: radial-gradient(
            ellipse at 60% 40%,
            #d3b185 0%,
            #ba9a6a 60%,
            transparent 70%
          );
          animation-duration: 10s;
        }
        .petal-4 {
          left: 47%;
          background: radial-gradient(
            ellipse at 60% 40%,
            #a4704d 0%,
            #8f5d3f 60%,
            transparent 70%
          );
          animation-duration: 11.5s;
        }
        .petal-5 {
          left: 60%;
          background: radial-gradient(
            ellipse at 60% 40%,
            #c9a071 0%,
            #b78b59 60%,
            transparent 70%
          );
          animation-duration: 13s;
        }
        .petal-6 {
          left: 73%;
          background: radial-gradient(
            ellipse at 60% 40%,
            #b0754f 0%,
            #9d5f3f 60%,
            transparent 70%
          );
          animation-duration: 11s;
        }
        .petal-7 {
          left: 84%;
          background: radial-gradient(
            ellipse at 60% 40%,
            #d2ad7f 0%,
            #bd986a 60%,
            transparent 70%
          );
          animation-duration: 12s;
        }
        .petal-8 {
          left: 92%;
          background: radial-gradient(
            ellipse at 60% 40%,
            #a86f4a 0%,
            #945c3d 60%,
            transparent 70%
          );
          animation-duration: 11.5s;
        }

        @keyframes fall {
          0% {
            transform: translateY(-10vh) rotate(0deg);
          }
          100% {
            transform: translateY(110vh) rotate(360deg);
          }
        }
        @keyframes drift {
          0%,
          100% {
            margin-left: 0;
            opacity: 0.35;
          }
          50% {
            margin-left: 10px;
            opacity: 0.65;
          }
        }
      `}</style>
    </section>
  );
}

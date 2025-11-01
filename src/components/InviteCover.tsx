"use client";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { MailOpen } from "lucide-react";
import { titleCase, sessionLabel } from "@/lib/format";

type Props = {
  guest?: string;
  session?: string;
  tone?: "gold" | "earth" | "none";
  focal?: "center" | "top" | "bottom";
};

export default function InviteCoverPhotoLite({
  guest,
  session = "1",
  tone = "gold",
  focal = "center",
}: Props) {
  const name = useMemo(
    () => (guest ? titleCase(guest) : "Tamu Undangan"),
    [guest]
  );

  const fullText = "You are invited to";
  const [typed, setTyped] = useState("");
  const rafRef = useRef<number | null>(null);
  useEffect(() => {
    const DURATION = 1200;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / DURATION);
      setTyped(fullText.slice(0, Math.round(p * fullText.length)));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, []);

  const posClass =
    focal === "top"
      ? "object-top"
      : focal === "bottom"
      ? "object-bottom"
      : "object-center";

  return (
    <section
      aria-label="Invitation Cover"
      className="relative min-h-[100dvh] overflow-hidden"
    >
      <div className="absolute inset-0 -z-20">
        <Image
          src="/images/invite-cover.jpg"
          alt="Wedding cover backdrop"
          fill
          priority
          sizes="100vw"
          className={`object-cover ${posClass}`}
        />
      </div>

      {tone !== "none" && (
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          {tone === "gold" ? (
            <>
              <span
                className="absolute left-1/2 top-[18%] -translate-x-1/2 w-[75vw] max-w-[560px] aspect-[1/1] rounded-full blur-[90px] opacity-35"
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, rgba(180,138,60,0.28), transparent 60%)",
                }}
              />
              <span
                className="absolute left-1/2 bottom-[-10%] -translate-x-1/2 w-[70vw] max-w-[520px] aspect-[1/1] rounded-full blur-[100px] opacity-25"
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, rgba(234,227,210,0.42), transparent 65%)",
                }}
              />
            </>
          ) : (
            <>
              <span
                className="absolute right-[-10%] top-[15%] w-[60vw] max-w-[420px] aspect-[1/1] rounded-full blur-[90px] opacity-28"
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, rgba(163,177,138,0.30), transparent 65%)",
                }}
              />
              <span
                className="absolute left-[-12%] bottom-[5%] w-[60vw] max-w-[420px] aspect-[1/1] rounded-full blur-[90px] opacity-22"
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, rgba(234,227,210,0.35), transparent 65%)",
                }}
              />
            </>
          )}
        </div>
      )}

      {/* KONTEN */}
      <div className="relative z-10 min-h-[100dvh] grid place-items-center px-6">
        <div className="w-full max-w-[420px] text-center">
          {/* typing */}
          <p
            className="script-gold text-[36px] tracking-[.16em] mb-3"
            style={{ textShadow: "0 1px 6px rgba(255,255,255,0.55)" }}
          >
            <span
              className={
                typed.length < fullText.length ? "typing-caret" : undefined
              }
            >
              {typed || "\u00A0"}
            </span>
          </p>

          {/* nama pasangan */}
          <h1
            className="font-display text-coffee text-[34px] leading-tight tracking-wide mb-8"
            style={{ textShadow: "0 2px 14px rgba(255,255,255,0.65)" }}
          >
            Daffa <span className="text-[#B89B75]">&amp;</span> Elga
          </h1>

          {/* penerima */}
          <div className="space-y-2 mb-5">
            <p className="text-[13px] text-coal/80">
              Kepada Yth.
              <br />
              <span className="font-medium">
                Bapak/Ibu/Saudara/i yang terhormat
              </span>
            </p>
            <span className="inline-block rounded-xl px-5 py-2 font-display text-coffee font-semibold bg-[rgba(255,255,255,0.88)] ring-1 ring-[rgba(0,0,0,0.06)]">
              {name}
            </span>
          </div>

          {/* label Sesi */}
          <div className="mb-8">
            <div className="text-[11px] text-coal/70 mb-1">Sesi {session}</div>
            <span className="pill-gold text-xs font-medium">
              {sessionLabel(session)}
            </span>
          </div>

          {/* CTA */}
          <a
            href="#main"
            data-open-invitation
            className="btn-gold inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold ring-1 ring-[rgba(192,150,84,.45)] hover:scale-[1.03] transition-transform"
          >
            <MailOpen className="w-4 h-4" />
            Open Invitation
          </a>
        </div>
      </div>

      {/* local styles */}
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
      `}</style>
    </section>
  );
}

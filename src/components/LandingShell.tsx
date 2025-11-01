"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Phase = "cover" | "reveal" | "main";

export default function LandingShell({
  Cover,
  Main,
}: {
  Cover: React.ReactNode;
  Main: React.ReactNode;
}) {
  const [phase, setPhase] = useState<Phase>("cover");
  const open = () => setPhase("reveal");

  return (
    <main className="relative overflow-hidden">
      {/* COVER */}
      <AnimatePresence>
        {phase === "cover" && (
          <motion.div
            key="cover"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-20"
            onClick={(e) => {
              const t = e.target as HTMLElement;
              const btn =
                t.closest("[data-open-invitation]") ||
                t.closest('a[href="#main"]');
              if (btn) {
                e.preventDefault();
                open();
              }
            }}
          >
            {Cover}
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN (fade-in + slight rise) */}
      <AnimatePresence>
        {phase !== "cover" && (
          <motion.div
            key="main"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10"
          >
            {Main}
          </motion.div>
        )}
      </AnimatePresence>

      {/* EARTH-TONE VEIL (sand→linen) + subtle gold shimmer, lalu unmount */}
      <AnimatePresence>
        {phase === "reveal" && (
          <motion.div
            key="veil"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            onAnimationComplete={() => setPhase("main")}
            className="pointer-events-none fixed inset-0 z-30"
            style={{
              // layer dasar: earth gradient (sand -> linen) + halus
              background:
                "linear-gradient(180deg, var(--color-sand, #eae3d2) 0%, color-mix(in oklab, var(--color-linen, #f4efe6) 85%, #fff 15%) 100%)",
            }}
          >
            {/* shimmer gold tipis melintas (sangat subtle) */}
            <motion.span
              initial={{ x: "-40%", opacity: 0.0 }}
              animate={{ x: "140%", opacity: 0.18 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -inset-y-20 left-0 w-[45%] block"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, color-mix(in oklab, var(--color-gold,#b48a3c) 60%, #fff 40%) 45%, transparent 100%)",
                filter: "blur(12px)",
              }}
            />

            {/* vignette + grain tipis untuk rasa lux */}
            <div
              className="absolute inset-0"
              style={{
                boxShadow: "inset 0 0 160px rgba(0,0,0,0.06)",
                mixBlendMode: "multiply",
                background:
                  "repeating-linear-gradient(0deg, rgba(0,0,0,0.02) 0, rgba(0,0,0,0.02) 1px, transparent 1px, transparent 2px), repeating-linear-gradient(90deg, rgba(0,0,0,0.02) 0, rgba(0,0,0,0.02) 1px, transparent 1px, transparent 2px)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

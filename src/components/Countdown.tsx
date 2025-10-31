"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

const TARGET_ISO = "2025-11-29T04:00:00.000Z"; // 11:00 WIB

function calcDiff(now: Date, target: Date) {
  const ms = Math.max(0, target.getTime() - now.getTime());
  const d = Math.floor(ms / 86_400_000);
  const h = Math.floor((ms % 86_400_000) / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  const s = Math.floor((ms % 60_000) / 1_000);
  return { d, h, m, s, done: ms === 0 };
}
const pad2 = (n: number) => n.toString().padStart(2, "0");

export default function Countdown() {
  const target = useMemo(() => new Date(TARGET_ISO), []);
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0, done: false });
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const tick = () => setT(calcDiff(new Date(), target));
    timerRef.current = window.setInterval(tick, 1000);
    tick();
    return () => {
      if (timerRef.current !== null) window.clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [target]);

  const boxes: [label: string, value: number][] = [
    ["Days", t.d],
    ["Hours", t.h],
    ["Minutes", t.m],
    ["Seconds", t.s],
  ];

  const containerVar: Variants = {
    hidden: { opacity: 0, y: 6 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };
  const itemVar: Variants = {
    hidden: { opacity: 0, y: 6 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "tween",
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="section bg-wedding wedding-corners relative overflow-hidden">
      <div className="container-page text-center space-y-10">
        {/* === Countdown Box (judul & angka semuanya di DALAM gambar) === */}
        <div className="relative mx-auto w-full max-w-[620px] rounded-3xl overflow-hidden shadow-soft">
          {/* Zoom-out background image */}
          <motion.div
            initial={{ scale: 1.15 }}
            animate={{ scale: 1.0 }}
            transition={{ duration: 20, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src="/images/countdown.png"
              alt="Countdown background"
              fill
              sizes="100vw"
              priority
              className="object-cover object-center"
            />
          </motion.div>

          {/* Soft scrim untuk keterbacaan */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/32 to-black/18 mix-blend-multiply" />

          {/* Overlay content (judul + angka) */}
          <div className="relative z-10 px-4 py-8 sm:py-12 flex flex-col items-center justify-center text-white">
            {/* Judul di dalam gambar */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mb-4 sm:mb-6"
            >
              <p className="font-script text-[34px] leading-none sm:text-[48px] text-gold drop-shadow-[0_2px_8px_rgba(0,0,0,.45)] max-[360px]:text-[30px]">
                Save The Date
              </p>
              <div className="h-px w-16 sm:w-24 mx-auto my-2 bg-white/50" />
              {/* <h2
                className="h2 !text-white drop-shadow-[0_2px_10px_rgba(0,0,0,.45)] max-[360px]:text-base"
                aria-label="Countdown"
              >
                Countdown
              </h2> */}
            </motion.div>

            {/* Angka countdown */}
            <motion.div
              variants={containerVar}
              initial="hidden"
              animate="show"
              className="
      flex justify-center sm:justify-center
      flex-nowrap gap-2 sm:gap-4
 sm:overflow-visible
      px-1 sm:px-0
      no-scrollbar
      w-full
    "
              aria-live="polite"
              aria-atomic="true"
            >
              {boxes.map(([k, v]) => (
                <motion.div
                  key={k}
                  variants={itemVar}
                  className="
          flex-shrink-0
          backdrop-blur-sm bg-white/10 border border-white/20
          rounded-2xl px-3 py-2 min-w-[60px]
          shadow-md transition-all hover:bg-white/20
          sm:px-5 sm:py-3 sm:min-w-[90px]
          max-[360px]:min-w-[56px] max-[360px]:px-2 max-[360px]:py-1.5
        "
                  role="group"
                  aria-label={`${k} remaining`}
                >
                  <div
                    className="
          display
          text-2xl font-semibold leading-none tracking-tight tabular-nums
          text-gold drop-shadow-[0_2px_4px_rgba(0,0,0,0.45)]
          sm:text-4xl
          max-[360px]:text-xl
        "
                  >
                    {k === "Days" ? v : pad2(v)}
                  </div>
                  <div className="text-[11px] mt-1 text-white/85 tracking-wide uppercase sm:text-[12px] max-[360px]:text-[10px]">
                    {k}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* === Token & Love Banner — sama lebar === */}
        <div className="relative mx-auto w-full max-w-[620px] rounded-2xl overflow-hidden shadow-soft">
          <div className="relative h-40 sm:h-52 md:h-64">
            <div className="absolute inset-y-0 left-0 w-1/2">
              <Image
                src="/images/banner-1.png"
                alt="Memories collage left"
                fill
                sizes="50vw"
                className="object-cover"
              />
            </div>
            <div className="absolute inset-y-0 right-0 w-1/2">
              <Image
                src="/images/banner-2.jpg"
                alt="Memories collage right"
                fill
                sizes="50vw"
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/25 via-black/35 to-black/25 mix-blend-multiply" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <p
                className="display text-white text-2xl sm:text-3xl md:text-4xl tracking-wide drop-shadow-[0_3px_14px_rgba(0,0,0,0.5)]"
                style={{ WebkitTextStroke: "0.6px rgba(0,0,0,0.25)" }}
              >
                Token <span className="text-gold">&amp;</span> Love
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

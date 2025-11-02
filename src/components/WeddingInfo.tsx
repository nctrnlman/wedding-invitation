"use client";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, Clock, MapPin } from "lucide-react";

type Props = { session?: string };

type Slide = { src: string; alt: string; focal?: "top" | "center" | "bottom" };

/* ===== Autoplay hook (tetap) ===== */
function useAutoPlay(length: number, delay = 3800) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<number | null>(null);
  const next = useCallback(
    () => length > 1 && setIndex((i) => (i + 1) % length),
    [length]
  );
  const go = useCallback(
    (n: number) => length > 0 && setIndex(((n % length) + length) % length),
    [length]
  );
  const pause = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);
  const resume = useCallback(() => {
    if (!timerRef.current && length > 1)
      timerRef.current = window.setInterval(next, delay);
  }, [delay, length, next]);
  useEffect(() => {
    resume();
    return pause;
  }, [resume, pause]);
  return { index, go, pause, resume };
}

function PortraitSlider({
  slides,
  priorityFirst = false,
}: {
  slides: Slide[];
  priorityFirst?: boolean;
}) {
  const { index, go, pause, resume } = useAutoPlay(slides.length, 3800);
  const current = useMemo(() => slides[index], [slides, index]);
  const focalClass = (f?: Slide["focal"]) =>
    f === "top"
      ? "object-top"
      : f === "bottom"
      ? "object-bottom"
      : "object-center";
  return (
    <div
      className="relative rounded-2xl overflow-hidden photo-frame tone-photo mx-auto max-w-[420px] w-full"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      <div className="relative w-full aspect-[3/4]">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.995 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={current.src}
              alt={current.alt}
              fill
              sizes="380px"
              className={`object-cover ${focalClass(current.focal)}`}
              priority={priorityFirst && index === 0}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {slides.length > 1 && (
        <div className="absolute bottom-2 left-0 right-0 flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "bg-gold w-6" : "bg-coffee/30 w-2"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ====== InfoRow kecil rapi (icon + teks) ====== */
function InfoRow({
  icon,
  children,
  highlight = false,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-center gap-2.5">
      <span
        className={`inline-grid place-items-center rounded-full w-9 h-9 border ${
          highlight
            ? "bg-gold/10 border-gold/30"
            : "bg-white/70 border-coffee/10"
        }`}
        style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.06)" }}
      >
        {icon}
      </span>
      <div className="font-display text-coffee">{children}</div>
    </div>
  );
}

/* ====== MAIN SECTION ====== */
export default function WeddingInfo({ session = "1" }: Props) {
  const gmaps = "https://share.google/m2td5slIiyda8bin4";
  const isSecond = session === "2";
  const time = isSecond ? "14.00 – 17.00 WIB" : "11.00 – 13.00 WIB";
  const sessionLabel = isSecond ? "Sesi 2" : "Sesi 1";

  const slides: Slide[] = [
    { src: "/images/wedding-info-1.JPG", alt: "Couple portrait 1" },
    { src: "/images/wedding-info-2.JPG", alt: "Couple portrait 2" },
  ];

  return (
    <section className="section bg-wedding wedding-corners relative overflow-hidden">
      {/* glow lembut */}
      <span
        aria-hidden
        className="absolute -z-10 left-10 top-12 w-72 h-72 rounded-full blur-3xl opacity-25"
        style={{
          background:
            "radial-gradient(circle, rgba(185,141,72,0.35), transparent 70%)",
        }}
      />
      <span
        aria-hidden
        className="absolute -z-10 right-10 bottom-12 w-80 h-80 rounded-full blur-3xl opacity-25"
        style={{
          background:
            "radial-gradient(circle, rgba(163,177,138,0.25), transparent 70%)",
        }}
      />

      <div className="container-page text-center space-y-8">
        {/* Heading */}
        <div>
          <p className="script-gold text-4xl mb-1">Join Our Moment</p>
          <h2 className="h2">Wedding Day</h2>
        </div>

        {/* Foto portrait slider */}
        <PortraitSlider slides={slides} priorityFirst />

        {/* ====== KARTU INFO — versi premium & simetris ====== */}
        {/* ====== KARTU INFO — versi rapi & stabil ====== */}
        <div className="relative mx-auto w-full max-w-[520px]">
          {/* ambient glow bawah */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -bottom-6 h-24 rounded-full blur-3xl opacity-30"
            style={{
              background:
                "radial-gradient(circle, rgba(185,141,72,0.35), transparent 70%)",
            }}
          />

          {/* wrapper gradient tipis */}
          <div
            className="relative rounded-2xl p-[1px] bg-gradient-to-tr from-gold/60 to-white/60"
            style={{
              boxShadow:
                "0 10px 35px rgba(0,0,0,0.08), 0 0 0 1px rgba(185,141,72,0.15)",
            }}
          >
            {/* isi kartu */}
            <div className="paper relative rounded-2xl px-6 sm:px-7 py-8 text-center space-y-5">
              {/* Crest inisial (fixed) */}
              <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                <div className="grid place-items-center w-10 h-10 rounded-full bg-white border border-gold/40 shadow-soft">
                  <span className="font-display text-[11px] tracking-wide text-coffee">
                    D & E
                  </span>
                </div>
              </div>
              {/* spacer biar crest tidak menabrak konten */}
              <div className="pt-2" />

              {/* Tanggal */}
              <div className="flex items-center justify-center gap-2.5">
                <span
                  className="inline-grid place-items-center rounded-full w-9 h-9 border bg-white/70 border-coffee/10"
                  style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.06)" }}
                >
                  <CalendarDays size={18} className="text-coffee" />
                </span>
                <p className="font-display text-coffee text-base tracking-wide">
                  Sabtu, 29 November 2025
                </p>
              </div>

              {/* Akad & Resepsi (blok simetris) */}
              <div className="grid grid-cols-1  gap-4 sm:gap-5">
                {/* Akad */}
                <div className="rounded-xl  p-4 space-y-2">
                  <div className="flex justify-center">
                    <span className="pill-gold text-xs font-medium">Akad</span>
                  </div>
                  <div className="flex items-center justify-center gap-2.5">
                    <span
                      className="inline-grid place-items-center rounded-full w-9 h-9 border bg-gold/10 border-gold/30"
                      style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.06)" }}
                    >
                      <Clock size={18} className="text-[#B89B75]" />
                    </span>
                    <p className="font-display text-[#B89B75] text-xl font-semibold tracking-wide">
                      08.00 – Selesai WIB
                    </p>
                  </div>
                </div>

                {/* Resepsi */}
                <div className="rounded-xl  border-coffee/10  p-4 space-y-2">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <span className="pill-gold text-xs font-medium">
                      Resepsi
                    </span>
                    <span className="text-[11px] text-coal/70">
                      {sessionLabel}
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2.5">
                    <span
                      className="inline-grid place-items-center rounded-full w-9 h-9 border bg-gold/10 border-gold/30"
                      style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.06)" }}
                    >
                      <Clock size={18} className="text-[#B89B75]" />
                    </span>
                    <p className="font-display text-[#B89B75] text-xl font-semibold tracking-wide">
                      {time}
                    </p>
                  </div>
                </div>
              </div>

              {/* Divider halus */}
              <div className="w-14 h-[1px] mx-auto bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

              {/* Lokasi */}
              <div className="space-y-1 pt-1">
                <div className="font-display text-xl text-coffee font-semibold">
                  Kodjo Coffee
                </div>
                <p className="p-muted text-sm leading-relaxed">
                  Jl. Sariendah No.17B, Gegerkalong, Bandung
                </p>
              </div>

              {/* CTA Maps */}
              <a
                href={gmaps}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full font-medium transition-all duration-300 hover:scale-[1.05] hover:shadow-lg active:scale-[0.99] w-full"
              >
                <MapPin size={18} strokeWidth={1.6} />
                <span>Lihat di Google Maps</span>
              </a>
            </div>
          </div>
        </div>
        {/* ====== /KARTU INFO ====== */}

        {/* ====== /KARTU INFO ====== */}
      </div>
    </section>
  );
}

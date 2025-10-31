"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type StoryItem = {
  title: string;
  text: string;
  photos: string[];
};

const items: StoryItem[] = [
  {
    title: "Awal Pertemuan (Maret 2025)",
    text:
      "Berawal dari pertemuan singkat antara cust dan kasir di Kodjo Coffee. " +
      "Dari beberapa pertemuan yang tidak direncanakan, muncul rasa nyaman yang tumbuh begitu saja.",
    photos: [
      "/images/love-story-1-a.JPG",
      "/images/love-story-1-b.JPG",
      "/images/love-story-1-c.JPG",
    ],
  },
  {
    title: "Komitmen",
    text:
      "Perasaan yang tulus ini menuntun kami pada keputusan besar dalam hidup. " +
      "Kami memilih untuk saling menggenggam erat, mengikat janji suci, dan menata masa depan bersama.",
    photos: ["/images/love-story-2-a.JPG", "/images/love-story-2-b.JPG"],
  },
  {
    title: "Skenario Indah dari Tuhan",
    text:
      "Dulu hanya pertemuan biasa, kini menjadi kisah yang luar biasa. " +
      "Yang sederhana ternyata telah disiapkan Tuhan untuk menjadi selamanya.",
    photos: ["/images/love-story-3-a.jpg"],
  },
];

function useAutoPlay(length: number, delay = 3500) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<number | null>(null);

  const next = useCallback(() => {
    if (length <= 1) return;
    setIndex((i) => (i + 1) % length);
  }, [length]);

  const go = useCallback(
    (n: number) => {
      if (length <= 0) return;
      const m = ((n % length) + length) % length;
      setIndex(m);
    },
    [length]
  );

  const pause = useCallback(() => {
    if (timerRef.current != null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const resume = useCallback(() => {
    if (timerRef.current != null) return;
    if (length <= 1) return;
    timerRef.current = window.setInterval(next, delay);
  }, [delay, length, next]);

  useEffect(() => {
    resume();
    return pause;
  }, [resume, pause]);

  return { index, go, pause, resume };
}

export default function LoveStory() {
  return (
    <section className="section bg-wedding wedding-corners relative overflow-hidden">
      <div className="container-page text-center space-y-10">
        <div>
          <p className="script-gold text-4xl mb-1">Our Journey</p>
          <h2 className="h2">Love Story</h2>
        </div>

        <div className="space-y-12">
          {items.map((it, i) => (
            <StoryBlock key={i} item={it} reversed={i % 2 !== 0} order={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StoryBlock({
  item,
  reversed,
  order,
}: {
  item: StoryItem;
  reversed?: boolean;
  order: number;
}) {
  const photos = useMemo(() => item.photos ?? [], [item.photos]);
  const { index, go, pause, resume } = useAutoPlay(photos.length, 3800);

  const onDragEnd = (_: any, info: { offset: { x: number } }) => {
    const dx = info.offset.x;
    if (Math.abs(dx) < 40) return;
    if (dx < 0) go(index + 1);
    else go(index - 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: order * 0.08 }}
      className={`
    flex flex-col sm:flex-row gap-6 items-center
    ${reversed ? "sm:flex-row-reverse" : ""}
  `}
    >
      <div className="flex-shrink-0 sm:w-[45%] w-full">
        <div
          className="relative rounded-2xl overflow-hidden photo-frame"
          onMouseEnter={pause}
          onMouseLeave={resume}
          style={{ touchAction: "pan-y" }}
        >
          <div className="relative h-[260px] sm:h-[320px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${order}-${index}`}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.995 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="absolute inset-0"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.15}
                  onDragEnd={onDragEnd}
                >
                  <Image
                    src={photos[index]}
                    alt={`${item.title} – ${index + 1}`}
                    fill
                    sizes="(max-width:768px) 100vw, 45vw"
                    className="object-cover"
                    priority={order === 0 && index === 0}
                    style={{
                      filter:
                        "saturate(1.05) sepia(0.08) hue-rotate(5deg) brightness(1.02)",
                    }}
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
          {photos.length > 1 && (
            <div className="absolute bottom-2 left-0 right-0 flex items-center justify-center gap-2">
              {photos.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => go(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "bg-gold w-6" : "bg-coffee/30 w-2"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 w-full">
        <div
          className="
        paper text-left rounded-2xl p-6 md:p-7 space-y-2
        relative z-10
      "
          style={{
            boxShadow:
              "0 8px 40px rgba(0,0,0,0.08), 0 -2px 0 color-mix(in oklab, var(--color-gold) 28%, transparent)",
          }}
        >
          <h3 className="h3 text-coffee">{item.title}</h3>
          <p className="p-muted text-sm leading-relaxed whitespace-pre-wrap">
            {item.text}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

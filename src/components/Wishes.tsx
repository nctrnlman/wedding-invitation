"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

type Wish = { name: string; message: string; ts: number };

const MAX_NAME = 40;
const MAX_MSG = 400;

function formatTs(ts: number) {
  try {
    return new Intl.DateTimeFormat("id-ID", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Jakarta",
    }).format(new Date(ts));
  } catch {
    return "";
  }
}

export default function Wishes() {
  const [list, setList] = useState<Wish[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [justAdded, setJustAdded] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const liveRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/wishes", { cache: "no-store" });
        const data = await res.json();
        setList(Array.isArray(data.items) ? data.items : []);
      } catch {
        setError("Gagal memuat ucapan.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const validName = name.trim().slice(0, MAX_NAME);
  const validMsg = message.trim().slice(0, MAX_MSG);
  const canSend = validName.length > 0 && validMsg.length > 0 && !submitting;

  const counts = useMemo(
    () => ({ name: validName.length, msg: validMsg.length }),
    [validName.length, validMsg.length]
  );

  const pct = (v: number, max: number) =>
    Math.min(100, Math.round((v / max) * 100));

  const add = async () => {
    if (!canSend) return;
    setSubmitting(true);
    setError(null);

    const optimistic: Wish = {
      name: validName,
      message: validMsg,
      ts: Date.now(),
    };
    setList((prev) => [optimistic, ...prev]);

    setName("");
    setMessage("");
    setJustAdded(validName);
    if (liveRef.current) {
      liveRef.current.textContent = `Ucapan dari ${validName} ditambahkan`;
      setTimeout(
        () => liveRef.current && (liveRef.current.textContent = ""),
        900
      );
    }

    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: optimistic.name,
          message: optimistic.message,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data?.error || "Gagal mengirim ucapan.");
        setList((prev) =>
          prev.filter(
            (w) => !(w.ts === optimistic.ts && w.name === optimistic.name)
          )
        );
      } else {
        const data = await res.json().catch(() => ({}));
        const saved = data?.item as Wish | undefined;
        if (saved) {
          setList((prev) => {
            const copy = [...prev];
            const idx = copy.findIndex(
              (w) => w.ts === optimistic.ts && w.name === optimistic.name
            );
            if (idx !== -1) copy[idx] = saved;
            return copy;
          });
        }
      }
    } catch {
      setError("Jaringan bermasalah. Coba lagi.");
      setList((prev) =>
        prev.filter(
          (w) => !(w.ts === optimistic.ts && w.name === optimistic.name)
        )
      );
    } finally {
      setSubmitting(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") add();
  };

  const itemVar: Variants = {
    hidden: { opacity: 0, y: 6 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "tween",
        duration: 0.22,
        ease: [0.22, 1, 0.36, 1], // ≈ easeOut
      },
    },
    exit: {
      opacity: 0,
      y: -4,
      transition: {
        type: "tween",
        duration: 0.16,
        ease: [0.4, 0, 0.2, 1], // ≈ easeInOut
      },
    },
  };

  return (
    <section className="section wedding-corners relative overflow-hidden">
      <div className="container-page">
        {/* Header */}
        <div className="text-center mb-5">
          <p className="script-gold text-3xl">Warm Wishes</p>
          <h2 className="h2 mt-1">Kirim Ucapan</h2>
        </div>

        {/* FORM — mobile-only */}
        <div className="space-y-3">
          {/* Nama */}
          <div
            className="rounded-2xl p-[1px]"
            style={{
              background:
                "linear-gradient(140deg, rgba(185,141,72,0.45), rgba(255,255,255,0.7))",
            }}
          >
            <div className="paper rounded-2xl px-3 py-3">
              <label
                htmlFor="wish-name"
                className="block text-[12px] p-muted mb-1"
              >
                Nama
              </label>
              <input
                id="wish-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama Anda"
                maxLength={MAX_NAME}
                className="w-full bg-transparent outline-none rounded-md px-3 py-3 text-coffee text-base"
                aria-label="Nama"
                inputMode="text"
              />
              <div className="mt-2 h-1 w-full rounded  overflow-hidden">
                <div
                  className="h-full bg-gold transition-all"
                  style={{ width: `${pct(counts.name, MAX_NAME)}%` }}
                />
              </div>
              <div className="mt-1 text-[11px] p-muted tabular-nums text-right">
                {counts.name}/{MAX_NAME}
              </div>
            </div>
          </div>

          {/* Ucapan */}
          <div
            className="rounded-2xl p-[1px]"
            style={{
              background:
                "linear-gradient(140deg, rgba(185,141,72,0.45), rgba(255,255,255,0.7))",
            }}
          >
            <div className="paper rounded-2xl px-3 py-3">
              <label
                htmlFor="wish-message"
                className="block text-[12px] p-muted mb-1"
              >
                Ucapan
              </label>
              <textarea
                id="wish-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Tulis doa & ucapan terbaik untuk kedua mempelai…"
                rows={5}
                maxLength={MAX_MSG}
                className="w-full bg-transparent outline-none rounded-md px-3 py-3 text-coffee text-base resize-y"
                aria-label="Ucapan"
              />
              <div className="mt-2 h-1 w-full rounded overflow-hidden">
                <div
                  className="h-full bg-gold transition-all"
                  style={{ width: `${pct(counts.msg, MAX_MSG)}%` }}
                />
              </div>
              <div className="mt-1 flex items-center justify-between text-[11px] p-muted">
                <span className="tabular-nums">
                  {counts.msg}/{MAX_MSG}
                </span>
              </div>
            </div>
          </div>

          {/* Tombol Kirim Ucapan */}
          <button
            onClick={add}
            disabled={!canSend}
            className={`btn-gold inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full font-medium transition-all duration-300 w-full cursor-pointer ${
              canSend
                ? "hover:scale-[1.04] hover:shadow-md"
                : "opacity-60 cursor-not-allowed"
            }`}
          >
            <span className="font-display text-[15px]">
              {submitting ? "Mengirim…" : "Kirim Ucapan"}
            </span>
          </button>

          {/* live + alerts */}
          <div
            ref={liveRef}
            className="sr-only"
            aria-live="polite"
            aria-atomic="true"
          />
          {justAdded && (
            <div className="text-xs text-center p-muted">
              Terima kasih, <span className="font-semibold">{justAdded}</span>!
              Ucapanmu sudah terkirim.
            </div>
          )}
          {error && (
            <div className="text-xs text-red-600 text-center">{error}</div>
          )}
        </div>

        {/* LIST — compact, tanpa “putih” di bawah */}
        <div className="mt-8">
          <h3 className="h2 mb-3 text-center">Doa &amp; Ucapan</h3>

          <div className="relative">
            {/* mask bawah pakai tone linen, bukan putih */}
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 z-10"
            />

            <ul className="space-y-2.5 max-h-[520px] overflow-auto pr-1">
              {loading && (
                <li
                  className="rounded-xl"
                  style={{
                    background:
                      "color-mix(in oklab, var(--color-linen) 85%, transparent)",
                    border:
                      "1px solid color-mix(in oklab, var(--color-clay) 32%, transparent)",
                  }}
                >
                  <div className="p-4">
                    <div className="h-3 w-24 bg-coffee/10 rounded mb-3" />
                    <div className="h-3 w-40 bg-coffee/10 rounded mb-2" />
                    <div className="h-3 w-56 bg-coffee/10 rounded" />
                  </div>
                </li>
              )}

              {!loading && list.length === 0 && (
                <li
                  className="rounded-xl p-5 text-center p-muted"
                  style={{
                    background:
                      "color-mix(in oklab, var(--color-linen) 85%, transparent)",
                    border:
                      "1px solid color-mix(in oklab, var(--color-clay) 32%, transparent)",
                  }}
                >
                  Belum ada ucapan. Jadilah yang pertama ✨
                </li>
              )}

              <AnimatePresence initial={false}>
                {list.map((w, i) => (
                  <motion.li
                    key={`${w.ts}-${i}`}
                    variants={itemVar}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className="rounded-xl"
                    style={{
                      background:
                        "color-mix(in oklab, var(--color-linen) 90%, transparent)",
                      border:
                        "1px solid color-mix(in oklab, var(--color-clay) 30%, transparent)",
                      boxShadow: "0 6px 18px rgba(0,0,0,0.04)",
                    }}
                  >
                    <div className="px-3.5 py-3">
                      <div className="flex items-start gap-3">
                        {/* Avatar inisial (sedikit lebih kecil) */}
                        <div
                          aria-hidden
                          className="flex-shrink-0 w-9 h-9 rounded-full grid place-items-center text-[12px] font-semibold text-coffee"
                          style={{
                            background:
                              "color-mix(in oklab, var(--color-linen) 80%, #fff 10%)",
                            border:
                              "1px solid color-mix(in oklab, var(--color-clay) 35%, transparent)",
                          }}
                        >
                          {w.name.slice(0, 2).toUpperCase()}
                        </div>

                        <div className="flex-1 min-w-0">
                          {/* Baris nama & waktu jadi satu, compact */}
                          <div className="flex items-center justify-between gap-3">
                            <div className="font-display text-coffee text-[15px] leading-tight truncate">
                              {w.name}
                            </div>
                            <time
                              dateTime={new Date(w.ts).toISOString()}
                              className="text-[11px] p-muted tabular-nums flex-shrink-0 leading-none"
                              title={new Date(w.ts).toLocaleString()}
                            >
                              {formatTs(w.ts)}
                            </time>
                          </div>

                          {/* Pesan, jarak kecil */}
                          <p className="p-muted mt-1.5 text-[14px] leading-relaxed whitespace-pre-wrap">
                            {w.message}
                          </p>
                        </div>
                      </div>

                      {/* Divider tipis antar kartu (hilang di last) */}
                      <div className="mt-3 h-px w-full bg-coffee/5 rounded-full" />
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>
        </div>
      </div>

      {/* scrollbar halus (scoped) */}
      <style jsx>{`
        ul::-webkit-scrollbar {
          width: 10px;
        }
        ul::-webkit-scrollbar-track {
          background: transparent;
        }
        ul::-webkit-scrollbar-thumb {
          background: rgba(180, 138, 60, 0.25);
          border-radius: 999px;
        }
        ul::-webkit-scrollbar-thumb:hover {
          background: rgba(180, 138, 60, 0.35);
        }
      `}</style>
    </section>
  );
}

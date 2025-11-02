"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type RsvpPayload = {
  name: string;
  attend: boolean;
  count: 1 | 2 | null;
};

const MAX_NAME = 40;

function normalizeName(input?: string | null) {
  if (!input) return "";
  try {
    input = decodeURIComponent(input);
  } catch {}
  return input.replace(/\s+/g, " ").trim().slice(0, MAX_NAME);
}

export default function Rsvp({
  guest = "",
  defaultAttend,
  defaultCount,
}: {
  guest?: string;
  /** opsional: preselect attend (true/false) */
  defaultAttend?: boolean;
  /** opsional: preselect count (1 atau 2) */
  defaultCount?: 1 | 2;
}) {
  const [name, setName] = useState<string>(() => normalizeName(guest));
  const [attend, setAttend] = useState<"" | "yes" | "no">(
    typeof defaultAttend === "boolean" ? (defaultAttend ? "yes" : "no") : ""
  );
  const [count, setCount] = useState<"" | "1" | "2">(
    defaultCount === 2 ? "2" : defaultCount === 1 ? "1" : ""
  );

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [okMsg, setOkMsg] = useState<string | null>(null);
  const liveRef = useRef<HTMLDivElement | null>(null);

  // Prefill nama dari props bila field masih kosong
  useEffect(() => {
    const pre = normalizeName(guest);
    if (!name && pre) setName(pre);
  }, [guest, name]);

  const canSend = useMemo(() => {
    if (!name.trim()) return false;
    if (attend === "") return false;
    if (attend === "yes" && count === "") return false;
    return !submitting;
  }, [name, attend, count, submitting]);

  const submit = async () => {
    if (!canSend) return;
    setSubmitting(true);
    setError(null);
    setOkMsg(null);

    const payload: RsvpPayload = {
      name: name.trim().slice(0, MAX_NAME),
      attend: attend === "yes",
      count: attend === "yes" ? ((count as "1" | "2") === "2" ? 2 : 1) : null,
    };

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data?.error || "Gagal menyimpan RSVP.");
      } else {
        setOkMsg(
          payload.attend
            ? `Terima kasih! Tercatat hadir sebanyak ${payload.count} orang.`
            : "Terima kasih! Tercatat berhalangan hadir."
        );
        if (liveRef.current) {
          liveRef.current.textContent = "RSVP tersimpan";
          setTimeout(() => {
            if (liveRef.current) liveRef.current.textContent = "";
          }, 900);
        }
      }
    } catch {
      setError("Jaringan bermasalah. Coba lagi.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="section wedding-corners relative overflow-hidden">
      <div className="container-page">
        <div className="text-center mb-5">
          <p className="script-gold text-3xl">RSVP</p>
          <h2 className="h2 mt-1">Konfirmasi Kehadiran</h2>
        </div>

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
                htmlFor="rsvp-name"
                className="block text-[12px] p-muted mb-1"
              >
                Nama
              </label>
              <input
                id="rsvp-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama Anda"
                maxLength={MAX_NAME}
                className="w-full bg-transparent outline-none rounded-md px-3 py-3 text-coffee text-base"
                aria-label="Nama"
                inputMode="text"
              />
            </div>
          </div>

          {/* Akan Hadir? */}
          <div
            className="rounded-2xl p-[1px]"
            style={{
              background:
                "linear-gradient(140deg, rgba(185,141,72,0.45), rgba(255,255,255,0.7))",
            }}
          >
            <div className="paper rounded-2xl px-3 py-3">
              <span className="block text-[12px] p-muted mb-1">
                Akan hadir?
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setAttend("yes")}
                  className={`rounded-full px-4 py-2 border transition ${
                    attend === "yes"
                      ? "border-gold bg-gold/10"
                      : "border-coffee/20 hover:border-coffee/40"
                  }`}
                  aria-pressed={attend === "yes"}
                >
                  Ya
                </button>
                <button
                  type="button"
                  onClick={() => setAttend("no")}
                  className={`rounded-full px-4 py-2 border transition ${
                    attend === "no"
                      ? "border-gold bg-gold/10"
                      : "border-coffee/20 hover:border-coffee/40"
                  }`}
                  aria-pressed={attend === "no"}
                >
                  Tidak
                </button>
              </div>
            </div>
          </div>

          {/* Jumlah Orang (muncul hanya jika hadir == yes) */}
          {attend === "yes" && (
            <div
              className="rounded-2xl p-[1px]"
              style={{
                background:
                  "linear-gradient(140deg, rgba(185,141,72,0.45), rgba(255,255,255,0.7))",
              }}
            >
              <div className="paper rounded-2xl px-3 py-3">
                <span className="block text-[12px] p-muted mb-1">
                  Jumlah yang akan hadir
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setCount("1")}
                    className={`rounded-full px-4 py-2 border transition ${
                      count === "1"
                        ? "border-gold bg-gold/10"
                        : "border-coffee/20 hover:border-coffee/40"
                    }`}
                    aria-pressed={count === "1"}
                  >
                    1 Orang
                  </button>
                  <button
                    type="button"
                    onClick={() => setCount("2")}
                    className={`rounded-full px-4 py-2 border transition ${
                      count === "2"
                        ? "border-gold bg-gold/10"
                        : "border-coffee/20 hover:border-coffee/40"
                    }`}
                    aria-pressed={count === "2"}
                  >
                    2 Orang
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Submit */}
          <button
            onClick={submit}
            disabled={!canSend}
            className={`btn-gold inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full font-medium transition-all duration-300 w-full cursor-pointer ${
              canSend
                ? "hover:scale-[1.04] hover:shadow-md"
                : "opacity-60 cursor-not-allowed"
            }`}
          >
            <span className="font-display text-[15px]">
              {submitting ? "Menyimpan…" : "Kirim Konfirmasi"}
            </span>
          </button>

          {/* Live region + alerts */}
          <div
            ref={liveRef}
            className="sr-only"
            aria-live="polite"
            aria-atomic="true"
          />
          {okMsg && (
            <div className="text-xs text-center text-emerald-700">{okMsg}</div>
          )}
          {error && (
            <div className="text-xs text-center text-red-600">{error}</div>
          )}
        </div>
      </div>
    </section>
  );
}

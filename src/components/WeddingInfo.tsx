"use client";
import Image from "next/image";
import { CalendarDays, Clock, MapPin } from "lucide-react";

type Props = { session?: string };

/**
 * Foto portrait dengan frame & aspect ratio rapi.
 * - by default pakai aspect-[3/4] (portrait).
 * - kalau mau sedikit lebih lebar, ganti ke aspect-[2/3].
 */
function PortraitPhoto({
  src,
  alt,
  focal = "center", // "top" | "center" | "bottom"
  priority = false,
}: {
  src: string;
  alt: string;
  focal?: "top" | "center" | "bottom";
  priority?: boolean;
}) {
  const pos =
    focal === "top"
      ? "object-top"
      : focal === "bottom"
      ? "object-bottom"
      : "object-center";

  return (
    <div className="relative rounded-2xl overflow-hidden photo-frame tone-photo mx-auto max-w-[420px] w-full">
      <div className="relative w-full aspect-[3/4]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width:768px) 100vw, 420px"
          className={`object-cover ${pos}`}
          priority={priority}
        />
      </div>
    </div>
  );
}

export default function WeddingInfo({ session = "1" }: Props) {
  const gmaps = "https://share.google/m2td5slIiyda8bin4";
  const time = session === "2" ? "14.00 – 17.00 WIB" : "11.00 – 13.00 WIB";

  return (
    <section className="section bg-wedding wedding-corners relative overflow-hidden">
      {/* soft background glow */}
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

        {/* Foto 1 (portrait) */}
        <PortraitPhoto
          src="/images/wedding-info-1.JPG"
          alt="Couple portrait 1"
          focal="center" // atur ke "top" kalau wajah di bagian atas foto
          priority={false}
        />

        {/* Card Tengah (refined premium style) */}
        <div className="relative mx-auto max-w-[520px] w-full">
          {/* soft ambient glow */}
          <div
            aria-hidden
            className="absolute inset-x-0 -bottom-6 h-24 rounded-full blur-3xl opacity-30"
            style={{
              background:
                "radial-gradient(circle, rgba(185,141,72,0.35), transparent 70%)",
            }}
          />

          {/* gradient border card */}
          <div
            className="relative rounded-2xl p-[1px] bg-gradient-to-tr from-gold/60 to-white/60 shadow-soft"
            style={{
              boxShadow:
                "0 10px 35px rgba(0,0,0,0.08), 0 0 0 1px rgba(185,141,72,0.15)",
            }}
          >
            <div className="paper rounded-2xl p-8 text-center space-y-5">
              {/* Header tanggal & jam */}
              <div className="space-y-3">
                {/* tanggal */}
                <div className="inline-flex items-center gap-2 text-coffee">
                  <CalendarDays size={18} />
                  <p className="font-display text-base md:text-lg tracking-wide">
                    Minggu, 29 November 2025
                  </p>
                </div>

                {/* garis pemisah halus */}
                <div className="w-10 mx-auto h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

                {/* jam */}
                <div className="inline-flex items-center gap-2 text-gold">
                  <Clock size={20} />
                  <p className="font-display text-2xl md:text-3xl tracking-wide font-semibold">
                    {time}
                  </p>
                </div>
              </div>

              {/* Lokasi */}
              <div className="space-y-1">
                <div className="font-display h2 text-coffee">Kodjo Coffee</div>
                <div className="p-muted text-sm leading-relaxed">
                  Jl. Sariendah No.17B, Gegerkalong, Bandung
                </div>
              </div>

              {/* Divider kecil sebelum tombol */}
              <div className="w-12 mx-auto h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

              {/* Tombol Google Maps */}
              <a
                href={gmaps}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full font-medium hover:scale-[1.04] hover:shadow-md transition-all duration-300"
              >
                <MapPin size={18} strokeWidth={1.6} />
                <span>Lihat di Google Maps</span>
              </a>
            </div>
          </div>
        </div>

        {/* Foto 2 (portrait) */}
        <PortraitPhoto
          src="/images/wedding-info-2.JPG"
          alt="Couple portrait 2"
          focal="center"
          priority={false}
        />
      </div>
    </section>
  );
}

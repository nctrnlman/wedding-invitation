import Image from "next/image";
import { CalendarDays } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="main"
      className="bg-wedding wedding-corners relative overflow-hidden h-screen py-16 md:py-20"
      aria-label="Hero"
    >
      {/* === soft golden glow accents === */}
      <span
        aria-hidden
        className="pointer-events-none absolute -z-10 left-[-60px] top-[-40px] w-[240px] h-[240px] rounded-full blur-3xl opacity-25"
        style={{
          background:
            "radial-gradient(circle, rgba(185,141,72,0.35), transparent 60%)",
        }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -z-10 right-[-40px] bottom-[-40px] w-[260px] h-[260px] rounded-full blur-3xl opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(163,177,138,0.28), transparent 60%)",
        }}
      />

      <div className="container-page text-center space-y-6">
        {/* === Heading === */}
        <div>
          <p className="script-gold text-4xl mb-2">The Wedding of</p>
        </div>

        {/* === Photo === */}
        <figure
          className="relative rounded-[18px] overflow-hidden mx-auto"
          style={{
            padding: "1px",
            background:
              "linear-gradient(180deg, rgba(185,141,72,0.38), rgba(255,255,255,0.6))",
            boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
          }}
        >
          <div className="relative aspect-[3/4] w-full rounded-[17px] photo-frame">
            <Image
              src="/images/cover.jpg"
              alt="Foto pasangan Daffa & Elga"
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover"
              priority
            />
            {/* subtle gradient overlay */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/15 via-black/5 to-transparent mix-blend-multiply" />

            {/* tiny corner gold dots */}
            <span className="pointer-events-none absolute left-3 top-3 h-1.5 w-1.5 rounded-full bg-gold/70" />
            <span className="pointer-events-none absolute right-3 bottom-3 h-1.5 w-1.5 rounded-full bg-gold/70" />
          </div>

          {/* === Caption === */}
          <figcaption className="pt-6 pb-2">
            <h2 className="h2">
              Daffa <span className="text-gold">&amp;</span> Elga
            </h2>

            {/* gold divider line */}
            <div className="h-[2px] w-28 bg-gradient-to-r from-transparent via-[#B89B75] to-transparent mx-auto my-3 rounded-full" />

            {/* date */}
            <div className="flex justify-center">
              <span className="pill-gold inline-flex items-center gap-1.5 text-xs">
                <CalendarDays className="h-3.5 w-3.5" />
                Minggu, 29 November 2025
              </span>
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

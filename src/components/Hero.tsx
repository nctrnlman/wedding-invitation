import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="main"
      className="
        bg-wedding wedding-corners relative overflow-hidden
        py-16 md:py-24
      "
      aria-label="Hero"
    >
      {/* soft glow accents */}
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

      <div className="container-page grid md:grid-cols-5 gap-8 items-center">
        {/* LEFT: Heading */}
        <div className="md:col-span-2 text-center md:text-left space-y-3">
          <p className="script-gold text-4xl">The Wedding of</p>

          <div className="relative inline-block">
            {/* subtle gold halo behind names */}
            <span
              aria-hidden
              className="absolute inset-0 rounded-lg blur-2xl opacity-30"
              style={{
                background:
                  "radial-gradient(60% 60% at 50% 50%, rgba(185,141,72,0.28), transparent 70%)",
              }}
            />
            <h2 className="h2 relative">
              Daffa <span className="text-gold">&amp;</span> Elga
            </h2>
          </div>

          {/* thin gold divider */}
          <div className="h-[2px] w-24 md:w-28 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto my-2 rounded-full" />
        </div>

        {/* RIGHT: Photo */}
        <div className="md:col-span-3">
          <div className="relative rounded-2xl overflow-hidden photo-frame">
            {/* image wrapper with fixed aspect for nice fold on mobile */}
            <div className="relative aspect-[3/4] w-full">
              <Image
                src="/images/cover.jpg"
                alt="Foto pasangan Daffa & Elga"
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover"
                priority
              />
            </div>

            {/* very soft scrim at bottom to add depth */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/15 via-black/5 to-transparent mix-blend-multiply" />

            {/* tiny gold corner dots (lux detail) */}
            <span className="pointer-events-none absolute left-3 top-3 h-1.5 w-1.5 rounded-full bg-gold/70" />
            <span className="pointer-events-none absolute right-3 bottom-3 h-1.5 w-1.5 rounded-full bg-gold/70" />
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";
import Image from "next/image";

export default function ThankYou() {
  return (
    <section className="section bg-wedding wedding-corners relative overflow-hidden">
      <div className="container-page text-center space-y-8">
        <div className="relative aspect-[3/2] rounded-2xl overflow-hidden shadow-soft mx-auto w-full">
          <Image
            src="/images/thanks.png"
            alt="Thank you"
            fill
            sizes="100vw"
            priority
            className="object-cover w-full h-full"
          />

          <div className="absolute inset-0 bg-sand/20 mix-blend-multiply" />
        </div>

        {/* Teks ucapan */}
        <div className="max-w-[360px] sm:max-w-[420px] mx-auto space-y-4">
          <p className="script-gold text-5xl">Thank You</p>

          <p className="text-muted text-sm py-2 leading-relaxed text-coal/80">
            Merupakan suatu kebahagiaan dan kehormatan bagi kami apabila
            Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu kepada
            kami.
          </p>

          <p className="font-display text-lg text-coffee">
            Daffa <span className="text-gold">&</span> Elga
          </p>
        </div>
      </div>
    </section>
  );
}

"use client";
import Image from "next/image";

export default function ThankYou() {
  return (
    <section className="section bg-wedding wedding-corners relative overflow-hidden">
      <div className="container-page text-center space-y-8">
        {/* ===== Gambar Portrait + Heading di Atas ===== */}
        <figure className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-soft mx-auto w-full max-w-[420px]">
          <Image
            src="/images/thanks.png"
            alt="Thank you"
            fill
            sizes="380px"
            priority
            className="object-cover object-center"
          />

          {/* Glaze hangat agar teks kebaca tanpa menggelapkan foto */}
          <div className="absolute inset-0 bg-sand/25 mix-blend-multiply" />

          {/* Judul di bagian atas-tengah */}
          <figcaption className="absolute top-6 left-0 right-0 flex justify-center">
            <p className="script-gold !text-[#B89B75] text-5xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]">
              Thank You
            </p>
          </figcaption>
        </figure>

        {/* ===== Ucapan Singkat ===== */}
        <div className="max-w-[360px] mx-auto space-y-3">
          <p className="text-sm leading-relaxed text-coal/80">
            Merupakan suatu kebahagiaan dan kehormatan bagi kami apabila
            Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu kepada
            kami.
          </p>
          {/* <p className="font-display text-lg text-coffee">
            Daffa <span className="text-gold">&</span> Elga
          </p> */}
        </div>

        {/* ===== Turut Mengundang (kartu premium) ===== */}
        <div className="relative mx-auto w-full max-w-[420px]">
          {/* Bingkai gradasi halus */}
          <div
            className="rounded-2xl p-[1px] bg-gradient-to-tr from-gold/60 via-white/60 to-gold/35 shadow-soft"
            style={{
              boxShadow:
                "0 12px 28px rgba(0,0,0,0.08), 0 0 0 1px rgba(185,141,72,0.12)",
            }}
          >
            <div className="paper rounded-2xl p-5">
              {/* Heading */}
              <div className="text-center mb-4">
                <p className="font-display text-coffee text-base tracking-wide">
                  Turut Mengundang
                </p>
                <div className="w-10 h-px mx-auto mt-2 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
              </div>

              {/* Dua kolom yang rapi (tetap mobile-friendly di 380px) */}
              <div className="grid grid-cols-1 gap-5 text-left">
                {/* Kolom Kiri */}
                <div>
                  <ol className="list-decimal pl-5 space-y-1.5 text-sm text-coal/80">
                    <li>Kel. Besar Bandung</li>
                    <li>Kel. Besar Bogor</li>
                    <li>Brigjen TNI Asep Dedi Darmadi, S.IP</li>
                    <li>
                      Bpk. Ali Abudan{" "}
                      <span className="whitespace-nowrap">
                        (Ketua DPD Gapeksinda Jabar)
                      </span>
                    </li>
                    <li>Bpk. Aten Wartono (Apuk)</li>
                  </ol>
                </div>

                {/* Kolom Kanan */}
                {/* <div>
                  <ol className="list-decimal pl-5 space-y-1.5 text-sm text-coal/80"></ol>
                </div> */}
              </div>

              {/* Footer penutup */}
              <div className="mt-5 text-center">
                <div className="w-8 h-px mx-auto mb-2 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
                <p className="p-muted text-sm">Kedua Mempelai</p>
              </div>
            </div>
          </div>

          {/* Ambient glow tipis agar terasa premium */}
          <span
            aria-hidden
            className="absolute -z-10 left-1/2 -bottom-6 -translate-x-1/2 w-[70%] h-24 rounded-full blur-3xl opacity-30"
            style={{
              background:
                "radial-gradient(circle, rgba(185,141,72,0.28), transparent 70%)",
            }}
          />
        </div>
      </div>
    </section>
  );
}

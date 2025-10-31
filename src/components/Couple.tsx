"use client";
import Image from "next/image";
import { Instagram } from "lucide-react";

function Person({
  role,
  name,
  desc,
  ig,
  photo,
}: {
  role: "The Bride" | "The Groom";
  name: string;
  desc: string;
  ig: string;
  photo: string;
}) {
  return (
    <div
      className="
        paper rounded-2xl overflow-hidden transition-all
        hover:-translate-y-1 hover:shadow-lg
      "
    >
      <div className="relative w-full h-[360px] overflow-hidden">
        <Image
          src={photo}
          alt={name}
          width={1600}
          height={1200}
          className="object-cover w-full h-full"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-linen/80 via-transparent to-transparent" />
      </div>

      <div className="p-6 text-center">
        <p className="font-script text-3xl text-gold mb-1">{role}</p>
        <h3 className="h3">{name}</h3>
        <p className="p-muted mt-2 text-sm">{desc}</p>

        <a
          href={`https://instagram.com/${ig}`}
          target="_blank"
          className="
            inline-flex items-center justify-center gap-2 mt-4
            text-gold hover:text-coffee transition-colors text-sm
          "
        >
          <Instagram size={18} strokeWidth={1.6} />@{ig}
        </a>
      </div>
    </div>
  );
}

export default function Couple() {
  return (
    <section className="section bg-wedding wedding-corners relative overflow-hidden">
      <div className="container-page text-center space-y-10">
        <div>
          <p className="script-gold text-4xl mb-1">With Love,</p>
          <h2 className="h2">The Happy Couple</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <Person
            role="The Bride"
            name="Elga Vergya Irawan"
            desc="Putri dari Bapak Ferry Irawan & Ibu Yuyun Yuningsih"
            ig="elga.ig"
            photo="/images/brides.jpg"
          />
          <Person
            role="The Groom"
            name="Ilham Daffa Pratama"
            desc="Putra dari Bapak Isan Sanusi & Ibu Anita Paryani"
            ig="daffa.ig"
            photo="/images/grooms.jpg"
          />
        </div>
      </div>
    </section>
  );
}

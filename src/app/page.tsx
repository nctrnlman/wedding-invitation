import type { Metadata } from "next";

import InviteCover from "@/components/InviteCover";
import Hero from "@/components/Hero";
import Couple from "@/components/Couple";
import LoveStory from "@/components/LoveStory";
import WeddingInfo from "@/components/WeddingInfo";
import Countdown from "@/components/Countdown";
import BankAccounts from "@/components/BankAccounts";
import Gallery from "@/components/Gallery";
import Wishes from "@/components/Wishes";
import ThankYou from "@/components/ThankYou";
import Ayat from "@/components/Ayat";
import MusicPlayer from "@/components/MusicPlayer";
import LandingShell from "@/components/LandingShell";

type Query = { to?: string; session?: string };

// —— COPYWRITING (untuk share preview) ——
// Deskripsi singkat yang hangat dan elegan, aman untuk OG/Twitter:
const baseTitle = "The Wedding of Daffa & Elga";
const baseDesc =
  "You are invited to celebrate the wedding of Daffa & Elga. Save the Date and join our special day.";

// Jika ada ?to=Nama, kita personalisasi judul & deskripsi:
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<Query>;
}): Promise<Metadata> {
  const { to = "", session = "1" } = await searchParams;

  const prettyTo = to ? decodeURIComponent(to).replace(/\s+/g, " ").trim() : "";

  const title = prettyTo
    ? `Undangan untuk ${prettyTo} — Daffa & Elga`
    : baseTitle;

  const desc = prettyTo
    ? `You are invited, ${prettyTo}! Hadiri momen bahagia pernikahan Daffa & Elga. Simpan tanggalnya dan sampai jumpa di hari istimewa kami.`
    : baseDesc;

  // Jika ingin beda copy untuk session:
  const sessionCopy = session === "2" ? "Sesi 2" : "Sesi 1";

  return {
    title,
    description: `${desc} (${sessionCopy})`,
    openGraph: {
      title,
      description: `${desc} (${sessionCopy})`,
      url: "/", // biar canonical tetap root; opsional kalau mau sertakan query
      images: [
        {
          url: "/images/cover.jpg",
          width: 1200,
          height: 630,
          alt: "Daffa & Elga — Wedding Invitation",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: `${desc} (${sessionCopy})`,
      images: ["/images/cover.jpg"],
    },
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Query>;
}) {
  const { to = "", session = "1" } = await searchParams;

  return (
    <LandingShell
      Cover={<InviteCover guest={to} session={session} />}
      Main={
        <>
          <MusicPlayer />
          <Hero />
          <Couple />
          <Ayat />
          <LoveStory />
          <WeddingInfo session={session} />
          <Countdown />
          <BankAccounts />
          <Gallery />
          <Wishes />
          <ThankYou />
        </>
      }
    />
  );
}

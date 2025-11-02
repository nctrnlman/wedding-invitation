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
import Rsvp from "@/components/Rsvp";

type Query = { to?: string; session?: string };

const baseTitle = "The Wedding of Daffa & Elga";
const baseDesc = "You are invited to celebrate the wedding of Daffa & Elga.";
const site =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://wedding-invitation-three-sand.vercel.app";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<Query>;
}): Promise<Metadata> {
  const { to = "", session = "1" } = await searchParams;

  const prettyTo = to ? decodeURIComponent(to).replace(/\s+/g, " ").trim() : "";

  const title = baseTitle;

  const desc = prettyTo
    ? `Kepada ${prettyTo}, dengan penuh kebahagiaan kami mengundang Anda untuk menghadiri pernikahan Daffa & Elga. Mari berbagi momen istimewa bersama kami.`
    : baseDesc;

  const sessionCopy = session === "2" ? "Sesi 2" : "Sesi 1";

  return {
    title,
    description: `${desc} (${sessionCopy})`,
    openGraph: {
      title,
      description: `${desc} (${sessionCopy})`,
      url: "/",
      images: [
        {
          url: `${site}/images/cover.jpg`,
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
      images: [`${site}/images/cover.jpg`],
    },
  } satisfies Metadata;
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Query>;
}) {
  const { to = "", session = "1" } = await searchParams;

  return (
    <>
      <MusicPlayer />
      <LandingShell
        Cover={
          <>
            <InviteCover guest={to} session={session} />
          </>
        }
        Main={
          <>
            <Hero />
            <Couple />
            <Ayat />
            <LoveStory />
            <WeddingInfo session={session} />
            <Countdown />
            <BankAccounts />
            <Gallery />
            <Rsvp guest={to} />
            <Wishes guest={to} />
            <ThankYou />
          </>
        }
      />
    </>
  );
}

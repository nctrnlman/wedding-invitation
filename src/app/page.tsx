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

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Query>;
}) {
  const { to = "", session = "1" } = await searchParams;

  return (
    <LandingShell
      Cover={
        <>
          <InviteCover guest={to} session={session} />
        </>
      }
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

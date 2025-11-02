import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Inter, Cormorant_Garamond, Great_Vibes } from "next/font/google";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const site =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://wedding-invitation-three-sand.vercel.app";

const body = Inter({ subsets: ["latin"] });
const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});
const script = Great_Vibes({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: "The Wedding of Daffa & Elga",
  description:
    "You are invited to celebrate the wedding of Daffa & Elga — Save the Date!",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Wedding Invitation — Daffa & Elga",
    title: "The Wedding of Daffa & Elga",
    description:
      "You are invited to celebrate the wedding of Daffa & Elga — Save the Date!",
    images: [
      {
        url: `${site}/images/cover-v2.jpg`,
        width: 1200,
        height: 630,
        alt: "Daffa & Elga — Wedding Invitation",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Wedding of Daffa & Elga",
    description:
      "You are invited to celebrate the wedding of Daffa & Elga — Save the Date!",
    images: [`${site}/images/cover-v2.jpg`],
  },
  icons: { icon: "/icon.png" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body
        className={`${body.className} font-body bg-wedding wedding-corners lock-mobile`}
        style={{
          ["--font-body" as any]: body.style.fontFamily,
          ["--font-display" as any]: display.style.fontFamily,
          ["--font-script" as any]: script.style.fontFamily,
        }}
      >
        {children}
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Inter, Cormorant_Garamond, Great_Vibes } from "next/font/google";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const body = Inter({ subsets: ["latin"] });
const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});
const script = Great_Vibes({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Daffa & Elga — Wedding Invitation",
  description: "You are invited to the wedding of Daffa & Elga",
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

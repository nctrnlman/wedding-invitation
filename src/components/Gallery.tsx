"use client";
import Image from "next/image";

type Orientation = "portrait" | "landscape";
type PhotoItem = { src: string; orientation?: Orientation };

/**
 * Atur urutan & orientasi di sini.
 * - Default orientasi = "portrait" (aspect-[3/4]).
 * - Set orientation: "landscape" untuk foto horizontal (aspect-[16/9]).
 * - Ganti urutan cukup geser item di array ini.
 */
const photos: PhotoItem[] = [
  { src: "/images/gallery/13.jpg" },
  { src: "/images/gallery/12.jpg" },
  { src: "/images/gallery/19.jpg" },
  { src: "/images/gallery/20.jpg" },
  { src: "/images/gallery/16.jpg" },
  { src: "/images/gallery/17.jpg" },
  { src: "/images/gallery/18.jpg" },
  { src: "/images/gallery/11.jpg" },
  { src: "/images/gallery/14.jpg" },
  { src: "/images/gallery/15.jpg" },
  { src: "/images/gallery/2.jpg", orientation: "landscape" },
  { src: "/images/gallery/3.jpg", orientation: "landscape" },
  { src: "/images/gallery/4.jpg" },
  { src: "/images/gallery/1.jpg" },
  { src: "/images/gallery/10.png", orientation: "landscape" },
  { src: "/images/gallery/8.jpg", orientation: "landscape" },
  { src: "/images/gallery/5.jpg", orientation: "landscape" },
  { src: "/images/gallery/6.jpg", orientation: "landscape" },
  { src: "/images/gallery/7.jpg" },
  { src: "/images/gallery/9.jpg" },
  { src: "/images/gallery/28.jpg" },
  { src: "/images/gallery/29.jpg" },
  { src: "/images/gallery/30.jpg" },
  { src: "/images/gallery/27.jpg" },
  { src: "/images/gallery/26.png" },
  { src: "/images/gallery/21.png" },
  { src: "/images/gallery/22.png" },
  { src: "/images/gallery/24.png" },
  { src: "/images/gallery/25.png" },
  { src: "/images/gallery/32.jpg" },
];

export default function Gallery() {
  return (
    <section className="section bg-wedding wedding-corners relative overflow-hidden">
      <div className="container-page text-center space-y-10">
        <div>
          <p className="script-gold text-4xl mb-1">Captured Moments</p>
          <h2 className="h2">Photo Gallery</h2>
        </div>

        {/* Mobile-only grid: 2 kolom + gap */}
        <div className="grid grid-cols-2 gap-4">
          {photos.map((p, i) => {
            const aspect =
              p.orientation === "landscape" ? "aspect-[16/9]" : "aspect-[3/4]"; // default portrait
            return (
              <div
                key={`${p.src}-${i}`}
                className={`
                  relative overflow-hidden rounded-2xl photo-frame
                  tone-photo transition-all duration-300 ease-out hover:shadow-lg
                  ${aspect}
                `}
              >
                <Image
                  src={p.src}
                  alt={`Gallery ${i + 1}`}
                  fill
                  sizes="380px"
                  className="object-cover"
                  priority={i < 3}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

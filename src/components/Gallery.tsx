"use client";
import Image from "next/image";

export default function Gallery() {
  const photos = Array.from({ length: 32 }, (_, i) => {
    const num = i + 1;
    const isPng = num === 10 || (num >= 21 && num <= 26);
    const ext = isPng ? "png" : "jpg";
    return { src: `/images/gallery/${num}.${ext}`, strong: isPng };
  });

  return (
    <section className="section bg-wedding wedding-corners relative overflow-hidden">
      <div className="container-page text-center space-y-10">
        <div>
          <p className="script-gold text-4xl mb-1">Captured Moments</p>
          <h2 className="h2">Photo Gallery</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {photos.map(({ src, strong }, i) => (
            <div
              key={i}
              className={`
                relative overflow-hidden rounded-2xl photo-frame
                tone-photo ${strong ? "tone-photo--strong" : ""}
                transition-all duration-300 ease-out
                hover:shadow-lg
              `}
            >
              <Image
                src={src}
                alt={`Gallery ${i + 1}`}
                width={800}
                height={800}
                className="object-cover w-full h-full"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority={i < 3}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

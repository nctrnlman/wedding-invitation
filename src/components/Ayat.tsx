"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Ayat() {
  return (
    <section className="section bg-wedding wedding-corners relative overflow-hidden">
      <div className="container-page space-y-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="script-gold text-4xl mb-1">Qur’an Verse</p>
          <h2 className="h2">Surah Ar-Rum Ayat 21</h2>
        </motion.div>

        {/* Foto + Ayat */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center"
        >
          {/* FOTO PENGANTIN */}
          <div className="sm:col-span-1">
            <div className="relative rounded-2xl overflow-hidden photo-frame tone-photo">
              <div className="relative h-[260px] sm:h-[320px]">
                <Image
                  src="/images/ar-rum.jpg"
                  alt="Bride & Groom"
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          {/* AYAT */}
          <div className="sm:col-span-2">
            <div className="paper rounded-2xl p-6 md:p-7 space-y-4">
              <p className="text-[20px] md:text-[22px] leading-[1.9] text-coffee font-display">
                وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا
                لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
                ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ
              </p>
              <p className="text-[13.5px] md:text-[15px] leading-relaxed text-coal/80">
                “Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan
                pasangan-pasangan untukmu dari jenismu sendiri, agar kamu
                cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di
                antaramu rasa kasih dan sayang. Sesungguhnya pada demikian itu
                benar-benar terdapat tanda-tanda bagi kaum yang berpikir.”
              </p>
              <p className="text-xs p-muted">— QS. Ar-Rum [30]: 21</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

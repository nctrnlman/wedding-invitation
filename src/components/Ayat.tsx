"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Ayat() {
  return (
    <section className="section bg-wedding wedding-corners relative overflow-hidden">
      <div className="container-page space-y-8 text-center">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="script-gold text-4xl mb-1">Qur’an Verse</p>
          <h2 className="h2">Surah Ar-Rum Ayat 21</h2>
        </motion.div>

        {/* Foto potrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="relative mx-auto w-full max-w-xs rounded-2xl overflow-hidden photo-frame tone-photo">
            <div className="relative aspect-[4/5]">
              <Image
                src="/images/ar-rum.jpg"
                alt="Bride & Groom"
                fill
                sizes="380px"
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Ayat */}
          <div className="paper rounded-2xl p-6 space-y-4 text-left text-justify">
            <p className="text-[20px] leading-[1.9] text-coffee font-display">
              وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا
              لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ
              إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ
            </p>
            <p className="text-[13.5px] leading-relaxed text-coal/80">
              “Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan
              pasangan-pasangan untukmu dari jenismu sendiri, agar kamu
              cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di
              antaramu rasa kasih dan sayang. Sesungguhnya pada demikian itu
              benar-benar terdapat tanda-tanda bagi kaum yang berpikir.”
            </p>
            <p className="text-xs p-muted">— QS. Ar-Rum [30]: 21</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

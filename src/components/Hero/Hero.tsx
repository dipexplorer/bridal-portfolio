"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import Image from "next/image";

interface HeroProps {
  onBookClick?: () => void;
}

export default function Hero({ onBookClick }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax setup
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a]"
    >
      {/* Background Image with Parallax & Curtain Reveal */}
      <motion.div 
        className="absolute inset-0 w-full h-full overflow-hidden"
        initial={{ clipPath: "inset(100% 0 0 0)" }}
        animate={{ clipPath: "inset(0% 0 0 0)" }}
        transition={{ duration: 1.5, ease: [0.77, 0, 0.175, 1] }} // smooth Expo ease
      >
        <motion.div className="w-full h-[120%] -top-[10%] relative" style={{ y: yBg }}>
          <Image
            src="/gallery/vogue_september_issue.png"
            alt="Editorial Makeup"
            fill
            className="object-cover object-top opacity-50 grayscale hover:grayscale-0 transition-all duration-700"
            sizes="100vw"
            priority
          />
          {/* Vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/30 to-[#0a0a0a]" />
        </motion.div>
      </motion.div>

      {/* Hero Content */}
      <motion.div 
        className="relative z-10 w-full flex flex-col items-center justify-center pointer-events-none px-4"
        style={{ y: yText, opacity: opacityText }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="flex items-start"
        >
          <h1
            className="text-[15vw] sm:text-[18vw] leading-[0.8] tracking-tighter uppercase font-serif text-white"
            style={{ fontFamily: "var(--font-cormorant), serif" }}
          >
            VALERIE
          </h1>
          <div className="w-3 h-3 md:w-5 md:h-5 bg-[#E52E2D] rounded-full mt-4 md:mt-8 ml-2" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-6 flex flex-col items-center text-center max-w-md mx-auto"
        >
          <p className="text-xs md:text-sm tracking-[0.2em] uppercase text-white/60 mb-8" style={{ fontFamily: "var(--font-inter)" }}>
            High-Fashion &amp; Editorial Artistry
          </p>
          
          <button
            onClick={onBookClick}
            className="pointer-events-auto cursor-hover group flex items-center justify-center w-32 h-32 md:w-40 md:h-40 rounded-full border border-[#E52E2D] text-white hover:bg-[#E52E2D] transition-all duration-500 backdrop-blur-sm bg-black/20"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] md:text-xs tracking-widest uppercase font-semibold">Book</span>
              <ArrowDownRight size={18} className="group-hover:rotate-[-45deg] transition-transform duration-300" />
            </div>
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}

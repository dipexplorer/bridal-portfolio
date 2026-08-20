"use client";

import { motion } from "framer-motion";

export default function StorySection() {
  return (
    <section
      id="story"
      className="relative min-h-svh w-full bg-charcoal flex items-center overflow-hidden py-32 lg:py-40"
    >
      {/* Full-bleed editorial portrait */}
      <motion.div 
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <img
          src="/gallery/desaturated.png"
          alt="Editorial portrait"
          className="w-full h-full object-cover object-center"
        />
      </motion.div>

      {/* Overlay gradient — left heavy dark, right reveals portrait */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-r from-charcoal via-charcoal/80 to-charcoal/10" />
        <div className="absolute inset-0 bg-linear-to-b from-charcoal/60 via-transparent to-charcoal/70" />
      </div>

      {/* Diagonal decorative rule — top right corner mark */}
      <div className="absolute top-0 right-0 w-px h-32 bg-linear-to-b from-[#E52E2D] to-transparent opacity-60 hidden md:block" />
      <div className="absolute top-0 right-0 h-px w-32 bg-linear-to-l from-[#E52E2D] to-transparent opacity-60 hidden md:block" />

      {/* Vertical section number — far left edge */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-3 z-20">
        <div className="w-px h-16 bg-white/20" />
        <span
          className="text-[10px] tracking-[0.4em] text-white/30 rotate-90 whitespace-nowrap font-mono"
        >
          05 / STORY
        </span>
        <div className="w-px h-16 bg-white/20" />
      </div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true }}
        className="relative z-10 w-full max-w-7xl mx-auto flex flex-col justify-center px-6 md:px-12 lg:px-20 md:pr-[45%] lg:pr-[55%]"
      >
        {/* Eyebrow */}
        <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-[#E52E2D] mb-8 lg:mb-10 font-bold flex items-center gap-3">
          <span className="w-6 h-px bg-[#E52E2D]" />
          The Craft
        </span>

        {/* Headline — editorial stacked layout */}
        <h2
          className="text-[clamp(2.5rem,6vw,8rem)] text-white uppercase leading-[0.92] tracking-[-0.02em] mb-6"
          style={{ fontFamily: "var(--font-cormorant), serif" }}
        >
          From a<br />
          Single<br />
          <span className="italic font-extralight text-white/35">Stroke</span>
        </h2>

        {/* Inset serif quote line */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-8 h-px bg-[#E52E2D]/60" />
          <span
            className="text-white/45 text-sm italic tracking-wide"
            style={{ fontFamily: "var(--font-cormorant), serif" }}
          >
            to a complete vision
          </span>
        </div>

        {/* Body */}
        <p
          className="text-[13px] md:text-sm text-white/55 leading-[1.85] max-w-sm"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Every editorial look is more than makeup — it is a carefully composed story of high-fashion elegance, bold contrast, and striking modernity. Each brush stroke and sculpted contour speaks of a decade of devoted artistry.
        </p>

        {/* Mobile section number indicator (since left vertical is hidden) */}
        <div className="md:hidden flex items-center gap-4 mt-12 pt-12 border-t border-white/10">
          <span className="font-mono text-[10px] text-white/40 tracking-widest">05</span>
          <div className="h-px flex-1 bg-white/10" />
          <span className="font-mono text-[10px] text-white/40 tracking-[0.2em] uppercase">Story</span>
        </div>
      </motion.div>

      {/* Bottom edge treatment */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}

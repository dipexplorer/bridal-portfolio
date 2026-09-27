'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function StorySection() {
  return (
    <section
      id="story"
      className="relative min-h-[90vh] lg:min-h-screen w-full bg-[#060606] flex items-center overflow-hidden py-24 md:py-36 border-t border-white/5"
    >
      {/* Background Editorial Portrait Image */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.05 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        <Image
          src="/gallery/desaturated.png"
          alt="Editorial portrait"
          fill
          unoptimized
          className="object-cover object-top md:object-right filter brightness-90 contrast-105"
          priority
        />
      </motion.div>

      {/* Responsive Gradient Overlays */}
      <div className="absolute inset-0 z-1 pointer-events-none">
        {/* Mobile top-to-bottom dark gradient */}
        <div className="absolute inset-0 bg-linear-to-b from-[#060606] via-[#060606]/90 to-[#060606]/40 md:hidden" />

        {/* Desktop left-to-right dark gradient */}
        <div className="hidden md:block absolute inset-0 bg-linear-to-r from-[#060606] via-[#060606]/90 via-55% to-transparent" />
        <div className="hidden md:block absolute inset-0 bg-linear-to-t from-[#060606] via-transparent to-[#060606]/60" />
      </div>

      {/* Vertical Section Marker - Left Edge */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4 z-20">
        <div className="w-px h-16 bg-white/20" />
        <span className="text-[10px] tracking-[0.4em] text-white/30 rotate-90 whitespace-nowrap font-mono">
          05 / STORY
        </span>
        <div className="w-px h-16 bg-white/20" />
      </div>

      {/* Main Content Container */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="max-w-xl lg:max-w-2xl"
        >
          {/* Eyebrow */}
          <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-[#E52E2D] mb-6 md:mb-8 font-bold flex items-center gap-3">
            <span className="w-6 h-px bg-[#E52E2D]" />
            The Craft // Philosophy
          </span>

          {/* Headline */}
          <h2
            className="text-4xl sm:text-6xl md:text-7xl lg:text-[5vw] text-white uppercase leading-[0.92] tracking-tight mb-6"
            style={{ fontFamily: 'var(--font-cormorant), serif' }}
          >
            From a<br />
            Single<br />
            <span className="italic font-extralight text-white/40 font-serif lowercase">
              Stroke
            </span>
          </h2>

          {/* Inset quote subtitle */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-[#E52E2D]" />
            <span
              className="text-white/60 text-base md:text-lg italic font-light tracking-wide"
              style={{ fontFamily: 'var(--font-cormorant), serif' }}
            >
              to a complete couture vision
            </span>
          </div>

          {/* Narrative Body Text */}
          <div className="space-y-4 max-w-lg">
            <p
              className="text-sm md:text-base text-white/75 leading-relaxed font-light"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Every editorial look is more than makeup — it is a carefully composed story of high-fashion elegance, bold contrast, and striking modernity.
            </p>
            <p
              className="text-xs md:text-sm text-white/50 leading-relaxed font-light"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Each brush stroke and sculpted contour speaks of over a decade of devoted artistry across runways in Paris, London, and Mumbai.
            </p>
          </div>

          {/* Feature Badge Strip */}
          <div className="mt-10 flex flex-wrap gap-4 pt-8 border-t border-white/10">
            <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.25em] text-white/60">
              <Sparkles size={12} className="text-[#E52E2D]" />
              Signature Aesthetics
            </div>
            <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.25em] text-white/40">
              High-Definition Precision
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

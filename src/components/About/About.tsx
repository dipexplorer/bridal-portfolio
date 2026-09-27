'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

const btsGallery = [
  {
    id: 'studio-artistry',
    subtitle: 'Behind The Scenes // Studio Session',
    tag: 'Studio Archives',
    src: '/gallery/newpic1png',
    alt: 'Luxe Studio Session Artistry',
  },
  {
    id: 'couture-craft',
    subtitle: 'Behind The Scenes // Couture Sculpt',
    tag: 'Skin Prep & Glow',
    src: '/gallery/newpic2.png',
    alt: 'High Fashion Bridal Sculpting',
  },
  {
    id: 'editorial-prep',
    subtitle: 'Behind The Scenes // Editorial Focus',
    tag: 'Backstage Focus',
    src: '/gallery/newpic3.png',
    alt: 'Backstage Campaign Preparation',
  },
  {
    id: 'lip-architecture',
    subtitle: 'Behind The Scenes // Precision Detailing',
    tag: 'Lip Sculpting',
    src: '/gallery/newpic4.png',
    alt: 'Precision Lip Architecture',
  },
  {
    id: 'masterclass-technique',
    subtitle: 'Behind The Scenes // Masterclass Draping',
    tag: 'Editorial Masterclass',
    src: '/gallery/newpic5.png',
    alt: 'Editorial Masterclass Technique',
  },
  {
    id: 'runway-finish',
    subtitle: 'Behind The Scenes // Runway Touch-up',
    tag: 'Runway Touch-up',
    src: '/gallery/newpic6.png',
    alt: 'Runway Campaign Finishing',
  },
];

export default function About() {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % btsGallery.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const handlePrev = () => {
    setActiveImageIndex((prev) => (prev - 1 + btsGallery.length) % btsGallery.length);
  };

  const handleNext = () => {
    setActiveImageIndex((prev) => (prev + 1) % btsGallery.length);
  };

  const couturePillars = [
    'Haute Couture Bridal',
    'Fashion Week Editorial',
    'Red Carpet Artistry',
  ];

  const currentItem = btsGallery[activeImageIndex];

  return (
    <section
      className="relative bg-[#060606] py-32 lg:py-48 border-t border-white/5 overflow-hidden"
      id="about"
    >
      {/* Ambient background glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#E52E2D]/3 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-[-10%] w-[700px] h-[700px] bg-white/1.5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Eyebrow Header */}
        <div className="mb-12 md:mb-16 flex items-center justify-between">
          <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-[#E52E2D] font-bold flex items-center gap-3">
            <span className="w-6 h-px bg-[#E52E2D]" />
            The Artist // Est. 2014
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/40 hidden sm:inline-block">
            Couture Archives &amp; BTS
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">
          
          {/* Left Column: Premium Auto-Looping BTS Gallery Showcase */}
          <div className="lg:col-span-5 relative flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative aspect-3/4 w-full max-w-md mx-auto lg:max-w-none group"
            >
              {/* Outer decorative wireframe offset */}
              <div className="absolute -inset-3 md:-inset-4 border border-white/10 transition-transform duration-700 group-hover:-inset-2 z-0" />
              <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-[#E52E2D] z-20" />
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-[#E52E2D] z-20" />

              <div className="absolute inset-0 bg-[#0f0f0f] overflow-hidden z-10 rounded-xs border border-white/5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentItem.id}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.65, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={currentItem.src}
                      alt={currentItem.alt}
                      fill
                      unoptimized
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 40vw"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-black/30 pointer-events-none" />

                {/* Top Bar: Play/Pause & Counter */}
                <div className="absolute top-4 left-4 right-4 z-30 flex items-center justify-between">
                  <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-white/80 border border-white/20 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full">
                    {currentItem.tag}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-7 h-7 rounded-full bg-black/50 hover:bg-[#E52E2D] border border-white/20 hover:border-[#E52E2D] text-white flex items-center justify-center backdrop-blur-md transition-all duration-300 cursor-pointer"
                      title={isPlaying ? "Pause auto-slide" : "Play auto-slide"}
                    >
                      {isPlaying ? <Pause size={11} /> : <Play size={11} className="ml-0.5" />}
                    </button>
                    <span className="font-mono text-[9px] font-bold text-[#E52E2D] bg-black/60 border border-[#E52E2D]/30 backdrop-blur-md px-2.5 py-1 rounded-full">
                      0{activeImageIndex + 1} / 0{btsGallery.length}
                    </span>
                  </div>
                </div>

                {/* Slider Arrow Controls */}
                <button
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/40 hover:bg-[#E52E2D] border border-white/20 hover:border-[#E52E2D] text-white flex items-center justify-center backdrop-blur-md transition-all duration-300 opacity-80 hover:opacity-100 cursor-pointer"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/40 hover:bg-[#E52E2D] border border-white/20 hover:border-[#E52E2D] text-white flex items-center justify-center backdrop-blur-md transition-all duration-300 opacity-80 hover:opacity-100 cursor-pointer"
                  aria-label="Next image"
                >
                  <ChevronRight size={18} />
                </button>

                {/* Bottom Subtitle Badge Overlay */}
                <div className="absolute bottom-4 left-4 right-4 z-20 pointer-events-none">
                  <span className="font-mono text-[8px] uppercase tracking-[0.28em] text-white/90 border border-white/20 bg-black/70 backdrop-blur-md px-3.5 py-1.5 block text-center truncate">
                    {currentItem.subtitle}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Micro Filmstrip Selector Rail */}
            <div className="grid grid-cols-6 gap-2 max-w-md mx-auto lg:max-w-none w-full">
              {btsGallery.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveImageIndex(idx);
                    setIsPlaying(false);
                  }}
                  className={`relative aspect-square overflow-hidden border transition-all duration-300 cursor-pointer rounded-xs group ${
                    activeImageIndex === idx
                      ? 'border-[#E52E2D] shadow-[0_0_12px_rgba(229,46,45,0.5)] scale-105 z-10'
                      : 'border-white/10 opacity-40 hover:opacity-100 hover:border-white/40'
                  }`}
                  title={item.tag}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                  <div className={`absolute inset-0 transition-colors ${
                    activeImageIndex === idx ? 'bg-transparent' : 'bg-black/40 group-hover:bg-transparent'
                  }`} />
                  {activeImageIndex === idx && (
                    <div className="absolute bottom-0 inset-x-0 h-0.5 bg-[#E52E2D]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Editorial Narrative & Quote Block */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              {/* Title & Signature */}
              <div className="flex flex-col mb-8">
                <h2
                  className="text-5xl sm:text-7xl lg:text-[5.5vw] text-white uppercase leading-[0.88] tracking-tight"
                  style={{ fontFamily: 'var(--font-cormorant), serif' }}
                >
                  Luxe<br />
                  <span className="italic font-extralight text-white/50 lowercase tracking-normal font-serif">
                    Laurent
                  </span>
                </h2>
                <span className="font-serif italic text-sm md:text-base text-[#E52E2D]/90 mt-2 tracking-widest font-light">
                  Founder &amp; Principal Editorial Artist
                </span>
              </div>

              {/* Couture Pillars Tag Bar */}
              <div className="flex flex-wrap gap-2.5 mb-10">
                {couturePillars.map((tag, idx) => (
                  <span
                    key={idx}
                    className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/70 border border-white/10 bg-white/[0.03] px-3.5 py-1.5 rounded-full hover:border-[#E52E2D]/50 hover:text-white transition-colors duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* High-Fashion Editorial Pull Quote Block */}
              <div className="relative border-l-2 border-[#E52E2D] pl-6 my-8 py-1 bg-white/[0.015]">
                <p
                  className="text-lg md:text-xl lg:text-2xl text-white/95 font-serif italic leading-relaxed"
                  style={{ fontFamily: 'var(--font-cormorant), serif' }}
                >
                  &ldquo;Artistry is not about altering features, but sculpting the light that naturally radiates from within.&rdquo;
                </p>
              </div>

              {/* Narrative Story */}
              <div className="space-y-5 max-w-xl">
                <p
                  className="text-sm md:text-base text-white/75 leading-relaxed font-light"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  <span
                    className="text-white text-3xl font-serif italic mr-2 leading-none float-left drop-shadow-md"
                    style={{ fontFamily: 'var(--font-cormorant), serif' }}
                  >
                    F
                  </span>
                  or over a decade, Luxe has been defining high-fashion bridal and editorial aesthetics across Paris, London, and Mumbai. 
                  Blending soft luxury textures with striking structural highlights, her signature style is focused on clean, radiant, and timeless elegance.
                </p>
                <p
                  className="text-[13px] md:text-sm text-white/50 leading-[1.8] font-light"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  She works closely with each client to sculpt a look that feels uniquely couture. Having worked behind the scenes on fashion runways and high-end bridal campaigns, Luxe brings a refined editorial perspective to real-world luxury makeup.
                </p>
              </div>

              {/* Glassmorphism Metric Cards */}
              <div className="mt-14 pt-10 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="group relative p-5 bg-white/[0.02] border border-white/5 hover:border-[#E52E2D]/40 transition-all duration-500 rounded-xs">
                  <div
                    className="text-4xl lg:text-5xl font-serif text-[#E52E2D] tracking-tight mb-1"
                    style={{ fontFamily: 'var(--font-cormorant), serif' }}
                  >
                    10+
                  </div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40 group-hover:text-white/70 transition-colors">
                    Years of Mastery
                  </div>
                </div>

                <div className="group relative p-5 bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all duration-500 rounded-xs">
                  <div
                    className="text-4xl lg:text-5xl font-serif text-white tracking-tight mb-1"
                    style={{ fontFamily: 'var(--font-cormorant), serif' }}
                  >
                    200+
                  </div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40 group-hover:text-white/70 transition-colors">
                    Couture Brides
                  </div>
                </div>

                <div className="group relative p-5 bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all duration-500 rounded-xs">
                  <div
                    className="text-4xl lg:text-5xl font-serif text-white tracking-tight mb-1"
                    style={{ fontFamily: 'var(--font-cormorant), serif' }}
                  >
                    03
                  </div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40 group-hover:text-white/70 transition-colors">
                    Global Campaigns
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}


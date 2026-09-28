'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const btsGallery = [
  {
    id: 'studio-session',
    subtitle: 'Behind The Scenes // Studio Session',
    src: '/gallery/Two women enjoying a makeup session.png',
    alt: 'Luxe Studio Session with Client',
  },
  {
    id: 'blush-craft',
    subtitle: 'Behind The Scenes // Blush Craft',
    src: '/gallery/3_women_hd.png',
    alt: 'Bridal Couture Application',
  },
  {
    id: 'lip-precision',
    subtitle: 'Behind The Scenes // Lip Precision',
    src: '/gallery/bride_lips_touch.png',
    alt: 'Precision Lip Touch Up',
  },
  {
    id: 'backstage-prep',
    subtitle: 'Behind The Scenes // Backstage Prep',
    src: '/gallery/bride_finishing_ready.png',
    alt: 'Backstage Runway Masterclass Prep',
  },
];

export default function About() {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % btsGallery.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setActiveImageIndex((prev) => (prev - 1 + btsGallery.length) % btsGallery.length);
  };

  const handleNext = () => {
    setActiveImageIndex((prev) => (prev + 1) % btsGallery.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX.current - touchEndX;

    if (diffX > 50) {
      handleNext();
    } else if (diffX < -50) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  const couturePillars = [
    'Haute Couture Bridal',
    'Fashion Week Editorial',
    'Red Carpet Artistry',
  ];

  const currentItem = btsGallery[activeImageIndex];

  return (
    <section
      className="relative bg-[#060606] py-24 lg:py-48 border-t border-white/5 overflow-hidden"
      id="about"
    >
      {/* Ambient background glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#E52E2D]/3 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-[-10%] w-[700px] h-[700px] bg-white/1.5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Eyebrow Header */}
        <div className="mb-10 md:mb-16">
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#E52E2D] font-bold flex items-center gap-3">
            <span className="w-6 h-px bg-[#E52E2D]" />
            The Artist // Est. 2014
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          
          {/* Left Column: Auto-Looping & Swipeable BTS Slider Card */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative aspect-3/4 w-full max-w-md mx-auto lg:max-w-none group touch-pan-y"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {/* Outer decorative wireframe offset */}
              <div className="absolute -inset-3 md:-inset-5 border border-white/10 transition-transform duration-700 group-hover:-inset-2 md:group-hover:-inset-4 z-0" />
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#E52E2D] z-20" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#E52E2D] z-20" />

              <div className="absolute inset-0 bg-[#0f0f0f] overflow-hidden z-10 rounded-none">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentItem.id}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
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

                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

                {/* Slider Arrow Controls - Minimum 44x44px Touch Target */}
                <button
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-none bg-black/60 hover:bg-[#E52E2D] border border-white/20 hover:border-[#E52E2D] text-white flex items-center justify-center backdrop-blur-md transition-all duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#E52E2D] focus-visible:outline-offset-2"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-none bg-black/60 hover:bg-[#E52E2D] border border-white/20 hover:border-[#E52E2D] text-white flex items-center justify-center backdrop-blur-md transition-all duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#E52E2D] focus-visible:outline-offset-2"
                  aria-label="Next image"
                >
                  <ChevronRight size={20} />
                </button>

                {/* Subtitle Badge Overlay */}
                <div className="absolute bottom-6 left-6 right-6 z-20 flex items-center justify-between pointer-events-none">
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/90 border border-white/20 bg-black/70 backdrop-blur-md px-3 py-1.5 truncate max-w-[200px]">
                    {currentItem.subtitle}
                  </span>
                  <span className="font-mono text-[10px] font-bold text-[#E52E2D] bg-black/70 border border-[#E52E2D]/30 backdrop-blur-md px-2.5 py-1 shrink-0">
                    0{activeImageIndex + 1} / 0{btsGallery.length}
                  </span>
                </div>

                {/* Slide Indicator Dots */}
                <div className="absolute bottom-2.5 left-6 right-6 z-20 flex items-center justify-center gap-2">
                  {btsGallery.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`h-1.5 rounded-none transition-all duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 ${
                        activeImageIndex === idx
                          ? 'w-7 bg-[#E52E2D]'
                          : 'w-2 bg-white/40 hover:bg-white/70'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
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
              <div className="flex flex-col mb-6">
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

              {/* Horizontally Scrollable Couture Pillars Row on Mobile */}
              <div className="flex overflow-x-auto no-scrollbar gap-2.5 mb-8 pb-1 whitespace-nowrap">
                {couturePillars.map((tag, idx) => (
                  <span
                    key={idx}
                    className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70 border border-white/10 bg-white/3 px-4 py-2 rounded-none hover:border-[#E52E2D]/50 hover:text-white transition-colors duration-300 shrink-0"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* High-Fashion Editorial Pull Quote Block */}
              <div className="relative border-l-2 border-[#E52E2D] pl-5 my-6 py-1 bg-white/1.5">
                <p
                  className="text-base sm:text-xl lg:text-2xl text-white/95 font-serif italic leading-relaxed"
                  style={{ fontFamily: 'var(--font-cormorant), serif' }}
                >
                  &ldquo;Artistry is not about altering features, but sculpting the light that naturally radiates from within.&rdquo;
                </p>
              </div>

              {/* Narrative Story */}
              <div className="space-y-4 max-w-xl">
                <p
                  className="text-xs sm:text-base text-white/75 leading-relaxed font-light"
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
                  className="text-xs sm:text-sm text-white/50 leading-[1.8] font-light"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  She works closely with each client to sculpt a look that feels uniquely couture. Having worked behind the scenes on fashion runways and high-end bridal campaigns, Luxe brings a refined editorial perspective to real-world luxury makeup.
                </p>
              </div>

              {/* Glassmorphism Metric Cards */}
              <div className="mt-10 pt-8 border-t border-white/10 grid grid-cols-3 gap-3 sm:gap-6">
                <div className="group relative p-3 sm:p-5 bg-white/2 border border-white/5 hover:border-[#E52E2D]/40 transition-all duration-500 rounded-none">
                  <div
                    className="text-3xl sm:text-5xl font-serif text-[#E52E2D] tracking-tight mb-1"
                    style={{ fontFamily: 'var(--font-cormorant), serif' }}
                  >
                    10+
                  </div>
                  <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white/50">
                    Years Mastery
                  </div>
                </div>

                <div className="group relative p-3 sm:p-5 bg-white/2 border border-white/5 hover:border-white/20 transition-all duration-500 rounded-none">
                  <div
                    className="text-3xl sm:text-5xl font-serif text-white tracking-tight mb-1"
                    style={{ fontFamily: 'var(--font-cormorant), serif' }}
                  >
                    200+
                  </div>
                  <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white/50">
                    Couture Brides
                  </div>
                </div>

                <div className="group relative p-3 sm:p-5 bg-white/2 border border-white/5 hover:border-white/20 transition-all duration-500 rounded-none">
                  <div
                    className="text-3xl sm:text-5xl font-serif text-white tracking-tight mb-1"
                    style={{ fontFamily: 'var(--font-cormorant), serif' }}
                  >
                    03
                  </div>
                  <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white/50">
                    Global Hubs
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

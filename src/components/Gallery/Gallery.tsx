'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface GalleryItem {
  id: string;
  index: string;
  title: string;
  category: 'Editorial' | 'Runway' | 'Campaign' | 'Bridal';
  src: string;
  aspect: string;
  description: string;
}

const galleryData: GalleryItem[] = [
  {
    id: '1',
    index: '01',
    title: 'High-Fashion Couture',
    category: 'Editorial',
    src: '/gallery/newpic1.png',
    aspect: 'aspect-square',
    description: 'Sculpted high-definition editorial features with dramatic contrast and refined finish for Paris Fashion Week.',
  },
  {
    id: '2',
    index: '02',
    title: 'Royal Golden Crown',
    category: 'Bridal',
    src: '/gallery/bride_hd.png',
    aspect: 'aspect-[16/10]',
    description: 'Bespoke traditional bridal styling showcasing handcrafted gold jewelry, regal veil placement, and radiant couture skin.',
  },
  {
    id: '3',
    index: '03',
    title: 'Monochrome Grace',
    category: 'Runway',
    src: '/gallery/newpic2.png',
    aspect: 'aspect-[3/4]',
    description: 'Minimalist editorial composition highlighting natural skin luminosity and structural highlights.',
  },
  {
    id: '4',
    index: '04',
    title: 'Vogue Cover Craft',
    category: 'Editorial',
    src: '/gallery/newpic3.png',
    aspect: 'aspect-[4/5]',
    description: 'Front-cover editorial styling crafted for high-end digital cover stories and print features.',
  },
  {
    id: '5',
    index: '05',
    title: 'Sculpted Elegance',
    category: 'Campaign',
    src: '/gallery/newpic4.png',
    aspect: 'aspect-[3/4]',
    description: 'Bold eye architecture paired with subtle nude lip sculpting for luxury campaign visuals.',
  },
  {
    id: '6',
    index: '06',
    title: 'Couture Radiance',
    category: 'Bridal',
    src: '/gallery/newpic5.png',
    aspect: 'aspect-square',
    description: 'Bespoke bridal glow designed for high-definition photography and long-wearing elegance.',
  },
  {
    id: '7',
    index: '07',
    title: 'Avant-Garde Noir',
    category: 'Runway',
    src: '/gallery/newpic6.png',
    aspect: 'aspect-[3/4]',
    description: 'Striking runway concept with graphic liner and modern structural highlights for Milan shows.',
  },
  {
    id: '8',
    index: '08',
    title: 'Prada Campaign Look',
    category: 'Editorial',
    src: '/gallery/prada_editorial_campaign_v2.png',
    aspect: 'aspect-[4/5]',
    description: 'Editorial campaign look blending soft matte textures with editorial lash architecture.',
  },
  {
    id: '9',
    index: '09',
    title: 'Terracotta Tonal',
    category: 'Campaign',
    src: '/gallery/tonal terracottarust01.png',
    aspect: 'aspect-[3/4]',
    description: 'Warm terracotta tones sculpted across cheekbones for glowing editorial warmth.',
  },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const categories = ['All', 'Editorial', 'Runway', 'Campaign', 'Bridal'];

  const filteredItems =
    activeCategory === 'All'
      ? galleryData
      : galleryData.filter((item) => item.category === activeCategory);

  const handlePrevLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeItemIndex !== null) {
      setActiveItemIndex((prev) => (prev! === 0 ? filteredItems.length - 1 : prev! - 1));
    }
  };

  const handleNextLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeItemIndex !== null) {
      setActiveItemIndex((prev) => (prev! === filteredItems.length - 1 ? 0 : prev! + 1));
    }
  };

  const activeItem = activeItemIndex !== null ? filteredItems[activeItemIndex] : null;

  return (
    <section className="bg-[#060606] py-24 md:py-32 border-t border-white/5 relative overflow-hidden" id="gallery">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#E52E2D]/2 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white/1 blur-[170px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-5 md:px-12 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 md:mb-16 gap-6 md:gap-8">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.45em] text-[#E52E2D] mb-3 flex items-center gap-3 font-bold">
              <span className="w-6 h-px bg-[#E52E2D]" />
              01 // The Collection
            </span>
            <h2
              className="text-5xl sm:text-7xl lg:text-[5.5vw] text-white uppercase leading-[0.88] tracking-tight"
              style={{ fontFamily: 'var(--font-cormorant), serif' }}
            >
              Editorial<br />
              <span className="italic font-extralight text-white/35 font-serif lowercase">Mastery</span>
            </h2>
          </div>

          {/* Category Filter Tabs - Horizontally Scrollable on Mobile */}
          <div className="flex overflow-x-auto no-scrollbar gap-2.5 items-center pb-2 md:pb-0 whitespace-nowrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-mono text-[11px] uppercase tracking-[0.2em] px-4 py-2.5 transition-all duration-300 rounded-full border cursor-pointer shrink-0 min-h-[44px] ${
                  activeCategory === cat
                    ? 'bg-[#E52E2D] text-white border-[#E52E2D] shadow-[0_0_20px_rgba(229,46,45,0.35)]'
                    : 'bg-white/2 text-white/70 border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Horizontal Snap Carousel (md:hidden) */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 no-scrollbar md:hidden -mx-5 px-5">
          {filteredItems.map((item, i) => (
            <div
              key={item.id}
              onClick={() => setActiveItemIndex(i)}
              className="w-[85vw] max-w-[320px] shrink-0 snap-center relative aspect-3/4 rounded-xs border border-white/10 bg-[#0f0f0f] overflow-hidden group cursor-pointer"
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                unoptimized
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />

              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="font-mono text-[11px] text-white/80 tracking-widest bg-black/60 px-2 py-0.5 border border-white/10">
                  {item.index}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-widest px-2.5 py-1 bg-[#E52E2D] text-white font-bold">
                  {item.category}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#E52E2D] block mb-0.5 font-bold">
                    Tap to Expand
                  </span>
                  <h3
                    className="text-white text-xl uppercase leading-tight"
                    style={{ fontFamily: 'var(--font-cormorant), serif' }}
                  >
                    {item.title}
                  </h3>
                </div>

                <div className="w-8 h-8 rounded-full border border-white/30 bg-black/60 flex items-center justify-center text-white">
                  <ArrowUpRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop/Tablet Responsive Aspect-Ratio Masonry Grid (hidden on small mobile) */}
        <motion.div layout className="hidden md:block md:columns-2 lg:columns-3 xl:columns-4 md:gap-5">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, i) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="break-inside-avoid block mb-5"
              >
                <div
                  className={`relative w-full ${item.aspect} overflow-hidden group cursor-pointer bg-[#0f0f0f] border border-white/10 hover:border-[#E52E2D]/50 transition-all duration-500 rounded-xs`}
                  onClick={() => setActiveItemIndex(i)}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    unoptimized
                    className={`object-cover transition-all duration-700 ease-out group-hover:scale-105 ${
                      hoveredId === item.id ? 'grayscale-0 brightness-105' : 'grayscale brightness-90'
                    }`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                  <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
                    <span className="font-mono text-[11px] text-white/75 tracking-widest bg-black/40 backdrop-blur-xs px-2 py-0.5 border border-white/10">
                      {item.index}
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-widest px-2.5 py-1 bg-black/60 text-[#E52E2D] backdrop-blur-md border border-[#E52E2D]/30 opacity-80 group-hover:opacity-100 transition-opacity">
                      {item.category}
                    </span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 z-20 p-5 flex items-end justify-between translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                    <div>
                      <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#E52E2D] block mb-1 font-bold">
                        Editorial Look
                      </span>
                      <h3
                        className="text-white text-xl md:text-2xl leading-tight uppercase tracking-tight"
                        style={{ fontFamily: 'var(--font-cormorant), serif' }}
                      >
                        {item.title}
                      </h3>
                    </div>

                    <div className="w-8 h-8 border border-white/20 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white/70 group-hover:border-[#E52E2D] group-hover:bg-[#E52E2D] group-hover:text-white transition-all duration-300 shrink-0">
                      <ArrowUpRight size={15} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Footer info row */}
        <div className="mt-10 md:mt-14 pt-6 md:pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
          <p className="font-mono text-[11px] text-white/75 uppercase tracking-[0.2em] text-center sm:text-left flex items-center gap-2">
            <Sparkles size={12} className="text-[#E52E2D]" />
            Swipe or tap any image for full detail view
          </p>
          <div className="flex items-center gap-4 font-mono text-[11px] text-white/75 uppercase tracking-[0.2em]">
            <span>Total Works: 0{filteredItems.length}</span>
            <span className="text-white/20">|</span>
            <span className="text-[#E52E2D]">Paris • Mumbai</span>
          </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 md:p-8"
            onClick={() => setActiveItemIndex(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative max-w-5xl w-full max-h-[92vh] overflow-y-auto bg-charcoal border border-white/10 flex flex-col md:flex-row gap-0 rounded-xs shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image panel */}
              <div className="relative w-full md:w-[60%] aspect-3/4 md:aspect-auto md:min-h-[70vh] bg-[#050505] flex items-center justify-center">
                <Image
                  src={activeItem.src}
                  alt={activeItem.title}
                  fill
                  unoptimized
                  className="object-contain p-2"
                  sizes="100vw"
                  priority
                />

                <button
                  onClick={handlePrevLightbox}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-[#E52E2D] border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={handleNextLightbox}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-[#E52E2D] border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer"
                  aria-label="Next image"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Info panel */}
              <div className="w-full md:w-[40%] bg-[#0d0d0d] border-t md:border-t-0 md:border-l border-white/10 flex flex-col justify-between p-6 sm:p-8 md:p-10 relative">
                
                <button
                  onClick={() => setActiveItemIndex(null)}
                  className="absolute top-5 right-5 w-10 h-10 border border-white/20 hover:border-[#E52E2D] rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>

                <div className="pt-2 md:pt-0">
                  <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-[#E52E2D] mb-3 block font-bold">
                    {activeItem.index} // {activeItem.category}
                  </span>
                  <h3
                    className="text-3xl sm:text-4xl text-white uppercase leading-tight mb-4"
                    style={{ fontFamily: 'var(--font-cormorant), serif' }}
                  >
                    {activeItem.title}
                  </h3>
                  <div className="w-10 h-px bg-[#E52E2D] mb-4" />
                  <p
                    className="text-xs sm:text-sm text-white/60 leading-relaxed font-light mb-6"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    {activeItem.description}
                  </p>
                </div>

                <div className="space-y-3 mt-4">
                  <div className="p-3 bg-white/2 border border-white/5 rounded-xs flex items-center justify-between font-mono text-[9px]">
                    <span className="text-white/40 uppercase tracking-widest">
                      Studio Location
                    </span>
                    <span className="text-white/80 uppercase tracking-widest">
                      Paris • Mumbai
                    </span>
                  </div>

                  <a
                    href="#booking"
                    onClick={() => setActiveItemIndex(null)}
                    className="w-full py-3.5 bg-[#E52E2D] border border-[#E52E2D] text-white text-center font-mono text-[9px] uppercase tracking-[0.3em] font-bold block"
                  >
                    Inquire For Session
                  </a>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

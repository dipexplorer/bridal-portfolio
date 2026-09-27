'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface GalleryItem {
  id: string;
  index: string;
  title: string;
  category: 'Editorial' | 'Runway' | 'Campaign' | 'Bridal';
  src: string;
  span: 'tall' | 'wide' | 'square';
  description: string;
}

const galleryData: GalleryItem[] = [
  {
    id: '1',
    index: '01',
    title: 'High-Fashion Couture',
    category: 'Editorial',
    src: '/gallery/newpic1.png',
    span: 'tall',
    description: 'Sculpted high-definition editorial features with dramatic contrast and refined finish for Paris Fashion Week.',
  },
  {
    id: '2',
    index: '02',
    title: 'Monochrome Grace',
    category: 'Runway',
    src: '/gallery/newpic2.png',
    span: 'square',
    description: 'Minimalist editorial composition highlighting natural skin luminosity and structural highlights.',
  },
  {
    id: '3',
    index: '03',
    title: 'Vogue Cover Craft',
    category: 'Editorial',
    src: '/gallery/newpic3.png',
    span: 'square',
    description: 'Front-cover editorial styling crafted for high-end digital cover stories and print features.',
  },
  {
    id: '4',
    index: '04',
    title: 'Sculpted Elegance',
    category: 'Campaign',
    src: '/gallery/newpic4.png',
    span: 'tall',
    description: 'Bold eye architecture paired with subtle nude lip sculpting for luxury campaign visuals.',
  },
  {
    id: '5',
    index: '05',
    title: 'Couture Radiance',
    category: 'Bridal',
    src: '/gallery/newpic5.png',
    span: 'wide',
    description: 'Bespoke bridal glow designed for high-definition photography and long-wearing elegance.',
  },
  {
    id: '6',
    index: '06',
    title: 'Avant-Garde Noir',
    category: 'Runway',
    src: '/gallery/newpic6.png',
    span: 'square',
    description: 'Striking runway concept with graphic liner and modern structural highlights for Milan shows.',
  },
  {
    id: '7',
    index: '07',
    title: 'Prada Campaign Look',
    category: 'Editorial',
    src: '/gallery/prada_editorial_campaign_v2.png',
    span: 'square',
    description: 'Editorial campaign look blending soft matte textures with editorial lash architecture.',
  },
  {
    id: '8',
    index: '08',
    title: 'Terracotta Tonal',
    category: 'Campaign',
    src: '/gallery/tonal terracottarust01.png',
    span: 'square',
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
    <section className="bg-[#060606] py-32 border-t border-white/5 relative overflow-hidden" id="gallery">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#E52E2D]/2 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white/1 blur-[170px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-8">
          <div>
            <span className="font-mono text-[9px] uppercase tracking-[0.45em] text-[#E52E2D] mb-4 flex items-center gap-3 font-bold">
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

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2.5 items-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-mono text-[9px] uppercase tracking-[0.25em] px-4 py-2 transition-all duration-300 rounded-full border cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#E52E2D] text-white border-[#E52E2D] shadow-[0_0_20px_rgba(229,46,45,0.35)]'
                    : 'bg-white/[0.02] text-white/50 border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Magazine Bento Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[280px] md:auto-rows-[320px] gap-4">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, i) => {
              const spanClass =
                item.span === 'tall'
                  ? 'sm:col-span-1 sm:row-span-2'
                  : item.span === 'wide'
                  ? 'sm:col-span-2 sm:row-span-1'
                  : 'col-span-1 row-span-1';

              return (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className={`relative overflow-hidden group cursor-pointer bg-[#0f0f0f] border border-white/10 hover:border-[#E52E2D]/50 transition-all duration-500 rounded-xs ${spanClass}`}
                  onClick={() => setActiveItemIndex(i)}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Image */}
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

                  {/* Gradient overlays */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                  {/* Top Header info */}
                  <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
                    <span className="font-mono text-[9px] text-white/40 tracking-widest bg-black/40 backdrop-blur-xs px-2 py-0.5 border border-white/10">
                      {item.index}
                    </span>
                    <span className="font-mono text-[8px] uppercase tracking-widest px-2.5 py-1 bg-black/60 text-[#E52E2D] backdrop-blur-md border border-[#E52E2D]/30 opacity-80 group-hover:opacity-100 transition-opacity">
                      {item.category}
                    </span>
                  </div>

                  {/* Bottom title & arrow hint */}
                  <div className="absolute bottom-0 left-0 right-0 z-20 p-6 flex items-end justify-between translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                    <div>
                      <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-[#E52E2D] block mb-1 font-bold">
                        Editorial Look
                      </span>
                      <h3
                        className="text-white text-xl md:text-2xl leading-tight uppercase tracking-tight"
                        style={{ fontFamily: 'var(--font-cormorant), serif' }}
                      >
                        {item.title}
                      </h3>
                    </div>

                    <div className="w-9 h-9 border border-white/20 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white/70 group-hover:border-[#E52E2D] group-hover:bg-[#E52E2D] group-hover:text-white transition-all duration-300 shrink-0">
                      <ArrowUpRight size={16} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Footer row */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="font-mono text-[10px] text-white/30 uppercase tracking-[0.25em] text-center sm:text-left flex items-center gap-2">
            <Sparkles size={12} className="text-[#E52E2D]" />
            Click any image to view full high-definition details
          </p>
          <div className="flex items-center gap-6 font-mono text-[9px] text-white/40 uppercase tracking-[0.25em]">
            <span>Total Works: 0{filteredItems.length}</span>
            <span className="text-white/20">|</span>
            <span className="text-[#E52E2D]">Paris • London • Mumbai</span>
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
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
            onClick={() => setActiveItemIndex(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative max-w-5xl w-full bg-[#0a0a0a] border border-white/10 flex flex-col md:flex-row gap-0 overflow-hidden rounded-xs shadow-[0_0_60px_rgba(0,0,0,0.9)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image panel with Navigation Arrows */}
              <div className="relative w-full md:w-[60%] aspect-3/4 md:aspect-auto md:min-h-[75vh] bg-[#050505] flex items-center justify-center">
                <Image
                  src={activeItem.src}
                  alt={activeItem.title}
                  fill
                  unoptimized
                  className="object-contain p-2"
                  sizes="80vw"
                  priority
                />

                {/* Lightbox Prev/Next Buttons */}
                <button
                  onClick={handlePrevLightbox}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-[#E52E2D] border border-white/20 hover:border-[#E52E2D] text-white flex items-center justify-center backdrop-blur-md transition-all duration-300 cursor-pointer"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={handleNextLightbox}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-[#E52E2D] border border-white/20 hover:border-[#E52E2D] text-white flex items-center justify-center backdrop-blur-md transition-all duration-300 cursor-pointer"
                  aria-label="Next image"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Info panel */}
              <div className="w-full md:w-[40%] bg-[#0d0d0d] border-t md:border-t-0 md:border-l border-white/10 flex flex-col justify-between p-8 md:p-10 relative">
                
                {/* Close Button */}
                <button
                  onClick={() => setActiveItemIndex(null)}
                  className="absolute top-6 right-6 w-9 h-9 border border-white/10 hover:border-[#E52E2D] rounded-full flex items-center justify-center text-white/50 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>

                <div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-[#E52E2D] mb-4 block font-bold">
                    {activeItem.index} // {activeItem.category}
                  </span>
                  <h3
                    className="text-4xl lg:text-5xl text-white uppercase leading-tight mb-6"
                    style={{ fontFamily: 'var(--font-cormorant), serif' }}
                  >
                    {activeItem.title}
                  </h3>
                  <div className="w-12 h-px bg-[#E52E2D] mb-6" />
                  <p
                    className="text-xs md:text-sm text-white/60 leading-relaxed font-light mb-8"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    {activeItem.description}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xs flex items-center justify-between">
                    <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-white/40">
                      Studio Location
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-white/80">
                      Paris • London • Mumbai
                    </span>
                  </div>

                  <a
                    href="#booking"
                    onClick={() => setActiveItemIndex(null)}
                    className="w-full py-3.5 bg-[#E52E2D] hover:bg-transparent border border-[#E52E2D] text-white text-center font-mono text-[9px] uppercase tracking-[0.35em] transition-all duration-300 block"
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

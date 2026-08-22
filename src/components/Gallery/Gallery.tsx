'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryItem {
  id: string;
  index: string;
  title: string;
  category: string;
  src: string;
  span: 'tall' | 'wide' | 'square';
}

const galleryData: GalleryItem[] = [
  { id: '1', index: '01', title: 'Couture Editorial', category: 'Editorial', src: '/gallery/prada_editorial_campaign_v2.png', span: 'tall' },
  { id: '2', index: '02', title: 'Gradient Eyes', category: 'Bridal', src: '/gallery/gradient eyes01.png', span: 'square' },
  { id: '3', index: '03', title: 'Avant-Garde Gala', category: 'Event', src: '/gallery/glam look01.png', span: 'square' },
  { id: '4', index: '04', title: 'Vogue Cover Look', category: 'Editorial', src: '/gallery/vogue_september_issue.png', span: 'tall' },
  { id: '5', index: '05', title: 'Terracotta Tonal', category: 'Editorial', src: '/gallery/tonal terracottarust01.png', span: 'square' },
  { id: '6', index: '06', title: 'Matte Plastic', category: 'Campaign', src: '/gallery/matte-plastic01.png', span: 'square' },
  { id: '7', index: '07', title: 'Glam Soirée', category: 'Event', src: '/gallery/glam look02.png', span: 'wide' },
  { id: '8', index: '08', title: 'Gradient Study', category: 'Bridal', src: '/gallery/gradient eyes02.png', span: 'square' },
  { id: '9', index: '09', title: 'Gradien Eye IV', category: 'Editorial', src: '/gallery/gradien eye04.png', span: 'square' },
];

export default function Gallery() {
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="bg-[#060606] py-24 border-t border-white/5" id="gallery">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="flex items-end justify-between mb-16">
          <div>
            <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-[#E52E2D] mb-5 flex items-center gap-3 font-bold">
              <span className="w-5 h-px bg-[#E52E2D]" />
              01 / The Collection
            </span>
            <h2
              className="text-5xl md:text-[5.5vw] text-white uppercase leading-[0.9] tracking-tight"
              style={{ fontFamily: 'var(--font-cormorant), serif' }}
            >
              Editorial<br />
              <span className="italic font-extralight text-white/30">Mastery</span>
            </h2>
          </div>

          {/* Item counter */}
          <div className="hidden md:flex flex-col items-end gap-1">
            <span className="font-mono text-[9px] text-white/20 uppercase tracking-widest">Works</span>
            <span
              className="text-5xl text-white/6 font-serif leading-none"
              style={{ fontFamily: 'var(--font-cormorant), serif' }}
            >
              {galleryData.length.toString().padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Magazine Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 auto-rows-[220px] md:auto-rows-[260px] gap-3">
          {galleryData.map((item, i) => {
            // Specific placement spans for a varied editorial layout
            const spanClass =
              item.span === 'tall' ? 'col-span-1 row-span-2' :
              item.span === 'wide' ? 'col-span-2 md:col-span-2 row-span-1' :
              'col-span-1 row-span-1';

            return (
              <motion.div
                key={item.id}
                className={`relative overflow-hidden group cursor-pointer bg-[#0f0f0f] ${spanClass}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: 'easeOut' }}
                onClick={() => setActiveItem(item)}
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
                    hoveredId === item.id ? 'grayscale-0' : 'grayscale'
                  }`}
                  sizes="(max-width: 768px) 50vw, 25vw"
                />

                {/* Gradient overlay always-on bottom */}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

                {/* Index number — top left corner */}
                <div className="absolute top-4 left-4 z-20">
                  <span className="font-mono text-[9px] text-white/30 tracking-widest">
                    {item.index}
                  </span>
                </div>

                {/* Category tag — top right */}
                <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="font-mono text-[8px] uppercase tracking-widest px-2 py-1 bg-black/60 text-[#E52E2D] backdrop-blur-sm border border-[#E52E2D]/30">
                    {item.category}
                  </span>
                </div>

                {/* Title — bottom, slides up on hover */}
                <div className="absolute bottom-0 left-0 right-0 z-20 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
                  <h3
                    className="text-white text-lg md:text-xl leading-tight uppercase tracking-tight"
                    style={{ fontFamily: 'var(--font-cormorant), serif' }}
                  >
                    {item.title}
                  </h3>
                </div>

                {/* Expand hint — bottom right */}
                <div className="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-8 h-8 border border-white/30 flex items-center justify-center text-white/60 text-xs font-mono hover:border-[#E52E2D] hover:text-[#E52E2D] transition-colors duration-200">
                    ↗
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer row */}
        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="font-mono text-[10px] text-white/20 uppercase tracking-widest text-center sm:text-left">
            Click any image to expand
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
            {['Bridal', 'Editorial', 'Event', 'Campaign'].map((cat) => (
              <span key={cat} className="font-mono text-[9px] text-white/25 uppercase tracking-widest hover:text-[#E52E2D] cursor-default transition-colors duration-200">
                {cat}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-99999 bg-black/96 backdrop-blur-sm flex items-center justify-center p-6 md:p-12"
            onClick={() => setActiveItem(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative max-w-5xl w-full flex flex-col md:flex-row gap-0 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image panel */}
              <div className="relative w-full md:w-[62%] aspect-3/4 md:aspect-auto md:min-h-[75vh] bg-[#0f0f0f]">
                <Image
                  src={activeItem.src}
                  alt={activeItem.title}
                  fill
                  unoptimized
                  className="object-contain"
                  sizes="80vw"
                  priority
                />
              </div>

              {/* Info panel */}
              <div className="w-full md:w-[38%] bg-[#080808] border-l border-white/6 flex flex-col justify-between p-8 md:p-12">
                <div>
                  {/* Close */}
                  <button
                    onClick={() => setActiveItem(null)}
                    className="mb-12 font-mono text-[9px] text-white/30 uppercase tracking-widest hover:text-white/70 transition-colors flex items-center gap-2"
                  >
                    ← Close
                  </button>

                  <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-[#E52E2D] mb-4 block">
                    {activeItem.index} / {activeItem.category}
                  </span>
                  <h3
                    className="text-4xl text-white uppercase leading-tight mb-6"
                    style={{ fontFamily: 'var(--font-cormorant), serif' }}
                  >
                    {activeItem.title}
                  </h3>
                  <div className="w-8 h-px bg-[#E52E2D] mb-6" />
                  <p
                    className="text-[13px] text-white/40 leading-[1.9]"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    A study in {activeItem.category.toLowerCase()} artistry — crafted with precision to illuminate natural contours and evoke high-fashion elegance through deliberate contrast and restraint.
                  </p>
                </div>

                <div className="border-t border-white/6 pt-8 font-mono text-[9px] text-white/20 uppercase tracking-widest">
                  Luxe Bridal Artistry Studio
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

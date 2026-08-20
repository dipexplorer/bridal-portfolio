'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

interface GalleryItem {
  id: string;
  title: string;
  category: 'Bridal' | 'Editorial' | 'Event' | 'Pre-Wedding';
  src: string;
}

const galleryData: GalleryItem[] = [
  { id: '1', title: 'Couture Editorial', category: 'Editorial', src: '/gallery/prada_editorial_campaign.png' },
  { id: '2', title: 'Modern Minimalism', category: 'Bridal', src: '/gallery/minimalist_dewy_bride.png' },
  { id: '3', title: 'Avant-Garde Gala', category: 'Event', src: '/gallery/gala_red_carpet_glam.png' },
  { id: '4', title: 'Vogue Cover Look', category: 'Editorial', src: '/gallery/vogue_september_issue.png' },
  { id: '5', title: 'Evening Soiree', category: 'Event', src: '/gallery/luxury_evening_soiree.png' },
  { id: '6', title: 'Contemporary Glam', category: 'Editorial', src: '/gallery/modern_couture_bride.png' }
];

export default function Gallery() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-70%"]);

  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-[#0a0a0a]" id="gallery">
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        
        <div className="absolute top-16 left-8 md:top-24 md:left-24 z-10 text-white">
          <span
            className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#E52E2D] mb-4 block"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            01 / The Collection
          </span>
          <h2
            className="text-5xl sm:text-7xl lg:text-[7vw] leading-none uppercase"
            style={{ fontFamily: 'var(--font-cormorant), serif' }}
          >
            Editorial<br />
            <span className="italic font-light text-white/50">Mastery</span>
          </h2>
        </div>

        {/* Horizontal Scrolling Row */}
        <motion.div style={{ x }} className="flex gap-8 px-[30vw] md:px-[40vw] items-center">
          {galleryData.map((item, index) => (
            <motion.div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="relative w-[75vw] md:w-[45vw] lg:w-[30vw] aspect-[3/4] overflow-hidden group cursor-none shrink-0"
              whileHover={{ scale: 0.98 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="cursor-hover absolute inset-0 z-20" />
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-out scale-100 group-hover:scale-105"
                sizes="(max-width: 768px) 75vw, 30vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
              
              <div className="absolute bottom-6 left-6 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <span className="text-[9px] uppercase tracking-widest text-[#E52E2D] block mb-2" style={{ fontFamily: 'var(--font-inter)' }}>{item.category}</span>
                <h3 className="text-2xl text-white font-serif italic" style={{ fontFamily: 'var(--font-cormorant), serif' }}>{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Dynamic Lightbox Overlay */}
      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95 p-6 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative max-w-5xl w-full max-h-[85vh] overflow-hidden flex flex-col md:flex-row gap-8"
            >
              <button 
                onClick={() => setActiveItem(null)}
                className="absolute top-0 right-0 z-50 w-12 h-12 rounded-full border border-white/20 text-white font-mono text-sm flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-hover"
              >
                ✕
              </button>
              <div className="relative w-full md:w-2/3 h-[50vh] md:h-[80vh] overflow-hidden bg-[#111111]">
                <Image
                  src={activeItem.src}
                  alt={activeItem.title}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>
              <div className="w-full md:w-1/3 flex flex-col justify-end pb-8">
                <span className="text-[10px] uppercase tracking-widest text-[#E52E2D] mb-4" style={{ fontFamily: 'var(--font-inter)' }}>{activeItem.category}</span>
                <h3 className="text-4xl text-white font-serif uppercase leading-tight mb-6" style={{ fontFamily: 'var(--font-cormorant), serif' }}>{activeItem.title}</h3>
                <p className="text-sm text-white/50" style={{ fontFamily: 'var(--font-inter)' }}>
                  A study in {activeItem.category.toLowerCase()} artistry. Crafted with precision to highlight natural contours and evoke high-fashion elegance.
                </p>
              </div>
            </motion.div>
            <div className="absolute inset-0 -z-10 cursor-hover" onClick={() => setActiveItem(null)} />
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useTransform } from 'framer-motion';

export default function BeforeAfter() {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderPosition = useMotionValue(50);
  
  const clipPathStyle = useTransform(sliderPosition, (val) => `inset(0 ${100 - val}% 0 0)`);

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    
    let clientX = 0;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
    } else {
      clientX = (e as React.MouseEvent).clientX;
    }

    const x = clientX - left;
    const newPosition = Math.max(0, Math.min(100, (x / width) * 100));
    sliderPosition.set(newPosition);
  };

  return (
    <section className="py-32 px-6 bg-[#0a0a0a] border-t border-white/10" id="before-after">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        
        {/* Text Content */}
        <div className="lg:w-1/3 text-left">
          <span
            className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#E52E2D] mb-4 block"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            02 / The Transformation
          </span>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl text-white uppercase mb-6 leading-tight"
            style={{ fontFamily: 'var(--font-cormorant), serif' }}
          >
            The Art of<br />
            <span className="italic font-light text-white/50">Refinement</span>
          </h2>
          <p className="text-sm text-white/60 tracking-wide leading-relaxed mb-8" style={{ fontFamily: 'var(--font-inter)' }}>
            Makeup isn't about hiding; it's about amplifying. Slide to see how we elevate natural beauty into high-fashion editorial perfection using advanced contouring, color theory, and skin-prep techniques.
          </p>
          <div className="flex items-center gap-4 text-[#E52E2D] text-xs tracking-widest uppercase font-semibold">
            <span>Before</span>
            <div className="flex-1 h-px bg-[#E52E2D]/30" />
            <span>After</span>
          </div>
        </div>

        {/* Slider Container */}
        <div 
          className="lg:w-2/3 w-full aspect-[4/5] sm:aspect-video relative rounded-none overflow-hidden cursor-ew-resize cursor-hover"
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onTouchMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Base Image (After) */}
          <Image
            src="/gallery/prada_editorial_campaign_v2.png"
            alt="After Makeup"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 66vw"
          />
          <div className="absolute top-6 right-6 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full text-[9px] uppercase tracking-widest text-white border border-white/20">
            Editorial Glam
          </div>

          {/* Overlay Image (Before) */}
          <motion.div 
            className="absolute inset-0 z-10"
            style={{ clipPath: clipPathStyle }}
          >
            <Image
              src="/gallery/rawcanvas_v2.png"
              alt="Before Makeup"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 66vw"
            />
            <div className="absolute top-6 left-6 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full text-[9px] uppercase tracking-widest text-white/60 border border-white/20">
              Raw Canvas
            </div>
          </motion.div>

          {/* Slider Line & Handle */}
          <motion.div 
            className="absolute top-0 bottom-0 w-0.5 bg-[#E52E2D] z-20 shadow-[0_0_10px_rgba(229,46,45,0.8)] flex items-center justify-center"
            style={{ left: useTransform(sliderPosition, (val) => `${val}%`) }}
          >
            <motion.div 
              className="w-10 h-10 rounded-full border-2 border-[#E52E2D] bg-[#0a0a0a] flex items-center justify-center shadow-2xl"
              animate={{ scale: isHovered ? 1.2 : 1 }}
            >
              <div className="flex gap-1">
                <div className="w-0.5 h-3 bg-white/50" />
                <div className="w-0.5 h-3 bg-white/50" />
              </div>
            </motion.div>
          </motion.div>
        </div>
        
      </div>
    </section>
  );
}

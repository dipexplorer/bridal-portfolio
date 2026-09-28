"use client";

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function BeforeAfter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const sliderPosition = useMotionValue(50);
  const clipPathStyle = useTransform(sliderPosition, (val) => `inset(0 ${100 - val}% 0 0)`);
  const sliderLeft = useTransform(sliderPosition, (val) => `${val}%`);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    const x = clientX - left;
    const newPosition = Math.max(2, Math.min(98, (x / width) * 100));
    sliderPosition.set(newPosition);
  }, [sliderPosition]);

  // Pointer & Touch Events Unified Support
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  }, [updatePosition]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    updatePosition(e.clientX);
  }, [updatePosition]);

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches && e.touches[0]) {
      updatePosition(e.touches[0].clientX);
    }
  }, [updatePosition]);

  return (
    <section className="py-20 md:py-32 px-5 md:px-12 bg-[#060606] border-t border-white/5" id="before-after">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

        {/* Text Content */}
        <div className="lg:w-1/3 w-full text-left shrink-0">
          <span
            className="font-mono text-[11px] uppercase tracking-[0.4em] text-[#E52E2D] mb-4 block font-bold"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            [ The Transformation ]
          </span>
          <h2
            className="text-4xl sm:text-5xl lg:text-[3.5vw] text-white uppercase mb-4 leading-tight"
            style={{ fontFamily: 'var(--font-cormorant), serif' }}
          >
            The Art of<br />
            <span className="italic font-extralight text-white/50 font-serif lowercase">Refinement</span>
          </h2>
          <p
            className="text-xs sm:text-sm text-white/60 leading-relaxed mb-6 font-light"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Makeup isn&apos;t about hiding; it&apos;s about amplifying. Touch or drag to see how we elevate natural beauty into high-fashion editorial perfection using advanced contouring and skin-prep techniques.
          </p>
          <div className="flex items-center gap-4 text-[#E52E2D] text-[11px] tracking-[0.25em] uppercase font-mono font-semibold">
            <span>Bare Canvas</span>
            <div className="flex-1 h-px bg-[#E52E2D]/30" />
            <span>Couture Finish</span>
          </div>
        </div>

        {/* Responsive Touch-Enabled Slider Container */}
        <div
          ref={containerRef}
          role="slider"
          aria-label="Drag to compare before and after makeup look"
          aria-valuenow={50}
          tabIndex={0}
          className="lg:w-2/3 w-full h-[360px] sm:h-[460px] md:aspect-video relative overflow-hidden select-none touch-none rounded-none border border-white/10 cursor-grab focus-visible:outline-2 focus-visible:outline-[#E52E2D] focus-visible:outline-offset-4"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onTouchStart={(e) => updatePosition(e.touches[0].clientX)}
          onTouchMove={handleTouchMove}
        >
          {/* Base Image — After */}
          <Image
            src="/gallery/prada_editorial_campaign_v2.png"
            alt="After Makeup Look"
            fill
            unoptimized
            draggable={false}
            className="object-cover object-center pointer-events-none select-none"
            sizes="(max-width: 1024px) 100vw, 66vw"
          />
          <div className="absolute top-4 right-4 z-30 px-3 py-1 bg-black/80 backdrop-blur-md rounded-none text-[11px] uppercase font-mono tracking-widest text-white border border-white/20 pointer-events-none">
            After
          </div>

          {/* Overlay Image — Before */}
          <motion.div
            className="absolute inset-0 z-10 will-change-[clip-path]"
            style={{ clipPath: clipPathStyle }}
          >
            <Image
              src="/gallery/rawcanvas_v2.png"
              alt="Before Makeup Look"
              fill
              unoptimized
              draggable={false}
              className="object-cover object-center pointer-events-none select-none"
              sizes="(max-width: 1024px) 100vw, 66vw"
            />
            <div className="absolute top-4 left-4 z-30 px-3 py-1 bg-black/80 backdrop-blur-md rounded-none text-[11px] uppercase font-mono tracking-widest text-white/90 border border-white/20 pointer-events-none">
              Before
            </div>
          </motion.div>

          {/* Slider Handle with Left/Right Chevrons */}
          <motion.div
            className="absolute top-0 bottom-0 w-[2px] bg-[#E52E2D] z-20 flex items-center justify-center shadow-lg shadow-[#E52E2D]/90 will-change-[left] pointer-events-none"
            style={{ left: sliderLeft }}
          >
            <div
              className="w-10 h-10 md:w-11 md:h-11 rounded-none border-2 border-[#E52E2D] bg-[#060606] flex items-center justify-between px-1 md:px-1.5 shadow-lg shadow-[#E52E2D]/60 shrink-0 text-white"
              aria-hidden="true"
            >
              <ChevronLeft size={14} className="text-white/90" />
              <ChevronRight size={14} className="text-white/90" />
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

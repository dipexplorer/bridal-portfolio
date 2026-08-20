"use client";

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useTransform } from 'framer-motion';

export default function BeforeAfter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  // All motion values and transforms at the TOP LEVEL — no hooks inside JSX
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

  // Pointer Events API — works for both mouse and touch in one unified system
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

  return (
    <section className="py-24 px-6 bg-charcoal border-t border-white/10" id="before-after">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

        {/* Text Content */}
        <div className="lg:w-1/3 w-full text-left shrink-0">
          <span
            className="font-mono text-[9px] uppercase tracking-widest text-[#E52E2D] mb-6 block font-bold"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            [ The Transformation ]
          </span>
          <h2
            className="text-4xl sm:text-5xl lg:text-[3.5vw] text-white uppercase mb-6 leading-tight"
            style={{ fontFamily: 'var(--font-cormorant), serif' }}
          >
            The Art of<br />
            <span className="italic font-light text-white/50">Refinement</span>
          </h2>
          <p
            className="text-sm text-white/60 leading-relaxed mb-8"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Makeup isn't about hiding; it's about amplifying. Drag to see how we elevate natural beauty into high-fashion editorial perfection using advanced contouring, color theory, and skin-prep techniques.
          </p>
          <div className="flex items-center gap-4 text-[#E52E2D] text-xs tracking-widest uppercase font-semibold">
            <span>Before</span>
            <div className="flex-1 h-px bg-[#E52E2D]/30" />
            <span>After</span>
          </div>
        </div>

        {/* Slider Container */}
        <div
          ref={containerRef}
          className="lg:w-2/3 w-full aspect-4/5 sm:aspect-video relative overflow-hidden select-none touch-none cursor-ew-resize"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {/* Base Image — After (always visible underneath) */}
          <Image
            src="/gallery/prada_editorial_campaign_v2.png"
            alt="After Makeup"
            fill
            unoptimized
            draggable={false}
            className="object-cover object-center pointer-events-none select-none"
            sizes="(max-width: 1024px) 100vw, 66vw"
          />
          <div className="absolute top-4 right-4 z-30 px-3 py-1.5 bg-black/70 backdrop-blur-md rounded-full text-[9px] uppercase tracking-widest text-white border border-white/20 pointer-events-none">
            After
          </div>

          {/* Overlay Image — Before (clipped by slider position) */}
          <motion.div
            className="absolute inset-0 z-10 will-change-[clip-path]"
            style={{ clipPath: clipPathStyle }}
          >
            <Image
              src="/gallery/rawcanvas_v2.png"
              alt="Before Makeup"
              fill
              unoptimized
              draggable={false}
              className="object-cover object-center pointer-events-none select-none"
              sizes="(max-width: 1024px) 100vw, 66vw"
            />
            <div className="absolute top-4 left-4 z-30 px-3 py-1.5 bg-black/70 backdrop-blur-md rounded-full text-[9px] uppercase tracking-widest text-white/70 border border-white/20 pointer-events-none">
              Before
            </div>
          </motion.div>

          {/* Slider Line & Handle */}
          <motion.div
            className="absolute top-0 bottom-0 w-[2px] bg-[#E52E2D] z-20 flex items-center justify-center shadow-[0_0_12px_rgba(229,46,45,0.9)] will-change-[left] pointer-events-none"
            style={{ left: sliderLeft }}
          >
            <div className="w-10 h-10 rounded-full border-2 border-[#E52E2D] bg-charcoal flex items-center justify-center shadow-2xl shrink-0">
              <div className="flex gap-1">
                <div className="w-[2px] h-3 bg-white/60 rounded-full" />
                <div className="w-[2px] h-3 bg-white/60 rounded-full" />
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

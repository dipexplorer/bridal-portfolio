"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function StorySection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const pathLength1 = useTransform(scrollYProgress, [0.1, 0.45], [0, 1]);
  const pathLength2 = useTransform(scrollYProgress, [0.35, 0.65], [0, 1]);
  const pathLength3 = useTransform(scrollYProgress, [0.55, 0.85], [0, 1]);
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.35, 0.7, 0.9], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.1, 0.35, 0.7, 0.9], [50, 0, 0, -50]);

  return (
    <section
      ref={containerRef}
      id="story"
      className="relative min-h-[200vh] flex flex-col items-center justify-start bg-[#0a0a0a]"
    >
      {/* Sticky text block */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="text-center z-10 flex flex-col items-center w-full px-6"
        >
          <span
            className="text-[10px] uppercase tracking-[0.45em] text-[#E52E2D] mb-8"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            The Craft
          </span>
          <h2
            className="text-6xl md:text-[8vw] text-white uppercase leading-none tracking-tighter"
            style={{ fontFamily: "var(--font-cormorant), serif" }}
          >
            From a Single Stroke<br />
            <span className="italic font-light text-white/40">to a Complete Vision</span>
          </h2>
          <p
            className="mt-12 text-sm md:text-base text-white/60 leading-relaxed max-w-xl mx-auto"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Every editorial look is more than makeup—it is a carefully composed story of high-fashion elegance, 
            bold contrast, and striking modernity. Each brush stroke and sculpted contour speaks of a 
            decade of devoted artistry.
          </p>
        </motion.div>

        {/* Minimalist background typographic watermarks driven by scroll */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-[#111111] whitespace-nowrap z-0 font-serif italic"
          style={{ 
            fontSize: "clamp(10rem, 30vw, 40rem)", 
            fontFamily: "var(--font-cormorant), serif",
            x: useTransform(scrollYProgress, [0, 1], ["-10%", "-50%"])
          }}
        >
          Artistry
        </motion.div>
      </div>
    </section>
  );
}

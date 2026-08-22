"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, useTransform, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";

export default function Hero({ onBookClick }: { onBookClick?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isGlam, setIsGlam] = useState(false);

  // Mouse cursor tracking for glow effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 200, mass: 0.6 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top } = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  // Track scroll progress within this 250vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Use a discrete trigger instead of pixel-by-pixel scrubbing
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.15 && !isGlam) {
      setIsGlam(true);
    } 
    else if (latest <= 0.15 && isGlam) {
      setIsGlam(false);
    }
  });

  // Fade out the main text towards the very end of the scroll track
  const textOpacity = useTransform(scrollYProgress, [0.7, 0.9], [1, 0]);
  const textY = useTransform(scrollYProgress, [0.7, 0.9], [0, -50]);

  return (
    <section
      ref={containerRef}
      id="home"
      onMouseMove={handleMouseMove}
      className="relative h-[250vh] w-full bg-charcoal"
    >
      {/* Sticky container that locks the view while scrolling through the track */}
      <div className="sticky top-0 h-svh w-full overflow-hidden flex flex-col justify-end">
        
        {/* Background Images & Overlay Graphics */}
        <div className="absolute inset-0 w-full h-full">
          
          {/* Frame 1: Bare-face (Base) */}
          <motion.div 
            className="absolute inset-0 w-full h-full z-0"
            animate={{ scale: isGlam ? 1.03 : 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          >
            <Image
              src="/gallery/frame1.png"
              alt="Bare Face"
              fill
              unoptimized
              className="object-cover object-center grayscale contrast-125 brightness-90"
              sizes="100vw"
              priority
            />
          </motion.div>

          {/* Creative Layout Graphics (Visible only in B&W Frame 1) */}
          <motion.div
            className="absolute inset-0 z-10 pointer-events-none hidden sm:block"
            animate={{ opacity: isGlam ? 0 : 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            {/* Focal Crop Frame Corners */}
            <div className="absolute top-28 left-8 w-12 h-12 border-t border-l border-white/20" />
            <div className="absolute top-28 right-8 w-12 h-12 border-t border-r border-white/20" />
            <div className="absolute bottom-28 left-8 w-12 h-12 border-b border-l border-white/20" />
            <div className="absolute bottom-28 right-8 w-12 h-12 border-b border-r border-white/20" />

            {/* Central Alignment Crosshair */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center">
              <div className="absolute w-full h-px bg-white/15" />
              <div className="absolute h-full w-px bg-white/15" />
              <div className="w-2 h-2 rounded-full border border-[#E52E2D]/40" />
            </div>

            {/* Technical Metadata Indicators */}
            <div className="absolute top-28 left-24 font-mono text-[9px] text-white/30 tracking-[0.2em] uppercase hidden md:block">
              SYS_REF: RAW_CANVAS
            </div>
            <div className="absolute top-28 right-24 font-mono text-[9px] text-[#E52E2D]/40 tracking-[0.2em] uppercase hidden md:block">
              FOCAL_PT: 049.2 // B_W
            </div>
          </motion.div>
          
          {/* Spotlight Cursor Glow (Visible only in B&W Frame 1) */}
          <motion.div
            className="absolute rounded-full pointer-events-none z-10 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(229,46,45,0.18)_0%,rgba(229,46,45,0)_70%)] mix-blend-screen"
            style={{
              x: cursorX,
              y: cursorY,
              translateX: "-50%",
              translateY: "-50%",
              opacity: isGlam ? 0 : 1,
            }}
            transition={{ opacity: { duration: 0.8 } }}
          />

          {/* Frame 2: Glam-makeup - Fades beautifully over Frame 1 */}
          <motion.div 
            className="absolute inset-0 w-full h-full z-20"
            animate={{ 
              opacity: isGlam ? 1 : 0,
              scale: isGlam ? 1.03 : 1
            }}
            transition={{ duration: 2, ease: "easeInOut" }}
          >
            <Image
              src="/gallery/frame2.png"
              alt="Luxe Editorial Makeup"
              fill
              unoptimized
              className="object-cover object-center"
              sizes="100vw"
              priority
            />
          </motion.div>

          {/* Dynamic Vignette & Contrast Overlays */}
          <div className="absolute inset-0 bg-black/10 z-30 pointer-events-none" />
          <div className="absolute inset-0 bg-linear-to-t from-[#060606] via-[#060606]/30 to-black/80 z-30 pointer-events-none" />
          {/* Extra dark gradient at the very top specifically for the navigation bar */}
          <div className="absolute top-0 left-0 w-full h-40 bg-linear-to-b from-black/90 to-transparent z-30 pointer-events-none" />
        </div>

        {/* Hero Content Overlay */}
        <motion.div 
          className="relative z-40 w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 pb-16 md:pb-24 pt-32 flex flex-col justify-end h-full pointer-events-none"
          style={{ opacity: textOpacity, y: textY }}
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 w-full">
            
            {/* Main Typography */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-col"
            >
              <div className="flex items-start">
                <h1
                  className="text-[12vw] sm:text-8xl md:text-[9vw] lg:text-[10vw] leading-[0.85] tracking-tighter uppercase font-serif text-white drop-shadow-xl pointer-events-auto"
                  style={{ fontFamily: "var(--font-cormorant), serif" }}
                >
                  LUXE
                </h1>
                <div className="w-2 h-2 md:w-3 md:h-3 lg:w-4 lg:h-4 bg-[#E52E2D] mt-3 md:mt-4 lg:mt-6 ml-1 lg:ml-2 shadow-[0_0_15px_rgba(229,46,45,0.6)]" />
              </div>
              
              <p 
                className="mt-6 md:mt-8 max-w-sm text-white/70 text-[13px] md:text-sm leading-[1.8] font-light pointer-events-auto"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Mastering the art of high-fashion and editorial bridal artistry. 
                Elevating natural beauty through a lens of modern luxury.
              </p>
            </motion.div>

            {/* Call to action & Secondary text */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-col items-start md:items-end gap-8"
            >
              <div className="text-left md:text-right hidden sm:block pointer-events-auto">
                <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#E52E2D] mb-2 font-bold">
                  Available Worldwide
                </p>
                <p className="font-mono text-[10px] text-white/50 tracking-widest">
                  Based in Paris &amp; Mumbai
                </p>
              </div>

              <button
                onClick={onBookClick}
                className="pointer-events-auto group relative flex items-center justify-center px-10 py-5 bg-transparent border border-white/30 text-white overflow-hidden transition-all duration-500 hover:border-[#E52E2D]"
              >
                <span className="relative z-10 font-mono text-[9px] uppercase tracking-[0.35em] group-hover:text-white transition-colors duration-300">
                  Reserve a Session
                </span>
                {/* Hover fill effect */}
                <div className="absolute inset-0 bg-[#E52E2D] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] z-0" />
              </button>
            </motion.div>
            
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-auto">
            <div className="w-px h-12 bg-linear-to-b from-white/30 to-transparent" />
            <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-white/30">Scroll</span>
          </div>

        </motion.div>
      </div>
    </section>
  );
}

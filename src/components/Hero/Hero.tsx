"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Hero({ onBookClick }: { onBookClick?: () => void }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const cursorRevealRef = useRef<HTMLDivElement>(null);
  const scrollRevealRef = useRef<HTMLDivElement>(null);
  const bgPhotoRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);

  const rafIdRef = useRef<number | null>(null);
  const isScrolledRef = useRef<boolean>(false);

  // Phase 1: Mouse movement handler for idle cursor reveal lens
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isScrolledRef.current) return;
    if (!cursorRevealRef.current || !heroRef.current) return;

    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (rafIdRef.current !== null) return;

    rafIdRef.current = requestAnimationFrame(() => {
      if (cursorRevealRef.current && !isScrolledRef.current) {
        cursorRevealRef.current.style.setProperty("--mouse-x", `${x}px`);
        cursorRevealRef.current.style.setProperty("--mouse-y", `${y}px`);
      }
      rafIdRef.current = null;
    });
  };

  const handleMouseLeave = () => {
    if (cursorRevealRef.current && !isScrolledRef.current) {
      cursorRevealRef.current.style.setProperty("--mouse-x", `-500px`);
      cursorRevealRef.current.style.setProperty("--mouse-y", `-500px`);
    }
  };

  // Phase 2: GSAP ScrollTrigger timeline for scroll-driven before-to-after makeup transform
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!trackRef.current || !heroRef.current || !scrollRevealRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: trackRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: heroRef.current,
          pinSpacing: false,
          scrub: 1,
          onUpdate: (self) => {
            const isScrolled = self.progress > 0.001;
            isScrolledRef.current = isScrolled;

            if (cursorRevealRef.current) {
              if (isScrolled) {
                // Deactivate Phase 1 during scroll
                cursorRevealRef.current.style.opacity = "0";
                cursorRevealRef.current.style.setProperty("--mouse-x", "-500px");
                cursorRevealRef.current.style.setProperty("--mouse-y", "-500px");
              } else {
                // Re-activate Phase 1 at top of page (progress <= 0.001)
                cursorRevealRef.current.style.opacity = "1";
              }
            }
          },
          onLeaveBack: () => {
            isScrolledRef.current = false;
            if (cursorRevealRef.current) {
              cursorRevealRef.current.style.opacity = "1";
              cursorRevealRef.current.style.setProperty("--mouse-x", "-500px");
              cursorRevealRef.current.style.setProperty("--mouse-y", "-500px");
            }
          },
        },
      });

      // 1. Expand scroll reveal mask iris from 0px to 150vmax across full scrub duration (0 -> 1)
      tl.to(
        scrollRevealRef.current,
        {
          "--scroll-radius": "150vmax",
          ease: "none",
          duration: 1,
        },
        0
      );

      // 2. Background parallax photo movement & subtle scaling across full scrub duration (0 -> 1)
      if (bgPhotoRef.current) {
        tl.to(
          bgPhotoRef.current,
          {
            y: -60,
            scale: 1.05,
            ease: "none",
            duration: 1,
          },
          0
        );
      }
    }, trackRef);

    return () => ctx.revert();
  }, []);

  const wordmarkLetters = ["L", "U", "X", "E"];

  return (
    <div ref={trackRef} className="relative h-[250vh] w-full bg-charcoal">
      <section
        ref={heroRef}
        id="home"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="sticky top-0 h-svh w-full bg-charcoal overflow-hidden flex flex-col justify-end"
      >
        {/* Background Layer Container */}
        <div className="absolute inset-0 w-full h-full pointer-events-none select-none">
          
          {/* Layer 0: Base Bare-Face (BEFORE) Photo with Parallax */}
          <div ref={bgPhotoRef} className="absolute inset-0 w-full h-full z-0 transform-gpu">
            <Image
              src="/gallery/frame1.png"
              alt="Bare Face Base (Before)"
              fill
              unoptimized
              className="object-cover object-center grayscale contrast-125 brightness-90"
              sizes="100vw"
              priority
            />
          </div>

          {/* Layer 1: Phase 1 Idle Cursor Reveal Layer (AFTER photo revealed under mouse) */}
          <div
            ref={cursorRevealRef}
            className="absolute inset-0 w-full h-full z-10 transition-opacity duration-300"
            style={{
              maskImage:
                "radial-gradient(circle 220px at var(--mouse-x, -500px) var(--mouse-y, -500px), black 0%, black 40%, rgba(0,0,0,0.65) 70%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(circle 220px at var(--mouse-x, -500px) var(--mouse-y, -500px), black 0%, black 40%, rgba(0,0,0,0.65) 70%, transparent 100%)",
              maskMode: "alpha",
              WebkitMaskMode: "alpha",
            } as React.CSSProperties}
          >
            <Image
              src="/gallery/frame2.png"
              alt="Editorial Makeup Cursor Reveal"
              fill
              unoptimized
              className="object-cover object-center"
              sizes="100vw"
              priority
            />
          </div>

          {/* Layer 2: Phase 2 Scroll Reveal Layer (AFTER photo revealed via expanding iris) */}
          <div
            ref={scrollRevealRef}
            className="absolute inset-0 w-full h-full z-20"
            style={{
              maskImage:
                "radial-gradient(circle var(--scroll-radius, 0px) at 50% 50%, black 0%, black 50%, rgba(0,0,0,0.65) 75%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(circle var(--scroll-radius, 0px) at 50% 50%, black 0%, black 50%, rgba(0,0,0,0.65) 75%, transparent 100%)",
              maskMode: "alpha",
              WebkitMaskMode: "alpha",
            } as React.CSSProperties}
          >
            <Image
              src="/gallery/frame2.png"
              alt="Editorial Makeup Scroll Reveal"
              fill
              unoptimized
              className="object-cover object-center"
              sizes="100vw"
              priority
            />
          </div>

          {/* Technical Focal Framing Overlay */}
          <div className="absolute inset-0 z-30 pointer-events-none hidden sm:block">
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
              FOCAL_PT: 049.2 // TRANSFORM_EN
            </div>
          </div>

          {/* Dynamic Vignette & Contrast Overlays */}
          <div className="absolute inset-0 bg-black/10 z-30 pointer-events-none" />
          <div className="absolute inset-0 bg-linear-to-t from-[#060606] via-[#060606]/30 to-black/80 z-30 pointer-events-none" />
          <div className="absolute top-0 left-0 w-full h-40 bg-linear-to-b from-black/90 to-transparent z-30 pointer-events-none" />
        </div>

        {/* Hero Content Overlay */}
        <div
          ref={textContentRef}
          className="relative z-40 w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 pb-16 md:pb-24 pt-32 flex flex-col justify-end h-full pointer-events-none"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 w-full">
            {/* Main Typography */}
            <div className="flex flex-col">
              <div className="flex items-start overflow-hidden py-1">
                <h1
                  className="flex text-[12vw] sm:text-8xl md:text-[9vw] lg:text-[10vw] leading-[0.85] tracking-tighter uppercase font-serif text-white drop-shadow-xl pointer-events-auto"
                  style={{ fontFamily: "var(--font-cormorant), serif" }}
                >
                  {wordmarkLetters.map((letter, index) => (
                    <span key={index} className="inline-block overflow-hidden">
                      <motion.span
                        className="inline-block"
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{
                          duration: 0.8,
                          delay: 0.1 + index * 0.04,
                          ease: [0.215, 0.61, 0.355, 1],
                        }}
                      >
                        {letter}
                      </motion.span>
                    </span>
                  ))}
                </h1>
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                  className="w-2 h-2 md:w-3 md:h-3 lg:w-4 lg:h-4 bg-[#E52E2D] mt-3 md:mt-4 lg:mt-6 ml-1 lg:ml-2 shadow-[0_0_15px_rgba(229,46,45,0.6)]"
                />
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                className="mt-6 md:mt-8 max-w-sm text-white/70 text-[13px] md:text-sm leading-[1.8] font-light pointer-events-auto"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Mastering the art of high-fashion and editorial bridal artistry.
                Elevating natural beauty through a lens of modern luxury.
              </motion.p>
            </div>

            {/* Call to Action & Location details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-auto"
          >
            <div className="w-px h-12 bg-linear-to-b from-white/30 to-transparent" />
            <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-white/30">
              Scroll
            </span>
          </motion.div>
        </div>
      </section>
    </div>
  );
}





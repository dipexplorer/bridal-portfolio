"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Play } from "lucide-react";
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

  // Mouse movement handler for idle cursor reveal lens
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

  // Touch event support for mobile drag-to-reveal
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isScrolledRef.current) return;
    if (!cursorRevealRef.current || !heroRef.current) return;

    const touch = e.touches[0];
    const rect = heroRef.current.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    if (cursorRevealRef.current && !isScrolledRef.current) {
      cursorRevealRef.current.style.setProperty("--mouse-x", `${x}px`);
      cursorRevealRef.current.style.setProperty("--mouse-y", `${y}px`);
    }
  };

  const handleMouseLeave = () => {
    if (cursorRevealRef.current && !isScrolledRef.current) {
      cursorRevealRef.current.style.setProperty("--mouse-x", `-500px`);
      cursorRevealRef.current.style.setProperty("--mouse-y", `-500px`);
    }
  };

  // Initial automatic slow reveal lens position for mobile on load
  useEffect(() => {
    if (cursorRevealRef.current) {
      // Default to center of screen for mobile touch initialization
      const width = window.innerWidth;
      const height = window.innerHeight;
      cursorRevealRef.current.style.setProperty("--mouse-x", `${width * 0.5}px`);
      cursorRevealRef.current.style.setProperty("--mouse-y", `${height * 0.4}px`);
    }
  }, []);

  // GSAP ScrollTrigger timeline for continuous scroll-driven before-to-after makeup transform
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
          scrub: 0.5,
          onUpdate: (self) => {
            const isScrolled = self.progress > 0.001;
            isScrolledRef.current = isScrolled;

            if (cursorRevealRef.current) {
              if (isScrolled) {
                cursorRevealRef.current.style.opacity = "0";
                cursorRevealRef.current.style.setProperty("--mouse-x", "-500px");
                cursorRevealRef.current.style.setProperty("--mouse-y", "-500px");
              } else {
                cursorRevealRef.current.style.opacity = "1";
              }
            }
          },
          onLeaveBack: () => {
            isScrolledRef.current = false;
            if (cursorRevealRef.current) {
              cursorRevealRef.current.style.opacity = "1";
            }
          },
        },
      });

      tl.to(
        scrollRevealRef.current,
        {
          "--scroll-radius": "70vmax",
          ease: "none",
          duration: 1,
        },
        0
      );

      if (bgPhotoRef.current) {
        tl.to(
          bgPhotoRef.current,
          {
            y: -50,
            scale: 1.05,
            ease: "none",
            duration: 1,
          },
          0
        );
      }

      if (textContentRef.current) {
        tl.to(
          textContentRef.current,
          {
            opacity: 0,
            y: -40,
            ease: "power1.out",
            duration: 0.3,
          },
          0
        );
      }
    }, trackRef);

    return () => ctx.revert();
  }, []);

  const wordmarkLetters = ["L", "U", "X", "E"];

  return (
    <div ref={trackRef} className="relative h-[160vh] w-full bg-[#060606]">
      <section
        ref={heroRef}
        id="home"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchMove}
        onTouchMove={handleTouchMove}
        className="sticky top-0 h-svh w-full bg-[#060606] overflow-hidden flex flex-col justify-end touch-none"
      >
        {/* Background Layer Container */}
        <div className="absolute inset-0 w-full h-full pointer-events-none select-none">
          
          {/* Layer 0: Base Bare-Face (BEFORE) Photo */}
          <div ref={bgPhotoRef} className="absolute inset-0 w-full h-full z-0 transform-gpu">
            <Image
              src="/gallery/frame1.png"
              alt="Bare Face Base (Before)"
              fill
              unoptimized
              className="object-cover object-[50%_25%] md:object-center grayscale contrast-125 brightness-90"
              sizes="100vw"
              priority
            />
          </div>

          {/* Layer 1: Phase 1 Idle Cursor / Touch Reveal Layer */}
          <div
            ref={cursorRevealRef}
            className="absolute inset-0 w-full h-full z-10 transition-opacity duration-300"
            style={{
              maskImage:
                "radial-gradient(circle 200px at var(--mouse-x, 50%) var(--mouse-y, 40%), black 0%, black 40%, rgba(0,0,0,0.65) 70%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(circle 200px at var(--mouse-x, 50%) var(--mouse-y, 40%), black 0%, black 40%, rgba(0,0,0,0.65) 70%, transparent 100%)",
              maskMode: "alpha",
              WebkitMaskMode: "alpha",
            } as React.CSSProperties}
          >
            <Image
              src="/gallery/frame2.png"
              alt="Editorial Makeup Cursor Reveal"
              fill
              unoptimized
              className="object-cover object-[50%_25%] md:object-center"
              sizes="100vw"
              priority
            />
          </div>

          {/* Layer 2: Phase 2 Scroll Reveal Layer */}
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
              className="object-cover object-[50%_25%] md:object-center"
              sizes="100vw"
              priority
            />
          </div>

          {/* Vignette Overlays */}
          <div className="absolute inset-0 bg-black/20 z-30 pointer-events-none" />
          <div className="absolute inset-0 bg-linear-to-t from-[#060606] via-[#060606]/40 to-black/70 z-30 pointer-events-none" />
        </div>

        {/* Hero Content Overlay */}
        <div
          ref={textContentRef}
          className="relative z-40 w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 pb-16 md:pb-24 pt-28 flex flex-col justify-end h-full pointer-events-none"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-12 w-full">
            {/* Main Typography */}
            <div className="flex flex-col">

              {/* TIER 1: Category Eyebrow Tag */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.05, ease: "easeOut" }}
                className="flex items-center gap-3.5 mb-5 md:mb-6 pointer-events-auto"
              >
                <div className="w-10 sm:w-12 h-0.5 bg-[#E52E2D] shadow-[0_0_10px_rgba(229,46,45,0.8)] shrink-0" />
                <span className="font-mono text-xs sm:text-sm uppercase tracking-[0.35em] text-white/80 font-medium">
                  Bridal&nbsp;<span className="text-[#E52E2D] font-bold">|</span>&nbsp;Fashion&nbsp;<span className="text-[#E52E2D] font-bold">|</span>&nbsp;Editorial
                </span>
              </motion.div>

              {/* TIER 2: LUXE Wordmark (unchanged size) */}
              <div className="flex items-start overflow-hidden py-1">
                <h1
                  className="flex text-7xl sm:text-8xl md:text-[9vw] lg:text-[10vw] leading-[0.85] tracking-tighter uppercase font-serif text-white drop-shadow-xl pointer-events-auto"
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
                  className="w-2.5 h-2.5 md:w-3 md:h-3 lg:w-4 lg:h-4 bg-[#E52E2D] mt-3 md:mt-4 lg:mt-6 ml-1.5 shadow-[0_0_15px_rgba(229,46,45,0.6)]"
                />
              </div>

              {/* TIER 3: Secondary Tagline (Prominent tier: 20-26px, clear vertical spacing) */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.42, ease: "easeOut" }}
                className="mt-7 md:mt-9 lg:mt-10 font-mono text-lg sm:text-xl md:text-2xl tracking-[0.28em] uppercase text-white/70 pointer-events-auto leading-snug font-light"
              >
                Timeless Beauty,&nbsp;<span className="font-bold text-white tracking-[0.28em] drop-shadow-md">Modern Luxury</span>
              </motion.p>

              {/* TIER 4: Body Copy */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                className="mt-6 md:mt-8 max-w-md sm:max-w-lg text-white/80 text-sm sm:text-base leading-[1.85] font-normal pointer-events-auto"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Mastering the art of high-fashion and editorial bridal artistry. Elevating natural beauty through a lens of modern luxury.
              </motion.p>

              {/* DUAL CTA (Under body copy with clear vertical breathing room) */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.62, ease: "easeOut" }}
                className="mt-8 md:mt-10 flex flex-row flex-wrap items-center gap-4 md:gap-5 pointer-events-auto"
              >
                {/* Primary CTA */}
                <button
                  onClick={onBookClick}
                  className="min-h-[48px] px-7 md:px-8 py-3.5 bg-[#E52E2D] border border-[#E52E2D] text-white font-mono text-[9px] uppercase tracking-[0.35em] transition-all duration-300 hover:bg-[#c01f1f] hover:border-[#c01f1f] flex items-center justify-center cursor-pointer shadow-[0_0_20px_rgba(229,46,45,0.35)] hover:shadow-[0_0_30px_rgba(229,46,45,0.6)]"
                >
                  Reserve a Session
                </button>

                {/* Secondary CTA: Watch Our Story */}
                <a
                  href="#story"
                  className="flex items-center gap-3 group min-h-[48px] px-1"
                  aria-label="Watch Our Story"
                >
                  <span className="w-10 h-10 md:w-11 md:h-11 rounded-full border border-white/30 flex items-center justify-center text-white/80 group-hover:border-[#E52E2D] group-hover:text-[#E52E2D] group-hover:shadow-[0_0_14px_rgba(229,46,45,0.4)] transition-all duration-300 shrink-0">
                    <Play size={13} className="ml-0.5" fill="currentColor" />
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/60 group-hover:text-white/90 transition-colors duration-300">
                    Watch Our Story
                  </span>
                </a>
              </motion.div>

            </div>

            {/* Location tag (right-aligned on desktop) — CTA moved to left column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.68, ease: "easeOut" }}
              className="hidden md:flex flex-col items-end gap-4"
            >
              <div className="text-right font-mono text-[9px] uppercase tracking-[0.25em] text-white/50 pointer-events-auto">
                <span className="text-[#E52E2D] font-bold block mb-1">Available Worldwide</span>
                <span>Based in Paris &amp; Mumbai</span>
              </div>
            </motion.div>
          </div>

          {/* Touch Hint / Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-auto"
          >
            <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-white/40 md:hidden">
              Touch to reveal makeup
            </span>
            <div className="w-px h-8 bg-linear-to-b from-white/30 to-transparent" />
          </motion.div>
        </div>
      </section>
    </div>
  );
}

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

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                className="mt-4 md:mt-8 max-w-sm text-white/80 text-xs sm:text-sm leading-[1.8] font-light pointer-events-auto"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Mastering the art of high-fashion and editorial bridal artistry. Elevating natural beauty through a lens of modern luxury.
              </motion.p>
            </div>

            {/* Call to Action & Location details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
              className="flex flex-col items-start md:items-end gap-4 md:gap-8"
            >
              <button
                onClick={onBookClick}
                className="pointer-events-auto w-full sm:w-auto min-h-[48px] px-8 md:px-10 py-4 bg-[#E52E2D] md:bg-transparent border border-[#E52E2D] md:border-white/30 text-white font-mono text-[9px] uppercase tracking-[0.35em] transition-all duration-300 hover:bg-[#E52E2D] hover:border-[#E52E2D] flex items-center justify-center cursor-pointer shadow-[0_0_20px_rgba(229,46,45,0.3)]"
              >
                Reserve a Session
              </button>

              <div className="text-left md:text-right font-mono text-[9px] uppercase tracking-[0.25em] text-white/50 pointer-events-auto">
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

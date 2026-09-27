"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Play, Sparkles, Award, X, Volume2, VolumeX } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Hero({ onBookClick }: { onBookClick?: () => void }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const cursorRevealRef = useRef<HTMLDivElement>(null);
  const scrollRevealRef = useRef<HTMLDivElement>(null);
  const bgPhotoRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const afterTextContentRef = useRef<HTMLDivElement>(null);

  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

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

      if (afterTextContentRef.current) {
        gsap.set(afterTextContentRef.current, { opacity: 0, y: 30 });
        tl.to(
          afterTextContentRef.current,
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            duration: 0.5,
          },
          0.35
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

        {/* Top-Right Interactive Glassmorphism Lens Indicator Tag */}
        <div className="absolute top-28 right-6 md:right-16 lg:right-24 z-40 hidden sm:flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 shadow-[0_0_20px_rgba(0,0,0,0.8)] font-mono text-[9px] uppercase tracking-[0.25em] text-white/80 pointer-events-auto">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E52E2D] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E52E2D]"></span>
          </span>
          <span>Hover to reveal editorial makeup</span>
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
                <div className="w-10 sm:w-12 h-0.5 bg-[#E52E2D] shadow-[0_0_12px_rgba(229,46,45,0.9)] shrink-0" />
                <span
                  className="text-xs sm:text-sm uppercase tracking-[0.38em] text-white/90 font-semibold"
                  style={{ fontFamily: "var(--font-cinzel), serif" }}
                >
                  Bridal&nbsp;<span className="text-[#E52E2D] font-bold">|</span>&nbsp;Fashion&nbsp;<span className="text-[#E52E2D] font-bold">|</span>&nbsp;Editorial
                </span>
              </motion.div>

              {/* TIER 2: LUXE Wordmark (Vogue High-Fashion Serifs) */}
              <div className="flex items-start overflow-hidden py-1">
                <h1
                  className="flex text-7xl sm:text-8xl md:text-[9.5vw] lg:text-[10.5vw] leading-[0.82] tracking-tight uppercase font-serif text-white drop-shadow-[0_15px_40px_rgba(0,0,0,0.9)] pointer-events-auto font-medium"
                  style={{ fontFamily: "var(--font-bodoni), serif" }}
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
                  className="w-2.5 h-2.5 md:w-3 md:h-3 lg:w-4 lg:h-4 bg-[#E52E2D] mt-3 md:mt-4 lg:mt-6 ml-1.5 shadow-[0_0_15px_rgba(229,46,45,0.8)]"
                />
              </div>

              {/* TIER 3: Secondary Tagline (Italiana High-Fashion Serif Display) */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.42, ease: "easeOut" }}
                className="mt-7 md:mt-9 lg:mt-10 text-xl sm:text-2xl md:text-3xl lg:text-[28px] tracking-[0.28em] uppercase text-white/80 pointer-events-auto leading-snug font-light"
                style={{ fontFamily: "var(--font-italiana), serif" }}
              >
                Timeless Beauty,&nbsp;<span className="font-bold text-white tracking-[0.3em] drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">Modern Luxury</span>
              </motion.p>

              {/* TIER 4: Body Copy (Plus Jakarta Sans Geometric Precision) */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                className="mt-6 md:mt-8 max-w-md sm:max-w-lg text-white/85 text-sm sm:text-base leading-[1.85] font-light pointer-events-auto tracking-wide"
                style={{ fontFamily: "var(--font-jakarta), sans-serif" }}
              >
                Mastering the art of high-fashion and editorial bridal artistry. Elevating natural beauty through a lens of modern luxury.
              </motion.p>

              {/* DUAL CTA */}
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
                <button
                  onClick={() => setIsVideoOpen(true)}
                  className="flex items-center gap-3 group min-h-[48px] px-1 cursor-pointer"
                  aria-label="Watch Our Story"
                >
                  <span className="w-10 h-10 md:w-11 md:h-11 rounded-full border border-white/30 flex items-center justify-center text-white/80 group-hover:border-[#E52E2D] group-hover:text-[#E52E2D] group-hover:shadow-[0_0_14px_rgba(229,46,45,0.4)] transition-all duration-300 shrink-0">
                    <Play size={13} className="ml-0.5" fill="currentColor" />
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/60 group-hover:text-white/90 transition-colors duration-300">
                    Watch Our Story
                  </span>
                </button>
              </motion.div>

            </div>

            {/* Location & Trust Markers (Right-aligned on desktop) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.68, ease: "easeOut" }}
              className="hidden md:flex flex-col items-end gap-3.5 pointer-events-auto"
            >
              <div className="text-right font-mono text-[9px] uppercase tracking-[0.25em] text-white/60">
                <span className="text-[#E52E2D] font-bold block mb-1 tracking-[0.3em]">Available Worldwide</span>
                <span>Based in Paris &amp; Mumbai</span>
              </div>

              <div className="flex flex-col items-end gap-1.5 pt-3 border-t border-white/10">
                <div className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.2em] text-white/70 bg-white/5 px-3 py-1 rounded-xs border border-white/10">
                  <Sparkles size={10} className="text-[#E52E2D]" />
                  <span>500+ Editorial Brides</span>
                </div>
                <div className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.2em] text-white/50">
                  <Award size={10} className="text-[#E52E2D]" />
                  <span>Vogue &amp; Elle Featured</span>
                </div>
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

        {/* Phase 2: Post-Transform Editorial Overlay (Appears as scroll reveals full makeup) */}
        <div
          ref={afterTextContentRef}
          className="absolute inset-0 z-40 w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 pb-12 md:pb-20 pt-28 flex flex-col justify-between pointer-events-none opacity-0"
        >
          {/* Top Banner / Editorial Headline */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pointer-events-auto">
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-10 sm:w-12 h-0.5 bg-[#E52E2D] shadow-[0_0_10px_rgba(229,46,45,0.8)]" />
                <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-[#E52E2D] font-bold">
                  Editorial Reveal // Couture Finish
                </span>
              </div>
              <h2
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white uppercase font-serif leading-tight tracking-tight drop-shadow-2xl"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                Sculpted Perfection
              </h2>
              <p className="font-mono text-[10px] sm:text-xs tracking-[0.28em] text-white/75 uppercase mt-2 font-light">
                High-Definition Artistry &amp; Luminous Velvet Skin
              </p>
            </div>

            {/* Top Right Quick Action Badge */}
            <button
              onClick={onBookClick}
              className="self-start px-7 py-3 rounded-full bg-black/60 backdrop-blur-md border border-[#E52E2D]/60 text-white font-mono text-[9px] uppercase tracking-[0.3em] font-bold hover:bg-[#E52E2D] hover:border-[#E52E2D] transition-all cursor-pointer shadow-[0_0_25px_rgba(229,46,45,0.4)]"
            >
              Reserve This Look
            </button>
          </div>

          {/* Middle: Feature Hotspots / Editorial Callout Badges */}
          <div className="hidden md:grid grid-cols-2 gap-12 w-full my-auto pointer-events-auto">
            {/* Left Feature Callout */}
            <div className="flex flex-col items-start gap-1.5 p-4 rounded-xs bg-black/50 backdrop-blur-md border border-white/15 max-w-sm shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#E52E2D] font-bold flex items-center gap-2">
                <Sparkles size={11} /> Graphic Eyeliner Artistry
              </span>
              <p className="text-xs text-white/80 font-light leading-relaxed">
                Custom winged contouring with carbon black pigment for high-fashion runway editorial looks.
              </p>
            </div>

            {/* Right Feature Callout */}
            <div className="flex flex-col items-end text-right gap-1.5 p-4 rounded-xs bg-black/50 backdrop-blur-md border border-white/15 max-w-sm ml-auto shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#E52E2D] font-bold flex items-center gap-2">
                <Sparkles size={11} /> Luminous Glass Skin
              </span>
              <p className="text-xs text-white/80 font-light leading-relaxed">
                Hydrating couture base with sculpted highlights and deep berry matte velvet lips.
              </p>
            </div>
          </div>

          {/* Bottom Bar / Explore Navigation */}
          <div className="flex items-center justify-between pt-6 border-t border-white/15 pointer-events-auto">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E52E2D] shadow-[0_0_12px_rgba(229,46,45,1)] animate-ping" />
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/80 font-medium">
                Transform Complete — High Fashion Couture
              </span>
            </div>

            <a
              href="#about"
              className="flex items-center gap-2.5 group font-mono text-[9px] uppercase tracking-[0.3em] text-white/70 hover:text-white transition-colors"
            >
              <span>Explore Artist Profile</span>
              <span className="w-7 h-7 rounded-full border border-white/30 group-hover:border-[#E52E2D] group-hover:text-[#E52E2D] flex items-center justify-center transition-all">
                ↓
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Luxury Cinematic Story Film Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12 pointer-events-auto"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-6 right-6 md:top-8 md:right-8 w-12 h-12 rounded-full border border-white/20 bg-white/5 text-white flex items-center justify-center hover:bg-[#E52E2D] hover:border-[#E52E2D] transition-all cursor-pointer z-20 shadow-lg"
              aria-label="Close Story Video"
            >
              <X size={20} />
            </button>

            {/* Video / Editorial Reel Container */}
            <div className="relative w-full max-w-5xl aspect-video bg-[#0a0a0a] rounded-sm border border-white/15 overflow-hidden flex flex-col justify-between p-6 md:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.95)]">
              {/* Background Editorial Visuals */}
              <div className="absolute inset-0 z-0">
                <Image
                  src="/gallery/frame2.png"
                  alt="Couture Story Presentation"
                  fill
                  unoptimized
                  className="object-cover opacity-35 filter brightness-90 scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent" />
              </div>

              {/* Modal Header */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-px bg-[#E52E2D]" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-[#E52E2D] font-bold">
                    Couture Film // Editorial Vision
                  </span>
                </div>
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/50 hidden sm:inline">
                  Paris • London • Mumbai
                </span>
              </div>

              {/* Center Editorial Quote */}
              <div className="relative z-10 my-auto max-w-2xl">
                <span
                  className="text-2xl sm:text-4xl md:text-5xl text-white uppercase font-serif leading-tight tracking-tight block mb-4"
                  style={{ fontFamily: 'var(--font-cormorant), serif' }}
                >
                  "Elevating natural grace into timeless editorial perfection."
                </span>
                <p className="font-mono text-xs text-white/70 tracking-widest uppercase flex items-center gap-2">
                  <span className="w-4 h-px bg-[#E52E2D]" />
                  Master Artist &amp; Visionary Founder
                </p>
              </div>

              {/* Modal Footer Controls */}
              <div className="relative z-10 flex items-center justify-between pt-6 border-t border-white/15">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="w-9 h-9 rounded-full border border-white/20 bg-white/5 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                  </button>
                  <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-white/50">
                    {isMuted ? 'Ambient Soundtrack Muted' : 'Ambient Audio Active'}
                  </span>
                </div>

                <button
                  onClick={() => {
                    setIsVideoOpen(false);
                    onBookClick?.();
                  }}
                  className="px-6 py-2.5 bg-[#E52E2D] text-white font-mono text-[9px] uppercase tracking-[0.3em] font-bold shadow-[0_0_20px_rgba(229,46,45,0.4)] hover:bg-[#c01f1f] transition-all cursor-pointer"
                >
                  Reserve Your Session
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


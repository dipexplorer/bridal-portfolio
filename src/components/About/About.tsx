'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pinned reveal animation for editorial fashion layout
      gsap.fromTo(
        imageRef.current,
        { scale: 0.8, clipPath: 'inset(10% 10% 10% 10% round 8px)' },
        {
          scale: 1.0,
          clipPath: 'inset(0% 0% 0% 0% round 0px)',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'center center',
            scrub: 1,
          }
        }
      );

      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            end: 'center 40%',
            scrub: 1.5,
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center bg-charcoal py-24 overflow-hidden border-b border-white/[0.03]"
      id="about"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-center w-full">
        {/* Left Column: Image scaling and clipping reveal */}
        <div className="md:col-span-6 flex justify-center relative z-10">
          <div
            ref={imageRef}
            className="relative w-full aspect-[3/4] max-w-md overflow-hidden bg-white/[0.02]"
            style={{ willChange: 'transform, clip-path' }}
          >
            <Image
              src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop"
              alt="Valerie Studio Editorial Portrait"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>

        {/* Right Column: Editorial story text */}
        <div ref={textRef} className="md:col-span-6 space-y-8 relative z-10 text-left">
          <span className="font-mono text-[9px] uppercase tracking-widest text-accent font-bold">
            [ The Artist ]
          </span>
          <h2 className="font-serif italic font-light text-4xl sm:text-6xl text-text-primary leading-tight">
            Valerie Laurent
          </h2>
          <p className="font-sans font-light text-text-secondary text-base sm:text-lg leading-relaxed">
            For over a decade, Valerie has been defining high-fashion bridal and editorial aesthetics. 
            Blending soft luxury textures with striking structural highlights, her signature style is 
            focused on clean, radiant elegance. 
          </p>
          <p className="font-sans font-light text-text-secondary text-base leading-relaxed">
            She works closely with each client to sculpt a look that feels uniquely couture. Having worked 
            behind the scenes on fashion runways and high-end bridal campaigns, Valerie brings a refined 
            editorial perspective to real-world luxury makeup.
          </p>
          
          <div className="pt-4 flex flex-col sm:flex-row gap-8 items-start sm:items-center">
            <div>
              <div className="text-3xl font-serif text-accent">10+</div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-text-tertiary mt-1">Years Experience</div>
            </div>
            <div className="h-px w-12 bg-white/10 hidden sm:block" />
            <div>
              <div className="text-3xl font-serif text-accent">200+</div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-text-tertiary mt-1">Brides Showcased</div>
            </div>
            <div className="h-px w-12 bg-white/10 hidden sm:block" />
            <div>
              <div className="text-3xl font-serif text-accent">3</div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-text-tertiary mt-1">Global Campaigns</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

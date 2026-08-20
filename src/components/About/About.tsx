'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <section
      className="relative bg-[#060606] py-32 lg:py-48 border-t border-white/[0.05] overflow-hidden"
      id="about"
    >
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#E52E2D]/[0.02] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-[-20%] w-[800px] h-[800px] bg-white/[0.01] blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Eyebrow */}
        <div className="mb-16 md:mb-24">
          <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-[#E52E2D] font-bold flex items-center gap-3">
            <span className="w-5 h-px bg-[#E52E2D]" />
            The Artist
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Left Column: Image with offset frame */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative aspect-[3/4] w-full max-w-md mx-auto lg:max-w-none group"
            >
              {/* Decorative wireframe border offset */}
              <div className="absolute -inset-2 md:-inset-4 border border-white/[0.05] transition-transform duration-700 group-hover:-inset-1 md:group-hover:-inset-3 z-0" />
              
              <div className="absolute inset-0 bg-[#0f0f0f] overflow-hidden z-10">
                <Image
                  src="/gallery/behide_the_scene.png"
                  alt="Valerie Studio Behind the Scenes"
                  fill
                  unoptimized
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out scale-100 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 40vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Signature tag on image */}
                <div className="absolute bottom-6 left-6 z-20">
                  <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-white/50 border border-white/20 px-3 py-1.5 backdrop-blur-sm">
                    Est. 2014
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Editorial story text & Stats */}
          <div className="lg:col-span-7 flex flex-col justify-center pt-8 lg:pt-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <h2 
                className="text-[12vw] sm:text-7xl lg:text-[6vw] text-white uppercase leading-[0.9] tracking-tight mb-8"
                style={{ fontFamily: 'var(--font-cormorant), serif' }}
              >
                Valerie<br />
                <span className="italic font-extralight text-white/40">Laurent</span>
              </h2>

              <div className="w-12 h-[2px] bg-[#E52E2D] mb-10" />

              <div className="space-y-6 max-w-xl">
                <p 
                  className="text-sm md:text-base text-white/60 leading-relaxed font-light"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  <span className="text-white text-xl md:text-2xl font-serif italic mr-2 leading-none" style={{ fontFamily: 'var(--font-cormorant), serif' }}>F</span>
                  or over a decade, Valerie has been defining high-fashion bridal and editorial aesthetics. 
                  Blending soft luxury textures with striking structural highlights, her signature style is 
                  focused on clean, radiant elegance. 
                </p>
                <p 
                  className="text-[13px] md:text-sm text-white/40 leading-[1.8] font-light"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  She works closely with each client to sculpt a look that feels uniquely couture. Having worked 
                  behind the scenes on fashion runways and high-end bridal campaigns, Valerie brings a refined 
                  editorial perspective to real-world luxury makeup.
                </p>
              </div>

              {/* Magazine-style Stats Grid */}
              <div className="mt-16 pt-12 border-t border-white/[0.05] grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-4">
                <div className="flex flex-col gap-2">
                  <div className="text-4xl lg:text-5xl font-serif text-[#E52E2D] tracking-tight" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                    10+
                  </div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
                    Years of Mastery
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 border-l border-white/5 pl-8 md:pl-4">
                  <div className="text-4xl lg:text-5xl font-serif text-white" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                    200+
                  </div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
                    Couture Brides
                  </div>
                </div>

                <div className="flex flex-col gap-2 col-span-2 md:col-span-1 border-t md:border-t-0 md:border-l border-white/5 pt-8 md:pt-0 md:pl-4">
                  <div className="text-4xl lg:text-5xl font-serif text-white" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                    03
                  </div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
                    Global Campaigns
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

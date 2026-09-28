"use client";

import React from "react";
import { Camera, Share2, MessageCircle, ArrowUpRight, ArrowUp, Sparkles, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#060606] border-t border-white/10 pt-20 pb-36 md:pb-16 px-6 md:px-12 lg:px-20 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#E52E2D]/2 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-white/1 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* 1. Brand Column (5 Cols on Desktop) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3
                  className="text-4xl sm:text-5xl tracking-[0.35em] uppercase font-serif italic text-white"
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    background: "linear-gradient(135deg, #E52E2D 0%, #ff5555 60%, #ffffff 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  LUXE
                </h3>
                <span className="w-2 h-2 rounded-none bg-[#E52E2D] shadow-[0_0_10px_rgba(229,46,45,0.8)]" />
              </div>

              <p className="font-mono text-[10px] uppercase tracking-[0.45em] text-[#E52E2D] font-bold mb-6">
                Bridal &amp; Editorial Artistry
              </p>

              <div className="space-y-3 max-w-md">
                <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light flex items-start gap-2.5">
                  <MapPin size={15} className="text-[#E52E2D] shrink-0 mt-0.5" />
                  <span>
                    14B Maker Chambers, Near Trident Hotel,<br />
                    Nariman Point, Mumbai, Maharashtra 400021
                  </span>
                </p>

                <a
                  href="tel:+919833322110"
                  className="inline-flex items-center gap-2.5 font-mono text-xs text-white/80 hover:text-[#E52E2D] transition-colors min-h-[44px] focus-visible:outline-2 focus-visible:outline-[#E52E2D] focus-visible:outline-offset-2"
                >
                  <Phone size={14} className="text-[#E52E2D]" />
                  <span>+91 98333 22110</span>
                </a>
              </div>
            </div>

            {/* Quick Status Pill */}
            <div className="mt-8 inline-flex items-center gap-2.5 px-3.5 py-2 rounded-none bg-white/2 border border-white/10 w-fit">
              <span className="w-2 h-2 rounded-none bg-emerald-500 animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">
                Accepting 2026/27 Bookings
              </span>
            </div>
          </div>

          {/* 2. Navigation & Collection Links (4 Cols on Desktop) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <h4 className="font-mono text-[10px] font-bold tracking-[0.3em] uppercase text-[#E52E2D] flex items-center gap-2">
              <span className="w-4 h-px bg-[#E52E2D]" />
              Explore Collection
            </h4>

            <div className="grid grid-cols-2 gap-x-6 gap-y-1 sm:gap-y-2">
              {[
                { label: "The Artist", href: "#about" },
                { label: "Editorial Gallery", href: "#gallery" },
                { label: "Bespoke Packages", href: "#services" },
                { label: "Craft & Story", href: "#story" },
                { label: "Client Reviews", href: "#testimonials" },
                { label: "Studio Location", href: "#location" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="group flex items-center gap-2 text-xs uppercase tracking-wider text-white/60 hover:text-white transition-colors duration-300 min-h-[44px] font-mono focus-visible:outline-2 focus-visible:outline-[#E52E2D] focus-visible:outline-offset-2"
                >
                  <span className="text-[#E52E2D] opacity-0 group-hover:opacity-100 transition-opacity">
                    –
                  </span>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* 3. Social & Studio Hours (3 Cols on Desktop) */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h4 className="font-mono text-[10px] font-bold tracking-[0.3em] uppercase text-[#E52E2D] flex items-center gap-2">
              <span className="w-4 h-px bg-[#E52E2D]" />
              Connect &amp; Social
            </h4>

            <div className="flex flex-wrap gap-2.5">
              {[
                { label: "Instagram", href: "https://instagram.com", icon: Camera },
                { label: "Pinterest", href: "https://pinterest.com", icon: Share2 },
                { label: "WhatsApp", href: "https://wa.me/919833322110", icon: MessageCircle },
              ].map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[10px] uppercase tracking-wider text-white/80 hover:text-white bg-white/3 hover:bg-[#E52E2D]/20 border border-white/10 hover:border-[#E52E2D] px-4 py-2.5 rounded-none flex items-center gap-2 min-h-[44px] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-[#E52E2D] focus-visible:outline-offset-2"
                  >
                    <Icon size={14} className="text-[#E52E2D]" />
                    {link.label}
                    <ArrowUpRight size={12} className="text-white/40" />
                  </a>
                );
              })}
            </div>

            <div className="mt-4 p-4 rounded-none bg-white/2 border border-white/5 space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/50 block">
                Studio Protocol
              </span>
              <p className="font-mono text-[10px] uppercase tracking-wider text-white/80">
                7 Days / Week · 9:00 AM – 9:00 PM
              </p>
              <p className="text-[10px] text-white/50 font-light">
                Private sessions by appointment only.
              </p>
            </div>
          </div>

        </div>

        {/* Divider Line */}
        <div className="my-12 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

        {/* Bottom Bar Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="font-mono text-[10px] tracking-widest uppercase text-white/50">
            &copy; {new Date().getFullYear()} LUXE BRIDAL ARTISTRY. All Rights Reserved.
          </p>

          <div className="flex items-center gap-6">
            <span className="font-mono text-[10px] tracking-widest uppercase text-[#E52E2D]">
              Paris • London • Mumbai
            </span>

            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-none border border-white/20 bg-white/3 hover:bg-[#E52E2D] hover:border-[#E52E2D] text-white flex items-center justify-center transition-all duration-300 cursor-pointer min-h-[44px] focus-visible:outline-2 focus-visible:outline-[#E52E2D] focus-visible:outline-offset-2"
              title="Back to Top"
              aria-label="Back to Top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}

"use client";

import React from "react";
import { Instagram, Share2, MessageCircle, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-16 px-5 sm:px-8 relative bg-[#060606] border-t border-white/10 pb-28 md:pb-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start justify-between gap-10 md:gap-12 text-left">

        {/* Brand Column */}
        <div className="max-w-sm">
          <h3
            className="text-3xl tracking-[0.35em] uppercase"
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontStyle: "italic",
              background: "linear-gradient(135deg, #E52E2D 0%, #ff4d4d 60%, #ffffff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            LUXE
          </h3>
          <p
            className="text-[9px] tracking-[0.4em] uppercase mt-1 font-mono text-[#E52E2D]"
          >
            Bridal &amp; Editorial Artistry
          </p>
          <p
            className="mt-5 text-xs text-white/55 leading-relaxed font-light"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            14B Maker Chambers, Near Trident Hotel,<br />
            Nariman Point, Mumbai, Maharashtra 400021
          </p>
          <p className="mt-3 text-xs font-mono">
            <a href="tel:+919833322110" className="text-[#E52E2D] hover:underline inline-block min-h-[44px] leading-[44px]">
              +91 98333 22110
            </a>
          </p>
        </div>

        {/* Links Columns */}
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-20 w-full md:w-auto">
          {/* Explore */}
          <div className="flex flex-col gap-3">
            <h4
              className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#E52E2D] font-mono"
            >
              Explore
            </h4>
            <div className="grid grid-cols-2 sm:flex sm:flex-col gap-2 sm:gap-2.5">
              {[
                { label: "Artist", href: "#about" },
                { label: "Portfolio", href: "#gallery" },
                { label: "Services", href: "#services" },
                { label: "Story", href: "#story" },
                { label: "Reviews", href: "#testimonials" },
                { label: "Studio", href: "#location" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-xs uppercase tracking-wider text-white/60 hover:text-white transition-colors duration-300 min-h-[44px] flex items-center font-mono"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Social / Connect */}
          <div className="flex flex-col gap-3">
            <h4
              className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#E52E2D] font-mono"
            >
              Connect
            </h4>
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                { label: "Instagram", href: "https://instagram.com", icon: Instagram },
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
                    className="font-mono text-[9px] uppercase tracking-wider text-white/70 hover:text-white bg-white/[0.03] border border-white/10 hover:border-[#E52E2D] px-3.5 py-2.5 rounded-full flex items-center gap-1.5 min-h-[44px] transition-colors"
                  >
                    <Icon size={13} className="text-[#E52E2D]" />
                    {link.label}
                    <ArrowUpRight size={12} className="text-white/40" />
                  </a>
                );
              })}
            </div>

            <p
              className="mt-3 text-xs text-white/40 font-light leading-relaxed max-w-[220px]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Bespoke sessions available by appointment across Paris &amp; Mumbai.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="max-w-6xl mx-auto mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left"
      >
        <p className="font-mono text-[9px] tracking-widest uppercase text-white/40">
          &copy; {new Date().getFullYear()} LUXE BRIDAL ARTISTRY. All Rights Reserved.
        </p>
        <p className="font-mono text-[9px] tracking-widest uppercase text-white/30">
          Paris • Mumbai
        </p>
      </div>
    </footer>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Menu, X, Phone, Calendar, ArrowRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navigation({ onBookClick }: { onBookClick?: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "Artist", href: "#about" },
    { name: "Portfolio", href: "#gallery" },
    { name: "Story", href: "#story" },
    { name: "Services", href: "#services" },
    { name: "Reviews", href: "#testimonials" },
    { name: "Studio", href: "#location" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 flex items-center justify-between px-5 md:px-12 py-4 md:py-5 ${
          scrolled
            ? "bg-[#060606]/90 backdrop-blur-xl border-b border-white/10 md:top-4 md:left-1/2 md:-translate-x-1/2 md:w-[92%] md:max-w-6xl md:rounded-none md:border-white/15 md:py-3 md:px-8 shadow-2xl shadow-black/90"
            : "bg-linear-to-b from-[#060606]/90 via-[#060606]/50 to-transparent border-b border-white/5"
        }`}
      >
        {/* Brand Logo & Subtitle */}
        <a
          href="#home"
          className="group flex items-center gap-3 min-h-[44px] focus-visible:outline-2 focus-visible:outline-[#E52E2D] focus-visible:outline-offset-4 rounded-xs"
        >
          <span
            className="font-serif italic text-2xl sm:text-3xl tracking-[0.35em] font-medium transition-transform duration-300 group-hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #E52E2D 50%, #ff6b6b 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontFamily: "var(--font-cormorant), serif",
            }}
          >
            LUXE
          </span>
          <span className="hidden sm:inline-block w-px h-4 bg-white/20" />
          <span className="hidden sm:flex flex-col">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/70 group-hover:text-[#E52E2D] transition-colors">
              Couture Artistry
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#E52E2D] font-semibold">
              Paris • Mumbai
            </span>
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-[10px] tracking-[0.25em] text-white/70 hover:text-white uppercase transition-colors duration-300 relative group font-mono py-2 flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-[#E52E2D] focus-visible:outline-offset-2 rounded-xs"
            >
              <span className="w-1 h-1 rounded-full bg-[#E52E2D] opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100" />
              <span>{item.name}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-linear-to-r from-[#E52E2D] to-[#ff5555] transition-all duration-300 group-hover:w-full rounded-full" />
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <button
            onClick={onBookClick}
            className="group relative px-6 py-2.5 rounded-none bg-linear-to-r from-[#E52E2D] via-[#e52e2d] to-[#ff4d4d] text-white text-[10px] tracking-[0.25em] uppercase font-mono font-bold shadow-lg shadow-[#E52E2D]/40 hover:shadow-xl hover:shadow-[#E52E2D]/70 hover:scale-105 active:scale-95 transition-all duration-300 border border-white/20 flex items-center gap-2 cursor-pointer overflow-hidden focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
          >
            <Sparkles size={13} className="text-white/90 group-hover:rotate-12 transition-transform duration-300" />
            <span>Book Session</span>
            <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
          </button>
        </div>

        {/* Mobile Hamburger Trigger - Minimum 44x44px Tap Target */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white hover:text-[#E52E2D] focus-visible:outline-2 focus-visible:outline-[#E52E2D] focus-visible:outline-offset-2 w-11 h-11 border border-white/15 rounded-none flex items-center justify-center bg-black/50 backdrop-blur-md transition-all cursor-pointer hover:border-[#E52E2D]/50 shadow-lg"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={20} className="text-[#E52E2D]" /> : <Menu size={20} />}
        </button>
      </motion.nav>

      {/* Mobile Fullscreen Luxury Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-40 bg-[#060606] flex flex-col justify-between p-6 pt-24 md:hidden overflow-y-auto"
          >
            {/* Header info line */}
            <div className="border-b border-white/10 pb-4 flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#E52E2D] font-bold">
                Navigation // Couture Studio
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/60">
                Paris • Mumbai
              </span>
            </div>

            {/* Menu Items Stack - 44px min tap targets */}
            <div className="flex flex-col gap-2 my-auto py-6">
              {menuItems.map((item, idx) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 + 0.1 }}
                  className="group flex items-center justify-between min-h-[48px] px-4 py-3 rounded-none border border-transparent hover:border-white/10 hover:bg-white/2 text-2xl tracking-[0.15em] text-white/90 hover:text-white uppercase font-serif transition-all focus-visible:outline-2 focus-visible:outline-[#E52E2D]"
                  style={{ fontFamily: "var(--font-cormorant), serif" }}
                >
                  <span className="flex items-center gap-3">
                    <span className="font-mono text-[11px] text-[#E52E2D] tracking-normal font-bold">
                      0{idx + 1}
                    </span>
                    {item.name}
                  </span>
                  <ArrowRight size={16} className="text-[#E52E2D] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </motion.a>
              ))}
            </div>

            {/* Bottom Actions inside drawer */}
            <div className="space-y-3 pt-6 border-t border-white/10">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onBookClick?.();
                }}
                className="w-full py-4 rounded-none bg-[#E52E2D] hover:bg-[#C01F1F] text-white font-mono text-[11px] uppercase tracking-[0.3em] font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#E52E2D]/40 transition-colors"
              >
                <Calendar size={14} />
                Reserve Session
              </button>

              <a
                href="tel:+919833322110"
                onClick={() => setIsOpen(false)}
                className="w-full py-3.5 rounded-none bg-white/5 border border-white/10 text-white/90 font-mono text-[10px] uppercase tracking-[0.25em] flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
              >
                <Phone size={13} className="text-[#E52E2D]" /> Direct Concierge (+91 98333 22110)
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Menu, X, Phone, Calendar, ArrowRight } from "lucide-react";
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
            ? "bg-[#060606]/95 backdrop-blur-md border-b border-white/10 md:top-3 md:left-1/2 md:-translate-x-1/2 md:w-[90%] md:max-w-6xl md:rounded-full md:border-[#E52E2D]/20 md:py-3.5 shadow-2xl"
            : "bg-linear-to-b from-[#060606]/80 to-transparent"
        }`}
      >
        {/* Brand Logo */}
        <a
          href="#home"
          className="font-serif italic text-xl sm:text-2xl tracking-[0.3em] font-light flex items-center gap-2 min-h-[44px]"
          style={{
            background: "linear-gradient(135deg, #E52E2D 0%, #ff4d4d 60%, #ffffff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          LUXE
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-[10px] tracking-[0.25em] text-[#ffffff]/70 hover:text-[#E52E2D] uppercase transition-colors duration-300 relative group font-mono py-2"
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-[#E52E2D] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <button
            onClick={onBookClick}
            className="px-6 py-2.5 rounded-full border border-[#E52E2D] text-[10px] tracking-[0.25em] text-white hover:bg-[#E52E2D] uppercase transition-all duration-300 font-mono font-bold shadow-[0_0_15px_rgba(229,46,45,0.3)] cursor-pointer"
          >
            Book Session
          </button>
        </div>

        {/* Mobile Hamburger Trigger - Minimum 44x44px Tap Target */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white hover:text-[#E52E2D] focus:outline-none w-11 h-11 border border-white/10 rounded-full flex items-center justify-center bg-black/40 backdrop-blur-md transition-colors cursor-pointer"
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
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#E52E2D]">
                Navigation // Couture Studio
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-white/40">
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
                  className="group flex items-center justify-between min-h-[48px] px-4 py-3 rounded-xs border border-transparent hover:border-white/10 hover:bg-white/[0.02] text-2xl tracking-[0.15em] text-white/80 hover:text-white uppercase font-serif transition-all"
                  style={{ fontFamily: "var(--font-cormorant), serif" }}
                >
                  <span className="flex items-center gap-3">
                    <span className="font-mono text-[10px] text-[#E52E2D] tracking-normal">
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
                className="w-full py-4 rounded-xs bg-[#E52E2D] text-white font-mono text-[10px] uppercase tracking-[0.3em] font-bold flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(229,46,45,0.4)]"
              >
                <Calendar size={14} />
                Reserve Session
              </button>

              <a
                href="tel:+919833322110"
                onClick={() => setIsOpen(false)}
                className="w-full py-3.5 rounded-xs bg-white/[0.03] border border-white/10 text-white/80 font-mono text-[9px] uppercase tracking-[0.25em] flex items-center justify-center gap-2"
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

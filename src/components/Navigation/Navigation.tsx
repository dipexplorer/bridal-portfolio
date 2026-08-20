"use client";

import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navigation({ onBookClick }: { onBookClick?: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "Artist", href: "#about" },
    { name: "Portfolio", href: "#gallery" },
    { name: "Services", href: "#services" },
    { name: "Story", href: "#story" },
    { name: "Reviews", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-[99] transition-all duration-500 flex items-center justify-between px-6 md:px-12 py-5 ${
          scrolled
            ? "md:top-3 md:left-1/2 md:-translate-x-1/2 md:w-[90%] md:max-w-6xl md:rounded-full bg-[#111111]/85 backdrop-blur-md border border-[#E52E2D]/15 py-3.5 shadow-xl"
            : "bg-transparent"
        }`}
      >
        {/* Brand Logo */}
        <a
          href="#home"
          className="font-serif italic text-xl tracking-[0.3em] interactive-hover"
          style={{
            background: "linear-gradient(135deg, #E52E2D 0%, #ff4d4d 60%, #800000 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
          data-cursor-text="Home"
        >
          VALERIE
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-[10px] tracking-widest text-[#ffffff]/65 hover:text-[#E52E2D] uppercase transition-colors duration-300 relative group interactive-hover"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {item.name}
              <span className="absolute bottom-[-4px] left-0 w-0 h-px bg-[#E52E2D] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <button
            onClick={onBookClick}
            className="px-5 py-2 rounded-full border border-[#E52E2D]/50 text-[10px] tracking-widest text-[#E52E2D] hover:bg-[#E52E2D] hover:text-[#111111] uppercase transition-all duration-400 interactive-hover font-bold"
            style={{ fontFamily: "var(--font-inter)" }}
            data-cursor-text="Reserve"
          >
            Book Session
          </button>
        </div>

        {/* Mobile Trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-[#E52E2D] focus:outline-none p-1"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </motion.nav>

      {/* Mobile Fullscreen Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[98] bg-[#111111]/98 backdrop-blur-md flex flex-col justify-center px-8"
          >
            <div className="flex flex-col gap-7 text-center">
              {menuItems.map((item, idx) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.06 }}
                  className="text-2xl tracking-[0.2em] text-[#ffffff]/80 hover:text-[#E52E2D] uppercase transition-colors"
                  style={{ fontFamily: "var(--font-cormorant), serif" }}
                >
                  {item.name}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: menuItems.length * 0.06 }}
                className="mt-4"
              >
                <a
                  href="tel:+919833322110"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-[11px] tracking-widest uppercase justify-center"
                  style={{
                    background: "linear-gradient(135deg, #E52E2D 0%, #ff4d4d 100%)",
                    color: "#111111",
                    fontFamily: "var(--font-inter)",
                  }}
                >
                  <Phone size={13} /> Call +91 98333 22110
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

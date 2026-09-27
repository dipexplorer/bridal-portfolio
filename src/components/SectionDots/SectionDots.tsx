"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const sections = [
  { id: "home",         label: "01" },
  { id: "about",        label: "02" },
  { id: "gallery",      label: "03" },
  { id: "story",        label: "04" },
  { id: "services",     label: "05" },
  { id: "testimonials", label: "06" },
  { id: "location",     label: "07" },
];

export default function SectionDots() {
  const [activeId, setActiveId] = useState("home");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveId(id);
          });
        },
        { threshold: 0.3, rootMargin: "-10% 0px -10% 0px" }
      );

      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
      className="hidden lg:flex fixed right-6 xl:right-10 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-6"
    >
      {/* Top connector line */}
      <div className="w-px h-10 bg-linear-to-b from-transparent via-white/20 to-white/10" />

      {sections.map(({ id, label }) => {
        const isActive = activeId === id;
        return (
          <a
            key={id}
            href={`#${id}`}
            aria-label={`Go to section ${label}`}
            className="flex items-center gap-2.5 group py-0.5 pointer-events-auto"
          >
            {/* Number label — clearly visible for all sections, highlighted when active */}
            <span
              className={`font-mono transition-all duration-300 ${
                isActive
                  ? "text-[#E52E2D] font-bold text-[11px] tracking-[0.2em] scale-110 drop-shadow-[0_0_10px_rgba(229,46,45,0.7)]"
                  : "text-white/45 group-hover:text-white/90 text-[10px] tracking-[0.2em]"
              }`}
            >
              {label}
            </span>

            {/* Dot & Active Ring */}
            <span className="relative flex items-center justify-center w-5 h-5">
              {/* Active glowing ring */}
              {isActive && (
                <motion.span
                  layoutId="activeDotRing"
                  className="absolute inset-0 rounded-full border border-[#E52E2D] shadow-[0_0_14px_rgba(229,46,45,0.6)] bg-[#E52E2D]/10"
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                />
              )}
              <span
                className={`block rounded-full transition-all duration-300 ${
                  isActive
                    ? "w-2.5 h-2.5 bg-[#E52E2D] shadow-[0_0_10px_rgba(229,46,45,1)]"
                    : "w-2 h-2 bg-white/35 group-hover:bg-white/80 group-hover:scale-125"
                }`}
              />
            </span>
          </a>
        );
      })}

      {/* Bottom connector line */}
      <div className="w-px h-10 bg-linear-to-b from-white/10 via-white/20 to-transparent" />

      {/* SCROLL label */}
      <span
        className="font-mono text-[9px] uppercase tracking-[0.35em] text-white/40 font-medium"
        style={{ writingMode: "vertical-rl" }}
      >
        scroll
      </span>
    </motion.div>
  );
}

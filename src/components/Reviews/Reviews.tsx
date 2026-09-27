"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MessageSquare, CheckCircle2, Sparkles } from "lucide-react";

interface Review {
  id: string;
  category: "bride" | "editorial" | "vip";
  quote: string;
  author: string;
  role: string;
  location: string;
  date: string;
  verifiedBadge: string;
}

const reviews: Review[] = [
  {
    id: "1",
    category: "bride",
    quote:
      "Luxe transformed my bridal look completely. The makeup was weightless, photography-ready, and stayed flawless throughout an 18-hour wedding schedule. Truly an extraordinary artist.",
    author: "Aisha Mehta",
    role: "Couture Bride",
    location: "Taj Mahal Palace, Mumbai",
    date: "Dec 2025",
    verifiedBadge: "Verified Bridal Client",
  },
  {
    id: "2",
    category: "editorial",
    quote:
      "Every runway look Luxe created for our Paris Fashion Week showcase was impeccable. Her structural eye and high-fashion sensibility are unmatched in the industry.",
    author: "Camille Dubois",
    role: "Creative Director",
    location: "Palais Galliera, Paris",
    date: "Oct 2025",
    verifiedBadge: "Fashion Week Director",
  },
  {
    id: "3",
    category: "vip",
    quote:
      "I booked Luxe for my gala anniversary photoshoot. The airbrush finish was luminous and looked stunning under high-definition studio lighting. A master of subtle grandeur.",
    author: "Sasha Varma",
    role: "Private Red-Carpet Client",
    location: "The Oberoi, New Delhi",
    date: "Jan 2026",
    verifiedBadge: "Verified Red Carpet Client",
  },
  {
    id: "4",
    category: "bride",
    quote:
      "Planning a destination wedding in Lake Como was stressful, but working with Luxe was seamless. She sculpted a radiant, timeless bridal glow that blew everyone away.",
    author: "Isabella Rossi",
    role: "Destination Bride",
    location: "Villa d'Este, Lake Como",
    date: "Aug 2025",
    verifiedBadge: "Verified Destination Bride",
  },
  {
    id: "5",
    category: "editorial",
    quote:
      "Luxe brings a calm, disciplined authority to high-stakes magazine cover shoots. Her speed, precision, and skin texture mastery make her our first-choice artist.",
    author: "Marcus Thorne",
    role: "Senior Fashion Editor",
    location: "London Studio 4",
    date: "Nov 2025",
    verifiedBadge: "Editorial Media Partner",
  },
  {
    id: "6",
    category: "vip",
    quote:
      "For my royal reception appearance, I needed a look that felt regal yet modern. Luxe delivered a sculpting masterpiece that looked effortless under heavy press cameras.",
    author: "Princess Radhika R.",
    role: "Royal Gala Guest",
    location: "Umaid Bhawan, Jodhpur",
    date: "Feb 2026",
    verifiedBadge: "VIP Gala Client",
  },
];

const pressPublications = [
  "VOGUE",
  "HARPER'S BAZAAR",
  "ELLE",
  "L'OFFICIEL",
  "GRAZIA",
];

export default function Reviews({ onBookClick }: { onBookClick?: () => void }) {
  const [activeTab, setActiveTab] = useState<"all" | "bride" | "editorial" | "vip">("all");

  const filteredReviews =
    activeTab === "all"
      ? reviews
      : reviews.filter((r) => r.category === activeTab);

  return (
    <section id="testimonials" className="relative py-32 lg:py-48 px-6 bg-[#060606] border-t border-white/5 overflow-hidden">
      {/* Background Lighting Accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#E52E2D]/2 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/1 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col relative z-10">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <span
            className="font-mono text-[9px] uppercase tracking-[0.45em] text-[#E52E2D] mb-4 font-bold flex items-center justify-center gap-3"
          >
            <span className="w-5 h-px bg-[#E52E2D]" />
            The Verdict // Client &amp; Press Acclaim
            <span className="w-5 h-px bg-[#E52E2D]" />
          </span>
          <h2
            className="text-5xl sm:text-7xl lg:text-[5.5vw] uppercase text-white leading-none tracking-tight"
            style={{ fontFamily: "var(--font-cormorant), serif" }}
          >
            Client <span className="italic font-light text-white/40 font-serif lowercase">Love</span>
          </h2>
        </div>

        {/* Press & Media Publication Strip */}
        <div className="mb-16 pb-12 border-b border-white/5 flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-60 hover:opacity-100 transition-opacity duration-500">
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/30 mr-4 hidden md:block">
            Featured In
          </span>
          {pressPublications.map((pub, idx) => (
            <span
              key={idx}
              className="font-serif tracking-[0.25em] text-sm md:text-base text-white/60 font-bold hover:text-[#E52E2D] transition-colors cursor-default"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              {pub}
            </span>
          ))}
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {[
            { id: "all", label: "All Verdicts" },
            { id: "bride", label: "Couture Brides" },
            { id: "editorial", label: "Editorial & Runway" },
            { id: "vip", label: "Red Carpet & VIP" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`font-mono text-[9px] uppercase tracking-[0.25em] px-5 py-2.5 transition-all duration-300 rounded-full border ${
                activeTab === tab.id
                  ? "bg-[#E52E2D] text-white border-[#E52E2D] shadow-[0_0_20px_rgba(229,46,45,0.4)]"
                  : "bg-white/[0.02] text-white/60 border-white/10 hover:border-white/30 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          <AnimatePresence mode="popLayout">
            {filteredReviews.map((review) => (
              <motion.div
                key={review.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="group relative p-8 md:p-10 border border-white/10 bg-[#0d0d0d] hover:bg-[#121212] hover:border-[#E52E2D]/40 transition-all duration-500 flex flex-col justify-between rounded-xs"
              >
                {/* Corner bracket accents */}
                <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-white/20 group-hover:border-[#E52E2D] transition-colors" />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-white/20 group-hover:border-[#E52E2D] transition-colors" />

                {/* Oversized Quote Watermark */}
                <div
                  className="absolute top-4 right-6 text-6xl text-white/[0.03] group-hover:text-[#E52E2D]/10 font-serif transition-colors pointer-events-none select-none"
                  style={{ fontFamily: "var(--font-cormorant), serif" }}
                >
                  &ldquo;
                </div>

                <div>
                  {/* Rating Stars & Verified Badge */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star
                          key={idx}
                          size={13}
                          fill="#E52E2D"
                          stroke="#E52E2D"
                          strokeWidth={1}
                        />
                      ))}
                    </div>

                    <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#E52E2D] bg-[#E52E2D]/10 border border-[#E52E2D]/20 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                      <CheckCircle2 size={10} />
                      {review.verifiedBadge}
                    </span>
                  </div>

                  {/* Quote Body */}
                  <p
                    className="text-base md:text-lg text-white/85 leading-relaxed italic mb-8"
                    style={{ fontFamily: "var(--font-cormorant), serif" }}
                  >
                    &ldquo;{review.quote}&rdquo;
                  </p>
                </div>

                {/* Author Info & Location */}
                <div className="border-t border-white/10 pt-6 mt-auto flex flex-col">
                  <span
                    className="text-xs uppercase tracking-widest text-white font-bold mb-1 group-hover:text-[#E52E2D] transition-colors"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {review.author}
                  </span>
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-white/40">
                    <span>{review.role}</span>
                    <span className="font-mono text-white/30">{review.location}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Central Call to Action Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-2xl text-center p-10 bg-white/[0.015] border border-white/10 relative overflow-hidden"
        >
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#E52E2D]/10 blur-xl rounded-full pointer-events-none" />

          <p
            className="text-xl md:text-2xl text-white/90 font-serif italic mb-8 leading-relaxed"
            style={{ fontFamily: "var(--font-cormorant), serif" }}
          >
            &ldquo;Trusted by brides, editorial directors, and red-carpet clients worldwide.&rdquo;
          </p>

          <button
            onClick={onBookClick}
            className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-transparent border border-[#E52E2D] text-white overflow-hidden transition-all duration-500 hover:border-[#E52E2D] cursor-pointer"
          >
            <span className="relative z-10 font-mono text-[9px] uppercase tracking-[0.35em] group-hover:text-white transition-colors duration-300 flex items-center gap-2">
              <Sparkles size={12} className="text-[#E52E2D] group-hover:text-white transition-colors" />
              Reserve Your Transformation
            </span>
            {/* Hover fill effect */}
            <div className="absolute inset-0 bg-[#E52E2D] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] z-0" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}


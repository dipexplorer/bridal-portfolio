"use client";

import { motion, type Transition } from "framer-motion";
import { Star, MessageSquare } from "lucide-react";

const reviews = [
  {
    quote:
      "Valerie transformed my bridal look completely. The makeup was weightless, photography-ready, and I received so many compliments. Truly an extraordinary artist.",
    author: "Aisha Mehta",
    role: "Couture Bride, Mumbai",
  },
  {
    quote:
      "Every runway look Valerie created for our fashion week shoot was impeccable. Her editorial eye and high-fashion sensibility are unmatched in the industry.",
    author: "Camille Dubois",
    role: "Creative Director, Paris",
  },
  {
    quote:
      "I booked Valerie for my anniversary photoshoot. Absolutely stunning results. The airbrush base lasted all day and looked flawless through every shot.",
    author: "Sasha Varma",
    role: "Editorial Client, Delhi",
  },
];

const floatA: Transition = { duration: 6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" };
const floatB: Transition = { duration: 8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 1 };

export default function Reviews() {
  return (
    <section id="testimonials" className="py-32 px-6 bg-charcoal border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col relative">
        <div className="mb-20 text-center">
          <span
            className="text-[10px] uppercase tracking-[0.45em] text-[#E52E2D] mb-4 block"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            The Verdict
          </span>
          <h2
            className="text-5xl md:text-7xl uppercase text-[#ffffff] leading-none"
            style={{ fontFamily: "var(--font-cormorant), serif" }}
          >
            Client <span className="italic font-light text-white/50">Love</span>
          </h2>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="p-10 border border-white/10 bg-[#111111] hover:bg-[#151515] transition-colors duration-500 flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 mb-8">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      size={14}
                      fill="#E52E2D"
                      stroke="#E52E2D"
                      strokeWidth={1}
                    />
                  ))}
                </div>
                <p
                  className="text-lg text-white/80 leading-relaxed italic mb-10"
                  style={{ fontFamily: "var(--font-cormorant), serif" }}
                >
                  &ldquo;{review.quote}&rdquo;
                </p>
              </div>
              
              <div className="border-t border-white/10 pt-6">
                <span
                  className="block text-[11px] uppercase tracking-widest text-[#E52E2D] font-bold mb-1"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {review.author}
                </span>
                <span
                  className="block text-[10px] uppercase tracking-wider text-white/40"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {review.role}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Central Call to Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p
            className="text-2xl text-white/60 italic mb-8"
            style={{ fontFamily: "var(--font-cormorant), serif" }}
          >
            "Trusted by brides, editorial directors, and red-carpet clients worldwide."
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-8 py-4 border border-[#E52E2D] text-[11px] font-bold tracking-widest text-white hover:bg-[#E52E2D] uppercase transition-colors duration-500 cursor-hover"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <MessageSquare size={14} />
            Book Your Transformation
          </a>
        </motion.div>
      </div>
    </section>
  );
}

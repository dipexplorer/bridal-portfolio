"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState(0);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 600);
    const t2 = setTimeout(() => setStage(2), 2000);
    const t3 = setTimeout(() => setStage(3), 3400);
    const t4 = setTimeout(() => {
      setIsMounted(false);
      onComplete();
    }, 4000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isMounted && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="fixed inset-0 z-99999 flex flex-col items-center justify-center bg-charcoal text-[#ffffff]"
        >
          <div className="relative flex flex-col items-center justify-center gap-8">
            {/* Terracotta SVG Ring Animation */}
            <div className="relative w-32 h-32 flex items-center justify-center">
              {/* Center dot */}
              {stage === 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="w-2 h-2 rounded-full bg-[#E52E2D]"
                />
              )}

              {stage >= 1 && (
                <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="roseGold" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#E52E2D" />
                      <stop offset="50%" stopColor="#ff4d4d" />
                      <stop offset="100%" stopColor="#800000" />
                    </linearGradient>
                  </defs>
                  {/* Center */}
                  <circle cx="50" cy="50" r="3" fill="url(#roseGold)" />
                  {/* Inner ring */}
                  <motion.circle
                    cx="50" cy="50" r="12"
                    stroke="url(#roseGold)" strokeWidth="0.8"
                    strokeDasharray="75.4"
                    initial={{ strokeDashoffset: 75.4 }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                  />
                  {/* Petal motifs */}
                  <motion.path
                    d="M50,30 C47,34 44,34 42,31 C40,28 42,25 45,24 C48,23 51,26 50,30Z"
                    stroke="url(#roseGold)" strokeWidth="0.6"
                    strokeDasharray="30"
                    initial={{ strokeDashoffset: 30 }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{ duration: 1.4, delay: 0.3, ease: "easeInOut" }}
                  />
                  <motion.path
                    d="M50,70 C53,66 56,66 58,69 C60,72 58,75 55,76 C52,77 49,74 50,70Z"
                    stroke="url(#roseGold)" strokeWidth="0.6"
                    strokeDasharray="30"
                    initial={{ strokeDashoffset: 30 }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{ duration: 1.4, delay: 0.5, ease: "easeInOut" }}
                  />
                  <motion.path
                    d="M30,50 C34,47 34,44 31,42 C28,40 25,42 24,45 C23,48 26,51 30,50Z"
                    stroke="url(#roseGold)" strokeWidth="0.6"
                    strokeDasharray="30"
                    initial={{ strokeDashoffset: 30 }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{ duration: 1.4, delay: 0.4, ease: "easeInOut" }}
                  />
                  <motion.path
                    d="M70,50 C66,53 66,56 69,58 C72,60 75,58 76,55 C77,52 74,49 70,50Z"
                    stroke="url(#roseGold)" strokeWidth="0.6"
                    strokeDasharray="30"
                    initial={{ strokeDashoffset: 30 }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{ duration: 1.4, delay: 0.6, ease: "easeInOut" }}
                  />
                  {/* Outer ring */}
                  <motion.circle
                    cx="50" cy="50" r="30"
                    stroke="url(#roseGold)" strokeWidth="0.4"
                    strokeDasharray="188.4"
                    initial={{ strokeDashoffset: 188.4 }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{ duration: 1.8, delay: 0.7, ease: "easeInOut" }}
                    opacity={0.4}
                  />
                  {/* Scalloped outer detail */}
                  <motion.circle
                    cx="50" cy="50" r="22"
                    stroke="url(#roseGold)" strokeWidth="0.4"
                    strokeDasharray="4 4"
                    initial={{ strokeDashoffset: 138 }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{ duration: 2, delay: 0.5, ease: "linear" }}
                    opacity={0.5}
                  />
                </svg>
              )}
            </div>
          </div>

          {/* Brand Name Reveal */}
          <div className="overflow-hidden h-14 text-center">
            <AnimatePresence>
              {stage >= 2 && (
                <motion.div
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -60, opacity: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="flex flex-col items-center"
                >
                  <h1
                    className="text-3xl tracking-[0.5em] uppercase"
                    style={{
                      fontFamily: "var(--font-cormorant), serif",
                      background: "linear-gradient(135deg, #E52E2D 0%, #ff4d4d 50%, #800000 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    VALERIE
                  </h1>
                  <p className="text-[9px] tracking-[0.5em] uppercase mt-2 text-[#ffffff]/40" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                    Bridal &amp; Editorial Artistry
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

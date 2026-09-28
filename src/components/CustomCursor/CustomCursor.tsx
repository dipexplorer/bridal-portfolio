"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isGrabbing, setIsGrabbing] = useState(false);

  // Core dot position (follows instantly)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Outer ring position (spring physics for smooth trailing lag)
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only run on devices with a mouse
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseDown = () => setIsGrabbing(true);
    const handleMouseUp = () => setIsGrabbing(false);

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // Track hovered interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if target or any parent is a link, button, or has cursor-pointer/grab classes
      const isInteractive = target.closest("a, button, [role='button'], input, textarea, select, .cursor-pointer");
      const isDraggable = target.closest(".cursor-grab, [draggable='true']");

      if (isDraggable) {
        setIsHovering(true);
      } else if (isInteractive) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY, isVisible]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null; // Don't render on touch devices
  }

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: 9999 }}>
      {/* Outer Spring Ring */}
      <motion.div
        className="absolute top-0 left-0 rounded-full border border-white bg-white/10"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          mixBlendMode: "difference",
        }}
        animate={{
          width: isHovering ? 48 : 24,
          height: isHovering ? 48 : 24,
          opacity: isVisible ? (isGrabbing ? 0.8 : 0.5) : 0,
          scale: isGrabbing ? 0.8 : 1,
        }}
        transition={{ type: "tween", duration: 0.15, ease: "easeOut" }}
      />
      
      {/* Inner Instant Dot */}
      <motion.div
        className="absolute top-0 left-0 bg-[#E52E2D] rounded-full"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          mixBlendMode: "difference",
        }}
        animate={{
          width: isHovering ? 6 : 8,
          height: isHovering ? 6 : 8,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "tween", duration: 0.1 }}
      />
    </div>
  );
}

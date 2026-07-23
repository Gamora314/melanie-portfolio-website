"use client";

import React, { useState, useEffect, useRef } from "react";

export default function SeaDivider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate how far the divider is through the viewport (0 = entering bottom, 1 = leaving top)
      const totalDistance = windowHeight + rect.height;
      const currentPosition = windowHeight - rect.top;
      
      const progress = Math.min(Math.max(currentPosition / totalDistance, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ⚡ MOVEMENT CONFIGURATION:
  // Adjust 'maxMoveDistance' to control how many pixels to the right the lighthouse travels!
  const maxMoveDistance = 1400; 
  const translateX = scrollProgress * maxMoveDistance;

  return (
    <div 
      ref={containerRef}
      className="relative w-full bg-black pointer-events-none select-none"
      style={{
        paddingTop: "120px",    /* Adjust spacing above divider */
      }}
    >
      {/* ─── 1. ATMOSPHERIC HORIZONTAL BACKGROUND STRIP ─── */}
      <div 
        className="relative w-full overflow-hidden bg-black"
        style={{ height: "180px" }} /* Adjust banner height if needed */
      >
        <img
          src="/images/Assets/shore.JPG"
          alt="Harbor Background"
          className="w-full h-full object-cover object-bottom opacity-35 filter grayscale mix-blend-luminosity"
        />

        {/* Top & Bottom Black Gradients for Smooth Fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />
      </div>

      {/* ─── 2. SCROLLING LIGHTHOUSE ─── */}
      <img
        src="/images/Assets/Light house.png"
        alt="Lighthouse Accent"
        style={{
          height: "300px",  /* Locked height */
          width: "auto",
          position: "absolute",
          bottom: "0px",    /* Anchored to the bottom line of harbor background */
          left: "90px",     /* Base starting left offset */
          transform: `translateX(${translateX}px)`,
          transition: "transform 0.1s ease-out", // Smooths out sudden scroll jumps
          zIndex: 20,
        }}
      />
    </div>
  );
}
"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from "next/link";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [typedText, setTypedText] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);

  // The screenplay text with a clean structural double spacing break
  const fullScriptText = "A chaotic sea of moving faces. Loud. Relentless.\n\nAmidst the heavy friction of the rush hour crowd, MELANIE sits completely still, quietly watching and capturing the raw, unfiltered realities of being human in this unruly world.";

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const totalHeight = containerRef.current.scrollHeight - window.innerHeight - 600;

      // Calculate overall container scroll progress (0 to 1)
      const progress = Math.min(Math.max(-rect.top / totalHeight, 0), 1);
      setScrollProgress(progress);

      // Text typing timeline: starts AFTER the images finish appearing and canvas blurs (0.7 -> 1.0)
      const textStartProgress = 0.7;

      if (progress < textStartProgress) {
        setTypedText("");
      } else {
        const textProgress = (progress - textStartProgress) / (1 - textStartProgress);
        const totalChars = fullScriptText.length;
        const charsToDisplay = Math.floor(textProgress * totalChars);
        setTypedText(fullScriptText.slice(0, charsToDisplay));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dynamic blur applied safely so it doesn't taint your base color or transparency
  const getBlurStyle = () => {
    if (scrollProgress < 0.6) return "blur(0px)";
    if (scrollProgress >= 0.7) return "blur(1.5px)";
    const ratio = (scrollProgress - 0.6) / 0.1;
    return `blur(${ratio * 1.5}px)`;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[450vh] bg-black select-none font-mono"
      style={{ fontFamily: "'Courier Prime', 'Courier New', monospace" }}
    >
      {/* STICKY STAGE: Holds the viewport static while scroll drives the content */}
      <div className="sticky top-0 left-0 w-full h-[56.25vw] max-h-screen min-h-[40vh] md:h-screen overflow-hidden flex items-start justify-center">

        {/* =========================================================
            LAYER 1: YOUR ORIGINAL UNTOUCHED BACKGROUND LAYER
            ========================================================= */}
        <div
          className="absolute inset-0 z-0 bg-[#231F20] flex items-start justify-center p-0"
          style={{ filter: getBlurStyle() }}
        >
          {/* THE BASE IMAGE - Exactly as it was in your initial code */}
          <img
            src="/images/Mosi/Base.jpg"
            alt="The Perfect Timing"
            className="w-full h-full object-cover object-top contrast-100 brightness-50 object-center md:object-[center_35%]"
          />

          {/* =========================================================
              SCROLL APPEARANCES: Placed to perfectly lock layout frames
              ========================================================= */}

          {/* Image 1.jpg (Appears at 5% scroll) */}
          <img
            src="/images/Mosi/1.png"
            alt="Layer 1"
            className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500 pointer-events-none"
            style={{ opacity: scrollProgress > 0.05 ? 1 : 0 }}
          />

          {/* Image 2.jpg (Appears at 10% scroll) */}
          <img
            src="/images/Mosi/2.png"
            alt="Layer 2"
            className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500 pointer-events-none"
            style={{ opacity: scrollProgress > 0.10 ? 1 : 0 }}
          />

          {/* Image 3.jpg (Appears at 15% scroll) */}
          <img
            src="/images/Mosi/3.png"
            alt="Layer 3"
            className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500 pointer-events-none"
            style={{ opacity: scrollProgress > 0.15 ? 1 : 0 }}
          />

          {/* Image 4.jpg (Appears at 20% scroll) */}
          <img
            src="/images/Mosi/4.png"
            alt="Layer 4"
            className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500 pointer-events-none"
            style={{ opacity: scrollProgress > 0.20 ? 1 : 0 }}
          />

          {/* Image 5.jpg (Appears at 25% scroll) */}
          <img
            src="/images/Mosi/5.png"
            alt="Layer 5"
            className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500 pointer-events-none"
            style={{ opacity: scrollProgress > 0.25 ? 1 : 0 }}
          />

          {/* Image 6.jpg (Appears at 30% scroll) */}
          <img
            src="/images/Mosi/6.png"
            alt="Layer 6"
            className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500 pointer-events-none"
            style={{ opacity: scrollProgress > 0.30 ? 1 : 0 }}
          />

          {/* Image 7.jpg (Appears at 35% scroll) */}
          <img
            src="/images/Mosi/7.png"
            alt="Layer 7"
            className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500 pointer-events-none"
            style={{ opacity: scrollProgress > 0.35 ? 1 : 0 }}
          />

          {/* Image 8.jpg (Appears at 40% scroll) */}
          <img
            src="/images/Mosi/8.png"
            alt="Layer 8"
            className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500 pointer-events-none"
            style={{ opacity: scrollProgress > 0.40 ? 1 : 0 }}
          />

          {/* AGAIN Image 7.jpg (Appears at 35% scroll) */}
          <img
            src="/images/Mosi/7.png"
            alt="Layer 7"
            className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500 pointer-events-none"
            style={{ opacity: scrollProgress > 0.40 ? 1 : 0 }}
          />

          {/* Image 9.jpg (Appears at 45% scroll) */}
          <img
            src="/images/Mosi/9.png"
            alt="Layer 9"
            className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500 pointer-events-none"
            style={{ opacity: scrollProgress > 0.45 ? 1 : 0 }}
          />
        </div>

        {/* LAYER 2: CINEMATIC GRADIENT OVERLAY & TEXT */}
        <div
          className="absolute inset-0 z-10 flex items-center bg-gradient-to-r from-[#231F20]/95 via-[#231F20]/80 md:via-[#231F20]/70 to-transparent p-4 sm:p-8 md:p-24 overflow-y-auto transition-opacity duration-700"
          style={{
            opacity: scrollProgress >= 0.7 ? 1 : 0,
            pointerEvents: scrollProgress >= 0.7 ? "auto" : "none"
          }}
        >
          {/* Added max-h-full and py-8 so if a screen gets super short, the text won't overflow into a void */}
          <div className="max-w-xs sm:max-w-xl md:max-w-xl w-full text-[#F4F1EA] space-y-4 md:space-y-6 max-h-full py-6">

            {/* SIGNATURE IMAGE LOGO & BRAND BRAND TAGLINE */}
            <div className="border-b border-white/20 pb-4 mb-4 block">
              <img
                src="/images/More Revised Personal Brand Logo.png"
                alt="Melanie Casabar Signature"
                className="h-20 sm:h-24 md:h-36 w-auto object-contain block filter invert brightness-200"
              />
            </div>

            {/* Slugline Header: Responsive text scaling */}
            <h2 className="font-bold text-sm sm:text-base md:text-xl tracking-widest uppercase text-white/40 font-mono">
              OBSERVER FIRST, WRITER SECOND
            </h2>

            {/* Scroll-Generated Screenplay Body Text (Restored to Left-Aligned) */}
            <div className="text-xs sm:text-sm md:text-base leading-relaxed tracking-wide font-mono space-y-4 md:space-y-6 max-w-xl w-full">
              {typedText.split("\n\n").map((paragraph, pIndex) => {
                return (
                  /* Changed text-center back to text-left */
                  <p key={pIndex} className="whitespace-pre-wrap break-words text-left">
                    {paragraph}

                    {/* Keeps your pulsing inline-block typing cursor on the very last character */}
                    {pIndex === typedText.split("\n\n").length - 1 && typedText.length < fullScriptText.length && (
                      <span className="inline-block w-2 h-4 md:w-2.5 md:h-5 bg-[#F4F1EA] ml-1 animate-pulse align-middle" />
                    )}
                  </p>
                );
              })}
            </div>

            {/* CALL TO ACTION BUTTON: Fluid margin spacing */}
            <div
              className="mt-6 md:mt-12 transition-all duration-700 ease-in-out"
              style={{
                opacity: typedText.length === fullScriptText.length ? 1 : 0,
                transform: typedText.length === fullScriptText.length ? 'translateY(0)' : 'translateY(10px)',
                pointerEvents: typedText.length === fullScriptText.length ? 'auto' : 'none'
              }}
            >
              <Link
                href="/#individual"
                className="inline-flex items-center gap-3 md:gap-4 border border-[#F4F1EA]/30 bg-transparent hover:bg-[#F4F1EA] hover:text-[#231F20] text-[#F4F1EA] px-5 py-2.5 md:px-8 md:py-3 tracking-[0.15em] md:tracking-[0.2em] font-mono text-xs md:text-sm uppercase transition-all duration-300 group rounded-none shadow-lg"
              >
                VIEW NEXT SCENE
                <span className="transform transition-transform duration-300 group-hover:translate-x-2">
                  →
                </span>
              </Link>
            </div>

          </div>
        </div>

      </div>

    </div>

  );
};

export default HeroSection;
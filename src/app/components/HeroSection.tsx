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
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current) {
            ticking = false;
            return;
          }

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

            // Only update text state if the visible character count actually changed
            const newText = fullScriptText.slice(0, charsToDisplay);
            setTypedText((prev) => (prev !== newText ? newText : prev));
          }

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[450vh] bg-black select-none font-mono transform-gpu"
      style={{
        fontFamily: "'Courier Prime', 'Courier New', monospace",
        contentVisibility: "visible", // Forces the browser to keep it painted in RAM
      }}
    >
      {/* STICKY STAGE */}
      <div
        className="sticky top-0 left-0 w-full h-[56.25vw] max-h-screen min-h-[40vh] md:h-screen overflow-hidden flex items-start justify-center transform-gpu"
        style={{
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          transform: "translate3d(0, 0, 0)", // Forces permanent 3D layer caching in GPU
        }}
      >

        {/* =========================================================
            LAYER 1: BACKGROUND LAYER WITH HARDWARE ACCELERATED BLUR
            ========================================================= */}
        <div
          className={`absolute inset-0 z-0 bg-[#231F20] flex items-start justify-center p-0 transform-gpu transition-all duration-300 ${scrollProgress >= 0.7
            ? "blur-[1.5px]"
            : scrollProgress >= 0.6
              ? "blur-[0.8px]"
              : "blur-0"
            }`}
        >
          {/* BASE IMAGE */}
          <img
            src="/images/Mosi/Base.jpg"
            alt="The Perfect Timing"
            decoding="sync"
            className="w-full h-full object-cover object-top contrast-100 brightness-50 object-center md:object-[center_35%] transform-gpu will-change-transform"
          />

          {/* LAYERED IMAGE APPEARANCES */}
          <img
            src="/images/Mosi/1.png"
            alt="Layer 1"
            decoding="sync"
            className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-300 pointer-events-none transform-gpu will-change-opacity"
            style={{ opacity: scrollProgress > 0.05 ? 1 : 0 }}
          />

          <img
            src="/images/Mosi/2.png"
            alt="Layer 2"
            decoding="sync"
            className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-300 pointer-events-none transform-gpu will-change-opacity"
            style={{ opacity: scrollProgress > 0.10 ? 1 : 0 }}
          />

          <img
            src="/images/Mosi/3.png"
            alt="Layer 3"
            decoding="sync"
            className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-300 pointer-events-none transform-gpu will-change-opacity"
            style={{ opacity: scrollProgress > 0.15 ? 1 : 0 }}
          />

          <img
            src="/images/Mosi/4.png"
            alt="Layer 4"
            decoding="sync"
            className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-300 pointer-events-none transform-gpu will-change-opacity"
            style={{ opacity: scrollProgress > 0.20 ? 1 : 0 }}
          />

          <img
            src="/images/Mosi/5.png"
            alt="Layer 5"
            decoding="sync"
            className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-300 pointer-events-none transform-gpu will-change-opacity"
            style={{ opacity: scrollProgress > 0.25 ? 1 : 0 }}
          />

          <img
            src="/images/Mosi/6.png"
            alt="Layer 6"
            decoding="sync"
            className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-300 pointer-events-none transform-gpu will-change-opacity"
            style={{ opacity: scrollProgress > 0.30 ? 1 : 0 }}
          />

          <img
            src="/images/Mosi/7.png"
            alt="Layer 7"
            decoding="sync"
            className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-300 pointer-events-none transform-gpu will-change-opacity"
            style={{ opacity: scrollProgress > 0.35 ? 1 : 0 }}
          />

          <img
            src="/images/Mosi/8.png"
            alt="Layer 8"
            decoding="sync"
            className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-300 pointer-events-none transform-gpu will-change-opacity"
            style={{ opacity: scrollProgress > 0.40 ? 1 : 0 }}
          />

          <img
            src="/images/Mosi/9.png"
            alt="Layer 9"
            decoding="sync"
            className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-300 pointer-events-none transform-gpu will-change-opacity"
            style={{ opacity: scrollProgress > 0.45 ? 1 : 0 }}
          />
        </div>

        {/* LAYER 2: CINEMATIC GRADIENT OVERLAY & TEXT */}
        <div
          className="absolute inset-0 z-10 flex items-center bg-gradient-to-r from-[#231F20]/95 via-[#231F20]/80 md:via-[#231F20]/70 to-transparent p-4 sm:p-8 md:p-24 overflow-y-auto transition-opacity duration-500 transform-gpu"
          style={{
            opacity: scrollProgress >= 0.7 ? 1 : 0,
            pointerEvents: scrollProgress >= 0.7 ? "auto" : "none"
          }}
        >
          <div className="max-w-xs sm:max-w-xl md:max-w-xl w-full text-[#F4F1EA] space-y-4 md:space-y-6 max-h-full py-6">

            {/* LOGO & BRAND TAGLINE */}
            <div className="border-b border-white/20 pb-4 mb-4 block">
              <img
                src="/images/More Revised Personal Brand Logo.png"
                alt="Melanie Casabar Signature"
                className="h-20 sm:h-24 md:h-36 w-auto object-contain block filter invert brightness-200"
              />
            </div>

            {/* Slugline Header */}
            <h2 className="font-bold text-sm sm:text-base md:text-xl tracking-widest uppercase text-white/40 font-mono">
              OBSERVER FIRST, WRITER SECOND
            </h2>

            {/* Scroll-Generated Screenplay Body Text */}
            <div className="text-xs sm:text-sm md:text-base leading-relaxed tracking-wide font-mono space-y-4 md:space-y-6 max-w-xl w-full">
              {typedText.split("\n\n").map((paragraph, pIndex) => (
                <p key={pIndex} className="whitespace-pre-wrap break-words text-left">
                  {paragraph}
                  {pIndex === typedText.split("\n\n").length - 1 && typedText.length < fullScriptText.length && (
                    <span className="inline-block w-2 h-4 md:w-2.5 md:h-5 bg-[#F4F1EA] ml-1 animate-pulse align-middle" />
                  )}
                </p>
              ))}
            </div>

            {/* CALL TO ACTION BUTTON */}
            <div
              className="mt-6 md:mt-12 transition-all duration-500 ease-in-out transform-gpu"
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
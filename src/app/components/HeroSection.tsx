"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from "next/link";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [typedText, setTypedText] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVideoEnded, setIsVideoEnded] = useState(false);

  // The screenplay text with a clean structural double spacing break
  const fullScriptText = "A chaotic sea of moving faces. Loud. Relentless.\n\nAmidst the heavy friction of the rush hour crowd, MELANIE sits completely still, quietly watching and capturing the raw, unfiltered realities of being human in this unruly world.";

  // 1. Handle Scroll Calculations
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

          // Typing starts as soon as user begins scrolling down (e.g. progress > 0.05)
          const textStartProgress = 0.05;

          if (progress < textStartProgress) {
            setTypedText("");
          } else {
            const textProgress = (progress - textStartProgress) / (1 - textStartProgress);
            const totalChars = fullScriptText.length;
            const charsToDisplay = Math.floor(textProgress * totalChars);

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

  // 2. Handle Video Replay on Tab Refresh / Refocus
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && videoRef.current) {
        setIsVideoEnded(false);
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Show overlay/logo if video finishes OR user starts scrolling
  const showOverlay = isVideoEnded || scrollProgress > 0.05;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[450vh] bg-black select-none font-mono transform-gpu"
      style={{
        fontFamily: "'Courier Prime', 'Courier New', monospace",
        contentVisibility: "visible",
      }}
    >
      {/* STICKY STAGE */}
      <div
        className="sticky top-0 left-0 w-full h-screen h-[100dvh] overflow-hidden flex items-center justify-center transform-gpu"
        style={{
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          transform: "translate3d(0, 0, 0)",
        }}
      >

        {/* LAYER 1: MOTION SIGNATURE VIDEO */}
        <div
          className={`absolute inset-0 z-0 bg-[#231F20] flex items-start justify-center p-0 transform-gpu transition-all duration-500 ${
            scrollProgress >= 0.3
              ? "blur-[1.5px]"
              : scrollProgress >= 0.15
                ? "blur-[0.8px]"
                : "blur-0"
          }`}
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            onEnded={() => setIsVideoEnded(true)}
            src="/images/moSig.mp4" 
            className="w-full h-full object-cover object-top object-center md:object-[center_35%] transform-gpu will-change-transform"
          />
        </div>

        {/* LAYER 2: CINEMATIC OVERLAY & CONTENT */}
        <div
          className="absolute inset-0 z-10 flex items-center bg-gradient-to-r from-[#231F20]/95 via-[#231F20]/80 md:via-[#231F20]/70 to-transparent p-4 sm:p-8 md:p-24 overflow-y-auto transition-opacity duration-700 transform-gpu"
          style={{
            opacity: showOverlay ? 1 : 0,
            pointerEvents: showOverlay ? "auto" : "none"
          }}
        >
          <div className="max-w-xs sm:max-w-xl md:max-w-xl w-full text-[#F4F1EA] space-y-4 md:space-y-6 max-h-full py-6">

            {/* LOGO & BRAND TAGLINE (Appears immediately when video ends) */}
            <div className="border-b border-white/20 pb-4 mb-4 block">
              <img
                src="/images/More Revised Personal Brand Logo.png"
                alt="Melanie Casabar Signature"
                className="h-20 sm:h-24 md:h-36 w-auto object-contain block filter invert brightness-200"
              />
            </div>

            {/* Slugline Header (Appears immediately when video ends) */}
            <h2 className="font-bold text-sm sm:text-base md:text-xl tracking-widest uppercase text-white/40 font-mono">
              STORY FIRST, TELLER SECOND
            </h2>

            {/* Scroll-Generated Screenplay Body Text (Only types as user scrolls down) */}
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
                opacity: typedText.length === fullScriptText.length && typedText.length > 0 ? 1 : 0,
                transform: typedText.length === fullScriptText.length && typedText.length > 0 ? 'translateY(0)' : 'translateY(10px)',
                pointerEvents: typedText.length === fullScriptText.length && typedText.length > 0 ? 'auto' : 'none'
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
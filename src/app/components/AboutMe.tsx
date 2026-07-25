"use client";

import React, { useState, useEffect, useRef } from "react";
import { FiMail, FiLinkedin, FiInstagram } from "react-icons/fi";

export default function AboutSection() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [internalProgress, setInternalProgress] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    // Track viewport size to adjust scroll speed on mobile
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // 🎛️ SPEED & TIMING CONFIGURATION DECK
    const CONFIG = {
        creditScrollSpeed: 8.5,      // Desktop speed
        startScrollingAtFrame: 50,   // Frame where text BEGINS to move up
    };

    // 🐚 INDIVIDUAL ASSET SIZE & POSITION CONFIGURATION
    // Adjust size (width/height) and placement (top/left/right/bottom) for each image here!
    const SEA_ASSETS_CONFIG = [
        {
            src: "/images/Assets/star 2.png",
            alt: "Starfish Bottom Left",
            style: { width: "1000px", height: "auto", bottom: "10%", left: "8%" },
        },
        {
            src: "/images/Assets/shell 2.png",
            alt: "Shell Top Left",
            style: { width: "1000px", height: "auto", top: "12%", left: "15%" },
        },
        {
            src: "/images/Assets/shell 3.png",
            alt: "Shell Bottom Right",
            style: { width: "1000px", height: "auto", bottom: "12%", right: "10%" },
        },
        {
            src: "/images/Assets/star 1.png",
            alt: "Starfish Top Right",
            style: { width: "1000px", height: "auto", top: "15%", right: "12%" },
        },
    ];

    // 🌊 Track standard page scroll position
    useEffect(() => {
        const handleWindowScroll = () => {
            if (!scrollContainerRef.current) return;

            const parentSection = document.getElementById("aboutMe");
            if (!parentSection) return;

            const rect = parentSection.getBoundingClientRect();
            const totalScrollableHeight = rect.height - window.innerHeight;
            
            const scrolledPixels = -rect.top; 

            if (scrolledPixels <= 0) {
                setInternalProgress(0);
            } else if (scrolledPixels >= totalScrollableHeight) {
                setInternalProgress(115);
            } else {
                const percentage = (scrolledPixels / totalScrollableHeight) * 115;
                setInternalProgress(percentage);
            }
        };

        window.addEventListener("scroll", handleWindowScroll, { passive: true });
        handleWindowScroll();

        return () => window.removeEventListener("scroll", handleWindowScroll);
    }, []);

    // --- SCROLL ANIMATION TIMELINE CALCULATIONS ---
    let titleOpacity = 0;
    if (internalProgress >= 0 && internalProgress <= 15) {
        titleOpacity = internalProgress / 15;
    } else if (internalProgress > 15 && internalProgress <= 35) {
        titleOpacity = 1;
    } else if (internalProgress > 35 && internalProgress <= 50) {
        titleOpacity = 1 - ((internalProgress - 35) / 15);
    }

    const splitContentOpacity = internalProgress < 45
        ? 0
        : Math.min(1, (internalProgress - 45) / 15);

    // Boost scroll speed on mobile so contact icons reach full visibility before unpinning
    const activeScrollSpeed = isMobile ? 14 : CONFIG.creditScrollSpeed;

    const manifestoRollY = Math.max(
        0,
        (internalProgress - CONFIG.startScrollingAtFrame) * activeScrollSpeed
    );

    return (
        <section id="aboutMe" className="relative w-full h-[220vh] bg-black">
            <div
                ref={scrollContainerRef}
                className="sticky top-0 w-full h-screen overflow-hidden bg-black"
                style={{ fontFamily: "'Courier Prime', 'Courier New', monospace" }}
            >
                {/* SECTION 1: SYSTEM TRANSITIONAL SUBHEADING & ACCENT ASSETS */}
                <div
                    style={{
                        opacity: titleOpacity,
                        visibility: titleOpacity > 0.01 ? "visible" : "hidden",
                        transform: `scale(${0.96 + titleOpacity * 0.04})`,
                        transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)"
                    }}
                    className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-black z-20 pointer-events-none select-none overflow-hidden"
                >
                    <style jsx global>{`
                        @keyframes subtleFloat {
                            0% { transform: translateY(0px); }
                            50% { transform: translateY(-16px); }
                            100% { transform: translateY(0px); }
                        }
                        .animate-float {
                            animation: subtleFloat 5s ease-in-out infinite;
                        }
                    `}</style>

                    {/* 🐚 Independently Scalable Floating Sea Elements */}
                    <div className="absolute inset-0 w-full h-full pointer-events-none">
                        {SEA_ASSETS_CONFIG.map((asset, index) => (
                            <img
                                key={index}
                                src={asset.src}
                                alt={asset.alt}
                                style={{
                                    position: "absolute",
                                    mixBlendMode: "screen",
                                    opacity: 0.85,
                                    ...asset.style
                                }}
                                className="animate-float"
                            />
                        ))}
                    </div>

                    {/* Horizontal Divider Line */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 max-w-4xl h-px bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse pointer-events-none" style={{ animationDuration: '3s' }} />

                    {/* Introductory Text Box with Soft Ease-In */}
                    <div className="max-w-2xl text-center md:text-justify space-y-4 animate-float px-4 relative z-10">
                        <h2 className="text-xl md:text-2xl leading-relaxed font-normal tracking-wide text-white/90 font-sans">
                            Below the tides, where voices may get drowned, the{" "}
                            <span className="text-white font-bold underline underline-offset-8 decoration-wavy border-white/40">
                                observer at the edge of the shore
                            </span>{" "}
                            ensures they are heard.
                        </h2>
                    </div>
                </div>

                {/* SECTION 2: THE 50/50 LAYOUT */}
                <div
                    style={{
                        opacity: splitContentOpacity,
                        visibility: splitContentOpacity > 0.01 ? "visible" : "hidden",
                        transition: "opacity 0.5s ease-out"
                    }}
                    className="absolute inset-0 w-full h-full grid grid-cols-1 md:grid-cols-2 bg-black z-10 overflow-hidden"
                >
                    {/* LEFT COMPONENT: PORTRAIT PANEL */}
                    <div className="w-full h-full relative border-r border-white/5 flex items-center justify-center p-8 md:p-12 bg-[#030303]">
                        <div className="w-full max-w-sm md:max-w-md aspect-[3/4] border border-white/10 bg-[#0c0c0c] relative overflow-hidden shadow-2xl animate-float">
                            <img
                                src="/images/Portrait Manifesto.png"
                                alt="Melanie Cabico Casabar Portrait"
                                className="w-full h-full object-cover select-none pointer-events-none"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-100" />
                        </div>
                    </div>

                    {/* RIGHT COMPONENT: CREDITS ROLL */}
                    <div className="w-full h-full flex flex-col justify-center p-8 md:p-20 overflow-hidden relative bg-black">
                        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent z-40 pointer-events-none" />
                        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent z-40 pointer-events-none" />

                        <div
                            className="w-full text-xs text-white/50 space-y-12"
                            style={{
                                transform: `translateY(calc(-${manifestoRollY}px + 500px))`,
                                transition: "transform 0.08s ease-out"
                            }}
                        >
                            <div className="space-y-4 max-w-md">
                                <p className="leading-relaxed text-white/90 font-sans antialiased text-base">
                                    A pen and a paper on its own can not form words;<br />
                                    Ideas without sense are just wasted ink;<br />
                                    And execution without impact is just noise.
                                </p>
                            </div>

                            <div className="space-y-4 max-w-md">
                                <p className="leading-relaxed text-white/90 font-sans antialiased text-base">
                                    <span className="block">Find your purpose.</span>
                                    <span className="block">Challenge what needs to be challenged.</span>
                                    <span className="block">Be the voice of the voiceless.</span>
                                    <span className="block">Be firm with your principles.</span>
                                </p>
                            </div>

                            <div className="w-12 h-px bg-white/10" />

                            <div className="pt-2">
                                <h2 className="text-lg md:text-xl font-black tracking-[0.3em] text-white uppercase font-sans antialiased">
                                    CREATE WITH A PURPOSE
                                </h2>
                            </div>

                            <section id="contact">
                                <div className="space-y-4">
                                    <span className="text-white/30 text-[10px] tracking-[0.4em] uppercase block font-bold">
                                        LET'S CONNECT!
                                    </span>
                                    <div className="flex items-center gap-6 text-xl text-white/60">
                                        <a href="mailto:melaniecasabar314@gmail.com" className="hover:text-white transition-colors" title="Email">
                                            <FiMail />
                                        </a>
                                        <a href="http://www.linkedin.com/in/melanie-casabar-376855270" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" title="LinkedIn">
                                            <FiLinkedin />
                                        </a>
                                        <a href="https://www.instagram.com/pixel___motion?igsh=czlrNG05NWVqam1q" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" title="Instagram">
                                            <FiInstagram />
                                        </a>
                                    </div>
                                </div>

                                <div className="pt-12 space-y-1.5 text-[9px] uppercase tracking-widest text-white/80">
                                    <p>MELANIE CASABAR</p>
                                    <p>© 2026 ALL RIGHTS RESERVED</p>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
"use client";

import React, { useState, useEffect, useRef } from "react";
import { FiVolume2, FiVolumeX } from "react-icons/fi";

import HeroSection from "./components/HeroSection";
import AboutMe from "./components/AboutMe";
import Individual from "./components/Individual";
import Collaborative from "./components/Collaborative";
import SeaDivider from "./components/SeaDivider";

const Home = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Set initial ambient volume (0.0 to 1.0)
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.25; // 25% subtle background volume
    }
  }, []);

  // Handle Play / Mute Toggle Button
  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasInteracted(true);
        })
        .catch((err) => {
          console.log("Audio playback blocked:", err);
        });
    }
  };

  // Auto-start ambient sound on first user click/tap anywhere on the site
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasInteracted && audioRef.current) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            setHasInteracted(true);
          })
          .catch(() => {
            // Autoplay blocked until user manually toggles
          });
      }
    };

    window.addEventListener("click", handleFirstInteraction, { once: true });
    return () => window.removeEventListener("click", handleFirstInteraction);
  }, [hasInteracted]);

  return (
    <>
      {/* ─── 1. BACKGROUND AMBIENT AUDIO ─── */}
      <audio
        ref={audioRef}
        src="/audio/ambient sound.mp3"
        loop
        preload="auto"
      />

      {/* ─── 2. FLOATING AUDIO TOGGLE BUTTON (BOTTOM-RIGHT) ─── */}
      <button
        onClick={toggleAudio}
        aria-label={isPlaying ? "Mute audio" : "Unmute audio"}
        style={{
          position: "fixed",
          bottom: "2rem", // 32px from bottom
          right: "2rem",  // 32px from right
          zIndex: 9999,   // Keep above all sections
        }}
        className="bg-black/80 hover:bg-black/95 backdrop-blur-md text-white px-5 py-3 rounded-full border border-white/30 hover:border-white/70 transition-all duration-300 shadow-2xl flex items-center gap-3 cursor-pointer group"
      >
        {isPlaying ? (
          <>
            <FiVolume2 className="text-2xl text-emerald-400 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-white/90">
              MUTE
            </span>
          </>
        ) : (
          <>
            <FiVolumeX className="text-2xl text-white/50" />
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-white/60 group-hover:text-white">
              UNMUTE
            </span>
          </>
        )}
      </button>

      {/* ─── MAIN PAGE CONTENT ─── */}
      <main className="relative bg-black text-white">
        <HeroSection />
        <Individual />
        <SeaDivider />
        <Collaborative />
        <AboutMe />
      </main>
    </>
  );
};

export default Home;
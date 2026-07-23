"use client";

import React, { useState, useEffect, useRef } from 'react';

interface ProjectImage {
  src: string;
  metadata: string;
}

interface Project {
  id: string;
  number: string;
  title: string;
  type: string;
  tagline: string;
  theme: string[];
  images: (string | ProjectImage)[];
  isPortrait?: boolean;
}

const individualProjects: Project[] = [
  {
    id: "project-1",
    number: "I-01",
    title: "Ma, Ano Ulam?",
    type: "PITCH DECK",
    tagline: "A kid pleads for a different meal  other than a can of sardines, only to understand the hardship of parenthood.",
    theme: [
      "A social realism narrative that exposes the normalized habits families adopt to survive financial hardship.",
      "The original photographs anchor the narrative visually, creating a mirror that forces the audience to feel like they are looking directly at their own lives."
    ],
    images: [
      "/images/Ma, Ano Ulam/1.png",
      "/images/Ma, Ano Ulam/2.png",
      "/images/Ma, Ano Ulam/3.png",
      "/images/Ma, Ano Ulam/4.png",
      "/images/Ma, Ano Ulam/5.png",
      "/images/Ma, Ano Ulam/6.png",
      "/images/Ma, Ano Ulam/7.png",
      "/images/Ma, Ano Ulam/8.png",
      "/images/Ma, Ano Ulam/9.png",
      "/images/Ma, Ano Ulam/10.png",
      "/images/Ma, Ano Ulam/11.png",
      "/images/Ma, Ano Ulam/12.png",
      "/images/Ma, Ano Ulam/13.png",
      "/images/Ma, Ano Ulam/14.png"
    ],
    isPortrait: false
  },
  {
    id: "project-2",
    number: "I-02",
    title: "UHAW SA BIYAYA",
    type: "PHOTOGRAPH",
    tagline: "An image that explores human deperation.",
    theme: [
      "Throught observational photoragphy, the image encapsulates an empathetic, raw look at how people in difficult circumstances reach out for anything — a sliver of hope, a drop of comfort, a blessing — just to keep going.",
    ],
    images: ["/images/Uhaw Sa Biyaya.png"],
    isPortrait: false
  },
  {
    id: "project-3",
    number: "I-03",
    title: "NGITING WALANG KATUMBAS",
    type: "PHOTOGRAPH",
    tagline: "It documents the peak of resilient human joy amidst a chaotic backdrop.",
    theme: [
      "1st place - Inspirare Photograhy Contest.",
      "Using observational photography and natural light, the composition deliberately enhances color and light to isolate the subjects from their crowded, gritty environment.",
      "It serves as a gentle reminder that profound hope and happiness are often found in the simplest moments."
    ],
    images: ["/images/Ngiting Walang Katumbas.png"],
    isPortrait: false
  }
];

export default function Individual() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [hasReachedShore, setHasReachedShore] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveProject(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setHasReachedShore(true);
      },
      { threshold: 0.1, rootMargin: "-50px 0px" }
    );

    if (triggerRef.current) observer.observe(triggerRef.current);
    return () => observer.disconnect();
  }, []);

  const featuredProject = individualProjects[0];
  const secondaryProjects = individualProjects.slice(1);

  return (
    <section
      id="individual"
      className="relative w-full min-h-screen bg-black text-white py-16 md:py-24 px-6 md:px-16 flex items-center justify-center"
      style={{ fontFamily: "'Courier Prime', 'Courier New', monospace" }}
    >
      <style jsx global>{`
        @keyframes subtleFloat {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: subtleFloat 5s ease-in-out infinite;
        }
      `}</style>

      {/* ⚡ Mobile re-ordering: flex-col-reverse puts text (right col) FIRST on mobile, grid second */}
      <div className="max-w-7xl w-full flex flex-col-reverse lg:grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

        {/* ─── LEFT COLUMN: GRID CARDS (PROJ 1, PROJ 2, PROJ 3) ─── */}
        <div className="w-full lg:col-span-7 flex flex-col gap-6">

          {/* FEATURED CARD: PROJ 1 */}
          {featuredProject && (
            <div
              onClick={() => {
                setActiveProject(featuredProject);
                setActiveImageIndex(0);
              }}
              className="group relative w-full h-72 md:h-96 bg-[#141414] border border-white/10 hover:border-white/40 transition-all duration-500 cursor-pointer overflow-hidden p-8 flex flex-col justify-end shadow-2xl"
            >
              {featuredProject.images[0] && (
                <img
                  src={typeof featuredProject.images[0] === 'string' ? featuredProject.images[0] : featuredProject.images[0].src}
                  alt={featuredProject.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 group-hover:grayscale-0"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />

              <div className="relative z-20 space-y-2">
                <h3 className="text-2xl md:text-4xl font-black uppercase tracking-wider text-white">
                  {featuredProject.title}
                </h3>
                <span className="text-[10px] text-white/50 tracking-[0.3em] font-mono block uppercase">
                  {featuredProject.type}
                </span>
                <p className="text-xs md:text-sm text-white/70 line-clamp-2 font-mono max-w-lg">
                  {featuredProject.tagline}
                </p>
              </div>
            </div>
          )}

          {/* SECONDARY ROW: PROJ 2 & PROJ 3 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {secondaryProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => {
                  setActiveProject(project);
                  setActiveImageIndex(0);
                }}
                className="group relative w-full h-56 sm:h-64 bg-[#141414] border border-white/10 hover:border-white/40 transition-all duration-500 cursor-pointer overflow-hidden p-6 flex flex-col justify-end shadow-xl"
              >
                {project.images[0] && (
                  <img
                    src={typeof project.images[0] === 'string' ? project.images[0] : project.images[0].src}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 group-hover:grayscale-0"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />

                <div className="relative z-20 space-y-1.5">
                  <h4 className="text-lg md:text-xl font-bold uppercase tracking-wider text-white">
                    {project.title}
                  </h4>
                  <span className="text-[10px] text-white/50 tracking-[0.3em] font-mono block uppercase">
                    {project.type}
                  </span>
                  <p className="text-xs text-white/60 line-clamp-2 font-mono">
                    {project.tagline}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* ─── RIGHT COLUMN: INTRO NARRATIVE TEXT (Appears at TOP on mobile) ─── */}
        <div ref={triggerRef} className="w-full lg:col-span-5 flex flex-col justify-center space-y-8 animate-float">
          <h2 className="text-2xl md:text-3xl lg:text-4xl leading-snug font-normal tracking-wide text-white/90">
            Her ideas don't just sink; they float, ensuring they reach the{" "}
            <span
              className={`transition-all duration-1000 ${hasReachedShore
                  ? "text-white font-bold underline underline-offset-8 decoration-wavy border-white/40"
                  : "text-white/40"
                }`}
            >
              shore.
            </span>
          </h2>

          <div className="space-y-4 text-sm md:text-base text-white/60 font-mono leading-relaxed border-l pl-6">
            <p>
              Our individual experiences are just small fragments of a much bigger world. 
            </p>
            <p>
              To create is to explore those unseen spaces - connecting deeply with reality by embracing the mundane, the beautiful, and the raw.
            </p>
          </div>
        </div>

      </div>

      {/* ─── POP-UP DETAIL MODAL MODULE ─── */}
      {activeProject && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
          onClick={() => setActiveProject(null)}
        >
          <div
            className="bg-[#0f0f0f] border border-white/15 w-full max-w-6xl max-h-[90vh] overflow-y-auto relative shadow-2xl p-6 md:p-12"
            onClick={(e) => e.stopPropagation()}
          >
            {/* CLOSE "X" BUTTON */}
            <button
              onClick={() => setActiveProject(null)}
              className="absolute top-6 right-6 z-50 text-white/60 hover:text-white bg-black/50 hover:bg-white/10 border border-white/20 w-10 h-10 flex items-center justify-center text-xl font-mono transition-all cursor-pointer"
            >
              ✕
            </button>

            <div className="w-full flex flex-col lg:flex-row gap-8 lg:gap-12 items-start mt-4">

              {/* LEFT: SLIDER GALLERY VIEWPORT (Borderless & Uncropped) */}
              <div className="w-full lg:w-3/5 flex flex-col gap-4">
                {/* ⚡ Removed border & bg-[#111] wrapper, using image's natural dimensions */}
                <div className="w-full relative flex items-center justify-center overflow-hidden">

                  <img
                    src={
                      typeof activeProject.images[activeImageIndex] === 'string'
                        ? (activeProject.images[activeImageIndex] as string)
                        : (activeProject.images[activeImageIndex] as ProjectImage)?.src
                    }
                    alt={`${activeProject.title} Slide ${activeImageIndex + 1}`}
                    className="w-auto h-auto max-h-[60vh] object-contain block"
                  />

                  {/* Arrow Controls */}
                  {activeProject.images.length > 1 && (
                    <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex justify-between items-center pointer-events-none">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveImageIndex((prev) =>
                            prev === 0 ? activeProject.images.length - 1 : prev - 1
                          );
                        }}
                        className="w-10 h-10 rounded-full bg-black/80 text-white flex items-center justify-center border border-white/20 hover:bg-white hover:text-black transition-all pointer-events-auto cursor-pointer"
                      >
                        ←
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveImageIndex((prev) =>
                            prev === activeProject.images.length - 1 ? 0 : prev + 1
                          );
                        }}
                        className="w-10 h-10 rounded-full bg-black/80 text-white flex items-center justify-center border border-white/20 hover:bg-white hover:text-black transition-all pointer-events-auto cursor-pointer"
                      >
                        →
                      </button>
                    </div>
                  )}

                  {/* Counter Badge */}
                  {activeProject.images.length > 1 && (
                    <div className="absolute bottom-2 right-2 bg-black/90 px-3 py-1 text-[10px] text-white/70 tracking-widest border border-white/10 font-mono">
                      {(activeImageIndex + 1).toString().padStart(2, '0')} / {activeProject.images.length.toString().padStart(2, '0')}
                    </div>
                  )}
                </div>

                {/* Thumbnails Strip */}
                {activeProject.images.length > 1 && (
                  <div className="w-full flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/20">
                    {activeProject.images.map((slide, idx) => {
                      const src = typeof slide === 'string' ? slide : (slide as ProjectImage)?.src;
                      return (
                        <div
                          key={idx}
                          onClick={() => setActiveImageIndex(idx)}
                          className={`h-16 aspect-video flex-shrink-0 border cursor-pointer overflow-hidden transition-all ${idx === activeImageIndex
                              ? "border-white opacity-100 scale-95"
                              : "border-white/10 opacity-50 hover:opacity-100"
                            }`}
                        >
                          <img src={src} alt="Thumbnail" className="w-full h-full object-cover" />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* RIGHT: PROJECT SPECS & THEMES */}
              <div className="w-full lg:w-2/5 flex flex-col space-y-6 text-left">
                <div className="space-y-1 border-b border-white/10 pb-4">
                  <h3 className="text-3xl md:text-4xl font-black tracking-wider text-white uppercase">
                    {activeProject.title}
                  </h3>
                  <span className="text-[10px] text-[#736F6E] tracking-[0.25em] block uppercase font-mono">
                    {activeProject.type}
                  </span>
                </div>

                <div className="space-y-4 text-xs md:text-sm text-[#DCD9D2] leading-relaxed font-mono">
                  {Array.isArray(activeProject.theme) ? (
                    activeProject.theme.map((paragraph: string, idx: number) => (
                      <p key={idx}>{paragraph}</p>
                    ))
                  ) : (
                    <p>{activeProject.theme}</p>
                  )}
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}
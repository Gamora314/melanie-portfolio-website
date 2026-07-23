"use client";

import React, { useState, useEffect, useRef } from 'react';

interface CollaborativeProject {
    id: string;
    number: string;
    title: string;
    type: string;
    role: string;
    tagline: string;
    theme: string | string[];
    youtubeId: string;
    thumbnail: string;
    pitchDeckSlides?: string[] | null;
}

const collaborativeProjects: CollaborativeProject[] = [
    {
        id: "collab-1",
        number: "C-01",
        title: "He Loves Me Not",
        type: "SHORT FILM",
        role: "WRITER",
        tagline: "A girl playing the daisy game with the last flowers she can find, while the world around her slowly becomes unrecognizable.",
        theme: [
            "A narrative short film that explores the destructive gravity of human activity on the natural world, and questions how far humanity will go, forcing viewers to realize how far humanity will push ecological boundaries before realizing our actions are violently rebounding upon us."
        ],
        youtubeId: "", // Swap this out with your real YouTube ID string
        thumbnail: "/images/He Loves Me Not Official Poster.png",
        pitchDeckSlides: [
            "/images/He Loves Me Not/1.png",
            "/images/He Loves Me Not/2.png",
            "/images/He Loves Me Not/3.png",
            "/images/He Loves Me Not/4.png",
            "/images/He Loves Me Not/5.png",
            "/images/He Loves Me Not/6.png",
            "/images/He Loves Me Not/7.png",
            "/images/He Loves Me Not/8.png",
            "/images/He Loves Me Not/9.png",
            "/images/He Loves Me Not/10.png"
        ]
    },
    {
        id: "collab-2",
        number: "C-02",
        title: "Dinuguan",
        type: "SHORT FILM",
        role: "WRITER",
        tagline: "Faced with soaring inflation and severe food insecurity, a mother sacrifices her own limb to feed her starving family",
        theme: [
            "A no-dialogue social realism short film. That serves as a brutal interrogation of the continuous decline of the Philippine economy, questioning the breaking point of human resourcefulness.",
            "By stripping away all spoken dialogue, the film investigates how deeply suffering, poverty, and systemic desperation have been normalized and ingrained into the cultural fabric."
        ],
        youtubeId: "h_kfbWU-xUg",
        thumbnail: "/images/Dinuguan Official Poster.png",
        pitchDeckSlides: [
            "/images/Dinuguan Pitch Deck/1.jpg",
            "/images/Dinuguan Pitch Deck/2.jpg",
            "/images/Dinuguan Pitch Deck/3.jpg",
            "/images/Dinuguan Pitch Deck/4.jpg",
            "/images/Dinuguan Pitch Deck/5.jpg",
            "/images/Dinuguan Pitch Deck/6.jpg",
            "/images/Dinuguan Pitch Deck/7.jpg",
            "/images/Dinuguan Pitch Deck/8.jpg",
            "/images/Dinuguan Pitch Deck/9.jpg",
            "/images/Dinuguan Pitch Deck/10.jpg",
            "/images/Dinuguan Pitch Deck/11.jpg"
        ]
    },
    {
        id: "collab-3",
        number: "C-03",
        title: "Tracing The Man He Was",
        type: "DOCUMENTARY",
        role: "WRITER",
        tagline: "A grieving daughter’s emotional journey as she makes sense of who her late father truly was.",
        theme: [
            "A personal documentary film that explores grief, regrets, and honoring our loved ones.",
            "Using archival footage and narration it offers the most honest way to revisit memories.",
            "Through this film, the audience is reminded that life has an end, urging us to live with no regrets and spend time with those we love while we still can."
        ],
        youtubeId: "3Ytb0fhNmbw",
        thumbnail: "/images/Tracing The Man He Was.png",
        pitchDeckSlides: null
    }
];

export default function Collaborative() {
    const [activeProject, setActiveProject] = useState<CollaborativeProject | null>(null);
    const [viewMode, setViewMode] = useState<"video" | "deck">("video");
    const [isPlayingVideo, setIsPlayingVideo] = useState(false);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [hasReachedShore, setHasReachedShore] = useState(false);
    const triggerRef = useRef<HTMLDivElement>(null);

    // Close modal on ESC key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setActiveProject(null);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Intersection Observer for header animation trigger
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setHasReachedShore(true);
                }
            },
            { threshold: 0.1, rootMargin: "-50px 0px" }
        );

        if (triggerRef.current) observer.observe(triggerRef.current);
        return () => observer.disconnect();
    }, []);

    // Reset modal internal state when active project changes
    const handleOpenModal = (project: CollaborativeProject) => {
        setActiveProject(project);
        setViewMode("video");
        setIsPlayingVideo(false);
        setCurrentSlideIndex(0);
    };

    const slides = activeProject?.pitchDeckSlides || [];

    return (
        <section
            id="collaborative"
            className="relative w-full min-h-screen bg-black text-white py-24 px-6 md:px-16 flex flex-col items-center justify-center"
            style={{ fontFamily: "'Courier Prime', 'Courier New', monospace", paddingTop: "150px" }}
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


            <div className="max-w-7xl w-full flex flex-col space-y-16 md:space-y-24 items-center">

                {/* ─── INTRODUCTORY FLOATING TEXT ─── */}
                <div ref={triggerRef} className="w-full text-center space-y-6 animate-float">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl leading-relaxed font-normal tracking-wide text-white/90">
                        But ideas are nothing without the waves. The winds. The tides.{" "}
                        <span
                            className={`transition-all duration-1000 ${hasReachedShore
                                ? "text-white font-bold underline underline-offset-8 decoration-wavy border-white/40"
                                : "text-white/40"
                                }`}
                        >
                            The forces that bring them to the shore.
                        </span>
                    </h2>
                </div>

                {/* ─── PARENT WRAPPER FOR GRID + ROCKY BACKGROUND ─── */}
                <div className="relative w-full py-12" style={{ paddingTop: "120px" }}>

                    {/* ⚡ 1. ROCKY FORMATION BACKGROUND STRIP (Forces true full-bleed stretch) */}
                    <div
                        className="absolute pointer-events-none z-0 bg-black overflow-hidden transform-gpu max-w-none"
                        style={{
                            height: "220px",
                            top: "90%",
                            transform: "translateY(-50%)",
                            /* BREAKOUT FORMULA: Ignores parent max-width limits */
                            width: "100vw",
                            left: "49%",
                            marginLeft: "-50vw",
                        }}
                    >
                        <img
                            src="/images/Assets/rocky formation.png"
                            alt="Canyon Horizon Background"
                            decoding="sync"
                            className="w-full h-full object-cover object-center opacity-25 filter grayscale mix-blend-luminosity transform-gpu"
                        />

                        {/* Top & Bottom Black Gradients for Smooth Fade */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />
                    </div>

                    {/* ─── 3-COLUMN PROJECT GRID ─── */}
                    <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">

                        {/* ─── PROJECT CARDS ─── */}
                        {collaborativeProjects.map((project) => {
                            const oneLiner = Array.isArray(project.theme) ? project.theme[0] : project.theme;

                            return (
                                <div
                                    key={project.id}
                                    onClick={() => handleOpenModal(project)}
                                    className="group relative w-full aspect-[2/3] max-h-[550px] bg-[#141414] border border-white/10 hover:border-white/40 transition-all duration-500 cursor-pointer overflow-hidden p-6 md:p-8 flex flex-col justify-end shadow-2xl"
                                >
                                    {/* Poster Background Image */}
                                    {project.thumbnail && (
                                        <img
                                            src={project.thumbnail}
                                            alt={project.title}
                                            decoding="sync"
                                            className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 group-hover:grayscale-0"
                                        />
                                    )}

                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent z-10" />

                                    {/* Card Text & One-Liner */}
                                    <div className="relative z-20 space-y-2">
                                        <h3 className="text-xl md:text-2xl font-black uppercase tracking-wider text-white">
                                            {project.title}
                                        </h3>
                                        <span className="text-[10px] text-white/50 tracking-[0.3em] font-mono block uppercase">
                                            {project.type}
                                        </span>
                                        <p className="text-xs text-white/70 line-clamp-3 font-mono leading-relaxed">
                                            {project.tagline}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
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

                        {/* MODAL CONTENT GRID */}
                        <div className="w-full flex flex-col lg:flex-row gap-8 lg:gap-12 items-start mt-4">

                            {/* LEFT: MEDIA VIEWER (VIDEO OR PITCH DECK) */}
                            <div className="w-full lg:w-3/5 flex flex-col gap-4">
                                <div className="w-full relative flex items-center justify-center overflow-hidden min-h-[300px] md:min-h-[400px]">

                                    {viewMode === "video" ? (
                                        /* 🎥 VIDEO MODE */
                                        !isPlayingVideo ? (
                                            <div
                                                onClick={() => setIsPlayingVideo(true)}
                                                className="w-full h-full relative cursor-pointer group flex items-center justify-center overflow-hidden"
                                            >
                                                <img
                                                    src={activeProject.thumbnail}
                                                    alt={`${activeProject.title} Thumbnail`}
                                                    className="w-full max-h-[55vh] object-contain block"
                                                />
                                                <div className="absolute w-16 h-16 rounded-full border border-white/20 bg-black/60 backdrop-blur-md text-white flex items-center justify-center text-xl z-20 group-hover:scale-110 group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300">
                                                    ▶
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="w-full h-[50vh] relative">
                                                <iframe
                                                    className="w-full h-full"
                                                    src={`https://www.youtube.com/embed/${activeProject.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                                                    title={activeProject.title}
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                />
                                            </div>
                                        )
                                    ) : (
                                        /* 🗂️ PITCH DECK MODE */
                                        <div className="w-full h-full relative flex items-center justify-center group">
                                            <img
                                                src={slides[currentSlideIndex]}
                                                alt={`${activeProject.title} Deck Slide ${currentSlideIndex + 1}`}
                                                className="w-auto h-auto max-h-[55vh] object-contain block"
                                            />

                                            {/* Navigation Arrows */}
                                            {slides.length > 1 && (
                                                <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex justify-between items-center z-20 pointer-events-none">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
                                                        }}
                                                        className="w-10 h-10 rounded-full bg-black/80 text-white flex items-center justify-center border border-white/20 hover:bg-white hover:text-black transition-all cursor-pointer pointer-events-auto font-sans"
                                                    >
                                                        ←
                                                    </button>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
                                                        }}
                                                        className="w-10 h-10 rounded-full bg-black/80 text-white flex items-center justify-center border border-white/20 hover:bg-white hover:text-black transition-all cursor-pointer pointer-events-auto font-sans"
                                                    >
                                                        →
                                                    </button>
                                                </div>
                                            )}

                                            {/* Counter Badge */}
                                            {slides.length > 1 && (
                                                <div className="absolute bottom-2 right-2 bg-black/90 px-3 py-1 font-mono text-[10px] text-white/70 tracking-widest border border-white/10">
                                                    {(currentSlideIndex + 1).toString().padStart(2, '0')} / {slides.length.toString().padStart(2, '0')}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                </div>

                                {/* Pitch Deck Thumbnails Strip */}
                                {viewMode === "deck" && slides.length > 1 && (
                                    <div className="w-full flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/20">
                                        {slides.map((slide: string, idx: number) => (
                                            <div
                                                key={idx}
                                                onClick={() => setCurrentSlideIndex(idx)}
                                                className={`h-16 aspect-video flex-shrink-0 border cursor-pointer overflow-hidden transition-all ${idx === currentSlideIndex
                                                    ? "border-white opacity-100 scale-95"
                                                    : "border-white/10 opacity-50 hover:opacity-100"
                                                    }`}
                                            >
                                                <img src={slide} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* RIGHT: SPECS, THEME & MODE TOGGLE BUTTONS */}
                            <div className="w-full lg:w-2/5 flex flex-col space-y-6 text-left">
                                <div className="space-y-1 border-b border-white/10 pb-4">
                                    <h3 className="text-3xl md:text-4xl font-black tracking-wider text-white uppercase">
                                        {activeProject.title}
                                    </h3>
                                    <span className="text-[10px] text-[#736F6E] tracking-[0.25em] font-mono block uppercase">
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

                                {/* DYNAMIC ACTION BUTTONS */}
                                {activeProject.pitchDeckSlides && activeProject.pitchDeckSlides.length > 0 && (
                                    <div className="flex flex-wrap gap-4 pt-2 w-full">
                                        {/* WATCH VIDEO BUTTON */}
                                        <button
                                            onClick={() => setViewMode("video")}
                                            className={`flex items-center gap-3 px-5 py-3 border text-[11px] font-mono tracking-widest uppercase transition-all duration-300 cursor-pointer ${viewMode === "video"
                                                ? "border-white bg-white text-black"
                                                : "border-white/10 bg-[#111]/50 text-white hover:bg-white hover:text-black hover:border-white"
                                                }`}
                                        >
                                            <span>WATCH VIDEO</span>
                                        </button>

                                        {/* PITCH DECK TOGGLE BUTTON */}
                                        <button
                                            onClick={() => setViewMode("deck")}
                                            className={`flex items-center gap-3 px-5 py-3 border text-[11px] font-mono tracking-widest uppercase transition-all duration-300 cursor-pointer ${viewMode === "deck"
                                                ? "border-white bg-white text-black"
                                                : "border-white/10 bg-[#111]/50 text-white hover:bg-white hover:text-black hover:border-white"
                                                }`}
                                        >
                                            <span>PITCH DECK</span>
                                        </button>
                                    </div>
                                )}

                            </div>

                        </div>

                    </div>
                </div>
            )}

        </section>
    );
}
"use client"
import React, { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronDownIcon, ArrowUpRightIcon, ArrowLeftIcon, XMarkIcon } from '@heroicons/react/24/outline'


const observerProjects = [
  { title: "Ngiting Walang Katumbas", category: "Highlights", desc: "1st Place - CIIT Inspirare Photo Contest. This was captured during a community feeding program. It serves as a gentle reminder that profound hope and happiness are often found in the simplest, most fleeting moments.", image: "/images/Ngiting Walang Katumbas.jpg" },
  { title: "Sisterly Love", category: "Highlights", desc: "Set against the chaotic backdrop of a community feeding program, this photograph isolates a binding, incomparable sisterly bond. It captures the raw essence of having a lifelong safe sapce - a dedicated anchor you can always count on.", image: "/images/Sisterly Love.jpg" },
  { title: "Walang Nangyari!", category: "Highlights", desc: "Inspired by the three wise monkeys, this photography finals project explores the crushing reality of forced helplessness, fear, and the complex reality of being both a witness and a victim trapped in a silencing situation.", image: "/images/Walang Nangyari!.jpg" },
  { title: "Uhaw sa Biyaya", category: "Volunteer Work", desc: "Shot during a Simbang Gabi in a local chapel. This captures the things we do for even just a drop of hope, praying it will finally be granted", image: "/images/carousel-3.jpg" },
  { title: "Senakulo 2024", category: "Volunteer Work", desc: " A dramatic, localized visual documentation capturing the intensity and devotion of the Holy Family Chapel’s annual Lenten reenactment of the Passion of Christ.", image: "/images/The Passion Play 2024.png" },
  { title: "Senakulo 2026", category: "Volunteer Work", desc: "A continued visual documentation and reenactment of the final days of Jesus Christ, presented by the Holy Family Chapel - Violago", image: "/images/The Passion Play 2026.png" },
  { title: "CIIT SportsFest Year 11", category: "Volunteer Work", desc: "High-energy action coverage captured as a volunteer photographer for the official student publication, spanning the intense emotional highs of everything from badminton and moonboarding to focused board game strategies.", image: "/images/SportsFest Year 11.png" },
  { title: "Blessed To Be With You", category: "Travel", desc: "Side by side, we hold hands and never let go, together striking the shrine bell that brings everlasting luck and fortune... just like our love. This intimate frame stands as a visual testament to an enduring connection built to last a lifetime.", image: "/images/Blessed To Be With You.jpg" },
  { title: "Beyond The Torri", category: "Travel", desc: "As we walk beyond the realm of the spirits, we leave our worries behind. It captures the moment of crossing a holy threshold to be reborn once more.", image: "/images/Beyond The Torri.jpg" },
  { title: "The Perfect Timing", category: "Travel", desc: "The devotion. The passion. The patience. All of it converges just to freeze a single, unrepeatable instant that is both incredibly precious and powerful. This frame serves as a testament to the quiet discipline of capturing life's fleeting magic. ", image: "/images/The Perfect Timing.jpg" },
]

const writerProjects = [
  {
    title: "Dinuguan",
    category: "Short Film",
    desc: "Faced with soaring inflation, a mother sacrifices her own limb to feed her starving family in a social realism short film that explores poverty, desperation, and the continuous decline of the Philippine economy.",
    roles: "Screenwriter, Director, & Actor",
    link: "https://drive.google.com/file/d/1lBP_FIHXH9_8ISjKy6D77JptAloHxLPu/view?usp=drive_link",
    image: "/images/Dinuguan.png",
    pitchDeck: [
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
    title: "Multo - Cup of Joe: Student Made Music Video",
    category: "Music Video",
    desc: "This student-made music video follows a grieving man as he battles intense guilt and denial over the tragic accident that took his late girlfriend's life while being haunted by her memory.",
    roles: "Co-Screenwriter, Cinematographer, Cam Op, & Video Editor",
    link: "https://youtu.be/yTXuvr6WABI",
    image: "https://img.youtube.com/vi/yTXuvr6WABI/maxresdefault.jpg",
    youtubeId: "yTXuvr6WABI",
    pitchDeck: [
      "/images/Multo Pitch Deck/1.jpg",
      "/images/Multo Pitch Deck/2.jpg",
      "/images/Multo Pitch Deck/3.jpg",
      "/images/Multo Pitch Deck/4.jpg",
      "/images/Multo Pitch Deck/5.jpg",
      "/images/Multo Pitch Deck/6.jpg",
      "/images/Multo Pitch Deck/7.jpg",
      "/images/Multo Pitch Deck/8.jpg",
      "/images/Multo Pitch Deck/9.jpg"
    ]
  },
  {
    title: "Alt + F4 - 100 Sec Film",
    category: "Short Film",
    desc: "This 100-second short film follows a burned-out graphic artist who accidentally spills her coffee late at night, only to discover that her keyboard might hold the literal power to undo her mess.",
    roles: "Screenwriter, Director, Cam Op, & Editor",
    link: "https://youtu.be/_BRBfjTyV0M",
    image: "https://img.youtube.com/vi/_BRBfjTyV0M/maxresdefault.jpg",
    youtubeId: "_BRBfjTyV0M"
  },
  {
    title: "Anak, Pag-Ibig, at Pag-Uwi",
    category: "A Screenplay Excerpt & Production Design Study",
    desc: "Set in 1990s Quezon City, this dramatic screenplay excerpt and physical diorama production study follows Jeric, a soon-to-be father who makes a desperate attempt to chase a better life abroad after being inspired by his mother’s sacrifices as an OFW.",
    roles: "Writer",
    image: "/images/Anak/7.jpg",
    isPortrait: true, // 💡 Add this flag to tell the modal it's a vertical layout
    pitchDeck: [
      "/images/Anak/7.jpg",
      "/images/Anak/8.jpg",
      "/images/Anak/9.jpg"
    ]
  },
  {
    title: "Belo Men Rebranding & Ad Campaign",
    category: "Ad Campaign",
    desc: "This advertising campaign celebrates the courage of men who break standard style boundaries under the big idea 'Own Your Glow. Because You BELOng,' proving that true masculinity is about embracing who you are and feeling confident in your own skin.",
    roles: "Writer",
    image: "/images/Belo Men/1.jpg",
    pitchDeck: [
      "/images/Belo Men/1.jpg",
      "/images/Belo Men/2.jpg",
      "/images/Belo Men/3.jpg",
      "/images/Belo Men/4.jpg",
      "/images/Belo Men/5.jpg",
      "/images/Belo Men/6.jpg",
      "/images/Belo Men/7.jpg",
      "/images/Belo Men/8.jpg",
      "/images/Belo Men/9.jpg",
      "/images/Belo Men/10.jpg",
      "/images/Belo Men/11.jpg",
      "/images/Belo Men/12.jpg",
      "/images/Belo Men/13.jpg",
      "/images/Belo Men/14.jpg",
      "/images/Belo Men/15.jpg",
      "/images/Belo Men/16.jpg",
      "/images/Belo Men/17.jpg",
      "/images/Belo Men/18.jpg",
      "/images/Belo Men/19.jpg",
      "/images/Belo Men/20.jpg",
      "/images/Belo Men/21.jpg",
      "/images/Belo Men/22.jpg",
      "/images/Belo Men/23.jpg"
    ]
  },
]

const finalPillarProjects = [
  {
    title: "SOCIETY",
    category: "Video Poem",
    desc: "A poem about wanting to be accepted for who you truly are. Feeling trapped by society’s expectations and choosing to embrace your own uniqueness instead.",
    roles: "Co-Writer, Editor, & Narrator",
    link: "https://youtu.be/SVwWPlBSvPM",
    image: "https://img.youtube.com/vi/SVwWPlBSvPM/maxresdefault.jpg",
    youtubeId: "SVwWPlBSvPM"
  },
  {
    title: "i met someone",
    category: "Video Poem",
    desc: "A poem about meeting someone who hides her pain behind poetry and a smile. Wanting to help her heal, and pour your heart out, even if you don’t know how.",
    roles: "Writer, Editor, Cam Op, & Narrator",
    link: "https://youtu.be/yJdArQf5rns",
    image: "https://img.youtube.com/vi/yJdArQf5rns/maxresdefault.jpg",
    youtubeId: "yJdArQf5rns"
  },
  {
    title: "Bilanggo",
    category: "Poems",
    desc: "A poem about feeling lost in life. Watching other people move forward while you slowly drift away from your own path without even realizing it.",
    roles: "Writer / Poet", // Kept just the title/roles as requested earlier!
    image: "/images/Bilanggo.png",
    isFullImageShowcase: true // 💡 ADD THIS FLAG
  },
  {
    title: "House",
    category: "Poems",
    desc: "A poem about wanting peace and isolation. Wanting a quiet place away from everything, where you can just stay with your memories and rest.",
    roles: "Writer / Poet",
    image: "/images/House.png",
    isFullImageShowcase: true // 💡 ADD THIS FLAG
  },
  {
    title: "I'm Fine",
    category: "Poems",
    desc: "A poem about hiding your true feelings behind “I’m fine.” About how lying becomes easier when it feels like no one really has the time or patience to listen.",
    roles: "Writer / Poet",
    image: "/images/I_m Fine.png",
    isFullImageShowcase: true // 💡 ADD THIS FLAG
  },
  {
    title: "Smile",
    category: "Poems",
    desc: "A poem about quietly appreciating life and happiness. Wanting people to understand that even if you don’t show emotions well, it doesn’t mean you’re not genuinely happy inside.",
    roles: "Writer / Poet",
    image: "/images/Smile.png",
    isFullImageShowcase: true // 💡 ADD THIS FLAG
  },
]

// 💡 MASTER WRAPPER: Implements Suspense boundary to protect deployment builds
const DetailedGallery = () => {
  return (
    <Suspense fallback={
      <div className="w-full min-h-screen bg-[#0b0416] flex items-center justify-center text-[#F4F1EA]/60 font-mono text-xs tracking-widest uppercase">
        Loading Archives...
      </div>
    }>
      <GalleryContent />
    </Suspense>
  )
}

// 💡 SEPARATED LOGIC CONTENT CORE
function GalleryContent() {
  const searchParams = useSearchParams()

  {/* Track multiple open states instead of just one string so "open all" can display everything simultaneously */ }
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    observer: false,
    writer: false,
    final: false
  })

  const [activeModalProject, setActiveModalProject] = useState<any | null>(null)

  useEffect(() => {
    const triggerValue = searchParams.get('open')

    // Scenario A: URL query is completely empty, or explicitly set to 'all'
    if (!triggerValue || triggerValue === 'all') {
      setOpenSections({ observer: true, writer: true, final: true })
    }
    // Scenario B: A specific architectural key is sent across
    else if (triggerValue === 'observer' || triggerValue === 'writer' || triggerValue === 'final') {
      setOpenSections({
        observer: triggerValue === 'observer',
        writer: triggerValue === 'writer',
        final: triggerValue === 'final'
      })

      // Smooth scroll down to target section anchor path after layout completes calculation
      setTimeout(() => {
        document.getElementById(`${triggerValue}-archive-view`)?.scrollIntoView({ behavior: 'smooth' })
      }, 250)
    }
  }, [searchParams])

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  return (
    <main className="w-full min-h-screen bg-[#0b0416] text-[#F4F1EA] py-32 px-6 relative">
      <div className="container mx-auto max-w-4xl">

        {/* Back Navigation */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#F4F1EA]/60 hover:text-orange-500 transition-colors mb-12"
        >
          <ArrowLeftIcon className="w-4 h-4" /> Back to Home
        </Link>

        {/* Page Header */}
        <div className="mb-20">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-orange-500 block mb-3">
            The Complete Archives
          </span>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-4">
            Extended Gallery
          </h1>
          <p className="text-[#F4F1EA]/60 font-light max-w-xl">
            A comprehensive overview of my creative outputs. Click a card to see its full details.
          </p>
        </div>

        {/* --- PILLAR 1: THE OBSERVER --- */}
        <div id="observer-archive-view" className="border-b border-[#F4F1EA]/10 py-6 scroll-mt-24">
          <button onClick={() => toggleSection('observer')} className="w-full flex items-center justify-between text-left group py-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight group-hover:text-orange-500 transition-colors">The Observer</h2>
              <p className="text-xs text-[#F4F1EA]/40 mt-1 uppercase tracking-widest">Photography Portfolio</p>
            </div>
            <ChevronDownIcon className={`w-6 h-6 text-[#F4F1EA]/40 transition-transform duration-300 ${openSections.observer ? 'rotate-180 text-orange-500' : ''}`} />
          </button>

          {openSections.observer && (
            <div className="mt-8 space-y-8 pl-2 border-l border-orange-500/30">
              {observerProjects.map((proj, i) => (
                <div key={i} onClick={() => setActiveModalProject(proj)} className="bg-[#130a21]/50 rounded-xl border border-[#F4F1EA]/5 overflow-hidden flex flex-col md:flex-row gap-6 cursor-pointer hover:border-orange-500/30 transition-all duration-300 group">
                  <div className="relative w-full md:w-48 h-48 md:h-auto min-h-[192px] bg-[#1a102f] flex-shrink-0">
                    <Image src={proj.image} alt={proj.title} fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6 md:pl-0 flex flex-col justify-center flex-grow">
                    <div><span className="text-[10px] font-mono bg-orange-500/10 text-orange-400 px-2.5 py-1 rounded-full uppercase tracking-wider">{proj.category}</span></div>
                    <h3 className="text-xl font-bold mt-3 text-[#F4F1EA] group-hover:text-orange-500 transition-colors">{proj.title}</h3>
                    <p className="text-sm text-[#F4F1EA]/70 mt-2 font-light line-clamp-2">{proj.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* --- PILLAR 2: THE WRITER --- */}
        <div id="writer-archive-view" className="border-b border-[#F4F1EA]/10 py-6 scroll-mt-24">
          <button onClick={() => toggleSection('writer')} className="w-full flex items-center justify-between text-left group py-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight group-hover:text-orange-500 transition-colors">The Writer</h2>
            </div>
            <ChevronDownIcon className={`w-6 h-6 text-[#F4F1EA]/40 transition-transform duration-300 ${openSections.writer ? 'rotate-180 text-orange-500' : ''}`} />
          </button>

          {openSections.writer && (
            <div className="mt-8 space-y-6 pl-2 border-l border-orange-500/30">
              {writerProjects.map((proj, i) => (
                <div key={i} onClick={() => setActiveModalProject(proj)} className="bg-[#130a21]/50 rounded-xl border border-[#F4F1EA]/5 overflow-hidden flex flex-col md:flex-row gap-6 cursor-pointer hover:border-orange-500/30 transition-all duration-300 group">
                  <div className="relative w-full md:w-48 h-48 md:h-auto min-h-[192px] bg-[#1a102f] flex-shrink-0">
                    <Image src={proj.image} alt={proj.title} fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6 md:pl-0 flex flex-col justify-center flex-grow">
                    <h3 className="text-xl font-bold text-[#F4F1EA] group-hover:text-orange-500 transition-colors">{proj.title}</h3>
                    <p className="text-sm text-[#F4F1EA]/70 mt-2 font-light line-clamp-2">{proj.desc}</p>
                    <p className="text-xs text-[#F4F1EA]/40 mt-3"><strong className="text-[#F4F1EA]/60 font-medium">Role:</strong> {proj.roles}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* --- PILLAR 3: THE CHOSEN RECEPTACLE --- */}
        <div id="final-archive-view" className="border-b border-[#F4F1EA]/10 py-6 scroll-mt-24">
          <button onClick={() => toggleSection('final')} className="w-full flex items-center justify-between text-left group py-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight group-hover:text-orange-500 transition-colors">The Poet</h2>
              <p className="text-xs text-[#F4F1EA]/40 mt-1 uppercase tracking-widest">Poems &amp; Poems</p>
            </div>
            <ChevronDownIcon className={`w-6 h-6 text-[#F4F1EA]/40 transition-transform duration-300 ${openSections.final ? 'rotate-180 text-orange-500' : ''}`} />
          </button>

          {openSections.final && (
            <div className="mt-8 space-y-6 pl-2 border-l border-orange-500/30">
              {finalPillarProjects.map((proj, i) => (
                <div key={i} onClick={() => setActiveModalProject(proj)} className="bg-[#130a21]/50 rounded-xl border border-[#F4F1EA]/5 overflow-hidden flex flex-col md:flex-row gap-6 cursor-pointer hover:border-orange-500/30 transition-all duration-300 group">
                  <div className="relative w-full md:w-48 h-48 md:h-auto min-h-[192px] bg-[#1a102f] flex-shrink-0">
                    <Image src={proj.image} alt={proj.title} fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6 md:pl-0 flex flex-col justify-center flex-grow">
                    <div><span className="text-[10px] font-mono bg-purple-500/20 text-purple-300 px-2.5 py-1 rounded-full uppercase tracking-wider">{proj.category}</span></div>
                    <h3 className="text-xl font-bold mt-3 text-[#F4F1EA] group-hover:text-orange-500 transition-colors">{proj.title}</h3>
                    <p className="text-sm text-[#F4F1EA]/70 mt-2 font-light line-clamp-2">{proj.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* --- SIDE-BY-SIDE RESPONSIVE MODAL OVERLAY --- */}
      {activeModalProject && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 md:p-8 backdrop-blur-sm overflow-y-auto"
          onClick={() => setActiveModalProject(null)}
        >
          {/* --- Unified Full-Screen Media Modal --- */}
          <div
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 md:p-10 backdrop-blur-md"
            onClick={() => {
              setActiveModalProject(null);
              // Optional: Reset any scroll positions if you used the manual carousel buttons
            }}
          >
            {/* ❌ Large Global Close Button */}
            <button
              className="absolute top-6 right-6 text-[#F4F1EA]/60 hover:text-[#F4F1EA] transition-colors z-[60] bg-black/40 p-2.5 rounded-full border border-[#F4F1EA]/10 shadow-xl"
              onClick={() => setActiveModalProject(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* 🖼️ Full View Stage Container */}
            <div
              className="relative w-full max-w-5xl h-full max-h-[85vh] flex flex-col justify-center items-center gap-4"
              onClick={(e) => e.stopPropagation()}
            >

              {/* CASE 1: YouTube Videos */}
              {activeModalProject.youtubeId ? (
                <div className="w-full aspect-video rounded-xl overflow-hidden border border-[#F4F1EA]/10 shadow-2xl bg-black">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${activeModalProject.youtubeId}?rel=0&showinfo=0&autoplay=1`}
                    title={activeModalProject.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : activeModalProject.pitchDeck ? (
                /* CASE 2: Pitch Decks (Handles Landscape and Portrait layouts dynamically) */
                <div className={`relative w-full group/deck ${activeModalProject.isPortrait ? 'max-w-md mx-auto' : ''}`}>
                  <div
                    id="pitch-deck-scroll-track"
                    className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none scroll-smooth"
                  >
                    {activeModalProject.pitchDeck.map((slideUrl: string, idx: number) => (
                      <div
                        key={idx}
                        className={`relative bg-[#1a102f] rounded-xl overflow-hidden flex-shrink-0 border border-[#F4F1EA]/10 snap-center shadow-2xl w-full
                ${activeModalProject.isPortrait
                            ? 'h-[70vh] aspect-[2/3] md:aspect-[3/4]' // 📐 Clean tall portrait box
                            : 'aspect-[16/9]'                         // 📐 Standard landscape box
                          }`}
                      >
                        <Image
                          src={slideUrl}
                          alt={`Pitch Deck Slide ${idx + 1}`}
                          fill
                          className="object-contain"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Big Navigation Arrows (Adjusted placement slightly on portrait view for visibility) */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const track = document.getElementById('pitch-deck-scroll-track');
                      if (track) track.scrollLeft -= track.clientWidth;
                    }}
                    className={`absolute top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/80 border border-[#F4F1EA]/10 text-[#F4F1EA] hover:border-orange-500 hover:text-orange-400 transition-all duration-200 backdrop-blur-sm z-10 shadow-2xl
            ${activeModalProject.isPortrait ? '-left-6 md:-left-16' : 'left-4'}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const track = document.getElementById('pitch-deck-scroll-track');
                      if (track) track.scrollLeft += track.clientWidth;
                    }}
                    className={`absolute top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/80 border border-[#F4F1EA]/10 text-[#F4F1EA] hover:border-orange-500 hover:text-orange-400 transition-all duration-200 backdrop-blur-sm z-10 shadow-2xl
            ${activeModalProject.isPortrait ? '-right-6 md:-right-16' : 'right-4'}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                </div>
              ) : (

                /* CASE 3: Standard Portrait/Landscape Photos & Poem Sheets */
                <div className="relative w-full h-full">
                  <Image
                    src={activeModalProject.image}
                    alt={activeModalProject.title}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              )}

              {/* Minimalist Bottom Info Strip */}
              <div className="text-center mt-2">
                <h3 className="text-xl font-bold text-[#F4F1EA] tracking-tight">{activeModalProject.title}</h3>
                <p className="text-xs text-orange-400 font-mono tracking-wider uppercase mt-0.5">
                  {activeModalProject.category} {activeModalProject.roles ? `• ${activeModalProject.roles}` : ''}
                </p>
              </div>

            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default DetailedGallery
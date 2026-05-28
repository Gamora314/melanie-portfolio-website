"use client"
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRightIcon } from '@heroicons/react/24/outline'

const GalleryPreview = () => {
  const categories = [
    {
      title: "The Observer",
      subtitle: "Photography Portfolio",
      description: "Where every image tells a story. A collection of photographs that captures raw, unfiltered realities of our world.",
      image: "/images/Ngiting Walang Katumbas.jpg", 
      link: "/gallery?open=observer" // 💡 LINK UPDATED: Direct target
    },
    {
      title: "The Writer",
      subtitle: "Cinematic Scripts & Moving Pictures",
      description: "Screenplays, embedded screen-grabs, and video links diving deep into human narratives and structural storytelling.",
      image: "/images/Dinuguan.jpg", 
      link: "/gallery?open=writer" // 💡 LINK UPDATED: Direct target
    },
    {
      title: "The Poet",
      subtitle: "Poems",
      description: "The untold stories the explores love, life, memories, and everything in between that makes us human.",
      image: "/images/imetsomeone.jpg", 
      link: "/gallery?open=final" // 💡 LINK UPDATED: Matches 'final' key in gallery layout
    }
  ]

  return (
    <section id="galleryPreview" className="bg-[#0b0416] py-32 px-6 border-[#F4F1EA]/10">
      <div className="container mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-orange-500 block mb-3">Portfolio Highlights</span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#F4F1EA] tracking-tight">Selected Works</h2>
          </div>
          <Link 
            href="/gallery?open=all" // 💡 LINK UPDATED: Triggers all dropdowns to expand simultaneously
            className="inline-flex items-center gap-2 text-sm font-medium text-[#F4F1EA]/80 hover:text-[#F4F1EA] border-b border-[#F4F1EA]/30 pb-1 hover:border-[#F4F1EA] transition-all duration-300"
          >
            Explore Full Gallery <ArrowUpRightIcon className="w-4 h-4" />
          </Link>
        </div>

        {/* The Pillar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 min-h-[600px]">
          {categories.map((cat, index) => (
            <div 
              key={index} 
              className="group relative rounded-2xl overflow-hidden bg-[#130a21] border border-[#F4F1EA]/5 flex flex-col justify-end p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(11,4,22,0.7)]"
            >
              {/* Background Image with Dark Veil */}
              <div className="absolute inset-0 z-0 transition-transform duration-700 ease-out group-hover:scale-105">
                <Image 
                  src={cat.image} 
                  alt={cat.title} 
                  fill 
                  className="object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0416] via-[#0b0416]/70 to-transparent" />
              </div>

              {/* Text Layer content */}
              <div className="relative z-10 space-y-4">
                <div>
                  <span className="text-xs text-orange-400 font-mono uppercase tracking-wider">{cat.subtitle}</span>
                  <h3 className="text-2xl md:text-3xl font-black text-[#F4F1EA] tracking-tight mt-1">{cat.title}</h3>
                </div>
                
                <p className="text-sm text-[#F4F1EA]/70 leading-relaxed transform md:translate-y-4 md:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-in-out">
                  {cat.description}
                </p>

                <div className="pt-2">
                  <Link 
                    href={cat.link}
                    className="inline-flex items-center gap-2 bg-[#F4F1EA] text-[#0b0416] text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-full hover:bg-orange-500 hover:text-[#F4F1EA] transition-colors duration-300"
                  >
                    View Works →
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default GalleryPreview
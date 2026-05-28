"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLongRightIcon } from '@heroicons/react/24/outline'

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Array of your 3 best pictures
  const slides = [
    { id: 1, src: '/images/Ngiting Walang Katumbas.jpg', alt: 'Melanie photography piece 1' },
    { id: 2, src: '/images/Sisterly Love.jpg', alt: 'Melanie photography piece 2' },
    { id: 3, src: '/images/carousel-3.jpg', alt: 'Melanie photography piece 3' },
  ]

  // Auto-play mechanism: Switches every 5000ms (5 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer) // Cleanup timer on unmount
  }, [slides.length])

  return (
    <section id='home' className='relative w-full min-h-screen bg-[#0b0416] flex items-center overflow-hidden'>

      {/* 1. BACKGROUND CAROUSEL IMAGES */}
      <div className='absolute inset-0 w-full h-full z-0'>
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className='object-cover object-center'
              priority={index === 0} // Prioritize loading the first image
            />
          </div>
        ))}

        {/* Cinematic Vignette Overlay: Ensures typography is always perfectly legible */}
        <div className='absolute inset-0 bg-gradient-to-t from-[#0b0416] via-[#0b0416]/60 to-[#0b0416]/80' />
      </div>

      {/* 2. FOREGROUND CONTENT (Dynamic Grid for Mobile & Desktop Layouts) */}
      <div className='relative mx-auto px-6 py-32 z-10 w-full'>
        <div className='max-w-4xl mx-auto flex flex-col items-center text-center md:text-left md:items-start gap-6'>

          {/* Main Massive Typography Heading */}
          <div className='space-y-1 md:space-y-3'>
            <h1 className='text-6xl sm:text-7xl md:text-9xl font-black text-[#F4F1EA] tracking-tighter uppercase leading-none select-none'>
              Melanie
            </h1>
            <p className='text-sm sm:text-base md:text-xl font-medium tracking-[0.2em] uppercase text-orange-500'>
              Photographer &amp; Writer
            </p>
          </div>

          {/* Subheading text provided by you */}
          <p className='mt-4 text-sm sm:text-base md:text-lg text-[#F4F1EA]/80 font-light max-w-xl md:max-w-2xl leading-relaxed'>
            Dedicated to capturing realities and amplifying the voices of the voiceless through cinematic storytelling.
          </p>

          {/* Custom #F4F1EA Theme Button */}
          <div className='mt-6'>
            <Link
              href="/#aboutMe"
              onClick={(e) => {
                // If we are already on home, handle scrolling directly
                if (window.location.pathname === "/") {
                  e.preventDefault();
                  document.getElementById("aboutMe")?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className='flex items-center gap-3 bg-[#F4F1EA] hover:bg-[#e1ded7] transition-all duration-300 text-[#0b0416] px-6 py-3 sm:px-8 sm:py-4 rounded-full shadow-xl group font-semibold text-base sm:text-lg'
            >
              About Me
              <ArrowLongRightIcon className='w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5' />
            </Link>
          </div>
        </div>
      </div>

      {/* 3. DYNAMIC INTERACTIVE NAVIGATION DOTS */}
      <div className='absolute bottom-10 left-0 right-0 z-20 flex justify-center gap-3'>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2 rounded-full transition-all duration-500 ${index === currentSlide
              ? 'w-8 bg-[#F4F1EA]'
              : 'w-2 bg-[#F4F1EA]/30 hover:bg-[#F4F1EA]/60'
              }`}
          />
        ))}
      </div>

    </section>
  )
}

export default HeroSection
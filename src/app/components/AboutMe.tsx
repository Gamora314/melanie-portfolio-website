import React from 'react'
import Image from 'next/image'
import { ArrowUpRightIcon } from '@heroicons/react/24/outline'

const AboutSection = () => {
    return (
        <section id="aboutMe" className="w-full min-h-screen bg-[#0b0416] text-[#F4F1EA] py-24 px-6 md:px-12 flex items-center border-[#F4F1EA]/5">
            <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

                {/* LEFT COLUMN: Visual Portrait (Spans 5 cols on large screens) */}
                <div className="lg:col-span-5 w-full flex justify-center">
                    <div className="relative w-full max-w-sm aspect-[3/4] rounded-2xl overflow-hidden border border-[#F4F1EA]/10 shadow-2xl group bg-[#130a21]">
                        {/* Ambient Background Glow behind the portrait */}
                        <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 via-transparent to-transparent opacity-50 z-10 pointer-events-none" />

                        <Image
                            src="/images/Portrait Manifesto.png" // Replace with your actual portrait filename
                            alt="Your Portrait"
                            fill
                            className="object-cover group-hover:scale-[1.03] transition-all duration-700 ease-out"
                            priority
                        />
                    </div>
                </div>

                {/* RIGHT COLUMN: Manifesto, Biography & Identity (Spans 7 cols on large screens) */}
                <div className="lg:col-span-7 space-y-10">
                    <div>
                        <span className="text-xs font-mono tracking-[0.2em] uppercase text-orange-500 block mb-3">
                            Identity &amp; Intent
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#F4F1EA]">
                            Artist Manifesto
                        </h2>
                    </div>

                    {/* THE MANIFESTO: Large, editorial typography */}
                    <div className="space-y-6 text-lg md:text-xl font-light text-[#F4F1EA]/90 leading-relaxed border-l-2 border-orange-500/40 pl-6 md:pl-8">

                        {/* Part 1: The Observation */}
                        <p className="text-base md:text-lg text-[#F4F1EA]/80 font-light leading-loose">
                            A pen and a paper on its own can not form words;<br />
                            Ideas without sense are just wasted ink;<br />
                            And execution without impact is just noise.
                        </p>

                        {/* Part 2: The Directives */}
                        <p className="text-base md:text-lg text-[#F4F1EA]/60 font-light leading-loose italic">
                            Find your purpose.<br />
                            Challenge what needs to be challenge.<br />
                            Be the voice of the voiceless.<br />
                            Be firm with your principles.
                        </p>

                    </div>

                    <hr className="border-[#F4F1EA]/10 w-full" />

                    {/* PERSONAL INTRODUCTION: Combined narrative paragraphs */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-mono uppercase text-orange-400/80 tracking-wider">Background</h3>
                        <p className="text-sm md:text-base text-[#F4F1EA]/80 font-light leading-relaxed">
                            Hi, I'm Melanie, a documentary photographer and a writer. I'm detail-oriented, organized, and thrive in collaborative environments. I highly versatile on set, with hands-on experience spanning the entire production pipeline — from pre-production straight through to post-production.
                        </p>
                        <p className="text-sm md:text-base text-[#F4F1EA]/80 font-light leading-relaxed">
                            I specialized in emotionally-driven narratives and documentation, I am dedicated to translating scripts into compelling visual stories that capture realities and amplify the voices of the voiceless.
                        </p>
                    </div>

                    {/* Quick Context Tags */}
                    <div className="pt-2">
                        <p className="text-[10px] uppercase text-[#F4F1EA]/40 tracking-wider font-semibold mb-3">Specialization</p>
                        <div className="flex flex-wrap gap-2">
                            {['Documentary Photography', 'Cinematic Writing', 'Social Realism', 'Emotionally-Driven Narratives'].map((tag, idx) => (
                                <span key={idx} className="text-xs font-mono bg-[#130a21] border border-[#F4F1EA]/10 text-[#F4F1EA]/80 px-3 py-1 rounded-md">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                </div>

            </div>
        </section>
    )
}

export default AboutSection
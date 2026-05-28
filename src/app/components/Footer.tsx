"use client"
import { ArrowUpIcon, EnvelopeIcon } from '@heroicons/react/24/outline'
import { FaLinkedinIn, FaInstagram, FaFacebookF } from 'react-icons/fa'
import Image from 'next/image' // 💡 ADD THIS LINE AT THE TOP

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer id="contact" className="w-full bg-[#07020e] text-[#F4F1EA] border-t border-[#F4F1EA]/10 relative overflow-hidden">

      {/* Subtle Background Glow to separate it from the content above */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-[#F4F1EA]/5">

          {/* LEFT BLOCK: Big Editorial Text & Signature (Spans 6 columns) */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-6">
              <span className="text-xs font-mono tracking-[0.2em] uppercase text-orange-500 block">
                Get In Touch
              </span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight max-w-md leading-tight">
                Let's create something with a purpose.
              </h2>
              <p className="text-sm md:text-base text-[#F4F1EA]/60 font-light max-w-sm">
                Available for documentation photography, screenwriting collaborations, and other multimedia collaborative projects.
              </p>
            </div>


            {/* ✍️ YOUR SIGNATURE IMAGE */}
            <div className="pt-2 select-none pointer-events-none">
              <Image
                src="/images/More Revised Personal Brand Logo.png" // Make sure the filename matches exactly
                alt="Melanie Casabar Signature"
                width={180}
                height={60}
                className="invert opacity-90 transition-opacity duration-300" // 💡 'invert' changes the black ink to white!
              />
            </div>
          </div>


          {/* RIGHT BLOCK: Direct Contact & Social Links (Spans 6 columns) */}
          <div className="lg:col-span-6 flex flex-col md:flex-row md:justify-between gap-10 lg:pl-12">

            {/* Direct Channels Column (Email + Phone) */}
            <div className="space-y-6">
              <p className="text-[10px] uppercase text-[#F4F1EA]/40 tracking-widest font-mono">Direct Channel</p>

              <div className="flex flex-col gap-4">
                {/* Email Link */}
                <a
                  href="mailto:melaniecasabar314@gmail.com"
                  className="inline-flex items-center gap-2.5 text-base md:text-lg font-medium hover:text-orange-400 transition-colors duration-300 group"
                >
                  <EnvelopeIcon className="w-5 h-5 text-orange-500/70 group-hover:text-orange-400 transition-colors" />
                  melaniecasabar314@gmail.com
                </a>

                {/* 📞 Phone Number Link */}
                <a
                  href="tel:+639123456789" // 💡 Replace with your actual phone number (use your country code, e.g., +63 for PH)
                  className="inline-flex items-center gap-2.5 text-base md:text-lg font-medium hover:text-orange-400 transition-colors duration-300 group"
                >
                  {/* Simple phone SVG icon matching the style of the Envelope icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-orange-500/70 group-hover:text-orange-400 transition-colors">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.387a20.373 20.373 0 0 1-7.147-7.147c-.155-.441.011-.927.387-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                  </svg>
                  +63 912 345 6789 {/* 💡 Change to your actual display number */}
                </a>
              </div>
            </div>

            {/* Social Links Grid Column */}
            <div className="space-y-4">
              <p className="text-[10px] uppercase text-[#F4F1EA]/40 tracking-widest font-mono">Digital Archives</p>
              <div className="grid grid-cols-2 gap-x-8 gap-y-3 font-medium text-sm md:text-base">

                <a href="http://www.linkedin.com/in/melanie-casabar-376855270" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-[#F4F1EA]/70 hover:text-orange-400 transition-colors group">
                  <span className="p-1.5 rounded-md bg-[#130a21] border border-[#F4F1EA]/5 group-hover:border-orange-500/30"><FaLinkedinIn className="w-3.5 h-3.5" /></span>
                  LinkedIn
                </a>

                <a href="https://www.instagram.com/pixel___motion?igsh=czlrNG05NWVqam1q" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-[#F4F1EA]/70 hover:text-orange-400 transition-colors group">
                  <span className="p-1.5 rounded-md bg-[#130a21] border border-[#F4F1EA]/5 group-hover:border-orange-500/30"><FaInstagram className="w-3.5 h-3.5" /></span>
                  Instagram
                </a>

                <a href="https://www.facebook.com/pixelmotionbymel" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-[#F4F1EA]/70 hover:text-orange-400 transition-colors group">
                  <span className="p-1.5 rounded-md bg-[#130a21] border border-[#F4F1EA]/5 group-hover:border-orange-500/30"><FaFacebookF className="w-3.5 h-3.5" /></span>
                  Facebook Page
                </a>

              </div>
            </div>

          </div>
        </div>

        {/* BOTTOM UTILITY BAR: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#F4F1EA]/40">
          <p>© {new Date().getFullYear()} Melanie Casabar. All rights reserved.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-orange-400 transition-colors group bg-[#130a21]/50 border border-[#F4F1EA]/5 px-3 py-1.5 rounded-lg hover:border-orange-500/20"
          >
            Back to top
            <ArrowUpIcon className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>

      </div>
    </footer>
  )
}

export default Footer
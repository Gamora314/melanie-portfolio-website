"use client"
import Link from "next/link";
import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"; 
import { GiHamburgerMenu } from "react-icons/gi";

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    
    const pathname = usePathname();
    const router = useRouter();
    const isHome = pathname === "/";

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 8)
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [])

    // 💡 FORCE SCROLL FUNCTION: This stops Next.js from ignoring your clicks
    const handleScrollClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        if (isHome) {
            e.preventDefault(); // Stop normal Next.js link routing
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
            setIsOpen(false); // Close mobile menu if open
        }
        // If not on home (e.g., on /gallery), let it do the normal navigation back home
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${isScrolled || isOpen
                ? 'bg-[#0b0416]/70 backdrop-blur-md shadow-[0_0_40px_rgba(113,39,186,0.20)]'
                : 'bg-transparent'
                }`}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
                <Link href="/" className="text-3xl font-extrabold text-[#F4F1EA]">Melanie Casabar</Link>

                {/* DESKTOP NAV */}
                <nav className="hidden md:flex space-x-10 font-medium text-lg text-[#F4F1EA]/80">
                    <Link href="/#home" onClick={(e) => handleScrollClick(e, "home")} className="hover:text-[#736F6E] transition duration-200">Home</Link>
                    <Link href="/gallery" className="hover:text-[#736F6E] transition duration-200">Gallery</Link>
                    <Link href="/#aboutMe" onClick={(e) => handleScrollClick(e, "aboutMe")} className="hover:text-[#736F6E] transition duration-200">About Me</Link>
                    <Link href="/#contact" onClick={(e) => handleScrollClick(e, "contact")} className="hover:text-[#736F6E] transition duration-200">Contact</Link>
                </nav>

                <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 rounded text-[#F4F1EA]/80 hover:text-[#736F6E] transition duration-200">
                    <GiHamburgerMenu className="size-6" />
                </button>
            </div>

            {/* MOBILE NAV */}
            {
                isOpen && (
                    <div className="md:hidden px-6 pb-4">
                        <div className="flex flex-col gap-3 text-base font-medium text-[#F4F1EA]/80">
                            <Link href="/#home" onClick={(e) => handleScrollClick(e, "home")} className="hover:text-[#736F6E] transition duration-200">Home</Link>
                            <Link href="/gallery?open=all" className="hover:text-[#736F6E] transition duration-200" onClick={() => setIsOpen(false)}>Gallery</Link>
                            <Link href="/#aboutMe" onClick={(e) => handleScrollClick(e, "aboutMe")} className="hover:text-[#736F6E] transition duration-200">About Me</Link>
                            <Link href="/#contact" onClick={(e) => handleScrollClick(e, "contact")} className="hover:text-[#736F6E] transition duration-200">Contact</Link>
                        </div>
                    </div>
                )
            }
        </header>
    )
}

export default Header
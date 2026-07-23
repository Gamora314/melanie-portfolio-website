"use client"
import Link from "next/link";
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiHome } from "react-icons/fi"; // 🟢 Added clean home icon

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const pathname = usePathname();
    const isHome = pathname === "/";

    useEffect(() => {
        const handleScroll = () => {
            // Calculates exactly when the 450vh hero track has finished scrolling
            const heroTrackHeight = window.innerHeight * 4.5;

            if (window.scrollY > heroTrackHeight) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // 💡 FORCE SCROLL FUNCTION: Handles anchor targeting smoothly
    const handleScrollClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();

        // Close the mobile menu overlay if it's open
        if (typeof setIsOpen === "function") setIsOpen(false);

        if (id === "top") {
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }

        // ⚡ THE SCROLL OFFSET HANDLING FOR ANIMATED SECTIONS
        if (id === "aboutMe" || id === "contact") {
            const element = document.getElementById("aboutMe"); // Both links target the parent container
            if (element) {
                const elementTop = element.getBoundingClientRect().top + window.scrollY;

                // Calculate offset based on target: About lands at 450px, Contact lands at 1100px down the timeline
                const targetOffset = id === "aboutMe" ? elementTop + 400 : elementTop + 1100;

                window.scrollTo({
                    top: targetOffset,
                    behavior: "smooth"
                });
            }
        } else {
            // Standard fallback scroll for any other structural elements
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${isScrolled || isOpen
                ? 'bg-[#0b0416]/70 backdrop-blur-md shadow-[0_0_40px_rgba(113,39,186,0.20)]'
                : 'bg-transparent'
                }`}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">

                {/* 🏠 HOME ICON NAVIGATION BUTTON */}
                <Link
                    href="/"
                    onClick={(e) => handleScrollClick(e, "top")}
                    className="inline-block text-[#F4F1EA]/80 hover:text-white transition-colors duration-300"
                >
                    <FiHome className="size-6" />
                </Link>

                {/* DESKTOP NAV */}
                <nav className="hidden md:flex space-x-10 font-medium text-lg text-[#F4F1EA]/80">
                    {/* 🟢 Updated to slide down to individual works */}
                    <Link href="/#individual" onClick={(e) => handleScrollClick(e, "individual")} className="hover:text-[#736F6E] transition duration-200">WORKS</Link>
                    <Link href="/#aboutMe" onClick={(e) => handleScrollClick(e, "aboutMe")} className="hover:text-[#736F6E] transition duration-200">ABOUT</Link>
                    <Link href="/#contact" onClick={(e) => handleScrollClick(e, "contact")} className="hover:text-[#736F6E] transition duration-200">CONTACT</Link>
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
                            {/* 🟢 Updated mobile interaction link */}
                            <Link href="/#individual" onClick={(e) => handleScrollClick(e, "individual")} className="hover:text-[#736F6E] transition duration-200">WORKS</Link>
                            <Link href="/#aboutMe" onClick={(e) => handleScrollClick(e, "aboutMe")} className="hover:text-[#736F6E] transition duration-200">ABOUT</Link>
                            <Link href="/#contact" onClick={(e) => handleScrollClick(e, "contact")} className="hover:text-[#736F6E] transition duration-200">CONTACT</Link>
                        </div>
                    </div>
                )
            }
        </header>
    )
}

export default Header;
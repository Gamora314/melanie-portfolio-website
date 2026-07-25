"use client"

import HeroSection from "./components/HeroSection";
import AboutMe from "./components/AboutMe";
import Individual from "./components/Individual";
import Collaborative from "./components/Collaborative";
import SeaDivider from "./components/SeaDivider";

const Home = () => {
  
  return (
    <>
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
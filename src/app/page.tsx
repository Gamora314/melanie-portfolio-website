import GalleryPreview from "./components/GalleryPreview";
import HeroSection from "./components/HeroSection";
import AboutMe from "./components/AboutMe";

const Home = () => {
  return (
    <>
    <main>
      <HeroSection/>
      <GalleryPreview/>
      <AboutMe/>
    </main>
    </>
  );
};

export default Home
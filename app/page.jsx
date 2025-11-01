import Image from "next/image";
import ShowcaseSection from "./(home)/ShowcaseSection";
import HeroSection from "./(home)/HeroSection";
import FeaturedSection from "./(home)/FeaturedSection";
import Idea_and_tools_section from "./(home)/Idea_and_tools_section";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      <HeroSection />
      <ShowcaseSection />
      <FeaturedSection />
      <Idea_and_tools_section />
    </div>
  );
}

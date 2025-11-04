import Image from "next/image";
import ShowcaseSection from "./(home)/ShowcaseSection";
import HeroSection from "./(home)/HeroSection";
import FeaturedSection from "./(home)/FeaturedSection";
import Idea_and_tools_section from "./(home)/Idea_and_tools_section";
import WorkingProcedure from "./(home)/WorkingProcedure";
import CategoriesSection from './(home)/CategoriesSection';
import CatalogSection from "./(home)/CatalogSection";
import WorkingSteps from "./(home)/WorkingSteps";
import TrustedCompaniesSection from "./(home)/TrustedCompanies";
import FaqSection from "./(home)/FaqSection";
import BlogSection from "./(home)/BlogSection";
import AddBanner2 from "./(home)/AddBanner2";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      <HeroSection />
      <ShowcaseSection />
      <FeaturedSection />
      <Idea_and_tools_section />
      <WorkingProcedure />
      <CategoriesSection />
      <CatalogSection/>
      <WorkingSteps/>
      <TrustedCompaniesSection/>
      <FaqSection/>
      <BlogSection/>
      <AddBanner2/>
    </div>
  );
}

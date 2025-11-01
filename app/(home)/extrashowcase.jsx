import one from "@/public/top-banner-1.jpg";
import two from "@/public/top-banner-2.jpg";
import three from "@/public/top-banner-3.jpg";
import four from "@/public/top-banner-4.jpg";
import five from "@/public/top-banner-5.jpg";
import six from "@/public/top-banner-6.jpg";
import seven from "@/public/top-banner-7.jpg";
import eight from "@/public/top-banner-8.jpg";
import nine from "@/public/top-banner-9.jpg";
import Image from "next/image";

export default function ShowcaseSection() {
  return (
    <div className="min-h-screen py-8 bg-gradient-to-l from-white to-[#f5e3e3]">
      {/* Full width container */}
      <div className="w-full overflow-hidden">
        {/* Desktop: Grid with 7 columns - col-4 is larger */}
        <div className="hidden lg:grid grid-cols-[1fr_1fr_1fr_1.7fr_1fr_1fr_1fr] min-w-[1200px] w-full gap-[15px] h-96">
          
          {/* Column 1: Single Card */}
          <div className="flex flex-col rounded-3xl my-25 overflow-hidden">
            <div className="w-full h-full relative">
              <Image 
                src={one} 
                alt="one"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* Column 2: Large Image */}
          <div className="flex flex-col rounded-3xl my-10 overflow-hidden">
            <div className="w-full h-full relative">
              <Image 
                src={two} 
                alt="two"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Column 3: Two Cards */}
          <div className="flex flex-col gap-[15px] overflow-hidden">
            {/* Top Card */}
            <div className="flex-1 w-full relative rounded-3xl overflow-hidden">
              <Image 
                src={three} 
                alt="three"
                fill
                className="object-cover"
              />
            </div>
            {/* Bottom Card */}
            <div className="flex-1 w-full relative rounded-3xl overflow-hidden">
              <Image 
                src={four} 
                alt="four"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Column 4: Single Card - LARGER COLUMN */}
          <div className="flex flex-col overflow-hidden">
            <div className="w-full h-full relative rounded-3xl overflow-hidden">
              <Image 
                src={five} 
                alt="five"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Column 5: Two Cards */}
          <div className="flex flex-col gap-[15px] overflow-hidden">
            {/* Top Card */}
            <div className="flex-1 w-full relative rounded-3xl overflow-hidden">
              <Image 
                src={six} 
                alt="six"
                fill
                className="object-cover"
              />
            </div>
            {/* Bottom Card */}
            <div className="flex-1 w-full relative rounded-3xl overflow-hidden">
              <Image 
                src={seven} 
                alt="seven"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Column 6: Large Card */}
          <div className="flex flex-col rounded-3xl my-10 overflow-hidden">
            <div className="w-full h-full relative">
              <Image 
                src={eight} 
                alt="eight"
                fill
                className="object-cover w-100"
              />
            </div>
          </div>

          {/* Column 7: Single Card */}
          <div className="flex flex-col rounded-3xl my-25 overflow-hidden">
            <div className="w-full h-full relative">
              <Image 
                src={nine} 
                alt="nine"
                fill
                className="object-cover"
              />
            </div>
          </div>

        </div>

        {/* Mobile: Grid with 3 columns - middle column larger */}
        <div className="lg:hidden grid grid-cols-[1fr_2fr_1fr] w-full gap-2 px-2 h-80">
          
          {/* Column 3: Two Cards (Mobile) */}
          <div className="flex flex-col gap-4">
            {/* Top Card */}
            <div className="flex-1 w-full relative rounded-2xl overflow-hidden">
              <Image 
                src={three} 
                alt="three"
                fill
                className="object-cover"
              />
            </div>
            {/* Bottom Card */}
            <div className="flex-1 w-full relative rounded-2xl overflow-hidden">
              <Image 
                src={four} 
                alt="four"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Column 4: Single Card (Mobile) - LARGER COLUMN */}
          <div className="flex flex-col">
            <div className="w-full h-full relative rounded-2xl overflow-hidden">
              <Image 
                src={five} 
                alt="five"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Column 5: Two Cards (Mobile) */}
          <div className="flex flex-col gap-4">
            {/* Top Card */}
            <div className="flex-1 w-full relative rounded-2xl overflow-hidden">
              <Image 
                src={six} 
                alt="six"
                fill
                className="object-cover"
              />
            </div>
            {/* Bottom Card */}
            <div className="flex-1 w-full relative rounded-2xl overflow-hidden">
              <Image 
                src={seven} 
                alt="seven"
                fill
                className="object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
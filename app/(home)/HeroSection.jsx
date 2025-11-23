import { Search } from "lucide-react";
import arrow from "@/public/arrow.png";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="w-full py-15 flex items-center justify-center ">
      <div className="text-center px-4">
        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
          T–shirt Printing for Everyone
        </h1>

        <p className="text-gray-500 text-lg md:text-xl mb-10">
          Print shirts for yourself or your online business
        </p>

        {/* Search Bar */}
        <div className="all-input-sec relative">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-10">
            <div className="flex items-center w-full md:w-[600px] bg-white border border-gray-200 rounded-xl shadow-sm px-4">
              <input
                type="text"
                placeholder="What are you looking for?"
                className="w-full px-4 rounded-xl py-3 outline-none text-gray-700 placeholder-gray-400"
              />
              <span className="text-gray-500 text-lg cursor-pointer">
                <Search className="w-5 h-5" />
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-center gap-4 mt-14">
            <Link href={'/design/custom_design'} className="bg-red-500 hover:bg-red-600 text-white font-medium px-8 py-3 rounded-xl transition">
              Get Started
            </Link>
            <Link href={'/join-as-partner'} className="border border-gray-300 hover:border-gray-400 text-gray-700 font-medium px-8 py-3 rounded-xl transition">
              Join as Partner
            </Link>
          </div>

          {/* Arrow Image */}
          <div className="absolute left-[170px] top-[75px] hidden md:block">
            <Image src={arrow} alt="arrow" width={60} height={80} />
          </div>
        </div>
      </div>
    </section>
  );
}

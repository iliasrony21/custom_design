import Image from "next/image";
import one from "../../public/one.png";
import two from "../../public/two.png";
import three from "../../public/three.png";
import four from "../../public/four.png";
import five from "../../public/five.png";
import six from "../../public/six.png";
import seven from "../../public/seven.png";
import middle from "../../public/middle.png";
import companybg from "../../public/companybg.png";

export default function TrustedCompaniesSection() {
  return (
    <section className="relative container mx-auto flex flex-col md:flex-row items-center justify-between px-4 md:px-20 py-12 md:py-20 overflow-hidden">
      {/* Left Content - Mobile Optimized */}
      <div className="max-w-xl space-y-4 md:space-y-6 z-10 text-center md:text-left w-full">
        <div className="flex justify-center md:justify-start items-center space-x-2">
          <span className="bg-purple-100 text-purple-700 font-semibold px-3 py-1 rounded-full text-xs md:text-sm">
            Rated 4.9 of 5
          </span>
          <div className="flex text-yellow-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 md:w-5 md:h-5"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.974c.3.921-.755 1.688-1.54 1.118l-3.386-2.46a1 1 0 00-1.175 0l-3.386 2.46c-.784.57-1.838-.197-1.539-1.118l1.287-3.974a1 1 0 00-.364-1.118L2.045 9.401c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.974z" />
              </svg>
            ))}
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
          Join the 10,000+ <br className="hidden sm:block" /> companies trusting us
        </h2>

        <p className="text-gray-500 leading-relaxed text-sm md:text-base lg:text-lg">
          T-shirt Printing for Everyone. Get a headstart with free design
          templates you can customize in a few clicks. Lorem ipsum det, consec
          tetur duis nec fringilla det, consec...
        </p>

        <button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-lg text-sm md:text-base w-full md:w-auto">
          Get Started
        </button>
      </div>

      {/* Right Logos Section - Mobile Optimized */}
      <div className="relative mt-12 md:mt-0 md:ml-20 w-full md:w-[50%] flex justify-center items-center">
        {/* Background Image */}
        <div className="relative w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[650px] lg:h-[650px] flex items-center justify-center">
          <Image
            src={companybg}
            alt="Company Background"
            fill
            className="object-contain"
            priority
          />

          {/* Center (Middle Logo) */}
          <div className="absolute w-16 h-16 sm:w-24 sm:h-24 md:w-40 md:h-40 2xl:w-50 2xl:h-50 bg-white rounded-xl md:rounded-2xl shadow-md flex items-center justify-center">
            <Image src={middle} alt="Middle Logo" className="object-contain rounded-xl md:rounded-2xl" fill />
          </div>

          {/* Outer Logos - Mobile Optimized */}
          <div className="absolute w-full h-full flex items-center justify-center">
            {/* Top */}
            <div className="absolute top-[-8%] md:top-[-5%]">
              <div className="bg-white rounded-lg md:rounded-xl shadow-md">
                <Image src={one} alt="Logo 1" width={80} height={80} className="rounded-lg md:rounded-2xl w-12 h-12 md:w-32 md:h-32" />
              </div>
            </div>

            {/* Bottom */}
            <div className="absolute bottom-[-5%] md:bottom-[0%]">
              <div className="bg-white rounded-lg md:rounded-xl shadow-md">
                <Image src={two} alt="Logo 2" width={80} height={80} className="rounded-lg md:rounded-2xl w-14 h-14 md:w-32 md:h-32" />
              </div>
            </div>

            {/* Left */}
            <div className="absolute left-[-12%] md:left-[-10%]">
              <div className="bg-white rounded-lg md:rounded-xl shadow-md p-1 md:p-2 lg:p-3 xl:p-4">
                <Image src={three} alt="Logo 3" width={70} height={70} className="rounded-lg md:rounded-2xl w-12 h-12 md:w-28 md:h-28" />
              </div>
            </div>

            {/* Right */}
            <div className="absolute right-[-12%] md:right-[-10%]">
              <div className="bg-white rounded-lg md:rounded-xl shadow-md p-1 md:p-2 lg:p-3 xl:p-4">
                <Image src={four} alt="Logo 4" width={80} height={80} className="rounded-lg md:rounded-2xl w-12 h-12 md:w-32 md:h-32" />
              </div>
            </div>

            {/* Top-left */}
            <div className="absolute top-[8%] left-[2%] md:top-[5%] md:left-[0%]">
              <div className="bg-white rounded-lg md:rounded-xl shadow-md p-1 md:p-2 lg:p-3 xl:p-4">
                <Image src={five} alt="Logo 5" width={80} height={80} className="rounded-lg md:rounded-2xl w-12 h-12 md:w-32 md:h-32" />
              </div>
            </div>

            {/* Top-right */}
            <div className="absolute top-[8%] right-[2%] md:top-[5%] md:right-[0%]">
              <div className="bg-white rounded-lg md:rounded-xl shadow-md p-1 md:p-2 lg:p-3 xl:p-4">
                <Image src={six} alt="Logo 6" width={70} height={80} className="rounded-lg md:rounded-2xl w-12 h-12 md:w-28 md:h-32" />
              </div>
            </div>

            {/* Bottom-right */}
            <div className="absolute bottom-[12%] right-[8%] md:bottom-[10%] md:right-[5%]">
              <div className="bg-white rounded-lg md:rounded-xl shadow-md p-1 md:p-2 lg:p-3 xl:p-4">
                <Image src={seven} alt="Logo 7" width={70} height={70} className="rounded-lg md:rounded-2xl w-10 h-10 md:w-28 md:h-28" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
import Image from "next/image";
import idea_banner from "../../public/idea_banner.png";
import Link from "next/link";

export default function Idea_and_tools_section() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 md:gap-12 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-36 py-12 md:py-16 lg:py-20">
      
      {/* Image Section - Fixed */}
      <div className="flex justify-center lg:justify-start order-2 lg:order-1 w-full">
        <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl aspect-[4/3] md:aspect-[3/2] lg:aspect-[4/3]">
          <Image
            src={idea_banner}
            alt="idea banner"
            fill
            className="rounded-2xl object-cover w-full h-full"
            sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 40vw"
            priority
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col justify-center space-y-4 md:space-y-6 order-1 lg:order-2 w-full">
        <Link
          href="/"
          className="inline-block bg-red-100 text-red-600 px-4 py-2 rounded-3xl text-sm font-medium w-fit hover:bg-red-200 transition-colors duration-200"
        >
          Design Your Own
        </Link>

        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl font-bold text-gray-900 leading-tight md:leading-snug">
          You've got the ideas, we've got the tools
        </h2>

        <p className="text-gray-600 text-base sm:text-lg md:text-xl lg:text-lg xl:text-xl leading-relaxed">
          T-shirt Printing for Everyone. Get a headstart with free design
          templates you can customize in a few clicks.
        </p>

        {/* Feature List */}
        <ul className="space-y-3 md:space-y-4">
          {[
            "Top quality prints using the latest technology",
            "Mix and match colors, sizes, and designs",
            "Fast and free standard shipping",
            "Customer happiness guarantee",
          ].map((text, i) => (
            <li key={i} className="flex items-start gap-3">
              {/* Circle Tick Icon */}
              <span className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 min-w-6 sm:min-w-7 md:min-w-8 rounded-full bg-red-100 text-red-600 font-bold text-sm sm:text-base md:text-lg flex-shrink-0">
                ✓
              </span>
              <Link 
                href="/" 
                className="text-gray-700 hover:text-red-600 transition-colors duration-200 text-sm sm:text-base md:text-lg leading-relaxed"
              >
                {text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
import Link from "next/link";
import Image from "next/image";

import working_banner1 from "../../public/working_banner1.jpg";
import working_banner2 from "../../public/working_banner2.jpg";
import working_banner3 from "../../public/working_banner3.png";

export default function WorkingProcedure() {
  const steps = [
    {
      id: 1,
      title: "Pick a product",
      text: "Choose from our collection and get started customizing your tee.",
      img: working_banner1,
    },
    {
      id: 2,
      title: "Custom artwork & review",
      text: "Upload or create your design and preview before printing.",
      img: working_banner2,
    },
    {
      id: 3,
      title: "Ship it for you",
      text: "We print, pack & deliver your customized shirts to your doorstep.",
      img: working_banner3,
    },
  ];

  return (
    <section className="w-full py-16 bg-gray-50 px-4 md:px-0">
      {/* Header */}
      <div className="text-center mb-16">
        <Link
          href="/"
          className="inline-block bg-pink-50 text-pink-700 text-lg font-medium rounded-full px-7 py-3  hover:scale-105 transition duration-300 shadow-sm"
        >
          How it works
        </Link>
        <h2 className="text-4xl md:text-5xl font-bold mt-8 mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          T-shirt printing made easy.
        </h2>
        <p className="text-gray-600 text-xl max-w-2xl mx-auto">
          Three simple steps to create your perfect custom t-shirt
        </p>
      </div>

      {/* Steps */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto container">
  {steps.map((step) => (
    <div key={step.id} className="group cursor-pointer">
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-3xl transition-all duration-500 group-hover:-translate-y-4 h-full border border-gray-100">
        
        {/* ✅ Padding between card & image */}
        <div className="p-4">
          <div className="relative w-full h-80 overflow-hidden rounded-2xl">
            <Image
              src={step.img}
              alt={step.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
              className="object-cover transition duration-500 group-hover:scale-110"
              placeholder="blur"
            />
          </div>
        </div>

        {/* Text */}
        <div className="p-8 pt-2">
          <div className="flex items-center justify-between mb-4">
            <span className="inline-block bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg">
              Step {String(step.id).padStart(2, "0")}
            </span>
            <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center group-hover:scale-110 transition duration-300">
              <svg
                className="w-4 h-4 text-pink-600 group-hover:translate-x-1 transition duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-gray-900 transition duration-300">
            {step.title}
          </h3>
          <p className="text-gray-600 text-lg leading-relaxed group-hover:text-gray-700 transition duration-300">
            {step.text}
          </p>
        </div>

      </div>
    </div>
  ))}
</div>


      
    </section>
  );
}

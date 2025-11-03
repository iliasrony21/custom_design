import Link from "next/link";

export default function CatalogCard({ 
  title, 
  description, 
  svg, 
  href, 
  bgColor = "bg-gray-50", 
  textColor = "text-gray-600" 
}) {
  return (
    <Link
      href={href}
      className="
        group relative block overflow-hidden rounded-2xl
        transition-all duration-500 ease-out
        hover:-translate-y-5 hover:shadow-xl cursor-pointer
     
        hover:bg-red-500
      "
    >
      {/* Card Content */}
      <div className="p-6">
        {/* Icon Container */}
        <div className="flex justify-center items-center mx-auto relative w-16 h-16 rounded-xl p-3 mb-4 transition-colors duration-300 group-hover:scale-110 ">
          <div className="group-hover:text-white">
            {svg}
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-2">
          <h3 className="text-xl text-center font-semibold text-gray-900 group-hover:text-white transition-colors">
            {title}
          </h3>
          <p className="text-sm text-gray-600 group-hover:text-white/90 leading-relaxed transition-colors">
            {description}
          </p>
        </div>

        {/* Hover Arrow */}
        <div className="mt-4 flex items-center justify-center text-sm font-medium text-gray-500 group-hover:text-white transition-colors">
          Explore collection
          <svg 
            className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      {/* Hover Border Effect */}
      {/* <div className="absolute bottom-0 left-0 w-full h-1 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div> */}
    </Link>
  );
}
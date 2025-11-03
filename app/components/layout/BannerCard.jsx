import { FaArrowRight } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";


export default function BannerCard({ title, imgSrc, href }) {
  return (
    <Link
      href={href}
      className="
        group relative block overflow-hidden rounded-xl
        transition-all duration-500 ease-out
        hover:-translate-y-5 hover:shadow-2xl
      "
    >
      {/* Image */}
      <div className="relative w-full h-120 md:h-120">
        <Image
          src={imgSrc}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Overlay with Title + Arrow */}
      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-red/60 to-transparent p-6">
        <div className="flex justify-between items-center w-full bg-white/90 backdrop-blur-md rounded-xl px-5 py-4 transition-all duration-500 group-hover:bg-white">
          <h6 className="text-gray-900 text-md font-semibold">{title}</h6>

          {/* Arrow button */}
          <div
            className="
              flex items-center justify-center
              w-10 h-10 rounded-full
              bg-gray-200 text-gray-700
              transition-all duration-500 ease-out
              group-hover:bg-red-500 group-hover:text-white
            "
          >
            <FaArrowRight className="text-lg transition-transform duration-500 group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
}
